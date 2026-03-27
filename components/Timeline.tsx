import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../constants';

const Timeline: React.FC = () => {
  return (
    <section id="mission-log" className="relative py-28 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-tag block mb-3">Mission Log // Field Operations</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Mission <span className="hologram-text text-neon-cyan">Log</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="timeline-glow absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(0,243,255,0.1), rgba(0,243,255,0.5), rgba(255,170,0,0.3), rgba(0,243,255,0.1))' }}
          />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: exp.isCurrent ? '#00f3ff' : '#ffaa00',
                    background: exp.isCurrent ? 'rgba(0,243,255,0.3)' : 'rgba(255,170,0,0.2)',
                    boxShadow: exp.isCurrent ? '0 0 8px rgba(0,243,255,0.6)' : '0 0 6px rgba(255,170,0,0.4)',
                    transform: 'translateX(-50%) translateX(8px)',
                    left: '-8px',
                  }}
                >
                  {exp.isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(0,243,255,0.4)' }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="glass-card rounded-sm p-6 ml-4"
                  style={{
                    borderColor: exp.isCurrent ? 'rgba(0,243,255,0.25)' : 'rgba(255,170,0,0.15)',
                  }}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{exp.role}</h3>
                      <p className="font-mono text-sm mt-0.5" style={{ color: exp.isCurrent ? '#00f3ff' : '#ffaa00' }}>
                        {exp.company} {exp.location && <span className="text-gray-600">· {exp.location}</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {exp.isCurrent && (
                        <span className="font-mono text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: 'rgba(0,243,255,0.4)', color: '#00f3ff', background: 'rgba(0,243,255,0.08)' }}>
                          ● ACTIVE
                        </span>
                      )}
                      <span className="font-mono text-xs text-gray-500 tracking-wide whitespace-nowrap">{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                  {/* Tags */}
                  {exp.tags && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, ti) => (
                        <span key={ti} className="font-mono text-xs px-2 py-0.5 rounded-sm text-gray-500"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;