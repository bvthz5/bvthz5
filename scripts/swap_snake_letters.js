const fs = require('fs');
const path = require('path');

function main() {
    const svgPath = path.join(__dirname, '..', 'assets', 'snake.svg');
    let content = fs.readFileSync(svgPath, 'utf8');
    
    // Parse all rect elements in the grid
    const rectRegex = /<rect\s+x="(\d+)"\s+y="(\d+)"\s+width="12"\s+height="12"\s+rx="2"([^>]*)\/>/g;
    
    const cells = Array.from({ length: 7 }, () => Array(53).fill(null));
    const rectMatches = [];
    let match;
    
    while ((match = rectRegex.exec(content))) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        const extraAttrs = match[3];
        const col = (x - 40) / 15;
        const row = (y - 35) / 15;
        
        if (col >= 0 && col < 53 && row >= 0 && row < 7) {
            cells[row][col] = {
                x,
                y,
                extraAttrs,
                fullMatch: match[0]
            };
            rectMatches.push(match[0]);
        }
    }
    
    console.log(`Found ${rectMatches.length} grid cells.`);
    
    // Swap columns 29-33 (A) and 35-39 (H) in the cells grid
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 5; c++) {
            const colA = 29 + c;
            const colH = 35 + c;
            
            const cellA = cells[r][colA];
            const cellH = cells[r][colH];
            
            if (cellA && cellH) {
                // Swap the extra attributes (fill, opacity, style) between A and H
                const tempAttrs = cellA.extraAttrs;
                cellA.extraAttrs = cellH.extraAttrs;
                cellH.extraAttrs = tempAttrs;
            }
        }
    }
    
    // Replace the rect elements in the SVG content with the swapped ones
    let newContent = content;
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 53; c++) {
            const cell = cells[r][c];
            if (cell) {
                const newRect = `<rect x="${cell.x}" y="${cell.y}" width="12" height="12" rx="2"${cell.extraAttrs}/>`;
                newContent = newContent.replace(cell.fullMatch, newRect);
            }
        }
    }
    
    fs.writeFileSync(svgPath, newContent);
    console.log("Successfully swapped columns in assets/snake.svg to spell 'BV - THAZ'!");
}

main();
