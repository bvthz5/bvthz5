const fs = require('fs');
const https = require('https');
const path = require('path');

// Curated modern tech trends (base / fallbacks)
const curatedTrends = [
    {
        title: "Loop Engineering",
        domain: "Software Architecture & DevX",
        description: "An architectural design paradigm focusing on minimizing and optimizing feedback loops in the software development lifecycle.",
        useCase: "Building developer-agent workflows, self-healing continuous integration pipelines, and real-time automated refactoring loops.",
        impact: "Dramatically reduces developer cognitive load and speeds up time-to-market."
    },
    {
        title: "Agentic Orchestration",
        domain: "Artificial Intelligence",
        description: "The coordination and management of autonomous AI agents executing multi-step complex tasks.",
        useCase: "Multi-agent collaboration frameworks, dynamic tool-use coordination, and autonomous task planning/reasoning.",
        impact: "Enables automation of complex, non-linear enterprise workflows."
    },
    {
        title: "Neuromorphic Computing",
        domain: "Next-Gen Hardware",
        description: "Mimicking the neuro-biological architectures of the human nervous system to build ultra-efficient computing hardware.",
        useCase: "Low-latency edge intelligence, spiking neural networks, and real-time biological brain simulation.",
        impact: "Reduces AI model training/inference power consumption by up to 1000x."
    },
    {
        title: "Post-Quantum Cryptography",
        domain: "Cybersecurity & Cryptography",
        description: "Cryptographic algorithms designed to be secure against attacks by both classical and quantum computers.",
        useCase: "Securing end-to-end communication channels, digital signatures, and banking infrastructure for the quantum era.",
        impact: "Protects sensitive global data from future quantum decryption threats."
    },
    {
        title: "Retrieval-Augmented Gen",
        domain: "AI & LLM Ops",
        description: "Optimizing the output of large language models by querying authoritative external knowledge bases before generating responses.",
        useCase: "Enterprise semantic search engines, domain-specific AI chat assistants, and real-time knowledge synthesis.",
        impact: "Significantly reduces model hallucinations and provides verifiable citations."
    }
];

// Fetch RSS Feed
function fetchRSS(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => { resolve(data); });
        }).on('error', (err) => { reject(err); });
    });
}

// Simple RSS/XML parsing helper
function parseRSS(xml) {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
        const content = match[1];
        const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = content.match(/<link>([\s\S]*?)<\/link>/);
        const descMatch = content.match(/<description>([\s\S]*?)<\/description>/);
        
        if (titleMatch && linkMatch) {
            const title = cleanText(titleMatch[1]);
            const link = linkMatch[1].trim();
            const rawDesc = descMatch ? cleanText(descMatch[1]) : '';
            
            const trendDetails = mapTrendDetails(title, rawDesc);
            trendDetails.link = link;
            items.push(trendDetails);
        }
    }
    return items;
}

function cleanText(text) {
    return text
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/<[^>]*>/g, '') // strip HTML
        .trim();
}

function truncate(str, len) {
    return str.length > len ? str.slice(0, len - 3) + '...' : str;
}

