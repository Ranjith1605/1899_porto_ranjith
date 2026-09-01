import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

import SpaceBackground from './components/SpaceBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Now from './components/Now';
import Work from './components/Work';
import ExperienceSection from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import ChatWidget from './components/ChatWidget';
import OmDrone from './components/OmDrone';
import Section from './components/Section';
import { PROFILE } from './constants';

const Contact: React.FC = () => (
  <Section
    id="contact"
    eyebrow="06 — Contact"
    title="Let's talk"
    lead={`${PROFILE.availability}. Based in ${PROFILE.location}, and happy to work remotely.`}
    width="narrow"
  >
    <div className="flex flex-wrap gap-3">
      <a
        href={`mailto:${PROFILE.email}`}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-mono text-sm transition-all duration-200 hover:brightness-125"
        style={{ background: 'rgba(0,243,255,0.10)', border: '1px solid rgba(0,243,255,0.45)', color: '#00f3ff' }}
      >
        <Mail size={15} /> {PROFILE.email}
      </a>
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-mono text-sm text-gray-300 hover:text-white transition-colors"
        style={{ border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <Linkedin size={15} /> LinkedIn
      </a>
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-mono text-sm text-gray-300 hover:text-white transition-colors"
        style={{ border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <Github size={15} /> GitHub
      </a>
    </div>

    <p className="mt-8 flex items-center gap-2 font-mono text-xs text-gray-600">
      <MapPin size={13} /> {PROFILE.location}
    </p>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="relative px-6 py-10 border-t border-white/5" style={{ zIndex: 10 }}>
    <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
      <p className="font-mono text-[11px] text-gray-600">
        © {new Date().getFullYear()} {PROFILE.name}
      </p>
      <p className="font-mono text-[11px] text-gray-600">
        Built with React, TypeScript &amp; Vite
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#020206' }}>
      <SpaceBackground scrollY={scrollY} />

      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <Now />
          <Work />
          <ExperienceSection />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>

      <OmDrone />
      <ChatWidget />
    </div>
  );
};

export default App;
