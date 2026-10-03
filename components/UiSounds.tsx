import { useEffect } from 'react';
import { useSettings } from '../context/Settings';
import { sfx } from '../services/sfx';

const INTERACTIVE = 'a, button, [role="button"], [role="switch"], [role="option"], [data-cursor]';

/** Global hover/click blips, active only while "Interface sounds" is on. */
const UiSounds: React.FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings.sfx) return;
    let lastEl: Element | null = null;
    let lastAt = 0;
    const onOver = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      const now = performance.now();
      // One blip per element entered, and never faster than every 70 ms.
      if (el && el !== lastEl && now - lastAt > 70) { sfx.hover(); lastAt = now; }
      lastEl = el;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) sfx.click();
    };
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    return () => {
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('click', onClick);
    };
  }, [settings.sfx]);

  return null;
};

export default UiSounds;
