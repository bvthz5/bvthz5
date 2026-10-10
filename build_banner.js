const fs = require('fs');
const { Jimp } = require('jimp');

function getDevOpsSkills() {
    return [
        { name: "Kubernetes", color: "#326CE5" },
        { name: "Docker", color: "#2496ED" },
        { name: "Terraform", color: "#844FBA" },
        { name: "Ansible", color: "#EE0000" },
        { name: "AWS", color: "#FF9900" },
        { name: "Azure", color: "#0078D4" },
        { name: "Linux", color: "#FCC624" },
        { name: "CI/CD", color: "#22D3EE" },
        { name: "Prometheus", color: "#E6522C" },
        { name: "Grafana", color: "#F46800" },
        { name: "Netdata", color: "#00AB44" }
    ];
}

function getSoftwareSkills() {
    return [
        { name: ".NET Core", color: "#512BD4" },
        { name: "Node.js", color: "#4ADE80" },
        { name: "Python", color: "#38BDF8" },
        { name: "React", color: "#22D3EE" },
        { name: "PostgreSQL", color: "#818CF8" },
        { name: "SQL Server", color: "#CC2927" },
        { name: "MySQL", color: "#4479A1" }
    ];
}

function getTypingPhrases() {
    return [
        "Orchestrating Kubernetes and Microservices...",
        "Automating Multi-Cloud Infrastructure (AWS/Azure)...",
        "Deploying Continuous Delivery (CI/CD) Pipelines...",
        "Real-Time Monitoring with Prometheus and Grafana...",
        "Engineering High-Scale .NET and Python Systems..."
    ];
}

