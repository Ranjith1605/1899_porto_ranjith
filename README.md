# 1899 Portfolio - Ranjith

A futuristic, space-themed portfolio website built with **React**, **TypeScript**, and **Vite**.

## Features

*   **Immersive Space Audio**: A custom-built, continuous procedural audio engine (Hans Zimmer style) using the Web Audio API.
*   **Dynamic Visuals**: Parallax starfield with a spaceship armada, mouse parallax and a "warp jump" when you navigate.
*   **Ship Systems panel** (⚙ bottom-left): cursor style, starfield speed (Warp / Cruise / Still), spaceship armada, CRT scanlines, interface sounds and reduce-motion. Choices are remembered per browser.
*   **Custom cursors**: Reticle, Plasma (particle trail), Minimal or System. They lock onto links and buttons with context labels (`OPEN ↗`, `MAIL`, `CALL`, `ENGAGE`). Touch devices keep their native behaviour.
*   **Command deck**: `Ctrl/⌘ + K` or `/` to jump to any section, change settings or get in touch, all from the keyboard.
*   **AI Chatbot**: A local, rule-based chatbot for appointment booking and contact info.
*   **Responsive & accessible**: mobile menu, scroll progress, section rail, skill filters, 3D tilt cards, focus rings, skip link, and the OS reduced-motion setting is respected.

## Tech Stack

*   React 19
*   TypeScript
*   Tailwind CSS 3 (compiled at build time)
*   Framer Motion
*   Vite
*   Lucide React (Icons)

## Getting Started

1.  Install dependencies: `npm install`
2.  Run development server: `npm run dev`
3.  Production build: `npm run build`
