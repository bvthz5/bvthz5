const fs = require('fs');

function getSkills() {
    return [
        "Python", "JavaScript", "React", "Node.js", "Docker", 
        "GCP", "Git", "PostgreSQL", "PyTorch", "Tailwind", "Figma"
    ];
}

function getTypingPhrases() {
    return [
        "Full Stack Developer",
        "AI/ML Developer",
        "Cloud & DevOps Enthusiast",
        "Blockchain Explorer"
    ];
}

function generateSvg(theme = 'dark') {
    const isDark = theme === 'dark';
    
    const bg_color = isDark ? "#030712" : "#FFFFFF";
    const panel_color = isDark ? "#0F172A" : "#FFFFFF";
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
    const terminal_bg = isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(255, 255, 255, 0.6)";

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
        <clipPath id="terminal-clip">
            <rect width="700" height="530" rx="16"/>
        </clipPath>
        <clipPath id="canvas-clip">
            <rect width="1180" height="610" rx="20"/>
        </clipPath>
        <clipPath id="avatar-clip">
            <circle cx="200" cy="250" r="100"/>
        </clipPath>
    `);

    const phrases = getTypingPhrases();
    const total_time = phrases.length * 3;
    for (let i = 0; i < phrases.length; i++) {
        const start_time = i * 3;
        const type_dur = 1;
        const visible_dur = 1.5;
        
        svg.push(`
        <clipPath id="type-clip-${i}">
            <rect x="0" y="0" width="0" height="30">
                <animate attributeName="width" values="0; 450; 450; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.5)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
            </rect>
        </clipPath>
        `);
    }

    svg.push('</defs>');

    svg.push(`<g clip-path="url(#canvas-clip)">`);
    svg.push(`<rect width="1180" height="610" fill="url(#bg-grad)"/>`);
    svg.push(`<rect width="1180" height="610" fill="url(#glow-1)"/>`);
    svg.push(`<rect width="1180" height="610" fill="url(#glow-2)"/>`);
    svg.push(`<rect width="1180" height="610" fill="url(#noise)" style="mix-blend-mode: overlay;"/>`);
    
    for (let i = 0; i < 15; i++) {
        const cx = 100 + (i * 70) % 1000;
        const cy = 50 + (i * 90) % 500;
        const r = 1 + (i % 3);
        svg.push(`
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="${primary_text}" opacity="0">
                <animate attributeName="opacity" values="0; 0.6; 0" dur="${3 + i%4}s" begin="${i%3}s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="${cy}; ${cy - 50}; ${cy - 100}" dur="${5 + i%3}s" begin="${i%2}s" repeatCount="indefinite"/>
            </circle>
        `);
    }
    
    svg.push(`<rect width="1178" height="608" x="1" y="1" rx="19" stroke="url(#border-grad)" stroke-width="2" fill="none"/>`);

    // LEFT SIDE: Profile image frame (centered at x=220, y=305)
    svg.push(`<g transform="translate(40, 40)">`);
    svg.push(`<animateTransform attributeName="transform" type="translate" values="40,40; 40,32; 40,40" dur="6s" repeatCount="indefinite" />`);
    
    // Outer Frame Glow and Border
    svg.push(`
        <circle cx="200" cy="250" r="110" fill="rgba(255,255,255,0.02)" stroke="url(#border-grad)" stroke-width="2" filter="url(#soft-shadow)"/>
    `);
    
    // Avatar Clip containing both Fallback and Real Image
    svg.push(`<g clip-path="url(#avatar-clip)">`);
    
    // Sleek Vector Monogram (100% GitHub Supported)
    svg.push(`
        <!-- Inner glowing circle -->
        <circle cx="200" cy="250" r="70" fill="rgba(0,0,0,0.2)" stroke="url(#ascii-grad)" stroke-width="3"/>
        
        <!-- Rotating dashed tech ring -->
        <circle cx="200" cy="250" r="85" fill="none" stroke="url(#border-grad)" stroke-width="2" stroke-dasharray="6 12">
            <animateTransform attributeName="transform" type="rotate" values="0 200 250; 360 200 250" dur="20s" repeatCount="indefinite"/>
        </circle>
        
        <!-- Monogram Text -->
        <text x="200" y="275" fill="${primary_text}" font-size="72" font-weight="900" text-anchor="middle" letter-spacing="-4px">
            B<tspan fill="${accent_2}">V</tspan>
        </text>
        
        <!-- Pulsing accent dot -->
        <circle cx="255" cy="205" r="6" fill="${accent_1}" filter="url(#soft-shadow)">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
        </circle>
    `);
    
    svg.push('</g>'); // End avatar clip
    
    // Scanner sweep line over avatar
    svg.push(`
        <line x1="90" y1="140" x2="310" y2="140" stroke="${accent_2}" stroke-width="2" opacity="0.4">
            <animate attributeName="y1" values="140; 360; 140" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="y2" values="140; 360; 140" dur="4s" repeatCount="indefinite"/>
        </line>
    `);
    
    svg.push('</g>'); // End LEFT SIDE

    // RIGHT SIDE: Terminal Window (occupies ~62% -> width ~700, x=440, y=40)
    svg.push(`<g transform="translate(440, 40)" filter="url(#soft-shadow)">`);
    
    // Terminal Background / Glassmorphism
    svg.push(`
        <rect width="700" height="530" rx="16" fill="${terminal_bg}" stroke="${border_color}" stroke-width="1.5" />
    `);

    // Terminal Header
    svg.push(`<g transform="translate(20, 20)">`);
    svg.push(`<circle cx="10" cy="0" r="6" fill="#FF5F56"/>`);
    svg.push(`<circle cx="30" cy="0" r="6" fill="#FFBD2E"/>`);
    svg.push(`<circle cx="50" cy="0" r="6" fill="#27C93F"/>`);
    svg.push(`</g>`);
    
    // Terminal Title
    svg.push(`
        <text x="350" y="24" fill="${muted_text}" class="code" font-size="13" text-anchor="middle" letter-spacing="1">binilvincent ~ bash</text>
    `);

    // Terminal Content
    svg.push(`<g transform="translate(40, 80)">`);
    
    // Greeting
    svg.push(`
        <text x="0" y="0" fill="${primary_text}" font-size="34" font-weight="800" letter-spacing="-0.5px">Hi 👋</text>
        <text x="0" y="42" fill="${primary_text}" font-size="34" font-weight="800" letter-spacing="-0.5px">I'm Binil Vincent</text>
    `);

    // Animated Typing text
    svg.push(`<g transform="translate(0, 85)">`);
    svg.push(`<text x="0" y="20" fill="${accent_2}" class="code" font-size="18">&gt;</text>`);
    
    phrases.forEach((phrase, i) => {
        const start_time = i * 3;
        const type_dur = 1;
        const visible_dur = 1.5;
        const L = phrase.length;
        
        svg.push(`
            <g opacity="0">
                <animate attributeName="opacity" values="0; 1; 1; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.5)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
                
                <g clip-path="url(#type-clip-${i})">
                    <text x="20" y="20" fill="${accent_2}" class="code" font-size="18">${phrase}</text>
                </g>
                
                <rect y="4" width="8" height="18" fill="${accent_2}">
                    <animate attributeName="x" values="20; ${20 + L * 10.8}; ${20 + L * 10.8}" keyTimes="0; ${type_dur/3}; 1" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1; 0; 1" dur="1s" repeatCount="indefinite" />
                </rect>
            </g>
        `);
    });
    
    svg.push('</g>'); 

    const info_items = [
        ["Location", "India"],
        ["Education", "Computer Science Student"],
        ["Current Focus", "AI, DevOps & Blockchain"],
        ["Portfolio", "bvthz5.github.io/Portfolio"],
        ["Email", "binilvincent80@gmail.com"]
    ];
    
    const info_start_y = 155;
    info_items.forEach((item, i) => {
        const delay = 1.5 + (i * 0.3);
        svg.push(`
            <g opacity="0" transform="translate(0, ${info_start_y + (i * 26)})">
                <text x="0" y="0" fill="${muted_text}" class="code" font-size="15" font-weight="500">${item[0]}:</text>
                <text x="150" y="0" fill="${primary_text}" class="code" font-size="15">${item[1]}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="${delay}s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0, ${info_start_y + (i * 26) + 8}; 0, ${info_start_y + (i * 26)}" dur="0.4s" begin="${delay}s" fill="freeze" />
            </g>
        `);
    });

    svg.push(`
        <text x="0" y="305" fill="${primary_text}" font-size="16" font-weight="600" opacity="0">
            Tech Stack &amp; Tools
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="3.2s" fill="freeze" />
        </text>
    `);

    const skills = getSkills();
    let pill_x = 0;
    let pill_y = 320;
    const pill_height = 32;
    const padding_x = 12;
    const margin_x = 8;
    const margin_y = 8;
    
    skills.forEach((skill, i) => {
        const text_width = skill.length * 8;
        const pill_width = text_width + (padding_x * 2);
        
        if (pill_x + pill_width > 630) {
            pill_x = 0;
            pill_y += pill_height + margin_y;
        }
            
        const delay = 3.5 + (i * 0.08);
        
        svg.push(`
            <g class="pill" transform="translate(${pill_x}, ${pill_y})" opacity="0">
                <rect class="pill-bg" width="${pill_width}" height="${pill_height}" rx="16" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                <text x="${pill_width/2}" y="${pill_height/2 + 4}" fill="${muted_text}" font-size="13" font-weight="500" text-anchor="middle">${skill}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="${delay}s" fill="freeze" />
            </g>
        `);
        pill_x += pill_width + margin_x;
    });

    // Horizontal divider above footer
    svg.push(`
        <line x1="0" y1="410" x2="620" y2="410" stroke="${border_color}" stroke-width="1" opacity="0"/>
        <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="4.2s" fill="freeze"/>
    `);

    // Social Buttons Footer (Row of glowing icon buttons)
    svg.push(`<g transform="translate(0, 425)" opacity="0">`);
    svg.push(`<animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="4.5s" fill="freeze" />`);
    
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
                    <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <path d="${social.path}" transform="translate(8, 8) scale(0.83)" fill="${muted_text}"/>
                    <text x="44" y="23" fill="${muted_text}" font-size="14" font-weight="600">${social.label}</text>
                </g>
            </a>
        `);
    });
    
    svg.push('</g>'); // End Socials Footer

    svg.push('</g>'); // End Terminal Content
    svg.push('</g>'); // End RIGHT SIDE

    svg.push('</g>'); // End Canvas clip
    svg.push('</svg>');
    
    return svg.join('\n');
}

fs.writeFileSync("dark.svg", generateSvg('dark'));
fs.writeFileSync("light.svg", generateSvg('light'));
console.log("Successfully generated dark.svg and light.svg");
