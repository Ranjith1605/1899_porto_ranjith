import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <p className="font-mono text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Ranjith Ramadass — AI Integration Specialist · Hannover, Germany
      </p>
      <div className="flex items-center gap-4">
        <a href="https://github.com/Ranjith1605" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-gray-500 hover:text-neon-cyan transition-colors tracking-widest">
          GITHUB
        </a>
        <span className="text-gray-700">·</span>
        <a href="https://www.linkedin.com/in/ranjith" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-gray-500 hover:text-neon-amber transition-colors tracking-widest">
          LINKEDIN
        </a>
        <span className="text-gray-700">·</span>
        <a href="https://cipherpolice.com" target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-gray-500 hover:text-hud-green transition-colors tracking-widest">
          CIPHERPOLICE
        </a>
        <span className="text-gray-700">·</span>
        <a href="mailto:007ranjithr.v@gmail.com"
          className="font-mono text-xs text-gray-500 hover:text-neon-cyan transition-colors tracking-widest">
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

        {/* The Dream: Climax Section */}
        <section id="dream" className="relative py-28 px-6 overflow-hidden" style={{ zIndex: 10 }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <span className="section-tag block mb-4">The Captain's Vision // 360° AI Ecosystem</span>
                <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                  Building the <span className="hologram-text text-neon-cyan">Digital Starship</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 font-mono">
                  "Orchestrating autonomous AI agents, privacy-first cybersecurity, and compliant enterprise integrations into a unified 360° intelligence starship."
                </p>
                <div className="space-y-4">
                  <div className="glass-card p-6 border-l-4 border-neon-cyan/50 bg-neon-cyan/5">
                    <h3 className="text-neon-cyan font-bold mb-2">Flagship 01: PROJKT 360 DEGREE</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">
                      An enterprise-grade autonomous second brain and multi-agent execution pipeline synthesizing Claude Opus, Gemini 2.5, and vector retrieval.
                    </p>
                  </div>

                  <div className="glass-card p-6 border-l-4 border-hud-green/50 bg-hud-green/5">
                    <h3 className="text-hud-green font-bold mb-2">Flagship 02: CipherPolice</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Returning digital sovereignty with real-time tracker detection, a 35+ rule credential leak guard, and automated EU AI Act compliance checks.
                      <br /><br />
                      <span className="flex flex-wrap gap-4 font-mono text-xs">
                        <a href="https://cipherpolice.com" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline transition-colors">→ cipherpolice.com</a>
                        <a href="https://cipherpolice.de" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline transition-colors">→ cipherpolice.de</a>
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                className="flex-1 relative"
              >
                {/* HUD Overlay for image */}
                <div className="absolute -inset-4 border border-neon-cyan/20 rounded-lg pointer-events-none" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-neon-cyan/40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-neon-cyan/40 pointer-events-none" />
                
                <div className="rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.15)] bg-space-void">
                  <img src="/dream-spaceship.png" alt="Captain Ranjith on the Bridge" className="w-full h-auto object-cover" />
                </div>
                
                {/* Coordinates overlay */}
                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-neon-cyan opacity-60 tracking-tighter text-right">
                  SECTOR: 1899-ODYSSEY<br />
                  COORDINATES: 52.3702° N, 9.7332° E (Hannover)<br />
                  STATUS: ENTERPRISE AI SHIP OPERATIONAL
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Comms section wrapper */}
        <div id="comms" className="py-16 text-center" style={{ zIndex: 10 }}>
          <span className="section-tag block mb-4">Hail Communication // Open Channel</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Connect & <span className="hologram-text text-neon-cyan">Collaborate</span>
          </h2>
          <p className="text-gray-400 mb-2 font-mono text-sm max-w-xl mx-auto">
            Available for enterprise AI integration, custom LLM workflows, and EU AI Act compliance consulting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="mailto:007ranjithr.v@gmail.com"
              className="font-mono text-sm px-6 py-3 transition-all duration-300 rounded-sm"
              style={{ background: 'rgba(0,243,255,0.06)', border: '1px solid rgba(0,243,255,0.25)', color: '#00f3ff' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,243,255,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              📧 007ranjithr.v@gmail.com
            </a>
            <a href="tel:+4915510174187"
              className="font-mono text-sm px-6 py-3 transition-all duration-300 rounded-sm"
              style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.25)', color: '#39FF14' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(57,255,20,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              📱 +49 1551 0174187
            </a>
            <a href="https://www.linkedin.com/in/ranjith" target="_blank" rel="noopener noreferrer"
              className="font-mono text-sm px-6 py-3 transition-all duration-300 rounded-sm"
              style={{ background: 'rgba(255,170,0,0.06)', border: '1px solid rgba(255,170,0,0.25)', color: '#ffaa00' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(255,170,0,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              💼 LinkedIn Profile
            </a>
          </div>

          {/* Floating Emoji Interactions */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-16 pointer-events-none pb-12">
            {['🛸', '🦹🏽‍♂️', '👾', '✝️', '🐉', '🚀'].map((emoji, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.15, 
                  type: 'spring', 
                  bounce: 0.5 
                }}
                className="text-5xl sm:text-7xl drop-shadow-[0_0_15px_rgba(0,243,255,0.5)] cursor-default pointer-events-auto hover:scale-125 transition-transform"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }}
                >
                  {emoji}
                </motion.div>
              </motion.div>
            ))}
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