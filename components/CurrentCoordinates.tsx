import React from 'react';
import { motion } from 'framer-motion';
import { CURRENT_COORDINATES } from '../constants';

const colorMap = {
  cyan: {
    bg: 'rgba(0,243,255,0.05)',
    border: 'rgba(0,243,255,0.25)',
    dot: '#00f3ff',
    glow: 'rgba(0,243,255,0.3)',
    text: '#00f3ff',
  },
  amber: {
    bg: 'rgba(255,170,0,0.05)',
    border: 'rgba(255,170,0,0.25)',
    dot: '#ffaa00',
    glow: 'rgba(255,170,0,0.3)',
    text: '#ffaa00',
  },
  green: {
    bg: 'rgba(57,255,20,0.05)',
    border: 'rgba(57,255,20,0.25)',
    dot: '#39FF14',
    glow: 'rgba(57,255,20,0.3)',
    text: '#39FF14',
  },
};

const CurrentCoordinates: React.FC = () => {
  return (
    <section id="coordinates" className="relative py-28 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-tag block mb-3">Current Coordinates // Live Status</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Current <span className="hologram-text text-neon-cyan">Coordinates</span>
          </h2>
          <p className="text-gray-500 mt-4 font-mono text-sm">[ 3 ACTIVE MISSIONS — ALL SYSTEMS NOMINAL ]</p>
        </motion.div>

        {/* Coordinate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRENT_COORDINATES.map((coord, i) => {
            const colors = colorMap[coord.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-sm"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: colors.dot }} />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: colors.dot }} />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: colors.dot }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: colors.dot }} />

                {/* Status dot + icon */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{coord.icon}</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.4 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: colors.dot, boxShadow: `0 0 6px ${colors.glow}` }}
                    />
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: colors.text }}>
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Role */}
                <h3 className="font-bold text-white text-base mb-1 leading-snug">{coord.role}</h3>
                {/* Institution */}
                <p className="font-mono text-xs mb-4" style={{ color: colors.text }}>{coord.institution}</p>
                {/* Detail */}
                <p className="text-gray-400 text-sm leading-relaxed">{coord.detail}</p>

                {/* HUD line at bottom */}
                <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${colors.dot}44, transparent)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentCoordinates;
