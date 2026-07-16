const fs = require('fs');

function getSkills() {
    return [
        "Python", "JavaScript", "React", "Node.js", "Docker", 
        "GCP", "Git", "PostgreSQL", "Tailwind"
    ];
}

function getTypingPhrases() {
    return [
        "Decoding Neural Networks...",
        "Building scalable systems...",
        "Learning DevOps &amp; Blockchain...",
        "Storytelling with animation..."
    ];
}

function generateSvg(theme = 'dark') {
    const isDark = theme === 'dark';
    
    const bg_color = isDark ? "#030712" : "#FFFFFF";
    const border_color = isDark ? "rgba(255,255,255,.08)" : "rgba(15,23,42,.08)";
    const primary_text = isDark ? "#F8FAFC" : "#0F172A";
    const muted_text = isDark ? "#94A3B8" : "#475569";
    
    const accent_1 = isDark ? "#7C3AED" : "#2563EB";
    const accent_2 = isDark ? "#22D3EE" : "#06B6D4";
    const accent_3 = isDark ? "#10B981" : "#10B981";
    
    const ascii_grad_1 = isDark ? "#22D3EE" : "#2563EB";
    const ascii_grad_2 = isDark ? "#7C3AED" : "#06B6D4";
    
    const glow_opacity = isDark ? "0.4" : "0.15";
    const pill_fill = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
    const pill_hover_fill = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
    const pill_border = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    const terminal_bg = isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.4)";

    // Read processed dots file
    let dotsSvg = "";
    try {
        if (fs.existsSync('assets/dots.txt')) {
            dotsSvg = fs.readFileSync('assets/dots.txt', 'utf8');
        } else {
            dotsSvg = `<!-- NO DOT DATA: Run node process_image.js first -->
            <text x="180" y="250" fill="${muted_text}" class="code" font-size="16" text-anchor="middle">NO PORTRAIT DATA</text>`;
        }
    } catch (e) {
        console.error("Could not read assets/dots.txt:", e);
    }

    let svg = [];
    svg.push(`<svg width="1180" height="610" viewBox="0 0 1180 610" fill="none" xmlns="http://www.w3.org/2000/svg">`);
    
    svg.push('<style>');
    svg.push(`
        text { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .code { font-family: 'Fira Code', 'Courier New', monospace; }
        .pill { transition: all 0.3s ease; cursor: pointer; }
        .pill:hover rect { transform: scale(1.05); transform-origin: center; }
        .pill:hover .pill-bg { fill: ${pill_hover_fill}; stroke: ${accent_2}; }
        .pill:hover text { fill: ${accent_2}; }
        .social-icon { transition: all 0.3s ease; }
        .social-icon:hover circle { fill: rgba(255, 255, 255, 0.1); stroke: ${accent_2}; }
        .social-icon:hover path { fill: ${accent_2}; }
    `);
    svg.push('</style>');

    svg.push('<defs>');
    
    svg.push(`
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1180" y2="610" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${bg_color}"/>
            <stop offset="100%" stop-color="${bg_color}"/>
        </linearGradient>
        
        <radialGradient id="glow-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 150) rotate(90) scale(400)">
            <stop stop-color="${accent_1}" stop-opacity="${glow_opacity}"/>
            <stop offset="1" stop-color="${bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="200 150; 250 200; 150 100; 200 150" dur="10s" repeatCount="indefinite"/>
        </radialGradient>
        
        <radialGradient id="glow-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 450) rotate(90) scale(400)">
            <stop stop-color="${accent_2}" stop-opacity="${glow_opacity}"/>
            <stop offset="1" stop-color="${bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="900 450; 850 400; 950 500; 900 450" dur="12s" repeatCount="indefinite"/>
        </radialGradient>

        <linearGradient id="ascii-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${ascii_grad_1}">
                <animate attributeName="stop-color" values="${ascii_grad_1};${ascii_grad_2};${ascii_grad_1}" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="${ascii_grad_2}">
                <animate attributeName="stop-color" values="${ascii_grad_2};${ascii_grad_1};${ascii_grad_2}" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient>

        <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${accent_1}" stop-opacity="0.5"/>
            <stop offset="50%" stop-color="${border_color}"/>
            <stop offset="100%" stop-color="${accent_2}" stop-opacity="0.5"/>
            <animate attributeName="x1" values="0%;200%;0%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;200%;0%" dur="8s" repeatCount="indefinite" />
        </linearGradient>
    `);

    svg.push(`
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0"/>
        </filter>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.2"/>
        </filter>
    `);
    
    svg.push(`
        <clipPath id="canvas-clip">
            <rect width="1180" height="610" rx="20"/>
        </clipPath>
    `);

    // Dynamic Typing Reveal Animations inside Status field
    const phrases = getTypingPhrases();
    const total_time = phrases.length * 3;
    for (let i = 0; i < phrases.length; i++) {
        const start_time = i * 3;
        const type_dur = 1.2;
        const visible_dur = 1.3;
        
        svg.push(`
        <clipPath id="type-clip-${i}">
            <rect x="0" y="0" width="0" height="30">
                <animate attributeName="width" values="0; 350; 350; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.5)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
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
    svg.push(`<rect width="1180" height="610" fill="url(#noise)" style="mix-blend-mode: overlay;"/>`);
    
    // Floating particles background
    for (let i = 0; i < 12; i++) {
        const cx = 100 + (i * 85) % 1000;
        const cy = 80 + (i * 95) % 450;
        const r = 1 + (i % 3);
        svg.push(`
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${primary_text}" opacity="0">
                <animate attributeName="opacity" values="0; 0.5; 0" dur="${4 + i%4}s" begin="${i%3}s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="${cy}; ${cy - 40}; ${cy - 80}" dur="${6 + i%3}s" begin="${i%2}s" repeatCount="indefinite"/>
            </circle>
        `);
    }
    
    svg.push(`<rect width="1178" height="608" x="1" y="1" rx="19" stroke="url(#border-grad)" stroke-width="2" fill="none"/>`);

    // LEFT PANEL: AI.MAP HUD Box (x=40, y=40, width=420, height=530)
    svg.push(`<g transform="translate(40, 40)" filter="url(#soft-shadow)">`);
    svg.push(`<rect width="420" height="530" rx="8" fill="${terminal_bg}" stroke="${border_color}" stroke-width="1.5"/>`);
    
    // Cyber HUD Corner Brackets
    svg.push(`
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 390 10 L 410 10 L 410 30" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 10 500 L 10 520 L 30 520" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 390 520 L 410 520 L 410 500" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
    `);
    
    // Header
    svg.push(`
        <text x="20" y="30" fill="${accent_2}" class="code" font-size="14" font-weight="700" letter-spacing="1">AI.MAP</text>
    `);
    
    // Halftone Dots Portrait (Centered at offset 30, 40)
    svg.push(`<g transform="translate(30, 40)">`);
    svg.push(dotsSvg);
    svg.push('</g>');
    
    // Moving scanline sweep
    svg.push(`
        <line x1="10" y1="50" x2="410" y2="50" stroke="${accent_2}" stroke-width="2" opacity="0.3">
            <animate attributeName="y1" values="50; 480; 50" dur="5s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="50; 480; 50" dur="5s" repeatCount="indefinite"/>
        </line>
    `);
    svg.push('</g>'); // End LEFT PANEL

    // RIGHT PANEL: SYSTEM.INFO HUD Box (x=500, y=40, width=640, height=530)
    svg.push(`<g transform="translate(500, 40)" filter="url(#soft-shadow)">`);
    svg.push(`<rect width="640" height="530" rx="8" fill="${terminal_bg}" stroke="${border_color}" stroke-width="1.5"/>`);
    
    // Cyber HUD Corner Brackets
    svg.push(`
        <path d="M 10 30 L 10 10 L 30 10" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 610 10 L 630 10 L 630 30" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 10 500 L 10 520 L 30 520" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
        <path d="M 610 520 L 630 520 L 630 500" fill="none" stroke="url(#ascii-grad)" stroke-width="2"/>
    `);

    // Header
    svg.push(`
        <text x="20" y="30" fill="${accent_1}" class="code" font-size="14" font-weight="700" letter-spacing="1">SYSTEM.INFO</text>
    `);

    // Specs Content
    const system_specs = [
        ["Subject", "Binil Vincent"],
        ["Role", "AI/ML Developer &amp; Full-Stack"],
        ["Origin", "Kerala, India"],
        ["Education", "Computer Science Student"]
    ];

    const max_len = 15;
    const start_y = 75;
    const spacing_y = 26;

    system_specs.forEach((spec, i) => {
        const key = spec[0].padEnd(max_len, '.');
        const delay = 0.5 + i * 0.2;
        svg.push(`
            <g opacity="0" transform="translate(20, ${start_y + (i * spacing_y)})">
                <text x="0" y="0" fill="${muted_text}" class="code" font-size="14" font-weight="500">${key}</text>
                <text x="160" y="0" fill="${primary_text}" class="code" font-size="14">${spec[1]}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="${delay}s" fill="freeze"/>
                <animateTransform attributeName="transform" type="translate" values="20, ${start_y + (i * spacing_y) + 8}; 20, ${start_y + (i * spacing_y)}" dur="0.4s" begin="${delay}s" fill="freeze"/>
            </g>
        `);
    });

    // Integrated Dynamic Typing Status field
    const status_key = "Status".padEnd(max_len, '.');
    const status_y = start_y + (system_specs.length * spacing_y);
    const status_delay = 0.5 + system_specs.length * 0.2;
    
    svg.push(`
        <g opacity="0" transform="translate(20, ${status_y})">
            <text x="0" y="0" fill="${muted_text}" class="code" font-size="14" font-weight="500">${status_key}</text>
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="${status_delay}s" fill="freeze"/>
            <animateTransform attributeName="transform" type="translate" values="20, ${status_y + 8}; 20, ${status_y}" dur="0.4s" begin="${status_delay}s" fill="freeze"/>
            
            <!-- Type loop group offset exactly after dots (160px) -->
            <g transform="translate(160, -12)">
    `);

    phrases.forEach((phrase, i) => {
        const start_time = i * 3;
        const type_dur = 1.2;
        const visible_dur = 1.3;
        const L = phrase.length;
        
        svg.push(`
            <g opacity="0">
                <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.5)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
                
                <g clip-path="url(#type-clip-${i})">
                    <text x="0" y="12" fill="${accent_2}" class="code" font-size="14">${phrase}</text>
                </g>
                
                <!-- Typing block cursor -->
                <rect x="0" y="0" width="8" height="14" fill="${accent_2}">
                    <animate attributeName="x" values="0; ${L * 8.4}; ${L * 8.4}" keyTimes="0; ${type_dur/3}; 1" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 0; 1" dur="1s" repeatCount="indefinite" />
                </rect>
            </g>
        `);
    });

    svg.push(`
            </g>
        </g>
    `);

    // Core Stack subsection header
    const core_header_y = 225;
    svg.push(`
        <text x="20" y="${core_header_y}" fill="${accent_1}" class="code" font-size="14" font-weight="700" opacity="0">
            CORE.STACK
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="1.6s" fill="freeze" />
        </text>
    `);

    const core_specs = [
        ["Core.Lang", "Python, JavaScript, C#, SQL"],
        ["Core.Frontend", "React, HTML, CSS, Tailwind"],
        ["Core.Backend", "Node.js, Express.js, Flask"],
        ["Core.Database", "PostgreSQL, MySQL, SQLite"],
        ["Core.Infra", "Docker, GCP, Vertex AI"]
    ];

    const core_start_y = 250;
    core_specs.forEach((spec, i) => {
        const key = spec[0].padEnd(max_len, '.');
        const delay = 1.8 + i * 0.15;
        svg.push(`
            <g opacity="0" transform="translate(20, ${core_start_y + (i * spacing_y)})">
                <text x="0" y="0" fill="${muted_text}" class="code" font-size="14" font-weight="500">${key}</text>
                <text x="160" y="0" fill="${primary_text}" class="code" font-size="14">${spec[1]}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="${delay}s" fill="freeze"/>
                <animateTransform attributeName="transform" type="translate" values="20, ${core_start_y + (i * spacing_y) + 8}; 20, ${core_start_y + (i * spacing_y)}" dur="0.4s" begin="${delay}s" fill="freeze"/>
            </g>
        `);
    });

    // Tech Stack glowing pills section (Horizontal layout)
    const skills_y = 395;
    svg.push(`
        <text x="20" y="${skills_y}" fill="${primary_text}" font-size="14" font-weight="600" opacity="0">
            Tech Stack &amp; Tools
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="2.6s" fill="freeze" />
        </text>
    `);

    const skills = getSkills();
    let pill_x = 20;
    let pill_y = 410;
    const pill_height = 28;
    const padding_x = 10;
    const margin_x = 8;
    
    skills.forEach((skill, i) => {
        const text_width = skill.length * 8;
        const pill_width = text_width + (padding_x * 2);
        
        const delay = 2.8 + (i * 0.08);
        
        svg.push(`
            <g class="pill" transform="translate(${pill_x}, ${pill_y})" opacity="0">
                <rect class="pill-bg" width="${pill_width}" height="${pill_height}" rx="14" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                <text x="${pill_width/2}" y="${pill_height/2 + 4}" fill="${muted_text}" font-size="12" font-weight="500" text-anchor="middle">${skill}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="${delay}s" fill="freeze" />
            </g>
        `);
        pill_x += pill_width + margin_x;
    });

    // Horizontal divider above footer
    svg.push(`
        <line x1="20" y1="465" x2="620" y2="465" stroke="${border_color}" stroke-width="1" opacity="0"/>
        <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="3.2s" fill="freeze"/>
    `);

    // Social Buttons Footer (Row of glowing icon buttons)
    svg.push(`<g transform="translate(20, 480)" opacity="0">`);
    svg.push(`<animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="3.5s" fill="freeze" />`);
    
    const github_path = "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z";
    const linkedin_path = "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.783-1.764 1.75-1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
    const x_path = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
    const portfolio_path = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z";

    const socials = [
        { path: github_path, url: "https://github.com/bvthz5", label: "GitHub" },
        { path: linkedin_path, url: "https://www.linkedin.com/in/binil-vincent-b150aa187", label: "LinkedIn" },
        { path: x_path, url: "https://twitter.com", label: "Twitter" },
        { path: portfolio_path, url: "https://bvthz5.github.io/Portfolio/", label: "Portfolio" }
    ];

    socials.forEach((social, i) => {
        svg.push(`
            <a href="${social.url}" target="_blank">
                <g class="social-icon" transform="translate(${i * 150}, 0)">
                    <circle cx="16" cy="16" r="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <path d="${social.path}" transform="translate(6, 6) scale(0.83)" fill="${muted_text}"/>
                    <text x="38" y="20" fill="${muted_text}" class="code" font-size="13" font-weight="600">${social.label}</text>
                </g>
            </a>
        `);
    });
    
    svg.push('</g>'); // End Socials Footer

    svg.push('</g>'); // End RIGHT PANEL

    svg.push('</g>'); // End Canvas clip
    svg.push('</svg>');
    
    return svg.join('\n');
}

fs.writeFileSync("dark.svg", generateSvg('dark'));
fs.writeFileSync("light.svg", generateSvg('light'));
console.log("Successfully generated dark.svg and light.svg");
