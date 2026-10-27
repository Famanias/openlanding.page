<template slug="lowtide" name="LOWTIDE">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "gsap": "^3.15.0",
        "lenis": "^1.3.27",
        "troika-three-text": "^0.52.5",
        "tone": "^15.1.22"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(lowtide)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Imbue, Onest, Xanh_Mono } from "next/font/google";
import "./lowtide/lowtide.css";

const display = Imbue({ subsets: ["latin"], weight: "variable", axes: ["opsz"], variable: "--font-lt-imbue" });
const body = Onest({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-lt-onest" });
const mono = Xanh_Mono({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-lt-xanh", preload: false });

export const metadata: Metadata = {
  title: "LOWTIDE — a sleep ring that lets the tide go out",
  description: "A titanium sleep ring with an app that has no feed and no notifications. One night on a moonlit tidal flat, told in five low tides.",
  openGraph: { title: "LOWTIDE — Let the tide go out", description: "A sleep ring for people who can't put the phone down.", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0A0D16", colorScheme: "dark" };

export default function LowtideLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lt-mode="table" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="lt-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/lowtide";

/** Static files the 3D world loads by URL (fonts for in-world text, the moon map). */
export const WORLD_FILES = {
  fonts: {
    display: `${BASE}/fonts/Imbue.ttf`,
    mono: `${BASE}/fonts/XanhMono-Regular.ttf`,
    monoItalic: `${BASE}/fonts/XanhMono-Italic.ttf`,
  },
  moon: `${BASE}/moon-2048.jpg`,
} as const;

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`lt-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="lt-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt}
        loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#0A0D16"/>
  <mask id="lt-icon-crescent">
    <rect width="32" height="32" fill="white"/>
    <circle cx="20.5" cy="9.5" r="8.4" fill="black"/>
  </mask>
  <circle cx="15" cy="13" r="10" fill="#EBD9A6" mask="url(#lt-icon-crescent)"/>
  <path d="M3 25.5c2.2-2.4 4.4-2.4 6.5 0s4.3 2.4 6.5 0 4.3-2.4 6.5 0 4.3 2.4 6.5 0" fill="none" stroke="#8FD3FF" stroke-width="1.8" stroke-linecap="round"/>
</svg>
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/lowtide.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-lt-night: #0A0D16;
  --color-lt-foam: #ECEFF0;
  --color-lt-moon: #EBD9A6;
  --color-lt-plankton: #8FD3FF;
  --color-lt-dusk: #7A8494;
  --color-lt-dawn: #F2B28C;
  --font-lt-display: var(--font-lt-imbue), "Times New Roman", serif;
  --font-lt-body: var(--font-lt-onest), ui-sans-serif, system-ui, sans-serif;
  --font-lt-mono: var(--font-lt-xanh), ui-monospace, monospace;
  --ease-lt-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-lt-tide: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-lt-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-lt-instant: 90ms;
  --dur-lt-fast: 180ms;
  --dur-lt-base: 420ms;
  --dur-lt-slow: 900ms;
  --dur-lt-tide: 1600ms;
  --lt-shift: 24px;
  --lt-stagger: 80ms;
}

:root { --lt-gutter: clamp(18px, 5vw, 72px); --lt-max: 1180px; }
* { box-sizing: border-box; }
html { background: var(--color-lt-night); }
body { margin: 0; }
:where(button, input, select, textarea) { font: inherit; color: inherit; }
:where(h1, h2, h3, p, ul, ol, figure, blockquote, dl, dd) { margin: 0; padding: 0; }
:where(ul, ol) { list-style: none; }
:focus-visible { outline: 2px solid var(--color-lt-moon); outline-offset: 4px; }
::selection { background: color-mix(in oklab, var(--color-lt-plankton) 35%, transparent); }

.lt-body { min-height: 100vh; background: var(--color-lt-night); color: var(--color-lt-foam); font-family: var(--font-lt-body); -webkit-font-smoothing: antialiased; overflow-x: clip; }
.lt-mono { font-family: var(--font-lt-mono); font-size: 13px; letter-spacing: .06em; }
.lt-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* Logo */
.lt-logo { display: inline-flex; align-items: center; gap: 10px; color: var(--color-lt-foam); }
.lt-logo__mark { width: 28px; height: 28px; flex: 0 0 auto; }
.lt-logo__moon { fill: var(--color-lt-moon); }
.lt-logo__wave { fill: none; stroke: var(--color-lt-plankton); stroke-width: 1.8; stroke-linecap: round; }
.lt-logo__word { font-family: var(--font-lt-display); font-size: 22px; letter-spacing: .02em; line-height: 1; }

.lt-placeholder { display: grid; place-items: center; min-height: 240px; background: color-mix(in oklab, var(--color-lt-foam) 6%, var(--color-lt-night)); color: var(--color-lt-dusk); }

/* ── Shared type ─────────────────────────────────────────────── */
.lt-display { font-family: var(--font-lt-display); font-weight: 420; font-variation-settings: "opsz" 100; font-size: clamp(3.4rem, 9vw, 8.5rem); line-height: .92; letter-spacing: -.01em; text-wrap: balance; }
.lt-display--2 { font-size: clamp(2.6rem, 6vw, 5.6rem); }
.lt-quiet { margin-top: 18px; max-width: 34ch; font-family: var(--font-lt-mono); font-style: italic; font-size: clamp(1.05rem, 1.6vw, 1.3rem); line-height: 1.5; color: color-mix(in oklab, var(--color-lt-foam) 72%, var(--color-lt-night)); }
.lt-eyebrow { display: flex; gap: 12px; align-items: baseline; margin-bottom: 18px; color: var(--color-lt-dusk); font-size: 14px; letter-spacing: .04em; }
.lt-eyebrow .lt-mono { color: var(--color-lt-moon); }

/* ── Tide table (the static page and the a11y mirror) ────────── */
.lt-table { position: relative; padding-bottom: 80px; }
.lt-hero { position: relative; min-height: 100svh; display: grid; align-content: end; padding: 0 var(--lt-gutter) clamp(48px, 10vh, 110px); overflow: hidden; }
.lt-hero__logo { position: absolute; top: 26px; left: var(--lt-gutter); z-index: 2; }
.lt-hero__copy { position: relative; z-index: 1; max-width: var(--lt-max); }
.lt-poster { position: absolute; inset: 0; width: 100%; height: 100%; }
.lt-poster__sky { fill: var(--color-lt-night); }
.lt-poster__glow-a { stop-color: color-mix(in oklab, var(--color-lt-moon) 22%, var(--color-lt-night)); }
.lt-poster__glow-b { stop-color: var(--color-lt-night); stop-opacity: 0; }
.lt-poster__moon { fill: var(--color-lt-moon); }
.lt-poster__headland { fill: color-mix(in oklab, var(--color-lt-dusk) 22%, var(--color-lt-night)); }
.lt-poster__sand { fill: color-mix(in oklab, var(--color-lt-dusk) 12%, var(--color-lt-night)); }
.lt-poster__streak-a { stop-color: var(--color-lt-moon); stop-opacity: .45; }
.lt-poster__streak-b { stop-color: var(--color-lt-moon); stop-opacity: 0; }
.lt-poster__tideline { fill: none; stroke: var(--color-lt-plankton); stroke-width: 1.4; }
.lt-hero::after { content: ""; position: absolute; inset: 40% 0 0; background: linear-gradient(to bottom, transparent, var(--color-lt-night) 85%); pointer-events: none; }

.lt-tide { display: grid; grid-template-columns: minmax(120px, 200px) 1fr; gap: clamp(20px, 5vw, 80px); width: min(var(--lt-max), calc(100% - var(--lt-gutter) * 2)); margin: 0 auto; padding: clamp(64px, 12vh, 140px) 0; border-top: 1px solid color-mix(in oklab, var(--color-lt-foam) 12%, transparent); }
.lt-tide__rail { display: grid; align-content: start; gap: 6px; position: sticky; top: 32px; }
.lt-tide__time { font-size: 28px; color: var(--color-lt-moon); }
.lt-tide__label { color: var(--color-lt-dusk); font-size: 14px; }
.lt-tide__body > * + * { margin-top: 22px; }
.lt-note { max-width: 52ch; line-height: 1.7; color: color-mix(in oklab, var(--color-lt-foam) 80%, var(--color-lt-night)); }

.lt-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 28px; margin-top: 40px !important; }
.lt-stat { display: grid; gap: 10px; }
.lt-stat__value { font-family: var(--font-lt-display); font-size: clamp(3rem, 6vw, 4.6rem); line-height: 1; color: var(--color-lt-plankton); }
.lt-stat__label { max-width: 26ch; color: color-mix(in oklab, var(--color-lt-foam) 78%, var(--color-lt-night)); line-height: 1.5; }

.lt-pools { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-top: 40px !important; }
.lt-pool { display: grid; gap: 10px; padding: 22px; border-radius: 999px 999px 28px 28px; background: radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, var(--color-lt-plankton) 14%, var(--color-lt-night)), var(--color-lt-night)); border: 1px solid color-mix(in oklab, var(--color-lt-plankton) 22%, transparent); }
.lt-pool__ring { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--color-lt-plankton); }
.lt-pool__name { font-family: var(--font-lt-display); font-size: 1.8rem; }
.lt-pool__line { color: color-mix(in oklab, var(--color-lt-foam) 78%, var(--color-lt-night)); line-height: 1.55; }

.lt-quotes { display: grid; gap: 28px; margin-top: 40px !important; }
.lt-quote p { font-family: var(--font-lt-display); font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.15; max-width: 30ch; }
.lt-quote footer { margin-top: 10px; color: var(--color-lt-dusk); }

.lt-specs { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0 32px; margin-top: 40px !important; }
.lt-specs > div { display: grid; gap: 4px; padding: 16px 0; border-bottom: 1px solid color-mix(in oklab, var(--color-lt-foam) 12%, transparent); }
.lt-specs dt { font-family: var(--font-lt-mono); color: var(--color-lt-dusk); font-size: 13px; }
.lt-specs dd { margin: 0; }

.lt-dawn { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-top: 40px !important; }
.lt-dawn__block { padding: clamp(20px, 3vw, 32px); border-radius: 24px; background: color-mix(in oklab, var(--color-lt-dawn) 8%, var(--color-lt-night)); border: 1px solid color-mix(in oklab, var(--color-lt-dawn) 24%, transparent); }
.lt-dawn__title { font-family: var(--font-lt-display); font-size: 2rem; margin-bottom: 18px; }

.lt-foot { display: grid; gap: 18px; width: min(var(--lt-max), calc(100% - var(--lt-gutter) * 2)); margin: 40px auto 0; padding-top: 40px; border-top: 1px solid color-mix(in oklab, var(--color-lt-foam) 12%, transparent); color: var(--color-lt-dusk); font-size: 14px; }
.lt-foot a { color: inherit; text-underline-offset: 3px; }
.lt-foot a:hover { color: var(--color-lt-foam); }
.lt-foot__sources { display: grid; gap: 6px; }
.lt-foot__note { font-size: 12px; }

/* ── Fields, calculator, form ────────────────────────────────── */
.lt-field { display: grid; gap: 8px; min-width: 0; border: 0; padding: 0; margin: 0; }
.lt-field--wide { grid-column: 1 / -1; }
.lt-field__label { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; letter-spacing: .03em; color: var(--color-lt-dusk); }
.lt-field__error { color: var(--color-lt-dawn); font-size: 14px; }
.lt-input { width: 100%; min-height: 46px; padding: 0 14px; border-radius: 12px; border: 1px solid color-mix(in oklab, var(--color-lt-foam) 22%, transparent); background: color-mix(in oklab, var(--color-lt-foam) 5%, var(--color-lt-night)); color: var(--color-lt-foam); color-scheme: dark; transition: border-color var(--dur-lt-fast) var(--ease-lt-out), background var(--dur-lt-fast) var(--ease-lt-out); }
.lt-input:hover { border-color: color-mix(in oklab, var(--color-lt-foam) 40%, transparent); }
.lt-input:focus-visible { outline: none; border-color: var(--color-lt-moon); background: color-mix(in oklab, var(--color-lt-moon) 8%, var(--color-lt-night)); }
.lt-input[aria-invalid="true"] { border-color: var(--color-lt-dawn); }
.lt-range { width: 100%; accent-color: var(--color-lt-moon); }

.lt-calc { display: grid; gap: 20px; }
.lt-calc__fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.lt-calc__line { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; }
.lt-calc__line .lt-mono { color: var(--color-lt-dusk); }
.lt-calc__wake { font-family: var(--font-lt-display); font-size: 1.8rem; color: var(--color-lt-moon); }
.lt-calc__chart { width: 100%; height: auto; margin-top: 12px; overflow: visible; }
.lt-calc__chart polyline { fill: none; stroke: var(--color-lt-plankton); stroke-width: 1.6; }
.lt-calc__chart circle { fill: var(--color-lt-moon); }
.lt-calc__error { color: var(--color-lt-dawn); }

.lt-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.lt-form__title { grid-column: 1 / -1; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; font-family: var(--font-lt-display); font-size: 2rem; }
.lt-form__title .lt-mono { font-family: var(--font-lt-mono); font-size: 13px; color: var(--color-lt-moon); align-self: center; }
.lt-finishes__row { display: flex; flex-wrap: wrap; gap: 10px; }
.lt-finish { position: relative; display: inline-flex; align-items: center; gap: 10px; min-height: 44px; padding: 0 16px 0 10px; border-radius: 999px; border: 1px solid color-mix(in oklab, var(--color-lt-foam) 22%, transparent); cursor: pointer; transition: border-color var(--dur-lt-fast) var(--ease-lt-out), transform var(--dur-lt-instant) var(--ease-lt-spring); }
.lt-finish input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; z-index: 1; }
.lt-finish:hover { border-color: color-mix(in oklab, var(--color-lt-foam) 45%, transparent); }
.lt-finish:has(input:checked) { border-color: var(--color-lt-moon); background: color-mix(in oklab, var(--color-lt-moon) 10%, transparent); }
.lt-finish:has(input:focus-visible) { outline: 2px solid var(--color-lt-moon); outline-offset: 3px; }
.lt-finish:active { transform: scale(.97); }
.lt-finish__swatch { width: 22px; height: 22px; border-radius: 50%; border: 1px solid color-mix(in oklab, var(--color-lt-foam) 30%, transparent); }
.lt-finish[data-finish="moonstone"] .lt-finish__swatch { background: radial-gradient(circle at 35% 30%, var(--color-lt-foam), var(--color-lt-dusk)); }
.lt-finish[data-finish="tidewater"] .lt-finish__swatch { background: radial-gradient(circle at 35% 30%, var(--color-lt-plankton), color-mix(in oklab, var(--color-lt-plankton) 30%, var(--color-lt-night))); }
.lt-finish[data-finish="driftwood"] .lt-finish__swatch { background: radial-gradient(circle at 35% 30%, var(--color-lt-dawn), color-mix(in oklab, var(--color-lt-dawn) 40%, var(--color-lt-night))); }

.lt-btn { grid-column: 1 / -1; position: relative; isolation: isolate; overflow: hidden; display: inline-flex; justify-content: center; align-items: center; min-height: 50px; border: 0; border-radius: 999px; background: var(--color-lt-moon); color: var(--color-lt-night); font-weight: 600; cursor: pointer; transition: transform var(--dur-lt-instant) var(--ease-lt-spring); }
.lt-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-lt-foam); transform: translateY(102%); border-radius: 999px 999px 0 0; transition: transform var(--dur-lt-base) var(--ease-lt-out); }
.lt-btn:hover::before { transform: none; border-radius: 0; }
.lt-btn:active { transform: scale(.98); }
.lt-btn:disabled { cursor: progress; opacity: .7; }
.lt-form[data-state="submitting"] .lt-btn span { animation: lt-breathe 1.2s var(--ease-lt-tide) infinite; }
.lt-form--done { display: grid; gap: 10px; place-items: start; }
.lt-form__sand { font-family: var(--font-lt-display); font-size: clamp(2.4rem, 4vw, 3.4rem); color: var(--color-lt-moon); }
.lt-form__note { color: var(--color-lt-dusk); }

@keyframes lt-breathe { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }

/* ── Experience mode: the 3D night owns the screen ───────────── */
html[data-lt-mode="experience"] .lt-table { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
html[data-lt-mode="experience"] { scrollbar-width: none; }
html[data-lt-mode="experience"]::-webkit-scrollbar { display: none; }
html.lenis, html.lenis body { height: auto; }
.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }

.lt-canvas { position: fixed; inset: 0; width: 100vw; height: 100vh; height: 100lvh; display: block; z-index: 0; opacity: 0; transition: opacity var(--dur-lt-tide) var(--ease-lt-out); touch-action: pan-y; }
/* while booting the canvas is invisible and must not swallow clicks meant for the tide table */
.lt-xp:not([data-ready="true"]) .lt-canvas { visibility: hidden; pointer-events: none; }
.lt-xp[data-ready="true"] .lt-canvas { opacity: 1; }
.lt-track { position: relative; height: 700vh; pointer-events: none; }

.lt-hud { position: fixed; inset: 0; z-index: 2; pointer-events: none; }
.lt-hud > * { pointer-events: auto; }
.lt-hud__logo { position: absolute; top: 24px; left: var(--lt-gutter); }

.lt-sound { position: absolute; top: 20px; right: var(--lt-gutter); display: inline-flex; align-items: center; gap: 10px; min-height: 40px; padding: 0 14px; border-radius: 999px; border: 1px solid color-mix(in oklab, var(--color-lt-foam) 22%, transparent); background: color-mix(in oklab, var(--color-lt-night) 55%, transparent); backdrop-filter: blur(10px); color: var(--color-lt-foam); font-size: 13px; cursor: pointer; transition: border-color var(--dur-lt-fast) var(--ease-lt-out), transform var(--dur-lt-instant) var(--ease-lt-spring); }
.lt-sound:hover { border-color: color-mix(in oklab, var(--color-lt-moon) 60%, transparent); }
.lt-sound:active { transform: scale(.96); }
.lt-sound__bars { display: inline-flex; align-items: end; gap: 2px; height: 12px; }
.lt-sound__bars i { width: 2px; height: 3px; border-radius: 2px; background: currentColor; transition: height var(--dur-lt-base) var(--ease-lt-out); }
.lt-sound[aria-pressed="true"] { border-color: var(--color-lt-moon); color: var(--color-lt-moon); }
.lt-sound[aria-pressed="true"] .lt-sound__bars i { animation: lt-bars 1.4s var(--ease-lt-tide) infinite; }
.lt-sound[aria-pressed="true"] .lt-sound__bars i:nth-child(2) { animation-delay: -.3s; }
.lt-sound[aria-pressed="true"] .lt-sound__bars i:nth-child(3) { animation-delay: -.7s; }
.lt-sound[aria-pressed="true"] .lt-sound__bars i:nth-child(4) { animation-delay: -1s; }
@keyframes lt-bars { 0%, 100% { height: 3px; } 50% { height: 12px; } }

.lt-dial { position: absolute; right: var(--lt-gutter); bottom: clamp(18px, 4vh, 40px); width: 132px; height: 132px; }
.lt-dial__face { position: absolute; inset: 0; border-radius: 50%; cursor: grab; touch-action: none; outline-offset: 6px; }
.lt-dial__face:active { cursor: grabbing; }
.lt-dial__face svg { width: 100%; height: 100%; overflow: visible; }
.lt-dial__disc { fill: color-mix(in oklab, var(--color-lt-night) 62%, transparent); stroke: color-mix(in oklab, var(--color-lt-foam) 12%, transparent); }
.lt-dial__arc { fill: none; stroke: color-mix(in oklab, var(--color-lt-foam) 18%, transparent); stroke-width: 1.5; stroke-linecap: round; }
.lt-dial__fill { fill: none; stroke: var(--color-lt-moon); stroke-width: 1.5; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
.lt-dial__moon { fill: var(--color-lt-moon); filter: drop-shadow(0 0 6px color-mix(in oklab, var(--color-lt-moon) 70%, transparent)); }
.lt-dial__readout { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 2px; pointer-events: none; }
.lt-dial__time { font-family: var(--font-lt-mono); font-size: 20px; color: var(--color-lt-foam); }
.lt-dial__label { font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: var(--color-lt-dusk); }
.lt-dial__notch { position: absolute; width: 18px; height: 18px; margin: -9px 0 0 -9px; padding: 0; border: 0; border-radius: 50%; background: transparent; cursor: pointer; }
.lt-dial__notch::before { content: ""; position: absolute; inset: 6px; border-radius: 50%; background: color-mix(in oklab, var(--color-lt-foam) 40%, transparent); transition: transform var(--dur-lt-fast) var(--ease-lt-spring), background var(--dur-lt-fast) var(--ease-lt-out); }
.lt-dial__notch:hover::before, .lt-dial__notch:focus-visible::before { transform: scale(1.6); background: var(--color-lt-moon); }

/* ── Dawn finale ─────────────────────────────────────────────── */
.lt-finale { position: fixed; inset: 0; z-index: 1; display: grid; grid-template-rows: 1fr auto; pointer-events: none; transition: opacity var(--dur-lt-base) var(--ease-lt-out), visibility 0s; }
.lt-finale[data-active="false"] { opacity: 0; visibility: hidden; transition: opacity var(--dur-lt-base) var(--ease-lt-out), visibility 0s var(--dur-lt-base); }
.lt-finale__panels, .lt-finale__strip { overscroll-behavior: contain; }
.lt-finale > * { pointer-events: auto; }
.lt-finale__strip { position: relative; margin: 14vh var(--lt-gutter) 0; border-radius: 28px; cursor: grab; touch-action: none; outline-offset: -6px; }
.lt-finale__strip:active { cursor: grabbing; }
.lt-finale__hint { position: absolute; left: 50%; bottom: 10px; transform: translateX(-50%); padding: 6px 12px; border-radius: 999px; background: color-mix(in oklab, var(--color-lt-night) 45%, transparent); color: var(--color-lt-foam); font-family: var(--font-lt-mono); font-size: 12px; letter-spacing: .04em; white-space: nowrap; }
.lt-finale__panels { display: grid; grid-template-columns: repeat(2, minmax(0, 460px)); gap: 18px; padding: 0 calc(var(--lt-gutter) + 150px) clamp(18px, 4vh, 40px) var(--lt-gutter); align-items: end; }
.lt-finale__panel { position: relative; overflow: hidden; display: grid; gap: 16px; padding: 22px; border-radius: 22px; background: color-mix(in oklab, var(--color-lt-night) 72%, transparent); border: 1px solid color-mix(in oklab, var(--color-lt-dawn) 30%, transparent); backdrop-filter: blur(16px) saturate(1.2); }
.lt-finale__title { font-family: var(--font-lt-display); font-size: 2rem; line-height: 1; }
.lt-finale__wash { position: absolute; inset: -10% 0; pointer-events: none; opacity: 0; transform: translateY(105%); background: linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-lt-plankton) 35%, var(--color-lt-night)) 30%, color-mix(in oklab, var(--color-lt-foam) 30%, var(--color-lt-night)) 50%, color-mix(in oklab, var(--color-lt-plankton) 35%, var(--color-lt-night)) 70%, transparent); }
.lt-btn--ghost { background: transparent; color: var(--color-lt-foam); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--color-lt-foam) 40%, transparent); }
.lt-btn--ghost::before { background: var(--color-lt-moon); }
.lt-btn--ghost:hover { color: var(--color-lt-night); }
@media (max-width: 860px) {
  .lt-finale__panels { grid-template-columns: 1fr; padding-right: var(--lt-gutter); padding-bottom: 170px; max-height: 70vh; overflow-y: auto; }
}

@media (max-width: 700px) {
  .lt-tide { grid-template-columns: 1fr; }
  .lt-tide__rail { position: static; grid-auto-flow: column; justify-content: start; gap: 14px; align-items: baseline; }
  .lt-calc__fields, .lt-form { grid-template-columns: 1fr; }
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0A0D16", color: "#ECEFF0", fontFamily: "serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, letterSpacing: 2 }}>
        <div style={{ width: 46, height: 46, borderRadius: 999, display: "flex", background: "#EBD9A6", boxShadow: "inset -14px -8px 0 0 #0A0D16" }} />
        lowtide
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>Let the tide go out.</div>
        <div style={{ display: "flex", fontSize: 30, color: "#8FD3FF" }}>A sleep ring for people who can&apos;t put the phone down.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: "#7A8494" }}>
        <span>23:04 — 07:00</span>
        <span>FIVE LOW TIDES</span>
      </div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/page.tsx">
<![CDATA[import { Experience } from "./experience/Experience";
import { TideTable } from "./tidetable/TideTable";

export default function LowtidePage() {
  return (
    <>
      <TideTable />
      <Experience />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/brand/Logo.tsx">
<![CDATA[type LogoProps = { variant?: "lockup" | "mark"; className?: string; title?: string };

/** A crescent moon whose lower edge breaks into a wave line: the tide going out under the moon. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={`lt-logo__mark ${className ?? ""}`} viewBox="0 0 32 32" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <mask id="lt-logo-crescent">
        <rect width="32" height="32" fill="white" />
        <circle cx="20.5" cy="9.5" r="8.4" fill="black" />
      </mask>
      <circle className="lt-logo__moon" cx="15" cy="13" r="10" mask="url(#lt-logo-crescent)" />
      <path className="lt-logo__wave" d="M3 25.5c2.2-2.4 4.4-2.4 6.5 0s4.3 2.4 6.5 0 4.3-2.4 6.5 0 4.3 2.4 6.5 0" />
    </svg>
  );
}

export function Logo({ variant = "lockup", className, title }: LogoProps) {
  if (variant === "mark") return <LogoMark className={className} title={title ?? "LOWTIDE"} />;
  return (
    <span className={`lt-logo ${className ?? ""}`}>
      <LogoMark />
      <span className="lt-logo__word">lowtide</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/content/story.ts">
<![CDATA[import type { ChapterId } from "../night/clock";

export type Chapter = {
  id: ChapterId;
  /** Short name used by the moon dial, the announcer and the tide table eyebrow. */
  label: string;
  /** The landing-page job this low tide does. */
  job: string;
  /** Revealed by the lantern. */
  headline: string;
  /** Rises when the visitor is still. */
  quietLine: string;
};

export const CHAPTERS: Chapter[] = [
  { id: "hook", label: "High tide", job: "The hook", headline: "Let the tide go out.", quietLine: "A sleep ring for people who can't put the phone down." },
  { id: "problem", label: "First low tide", job: "The problem", headline: "The scroll doesn't end. The night does.", quietLine: "Light sleep is where the phone keeps pulling you back up." },
  { id: "sensors", label: "Second low tide", job: "How it works", headline: "Three pools, read all night.", quietLine: "Heart, warmth and breath, measured on your finger. Nothing to check until morning." },
  { id: "smart-wake", label: "Third low tide", job: "Smart wake", headline: "We wake you on the outgoing tide.", quietLine: "A soft pulse at the lightest point of your last cycle, inside the window you choose." },
  { id: "proof", label: "Fourth low tide", job: "Proof", headline: "Footprints, before the water comes back.", quietLine: "From the first four hundred sleepers on the beta." },
  { id: "reveal", label: "Fifth low tide", job: "The ring", headline: "The moon, on your hand.", quietLine: "Titanium. Seven days a charge. $279, and nothing to subscribe to." },
  { id: "dawn", label: "Dawn", job: "Your night", headline: "Good morning.", quietLine: "Draw your own night, then keep the ring." },
];

export const chapter = (id: ChapterId) => CHAPTERS.find((c) => c.id === id)!;

/** Every figure is real and sourced; the plankton forms `value`. */
export const STATS = [
  {
    value: "1 in 3",
    label: "US adults usually sleep less than seven hours a night.",
    source: "CDC, MMWR 65(6), 2016",
    sourceUrl: "https://www.cdc.gov/mmwr/volumes/65/wr/mm6506a1.htm",
  },
  {
    value: "7h",
    label: "The least sleep adults need each night.",
    source: "CDC, Adult Sleep Facts and Stats",
    sourceUrl: "https://www.cdc.gov/sleep/data-research/facts-stats/adults-sleep-facts-and-stats.html",
  },
  {
    value: "95%",
    label: "use a screen in the hour before bed at least a few nights a week.",
    source: "National Sleep Foundation, Sleep in America poll, 2011 (via Harvard Health)",
    sourceUrl: "https://content.health.harvard.edu/blog/americans-have-screen-time-until-bedtime/",
  },
] as const;

export const SENSORS = [
  { id: "heart", name: "Heart rate", line: "Your resting pulse, beat by beat, tells light sleep from deep." },
  { id: "temperature", name: "Skin temperature", line: "A slow tide of warmth marks when your body is ready to let go." },
  { id: "breathing", name: "Breathing", line: "Breaths per minute, counted while you are under." },
] as const;

export const TESTIMONIALS = [
  { quote: "I stopped taking my phone to bed. There was nothing on the ring to check.", name: "Maya", city: "Lisbon" },
  { quote: "It woke me at 6:41 instead of 7:00 and I felt like I had been somewhere far away.", name: "Tomás", city: "Valparaíso" },
  { quote: "The first sleep tracker that doesn't want my attention back.", name: "Ines", city: "Rotterdam" },
] as const;

export const PRODUCT = {
  name: "LOWTIDE Ring",
  material: "Grade 5 titanium",
  sizes: [6, 7, 8, 9, 10, 11, 12, 13],
  finishes: [
    { id: "moonstone", name: "Moonstone" },
    { id: "tidewater", name: "Tidewater" },
    { id: "driftwood", name: "Driftwood" },
  ],
  batteryDays: 7,
  wakeWindowMin: [10, 30] as const,
  price: 279,
  subscription: false,
  app: "No feed. No notifications.",
} as const;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/camera.ts">
<![CDATA[import * as THREE from "three";
import { damp, lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { SHORE_LENGTH } from "./shore";
import type { Part, WorldCtx } from "./types";

/**
 * The visitor walks the shore: progress dollies the camera along x, with a slow breathing bob that the
 * roughness exaggerates and the stillness flattens. At dawn it lifts and tilts toward the sky.
 */
export function createCameraRig(ctx: WorldCtx): Part {
  const cam = ctx.camera;
  const look = new THREE.Vector3();
  let bob = 0;
  let sway = 0;
  return {
    update(f) {
      const x = f.p * SHORE_LENGTH;
      const dawn = smoothstep(CHAPTER_POINTS.reveal + 0.01, 1, f.p);
      const amp = 0.12 * (1 + f.roughness * 4) * (1 - f.calm * 0.8);
      bob = damp(bob, Math.sin(f.time * 0.45) * amp, 3, f.dt);
      sway = damp(sway, f.lantern.active ? f.lantern.x * 1.6 : 0, 1.5, f.dt);
      cam.position.set(x + sway, lerp(5.2, 7.5, dawn) + bob, 38);
      look.set(x + sway * 0.4, lerp(0.4, 9, dawn), -42);
      cam.lookAt(look);
      ctx.shared.uCameraPos.value.copy(cam.position);
    },
    dispose() {},
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/createWorld.ts">
<![CDATA[import * as THREE from "three";
import { chapterWeights } from "../night/beats";
import type { NightPlan } from "../night/your-night";
import { createCameraRig } from "./camera";
import { createFinaleStrip } from "./finaleStrip";
import { createFootprints, TRAILS } from "./footprints";
import { createPost } from "./post";
import { createRing } from "./ring";
import { createHeadland } from "./headland";
import { createWaterNormalMap } from "./normalMap";
import { createPlankton } from "./plankton";
import { createSand } from "./sand";
import { createSensorPools } from "./sensorPools";
import { waterLevel } from "./shore";
import { createSky } from "./sky";
import type { FontUrls, FrameInput, Part, SharedUniforms, World, WorldCtx } from "./types";
import { createWater } from "./water";
import { createWords } from "./words";

const NIGHT = new THREE.Color(0x0a0d16);

export async function createWorld(canvas: HTMLCanvasElement, opts: { fonts: FontUrls; moonUrl: string }): Promise<World> {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: false });
  renderer.setClearColor(NIGHT, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;
  const scene = new THREE.Scene();
  scene.background = NIGHT.clone();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 4000);
  camera.position.set(0, 6, 40);

  const shared: SharedUniforms = {
    uTime: { value: 0 },
    uTide: { value: 1 },
    uRoughness: { value: 0 },
    uCalm: { value: 0 },
    uProgress: { value: 0 },
    uLantern: { value: new THREE.Vector4(0, 0, 0.6, 0) },
    uResolution: { value: new THREE.Vector2(width, height) },
    uDawn: { value: 0 },
    uMoonDir: { value: new THREE.Vector3(0.2, 0.3, -1).normalize() },
    uMoonColor: { value: new THREE.Color(1, 0.93, 0.78) },
    uZenith: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uWaterY: { value: waterLevel(1) },
    uWetLine: { value: waterLevel(1) },
    uCameraPos: { value: camera.position.clone() },
  };

  const moon = await new THREE.TextureLoader().loadAsync(opts.moonUrl);
  const ctx: WorldCtx = {
    renderer,
    scene,
    camera,
    textures: { waterNormal: createWaterNormalMap(), moon },
    fonts: opts.fonts,
    shared,
    size: { width, height },
  };

  const trails = { value: TRAILS.map((t) => new THREE.Vector4(t.x, t.z, t.angle, 0)) };
  // Order matters: the camera moves first, the sky sets the shared colours, the water sets the waterline.
  const parts: Part[] = [
    createCameraRig(ctx),
    createSky(ctx),
    createHeadland(ctx),
    createWater(ctx),
    createSand(ctx, trails),
    createWords(ctx),
    createPlankton(ctx),
    createSensorPools(ctx),
    createFootprints(ctx, trails),
    createRing(ctx),
  ];
  const finale = createFinaleStrip(ctx);
  parts.push(finale.part);
  const post = createPost(ctx);
  let lostCb: (() => void) | null = null;
  const onLost = (e: Event) => {
    e.preventDefault();
    lostCb?.();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const world: World = {
    setFrame(f: FrameInput) {
      shared.uTime.value = f.time;
      shared.uTide.value = f.tide;
      shared.uRoughness.value = f.roughness;
      shared.uCalm.value = f.calm;
      shared.uProgress.value = f.p;
      shared.uLantern.value.set(f.lantern.x, f.lantern.y, f.lantern.radius, f.lantern.active ? 1 : 0);
      const w = chapterWeights(f.p);
      for (const part of parts) part.update(f, w);
      post.update(f.time, w);
      post.render();
    },
    setFinale(plan: NightPlan | null) {
      finale.setPlan(plan);
    },
    panFinale(dx: number) {
      finale.pan(dx);
    },
    snapshotFinale() {
      // render and capture in the same task, so the drawing buffer still holds the frame
      post.render();
      return new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("snapshot failed"))), "image/png"));
    },
    resize(w: number, h: number, dpr: number) {
      renderer.setPixelRatio(Math.min(dpr, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      ctx.size.width = w;
      ctx.size.height = h;
      const pr = renderer.getPixelRatio();
      shared.uResolution.value.set(w * pr, h * pr);
      for (const part of parts) part.resize?.(w, h);
      post.resize(w, h, pr);
    },
    onContextLost(cb) {
      lostCb = cb;
    },
    dispose() {
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const part of parts) part.dispose();
      post.dispose();
      renderer.dispose();
    },
  };

  world.resize(width, height, window.devicePixelRatio || 1);
  return world;
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/finaleStrip.ts">
<![CDATA[import * as THREE from "three";
import { clamp, damp } from "../motion/math";
import { formatClock } from "../night/clock";
import { CYCLE_MIN, type NightPlan } from "../night/your-night";
import { chapterX } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText, type WorldText } from "./worldText";

const UNITS_PER_MIN = 16 / CYCLE_MIN; // one sleep cycle = 16 world units of shoreline
const Y = 12;
const Z = -10;
const AMP = 1.7;

/** "Your night": the visitor's own tide line hung over the dawn water, one dip per cycle, smart wake marked. */
export function createFinaleStrip(ctx: WorldCtx) {
  const group = new THREE.Group();
  group.position.set(chapterX("dawn"), Y, Z);
  ctx.scene.add(group);

  const lineMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.56, 0.83, 1).multiplyScalar(1.4), transparent: true, toneMapped: false });
  const tickMat = new THREE.MeshBasicMaterial({ color: 0xecefF0, transparent: true, opacity: 0.5 });
  const markerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.92, 0.85, 0.65).multiplyScalar(2.2), transparent: true, toneMapped: false });
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), markerMat);
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.8, 48), markerMat);
  marker.add(halo);
  group.add(marker);

  let line: THREE.Mesh | null = null;
  let ticks: THREE.Mesh[] = [];
  let labels: WorldText[] = [];
  let length = 0;
  let panTarget = 0;
  let pan = 0;
  let presence = 0;

  const level = (min: number) => Math.cos((min / CYCLE_MIN) * Math.PI * 2) * AMP;

  function clear() {
    if (line) {
      group.remove(line);
      line.geometry.dispose();
      line = null;
    }
    ticks.forEach((t) => {
      group.remove(t);
      t.geometry.dispose();
    });
    labels.forEach((l) => {
      group.remove(l.mesh);
      l.dispose();
    });
    ticks = [];
    labels = [];
  }

  function label(text: string, x: number, y: number, size: number, color: THREE.ColorRepresentation, anchorY: "top" | "bottom") {
    const l = createWorldText(ctx, { text, font: ctx.fonts.mono, fontSize: size, mode: "always", color, anchorY, tear: 0.3 });
    l.mesh.position.set(x, y, 0);
    group.add(l.mesh);
    labels.push(l);
  }

  return {
    setPlan(plan: NightPlan | null) {
      clear();
      if (!plan) {
        length = 0;
        return;
      }
      length = plan.durationMin * UNITS_PER_MIN;
      const x0 = -length / 2;
      const pts: THREE.Vector3[] = [];
      const steps = Math.max(48, Math.round(plan.durationMin / 3));
      for (let i = 0; i <= steps; i++) {
        const m = (i / steps) * plan.durationMin;
        pts.push(new THREE.Vector3(x0 + m * UNITS_PER_MIN, level(m), 0));
      }
      line = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), steps * 2, 0.09, 8, false), lineMat);
      group.add(line);
      for (const b of plan.cycleBoundariesMin) {
        const t = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.9, 0.05), tickMat);
        t.position.set(x0 + b * UNITS_PER_MIN, level(b) - AMP * 0.2 - 0.9, 0);
        group.add(t);
        ticks.push(t);
      }
      marker.position.set(x0 + plan.smartWakeMin * UNITS_PER_MIN, level(plan.smartWakeMin), 0.1);
      label(formatClock(plan.bedMin), x0, -AMP - 1.1, 0.9, 0xecefF0, "top");
      label(formatClock(plan.wakeMin), x0 + length, -AMP - 1.1, 0.9, 0xecefF0, "top");
      label(`${formatClock(plan.bedMin + plan.smartWakeMin)}  we wake you here`, marker.position.x, marker.position.y + 1.2, 0.75, 0xebd9a6, "bottom");
      // open on the smart-wake moment, the part of the night that matters most
      panTarget = clamp(-marker.position.x * 0.75, -length / 2, length / 2);
    },
    /** Drag in screen pixels → walk the strip. */
    pan(dxPx: number) {
      panTarget = clamp(panTarget + dxPx * 0.06, -length / 2, length / 2);
    },
    part: {
      update(f, w) {
        presence = damp(presence, w.dawn > 0.5 && length > 0 ? 1 : 0, 3, f.dt);
        pan = damp(pan, panTarget, 6, f.dt);
        group.position.x = chapterX("dawn") + pan;
        group.visible = presence > 0.01;
        lineMat.opacity = presence;
        tickMat.opacity = presence * 0.5;
        markerMat.opacity = presence;
        halo.scale.setScalar(1 + 0.25 * Math.sin(f.time * 2.4));
        halo.lookAt(ctx.camera.position);
        labels.forEach((l) => (l.uWeight.value = presence));
      },
      dispose() {
        clear();
        lineMat.dispose();
        tickMat.dispose();
        markerMat.dispose();
        marker.geometry.dispose();
        halo.geometry.dispose();
      },
    } satisfies Part,
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/footprints.ts">
<![CDATA[import * as THREE from "three";
import { TESTIMONIALS } from "../content/story";
import { smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { chapterX, sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** Three trails walking away from the visitor, one per testimonial: (start x, start z, heading in radians). */
export const TRAILS = TESTIMONIALS.map((_, i) => ({
  x: chapterX("proof") - 9.5 + i * 9.5,
  z: 11,
  angle: -Math.PI / 2 + (i - 1) * 0.3,
}));

/** GLSL: footprints pressed in the sand along each trail; `w` washes a trail away (0 intact → 1 gone). */
export const FOOTPRINTS = /* glsl */ `
uniform vec4 uTrails[3];
float lt_prints(vec2 p) {
  float m = 0.0;
  for (int t = 0; t < 3; t++) {
    vec4 tr = uTrails[t];
    vec2 d = vec2(cos(tr.z), sin(tr.z));
    vec2 n = vec2(-d.y, d.x);
    vec2 rel = p - tr.xy;
    float along = dot(rel, d);
    if (along < -0.6 || along > 13.0) continue;
    float across = dot(rel, n);
    float k = floor(along / 1.3 + 0.5);
    float side = mod(k, 2.0) < 0.5 ? 1.0 : -1.0;
    vec2 q = vec2(along - k * 1.3, across - side * 0.3);
    float heel = 1.0 - smoothstep(0.7, 1.0, length((q - vec2(-0.16, 0.0)) / vec2(0.19, 0.14)));
    float ball = 1.0 - smoothstep(0.7, 1.0, length((q - vec2(0.16, 0.0)) / vec2(0.24, 0.17)));
    // the water comes back from the sea end (far along the trail) toward the visitor
    float wash = 1.0 - smoothstep(tr.w * 15.0 - 2.0, tr.w * 15.0, 13.0 - along);
    m = max(m, max(heel, ball) * (1.0 - wash) * smoothstep(13.0, 9.0, along));
  }
  return m;
}
`;

/** Testimonials written beside their trails; the returning tide washes trails and words away in turn. */
export function createFootprints(ctx: WorldCtx, trailUniform: { value: THREE.Vector4[] }): Part {
  const quotes = TESTIMONIALS.map((t, i) => {
    const tr = TRAILS[i];
    const z = tr.z + 2.2;
    const q = createWorldText(ctx, {
      text: `“${t.quote}”\n${t.name}, ${t.city}`,
      font: ctx.fonts.display, fontSize: 0.6, maxWidth: 8.2, mode: "always", color: 0xecefF0, anchorY: "bottom", lineHeight: 1.2, tear: 0.6,
    });
    q.mesh.position.set(tr.x, sandBase(z) + 0.06, z);
    q.mesh.rotation.x = -Math.PI / 2 + 0.5;
    ctx.scene.add(q.mesh);
    return q;
  });

  return {
    update(f, w) {
      quotes.forEach((q, i) => {
        // after the fourth low tide the water comes back and takes each trail in turn
        const start = CHAPTER_POINTS.proof + 0.004 + i * 0.008;
        const wash = smoothstep(start, start + 0.026, f.p);
        trailUniform.value[i].w = wash;
        q.uFade.value = 1 - wash;
        q.uWeight.value = Math.max(w.proof, smoothstep(CHAPTER_POINTS.proof - 0.05, CHAPTER_POINTS.proof, f.p) * (1 - wash));
        q.mesh.visible = q.uWeight.value * q.uFade.value > 0.001;
      });
    },
    dispose() {
      quotes.forEach((q) => q.dispose());
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/glsl.ts">
<![CDATA[/** GLSL shared by the world's shaders. */

export const NOISE = /* glsl */ `
float lt_hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float lt_noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(lt_hash(i), lt_hash(i + vec2(1.0, 0.0)), u.x), mix(lt_hash(i + vec2(0.0, 1.0)), lt_hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float lt_fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * lt_noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
  return v;
}
`;

/** Screen-space lantern: a soft pool of warm light around the pointer. */
export const LANTERN = /* glsl */ `
uniform vec4 uLantern;
uniform vec2 uResolution;
const vec3 LT_LANTERN_COLOR = vec3(1.0, 0.84, 0.6);
float lt_lantern() {
  vec2 ndc = gl_FragCoord.xy / uResolution * 2.0 - 1.0;
  vec2 d = ndc - uLantern.xy;
  d.x *= uResolution.x / uResolution.y;
  float r = uLantern.z;
  return 1.0 - smoothstep(r * 0.15, r, length(d));
}
`;

/** Distance fog toward the horizon colour. */
export const FOG = /* glsl */ `
vec3 lt_fog(vec3 col, vec3 worldPos, vec3 camPos, vec3 horizon) {
  float d = length(worldPos - camPos);
  float f = 1.0 - exp(-pow(d / 900.0, 1.6));
  return mix(col, horizon, clamp(f, 0.0, 1.0));
}
`;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/glyphPoints.ts">
<![CDATA[/** A tiny drawing surface: enough to rasterise a word and read back its coverage. */
export type GlyphCanvas = {
  width: number;
  height: number;
  clear(): void;
  drawText(text: string): void;
  alpha(): Uint8ClampedArray;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Rasterise `text` and scatter `count` points over its filled pixels.
 * Returns xy pairs in a width-normalised box: x ∈ [−0.5, 0.5], y scaled by the canvas aspect, centred, y up.
 */
export function sampleGlyphPoints(text: string, count: number, canvas: GlyphCanvas, seed: number): Float32Array {
  canvas.clear();
  canvas.drawText(text);
  const a = canvas.alpha();
  const filled: number[] = [];
  for (let i = 0; i < canvas.width * canvas.height; i++) if (a[i * 4 + 3] > 128) filled.push(i);
  const out = new Float32Array(count * 2);
  if (!filled.length) return out;
  const rand = mulberry32(seed);
  for (let k = 0; k < count; k++) {
    const i = filled[Math.floor(rand() * filled.length)];
    const px = (i % canvas.width) + rand() * 0.98;
    const py = Math.floor(i / canvas.width) + rand() * 0.98;
    out[k * 2] = Math.min(0.5, px / canvas.width - 0.5);
    out[k * 2 + 1] = -(py / canvas.height - 0.5) * (canvas.height / canvas.width);
  }
  return out;
}

/** The browser version: a 2D canvas drawing the word in the display face, as large as fits. */
export function createBrowserGlyphCanvas(fontFamily: string, width = 640, height = 240): GlyphCanvas {
  const el = document.createElement("canvas");
  el.width = width;
  el.height = height;
  const g = el.getContext("2d", { willReadFrequently: true })!;
  return {
    width,
    height,
    clear: () => g.clearRect(0, 0, width, height),
    drawText(text: string) {
      let size = height * 0.86;
      g.font = `600 ${size}px ${fontFamily}`;
      const w = g.measureText(text).width;
      if (w > width * 0.94) size *= (width * 0.94) / w;
      g.font = `600 ${size}px ${fontFamily}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = "white";
      g.fillText(text, width / 2, height / 2 + size * 0.04);
    },
    alpha: () => g.getImageData(0, 0, width, height).data,
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/headland.ts">
<![CDATA[import * as THREE from "three";
import { NOISE } from "./glsl";
import { SHORE_LENGTH } from "./shore";
import type { Part, WorldCtx } from "./types";

const LAYERS = [
  { z: -1100, height: 150, seed: 3.1, freq: 0.0024, base: 0.18, haze: 0.85 },
  { z: -760, height: 110, seed: 8.7, freq: 0.0036, base: 0.12, haze: 0.62 },
  { z: -480, height: 70, seed: 1.9, freq: 0.0055, base: 0.05, haze: 0.4 },
];

/** Three procedural ridgelines on the far side of the bay; nearer ones slide faster as the camera walks the shore. */
export function createHeadland(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const mats: THREE.ShaderMaterial[] = [];
  for (const L of LAYERS) {
    const width = 3600;
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      fog: false,
      uniforms: {
        uHorizon: ctx.shared.uHorizon,
        uZenith: ctx.shared.uZenith,
        uMoonColor: ctx.shared.uMoonColor,
        uDawn: ctx.shared.uDawn,
        uSeed: { value: L.seed },
        uFreq: { value: L.freq },
        uBase: { value: L.base },
        uHaze: { value: L.haze },
        uHeight: { value: L.height },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv; varying vec3 vWorld;
        void main() {
          vUv = uv;
          vec4 w = modelMatrix * vec4(position, 1.0);
          vWorld = w.xyz;
          gl_Position = projectionMatrix * viewMatrix * w;
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uHorizon; uniform vec3 uZenith; uniform vec3 uMoonColor; uniform float uDawn;
        uniform float uSeed; uniform float uFreq; uniform float uBase; uniform float uHaze; uniform float uHeight;
        varying vec2 vUv; varying vec3 vWorld;
        ${NOISE}
        void main() {
          float x = vWorld.x * uFreq + uSeed * 10.0;
          float ridge = uBase + 0.55 * lt_fbm(vec2(x, uSeed)) + 0.25 * pow(lt_noise(vec2(x * 0.35, uSeed * 2.0)), 2.0);
          float y = vUv.y;
          float edge = smoothstep(ridge, ridge - 0.004, y);
          if (edge <= 0.001) discard;
          vec3 land = mix(vec3(0.006, 0.008, 0.014), uZenith * 0.6, 0.3);
          vec3 col = mix(land, uHorizon, uHaze);
          // a thin moonlit rim along the ridge
          col += uMoonColor * smoothstep(ridge - 0.02, ridge, y) * 0.05 * (1.0 - uHaze);
          col = mix(col, uHorizon * 1.05, uDawn * uHaze * 0.5);
          gl_FragColor = vec4(col, edge);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, L.height), mat);
    mesh.position.set(SHORE_LENGTH / 2, L.height / 2 - 6, L.z);
    mesh.renderOrder = -5;
    group.add(mesh);
  }
  ctx.scene.add(group);
  return {
    update() {},
    dispose() {
      group.children.forEach((m) => (m as THREE.Mesh).geometry.dispose());
      mats.forEach((m) => m.dispose());
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/normalMap.ts">
<![CDATA[import * as THREE from "three";

/**
 * A tileable water normal map generated at boot (the npm package doesn't ship the examples' waternormals.jpg).
 * Height = a few octaves of periodic value noise; normals by central differences.
 */
export function createWaterNormalMap(size = 256, seed = 7): THREE.DataTexture {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const octaves = [8, 16, 32, 64].map((period, i) => {
    const grid = new Float32Array(period * period).map(() => rand());
    return { period, grid, amp: 1 / (i + 1.4) };
  });
  const sample = (o: { period: number; grid: Float32Array }, x: number, y: number) => {
    const fx = (x / size) * o.period;
    const fy = (y / size) * o.period;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = fx - x0;
    const ty = fy - y0;
    const ux = tx * tx * (3 - 2 * tx);
    const uy = ty * ty * (3 - 2 * ty);
    const g = (gx: number, gy: number) => o.grid[(((gy % o.period) + o.period) % o.period) * o.period + (((gx % o.period) + o.period) % o.period)];
    const a = g(x0, y0) + (g(x0 + 1, y0) - g(x0, y0)) * ux;
    const b = g(x0, y0 + 1) + (g(x0 + 1, y0 + 1) - g(x0, y0 + 1)) * ux;
    return a + (b - a) * uy;
  };
  const height = new Float32Array(size * size);
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) height[y * size + x] = octaves.reduce((h, o) => h + sample(o, x, y) * o.amp, 0);

  const data = new Uint8Array(size * size * 4);
  const h = (x: number, y: number) => height[(((y + size) % size) * size) + ((x + size) % size)];
  const strength = 6;
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = (h(x + 1, y) - h(x - 1, y)) * strength;
      const dy = (h(x, y + 1) - h(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      data[i + 3] = 255;
    }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/plankton.ts">
<![CDATA[import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { STATS } from "../content/story";
import { damp } from "../motion/math";
import { createBrowserGlyphCanvas, sampleGlyphPoints } from "./glyphPoints";
import { chapterX, CONTENT_Z, SLOPE } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

const SIZE = 192; // 36 864 plankton
const STAT_SECONDS = 6;
const FIGURE = new THREE.Vector3(chapterX("problem"), 16.5, CONTENT_Z - 10);
const FIGURE_WIDTH = 34;

const VELOCITY = /* glsl */ `
uniform float uDt; uniform float uTime; uniform float uForm; uniform float uRough;
uniform float uCamX; uniform float uWaterY; uniform float uShoreZ; uniform float uAspect;
uniform sampler2D uTarget; uniform sampler2D uSeedTex;
uniform vec3 uFigure; uniform float uFigureW;
uniform mat4 uViewProj; uniform vec4 uLantern; uniform vec3 uCamRight; uniform vec3 uCamUp;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 p = texture2D(texturePosition, uv).xyz;
  vec3 v = texture2D(textureVelocity, uv).xyz;
  vec4 s = texture2D(uSeedTex, uv);
  // home: a glowing drift in the shallows around the visitor
  vec3 home = vec3(uCamX + (s.x - 0.5) * 150.0, uWaterY + 0.12 + s.y * 0.5, uShoreZ - 3.0 - s.z * 45.0);
  home += vec3(sin(uTime * 0.3 + s.w * 20.0), 0.15 * sin(uTime * 0.5 + s.x * 30.0), cos(uTime * 0.25 + s.y * 10.0)) * 1.6;
  vec2 g = texture2D(uTarget, uv).xy;
  vec3 glyph = uFigure + vec3(g.x * uFigureW, g.y * uFigureW, (s.z - 0.5) * 0.8);
  vec3 target = mix(home, glyph, uForm);
  vec3 acc = (target - p) * mix(1.1, 7.0, uForm) - v * mix(1.5, 3.8, uForm);
  // the lantern parts the swarm
  vec4 clip = uViewProj * vec4(p, 1.0);
  if (clip.w > 0.0) {
    vec2 d = clip.xy / clip.w - uLantern.xy;
    d.x *= uAspect;
    float L = length(d);
    float r = uLantern.z * 0.75;
    if (L < r && uLantern.w > 0.5) {
      vec2 dir = d / max(L, 1e-4);
      acc += (uCamRight * dir.x + uCamUp * dir.y) * (1.0 - L / r) * 140.0;
    }
  }
  // fast scrolling scatters everything
  acc += (s.xyz - 0.5) * uRough * 220.0 * (0.5 + 0.5 * sin(uTime * 9.0 + s.w * 40.0));
  v += acc * uDt;
  gl_FragColor = vec4(v, 1.0);
}`;

const POSITION = /* glsl */ `
uniform float uDt; uniform float uCamX;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 p = texture2D(texturePosition, uv);
  vec3 v = texture2D(textureVelocity, uv).xyz;
  p.xyz += v * uDt;
  // plankton left far behind re-enters ahead of the visitor
  if (abs(p.x - uCamX) > 95.0) p.x = uCamX - sign(p.x - uCamX) * 90.0;
  gl_FragColor = p;
}`;

/** Bioluminescent plankton: an ambient drift all night that swarms into each statistic at the first low tide. */
export function createPlankton(ctx: WorldCtx): Part {
  const { renderer, camera, shared } = ctx;
  const gpu = new GPUComputationRenderer(SIZE, SIZE, renderer);
  const pos0 = gpu.createTexture();
  const vel0 = gpu.createTexture();
  const seeds = new Float32Array(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    seeds.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    pos0.image.data!.set([(Math.random() - 0.5) * 150, shared.uWaterY.value + 0.3, -10 - Math.random() * 40, 1], i * 4);
  }
  const seedTex = new THREE.DataTexture(seeds, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
  seedTex.needsUpdate = true;
  const targetData = new Float32Array(SIZE * SIZE * 4);
  const targetTex = new THREE.DataTexture(targetData, SIZE, SIZE, THREE.RGBAFormat, THREE.FloatType);
  targetTex.needsUpdate = true;

  const velVar = gpu.addVariable("textureVelocity", VELOCITY, vel0);
  const posVar = gpu.addVariable("texturePosition", POSITION, pos0);
  gpu.setVariableDependencies(velVar, [velVar, posVar]);
  gpu.setVariableDependencies(posVar, [velVar, posVar]);
  const vu = velVar.material.uniforms;
  Object.assign(vu, {
    uDt: { value: 0 }, uTime: shared.uTime, uForm: { value: 0 }, uRough: shared.uRoughness,
    uCamX: { value: 0 }, uWaterY: shared.uWaterY, uShoreZ: { value: 0 }, uAspect: { value: 1 },
    uTarget: { value: targetTex }, uSeedTex: { value: seedTex },
    uFigure: { value: FIGURE }, uFigureW: { value: FIGURE_WIDTH },
    uViewProj: { value: new THREE.Matrix4() }, uLantern: shared.uLantern,
    uCamRight: { value: new THREE.Vector3() }, uCamUp: { value: new THREE.Vector3() },
  });
  const pu = posVar.material.uniforms;
  Object.assign(pu, { uDt: vu.uDt, uCamX: vu.uCamX });
  const err = gpu.init();
  if (err) throw new Error(`plankton: ${err}`);

  // points that read their position from the simulation
  const geo = new THREE.BufferGeometry();
  const ref = new Float32Array(SIZE * SIZE * 2);
  for (let i = 0; i < SIZE * SIZE; i++) ref.set([(i % SIZE + 0.5) / SIZE, (Math.floor(i / SIZE) + 0.5) / SIZE], i * 2);
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(SIZE * SIZE * 3), 3));
  geo.setAttribute("ref", new THREE.BufferAttribute(ref, 2));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uPos: { value: null as THREE.Texture | null }, uForm: vu.uForm, uScale: { value: 1 }, uTime: shared.uTime, uDawn: shared.uDawn },
    vertexShader: /* glsl */ `
      attribute vec2 ref;
      uniform sampler2D uPos; uniform float uScale; uniform float uForm; uniform float uTime;
      varying float vTw;
      void main() {
        vec3 p = texture2D(uPos, ref).xyz;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vTw = 0.55 + 0.45 * sin(uTime * 2.3 + ref.x * 91.0 + ref.y * 57.0);
        gl_PointSize = clamp((0.13 + 0.09 * uForm) * uScale / -mv.z, 1.0, 9.0);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uForm; uniform float uDawn;
      varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = vec3(0.45, 0.8, 1.0) * (0.22 + 0.4 * uForm) * vTw;
        gl_FragColor = vec4(col * a * (1.0 - uDawn * 0.8), a);
      }`,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.renderOrder = 6;
  ctx.scene.add(points);

  // the statistic's words, under the figure
  const label = createWorldText(ctx, { text: STATS[0].label, font: ctx.fonts.mono, fontSize: 1.05, maxWidth: 30, mode: "always", color: 0xbfe6ff, anchorY: "top", tear: 0.8 });
  label.mesh.position.set(FIGURE.x, FIGURE.y - 5.2, FIGURE.z);
  ctx.scene.add(label.mesh);

  const glyphs = typeof document !== "undefined" ? createBrowserGlyphCanvas(readDisplayFamily()) : null;
  let statIndex = -1;
  let form = 0;
  const viewProj = new THREE.Matrix4();

  function showStat(i: number) {
    statIndex = i;
    if (!glyphs) return;
    const pts = sampleGlyphPoints(STATS[i].value, SIZE * SIZE, glyphs, 11 + i);
    for (let k = 0; k < SIZE * SIZE; k++) {
      targetData[k * 4] = pts[k * 2];
      targetData[k * 4 + 1] = pts[k * 2 + 1];
    }
    targetTex.needsUpdate = true;
    label.setText(STATS[i].label);
    form = Math.min(form, 0.55); // loosen the swarm, then let it pull into the new figure
  }

  return {
    update(f, w) {
      const weight = w.problem;
      if (weight > 0.4) {
        const i = Math.floor(f.time / STAT_SECONDS) % STATS.length;
        if (i !== statIndex) showStat(i);
      }
      form = damp(form, weight > 0.4 ? 1 : 0, weight > 0.4 ? 1.4 : 3, f.dt);
      vu.uForm.value = form * weight;
      // keep the swarm in real time when frames are slow: up to four fixed sub-steps
      const steps = Math.min(4, Math.max(1, Math.ceil(f.dt / (1 / 30))));
      vu.uDt.value = f.dt / steps;
      vu.uCamX.value = camera.position.x;
      vu.uShoreZ.value = shared.uWaterY.value / SLOPE;
      vu.uAspect.value = ctx.size.width / ctx.size.height;
      camera.updateMatrixWorld();
      viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      vu.uViewProj.value.copy(viewProj);
      vu.uCamRight.value.setFromMatrixColumn(camera.matrixWorld, 0);
      vu.uCamUp.value.setFromMatrixColumn(camera.matrixWorld, 1);
      for (let s = 0; s < steps; s++) gpu.compute();
      mat.uniforms.uPos.value = gpu.getCurrentRenderTarget(posVar).texture;
      mat.uniforms.uScale.value = ctx.size.height * renderer.getPixelRatio() * 0.9;
      label.uWeight.value = Math.max(0, weight * form * 1.2 - 0.2);
      label.mesh.visible = weight > 0.01;
    },
    dispose() {
      gpu.dispose();
      geo.dispose();
      mat.dispose();
      seedTex.dispose();
      targetTex.dispose();
      label.dispose();
    },
  };
}

function readDisplayFamily() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-lt-imbue").trim();
  return v ? `${v}, serif` : "serif";
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/pools.ts">
<![CDATA[import type { ChapterId } from "../night/clock";
import { chapterX, CONTENT_Z } from "./shore";

export type Pool = { id: string; chapter: ChapterId; x: number; z: number; r: number; depth: number };

/** Rock pools the low tide leaves behind. Sensor pools and the reveal pool get their own surfaces later. */
export const POOLS: Pool[] = [
  { id: "problem-a", chapter: "problem", x: chapterX("problem") - 16, z: CONTENT_Z + 6, r: 3.2, depth: 0.35 },
  { id: "problem-b", chapter: "problem", x: chapterX("problem") + 19, z: CONTENT_Z - 4, r: 2.4, depth: 0.3 },
  // sensor and reveal pools sit closer to the visitor, still below the high-water line (z < 17)
  { id: "heart", chapter: "sensors", x: chapterX("sensors") - 15, z: 3, r: 5.6, depth: 0.45 },
  { id: "temperature", chapter: "sensors", x: chapterX("sensors"), z: 1, r: 5.6, depth: 0.45 },
  { id: "breathing", chapter: "sensors", x: chapterX("sensors") + 15, z: 3, r: 5.6, depth: 0.45 },
  { id: "wake", chapter: "smart-wake", x: chapterX("smart-wake") + 12, z: CONTENT_Z + 7, r: 3.6, depth: 0.35 },
  { id: "reveal", chapter: "reveal", x: chapterX("reveal"), z: 4, r: 7.5, depth: 0.5 },
  { id: "dawn", chapter: "dawn", x: chapterX("dawn") - 18, z: CONTENT_Z + 8, r: 3, depth: 0.3 },
];

export const MAX_POOLS = 12;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/poolSurface.ts">
<![CDATA[import * as THREE from "three";
import { LANTERN, NOISE } from "./glsl";
import type { Pool } from "./pools";
import { SLOPE } from "./shore";
import type { WorldCtx } from "./types";

/**
 * A still pool surface laid in a rock pool's basin. `effect` is GLSL that may change `col` (vec3) and `glow` (float)
 * using `r` (0 centre → 1 rim), `uv` (−1…1), `uTime`, `uPulse` and `uAmount`.
 */
export function createPoolSurface(ctx: WorldCtx, pool: Pool, effect: string) {
  const { shared } = ctx;
  const rim = SLOPE * pool.z - 0.06;
  const uAmount = { value: 0 };
  const uPulse = { value: 0 };
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uAmount, uPulse,
      uTime: shared.uTime, uZenith: shared.uZenith, uHorizon: shared.uHorizon, uMoonDir: shared.uMoonDir, uMoonColor: shared.uMoonColor,
      uCam: shared.uCameraPos, uLantern: shared.uLantern, uResolution: shared.uResolution, uCalm: shared.uCalm, uRoughness: shared.uRoughness,
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv; varying vec3 vWorld;
      void main() {
        vUv = uv * 2.0 - 1.0;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uAmount; uniform float uPulse; uniform float uTime; uniform float uCalm; uniform float uRoughness;
      uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform vec3 uCam;
      varying vec2 vUv; varying vec3 vWorld;
      ${NOISE}
      ${LANTERN}
      void main() {
        vec2 uv = vUv;
        float r = length(uv);
        if (r > 1.0) discard;
        vec3 V = normalize(uCam - vWorld);
        vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
        vec3 col = mix(uHorizon, uZenith, smoothstep(0.0, 0.5, R.y)) * 1.2;
        col += uMoonColor * pow(max(dot(R, normalize(uMoonDir)), 0.0), 500.0) * 0.8;
        float glow = 0.0;
        ${effect}
        float lt = lt_lantern();
        col += vec3(1.0, 0.84, 0.6) * lt * 0.12;
        float edge = smoothstep(1.0, 0.82, r);
        gl_FragColor = vec4(col + vec3(0.45, 0.8, 1.0) * glow * uAmount, edge * 0.94);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(pool.r * 0.66, 64), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(pool.x, rim, pool.z);
  mesh.renderOrder = 3;
  return {
    mesh,
    rim,
    uAmount,
    uPulse,
    /** Visible only once the sea has dropped below the rim. */
    update(waterY: number) {
      mesh.visible = waterY < rim - 0.02;
    },
    dispose() {
      mesh.geometry.dispose();
      mat.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/post.ts">
<![CDATA[import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { NOISE } from "./glsl";
import type { Weights, WorldCtx } from "./types";

/**
 * The finishing passes: a soft bloom (moon, plankton, the ring), the ink melt that bleeds the third low tide's
 * headline as you arrive and resolves when you stop, then grain and a vignette.
 */
const InkGrainShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uMelt: { value: 0 }, uGrain: { value: 0.035 }, uRes: { value: new THREE.Vector2(1, 1) } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uMelt; uniform float uGrain; uniform vec2 uRes;
    varying vec2 vUv;
    ${NOISE}
    void main() {
      vec2 uv = vUv;
      // ink in water: a slow domain warp plus drips that run down from the headline band
      float band = smoothstep(0.25, 0.5, uv.y) * smoothstep(0.85, 0.55, uv.y);
      vec2 warp = vec2(lt_fbm(uv * vec2(3.0, 6.0) + vec2(0.0, -uTime * 0.15)) - 0.5,
                       lt_fbm(uv * 4.0 + 7.0 + uTime * 0.1) - 0.5) * 0.07 * uMelt;
      warp.y += uMelt * band * 0.05 * lt_noise(vec2(uv.x * 38.0, uTime * 0.25));
      vec4 c = texture2D(tDiffuse, uv + warp);
      vec4 b = texture2D(tDiffuse, uv + warp * 2.2);
      c.rgb = mix(c.rgb, max(c.rgb, b.rgb) * 0.92, uMelt * band * 0.7);
      float v = smoothstep(1.2, 0.35, length((uv - 0.5) * vec2(1.25, 1.0)) * 1.35);
      c.rgb *= mix(0.68, 1.0, v);
      float g = lt_hash(floor(uv * uRes) + vec2(fract(uTime * 7.3) * 113.0, fract(uTime * 3.1) * 71.0)) - 0.5;
      c.rgb += g * uGrain * (0.4 + 0.6 * dot(c.rgb, vec3(0.33)));
      gl_FragColor = c;
    }`,
};

export function createPost(ctx: WorldCtx) {
  const composer = new EffectComposer(ctx.renderer);
  composer.addPass(new RenderPass(ctx.scene, ctx.camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(ctx.size.width, ctx.size.height), 0.55, 0.65, 0.78);
  composer.addPass(bloom);
  const ink = new ShaderPass(InkGrainShader);
  composer.addPass(ink);
  composer.addPass(new OutputPass());

  return {
    update(time: number, w: Weights) {
      ink.uniforms.uTime.value = time;
      // strongest mid-arrival, gone once the visitor settles on the third low tide
      const s = w["smart-wake"];
      ink.uniforms.uMelt.value = 4 * s * (1 - s);
    },
    render() {
      composer.render();
    },
    resize(w: number, h: number, pr: number) {
      composer.setPixelRatio(pr);
      composer.setSize(w, h);
      ink.uniforms.uRes.value.set(w * pr, h * pr);
    },
    dispose() {
      composer.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/ring.ts">
<![CDATA[import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { PRODUCT } from "../content/story";
import { lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { createPoolSurface } from "./poolSurface";
import { POOLS } from "./pools";
import { sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** The moon's reflection in the reveal pool: it ripples, bends into a ring outline, then fades as the ring rises. */
const REFLECTION = /* glsl */ `
  vec2 q = uv + 0.035 * sin(vec2(uv.y, uv.x) * 16.0 + uTime * 2.2) * (1.0 - 0.6 * uAmount);
  float rr = length(q * vec2(1.0, 1.15));
  float disc = smoothstep(0.3, 0.2, rr);
  float ringLine = smoothstep(0.07, 0.0, abs(rr - 0.36));
  float moon = mix(disc, ringLine, smoothstep(0.15, 0.85, uAmount)) * (1.0 - uPulse);
  col += vec3(1.0, 0.93, 0.8) * moon * 1.8;`;

/** A rounded-rectangle cross-section swept round the axis: the band of the ring. */
function ringProfile(inner = 1, outer = 1.17, half = 0.4, corner = 0.08) {
  const pts: THREE.Vector2[] = [];
  const arc = (cx: number, cy: number, a0: number, a1: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = a0 + ((a1 - a0) * i) / 6;
      pts.push(new THREE.Vector2(cx + Math.cos(a) * corner, cy + Math.sin(a) * corner));
    }
  };
  arc(inner + corner, -half + corner, Math.PI, Math.PI * 1.5);
  arc(outer - corner, -half + corner, Math.PI * 1.5, Math.PI * 2);
  arc(outer - corner, half - corner, 0, Math.PI * 0.5);
  arc(inner + corner, half - corner, Math.PI * 0.5, Math.PI);
  pts.push(pts[0].clone());
  return pts;
}

/** The signature moment: the LOWTIDE ring is born from the moon's reflection in the last pool. */
export function createRing(ctx: WorldCtx): Part {
  const pool = POOLS.find((p) => p.id === "reveal")!;
  const surface = createPoolSurface(ctx, pool, REFLECTION);
  ctx.scene.add(surface.mesh);

  const pmrem = new THREE.PMREMGenerator(ctx.renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const band = new THREE.MeshPhysicalMaterial({ color: 0xc9ced6, metalness: 1, roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.2, envMap: env, envMapIntensity: 0.55 });
  const ring = new THREE.Mesh(new THREE.LatheGeometry(ringProfile(), 160), band);
  // the sensor window on the inside of the band
  const windowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.45, 0.8, 1).multiplyScalar(0.9) });
  const sensor = new THREE.Mesh(new THREE.TorusGeometry(1.005, 0.035, 12, 160, 0.9), windowMat);
  sensor.rotation.x = Math.PI / 2;
  ring.add(sensor);
  const holder = new THREE.Group();
  holder.add(ring);
  holder.position.set(pool.x, surface.rim, pool.z);
  ctx.scene.add(holder);

  const moonLight = new THREE.DirectionalLight(0xfff1d6, 1.4);
  const fill = new THREE.PointLight(0x8fd3ff, 3, 14, 2);
  fill.position.set(pool.x, surface.rim + 0.4, pool.z + 1.5);
  ctx.scene.add(moonLight, moonLight.target, fill);

  // specs etched in the wet sand in front of the pool
  const specLine = `${PRODUCT.material}  ·  ${PRODUCT.batteryDays} days a charge  ·  sizes ${PRODUCT.sizes[0]}–${PRODUCT.sizes[PRODUCT.sizes.length - 1]}`;
  const sz = pool.z + pool.r + 1.1;
  const specs = createWorldText(ctx, { text: specLine, font: ctx.fonts.mono, fontSize: 0.62, mode: "always", color: 0xebd9a6, anchorY: "bottom", tear: 0.5 });
  specs.mesh.position.set(pool.x, sandBase(sz) + 0.06, sz);
  specs.mesh.rotation.x = -Math.PI / 2 + 0.4;
  const pz = sz + 6;
  const price = createWorldText(ctx, { text: `$${PRODUCT.price}  ·  no subscription`, font: ctx.fonts.display, fontSize: 1.5, mode: "always", color: 0xecefF0, anchorY: "bottom", tear: 0.5 });
  price.mesh.position.set(pool.x, sandBase(pz) + 0.06, pz);
  price.mesh.rotation.x = -Math.PI / 2 + 0.45;
  ctx.scene.add(specs.mesh, price.mesh);

  return {
    update(f) {
      // arrival 0 → 1 over the approach to the fifth low tide; it stays risen afterwards
      const t = smoothstep(CHAPTER_POINTS.reveal - 0.06, CHAPTER_POINTS.reveal, f.p);
      const bend = smoothstep(0.1, 0.55, t);
      const lift = smoothstep(0.45, 1, t);
      surface.update(ctx.shared.uWaterY.value);
      surface.uAmount.value = bend;
      surface.uPulse.value = lift;

      holder.visible = lift > 0.001;
      const hover = Math.sin(f.time * 0.8) * 0.08 * lift;
      holder.position.y = lerp(surface.rim - 0.5, surface.rim + 3.1, lift) + hover;
      // rises from lying in the water to a three-quarter view, so the band's thickness and inside show
      holder.rotation.x = lerp(0, 1.05, lift);
      holder.rotation.z = lerp(0, -0.22, lift);
      ring.rotation.y = f.time * 0.22;
      holder.scale.setScalar(lerp(0.9, 1.5, lift));
      moonLight.position.copy(ctx.shared.uMoonDir.value).multiplyScalar(50).add(holder.position);
      moonLight.target.position.copy(holder.position);
      fill.intensity = 3 * lift;

      const show = smoothstep(0.7, 1, t) * (1 - smoothstep(CHAPTER_POINTS.reveal + 0.012, CHAPTER_POINTS.dawn, f.p));
      specs.uWeight.value = show;
      price.uWeight.value = show;
      specs.mesh.visible = price.mesh.visible = show > 0.001;
    },
    dispose() {
      surface.dispose();
      ring.geometry.dispose();
      sensor.geometry.dispose();
      band.dispose();
      windowMat.dispose();
      env.dispose();
      pmrem.dispose();
      specs.dispose();
      price.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/sand.ts">
<![CDATA[import * as THREE from "three";
import { damp } from "../motion/math";
import { FOOTPRINTS } from "./footprints";
import { FOG, LANTERN, NOISE } from "./glsl";
import { MAX_POOLS, POOLS } from "./pools";
import { SHORE_LENGTH, SLOPE } from "./shore";
import type { Part, WorldCtx } from "./types";

/** GLSL for the beach height, shared with anything that needs to sit on the sand. */
export const SAND_HEIGHT = /* glsl */ `
uniform vec4 uPools[${MAX_POOLS}];
uniform int uPoolCount;
float lt_poolMask(vec2 p, vec4 pool) {
  float d = length(p - pool.xy) / pool.z;
  return 1.0 - smoothstep(0.55, 1.0, d);
}
float lt_sandHeight(vec2 p) {
  float h = ${SLOPE.toFixed(4)} * p.y;
  // around each pool the beach is smoothed flat, so the basin and its water line up exactly
  float calmZone = 0.0;
  for (int i = 0; i < ${MAX_POOLS}; i++) {
    if (i >= uPoolCount) break;
    calmZone = max(calmZone, 1.0 - smoothstep(1.0, 1.8, length(p - uPools[i].xy) / uPools[i].z));
  }
  h += (lt_fbm(p * 0.018) - 0.5) * 0.7 * (1.0 - calmZone);
  float rip = sin(dot(p, vec2(0.35, 1.45)) + lt_fbm(p * 0.12) * 5.0);
  h += 0.035 * rip * smoothstep(-80.0, 10.0, p.y) * (1.0 - calmZone);
  for (int i = 0; i < ${MAX_POOLS}; i++) {
    if (i >= uPoolCount) break;
    h -= uPools[i].w * lt_poolMask(p, uPools[i]);
  }
  return h;
}
`;

/** Wet sand, ripple marks, rock pools and footprints along the whole night's shore. */
export function createSand(ctx: WorldCtx, trails: { value: THREE.Vector4[] }): Part {
  const { shared } = ctx;
  const geo = new THREE.PlaneGeometry(SHORE_LENGTH + 700, 220, 560, 140);
  geo.rotateX(-Math.PI / 2);
  geo.translate(SHORE_LENGTH / 2, 0, -60);

  const pools = Array.from({ length: MAX_POOLS }, (_, i) => {
    const p = POOLS[i];
    return p ? new THREE.Vector4(p.x, p.z, p.r, p.depth) : new THREE.Vector4();
  });

  const mat = new THREE.ShaderMaterial({
    fog: false,
    uniforms: {
      uPools: { value: pools },
      uPoolCount: { value: POOLS.length },
      uTrails: trails,
      uLantern: shared.uLantern,
      uResolution: shared.uResolution,
      uMoonDir: shared.uMoonDir,
      uMoonColor: shared.uMoonColor,
      uZenith: shared.uZenith,
      uHorizon: shared.uHorizon,
      uWetLine: shared.uWetLine,
      uWaterY: shared.uWaterY,
      uDawn: shared.uDawn,
      uCam: shared.uCameraPos,
      uTime: shared.uTime,
    },
    vertexShader: /* glsl */ `
      ${NOISE}
      ${SAND_HEIGHT}
      varying vec3 vWorld; varying float vH;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        w.y = lt_sandHeight(w.xz);
        vWorld = w.xyz; vH = w.y;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform vec3 uZenith; uniform vec3 uHorizon;
      uniform float uWetLine; uniform float uWaterY; uniform float uDawn; uniform vec3 uCam; uniform float uTime;
      ${NOISE}
      ${SAND_HEIGHT}
      ${LANTERN}
      ${FOG}
      ${FOOTPRINTS}
      varying vec3 vWorld; varying float vH;
      // fine ripple marks and grain, too small for the mesh: shaded through a per-pixel normal
      float lt_detail(vec2 p) {
        float rip = sin(dot(p, vec2(0.5, 2.1)) + lt_fbm(p * 0.15) * 6.0);
        return 0.05 * rip * rip + 0.012 * lt_noise(p * 9.0);
      }
      void main() {
        vec3 Ng = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
        if (Ng.y < 0.0) Ng = -Ng;
        vec3 V = normalize(uCam - vWorld);
        vec2 p = vWorld.xz;
        float e = 0.08;
        float d0 = lt_detail(p);
        vec2 grad = vec2(lt_detail(p + vec2(e, 0.0)) - d0, lt_detail(p + vec2(0.0, e)) - d0) / e;
        float fade = 1.0 - smoothstep(25.0, 140.0, length(uCam - vWorld));
        vec3 N = normalize(Ng + vec3(-grad.x, 0.0, -grad.y) * fade);

        float grain = lt_noise(p * 6.0) * 0.5 + lt_noise(p * 21.0) * 0.5;
        vec3 dry = mix(vec3(0.085, 0.085, 0.09), vec3(0.13, 0.125, 0.12), grain);
        float prints = lt_prints(p);
        float wet = max(smoothstep(0.0, 0.35, uWetLine - vH), prints * 0.9);
        vec3 albedo = mix(dry, dry * 0.38 + vec3(0.0, 0.004, 0.01), wet);
        albedo *= 1.0 - prints * 0.55;

        // pools keep water below their rim after the sea has gone
        float poolWater = 0.0;
        for (int i = 0; i < ${MAX_POOLS}; i++) {
          if (i >= uPoolCount) break;
          float rim = ${SLOPE.toFixed(4)} * uPools[i].y - 0.06;
          poolWater = max(poolWater, step(vH, rim) * lt_poolMask(p, uPools[i]));
        }

        vec3 L = normalize(uMoonDir);
        float diff = max(dot(N, L), 0.0);
        vec3 ambient = mix(uZenith * 3.0, uHorizon * 0.6, 0.5) + vec3(0.015, 0.018, 0.03);
        vec3 col = albedo * (ambient + uMoonColor * diff * 0.55 + uMoonColor * uDawn * 0.9);

        // wet sand is a blurred mirror: the sky, and a glittering column under the moon
        vec3 Rv = reflect(-V, normalize(mix(N, vec3(0.0, 1.0, 0.0), 0.35)));
        vec3 skyR = mix(uHorizon, uZenith, smoothstep(0.0, 0.4, Rv.y));
        float m = max(dot(Rv, L), 0.0);
        float glitter = smoothstep(0.55, 0.95, lt_noise(p * 3.0 + uTime * 0.05));
        float streak = pow(m, 70.0) * 1.6 + pow(m, 14.0) * 0.18 * (0.5 + glitter);
        float fres = 0.25 + 0.75 * pow(1.0 - max(dot(V, vec3(0.0, 1.0, 0.0)), 0.0), 4.0);
        col = mix(col, skyR, wet * fres * 0.7);
        col += uMoonColor * streak * wet;

        // pool surfaces: still sky with a soft moon
        vec3 Rw = reflect(-V, vec3(0.0, 1.0, 0.0));
        vec3 sky = mix(uHorizon, uZenith, smoothstep(0.0, 0.5, Rw.y));
        float moonGlint = pow(max(dot(Rw, L), 0.0), 600.0) * 1.1 + pow(max(dot(Rw, L), 0.0), 40.0) * 0.08;
        col = mix(col, sky * 1.1 + uMoonColor * moonGlint, poolWater * 0.9);

        // the lantern: warm light on whatever is near the pointer
        float lt = lt_lantern();
        col += albedo * LT_LANTERN_COLOR * lt * 1.6 + LT_LANTERN_COLOR * lt * wet * 0.05;

        col = lt_fog(col, vWorld, uCam, uHorizon);
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  ctx.scene.add(mesh);

  let wetLine = shared.uWaterY.value;
  return {
    update(f) {
      // sand stays wet a while after the water leaves it
      const y = shared.uWaterY.value;
      wetLine = Math.max(y, damp(wetLine, y, 0.12, f.dt));
      shared.uWetLine.value = wetLine;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/sensorPools.ts">
<![CDATA[import * as THREE from "three";
import { SENSORS } from "../content/story";
import { createPoolSurface } from "./poolSurface";
import { POOLS } from "./pools";
import { sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText } from "./worldText";

/** What each sensor pool does to its water: a heartbeat, a slow warmth, a breath. */
const EFFECTS: Record<(typeof SENSORS)[number]["id"], string> = {
  // rings leave the centre once a second (60 bpm), with a double beat
  heart: /* glsl */ `
    float beat = fract(uTime);
    float ring = sin((r - beat * 1.1) * 26.0) * smoothstep(0.25, 0.0, abs(r - beat * 1.1));
    float ring2 = sin((r - (beat - 0.18) * 1.1) * 26.0) * smoothstep(0.2, 0.0, abs(r - (beat - 0.18) * 1.1)) * 0.6;
    glow = max(ring, 0.0) + max(ring2, 0.0);
    col *= 0.9 + 0.2 * (ring + ring2);`,
  // the water warms toward amber and cools back over eight seconds
  temperature: /* glsl */ `
    float warm = 0.5 + 0.5 * sin(uTime * 0.785);
    vec3 tint = mix(vec3(0.25, 0.5, 0.9), vec3(1.0, 0.62, 0.32), warm);
    col = mix(col, col * 0.5 + tint * 0.35, uAmount * (0.6 - 0.35 * r));
    glow = 0.15 * (1.0 - r);`,
  // twelve breaths a minute: the surface brightens and a soft rim swells and settles
  breathing: /* glsl */ `
    float breath = 0.5 + 0.5 * sin(uTime * 1.2566);
    float swell = smoothstep(0.55 + 0.35 * breath, 0.5 + 0.35 * breath, r) * smoothstep(0.3 * breath, 0.5 + 0.3 * breath, r);
    glow = swell * 0.9 + breath * 0.12;`,
};

/** The three sensor pools on the second low tide, each labelled where the lantern finds it. */
export function createSensorPools(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const items = SENSORS.map((s) => {
    const pool = POOLS.find((p) => p.id === s.id)!;
    const surface = createPoolSurface(ctx, pool, EFFECTS[s.id]);
    // names and lines lie on the sand in front of each pool, tilted toward the visitor
    // the name lies on the wet sand just in front of its pool (the longer line lives in the tide table)
    const nz = pool.z + pool.r + 1.4;
    const name = createWorldText(ctx, { text: s.name, font: ctx.fonts.display, fontSize: 1.8, mode: "lantern", tear: 0.8, color: 0xdff2ff, anchorY: "bottom" });
    name.mesh.position.set(pool.x, sandBase(nz) + 0.08, nz);
    name.mesh.rotation.x = -Math.PI / 2 + 0.35;
    group.add(surface.mesh, name.mesh);
    return { surface, name };
  });
  ctx.scene.add(group);

  return {
    update(_f, w) {
      const y = ctx.shared.uWaterY.value;
      for (const it of items) {
        it.surface.update(y);
        it.surface.uAmount.value = w.sensors;
        it.name.uWeight.value = w.sensors;
        it.name.mesh.visible = w.sensors > 0.001;
      }
    },
    dispose() {
      items.forEach((it) => {
        it.surface.dispose();
        it.name.dispose();
      });
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/shore.ts">
<![CDATA[import { lerp } from "../motion/math";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";

/** World units along x that one night covers; the camera walks it as progress goes 0 → 1. */
export const SHORE_LENGTH = 360;
/** Sand rises toward the camera (+z) by this much per unit. */
export const SLOPE = 0.04;
export const LOW_Y = -2.1;
export const HIGH_Y = 0.7;

export const waterLevel = (tide: number) => lerp(LOW_Y, HIGH_Y, tide);

/** The beach without ripples or pools: a gentle ramp. */
export const sandBase = (z: number) => SLOPE * z;

/** Where the water surface meets the ramp. */
export const shoreZ = (waterY: number) => waterY / SLOPE;

export const chapterX = (id: ChapterId) => CHAPTER_POINTS[id] * SHORE_LENGTH;

/** Chapter content sits on sand the low tide uncovers. */
export const CONTENT_Z = -22;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/sky.ts">
<![CDATA[import * as THREE from "three";
import { lerp, smoothstep } from "../motion/math";
import { CHAPTER_POINTS } from "../night/clock";
import { NOISE } from "./glsl";
import type { Part, WorldCtx } from "./types";

const NIGHT_ZENITH = new THREE.Color(0.006, 0.009, 0.022);
const NIGHT_HORIZON = new THREE.Color(0.035, 0.045, 0.075);
const DAWN_ZENITH = new THREE.Color(0.07, 0.1, 0.2);
const DAWN_HORIZON = new THREE.Color(0.62, 0.34, 0.24);
const MOON_LIGHT = new THREE.Color(1.0, 0.93, 0.78);
const SUN_LIGHT = new THREE.Color(1.0, 0.7, 0.5);
const MOON_DISTANCE = 1500;

/** The dome (gradient, moon glow, stars), the moon itself and the colours every other shader borrows. */
export function createSky(ctx: WorldCtx): Part {
  const { shared } = ctx;

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1800, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: { uZenith: shared.uZenith, uHorizon: shared.uHorizon, uMoonDir: shared.uMoonDir, uMoonColor: shared.uMoonColor, uDawn: shared.uDawn, uTime: shared.uTime },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uMoonDir; uniform vec3 uMoonColor; uniform float uDawn; uniform float uTime;
        varying vec3 vDir;
        ${NOISE}
        void main() {
          vec3 d = normalize(vDir);
          float e = clamp(d.y, -0.2, 1.0);
          vec3 col = mix(uHorizon, uZenith, pow(smoothstep(-0.02, 0.6, e), 0.55));
          // sunrise glow low on the horizon, toward the moon's side of the sky
          float sunSide = max(0.0, dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(-uMoonDir.x, 0.0, uMoonDir.z))));
          col += uDawn * vec3(1.0, 0.5, 0.3) * pow(1.0 - smoothstep(0.0, 0.25, e), 3.0) * (0.15 + 0.35 * sunSide);
          // moon halo
          float m = max(dot(d, uMoonDir), 0.0);
          col += uMoonColor * (pow(m, 400.0) * 0.35 + pow(m, 40.0) * 0.06 + pow(m, 5.0) * 0.012) * (1.0 - uDawn * 0.7);
          // stars: one hashed point per cell, twinkling, gone by dawn and near the horizon
          vec2 sp = vec2(atan(d.z, d.x), asin(clamp(d.y, -1.0, 1.0))) * 180.0;
          vec2 cell = floor(sp);
          float h = lt_hash(cell);
          vec2 f = fract(sp) - vec2(lt_hash(cell + 3.1), lt_hash(cell + 7.7));
          float star = step(0.985, h) * smoothstep(0.08, 0.0, length(f)) * (0.55 + 0.45 * sin(uTime * (1.0 + h * 3.0) + h * 40.0));
          col += vec3(0.85, 0.9, 1.0) * star * smoothstep(0.02, 0.25, e) * (1.0 - smoothstep(0.0, 0.6, uDawn)) * 0.9;
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }),
  );
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  ctx.scene.add(dome);

  ctx.textures.moon.colorSpace = THREE.SRGBColorSpace;
  const moonMat = new THREE.MeshBasicMaterial({ map: ctx.textures.moon, color: new THREE.Color(1.15, 1.1, 0.98), fog: false, transparent: true, toneMapped: false });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(38, 64, 32), moonMat);
  moon.renderOrder = -9;
  ctx.scene.add(moon);

  const target = new THREE.Vector3();
  return {
    update(f) {
      const dawn = smoothstep(CHAPTER_POINTS.reveal + 0.006, 1, f.p);
      shared.uDawn.value = dawn;
      shared.uZenith.value.copy(NIGHT_ZENITH).lerp(DAWN_ZENITH, dawn);
      shared.uHorizon.value.copy(NIGHT_HORIZON).lerp(DAWN_HORIZON, dawn * 0.85);
      shared.uMoonColor.value.copy(MOON_LIGHT).lerp(SUN_LIGHT, dawn);

      // The moon climbs through the night and sinks toward the far horizon by dawn, staying right of centre.
      // Kept low so its reflection lands on the wet sand the tide uncovers.
      const az = lerp(0.12, 0.3, f.p);
      const el = 0.1 + 0.07 * Math.sin(Math.PI * Math.min(1, f.p * 1.1)) - dawn * 0.06;
      shared.uMoonDir.value.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el)).normalize();

      dome.position.copy(ctx.camera.position);
      target.copy(shared.uMoonDir.value).multiplyScalar(MOON_DISTANCE).add(ctx.camera.position);
      moon.position.copy(target);
      moon.rotation.y = 0.6 + f.p * 0.2;
      moonMat.opacity = 1 - dawn * 0.75;
    },
    dispose() {
      dome.geometry.dispose();
      (dome.material as THREE.Material).dispose();
      moon.geometry.dispose();
      moonMat.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/types.ts">
<![CDATA[import type * as THREE from "three";
import type { ChapterId } from "../night/clock";
import type { NightPlan } from "../night/your-night";

/** Everything the world needs for one frame. Pure inputs; the world holds no scroll or pointer state. */
export type FrameInput = {
  /** Night progress 0 (23:04) → 1 (07:00). */
  p: number;
  /** Water level 0 (low) → 1 (high), from tideLevel(p). */
  tide: number;
  /** 0 glassy → 1 whipped up by fast scrolling. */
  roughness: number;
  /** 0 → 1 after the visitor holds still. */
  calm: number;
  /** The lantern in normalised device coordinates (−1…1), radius in the same units. */
  lantern: { x: number; y: number; radius: number; active: boolean };
  /** Seconds since the world started. */
  time: number;
  /** Seconds since the previous frame. */
  dt: number;
};

export type Weights = Record<ChapterId, number>;

export interface World {
  setFrame(f: FrameInput): void;
  setFinale(plan: NightPlan | null): void;
  panFinale(dx: number): void;
  snapshotFinale(): Promise<Blob>;
  resize(w: number, h: number, dpr: number): void;
  onContextLost(cb: () => void): void;
  dispose(): void;
}

export type FontUrls = { display: string; mono: string; monoItalic: string };

export type WorldCtx = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  textures: { waterNormal: THREE.Texture; moon: THREE.Texture };
  fonts: FontUrls;
  /** Shared uniforms every shader reads (lantern, roughness, calm, tide, time). */
  shared: SharedUniforms;
  size: { width: number; height: number };
};

export type SharedUniforms = {
  uTime: { value: number };
  uTide: { value: number };
  uRoughness: { value: number };
  uCalm: { value: number };
  uProgress: { value: number };
  /** xy = lantern in NDC, z = radius, w = 1 when a pointer drives it. */
  uLantern: { value: THREE.Vector4 };
  /** Drawing-buffer size in device pixels (matches gl_FragCoord). */
  uResolution: { value: THREE.Vector2 };
  /** 0 night → 1 sunrise. */
  uDawn: { value: number };
  /** Unit vector toward the moon (the "sun" for every shader). */
  uMoonDir: { value: THREE.Vector3 };
  uMoonColor: { value: THREE.Color };
  uZenith: { value: THREE.Color };
  uHorizon: { value: THREE.Color };
  /** Water surface height and the highest recent water (sand below it is still wet). */
  uWaterY: { value: number };
  uWetLine: { value: number };
  uCameraPos: { value: THREE.Vector3 };
};

/** A piece of the world: owns its objects, updates from the frame and the chapter weights. */
export interface Part {
  update(f: FrameInput, w: Weights): void;
  resize?(width: number, height: number): void;
  dispose(): void;
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/water.ts">
<![CDATA[import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { damp, lerp } from "../motion/math";
import { NOISE, LANTERN } from "./glsl";
import { SHORE_LENGTH, SLOPE, waterLevel } from "./shore";
import type { Part, WorldCtx } from "./types";

/**
 * The sea: three.js's open-source Water (planar mirror + scrolling normals), extended with the tide line,
 * shoreline foam, the lantern, and roughness/calm driving distortion. Its mirror assumes a flat plane, so
 * roughness reads through distortion, normal scale and foam rather than displaced vertices.
 */
export function createWater(ctx: WorldCtx): Part {
  const { shared } = ctx;
  const water = new Water(new THREE.PlaneGeometry(6000, 3300), {
    textureWidth: 1024,
    textureHeight: 1024,
    waterNormals: ctx.textures.waterNormal,
    sunDirection: shared.uMoonDir.value,
    sunColor: shared.uMoonColor.value,
    waterColor: 0x02060c,
    distortionScale: 2.4,
    fog: false,
    alpha: 1,
  });
  water.rotation.x = -Math.PI / 2;
  water.position.set(SHORE_LENGTH / 2, 0, -1600);
  water.renderOrder = 1;

  const mat = water.material as THREE.ShaderMaterial;
  Object.assign(mat.uniforms, {
    uLantern: shared.uLantern,
    uResolution: shared.uResolution,
    uRoughness: shared.uRoughness,
    uCalm: shared.uCalm,
    uHorizon: shared.uHorizon,
    uDawn: shared.uDawn,
    uTimeLT: shared.uTime,
    uShoreZ: { value: 0 },
  });
  mat.fragmentShader = mat.fragmentShader
    .replace(
      "uniform vec3 waterColor;",
      /* glsl */ `uniform vec3 waterColor;
      uniform float uRoughness; uniform float uCalm; uniform vec3 uHorizon; uniform float uDawn; uniform float uTimeLT; uniform float uShoreZ;
      ${LANTERN}
      ${NOISE}`,
    )
    .replace(
      "gl_FragColor = vec4( outgoingLight, alpha );",
      /* glsl */ `
      // horizon haze and dawn colour on the open water
      float far = smoothstep(200.0, 1600.0, distance);
      outgoingLight = mix(outgoingLight, uHorizon * 0.9, far * 0.85);
      // foam at the tide line: a broken band that thickens when the sea is rough
      float toShore = uShoreZ - worldPosition.z;
      float n = lt_fbm(worldPosition.xz * vec2(0.08, 0.25) + vec2(uTimeLT * 0.15, 0.0));
      float band = smoothstep(4.0 + 6.0 * uRoughness, 0.0, toShore) * smoothstep(-0.6, 0.4, toShore);
      float foam = band * smoothstep(0.45 - 0.2 * uRoughness, 0.8, n + 0.25 * sin(worldPosition.x * 0.3 + uTimeLT * 1.3));
      outgoingLight += vec3(0.55, 0.62, 0.68) * foam * (0.25 + 0.6 * uRoughness) * (1.0 - far);
      // the lantern warms the water near the pointer
      float lt = lt_lantern();
      outgoingLight += LT_LANTERN_COLOR * lt * (0.05 + 0.25 * reflectance) * (1.0 - far);
      gl_FragColor = vec4( outgoingLight, alpha );`,
    );
  mat.needsUpdate = true;
  ctx.scene.add(water);

  let swell = 0;
  let waveTime = 0;
  return {
    update(f) {
      const y = waterLevel(f.tide);
      swell = damp(swell, Math.sin(f.time * 0.7) * 0.04 * (1 + f.roughness * 5), 4, f.dt);
      water.position.y = y + swell;
      shared.uWaterY.value = y;
      mat.uniforms.uShoreZ.value = y / SLOPE;
      // integrate so a speed change never jumps the wave phase
      waveTime += f.dt * lerp(0.35, 2.2, f.roughness);
      mat.uniforms.time.value = waveTime;
      mat.uniforms.distortionScale.value = lerp(1.6, 9, f.roughness) * (1 - f.calm * 0.75);
      mat.uniforms.size.value = lerp(0.9, 2.4, f.roughness);
    },
    dispose() {
      water.geometry.dispose();
      mat.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/words.ts">
<![CDATA[import * as THREE from "three";
import { CHAPTERS } from "../content/story";
import { damp, lerp } from "../motion/math";
import type { ChapterId } from "../night/clock";
import { chapterX, CONTENT_Z, sandBase } from "./shore";
import type { Part, WorldCtx } from "./types";
import { createWorldText, type WorldText } from "./worldText";

type Placement = { x: number; y: number; z: number; size: number; width: number };

/** Where each chapter's headline stands. The hook floats over high water; the rest stand on the uncovered sand. */
function placement(id: ChapterId): Placement {
  const x = chapterX(id);
  if (id === "hook") return { x, y: 4.4, z: -46, size: 5.6, width: 64 };
  if (id === "dawn") return { x, y: 29, z: -60, size: 5, width: 60 };
  const z = CONTENT_Z - 4;
  return { x, y: sandBase(z) + 2.6, z, size: 4.3, width: 76 };
}

type ChapterWords = { id: ChapterId; headline: WorldText; quiet: WorldText; quietBaseY: number; rise: number };

/** Each chapter's headline (lantern-revealed) and quiet line (rises from under the surface when the visitor is still). */
export function createWords(ctx: WorldCtx): Part {
  const group = new THREE.Group();
  const words: ChapterWords[] = CHAPTERS.map((c) => {
    const at = placement(c.id);
    const headline = createWorldText(ctx, { text: c.headline, font: ctx.fonts.display, fontSize: at.size, maxWidth: at.width, mode: "lantern", tear: 1 });
    headline.mesh.position.set(at.x, at.y, at.z);
    const quiet = createWorldText(ctx, {
      text: c.quietLine, font: ctx.fonts.monoItalic, fontSize: 1.3, maxWidth: 36, mode: "calm", tear: 0.6,
      color: 0xdfe8f2, anchorY: "bottom", lineHeight: 1.35,
    });
    const qz = at.z + 8;
    const quietBaseY = c.id === "hook" ? 1.4 : c.id === "dawn" ? 26.2 : sandBase(qz) + 0.55;
    quiet.mesh.position.set(at.x, quietBaseY - 1.6, qz);
    group.add(headline.mesh, quiet.mesh);
    return { id: c.id, headline, quiet, quietBaseY, rise: 0 };
  });
  ctx.scene.add(group);

  return {
    update(f, w) {
      for (const cw of words) {
        const weight = w[cw.id];
        cw.headline.uWeight.value = weight;
        cw.quiet.uWeight.value = weight;
        // the quiet line surfaces as calm grows and sinks again with movement
        cw.rise = damp(cw.rise, f.calm * weight, 3, f.dt);
        cw.quiet.mesh.position.y = lerp(cw.quietBaseY - 1.6, cw.quietBaseY, cw.rise);
        cw.headline.mesh.visible = weight > 0.001;
        // at the reveal the specs are etched in the sand instead, and the risen ring needs the space
        cw.quiet.mesh.visible = weight > 0.001 && cw.id !== "reveal";
      }
    },
    dispose() {
      for (const cw of words) {
        cw.headline.dispose();
        cw.quiet.dispose();
      }
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/engine/worldText.ts">
<![CDATA[import * as THREE from "three";
// @ts-expect-error troika-three-text ships without types
import { configureTextBuilder, Text } from "troika-three-text";
import { LANTERN } from "./glsl";
import type { WorldCtx } from "./types";

// A few dozen short lines typeset fine on the main thread; troika's blob-URL worker never reports its
// script request as finished, which keeps the page from ever reaching network idle.
configureTextBuilder({ useWorker: false });

/**
 * How a piece of in-world text appears:
 * - "lantern": only where the lantern shines (a faint ghost elsewhere so there is something to look for)
 * - "calm": only as stillness rises
 * - "always": plain, faded by its weight
 */
export type RevealMode = "lantern" | "calm" | "always";

export type WorldTextOptions = {
  text: string;
  font: string;
  fontSize: number;
  maxWidth?: number;
  color?: THREE.ColorRepresentation;
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "middle" | "bottom" | "baseline";
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;
  mode: RevealMode;
  /** How hard roughness tears the glyphs. */
  tear?: number;
};

export type WorldText = {
  mesh: THREE.Mesh;
  /** 0 hidden → 1 present; multiplied with the reveal mode. */
  uWeight: { value: number };
  /** Extra per-text fade (e.g. washed away by the tide). */
  uFade: { value: number };
  setText(text: string): void;
  dispose(): void;
};

const MODE = { lantern: 0, calm: 1, always: 2 } as const;

export function createWorldText(ctx: WorldCtx, o: WorldTextOptions): WorldText {
  const { shared } = ctx;
  const uWeight = { value: 0 };
  const uFade = { value: 1 };
  const uMode = { value: MODE[o.mode] };
  const uTear = { value: o.tear ?? 1 };
  const uSeed = { value: Math.random() * 100 };

  const base = new THREE.MeshBasicMaterial({ color: o.color ?? 0xeceff0, transparent: true, depthWrite: false, toneMapped: false });
  base.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      uWeight, uFade, uMode, uTear, uSeed,
      uLantern: shared.uLantern, uResolution: shared.uResolution,
      uRoughness: shared.uRoughness, uCalm: shared.uCalm, uTimeLT: shared.uTime,
    });
    shader.vertexShader = shader.vertexShader
      .replace("void main() {", "uniform float uRoughness; uniform float uTimeLT; uniform float uTear; uniform float uSeed;\nvoid main() {")
      .replace(
        "#include <project_vertex>",
        /* glsl */ `
        // rough water tears the words: glyph rows slide apart along a travelling ripple
        float rip = sin(transformed.y * 2.2 + uTimeLT * 3.0 + uSeed) + 0.6 * sin(transformed.x * 0.9 - uTimeLT * 2.1);
        transformed.x += rip * uRoughness * uTear * 0.9;
        transformed.y += sin(transformed.x * 1.7 + uTimeLT * 2.4 + uSeed) * uRoughness * uTear * 0.35;
        #include <project_vertex>`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("void main() {", `uniform float uWeight; uniform float uFade; uniform float uMode; uniform float uCalm; uniform float uRoughness;\n${LANTERN}\nvoid main() {`)
      .replace(
        "#include <dithering_fragment>",
        /* glsl */ `
        float lit = smoothstep(0.0, 1.0, lt_lantern());
        float reveal = uMode < 0.5 ? max(0.1, lit) : (uMode < 1.5 ? uCalm : 1.0);
        gl_FragColor.rgb *= uMode < 0.5 ? (0.85 + 0.35 * lit) : 1.0;
        gl_FragColor.a *= uWeight * uFade * reveal * (1.0 - 0.45 * uRoughness);
        #include <dithering_fragment>`,
      );
  };

  const text = new Text();
  Object.assign(text, {
    text: o.text,
    font: o.font,
    fontSize: o.fontSize,
    maxWidth: o.maxWidth ?? Infinity,
    anchorX: o.anchorX ?? "center",
    anchorY: o.anchorY ?? "bottom",
    textAlign: o.textAlign ?? "center",
    lineHeight: o.lineHeight ?? 1.05,
    letterSpacing: o.letterSpacing ?? 0,
    material: base,
    depthOffset: -1,
  });
  text.renderOrder = 5;
  text.sync();

  return {
    mesh: text as THREE.Mesh,
    uWeight,
    uFade,
    setText(t: string) {
      if (text.text === t) return;
      text.text = t;
      text.sync();
    },
    dispose() {
      text.dispose();
      base.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/dialGeometry.ts">
<![CDATA[import { clamp } from "../motion/math";

/** The dial's night arc: 23:04 at lower left (210°), sweeping clockwise over the top to 07:00 at lower right (−30°). */
export const DIAL = { size: 132, cx: 66, cy: 66, r: 50, start: 210, sweep: 240 } as const;

export function dialPoint(p: number, r: number = DIAL.r) {
  const a = ((DIAL.start - DIAL.sweep * clamp(p)) * Math.PI) / 180;
  return { x: DIAL.cx + r * Math.cos(a), y: DIAL.cy - r * Math.sin(a) };
}

/** Pointer position (in dial px) → progress along the arc, clamped to the night. */
export function dialProgress(x: number, y: number) {
  let deg = (Math.atan2(DIAL.cy - y, x - DIAL.cx) * 180) / Math.PI; // −180…180, 0 = right, y up
  if (deg < -90) deg += 360; // keep the bottom gap (−90° … −150°) on the ends
  return clamp((DIAL.start - deg) / DIAL.sweep);
}

export function arcPath(r: number = DIAL.r) {
  const a = dialPoint(0, r);
  const b = dialPoint(1, r);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 1 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/Experience.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WORLD_FILES } from "../assets";
import { Logo } from "../brand/Logo";
import { chapter } from "../content/story";
import type { World } from "../engine/types";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";
import { Finale } from "./Finale";
import { stepCalm, stepRoughness } from "../night/sea-state";
import { stepChapter, tideLevel } from "../night/tide";
import { canMountExperience, readEnvironment } from "./gate";
import { createInputs } from "./inputs";
import { MoonDial, type MoonDialHandle } from "./MoonDial";
import { createNightScroll, type NightScroll } from "./nightScroll";
import type { Soundscape } from "../sound/soundscape";
import { createSoundSwitch } from "../sound/switch";
import { SoundToggle } from "./SoundToggle";

type Mode = "table" | "booting" | "experience";

/** Interactive parts of the tide table that must not take focus while they are visually hidden. */
const MIRROR_INERT = [".lt-dawn", ".lt-foot"];

function setMode(mode: "table" | "experience") {
  document.documentElement.dataset.ltMode = mode;
  for (const sel of MIRROR_INERT) {
    document.querySelectorAll(sel).forEach((el) => (mode === "experience" ? el.setAttribute("inert", "") : el.removeAttribute("inert")));
  }
}

export function Experience() {
  const [mode, setLocalMode] = useState<Mode>("table");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);

  // Decide whether to boot, and when: on idle for fine pointers, on the first touch/scroll for touch screens.
  useEffect(() => {
    if (!canMountExperience(readEnvironment())) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setLocalMode("booting");
    };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      window.addEventListener("touchstart", start, { once: true, passive: true });
      window.addEventListener("scroll", start, { once: true, passive: true });
      return () => {
        window.removeEventListener("touchstart", start);
        window.removeEventListener("scroll", start);
      };
    }
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(start, { timeout: 1200 });
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  // Booting: load the engine onto the canvas; any failure leaves the tide table as the page.
  useEffect(() => {
    if (mode !== "booting" || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const { createWorld } = await import("../engine/createWorld");
        const world = await createWorld(canvasRef.current!, { fonts: WORLD_FILES.fonts, moonUrl: WORLD_FILES.moon });
        if (cancelled) return world.dispose();
        worldRef.current = world;
        world.onContextLost(() => {
          world.dispose();
          worldRef.current = null;
          setMode("table");
          setLocalMode("table");
        });
        setMode("experience");
        setLocalMode("experience");
      } catch (err) {
        console.warn("LOWTIDE: staying on the tide table", err);
        setMode("table");
        setLocalMode("table");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode]);

  useEffect(
    () => () => {
      worldRef.current?.dispose();
      worldRef.current = null;
      setMode("table");
    },
    [],
  );

  if (mode === "table") return null;
  return (
    <div className="lt-xp" data-ready={mode === "experience"}>
      <canvas ref={canvasRef} className="lt-canvas" aria-hidden="true" tabIndex={-1} />
      {mode === "experience" && worldRef.current && <Night world={worldRef.current} canvas={canvasRef.current!} />}
    </div>
  );
}

/** The running night: scroll clock, inputs, sea state, dial and the per-frame call into the world. */
function Night({ world, canvas }: { world: World; canvas: HTMLCanvasElement }) {
  const dialRef = useRef<MoonDialHandle>(null);
  const announcerRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<NightScroll | null>(null);
  const [sound, setSound] = useState(false);
  // The finale mounts once dawn is reached and then stays mounted (resting, inert) so a small rewind never
  // throws away what the visitor typed. Hysteresis: active from 0.995, resting only below 0.98.
  const [finale, setFinale] = useState<"none" | "active" | "resting">("none");
  const finaleRef = useRef<"none" | "active" | "resting">("none");
  // the first press creates the soundscape inside the gesture; later presses fade it in and out
  const soundSwitch = useRef<ReturnType<typeof createSoundSwitch<Soundscape>> | null>(null);
  useEffect(() => {
    const sw = createSoundSwitch<Soundscape>(async () => {
      const { createSoundscape } = await import("../sound/soundscape");
      return createSoundscape();
    }, setSound);
    soundSwitch.current = sw;
    return () => {
      sw.dispose();
      soundSwitch.current = null;
    };
  }, []);
  const soundOn = () => Boolean(soundSwitch.current?.isOn());

  const announce = useCallback((id: ChapterId) => {
    const c = chapter(id);
    if (announcerRef.current) announcerRef.current.textContent = `${c.label}. ${c.headline} ${c.quietLine}`;
    if (soundSwitch.current?.isOn()) soundSwitch.current.get()?.chime();
  }, []);

  useEffect(() => {
    const night = createNightScroll({ onSettle: announce });
    scrollRef.current = night;
    const inputs = createInputs(window);
    night.restore();

    const onResize = () => world.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
    window.addEventListener("resize", onResize);
    onResize();

    // Space / arrows / Page keys step between low tides, but never while a control has focus.
    const onKey = (e: KeyboardEvent) => {
      const a = document.activeElement;
      if (a && a !== document.body && a !== canvas) return;
      const p = night.progress();
      const next = [" ", "ArrowDown", "PageDown"].includes(e.key) && !(e.key === " " && e.shiftKey);
      const prev = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      let to: ChapterId | null = next ? stepChapter(p, 1) : prev ? stepChapter(p, -1) : null;
      if (e.key === "Home") to = "hook";
      if (e.key === "End") to = "dawn";
      if (!to) return;
      e.preventDefault();
      night.goTo(to);
    };
    window.addEventListener("keydown", onKey);

    let roughness = 0;
    let calm = 0;
    let last = performance.now();
    const t0 = last;
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const { p, velocity } = night.frame(now, dt);
      roughness = stepRoughness(roughness, velocity, dt);
      calm = stepCalm(calm, inputs.stillForMs(), dt);
      const tide = tideLevel(p);
      world.setFrame({ p, tide, roughness, calm, lantern: inputs.lantern(), time: (now - t0) / 1000, dt });
      if (soundOn()) soundSwitch.current?.get()?.update({ tide, roughness, calm, p });
      dialRef.current?.update(p);
      document.documentElement.style.setProperty("--lt-p", p.toFixed(4));
      const was = finaleRef.current;
      const next = p >= CHAPTER_POINTS.dawn - 0.005 ? "active" : was !== "none" && p < CHAPTER_POINTS.dawn - 0.02 ? "resting" : was;
      if (next !== was) {
        finaleRef.current = next;
        setFinale(next);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      inputs.dispose();
      night.destroy();
      scrollRef.current = null;
    };
  }, [world, canvas, announce]);

  return (
    <>
      <div className="lt-track" aria-hidden="true" />
      <div className="lt-hud">
        <Logo className="lt-hud__logo" />
        <SoundToggle on={sound} onToggle={() => soundSwitch.current?.toggle()} />
        <MoonDial
          handleRef={dialRef}
          getProgress={() => scrollRef.current?.progress() ?? 0}
          onGoTo={(id) => scrollRef.current?.goTo(id)}
          onScrub={(p) => scrollRef.current?.scrubTo(p)}
          onHold={(held) => scrollRef.current?.hold(held)}
        />
      </div>
      {finale !== "none" && <Finale world={world} active={finale === "active"} />}
      <p ref={announcerRef} className="lt-sr lt-announcer" aria-live="polite" />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/Finale.tsx">
<![CDATA["use client";

import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import type { World } from "../engine/types";
import { PreorderForm } from "../forms/PreorderForm";
import type { NightPlan } from "../night/your-night";
import { NightCalculator } from "../tidetable/NightCalculator";

/** Dawn: draw your own night over the water, keep it as an image, then reserve the ring. */
export function Finale({ world, active }: { world: World; active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const times = useRef({ bed: "23:30", wake: "07:00" });
  const drag = useRef<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const tween = gsap.fromTo(el.querySelectorAll(".lt-finale__panel"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.12 });
    return () => {
      tween.kill();
    };
  }, []);

  const onPlan = useCallback(
    (plan: NightPlan | null, t: { bed: string; wake: string }) => {
      times.current = t;
      world.setFinale(plan);
    },
    [world],
  );

  useEffect(() => () => world.setFinale(null), [world]);

  async function keep() {
    setSaving(true);
    try {
      const blob = await world.snapshotFinale();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `lowtide-night-${times.current.bed.replace(":", "")}-${times.current.wake.replace(":", "")}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } finally {
      setSaving(false);
    }
  }

  function washAway() {
    const w = washRef.current;
    if (!w) return;
    gsap.fromTo(w, { yPercent: 105, opacity: 1 }, { yPercent: -105, duration: 1.6, ease: "power2.inOut" });
  }

  return (
    <div ref={rootRef} className="lt-finale" data-lenis-prevent data-active={active} inert={!active}>
      <div
        className="lt-finale__strip"
        tabIndex={0}
        role="group"
        aria-label="Your night, drawn as a shoreline. Drag or use the arrow keys to walk it."
        onPointerDown={(e) => {
          drag.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current === null) return;
          world.panFinale(e.clientX - drag.current);
          drag.current = e.clientX;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            e.stopPropagation();
            world.panFinale(e.key === "ArrowLeft" ? 60 : -60);
          }
        }}
      >
        <span className="lt-finale__hint">Drag to walk your night</span>
      </div>
      <div className="lt-finale__panels">
        <section className="lt-finale__panel" aria-labelledby="lt-finale-night">
          <p id="lt-finale-night" className="lt-finale__title">Your night</p>
          <NightCalculator onPlan={onPlan} />
          <button type="button" className="lt-btn lt-btn--ghost" onClick={keep} disabled={saving}>
            <span>{saving ? "Drawing…" : "Keep your night"}</span>
          </button>
        </section>
        <section className="lt-finale__panel lt-finale__panel--order" aria-label="Pre-order">
          <PreorderForm onSuccess={washAway} />
          <div ref={washRef} className="lt-finale__wash" aria-hidden="true" />
        </section>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/gate.ts">
<![CDATA[/** The 3D night only runs when motion is welcome and WebGL2 exists; otherwise the tide table is the page. */
export const canMountExperience = (env: { reducedMotion: boolean; webgl2: boolean }) => !env.reducedMotion && env.webgl2;

/** Read the environment without creating a probe context (a probe costs a long task on load). */
export function readEnvironment() {
  return {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    webgl2: "WebGL2RenderingContext" in window,
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/inputs.ts">
<![CDATA[import type { FrameInput } from "../engine/types";

const POINTER_RADIUS = 0.34;
const RESTING_RADIUS = 0.6;

/** Pointer/touch → the lantern; any movement resets the stillness timer. */
export function createInputs(target: Window) {
  let x = 0;
  let y = 0;
  let active = false;
  let lastMove = performance.now();

  const toNdc = (cx: number, cy: number) => {
    x = (cx / target.innerWidth) * 2 - 1;
    y = -((cy / target.innerHeight) * 2 - 1);
  };
  const onPointer = (e: PointerEvent) => {
    toNdc(e.clientX, e.clientY);
    active = true;
    lastMove = performance.now();
  };
  const onTouch = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) toNdc(t.clientX, t.clientY);
    active = true;
    lastMove = performance.now();
  };
  const onLeave = () => {
    active = false;
  };
  const bump = () => {
    lastMove = performance.now();
  };

  target.addEventListener("pointermove", onPointer, { passive: true });
  target.addEventListener("pointerdown", onPointer, { passive: true });
  target.addEventListener("touchmove", onTouch, { passive: true });
  target.document.documentElement.addEventListener("pointerleave", onLeave);
  target.addEventListener("wheel", bump, { passive: true });
  target.addEventListener("keydown", bump);
  target.addEventListener("scroll", bump, { passive: true });

  return {
    lantern(): FrameInput["lantern"] {
      return active ? { x, y, radius: POINTER_RADIUS, active: true } : { x: 0, y: 0, radius: RESTING_RADIUS, active: false };
    },
    stillForMs() {
      return performance.now() - lastMove;
    },
    dispose() {
      target.removeEventListener("pointermove", onPointer);
      target.removeEventListener("pointerdown", onPointer);
      target.removeEventListener("touchmove", onTouch);
      target.document.documentElement.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("wheel", bump);
      target.removeEventListener("keydown", bump);
      target.removeEventListener("scroll", bump);
    },
  };
}

export type Inputs = ReturnType<typeof createInputs>;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/MoonDial.tsx">
<![CDATA["use client";

import { useImperativeHandle, useRef, type Ref } from "react";
import { CHAPTERS } from "../content/story";
import { CHAPTER_CLOCK, CHAPTER_POINTS, formatClock, progressToClock, type ChapterId } from "../night/clock";
import { nearestChapter, stepChapter } from "../night/tide";
import { arcPath, DIAL, dialPoint, dialProgress } from "./dialGeometry";

export type MoonDialHandle = { update(p: number): void };

type Props = {
  handleRef: Ref<MoonDialHandle>;
  onGoTo: (id: ChapterId) => void;
  onScrub: (p: number) => void;
  onHold: (held: boolean) => void;
  getProgress: () => number;
};

const LABEL = Object.fromEntries(CHAPTERS.map((c) => [c.id, c.label])) as Record<ChapterId, string>;

/** The night clock: a moon riding an arc from 23:04 to 07:00. Drag it, click a notch, or use the arrow keys. */
export function MoonDial({ handleRef, onGoTo, onScrub, onHold, getProgress }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<SVGCircleElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const last = useRef({ p: -1, id: "" as string });
  const dragging = useRef(false);

  useImperativeHandle(handleRef, () => ({
    update(p: number) {
      if (Math.abs(p - last.current.p) < 0.0004) return;
      last.current.p = p;
      const { x, y } = dialPoint(p);
      moonRef.current?.setAttribute("cx", x.toFixed(2));
      moonRef.current?.setAttribute("cy", y.toFixed(2));
      fillRef.current?.style.setProperty("stroke-dashoffset", String(1 - p));
      const clock = formatClock(progressToClock(p));
      const id = nearestChapter(p);
      if (timeRef.current) timeRef.current.textContent = clock;
      if (id !== last.current.id && labelRef.current) labelRef.current.textContent = LABEL[id];
      last.current.id = id;
      const s = sliderRef.current;
      if (s) {
        s.setAttribute("aria-valuenow", String(Math.round(p * 100)));
        s.setAttribute("aria-valuetext", `${clock}, ${LABEL[id]}`);
      }
    },
  }));

  const toLocal = (e: React.PointerEvent) => {
    const r = sliderRef.current!.getBoundingClientRect();
    return dialProgress(((e.clientX - r.left) / r.width) * DIAL.size, ((e.clientY - r.top) / r.height) * DIAL.size);
  };

  return (
    <div className="lt-dial">
      <div
        ref={sliderRef}
        className="lt-dial__face"
        role="slider"
        tabIndex={0}
        aria-label="Night clock"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-valuetext={`${formatClock(CHAPTER_CLOCK.hook)}, ${LABEL.hook}`}
        data-testid="lt-dial"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          onHold(true);
          onScrub(toLocal(e));
        }}
        onPointerMove={(e) => dragging.current && onScrub(toLocal(e))}
        onPointerUp={() => {
          dragging.current = false;
          onHold(false);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          onHold(false);
        }}
        onKeyDown={(e) => {
          const p = getProgress();
          const map: Record<string, ChapterId | undefined> = {
            ArrowRight: stepChapter(p, 1), ArrowUp: stepChapter(p, 1), PageDown: stepChapter(p, 1),
            ArrowLeft: stepChapter(p, -1), ArrowDown: stepChapter(p, -1), PageUp: stepChapter(p, -1),
            Home: "hook", End: "dawn",
          };
          const to = map[e.key];
          if (!to) return;
          e.preventDefault();
          e.stopPropagation();
          onGoTo(to);
        }}
      >
        <svg viewBox={`0 0 ${DIAL.size} ${DIAL.size}`} aria-hidden="true">
          <circle className="lt-dial__disc" cx={DIAL.cx} cy={DIAL.cy} r={DIAL.r + 14} />
          <path className="lt-dial__arc" d={arcPath()} />
          <path ref={fillRef} className="lt-dial__fill" d={arcPath()} pathLength={1} />
          <circle ref={moonRef} className="lt-dial__moon" cx={dialPoint(0).x} cy={dialPoint(0).y} r="6.5" />
        </svg>
        <span className="lt-dial__readout">
          <span ref={timeRef} className="lt-dial__time">{formatClock(CHAPTER_CLOCK.hook)}</span>
          <span ref={labelRef} className="lt-dial__label">{LABEL.hook}</span>
        </span>
      </div>
      {CHAPTERS.map((c) => {
        const { x, y } = dialPoint(CHAPTER_POINTS[c.id], DIAL.r + 14);
        return (
          <button
            key={c.id}
            type="button"
            className="lt-dial__notch"
            style={{ left: `${(x / DIAL.size) * 100}%`, top: `${(y / DIAL.size) * 100}%` }}
            aria-label={`${c.label}, ${formatClock(CHAPTER_CLOCK[c.id])}`}
            onClick={() => onGoTo(c.id)}
          />
        );
      })}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/nightScroll.ts">
<![CDATA[import Lenis from "lenis";
import { clamp } from "../motion/math";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";
import { nearestChapter } from "../night/tide";

const SETTLE_DELAY_MS = 600;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const HISTORY_KEY = "ltProgress";

/**
 * Native scroll over the invisible track, smoothed by Lenis. Scroll position is the night's progress.
 * When the visitor stops, the night eases to the nearest chapter (a low tide); any new input cancels that.
 */
export function createNightScroll(opts: { onSettle: (id: ChapterId) => void }) {
  let snapping = false;
  let lastInput = performance.now();
  let lastScroll = 0;
  let velocity = 0;
  let settledAt: ChapterId | null = null;
  let held = false;
  let lastP = 0;

  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    lerp: 0.085,
    syncTouch: false,
    virtualScroll: () => {
      if (snapping) {
        snapping = false;
        lenis.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
      }
      lastInput = performance.now();
      settledAt = null;
      return true;
    },
  });

  const onKeyOrTouch = () => {
    lastInput = performance.now();
  };
  window.addEventListener("keydown", onKeyOrTouch);
  window.addEventListener("touchstart", onKeyOrTouch, { passive: true });

  const toPx = (p: number) => clamp(p) * lenis.limit;
  const progress = () => (lenis.limit > 0 ? clamp(lenis.scroll / lenis.limit) : 0);

  // The track is sized in viewport heights, so a resize changes the scroll limit: keep the same moment of the night.
  const onResize = () => {
    const p = lastP;
    lenis.resize();
    lenis.scrollTo(toPx(p), { immediate: true, force: true });
    lastScroll = lenis.scroll;
    lastInput = performance.now();
  };
  window.addEventListener("resize", onResize);

  function settle(id: ChapterId) {
    snapping = false;
    settledAt = id;
    try {
      history.replaceState({ ...(history.state ?? {}), [HISTORY_KEY]: CHAPTER_POINTS[id] }, "");
    } catch {
      /* history may be unavailable in sandboxed frames */
    }
    opts.onSettle(id);
  }

  function goTo(id: ChapterId, immediate = false) {
    const from = progress();
    const to = CHAPTER_POINTS[id];
    snapping = true;
    lastInput = performance.now();
    lenis.scrollTo(toPx(to), {
      immediate,
      force: true,
      duration: clamp(0.5 + Math.abs(to - from) * 3.2, 0.5, 2.4),
      easing: easeInOut,
      onComplete: () => settle(id),
    });
    if (immediate) settle(id);
  }

  /** Restore the moment the visitor was at before a reload. */
  function restore() {
    try {
      history.scrollRestoration = "manual";
      const p = (history.state as Record<string, unknown> | null)?.[HISTORY_KEY];
      if (typeof p === "number") return goTo(nearestChapter(p), true);
    } catch {
      /* ignore */
    }
    // nothing to restore: begin at 23:04, whatever the scroll offset was on the tide table
    lenis.scrollTo(0, { immediate: true, force: true });
  }

  /** Drag on the moon dial: jump straight to p, then let the tide settle as usual. */
  function scrubTo(p: number) {
    snapping = false;
    settledAt = null;
    lastInput = performance.now();
    lenis.scrollTo(toPx(p), { immediate: true, force: true });
  }

  return {
    lenis,
    restore,
    goTo,
    scrubTo,
    /** While the moon dial is held, the night never settles away from under the visitor's finger. */
    hold(on: boolean) {
      held = on;
      lastInput = performance.now();
      if (on) snapping = false;
    },
    /** Advance Lenis and the settle logic. Returns this frame's progress and scroll speed (px/s). */
    frame(timeMs: number, dt: number) {
      lenis.raf(timeMs);
      const scroll = lenis.scroll;
      velocity = dt > 0 ? (scroll - lastScroll) / dt : 0;
      lastScroll = scroll;
      const p = progress();
      lastP = p;
      if (held) lastInput = performance.now();
      if (!snapping && performance.now() - lastInput > SETTLE_DELAY_MS && Math.abs(velocity) < 2) {
        const id = nearestChapter(p);
        if (Math.abs(CHAPTER_POINTS[id] - p) > 0.0008) {
          snapping = true;
          lenis.scrollTo(toPx(CHAPTER_POINTS[id]), {
            duration: clamp(0.4 + Math.abs(CHAPTER_POINTS[id] - p) * 6, 0.4, 1.2),
            easing: easeInOut,
            force: true,
            onComplete: () => settle(id),
          });
        } else if (settledAt !== id) {
          settle(id);
        }
      }
      return { p, velocity };
    },
    isSnapping: () => snapping,
    progress,
    destroy() {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyOrTouch);
      window.removeEventListener("touchstart", onKeyOrTouch);
      lenis.destroy();
    },
  };
}

export type NightScroll = ReturnType<typeof createNightScroll>;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/experience/SoundToggle.tsx">
<![CDATA["use client";

export function SoundToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="lt-sound" aria-pressed={on} onClick={onToggle}>
      <span className="lt-sound__bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="lt-sound__text">Sound</span>
    </button>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/forms/preorder.ts">
<![CDATA[export const FINISHES = ["moonstone", "tidewater", "driftwood"] as const;
export type Finish = (typeof FINISHES)[number];
export const RING_SIZES = [6, 7, 8, 9, 10, 11, 12, 13] as const;

export type PreorderInput = { email: string; size: string; finish: string };
export type PreorderField = keyof PreorderInput;
export type PreorderResult =
  | { ok: true; value: { email: string; size: number; finish: Finish } }
  | { ok: false; errors: Partial<Record<PreorderField, string>> };

export const PREORDER_MESSAGES: Record<PreorderField, string> = {
  email: "Add an email so we can write when your ring ships.",
  size: "Pick a ring size from 6 to 13.",
  finish: "Choose a finish.",
};

export function validatePreorder(input: PreorderInput): PreorderResult {
  const errors: Partial<Record<PreorderField, string>> = {};
  const email = input.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = PREORDER_MESSAGES.email;
  const size = /^\d+$/.test(input.size.trim()) ? Number(input.size) : NaN;
  if (!(RING_SIZES as readonly number[]).includes(size)) errors.size = PREORDER_MESSAGES.size;
  if (!(FINISHES as readonly string[]).includes(input.finish)) errors.finish = PREORDER_MESSAGES.finish;
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { email, size, finish: input.finish as Finish } };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/forms/PreorderForm.tsx">
<![CDATA["use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { PRODUCT } from "../content/story";
import { validatePreorder, type PreorderField } from "./preorder";

type Status = "idle" | "submitting" | "success";

export function PreorderForm({ onSuccess }: { onSuccess?: () => void }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<PreorderField, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = validatePreorder({
      email: String(data.get("email") ?? ""),
      size: String(data.get("size") ?? ""),
      finish: String(data.get("finish") ?? ""),
    });
    if (!result.ok) {
      setErrors(result.errors);
      const first = (["email", "size", "finish"] as const).find((f) => result.errors[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      onSuccess?.();
    }, 600);
  }

  if (status === "success") {
    return (
      <div className="lt-form lt-form--done" role="status">
        <p className="lt-form__sand">See you at low tide.</p>
        <p className="lt-form__note">We&apos;ll write once, when your ring ships. No newsletter.</p>
      </div>
    );
  }

  const err = (f: PreorderField) => (errors[f] ? `${id}-${f}-err` : undefined);

  return (
    <form ref={formRef} className="lt-form" data-state={status} onSubmit={submit} noValidate aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="lt-form__title">Pre-order the ring <span className="lt-mono">${PRODUCT.price} · ships in spring</span></p>
      <label className="lt-field lt-field--wide">
        <span className="lt-field__label">Email</span>
        <input className="lt-input" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={err("email")} />
        {errors.email && <span className="lt-field__error" id={err("email")}>{errors.email}</span>}
      </label>
      <label className="lt-field">
        <span className="lt-field__label">Ring size</span>
        <select className="lt-input" name="size" defaultValue="" aria-invalid={Boolean(errors.size)} aria-describedby={err("size")}>
          <option value="" disabled>Choose</option>
          {PRODUCT.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.size && <span className="lt-field__error" id={err("size")}>{errors.size}</span>}
      </label>
      <fieldset className="lt-field lt-field--wide lt-finishes" aria-describedby={err("finish")}>
        <legend className="lt-field__label">Finish</legend>
        <div className="lt-finishes__row">
          {PRODUCT.finishes.map((f) => (
            <label key={f.id} className="lt-finish" data-finish={f.id}>
              <input type="radio" name="finish" value={f.id} />
              <span className="lt-finish__swatch" aria-hidden="true" />
              <span>{f.name}</span>
            </label>
          ))}
        </div>
        {errors.finish && <span className="lt-field__error" id={err("finish")}>{errors.finish}</span>}
      </fieldset>
      <button className="lt-btn" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Reserving…" : "Reserve my ring"}</span>
      </button>
    </form>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/motion/math.ts">
<![CDATA[export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, v: number) => (a === b ? 0 : clamp((v - a) / (b - a)));

export function smoothstep(e0: number, e1: number, x: number) {
  const t = invLerp(e0, e1, x);
  return t * t * (3 - 2 * t);
}

/** Frame-rate independent exponential approach: the same total dt gives the same result however it is split. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/night/beats.ts">
<![CDATA[import { smoothstep } from "../motion/math";
import { CHAPTER_IDS, CHAPTER_POINTS, type ChapterId } from "./clock";

/** How far (in progress) a chapter's moment reaches either side of its point. */
export const BEAT_WINDOW = 0.06;

/**
 * Each side of a chapter gets its own window: at most BEAT_WINDOW, and never more than half the gap to the
 * neighbour on that side, so close chapters (reveal, dawn) never overlap but keep their full approach elsewhere.
 */
const WINDOWS = Object.fromEntries(
  CHAPTER_IDS.map((id, i) => {
    const side = (n: ChapterId | undefined) => (n ? Math.min(BEAT_WINDOW, Math.abs(CHAPTER_POINTS[n] - CHAPTER_POINTS[id]) / 2) : BEAT_WINDOW);
    return [id, { before: side(CHAPTER_IDS[i - 1]), after: side(CHAPTER_IDS[i + 1]) }];
  }),
) as Record<ChapterId, { before: number; after: number }>;

/** Presence of each chapter's moment at progress p: 1 on its point, easing to 0 at the edge of its window. */
export function chapterWeights(p: number): Record<ChapterId, number> {
  return Object.fromEntries(
    CHAPTER_IDS.map((id) => {
      const d = p - CHAPTER_POINTS[id];
      const win = d < 0 ? WINDOWS[id].before : WINDOWS[id].after;
      return [id, 1 - smoothstep(0, win, Math.abs(d))];
    }),
  ) as Record<ChapterId, number>;
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/night/clock.ts">
<![CDATA[import { clamp } from "../motion/math";

/** The night runs 23:04 → 07:00, in minutes past the first midnight (values above 1440 are the next morning). */
export const NIGHT_START = 23 * 60 + 4;
export const NIGHT_END = 24 * 60 + 7 * 60;

export const CHAPTER_IDS = ["hook", "problem", "sensors", "smart-wake", "proof", "reveal", "dawn"] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

/** Each chapter rests on a low tide (except the hook at high tide and dawn). */
export const CHAPTER_CLOCK: Record<ChapterId, number> = {
  hook: NIGHT_START,
  problem: 1440 + 40,
  sensors: 1440 + 2 * 60 + 15,
  "smart-wake": 1440 + 3 * 60 + 50,
  proof: 1440 + 5 * 60 + 25,
  reveal: 1440 + 6 * 60 + 40,
  dawn: NIGHT_END,
};

export const progressToClock = (p: number) => NIGHT_START + clamp(p) * (NIGHT_END - NIGHT_START);

export const clockToProgress = (min: number) => clamp((min - NIGHT_START) / (NIGHT_END - NIGHT_START));

export function formatClock(min: number) {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export const CHAPTER_POINTS = Object.fromEntries(
  CHAPTER_IDS.map((id) => [id, clockToProgress(CHAPTER_CLOCK[id])]),
) as Record<ChapterId, number>;
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/night/sea-state.ts">
<![CDATA[import { clamp, damp } from "../motion/math";

/** Scroll speed (px/s) that whips the sea to full roughness. */
const FULL_ROUGH_VELOCITY = 4000;
const ATTACK = 12;
const RELEASE = 2;

/** How churned the water is: rises fast with scroll speed, settles to glassy over ~1.5 s. */
export function stepRoughness(prev: number, velocityPxPerSec: number, dt: number) {
  const target = clamp(Math.abs(velocityPxPerSec) / FULL_ROUGH_VELOCITY);
  return clamp(damp(prev, target, target > prev ? ATTACK : RELEASE, dt));
}

const STILL_AFTER_MS = 1200;
const RISE_SECONDS = 2;

/** Stillness: after 1.2 s without pointer or scroll movement, calm rises 0 → 1 over 2 s; movement sinks it fast. */
export function stepCalm(prev: number, stillForMs: number, dt: number) {
  if (stillForMs < STILL_AFTER_MS) return clamp(damp(prev, 0, 6, dt));
  return clamp(prev + dt / RISE_SECONDS);
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/night/tide.ts">
<![CDATA[import { clamp } from "../motion/math";
import { CHAPTER_IDS, CHAPTER_POINTS, type ChapterId } from "./clock";

const LOW_TIDES: ChapterId[] = ["problem", "sensors", "smart-wake", "proof", "reveal"];

/** (progress, level) anchors: high at the start, each low tide at 0, a full high between lows, half-in at dawn. */
const ANCHORS: [number, number][] = (() => {
  const lows = LOW_TIDES.map((id) => CHAPTER_POINTS[id]);
  const out: [number, number][] = [[0, 1]];
  lows.forEach((p, i) => {
    if (i > 0) out.push([(lows[i - 1] + p) / 2, 1]);
    out.push([p, 0]);
  });
  out.push([1, 0.5]);
  return out;
})();

/** Water level in [0, 1] (1 = high tide), eased with a half cosine between anchors. */
export function tideLevel(p: number) {
  const x = clamp(p);
  for (let i = 1; i < ANCHORS.length; i++) {
    const [p1, l1] = ANCHORS[i];
    if (x <= p1) {
      const [p0, l0] = ANCHORS[i - 1];
      const t = p1 === p0 ? 1 : (x - p0) / (p1 - p0);
      return l0 + (l1 - l0) * (1 - Math.cos(Math.PI * t)) / 2;
    }
  }
  return ANCHORS[ANCHORS.length - 1][1];
}

export function nearestChapter(p: number): ChapterId {
  const x = clamp(p);
  let best: ChapterId = "hook";
  for (const id of CHAPTER_IDS) if (Math.abs(CHAPTER_POINTS[id] - x) < Math.abs(CHAPTER_POINTS[best] - x)) best = id;
  return best;
}

/** The chapter one step past the nearest one, clamped at both ends. */
export function stepChapter(p: number, dir: 1 | -1): ChapterId {
  const i = CHAPTER_IDS.indexOf(nearestChapter(p));
  return CHAPTER_IDS[Math.min(CHAPTER_IDS.length - 1, Math.max(0, i + dir))];
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/night/your-night.ts">
<![CDATA[import { clamp } from "../motion/math";

export const CYCLE_MIN = 90;

export type NightPlan = {
  bedMin: number;
  wakeMin: number;
  durationMin: number;
  cycleCount: number;
  /** Minutes after bedtime where one cycle ends and the next begins (the lightest moments). */
  cycleBoundariesMin: number[];
  /** Minutes after bedtime when the ring buzzes you awake. */
  smartWakeMin: number;
  windowMin: number;
};

export type NightError = "format" | "same-time" | "too-long";

function parseClock(s: string): number | null {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(s.trim());
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

export function planNight(bed: string, wake: string, windowMin = 30): { ok: true; plan: NightPlan } | { ok: false; error: NightError } {
  const bedMin = parseClock(bed);
  const wakeMin = parseClock(wake);
  if (bedMin === null || wakeMin === null) return { ok: false, error: "format" };
  const durationMin = (((wakeMin - bedMin) % 1440) + 1440) % 1440;
  if (durationMin === 0) return { ok: false, error: "same-time" };
  if (durationMin > 16 * 60) return { ok: false, error: "too-long" };

  const win = clamp(windowMin, 10, 30);
  const cycleBoundariesMin: number[] = [];
  for (let b = CYCLE_MIN; b < durationMin; b += CYCLE_MIN) cycleBoundariesMin.push(b);
  const last = cycleBoundariesMin[cycleBoundariesMin.length - 1];
  const smartWakeMin = last !== undefined && durationMin - last <= win ? last : durationMin;

  return {
    ok: true,
    plan: {
      bedMin,
      wakeMin,
      durationMin,
      cycleCount: Math.max(1, Math.round(durationMin / CYCLE_MIN)),
      cycleBoundariesMin,
      smartWakeMin,
      windowMin: win,
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/sound/mapping.ts">
<![CDATA[import { clamp, lerp } from "../motion/math";

export type SoundInput = { tide: number; roughness: number; calm: number; p: number };

/** The sea state → the soundscape's dials. Pure, so the mix can be reasoned about without audio. */
export function soundParams(input: SoundInput) {
  const tide = clamp(input.tide);
  const roughness = clamp(input.roughness);
  const calm = clamp(input.calm);
  const p = clamp(input.p);
  return {
    surfCutoffHz: lerp(300, 1800, tide) + roughness * 2500,
    surfGainDb: -18 + roughness * 6 - calm * 6,
    grit: roughness,
    padTempoBpm: lerp(52, 36, p),
    padGainDb: -22 - calm * 3,
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/sound/soundscape.ts">
<![CDATA[import { soundParams, type SoundInput } from "./mapping";

/** Slow open voicings, one per bar; the tempo (and so the pace of change) falls through the night. */
const CHORDS = [
  ["D3", "A3", "F#4", "E5"],
  ["B2", "F#3", "D4", "A4"],
  ["G2", "D3", "B3", "F#4"],
  ["A2", "E3", "C#4", "G#4"],
];

export type Soundscape = {
  update(f: SoundInput): void;
  chime(): void;
  setOn(on: boolean): void;
  dispose(): void;
};

/**
 * Generated live with Tone.js: no audio files. Must be created from a user gesture (the Sound toggle).
 * Surf = brown noise → low-pass (tide, roughness) → distortion (grit) → a slow swell. Pad = sine chords in reverb.
 */
export async function createSoundscape(): Promise<Soundscape> {
  const Tone = await import("tone");
  await Tone.start();

  const master = new Tone.Volume(-60).toDestination();
  const reverb = new Tone.Reverb({ decay: 9, wet: 0.65 }).connect(master);
  await reverb.ready;

  const surfVol = new Tone.Volume(-18).connect(master);
  const swell = new Tone.Gain(0.7).connect(surfVol);
  const swellLfo = new Tone.LFO({ frequency: 0.11, min: 0.35, max: 1 }).connect(swell.gain).start();
  const grit = new Tone.Distortion({ distortion: 0.5, wet: 0 }).connect(swell);
  const filter = new Tone.Filter({ frequency: 600, type: "lowpass", rolloff: -24 }).connect(grit);
  const noise = new Tone.Noise("brown").connect(filter).start();

  const padVol = new Tone.Volume(-22).connect(reverb);
  const pad = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "sine" }, envelope: { attack: 2.8, decay: 1, sustain: 0.7, release: 6 } }).connect(padVol);
  const bell = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 1.6, sustain: 0, release: 2 } }).connect(reverb);
  bell.volume.value = -20;

  const transport = Tone.getTransport();
  transport.bpm.value = 52;
  let bar = 0;
  const loop = new Tone.Loop((time) => {
    pad.triggerAttackRelease(CHORDS[bar % CHORDS.length], "1m", time, 0.35);
    bar++;
  }, "1m").start(0);
  transport.start();

  let last = 0;
  return {
    update(f) {
      const now = performance.now();
      if (now - last < 120) return; // dial the mix a few times a second, not every frame
      last = now;
      const s = soundParams(f);
      filter.frequency.rampTo(s.surfCutoffHz, 0.25);
      grit.wet.rampTo(s.grit * 0.55, 0.25);
      surfVol.volume.rampTo(s.surfGainDb, 0.4);
      padVol.volume.rampTo(s.padGainDb, 1.5);
      transport.bpm.rampTo(s.padTempoBpm, 3);
    },
    chime() {
      bell.triggerAttackRelease("E6", "8n", undefined, 0.5);
    },
    setOn(on) {
      master.volume.rampTo(on ? -6 : -60, on ? 1.2 : 0.5);
    },
    dispose() {
      loop.dispose();
      transport.stop();
      noise.stop();
      [noise, filter, grit, swell, swellLfo, surfVol, pad, padVol, bell, reverb, master].forEach((n) => n.dispose());
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/sound/switch.ts">
<![CDATA[type Switchable = { setOn(on: boolean): void; dispose(): void };

/**
 * The Sound toggle's state machine. One creation at a time however fast the button is pressed;
 * the latest press wins once the soundscape exists; a soundscape that arrives after dispose is disposed.
 */
export function createSoundSwitch<T extends Switchable>(create: () => Promise<T>, onChange?: (on: boolean) => void) {
  let want = false;
  let scape: T | null = null;
  let pending: Promise<void> | null = null;
  let disposed = false;

  const apply = () => scape?.setOn(want);
  const set = (on: boolean) => {
    want = on;
    onChange?.(on);
  };

  function ensure() {
    if (scape || pending) return;
    pending = create()
      .then((s) => {
        if (disposed) {
          s.dispose();
          return;
        }
        scape = s;
        apply();
      })
      .catch(() => set(false))
      .finally(() => {
        pending = null;
      });
  }

  return {
    toggle() {
      if (disposed) return;
      set(!want);
      if (want) ensure();
      apply();
    },
    isOn: () => want,
    get: () => scape,
    /** Resolves once any creation in flight has finished (for tests and teardown). */
    settled: () => pending ?? Promise.resolve(),
    dispose() {
      disposed = true;
      scape?.dispose();
      scape = null;
    },
  };
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/tidetable/NightCalculator.tsx">
<![CDATA["use client";

import { useEffect, useId, useMemo, useState } from "react";
import { formatClock } from "../night/clock";
import { planNight, type NightError, type NightPlan } from "../night/your-night";

const ERRORS: Record<NightError, string> = {
  format: "Use a time like 23:30.",
  "same-time": "Bedtime and wake time can't match.",
  "too-long": "That's longer than a night.",
};

type Props = { onPlan?: (plan: NightPlan | null, times: { bed: string; wake: string }) => void; className?: string };

/** Bedtime + wake time → cycles and the smart-wake moment. The same maths drives the 3D dawn shoreline. */
export function NightCalculator({ onPlan, className }: Props) {
  const id = useId();
  const [bed, setBed] = useState("23:30");
  const [wake, setWake] = useState("07:00");
  const [win, setWin] = useState(30);
  const result = useMemo(() => planNight(bed, wake, win), [bed, wake, win]);

  useEffect(() => {
    onPlan?.(result.ok ? result.plan : null, { bed, wake });
  }, [result, bed, wake, onPlan]);

  return (
    <div className={`lt-calc ${className ?? ""}`}>
      <div className="lt-calc__fields">
        <label className="lt-field">
          <span className="lt-field__label">Bedtime</span>
          <input className="lt-input" type="time" value={bed} onChange={(e) => setBed(e.target.value)} required />
        </label>
        <label className="lt-field">
          <span className="lt-field__label">Wake by</span>
          <input className="lt-input" type="time" value={wake} onChange={(e) => setWake(e.target.value)} required />
        </label>
        <label className="lt-field lt-field--wide">
          <span className="lt-field__label">Wake window <span className="lt-mono">{win} min</span></span>
          <input className="lt-range" type="range" min={10} max={30} step={5} value={win} onChange={(e) => setWin(Number(e.target.value))} />
        </label>
      </div>
      <div className="lt-calc__out" aria-live="polite" id={`${id}-out`}>
        {result.ok ? (
          <>
            <p className="lt-calc__line">
              <span className="lt-mono">{result.plan.cycleCount} tides out and in</span>
              <span>The ring wakes you at <output className="lt-calc__wake">{formatClock(result.plan.bedMin + result.plan.smartWakeMin)}</output></span>
            </p>
            <CycleChart plan={result.plan} />
          </>
        ) : (
          <p className="lt-calc__error" role="alert">{ERRORS[result.error]}</p>
        )}
      </div>
    </div>
  );
}

/** A small tide chart: one dip per 90-minute cycle, with the smart-wake point marked. */
function CycleChart({ plan }: { plan: NightPlan }) {
  const W = 320;
  const H = 64;
  const pts: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * plan.durationMin;
    const y = H / 2 + Math.cos((t / 90) * Math.PI * 2) * (H / 2 - 8);
    pts.push(`${((t / plan.durationMin) * W).toFixed(1)},${y.toFixed(1)}`);
  }
  const wx = (plan.smartWakeMin / plan.durationMin) * W;
  const wy = H / 2 + Math.cos((plan.smartWakeMin / 90) * Math.PI * 2) * (H / 2 - 8);
  return (
    <svg className="lt-calc__chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${plan.cycleCount} sleep cycles, smart wake marked`}>
      <polyline points={pts.join(" ")} />
      <circle cx={wx} cy={wy} r="4.5" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/tidetable/ShorePoster.tsx">
<![CDATA[/** A still of the night shore for the static page: moon, its streak on wet sand, five tide lines. */
export function ShorePoster() {
  const lines = [0, 1, 2, 3, 4];
  return (
    <svg className="lt-poster" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="lt-poster-glow" cx="70%" cy="26%" r="45%">
          <stop offset="0" className="lt-poster__glow-a" />
          <stop offset="1" className="lt-poster__glow-b" />
        </radialGradient>
        <linearGradient id="lt-poster-streak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" className="lt-poster__streak-a" />
          <stop offset="1" className="lt-poster__streak-b" />
        </linearGradient>
      </defs>
      <rect width="1200" height="520" className="lt-poster__sky" />
      <rect width="1200" height="520" fill="url(#lt-poster-glow)" />
      <circle cx="840" cy="130" r="38" className="lt-poster__moon" />
      <path className="lt-poster__headland" d="M0 300 C140 268 220 286 330 262 S520 230 610 270 S760 300 900 286 1100 262 1200 276 V330 H0Z" />
      <rect x="0" y="300" width="1200" height="220" className="lt-poster__sand" />
      <path d="M800 300 L880 300 L940 520 L740 520Z" fill="url(#lt-poster-streak)" />
      {lines.map((i) => (
        <path
          key={i}
          className="lt-poster__tideline"
          d={`M0 ${330 + i * 38} C200 ${322 + i * 38} 360 ${342 + i * 38} 600 ${332 + i * 38} S1000 ${324 + i * 38} 1200 ${336 + i * 38}`}
          style={{ opacity: 0.55 - i * 0.09 }}
        />
      ))}
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(lowtide)/lowtide/tidetable/TideTable.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { chapter, CHAPTERS, PRODUCT, SENSORS, STATS, TESTIMONIALS } from "../content/story";
import { PreorderForm } from "../forms/PreorderForm";
import { CHAPTER_CLOCK, formatClock, type ChapterId } from "../night/clock";
import { NightCalculator } from "./NightCalculator";
import { ShorePoster } from "./ShorePoster";

/**
 * Every word of LOWTIDE, in order. With reduced motion, no JavaScript or no WebGL this is the page;
 * while the 3D night runs it stays in the accessibility tree, visually hidden, as its mirror.
 */
export function TideTable() {
  const hook = chapter("hook");
  return (
    <main className="lt-table" id="lt-table">
      <header className="lt-hero">
        <Logo className="lt-hero__logo" />
        <ShorePoster />
        <div className="lt-hero__copy">
          <p className="lt-eyebrow"><span className="lt-mono">{formatClock(CHAPTER_CLOCK.hook)}</span> {hook.label}</p>
          <h1 className="lt-display">{hook.headline}</h1>
          <p className="lt-quiet">{hook.quietLine}</p>
        </div>
      </header>

      {CHAPTERS.filter((c) => c.id !== "hook").map((c) => (
        <section key={c.id} className="lt-tide" data-chapter={c.id} aria-labelledby={`lt-h-${c.id}`}>
          <div className="lt-tide__rail">
            <span className="lt-mono lt-tide__time">{formatClock(CHAPTER_CLOCK[c.id])}</span>
            <span className="lt-tide__label">{c.label}</span>
          </div>
          <div className="lt-tide__body">
            <h2 id={`lt-h-${c.id}`} className="lt-display lt-display--2">{c.headline}</h2>
            <p className="lt-quiet">{c.quietLine}</p>
            <ChapterDetail id={c.id} />
          </div>
        </section>
      ))}

      <footer className="lt-foot">
        <Logo />
        <ul className="lt-foot__sources">
          {STATS.map((s) => (
            <li key={s.value}><a href={s.sourceUrl} rel="noreferrer">{s.value}: {s.source}</a></li>
          ))}
        </ul>
        <p className="lt-mono lt-foot__note">LOWTIDE is a fictional brand. Moon imagery: NASA SVS CGI Moon Kit.</p>
      </footer>
    </main>
  );
}

function ChapterDetail({ id }: { id: ChapterId }) {
  switch (id) {
    case "problem":
      return (
        <ul className="lt-stats">
          {STATS.map((s) => (
            <li key={s.value} className="lt-stat">
              <span className="lt-stat__value">{s.value}</span>
              <span className="lt-stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      );
    case "sensors":
      return (
        <ul className="lt-pools">
          {SENSORS.map((s) => (
            <li key={s.id} className="lt-pool" data-sensor={s.id}>
              <span className="lt-pool__ring" aria-hidden="true" />
              <span className="lt-pool__name">{s.name}</span>
              <span className="lt-pool__line">{s.line}</span>
            </li>
          ))}
        </ul>
      );
    case "smart-wake":
      return (
        <p className="lt-note">
          Set the latest you can get up. Somewhere in the {PRODUCT.wakeWindowMin[0]}–{PRODUCT.wakeWindowMin[1]} minutes before it,
          your last cycle turns light. That is when the ring pulses, not when the alarm says.
        </p>
      );
    case "proof":
      return (
        <ul className="lt-quotes">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <blockquote className="lt-quote">
                <p>“{t.quote}”</p>
                <footer className="lt-mono">{t.name}, {t.city}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      );
    case "reveal":
      return (
        <dl className="lt-specs">
          <div><dt>Material</dt><dd>{PRODUCT.material}</dd></div>
          <div><dt>Battery</dt><dd>{PRODUCT.batteryDays} days a charge</dd></div>
          <div><dt>Sensors</dt><dd>{SENSORS.map((s) => s.name).join(", ")}</dd></div>
          <div><dt>Sizes</dt><dd>{PRODUCT.sizes[0]}–{PRODUCT.sizes[PRODUCT.sizes.length - 1]}</dd></div>
          <div><dt>Finishes</dt><dd>{PRODUCT.finishes.map((f) => f.name).join(", ")}</dd></div>
          <div><dt>App</dt><dd>{PRODUCT.app}</dd></div>
          <div><dt>Price</dt><dd>${PRODUCT.price}, no subscription</dd></div>
        </dl>
      );
    case "dawn":
      return (
        <div className="lt-dawn">
          <div className="lt-dawn__block">
            <p className="lt-dawn__title">Your night</p>
            <NightCalculator />
          </div>
          <div className="lt-dawn__block">
            <PreorderForm />
          </div>
        </div>
      );
    default:
      return null;
  }
}
]]>
    </file>
  </files>
</template>
