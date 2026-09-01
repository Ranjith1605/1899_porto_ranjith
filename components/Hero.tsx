import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Maximize2 } from 'lucide-react';
import { PROFILE, PHOTO } from '../constants';
import Portal from './Portal';

const ROLES = [
  'AI Integration Specialist',
  'AI Developer @ Yoga Vidya',
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero: React.FC = () => {
  const [photoOpen, setPhotoOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        {/* ---------- Photo: first on mobile, right on desktop. Always fully visible. ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 lg:order-2 flex flex-col items-center gap-4"
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label="Open the full photo of Ranjith Ramadass"
            className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-full"
          >
            {/* Rotating rings around the portrait */}
            <div className="photo-ring photo-ring-outer" aria-hidden />
            <div className="photo-ring photo-ring-inner" aria-hidden />

            <div className="photo-circle relative">
              <img
                src={PHOTO.src}
                alt={PHOTO.alt}
                className="w-full h-full rounded-full transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectFit: PHOTO.fit, objectPosition: PHOTO.position }}
              />
              {/* Sweep highlight on hover */}
              <div className="photo-sweep" aria-hidden />
            </div>

          </button>

          {/* Open badge — sits below the portrait so it never covers the face */}
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest text-neon-cyan whitespace-nowrap transition-colors hover:text-white"
            style={{ background: 'rgba(0,243,255,0.06)', border: '1px solid rgba(0,243,255,0.3)' }}
          >
            <Maximize2 size={11} />
            VIEW FULL PHOTO
          </button>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-widest text-gray-500">
            <span>HANNOVER · 52.37° N 9.73° E</span>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="text-hud-green flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-hud-green animate-pulse-slow" />
              OPEN TO WORK
            </span>
          </div>
        </motion.div>

        {/* ---------- Text ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="mb-5">
            <span className="section-tag">// AI Integration Specialist — Hannover, Germany</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight mb-4 animate-glitch"
            style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #00f3ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {PROFILE.name}
          </motion.h1>

          <motion.div variants={fadeUp} className="text-lg sm:text-2xl font-mono mb-6 h-8">
            <TypingText texts={ROLES} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl mx-auto lg:mx-0 text-gray-400 text-base sm:text-lg leading-relaxed mb-8"
          >
            {PROFILE.bio}
          </motion.p>

          {/* Signals — the three things a recruiter scans for */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10 font-mono text-[11px] tracking-wider"
          >
            {['Claude · Gemini · GPT', 'EU AI Act · GDPR', 'Python · TypeScript', 'EN C1 · DE B2 · TA'].map(s => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-sm text-gray-400"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-widest uppercase rounded-sm transition-all hover:text-white"
              style={{ background: 'rgba(0,243,255,0.10)', border: '1px solid rgba(0,243,255,0.5)', color: '#00f3ff' }}
            >
              <Mail size={14} /> Contact me
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-widest uppercase rounded-sm transition-all hover:text-white"
              style={{ background: 'rgba(255,170,0,0.08)', border: '1px solid rgba(255,170,0,0.45)', color: '#ffaa00' }}
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 font-mono text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] tracking-widest text-gray-500">SCROLL · EVERY CARD OPENS</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gradient-to-b from-neon-cyan to-transparent"
        />
      </div>

      {/* Photo portal — the full image, large, uncropped */}
      <Portal
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        tag="// Portrait"
        title={PROFILE.name}
        subtitle={PROFILE.role}
        details={{ story: [PROFILE.bio], links: [{ label: 'LinkedIn', url: PROFILE.linkedin }, { label: 'GitHub', url: PROFILE.github }] }}
      >
        <div className="rounded-sm overflow-hidden" style={{ border: '1px solid rgba(0,243,255,0.25)', background: '#020206' }}>
          <img src={PHOTO.src} alt={`${PHOTO.alt}, full portrait`} className="block w-full h-auto max-h-[70vh] object-contain mx-auto" />
        </div>
      </Portal>
    </section>
  );
};

export default Hero;
