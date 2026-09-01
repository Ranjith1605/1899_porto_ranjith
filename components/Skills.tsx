import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../constants';
import Section from './Section';

const COLORS = {
  cyan: '#00f3ff',
  amber: '#ffaa00',
  green: '#39FF14',
};

const Skills: React.FC = () => (
  <Section
    id="skills"
    eyebrow="04 — Skills"
    title="Skills"
    lead="Grouped the way my CV groups them."
    width="narrow"
  >
    <div className="space-y-8">
      {SKILL_CATEGORIES.map((cat, i) => {
        const accent = COLORS[cat.variant];
        return (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6"
          >
            <p className="font-mono text-xs tracking-widest uppercase pt-1" style={{ color: accent, opacity: 0.85 }}>
              {cat.title}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map(s => (
                <span
                  key={s.name}
                  className="px-3 py-1.5 rounded-md font-mono text-[12px] text-gray-300 transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </Section>
);

export default Skills;
