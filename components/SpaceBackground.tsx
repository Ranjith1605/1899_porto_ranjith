import React, { useEffect, useRef } from 'react';

interface Props {
  scrollY: number;
}

interface Star {
  x: number;          // 0..1 of width
  y: number;          // 0..1 of height
  r: number;          // radius in px
  a: number;          // base alpha
  depth: number;      // 0 = far, 1 = near (drives parallax)
  tw: number;         // twinkle phase
  twSpeed: number;
  hue: string;
}

interface Meteor {
  x: number; y: number; len: number; speed: number; angle: number; life: number; maxLife: number;
}

/**
 * Deep-space background.
 *
 * Three parallax star layers, slow drifting nebula, an occasional meteor and a
 * vignette. Deliberately no spacecraft: the previous canvas drew cartoon ships
 * that read as clutter behind the content. Depth here comes from parallax and
 * light, which is what makes a night sky feel real.
 *
 * Renders at devicePixelRatio for crisp points, pauses when the tab is hidden,
 * and falls back to a still starfield when the visitor prefers reduced motion.
 */
const SpaceBackground: React.FC<Props> = ({ scrollY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const frameRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    scrollRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1;

    const STAR_HUES = [
      'rgba(255,255,255,',   // white
      'rgba(214,234,255,',   // cool white
      'rgba(180,214,255,',   // blue-white
      'rgba(255,236,206,',   // warm
      'rgba(168,240,255,',   // cyan tint
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      // Density scales with viewport so phones don't render 900 points.
      const count = Math.round(Math.min(900, Math.max(260, (W * H) / 2200)));
      starsRef.current = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random(),
          y: Math.random(),
          // Nearer stars are bigger and brighter — this is what sells the depth.
          r: 0.35 + depth * depth * 1.5,
          a: 0.25 + depth * 0.6,
          depth,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.008 + Math.random() * 0.022,
          hue: STAR_HUES[Math.floor(Math.random() * STAR_HUES.length)],
        };
      });
    };

    const spawnMeteor = () => {
      // Enter from the top-right quadrant, travel down-left.
      meteorsRef.current.push({
        x: W * (0.45 + Math.random() * 0.7),
        y: -40 - Math.random() * 120,
        len: 90 + Math.random() * 160,
        speed: 5 + Math.random() * 5,
        angle: Math.PI * 0.72 + (Math.random() * 0.1 - 0.05),
        life: 0,
        maxLife: 90 + Math.random() * 50,
      });
    };

    const drawNebula = (t: number) => {
      // Two very soft colour fields that breathe. Kept low-alpha so text stays readable.
      const clouds = [
        { x: 0.24, y: 0.28, r: 0.75, c: '0,150,220', a: 0.10, dx: 0.012, dy: 0.008 },
        { x: 0.82, y: 0.68, r: 0.85, c: '110,60,200', a: 0.09, dx: -0.010, dy: 0.011 },
        { x: 0.55, y: 0.06, r: 0.60, c: '0,200,210', a: 0.05, dx: 0.007, dy: -0.006 },
      ];
      clouds.forEach(cl => {
        const cx = (cl.x + Math.sin(t * cl.dx) * 0.03) * W;
        const cy = (cl.y + Math.cos(t * cl.dy) * 0.03) * H;
        const rad = cl.r * Math.max(W, H) * 0.6;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${cl.c},${cl.a})`);
        g.addColorStop(0.55, `rgba(${cl.c},${cl.a * 0.28})`);
        g.addColorStop(1, `rgba(${cl.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
    };

    const drawVignette = () => {
      const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.78);
      g.addColorStop(0, 'rgba(2,2,6,0)');
      g.addColorStop(1, 'rgba(2,2,6,0.75)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };

    let t = 0;

    const draw = () => {
      const scroll = scrollRef.current;

      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, W, H);
      drawNebula(t);

      // Stars — parallax by depth, wrapped vertically so scrolling never empties the sky.
      for (const s of starsRef.current) {
        const parallax = scroll * (0.02 + s.depth * 0.10);
        let y = (s.y * H - parallax) % H;
        if (y < 0) y += H;
        const x = s.x * W;

        const twinkle = reduceMotion ? 1 : 0.72 + Math.sin(s.tw + t * s.twSpeed) * 0.28;
        const alpha = s.a * twinkle;

        ctx.fillStyle = s.hue + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // The brightest near stars get a soft bloom.
        if (s.depth > 0.86) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 7);
          g.addColorStop(0, s.hue + (alpha * 0.4).toFixed(3) + ')');
          g.addColorStop(1, s.hue + '0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Meteors
      if (!reduceMotion) {
        if (Math.random() < 0.0022 && meteorsRef.current.length < 2) spawnMeteor();
        meteorsRef.current = meteorsRef.current.filter(m => {
          m.life += 1;
          m.x -= Math.cos(m.angle - Math.PI) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          const fade = 1 - m.life / m.maxLife;
          if (fade <= 0 || m.y > H + 120) return false;
          const tx = m.x + Math.cos(m.angle - Math.PI) * m.len;
          const ty = m.y - Math.sin(m.angle) * m.len;
          const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
          g.addColorStop(0, `rgba(190,240,255,${0.75 * fade})`);
          g.addColorStop(1, 'rgba(190,240,255,0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          return true;
        });
      }

      drawVignette();

      t += 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(frameRef.current);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => { resize(); initStars(); };

    resize();
    initStars();
    start();

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground;
