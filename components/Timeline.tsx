import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import Portal from './Portal';

const Timeline: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx === null ? null : EXPERIENCE[openIdx];
  const accentFor = (isCurrent?: boolean) => (isCurrent ? '#00f3ff' : '#ffaa00');

  return (
    <section id="mission-log" className="relative py-24 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-tag block mb-3">Mission Log // Field Operations</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Mission <span className="hologram-text text-neon-cyan">Log</span>
          </h2>
          <p className="text-gray-500 mt-4 font-mono text-sm">[ CLICK AN ENTRY FOR THE FULL LOG ]</p>
        </motion.div>

        <div className="relative pl-8">
          <div
            className="timeline-glow absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(0,243,255,0.1), rgba(0,243,255,0.5), rgba(255,170,0,0.3), rgba(0,243,255,0.1))' }}
          />

          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => {
              const accent = accentFor(exp.isCurrent);
              return (
                <motion.div
                  key={exp.company + exp.period}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.08 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute top-6 w-3 h-3 rounded-full border-2"
                    style={{
                      left: '-38px',
                      borderColor: accent,
                      background: exp.isCurrent ? 'rgba(0,243,255,0.3)' : 'rgba(255,170,0,0.2)',
                      boxShadow: `0 0 8px ${accent}99`,
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

                  <button
                    type="button"
                    onClick={() => setOpenIdx(i)}
                    className="portal-card w-full rounded-sm p-5 sm:p-6"
                    style={{ ['--portal-accent' as string]: accent }}
                    aria-haspopup="dialog"
                  >
                    <span className="portal-corner tl" />
                    <span className="portal-corner br" />

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base sm:text-lg leading-tight">{exp.role}</h3>
                        <p className="font-mono text-sm mt-0.5" style={{ color: accent }}>
                          {exp.company}
                          {exp.location && <span className="text-gray-600"> · {exp.location}</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {exp.isCurrent && (
                          <span
                            className="font-mono text-[10px] px-2 py-0.5 rounded-full border tracking-widest"
                            style={{ borderColor: 'rgba(0,243,255,0.4)', color: '#00f3ff', background: 'rgba(0,243,255,0.08)' }}
                          >
                            ● ACTIVE
                          </span>
                        )}
                        <span className="font-mono text-xs text-gray-500 tracking-wide whitespace-nowrap">{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{exp.description}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {exp.tags?.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-sm text-gray-500"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="portal-open ml-auto inline-flex items-center gap-1 font-mono text-[10px] tracking-widest" style={{ color: accent }}>
                        OPEN <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Portal
        open={selected !== null}
        onClose={() => setOpenIdx(null)}
        tag={selected ? `// ${selected.period}` : undefined}
        title={selected?.role ?? ''}
        subtitle={selected ? `${selected.company}${selected.location ? ` · ${selected.location}` : ''}` : undefined}
        accent={selected ? accentFor(selected.isCurrent) : undefined}
        description={selected?.description}
        details={selected?.details}
        chips={selected?.tags}
      />
    </section>
  );
};

export default Timeline;
