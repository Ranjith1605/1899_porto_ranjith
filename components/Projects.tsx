import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import Portal from './Portal';

const ACCENT = '#00f3ff';
const MAX_CHIPS = 4;

const Projects: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx === null ? null : PROJECTS[openIdx];

  return (
    <section id="simulations" className="relative py-24 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-tag block mb-3">Historical Logs // Project Archive</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Project <span className="amber-glow text-neon-amber">Archive</span>
          </h2>
          <p className="text-gray-500 mt-4 font-mono text-sm">[ EACH PROJECT OPENS INTO ITS OWN PORTAL ]</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => {
            const extra = project.tech.length - MAX_CHIPS;
            return (
              <motion.button
                type="button"
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                onClick={() => setOpenIdx(i)}
                className="portal-card rounded-sm p-6 flex flex-col"
                style={{ ['--portal-accent' as string]: ACCENT }}
                aria-haspopup="dialog"
              >
                <span className="portal-corner tl" />
                <span className="portal-corner tr" />
                <span className="portal-corner bl" />
                <span className="portal-corner br" />

                {project.highlight && (
                  <span
                    className="self-start font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm mb-4"
                    style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)', color: ACCENT }}
                  >
                    {project.highlight}
                  </span>
                )}

                <h3 className="font-bold text-white text-lg leading-snug mb-1">{project.title}</h3>
                <p className="font-mono text-xs text-neon-amber mb-3">{project.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                  {project.tech.slice(0, MAX_CHIPS).map(t => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 text-gray-500 rounded-sm"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {t}
                    </span>
                  ))}
                  {extra > 0 && <span className="font-mono text-[11px] px-1 py-0.5 text-gray-600">+{extra}</span>}
                  <span className="portal-open ml-auto inline-flex items-center gap-1 font-mono text-[10px] tracking-widest" style={{ color: ACCENT }}>
                    OPEN <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Portal
        open={selected !== null}
        onClose={() => setOpenIdx(null)}
        tag={selected?.highlight ? `// ${selected.highlight}` : '// Project'}
        title={selected?.title ?? ''}
        subtitle={selected?.role}
        accent={ACCENT}
        description={selected?.description}
        details={selected?.details}
        chips={selected?.tech}
      />
    </section>
  );
};

export default Projects;
