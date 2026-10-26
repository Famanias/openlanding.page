<template slug="cullet" name="Cullet">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(cullet)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./cullet/cullet.css";

const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-fc-inter" });
const display = Inter_Tight({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-fc-tight" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-fc-mono", preload: false });

export const metadata: Metadata = {
  title: "Cullet — Designed in glass.",
  description:
    "A real-time material studio. Author dispersion, transmission and refraction in the browser, preview them live, and export glass that renders the same in every glTF viewer.",
};
export const viewport: Viewport = { themeColor: "#F4F5F8", colorScheme: "light" };

export default function CulletLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="fc-body">
        <noscript>
          <style>{`[data-reveal],[data-reveal] > *{opacity:1!important;transform:none!important;translate:none!important;clip-path:none!important;filter:none!important}.fc-js-only{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(cullet)/cullet/assets.tsx">
<![CDATA[import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/cullet";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean; children?: ReactNode };

/**
 * A responsive picture once `npm run images -- cullet` has produced the file.
 * Cullet ships without photography: until a render exists this shows `children`
 * (the drawn swatch or poster that is part of the template), or a labelled placeholder.
 */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 33vw, 90vw", priority, children }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    if (children) return <>{children}</>;
    return (
      <div className={`fc-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="fc-mono">{assetKey}</span>
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
    <file path="src/app/(cullet)/cullet/cullet.css">
<![CDATA[/* Cullet: a real-time material studio, designed in glass.
 * Motion identity: precise and physical. Verbs: cleave (diagonal cuts, shard flights) and settle (spring lift and land).
 * Palette: ink, paper, white, slate, mist, haze, cobalt, emerald. Tints come only from color-mix().
 */
@import "tailwindcss";

@theme {
  --color-fc-ink: #0F1117;
  --color-fc-paper: #F4F5F8;
  --color-fc-white: #FFFFFF;
  --color-fc-slate: #525866;
  --color-fc-mist: #9AA1B2;
  --color-fc-haze: #DCE8FF;
  --color-fc-cobalt: #2563EB;
  --color-fc-emerald: #10B981;

  /* motion: glass sliding on glass, a spring that lands */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in: cubic-bezier(0.55, 0, 0.9, 0.35);
  --ease-back: cubic-bezier(0.34, 1.45, 0.64, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-ui: 300ms; /* hover fills and label rolls: frequent, so under the 300ms budget */
  --dur-base: 420ms;
  --dur-slow: 800ms;
  --dur-hero: 1200ms;
  --reveal-shift: 28px;
  --stagger: 70ms;
}

/* ---------- base ---------- */
.fc-body {
  --fc-ink: #0F1117; --fc-paper: #F4F5F8; --fc-white: #FFFFFF; --fc-slate: #525866;
  --fc-mist: #9AA1B2; --fc-haze: #DCE8FF; --fc-cobalt: #2563EB; --fc-emerald: #10B981;
  --fc-line: color-mix(in oklab, var(--fc-ink) 9%, transparent);
  --fc-line-strong: color-mix(in oklab, var(--fc-ink) 16%, transparent);
  --fc-glass: color-mix(in oklab, var(--fc-white) 78%, transparent);
  --fc-shade: color-mix(in oklab, var(--fc-haze) 55%, var(--fc-mist));
  --fc-lift: 0 1px 0 color-mix(in oklab, var(--fc-white) 90%, transparent) inset, 0 18px 40px -18px color-mix(in oklab, var(--fc-ink) 22%, transparent), 0 2px 6px color-mix(in oklab, var(--fc-ink) 5%, transparent);
  --fc-sans: var(--font-fc-inter), -apple-system, system-ui, sans-serif;
  --fc-display: var(--font-fc-tight), var(--font-fc-inter), system-ui, sans-serif;
  --fc-code: var(--font-fc-mono), ui-monospace, SFMono-Regular, monospace;
  --fc-gut: clamp(16px, 0.4rem + 3.6vw, 64px);
  --fc-max: 1240px;
  margin: 0; min-width: 320px; overflow-x: clip;
  background: var(--fc-paper); color: var(--fc-ink);
  font: 400 16px/1.6 var(--fc-sans);
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
}
html:has(.fc-body) { background: var(--fc-paper); overflow-x: clip; }
html[data-fc-lock] { overflow: hidden; }
.fc-body *, .fc-body *::before, .fc-body *::after { box-sizing: border-box; }
.fc-body ::selection { background: color-mix(in oklab, var(--fc-cobalt) 22%, transparent); color: inherit; }
:where(.fc-body) a { color: inherit; text-decoration: none; }
:where(.fc-body) :is(button, input, select, textarea) { font: inherit; color: inherit; }
:where(.fc-body) button { cursor: pointer; background: none; border: 0; padding: 0; }
:where(.fc-body) :is(h1, h2, h3, p, figure, blockquote, dl, dd, fieldset, pre) { margin: 0; }
:where(.fc-body) fieldset { border: 0; padding: 0; min-width: 0; }
:where(.fc-body) :is(ul, ol) { margin: 0; padding: 0; list-style: none; }
.fc-body :focus-visible { outline: 2px solid var(--fc-cobalt); outline-offset: 3px; border-radius: 6px; }
.fc-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.fc-skip { position: fixed; left: 16px; top: 12px; z-index: 100; padding: 12px 18px; border-radius: 10px; background: var(--fc-ink); color: var(--fc-paper) !important; translate: 0 -200%; transition: translate var(--dur-base) var(--ease-out); }
.fc-skip:focus { translate: 0 0; }
.fc-mono { font: 500 11.5px/1.4 var(--fc-code); letter-spacing: 0.04em; }
.fc-placeholder { display: grid; place-items: center; background: color-mix(in oklab, var(--fc-ink) 5%, var(--fc-paper)); color: var(--fc-slate); }
.fc-wrap { width: min(100% - 2 * var(--fc-gut), var(--fc-max)); margin-inline: auto; }

.fc-eyebrow { font: 500 12px/1.4 var(--fc-code); letter-spacing: 0.14em; text-transform: uppercase; color: var(--fc-slate); display: flex; align-items: center; gap: 10px; }
.fc-eyebrow::before { content: ""; width: 18px; height: 1px; background: var(--fc-cobalt); }
.fc-eyebrow--on-ink { color: var(--fc-mist); }
.fc-h2 { font-family: var(--fc-display); font-size: clamp(2.1rem, 1.2rem + 3.3vw, 4.4rem); font-weight: 600; letter-spacing: -0.042em; line-height: 0.98; text-wrap: balance; }
.fc-lead { font-size: clamp(1.02rem, 0.96rem + 0.25vw, 1.18rem); color: var(--fc-slate); max-width: 52ch; }
.fc-head { display: grid; gap: 22px; margin-bottom: clamp(40px, 6vw, 72px); }
.fc-head--split { grid-template-columns: 1fr; align-items: end; }
.fc-head--center { justify-items: center; text-align: center; }
.fc-head--center .fc-eyebrow::before { display: none; }
@media (min-width: 900px) { .fc-head--split { grid-template-columns: 1.2fr 1fr; gap: 48px; } }

/* masks keep descenders */
.fc-mask { display: inline-block; max-width: 100%; overflow: clip; vertical-align: top; padding-bottom: 0.12em; margin-bottom: -0.12em; }
.fc-mask__in { display: inline-block; }

/* ---------- logo ---------- */
.fc-logo { display: inline-flex; align-items: center; gap: 10px; }
.fc-logo__mark { width: 22px; height: 22px; flex: none; }
.fc-logo__word { font: 600 18px/1 var(--fc-display); letter-spacing: -0.03em; }

/* ---------- buttons and links ---------- */
.fc-btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  height: 48px; padding: 0 22px; border-radius: 10px; overflow: hidden; isolation: isolate;
  font-size: 15px; font-weight: 500; letter-spacing: -0.01em; white-space: nowrap;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast);
}
.fc-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-ui) var(--ease-out); }
.fc-btn--ink { background: var(--fc-ink); color: var(--fc-white); }
.fc-btn--ink::before { background: var(--fc-emerald); }
.fc-btn--ghost { background: var(--fc-white); color: var(--fc-ink); box-shadow: inset 0 0 0 1px var(--fc-line-strong); }
.fc-btn--ghost::before { background: var(--fc-haze); }
.fc-btn--emerald { background: var(--fc-emerald); color: var(--fc-ink); }
.fc-btn--emerald::before { background: var(--fc-white); }
.fc-btn--sm { height: 38px; padding: 0 16px; font-size: 13.5px; border-radius: 8px; }
.fc-btn__label { display: inline-grid; overflow: clip; line-height: 1.3; }
.fc-btn__label > span, .fc-btn__label::after { grid-area: 1 / 1; transition: translate var(--dur-ui) var(--ease-out); }
.fc-btn__label::after { content: attr(data-text) / ""; translate: 0 110%; }
.fc-btn:active { transform: scale(0.97); transition-duration: var(--dur-instant); }
.fc-btn:disabled { cursor: wait; opacity: 0.86; }
.fc-btn--ink:focus-visible::before, .fc-btn--emerald:focus-visible::before { transform: scaleX(1); transform-origin: left; }
.fc-btn--ink:focus-visible { color: var(--fc-ink); }
.fc-link { position: relative; display: inline-block; padding: 4px 0; font-weight: 500; }
.fc-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out); }
.fc-link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
.fc-link:active { translate: 0 1px; }
.fc-link--quiet { color: var(--fc-slate); transition: color var(--dur-fast); }
.fc-arrow { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: translate var(--dur-base) var(--ease-out); }
.fc-magnetic { display: inline-block; translate: var(--mx, 0) var(--my, 0); }
@media (hover: hover) and (pointer: fine) {
  .fc-btn:hover::before { transform: scaleX(1); transform-origin: left; }
  .fc-btn--ink:hover { color: var(--fc-ink); }
  .fc-btn:hover .fc-btn__label > span { translate: 0 -110%; }
  .fc-btn:hover .fc-btn__label::after { translate: 0 0; }
  .fc-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .fc-link--quiet:hover { color: var(--fc-ink); }
}

/* "Light the glass": the opt-in for live WebGL on touch screens */
.fc-light {
  position: absolute; z-index: 6; right: max(24px, 7vw); bottom: max(24px, 10svh);
  display: inline-flex; align-items: center; gap: 10px; height: 42px; padding: 0 18px; border-radius: 999px;
  background: var(--fc-glass); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white);
  font-size: 13.5px; font-weight: 500;
  transition: transform var(--dur-base) var(--ease-spring);
}
.fc-light:active { transform: scale(0.96); transition-duration: var(--dur-instant); }
.fc-light__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--fc-cobalt); box-shadow: 0 0 0 4px color-mix(in oklab, var(--fc-cobalt) 18%, transparent); }
.fc-light--sampler { right: 50%; translate: 50% 0; bottom: 18px; }

/* ---------- reveals (hidden states exist only with motion allowed and scripting on) ---------- */
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  [data-reveal] {
    transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out), translate var(--dur-slow) var(--ease-out);
    transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger));
  }
  [data-reveal="rise"]:not([data-in="true"]) { opacity: 0; transform: translateY(14px); }
  [data-reveal="mask"]:not([data-in="true"]) { transform: translateY(108%); }
  [data-reveal="mask"] { transition-duration: 900ms; transition-timing-function: var(--ease-out-expo); }
  [data-reveal="slide"]:not([data-in="true"]) { opacity: 0; transform: translateX(-18px); }
  [data-reveal="scale"]:not([data-in="true"]) { opacity: 0; transform: translateY(32px) scale(0.96); }
  [data-reveal="draw"]:not([data-in="true"]) { transform: scaleX(0); }
  [data-reveal="draw"] { transform-origin: left; transition-duration: 1100ms; transition-timing-function: var(--ease-in-out); }
  /* the cleave: a diagonal cut wipes the child open, and the inside settles from a slight zoom */
  [data-reveal="cleave"] > * { transition: clip-path 1000ms var(--ease-in-out), scale 1200ms var(--ease-out); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="cleave"]:not([data-in="true"]) > * { clip-path: polygon(-30% -30%, -30% -30%, -30% -30%, -30% -30%); scale: 1.06; }
  [data-reveal="cleave"][data-in="true"] > * { clip-path: polygon(-30% -30%, 170% -30%, 130% 170%, -30% 130%); }
}

/* ---------- load choreography (CSS only, so it plays before hydration) ---------- */
@keyframes fc-drop { from { opacity: 0; translate: 0 -14px; } }
@keyframes fc-rise { from { translate: 0 108%; } }
@keyframes fc-fade-up { from { opacity: 0; translate: 0 16px; } }
@keyframes fc-settle { from { opacity: 0; scale: 1.035; filter: blur(8px); } to { filter: none; } }
@keyframes fc-backdrop { from { scale: 1.08; opacity: 0.4; } }
@media (prefers-reduced-motion: no-preference) {
  .fc-hero__backdrop { animation: fc-backdrop var(--dur-hero) var(--ease-out) both; }
  .fc-poster__set { animation: fc-settle 1000ms var(--ease-out) both; }
  .fc-slab__nav .fc-load { animation: fc-drop 700ms var(--ease-out) both; animation-delay: calc(150ms + var(--i) * 50ms); }
  .fc-slab__panel .fc-load { animation: fc-fade-up 800ms var(--ease-out) both; animation-delay: calc(260ms + var(--i) * 70ms); }
  .fc-slab__panel .fc-load--rise { animation: fc-rise 900ms var(--ease-out-expo) both; animation-delay: calc(var(--i) * 40ms); }
}

/* ---------- hero: the slab ---------- */
.fc-hero { position: relative; height: 100svh; min-height: 520px; }
.fc-hero__stage { position: relative; height: 100svh; min-height: 520px; overflow: hidden; }
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .fc-hero { height: 230svh; }
  .fc-hero__stage { position: sticky; top: 0; }
}
.fc-hero__backdrop {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 22% 18%, color-mix(in oklab, var(--fc-white) 95%, transparent) 0%, transparent 52%),
    radial-gradient(circle at 82% 85%, color-mix(in oklab, var(--fc-haze) 55%, transparent) 0%, transparent 58%),
    linear-gradient(180deg, color-mix(in oklab, var(--fc-white) 40%, var(--fc-paper)) 0%, color-mix(in oklab, var(--fc-haze) 28%, var(--fc-paper)) 100%);
}
.fc-hero__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; z-index: 1; pointer-events: none; opacity: 0; transition: opacity 700ms var(--ease-out); }
.fc-hero[data-gl="on"] .fc-hero__canvas { opacity: 1; }

/* revealed as the slab parts: the next chapter's title, sitting behind the glass */
.fc-hero__under {
  position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 14px; text-align: center; padding: var(--fc-gut);
  --u: clamp(0, (var(--cleave, 0) - 0.3) * 2.2, 1);
  opacity: var(--u); scale: calc(0.94 + var(--u) * 0.06);
}
.fc-hero__under-eyebrow { font: 500 12px/1 var(--fc-code); letter-spacing: 0.16em; text-transform: uppercase; color: var(--fc-cobalt); }
.fc-hero__under-title { font: 600 clamp(2.2rem, 1rem + 4.6vw, 5.4rem)/0.98 var(--fc-display); letter-spacing: -0.045em; max-width: 14ch; text-wrap: balance; }

.fc-slab { position: absolute; z-index: 2; inset: 8.5svh 5.5vw; container: slab / size; }
@media (max-width: 639px) { .fc-slab { inset: 16px; } }

/* the poster: one HTML-positioned SVG per shard */
.fc-poster { position: absolute; inset: 0; transition: opacity 700ms var(--ease-out); }
.fc-poster__defs { position: absolute; }
.fc-poster__set { position: absolute; inset: 0; }
.fc-poster__set--port { display: none; }
@media (orientation: portrait) { .fc-poster__set--land { display: none; } .fc-poster__set--port { display: block; } }
.fc-shard {
  position: absolute; overflow: visible;
  filter: drop-shadow(3px 5px 0 color-mix(in oklab, var(--fc-shade) 52%, transparent)) drop-shadow(0 22px 28px color-mix(in oklab, var(--fc-ink) 6%, transparent));
}
.fc-shard__body { fill: url(#fc-quartz); }
.fc-shard__rim { fill: none; stroke: var(--fc-white); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.fc-hero[data-gl="on"] .fc-poster { opacity: 0; }

/* the cleave and the shatter, for the poster (the WebGL slab does its own) */
@media (prefers-reduced-motion: no-preference) {
  .fc-shard {
    --f: clamp(0, (var(--cleave, 0) - var(--i) * 0.035) / 0.62, 1);
    --e: calc(var(--f) * var(--f) * var(--f));
    transform: translate3d(calc(var(--ox) * var(--e) * 46cqw), calc(var(--oy) * var(--e) * 46cqh), 0) rotate(calc(var(--spin) * var(--e))) scale(calc(1 + var(--e) * 0.12));
    opacity: calc(1 - var(--e) * 0.9);
  }
  .fc-hero:not([data-cleaving]) .fc-shard { transition: transform 820ms var(--ease-back), opacity 500ms var(--ease-out); transition-delay: calc(var(--i) * 30ms); }
  .fc-hero:is([data-state="shattering"], [data-state="paper"]) .fc-shard {
    transform: translate3d(calc(var(--ox) * 52cqw), calc(var(--oy) * 52cqh + 34cqh), 0) rotate(calc(var(--spin) * 3)) scale(1.1);
    opacity: 0; transition: transform 720ms var(--ease-in), opacity 600ms var(--ease-in); transition-delay: calc(var(--i) * 30ms);
  }
  .fc-slab__nav, .fc-slab__panel { opacity: clamp(0, 1 - var(--cleave, 0) * 3.2, 1); translate: 0 calc(var(--cleave, 0) * -5svh); }
}
.fc-hero[data-cleaving] .fc-slab { pointer-events: none; }
.fc-hero[data-state="paper"] .fc-poster { opacity: 0; }
.fc-hero:is([data-state="shattering"], [data-state="paper"]) .fc-hero__under { opacity: 0; }
.fc-hero:is([data-state="shattering"], [data-state="paper"]) :is(.fc-slab__nav, .fc-slab__panel) { opacity: 0; transition: opacity 240ms var(--ease-out); pointer-events: none; }

/* the text on the glass: every printed element is one line, sized from the slab */
.fc-slab__nav, .fc-slab__panel { position: absolute; left: 0; right: 0; z-index: 2; pointer-events: none; transform-origin: 0 0; }
.fc-slab__nav { top: 0; height: max(48px, 10.8cqh); display: flex; align-items: center; padding: 0 max(20px, 2.2cqw); font-size: max(12px, 0.87cqw); }
.fc-slab__panel { top: calc(max(48px, 10.8cqh) + max(8px, 0.81cqw)); bottom: 0; container: panel / size; }
.fc-hero[data-gl="on"] :is(.fc-slab__nav, .fc-slab__panel) { will-change: transform; }
.fc-slab { --print: var(--fc-ink); }
.fc-slab [data-print] { color: var(--print); white-space: nowrap; }
.fc-slab :is(a, button, [data-print="text"]) { pointer-events: auto; }
.fc-slab__brand { display: inline-flex; align-items: center; gap: max(9px, 0.7cqw); }
.fc-slab__mark { --print-bg: var(--fc-paper); display: block; width: max(15px, 1.16cqw); height: max(15px, 1.16cqw); }
.fc-slab__mark svg { display: block; width: 100%; height: 100%; }
.fc-slab__word { display: inline-block; font: 600 max(14px, 1.01cqw)/1.2 var(--fc-sans); letter-spacing: -0.02em; }
.fc-slab__links { position: absolute; left: calc(29.5% + max(14px, 1.4cqw)); display: inline-flex; align-items: center; }
.fc-slab__link { --print: var(--fc-slate); display: inline-block; font-weight: 500; line-height: 1.4; transition: color var(--dur-fast); }
.fc-slab__dot { --print: var(--fc-mist); display: inline-block; padding: 0 0.85em; line-height: 1.4; }
.fc-slab__signin { --print: var(--fc-ink); position: absolute; right: max(20px, 2.2cqw); display: inline-block; font-weight: 500; line-height: 1.4; }

.fc-slab__panel { padding: max(20px, 9cqh) max(24px, 5.8cqw) 0; display: flex; flex-direction: column; align-items: flex-start; }
.fc-slab__ring { --print: rgb(15 17 23 / 0.06); position: absolute; top: 15%; right: calc(max(24px, 5.8cqw) + 1.4cqw); width: 3.9cqw; aspect-ratio: 1; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--print); }
.fc-slab__eyebrow { --print: var(--fc-slate); display: inline-block; font: 600 max(10.5px, 0.72cqw)/1.3 var(--fc-sans); letter-spacing: 0.2em; text-transform: uppercase; }
.fc-slab__title { margin-top: max(12px, 2.4cqh); font-family: var(--fc-sans); font-size: clamp(38px, min(7.8cqw, 20cqh), 220px); font-weight: 600; letter-spacing: -0.045em; line-height: 0.97; }
.fc-slab__title .fc-mask { display: block; width: fit-content; }
.fc-slab__title [data-print] { line-height: 0.97; }
.fc-slab__sub { --print: var(--fc-slate); margin-top: max(18px, 4.6cqh); font-size: max(14px, 1.2cqw); line-height: 1.48; letter-spacing: -0.01em; }
.fc-slab__sub > span { display: block; width: fit-content; }
/* wide slabs: two lines, so the CTAs sit clear of the l2→J4 cleavage */
@container panel (min-aspect-ratio: 1 / 1) { .fc-slab__sub > span:nth-child(-n + 2) { display: inline-block; } }
.fc-slab__ctas { margin-top: max(18px, 4.6cqh); display: flex; align-items: center; gap: max(18px, 2cqw); }
.fc-slab__cta {
  --print-bg: var(--fc-ink); --print: var(--fc-white);
  display: inline-flex; align-items: center; height: max(36px, 2.6cqw); padding: 0 max(16px, 1.5cqw); border-radius: max(5px, 0.36cqw);
  background: var(--print-bg); font-size: max(12.5px, 0.86cqw); font-weight: 500;
  transition: background-color var(--dur-fast) var(--ease-out), transform var(--dur-base) var(--ease-spring);
}
.fc-slab__cta-label { --print: var(--fc-white); display: inline-block; line-height: 1.3; transition: color var(--dur-fast); }
.fc-slab__cta:active { transform: scale(0.97); transition-duration: var(--dur-instant); }
.fc-slab__paper { --print: var(--fc-ink); --print-line: 0; display: inline-block; font-size: max(12.5px, 0.86cqw); font-weight: 500; line-height: 1.3; text-decoration: underline transparent 1px; text-underline-offset: 4px; transition: text-decoration-color var(--dur-fast), color var(--dur-fast); }
.fc-slab__foot { position: absolute; left: max(24px, 5.8cqw); right: max(24px, 5.8cqw); bottom: max(16px, 4.4cqh); display: flex; justify-content: space-between; font-size: max(10px, 0.68cqw); }
.fc-slab__foot > span { --print: var(--fc-slate); display: inline-block; line-height: 1.3; }
@media (hover: hover) and (pointer: fine) {
  .fc-slab__link:hover { --print: var(--fc-ink); }
  .fc-slab__signin:hover { --print: var(--fc-cobalt); }
  .fc-slab__cta:hover { --print-bg: var(--fc-emerald); }
  .fc-slab__cta:hover .fc-slab__cta-label { --print: var(--fc-ink); }
  .fc-slab__paper:hover { --print: var(--fc-cobalt); --print-line: 1; text-decoration-color: currentColor; }
}
.fc-slab__cta:focus-visible { --print-bg: var(--fc-emerald); }
.fc-slab__cta:focus-visible .fc-slab__cta-label { --print: var(--fc-ink); }
.fc-slab__paper:focus-visible { --print: var(--fc-cobalt); --print-line: 1; }

/* GL mode: the glass carries the ink; the DOM stays for selection, focus and hits */
.fc-hero[data-gl="on"] .fc-slab [data-print] { color: transparent; }
.fc-hero[data-gl="on"] .fc-slab__cta { background: transparent; }
.fc-hero[data-gl="on"] .fc-slab__mark svg, .fc-hero[data-gl="on"] .fc-slab__ring { visibility: hidden; }
.fc-hero[data-gl="on"] .fc-slab__paper { text-decoration-color: transparent; }
.fc-hero[data-gl="on"] .fc-slab ::selection { color: transparent; }

@container panel (max-aspect-ratio: 1 / 1) {
  .fc-slab__panel { padding-top: max(28px, 8cqh); }
  .fc-slab__title { font-size: min(16cqw, 11cqh); margin-top: 3cqh; }
  .fc-slab__sub { font-size: max(14px, 4.1cqw); margin-top: 5cqh; }
  .fc-slab__ctas { margin-top: 5cqh; gap: 20px; }
  .fc-slab__cta { height: 44px; padding: 0 18px; font-size: 14px; border-radius: 7px; }
  .fc-slab__paper { font-size: 14px; }
  .fc-slab__foot { font-size: 10.5px; }
  .fc-slab__ring { width: 12cqw; top: 6%; }
}
@container slab (max-aspect-ratio: 1 / 1) {
  .fc-slab__links { left: calc(31% + max(14px, 1.4cqw)); }
}
@container slab (max-width: 520px) {
  .fc-slab__dot--wide, .fc-slab__link--wide { display: none; }
}

/* the paper: a short technical note where the slab was */
.fc-paper { position: absolute; inset: 0; z-index: 5; overflow-y: auto; overscroll-behavior: contain; }
.fc-paper[hidden] { display: none; }
.fc-paper__back {
  position: absolute; left: 15vw; top: 21svh; padding: 16px 26px; font-size: max(13px, 0.74vw); font-weight: 500; letter-spacing: -0.01em;
  display: inline-flex; gap: 8px; align-items: center; border-radius: 12px; transition: color var(--dur-fast), transform var(--dur-base) var(--ease-spring);
}
.fc-hero:not([data-gl="on"]) .fc-paper__back { background: var(--fc-glass); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); }
.fc-paper__back:active { transform: scale(0.96); }
.fc-paper__col { position: absolute; left: 32.4vw; top: 31svh; width: min(34vw, 600px); padding-bottom: 8svh; }
.fc-paper__label { font: 500 11.5px/1 var(--fc-code); letter-spacing: 0.16em; text-transform: uppercase; color: var(--fc-cobalt); }
.fc-paper__title { margin: 14px 0 clamp(14px, 1.25vw, 26px); font: 600 clamp(20px, 1.5vw, 34px)/1.15 var(--fc-display); letter-spacing: -0.025em; }
.fc-paper__p { font-size: clamp(13.5px, 0.82vw, 17px); line-height: 1.72; color: var(--fc-slate); margin-bottom: clamp(12px, 1vw, 22px); }
.fc-paper__figs { display: flex; gap: 28px; margin: 22px 0 26px; padding-top: 18px; border-top: 1px solid var(--fc-line); }
.fc-paper__figs dt { font: 500 11px/1.3 var(--fc-code); letter-spacing: 0.06em; text-transform: uppercase; color: var(--fc-slate); }
.fc-paper__figs dd { font: 600 20px/1.3 var(--fc-display); letter-spacing: -0.02em; }
.fc-paper__more { font-weight: 500; color: var(--fc-cobalt); }
@media (prefers-reduced-motion: no-preference) {
  .fc-paper[data-open="true"] .fc-paper__col > * { animation: fc-fade-up 600ms var(--ease-out) both; }
  .fc-paper[data-open="true"] .fc-paper__col > :nth-child(2) { animation-delay: 60ms; }
  .fc-paper[data-open="true"] .fc-paper__col > :nth-child(3) { animation-delay: 120ms; }
  .fc-paper[data-open="true"] .fc-paper__col > :nth-child(4) { animation-delay: 180ms; }
  .fc-paper[data-open="true"] .fc-paper__col > :nth-child(5) { animation-delay: 240ms; }
  .fc-paper[data-open="true"] .fc-paper__col > :nth-child(n + 6) { animation-delay: 300ms; }
  .fc-paper[data-open="true"] .fc-paper__back { animation: fc-drop 500ms var(--ease-back) both 80ms; }
}
@media (hover: hover) and (pointer: fine) { .fc-paper__back:hover { color: var(--fc-cobalt); } }
@media (max-width: 820px) {
  .fc-paper__back { left: 6vw; top: 9svh; }
  .fc-paper__col { left: 8vw; width: 84vw; top: 20svh; }
}

/* ---------- header ---------- */
.fc-header { position: fixed; z-index: 40; top: 12px; left: var(--fc-gut); right: var(--fc-gut); pointer-events: none; }
.fc-header__bar {
  position: relative; display: flex; align-items: center; gap: 18px; max-width: var(--fc-max); margin-inline: auto; height: 58px; padding: 0 10px 0 18px;
  border-radius: 16px; background: var(--fc-glass); -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4);
  box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); pointer-events: auto; overflow: hidden;
  transform: translateY(calc(-100% - 72px)); transition: transform 700ms var(--ease-out-expo);
}
html[data-fc-chrome="on"] .fc-header__bar, .fc-header[data-menu="true"] .fc-header__bar, .fc-header:focus-within .fc-header__bar { transform: none; }
@media (scripting: none) { .fc-header { display: none; } }
.fc-header__home { display: inline-flex; border-radius: 8px; }
.fc-header__home:active { opacity: 0.7; }
.fc-header__nav { position: relative; margin-left: auto; }
.fc-header__links { display: flex; gap: 4px; }
.fc-header__link { position: relative; z-index: 1; display: block; padding: 8px 14px; font-size: 14px; font-weight: 500; color: var(--fc-slate); border-radius: 8px; transition: color var(--dur-fast); }
.fc-header__link[aria-current] { color: var(--fc-ink); }
.fc-header__pill {
  position: absolute; left: 0; bottom: 2px; width: 100px; height: 2px; border-radius: 2px; background: var(--fc-cobalt);
  transform-origin: 0 50%; opacity: 0; transition: transform 520ms var(--ease-out-expo), opacity var(--dur-fast);
}
.fc-header__pill[data-on="true"] { opacity: 1; }
.fc-header__progress { position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--fc-cobalt); transform-origin: left; transform: scaleX(var(--fc-page, 0)); opacity: 0.6; }
.fc-header__toggle { display: none; width: 44px; height: 44px; border-radius: 10px; place-items: center; transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast); }
.fc-header__toggle:active { transform: scale(0.94); }
.fc-header__bars { display: grid; gap: 5px; width: 18px; }
.fc-header__bars span { display: block; height: 1.6px; background: currentColor; border-radius: 2px; transition: transform var(--dur-base) var(--ease-out); }
.fc-header[data-menu="true"] .fc-header__bars span:first-child { transform: translateY(3.3px) rotate(45deg); }
.fc-header[data-menu="true"] .fc-header__bars span:last-child { transform: translateY(-3.3px) rotate(-45deg); }
@media (hover: hover) and (pointer: fine) { .fc-header__link:hover { color: var(--fc-ink); } .fc-header__toggle:hover { background: var(--fc-haze); } }
@media (max-width: 820px) {
  .fc-header__nav, .fc-header__cta { display: none; }
  .fc-header__toggle { display: grid; margin-left: auto; }
}
.fc-menu {
  position: fixed; inset: 0; z-index: -1; padding: 104px var(--fc-gut) 40px; pointer-events: auto;
  background: color-mix(in oklab, var(--fc-paper) 94%, transparent); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
}
.fc-menu[hidden] { display: none; }
.fc-menu__link { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--fc-line); font: 600 clamp(28px, 8vw, 44px)/1.1 var(--fc-display); letter-spacing: -0.035em; }
.fc-menu__link[aria-current] { color: var(--fc-cobalt); }
.fc-menu__link:active { translate: 4px 0; }
.fc-menu__n { font: 500 12px/1 var(--fc-code); color: var(--fc-slate); }
@keyframes fc-menu-open { from { clip-path: circle(0 at calc(100% - 52px) 40px); } to { clip-path: circle(150% at calc(100% - 52px) 40px); } }
@media (prefers-reduced-motion: no-preference) {
  .fc-menu[data-open="true"] { animation: fc-menu-open 480ms var(--ease-in-out) both; }
  .fc-menu[data-open="true"] li { animation: fc-fade-up 520ms var(--ease-out) both; animation-delay: calc(160ms + var(--i) * 55ms); }
}

