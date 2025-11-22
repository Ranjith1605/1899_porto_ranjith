
import React, { useState } from 'react';
import { PROJECTS, PROFILE } from '../constants';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Database, AlertTriangle, CheckCircle, Github, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 relative bg-black/30">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-12 flex items-center gap-4">
            <Cpu className="text-neon-cyan w-8 h-8" />
            <h2 className="text-3xl font-mono font-bold text-white tracking-widest">PROJECT ARCHIVE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
                <motion.div
                    key={project.id}
                    layoutId={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="cursor-pointer group relative bg-gray-900/50 border border-gray-800 hover:border-neon-cyan transition-all duration-300 overflow-hidden rounded"
                >
                    {/* Scanline Overlay on hover */}
                    <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                    
                    <div className="aspect-video w-full overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                    </div>
                    
                    <div className="p-4 relative z-20 bg-glass-panel backdrop-blur-sm">
                        <h3 className="font-mono text-neon-cyan font-bold text-lg mb-1">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[10px] border border-gray-600 px-1 text-gray-400">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* GitHub Uplink */}
        <div className="mt-12 flex justify-center">
            <a 
                href={`${PROFILE.github}?tab=repositories`} 
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center gap-3 bg-black border border-gray-700 px-8 py-4 rounded hover:border-neon-cyan transition-colors duration-300"
            >
                <Github size={20} className="text-white group-hover:text-neon-cyan transition-colors" />
                <div className="flex flex-col items-start">
                    <span className="text-[10px] text-matrix-green font-mono tracking-wider">SECURE UPLINK ESTABLISHED</span>
                    <span className="text-white font-bold group-hover:text-neon-cyan transition-colors flex items-center gap-2">
                        ACCESS FULL GITHUB REPOSITORY <ExternalLink size={12} />
                    </span>
                </div>
                <div className="absolute inset-0 border border-neon-cyan/0 group-hover:border-neon-cyan/20 rounded transition-all duration-500 animate-pulse"></div>
            </a>
        </div>

        <AnimatePresence>
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    
                    {/* Modal */}
                    <motion.div 
                        layoutId={selectedProject.id}
                        className="w-full max-w-2xl bg-[#0a0a0a] border border-neon-cyan relative z-10 overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.2)]"
                    >
                        <div className="bg-neon-cyan/10 p-2 border-b border-neon-cyan flex justify-between items-center">
                            <span className="font-mono text-xs text-neon-cyan">FILE: {selectedProject.id.toUpperCase()}</span>
                            <button onClick={() => setSelectedProject(null)} className="text-neon-cyan hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <h2 className="text-2xl font-mono font-bold text-white mb-4">{selectedProject.title}</h2>
                            
                            <img 
                                src={selectedProject.image} 
                                alt={selectedProject.title} 
                                className="w-full h-64 object-cover mb-6 border border-gray-800 rounded"
                            />

                            <div className="space-y-6 font-sans text-gray-300">
                                <div>
                                    <h4 className="flex items-center gap-2 text-matrix-green font-mono mb-2 text-sm">
                                        <Database size={14} /> TECH STACK
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map(t => (
                                            <span key={t} className="bg-gray-900 text-neon-cyan text-xs px-2 py-1 rounded border border-neon-cyan/30">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="flex items-center gap-2 text-white font-bold mb-2">OVERVIEW</h4>
                                    <p>{selectedProject.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/10 border border-red-900/30 p-4 rounded">
                                        <h4 className="text-alert-red font-mono text-sm mb-2 flex items-center gap-2">
                                            <AlertTriangle size={14} /> CHALLENGE
                                        </h4>
                                        <p className="text-sm">{selectedProject.challenges}</p>
                                    </div>
                                    <div className="bg-green-900/10 border border-green-900/30 p-4 rounded">
                                        <h4 className="text-matrix-green font-mono text-sm mb-2 flex items-center gap-2">
                                            <CheckCircle size={14} /> SOLUTION
                                        </h4>
                                        <p className="text-sm">{selectedProject.solutions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
