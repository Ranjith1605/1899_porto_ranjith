import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { PROFILE } from '../constants';
import { EVENTS, emit, useMediaQuery, warpTo } from '../context/Settings';

const ROLES = [
  'AI Alchemist',
  'Superintelligence Architect',
  'AI Agents & Automation',
  'AI Security · Founder of CipherPolice',
  'Human-Centred AI · EU AI Act',
];

const TypingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[textIdx];
    // The pause on a finished word is part of the same cleared timeout; it used
    // to be a nested, uncleared setTimeout that could fire after unmount.
    const speed = !deleting && displayed === target ? 1800 : deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < target.length) {
        setDisplayed(target.slice(0, displayed.length + 1));
      } else if (!deleting && displayed === target) {
        setDeleting(true);
      } else if (deleting && displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else if (deleting && displayed.length === 0) {
        setDeleting(false);
        setTextIdx((textIdx + 1) % texts.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIdx, texts]);

  return (
    <span className="text-neon-amber" style={{ textShadow: '0 0 10px rgba(255,170,0,0.5)' }}>
      {/* Screen readers get the full list once instead of a stream of letters */}
      <span className="sr-only">{texts.join(', ')}</span>
      <span aria-hidden>{displayed}<span className="animate-blink">|</span></span>
    </span>
  );
};

const Hero: React.FC = () => {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const scrollToContact = () => warpTo('comms');

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as const } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pb-20"
      style={{ zIndex: 10 }}
    >
      <div className="relative max-w-5xl mx-auto px-6 pt-28 text-center">
        {/* HUD corner brackets — start below the 64px navbar instead of under it */}
        <div className="hud-corner hud-corner-inner absolute inset-x-0 top-20 bottom-0 pointer-events-none hidden sm:block" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* System tag */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="section-tag">Captain's Bridge // Initializing...</span>
          </motion.div>

          {/* Profile Image with HUD frame */}
          <motion.div 
            variants={fadeUp}
            className="mb-8 relative inline-block group"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
              {/* Spinning technical rings */}
              <div className="absolute inset-[-10px] border border-neon-cyan/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-18px] border border-dashed border-neon-amber/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Corner brackets for the image */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan opacity-60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan opacity-60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan opacity-60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan opacity-60" />

              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 relative z-10">
                <img 
                  src={PROFILE.avatar || '/ranjith-portrait-2026.jpg'} 
                  alt="Ranjith Ramadass" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Scanning line on image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-20" />
            </div>
          </motion.div>

          {/* Name with glitch */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4 animate-glitch"
            style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #00f3ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {PROFILE.name}
          </motion.h1>

          {/* Typing role */}
          {/* Fixed two-line height on phones: longer roles wrap, and a one-line box
              made them spill over the badges below. */}
          <motion.div variants={fadeUp} className="text-lg sm:text-2xl font-mono mb-6 h-14 sm:h-8 flex items-center justify-center">
            <TypingText texts={ROLES} />
          </motion.div>

          {/* Quick Badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto">
            <span className="font-mono text-xs px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan flex items-center gap-1.5">
              <span>📍</span> Hannover, Germany
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-full border border-hud-green/30 bg-hud-green/5 text-hud-green flex items-center gap-1.5">
              <span>🛡️</span> AI Security · EU AI Act
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-full border border-neon-amber/30 bg-neon-amber/5 text-neon-amber flex items-center gap-1.5">
              <span>⚡</span> LLM Agents · MCP · RAG
            </span>
            <span className="font-mono text-xs px-3 py-1 rounded-full border border-white/20 bg-white/5 text-gray-300 flex items-center gap-1.5">
              <span>🎓</span> Impact MBA (2026)
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-3xl mx-auto text-gray-300 text-sm sm:text-lg leading-relaxed mb-10 font-mono"
          >
            {PROFILE.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/ranjith-ramadass-1591a819a"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 sm:px-8 py-3 font-mono text-sm tracking-widest uppercase overflow-hidden"
              style={{
                background: 'rgba(0,243,255,0.08)',
                border: '1px solid rgba(0,243,255,0.4)',
                color: '#00f3ff',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,243,255,0.18)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,243,255,0.3), inset 0 0 20px rgba(0,243,255,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,243,255,0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              💼 LinkedIn Profile
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              data-cursor="HAIL"
              className="px-6 sm:px-8 py-3 font-mono text-sm tracking-widest uppercase flex items-center gap-2"
              style={{
                background: 'rgba(255,170,0,0.1)',
                border: '1px solid rgba(255,170,0,0.4)',
                color: '#ffaa00',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,170,0,0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,170,0,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,170,0,0.1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              ⚡ Initiate Contact & Hire
            </button>
          </motion.div>

          {/* How to drive the new controls — keyboard hint only where there is a keyboard */}
          <motion.p variants={fadeUp} className="mt-6 font-mono text-[11px] text-gray-500">
            {finePointer ? (
              <>
                Press{' '}
                <button type="button" onClick={() => emit(EVENTS.openPalette)} className="px-1.5 py-0.5 border border-white/20 rounded-sm text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/60">
                  Ctrl / ⌘ K
                </button>{' '}
                for the command deck ·{' '}
              </>
            ) : null}
            <button type="button" onClick={() => emit(EVENTS.openSettings)} className="underline decoration-dotted underline-offset-4 hover:text-neon-cyan">
              ⚙ customise cursor &amp; starfield
            </button>
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col items-center gap-2 opacity-40"
          >
            <span className="font-mono text-xs tracking-widest text-gray-500">SCROLL TO NAVIGATE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-px h-10 bg-gradient-to-b from-neon-cyan to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;