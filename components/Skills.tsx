import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  // Filter toggles. "All" is the default, so every skill is visible on load and
  // the filter only ever narrows the view — nothing is removed.
  const [filter, setFilter] = useState<number | null>(null);
  const visible = SKILL_CATEGORIES.map((cat, ci) => ({ cat, ci })).filter(({ ci }) => filter === null || filter === ci);
  const total = SKILL_CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

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

        {/* Category toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter skills by category">
          {[{ label: 'All', idx: null as number | null, color: '#e5e7eb', count: total },
            ...SKILL_CATEGORIES.map((c, i) => ({ label: c.title, idx: i as number | null, color: variantColors[c.variant].header, count: c.skills.length }))].map(t => {
            const active = filter === t.idx;
            return (
              <button
                key={t.label}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(t.idx)}
                data-cursor="FILTER"
                className="px-3 py-1.5 rounded-full border font-mono text-[11px] tracking-wider transition-all duration-200"
                style={{
                  color: active ? '#020206' : t.color,
                  background: active ? t.color : 'rgba(255,255,255,0.03)',
                  borderColor: active ? t.color : 'rgba(255,255,255,0.12)',
                  boxShadow: active ? `0 0 14px ${t.color}66` : 'none',
                }}
              >
                {t.label} <span className="opacity-60">{t.count}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-14">
          <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ cat, ci }) => {
            const colors = variantColors[cat.variant];
            const pill = variantClasses[cat.variant];
            return (
              <motion.div
                key={ci}
                layout
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: filter === null ? ci * 0.1 : 0 }}
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;