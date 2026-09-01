import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../constants';

const ROLES = [
  'AI Integration Specialist',
  'AI Project Manager & Developer',
  'Building Projkt 360°',
  'Founder of CipherPolice',
  'EU AI Act Researcher',
];

const TypingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[textIdx];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && displayed.length < target.length) {
        setDisplayed(target.slice(0, displayed.length + 1));
      } else if (!deleting && displayed === target) {
        setTimeout(() => setDeleting(true), 1800);
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
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
};

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById('comms')?.scrollIntoView({ behavior: 'smooth' });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pb-20"
      style={{ zIndex: 10 }}
    >
      <div className="relative max-w-5xl mx-auto px-6 pt-28 text-center">
        {/* HUD corner brackets */}
        <div className="hud-corner hud-corner-inner absolute inset-0 pointer-events-none" />

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
            <div className="relative w-32 h-32 sm:w-40 h-40 mx-auto">
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
                  src="/ranjith-profile.png"
                  alt="Ranjith Ramadass — AI Integration Specialist"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Scanning line on image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-20" />
            </div>
          </motion.div>

          {/* Name with glitch */}
          <motion.h1
            variants={fadeUp}
            className="text-6xl sm:text-8xl font-bold tracking-tight mb-4 animate-glitch"
            style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #00f3ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {PROFILE.name}
          </motion.h1>

          {/* Typing role */}
          <motion.div variants={fadeUp} className="text-xl sm:text-2xl font-mono mb-8 h-8">
            <TypingText texts={ROLES} />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed mb-12"
          >
            {PROFILE.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/Ranjith1605"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 font-mono text-sm tracking-widest uppercase overflow-hidden"
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
              View Captain's Log (Resume)
            </a>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 font-mono text-sm tracking-widest uppercase"
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
              ⚡ Hail Communication (Contact)
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-col items-center gap-2 opacity-40"
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