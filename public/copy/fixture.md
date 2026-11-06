<template slug="fixture" name="FIXTURE">
  <dependencies>
    {
      "dependencies": {
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(fixture)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Martian_Mono, Rethink_Sans } from "next/font/google";
import "./fixture/fixture.css";

const display = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-familjen",
  display: "swap",
});

const body = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-rethink",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-martian",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "FIXTURE — Shopify stores, fitted out properly",
  description: "A five-person Shopify studio in Rotterdam. Store setup, theme builds, app wiring, speed and care plans for independent merchants, at flat prices.",
  openGraph: {
    title: "FIXTURE — Your shop, fitted out properly",
    description: "Shell, fixtures, wiring, signage, open. A Shopify studio for small merchants, priced by the stage.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function FixtureLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal="wipe"]>*,[data-reveal] .fx-split__inner,[data-reveal] .fx-gantt__bar{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="fx-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(fixture)/fixture/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/fixture";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/** FIXTURE ships without photography; this stays so a fork can add case-study images (docs/image-prompts/fixture.md). */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`fx-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="fx-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fixture.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-ink: #121316;
  --color-paper: #F3F2EE;
  --color-white: #FFFFFF;
  --color-crimson: #CF1F35;
  --color-graphite: #5E6168;
  --color-hairline: #D9D7D0;
  --color-till: #1E7A4C;
  --font-display: var(--font-familjen), "Helvetica Neue", Arial, sans-serif;
  --font-body: var(--font-rethink), system-ui, sans-serif;
  --font-mono: var(--font-martian), ui-monospace, monospace;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-snap: cubic-bezier(0.5, 0, 0, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 30%, 1.01 42%, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 380ms;
  --dur-slow: 600ms;
  --dur-hero: 1000ms;
  --reveal-shift: 24px;
  --stagger: 60ms;
}

:root {
  color-scheme: light;
  --color-ink: #121316;
  --color-paper: #F3F2EE;
  --color-white: #FFFFFF;
  --color-crimson: #CF1F35;
  --color-graphite: #5E6168;
  --color-hairline: #D9D7D0;
  --color-till: #1E7A4C;
  --font-display: var(--font-familjen), "Helvetica Neue", Arial, sans-serif;
  --font-body: var(--font-rethink), system-ui, sans-serif;
  --font-mono: var(--font-martian), ui-monospace, monospace;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-snap: cubic-bezier(0.5, 0, 0, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 30%, 1.01 42%, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 380ms;
  --dur-slow: 600ms;
  --dur-hero: 1000ms;
  --reveal-shift: 24px;
  --stagger: 60ms;

  --fx-gutter: clamp(16px, 4vw, 56px);
  --fx-container: 1360px;
  --fx-header: 64px;
  --fx-r-sm: 4px;
  --fx-r: 8px;
  --fx-line: color-mix(in srgb, var(--color-hairline) 100%, transparent);
  --fx-line-soft: color-mix(in srgb, var(--color-hairline) 55%, transparent);
  --fx-shadow-ink: color-mix(in srgb, var(--color-ink) 14%, transparent);
  --fx-progress: 0;
}

/* ───────────────────────── Base ───────────────────────── */

*, *::before, *::after { box-sizing: border-box; }
html { background: var(--color-paper); color: var(--color-ink); scroll-padding-top: 80px; overflow-x: clip; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--color-paper); color: var(--color-ink); font: 400 17px/1.55 var(--font-body); -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: 0; padding: 0; }
h1, h2, h3, p, dl, dd, blockquote, figure, fieldset { margin: 0; }
ul, ol { margin: 0; padding: 0; list-style: none; }
fieldset { padding: 0; border: 0; min-width: 0; }
img, svg { display: block; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.04em; line-height: 0.94; text-wrap: balance; }
h1 { font-size: clamp(2.6rem, 6.2vw, 6.4rem); font-weight: 700; }
h2 { font-size: clamp(2.2rem, 4.8vw, 4.6rem); }
h3 { font-size: clamp(1.3rem, 2vw, 1.75rem); letter-spacing: -0.025em; line-height: 1.05; }
::selection { background: color-mix(in srgb, var(--color-crimson) 22%, transparent); }
:focus-visible { outline: 2px solid var(--color-crimson); outline-offset: 3px; border-radius: var(--fx-r-sm); }
[hidden] { display: none !important; }

.fx-shell { position: relative; min-height: 100svh; }
.fx-main { position: relative; z-index: 1; }
.fx-container { width: 100%; max-width: var(--fx-container); margin-inline: auto; padding-inline: var(--fx-gutter); }
.fx-sr { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.fx-mono { font-family: var(--font-mono); font-size: 10.5px; line-height: 1.3; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 400; }
.fx-skip { position: fixed; z-index: 100; top: 10px; left: 10px; padding: 10px 14px; border-radius: var(--fx-r-sm); background: var(--color-ink); color: var(--color-paper); font: 500 14px/1 var(--font-body); transform: translateY(-160%); transition: transform var(--dur-fast) var(--ease-out); }
.fx-skip:focus { transform: none; }

/* The Swiss grid: 12 hairline columns behind everything. */
.fx-gridlines { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.fx-gridlines .fx-container { height: 100%; }
.fx-gridlines span, .fx-grid-bg::before {
  display: block; height: 100%;
  background-image: repeating-linear-gradient(90deg, var(--fx-line-soft) 0 1px, transparent 1px calc(100% / 12));
  border-right: 1px solid var(--fx-line-soft);
  transform-origin: top;
}
.fx-grid-bg { position: relative; }
.fx-grid-bg::before { content: ""; position: absolute; inset: 0 max(var(--fx-gutter), calc((100% - var(--fx-container)) / 2 + var(--fx-gutter))); pointer-events: none; }

.fx-eyebrow { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; font: 500 10.5px/1.3 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-graphite); }
.fx-eyebrow span:first-child { color: var(--color-crimson); }
.fx-load__eyebrow { flex-wrap: nowrap; white-space: nowrap; overflow: hidden; }
.fx-eyebrow span + span::before { content: ""; display: inline-block; width: 14px; height: 1px; margin-right: 14px; vertical-align: middle; background: currentColor; opacity: 0.6; }

.fx-section { position: relative; padding-block: clamp(88px, 11vw, 168px); }
.fx-section-head { display: grid; gap: 22px; max-width: 760px; margin-bottom: clamp(44px, 6vw, 80px); }
.fx-section-head--row { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 28px; max-width: none; }
.fx-section-head--row > div { display: grid; gap: 22px; }
.fx-section-lead { max-width: 56ch; color: var(--color-graphite); font-size: clamp(16px, 1.25vw, 18px); }

/* Mask-rise text */
.fx-split { display: block; }
.fx-split__line { display: block; overflow: clip; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.fx-split__inner { display: block; }

/* ───────────────────────── Brand ───────────────────────── */

.fx-logo { display: inline-flex; align-items: center; gap: 10px; }
.fx-logo__mark { width: 30px; height: 30px; }
.fx-logo__word { font: 700 17px/1 var(--font-display); letter-spacing: 0.02em; }
.fx-mark__item { transform-box: fill-box; transform-origin: 50% 100%; }

/* ───────────────────────── Buttons ───────────────────────── */

.fx-button {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 44px; padding: 0 18px; overflow: hidden; border-radius: var(--fx-r-sm); border: 1px solid var(--color-ink);
  background: var(--color-ink); color: var(--color-paper); font: 500 14.5px/1 var(--font-body); white-space: nowrap;
  transition: transform var(--dur-instant) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.fx-button--lg { min-height: 52px; padding: 0 22px; font-size: 15.5px; }
.fx-button--primary { background: var(--color-crimson); border-color: var(--color-crimson); color: var(--color-white); }
.fx-button--ghost { background: transparent; color: var(--color-ink); }
.fx-button__fill { position: absolute; z-index: -1; inset: 0; background: var(--color-ink); clip-path: inset(0 100% 0 0); transition: clip-path var(--dur-base) var(--ease-out-expo); }
.fx-button--ghost .fx-button__fill { background: var(--color-ink); }
.fx-button__roll { display: grid; overflow: clip; line-height: 1.25; }
.fx-button__roll > span { grid-area: 1 / 1; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-button__roll > span + span { transform: translateY(110%); }
.fx-button__arrow { display: inline-block; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-button:focus-visible .fx-button__fill { clip-path: inset(0); }
.fx-button:focus-visible.fx-button--ghost { color: var(--color-paper); }
.fx-button:active { transform: scale(0.97); transition: transform var(--dur-instant) var(--ease-out); }
.fx-button:not(:active) { transition-timing-function: var(--ease-spring), var(--ease-out), var(--ease-out); }
.fx-button:disabled { cursor: progress; opacity: 0.85; }
.fx-magnetic { display: inline-flex; transform: translate3d(var(--fx-mx, 0px), var(--fx-my, 0px), 0); }

.fx-link-button { position: relative; padding: 6px 0; font: 500 14px/1 var(--font-body); color: var(--color-ink); }
.fx-link-button::after, .fx-footer__links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-link-button:focus-visible::after, .fx-footer__links a:focus-visible::after { transform: scaleX(1); transform-origin: left; }

/* ───────────────────────── Header ───────────────────────── */

.fx-header { position: fixed; z-index: 50; inset: 0 0 auto; height: var(--fx-header); transition: transform var(--dur-base) var(--ease-out-expo), background-color var(--dur-fast) var(--ease-out); }
.fx-header::before { content: ""; position: absolute; inset: 0; z-index: -1; background: color-mix(in srgb, var(--color-paper) 86%, transparent); backdrop-filter: blur(14px) saturate(1.2); border-bottom: 1px solid var(--fx-line); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.fx-header[data-state="compact"]::before, .fx-header[data-state="hidden"]::before { opacity: 1; }
.fx-header[data-state="hidden"] { transform: translateY(-100%); }
.fx-header__inner { display: flex; align-items: center; gap: 22px; height: 100%; }
.fx-header__brand { display: inline-flex; border-radius: var(--fx-r-sm); }
.fx-header__nav { position: relative; display: flex; gap: 26px; margin-inline: auto; }
.fx-header__link { position: relative; padding: 22px 0; font: 500 14px/1 var(--font-body); color: var(--color-graphite); transition: color var(--dur-fast) var(--ease-out); }
.fx-header__link[aria-current="true"], .fx-header__link:hover, .fx-header__link:focus-visible { color: var(--color-ink); }
.fx-header__indicator { position: absolute; left: 0; bottom: 14px; width: 100px; height: 2px; background: var(--color-crimson); transform-origin: left; transform: translateX(var(--x, 0px)) scaleX(calc(var(--w, 0) / 100)); transition: transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-fast) var(--ease-out); }
.fx-header__indicator[data-visible="false"] { opacity: 0; }
.fx-header__progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--color-crimson); transform-origin: left; transform: scaleX(var(--fx-progress)); }
.fx-header__toggle { display: none; position: relative; width: 44px; height: 44px; margin-left: auto; border: 1px solid var(--color-ink); border-radius: var(--fx-r-sm); }
.fx-header__toggle-bars { position: absolute; inset: 0; display: grid; place-content: center; gap: 6px; }
.fx-header__toggle-bars i { display: block; width: 18px; height: 1.5px; background: currentColor; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-header[data-menu="open"] .fx-header__toggle-bars i:first-child { transform: translateY(3.75px) rotate(45deg); }
.fx-header[data-menu="open"] .fx-header__toggle-bars i:last-child { transform: translateY(-3.75px) rotate(-45deg); }
.fx-header__toggle:active { transform: scale(0.94); }

.fx-menu { position: fixed; inset: var(--fx-header) 0 0; z-index: -2; display: flex; flex-direction: column; justify-content: space-between; padding: 28px var(--fx-gutter) 40px; background: var(--color-paper); }
.fx-menu nav { display: grid; }
.fx-menu nav a:not(.fx-button) { display: flex; align-items: baseline; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--fx-line); font: 600 clamp(28px, 8vw, 40px)/1 var(--font-display); letter-spacing: -0.03em; }
.fx-menu nav a .fx-mono { color: var(--color-crimson); }
.fx-menu__cta { margin-top: 28px; }

.fx-status { display: inline-flex; align-items: center; gap: 8px; font: 500 10.5px/1 var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-graphite); white-space: nowrap; }
.fx-status__dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--color-graphite); }
.fx-status[data-open="true"] .fx-status__dot { background: var(--color-till); }
.fx-status[data-open="true"] .fx-status__label { color: var(--color-till); }
.fx-status__dot::after { content: ""; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--color-till); opacity: 0; }

/* ───────────────────────── Scene: finished shop (static default) ───────────────────────── */

.fx-scene { position: relative; }
.fx-scene__stage { position: relative; padding-top: calc(var(--fx-header) + clamp(28px, 5vw, 64px)); padding-bottom: clamp(56px, 7vw, 96px); }
.fx-scene__ghost { display: none; }
.fx-scene__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; row-gap: 48px; align-items: start; }
.fx-scene__copy { grid-column: 1 / span 5; display: grid; gap: 56px; }
.fx-scene__shop { grid-column: 6 / span 7; position: sticky; top: calc(var(--fx-header) + 24px); display: grid; gap: 14px; }

.fx-hero { display: grid; gap: 24px; align-content: start; }
.fx-hero__title { max-width: 9.5ch; }
.fx-hero__lead { max-width: 44ch; font-size: clamp(16px, 1.3vw, 19px); color: var(--color-graphite); }
.fx-hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px; }
.fx-hero__facts { display: grid; grid-template-columns: repeat(3, auto); justify-content: start; gap: 28px; padding-top: 20px; border-top: 1px solid var(--fx-line); }
.fx-hero__facts dt { color: var(--color-graphite); }
.fx-hero__facts dd { margin-top: 6px; font: 600 26px/1 var(--font-display); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; }
.fx-hero__cue { display: none; align-items: center; gap: 12px; color: var(--color-graphite); }
.fx-hero__cue-line { position: relative; width: 36px; height: 1px; overflow: clip; background: var(--fx-line); }
.fx-hero__cue-line::after { content: ""; position: absolute; inset: 0; background: var(--color-crimson); transform: scaleX(0.3); transform-origin: left; }

/* Fit-out sheet */
.fx-sheet { display: grid; gap: 14px; }
.fx-sheet__head { display: flex; justify-content: space-between; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--color-ink); }
.fx-sheet__job { color: var(--color-graphite); }
.fx-sheet__row { position: relative; border-bottom: 1px solid var(--fx-line); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-snap), background-color var(--dur-fast) var(--ease-out); }
.fx-sheet__link { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto 20px; grid-template-areas: "n name week check" "n service week check"; column-gap: 12px; align-items: center; padding: 14px 4px; border-radius: var(--fx-r-sm); }
.fx-sheet__n { grid-area: n; font: 500 11px/1 var(--font-mono); color: var(--color-crimson); transition: color var(--dur-fast) var(--ease-out); }
.fx-sheet__name { grid-area: name; font: 600 19px/1.1 var(--font-display); letter-spacing: -0.02em; }
.fx-sheet__service { grid-area: service; font-size: 14px; color: var(--color-graphite); }
.fx-sheet__week { grid-area: week; font: 400 10.5px/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-graphite); }
.fx-sheet__check { grid-area: check; width: 18px; height: 18px; fill: none; stroke: var(--color-crimson); stroke-width: 2; stroke-linecap: square; }
.fx-sheet__check path { stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset var(--dur-base) var(--ease-snap); }
.fx-sheet__detail { display: grid; grid-template-rows: 1fr; transition: grid-template-rows var(--dur-base) var(--ease-snap); }
.fx-sheet__detail-inner { overflow: hidden; display: grid; gap: 12px; padding: 0 4px 0 50px; }
.fx-sheet__detail-inner > p { font-size: 15px; color: var(--color-ink); }
.fx-sheet__detail-inner > :last-child { margin-bottom: 16px; }
.fx-sheet__checks { display: flex; flex-wrap: wrap; gap: 6px; }
.fx-sheet__checks li { padding: 5px 8px; border: 1px solid var(--fx-line); border-radius: var(--fx-r-sm); background: var(--color-white); font: 400 10px/1 var(--font-mono); letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-graphite); }
.fx-sheet__bar { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--color-crimson); transform: scaleX(0); transform-origin: left; }

/* ───────────────────────── The storefront ───────────────────────── */

.fx-shop { position: relative; container-type: inline-size; padding: 4cqi 7cqi 3cqi; }
.fx-window {
  --u: 2.45cqi;
  position: relative; overflow: clip; font-size: var(--u); line-height: 1.3;
  background: var(--color-white); border: 1px solid var(--fx-line); border-radius: var(--fx-r);
  box-shadow: 0 1px 0 var(--fx-line), 0 28px 60px -32px var(--fx-shadow-ink);
}
.fx-window__bar { display: flex; align-items: center; gap: 1em; height: 3.4em; padding: 0 1.2em; border-bottom: 1px solid var(--fx-line); background: color-mix(in srgb, var(--color-paper) 55%, var(--color-white)); }
.fx-window__dots { display: flex; gap: 0.45em; }
.fx-window__dots i { width: 0.8em; height: 0.8em; border-radius: 50%; background: var(--color-hairline); }
.fx-window__url { display: grid; flex: 1; min-width: 0; max-width: 24em; padding: 0.5em 0.9em; border-radius: var(--fx-r-sm); background: var(--color-white); border: 1px solid var(--fx-line); font: 400 0.92em/1.2 var(--font-mono); color: var(--color-graphite); white-space: nowrap; }
.fx-window__url > * { grid-area: 1 / 1; overflow: hidden; text-overflow: ellipsis; }
.fx-window__url-live { display: inline-flex; align-items: center; gap: 0.5em; color: var(--color-ink); }
.fx-window__url-live svg { width: 1em; height: 1em; fill: none; stroke: var(--color-ink); stroke-width: 1.3; }
.fx-window__pay { margin-left: auto; padding: 0.45em 0.7em; border-radius: var(--fx-r-sm); background: var(--color-ink); color: var(--color-paper); font: 500 0.82em/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
.fx-window__ship { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0.6em 1.4em; background: var(--color-ink); color: var(--color-paper); font: 500 0.88em/1.2 var(--font-mono); letter-spacing: 0.04em; text-align: center; }
.fx-window__body { display: grid; gap: 1.2em; padding: 1.2em 1.4em 1.6em; }

.fx-slot { position: absolute; inset: 0; display: grid; place-items: center; border: 1px dashed color-mix(in srgb, var(--color-graphite) 55%, transparent); border-radius: var(--fx-r-sm); background: repeating-linear-gradient(135deg, transparent 0 0.7em, color-mix(in srgb, var(--color-hairline) 45%, transparent) 0.7em 0.78em); font: 400 0.8em/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-graphite); }
[data-slot] { opacity: 0; visibility: hidden; }

.fx-store-nav { position: relative; display: flex; align-items: center; gap: 1.6em; height: 2.6em; white-space: nowrap; }
.fx-store-nav__brand { font: 700 1.35em/1 var(--font-display); letter-spacing: -0.02em; }
.fx-store-nav__links { display: flex; gap: 1.2em; color: var(--color-graphite); }
.fx-store-nav__cart { position: relative; margin-left: auto; display: inline-flex; align-items: center; gap: 0.5em; font-weight: 500; }
.fx-store-nav__count { display: inline-grid; place-items: center; min-width: 1.6em; height: 1.6em; border-radius: 50%; background: var(--color-crimson); color: var(--color-white); font: 600 0.8em/1 var(--font-body); }

