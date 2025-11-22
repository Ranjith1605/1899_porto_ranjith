import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SpaceAudio: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true);
    const audioContextRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const nodesRef = useRef<AudioNode[]>([]);

    const initAudio = () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const now = ctx.currentTime;

        // --- LAYER 1: THE DEEP VOID (Constant Bass Drone) ---
        // No LFOs on volume here, just pure constant depth to prevent silence
        const bassFreqs = [32.70, 65.41]; // C1, C2
        bassFreqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = freq;

            // Lowpass filter to make it a deep rumble
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 100;

            gain.gain.value = 0.15; // Constant volume

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(masterGain);
            osc.start(now);
            nodesRef.current.push(osc, gain, filter);
        });

        // --- LAYER 2: THE ETERNAL CHORD (Mid Range Pad) ---
        // C Minor 9: C3, Eb3, G3, Bb3, D4
        const padFreqs = [130.81, 155.56, 196.00, 233.08, 293.66];
        padFreqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;

            // Slight detune for "Ensemble" feel
            osc.detune.value = (Math.random() * 12) - 6;

            // Very slow LFO for movement, but offset so it never hits 0
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 0.05 + (Math.random() * 0.02);

            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 0.05; // Modulate by +/- 0.05

            gain.gain.value = 0.1; // Base volume 0.1

            lfo.connect(lfoGain);
            lfoGain.connect(gain.gain); // 0.1 +/- 0.05 = 0.05 to 0.15 range (Never silent)
            lfo.start(now);

            osc.connect(gain);
            gain.connect(masterGain);
            osc.start(now);
            nodesRef.current.push(osc, gain, lfo, lfoGain);
        });

        // --- LAYER 3: STARDUST (High Sparkles) ---
        // Random high notes drifting
        const sparkleGain = ctx.createGain();
        sparkleGain.gain.value = 0.02;
        sparkleGain.connect(masterGain);

        // Create a delay line for space echo
        const delay = ctx.createDelay();
        delay.delayTime.value = 0.5;
        const feedback = ctx.createGain();
        feedback.gain.value = 0.4;
        delay.connect(feedback);
        feedback.connect(delay);
        delay.connect(sparkleGain);
        sparkleGain.connect(delay); // Feedback loop

        // Function to trigger random high blips
        const triggerSparkle = () => {
            if (!audioContextRef.current || audioContextRef.current.state === 'suspended') return;

            const osc = ctx.createOscillator();
            const env = ctx.createGain();

            // Pentatonic scale notes high up
            const notes = [523.25, 622.25, 783.99, 932.33, 1046.50]; // C5, Eb5, G5, Bb5, C6
            osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
            osc.type = 'sine';

            env.gain.setValueAtTime(0, ctx.currentTime);
            env.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
            env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

            osc.connect(env);
            env.connect(sparkleGain);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 2);

            setTimeout(triggerSparkle, 2000 + Math.random() * 3000);
        };

        triggerSparkle();
    };

    const toggleAudio = () => {
        if (isMuted) {
            if (!audioContextRef.current) {
                initAudio();
            }
            audioContextRef.current?.resume();

            if (masterGainRef.current) {
                masterGainRef.current.gain.setTargetAtTime(0.5, audioContextRef.current!.currentTime, 2);
            }

            setIsMuted(false);
        } else {
            if (masterGainRef.current && audioContextRef.current) {
                masterGainRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.5);
                setTimeout(() => {
                    audioContextRef.current?.suspend();
                }, 500);
            } else {
                audioContextRef.current?.suspend();
            }
            setIsMuted(true);
        }
    };

    useEffect(() => {
        return () => {
            nodesRef.current.forEach(node => {
                if (node instanceof OscillatorNode) node.stop();
                node.disconnect();
            });
            audioContextRef.current?.close();
        };
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <button
                onClick={toggleAudio}
                className={`p - 3 rounded - full border transition - all duration - 300 ${isMuted
                    ? 'bg-black/50 border-gray-700 text-gray-500 hover:text-white hover:border-white'
                    : 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)] animate-pulse-slow'
                    } `}
                title={isMuted ? "Initialize Audio Systems" : "Mute Audio Systems"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
};

export default SpaceAudio;
