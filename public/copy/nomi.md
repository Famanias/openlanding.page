<template slug="nomi" name="NOMI">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(nomi)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Mono, Instrument_Sans, Schibsted_Grotesk } from "next/font/google";
import "./nomi/nomi.css";

const display = Schibsted_Grotesk({ subsets: ["latin"], weight: "700", variable: "--font-nomi-display" });
const body = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-nomi-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-nomi-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "NOMI — lessons, made lighter.",
  description: "A calm mobile workspace for independent tutoring studios.",
  icons: { icon: "/templates/nomi/icon.svg" },
};

export default function NomiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="nm-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/base.css">
<![CDATA[*, *::before, *::after { box-sizing: border-box; }
html, body { overflow-x: clip; }
html { scrollbar-color: var(--color-muted) var(--color-paper); scroll-padding-top: var(--space-3xl); }
body { margin: 0; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-body); font-size: var(--text-md); line-height: 1.55; -webkit-font-smoothing: antialiased; caret-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); color: var(--color-ink); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 0.16em; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: var(--display-weight, 700); font-synthesis: none; letter-spacing: var(--tracking-display); line-height: 1.05; overflow-wrap: break-word; min-width: 0; text-wrap: balance; }
h1 { max-width: 20ch; font-size: var(--text-display); } h2 { max-width: 30ch; font-size: var(--text-section); } h3 { max-width: 40ch; font-size: var(--text-title); line-height: 1.2; }
.lead { font-size: var(--text-lead); line-height: 1.45; max-width: 52ch; }
p { margin: 0; text-wrap: pretty; }
p:not([class]) { max-width: 65ch; }
img, video { max-width: 100%; height: auto; display: block; }
svg { display: block; }
[hidden] { display: none !important; }
button, input, select, textarea { font: inherit; }
.container { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); box-sizing: border-box; }
.num, .figure, td.num { font-variant-numeric: tabular-nums; }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
[data-slot] { position: relative; overflow: hidden; background: linear-gradient(160deg, var(--color-paper-2, var(--color-paper)), var(--color-paper-3, var(--color-paper))); }
[data-slot] > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
[data-slot]:has(> img) > :not(img):not([data-keep]) { display: none !important; }
@media (max-width: 60rem) { :root { --gutter: 24px; --section-gap-s: 80px; --section-gap: 96px; --section-gap-l: 120px; } }
@media (max-width: 40rem) { :root { --gutter: 16px; --section-gap-s: 56px; --section-gap: 72px; --section-gap-l: 96px; --gap-columns: 16px; } }
@media (prefers-reduced-motion: reduce) { *:not(.keep-motion), *:not(.keep-motion)::before, *:not(.keep-motion)::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }
/* photographs: natural sat=-15 con=-6 */
[data-slot] > img { filter: saturate(0.85) contrast(0.94); }
]]>
    </file>
    <file path="src/app/(nomi)/nomi/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#FAF7EF"/><rect x="13" y="13" width="38" height="38" rx="14" fill="none" stroke="#0C1C16" stroke-width="3"/><circle cx="32" cy="32" r="8" fill="#007948"/></svg>
]]>
    </file>
    <file path="src/app/(nomi)/nomi/nomi.css">
<![CDATA[/* Hallmark · shape: Map / Diagram (draw 69adda; the pinned map leads, rows follow) · genre: modern-minimal · theme: Dose (deal 1/3, seed calm-mobile-workspace-app-39c5·19da969d·2026-10-23·r0) · redesign: full
 * hero: Stage · nav: slab · footer: mast · imagery: the product · signature: pick a moment and a line draws from it to the phone, whose plastic shell takes that moment's tint · dose: white · job: sign up · draw: 69adda
 * axes: light/grotesk-sans/chromatic-green · posture: committed · contrast: pass · fold: pass · v2.0.0 */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · hero-review: in-thread · 3 findings · 3 resolved */
/* Hallmark · finish-review: in-thread · 4 findings · 4 resolved · gap: none */
/* Hallmark · dismissed 25 · the success message is one nine-word sentence inside a form tray, not running prose */
/* Hallmark · answered F7 · the pill radius sits on meters, chips and the nav underline, which are tags and controls, not containers */
/* Hallmark · answered F8 · the header's hairline progress rule is chrome; the page's one choreography is the pinned stage, and the hero lift is the hand-off into it */
@import "tailwindcss";
@import "./tokens.css";
@import "./base.css";

/* ---------------------------------------------------------------- page */

.nm-body {
  min-width: 320px;
  background:
    radial-gradient(ellipse 55% 45% at 18% 12%, var(--glass-glow-amber) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 85% 16%, var(--glass-glow-cyan) 0%, transparent 68%),
    radial-gradient(ellipse 60% 45% at 14% 52%, var(--glass-glow-mint) 0%, transparent 70%),
    radial-gradient(ellipse 55% 40% at 88% 74%, var(--glass-glow-lilac) 0%, transparent 68%),
    radial-gradient(ellipse 45% 35% at 45% 92%, var(--glass-glow-amber) 0%, transparent 70%),
    var(--color-paper) var(--grain);
  background-attachment: fixed;
  overflow-x: clip;
}
.nm-site { position: relative; overflow-x: clip; }
.nm-site > main { position: relative; z-index: 1; }
.nm-mono { font-family: var(--font-outlier); font-variant-numeric: tabular-nums; }
.nm-skip { position: absolute; z-index: var(--z-toast); top: calc(var(--space-3xl) * -1); left: var(--space-md); padding: var(--space-xs) var(--space-md); border-radius: var(--radius-input); background: var(--color-ink); color: var(--color-paper); }
.nm-skip:focus-visible { top: var(--space-md); }

/* ---------------------------------------------------------------- glassmorphic background layer */

.nm-glass-backdrop { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: clip; }

/* 1. Luminous chromatic glass blooms using NOMI's plastic tint tokens */
.nm-glass-blooms { position: absolute; inset: 0; overflow: clip; }
.nm-bloom { position: absolute; border-radius: 50%; filter: blur(48px); opacity: 0.82; transform: translate3d(0, 0, 0); }
.nm-bloom--cyan { top: 4%; left: -4%; width: clamp(340px, 40vw, 620px); height: clamp(340px, 40vw, 620px); background: radial-gradient(circle at 45% 45%, var(--tint-inbox) 0%, var(--glass-glow-cyan) 45%, transparent 72%); }
.nm-bloom--amber { top: 10%; right: -6%; width: clamp(380px, 44vw, 700px); height: clamp(380px, 44vw, 700px); background: radial-gradient(circle at 50% 50%, var(--tint-schedule) 0%, var(--glass-glow-amber) 40%, transparent 70%); }
.nm-bloom--mint { top: 38%; left: -8%; width: clamp(420px, 48vw, 780px); height: clamp(420px, 48vw, 780px); background: radial-gradient(circle at 45% 45%, var(--tint-progress) 0%, var(--glass-glow-mint) 45%, transparent 72%); }
.nm-bloom--lilac { top: 64%; right: -6%; width: clamp(400px, 45vw, 720px); height: clamp(400px, 45vw, 720px); background: radial-gradient(circle at 50% 50%, var(--tint-payments) 0%, var(--glass-glow-lilac) 45%, transparent 70%); }
.nm-bloom--warm { top: 85%; left: 8%; width: clamp(360px, 42vw, 660px); height: clamp(360px, 42vw, 660px); background: radial-gradient(circle at 45% 45%, var(--tint-schedule) 0%, var(--glass-glow-amber) 45%, transparent 72%); }

/* 2. Prismatic daylight refraction shafts */
.nm-glass-caustics { position: absolute; inset: 0; overflow: clip; }
.nm-caustic-beam { position: absolute; background: linear-gradient(135deg, color-mix(in oklab, var(--glint) 85%, transparent) 0%, color-mix(in oklab, var(--glint) 35%, transparent) 40%, transparent 70%); opacity: 0.65; transform: skewX(-16deg); filter: blur(20px); }
.nm-caustic-beam--1 { top: -4%; left: 18%; width: 18%; height: 55%; }
.nm-caustic-beam--2 { top: 32%; right: 12%; width: 22%; height: 48%; }
.nm-caustic-beam--3 { top: 62%; left: 10%; width: 24%; height: 42%; }
.nm-caustic-beam--4 { top: 82%; right: 18%; width: 20%; height: 38%; }

/* 3. Etched architectural glass grid and precision registration marks */
.nm-glass-grid { position: absolute; inset: 0; max-width: var(--container); margin-inline: auto; pointer-events: none; }
.nm-grid-line { position: absolute; background: var(--glass-border-rule); pointer-events: none; }
.nm-grid-line--h1 { top: 16%; left: 0; right: 0; height: 1px; }
.nm-grid-line--h2 { top: 37%; left: 0; right: 0; height: 1px; }
.nm-grid-line--h3 { top: 63%; left: 0; right: 0; height: 1px; }
.nm-grid-line--h4 { top: 85%; left: 0; right: 0; height: 1px; }
.nm-grid-line--v1 { top: 0; bottom: 0; left: var(--gutter); width: 1px; }
.nm-grid-line--v2 { top: 0; bottom: 0; right: var(--gutter); width: 1px; }
.nm-grid-line--v3 { top: 0; bottom: 0; left: 50%; width: 1px; opacity: 0.4; }
.nm-grid-mark { position: absolute; font: 500 12px/1 var(--font-outlier); letter-spacing: 0.08em; color: color-mix(in oklab, var(--color-ink) 55%, transparent); transform: translate(-50%, -50%); user-select: none; }
.nm-grid-mark--1 { top: 16%; left: var(--gutter); }
.nm-grid-mark--2 { top: 37%; right: var(--gutter); }
.nm-grid-mark--3 { top: 63%; left: calc(var(--gutter) + 20%); }
.nm-grid-mark--4 { top: 85%; right: calc(var(--gutter) + 30%); }

/* 4. Layered architectural frosted glass plates, lenses, and floating tablets */
.nm-glass-plates { position: absolute; inset: 0; width: 100%; pointer-events: none; }
.nm-glass-plate { position: absolute; border: 1.5px solid var(--glass-border-strong); border-radius: var(--radius-slab); background: var(--glass-surface); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); box-shadow: var(--glass-shadow-deep); overflow: hidden; pointer-events: none; }
.nm-glass-bevel { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(135deg, color-mix(in oklab, var(--glint) 75%, transparent) 0%, transparent 40%, color-mix(in oklab, var(--glint) 20%, transparent) 100%); pointer-events: none; }
.nm-glass-specular { position: absolute; top: 0; left: 8%; right: 8%; height: 2px; background: linear-gradient(90deg, transparent, var(--glint), transparent); }
.nm-glass-inner-glint { position: absolute; top: -30px; left: -30px; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, color-mix(in oklab, var(--glint) 70%, transparent), transparent 70%); filter: blur(14px); }
.nm-glass-ring { position: absolute; inset: 28px; border-radius: 50%; border: 1.5px dashed color-mix(in oklab, var(--glint) 90%, transparent); opacity: 0.7; }
.nm-glass-plate--hero { top: 90px; right: -4%; width: clamp(340px, 42vw, 620px); height: clamp(340px, 42vw, 620px); border-radius: 50%; border-color: color-mix(in oklab, var(--tint-schedule) 45%, var(--glass-border-strong)); }
.nm-glass-plate--studios { top: 66%; right: -3%; width: clamp(320px, 36vw, 540px); height: clamp(320px, 36vw, 540px); border-radius: 50%; border-color: color-mix(in oklab, var(--tint-progress) 50%, var(--glass-border-strong)); }
.nm-glass-plate--plans { top: 76%; right: -2%; width: clamp(300px, 34vw, 500px); height: clamp(300px, 34vw, 500px); border-radius: 50%; border-color: color-mix(in oklab, var(--tint-payments) 50%, var(--glass-border-strong)); }
.nm-glass-plate--demo { top: 87%; right: -3%; width: clamp(320px, 36vw, 540px); height: clamp(320px, 36vw, 540px); border-radius: 50%; border-color: color-mix(in oklab, var(--tint-schedule) 45%, var(--glass-border-strong)); }