function generateSvg(theme = 'dark', base64Photo = '') {
    const isDark = theme === 'dark';
    
    const bg_color = isDark ? "#030712" : "#F8FAFC";
    const panel_bg = isDark ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.88)";
    const border_color = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)";
    const card_bg = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.03)";
    const card_border = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(15, 23, 42, 0.07)";
    
    const primary_text = isDark ? "#F8FAFC" : "#0F172A";
    const secondary_text = isDark ? "#CBD5E1" : "#334155";
    const muted_text = isDark ? "#94A3B8" : "#64748B";
    const dim_text = isDark ? "#64748B" : "#94A3B8";
    
    const accent_cyan = isDark ? "#22D3EE" : "#0891B2";
    const accent_purple = isDark ? "#818CF8" : "#4F46E5";
    const accent_emerald = isDark ? "#10B981" : "#059669";
    
    const glow_opacity = isDark ? "0.4" : "0.15";
    const pill_fill = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.04)";
    const pill_border = isDark ? "rgba(255, 255, 255, 0.09)" : "rgba(15, 23, 42, 0.09)";

    // Read processed dots file
    let dotsSvg = "";
    try {
        if (fs.existsSync('assets/dots.txt')) {
            dotsSvg = fs.readFileSync('assets/dots.txt', 'utf8');
        } else {
            dotsSvg = `<text x="180" y="250" fill="${muted_text}" class="code" font-size="16" text-anchor="middle">NO PORTRAIT DATA</text>`;
        }
    } catch (e) {
        console.error("Could not read assets/dots.txt:", e);
    }

    let svg = [];
    svg.push(`<svg width="1180" height="610" viewBox="0 0 1180 610" fill="none" xmlns="http://www.w3.org/2000/svg">`);
    
    svg.push('<style>');
    svg.push(`
        text { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .code { font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace; }
        .pill { transition: all 0.25s ease; cursor: pointer; }
        .pill:hover rect { fill: ${isDark ? 'rgba(34, 211, 238, 0.12)' : 'rgba(8, 145, 178, 0.1)'}; stroke: ${accent_cyan}; }
        .social-btn { transition: all 0.25s ease; cursor: pointer; }
        .social-btn:hover rect { fill: ${isDark ? 'rgba(129, 140, 248, 0.15)' : 'rgba(79, 70, 229, 0.1)'}; stroke: ${accent_purple}; }
        .social-btn:hover text { fill: ${primary_text}; }
        .social-btn:hover path { fill: ${accent_cyan}; }
        .meta-card { transition: all 0.25s ease; }
        .meta-card:hover rect { stroke: ${accent_cyan}; fill: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}; }
    `);
    svg.push('</style>');

    svg.push('<defs>');
    
    svg.push(`
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1180" y2="610" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${bg_color}"/>
            <stop offset="100%" stop-color="${bg_color}"/>
        </linearGradient>
        
        <radialGradient id="glow-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 180) rotate(90) scale(450)">
            <stop stop-color="${accent_purple}" stop-opacity="${glow_opacity}"/>
            <stop offset="1" stop-color="${bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="220 180; 260 220; 180 140; 220 180" dur="12s" repeatCount="indefinite"/>
        </radialGradient>
        
        <radialGradient id="glow-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(940 420) rotate(90) scale(450)">
            <stop stop-color="${accent_cyan}" stop-opacity="${glow_opacity}"/>
            <stop offset="1" stop-color="${bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="940 420; 900 380; 980 460; 940 420" dur="14s" repeatCount="indefinite"/>
        </radialGradient>

        <linearGradient id="name-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${isDark ? '#38BDF8' : '#0284C7'}"/>
            <stop offset="50%" stop-color="${isDark ? '#818CF8' : '#4F46E5'}"/>
            <stop offset="100%" stop-color="${isDark ? '#22D3EE' : '#06B6D4'}"/>
        </linearGradient>

        <linearGradient id="ascii-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${accent_cyan}">
                <animate attributeName="stop-color" values="${accent_cyan};${accent_purple};${accent_cyan}" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="${accent_purple}">
                <animate attributeName="stop-color" values="${accent_purple};${accent_cyan};${accent_purple}" dur="6s" repeatCount="indefinite" />
            </stop>
        </linearGradient>

        <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${accent_purple}" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="${border_color}"/>
            <stop offset="100%" stop-color="${accent_cyan}" stop-opacity="0.6"/>
            <animate attributeName="x1" values="0%;200%;0%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;200%;0%" dur="10s" repeatCount="indefinite" />
        </linearGradient>

        <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${accent_cyan}" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="${accent_purple}" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="${border_color}" stop-opacity="0.1"/>
        </linearGradient>
    `);

    svg.push(`
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" flood-opacity="${isDark ? '0.35' : '0.08'}"/>
        </filter>
        <clipPath id="canvas-clip">
            <rect width="1180" height="610" rx="20"/>
        </clipPath>
        <clipPath id="avatar-clip">
            <rect width="360" height="450" rx="10"/>
        </clipPath>
    `);

    // Dynamic Typing Reveal Animations for Status Chip
    const phrases = getTypingPhrases();
    const total_time = phrases.length * 3.5;
    for (let i = 0; i < phrases.length; i++) {
        const start_time = i * 3.5;
        const type_dur = 1.3;
        const visible_dur = 1.6;
        
        svg.push(`
        <clipPath id="type-clip-${i}">
            <rect x="0" y="0" width="0" height="25">
                <animate attributeName="width" values="0; 265; 265; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.4)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
            </rect>
        </clipPath>
        `);
    }

    svg.push('</defs>');

    // Canvas Background
    svg.push(`<g clip-path="url(#canvas-clip)">`);
    svg.push(`<rect width="1180" height="610" fill="url(#bg-grad)"/>`);
    svg.push(`<rect width="1180" height="610" fill="url(#glow-1)"/>`);
    svg.push(`<rect width="1180" height="610" fill="url(#glow-2)"/>`);
    
    // Grid particles
    for (let i = 0; i < 14; i++) {
        const cx = 80 + (i * 80) % 1100;
        const cy = 60 + (i * 90) % 520;
        const r = 1 + (i % 2);
        svg.push(`
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${accent_cyan}" opacity="0">
                <animate attributeName="opacity" values="0; 0.45; 0" dur="${5 + i%4}s" begin="${i%3}s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="${cy}; ${cy - 35}; ${cy - 70}" dur="${7 + i%3}s" begin="${i%2}s" repeatCount="indefinite"/>
            </circle>
        `);
    }
    
    svg.push(`<rect width="1178" height="608" x="1" y="1" rx="19" stroke="url(#border-grad)" stroke-width="1.5" fill="none"/>`);

    // ----------------------------------------------------
    // LEFT PANEL: Hybrid Morphing Portrait (Dots <-> Real Photo) (x=40, y=40, w=420, h=530)
    // ----------------------------------------------------
    svg.push(`<g transform="translate(40, 40)" filter="url(#soft-shadow)">`);
    svg.push(`<rect width="420" height="530" rx="14" fill="${panel_bg}" stroke="${border_color}" stroke-width="1.5"/>`);
    
    // Corner Brackets
    svg.push(`
        <path d="M 12 32 L 12 12 L 32 12" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 388 12 L 408 12 L 408 32" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 12 498 L 12 518 L 32 518" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 388 518 L 408 518 L 408 498" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
    `);
    
    // Header HUD (Clean - No 'Biometrics')
    svg.push(`
        <g transform="translate(20, 26)">
            <circle cx="5" cy="0" r="4" fill="${accent_emerald}">
                <animate attributeName="opacity" values="1; 0.3; 1" dur="2s" repeatCount="indefinite"/>
            </circle>
            <text x="16" y="4" fill="${accent_cyan}" class="code" font-size="12" font-weight="700" letter-spacing="1.5">ENGINEER PROFILE // LIVE</text>
            <text x="375" y="4" fill="${dim_text}" class="code" font-size="10" font-weight="600" text-anchor="end">ONLINE</text>
        </g>
    `);
    
    // Portrait Stage: Transition between Halftone Matrix Dots and Real Photo
    svg.push(`<g transform="translate(30, 42)">`);
    
    // Stage 1: Real Photo (smoothly fades in, then fades back to dots)
    if (base64Photo) {
        svg.push(`
            <g opacity="0" clip-path="url(#avatar-clip)">
                <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.32; 0.48; 0.82; 0.94; 1" dur="9s" repeatCount="indefinite"/>
                <image href="data:image/jpeg;base64,${base64Photo}" x="0" y="0" width="360" height="450" preserveAspectRatio="xMidYMid slice"/>
                <!-- Subtle cyber vignette overlay on photo -->
                <rect width="360" height="450" fill="none" stroke="${accent_cyan}" stroke-width="1.5" opacity="0.4"/>
            </g>
        `);
    }

    // Stage 2: Halftone Matrix Dots (morphs with photo)
    svg.push(`
        <g opacity="1">
            <animate attributeName="opacity" values="1; 1; 0; 0; 1; 1" keyTimes="0; 0.32; 0.48; 0.82; 0.94; 1" dur="9s" repeatCount="indefinite"/>
            ${dotsSvg}
        </g>
    `);

    // Dynamic scanline sweep
    svg.push(`
        <line x1="0" y1="10" x2="360" y2="10" stroke="${accent_cyan}" stroke-width="1.5" opacity="0.3">
            <animate attributeName="y1" values="10; 440; 10" dur="4.5s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="10; 440; 10" dur="4.5s" repeatCount="indefinite"/>
        </line>
    `);

    svg.push('</g>'); // End Portrait Stage

    // Bottom Footer inside Portrait Card
    svg.push(`
        <g transform="translate(20, 506)">
            <text x="0" y="0" fill="${dim_text}" class="code" font-size="10" font-weight="600" letter-spacing="1">DEVOPS &amp; SOFTWARE ARCHITECT</text>
            <!-- Animated audio/frequency bars -->
            <g transform="translate(340, -8)">
                <rect x="0" y="0" width="3" height="10" fill="${accent_cyan}" rx="1"><animate attributeName="height" values="4;10;6;4" dur="1.2s" repeatCount="indefinite"/></rect>
                <rect x="6" y="0" width="3" height="10" fill="${accent_purple}" rx="1"><animate attributeName="height" values="8;3;10;8" dur="1s" repeatCount="indefinite"/></rect>
                <rect x="12" y="0" width="3" height="10" fill="${accent_cyan}" rx="1"><animate attributeName="height" values="3;9;4;3" dur="1.4s" repeatCount="indefinite"/></rect>
                <rect x="18" y="0" width="3" height="10" fill="${accent_emerald}" rx="1"><animate attributeName="height" values="7;4;9;7" dur="1.1s" repeatCount="indefinite"/></rect>
            </g>
        </g>
    `);
    svg.push('</g>'); // End LEFT PANEL

    // ----------------------------------------------------
    // RIGHT PANEL: DevOps & Software Engineering Focus (x=490, y=40, w=650, h=530)
    // ----------------------------------------------------
    svg.push(`<g transform="translate(490, 40)" filter="url(#soft-shadow)">`);
    svg.push(`<rect width="650" height="530" rx="14" fill="${panel_bg}" stroke="${border_color}" stroke-width="1.5"/>`);
    
    // Cyber HUD Corner Brackets
    svg.push(`
        <path d="M 12 32 L 12 12 L 32 12" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 618 12 L 638 12 L 638 32" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 12 498 L 12 518 L 32 518" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 618 518 L 638 518 L 638 498" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
    `);

    // Top HUD Bar
    svg.push(`
        <g transform="translate(30, 26)">
            <text x="0" y="4" fill="${accent_purple}" class="code" font-size="11" font-weight="700" letter-spacing="1.5">// CLOUD &amp; DEVOPS INFRASTRUCTURE</text>
            <g transform="translate(470, 0)">
                <circle cx="5" cy="0" r="3.5" fill="${accent_emerald}">
                    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                <text x="16" y="4" fill="${accent_emerald}" class="code" font-size="10" font-weight="700">STATUS: ACTIVE</text>
            </g>
        </g>
    `);

    // Main Hero Identity: Binil Vincent
    svg.push(`
        <g transform="translate(30, 68)" opacity="0">
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="0.2s" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="30, 78; 30, 68" dur="0.4s" begin="0.2s" fill="freeze"/>
            
            <!-- Name Title -->
            <text x="0" y="28" font-size="34" font-weight="800" letter-spacing="-0.5" fill="url(#name-grad)">Binil Vincent</text>
            
            <!-- Highlighted Primary Role: DevOps Engineer & Software Engineer -->
            <text x="0" y="54" font-size="15.5" font-weight="700" fill="${primary_text}">
                <tspan fill="${accent_cyan}">DevOps Engineer</tspan> <tspan fill="${accent_purple}">//</tspan> Software Engineer
            </text>
            
            <!-- Focused Impact Statement -->
            <text x="0" y="75" font-size="12.5" font-weight="400" fill="${muted_text}">
                Automating Cloud Platforms, Kubernetes Orchestration &amp; High-Scale Distributed Systems.
            </text>
        </g>
    `);

    // Sleek Accent Divider
    svg.push(`
        <line x1="30" y1="160" x2="620" y2="160" stroke="url(#line-glow)" stroke-width="1"/>
    `);

    // Helper SVG vector icons for cards
    const grad_cap_icon = `<path d="M7 1L1 4l6 3 6-3-6-3zm0 4.5L3 4l4-2 4 2-4 1.5zM3 6.5v3.5c0 1.5 2 2.5 4 2.5s4-1 4-2.5V6.5l-4 2-4-2z" fill="${accent_purple}"/>`;
    const cpu_gear_icon = `<path d="M5 2h4v2H5V2zm0 10h4v2H5v-2zm-3-7h2v4H2V5zm10 0h2v4h-2V5zM4 4h6v6H4V4z" fill="${accent_cyan}"/>`;
    const pin_icon = `<path d="M7 1a4 4 0 00-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 00-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="${accent_cyan}"/>`;
    const live_icon = `<circle cx="6" cy="6" r="3.5" fill="${accent_emerald}"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/></circle>`;

    // 4 Modern Meta Cards (2x2 Grid)
    const cards = [
        {
            iconSvg: grad_cap_icon,
            label: "EDUCATION",
            value: "MCA &amp; BCA (Computer Applications)",
            x: 30,
            y: 172,
            w: 285,
            h: 48
        },
        {
            iconSvg: cpu_gear_icon,
            label: "SPECIFICATION",
            value: "DevOps &amp; Software Engineering",
            x: 335,
            y: 172,
            w: 285,
            h: 48
        },
        {
            iconSvg: pin_icon,
            label: "LOCATION",
            value: "Kerala, India",
            x: 30,
            y: 228,
            w: 285,
            h: 48
        },
        {
            iconSvg: live_icon,
            label: "LIVE FOCUS",
            value: null, // Dynamic typing
            x: 335,
            y: 228,
            w: 285,
            h: 48
        }
    ];

    cards.forEach((c, i) => {
        const delay = 0.35 + i * 0.08;
        svg.push(`
            <g class="meta-card" transform="translate(${c.x}, ${c.y})" opacity="0">
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="${delay}s" fill="freeze"/>
                <animateTransform attributeName="transform" type="translate" values="${c.x}, ${c.y + 6}; ${c.x}, ${c.y}" dur="0.3s" begin="${delay}s" fill="freeze"/>
                <rect width="${c.w}" height="${c.h}" rx="8" fill="${card_bg}" stroke="${card_border}" stroke-width="1"/>
                
                <g transform="translate(10, 9)">
                    <svg width="14" height="14" viewBox="0 0 14 14">${c.iconSvg}</svg>
                </g>
                <text x="30" y="20" fill="${dim_text}" class="code" font-size="9.5" font-weight="700" letter-spacing="1">
                    ${c.label}
                </text>
        `);

        if (c.value) {
            svg.push(`
                <text x="12" y="38" fill="${secondary_text}" font-size="12" font-weight="600">${c.value}</text>
            `);
        } else {
            // Dynamic typing for Live Focus card
            svg.push(`<g transform="translate(12, 25)">`);
            phrases.forEach((phrase, pi) => {
                const start_time = pi * 3.5;
                const type_dur = 1.3;
                const visible_dur = 1.6;
                const L = phrase.length;
                svg.push(`
                    <g opacity="0">
                        <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.4)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
                        <g clip-path="url(#type-clip-${pi})">
                            <text x="0" y="13" fill="${accent_cyan}" class="code" font-size="11" font-weight="500">${phrase}</text>
                        </g>
                        <rect x="0" y="2" width="6" height="12" fill="${accent_cyan}">
                            <animate attributeName="x" values="0; ${L * 6.8}; ${L * 6.8}" keyTimes="0; ${type_dur/3.5}; 1" dur="3.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1; 0; 1" dur="0.8s" repeatCount="indefinite" />
                        </rect>
                    </g>
                `);
            });
            svg.push(`</g>`);
        }

        svg.push(`</g>`);
    });

    // Sleek Accent Divider
    svg.push(`
        <line x1="30" y1="288" x2="620" y2="288" stroke="${border_color}" stroke-width="1"/>
    `);

    // Section 1: DEVOPS, CLOUD & OBSERVABILITY (Main Priority Highlight)
    svg.push(`
        <g transform="translate(30, 306)" opacity="0">
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="0.7s" fill="freeze"/>
            <text x="0" y="0" fill="${accent_cyan}" class="code" font-size="10.5" font-weight="700" letter-spacing="1.5">☁️ DEVOPS, CLOUD &amp; OBSERVABILITY</text>
        </g>
    `);

    const devopsSkills = getDevOpsSkills();
    let pill_x = 30;
    let pill_y = 316;
    const pill_h = 24;
    const pad_x = 9;
    const gap_x = 6;
    
    devopsSkills.forEach((skill, i) => {
        const text_w = skill.name.length * 7;
        const pill_w = text_w + (pad_x * 2) + 6;
        
        if (pill_x + pill_w > 620) {
            pill_x = 30;
            pill_y += 28;
        }

        const delay = 0.75 + i * 0.04;
        svg.push(`
            <g class="pill" transform="translate(${pill_x}, ${pill_y})" opacity="0">
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="${delay}s" fill="freeze"/>
                <rect width="${pill_w}" height="${pill_h}" rx="12" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                <circle cx="${pad_x + 1}" cy="${pill_h/2}" r="2.8" fill="${skill.color}"/>
                <text x="${pad_x + 8}" y="${pill_h/2 + 3.5}" fill="${secondary_text}" font-size="11" font-weight="600">${skill.name}</text>
            </g>
        `);
        pill_x += pill_w + gap_x;
    });

    // Section 2: SOFTWARE & DATABASE ENGINEERING
    const soft_y = pill_y + 36;
    svg.push(`
        <g transform="translate(30, ${soft_y})" opacity="0">
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="1.0s" fill="freeze"/>
            <text x="0" y="0" fill="${accent_purple}" class="code" font-size="10.5" font-weight="700" letter-spacing="1.5">💻 SOFTWARE &amp; DATABASE ENGINEERING</text>
        </g>
    `);

    const softwareSkills = getSoftwareSkills();
    pill_x = 30;
    pill_y = soft_y + 10;
    
    softwareSkills.forEach((skill, i) => {
        const text_w = skill.name.length * 7;
        const pill_w = text_w + (pad_x * 2) + 6;
        
        if (pill_x + pill_w > 620) {
            pill_x = 30;
            pill_y += 28;
        }

        const delay = 1.05 + i * 0.04;
        svg.push(`
            <g class="pill" transform="translate(${pill_x}, ${pill_y})" opacity="0">
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="${delay}s" fill="freeze"/>
                <rect width="${pill_w}" height="${pill_h}" rx="12" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                <circle cx="${pad_x + 1}" cy="${pill_h/2}" r="2.8" fill="${skill.color}"/>
                <text x="${pad_x + 8}" y="${pill_h/2 + 3.5}" fill="${secondary_text}" font-size="11" font-weight="600">${skill.name}</text>
            </g>
        `);
        pill_x += pill_w + gap_x;
    });

    // Divider above social buttons
    svg.push(`
        <line x1="30" y1="452" x2="620" y2="452" stroke="${border_color}" stroke-width="1"/>
    `);

    // Social & Quick Connect Footer Buttons
    svg.push(`<g transform="translate(30, 468)" opacity="0">`);
    svg.push(`<animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.01; 1" dur="100s" begin="1.2s" fill="freeze"/>`);
    
    const github_path = "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z";
    const linkedin_path = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.783-1.764 1.75-1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
    const x_path = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
    const portfolio_path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z";

    const socials = [
        { path: github_path, url: "https://github.com/bvthz5", label: "GitHub", w: 135 },
        { path: linkedin_path, url: "https://www.linkedin.com/in/binil-vincent-b150aa187", label: "LinkedIn", w: 135 },
        { path: x_path, url: "https://twitter.com", label: "Twitter / X", w: 140 },
        { path: portfolio_path, url: "https://bvthz5.github.io/Portfolio/", label: "Portfolio", w: 140 }
    ];

    let soc_x = 0;
    socials.forEach((social) => {
        svg.push(`
            <a href="${social.url}" target="_blank">
                <g class="social-btn" transform="translate(${soc_x}, 0)">
                    <rect width="${social.w}" height="36" rx="8" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                    <path d="${social.path}" transform="translate(12, 8) scale(0.85)" fill="${muted_text}"/>
                    <text x="36" y="23" fill="${secondary_text}" font-size="12" font-weight="600">${social.label}</text>
                </g>
            </a>
        `);
        soc_x += social.w + 12;
    });
    
    svg.push('</g>'); // End Socials Footer

    svg.push('</g>'); // End RIGHT PANEL

    svg.push('</g>'); // End Canvas clip
    svg.push('</svg>');
    
    return svg.join('\n');
}

async function main() {
    let base64Photo = "";
    try {
        if (fs.existsSync('assets/bv.jpeg')) {
            const img = await Jimp.read('assets/bv.jpeg');
            img.resize({ w: 360, h: 450 });
            const buf = await img.getBuffer('image/jpeg', { quality: 80 });
            base64Photo = buf.toString('base64');
            console.log("Embedded base64 photo prepared (" + buf.length + " bytes).");
        }
    } catch (e) {
        console.error("Could not process assets/bv.jpeg for banner:", e);
    }

    fs.writeFileSync("dark.svg", generateSvg('dark', base64Photo));
    fs.writeFileSync("light.svg", generateSvg('light', base64Photo));
    console.log("Successfully generated dark.svg and light.svg");
}

main();
