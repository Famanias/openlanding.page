<template slug="chinagraph" name="CHINAGRAPH">
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
    <file path="src/app/(chinagraph)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Overpass_Mono, Public_Sans } from "next/font/google";
import "./chinagraph/chinagraph.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const mono = Overpass_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-overpass-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "CHINAGRAPH — Collection 07, Concrete Flash",
  description: "Tailoring and outerwear cut from deadstock cloth in London. One roll of film, six selects, six looks. Marked for keeps.",
  openGraph: {
    title: "CHINAGRAPH — Marked for keeps",
    description: "Collection 07, Concrete Flash, AW26. Six looks edited from one roll of medium-format film.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function ChinagraphLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`[data-reveal],[data-reveal="wipe"]>*,[data-reveal="focus"]>*,[data-reveal] .cg-split__inner{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="cg-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/assets.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/chinagraph";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

/** Where the "flash" sits on a placeholder, so 28 empty slots don't look identical. */
function lightFor(key: string): CSSProperties {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return { "--ph-x": `${30 + (h % 40)}%`, "--ph-y": `${28 + ((h >> 6) % 30)}%`, "--ph-r": `${46 + ((h >> 11) % 22)}%` } as CSSProperties;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/**
 * A photograph that fills its positioned parent (object-fit: cover). Until the generated still is
 * processed it renders a flash-lit film-frame placeholder labelled with the file it is waiting for.
 */
export function Picture({ assetKey, alt, className, sizes = "100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    // alt="" marks a decorative duplicate (e.g. the enlarger): hide the placeholder from assistive tech too.
    const a11y = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
    return (
      <span className={`cg-ph ${className ?? ""}`} {...a11y} data-asset={assetKey} style={lightFor(assetKey)}>
        <span className="cg-ph__label" aria-hidden="true">
          <span>{assetKey}</span>
          <span>awaiting print</span>
        </span>
      </span>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={`cg-pic ${className ?? ""}`}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img src={webp800} srcSet={set("webp")} sizes={sizes} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey} />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/chinagraph.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-film: #0C0C0B;
  --color-flash: #F4F3EF;
  --color-grease: #F3C318;
  --font-display: var(--font-big-shoulders), "Arial Narrow", Impact, sans-serif;
  --font-body: var(--font-public-sans), system-ui, sans-serif;
  --font-mono: var(--font-overpass-mono), ui-monospace, monospace;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-strobe: cubic-bezier(0.1, 0.9, 0.2, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 30%, 1.01 42%, 1);
  --dur-instant: 90ms;
  --dur-fast: 200ms;
  --dur-base: 500ms;
  --dur-slow: 900ms;
  --dur-hero: 1400ms;
  --reveal-shift: 32px;
  --stagger: 70ms;
}

:root {
  color-scheme: dark;
  --color-film: #0C0C0B;
  --color-flash: #F4F3EF;
  --color-grease: #F3C318;
  --font-display: var(--font-big-shoulders), "Arial Narrow", Impact, sans-serif;
  --font-body: var(--font-public-sans), system-ui, sans-serif;
  --font-mono: var(--font-overpass-mono), ui-monospace, monospace;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-strobe: cubic-bezier(0.1, 0.9, 0.2, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.04 30%, 1.01 42%, 1);
  --dur-instant: 90ms;
  --dur-fast: 200ms;
  --dur-base: 500ms;
  --dur-slow: 900ms;
  --dur-hero: 1400ms;
  --reveal-shift: 32px;
  --stagger: 70ms;

  --cg-gutter: clamp(16px, 3.5vw, 48px);
  --cg-container: 1440px;
  --cg-header: 64px;
  --cg-r-sm: 2px;
  --cg-r: 4px;
  --cg-muted: color-mix(in srgb, var(--color-flash) 66%, var(--color-film));
  --cg-faint: color-mix(in srgb, var(--color-flash) 22%, transparent);
  --cg-line: color-mix(in srgb, var(--color-flash) 16%, transparent);
  --cg-progress: 0;
}

/* ───────────── Base ───────────── */

*, *::before, *::after { box-sizing: border-box; }
html { background: var(--color-film); color: var(--color-flash); scroll-padding-top: 72px; overflow-x: clip; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--color-film); color: var(--color-flash); font: 400 16.5px/1.55 var(--font-body); -webkit-font-smoothing: antialiased; }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; background: none; border: 0; padding: 0; }
h1, h2, h3, p, dl, dd, figure, fieldset { margin: 0; }
ul, ol { margin: 0; padding: 0; list-style: none; }
fieldset { padding: 0; border: 0; min-width: 0; }
img, svg { display: block; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 900; text-transform: uppercase; line-height: 0.84; letter-spacing: -0.01em; }
::selection { background: var(--color-grease); color: var(--color-film); }
:focus-visible { outline: 2px solid var(--color-grease); outline-offset: 3px; border-radius: var(--cg-r-sm); }
[hidden] { display: none !important; }

.cg-shell { position: relative; min-height: 100svh; }
.cg-main { position: relative; }
.cg-container { width: 100%; max-width: var(--cg-container); margin-inline: auto; padding-inline: var(--cg-gutter); }
.cg-sr { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.cg-mono { font-family: var(--font-mono); font-size: 10.5px; line-height: 1.3; letter-spacing: 0.08em; text-transform: uppercase; }
.cg-skip { position: fixed; z-index: 100; top: 10px; left: 10px; padding: 10px 14px; border-radius: var(--cg-r-sm); background: var(--color-flash); color: var(--color-film); font-weight: 600; transform: translateY(-160%); transition: transform var(--dur-fast) var(--ease-out); }
.cg-skip:focus { transform: none; }
.cg-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--color-grease); vertical-align: middle; }

/* Film grain: one pre-rendered noise tile, drifted in steps. */
.cg-grain { position: fixed; inset: -40%; z-index: 60; pointer-events: none; opacity: 0.06; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }

.cg-eyebrow { display: flex; flex-wrap: wrap; gap: 6px 14px; font: 500 10.5px/1.3 var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--cg-muted); }
.cg-eyebrow span:first-child { color: var(--color-flash); }
/* The hero eyebrow keeps a fixed one-line box: a fallback glyph (▸) or a font swap must never push the h1 (CLS 0). */
.cg-sheet__copy .cg-eyebrow { flex-wrap: nowrap; white-space: nowrap; overflow: hidden; block-size: calc(10.5px * 1.3); }
.cg-eyebrow span + span::before { content: "▸"; margin-right: 14px; opacity: 0.6; }
.cg-section { position: relative; padding-block: clamp(88px, 11vw, 168px); }
.cg-h2 { font-size: clamp(3rem, 8vw, 7.5rem); }
.cg-lead { max-width: 52ch; color: var(--cg-muted); font-size: clamp(15.5px, 1.2vw, 18px); }

.cg-split { display: block; }
.cg-split__line { display: block; overflow: clip; padding-bottom: 0.06em; margin-bottom: -0.06em; }
.cg-split__inner { display: block; }

/* ───────────── Pictures and placeholders ───────────── */

.cg-pic, .cg-pic img { position: absolute; inset: 0; width: 100%; height: 100%; }
.cg-pic img { object-fit: cover; }
.cg-ph {
  position: absolute; inset: 0; display: block; overflow: clip;
  background:
    radial-gradient(ellipse var(--ph-r, 56%) calc(var(--ph-r, 56%) * 0.92) at var(--ph-x, 50%) var(--ph-y, 40%), color-mix(in srgb, var(--color-flash) 30%, var(--color-film)), color-mix(in srgb, var(--color-flash) 8%, var(--color-film)) 55%, var(--color-film) 100%);
}
.cg-ph::after { content: ""; position: absolute; left: var(--ph-x, 50%); top: calc(var(--ph-y, 40%) + 6%); width: 18%; height: 54%; border-radius: 40% 40% 8% 8%; background: color-mix(in srgb, var(--color-film) 72%, transparent); transform: translateX(-50%); filter: blur(2px); }
.cg-ph__label { position: absolute; z-index: 1; left: 8px; bottom: 7px; display: grid; gap: 2px; font: 400 9px/1.2 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; color: color-mix(in srgb, var(--color-flash) 72%, transparent); }
.cg-ph__label span + span { color: var(--color-grease); }

/* ───────────── Logo, buttons ───────────── */

.cg-logo { display: inline-flex; align-items: center; gap: 10px; }
.cg-logo__mark { width: 30px; height: 30px; color: currentColor; }
.cg-mark__loop { stroke-dasharray: 1; stroke-dashoffset: 0; }
.cg-logo__word { font: 800 20px/1 var(--font-display); letter-spacing: 0.08em; text-transform: uppercase; }

.cg-button {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 48px; padding: 0 22px; overflow: hidden; border-radius: var(--cg-r-sm); border: 1px solid var(--color-flash);
  font: 600 12px/1 var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap;
  transition: transform var(--dur-instant) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.cg-button--solid { background: var(--color-flash); color: var(--color-film); }
.cg-button--line { background: transparent; color: var(--color-flash); }
.cg-button--ink { background: var(--color-film); border-color: var(--color-film); color: var(--color-flash); }
.cg-button__fill { position: absolute; z-index: -1; inset: 0; clip-path: inset(100% 0 0 0); transition: clip-path var(--dur-base) var(--ease-out-expo); }
.cg-button--solid .cg-button__fill { background: var(--color-film); }
.cg-button--line .cg-button__fill { background: var(--color-flash); }
.cg-button--ink .cg-button__fill { background: var(--color-flash); }
.cg-button__roll { display: grid; overflow: clip; line-height: 1.3; }
.cg-button__roll > span { grid-area: 1 / 1; transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-button__roll > span + span { transform: translateY(115%); }
.cg-button:focus-visible .cg-button__fill { clip-path: inset(0); }
.cg-button--solid:focus-visible { color: var(--color-flash); }
.cg-button--line:focus-visible, .cg-button--ink:focus-visible { color: var(--color-film); }
.cg-button:active:not(:disabled) { transform: scale(0.97); }
.cg-button:not(:active) { transition-timing-function: var(--ease-spring), var(--ease-out); }
.cg-button:disabled { cursor: not-allowed; }
.cg-magnetic { display: inline-flex; transform: translate3d(var(--cg-mx, 0px), var(--cg-my, 0px), 0); }
.cg-link { position: relative; padding: 4px 0; font: 600 12px/1 var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; }
.cg-link::after, .cg-footer__links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-link:focus-visible::after, .cg-footer__links a:focus-visible::after { transform: scaleX(1); transform-origin: left; }

/* ───────────── Header ───────────── */

.cg-header { position: fixed; z-index: 50; inset: 0 0 auto; height: var(--cg-header); color: var(--color-flash); transition: transform var(--dur-base) var(--ease-out-expo), color var(--dur-fast) var(--ease-out); }
.cg-header::before { content: ""; position: absolute; inset: 0; z-index: -1; background: color-mix(in srgb, var(--color-film) 78%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--cg-line); opacity: 0; transition: opacity var(--dur-base) var(--ease-out), background-color var(--dur-fast) var(--ease-out); }
.cg-header[data-state="compact"]::before, .cg-header[data-state="hidden"]::before { opacity: 1; }
.cg-header[data-state="hidden"] { transform: translateY(-100%); }
.cg-header[data-tone="light"] { color: var(--color-film); }
.cg-header[data-tone="light"]::before { background: color-mix(in srgb, var(--color-flash) 88%, transparent); border-color: color-mix(in srgb, var(--color-film) 14%, transparent); }
.cg-header__inner { display: flex; align-items: center; gap: 24px; height: 100%; }
.cg-header__brand { border-radius: var(--cg-r-sm); }
.cg-header__counter { display: inline-flex; align-items: center; gap: 8px; color: inherit; opacity: 0.8; font-variant-numeric: tabular-nums; }
.cg-header__nav { position: relative; display: flex; gap: 26px; margin-left: auto; }
.cg-header__link { position: relative; padding: 22px 0; font: 500 11px/1 var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.72; transition: opacity var(--dur-fast) var(--ease-out); }
.cg-header__link[aria-current="true"], .cg-header__link:hover, .cg-header__link:focus-visible { opacity: 1; }
.cg-header__indicator { position: absolute; left: 0; bottom: 14px; width: 100px; height: 2px; background: var(--color-grease); transform-origin: left; transform: translateX(var(--x, 0px)) scaleX(calc(var(--w, 0) / 100)); transition: transform var(--dur-base) var(--ease-out-expo), opacity var(--dur-fast) var(--ease-out); }
.cg-header[data-tone="light"] .cg-header__indicator { background: var(--color-film); }
.cg-header__indicator[data-visible="false"] { opacity: 0; }
.cg-header__progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--color-grease); transform-origin: left; transform: scaleX(var(--cg-progress)); }
.cg-header__toggle { display: none; position: relative; width: 44px; height: 44px; border: 1px solid currentColor; border-radius: var(--cg-r-sm); }
.cg-header__bars { position: absolute; inset: 0; display: grid; place-content: center; gap: 6px; }
.cg-header__bars i { display: block; width: 18px; height: 1.5px; background: currentColor; transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-header[data-menu="open"] .cg-header__bars i:first-child { transform: translateY(3.75px) rotate(45deg); }
.cg-header[data-menu="open"] .cg-header__bars i:last-child { transform: translateY(-3.75px) rotate(-45deg); }
.cg-menu { position: fixed; inset: var(--cg-header) 0 0; z-index: -2; display: flex; flex-direction: column; justify-content: space-between; padding: 24px var(--cg-gutter) 36px; background: var(--color-film); }
.cg-menu nav { display: grid; }
.cg-menu nav a { display: flex; align-items: baseline; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--cg-line); font: 900 clamp(38px, 11vw, 60px)/0.9 var(--font-display); text-transform: uppercase; }
.cg-menu nav a .cg-mono { color: var(--color-grease); }
.cg-menu__foot { color: var(--cg-muted); }