.fx-store-banner { position: relative; height: 11.5em; }
.fx-store-banner__fitted { position: relative; display: grid; align-content: center; gap: 1em; height: 11.5em; padding: 1.6em 46% 1.6em 1.8em; overflow: clip; border-radius: var(--fx-r-sm); background: var(--color-ink); color: var(--color-paper); }
.fx-store-banner__head { display: grid; overflow: clip; font: 700 1.9em/1 var(--font-display); letter-spacing: -0.035em; }
.fx-store-banner__head > span { grid-area: 1 / 1; }
.fx-store-banner__cta { justify-self: start; padding: 0.7em 1em; border-radius: var(--fx-r-sm); background: var(--color-paper); color: var(--color-ink); font-weight: 600; font-size: 0.9em; }
.fx-store-banner__art { position: absolute; right: 6%; bottom: 0; display: flex; align-items: end; gap: 0.4em; width: 38%; }
.fx-store-banner__art .fx-vessel { width: 50%; }
.fx-store-banner__art .fx-vessel:first-child { width: 58%; }

.fx-store-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.9em; }
.fx-tile { position: relative; height: 12.5em; }
.fx-tile__fitted { display: grid; gap: 0.5em; }
.fx-tile__art { position: relative; display: grid; place-items: end center; aspect-ratio: 1 / 1.05; padding: 0.9em 0.9em 0.5em; border-radius: var(--fx-r-sm); background: var(--color-paper); }
.fx-tile__art .fx-vessel { width: 74%; }
.fx-tile__sub { position: absolute; top: 0.6em; left: 0.6em; padding: 0.35em 0.5em; border-radius: var(--fx-r-sm); background: var(--color-crimson); color: var(--color-white); font: 500 0.72em/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.04em; }
.fx-tile__meta { white-space: nowrap; overflow: hidden; display: flex; justify-content: space-between; gap: 0.4em; font-size: 0.95em; }
.fx-tile__name { font-weight: 500; }
.fx-tile__price { color: var(--color-graphite); font-variant-numeric: tabular-nums; }
.fx-tile__stars { white-space: nowrap; overflow: hidden; font: 400 0.78em/1 var(--font-mono); color: var(--color-graphite); letter-spacing: 0.02em; }

.fx-vessel { overflow: visible; }
.fx-vessel__shadow { fill: color-mix(in srgb, var(--color-ink) 12%, transparent); }
.fx-vessel__body { fill: var(--color-graphite); }
.fx-vessel__glaze { fill: color-mix(in srgb, var(--color-paper) 70%, var(--color-graphite)); }
.fx-vessel__handle { fill: none; stroke: var(--color-graphite); stroke-width: 4; stroke-linecap: round; }
.fx-vessel[data-tone="ink"] .fx-vessel__body { fill: var(--color-ink); }
.fx-vessel[data-tone="ink"] .fx-vessel__glaze { fill: color-mix(in srgb, var(--color-crimson) 75%, var(--color-ink)); }
.fx-vessel[data-tone="ink"] .fx-vessel__handle { stroke: var(--color-ink); }
.fx-vessel[data-tone="white"] .fx-vessel__body { fill: var(--color-white); stroke: var(--color-hairline); stroke-width: 1; }
.fx-vessel[data-tone="white"] .fx-vessel__glaze { fill: var(--color-hairline); }
.fx-store-banner .fx-vessel[data-tone="white"] .fx-vessel__body { fill: var(--color-paper); stroke: none; }
.fx-store-banner .fx-vessel__shadow { fill: color-mix(in srgb, var(--color-paper) 14%, transparent); }

/* Apps + wiring */
.fx-shop__wires { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.fx-shop__wires path { fill: none; stroke: var(--color-crimson); stroke-width: 0.22; stroke-dasharray: 1; stroke-dashoffset: 0; transition: stroke-dashoffset var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--i, 0) * var(--stagger) + 120ms); }
.fx-shop__apps { position: absolute; inset: 0; pointer-events: none; z-index: 2; }
.fx-app { position: absolute; display: inline-flex; align-items: center; gap: 0.55em; padding: 0.55em 0.75em; border-radius: var(--fx-r-sm); border: 1px solid var(--color-ink); background: var(--color-white); font: 500 max(10px, 1.9cqi)/1 var(--font-body); white-space: nowrap; box-shadow: 0 10px 22px -14px var(--fx-shadow-ink); }
.fx-app__glyph { display: inline-grid; place-items: center; width: 1.5em; height: 1.5em; border-radius: 3px; background: var(--color-ink); color: var(--color-paper); font-size: 0.9em; }
.fx-app__ok { width: 0.5em; height: 0.5em; border-radius: 50%; background: var(--color-crimson); }
.fx-app--reviews { left: 0; top: 27%; }
.fx-app--subscribe { left: 0; top: 59%; }
.fx-app--bookings { right: 0; top: 41%; }
.fx-app--email { right: 0; top: 75%; }

/* Orders + sign */
.fx-orders { position: absolute; right: 1.2em; bottom: 1.2em; z-index: 3; display: grid; gap: 0.5em; width: min(54%, 21em); }
.fx-order { display: grid; grid-template-columns: auto 1fr auto; grid-template-areas: "dot no total" "dot item city"; column-gap: 0.7em; row-gap: 0.25em; align-items: center; padding: 0.75em 0.9em; border-radius: var(--fx-r-sm); border: 1px solid color-mix(in srgb, var(--color-till) 40%, var(--color-white)); background: color-mix(in srgb, var(--color-till) 7%, var(--color-white)); box-shadow: 0 14px 28px -18px var(--fx-shadow-ink); }
.fx-order__dot { grid-area: dot; width: 0.65em; height: 0.65em; border-radius: 50%; background: var(--color-till); }
.fx-order__no { grid-area: no; font: 500 0.8em/1 var(--font-mono); color: var(--color-till); letter-spacing: 0.04em; }
.fx-order__item { grid-area: item; font-size: 0.92em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.fx-order__total { grid-area: total; font-weight: 600; font-variant-numeric: tabular-nums; }
.fx-order__city { grid-area: city; font-size: 0.85em; color: var(--color-graphite); }

.fx-sign { position: absolute; z-index: 4; top: 5.5em; right: 6.4em; display: grid; justify-items: center; perspective: 40em; }
.fx-sign__string { width: 4.2em; height: 1.4em; border: 1px solid var(--color-ink); border-bottom: 0; border-radius: 3em 3em 0 0; transform: translateY(0.2em); }
.fx-sign__card { position: relative; display: grid; transform-style: preserve-3d; transition: transform var(--dur-slow) var(--ease-out-expo); }
.fx-sign__face { grid-area: 1 / 1; padding: 0.55em 1.1em; border-radius: var(--fx-r-sm); font: 700 1.05em/1 var(--font-display); letter-spacing: 0.14em; text-transform: uppercase; backface-visibility: hidden; }
.fx-sign__face--open { background: var(--color-till); color: var(--color-white); }
.fx-sign__face--closed { background: var(--color-white); color: var(--color-ink); border: 1px solid var(--color-ink); transform: rotateY(180deg); }

/* Readout */
.fx-readout { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-inline: 7cqi; border: 1px solid var(--fx-line); border-radius: var(--fx-r); background: var(--color-white); }
.fx-readout__cell { position: relative; display: grid; gap: 6px; padding: 12px 14px; }
.fx-readout__cell + .fx-readout__cell { border-left: 1px solid var(--fx-line); }
.fx-readout__cell dt { color: var(--color-graphite); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fx-readout__cell dd { white-space: nowrap; font: 600 clamp(18px, 1.7vw, 24px)/1 var(--font-display); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.fx-readout__bar { position: absolute; left: 14px; right: 14px; bottom: 8px; height: 2px; background: var(--fx-line); }
.fx-readout__bar span { display: block; height: 100%; background: var(--color-crimson); transform-origin: left; transform: scaleX(var(--fx-load, 0.293)); }

/* ───────────────────────── Scene: live fit-out (JS + motion allowed) ───────────────────────── */

@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) {
  .fx-scene { height: 600vh; height: 600svh; }
  .fx-scene__stage { position: sticky; top: 0; height: 100vh; height: 100svh; padding-bottom: 24px; overflow: clip; transform-origin: 50% 40%; transform: scale(calc(1 - var(--fx-exit, 0) * 0.05)); opacity: calc(1 - var(--fx-exit, 0) * 0.55); }
  .fx-scene__grid { height: 100%; align-items: center; }
  .fx-scene__copy { display: grid; grid-template-areas: "stack"; gap: 0; align-self: center; }
  .fx-scene__copy > * { grid-area: stack; align-self: center; }
  .fx-sheet { align-content: start; }
  .fx-scene__stage { padding-top: calc(var(--fx-header) + 16px); }
  .fx-scene__shop { position: relative; top: auto; align-self: center; justify-self: end; width: min(100%, calc((100svh - var(--fx-header) - 150px) * 0.94)); }
  .fx-hero__cue { display: inline-flex; }
  .fx-scene + .fx-prices { margin-top: -50vh; margin-top: -50svh; }

  /* hero ⇄ sheet in one column */
  .fx-hero, .fx-sheet { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo), visibility 0s linear 0s; }
  .fx-scene:not([data-stage="0"]) .fx-hero { opacity: 0; transform: translateY(-32px); visibility: hidden; transition-delay: 0s, 0s, var(--dur-base); }
  .fx-scene[data-stage="0"] .fx-sheet { opacity: 0; transform: translateY(32px); visibility: hidden; transition-delay: 0s, 0s, var(--dur-base); }
  .fx-scene:not([data-stage="0"]) .fx-sheet { transition-delay: 140ms, 140ms, 0s; }
  .fx-scene[data-stage="0"] .fx-sheet__row { opacity: 0; transform: translateX(-16px); }
  .fx-sheet__row { transition-delay: calc(var(--i) * var(--stagger) + 160ms); }

  /* sheet: active row open, others closed; checks lock after each stage */
  .fx-sheet__detail { grid-template-rows: 0fr; }
  .fx-scene[data-stage="1"] [data-row="1"] .fx-sheet__detail,
  .fx-scene[data-stage="2"] [data-row="2"] .fx-sheet__detail,
  .fx-scene[data-stage="3"] [data-row="3"] .fx-sheet__detail,
  .fx-scene[data-stage="4"] [data-row="4"] .fx-sheet__detail,
  .fx-scene[data-stage="5"] [data-row="5"] .fx-sheet__detail { grid-template-rows: 1fr; }
  .fx-scene[data-stage="1"] [data-row="1"] .fx-sheet__bar,
  .fx-scene[data-stage="2"] [data-row="2"] .fx-sheet__bar,
  .fx-scene[data-stage="3"] [data-row="3"] .fx-sheet__bar,
  .fx-scene[data-stage="4"] [data-row="4"] .fx-sheet__bar,
  .fx-scene[data-stage="5"] [data-row="5"] .fx-sheet__bar { transform: scaleX(var(--fx-local, 0)); }
  .fx-scene[data-stage="1"] [data-row="1"],
  .fx-scene[data-stage="2"] [data-row="2"],
  .fx-scene[data-stage="3"] [data-row="3"],
  .fx-scene[data-stage="4"] [data-row="4"],
  .fx-scene[data-stage="5"] [data-row="5"] { background: var(--color-white); }
  .fx-sheet__check path { stroke-dashoffset: 1; }
  .fx-scene[data-reached~="2"] [data-row="1"] .fx-sheet__check path,
  .fx-scene[data-reached~="3"] [data-row="2"] .fx-sheet__check path,
  .fx-scene[data-reached~="4"] [data-row="3"] .fx-sheet__check path,
  .fx-scene[data-reached~="5"] [data-row="4"] .fx-sheet__check path,
  .fx-scene[data-reached~="5"] [data-row="5"] .fx-sheet__check path { stroke-dashoffset: 0; }
  .fx-scene:not([data-reached~="2"]) [data-row="2"] .fx-sheet__name,
  .fx-scene:not([data-reached~="3"]) [data-row="3"] .fx-sheet__name,
  .fx-scene:not([data-reached~="4"]) [data-row="4"] .fx-sheet__name,
  .fx-scene:not([data-reached~="5"]) [data-row="5"] .fx-sheet__name { color: var(--color-graphite); }

  /* ghost stage numeral */
  .fx-scene__ghost { position: absolute; z-index: -1; left: var(--fx-gutter); bottom: -0.12em; display: grid; overflow: clip; font: 700 clamp(160px, 26vw, 420px)/0.8 var(--font-display); letter-spacing: -0.06em; color: transparent; -webkit-text-stroke: 1px var(--color-hairline); pointer-events: none; }
  .fx-scene__ghost span { grid-area: 1 / 1; transform: translateY(105%); transition: transform var(--dur-slow) var(--ease-out-expo); }
  .fx-scene[data-stage="1"] [data-ghost="1"], .fx-scene[data-stage="2"] [data-ghost="2"],
  .fx-scene[data-stage="3"] [data-ghost="3"], .fx-scene[data-stage="4"] [data-ghost="4"], .fx-scene[data-stage="5"] [data-ghost="5"] { transform: none; }

  /* storefront parts snap in when their stage is reached */
  .fx-scene [data-fit] { transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-base) var(--ease-snap); transition-delay: calc(var(--i, 0) * var(--stagger)); }
  .fx-scene [data-slot] { transition: opacity var(--dur-fast) var(--ease-out), visibility 0s linear var(--dur-fast); }
  .fx-scene:not([data-reached~="1"]) [data-slot="1"],
  .fx-scene:not([data-reached~="2"]) [data-slot="2"],
  .fx-scene:not([data-reached~="4"]) [data-slot="4"] { opacity: 1; visibility: visible; transition-delay: 0s; }
  .fx-scene:not([data-reached~="1"]) [data-fit="1"],
  .fx-scene:not([data-reached~="2"]) [data-fit="2"],
  .fx-scene:not([data-reached~="3"]) [data-fit="3"],
  .fx-scene:not([data-reached~="4"]) [data-fit="4"],
  .fx-scene:not([data-reached~="5"]) [data-fit="5"] { opacity: 0; transform: translateY(-0.6em) scale(0.97); transition-delay: 0s; }
  .fx-scene:not([data-reached~="4"]) .fx-window__ship { transform: translateY(-100%); }
  .fx-scene:not([data-reached~="4"]) .fx-store-banner__real { transform: translateY(110%); }
  .fx-scene:not([data-reached~="4"]) [data-slot="4"].fx-store-banner__generic { transform: none; }
  .fx-scene[data-reached~="4"] .fx-store-banner__generic { transform: translateY(-110%); }
  .fx-store-banner__head > span { transition: transform var(--dur-slow) var(--ease-out-expo), opacity var(--dur-fast) var(--ease-out), visibility 0s; }
  .fx-window__ship { transition: transform var(--dur-base) var(--ease-snap), opacity var(--dur-fast) var(--ease-out); }
  .fx-scene:not([data-reached~="3"]) .fx-app--reviews, .fx-scene:not([data-reached~="3"]) .fx-app--subscribe { transform: translateX(-1.2em); }
  .fx-scene:not([data-reached~="3"]) .fx-app--bookings, .fx-scene:not([data-reached~="3"]) .fx-app--email { transform: translateX(1.2em); }
  .fx-scene:not([data-reached~="3"]) .fx-shop__wires path { stroke-dashoffset: 1; transition-delay: 0s; }
  .fx-app { translate: 0 calc((var(--fx-p, 0.5) - 0.5) * var(--depth, 1) * -36px); }
  .fx-app[data-depth="2"] { --depth: 2; }
  .fx-app[data-depth="3"] { --depth: 3; }
  .fx-scene .fx-order { transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-base) var(--ease-snap); transition-delay: calc(var(--i) * 420ms + 360ms); }
  .fx-scene:not([data-reached~="5"]) .fx-order { opacity: 0; transform: translateY(1em); transition-delay: 0s; }
  .fx-scene:not([data-reached~="5"]) .fx-orders { opacity: 1; transform: none; }
  .fx-scene:not([data-reached~="5"]) .fx-sign__card { transform: rotateY(180deg); }
  .fx-scene[data-reached~="5"] .fx-sign { animation: fx-sign-swing 1.4s var(--ease-out) both; transform-origin: 50% 0; }
  .fx-scene[data-reached~="5"][data-onscreen="true"] .fx-order:first-child .fx-order__dot { animation: fx-breathe 2.4s ease-in-out 1.2s infinite; }
  .fx-scene[data-reached~="5"] .fx-store-nav__count { animation: fx-pop var(--dur-base) var(--ease-snap) 600ms both; }
}

@keyframes fx-sign-swing { 0% { transform: rotate(0); } 30% { transform: rotate(-4deg); } 55% { transform: rotate(2deg); } 78% { transform: rotate(-0.8deg); } 100% { transform: rotate(0); } }
@keyframes fx-breathe { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.55); opacity: 0.6; } }
@keyframes fx-pop { from { transform: scale(0.4); } to { transform: scale(1); } }

/* ───────────────────────── Price list ───────────────────────── */

.fx-prices { z-index: 2; background: var(--color-paper); border-top: 1px solid var(--fx-line); }
.fx-prices::after { content: ""; position: absolute; left: 0; right: 0; top: -48px; height: 48px; background: linear-gradient(to top, color-mix(in srgb, var(--color-ink) 7%, transparent), transparent); pointer-events: none; }
.fx-shelf { position: relative; margin-bottom: 56px; }
.fx-shelf__rail { position: relative; height: 6px; border-radius: 2px; background: var(--color-ink); transform-origin: left; }
.fx-shelf__rail::before, .fx-shelf__rail::after { content: ""; position: absolute; top: 6px; width: 6px; height: 22px; background: var(--color-ink); }
.fx-shelf__rail::before { left: 0; }
.fx-shelf__rail::after { right: 0; }
.fx-shelf__tags { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; padding-top: 30px; }
.fx-shelf__tags > li { transform-origin: 88% -30px; }

.fx-tilt { position: relative; transform-style: preserve-3d; }
.fx-tag {
  position: relative; display: grid; gap: 14px; height: 100%; padding: 26px 24px 22px; border-radius: var(--fx-r); background: var(--color-white); border: 1px solid var(--fx-line);
  transform-origin: 88% 0; transition: transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
}
.fx-tag::before { content: ""; position: absolute; top: -31px; right: calc(12% - 0.5px); width: 1px; height: 31px; background: var(--color-ink); }
.fx-tag::after, .fx-plan::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; background: radial-gradient(320px circle at var(--fx-sx, 50%) var(--fx-sy, 0%), color-mix(in srgb, var(--color-crimson) 9%, transparent), transparent 70%); transition: opacity var(--dur-base) var(--ease-out); }
.fx-tag__hole { position: absolute; top: 12px; right: calc(12% - 6px); width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--color-ink); background: var(--color-paper); }
.fx-tag__top { display: flex; gap: 12px; align-items: center; padding-right: 28px; }
.fx-tag__sku { color: var(--color-crimson); font-weight: 500; }
.fx-tag__stage { color: var(--color-graphite); }
.fx-tag__name { font-size: clamp(22px, 2vw, 28px); }
.fx-tag__price { display: flex; align-items: baseline; gap: 8px; font: 700 clamp(40px, 4.2vw, 60px)/1 var(--font-display); letter-spacing: -0.045em; font-variant-numeric: tabular-nums; }
.fx-tag__unit { font: 400 11px/1 var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-graphite); }
.fx-tag__blurb { font-size: 15px; color: var(--color-graphite); }
.fx-tag__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 14px; border-top: 1px dashed var(--fx-line); color: var(--color-graphite); }

