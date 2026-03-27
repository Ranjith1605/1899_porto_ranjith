import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="simulations" className="relative py-28 px-6" style={{ zIndex: 10 }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-tag block mb-3">Historical Logs // Project Archive</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Project <span className="amber-glow text-neon-amber">Archive</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group glass-card rounded-sm p-6 flex flex-col"
              style={{ cursor: 'default' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,243,255,0.4)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,243,255,0.08), 0 20px 40px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,243,255,0.15)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Highlight badge */}
              <div className="mb-4">
                <span className="font-mono text-xs px-2 py-1 rounded-full"
                  style={{ background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.25)', color: '#00f3ff' }}>
                  {project.highlight}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-neon-cyan transition-colors duration-300">
                {project.title}
              </h3>

              {/* Role */}
              <p className="font-mono text-xs text-neon-amber mb-4">{project.role}</p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white border-opacity-5">
                {project.tech.map((t, ti) => (
                  <span key={ti} className="font-mono text-xs px-2 py-0.5 text-gray-500 rounded-sm"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
