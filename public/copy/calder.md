<template slug="calder" name="CALDER & ROWE">
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
    <file path="src/app/(calder)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cutive_Mono, Fraunces, Instrument_Sans } from "next/font/google";
import { MOTION_SCRIPT } from "./calder/motion/mode";
import "./calder/calder.css";

// One light weight, roman and italic: the optical-size axis alone would cost ~110 KB more on the first paint.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "300",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

const cutive = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cutive",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Calder & Rowe — Hard decisions, argued well",
  description:
    "A New York law firm of eleven attorneys for business, disputes, employment and estates. When the matter is consequential, you work directly with the partners who argue it.",
};

export const viewport: Viewport = {
  themeColor: "#0E1830",
  colorScheme: "light",
};

export default function CalderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable} ${cutive.variable}`} suppressHydrationWarning>
      <body className="cr-body">
        <script
          // Sets data-cr-motion before first paint: "live" only with JS and no reduced-motion preference.
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(calder)/calder/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/calder";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/** A responsive <picture> once the image has been processed; until then a labelled placeholder that holds the box. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 40vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`cr-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <svg className="cr-placeholder__art" viewBox="0 0 120 150" fill="none" aria-hidden="true">
          <circle cx="60" cy="52" r="20" />
          <path d="M20 150c0-30 17-52 40-52s40 22 40 52" />
        </svg>
        <span className="cr-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/calder.css">
<![CDATA[@import "tailwindcss";

/* Calder & Rowe — midnight + gold. Quiet luxury: settle, dissolve. Every colour below is a palette role; everything
   else is a var() or a color-mix() of these. */
@theme static {
  --color-ink: #070C17; /* ground, text on paper */
  --color-midnight: #0E1830; /* slabs */
  --color-ivory: #F5F0E4; /* paper, text on slabs */
  --color-gold: #C9A55A; /* the one accent: hairlines, numerals, the seal */
  --color-parchment: #E8DFCB; /* paper tint */
  --color-slate: #55607A; /* muted text on paper */
  --color-brass: #7D5F1F; /* gold as text on paper (AA) */
  --color-garnet: #9C3A2E; /* errors only */

  --font-display: var(--font-fraunces), "Iowan Old Style", Georgia, serif;
  --font-body: var(--font-instrument), system-ui, sans-serif;
  --font-mono: var(--font-cutive), ui-monospace, "Courier New", monospace;

  /* motion: soft / luxurious. quint-out family, long staggers */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: linear(0, 0.3 7%, 0.78 17%, 1.05 28%, 1.03 40%, 0.99 56%, 1);
  --dur-instant: 110ms;
  --dur-fast: 220ms;
  --dur-base: 420ms;
  --dur-slow: 1000ms;
  --dur-hero: 1300ms;
  --dur-scene: 2000ms;
  --reveal-shift: 26px;
  --stagger: 70ms;
}

:root {
  --cr-pad: clamp(88px, 12vw, 168px);
  --cr-lap: clamp(28px, 4vw, 56px);
  --cr-lap-r: clamp(28px, 4vw, 56px);
  --cr-gutter: clamp(20px, 5vw, 72px);
  --cr-muted-paper: color-mix(in srgb, var(--color-ink) 72%, transparent);
  --cr-muted-slab: color-mix(in srgb, var(--color-ivory) 74%, transparent);
  --cr-hair-paper: color-mix(in srgb, var(--color-ink) 14%, transparent);
  --cr-hair-slab: color-mix(in srgb, var(--color-ivory) 16%, transparent);
}

html:has(.cr-body) {
  scroll-padding-top: 96px;
  background: var(--color-ink);
}

.cr-body {
  margin: 0;
  background: var(--color-ink);
  color: var(--color-ivory);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.cr-body ::selection { background: var(--color-gold); color: var(--color-ink); }
.cr-body :focus-visible { outline: 2px solid var(--color-gold); outline-offset: 3px; }
.cr-slab--paper :focus-visible, .cr-file__card :focus-visible { outline-color: var(--color-brass); }
.cr-site { overflow-x: clip; }
.cr-wrap { width: min(1240px, calc(100% - var(--cr-gutter) * 2)); margin-inline: auto; }
.cr-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
.cr-tabular { font-variant-numeric: tabular-nums; }
.cr-mono { font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; }
.cr-skip { position: fixed; left: 12px; top: -100px; z-index: 80; padding: 10px 18px; border-radius: 999px; background: var(--color-gold); color: var(--color-ink); font-size: 14px; text-decoration: none; }
.cr-skip:focus { top: 12px; }

.cr-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .7 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ───────────── type ───────────── */
:where(.cr-body) :is(h1, h2, h3) { font-family: var(--font-display); font-weight: 300; text-wrap: balance; }
.cr-lead, .cr-lede { text-wrap: pretty; }
.cr-body em { font-style: italic; color: var(--color-gold); }
.cr-slab--paper em, .cr-file__card em, .cr-sheet em, .cr-brief em { color: var(--color-brass); }
.cr-h1 { font-size: clamp(2.7rem, 6.3vw, 6.2rem); line-height: 1; letter-spacing: -0.022em; word-spacing: 0.08em; }
.cr-h2 { font-size: clamp(2.2rem, 5vw, 4.7rem); line-height: 1.04; letter-spacing: -0.02em; word-spacing: 0.06em; }
.cr-quote__text, .cr-partner__name, .cr-acc__q { word-spacing: 0.06em; }
.cr-lead { max-width: 33em; font-size: clamp(1.05rem, 1.5vw, 1.25rem); color: var(--cr-muted-slab); }
.cr-lede { max-width: 34em; font-size: 1.12rem; color: var(--cr-muted-paper); }
.cr-slab--slab .cr-lede, .cr-arg .cr-lede { color: var(--cr-muted-slab); }
.cr-fine { margin-top: 28px; font-size: 0.82rem; color: var(--cr-muted-slab); }

.cr-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.14em; text-transform: uppercase; }
.cr-eyebrow--paper { color: var(--color-brass); }
.cr-eyebrow--slab { color: var(--color-gold); }
.cr-eyebrow__rule { width: 56px; height: 1px; background: currentColor; opacity: 0.7; transform-origin: left; }

/* display lines that rise through a mask */
.cr-line { display: block; overflow: clip; padding-bottom: 0.16em; margin-bottom: -0.16em; }
.cr-line__in { display: block; }
.cr-line em { display: inline-block; padding-right: 0.06em; }

.cr-head { max-width: 900px; margin-bottom: clamp(44px, 6vw, 92px); }
.cr-head .cr-lede { margin-top: 28px; }
.cr-head--split { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 88px); align-items: end; max-width: none; }
.cr-head--split .cr-lede { margin-top: 0; padding-bottom: 8px; }

/* ───────────── buttons & links ───────────── */
.cr-magnetic { display: inline-block; transform: translate3d(var(--mx, 0), var(--my, 0), 0); }

.cr-btn {
  --fill: var(--color-ivory);
  --bg: var(--color-gold);
  --fg: var(--color-ink);
  --disc: var(--color-ink);
  --disc-fg: var(--color-ivory);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding: 7px 7px 7px 28px;
  border-radius: 999px;
  background: var(--bg);
  color: var(--fg);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  transition: transform var(--dur-base) var(--ease-spring), color var(--dur-fast) var(--ease-out);
}
.cr-btn--ivory { --bg: var(--color-ivory); --fill: var(--color-gold); }
.cr-btn--ghost { --bg: transparent; --fill: var(--color-gold); --disc: var(--color-gold); --disc-fg: var(--color-ink); --fg: var(--color-ivory); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-gold) 55%, transparent); }
.cr-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--fill);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  transform: translateY(102%);
  transition: transform var(--dur-base) var(--ease-out-expo), border-radius var(--dur-base) var(--ease-out-expo);
}
.cr-btn--ghost:hover { --fg: var(--color-ink); }
.cr-btn__label { position: relative; display: block; height: 1.3em; overflow: clip; line-height: 1.3; }
.cr-btn__label > span { display: block; position: relative; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-btn__label > span::after { content: attr(data-text); content: attr(data-text) / ""; position: absolute; left: 0; top: 100%; white-space: nowrap; }
.cr-btn__disc { position: relative; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--disc); color: var(--disc-fg); overflow: clip; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-btn__arrow { position: absolute; width: 16px; height: 16px; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-btn__arrow--b { transform: translateX(-220%); }
.cr-btn:active { transform: scale(0.97); transition-duration: var(--dur-instant); }

.cr-link { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 6px 0; color: var(--color-ivory); font-size: 15px; text-decoration: none; }
.cr-link svg { width: 16px; height: 16px; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-link::before, .cr-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; }
.cr-link::before { opacity: 0.28; }
.cr-link::after { transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out-expo); }

@media (hover: hover) and (pointer: fine) {
  .cr-btn:hover::before { transform: translateY(0); border-radius: 0; }
  .cr-btn:hover .cr-btn__label > span { transform: translateY(-100%); }
  .cr-btn:hover .cr-btn__arrow:not(.cr-btn__arrow--b) { transform: translateX(220%); }
  .cr-btn:hover .cr-btn__arrow--b { transform: translateX(0); }
  .cr-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .cr-link:hover svg { transform: translateY(3px); }
}

/* ───────────── header ───────────── */
.cr-progress { position: fixed; inset: 0 0 auto; z-index: 70; height: 2px; background: var(--color-gold); transform-origin: left; transform: scaleX(0); pointer-events: none; }
.cr-header { position: fixed; inset: 14px 0 auto; z-index: 50; display: flex; justify-content: center; padding-inline: clamp(12px, 3vw, 32px); pointer-events: none; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-header[data-state="hidden"] { transform: translateY(-150%); }
.cr-header__bar { position: relative; display: flex; align-items: center; gap: clamp(14px, 2.4vw, 36px); width: min(1240px, 100%); padding: 9px 10px 9px 22px; border-radius: 999px; color: var(--color-ivory); pointer-events: auto; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-header[data-state="compact"] .cr-header__bar { transform: scale(0.975); }
.cr-header__glass { position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: color-mix(in srgb, var(--color-ink) 70%, transparent); border: 1px solid color-mix(in srgb, var(--color-gold) 26%, transparent); backdrop-filter: blur(16px) saturate(1.2); opacity: 0.5; transition: opacity var(--dur-base) var(--ease-out); }
.cr-header[data-state="compact"] .cr-header__glass, .cr-header[data-state="hidden"] .cr-header__glass { opacity: 1; }
.cr-header[data-state="open"] .cr-header__glass { opacity: 0; }

.cr-logo { display: inline-flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
.cr-logo__mark { width: 38px; height: 38px; flex: none; color: var(--color-ivory); }
.cr-logo__word { display: grid; line-height: 1.1; }
.cr-logo__name { font-family: var(--font-display); font-size: 1.12rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; }
.cr-logo__name i { font-style: italic; color: var(--color-gold); letter-spacing: 0; padding-inline: 0.1em; }
.cr-logo__sub { font-size: 0.6rem; letter-spacing: 0.34em; text-transform: uppercase; color: color-mix(in srgb, var(--color-ivory) 66%, transparent); margin-top: 3px; }

.cr-nav { position: relative; display: none; margin-inline: auto; gap: 4px; }
.cr-nav a { position: relative; padding: 11px 15px; border-radius: 999px; font-size: 14.5px; color: var(--cr-muted-slab); text-decoration: none; transition: color var(--dur-fast) var(--ease-out); }
.cr-nav a:hover, .cr-nav a[aria-current="location"] { color: var(--color-ivory); }
.cr-nav__ink { position: absolute; left: 0; bottom: 3px; width: 1px; height: 1px; background: var(--color-gold); transform-origin: left; transform: translateX(var(--ix, 0px)) scaleX(var(--iw, 0)); opacity: var(--ix-o, 0); transition: transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-fast) var(--ease-out); }

.cr-header__end { display: flex; align-items: center; gap: 14px; margin-left: auto; }
.cr-header__phone { display: none; padding: 8px 4px; font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.08em; color: var(--cr-muted-slab); text-decoration: none; transition: color var(--dur-fast); }
.cr-header__phone:hover { color: var(--color-gold); }
.cr-header__cta { position: relative; display: none; padding: 12px 22px; border-radius: 999px; background: var(--color-gold); color: var(--color-ink); font-size: 14.5px; font-weight: 500; text-decoration: none; overflow: hidden; isolation: isolate; transition: transform var(--dur-base) var(--ease-spring); }
.cr-header__cta::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-ivory); border-radius: 50% 50% 0 0 / 100% 100% 0 0; transform: translateY(102%); transition: transform var(--dur-base) var(--ease-out-expo), border-radius var(--dur-base) var(--ease-out-expo); }
.cr-header__cta:active { transform: scale(0.96); transition-duration: var(--dur-instant); }
@media (hover: hover) and (pointer: fine) { .cr-header__cta:hover::before { transform: translateY(0); border-radius: 0; } }

.cr-toggle { position: relative; display: grid; place-items: center; width: 46px; height: 46px; padding: 0; border: 0; border-radius: 50%; background: color-mix(in srgb, var(--color-ivory) 10%, transparent); color: var(--color-ivory); cursor: pointer; transition: transform var(--dur-base) var(--ease-spring), background var(--dur-fast); }
.cr-toggle:active { transform: scale(0.92); transition-duration: var(--dur-instant); }
.cr-toggle i { position: absolute; width: 18px; height: 1.5px; border-radius: 2px; background: currentColor; transition: transform var(--dur-base) var(--ease-out-expo); }
.cr-toggle i:first-child { transform: translateY(-4px); }
.cr-toggle i:last-child { transform: translateY(4px); }
.cr-toggle[aria-expanded="true"] i:first-child { transform: rotate(45deg); }
.cr-toggle[aria-expanded="true"] i:last-child { transform: rotate(-45deg); }

.cr-menu { position: fixed; inset: 0; z-index: 40; display: flex; flex-direction: column; justify-content: center; gap: 40px; padding: 120px var(--cr-gutter) 48px; background: var(--color-ink); color: var(--color-ivory); clip-path: circle(0% at calc(100% - 46px) 46px); visibility: hidden; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s linear var(--dur-slow); }
.cr-menu[data-open="true"] { clip-path: circle(150% at calc(100% - 46px) 46px); visibility: visible; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s; }
.cr-menu nav { display: grid; gap: 4px; }
.cr-menu nav a { display: flex; align-items: baseline; gap: 18px; padding: 8px 0; font-family: var(--font-display); font-size: clamp(2.2rem, 9vw, 3.6rem); font-weight: 300; color: var(--color-ivory); text-decoration: none; opacity: 0; transform: translateY(24px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); }
.cr-menu nav a.cr-menu__cta { margin-top: 18px; width: fit-content; padding: 14px 28px; border-radius: 999px; background: var(--color-gold); color: var(--color-ink); font-family: var(--font-body); font-size: 1rem; font-weight: 500; }
.cr-menu__n { font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-gold); }
.cr-menu__foot { display: grid; gap: 4px; font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.03em; color: var(--cr-muted-slab); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cr-menu__foot a { color: var(--color-gold); text-decoration: none; }
.cr-menu[data-open="true"] nav a, .cr-menu[data-open="true"] .cr-menu__foot { opacity: 1; transform: none; transition-delay: calc(260ms + var(--i, 0) * 70ms); }

@media (min-width: 980px) {
  .cr-nav { display: flex; }
  .cr-header__end { margin-left: 0; }
  .cr-toggle, .cr-menu { display: none; }
  .cr-header__cta { display: inline-block; }
}
@media (min-width: 1180px) { .cr-header__phone { display: inline-block; } }
@media (max-width: 979px) { .cr-header__cta { display: none; } }
@media (max-width: 420px) { .cr-logo__sub { display: none; } .cr-logo__mark { width: 34px; height: 34px; } }

/* ───────────── hero ───────────── */
.cr-hero { position: relative; display: flex; flex-direction: column; justify-content: center; min-height: 100svh; padding: clamp(128px, 17vh, 176px) 0 calc(var(--cr-lap) + 56px); background: var(--color-midnight); color: var(--color-ivory); overflow: clip; }
.cr-hero__bg { position: absolute; inset: 0; pointer-events: none; }
.cr-hero__lines { position: absolute; inset: auto 0 0 0; height: 82%; opacity: 0.2; /* ScrollVars drifts it on scroll by writing transform directly */ }
.cr-colonnade { width: 100%; height: 100%; }
.cr-hero__glow { position: absolute; width: 70vmax; height: 70vmax; right: -22vmax; top: -30vmax; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--color-gold) 22%, transparent), transparent 70%); }
.cr-hero .cr-grain { opacity: 0.08; }