.fx-add { position: relative; display: inline-flex; min-height: 34px; padding: 0 12px; align-items: center; overflow: hidden; border-radius: var(--fx-r-sm); border: 1px solid var(--color-ink); color: var(--color-ink); font: 500 10.5px/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.fx-add__roll { display: grid; overflow: clip; }
.fx-add__label { grid-area: 1 / 1; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-add__label--on { transform: translateY(120%); }
.fx-add[aria-pressed="true"] { background: var(--color-ink); color: var(--color-paper); }
.fx-add[aria-pressed="true"] .fx-add__label:first-child { transform: translateY(-120%); }
.fx-add[aria-pressed="true"] .fx-add__label--on { transform: none; }
.fx-add:active { transform: scale(0.95); }

/* ───────────────────────── Work ───────────────────────── */

.fx-work { padding-block: clamp(24px, 3vw, 40px); }
.fx-work__slab { position: relative; margin-inline: clamp(8px, 1.4vw, 20px); padding-block: clamp(80px, 9vw, 140px); border-radius: 14px; background: var(--color-ink); color: var(--color-paper); overflow: clip; }
.fx-work__slab::before { content: ""; position: absolute; inset: 0 max(var(--fx-gutter), calc((100% - var(--fx-container)) / 2 + var(--fx-gutter))); background-image: repeating-linear-gradient(90deg, color-mix(in srgb, var(--color-paper) 7%, transparent) 0 1px, transparent 1px calc(100% / 12)); pointer-events: none; }
.fx-work .fx-eyebrow { color: color-mix(in srgb, var(--color-paper) 70%, var(--color-ink)); }
.fx-work .fx-eyebrow span:first-child { color: color-mix(in srgb, var(--color-crimson) 60%, var(--color-paper)); }
.fx-work__grid { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; }
.fx-work__tabs { --tab-h: 96px; position: relative; grid-column: 1 / span 4; display: grid; grid-auto-rows: var(--tab-h); align-content: start; border-left: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent); }
.fx-work__tab-indicator { position: absolute; left: -1px; top: 0; width: 2px; height: var(--tab-h); background: var(--color-crimson); transform: translateY(calc(var(--tab) * 100%)); transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-work__tab { display: grid; align-content: center; gap: 6px; padding: 0 22px; text-align: left; color: color-mix(in srgb, var(--color-paper) 62%, var(--color-ink)); border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 10%, transparent); transition: color var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out); }
.fx-work__tab[aria-selected="true"] { color: var(--color-paper); }
.fx-work__tab .fx-mono { color: color-mix(in srgb, var(--color-crimson) 60%, var(--color-paper)); }
.fx-work__tab-name { font: 600 22px/1.1 var(--font-display); letter-spacing: -0.02em; }
.fx-work__tab-meta { font-size: 13.5px; }
.fx-work__tab:active { background: color-mix(in srgb, var(--color-paper) 6%, transparent); }
.fx-work__panel { grid-column: 6 / span 7; display: grid; gap: 28px; align-content: start; }
.fx-work__panel-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 14px; }
.fx-work__panel-head h3 { font-size: clamp(30px, 3.4vw, 48px); }
.fx-work__fitted { display: flex; flex-wrap: wrap; gap: 6px; }
.fx-work__fitted li { padding: 6px 9px; border: 1px solid color-mix(in srgb, var(--color-paper) 24%, transparent); border-radius: var(--fx-r-sm); font: 400 10.5px/1 var(--font-mono); letter-spacing: 0.04em; text-transform: uppercase; }
.fx-work__quote { max-width: 46ch; font: 500 clamp(19px, 1.8vw, 24px)/1.35 var(--font-body); letter-spacing: -0.01em; }
.fx-work__toggle, .fx-cycle { position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; justify-self: start; padding: 3px; border-radius: 6px; border: 1px solid currentColor; }
.fx-work__toggle button, .fx-cycle button { position: relative; z-index: 1; min-height: 36px; padding: 0 18px; border-radius: var(--fx-r-sm); font: 500 13.5px/1 var(--font-body); transition: color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.fx-work__toggle button:active, .fx-cycle button:active { transform: scale(0.96); }
.fx-work__toggle-thumb, .fx-cycle__thumb { position: absolute; top: 3px; bottom: 3px; left: 3px; width: calc(50% - 3px); border-radius: var(--fx-r-sm); transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-work__toggle-thumb { background: var(--color-paper); }
.fx-work__toggle[data-mode="after"] .fx-work__toggle-thumb, .fx-cycle[data-cycle="annual"] .fx-cycle__thumb { transform: translateX(100%); }
.fx-work__toggle button[aria-pressed="true"] { color: var(--color-ink); }
.fx-work__metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; padding-top: 24px; border-top: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent); }
.fx-metric { display: grid; gap: 12px; }
.fx-metric__label { color: color-mix(in srgb, var(--color-paper) 70%, var(--color-ink)); }
.fx-metric__value { font: 700 clamp(32px, 3.6vw, 54px)/1 var(--font-display); letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.fx-metric__bar { height: 3px; background: color-mix(in srgb, var(--color-paper) 14%, transparent); }
.fx-metric__bar span { display: block; height: 100%; background: color-mix(in srgb, var(--color-paper) 55%, var(--color-ink)); transform-origin: left; transform: scaleX(var(--scale)); transition: transform var(--dur-slow) var(--ease-out-expo), background-color var(--dur-fast) var(--ease-out); transition-delay: calc(var(--i) * var(--stagger)); }
.fx-metric[data-better="true"] .fx-metric__bar span { background: var(--color-crimson); }

/* ───────────────────────── Schedule ───────────────────────── */

.fx-section-head--split { max-width: none; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; }
.fx-section-head--split > .fx-eyebrow, .fx-section-head--split > h2 { grid-column: 1 / span 7; }
.fx-section-head--split > .fx-section-lead { grid-column: 8 / span 5; align-self: end; }
.fx-gantt { --label-w: clamp(120px, 16vw, 220px); position: relative; padding: 18px 0 8px; border-top: 1px solid var(--color-ink); }
.fx-gantt__weeks, .fx-gantt__row { display: grid; grid-template-columns: var(--label-w) repeat(5, minmax(0, 1fr)); align-items: center; }
.fx-gantt__weeks { padding-bottom: 12px; color: var(--color-graphite); }
.fx-gantt__weeks span { padding-left: 10px; border-left: 1px solid var(--fx-line); }
.fx-gantt__weeks span:first-child { border: 0; }
.fx-gantt__row { min-height: 60px; border-top: 1px solid var(--fx-line); transition: background-color var(--dur-fast) var(--ease-out); }
.fx-gantt__label { display: flex; gap: 12px; align-items: baseline; font: 600 18px/1.1 var(--font-display); letter-spacing: -0.02em; }
.fx-gantt__label .fx-mono { color: var(--color-crimson); }
.fx-gantt__track { grid-column: 2 / -1; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); align-items: center; height: 100%; }
.fx-gantt__bar { display: flex; align-items: center; height: 34px; margin: 0 4px; padding: 0 12px; overflow: hidden; border-radius: var(--fx-r-sm); background: var(--color-ink); color: var(--color-paper); transform-origin: left; transition: transform var(--dur-slow) var(--ease-snap), background-color var(--dur-fast) var(--ease-out); transition-delay: calc(var(--i) * 90ms + 200ms); }
.fx-gantt__row:last-child .fx-gantt__bar { background: var(--color-crimson); }
.fx-gantt__bar-text { font: 500 13px/1 var(--font-body); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fx-gantt__marker { position: absolute; top: 8px; bottom: 44px; left: var(--label-w); right: 0; overflow: clip; overflow-clip-margin: 12px; pointer-events: none; }
.fx-gantt__marker-line { position: absolute; inset: 0; transform: translateX(calc(clamp(0, (var(--fx-pass, 0.72) - 0.3) * 2.4, 1) * 100%)); }
.fx-gantt__marker-line::before { content: ""; position: absolute; top: 18px; bottom: 0; left: 0; width: 1.5px; background: var(--color-crimson); }
.fx-gantt__marker-line .fx-mono { position: absolute; top: 0; left: 0; transform: translateX(-50%); padding: 2px 6px; border-radius: 3px; background: var(--color-crimson); color: var(--color-white); }
.fx-gantt__after { padding-top: 18px; color: var(--color-graphite); text-align: right; }

/* ───────────────────────── Care plans ───────────────────────── */

.fx-cycle__thumb { background: var(--color-ink); }
.fx-cycle button[aria-pressed="true"] { color: var(--color-paper); }
.fx-cycle__save { margin-left: 4px; font: 500 10px/1 var(--font-mono); color: var(--color-crimson); }
.fx-cycle button[aria-pressed="true"] .fx-cycle__save { color: color-mix(in srgb, var(--color-crimson) 45%, var(--color-paper)); }
.fx-plans__list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.fx-plans__list > li { display: grid; }
.fx-plan { border-radius: var(--fx-r); transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-plan::before { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 30px 60px -30px var(--fx-shadow-ink); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.fx-plan__inner { position: relative; display: flex; flex-direction: column; gap: 16px; height: 100%; padding: 28px 26px; border-radius: var(--fx-r); border: 1px solid var(--fx-line); background: var(--color-white); }
.fx-plan__inner[data-featured="true"] { background: var(--color-ink); color: var(--color-paper); border-color: var(--color-ink); }
.fx-plan__top { display: flex; justify-content: space-between; align-items: center; min-height: 22px; }
.fx-plan__code { color: var(--color-crimson); }
.fx-plan__inner[data-featured="true"] .fx-plan__code { color: color-mix(in srgb, var(--color-crimson) 55%, var(--color-paper)); }
.fx-plan__badge { padding: 5px 8px; border-radius: 3px; background: var(--color-crimson); color: var(--color-white); }
.fx-plan__name { font-size: clamp(28px, 2.6vw, 36px); }
.fx-plan__pitch { font-size: 15px; color: var(--color-graphite); min-height: 3em; }
.fx-plan__inner[data-featured="true"] .fx-plan__pitch { color: color-mix(in srgb, var(--color-paper) 72%, var(--color-ink)); }
.fx-plan__price { display: flex; align-items: baseline; gap: 8px; overflow: clip; padding-top: 10px; border-top: 1px solid currentColor; border-color: color-mix(in srgb, currentColor 18%, transparent); }
.fx-plan__amount { display: inline-block; font: 700 clamp(46px, 4.4vw, 64px)/1 var(--font-display); letter-spacing: -0.045em; font-variant-numeric: tabular-nums; }
.fx-plan__per { color: var(--color-graphite); }
.fx-plan__inner[data-featured="true"] .fx-plan__per, .fx-plan__inner[data-featured="true"] .fx-plan__billed { color: color-mix(in srgb, var(--color-paper) 70%, var(--color-ink)); }
.fx-plan__billed { color: var(--color-graphite); }
.fx-plan__includes { display: grid; gap: 10px; padding-block: 8px 12px; }
.fx-plan__includes li:not(.fx-mono) { position: relative; padding-left: 20px; font-size: 15px; }
.fx-plan__includes li:not(.fx-mono)::before { content: ""; position: absolute; left: 0; top: 0.65em; width: 10px; height: 1.5px; background: var(--color-crimson); }
.fx-plan__cta { margin-top: auto; }
.fx-plan__inner[data-featured="true"] .fx-button--primary .fx-button__fill { background: var(--color-paper); }
.fx-plan__inner[data-featured="true"] .fx-button--primary:focus-visible { color: var(--color-ink); }

/* ───────────────────────── FAQ ───────────────────────── */

.fx-faq__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; }
.fx-faq__head { grid-column: 1 / span 4; align-self: start; position: sticky; top: calc(var(--fx-header) + 32px); display: grid; gap: 22px; }
.fx-faq__list { grid-column: 6 / span 7; border-top: 1px solid var(--color-ink); }
.fx-faq__item { border-bottom: 1px solid var(--fx-line); }
.fx-faq__item h3 { font: inherit; letter-spacing: normal; }
.fx-faq__q { display: grid; grid-template-columns: 34px 1fr 24px; gap: 12px; align-items: center; width: 100%; padding: 22px 0; text-align: left; }
.fx-faq__q .fx-mono { color: var(--color-crimson); }
.fx-faq__q-text { position: relative; justify-self: start; font: 600 clamp(18px, 1.6vw, 21px)/1.25 var(--font-display); letter-spacing: -0.015em; }
.fx-faq__q-text::after { content: ""; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-faq__icon { position: relative; width: 16px; height: 16px; justify-self: end; transition: transform var(--dur-base) var(--ease-out-expo); }
.fx-faq__icon::before, .fx-faq__icon::after { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1.5px; margin-top: -0.75px; background: currentColor; }
.fx-faq__icon::after { transform: rotate(90deg); }
.fx-faq__q[aria-expanded="true"] .fx-faq__icon { transform: rotate(45deg); }
.fx-faq__q[aria-expanded="true"] .fx-faq__icon::before, .fx-faq__q[aria-expanded="true"] .fx-faq__icon::after { background: var(--color-crimson); }
.fx-faq__q:focus-visible .fx-faq__q-text::after { transform: scaleX(1); transform-origin: left; }
.fx-faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-base) var(--ease-snap); }
.fx-faq__a[data-open="true"] { grid-template-rows: 1fr; }
.fx-faq__a > div { overflow: hidden; }
.fx-faq__a p { max-width: 60ch; padding: 0 36px 24px 46px; color: var(--color-graphite); opacity: 0; transform: translateY(-6px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out-expo); }
.fx-faq__a[data-open="true"] p { opacity: 1; transform: none; transition-delay: 80ms; }

/* ───────────────────────── Book ───────────────────────── */

.fx-book__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: start; }
.fx-book__copy { grid-column: 1 / span 5; display: grid; gap: 40px; }
.fx-book__copy > [data-reveal] { display: grid; gap: 22px; }
.fx-book__steps { display: grid; border-top: 1px solid var(--color-ink); }
.fx-book__steps li { display: grid; grid-template-columns: 34px 1fr; gap: 12px; padding: 18px 0; border-bottom: 1px solid var(--fx-line); }
.fx-book__steps .fx-mono { color: var(--color-crimson); padding-top: 4px; }
.fx-book__steps p { font-size: 15px; color: var(--color-graphite); }
.fx-book__steps .fx-book__step-title { font: 600 19px/1.2 var(--font-display); color: var(--color-ink); letter-spacing: -0.015em; margin-bottom: 4px; }
.fx-book__form { grid-column: 7 / span 6; }

.fx-form-card { position: relative; padding: clamp(20px, 3vw, 36px); border-radius: var(--fx-r); border: 1px solid var(--fx-line); background: var(--color-white); box-shadow: 0 40px 80px -50px var(--fx-shadow-ink); }
.fx-form { display: grid; gap: 18px; }
.fx-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fx-field { position: relative; display: grid; }
.fx-field input, .fx-field textarea { width: 100%; height: 58px; padding: 24px 14px 8px; border: 1px solid var(--fx-line); border-radius: var(--fx-r-sm); background: var(--color-white); font-size: 16px; color: var(--color-ink); outline: none; transition: border-color var(--dur-fast) var(--ease-out); }
.fx-field textarea { height: auto; min-height: 104px; padding-top: 28px; resize: vertical; line-height: 1.45; }
.fx-field label { position: absolute; left: 15px; top: 19px; font-size: 15.5px; color: var(--color-graphite); pointer-events: none; transform-origin: left top; transition: transform var(--dur-base) var(--ease-out-expo), color var(--dur-fast) var(--ease-out); }
.fx-field input:focus + label, .fx-field input:not(:placeholder-shown) + label, .fx-field textarea:focus + label, .fx-field textarea:not(:placeholder-shown) + label { transform: translateY(-10px) scale(0.76); }
.fx-field input:focus + label, .fx-field textarea:focus + label { color: var(--color-crimson); }
.fx-field::after { content: ""; position: absolute; left: 1px; right: 1px; top: 56px; height: 2px; background: var(--color-crimson); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-base) var(--ease-out-expo); pointer-events: none; }
.fx-field--area::after { display: none; }
.fx-field:focus-within::after { transform: scaleX(1); }
.fx-field input:hover, .fx-field textarea:hover { border-color: color-mix(in srgb, var(--color-ink) 45%, var(--color-hairline)); }
.fx-field input:focus, .fx-field textarea:focus { border-color: var(--color-ink); }
.fx-field textarea:focus { box-shadow: inset 0 -2px 0 var(--color-crimson); }
.fx-field--prefixed input { padding-left: 94px; }
.fx-field__prefix { position: absolute; left: 15px; top: 31px; font: 400 13px/1 var(--font-mono); color: var(--color-graphite); opacity: 0; transition: opacity var(--dur-fast) var(--ease-out); pointer-events: none; }
.fx-field--prefixed:focus-within .fx-field__prefix, .fx-field--prefixed:has(input:not(:placeholder-shown)) .fx-field__prefix { opacity: 1; }
.fx-field[data-invalid="true"] input, .fx-field[data-invalid="true"] textarea { border-color: var(--color-crimson); }
.fx-field__error { font-size: 13.5px; color: var(--color-crimson); }
.fx-field__error:empty { display: none; }
.fx-field__error:not(:empty) { margin-top: 6px; animation: fx-error-in var(--dur-base) var(--ease-out-expo) both; }

.fx-choices { display: grid; gap: 10px; }
.fx-choices legend { margin-bottom: 10px; color: var(--color-graphite); }
.fx-choices__list { display: flex; flex-wrap: wrap; gap: 8px; }
.fx-chip { position: relative; display: inline-flex; cursor: pointer; }
.fx-chip input { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; opacity: 0; margin: 0; cursor: pointer; }
.fx-chip span { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 13px; border: 1px solid var(--fx-line); border-radius: var(--fx-r-sm); background: var(--color-white); font-size: 14.5px; transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.fx-chip b { font: 500 10px/1 var(--font-mono); color: var(--color-crimson); }
.fx-chip input:checked + span { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-paper); }
.fx-chip input:checked + span b { color: color-mix(in srgb, var(--color-crimson) 50%, var(--color-paper)); }
.fx-chip input:focus-visible + span { outline: 2px solid var(--color-crimson); outline-offset: 2px; }
.fx-chip:active span { transform: scale(0.96); }
.fx-choices[data-invalid="true"] .fx-chip span { border-color: color-mix(in srgb, var(--color-crimson) 60%, var(--color-hairline)); }

