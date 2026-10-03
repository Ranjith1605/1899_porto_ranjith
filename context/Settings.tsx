import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type CursorStyle = 'reticle' | 'plasma' | 'minimal' | 'system';
export type StarfieldMode = 'warp' | 'cruise' | 'still';

export interface Settings {
  cursor: CursorStyle;
  starfield: StarfieldMode;
  ships: boolean;
  scanlines: boolean;
  sfx: boolean;
  reducedMotion: boolean;
}

const STORAGE_KEY = 'rr1899.settings.v1';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const defaults = (): Settings => ({
  cursor: 'reticle',
  starfield: 'cruise',
  ships: true,
  scanlines: false,
  sfx: false,
  // Respect the OS setting on first visit; the visitor can still override it.
  reducedMotion: !!prefersReducedMotion(),
});

// Storage can throw (private mode, blocked site data), so every access is guarded
// and the site works without it — settings just won't persist.
const CURSORS: CursorStyle[] = ['reticle', 'plasma', 'minimal', 'system'];
const STARFIELDS: StarfieldMode[] = ['warp', 'cruise', 'still'];

const load = (): Settings => {
  const base = defaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw) ?? {};
    // Validate field by field: an unknown cursor name would hide the OS cursor
    // and draw nothing, leaving the visitor with no pointer at all.
    const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
    return {
      cursor: CURSORS.includes(saved.cursor) ? saved.cursor : base.cursor,
      starfield: STARFIELDS.includes(saved.starfield) ? saved.starfield : base.starfield,
      ships: bool(saved.ships, base.ships),
      scanlines: bool(saved.scanlines, base.scanlines),
      sfx: bool(saved.sfx, base.sfx),
      reducedMotion: bool(saved.reducedMotion, base.reducedMotion),
    };
  } catch {
    return base;
  }
};

interface Ctx {
  settings: Settings;
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
}

const SettingsContext = createContext<Ctx | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', settings.reducedMotion);
  }, [settings]);

  const set = useCallback<Ctx['set']>((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);
  const reset = useCallback(() => setSettings(defaults()), []);

  const value = useMemo(() => ({ settings, set, reset }), [settings, set, reset]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
};

// Cross-component signals. Plain DOM events keep the floating widgets (chat,
// palette, starfield) decoupled — none of them needs to know who triggers it.
export const EVENTS = {
  warp: 'rr:warp',
  openComms: 'rr:open-comms',
  openPalette: 'rr:open-palette',
  openSettings: 'rr:open-settings',
} as const;

export const emit = (name: string) => window.dispatchEvent(new CustomEvent(name));

/** Smooth-scroll to a section and fire the starfield's warp-jump. */
export const warpTo = (id: string) => {
  emit(EVENTS.warp);
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};