function mapTrendDetails(rawTitle, rawDesc) {
    // Strip sources like "- TechCrunch", " | Wired", "&nbsp;&nbsp;Source", etc.
    let title = rawTitle
        .split(/\s+-\s+/)[0]
        .split(/\s+\|\s+/)[0]
        .split('  ')[0] // remove double space prefixes from Google News
        .split(' - ')[0]
        .trim();

    const t = title.toLowerCase();
    let domain = 'Emerging Tech';
    let useCase = `Applying ${title.split(' ')[0] || 'emerging'} tools to modern development pipelines.`;
    let impact = `Boosts system efficiency using new engineering frameworks.`;

    if (t.includes('ai') || t.includes('gpt') || t.includes('llm') || t.includes('intelligence') || t.includes('model') || t.includes('agent')) {
        domain = 'Artificial Intelligence';
        useCase = 'Coordinating autonomous agent frameworks and context-aware systems.';
        impact = 'Reduces manual process complexity and automates multi-step pipelines.';
    } else if (t.includes('quantum') || t.includes('computing')) {
        domain = 'Quantum Computing';
        useCase = 'Experimenting with quantum circuit models and post-quantum encryption.';
        impact = 'Prepares data architectures for high-speed secure cryptography.';
    } else if (t.includes('crypto') || t.includes('security') || t.includes('hack') || t.includes('encrypt') || t.includes('cyber')) {
        domain = 'Cybersecurity';
        useCase = 'Auditing vulnerability vectors, threat mapping, and zero-trust standards.';
        impact = 'Hardens platform interfaces and shields user assets from edge vulnerabilities.';
    } else if (t.includes('database') || t.includes('sql') || t.includes('data') || t.includes('lakehouse') || t.includes('postgres')) {
        domain = 'Data Engineering';
        useCase = 'Refactoring large-scale data lakehouse pipelines, indexing, and vector similarity search.';
        impact = 'Ensures high throughput and ultra-low latency for analytical queries.';
    } else if (t.includes('cloud') || t.includes('aws') || t.includes('docker') || t.includes('kubernetes') || t.includes('devops') || t.includes('serverless')) {
        domain = 'Cloud & DevOps';
        useCase = 'Configuring container clusters, multi-stage CI/CD pipelines, and serverless architectures.';
        impact = 'Reduces operational overhead and ensures automatic scalability under high traffic.';
    } else if (t.includes('blockchain') || t.includes('web3') || t.includes('ethereum') || t.includes('solidity')) {
        domain = 'Web3 / Blockchain';
        useCase = 'Developing smart contract protocols and scaling high-fidelity decentralized ledger tools.';
        impact = 'Builds trustless transactions and implements decentralized identity frameworks.';
    } else if (t.includes('gpu') || t.includes('chip') || t.includes('semiconductor') || t.includes('nvidia') || t.includes('hardware') || t.includes('packaging')) {
        domain = 'Hardware & GPU Tech';
        useCase = 'Optimizing parallel workloads, distributed model training configurations, and GPU virtualization.';
        impact = 'Dramatically improves model throughput and optimizes operational infrastructure costs.';
    }

    let description;
    if (rawDesc && !rawDesc.toLowerCase().startsWith(title.toLowerCase().slice(0, 10))) {
        description = truncate(`${title}: ${rawDesc}`, 120);
    } else if (rawDesc) {
        description = truncate(rawDesc, 120);
    } else {
        description = truncate(`${title} - latest breakthrough in emerging technology.`, 120);
    }

    return {
        title: truncate(title, 26),
        domain,
        description,
        useCase,
        impact
    };
}

