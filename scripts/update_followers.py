#!/usr/bin/env python3
"""
update_followers.py

Automatically updates the GitHub profile README with a section showing
users that you follow but who do not follow you back.

Features:
    - Full pagination support for GitHub REST API
    - Automatic retry with exponential backoff
    - Rate-limit awareness (respects X-RateLimit headers)
    - Marker-based README injection (preserves all other content)
    - Rich markdown output with avatars, clickable links, and stats

Environment Variables:
    GH_TOKEN  – GitHub Personal Access Token (required)

Usage:
    python update_followers.py
"""

from __future__ import annotations

import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

GITHUB_API_BASE: str = "https://api.github.com"
PER_PAGE: int = 100  # max allowed by GitHub
MAX_RETRIES: int = 5
BACKOFF_FACTOR: float = 1.0  # 1s, 2s, 4s, …
RETRY_STATUS_CODES: tuple[int, ...] = (403, 429, 500, 502, 503, 504)

README_PATH: Path = Path(__file__).resolve().parent.parent / "README.md"
START_MARKER: str = "<!-- START:NOT_FOLLOWING_BACK -->"
END_MARKER: str = "<!-- END:NOT_FOLLOWING_BACK -->"

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# HTTP session helper
# ---------------------------------------------------------------------------


def _build_session(token: str) -> requests.Session:
    """Return a requests session with auth headers & automatic retries."""
    session = requests.Session()
    session.headers.update(
        {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "X-GitHub-Api-Version": "2022-11-28",
        }
    )

    retry_strategy = Retry(
        total=MAX_RETRIES,
        backoff_factor=BACKOFF_FACTOR,
        status_forcelist=RETRY_STATUS_CODES,
        allowed_methods=["GET"],
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


# ---------------------------------------------------------------------------
# Rate-limit helper
# ---------------------------------------------------------------------------


def _respect_rate_limit(response: requests.Response) -> None:
    """Sleep if we are close to (or have hit) the GitHub rate limit."""
    remaining = response.headers.get("X-RateLimit-Remaining")
    reset_at = response.headers.get("X-RateLimit-Reset")

    if remaining is not None and int(remaining) == 0 and reset_at is not None:
        sleep_seconds = max(int(reset_at) - int(time.time()), 0) + 5
        logger.warning(
            "Rate limit exhausted. Sleeping for %d seconds …", sleep_seconds
        )
        time.sleep(sleep_seconds)


# ---------------------------------------------------------------------------
# Paginated fetch
# ---------------------------------------------------------------------------


def _fetch_all_pages(
    session: requests.Session,
    url: str,
) -> list[dict[str, Any]]:
    """Follow GitHub pagination (Link header) and return all items."""
    items: list[dict[str, Any]] = []
    next_url: str | None = url

    while next_url:
        logger.info("GET %s", next_url)
        response = session.get(next_url, params={"per_page": PER_PAGE})
        _respect_rate_limit(response)

        if response.status_code == 403 and "rate limit" in response.text.lower():
            logger.error("Rate limit hit. Response: %s", response.text)
            _respect_rate_limit(response)
            continue  # retry the same URL after sleeping

        response.raise_for_status()
        data = response.json()

        if isinstance(data, list):
            items.extend(data)
            logger.info("  ↳ fetched %d items (total so far: %d)", len(data), len(items))
        else:
            logger.warning("Unexpected response shape: %s", type(data))
            break

        # Follow pagination via Link header
        next_url = response.links.get("next", {}).get("url")

    return items


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------


def get_authenticated_user(session: requests.Session) -> str:
    """Return the username of the authenticated user."""
    response = session.get(f"{GITHUB_API_BASE}/user")
    response.raise_for_status()
    username: str = response.json()["login"]
    logger.info("Authenticated as: %s", username)
    return username


def fetch_following(session: requests.Session, username: str) -> list[dict[str, Any]]:
    """Fetch the complete list of users that *username* follows."""
    url = f"{GITHUB_API_BASE}/users/{username}/following"
    return _fetch_all_pages(session, url)


def fetch_followers(session: requests.Session, username: str) -> list[dict[str, Any]]:
    """Fetch the complete list of users that follow *username*."""
    url = f"{GITHUB_API_BASE}/users/{username}/followers"
    return _fetch_all_pages(session, url)


def compute_not_following_back(
    following: list[dict[str, Any]],
    followers: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Return users I follow who do NOT follow me back, sorted alphabetically."""
    follower_logins: set[str] = {u["login"].lower() for u in followers}
    not_following_back = [
        user for user in following if user["login"].lower() not in follower_logins
    ]
    not_following_back.sort(key=lambda u: u["login"].lower())
    return not_following_back


# ---------------------------------------------------------------------------
# Markdown generation
# ---------------------------------------------------------------------------


def generate_markdown(
    not_following_back: list[dict[str, Any]],
    total_following: int,
    total_followers: int,
) -> str:
    """Build the GitHub-flavored Markdown section."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines: list[str] = []

    lines.append("")
    lines.append("## 📊 GitHub Follow Stats")
    lines.append("")
    lines.append("| 👥 Followers | 👤 Following | 🚫 Not Following Back |")
    lines.append("|:---:|:---:|:---:|")
    lines.append(f"| **{total_followers}** | **{total_following}** | **{len(not_following_back)}** |")
    lines.append("")

    if not not_following_back:
        lines.append("🎉 **Everyone you follow follows you back!**")
        lines.append("")
    else:
        lines.append("## 👀 People I Follow Who Don't Follow Me Back")
        lines.append("")
        lines.append(f"_Last updated: {now}_")
        lines.append("")
        
        cols = 5
        # Create table header
        lines.append("| " + " | ".join([" "] * cols) + " |")
        lines.append("| " + " | ".join([":---:"] * cols) + " |")
        
        # Chunk users list into rows of size cols
        for i in range(0, len(not_following_back), cols):
            chunk = not_following_back[i : i + cols]
            row_items = []
            for user in chunk:
                login = user["login"]
                avatar = user["avatar_url"]
                profile = user["html_url"]
                cell = f'[<img src="{avatar}" width="50" style="border-radius: 50%;" alt="{login}"/><br><sub>**{login}**</sub>]({profile})'
                row_items.append(cell)
            
            # Pad the row if it's the last one and has fewer items than cols
            if len(row_items) < cols:
                row_items.extend([" "] * (cols - len(row_items)))
                
            lines.append("| " + " | ".join(row_items) + " |")
            
        lines.append("")
        lines.append(f"**Total: {len(not_following_back)}**")
        lines.append("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# README update
# ---------------------------------------------------------------------------


def update_readme(markdown_section: str) -> bool:
    """
    Inject *markdown_section* between the start/end markers in README.md.

    Returns True if the file was modified, False otherwise.
    """
    if not README_PATH.exists():
        logger.error("README not found at %s", README_PATH)
        sys.exit(1)

    content = README_PATH.read_text(encoding="utf-8")

    block = f"{START_MARKER}\n{markdown_section}\n{END_MARKER}"

    if START_MARKER in content and END_MARKER in content:
        start_idx = content.index(START_MARKER)
        end_idx = content.index(END_MARKER) + len(END_MARKER)
        new_content = content[:start_idx] + block + content[end_idx:]
    else:
        logger.info("Markers not found — appending section to the end of README.")
        new_content = content.rstrip("\n") + "\n\n" + block + "\n"

    if new_content == content:
        logger.info("README is already up-to-date. No changes made.")
        return False

    README_PATH.write_text(new_content, encoding="utf-8")
    logger.info("README updated successfully at %s", README_PATH)
    return True


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


def main() -> None:
    """Orchestrate the follower check and README update."""
    token = os.environ.get("GH_TOKEN")
    if not token:
        logger.error(
            "GH_TOKEN environment variable is not set. "
            "Please create a Personal Access Token and export it."
        )
        sys.exit(1)

    session = _build_session(token)

    try:
        username = get_authenticated_user(session)

        logger.info("Fetching users that %s follows …", username)
        following = fetch_following(session, username)
        logger.info("Total following: %d", len(following))

        logger.info("Fetching followers of %s …", username)
        followers = fetch_followers(session, username)
        logger.info("Total followers: %d", len(followers))

        not_following_back = compute_not_following_back(following, followers)
        logger.info("Not following back: %d", len(not_following_back))

        markdown = generate_markdown(not_following_back, len(following), len(followers))
        changed = update_readme(markdown)

        if changed:
            logger.info("✅ README has been updated.")
        else:
            logger.info("ℹ️  No changes needed.")

    except requests.exceptions.HTTPError as exc:
        logger.error("GitHub API error: %s", exc)
        logger.error("Response body: %s", exc.response.text if exc.response else "N/A")
        sys.exit(1)
    except requests.exceptions.ConnectionError as exc:
        logger.error("Connection error: %s", exc)
        sys.exit(1)
    except Exception as exc:
        logger.error("Unexpected error: %s", exc, exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
