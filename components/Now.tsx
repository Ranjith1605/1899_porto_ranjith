import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CURRENT_COORDINATES } from '../constants';
import Portal from './Portal';
import Section from './Section';

const ACCENTS = {
  cyan: '#00f3ff',
  amber: '#ffaa00',
  green: '#39FF14',
};

const Now: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx === null ? null : CURRENT_COORDINATES[openIdx];

  return (
    <Section
      id="now"
      eyebrow="01 — Now"
      title="What I'm working on"
      lead="Three things at once, and each one feeds the others."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CURRENT_COORDINATES.map((c, i) => {
          const accent = ACCENTS[c.color];
          return (
            <motion.button
              type="button"
              key={c.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => setOpenIdx(i)}
              aria-haspopup="dialog"
              className="portal-card rounded-md p-5 flex flex-col text-left"
              style={{ ['--portal-accent' as string]: accent }}
            >
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest mb-5" style={{ color: accent }}>
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                />
                ACTIVE
              </span>

              <h3 className="font-semibold text-white text-[15px] leading-snug">{c.role}</h3>
              <p className="font-mono text-xs mt-1 mb-3" style={{ color: accent }}>{c.institution}</p>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{c.detail}</p>

              <span className="portal-open mt-5 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest" style={{ color: accent }}>
                DETAILS <ArrowUpRight size={11} />
              </span>
            </motion.button>
          );
        })}
      </div>

      <Portal
        open={selected !== null}
        onClose={() => setOpenIdx(null)}
        tag="// Current"
        title={selected?.role ?? ''}
        subtitle={selected?.institution}
        accent={selected ? ACCENTS[selected.color] : undefined}
        description={selected?.detail}
        details={selected?.details}
      />
    </Section>
  );
};

export default Now;