/* ---------- chapter 01: the terms ---------- */
.fc-terms { position: relative; padding: clamp(88px, 12vw, 150px) 0; }
.fc-terms__stage { width: min(100% - 2 * var(--fc-gut), var(--fc-max)); margin-inline: auto; }
.fc-terms__head { display: grid; gap: 18px; margin-bottom: clamp(36px, 5vw, 64px); }
.fc-rail { display: none; }
.fc-terms__list { display: grid; gap: clamp(20px, 3vw, 32px); }
.fc-term { display: grid; gap: clamp(20px, 3vw, 44px); align-items: center; }
@media (min-width: 760px) { .fc-term { grid-template-columns: 1.05fr 1fr; } }
.fc-term__fig-in {
  position: relative; border-radius: 20px; padding: clamp(18px, 2.4vw, 32px);
  background: linear-gradient(160deg, var(--fc-white), color-mix(in oklab, var(--fc-haze) 40%, var(--fc-white)));
  box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white);
}
.fc-term__chip { position: absolute; right: 16px; top: 14px; padding: 6px 10px; border-radius: 999px; background: var(--fc-paper); font: 500 11.5px/1 var(--fc-code); color: var(--fc-slate); box-shadow: inset 0 0 0 1px var(--fc-line); }
.fc-term__n { font: 500 12px/1 var(--fc-code); letter-spacing: 0.08em; color: var(--fc-slate); }
.fc-term__n span { color: var(--fc-cobalt); }
.fc-term__name { margin: 14px 0 16px; font: 600 clamp(2rem, 1.2rem + 2.8vw, 4rem)/0.98 var(--fc-display); letter-spacing: -0.045em; }
.fc-term__body { font-size: clamp(1rem, 0.95rem + 0.3vw, 1.2rem); line-height: 1.6; color: var(--fc-slate); max-width: 44ch; }
.fc-terms__meter { display: none; }

/* the diagrams */
.fc-dg { display: block; width: 100%; height: auto; overflow: visible; }
.fc-dg path, .fc-dg rect { vector-effect: none; }
.fc-dg__glass { fill: color-mix(in oklab, var(--fc-haze) 60%, var(--fc-white)); stroke: var(--fc-white); stroke-width: 1.5; }
.fc-dg__glass--frost { fill: color-mix(in oklab, var(--fc-haze) 75%, var(--fc-mist)); }
.fc-dg__film { fill: none; stroke: var(--fc-cobalt); stroke-width: 1; opacity: 0.55; }
.fc-dg__normal { fill: none; stroke: var(--fc-mist); stroke-width: 1; stroke-dasharray: 4 5; }
.fc-dg__ray, .fc-dg__spectral, .fc-dg__surface, .fc-dg__arc, .fc-dg__cone, .fc-dg__wave { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.fc-dg__ray { stroke: var(--fc-ink); stroke-width: 1.8; }
.fc-dg__ray--accent { stroke: var(--fc-cobalt); }
.fc-dg__ray--thin { stroke-width: 1.1; opacity: 0.55; }
.fc-dg__ray--soft { stroke: var(--fc-slate); stroke-width: 1.2; opacity: 0.7; }
.fc-dg__spectral { stroke-width: 2.2; }
.fc-dg__surface { stroke: var(--fc-ink); stroke-width: 1.4; }
.fc-dg__arc { stroke: var(--fc-slate); stroke-width: 1.2; }
.fc-dg__cone { stroke: var(--fc-cobalt); stroke-width: 1.2; opacity: 0.55; }
.fc-dg__cone--wide { opacity: 0.4; }
.fc-dg__wave { stroke: var(--fc-cobalt); stroke-width: 1.4; }
.fc-dg__label { font: 500 9.5px var(--fc-code); fill: var(--fc-slate); letter-spacing: 0.03em; }
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .fc-dg [pathLength] { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 900ms var(--ease-in-out); transition-delay: calc(250ms + var(--d, 0) * 200ms); }
  .fc-term__fig[data-in="true"] .fc-dg [pathLength] { stroke-dashoffset: 0; }
  .fc-dg__label { opacity: 0; transition: opacity 600ms var(--ease-out) 900ms; }
  .fc-term__fig[data-in="true"] .fc-dg__label { opacity: 1; }
}

/* held: one term at a time on a pinned stage, the rail beside it */
@media (min-width: 960px) and (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .fc-terms { height: calc(var(--count) * 78svh + 100svh); padding: 0; }
  .fc-terms__stage {
    position: sticky; top: 0; height: 100svh; display: grid; grid-template: "head head" auto "rail list" 1fr / 230px 1fr;
    column-gap: clamp(32px, 4vw, 72px); padding: max(96px, 13svh) 0 max(40px, 7svh);
    --hand: clamp(0, (var(--p, 0) - 0.9) / 0.1, 1);
    scale: calc(1 - var(--hand) * 0.05); opacity: calc(1 - var(--hand) * 0.5); transform-origin: 50% 30%;
  }
  .fc-terms__head { grid-area: head; margin-bottom: max(24px, 4svh); }
  .fc-terms__head .fc-h2 { font-size: clamp(2.1rem, 1rem + 2.6vw, 3.8rem); }
  .fc-rail { grid-area: rail; display: grid; align-content: start; position: relative; padding-top: 6px; }
  .fc-rail__pill { position: absolute; left: 0; top: 6px; width: 100%; height: 50px; border-radius: 12px; background: var(--fc-white); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); transform: translateY(calc(var(--at) * 50px)); transition: transform 380ms var(--ease-back); }
  .fc-rail__item { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; height: 50px; padding: 0 14px; border-radius: 12px; text-align: left; color: var(--fc-slate); font-size: 14.5px; font-weight: 500; transition: color var(--dur-fast); }
  .fc-rail__item[aria-current] { color: var(--fc-ink); }
  .fc-rail__item:active { scale: 0.98; }
  .fc-rail__n { font: 500 11px/1 var(--fc-code); color: var(--fc-mist); transition: color var(--dur-fast); }
  .fc-rail__item[aria-current] .fc-rail__n { color: var(--fc-cobalt); }
  .fc-terms__list { grid-area: list; display: grid; min-height: 0; }
  .fc-term { grid-area: 1 / 1; align-self: start; pointer-events: none; }
  .fc-term[data-active] { pointer-events: auto; }
  .fc-term__fig-in { transition: clip-path 760ms var(--ease-in-out), scale 900ms var(--ease-out); }
  .fc-term:not([data-active]) .fc-term__fig-in { clip-path: polygon(130% -30%, 130% -30%, 130% -30%, 130% -30%); scale: 1.04; }
  .fc-term:not([data-active]) .fc-term__fig-in { transition-duration: 420ms; }
  .fc-term[data-active] .fc-term__fig-in { clip-path: polygon(-60% -30%, 130% -30%, 130% 160%, -30% 160%); }
  .fc-term__text > * { transition: opacity 520ms var(--ease-out), translate 640ms var(--ease-out-expo); transition-delay: calc(120ms + var(--k, 0) * 60ms); }
  .fc-term__text > :nth-child(2) { --k: 1; }
  .fc-term__text > :nth-child(3) { --k: 2; }
  .fc-term:not([data-active]) .fc-term__text > * { opacity: 0; translate: 0 22px; transition-delay: 0ms; transition-duration: 260ms; }
  .fc-term:not([data-active]) .fc-dg [pathLength] { stroke-dashoffset: 1; transition-delay: 0ms; transition-duration: 200ms; }
  .fc-term:not([data-active]) .fc-dg__label { opacity: 0; transition-delay: 0ms; }
  .fc-term__fig-in { max-height: calc(100svh - 300px); }
  .fc-term__fig-in .fc-dg { max-height: calc(100svh - 360px); }
  .fc-terms__meter { display: block; position: absolute; left: 0; right: 0; bottom: max(24px, 4svh); height: 1px; background: var(--fc-line); }
  .fc-terms__meter span { display: block; height: 100%; background: var(--fc-cobalt); transform-origin: left; transform: scaleX(clamp(0, var(--p, 0) / 0.9, 1)); }
  @media (hover: hover) { .fc-rail__item:hover { color: var(--fc-ink); } }
}

/* ---------- chapter 02: the studio ---------- */
.fc-studio {
  position: relative; z-index: 3; padding: clamp(80px, 10vw, 128px) 0 clamp(80px, 10vw, 120px);
  background: var(--fc-white); border-radius: 32px 32px 0 0;
  box-shadow: 0 -30px 60px -40px color-mix(in oklab, var(--fc-ink) 30%, transparent), inset 0 1px 0 var(--fc-white);
}
@media (min-width: 960px) and (prefers-reduced-motion: no-preference) and (scripting: enabled) { .fc-studio { margin-top: -38svh; } }
.fc-sampler__grid { display: grid; gap: clamp(20px, 2.6vw, 36px); }
@media (min-width: 1000px) { .fc-sampler__grid { grid-template-columns: 1.3fr 1fr; align-items: start; } }
.fc-sampler__stage { position: relative; aspect-ratio: 4 / 3; border-radius: 22px; overflow: hidden; background: var(--fc-paper); box-shadow: inset 0 0 0 1px var(--fc-line); isolation: isolate; }
@media (min-width: 1000px) { .fc-sampler__stage { position: sticky; top: 96px; } }
.fc-sampler__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; opacity: 0; transition: opacity 800ms var(--ease-out); cursor: grab; touch-action: pan-y; }
.fc-sampler__canvas:active { cursor: grabbing; }
.fc-sampler__stage[data-glass="on"] .fc-sampler__canvas { opacity: 1; }
.fc-sampler__stage[data-glass="on"] .fc-sp { opacity: 0; }
.fc-sampler__stage:not([data-glass="on"]) .fc-sampler__canvas { pointer-events: none; }
.fc-sampler__hud { position: absolute; left: 14px; right: 14px; top: 14px; display: flex; justify-content: space-between; gap: 10px; pointer-events: none; }
.fc-sampler__hud > span { padding: 7px 11px; border-radius: 999px; background: var(--fc-glass); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); font: 500 11.5px/1 var(--fc-code); color: var(--fc-slate); box-shadow: inset 0 0 0 1px var(--fc-white); }
.fc-sampler__live::before { content: ""; display: inline-block; width: 6px; height: 6px; margin-right: 7px; border-radius: 50%; background: var(--fc-mist); vertical-align: 1px; }
.fc-sampler__live[data-on="true"]::before { background: var(--fc-emerald); }
.fc-sampler__ms-n { color: var(--fc-ink); font-variant-numeric: tabular-nums; }

/* the drawn sample */
.fc-sp { position: absolute; inset: 0; width: 100%; height: 100%; transition: opacity 700ms var(--ease-out); }
.fc-sp__card { fill: var(--fc-paper); }
.fc-sp__bar { fill: var(--fc-ink); opacity: 0.86; }
.fc-sp__band { fill: var(--fc-cobalt); }
.fc-sp__shadow { fill: var(--fc-ink); opacity: 0.08; }
.fc-sp__in { fill: none; stroke: var(--fc-white); stroke-width: 4; stroke-linecap: round; filter: drop-shadow(0 0 3px var(--fc-white)); }
.fc-sp__fan { transform-origin: 238px 156px; transform: rotate(var(--bend, 18deg)); filter: blur(var(--blur, 0)); transition: transform 600ms var(--ease-out), filter 400ms var(--ease-out); }
.fc-sp__ray { fill: none; stroke-width: 3; stroke-linecap: round; transform-origin: 238px 156px; transform: rotate(calc(var(--spread, 6deg) * var(--k) * 2)); transition: transform 600ms var(--ease-out); }
.fc-sp__prism { transform-origin: 200px 150px; transform: scale(var(--thick, 1)); transition: transform 600ms var(--ease-spring); }
.fc-sp__glass { fill: var(--fc-white); opacity: 0.5; }
.fc-sp__film { fill: url(#fc-sp-film); opacity: calc(var(--film, 0) * 0.4); transition: opacity 500ms var(--ease-out); mix-blend-mode: multiply; }
.fc-sp__edge { fill: none; stroke: var(--fc-white); stroke-width: 2; }

.fc-sampler__panel { display: grid; gap: 22px; }
.fc-presets { display: flex; flex-wrap: wrap; gap: 8px; }
.fc-preset {
  display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px 0 8px; border-radius: 999px;
  background: var(--fc-paper); box-shadow: inset 0 0 0 1px var(--fc-line); font-size: 13.5px; font-weight: 500;
  transition: background-color var(--dur-fast), color var(--dur-fast), transform var(--dur-base) var(--ease-spring);
}
.fc-preset:active { transform: scale(0.96); transition-duration: var(--dur-instant); }
.fc-preset[aria-pressed="true"] { background: var(--fc-ink); color: var(--fc-white); }
.fc-preset__swatch { width: 22px; height: 22px; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--fc-line); }
@media (hover: hover) and (pointer: fine) { .fc-preset:not([aria-pressed="true"]):hover { background: var(--fc-haze); } }

.fc-dials { display: grid; gap: 16px; padding: 20px; border-radius: 18px; background: var(--fc-paper); box-shadow: inset 0 0 0 1px var(--fc-line); }
.fc-dial { display: grid; grid-template-columns: 1fr auto; gap: 8px 12px; align-items: center; }
.fc-dial__label { font-size: 14px; font-weight: 500; }
.fc-dial__value { font: 500 12.5px/1 var(--fc-code); color: var(--fc-cobalt); font-variant-numeric: tabular-nums; }
.fc-dial__input { grid-column: 1 / -1; -webkit-appearance: none; appearance: none; width: 100%; height: 24px; background: transparent; cursor: pointer; margin: 0; }
.fc-dial__input::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: linear-gradient(90deg, var(--fc-cobalt) var(--fill), color-mix(in oklab, var(--fc-ink) 10%, transparent) var(--fill)); }
.fc-dial__input::-moz-range-track { height: 6px; border-radius: 999px; background: linear-gradient(90deg, var(--fc-cobalt) var(--fill), color-mix(in oklab, var(--fc-ink) 10%, transparent) var(--fill)); }
.fc-dial__input::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; margin-top: -8px; border-radius: 7px; background: var(--fc-white); box-shadow: 0 2px 8px color-mix(in oklab, var(--fc-ink) 22%, transparent), inset 0 0 0 1px var(--fc-line-strong); transition: transform var(--dur-base) var(--ease-spring); transform: rotate(45deg) scale(0.82); }
.fc-dial__input::-moz-range-thumb { width: 18px; height: 18px; border: 0; border-radius: 6px; background: var(--fc-white); box-shadow: 0 2px 8px color-mix(in oklab, var(--fc-ink) 22%, transparent); transform: rotate(45deg); }
.fc-dial__input:active::-webkit-slider-thumb { transform: rotate(45deg) scale(1); }
.fc-dial__input:focus-visible { outline: none; }
.fc-dial__input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px color-mix(in oklab, var(--fc-cobalt) 45%, transparent), 0 2px 8px color-mix(in oklab, var(--fc-ink) 22%, transparent); }
.fc-dial__input:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 3px color-mix(in oklab, var(--fc-cobalt) 45%, transparent); }
@media (hover: hover) and (pointer: fine) { .fc-dial__input:hover::-webkit-slider-thumb { transform: rotate(45deg) scale(0.92); } }
.fc-dials__abbe { font-size: 13px; color: var(--fc-slate); padding-top: 6px; border-top: 1px solid var(--fc-line); }
.fc-dials__abbe strong { color: var(--fc-ink); font-variant-numeric: tabular-nums; }

.fc-readout { border-radius: 18px; background: var(--fc-ink); color: var(--fc-paper); overflow: hidden; }
.fc-readout__head { display: flex; justify-content: space-between; align-items: center; padding: 10px 12px 10px 18px; border-bottom: 1px solid color-mix(in oklab, var(--fc-white) 10%, transparent); color: var(--fc-mist); }
.fc-readout__copy { height: 30px; padding: 0 12px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--fc-paper); background: color-mix(in oklab, var(--fc-white) 8%, transparent); transition: background-color var(--dur-fast), color var(--dur-fast), transform var(--dur-base) var(--ease-spring); }
.fc-readout__copy:active { transform: scale(0.95); }
.fc-readout__copy[data-done="true"] { background: var(--fc-emerald); color: var(--fc-ink); }
@media (hover: hover) and (pointer: fine) { .fc-readout__copy:hover { background: color-mix(in oklab, var(--fc-white) 16%, transparent); } }
.fc-readout__code { max-height: 260px; overflow: auto; padding: 14px 0; font: 400 12.5px/1.65 var(--fc-code); }
.fc-readout__code:focus-visible { outline-offset: -3px; }
.fc-readout__ln { display: block; padding: 0 18px; white-space: pre; }
@keyframes fc-hot { from { background-color: color-mix(in oklab, var(--fc-cobalt) 45%, transparent); color: var(--fc-white); } }
.fc-readout__ln[data-hot] { animation: fc-hot 1200ms var(--ease-out); }

/* below-the-fold chapters skip style and layout until they are near */
.fc-flow, .fc-proof, .fc-price, .fc-foot { content-visibility: auto; contain-intrinsic-size: auto 1100px; }

