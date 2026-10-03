import React, { useEffect, useRef } from 'react';
import { EVENTS, useSettings } from '../context/Settings';

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

  // Engine glow (multi-layered)
  const engineGlow = ctx.createRadialGradient(0, 15, 0, 0, 15, 25);
  engineGlow.addColorStop(0, glowColor);
  engineGlow.addColorStop(0.5, glowColor + '44');
  engineGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = engineGlow;
  ctx.beginPath();
  ctx.arc(0, 15, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = glowColor + '88';
  ctx.lineWidth = 0.5;
  ctx.fillStyle = '#050a10';

  if (type === 0) {
    // Heavy Industrial Cruiser (1899 Style)
    // Main Hull
    ctx.beginPath();
    ctx.moveTo(-15, -30); ctx.lineTo(15, -30);
    ctx.lineTo(20, 10); ctx.lineTo(-20, 10);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    
    // Side Pods
    ctx.beginPath();
    ctx.rect(-28, -10, 8, 25); ctx.rect(20, -10, 8, 25);
    ctx.fill(); ctx.stroke();
    
    // Technical paneling lines
    ctx.beginPath();
    ctx.moveTo(-15, -10); ctx.lineTo(15, -10);
    ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
    ctx.moveTo(0, -30); ctx.lineTo(0, 10);
    ctx.stroke();
  } else if (type === 1) {
    // Elongated Command Ship
    ctx.beginPath();
    ctx.moveTo(0, -40); ctx.lineTo(12, -10);
    ctx.lineTo(8, 20); ctx.lineTo(-8, 20);
    ctx.lineTo(-12, -10);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    
    // Vertical stabilizers
    ctx.beginPath();
    ctx.moveTo(8, -5); ctx.lineTo(22, 10); ctx.lineTo(8, 15);
    ctx.moveTo(-8, -5); ctx.lineTo(-22, 10); ctx.lineTo(-8, 15);
    ctx.stroke();
    
    // Core line
    ctx.beginPath();
    ctx.moveTo(0, -40); ctx.lineTo(0, 20);
    ctx.stroke();
  } else if (type === 2) {
    // Stealth/Scout Prototype
    ctx.beginPath();
    ctx.moveTo(0, -25); ctx.lineTo(15, 15); 
    ctx.lineTo(0, 5); ctx.lineTo(-15, 15);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    
    // Internal refraction lines
    ctx.beginPath();
    ctx.moveTo(0, -25); ctx.lineTo(0, 5);
    ctx.moveTo(-8, 5); ctx.lineTo(8, 5);
    ctx.stroke();
  } else {
    // UFO Structure (Guardians Style)
    // Main saucer
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    
    // Glass energy dome
    ctx.beginPath();
    ctx.arc(0, -2, 10, Math.PI, 0);
    ctx.fillStyle = glowColor + '44';
    ctx.fill();
    ctx.strokeStyle = glowColor;
    ctx.stroke();
    ctx.fillStyle = '#050a10';
    
    // 3 Bottom energy thrusters
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(-12, 3, 2, 0, Math.PI * 2);
    ctx.arc(0, 5, 2.5, 0, Math.PI * 2);
    ctx.arc(12, 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#050a10';
  }

  // Visual "lights" (small dots)
  ctx.fillStyle = glowColor;
  ctx.beginPath();
  ctx.arc(-5, -5, 1, 0, Math.PI * 2);
  ctx.arc(5, -5, 1, 0, Math.PI * 2);
  ctx.arc(0, -20, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

const BASE_SPEED = { warp: 4, cruise: 0.8, still: 0 } as const;

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shipsRef = useRef<Ship[]>([]);
  const frameRef = useRef<number>(0);
  const { settings } = useSettings();
  // The draw loop lives in a mount-once effect; it reads settings through a ref
  // so toggling them never tears down and rebuilds the canvas.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Logical (CSS pixel) size; the backing store is scaled by devicePixelRatio
    // so stars stay crisp on retina screens instead of being upscaled blurry.
    let W = window.innerWidth;
    let H = window.innerHeight;
    let boost = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(); // a still starfield still needs repainting at the new size
    };

    const newStar = (z = Math.random() * W): Star => ({
      x: Math.random() * W - W / 2,
      y: Math.random() * H - H / 2,
      z,
      size: Math.random() * 1.5 + 0.2,
    });

    const initStars = () => {
      starsRef.current = Array.from({ length: 700 }, () => newStar());
    };

    const initShips = () => {
      shipsRef.current = Array.from({ length: 20 }, (_, i) => ({
        x: Math.random() * 2000,
        y: 80 + Math.random() * H * 0.7,
        layer: i < 6 ? 2 : i < 14 ? 1 : 0, // 6 far, 8 mid, 6 near
        speed: 0.2 + Math.random() * 0.3,
        scale: i < 6 ? 0.35 : i < 14 ? 0.6 : 1.0,
        type: Math.floor(Math.random() * 4),
        trail: 0,
      }));
    };

    let time = 0;
    let running = false;

    const draw = () => {
      const { starfield, ships, reducedMotion } = settingsRef.current;
      const still = starfield === 'still' || reducedMotion;
      const scroll = window.scrollY;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const cx = W / 2 + (still ? 0 : pointer.x * 30);
      const cy = H / 2 + (still ? 0 : pointer.y * 30);

      // ── Background ──────────────────────────────────────────────
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, W, H);

      // Nebula layers
      const nebulaPositions = [
        { x: W * 0.15, y: H * 0.3, r1: '#4a007822', r2: '#1a004400' },
        { x: W * 0.8, y: H * 0.65, r1: '#00224422', r2: '#00004400' },
        { x: W * 0.5, y: H * 0.2, r1: '#00334433', r2: '#00000000' },
      ];
      nebulaPositions.forEach(n => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, W * 0.55);
        g.addColorStop(0, n.r1);
        g.addColorStop(1, n.r2);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // ── Stars ────────────────────────────────────────────────────
      boost *= 0.94;
      const starSpeed = still ? 0 : BASE_SPEED[starfield] + boost * 28;
      const streak = starSpeed > 2.5;
      starsRef.current.forEach(star => {
        star.z -= starSpeed;
        // z can exceed W after the window shrinks; without this reset the size
        // below goes negative and ctx.arc throws, freezing the whole loop.
        if (star.z <= 1 || star.z > W) Object.assign(star, newStar(W));
        const sx = (star.x / star.z) * W + cx;
        const sy = (star.y / star.z) * H + cy;
        const depth = 1 - star.z / W;
        const size = Math.max(depth * star.size * 2.5, 0.1);
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) return;
        if (streak) {
          const pz = star.z + starSpeed * 1.6;
          const px = (star.x / pz) * W + cx;
          const py = (star.y / pz) * H + cy;
          ctx.strokeStyle = `rgba(200, 230, 255, ${depth * 0.9})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(200, 220, 255, ${depth * 0.9})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── Armada of Ships ──────────────────────────────────────────
      if (ships) {
        const layerSpeeds = [0.022, 0.012, 0.005]; // near, mid, far
        const layerColors = ['#00f3ff', '#ffaa00', '#7055ff'];

        shipsRef.current.forEach(ship => {
          // Scroll-driven parallax: each layer moves at different speed
          const parallaxOffset = scroll * layerSpeeds[ship.layer];
          const sx = (ship.x - parallaxOffset * 80 - (still ? 0 : pointer.x * (3 - ship.layer) * 8)) % (W + 400);
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
      }

      // ── Subtle scanline ──────────────────────────────────────────
      ctx.fillStyle = 'rgba(0,243,255,0.012)';
      ctx.fillRect(0, (time * 0.5) % H, W, 2);

      time++;
    };

    // Animate continuously, except in "still" / reduced-motion mode where we
    // repaint only on scroll (ships keep their parallax) to save battery.
    const loop = () => {
      draw();
      const { starfield, reducedMotion } = settingsRef.current;
      if ((starfield === 'still' || reducedMotion) && boost < 0.01) {
        running = false;
        return;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      frameRef.current = requestAnimationFrame(loop);
    };

    const onWarp = () => {
      if (settingsRef.current.reducedMotion) return;
      boost = 1;
      start();
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointer.tx = e.clientX / W - 0.5;
      pointer.ty = e.clientY / H - 0.5;
    };
    const onScroll = () => { if (!running) draw(); };

    window.addEventListener('resize', resize);
    window.addEventListener(EVENTS.warp, onWarp);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    initStars();
    initShips();
    start();

    // Settings changes (e.g. Still → Cruise) need to restart a stopped loop.
    const restart = () => start();
    window.addEventListener('rr:settings-changed', restart);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener(EVENTS.warp, onWarp);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('rr:settings-changed', restart);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('rr:settings-changed'));
  }, [settings.starfield, settings.reducedMotion, settings.ships]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

export default SpaceBackground;
