import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      let current = 'hero';
      sections.forEach(section => {
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = section.id;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(2,2,6,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,243,255,0.12)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm tracking-widest text-neon-cyan opacity-90 hover:opacity-100 transition-opacity"
          style={{ textShadow: '0 0 8px rgba(0,243,255,0.5)' }}
        >
          RR<span className="text-neon-amber">://</span>1899
        </button>

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                active === item.id
                  ? 'text-neon-cyan'
                  : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              {active === item.id && (
                <span
                  className="absolute inset-x-2 bottom-0 h-px"
                  style={{ background: 'linear-gradient(to right, transparent, #00f3ff, transparent)' }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-hud-green animate-pulse-slow" />
          <span className="hidden sm:inline text-gray-500 tracking-widest">ONLINE</span>
        </div>
      </div>

      {/* HUD bottom line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,243,255,0.3), transparent)' }}
      />
    </nav>
  );
};

export default Navbar;