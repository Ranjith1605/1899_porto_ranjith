import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../constants';

/**
 * The section whose top has passed 35% of the viewport. Uses
 * getBoundingClientRect rather than offsetTop, which is relative to the nearest
 * positioned ancestor and silently breaks if a wrapper gains `position`.
 */
export const useActiveSection = () => {
  const [active, setActive] = useState(NAV_ITEMS[0].id);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      // At the very bottom the last (short) section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = NAV_ITEMS[NAV_ITEMS.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
};
