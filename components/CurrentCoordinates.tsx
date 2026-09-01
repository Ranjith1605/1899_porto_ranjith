import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CURRENT_COORDINATES } from '../constants';
import Portal from './Portal';

const colorMap = {
  cyan: { accent: '#00f3ff', bg: 'rgba(0,243,255,0.04)' },
  amber: { accent: '#ffaa00', bg: 'rgba(255,170,0,0.04)' },
  green: { accent: '#39FF14', bg: 'rgba(57,255,20,0.04)' },
};

const CurrentCoordinates: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const selected = openIdx === null ? null : CURRENT_COORDINATES[openIdx];

  return (
    <section id="coordinates" className="relative py-24 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-tag block mb-3">Current Coordinates // Live Status</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Current <span className="hologram-text text-neon-cyan">Coordinates</span>
          </h2>
          <p className="text-gray-500 mt-4 font-mono text-sm">
            [ {CURRENT_COORDINATES.length} ACTIVE MISSIONS — CLICK ANY CARD TO OPEN ITS PORTAL ]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {CURRENT_COORDINATES.map((coord, i) => {
            const colors = colorMap[coord.color];
            return (
              <motion.button
                type="button"
                key={coord.institution + coord.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setOpenIdx(i)}
                className="portal-card rounded-sm p-6 flex flex-col"
                style={{ ['--portal-accent' as string]: colors.accent, background: colors.bg }}
                aria-haspopup="dialog"
              >
                <span className="portal-corner tl" />
                <span className="portal-corner tr" />
                <span className="portal-corner bl" />
                <span className="portal-corner br" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl" aria-hidden>{coord.icon}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest" style={{ color: colors.accent }}>
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.6 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: colors.accent, boxShadow: `0 0 6px ${colors.accent}` }}
                    />
                    ACTIVE
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug mb-1">{coord.role}</h3>
                <p className="font-mono text-xs mb-3" style={{ color: colors.accent }}>{coord.institution}</p>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{coord.detail}</p>

                <span className="portal-open mt-5 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest" style={{ color: colors.accent }}>
                  OPEN PORTAL <ArrowUpRight size={12} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Portal
        open={selected !== null}
        onClose={() => setOpenIdx(null)}
        tag="// Current mission"
        title={selected?.role ?? ''}
        subtitle={selected?.institution}
        accent={selected ? colorMap[selected.color].accent : undefined}
        description={selected?.detail}
        details={selected?.details}
      />
    </section>
  );
};

export default CurrentCoordinates;
