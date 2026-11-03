<template slug="mercer" name="Jules Mercer">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "lucide-react": "0.475.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(mercer)/layout.tsx">
<![CDATA[import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./mercer/mercer.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-jm-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-jm-geist-mono" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0A0D10", colorScheme: "dark" };

export default function MercerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="jm-body">
        <noscript><style>{`.jm-page *{animation:none!important;opacity:1!important}.jm-hero-actions,.jm-mobile-menu,.jm-desktop-nav button,.jm-scroll-cue,.jm-terminal-invite{display:none!important}.jm-project,.jm-terminal{pointer-events:none}.jm-knot-fallback{visibility:visible!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#0A0D10"/><path fill="#CCFF00" d="M9 16h8v24c0 8-5 12-13 12v-8c4 0 5-1 5-5V16Zm14 0h9l8 19 8-19h9v36h-8V31l-9 20-9-20v21h-8V16Z"/></svg>
]]>
    </file>
    <file path="src/app/(mercer)/mercer/mercer.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-jm-ink: #0a0d10;
  --color-jm-paper: #e8ecef;
  --color-jm-lime: #ccff00;
  --color-jm-cyan: #00e5ff;
  --ease-jm-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-jm-fast: 300ms;
  --duration-jm-base: 500ms;
  --duration-jm-enter: 800ms;
}

.jm-body { margin: 0; background: #0a0d10; color: #e8ecef; font-family: var(--font-jm-geist), sans-serif; -webkit-font-smoothing: antialiased; }
.jm-page { --jm-muted: color-mix(in srgb, #e8ecef 58%, #0a0d10); --jm-line: color-mix(in srgb, #e8ecef 17%, #0a0d10); min-height: 100svh; background: #0a0d10; overflow: clip; }
.jm-page *, .jm-page *::before, .jm-page *::after { box-sizing: border-box; }
.jm-page button, .jm-page a, .jm-page summary { -webkit-tap-highlight-color: transparent; }
.jm-page a { color: inherit; text-decoration: none; }
.jm-page button { font: inherit; cursor: pointer; }
.jm-page button, .jm-page summary { color: inherit; }
.jm-page button:disabled { cursor: default; opacity: 0.4; }
.jm-page :is(a, button, summary):focus-visible { outline: 2px solid #ccff00; outline-offset: 6px; }
.jm-page ::selection { background: #ccff00; color: #0a0d10; }
.jm-mono { font-family: var(--font-jm-geist-mono), monospace; }
.jm-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.jm-skip { position: fixed; top: 8px; left: 8px; z-index: 100; padding: 12px 16px; background: #ccff00; color: #0a0d10 !important; transform: translateY(-160%); }
.jm-skip:focus { transform: none; }

.jm-header { min-height: 72px; display: flex; align-items: center; gap: 24px; padding: 12px 32px; border-bottom: 1px solid var(--jm-line); position: relative; z-index: 5; }
.jm-brand { display: flex; align-items: center; gap: 16px; flex-shrink: 0; margin-right: auto; }
.jm-brand-mark { font-size: 40px; line-height: 1; color: #ccff00; font-weight: 700; letter-spacing: -0.085em; }
.jm-brand-name { font-size: 11px; letter-spacing: -0.04em; white-space: nowrap; }
.jm-desktop-nav { display: flex; align-items: center; gap: 14px; font-size: 13px; }
.jm-desktop-nav > span, .jm-mobile-menu nav > span { color: var(--jm-muted); }
.jm-desktop-nav button, .jm-mobile-menu button { border: 0; padding: 0; background: transparent; }
.jm-desktop-nav :is(a, button) { position: relative; padding-block: 8px; }
.jm-desktop-nav :is(a, button)::after { content: ""; position: absolute; height: 1px; background: #ccff00; inset: auto 0 2px; transform: scaleX(0); transform-origin: left; transition: transform var(--duration-jm-base) var(--ease-jm-out); }
.jm-availability { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; color: var(--jm-muted); font-size: 9px; margin-left: auto; }
.jm-availability i { width: 6px; height: 6px; border-radius: 50%; background: #ccff00; box-shadow: 0 0 8px #ccff0066; }
.jm-contact { display: flex; gap: 8px; align-items: center; border: 1px solid color-mix(in srgb, #e8ecef 60%, transparent); padding: 10px 14px; border-radius: 3px; font-size: 12px; white-space: nowrap; }
.jm-mobile-menu { display: none; }

.jm-hero { min-height: max(640px, calc(100svh - 184px)); position: relative; display: grid; grid-template-columns: 49% 51%; align-items: center; isolation: isolate; }
.jm-grid { position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image: linear-gradient(to right, color-mix(in srgb, #e8ecef 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, #e8ecef 7%, transparent) 1px, transparent 1px); background-size: 16.6667% 100%, 100% 50%; }
.jm-grid::before, .jm-grid::after { content: ""; position: absolute; top: 12px; bottom: 24px; width: 8px; background: repeating-linear-gradient(to bottom, var(--jm-line) 0 1px, transparent 1px 5px); }
.jm-grid::before { left: 12px; }
.jm-grid::after { right: 12px; }
.jm-coordinate { position: absolute; color: color-mix(in srgb, #e8ecef 28%, #0a0d10); font-size: 8px; }
.jm-coordinate:nth-child(1) { left: 28px; top: 12px; }
.jm-coordinate:nth-child(2) { left: 35.5%; top: 12px; }
.jm-coordinate:nth-child(3) { left: 50.5%; top: 12px; }
.jm-coordinate:nth-child(4) { right: 12%; top: 12px; }
.jm-coordinate:nth-child(5) { left: 28px; top: 51%; }
.jm-coordinate:nth-child(6) { right: 28px; top: 51%; }
.jm-coordinate:nth-child(7) { right: 28px; bottom: 24px; }
.jm-coordinate:nth-child(8) { left: 35.5%; bottom: 12px; }
.jm-crosshair { position: absolute; width: 12px; height: 12px; }
.jm-crosshair::before, .jm-crosshair::after, .jm-stage-reticle::before, .jm-stage-reticle::after { content: ""; position: absolute; background: var(--jm-line); }
.jm-crosshair::before, .jm-stage-reticle::before { width: 100%; height: 1px; top: 50%; }
.jm-crosshair::after, .jm-stage-reticle::after { height: 100%; width: 1px; left: 50%; }
.jm-crosshair:nth-last-child(1) { top: calc(50% - 6px); left: calc(50% - 6px); }
.jm-crosshair:nth-last-child(2) { top: calc(50% - 6px); left: calc(83.333% - 6px); }
.jm-hero-copy { padding: 48px 0 64px 56px; position: relative; z-index: 2; }
.jm-eyebrow { font-size: 10px; line-height: 1.6; color: var(--jm-muted); margin: 0 0 16px; white-space: nowrap; letter-spacing: -0.035em; }
.jm-headline { font-size: clamp(60px, 8.2vw, 128px); font-weight: 700; line-height: 0.94; letter-spacing: -0.075em; margin: 0 0 24px -5px; }
.jm-headline-line { display: block; overflow: clip; padding: 0 0 0.07em; margin-bottom: -0.07em; white-space: nowrap; }
.jm-headline-line > span { display: block; }
.jm-headline-accent { color: #ccff00; }
.jm-intro { max-width: 490px; font-size: clamp(18px, 1.65vw, 24px); line-height: 1.4; font-weight: 400; letter-spacing: -0.035em; margin: 24px 0 32px; text-wrap: pretty; }
.jm-hero-actions { display: flex; align-items: center; gap: 12px; }
.jm-button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; gap: 12px; border-radius: 3px; padding: 12px 24px; font-size: 14px !important; font-weight: 600 !important; letter-spacing: -0.04em; border: 1px solid transparent; transition: transform var(--duration-jm-base) var(--ease-jm-out), opacity var(--duration-jm-fast) var(--ease-jm-out); }
.jm-button-primary { background: #ccff00; color: #0a0d10 !important; }
.jm-button-secondary { background: transparent; border-color: var(--jm-line); color: var(--jm-muted) !important; }
.jm-button svg, .jm-contact svg, .jm-project svg { transition: transform var(--duration-jm-base) var(--ease-jm-out); }
.jm-button:active, .jm-contact:active { transform: translateY(1px) scale(0.98); }

.jm-stage { margin: 0 0 0 -10%; width: 110%; height: 100%; min-height: 580px; position: relative; touch-action: pan-y pinch-zoom; }
.jm-canvas-host { position: absolute; inset: 0; overflow: hidden; user-select: none; cursor: grab; }
.jm-canvas-host:focus-visible { outline: 2px solid #00e5ff; outline-offset: -8px; }
.jm-canvas-host canvas { display: block; width: 100%; height: 100%; }
.jm-knot-fallback { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.jm-stage[data-state="running"] .jm-knot-fallback, .jm-stage[data-state="paused"] .jm-knot-fallback { visibility: hidden; }
.jm-stage:not([data-state="running"]):not([data-state="paused"]) .jm-canvas-host { visibility: hidden; }
.jm-stage-reticle { position: absolute; width: 16px; height: 16px; pointer-events: none; }
.jm-reticle-one { top: 14%; left: 13%; }
.jm-reticle-two { bottom: 12%; right: 10%; }
.jm-fps { position: absolute; top: 17%; left: 13%; display: flex; align-items: center; gap: 6px; font-size: 9px; color: #00e5ff; padding: 4px 6px; background: #0a0d10cc; border: 1px solid #00e5ff22; }
.jm-fps-bars { display: flex; align-items: flex-end; gap: 2px; height: 8px; }
.jm-fps-bars i { display: block; width: 2px; height: 3px; background: #ccff00; }
.jm-fps-bars i:nth-child(2) { height: 5px; }.jm-fps-bars i:nth-child(3) { height: 8px; }.jm-fps-bars i:nth-child(4) { height: 6px; background: #00e5ff; }
.jm-terminal { position: absolute; bottom: 8%; left: 4%; width: 174px; display: block; padding: 0; text-align: left; background: #0a0d10e6; border: 1px solid var(--jm-line); border-radius: 3px; box-shadow: 0 8px 32px #0a0d10; overflow: hidden; transform: rotate(-0.5deg); transition: transform var(--duration-jm-base) var(--ease-jm-out), border-color var(--duration-jm-fast) var(--ease-jm-out); }
.jm-terminal:focus-visible { outline-offset: 4px !important; }
.jm-terminal:active { transform: translateY(1px) rotate(0deg) scale(0.98); }
.jm-terminal-invite { color: #ccff00; }
.jm-terminal-bar { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--jm-line); padding: 5px 6px; color: var(--jm-muted); font-family: var(--font-jm-geist-mono), monospace; font-size: 6px; }
.jm-terminal-bar > span:first-child { display: flex; gap: 3px; }.jm-terminal-bar i { width: 4px; height: 4px; background: var(--jm-muted); border-radius: 50%; }
.jm-terminal-code { display: block; margin: 0; padding: 8px 6px; font-family: var(--font-jm-geist-mono), monospace; font-size: 5.5px; line-height: 1.65; white-space: pre; color: var(--jm-muted); }
.jm-code-line { display: block; }.jm-code-number { opacity: 0.35; margin-right: 7px; }.jm-code-accent { color: color-mix(in srgb, #ccff00 60%, #e8ecef); }
.jm-terminal-footer { display: flex; justify-content: space-between; padding: 4px 6px; border-top: 1px solid var(--jm-line); color: var(--jm-muted); font: 5px var(--font-jm-geist-mono), monospace; }
.jm-experiment-status { position: absolute; right: 6%; bottom: 20%; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; font-size: 8px; letter-spacing: -0.035em; }
.jm-experiment-label { padding: 5px 6px; background: #0a0d10e6; border: 1px solid var(--jm-line); }
.jm-system-status { max-width: 135px; padding: 5px 6px; background: #0a0d10e6; border: 1px solid var(--jm-line); font-size: 6px; line-height: 1.5; }
.jm-system-status i { display: inline-block; width: 3px; height: 3px; margin-right: 4px; border-radius: 50%; background: var(--jm-muted); }
.jm-system-status[data-online="true"] i { background: #ccff00; }
.jm-stage-controls { position: absolute; right: 32px; bottom: 12px; display: flex; align-items: center; gap: 12px; color: var(--jm-muted); font-size: 8px; }
.jm-stage-controls button { display: grid; place-items: center; min-width: 32px; min-height: 32px; border: 1px solid var(--jm-line); border-radius: 3px; background: #0a0d10; }

.jm-projects { min-height: 112px; border-top: 1px solid var(--jm-line); padding: 20px 40px 20px 56px; display: flex; gap: 32px; align-items: center; position: relative; }
.jm-project-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; flex: 1; min-width: 0; }
.jm-project { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: transparent; border: 0; padding: 0; text-align: left; min-width: 0; }
.jm-project-copy { flex-shrink: 0; display: flex; flex-direction: column; gap: 3px; }.jm-project-number { font-size: 18px; letter-spacing: -0.07em; color: var(--jm-muted); }.jm-project-name { font-size: 16px; letter-spacing: -0.06em; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.jm-project-thumb { width: 132px; height: 64px; min-width: 64px; border: 1px solid var(--jm-line); border-radius: 2px; overflow: hidden; color: var(--jm-muted); background: #0a0d10; }
.jm-project-preview { width: 100%; height: 100%; display: block; }
.jm-scroll-cue { display: flex; align-items: center; gap: 8px; border: 0; background: transparent; color: var(--jm-muted) !important; font-size: 11px !important; white-space: nowrap; padding: 8px 0; }
.jm-project:active .jm-project-thumb { transform: scale(0.98); }

@media (hover: none) and (pointer: coarse) { .jm-pan-hint { display: none; } }

.jm-dialog { width: min(680px, calc(100% - 32px)); max-height: calc(100svh - 64px); background: #0a0d10; color: #e8ecef; border: 1px solid var(--jm-line); border-radius: 4px; padding: 40px; margin: auto; overflow: auto; }
.jm-dialog::backdrop { background: #0a0d10d9; backdrop-filter: blur(8px); }
.jm-dialog-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--jm-muted); font-size: 10px; margin-bottom: 32px; }
.jm-dialog-close { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid var(--jm-line); border-radius: 3px; background: transparent; }
.jm-dialog h2 { font-size: clamp(30px, 5vw, 48px); line-height: 1.05; letter-spacing: -0.065em; margin: 0 0 24px; }.jm-dialog p { font-size: 18px; line-height: 1.6; color: var(--jm-muted); text-wrap: pretty; }
.jm-dialog-visual { aspect-ratio: 2; border: 1px solid var(--jm-line); border-radius: 3px; margin: 24px 0; overflow: hidden; color: #e8ecef; }
.jm-dialog-stack { font-size: 10px !important; margin-top: 24px; color: #ccff00 !important; }
.jm-dialog-projects { display: grid; gap: 12px; }.jm-dialog-projects button { display: flex; align-items: center; justify-content: space-between; padding: 16px; text-align: left; border: 1px solid var(--jm-line); border-radius: 3px; background: transparent; font-size: 18px; }.jm-dialog-projects small { display: block; color: var(--jm-muted); font: 9px var(--font-jm-geist-mono), monospace; margin-top: 8px; }

.jm-dialog-experiment { width: min(900px, calc(100% - 32px)); padding: 0; scrollbar-color: #00e5ff #0a0d10; scrollbar-width: thin; }
.jm-dialog-experiment > .jm-dialog-head { position: sticky; top: 0; z-index: 2; padding: 16px 32px; margin: 0; border-bottom: 1px solid var(--jm-line); background: #0a0d10; color: #00e5ff; }
.jm-dialog-experiment .jm-dialog-close { display: flex; align-items: center; justify-content: center; gap: 8px; width: auto; padding: 0 12px; color: #e8ecef; font-size: 9px; }
.jm-experiment-detail { padding: 32px; }
.jm-experiment-intro { display: grid; grid-template-columns: 1.1fr 1fr; align-items: end; gap: 32px; }
.jm-experiment-intro h2 { margin: 0; font-size: clamp(36px, 4vw, 48px); letter-spacing: -0.04em; font-weight: 600; line-height: 1.05; }
.jm-experiment-intro h2 span { color: #ccff00; }
.jm-experiment-intro > p { margin: 0; font-size: 16px; line-height: 1.65; max-width: 38ch; }
.jm-experiment-body { display: grid; grid-template-columns: 0.95fr 1.05fr; align-items: start; gap: 32px; margin-top: 32px; }
.jm-experiment-study { margin: 0; min-width: 0; }
.jm-experiment-preview { aspect-ratio: 1; position: relative; background-image: linear-gradient(to right, #e8ecef0d 1px, transparent 1px), linear-gradient(to bottom, #e8ecef0d 1px, transparent 1px); background-size: 25% 25%; }
.jm-study-mark { position: absolute; bottom: 12px; left: 12px; color: var(--jm-muted); font-size: 8px; }
.jm-experiment-specs { display: grid; gap: 12px; margin: 24px 0 0; font-size: 9px; line-height: 1.5; }
.jm-experiment-specs > div { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
.jm-experiment-specs dt { color: var(--jm-muted); }.jm-experiment-specs dd { margin: 0; text-align: right; }
.jm-experiment-source { min-width: 0; border: 1px solid var(--jm-line); border-radius: 3px; overflow: hidden; }
.jm-source-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 16px; border-bottom: 1px solid var(--jm-line); font-size: 9px; color: var(--jm-muted); }
.jm-source-head h3 { font: inherit; color: #00e5ff; margin: 0; }
.jm-experiment-code { margin: 0; padding: 16px; font-family: var(--font-jm-geist-mono), monospace; font-size: 12px; line-height: 1.75; white-space: pre; overflow-x: auto; overscroll-behavior-inline: contain; scrollbar-width: thin; scrollbar-color: #00e5ff #0a0d10; }
.jm-experiment-code .jm-code-line { min-height: 1.75em; }.jm-experiment-code .jm-code-number { margin-right: 12px; }
.jm-dialog .jm-source-caption { font-size: 12px; line-height: 1.6; margin: 0; padding: 12px 16px; border-top: 1px solid var(--jm-line); }
.jm-experiment-end { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--jm-line); }
.jm-experiment-end > span { font-size: 9px; line-height: 1.6; color: var(--jm-muted); }
.jm-experiment-end .jm-button { font-size: 12px !important; }

@media (hover: hover) and (pointer: fine) {
  .jm-desktop-nav :is(a, button):hover::after { transform: scaleX(1); }
  .jm-button:hover { transform: translateY(-2px); }.jm-button:hover svg, .jm-contact:hover svg { transform: translate(2px, -2px); }
  .jm-project:hover .jm-project-name svg { transform: translateX(4px); }.jm-project:hover .jm-project-preview { transform: scale(1.07); }
  .jm-button-secondary:hover, .jm-project:hover .jm-project-name, .jm-scroll-cue:hover { color: #e8ecef !important; }
  .jm-dialog-projects button:hover { border-color: #ccff00; }
  .jm-terminal:hover { transform: translateY(-4px) rotate(0deg); border-color: #ccff00; }
  .jm-dialog-experiment .jm-dialog-close:hover { border-color: #ccff00; }
}

@media (prefers-reduced-motion: no-preference) {
  .jm-page { scroll-behavior: smooth; }
  .jm-header { animation: jm-settle var(--duration-jm-enter) var(--ease-jm-out) both; }
  .jm-headline-line > span { animation: jm-line-in var(--duration-jm-enter) var(--ease-jm-out) both; animation-delay: 120ms; }
  .jm-headline-line:nth-child(2) > span { animation-delay: 190ms; }.jm-headline-line:nth-child(3) > span { animation-delay: 260ms; }
  .jm-eyebrow, .jm-intro, .jm-hero-actions, .jm-projects { animation: jm-settle var(--duration-jm-enter) var(--ease-jm-out) both; }
  .jm-intro { animation-delay: 340ms; }.jm-hero-actions { animation-delay: 420ms; }.jm-projects { animation-delay: 480ms; }
  .jm-stage { animation: jm-stage-in 1200ms var(--ease-jm-out) both; }
  .jm-project-preview { transition: transform var(--duration-jm-base) var(--ease-jm-out); }
  .jm-dialog[open] { animation: jm-settle var(--duration-jm-base) var(--ease-jm-out) both; }
}
@keyframes jm-line-in { from { transform: translateY(110%); } to { transform: translateY(0); } }
@keyframes jm-settle { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes jm-stage-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }

@media (min-width: 1800px) { .jm-hero-copy { padding-left: 80px; }.jm-intro { max-width: 520px; }.jm-hero { min-height: calc(100svh - 184px); } }
@media (max-width: 1250px) {
  .jm-header { gap: 20px; padding-inline: 24px; }.jm-availability { display: none; }.jm-desktop-nav { margin-left: auto; }
  .jm-hero-copy { padding-left: 40px; }.jm-eyebrow { font-size: 9px; }.jm-projects { padding-inline: 40px; gap: 24px; }.jm-project-list { gap: 24px; }.jm-project-thumb { width: 96px; }.jm-scroll-cue { font-size: 9px !important; }
}
@media (max-width: 1000px) {
  .jm-brand-name span { display: none; }.jm-header { gap: 24px; }.jm-desktop-nav { font-size: 12px; gap: 12px; }
  .jm-hero { min-height: 620px; }.jm-hero-copy { padding-left: 32px; }.jm-eyebrow span { display: block; }.jm-intro { max-width: 360px; font-size: 18px; }.jm-button { padding-inline: 16px; font-size: 12px !important; }.jm-hero-actions { gap: 8px; }
  .jm-terminal { width: 150px; left: 7%; }.jm-terminal-code { font-size: 4.7px; }.jm-experiment-status { right: 6%; bottom: 26%; font-size: 6px; }.jm-system-status { font-size: 5px; max-width: 112px; }
  .jm-projects { padding-inline: 32px; }.jm-project-list { gap: 24px; }.jm-project-thumb { display: none; }.jm-project-name { font-size: 16px; }
}
@media (max-width: 700px) {
  .jm-header { min-height: 68px; padding: 12px 24px; gap: 16px; }.jm-brand { gap: 12px; }.jm-brand-mark { font-size: 36px; }.jm-brand-name { font-size: 9px; }.jm-contact { font-size: 9px; padding: 8px 10px; gap: 4px; margin-left: auto; }.jm-contact svg { width: 12px; }.jm-desktop-nav { display: none; }
  .jm-mobile-menu { display: block; }.jm-mobile-menu summary { list-style: none; width: 28px; height: 36px; display: flex; flex-direction: column; gap: 5px; justify-content: center; cursor: pointer; }.jm-mobile-menu summary::-webkit-details-marker { display: none; }.jm-mobile-menu summary > span { width: 20px; height: 1px; background: #e8ecef; transition: transform var(--duration-jm-base) var(--ease-jm-out); }.jm-mobile-menu[open] summary > span:first-child { transform: translateY(3px) rotate(45deg); }.jm-mobile-menu[open] summary > span:last-child { transform: translateY(-3px) rotate(-45deg); }
  .jm-mobile-menu nav { position: absolute; top: 100%; right: 0; width: 100%; min-height: calc(100svh - 68px); background: #0a0d10f5; backdrop-filter: blur(12px); display: flex; flex-direction: column; align-items: flex-start; padding: 48px 32px; gap: 32px; font-size: 30px; }.jm-mobile-menu nav > span { display: none; }
  .jm-hero { display: flex; flex-direction: column; align-items: stretch; min-height: 0; }.jm-grid { background-size: 50% 100%, 100% 33.333%; }.jm-grid::before { left: 8px; }.jm-grid::after { right: 8px; }.jm-coordinate:nth-child(2), .jm-coordinate:nth-child(4) { display: none; }.jm-coordinate { font-size: 6px; }.jm-coordinate:nth-child(1), .jm-coordinate:nth-child(5) { left: 16px; }
  .jm-hero-copy { padding: 48px 24px 0; }.jm-eyebrow { font-size: 8px; margin-bottom: 16px; }.jm-eyebrow span { display: inline; }.jm-headline { font-size: clamp(60px, 13.8vw, 96px); margin-left: -2px; margin-bottom: 24px; }.jm-intro { margin: 24px 0; max-width: 370px; line-height: 1.45; font-size: 18px; }.jm-hero-actions { gap: 12px; }.jm-button { padding: 12px 16px; min-height: 48px; font-size: 12px !important; }
  .jm-stage { min-height: 0; height: min(112vw, 570px); width: calc(100% + 16px); margin: 8px -8px 0; }.jm-fps { top: 10%; left: 12%; font-size: 8px; }.jm-reticle-one { top: 9%; }.jm-terminal { width: 128px; bottom: 9%; left: 8%; }.jm-terminal-code { font-size: 4px; }.jm-terminal-footer { font-size: 4px; }.jm-terminal-bar { font-size: 5px; }.jm-experiment-status { right: 7%; bottom: 22%; font-size: 5.5px; }.jm-system-status { font-size: 4.7px; max-width: 104px; }.jm-stage-controls { right: 24px; bottom: 8px; font-size: 6px; }.jm-stage-controls button { min-width: 40px; min-height: 40px; }
  .jm-projects { min-height: 120px; padding: 20px 24px; display: block; }.jm-project-list { display: flex; overflow-x: auto; padding: 4px 4px 16px; margin: -4px; scroll-snap-type: x mandatory; gap: 24px; }.jm-project { min-width: 250px; scroll-snap-align: start; }.jm-project-thumb { display: block; width: 96px; height: 56px; }.jm-project-name { font-size: 16px; }.jm-project-number { font-size: 16px; }.jm-scroll-cue { display: none; }
  .jm-dialog { padding: 24px; }.jm-dialog-head { margin-bottom: 24px; }.jm-dialog p { font-size: 16px; }.jm-dialog-projects button { font-size: 16px; }
  .jm-dialog-experiment { padding: 0; max-height: calc(100svh - 32px); }
  .jm-dialog-experiment > .jm-dialog-head { padding: 12px 24px; gap: 12px; font-size: 8px; }.jm-dialog-experiment .jm-dialog-close { gap: 4px; padding-inline: 8px; }
  .jm-experiment-detail { padding: 24px; }.jm-experiment-intro { grid-template-columns: 1fr; gap: 16px; }.jm-experiment-intro h2 { font-size: 36px; }
  .jm-experiment-body { grid-template-columns: 1fr; gap: 24px; margin-top: 24px; }.jm-experiment-preview { aspect-ratio: 1.15; }.jm-experiment-specs { margin-top: 16px; font-size: 8px; }
  .jm-experiment-code { font-size: 11px; }.jm-dialog .jm-source-caption { font-size: 12px; }
  .jm-experiment-end { align-items: stretch; flex-direction: column; gap: 16px; margin-top: 24px; }.jm-experiment-end > span br { display: none; }.jm-experiment-end .jm-button { padding-inline: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .jm-page *, .jm-page *::before, .jm-page *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/MercerApp.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import MercerHeader from "./components/MercerHeader";
import MercerHeroCopy from "./components/MercerHeroCopy";
import MercerTorusKnotCanvas from "./components/MercerTorusKnotCanvas";
import ProjectTicker, { PROJECTS, ProjectPreview } from "./components/ProjectTicker";
import ExperimentDetails from "./components/ExperimentDetails";

type Detail = "projects" | "about" | "experiment" | number | null;

export default function MercerApp() {
  const [detail, setDetail] = useState<Detail>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = typeof detail === "number" ? PROJECTS[detail] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (detail === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = overflow; };
  }, [detail]);

  return (
    <div className="jm-page" id="index">
      <a className="jm-skip" href="#main-content">Skip to content</a>
      <MercerHeader onProjects={() => setDetail("projects")} onAbout={() => setDetail("about")} />
      <main id="main-content" className="jm-hero" tabIndex={-1}>
        <div className="jm-grid jm-mono" aria-hidden="true">
          {["660", "230", "8060", "300", "360", "680", "-560", "200"].map((coordinate, index) => <span className="jm-coordinate" key={index}>{coordinate}</span>)}
          <span className="jm-crosshair" /><span className="jm-crosshair" />
        </div>
        <MercerHeroCopy onExplore={() => setDetail("projects")} onAbout={() => setDetail("about")} />
        <MercerTorusKnotCanvas suspended={detail !== null} onOpenExperiment={() => setDetail("experiment")} />
      </main>
      <ProjectTicker onSelect={setDetail} onExplore={() => setDetail("projects")} />

      <dialog id="jm-detail-dialog" className={`jm-dialog${detail === "experiment" ? " jm-dialog-experiment" : ""}`} ref={dialogRef} aria-labelledby="jm-dialog-title" onClose={() => setDetail(null)} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex='0']"))
          .filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }} onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setDetail(null);
        }
      }}>
        <div className="jm-dialog-head jm-mono"><span>JULES MERCER // {detail === "about" ? "THE DEVELOPER" : detail === "experiment" ? "EXPERIMENT NOTES / 001" : "SELECTED WORK"}</span><button type="button" className="jm-dialog-close" aria-label="Close details" onClick={() => setDetail(null)}><X size={18} aria-hidden="true" />{detail === "experiment" && <span>ESC</span>}</button></div>
        {detail === "experiment" ? <ExperimentDetails onReturn={() => setDetail(null)} /> : detail === "about" ? <>
          <h2 id="jm-dialog-title">Design in mind.<br />Code at heart.</h2>
          <p>I’m Jules, an independent creative developer working at the intersection of design and technology. I turn ambitious ideas into considered digital experiences, from tactile interfaces to interactive worlds.</p>
          <p>Currently exploring procedural geometry, real-time graphics and the small details that make the web feel human.</p>
          <p className="jm-dialog-stack jm-mono">CREATIVE DEVELOPMENT / INTERACTION DESIGN / WEBGL</p>
          <a className="jm-button jm-button-primary" href="mailto:hello@julesmercer.studio">LET’S MAKE SOMETHING <ArrowUpRight size={18} aria-hidden="true" /></a>
        </> : project ? <>
          <h2 id="jm-dialog-title">{project.name}</h2>
          <span className="jm-mono jm-dialog-stack">{project.category}</span>
          <div className="jm-dialog-visual"><ProjectPreview variant={Number(detail)} /></div>
          <p>{project.description}</p>
          <p className="jm-dialog-stack jm-mono">{project.stack}</p>
          <button type="button" className="jm-button jm-button-secondary" onClick={() => setDetail("projects")}>ALL PROJECTS</button>
        </> : <>
          <h2 id="jm-dialog-title">Selected explorations.</h2>
          <p>Three studies in form, motion and possibility.</p>
          <div className="jm-dialog-projects">{PROJECTS.map((item, index) => <button key={item.name} type="button" onClick={() => setDetail(index)}><span>{item.name}<small>{item.category}</small></span><ArrowUpRight size={20} aria-hidden="true" /></button>)}</div>
        </>}
      </dialog>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/page.tsx">
<![CDATA[import type { Metadata } from "next";
import MercerApp from "./MercerApp";
import MercerContinuation from "./continuation/MercerContinuation";
import "./continuation/continuation.css";

export const metadata: Metadata = {
  title: "Jules Mercer // Creative Developer Portfolio",
  description: "Independent creative developer crafting interactive 3D WebGL experiences. Design-minded development where code becomes creativity.",
  openGraph: { title: "Jules Mercer // Creative Developer", description: "I build what you imagine. Interactive experiences, written in code.", type: "website" },
};

export default function MercerPage() {
  return <><MercerApp /><MercerContinuation /></>;
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/ExperimentDetails.tsx">
<![CDATA[import { ArrowUpRight } from "lucide-react";
import { AppletCode } from "./HudCards";
import TorusKnotFallback from "./TorusKnotFallback";

export default function ExperimentDetails({ onReturn }: { onReturn: () => void }) {
  return (
    <div className="jm-experiment-detail">
      <div className="jm-experiment-intro">
        <h2 id="jm-dialog-title">A knot of <br /><span>possibilities.</span></h2>
        <p>One continuous curve. A little mathematics. An exploration of what happens when code takes shape.</p>
      </div>
      <div className="jm-experiment-body">
        <figure className="jm-experiment-study">
          <div className="jm-experiment-preview">
            <TorusKnotFallback />
            <span className="jm-study-mark jm-mono" aria-hidden="true">FIG. 001 / CONTINUOUS FORM</span>
          </div>
          <figcaption className="jm-sr-only">A static study of the cyan and chartreuse interwoven torus knot.</figcaption>
          <dl className="jm-experiment-specs jm-mono">
            <div><dt>FORM</dt><dd>(2, 3) TORUS KNOT</dd></div>
            <div><dt>SURFACE</dt><dd>LIGHT / LATTICE / MEMBRANE</dd></div>
            <div><dt>INTERACTION</dt><dd>POINTER PARALLAX</dd></div>
          </dl>
        </figure>
        <section className="jm-experiment-source" aria-labelledby="jm-source-title">
          <div className="jm-source-head jm-mono"><h3 id="jm-source-title">APPLET SKETCH</h3><span>applet.ts</span></div>
          <pre className="jm-experiment-code" aria-label="Illustrative TypeScript animation sketch"><AppletCode /></pre>
          <p className="jm-source-caption">A sketch of the idea. The live experiment adds light, a particle envelope and a response to your pointer.</p>
        </section>
      </div>
      <div className="jm-experiment-end">
        <span className="jm-mono">WRITTEN IN CODE. <br />MADE TO BE EXPLORED.</span>
        <button type="button" className="jm-button jm-button-primary" onClick={onReturn}>RETURN TO EXPERIMENT <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/HudCards.tsx">
<![CDATA[export function FpsBadge({ fps }: { fps: number }) {
  return (
    <div className="jm-fps jm-mono" aria-label="Measured rendering frame rate">
      <span className="jm-fps-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>{fps > 0 && Number.isFinite(fps) ? `${Math.round(fps)} FPS` : "— FPS"}</span>
    </div>
  );
}

const CODE = [
  "function applet() {",
  "  const scene = new THREE.Scene();",
  "  const knot = createGeometry({",
  "    type: 'torus-knot',",
  "    winding: [2, 3],",
  "    material: 'possibility'",
  "  });",
  "",
  "  scene.add(knot);",
  "  function animate(time) {",
  "    knot.rotation.z += 0.001;",
  "    renderer.render(scene, camera);",
  "    requestAnimationFrame(animate);",
  "  }",
  "  animate();",
  "}",
];

export function AppletCode() {
  return (
    <code>{CODE.map((line, index) => (
        <span className={`jm-code-line${[0, 2, 9].includes(index) ? " jm-code-accent" : ""}`} key={index}>
          <span className="jm-code-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{line}
        </span>
      ))}</code>
  );
}

export function TerminalCodeCard({ onOpen }: { onOpen?: () => void }) {
  return (
    <button type="button" className="jm-terminal" aria-label="Open experiment notes" aria-haspopup="dialog" aria-controls="jm-detail-dialog" onClick={onOpen}>
      <span className="jm-terminal-bar"><span aria-hidden="true"><i /><i /><i /></span><span>applet.ts</span><span aria-hidden="true">↗</span></span>
      <span className="jm-terminal-code"><AppletCode /></span>
      <span className="jm-terminal-footer"><span>TYPESCRIPT</span><span className="jm-terminal-invite">OPEN NOTES ↗</span></span>
    </button>
  );
}

export function ExperimentStatusCard({ online = true, paused = false }: { online?: boolean; paused?: boolean }) {
  return (
    <div className="jm-experiment-status jm-mono">
      <span className="jm-experiment-label">INTERACTIVE EXPERIMENT / 001</span>
      <span className="jm-system-status" data-online={online && !paused}>
        <i aria-hidden="true" />
        {online ? (paused ? "SYSTEM PAUSED // STAT: IDLE" : "SYSTEM ONLINE // STAT: ACTIVE") : "STATIC PREVIEW // STAT: IDLE"}
      </span>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/MercerHeader.tsx">
<![CDATA[import { ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onProjects?: () => void;
  onAbout?: () => void;
}

export default function MercerHeader({ onProjects, onAbout }: HeaderProps) {
  const links = <>
    <a href="#index" aria-current="page">index</a><span aria-hidden="true">\</span>
    <button type="button" onClick={onProjects}>projects</button><span aria-hidden="true">\</span>
    <a href="#experiment">playground</a><span aria-hidden="true">\</span>
    <button type="button" onClick={onAbout}>about</button>
  </>;
  return (
    <header className="jm-header">
      <a className="jm-brand" href="#index" aria-label="Jules Mercer, home">
        <span className="jm-brand-mark">JM.</span>
        <span className="jm-brand-name jm-mono">JULES MERCER <span>{"// CREATIVE DEVELOPER"}</span></span>
      </a>
      <nav className="jm-desktop-nav jm-mono" aria-label="Main navigation">{links}</nav>
      <span className="jm-availability jm-mono"><i aria-hidden="true" />AVAILABLE FOR SELECT PROJECTS</span>
      <a className="jm-contact jm-mono" href="mailto:hello@julesmercer.studio">LET’S TALK <ArrowUpRight size={16} aria-hidden="true" /></a>
      <details className="jm-mobile-menu">
        <summary className="jm-mono" aria-label="Toggle navigation"><span /> <span /></summary>
        <nav className="jm-mono" aria-label="Mobile navigation" onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a,button")) event.currentTarget.closest("details")?.removeAttribute("open");
        }}>{links}</nav>
      </details>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/MercerHeroCopy.tsx">
<![CDATA[import { ArrowUpRight } from "lucide-react";

export default function MercerHeroCopy({ onExplore, onAbout }: { onExplore?: () => void; onAbout?: () => void }) {
  return (
    <div className="jm-hero-copy">
      <p className="jm-eyebrow jm-mono">INDEPENDENT CREATIVE DEVELOPER <span>/ PORTFOLIO 2026</span></p>
      <h1 className="jm-headline">
        <span className="jm-headline-line"><span>I BUILD</span></span>
        <span className="jm-headline-line"><span>WHAT YOU</span></span>
        <span className="jm-headline-line"><span className="jm-headline-accent">IMAGINE.</span></span>
      </h1>
      <p className="jm-intro">Design-minded developer crafting interactive experiences where code becomes creativity.</p>
      <div className="jm-hero-actions">
        <button className="jm-button jm-button-primary" type="button" onClick={onExplore}>EXPLORE PROJECTS <ArrowUpRight size={20} aria-hidden="true" /></button>
        <button className="jm-button jm-button-secondary" type="button" onClick={onAbout}>ABOUT ME</button>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { MercerSceneController } from "../scene/MercerSceneController";
import { ExperimentStatusCard, FpsBadge, TerminalCodeCard } from "./HudCards";
import TorusKnotFallback from "./TorusKnotFallback";

type RenderState = "preview" | "running" | "paused" | "static" | "unavailable" | "lost";
const ARROW_DIRECTIONS = new Map<string, [number, number]>([
  ["ArrowLeft", [1, 0]], ["ArrowRight", [-1, 0]], ["ArrowUp", [0, 1]], ["ArrowDown", [0, -1]],
]);

export default function MercerTorusKnotCanvas({ suspended = false, onOpenExperiment }: { suspended?: boolean; onOpenExperiment?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<MercerSceneController | null>(null);
  const syncRef = useRef<(() => void) | null>(null);
  const playbackRef = useRef({ paused: false, suspended });
  const [state, setState] = useState<RenderState>("preview");
  const [fps, setFps] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    playbackRef.current = { paused, suspended };
    syncRef.current?.();
  }, [paused, suspended]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let visible = true;
    let lost = false;
    let generation = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const controller = controllerRef.current;
      if (!controller || lost) return;
      const shouldRun = !motion.matches && visible && !document.hidden && !playbackRef.current.paused && !playbackRef.current.suspended;
      if (shouldRun) controller.start();
      else controller.stop();
      setState(shouldRun ? "running" : "paused");
    };
    syncRef.current = sync;

    const resize = () => controllerRef.current?.resize(host.clientWidth, host.clientHeight);
    const mount = async () => {
      const currentGeneration = ++generation;
      if (motion.matches) {
        controllerRef.current?.dispose();
        controllerRef.current = null;
        setState("static");
        return;
      }
      try {
        const { MercerSceneController: Controller } = await import("../scene/MercerSceneController");
        if (cancelled || motion.matches || currentGeneration !== generation) return;
        controllerRef.current?.dispose();
        lost = false;
        const controller = new Controller({
          onFps: (measured) => { if (!cancelled) setFps(measured); },
          onInteractionChange: (active) => { if (!cancelled) setDragging(active); },
          onContextChange: (context) => {
            if (cancelled) return;
            lost = context === "lost";
            if (lost) setState("lost");
            else sync();
          },
        });
        controllerRef.current = controller;
        controller.init(host);
        resize();
        sync();
      } catch {
        controllerRef.current?.dispose();
        controllerRef.current = null;
        if (!cancelled) setState("unavailable");
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    intersection.observe(host);
    motion.addEventListener("change", mount);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", resize);
    void mount();

    return () => {
      cancelled = true;
      generation++;
      syncRef.current = null;
      observer.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", mount);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  const movePointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width > 0 && bounds.height > 0) {
      controllerRef.current?.setPointer((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey || event.altKey) return;
    const direction = ARROW_DIRECTIONS.get(event.key);
    if (direction) {
      event.preventDefault();
      if (event.shiftKey) controllerRef.current?.panView(-direction[0], -direction[1]);
      else controllerRef.current?.rotateView(direction[0], direction[1]);
    } else if (event.key.toLowerCase() === "r" || event.key === "Home") {
      event.preventDefault();
      controllerRef.current?.resetView();
    }
  };
  const online = state === "running" || state === "paused";

  return (
    <figure id="experiment" className="jm-stage" data-state={state} data-dragging={dragging} onPointerMove={movePointer} onPointerLeave={() => controllerRef.current?.setPointer(0, 0)}>
      <figcaption id="jm-knot-help" className="jm-sr-only">Procedural (2,3) torus knot in cyan and chartreuse. Drag to rotate; Shift+drag to move. Arrow keys rotate the view, Shift+Arrow keys move it, and R or Home resets it. On touch screens, drag horizontally to rotate and swipe vertically to scroll.</figcaption>
      <div className="jm-canvas-host" ref={hostRef} data-testid="mercer-canvas-container" role="group" aria-label="Interactive torus knot" aria-describedby="jm-knot-help" tabIndex={online ? 0 : -1} onKeyDown={handleKeyDown} />
      <TorusKnotFallback />
      <div className="jm-stage-reticle jm-reticle-one" aria-hidden="true" />
      <div className="jm-stage-reticle jm-reticle-two" aria-hidden="true" />
      <FpsBadge fps={state === "running" ? fps : 0} />
      <TerminalCodeCard onOpen={onOpenExperiment} />
      <ExperimentStatusCard online={online} paused={state === "paused"} />
      <div className="jm-stage-controls jm-mono">
        <span>{state === "static" ? "REDUCED MOTION / STATIC VIEW" : state === "unavailable" ? "WEBGL UNAVAILABLE / STATIC VIEW" : state === "lost" ? "RESTORING WEBGL / STATIC VIEW" : dragging ? "DRAGGING / RELEASE TO SET VIEW" : <>DRAG TO ROTATE<span className="jm-pan-hint"> / SHIFT+DRAG TO MOVE</span></>}</span>
        {online && <button type="button" onClick={() => controllerRef.current?.resetView()} aria-label="Reset view" title="Reset view (R)"><RotateCcw size={12} aria-hidden="true" /></button>}
        {online && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play animation" : "Pause animation"} aria-pressed={paused}>
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>}
      </div>
    </figure>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/ProjectTicker.tsx">
<![CDATA[import { ArrowDown, ArrowRight } from "lucide-react";

export const PROJECTS = [
  { name: "MONOCHROME", category: "GENERATIVE ART / 2026", description: "An exploration of terrain, texture and light. A procedural landscape built from a single noise field, rendered in the browser.", stack: "THREE.JS / GLSL / TYPESCRIPT" },
  { name: "SHIFT SYSTEM", category: "INTERACTION DESIGN / 2026", description: "A study of movement as a design language. Parametric ribbons shift between structured grids and free-flowing forms.", stack: "REACT / WEBGL / CREATIVE CODING" },
  { name: "FORM STUDY", category: "DIGITAL EXPERIMENT / 2025", description: "Soft geometry, written in code. An ongoing material study of folds, surfaces and the space between physical and digital.", stack: "THREE.JS / PROCEDURAL GEOMETRY / GLSL" },
] as const;

export function ProjectPreview({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 160 80" fill="none" aria-hidden="true" className="jm-project-preview">
      {Array.from({ length: 26 }, (_, line) => {
        const path = Array.from({ length: 37 }, (_, sample) => {
          const u = sample / 36;
          const v = line / 25;
          let x = u * 180 - 10;
          let y = v * 94 - 7;
          if (variant === 0) y += Math.sin(u * 9 + v * 5) * Math.cos(u * 7 - v * 3) * 15;
          if (variant === 1) { x = 80 + Math.cos(v * 3.5 + u * 4) * (22 + u * 40); y = u * 110 - 15 + Math.sin(v * 3.5) * 8; }
          if (variant === 2) { x = 80 + (u - 0.5) * (72 + Math.sin(v * 6) * 30); y = v * 100 - 10 + Math.sin(u * 5 + v * 5) * 17; }
          return `${sample ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join("");
        return <path d={path} key={line} stroke="currentColor" strokeWidth="0.55" opacity={0.2 + Math.sin(line / 26 * Math.PI) * 0.55} />;
      })}
    </svg>
  );
}

