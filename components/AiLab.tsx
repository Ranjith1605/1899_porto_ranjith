import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION, CERTIFICATES, LANGUAGES } from '../constants';

const Academy: React.FC = () => {
  return (
    <section id="academy" className="relative py-28 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-tag block mb-3">Academy Records // Credentials</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Academy <span className="hologram-text text-neon-cyan">Records</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="glass-card rounded-sm p-6 flex flex-wrap items-start gap-6"
              style={{ borderLeft: `3px solid ${edu.isCurrent ? 'rgba(0,243,255,0.6)' : 'rgba(255,170,0,0.3)'}` }}
            >
              {/* Year column */}
              <div className="w-28 flex-shrink-0">
                <p className="font-mono text-xs tracking-widest text-gray-500">{edu.period}</p>
                {edu.isCurrent && (
                  <div className="flex items-center gap-1 mt-1">
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                    />
                    <span className="font-mono text-xs text-neon-cyan">CURRENT</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-white text-base mb-1">{edu.degree}</h3>
                <p className="font-mono text-sm mb-2" style={{ color: edu.isCurrent ? '#00f3ff' : '#ffaa00' }}>
                  {edu.institution}
                </p>
                {edu.focus && (
                  <p className="text-gray-500 text-sm">
                    <span className="text-gray-600 font-mono text-xs">Focus: </span>{edu.focus}
                  </p>
                )}
              </div>

              {/* Degree icon */}
              <div className="text-3xl opacity-20">🎓</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-card rounded-sm p-6" style={{ borderLeft: '3px solid rgba(255,170,0,0.4)' }}>
            <span className="section-tag block mb-4">Certifications</span>
            <ul className="space-y-2">
              {CERTIFICATES.map(cert => (
                <li key={cert} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-neon-amber font-mono text-xs mt-1">▸</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-sm p-6" style={{ borderLeft: '3px solid rgba(57,255,20,0.4)' }}>
            <span className="section-tag block mb-4">Languages</span>
            <ul className="space-y-2">
              {LANGUAGES.map(lang => (
                <li key={lang.name} className="text-sm text-gray-400 flex items-center justify-between">
                  <span>{lang.name}</span>
                  <span className="font-mono text-xs text-hud-green">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Academy;