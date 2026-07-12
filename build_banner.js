const fs = require('fs');

function getAscii() {
    return [
        "      _,.-------.,_      ",
        "  ,;~'             '~;,  ",
        " ,;                     ;, ",
        ";    ,                   ,    ;",
        ",'    ;                   ;    ',",
        ";   ;                     ;   ;",
        ";   ;  ,---.       ,---.  ;   ;",
        ";  :  /     \\     /     \\  :  ;",
        ";  |  |  O  |     |  O  |  |  ;",
        ";  |  \\     /     \\     /  |  ;",
        ":  |   `---'       `---'   |  :",
        ":  |                       |  :",
        " \\  :                     :  / ",
        "  \\  :                   :  /  ",
        "   \\  '.               .'  /   ",
        "    '.  '~._       _.~'  .'    ",
        "      '-._  `\"\"\"\"\"`  _.-'      ",
        "          `\"\"\"\"\"\"\"\"`          "
    ];
}

function getSkills() {
    return [
        "React", "Next.js", "Node.js", "TypeScript", 
        "Tailwind", "Python", "Docker", "Postgres", 
        "AWS", "Git", "Figma"
    ];
}

function getTypingPhrases() {
    return [
        "Frontend Engineer",
        "Full Stack Developer",
        "Open Source Contributor",
        "UI Engineer",
        "AI Enthusiast"
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

        * { font-family: 'Inter', system-ui, sans-serif; }
        .code { font-family: 'Fira Code', monospace; }
        .pill { transition: all 0.3s ease; cursor: pointer; }
        .pill:hover rect { transform: scale(1.05); transform-origin: center; }
        .pill:hover .pill-bg { fill: ${pill_hover_fill}; stroke: ${accent_2}; }
        .pill:hover text { fill: ${accent_2}; }
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
                <animate attributeName="width" values="0; 300; 300; 0; 0" keyTimes="0; ${type_dur/total_time}; ${(type_dur+visible_dur)/total_time}; ${(type_dur+visible_dur+0.5)/total_time}; 1" dur="${total_time}s" begin="${start_time}s" repeatCount="indefinite" />
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

    svg.push(`<g transform="translate(40, 90)">`);
    svg.push(`<animateTransform attributeName="transform" type="translate" values="40,90; 40,80; 40,90" dur="6s" repeatCount="indefinite" />`);
    
    const ascii_lines = getAscii();
    const line_height = 18;
    const ascii_start_y = 50;
    ascii_lines.forEach((line, i) => {
        const delay = i * 0.1;
        const safe_line = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&#160;");
        svg.push(`
            <text x="20" y="${ascii_start_y + i * line_height}" class="code" fill="url(#ascii-grad)" font-size="14" font-weight="600" opacity="0" letter-spacing="2">
                ${safe_line}
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="${delay}s" fill="freeze" />
            </text>
        `);
    });
    
    svg.push(`
        <rect x="0" y="0" width="380" height="4" fill="${accent_2}" opacity="0.5">
            <animate attributeName="y" values="0; 400; 0" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1; 0.6; 0.1" dur="2s" repeatCount="indefinite" />
        </rect>
    `);
    svg.push('</g>');

    svg.push(`<g transform="translate(440, 40)" filter="url(#soft-shadow)">`);
    
    svg.push(`
        <rect width="700" height="530" rx="16" fill="${terminal_bg}" stroke="${border_color}" stroke-width="1.5" />
    `);

    svg.push(`<g transform="translate(20, 20)">`);
    svg.push(`<circle cx="10" cy="0" r="6" fill="#FF5F56"/>`);
    svg.push(`<circle cx="30" cy="0" r="6" fill="#FFBD2E"/>`);
    svg.push(`<circle cx="50" cy="0" r="6" fill="#27C93F"/>`);
    svg.push(`</g>`);

    svg.push(`<g transform="translate(40, 80)">`);
    
    svg.push(`
        <text x="0" y="0" fill="${primary_text}" font-size="36" font-weight="700">Hi 👋</text>
        <text x="0" y="45" fill="${primary_text}" font-size="36" font-weight="700">I'm {NAME}</text>
    `);

    svg.push(`<g transform="translate(0, 85)">`);
    svg.push(`<text x="0" y="20" fill="${accent_2}" class="code" font-size="20">&gt;</text>`);
    
    phrases.forEach((phrase, i) => {
        svg.push(`
            <g clip-path="url(#type-clip-${i})">
                <text x="25" y="20" fill="${accent_2}" class="code" font-size="20">${phrase}</text>
            </g>
        `);
    });
    
    svg.push(`
        <rect x="25" y="4" width="10" height="20" fill="${accent_2}">
            <animate attributeName="opacity" values="1; 0; 1" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="x" values="25; 200; 200; 25; 25" keyTimes="0; 0.1; 0.8; 0.9; 1" dur="${total_time}s" repeatCount="indefinite" />
        </rect>
    `);
    svg.push('</g>'); 

    const info_items = [
        ["Location", "Earth"],
        ["Education", "Computer Science"],
        ["Current Focus", "Building scalable systems"],
        ["Portfolio", "your-portfolio.com"],
        ["Email", "hello@yourdomain.com"]
    ];
    
    const info_start_y = 160;
    info_items.forEach((item, i) => {
        const delay = 1.5 + (i * 0.4);
        svg.push(`
            <g opacity="0" transform="translate(0, ${info_start_y + (i * 30)})">
                <text x="0" y="0" fill="${muted_text}" class="code" font-size="16">${item[0]}:</text>
                <text x="140" y="0" fill="${primary_text}" class="code" font-size="16">${item[1]}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="${delay}s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0, ${info_start_y + (i * 30) + 10}; 0, ${info_start_y + (i * 30)}" dur="0.4s" begin="${delay}s" fill="freeze" />
            </g>
        `);
    });

    svg.push(`
        <text x="0" y="340" fill="${primary_text}" font-size="18" font-weight="600" opacity="0">
            Tech Stack &amp; Tools
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="3.5s" fill="freeze" />
        </text>
    `);

    const skills = getSkills();
    let pill_x = 0;
    let pill_y = 360;
    const pill_height = 36;
    const padding_x = 16;
    const margin_x = 12;
    const margin_y = 12;
    
    skills.forEach((skill, i) => {
        const text_width = skill.length * 9;
        const pill_width = text_width + (padding_x * 2);
        
        if (pill_x + pill_width > 660) {
            pill_x = 0;
            pill_y += pill_height + margin_y;
        }
            
        const delay = 4.0 + (i * 0.1);
        
        svg.push(`
            <g class="pill" transform="translate(${pill_x}, ${pill_y})" opacity="0">
                <rect class="pill-bg" width="${pill_width}" height="${pill_height}" rx="18" fill="${pill_fill}" stroke="${pill_border}" stroke-width="1"/>
                <text x="${pill_width/2}" y="${pill_height/2 + 5}" fill="${muted_text}" font-size="14" font-weight="500" text-anchor="middle">${skill}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="${delay}s" fill="freeze" />
            </g>
        `);
        pill_x += pill_width + margin_x;
    });

    svg.push('</g>'); 
    svg.push('</g>'); 

    svg.push(`<g transform="translate(440, 550)" opacity="0">`);
    svg.push(`<animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.1; 1" dur="100s" begin="5.5s" fill="freeze" />`);
    
    const socials = ["GitHub", "LinkedIn", "Twitter", "Portfolio"];
    socials.forEach((social, i) => {
        svg.push(`
            <text x="${i * 100}" y="20" fill="${accent_1}" font-size="14" font-weight="600" style="cursor:pointer;" class="pill">
                ${social}
            </text>
        `);
    });
    svg.push('</g>');

    svg.push('</g>'); 
    svg.push('</svg>');
    
    return svg.join('\\n');
}

fs.writeFileSync("dark.svg", generateSvg('dark'));
fs.writeFileSync("light.svg", generateSvg('light'));
console.log("Successfully generated dark.svg and light.svg");
