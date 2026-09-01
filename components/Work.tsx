import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import Portal from './Portal';
import Section from './Section';

const ACCENT = '#00f3ff';

const Work: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx === null ? null : PROJECTS[openIdx];

  return (
    <Section
      id="work"
      eyebrow="02 — Work"
      title="Selected work"
      lead="Four things worth reading about. Open any card for the detail."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.button
            type="button"
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            onClick={() => setOpenIdx(i)}
            aria-haspopup="dialog"
            className="portal-card rounded-md p-6 flex flex-col text-left"
            style={{ ['--portal-accent' as string]: ACCENT }}
          >
            {p.highlight && (
              <span className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: ACCENT, opacity: 0.75 }}>
                {p.highlight}
              </span>
            )}

            <h3 className="font-semibold text-white text-lg leading-snug">{p.title}</h3>
            <p className="font-mono text-xs text-neon-amber mt-1 mb-3">{p.role}</p>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{p.description}</p>

            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/5">
              {p.tech.slice(0, 3).map(t => (
                <span key={t} className="font-mono text-[11px] text-gray-500">{t}</span>
              ))}
              {p.tech.length > 3 && <span className="font-mono text-[11px] text-gray-600">+{p.tech.length - 3}</span>}
              <span className="portal-open ml-auto inline-flex items-center gap-1 font-mono text-[10px] tracking-widest" style={{ color: ACCENT }}>
                READ <ArrowUpRight size={11} />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <Portal
        open={selected !== null}
        onClose={() => setOpenIdx(null)}
        tag={selected?.highlight ? `// ${selected.highlight}` : '// Work'}
        title={selected?.title ?? ''}
        subtitle={selected?.role}
        accent={ACCENT}
        description={selected?.description}
        details={selected?.details}
        chips={selected?.tech}
      />
    </Section>
  );
};

export default Work;