.cr-hero__grid { position: relative; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(36px, 5vw, 88px); align-items: center; transform-origin: 50% 100%; /* ScrollVars scales and dims it as the next slab laps over */ }
.cr-hero__copy { display: grid; justify-items: start; gap: 0; }
.cr-hero .cr-h1 { margin-bottom: clamp(22px, 3vw, 36px); }
.cr-hero__cta { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 34px; margin-top: clamp(28px, 3.4vw, 44px); }

.cr-hero__sheets { position: relative; width: min(460px, 100%); justify-self: end; aspect-ratio: 4 / 5; }
.cr-sheet { position: absolute; inset: 0; border-radius: 22px; background: var(--color-ivory); color: var(--color-ink); }
.cr-sheet--back { background: var(--color-parchment); transform: translate(6%, 3%) rotate(4.4deg); opacity: 0.9; }
.cr-sheet--front { margin: 0; display: flex; flex-direction: column; gap: 14px; padding: clamp(22px, 2.6vw, 34px) clamp(22px, 2.6vw, 34px) clamp(22px, 2.6vw, 30px) clamp(40px, 4.6vw, 62px); transform: rotate(-2.2deg); background-image: linear-gradient(90deg, transparent 0 clamp(26px, 3.2vw, 42px), color-mix(in srgb, var(--color-gold) 60%, transparent) clamp(26px, 3.2vw, 42px) calc(clamp(26px, 3.2vw, 42px) + 1px), transparent calc(clamp(26px, 3.2vw, 42px) + 1px)); box-shadow: 0 40px 80px -30px color-mix(in srgb, var(--color-ink) 70%, transparent); }
.cr-sheet__head { display: flex; justify-content: space-between; gap: 12px; color: var(--color-slate); }
.cr-sheet__matter { font-family: var(--font-display); font-size: clamp(1.25rem, 2vw, 1.6rem); font-weight: 300; line-height: 1.15; }
.cr-sheet__rule { height: 1px; background: var(--cr-hair-paper); transform-origin: left; }
.cr-sheet__clause { font-size: clamp(0.88rem, 1.05vw, 0.98rem); line-height: 1.55; color: color-mix(in srgb, var(--color-ink) 84%, transparent); }
.cr-sheet__clause b { font-family: var(--font-display); font-style: italic; font-weight: 400; color: var(--color-brass); }
.cr-sheet__ghost { display: grid; gap: 9px; margin-top: 4px; }
.cr-sheet__ghost i { display: block; height: 6px; border-radius: 6px; background: var(--cr-hair-paper); }
.cr-sheet__ghost i:nth-child(2) { width: 88%; }
.cr-sheet__ghost i:nth-child(3) { width: 54%; }
.cr-sheet__sign { margin-top: auto; display: grid; gap: 6px; color: var(--color-slate); }
.cr-sheet__sig { display: block; width: 120px; height: 28px; border-bottom: 1px solid var(--cr-hair-paper); background: linear-gradient(var(--color-brass), var(--color-brass)) 6px 12px / 70px 1.5px no-repeat; transform: rotate(-3deg); transform-origin: left; opacity: 0.85; }

.cr-note { font-family: var(--font-display); font-style: italic; font-weight: 300; color: var(--color-brass); font-size: 1.02rem; line-height: 1.3; }
.cr-note--sheet { position: absolute; right: clamp(-18px, -1vw, -6px); top: 67%; padding: 8px 16px; border-radius: 999px; background: var(--color-gold); color: var(--color-ink); font-style: normal; font-family: var(--font-body); font-size: 0.82rem; font-weight: 500; transform: rotate(-4deg); }
/* the seal's base comes first so the placed seals below (hero, brief) can make themselves absolute */
.cr-seal { position: relative; display: block; aspect-ratio: 1; }
.cr-seal > svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cr-hero__seal { --seal-bg: var(--color-midnight); position: absolute; width: clamp(96px, 11vw, 138px); right: clamp(-26px, -2vw, -10px); bottom: -5%; transform: rotate(-12deg); }
.cr-seal__text { font-family: var(--font-body); font-size: 11px; letter-spacing: 0.1em; }
.cr-seal__caption { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; }

.cr-hero__strip { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; margin-top: clamp(48px, 7vw, 96px); margin-bottom: 0; padding: 0; border-top: 1px solid var(--cr-hair-slab); }
.cr-hero__strip > div { padding: 22px 20px 0 0; }
.cr-hero__strip dt { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-gold); }
.cr-hero__strip dd { margin: 6px 0 0; font-size: 1rem; color: var(--color-ivory); }
.cr-hero__strip a { color: inherit; text-decoration: none; }
.cr-hero__strip a:hover { color: var(--color-gold); }

/* ───────────── slabs: each section laps over the last ───────────── */
.cr-slab { position: relative; z-index: 1; margin-top: calc(var(--cr-lap) * -1); padding: calc(var(--cr-pad) + var(--cr-lap)) 0 var(--cr-pad); border-radius: var(--cr-lap-r) var(--cr-lap-r) 0 0; overflow: clip; }
.cr-slab--paper { background: var(--color-ivory); color: var(--color-ink); }
.cr-slab--slab { background: var(--color-midnight); color: var(--color-ivory); }

/* ───────────── matters ───────────── */
.cr-counts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(16px, 2vw, 28px); }
.cr-tilt { --lift: 0px; position: relative; isolation: isolate; transform: perspective(900px) translate3d(0, var(--lift), 0) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out); }
.cr-tilt::before { content: ""; position: absolute; inset: 10% 5% -4%; z-index: -1; border-radius: 28px; background: var(--color-ink); filter: blur(18px); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.cr-count > article { position: relative; display: flex; flex-direction: column; height: 100%; padding: clamp(28px, 3.2vw, 46px); border-radius: 28px; background: color-mix(in srgb, var(--color-parchment) 52%, var(--color-ivory)); border: 1px solid var(--cr-hair-paper); overflow: hidden; }
.cr-count__glow { position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(440px circle at var(--sx, 50%) var(--sy, 40%), color-mix(in srgb, var(--color-gold) 30%, transparent), transparent 62%); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); pointer-events: none; }
.cr-count__ghost { position: absolute; right: 26px; top: 4px; font-family: var(--font-display); font-style: italic; font-weight: 300; font-size: clamp(4.5rem, 7vw, 6.5rem); line-height: 1; color: color-mix(in srgb, var(--color-gold) 26%, transparent); pointer-events: none; transition: transform var(--dur-slow) var(--ease-out-expo); }
.cr-count__label { position: relative; color: var(--color-brass); }
.cr-count__title { position: relative; margin-top: 18px; max-width: 12em; font-size: clamp(1.7rem, 2.8vw, 2.4rem); line-height: 1.1; letter-spacing: -0.015em; }
.cr-count__summary { position: relative; margin-top: 16px; max-width: 30em; color: var(--cr-muted-paper); }
.cr-count__list { position: relative; list-style: none; display: grid; gap: 10px; margin: 26px 0 0; padding: 22px 0 0; border-top: 1px solid var(--cr-hair-paper); font-size: 0.97rem; }
.cr-count__list li { display: flex; align-items: baseline; gap: 12px; }
.cr-count__list li::before { content: ""; flex: none; width: 6px; height: 6px; background: var(--color-gold); transform: translateY(-1px) rotate(45deg); }
.cr-count__ask { position: relative; display: inline-flex; align-items: center; gap: 14px; margin-top: auto; padding-top: 30px; width: fit-content; color: var(--color-ink); font-size: 0.95rem; font-weight: 500; text-decoration: none; }
.cr-count__disc { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--color-ink); color: var(--color-ivory); transition: transform var(--dur-base) var(--ease-spring), background var(--dur-fast); }
.cr-count__disc svg { width: 16px; height: 16px; }
.cr-count__ask:active .cr-count__disc { transform: scale(0.9); }
@media (hover: hover) and (pointer: fine) {
  .cr-count:hover { --lift: -8px; }
  .cr-count:hover::before { opacity: 0.16; }
  .cr-count:hover .cr-count__glow { opacity: 1; }
  .cr-count:hover .cr-count__ghost { transform: translateY(8px) scale(1.04); }
  .cr-counts:has(.cr-count:hover) .cr-count:not(:hover) { opacity: 0.55; }
  .cr-count__ask:hover .cr-count__disc { transform: translateX(6px); background: var(--color-brass); }
}
.cr-count:active { --lift: -3px; }

/* ───────────── the argument: the pinned brief ───────────── */
.cr-arg { position: relative; z-index: 1; margin-top: calc(var(--cr-lap) * -1); border-radius: var(--cr-lap-r) var(--cr-lap-r) 0 0; background: var(--color-midnight); color: var(--color-ivory); }
.cr-arg__stage { padding: calc(var(--cr-pad) + var(--cr-lap)) 0 var(--cr-pad); }
.cr-arg__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(36px, 6vw, 112px); align-items: center; }
.cr-arg__intro .cr-h2 { margin-bottom: clamp(24px, 3.6vh, 44px); font-size: clamp(2.1rem, 3.5vw, 3.3rem); }
.cr-steps { position: relative; padding-left: 28px; }
.cr-steps ol { list-style: none; margin: 0; padding: 0; }
.cr-arg__rail { position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: var(--cr-hair-slab); }
.cr-arg__rail i { position: absolute; inset: 0; background: var(--color-gold); transform-origin: top; /* BriefDriver fills it by writing transform directly */ }
.cr-step { display: grid; grid-template-columns: 3rem 1fr; gap: 6px; padding: 16px 0; border-top: 1px solid var(--cr-hair-slab); transition: opacity var(--dur-base) var(--ease-out); }
.cr-step:first-child { border-top: 0; padding-top: 0; }
.cr-step__n { color: var(--color-gold); padding-top: 6px; }
.cr-step h3 { font-size: clamp(1.4rem, 2.2vw, 1.85rem); line-height: 1.1; }
.cr-step p { margin-top: 4px; font-size: 0.95rem; color: var(--cr-muted-slab); }

.cr-brief { position: relative; display: flex; flex-direction: column; gap: clamp(10px, 1.9vh, 18px); padding: clamp(22px, 3.4vh, 38px) clamp(22px, 3.2vw, 46px) clamp(18px, 2.6vh, 28px) clamp(40px, 5vw, 76px); border-radius: 24px; background: var(--color-ivory); color: var(--color-ink); box-shadow: 0 50px 100px -40px color-mix(in srgb, var(--color-ink) 90%, transparent); background-image: linear-gradient(90deg, transparent 0 clamp(26px, 3.4vw, 50px), color-mix(in srgb, var(--color-gold) 62%, transparent) clamp(26px, 3.4vw, 50px) calc(clamp(26px, 3.4vw, 50px) + 1px), transparent calc(clamp(26px, 3.4vw, 50px) + 1px)); }
.cr-brief__head { display: flex; justify-content: space-between; gap: 12px; color: var(--color-slate); }
.cr-arg:not([data-pin="1"]) [data-page] { visibility: hidden; }
.cr-brief__matter { font-family: var(--font-display); font-size: clamp(1.3rem, 2.6vh, 1.8rem); font-weight: 300; line-height: 1.15; padding-bottom: clamp(8px, 1.6vh, 14px); border-bottom: 1px solid var(--cr-hair-paper); }
.cr-clause { display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 18px; row-gap: clamp(3px, 0.7vh, 8px); align-items: baseline; }
.cr-clause__h { display: flex; align-items: baseline; gap: 12px; font-size: clamp(1.1rem, 2.3vh, 1.45rem); font-weight: 400; line-height: 1.15; opacity: clamp(0.3, calc(0.3 + var(--p, 1) * 4), 1); }
.cr-clause__n { font-family: var(--font-display); font-style: italic; font-size: 1em; letter-spacing: 0; text-transform: none; color: var(--color-brass); }
.cr-clause__body { grid-column: 1 / -1; font-size: clamp(0.86rem, 1.95vh, 1rem); line-height: 1.5; color: var(--color-ink); }
.cr-w { opacity: clamp(0.14, calc(var(--p, 1) * var(--n) - var(--w)), 1); }
.cr-note--clause { --note: clamp(0, calc((var(--p, 1) - 0.55) * 2.4), 1); grid-column: 2; grid-row: 1; display: flex; align-items: center; gap: 10px; white-space: nowrap; font-size: clamp(0.8rem, 1.75vh, 0.94rem); opacity: var(--note); transform: translate3d(calc((1 - var(--note)) * 22px), 0, 0) rotate(-1deg); transform-origin: right; }
.cr-note--clause::before { content: ""; width: 20px; height: 1px; background: var(--color-gold); }
.cr-brief__foot { display: flex; align-items: flex-end; min-height: clamp(54px, 9vh, 84px); margin-top: auto; padding-right: 130px; color: var(--color-slate); }
.cr-brief__sign { display: grid; gap: 6px; }
.cr-brief__seal { --seal-ink: var(--color-brass); --seal-mark: var(--color-ink); position: absolute; right: clamp(16px, 2.2vw, 32px); bottom: clamp(12px, 2vh, 24px); width: clamp(84px, 13vh, 118px); transform: rotate(-8deg); }

