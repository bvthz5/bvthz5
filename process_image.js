const fs = require('fs');
const { Jimp } = require('jimp');

async function processImage() {
    try {
        console.log("Loading image assets/bv.jpeg...");
        const image = await Jimp.read('assets/bv.jpeg');
        
        // Higher resolution for perfect details (60 columns x 75 rows)
        const cols = 60;
        const rows = 75;
        
        // Resize
        image.resize({ w: cols, h: rows });
        
        let svgDots = [];
        
        // Sample background color from corner (top-left)
        const bgPixel = image.getPixelColor(0, 0);
        const bgR = (bgPixel >> 24) & 0xff;
        const bgG = (bgPixel >> 16) & 0xff;
        const bgB = (bgPixel >> 8) & 0xff;
        const bgVal = 0.299 * bgR + 0.587 * bgG + 0.114 * bgB;
        
        // We will group dots by row for efficient sequential reveal animations
        for (let y = 0; y < rows; y++) {
            let rowCircles = [];
            for (let x = 0; x < cols; x++) {
                const pixel = image.getPixelColor(x, y);
                const r = (pixel >> 24) & 0xff;
                const g = (pixel >> 16) & 0xff;
                const b = (pixel >> 8) & 0xff;
                
                // Grayscale intensity
                const val = 0.299 * r + 0.587 * g + 0.114 * b;
                
                // Background subtraction with slightly higher tolerance to remove wall shadows
                if (Math.abs(val - bgVal) < 32) {
                    continue;
                }
                
                // Continuous radius mapping for smooth halftone detailing:
                // Darker pixels (hair, beard, shirt) get larger dots.
                // Brighter pixels (face skin) get smaller dots.
                // Range: 0.5px (brightest highlights) to 2.8px (darkest shadows)
                const intensity = (255 - val) / 255;
                const radius = (intensity * 2.3 + 0.5).toFixed(1);
                
                // Position with 6px spacing
                const cx = x * 6 + 3;
                const cy = y * 6 + 3;
                
                rowCircles.push(`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#ascii-grad)"/>`);
            }
            
            if (rowCircles.length > 0) {
                const delay = (y * 0.035).toFixed(3);
                svgDots.push(`  <g opacity="0">`);
                svgDots.push(`    <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="100s" begin="${delay}s" fill="freeze"/>`);
                svgDots.push(`    <animateTransform attributeName="transform" type="translate" values="0,8; 0,0" dur="0.4s" begin="${delay}s" fill="freeze"/>`);
                svgDots.push(`    ` + rowCircles.join('\n    '));
                svgDots.push(`  </g>`);
            }
        }
        
        fs.writeFileSync('assets/dots.txt', svgDots.join('\n'));
        console.log("Successfully generated assets/dots.txt with high-resolution SVG circles!");
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

processImage();