/* A heading word sits in a mask so it can rise into place. */
.nm-w { display: inline-block; overflow: clip; padding: 0.06em 0.04em 0.12em; margin: -0.06em -0.04em -0.12em; vertical-align: top; }
.nm-w > span { display: inline-block; }

/* ---------------------------------------------------------------- controls */

.nm-btn { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-xs); min-height: 52px; padding: 0 var(--space-lg); overflow: hidden; border: 0; border-radius: var(--radius-input); background: var(--light); color: var(--color-ink); font: 500 var(--text-md)/1 var(--font-body); white-space: nowrap; text-decoration: none; cursor: pointer; box-shadow: inset 0 1px 0 var(--glint), 0 0 0 1px var(--color-rule), 0 3px 0 var(--color-rule); transition: transform var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out); }
.nm-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-paper-3); transform: scaleX(0); transform-origin: right; transition: transform var(--dur-short) var(--ease-out); }
.nm-btn svg { flex-shrink: 0; width: 18px; height: 18px; }
.nm-btn:hover::before { transform: scaleX(1); transform-origin: left; }
.nm-btn:active { transform: translateY(3px); box-shadow: inset 0 1px 0 var(--glint), 0 0 0 1px var(--color-rule), 0 0 0 var(--color-rule); }
.nm-btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.nm-btn:disabled, .nm-btn[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; transform: none; }
.nm-btn--primary { background: linear-gradient(var(--color-accent), var(--color-accent-deep)); color: var(--color-accent-ink); box-shadow: inset 0 1px 0 color-mix(in oklab, var(--glint) 40%, transparent), 0 0 0 1px var(--color-accent-deep), 0 3px 0 var(--color-accent-deep); }
.nm-btn--primary::before { background: var(--color-accent-deep); }
.nm-btn--primary:active { box-shadow: inset 0 1px 0 color-mix(in oklab, var(--glint) 40%, transparent), 0 0 0 1px var(--color-accent-deep), 0 0 0 var(--color-accent-deep); }
.nm-btn--sm { min-height: 44px; padding: 0 var(--space-md); font-size: var(--text-sm); }

/* ---------------------------------------------------------------- header: a slab that hides on the way down */

.nm-header { position: fixed; inset: 0 0 auto; z-index: var(--z-sticky-nav); height: var(--nm-header-h); border-bottom: 1px solid var(--glass-border-rule); background: var(--glass-surface-frosted); backdrop-filter: var(--glass-blur-md) saturate(140%); -webkit-backdrop-filter: var(--glass-blur-md) saturate(140%); box-shadow: 0 4px 20px -8px oklch(21% 0.025 170 / 0.06); transition: transform var(--dur-long) var(--ease-out); }
.nm-header::before { content: ""; position: absolute; inset: 100% 0 auto; height: var(--space-lg); background: linear-gradient(color-mix(in oklab, var(--color-ink) 8%, transparent), transparent); opacity: 0; pointer-events: none; transition: opacity var(--dur-short) var(--ease-out); }
.nm-header[data-scrolled="true"]::before { opacity: 1; }
.nm-header[data-hidden="true"]::before { opacity: 0; }
.nm-header[data-hidden="true"] { transform: translateY(-100%); }
.nm-header::after { content: ""; position: absolute; inset: auto 0 -1px; height: 2px; background: var(--color-accent); transform: scaleX(0); transform-origin: left; }
.nm-header-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-lg); height: 100%; }
.nm-home-link { display: inline-flex; border-radius: var(--radius-input); text-decoration: none; }

.nm-logo { display: inline-flex; align-items: center; gap: var(--space-xs); color: var(--color-ink); }
.nm-logo svg { flex-shrink: 0; width: 28px; height: 28px; }
.nm-logo b { font: 700 1.25rem/1 var(--font-display); letter-spacing: -0.05em; }

.nm-nav { position: relative; display: flex; gap: var(--space-xl); }
.nm-nav a { position: relative; display: inline-flex; align-items: center; min-height: 44px; color: var(--color-ink-2); font: 500 var(--text-sm)/1 var(--font-body); text-decoration: none; transition: color var(--dur-short) var(--ease-out); }
.nm-nav a::after { content: ""; position: absolute; inset: auto 0 var(--space-xs); height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-short) var(--ease-out); }
.nm-nav a:hover { color: var(--color-ink); }
.nm-nav a:hover::after { transform: scaleX(1); transform-origin: left; }
.nm-nav a[aria-current="true"] { color: var(--color-ink); }
.nm-nav-ink { position: absolute; left: 0; bottom: var(--space-2xs); width: 100px; height: 3px; border-radius: var(--radius-pill); background: var(--color-accent); transform: translateX(var(--x, 0px)) scaleX(var(--s, 0)); transform-origin: left; transition: transform var(--dur-long) var(--ease-out), opacity var(--dur-short) var(--ease-out); pointer-events: none; }
.js .nm-nav-ink { opacity: 0; }
.js .nm-nav[data-on="true"] .nm-nav-ink { opacity: 1; }

/* ---------------------------------------------------------------- hero: the four moments as plastic cards */

.nm-hero { position: relative; display: grid; align-items: center; min-height: 100dvh; padding-block: calc(var(--nm-header-h) + var(--space-lg)) var(--space-xl); overflow: clip; }
.nm-hero-light { position: absolute; inset: 0; pointer-events: none; }
.nm-hero-light i { position: absolute; top: -10%; bottom: -10%; background: var(--light); opacity: 0.7; transform: skewX(-14deg); filter: blur(22px); }
.nm-hero-light i:nth-child(1) { left: 36%; width: 7%; }
.nm-hero-light i:nth-child(2) { left: 49%; width: 4%; }
.nm-hero-light i:nth-child(3) { left: 58%; width: 12%; }
.nm-hero-light i:nth-child(4) { left: 78%; width: 5%; }
.nm-hero-grid { position: relative; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: center; gap: var(--space-2xl); }
.nm-hero-copy { display: grid; justify-items: start; gap: var(--space-lg); }
.nm-hero-copy h1 { max-width: 12ch; }
.nm-hero-lead { max-width: 30ch; color: var(--color-ink-2); }
.nm-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-md); margin-top: var(--space-sm); }

.nm-board { --pad: var(--space-lg); --step: 116px; --card-h: 150px; position: relative; height: calc(var(--pad) * 2 + var(--step) * 3 + var(--card-h)); border-radius: var(--radius-slab); background: color-mix(in oklab, var(--light) 58%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint), inset 0 -28px 48px -36px color-mix(in oklab, var(--color-accent) 24%, transparent), 0 32px 64px -20px oklch(21% 0.025 170 / 0.12); }
.nm-stack { margin: 0; padding: 0; list-style: none; }
.nm-card { position: absolute; top: calc(var(--pad) + var(--i) * var(--step)); left: calc(var(--pad) + var(--dx)); z-index: calc(var(--i) + 1); width: 78%; height: var(--card-h); transform: rotate(var(--r)); }
.nm-card:nth-child(1) { --dx: 0%; --r: -1.5deg; }
.nm-card:nth-child(2) { --dx: 7%; --r: 1.2deg; }
.nm-card:nth-child(3) { --dx: 2%; --r: -1deg; }
.nm-card:nth-child(4) { --dx: 9%; --r: 1.6deg; }
.nm-card[data-scene="inbox"] { --t: var(--tint-inbox); }
.nm-card[data-scene="schedule"] { --t: var(--tint-schedule); }
.nm-card[data-scene="progress"] { --t: var(--tint-progress); }
.nm-card[data-scene="payments"] { --t: var(--tint-payments); }
.nm-card-face { position: relative; display: grid; align-content: start; gap: var(--space-sm); height: 100%; padding: var(--space-md) var(--space-lg); border-radius: var(--radius-card); background: linear-gradient(135deg, color-mix(in oklab, var(--glint) 55%, transparent) 0%, transparent 28%), color-mix(in oklab, var(--t) 70%, var(--light)); backdrop-filter: var(--glass-blur-sm); -webkit-backdrop-filter: var(--glass-blur-sm); border: 1.5px solid color-mix(in oklab, var(--glint) 70%, transparent); color: var(--color-ink); text-decoration: none; box-shadow: inset 0 1.5px 0 var(--glint), inset 0 -24px 36px -28px color-mix(in oklab, var(--t) 50%, var(--color-ink)), 0 22px 30px -20px color-mix(in oklab, var(--t) 80%, var(--color-ink)); transition: transform var(--dur-short) var(--ease-out); }
.nm-card-face:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.nm-card-top { display: flex; align-items: center; gap: var(--space-xs); font-size: var(--text-sm); }
.nm-card-top svg { flex-shrink: 0; width: 20px; height: 20px; }
.nm-card-top b { font-weight: 500; }
.nm-card-cue { margin-left: auto; color: var(--color-ink-2); }
.nm-card-main { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); }
.nm-card-main strong { font: 700 var(--text-xl)/1.1 var(--font-display); letter-spacing: var(--tracking-display); text-wrap: balance; }

