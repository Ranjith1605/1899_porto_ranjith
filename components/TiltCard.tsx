import React, { useRef } from 'react';
import { HTMLMotionProps, motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery, useSettings } from '../context/Settings';

/**
 * A card that tilts toward the pointer in 3D and carries a spotlight
 * (`.rr-spotlight`) that follows it. Tilt is skipped on touch devices and with
 * reduced motion; the card is then a plain motion.div.
 */
const TiltCard: React.FC<HTMLMotionProps<'div'> & { maxTilt?: number }> = ({ maxTilt = 6, className = '', style, onMouseMove, onMouseLeave, children, ...rest }) => {
  const { settings } = useSettings();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const enabled = finePointer && !settings.reducedMotion;
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      if (enabled) {
        ry.set((px - 0.5) * 2 * maxTilt);
        rx.set(-(py - 0.5) * 2 * maxTilt);
      }
    }
    onMouseMove?.(e);
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rx.set(0);
    ry.set(0);
    onMouseLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      {...rest}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`rr-spotlight ${className}`}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
