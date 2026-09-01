import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Mail, Github, Linkedin, Maximize2, ArrowDown } from 'lucide-react';
import { PROFILE, PHOTO, QUICK_FACTS } from '../constants';
import Portal from './Portal';

const ROLES = [
  'AI Integration Specialist',
  'AI Developer @ Yoga Vidya',
  'Founder — CipherPolice',
  'EU AI Act Researcher',
];

const TypingText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[idx];
    const speed = deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (!deleting && shown.length < target.length) setShown(target.slice(0, shown.length + 1));
      else if (!deleting && shown === target) setTimeout(() => setDeleting(true), 2200);
      else if (deleting && shown.length > 0) setShown(shown.slice(0, -1));
      else { setDeleting(false); setIdx((idx + 1) % texts.length); }
    }, speed);
    return () => clearTimeout(timer);
  }, [shown, deleting, idx, texts]);

  return (
    <span className="text-neon-amber">
      {shown}
      <span className="animate-blink font-light">|</span>
    </span>
  );
};

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero: React.FC = () => {
  const [photoOpen, setPhotoOpen] = useState(false);

  // pb-36 on phones keeps the copy clear of the floating audio and chat buttons.
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-28 pb-36 sm:pb-24" style={{ zIndex: 10 }}>
      <div className="mx-auto w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1 text-center lg:text-left">
          <motion.p variants={fadeUp} className="section-tag mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
            <span>{PROFILE.location}</span>
            <span className="text-gray-700" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5 text-hud-green">
              <span className="w-1.5 h-1.5 rounded-full bg-hud-green" />
              Open to work
            </span>
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-[2.75rem] leading-[1.05] sm:text-6xl xl:text-7xl font-semibold tracking-tight text-white mb-5"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.div variants={fadeUp} className="font-mono text-base sm:text-xl mb-6 h-7">
            <TypingText texts={ROLES} />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-200 leading-snug max-w-xl mx-auto lg:mx-0 mb-4">
            {PROFILE.tagline}
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-400 text-[15px] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">
            {PROFILE.bio}
          </motion.p>

          {/* The four facts a recruiter scans for */}
          <motion.dl variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 text-left max-w-xl mx-auto lg:mx-0">
            {QUICK_FACTS.map(f => (
              <div key={f.label} className="border-l border-white/10 pl-3">
                <dt className="font-mono text-[10px] tracking-widest uppercase text-gray-600">{f.label}</dt>
                <dd className="text-[13px] text-gray-300 mt-0.5">{f.value}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:brightness-125"
              style={{ background: 'rgba(0,243,255,0.10)', border: '1px solid rgba(0,243,255,0.5)', color: '#00f3ff' }}
            >
              <Mail size={14} /> Get in touch
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-mono text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-mono text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="order-1 lg:order-2 flex flex-col items-center gap-4"
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            aria-label="Open the full photo"
            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            <div className="photo-ring photo-ring-outer" aria-hidden />
            <div className="photo-ring photo-ring-inner" aria-hidden />
            <div className="photo-circle relative">
              <img
                src={PHOTO.avatar}
                alt={PHOTO.alt}
                className="w-full h-full rounded-full transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectFit: PHOTO.fit, objectPosition: PHOTO.position }}
              />
              <div className="photo-sweep" aria-hidden />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest text-gray-400 hover:text-neon-cyan transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <Maximize2 size={11} /> VIEW FULL PHOTO
          </button>
        </motion.div>
      </div>

      <a
        href="#now"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 hover:text-neon-cyan transition-colors"
        aria-label="Scroll to content"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.span>
      </a>

      <Portal
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        tag="// Portrait"
        title={PROFILE.name}
        subtitle={PROFILE.role}
        details={{
          story: [PROFILE.bio],
          links: [
            { label: 'LinkedIn', url: PROFILE.linkedin },
            { label: 'GitHub', url: PROFILE.github },
          ],
        }}
      >
        <div className="rounded-md overflow-hidden" style={{ border: '1px solid rgba(0,243,255,0.22)', background: '#020206' }}>
          <img src={PHOTO.full} alt={`${PHOTO.alt}, full portrait`} className="block w-full h-auto max-h-[68vh] object-contain mx-auto" />
        </div>
      </Portal>
    </section>
  );
};

export default Hero;
