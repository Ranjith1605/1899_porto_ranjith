import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { warpTo } from '../context/Settings';
import { useActiveSection } from './useActiveSection';

const ScrollHud: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  const active = useActiveSection();

  return (
    <>
      {/* Mission progress bar */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(to right, #00f3ff, #ffaa00)', boxShadow: '0 0 8px rgba(0,243,255,0.7)' }}
      />

      {/* Section rail — wide screens only, where there is empty margin for it */}
      <nav aria-label="Section rail" className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => warpTo(item.id)}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? 'true' : undefined}
              data-cursor="WARP"
              className="group flex items-center gap-3 py-0.5"
            >
              <span
                // Labels only on hover/focus: an always-on active label reached
                // ~10px into the content column at 1366px wide.
                className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 bg-black/70 px-1.5 py-0.5 rounded-sm ${isActive ? 'text-neon-cyan' : 'text-gray-300'}`}
              >
                {String(i + 1).padStart(2, '0')} {item.label}
              </span>
              <span
                className={`block rotate-45 transition-all duration-300 ${isActive
                  ? 'w-2.5 h-2.5 bg-neon-cyan shadow-[0_0_10px_#00f3ff]'
                  : 'w-1.5 h-1.5 bg-gray-600 group-hover:bg-neon-amber'}`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default ScrollHud;