.nm-faces { display: inline-flex; flex-shrink: 0; }
.nm-faces i { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--light); box-shadow: 0 0 0 2px color-mix(in oklab, var(--t) 74%, var(--light)); font: 500 var(--text-xs)/1 var(--font-body); font-style: normal; }
.nm-faces i + i { margin-left: calc(var(--space-xs) * -1); }
.nm-days { display: inline-flex; flex-shrink: 0; gap: var(--space-2xs); }
.nm-days i { display: grid; place-items: center; width: 26px; height: 34px; border-radius: var(--radius-input); background: color-mix(in oklab, var(--light) 70%, transparent); font: 500 var(--text-xs)/1 var(--font-body); font-style: normal; }
.nm-days i[data-on="true"] { background: var(--color-ink); color: var(--color-paper); }
.nm-mini-ring { flex-shrink: 0; width: 44px; height: 44px; }
.nm-stamp { display: inline-grid; flex-shrink: 0; place-items: center; padding: var(--space-2xs) var(--space-sm); border: 2px solid var(--color-accent-deep); border-radius: var(--radius-input); outline: 1px solid var(--color-accent-deep); outline-offset: 2px; color: var(--color-accent-deep); font: 500 var(--text-sm)/1.2 var(--font-body); transform: rotate(-3deg); }

.nm-ring-track, .nm-ring-fill { fill: none; stroke-width: 5; }
.nm-ring-track { stroke: color-mix(in oklab, var(--color-ink) 12%, transparent); }
.nm-ring-fill { stroke: var(--color-accent); stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0.28; transform: rotate(-90deg); transform-origin: center; transform-box: fill-box; }

/* ---------------------------------------------------------------- launch: a pinned stage, a rail of moments and one phone */

.nm-launch { position: relative; height: calc((var(--count) + 0.5) * 100dvh); background: color-mix(in oklab, var(--color-paper-2) 42%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border-top: 1.5px solid var(--glass-border-strong); border-bottom: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint), inset 0 -2px 0 var(--glint); }
.nm-stage { --nm-t: var(--tint-inbox); position: sticky; top: 0; display: grid; align-items: stretch; height: 100dvh; padding-block: var(--space-2xl) var(--space-xl); transition: --nm-t var(--dur-slow) var(--ease-in-out); }
.nm-stage[data-scene="inbox"] { --nm-t: var(--tint-inbox); }
.nm-stage[data-scene="schedule"] { --nm-t: var(--tint-schedule); }
.nm-stage[data-scene="progress"] { --nm-t: var(--tint-progress); }
.nm-stage[data-scene="payments"] { --nm-t: var(--tint-payments); }
.nm-stage-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); align-items: center; gap: var(--nm-wire); height: 100%; min-height: 0; }
.nm-stage-side { display: grid; justify-items: start; gap: var(--space-md); }
.nm-stage-side h2 { max-width: 11ch; }
.nm-stage-side .lead { max-width: 28ch; color: var(--color-ink-2); font-size: var(--text-md); }

.nm-rail { position: relative; align-self: stretch; width: 100%; margin-top: var(--space-md); }
.nm-rail ol { margin: 0; padding: 0; list-style: none; counter-reset: nm; }
.nm-rail li { position: relative; display: flex; align-items: center; height: var(--nm-row); counter-increment: nm; }
.nm-rail li::before, .nm-rail li::after { content: ""; position: absolute; left: 100%; top: calc(50% - 5px); width: var(--nm-wire); height: 10px; pointer-events: none; }
.nm-rail li::before { background: repeating-linear-gradient(90deg, var(--color-rule) 0 6px, transparent 6px 12px) center / 100% 2px no-repeat; }
.nm-rail li::after { background: radial-gradient(circle at calc(100% - 5px) 50%, var(--color-accent) 0 5px, transparent 5.5px), linear-gradient(var(--color-accent), var(--color-accent)) center / 100% 2px no-repeat; transform: scaleX(0); transform-origin: left; transition: transform var(--dur-long) var(--ease-in-out); }
.nm-rail li[data-on="true"]::after { transform: scaleX(1); }
.nm-rail-pill { position: absolute; inset: 0 0 auto; height: var(--nm-btn); border-radius: var(--radius-input); background: color-mix(in oklab, var(--nm-t) 82%, var(--light)); box-shadow: inset 0 1.5px 0 var(--glint), inset 0 -14px 20px -16px color-mix(in oklab, var(--nm-t) 60%, var(--color-ink)); transform: translateY(calc(var(--active) * var(--nm-row) + (var(--nm-row) - var(--nm-btn)) / 2)); transition: transform var(--dur-long) var(--ease-in-out); }
.nm-node { position: relative; z-index: 1; display: flex; align-items: center; gap: var(--space-md); width: 100%; height: var(--nm-btn); padding: 0 var(--space-md); border: 0; border-radius: var(--radius-input); background: none; color: var(--color-ink-2); font: 500 var(--text-lg)/1 var(--font-body); text-align: left; cursor: pointer; transition: color var(--dur-short) var(--ease-out), transform var(--dur-micro) var(--ease-out); }
.nm-node::before { content: counter(nm, decimal-leading-zero); width: 1.75rem; font: 400 var(--text-sm)/1 var(--font-outlier); font-variant-numeric: tabular-nums; }
.nm-node svg { flex-shrink: 0; width: 22px; height: 22px; }
.nm-node:hover { color: var(--color-ink); }
.nm-node:active { transform: translateY(2px); }
.nm-node:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.nm-node[aria-pressed="true"] { color: var(--color-ink); }

.nm-band { position: relative; display: grid; place-items: center; height: 100%; min-height: 0; overflow: clip; border-radius: var(--radius-slab); background: color-mix(in oklab, var(--nm-t) 42%, var(--light)); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint), inset 0 -48px 72px -56px color-mix(in oklab, var(--nm-t) 60%, var(--color-ink)), 0 36px 64px -24px color-mix(in oklab, var(--nm-t) 40%, var(--color-ink)); }
.nm-light { position: absolute; inset: 0; pointer-events: none; }
.nm-light i { position: absolute; top: -10%; bottom: -10%; background: var(--light); opacity: 0.45; transform: skewX(-14deg); filter: blur(22px); }
.nm-light i:nth-child(1) { left: 6%; width: 9%; }
.nm-light i:nth-child(2) { left: 22%; width: 5%; }
.nm-light i:nth-child(3) { left: 70%; width: 14%; }

.nm-phone { position: relative; height: min(calc(100% - var(--space-xl)), 660px); max-height: 100%; aspect-ratio: 300 / 620; padding: var(--space-xs); border-radius: var(--radius-device); background: linear-gradient(color-mix(in oklab, var(--glint) 34%, transparent), transparent 16%), color-mix(in oklab, var(--nm-t) 84%, var(--color-ink)); box-shadow: inset 0 2px 0 var(--glint), inset 0 -28px 40px -30px color-mix(in oklab, var(--nm-t) 40%, var(--color-ink)), 0 44px 56px -32px color-mix(in oklab, var(--nm-t) 80%, var(--color-ink)); transform: perspective(1600px) rotateY(calc(-9deg + var(--active) * 3deg)) rotateX(3deg); transition: transform var(--dur-slow) var(--ease-out); }
.nm-screen { display: flex; flex-direction: column; height: 100%; padding: var(--space-md) var(--space-md) var(--space-sm); overflow: hidden; border-radius: calc(var(--radius-device) - var(--space-xs)); background: var(--light); }
.nm-status { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; margin-bottom: var(--space-sm); font-size: var(--text-xs); }
.nm-status i { width: 76px; height: 22px; border-radius: var(--radius-pill); background: var(--color-ink); }
.nm-status svg { justify-self: end; width: 22px; height: 11px; }
.nm-appbar { display: flex; align-items: center; justify-content: space-between; font: 700 var(--text-lg)/1 var(--font-display); letter-spacing: -0.05em; }
.nm-greet { margin-top: var(--space-md); color: var(--color-muted); font-size: var(--text-xs); }
.nm-scenes { position: relative; flex: 1; min-height: 0; margin-top: var(--space-2xs); overflow: clip; }
.nm-scene { position: absolute; inset: 0; transition: opacity var(--dur-long) var(--ease-out), transform var(--dur-long) var(--ease-out), visibility 0s linear var(--dur-long); }
html:not(.js) .nm-scene:not([data-active="true"]) { display: none; }
.js .nm-scene:not([data-active="true"]) { visibility: hidden; opacity: 0; transform: translateY(calc(clamp(-1, var(--k), 1) * 14px)); }
.nm-scene[data-active="true"] { transition-delay: 0s; }
.nm-scene-title { font: 700 var(--text-2xl)/1.05 var(--font-display); letter-spacing: var(--tracking-display); }
.nm-scene-cue { margin-top: var(--space-2xs); color: var(--color-ink-2); font-size: var(--text-sm); }

