import React from 'react';
import { SKILLS, LANGUAGES } from '../constants';
import { motion } from 'framer-motion';
import { Cpu, Code, Database, Cloud, Globe, MessageSquare } from 'lucide-react';

const Skills: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'ai': return <Cpu size={14} className="text-neon-cyan" />;
      case 'dev': return <Code size={14} className="text-matrix-green" />;
      case 'data': return <Database size={14} className="text-yellow-500" />;
      default: return <Cloud size={14} className="text-blue-400" />;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'ai': return 'bg-neon-cyan';
      case 'dev': return 'bg-matrix-green';
      case 'data': return 'bg-yellow-500';
      default: return 'bg-blue-400';
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-black/20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Tech Skills Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center gap-4"
        >
            <div className="p-2 border border-neon-cyan rounded bg-neon-cyan/10">
                <Code className="text-neon-cyan w-6 h-6" />
            </div>
            <h2 className="text-3xl font-mono font-bold text-white tracking-widest">
                SYSTEM CAPABILITIES
            </h2>
        </motion.div>

        {/* Tech Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-20">
            {SKILLS.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                >
                    {/* Label Row */}
                    <div className="flex justify-between items-end mb-2 font-mono text-sm">
                        <div className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                            {getIcon(skill.category)}
                            <span className="tracking-wide">{skill.name.toUpperCase()}</span>
                        </div>
                        <span className="text-neon-cyan font-bold">{skill.level}%</span>
                    </div>

                    {/* Bar Container */}
                    <div className="h-3 bg-gray-900 border border-gray-800 rounded-sm overflow-hidden relative">
                        {/* Grid Background for bar */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSIjMzMzIiAvPjwvc3ZnPg==')] opacity-20"></div>
                        
                        {/* Animated Fill */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className={`h-full ${getColor(skill.category)} relative`}
                        >
                             {/* Glow Effect at tip */}
                             <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                        </motion.div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Languages Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4"
        >
            <div className="p-2 border border-purple-500 rounded bg-purple-500/10">
                <Globe className="text-purple-500 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-mono font-bold text-white tracking-widest">
                LANGUAGE PROTOCOLS
            </h2>
        </motion.div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANGUAGES.map((lang, index) => (
                <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 border border-gray-800 p-4 rounded hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
                >
                     <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <MessageSquare size={40} className="text-purple-500" />
                     </div>
                    
                    <h3 className="text-white font-bold text-lg font-mono mb-1 relative z-10">{lang.name}</h3>
                    <p className="text-purple-400 text-xs font-mono mb-3 relative z-10">{lang.level}</p>
                    
                    {/* Simple bar for language */}
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden relative z-10">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lang.score}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Decorative footer for section */}
        <div className="mt-16 flex justify-between text-[10px] text-gray-600 font-mono border-t border-gray-900 pt-4">
            <span>DIAGNOSTIC COMPLETE</span>
            <span>CORE_PERFORMANCE: OPTIMAL</span>
        </div>

      </div>
    </section>
  );
};

export default Skills;