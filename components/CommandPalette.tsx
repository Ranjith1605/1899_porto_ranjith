import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../constants';
import { EVENTS, emit, useSettings, warpTo } from '../context/Settings';
import { sfx } from '../services/sfx';

interface Item {
  id: string;
  group: 'Navigate' | 'Systems' | 'Contact';
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

const CommandPalette: React.FC = () => {
  const { settings, set } = useSettings();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

  const items = useMemo<Item[]>(() => [
    ...NAV_ITEMS.map((n, i) => ({
      id: `nav-${n.id}`, group: 'Navigate' as const, label: n.label, hint: `Section ${i + 1}`,
      run: () => warpTo(n.id),
    })),
    { id: 'cur-reticle', group: 'Systems', label: 'Cursor: Reticle', hint: settings.cursor === 'reticle' ? 'active' : undefined, keywords: 'pointer crosshair', run: () => set('cursor', 'reticle') },
    { id: 'cur-plasma', group: 'Systems', label: 'Cursor: Plasma', hint: settings.cursor === 'plasma' ? 'active' : undefined, keywords: 'pointer glow trail', run: () => set('cursor', 'plasma') },
    { id: 'cur-minimal', group: 'Systems', label: 'Cursor: Minimal', hint: settings.cursor === 'minimal' ? 'active' : undefined, keywords: 'pointer simple', run: () => set('cursor', 'minimal') },
    { id: 'cur-system', group: 'Systems', label: 'Cursor: System default', hint: settings.cursor === 'system' ? 'active' : undefined, keywords: 'pointer normal off', run: () => set('cursor', 'system') },
    { id: 'star-warp', group: 'Systems', label: 'Starfield: Warp speed', keywords: 'stars fast', run: () => set('starfield', 'warp') },
    { id: 'star-cruise', group: 'Systems', label: 'Starfield: Cruise', keywords: 'stars normal', run: () => set('starfield', 'cruise') },
    { id: 'star-still', group: 'Systems', label: 'Starfield: Still', keywords: 'stars stop static', run: () => set('starfield', 'still') },
    { id: 'ships', group: 'Systems', label: `${settings.ships ? 'Hide' : 'Show'} spaceship armada`, keywords: 'ships fleet', run: () => set('ships', !settings.ships) },
    { id: 'scan', group: 'Systems', label: `${settings.scanlines ? 'Disable' : 'Enable'} CRT scanlines`, keywords: 'retro monitor', run: () => set('scanlines', !settings.scanlines) },
    { id: 'sfx', group: 'Systems', label: `${settings.sfx ? 'Mute' : 'Enable'} interface sounds`, keywords: 'audio sound blips', run: () => { sfx.unlock(); set('sfx', !settings.sfx); } },
    { id: 'motion', group: 'Systems', label: `${settings.reducedMotion ? 'Restore' : 'Reduce'} motion`, keywords: 'animation accessibility calm', run: () => set('reducedMotion', !settings.reducedMotion) },
    { id: 'panel', group: 'Systems', label: 'Open ship systems panel', keywords: 'settings preferences', run: () => emit(EVENTS.openSettings) },
    { id: 'chat', group: 'Contact', label: 'Open CipherBot chat', keywords: 'book call appointment', run: () => emit(EVENTS.openComms) },
    { id: 'mail', group: 'Contact', label: `Email ${PROFILE.email}`, keywords: 'mail write', run: () => { window.location.href = `mailto:${PROFILE.email}`; } },
    { id: 'tel', group: 'Contact', label: `Call ${PROFILE.phone}`, keywords: 'phone', run: () => { window.location.href = 'tel:+4915510174187'; } },
    { id: 'li', group: 'Contact', label: 'LinkedIn profile', run: () => openExternal(PROFILE.linkedin) },
    { id: 'gh', group: 'Contact', label: 'GitHub', keywords: 'code repositories', run: () => openExternal(PROFILE.github) },
    { id: 'cp', group: 'Contact', label: 'CipherPolice website', keywords: 'security project', run: () => openExternal(PROFILE.cipherpolice) },
    { id: 'lt', group: 'Contact', label: 'Linktree', run: () => openExternal(PROFILE.linktree) },
  ], [settings, set]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(i => `${i.label} ${i.group} ${i.keywords || ''}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === '/' && !open && !isTyping(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(EVENTS.openPalette, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(EVENTS.openPalette, onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      if (settings.sfx) sfx.open();
      // Focus after the enter animation has mounted the input.
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const execute = (item: Item | undefined) => {
    if (!item) return;
    if (settings.sfx) sfx.click();
    setOpen(false);
    // Let the dialog close (and focus return) before scrolling or opening panels.
    setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => (a + 1) % Math.max(filtered.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => (a - 1 + filtered.length) % Math.max(filtered.length, 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); execute(filtered[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'Tab') { e.preventDefault(); } // keep focus inside the dialog
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command deck"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-xl rounded-md border border-neon-cyan/40 bg-[#03060c]/95 shadow-[0_0_60px_rgba(0,243,255,0.15)] overflow-hidden"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 px-4 border-b border-white/10">
              <Search size={16} className="text-neon-cyan shrink-0" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Jump to a section, change a setting, get in touch…"
                className="flex-1 bg-transparent py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none font-mono"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                aria-autocomplete="list"
              />
              <kbd className="hidden sm:inline font-mono text-[10px] text-gray-500 border border-white/15 rounded-sm px-1.5 py-0.5">ESC</kbd>
            </div>

            <ul ref={listRef} id="command-list" role="listbox" className="max-h-[min(60vh,26rem)] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-gray-500">No matching command. Try "projects", "cursor" or "email".</li>
              )}
              {filtered.map((item, i) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                const isActive = i === active;
                return (
                  <React.Fragment key={item.id}>
                    {header && (
                      <li role="presentation" className="px-4 pt-3 pb-1 font-mono text-[10px] tracking-[3px] text-gray-500 uppercase">{header}</li>
                    )}
                    <li
                      id={`cmd-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={i}
                      data-cursor="RUN"
                      onMouseMove={() => { if (!isActive) setActive(i); }}
                      onClick={() => execute(item)}
                      className={`mx-2 px-3 py-2 rounded-sm flex items-center justify-between gap-3 text-sm ${isActive ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-gray-300'}`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className={`font-mono text-xs ${isActive ? 'opacity-100' : 'opacity-0'}`} aria-hidden>›</span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      {item.hint && <span className="font-mono text-[10px] text-gray-500 shrink-0">{item.hint}</span>}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="px-4 py-2 border-t border-white/10 flex items-center gap-4 font-mono text-[10px] text-gray-500">
              <span>↑↓ select</span><span>↵ run</span><span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