.cg-bag { position: relative; }
.cg-bag__button { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 12px; border: 1px solid currentColor; border-radius: var(--cg-r-sm); font: 500 11px/1 var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; transition: transform var(--dur-instant) var(--ease-out); }
.cg-bag__button:active { transform: scale(0.96); }
.cg-bag__count { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 10px; background: var(--color-grease); color: var(--color-film); font-weight: 600; font-variant-numeric: tabular-nums; }
.cg-bag__panel { position: absolute; right: 0; top: calc(100% + 10px); width: min(340px, calc(100vw - 32px)); display: grid; gap: 12px; padding: 18px; border-radius: var(--cg-r); background: var(--color-flash); color: var(--color-film); box-shadow: 0 30px 60px -20px color-mix(in srgb, var(--color-film) 60%, transparent); transform-origin: top right; }
.cg-bag__title, .cg-bag__total .cg-mono { color: color-mix(in srgb, var(--color-film) 70%, var(--color-flash)); }
.cg-bag__lines { display: grid; gap: 10px; }
.cg-bag__lines li { display: flex; justify-content: space-between; gap: 12px; font-size: 14.5px; }
.cg-bag__remove { position: relative; font: 500 10px/1 var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 3px; }
.cg-bag__total { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid color-mix(in srgb, var(--color-film) 18%, transparent); font-weight: 600; }
.cg-bag__empty, .cg-bag__note { font-size: 14px; color: color-mix(in srgb, var(--color-film) 70%, var(--color-flash)); }

/* ───────────── Sheet (finished by default) ───────────── */

.cg-sheet { position: relative; z-index: 2; }
.cg-sheet__stage { position: relative; overflow: clip; padding: calc(var(--cg-header) + clamp(28px, 5vw, 64px)) 0 clamp(56px, 7vw, 96px); background: var(--color-film); }
.cg-sheet__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 32px 24px; align-items: center; }
.cg-sheet__copy { grid-column: 1 / span 5; display: grid; gap: 24px; align-content: center; }
.cg-sheet__title { font-size: clamp(4rem, 11vw, 12rem); }
.cg-sheet__lead { max-width: 40ch; color: var(--cg-muted); font-size: clamp(15.5px, 1.2vw, 18px); }
.cg-sheet__actions { display: flex; flex-wrap: wrap; gap: 12px; }
.cg-sheet__cue { display: flex; align-items: center; gap: 8px; color: var(--cg-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.cg-sheet__board { grid-column: 6 / span 7; justify-self: end; width: min(100%, 860px); }
.cg-enlarge, .cg-strobe { pointer-events: none; }
.cg-enlarge { display: none; }
.cg-strobe { position: absolute; inset: 0; z-index: 5; background: var(--color-flash); opacity: var(--cg-flash, 0); }

.cg-board { position: relative; padding: clamp(10px, 2%, 22px); border-radius: var(--cg-r); background: var(--color-flash); color: var(--color-film); box-shadow: 0 40px 80px -40px color-mix(in srgb, var(--color-flash) 14%, transparent); }
.cg-board__head { display: flex; justify-content: space-between; gap: 12px; padding: 2px 4px 10px; font: 500 clamp(8px, 0.75vw, 10px)/1 var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; }
.cg-board__strips { display: grid; gap: clamp(6px, 1.2%, 14px); }
.cg-strip { display: grid; gap: 4px; padding: 6px clamp(6px, 1.4%, 14px); background: var(--color-film); color: color-mix(in srgb, var(--color-flash) 55%, var(--color-film)); }
.cg-strip__edge { font: 500 clamp(6.5px, 0.6vw, 8.5px)/1 var(--font-mono); letter-spacing: 0.18em; text-transform: uppercase; white-space: nowrap; overflow: hidden; }
.cg-strip__frames { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(4px, 1.6%, 14px); }
.cg-frame { position: relative; aspect-ratio: 1; }
.cg-frame__img { position: absolute; inset: 0; overflow: clip; transition: transform var(--dur-fast) var(--ease-out); }
.cg-frame__img::after { content: ""; position: absolute; inset: 0; background: var(--color-flash); opacity: 0; transition: opacity var(--dur-fast) var(--ease-out); }
.cg-frame__img .cg-ph__label { display: none; }
.cg-frame__n { position: absolute; z-index: 2; left: 4px; bottom: 3px; font: 500 clamp(7px, 0.7vw, 9px)/1 var(--font-mono); color: color-mix(in srgb, var(--color-flash) 80%, transparent); }
.cg-loop { position: absolute; z-index: 3; inset: -16%; width: 132%; height: 132%; overflow: visible; transform: rotate(var(--tilt, 0deg)); pointer-events: none; }
.cg-loop path { fill: none; stroke: var(--color-grease); stroke-width: 3.4; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.cg-loupe { display: none; }

/* ───────────── Looks (finished by default; live vars default to "arrived") ───────────── */

.cg-looks { position: relative; z-index: 1; }
.cg-look { position: relative; height: 100vh; height: 100svh; min-height: 560px; overflow: clip; isolation: isolate; background: var(--color-film); }
.cg-look__media { position: absolute; left: 50%; top: 50%; width: max(100%, 100vh); width: max(100%, 100svh); aspect-ratio: 1; transform: translate(-50%, -50%) translateY(calc(var(--leave, 0) * -6%)) scale(calc(1 + (1 - var(--arrive, 1)) * 0.14)); will-change: transform; }
.cg-look__shade { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, color-mix(in srgb, var(--color-film) 88%, transparent), color-mix(in srgb, var(--color-film) 25%, transparent) 45%, transparent 66%); }
.cg-look::after { content: ""; position: absolute; inset: 0; z-index: 2; background: var(--color-film); opacity: calc(var(--leave, 0) * 0.72); pointer-events: none; }
.cg-strobe--look { z-index: 6; opacity: var(--flash, 0); }
.cg-look__rail { position: absolute; z-index: 3; left: var(--cg-gutter); top: calc(var(--cg-header) + 28px); display: grid; grid-template-columns: repeat(4, 9px); gap: 4px; }
.cg-look__rail li { position: relative; width: 9px; height: 9px; background: color-mix(in srgb, var(--color-flash) 22%, transparent); }
.cg-look__rail li[data-select] { background: color-mix(in srgb, var(--color-flash) 55%, transparent); }
.cg-look__rail li[data-here] { background: var(--color-flash); }
.cg-look__rail li[data-here]::after { content: ""; position: absolute; inset: -5px; border: 1.5px solid var(--color-grease); border-radius: 50%; }
.cg-look__info {
  --in: clamp(0, calc((var(--arrive, 1) - 0.55) * 2.4), 1);
  position: absolute; z-index: 3; left: 0; right: 0; bottom: clamp(28px, 5vh, 56px); display: grid; gap: 14px; justify-items: start;
  opacity: var(--in); transform: translateY(calc((1 - var(--in)) * 36px));
}
.cg-look__meta { color: var(--color-grease); }
.cg-look__name { font-size: clamp(4rem, 12vw, 11rem); max-width: 9ch; }
.cg-look__spec { display: flex; flex-wrap: wrap; gap: 8px 28px; }
.cg-look__spec dt { color: var(--cg-muted); }
.cg-look__spec dd { margin-top: 4px; font-weight: 500; }
.cg-look__note { max-width: 44ch; color: color-mix(in srgb, var(--color-flash) 82%, var(--color-film)); }
.cg-look__cta { margin-top: 6px; }
.cg-look__detail { position: absolute; z-index: 4; right: var(--cg-gutter); bottom: clamp(28px, 5vh, 56px); width: clamp(140px, 17vw, 260px); display: grid; gap: 8px; transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-look__detail-img { position: relative; display: block; aspect-ratio: 4 / 5; overflow: clip; border-radius: var(--cg-r-sm); outline: 1px solid var(--cg-faint); clip-path: inset(calc((1 - var(--detail, 1)) * 100%) 0 0 0); }
.cg-look__detail figcaption { color: var(--cg-muted); opacity: var(--detail, 1); }

/* ───────────── Live: pinned sheet + stacked looks ───────────── */

@media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) {
  .cg-sheet { height: 440vh; height: 440svh; }
  .cg-sheet__stage { position: sticky; top: 0; height: 100vh; height: 100svh; padding-bottom: 24px; }
  .cg-sheet__grid { height: 100%; }
  .cg-sheet__board { width: min(100%, calc((100svh - var(--cg-header) - 90px) * 1.12)); opacity: calc(1 - var(--cg-enlarge, 0) * 0.85); }
  .cg-sheet__copy { opacity: clamp(0, calc(1 - var(--cg-enlarge, 0) * 2.2), 1); transform: translateY(calc(var(--cg-enlarge, 0) * -40px)); }

  /* An undrawn loop still paints its round cap as a dot; hide it until the pencil touches down. */
  .cg-loop path { stroke-dashoffset: calc(1 - var(--mark, 0)); opacity: clamp(0, calc(var(--mark, 0) * 40), 1); }
  .cg-loupe { position: absolute; z-index: 4; left: 0; top: 0; display: block; width: calc(var(--cell, 100px) * 1.34); height: calc(var(--cell, 100px) * 1.34); transform: translate(calc(var(--lx, 0px) - 50%), calc(var(--ly, 0px) - 50%)); opacity: clamp(0, calc(1 - var(--cg-enlarge, 0) * 6), 1); pointer-events: none; }
  .cg-loupe__ring { position: absolute; inset: 0; border: 2px solid var(--color-grease); border-radius: 50%; box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-film) 40%, transparent) inset; }
  .cg-loupe__ring::before, .cg-loupe__ring::after { content: ""; position: absolute; background: var(--color-grease); }
  .cg-loupe__ring::before { left: 50%; top: -9px; width: 2px; height: 14px; margin-left: -1px; }
  .cg-loupe__ring::after { top: 50%; right: -9px; width: 14px; height: 2px; margin-top: -1px; }
  .cg-frame[data-under] .cg-frame__img { transform: scale(1.06); }
  .cg-frame[data-under] .cg-frame__img::after { opacity: 0.1; }

  .cg-enlarge { position: absolute; z-index: 4; left: 50%; top: 50%; display: block; width: var(--side, 100vw); height: var(--side, 100vw); margin: calc(var(--side, 100vw) / -2) 0 0 calc(var(--side, 100vw) / -2); overflow: clip; transform: translate(var(--ex, 0px), var(--ey, 0px)) scale(var(--es, 0)); opacity: clamp(0, calc(var(--cg-enlarge, 0) * 400), 1); }
  .cg-enlarge .cg-ph__label { display: none; }

  .cg-looks { margin-top: -100vh; margin-top: -100svh; padding-bottom: 40svh; }
  .cg-look { position: sticky; top: 0; }
  .cg-look[data-look="0"] { margin-bottom: 100vh; margin-bottom: 100svh; }
}

/* ───────────── Cloth ───────────── */

.cg-cloth__head { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 24px; align-items: end; margin-bottom: clamp(40px, 6vw, 72px); }
.cg-cloth__intro { grid-column: 1 / span 7; display: grid; gap: 22px; }
.cg-cloth__count { grid-column: 9 / span 4; justify-self: end; text-align: right; display: grid; gap: 6px; }
.cg-cloth__metres { font: 900 clamp(4rem, 9vw, 8.5rem)/0.84 var(--font-display); font-variant-numeric: tabular-nums; }
.cg-cloth__count .cg-mono { color: var(--cg-muted); }
.cg-cloth__track { display: flex; gap: 20px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory; scroll-padding-inline: var(--cg-gutter); padding: 4px max(var(--cg-gutter), calc((100% - var(--cg-container)) / 2 + var(--cg-gutter))) 12px; scrollbar-width: none; cursor: grab; }
.cg-cloth__track::-webkit-scrollbar { display: none; }
.cg-cloth__track[data-dragging] { scroll-snap-type: none; cursor: grabbing; user-select: none; }
.cg-cloth__card { flex: 0 0 clamp(250px, 29vw, 420px); scroll-snap-align: start; }
.cg-cloth__inner { display: grid; gap: 14px; }
.cg-cloth__img { position: relative; display: block; aspect-ratio: 4 / 5; overflow: clip; border-radius: var(--cg-r); }
.cg-cloth__img > * { transition: transform var(--dur-slow) var(--ease-out-expo); }
.cg-cloth__caption { display: grid; gap: 6px; transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-cloth__name { font-size: clamp(2rem, 3vw, 2.8rem); }
.cg-cloth__caption .cg-mono { color: var(--cg-muted); }
.cg-cloth__controls { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; }
.cg-arrow { display: grid; place-items: center; width: 48px; height: 48px; border: 1px solid var(--color-flash); border-radius: var(--cg-r-sm); font-size: 18px; transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out), opacity var(--dur-fast) var(--ease-out); }
.cg-arrow:active:not(:disabled) { transform: scale(0.94); }
.cg-arrow:disabled { opacity: 0.3; cursor: default; }

/* ───────────── Shop (flash white) ───────────── */