@media (min-width: 960px) and (min-height: 620px) {
  html[data-cr-motion="live"] .cr-arg { height: 440vh; }
  html[data-cr-motion="live"] .cr-arg__stage { position: sticky; top: 0; display: flex; align-items: center; height: 100vh; height: 100svh; padding: 88px 0 26px; box-sizing: border-box; }
  .cr-arg__grid { grid-template-columns: minmax(0, 4.6fr) minmax(0, 6.4fr); }
  html[data-cr-motion="live"] .cr-arg__stage .cr-wrap { width: min(1240px, calc(100% - var(--cr-gutter) * 2)); }
  .cr-arg[data-pin="1"] .cr-step { opacity: 0.38; }
  .cr-arg[data-pin="1"] .cr-step[data-state="past"] { opacity: 0.7; }
  .cr-arg[data-pin="1"] .cr-step[data-state="active"] { opacity: 1; }
  .cr-arg[data-pin="1"] .cr-step[data-state="active"] .cr-step__n { transform: translateX(4px); }
  .cr-step__n { transition: transform var(--dur-base) var(--ease-out); }
  .cr-arg[data-pin="1"]:not([data-sealed="true"]) .cr-brief__seal { opacity: 0; transform: scale(1.7) rotate(-22deg); }
  /* a transition, not a keyframe: scrubbing back and forth reverses the press mid-flight instead of restarting it */
  .cr-arg[data-pin="1"] .cr-brief__seal { transition: transform var(--dur-hero) var(--ease-spring), opacity var(--dur-base) var(--ease-out); }
}
@media (max-width: 959px) {
  .cr-arg__grid { grid-template-columns: minmax(0, 1fr); }
  .cr-clause { grid-template-columns: minmax(0, 1fr); }
  .cr-note--clause { grid-column: 1; grid-row: auto; white-space: normal; transform-origin: left; }
  .cr-brief__foot { padding-right: 110px; min-height: 96px; }
}

/* ───────────── counsel ───────────── */
.cr-partners { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(28px, 4vw, 72px); }
.cr-partner { display: grid; gap: 28px; }
.cr-partner__photo { position: relative; aspect-ratio: 4 / 5; border-radius: 28px; overflow: hidden; }
.cr-partner__photo img, .cr-partner__photo picture { display: block; width: 100%; height: 100%; object-fit: cover; }
.cr-partner__photo > * { transition: transform var(--dur-slow) var(--ease-out-expo); }
.cr-placeholder { display: grid; place-content: center; justify-items: center; gap: 16px; width: 100%; height: 100%; min-height: 220px; background: linear-gradient(165deg, var(--color-parchment), color-mix(in srgb, var(--color-parchment) 70%, var(--color-slate))); color: var(--color-slate); }
.cr-placeholder__art { width: 34%; max-width: 150px; stroke: currentColor; stroke-width: 1.2; opacity: 0.45; }
.cr-placeholder .cr-mono { font-size: 0.72rem; opacity: 0.8; }
.cr-partner__name { font-size: clamp(2rem, 3.4vw, 3rem); line-height: 1.05; letter-spacing: -0.02em; }
.cr-partner__role { margin-top: 10px; color: var(--color-brass); }
.cr-partner__summary { margin-top: 18px; max-width: 32em; color: var(--cr-muted-paper); }
.cr-partner__creds { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 0; padding: 0; }
.cr-partner__creds li { padding: 7px 14px; border-radius: 999px; border: 1px solid var(--cr-hair-paper); font-size: 0.85rem; color: var(--cr-muted-paper); }
@media (hover: hover) and (pointer: fine) { .cr-partner:hover .cr-partner__photo > * { transform: scale(1.045); } }

.cr-facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin: clamp(56px, 8vw, 120px) 0 0; border-top: 1px solid var(--cr-hair-paper); }
.cr-fact { display: flex; flex-direction: column-reverse; gap: 6px; padding: 28px 24px 0 0; }
.cr-fact + .cr-fact { padding-left: 24px; border-left: 1px solid var(--cr-hair-paper); }
.cr-fact__value { margin: 0; font-family: var(--font-display); font-size: clamp(3.4rem, 7vw, 6.4rem); font-weight: 300; line-height: 1; letter-spacing: -0.03em; color: var(--color-brass); }
.cr-fact__label { font-size: 0.92rem; color: var(--cr-muted-paper); }

/* ───────────── authorities ───────────── */
.cr-auth { padding-bottom: 0; }
.cr-auth .cr-wrap { position: relative; }
.cr-quote { margin: 0 0 clamp(56px, 8vw, 110px); max-width: 1040px; }
.cr-quote blockquote { margin: 0; }
.cr-quote__text { display: block; font-family: var(--font-display); font-weight: 300; font-size: clamp(2rem, 4.9vw, 4.4rem); line-height: 1.12; letter-spacing: -0.02em; }
.cr-quote figcaption { display: flex; align-items: center; gap: 16px; margin-top: 34px; font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-gold); }
.cr-quote__rule { width: 56px; height: 1px; background: currentColor; }
.cr-cites { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(14px, 2vw, 24px); margin: 0; padding: 0; }
.cr-cite { position: relative; padding: 30px 28px 32px; border-radius: 24px; border: 1px solid color-mix(in srgb, var(--color-gold) 26%, transparent); background: color-mix(in srgb, var(--color-ivory) 4%, transparent); transition: transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out); }
.cr-cite__no { color: var(--color-gold); }
.cr-cite__title { margin: 14px 0 10px; font-size: 1.7rem; line-height: 1.1; }
.cr-cite p { color: var(--cr-muted-slab); font-size: 0.96rem; }
@media (hover: hover) and (pointer: fine) {
  .cr-cite:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--color-gold) 70%, transparent); background: color-mix(in srgb, var(--color-ivory) 8%, transparent); }
  .cr-cites:has(.cr-cite:hover) .cr-cite:not(:hover) { opacity: 0.6; }
}
.cr-auth__band { margin-top: clamp(64px, 9vw, 120px); padding: 26px 0 calc(26px + var(--cr-lap)); border-top: 1px solid var(--cr-hair-slab); }

.cr-marquee { overflow: hidden; outline-offset: -4px; }
.cr-marquee__track { display: flex; width: max-content; }
.cr-marquee__run { display: flex; flex: none; }
.cr-marquee__item { display: inline-flex; align-items: center; gap: clamp(24px, 3vw, 48px); padding-right: clamp(24px, 3vw, 48px); font-family: var(--font-display); font-style: italic; font-weight: 300; font-size: clamp(1.7rem, 3.6vw, 3rem); white-space: nowrap; color: color-mix(in srgb, var(--color-ivory) 82%, transparent); }
.cr-marquee__sep { font-style: normal; font-size: 0.55em; color: var(--color-gold); }
@media (prefers-reduced-motion: no-preference) {
  .cr-marquee__track { animation: cr-marquee 70s linear infinite; animation-play-state: paused; }
  .cr-marquee[data-playing="true"] .cr-marquee__track { animation-play-state: running; }
  .cr-marquee:hover .cr-marquee__track, .cr-marquee:focus-within .cr-marquee__track { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) {
  .cr-marquee__track { width: auto; flex-wrap: wrap; justify-content: center; }
  .cr-marquee__run { flex-wrap: wrap; justify-content: center; }
  .cr-marquee__track > [aria-hidden="true"] { display: none; }
}

/* ───────────── questions ───────────── */
.cr-questions__grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(36px, 6vw, 112px); align-items: start; }
.cr-questions__head { position: sticky; top: 120px; margin-bottom: 0; }
.cr-acc { border-bottom: 1px solid var(--cr-hair-paper); }
.cr-acc__item { border-top: 1px solid var(--cr-hair-paper); }
.cr-acc__item h3 { font-size: inherit; }
.cr-acc__item button { display: flex; align-items: center; justify-content: space-between; gap: 24px; width: 100%; padding: 28px 0; border: 0; background: none; color: var(--color-ink); text-align: left; cursor: pointer; font: inherit; transition: color var(--dur-fast) var(--ease-out); }
.cr-acc__q { font-family: var(--font-display); font-size: clamp(1.35rem, 2.2vw, 1.85rem); font-weight: 300; line-height: 1.2; letter-spacing: -0.01em; }
.cr-acc__icon { position: relative; flex: none; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--cr-hair-paper); transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring); }
.cr-acc__icon i { position: absolute; left: 50%; top: 50%; width: 14px; height: 1.5px; margin: -0.75px 0 0 -7px; background: var(--color-ink); transition: transform var(--dur-base) var(--ease-out-expo), background var(--dur-fast); }
.cr-acc__icon i:last-child { transform: rotate(90deg); }
.cr-acc__item[data-open="true"] .cr-acc__icon { background: var(--color-ink); border-color: var(--color-ink); }
.cr-acc__item[data-open="true"] .cr-acc__icon i { background: var(--color-ivory); }
.cr-acc__item[data-open="true"] .cr-acc__icon i:last-child { transform: rotate(0deg); }
.cr-acc__item button:active .cr-acc__icon { transform: scale(0.9); }
.cr-acc__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-base) var(--ease-out-expo); }
.cr-acc__panel > div { overflow: hidden; }
.cr-acc__panel p { max-width: 36em; padding: 0 70px 30px 0; color: var(--cr-muted-paper); opacity: 0; transform: translateY(-8px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out-expo); }
.cr-acc__item[data-open="true"] .cr-acc__panel { grid-template-rows: 1fr; }
.cr-acc__item[data-open="true"] .cr-acc__panel p { opacity: 1; transform: none; transition-delay: 90ms; }
html:not([data-cr-motion]) .cr-acc__panel { grid-template-rows: 1fr; }
html:not([data-cr-motion]) .cr-acc__panel p { opacity: 1; transform: none; }
@media (hover: hover) and (pointer: fine) { .cr-acc__item button:hover .cr-acc__q { color: var(--color-brass); } .cr-acc__item button:hover .cr-acc__icon { border-color: var(--color-brass); } }

/* ───────────── file a matter ───────────── */
.cr-file { padding-bottom: calc(var(--cr-pad) + var(--cr-lap)); }
.cr-file__grid { position: relative; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(36px, 6vw, 112px); align-items: start; }
.cr-file__copy .cr-h2 { margin-bottom: 28px; }
.cr-contact { display: grid; gap: 22px; margin: clamp(36px, 5vw, 60px) 0 0; padding-top: 28px; border-top: 1px solid var(--cr-hair-slab); }
.cr-contact dt { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-gold); }
.cr-contact dd { margin: 4px 0 0; font-size: 1.1rem; }
.cr-contact a { color: var(--color-ivory); text-decoration: none; background: linear-gradient(var(--color-gold), var(--color-gold)) 0 100% / 0 1px no-repeat; transition: background-size var(--dur-base) var(--ease-out-expo), color var(--dur-fast); }
@media (hover: hover) and (pointer: fine) { .cr-contact a:hover { background-size: 100% 1px; color: var(--color-gold); } }

.cr-file__card { position: relative; border-radius: 32px; background: var(--color-ivory); color: var(--color-ink); box-shadow: 0 60px 120px -50px color-mix(in srgb, var(--color-ink) 90%, transparent); overflow: hidden; }
.cr-form { display: grid; gap: 16px; padding: clamp(24px, 3.4vw, 44px); transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); }
.cr-file__card[data-phase="success"] .cr-form { opacity: 0; transform: translateY(-14px) scale(0.985); pointer-events: none; }

.cr-field { position: relative; }
/* the ring belongs to the input, not the field: the field also holds the error message */
.cr-input { display: block; width: 100%; height: 60px; padding: 22px 26px 0; border: 1px solid color-mix(in srgb, var(--color-ink) 22%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--color-parchment) 28%, var(--color-ivory)); color: var(--color-ink); font: inherit; font-size: 1rem; outline: 2px solid transparent; outline-offset: -1px; appearance: none; transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), outline-color var(--dur-fast) var(--ease-out); }
.cr-input:focus, .cr-input:focus-visible { outline: 2px solid var(--color-brass); outline-offset: -1px; border-color: transparent; background: var(--color-ivory); }
.cr-field[data-invalid="true"] .cr-input, .cr-field[data-invalid="true"] .cr-input:focus-visible { outline: 1.5px solid var(--color-garnet); outline-offset: -1px; border-color: transparent; }
.cr-field--area .cr-input { border-radius: 28px; }
textarea.cr-input { height: auto; min-height: 140px; padding-top: 30px; padding-bottom: 18px; resize: vertical; line-height: 1.5; }
.cr-field label { position: absolute; left: 27px; top: 30px; transform: translateY(-50%); transform-origin: left; color: var(--color-slate); font-size: 1rem; pointer-events: none; transition: transform var(--dur-base) var(--ease-out-expo), color var(--dur-fast); }
.cr-field--area label { top: 31px; }
.cr-field:focus-within label, .cr-field[data-filled="true"] label { transform: translateY(-136%) scale(0.76); color: var(--color-brass); }
.cr-field--area:focus-within label, .cr-field--area[data-filled="true"] label { transform: translateY(-118%) scale(0.76); }
.cr-field--select::before { content: ""; position: absolute; right: 28px; top: 27px; width: 8px; height: 8px; border-right: 1.5px solid var(--color-ink); border-bottom: 1.5px solid var(--color-ink); transform: rotate(45deg); pointer-events: none; }
.cr-input:hover { border-color: color-mix(in srgb, var(--color-ink) 40%, transparent); }
.cr-field__count { position: absolute; right: 22px; bottom: 12px; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.08em; color: var(--color-slate); }
.cr-field__error { margin: 8px 0 0 26px; font-size: 0.86rem; color: var(--color-garnet); }

