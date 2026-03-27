import React, { useEffect, useRef } from 'react';

interface Props {
  scrollY: number;
}

interface Star {
  x: number; y: number; z: number; size: number;
}

interface Ship {
  x: number; y: number; layer: number; // layer 0=near, 1=mid, 2=far
  speed: number; scale: number; type: number; trail: number;
}

const drawShip = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, type: number, glowColor: string) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const glow = ctx.createRadialGradient(0, 0, 2, 0, 0, 30 * scale);
  glow.addColorStop(0, glowColor + '33');
  glow.addColorStop(1, 'transparent');

  // Engine glow
  ctx.beginPath();
  ctx.arc(0, 12, 6, 0, Math.PI * 2);
  ctx.fillStyle = glowColor + '66';
  ctx.fill();

  ctx.beginPath();
  if (type === 0) {
    // Retro-futuristic Kerberos shape — wide body, swept wings
    ctx.moveTo(0, -28);    // nose
    ctx.lineTo(16, 10);    // right wing tip
    ctx.lineTo(8, 14);     // right engine pod
    ctx.lineTo(0, 10);     // center bottom
    ctx.lineTo(-8, 14);    // left engine pod
    ctx.lineTo(-16, 10);   // left wing tip
    ctx.closePath();
  } else if (type === 1) {
    // Elongated cruiser
    ctx.moveTo(0, -32);
    ctx.lineTo(6, -10);
    ctx.lineTo(20, 6);
    ctx.lineTo(12, 16);
    ctx.lineTo(0, 12);
    ctx.lineTo(-12, 16);
    ctx.lineTo(-20, 6);
    ctx.lineTo(-6, -10);
    ctx.closePath();
  } else {
    // Arrow-class scout
    ctx.moveTo(0, -20);
    ctx.lineTo(10, 8);
    ctx.lineTo(4, 4);
    ctx.lineTo(0, 10);
    ctx.lineTo(-4, 4);
    ctx.lineTo(-10, 8);
    ctx.closePath();
  }

  ctx.fillStyle = '#0d1b2a';
  ctx.strokeStyle = glowColor + 'aa';
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();

  // Cockpit detail
  ctx.beginPath();
  ctx.arc(0, -14, 3, 0, Math.PI * 2);
  ctx.fillStyle = glowColor + 'cc';
  ctx.fill();

  ctx.restore();
};

const SpaceBackground: React.FC<Props> = ({ scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shipsRef = useRef<Ship[]>([]);
  const frameRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    scrollRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: 700 }, () => ({
        x: Math.random() * (canvasRef.current?.width ?? 1920) - (canvasRef.current?.width ?? 1920) / 2,
        y: Math.random() * (canvasRef.current?.height ?? 1080) - (canvasRef.current?.height ?? 1080) / 2,
        z: Math.random() * (canvasRef.current?.width ?? 1920),
        size: Math.random() * 1.5 + 0.2,
      }));
    };

    const initShips = () => {
      shipsRef.current = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 2000,
        y: 80 + Math.random() * (canvasRef.current?.height ?? 800) * 0.7,
        layer: i < 6 ? 2 : i < 14 ? 1 : 0, // 6 far, 8 mid, 6 near
        speed: 0.2 + Math.random() * 0.3,
        scale: i < 6 ? 0.35 : i < 14 ? 0.6 : 1.0,
        type: Math.floor(Math.random() * 3),
        trail: 0,
      }));
    };

    let time = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const scroll = scrollRef.current;

      // ── Background ──────────────────────────────────────────────
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, W, H);

      // Nebula layers
      const nebulaPositions = [
        { x: cx * 0.3, y: cy * 0.6, r1: '#4a007822', r2: '#1a004400' },
        { x: cx * 1.6, y: cy * 1.3, r1: '#00224422', r2: '#00004400' },
        { x: cx, y: cy * 0.4, r1: '#00334433', r2: '#00000000' },
      ];
      nebulaPositions.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, W * 0.55);
        g.addColorStop(0, n.r1);
        g.addColorStop(1, n.r2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // ── Stars ────────────────────────────────────────────────────
      const starSpeed = 0.8;
      starsRef.current.forEach(star => {
        star.z -= starSpeed;
        if (star.z <= 0) {
          star.z = W;
          star.x = Math.random() * W - cx;
          star.y = Math.random() * H - cy;
        }
        const sx = (star.x / star.z) * W + cx;
        const sy = (star.y / star.z) * H + cy;
        const size = (1 - star.z / W) * star.size * 2.5;
        const alpha = 1 - star.z / W;
        if (sx >= 0 && sx < W && sy >= 0 && sy < H) {
          ctx.fillStyle = `rgba(200, 220, 255, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── Armada of Ships ──────────────────────────────────────────
      const layerSpeeds = [0.022, 0.012, 0.005]; // near, mid, far
      const layerColors = ['#00f3ff', '#ffaa00', '#7055ff'];

      shipsRef.current.forEach(ship => {
        // Scroll-driven parallax: each layer moves at different speed
        const parallaxOffset = scroll * layerSpeeds[ship.layer];
        const sx = (ship.x - parallaxOffset * 80) % (W + 400);
        const effectiveSx = sx < -200 ? sx + W + 400 : sx;

        // Engine trail
        const trailLength = ship.layer === 0 ? 60 : ship.layer === 1 ? 40 : 20;
        const trailGrad = ctx.createLinearGradient(effectiveSx, ship.y - trailLength, effectiveSx, ship.y + 20);
        trailGrad.addColorStop(0, layerColors[ship.layer] + '00');
        trailGrad.addColorStop(1, layerColors[ship.layer] + '44');
        ctx.fillStyle = trailGrad;
        ctx.fillRect(effectiveSx - 2 * ship.scale, ship.y - trailLength, 4 * ship.scale, trailLength);

        drawShip(ctx, effectiveSx, ship.y, ship.scale, ship.type, layerColors[ship.layer]);
      });

      // ── Subtle scanline ──────────────────────────────────────────
      ctx.fillStyle = 'rgba(0,243,255,0.012)';
      ctx.fillRect(0, (time * 0.5) % H, W, 2);

      time++;
      frameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    initStars();
    initShips();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground;