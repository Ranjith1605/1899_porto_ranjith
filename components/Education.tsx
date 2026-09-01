import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION, CERTIFICATES, LANGUAGES } from '../constants';
import Section from './Section';

const Education: React.FC = () => (
  <Section
    id="education"
    eyebrow="05 — Education"
    title="Education & certifications"
    width="narrow"
  >
    <div className="divide-y divide-white/5">
      {EDUCATION.map((edu, i) => (
        <motion.article
          key={edu.degree}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6 py-6 first:pt-0"
        >
          <div className="flex sm:block items-center gap-3">
            <p className="font-mono text-xs text-gray-500 whitespace-nowrap">{edu.period}</p>
            {edu.isCurrent && (
              <span className="mt-0 sm:mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-hud-green">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-green" />
                CURRENT
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white text-base leading-snug">{edu.degree}</h3>
            <p className="font-mono text-sm text-neon-cyan mt-0.5">{edu.institution}</p>
            {edu.focus && <p className="text-gray-500 text-sm leading-relaxed mt-2">{edu.focus}</p>}
          </div>
        </motion.article>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 pt-8 border-t border-white/5"
    >
      <div>
        <p className="font-mono text-xs tracking-widest uppercase text-neon-amber opacity-85 mb-4">Certifications</p>
        <ul className="space-y-2">
          {CERTIFICATES.map(c => (
            <li key={c} className="text-gray-400 text-sm leading-relaxed">{c}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-mono text-xs tracking-widest uppercase text-hud-green opacity-85 mb-4">Languages</p>
        <ul className="space-y-2">
          {LANGUAGES.map(l => (
            <li key={l.name} className="flex items-baseline justify-between max-w-[220px]">
              <span className="text-gray-400 text-sm">{l.name}</span>
              <span className="font-mono text-xs text-gray-500">{l.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  </Section>
);

export default Education;