export default function ProjectTicker({ onSelect, onExplore }: { onSelect?: (index: number) => void; onExplore?: () => void }) {
  return (
    <footer className="jm-projects" id="projects" aria-label="Selected projects">
      <div className="jm-project-list">
        {PROJECTS.map((project, index) => (
          <button type="button" className="jm-project" key={project.name} onClick={() => onSelect?.(index)}>
            <span className="jm-project-copy"><span className="jm-project-number">0{index + 1} /</span><span className="jm-project-name">{project.name} <ArrowRight size={19} aria-hidden="true" /></span></span>
            <span className="jm-project-thumb"><ProjectPreview variant={index} /></span>
          </button>
        ))}
      </div>
      <button type="button" className="jm-scroll-cue jm-mono" onClick={onExplore}>SCROLL TO EXPLORE <ArrowDown size={16} aria-hidden="true" /></button>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/components/TorusKnotFallback.tsx">
<![CDATA[const TAU = Math.PI * 2;

/** A lightweight projection of the same parametric centerline, with no WebGL dependency. */
function project(t: number, crossSection: number) {
  const radius = 2 * (1 + 0.18 * Math.cos(3 * t)) + Math.cos(crossSection) * 0.43;
  const x = radius * Math.cos(2 * t);
  const y = radius * Math.sin(2 * t);
  const z = -0.8 * Math.sin(3 * t) + Math.sin(crossSection) * 0.15;
  const tiltedX = x * Math.cos(-0.18) + z * Math.sin(-0.18);
  const tiltedY = y * Math.cos(0.12) - z * Math.sin(0.12);
  return `${(320 + (tiltedX * Math.cos(-0.2) - tiltedY * Math.sin(-0.2)) * 82).toFixed(1)},${(320 - (tiltedX * Math.sin(-0.2) + tiltedY * Math.cos(-0.2)) * 82).toFixed(1)}`;
}

const rails = Array.from({ length: 12 }, (_, column) => {
  const crossSection = column / 12 * TAU;
  return Array.from({ length: 8 }, (_, section) => ({
    lime: Math.sin(section / 8 * TAU - 0.7) > 0,
    path: Array.from({ length: 13 }, (_, index) => `${index ? "L" : "M"}${project((section + index / 12) / 8 * TAU, crossSection)}`).join(""),
  }));
}).flat();

const lattice = Array.from({ length: 2 }, (_, tone) => {
  let path = "";
  for (let ring = 0; ring < 60; ring++) {
    if (Number(Math.sin(ring / 60 * TAU - 0.7) > 0) !== tone) continue;
    for (let column = 0; column < 6; column++) {
      path += `M${project(ring / 60 * TAU, column / 6 * TAU)}L${project((ring + 1) / 60 * TAU, (column + 1) / 6 * TAU)}L${project(ring / 60 * TAU, (column + 1) / 6 * TAU)}`;
    }
  }
  return path;
});

export default function TorusKnotFallback() {
  return (
    <svg className="jm-knot-fallback" viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <g strokeWidth="0.6" opacity="0.48">
        <path d={lattice[0]} stroke="#00E5FF" />
        <path d={lattice[1]} stroke="#CCFF00" />
      </g>
      {rails.map((rail, index) => <path key={index} d={rail.path} stroke={rail.lime ? "#CCFF00" : "#00E5FF"} strokeWidth={index % 8 === 0 ? 1.4 : 0.65} opacity="0.85" />)}
      <g fill="#00E5FF" opacity="0.5">
        {Array.from({ length: 140 }, (_, index) => {
          const angle = index * 2.399963;
          const radius = 255 + Math.sin(angle * 3) * 24;
          // Keep SVG attributes identical across Node and browser Math implementations.
          return <circle key={index} cx={(320 + Math.cos(angle) * radius).toFixed(3)} cy={(320 + Math.sin(angle) * radius).toFixed(3)} r={index % 7 === 0 ? 1.2 : 0.6} />;
        })}
      </g>
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/continuation/continuation.css">
<![CDATA[/* Authored continuation CSS. All rules stay inside this subtree; hero styles are untouched. */
#jm-continuation,#jm-continuation *,#jm-continuation *::before,#jm-continuation *::after{all:revert}
#jm-continuation{--jm-bg:#090d10;--jm-panel:#0c1114;--jm-panel2:#101619;--jm-lime:#d5ff37;--jm-blue:#6f85ff;--jm-text:#f0f1eb;--jm-sub:#a9b0ad;--jm-muted:#6e777a;--jm-line:rgba(177,194,194,.19);font-family:Arial,Helvetica,sans-serif;color:var(--jm-text);background:var(--jm-bg);font-size:16px;line-height:1.4;overflow:clip;position:relative;isolation:isolate;}
#jm-continuation *,#jm-continuation *::before,#jm-continuation *::after{box-sizing:border-box}
#jm-continuation a{color:inherit;text-decoration:none}
#jm-continuation button{font:inherit;cursor:pointer}
#jm-continuation button:focus-visible,#jm-continuation a:focus-visible{outline:2px solid var(--jm-lime);outline-offset:5px}
#jm-continuation ::selection{background:var(--jm-lime);color:var(--jm-bg)}
#jm-continuation .jmc-mono{font-family:'Courier New',Courier,monospace;font-size:11px;line-height:1.5;letter-spacing:.035em;text-transform:uppercase}
#jm-continuation .jmc-muted{color:var(--jm-muted)}
#jm-continuation .jmc-lime{color:var(--jm-lime)}
#jm-continuation .jmc-blue{color:var(--jm-blue)}
#jm-continuation .jmc-wrap{width:min(100% - 104px,1420px);margin-inline:auto;position:relative;z-index:1}
#jm-continuation .jmc-gridbg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(to right,rgba(145,163,164,.075) 1px,transparent 1px),linear-gradient(to bottom,rgba(145,163,164,.065) 1px,transparent 1px);background-size:calc(100% / 8) 190px;mask-image:linear-gradient(to bottom,transparent,black 15%,black 88%,transparent);opacity:.63}
#jm-continuation .jmc-rule{height:1px;background:var(--jm-line);transform-origin:left}
#jm-continuation .jmc-topline{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:22px 0 18px;border-bottom:1px solid var(--jm-line);color:var(--jm-muted)}
#jm-continuation .jmc-section-index{display:flex;gap:16px;align-items:center}
#jm-continuation .jmc-dot{display:inline-block;width:6px;height:6px;border-radius:100%;background:var(--jm-lime);box-shadow:0 0 14px var(--jm-lime)}
#jm-continuation .jmc-outline-btn{border:1px solid rgba(210,225,223,.32);border-radius:2px;background:transparent;color:var(--jm-text);display:inline-flex;align-items:center;gap:22px;justify-content:center;padding:14px 20px;min-height:50px;position:relative;overflow:hidden;transition:border-color .25s,color .25s,transform .35s cubic-bezier(.2,.9,.2,1)}
#jm-continuation .jmc-outline-btn::before{content:"";position:absolute;inset:0;background:var(--jm-lime);transform:translateY(102%);transition:transform .45s cubic-bezier(.2,.85,.25,1);z-index:-1}
#jm-continuation .jmc-outline-btn:hover{border-color:var(--jm-lime);color:#090d10;transform:translateY(-3px)}
#jm-continuation .jmc-outline-btn:hover::before{transform:translateY(0)}
#jm-continuation .jmc-arrow{display:inline-block;transition:transform .3s cubic-bezier(.16,1,.3,1)}
#jm-continuation a:hover .jmc-arrow,#jm-continuation button:hover .jmc-arrow{transform:translate(4px,-3px)}
#jm-continuation .jmc-fill-btn{display:inline-flex;gap:26px;align-items:center;justify-content:space-between;border:1px solid var(--jm-lime);background:var(--jm-lime);color:#080c0c;padding:17px 23px;min-height:54px;font-size:13px;font-weight:800;text-transform:uppercase;position:relative;overflow:hidden;isolation:isolate;transition:box-shadow .3s,transform .4s cubic-bezier(.18,1.2,.4,1)}
#jm-continuation .jmc-fill-btn::before{content:"";position:absolute;inset:-25%;background:linear-gradient(112deg,transparent 35%,rgba(255,255,255,.8) 48%,transparent 60%);transform:translateX(-130%);transition:transform .65s cubic-bezier(.16,1,.3,1);z-index:-1}
#jm-continuation .jmc-fill-btn:hover{box-shadow:0 0 36px rgba(213,255,55,.24);transform:translateY(-3px)}
#jm-continuation .jmc-fill-btn:hover::before{transform:translateX(130%)}
#jm-continuation .jmc-reveal{--jm-ry:52px;opacity:0;transform:translate3d(0,var(--jm-ry),0) skewY(2deg);clip-path:inset(0 0 20% 0);transition:transform .95s cubic-bezier(.18,.92,.18,1),clip-path .95s cubic-bezier(.18,.92,.18,1),opacity .45s ease;}
#jm-continuation .jmc-reveal.jmc-in{opacity:1;transform:translate3d(0,0,0) skewY(0);clip-path:inset(0)}
#jm-continuation .jmc-reveal[data-delay="1"]{transition-delay:.1s}
#jm-continuation .jmc-reveal[data-delay="2"]{transition-delay:.2s}
#jm-continuation .jmc-reveal[data-delay="3"]{transition-delay:.32s}
#jm-continuation .jmc-reveal[data-delay="4"]{transition-delay:.44s}
#jm-continuation .jmc-reveal[data-delay="5"]{transition-delay:.56s}
#jm-continuation .jmc-livebar{position:fixed;right:0;top:0;width:3px;height:100dvh;z-index:40;pointer-events:none;background:rgba(255,255,255,.04)}
#jm-continuation .jmc-livebar span{display:block;width:100%;height:100%;background:var(--jm-lime);transform-origin:top;transform:scaleY(0);box-shadow:0 0 16px var(--jm-lime)}
/* ABOUT */
#jm-continuation .jmc-about{position:relative;min-height:105vh;min-height:105svh;padding-bottom:100px;scroll-margin-top:0}
#jm-continuation .jmc-about-core{display:grid;grid-template-columns:minmax(0,1.14fr) minmax(380px,.86fr);align-items:center;gap:5%;padding-block:clamp(70px,8vw,145px) clamp(50px,6vw,100px)}
#jm-continuation .jmc-overline{display:flex;align-items:center;gap:12px;color:var(--jm-sub);margin-bottom:28px}
#jm-continuation .jmc-overline::before{content:"";height:1px;width:38px;background:var(--jm-lime)}
#jm-continuation .jmc-about h2{font-size:clamp(62px,6.9vw,119px);line-height:.92;letter-spacing:-.077em;font-weight:760;margin:0 0 30px;max-width:880px}
#jm-continuation .jmc-about h2 .jmc-ital{font-style:normal;color:var(--jm-lime)}
#jm-continuation .jmc-about-para{max-width:620px;font-size:clamp(18px,1.43vw,23px);line-height:1.6;letter-spacing:-.018em;color:#b8bfc0;margin:0 0 35px}
#jm-continuation .jmc-about-para strong{color:var(--jm-text);font-weight:500}
#jm-continuation .jmc-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:34px}
#jm-continuation .jmc-chip{border:1px solid var(--jm-line);padding:9px 12px;background:#101519;color:#aeb7b7;letter-spacing:0;transition:background .28s,color .28s,border-color .28s,transform .28s}
#jm-continuation .jmc-chip:hover,#jm-continuation .jmc-chip[aria-pressed="true"]{border-color:var(--jm-lime);background:var(--jm-lime);color:#0a0e0d;transform:translateY(-4px)}
#jm-continuation .jmc-about-action{display:flex;gap:22px;align-items:center;flex-wrap:wrap}
#jm-continuation .jmc-inline-link{display:inline-flex;align-items:center;gap:18px;border-bottom:1px solid var(--jm-line);padding:14px 0;font-size:13px;transition:color .3s,border-color .3s;white-space:nowrap}
#jm-continuation .jmc-inline-link:hover{border-color:var(--jm-lime);color:var(--jm-lime)}
#jm-continuation .jmc-lab{position:relative;aspect-ratio: .91;min-height:430px;border:1px solid rgba(178,208,195,.17);background:radial-gradient(ellipse at 50% 50%,rgba(44,65,95,.23),transparent 65%),#0a1013;overflow:hidden;isolation:isolate}
#jm-continuation .jmc-lab::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(150,170,175,.065) 1px,transparent 1px),linear-gradient(90deg,rgba(150,170,175,.065) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;opacity:.9}
#jm-continuation .jmc-lab::after{content:"";pointer-events:none;position:absolute;width:190px;height:190px;left:var(--jm-mx,50%);top:var(--jm-my,50%);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(214,255,55,.09),transparent 70%)}
#jm-continuation .jmc-lab canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#jm-continuation .jmc-lab-hud{position:absolute;left:20px;right:20px;top:20px;display:flex;justify-content:space-between;align-items:center;z-index:2;gap:10px;color:#b0bcc1}
#jm-continuation .jmc-lab-hud .jmc-running{color:var(--jm-lime)}
#jm-continuation .jmc-lab-bottom{position:absolute;bottom:20px;left:20px;right:20px;z-index:2;display:flex;justify-content:space-between;gap:16px;align-items:end}
#jm-continuation .jmc-lab-caption{font-weight:800;text-transform:uppercase;font-size:23px;line-height:1.01;letter-spacing:-.055em}
#jm-continuation .jmc-lab-bottom .jmc-mono{text-align:right;color:#9baeb4}
#jm-continuation .jmc-about-facts{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--jm-line);border-bottom:1px solid var(--jm-line)}
#jm-continuation .jmc-about-fact{padding:25px 23px 25px 0;border-right:1px solid var(--jm-line)}
#jm-continuation .jmc-about-fact + .jmc-about-fact{padding-left:30px}
#jm-continuation .jmc-about-fact:last-child{border:0}
#jm-continuation .jmc-about-fact strong{display:block;font-size:clamp(18px,2.1vw,30px);font-weight:500;letter-spacing:-.05em;margin-top:8px}
/* WORK */
#jm-continuation .jmc-work{position:relative;background:#0b1013;padding-top:50px;scroll-margin-top:0;border-top:1px solid var(--jm-line)}
#jm-continuation .jmc-work-head{padding:62px 0 80px;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:end}
#jm-continuation .jmc-work-head h2{font-size:clamp(54px,7.4vw,124px);margin:0;letter-spacing:-.08em;line-height:.93;max-width:950px;font-weight:760}
#jm-continuation .jmc-work-head h2 span{color:var(--jm-lime)}
#jm-continuation .jmc-work-head-right{display:flex;flex-direction:column;align-items:flex-end;gap:26px;text-align:right}
#jm-continuation .jmc-work-head-right p{color:#adb6b6;font-size:clamp(16px,1.4vw,21px);line-height:1.5;max-width:350px;margin:0}
#jm-continuation .jmc-work-markers{display:flex;gap:6px}
#jm-continuation .jmc-work-marker{min-width:40px;background:transparent;border:1px solid var(--jm-line);color:var(--jm-muted);padding:9px 12px;font-size:12px;transition:all .3s}
#jm-continuation .jmc-work-marker:hover,#jm-continuation .jmc-work-marker[aria-current="true"]{color:#0b1110;background:var(--jm-lime);border-color:var(--jm-lime)}
#jm-continuation .jmc-case{position:relative;display:grid;grid-template-columns: .68fr 1.32fr;gap:clamp(36px,5vw,85px);padding:clamp(58px,8vw,120px) 0;border-top:1px solid var(--jm-line);min-height:min(900px,95vh);align-items:center}
#jm-continuation .jmc-case::before{position:absolute;top:-1px;left:0;content:"";height:1px;width:var(--jm-progress,0%);background:var(--jm-lime);box-shadow:0 0 12px rgba(213,255,55,.4);transition:width .08s linear}
#jm-continuation .jmc-case-n{color:var(--jm-lime);font-size:14px;letter-spacing:.02em;margin-bottom:34px;display:flex;justify-content:space-between;max-width:380px}
#jm-continuation .jmc-case-copy{max-width:440px;align-self:center;position:relative;z-index:2}
#jm-continuation .jmc-case h3{font-size:clamp(50px,5.8vw,97px);font-weight:780;line-height:.91;letter-spacing:-.076em;text-transform:uppercase;margin:0 0 28px}
#jm-continuation .jmc-case-sub{font-size:clamp(16px,1.28vw,20px);line-height:1.6;color:#b1b9ba;margin:0 0 20px;max-width:345px}
#jm-continuation .jmc-case-cats{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:38px}
#jm-continuation .jmc-case-cats span{font-size:10px;letter-spacing:.02em;padding:7px 9px;border:1px solid var(--jm-line);color:var(--jm-sub)}
#jm-continuation .jmc-case-toggle{border:0;border-bottom:1px solid var(--jm-line);background:none;color:var(--jm-text);padding:11px 2px 12px 0;display:inline-flex;align-items:center;justify-content:space-between;gap:34px;min-width:215px;text-align:left;font-size:12px;font-weight:700;text-transform:uppercase;transition:color .2s,border-color .2s}
#jm-continuation .jmc-case-toggle:hover,#jm-continuation .jmc-case-toggle[aria-expanded="true"]{color:var(--jm-lime);border-color:var(--jm-lime)}
#jm-continuation .jmc-case-toggle .jmc-plus{font-size:23px;font-weight:300;transition:transform .45s cubic-bezier(.2,.9,.2,1)}
#jm-continuation .jmc-case-toggle[aria-expanded="true"] .jmc-plus{transform:rotate(45deg)}
#jm-continuation .jmc-case-details{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s cubic-bezier(.16,.85,.25,1)}
#jm-continuation .jmc-case-details[aria-hidden="false"]{grid-template-rows:1fr}
#jm-continuation .jmc-case-details-inner{min-height:0;overflow:hidden}
#jm-continuation .jmc-case-details-inner p{color:#c4cdca;font-size:15px;line-height:1.68;padding:18px 0 0;margin:0;max-width:375px}
#jm-continuation .jmc-case-details-inner .jmc-mono{color:var(--jm-lime);display:block;padding-top:14px}
#jm-continuation .jmc-preview{--jm-px:50%;--jm-py:50%;position:relative;min-height:430px;height:clamp(435px,43vw,670px);border:1px solid rgba(170,196,199,.21);overflow:hidden;background:radial-gradient(circle at 50% 40%,rgba(79,98,124,.17),transparent 58%),#090c0f;transition:border-color .35s,box-shadow .35s;isolation:isolate}
#jm-continuation .jmc-preview::before{content:"";position:absolute;z-index:4;inset:0;pointer-events:none;background:radial-gradient(circle 200px at var(--jm-px) var(--jm-py),rgba(213,255,55,.055),transparent);mix-blend-mode:screen}
#jm-continuation .jmc-preview:hover{border-color:rgba(213,255,55,.58);box-shadow:0 20px 60px rgba(0,0,0,.15),inset 0 0 0 1px rgba(213,255,55,.06)}
#jm-continuation .jmc-preview canvas{width:100%;height:100%;display:block;touch-action:pan-y}
#jm-continuation .jmc-preview-hud{display:flex;justify-content:space-between;gap:15px;position:absolute;z-index:5;top:20px;left:20px;right:20px;pointer-events:none;color:#b5c0c1}
#jm-continuation .jmc-preview-hud span:last-child{color:var(--jm-lime)}
#jm-continuation .jmc-preview-bottom{position:absolute;left:20px;right:20px;bottom:20px;z-index:5;display:flex;justify-content:space-between;gap:20px;align-items:flex-end}
#jm-continuation .jmc-preview-bottom small{color:#b1bdbf}
#jm-continuation .jmc-play{padding:9px 13px;background:#11191b;border:1px solid #455155;color:var(--jm-text);font-size:10px;letter-spacing:.035em;transition:background .3s,color .3s,border-color .3s}
#jm-continuation .jmc-play:hover{background:var(--jm-lime);border-color:var(--jm-lime);color:#101510}
#jm-continuation .jmc-monochrome .jmc-preview{background:#07090b}
#jm-continuation .jmc-shift .jmc-preview{background:radial-gradient(circle at 53% 47%,#131b30,#080b10 72%)}
#jm-continuation .jmc-form .jmc-preview{background:radial-gradient(circle at 50% 50%,#161b31,#090d13 75%)}
#jm-continuation .jmc-work-outro{display:flex;justify-content:space-between;align-items:center;gap:25px;border-top:1px solid var(--jm-line);padding:28px 0 85px}
#jm-continuation .jmc-work-outro p{max-width:580px;font-size:16px;color:var(--jm-sub);margin:0}
/* CTA */
#jm-continuation .jmc-contact{position:relative;min-height:105vh;min-height:105svh;display:flex;align-items:center;background:var(--jm-lime);color:#0b0e0c;overflow:hidden;scroll-margin-top:0;padding:90px 0}
#jm-continuation .jmc-contact .jmc-gridbg{background-image:linear-gradient(90deg,rgba(12,18,10,.13) 1px,transparent 1px),linear-gradient(rgba(12,18,10,.13) 1px,transparent 1px);opacity:.6;mask-image:none}
#jm-continuation .jmc-contact::after{content:"";position:absolute;left:var(--jm-ctax,70%);top:var(--jm-ctay,50%);transform:translate(-50%,-50%);width:min(72vw,1000px);aspect-ratio:1;border:1px solid rgba(5,10,3,.16);border-radius:50%;box-shadow:0 0 0 70px rgba(10,17,3,.026),0 0 0 155px rgba(10,17,3,.026),0 0 0 280px rgba(10,17,3,.018);pointer-events:none;transition:left .18s ease-out,top .18s ease-out}
#jm-continuation .jmc-cta-top{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-bottom:40px;border-bottom:1px solid rgba(11,18,10,.26);margin-bottom:clamp(55px,8vw,120px)}
#jm-continuation .jmc-contact h2{font-size:clamp(72px,11vw,204px);letter-spacing:-.095em;line-height:.86;margin:0 0 45px;max-width:1300px;text-transform:uppercase;font-weight:800}
#jm-continuation .jmc-contact h2 .jmc-outline-word{-webkit-text-stroke:2px #0c1009;color:transparent}
#jm-continuation .jmc-contact h2 .jmc-last-line{white-space:nowrap}
#jm-continuation .jmc-contact-bottom{display:flex;align-items:end;justify-content:space-between;gap:30px;border-top:1px solid rgba(11,18,10,.25);padding-top:35px}
#jm-continuation .jmc-contact-bottom p{max-width:380px;font-size:clamp(17px,1.7vw,24px);line-height:1.42;letter-spacing:-.035em;margin:0}
#jm-continuation .jmc-cta-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end}
#jm-continuation .jmc-contact .jmc-cta-primary{display:flex;justify-content:space-between;align-items:center;gap:24px;background:#0a0d0c;color:#f2f4ee;border:1px solid #0a0d0c;padding:17px 25px;min-width:235px;min-height:58px;font-weight:800;font-size:13px;position:relative;overflow:hidden;transition:background .35s,color .35s,box-shadow .35s}
#jm-continuation .jmc-contact .jmc-cta-primary::before{content:"";position:absolute;inset:0;background:#f7f9e9;transform:translateY(105%);transition:transform .4s cubic-bezier(.19,1,.22,1);z-index:0}
#jm-continuation .jmc-cta-primary:hover::before{transform:translateY(0)}
#jm-continuation .jmc-cta-primary:hover{color:#0a0d0c;box-shadow:0 12px 25px rgba(7,10,4,.18)}
#jm-continuation .jmc-cta-primary span{position:relative;z-index:1}
#jm-continuation .jmc-contact .jmc-cta-copy{border:1px solid #0a0d0c;background:transparent;color:#0a0d0c;min-height:58px;padding:15px 22px;text-transform:uppercase;font-size:12px;font-weight:800;transition:background .25s,color .25s,transform .25s}
#jm-continuation .jmc-cta-copy:hover{background:#0a0d0c;color:var(--jm-lime);transform:translateY(-3px)}
#jm-continuation .jmc-contact .jmc-cta-top,#jm-continuation .jmc-contact .jmc-mono{color:#2b361a}
#jm-continuation .jmc-contact .jmc-reveal{--jm-ry:100px}
/* FOOTER */
#jm-continuation .jmc-footer{background:#080c0e;padding:80px 0 24px;border-top:1px solid rgba(255,255,255,.1)}
#jm-continuation .jmc-footer-main{display:grid;grid-template-columns:1.35fr .65fr .65fr;gap:45px;padding-bottom:95px}
#jm-continuation .jmc-signature{font-size:clamp(72px,9vw,160px);line-height:.75;font-weight:800;letter-spacing:-.11em;margin:10px 0 29px;color:var(--jm-lime)}
#jm-continuation .jmc-footer-intro{max-width:400px;color:#aab5b6;font-size:17px;line-height:1.6}
#jm-continuation .jmc-footer-col h3{font-size:11px;text-transform:uppercase;font-family:'Courier New',monospace;color:#7d8a8c;letter-spacing:.1em;font-weight:400;margin:14px 0 25px}
#jm-continuation .jmc-footer-col a{display:flex;align-items:center;gap:12px;max-width:max-content;font-size:clamp(18px,2vw,26px);letter-spacing:-.035em;margin:0 0 14px;transition:color .2s,transform .3s}
#jm-continuation .jmc-footer-col a:hover{color:var(--jm-lime);transform:translateX(8px)}
#jm-continuation .jmc-footer-bottom{border-top:1px solid var(--jm-line);padding-top:22px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#879396}
#jm-continuation .jmc-footer-bottom .jmc-dot{width:5px;height:5px;margin-right:8px}
#jm-continuation .jmc-footer-bottom a{transition:color .2s}
#jm-continuation .jmc-footer-bottom a:hover{color:var(--jm-lime)}
/* MOTION DETAILS */
@keyframes jmc-beacon{0%,100%{box-shadow:0 0 8px rgba(213,255,55,.4)}50%{box-shadow:0 0 0 7px rgba(213,255,55,0),0 0 25px rgba(213,255,55,.65)}}
#jm-continuation .jmc-about .jmc-dot,#jm-continuation .jmc-cta-top .jmc-dot{animation:jmc-beacon 2.4s ease-in-out infinite}
@keyframes jmc-scan{0%{transform:translateY(-5%)}100%{transform:translateY(110%)}}
#jm-continuation .jmc-lab-scan{position:absolute;z-index:1;left:0;right:0;top:0;height:30%;background:linear-gradient(to bottom,transparent,rgba(133,160,219,.02) 80%,rgba(191,230,255,.16));pointer-events:none;animation:jmc-scan 8s linear infinite;}
@media(max-width:1100px){#jm-continuation .jmc-wrap{width:min(100% - 64px,1420px)}#jm-continuation .jmc-about-core{grid-template-columns:1fr .88fr;gap:35px}#jm-continuation .jmc-case{gap:35px;grid-template-columns: .75fr 1.25fr}#jm-continuation .jmc-preview{height:490px}}
@media(max-width:820px){#jm-continuation .jmc-wrap{width:min(100% - 38px,1420px)}#jm-continuation .jmc-about-core{grid-template-columns:1fr;padding-block:80px 60px}#jm-continuation .jmc-about h2{font-size:clamp(56px,11vw,95px)}#jm-continuation .jmc-lab{width:min(100%,600px);min-height:400px;aspect-ratio:1.2}#jm-continuation .jmc-work-head{grid-template-columns:1fr;gap:25px;padding:60px 0}#jm-continuation .jmc-work-head-right{text-align:left;align-items:flex-start}#jm-continuation .jmc-case{grid-template-columns:1fr;min-height:0;padding:65px 0 85px;gap:32px}#jm-continuation .jmc-case-copy{max-width:none}#jm-continuation .jmc-case h3{font-size:clamp(56px,12vw,100px)}#jm-continuation .jmc-preview{height:min(75vw,570px);min-height:360px}#jm-continuation .jmc-work-outro{align-items:flex-start;flex-direction:column}#jm-continuation .jmc-contact{min-height:90vh}#jm-continuation .jmc-contact h2{font-size:clamp(64px,12vw,130px)}#jm-continuation .jmc-contact-bottom{align-items:flex-start;flex-direction:column}#jm-continuation .jmc-cta-actions{justify-content:flex-start}#jm-continuation .jmc-footer-main{grid-template-columns:1fr 1fr;gap:40px}#jm-continuation .jmc-footer-brand{grid-column:1/-1}#jm-continuation .jmc-signature{font-size:112px}}
@media(max-width:500px){#jm-continuation .jmc-wrap{width:calc(100% - 32px)}#jm-continuation .jmc-topline .jmc-mono:last-child{max-width:125px;text-align:right}#jm-continuation .jmc-about{padding-bottom:60px}#jm-continuation .jmc-about-core{padding-top:65px}#jm-continuation .jmc-about h2{font-size:clamp(51px,13vw,72px);letter-spacing:-.075em}#jm-continuation .jmc-about-para{font-size:17px;line-height:1.58}#jm-continuation .jmc-about-action{align-items:flex-start;flex-direction:column;gap:12px}#jm-continuation .jmc-lab{min-height:340px}#jm-continuation .jmc-lab-caption{font-size:19px}#jm-continuation .jmc-about-facts{grid-template-columns:1fr}#jm-continuation .jmc-about-fact,#jm-continuation .jmc-about-fact + .jmc-about-fact{border-right:0;border-bottom:1px solid var(--jm-line);padding:15px 0}#jm-continuation .jmc-about-fact:last-child{border-bottom:0}#jm-continuation .jmc-work-head h2{font-size:clamp(53px,12vw,76px)}#jm-continuation .jmc-work-head{padding:55px 0}#jm-continuation .jmc-case{padding:52px 0 72px}#jm-continuation .jmc-case h3{font-size:clamp(52px,13vw,75px)}#jm-continuation .jmc-case-n{margin-bottom:24px}#jm-continuation .jmc-preview{min-height:290px;height:95vw}#jm-continuation .jmc-preview-hud .jmc-mono,#jm-continuation .jmc-preview-bottom .jmc-mono{font-size:9px}#jm-continuation .jmc-contact{padding:60px 0;min-height:750px}#jm-continuation .jmc-contact h2{font-size:clamp(56px,13vw,82px);letter-spacing:-.09em}#jm-continuation .jmc-contact h2 .jmc-last-line{white-space:normal}#jm-continuation .jmc-contact h2 .jmc-outline-word{-webkit-text-stroke:1.4px #0c1009}#jm-continuation .jmc-cta-top{padding-bottom:30px;margin-bottom:80px}#jm-continuation .jmc-cta-actions{width:100%}#jm-continuation .jmc-cta-primary,#jm-continuation .jmc-cta-copy{width:100%;justify-content:space-between}#jm-continuation .jmc-footer{padding-top:65px}#jm-continuation .jmc-footer-main{gap:28px;padding-bottom:56px}#jm-continuation .jmc-signature{font-size:95px}#jm-continuation .jmc-footer-col a{font-size:17px}#jm-continuation .jmc-footer-bottom{flex-wrap:wrap;font-size:10px}}
@media(prefers-reduced-motion:reduce){#jm-continuation *,#jm-continuation *::before,#jm-continuation *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}#jm-continuation .jmc-reveal{opacity:1;transform:none;clip-path:none}}
#jm-continuation .jmc-livebar{visibility:hidden}
#jm-continuation[data-active="true"] .jmc-livebar{visibility:visible}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/continuation/continuationMarkup.ts">
<![CDATA[// Authored HTML copied from jules-mercer-portfolio-continuation.html, starting at 02 / SELECTED WORK.
// This is a reviewed, build-time constant: no scripts or user-supplied runtime HTML.
export const CONTINUATION_MARKUP = "<div class=\"jmc-livebar\" aria-hidden=\"true\"><span id=\"jm-page-progress\"></span></div>\n<section class=\"jmc-work\" id=\"jm-work\" aria-labelledby=\"jm-work-title\">\n    <div class=\"jmc-wrap\">\n      <div class=\"jmc-topline jmc-mono\"><span class=\"jmc-section-index\"><i class=\"jmc-dot\" aria-hidden=\"true\"></i> 02 / SELECTED WORK</span><span>THREE STUDIES IN FORM &amp; POSSIBILITY</span></div>\n      <div class=\"jmc-work-head\">\n        <h2 id=\"jm-work-title\" class=\"jmc-reveal\">Selected<br><span>explorations.</span></h2>\n        <div class=\"jmc-work-head-right jmc-reveal\" data-delay=\"2\"><p>Not just things to look at. Small digital worlds to move through, inspect, and play with.</p><div class=\"jmc-work-markers\" role=\"navigation\" aria-label=\"Jump between projects\"><a class=\"jmc-work-marker jmc-mono\" href=\"#jm-project-one\" aria-current=\"true\">01</a><a class=\"jmc-work-marker jmc-mono\" href=\"#jm-project-two\">02</a><a class=\"jmc-work-marker jmc-mono\" href=\"#jm-project-three\">03</a></div></div>\n      </div>\n      <article class=\"jmc-case jmc-monochrome\" id=\"jm-project-one\" data-case-index=\"0\" aria-labelledby=\"jm-project-one-title\">\n        <div class=\"jmc-case-copy\">\n          <div class=\"jmc-case-n jmc-mono jmc-reveal\"><span>001 / 003</span><span class=\"jmc-muted\">GENERATIVE ART — 2026</span></div>\n          <h3 class=\"jmc-reveal\" id=\"jm-project-one-title\">Mono<br>chrome<span class=\"jmc-lime\">.</span></h3>\n          <p class=\"jmc-case-sub jmc-reveal\" data-delay=\"1\">A study in emergence. Ordered points become unpredictable topographies, shaped by noise and human input.</p>\n          <div class=\"jmc-case-cats jmc-reveal\" data-delay=\"2\"><span class=\"jmc-mono\">Generative art</span><span class=\"jmc-mono\">Canvas</span><span class=\"jmc-mono\">Creative coding</span></div>\n          <button type=\"button\" class=\"jmc-case-toggle jmc-reveal\" data-delay=\"2\" aria-expanded=\"false\" aria-controls=\"jm-detail-one\">Explore this study <span class=\"jmc-plus\" aria-hidden=\"true\">+</span></button>\n          <div class=\"jmc-case-details\" id=\"jm-detail-one\" aria-hidden=\"true\"><div class=\"jmc-case-details-inner\"><p>An algorithmic terrain built from interacting wavefields. Move your cursor across the image to disturb the system and discover new structures. The surface never renders exactly the same way twice.</p><span class=\"jmc-mono\">Input: pointer / output: ordered chaos</span></div></div>\n        </div>\n        <div class=\"jmc-preview jmc-reveal\" data-delay=\"2\" data-preview=\"mono\"><canvas id=\"jm-art-mono\" aria-label=\"Animated monochrome generative terrain, responsive to pointer movements\"></canvas><div class=\"jmc-preview-hud\"><span class=\"jmc-mono\">MONOCHROME / STUDY 001</span><span class=\"jmc-mono\">LIVE GENERATIVE FIELD</span></div><div class=\"jmc-preview-bottom\"><small class=\"jmc-mono\">MOVE CURSOR TO DISTURB THE FIELD</small><button type=\"button\" class=\"jmc-play jmc-mono\" data-target=\"mono\" aria-pressed=\"false\">Ⅱ PAUSE</button></div></div>\n      </article>\n      <article class=\"jmc-case jmc-shift\" id=\"jm-project-two\" data-case-index=\"1\" aria-labelledby=\"jm-project-two-title\">\n        <div class=\"jmc-case-copy\">\n          <div class=\"jmc-case-n jmc-mono jmc-reveal\"><span>002 / 003</span><span class=\"jmc-muted\">INTERACTION DESIGN — 2026</span></div>\n          <h3 class=\"jmc-reveal\" id=\"jm-project-two-title\">Shift<br>system<span class=\"jmc-lime\">.</span></h3>\n          <p class=\"jmc-case-sub jmc-reveal\" data-delay=\"1\">An interface that refuses to sit still. A playful system where a grid behaves more like a living material.</p>\n          <div class=\"jmc-case-cats jmc-reveal\" data-delay=\"2\"><span class=\"jmc-mono\">Interaction</span><span class=\"jmc-mono\">Systems</span><span class=\"jmc-mono\">Realtime</span></div>\n          <button type=\"button\" class=\"jmc-case-toggle jmc-reveal\" data-delay=\"2\" aria-expanded=\"false\" aria-controls=\"jm-detail-two\">Explore this study <span class=\"jmc-plus\" aria-hidden=\"true\">+</span></button>\n          <div class=\"jmc-case-details\" id=\"jm-detail-two\" aria-hidden=\"true\"><div class=\"jmc-case-details-inner\"><p>Each point is assigned a local displacement rule. Move across the composition to change the tension and watch the grid rebuild itself around your input. Pause the experiment to inspect a single moment.</p><span class=\"jmc-mono\">Input: proximity / output: movement</span></div></div>\n        </div>\n        <div class=\"jmc-preview jmc-reveal\" data-delay=\"2\" data-preview=\"shift\"><canvas id=\"jm-art-shift\" aria-label=\"Animated cobalt-blue elastic grid interacting with your pointer\"></canvas><div class=\"jmc-preview-hud\"><span class=\"jmc-mono\">SHIFT SYSTEM / STUDY 002</span><span class=\"jmc-mono\">FIELD PHYSICS / ACTIVE</span></div><div class=\"jmc-preview-bottom\"><small class=\"jmc-mono\">HOVER OR DRAG TO DEFORM</small><button type=\"button\" class=\"jmc-play jmc-mono\" data-target=\"shift\" aria-pressed=\"false\">Ⅱ PAUSE</button></div></div>\n      </article>\n      <article class=\"jmc-case jmc-form\" id=\"jm-project-three\" data-case-index=\"2\" aria-labelledby=\"jm-project-three-title\">\n        <div class=\"jmc-case-copy\">\n          <div class=\"jmc-case-n jmc-mono jmc-reveal\"><span>003 / 003</span><span class=\"jmc-muted\">DIGITAL EXPERIMENT — 2025</span></div>\n          <h3 class=\"jmc-reveal\" id=\"jm-project-three-title\">Form<br>study<span class=\"jmc-lime\">.</span></h3>\n          <p class=\"jmc-case-sub jmc-reveal\" data-delay=\"1\">A rotating three-dimensional idea, reduced to lines and light. A study in seeing something from another angle.</p>\n          <div class=\"jmc-case-cats jmc-reveal\" data-delay=\"2\"><span class=\"jmc-mono\">Procedural form</span><span class=\"jmc-mono\">Geometry</span><span class=\"jmc-mono\">Motion</span></div>\n          <button type=\"button\" class=\"jmc-case-toggle jmc-reveal\" data-delay=\"2\" aria-expanded=\"false\" aria-controls=\"jm-detail-three\">Explore this study <span class=\"jmc-plus\" aria-hidden=\"true\">+</span></button>\n          <div class=\"jmc-case-details\" id=\"jm-detail-three\" aria-hidden=\"true\"><div class=\"jmc-case-details-inner\"><p>A procedural surface projected onto the screen and animated in real time. Every frame redraws the form, keeping the geometry responsive without needing a video or external 3D model.</p><span class=\"jmc-mono\">Input: time + pointer / output: form</span></div></div>\n        </div>\n        <div class=\"jmc-preview jmc-reveal\" data-delay=\"2\" data-preview=\"form\"><canvas id=\"jm-art-form\" aria-label=\"Rotating procedural wireframe torus rendered in Canvas, responsive to pointer\"></canvas><div class=\"jmc-preview-hud\"><span class=\"jmc-mono\">FORM STUDY / STUDY 003</span><span class=\"jmc-mono\">SPATIAL EXPLORATION / ACTIVE</span></div><div class=\"jmc-preview-bottom\"><small class=\"jmc-mono\">MOVE CURSOR TO SHIFT PERSPECTIVE</small><button type=\"button\" class=\"jmc-play jmc-mono\" data-target=\"form\" aria-pressed=\"false\">Ⅱ PAUSE</button></div></div>\n      </article>\n      <div class=\"jmc-work-outro\"><p>Different mediums, same curiosity: what happens when interaction becomes the starting point instead of the finishing touch?</p><a class=\"jmc-inline-link jmc-mono\" href=\"#jm-contact\">Have a project in mind? <span class=\"jmc-arrow\">↗</span></a></div>\n    </div>\n  </section>\n  <!-- 03 / CTA -->\n  <section class=\"jmc-contact\" id=\"jm-contact\" aria-labelledby=\"jm-contact-title\"><div class=\"jmc-gridbg\" aria-hidden=\"true\"></div><div class=\"jmc-wrap\">\n    <div class=\"jmc-cta-top jmc-mono\"><span><i class=\"jmc-dot\" aria-hidden=\"true\"></i> 03 / NEXT UP</span><span>OPEN FOR SELECT COLLABORATIONS</span></div>\n    <h2 id=\"jm-contact-title\"><span class=\"jmc-reveal\" style=\"display:block\">Have an</span><span class=\"jmc-reveal jmc-outline-word\" data-delay=\"1\" style=\"display:block\">idea?</span><span class=\"jmc-reveal jmc-last-line\" data-delay=\"2\" style=\"display:block\">Let's build it<span style=\"display:inline-block\">↗</span></span></h2>\n    <div class=\"jmc-contact-bottom jmc-reveal\" data-delay=\"3\"><p>From unusual concepts to beautifully useful things. Good work starts with a conversation.</p><div class=\"jmc-cta-actions\"><a href=\"mailto:jules@example.com?subject=Let%27s%20build%20something\" class=\"jmc-cta-primary\" data-magnet><span>START A CONVERSATION</span><span class=\"jmc-arrow\" aria-hidden=\"true\">↗</span></a><button class=\"jmc-cta-copy\" id=\"jm-copy-email\" type=\"button\" aria-live=\"polite\">COPY EMAIL ↗</button></div></div>\n    </div></section>\n  <!-- 04 / FOOTER NAV -->\n  <footer class=\"jmc-footer\" id=\"jm-footer\" aria-label=\"Portfolio footer\">\n    <div class=\"jmc-wrap\"><div class=\"jmc-footer-main\">\n      <div class=\"jmc-footer-brand\"><div class=\"jmc-mono jmc-muted\">JULES MERCER / CREATIVE DEVELOPER</div><div class=\"jmc-signature\" aria-label=\"JM.\">JM.</div><p class=\"jmc-footer-intro\">Design-minded development. Curious interactions. Digital things that feel a little more human.</p></div>\n      <nav class=\"jmc-footer-col\" aria-label=\"Footer navigation\"><h3>Navigate</h3><a href=\"#index\">The developer <span class=\"jmc-arrow\">↗</span></a><a href=\"#jm-work\">Selected work <span class=\"jmc-arrow\">↗</span></a><a href=\"#jm-project-two\">Playground <span class=\"jmc-arrow\">↗</span></a><a href=\"#jm-contact\">Contact <span class=\"jmc-arrow\">↗</span></a></nav>\n      <div class=\"jmc-footer-col\"><h3>Get in touch</h3><a href=\"mailto:jules@example.com\">Email <span class=\"jmc-arrow\">↗</span></a><a href=\"#jm-contact\">Collaborate <span class=\"jmc-arrow\">↗</span></a><h3 style=\"margin-top:32px\">Back to the beginning</h3><a href=\"#jm-work\" id=\"jm-back-top\">Top of continuation <span class=\"jmc-arrow\">↑</span></a></div>\n    </div><div class=\"jmc-footer-bottom jmc-mono\"><span>© <span id=\"jm-year\">2026</span> Jules Mercer / Built to be explored</span><span><i class=\"jmc-dot\" aria-hidden=\"true\"></i> ALL SYSTEMS CURIOUS</span><a href=\"#index\">BACK TO TOP ↑</a></div></div>\n  </footer>";
]]>
    </file>
    <file path="src/app/(mercer)/mercer/continuation/continuationRuntime.js">
<![CDATA[// Canvas algorithms, copy and interaction timings are copied from the supplied standalone HTML.
// The wrapper only scopes ownership and releases listeners, observers, timers and frames in React.

/** @param {HTMLElement} root */
export function mountContinuation(root) {
  const abort = new AbortController();
  const frames = new Set();
  const timers = new Set();
  const observers = [];
  let disposed = false;
  const listen = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: abort.signal });
  const requestFrame = (callback) => {
    const handle = requestAnimationFrame((time) => { frames.delete(handle); if (!disposed) callback(time); });
    frames.add(handle);
    return handle;
  };
  const schedule = (callback, delay) => {
    const handle = setTimeout(() => { timers.delete(handle); if (!disposed) callback(); }, delay);
    timers.add(handle);
    return handle;
  };
  const intersectionObserver = (callback, options) => {
    const observer = new IntersectionObserver(callback, options);
    observers.push(observer);
    return observer;
  };
  const resizeObserver = (callback) => {
    const observer = new ResizeObserver(callback);
    observers.push(observer);
    return observer;
  };
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,parent=root)=>parent.querySelector(s), $$=(s,parent=root)=>Array.from(parent.querySelectorAll(s));
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const year=$('#jm-year');if(year)year.textContent=String(new Date().getFullYear());
// Section entrances use motion masks, clip-path, overshoot and rotation rather than opacity-only transitions.
if('IntersectionObserver' in window){const io=intersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('jmc-in');io.unobserve(e.target)}}),{threshold:.10,rootMargin:'0px 0px -30px 0px'});$$('.jmc-reveal').forEach(el=>io.observe(el));}else{$$('.jmc-reveal').forEach(el=>el.classList.add('jmc-in'))}
// Scroll-accurate progress, active project navigation, and each project's top border draw.
const cases=$$('.jmc-case');const markers=$$('.jmc-work-marker');const progressEl=$('#jm-page-progress');let ticking=false;
function updateScroll(){root.dataset.active=String(root.getBoundingClientRect().top<innerHeight&&root.getBoundingClientRect().bottom>0);const scroll=window.scrollY;if(progressEl){const start=root.getBoundingClientRect().top+scroll;const end=root.getBoundingClientRect().bottom+scroll-innerHeight;progressEl.style.transform=`scaleY(${clamp((scroll-start)/Math.max(1,end-start),0,1)})`;}let best=0,bestDist=Infinity;cases.forEach((el,i)=>{const r=el.getBoundingClientRect();const p=clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);el.style.setProperty('--jm-progress',(p*100).toFixed(1)+'%');const dist=Math.abs(r.top+r.height/2-innerHeight*.5);if(dist<bestDist){best=i;bestDist=dist}});markers.forEach((m,i)=>m.setAttribute('aria-current',i===best?'true':'false'));ticking=false;}
listen(window,'scroll',()=>{if(!ticking){requestFrame(updateScroll);ticking=true}},{passive:true});listen(window,'resize',()=>requestFrame(updateScroll),{passive:true});requestFrame(updateScroll);
// Inline project details, never a modal. Each control remains keyboard accessible.
$$('.jmc-case-toggle').forEach(btn=>{listen(btn,'click',()=>{const expanded=btn.getAttribute('aria-expanded')==='true';const d=document.getElementById(btn.getAttribute('aria-controls'));btn.setAttribute('aria-expanded',String(!expanded));if(d)d.setAttribute('aria-hidden',String(expanded));});});
// Buttons and artwork respond to pointer input, with touch-safe graceful fallbacks.
const contact=$('#jm-contact');if(contact&&!reduced){listen(contact,'pointermove',e=>{const r=contact.getBoundingClientRect();contact.style.setProperty('--jm-ctax',`${((e.clientX-r.left)/r.width)*100}%`);contact.style.setProperty('--jm-ctay',`${((e.clientY-r.top)/r.height)*100}%`)});}
const magnet=$('[data-magnet]');if(magnet&&!reduced){listen(magnet,'pointermove',e=>{if(e.pointerType==='touch')return;const r=magnet.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;magnet.style.transform=`translate(${x*13}px,${y*9}px)`;});listen(magnet,'pointerleave',()=>magnet.style.transform='');}
const copy=$('#jm-copy-email');
if (copy) {
  listen(copy,'click', async () => {
    const email='jules@example.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta=document.createElement('textarea');
        ta.value=email;
        ta.style.cssText='position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        if (!document.execCommand('copy')) throw Error('Copy unavailable');
        ta.remove();
      }
      if(disposed)return;
      copy.textContent='✓ COPIED';
      schedule(() => {copy.textContent='COPY EMAIL ↗'},1800);
    } catch {
      if(disposed)return;
      copy.textContent='EMAIL: '+email;
      schedule(() => {copy.textContent='COPY EMAIL ↗'},3000);
    }
  });
}
// Canvas renderer: procedural drawings instead of stock video or external WebGL assets.
const TAU=Math.PI*2;
function makeCanvas(canvas,kind){if(!canvas)return null;const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return null;const wrap=canvas.parentElement;const state={kind,canvas,ctx,wrap,w:0,h:0,dpr:1,pointer:{x:.5,y:.5,active:false},time:0,visible:true,paused:reduced,resizePending:true};function resize(){const r=wrap.getBoundingClientRect();state.w=Math.max(10,r.width);state.h=Math.max(10,r.height);state.dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=Math.round(state.w*state.dpr);canvas.height=Math.round(state.h*state.dpr);ctx.setTransform(state.dpr,0,0,state.dpr,0,0)}resize();if(window.ResizeObserver){resizeObserver(()=>{state.resizePending=true;if(state.paused)requestFrame(()=>drawState(state))}).observe(wrap)}else listen(window,'resize',()=>{state.resizePending=true;if(state.paused)requestFrame(()=>drawState(state))});listen(wrap,'pointermove',e=>{if(e.pointerType==='touch')return;const r=wrap.getBoundingClientRect();state.pointer.x=clamp((e.clientX-r.left)/r.width,0,1);state.pointer.y=clamp((e.clientY-r.top)/r.height,0,1);state.pointer.active=true;wrap.style.setProperty('--jm-px',`${state.pointer.x*100}%`);wrap.style.setProperty('--jm-py',`${state.pointer.y*100}%`);wrap.style.setProperty('--jm-mx',`${state.pointer.x*100}%`);wrap.style.setProperty('--jm-my',`${state.pointer.y*100}%`);});listen(wrap,'pointerleave',()=>{state.pointer.active=false});if('IntersectionObserver'in window){intersectionObserver(entries=>entries.forEach(e=>state.visible=e.isIntersecting),{threshold:0}).observe(wrap)}return state}
function clear(s,color){s.ctx.fillStyle=color;s.ctx.fillRect(0,0,s.w,s.h)}
function grid(s,n=26){const{ctx,w,h}=s;ctx.lineWidth=.7;ctx.strokeStyle='rgba(160,190,196,.09)';ctx.beginPath();for(let x=0;x<w;x+=n){ctx.moveTo(x,0);ctx.lineTo(x,h)}for(let y=0;y<h;y+=n){ctx.moveTo(0,y);ctx.lineTo(w,y)}ctx.stroke()}
function drawLab(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#090f12');grid(s,33);const cx=w*.5,cy=h*.49,scale=Math.min(w,h)*.29;let mode=labMode;
if(mode==='geometry'){
  for(let layer=22;layer>=0;layer--){const off=layer*TAU/24;const n=105;c.beginPath();for(let j=0;j<=n;j++){const a=j/n*TAU;const mod=Math.sin(a*6+t*.65+layer*.22)*.13+Math.cos(a*3-t*.27+layer*.44)*.085;const interact=p.active?Math.max(0,1-Math.hypot(Math.cos(a)*.5+.5-p.x,Math.sin(a)*.5+.5-p.y)*1.7)*.3:0;const rad=scale*(.55+layer*.022+mod+interact);const x=cx+Math.cos(a+off*.015)*rad*1.12;const y=cy+Math.sin(a+off*.015)*rad*.73+Math.sin(a*3+layer*.38+t*.3)*8;if(j===0)c.moveTo(x,y);else c.lineTo(x,y)}c.closePath();c.strokeStyle=layer%6===0?'rgba(213,255,55,.65)':`rgba(109,138,253,${.15+layer*.013})`;c.lineWidth=layer%6===0?1.15:.8;c.stroke();}
}else if(mode==='interaction'){
  const cols=20,rows=20,gx=w*.12,gy=h*.12,sw=w*.76,sh=h*.76;for(let iy=0;iy<rows;iy++)for(let ix=0;ix<cols;ix++){const xx=gx+ix/(cols-1)*sw,yy=gy+iy/(rows-1)*sh;const d=Math.hypot(xx-p.x*w,yy-p.y*h);const influence=p.active?Math.exp(-d*d/(w*w*.045)):0;const a=t*1.1+ix*.3+iy*.2;const dx=Math.sin(a)*8+Math.cos(a*1.6)*influence*55,dy=Math.cos(a*.8)*8+Math.sin(a)*influence*55;c.fillStyle=influence>.1?'rgba(213,255,55,.9)':'rgba(126,148,250,.62)';c.beginPath();c.arc(xx+dx,yy+dy,1.35+influence*2.8,0,TAU);c.fill();}
}else{
  for(let j=0;j<33;j++){c.beginPath();for(let i=0;i<=105;i++){const x=w*.09+(i/105)*w*.82;const dx=(i/105-.5)*2;const v=Math.sin(i*.07+t*1.6+j*.28)*Math.cos(i*.13-t*.65+j*.4);const py=h*.5+j*3.2-53+v*(21+Math.abs(dx)*13)+(p.active?(p.x-.5)*35*Math.sin(j*.2+i*.1):0);if(!i)c.moveTo(x,py);else c.lineTo(x,py)}c.strokeStyle=j%4===0?'rgba(213,255,55,.58)':`rgba(110,131,247,${.25+j*.012})`;c.lineWidth=j%4===0?1.3:.85;c.stroke()}
}}
function drawMono(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#07090b');const lines=64,steps=85;const ix=p.active?(p.x-.5)*1.5:0,iy=p.active?(p.y-.5)*1.5:0;for(let j=lines-1;j>=0;j--){const z=j/(lines-1);const yy=h*.15+z*h*.72;const spread=(.55+z*.65),center=w*.5;const amp=(.7-z*.3)*(h*.095);c.beginPath();for(let i=0;i<=steps;i++){const x=i/steps,px=center+(x-.5)*w*spread;let wave=Math.sin(x*23+z*13+t*.68)*Math.sin(x*8-z*21+t*.35)+Math.cos(x*39+z*6-t*.55)*.35;wave+=Math.sin((x+z*.33)*47+t*.2)*.2;const response=p.active?Math.exp(-((x-p.x)**2+(z-p.y)**2)*14)*(ix*2+iy*2):0;let py=yy-(wave+response)*amp;if(i===0)c.moveTo(px,py);else c.lineTo(px,py);}const a=.08+(1-z)*.47;c.strokeStyle=`rgba(215,224,219,${a})`;c.lineWidth=z>.7?1:.7;c.stroke()}
c.lineWidth=1;c.strokeStyle='rgba(213,255,55,.3)';c.strokeRect(w*.055,h*.14,w*.89,h*.72);c.fillStyle='rgba(213,255,55,.9)';c.fillRect(w*.053,h*.86,6,6);c.fillRect(w*.942,h*.14,6,6);
}
function drawShift(s){const{ctx:c,w,h,pointer:p}=s,t=s.time;clear(s,'#090d18');const cols=25,rows=20,space=Math.min(w*.79/(cols-1),h*.73/(rows-1));const cx=w*.5,cy=h*.49;const pts=[];for(let j=0;j<rows;j++){const r=[];for(let i=0;i<cols;i++){const x=cx+(i-(cols-1)/2)*space;const y=cy+(j-(rows-1)/2)*space;const dist=Math.hypot(x-p.x*w,y-p.y*h);const strength=p.active?Math.exp(-dist*dist/(space*space*30))*45:0;const phase=i*.36+j*.2+t*.7;r.push({x:x+Math.sin(phase)*13+Math.sin(phase*.7)*strength,y:y+Math.cos(phase*.9)*14+Math.cos(phase*1.2)*strength});}pts.push(r)}
for(let j=0;j<rows;j++){c.beginPath();pts[j].forEach((v,i)=>i?c.lineTo(v.x,v.y):c.moveTo(v.x,v.y));c.lineWidth=.95;c.strokeStyle=`rgba(103,126,255,${.14+(j/rows)*.42})`;c.stroke()}
for(let i=0;i<cols;i++){c.beginPath();for(let j=0;j<rows;j++){const v=pts[j][i];if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y);}c.strokeStyle='rgba(102,145,255,.23)';c.stroke()}
pts.forEach((row,j)=>row.forEach((v,i)=>{if((i+j)%7===0){c.fillStyle=(i+j)%14===0?'rgba(213,255,55,.92)':'rgba(129,157,255,.63)';c.fillRect(v.x-1.5,v.y-1.5,3,3)}}));
}
function projectTorus(a,b,s,t){const R=1.5,r=.62;const A=a+t*.18,B=b+t*.12;let x=(R+r*Math.cos(B))*Math.cos(A),y=(R+r*Math.cos(B))*Math.sin(A),z=r*Math.sin(B);let rx=t*.13+(s.pointer.active?(s.pointer.y-.5)*.65:0),ry=t*.18+(s.pointer.active?(s.pointer.x-.5)*.9:0);let y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);let x2=x*Math.cos(ry)+z1*Math.sin(ry),z2=-x*Math.sin(ry)+z1*Math.cos(ry);return {x:x2,y:y1,z:z2}}
function drawForm(s){const{ctx:c,w,h}=s,t=s.time;clear(s,'#0a0d15');const scale=Math.min(w,h)*.21,cx=w*.5,cy=h*.5;const to2=(v)=>{const persp=3.6/(3.6+v.z*.15);return{x:cx+v.x*scale*persp,y:cy+v.y*scale*persp,z:v.z}};
for(let k=0;k<25;k++){const A=k/25*TAU;c.beginPath();for(let j=0;j<=78;j++){const v=to2(projectTorus(A,j/78*TAU,s,t));if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y)}c.strokeStyle=k%5===0?'rgba(217,255,63,.65)':'rgba(111,132,255,.36)';c.lineWidth=k%5===0?1.05:.85;c.stroke()}
for(let k=0;k<36;k++){const B=k/36*TAU;c.beginPath();for(let j=0;j<=90;j++){const v=to2(projectTorus(j/90*TAU,B,s,t));if(j)c.lineTo(v.x,v.y);else c.moveTo(v.x,v.y)}c.strokeStyle=k%7===0?'rgba(213,255,55,.7)':'rgba(141,157,251,.32)';c.lineWidth=k%7===0?1.4:.83;c.stroke()}
for(let i=0;i<24;i++){const v=to2(projectTorus(i/24*TAU,i*.29,s,t));c.fillStyle=i%4===0?'#d5ff37':'#8298ff';c.beginPath();c.arc(v.x,v.y,i%4===0?2.3:1.2,0,TAU);c.fill()}
}
let labMode='geometry';const lab=makeCanvas($('#jm-lab-canvas'),'lab');const art={mono:makeCanvas($('#jm-art-mono'),'mono'),shift:makeCanvas($('#jm-art-shift'),'shift'),form:makeCanvas($('#jm-art-form'),'form')};const all=[lab,...Object.values(art)].filter(Boolean);
$$('[data-discipline]').forEach(btn=>listen(btn,'click',()=>{labMode=btn.dataset.discipline;$$('[data-discipline]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));const names={geometry:['Procedural','geometry'],interaction:['Interaction','systems'],motion:['Motion','study']};const [a,b]=names[labMode];$('#jm-lab-title').innerHTML=a+'<br>'+b;$('#jm-lab-meta').innerHTML='REAL-TIME / INPUT-DRIVEN<br>MOVE CURSOR TO DISTORT';}));
$$('.jmc-play').forEach(btn=>listen(btn,'click',()=>{const s=art[btn.dataset.target];if(!s)return;s.paused=!s.paused;btn.textContent=s.paused?'▶ RESUME':'Ⅱ PAUSE';btn.setAttribute('aria-pressed',String(s.paused));if(s.paused)drawState(s)}));
function drawState(s){if(s.resizePending){s.resizePending=false;const r=s.wrap.getBoundingClientRect();s.w=Math.max(10,r.width);s.h=Math.max(10,r.height);s.dpr=Math.min(devicePixelRatio||1,1.6);s.canvas.width=Math.round(s.w*s.dpr);s.canvas.height=Math.round(s.h*s.dpr);s.ctx.setTransform(s.dpr,0,0,s.dpr,0,0)}if(s.kind==='lab')drawLab(s);else if(s.kind==='mono')drawMono(s);else if(s.kind==='shift')drawShift(s);else drawForm(s)}
let last=0;function animate(now){const dt=Math.min((now-last)/1000||.016,.045);last=now;all.forEach(s=>{if(!s.visible)return;if(!s.paused)s.time+=dt;if(!s.paused||s.resizePending||s.pointer.active)drawState(s)});if(!reduced)requestFrame(animate)}
all.forEach(s=>{s.resizePending=true;drawState(s)});if(!reduced)requestFrame(animate);
// Anchor/hash integration notes: original hero can point to these IDs without a popup.

  // Scope the standalone document's smooth-scroll behavior to the copied links only.
  listen(root, 'click', (event) => {
    if (!(event.target instanceof Element) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || !root.contains(link)) return;
    const hash = link.getAttribute('href');
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 24, behavior: reduced ? 'instant' : 'smooth' });
  });
  root.dataset.continuationReady = 'true';
  return () => {
    disposed = true;
    abort.abort();
    for (const observer of observers) observer.disconnect();
    for (const frame of frames) cancelAnimationFrame(frame);
    for (const timer of timers) clearTimeout(timer);
    delete root.dataset.continuationReady;
    delete root.dataset.active;
  };
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/continuation/MercerContinuation.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { CONTINUATION_MARKUP } from "./continuationMarkup";
import { mountContinuation } from "./continuationRuntime";

export default function MercerContinuation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root) return mountContinuation(root);
  }, []);

  return (
    <>
      {/* Reviewed static authored markup, never runtime input. Its original script is mounted with cleanup above. */}
      <section id="jm-continuation" aria-label="Jules Mercer — portfolio continuation" ref={rootRef} dangerouslySetInnerHTML={{ __html: CONTINUATION_MARKUP }} />
      <noscript><style>{`#jm-continuation .jmc-reveal{opacity:1;transform:none;clip-path:none}`}</style></noscript>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/model/torusKnotMath.ts">
<![CDATA[import { BufferGeometry, Color, Curve, Float32BufferAttribute, Vector3 } from "three";

const TAU = Math.PI * 2;

function positive(value: number, name: string) {
  if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be finite and positive`);
}

function subdivisions(value: number, minimum: number, maximum: number, name: string) {
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new RangeError(`${name} must be an integer between ${minimum} and ${maximum}`);
  }
}

/** One complete toroidal winding, in the XY plane with depth along Z. */
export function calculateTorusKnotPoint(t: number, p = 2, q = 3, radius = 2, heightScale = 0.8): Vector3 {
  if (!Number.isFinite(t)) throw new RangeError("t must be finite");
  positive(radius, "radius");
  positive(heightScale, "heightScale");
  subdivisions(p, 1, 20, "p");
  subdivisions(q, 1, 20, "q");
  const radial = radius * (1 + 0.18 * Math.cos(q * t));
  return new Vector3(radial * Math.cos(p * t), radial * Math.sin(p * t), -heightScale * Math.sin(q * t));
}

/** Excludes the repeated endpoint so callers can connect the final sample to the first. */
export function generateTorusKnotSamples(samples: number, p = 2, q = 3, radius = 2): Vector3[] {
  subdivisions(samples, 3, 4096, "samples");
  return Array.from({ length: samples }, (_, index) => calculateTorusKnotPoint(index / samples * TAU, p, q, radius));
}

class KnotCurve extends Curve<Vector3> {
  constructor() { super(); }

  getPoint(t: number, target = new Vector3()) {
    return target.copy(calculateTorusKnotPoint(t * TAU));
  }
}

/** A flattened, closed tube. Parallel-transport frames distribute seam twist over the curve. */
export function buildGeodesicRibbonGeometry(samples: number, segments: number, width: number, thickness: number): BufferGeometry {
  subdivisions(samples, 12, 200, "samples");
  subdivisions(segments, 3, 24, "segments");
  positive(width, "width");
  positive(thickness, "thickness");
  const curve = new KnotCurve();
  const frames = curve.computeFrenetFrames(samples, true);
  const positions: number[] = [];
  const colors: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const cyan = new Color("#00E5FF");
  const lime = new Color("#CCFF00");
  const point = new Vector3();
  const tint = new Color();

  for (let ring = 0; ring <= samples; ring++) {
    const t = ring / samples;
    // Copy ring zero exactly at the longitudinal seam, including its normal frame.
    const frame = ring === samples ? 0 : ring;
    const center = curve.getPoint(ring === samples ? 0 : t);
    const tone = 0.5 + 0.5 * Math.sin(t * TAU - 0.7);
    tint.copy(cyan).lerp(lime, tone * tone * (3 - 2 * tone));
    for (let column = 0; column <= segments; column++) {
      const angle = (column === segments ? 0 : column / segments) * TAU;
      point.copy(center)
        .addScaledVector(frames.normals[frame], Math.cos(angle) * width)
        .addScaledVector(frames.binormals[frame], Math.sin(angle) * thickness);
      positions.push(point.x, point.y, point.z);
      colors.push(tint.r, tint.g, tint.b);
      uvs.push(t, column / segments);
      if (ring < samples && column < segments) {
        const a = ring * (segments + 1) + column;
        const b = a + segments + 1;
        // Alternate diagonals for a geodesic lattice rather than a uniform slash pattern.
        if ((ring + column) % 2 === 0) indices.push(a, b, a + 1, b, b + 1, a + 1);
        else indices.push(a, b, b + 1, a, b + 1, a + 1);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  // Weld the shading at both duplicated UV seams without welding UVs themselves.
  const normals = geometry.getAttribute("normal");
  const average = (a: number, b: number) => {
    point.fromBufferAttribute(normals, a).add(new Vector3().fromBufferAttribute(normals, b)).normalize();
    normals.setXYZ(a, point.x, point.y, point.z);
    normals.setXYZ(b, point.x, point.y, point.z);
  };
  for (let ring = 0; ring <= samples; ring++) average(ring * (segments + 1), ring * (segments + 1) + segments);
  for (let column = 0; column <= segments; column++) average(column, samples * (segments + 1) + column);
  geometry.computeBoundingSphere();
  return geometry;
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/scene/materials.ts">
<![CDATA[import { AdditiveBlending, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, ShaderMaterial } from "three";

export interface MaterialConfig {
  cyanColor?: string;
  limeColor?: string;
  /** Antialiased screen-pixel width; independent of the platform's native GL line width. */
  wireframeLineWidth?: number;
}

const surfaceVertex = /* glsl */ `
  varying vec3 vTint;
  varying vec3 vNormal;
  varying vec3 vView;
  #ifdef LATTICE
    attribute vec3 aBarycentric;
    varying vec3 vBarycentric;
  #endif
  void main() {
    vTint = color;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -viewPosition.xyz;
    #ifdef LATTICE
      vBarycentric = aBarycentric;
    #endif
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export function createLatticeGeometry(source: BufferGeometry): BufferGeometry {
  const geometry = source.index ? source.toNonIndexed() : source.clone();
  const count = geometry.getAttribute("position").count;
  const barycentrics = new Float32Array(count * 3);
  for (let vertex = 0; vertex < count; vertex++) barycentrics[vertex * 3 + vertex % 3] = 1;
  geometry.setAttribute("aBarycentric", new Float32BufferAttribute(barycentrics, 3));
  return geometry;
}

export function createWireframeLatticeMaterial(config: MaterialConfig = {}): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer geodesic emissive lattice",
    defines: { LATTICE: 1 },
    uniforms: {
      uTime: { value: 0 },
      uColorCyan: { value: new Color(config.cyanColor ?? "#00E5FF") },
      uColorLime: { value: new Color(config.limeColor ?? "#CCFF00") },
      // Geometry colors are linear; recover the original cyan/lime interpolation weight.
      uSourceLimeRed: { value: new Color("#CCFF00").r },
      uLineWidth: { value: config.wireframeLineWidth ?? 0.7 },
      uOpacity: { value: 0.52 },
    },
    vertexShader: surfaceVertex,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uLineWidth;
      uniform float uOpacity;
      uniform vec3 uColorCyan;
      uniform vec3 uColorLime;
      uniform float uSourceLimeRed;
      varying vec3 vTint;
      varying vec3 vNormal;
      varying vec3 vView;
      varying vec3 vBarycentric;
      void main() {
        vec3 derivatives = max(fwidth(vBarycentric), vec3(0.00001));
        vec3 edges = smoothstep(vec3(0.0), derivatives * uLineWidth, vBarycentric);
        float edge = 1.0 - min(min(edges.x, edges.y), edges.z);
        float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 1.7);
        float pulse = 0.95 + 0.05 * sin(uTime * 0.8 + vTint.r * 4.0);
        vec3 tint = mix(uColorCyan, uColorLime, clamp(vTint.r / uSourceLimeRed, 0.0, 1.0));
        gl_FragColor = vec4(tint * (1.05 + rim * 0.55), edge * uOpacity * pulse);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    // Additive surfaces are order-independent; avoid Three's two transparent face passes.
    forceSinglePass: true,
    vertexColors: true,
    toneMapped: false,
  });
}

export function createTranslucentMembraneMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer translucent membrane",
    uniforms: { uTime: { value: 0 } },
    vertexShader: surfaceVertex,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vTint;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.4);
        float breath = 0.97 + 0.03 * sin(uTime * 0.6);
        gl_FragColor = vec4(vTint * (0.65 + fresnel), (0.04 + fresnel * 0.18) * breath);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    forceSinglePass: true,
    vertexColors: true,
    toneMapped: false,
  });
}

