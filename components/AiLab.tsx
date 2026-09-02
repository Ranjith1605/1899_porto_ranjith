import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION, CERTIFICATIONS } from '../constants';

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
          <span className="section-tag block mb-3">Academic Foundation // Research & Certifications</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Academy & <span className="hologram-text text-neon-cyan">Thesis</span>
          </h2>
        </motion.div>

        <div className="space-y-6 mb-16">
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
                {edu.badge && (
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/10 text-gray-400 mt-2 inline-block">
                    {edu.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-white text-base mb-1">{edu.degree}</h3>
                <p className="font-mono text-sm mb-2" style={{ color: edu.isCurrent ? '#00f3ff' : '#ffaa00' }}>
                  {edu.institution}
                </p>
                {edu.focus && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-gray-500 font-mono text-xs">Focus: </span>{edu.focus}
                  </p>
                )}
              </div>

              {/* Degree icon */}
              <div className="text-3xl opacity-20">🎓</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Row */}
        {CERTIFICATIONS && CERTIFICATIONS.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs tracking-widest uppercase text-neon-amber">
                ── Professional Certifications & Specializations
              </span>
              <div className="flex-1 h-px bg-neon-amber/20" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CERTIFICATIONS.map((cert, ci) => (
                <div key={ci} className="glass-card p-4 rounded-sm border border-neon-amber/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-neon-amber font-mono text-xs">📜 Verified</span>
                    <span className="font-mono text-[10px] text-gray-500 ml-auto">{cert.year}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{cert.title}</h4>
                  <p className="font-mono text-xs text-neon-amber/80">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Academy;