.cr-submit { position: relative; display: grid; place-items: center; height: 62px; margin-top: 6px; border: 0; border-radius: 999px; background: var(--color-ink); color: var(--color-ivory); font: inherit; font-size: 1rem; font-weight: 500; cursor: pointer; overflow: hidden; isolation: isolate; transition: transform var(--dur-base) var(--ease-spring), opacity var(--dur-fast); }
.cr-submit::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-brass); border-radius: 50% 50% 0 0 / 100% 100% 0 0; transform: translateY(102%); transition: transform var(--dur-base) var(--ease-out-expo), border-radius var(--dur-base) var(--ease-out-expo); }
.cr-submit:active { transform: scale(0.98); transition-duration: var(--dur-instant); }
.cr-submit__label, .cr-submit__busy { grid-area: 1 / 1; transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out-expo); }
.cr-submit__busy { display: flex; gap: 7px; opacity: 0; transform: translateY(14px); }
.cr-submit__busy i { width: 7px; height: 7px; border-radius: 50%; background: var(--color-gold); }
.cr-submit[data-loading="true"] .cr-submit__label { opacity: 0; transform: translateY(-14px); }
.cr-submit[data-loading="true"] .cr-submit__busy { opacity: 1; transform: none; }
.cr-submit:disabled { cursor: progress; }
@media (hover: hover) and (pointer: fine) { .cr-submit:hover:not(:disabled)::before { transform: translateY(0); border-radius: 0; } }
.cr-form__fine { font-size: 0.8rem; text-align: center; color: var(--color-slate); }

.cr-done { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 32px; text-align: center; opacity: 0; visibility: hidden; transition: opacity var(--dur-slow) var(--ease-out), visibility 0s linear var(--dur-slow); --seal-ink: var(--color-brass); --seal-mark: var(--color-ink); }
.cr-file__card[data-phase="success"] .cr-done { opacity: 1; visibility: visible; transition-delay: 0.25s, 0s; }
.cr-done__seal { width: min(210px, 52%); margin-bottom: 6px; transform: rotate(-8deg); }
.cr-file__card:not([data-phase="success"]) .cr-done__seal { opacity: 0; }
.cr-done__title { font-size: clamp(2.2rem, 4vw, 3.2rem); line-height: 1.05; letter-spacing: -0.02em; }
.cr-done__body { max-width: 26em; color: var(--cr-muted-paper); }
.cr-done__docket { color: var(--color-brass); }
.cr-done__again { margin-top: 10px; padding: 12px 24px; border: 1px solid var(--cr-hair-paper); border-radius: 999px; background: none; color: var(--color-ink); font: inherit; font-size: 0.95rem; cursor: pointer; transition: background var(--dur-fast), color var(--dur-fast), transform var(--dur-base) var(--ease-spring); }
.cr-done__again:active { transform: scale(0.96); transition-duration: var(--dur-instant); }
@media (hover: hover) and (pointer: fine) { .cr-done__again:hover { background: var(--color-ink); color: var(--color-ivory); } }

/* ───────────── footer ───────────── */
.cr-footer { position: relative; z-index: 1; margin-top: calc(var(--cr-lap) * -1); padding: calc(var(--cr-lap) + 72px) 0 0; border-radius: var(--cr-lap-r) var(--cr-lap-r) 0 0; background: var(--color-ink); color: var(--color-ivory); overflow: clip; }
.cr-footer__grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 3fr) minmax(0, 4fr); gap: 40px; }
.cr-footer__brand p { max-width: 24em; margin-top: 22px; color: var(--cr-muted-slab); }
.cr-footer__col { display: grid; align-content: start; gap: 10px; font-size: 0.97rem; color: var(--cr-muted-slab); }
.cr-footer__col a { width: fit-content; color: var(--color-ivory); text-decoration: none; background: linear-gradient(var(--color-gold), var(--color-gold)) 0 100% / 0 1px no-repeat; transition: background-size var(--dur-base) var(--ease-out-expo), color var(--dur-fast); }
@media (hover: hover) and (pointer: fine) { .cr-footer__col a:hover { background-size: 100% 1px; color: var(--color-gold); } }
.cr-footer__label { margin-bottom: 6px; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-gold); }
.cr-footer__giant { margin: clamp(40px, 7vw, 96px) 0 -0.16em; text-align: center; font-family: var(--font-display); font-weight: 300; font-size: clamp(3.4rem, 15.5vw, 15rem); line-height: 1; letter-spacing: -0.04em; white-space: nowrap; color: transparent; -webkit-text-stroke: 1px color-mix(in srgb, var(--color-gold) 38%, transparent); user-select: none; }
.cr-footer__giant i { font-style: italic; }
.cr-footer__bottom { position: relative; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; padding: 22px 0 28px; border-top: 1px solid var(--cr-hair-slab); background: var(--color-ink); font-size: 0.82rem; color: var(--cr-muted-slab); }

/* ───────────── motion: only when JS is running and motion is allowed ───────────── */
@media (prefers-reduced-motion: no-preference) {
  /* reveals */
  html[data-cr-motion="live"] [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo), clip-path var(--dur-slow) var(--ease-in-out); }
  html[data-cr-motion="live"] [data-reveal][data-in="true"]:not([data-done]) { transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  html[data-cr-motion="live"] [data-reveal][data-done="true"] { transition-duration: var(--dur-base); transition-delay: 0ms; }
  html[data-cr-motion="live"] [data-reveal="rise"]:not([data-in="true"]) { opacity: 0; transform: translate3d(0, var(--reveal-shift), 0); }
  html[data-cr-motion="live"] [data-reveal="cascade"]:not([data-in="true"]) { opacity: 0; transform: translate3d(0, calc(var(--reveal-shift) * 1.5), 0) scale(0.97); }
  html[data-cr-motion="live"] [data-reveal="settle"]:not([data-in="true"]) { opacity: 0; transform: translate3d(0, 44px, 0) scale(0.965); }
  html[data-cr-motion="live"] [data-reveal="slide"]:not([data-in="true"]) { opacity: 0; transform: translate3d(-20px, 0, 0); }
  html[data-cr-motion="live"] [data-reveal="slide"] .cr-eyebrow__rule { transition: transform var(--dur-slow) var(--ease-out-expo) 160ms; }
  html[data-cr-motion="live"] [data-reveal="slide"]:not([data-in="true"]) .cr-eyebrow__rule { transform: scaleX(0); }
  /* the wipe clips the child, never the observed host: an element clipped to nothing never intersects */
  html[data-cr-motion="live"] [data-reveal="wipe"] > * { clip-path: inset(0 0 0 0); transition: clip-path var(--dur-slow) var(--ease-in-out), transform var(--dur-slow) var(--ease-out-expo); }
  html[data-cr-motion="live"] [data-reveal="wipe"]:not([data-in="true"]) > * { clip-path: inset(0 0 100% 0); transform: scale(1.16); }
  html[data-cr-motion="live"] [data-reveal="mask"] .cr-line__in { transition: transform var(--dur-hero) var(--ease-out-expo); transition-delay: calc(var(--i, 0) * 120ms); }
  html[data-cr-motion="live"] [data-reveal="mask"]:not([data-in="true"]) .cr-line__in { transform: translate3d(0, 114%, 0); }

  /* the load sequence, in CSS so it plays before hydration */
  html[data-cr-motion="live"] .cr-hero__bg { animation: cr-bg var(--dur-scene) var(--ease-out-expo) both; }
  html[data-cr-motion="live"] .cr-header__bar { animation: cr-drop var(--dur-slow) var(--ease-out-expo) 60ms both; }
  html[data-cr-motion="live"] .cr-nav a { animation: cr-drop var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(160ms + var(--k, 0) * 60ms); }
  html[data-cr-motion="live"] .cr-nav a:nth-child(2) { --k: 1; }
  html[data-cr-motion="live"] .cr-nav a:nth-child(3) { --k: 2; }
  html[data-cr-motion="live"] .cr-nav a:nth-child(4) { --k: 3; }
  html[data-cr-motion="live"] .cr-load { animation: cr-rise var(--dur-hero) var(--ease-out-expo) both; animation-delay: calc(var(--d, 600) * 1ms); }
  html[data-cr-motion="live"] .cr-load--sheet { animation-name: cr-sheet-in; animation-duration: var(--dur-scene); }
  html[data-cr-motion="live"] .cr-hero__strip { animation-name: cr-fade; }
  /* the headline is the page's largest text: it starts at once and rises a short way, so it paints with the first frame */
  html[data-cr-motion="live"] [data-load="mask"] .cr-line__in { animation: cr-mask var(--dur-hero) var(--ease-out-expo) both; animation-delay: calc(var(--i, 0) * 130ms); }
  html[data-cr-motion="live"] .cr-hero .cr-eyebrow__rule { animation: cr-draw var(--dur-hero) var(--ease-out-expo) 600ms both; }
  /* the colonnade arrives as one layer: SVG children would repaint on the main thread every frame */
  html[data-cr-motion="live"] .cr-colonnade { animation: cr-lines var(--dur-scene) var(--ease-out-expo) 120ms both; }
  html[data-cr-motion="live"] .cr-sheet__rule { animation: cr-draw var(--dur-hero) var(--ease-out-expo) 1400ms both; }

  /* ambient life: three at most in view, all paused off-screen */
  html[data-cr-motion="live"] .cr-hero__glow { animation: cr-drift 22s var(--ease-in-out) infinite alternate; }
  html[data-cr-motion="live"] .cr-hero__sheets .cr-sheet--front { animation: cr-float 11s var(--ease-in-out) infinite; }
  html[data-cr-motion="live"] .cr-hero__seal .cr-seal__ring { animation: cr-turn 70s linear infinite; }
  [data-ambient="paused"] .cr-sheet--front, [data-ambient="paused"] .cr-seal__ring, .cr-hero__glow[data-ambient="paused"] { animation-play-state: paused !important; }

  /* the form */
  .cr-form[data-shake="1"] .cr-field[data-invalid="true"] { animation: cr-shake-a var(--dur-base) var(--ease-out); }
  .cr-form[data-shake="0"] .cr-field[data-invalid="true"] { animation: cr-shake-b var(--dur-base) var(--ease-out); }
  .cr-field__error { animation: cr-slide-down var(--dur-base) var(--ease-out-expo) both; }
  .cr-submit[data-loading="true"] .cr-submit__busy i { animation: cr-busy 1s var(--ease-in-out) infinite; }
  .cr-submit[data-loading="true"] .cr-submit__busy i:nth-child(2) { animation-delay: 0.15s; }
  .cr-submit[data-loading="true"] .cr-submit__busy i:nth-child(3) { animation-delay: 0.3s; }
  .cr-file__card[data-phase="success"] .cr-done__seal { animation: cr-press var(--dur-hero) var(--ease-spring) 0.45s both; }
  .cr-file__card[data-phase="success"] .cr-done > :not(.cr-done__seal) { animation: cr-rise var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(0.9s + var(--k, 0) * 90ms); }
  .cr-file__card[data-phase="success"] .cr-done__body { --k: 1; }
  .cr-file__card[data-phase="success"] .cr-done__again { --k: 2; }

  /* menu links wait their turn */
  .cr-menu[data-open="false"] nav a { transition-delay: 0ms; }
}

@keyframes cr-rise { from { opacity: 0; transform: translate3d(0, 26px, 0); } }
@keyframes cr-fade { from { opacity: 0; } }
@keyframes cr-drop { from { opacity: 0; transform: translate3d(0, -22px, 0); } }
@keyframes cr-mask { from { transform: translate3d(0, 68%, 0); } }
@keyframes cr-bg { from { opacity: 0; transform: scale(1.06); } }
@keyframes cr-sheet-in { from { opacity: 0; transform: translate3d(0, 56px, 0) rotate(3deg) scale(0.97); } }
@keyframes cr-draw { from { transform: scaleX(0); } }
@keyframes cr-lines { from { opacity: 0; transform: translate3d(0, 36px, 0); } }
@keyframes cr-drift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(-6vmax, 5vmax, 0) scale(1.12); } }
@keyframes cr-float { 0%, 100% { transform: translate3d(0, 0, 0) rotate(-2.2deg); } 50% { transform: translate3d(0, -10px, 0) rotate(-1.6deg); } }
@keyframes cr-turn { to { transform: rotate(360deg); } }
@keyframes cr-marquee { to { transform: translate3d(-50%, 0, 0); } }
@keyframes cr-shake-a { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 60% { transform: translateX(5px); } }
@keyframes cr-shake-b { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 60% { transform: translateX(5px); } }
@keyframes cr-slide-down { from { opacity: 0; transform: translateY(-8px); } }
@keyframes cr-busy { 0%, 100% { transform: translateY(0); opacity: 0.45; } 50% { transform: translateY(-6px); opacity: 1; } }
@keyframes cr-press { 0% { opacity: 0; transform: scale(1.8) rotate(-24deg); } 38% { opacity: 1; transform: scale(0.94) rotate(-6deg); } 62% { transform: scale(1.03) rotate(-9deg); } 100% { opacity: 1; transform: scale(1) rotate(-8deg); } }