.cg-shop { background: var(--color-flash); color: var(--color-film); }
.cg-shop .cg-eyebrow { color: color-mix(in srgb, var(--color-film) 66%, var(--color-flash)); }
.cg-shop .cg-eyebrow span:first-child { color: var(--color-film); }
.cg-shop .cg-lead { color: color-mix(in srgb, var(--color-film) 70%, var(--color-flash)); }
.cg-shop :focus-visible { outline-color: var(--color-film); }
.cg-shop__head { display: grid; gap: 22px; max-width: 820px; margin-bottom: clamp(44px, 6vw, 80px); }
.cg-shop__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 44px 24px; }
.cg-product { display: grid; gap: 16px; }
.cg-product__media { position: relative; aspect-ratio: 4 / 5; overflow: clip; border-radius: var(--cg-r); background: var(--color-film); }
.cg-product__flat, .cg-product__model { position: absolute; inset: 0; transition: clip-path var(--dur-slow) var(--ease-in-out), transform var(--dur-slow) var(--ease-out-expo); }
.cg-product__model { clip-path: inset(0 0 0 100%); }
.cg-product[data-on-model="true"] .cg-product__model { clip-path: inset(0); }
.cg-product__toggle { position: absolute; z-index: 2; top: 10px; right: 10px; min-height: 32px; padding: 0 10px; border-radius: var(--cg-r-sm); background: color-mix(in srgb, var(--color-film) 70%, transparent); color: var(--color-flash); font: 500 10px/1 var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; backdrop-filter: blur(6px); transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.cg-product__toggle[aria-pressed="true"] { background: var(--color-flash); color: var(--color-film); }
.cg-product__toggle:active { transform: scale(0.95); }
.cg-product__look { position: absolute; z-index: 2; left: 10px; top: 10px; padding: 5px 7px; border-radius: var(--cg-r-sm); background: color-mix(in srgb, var(--color-film) 70%, transparent); color: var(--color-flash); }
.cg-product__body { display: grid; gap: 10px; }
.cg-product__row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.cg-product__name { font-size: clamp(1.5rem, 2vw, 2rem); }
.cg-product__price { font: 600 15px/1 var(--font-mono); font-variant-numeric: tabular-nums; }
.cg-product__origin { color: color-mix(in srgb, var(--color-film) 66%, var(--color-flash)); }
.cg-sizes { display: flex; flex-wrap: wrap; gap: 6px; }
.cg-size { position: relative; display: inline-flex; }
.cg-size input { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.cg-size input:disabled { cursor: not-allowed; }
.cg-size span { display: inline-grid; place-items: center; min-width: 44px; min-height: 40px; padding: 0 10px; border: 1px solid color-mix(in srgb, var(--color-film) 26%, transparent); border-radius: var(--cg-r-sm); font: 500 12px/1 var(--font-mono); transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.cg-size input:checked + span { background: var(--color-film); border-color: var(--color-film); color: var(--color-flash); }
.cg-size input:focus-visible + span { outline: 2px solid var(--color-film); outline-offset: 2px; }
.cg-size:active span { transform: scale(0.94); }
.cg-size[data-sold-out] span { color: color-mix(in srgb, var(--color-film) 58%, var(--color-flash)); text-decoration: line-through; border-style: dashed; }
.cg-product__add { width: 100%; }
.cg-product__add:disabled:not([data-phase="added"]):not([data-phase="adding"]) { background: transparent; color: color-mix(in srgb, var(--color-film) 70%, var(--color-flash)); border-color: color-mix(in srgb, var(--color-film) 26%, transparent); }
.cg-product__add[data-phase="adding"] .cg-button__fill { clip-path: inset(0); }
.cg-product__add[data-phase="adding"] { color: var(--color-film); }
.cg-product__add-label { position: relative; }

/* ───────────── Request ───────────── */

.cg-request__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 40px 24px; align-items: start; }
.cg-request__copy { grid-column: 1 / span 5; display: grid; gap: 36px; }
.cg-request__copy > [data-reveal]:first-child { display: grid; gap: 22px; }
.cg-request__img { position: relative; display: block; aspect-ratio: 1; overflow: clip; border-radius: var(--cg-r); }
.cg-request__form { grid-column: 7 / span 6; }
.cg-form-card { padding: clamp(20px, 3vw, 36px); border: 1px solid var(--cg-line); border-radius: var(--cg-r); background: color-mix(in srgb, var(--color-flash) 4%, var(--color-film)); }
.cg-form { display: grid; gap: 18px; }
.cg-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.cg-field { position: relative; display: grid; }
.cg-field input, .cg-field select { width: 100%; height: 58px; padding: 24px 14px 8px; border: 1px solid var(--cg-faint); border-radius: var(--cg-r-sm); background: transparent; color: var(--color-flash); font-size: 16px; outline: none; appearance: none; transition: border-color var(--dur-fast) var(--ease-out); }
.cg-field select option { background: var(--color-film); color: var(--color-flash); }
.cg-field--select::before { content: "▾"; position: absolute; right: 14px; top: 20px; color: var(--cg-muted); pointer-events: none; }
.cg-field label { position: absolute; left: 15px; top: 19px; color: var(--cg-muted); pointer-events: none; transform-origin: left top; transition: transform var(--dur-base) var(--ease-out-expo), color var(--dur-fast) var(--ease-out); }
.cg-field input:focus + label, .cg-field input:not(:placeholder-shown) + label, .cg-field select:focus + label, .cg-field select[data-filled="true"] + label { transform: translateY(-10px) scale(0.74); }
.cg-field input:focus + label, .cg-field select:focus + label { color: var(--color-grease); }
.cg-field::after { content: ""; position: absolute; left: 1px; right: 1px; top: 56px; height: 2px; background: var(--color-grease); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-base) var(--ease-out-expo); pointer-events: none; }
.cg-field:focus-within::after { transform: scaleX(1); }
.cg-field input:hover, .cg-field select:hover { border-color: color-mix(in srgb, var(--color-flash) 45%, transparent); }
.cg-field input:focus, .cg-field select:focus { border-color: var(--color-flash); }
.cg-field[data-invalid="true"] input, .cg-field[data-invalid="true"] select { border-color: var(--color-grease); }
.cg-field__error { font-size: 13.5px; color: var(--color-grease); }
.cg-field__error:empty { display: none; }
.cg-field__error:not(:empty) { margin-top: 6px; }
.cg-field__error:not(:empty)::before { content: "▲ "; font-size: 10px; }
.cg-roles { display: grid; gap: 10px; }
.cg-roles legend { margin-bottom: 10px; color: var(--cg-muted); }
.cg-roles__list { display: flex; flex-wrap: wrap; gap: 8px; }
.cg-chip { position: relative; display: inline-flex; }
.cg-chip input { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.cg-chip span { display: inline-flex; align-items: center; min-height: 42px; padding: 0 14px; border: 1px solid var(--cg-faint); border-radius: var(--cg-r-sm); font-size: 14.5px; transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out); }
.cg-chip input:checked + span { background: var(--color-flash); border-color: var(--color-flash); color: var(--color-film); }
.cg-chip input:focus-visible + span { outline: 2px solid var(--color-grease); outline-offset: 2px; }
.cg-chip:active span { transform: scale(0.96); }
.cg-roles[data-invalid="true"] .cg-chip span { border-color: var(--color-grease); }
.cg-form__foot { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 20px; padding-top: 6px; }
.cg-form__note { flex: 1 1 220px; font-size: 13.5px; color: var(--cg-muted); }
.cg-submit { min-width: 240px; }
.cg-submit__label, .cg-submit__busy { transition: transform var(--dur-base) var(--ease-out-expo); }
.cg-submit__busy { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 10px; transform: translateY(110%); }
.cg-submit__busy i { width: 10px; height: 10px; border-radius: 50%; background: currentColor; }
.cg-submit[data-state="sending"] .cg-submit__label { transform: translateY(-170%); }
.cg-submit[data-state="sending"] .cg-submit__busy { transform: none; }
.cg-submit[data-state="sending"] .cg-button__fill { clip-path: inset(0); }
.cg-submit[data-state="sending"] { color: var(--color-flash); }

.cg-slip { position: relative; display: grid; gap: 16px; padding: clamp(18px, 2.4vw, 28px); border-radius: var(--cg-r-sm); background: var(--color-flash); color: var(--color-film); outline: none; }
.cg-slip__head { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--color-film); }
.cg-slip__title { font-size: clamp(2.4rem, 4vw, 3.6rem); max-width: 10ch; }
.cg-slip__lead { max-width: 40ch; color: color-mix(in srgb, var(--color-film) 72%, var(--color-flash)); }
.cg-slip__rows { display: grid; border-top: 1px dashed color-mix(in srgb, var(--color-film) 30%, transparent); }
.cg-slip__rows > div { display: flex; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px dashed color-mix(in srgb, var(--color-film) 30%, transparent); }
.cg-slip__rows dt { color: color-mix(in srgb, var(--color-film) 66%, var(--color-flash)); }
.cg-slip__rows dd { font-weight: 500; text-align: right; }
.cg-slip__keep { position: absolute; top: clamp(48px, 6vw, 64px); right: clamp(16px, 2.4vw, 28px); display: grid; place-items: center; width: 120px; height: 60px; font: 900 30px/1 var(--font-display); text-transform: uppercase; letter-spacing: 0.04em; transform: rotate(-7deg); }
.cg-slip__keep svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.cg-slip__keep path { fill: none; stroke: var(--color-grease); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.cg-slip .cg-link { justify-self: start; color: var(--color-film); }

/* ───────────── Footer ───────────── */

.cg-footer { position: relative; z-index: 1; overflow: clip; padding-bottom: 28px; border-top: 1px solid var(--cg-line); }
.cg-footer__edge { padding-block: 18px; border-bottom: 1px solid var(--cg-line); font: 500 clamp(12px, 1.2vw, 15px)/1 var(--font-mono); letter-spacing: 0.22em; text-transform: uppercase; color: var(--cg-muted); }
.cg-footer__tick { margin-inline: 22px; color: var(--color-grease); }
.cg-footer__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; padding-block: 64px 48px; }
.cg-footer__col { display: grid; gap: 12px; align-content: start; font-size: 15px; color: var(--cg-muted); }
.cg-footer__col > .cg-mono { color: var(--color-flash); }
.cg-footer__col ul { display: grid; gap: 8px; }
.cg-footer__col strong { color: var(--color-flash); font-weight: 600; }
.cg-footer__links a { position: relative; color: var(--color-flash); }
.cg-footer__base { display: grid; gap: 18px; }
.cg-footer__word { display: flex; align-items: center; gap: clamp(10px, 2vw, 26px); font: 900 clamp(4.4rem, 15.5vw, 15rem)/0.8 var(--font-display); text-transform: uppercase; letter-spacing: -0.01em; }
.cg-footer__mark { width: 0.56em; height: 0.56em; flex: none; }
.cg-footer__legal { color: var(--cg-muted); }

.cg-marquee { overflow: clip; }
.cg-marquee__track { display: flex; width: max-content; }
.cg-marquee__group { display: flex; align-items: center; padding-right: 22px; white-space: nowrap; }

/* ───────────── Motion (only when motion is welcome) ───────────── */

@media (prefers-reduced-motion: no-preference) {
  .cg-grain { animation: cg-grain 1.4s steps(5) 1.1s infinite; }
  .cg-strobe--sheet { animation: cg-strobe-load 620ms var(--ease-strobe) backwards; }
  .cg-header__inner > * { animation: cg-drop var(--dur-slow) var(--ease-out-expo) both; }
  .cg-header__inner > :nth-child(1) { animation-delay: 150ms; }
  .cg-header__inner > :nth-child(2) { animation-delay: 200ms; }
  .cg-header__inner > :nth-child(3) { animation-delay: 250ms; }
  .cg-header__inner > :nth-child(4), .cg-header__inner > :nth-child(5) { animation-delay: 300ms; }
  .cg-load .cg-split__inner { animation: cg-rise-mask var(--dur-hero) var(--ease-out-expo) both; animation-delay: calc(var(--split-delay, 0ms) + var(--line) * 110ms); }
  .cg-load__item { animation: cg-rise var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(560ms + var(--i) * 90ms); }
  .cg-load__board .cg-board { animation: cg-wipe-up 1000ms var(--ease-in-out) 620ms both; }
  .cg-load__board .cg-strip { animation: cg-slide-l var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(760ms + var(--s) * 120ms); }
  .cg-load__board .cg-strip:nth-child(2) { animation-name: cg-slide-r; }
  .cg-dot { animation: cg-blink 2.4s ease-in-out 1.4s infinite; }

  [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="rise"][data-in="false"] { opacity: 0; transform: translateY(var(--reveal-shift)); }
  [data-reveal="slide"][data-in="false"] { opacity: 0; transform: translateX(-28px); }
  [data-reveal="scale"][data-in="false"] { opacity: 0; transform: translateY(40px) scale(0.95); }
  [data-reveal="draw"][data-in="false"] { transform: scaleX(0); }
  [data-reveal] .cg-split__inner { transition: transform var(--dur-hero) var(--ease-out-expo); transition-delay: calc(120ms + var(--line) * 100ms); }
  [data-reveal][data-in="false"] .cg-split__inner { transform: translateY(110%); }
  /* Wipe and focus-pull act on the child, so the observed element is never fully clipped. */
  [data-reveal="wipe"] > * { transition: clip-path var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="wipe"][data-in="false"] > * { clip-path: inset(100% 0 0 0 round var(--cg-r)); }
  [data-reveal="focus"] > * { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-hero) var(--ease-out-expo), filter var(--dur-slow) var(--ease-out); transition-delay: calc(var(--i, 0) * 110ms); }
  [data-reveal="focus"][data-in="false"] > * { opacity: 0; transform: scale(1.1); filter: blur(10px); }
  .cg-field[data-shake="0"] input, .cg-field[data-shake="0"] select, .cg-roles[data-shake="0"] .cg-roles__list { animation: cg-shake-a 300ms var(--ease-out) both; }
  .cg-field[data-shake="1"] input, .cg-field[data-shake="1"] select, .cg-roles[data-shake="1"] .cg-roles__list { animation: cg-shake-b 300ms var(--ease-out) both; }
  .cg-field__error:not(:empty) { animation: cg-error-in var(--dur-base) var(--ease-out-expo) both; }
  .cg-submit__busy i { animation: cg-pulse 700ms ease-in-out infinite; }
  .cg-bag__count[data-pop] { animation: cg-pop var(--dur-base) var(--ease-out-expo); }
  .cg-bag__panel[data-open="true"] { animation: cg-panel var(--dur-base) var(--ease-out-expo) both; }
  .cg-slip { animation: cg-develop var(--dur-hero) var(--ease-out) both; }
  .cg-slip__rows > div { animation: cg-print var(--dur-base) var(--ease-out-expo) both; animation-delay: calc(420ms + var(--i) * 90ms); }
  .cg-slip__keep path { animation: cg-draw 700ms var(--ease-in-out) 1100ms both; }
  .cg-marquee__track { animation: cg-marquee 46s linear infinite; animation-play-state: paused; }
  .cg-marquee[data-play="true"] .cg-marquee__track { animation-play-state: running; }
  .cg-marquee:hover .cg-marquee__track, .cg-marquee:focus-within .cg-marquee__track { animation-play-state: paused; }

  /* The shop opens from a framed print to full bleed as it enters (scroll-driven where supported). */
  @supports (animation-timeline: view()) {
    .cg-shop { animation: cg-shop-open linear both; animation-timeline: view(); animation-range: entry 0% entry 70%; }
  }
}

