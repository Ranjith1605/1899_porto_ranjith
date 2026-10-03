import React, { useEffect, useRef } from 'react';
import { CursorStyle, useMediaQuery, useSettings } from '../context/Settings';

type Mode = 'default' | 'link' | 'text';

const INTERACTIVE = 'a, button, [role="button"], [role="switch"], [role="option"], [role="tab"], label, summary, select, [data-cursor]';
const TEXT_INPUT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

// Context label shown next to the cursor when it locks onto something clickable.
const labelFor = (el: Element): string => {
  const explicit = el.getAttribute('data-cursor');
  if (explicit) return explicit;
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    if (href.startsWith('mailto:')) return 'MAIL';
    if (href.startsWith('tel:')) return 'CALL';
    if (href.startsWith('#')) return 'JUMP';
    if (el.target === '_blank') return 'OPEN ↗';
    return 'OPEN';
  }
  if (el.getAttribute('role') === 'switch') return 'TOGGLE';
  return 'ENGAGE';
};

const CursorImpl: React.FC<{ variant: Exclude<CursorStyle, 'system'>; reduced: boolean }> = ({ variant, reduced }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const canvas = trailRef.current!;
    const tctx = canvas.getContext('2d')!;

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;
    let frame = 0;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number }[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Hide the OS cursor only while this component is mounted, so switching to
    // "system" (or a touch device) can never leave the page without a cursor.
    document.documentElement.classList.add('custom-cursor');

    const setMode = (mode: Mode, text = '') => {
      if (root.dataset.mode !== mode) root.dataset.mode = mode;
      if (label.textContent !== text) label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        root.style.opacity = '1';
      }
      if (variant === 'plasma' && !reduced) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: pos.x, y: pos.y,
            vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8 - 0.2,
            life: 1, size: 2 + Math.random() * 3,
          });
        }
        if (particles.length > 120) particles.splice(0, particles.length - 120);
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (t.closest(TEXT_INPUT)) return setMode('text');
      const hit = t.closest(INTERACTIVE);
      if (hit) return setMode('link', labelFor(hit));
      setMode('default');
    };

    const burst = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.className = 'rr-cursor__ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      root.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
      setTimeout(() => ripple.remove(), 800); // reduced-motion has no animationend
      if (variant === 'plasma' && !reduced) {
        for (let i = 0; i < 18; i++) {
          const a = (i / 18) * Math.PI * 2;
          particles.push({ x, y, vx: Math.cos(a) * 2.4, vy: Math.sin(a) * 2.4, life: 1, size: 2.5 });
        }
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      root.dataset.down = 'true';
      burst(e.clientX, e.clientY);
    };
    const onUp = () => { root.dataset.down = 'false'; };
    const onLeave = () => { visible = false; root.style.opacity = '0'; };

    const tick = () => {
      // The ring trails the dot for a sense of mass; with reduced motion it snaps.
      const k = reduced ? 1 : 0.2;
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      label.style.transform = `translate3d(${ringPos.x + 26}px, ${ringPos.y + 18}px, 0)`;

      tctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (particles.length) {
        tctx.globalCompositeOperation = 'lighter';
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy; p.life -= 0.035;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const r = p.size * p.life;
          const g = tctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
          g.addColorStop(0, `rgba(255,200,80,${0.9 * p.life})`);
          g.addColorStop(1, 'rgba(255,120,0,0)');
          tctx.fillStyle = g;
          tctx.beginPath();
          tctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          tctx.fill();
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [variant, reduced]);

  return (
    <div ref={rootRef} className={`rr-cursor rr-cursor--${variant}`} data-mode="default" aria-hidden="true" style={{ opacity: 0 }}>
      <canvas ref={trailRef} className="rr-cursor__trail" />
      <div ref={ringRef} className="rr-cursor__pos">
        <div className="rr-cursor__ring">
          {variant === 'reticle' && (
            <svg viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M24 2v8M24 38v8M2 24h8M38 24h8" stroke="currentColor" strokeWidth="1.5" />
              <path className="rr-cursor__brackets" d="M8 14V8h6M34 8h6v6M40 34v6h-6M14 40H8v-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      </div>
      <div ref={dotRef} className="rr-cursor__pos">
        <div className="rr-cursor__dot" />
      </div>
      <div ref={labelRef} className="rr-cursor__label" />
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const { settings } = useSettings();
  // Touch screens and pens have no hover: a drawn cursor there would just sit
  // where the last tap happened.
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  if (settings.cursor === 'system' || !finePointer) return null;
  return <CursorImpl key={settings.cursor} variant={settings.cursor} reduced={settings.reducedMotion} />;
};

export default CustomCursor;