// Generate the SVG content
function generateSVG(trends) {
    return `<svg width="850" height="350" viewBox="0 0 850 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
    <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00ffff" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&amp;display=swap');
      .title-text { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 32px; fill: url(#glow-grad); }
      .body-text { font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 15px; fill: #9ca3af; }
      .badge-text { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 11px; fill: #ffffff; }
      .label-text { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 13px; fill: #6366f1; }
      .heading-label { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 13px; fill: #4b5563; letter-spacing: 2px; text-transform: uppercase; }
      
      @keyframes slideShow {
        0%, 28% { opacity: 1; transform: translate(0, 0); visibility: visible; }
        31%, 97% { opacity: 0; transform: translate(0, 10px); visibility: hidden; }
        100% { opacity: 1; transform: translate(0, 0); visibility: visible; }
      }
      .slide-group {
        animation: slideShow 18s infinite ease-in-out;
      }
      .slide-1 { animation-delay: 0s; }
      .slide-2 { animation-delay: 6s; }
      .slide-3 { animation-delay: 12s; }
      
      svg:hover .slide-group {
        animation-play-state: paused !important;
      }
      
      @keyframes indProgress {
        0% { transform: translateX(0px); }
        33% { transform: translateX(25px); }
        66% { transform: translateX(50px); }
        100% { transform: translateX(0px); }
      }
      .indicator-dot {
        animation: indProgress 18s infinite steps(1);
      }
      svg:hover .indicator-dot {
        animation-play-state: paused !important;
      }
    </style>
  </defs>

  <!-- Outer container with glow border -->
  <rect width="850" height="350" rx="16" fill="url(#bg-grad)" stroke="#1e293b" stroke-width="2" />
  <rect x="10" y="10" width="830" height="330" rx="12" fill="none" stroke="#6366f1" stroke-opacity="0.1" stroke-width="1" />

  <!-- Neon Accent Light -->
  <circle cx="800" cy="50" r="100" fill="#6366f1" filter="blur(80px)" opacity="0.15" />
  <circle cx="50" cy="300" r="80" fill="#00ffff" filter="blur(60px)" opacity="0.1" />

  <!-- Slide 1 -->
  <g class="slide-group slide-1">
    <text x="50" y="55" class="heading-label">Market Focus &amp; Trends</text>
    <text x="750" y="55" class="heading-label" text-anchor="end">01 / 03</text>
    <text x="50" y="100" class="title-text">${trends[0].title}</text>
    <rect x="50" y="118" width="220" height="24" rx="12" fill="#312e81" stroke="#4f46e5" stroke-width="1" />
    <text x="160" y="134" class="badge-text" text-anchor="middle">${trends[0].domain}</text>
    <text x="50" y="175" class="body-text">${trends[0].description}</text>
    <text x="50" y="215" class="label-text">💡 Practical Application:</text>
    <text x="50" y="235" class="body-text">${trends[0].useCase}</text>
    <text x="50" y="275" class="label-text">⚡ Strategic Impact:</text>
    <text x="50" y="295" class="body-text">${trends[0].impact}</text>
  </g>

  <!-- Slide 2 -->
  <g class="slide-group slide-2">
    <text x="50" y="55" class="heading-label">Market Focus &amp; Trends</text>
    <text x="750" y="55" class="heading-label" text-anchor="end">02 / 03</text>
    <text x="50" y="100" class="title-text">${trends[1].title}</text>
    <rect x="50" y="118" width="220" height="24" rx="12" fill="#312e81" stroke="#4f46e5" stroke-width="1" />
    <text x="160" y="134" class="badge-text" text-anchor="middle">${trends[1].domain}</text>
    <text x="50" y="175" class="body-text">${trends[1].description}</text>
    <text x="50" y="215" class="label-text">💡 Practical Application:</text>
    <text x="50" y="235" class="body-text">${trends[1].useCase}</text>
    <text x="50" y="275" class="label-text">⚡ Strategic Impact:</text>
    <text x="50" y="295" class="body-text">${trends[1].impact}</text>
  </g>

  <!-- Slide 3 -->
  <g class="slide-group slide-3">
    <text x="50" y="55" class="heading-label">Market Focus &amp; Trends</text>
    <text x="750" y="55" class="heading-label" text-anchor="end">03 / 03</text>
    <text x="50" y="100" class="title-text">${trends[2].title}</text>
    <rect x="50" y="118" width="220" height="24" rx="12" fill="#312e81" stroke="#4f46e5" stroke-width="1" />
    <text x="160" y="134" class="badge-text" text-anchor="middle">${trends[2].domain}</text>
    <text x="50" y="175" class="body-text">${trends[2].description}</text>
    <text x="50" y="215" class="label-text">💡 Practical Application:</text>
    <text x="50" y="235" class="body-text">${trends[2].useCase}</text>
    <text x="50" y="275" class="label-text">⚡ Strategic Impact:</text>
    <text x="50" y="295" class="body-text">${trends[2].impact}</text>
  </g>

  <!-- Footer control indicators -->
  <g opacity="0.8">
    <text x="425" y="335" font-family="'Outfit', sans-serif" font-weight="600" font-size="11" fill="#4b5563" text-anchor="middle">⏸ HOVER TO PAUSE SLIDESHOW</text>
    <circle cx="760" cy="331" r="3" fill="#374151" />
    <circle cx="772" cy="331" r="3" fill="#374151" />
    <circle cx="784" cy="331" r="3" fill="#374151" />
    <circle class="indicator-dot" cx="760" cy="331" r="3.5" fill="#00ffff" />
  </g>
</svg>`;
}

// Generate the Markdown elements for details
function generateMarkdownDetails(trends) {
    let md = '';
    trends.forEach((t, i) => {
        md += `<details>
  <summary><b>${i + 1}️⃣ ${t.title}</b> &nbsp;|&nbsp; 🏷️ <i>${t.domain}</i></summary>
  <br>
  <blockquote>
    <b>What it is:</b> ${t.description}<br>
    <b>How it's used:</b> ${t.useCase}<br>
    <b>Market Impact:</b> ${t.impact}
  </blockquote>
</details>\n\n`;
    });
    return md.trim();
}