@keyframes cg-grain { 0% { transform: translate(0, 0); } 20% { transform: translate(-3%, 2%); } 40% { transform: translate(2%, -3%); } 60% { transform: translate(-2%, -1%); } 80% { transform: translate(3%, 3%); } 100% { transform: translate(0, 0); } }
@keyframes cg-strobe-load { from { opacity: 0.92; } to { opacity: 0; } }
@keyframes cg-drop { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
@keyframes cg-rise-mask { from { transform: translateY(110%); } to { transform: none; } }
@keyframes cg-rise { from { opacity: 0; transform: translateY(var(--reveal-shift)); } to { opacity: 1; transform: none; } }
@keyframes cg-wipe-up { from { clip-path: inset(100% 0 0 0 round var(--cg-r)); } to { clip-path: inset(0 0 0 0 round var(--cg-r)); } }
@keyframes cg-slide-l { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: none; } }
@keyframes cg-slide-r { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: none; } }
@keyframes cg-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes cg-shake-a { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
@keyframes cg-shake-b { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-3px); } }
@keyframes cg-error-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@keyframes cg-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.6); } }
@keyframes cg-pop { 0% { transform: scale(1); } 40% { transform: scale(1.45); } 100% { transform: scale(1); } }
@keyframes cg-panel { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes cg-develop { 0% { opacity: 0; clip-path: inset(0 0 100% 0); } 60% { opacity: 1; } 100% { opacity: 1; clip-path: inset(0); } }
@keyframes cg-print { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
@keyframes cg-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes cg-marquee { to { transform: translateX(-50%); } }
@keyframes cg-shop-open { from { clip-path: inset(7% 3% 0 3% round 10px); } to { clip-path: inset(0 0 0 0 round 0px); } }
@keyframes cg-menu-open { from { clip-path: circle(0 at calc(100% - 38px) -30px); } to { clip-path: circle(150% at calc(100% - 38px) -30px); } }

/* ───────────── Hover (fine pointers only) ───────────── */

@media (hover: hover) and (pointer: fine) {
  .cg-button:hover .cg-button__fill { clip-path: inset(0); }
  .cg-button--solid:hover { color: var(--color-flash); }
  .cg-button--line:hover, .cg-button--ink:hover:not(:disabled) { color: var(--color-film); }
  .cg-button--ink:disabled .cg-button__fill { clip-path: inset(100% 0 0 0); }
  .cg-button:hover .cg-button__roll > span:first-child { transform: translateY(-115%); }
  .cg-button:hover .cg-button__roll > span + span { transform: none; }
  .cg-link:hover::after, .cg-footer__links a:hover::after { transform: scaleX(1); transform-origin: left; }
  .cg-frame:hover .cg-frame__img { transform: scale(1.04); }
  .cg-frame:hover .cg-frame__img::after { opacity: 0.08; }
  .cg-look__detail:hover { transform: translateY(-6px); }
  .cg-cloth__card:hover .cg-cloth__img > * { transform: scale(1.06); }
  .cg-cloth__card:hover .cg-cloth__caption { transform: translateY(-4px); }
  .cg-arrow:hover:not(:disabled) { background: var(--color-flash); color: var(--color-film); }
  .cg-product__media:hover .cg-product__model { clip-path: inset(0); }
  .cg-product__media:hover .cg-product__flat { transform: scale(1.04); }
  .cg-size:hover input:not(:disabled) + span { border-color: var(--color-film); }
  .cg-chip:hover span { border-color: var(--color-flash); }
  .cg-bag__button:hover { background: transparent; box-shadow: inset 0 0 0 1px currentColor; }
  .cg-logo:hover .cg-mark__loop { animation: cg-draw 600ms var(--ease-in-out); }
}

/* ───────────── Responsive ───────────── */

@media (max-width: 1080px) {
  .cg-header__nav, .cg-header__counter { display: none; }
  .cg-bag { margin-left: auto; }
  .cg-header__toggle { display: inline-flex; }
  .cg-header[data-menu="open"] .cg-menu { animation: cg-menu-open var(--dur-slow) var(--ease-in-out) both; }
  .cg-header[data-menu="open"] .cg-menu nav > a { animation: cg-rise var(--dur-slow) var(--ease-out-expo) both; animation-delay: calc(160ms + var(--i) * 50ms); }
}

@media (max-width: 1023px) {
  .cg-sheet__grid { grid-template-columns: minmax(0, 1fr); }
  .cg-sheet__copy, .cg-sheet__board { grid-column: 1 / -1; }
  .cg-sheet__board { justify-self: center; }
  .cg-cloth__intro, .cg-cloth__count, .cg-request__copy, .cg-request__form { grid-column: 1 / -1; }
  .cg-cloth__count { justify-self: start; text-align: left; }
  .cg-shop__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cg-footer__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: portrait) {
    .cg-sheet__stage { padding-top: calc(var(--cg-header) + 10px); padding-bottom: 14px; }
    /* The board is anchored to the bottom of the stage, so font swaps in the copy never move it. */
    .cg-sheet__grid { grid-template-rows: minmax(0, 1fr) auto; row-gap: 14px; align-items: start; }
    .cg-sheet__copy { align-self: start; gap: 14px; }
    .cg-sheet__board { align-self: end; width: min(100%, calc(100svh - var(--cg-header) - 380px) * 1.15); }
    .cg-sheet__cue-hint { display: none; }
  }
  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: landscape) {
    .cg-sheet__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); }
    .cg-sheet__copy { grid-column: 1 / span 5; }
    .cg-sheet__board { grid-column: 6 / span 7; }
  }
}

@media (max-width: 640px) {
  body { font-size: 15.5px; }
  .cg-sheet__title { font-size: clamp(3.4rem, 17vw, 5rem); }
  .cg-sheet__lead { font-size: 15px; }
  .cg-sheet__actions .cg-button { min-height: 44px; padding: 0 14px; font-size: 11px; }
  .cg-board__head span:nth-child(3) { display: none; }
  .cg-look__rail { display: none; }
  .cg-look__name { font-size: clamp(3.4rem, 18vw, 5rem); }
  .cg-look__spec { gap: 6px 18px; font-size: 14px; }
  .cg-look__note { font-size: 14.5px; max-width: 30ch; }
  .cg-look__detail { top: calc(var(--cg-header) + 16px); bottom: auto; width: 34vw; }
  .cg-look__detail figcaption { display: none; }
  .cg-shop__grid { grid-template-columns: minmax(0, 1fr); }
  .cg-form__row { grid-template-columns: minmax(0, 1fr); }
  .cg-submit { width: 100%; }
  .cg-footer__grid { grid-template-columns: minmax(0, 1fr); }
  .cg-cloth__controls { display: none; }

  @media (prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px) and (orientation: portrait) {
    .cg-sheet__title { font-size: clamp(3.2rem, 16vw, 4.4rem); }
    .cg-sheet__lead { font-size: 14.5px; line-height: 1.45; }
    .cg-sheet__board { width: min(100%, calc(100svh - var(--cg-header) - 360px) * 1.15); }
  }
}

/* Reduced motion: finished, not stripped. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }
  .cg-magnetic { transform: none; }
  .cg-grain { display: none; }
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#0C0C0B"/>
  <rect x="9" y="9" width="14" height="14" rx="1" fill="none" stroke="#F4F3EF" stroke-width="2.4"/>
  <path d="M16 4.5c7.2-.4 12.4 4.2 11.6 11.4-.7 6.6-6.2 11.4-12.6 11.1C8.8 26.7 4.3 21.6 4.6 15.2 4.9 9 10 4.9 17.8 5.6" fill="none" stroke="#F3C318" stroke-width="2.2" stroke-linecap="round"/>
</svg>
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CHINAGRAPH — Marked for keeps. Collection 07, Concrete Flash, AW26.";

const FILM = "#0C0C0B";
const FLASH = "#F4F3EF";
const GREASE = "#F3C318";

const SELECTS = [2, 4, 5, 7, 10, 12];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: FILM, color: FLASH, padding: "52px 60px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>Chinagraph</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.84, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
            <span>Marked</span>
            <span>for keeps.</span>
          </div>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.16em", color: GREASE }}>COLLECTION 07 · CONCRETE FLASH · AW26</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginLeft: "auto", padding: 22, backgroundColor: FLASH, borderRadius: 6 }}>
          {[0, 1, 2].map((strip) => (
            <div key={strip} style={{ display: "flex", gap: 10, padding: "16px 12px", backgroundColor: FILM }}>
              {[1, 2, 3, 4].map((col) => {
                const n = strip * 4 + col;
                const selected = SELECTS.includes(n);
                const exposure = 0.16 + ((n * 37) % 30) / 100;
                return (
                  <div key={n} style={{ display: "flex", position: "relative", width: 104, height: 104, backgroundColor: FILM, border: selected ? `4px solid ${GREASE}` : `4px solid ${FILM}`, borderRadius: selected ? 52 : 0, overflow: "hidden" }}>
                    <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: FLASH, opacity: exposure }} />
                    <div style={{ display: "flex", position: "absolute", bottom: 6, left: 8, fontSize: 13, color: FLASH }}>{n}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/page.tsx">
<![CDATA[import { SmoothScroll } from "./motion/SmoothScroll";
import { Cloth } from "./sections/Cloth";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Looks } from "./sections/Looks";
import { Request } from "./sections/Request";
import { Sheet } from "./sections/Sheet";
import { Shop } from "./sections/Shop";

export default function ChinagraphPage() {
  return (
    <div className="cg-shell" id="top">
      <a href="#main" className="cg-skip">Skip to content</a>
      <SmoothScroll />
      <span className="cg-grain" aria-hidden="true" />
      <Header />
      <main id="main" className="cg-main">
        <Sheet />
        <Looks />
        <Cloth />
        <Shop />
        <Request />
      </main>
      <Footer />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/brand/Logo.tsx">
<![CDATA[/** The mark: one film frame with a grease-pencil loop drawn round it, the way an editor marks a select. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="14" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path className="cg-mark__loop" d="M16 4.5c7.2-.4 12.4 4.2 11.6 11.4-.7 6.6-6.2 11.4-12.6 11.1C8.8 26.7 4.3 21.6 4.6 15.2 4.9 9 10 4.9 17.8 5.6" fill="none" stroke="var(--color-grease)" strokeWidth="2.2" strokeLinecap="round" pathLength={1} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`cg-logo ${className ?? ""}`}>
      <Mark className="cg-logo__mark" />
      <span className="cg-logo__word">Chinagraph</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/content/cloth.ts">
<![CDATA[export type Cloth = { id: string; image: string; name: string; origin: string; year: string; metres: number; alt: string };

/** Every metre is deadstock: mill ends, surplus and seconds that would otherwise be burnt. */
export const CLOTH: Cloth[] = [
  { id: "melton", image: "cloth-01", name: "Melton", origin: "Huddersfield", year: "1968", metres: 420, alt: "Macro of dense navy melton wool fibres under raking flash" },
  { id: "wax", image: "cloth-02", name: "Waxed cotton", origin: "Dundee", year: "1994", metres: 260, alt: "Macro of black waxed cotton with cracked wax highlights" },
  { id: "flannel", image: "cloth-03", name: "Flannel", origin: "Biella", year: "2011", metres: 300, alt: "Macro of charcoal flannel weave, soft brushed surface" },
  { id: "gabardine", image: "cloth-04", name: "Gabardine", origin: "Lancashire", year: "1979", metres: 160, alt: "Macro of rain-grey gabardine twill lines at a diagonal" },
];

