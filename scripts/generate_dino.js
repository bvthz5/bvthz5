const fs = require('fs');
const https = require('https');
const path = require('path');

// Helper to fetch data with User-Agent to prevent 403
function fetchContributions(username) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'github.com',
            path: `/users/${username}/contributions`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => { resolve(data); });
        }).on('error', (err) => { reject(err); });
    });
}

async function main() {
    try {
        console.log("Fetching live contributions for user 'bvthz5'...");
        const html = await fetchContributions('bvthz5');
        
        // Parse td elements robustly
        const matches = html.match(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g) || [];
        const grid = Array.from({ length: 7 }, () => Array(53).fill(null));
        
        for (const td of matches) {
            const idMatch = td.match(/id="contribution-day-component-(\d+)-(\d+)"/);
            const levelMatch = td.match(/data-level="(\d+)"/);
            if (idMatch && levelMatch) {
                const row = parseInt(idMatch[1], 10);
                const col = parseInt(idMatch[2], 10);
                const level = parseInt(levelMatch[1], 10);
                if (row < 7 && col < 53) {
                    grid[row][col] = level;
                }
            }
        }

        // Fill missing/future cells with level 0
        let cellCount = 0;
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 53; c++) {
                if (grid[r][c] === null) {
                    grid[r][c] = 0; // Default to level 0 (gray)
                } else {
                    cellCount++;
                }
            }
        }
        console.log(`Parsed ${cellCount} contribution cells successfully!`);

        // Palette configuration
        const grid_colors = [
            "#161b22", // Level 0
            "#0e4429", // Level 1 green
            "#006d32", // Level 2 green
            "#26a641", // Level 3 green
            "#39d353"  // Level 4 green
        ];

        // Layout dimensions & serpentine parameters
        const startX = 15;
        const endX = 865;
        const startPadding = 46 - startX; // 31
        const endPadding = endX - 826;     // 39
        const totalGridLength = 5550;      // 370 steps * 15px
        const totalLength = startPadding + totalGridLength + endPadding; // 5620
        const duration = 40; // 40 seconds loop

        const svg_content = [];
        svg_content.push('<svg width="880" height="192" viewBox="0 0 880 192" xmlns="http://www.w3.org/2000/svg">');
        svg_content.push('  <rect width="100%" height="100%" rx="10" fill="#0d1117" />');

        // Styles & CSS Keyframes
        svg_content.push('  <defs>');
        svg_content.push('    <filter id="dino-glow" x="-20%" y="-20%" width="140%" height="140%">');
        svg_content.push('      <feGaussianBlur stdDeviation="1.5" result="blur" />');
        svg_content.push('      <feMerge>');
        svg_content.push('        <feMergeNode in="blur" />');
        svg_content.push('        <feMergeNode in="SourceGraphic" />');
        svg_content.push('      </feMerge>');
        svg_content.push('    </filter>');
        svg_content.push('  </defs>');
        
        svg_content.push('  <style>');
        // Running cycle for legs
        svg_content.push('    .leg-1 { animation: run-legs-1 0.2s steps(1) infinite; }');
        svg_content.push('    .leg-2 { animation: run-legs-2 0.2s steps(1) infinite; }');
        svg_content.push('    @keyframes run-legs-1 { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }');
        svg_content.push('    @keyframes run-legs-2 { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }');
        
        // Eating mouth chomping animation
        svg_content.push('    .mouth-closed { animation: toggle-mouth 0.4s steps(1) infinite; }');
        svg_content.push('    @keyframes toggle-mouth { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }');

        // Blinking eye animation
        svg_content.push('    .eye-blink { animation: eye-blink-anim 3.5s steps(1) infinite; }');
        svg_content.push('    @keyframes eye-blink-anim { 0%, 93%, 100% { opacity: 0; } 95% { opacity: 1; } }');

        // Generate individual cell keyframes synchronized with snout position
        for (let col = 0; col < 53; col++) {
            for (let row = 0; row < 7; row++) {
                const stepIdx = col % 2 === 0 ? (col * 7 + row) : (col * 7 + (6 - row));
                // Center of cell stepIdx is at: startPadding + stepIdx * 15
                // Snout is 6.8px ahead of origin along path
                const d_eat = startPadding + stepIdx * 15 - 6.8;
                const t = d_eat / totalLength;
                
                const tStart = Math.max(0, t - 0.001);
                const tEnd = Math.min(1.0, t + 0.001);
                const realColor = grid_colors[grid[row][col]];
                
                svg_content.push(`    @keyframes c${stepIdx} {`);
                svg_content.push(`      0%, ${Math.floor(tStart * 1000) / 10}% { fill: #161b22; }`);
                svg_content.push(`      ${Math.floor(tEnd * 1000) / 10}%, 100% { fill: ${realColor}; }`);
                svg_content.push(`    }`);
                svg_content.push(`    .cell-${stepIdx} { animation: c${stepIdx} ${duration}s linear infinite; }`);
            }
        }
        svg_content.push('  </style>');

        // Render Grid
        for (let col = 0; col < 53; col++) {
            for (let row = 0; row < 7; row++) {
                const x = 40 + col * 15;
                const y = 35 + row * 15;
                const stepIdx = col % 2 === 0 ? (col * 7 + row) : (col * 7 + (6 - row));
                svg_content.push(`  <rect x="${x}" y="${y}" width="12" height="12" rx="2" class="cell-${stepIdx}" fill="#161b22" />`);
            }
        }

        // Labels on the left (Days of Week)
        const days = [["Mon", 50], ["Wed", 80], ["Fri", 110]];
        for (const [label, y] of days) {
            svg_content.push(`  <text x="10" y="${y + 10}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="9" fill="#8b949e" text-anchor="start">${label}</text>`);
        }

        // Months at the top
        const months = [
            ["Jan", 0], ["Feb", 5], ["Mar", 9], ["Apr", 13], ["May", 18], ["Jun", 22],
            ["Jul", 27], ["Aug", 31], ["Sep", 36], ["Oct", 40], ["Nov", 44], ["Dec", 49]
        ];
        for (const [name, col_idx] of months) {
            const x = 40 + col_idx * 15;
            svg_content.push(`  <text x="${x}" y="25" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="9" fill="#8b949e" text-anchor="start">${name}</text>`);
        }

        // Legend at the bottom right
        const legend_x = 700;
        svg_content.push(`  <text x="${legend_x}" y="157" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="9" fill="#8b949e">Less</text>`);
        grid_colors.forEach((col, i) => {
            const lx = legend_x + 30 + i * 15;
            svg_content.push(`  <rect x="${lx}" y="148" width="12" height="12" rx="2" fill="${col}" />`);
        });
        svg_content.push(`  <text x="${legend_x + 110}" y="157" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="9" fill="#8b949e">More</text>`);

        // Dino Pixel Art Coordinates
        const dino_body = [
            [0,7], [0,8], [0,9], [0,10], [0,11], [0,12],
            [1,6], [1,7], [1,8], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14],
            [2,6], [2,7], [2,9], [2,10], [2,11], [2,12], [2,13], [2,14],
            [3,6], [3,7], [3,8], [3,9], [3,10], [3,11],
            [4,6], [4,7], [4,8], [4,9], [4,10], [4,11], [4,12], [4,13],
            [5,6], [5,7], [5,8], [5,9],
            [6,1], [6,5], [6,6], [6,7], [6,8],
            [7,1], [7,2], [7,5], [7,6], [7,7],
            [8,1], [8,2], [8,3], [8,5], [8,6], [8,7],
            [9,2], [9,3], [9,4], [9,5], [9,6], [9,7],
            [10,3], [10,4], [10,5], [10,6],
            [11,4], [11,5],
        ];
        
        const mouth_closed = [
            [3, 12], [3, 13]
        ];

        const leg_frame_1 = [
            [12,4], [13,4], [14,4], [14,5]
        ];
        const leg_frame_2 = [
            [12,5], [13,5], [14,5], [14,6]
        ];

        const scale = 1.2;
        const dino_body_svg = dino_body.map(([r, c]) => 
            `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="#5eead4" />`
        ).join('');

        const mouth_closed_svg = mouth_closed.map(([r, c]) => 
            `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="#5eead4" />`
        ).join('');

        const leg1_svg = leg_frame_1.map(([r, c]) => 
            `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="#5eead4" />`
        ).join('');

        const leg2_svg = leg_frame_2.map(([r, c]) => 
            `<rect x="${c * scale}" y="${r * scale}" width="${scale}" height="${scale}" fill="#5eead4" />`
        ).join('');

        // Generate the Serpentine Path coordinates with start/end off-screen padding
        const path_points = [`M ${startX} 41`, `L 46 41`];
        for (let col = 0; col < 53; col++) {
            const x = 46 + col * 15;
            if (col % 2 === 0) {
                if (col > 0) {
                    path_points.push(`L ${x} 41`);
                }
                path_points.push(`L ${x} 131`);
            } else {
                path_points.push(`L ${x} 131`);
                path_points.push(`L ${x} 41`);
            }
        }
        path_points.push(`L ${endX} 131`);
        const d_path = path_points.join(" ");

        // Dino Character Group (follows path, rotates, translates for snout offset alignment)
        svg_content.push('  <g style="filter: url(#dino-glow);">');
        svg_content.push(`    <animateMotion path="${d_path}" dur="${duration}s" repeatCount="indefinite" rotate="auto" />`);
        svg_content.push(`    <g transform="translate(-10, -10)">`); // Centering dino on path
        svg_content.push(`      ${dino_body_svg}`);
        svg_content.push(`      <!-- Eye -->`);
        svg_content.push(`      <rect x="${8 * scale}" y="${2 * scale}" width="${scale}" height="${scale}" fill="#0d1117" />`);
        svg_content.push(`      <rect x="${8 * scale}" y="${2 * scale}" width="${scale}" height="${scale}" fill="#5eead4" class="eye-blink" />`);
        svg_content.push(`      <!-- Mouth closed pixels (toggles opacity) -->`);
        svg_content.push(`      <g class="mouth-closed">${mouth_closed_svg}</g>`);
        svg_content.push(`      <!-- Leg 1 -->`);
        svg_content.push(`      <g class="leg-1">${leg1_svg}</g>`);
        svg_content.push(`      <!-- Leg 2 -->`);
        svg_content.push(`      <g class="leg-2">${leg2_svg}</g>`);
        svg_content.push('    </g>');
        svg_content.push('  </g>');

        svg_content.push('</svg>');

        // Make sure assets folder exists
        const assetsDir = path.join(__dirname, '..', 'assets');
        if (!fs.existsSync(assetsDir)) {
            fs.mkdirSync(assetsDir, { recursive: true });
        }

        fs.writeFileSync(path.join(assetsDir, 'dino.svg'), svg_content.join('\n'));
        console.log("Successfully generated assets/dino.svg based on live GitHub profile contributions!");

    } catch (err) {
        console.error("Error generating live Dino SVG:", err);
    }
}

main();
