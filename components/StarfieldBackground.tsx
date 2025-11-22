import React, { useEffect, useRef } from 'react';

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      const starCount = 1000;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          size: Math.random() * 1.5,
        });
      }
    };

    const updateStars = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const speed = 2;

      ctx.fillStyle = "#050505"; // Deep space black
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Nebula effect (Subtle gradient)
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width);
      gradient.addColorStop(0, "rgba(0, 243, 255, 0.05)"); // Neon Cyan glow
      gradient.addColorStop(0.6, "rgba(0, 5, 10, 0.0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (star.x / star.z) * canvas.width + cx;
        const y = (star.y / star.z) * canvas.height + cy;
        const size = (1 - star.z / canvas.width) * star.size * 2;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          const alpha = 1 - star.z / canvas.width;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Occasional twinkle cyan
          if (Math.random() > 0.99) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Scanline effect
      ctx.fillStyle = "rgba(0, 255, 65, 0.02)";
      ctx.fillRect(0, (Date.now() / 10) % canvas.height, canvas.width, 2);

      animationFrameId = requestAnimationFrame(updateStars);
    };

    window.addEventListener('resize', resize);
    resize();
    createStars();
    updateStars();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default StarfieldBackground;