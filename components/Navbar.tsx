import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { EVENTS, emit, warpTo } from '../context/Settings';
import { useActiveSection } from './useActiveSection';

const Navbar: React.FC = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    if (menuOpen) {
      setMenuOpen(false);
      // Mobile Chrome cancels a smooth scroll started inside the tap that also
      // collapses the menu, leaving the page where it was. Start the jump once
      // the 250ms collapse is done.
      setTimeout(() => warpTo(id), 260);
    } else {
      warpTo(id);
    }
  };

  const solid = scrolled || menuOpen;

  return (
    <nav
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: solid ? 'rgba(2,2,6,0.92)' : 'transparent',
        backdropFilter: solid ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(16px)' : 'none',
        borderBottom: solid ? '1px solid rgba(0,243,255,0.12)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => go('hero')}
          aria-label="Back to top"
          data-cursor="HOME"
          className="font-mono text-sm tracking-widest text-neon-cyan opacity-90 hover:opacity-100 transition-opacity shrink-0"
          style={{ textShadow: '0 0 8px rgba(0,243,255,0.5)' }}
        >
          RR<span className="text-neon-amber">://</span>1899
        </button>

        {/* Nav Items — full row only from lg; below that the 8 labels don't fit */}
        <div className="hidden lg:flex items-center">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
              data-cursor="WARP"
              className={`relative px-2.5 xl:px-4 py-2 font-mono text-xs tracking-wider xl:tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                active === item.id
                  ? 'text-neon-cyan'
                  : 'text-gray-400 hover:text-gray-100'
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2 bottom-0 h-px"
                  style={{ background: 'linear-gradient(to right, transparent, #00f3ff, transparent)' }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => emit(EVENTS.openPalette)}
            aria-label="Open command deck"
            data-cursor="COMMAND"
            className="hidden xl:inline-flex items-center gap-1 font-mono text-[10px] text-gray-400 hover:text-neon-cyan border border-white/15 hover:border-neon-cyan/60 rounded-sm px-2 py-1 transition-colors"
          >
            <Command size={11} /> K
          </button>
          {/* Status pill */}
          <div className="flex items-center gap-2 font-mono text-xs" aria-hidden>
            <span className="w-2 h-2 rounded-full bg-hud-green animate-pulse-slow" />
            <span className="hidden sm:inline text-gray-500 tracking-widest">ONLINE</span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 -mr-2 text-neon-cyan"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-neon-cyan/10"
          >
            <ul className="px-4 py-3 grid grid-cols-2 gap-2 max-w-7xl mx-auto">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`w-full text-left px-3 py-3 rounded-sm border font-mono text-xs tracking-widest uppercase transition-colors ${
                      active === item.id
                        ? 'border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan'
                        : 'border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <span className="text-gray-600 mr-2">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD bottom line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,243,255,0.3), transparent)' }}
      />
    </nav>
  );
};

export default Navbar;