async function main() {
    try {
        console.log("Fetching latest technology trends from Google News RSS...");
        // Fetch technology news RSS
        const rssUrl = "https://news.google.com/rss/search?q=technology+trends&hl=en-US&gl=US&ceid=US:en";
        let xml = '';
        try {
            xml = await fetchRSS(rssUrl);
        } catch (e) {
            console.warn("Network request failed, falling back to curated trends:", e.message);
        }

        const rssTrends = xml ? parseRSS(xml) : [];
        console.log(`Parsed ${rssTrends.length} live trends from Google News.`);

        // Combine live trends with curated trends
        // Make sure we have 3 unique trends
        const selectedTrends = [];
        const seenTitles = new Set();

        // 1. Add fresh RSS trends first
        for (const item of rssTrends) {
            if (!seenTitles.has(item.title.toLowerCase())) {
                selectedTrends.push(item);
                seenTitles.add(item.title.toLowerCase());
            }
            if (selectedTrends.length >= 3) break;
        }

        // 2. Fill rest with curated trends
        for (const item of curatedTrends) {
            if (selectedTrends.length >= 3) break;
            if (!seenTitles.has(item.title.toLowerCase())) {
                selectedTrends.push(item);
                seenTitles.add(item.title.toLowerCase());
            }
        }

        console.log("Selected Trends for Slideshow:");
        selectedTrends.forEach((t, idx) => console.log(`  ${idx + 1}. [${t.domain}] ${t.title}`));

        // Generate SVG slideshow
        const svgContent = generateSVG(selectedTrends);
        const assetsDir = path.join(__dirname, '../assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }
        const svgPath = path.join(assetsDir, 'trends.svg');
        fs.writeFileSync(svgPath, svgContent, 'utf-8');
        console.log(`Generated SVG slideshow at ${svgPath}`);

        // Update README.md
        const readmePath = path.join(__dirname, '../README.md');
        let readmeContent = fs.readFileSync(readmePath, 'utf-8');

        // Prepare the block to insert
        const trendsBlock = `<!-- START_TRENDS -->
<p align="center">
  <img src="assets/trends.svg" width="100%" alt="Tech Trends Slideshow" />
</p>

### 🔍 Interactive Trend Explorer (Read at your own pace)
<p align="center">
  <sub>Click on a trend below to expand and read details slowly. Hover over the slideshow above to pause it.</sub>
</p>

${generateMarkdownDetails(selectedTrends)}
<!-- END_TRENDS -->`;

        // Check if START_TRENDS and END_TRENDS markers exist
        if (readmeContent.includes('<!-- START_TRENDS -->') && readmeContent.includes('<!-- END_TRENDS -->')) {
            const startIdx = readmeContent.indexOf('<!-- START_TRENDS -->');
            const endIdx = readmeContent.indexOf('<!-- END_TRENDS -->') + '<!-- END_TRENDS -->'.length;
            readmeContent = readmeContent.slice(0, startIdx) + trendsBlock + readmeContent.slice(endIdx);
            console.log("Updated README.md trends section using markers.");
        } else {
            // Find "## 🎯 Current Focus & Learning Path" and replace it and the subsequent table
            const headerStr = '## 🎯 Current Focus & Learning Path';
            const headerIdx = readmeContent.indexOf(headerStr);
            if (headerIdx !== -1) {
                // Find where the next section starts, e.g. "## 🌍 Connect with Me"
                const nextSectionStr = '## 🌍 Connect with Me';
                const nextSectionIdx = readmeContent.indexOf(nextSectionStr);
                
                if (nextSectionIdx !== -1) {
                    readmeContent = readmeContent.slice(0, headerIdx) + headerStr + '\n\n' + trendsBlock + '\n\n' + readmeContent.slice(nextSectionIdx);
                    console.log("Initialised trends section with markers in README.md.");
                } else {
                    // Fallback to replacing just after the header
                    readmeContent = readmeContent.slice(0, headerIdx) + headerStr + '\n\n' + trendsBlock;
                    console.log("Initialised trends section at end of README.md.");
                }
            } else {
                console.error("Could not find '## 🎯 Current Focus & Learning Path' in README.md");
                return;
            }
        }

        fs.writeFileSync(readmePath, readmeContent, 'utf-8');
        console.log("Successfully updated README.md!");

    } catch (error) {
        console.error("Error updating trends:", error);
    }
}

main();
