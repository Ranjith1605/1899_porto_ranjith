import React from 'react';
import { WORK_EXPERIENCE, EDUCATION } from '../constants';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
        >
            <h2 className="text-3xl font-mono font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Briefcase className="text-neon-cyan" />
                MISSION LOG
            </h2>
            <div className="h-1 w-24 bg-neon-cyan mx-auto"></div>
        </motion.div>

        <div className="relative border-l-2 border-gray-800 ml-6 md:ml-10 space-y-12">
            {WORK_EXPERIENCE.map((job, index) => (
                <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Node Dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
                    
                    <div className="bg-glass-panel border border-gray-800 p-6 rounded hover:border-neon-cyan/50 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{job.role}</h3>
                            <span className="font-mono text-xs text-neon-cyan border border-neon-cyan/30 px-2 py-1 rounded bg-neon-cyan/5">
                                {job.period}
                            </span>
                        </div>
                        <h4 className="text-matrix-green font-mono text-sm mb-4 tracking-wide">@{job.company}</h4>
                        
                        <ul className="space-y-2">
                            {job.description.map((desc, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                    <span className="text-neon-cyan mt-1">›</span>
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Education Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24"
        >
             <h2 className="text-2xl font-mono font-bold text-white mb-8 flex items-center gap-2 ml-6 md:ml-10">
                <GraduationCap className="text-matrix-green" />
                TRAINING MODULES
            </h2>
            
            <div className="grid gap-6 ml-6 md:ml-10">
                {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-matrix-green/50 pl-4 py-2 bg-matrix-green/5 rounded-r">
                        <h3 className="text-white font-bold">{edu.degree}</h3>
                        <p className="text-matrix-green text-sm font-mono">{edu.institution}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{edu.period}</span>
                            {edu.details && <span className="text-xs text-gray-400 italic text-right">{edu.details}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Timeline;