/* ───────────── responsive ───────────── */
@media (max-width: 1100px) {
  .cr-hero__grid { grid-template-columns: minmax(0, 1fr); }
  /* stacked: the sheet is as tall as its text needs, and the back sheet follows it */
  .cr-hero__sheets { justify-self: start; width: min(400px, 82%); margin-top: 24px; aspect-ratio: auto; }
  .cr-sheet--front { position: relative; inset: auto; }
  .cr-hero__strip { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 8px; }
  .cr-head--split { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  .cr-questions__grid, .cr-file__grid { grid-template-columns: minmax(0, 1fr); }
  .cr-questions__head { position: static; }
  .cr-cites { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 820px) {
  .cr-counts, .cr-partners { grid-template-columns: minmax(0, 1fr); }
  .cr-facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cr-fact:nth-child(3) { padding-left: 0; border-left: 0; }
  .cr-fact:nth-child(n + 3) { margin-top: 32px; border-top: 1px solid var(--cr-hair-paper); }
  .cr-footer__grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}
@media (max-width: 520px) {
  .cr-body { font-size: 16px; }
  .cr-hero .cr-eyebrow { flex-wrap: wrap; gap: 4px 12px; font-size: 0.72rem; letter-spacing: 0.1em; }
  .cr-hero .cr-eyebrow__rule { display: none; }
  .cr-hero__lines { opacity: 0.12; }
  .cr-sheet__head .cr-mono, .cr-brief__head .cr-mono { font-size: 0.66rem; letter-spacing: 0.05em; white-space: nowrap; }
  .cr-hero__sheets { width: min(340px, 88%); }
  .cr-hero__seal { left: -16px; }
  .cr-acc__panel p { padding-right: 0; }
  .cr-hero__strip dd { font-size: 0.95rem; }
}

/* ───────────── reduced motion & touch: finished, still, no hover dependence ───────────── */
@media (prefers-reduced-motion: reduce) {
  /* fewer and gentler, not zero: nothing moves, but colour and opacity still ease so state changes stay legible */
  .cr-body *, .cr-body *::before, .cr-body *::after { animation: none !important; scroll-behavior: auto !important; transition-property: opacity, color, background-color, border-color, outline-color !important; transition-duration: 120ms !important; transition-delay: 0ms !important; }
  .cr-progress { display: none; }
}
@media (hover: none) {
  .cr-tilt:active { --lift: -3px; }
  .cr-btn:active::before { transform: translateY(0); border-radius: 0; }
}
]]>
    </file>
    <file path="src/app/(calder)/calder/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <rect width="48" height="48" rx="12" fill="#0E1830"/>
  <circle cx="24" cy="24" r="19" stroke="#C9A55A" stroke-width="1.4"/>
  <g stroke="#F5F0E4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24.2 18.2A7.2 7.2 0 1 0 24.2 29.8"/>
    <path d="M28.4 16.6v14.8"/>
    <path d="M28.4 16.6h3.6a3.9 3.9 0 0 1 0 7.8h-3.6"/>
    <path d="M31.4 24.4 34.4 31.4"/>
  </g>
  <circle cx="24" cy="36.2" r="1" fill="#C9A55A"/>
</svg>
]]>
    </file>
    <file path="src/app/(calder)/calder/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Calder & Rowe. Hard decisions, argued well. A New York law firm for business, disputes, employment and estates.";

const INK = "#070C17";
const MIDNIGHT = "#0E1830";
const IVORY = "#F5F0E4";
const GOLD = "#C9A55A";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: MIDNIGHT,
          backgroundImage: `linear-gradient(160deg, ${MIDNIGHT} 0%, ${INK} 100%)`,
          color: IVORY,
          padding: "64px 72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke={GOLD} strokeWidth="1.2" />
            <g stroke={IVORY} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M24.6 17.6A8.5 8.5 0 1 0 24.6 30.4" />
              <path d="M29 16v16" />
              <path d="M29 16h4.2a4.3 4.3 0 0 1 0 8.6H29" />
              <path d="M32.4 24.6 36 32" />
            </g>
            <circle cx="24" cy="38.4" r="1.1" fill={GOLD} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, letterSpacing: "0.16em", textTransform: "uppercase" }}>Calder &amp; Rowe</span>
            <span style={{ fontSize: 15, letterSpacing: "0.34em", textTransform: "uppercase", color: GOLD, marginTop: 6 }}>Attorneys at law</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 110, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
            <span>Hard decisions,</span>
            <span style={{ color: GOLD, fontStyle: "italic" }}>argued well.</span>
            <span style={{ marginTop: 30, fontSize: 27, letterSpacing: "0.02em", color: IVORY, opacity: 0.78, fontStyle: "normal" }}>
              Business law, disputes, employment and estates. New York, since 1987.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: 150,
              height: 150,
              borderRadius: 75,
              border: `2px solid ${GOLD}`,
              alignItems: "center",
              justifyContent: "center",
              color: GOLD,
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Filed
          </div>
        </div>
      </div>
    ),
    size,
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/page.tsx">
<![CDATA[import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Argument } from "./sections/Argument";
import { Authorities } from "./sections/Authorities";
import { Counsel } from "./sections/Counsel";
import { FileMatter } from "./sections/FileMatter";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Matters } from "./sections/Matters";
import { Questions } from "./sections/Questions";