export const STOCKISTS = [
  { city: "London", shop: "Chinagraph Studio, Hackney Wick", note: "By appointment, Thu–Sat" },
  { city: "Antwerp", shop: "Pastiche", note: "Kloosterstraat" },
  { city: "Copenhagen", shop: "Nørd Room", note: "Vesterbro" },
  { city: "Tokyo", shop: "Kōsha", note: "Daikanyama" },
];
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/content/looks.ts">
<![CDATA[export type Look = {
  n: number;
  frame: number;
  image: string;
  detail: string;
  name: string;
  cloth: string;
  origin: string;
  price: number;
  note: string;
  detailAlt: string;
};

/** The six selects, each a look. `image` is the roll frame, `detail` a close crop shot separately. */
export const LOOKS: Look[] = [
  { n: 1, frame: 2, image: "roll-02", detail: "detail-01", name: "Box Coat", cloth: "Navy melton, 680 g", origin: "Huddersfield mill end, 1968", price: 640, note: "Dropped shoulder, no lining, one button you'll never use.", detailAlt: "Close crop of navy melton lapel and a single horn button under flash" },
  { n: 2, frame: 4, image: "roll-04", detail: "detail-02", name: "Work Jacket", cloth: "Black waxed cotton", origin: "Dundee surplus, 1990s", price: 420, note: "Cropped at the hip, four pockets, rewaxed by hand.", detailAlt: "Close crop of black waxed cotton creasing at a chest pocket, flash catching the wax" },
  { n: 3, frame: 5, image: "roll-05", detail: "detail-03", name: "Pleat Trouser", cloth: "Charcoal flannel", origin: "Biella offcuts", price: 290, note: "Two deep pleats, a wide leg and a hem that breaks once.", detailAlt: "Close crop of charcoal flannel pleats in motion, wet tarmac below" },
  { n: 4, frame: 7, image: "roll-07", detail: "detail-04", name: "Rollneck", cloth: "Bone boiled wool", origin: "Scottish yarn ends", price: 260, note: "Boiled until it barely moves. Wears like a jacket.", detailAlt: "Close crop of bone boiled-wool rollneck texture against corrugated metal" },
  { n: 5, frame: 10, image: "roll-10", detail: "detail-05", name: "DB Suit", cloth: "Rain-grey gabardine", origin: "Lancashire deadstock", price: 980, note: "Six-on-two, soft shoulder, trousers cut to sit on the shoe.", detailAlt: "Close crop of double-breasted gabardine buttons and a peak lapel" },
  { n: 6, frame: 12, image: "roll-12", detail: "detail-06", name: "Car Coat", cloth: "Oxblood leather offcuts", origin: "Northampton tannery seconds", price: 1120, note: "Pieced from offcuts, so no two have the same seams.", detailAlt: "Close crop of oxblood leather panels meeting at a seam, hard flash" },
];
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/content/media.ts">
<![CDATA[/**
 * Every generated still the page uses: drop files with these names (any of png/jpg/webp) into
 * assets/incoming/chinagraph/, run `npm run images -- chinagraph`, and the placeholders turn into photographs.
 * Prompts: docs/image-prompts/chinagraph.md.
 */
export const IMAGE_KEYS = [
  ...Array.from({ length: 12 }, (_, i) => `roll-${String(i + 1).padStart(2, "0")}`), // 1:1, the contact sheet + the six looks
  ...Array.from({ length: 6 }, (_, i) => `detail-${String(i + 1).padStart(2, "0")}`), // 4:5, a close crop per look
  ...Array.from({ length: 4 }, (_, i) => `cloth-${String(i + 1).padStart(2, "0")}`), // 4:5, fabric macros
  ...Array.from({ length: 6 }, (_, i) => `flat-${String(i + 1).padStart(2, "0")}`), // 4:5, flat lays for the shop
];
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/content/products.ts">
<![CDATA[export type Size = { label: string; soldOut?: boolean };

export type Product = { sku: string; look: number; name: string; price: number; flat: string; flatAlt: string; sizes: Size[]; left: number };

const TAILORED: Size[] = [{ label: "44" }, { label: "46" }, { label: "48" }, { label: "50" }, { label: "52" }];
const LETTERED: Size[] = [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }];

/** Every look, sold. `flat` is a flat-lay still; the card swaps to the look's roll frame on hover. */
export const PRODUCTS: Product[] = [
  { sku: "CG-01", look: 1, name: "Box Coat, navy melton", price: 640, flat: "flat-01", flatAlt: "Navy melton box coat laid flat on bare concrete", sizes: TAILORED.map((s) => (s.label === "44" ? { ...s, soldOut: true } : s)), left: 23 },
  { sku: "CG-02", look: 2, name: "Work Jacket, black wax", price: 420, flat: "flat-02", flatAlt: "Black waxed-cotton work jacket laid flat on concrete", sizes: LETTERED, left: 31 },
  { sku: "CG-03", look: 3, name: "Pleat Trouser, charcoal", price: 290, flat: "flat-03", flatAlt: "Charcoal flannel pleated trousers folded on concrete", sizes: [{ label: "28" }, { label: "30" }, { label: "32", soldOut: true }, { label: "34" }, { label: "36" }], left: 18 },
  { sku: "CG-04", look: 4, name: "Rollneck, bone", price: 260, flat: "flat-04", flatAlt: "Bone boiled-wool rollneck folded on concrete", sizes: LETTERED.map((s) => (s.label === "M" ? { ...s, soldOut: true } : s)), left: 12 },
  { sku: "CG-05", look: 5, name: "DB Suit, rain grey", price: 980, flat: "flat-05", flatAlt: "Rain-grey gabardine double-breasted suit laid flat on concrete", sizes: TAILORED, left: 9 },
  { sku: "CG-06", look: 6, name: "Car Coat, oxblood", price: 1120, flat: "flat-06", flatAlt: "Oxblood pieced-leather car coat laid flat on concrete", sizes: [{ label: "46" }, { label: "48", soldOut: true }, { label: "50" }], left: 4 },
];

export const PRICES: Record<string, number> = Object.fromEntries(PRODUCTS.map((p) => [p.sku, p.price]));
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/forms/KeepSlip.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { ROLES, type SheetRequest } from "./validation";

/** Success: a print slip for the posted contact sheet, with KEEP looped in grease pencil. */
export function KeepSlip({ request, number, onEdit }: { request: SheetRequest; number: string; onEdit: () => void }) {
  const rows = [
    { k: "Run number", v: `No. ${number}` },
    { k: "Posted to", v: `${request.name.trim()}, ${request.city.trim()}` },
    { k: "Country", v: request.country },
    { k: "For", v: ROLES.find((role) => role.id === request.role)?.label ?? "" },
    { k: "Format", v: "A2 sheet, fibre paper, folded twice" },
  ];
  return (
    <div className="cg-slip" tabIndex={-1} data-slip>
      <p className="cg-mono cg-slip__head"><span>Print slip</span><span>Roll 07</span></p>
      <h3 className="cg-slip__title">It&apos;s on the drying line.</h3>
      <p className="cg-slip__lead">Your sheet goes out with the next post. We&apos;ll email {request.email.trim()} when it ships.</p>
      <dl className="cg-slip__rows">
        {rows.map((row, i) => (
          <div key={row.k} style={{ "--i": i } as CSSProperties}>
            <dt className="cg-mono">{row.k}</dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>
      <span className="cg-slip__keep" aria-hidden="true">
        Keep
        <svg viewBox="0 0 120 60" focusable="false"><path d="M62 6C92 4 115 15 114 31c-1 15-25 25-55 24C30 54 6 45 6 30 6 16 30 6 70 8" pathLength={1} /></svg>
      </span>
      <button type="button" className="cg-link" onClick={onEdit}>Change the address</button>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/forms/SheetRequestForm.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { KeepSlip } from "./KeepSlip";
import { COUNTRIES, EMPTY_REQUEST, ROLES, sheetNumber, validateRequest, type RequestErrors, type SheetRequest } from "./validation";

type Phase = "idle" | "sending" | "done";
const ORDER: (keyof SheetRequest)[] = ["name", "email", "street", "city", "country", "role"];

/** Request the printed contact sheet. Validates locally and "posts" without a network request. */
export function SheetRequestForm() {
  const [request, setRequest] = useState<SheetRequest>(EMPTY_REQUEST);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);
  const slipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (phase !== "sending") return;
    const timer = window.setTimeout(() => setPhase("done"), 1000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") slipRef.current?.querySelector<HTMLElement>("[data-slip]")?.focus({ preventScroll: true });
  }, [phase]);

  const set = <K extends keyof SheetRequest>(key: K, value: SheetRequest[K]) => {
    setRequest((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const next = validateRequest(request);
    setErrors(next);
    const first = ORDER.find((key) => next[key]);
    if (first) {
      setShake((n) => n + 1);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select`)?.focus();
      return;
    }
    setPhase("sending");
  };

  const field = (key: keyof SheetRequest) => ({ "data-field": key, "data-invalid": errors[key] ? "true" : undefined, "data-shake": errors[key] ? shake % 2 : undefined });
  const describe = (key: keyof SheetRequest) => (errors[key] ? `cg-err-${key}` : undefined);
  const error = (key: keyof SheetRequest) => <p className="cg-field__error" id={`cg-err-${key}`} role={errors[key] ? "alert" : undefined}>{errors[key]}</p>;

  if (phase === "done") {
    return (
      <div ref={slipRef} className="cg-form-card" data-phase="done">
        <KeepSlip request={request} number={sheetNumber(request)} onEdit={() => setPhase("idle")} />
      </div>
    );
  }

  return (
    <div className="cg-form-card" data-phase={phase}>
      <form ref={formRef} className="cg-form" noValidate onSubmit={onSubmit} aria-describedby="cg-form-note">
        <div className="cg-form__row">
          <div className="cg-field" {...field("name")}>
            <input id="cg-name" autoComplete="name" placeholder=" " value={request.name} onChange={(e) => set("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={describe("name")} />
            <label htmlFor="cg-name">Name</label>
            {error("name")}
          </div>
          <div className="cg-field" {...field("email")}>
            <input id="cg-email" type="email" autoComplete="email" placeholder=" " value={request.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describe("email")} />
            <label htmlFor="cg-email">Email</label>
            {error("email")}
          </div>
        </div>
        <div className="cg-field" {...field("street")}>
          <input id="cg-street" autoComplete="street-address" placeholder=" " value={request.street} onChange={(e) => set("street", e.target.value)} aria-invalid={errors.street ? true : undefined} aria-describedby={describe("street")} />
          <label htmlFor="cg-street">Street address</label>
          {error("street")}
        </div>
        <div className="cg-form__row">
          <div className="cg-field" {...field("city")}>
            <input id="cg-city" autoComplete="address-level2" placeholder=" " value={request.city} onChange={(e) => set("city", e.target.value)} aria-invalid={errors.city ? true : undefined} aria-describedby={describe("city")} />
            <label htmlFor="cg-city">City</label>
            {error("city")}
          </div>
          <div className="cg-field cg-field--select" {...field("country")}>
            <select id="cg-country" autoComplete="country-name" value={request.country} onChange={(e) => set("country", e.target.value)} aria-invalid={errors.country ? true : undefined} aria-describedby={describe("country")} data-filled={request.country ? "true" : "false"}>
              <option value="" disabled hidden />
              {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            <label htmlFor="cg-country">Country</label>
            {error("country")}
          </div>
        </div>
        <fieldset className="cg-roles" {...field("role")} aria-describedby={describe("role")}>
          <legend className="cg-mono">Who is it for?</legend>
          <div className="cg-roles__list">
            {ROLES.map((role) => (
              <label key={role.id} className="cg-chip">
                <input type="radio" name="role" value={role.id} checked={request.role === role.id} onChange={() => set("role", role.id)} />
                <span>{role.label}</span>
              </label>
            ))}
          </div>
          {error("role")}
        </fieldset>
        <div className="cg-form__foot">
          <button type="submit" className="cg-button cg-button--solid cg-submit" data-state={phase} disabled={phase === "sending"}>
            <span className="cg-button__fill" aria-hidden="true" />
            <span className="cg-submit__label">Post me the sheet</span>
            <span className="cg-submit__busy" aria-hidden="true"><i />Exposing</span>
          </button>
          <p id="cg-form-note" className="cg-form__note">Free, while the run of 400 lasts. This demo form doesn&apos;t send anything.</p>
        </div>
        <p className="cg-sr" aria-live="polite">{phase === "sending" ? "Exposing the sheet" : ""}</p>
      </form>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/forms/validation.ts">
<![CDATA[export type Role = "customer" | "stockist" | "press";

export type SheetRequest = { name: string; email: string; street: string; city: string; country: string; role: Role | "" };
export type RequestErrors = Partial<Record<keyof SheetRequest, string>>;

export const EMPTY_REQUEST: SheetRequest = { name: "", email: "", street: "", city: "", country: "", role: "" };

export const ROLES: { id: Role; label: string }[] = [
  { id: "customer", label: "I wear it" },
  { id: "stockist", label: "I stock it" },
  { id: "press", label: "I write about it" },
];

export const COUNTRIES = ["United Kingdom", "Ireland", "France", "Belgium", "Netherlands", "Germany", "Denmark", "Japan", "United States", "Elsewhere"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRequest(request: SheetRequest): RequestErrors {
  const errors: RequestErrors = {};
  if (request.name.trim().length < 2) errors.name = "Who should we address it to?";
  if (!EMAIL.test(request.email.trim())) errors.email = "That email won't reach us.";
  if (request.street.trim().length < 3) errors.street = "We post it, so we need a street.";
  if (request.city.trim().length < 2) errors.city = "Which city?";
  if (!request.country) errors.country = "Pick a country.";
  if (!request.role) errors.role = "Tell us who it's for.";
  return errors;
}

/** The printed sheet's run number: a stable four-digit number from the request. */
export function sheetNumber(request: SheetRequest): string {
  const seed = `${request.email.trim().toLowerCase()}|${request.city.trim().toLowerCase()}`;
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return String(hash % 10000).padStart(4, "0");
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/looks/Look.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Picture } from "../assets";
import type { Look as LookData } from "../content/looks";
import { formatGBP } from "../shop/bag";
import { FRAMES } from "../sheet/roll";

const pad = (n: number) => String(n).padStart(2, "0");

/** One select, full bleed: the frame, a rail showing where it sits on the roll, the garment, and a close crop. */
export function Look({ look, index }: { look: LookData; index: number }) {
  const frame = FRAMES[look.frame - 1];
  return (
    <article id={`look-${pad(look.n)}`} className="cg-look" data-look={index} aria-labelledby={`cg-look-${look.n}`} style={{ "--i": index } as CSSProperties}>
      <div className="cg-look__media">
        <Picture assetKey={look.image} alt={frame.alt} sizes="100vw" />
      </div>
      <span className="cg-look__shade" aria-hidden="true" />
      <span className="cg-strobe cg-strobe--look" aria-hidden="true" />

      <ol className="cg-look__rail" aria-label={`Frame ${look.frame} of 12 on the roll`}>
        {FRAMES.map((f) => (
          <li key={f.n} data-here={f.n === look.frame ? "true" : undefined} data-select={f.select ? "true" : undefined}>
            <span className="cg-sr">{f.n === look.frame ? `Frame ${f.n}, this look` : `Frame ${f.n}`}</span>
          </li>
        ))}
      </ol>

      <div className="cg-container cg-look__info">
        <p className="cg-mono cg-look__meta">Look {pad(look.n)} · Frame {pad(look.frame)} / 12</p>
        <h2 id={`cg-look-${look.n}`} className="cg-look__name">{look.name}</h2>
        <dl className="cg-look__spec">
          <div><dt className="cg-mono">Cloth</dt><dd>{look.cloth}</dd></div>
          <div><dt className="cg-mono">From</dt><dd>{look.origin}</dd></div>
          <div><dt className="cg-mono">Price</dt><dd>{formatGBP(look.price)}</dd></div>
        </dl>
        <p className="cg-look__note">{look.note}</p>
        <a className="cg-button cg-button--solid cg-look__cta" href={`#product-cg-${pad(look.n)}`}>
          <span className="cg-button__fill" aria-hidden="true" />
          <span className="cg-button__roll"><span>Shop the {look.name}</span><span aria-hidden="true">Shop the {look.name}</span></span>
        </a>
      </div>

      <figure className="cg-look__detail">
        <span className="cg-look__detail-img">
          <Picture assetKey={look.detail} alt={look.detailAlt} sizes="(min-width: 900px) 18vw, 40vw" />
        </span>
        <figcaption className="cg-mono">Detail · {look.cloth}</figcaption>
      </figure>
    </article>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/looks/LookStack.tsx">
<![CDATA["use client";

import { useEffect, useRef, type ReactNode } from "react";
import { segment } from "../motion/math";
import { LIVE_QUERY } from "../sheet/SheetController";
import { LOOKS } from "../content/looks";
import { activeLook, lookArrivals, lookFlash } from "./stack";

/** Look 1 holds for one viewport while the sheet scrolls off it, then each look slides over the last. */
const LEAD = 1;

/**
 * The looks' one client leaf: one rAF per scroll writes --arrive, --leave, --flash and --detail on each
 * sticky look, and the header's frame counter while the looks are on screen.
 */
export function LookStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    const looks = [...root.querySelectorAll<HTMLElement>(".cg-look")];
    const counters = () => document.querySelectorAll<HTMLElement>("[data-frame-counter]");
    let top = 0;
    let frame = 0;
    let active = false;
    let current = -1;
    let label = "";

    const measure = () => { top = root.getBoundingClientRect().top + window.scrollY; };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const arrivals = lookArrivals(y, top, vh, looks.length, LEAD);
      looks.forEach((look, i) => {
        const arrive = arrivals[i];
        const detail = i === 0 ? segment(y, top - vh * 0.1, top + vh * 0.45) : segment(arrive, 0.72, 1);
        look.style.setProperty("--arrive", arrive.toFixed(4));
        look.style.setProperty("--leave", (arrivals[i + 1] ?? 0).toFixed(4));
        look.style.setProperty("--flash", (i === 0 ? 0 : lookFlash(arrive)).toFixed(3));
        look.style.setProperty("--detail", detail.toFixed(4));
      });
      const index = activeLook(arrivals);
      if (index !== current) {
        current = index;
        root.dataset.active = String(index);
      }
      if (y >= top - 2) {
        const next = `Frame ${String(LOOKS[index].frame).padStart(2, "0")} / 12`;
        if (next !== label) {
          label = next;
          counters().forEach((node) => { node.textContent = next; });
        }
      } else {
        label = "";
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };
    const start = () => {
      active = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      looks.forEach((look) => ["--arrive", "--leave", "--flash", "--detail"].forEach((name) => look.style.removeProperty(name)));
    };
    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };
    sync();
    media.addEventListener("change", onMediaChange);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    const settle = window.setTimeout(onResize, 1800);
    return () => {
      window.clearTimeout(settle);
      stop();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  return <div ref={ref} className="cg-looks__stack" data-active="0">{children}</div>;
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/looks/stack.ts">
<![CDATA[import { flashCurve, segment } from "../motion/math";

/** The strobe as a look lands: peaks just before full arrival, dark again at 1 (where arrival clamps). */
export function lookFlash(arrive: number): number {
  return flashCurve(arrive, 0.8, 1);
}

/**
 * Arrival (0–1) of each sticky look. Look 0 is already full screen (the sheet enlarged into it);
 * every later look slides up over the previous one during one viewport of scroll.
 */
export function lookArrivals(scrollY: number, containerTop: number, viewportHeight: number, count: number, lead = 0): number[] {
  return Array.from({ length: count }, (_, i) => {
    if (i === 0 || viewportHeight <= 0) return 1;
    const start = containerTop + (i - 1 + lead) * viewportHeight;
    return segment(scrollY, start, start + viewportHeight);
  });
}

/** The look that covers most of the screen. */
export function activeLook(arrivals: number[]): number {
  let active = 0;
  arrivals.forEach((arrival, index) => { if (arrival >= 0.5) active = index; });
  return active;
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/CountUp.tsx">
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
    <span ref={ref} className={`cg-count ${className ?? ""}`}>
      <span ref={shown} aria-hidden="true">{format(value, decimals, prefix, suffix)}</span>
      <span className="cg-sr">{format(value, decimals, prefix, suffix)}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/Magnetic.tsx">
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
      node.style.setProperty("--cg-mx", `${x.toFixed(2)}px`);
      node.style.setProperty("--cg-my", `${y.toFixed(2)}px`);
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

  return <span ref={ref} className="cg-magnetic">{children}</span>;
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/Marquee.tsx">
<![CDATA["use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/** A duplicated track translated by CSS. It runs only while in view and pauses on hover or focus. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "0px", threshold: 0 });
  return (
    <div ref={ref} className={`cg-marquee ${className ?? ""}`} data-play={inView ? "true" : "false"}>
      <div className="cg-marquee__track">
        <div className="cg-marquee__group">{children}</div>
        <div className="cg-marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/math.ts">
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

/** A strobe: 0 outside [start, end], rising linearly to 1 at the middle and falling back. */
export function flashCurve(value: number, start: number, end: number): number {
  if (value <= start || value >= end) return 0;
  const t = (value - start) / (end - start);
  return 1 - Math.abs(t * 2 - 1);
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/Reveal.tsx">
<![CDATA["use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealKind = "rise" | "mask" | "focus" | "draw" | "wipe" | "scale" | "slide";

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
    <file path="src/app/(chinagraph)/chinagraph/motion/SmoothScroll.tsx">
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
    <file path="src/app/(chinagraph)/chinagraph/motion/SplitText.tsx">
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
 * [data-in="true"] ancestor flips, or on load inside `.cg-load`. Screen readers get one plain string.
 */
export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const lines = children.split("\n");
  return (
    <span className={`cg-split ${className ?? ""}`} style={{ "--split-delay": `${delay}ms` } as CSSProperties}>
      <span className="cg-sr">{lines.join(" ")}</span>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`} className="cg-split__line" aria-hidden="true" style={{ "--line": index } as CSSProperties}>
          <span className="cg-split__inner">{line}</span>
        </span>
      ))}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/motion/useInView.ts">
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
    <file path="src/app/(chinagraph)/chinagraph/motion/useReducedMotion.ts">
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
    <file path="src/app/(chinagraph)/chinagraph/motion/useScrollVar.ts">
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
    <file path="src/app/(chinagraph)/chinagraph/sections/Cloth.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { CLOTH } from "../content/cloth";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { canHoverFinely } from "../motion/useReducedMotion";

const TOTAL = CLOTH.reduce((sum, cloth) => sum + cloth.metres, 0);

/** Fabric macros in a snap strip: native scroll on touch, drag and arrow buttons on fine pointers. */
export function Cloth() {
  const track = useRef<HTMLUListElement | null>(null);
  const [edge, setEdge] = useState<"start" | "middle" | "end">("start");

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const max = node.scrollWidth - node.clientWidth - 2;
      setEdge(node.scrollLeft <= 2 ? "start" : node.scrollLeft >= max ? "end" : "middle");
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    node.addEventListener("scroll", onScroll, { passive: true });
    read();

    if (!canHoverFinely()) return () => node.removeEventListener("scroll", onScroll);
    // Fine pointers can drag the strip; snapping resumes on release.
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    const down = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button")) return;
      dragging = true;
      startX = event.clientX;
      startScroll = node.scrollLeft;
      node.dataset.dragging = "true";
      node.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => { if (dragging) node.scrollLeft = startScroll - (event.clientX - startX); };
    const up = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete node.dataset.dragging;
      node.releasePointerCapture(event.pointerId);
    };
    node.addEventListener("pointerdown", down);
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerup", up);
    node.addEventListener("pointercancel", up);
    return () => {
      node.removeEventListener("scroll", onScroll);
      node.removeEventListener("pointerdown", down);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerup", up);
      node.removeEventListener("pointercancel", up);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const node = track.current;
    const card = node?.querySelector<HTMLElement>(".cg-cloth__card");
    if (!node || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="cloth" className="cg-section cg-cloth" aria-labelledby="cg-cloth-title">
      <div className="cg-container cg-cloth__head">
        <Reveal kind="rise" className="cg-cloth__intro">
          <p className="cg-eyebrow"><span>Cloth</span><span>All deadstock</span></p>
          <h2 id="cg-cloth-title" className="cg-h2"><SplitText>{"Cut from what\nwas left."}</SplitText></h2>
          <p className="cg-lead">Mill ends, army surplus and tannery seconds, bought by the roll before they were burnt. When a cloth runs out, so does the piece.</p>
        </Reveal>
        <Reveal kind="rise" className="cg-cloth__count" index={1}>
          <CountUp className="cg-cloth__metres" value={TOTAL} from={0} suffix=" m" duration={1400} />
          <p className="cg-mono">of deadstock in Collection 07</p>
        </Reveal>
      </div>
      <ul ref={track} className="cg-cloth__track" aria-label="Cloth in this collection">
        {CLOTH.map((cloth, index) => (
          <Reveal as="li" key={cloth.id} kind="focus" index={index} className="cg-cloth__card">
            <div className="cg-cloth__inner" style={{ "--i": index } as CSSProperties}>
              <span className="cg-cloth__img"><Picture assetKey={cloth.image} alt={cloth.alt} sizes="(min-width: 900px) 30vw, 78vw" /></span>
              <div className="cg-cloth__caption">
                <h3 className="cg-cloth__name">{cloth.name}</h3>
                <p className="cg-mono">{cloth.origin} · {cloth.year} · {cloth.metres} m</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <div className="cg-container cg-cloth__controls">
        <button type="button" className="cg-arrow" onClick={() => step(-1)} disabled={edge === "start"}><span aria-hidden="true">←</span><span className="cg-sr">Previous cloth</span></button>
        <button type="button" className="cg-arrow" onClick={() => step(1)} disabled={edge === "end"}><span aria-hidden="true">→</span><span className="cg-sr">Next cloth</span></button>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Footer.tsx">
<![CDATA[import { Fragment } from "react";
import { Mark } from "../brand/Logo";
import { STOCKISTS } from "../content/cloth";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";

const EDGE = ["Chinagraph 120", "Roll 07", "Concrete Flash", "AW26", "Safety film", "12 exp", "Pushed +1"];

export function Footer() {
  return (
    <footer className="cg-footer">
      <Marquee className="cg-footer__edge">
        {EDGE.map((word, index) => (
          <Fragment key={word}>
            <span>{word}</span>
            <span className="cg-footer__tick" aria-hidden="true">▸ {index * 2 + 1}A</span>
          </Fragment>
        ))}
      </Marquee>
      <div className="cg-container cg-footer__grid">
        <Reveal className="cg-footer__col" kind="rise" index={0}>
          <p className="cg-mono">Stockists</p>
          <ul>
            {STOCKISTS.map((stockist) => (
              <li key={stockist.city}><strong>{stockist.city}</strong> — {stockist.shop}<span className="cg-footer__note"> · {stockist.note}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="cg-footer__col" kind="rise" index={1}>
          <p className="cg-mono">This page</p>
          <ul className="cg-footer__links">
            <li><a href="#sheet">The contact sheet</a></li>
            <li><a href="#looks">Six looks</a></li>
            <li><a href="#cloth">Cloth</a></li>
            <li><a href="#shop">Shop</a></li>
            <li><a href="#request">Request the sheet</a></li>
          </ul>
        </Reveal>
        <Reveal className="cg-footer__col" kind="rise" index={2}>
          <p className="cg-mono">Small print</p>
          <p>Chinagraph is a fictional label made for a landing-page template. Photographs are AI-generated; no real people or brands are shown.</p>
        </Reveal>
      </div>
      <div className="cg-container cg-footer__base">
        <Reveal className="cg-footer__word" kind="mask">
          <Mark className="cg-footer__mark" />
          <span className="cg-split__line"><span className="cg-split__inner">Chinagraph</span></span>
        </Reveal>
        <p className="cg-mono cg-footer__legal">© 2026 Chinagraph, London · Marked for keeps.</p>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Header.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { BagButton } from "../shop/BagButton";
import { useLastAdded } from "../shop/store";

const LINKS = [
  { id: "sheet", label: "Sheet" },
  { id: "looks", label: "Looks" },
  { id: "cloth", label: "Cloth" },
  { id: "shop", label: "Shop" },
  { id: "request", label: "Request" },
] as const;

type HeaderState = "top" | "compact" | "hidden";

export function Header() {
  const [state, setState] = useState<HeaderState>("top");
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState<string>("sheet");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      setState((current) => (y < 24 ? "top" : delta > 6 && y > 400 ? "hidden" : delta < -6 ? "compact" : current === "top" ? "compact" : current));
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--cg-progress", Math.min(1, y / max).toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  // Adding to the bag brings the header back, so the count's pop is actually seen.
  const lastAdded = useLastAdded();
  useEffect(() => {
    if (lastAdded) setState((current) => (current === "hidden" ? "compact" : current));
  }, [lastAdded]);

  // Which section sits under the header: drives the active link and the light tone over the shop.
  useEffect(() => {
    const nodes = LINKS.map((link) => document.getElementById(link.id)).filter((node): node is HTMLElement => Boolean(node));
    const band = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit?.target.id) setActive(hit.target.id);
    }, { rootMargin: "-40% 0px -55% 0px" });
    nodes.forEach((node) => band.observe(node));
    const shop = document.getElementById("shop");
    const under = new IntersectionObserver(([entry]) => setTone(entry?.isIntersecting ? "light" : "dark"), { rootMargin: "0px 0px -94% 0px" });
    if (shop) under.observe(shop);
    return () => { band.disconnect(); under.disconnect(); };
  }, []);

  const place = useCallback((id: string | null) => {
    const link = id ? navRef.current?.querySelector<HTMLElement>(`[data-link="${id}"]`) : null;
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null);
  }, []);

  useEffect(() => {
    place(hovered ?? active);
    const onResize = () => place(hovered ?? active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, hovered, place]);

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
      event.preventDefault();
      items[event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  return (
    <header className="cg-header" data-state={menuOpen ? "compact" : state} data-tone={menuOpen ? "dark" : tone} data-menu={menuOpen ? "open" : "closed"}>
      <div className="cg-container cg-header__inner">
        <a className="cg-header__brand" href="#top" aria-label="Chinagraph, back to top"><Logo /></a>
        <p className="cg-header__counter cg-mono" aria-hidden="true"><span className="cg-dot" /> <span data-frame-counter>Frame 01 / 12</span></p>
        <nav ref={navRef} className="cg-header__nav" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {LINKS.map((link, index) => (
            <a key={link.id} data-link={link.id} className="cg-header__link" href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} onPointerEnter={() => setHovered(link.id)} onFocus={() => setHovered(link.id)} onBlur={() => setHovered(null)} style={{ "--i": index } as CSSProperties}>
              {link.label}
            </a>
          ))}
          <span className="cg-header__indicator" aria-hidden="true" data-visible={indicator ? "true" : "false"} style={indicator ? ({ "--x": `${indicator.x}px`, "--w": indicator.w } as CSSProperties) : undefined} />
        </nav>
        <BagButton />
        <button ref={toggleRef} type="button" className="cg-header__toggle" aria-expanded={menuOpen} aria-controls="cg-menu" onClick={() => setMenuOpen((open) => !open)}>
          <span className="cg-sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="cg-header__bars" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <span className="cg-header__progress" aria-hidden="true" />
      <div ref={panelRef} id="cg-menu" className="cg-menu" hidden={!menuOpen}>
        <nav aria-label="Menu">
          {LINKS.map((link, index) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} style={{ "--i": index } as CSSProperties}>
              <span className="cg-mono">{String(index + 1).padStart(2, "0")}</span>{link.label}
            </a>
          ))}
        </nav>
        <p className="cg-mono cg-menu__foot">Collection 07 · Concrete Flash · AW26</p>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Looks.tsx">
<![CDATA[import { LOOKS } from "../content/looks";
import { Look } from "../looks/Look";
import { LookStack } from "../looks/LookStack";

/** Six selects, six looks: sticky full-bleed frames that slide over one another. */
export function Looks() {
  return (
    <section id="looks" className="cg-looks" aria-label="The six looks">
      <LookStack>
        {LOOKS.map((look, index) => <Look key={look.n} look={look} index={index} />)}
      </LookStack>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Request.tsx">
<![CDATA[import { Picture } from "../assets";
import { SheetRequestForm } from "../forms/SheetRequestForm";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

export function Request() {
  return (
    <section id="request" className="cg-section cg-request" aria-labelledby="cg-request-title">
      <div className="cg-container cg-request__grid">
        <div className="cg-request__copy">
          <Reveal kind="rise">
            <p className="cg-eyebrow"><span>Request</span><span>Run of 400</span></p>
            <h2 id="cg-request-title" className="cg-h2"><SplitText>{"Get the sheet\nin the post."}</SplitText></h2>
            <p className="cg-lead">The whole roll, printed as an A2 contact sheet on fibre paper, with our marks on it. Free for customers, stockists and press, while the run lasts.</p>
          </Reveal>
          <Reveal kind="wipe" className="cg-request__frame">
            <span className="cg-request__img"><Picture assetKey="roll-08" alt="Model walking away down a tiled tunnel, back to camera" sizes="(min-width: 900px) 36vw, 90vw" /></span>
          </Reveal>
        </div>
        <Reveal kind="wipe" className="cg-request__form">
          <SheetRequestForm />
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Sheet.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
import { ContactSheet } from "../sheet/ContactSheet";
import { SheetController } from "../sheet/SheetController";

/** The hero is the contact sheet: the loupe sweeps it, six frames get looped, frame 02 enlarges into Look 01. */
export function Sheet() {
  return (
    <SheetController>
      <div className="cg-sheet__stage">
        <div className="cg-container cg-sheet__grid">
          <div className="cg-sheet__copy cg-load">
            <p className="cg-eyebrow cg-load__item" style={{ "--i": 0 } as CSSProperties}>
              <span>Collection 07</span><span>Concrete Flash</span><span>AW26</span>
            </p>
            <h1 id="cg-title" className="cg-sheet__title">
              <SplitText delay={260}>{"Marked\nfor keeps."}</SplitText>
            </h1>
            <p className="cg-sheet__lead cg-load__item" style={{ "--i": 1 } as CSSProperties}>
              Tailoring and outerwear cut from deadstock cloth in London. One roll of film, shot at night with a flash. Six frames made the edit.
            </p>
            <div className="cg-sheet__actions cg-load__item" style={{ "--i": 2 } as CSSProperties}>
              <Magnetic>
                <a className="cg-button cg-button--solid" href="#looks">
                  <span className="cg-button__fill" aria-hidden="true" />
                  <span className="cg-button__roll"><span>See the six looks</span><span aria-hidden="true">See the six looks</span></span>
                </a>
              </Magnetic>
              <a className="cg-button cg-button--line" href="#shop">
                <span className="cg-button__fill" aria-hidden="true" />
                <span className="cg-button__roll"><span>Shop the collection</span><span aria-hidden="true">Shop the collection</span></span>
              </a>
            </div>
            <p className="cg-sheet__cue cg-mono cg-load__item" style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
              <span className="cg-dot" /> <span data-frame-counter>Frame 01 / 12</span> <span className="cg-sheet__cue-hint">· scroll to edit the roll</span>
            </p>
          </div>
          <div className="cg-sheet__board cg-load__board">
            <ContactSheet />
          </div>
        </div>
        <div className="cg-enlarge" aria-hidden="true">
          <Picture assetKey="roll-02" alt="" sizes="100vw" />
        </div>
        <span className="cg-strobe cg-strobe--sheet" aria-hidden="true" />
      </div>
    </SheetController>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sections/Shop.tsx">
<![CDATA[import { PRODUCTS } from "../content/products";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { ProductCard } from "../shop/ProductCard";

/** The flash-white room: every look as a piece you can buy. */
export function Shop() {
  return (
    <section id="shop" className="cg-section cg-shop" aria-labelledby="cg-shop-title">
      <div className="cg-container">
        <Reveal kind="rise" className="cg-shop__head">
          <p className="cg-eyebrow"><span>Shop</span><span>Made to the roll, not to order</span></p>
          <h2 id="cg-shop-title" className="cg-h2"><SplitText>{"Six pieces.\nThen it's gone."}</SplitText></h2>
          <p className="cg-lead">Each piece is cut until its cloth runs out. The number left is what this run has; alterations are free in the London studio.</p>
        </Reveal>
        <ul className="cg-shop__grid">
          {PRODUCTS.map((product, index) => (
            <Reveal as="li" key={product.sku} kind="scale" index={index % 3}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sheet/ContactSheet.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { GreaseLoop } from "./GreaseLoop";
import { FRAMES } from "./roll";

const STRIPS = [FRAMES.slice(0, 4), FRAMES.slice(4, 8), FRAMES.slice(8, 12)];

/** One roll printed on one sheet: three strips of four square frames, edge print, selects looped in grease pencil. */
export function ContactSheet() {
  return (
    <div className="cg-board">
      <div className="cg-board__head" aria-hidden="true">
        <span>Chinagraph 120</span>
        <span>Roll 07 · Concrete Flash</span>
        <span>12 exp · pushed +1</span>
      </div>
      <div className="cg-board__strips">
        {STRIPS.map((strip, s) => (
          <div key={s} className="cg-strip" style={{ "--s": s } as CSSProperties}>
            <span className="cg-strip__edge" aria-hidden="true">CHINAGRAPH 120 ▸ 07 ▸ {strip[0].n}A ▸ SAFETY FILM ▸ {strip[3].n}</span>
            <ol className="cg-strip__frames">
              {strip.map((frame) => (
                <li key={frame.n} className="cg-frame" data-frame-n={frame.n} data-select={frame.select ? "true" : undefined}>
                  <span className="cg-frame__img">
                    <Picture assetKey={frame.image} alt={`Frame ${frame.n}: ${frame.alt}`} sizes="(min-width: 1024px) 14vw, 24vw" priority={frame.n <= 4} />
                  </span>
                  <span className="cg-frame__n" aria-hidden="true">{frame.n}</span>
                  {frame.select ? <GreaseLoop n={frame.n} /> : null}
                </li>
              ))}
            </ol>
            <span className="cg-strip__edge cg-strip__edge--bottom" aria-hidden="true">{strip.map((f) => `${f.n} ▸`).join(" ")} KODAK-FREE ▸ ISO 400</span>
          </div>
        ))}
      </div>
      <span className="cg-loupe" aria-hidden="true">
        <span className="cg-loupe__ring" />
      </span>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sheet/GreaseLoop.tsx">
<![CDATA[import type { CSSProperties } from "react";

const LOOPS = [
  "M50 6C76 4 95 22 94 49c-1 26-20 45-46 45C22 93 5 75 6 49 7 25 25 8 56 9",
  "M48 5c27-1 47 19 46 45-1 25-22 44-47 44S5 73 6 48C7 23 27 6 58 8",
  "M52 7c25 0 43 19 42 43-1 25-21 44-46 43C23 92 6 74 7 50 8 26 28 7 54 10",
];

/**
 * A hand-drawn grease-pencil loop. `pathLength={1}` lets CSS draw it with one custom property (--mark);
 * each frame gets a slightly different loop and tilt, the way a real editor's hand varies.
 */
export function GreaseLoop({ n, className }: { n: number; className?: string }) {
  const tilt = ((n * 37) % 18) - 9;
  return (
    <svg className={`cg-loop ${className ?? ""}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false" style={{ "--tilt": `${tilt}deg` } as CSSProperties} data-loop={n}>
      <path d={LOOPS[n % LOOPS.length]} pathLength={1} />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sheet/roll.ts">
<![CDATA[import { clamp01, easeInOutCubic, flashCurve, segment } from "../motion/math";

export type Frame = { n: number; image: string; select: boolean; alt: string };

/** The six frames marked on the sheet, in roll order. Each becomes a look. */
export const SELECTS = [2, 4, 5, 7, 10, 12];

const ALT: string[] = [
  "Model walking fast through a concrete underpass at night in an oversized coat, motion-blurred under direct flash",
  "Look 01: the navy melton box coat against a brutalist concrete wall, hard flash shadow behind",
  "Model sitting on a car-park stairwell, knees up, flash bouncing off painted concrete",
  "Look 02: the black waxed-cotton work jacket on a petrol-station forecourt under sodium light and flash",
  "Look 03: charcoal flannel pleated trousers mid-stride on a wet zebra crossing",
  "Out-take: a blurred, laughing frame, eyes closed against the flash",
  "Look 04: the bone boiled-wool rollneck against a corrugated metal shutter",
  "Model walking away down a tiled tunnel, back to camera",
  "Hands in coat pockets on a rooftop car-park ramp",
  "Look 05: the rain-grey gabardine double-breasted suit on a rooftop car park, city haze behind",
  "Out-take: a flash flare burning out half the frame",
  "Look 06: the oxblood leather car coat, leaning on a dark car in an empty multi-storey",
];

export const FRAMES: Frame[] = ALT.map((alt, index) => {
  const n = index + 1;
  return { n, image: `roll-${String(n).padStart(2, "0")}`, select: SELECTS.includes(n), alt };
});

/** Scene timeline (share of the pinned scroll). */
export const SWEEP_START = 0.04;
export const SWEEP_END = 0.68;
export const ENLARGE_START = 0.74;
export const ENLARGE_END = 0.96;

const sweep = (p: number) => segment(p, SWEEP_START, SWEEP_END) * FRAMES.length;

/** The frame (1–12) under the loupe. */
export function frameAt(p: number): number {
  return Math.min(FRAMES.length, Math.floor(sweep(p)) + 1);
}

/** Continuous loupe position, 0 = centre of frame 1 … 11 = centre of frame 12. */
export function loupeAt(p: number): number {
  return Math.min(FRAMES.length - 1, Math.max(0, sweep(p) - 0.5));
}

/** How much of a select's grease-pencil mark is drawn (0–1). Non-selects are never marked. */
export function markAt(p: number, frame: number): number {
  if (!SELECTS.includes(frame)) return 0;
  return clamp01(sweep(p) - (frame - 1));
}

/** The first select's enlargement from its cell to full screen, eased. */
export function enlargeAt(p: number): number {
  return easeInOutCubic(segment(p, ENLARGE_START, ENLARGE_END));
}

/** The strobe that lands with the enlargement; it has fully decayed by the end of the pinned scroll. */
export function flashAt(p: number): number {
  return flashCurve(p, ENLARGE_END - 0.04, 1);
}

export function counterAt(p: number): string {
  const n = p >= ENLARGE_START ? SELECTS[0] : frameAt(p);
  return `Frame ${String(n).padStart(2, "0")} / ${FRAMES.length}`;
}

export type Rect = { x: number; y: number; w: number; h: number };
export type Flip = { x: number; y: number; s: number };

/**
 * The transform that shrinks a stage-covering square (side = the stage's longer edge, centred)
 * back onto a contact-sheet cell. Animating it to identity enlarges the frame with transforms only.
 */
export function flipToSquare(cell: Rect, stage: { w: number; h: number }): Flip {
  const side = Math.max(stage.w, stage.h);
  return {
    x: cell.x + cell.w / 2 - stage.w / 2,
    y: cell.y + cell.h / 2 - stage.h / 2,
    s: side ? cell.w / side : 1,
  };
}

export function lerpFlip(flip: Flip, t: number): Flip {
  const k = clamp01(t);
  return { x: flip.x * (1 - k) + 0, y: flip.y * (1 - k) + 0, s: flip.s + (1 - flip.s) * k };
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/sheet/SheetController.tsx">
<![CDATA["use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lerp, progressFromOffsets } from "../motion/math";
import { FRAMES, SELECTS, counterAt, enlargeAt, flashAt, flipToSquare, frameAt, lerpFlip, loupeAt, markAt } from "./roll";

/** The same query that switches on the pinned layouts in chinagraph.css. */
export const LIVE_QUERY = "(prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)";

type Point = { x: number; y: number };

/**
 * The contact sheet's one client leaf. One rAF per scroll turns the section's real offsets into
 * progress, then moves the loupe, draws the select loops and enlarges frame 02 via CSS variables.
 * Outside the live query it does nothing: the CSS defaults are the finished, marked sheet.
 */
export function SheetController({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    const stage = root.querySelector<HTMLElement>(".cg-sheet__stage");
    const board = root.querySelector<HTMLElement>(".cg-board");
    const frames = [...root.querySelectorAll<HTMLElement>(".cg-frame")];
    const loops = new Map(SELECTS.map((n) => [n, root.querySelector<SVGElement>(`[data-loop="${n}"]`)]));
    const counters = () => document.querySelectorAll<HTMLElement>("[data-frame-counter]");
    let top = 0;
    let height = 0;
    let centres: Point[] = [];
    let cellRect = { x: 0, y: 0, w: 0, h: 0 };
    let stageSize = { w: 0, h: 0 };
    let frame = 0;
    let active = false;
    let under = -1;
    let label = "";
    const marks = new Map<number, string>();

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      height = root.offsetHeight;
      if (!stage || !board) return;
      const boardBox = board.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      stageSize = { w: stageBox.width, h: stageBox.height };
      centres = frames.map((el) => {
        const box = el.getBoundingClientRect();
        return { x: box.left - boardBox.left + box.width / 2, y: box.top - boardBox.top + box.height / 2 };
      });
      const first = frames[SELECTS[0] - 1]?.getBoundingClientRect();
      if (first) cellRect = { x: first.left - stageBox.left, y: first.top - stageBox.top, w: first.width, h: first.height };
      root.style.setProperty("--cell", `${first?.width ?? 0}px`);
      root.style.setProperty("--side", `${Math.max(stageSize.w, stageSize.h)}px`);
    };

    const update = () => {
      frame = 0;
      const p = progressFromOffsets(top - window.scrollY, height, window.innerHeight);
      const enlarge = enlargeAt(p);
      root.style.setProperty("--cg-p", p.toFixed(4));
      root.style.setProperty("--cg-enlarge", enlarge.toFixed(4));
      root.style.setProperty("--cg-flash", flashAt(p).toFixed(3));

      // Loupe: glide between cached cell centres.
      const pos = loupeAt(p);
      const i = Math.floor(pos);
      const a = centres[i];
      const b = centres[Math.min(FRAMES.length - 1, i + 1)];
      if (a && b) {
        root.style.setProperty("--lx", `${lerp(a.x, b.x, pos - i).toFixed(1)}px`);
        root.style.setProperty("--ly", `${lerp(a.y, b.y, pos - i).toFixed(1)}px`);
      }
      const current = frameAt(p);
      if (current !== under) {
        frames[under - 1]?.removeAttribute("data-under");
        frames[current - 1]?.setAttribute("data-under", "true");
        under = current;
      }

      for (const n of SELECTS) {
        const value = markAt(p, n).toFixed(3);
        if (marks.get(n) !== value) {
          marks.set(n, value);
          loops.get(n)?.style.setProperty("--mark", value);
        }
      }

      const flip = lerpFlip(flipToSquare(cellRect, stageSize), enlarge);
      root.style.setProperty("--ex", `${flip.x.toFixed(1)}px`);
      root.style.setProperty("--ey", `${flip.y.toFixed(1)}px`);
      root.style.setProperty("--es", flip.s.toFixed(4));

      if (p < 1) {
        const next = counterAt(p);
        if (next !== label) {
          label = next;
          counters().forEach((node) => { node.textContent = next; });
        }
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };

    const start = () => {
      active = true;
      root.dataset.live = "true";
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      active = false;
      delete root.dataset.live;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };

    sync();
    media.addEventListener("change", onMediaChange);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    // The strips slide in on load; measure the cells again once they have settled.
    const settle = window.setTimeout(onResize, 1800);
    return () => {
      window.clearTimeout(settle);
      stop();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <section ref={ref} id="sheet" className="cg-sheet" aria-labelledby="cg-title">
      {children}
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/shop/bag.ts">
<![CDATA[export type BagLine = { sku: string; size: string; qty: number };
export type Bag = { lines: BagLine[] };
export type BagAction = { type: "add" | "remove"; sku: string; size: string };

export const EMPTY_BAG: Bag = { lines: [] };

export function bagReducer(bag: Bag, action: BagAction): Bag {
  const index = bag.lines.findIndex((line) => line.sku === action.sku && line.size === action.size);
  if (action.type === "add") {
    if (index === -1) return { lines: [...bag.lines, { sku: action.sku, size: action.size, qty: 1 }] };
    return { lines: bag.lines.map((line, i) => (i === index ? { ...line, qty: line.qty + 1 } : line)) };
  }
  if (index === -1) return bag;
  const line = bag.lines[index];
  if (line.qty <= 1) return { lines: bag.lines.filter((_, i) => i !== index) };
  return { lines: bag.lines.map((l, i) => (i === index ? { ...l, qty: l.qty - 1 } : l)) };
}

export const bagCount = (bag: Bag) => bag.lines.reduce((sum, line) => sum + line.qty, 0);

export function bagSubtotal(bag: Bag, prices: Record<string, number>): number {
  return bag.lines.reduce((sum, line) => sum + (prices[line.sku] ?? 0) * line.qty, 0);
}

export const formatGBP = (amount: number) => `£${amount.toLocaleString("en-GB")}`;
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/shop/BagButton.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import { PRICES, PRODUCTS } from "../content/products";
import { bagCount, bagSubtotal, formatGBP } from "./bag";
import { dispatchBag, useBag, useLastAdded } from "./store";

/** The header bag: a count that pops on add, and a small popover with lines and a subtotal. */
export function BagButton() {
  const bag = useBag();
  const last = useLastAdded();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);
  const count = bagCount(bag);
  const lastProduct = last ? PRODUCTS.find((product) => product.sku === last.sku) : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const onDown = (event: PointerEvent) => { if (!wrap.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);

  return (
    <div ref={wrap} className="cg-bag">
      <button type="button" className="cg-bag__button" aria-expanded={open} aria-controls="cg-bag-panel" onClick={() => setOpen((value) => !value)}>
        Bag <span className="cg-bag__count" key={last?.at ?? 0} data-pop={last ? "true" : undefined}>{count}</span>
      </button>
      <p className="cg-sr" aria-live="polite">{lastProduct && last ? `Added ${lastProduct.name}, size ${last.size}. ${count} in the bag.` : ""}</p>
      <div id="cg-bag-panel" className="cg-bag__panel" data-open={open ? "true" : "false"} hidden={!open}>
        <p className="cg-mono cg-bag__title">Your bag</p>
        {bag.lines.length === 0 ? (
          <p className="cg-bag__empty">Nothing marked yet.</p>
        ) : (
          <ul className="cg-bag__lines">
            {bag.lines.map((line) => {
              const product = PRODUCTS.find((item) => item.sku === line.sku);
              return (
                <li key={`${line.sku}-${line.size}`}>
                  <span>{product?.name} <span className="cg-mono">· {line.size} × {line.qty}</span></span>
                  <button type="button" className="cg-bag__remove" onClick={() => dispatchBag({ type: "remove", sku: line.sku, size: line.size })}>
                    Remove<span className="cg-sr"> one {product?.name}, size {line.size}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p className="cg-bag__total"><span className="cg-mono">Subtotal</span> <span>{formatGBP(bagSubtotal(bag, PRICES))}</span></p>
        <p className="cg-bag__note">Checkout is switched off in this template.</p>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/shop/ProductCard.tsx">
<![CDATA["use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { LOOKS } from "../content/looks";
import type { Product } from "../content/products";
import { formatGBP } from "./bag";
import { dispatchBag } from "./store";

type Phase = "idle" | "adding" | "added";

/**
 * A flat lay that wipes to the on-model frame (hover on fine pointers, or the "On model" toggle anywhere),
 * native radio size chips, and an add button that walks idle → adding → in the bag.
 */
export function ProductCard({ product, index }: { product: Product; index: number }) {
  const look = LOOKS.find((item) => item.n === product.look)!;
  const [size, setSize] = useState("");
  const [onModel, setOnModel] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const id = product.sku.toLowerCase();

  useEffect(() => {
    if (phase === "idle") return;
    const timer = window.setTimeout(() => {
      if (phase === "adding") {
        dispatchBag({ type: "add", sku: product.sku, size });
        setPhase("added");
      } else {
        setPhase("idle");
      }
    }, phase === "adding" ? 450 : 2200);
    return () => window.clearTimeout(timer);
  }, [phase, product.sku, size]);

  const label = phase === "adding" ? "Adding" : phase === "added" ? "In the bag ✓" : size ? `Add to bag · ${formatGBP(product.price)}` : "Pick a size";

  return (
    <article id={`product-${id}`} className="cg-product" data-on-model={onModel ? "true" : "false"} style={{ "--i": index } as CSSProperties} aria-labelledby={`${id}-name`}>
      <div className="cg-product__media">
        <span className="cg-product__flat"><Picture assetKey={product.flat} alt={product.flatAlt} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" /></span>
        <span className="cg-product__model"><Picture assetKey={look.image} alt={`On model: ${product.name}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" /></span>
        <button type="button" className="cg-product__toggle" aria-pressed={onModel} onClick={() => setOnModel((value) => !value)}>
          <span className="cg-sr">Show </span>On model
        </button>
        <span className="cg-mono cg-product__look">Look {String(look.n).padStart(2, "0")}</span>
      </div>
      <div className="cg-product__body">
        <div className="cg-product__row">
          <h3 id={`${id}-name`} className="cg-product__name">{product.name}</h3>
          <p className="cg-product__price">{formatGBP(product.price)}</p>
        </div>
        <p className="cg-mono cg-product__origin">{look.origin} · {product.left} left</p>
        <fieldset className="cg-sizes">
          <legend className="cg-sr">Size for {product.name}</legend>
          {product.sizes.map((option) => (
            <label key={option.label} className="cg-size" data-sold-out={option.soldOut ? "true" : undefined}>
              <input type="radio" name={`size-${id}`} value={option.label} disabled={option.soldOut} checked={size === option.label} onChange={() => setSize(option.label)} />
              <span>{option.label}{option.soldOut ? <span className="cg-sr"> (sold out)</span> : null}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="cg-button cg-button--ink cg-product__add" data-phase={phase} disabled={!size || phase !== "idle"} onClick={() => setPhase("adding")}>
          <span className="cg-button__fill" aria-hidden="true" />
          <span className="cg-product__add-label">{label}</span>
        </button>
      </div>
    </article>
  );
}
]]>
    </file>
    <file path="src/app/(chinagraph)/chinagraph/shop/store.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";
import { EMPTY_BAG, bagReducer, type Bag, type BagAction } from "./bag";

/** One in-memory bag shared by the product cards and the header. A template: nothing persists or posts. */
let bag: Bag = EMPTY_BAG;
const listeners = new Set<() => void>();
let lastAdded: { sku: string; size: string; at: number } | null = null;

export function dispatchBag(action: BagAction) {
  bag = bagReducer(bag, action);
  if (action.type === "add") lastAdded = { sku: action.sku, size: action.size, at: Date.now() };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useBag(): Bag {
  return useSyncExternalStore(subscribe, () => bag, () => EMPTY_BAG);
}

export function useLastAdded() {
  return useSyncExternalStore(subscribe, () => lastAdded, () => null);
}
]]>
    </file>
  </files>
</template>
