import React from 'react';
import { PROFILE } from '../constants';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">

            <div className="max-w-6xl w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-mono"
                >
                    <div className="mb-4 flex items-center gap-2 text-matrix-green text-xs tracking-[0.2em]">
                        <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                        INCOMING TRANSMISSION
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        CAPTAIN <br />
                        <span className="text-neon-cyan hologram-text">{PROFILE.name.toUpperCase()}</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-2 font-sans border-l-2 border-neon-cyan pl-4">
                        {PROFILE.role}
                    </p>

                    <p className="text-gray-500 mb-8 max-w-lg leading-relaxed text-sm">
                        "{PROFILE.bio}"
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <div className="border border-gray-700 bg-black/50 p-3 rounded text-xs text-gray-300">
                            LOCATION: <span className="text-white">{PROFILE.location}</span>
                        </div>
                        <div className="border border-gray-700 bg-black/50 p-3 rounded text-xs text-gray-300">
                            STATUS: <span className="text-matrix-green">{PROFILE.availability.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <a
                            href={PROFILE.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan px-6 py-3 hover:bg-neon-cyan hover:text-black transition-all duration-300 font-bold tracking-wider text-sm clip-path-polygon"
                        >
                            ACCESS GITHUB_DATABASE
                        </a>
                    </div>
                </motion.div>

                {/* Visual Interface / Hologram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative flex justify-center"
                >
                    {/* Holographic Frame */}
                    <div className="relative w-80 h-80 md:w-96 md:h-96 border border-neon-cyan/30 rounded-full flex items-center justify-center bg-neon-cyan/5 backdrop-blur-sm overflow-hidden group">

                        {/* Spinner Rings */}
                        <div className="absolute inset-0 rounded-full border-t border-neon-cyan animate-spin duration-[10s]"></div>
                        <div className="absolute inset-2 rounded-full border-b border-matrix-green animate-spin duration-[15s] opacity-50"></div>

                        {/* Avatar Image */}
                        <img
                            src="/profile-pic.png"
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-50 pointer-events-none"></div>
                    </div>

                    {/* Decorators */}
                    <div className="absolute -bottom-10 font-mono text-[10px] text-neon-cyan/50">
                        ID: CP-770 // CLASS: ENGINEER
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;