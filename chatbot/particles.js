/**
 * BV Bot — Particle Background Animation
 * 
 * Creates a beautiful animated particle system on the background canvas.
 * Floating particles with connection lines for a sci-fi feel.
 */

(function () {
    'use strict';

    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationId;

    const CONFIG = {
        particleCount: 60,
        particleMinSize: 1,
        particleMaxSize: 3,
        particleMinSpeed: 0.15,
        particleMaxSpeed: 0.5,
        connectionDistance: 150,
        particleColor: { r: 99, g: 102, b: 241 }, // Indigo
        connectionOpacity: 0.08,
        particleOpacity: 0.4
    };

    function init() {
        resize();
        createParticles();
        animate();
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.min(CONFIG.particleCount, Math.floor((width * height) / 15000));
        
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: CONFIG.particleMinSize + Math.random() * (CONFIG.particleMaxSize - CONFIG.particleMinSize),
                speedX: (Math.random() - 0.5) * 2 * CONFIG.particleMaxSpeed,
                speedY: (Math.random() - 0.5) * 2 * CONFIG.particleMaxSpeed,
                opacity: CONFIG.particleOpacity * (0.5 + Math.random() * 0.5),
                pulseSpeed: 0.005 + Math.random() * 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Check if light mode
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const color = isLight 
            ? { r: 99, g: 102, b: 241 }  // Indigo for both modes
            : CONFIG.particleColor;

        const connectionOpacity = isLight ? 0.05 : CONFIG.connectionOpacity;

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Update position
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            // Pulse opacity
            const pulse = Math.sin(Date.now() * p.pulseSpeed + p.pulsePhase) * 0.3 + 0.7;
            const alpha = p.opacity * pulse;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.connectionDistance) {
                    const lineAlpha = connectionOpacity * (1 - dist / CONFIG.connectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${lineAlpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    // Reduce particles on mobile for performance
    if (window.innerWidth < 768) {
        CONFIG.particleCount = 30;
        CONFIG.connectionDistance = 100;
    }

    init();
})();