/* ---------- chapter 03: workflow ---------- */
.fc-flow { padding: clamp(96px, 12vw, 160px) 0 clamp(80px, 10vw, 130px); }
.fc-flow__steps { position: relative; display: grid; gap: 22px; }
@media (min-width: 960px) { .fc-flow__steps { grid-template-columns: repeat(3, 1fr); } }
.fc-flow__line { position: absolute; left: 30px; right: 30px; top: 30px; height: 1px; display: none; }
.fc-flow__line span { display: block; height: 100%; background: linear-gradient(90deg, var(--fc-cobalt), color-mix(in oklab, var(--fc-cobalt) 20%, transparent)); }
@media (min-width: 960px) { .fc-flow__line { display: block; } }
.fc-step { position: relative; display: grid; align-content: start; gap: 12px; }
.fc-step__node { width: 60px; height: 60px; display: grid; place-items: center; border-radius: 16px; background: var(--fc-white); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); font: 500 13px/1 var(--fc-code); color: var(--fc-cobalt); rotate: 45deg; }
.fc-step__node span { rotate: -45deg; }
.fc-step__verb { margin-top: 14px; font: 500 12px/1 var(--fc-code); letter-spacing: 0.14em; text-transform: uppercase; color: var(--fc-cobalt); }
.fc-step__title { font: 600 clamp(1.35rem, 1rem + 0.9vw, 1.75rem)/1.15 var(--fc-display); letter-spacing: -0.03em; max-width: 20ch; }
.fc-step__body { color: var(--fc-slate); max-width: 40ch; }
.fc-step__mock { margin-top: 10px; }
.fc-mock { border-radius: 16px; background: var(--fc-white); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); padding: 12px; min-height: 186px; }
.fc-mock--layers { display: grid; gap: 6px; }
.fc-mock__layer { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--fc-paper); font-size: 14px; font-weight: 500; transition: transform var(--dur-base) var(--ease-out), background-color var(--dur-fast); }
.fc-mock__layer .fc-mono { color: var(--fc-slate); }
.fc-mock__grip { width: 8px; height: 14px; background: radial-gradient(circle, var(--fc-mist) 1.2px, transparent 1.4px) 0 0 / 4px 4.6px; }
.fc-mock--tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.fc-mock__tile { display: grid; justify-items: center; align-content: center; gap: 6px; padding: 14px 6px; border-radius: 10px; background: var(--fc-paper); text-align: center; }
.fc-mock__tile .fc-mono { color: var(--fc-cobalt); }
.fc-mock__tile-name { font-size: 12.5px; font-weight: 500; }
.fc-mock__gem { width: 46px; height: 38px; fill: none; stroke: var(--fc-ink); stroke-width: 1.2; stroke-linejoin: round; }
.fc-mock__gem path:first-child { fill: color-mix(in oklab, var(--fc-haze) 70%, var(--fc-white)); }
.fc-mock--code { display: block; background: var(--fc-ink); color: var(--fc-paper); font: 400 12.5px/1.75 var(--fc-code); overflow-x: auto; padding: 18px; white-space: pre; }
.fc-code__k { color: var(--fc-haze); font-weight: 500; }
.fc-code__s { color: var(--fc-emerald); }
.fc-code__c { color: var(--fc-mist); }
@media (hover: hover) and (pointer: fine) {
  .fc-step .fc-mock { transition: transform var(--dur-base) var(--ease-out); }
  .fc-step:hover .fc-mock { transform: translateY(-4px); }
  .fc-mock__layer:hover { transform: translateX(4px); background: var(--fc-haze); }
}

/* ---------- chapter 04: materials (a white sheet with a cut top edge) ---------- */
.fc-mats {
  --cut-y: calc(56px + (1 - var(--enter, 1)) * 90px);
  position: relative; padding: calc(var(--cut-y) + clamp(64px, 8vw, 110px)) 0 clamp(90px, 11vw, 150px);
  background: var(--fc-white); clip-path: polygon(0 var(--cut-y), 100% 0, 100% 100%, 0 100%);
}
.fc-mats__grid { display: grid; gap: 18px; }
@media (min-width: 680px) { .fc-mats__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1040px) { .fc-mats__grid { grid-template-columns: repeat(3, 1fr); } }
.fc-card { position: relative; }
.fc-card > * { position: relative; }
.fc-card { display: grid; border-radius: 22px; background: var(--fc-paper); box-shadow: inset 0 0 0 1px var(--fc-line); padding: 10px; isolation: isolate; }
.fc-card::before { content: ""; position: absolute; inset: 0; z-index: 1; border-radius: inherit; pointer-events: none; opacity: 0; background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--fc-cobalt) 10%, transparent), transparent 65%); transition: opacity var(--dur-base) var(--ease-out); }
.fc-card::after { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; box-shadow: 0 26px 50px -26px color-mix(in oklab, var(--fc-ink) 35%, transparent); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.fc-card__swatch { position: relative; border-radius: 15px; overflow: hidden; aspect-ratio: 16 / 10; }
.fc-card__code { position: absolute; left: 12px; bottom: 10px; font: 500 11px/1 var(--fc-code); letter-spacing: 0.06em; color: var(--fc-ink); padding: 6px 8px; border-radius: 6px; background: color-mix(in oklab, var(--fc-white) 70%, transparent); }
.fc-card__body { display: grid; gap: 10px; padding: 18px 12px 12px; }
.fc-card__name { font: 600 1.45rem/1.1 var(--fc-display); letter-spacing: -0.03em; }
.fc-card__note { color: var(--fc-slate); font-size: 15px; line-height: 1.55; }
.fc-card__spec { display: flex; gap: 18px; padding: 10px 0; border-block: 1px solid var(--fc-line); }
.fc-card__spec dt { font: 500 10.5px/1.3 var(--fc-code); letter-spacing: 0.08em; text-transform: uppercase; color: var(--fc-slate); }
.fc-card__spec dd { font: 600 16px/1.3 var(--fc-display); font-variant-numeric: tabular-nums; }
.fc-card__use { font-size: 13.5px; color: var(--fc-slate); }
.fc-card__load { display: inline-flex; align-items: center; gap: 8px; justify-self: start; margin-top: 4px; padding: 6px 0; font-size: 14.5px; font-weight: 500; color: var(--fc-cobalt); transition: gap var(--dur-base) var(--ease-out); }
.fc-card__load:active { translate: 2px 0; }
.fc-card { transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out); }
@media (hover: hover) and (pointer: fine) {
  .fc-card:hover { transform: translateY(-6px); }
  .fc-card:hover::before, .fc-card:hover::after { opacity: 1; }
  .fc-card:hover .fc-swatch__sheen { translate: 120% 0; }
  .fc-card:hover .fc-swatch__shard { scale: 1.06; }
  .fc-card:hover .fc-arrow { translate: 4px 0; }
  .fc-mats__grid:has(.fc-card:hover) .fc-card:not(:hover) { opacity: 0.72; }
}
.fc-card:focus-within::after { opacity: 1; }

/* swatches: palette-only glass finishes */
.fc-swatch { position: absolute; inset: 0; overflow: hidden; }
.fc-swatch__shard { position: absolute; inset: 14% 18% 12% 24%; clip-path: polygon(22% 8%, 74% 0, 100% 52%, 58% 100%, 0 78%); background: linear-gradient(140deg, color-mix(in oklab, var(--fc-white) 92%, transparent), color-mix(in oklab, var(--fc-white) 30%, transparent)); transition: scale 900ms var(--ease-out); }
.fc-swatch__sheen { position: absolute; inset: -20% auto -20% -60%; width: 40%; rotate: 18deg; background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--fc-white) 75%, transparent), transparent); transition: translate 1000ms var(--ease-in-out); }
.fc-swatch--clear { background: linear-gradient(135deg, var(--fc-white) 0%, var(--fc-haze) 55%, var(--fc-white) 100%); }
.fc-swatch--dense { background: linear-gradient(160deg, var(--fc-haze) 0%, color-mix(in oklab, var(--fc-cobalt) 42%, var(--fc-haze)) 60%, var(--fc-white) 100%); }
.fc-swatch--frost { background: radial-gradient(120% 90% at 20% 10%, var(--fc-white), color-mix(in oklab, var(--fc-haze) 80%, var(--fc-mist)) 90%); }
.fc-swatch--frost .fc-swatch__shard { background: linear-gradient(140deg, color-mix(in oklab, var(--fc-white) 70%, transparent), color-mix(in oklab, var(--fc-haze) 60%, transparent)); }
.fc-swatch--pale { background: linear-gradient(150deg, var(--fc-white), color-mix(in oklab, var(--fc-emerald) 14%, var(--fc-white)) 70%, var(--fc-paper)); }
.fc-swatch--hard { background: conic-gradient(from 210deg at 60% 40%, var(--fc-white), var(--fc-haze), color-mix(in oklab, var(--fc-cobalt) 22%, var(--fc-white)), var(--fc-white), var(--fc-haze), var(--fc-white)); }
.fc-swatch--film { background: conic-gradient(from 120deg at 40% 60%, var(--fc-haze), color-mix(in oklab, var(--fc-emerald) 35%, var(--fc-white)), var(--fc-white), color-mix(in oklab, var(--fc-cobalt) 35%, var(--fc-white)), var(--fc-haze)); }

/* ---------- chapter 05: proof ---------- */
.fc-proof { padding: clamp(96px, 12vw, 160px) 0 clamp(80px, 10vw, 130px); }
.fc-stats { display: grid; gap: 0; border-top: 1px solid var(--fc-line); }
@media (min-width: 700px) { .fc-stats { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .fc-stats { grid-template-columns: repeat(4, 1fr); } }
.fc-stat { position: relative; display: flex; flex-direction: column-reverse; justify-content: flex-end; gap: 12px; padding: 28px 22px 34px 0; }
.fc-stat__value { font: 600 clamp(2.6rem, 1.6rem + 3vw, 4.6rem)/1 var(--fc-display); letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
.fc-stat__label { color: var(--fc-slate); font-size: 15px; max-width: 24ch; }
.fc-stat::after { content: ""; position: absolute; left: 0; right: 22px; bottom: 0; height: 1px; background: var(--fc-cobalt); opacity: 0.5; transform-origin: left; transition: transform 1100ms var(--ease-in-out) 200ms; }
@media (prefers-reduced-motion: no-preference) and (scripting: enabled) { .fc-stat:not([data-in="true"])::after { transform: scaleX(0); } }
.fc-count { display: inline-block; }
.fc-proof__band { margin: clamp(56px, 7vw, 96px) 0; display: grid; gap: 16px; }
.fc-proof__band-label { width: min(100% - 2 * var(--fc-gut), var(--fc-max)); margin-inline: auto; color: var(--fc-slate); letter-spacing: 0.14em; text-transform: uppercase; }
.fc-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
.fc-marquee__track { display: flex; width: max-content; }
.fc-marquee__set { display: flex; gap: 12px; padding-right: 12px; }
@keyframes fc-marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: no-preference) {
  .fc-marquee__track { animation: fc-marquee 38s linear infinite; }
  .fc-marquee:is(:hover, :focus-within, [data-active="false"]) .fc-marquee__track, html[data-fc-hidden] .fc-marquee__track { animation-play-state: paused; }
}
.fc-proof__chip { display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 22px; border-radius: 14px; background: var(--fc-white); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); font: 600 17px/1 var(--fc-display); letter-spacing: -0.02em; white-space: nowrap; }
.fc-proof__shard { width: 10px; height: 10px; background: var(--fc-cobalt); clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
.fc-notes { display: grid; gap: 18px; }
@media (min-width: 900px) { .fc-notes { grid-template-columns: repeat(3, 1fr); } }
.fc-note figure { height: 100%; display: grid; align-content: space-between; gap: 28px; padding: 28px; border-radius: 22px; background: var(--fc-white); box-shadow: var(--fc-lift), inset 0 0 0 1px var(--fc-white); transition: transform var(--dur-base) var(--ease-out); }
.fc-note__quote { font: 500 clamp(1.08rem, 1rem + 0.3vw, 1.25rem)/1.5 var(--fc-sans); letter-spacing: -0.012em; }
.fc-note__by { display: grid; gap: 2px; font-size: 14px; }
.fc-note__name { font-weight: 600; }
.fc-note__role { color: var(--fc-slate); }
@media (hover: hover) and (pointer: fine) { .fc-note figure:hover { transform: translateY(-4px) rotate(-0.4deg); } }

/* ---------- chapter 06: pricing ---------- */
.fc-price { padding: clamp(80px, 10vw, 130px) 0 clamp(96px, 12vw, 160px); }
.fc-toggle { position: relative; display: inline-grid; grid-template-columns: 1fr 1fr; padding: 4px; border-radius: 12px; background: var(--fc-white); box-shadow: inset 0 0 0 1px var(--fc-line); }
.fc-toggle__pill { position: absolute; left: 4px; top: 4px; bottom: 4px; width: calc(50% - 4px); border-radius: 9px; background: var(--fc-ink); transform: translateX(calc(var(--at) * 100%)); transition: transform var(--dur-ui) var(--ease-back); }
.fc-toggle__opt { position: relative; z-index: 1; height: 38px; padding: 0 16px; border-radius: 9px; font-size: 14px; font-weight: 500; color: var(--fc-slate); white-space: nowrap; transition: color var(--dur-base) var(--ease-out); }
.fc-toggle__opt[aria-checked="true"] { color: var(--fc-white); }
.fc-toggle__opt:active { scale: 0.97; }
.fc-cuts { display: grid; gap: 18px; align-items: stretch; }
@media (min-width: 960px) { .fc-cuts { grid-template-columns: repeat(3, 1fr); } }
.fc-cut { display: grid; }
.fc-cut__in { position: relative; display: grid; align-content: start; gap: 14px; padding: 30px; border-radius: 24px; background: var(--fc-white); box-shadow: inset 0 0 0 1px var(--fc-line); transition: transform var(--dur-base) var(--ease-out); }
.fc-cut__in[data-featured] { background: linear-gradient(170deg, var(--fc-white), color-mix(in oklab, var(--fc-haze) 55%, var(--fc-white))); box-shadow: var(--fc-lift), inset 0 0 0 1.5px var(--fc-cobalt); }
.fc-cut__flag { position: absolute; top: 18px; right: 18px; padding: 6px 10px; border-radius: 999px; background: var(--fc-cobalt); color: var(--fc-white); font: 500 11px/1 var(--fc-code); letter-spacing: 0.06em; }
.fc-cut__name { font: 600 1.5rem/1.1 var(--fc-display); letter-spacing: -0.03em; }
.fc-cut__blurb { color: var(--fc-slate); font-size: 15px; }
.fc-cut__price { display: flex; align-items: baseline; gap: 10px; padding: 8px 0 14px; border-bottom: 1px solid var(--fc-line); overflow: clip; }
.fc-cut__amount { display: inline-block; font: 600 clamp(2.6rem, 2rem + 1.6vw, 3.4rem)/1 var(--fc-display); letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
.fc-cut__per { font-size: 13.5px; color: var(--fc-slate); }
@keyframes fc-roll-in { from { translate: 0 70%; opacity: 0; } }
@media (prefers-reduced-motion: no-preference) { .fc-cut__amount { animation: fc-roll-in 520ms var(--ease-out-expo) both; } }
.fc-cut__list { display: grid; gap: 10px; margin-bottom: 10px; font-size: 15px; }
.fc-cut__list li { display: flex; gap: 10px; align-items: flex-start; }
.fc-cut__list svg { flex: none; width: 16px; height: 16px; margin-top: 4px; fill: none; stroke: var(--fc-cobalt); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.fc-cut .fc-btn { margin-top: auto; }
@media (hover: hover) and (pointer: fine) { .fc-cut__in:hover { transform: translateY(-5px); } .fc-toggle__opt:not([aria-checked="true"]):hover { color: var(--fc-ink); } }

/* ---------- chapter 07: open studio (the ink slab) ---------- */
.fc-open { position: relative; padding: clamp(96px, 12vw, 160px) 0; background: var(--fc-ink); color: var(--fc-paper); overflow: clip; }
.fc-open::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(60% 70% at 85% 10%, color-mix(in oklab, var(--fc-cobalt) 22%, transparent), transparent 70%), radial-gradient(50% 60% at 0% 100%, color-mix(in oklab, var(--fc-haze) 10%, transparent), transparent 70%); }
.fc-open__grid { position: relative; display: grid; gap: clamp(40px, 6vw, 80px); align-items: start; }
@media (min-width: 960px) { .fc-open__grid { grid-template-columns: 1fr 1fr; } }
.fc-open .fc-lead { color: var(--fc-mist); margin-top: 22px; }
.fc-open__facts { display: grid; gap: 10px; margin-top: 30px; color: var(--fc-mist); }
.fc-open__facts li { display: flex; gap: 10px; }
.fc-open__facts li::before { content: ""; flex: none; width: 8px; height: 8px; margin-top: 9px; background: var(--fc-emerald); clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
.fc-open__facts strong { color: var(--fc-paper); font-weight: 600; }
.fc-open__panel-in { padding: clamp(22px, 3vw, 36px); border-radius: 24px; background: color-mix(in oklab, var(--fc-white) 6%, transparent); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--fc-white) 12%, transparent), inset 0 1px 0 color-mix(in oklab, var(--fc-white) 18%, transparent); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); }

.fc-seat__form { display: grid; gap: 22px; }
.fc-field { position: relative; display: grid; }
.fc-field__input {
  width: 100%; height: 60px; padding: 24px 16px 8px; border-radius: 12px; border: 0; outline: none;
  background: color-mix(in oklab, var(--fc-white) 7%, transparent); color: var(--fc-paper); font-size: 16px;
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--fc-white) 14%, transparent);
  transition: box-shadow var(--dur-fast) var(--ease-out), background-color var(--dur-fast);
}
select.fc-field__input { -webkit-appearance: none; appearance: none; cursor: pointer; background-image: linear-gradient(45deg, transparent 50%, var(--fc-mist) 50%), linear-gradient(135deg, var(--fc-mist) 50%, transparent 50%); background-position: calc(100% - 22px) 28px, calc(100% - 17px) 28px; background-size: 5px 5px; background-repeat: no-repeat; }
select.fc-field__input:not([data-filled]) { color: var(--fc-mist); }
.fc-field__input option { color: var(--fc-ink); }
.fc-field__input:focus-visible { box-shadow: inset 0 0 0 2px var(--fc-cobalt); background-color: color-mix(in oklab, var(--fc-white) 10%, transparent); }
.fc-field__label { position: absolute; left: 16px; top: 20px; font-size: 16px; color: var(--fc-mist); pointer-events: none; transform-origin: left top; transition: transform var(--dur-base) var(--ease-out), color var(--dur-fast); }
.fc-field__input:focus + .fc-field__label, .fc-field__input:not(:placeholder-shown) + .fc-field__label, .fc-field--select .fc-field__label { transform: translateY(-11px) scale(0.76); }
.fc-field__input:focus + .fc-field__label { color: var(--fc-haze); }
.fc-field__legend { font-size: 14px; color: var(--fc-mist); margin-bottom: 10px; }
.fc-field__err { font-size: 13.5px; color: var(--fc-haze); min-height: 0; overflow: clip; }
.fc-field__err:empty { display: none; }
.fc-field[data-invalid] .fc-field__input, .fc-field--chips[data-invalid] .fc-chips { box-shadow: inset 0 0 0 1.5px var(--fc-haze); border-radius: 12px; }
.fc-field[data-invalid] .fc-field__err { margin-top: 8px; padding-left: 12px; border-left: 2px solid var(--fc-cobalt); }
@keyframes fc-shake { 20% { translate: -6px 0; } 40% { translate: 5px 0; } 60% { translate: -3px 0; } 80% { translate: 2px 0; } }
@keyframes fc-err-in { from { opacity: 0; translate: 0 -6px; } }
@media (prefers-reduced-motion: no-preference) {
  .fc-field[data-shake] { animation: fc-shake 300ms var(--ease-out); }
  .fc-field[data-invalid] .fc-field__err { animation: fc-err-in 320ms var(--ease-out); }
}
.fc-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.fc-chip { position: relative; }
.fc-chip__input { position: absolute; z-index: 1; opacity: 0; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
.fc-chip__label { display: inline-flex; align-items: center; height: 40px; padding: 0 14px; border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--fc-paper); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--fc-white) 16%, transparent); transition: background-color var(--dur-fast), color var(--dur-fast), transform var(--dur-base) var(--ease-spring); }
.fc-chip__input:checked + .fc-chip__label { background: var(--fc-paper); color: var(--fc-ink); }
.fc-chip__input:focus-visible + .fc-chip__label { outline: 2px solid var(--fc-cobalt); outline-offset: 2px; }
.fc-chip__input:active + .fc-chip__label { transform: scale(0.96); }
@media (hover: hover) and (pointer: fine) { .fc-chip__input:not(:checked):hover + .fc-chip__label { background: color-mix(in oklab, var(--fc-white) 10%, transparent); } }
.fc-seat__submit { width: 100%; height: 56px; font-size: 16px; }
.fc-seat__spinner { position: absolute; right: 18px; width: 16px; height: 16px; border-radius: 3px; border: 1.6px solid currentColor; opacity: 0; rotate: 45deg; }
@keyframes fc-spin { to { rotate: 405deg; } }
.fc-seat[data-phase="sending"] .fc-seat__spinner { opacity: 1; animation: fc-spin 900ms var(--ease-in-out) infinite; }
.fc-seat__note { font-size: 13.5px; color: var(--fc-mist); }
.fc-seat__done { display: grid; justify-items: start; gap: 12px; outline: none; }
.fc-seat__check { width: 96px; height: 96px; overflow: visible; }
.fc-seat__shard { fill: color-mix(in oklab, var(--fc-white) 10%, transparent); stroke: color-mix(in oklab, var(--fc-white) 40%, transparent); stroke-width: 1.2; stroke-linejoin: round; }
.fc-seat__tick { fill: none; stroke: var(--fc-emerald); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.fc-seat__title { font: 600 clamp(1.8rem, 1.3rem + 1.5vw, 2.6rem)/1.05 var(--fc-display); letter-spacing: -0.04em; }
.fc-seat__meta { color: var(--fc-mist); }
.fc-seat__meta strong { color: var(--fc-paper); font-weight: 600; }
.fc-seat__body { color: var(--fc-mist); max-width: 44ch; }
.fc-seat__done .fc-link { color: var(--fc-paper); margin-top: 6px; }
@keyframes fc-shard-settle { 0% { opacity: 0; translate: 26px -40px; rotate: -24deg; scale: 1.2; } 60% { opacity: 1; } 100% { translate: 0 0; rotate: 0deg; scale: 1; } }
@keyframes fc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes fc-cleave-in { from { clip-path: polygon(-30% -30%, -30% -30%, -30% -30%, -30% -30%); } to { clip-path: polygon(-30% -30%, 170% -30%, 130% 170%, -30% 130%); } }
@media (prefers-reduced-motion: no-preference) {
  .fc-seat__done { animation: fc-cleave-in 800ms var(--ease-in-out) both; }
  .fc-seat__shard { transform-box: fill-box; transform-origin: center; animation: fc-shard-settle 900ms var(--ease-back) both 120ms; }
  .fc-seat__tick { stroke-dasharray: 1; animation: fc-draw 600ms var(--ease-in-out) both 700ms; }
  .fc-seat__done > :not(svg) { animation: fc-fade-up 600ms var(--ease-out) both; animation-delay: 500ms; }
  .fc-seat__done > :nth-child(3) { animation-delay: 580ms; }
  .fc-seat__done > :nth-child(4) { animation-delay: 660ms; }
  .fc-seat__done > :nth-child(5) { animation-delay: 740ms; }
}

/* ---------- footer ---------- */
.fc-foot { padding: clamp(72px, 9vw, 120px) 0 32px; background: var(--fc-paper); }
.fc-foot__top { display: grid; gap: 40px; }
@media (min-width: 800px) { .fc-foot__top { grid-template-columns: 1.2fr 1fr; } }
.fc-foot__line { margin-top: 16px; color: var(--fc-slate); max-width: 34ch; }
.fc-foot__cols { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.fc-foot__head { font: 500 11.5px/1 var(--fc-code); letter-spacing: 0.14em; text-transform: uppercase; color: var(--fc-slate); margin-bottom: 14px; }
.fc-foot__cols ul { display: grid; gap: 6px; }
.fc-foot__word { position: relative; margin: clamp(48px, 7vw, 96px) 0 24px; }
.fc-foot__word span { position: relative; display: block; max-width: 980px; }
.fc-foot__svg { display: block; width: 100%; height: auto; overflow: visible; }
.fc-foot__svg text { font: 600 290px var(--fc-display); letter-spacing: -20px; fill: color-mix(in oklab, var(--fc-ink) 8%, var(--fc-paper)); }
/* one cut through the wordmark: the slab's l1→J1 cleavage, in cobalt */
.fc-foot__word span::after { content: ""; position: absolute; left: -2%; right: 30%; top: 58%; height: 2px; background: linear-gradient(90deg, transparent, var(--fc-cobalt) 18%, var(--fc-cobalt) 70%, transparent); rotate: -7deg; transform-origin: left; }
.fc-foot__base { display: flex; flex-wrap: wrap; gap: 12px 28px; justify-content: space-between; align-items: center; padding-top: 22px; border-top: 1px solid var(--fc-line); font-size: 13.5px; color: var(--fc-slate); }
.fc-foot__base .fc-mono { color: var(--fc-cobalt); }

/* ---------- reduced motion: everything finished and still ---------- */
@media (prefers-reduced-motion: reduce) {
  .fc-body *, .fc-body *::before, .fc-body *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 120ms !important; transition-delay: 0ms !important; scroll-behavior: auto !important; }
  .fc-marquee__track { animation: none !important; }
  .fc-marquee { overflow-x: auto; }
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5.4" fill="#0F1117"/><path d="M5.3 6.7 13.4 4.3 19.7 12.5 10.6 19.7Z" fill="none" stroke="#F4F5F8" stroke-width="1.9" stroke-linejoin="round"/><path d="M13.4 4.3 19.7 12.5" stroke="#2563EB" stroke-width="1.9" stroke-linecap="round"/></svg>
]]>
    </file>
    <file path="src/app/(cullet)/cullet/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
import { posterShards } from "./cut/pattern";

export const alt = "Cullet — Designed in glass.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const W = 1104, H = 534;

export default function OpenGraphImage() {
  const shards = posterShards(W, H);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4F5F8", position: "relative" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 48, top: 48 }}>
        {shards.map((s) => (
          <g key={s.index} transform={`translate(${s.x} ${s.y})`}>
            <path d={s.d} fill="#DCE8FF" transform="translate(3 6)" opacity="0.8" />
            <path d={s.d} fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", left: 84, top: 70, display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600, color: "#0F1117" }}>
        <svg width="30" height="30" viewBox="0 0 24 24"><rect width="24" height="24" rx="5.4" fill="#0F1117" /><path d="M5.3 6.7 13.4 4.3 19.7 12.5 10.6 19.7Z" fill="none" stroke="#F4F5F8" strokeWidth="1.8" /></svg>
        Cullet
      </div>
      <div style={{ position: "absolute", left: 104, top: 190, display: "flex", flexDirection: "column", color: "#0F1117" }}>
        <div style={{ display: "flex", fontSize: 16, letterSpacing: 4, color: "#525866", marginBottom: 18 }}>REAL-TIME MATERIAL STUDIO</div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 0.97 }}>Designed</div>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 0.97 }}>in glass.</div>
        <div style={{ display: "flex", fontSize: 26, color: "#525866", marginTop: 28 }}>Dispersion, transmission and refraction, live in the browser.</div>
      </div>
      <div style={{ position: "absolute", right: 84, bottom: 72, display: "flex", fontSize: 18, color: "#2563EB" }}>KHR_materials_dispersion</div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/page.tsx">
