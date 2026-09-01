import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  /** Small mono label above the heading, e.g. "01 — Now". */
  eyebrow?: string;
  title: string;
  /** Optional one-line intro under the heading. */
  lead?: string;
  /** Constrain width; sections with cards want more room than prose. */
  width?: 'narrow' | 'wide';
  children: React.ReactNode;
}

/**
 * One section shell for the whole page: consistent rhythm, one heading style,
 * one reveal. Uniform spacing is most of what makes a page read as "clean".
 */
const Section: React.FC<Props> = ({ id, eyebrow, title, lead, width = 'wide', children }) => (
  <section id={id} className="relative px-6 py-20 sm:py-28" style={{ zIndex: 10 }}>
    <div className={`mx-auto ${width === 'narrow' ? 'max-w-3xl' : 'max-w-5xl'}`}>
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 sm:mb-14"
      >
        {eyebrow && <span className="section-tag block mb-3">{eyebrow}</span>}
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{title}</h2>
        {lead && <p className="mt-3 text-gray-400 text-base leading-relaxed max-w-2xl">{lead}</p>}
        <div className="mt-6 h-px w-full" style={{ background: 'linear-gradient(to right, rgba(0,243,255,0.35), rgba(255,255,255,0.04) 45%, transparent)' }} />
      </motion.header>
      {children}
    </div>
  </section>
);

export default Section;
