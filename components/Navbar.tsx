import React from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-neon-cyan/30 bg-glass-panel backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-neon-cyan bg-neon-cyan/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-neon-cyan/20 animate-pulse"></div>
                <span className="font-mono font-bold text-neon-cyan text-xs">RR</span>
            </div>
            <div className="flex flex-col">
                <h1 className="font-mono font-bold text-white tracking-wider leading-none">
                    RR
                </h1>
                <span className="text-[10px] text-matrix-green font-mono">SYSTEM_ONLINE</span>
            </div>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
                <a 
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                    </span>
                    <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300"></span>
                    </span>
                </a>
            ))}
        </div>

        {/* Mobile Menu Trigger (Simple) */}
        <div className="md:hidden text-neon-cyan font-mono text-xs">
            [MENU]
        </div>
      </div>
      
      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan"></div>
    </nav>
  );
};

export default Navbar;