export function createParticleShellGeometry(count = 1200, radius = 3.2): BufferGeometry {
  if (!Number.isInteger(count) || count < 1 || count > 1200) throw new RangeError("Particle count must be between 1 and 1200");
  if (!Number.isFinite(radius) || radius <= 0) throw new RangeError("Particle radius must be finite and positive");
  const positions: number[] = [];
  const colors: number[] = [];
  const phases: number[] = [];
  const sizes: number[] = [];
  const cyan = new Color("#00E5FF");
  const lime = new Color("#CCFF00");
  const tint = new Color();
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index++) {
    const z = 1 - 2 * (index + 0.5) / count;
    const theta = index * goldenAngle;
    const ring = Math.sqrt(1 - z * z);
    const wave = 1 + 0.12 * Math.sin(theta * 3 + z * 7) + 0.05 * Math.cos(theta * 5);
    positions.push(radius * wave * ring * Math.cos(theta), radius * wave * ring * Math.sin(theta), radius * 0.44 * z);
    tint.copy(cyan).lerp(lime, 0.5 + 0.5 * Math.sin(theta + z * 3));
    colors.push(tint.r, tint.g, tint.b);
    phases.push((index * 0.61803398875 % 1) * Math.PI * 2);
    sizes.push(0.55 + (index * 0.754877666 % 1) * 1.35);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aPhase", new Float32BufferAttribute(phases, 1));
  geometry.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

export function createParticleShellMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: "Mercer drifting stipple envelope",
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uOpacity: { value: 0.55 } },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aPhase;
      attribute float aSize;
      varying vec3 vTint;
      varying float vAlpha;
      void main() {
        vec3 displaced = position * (1.0 + 0.018 * sin(uTime * 0.45 + aPhase));
        displaced.z += 0.06 * sin(uTime * 0.35 + position.x * 1.8 + aPhase);
        vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
        gl_Position = projectionMatrix * viewPosition;
        gl_PointSize = clamp(aSize * uPixelRatio * 11.0 / max(1.0, -viewPosition.z), 1.0, 5.0 * uPixelRatio);
        vTint = color;
        vAlpha = 0.5 + 0.5 * sin(aPhase + uTime * 0.5);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uOpacity;
      varying vec3 vTint;
      varying float vAlpha;
      void main() {
        float radius = length(gl_PointCoord - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.12, 0.5, radius);
        gl_FragColor = vec4(vTint, alpha * (0.35 + vAlpha * 0.65) * uOpacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    toneMapped: false,
  });
}
]]>
    </file>
    <file path="src/app/(mercer)/mercer/scene/MercerSceneController.ts">
