const fs = require('fs');
const { Jimp } = require('jimp');

async function processImage() {
    try {
        console.log("Loading image assets/bv.jpeg...");
        const image = await Jimp.read('assets/bv.jpeg');
        
        // Output dimensions
        const cols = 48;
        const rows = 58;
        
        // Resize and grayscale
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
                
                // Background subtraction: Gray background in the photo has a specific range
                if (Math.abs(val - bgVal) < 20) {
                    continue;
                }
                
                // Map grayscale value to 3-level halftone dot size
                // Darker pixels (hair, beard, shirt) -> larger dots
                // Brighter pixels (face skin) -> smaller dots
                let radius = 0;
                if (r < 80) {
                    radius = 3.2; // Hair, beard, shirt
                } else if (r < 150) {
                    radius = 2.0; // Shading, shadows
                } else {
                    radius = 0.8; // Face highlights
                }
                
                // Calculate position with 8px spacing
                const cx = x * 8 + 4;
                const cy = y * 8 + 4;
                
                rowCircles.push(`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#ascii-grad)"/>`);
            }
            
            if (rowCircles.length > 0) {
                const delay = (y * 0.04).toFixed(2);
                svgDots.push(`  <g opacity="0">`);
                svgDots.push(`    <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="100s" begin="${delay}s" fill="freeze"/>`);
                svgDots.push(`    <animateTransform attributeName="transform" type="translate" values="0,10; 0,0" dur="0.5s" begin="${delay}s" fill="freeze"/>`);
                svgDots.push(`    ` + rowCircles.join('\n    '));
                svgDots.push(`  </g>`);
            }
        }
        
        fs.writeFileSync('assets/dots.txt', svgDots.join('\n'));
        console.log("Successfully generated assets/dots.txt with SVG circles!");
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

processImage();
