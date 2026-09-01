import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, PROFILE } from '../constants';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(2,2,6,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-sm tracking-widest text-white hover:text-neon-cyan transition-colors shrink-0"
        >
          RR<span className="text-neon-cyan">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.filter(i => i.id !== 'hero').map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-3.5 py-2 font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                active === item.id ? 'text-neon-cyan' : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              {item.label}
              {active === item.id && (
                <span className="absolute inset-x-3 -bottom-px h-px" style={{ background: '#00f3ff' }} />
              )}
            </button>
          ))}
        </div>

        <a
          href={`mailto:${PROFILE.email}`}
          className="shrink-0 font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-md transition-colors hover:text-white"
          style={{ border: '1px solid rgba(0,243,255,0.35)', color: '#00f3ff' }}
        >
          Hire me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
