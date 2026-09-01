/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './constants.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-void': '#020206',
        'space-black': '#050510',
        'neon-cyan': '#00f3ff',
        'neon-amber': '#ffaa00',
        'hud-green': '#39FF14',
        'deep-purple': '#1a0a2e',
        glass: 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        flicker: 'flicker 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        scanline: 'scanline 6s linear infinite',
        glitch: 'glitch 3s infinite',
        blink: 'blink 1.2s step-end infinite',
        'hud-border': 'hud-border 2s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { textShadow: '2px 0 #00f3ff, -2px 0 #ffaa00' },
          '25%': { textShadow: '-2px 0 #00f3ff, 2px 0 #ffaa00' },
          '50%': { textShadow: '2px 2px #00f3ff, -2px -2px #ffaa00' },
          '75%': { textShadow: '0 0 8px #00f3ff, 0 0 16px #ffaa00' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'hud-border': {
          '0%': { borderColor: 'rgba(0,243,255,0.3)' },
          '100%': { borderColor: 'rgba(0,243,255,0.8)' },
        },
      },
    },
  },
  plugins: [],
};
