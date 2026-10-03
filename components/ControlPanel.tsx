import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Crosshair, MousePointer, MousePointer2, RotateCcw, Settings2, Sparkles, X } from 'lucide-react';
import SpaceAudio from './SpaceAudio';
import { CursorStyle, EVENTS, StarfieldMode, emit, useMediaQuery, useSettings } from '../context/Settings';
import { sfx } from '../services/sfx';

const CURSORS: { id: CursorStyle; label: string; icon: React.ReactNode }[] = [
  { id: 'reticle', label: 'Reticle', icon: <Crosshair size={16} /> },
  { id: 'plasma', label: 'Plasma', icon: <Sparkles size={16} /> },
  { id: 'minimal', label: 'Minimal', icon: <MousePointer2 size={16} /> },
  { id: 'system', label: 'System', icon: <MousePointer size={16} /> },
];

const STARFIELD: { id: StarfieldMode; label: string }[] = [
  { id: 'warp', label: 'Warp' },
  { id: 'cruise', label: 'Cruise' },
  { id: 'still', label: 'Still' },
];

const Switch: React.FC<{ label: string; hint: string; checked: boolean; onChange: (v: boolean) => void }> = ({ label, hint, checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between gap-3 py-2 text-left group"
  >
    <span>
      <span className="block text-sm text-gray-200 group-hover:text-white">{label}</span>
      <span className="block font-mono text-[10px] text-gray-500">{hint}</span>
    </span>
    <span
      className={`relative shrink-0 w-10 h-5 rounded-full border transition-colors ${checked ? 'bg-neon-cyan/25 border-neon-cyan' : 'bg-white/5 border-white/20'}`}
      aria-hidden
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all ${checked ? 'left-[22px] bg-neon-cyan shadow-[0_0_8px_#00f3ff]' : 'left-[3px] bg-gray-500'}`}
      />
    </span>
  </button>
);

const ControlPanel: React.FC = () => {
  const { settings, set, reset } = useSettings();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENTS.openSettings, onOpen);
    return () => window.removeEventListener(EVENTS.openSettings, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const toggle = <K extends 'ships' | 'scanlines' | 'sfx' | 'reducedMotion'>(key: K) => (v: boolean) => {
    if (key === 'sfx' && v) sfx.unlock();
    set(key, v);
    if (settings.sfx || (key === 'sfx' && v)) sfx.toggle(v);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <SpaceAudio />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="ship-systems"
        aria-label="Ship systems: customise cursor, starfield and effects"
        data-cursor="SYSTEMS"
        className={`p-3 rounded-full border transition-all duration-300 ${open
          ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.35)]'
          : 'bg-black/60 border-gray-700 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan'}`}
      >
        <Settings2 size={20} className={open ? 'rotate-90 transition-transform' : 'transition-transform'} />
      </button>
      <button
        type="button"
        onClick={() => emit(EVENTS.openPalette)}
        aria-label="Open command deck"
        data-cursor="COMMAND"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full border bg-black/60 border-gray-700 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan transition-colors font-mono text-[11px] tracking-widest"
      >
        <Command size={14} /> K
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="ship-systems"
            role="dialog"
            aria-label="Ship systems"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-0 mb-3 w-[min(21rem,calc(100vw-3rem))] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-md border border-neon-cyan/40 bg-[#03060c]/95 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(0,243,255,0.12)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs tracking-[3px] text-neon-cyan">⚙ SHIP SYSTEMS</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close ship systems" className="text-gray-500 hover:text-white p-1">
                <X size={16} />
              </button>
            </div>

            <fieldset className="mb-4">
              <legend className="font-mono text-[10px] tracking-[2px] text-gray-500 mb-2">CURSOR STYLE</legend>
              <div className="grid grid-cols-4 gap-1.5" role="radiogroup" aria-label="Cursor style">
                {CURSORS.map(c => {
                  const active = settings.cursor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => { set('cursor', c.id); if (settings.sfx) sfx.click(); }}
                      className={`flex flex-col items-center gap-1 py-2 rounded-sm border text-[10px] font-mono transition-colors ${active
                        ? 'border-neon-amber bg-neon-amber/10 text-neon-amber'
                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                    >
                      {c.icon}
                      {c.label}
                    </button>
                  );
                })}
              </div>
              {!finePointer && (
                <p className="mt-2 font-mono text-[10px] text-gray-500">Custom cursors appear with a mouse or trackpad.</p>
              )}
            </fieldset>

            <fieldset className="mb-3">
              <legend className="font-mono text-[10px] tracking-[2px] text-gray-500 mb-2">STARFIELD</legend>
              <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Starfield speed">
                {STARFIELD.map(s => {
                  const active = settings.starfield === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => { set('starfield', s.id); if (settings.sfx) sfx.click(); }}
                      className={`py-1.5 rounded-sm border text-xs font-mono transition-colors ${active
                        ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="divide-y divide-white/5">
              <Switch label="Spaceship armada" hint="Ships drifting behind the page" checked={settings.ships} onChange={toggle('ships')} />
              <Switch label="CRT scanlines" hint="Retro monitor overlay" checked={settings.scanlines} onChange={toggle('scanlines')} />
              <Switch label="Interface sounds" hint="Soft blips on hover and click" checked={settings.sfx} onChange={toggle('sfx')} />
              <Switch label="Reduce motion" hint="Calms animations and the starfield" checked={settings.reducedMotion} onChange={toggle('reducedMotion')} />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] text-gray-500">
                <kbd className="px-1 border border-white/20 rounded-sm">Ctrl</kbd>/<kbd className="px-1 border border-white/20 rounded-sm">⌘</kbd>+<kbd className="px-1 border border-white/20 rounded-sm">K</kbd> command deck
              </span>
              <button type="button" onClick={reset} className="flex items-center gap-1 font-mono text-[10px] text-gray-400 hover:text-neon-amber">
                <RotateCcw size={12} /> RESET
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ControlPanel;