<![CDATA[import { Hero } from "./hero/Hero";
import { ScrollDirector } from "./motion/ScrollDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Materials } from "./sections/Materials";
import { Open } from "./sections/Open";
import { Pricing } from "./sections/Pricing";
import { Proof } from "./sections/Proof";
import { Studio } from "./sections/Studio";
import { Workflow } from "./sections/Workflow";
import { Terms } from "./terms/Terms";

export default function CulletPage() {
  return (
    <>
      <a className="fc-skip" href="#terms">Skip past the glass</a>
      <Header />
      <main id="main">
        <Hero />
        <Terms />
        <Studio />
        <Workflow />
        <Materials />
        <Proof />
        <Pricing />
        <Open />
      </main>
      <Footer />
      <ScrollDirector />
      <SmoothScroll />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/brand/Logo.tsx">
<![CDATA[/**
 * The Cullet mark: an ink tile with one cut shard traced in paper, the same quad the hero prints
 * on its brand shard. The lockup sets "Cullet" in Inter Tight 600 beside it.
 */
export const CULLET_QUAD = "M5.3 6.7 13.4 4.3 19.7 12.5 10.6 19.7Z";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="24" height="24" rx="5.4" fill="var(--fc-ink)" />
      <path d={CULLET_QUAD} fill="none" stroke="var(--fc-paper)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`fc-logo ${className ?? ""}`}>
      <Mark className="fc-logo__mark" />
      <span className="fc-logo__word">Cullet</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/content/copy.ts">
<![CDATA[/** The five terms of real-time glass: the pinned chapter after the hero. */
export type Term = { id: string; name: string; readout: string; body: string; diagram: "film" | "snell" | "prism" | "slab" | "micro" };

export const TERMS: Term[] = [
  {
    id: "iridescence", name: "Iridescence", readout: "film 280–680 nm", diagram: "film",
    body: "Thin-film interference in a microscopic clearcoat shifts the reflected wavelengths with the viewing angle. That gives frosted quartz its pearl sky, cyan and rose sheen.",
  },
  {
    id: "ior", name: "Index of refraction", readout: "IOR 1.52", diagram: "snell",
    body: "How much slower light travels inside the glass than in a vacuum. At 1.52, crown silica bends incoming rays sharply along every bevelled edge.",
  },
  {
    id: "dispersion", name: "Dispersion", readout: "Abbe 59", diagram: "prism",
    body: "Each wavelength refracts by a different amount, so white studio light splits into spectral caustics across the cut edges. Cullet solves it in one pass, live, as KHR_materials_dispersion.",
  },
  {
    id: "transmission", name: "Transmission", readout: "1.4 cm volume", diagram: "slab",
    body: "Specular transmission and subsurface scattering work together, so a thick slab passes the light around it and softens what sits behind.",
  },
  {
    id: "roughness", name: "Roughness", readout: "0.22 / 0.08", diagram: "micro",
    body: "How much the microscopic surface normals vary, which sets how tight the highlights are: a satin etched face at 0.22 under a polished clearcoat rim at 0.08.",
  },
];

export const NAV = [
  { id: "terms", label: "Terms" },
  { id: "sampler", label: "Studio" },
  { id: "materials", label: "Materials" },
  { id: "pricing", label: "Pricing" },
] as const;

export const STEPS = [
  {
    n: "01", verb: "Cut", title: "Author the material, not the texture.",
    body: "Stack a body, a volume, a clearcoat and a thin film. Each layer is one parameter set with no baked maps, so a material stays a few kilobytes.",
  },
  {
    n: "02", verb: "Preview", title: "See it on the real renderer.",
    body: "Every change renders live in three.js, Babylon.js and model-viewer side by side, under your HDRI or one of the eleven studio rigs.",
  },
  {
    n: "03", verb: "Ship", title: "Export glass that renders the same everywhere.",
    body: "One click writes glTF with the KHR material extensions, USDZ for Quick Look, or a typed three.js module. What you approved is what ships.",
  },
];

export const STATS = [
  { value: 1.6, decimals: 1, suffix: " ms", label: "per glass material, per frame, at 1080p on an M2" },
  { value: 60, decimals: 0, suffix: " fps", label: "with dispersion on a three-year-old phone" },
  { value: 0, decimals: 0, suffix: "", label: "baked maps. Every material is pure parameters" },
  { value: 41200, decimals: 0, suffix: "", label: "materials cut in Cullet since the open beta" },
];

export const RENDERERS = ["three.js", "Babylon.js", "model-viewer", "PlayCanvas", "Blender glTF", "USDZ Quick Look", "Godot 4", "React Three Fiber"];

export const NOTES = [
  {
    quote: "We used to bake glass per angle and pray. Now the bottle on the product page refracts the actual page behind it.",
    name: "Ines Moraga", role: "Lead 3D, Kettle & Ray",
  },
  {
    quote: "The dispersion slider sold it. Our designers tune caustics in the browser and engineering gets a typed module, not a ZIP of PNGs.",
    name: "Dami Okafor", role: "Design engineer, Northlight Interactive",
  },
  {
    quote: "Four kilobytes for a sapphire watch crystal that looks right on a phone. We stopped shipping videos of our product.",
    name: "Lea Brandt", role: "Creative director, Studio Ondine",
  },
];

export type Cadence = "monthly" | "annual";
export type Cut = { id: string; name: string; monthly: number | null; blurb: string; features: string[]; cta: string; featured?: boolean };

export const CUTS: Cut[] = [
  {
    id: "sketch", name: "Sketch", monthly: 0, blurb: "For trying glass on a side project.", cta: "Start sketching",
    features: ["3 saved materials", "Live preview in three.js", "glTF export", "The public material library"],
  },
  {
    id: "studio", name: "Studio", monthly: 24, featured: true, blurb: "For designers shipping glass in production.", cta: "Open studio",
    features: ["Unlimited materials", "Dispersion and iridescence", "USDZ and typed three.js export", "Side-by-side renderer preview", "Version history"],
  },
  {
    id: "foundry", name: "Foundry", monthly: null, blurb: "For teams with a material system.", cta: "Talk to the lab",
    features: ["Everything in Studio", "Shared team libraries", "SSO and audit log", "Render-farm turntables", "A named optics engineer"],
  },
];

/** Annual seats are billed yearly at 20% off; prices round to whole dollars. Null means custom. */
export function priceFor(cut: Cut, cadence: Cadence): number | null {
  if (cut.monthly === null) return null;
  return cadence === "annual" ? Math.round(cut.monthly * 0.8) : cut.monthly;
}

export const PAPER = {
  label: "Technical note 07",
  title: "Dispersion in a single forward pass.",
  paragraphs: [
    "Real-time renderers have treated glass as one refracted ray. White light doesn't refract as one ray, which is why most web glass looks like tinted plastic.",
    "Cullet samples three wavelengths through each transmissive surface, offset by the material's Abbe number, and recombines them in the same pass that shades the surface. No second render target, no extra draw calls.",
    "On an M2 laptop it costs 1.6 ms per material at 1080p. On a three-year-old phone it holds 60 fps with dispersion on. The output is plain KHR_materials_dispersion, so any glTF viewer that supports the extension renders it the same way.",
  ],
  figures: [
    { k: "Samples", v: "3 λ / ray" },
    { k: "Extra passes", v: "0" },
    { k: "Cost", v: "1.6 ms" },
  ],
};
]]>
    </file>
    <file path="src/app/(cullet)/cullet/content/materials.ts">
<![CDATA[import type { GlassParams } from "../sampler/params";

export type Material = {
  id: string;
  name: string;
  /** the catalogue code engraved on the swatch */
  code: string;
  note: string;
  use: string;
  /** which drawn swatch finish the card uses */
  finish: "clear" | "dense" | "frost" | "pale" | "hard" | "film";
  params: GlassParams;
};

/** The six cuts every Cullet seat starts with. Values are the real-world glasses they're tuned against. */
export const MATERIALS: Material[] = [
  {
    id: "crown-silica", name: "Crown silica", code: "CU-152", finish: "clear",
    note: "The everyday window glass, low dispersion and clean edges.",
    use: "Product shells, bottles, UI cards",
    params: { ior: 1.52, dispersion: 0.34, roughness: 0.05, thickness: 1.2, iridescence: 0 },
  },
  {
    id: "dense-flint", name: "Dense flint", code: "CU-172", finish: "dense",
    note: "Heavy lead-free flint. Bends hard and throws rainbows off every bevel.",
    use: "Jewellery, prisms, hero objects",
    params: { ior: 1.72, dispersion: 0.69, roughness: 0.02, thickness: 1.6, iridescence: 0 },
  },
  {
    id: "frosted-quartz", name: "Frosted quartz", code: "CU-154", finish: "frost",
    note: "Satin-etched faces under a polished clearcoat, with a pearl sheen.",
    use: "Interfaces, the Cullet hero itself",
    params: { ior: 1.54, dispersion: 0.29, roughness: 0.22, thickness: 1.4, iridescence: 0.65 },
  },
  {
    id: "borosilicate", name: "Borosilicate", code: "CU-147", finish: "pale",
    note: "Lab glass. Thin, tough, quiet. Almost no colour fringing.",
    use: "Drinkware, lab scenes, lighting",
    params: { ior: 1.47, dispersion: 0.31, roughness: 0.04, thickness: 0.8, iridescence: 0 },
  },
  {
    id: "sapphire", name: "Sapphire", code: "CU-177", finish: "hard",
    note: "Synthetic sapphire crystal. Very high index, very low dispersion.",
    use: "Watch faces, camera lenses, sensors",
    params: { ior: 1.77, dispersion: 0.28, roughness: 0.01, thickness: 1, iridescence: 0 },
  },
  {
    id: "opal-film", name: "Opal film", code: "CU-145", finish: "film",
    note: "A soft body under a 280–680 nm thin film. Shifts colour as you turn it.",
    use: "Packaging, cosmetics, motion design",
    params: { ior: 1.45, dispersion: 0.2, roughness: 0.35, thickness: 0.6, iridescence: 1 },
  },
];

export const materialById = (id: string) => MATERIALS.find((m) => m.id === id);
]]>
    </file>
    <file path="src/app/(cullet)/cullet/cut/geometry.ts">
<![CDATA[/**
 * Plane geometry for the cut: insetting a shard away from its neighbours and rounding its corners.
 * Pure and coordinate-agnostic, so the SVG poster (y down) and the WebGL slab (y up) share it.
 */
export type Pt = { x: number; y: number };

/** Twice-signed area halved: positive when the points wind counter-clockwise in a y-up frame. */
export function signedArea(pts: Pt[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}

export function centroid(pts: Pt[]): Pt {
  let x = 0, y = 0;
  for (const p of pts) { x += p.x; y += p.y; }
  return { x: x / pts.length, y: y / pts.length };
}

/** Moves every edge of a convex polygon `d` inward and returns the new corners (positive winding). */
export function insetPolygon(points: Pt[], d: number): Pt[] {
  const n = points.length;
  if (n < 3) return points.slice();
  const pts = signedArea(points) < 0 ? points.slice().reverse() : points.slice();
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const l1 = Math.hypot(curr.x - prev.x, curr.y - prev.y) || 1;
    const u1x = (curr.x - prev.x) / l1, u1y = (curr.y - prev.y) / l1;
    const l2 = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;
    const u2x = (next.x - curr.x) / l2, u2y = (next.y - curr.y) / l2;
    // the inward normal of a positively wound edge is its left normal (-uy, ux)
    const p1x = curr.x - u1y * d, p1y = curr.y + u1x * d;
    const p2x = curr.x - u2y * d, p2y = curr.y + u2x * d;
    const denom = u1x * u2y - u1y * u2x;
    if (Math.abs(denom) < 1e-4) { out.push({ x: p1x, y: p1y }); continue; }
    const t = ((p2x - p1x) * u2y - (p2y - p1y) * u2x) / denom;
    out.push({ x: p1x + u1x * t, y: p1y + u1y * t });
  }
  return out;
}

/** One rounded corner: leave the edge at `start`, curve through the vertex `ctrl`, rejoin at `end`. */
export type Corner = { start: Pt; ctrl: Pt; end: Pt };

/** Tangent points for a quadratic rounding of every vertex, never eating more than 42% of an edge. */
export function roundedCorners(pts: Pt[], radius: number): Corner[] {
  const n = pts.length;
  const corners: Corner[] = [];
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const l1 = Math.hypot(prev.x - curr.x, prev.y - curr.y) || 1;
    const d1x = (prev.x - curr.x) / l1, d1y = (prev.y - curr.y) / l1;
    const l2 = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;
    const d2x = (next.x - curr.x) / l2, d2y = (next.y - curr.y) / l2;
    const dot = Math.min(0.999, Math.max(-0.999, d1x * d2x + d1y * d2y));
    const tanHalf = Math.tan(Math.acos(dot) / 2);
    const dist = Math.min(radius / Math.max(0.15, tanHalf), Math.min(l1, l2) * 0.42);
    corners.push({
      start: { x: curr.x + d1x * dist, y: curr.y + d1y * dist },
      ctrl: curr,
      end: { x: curr.x + d2x * dist, y: curr.y + d2y * dist },
    });
  }
  return corners;
}

const f = (v: number) => Number(v.toFixed(2));

/** The rounded polygon as an SVG path, offset by `(ox, oy)`. */
export function roundedPath(pts: Pt[], radius: number, ox = 0, oy = 0): string {
  if (pts.length < 3) return "";
  const c = roundedCorners(pts, radius);
  let d = `M${f(c[0].start.x - ox)} ${f(c[0].start.y - oy)}`;
  for (let i = 0; i < c.length; i++) {
    const next = c[(i + 1) % c.length];
    d += `Q${f(c[i].ctrl.x - ox)} ${f(c[i].ctrl.y - oy)} ${f(c[i].end.x - ox)} ${f(c[i].end.y - oy)}`;
    d += `L${f(next.start.x - ox)} ${f(next.start.y - oy)}`;
  }
  return `${d}Z`;
}

export function bounds(pts: Pt[]) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/cut/homography.ts">
<![CDATA[import type { Pt } from "./geometry";

/**
 * The projective map taking the rectangle (0,0)–(w,h) to four screen corners (clockwise from top-left),
 * as the eight coefficients of a 3×3 homography with h33 = 1. Solved by Gaussian elimination with pivoting.
 * This is what keeps real, selectable DOM text glued to the tilted glass.
 */
export function solveHomography(w: number, h: number, dst: [Pt, Pt, Pt, Pt]): number[] {
  const src = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const { x: X, y: Y } = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X, X]);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y, Y]);
  }
  const n = 8;
  for (let i = 0; i < n; i++) {
    let max = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[max][i])) max = k;
    [A[i], A[max]] = [A[max], A[i]];
    const pivot = A[i][i];
    if (Math.abs(pivot) < 1e-12) continue;
    for (let j = i; j <= n; j++) A[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = A[k][i];
      for (let j = i; j <= n; j++) A[k][j] -= factor * A[i][j];
    }
  }
  return A.map((row) => row[n]);
}

/** Applies the homography to a point: what the CSS transform will do to it. */
export function project(hc: number[], x: number, y: number): Pt {
  const [h11, h12, h13, h21, h22, h23, h31, h32] = hc;
  const wz = h31 * x + h32 * y + 1;
  return { x: (h11 * x + h12 * y + h13) / wz, y: (h21 * x + h22 * y + h23) / wz };
}

/** The homography as a column-major CSS `matrix3d()` for an element with `transform-origin: 0 0`. */
export function toMatrix3d(hc: number[]): string {
  const [h11, h12, h13, h21, h22, h23, h31, h32] = hc.map((v) => (Math.abs(v) < 1e-10 ? 0 : Number(v.toPrecision(8))));
  return `matrix3d(${h11},${h21},0,${h31},${h12},${h22},0,${h32},0,0,1,0,${h13},${h23},0,1)`;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/cut/pattern.ts">
<![CDATA[import { clamp, easeInCubic, easeOutBack, range } from "../motion/math";
import { bounds, centroid, insetPolygon, roundedPath, type Pt } from "./geometry";

/**
 * The cut: how the slab of frosted quartz is cleaved. Normalised to the region it lives in
 * (x right, y down, both 0..1). Six edge points and six interior junctions make eight convex
 * shards; the nav is three slanted shards. Every point drifts slowly and gives way to the pointer.
 */
type CutPoint = { x: number; y: number; moveX: boolean; moveY: boolean; px: number; py: number; phase: number };

export const CUT_POINTS = {
  t1: { x: 0.27, y: 0, moveX: true, moveY: false, px: 13.2, py: 15.0, phase: 0.3 },
  t2: { x: 0.68, y: 0, moveX: true, moveY: false, px: 16.8, py: 12.1, phase: 1.7 },
  r1: { x: 1, y: 0.48, moveX: false, moveY: true, px: 14.5, py: 13.8, phase: 2.5 },
  b1: { x: 0.44, y: 1, moveX: true, moveY: false, px: 17.9, py: 14.4, phase: 3.6 },
  l1: { x: 0, y: 0.36, moveX: false, moveY: true, px: 12.6, py: 16.2, phase: 4.2 },
  l2: { x: 0, y: 0.78, moveX: false, moveY: true, px: 15.7, py: 18.1, phase: 5.4 },
  J1: { x: 0.34, y: 0.28, moveX: true, moveY: true, px: 11.9, py: 14.7, phase: 0.8 },
  J2: { x: 0.62, y: 0.24, moveX: true, moveY: true, px: 15.4, py: 12.9, phase: 2.1 },
  J3: { x: 0.81, y: 0.41, moveX: true, moveY: true, px: 13.6, py: 16.5, phase: 3.3 },
  J4: { x: 0.26, y: 0.57, moveX: true, moveY: true, px: 18.2, py: 13.4, phase: 4.5 },
  J5: { x: 0.51, y: 0.61, moveX: true, moveY: true, px: 14.1, py: 17.2, phase: 1.4 },
  J6: { x: 0.72, y: 0.69, moveX: true, moveY: true, px: 16.3, py: 15.1, phase: 5.9 },
} satisfies Record<string, CutPoint>;

export type CutKey = keyof typeof CUT_POINTS;

/** Drift amplitude in region units; zero freezes the cut. */
export const DRIFT = 0.017;

/** Where every cut point is at `time` seconds, pushed away from a pointer (in region units) within 0.48. */
export function livePoints(time: number, drift = DRIFT, pointer: Pt | null = null): Record<CutKey, Pt> {
  const out = {} as Record<CutKey, Pt>;
  for (const key of Object.keys(CUT_POINTS) as CutKey[]) {
    const bp: CutPoint = CUT_POINTS[key];
    let x = bp.x, y = bp.y;
    if (bp.moveX) x += Math.sin((time * Math.PI * 2) / bp.px + bp.phase) * drift;
    if (bp.moveY) y += Math.cos((time * Math.PI * 2) / bp.py + bp.phase * 1.3) * drift;
    if (pointer) {
      const dx = x - pointer.x, dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.001 && dist < 0.48) {
        const t = 1 - dist / 0.48;
        const push = t * t * 0.028;
        if (bp.moveX) x += (dx / dist) * push;
        if (bp.moveY) y += (dy / dist) * push;
      }
    }
    out[key] = { x, y };
  }
  return out;
}

/** The eight panel shards, in reading order of what they carry. */
export function cellPolys(p: Record<CutKey, Pt>): Pt[][] {
  const TL = { x: 0, y: 0 }, TR = { x: 1, y: 0 }, BR = { x: 1, y: 1 }, BL = { x: 0, y: 1 };
  const { t1, t2, r1, b1, l1, l2, J1, J2, J3, J4, J5, J6 } = p;
  return [
    [TL, t1, J1, l1], // the crown: "Designed"
    [t1, t2, J2, J1], // the top wedge
    [t2, TR, r1, J3, J2], // the spire
    [l1, J1, J4, l2], // the shear blade: "in glass." and the copy
    [J1, J2, J5, J4], // the core gem
    [J2, J3, J6, J5], // the second gem
    [l2, J4, J5, b1, BL], // the anchor: the CTAs
    [b1, J5, J6, J3, r1, BR], // the base slab
  ];
}

/** The nav: brand | links | sign in, split by two slanted cuts that sway a little. */
export function navPolys(time: number, portrait: boolean, sway = 0.007): Pt[][] {
  const a = Math.sin(time * 0.48) * sway;
  const b = Math.cos(time * 0.39 + 1.2) * sway;
  const s1Top = (portrait ? 0.3 : 0.25) + a, s1Bot = (portrait ? 0.33 : 0.29) + a;
  const s2Top = (portrait ? 0.78 : 0.79) + b, s2Bot = (portrait ? 0.74 : 0.75) + b;
  return [
    [{ x: 0, y: 0 }, { x: s1Top, y: 0 }, { x: s1Bot, y: 1 }, { x: 0, y: 1 }],
    [{ x: s1Top, y: 0 }, { x: s2Top, y: 0 }, { x: s2Bot, y: 1 }, { x: s1Bot, y: 1 }],
    [{ x: s2Top, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: s2Bot, y: 1 }],
  ];
}

/** The scale of the slab against the 1730px-wide reference it was cut at. */
export const scaleFor = (slabW: number) => slabW / 1730;

/** Gap between shards, corner radius, glass depth and bevel, all in px for a slab scale `s`. */
export const glassMetrics = (s: number) => ({ gap: 14 * s, radius: 20 * s, depth: 14 * s, bevel: 3 * s });

/** Nav band height and the gap under it for a slab of `w × h`. */
export function slabBands(w: number, h: number) {
  const s = scaleFor(w);
  const nav = Math.max(48, h * 0.108);
  const gap = Math.max(8, 14 * s);
  return { s, nav, gap, panel: Math.max(240, h - nav - gap) };
}

export type PosterShard = {
  /** path in the shard's own box */ d: string;
  x: number; y: number; w: number; h: number;
  /** unit vector from the slab's centre through the shard's centre (y down) */ out: Pt;
  index: number;
};

/** The shards as SVG boxes in slab pixels (y down): the poster the page shows before, or instead of, WebGL. */
export function posterShards(w: number, h: number, portrait = h > w * 1.08): PosterShard[] {
  const { s, nav, gap, panel } = slabBands(w, h);
  const { gap: cut, radius } = glassMetrics(s);
  const regions = [
    ...navPolys(0, portrait, 0).map((poly) => ({ poly, top: 0, height: nav })),
    ...cellPolys(livePoints(0, 0)).map((poly) => ({ poly, top: nav + gap, height: panel })),
  ];
  return regions.map(({ poly, top, height }, index) => {
    const px = insetPolygon(poly.map((p) => ({ x: p.x * w, y: top + p.y * height })), cut / 2);
    const b = bounds(px);
    const c = centroid(px);
    const ox = c.x - w / 2, oy = c.y - h / 2;
    const len = Math.hypot(ox / (w / 2), oy / (h / 2));
    const out = len < 0.1 ? { x: 0.15, y: 0.3 } : { x: ox / (w / 2) / len, y: oy / (h / 2) / len };
    return { d: roundedPath(px, radius, b.x, b.y), x: b.x, y: b.y, w: b.w, h: b.h, out, index };
  });
}

/** How far shard `index` (of 11) has flown for a scroll cleave `c` (0..1): staggered from the nav down. */
export function cleaveFactor(c: number, index: number): number {
  return easeInCubic(range(clamp(c), index * 0.035, index * 0.035 + 0.62));
}

/** How far shard `index` has flown `elapsed` seconds into a timed shatter (`out`) or reassembly. */
export function shatterFactor(elapsed: number, index: number, dir: "out" | "in"): number {
  const p = clamp((elapsed - (dir === "in" ? 0.12 : 0) - index * 0.03) / 0.72);
  return dir === "out" ? easeInCubic(p) : 1 - easeOutBack(p);
}

/** The flight of a shard at factor `f`: out along its direction, toward the viewer, and (when timed) falling. */
export function flight(f: number, out: Pt, s: number, zImpulse: number, gravity = true) {
  return {
    x: out.x * 520 * s * f,
    y: out.y * 520 * s * f + (gravity ? 640 * s * f * f : 0),
    z: zImpulse * s * f,
  };
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/forms/request.ts">
<![CDATA[/** The "Open studio" seat request: rules for the form, kept pure so they're tested. */
export const ROLES = ["Product design", "3D & motion", "Web & frontend", "Brand & packaging"] as const;
export const TEAMS = ["Just me", "2–10", "11–50", "51+"] as const;

export type SeatRequest = { email: string; role: string; team: string };
export type SeatErrors = Partial<Record<keyof SeatRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(req: SeatRequest): SeatErrors {
  const errors: SeatErrors = {};
  const email = req.email.trim();
  if (!email) errors.email = "Add the email your seat should go to.";
  else if (email.length > 254 || !EMAIL.test(email)) errors.email = "That email doesn't look complete.";
  if (!(ROLES as readonly string[]).includes(req.role)) errors.role = "Pick what you'll use glass for.";
  if (!(TEAMS as readonly string[]).includes(req.team)) errors.team = "Pick a team size.";
  return errors;
}

export const firstError = (errors: SeatErrors): keyof SeatRequest | null =>
  (["email", "role", "team"] as const).find((k) => errors[k]) ?? null;

/** A stable seat number from the email, so the confirmation reads the same on every submit. */
export function seatNumber(email: string): string {
  let h = 2166136261;
  for (const ch of email.trim().toLowerCase()) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return String(1000 + ((h >>> 0) % 9000));
}

/** The first material a role is handed on day one. */
export function starterFor(role: string): string {
  switch (role) {
    case "3D & motion": return "Dense flint";
    case "Web & frontend": return "Frosted quartz";
    case "Brand & packaging": return "Opal film";
    default: return "Crown silica";
  }
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/forms/SeatForm.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { firstError, ROLES, seatNumber, starterFor, TEAMS, validate, type SeatErrors, type SeatRequest } from "./request";

type Phase = "idle" | "sending" | "done";

/**
 * The seat request. Validates on submit (fields that fail shake once and say why), then the button
 * turns to a cutting state, the form cleaves away and a glass check settles with the seat number.
 * No network request: this is a template.
 */
export function SeatForm() {
  const [req, setReq] = useState<SeatRequest>({ email: "", role: "", team: "" });
  const [errors, setErrors] = useState<SeatErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { if (phase === "done") doneRef.current?.focus(); }, [phase]);

  const set = (k: keyof SeatRequest, v: string) => {
    setReq((r) => ({ ...r, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    const found = validate(req);
    setErrors(found);
    const first = firstError(found);
    if (first) {
      setShake((n) => n + 1);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("sending");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => setPhase("done"), reduced ? 200 : 1100);
  };

  const reset = () => {
    setReq({ email: "", role: "", team: "" });
    setErrors({});
    setPhase("idle");
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>("input")?.focus(), 0);
  };

  return (
    <div className="fc-seat" data-phase={phase}>
      {phase !== "done" ? (
        <form ref={formRef} className="fc-seat__form" noValidate onSubmit={submit} aria-describedby="fc-seat-note">
          <div className="fc-field" data-invalid={!!errors.email || undefined} data-shake={errors.email ? shake : undefined}>
            <input id="fc-seat-email" name="email" type="email" autoComplete="email" placeholder=" " className="fc-field__input"
              value={req.email} onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? "fc-seat-email-err" : undefined} />
            <label htmlFor="fc-seat-email" className="fc-field__label">Work email</label>
            <p id="fc-seat-email-err" className="fc-field__err" role="alert">{errors.email ?? ""}</p>
          </div>

          <fieldset className="fc-field fc-field--chips" data-invalid={!!errors.role || undefined} data-shake={errors.role ? shake : undefined}
            aria-describedby={errors.role ? "fc-seat-role-err" : undefined}>
            <legend className="fc-field__legend">You&apos;ll use glass for</legend>
            <div className="fc-chips">
              {ROLES.map((r) => (
                <label key={r} className="fc-chip">
                  <input type="radio" name="role" value={r} checked={req.role === r} onChange={() => set("role", r)} className="fc-chip__input" />
                  <span className="fc-chip__label">{r}</span>
                </label>
              ))}
            </div>
            <p id="fc-seat-role-err" className="fc-field__err" role="alert">{errors.role ?? ""}</p>
          </fieldset>

          <div className="fc-field fc-field--select" data-invalid={!!errors.team || undefined} data-shake={errors.team ? shake : undefined}>
            <select id="fc-seat-team" name="team" className="fc-field__input" value={req.team} onChange={(e) => set("team", e.target.value)}
              aria-invalid={!!errors.team} aria-describedby={errors.team ? "fc-seat-team-err" : undefined} data-filled={!!req.team || undefined}>
              <option value="" disabled>Choose…</option>
              {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label htmlFor="fc-seat-team" className="fc-field__label">Team size</label>
            <p id="fc-seat-team-err" className="fc-field__err" role="alert">{errors.team ?? ""}</p>
          </div>

          <button type="submit" className="fc-btn fc-btn--emerald fc-seat__submit" disabled={phase === "sending"}>
            <span className="fc-btn__label" data-text={phase === "sending" ? "Cutting your seat…" : "Request a seat"}><span>{phase === "sending" ? "Cutting your seat…" : "Request a seat"}</span></span>
            <span className="fc-seat__spinner" aria-hidden="true" />
          </button>
          <p id="fc-seat-note" className="fc-seat__note">Studio is free for 14 days. No card, and you can export everything you cut.</p>
        </form>
      ) : (
        <div ref={doneRef} className="fc-seat__done" tabIndex={-1} role="status" aria-live="polite">
          <svg className="fc-seat__check" viewBox="0 0 96 96" aria-hidden="true">
            <path className="fc-seat__shard" d="M16 38 46 12 82 30 74 80 26 84Z" />
            <path className="fc-seat__tick" pathLength={1} d="M32 50 44 62 66 36" />
          </svg>
          <p className="fc-seat__title">Your seat is cut.</p>
          <p className="fc-seat__meta">
            Seat <strong>No. {seatNumber(req.email)}</strong> · {req.team} · starts on <strong>{starterFor(req.role)}</strong>
          </p>
          <p className="fc-seat__body">The studio link is on its way to {req.email.trim()}. Open it on any browser with WebGL 2.</p>
          <button type="button" className="fc-link" onClick={reset}>Request another seat</button>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/bus.ts">
<![CDATA[/**
 * The hero's shared state between the scroll director (which writes the cleave) and the glass
 * engine (which reads it every frame). A plain object, so scrolling never touches React state.
 */
export const heroBus = {
  /** 0 = the slab is whole, 1 = every shard has flown */
  cleave: 0,
  /** set by the running engine: call after changing the cleave so a sleeping loop renders it */
  wake: null as null | (() => void),
};
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/engine.ts">
<![CDATA[import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { insetPolygon, roundedCorners, centroid, type Pt } from "../cut/geometry";
import { solveHomography, toMatrix3d } from "../cut/homography";
import { cellPolys, cleaveFactor, DRIFT, flight, glassMetrics, livePoints, navPolys, scaleFor, shatterFactor } from "../cut/pattern";
import { clamp, smoothing } from "../motion/math";
import { heroBus } from "./bus";
import { printRegion } from "./print";

/**
 * The slab of frosted quartz: eleven extruded shards (three in the nav, eight in the panel) under a
 * high-key studio, carrying printed copies of the DOM text. The DOM stays on top, transparent and
 * mapped onto the tilted glass by a homography, so text can be selected and every link focused.
 *
 * The page tilts toward the pointer; the shard under it lifts and tips on a spring and the cut
 * gives way around it. Scrolling cleaves the slab (heroBus.cleave); "Read paper" shatters it.
 */
export type HeroEls = {
  stage: HTMLElement; canvas: HTMLCanvasElement; slab: HTMLElement; nav: HTMLElement; panel: HTMLElement;
  back: HTMLElement | null;
};

type Mode = "entering" | "assembled" | "shattering" | "paper" | "reassembling";

type Shard = {
  index: number; nav: boolean;
  group: THREE.Group; glass: THREE.Mesh; cap: THREE.Mesh; shadow: THREE.Mesh; mat: THREE.MeshPhysicalMaterial;
  base: THREE.Vector3; out: Pt;
  z: number; zv: number; rx: number; rxv: number; ry: number; ryv: number; hover: number;
  zImpulse: number; axis: THREE.Vector3; tumble: number;
};

const FOV = 30;

function roundedShape(pts: Pt[], radius: number) {
  const shape = new THREE.Shape();
  const c = roundedCorners(pts, radius);
  shape.moveTo(c[0].start.x, c[0].start.y);
  for (let i = 0; i < c.length; i++) {
    const next = c[(i + 1) % c.length];
    shape.quadraticCurveTo(c[i].ctrl.x, c[i].ctrl.y, c[i].end.x, c[i].end.y);
    shape.lineTo(next.start.x, next.start.y);
  }
  shape.closePath();
  return shape;
}

/** A flat cap with UVs mapped to the whole region, so each shard shows its own slice of the print. */
function capGeometry(shape: THREE.Shape, cx: number, cy: number, w: number, h: number) {
  const geo = new THREE.ShapeGeometry(shape, 8);
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + cx + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + cy + h / 2) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

export function createHeroEngine(els: HeroEls, opts: { onModeChange?: (mode: Mode) => void } = {}) {
  const { stage, canvas, slab, nav, panel } = els;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 10000);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.85;

  // high-key studio for white quartz: key from the upper left, a cool fill from below, a rim from behind
  scene.add(new THREE.AmbientLight(0xffffff, 1.35));
  const hemi = new THREE.HemisphereLight(0xffffff, 0xdce8ff, 1.15);
  hemi.position.set(0, 600, 400);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-650, 750, 950); scene.add(key);
  const fill = new THREE.DirectionalLight(0xdce8ff, 1.35); fill.position.set(700, -550, 600); scene.add(fill);
  const rim = new THREE.DirectionalLight(0xeef4ff, 1.1); rim.position.set(0, 850, -400); scene.add(rim);

  const page = new THREE.Group();
  scene.add(page);

  // --- the print -----------------------------------------------------------
  const dpr = Math.min(Math.max(devicePixelRatio || 1, 2), 2.5);
  const makePrint = () => {
    const c = document.createElement("canvas");
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return { c, tex, mat: new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }) };
  };
  const navPrint = makePrint();
  const panelPrint = makePrint();
  const print = () => {
    printRegion(navPrint.c, nav, dpr); navPrint.tex.needsUpdate = true;
    printRegion(panelPrint.c, panel, dpr); panelPrint.tex.needsUpdate = true;
  };

  // --- the glass -----------------------------------------------------------
  const pointer = { world: new THREE.Vector3(), glow: { value: 0 }, scale: { value: 1 } };
  const glassMaterial = (glow: boolean) => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, emissive: 0xf0f4fa, emissiveIntensity: 0.35,
      roughness: 0.22, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.08,
      reflectivity: 0.9, ior: 1.52, specularIntensity: 1, specularColor: 0xffffff,
      iridescence: glow ? 0.65 : 0.5, iridescenceIOR: 1.35, iridescenceThicknessRange: [280, 680], envMapIntensity: 1.15,
    });
    if (glow) {
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uPointerWorld = { value: pointer.world };
        shader.uniforms.uPointerGlow = pointer.glow;
        shader.uniforms.uScaleS = pointer.scale;
        shader.vertexShader = "varying vec3 vCulletWorld;\n" + shader.vertexShader.replace(
          "#include <worldpos_vertex>",
          "#include <worldpos_vertex>\nvCulletWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;",
        );
        // a cobalt and rose refraction blush that follows the pointer across the quartz
        shader.fragmentShader = "uniform vec3 uPointerWorld;\nuniform float uPointerGlow;\nuniform float uScaleS;\nvarying vec3 vCulletWorld;\n" +
          shader.fragmentShader.replace(
            "#include <dithering_fragment>",
            `float culletD = length(vCulletWorld.xy - uPointerWorld.xy);
            float culletR = max(120.0, 300.0 * uScaleS);
            float culletFall = exp(-1.6 * pow(culletD / culletR, 2.0)) * uPointerGlow;
            gl_FragColor.rgb += vec3(-0.11, -0.04, 0.09) * 0.28 * culletFall + vec3(0.20, 0.45, 0.96) * 0.09 * culletFall;
            #include <dithering_fragment>`,
          );
      };
    }
    return mat;
  };
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0xd5dbe8, transparent: true, opacity: 0.52, depthWrite: false });

  const shards: Shard[] = Array.from({ length: 11 }, (_, index) => {
    const group = new THREE.Group();
    page.add(group);
    const mat = glassMaterial(true);
    const glass = new THREE.Mesh(new THREE.BufferGeometry(), mat);
    const cap = new THREE.Mesh(new THREE.BufferGeometry(), index < 3 ? navPrint.mat : panelPrint.mat);
    const shadow = new THREE.Mesh(new THREE.BufferGeometry(), shadowMat);
    group.add(glass, cap, shadow);
    const shard: Shard = {
      index, nav: index < 3, group, glass, cap, shadow, mat,
      base: new THREE.Vector3(), out: { x: 0, y: 1 },
      z: 0, zv: 0, rx: 0, rxv: 0, ry: 0, ryv: 0, hover: 0,
      zImpulse: 460 + Math.random() * 340,
      axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, (Math.random() - 0.5) * 0.7).normalize(),
      tumble: 2.1 + Math.random() * 1.55,
    };
    glass.userData.shard = shard;
    return shard;
  });

  // the "← Back" sliver beside the paper
  const sliver = new THREE.Group();
  const sliverGlass = new THREE.Mesh(new THREE.BufferGeometry(), glassMaterial(false));
  const sliverShadow = new THREE.Mesh(new THREE.BufferGeometry(), shadowMat);
  sliver.add(sliverGlass, sliverShadow);
  sliver.visible = false;
  scene.add(sliver);
  const sliverState = { scale: 0.001, target: 0, hx: 0, hy: 0, centre: new THREE.Vector3() };

  // --- layout from the DOM ---------------------------------------------------
  const L = { W: 1, H: 1, slabW: 1, slabH: 1, s: 1, portrait: false, navH: 1, navY: 0, panelH: 1, panelY: 0, ox: 0, oy: 0, navTop: 0, panelTop: 0, slabL: 0, slabT: 0 };

  const measure = () => {
    L.W = stage.clientWidth; L.H = stage.clientHeight;
    L.slabW = slab.offsetWidth; L.slabH = slab.offsetHeight;
    L.slabL = slab.offsetLeft; L.slabT = slab.offsetTop;
    L.s = scaleFor(L.slabW);
    L.portrait = L.slabH > L.slabW * 1.08;
    L.navTop = nav.offsetTop; L.navH = nav.offsetHeight;
    L.panelTop = panel.offsetTop; L.panelH = panel.offsetHeight;
    // y-up, centred on the slab
    L.navY = L.slabH / 2 - (L.navTop + L.navH / 2);
    L.panelY = L.slabH / 2 - (L.panelTop + L.panelH / 2);
    L.ox = L.slabL + L.slabW / 2 - L.W / 2;
    L.oy = L.H / 2 - (L.slabT + L.slabH / 2);
    const camZ = L.H / 2 / Math.tan(THREE.MathUtils.degToRad(FOV) / 2);
    camera.aspect = L.W / L.H;
    camera.position.set(0, 0, camZ);
    camera.near = Math.max(10, camZ * 0.1);
    camera.far = camZ * 6;
    camera.updateProjectionMatrix();
    renderer.setSize(L.W, L.H, false);
    page.position.set(L.ox, L.oy, 0);
    pointer.scale.value = L.s;
  };

  const buildShard = (shard: Shard, poly: Pt[], w: number, h: number, cy: number) => {
    const { gap, radius, depth, bevel } = glassMetrics(L.s);
    const raw = poly.map((p) => ({ x: (p.x - 0.5) * w, y: (0.5 - p.y) * h }));
    const inset = insetPolygon(raw, gap / 2);
    const c = centroid(inset);
    shard.base.set(c.x, cy + c.y, 0);
    const local = inset.map((p) => ({ x: p.x - c.x, y: p.y - c.y }));
    const shape = roundedShape(local, radius);
    shard.glass.geometry.dispose(); shard.cap.geometry.dispose(); shard.shadow.geometry.dispose();
    shard.glass.geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 8 });
    shard.cap.geometry = capGeometry(shape, c.x, c.y, w, h);
    shard.cap.position.z = depth + bevel + 0.35;
    shard.shadow.geometry = new THREE.ShapeGeometry(shape, 6);
    shard.shadow.position.set(3 * L.s, -5 * L.s, -bevel - 3.5 * L.s);
    // outward, measured in screen terms (y down) against the slab's half-size
    const nx = c.x / (L.slabW / 2), ny = -(cy + c.y) / (L.slabH / 2);
    const len = Math.hypot(nx, ny);
    shard.out = len < 0.1 ? { x: 0.15, y: 0.3 } : { x: nx / len, y: ny / len };
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const panelPointer = { x: 0.5, y: 0.5, active: false };

  const rebuild = (time: number) => {
    const drift = reduced.matches ? 0 : DRIFT;
    navPolys(time, L.portrait, reduced.matches ? 0 : 0.007).forEach((poly, i) => buildShard(shards[i], poly, L.slabW, L.navH, L.navY));
    const pts = livePoints(time, drift, panelPointer.active ? panelPointer : null);
    cellPolys(pts).forEach((poly, i) => buildShard(shards[i + 3], poly, L.slabW, L.panelH, L.panelY));
  };

  const buildSliver = () => {
    const back = els.back;
    if (!back) return;
    // a skewed quad of quartz behind the button, in stage pixels
    const r = back.getBoundingClientRect(), s = stage.getBoundingClientRect();
    const x0 = r.left - s.left, y0 = r.top - s.top, w = r.width, h = r.height;
    const quad = [
      { x: x0 - w * 0.08, y: y0 + h * 0.95 }, { x: x0 + w * 0.82, y: y0 - h * 0.25 },
      { x: x0 + w * 1.12, y: y0 + h * 1.15 }, { x: x0 + w * 0.02, y: y0 + h * 1.25 },
    ].map((p) => ({ x: p.x - L.W / 2, y: L.H / 2 - p.y }));
    const c = centroid(quad);
    sliverState.centre.set(c.x, c.y, 0);
    sliver.position.set(c.x, c.y, 0);
    const shape = roundedShape(quad.map((p) => ({ x: p.x - c.x, y: p.y - c.y })), Math.max(8, 14 * L.s));
    sliverGlass.geometry.dispose(); sliverShadow.geometry.dispose();
    const bevel = Math.max(1.5, 2.4 * L.s);
    sliverGlass.geometry = new THREE.ExtrudeGeometry(shape, { depth: Math.max(6, 11 * L.s), bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: bevel, bevelThickness: bevel });
    sliverShadow.geometry = new THREE.ShapeGeometry(shape, 6);
    sliverShadow.position.set(3 * L.s, -5 * L.s, -bevel - 3 * L.s);
  };

  // --- the DOM text on the glass ---------------------------------------------
  const project = (v: THREE.Vector3) => {
    const p = v.clone().applyMatrix4(page.matrixWorld).project(camera);
    return { x: (p.x * 0.5 + 0.5) * L.W, y: (-p.y * 0.5 + 0.5) * L.H };
  };
  const mapPlane = (el: HTMLElement, top: number, h: number) => {
    const z = 17 * L.s;
    const x0 = -L.slabW / 2, x1 = L.slabW / 2;
    const y0 = L.slabH / 2 - top, y1 = y0 - h;
    const ox = L.slabL, oy = L.slabT + top;
    const corners = [project(new THREE.Vector3(x0, y0, z)), project(new THREE.Vector3(x1, y0, z)), project(new THREE.Vector3(x1, y1, z)), project(new THREE.Vector3(x0, y1, z))]
      .map((p) => ({ x: p.x - ox, y: p.y - oy })) as [Pt, Pt, Pt, Pt];
    el.style.transform = toMatrix3d(solveHomography(L.slabW, h, corners));
  };

  // --- interaction ----------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  const tilt = { rx: THREE.MathUtils.degToRad(0.8), ry: THREE.MathUtils.degToRad(-1.2), tx: THREE.MathUtils.degToRad(0.8), ty: THREE.MathUtils.degToRad(-1.2) };
  const ptr = { inside: false, overBack: false };
  let hovered: Shard | null = null;
  let mode: Mode = "entering";
  let modeStart = performance.now() / 1000;
  const setMode = (m: Mode) => { mode = m; modeStart = performance.now() / 1000; opts.onModeChange?.(m); };

  const onMove = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / L.W) * 2 - 1;
    const ny = ((e.clientY - r.top) / L.H) * 2 - 1;
    ndc.set(nx, -ny);
    ptr.inside = true;
    tilt.ty = THREE.MathUtils.degToRad(nx * 3.5 - 1.2);
    tilt.tx = THREE.MathUtils.degToRad(ny * 2.75 + 0.8);
  };
  const onLeave = () => {
    ptr.inside = false; hovered = null; panelPointer.active = false;
    tilt.ty = THREE.MathUtils.degToRad(-1.2); tilt.tx = THREE.MathUtils.degToRad(0.8);
  };
  stage.addEventListener("pointermove", onMove, { passive: true });
  stage.addEventListener("pointerleave", onLeave);
  const backIn = () => { ptr.overBack = true; };
  const backOut = () => { ptr.overBack = false; };
  els.back?.addEventListener("pointerenter", backIn);
  els.back?.addEventListener("pointerleave", backOut);

  // hover and focus restyle the print; batch into one reprint per frame
  let reprint = false;
  const markPrint = () => { reprint = true; };
  const hoverables = Array.from(slab.querySelectorAll<HTMLElement>("a, button"));
  for (const el of hoverables) {
    el.addEventListener("pointerenter", markPrint); el.addEventListener("pointerleave", markPrint);
    el.addEventListener("focus", markPrint); el.addEventListener("blur", markPrint);
  }

  // --- the loop ---------------------------------------------------------------
  let frame = 0, last = performance.now() / 1000, lastBuild = -1, running = false, visible = true;
  const spring = (pos: number, vel: number, target: number, dt: number) => {
    const f = -170 * (pos - target) - 19 * vel;
    vel += f * dt;
    return [pos + vel * dt, vel] as const;
  };

  const tick = () => {
    frame = 0;
    const now = performance.now() / 1000;
    const dt = Math.min(0.05, Math.max(0.001, now - last));
    last = now;
    const cleave = heroBus.cleave;
    const whole = mode === "assembled" && cleave < 0.01;

    const a = smoothing(dt, 0.3);
    tilt.rx += (tilt.tx - tilt.rx) * a;
    tilt.ry += (tilt.ty - tilt.ry) * a;
    page.rotation.set(tilt.rx, tilt.ry, 0);

    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(zPlane, hit);
    if (ptr.inside && whole) {
      pointer.world.copy(hit);
      pointer.glow.value += (1 - pointer.glow.value) * Math.min(1, dt * 8);
      const px = (hit.x - L.ox) / L.slabW + 0.5;
      const py = 0.5 - (hit.y - L.oy - L.panelY) / L.panelH;
      panelPointer.active = px >= -0.15 && px <= 1.15 && py >= -0.15 && py <= 1.15;
      panelPointer.x = px; panelPointer.y = py;
      const hits = raycaster.intersectObjects(shards.map((s) => s.glass), false);
      hovered = hits.length ? (hits[0].object.userData.shard as Shard) : null;
    } else {
      pointer.glow.value += (0 - pointer.glow.value) * Math.min(1, dt * 8);
      panelPointer.active = false;
      hovered = null;
    }

    // the cut drifts: rebuild the geometry at ~45 fps while the slab is (partly) whole
    if (page.visible && now - lastBuild >= 1 / 45) { lastBuild = now; rebuild(now); }
    if (reprint) { reprint = false; print(); }

    let allOut = true, allIn = true;
    const elapsed = now - modeStart;
    for (const s of shards) {
      const isHover = hovered === s && whole;
      const tz = isHover ? (s.nav ? 32 : 50) * L.s : 0;
      let trx = 0, try_ = 0;
      if (isHover) {
        const lx = (hit.x - L.ox - s.base.x) / Math.max(80, L.slabW * 0.22);
        const ly = (hit.y - L.oy - s.base.y) / Math.max(80, L.panelH * 0.22);
        try_ = clamp(lx * 0.18, -0.24, 0.24);
        trx = clamp(-ly * 0.18, -0.24, 0.24);
      }
      [s.z, s.zv] = spring(s.z, s.zv, tz, dt);
      [s.rx, s.rxv] = spring(s.rx, s.rxv, trx, dt);
      [s.ry, s.ryv] = spring(s.ry, s.ryv, try_, dt);
      s.hover += ((isHover ? 1 : 0) - s.hover) * Math.min(1, dt * 10);
      s.mat.iridescence = THREE.MathUtils.lerp(0.65, 1, s.hover);
      s.mat.envMapIntensity = THREE.MathUtils.lerp(1.15, 2, s.hover);

      let timed = 0;
      if (mode === "shattering") { timed = shatterFactor(elapsed, s.index, "out"); if (timed < 1) allOut = false; }
      else if (mode === "paper") timed = 1;
      else if (mode === "reassembling") { timed = shatterFactor(elapsed, s.index, "in"); if (elapsed < 0.12 + s.index * 0.03 + 0.72) allIn = false; }
      else if (mode === "entering") {
        // the glass takes over from the poster: a short lift-and-land, not a fly-in
        timed = shatterFactor(elapsed + 0.3, s.index, "in") * 0.18;
        if (elapsed + 0.3 < 0.12 + s.index * 0.03 + 0.72) allIn = false;
      }
      const scrolled = cleaveFactor(cleave, s.index);
      const useTimed = timed >= scrolled;
      const f = Math.max(timed, scrolled);
      const fl = flight(f, s.out, L.s, s.zImpulse, useTimed);
      // flight() is y-down; the scene is y-up
      s.group.position.set(s.base.x + fl.x, s.base.y - fl.y, s.base.z + s.z + fl.z);
      s.group.rotation.set(s.rx, s.ry, 0);
      if (Math.abs(f) > 1e-4) s.group.rotateOnAxis(s.axis, s.tumble * f * (useTimed ? 1 : 0.6));
    }

    if (mode === "shattering" && allOut) setMode("paper");
    else if ((mode === "entering" || mode === "reassembling") && allIn) setMode("assembled");
    // fully flown shards stop costing anything; scrolling back brings them home
    page.visible = mode === "paper" ? false : !(cleave >= 0.995 && mode === "assembled");

    // the back sliver
    if (sliver.visible) {
      sliverState.scale += (sliverState.target - sliverState.scale) * Math.min(1, dt * (sliverState.target > 0.5 ? 7.5 : 11));
      if (sliverState.target === 0 && sliverState.scale < 0.02) sliver.visible = false;
      else {
        const k = Math.max(0.001, sliverState.scale);
        sliver.scale.set(k, k, k);
        const still = reduced.matches ? 0 : 1;
        const wx = Math.sin(now * Math.PI * 1.9) * 0.032 * still;
        const wy = Math.cos(now * Math.PI * 1.6) * 0.036 * still;
        let hx = 0, hy = 0;
        if (ptr.overBack || (ptr.inside && mode === "paper")) {
          const dx = (hit.x - sliverState.centre.x) / (L.W * 0.15);
          const dy = (hit.y - sliverState.centre.y) / (L.H * 0.15);
          if (ptr.overBack || Math.hypot(dx, dy) < 1.5) { hy = clamp(dx * 0.12, -0.14, 0.14); hx = clamp(-dy * 0.12, -0.14, 0.14); }
        }
        sliverState.hx += (hx - sliverState.hx) * Math.min(1, dt * 8);
        sliverState.hy += (hy - sliverState.hy) * Math.min(1, dt * 8);
        sliver.rotation.set(0.08 + wx + sliverState.hx, -0.16 + wy + sliverState.hy, 0);
      }
    }

    page.updateMatrixWorld();
    mapPlane(nav, L.navTop, L.navH);
    mapPlane(panel, L.panelTop, L.panelH);
    renderer.render(scene, camera);

    const idle = !page.visible && !sliver.visible;
    if (running && visible && !document.hidden && !idle) frame = requestAnimationFrame(tick);
  };

  const wake = () => { if (running && !frame && visible && !document.hidden) { last = performance.now() / 1000; frame = requestAnimationFrame(tick); } };

  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
  io.observe(stage);
  const onVisibility = () => wake();
  document.addEventListener("visibilitychange", onVisibility);
  const resize = () => { measure(); rebuild(performance.now() / 1000); print(); buildSliver(); wake(); };
  const ro = new ResizeObserver(resize);
  ro.observe(stage);

  return {
    /** Prints the text (fonts must be loaded) and starts the loop. */
    start() {
      measure(); print(); rebuild(0); buildSliver();
      running = true;
      heroBus.wake = wake;
      setMode("entering");
      wake();
    },
    /** Wake the loop for a scroll change. */
    wake,
    reprint: markPrint,
    shatter() {
      if (mode !== "assembled" && mode !== "entering") return false;
      hovered = null;
      setMode("shattering");
      wake();
      return true;
    },
    showSliver(on: boolean) {
      if (on) { buildSliver(); sliver.visible = true; }
      sliverState.target = on ? 1 : 0;
      wake();
    },
    reassemble() {
      if (mode !== "shattering" && mode !== "paper") return;
      page.visible = true;
      setMode("reassembling");
      wake();
    },
    destroy() {
      running = false;
      heroBus.wake = null;
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      els.back?.removeEventListener("pointerenter", backIn);
      els.back?.removeEventListener("pointerleave", backOut);
      for (const el of hoverables) {
        el.removeEventListener("pointerenter", markPrint); el.removeEventListener("pointerleave", markPrint);
        el.removeEventListener("focus", markPrint); el.removeEventListener("blur", markPrint);
      }
      nav.style.removeProperty("transform");
      panel.style.removeProperty("transform");
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) { o.geometry.dispose(); }
      });
      shards.forEach((s) => s.mat.dispose());
      navPrint.tex.dispose(); panelPrint.tex.dispose(); env.dispose(); pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type HeroEngine = ReturnType<typeof createHeroEngine>;
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/Hero.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Mark } from "../brand/Logo";
import { HeroGlass } from "./HeroGlass";
import { Poster } from "./Poster";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The slab. Real DOM text laid out on a cut sheet of quartz: the SVG poster draws the glass first,
 * then (desktop, idle) the WebGL slab takes over, prints this text onto its shards and keeps the DOM
 * on top, transparent, for selection and focus. Scrolling cleaves it; "Read paper" shatters it.
 */
export function Hero() {
  return (
    <section className="fc-hero" id="cullet" data-scene="hero" data-state="assembled" aria-labelledby="fc-hero-title">
      <div className="fc-hero__stage">
        <div className="fc-hero__backdrop" aria-hidden="true" />
        <div className="fc-hero__under" aria-hidden="true">
          <p className="fc-hero__under-eyebrow">Chapter 01</p>
          <p className="fc-hero__under-title">Real-time glass, in five terms.</p>
        </div>
        <canvas className="fc-hero__canvas" aria-hidden="true" />

        <div className="fc-slab">
          <Poster />
          <nav className="fc-slab__nav" aria-label="Hero">
            <a href="#cullet" className="fc-slab__brand fc-load" style={line(0)} aria-label="Cullet, home">
              <span className="fc-slab__mark" data-print="mark"><Mark /></span>
              <span className="fc-slab__word" data-print="text">Cullet</span>
            </a>
            <span className="fc-slab__links fc-load" style={line(1)}>
              <a href="#sampler" className="fc-slab__link" data-print="text">Studio</a>
              <span className="fc-slab__dot" data-print="text" aria-hidden="true">·</span>
              <a href="#materials" className="fc-slab__link" data-print="text">Materials</a>
              <span className="fc-slab__dot fc-slab__dot--wide" data-print="text" aria-hidden="true">·</span>
              <a href="#pricing" className="fc-slab__link fc-slab__link--wide" data-print="text">Pricing</a>
            </span>
            <a href="#open" className="fc-slab__signin fc-load" style={line(2)} data-print="text">Sign in</a>
          </nav>

          <div className="fc-slab__panel">
            <span className="fc-slab__ring" data-print="ring" aria-hidden="true" />
            <p className="fc-slab__eyebrow fc-load" style={line(3)} data-print="text">Real-time material studio</p>
            <h1 id="fc-hero-title" className="fc-slab__title">
              <span className="fc-mask"><span className="fc-mask__in fc-load fc-load--rise" style={line(4)} data-print="text">Designed</span></span>{" "}
              <span className="fc-mask"><span className="fc-mask__in fc-load fc-load--rise" style={line(5)} data-print="text">in glass.</span></span>
            </h1>
            <p className="fc-slab__sub fc-load" style={line(7)}>
              <span data-print="text">Author dispersion, transmission,</span>{" "}
              <span data-print="text">and refraction in the browser.</span>{" "}
              <span data-print="text">Live previews, real materials.</span>
            </p>
            <div className="fc-slab__ctas fc-load" style={line(8)}>
              <a href="#open" className="fc-slab__cta" data-print="box">
                <span className="fc-slab__cta-label" data-print="text">Open studio</span>
              </a>
              <a href="#terms" className="fc-slab__paper" data-paper-open data-print="text">Read paper →</a>
            </div>
            <p className="fc-slab__foot fc-load" style={line(9)}>
              <span data-print="text">© Cullet Lab</span>
              <span data-print="text">KHR_materials_dispersion</span>
            </p>
          </div>
        </div>

        <HeroGlass />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/HeroGlass.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PAPER } from "../content/copy";
import { lockScroll } from "../motion/SmoothScroll";
import { mayHaveWebGL } from "../motion/webgl";
import { heroBus } from "./bus";
import type { HeroEngine } from "./engine";

type Glass = "off" | "offer" | "loading" | "on";

const whenIdle = (fn: () => void) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) { const id = w.requestIdleCallback(fn, { timeout: 2500 }); return () => w.cancelIdleCallback?.(id); }
  const id = window.setTimeout(fn, 900);
  return () => window.clearTimeout(id);
};

/**
 * Runs the hero: brings in the WebGL slab (on idle with a fine pointer, on tap on touch screens,
 * never under reduced motion), and owns the paper: "Read paper" shatters the glass and opens a
 * short technical note beside a sliver of quartz; "Back" (or Escape) puts the slab back together.
 */
export function HeroGlass() {
  const [glass, setGlass] = useState<Glass>("off");
  const [paper, setPaper] = useState(false);
  const engine = useRef<HeroEngine | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  const start = useCallback(async () => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    const stage = hero?.querySelector<HTMLElement>(".fc-hero__stage");
    const canvas = hero?.querySelector<HTMLCanvasElement>(".fc-hero__canvas");
    const slab = hero?.querySelector<HTMLElement>(".fc-slab");
    const nav = hero?.querySelector<HTMLElement>(".fc-slab__nav");
    const panel = hero?.querySelector<HTMLElement>(".fc-slab__panel");
    if (!hero || !stage || !canvas || !slab || !nav || !panel || engine.current) return;
    setGlass("loading");
    try {
      await document.fonts?.ready;
      const { createHeroEngine } = await import("./engine");
      if (engine.current) return;
      engine.current = createHeroEngine({ stage, canvas, slab, nav, panel, back: backRef.current });
      engine.current.start();
      hero.dataset.gl = "on";
      setGlass("on");
    } catch {
      setGlass("off");
    }
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !mayHaveWebGL()) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const id = window.setTimeout(() => setGlass("offer"), 0);
      return () => window.clearTimeout(id);
    }
    return whenIdle(() => void start());
  }, [start]);

  useEffect(() => () => { engine.current?.destroy(); engine.current = null; window.clearTimeout(timer.current); }, []);

  const open = useCallback(() => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    // the paper opens from the whole slab only; mid-cleave the shards are already elsewhere
    if (!hero || hero.dataset.state !== "assembled" || heroBus.cleave > 0.02) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    engine.current?.shatter();
    hero.dataset.state = "shattering";
    lockScroll(true);
    timer.current = window.setTimeout(() => {
      hero.dataset.state = "paper";
      setPaper(true);
    }, reduced ? 0 : 280);
  }, []);

  const close = useCallback(() => {
    const hero = document.querySelector<HTMLElement>(".fc-hero");
    if (!hero) return;
    window.clearTimeout(timer.current);
    setPaper(false);
    engine.current?.showSliver(false);
    engine.current?.reassemble();
    hero.dataset.state = "assembled";
    lockScroll(false);
    // the slab is inert while the paper is open; release it before handing focus back
    hero.querySelector(".fc-slab")?.removeAttribute("inert");
    hero.querySelector<HTMLElement>("[data-paper-open]")?.focus({ preventScroll: true });
  }, []);

  // "Read paper →" is a plain link to the terms without JS; with JS it opens the paper
  useEffect(() => {
    const link = document.querySelector<HTMLElement>("[data-paper-open]");
    if (!link) return;
    const onClick = (e: MouseEvent) => { e.preventDefault(); open(); };
    link.addEventListener("click", onClick);
    return () => link.removeEventListener("click", onClick);
  }, [open]);

  useEffect(() => {
    const slab = document.querySelector<HTMLElement>(".fc-slab");
    if (!paper) { slab?.removeAttribute("inert"); return; }
    slab?.setAttribute("inert", "");
    backRef.current?.focus({ preventScroll: true });
    // the sliver is cut around the Back button, so measure once the paper is showing
    engine.current?.showSliver(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "Tab") {
        const items = Array.from(document.querySelectorAll<HTMLElement>(".fc-paper a, .fc-paper button"));
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [paper, close]);

  const readTerms = () => {
    close();
    window.setTimeout(() => window.dispatchEvent(new CustomEvent("fc:goto", { detail: "terms" })), 60);
  };

  return (
    <>
      {glass === "offer" || glass === "loading" ? (
        <button type="button" className="fc-light" onClick={() => void start()} disabled={glass === "loading"} data-state={glass}>
          <span className="fc-light__dot" aria-hidden="true" />
          {glass === "loading" ? "Lighting the glass…" : "Light the glass"}
        </button>
      ) : null}
      <div className="fc-paper" role="dialog" aria-modal="true" aria-labelledby="fc-paper-title" data-open={paper} hidden={!paper}>
        <button ref={backRef} type="button" className="fc-paper__back" onClick={close}>
          <span aria-hidden="true">←</span> Back
        </button>
        <div className="fc-paper__col">
          <p className="fc-paper__label">{PAPER.label}</p>
          <p id="fc-paper-title" className="fc-paper__title">{PAPER.title}</p>
          {PAPER.paragraphs.map((p, i) => (
            <p key={i} className="fc-paper__p">{p}</p>
          ))}
          <dl className="fc-paper__figs">
            {PAPER.figures.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
          <a href="#terms" className="fc-paper__more" onClick={(e) => { e.preventDefault(); readTerms(); }}>The five terms →</a>
        </div>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/Poster.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { posterShards } from "../cut/pattern";

/** Server guesses for the slab's size: a laptop and a phone. The client re-cuts for the real box. */
const GUESSES = [
  { key: "land", w: 1282, h: 747 },
  { key: "port", w: 358, h: 740 },
];

const pct = (v: number) => `${((v) * 100).toFixed(3)}%`;
/** A stable tumble per shard, so the cleave reads as a fracture and not a zoom. */
const spin = (i: number) => (((i * 37) % 11) - 5) * 3.4;

/**
 * The cut slab drawn in SVG: what the page shows before the WebGL glass takes over, and instead of
 * it under reduced motion, without JS and on phones that haven't asked for it. Each shard is its own
 * small HTML-positioned SVG so the cleave moves composited layers, never SVG children.
 */
export function Poster() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width), h = Math.round(entry.contentRect.height);
      if (w > 0 && h > 0) setFit((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sets = fit ? [{ key: "fit", ...fit }] : GUESSES;
  return (
    <div ref={ref} className="fc-poster" aria-hidden="true">
      <svg className="fc-poster__defs" width="0" height="0">
        <defs>
          <linearGradient id="fc-quartz" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="var(--fc-white)" />
            <stop offset="0.62" stopColor="var(--fc-white)" stopOpacity="0.94" />
            <stop offset="1" stopColor="var(--fc-haze)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      {sets.map((set) => (
        <div key={set.key} className={`fc-poster__set fc-poster__set--${set.key}`}>
          {posterShards(set.w, set.h).map((s) => (
            <svg
              key={s.index}
              className="fc-shard"
              viewBox={`0 0 ${s.w.toFixed(2)} ${s.h.toFixed(2)}`}
              preserveAspectRatio="none"
              style={{
                left: pct(s.x / set.w), top: pct(s.y / set.h), width: pct(s.w / set.w), height: pct(s.h / set.h),
                "--i": s.index, "--ox": s.out.x.toFixed(3), "--oy": s.out.y.toFixed(3), "--spin": `${spin(s.index)}deg`,
              } as CSSProperties}
            >
              <path className="fc-shard__body" d={s.d} />
              <path className="fc-shard__rim" d={s.d} />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/hero/print.ts">
<![CDATA[/**
 * Prints a DOM region onto a canvas so the glass carries its text: the DOM is the layout,
 * the canvas is the ink. Each `[data-print]` element is drawn where it sits, in its own font,
 * in the colour its `--print` variables give it (the DOM text itself turns transparent in GL mode
 * and stays for selection, focus and hit testing).
 *
 *   data-print="text"  one line of text; `--print` colour, `--print-line: 1` draws an underline
 *   data-print="box"   a filled rounded box (`--print-bg`), e.g. a button's pill
 *   data-print="mark"  the Cullet mark: an ink tile with the cut shard
 *   data-print="ring"  a hairline registration circle
 */
function offsetIn(el: HTMLElement, region: HTMLElement) {
  let x = 0, y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== region) {
    x += node.offsetLeft; y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

const prop = (cs: CSSStyleDeclaration, name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;

export function printRegion(canvas: HTMLCanvasElement, region: HTMLElement, dpr: number) {
  const w = region.offsetWidth, h = region.offsetHeight;
  const cw = Math.max(1, Math.round(w * dpr)), ch = Math.max(1, Math.round(h * dpr));
  if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cw, ch);
  ctx.scale(dpr, dpr);

  region.querySelectorAll<HTMLElement>("[data-print]").forEach((el) => {
    if (el.offsetParent === null && el !== region) return; // display: none
    const kind = el.dataset.print;
    const cs = getComputedStyle(el);
    const { x, y } = offsetIn(el, region);
    const ew = el.offsetWidth, eh = el.offsetHeight;

    if (kind === "box") {
      ctx.fillStyle = prop(cs, "--print-bg", "transparent");
      roundRect(ctx, x, y, ew, eh, parseFloat(cs.borderTopLeftRadius) || 0);
      ctx.fill();
      return;
    }
    if (kind === "mark") {
      const ink = prop(cs, "--print", "black"), paper = prop(cs, "--print-bg", "white");
      ctx.fillStyle = ink;
      roundRect(ctx, x, y, ew, ew, ew * 0.225);
      ctx.fill();
      ctx.strokeStyle = paper;
      ctx.lineWidth = Math.max(1.2, ew * 0.075);
      ctx.lineJoin = "round";
      const k = ew / 24;
      ctx.beginPath();
      ctx.moveTo(x + 5.3 * k, y + 6.7 * k);
      ctx.lineTo(x + 13.4 * k, y + 4.3 * k);
      ctx.lineTo(x + 19.7 * k, y + 12.5 * k);
      ctx.lineTo(x + 10.6 * k, y + 19.7 * k);
      ctx.closePath();
      ctx.stroke();
      return;
    }
    if (kind === "ring") {
      ctx.strokeStyle = prop(cs, "--print", "black");
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x + ew / 2, y + eh / 2, ew / 2, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }

    const raw = (el.textContent ?? "").trim();
    const text = cs.textTransform === "uppercase" ? raw.toUpperCase() : raw;
    if (!text) return;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const tracking = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    const c2d = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    if ("letterSpacing" in c2d) c2d.letterSpacing = tracking;
    ctx.fillStyle = prop(cs, "--print", "black");
    ctx.textBaseline = "alphabetic";
    const m = ctx.measureText(text);
    const asc = m.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * 0.97;
    const desc = m.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * 0.24;
    const pl = parseFloat(cs.paddingLeft) || 0;
    const pt = parseFloat(cs.paddingTop) || 0, pb = parseFloat(cs.paddingBottom) || 0;
    const lineH = eh - pt - pb;
    const baseline = y + pt + (lineH - (asc + desc)) / 2 + asc;
    let tx = x + pl;
    if (cs.textAlign === "center") tx = x + (ew - m.width) / 2;
    ctx.fillText(text, tx, baseline);
    if (prop(cs, "--print-line", "0") === "1") {
      ctx.fillRect(tx, baseline + Math.max(2, desc * 0.45), m.width, Math.max(1, parseFloat(cs.fontSize) / 14));
    }
    if ("letterSpacing" in c2d) c2d.letterSpacing = "0px";
  });
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/CountUp.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";
import { easeOutCubic } from "./math";

const fmt = (n: number, decimals: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts to `to` once in view, in tabular figures. The final value always sits in a visually hidden span. */
export function CountUp({ to, decimals = 0, suffix = "", duration = 1500 }: { to: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || to === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * easeOutCubic(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);
  return (
    <span ref={ref} className="fc-count">
      <span aria-hidden="true">{fmt(value, decimals)}{suffix}</span>
      <span className="fc-sr">{fmt(to, decimals)}{suffix}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/Magnetic.tsx">
<![CDATA["use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, lerp } from "./math";

/** Pulls its child up to 12px toward a fine pointer, eased in one rAF loop, and springs back on leave. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0, x = 0, y = 0, tx = 0, ty = 0;
    const tick = () => {
      x = lerp(x, tx, 0.18); y = lerp(y, ty, 0.18);
      if (Math.abs(x - tx) < 0.05 && Math.abs(y - ty) < 0.05) { x = tx; y = ty; frame = 0; }
      else frame = requestAnimationFrame(tick);
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
    };
    const run = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - r.left - r.width / 2) * strength, -12, 12);
      ty = clamp((e.clientY - r.top - r.height / 2) * strength, -12, 12);
      run();
    };
    const leave = () => { tx = 0; ty = 0; run(); };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`fc-magnetic ${className ?? ""}`}>{children}</span>;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/Marquee.tsx">
<![CDATA[import type { ReactNode } from "react";

/**
 * A duplicated track translating by half its width in CSS. It pauses on hover and focus,
 * and when the director marks it off screen (`data-active="false"`). The copy is hidden from readers.
 */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="fc-marquee" data-ambient aria-label={label} role="group">
      <div className="fc-marquee__track">
        <div className="fc-marquee__set">{children}</div>
        <div className="fc-marquee__set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/math.ts">
<![CDATA[export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is already passed. */
export const range = (value: number, start: number, end: number) =>
  end <= start ? (value >= end ? 1 : 0) : clamp((value - start) / (end - start));

/** Delay for the nth child, capped so long lists never wait more than `cap` ms. */
export const stagger = (index: number, step: number, cap = Infinity) => Math.min(index * step, cap);

export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Overshoots by ~10% and settles: the glass landing back in its frame. */
export const easeOutBack = (t: number, c1 = 1.45) => 1 + (c1 + 1) * (t - 1) ** 3 + c1 * (t - 1) ** 2;

/** Frame-rate independent smoothing: the share of the gap to close this frame for a time constant `tau` seconds. */
export const smoothing = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/progress.ts">
<![CDATA[import { clamp } from "./math";

/**
 * Progress through a pinned (sticky) scene: 0 when its top meets the top of the screen,
 * 1 when its bottom meets the bottom, so the stage is held for `height - vh` pixels.
 */
export function pinProgress(scrollY: number, top: number, height: number, vh: number): number {
  const hold = height - vh;
  if (hold <= 0) return scrollY >= top ? 1 : 0;
  return clamp((scrollY - top) / hold);
}

/** Progress through a scene that scrolls normally: 0 when its top enters the bottom of the screen, 1 when its top reaches the top. */
export function enterProgress(scrollY: number, top: number, vh: number): number {
  return clamp((scrollY + vh - top) / Math.max(1, vh));
}

/** Which of `count` steps a pinned scene is on. Each step owns an equal slice; the last one keeps the end. */
export function stepAt(progress: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(clamp(progress) * count));
}

/** The scroll position that puts a pinned scene in the middle of step `index`. */
export function scrollForStep(index: number, count: number, top: number, height: number, vh: number): number {
  const hold = Math.max(0, height - vh);
  return top + hold * ((clamp(index, 0, count - 1) + 0.5) / count);
}

/** The id of the last section whose top has passed the probe line, or null above them all. */
export function activeSection(sections: { id: string; top: number }[], scrollY: number, vh: number, probe = 0.35): string | null {
  const y = scrollY + vh * probe;
  let current: string | null = null;
  for (const s of sections) if (y >= s.top) current = s.id;
  return current;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/Reveal.tsx">
<![CDATA[import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * rise: body copy. cleave: a diagonal clip-path wipe along a cut line (media, panels).
 * scale: cards. draw: rules and connectors. slide: labels. sheen: a light sweep across glass.
 */
export type RevealVariant = "rise" | "cleave" | "scale" | "draw" | "slide" | "sheen";

/**
 * Marks an element for the shared reveal observer (ScrollDirector), which flips `data-in`.
 * The CSS carries the motion; hidden states exist only under `prefers-reduced-motion: no-preference`
 * with scripting on, so no-JS and reduced-motion visitors get the finished page.
 */
export function Reveal({ as: Tag = "div", variant = "rise", index = 0, delay = 0, className, children, id }: {
  as?: ElementType; variant?: RevealVariant; index?: number; delay?: number; className?: string; children: ReactNode; id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal={variant} style={{ "--i": index, "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** A display line that rises through its own mask. The observer watches the unclipped wrapper. */
export function MaskLine({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="fc-mask">
      <span className="fc-mask__in" data-reveal="mask" style={{ "--i": index } as CSSProperties}>{children}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/ScrollDirector.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { heroBus } from "../hero/bus";
import { range } from "./math";
import { activeSection, enterProgress, pinProgress, stepAt } from "./progress";

type Scene = { el: HTMLElement; name: string; top: number; height: number; held: boolean; last: number };

const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/**
 * The page's one scroll owner. A single rAF per scroll frame writes:
 *  - the hero's cleave (`--cleave` for the poster, heroBus for the glass),
 *  - the held terms' progress and which term is active,
 *  - the library sheet's entry (`--enter`, which levels its cut edge),
 *  - page progress and the header's state on the root.
 * It also runs the reveal and ambient observers. Under reduced motion it writes nothing spatial.
 */
export function ScrollDirector() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let live = motion.matches;
    let scenes: Scene[] = [];
    let sections: { id: string; top: number }[] = [];
    let vh = innerHeight, frame = 0, lastY = scrollY, heroEnd = 0, chrome = "", section: string | null = "", term = -1;

    const terms = document.querySelector<HTMLElement>(".fc-terms");
    const termEls = terms ? qa(".fc-term", terms) : [];

    const measure = () => {
      vh = innerHeight;
      scenes = qa("[data-scene]").map((el) => {
        const stage = el.firstElementChild as HTMLElement | null;
        return {
          el, name: el.dataset.scene ?? "", top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight,
          held: !!stage && getComputedStyle(stage).position === "sticky", last: -1,
        };
      });
      sections = qa("main > section[id]").map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + scrollY }));
      const hero = scenes.find((s) => s.name === "hero");
      // the header arrives as the slab finishes cleaving
      heroEnd = hero ? hero.top + Math.max(vh * 0.5, (hero.height - vh) * 0.85) : vh * 0.5;
      term = -1;
    };

    const setTerm = (i: number) => {
      if (i === term) return;
      term = i;
      termEls.forEach((el, k) => el.toggleAttribute("data-active", k === i));
      window.dispatchEvent(new CustomEvent("fc:term", { detail: i }));
    };

    const update = () => {
      frame = 0;
      const y = scrollY;
      const span = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--fc-page", (y / span).toFixed(4));

      // the header: away over the slab, then shown; it ducks on a scroll down and returns on the way up
      const dir = y > lastY + 2 ? "down" : y < lastY - 2 ? "up" : null;
      lastY = y;
      let next = chrome;
      if (y < heroEnd) next = "off";
      else if (dir === "down" && y > heroEnd + vh * 0.5 && !root.hasAttribute("data-fc-lock")) next = "tucked";
      else if (dir === "up" || chrome === "off" || chrome === "") next = "on";
      if (next !== chrome) { chrome = next; root.dataset.fcChrome = next; }

      const now = activeSection(sections, y, vh, 0.35);
      if (now !== section) { section = now; window.dispatchEvent(new CustomEvent("fc:section", { detail: now })); }

      for (const s of scenes) {
        if (s.name === "hero") {
          const p = live && s.held ? pinProgress(y, s.top, s.height, vh) : 0;
          const cleave = range(p, 0.04, 0.82);
          if (Math.abs(cleave - s.last) < 1e-4) continue;
          s.last = cleave;
          heroBus.cleave = cleave;
          heroBus.wake?.();
          s.el.style.setProperty("--cleave", cleave.toFixed(4));
          s.el.toggleAttribute("data-cleaving", cleave > 0.02);
        } else if (s.name === "terms") {
          if (!live || !s.held) { setTerm(0); continue; }
          const p = pinProgress(y, s.top, s.height, vh);
          if (Math.abs(p - s.last) < 1e-4) continue;
          s.last = p;
          s.el.style.setProperty("--p", p.toFixed(4));
          // the last stretch of the hold belongs to the studio sheet sliding over
          setTerm(stepAt(range(p, 0, 0.84), termEls.length));
        } else if (s.name === "materials") {
          const p = live ? enterProgress(y, s.top, vh) : 1;
          if (Math.abs(p - s.last) < 1e-4) continue;
          s.last = p;
          s.el.style.setProperty("--enter", p.toFixed(4));
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    const clear = () => {
      scenes.forEach((s) => { s.el.style.removeProperty("--cleave"); s.el.style.removeProperty("--p"); s.el.style.removeProperty("--enter"); s.el.removeAttribute("data-cleaving"); });
      heroBus.cleave = 0;
      termEls.forEach((el) => el.toggleAttribute("data-active", true));
    };

    const mode = () => {
      live = motion.matches;
      root.dataset.fcMotion = live ? "live" : "static";
      if (!live) clear();
      measure();
      schedule();
    };

    // reveals: masks and cleave wipes are clipped, and a fully clipped target never intersects,
    // so those watch their unclipped parent
    const targets = new Map<Element, Element[]>();
    qa("[data-reveal]").forEach((el) => {
      const v = el.dataset.reveal;
      const target = v === "mask" ? el.parentElement ?? el : el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });
    const reveal = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true"));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((_, target) => reveal.observe(target));

    const ambient = new IntersectionObserver((entries) => entries.forEach((e) => e.target.setAttribute("data-active", String(e.isIntersecting))));
    qa("[data-ambient]").forEach((el) => ambient.observe(el));

    const resize = () => { measure(); schedule(); };
    const sizes = new ResizeObserver(resize);
    sizes.observe(document.body);
    const visibility = () => root.toggleAttribute("data-fc-hidden", document.hidden);

    mode();
    document.fonts?.ready.then(resize);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect(); ambient.disconnect(); sizes.disconnect();
      removeEventListener("scroll", schedule); removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", mode);
      clear();
      delete root.dataset.fcMotion;
      delete root.dataset.fcChrome;
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";

type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void; stop: () => void; start: () => void; destroy: () => void };

const expo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Ask the page to travel somewhere: an element id, "top", or a document y. */
export const goto = (target: string | number) => window.dispatchEvent(new CustomEvent("fc:goto", { detail: target }));
/** Hold the page still (a dialog is open) or let it go. */
export const lockScroll = (on: boolean) => window.dispatchEvent(new CustomEvent("fc:lock", { detail: on }));

/**
 * Lenis on fine pointers with motion allowed (lerp .1: glass sliding on glass), dynamically imported.
 * Answers `fc:goto` and `fc:lock`, falling back to native scrolling when Lenis is off.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let lenis: LenisLike | null = null;
    let disposed = false;
    const setup = async () => {
      lenis?.destroy();
      lenis = null;
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: false }) as unknown as LenisLike;
      if (root.hasAttribute("data-fc-lock")) lenis.stop();
    };
    const travel = (event: Event) => {
      const detail = (event as CustomEvent<string | number>).detail;
      const target = detail === "top" ? 0 : typeof detail === "number" ? detail : document.getElementById(detail);
      if (target === null) return;
      if (lenis) { lenis.scrollTo(target, { duration: 1.4, easing: expo }); return; }
      const behavior = reduced.matches ? "instant" : "smooth";
      if (typeof target === "number") window.scrollTo({ top: target, behavior });
      else target.scrollIntoView({ behavior, block: "start" });
    };
    const lock = (event: Event) => {
      const on = (event as CustomEvent<boolean>).detail;
      root.toggleAttribute("data-fc-lock", on);
      if (on) lenis?.stop(); else lenis?.start();
    };
    void setup();
    query.addEventListener("change", setup);
    window.addEventListener("fc:goto", travel);
    window.addEventListener("fc:lock", lock);
    return () => {
      disposed = true;
      lenis?.destroy();
      query.removeEventListener("change", setup);
      window.removeEventListener("fc:goto", travel);
      window.removeEventListener("fc:lock", lock);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/Spotlight.tsx">
<![CDATA["use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * One delegated listener for a grid of cards: writes `--mx`/`--my` (pointer position inside the card
 * under it) once per frame, which a radial gradient on the card's glass reads. Fine pointers only.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;
    const flush = () => {
      frame = 0;
      if (!pending) return;
      pending.card.style.setProperty("--mx", `${pending.x.toFixed(1)}px`);
      pending.card.style.setProperty("--my", `${pending.y.toFixed(1)}px`);
      pending = null;
    };
    const move = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".fc-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      pending = { card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    root.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); root.removeEventListener("pointermove", move); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/useReducedMotion.ts">
<![CDATA["use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** True when the visitor asks for less motion. The server (and first render) assume reduced, the safe default. */
export const useReducedMotion = () => useSyncExternalStore(subscribe, () => matchMedia(QUERY).matches, () => true);
]]>
    </file>
    <file path="src/app/(cullet)/cullet/motion/webgl.ts">
<![CDATA[/** A cheap WebGL check. Creating a probe context costs a long task on phones, and the engines fail safely anyway. */
export const mayHaveWebGL = () => "WebGL2RenderingContext" in window || "WebGLRenderingContext" in window;
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sampler/engine.ts">
<![CDATA[import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { clamp, smoothing } from "../motion/math";
import type { GlassParams } from "./params";

/**
 * The live sample: one cut gem of transmissive glass in front of a striped studio card, so that
 * refraction, dispersion and roughness are all visible at once. Drag turns it; left alone it turns
 * slowly. Renders only while on screen, and reports how long each frame takes to submit.
 */
function backdropTexture() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 640;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "rgb(244,245,248)";
  ctx.fillRect(0, 0, c.width, c.height);
  // ink bars of varied width, a cobalt band and a hairline grid: edges for the glass to bend
  const bars = [[96, 14], [168, 6], [214, 30], [318, 4], [356, 10], [602, 22], [676, 4], [720, 12], [842, 8], [900, 26]];
  ctx.fillStyle = "rgb(15,17,23)";
  for (const [x, w] of bars) ctx.fillRect(x, 0, w, c.height);
  ctx.fillStyle = "rgb(37,99,235)";
  ctx.fillRect(452, 0, 64, c.height);
  ctx.strokeStyle = "rgba(15,17,23,0.12)";
  ctx.lineWidth = 2;
  for (let y = 40; y < c.height; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(c.width, y); ctx.stroke(); }
  ctx.fillStyle = "rgba(15,17,23,0.75)";
  ctx.font = "600 34px ui-monospace, monospace";
  ctx.fillText("CULLET STUDIO CARD 07", 40, 600);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(15,17,23,0.28)");
  g.addColorStop(1, "rgba(15,17,23,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** A round brilliant, reduced: table, crown, girdle and pavilion on ten cut faces, flat-shaded. */
function gemGeometry() {
  const profile = [
    new THREE.Vector2(0.001, -1.05),
    new THREE.Vector2(1.0, 0.0),
    new THREE.Vector2(1.0, 0.1),
    new THREE.Vector2(0.62, 0.52),
    new THREE.Vector2(0.001, 0.52),
  ];
  const geo = new THREE.LatheGeometry(profile, 10).toNonIndexed();
  geo.computeVertexNormals();
  return geo;
}

export function createSamplerEngine(canvas: HTMLCanvasElement, stage: HTMLElement, initial: GlassParams, onFrame: (ms: number) => void) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f5f8);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 4 / 3, 0.1, 50);
  camera.position.set(0, 0.35, 7.2);
  camera.lookAt(0, 0, 0);

  const backTex = backdropTexture();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 6), new THREE.MeshBasicMaterial({ map: backTex }));
  backdrop.position.z = -2.4;
  scene.add(backdrop);

  const shadowTex = shadowTexture();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.45;
  scene.add(shadow);

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, transmission: 1, specularIntensity: 1,
    iridescenceIOR: 1.35, iridescenceThicknessRange: [280, 680], envMapIntensity: 1.1, side: THREE.DoubleSide,
  });
  const gem = new THREE.Mesh(gemGeometry(), material);
  gem.position.y = -0.1;
  gem.scale.setScalar(1.25);
  scene.add(gem);

  const apply = (p: GlassParams) => {
    material.ior = p.ior;
    material.dispersion = p.dispersion; // the same number GLTFLoader reads from KHR_materials_dispersion
    material.roughness = p.roughness;
    material.thickness = p.thickness;
    material.iridescence = p.iridescence;
  };
  apply(initial);

  // drag to turn; inertia; a slow turn when left alone
  const turn = { yaw: 0.4, pitch: 0.22, vy: 0, dragging: false, lastX: 0, lastY: 0, lastInput: 0 };
  const down = (e: PointerEvent) => {
    turn.dragging = true; turn.lastX = e.clientX; turn.lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    wake();
  };
  const move = (e: PointerEvent) => {
    if (!turn.dragging) return;
    const dx = e.clientX - turn.lastX, dy = e.clientY - turn.lastY;
    turn.lastX = e.clientX; turn.lastY = e.clientY;
    turn.yaw += dx * 0.01;
    turn.pitch = clamp(turn.pitch + dy * 0.006, -0.6, 0.8);
    turn.vy = dx * 0.01;
    turn.lastInput = performance.now();
    wake();
  };
  const up = () => { turn.dragging = false; };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 40 : 30;
    camera.updateProjectionMatrix();
    wake();
  };

  let frame = 0, last = performance.now(), visible = false, running = true, acc = 0, n = 0, lastReport = 0;
  const tick = (now: number) => {
    frame = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!turn.dragging) {
      turn.vy *= 1 - smoothing(dt, 0.35);
      const idle = now - turn.lastInput > 1600 ? 0.18 : 0;
      turn.yaw += (turn.vy + idle * dt);
    }
    gem.rotation.set(turn.pitch, turn.yaw, 0);
    const t0 = performance.now();
    renderer.render(scene, camera);
    acc += performance.now() - t0; n++;
    if (now - lastReport > 700 && n) { onFrame(acc / n); acc = 0; n = 0; lastReport = now; }
    if (running && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };
  function wake() {
    if (running && !frame && visible && !document.hidden) { last = performance.now(); frame = requestAnimationFrame(tick); }
  }

  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
  io.observe(stage);
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  document.addEventListener("visibilitychange", wake);
  resize();

  return {
    set(p: GlassParams) { apply(p); wake(); },
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", wake);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      gem.geometry.dispose(); material.dispose(); backTex.dispose(); shadowTex.dispose(); env.dispose(); pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type SamplerEngine = ReturnType<typeof createSamplerEngine>;
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sampler/params.ts">
<![CDATA[import { clamp } from "../motion/math";

/** The five dials of a Cullet glass. Units follow the glTF extensions they export to. */
export type GlassParams = {
  ior: number;
  dispersion: number;
  roughness: number;
  thickness: number;
  iridescence: number;
};

export type ParamKey = keyof GlassParams;

export type ParamSpec = { key: ParamKey; label: string; short: string; min: number; max: number; step: number; unit: string };

export const PARAMS: ParamSpec[] = [
  { key: "ior", label: "Index of refraction", short: "IOR", min: 1, max: 2.4, step: 0.01, unit: "" },
  { key: "dispersion", label: "Dispersion", short: "Disp", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "roughness", label: "Roughness", short: "Rough", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "thickness", label: "Thickness", short: "Thick", min: 0.1, max: 4, step: 0.1, unit: "cm" },
  { key: "iridescence", label: "Iridescence", short: "Film", min: 0, max: 1, step: 0.01, unit: "" },
];

const SPEC = Object.fromEntries(PARAMS.map((p) => [p.key, p])) as Record<ParamKey, ParamSpec>;

const decimals = (step: number) => (String(step).split(".")[1] ?? "").length;

/** Clamps a value into its dial and snaps it to the dial's step. Non-numbers fall back to the minimum. */
export function snap(key: ParamKey, value: number): number {
  const { min, max, step } = SPEC[key];
  if (!Number.isFinite(value)) return min;
  const v = clamp(value, min, max);
  return Number((Math.round((v - min) / step) * step + min).toFixed(decimals(step)));
}

export function setParam(params: GlassParams, key: ParamKey, value: number): GlassParams {
  return { ...params, [key]: snap(key, value) };
}

export function formatParam(key: ParamKey, value: number): string {
  const { step, unit } = SPEC[key];
  return `${value.toFixed(decimals(step))}${unit ? ` ${unit}` : ""}`;
}

/** The Abbe number a dispersion value stands for (KHR_materials_dispersion: dispersion = 20 / V). */
export function abbe(dispersion: number): number {
  return dispersion <= 0 ? Infinity : Math.round(20 / dispersion);
}

export function sameParams(a: GlassParams, b: GlassParams): boolean {
  return PARAMS.every(({ key }) => Math.abs(a[key] - b[key]) < 1e-6);
}

/** The material as a glTF 2.0 material object, the way Cullet exports it. */
export function toGltf(params: GlassParams, name: string) {
  const ext: Record<string, Record<string, number>> = {
    KHR_materials_transmission: { transmissionFactor: 1 },
    KHR_materials_volume: { thicknessFactor: params.thickness },
    KHR_materials_ior: { ior: params.ior },
    KHR_materials_dispersion: { dispersion: params.dispersion },
  };
  if (params.iridescence > 0) {
    ext.KHR_materials_iridescence = {
      iridescenceFactor: params.iridescence,
      iridescenceIor: 1.35,
      iridescenceThicknessMinimum: 280,
      iridescenceThicknessMaximum: 680,
    };
  }
  return {
    name,
    pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: params.roughness },
    extensions: ext,
  };
}

/** How a ray bends and fans through the sampler's prism, in degrees, for the drawn poster. */
export function rayFan(params: GlassParams) {
  const bend = clamp((params.ior - 1) * 34, 0, 48);
  const spread = clamp(params.dispersion * (params.ior - 1) * 46, 0, 30);
  const blur = clamp(params.roughness * 6, 0, 6);
  return { bend, spread, blur };
}

/** A rough cost for the poster's frame readout before the live renderer measures the real one. */
export function estimateMs(params: GlassParams): number {
  const ms = 1.05 + params.dispersion * 0.55 + params.iridescence * 0.22 + params.roughness * 0.12 + params.thickness * 0.04;
  return Math.round(ms * 10) / 10;
}

/** Which line of the exported JSON a dial writes, so the readout can flash it. */
export const GLTF_KEY: Record<ParamKey, string> = {
  ior: '"ior"',
  dispersion: '"dispersion"',
  roughness: '"roughnessFactor"',
  thickness: '"thicknessFactor"',
  iridescence: '"iridescenceFactor"',
};
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sampler/Sampler.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { materialById, MATERIALS } from "../content/materials";
import { goto } from "../motion/SmoothScroll";
import { mayHaveWebGL } from "../motion/webgl";
import type { SamplerEngine } from "./engine";
import { abbe, estimateMs, formatParam, GLTF_KEY, PARAMS, rayFan, sameParams, setParam, toGltf, type GlassParams, type ParamKey } from "./params";
import { SamplerPoster } from "./SamplerPoster";

type Glass = "off" | "offer" | "loading" | "on";

const START = materialById("frosted-quartz")!;

/**
 * The live sampler. Five dials, six presets, a glTF readout that flashes the line each dial writes,
 * and a stage that is the drawn poster until the WebGL gem takes over (near the viewport on desktop,
 * on tap on touch screens, never under reduced motion). Materials elsewhere load here via `fc:preset`.
 */
export function Sampler() {
  const [params, setParams] = useState<GlassParams>(START.params);
  const [name, setName] = useState(START.id);
  const [hot, setHot] = useState<{ key: ParamKey | "all"; n: number }>({ key: "all", n: 0 });
  const [glass, setGlass] = useState<Glass>("off");
  const [ms, setMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<SamplerEngine | null>(null);
  const paramsRef = useRef(params);

  const preset = MATERIALS.find((m) => sameParams(m.params, params));

  const start = useCallback(async () => {
    const stage = stageRef.current, canvas = canvasRef.current;
    if (!stage || !canvas || engine.current) return;
    setGlass("loading");
    try {
      const { createSamplerEngine } = await import("./engine");
      if (engine.current) return;
      engine.current = createSamplerEngine(canvas, stage, paramsRef.current, (v) => setMs(v));
      setGlass("on");
    } catch {
      setGlass("off");
    }
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!mayHaveWebGL()) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const id = window.setTimeout(() => setGlass("offer"), 0);
      return () => window.clearTimeout(id);
    }
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      void start();
    }, { rootMargin: "100% 0px" });
    io.observe(stage);
    return () => io.disconnect();
  }, [start]);

  useEffect(() => () => { engine.current?.destroy(); engine.current = null; }, []);
  useEffect(() => { paramsRef.current = params; engine.current?.set(params); }, [params]);

  useEffect(() => {
    const onPreset = (e: Event) => {
      const m = materialById((e as CustomEvent<string>).detail);
      if (!m) return;
      setParams(m.params); setName(m.id); setHot((h) => ({ key: "all", n: h.n + 1 }));
      goto("sampler");
    };
    window.addEventListener("fc:preset", onPreset);
    return () => window.removeEventListener("fc:preset", onPreset);
  }, []);

  const dial = (key: ParamKey, value: number) => {
    setParams((p) => setParam(p, key, value));
    setName("custom-glass");
    setHot((h) => ({ key, n: h.n + 1 }));
  };

  const choose = (id: string) => {
    const m = materialById(id);
    if (!m) return;
    setParams(m.params); setName(m.id); setHot((h) => ({ key: "all", n: h.n + 1 }));
  };

  const json = useMemo(() => JSON.stringify(toGltf(params, name), null, 2), [params, name]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(json); } catch { /* the readout stays selectable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const fan = rayFan(params);
  const look = {
    "--bend": `${fan.bend.toFixed(1)}deg`, "--spread": `${fan.spread.toFixed(1)}deg`, "--blur": `${fan.blur.toFixed(2)}px`,
    "--film": params.iridescence.toFixed(2), "--thick": (0.82 + params.thickness * 0.06).toFixed(3),
  } as CSSProperties;
  const frame = ms ?? estimateMs(params);

  return (
    <div className="fc-sampler__grid">
      <div ref={stageRef} className="fc-sampler__stage" data-glass={glass} style={look}>
        <SamplerPoster />
        <canvas ref={canvasRef} className="fc-sampler__canvas" aria-label="Live glass sample. Drag to turn it." role="img" aria-hidden={glass !== "on"} />
        <div className="fc-sampler__hud">
          <span className="fc-sampler__live" data-on={glass === "on"}>{glass === "on" ? "Live · WebGL" : "Drawn preview"}</span>
          <span className="fc-sampler__ms" data-ambient>
            <span className="fc-sampler__ms-n">{frame.toFixed(1)}</span> ms {glass === "on" ? "frame" : "est."}
          </span>
        </div>
        {glass === "offer" || glass === "loading" ? (
          <button type="button" className="fc-light fc-light--sampler" onClick={() => void start()} disabled={glass === "loading"}>
            <span className="fc-light__dot" aria-hidden="true" />
            {glass === "loading" ? "Cutting the gem…" : "Render it live"}
          </button>
        ) : null}
      </div>

      <div className="fc-sampler__panel">
        <div className="fc-presets" role="group" aria-label="Presets">
          {MATERIALS.map((m) => (
            <button key={m.id} type="button" className="fc-preset" aria-pressed={preset?.id === m.id} onClick={() => choose(m.id)}>
              <span className={`fc-preset__swatch fc-swatch--${m.finish}`} aria-hidden="true" />
              {m.name}
            </button>
          ))}
        </div>

        <div className="fc-dials">
          {PARAMS.map((p) => {
            const pct = ((params[p.key] - p.min) / (p.max - p.min)) * 100;
            return (
              <div key={p.key} className="fc-dial">
                <label htmlFor={`fc-dial-${p.key}`} className="fc-dial__label">{p.label}</label>
                <output htmlFor={`fc-dial-${p.key}`} className="fc-dial__value">{formatParam(p.key, params[p.key])}</output>
                <input
                  id={`fc-dial-${p.key}`} className="fc-dial__input" type="range"
                  min={p.min} max={p.max} step={p.step} value={params[p.key]}
                  style={{ "--fill": `${pct.toFixed(2)}%` } as CSSProperties}
                  onChange={(e) => dial(p.key, Number(e.target.value))}
                />
              </div>
            );
          })}
          <p className="fc-dials__abbe">Abbe number <strong>{Number.isFinite(abbe(params.dispersion)) ? abbe(params.dispersion) : "∞"}</strong> · {preset ? preset.name : "Custom glass"}</p>
        </div>

        <div className="fc-readout">
          <div className="fc-readout__head">
            <span className="fc-mono">{name}.gltf</span>
            <button type="button" className="fc-readout__copy" data-done={copied} onClick={copy}>
              <span className="fc-readout__copy-label">{copied ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>
          <pre className="fc-readout__code" tabIndex={0} aria-label="glTF material JSON">
            <code>
              {json.split("\n").map((ln, i) => {
                const isHot = hot.key === "all" ? hot.n > 0 : ln.includes(GLTF_KEY[hot.key]);
                return <span key={`${i}-${isHot ? hot.n : 0}`} className="fc-readout__ln" data-hot={isHot || undefined}>{ln}{"\n"}</span>;
              })}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sampler/SamplerPoster.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { SPECTRUM } from "./spectrum";

/**
 * The sampler drawn: a studio card, a prism, a white ray going in and a spectral fan coming out.
 * The dials drive it through custom properties on the stage (`--bend`, `--spread`, `--blur`,
 * `--film`, `--thick`), with CSS transitions, so it answers every slider even without WebGL.
 */
export function SamplerPoster() {
  return (
    <svg className="fc-sp" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fc-sp-film" x1="0" y1="0" x2="1" y2="1">
          {SPECTRUM.map((s, i) => <stop key={s.nm} offset={i / (SPECTRUM.length - 1)} stopColor={s.color} />)}
        </linearGradient>
      </defs>
      <rect className="fc-sp__card" width="400" height="300" />
      {[[38, 6], [66, 2], [84, 12], [126, 2], [142, 4], [240, 9], [270, 2], [288, 5], [336, 3], [358, 10]].map(([x, w]) => (
        <rect key={x} className="fc-sp__bar" x={x} y="0" width={w} height="300" />
      ))}
      <rect className="fc-sp__band" x="180" y="0" width="26" height="300" />
      <ellipse className="fc-sp__shadow" cx="200" cy="246" rx="86" ry="10" />
      <path className="fc-sp__in" d="M0 170 162 154" />
      <g className="fc-sp__fan">
        {SPECTRUM.map((s, i) => (
          <path key={s.nm} className="fc-sp__ray" d="M238 156H420" style={{ stroke: s.color, "--k": i / (SPECTRUM.length - 1) - 0.5 } as CSSProperties} />
        ))}
      </g>
      <g className="fc-sp__prism">
        <path className="fc-sp__glass" d="M200 70 262 214H138Z" />
        <path className="fc-sp__film" d="M200 70 262 214H138Z" />
        <path className="fc-sp__edge" d="M200 70 262 214H138Z" />
      </g>
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sampler/spectrum.ts">
<![CDATA[/**
 * Spectral stops for dispersion fans: what white light becomes after the prism.
 * Optical content, not brand colour (exempt from the palette guard), used only where a ray has split.
 */
export const SPECTRUM = [
  { nm: 650, color: "#F0455A" },
  { nm: 600, color: "#F79A3E" },
  { nm: 570, color: "#EFD24A" },
  { nm: 520, color: "#3CCB7F" },
  { nm: 470, color: "#3B82F6" },
  { nm: 420, color: "#8B5CF6" },
] as const;

/** The spectrum as a CSS gradient, for caustic sweeps and the sampler's fan. */
export const spectrumGradient = (angle = 90) =>
  `linear-gradient(${angle}deg, ${SPECTRUM.map((s, i) => `${s.color} ${Math.round((i / (SPECTRUM.length - 1)) * 100)}%`).join(", ")})`;
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/BackToTop.tsx">
<![CDATA["use client";
import { goto } from "../motion/SmoothScroll";

export function BackToTop() {
  return (
    <a href="#cullet" className="fc-link fc-link--quiet fc-foot__top-link" onClick={(e) => { e.preventDefault(); goto("top"); }}>
      Back to the slab <span aria-hidden="true">↑</span>
    </a>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";
import { BackToTop } from "./BackToTop";

const COLUMNS = [
  { title: "Studio", links: [["The sampler", "#sampler"], ["Materials", "#materials"], ["Pricing", "#pricing"], ["Open a seat", "#open"]] },
  { title: "Lab", links: [["Five terms", "#terms"], ["Workflow", "#workflow"], ["The numbers", "#proof"]] },
];

/** The colophon: the lockup, a cut wordmark, the index, and the extension the whole page is about. */
export function Footer() {
  return (
    <footer className="fc-foot" aria-labelledby="fc-foot-title">
      <div className="fc-wrap">
        <div className="fc-foot__top">
          <div className="fc-foot__brand">
            <Logo />
            <p id="fc-foot-title" className="fc-foot__line">A real-time material studio. Designed in glass, rendered everywhere.</p>
          </div>
          <nav className="fc-foot__cols" aria-label="Footer">
            {COLUMNS.map((c) => (
              <div key={c.title} className="fc-foot__col">
                <p className="fc-foot__head">{c.title}</p>
                <ul>
                  {c.links.map(([label, href]) => (
                    <li key={href}><a className="fc-link fc-link--quiet" href={href}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <Reveal variant="cleave" className="fc-foot__word">
          <span aria-hidden="true">
            <svg viewBox="0 0 820 236" className="fc-foot__svg"><text x="-6" y="214">Cullet</text></svg>
          </span>
        </Reveal>
        <div className="fc-foot__base">
          <span>© 2026 Cullet Lab · a fictional brand for a landing-page template</span>
          <span className="fc-mono">KHR_materials_dispersion</span>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Header.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { NAV } from "../content/copy";
import { goto, lockScroll } from "../motion/SmoothScroll";

/**
 * The header that arrives once the slab has cleaved: a glass bar with the lockup, the sections with a
 * pill that slides to the current one, and "Open studio". On phones a menu sheet opens out of the
 * toggle with a clip-path, staggers its links in, traps focus and closes on Escape.
 */
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<string | null>).detail);
    window.addEventListener("fc:section", on);
    return () => window.removeEventListener("fc:section", on);
  }, []);

  // measure the pill against the active link; transforms only
  useEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      setPill(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const close = useCallback((returnFocus = true) => {
    setMenu(false);
    lockScroll(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menu) return;
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, close]);

  const travel = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (menu) close(false);
    goto(id);
  };

  return (
    <header className="fc-header" data-menu={menu}>
      <div className="fc-header__bar">
        <a href="#cullet" className="fc-header__home" onClick={travel("top")} aria-label="Cullet, back to the top">
          <Logo />
        </a>
        <nav className="fc-header__nav" aria-label="Sections">
          <span className="fc-header__pill" aria-hidden="true" data-on={!!pill}
            style={pill ? { transform: `translateX(${pill.x}px) scaleX(${(pill.w / 100).toFixed(4)})` } : undefined} />
          <ul ref={listRef} className="fc-header__links">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} data-id={n.id} className="fc-header__link" aria-current={active === n.id ? "location" : undefined} onClick={travel(n.id)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#open" className="fc-btn fc-btn--ink fc-btn--sm fc-header__cta" onClick={travel("open")}>
          <span className="fc-btn__label" data-text="Open studio"><span>Open studio</span></span>
        </a>
        <button ref={toggleRef} type="button" className="fc-header__toggle" aria-expanded={menu} aria-controls="fc-menu"
          onClick={() => { const next = !menu; setMenu(next); lockScroll(next); }}>
          <span className="fc-sr">{menu ? "Close menu" : "Open menu"}</span>
          <span className="fc-header__bars" aria-hidden="true"><span /><span /></span>
        </button>
        <span className="fc-header__progress" aria-hidden="true" />
      </div>
      <div ref={sheetRef} id="fc-menu" className="fc-menu" data-open={menu} hidden={!menu}>
        <ul className="fc-menu__list">
          {[...NAV, { id: "open", label: "Open studio" }].map((n, i) => (
            <li key={n.id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${n.id}`} className="fc-menu__link" onClick={travel(n.id)} aria-current={active === n.id ? "location" : undefined}>
                <span className="fc-menu__n">{String(i + 1).padStart(2, "0")}</span>{n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/LoadPreset.tsx">
<![CDATA["use client";

/** Sends a material to the sampler and travels there. Without JS it is a link to the studio. */
export function LoadPreset({ id, name }: { id: string; name: string }) {
  return (
    <a
      href="#sampler"
      className="fc-card__load"
      onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("fc:preset", { detail: id })); }}
    >
      <span>Open in studio</span><span className="fc-sr">: {name}</span>
      <svg className="fc-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
    </a>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Materials.tsx">
<![CDATA[import { MATERIALS } from "../content/materials";
import { MaskLine, Reveal } from "../motion/Reveal";
import { Spotlight } from "../motion/Spotlight";
import { abbe } from "../sampler/params";
import { Picture } from "../assets";
import { LoadPreset } from "./LoadPreset";

/**
 * Chapter 04: the material library. A white sheet whose top edge is a cut line that levels out as it
 * arrives; six swatch cards that lift under a pointer spotlight and load straight into the sampler.
 */
export function Materials() {
  return (
    <section className="fc-mats" id="materials" data-scene="materials" aria-labelledby="fc-mats-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--split">
          <div>
            <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 04 · The library</Reveal>
            <h2 id="fc-mats-title" className="fc-h2">
              <MaskLine>Six cuts to</MaskLine> <MaskLine index={1}>start from.</MaskLine>
            </h2>
          </div>
          <Reveal as="p" className="fc-lead" index={1}>
            Each preset is tuned against the real glass it is named for, and every one is a starting point you can open in the studio above.
          </Reveal>
        </header>
        <Spotlight className="fc-mats__grid">
          {MATERIALS.map((m, i) => (
            <Reveal as="article" key={m.id} variant="scale" index={i} className="fc-card" id={`fc-mat-${m.id}`}>
              <div className="fc-card__swatch">
                <Picture assetKey={`material-${m.id}`} alt={`${m.name} glass swatch`}>
                  <div className={`fc-swatch fc-swatch--${m.finish}`} aria-hidden="true">
                    <span className="fc-swatch__shard" />
                    <span className="fc-swatch__sheen" />
                  </div>
                </Picture>
                <span className="fc-card__code">{m.code}</span>
              </div>
              <div className="fc-card__body">
                <h3 className="fc-card__name">{m.name}</h3>
                <p className="fc-card__note">{m.note}</p>
                <dl className="fc-card__spec">
                  <div><dt>IOR</dt><dd>{m.params.ior.toFixed(2)}</dd></div>
                  <div><dt>Abbe</dt><dd>{Number.isFinite(abbe(m.params.dispersion)) ? abbe(m.params.dispersion) : "∞"}</dd></div>
                  <div><dt>Rough</dt><dd>{m.params.roughness.toFixed(2)}</dd></div>
                </dl>
                <p className="fc-card__use">{m.use}</p>
                <LoadPreset id={m.id} name={m.name} />
              </div>
            </Reveal>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Open.tsx">
<![CDATA[import { SeatForm } from "../forms/SeatForm";
import { MaskLine, Reveal } from "../motion/Reveal";

/** Chapter 07: the ink slab. Request a seat; the form cleaves away into a glass check. */
export function Open() {
  return (
    <section className="fc-open" id="open" aria-labelledby="fc-open-title">
      <div className="fc-wrap fc-open__grid">
        <div className="fc-open__copy">
          <Reveal as="p" variant="slide" className="fc-eyebrow fc-eyebrow--on-ink">Chapter 07 · Open studio</Reveal>
          <h2 id="fc-open-title" className="fc-h2">
            <MaskLine>Your first glass</MaskLine> <MaskLine index={1}>is ten minutes away.</MaskLine>
          </h2>
          <Reveal as="p" className="fc-lead" index={2}>
            Ask for a seat and the studio opens in your browser with the six cuts loaded. Bring a glTF, or start from a cube.
          </Reveal>
          <Reveal as="ul" className="fc-open__facts" index={3}>
            <li><strong>14 days</strong> of Studio, free</li>
            <li><strong>WebGL 2</strong> is all it needs</li>
            <li><strong>Export</strong> everything, even after the trial</li>
          </Reveal>
        </div>
        <Reveal variant="cleave" className="fc-open__panel">
          <div className="fc-open__panel-in">
            <SeatForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Pricing.tsx">
<![CDATA["use client";
import { useState, type CSSProperties } from "react";
import { CUTS, priceFor, type Cadence } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";
import { goto } from "../motion/SmoothScroll";

const CADENCES: { id: Cadence; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Yearly · save 20%" },
];

/** Chapter 06: pricing as three cuts. A cadence switch with a sliding glass pill; prices roll on change. */
export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>("monthly");
  const at = CADENCES.findIndex((c) => c.id === cadence);
  return (
    <section className="fc-price" id="pricing" aria-labelledby="fc-price-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--center">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 06 · The cuts</Reveal>
          <h2 id="fc-price-title" className="fc-h2">
            <MaskLine>Pay for the seat,</MaskLine> <MaskLine index={1}>not the render.</MaskLine>
          </h2>
          <div className="fc-toggle" role="radiogroup" aria-label="Billing" style={{ "--at": at } as CSSProperties}>
            <span className="fc-toggle__pill" aria-hidden="true" />
            {CADENCES.map((c) => (
              <button key={c.id} type="button" role="radio" aria-checked={cadence === c.id} className="fc-toggle__opt" onClick={() => setCadence(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </header>
        <div className="fc-cuts">
          {CUTS.map((cut, i) => {
            const price = priceFor(cut, cadence);
            return (
              <Reveal as="article" key={cut.id} variant="scale" index={i} className="fc-cut" id={`fc-cut-${cut.id}`}>
                <div className="fc-cut__in" data-featured={cut.featured || undefined}>
                  {cut.featured ? <p className="fc-cut__flag">Most seats</p> : null}
                  <h3 className="fc-cut__name">{cut.name}</h3>
                  <p className="fc-cut__blurb">{cut.blurb}</p>
                  <p className="fc-cut__price">
                    {price === null ? (
                      <span className="fc-cut__amount" key="custom">Custom</span>
                    ) : (
                      <>
                        <span className="fc-cut__amount" key={`${cut.id}-${cadence}`}>${price}</span>
                        <span className="fc-cut__per">{price === 0 ? "forever" : cadence === "annual" ? "per seat / mo, billed yearly" : "per seat / month"}</span>
                      </>
                    )}
                  </p>
                  <ul className="fc-cut__list">
                    {cut.features.map((f) => (
                      <li key={f}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>{f}</li>
                    ))}
                  </ul>
                  <a href="#open" className={`fc-btn ${cut.featured ? "fc-btn--ink" : "fc-btn--ghost"}`}
                    onClick={(e) => { e.preventDefault(); goto("open"); }}>
                    <span className="fc-btn__label" data-text={cut.cta}><span>{cut.cta}</span></span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Proof.tsx">
<![CDATA[import { NOTES, RENDERERS, STATS } from "../content/copy";
import { CountUp } from "../motion/CountUp";
import { Marquee } from "../motion/Marquee";
import { MaskLine, Reveal } from "../motion/Reveal";

/** Chapter 05: the numbers, the renderers that read the export, and three studios that ship with it. */
export function Proof() {
  return (
    <section className="fc-proof" id="proof" aria-labelledby="fc-proof-title">
      <div className="fc-wrap">
        <header className="fc-head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 05 · The budget</Reveal>
          <h2 id="fc-proof-title" className="fc-h2">
            <MaskLine>Glass that fits</MaskLine> <MaskLine index={1}>in a frame.</MaskLine>
          </h2>
        </header>
        <dl className="fc-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="fc-stat" index={i}>
              <dt className="fc-stat__label">{s.label}</dt>
              <dd className="fc-stat__value"><CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} /></dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="fc-proof__band">
        <p className="fc-proof__band-label fc-mono">Exports read by</p>
        <Marquee label="Renderers that read Cullet exports">
          {RENDERERS.map((r) => (
            <span key={r} className="fc-proof__chip"><span className="fc-proof__shard" aria-hidden="true" />{r}</span>
          ))}
        </Marquee>
      </div>

      <div className="fc-wrap">
        <ul className="fc-notes">
          {NOTES.map((n, i) => (
            <Reveal as="li" key={n.name} variant="scale" index={i} className="fc-note">
              <figure>
                <blockquote className="fc-note__quote">“{n.quote}”</blockquote>
                <figcaption className="fc-note__by">
                  <span className="fc-note__name">{n.name}</span>
                  <span className="fc-note__role">{n.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Studio.tsx">
<![CDATA[import { MaskLine, Reveal } from "../motion/Reveal";
import { Sampler } from "../sampler/Sampler";

/** Chapter 02: the live sampler. A sheet of glass that slides over the held terms. */
export function Studio() {
  return (
    <section className="fc-studio" id="sampler" data-scene="studio" aria-labelledby="fc-studio-title">
      <div className="fc-wrap">
        <header className="fc-head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 02 · The studio</Reveal>
          <h2 id="fc-studio-title" className="fc-h2">
            <MaskLine>Turn the dials.</MaskLine> <MaskLine index={1}>Watch the light.</MaskLine>
          </h2>
          <Reveal as="p" className="fc-lead" index={2}>
            This is a real Cullet material in a real renderer. Pick a preset or drag a dial, and the glass, the drawn preview
            and the exported glTF all change together.
          </Reveal>
        </header>
        <Reveal variant="scale" className="fc-studio__frame">
          <Sampler />
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/sections/Workflow.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { STEPS } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";

const LAYERS = [
  { name: "Clearcoat", v: "rough 0.08" },
  { name: "Thin film", v: "280–680 nm" },
  { name: "Volume", v: "1.4 cm" },
  { name: "Body", v: "IOR 1.54" },
];

const RENDERERS = [
  { name: "three.js", ms: "1.6" },
  { name: "Babylon.js", ms: "1.8" },
  { name: "model-viewer", ms: "1.7" },
];

function CutMock() {
  return (
    <ol className="fc-mock fc-mock--layers" aria-label="Material layers">
      {LAYERS.map((l, i) => (
        <li key={l.name} className="fc-mock__layer" style={{ "--i": i } as CSSProperties}>
          <span className="fc-mock__grip" aria-hidden="true" />
          <span>{l.name}</span>
          <span className="fc-mono">{l.v}</span>
        </li>
      ))}
    </ol>
  );
}

function PreviewMock() {
  return (
    <ul className="fc-mock fc-mock--tiles" aria-label="Renderer previews">
      {RENDERERS.map((r) => (
        <li key={r.name} className="fc-mock__tile">
          <svg viewBox="0 0 60 48" aria-hidden="true" className="fc-mock__gem">
            <path d="M30 6 50 20 30 44 10 20Z" />
            <path d="M10 20H50M30 6 22 20 30 44 38 20Z" />
          </svg>
          <span className="fc-mock__tile-name">{r.name}</span>
          <span className="fc-mono">{r.ms} ms</span>
        </li>
      ))}
    </ul>
  );
}

function ShipMock() {
  return (
    <pre className="fc-mock fc-mock--code" aria-label="Export code example">
      <code>
        <span className="fc-code__k">import</span> {"{ cullet }"} <span className="fc-code__k">from</span> <span className="fc-code__s">&quot;@cullet/three&quot;</span>;{"\n\n"}
        <span className="fc-code__k">const</span> glass = <span className="fc-code__k">await</span> cullet(<span className="fc-code__s">&quot;frosted-quartz&quot;</span>);{"\n"}
        bottle.material = glass;{"\n"}
        <span className="fc-code__c">{"// 4.1 kB · KHR_materials_dispersion"}</span>
      </code>
    </pre>
  );
}

const MOCKS = [CutMock, PreviewMock, ShipMock];

/** Chapter 03: cut, preview, ship. Three steps joined by a drawn line, each with its own working surface. */
export function Workflow() {
  return (
    <section className="fc-flow" id="workflow" aria-labelledby="fc-flow-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--split">
          <div>
            <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 03 · The workflow</Reveal>
            <h2 id="fc-flow-title" className="fc-h2">
              <MaskLine>Cut. Preview.</MaskLine> <MaskLine index={1}>Ship.</MaskLine>
            </h2>
          </div>
          <Reveal as="p" className="fc-lead" index={1}>
            No baking, no turntable renders, no &quot;looks different in the app&quot;. One material, authored once, rendered the same by every viewer that reads glTF.
          </Reveal>
        </header>
        <div className="fc-flow__steps">
          <Reveal variant="draw" className="fc-flow__line"><span /></Reveal>
          {STEPS.map((s, i) => {
            const Mock = MOCKS[i];
            return (
              <Reveal as="article" key={s.n} variant="scale" index={i} className="fc-step" id={`fc-step-${s.verb.toLowerCase()}`}>
                <div className="fc-step__node" aria-hidden="true"><span>{s.n}</span></div>
                <p className="fc-step__verb">{s.verb}</p>
                <h3 className="fc-step__title">{s.title}</h3>
                <p className="fc-step__body">{s.body}</p>
                <div className="fc-step__mock"><Mock /></div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/terms/Diagram.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { SPECTRUM } from "../sampler/spectrum";
import type { Term } from "../content/copy";

/**
 * A ray diagram per term, drawn in a 320×220 box. Lines use `pathLength=1` so the CSS can draw them
 * (`stroke-dashoffset` 1 → 0) when their term becomes the active one, in the order given by `--d`.
 */
const d = (n: number) => ({ "--d": n }) as CSSProperties;

function Film() {
  return (
    <>
      <rect className="fc-dg__glass" x="20" y="112" width="280" height="88" rx="6" />
      <path className="fc-dg__film" d="M20 100H300M20 112H300" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M48 22 140 100" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M140 100 232 22" />
      <path className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1)} d="M140 100 154 112 168 100" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(2)} d="M168 100 260 22" />
      <path className="fc-dg__wave" pathLength={1} style={d(3)} d="M236 52c6-10 12 10 18 0s12 10 18 0 12 10 18 0" />
      <text className="fc-dg__label" x="24" y="94">clearcoat · 280–680 nm</text>
    </>
  );
}

function Snell() {
  return (
    <>
      <rect className="fc-dg__glass" x="20" y="110" width="280" height="96" rx="6" />
      <path className="fc-dg__normal" d="M160 24V204" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M70 24 160 110" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(1)} d="M160 110 204 204" />
      <path className="fc-dg__arc" pathLength={1} style={d(2)} d="M160 70a40 40 0 0 0-28 12" />
      <path className="fc-dg__arc" pathLength={1} style={d(2)} d="M160 150a40 40 0 0 0 17-4" />
      <text className="fc-dg__label" x="24" y="40">n₁ 1.00</text>
      <text className="fc-dg__label" x="24" y="132">n₂ 1.52</text>
    </>
  );
}

function Prism() {
  return (
    <>
      <path className="fc-dg__glass" d="M160 26 262 194H58Z" />
      <path className="fc-dg__ray" pathLength={1} style={d(0)} d="M8 138 112 118" />
      <path className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1)} d="M112 118 206 124" />
      {SPECTRUM.map((s, i) => (
        <path key={s.nm} className="fc-dg__spectral" pathLength={1} style={{ ...d(2), stroke: s.color } as CSSProperties}
          d={`M206 124 312 ${108 + i * 15}`} />
      ))}
      <text className="fc-dg__label" x="196" y="212">Abbe 59 · 3 λ / ray</text>
    </>
  );
}

function Slab() {
  return (
    <>
      <rect className="fc-dg__glass fc-dg__glass--frost" x="104" y="34" width="112" height="152" rx="10" />
      {[70, 110, 150].map((y, i) => (
        <path key={y} className="fc-dg__ray" pathLength={1} style={d(i * 0.3)} d={`M14 ${y}H104`} />
      ))}
      {[[118, 62, 142, 76], [126, 104, 150, 96], [120, 140, 146, 152], [160, 70, 186, 84], [168, 118, 196, 112], [164, 160, 190, 150]].map(([x1, y1, x2, y2], i) => (
        <path key={i} className="fc-dg__ray fc-dg__ray--thin" pathLength={1} style={d(1 + i * 0.15)} d={`M${x1} ${y1} ${x2} ${y2}`} />
      ))}
      {[60, 92, 128, 162].map((y, i) => (
        <path key={y} className="fc-dg__ray fc-dg__ray--soft" pathLength={1} style={d(2.2 + i * 0.2)} d={`M216 ${110 + (y - 110) * 0.6}L306 ${y}`} />
      ))}
      <text className="fc-dg__label" x="104" y="208">1.4 cm volume</text>
    </>
  );
}

function Micro() {
  return (
    <>
      <path className="fc-dg__surface" pathLength={1} style={d(0)}
        d="M16 160l12-2 12 2 12-2 12 2 12-2 12 2 12-2 12 2 12-2 12 2l10-10 10 16 10-14 10 12 10-18 10 16 10-10 10 14 10-16 10 12 10-8" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M40 40 86 156" />
      <path className="fc-dg__ray fc-dg__ray--accent" pathLength={1} style={d(2)} d="M86 156 126 44" />
      <path className="fc-dg__cone" pathLength={1} style={d(2)} d="M86 156 116 40M86 156 136 48" />
      <path className="fc-dg__ray" pathLength={1} style={d(1)} d="M196 40 238 154" />
      <path className="fc-dg__cone fc-dg__cone--wide" pathLength={1} style={d(2.4)} d="M238 154 228 36M238 154 262 34M238 154 296 52M238 154 304 88" />
      <text className="fc-dg__label" x="36" y="198">clearcoat 0.08</text>
      <text className="fc-dg__label" x="196" y="198">etched 0.22</text>
    </>
  );
}

const KINDS = { film: Film, snell: Snell, prism: Prism, slab: Slab, micro: Micro };

export function Diagram({ kind, label }: { kind: Term["diagram"]; label: string }) {
  const Body = KINDS[kind];
  return (
    <svg className="fc-dg" viewBox="0 0 320 220" role="img" aria-label={label}>
      <Body />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/terms/TermRail.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { scrollForStep } from "../motion/progress";
import { goto } from "../motion/SmoothScroll";

/**
 * The chapter rail beside the held terms: one button per term and a glass pill that slides to the
 * current one. Listens for the director's `fc:term` event; clicking travels to the middle of that step.
 */
export function TermRail({ names }: { names: string[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener("fc:term", on);
    return () => window.removeEventListener("fc:term", on);
  }, []);

  const jump = (i: number) => {
    const section = ref.current?.closest<HTMLElement>(".fc-terms");
    if (!section) return;
    const top = section.getBoundingClientRect().top + scrollY;
    goto(scrollForStep(i, names.length, top, section.offsetHeight, innerHeight));
  };

  return (
    <ol ref={ref} className="fc-rail" style={{ "--at": active } as CSSProperties} aria-label="The five terms">
      <span className="fc-rail__pill" aria-hidden="true" />
      {names.map((name, i) => (
        <li key={name}>
          <button type="button" className="fc-rail__item" aria-current={i === active ? "step" : undefined} onClick={() => jump(i)}>
            <span className="fc-rail__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="fc-rail__name">{name}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}
]]>
    </file>
    <file path="src/app/(cullet)/cullet/terms/Terms.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { TERMS } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";
import { Diagram } from "./Diagram";
import { TermRail } from "./TermRail";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter 01, the five terms. On wide screens with motion it is a held scene: the stage pins and the
 * scroll steps through the terms (the director writes `data-active`), each one drawing its ray diagram.
 * Everywhere else it is a plain list of five cards, every diagram drawn.
 */
export function Terms() {
  return (
    <section className="fc-terms" id="terms" data-scene="terms" aria-labelledby="fc-terms-title" style={{ "--count": TERMS.length } as CSSProperties}>
      <div className="fc-terms__stage">
        <header className="fc-terms__head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 01 · The vocabulary</Reveal>
          <h2 id="fc-terms-title" className="fc-h2">
            <MaskLine>Real-time glass,</MaskLine> <MaskLine index={1}>in five terms.</MaskLine>
          </h2>
        </header>

        <TermRail names={TERMS.map((t) => t.name)} />

        <div className="fc-terms__list">
          {TERMS.map((t, i) => (
            <article key={t.id} className="fc-term" data-term={i} data-active={i === 0 ? "" : undefined} aria-labelledby={`fc-term-${t.id}`}>
              <Reveal variant="cleave" className="fc-term__fig">
                <div className="fc-term__fig-in">
                  <Diagram kind={t.diagram} label={`${t.name} diagram`} />
                  <span className="fc-term__chip">{t.readout}</span>
                </div>
              </Reveal>
              <div className="fc-term__text">
                <p className="fc-term__n"><span>{pad(i + 1)}</span> / {pad(TERMS.length)}</p>
                <h3 id={`fc-term-${t.id}`} className="fc-term__name">{t.name}</h3>
                <p className="fc-term__body">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="fc-terms__meter" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
]]>
    </file>
  </files>
</template>
