const fs = require('fs');
const path = require('path');

function main() {
    const startX = 46;
    const path_points = [`M ${startX} 41`];
    
    // Start section: columns 0 to 7
    for (let col = 0; col <= 7; col++) {
        const x = startX + col * 15;
        if (col === 0) {
            path_points.push(`L ${x} 131`);
        } else if (col % 2 === 0) {
            path_points.push(`L ${x} 41`);
            path_points.push(`L ${x} 131`);
        } else {
            path_points.push(`L ${x} 131`);
            path_points.push(`L ${x} 41`);
        }
    }
    
    // Weaving around letters:
    // Weave 1: Col 12 DOWN
    path_points.push(`L 226 41`);
    path_points.push(`L 226 131`);
    
    // Weave 2: Col 18 UP
    path_points.push(`L 316 131`);
    path_points.push(`L 316 41`);
    
    // Weave 3: Col 22 DOWN
    path_points.push(`L 376 41`);
    path_points.push(`L 376 131`);
    
    // Weave 4: Col 28 UP
    path_points.push(`L 466 131`);
    path_points.push(`L 466 41`);
    
    // Weave 5: Col 34 DOWN
    path_points.push(`L 556 41`);
    path_points.push(`L 556 131`);
    
    // Weave 6: Col 40 UP
    path_points.push(`L 646 131`);
    path_points.push(`L 646 41`);
    
    // Weave 7: Col 46 DOWN
    path_points.push(`L 736 41`);
    path_points.push(`L 736 131`);
    
    // End section: columns 47 to 52
    for (let col = 47; col <= 52; col++) {
        const x = startX + col * 15;
        if (col % 2 === 0) {
            path_points.push(`L ${x} 41`);
            path_points.push(`L ${x} 131`);
        } else {
            path_points.push(`L ${x} 131`);
            path_points.push(`L ${x} 41`);
        }
    }
    
    const d_path = path_points.join(' ');
    console.log("Generated path coordinates successfully!");
    
    // Path length calculation
    let totalLength = 0;
    let currentX = startX;
    let currentY = 41;
    
    path_points.forEach((cmd, idx) => {
        if (idx === 0) return;
        const coords = cmd.split(' ').slice(1).map(Number);
        const nextX = coords[0];
        const nextY = coords[1];
        const dx = Math.abs(nextX - currentX);
        const dy = Math.abs(nextY - currentY);
        totalLength += dx + dy;
        currentX = nextX;
        currentY = nextY;
    });
    
    console.log(`Calculated path length: ${totalLength}px`);
    
    // Read original snake.svg
    const svgPath = path.join(__dirname, '..', 'assets', 'snake.svg');
    let svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Setup snake length and offset parameters
    const snakeLength = 100;
    const dashArray = `${snakeLength} ${totalLength}`;
    const startOffset = totalLength + snakeLength;
    
    // We will replace the <path> element at the end of the file.
    // The path element has class or attributes. We can find it using regex.
    const pathRegex = /<path\s+d="[^"]+"[^>]*>([\s\S]*?)<\/path>/;
    
    const newPath = `<path d="${d_path}" fill="none" stroke="url(#snake-grad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dashArray}" stroke-dashoffset="${startOffset}" filter="url(#glow)">\n` +
                    `    <animate attributeName="stroke-dashoffset" values="${startOffset};0" dur="10s" repeatCount="indefinite" />\n` +
                    `  </path>`;
                    
    svgContent = svgContent.replace(pathRegex, newPath);
    
    fs.writeFileSync(svgPath, svgContent);
    console.log("Successfully updated assets/snake.svg with the new weaving snake path!");
}

main();