.nm-avatar { display: inline-grid; flex-shrink: 0; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: color-mix(in oklab, var(--tint-inbox) 76%, var(--light)); font: 500 var(--text-xs)/1 var(--font-body); }
.nm-threads { display: grid; gap: var(--space-2xs); margin: var(--space-md) 0 0; padding: 0; list-style: none; }
.nm-threads li { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) 0; border-bottom: 1px solid var(--color-rule); font-size: var(--text-xs); color: var(--color-ink-2); }
.nm-threads li:last-child { border-bottom: 0; }
.nm-threads b { display: block; color: var(--color-ink); font-size: var(--text-sm); font-weight: 500; }
.nm-week { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--space-2xs); margin-top: var(--space-md); }
.nm-week span { padding: var(--space-xs) 0; border-radius: var(--radius-input); background: var(--color-paper-2); text-align: center; font-size: var(--text-xs); }
.nm-week span[data-on="true"] { background: var(--color-ink); color: var(--color-paper); }
.nm-slots { display: grid; gap: var(--space-xs); margin: var(--space-sm) 0 0; padding: 0; list-style: none; }
.nm-slots li { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); border-radius: var(--radius-input); background: color-mix(in oklab, var(--tint-schedule) 80%, var(--light)); font-size: var(--text-sm); }
.nm-slots li[data-free="true"] { border: 1px dashed var(--color-muted); background: none; color: var(--color-ink-2); }
.nm-slots b { font-weight: 500; }
.nm-slots .nm-mono { font-size: var(--text-xs); }
.nm-ring { position: relative; display: grid; place-items: center; width: 116px; height: 116px; margin: var(--space-md) 0; }
.nm-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.nm-ring b { font-size: var(--text-lg); font-weight: 500; }
.nm-scene .nm-ring-fill { stroke-dashoffset: 1; transition: stroke-dashoffset var(--dur-slow) var(--ease-out) var(--dur-short); }
.nm-scene[data-active="true"] .nm-ring-fill { stroke-dashoffset: 0.28; }
.nm-skills { display: grid; gap: var(--space-md); margin: 0; padding: 0; list-style: none; font-size: var(--text-xs); }
.nm-skills li { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: center; }
.nm-skills i { display: block; height: 6px; border-radius: var(--radius-pill); background: color-mix(in oklab, var(--color-ink) 10%, transparent); }
.nm-skills i::after { content: ""; display: block; height: 100%; border-radius: inherit; background: var(--color-accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-slow) var(--ease-out) var(--dur-short); }
.nm-scene[data-active="true"] .nm-skills i::after { transform: scaleX(var(--v)); }
.nm-ledger { display: grid; gap: var(--space-xs); margin: var(--space-md) 0 0; padding: 0; list-style: none; }
.nm-ledger li { display: flex; align-items: center; justify-content: space-between; gap: var(--space-sm); padding: var(--space-md); border-radius: var(--radius-input); background: color-mix(in oklab, var(--tint-payments) 56%, var(--light)); color: var(--color-ink-2); font-size: var(--text-xs); }
.nm-ledger b { display: block; color: var(--color-ink); font-size: var(--text-sm); font-weight: 500; }
.nm-ledger em { padding: var(--space-3xs) var(--space-sm); border-radius: var(--radius-pill); background: var(--color-accent-soft); color: var(--color-accent-deep); font-style: normal; font-weight: 500; }

.nm-app-card { margin-top: var(--space-sm); padding: var(--space-md); border-radius: var(--radius-card); background: color-mix(in oklab, var(--nm-t) 62%, var(--light)); box-shadow: inset 0 1.5px 0 var(--glint), inset 0 -14px 18px -14px color-mix(in oklab, var(--nm-t) 60%, var(--color-ink)); }
.nm-app-card strong { display: block; font: 700 var(--text-lg)/1.1 var(--font-display); letter-spacing: var(--tracking-display); }
.nm-pips { display: flex; gap: var(--space-2xs); margin-top: var(--space-sm); }
.nm-pips i { flex: 1; height: 4px; border-radius: var(--radius-pill); background: color-mix(in oklab, var(--color-ink) 16%, transparent); transition: background-color var(--dur-short) var(--ease-out); }
.nm-pips i[data-on="true"] { background: var(--color-accent); }
.nm-home { width: 36%; height: 4px; margin: var(--space-sm) auto 0; border-radius: var(--radius-pill); background: var(--color-ink); }

/* ---------------------------------------------------------------- studios: three promises as rows */

.nm-studios { padding-block: var(--section-gap); }
.nm-studios h2 { max-width: 14ch; }
.nm-rows { margin: var(--space-2xl) 0 0; padding: 0; list-style: none; }
.nm-row { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); align-items: center; column-gap: var(--gap-columns); padding-block: var(--space-xl); }
.nm-row::before { content: ""; position: absolute; inset: 0 0 auto; height: 1px; background: var(--color-rule); transform-origin: left; }
.nm-row:last-child::after { content: ""; position: absolute; inset: auto 0 0; height: 1px; background: var(--color-rule); transform-origin: left; }
.nm-row h3 { grid-column: 1 / 6; }
.nm-row p { grid-column: 6 / 10; color: var(--color-ink-2); }
.nm-row[data-scene="schedule"] { --t: var(--tint-schedule); }
.nm-row[data-scene="progress"] { --t: var(--tint-progress); }
.nm-row[data-scene="payments"] { --t: var(--tint-payments); }
.nm-row h3 { font-size: clamp(1.75rem, 1.2vw + 1.25rem, 2.5rem); }
.nm-panel { display: grid; grid-column: 10 / 13; gap: var(--space-sm); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-card); background: linear-gradient(135deg, color-mix(in oklab, var(--glint) 65%, transparent), transparent 30%), color-mix(in oklab, var(--t) 45%, var(--light)); backdrop-filter: var(--glass-blur-sm); -webkit-backdrop-filter: var(--glass-blur-sm); border: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 1.5px 0 var(--glint), inset 0 -18px 26px -22px color-mix(in oklab, var(--t) 45%, var(--color-ink)), 0 18px 30px -16px color-mix(in oklab, var(--t) 60%, var(--color-ink)); font-size: var(--text-sm); }
.nm-panel-head { display: flex; align-items: center; gap: var(--space-xs); font-weight: 500; }
.nm-panel-head svg { width: 20px; height: 20px; }
.nm-panel-line { display: flex; align-items: center; gap: var(--space-sm); }
.nm-panel-line em { margin-left: auto; padding: var(--space-3xs) var(--space-sm); border-radius: var(--radius-pill); background: var(--light); font-size: var(--text-xs); font-style: normal; font-weight: 500; }
.nm-bar { display: block; flex: 1; height: 6px; border-radius: var(--radius-pill); background: color-mix(in oklab, var(--color-ink) 12%, transparent); }
.nm-bar::after { content: ""; display: block; height: 100%; border-radius: inherit; background: var(--color-accent); transform: scaleX(var(--v)); transform-origin: left; }

/* ---------------------------------------------------------------- plans: one offer */

.nm-plans { padding-block: var(--section-gap-s); background: color-mix(in oklab, var(--color-paper-2) 42%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border-top: 1.5px solid var(--glass-border-strong); border-bottom: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint), inset 0 -2px 0 var(--glint); }
.nm-plans-grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); align-items: center; gap: var(--space-2xl); }
.nm-plans-copy { display: grid; justify-items: start; gap: var(--space-lg); }
.nm-plans-copy .lead { color: var(--color-ink-2); }
.nm-offer { position: relative; display: grid; border-radius: var(--radius-card); background: color-mix(in oklab, var(--light) 75%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border: 1.5px solid var(--glass-border-strong); box-shadow: var(--shadow-lift); }
.nm-offer-main { padding: var(--space-xl); }
.nm-offer h3 { font-size: var(--text-xl); }
.nm-price { display: grid; gap: var(--space-2xs); margin-top: var(--space-md); }
.nm-price strong { font: 700 clamp(4.5rem, 7vw, 6.5rem)/1 var(--font-display); letter-spacing: var(--tracking-display); }
.nm-price span { color: var(--color-muted); }
.nm-checks { display: grid; gap: var(--space-sm); margin: var(--space-lg) 0 0; padding: 0; list-style: none; }
.nm-checks li { display: flex; align-items: center; gap: var(--space-sm); }
.nm-checks svg { flex-shrink: 0; width: 20px; height: 20px; color: var(--color-accent); }
.nm-checks path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.nm-offer-stub { position: relative; padding: var(--space-lg) var(--space-xl) var(--space-xl); border-top: 2px dashed var(--color-rule); }
.nm-offer-stub::before, .nm-offer-stub::after { content: ""; position: absolute; top: -13px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-paper-2); }
.nm-offer-stub::before { left: -12px; }
.nm-offer-stub::after { right: -12px; }
.nm-offer-stub .nm-btn { width: 100%; }

/* ---------------------------------------------------------------- demo: a form on a tray, with a label that answers live */

.nm-demo { padding-block: var(--section-gap); }
.nm-demo-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); align-items: center; gap: var(--space-3xl); }
.nm-demo-copy { display: grid; justify-items: start; gap: var(--space-lg); }
.nm-demo-copy .lead { color: var(--color-ink-2); }
.nm-facts { display: grid; gap: var(--space-xs); margin: 0; padding: 0; list-style: none; font-weight: 500; }
.nm-form-wrap { position: relative; padding-top: var(--space-lg); }
.nm-tag { position: absolute; z-index: 2; top: 0; right: var(--space-lg); display: grid; gap: var(--space-3xs); min-width: 13rem; max-width: 80%; padding: var(--space-sm) var(--space-md); border-radius: var(--radius-input); background: var(--light); box-shadow: var(--shadow-card); font-size: var(--text-sm); transform: rotate(2deg); }
.nm-tag b { overflow: hidden; font: 700 var(--text-md)/1.2 var(--font-display); text-overflow: ellipsis; white-space: nowrap; }
.nm-tag span { overflow: hidden; color: var(--color-ink-2); text-overflow: ellipsis; white-space: nowrap; }
.nm-tag em { justify-self: start; padding: var(--space-3xs) var(--space-sm); border-radius: var(--radius-pill); background: color-mix(in oklab, var(--color-ink) 8%, transparent); color: var(--color-muted); font-size: var(--text-xs); font-style: normal; transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out); }
.nm-tag em[data-on="true"] { background: var(--color-accent-soft); color: var(--color-accent-deep); }
.nm-tray { padding: var(--space-xl); border-radius: var(--radius-slab); background: color-mix(in oklab, var(--light) 58%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint), 0 28px 56px -20px oklch(21% 0.025 170 / 0.12); }
.nm-form { display: grid; }
.nm-form > * { grid-area: 1 / 1; }
.nm-fields { display: grid; gap: var(--space-md); padding-top: var(--space-lg); transition: opacity var(--dur-long) var(--ease-out), transform var(--dur-long) var(--ease-out); }
.js .nm-fields[inert] { opacity: 0; transform: translateY(-8px); }
.nm-form label { display: grid; gap: var(--space-xs); font-size: var(--text-sm); font-weight: 500; }
.nm-form input, .nm-form select { width: 100%; min-height: 52px; padding: 0 var(--space-md); border: 1px solid var(--color-muted); border-radius: var(--radius-input); outline: 2px solid transparent; outline-offset: -3px; background: var(--light); color: var(--color-ink); font: 400 var(--text-md) var(--font-body); }
.nm-form input::placeholder { color: var(--color-muted); }
.nm-form input:focus-visible, .nm-form select:focus-visible { outline-color: var(--color-focus); }
.nm-form input[aria-invalid="true"] { border-color: var(--color-error); }
.nm-form input.is-shake { animation: nm-shake var(--dur-long) var(--ease-out); }
.nm-form select:invalid { color: var(--color-muted); }
.nm-field { display: grid; gap: var(--space-2xs); }
.nm-help { min-height: 1lh; color: var(--color-error); font-size: var(--text-sm); transition: opacity var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out); }
.js .nm-help:not([data-on="true"]) { opacity: 0; transform: translateY(-4px); }
.nm-form .nm-btn { margin-top: var(--space-xs); }
.nm-success { display: grid; align-content: center; justify-items: center; gap: var(--space-sm); padding: var(--space-xl) 0; text-align: center; transition: opacity var(--dur-long) var(--ease-out) var(--dur-short), transform var(--dur-long) var(--ease-out) var(--dur-short), visibility 0s linear var(--dur-long); }
html:not(.js) .nm-success { display: none; }
.js .nm-success:not([data-on="true"]) { visibility: hidden; opacity: 0; transform: translateY(12px); }
.nm-success[data-on="true"] { transition-delay: var(--dur-short), var(--dur-short), 0s; }
.nm-success h3 { font-size: var(--text-2xl); }
.nm-success p { max-width: 32ch; color: var(--color-ink-2); }
.nm-check { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: var(--color-accent); color: var(--color-accent-ink); }
.nm-check svg { width: 26px; height: 26px; }
.nm-check path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset var(--dur-long) var(--ease-out) calc(var(--dur-short) + 160ms); }
.nm-success[data-on="true"] .nm-check path { stroke-dashoffset: 0; }

