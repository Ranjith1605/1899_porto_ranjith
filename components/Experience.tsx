import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, FURTHER_EXPERIENCE } from '../constants';
import Section from './Section';

/**
 * Experience as a recruiter reads it: period on the left, role and company on
 * the right, one paragraph of what was actually done. No cards to click, no
 * jargon — the CV's own structure, including its grouped "further experience"
 * block rather than five thin entries for short roles.
 */
const ExperienceSection: React.FC = () => (
  <Section
    id="experience"
    eyebrow="03 — Experience"
    title="Experience"
    lead="Roles as they appear on my CV."
    width="narrow"
  >
    <div className="divide-y divide-white/5">
      {EXPERIENCE.map((exp, i) => (
        <motion.article
          key={exp.company + exp.period}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.06 }}
          className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6 py-7 first:pt-0"
        >
          <div className="flex sm:block items-center gap-3">
            <p className="font-mono text-xs text-gray-500 whitespace-nowrap">{exp.period}</p>
            {exp.isCurrent && (
              <span className="mt-0 sm:mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-hud-green">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-green" />
                CURRENT
              </span>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white text-base leading-snug">{exp.role}</h3>
            <p className="font-mono text-sm text-neon-cyan mt-0.5">
              {exp.company}
              {exp.location && <span className="text-gray-600"> · {exp.location}</span>}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">{exp.description}</p>
            {exp.tags && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
                {exp.tags.map(tag => (
                  <span key={tag} className="font-mono text-[11px] text-gray-600">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </motion.article>
      ))}

      {/* The CV's grouped block — kept compact on purpose. */}
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-2 sm:gap-6 py-7"
      >
        <p className="font-mono text-xs text-gray-500 whitespace-nowrap">{FURTHER_EXPERIENCE.period}</p>
        <div>
          <h3 className="font-semibold text-gray-300 text-base">Further experience</h3>
          <ul className="mt-3 space-y-1.5">
            {FURTHER_EXPERIENCE.items.map(item => (
              <li key={item} className="text-gray-500 text-sm leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  </Section>
);

export default ExperienceSection;
