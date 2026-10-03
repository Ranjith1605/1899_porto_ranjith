// Tiny synthesized UI sounds. No audio files: a few oscillator blips are enough
// for a HUD feel and add nothing to the download.
let ctx: AudioContext | null = null;

const audio = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  // Browsers start contexts suspended until a user gesture; resume is a no-op otherwise.
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

const blip = (freq: number, dur: number, type: OscillatorType, vol: number, delay = 0) => {
  const ac = audio();
  if (!ac || ac.state !== 'running') return;
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
};

export const sfx = {
  /** Call from a click handler so the AudioContext is allowed to start. */
  unlock: () => { audio(); },
  hover: () => blip(1400, 0.035, 'sine', 0.015),
  click: () => { blip(620, 0.05, 'square', 0.02); blip(940, 0.05, 'square', 0.015, 0.04); },
  toggle: (on: boolean) => blip(on ? 880 : 440, 0.09, 'triangle', 0.035),
  open: () => { blip(500, 0.08, 'sine', 0.03); blip(750, 0.08, 'sine', 0.025, 0.06); blip(1125, 0.1, 'sine', 0.02, 0.12); },
};