/* ---------------------------------------------------------------- footer: the mast */

.nm-footer { padding-block: var(--section-gap-s) var(--space-xl); background: color-mix(in oklab, var(--color-paper-3) 50%, transparent); backdrop-filter: var(--glass-blur-md); -webkit-backdrop-filter: var(--glass-blur-md); border-top: 1.5px solid var(--glass-border-strong); box-shadow: inset 0 2px 0 var(--glint); }
.nm-mast { padding-bottom: var(--space-xl); }
.nm-logo--mast { gap: var(--space-md); }
.nm-logo--mast svg { width: clamp(56px, 9vw, 128px); height: auto; }
.nm-logo--mast b { font-size: clamp(5rem, 18vw, 16rem); line-height: 0.8; letter-spacing: -0.06em; }
.nm-footer-base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-lg); padding-top: var(--space-lg); border-top: 1px solid var(--color-rule); }
.nm-footer ul { display: flex; flex-wrap: wrap; gap: var(--space-xs) var(--space-lg); margin: 0; padding: 0; list-style: none; }
.nm-footer a { display: inline-flex; align-items: center; min-height: 44px; text-decoration: none; background: linear-gradient(currentColor, currentColor) left bottom / 0 1px no-repeat; }
.nm-footer a:hover { text-decoration: underline; }
.nm-footer p { color: var(--color-ink-2); font-size: var(--text-sm); }

/* ---------------------------------------------------------------- motion: arrivals (self-running, so they play before any script) */

@keyframes nm-down { from { transform: translateY(-100%); } to { transform: none; } }
@keyframes nm-word { from { transform: translateY(112%); } to { transform: none; } }
@keyframes nm-rise { from { opacity: 0; transform: translateY(var(--reveal-shift)); } to { opacity: 1; transform: none; } }
@keyframes nm-drop { from { opacity: 0; transform: translateY(44px) rotate(calc(var(--r) + 4deg)); } to { opacity: 1; transform: rotate(var(--r)); } }
@keyframes nm-stamp { from { opacity: 0; transform: rotate(-12deg) scale(1.5); } to { opacity: 1; transform: rotate(-3deg); } }
@keyframes nm-sheet { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes nm-ring { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0.28; } }
@keyframes nm-shake { 0%, 100% { transform: none; } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
@keyframes nm-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes nm-away { to { opacity: 0.2; transform: translateY(-56px) scale(0.97); } }

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
  .nm-header { animation: nm-down var(--dur-long) var(--ease-out) backwards; }
  .nm-hero h1 .nm-w > span { animation: nm-word var(--dur-hero) var(--ease-out) backwards; animation-delay: calc(160ms + var(--i) * 70ms); }
  .nm-hero-lead { animation: nm-rise var(--dur-slow) var(--ease-out) backwards; animation-delay: 620ms; }
  .nm-actions { animation: nm-rise var(--dur-slow) var(--ease-out) backwards; animation-delay: 740ms; }
  .nm-card { animation: nm-drop var(--dur-hero) var(--ease-out) backwards; animation-delay: calc(420ms + var(--i) * 140ms); }
  .nm-card .nm-stamp { animation: nm-stamp var(--dur-long) var(--ease-out) backwards; animation-delay: 1500ms; }
  .nm-card .nm-ring-fill { animation: nm-ring var(--dur-hero) var(--ease-out) backwards; animation-delay: 1100ms; }
  .nm-app-card { animation: nm-sheet var(--dur-long) var(--ease-out) backwards; }

  .nm-card-face:hover { transform: translateY(-8px); }

  /* arrivals tied to the scroll position, where the browser supports it */
  @supports (animation-timeline: view()) {
    .nm-header::after { animation: nm-grow linear both; animation-timeline: scroll(root); }
    .nm-hero-copy, .nm-board { animation: nm-away linear both; animation-timeline: view(); animation-range: exit 20% exit 100%; }
  }

  /* reveals on scroll: hidden only when the script is running, then shown once */
  .js [data-nm-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out); }
  .js [data-nm-reveal="mask"] .nm-w > span { transition: transform var(--dur-slow) var(--ease-out); transition-delay: calc(var(--i) * 60ms); }
  .js [data-nm-reveal="mask"]:not([data-in="true"]) .nm-w > span { transform: translateY(112%); }
  .js [data-nm-reveal="rise"]:not([data-in="true"]) { opacity: 0; transform: translateY(var(--reveal-shift)); }
  .js [data-nm-reveal="rise"] { transition-delay: 220ms; }
  .js [data-nm-reveal="stagger"] > * { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out); transition-delay: calc(var(--i, 0) * var(--stagger)); }
  .js [data-nm-reveal="stagger"]:not([data-in="true"]) > * { opacity: 0; transform: translateY(var(--reveal-shift)); }
  .js [data-nm-reveal="stagger"] .nm-row::before, .js [data-nm-reveal="stagger"] .nm-row::after { transition: transform var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--i, 0) * var(--stagger)); }
  .js [data-nm-reveal="stagger"]:not([data-in="true"]) .nm-row::before, .js [data-nm-reveal="stagger"]:not([data-in="true"]) .nm-row::after { transform: scaleX(0); }
  /* the wipe clips the child, never the observed element: an observer ignores a fully clipped target */
  .js [data-nm-reveal="wipe"] > * { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out); }
  .js [data-nm-reveal="wipe"]:not([data-in="true"]) > :not(.nm-tag) { opacity: 0; transform: translateY(var(--reveal-shift)); clip-path: inset(0 0 100% 0); }
  .js [data-nm-reveal="wipe"][data-in="true"] > :not(.nm-tag) { clip-path: inset(-80px); }
  .js [data-nm-reveal="wipe"] > .nm-tag { transition: opacity var(--dur-slow) var(--ease-out) 360ms, transform var(--dur-slow) var(--ease-out) 360ms; }
  .js [data-nm-reveal="wipe"]:not([data-in="true"]) > .nm-tag { opacity: 0; transform: translateY(calc(var(--reveal-shift) * -1)) rotate(2deg); }
  .js .nm-row .nm-bar::after { transition: transform var(--dur-slow) var(--ease-out); transition-delay: calc(320ms + var(--i, 0) * var(--stagger)); }
  .js [data-nm-reveal="stagger"]:not([data-in="true"]) .nm-bar::after { transform: scaleX(0); }
  .js .nm-checks path { transition: stroke-dashoffset var(--dur-long) var(--ease-out); transition-delay: calc(360ms + var(--i, 0) * 120ms); }
  .js .nm-offer-wrap:not([data-in="true"]) .nm-checks path { stroke-dashoffset: 1; }
}

/* ---------------------------------------------------------------- narrow screens */

@media (max-width: 60rem) {
  .nm-nav { display: none; }
  .nm-hero { min-height: 0; padding-block: calc(var(--nm-header-h) + var(--space-xl)) var(--space-2xl); }
  .nm-hero-grid, .nm-plans-grid, .nm-demo-grid { grid-template-columns: minmax(0, 1fr); gap: var(--space-xl); }
  .nm-hero-copy h1 { max-width: 14ch; }
  .nm-board { --step: 108px; --card-h: 146px; }
  .nm-launch { height: auto; padding-block: var(--section-gap-s); }
  .nm-stage { position: static; height: auto; padding-block: 0; }
  .nm-stage-grid { grid-template-columns: minmax(0, 1fr); gap: var(--space-xl); height: auto; }
  .nm-stage-side h2, .nm-stage-side .lead { max-width: 28ch; }
  .nm-rail { order: 2; margin-top: 0; }
  .nm-rail ol { display: flex; gap: var(--space-xs); overflow-x: auto; padding-bottom: var(--space-xs); }
  .nm-rail li { flex: 0 0 auto; height: 52px; }
  .nm-rail li::before, .nm-rail li::after, .nm-rail-pill { display: none; }
  .nm-node { gap: var(--space-xs); padding: 0 var(--space-md); border-radius: var(--radius-pill); background: color-mix(in oklab, var(--nm-t) 24%, transparent); }
  .nm-node::before { display: none; }
  .nm-node[aria-pressed="true"] { background: color-mix(in oklab, var(--nm-t) 82%, var(--light)); }
  .nm-stage-grid > .nm-band { order: 1; height: auto; padding-block: var(--space-xl); }
  .nm-stage-side { display: contents; }
  .nm-stage-side h2 { order: 0; }
  .nm-phone { height: 620px; max-height: none; transform: none; }
  .nm-row { row-gap: var(--space-sm); }
  .nm-row h3, .nm-row p, .nm-panel { grid-column: 1 / -1; }
  .nm-panel { max-width: 22rem; }
  .nm-tag { right: var(--space-md); }
  .nm-offer-main, .nm-tray { padding: var(--space-lg); }
  .nm-offer-stub { padding: var(--space-lg); }
}

@media (max-width: 40rem) {
  .nm-board { --step: 104px; --card-h: 142px; }
  .nm-card { width: 88%; }
  .nm-card-cue, .nm-faces, .nm-days { display: none; }
  .nm-card-main strong { font-size: var(--text-lg); }
  .nm-actions .nm-btn { flex: 1 1 auto; }
  .nm-footer-base { align-items: flex-start; flex-direction: column; }
}

