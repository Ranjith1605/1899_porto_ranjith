import React from 'react';
import StarfieldBackground from './components/StarfieldBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AiLab from './components/AiLab';
import CommsLink from './components/CommsLink';
import SpaceAudio from './components/SpaceAudio';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen text-gray-200 font-sans selection:bg-neon-cyan selection:text-black">
      {/* Immersive Background */}
      <StarfieldBackground />

      {/* Overlay Texture (Scanlines) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Skills />
        <Projects />
        <AiLab />
      </main>

      <footer className="py-8 text-center text-gray-600 text-xs font-mono relative z-10 border-t border-gray-900 bg-black">
        <p>SYSTEM_ID: CIPHER_POLICE // © {new Date().getFullYear()} // END_OF_LINE</p>
      </footer>

      <CommsLink />
      <SpaceAudio />
    </div>
  );
};

export default App;