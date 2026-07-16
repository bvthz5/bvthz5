import os
import html

def get_ascii():
    return [
        "      _,.-------.,_      ",
        "  ,;~'             '~;,  ",
        " ,;                     ;, ",
        ";    ,                   ,    ;",
        ",'    ;                   ;    ',",
        ";   ;                     ;   ;",
        ";   ;  ,---.       ,---.  ;   ;",
        ";  :  /     \     /     \  :  ;",
        ";  |  |  O  |     |  O  |  |  ;",
        ";  |  \     /     \     /  |  ;",
        ":  |   `---'       `---'   |  :",
        ":  |                       |  :",
        " \  :                     :  / ",
        "  \  :                   :  /  ",
        "   \  '.               .'  /   ",
        "    '.  '~._       _.~'  .'    ",
        "      '-._  `\"\"\"\"\"`  _.-'      ",
        "          `\"\"\"\"\"\"\"\"`          "
    ]

def get_skills():
    return [
        "React", "Next.js", "Node.js", "TypeScript", 
        "Tailwind", "Python", "Docker", "Postgres", 
        "AWS", "Git", "Figma"
    ]

def get_typing_phrases():
    return [
        "Frontend Engineer",
        "Full Stack Developer",
        "Open Source Contributor",
        "UI Engineer",
        "AI Enthusiast"
    ]