/* ---------------------------------------------------------------- reduced motion: the finished page, nothing pinned */

@media (prefers-reduced-motion: reduce) {
  .nm-launch { height: auto; padding-block: var(--section-gap-s); }
  .nm-stage { position: static; height: auto; padding-block: 0; }
  .nm-stage-grid { height: auto; }
  .nm-band { height: auto; padding-block: var(--space-xl); }
  .nm-phone { transform: none; }
  .nm-header, .nm-header::after { animation: none; }
  .nm-header::after { display: none; }
  .nm-hero h1 .nm-w > span, .nm-hero-lead, .nm-actions, .nm-card, .nm-card .nm-stamp, .nm-card .nm-ring-fill, .nm-app-card { animation: none; }
  .nm-scene .nm-skills i::after { transform: scaleX(var(--v)); }
  .nm-scene .nm-ring-fill { stroke-dashoffset: 0.28; }
  .nm-checks path { stroke-dashoffset: 0; }
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/page.tsx">
<![CDATA[import { Logo } from "./brand/Logo";
import { LaunchPhone } from "./launch/LaunchPhone";
import { GlassBackdrop } from "./motion/GlassBackdrop";
import { Reveals } from "./motion/Reveals";
import { SiteChrome } from "./motion/SiteChrome";
import { Demo } from "./sections/Demo";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Plans } from "./sections/Plans";
import { Studios } from "./sections/Studios";

export default function NomiPage() {
  return (
    <div className="nm-site">
      <GlassBackdrop />
      <a className="nm-skip" href="#main">Skip to content</a>
      <header className="nm-header" data-nm-header data-hidden="false" data-scrolled="false">
        <div className="container nm-header-inner">
          <a className="nm-home-link" href="#top" aria-label="NOMI home"><Logo /></a>
          <nav className="nm-nav" aria-label="Primary" data-nm-nav data-on="false">
            <a href="#launch">Product</a>
            <a href="#studios">Studios</a>
            <a href="#plans">Plans</a>
            <span className="nm-nav-ink" aria-hidden="true" />
          </nav>
          <a className="nm-btn nm-btn--quiet nm-btn--sm" href="#demo">Book a demo</a>
        </div>
      </header>
      <main id="main">
        <Hero />
        <LaunchPhone />
        <Studios />
        <Plans />
        <Demo />
      </main>
      <Footer />
      <Reveals />
      <SiteChrome />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/tokens.css">
<![CDATA[:root {
  color-scheme: light;
  --space-3xs: 2px; --space-2xs: 4px; --space-xs: 8px; --space-sm: 12px; --space-md: 16px; --space-lg: 24px; --space-xl: 40px; --space-2xl: 64px; --space-3xl: 96px; --space-4xl: 144px;
  --text-xs: 0.8125rem; --text-sm: 0.875rem; --text-md: 1rem; --text-lg: 1.25rem; --text-xl: 1.5625rem; --text-2xl: 1.953rem; --text-3xl: 2.441rem;
  --text-display-s: clamp(2.25rem, 4vw + 0.5rem, 3.75rem); --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
  --text-section: clamp(2rem, 2.5vw + 1rem, 3.5rem); --text-title: clamp(1.25rem, 0.75vw + 0.875rem, 1.625rem); --text-lead: clamp(1.125rem, 0.35vw + 1rem, 1.375rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 420ms;
  --color-error: oklch(52% 0.19 27); --color-success: oklch(50% 0.12 150);
  --container: 1440px; --gutter: 64px; --gap-columns: 32px; --section-gap-s: 120px; --section-gap: 144px; --section-gap-l: 176px;
  --z-base: 1; --z-raised: 10; --z-dropdown: 100; --z-sticky: 200; --z-sticky-nav: 300; --z-modal: 400; --z-toast: 500; --z-tooltip: 600;
  --color-paper: oklch(97.6% 0.011 88); --color-paper-2: oklch(96.5% 0.02 160); --color-paper-3: oklch(93% 0.036 160);
  --color-ink: oklch(21% 0.025 170); --color-ink-2: oklch(31% 0.02 170); --color-muted: oklch(49% 0.024 165);
  --color-rule: oklch(86.5% 0.022 140);
  --color-accent: oklch(50% 0.13 160); --color-accent-deep: oklch(42% 0.11 162); --color-accent-soft: oklch(88% 0.08 160); --color-accent-ink: oklch(99% 0.006 160);
  --color-focus: oklch(45% 0.14 160);
  --p-mon: oklch(85% 0.052 22); --p-tue: oklch(87.5% 0.058 64); --p-wed: oklch(91.5% 0.064 98); --p-thu: oklch(86.5% 0.075 160);
  --p-fri: oklch(87% 0.048 210); --p-sat: oklch(84% 0.045 270); --p-sun: oklch(84% 0.048 322);
  --light: oklch(99.4% 0.016 84); --glint: oklch(100% 0 0);
  --font-display: var(--font-nomi-display), "Schibsted Grotesk", ui-sans-serif, sans-serif; --font-body: var(--font-nomi-body), "Instrument Sans", ui-sans-serif, sans-serif;
  --font-outlier: var(--font-nomi-mono), "DM Mono", ui-monospace, monospace;
  --radius-card: 14px; --radius-input: 10px; --radius-pill: 999px; --radius-slab: 28px; --radius-device: 44px; --rule-hair: 1px;
  /* NOMI: one plastic tint per moment, the chrome's height, motion tokens beyond the shared scale */
  --tint-inbox: var(--p-fri); --tint-schedule: var(--p-wed); --tint-progress: var(--p-thu); --tint-payments: var(--p-sun);
  --nm-header-h: 72px; --nm-row: 72px; --nm-btn: 52px; --nm-wire: var(--space-3xl);
  --dur-slow: 640ms; --dur-hero: 900ms; --stagger: 70ms; --reveal-shift: 24px;
  --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .32 0 0 0 0 .3 0 0 0 0 .2 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E");
  --shadow-card: 0 1px 2px oklch(30% 0.03 165 / 0.08), 0 24px 48px -24px oklch(40% 0.08 165 / 0.35);
  --shadow-lift: 0 1px 1px oklch(30% 0.03 165 / 0.10), 8px 18px 28px -14px oklch(36% 0.06 165 / 0.32), 18px 40px 60px -30px oklch(40% 0.08 165 / 0.30);
  --tracking-display: -0.03em; --display-weight: 700;
  /* Glassmorphic background & depth tokens */
  --glass-surface: color-mix(in oklab, var(--light) 52%, transparent);
  --glass-surface-strong: color-mix(in oklab, var(--light) 75%, transparent);
  --glass-surface-subtle: color-mix(in oklab, var(--light) 30%, transparent);
  --glass-surface-tinted: color-mix(in oklab, var(--color-paper-2) 45%, transparent);
  --glass-border: color-mix(in oklab, var(--glint) 80%, transparent);
  --glass-border-strong: var(--glint);
  --glass-border-subtle: color-mix(in oklab, var(--glint) 45%, transparent);
  --glass-border-rule: color-mix(in oklab, var(--color-rule) 60%, transparent);
  --glass-blur-sm: blur(14px);
  --glass-blur-md: blur(24px);
  --glass-blur-lg: blur(48px);
  --glass-shadow: 0 16px 36px -12px oklch(21% 0.025 170 / 0.08), inset 0 1.5px 0 var(--glint);
  --glass-shadow-deep: 0 28px 56px -18px oklch(21% 0.025 170 / 0.12), inset 0 2px 0 var(--glint);
  --glass-glow-cyan: oklch(84% 0.08 215 / 0.55);
  --glass-glow-amber: oklch(88% 0.09 90 / 0.60);
  --glass-glow-mint: oklch(84% 0.11 160 / 0.55);
  --glass-glow-lilac: oklch(82% 0.08 320 / 0.55);
}
/* The launch stage's current plastic tint, registered so a change of moment fades the colour instead of cutting. */
@property --nm-t { syntax: "<color>"; inherits: true; initial-value: transparent; }
]]>
    </file>
    <file path="src/app/(nomi)/nomi/brand/Icons.tsx">
<![CDATA[import type { SceneId } from "../launch/scenes";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function SceneIcon({ id, className }: { id: SceneId } & IconProps) {
  switch (id) {
    case "inbox":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      );
    case "schedule":
      return (
        <svg {...base} className={className}>
          <rect x="4" y="5.5" width="16" height="14" rx="3" />
          <path d="M8 3.5v4M16 3.5v4M4 10.5h16" />
        </svg>
      );
    case "progress":
      return (
        <svg {...base} className={className}>
          <path d="M4 18.5h16" />
          <path d="m6 15 4-4.5 3 2.5 5-6" />
        </svg>
      );
    case "payments":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="6" width="17" height="12" rx="3" />
          <path d="M3.5 10.5h17M7 15h3" />
        </svg>
      );
  }
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/brand/Logo.tsx">
<![CDATA[export function Logo({ mast = false }: { mast?: boolean }) {
  return (
    <span className={`nm-logo${mast ? " nm-logo--mast" : ""}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 16c0-4 3-6 6-6s6 2 6 6-3 6-6 6-6-2-6-6Z" fill="var(--color-accent)" />
      </svg>
      <b>nomi</b>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/forms/NomiForm.tsx">
<![CDATA["use client";

import { useRef, useState, type FormEvent } from "react";
import { Check } from "../brand/Icons";
import { validateWalkthrough } from "./validate";

type Status = "idle" | "error" | "success";

export function NomiForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", students: "" });
  const emailRef = useRef<HTMLInputElement>(null);
  const set = (key: keyof typeof fields) => (e: { target: { value: string } }) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateWalkthrough(fields);
    if (!result.ok) {
      setMessage(result.message);
      setStatus("error");
      // Restart the shake when the same error repeats.
      const input = emailRef.current;
      if (input) {
        input.classList.remove("is-shake");
        void input.offsetWidth;
        input.classList.add("is-shake");
        input.focus();
      }
      return;
    }
    setMessage("");
    setStatus("success");
  };

  return (
    <div className="nm-form-wrap" data-status={status} data-nm-reveal="wipe">
      <div className="nm-tag" aria-hidden="true">
        <b>{fields.name.trim() || "Your studio"}</b>
        <span>{fields.email.trim() || "hello@yourstudio.com"}</span>
        <em data-on={fields.students !== ""}>{fields.students || "Students"}</em>
      </div>
      <div className="nm-tray">
        <form className="nm-form" data-endpoint="" data-status={status} onSubmit={submit} noValidate>
          <div className="nm-fields" inert={status === "success"}>
            <label>
              Your name
              <input name="name" autoComplete="name" required placeholder="Alex Morgan" value={fields.name} onChange={set("name")} />
            </label>
            <div className="nm-field">
              <label>
                Studio email
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="hello@yourstudio.com"
                  value={fields.email}
                  onChange={set("email")}
                  aria-invalid={status === "error" || undefined}
                  aria-describedby="nm-email-help"
                />
              </label>
              <p className="nm-help" id="nm-email-help" aria-live="polite" data-on={status === "error"}>{message}</p>
            </div>
            <label>
              Students you support
              <select name="students" value={fields.students} onChange={set("students")}>
                <option value="" disabled>Choose a range</option>
                <option>1–25</option>
                <option>26–75</option>
                <option>76+</option>
              </select>
            </label>
            <button className="nm-btn nm-btn--primary" type="submit">Request a walkthrough</button>
          </div>
          <div className="nm-success" role="status" aria-hidden={status !== "success"} data-on={status === "success"}>
            <span className="nm-check"><Check /></span>
            <h3>We’ll make room.</h3>
            <p>Nothing was sent: this template’s form is not connected yet.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/forms/validate.ts">
<![CDATA[export type WalkthroughFields = { name: string; email: string; students: string };

export type WalkthroughResult = { ok: true } | { ok: false; field: "email"; message: string };

export const EMAIL_MESSAGE = "Add a studio email so we know where to reply.";

/** The form is local-only, so the one rule is a reachable-looking studio email. */
export function validateWalkthrough({ email }: WalkthroughFields): WalkthroughResult {
  const value = email.trim();
  const at = value.indexOf("@");
  if (at < 1 || at === value.length - 1) return { ok: false, field: "email", message: EMAIL_MESSAGE };
  return { ok: true };
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/launch/LaunchPhone.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SceneIcon } from "../brand/Icons";
import { Words } from "../motion/Words";
import { SCENES, type SceneId } from "./scenes";
import { sceneAt, sceneOffset, stageProgress } from "./progress";

const PINNED = "(min-width: 60rem) and (prefers-reduced-motion: no-preference)";

function SceneBody({ id }: { id: SceneId }) {
  switch (id) {
    case "inbox":
      return (
        <ul className="nm-threads">
          <li>
            <span className="nm-avatar">M</span>
            <span><b>Maya’s mum</b>Can we move Thursday?</span>
          </li>
          <li>
            <span className="nm-avatar">T</span>
            <span><b>Theo’s dad</b>Thanks for the notes</span>
          </li>
          <li>
            <span className="nm-avatar">P</span>
            <span><b>Priya</b>Slides attached</span>
          </li>
        </ul>
      );
    case "schedule":
      return (
        <>
          <div className="nm-week">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
              <span key={d} data-on={d === "Tue"}>{d}</span>
            ))}
          </div>
          <ul className="nm-slots">
            <li><span className="nm-mono">4:30 PM</span><b>Algebra with Maya</b></li>
            <li data-free="true"><span className="nm-mono">5:30 PM</span><b>Open</b></li>
            <li><span className="nm-mono">6:15 PM</span><b>Reading with Theo</b></li>
          </ul>
        </>
      );
    case "progress":
      return (
        <>
          <div className="nm-ring">
            <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
              <circle className="nm-ring-track" cx="40" cy="40" r="32" />
              <circle className="nm-ring-fill" cx="40" cy="40" r="32" pathLength={1} />
            </svg>
            <b className="nm-mono">72%</b>
          </div>
          <ul className="nm-skills">
            {[["Fractions", 0.9], ["Equations", 0.72], ["Graphs", 0.45]].map(([label, v]) => (
              <li key={label as string}>
                <span>{label}</span>
                <i style={{ "--v": v } as CSSProperties} />
              </li>
            ))}
          </ul>
        </>
      );
    case "payments":
      return (
        <ul className="nm-ledger">
          <li><span><b>Invoice 104</b>Maya’s mum</span><em>Paid</em></li>
          <li><span><b>Invoice 103</b>Theo’s dad</span><em>Paid</em></li>
          <li><span><b>Invoice 102</b>Sam’s mum</span><em>Paid</em></li>
        </ul>
      );
  }
}

export function LaunchPhone() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lock = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const pinned = window.matchMedia(PINNED);
    let frame = 0;

    const read = () => {
      frame = 0;
      if (!pinned.matches) return;
      const rect = section.getBoundingClientRect();
      const p = stageProgress({ top: rect.top, height: rect.height, viewport: window.innerHeight });
      section.style.setProperty("--nm-p", p.toFixed(4));
      if (lock.current !== null) {
        if (Math.abs(window.scrollY - lock.current) > 3) return;
        lock.current = null;
      }
      setActive(sceneAt(p, SCENES.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const select = useCallback((index: number) => {
    setActive(index);
    const section = sectionRef.current;
    if (!section || !window.matchMedia(PINNED).matches) return;
    const rect = section.getBoundingClientRect();
    const target = window.scrollY + rect.top + sceneOffset(index, SCENES.length, { height: rect.height, viewport: window.innerHeight });
    lock.current = target;
    window.setTimeout(() => {
      if (lock.current === target) lock.current = null;
    }, 1600);
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const scene = SCENES[active];

  return (
    <section ref={sectionRef} className="nm-launch" id="launch" data-nm-section style={{ "--count": SCENES.length } as CSSProperties}>
      <div className="nm-stage" data-scene={scene.id}>
        <div className="container nm-stage-grid">
          <div className="nm-stage-side">
            <h2 data-nm-reveal="mask"><Words text="One surface. Four calm moments." /></h2>
            <p className="lead" data-nm-reveal="rise">Scroll to unlock the NOMI workspace one capability at a time.</p>
            <div className="nm-rail" style={{ "--active": active } as CSSProperties}>
              <span className="nm-rail-pill" aria-hidden="true" />
              <ol>
                {SCENES.map((s, i) => (
                  <li key={s.id} data-on={i === active}>
                    <button type="button" className="nm-node" aria-pressed={i === active} onClick={() => select(i)}>
                      <SceneIcon id={s.id} />
                      <span>{s.name}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="nm-band">
            <div className="nm-light" aria-hidden="true"><i /><i /><i /></div>
            <div className="nm-phone" style={{ "--active": active } as CSSProperties}>
              <div className="nm-screen">
                <div className="nm-status" aria-hidden="true">
                  <span className="nm-mono">9:41</span>
                  <i />
                  <svg viewBox="0 0 24 12" focusable="false"><rect x="1" y="2" width="19" height="8" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="3.5" y="4.5" width="11" height="3" rx="1" fill="currentColor" /></svg>
                </div>
                <div className="nm-appbar"><b>nomi</b><span className="nm-avatar" aria-hidden="true">E</span></div>
                <p className="nm-greet">Good morning, Eli</p>
                <div className="nm-scenes">
                  {SCENES.map((s, i) => (
                    <div key={s.id} className="nm-scene" data-active={i === active} aria-hidden={i !== active} style={{ "--k": i - active } as CSSProperties}>
                      <p className="nm-scene-title">{s.name}</p>
                      <p className="nm-scene-cue">{s.cue}</p>
                      <SceneBody id={s.id} />
                    </div>
                  ))}
                </div>
                <div className="nm-app-card" key={scene.id}>
                  <strong>{scene.card}</strong>
                  <div className="nm-pips" aria-hidden="true">
                    {SCENES.map((s, i) => (
                      <i key={s.id} data-on={i <= active} />
                    ))}
                  </div>
                </div>
                <div className="nm-home" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/launch/progress.ts">
<![CDATA[export type StageMetrics = {
  /** The launch section's `getBoundingClientRect().top`. */
  top: number;
  /** The launch section's full height. */
  height: number;
  /** `window.innerHeight`. */
  viewport: number;
};

export const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

/** 0 when the sticky stage pins, 1 when it lets go. */
export function stageProgress({ top, height, viewport }: StageMetrics): number {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp01(-top / travel);
}

/** Which of `count` scenes owns progress `p`. */
export function sceneAt(p: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(clamp01(p) * count)));
}

/** The scroll distance past the pin that lands in the middle of scene `index`. */
export function sceneOffset(index: number, count: number, { height, viewport }: Pick<StageMetrics, "height" | "viewport">): number {
  const travel = Math.max(0, height - viewport);
  return ((index + 0.5) / count) * travel;
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/launch/scenes.ts">
<![CDATA[export type SceneId = "inbox" | "schedule" | "progress" | "payments";

export type Scene = {
  id: SceneId;
  name: string;
  /** The phone's lock line under the scene title. */
  cue: string;
  /** The bottom sheet's headline; also the text the e2e spec reads. */
  card: string;
};

export const SCENES: readonly Scene[] = [
  { id: "inbox", name: "Inbox", cue: "A note from Maya’s mum", card: "You have 3 new threads" },
  { id: "schedule", name: "Schedule", cue: "Tuesday, 4:30 PM", card: "Your week, with room" },
  { id: "progress", name: "Progress", cue: "Algebra, 72% complete", card: "Progress worth sharing" },
  { id: "payments", name: "Payments", cue: "Invoice 104, settled", card: "Everything settled" },
] as const;
]]>
    </file>
    <file path="src/app/(nomi)/nomi/motion/GlassBackdrop.tsx">
<![CDATA[export function GlassBackdrop() {
  return (
    <div className="nm-glass-backdrop" aria-hidden="true">
      {/* 1. Luminous glass chromatic orbs and caustic light fields */}
      <div className="nm-glass-blooms">
        <span className="nm-bloom nm-bloom--cyan" />
        <span className="nm-bloom nm-bloom--amber" />
        <span className="nm-bloom nm-bloom--mint" />
        <span className="nm-bloom nm-bloom--lilac" />
        <span className="nm-bloom nm-bloom--warm" />
      </div>

      {/* 2. Prismatic daylight refraction shafts */}
      <div className="nm-glass-caustics">
        <i className="nm-caustic-beam nm-caustic-beam--1" />
        <i className="nm-caustic-beam nm-caustic-beam--2" />
        <i className="nm-caustic-beam nm-caustic-beam--3" />
        <i className="nm-caustic-beam nm-caustic-beam--4" />
      </div>

      {/* 3. Etched architectural glass grid and precision registration marks */}
      <div className="nm-glass-grid">
        <span className="nm-grid-line nm-grid-line--h1" />
        <span className="nm-grid-line nm-grid-line--h2" />
        <span className="nm-grid-line nm-grid-line--h3" />
        <span className="nm-grid-line nm-grid-line--h4" />
        <span className="nm-grid-line nm-grid-line--v1" />
        <span className="nm-grid-line nm-grid-line--v2" />
        <span className="nm-grid-line nm-grid-line--v3" />
        <span className="nm-grid-mark nm-grid-mark--1">+ 01</span>
        <span className="nm-grid-mark nm-grid-mark--2">+ 02</span>
        <span className="nm-grid-mark nm-grid-mark--3">+ 03</span>
        <span className="nm-grid-mark nm-grid-mark--4">+ 04</span>
      </div>

      {/* 4. Layered architectural frosted glass plates, lenses, and floating tablets */}
      <div className="nm-glass-plates">
        {/* Hero frosted optical glass disc behind the card tray */}
        <div className="nm-glass-plate nm-glass-plate--hero">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-ring" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>

        {/* Studios section frosted glass slab */}
        <div className="nm-glass-plate nm-glass-plate--studios">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>

        {/* Plans section floating frosted lens */}
        <div className="nm-glass-plate nm-glass-plate--plans">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-ring" />
          <div className="nm-glass-specular" />
        </div>

        {/* Demo section floating glass tray backplate */}
        <div className="nm-glass-plate nm-glass-plate--demo">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

/**
 * Flips `data-in` on every `[data-nm-reveal]` as it enters the viewport, once.
 * The hidden state lives in CSS under `.nm-js` and `prefers-reduced-motion: no-preference`,
 * so no script and reduced motion both see the finished page.
 */
export function Reveals() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-nm-reveal]"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "true");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/motion/SiteChrome.tsx">
<![CDATA["use client";

import { useEffect } from "react";

/**
 * Behaviour for the slab header, attached to markup the server already rendered:
 * it hides while scrolling down and returns on the way up, and a sliding underline
 * follows whichever section owns the middle of the screen.
 */
export function SiteChrome() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-nm-header]");
    const nav = header?.querySelector<HTMLElement>("[data-nm-nav]");
    if (!header || !nav) return;

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const targets = links.map((link) => document.querySelector<HTMLElement>(link.getAttribute("href") ?? ""));

    const place = (index: number) => {
      const link = links[index];
      if (!link) {
        nav.dataset.on = "false";
        return;
      }
      nav.style.setProperty("--x", `${link.offsetLeft}px`);
      nav.style.setProperty("--s", String(link.offsetWidth / 100));
      nav.dataset.on = "true";
      links.forEach((l, i) => (i === index ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
    };

    let current = -1;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = targets.indexOf(entry.target as HTMLElement);
          if (index === -1) continue;
          if (entry.isIntersecting) current = index;
          else if (current === index) current = -1;
        }
        place(current);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((t) => t && io.observe(t));

    let lastY = window.scrollY;
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      header.dataset.scrolled = y > 8 ? "true" : "false";
      if (y < 160 || delta < -4 || header.contains(document.activeElement)) header.dataset.hidden = "false";
      else if (delta > 6) header.dataset.hidden = "true";
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const onResize = () => place(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    header.addEventListener("focusin", () => (header.dataset.hidden = "false"));
    read();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/motion/Words.tsx">
<![CDATA[import type { CSSProperties } from "react";

/**
 * A heading split into word masks for the rise-in. Rendered on the server, so the words are
 * there before any script and read as one heading to assistive tech.
 */
export function Words({ text, from = 0 }: { text: string; from?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="nm-w" style={{ "--i": from + i } as CSSProperties}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/sections/Demo.tsx">
<![CDATA[import { NomiForm } from "../forms/NomiForm";
import { Words } from "../motion/Words";

export function Demo() {
  return (
    <section className="nm-demo" id="demo">
      <div className="container nm-demo-grid">
        <div className="nm-demo-copy">
          <h2 data-nm-reveal="mask"><Words text="Give your studio a softer day." /></h2>
          <p className="lead" data-nm-reveal="rise">Tell us a little about your studio. We’ll send a private walkthrough with no pitch deck attached.</p>
          <ul className="nm-facts" data-nm-reveal="stagger">
            <li>A private 20-minute look.</li>
            <li>No commitment.</li>
          </ul>
        </div>
        <NomiForm />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="nm-footer">
      <div className="container">
        <div className="nm-mast">
          <Logo mast />
        </div>
        <div className="nm-footer-base">
          <nav aria-label="Footer">
            <ul>
              <li><a href="#launch">Product</a></li>
              <li><a href="#studios">Studios</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#demo">Request a walkthrough</a></li>
            </ul>
          </nav>
          <p>© 2026 NOMI Workspace. A fictional template, and its form is not connected.</p>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/sections/Hero.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { ArrowUpRight, SceneIcon } from "../brand/Icons";
import { SCENES } from "../launch/scenes";
import { Words } from "../motion/Words";

function CardExtra({ id }: { id: (typeof SCENES)[number]["id"] }) {
  switch (id) {
    case "inbox":
      return (
        <span className="nm-faces" aria-hidden="true">
          <i>M</i>
          <i>T</i>
          <i>P</i>
        </span>
      );
    case "schedule":
      return (
        <span className="nm-days" aria-hidden="true">
          {["M", "T", "W", "T", "F"].map((d, i) => (
            <i key={i} data-on={i === 1}>{d}</i>
          ))}
        </span>
      );
    case "progress":
      return (
        <svg className="nm-mini-ring" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
          <circle className="nm-ring-track" cx="22" cy="22" r="17" />
          <circle className="nm-ring-fill" cx="22" cy="22" r="17" pathLength={1} />
        </svg>
      );
    case "payments":
      return <span className="nm-stamp" aria-hidden="true">Settled</span>;
  }
}

export function Hero() {
  return (
    <section className="nm-hero" id="top">
      <div className="nm-hero-light" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container nm-hero-grid">
        <div className="nm-hero-copy">
          <h1><Words text="Make every lesson feel looked after." from={1} /></h1>
          <p className="lead nm-hero-lead">A calm mobile workspace for tutoring studios: bookings, updates, progress, payments.</p>
          <div className="nm-actions">
            <a className="nm-btn nm-btn--primary" href="#demo">
              Request a walkthrough
              <ArrowUpRight />
            </a>
            <a className="nm-btn nm-btn--quiet" href="#launch">Explore the app</a>
          </div>
        </div>

        <div className="nm-board" data-slot="hero-board" data-alt="The four NOMI moments as a stack of plastic cards: inbox, schedule, progress and payments.">
          <ul className="nm-stack">
            {SCENES.map((s, i) => (
              <li key={s.id} className="nm-card" data-scene={s.id} style={{ "--i": i } as CSSProperties}>
                <a className="nm-card-face" href="#launch">
                  <span className="nm-card-top">
                    <SceneIcon id={s.id} />
                    <b>{s.name}</b>
                    <span className="nm-card-cue">{s.cue}</span>
                  </span>
                  <span className="nm-card-main">
                    <strong>{s.card}</strong>
                    <CardExtra id={s.id} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/sections/Plans.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Check } from "../brand/Icons";
import { Words } from "../motion/Words";

const INCLUDED = ["Bookings and reminders", "Progress notes for families", "One-tap payment follow-up"];

export function Plans() {
  return (
    <section className="nm-plans" id="plans">
      <div className="container nm-plans-grid">
        <div className="nm-plans-copy">
          <h2 data-nm-reveal="mask"><Words text="Less admin. More attention." /></h2>
          <p className="lead" data-nm-reveal="rise">Start with one studio, invite your team, and let the calm compound.</p>
        </div>

        <div className="nm-offer-wrap" data-nm-reveal="wipe">
          <article className="nm-offer">
            <div className="nm-offer-main">
              <h3>NOMI Studio</h3>
              <p className="nm-price">
                <strong className="num">$39</strong>
                <span>per month, up to 4 tutors</span>
              </p>
              <ul className="nm-checks">
                {INCLUDED.map((item, i) => (
                  <li key={item} style={{ "--i": i } as CSSProperties}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="nm-offer-stub">
              <a className="nm-btn nm-btn--primary" href="#demo">Start a conversation</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nomi)/nomi/sections/Studios.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { SceneIcon } from "../brand/Icons";
import type { SceneId } from "../launch/scenes";
import { Words } from "../motion/Words";

type Row = { title: string; copy: string; scene: "schedule" | "progress" | "payments" };

const ROWS: Row[] = [
  { title: "Know what is next.", copy: "Every lesson, reminder and open thread stays in one soft-focus view.", scene: "schedule" },
  { title: "Show the progress.", copy: "Give families a clear, generous window into the work happening between sessions.", scene: "progress" },
  { title: "Close the loop.", copy: "Invoices and follow-ups move with the lesson instead of waiting behind it.", scene: "payments" },
];

const NAMES: Record<SceneId, string> = { inbox: "Inbox", schedule: "Schedule", progress: "Progress", payments: "Payments" };

/** A small built sample of the moment each row is about, so the row shows its promise. */
function Panel({ scene }: { scene: Row["scene"] }) {
  return (
    <div className="nm-panel" aria-hidden="true">
      <span className="nm-panel-head">
        <SceneIcon id={scene} />
        {NAMES[scene]}
      </span>
      {scene === "schedule" && (
        <span className="nm-panel-line">
          <span className="nm-mono">Thu 5:30 PM</span>
          <em>Open</em>
        </span>
      )}
      {scene === "progress" && (
        <span className="nm-panel-line">
          <span>Fractions</span>
          <i className="nm-bar" style={{ "--v": 0.9 } as CSSProperties} />
          <span className="nm-mono">90%</span>
        </span>
      )}
      {scene === "payments" && (
        <span className="nm-panel-line">
          <span>Invoice 103</span>
          <em>Paid</em>
        </span>
      )}
    </div>
  );
}

export function Studios() {
  return (
    <section className="nm-studios" id="studios">
      <div className="container">
        <h2 data-nm-reveal="mask"><Words text="Quiet tools for busy humans." /></h2>
        <ul className="nm-rows" data-nm-reveal="stagger">
          {ROWS.map((row, i) => (
            <li key={row.title} className="nm-row" data-scene={row.scene} style={{ "--i": i } as CSSProperties}>
              <h3>{row.title}</h3>
              <p>{row.copy}</p>
              <Panel scene={row.scene} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
  </files>
</template>