.fx-form__foot { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 20px; padding-top: 6px; }
.fx-form__note { flex: 1 1 220px; font-size: 13.5px; color: var(--color-graphite); }
.fx-submit { min-width: 236px; }
.fx-submit__label, .fx-submit__busy { transition: transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-fast) var(--ease-out); }
.fx-submit__busy { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 10px; transform: translateY(110%); }
.fx-submit__busy i { width: 10px; height: 10px; border: 1.5px solid currentColor; }
.fx-submit[data-state="sending"] .fx-submit__label { transform: translateY(-160%); }
.fx-submit[data-state="sending"] .fx-submit__busy { transform: none; }
.fx-submit[data-state="sending"] .fx-button__fill { clip-path: inset(0); }

.fx-slip { position: relative; display: grid; gap: 16px; outline: none; }
.fx-slip__head { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--color-ink); color: var(--color-graphite); }
.fx-slip__head .fx-mono:last-child { color: var(--color-crimson); }
.fx-slip__title { font-size: clamp(28px, 3vw, 40px); max-width: 12ch; }
.fx-slip__lead { color: var(--color-graphite); max-width: 42ch; }
.fx-slip__rows { display: grid; border-top: 1px dashed var(--fx-line); }
.fx-slip__row { display: flex; justify-content: space-between; gap: 16px; padding: 11px 0; border-bottom: 1px dashed var(--fx-line); font-size: 15px; }
.fx-slip__row dt { color: var(--color-graphite); }
.fx-slip__row dd { font-weight: 500; text-align: right; font-variant-numeric: tabular-nums; }
.fx-slip__stamp { position: absolute; top: 44px; right: 0; padding: 8px 14px; border: 2px solid var(--color-crimson); border-radius: var(--fx-r-sm); color: var(--color-crimson); font: 700 20px/1 var(--font-display); letter-spacing: 0.16em; text-transform: uppercase; transform: rotate(-8deg); }
.fx-slip .fx-link-button { justify-self: start; }

/* ───────────────────────── Footer ───────────────────────── */

.fx-footer { position: relative; z-index: 1; overflow: clip; background: var(--color-ink); color: var(--color-paper); padding-bottom: 28px; }
.fx-footer__ticker { padding-block: 26px; border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 14%, transparent); }
.fx-footer__word { font: 600 clamp(40px, 6vw, 84px)/1 var(--font-display); letter-spacing: -0.04em; }
.fx-footer__sep { margin-inline: 28px; font: 500 11px/1 var(--font-mono); color: color-mix(in srgb, var(--color-crimson) 60%, var(--color-paper)); align-self: center; }
.fx-footer__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; padding-block: 64px 48px; }
.fx-footer__col { display: grid; gap: 12px; align-content: start; font-size: 15px; color: color-mix(in srgb, var(--color-paper) 78%, var(--color-ink)); }
.fx-footer__col > .fx-mono { color: color-mix(in srgb, var(--color-crimson) 60%, var(--color-paper)); }
.fx-footer .fx-status { color: color-mix(in srgb, var(--color-paper) 70%, var(--color-ink)); }
.fx-footer .fx-status[data-open="true"] .fx-status__label { color: color-mix(in srgb, var(--color-till) 45%, var(--color-paper)); }
.fx-footer .fx-status[data-open="true"] .fx-status__dot { background: color-mix(in srgb, var(--color-till) 60%, var(--color-paper)); }
.fx-footer__links { display: grid; gap: 8px; }
.fx-footer__links a { position: relative; justify-self: start; padding-bottom: 2px; color: var(--color-paper); }
.fx-footer__base { display: grid; gap: 20px; }
.fx-footer__word-big { display: flex; align-items: center; gap: clamp(12px, 2vw, 28px); font: 700 clamp(64px, 17vw, 260px)/0.8 var(--font-display); letter-spacing: -0.06em; }
.fx-footer__mark { width: 0.62em; height: 0.62em; flex: none; }
.fx-footer__legal { color: color-mix(in srgb, var(--color-paper) 60%, var(--color-ink)); }

.fx-marquee { overflow: clip; }
.fx-marquee__track { display: flex; width: max-content; }
.fx-marquee__group { display: flex; align-items: center; padding-right: 28px; }

.fx-placeholder { display: grid; place-items: center; min-height: 220px; border: 1px dashed var(--color-graphite); border-radius: var(--fx-r); color: var(--color-graphite); }

/* ───────────────────────── Motion (only when motion is welcome) ───────────────────────── */

@media (prefers-reduced-motion: no-preference) {
  /* Load choreography: CSS only, so it runs before hydration and never shifts layout. */
  .fx-gridlines span { animation: fx-draw-y var(--dur-hero) var(--ease-in-out) both; }
  .fx-header__inner > * { animation: fx-drop var(--dur-slow) var(--ease-out-expo) both; }
  .fx-header__inner > :nth-child(1) { animation-delay: 120ms; }
  .fx-header__inner > :nth-child(2) { animation-delay: 170ms; }
  .fx-header__inner > :nth-child(3) { animation-delay: 220ms; }
  .fx-header__inner > :nth-child(4) { animation-delay: 270ms; }
  .fx-header__inner > :nth-child(5) { animation-delay: 270ms; }
  .fx-header__link { animation: fx-drop var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(170ms + var(--i) * 50ms); }
  .fx-load .fx-split__inner { animation: fx-rise-mask var(--dur-hero) var(--ease-out-expo) both; animation-delay: calc(var(--split-delay, 0ms) + var(--line) * 90ms); }
  .fx-load__eyebrow { animation: fx-slide-in var(--dur-slow) var(--ease-out-expo) 160ms both; }
  .fx-load__item { animation: fx-rise var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(520ms + var(--i) * 80ms); }
  .fx-load__shop .fx-window { animation: fx-wipe-down 900ms var(--ease-in-out) 640ms both; }
  .fx-load__shop .fx-readout { animation: fx-rise var(--dur-slow) var(--ease-out-expo) 880ms both; }
  .fx-load__shop .fx-slot { animation: fx-fade 500ms var(--ease-out) 1100ms both; }
  .fx-hero__cue-line::after { animation: fx-cue 2.2s var(--ease-in-out) 1.4s infinite; }
  .fx-status[data-open="true"] .fx-status__dot::after { animation: fx-ring 2.6s var(--ease-out) 900ms infinite; }

  /* Reveals: the hidden state exists only here. */
  [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo), clip-path var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="rise"][data-in="false"] { opacity: 0; transform: translateY(var(--reveal-shift)); }
  [data-reveal="slide"][data-in="false"] { opacity: 0; transform: translateX(-24px); }
  [data-reveal="scale"][data-in="false"] { opacity: 0; transform: translateY(32px) scale(0.96); }
  [data-reveal="hang"] { transition-timing-function: var(--ease-out), var(--ease-snap), var(--ease-in-out); transition-delay: calc(var(--i) * 90ms + 200ms); }
  [data-reveal="hang"][data-in="false"] { opacity: 0; transform: translateY(-28px) rotate(-3deg); }
  [data-reveal="draw"][data-in="false"] { transform: scaleX(0); }
  /* The wipe clips the child: IntersectionObserver ignores fully clipped targets, so the observed element stays unclipped. */
  [data-reveal="wipe"] > * { transition: clip-path var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="wipe"][data-in="false"] > * { clip-path: inset(0 0 100% 0 round var(--fx-r)); }
  [data-reveal] .fx-split__inner { transition: transform var(--dur-hero) var(--ease-out-expo); transition-delay: calc(120ms + var(--line) * 90ms); }
  [data-reveal][data-in="false"] .fx-split__inner { transform: translateY(110%); }
  .fx-gantt[data-in="false"] .fx-gantt__bar { transform: scaleX(0); }
  .fx-work__panel[data-dir="next"] { animation: fx-panel-next var(--dur-slow) var(--ease-out-expo) both; }
  .fx-work__panel[data-dir="prev"] { animation: fx-panel-prev var(--dur-slow) var(--ease-out-expo) both; }
  .fx-plan__amount { animation: fx-roll-in var(--dur-base) var(--ease-out-expo) both; }
  .fx-field[data-shake="0"] input, .fx-field[data-shake="0"] textarea, .fx-choices[data-shake="0"] .fx-choices__list { animation: fx-shake-a 280ms var(--ease-out) both; }
  .fx-field[data-shake="1"] input, .fx-field[data-shake="1"] textarea, .fx-choices[data-shake="1"] .fx-choices__list { animation: fx-shake-b 280ms var(--ease-out) both; }
  .fx-submit__busy i { animation: fx-spin 900ms linear infinite; }
  .fx-slip { animation: fx-wipe-down var(--dur-slow) var(--ease-in-out) both; }
  .fx-slip__row { animation: fx-print var(--dur-base) var(--ease-snap) both; animation-delay: calc(360ms + var(--i) * 90ms); }
  .fx-slip__stamp { animation: fx-stamp 420ms var(--ease-snap) 1100ms both; }
  .fx-marquee__track { animation: fx-marquee 42s linear infinite; animation-play-state: paused; }
  .fx-marquee[data-play="true"] .fx-marquee__track { animation-play-state: running; }
  .fx-marquee:hover .fx-marquee__track, .fx-marquee:focus-within .fx-marquee__track { animation-play-state: paused; }

  /* Work slab opens from a framed card to full bleed as it enters (scroll-driven where supported). */
  @supports (animation-timeline: view()) {
    .fx-work__slab { animation: fx-slab-open linear both; animation-timeline: view(); animation-range: entry 0% entry 80%; }
  }
}

@keyframes fx-draw-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes fx-drop { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
@keyframes fx-rise-mask { from { transform: translateY(110%); } to { transform: none; } }
@keyframes fx-rise { from { opacity: 0; transform: translateY(var(--reveal-shift)); } to { opacity: 1; transform: none; } }
@keyframes fx-slide-in { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: none; } }
@keyframes fx-wipe-down { from { clip-path: inset(0 0 100% 0 round var(--fx-r)); } to { clip-path: inset(0 0 0 0 round var(--fx-r)); } }
@keyframes fx-fade { from { opacity: 0; } }
@keyframes fx-cue { 0% { transform: translateX(-100%) scaleX(0.3); } 60%, 100% { transform: translateX(340%) scaleX(0.3); } }
@keyframes fx-ring { 0% { opacity: 0.7; transform: scale(0.6); } 80%, 100% { opacity: 0; transform: scale(1.6); } }
@keyframes fx-panel-next { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: none; } }
@keyframes fx-panel-prev { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: none; } }
@keyframes fx-roll-in { from { opacity: 0; transform: translateY(60%); } to { opacity: 1; transform: none; } }
@keyframes fx-shake-a { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
@keyframes fx-shake-b { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
@keyframes fx-error-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@keyframes fx-spin { to { transform: rotate(360deg); } }
@keyframes fx-print { from { opacity: 0; clip-path: inset(0 0 100% 0); transform: translateY(-6px); } to { opacity: 1; clip-path: inset(0); transform: none; } }
@keyframes fx-stamp { from { opacity: 0; transform: scale(1.7) rotate(-16deg); } to { opacity: 1; transform: scale(1) rotate(-8deg); } }
@keyframes fx-marquee { to { transform: translateX(-50%); } }
@keyframes fx-slab-open { from { clip-path: inset(6% 4% 0 4% round 24px); } to { clip-path: inset(0 0 0 0 round 14px); } }

/* ───────────────────────── Hover (fine pointers only) ───────────────────────── */

@media (hover: hover) and (pointer: fine) {
  .fx-button:hover .fx-button__fill { clip-path: inset(0); }
  .fx-button--ghost:hover { color: var(--color-paper); }
  .fx-button:hover .fx-button__roll > span:first-child { transform: translateY(-110%); }
  .fx-button:hover .fx-button__roll > span + span { transform: none; }
  .fx-button:hover .fx-button__arrow { transform: translateX(4px); }
  .fx-plan__inner[data-featured="true"] .fx-button--primary:hover { color: var(--color-ink); }
  .fx-link-button:hover::after, .fx-footer__links a:hover::after { transform: scaleX(1); transform-origin: left; }
  .fx-sheet__row:hover { background: var(--color-white); }
  .fx-sheet__link:hover .fx-sheet__name { color: var(--color-ink); }
  /* Lift and swing from the hole, but no pointer tilt: the card must not move under its own button. */
  .fx-tag:hover { transform: translateY(-6px) rotate(-1.2deg); border-color: color-mix(in srgb, var(--color-ink) 40%, var(--color-hairline)); }
  .fx-tag:hover::after, .fx-plan:hover::after { opacity: 1; }
  .fx-shelf__tags:has(.fx-tag:hover) .fx-tag:not(:hover) { opacity: 0.6; }
  .fx-add:hover { background: var(--color-ink); color: var(--color-paper); }
  .fx-work__tab:hover { color: var(--color-paper); background: color-mix(in srgb, var(--color-paper) 4%, transparent); }
  .fx-gantt__row:hover { background: var(--color-white); }
  .fx-gantt__row:hover .fx-gantt__bar { transform: translateY(-2px); }
  .fx-plan:hover { transform: translateY(-6px); }
  .fx-plan:hover::before { opacity: 1; }
  .fx-faq__q:hover .fx-faq__q-text::after { transform: scaleX(1); transform-origin: left; }
  .fx-faq__q:hover .fx-faq__icon { transform: rotate(90deg); }
  .fx-faq__q[aria-expanded="true"]:hover .fx-faq__icon { transform: rotate(135deg); }
  .fx-chip:hover span { border-color: var(--color-ink); }
  .fx-logo:hover .fx-mark__item { animation: fx-pop var(--dur-base) var(--ease-snap); }
}

/* ───────────────────────── Responsive ───────────────────────── */

@media (max-width: 1080px) {
  .fx-header__nav, .fx-header__status, .fx-header .fx-magnetic { display: none; }
  .fx-header__toggle { display: inline-flex; }
  .fx-header[data-menu="open"] .fx-menu { animation: fx-menu-open var(--dur-slow) var(--ease-in-out) both; }
  .fx-header[data-menu="open"] .fx-menu nav > * { animation: fx-rise var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(160ms + var(--i) * 50ms); }
}
@keyframes fx-menu-open { from { clip-path: circle(0 at calc(100% - 38px) -30px); } to { clip-path: circle(150% at calc(100% - 38px) -30px); } }

@media (max-width: 1023px) {
  .fx-scene__grid { grid-template-columns: minmax(0, 1fr); }
  .fx-scene__copy, .fx-scene__shop { grid-column: 1 / -1; }
  .fx-scene__shop { position: relative; top: auto; max-width: 720px; }
  .fx-shelf__tags, .fx-plans__list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fx-work__tabs, .fx-work__panel, .fx-faq__head, .fx-faq__list, .fx-book__copy, .fx-book__form { grid-column: 1 / -1; }
  .fx-work__tabs { --tab-h: auto; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: auto; border-left: 0; border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent); }
  .fx-work__tab { padding: 16px 12px 16px 0; border-bottom: 0; }
  .fx-work__tab-indicator { top: auto; bottom: -1px; left: 0; width: calc(100% / 3); height: 2px; transform: translateX(calc(var(--tab) * 100%)); }
  .fx-faq__head { position: static; }
  .fx-section-head--split > * { grid-column: 1 / -1 !important; }
  .fx-footer__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: portrait) {
    .fx-scene__stage { padding-top: calc(var(--fx-header) + 12px); padding-bottom: 12px; }
    /* The shop is anchored to the bottom of the stage, so font swaps in the copy above never move it (CLS 0). */
    .fx-scene__grid { grid-template-rows: minmax(0, 1fr) auto; row-gap: 14px; align-items: start; }
    .fx-scene__copy, .fx-scene__copy > * { align-self: start; }
    .fx-scene__shop { align-self: end; justify-self: center; width: min(100%, calc(100svh - var(--fx-header) - 500px)); max-width: 640px; gap: 8px; }
    .fx-hero { gap: 14px; }
    .fx-hero__facts, .fx-hero__cue { display: none; }
    .fx-sheet { gap: 6px; }
    .fx-sheet__head { padding-bottom: 6px; }
    .fx-sheet__link { padding: 7px 2px; }
    .fx-sheet__name { font-size: 16px; }
    .fx-sheet__detail-inner > :last-child { margin-bottom: 10px; }
    .fx-sheet__detail-inner > p { font-size: 13.5px; }
    .fx-scene__ghost { display: none; }
  }

  /* Short, wide screens keep the two-column scene. */
  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: landscape) {
    .fx-scene__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); }
    .fx-scene__copy { grid-column: 1 / span 5; }
    .fx-scene__shop { grid-column: 6 / span 7; max-width: none; }
    .fx-hero__facts { display: none; }
  }
}