def generate_svg(theme='dark'):
    is_dark = theme == 'dark'
    
    bg_color = "#030712" if is_dark else "#FFFFFF"
    panel_color = "#0F172A" if is_dark else "#FFFFFF"  # Using white for glass effect in light mode
    border_color = "rgba(255,255,255,.08)" if is_dark else "rgba(15,23,42,.08)"
    primary_text = "#F8FAFC" if is_dark else "#0F172A"
    muted_text = "#94A3B8" if is_dark else "#475569"
    
    accent_1 = "#7C3AED" if is_dark else "#2563EB"
    accent_2 = "#22D3EE" if is_dark else "#06B6D4"
    accent_3 = "#10B981" if is_dark else "#10B981"
    
    ascii_grad_1 = "#22D3EE" if is_dark else "#2563EB"
    ascii_grad_2 = "#7C3AED" if is_dark else "#06B6D4"
    
    glow_opacity = "0.4" if is_dark else "0.15"
    pill_fill = "rgba(255, 255, 255, 0.05)" if is_dark else "rgba(0, 0, 0, 0.04)"
    pill_hover_fill = "rgba(255, 255, 255, 0.1)" if is_dark else "rgba(0, 0, 0, 0.08)"
    pill_border = "rgba(255, 255, 255, 0.1)" if is_dark else "rgba(0, 0, 0, 0.1)"
    terminal_bg = "rgba(15, 23, 42, 0.6)" if is_dark else "rgba(255, 255, 255, 0.6)"

    # Start building SVG
    svg = []
    svg.append(f'<svg width="1180" height="610" viewBox="0 0 1180 610" fill="none" xmlns="http://www.w3.org/2000/svg">')
    
    # CSS for hover effects and fonts
    svg.append('<style>')
    svg.append('''
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Fira+Code:wght@400;500&amp;display=swap');
        * {
            font-family: 'Inter', system-ui, sans-serif;
        }
        .code {
            font-family: 'Fira Code', monospace;
        }
        .pill {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .pill:hover rect {
            transform: scale(1.05);
            transform-origin: center;
        }
        .pill:hover .pill-bg {
            fill: ''' + pill_hover_fill + ''';
            stroke: ''' + accent_2 + ''';
        }
        .pill:hover text {
            fill: ''' + accent_2 + ''';
        }
    ''')
    svg.append('</style>')

    # Defs
    svg.append('<defs>')
    
    # Gradients
    svg.append(f'''
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1180" y2="610" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="{bg_color}"/>
            <stop offset="100%" stop-color="{bg_color}"/>
        </linearGradient>
        
        <radialGradient id="glow-1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 150) rotate(90) scale(400)">
            <stop stop-color="{accent_1}" stop-opacity="{glow_opacity}"/>
            <stop offset="1" stop-color="{bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="200 150; 250 200; 150 100; 200 150" dur="10s" repeatCount="indefinite"/>
        </radialGradient>
        
        <radialGradient id="glow-2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 450) rotate(90) scale(400)">
            <stop stop-color="{accent_2}" stop-opacity="{glow_opacity}"/>
            <stop offset="1" stop-color="{bg_color}" stop-opacity="0"/>
            <animateTransform attributeName="gradientTransform" type="translate" values="900 450; 850 400; 950 500; 900 450" dur="12s" repeatCount="indefinite"/>
        </radialGradient>

        <linearGradient id="ascii-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="{ascii_grad_1}">
                <animate attributeName="stop-color" values="{ascii_grad_1};{ascii_grad_2};{ascii_grad_1}" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="{ascii_grad_2}">
                <animate attributeName="stop-color" values="{ascii_grad_2};{ascii_grad_1};{ascii_grad_2}" dur="5s" repeatCount="indefinite" />
            </stop>
        </linearGradient>

        <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{accent_1}" stop-opacity="0.5"/>
            <stop offset="50%" stop-color="{border_color}"/>
            <stop offset="100%" stop-color="{accent_2}" stop-opacity="0.5"/>
            <animate attributeName="x1" values="0%;200%;0%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;200%;0%" dur="8s" repeatCount="indefinite" />
        </linearGradient>
    ''')

    # Filters
    svg.append(f'''
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0"/>
        </filter>
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.2"/>
        </filter>
    ''')
    
    # Clip paths
    svg.append(f'''
        <clipPath id="terminal-clip">
            <rect width="700" height="530" rx="16"/>
        </clipPath>
        <clipPath id="canvas-clip">
            <rect width="1180" height="610" rx="20"/>
        </clipPath>
    ''')

    # Clip paths for typing animations
    phrases = get_typing_phrases()
    total_time = len(phrases) * 3
    for i in range(len(phrases)):
        # Calculate keyframes for animation
        # We want the text to type out, stay for a bit, then disappear, then wait for the rest of the cycle
        start_time = i * 3
        type_dur = 1
        visible_dur = 1.5
        
        # We use a rect in a clipPath that expands and then collapses
        svg.append(f'''
        <clipPath id="type-clip-{i}">
            <rect x="0" y="0" width="0" height="30">
                <animate attributeName="width" values="0; 300; 300; 0; 0" keyTimes="0; {type_dur/total_time}; {(type_dur+visible_dur)/total_time}; {(type_dur+visible_dur+0.5)/total_time}; 1" dur="{total_time}s" begin="{start_time}s" repeatCount="indefinite" />
            </rect>
        </clipPath>
        ''')

    svg.append('</defs>')

    # Background
    svg.append(f'<g clip-path="url(#canvas-clip)">')
    svg.append(f'<rect width="1180" height="610" fill="url(#bg-grad)"/>')
    svg.append(f'<rect width="1180" height="610" fill="url(#glow-1)"/>')
    svg.append(f'<rect width="1180" height="610" fill="url(#glow-2)"/>')
    svg.append(f'<rect width="1180" height="610" fill="url(#noise)" style="mix-blend-mode: overlay;"/>')
    
    # Particles
    for i in range(15):
        cx = 100 + (i * 70) % 1000
        cy = 50 + (i * 90) % 500
        r = 1 + (i % 3)
        svg.append(f'''
            <circle cx="{cx}" cy="{cy}" r="{r}" fill="{primary_text}" opacity="0">
                <animate attributeName="opacity" values="0; 0.6; 0" dur="{3 + i%4}s" begin="{i%3}s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="{cy}; {cy - 50}; {cy - 100}" dur="{5 + i%3}s" begin="{i%2}s" repeatCount="indefinite"/>
            </circle>
        ''')
    
    # Border shimmer for main canvas
    svg.append(f'<rect width="1178" height="608" x="1" y="1" rx="19" stroke="url(#border-grad)" stroke-width="2" fill="none"/>')

    # LEFT SIDE: ASCII Art (occupies ~38% -> width ~400, x=40)
    svg.append(f'<g transform="translate(40, 90)">')
    
    # Floating animation for ASCII
    svg.append(f'<animateTransform attributeName="transform" type="translate" values="40,90; 40,80; 40,90" dur="6s" repeatCount="indefinite" />')
    
    ascii_lines = get_ascii()
    line_height = 18
    ascii_start_y = 50
    for i, line in enumerate(ascii_lines):
        # Reveal line by line
        delay = i * 0.1
        safe_line = html.escape(line).replace(" ", "&#160;")
        svg.append(f'''
            <text x="20" y="{ascii_start_y + i * line_height}" class="code" fill="url(#ascii-grad)" font-size="14" font-weight="600" opacity="0" letter-spacing="2">
                {safe_line}
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="{delay}s" fill="freeze" />
            </text>
        ''')
    
    # Scanline effect over ASCII
    svg.append(f'''
        <rect x="0" y="0" width="380" height="4" fill="{accent_2}" opacity="0.5">
            <animate attributeName="y" values="0; 400; 0" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1; 0.6; 0.1" dur="2s" repeatCount="indefinite" />
        </rect>
    ''')
    svg.append('</g>')

    # RIGHT SIDE: Terminal Window (occupies ~62% -> width ~700, x=440, y=40)
    svg.append(f'<g transform="translate(440, 40)" filter="url(#soft-shadow)">')
    
    # Terminal Background / Glassmorphism
    svg.append(f'''
        <rect width="700" height="530" rx="16" fill="{terminal_bg}" stroke="{border_color}" stroke-width="1.5" />
    ''')

    # Terminal Header
    svg.append(f'<g transform="translate(20, 20)">')
    svg.append(f'<circle cx="10" cy="0" r="6" fill="#FF5F56"/>')
    svg.append(f'<circle cx="30" cy="0" r="6" fill="#FFBD2E"/>')
    svg.append(f'<circle cx="50" cy="0" r="6" fill="#27C93F"/>')
    svg.append(f'</g>')

    # Terminal Content
    svg.append(f'<g transform="translate(40, 80)">')
    
    # Greeting
    svg.append(f'''
        <text x="0" y="0" fill="{primary_text}" font-size="36" font-weight="700">Hi 👋</text>
        <text x="0" y="45" fill="{primary_text}" font-size="36" font-weight="700">I'm {{NAME}}</text>
    ''')

    # Animated Typing text
    svg.append(f'<g transform="translate(0, 85)">')
    svg.append(f'<text x="0" y="20" fill="{accent_2}" class="code" font-size="20">></text>')
    
    for i, phrase in enumerate(phrases):
        svg.append(f'''
            <g clip-path="url(#type-clip-{i})">
                <text x="25" y="20" fill="{accent_2}" class="code" font-size="20">{phrase}</text>
            </g>
        ''')
    
    # Blinking cursor
    svg.append(f'''
        <rect x="25" y="4" width="10" height="20" fill="{accent_2}">
            <animate attributeName="opacity" values="1; 0; 1" dur="1s" repeatCount="indefinite"/>
            <animate attributeName="x" values="25; 200; 200; 25; 25" keyTimes="0; 0.1; 0.8; 0.9; 1" dur="{total_time}s" repeatCount="indefinite" />
        </rect>
    ''')
    svg.append('</g>') # End typing text

    # Sequential Reveal Info
    info_items = [
        ("Location", "Earth"),
        ("Education", "Computer Science"),
        ("Current Focus", "Building scalable systems"),
        ("Portfolio", "your-portfolio.com"),
        ("Email", "hello@yourdomain.com")
    ]
    
    info_start_y = 160
    for i, (label, value) in enumerate(info_items):
        delay = 1.5 + (i * 0.4)
        svg.append(f'''
            <g opacity="0" transform="translate(0, {info_start_y + (i * 30)})">
                <text x="0" y="0" fill="{muted_text}" class="code" font-size="16">{label}:</text>
                <text x="140" y="0" fill="{primary_text}" class="code" font-size="16">{value}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="{delay}s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0, {info_start_y + (i * 30) + 10}; 0, {info_start_y + (i * 30)}" dur="0.4s" begin="{delay}s" fill="freeze" />
            </g>
        ''')

    # Skills Section
    svg.append(f'''
        <text x="0" y="340" fill="{primary_text}" font-size="18" font-weight="600" opacity="0">
            Tech Stack &amp; Tools
            <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="3.5s" fill="freeze" />
        </text>
    ''')

    skills = get_skills()
    pill_x = 0
    pill_y = 360
    pill_height = 36
    padding_x = 16
    margin_x = 12
    margin_y = 12
    
    # Render skills in rows
    for i, skill in enumerate(skills):
        # Estimate text width (rough approximation for SVG without DOM access)
        text_width = len(skill) * 9
        pill_width = text_width + (padding_x * 2)
        
        if pill_x + pill_width > 660:
            pill_x = 0
            pill_y += pill_height + margin_y
            
        delay = 4.0 + (i * 0.1)
        
        svg.append(f'''
            <g class="pill" transform="translate({pill_x}, {pill_y})" opacity="0">
                <rect class="pill-bg" width="{pill_width}" height="{pill_height}" rx="18" fill="{pill_fill}" stroke="{pill_border}" stroke-width="1"/>
                <text x="{pill_width/2}" y="{pill_height/2 + 5}" fill="{muted_text}" font-size="14" font-weight="500" text-anchor="middle">{skill}</text>
                <animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="{delay}s" fill="freeze" />
            </g>
        ''')
        pill_x += pill_width + margin_x

    svg.append('</g>') # End Terminal Content
    svg.append('</g>') # End RIGHT SIDE

    # Social Icons at the bottom (x=440, y=560)
    svg.append(f'<g transform="translate(440, 550)" opacity="0">')
    svg.append(f'<animate attributeName="opacity" values="0; 1; 1" keyTimes="0; 0.005; 1" dur="100s" begin="5.5s" fill="freeze" />')
    
    socials = ["GitHub", "LinkedIn", "Twitter", "Portfolio"]
    for i, social in enumerate(socials):
        svg.append(f'''
            <text x="{i * 100}" y="20" fill="{accent_1}" font-size="14" font-weight="600" style="cursor:pointer;" class="pill">
                {social}
            </text>
        ''')
    svg.append('</g>')

    svg.append('</g>') # End Canvas clip
    svg.append('</svg>')
    
    return "\n".join(svg)


if __name__ == "__main__":
    dark_svg = generate_svg('dark')
    light_svg = generate_svg('light')
    
    with open("dark.svg", "w") as f:
        f.write(dark_svg)
        
    with open("light.svg", "w") as f:
        f.write(light_svg)
        
    print("Successfully generated dark.svg and light.svg")