export default function CalderPage() {
  return (
    <div className="cr-site">
      <a className="cr-skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Matters />
        <Argument />
        <Counsel />
        <Authorities />
        <Questions />
        <FileMatter />
      </main>
      <Footer />
      <Reveals />
      <ScrollVars />
      <SmoothScroll />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/brand/Logo.tsx">
<![CDATA[/** The mark's drawing: a C and an R inside a fine ring, a gold full stop between them. Strokes follow currentColor. */
export function MarkPaths() {
  return (
    <>
      <circle cx="24" cy="24" r="22" stroke="var(--color-gold)" strokeWidth="1.2" />
      <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24.6 17.6A8.5 8.5 0 1 0 24.6 30.4" />
        <path d="M29 16v16" />
        <path d="M29 16h4.2a4.3 4.3 0 0 1 0 8.6H29" />
        <path d="M32.4 24.6 36 32" />
      </g>
      <circle cx="24" cy="38.4" r="1.1" fill="var(--color-gold)" />
    </>
  );
}

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <MarkPaths />
    </svg>
  );
}

type LogoProps = { className?: string; href?: string; label?: string };

/** Lockup: mark + wordmark. On dark slabs set `color` to ivory; on paper, to ink. */
export function Logo({ className, href, label = "Calder & Rowe, home" }: LogoProps) {
  const inner = (
    <>
      <Mark className="cr-logo__mark" />
      <span className="cr-logo__word">
        <span className="cr-logo__name">
          Calder <i>&amp;</i> Rowe
        </span>
        <span className="cr-logo__sub">Attorneys at law</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className={`cr-logo ${className ?? ""}`} aria-label={label}>
      {inner}
    </a>
  ) : (
    <span className={`cr-logo ${className ?? ""}`}>{inner}</span>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/brand/Seal.tsx">
<![CDATA[import { MarkPaths } from "./Logo";

type SealProps = {
  /** Unique per instance: the lettering runs along a path with this id. */
  id: string;
  className?: string;
  /** Short line set under the mark (a docket number). */
  caption?: string;
};

const RING_TEXT = "CALDER & ROWE LLP · ATTORNEYS AT LAW · NEW YORK · EST. 1987 · ";

/**
 * The firm's seal, as two stacked SVGs so the ring can turn on the compositor: an SVG's own children are repainted on the
 * main thread every frame, but a whole <svg> element is just a layer. The ring (rules, lettering; class cr-seal__ring)
 * turns slowly when it's ambient; the mark and caption stay still on top.
 * Colours come from --seal-ink (rings, lettering), --seal-mark (the monogram) and --seal-bg (a disc behind it), so the
 * same seal reads on midnight and on ivory.
 */
export function Seal({ id, className, caption }: SealProps) {
  const ink = "var(--seal-ink, var(--color-gold))";
  return (
    <span className={`cr-seal ${className ?? ""}`} aria-hidden="true">
      <svg className="cr-seal__ring" viewBox="0 0 200 200" fill="none">
        <defs>
          <path id={`${id}-ring`} d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--seal-bg, transparent)" />
        <circle cx="100" cy="100" r="97" stroke={ink} strokeWidth="1.2" />
        <circle cx="100" cy="100" r="58" stroke={ink} strokeWidth="0.8" />
        <text className="cr-seal__text" fill={ink}>
          <textPath href={`#${id}-ring`} startOffset="0" textLength="472" lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <svg className="cr-seal__core" viewBox="0 0 200 200" fill="none">
        <svg x="68" y={caption ? 52 : 68} width="64" height="64" viewBox="0 0 48 48" style={{ color: "var(--seal-mark, var(--color-ivory))" }}>
          <MarkPaths />
        </svg>
        {caption ? (
          <text className="cr-seal__caption" x="100" y="133" textAnchor="middle" fill={ink}>
            {caption}
          </text>
        ) : null}
      </svg>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/brief/BriefDriver.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { CLAUSES } from "../content/argument";
import { isLive, onIdle } from "../motion/mode";
import { activeClause, clauseProgress, isSealed, pageLabel, runwayProgress } from "./progress";

/** The same query calder.css uses to pin the stage. Below it the brief is a plain, finished document. */
const PINNED = "(min-width: 960px) and (min-height: 620px)";

/**
 * Drives the brief from scroll with one rAF-throttled listener. It writes --p on each clause (how much of it is
 * written), --cr-bp on the section (overall progress, for the rail), flips each step's data-state, updates the page
 * counter and sets data-sealed once the last clause is done. No React state: only attributes and custom properties.
 */
export function BriefDriver() {
  useEffect(() => {
    const section = document.getElementById("argument");
    if (!section) return;
    const mq = window.matchMedia(PINNED);
    const clauses = Array.from(section.querySelectorAll<HTMLElement>(".cr-clause"));
    const steps = Array.from(section.querySelectorAll<HTMLElement>(".cr-step"));
    const page = section.querySelector<HTMLElement>("[data-page]");
    const rail = section.querySelector<HTMLElement>(".cr-arg__rail i");
    const count = CLAUSES.length;
    let raf = 0;
    let lastActive = -1;
    let lastSealed: boolean | null = null;

    const reset = () => {
      delete section.dataset.pin;
      delete section.dataset.sealed;
      rail?.style.removeProperty("transform");
      clauses.forEach((c) => c.style.removeProperty("--p"));
      steps.forEach((s) => (s.dataset.state = "idle"));
      if (page) page.textContent = pageLabel(0, count);
      lastActive = -1;
      lastSealed = null;
    };

    // Measured once and on resize, never inside the scroll handler.
    let top = 0;
    let height = 0;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
    };

    const frame = () => {
      raf = 0;
      const p = runwayProgress(window.scrollY, top, height, window.innerHeight);
      // Written straight onto the rail, not onto the section: a variable there would be inherited by every word.
      if (rail) rail.style.transform = `scaleY(${p.toFixed(4)})`;
      clauses.forEach((el, i) => el.style.setProperty("--p", clauseProgress(p, i, count).toFixed(4)));

      const active = activeClause(p, count);
      if (active !== lastActive) {
        lastActive = active;
        steps.forEach((s, i) => (s.dataset.state = i < active ? "past" : i === active ? "active" : "next"));
        if (page) page.textContent = pageLabel(active, count);
      }
      const sealed = isSealed(p);
      if (sealed !== lastSealed) {
        lastSealed = sealed;
        section.dataset.sealed = String(sealed);
        if (sealed) steps.forEach((s) => (s.dataset.state = "past"));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    const sync = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      raf = 0;
      if (!isLive() || !mq.matches) {
        reset();
        return;
      }
      section.dataset.pin = "1";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      measure();
      frame();
    };

    const cancelIdle = onIdle(sync);
    mq.addEventListener("change", sync);
    document.fonts?.ready.then(() => mq.matches && isLive() && onResize());
    return () => {
      cancelIdle();
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      reset();
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/brief/progress.ts">
<![CDATA[import { clamp, progress } from "../motion/math";

/**
 * The brief's scroll maths. A tall section holds a sticky stage; how far the visitor has scrolled through the
 * runway (section height minus one viewport) becomes 0–1, and that is split across the clauses.
 */

/** 0–1 through the runway. Before the section it is 0; after the runway it is 1. */
export function runwayProgress(scrollY: number, sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  const runway = sectionHeight - viewportHeight;
  return progress(scrollY, sectionTop, sectionTop + Math.max(runway, 1));
}

/** Share of the runway reserved at the end for the seal to press and the sheet to hold. */
export const SEAL_TAIL = 0.12;

/** How much of clause `index` is written (0–1). Clauses are written one after another and overlap a little. */
export function clauseProgress(p: number, index: number, count: number): number {
  const span = (1 - SEAL_TAIL) / count;
  const start = index * span;
  return progress(p, start, start + span * 0.85);
}

/** The clause being written now: the first one that is not yet complete, or the last. */
export function activeClause(p: number, count: number): number {
  const span = (1 - SEAL_TAIL) / count;
  return clamp(Math.floor(p / span), 0, count - 1);
}

/** The seal presses once every clause is written. */
export function isSealed(p: number): boolean {
  return p >= 1 - SEAL_TAIL * 0.7;
}

/** "p. 2 of 4": the sheet's page counter follows the active clause. */
export function pageLabel(active: number, count: number): string {
  return `p. ${clamp(active, 0, count - 1) + 1} of ${count}`;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/content/argument.ts">
<![CDATA[/** The four stages of the brief: the mechanic's data. Each stage is one clause of the memorandum. */
export type Clause = {
  id: string;
  /** The stage as the visitor reads it in the left-hand list. */
  stage: string;
  /** Short line under the stage name. */
  gist: string;
  /** Clause heading on the sheet. */
  heading: string;
  /** The clause body, written word by word as the page scrolls. */
  body: string;
  /** The gold margin note that slides in beside the clause. */
  note: string;
};

export const CLAUSES: Clause[] = [
  {
    id: "facts",
    stage: "Intake",
    gist: "A partner hears the whole story first.",
    heading: "Statement of facts",
    body: "You tell us what happened. We listen first, ask for the few documents that matter, and write the facts down before anyone offers an opinion.",
    note: "Your call is answered by a partner.",
  },
  {
    id: "issues",
    stage: "Analysis",
    gist: "Two or three points the matter turns on.",
    heading: "Questions presented",
    body: "We separate what the law says from what the other side hopes it says, and name the two or three points on which the whole matter will turn.",
    note: "Usually two or three issues, rarely more.",
  },
  {
    id: "position",
    stage: "Position",
    gist: "A written recommendation in plain English.",
    heading: "Recommended course",
    body: "You receive a written position: the strongest path, what it will cost, where the risk sits, and the alternatives we rejected and why.",
    note: "Fixed-fee quote included.",
  },
  {
    id: "resolution",
    stage: "Resolution",
    gist: "Negotiated if possible, tried if necessary.",
    heading: "Disposition",
    body: "We negotiate first and try the matter if we must. You hear from us the moment the picture changes, and before you have to ask.",
    note: "A status note every Friday.",
  },
];
]]>
    </file>
    <file path="src/app/(calder)/calder/content/firm.ts">
<![CDATA[/** Facts about the fictional firm, kept in one place so the header, hero, footer and form agree. */
export const FIRM = {
  name: "Calder & Rowe",
  legalName: "Calder & Rowe LLP",
  founded: 1987,
  phone: "212 555 0187",
  phoneHref: "tel:+12125550187",
  email: "hello@calderrowe.com",
  addressLines: ["130 Madison Avenue, 12th Floor", "New York, NY 10016"],
  offices: "Manhattan · Brooklyn · Westchester",
} as const;

export type Matter = {
  numeral: string;
  id: string;
  title: string;
  summary: string;
  typical: string[];
};

/** Practice areas, written as the counts of a brief. */
export const MATTERS: Matter[] = [
  {
    numeral: "I",
    id: "formation",
    title: "Business formation & contracts",
    summary: "Entities, founder and shareholder agreements, and the commercial contracts a company lives or dies by, written to be read in a crisis.",
    typical: ["Operating & shareholder agreements", "Founder and equity splits", "Vendor and customer contracts"],
  },
  {
    numeral: "II",
    id: "disputes",
    title: "Commercial disputes",
    summary: "Contract, partnership and shareholder disputes, settled on the merits when that is best, tried when it is not.",
    typical: ["Shareholder and partner disputes", "Breach of contract", "Business torts & injunctions"],
  },
  {
    numeral: "III",
    id: "employment",
    title: "Employment & executive matters",
    summary: "Agreements, exits and workplace risk, for executives and for the companies that employ them.",
    typical: ["Executive agreements", "Separations & severance", "Restrictive covenants"],
  },
  {
    numeral: "IV",
    id: "estates",
    title: "Trusts & estates",
    summary: "Planning for the people and property you are responsible for, and administration when the time comes.",
    typical: ["Wills & trusts", "Succession of a family business", "Estate administration"],
  },
];

export const MATTER_TITLES: string[] = MATTERS.map((m) => m.title);

export type Partner = {
  id: string;
  name: string;
  role: string;
  asset: string;
  summary: string;
  credentials: string[];
};

export const PARTNERS: Partner[] = [
  {
    id: "calder",
    name: "Mara Calder",
    role: "Founding partner · Commercial disputes",
    asset: "partner-calder",
    summary: "Mara has tried commercial cases in New York for thirty-one years. She takes the first call on every dispute and stays on the matter until it closes.",
    credentials: ["J.D., Columbia Law School", "Admitted: New York, 1992", "Former clerk, S.D.N.Y."],
  },
  {
    id: "rowe",
    name: "Daniel Rowe",
    role: "Partner · Corporate & estates",
    asset: "partner-rowe",
    summary: "Daniel builds the agreements and structures that keep owner-managed companies, and the families behind them, out of court in the first place.",
    credentials: ["J.D., NYU School of Law", "Admitted: New York, 2001", "Trustee, a family foundation"],
  },
];

export type Fact = { value: number; suffix: string; label: string };

export const FACTS: Fact[] = [
  { value: 38, suffix: "", label: "Years in practice" },
  { value: 11, suffix: "", label: "Attorneys, all in one office" },
  { value: 2, suffix: "", label: "Partners on every matter" },
  { value: 1, suffix: "", label: "Business day to reply" },
];

export type Authority = { cite: string; title: string; outcome: string };

/** Anonymised matters, written like citations. */
export const AUTHORITIES: Authority[] = [
  { cite: "No. 21-0388", title: "Founder buy-out", outcome: "Resolved by agreement in eleven weeks, without a filing." },
  { cite: "No. 23-0142", title: "Shareholder dispute", outcome: "A seven-figure claim settled the week before trial." },
  { cite: "No. 24-0275", title: "Executive separation", outcome: "Terms agreed in nine days, with the restrictive covenant narrowed." },
];

export const MARQUEE_ITEMS: string[] = [
  "Shareholder disputes",
  "Founder exits",
  "Executive agreements",
  "Operating agreements",
  "Estate administration",
  "Restrictive covenants",
  "Commercial litigation",
  "Family businesses",
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What happens in a first consultation?",
    a: "A partner listens to the facts, asks for the few documents that matter, and tells you plainly what your options are. You leave with a clearer sense of the decision, whether or not you hire us.",
  },
  {
    q: "How are your fees structured?",
    a: "Most matters are quoted as a fixed fee or a capped budget after the first meeting. Litigation is billed hourly against an estimate we update as the matter moves. There are no surprises on the invoice.",
  },
  {
    q: "Do you work with individuals as well as businesses?",
    a: "Both. Our clients are founders, owner-managers, executives and the families behind them, which is why trusts and estates sit beside our commercial work.",
  },
  {
    q: "Is what I tell you confidential?",
    a: "From the first call, yes. We treat what you share as privileged, and the form on this page is for general enquiries only until we have confirmed that we can act for you.",
  },
  {
    q: "Where do you meet clients?",
    a: "At 130 Madison Avenue in Midtown, or by video. We also meet clients in Brooklyn and Westchester when that is easier for you.",
  },
];
]]>
    </file>
    <file path="src/app/(calder)/calder/forms/matter.ts">
<![CDATA[import { MATTER_TITLES } from "../content/firm";

export type MatterInput = {
  name: string;
  email: string;
  matter: string;
  message: string;
};

export type MatterField = keyof MatterInput;
export type MatterErrors = Partial<Record<MatterField, string>>;

export const NOT_SURE = "Not sure yet";
export const MATTER_OPTIONS: string[] = [...MATTER_TITLES, NOT_SURE];
export const MESSAGE_MAX = 600;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Client-side rules. Nothing leaves the browser: this is a template. */
export function validateMatter(input: MatterInput): MatterErrors {
  const errors: MatterErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please add your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add an email address we can reply to.";
  if (!MATTER_OPTIONS.includes(input.matter)) errors.matter = "Choose the closest kind of matter.";
  if (input.message.trim().length < 10) errors.message = "A sentence or two is enough to begin.";
  else if (input.message.length > MESSAGE_MAX) errors.message = `Keep it to ${MESSAGE_MAX} characters for now.`;
  return errors;
}

export function isValid(errors: MatterErrors): boolean {
  return Object.keys(errors).length === 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

/** A stable docket number for the seal, derived from the filing so a re-send matches: CR-26-0000. */
export function docketNumber(input: MatterInput): string {
  const digits = (hash(`${input.name.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.matter}`) % 10000)
    .toString()
    .padStart(4, "0");
  return `CR-26-${digits}`;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/forms/MatterForm.tsx">
<![CDATA["use client";

import { useEffect, useId, useRef, useState } from "react";
import { Seal } from "../brand/Seal";
import { isLive } from "../motion/mode";
import { docketNumber, isValid, MATTER_OPTIONS, MESSAGE_MAX, validateMatter, type MatterErrors, type MatterField, type MatterInput } from "./matter";

const ORDER: MatterField[] = ["name", "email", "matter", "message"];
const INITIAL: MatterInput = { name: "", email: "", matter: "", message: "" };

type Phase = "idle" | "loading" | "success";

/**
 * "File a matter": validates on the client, shakes once on error, turns the button into a loading state, then the form
 * dissolves and the firm's seal presses down onto a docket number. Nothing is sent anywhere. The "Ask about this"
 * links on the matter cards pre-select the kind of matter through data-matter.
 */
export function MatterForm() {
  const uid = useId();
  const [values, setValues] = useState<MatterInput>(INITIAL);
  const [errors, setErrors] = useState<MatterErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (field: MatterField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateMatter(next));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-matter]");
      const matter = el?.dataset.matter;
      if (!matter || !MATTER_OPTIONS.includes(matter)) return;
      setPhase((p) => (p === "success" ? "idle" : p));
      setValues((v) => ({ ...v, matter }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (phase === "success") doneRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const errs = validateMatter(values);
    setErrors(errs);
    if (!isValid(errs)) {
      setShake((n) => n + 1);
      const first = ORDER.find((f) => errs[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    window.setTimeout(() => setPhase("success"), isLive() ? 1300 : 200);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  const err = (f: MatterField) => (errors[f] ? `${uid}-${f}-err` : undefined);
  const docket = docketNumber(values);
  const firstName = values.name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="cr-file__card" data-phase={phase}>
      <form ref={formRef} className="cr-form" noValidate onSubmit={onSubmit} data-shake={shake % 2} aria-hidden={phase === "success"} inert={phase === "success"}>
        <div className="cr-field" data-invalid={!!errors.name} data-filled={values.name ? "true" : "false"}>
          <input id={`${uid}-name`} name="name" className="cr-input" placeholder=" " autoComplete="name" value={values.name} aria-invalid={!!errors.name} aria-describedby={err("name")} onChange={(e) => set("name", e.target.value)} />
          <label htmlFor={`${uid}-name`}>Your name</label>
          {errors.name && (
            <p id={err("name")} className="cr-field__error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="cr-field" data-invalid={!!errors.email} data-filled={values.email ? "true" : "false"}>
          <input id={`${uid}-email`} name="email" type="email" className="cr-input" placeholder=" " autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={err("email")} onChange={(e) => set("email", e.target.value)} />
          <label htmlFor={`${uid}-email`}>Email address</label>
          {errors.email && (
            <p id={err("email")} className="cr-field__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="cr-field cr-field--select" data-invalid={!!errors.matter} data-filled={values.matter ? "true" : "false"}>
          <select id={`${uid}-matter`} name="matter" className="cr-input" value={values.matter} aria-invalid={!!errors.matter} aria-describedby={err("matter")} onChange={(e) => set("matter", e.target.value)}>
            <option value="" disabled />
            {MATTER_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <label htmlFor={`${uid}-matter`}>Kind of matter</label>
          {errors.matter && (
            <p id={err("matter")} className="cr-field__error" role="alert">
              {errors.matter}
            </p>
          )}
        </div>

        <div className="cr-field cr-field--area" data-invalid={!!errors.message} data-filled={values.message ? "true" : "false"}>
          <textarea id={`${uid}-message`} name="message" className="cr-input" placeholder=" " rows={4} value={values.message} aria-invalid={!!errors.message} aria-describedby={err("message")} onChange={(e) => set("message", e.target.value)} />
          <label htmlFor={`${uid}-message`}>What are you facing?</label>
          <span className="cr-field__count" aria-hidden="true">
            {values.message.length}/{MESSAGE_MAX}
          </span>
          {errors.message && (
            <p id={err("message")} className="cr-field__error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className="cr-submit" data-loading={phase === "loading"} disabled={phase === "loading"}>
          <span className="cr-submit__label">File this matter</span>
          <span className="cr-submit__busy" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cr-sr" aria-live="polite">
            {phase === "loading" ? "Filing your matter" : ""}
          </span>
        </button>
        <p className="cr-form__fine">General enquiries only. Sending this does not create an attorney-client relationship.</p>
      </form>

      <div ref={doneRef} className="cr-done" tabIndex={-1} aria-hidden={phase !== "success"} inert={phase !== "success"}>
        <div className="cr-done__seal">
          <Seal id="done" caption={docket} />
        </div>
        <h3 className="cr-done__title">Filed, {firstName}.</h3>
        <p className="cr-done__body">
          Your matter is on a partner&rsquo;s desk under <span className="cr-mono cr-done__docket">{docket}</span>. We will reply to {values.email.trim() || "your email"} within one business day.
        </p>
        <button type="button" className="cr-done__again" onClick={reset}>
          File another matter
        </button>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/CountUp.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { progress } from "./math";
import { isLive } from "./mode";

const DURATION = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Counts from 0 to `value` once in view. The final value always sits in a visually hidden span for readers. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isLive()) return;
    let raf = 0;
    el.textContent = `0${suffix}`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = easeOut(progress(now - start, 0, DURATION));
          el.textContent = `${Math.round(value * t)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="cr-tabular">
        {value}
        {suffix}
      </span>
      <span className="cr-sr">
        {value}
        {suffix}
      </span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/Magnetic.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "./math";
import { isLive } from "./mode";
import { canHoverFinely } from "./useReducedMotion";

const PULL = 12;

/** Pulls its child toward the pointer (≤ 12px) and settles back on leave. Fine pointers, motion allowed only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || !isLive()) return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const tick = () => {
      x = lerp(x, tx, 0.16);
      y = lerp(y, ty, 0.16);
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
      raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) * 0.28, -PULL, PULL);
      ty = clamp((e.clientY - (r.top + r.height / 2)) * 0.28, -PULL, PULL);
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span ref={ref} className={`cr-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/Marquee.tsx">
<![CDATA["use client";

import { useInView } from "./useInView";

/** A slow band of matter types: the track is duplicated and translated by CSS. Pauses off-screen, on hover and on focus. */
export function Marquee({ items, className, label }: { items: string[]; className?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const run = (
    <span className="cr-marquee__run">
      {items.map((item) => (
        <span key={item} className="cr-marquee__item">
          {item}
          <span className="cr-marquee__sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div ref={ref} className={`cr-marquee ${className ?? ""}`} data-playing={inView} role="group" aria-label={label} tabIndex={0}>
      <div className="cr-marquee__track">
        {run}
        <span aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/math.ts">
<![CDATA[/** Pure motion maths shared by the primitives. No DOM, no React. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Where `value` sits between `start` and `end`, as 0–1. A zero-width window counts as done. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Per-item delay for a cascade, capped so a long list never keeps the last item waiting. */
export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

/** Pointer position inside a card (0–1 on each axis) → tilt in degrees. Top edge tips toward the viewer. */
export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 }; // + 0 turns -0 into 0
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/mode.ts">
<![CDATA[/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion; every hidden
 * pre-reveal state, the load sequence and the pinned brief hang off html[data-cr-motion="live"], so no-JS and
 * reduced-motion visitors always get the finished, static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.crMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;

export function isLive(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.crMotion === "live";
}

/** Runs `cb` when the browser is idle (or shortly after, where requestIdleCallback is missing), so scroll setup never competes with hydration. */
export function onIdle(cb: () => void): () => void {
  const w = window as Window & { requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 150);
  return () => window.clearTimeout(id);
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for the whole page. Server components only mark elements with
 * data-reveal="mask|rise|wipe|draw|cascade|settle"; this flips data-in="true" once each one enters, and CSS does
 * the rest. Hidden pre-reveal states exist only under html[data-cr-motion="live"], so nothing here is
 * needed for the page to be readable. It also pauses ambient loops that leave the screen.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.crMotion !== "live") return;
    // Once an element has finished revealing it is marked data-done: its stagger delay is dropped so hover and
    // press transitions on it respond immediately.
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.in = "true";
          io.unobserve(el);
          timers.push(window.setTimeout(() => (el.dataset.done = "true"), 2400));
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])").forEach((el) => io.observe(el));
    watch(document);

    // Ambient loops (the hero seal's turn, the glow's drift) pause whenever they're off-screen.
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.ambient = entry.isIntersecting ? "playing" : "paused";
    });
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));

    // Elements that mount later (the seal's success panel) join in too.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-in='true'])")) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      ambient.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/ScrollVars.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { progress } from "./math";
import { isLive, onIdle } from "./mode";

/**
 * One rAF-throttled scroll listener. It writes transform and opacity straight onto the three elements it moves (the
 * hero grid, the colonnade and the progress hairline) rather than through custom properties on a parent: a variable set
 * on <html> or the hero is inherited by every descendant and would recalculate their styles on every scroll frame.
 * No React state, and nothing at all under reduced motion.
 */
export function ScrollVars() {
  useEffect(() => {
    if (!isLive()) return;
    const hero = document.getElementById("top");
    const grid = hero?.querySelector<HTMLElement>(".cr-hero__grid");
    const lines = hero?.querySelector<HTMLElement>(".cr-hero__lines");
    const bar = document.querySelector<HTMLElement>(".cr-progress");
    const root = document.documentElement;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      if (hero && grid && lines) {
        // How far the first slab has lapped the hero: it settles back (scale .95) and dims.
        const out = progress(y, 0, hero.offsetHeight * 0.9);
        grid.style.transform = `scale(${(1 - out * 0.05).toFixed(4)})`;
        grid.style.opacity = (1 - out * 0.55).toFixed(3);
        lines.style.transform = `translate3d(0, ${(out * -7).toFixed(3)}%, 0)`;
      }
      if (bar) bar.style.transform = `scaleX(${progress(y, 0, root.scrollHeight - window.innerHeight).toFixed(4)})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const cancelIdle = onIdle(() => {
      frame();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    });
    return () => {
      cancelIdle();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const el of [grid, lines, bar]) el?.style.removeProperty("transform");
      grid?.style.removeProperty("opacity");
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/SmoothScroll.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { isLive, onIdle } from "./mode";
import { canHoverFinely } from "./useReducedMotion";

type LenisLike = { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void; destroy: () => void };

declare global {
  interface Window {
    __crLenis?: LenisLike;
  }
}

const HEADER_OFFSET = -96;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Lenis on desktop fine pointers with motion allowed; native scroll everywhere else. In-page anchors glide. */
export function SmoothScroll() {
  useEffect(() => {
    if (!isLive() || !canHoverFinely()) return;
    let lenis: (LenisLike & { raf: (t: number) => void }) | null = null;
    let raf = 0;
    let cancelled = false;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !lenis || e.defaultPrevented) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: id === "top" ? 0 : HEADER_OFFSET, duration: 1.5, easing: easeOutExpo });
      history.replaceState(null, "", `#${id}`);
    };

    const cancelIdle = onIdle(() => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true }) as unknown as LenisLike & { raf: (t: number) => void };
        window.__crLenis = lenis;
        const loop = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        document.addEventListener("click", onClick);
      });
    });

    return () => {
      cancelIdle();
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      delete window.__crLenis;
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/TiltCard.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { tiltAngles } from "./math";
import { isLive } from "./mode";
import { canHoverFinely } from "./useReducedMotion";

const MAX_TILT = 4;

/** Tilts a few degrees toward the pointer and carries a candle-gold spotlight (--sx/--sy). CSS handles lift and release. */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || !isLive()) return;
    let raf = 0;
    let px = 0.5, py = 0.5;

    const write = () => {
      raf = 0;
      const { rx, ry } = tiltAngles(px, py, MAX_TILT);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--sx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--sy", `${(py * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`cr-tilt ${className ?? ""}`}>
      {children}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };

/** Tracks whether an element is on screen. With `once`, it latches true after the first sighting. */
export function useInView<T extends Element>({ once = false, rootMargin = "0px", threshold = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(calder)/calder/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor prefers reduced motion. On the server (and before hydration) it errs on the safe side. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

/** Fine pointer with hover: the only place magnetic, tilt and spotlight effects run. */
export function canHoverFinely(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Accordion.tsx">
<![CDATA["use client";

import { useId, useState } from "react";
import { FAQS } from "../content/firm";

/** One answer open at a time. Panels open by animating grid rows 0fr → 1fr, so they reverse cleanly mid-flight. */
export function Accordion() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="cr-acc">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="cr-acc__item" data-open={isOpen} data-reveal="cascade" style={{ "--i": i } as React.CSSProperties}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="cr-acc__q">{f.q}</span>
                <span className="cr-acc__icon" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="cr-acc__panel">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Argument.tsx">
<![CDATA[import { Seal } from "../brand/Seal";
import { CLAUSES } from "../content/argument";
import { BriefDriver } from "../brief/BriefDriver";
import { pageLabel } from "../brief/progress";
import { Eyebrow, Lines, vars } from "./parts";

/**
 * The signature: a bound brief that drafts itself. This server component renders every clause in full (so the
 * static page is finished); BriefDriver, a client leaf, scrubs the words, margin notes and seal from scroll when
 * the pinned layout applies. Sticky stage, tall runway: see calder.css `.cr-arg`.
 */
export function Argument() {
  return (
    <section id="argument" className="cr-arg" aria-labelledby="cr-arg-h" data-brief>
      <BriefDriver />
      <div className="cr-arg__stage">
        <div className="cr-wrap cr-arg__grid">
          <div className="cr-arg__intro">
            <Eyebrow n="§ II" tone="slab">
              The argument
            </Eyebrow>
            <Lines as="h2" id="cr-arg-h" className="cr-h2" lines={["Every matter is", <em key="e">argued the same way.</em>]} />
            <div className="cr-steps">
              <span className="cr-arg__rail" aria-hidden="true">
                <i />
              </span>
              <ol>
                {CLAUSES.map((c, i) => (
                  <li key={c.id} className="cr-step" data-i={i} data-state="idle">
                    <span className="cr-step__n cr-mono">0{i + 1}</span>
                    <div>
                      <h3>{c.stage}</h3>
                      <p>{c.gist}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="cr-arg__sheetwrap" data-reveal="settle">
            <article className="cr-brief" aria-label="Memorandum of counsel: the four clauses of how we argue a matter">
              <header className="cr-brief__head">
                <span className="cr-mono">Memorandum of counsel</span>
                <span className="cr-mono" data-page aria-hidden="true">
                  {pageLabel(0, CLAUSES.length)}
                </span>
              </header>
              <p className="cr-brief__matter">
                In the matter of <em>your decision</em>
              </p>

              {CLAUSES.map((c, i) => {
                const words = c.body.split(/\s+/);
                return (
                  <section key={c.id} className="cr-clause" data-i={i} style={vars({ "--n": words.length })}>
                    <h3 className="cr-clause__h">
                      <span className="cr-clause__n cr-mono">§ {i + 1}</span>
                      {c.heading}
                    </h3>
                    <p className="cr-clause__body">
                      {words.map((w, wi) => (
                        <span key={wi} className="cr-w" style={vars({ "--w": wi })}>
                          {w}{" "}
                        </span>
                      ))}
                    </p>
                    <p className="cr-note cr-note--clause">{c.note}</p>
                  </section>
                );
              })}

              <footer className="cr-brief__foot">
                <span className="cr-brief__sign">
                  <span className="cr-sheet__sig" aria-hidden="true" />
                  <span className="cr-mono">Calder &amp; Rowe LLP</span>
                </span>
                <Seal id="brief" className="cr-brief__seal" caption="FILED" />
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Authorities.tsx">
<![CDATA[import { AUTHORITIES, MARQUEE_ITEMS } from "../content/firm";
import { Marquee } from "../motion/Marquee";
import { Eyebrow, Lines, vars } from "./parts";

/** A client's words, three anonymised outcomes written like citations, and a slow band of the matters we take. */
export function Authorities() {
  return (
    <section id="authorities" className="cr-slab cr-slab--slab cr-auth" aria-labelledby="cr-auth-h">
      <div className="cr-grain" aria-hidden="true" />
      <div className="cr-wrap">
        <Eyebrow n="§ IV" tone="slab">
          Authorities
        </Eyebrow>
        <h2 id="cr-auth-h" className="cr-sr">
          What clients say, and how some matters ended
        </h2>
        <figure className="cr-quote">
          <blockquote>
            <Lines
              className="cr-quote__text"
              lines={["“Mara gave us a plan we could", "understand and act on. We felt", <em key="e">represented from the first call.”</em>]}
            />
          </blockquote>
          <figcaption data-reveal="rise">
            <span className="cr-quote__rule" aria-hidden="true" />
            Founder, private technology company
          </figcaption>
        </figure>

        <ul className="cr-cites">
          {AUTHORITIES.map((a, i) => (
            <li key={a.cite} className="cr-cite" data-reveal="cascade" style={vars({ "--i": i })}>
              <span className="cr-mono cr-cite__no">{a.cite}</span>
              <h3 className="cr-cite__title">{a.title}</h3>
              <p>{a.outcome}</p>
            </li>
          ))}
        </ul>
        <p className="cr-fine" data-reveal="rise">
          Matters anonymised with client consent. Attorney advertising. Prior results do not guarantee a similar outcome.
        </p>
      </div>
      <Marquee items={MARQUEE_ITEMS} className="cr-auth__band" label="Kinds of matter we take" />
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Counsel.tsx">
<![CDATA[import { Picture } from "../assets";
import { FACTS, PARTNERS } from "../content/firm";
import { CountUp } from "../motion/CountUp";
import { Eyebrow, Lines, vars } from "./parts";

/** The partners, then the firm in four numbers that count up. Portraits wipe in; they are placeholders until generated. */
export function Counsel() {
  return (
    <section id="counsel" className="cr-slab cr-slab--paper cr-counsel" aria-labelledby="cr-counsel-h">
      <div className="cr-wrap">
        <header className="cr-head cr-head--split">
          <div>
            <Eyebrow n="§ III">Counsel</Eyebrow>
            <Lines as="h2" id="cr-counsel-h" className="cr-h2" lines={["The people who", <em key="e">answer the phone.</em>]} />
          </div>
          <p className="cr-lede" data-reveal="rise">
            A smaller firm by design. You will not be handed to an associate you have not met: the partners on your matter are the partners you hired.
          </p>
        </header>

        <div className="cr-partners">
          {PARTNERS.map((p, i) => (
            <article key={p.id} className="cr-partner" data-reveal="cascade" style={vars({ "--i": i })}>
              <div className="cr-partner__photo" data-reveal="wipe">
                <Picture assetKey={p.asset} alt={`Portrait of ${p.name}`} sizes="(min-width: 900px) 40vw, 100vw" />
              </div>
              <div className="cr-partner__body">
                <h3 className="cr-partner__name">{p.name}</h3>
                <p className="cr-mono cr-partner__role">{p.role}</p>
                <p className="cr-partner__summary">{p.summary}</p>
                <ul className="cr-partner__creds">
                  {p.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <dl className="cr-facts">
          {FACTS.map((f, i) => (
            <div key={f.label} className="cr-fact" data-reveal="rise" style={vars({ "--i": i })}>
              <dt className="cr-fact__label">{f.label}</dt>
              <dd className="cr-fact__value">
                <CountUp value={f.value} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/FileMatter.tsx">
<![CDATA[import { FIRM } from "../content/firm";
import { MatterForm } from "../forms/MatterForm";
import { Eyebrow, Lines } from "./parts";

/** The close: contact details on a midnight slab, the filing form on an ivory card. */
export function FileMatter() {
  return (
    <section id="file" className="cr-slab cr-slab--slab cr-file" aria-labelledby="cr-file-h">
      <div className="cr-grain" aria-hidden="true" />
      <div className="cr-wrap cr-file__grid">
        <div className="cr-file__copy">
          <Eyebrow n="§ VI" tone="slab">
            File a matter
          </Eyebrow>
          <Lines as="h2" id="cr-file-h" className="cr-h2" lines={["Bring us the", <em key="e">hard one.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            Tell us a little about what you are facing. A partner reads every message and replies within one business day.
          </p>
          <dl className="cr-contact" data-reveal="rise">
            <div>
              <dt>Direct line</dt>
              <dd>
                <a href={FIRM.phoneHref}>{FIRM.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </dd>
            </div>
            <div>
              <dt>Chambers</dt>
              <dd>
                {FIRM.addressLines[0]}
                <br />
                {FIRM.addressLines[1]}
              </dd>
            </div>
          </dl>
        </div>
        <div className="cr-file__form" data-reveal="settle">
          <MatterForm />
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { FIRM } from "../content/firm";

export function Footer() {
  return (
    <footer className="cr-footer">
      <div className="cr-wrap cr-footer__grid">
        <div className="cr-footer__brand">
          <Logo href="#top" />
          <p>Business law, disputes, employment and estates for New York clients, since {FIRM.founded}.</p>
        </div>
        <nav className="cr-footer__col" aria-label="Footer">
          <span className="cr-footer__label">Explore</span>
          <a href="#matters">Matters</a>
          <a href="#argument">The argument</a>
          <a href="#counsel">Counsel</a>
          <a href="#questions">Questions</a>
        </nav>
        <div className="cr-footer__col">
          <span className="cr-footer__label">Chambers</span>
          <span>{FIRM.addressLines[0]}</span>
          <span>{FIRM.addressLines[1]}</span>
          <a href={FIRM.phoneHref}>{FIRM.phone}</a>
        </div>
      </div>
      <p className="cr-footer__giant" aria-hidden="true" data-reveal="rise">
        Calder <i>&amp;</i> Rowe
      </p>
      <div className="cr-wrap cr-footer__bottom">
        <span>© 2026 {FIRM.legalName}</span>
        <span>Attorney advertising. Prior results do not guarantee a similar outcome.</span>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Header.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { FIRM } from "../content/firm";

const LINKS = [
  { id: "matters", label: "Matters" },
  { id: "argument", label: "The argument" },
  { id: "counsel", label: "Counsel" },
  { id: "questions", label: "Questions" },
];

/**
 * A floating pill: the logo, four links with one underline that slides between them (it follows the section in view,
 * and the pointer while hovering), the direct line and a CTA. It compresses after 80px, tucks away while reading
 * down and returns on the way up. Below 980px the links live in a full-screen panel that opens from the toggle.
 */
export function Header() {
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hovering = useRef<string | null>(null);

  const place = useCallback((id: string | null) => {
    const nav = navRef.current;
    const link = id ? nav?.querySelector<HTMLElement>(`[data-nav="${id}"]`) : null;
    if (!nav) return;
    if (!link) {
      nav.style.setProperty("--ix-o", "0");
      return;
    }
    nav.style.setProperty("--ix", `${link.offsetLeft}px`);
    nav.style.setProperty("--iw", String(link.offsetWidth));
    nav.style.setProperty("--ix-o", "1");
  }, []);

  // The section in view decides the active link.
  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const hero = document.getElementById("top");
    const heroIo = hero
      ? new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" })
      : null;
    if (hero) heroIo?.observe(hero);
    return () => {
      io.disconnect();
      heroIo?.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!hovering.current) place(active || null);
  }, [active, place]);

  useEffect(() => {
    const onResize = () => place(hovering.current ?? (active || null));
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, place]);

  // Compress, hide on the way down, return on the way up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      setCompact(y > 80);
      if (y > last + 6 && y > 480) setHidden(true);
      else if (y < last - 6 || y < 480) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menu: Escape closes, Tab stays inside, the page behind does not scroll.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const focusables = () =>
      [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter((el): el is HTMLElement => !!el);
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const state = open ? "open" : hidden ? "hidden" : compact ? "compact" : "top";

  return (
    <>
      <div className="cr-progress" aria-hidden="true" />
      <header className="cr-header" data-state={state}>
        <div className="cr-header__bar">
          <span className="cr-header__glass" aria-hidden="true" />
          <Logo href="#top" className="cr-header__logo" />
          <nav
            ref={navRef}
            className="cr-nav"
            aria-label="Primary"
            onPointerLeave={() => {
              hovering.current = null;
              place(active || null);
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-nav={l.id}
                aria-current={active === l.id ? "location" : undefined}
                onPointerEnter={() => {
                  hovering.current = l.id;
                  place(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
            <span className="cr-nav__ink" aria-hidden="true" />
          </nav>
          <div className="cr-header__end">
            <a className="cr-header__phone" href={FIRM.phoneHref}>
              {FIRM.phone}
            </a>
            <a className="cr-header__cta" href="#file">
              <span>File a matter</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="cr-toggle"
              aria-expanded={open}
              aria-controls="cr-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div ref={panelRef} id="cr-menu" className="cr-menu" data-open={open} inert={!open} role="dialog" aria-label="Menu">
        <nav aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              <span className="cr-menu__n">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a href="#file" className="cr-menu__cta" style={{ "--i": LINKS.length } as React.CSSProperties} onClick={() => setOpen(false)}>
            File a matter
          </a>
        </nav>
        <p className="cr-menu__foot" style={{ "--i": LINKS.length + 1 } as React.CSSProperties}>
          <a href={FIRM.phoneHref}>{FIRM.phone}</a>
          <span>{FIRM.email}</span>
        </p>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Hero.tsx">
<![CDATA[import { Seal } from "../brand/Seal";
import { FIRM } from "../content/firm";
import { Magnetic } from "../motion/Magnetic";
import { Button, Lines, TextLink, vars } from "./parts";

/** Fine line-art of a courthouse colonnade, drawn in gold hairlines. Decorative. */
function Colonnade() {
  const columns = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg className="cr-colonnade" viewBox="0 0 1200 520" fill="none" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g stroke="var(--color-gold)" strokeWidth="1">
        <path d="M60 120 600 24l540 96" />
        <path d="M60 120h1080M84 146h1032" />
        {columns.map((i) => {
          const x = 130 + i * 156;
          return (
            <g key={i}>
              <path d={`M${x - 22} 166h44M${x - 16} 166v320M${x + 16} 166v320M${x - 22} 486h44`} />
              <path d={`M${x - 8} 176v300M${x} 176v300M${x + 8} 176v300`} opacity="0.35" />
            </g>
          );
        })}
        <path d="M70 486h1060M50 506h1100" />
      </g>
    </svg>
  );
}

/** The opening statement: a midnight slab with the colonnade, the headline, and a memorandum that foreshadows the brief. */
export function Hero() {
  return (
    <section id="top" className="cr-hero" aria-labelledby="cr-h1">
      <div className="cr-hero__bg" aria-hidden="true">
        <div className="cr-hero__lines">
          <Colonnade />
        </div>
        <div className="cr-hero__glow" data-ambient="paused" />
        <div className="cr-grain" />
      </div>

      <div className="cr-wrap cr-hero__grid">
        <div className="cr-hero__copy">
          <p className="cr-eyebrow cr-eyebrow--slab cr-load" style={vars({ "--d": 420 })}>
            <span className="cr-eyebrow__n">New York</span>
            <span className="cr-eyebrow__rule" aria-hidden="true" />
            <span>Business law · Disputes · Estates</span>
          </p>
          <Lines as="h1" id="cr-h1" className="cr-h1" load lines={["Hard decisions,", <em key="e">argued well.</em>]} />
          <p className="cr-lead cr-load" style={vars({ "--d": 760 })}>
            Calder &amp; Rowe is a New York law firm of eleven attorneys. When the matter is consequential, you work directly with the partners who argue it.
          </p>
          <div className="cr-hero__cta cr-load" style={vars({ "--d": 900 })}>
            <Magnetic>
              <Button href="#file" tone="gold">
                File a matter
              </Button>
            </Magnetic>
            <TextLink href="#argument">Read how we argue</TextLink>
          </div>
        </div>

        <div className="cr-hero__sheets cr-load cr-load--sheet" style={vars({ "--d": 640 })} data-ambient="paused">
          <div className="cr-sheet cr-sheet--back" aria-hidden="true" />
          <figure className="cr-sheet cr-sheet--front" aria-label="A memorandum of counsel, as an example of the firm's written advice">
            <div className="cr-sheet__head">
              <span className="cr-mono">Memorandum of counsel</span>
              <span className="cr-mono">No. 87-0412</span>
            </div>
            <p className="cr-sheet__matter">
              In the matter of <em>your decision</em>
            </p>
            <span className="cr-sheet__rule" aria-hidden="true" />
            <p className="cr-sheet__clause">
              <b>§ 3.</b> The strongest position is the one you can explain in a sentence. We recommend settling before discovery, on the terms set out below.
            </p>
            <p className="cr-sheet__ghost" aria-hidden="true">
              <i />
              <i />
              <i />
            </p>
            <p className="cr-sheet__clause">
              <b>§ 4.</b> Fees are fixed at the figure agreed in writing. Nothing is billed beyond it without your say-so.
            </p>
            <p className="cr-sheet__ghost" aria-hidden="true">
              <i />
              <i />
            </p>
            <p className="cr-note cr-note--sheet">Settle before discovery.</p>
            <figcaption className="cr-sheet__sign">
              <span className="cr-sheet__sig" aria-hidden="true" />
              <span className="cr-mono">M. Calder, partner</span>
            </figcaption>
          </figure>
          <Seal id="hero" className="cr-hero__seal" />
        </div>
      </div>

      <dl className="cr-wrap cr-hero__strip cr-load" style={vars({ "--d": 1050 })}>
        <div>
          <dt>Direct line</dt>
          <dd>
            <a href={FIRM.phoneHref}>{FIRM.phone}</a>
          </dd>
        </div>
        <div>
          <dt>Offices</dt>
          <dd>{FIRM.offices}</dd>
        </div>
        <div>
          <dt>Since</dt>
          <dd>{FIRM.founded}</dd>
        </div>
        <div>
          <dt>Reply within</dt>
          <dd>One business day</dd>
        </div>
      </dl>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Matters.tsx">
<![CDATA[import { MATTERS } from "../content/firm";
import { TiltCard } from "../motion/TiltCard";
import { Arrow, Eyebrow, Lines, vars } from "./parts";

/** Four counts. Each card is a practice area written as a count of the brief; hovering one lifts it and dims the rest. */
export function Matters() {
  return (
    <section id="matters" className="cr-slab cr-slab--paper cr-matters" aria-labelledby="cr-matters-h">
      <div className="cr-wrap">
        <header className="cr-head">
          <Eyebrow n="§ I">Matters</Eyebrow>
          <Lines as="h2" id="cr-matters-h" className="cr-h2" lines={["Four kinds of matter,", <em key="e">argued by partners.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            We take on fewer matters than we are asked to, so each one gets a partner&rsquo;s attention from the first call to the last invoice.
          </p>
        </header>

        <div className="cr-counts">
          {MATTERS.map((m, i) => (
            <TiltCard key={m.id} className="cr-count">
              <article data-reveal="cascade" style={vars({ "--i": i })}>
                <span className="cr-count__glow" aria-hidden="true" />
                <span className="cr-count__ghost" aria-hidden="true">
                  {m.numeral}
                </span>
                <p className="cr-mono cr-count__label">Count {m.numeral}</p>
                <h3 className="cr-count__title">{m.title}</h3>
                <p className="cr-count__summary">{m.summary}</p>
                <ul className="cr-count__list">
                  {m.typical.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="cr-count__ask" href="#file" data-matter={m.title} aria-label={`Ask about ${m.title}`}>
                  <span>Ask about this</span>
                  <span className="cr-count__disc" aria-hidden="true">
                    <Arrow />
                  </span>
                </a>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/parts.tsx">
<![CDATA[import type { CSSProperties, ElementType, ReactNode } from "react";

/** Typed way to set CSS custom properties from props. */
export const vars = (o: Record<string, string | number>) => o as CSSProperties;

type LinesProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  lines: ReactNode[];
  /** Hero headlines rise through their masks on load (CSS keyframes); everything else when scrolled into view. */
  load?: boolean;
  /** First line's place in the stagger. */
  start?: number;
};

/** Display type that rises line by line through an `overflow: clip` mask. The lines stay one readable string. */
export function Lines({ as: Tag = "span", id, className, lines, load, start = 0 }: LinesProps) {
  return (
    <Tag id={id} className={className} data-reveal={load ? undefined : "mask"} data-load={load ? "mask" : undefined}>
      {lines.map((line, i) => (
        <span key={i}>
          <span className="cr-line">
            <span className="cr-line__in" style={vars({ "--i": i + start })}>
              {line}
            </span>
          </span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** "§ I ── Matters": a section number, a rule that draws itself, then the label. */
export function Eyebrow({ n, children, tone = "paper" }: { n: string; children: ReactNode; tone?: "paper" | "slab" }) {
  return (
    <p className={`cr-eyebrow cr-eyebrow--${tone}`} data-reveal="slide">
      <span className="cr-eyebrow__n">{n}</span>
      <span className="cr-eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h10.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  tone?: "gold" | "ivory" | "ghost";
  children: string;
  className?: string;
  /** Form hooks: preselects the matter in the filing form. */
  matter?: string;
  ariaLabel?: string;
};

/** Pill button: the label rolls, the arrow disc slides, a fill rises from below. Press scales it down. */
export function Button({ href, tone = "gold", children, className, matter, ariaLabel }: ButtonProps) {
  return (
    <a className={`cr-btn cr-btn--${tone} ${className ?? ""}`} href={href} data-matter={matter} aria-label={ariaLabel}>
      <span className="cr-btn__label">
        <span data-text={children}>{children}</span>
      </span>
      <span className="cr-btn__disc" aria-hidden="true">
        <Arrow className="cr-btn__arrow" />
        <Arrow className="cr-btn__arrow cr-btn__arrow--b" />
      </span>
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="cr-link" href={href}>
      <span>{children}</span>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2.5v10.5M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
]]>
    </file>
    <file path="src/app/(calder)/calder/sections/Questions.tsx">
<![CDATA[import { Accordion } from "./Accordion";
import { Eyebrow, Lines } from "./parts";

export function Questions() {
  return (
    <section id="questions" className="cr-slab cr-slab--paper cr-questions" aria-labelledby="cr-q-h">
      <div className="cr-wrap cr-questions__grid">
        <header className="cr-head cr-questions__head">
          <Eyebrow n="§ V">Questions</Eyebrow>
          <Lines as="h2" id="cr-q-h" className="cr-h2" lines={["Before we", <em key="e">speak.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            The things most people ask first. If yours is not here, the form below is the quickest way to reach a partner.
          </p>
        </header>
        <Accordion />
      </div>
    </section>
  );
}
]]>
    </file>
  </files>
</template>