<![CDATA[import {
  AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group, Line, LineBasicMaterial,
  Material, Mesh, PerspectiveCamera, Points, Scene, ShaderMaterial, SRGBColorSpace, Vector3, WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { buildGeodesicRibbonGeometry } from "../model/torusKnotMath";
import { createLatticeGeometry, createParticleShellGeometry, createParticleShellMaterial, createTranslucentMembraneMaterial, createWireframeLatticeMaterial } from "./materials";

export function normalizePointer(value: number): number {
  return Number.isFinite(value) ? Math.max(-1, Math.min(1, value)) : 0;
}

/** Fit a bounding sphere against the limiting field of view, with room for the shell. */
export function fitCameraDistance(width: number, height: number): number {
  const aspect = Math.max(1, Number.isFinite(width) ? width : 1) / Math.max(1, Number.isFinite(height) ? height : 1);
  const halfFov = 36 * Math.PI / 360;
  return 3.6 / Math.sin(Math.min(halfFov, Math.atan(Math.tan(halfFov) * aspect)));
}

interface SceneOptions {
  onFps?: (fps: number) => void;
  onContextChange?: (state: "lost" | "restored") => void;
  onInteractionChange?: (dragging: boolean) => void;
}

export class MercerSceneController {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(36, 1, 0.1, 80);
  private readonly knot = new Group();
  private readonly geometries = new Set<BufferGeometry>();
  private readonly materials = new Set<Material>();
  private renderer: WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private disposed = false;
  private running = false;
  private contextLost = false;
  private pointer = { x: 0, y: 0 };
  private orbit = { x: 0, y: 0 };
  private interacting = false;
  private spin = 0;
  private readonly hoverRight = new Vector3();
  private readonly hoverUp = new Vector3();
  private lastTime: number | null = null;
  private elapsed = 0;
  private fpsTime = 0;
  private frames = 0;
  private resolutionScale = 1;
  private slowSamples = 0;
  private viewport = { width: 1, height: 1 };

  constructor(private readonly options: SceneOptions = {}) {}

  init(container: HTMLElement): void {
    if (this.disposed || this.renderer) return;
    try {
      this.renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      this.renderer.setClearColor(0x0a0d10, 0);
      this.renderer.outputColorSpace = SRGBColorSpace;
      const canvas = this.renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      canvas.dataset.mercerRenderer = "true";
      canvas.addEventListener("webglcontextlost", this.handleContextLost);
      canvas.addEventListener("webglcontextrestored", this.handleContextRestored);
      container.appendChild(canvas);
      this.assemble();
      this.scene.add(this.knot);
      const bounds = container.getBoundingClientRect();
      this.resize(bounds.width, bounds.height);
      this.createControls();
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  private createControls(): void {
    if (!this.renderer) return;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls = controls;
    controls.enableDamping = this.running;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 0.6;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.8;
    controls.maxTargetRadius = 0.45;
    controls.cursorStyle = "grab";
    // Horizontal touch gestures turn the object; vertical gestures retain native page scrolling.
    this.renderer.domElement.style.touchAction = "pan-y pinch-zoom";
    controls.addEventListener("start", this.handleInteractionStart);
    controls.addEventListener("end", this.handleInteractionEnd);
    controls.addEventListener("change", this.handleViewChange);
    controls.update();
    controls.saveState();
  }

  private geometry<T extends BufferGeometry>(geometry: T): T {
    this.geometries.add(geometry);
    return geometry;
  }

  private material<T extends Material>(material: T): T {
    this.materials.add(material);
    return material;
  }

  private assemble(): void {
    const membrane = this.geometry(buildGeodesicRibbonGeometry(200, 24, 0.48, 0.15));
    this.knot.add(new Mesh(membrane, this.material(createTranslucentMembraneMaterial())));

    const source = buildGeodesicRibbonGeometry(84, 8, 0.485, 0.155);
    const lattice = this.geometry(createLatticeGeometry(source));
    source.dispose();
    const glow = this.material(createWireframeLatticeMaterial({ wireframeLineWidth: 3.6 }));
    glow.uniforms.uOpacity.value = 0.09;
    this.knot.add(new Mesh(lattice, glow));
    this.knot.add(new Mesh(lattice, this.material(createWireframeLatticeMaterial())));

    // Longitudinal filaments pick out the continuous ribbon silhouette.
    const positions = membrane.getAttribute("position");
    const colors = membrane.getAttribute("color");
    const railMaterial = this.material(new LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.8, blending: AdditiveBlending, depthWrite: false, toneMapped: false,
    }));
    for (const column of [0, 6, 12, 18]) {
      const railPositions: number[] = [];
      const railColors: number[] = [];
      for (let ring = 0; ring <= 200; ring++) {
        const vertex = ring * 25 + column;
        railPositions.push(positions.getX(vertex), positions.getY(vertex), positions.getZ(vertex));
        railColors.push(colors.getX(vertex), colors.getY(vertex), colors.getZ(vertex));
      }
      const rail = this.geometry(new BufferGeometry());
      rail.setAttribute("position", new Float32BufferAttribute(railPositions, 3));
      rail.setAttribute("color", new Float32BufferAttribute(railColors, 3));
      this.knot.add(new Line(rail, railMaterial));
    }

    const shellMaterial = this.material(createParticleShellMaterial());
    shellMaterial.uniforms.uOpacity.value = 0.75;
    this.knot.add(new Points(this.geometry(createParticleShellGeometry(1080)), shellMaterial));

    // Reserve 120 of the 1,200 total points for luminous junctions on the ribbon.
    const junctions = this.geometry(new BufferGeometry());
    const junctionPositions: number[] = [];
    const junctionColors: number[] = [];
    const junctionPhases: number[] = [];
    const junctionSizes: number[] = [];
    for (let index = 0; index < 120; index++) {
      const vertex = Math.floor(index / 120 * 200) * 25 + (index * 7 % 24);
      junctionPositions.push(positions.getX(vertex), positions.getY(vertex), positions.getZ(vertex));
      junctionColors.push(colors.getX(vertex), colors.getY(vertex), colors.getZ(vertex));
      junctionPhases.push(index * 2.399963);
      junctionSizes.push(2.4 + index % 3 * 0.35);
    }
    junctions.setAttribute("position", new Float32BufferAttribute(junctionPositions, 3));
    junctions.setAttribute("color", new Float32BufferAttribute(junctionColors, 3));
    junctions.setAttribute("aPhase", new Float32BufferAttribute(junctionPhases, 1));
    junctions.setAttribute("aSize", new Float32BufferAttribute(junctionSizes, 1));
    const junctionMaterial = this.material(createParticleShellMaterial());
    junctionMaterial.uniforms.uOpacity.value = 1;
    this.knot.add(new Points(junctions, junctionMaterial));

    const orbitMaterial = this.material(new LineBasicMaterial({ color: "#00E5FF", transparent: true, opacity: 0.14, blending: AdditiveBlending, depthWrite: false }));
    for (let orbit = 0; orbit < 2; orbit++) {
      const vertices: number[] = [];
      for (let index = 0; index <= 160; index++) {
        const t = index / 160 * Math.PI * 2;
        vertices.push(3.3 * Math.cos(t), 1.15 * Math.sin(t) + Math.cos(t) * 0.75, Math.sin(t) * (0.8 + orbit * 0.35));
      }
      const geometry = this.geometry(new BufferGeometry());
      geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      const line = new Line(geometry, orbitMaterial);
      line.rotation.z = orbit * 0.24;
      this.knot.add(line);
    }
  }

  resize(width: number, height: number): void {
    if (!this.renderer || this.disposed || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;
    this.viewport = { width, height };
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5) * this.resolutionScale;
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    // Preserve the chosen view and pan target when the viewport or render resolution changes.
    if (this.controls) this.camera.position.sub(this.controls.target);
    const distance = fitCameraDistance(width, height);
    if (this.camera.position.lengthSq() === 0) this.camera.position.set(0, 0, distance);
    else this.camera.position.setLength(distance);
    if (this.controls) this.camera.position.add(this.controls.target);
    this.camera.updateProjectionMatrix();
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uPixelRatio) material.uniforms.uPixelRatio.value = ratio;
    }
    this.controls?.update();
    this.render();
  }

  setPointer(normX: number, normY: number): void {
    if (this.disposed || this.interacting) return;
    this.pointer.x = normalizePointer(normX);
    this.pointer.y = normalizePointer(normY);
  }

  rotateView(horizontal: number, vertical: number): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    const x = normalizePointer(horizontal);
    const y = normalizePointer(vertical);
    if (x) this.controls.rotateLeft(x * 0.16);
    if (y) this.controls.rotateUp(y * 0.16);
  }

  panView(horizontal: number, vertical: number): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    this.controls.pan(normalizePointer(horizontal) * 20, normalizePointer(vertical) * 20);
  }

  resetView(): void {
    if (this.disposed || this.contextLost || !this.controls) return;
    this.pointer = { x: 0, y: 0 };
    this.orbit = { x: 0, y: 0 };
    this.spin = 0;
    this.handleInteractionEnd();
    // Drain any remaining inertia before restoring the canonical, size-correct front view.
    this.controls.enableDamping = false;
    this.controls.update();
    this.controls.reset();
    this.controls.target.set(0, 0, 0);
    this.camera.position.set(0, 0, fitCameraDistance(this.viewport.width, this.viewport.height));
    this.controls.update();
    this.controls.saveState();
    this.controls.enableDamping = this.running;
    this.render();
  }

  start(): void {
    if (this.disposed || !this.renderer || this.running) return;
    this.running = true;
    if (this.controls) this.controls.enableDamping = true;
    this.lastTime = null;
    this.fpsTime = 0;
    this.frames = 0;
    this.slowSamples = 0;
    if (!this.contextLost) this.renderer.setAnimationLoop(this.tick);
  }

  stop(): void {
    this.running = false;
    this.lastTime = null;
    this.renderer?.setAnimationLoop(null);
    if (this.controls && !this.contextLost) {
      this.controls.enableDamping = false;
      this.controls.update();
    }
  }

  private tick = (time: number): void => {
    if (!this.running || this.disposed || this.contextLost) return;
    const delta = this.lastTime === null ? 0 : Math.min((time - this.lastTime) / 1000, 0.05);
    const rawDelta = this.lastTime === null ? 0 : (time - this.lastTime) / 1000;
    this.lastTime = time;
    this.elapsed += delta;
    if (!this.interacting) this.spin += delta * 0.025;
    const damping = 1 - Math.exp(-4 * delta);
    this.orbit.x += (this.pointer.x - this.orbit.x) * damping;
    this.orbit.y += (this.pointer.y - this.orbit.y) * damping;
    this.controls?.update(delta);
    for (const material of this.materials) {
      if (material instanceof ShaderMaterial && material.uniforms.uTime) material.uniforms.uTime.value = this.elapsed;
    }
    this.render();
    this.fpsTime += rawDelta;
    this.frames++;
    if (this.fpsTime >= 1) {
      const fps = Math.round((this.frames - 1) / this.fpsTime);
      this.options.onFps?.(fps);
      // Sustained GPU pressure lowers only raster resolution, preserving topology and camera fit.
      // Two slow seconds prevent a shader compilation or a single long task from triggering it.
      this.slowSamples = fps < 55 ? this.slowSamples + 1 : 0;
      if (this.slowSamples >= 2 && this.resolutionScale > 0.75) {
        this.resolutionScale = Math.max(0.75, this.resolutionScale * 0.85);
        this.slowSamples = 0;
        this.resize(this.viewport.width, this.viewport.height);
      }
      this.fpsTime = 0;
      this.frames = 1;
    }
  };

  private render(): void {
    if (!this.renderer || this.disposed || this.contextLost) return;
    this.knot.rotation.set(0.12 + this.orbit.y * 0.14, -0.18 + this.orbit.x * 0.2, -0.2 + this.spin);
    this.hoverRight.set(1, 0, 0).applyQuaternion(this.camera.quaternion);
    this.hoverUp.set(0, 1, 0).applyQuaternion(this.camera.quaternion);
    this.knot.position.copy(this.hoverRight).multiplyScalar(this.orbit.x * 0.12).addScaledVector(this.hoverUp, -this.orbit.y * 0.09);
    this.renderer.render(this.scene, this.camera);
  }

  private handleInteractionStart = (): void => {
    this.interacting = true;
    this.pointer = { x: 0, y: 0 };
    this.options.onInteractionChange?.(true);
  };

  private handleInteractionEnd = (): void => {
    if (!this.interacting) return;
    this.interacting = false;
    this.options.onInteractionChange?.(false);
  };

  private handleViewChange = (): void => {
    // Pausing the animation still allows deliberate dragging, keyboard input and reset.
    if (!this.running) this.render();
  };

  private handleContextLost = (event: Event): void => {
    event.preventDefault();
    this.contextLost = true;
    this.handleInteractionEnd();
    if (this.controls) this.controls.enabled = false;
    this.renderer?.setAnimationLoop(null);
    this.options.onContextChange?.("lost");
  };

  private handleContextRestored = (): void => {
    if (this.disposed) return;
    this.contextLost = false;
    if (this.controls) this.controls.enabled = true;
    this.lastTime = null;
    this.render();
    if (this.running) this.renderer?.setAnimationLoop(this.tick);
    this.options.onContextChange?.("restored");
  };

  getRenderer(): WebGLRenderer | null {
    return this.renderer;
  }

  dispose(): void {
    if (this.disposed) return;
    this.stop();
    this.disposed = true;
    this.handleInteractionEnd();
    if (this.controls) {
      this.controls.removeEventListener("start", this.handleInteractionStart);
      this.controls.removeEventListener("end", this.handleInteractionEnd);
      this.controls.removeEventListener("change", this.handleViewChange);
      this.controls.dispose();
      this.controls = null;
    }
    const renderer = this.renderer;
    this.renderer = null;
    if (renderer) {
      renderer.domElement.removeEventListener("webglcontextlost", this.handleContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", this.handleContextRestored);
    }
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.geometries.clear();
    this.materials.clear();
    this.knot.clear();
    this.scene.clear();
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    }
  }
}
]]>
    </file>
  </files>
</template>
