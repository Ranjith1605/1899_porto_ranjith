import React, { useState, useEffect } from 'react';

// Scroll-aware App with cinematic space portfolio
import SpaceBackground from './components/StarfieldBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurrentCoordinates from './components/CurrentCoordinates';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Academy from './components/AiLab';
import CommsLink from './components/CommsLink';
import SpaceAudio from './components/SpaceAudio';

const SectionDivider: React.FC = () => (
  <div className="flex items-center my-4 px-6 max-w-6xl mx-auto" aria-hidden>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,243,255,0.15), transparent)' }} />
    <div className="mx-4">
      <div className="w-1.5 h-1.5 rounded-full rotate-45" style={{ background: 'rgba(0,243,255,0.4)' }} />
    </div>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,243,255,0.15), transparent)' }} />
  </div>
);

const Footer: React.FC = () => (
  <footer className="relative py-12 px-6 border-t" style={{ borderColor: 'rgba(0,243,255,0.08)', zIndex: 10 }}>
    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <p className="font-mono text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Ranjith Ramadass — All coordinates reserved.
      </p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/Ranjith1605" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-gray-500 hover:text-neon-cyan transition-colors tracking-widest">
          GITHUB
        </a>
        <span className="text-gray-700">·</span>
        <a href="https://www.linkedin.com/in/ranjithramadass" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-gray-500 hover:text-neon-amber transition-colors tracking-widest">
          LINKEDIN
        </a>
        <span className="text-gray-700">·</span>
        <a href="mailto:007ranjithr.v@gmail.com"
          className="font-mono text-xs text-gray-500 hover:text-hud-green transition-colors tracking-widest">
          EMAIL
        </a>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#020206' }}>
      {/* Fixed background layer */}
      <SpaceBackground scrollY={scrollY} />

      {/* Content layer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <Hero />
        <SectionDivider />
        <CurrentCoordinates />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Timeline />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Academy />
        <SectionDivider />

        {/* Comms section wrapper */}
        <div id="comms" className="py-16 text-center" style={{ zIndex: 10 }}>
          <span className="section-tag block mb-4">Hail Communication // Open Channel</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Open <span className="hologram-text text-neon-cyan">Channel</span>
          </h2>
          <p className="text-gray-500 mb-2 font-mono text-sm">Use the Comms button (bottom-right) to open a direct channel.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <a href="mailto:007ranjithr.v@gmail.com"
              className="font-mono text-sm px-6 py-3 transition-all duration-300"
              style={{ background: 'rgba(0,243,255,0.06)', border: '1px solid rgba(0,243,255,0.25)', color: '#00f3ff' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,243,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              📧 007ranjithr.v@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ranjithramadass" target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm px-6 py-3 transition-all duration-300"
              style={{ background: 'rgba(255,170,0,0.06)', border: '1px solid rgba(255,170,0,0.25)', color: '#ffaa00' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,170,0,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              🔗 LinkedIn Profile
            </a>
          </div>
        </div>

        <Footer />
      </div>

      {/* Floating elements */}
      <SpaceAudio />
      <CommsLink />
    </div>
  );
};

export default App;