import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';

const variantClasses = {
  cyan: 'skill-pill',
  amber: 'amber-pill',
  green: 'green-pill',
};

const variantColors = {
  cyan: { border: 'rgba(0,243,255,0.2)', text: '#9ecfdb', active: '#00f3ff', header: '#00f3ff' },
  amber: { border: 'rgba(255,170,0,0.2)', text: '#dbc48e', active: '#ffaa00', header: '#ffaa00' },
  green: { border: 'rgba(57,255,20,0.2)', text: '#8ecf9e', active: '#39FF14', header: '#39FF14' },
};

const Skills: React.FC = () => {
  return (
    <section id="arsenal" className="relative py-28 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-tag block mb-3">Arsenal // Capabilities Loaded</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            The Captain's <span className="amber-glow text-neon-amber">Arsenal</span>
          </h2>
        </motion.div>

        <div className="space-y-14">
          {SKILL_CATEGORIES.map((cat, ci) => {
            const colors = variantColors[cat.variant];
            const pill = variantClasses[cat.variant];
            return (
              <motion.div
                key={ci}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.1 }}
              >
                {/* Category label */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: colors.header }}>
                    ── {cat.title}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${colors.header}44, transparent)` }} />
                </div>

                {/* Pill cloud */}
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={si}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: si * 0.05 }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className={`${pill} px-4 py-2 text-sm font-mono rounded-sm cursor-default transition-all duration-200`}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${colors.border}`,
                        color: colors.text,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;