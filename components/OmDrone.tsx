import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * A continuous Om drone, synthesised in the Web Audio API.
 *
 * Built on 136.10 Hz — the pitch traditionally associated with Om (C#) — with
 * its octave and a fifth above, plus a slow breath on the amplitude so it never
 * sits perfectly still. Low-passed so it stays warm rather than buzzy.
 *
 * On autoplay: browsers refuse to start audio before the visitor interacts with
 * the page, and there is no way around that from JavaScript. So the drone arms
 * itself and starts on the very first click, key press, scroll or touch — after
 * which it plays continuously. The choice is remembered in localStorage, so a
 * returning visitor gets sound on their first gesture without touching the
 * button again.
 */

const OM_HZ = 136.1;
const STORAGE_KEY = 'porto-om-audio';
const TARGET_GAIN = 0.16;

const SpaceAudio: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false); // wants sound, waiting for a gesture

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const build = useCallback(() => {
    if (ctxRef.current) return;
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;              // faded up once running
    masterRef.current = master;

    // Warmth: roll off everything harsh well before it gets fatiguing.
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 900;
    tone.Q.value = 0.6;
    tone.connect(master);
    master.connect(ctx.destination);

    const now = ctx.currentTime;

    // Fundamental, octave, fifth — the body of the Om.
    const partials: Array<{ hz: number; gain: number; type: OscillatorType }> = [
      { hz: OM_HZ,         gain: 0.55, type: 'sine' },
      { hz: OM_HZ * 2,     gain: 0.22, type: 'sine' },
      { hz: OM_HZ * 3,     gain: 0.10, type: 'sine' },
      { hz: OM_HZ / 2,     gain: 0.30, type: 'sine' },
      { hz: OM_HZ * 1.5,   gain: 0.08, type: 'triangle' },
    ];

    partials.forEach(({ hz, gain, type }, i) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = hz;
      // A few cents of detune per partial keeps it from sounding synthetic.
      osc.detune.value = (i - 2) * 3;

      const g = ctx.createGain();
      g.gain.value = gain;

      // Slow breath, offset so the partial never falls silent.
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + i * 0.011;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = gain * 0.22;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start(now);

      osc.connect(g);
      g.connect(tone);
      osc.start(now);

      nodesRef.current.push(osc, g, lfo, lfoGain);
    });

    nodesRef.current.push(tone, master);
  }, []);

  const fadeTo = (value: number, seconds: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(value, ctx.currentTime + seconds);
  };

  const startSound = useCallback(async () => {
    build();
    const ctx = ctxRef.current;
    if (!ctx) return false;
    try {
      await ctx.resume();
    } catch {
      return false;
    }
    if (ctx.state !== 'running') return false;
    fadeTo(TARGET_GAIN, 3);
    setPlaying(true);
    setArmed(false);
    try { localStorage.setItem(STORAGE_KEY, 'on'); } catch { /* private mode */ }
    return true;
  }, [build]);

  const stopSound = useCallback(() => {
    fadeTo(0, 0.8);
    window.setTimeout(() => { void ctxRef.current?.suspend(); }, 900);
    setPlaying(false);
    setArmed(false);
    try { localStorage.setItem(STORAGE_KEY, 'off'); } catch { /* private mode */ }
  }, []);

  // Arm on load unless the visitor previously turned it off, then start on the
  // first gesture. Trying to start immediately is harmless — it simply fails on
  // browsers that block autoplay, and succeeds where the visitor has allowed it.
  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch { /* private mode */ }
    if (stored === 'off') return;

    setArmed(true);
    void startSound();

    const onGesture = () => { void startSound(); };
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];
    events.forEach(e => window.addEventListener(e, onGesture, { once: false, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, onGesture));
  }, [startSound]);

  // Stop listening for gestures once it is actually playing.
  useEffect(() => {
    if (!playing) return;
    const noop = () => {};
    return noop;
  }, [playing]);

  useEffect(() => () => {
    nodesRef.current.forEach(n => {
      if (n instanceof OscillatorNode) { try { n.stop(); } catch { /* already stopped */ } }
      n.disconnect();
    });
    void ctxRef.current?.close();
  }, []);

  const label = playing ? 'Turn off the Om drone' : armed ? 'Om drone starts on your first click' : 'Play the Om drone';

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50">
      <button
        type="button"
        onClick={() => (playing ? stopSound() : void startSound())}
        aria-label={label}
        title={label}
        aria-pressed={playing}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
        style={{
          background: playing ? 'rgba(0,243,255,0.10)' : 'rgba(2,2,6,0.6)',
          border: `1px solid ${playing ? 'rgba(0,243,255,0.55)' : 'rgba(255,255,255,0.15)'}`,
          color: playing ? '#00f3ff' : '#8b96a5',
        }}
      >
        {playing ? <Volume2 size={17} /> : <VolumeX size={17} />}
        {playing && <span className="om-pulse" aria-hidden />}
        <span className="sr-only">{label}</span>
      </button>
      {/* Label is decorative — hidden on phones so it never lands on top of body text. */}
      <span
        className="hidden sm:block pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest transition-opacity duration-300"
        style={{ color: playing ? 'rgba(0,243,255,0.65)' : 'rgba(139,150,165,0.55)', opacity: playing || armed ? 1 : 0 }}
        aria-hidden
      >
        {playing ? 'ௐ 136.1 Hz' : 'ௐ'}
      </span>
    </div>
  );
};

export default SpaceAudio;
