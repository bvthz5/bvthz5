/**
 * BV Bot — Repository Knowledge Base
 * 
 * This file contains the entire knowledge extracted from the bvthz5 repository.
 * It powers the chatbot with fuzzy keyword matching — no API keys needed.
 */

const KNOWLEDGE_BASE = {
    owner: {
        username: "bvthz5",
        name: "Binil Vincent",
        role: "Student & Developer",
        portfolio: "https://bvthz5.github.io/Portfolio/",
        github: "https://github.com/bvthz5",
        interests: ["AI", "Blockchain", "Cybersecurity", "Animation", "Storytelling"],
        hobbies: ["Coding", "Writing", "Exploring New Tech Trends", "Gaming"],
        funFact: "Loves designing futuristic worlds and storytelling through animation.",
        currentlyLearning: ["Blockchain", "DevOps", "AI"]
    },

    stats: {
        totalCommits: 4640,
        publicRepos: 18,
        privateRepos: 7,
        storageUsed: "530.09 MB",
        achievements: 6,
        commitBreakdown: {
            morning: { count: 766, percent: "16.51%" },
            daytime: { count: 1865, percent: "40.19%" },
            evening: { count: 1375, percent: "29.63%" },
            night: { count: 634, percent: "13.66%" }
        }
    },

    skills: [
        "Swagger", ".NET Core", "C#", "Figma", "Jenkins", "MySQL",
        "SQL Server", "Postman", "NUnit", "React", "Node.js", "HTML", "CSS"
    ],

    certifications: [
        { name: "n8n Certified Automation", category: "Automation" },
        { name: "Claude Code — In Action", category: "AI" },
        { name: "NASA Space Apps Challenge", category: "Hackathon" },
        { name: "Build With India Hackathon", category: "Hackathon" },
        { name: "HashItUp — 24-Hr National Hackathon", category: "Hackathon" },
        { name: "Red Hat Academy & IPSR", category: "Cloud" },
        { name: "NPTEL — Industry 4.0 & IIoT", category: "Certification" },
        { name: "Tableau — Intro Certified", category: "Data" },
        { name: "Claude 101 — Anthropic Certified", category: "AI" },
        { name: "Claude Code 101 — Anthropic Certified", category: "AI" },
        { name: "Claude Cowork — Intro Certified", category: "AI" }
    ],

    research: [
        {
            title: "EEG-based Brain-Computer Interface (BCI) for Unmanned Aerial Vehicle (UAV) Control",
            venue: "Global Perspectives on AI and Sustainable Development 2.0 (GPAISD 2.0)",
            domain: "Neurotechnology & AI",
            description: "Research paper on mapping non-invasive EEG signals to low-latency control instructions for UAV flight dynamics."
        }
    ],

    learningFocus: [
        {
            topic: "Retrieval-Augmented Generation (RAG)",
            domain: "AI / LLM Ops",
            description: "Designing high-performance indexing, semantic chunking, and multi-query expansion algorithms to optimize retrieval accuracy."
        },
        {
            topic: "Autonomous AI Agents",
            domain: "Agentic AI",
            description: "Investigating multi-agent collaboration frameworks using the ReAct paradigm, dynamic tool-use coordination, and contextual memory models."
        },
        {
            topic: "BCI Navigation Systems",
            domain: "Neurotechnology",
            description: "Mapping non-invasive EEG signals to low-latency control instructions for UAV flight dynamics."
        },
        {
            topic: "Neural Signal Processing",
            domain: "Deep Learning",
            description: "Training sequential time-series model architectures for classification of neural features."
        },
        {
            topic: "Vector Databases",
            domain: "Data Engineering",
            description: "Exploring advanced indexing in databases like PgVector/Pinecone for high-fidelity agent tools."
        },
        {
            topic: "System Orchestration",
            domain: "DevOps / MLOps",
            description: "Mastering Kubernetes clusters, multi-tier Docker environments, and modern CI/CD deployment pipelines."
        }
    ],

    codingProfiles: [
        { platform: "LeetCode", url: "https://leetcode.com/u/thothaz/", category: "Competitive Programming" },
        { platform: "HackerRank", url: "https://www.hackerrank.com/profile/binilvincent80", category: "Competitive Programming" },
        { platform: "HackerEarth", url: "https://www.hackerearth.com/@Bvtom/", category: "Competitive Programming" },
        { platform: "Codeforces", url: "https://codeforces.com/profile/Bvthz", category: "Competitive Programming" },
        { platform: "CodeChef", url: "https://www.codechef.com/users/bvthz5", category: "Competitive Programming" },
        { platform: "Codewars", url: "https://www.codewars.com/users/bvthz5", category: "Competitive Programming" },
        { platform: "SPOJ", url: "https://www.spoj.com/users/bvthz", category: "Competitive Programming" },
        { platform: "CodinGame", url: "https://www.codingame.com/profile/524762e26f3860fb7fdd40741fa651617910196", category: "Competitive Programming" },
        { platform: "Code360 (Naukri)", url: "https://www.naukri.com/code360/profile/9821d669-c852-43b1-8b7d-ab9b111f1b70", category: "Competitive Programming" },
        { platform: "Kattis", url: "https://open.kattis.com/users/bvthz", category: "Competitive Programming" },
        { platform: "TryHackMe", url: "https://tryhackme.com/p/BV05", category: "Cybersecurity" },
        { platform: "Hack The Box", url: "https://app.hackthebox.com/profile/bvthz", category: "Cybersecurity" },
        { platform: "Root Me", url: "https://www.root-me.org/Binil-Vincent?lang=en", category: "Cybersecurity" },
        { platform: "CyLab Academy", url: "https://learn.cylabacademy.org/users/Bvthazzzzzzzzzzzzzzzzz", category: "Cybersecurity" },
        { platform: "Google Developer Program", url: "https://me.developers.google.com/u/108841439837843973335", category: "Cloud" },
        { platform: "Google Skills Boost", url: "https://www.cloudskillsboost.google/public_profiles", category: "Cloud" },
        { platform: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/users/binilvincent-9244/", category: "Cloud" },
        { platform: "Salesforce Trailblazer", url: "https://www.salesforce.com/trailblazer/profile/zhvao1zemekwbhsyx8", category: "Cloud" },
        { platform: "Frontend Mentor", url: "https://www.frontendmentor.io/profile/bvthz5", category: "Frontend" },
        { platform: "CSSBattle", url: "https://cssbattle.dev/player/bvthz", category: "Frontend" },
        { platform: "Kaggle", url: "https://kaggle.com/binilvincent", category: "Data Science" },
        { platform: "LearnWeb3", url: "https://learnweb3.io/u/TenuousFisherman/", category: "Web3" },
        { platform: "SpeedRun Ethereum", url: "https://speedrunethereum.com/builders/0x9Ea388a07B25dc2E8618a8413346A4962C75d2c8", category: "Web3" },
        { platform: "freeCodeCamp", url: "https://freecodecamp.org/bvthz5", category: "Learning" },
        { platform: "W3Schools", url: "https://www.w3profile.com/bvthaz", category: "Learning" },
        { platform: "Exercism", url: "https://exercism.org/profiles/bvthz5", category: "Learning" },
        { platform: "Codédex", url: "https://codedex.io/@binilvincent801772", category: "Learning" },
        { platform: "Coddy", url: "https://coddy.tech/user/bvthz", category: "Learning" },
        { platform: "Edabit", url: "https://edabit.com/user/nEJ6x8FovsKAp366v", category: "Learning" },
        { platform: "InterviewBit", url: "https://www.interviewbit.com/", category: "Coding Practice" }
    ],

    socialLinks: [
        { platform: "LinkedIn", url: "https://www.linkedin.com/in/binil-vincent-b150aa187" },
        { platform: "Instagram", url: "https://www.instagram.com/b__nil___thaz/" },
        { platform: "YouTube", url: "https://youtube.com/@treasuretoons-5" },
        { platform: "Discord", url: "https://discord.gg/rVdFFxfG" },
        { platform: "Buy Me a Coffee", url: "https://www.buymeacoffee.com/binilvincent5" }
    ],

    repoStructure: {
        directories: [
            { name: ".github/workflows", description: "GitHub Actions for automated SVG generation (dino contribution animation)." },
            { name: "assets", description: "Contains SVGs: Flamingo.glb (3D model), dino.svg (contribution dino animation), snake.svg (contribution snake), welcome.svg." },
            { name: "chatbot", description: "This chatbot! A standalone HTML/CSS/JS chatbot that knows the entire repository." },
            { name: "flamingo", description: "3D Flamingo animation built with Three.js — includes index.html, style.css, and three-animation.js." },
            { name: "gif", description: "Animated GIFs used in the README: intro.gif, name.gif, coder.gif, bird.gif." },
            { name: "name", description: "Animated name display with HTML/CSS/JS and a welcome sub-page." },
            { name: "scripts", description: "Node.js scripts: generate_dino.js (dino SVG generator), generate_snake.js, swap_snake_letters.js." },
            { name: "snake-animation", description: "Snake animation HTML page." }
        ],
        keyFiles: [
            { name: "README.md", description: "The main profile README — a comprehensive showcase of skills, stats, certifications, research, and more." },
            { name: "LICENSE", description: "MIT License." },
            { name: "image.png", description: "Profile image." }
        ]
    },

    specialFeatures: [
        "🦖 Animated Dino that walks through the contribution grid (auto-generated daily via GitHub Actions)",
        "🐍 Snake animation that eats through the contribution graph",
        "🦩 3D Flamingo animation built with Three.js and GLB model",
        "✨ Animated name display with particle effects",
        "🎵 Spotify Now Playing widget integration",
        "🏆 GitHub Trophies display",
        "📊 WakaTime coding stats integration",
        "📈 GitHub streak stats and top languages"
    ]
};

/**
 * Intent-Keyword Mapping
 * Maps user intents to keywords and response generators.
 */
const INTENTS = [
    {
        id: "greeting",
        keywords: ["hi", "hello", "hey", "sup", "yo", "howdy", "greetings", "good morning", "good evening", "what's up", "whats up"],
        tag: "general",
        respond: () => {
            return `Hey! 👋 I'm BV Bot, your guide to the <strong>bvthz5</strong> repository.\n\nI can tell you about skills, projects, stats, certifications, research, and much more. Just ask away!`;
        }
    },
    {
        id: "about",
        keywords: ["about", "who", "tell me about", "introduce", "yourself", "what are you", "who are you", "owner", "binil", "vincent", "bvthz5", "profile"],
        tag: "general",
        respond: () => {
            const o = KNOWLEDGE_BASE.owner;
            return `<span class="response-tag tag-general">About</span>\n\n<strong>${o.name}</strong> (${o.username}) is a ${o.role} passionate about building cool things!\n\n<ul>
<li>🌱 Currently learning: <strong>${o.currentlyLearning.join(', ')}</strong></li>
<li>💡 Enjoys solving real-world problems through technology</li>
<li>⚡ Fun fact: ${o.funFact}</li>
<li>🎯 Interests: ${o.interests.join(' • ')}</li>
<li>🎮 Hobbies: ${o.hobbies.join(' • ')}</li>
</ul>\n\n🔗 <a href="${o.portfolio}" target="_blank">Visit Portfolio →</a>`;
        }
    },
    {
        id: "skills",
        keywords: ["skills", "tools", "tech", "technologies", "stack", "language", "programming", "framework", "what does he use", "what do you use", "swagger", "dotnet", ".net", "react", "node", "mysql", "figma", "jenkins", "postman"],
        tag: "skills",
        respond: () => {
            const skills = KNOWLEDGE_BASE.skills;
            const skillBadges = skills.map(s => `<code>${s}</code>`).join('  ');
            return `<span class="response-tag tag-skills">Skills & Tools</span>\n\nHere are the technologies and tools in the arsenal:\n\n${skillBadges}\n\nThis includes frontend frameworks (<strong>React, HTML, CSS</strong>), backend (<strong>.NET Core, Node.js, C#</strong>), databases (<strong>MySQL, SQL Server</strong>), testing (<strong>NUnit, Postman</strong>), DevOps (<strong>Jenkins</strong>), and design (<strong>Figma</strong>).`;
        }
    },
    {
        id: "stats",
        keywords: ["stats", "statistics", "commits", "contributions", "github data", "data", "storage", "repos", "repositories", "numbers", "how many"],
        tag: "stats",
        respond: () => {
            const s = KNOWLEDGE_BASE.stats;
            const cb = s.commitBreakdown;
            return `<span class="response-tag tag-stats">GitHub Stats</span>\n\n📊 Here's the GitHub data breakdown:\n\n<ul>
<li>🔥 Total Commits: <strong>${s.totalCommits.toLocaleString()}</strong></li>
<li>🔓 Public Repos: <strong>${s.publicRepos}</strong></li>
<li>🔒 Private Repos: <strong>${s.privateRepos}</strong></li>
<li>💾 Storage Used: <strong>${s.storageUsed}</strong></li>
<li>🏆 Achievements: <strong>${s.achievements}</strong></li>
</ul>\n\n⏰ <strong>Commit Time Breakdown:</strong>\n<ul>
<li>🌞 Morning: ${cb.morning.count} commits (${cb.morning.percent})</li>
<li>🌤 Daytime: ${cb.daytime.count.toLocaleString()} commits (${cb.daytime.percent}) — peak coding time!</li>
<li>🌙 Evening: ${cb.evening.count.toLocaleString()} commits (${cb.evening.percent})</li>
<li>🌑 Night: ${cb.night.count} commits (${cb.night.percent})</li>
</ul>`;
        }
    },
    {
        id: "certifications",
        keywords: ["certification", "certifications", "certified", "hackathon", "hackathons", "nasa", "red hat", "nptel", "tableau", "claude", "n8n", "badges", "awards"],
        tag: "certs",
        respond: () => {
            const certs = KNOWLEDGE_BASE.certifications;
            const certList = certs.map(c => `<li><strong>${c.name}</strong> — ${c.category}</li>`).join('\n');
            return `<span class="response-tag tag-certs">Certifications & Hackathons</span>\n\n📜 Here are the certifications and hackathon participations:\n\n<ul>\n${certList}\n</ul>\n\nThat's <strong>${certs.length} achievements</strong> spanning AI, Cloud, Data, Automation, and competitive hackathons! 🚀`;
        }
    },
    {
        id: "research",
        keywords: ["research", "publication", "paper", "eeg", "bci", "brain", "uav", "drone", "neurotechnology", "academic"],
        tag: "research",
        respond: () => {
            const r = KNOWLEDGE_BASE.research[0];
            return `<span class="response-tag tag-research">Research & Publications</span>\n\n🧠 <strong>${r.title}</strong>\n\n<ul>
<li>📖 Published in: <em>${r.venue}</em></li>
<li>🏷️ Domain: ${r.domain}</li>
<li>📝 ${r.description}</li>
</ul>\n\nThis research explores cutting-edge brain-computer interfaces for controlling drones using neural signals!`;
        }
    },
    {
        id: "learning",
        keywords: ["learning", "current", "focus", "studying", "future", "goals", "rag", "agent", "vector", "kubernetes", "docker", "devops", "mlops"],
        tag: "learning",
        respond: () => {
            const focus = KNOWLEDGE_BASE.learningFocus;
            const items = focus.map(f => `<li><strong>${f.topic}</strong> (${f.domain}) — ${f.description}</li>`).join('\n');
            return `<span class="response-tag tag-learning">Current Learning Path</span>\n\n🎯 Here's what's currently being explored:\n\n<ul>\n${items}\n</ul>\n\nFrom RAG pipelines to BCI navigation — the learning breadth is impressive! 🚀`;
        }
    },
    {
        id: "projects",
        keywords: ["projects", "repo", "repository", "structure", "files", "folders", "what's in", "directory", "directories", "codebase", "code"],
        tag: "projects",
        respond: () => {
            const dirs = KNOWLEDGE_BASE.repoStructure.directories;
            const files = KNOWLEDGE_BASE.repoStructure.keyFiles;
            const dirList = dirs.map(d => `<li><code>${d.name}/</code> — ${d.description}</li>`).join('\n');
            const fileList = files.map(f => `<li><code>${f.name}</code> — ${f.description}</li>`).join('\n');
            return `<span class="response-tag tag-projects">Repository Structure</span>\n\n📂 Here's what's inside the <strong>bvthz5</strong> repo:\n\n<strong>Directories:</strong>\n<ul>\n${dirList}\n</ul>\n\n<strong>Key Files:</strong>\n<ul>\n${fileList}\n</ul>`;
        }
    },
    {
        id: "features",
        keywords: ["features", "special", "cool", "animations", "dino", "snake", "flamingo", "spotify", "wakatime", "trophy", "trophies", "unique", "interesting"],
        tag: "projects",
        respond: () => {
            const features = KNOWLEDGE_BASE.specialFeatures;
            const list = features.map(f => `<li>${f}</li>`).join('\n');
            return `<span class="response-tag tag-projects">Special Features</span>\n\n✨ This repo is packed with creative elements:\n\n<ul>\n${list}\n</ul>\n\nThe contribution Dino alone is a work of art — it's a pixel-art T-Rex that walks through the contribution grid eating cells! 🦖`;
        }
    },
    {
        id: "coding_profiles",
        keywords: ["coding", "competitive", "leetcode", "hackerrank", "codeforces", "codechef", "codewars", "spoj", "kaggle", "platforms", "profiles", "where", "accounts"],
        tag: "stats",
        respond: () => {
            const profiles = KNOWLEDGE_BASE.codingProfiles;
            const categories = {};
            profiles.forEach(p => {
                if (!categories[p.category]) categories[p.category] = [];
                categories[p.category].push(p);
            });
            let result = `<span class="response-tag tag-stats">Developer Profiles</span>\n\n🏆 Present on <strong>${profiles.length} platforms</strong> across multiple domains:\n\n`;
            for (const [cat, items] of Object.entries(categories)) {
                result += `<strong>${cat}:</strong>\n<ul>\n`;
                items.forEach(p => {
                    result += `<li><a href="${p.url}" target="_blank">${p.platform}</a></li>\n`;
                });
                result += `</ul>\n`;
            }
            return result;
        }
    },
    {
        id: "connect",
        keywords: ["connect", "contact", "social", "linkedin", "instagram", "youtube", "discord", "reach", "email", "message", "follow"],
        tag: "connect",
        respond: () => {
            const links = KNOWLEDGE_BASE.socialLinks;
            const list = links.map(l => `<li><a href="${l.url}" target="_blank">${l.platform}</a></li>`).join('\n');
            return `<span class="response-tag tag-connect">Connect</span>\n\n🌍 Here's where you can connect:\n\n<ul>\n${list}\n</ul>\n\n💡 <a href="${KNOWLEDGE_BASE.owner.portfolio}" target="_blank">Check out the Portfolio</a> for a complete overview!`;
        }
    },
    {
        id: "cybersecurity",
        keywords: ["cybersecurity", "security", "ctf", "hack", "hacking", "tryhackme", "hackthebox", "rootme", "penetration", "ethical"],
        tag: "skills",
        respond: () => {
            const cyberProfiles = KNOWLEDGE_BASE.codingProfiles.filter(p => p.category === "Cybersecurity");
            const list = cyberProfiles.map(p => `<li><a href="${p.url}" target="_blank">${p.platform}</a></li>`).join('\n');
            return `<span class="response-tag tag-skills">Cybersecurity & CTF</span>\n\n🛡️ Active on key cybersecurity platforms:\n\n<ul>\n${list}\n</ul>\n\nFrom TryHackMe to Hack The Box — security is a serious focus area!`;
        }
    },
    {
        id: "blockchain",
        keywords: ["blockchain", "web3", "ethereum", "crypto", "solidity", "smart contract", "defi"],
        tag: "learning",
        respond: () => {
            const web3 = KNOWLEDGE_BASE.codingProfiles.filter(p => p.category === "Web3");
            const list = web3.map(p => `<li><a href="${p.url}" target="_blank">${p.platform}</a></li>`).join('\n');
            return `<span class="response-tag tag-learning">Web3 & Blockchain</span>\n\n🔗 Blockchain is one of the active learning areas! Profiles:\n\n<ul>\n${list}\n</ul>\n\nBlockchain is listed as a current learning focus alongside DevOps and AI.`;
        }
    },
    {
        id: "support",
        keywords: ["support", "donate", "buy", "coffee", "sponsor", "help", "contribute"],
        tag: "connect",
        respond: () => {
            return `<span class="response-tag tag-connect">Support</span>\n\n☕ Want to support the work? You can buy a dino! 🦖\n\n<a href="https://www.buymeacoffee.com/binilvincent5" target="_blank">☕ Buy Me a Dino →</a>\n\nEvery bit of support helps fuel more creative projects and open source contributions!`;
        }
    },
    {
        id: "thanks",
        keywords: ["thanks", "thank you", "thx", "appreciate", "awesome", "great", "cool", "nice", "amazing"],
        tag: "general",
        respond: () => {
            const responses = [
                "You're welcome! 😊 Happy to help. Ask me anything else!",
                "Glad I could help! 🚀 Feel free to explore more questions.",
                "Anytime! 💪 The bvthz5 repo has so much to explore!",
                "Thanks for the kind words! 🙌 What else would you like to know?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
];

// Fallback responses for unrecognized queries
const FALLBACK_RESPONSES = [
    "🤔 I'm not sure I understand that. Try asking about **skills**, **projects**, **stats**, **certifications**, **research**, or **how to connect**!",
    "Hmm, I don't have info on that specific topic. But I know a lot about the **bvthz5 repository**! Try asking about the tech stack, GitHub stats, or learning path.",
    "That's outside my knowledge scope! I'm specialized in the **bvthz5** repo. Want to know about projects, coding profiles, or certifications?",
    "I'm a bit lost on that one 😅. Here's what I can help with:\n• 🛠️ Skills & Tools\n• 📊 GitHub Stats\n• 📂 Projects\n• 📜 Certifications\n• 🧠 Research\n• 🌱 Learning Path\n• 🌍 Social Connections"
];