@media (max-width: 640px) {
  body { font-size: 16px; }
  .fx-hero__title { max-width: none; }
  .fx-load__eyebrow span:nth-child(3) { display: none; }
  .fx-hero__lead { font-size: 15.5px; }
  .fx-hero__actions .fx-button--lg { min-height: 46px; padding: 0 16px; font-size: 14.5px; }
  .fx-hero__actions .fx-button__arrow { display: none; }
  .fx-hero__facts { gap: 18px; }
  .fx-shop { padding: 3cqi 2cqi 2cqi; }
  .fx-window { --u: 2.75cqi; }
  .fx-store-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .fx-store-grid > li:nth-child(4) { display: none; }
  .fx-store-nav__links { display: none; }
  .fx-app { font-size: 10px; padding: 0.45em 0.55em; }
  .fx-app > span:nth-child(2) { display: none; }
  .fx-app--reviews, .fx-app--subscribe { left: -1cqi; }
  .fx-app--bookings, .fx-app--email { right: -1cqi; }
  .fx-shop__wires { display: none; }
  .fx-sign { right: 1.2em; }
  .fx-readout { margin-inline: 2cqi; }
  .fx-readout__cell { padding: 9px 10px; gap: 4px; }
  .fx-readout { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .fx-readout__cell:last-child { display: none; }
  .fx-readout__cell dt { font-size: 9px; }
  .fx-readout__bar { left: 10px; right: 10px; bottom: 5px; }
  .fx-shelf__tags, .fx-plans__list { grid-template-columns: minmax(0, 1fr); }
  .fx-shelf__tags { gap: 36px; }
  .fx-shelf__rail::before, .fx-shelf__rail::after { display: none; }
  .fx-work__metrics { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .fx-work__tab-meta { display: none; }
  .fx-work__tab-name { font-size: 17px; }
  .fx-gantt { --label-w: 96px; }
  .fx-gantt__label { font-size: 15px; }
  .fx-gantt__bar { padding: 0 6px; }
  .fx-gantt__bar-text { font-size: 11px; }
  .fx-gantt__weeks .fx-mono { font-size: 8.5px; padding-left: 4px; }
  .fx-form__row { grid-template-columns: minmax(0, 1fr); }
  .fx-submit { width: 100%; }
  .fx-faq__a p { padding: 0 8px 22px 46px; }
  .fx-footer__grid { grid-template-columns: minmax(0, 1fr); }
  .fx-slip__stamp { top: 40px; font-size: 16px; }

  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: portrait) {
    .fx-scene__shop { width: min(100%, calc(100svh - var(--fx-header) - 480px)); }
    .fx-sheet__service, .fx-sheet__checks { display: none; }
    .fx-sheet__link { grid-template-areas: "n name week check"; padding: 8px 2px; }
    .fx-sheet__detail-inner { padding-left: 46px; }
    .fx-hero__title { font-size: clamp(2.3rem, 10.5vw, 3rem); }
    .fx-hero__lead { font-size: 14.5px; line-height: 1.45; }
    .fx-sheet__week { display: none; }
    .fx-sheet__checks li { font-size: 9px; padding: 4px 6px; }
  }
}

/* Reduced motion: finished, not stripped. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }
  .fx-magnetic { transform: none; }
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#121316"/>
  <rect x="9" y="7" width="4" height="18" fill="#F3F2EE"/>
  <rect x="9" y="7" width="15" height="3.6" fill="#F3F2EE"/>
  <rect x="9" y="17" width="11" height="3.2" fill="#F3F2EE"/>
  <rect x="15.5" y="12.4" width="4.2" height="4.6" fill="#CF1F35"/>
</svg>
]]>
    </file>
    <file path="src/app/(fixture)/fixture/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "FIXTURE — Your shop, fitted out properly.";

const INK = "#121316";
const PAPER = "#F3F2EE";
const WHITE = "#FFFFFF";
const CRIMSON = "#CF1F35";
const GRAPHITE = "#5E6168";
const HAIRLINE = "#D9D7D0";
const TILL = "#1E7A4C";

const stages = ["Shell", "Fixtures", "Wiring", "Signage", "Open"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: PAPER, color: INK, padding: "56px 64px", fontFamily: "sans-serif", position: "relative" }}>
        {Array.from({ length: 11 }, (_, i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 64 + ((1200 - 128) / 12) * (i + 1), width: 1, backgroundColor: HAIRLINE }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="52" height="52" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill={INK} />
              <rect x="9" y="7" width="4" height="18" fill={PAPER} />
              <rect x="9" y="7" width="15" height="3.6" fill={PAPER} />
              <rect x="9" y="17" width="11" height="3.2" fill={PAPER} />
              <rect x="15.5" y="12.4" width="4.2" height="4.6" fill={CRIMSON} />
            </svg>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "0.02em" }}>FIXTURE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 16, color: CRIMSON, letterSpacing: "0.14em", marginBottom: 18 }}>SHOPIFY STUDIO · ROTTERDAM</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 0.94, letterSpacing: "-0.045em" }}>
              <span>Your shop,</span>
              <span>fitted out</span>
              <span>properly.</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {stages.map((stage, i) => (
              <div key={stage} style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 12px", border: `1px solid ${i === 4 ? INK : HAIRLINE}`, backgroundColor: i === 4 ? INK : WHITE, color: i === 4 ? PAPER : GRAPHITE, borderRadius: 4, fontSize: 15 }}>
                <span style={{ color: CRIMSON }}>0{i + 1}</span>
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", width: 430, height: 518, backgroundColor: WHITE, border: `1px solid ${HAIRLINE}`, borderRadius: 10, overflow: "hidden", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 16px", borderBottom: `1px solid ${HAIRLINE}` }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: HAIRLINE }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: HAIRLINE }} />
            <div style={{ display: "flex", marginLeft: 10, padding: "6px 12px", backgroundColor: PAPER, borderRadius: 4, fontSize: 14, color: GRAPHITE }}>fennelandclay.com</div>
          </div>
          <div style={{ display: "flex", padding: "8px 16px", backgroundColor: INK, color: PAPER, fontSize: 13 }}>Free shipping over €60 · Kiln drop Friday</div>
          <div style={{ display: "flex", flexDirection: "column", padding: 22, gap: 14 }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em" }}>Hand-thrown stoneware, fired in small batches.</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", flex: 1, height: 150, backgroundColor: PAPER, borderRadius: 6, alignItems: "center", justifyContent: "flex-end", paddingBottom: 18 }}>
                  <div style={{ width: 54 - i * 8, height: 58 + i * 14, backgroundColor: i === 1 ? INK : GRAPHITE, borderRadius: "10px 10px 18px 18px" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", padding: "12px 14px", border: `1px solid ${TILL}`, color: TILL, borderRadius: 6, fontSize: 15 }}>No. 1042 · Tide mug ×2 · €68.00 · Utrecht</div>
          </div>
          <div style={{ position: "absolute", top: 104, right: 18, display: "flex", padding: "10px 16px", backgroundColor: TILL, color: WHITE, borderRadius: 4, fontSize: 18, fontWeight: 700, letterSpacing: "0.14em" }}>OPEN</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/page.tsx">
<![CDATA[import { SmoothScroll } from "./motion/SmoothScroll";
import { Book } from "./sections/Book";
import { CarePlans } from "./sections/CarePlans";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { PriceList } from "./sections/PriceList";
import { Scene } from "./sections/Scene";
import { Schedule } from "./sections/Schedule";
import { Work } from "./sections/Work";

export default function FixturePage() {
  return (
    <div className="fx-shell" id="top">
      <a href="#main" className="fx-skip">Skip to content</a>
      <SmoothScroll />
      <div className="fx-gridlines" aria-hidden="true"><div className="fx-container"><span /></div></div>
      <Header />
      <main id="main" className="fx-main">
        <Scene />
        <PriceList />
        <Work />
        <Schedule />
        <CarePlans />
        <Faq />
        <Book />
      </main>
      <Footer />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/brand/Logo.tsx">
<![CDATA[type MarkProps = { className?: string; tone?: "light" | "dark" };

/** The mark: an F built from a wall bracket and two shelves, with one crimson product on the lower shelf. */
export function Mark({ className, tone = "light" }: MarkProps) {
  const plate = tone === "light" ? "var(--color-ink)" : "var(--color-paper)";
  const bracket = tone === "light" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill={plate} />
      <rect x="9" y="7" width="4" height="18" fill={bracket} />
      <rect x="9" y="7" width="15" height="3.6" fill={bracket} />
      <rect x="9" y="17" width="11" height="3.2" fill={bracket} />
      <rect className="fx-mark__item" x="15.5" y="12.4" width="4.2" height="4.6" fill="var(--color-crimson)" />
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "light" | "dark" };

export function Logo({ className, tone = "light" }: LogoProps) {
  return (
    <span className={`fx-logo ${className ?? ""}`} data-tone={tone}>
      <Mark className="fx-logo__mark" tone={tone} />
      <span className="fx-logo__word">FIXTURE</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/content/faq.ts">
<![CDATA[export const FAQ: { q: string; a: string }[] = [
  {
    q: "We already have a Shopify store. Do you only do new builds?",
    a: "Most of our work is on stores that already sell. We start with a walk-through of what you have, keep what works and refit the rest. A full rebuild is the exception.",
  },
  {
    q: "Why flat prices instead of hourly?",
    a: "Because you should know the bill before we start. Every stage has a fixed scope and price. If we find something extra, we quote it before touching it.",
  },
  {
    q: "Who owns the theme and the code?",
    a: "You do, from the first invoice. The theme lives in your store, the code is in a repository you own, and nothing is locked to a Fixture account.",
  },
  {
    q: "How many apps will we end up paying for?",
    a: "Usually fewer than now. We audit every app on the store and remove the ones that slow it down or duplicate each other. The average client drops three subscriptions.",
  },
  {
    q: "Can we pause or cancel a care plan?",
    a: "Yes. Monthly plans cancel with 30 days' notice. Annual plans can be paused once a year, for example over a quiet season.",
  },
  {
    q: "Do you work with stores outside the Netherlands?",
    a: "We work in English, Dutch and German, and look after stores across the EU and the UK. Walk-throughs are on video, so distance doesn't matter.",
  },
];
]]>
    </file>
    <file path="src/app/(fixture)/fixture/content/plans.ts">
<![CDATA[export type Cycle = "monthly" | "annual";

export type CarePlan = {
  id: "counter" | "shopfloor" | "flagship";
  name: string;
  monthly: number;
  hours: string;
  pitch: string;
  includes: string[];
  featured?: boolean;
};

export const CARE_PLANS: CarePlan[] = [
  {
    id: "counter",
    name: "Counter",
    monthly: 240,
    hours: "4 h / month",
    pitch: "For shops that mostly run themselves and want someone on call.",
    includes: ["App and theme updates", "Monthly speed check", "Fixes within 2 working days"],
  },
  {
    id: "shopfloor",
    name: "Shopfloor",
    monthly: 420,
    hours: "8 h / month",
    pitch: "For growing shops with a launch, a sale or a new range every month.",
    includes: ["Everything in Counter", "One landing page a month", "Same-day fixes", "Quarterly conversion review"],
    featured: true,
  },
  {
    id: "flagship",
    name: "Flagship",
    monthly: 780,
    hours: "16 h / month",
    pitch: "For busy stores that treat the shop like a second storefront team.",
    includes: ["Everything in Shopfloor", "A/B test every month", "Seasonal theme refresh", "Named lead, weekly call"],
  },
];

/** Monthly price for a cycle; annual billing gives two months free. */
export function planPrice(plan: CarePlan, cycle: Cycle): number {
  return cycle === "monthly" ? plan.monthly : Math.round((plan.monthly * 10) / 12);
}

export function formatEuro(amount: number): string {
  return `€${amount.toLocaleString("en-US")}`;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/content/services.ts">
<![CDATA[import type { StageId } from "../fitout/scene";

export type Service = {
  sku: string;
  stage: StageId;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  lead: string;
};

/** The price list. Every service is a shelf tag, and every fit-out stage has at least one. */
export const SERVICES: Service[] = [
  { sku: "FX-01", stage: "shell", name: "Store setup", price: "€1,800", unit: "flat", blurb: "Domain, payments, shipping, tax and the legal pages, set up properly once.", lead: "5 days" },
  { sku: "FX-02", stage: "fixtures", name: "Theme build", price: "€6,500", unit: "from", blurb: "A theme cut for your catalogue and your customers, not a demo store's.", lead: "2–3 weeks" },
  { sku: "FX-03", stage: "wiring", name: "App wiring", price: "€450", unit: "per app", blurb: "Reviews, subscriptions, bookings or email, installed, styled and tested.", lead: "2 days" },
  { sku: "FX-04", stage: "signage", name: "Speed audit", price: "€750", unit: "flat", blurb: "A line-by-line report and the fixes, measured before and after.", lead: "4 days" },
  { sku: "FX-05", stage: "signage", name: "Conversion pass", price: "€1,200", unit: "flat", blurb: "Copy, cart and checkout, rewritten around what your buyers ask.", lead: "1 week" },
  { sku: "FX-06", stage: "open", name: "Care plan", price: "€240", unit: "/ month", blurb: "Updates, fixes and a monthly tune-up, so it stays as fast as launch day.", lead: "ongoing" },
];
]]>
    </file>
    <file path="src/app/(fixture)/fixture/content/work.ts">
<![CDATA[export type Metric = {
  label: string;
  before: number;
  after: number;
  /** Number of decimals shown. */
  decimals: number;
  prefix?: string;
  suffix?: string;
};

export type Case = {
  id: string;
  merchant: string;
  city: string;
  trade: string;
  fitted: string[];
  quote: string;
  metrics: Metric[];
};

export const CASES: Case[] = [
  {
    id: "fennel",
    merchant: "Fennel & Clay",
    city: "Utrecht",
    trade: "Stoneware studio · 140 products",
    fitted: ["Theme build", "Speed audit", "Care: Shopfloor"],
    quote: "Kiln days used to crash the site. Last drop sold out in nine minutes and nothing broke.",
    metrics: [
      { label: "Mobile load", before: 4.6, after: 1.3, decimals: 1, suffix: " s" },
      { label: "Conversion", before: 0.8, after: 2.9, decimals: 1, suffix: "%" },
      { label: "Avg. order", before: 52, after: 71, decimals: 0, prefix: "€" },
    ],
  },
  {
    id: "ritual",
    merchant: "Ritual Roast",
    city: "Ghent",
    trade: "Coffee subscriptions · 2 roasts / month",
    fitted: ["Store setup", "App wiring", "Conversion pass"],
    quote: "Subscriptions finally sit in the same cart as the beans. Churn dropped the first month.",
    metrics: [
      { label: "Subscribers", before: 310, after: 1140, decimals: 0 },
      { label: "Monthly churn", before: 9.4, after: 4.1, decimals: 1, suffix: "%" },
      { label: "Checkout time", before: 3.2, after: 1.4, decimals: 1, suffix: " min" },
    ],
  },
  {
    id: "spokesmith",
    merchant: "Spokesmith",
    city: "Rotterdam",
    trade: "Bike repair · bookings + parts",
    fitted: ["Store setup", "App wiring", "Care: Counter"],
    quote: "People book a service slot and buy the tyres in one go. The phone rings half as much.",
    metrics: [
      { label: "Online bookings", before: 18, after: 96, decimals: 0, suffix: " / wk" },
      { label: "Parts revenue", before: 2.1, after: 6.8, decimals: 1, prefix: "€", suffix: "k / mo" },
      { label: "Phone calls", before: 140, after: 64, decimals: 0, suffix: " / wk" },
    ],
  },
];
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/FitSheet.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { STAGES } from "./scene";

/** The fit-out sheet: one row per stage. In the live scene the active row expands and finished rows lock with a check. */
export function FitSheet() {
  return (
    <div className="fx-sheet">
      <div className="fx-sheet__head">
        <span className="fx-mono">Fit-out sheet</span>
        <span className="fx-mono fx-sheet__job">Job FX-0412 · Fennel &amp; Clay</span>
      </div>
      <ol className="fx-sheet__rows">
        {STAGES.map((stage, index) => (
          <li key={stage.id} id={`stage-${stage.id}`} className="fx-sheet__row" data-row={index + 1} style={{ "--i": index } as CSSProperties}>
            <a className="fx-sheet__link" href={`#stage-${stage.id}`} data-goto={index + 1}>
              <span className="fx-sheet__n">{stage.n}</span>
              <span className="fx-sheet__name">{stage.name}</span>
              <span className="fx-sheet__service">{stage.service}</span>
              <span className="fx-sheet__week">{stage.week}</span>
              <svg className="fx-sheet__check" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M3 8.5 6.5 12 13 4.5" pathLength={1} />
              </svg>
            </a>
            <div className="fx-sheet__detail">
              <div className="fx-sheet__detail-inner">
                <p>{stage.line}</p>
                <ul className="fx-sheet__checks">
                  {stage.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              </div>
            </div>
            <span className="fx-sheet__bar" aria-hidden="true" />
          </li>
        ))}
      </ol>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/Readout.tsx">
<![CDATA[/**
 * The live numbers under the storefront. The server renders the finished shop's values; in the live scene
 * SceneController rewrites each [data-readout] text node from readoutAt(progress).
 */
export function Readout() {
  return (
    <dl className="fx-readout" aria-label="Store readout">
      <div className="fx-readout__cell">
        <dt className="fx-mono">Load time</dt>
        <dd><span data-readout="load">1.2</span> s</dd>
        <span className="fx-readout__bar" aria-hidden="true"><span /></span>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Conversion</dt>
        <dd><span data-readout="conversion">2.8</span>%</dd>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Orders</dt>
        <dd data-readout="orders">38</dd>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Fitted</dt>
        <dd><span data-readout="checks">5</span>/5</dd>
      </div>
    </dl>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/scene.ts">
<![CDATA[import { clamp01, lerp, segment } from "../motion/math";

export type StageId = "shell" | "fixtures" | "wiring" | "signage" | "open";

export type Stage = {
  id: StageId;
  n: string;
  name: string;
  service: string;
  week: string;
  line: string;
  checks: string[];
};

/** The five fit-out stages, in the order the storefront is assembled. */
export const STAGES: Stage[] = [
  {
    id: "shell",
    n: "01",
    name: "Shell",
    service: "Store setup",
    week: "Week 1",
    line: "Domain, payments, shipping zones and tax, wired before anything is decorated.",
    checks: ["Domain + SSL", "Payments in 3 currencies", "Shipping zones", "EU VAT rules"],
  },
  {
    id: "fixtures",
    n: "02",
    name: "Fixtures",
    service: "Theme build",
    week: "Weeks 2–3",
    line: "A theme cut to your catalogue: collection grids, product pages and a cart that never surprises.",
    checks: ["Collection grid", "Product page", "Slide-out cart", "Mobile first"],
  },
  {
    id: "wiring",
    n: "03",
    name: "Wiring",
    service: "App wiring",
    week: "Week 3",
    line: "Only the apps that earn their keep: reviews, subscriptions, bookings and email, tested end to end.",
    checks: ["Reviews", "Subscribe & save", "Bookings", "Email flows"],
  },
  {
    id: "signage",
    n: "04",
    name: "Signage",
    service: "Speed + conversion",
    week: "Week 4",
    line: "Headlines that sell, a free-shipping bar that pays for itself, and a store that loads in a blink.",
    checks: ["Copy pass", "Shipping bar", "Image budget", "Core Web Vitals"],
  },
  {
    id: "open",
    n: "05",
    name: "Open",
    service: "Launch + care",
    week: "Launch day",
    line: "The sign flips. We stay on the floor for launch week, then keep the shop tuned every month.",
    checks: ["Launch-day watch", "Order checks", "Monthly tune-up", "Same-day fixes"],
  },
];

/** Share of the scene spent on the hero (the empty plot) before stage 1 begins. */
export const INTRO = 0.1;
/** Share of the scene each stage holds. The remainder after stage 5 lets "Open" breathe. */
export const STAGE_SPAN = 0.16;

export function stageStart(index: number): number {
  return INTRO + (index - 1) * STAGE_SPAN;
}

/** 0 = the hero's empty plot; 1–5 = the fit-out stages. */
export function stageIndexAt(progress: number): number {
  const p = clamp01(progress);
  if (p < INTRO) return 0;
  return Math.min(STAGES.length, 1 + Math.floor((p - INTRO) / STAGE_SPAN + 1e-9));
}

/** Progress (0–1) inside stage `index`. Stage 0 is complete once anything has scrolled. */
export function stageLocal(progress: number, index: number): number {
  if (index <= 0) return progress > 0 ? 1 : 0;
  const start = stageStart(index);
  return segment(progress, start, start + STAGE_SPAN);
}

export type Readout = { loadSeconds: number; conversion: number; orders: number; checks: number };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The live numbers beside the storefront: speed improves through fixtures → signage, sales arrive when it opens. */
export function readoutAt(progress: number): Readout {
  const p = clamp01(progress);
  const index = stageIndexAt(p);
  const speed = segment(p, stageStart(2), stageStart(5));
  const opening = stageLocal(p, 5);
  return {
    loadSeconds: round1(lerp(4.1, 1.2, speed)),
    conversion: index < 5 ? 0.9 : round1(lerp(0.9, 2.8, segment(opening, 0, 0.6))),
    orders: index < 5 ? 0 : Math.round(lerp(0, 38, opening)),
    checks: p >= 1 ? STAGES.length : Math.max(0, index - 1),
  };
}

/** Document scroll position that lands a little into stage `index` of a scene at `sceneTop`. */
export function scrollTargetFor(index: number, sceneTop: number, sceneHeight: number, viewportHeight: number): number {
  const travel = Math.max(0, sceneHeight - viewportHeight);
  if (index <= 0) return sceneTop;
  const p = index >= STAGES.length ? 1 : stageStart(index) + STAGE_SPAN * 0.35;
  return Math.round(sceneTop + travel * p);
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/SceneController.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { scrollToTarget } from "../motion/SmoothScroll";
import { progressFromOffsets, segment } from "../motion/math";
import { STAGES, readoutAt, scrollTargetFor, stageIndexAt, stageLocal } from "./scene";

/** The same query that switches on the live layout in fixture.css. */
export const LIVE_QUERY = "(prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)";

const ALL_REACHED = STAGES.map((_, index) => index + 1).join(" ");

/**
 * The server renders stage 0 so the live layout's first paint is the empty shell. Outside the live
 * media query fixture.css ignores these attributes and shows the finished shop.
 *
 * The fit-out scene's one client leaf. A single rAF per scroll turns the section's real offsets into
 * progress, then writes CSS variables, data-stage / data-reached and the readout text nodes.
 * React state only changes when the stage changes, for the screen-reader announcement.
 */
export function SceneController({ children, labelledBy }: { children: ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    let top = 0;
    let height = 0;
    let stage = -1;
    let frame = 0;
    let active = false;
    let last = { load: "", conversion: "", orders: "", checks: "" };
    const text = {
      load: root.querySelector<HTMLElement>('[data-readout="load"]'),
      conversion: root.querySelector<HTMLElement>('[data-readout="conversion"]'),
      orders: root.querySelector<HTMLElement>('[data-readout="orders"]'),
      checks: root.querySelector<HTMLElement>('[data-readout="checks"]'),
    };

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      height = root.offsetHeight;
    };

    const write = (key: keyof typeof last, value: string) => {
      if (last[key] === value) return;
      last[key] = value;
      const node = text[key];
      if (node) node.textContent = value;
    };

    const update = () => {
      frame = 0;
      const p = progressFromOffsets(top - window.scrollY, height, window.innerHeight);
      const index = stageIndexAt(p);
      const readout = readoutAt(p);
      root.style.setProperty("--fx-p", p.toFixed(4));
      root.style.setProperty("--fx-local", stageLocal(p, index).toFixed(4));
      root.style.setProperty("--fx-exit", segment(p, 0.9, 1).toFixed(4));
      root.style.setProperty("--fx-load", (readout.loadSeconds / 4.1).toFixed(3));
      write("load", readout.loadSeconds.toFixed(1));
      write("conversion", readout.conversion.toFixed(1));
      write("orders", String(readout.orders));
      write("checks", String(readout.checks));
      if (index !== stage) {
        stage = index;
        root.dataset.stage = String(index);
        root.dataset.reached = STAGES.slice(0, index).map((_, n) => n + 1).join(" ");
        setAnnounce(index === 0 ? "" : `Stage ${index} of ${STAGES.length}: ${STAGES[index - 1].name}`);
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[data-goto]");
      if (!link || !media.matches) return;
      event.preventDefault();
      measure();
      scrollToTarget(scrollTargetFor(Number(link.getAttribute("data-goto")), top, height, window.innerHeight));
    };

    const visibility = new IntersectionObserver(([entry]) => {
      root.dataset.onscreen = entry?.isIntersecting ? "true" : "false";
    });

    const start = () => {
      active = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      visibility.observe(root);
    };

    const stop = () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      visibility.disconnect();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stage = -1;
      last = { load: "", conversion: "", orders: "", checks: "" };
      // Outside the live scene the shop is finished: show its final numbers.
      const done = readoutAt(1);
      write("load", done.loadSeconds.toFixed(1));
      write("conversion", done.conversion.toFixed(1));
      write("orders", String(done.orders));
      write("checks", String(done.checks));
      root.style.removeProperty("--fx-load");
      root.dataset.stage = String(STAGES.length);
      root.dataset.reached = ALL_REACHED;
      setAnnounce("");
    };

    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };
    sync();
    media.addEventListener("change", onMediaChange);
    root.addEventListener("click", onClick);
    // Fonts settling can change the section height; re-measure once they are ready.
    document.fonts?.ready.then(onResize).catch(() => undefined);

    return () => {
      stop();
      media.removeEventListener("change", onMediaChange);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section ref={ref} id="fit-out" className="fx-scene" data-stage="0" data-reached="" aria-labelledby={labelledBy}>
      {children}
      <p className="fx-sr" aria-live="polite">{announce}</p>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/Stoneware.tsx">
<![CDATA[export type VesselKind = "mug" | "bowl" | "vase" | "jug";

const BODY: Record<VesselKind, string> = {
  mug: "M14 22h28v28c0 5-4 8-9 8H23c-5 0-9-3-9-8Z",
  bowl: "M6 30h48c0 14-10 24-24 24S6 44 6 30Z",
  vase: "M24 10h12v6c0 4 8 8 8 20 0 12-6 22-14 22s-14-10-14-22c0-12 8-16 8-20Z",
  jug: "M20 12h18l-2 8c6 4 10 10 10 20 0 10-7 18-16 18s-16-8-16-18c0-10 4-16 10-20Z",
};

const GLAZE: Record<VesselKind, string> = {
  mug: "M14 22h28v9c-3 2-5-1-7 2s-5 1-7-1-5 2-7 0-5 1-7-1Z",
  bowl: "M6 30h48c-1 4-4 6-7 4s-5 3-8 1-5 2-8 0-6 3-9 0-5 2-7-1Z",
  vase: "M24 10h12v6c0 2 2 4 4 6-3 2-5 0-7 3s-5-1-7 1-4-1-6 1c2-3 4-6 4-11Z",
  jug: "M20 12h18l-2 8c2 1 4 3 5 4-3 2-5-1-8 2s-5 0-7 1-4-1-6 1c1-4 4-6 6-8Z",
};

type VesselProps = { kind: VesselKind; tone?: "ink" | "graphite" | "white"; className?: string };

/** Coded stoneware for the demo merchant: a body, a dripped glaze line and a soft shadow. */
export function Vessel({ kind, tone = "graphite", className }: VesselProps) {
  return (
    <svg className={`fx-vessel ${className ?? ""}`} viewBox="0 0 60 64" aria-hidden="true" focusable="false" data-tone={tone}>
      <ellipse cx="30" cy="60" rx="20" ry="2.6" className="fx-vessel__shadow" />
      {kind === "mug" ? <path d="M42 28h4a6 6 0 0 1 0 12h-4" className="fx-vessel__handle" /> : null}
      {kind === "jug" ? <path d="M43 26c6 0 8 6 3 12" className="fx-vessel__handle" /> : null}
      <path d={BODY[kind]} className="fx-vessel__body" />
      <path d={GLAZE[kind]} className="fx-vessel__glaze" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/fitout/Storefront.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Vessel, type VesselKind } from "./Stoneware";

const PRODUCTS: { name: string; price: string; kind: VesselKind; tone: "ink" | "graphite" | "white"; rating: string; sub?: boolean }[] = [
  { name: "Tide mug", price: "€34", kind: "mug", tone: "ink", rating: "4.9 · 212" },
  { name: "Low bowl", price: "€42", kind: "bowl", tone: "graphite", rating: "4.8 · 96", sub: true },
  { name: "Dune vase", price: "€78", kind: "vase", tone: "white", rating: "5.0 · 41" },
  { name: "Pour jug", price: "€56", kind: "jug", tone: "graphite", rating: "4.9 · 73" },
];

const APPS = [
  { id: "reviews", label: "Reviews", glyph: "★", depth: 1 },
  { id: "subscribe", label: "Subscribe & save", glyph: "↻", depth: 2 },
  { id: "bookings", label: "Bookings", glyph: "◷", depth: 3 },
  { id: "email", label: "Email flows", glyph: "✉", depth: 2 },
];

const ORDERS = [
  { no: "1042", item: "Tide mug ×2", total: "€68.00", city: "Utrecht" },
  { no: "1043", item: "Dune vase", total: "€78.00", city: "Antwerp" },
  { no: "1044", item: "Low bowl ×4 · subscribe", total: "€151.20", city: "Leeds" },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * The demo merchant's store, drawn in DOM. Every part carries data-fit="n" (the stage that fits it) and
 * most have a dashed data-slot="n" twin that shows while the part is missing. Fitted is the default look;
 * fixture.css only hides parts inside the live scene, before their stage is reached.
 */
export function Storefront() {
  return (
    <div className="fx-shop">
      <svg className="fx-shop__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M3 30 C 10 30, 12 44, 22 46" pathLength={1} data-wire style={i(0)} />
        <path d="M3 62 C 10 62, 14 70, 30 70" pathLength={1} data-wire style={i(1)} />
        <path d="M97 44 C 90 44, 88 52, 78 54" pathLength={1} data-wire style={i(2)} />
        <path d="M97 78 C 90 78, 86 84, 74 86" pathLength={1} data-wire style={i(3)} />
      </svg>

      <ul className="fx-shop__apps" aria-label="Apps wired into the store">
        {APPS.map((app, index) => (
          <li key={app.id} className={`fx-app fx-app--${app.id}`} data-fit="3" data-depth={app.depth} style={i(index)}>
            <span className="fx-app__glyph" aria-hidden="true">{app.glyph}</span>
            <span>{app.label}</span>
            <span className="fx-app__ok" aria-hidden="true" />
          </li>
        ))}
      </ul>

      <div className="fx-window" role="img" aria-label="A demo storefront for Fennel & Clay, a stoneware studio, assembled stage by stage">
        <div className="fx-window__bar">
          <span className="fx-window__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="fx-window__url">
            <span className="fx-window__url-temp" data-slot="1">untitled-store-8842.myshopify.com</span>
            <span className="fx-window__url-live" data-fit="1">
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.5 5h7v5h-7Z" /></svg>
              fennelandclay.com
            </span>
          </span>
          <span className="fx-window__pay" data-fit="1" style={i(2)}>Payments live</span>
        </div>

        <div className="fx-window__ship" data-fit="4">Free shipping over €60 · Kiln drop Friday</div>

        <div className="fx-window__body">
          <div className="fx-store-nav">
            <span className="fx-slot fx-slot--nav" data-slot="2"><span>nav</span></span>
            <span className="fx-store-nav__brand" data-fit="2" style={i(0)}>Fennel &amp; Clay</span>
            <span className="fx-store-nav__links" data-fit="2" style={i(1)}><span>Shop</span><span>Kiln drops</span><span>Studio</span></span>
            <span className="fx-store-nav__cart" data-fit="2" style={i(2)}>
              Cart
              <span className="fx-store-nav__count" data-fit="5" style={i(3)}>3</span>
            </span>
          </div>

          <div className="fx-store-banner">
            <span className="fx-slot fx-slot--banner" data-slot="2"><span>banner slot · 1440 × 560</span></span>
            <div className="fx-store-banner__fitted" data-fit="2" style={i(1)}>
              <p className="fx-store-banner__head">
                <span className="fx-store-banner__generic" data-slot="4">Welcome to our store</span>
                <span className="fx-store-banner__real" data-fit="4">Hand-thrown stoneware, fired in small batches.</span>
              </p>
              <span className="fx-store-banner__cta">Shop the kiln drop</span>
              <span className="fx-store-banner__art" aria-hidden="true">
                <Vessel kind="vase" tone="white" />
                <Vessel kind="jug" tone="graphite" />
              </span>
            </div>
          </div>

          <ul className="fx-store-grid">
            {PRODUCTS.map((product, index) => (
              <li key={product.name} className="fx-tile">
                <span className="fx-slot fx-slot--tile" data-slot="2"><span>product {String(index + 1).padStart(2, "0")}</span></span>
                <span className="fx-tile__fitted" data-fit="2" style={i(index + 2)}>
                  <span className="fx-tile__art">
                    <Vessel kind={product.kind} tone={product.tone} />
                    {product.sub ? <span className="fx-tile__sub" data-fit="3" style={i(4)}>Subscribe −10%</span> : null}
                  </span>
                  <span className="fx-tile__meta">
                    <span className="fx-tile__name">{product.name}</span>
                    <span className="fx-tile__price">{product.price}</span>
                  </span>
                  <span className="fx-tile__stars" data-fit="3" style={i(index)}>★ {product.rating}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="fx-orders" data-fit="5" aria-hidden="true">
          {ORDERS.map((order, index) => (
            <li key={order.no} className="fx-order" style={i(index)}>
              <span className="fx-order__dot" />
              <span className="fx-order__no">No. {order.no}</span>
              <span className="fx-order__item">{order.item}</span>
              <span className="fx-order__total">{order.total}</span>
              <span className="fx-order__city">{order.city}</span>
            </li>
          ))}
        </ol>

        <div className="fx-sign" aria-hidden="true">
          <span className="fx-sign__string" />
          <span className="fx-sign__card" data-flip="5">
            <span className="fx-sign__face fx-sign__face--open">Open</span>
            <span className="fx-sign__face fx-sign__face--closed">Closed</span>
          </span>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/forms/AddToBrief.tsx">
<![CDATA["use client";

import { useEffect, useState } from "react";
import { NEEDS_CHANGED, sendNeed, type NeedsChangedDetail } from "./brief-events";

/** A toggle on a price tag: adds that stage's need to the walk-through brief. */
export function AddToBrief({ need, label }: { need: string; label: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onChange = (event: Event) => setOn((event as CustomEvent<NeedsChangedDetail>).detail.needs.includes(need));
    window.addEventListener(NEEDS_CHANGED, onChange);
    return () => window.removeEventListener(NEEDS_CHANGED, onChange);
  }, [need]);

  return (
    <button type="button" className="fx-add" aria-pressed={on} onClick={() => { sendNeed(need, !on); setOn(!on); }}>
      <span className="fx-add__roll">
        <span className="fx-add__label">Add to brief</span>
        <span className="fx-add__label fx-add__label--on" aria-hidden="true">Added ✓</span>
      </span>
      <span className="fx-sr"> {label}</span>
    </button>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/forms/brief-events.ts">
<![CDATA[/** Price tags and plan cards add needs to the brief; the form reports its needs back so their buttons stay in sync. */
export const ADD_NEED = "fx:add-need";
export const NEEDS_CHANGED = "fx:needs-changed";

export type AddNeedDetail = { need: string; on: boolean };
export type NeedsChangedDetail = { needs: string[] };

export function sendNeed(need: string, on: boolean) {
  window.dispatchEvent(new CustomEvent<AddNeedDetail>(ADD_NEED, { detail: { need, on } }));
}

export function announceNeeds(needs: string[]) {
  window.dispatchEvent(new CustomEvent<NeedsChangedDetail>(NEEDS_CHANGED, { detail: { needs } }));
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/forms/FitSlip.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { SERVICES } from "../content/services";
import { BUDGETS, NEEDS, normaliseStore, type Brief } from "./validation";

function priceLabel(price: string, unit: string) {
  if (unit === "flat") return price;
  if (unit === "from") return `from ${price}`;
  return `${price} ${unit}`;
}

type FitSlipProps ={ brief: Brief; reference: string; onEdit: () => void };

/** The success state: the fit-out sheet again, printed line by line for this store, then stamped. */
export function FitSlip({ brief, reference, onEdit }: FitSlipProps) {
  const lines = NEEDS.filter((need) => brief.needs.includes(need.id)).map((need) => {
    const service = SERVICES.find((item) => item.stage === need.id);
    return { id: need.id, label: need.label, price: service ? priceLabel(service.price, service.unit) : "" };
  });
  const budget = BUDGETS.find((item) => item.id === brief.budget)?.label ?? "";
  const rows = [
    { k: "Reference", v: reference },
    { k: "Store", v: normaliseStore(brief.store) ?? brief.store },
    { k: "Ask for", v: brief.name.trim() },
    ...lines.map((line) => ({ k: line.label, v: line.price })),
    { k: "Budget", v: budget },
    { k: "Walk-through", v: "30 min · video · free" },
  ];

  return (
    <div className="fx-slip" tabIndex={-1} data-slip>
      <div className="fx-slip__head">
        <span className="fx-mono">Fit-out slip</span>
        <span className="fx-mono">{reference}</span>
      </div>
      <h3 className="fx-slip__title">You&apos;re on the schedule.</h3>
      <p className="fx-slip__lead">We&apos;ll email {brief.email.trim()} within one working day with two walk-through times.</p>
      <dl className="fx-slip__rows">
        {rows.map((row, index) => (
          <div key={`${row.k}-${index}`} className="fx-slip__row" style={{ "--i": index } as CSSProperties}>
            <dt>{row.k}</dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>
      <span className="fx-slip__stamp" aria-hidden="true">Booked</span>
      <button type="button" className="fx-link-button" onClick={onEdit}>Edit the brief</button>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/forms/validation.ts">
<![CDATA[export type Brief = {
  name: string;
  email: string;
  store: string;
  needs: string[];
  budget: string;
  note: string;
};

export type BriefErrors = Partial<Record<keyof Brief, string>>;

export const EMPTY_BRIEF: Brief = { name: "", email: "", store: "", needs: [], budget: "", note: "" };

export const NEEDS = [
  { id: "shell", label: "Setup" },
  { id: "fixtures", label: "Theme" },
  { id: "wiring", label: "Apps" },
  { id: "signage", label: "Speed + conversion" },
  { id: "open", label: "Care plan" },
] as const;

export const BUDGETS = [
  { id: "under-3k", label: "Under €3k" },
  { id: "3-6k", label: "€3–6k" },
  { id: "6-12k", label: "€6–12k" },
  { id: "12k-plus", label: "€12k +" },
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HOST = /^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;

/** "https://www.Shop.com/collections" → "shop.com"; null when it isn't a plausible store host. */
export function normaliseStore(input: string): string | null {
  const host = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0] ?? "";
  return HOST.test(host) ? host : null;
}

export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (brief.name.trim().length < 2) errors.name = "Tell us who to ask for.";
  if (!EMAIL.test(brief.email.trim())) errors.email = "Enter a valid email.";
  if (!normaliseStore(brief.store)) errors.store = "Enter your store address, like yourshop.com.";
  if (brief.needs.length === 0) errors.needs = "Pick at least one thing to fit.";
  if (!brief.budget) errors.budget = "Pick a budget range.";
  if (brief.note.length > 600) errors.note = "Keep it under 600 characters.";
  return errors;
}

/** Deterministic "FX-1234-AB" reference so the confirmation slip reads like a real booking. */
export function bookingReference(brief: Brief): string {
  const seed = `${brief.email.trim().toLowerCase()}|${normaliseStore(brief.store) ?? ""}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  const digits = String(hash % 10000).padStart(4, "0");
  const letters = (hash >>> 14).toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").padStart(2, "X").slice(-2);
  return `FX-${digits}-${letters}`;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/forms/WalkthroughForm.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ADD_NEED, announceNeeds, type AddNeedDetail } from "./brief-events";
import { FitSlip } from "./FitSlip";
import { BUDGETS, EMPTY_BRIEF, NEEDS, bookingReference, validateBrief, type Brief, type BriefErrors } from "./validation";

type Phase = "idle" | "sending" | "done";
const FIELD_ORDER: (keyof Brief)[] = ["name", "email", "store", "needs", "budget", "note"];

/** The walk-through brief. Validates locally and "books" without a network request: it is a template. */
export function WalkthroughForm() {
  const [brief, setBrief] = useState<Brief>(EMPTY_BRIEF);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);
  const slipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onAdd = (event: Event) => {
      const { need, on } = (event as CustomEvent<AddNeedDetail>).detail;
      setBrief((current) => ({ ...current, needs: on ? [...new Set([...current.needs, need])] : current.needs.filter((item) => item !== need) }));
    };
    window.addEventListener(ADD_NEED, onAdd);
    return () => window.removeEventListener(ADD_NEED, onAdd);
  }, []);

  useEffect(() => { announceNeeds(brief.needs); }, [brief.needs]);

  useEffect(() => {
    if (phase === "done") slipRef.current?.querySelector<HTMLElement>("[data-slip]")?.focus({ preventScroll: true });
  }, [phase]);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleNeed = (id: string) => set("needs", brief.needs.includes(id) ? brief.needs.filter((item) => item !== id) : [...brief.needs, id]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase === "sending") return;
    const next = validateBrief(brief);
    setErrors(next);
    const first = FIELD_ORDER.find((key) => next[key]);
    if (first) {
      setShake((count) => count + 1);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`)?.focus();
      return;
    }
    setPhase("sending");
    window.setTimeout(() => setPhase("done"), 900);
  };

  const fieldProps = (key: keyof Brief) => ({
    "data-field": key,
    "data-invalid": errors[key] ? "true" : undefined,
    "data-shake": errors[key] ? shake % 2 : undefined,
  });

  const errorId = (key: keyof Brief) => `fx-err-${key}`;

  return (
    <div className="fx-form-card" data-phase={phase}>
      {phase !== "done" ? (
        <form ref={formRef} className="fx-form" noValidate onSubmit={onSubmit} aria-describedby="fx-form-note">
          <div className="fx-form__row">
            <div className="fx-field" {...fieldProps("name")}>
              <input id="fx-name" name="name" autoComplete="name" placeholder=" " value={brief.name} onChange={(e) => set("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? errorId("name") : undefined} />
              <label htmlFor="fx-name">Your name</label>
              <p className="fx-field__error" id={errorId("name")} role={errors.name ? "alert" : undefined}>{errors.name}</p>
            </div>
            <div className="fx-field" {...fieldProps("email")}>
              <input id="fx-email" name="email" type="email" autoComplete="email" placeholder=" " value={brief.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? errorId("email") : undefined} />
              <label htmlFor="fx-email">Email</label>
              <p className="fx-field__error" id={errorId("email")} role={errors.email ? "alert" : undefined}>{errors.email}</p>
            </div>
          </div>

          <div className="fx-field fx-field--prefixed" {...fieldProps("store")}>
            <span className="fx-field__prefix" aria-hidden="true">https://</span>
            <input id="fx-store" name="store" inputMode="url" autoComplete="url" placeholder=" " value={brief.store} onChange={(e) => set("store", e.target.value)} aria-invalid={errors.store ? true : undefined} aria-describedby={errors.store ? errorId("store") : undefined} />
            <label htmlFor="fx-store">Store address</label>
            <p className="fx-field__error" id={errorId("store")} role={errors.store ? "alert" : undefined}>{errors.store}</p>
          </div>

          <fieldset className="fx-choices" {...fieldProps("needs")} aria-describedby={errors.needs ? errorId("needs") : undefined}>
            <legend className="fx-mono">What needs fitting?</legend>
            <div className="fx-choices__list">
              {NEEDS.map((need, index) => (
                <label key={need.id} className="fx-chip">
                  <input type="checkbox" name="needs" value={need.id} checked={brief.needs.includes(need.id)} onChange={() => toggleNeed(need.id)} />
                  <span><b>0{index + 1}</b>{need.label}</span>
                </label>
              ))}
            </div>
            <p className="fx-field__error" id={errorId("needs")} role={errors.needs ? "alert" : undefined}>{errors.needs}</p>
          </fieldset>

          <fieldset className="fx-choices" {...fieldProps("budget")} aria-describedby={errors.budget ? errorId("budget") : undefined}>
            <legend className="fx-mono">Budget</legend>
            <div className="fx-choices__list">
              {BUDGETS.map((budget) => (
                <label key={budget.id} className="fx-chip fx-chip--radio">
                  <input type="radio" name="budget" value={budget.id} checked={brief.budget === budget.id} onChange={() => set("budget", budget.id)} />
                  <span>{budget.label}</span>
                </label>
              ))}
            </div>
            <p className="fx-field__error" id={errorId("budget")} role={errors.budget ? "alert" : undefined}>{errors.budget}</p>
          </fieldset>

          <div className="fx-field fx-field--area" {...fieldProps("note")}>
            <textarea id="fx-note" name="note" rows={3} placeholder=" " value={brief.note} onChange={(e) => set("note", e.target.value)} aria-invalid={errors.note ? true : undefined} aria-describedby={errors.note ? errorId("note") : undefined} />
            <label htmlFor="fx-note">Anything we should look at first? (optional)</label>
            <p className="fx-field__error" id={errorId("note")} role={errors.note ? "alert" : undefined}>{errors.note}</p>
          </div>

          <div className="fx-form__foot">
            <button className="fx-button fx-button--primary fx-submit" type="submit" disabled={phase === "sending"} data-state={phase}>
              <span className="fx-button__fill" aria-hidden="true" />
              <span className="fx-submit__label">Book the walk-through</span>
              <span className="fx-submit__busy" aria-hidden="true"><i />Checking the shelves</span>
            </button>
            <p id="fx-form-note" className="fx-form__note">Free, 30 minutes on video. This demo form doesn&apos;t send anything.</p>
          </div>
          <p className="fx-sr" aria-live="polite">{phase === "sending" ? "Checking the shelves" : ""}</p>
        </form>
      ) : (
        <div ref={slipRef}>
          <FitSlip brief={brief} reference={bookingReference(brief)} onEdit={() => setPhase("idle")} />
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/CountUp.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { lerp } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = {
  value: number;
  /** Where the first count starts. Later changes count from the previous value. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export function format(value: number, decimals: number, prefix = "", suffix = "") {
  return `${prefix}${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
}

/** Tabular count-up written straight into a text node; the final value is always in a visually hidden span. */
export function CountUp({ value, from = 0, decimals = 0, prefix, suffix, duration = 900, className }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const shown = useRef<HTMLSpanElement | null>(null);
  const current = useRef(from);
  const reduced = useReducedMotion();

  // The server renders the final value (no-JS); once hydrated, park it at `from` until it scrolls in.
  useEffect(() => {
    if (!reduced && shown.current && current.current !== value) shown.current.textContent = format(current.current, decimals, prefix, suffix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = shown.current;
    if (!node || !inView) return;
    const start = current.current;
    if (reduced || start === value) {
      current.current = value;
      node.textContent = format(value, decimals, prefix, suffix);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      const next = lerp(start, value, easeOutExpo(t));
      current.current = next;
      node.textContent = format(next, decimals, prefix, suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [decimals, duration, inView, prefix, reduced, suffix, value]);

  return (
    <span ref={ref} className={`fx-count ${className ?? ""}`}>
      <span ref={shown} aria-hidden="true">{format(value, decimals, prefix, suffix)}</span>
      <span className="fx-sr">{format(value, decimals, prefix, suffix)}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/Magnetic.tsx">
<![CDATA["use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lerp } from "./math";
import { canHoverFinely, useReducedMotion } from "./useReducedMotion";

const PULL = 0.18;
const MAX = 14;

/** Pulls its child toward the pointer (fine pointers only), eased in one rAF loop, springing back on leave. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !canHoverFinely()) return;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x = lerp(x, tx, 0.22);
      y = lerp(y, ty, 0.22);
      node.style.setProperty("--fx-mx", `${x.toFixed(2)}px`);
      node.style.setProperty("--fx-my", `${y.toFixed(2)}px`);
      frame = Math.abs(x - tx) + Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      tx = Math.max(-MAX, Math.min(MAX, (event.clientX - (box.left + box.width / 2)) * PULL));
      ty = Math.max(-MAX, Math.min(MAX, (event.clientY - (box.top + box.height / 2)) * PULL));
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return <span ref={ref} className="fx-magnetic">{children}</span>;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/Marquee.tsx">
<![CDATA["use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/** A duplicated track translated by CSS. It runs only while in view and pauses on hover or focus. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "0px", threshold: 0 });
  return (
    <div ref={ref} className={`fx-marquee ${className ?? ""}`} data-play={inView ? "true" : "false"}>
      <div className="fx-marquee__track">
        <div className="fx-marquee__group">{children}</div>
        <div className="fx-marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/math.ts">
<![CDATA[export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * clamp01(amount);
}

/** Progress (0–1) of a tall section whose sticky stage is pinned while it travels past the viewport. */
export function progressFromOffsets(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const travel = Math.max(0, rectHeight - viewportHeight);
  if (travel === 0) return 0;
  return clamp01(-rectTop / travel);
}

/** 0 when an element's top meets the viewport's bottom, 1 when its bottom leaves the top. */
export function passProgress(rectTop: number, rectHeight: number, viewportHeight: number): number {
  const total = viewportHeight + rectHeight;
  if (total <= 0) return 0;
  return clamp01((viewportHeight - rectTop) / total);
}

/** Re-maps `value` so that [start, end] becomes [0, 1]. */
export function segment(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function staggerDelay(index: number, stepMs: number, capMs = 600): string {
  return `${Math.min(capMs, Math.max(0, index) * Math.max(0, stepMs))}ms`;
}

/** Pointer position inside a box → rotateX/rotateY in degrees, each bounded by ±max/2. */
export function tiltFromPointer(x: number, y: number, width: number, height: number, max: number): { rx: number; ry: number } {
  const px = clamp01(width ? x / width : 0.5) - 0.5;
  const py = clamp01(height ? y / height : 0.5) - 0.5;
  const round = (n: number) => Math.round(n * 100) / 100 + 0;
  return { rx: round(-py * max), ry: round(px * max) };
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/Reveal.tsx">
<![CDATA["use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealKind = "rise" | "mask" | "hang" | "draw" | "wipe" | "scale" | "slide";

type RevealProps = {
  as?: ElementType;
  kind?: RevealKind;
  index?: number;
  delay?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
};

/** Toggles data-in once in view. The hidden state lives in CSS under prefers-reduced-motion: no-preference only. */
export function Reveal({ as: Tag = "div", kind = "rise", index = 0, delay = 0, className, id, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={className} data-reveal={kind} data-in={inView ? "true" : "false"} style={{ "--i": index, "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/SmoothScroll.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { canHoverFinely } from "./useReducedMotion";

let instance: Lenis | null = null;
const HEADER_OFFSET = -72;

/** Scroll to a document y (or element), through Lenis when it runs, natively otherwise. */
export function scrollToTarget(target: number | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : HEADER_OFFSET, duration: 1.1, easing: (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t)) });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

/** Lenis on fine pointers with motion allowed; native momentum on touch. Also routes in-page anchor clicks. */
export function SmoothScroll() {
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced && canHoverFinely()) {
      import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        instance = new LenisCtor({ lerp: 0.1, smoothWheel: true });
        const raf = (time: number) => {
          instance?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!link || link.hasAttribute("data-goto")) return;
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (frame) cancelAnimationFrame(frame);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/SplitText.tsx">
<![CDATA[import type { CSSProperties } from "react";

type SplitTextProps = {
  /** Lines separated by "\n": fixed breaks keep CLS at 0 and make every line its own mask. */
  children: string;
  className?: string;
  /** Delay before the first line, in ms. */
  delay?: number;
};

/**
 * Mask-rise text. Each line sits in an overflow-clip wrapper; the inner span rises when the nearest
 * [data-in="true"] ancestor flips, or on load inside `.fx-load`. Screen readers get one plain string.
 */
export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const lines = children.split("\n");
  return (
    <span className={`fx-split ${className ?? ""}`} style={{ "--split-delay": `${delay}ms` } as CSSProperties}>
      <span className="fx-sr">{lines.join(" ")}</span>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`} className="fx-split__line" aria-hidden="true" style={{ "--line": index } as CSSProperties}>
          <span className="fx-split__inner">{line}</span>
        </span>
      ))}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/TiltCard.tsx">
<![CDATA["use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { tiltFromPointer } from "./math";
import { canHoverFinely, useReducedMotion } from "./useReducedMotion";

type TiltCardProps = { as?: ElementType; className?: string; max?: number; children: ReactNode };

/** Writes --fx-rx / --fx-ry (tilt) and --fx-sx / --fx-sy (spotlight) from the pointer. CSS decides how much to use. */
export function TiltCard({ as: Tag = "article", className, max = 6, children }: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !canHoverFinely()) return;
    let frame = 0;
    let box: DOMRect | null = null;
    let px = 0;
    let py = 0;
    const render = () => {
      frame = 0;
      if (!box) return;
      const { rx, ry } = tiltFromPointer(px, py, box.width, box.height, max);
      node.style.setProperty("--fx-rx", `${rx}deg`);
      node.style.setProperty("--fx-ry", `${ry}deg`);
      node.style.setProperty("--fx-sx", `${((px / box.width) * 100).toFixed(1)}%`);
      node.style.setProperty("--fx-sy", `${((py / box.height) * 100).toFixed(1)}%`);
    };
    const onEnter = () => { box = node.getBoundingClientRect(); };
    const onMove = (event: PointerEvent) => {
      if (!box) box = node.getBoundingClientRect();
      px = event.clientX - box.left;
      py = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      box = null;
      node.style.setProperty("--fx-rx", "0deg");
      node.style.setProperty("--fx-ry", "0deg");
    };
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, reduced]);

  return <Tag ref={ref} className={`fx-tilt ${className ?? ""}`}>{children}</Tag>;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };

export function useInView<T extends Element>({ once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.12 }: Options = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { rootMargin, threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => typeof window !== "undefined" && window.matchMedia(QUERY).matches;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Fine pointer with hover: the only place magnetic, tilt and spotlight run. */
export function canHoverFinely(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/motion/useScrollVar.ts">
<![CDATA["use client";

import { useEffect, type RefObject } from "react";
import { passProgress } from "./math";

/** Writes how far `ref` has passed through the viewport (0–1) to a CSS custom property on it, from one rAF per scroll. */
export function useScrollVar(ref: RefObject<HTMLElement | null>, name: string, enabled = true) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty(name, passProgress(rect.top, rect.height, window.innerHeight).toFixed(4));
    };
    const onScroll = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) onScroll();
    });
    observer.observe(node);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, name, ref]);
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Book.tsx">
<![CDATA[import { WalkthroughForm } from "../forms/WalkthroughForm";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

const STEPS = [
  { n: "01", t: "You send the brief", d: "Two minutes. Your store, what feels broken, a rough budget." },
  { n: "02", t: "We walk the store with you", d: "30 minutes on video. We screen-share your shop, front and admin." },
  { n: "03", t: "You get a fit-out sheet", d: "Within two working days: stages, prices, dates. Free, and yours to keep." },
];

export function Book() {
  return (
    <section id="book" className="fx-section fx-book" aria-labelledby="fx-book-title">
      <div className="fx-container fx-book__grid">
        <div className="fx-book__copy">
          <Reveal kind="rise">
            <p className="fx-eyebrow"><span>Book</span><span>Free · 30 minutes</span></p>
            <h2 id="fx-book-title"><SplitText>{"Book a store\nwalk-through."}</SplitText></h2>
            <p className="fx-section-lead">Tell us about the shop. We&apos;ll walk through it with you and send back a fit-out sheet, whether or not you hire us.</p>
          </Reveal>
          <ol className="fx-book__steps">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.n} kind="slide" index={index}>
                <span className="fx-mono">{step.n}</span>
                <div>
                  <p className="fx-book__step-title">{step.t}</p>
                  <p>{step.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal kind="wipe" className="fx-book__form">
          <WalkthroughForm />
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/CarePlans.tsx">
<![CDATA["use client";

import { useState } from "react";
import { CARE_PLANS, formatEuro, planPrice, type Cycle } from "../content/plans";
import { sendNeed } from "../forms/brief-events";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";

/** After launch: three monthly care plans, toggled between monthly and annual billing. */
export function CarePlans() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="plans" className="fx-section fx-plans" aria-labelledby="fx-plans-title">
      <div className="fx-container">
        <Reveal className="fx-section-head fx-section-head--row" kind="rise">
          <div>
            <p className="fx-eyebrow"><span>Care plans</span><span>After the sign flips</span></p>
            <h2 id="fx-plans-title"><SplitText>{"Keep it as fast\nas launch day."}</SplitText></h2>
          </div>
          <div className="fx-cycle" role="group" aria-label="Billing" data-cycle={cycle}>
            <span className="fx-cycle__thumb" aria-hidden="true" />
            <button type="button" aria-pressed={cycle === "monthly"} onClick={() => setCycle("monthly")}>Monthly</button>
            <button type="button" aria-pressed={cycle === "annual"} onClick={() => setCycle("annual")}>Annual <span className="fx-cycle__save">−2 mo</span></button>
          </div>
        </Reveal>

        <ul className="fx-plans__list">
          {CARE_PLANS.map((plan, index) => {
            const price = planPrice(plan, cycle);
            return (
              <Reveal as="li" key={plan.id} kind="scale" index={index}>
                <TiltCard className="fx-plan" max={3}>
                  <div className="fx-plan__inner" data-featured={plan.featured ? "true" : undefined}>
                    <div className="fx-plan__top">
                      <span className="fx-mono fx-plan__code">FX-C0{index + 1}</span>
                      {plan.featured ? <span className="fx-mono fx-plan__badge">Most fitted</span> : null}
                    </div>
                    <h3 className="fx-plan__name">{plan.name}</h3>
                    <p className="fx-plan__pitch">{plan.pitch}</p>
                    <p className="fx-plan__price">
                      <span className="fx-plan__amount" key={`${plan.id}-${cycle}`}>{formatEuro(price)}</span>
                      <span className="fx-plan__per">/ month</span>
                    </p>
                    <p className="fx-plan__billed fx-mono">{cycle === "annual" ? `Billed ${formatEuro(price * 12)} yearly` : "Billed monthly · cancel with 30 days"}</p>
                    <ul className="fx-plan__includes">
                      <li className="fx-mono">{plan.hours}</li>
                      {plan.includes.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                    <a className={`fx-button ${plan.featured ? "fx-button--primary" : "fx-button--ghost"} fx-plan__cta`} href="#book" onClick={() => sendNeed("open", true)}>
                      <span className="fx-button__fill" aria-hidden="true" />
                      <span className="fx-button__roll"><span>Choose {plan.name}</span><span aria-hidden="true">Choose {plan.name}</span></span>
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Faq.tsx">
<![CDATA["use client";

import { useState } from "react";
import { FAQ } from "../content/faq";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

/** One question open at a time; height animates through grid rows, never `height`. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="fx-section fx-faq" aria-labelledby="fx-faq-title">
      <div className="fx-container fx-faq__grid">
        <Reveal className="fx-faq__head" kind="rise">
          <p className="fx-eyebrow"><span>FAQ</span><span>Asked on every walk-through</span></p>
          <h2 id="fx-faq-title"><SplitText>{"Before you\nbook."}</SplitText></h2>
        </Reveal>
        <ul className="fx-faq__list">
          {FAQ.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal as="li" key={item.q} kind="rise" index={index} className="fx-faq__item">
                <h3>
                  <button type="button" className="fx-faq__q" aria-expanded={isOpen} aria-controls={`fx-faq-${index}`} id={`fx-faq-q-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
                    <span className="fx-mono">0{index + 1}</span>
                    <span className="fx-faq__q-text">{item.q}</span>
                    <span className="fx-faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`fx-faq-${index}`} role="region" aria-labelledby={`fx-faq-q-${index}`} className="fx-faq__a" data-open={isOpen ? "true" : "false"}>
                  <div><p>{item.a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Footer.tsx">
<![CDATA[import { Fragment } from "react";
import { Mark } from "../brand/Logo";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { StudioStatus } from "../studio/StudioStatus";

const TICKER = ["Shell", "Fixtures", "Wiring", "Signage", "Open", "Care"];

export function Footer() {
  return (
    <footer className="fx-footer">
      <Marquee className="fx-footer__ticker">
        {TICKER.map((word, index) => (
          <Fragment key={word}>
            <span className="fx-footer__word">{word}</span>
            <span className="fx-footer__sep" aria-hidden="true">0{index + 1}</span>
          </Fragment>
        ))}
      </Marquee>
      <div className="fx-container fx-footer__grid">
        <Reveal className="fx-footer__col" kind="rise" index={0}>
          <p className="fx-mono">Studio</p>
          <p>Fixture Shopfitters B.V.<br />Rotterdam, the Netherlands<br />KvK 9042 1187</p>
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={1}>
          <p className="fx-mono">Hours</p>
          <p>Mon–Fri, 09:00–18:00 CET</p>
          <StudioStatus />
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={2}>
          <p className="fx-mono">On this page</p>
          <ul className="fx-footer__links">
            <li><a href="#fit-out">The fit-out</a></li>
            <li><a href="#prices">Price list</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#plans">Care plans</a></li>
            <li><a href="#book">Book a walk-through</a></li>
          </ul>
        </Reveal>
        <Reveal className="fx-footer__col" kind="rise" index={3}>
          <p className="fx-mono">Small print</p>
          <p>Fixture is an independent studio and is not affiliated with or endorsed by Shopify Inc. A fictional brand made for a landing-page template.</p>
        </Reveal>
      </div>
      <div className="fx-container fx-footer__base">
        <Reveal className="fx-footer__word-big" kind="mask">
          <Mark className="fx-footer__mark" tone="dark" />
          <span className="fx-split__line"><span className="fx-split__inner">FIXTURE</span></span>
        </Reveal>
        <p className="fx-mono fx-footer__legal">© 2026 Fixture · Your shop, fitted out properly.</p>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Header.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Magnetic } from "../motion/Magnetic";
import { StudioStatus } from "../studio/StudioStatus";

const LINKS = [
  { id: "fit-out", label: "Fit-out" },
  { id: "prices", label: "Price list" },
  { id: "work", label: "Work" },
  { id: "plans", label: "Care plans" },
  { id: "faq", label: "FAQ" },
] as const;

type HeaderState = "top" | "compact" | "hidden";

export function Header() {
  const [state, setState] = useState<HeaderState>("top");
  const [active, setActive] = useState<string>("fit-out");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Reactive chrome: one passive listener, rAF-throttled. Page progress goes to a CSS variable.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setState((current) => (y < 24 ? "top" : delta > 6 && y > 320 ? "hidden" : delta < -6 ? "compact" : current === "top" ? "compact" : current));
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--fx-progress", Math.min(1, y / max).toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  // Which section is under the header.
  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit?.target.id) setActive(hit.target.id);
    }, { rootMargin: "-35% 0px -60% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // One indicator that slides between links (transform only); measurements cached until resize.
  const place = useCallback((id: string | null) => {
    const nav = navRef.current;
    const link = id ? nav?.querySelector<HTMLElement>(`[data-link="${id}"]`) : null;
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
  }, []);

  useEffect(() => {
    place(hovered ?? active);
    const onResize = () => place(hovered ?? active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, hovered, place]);

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); return; }
      if (event.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length;
      event.preventDefault();
      items[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <header className="fx-header" data-state={menuOpen ? "compact" : state} data-menu={menuOpen ? "open" : "closed"}>
      <div className="fx-container fx-header__inner">
        <a className="fx-header__brand" href="#top" aria-label="FIXTURE, back to top">
          <Logo />
        </a>
        <nav ref={navRef} className="fx-header__nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {LINKS.map((link, index) => (
            <a key={link.id} data-link={link.id} className="fx-header__link" href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} onPointerEnter={() => setHovered(link.id)} onFocus={() => setHovered(link.id)} onBlur={() => setHovered(null)} style={{ "--i": index } as CSSProperties}>
              {link.label}
            </a>
          ))}
          <span className="fx-header__indicator" aria-hidden="true" data-visible={indicator ? "true" : "false"} style={indicator ? ({ "--x": `${indicator.x}px`, "--w": indicator.w } as CSSProperties) : undefined} />
        </nav>
        <StudioStatus className="fx-header__status" />
        <Magnetic>
          <a className="fx-button fx-button--primary fx-header__cta" href="#book">
            <span className="fx-button__fill" aria-hidden="true" />
            <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
          </a>
        </Magnetic>
        <button ref={toggleRef} type="button" className="fx-header__toggle" aria-expanded={menuOpen} aria-controls="fx-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span className="fx-sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="fx-header__toggle-bars" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <span className="fx-header__progress" aria-hidden="true" />
      <div ref={panelRef} id="fx-menu" className="fx-menu" data-open={menuOpen ? "true" : "false"} hidden={!menuOpen}>
        <nav aria-label="Menu">
          {LINKS.map((link, index) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} style={{ "--i": index } as CSSProperties}>
              <span className="fx-mono">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a className="fx-button fx-button--primary fx-menu__cta" href="#book" onClick={() => setMenuOpen(false)} style={{ "--i": LINKS.length } as CSSProperties}>
            <span className="fx-button__fill" aria-hidden="true" />
            <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
          </a>
        </nav>
        <StudioStatus />
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/PriceList.tsx">
<![CDATA[import { SERVICES } from "../content/services";
import { STAGES } from "../fitout/scene";
import { AddToBrief } from "../forms/AddToBrief";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";

const stageName = (id: string) => STAGES.find((stage) => stage.id === id);

/** Services as shelf tags on two drawn shelves. No hourly meter, no "starting at, contact us". */
export function PriceList() {
  const shelves = [SERVICES.slice(0, 3), SERVICES.slice(3)];
  return (
    <section id="prices" className="fx-section fx-prices" aria-labelledby="fx-prices-title">
      <div className="fx-container">
        <Reveal className="fx-section-head" kind="rise">
          <p className="fx-eyebrow"><span>Price list</span><span>No hourly meter</span></p>
          <h2 id="fx-prices-title"><SplitText>{"Every stage has\na price on the tag."}</SplitText></h2>
          <p className="fx-section-lead">Pick the stages you need. Each one is scoped, priced and scheduled before we start, and if we find something extra we quote it before touching it.</p>
        </Reveal>
        {shelves.map((shelf, row) => (
          <div key={row} className="fx-shelf">
            <Reveal className="fx-shelf__rail" kind="draw" index={row} />
            <ul className="fx-shelf__tags">
              {shelf.map((service, index) => {
                const stage = stageName(service.stage);
                return (
                  <Reveal as="li" key={service.sku} kind="hang" index={index}>
                    <TiltCard className="fx-tag" max={5}>
                      <span className="fx-tag__hole" aria-hidden="true" />
                      <div className="fx-tag__top">
                        <span className="fx-mono fx-tag__sku">{service.sku}</span>
                        <span className="fx-mono fx-tag__stage">Stage {stage?.n} · {stage?.name}</span>
                      </div>
                      <h3 className="fx-tag__name">{service.name}</h3>
                      <p className="fx-tag__price">
                        {service.unit === "from" ? <span className="fx-tag__unit">from</span> : null}
                        {service.price}
                        {service.unit !== "from" && service.unit !== "flat" ? <span className="fx-tag__unit">{service.unit}</span> : null}
                        {service.unit === "flat" ? <span className="fx-tag__unit">flat</span> : null}
                      </p>
                      <p className="fx-tag__blurb">{service.blurb}</p>
                      <div className="fx-tag__foot">
                        <span className="fx-mono">Lead · {service.lead}</span>
                        <AddToBrief need={service.stage} label={service.name} />
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Scene.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { FitSheet } from "../fitout/FitSheet";
import { Readout } from "../fitout/Readout";
import { SceneController } from "../fitout/SceneController";
import { Storefront } from "../fitout/Storefront";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";

const FACTS = [
  { k: "Shops fitted", v: "64" },
  { k: "Door to door", v: "4 wks" },
  { k: "Setup from", v: "€1,800" },
];

/** Hero and fit-out in one pinned scene, so the storefront you meet at the top is the one that gets built. */
export function Scene() {
  return (
    <SceneController labelledBy="fx-hero-title">
      <div className="fx-scene__stage">
        <div className="fx-scene__ghost" aria-hidden="true">
          {["00", "01", "02", "03", "04", "05"].map((n, index) => <span key={n} data-ghost={index}>{n}</span>)}
        </div>
        <div className="fx-container fx-scene__grid">
          <div className="fx-scene__copy">
            <div className="fx-hero fx-load">
              <p className="fx-eyebrow fx-load__eyebrow"><span>Shopify studio</span><span>Rotterdam</span><span>Since 2019</span></p>
              <h1 id="fx-hero-title" className="fx-hero__title">
                <SplitText delay={220}>{"Your shop,\nfitted out\nproperly."}</SplitText>
              </h1>
              <p className="fx-hero__lead fx-load__item" style={{ "--i": 0 } as CSSProperties}>
                Five people who set up, build and tune Shopify stores for independent merchants. Flat prices per stage, four weeks door to door, and someone on the floor after launch.
              </p>
              <div className="fx-hero__actions fx-load__item" style={{ "--i": 1 } as CSSProperties}>
                <Magnetic>
                  <a className="fx-button fx-button--primary fx-button--lg" href="#book">
                    <span className="fx-button__fill" aria-hidden="true" />
                    <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
                    <span className="fx-button__arrow" aria-hidden="true">→</span>
                  </a>
                </Magnetic>
                <a className="fx-button fx-button--ghost fx-button--lg" href="#prices">
                  <span className="fx-button__fill" aria-hidden="true" />
                  <span className="fx-button__roll"><span>See the price list</span><span aria-hidden="true">See the price list</span></span>
                </a>
              </div>
              <dl className="fx-hero__facts fx-load__item" style={{ "--i": 2 } as CSSProperties}>
                {FACTS.map((fact) => (
                  <div key={fact.k}>
                    <dt className="fx-mono">{fact.k}</dt>
                    <dd>{fact.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="fx-hero__cue fx-mono fx-load__item" style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
                <span className="fx-hero__cue-line" /> Scroll to fit out the shop
              </p>
            </div>
            <FitSheet />
          </div>
          <div className="fx-scene__shop fx-load__shop">
            <Storefront />
            <Readout />
          </div>
        </div>
      </div>
    </SceneController>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Schedule.tsx">
<![CDATA["use client";

import { useRef, type CSSProperties } from "react";
import { STAGES } from "../fitout/scene";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useScrollVar } from "../motion/useScrollVar";

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Launch"];
/** [first column, last column exclusive] on the five-column week track. */
const SPANS: Record<string, [number, number]> = { shell: [1, 2], fixtures: [2, 4], wiring: [3, 4], signage: [4, 5], open: [5, 6] };

/** The fit-out schedule as a drawn Gantt. A "today" marker sweeps the weeks as the section passes. */
export function Schedule() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollVar(ref, "--fx-pass");

  return (
    <section ref={ref} id="schedule" className="fx-section fx-schedule" aria-labelledby="fx-schedule-title">
      <div className="fx-container">
        <Reveal className="fx-section-head fx-section-head--split" kind="rise">
          <p className="fx-eyebrow"><span>Schedule</span><span>Door to door</span></p>
          <h2 id="fx-schedule-title"><SplitText>{"Four weeks from\nshell to open."}</SplitText></h2>
          <p className="fx-section-lead">A typical full fit-out. Smaller jobs, like a speed audit or two apps, take days, not weeks. Every client gets the schedule on day one and a written update every Friday.</p>
        </Reveal>

        <Reveal className="fx-gantt" kind="rise">
          <div className="fx-gantt__weeks" aria-hidden="true">
            <span />
            {WEEKS.map((week) => <span key={week} className="fx-mono">{week}</span>)}
          </div>
          <ol className="fx-gantt__rows">
            {STAGES.map((stage, index) => {
              const [from, to] = SPANS[stage.id];
              return (
                <li key={stage.id} className="fx-gantt__row" style={{ "--i": index } as CSSProperties}>
                  <span className="fx-gantt__label"><span className="fx-mono">{stage.n}</span>{stage.name}</span>
                  <span className="fx-gantt__track">
                    <span className="fx-gantt__bar" style={{ gridColumn: `${from} / ${to}` } as CSSProperties}>
                      <span className="fx-gantt__bar-text">{stage.service}</span>
                    </span>
                  </span>
                  <span className="fx-sr">{stage.week}</span>
                </li>
              );
            })}
          </ol>
          <div className="fx-gantt__marker" aria-hidden="true"><span className="fx-gantt__marker-line"><span className="fx-mono">Today</span></span></div>
          <p className="fx-gantt__after fx-mono">Then: monthly care, same team →</p>
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/sections/Work.tsx">
<![CDATA["use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { CASES } from "../content/work";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

type Mode = "before" | "after";

/** Three shops we fitted, each with the same numbers measured before and after. */
export function Work() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [mode, setMode] = useState<Mode>("after");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = CASES[index];

  const select = (next: number) => {
    const wrapped = (next + CASES.length) % CASES.length;
    setDir(wrapped >= index ? "next" : "prev");
    setIndex(wrapped);
    tabs.current[wrapped]?.focus();
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); select(index + 1); }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); select(index - 1); }
    if (event.key === "Home") { event.preventDefault(); select(0); }
    if (event.key === "End") { event.preventDefault(); select(CASES.length - 1); }
  };

  return (
    <section id="work" className="fx-section fx-work" aria-labelledby="fx-work-title">
      <div className="fx-work__slab">
        <div className="fx-container">
          <Reveal className="fx-section-head" kind="rise">
            <p className="fx-eyebrow"><span>Work</span><span>Measured, not guessed</span></p>
            <h2 id="fx-work-title"><SplitText>{"Three shops,\nbefore and after."}</SplitText></h2>
          </Reveal>

          <div className="fx-work__grid">
            <div className="fx-work__tabs" role="tablist" aria-label="Case studies" aria-orientation="vertical" onKeyDown={onKey} style={{ "--tab": index } as CSSProperties}>
              <span className="fx-work__tab-indicator" aria-hidden="true" />
              {CASES.map((entry, n) => (
                <button
                  key={entry.id}
                  ref={(node) => { tabs.current[n] = node; }}
                  id={`fx-tab-${entry.id}`}
                  role="tab"
                  type="button"
                  className="fx-work__tab"
                  aria-selected={n === index}
                  aria-controls={`fx-panel-${entry.id}`}
                  tabIndex={n === index ? 0 : -1}
                  onClick={() => select(n)}
                >
                  <span className="fx-mono">0{n + 1}</span>
                  <span className="fx-work__tab-name">{entry.merchant}</span>
                  <span className="fx-work__tab-meta">{entry.city} · {entry.trade}</span>
                </button>
              ))}
            </div>

            <div key={item.id} id={`fx-panel-${item.id}`} role="tabpanel" aria-labelledby={`fx-tab-${item.id}`} className="fx-work__panel" data-dir={dir}>
              <div className="fx-work__panel-head">
                <h3>{item.merchant}</h3>
                <ul className="fx-work__fitted" aria-label="What we fitted">
                  {item.fitted.map((label) => <li key={label}>{label}</li>)}
                </ul>
              </div>
              <blockquote className="fx-work__quote">“{item.quote}”</blockquote>

              <div className="fx-work__toggle" role="group" aria-label="Show numbers" data-mode={mode}>
                <span className="fx-work__toggle-thumb" aria-hidden="true" />
                <button type="button" aria-pressed={mode === "before"} onClick={() => setMode("before")}>Before</button>
                <button type="button" aria-pressed={mode === "after"} onClick={() => setMode("after")}>After</button>
              </div>

              <ul className="fx-work__metrics">
                {item.metrics.map((metric, n) => {
                  const value = mode === "after" ? metric.after : metric.before;
                  const scale = value / Math.max(metric.before, metric.after);
                  return (
                    <li key={metric.label} className="fx-metric" style={{ "--i": n, "--scale": scale.toFixed(3) } as CSSProperties} data-better={mode === "after" ? "true" : "false"}>
                      <span className="fx-mono fx-metric__label">{metric.label}</span>
                      <CountUp className="fx-metric__value" value={value} from={metric.before} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} />
                      <span className="fx-metric__bar" aria-hidden="true"><span /></span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/studio/hours.ts">
<![CDATA[export type StudioStatus = { open: boolean; label: string };

const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n: number) => String(n).padStart(2, "0");

function localParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return { day: DAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const isWorkday = (day: number) => day >= 1 && day <= 5;

/** Is the Rotterdam studio open (Mon–Fri 09:00–18:00 local), and when does that change? */
export function studioStatus(date: Date, timeZone = "Europe/Amsterdam"): StudioStatus {
  const { day, minutes } = localParts(date, timeZone);
  const opens = OPEN_HOUR * 60;
  const closes = CLOSE_HOUR * 60;
  if (isWorkday(day) && minutes >= opens && minutes < closes) {
    return { open: true, label: `Open · closes ${pad(CLOSE_HOUR)}:00` };
  }
  if (isWorkday(day) && minutes < opens) {
    return { open: false, label: `Closed · opens ${pad(OPEN_HOUR)}:00` };
  }
  let next = (day + 1) % 7;
  while (!isWorkday(next)) next = (next + 1) % 7;
  return { open: false, label: `Closed · opens ${DAYS[next]} ${pad(OPEN_HOUR)}:00` };
}
]]>
    </file>
    <file path="src/app/(fixture)/fixture/studio/StudioStatus.tsx">
<![CDATA["use client";

import { useEffect, useState } from "react";
import { studioStatus, type StudioStatus as Status } from "./hours";

/** The shop sign, for the studio itself. Renders the plain hours on the server, then the live state each minute. */
export function StudioStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(studioStatus(new Date()));
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={`fx-status ${className ?? ""}`} data-open={status ? String(status.open) : undefined}>
      <span className="fx-status__dot" aria-hidden="true" />
      <span className="fx-status__label">{status ? status.label : "Mon–Fri 09–18 CET"}</span>
    </span>
  );
}
]]>
    </file>
  </files>
</template>
