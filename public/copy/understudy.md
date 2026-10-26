<template slug="understudy" name="Understudy">
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
    <file path="src/app/(understudy)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Google_Sans_Code, Google_Sans_Flex, Literata } from "next/font/google";
import "./understudy/understudy.css";

const sans = Google_Sans_Flex({ subsets: ["latin"], axes: ["ROND"], variable: "--font-us-flex" });
const code = Google_Sans_Code({ subsets: ["latin"], variable: "--font-us-code", preload: false });
const notes = Literata({ subsets: ["latin"], style: ["italic"], variable: "--font-us-literata", preload: false });

export const metadata: Metadata = {
  title: "Understudy — Your first job, rehearsed.",
  description:
    "Rehearse a real job at a simulated company with a cast, a director and real briefs. Leave with a reel the 3,400 companies casting from the studio can open.",
};
export const viewport: Viewport = { themeColor: "#F4F4F1", colorScheme: "light" };

export default function UnderstudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${code.variable} ${notes.variable}`}>
      <body className="us-body">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}.us-js-only{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(understudy)/understudy/assets.tsx">
<![CDATA[import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/understudy";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean; children?: ReactNode };

/**
 * A responsive picture once `npm run images -- understudy` has produced the file.
 * Until then it renders `children`: the drawn SVG scene that ships with the template,
 * so the page is finished without photography. Without children it shows a labelled placeholder.
 */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 30vw, 80vw", priority, children }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    if (children) return <>{children}</>;
    return (
      <div className={`us-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="us-mono">{assetKey}</span>
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
    <file path="src/app/(understudy)/understudy/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#F4F4F1"/><path d="M6 46V22C6 12.06 14.06 4 24 4s18 8.06 18 18v24H28.6L24 30.5 19.4 46H6Z" fill="#0D0D10" transform="translate(6.5 5) scale(.73)"/><circle cx="24" cy="40.4" r="2.2" fill="#5B3CF0"/></svg>
]]>
    </file>
    <file path="src/app/(understudy)/understudy/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const alt = "Understudy — Your first job, rehearsed.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ARCH = "M6 46V22C6 12.06 14.06 4 24 4s18 8.06 18 18v24H28.6L24 30.5 19.4 46H6Z";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4F4F1", color: "#0D0D10", position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 470, display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D10" }}>
        <svg width="250" height="250" viewBox="0 0 48 48"><path d={ARCH} fill="#5B3CF0" /></svg>
        <div style={{ position: "absolute", bottom: 64, display: "flex", fontSize: 30, color: "#AE9CFF", letterSpacing: -1 }}>3,400+ companies casting</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", width: 730 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 38, letterSpacing: -1.2 }}>
          <svg width="40" height="40" viewBox="0 0 48 48"><path d={ARCH} fill="#0D0D10" /></svg>
          understudy
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1.02, letterSpacing: -4.5, fontWeight: 300 }}>
          <span>Your first job,</span>
          <span style={{ color: "#5B3CF0" }}>rehearsed.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#66666E" }}>Real briefs · a cast · a director · a reel recruiters open</div>
      </div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/page.tsx">
<![CDATA[import { Dock } from "./dock/Dock";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Casting } from "./sections/Casting";
import { Contract } from "./sections/Contract";
import { Finale } from "./sections/Finale";
import { Hero } from "./sections/Hero";
import { Parts } from "./sections/Parts";
import { Rehearsal } from "./sections/Rehearsal";
import { TopBar } from "./sections/TopBar";
import { ScrollDirector } from "./stage/ScrollDirector";

export default function UnderstudyPage() {
  return (
    <>
      <a className="us-skip" href="#parts">Skip to the parts</a>
      <TopBar />
      <main id="main">
        <Hero />
        <Parts />
        <Rehearsal />
        <Casting />
        <Contract />
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
      <SmoothScroll />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/understudy.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-us-house: #F4F4F1;
  --color-us-white: #FFFFFF;
  --color-us-ink: #0D0D10;
  --color-us-night: #1A1A1F;
  --color-us-graphite: #66666E;
  --color-us-cue: #5B3CF0;
  --color-us-cue-light: #AE9CFF;
  --color-us-tape: #FFC547;

  /* motion: a heavy curtain and a lighting board. push in, cue */
  --ease-out: cubic-bezier(0.2, 0.715, 0.205, 0.99);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.625, 0.05, 0, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --ease-pop: cubic-bezier(0.3, 1.45, 0.45, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 800ms;
  --dur-hero: 1200ms;
  --reveal-shift: 28px;
  --stagger: 70ms;
}

/* ---------- base ---------- */
.us-body {
  --us-house: #F4F4F1; --us-white: #FFFFFF; --us-ink: #0D0D10; --us-night: #1A1A1F;
  --us-graphite: #66666E; --us-cue: #5B3CF0; --us-cue-light: #AE9CFF; --us-tape: #FFC547;
  --us-line: color-mix(in oklab, var(--us-ink) 9%, transparent);
  --us-wave-dim: color-mix(in oklab, var(--us-ink) 20%, var(--us-house));
  --us-sans: var(--font-us-flex), ui-rounded, system-ui, sans-serif;
  --us-code: var(--font-us-code), ui-monospace, monospace;
  --us-serif: var(--font-us-literata), Georgia, serif;
  --us-gut: clamp(16px, 0.2rem + 3.4vw, 56px);
  --us-max: 1240px;
  margin: 0; min-width: 320px;
  background: var(--us-house); color: var(--us-ink);
  font: 400 16px/1.55 var(--us-sans);
  font-variation-settings: "ROND" 70;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
html:has(.us-body) { background: var(--us-house); }
html[data-us-lock] { overflow: hidden; }
.us-body *, .us-body *::before, .us-body *::after { box-sizing: border-box; }
.us-body ::selection { background: var(--us-cue); color: var(--us-white); }
/* resets carry no specificity, so every component class wins over them */
:where(.us-body) a { color: inherit; text-decoration: none; }
:where(.us-body) :is(button, input, select) { font: inherit; color: inherit; font-variation-settings: inherit; }
:where(.us-body) button { cursor: pointer; background: none; border: 0; padding: 0; }
:where(.us-body) :is(h1, h2, h3, p, figure, dl, dd) { margin: 0; }
:where(.us-body) :is(ul, ol) { margin: 0; padding: 0; list-style: none; }
:where(.us-body) em { font-style: normal; }
.us-body :focus-visible { outline: 2px solid var(--us-cue); outline-offset: 3px; border-radius: 6px; }
.us-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.us-mono { font: 500 11.5px/1.4 var(--us-code); letter-spacing: 0.06em; text-transform: uppercase; font-variation-settings: normal; }
.us-eyebrow { font: 500 12px/1.4 var(--us-code); letter-spacing: 0.08em; text-transform: uppercase; color: var(--us-graphite); }
.us-h2 { font-size: clamp(2rem, 1.15rem + 2.7vw, 3.75rem); font-weight: 380; letter-spacing: -0.038em; line-height: 1.04; }
.us-lead { font-size: clamp(1.02rem, 0.96rem + 0.25vw, 1.2rem); color: var(--us-graphite); }
.us-cueword { color: var(--us-cue); }
.us-skip { position: fixed; left: 16px; top: 12px; z-index: 100; padding: 12px 18px; border-radius: 999px; background: var(--us-ink); color: var(--us-house) !important; translate: 0 -200%; }
.us-skip:focus { translate: 0 0; }
.us-placeholder { display: grid; place-items: center; background: color-mix(in oklab, var(--us-ink) 6%, var(--us-house)); color: var(--us-graphite); }

/* masks (reveals and load lines) keep descenders */
.us-mask { display: inline-block; max-width: 100%; overflow: clip; vertical-align: top; padding-bottom: 0.1em; margin-bottom: -0.1em; }
.us-mask__in { display: inline-block; }

/* ---------- logo ---------- */
.us-logo { display: inline-flex; align-items: center; gap: 8px; }
.us-logo__mark { width: 24px; height: 24px; }
.us-logo__word { font-size: 21px; font-weight: 520; letter-spacing: -0.045em; line-height: 1; translate: 0 -1px; }

/* ---------- buttons, links, chips ---------- */
.us-btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  height: 52px; padding: 0 26px; border-radius: 999px; overflow: hidden; isolation: isolate;
  font-size: 15px; font-weight: 520; letter-spacing: -0.01em; white-space: nowrap;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out);
}
.us-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--us-cue); transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out); }
.us-btn--ink { background: var(--us-ink); color: var(--us-house); }
.us-btn--cue { background: var(--us-cue); color: var(--us-white); }
.us-btn--cue::before { background: var(--us-ink); }
.us-btn--big { height: 60px; padding: 0 30px; font-size: 16px; }
.us-btn__arrow { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: translate var(--dur-base) var(--ease-out); }
.us-btn:active { transform: scale(0.97); transition-duration: var(--dur-instant); }
.us-btn:disabled { cursor: wait; }
.us-roll { position: relative; display: inline-block; overflow: clip; vertical-align: top; line-height: 1.3; }
.us-roll > span { display: inline-block; transition: translate var(--dur-base) var(--ease-out); }
.us-roll::after { content: attr(data-text) / ""; position: absolute; inset: 0; translate: 0 110%; transition: translate var(--dur-base) var(--ease-out); }
.us-link { position: relative; display: inline-block; padding: 6px 0; font-size: 15px; font-weight: 500; }
.us-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 3px; height: 1px; background: currentColor; transform: scaleX(0.3); transform-origin: left; transition: transform var(--dur-base) var(--ease-out); }
.us-link:focus-visible::after { transform: scaleX(1); }
.us-link:active { translate: 0 1px; }
.us-link--light { color: var(--us-graphite); }
.us-magnetic { display: inline-block; translate: var(--mx, 0) var(--my, 0); }
@media (hover: hover) and (pointer: fine) {
  .us-btn:hover::before { transform: scaleX(1); transform-origin: left; }
  .us-btn:hover .us-roll > span, .us-dock__start:hover .us-roll > span { translate: 0 -110%; }
  .us-btn:hover .us-roll::after, .us-dock__start:hover .us-roll::after { translate: 0 0; }
  .us-btn:hover .us-btn__arrow { translate: 4px 0; }
  .us-link:hover::after { transform: scaleX(1); }
}

/* ---------- top bar ---------- */
.us-top {
  position: fixed; inset: 0 0 auto 0; z-index: 40; display: flex; justify-content: space-between; align-items: center;
  padding: 18px var(--us-gut); pointer-events: none; color: var(--us-ink); transition: color var(--dur-base) var(--ease-out);
}
.us-top > * { pointer-events: auto; }
html[data-us-top="dark"] .us-top { color: var(--us-house); }
.us-top__logo { border-radius: 8px; transition: opacity var(--dur-fast) var(--ease-out); }
.us-top__logo:active { opacity: 0.6; }
.us-live { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.us-live .us-mono { opacity: 0.72; }
.us-live__n { font-variant-numeric: tabular-nums; font-weight: 520; display: inline-block; min-width: 3.2em; }
.us-live__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--us-cue); }
html[data-us-top="dark"] .us-live__dot { background: var(--us-cue-light); }

/* ---------- the dock ---------- */
.us-dock {
  position: fixed; z-index: 60; left: 50%; bottom: max(16px, env(safe-area-inset-bottom)); translate: -50% 0;
  display: flex; align-items: center; gap: 6px; padding: 6px; border-radius: 999px;
  background: color-mix(in oklab, var(--us-white) 58%, transparent);
  -webkit-backdrop-filter: blur(16px) saturate(1.7); backdrop-filter: blur(16px) saturate(1.7);
  box-shadow: inset 0 1px 0 color-mix(in oklab, var(--us-white) 80%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--us-white) 40%, transparent),
    0 18px 40px -16px color-mix(in oklab, var(--us-ink) 34%, transparent), 0 0 0 0.5px color-mix(in oklab, var(--us-ink) 9%, transparent);
  transition: background-color var(--dur-base) var(--ease-out);
}
html[data-us-dock="dark"] .us-dock { background: color-mix(in oklab, var(--us-night) 62%, transparent); box-shadow: inset 0 1px 0 color-mix(in oklab, var(--us-white) 14%, transparent), 0 18px 40px -16px color-mix(in oklab, var(--us-ink) 60%, transparent), 0 0 0 0.5px color-mix(in oklab, var(--us-white) 12%, transparent); }
.us-dock__progress { position: absolute; left: 26px; right: 26px; top: 0; height: 1.5px; border-radius: 2px; background: var(--us-cue); transform: scaleX(var(--us-page, 0)); transform-origin: left; pointer-events: none; }
html[data-us-dock="dark"] .us-dock__progress { background: var(--us-cue-light); }
.us-dock__start {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 9px; height: 48px; min-width: 148px; padding: 0 26px 0 20px;
  border-radius: 999px; background: var(--us-ink); color: var(--us-house); font-size: 15px; font-weight: 520; isolation: isolate; overflow: hidden;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-base) var(--ease-out);
}
html[data-us-dock="dark"] .us-dock__start { background: var(--us-cue); color: var(--us-white); }
.us-dock__play { width: 14px; height: 14px; fill: currentColor; }
.us-dock__shine { position: absolute; inset: 0; z-index: -1; background: linear-gradient(105deg, transparent 30%, color-mix(in oklab, var(--us-white) 26%, transparent) 50%, transparent 70%); translate: -120% 0; }
.us-dock__halo { position: absolute; inset: 0; z-index: -2; border-radius: inherit; box-shadow: 0 0 0 1.5px var(--us-cue); opacity: 0; }
.us-dock__menu, .us-dock__ask {
  position: relative; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%;
  background: var(--us-white); color: var(--us-ink); font-size: 18px; font-weight: 560;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
}
html[data-us-dock="dark"] .us-dock__menu, html[data-us-dock="dark"] .us-dock__ask { background: color-mix(in oklab, var(--us-white) 12%, transparent); color: var(--us-house); }
.us-dock__menu { gap: 0; }
.us-dock__menu i { position: absolute; width: 16px; height: 1.6px; border-radius: 2px; background: currentColor; transition: transform var(--dur-base) var(--ease-out); }
.us-dock__menu i:first-child { transform: translateY(-3px); }
.us-dock__menu i:nth-child(2) { transform: translateY(3px); }
.us-dock__menu[aria-expanded="true"] i:first-child { transform: rotate(45deg); }
.us-dock__menu[aria-expanded="true"] i:nth-child(2) { transform: rotate(-45deg); }
.us-dock__ask[aria-expanded="true"], .us-dock__menu[aria-expanded="true"] { background: var(--us-ink); color: var(--us-house); }
.us-dock button:active { transform: scale(0.94); transition-duration: var(--dur-instant); }
@media (hover: hover) and (pointer: fine) {
  .us-dock__start:hover .us-dock__shine { translate: 120% 0; transition: translate 900ms var(--ease-out); }
  .us-dock__menu:hover, .us-dock__ask:hover { transform: translateY(-2px); }
}

/* ---------- sheets ---------- */
.us-scrim { position: fixed; inset: 0; z-index: 50; background: color-mix(in oklab, var(--us-ink) 22%, transparent); opacity: 0; pointer-events: none; transition: opacity var(--dur-base) var(--ease-out); }
.us-scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
.us-sheet {
  position: fixed; z-index: 55; left: 50%; bottom: calc(max(16px, env(safe-area-inset-bottom)) + 70px);
  width: min(460px, calc(100% - 24px)); max-height: calc(100svh - 120px); overflow: auto; overscroll-behavior: contain;
  padding: 22px; border-radius: 28px; translate: -50% 0;
  background: color-mix(in oklab, var(--us-white) 88%, transparent);
  -webkit-backdrop-filter: blur(24px) saturate(1.6); backdrop-filter: blur(24px) saturate(1.6);
  box-shadow: inset 0 1px 0 var(--us-white), 0 30px 80px -30px color-mix(in oklab, var(--us-ink) 45%, transparent), 0 0 0 0.5px color-mix(in oklab, var(--us-ink) 10%, transparent);
  opacity: 0; visibility: hidden; transform: translateY(14px) scale(0.97); transform-origin: 50% 100%;
  clip-path: inset(30% 8% 0 8% round 28px);
  transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), clip-path var(--dur-base) var(--ease-out), visibility 0s linear var(--dur-base);
}
/* visibility flips at once on open, so focus can move in on the next frame */
.us-sheet[data-open="true"] { opacity: 1; visibility: visible; transform: none; clip-path: inset(0 0 0 0 round 28px);
  transition: opacity 520ms var(--ease-out), transform 520ms var(--ease-out), clip-path 520ms var(--ease-out), visibility 0s; }
.us-sheet__head { position: relative; padding-right: 44px; margin-bottom: 18px; }
.us-sheet__head .us-mono { color: var(--us-graphite); margin-bottom: 6px; }
.us-sheet__t { font-size: 26px; font-weight: 420; letter-spacing: -0.03em; line-height: 1.1; }
.us-x { position: absolute; right: -6px; top: -6px; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: color-mix(in oklab, var(--us-ink) 6%, transparent); transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast); }
.us-x svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
.us-x:active { transform: scale(0.9); }
@media (hover: hover) and (pointer: fine) { .us-x:hover { transform: rotate(90deg); background: color-mix(in oklab, var(--us-ink) 10%, transparent); } }

/* menu */
.us-menu { position: relative; }
.us-menu__pill { position: absolute; left: 0; right: 0; top: 0; height: 58px; border-radius: 16px; background: color-mix(in oklab, var(--us-cue) 9%, var(--us-white)); transform: translateY(calc(var(--active) * 58px)); transition: transform var(--dur-base) var(--ease-out); }
.us-menu li { position: relative; }
.us-menu__link { display: flex; align-items: baseline; gap: 14px; height: 58px; padding: 12px 14px; font-size: 26px; font-weight: 400; letter-spacing: -0.03em; line-height: 1.2; }
.us-menu__n { font: 500 11px var(--us-code); color: var(--us-graphite); letter-spacing: 0.06em; }
.us-menu__link[aria-current="location"] { color: var(--us-cue); }
.us-menu__link:active { opacity: 0.6; }
.us-menu__foot { display: flex; gap: 10px; align-items: center; margin-top: 14px; padding: 14px 14px 2px; border-top: 1px solid var(--us-line); font-size: 13px; color: var(--us-graphite); }

/* fields */
.us-form { display: grid; gap: 12px; }
.us-field { position: relative; }
.us-field input, .us-field select {
  width: 100%; height: 58px; padding: 24px 16px 8px; border-radius: 14px; border: 1px solid color-mix(in oklab, var(--us-ink) 14%, transparent);
  background: var(--us-white); font-size: 16px; appearance: none; outline: 2px solid transparent; outline-offset: 6px;
  transition: border-color var(--dur-fast) var(--ease-out), outline-offset var(--dur-base) var(--ease-out), outline-color var(--dur-fast);
}
.us-field input:focus-visible, .us-field select:focus-visible { outline: 2px solid var(--us-cue); outline-offset: 1px; border-color: transparent; border-radius: 14px; }
.us-field label { position: absolute; left: 17px; top: 18px; font-size: 16px; color: var(--us-graphite); transform-origin: left top; pointer-events: none; transition: transform var(--dur-base) var(--ease-out), color var(--dur-fast); }
.us-field input:focus + label, .us-field input:not(:placeholder-shown) + label, .us-field--select label { transform: translateY(-10px) scale(0.76); }
.us-field input:focus + label { color: var(--us-cue); }
.us-field--select::after { content: ""; position: absolute; right: 20px; top: 25px; width: 8px; height: 8px; border-right: 1.6px solid var(--us-graphite); border-bottom: 1.6px solid var(--us-graphite); rotate: 45deg; pointer-events: none; }
.us-field[data-invalid="true"] input, .us-field[data-invalid="true"] select { border-color: var(--us-cue); }
.us-field__e { font-size: 13px; color: var(--us-cue); padding: 0 4px; }
.us-field__e:not(:empty) { padding-top: 6px; animation: us-err var(--dur-base) var(--ease-out) both; }
.us-field[data-shake="0"] { animation: us-shake-a 300ms var(--ease-out); }
.us-field[data-shake="1"] { animation: us-shake-b 300ms var(--ease-out); }
.us-form__go { width: 100%; margin-top: 4px; }
.us-btn__label { transition: translate var(--dur-base) var(--ease-out), opacity var(--dur-fast); }
.us-btn__dots { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 5px; opacity: 0; translate: 0 100%; transition: translate var(--dur-base) var(--ease-out), opacity var(--dur-fast); }
.us-btn__dots i, .us-dots i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.us-form__go[aria-busy="true"] { background: var(--us-cue); }
.us-form__go[aria-busy="true"] .us-btn__label { translate: 0 -120%; opacity: 0; }
.us-form__go[aria-busy="true"] .us-btn__dots { translate: 0 0; opacity: 1; }
.us-form__go[aria-busy="true"] .us-btn__dots i { animation: us-bounce 900ms var(--ease-in-out) infinite; animation-delay: calc(var(--n, 0) * 120ms); }
.us-btn__dots i:nth-child(2), .us-dots i:nth-child(2) { --n: 1; }
.us-btn__dots i:nth-child(3), .us-dots i:nth-child(3) { --n: 2; }
.us-form__fine { font-size: 12px; color: var(--us-graphite); text-align: center; }

/* the swap: form out, call sheet in */
.us-swap { display: grid; }
.us-swap > * { grid-area: 1 / 1; }
.us-form, .us-ticket { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out); }
.us-ticket { position: relative; align-self: start; padding: 22px; border-radius: 20px; background: var(--us-white); border: 1px dashed color-mix(in oklab, var(--us-cue) 40%, transparent); opacity: 0; transform: translateY(28px); clip-path: inset(100% 0 0 0 round 20px); pointer-events: none; }
[data-status="done"] .us-form { opacity: 0; transform: translateY(-16px); clip-path: inset(0 0 100% 0); pointer-events: none; }
[data-status="done"] .us-ticket { opacity: 1; transform: none; clip-path: inset(0 0 0 0 round 20px); pointer-events: auto; transition-delay: 160ms; }
.us-ticket__k { color: var(--us-cue); }
.us-ticket__t { margin: 8px 0 14px; font-size: 22px; letter-spacing: -0.025em; line-height: 1.15; max-width: 16em; }
.us-ticket__dl { display: grid; gap: 8px; margin-bottom: 14px; }
.us-ticket__dl div { display: flex; justify-content: space-between; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--us-line); font-size: 14px; }
.us-ticket__dl dt { color: var(--us-graphite); }
.us-ticket__dl dd { font-weight: 520; text-align: right; }
.us-ticket__stamp { position: absolute; right: 18px; top: 18px; padding: 4px 10px; border: 2px solid var(--us-cue); border-radius: 8px; color: var(--us-cue); font: 600 13px var(--us-code); letter-spacing: 0.12em; text-transform: uppercase; rotate: -12deg; opacity: 0; scale: 1.8; }
[data-status="done"] .us-ticket__stamp { opacity: 1; scale: 1; transition: opacity var(--dur-fast) 700ms, scale var(--dur-base) var(--ease-pop) 700ms; }

/* ask */
.us-ask__head { display: flex; align-items: center; gap: 10px; }
.us-ask__mk { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--us-ink); color: var(--us-cue-light); }
.us-ask__mk svg { width: 18px; height: 18px; }
.us-ask__t { font-size: 18px; font-weight: 520; letter-spacing: -0.02em; }
.us-ask__log { display: flex; flex-direction: column; gap: 8px; max-height: min(320px, 42svh); overflow: auto; padding: 4px 2px 10px; }
.us-bubble { max-width: 86%; padding: 10px 14px; border-radius: 18px; font-size: 15px; line-height: 1.45; animation: us-bubble var(--dur-base) var(--ease-out) both; }
.us-bubble--us { align-self: flex-start; background: var(--us-white); border-bottom-left-radius: 6px; box-shadow: 0 0 0 1px var(--us-line); }
.us-bubble--you { align-self: flex-end; background: var(--us-ink); color: var(--us-house); border-bottom-right-radius: 6px; }
.us-bubble--typing { display: flex; gap: 4px; padding: 14px 16px; }
.us-bubble--typing i { width: 6px; height: 6px; border-radius: 50%; background: var(--us-graphite); animation: us-bounce 900ms var(--ease-in-out) infinite; }
.us-bubble--typing i:nth-child(2) { animation-delay: 120ms; }
.us-bubble--typing i:nth-child(3) { animation-delay: 240ms; }
.us-ask__chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 12px; }
.us-chip { height: 36px; padding: 0 14px; border-radius: 999px; font-size: 14px; white-space: nowrap; transition: color var(--dur-fast), background-color var(--dur-fast), transform var(--dur-base) var(--ease-spring); }
.us-chip:active { transform: scale(0.95); transition-duration: var(--dur-instant); }
.us-chip:disabled { opacity: 0.5; cursor: wait; }
.us-chip--light { background: color-mix(in oklab, var(--us-ink) 6%, transparent); }
.us-ask__form { display: flex; gap: 6px; }
.us-ask__form input { flex: 1; min-width: 0; height: 48px; padding: 0 18px; border-radius: 999px; border: 1px solid color-mix(in oklab, var(--us-ink) 14%, transparent); background: var(--us-white); font-size: 16px; }
.us-ask__form input:focus-visible { outline: 2px solid var(--us-cue); outline-offset: 1px; }
.us-ask__send { display: grid; place-items: center; width: 48px; height: 48px; flex: none; border-radius: 50%; background: var(--us-ink) !important; color: var(--us-house); transition: transform var(--dur-base) var(--ease-spring), opacity var(--dur-fast); }
.us-ask__send svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.us-ask__send:disabled { opacity: 0.35; cursor: default; }
.us-ask__send:not(:disabled):active { transform: scale(0.9); }
@media (hover: hover) and (pointer: fine) {
  .us-chip--light:hover { background: color-mix(in oklab, var(--us-cue) 12%, transparent); color: var(--us-cue); }
  .us-ask__send:not(:disabled):hover { transform: rotate(-12deg) scale(1.05); }
}

/* ---------- the stage floor (pale in the hero, lit in the finale) ---------- */
.us-floor { position: absolute; inset: 0; width: 100%; height: 100%; }
.us-floor path, .us-floor circle { fill: none; stroke-linecap: round; }
.us-floor--pale .us-floor__row { stroke: color-mix(in oklab, var(--us-ink) 9%, transparent); stroke-width: 7; stroke-dasharray: 16 9; }
.us-floor--pale .us-floor__block { fill: color-mix(in oklab, var(--us-ink) 2%, transparent); }
.us-floor--pale .us-floor__stage { fill: color-mix(in oklab, var(--us-white) 60%, transparent); stroke: color-mix(in oklab, var(--us-ink) 12%, transparent); stroke-width: 2; }
.us-floor--pale .us-floor__wing, .us-floor--pale .us-floor__line, .us-floor--pale .us-floor__aisle { stroke: color-mix(in oklab, var(--us-ink) 9%, transparent); stroke-width: 2; }
.us-floor--pale .us-floor__grid { stroke: color-mix(in oklab, var(--us-ink) 5%, transparent); stroke-width: 1.5; }
.us-floor--pale .us-floor__spike { stroke: color-mix(in oklab, var(--us-ink) 15%, transparent); stroke-width: 5; }
.us-floor--pale .us-floor__glow { fill: color-mix(in oklab, var(--us-cue) 6%, transparent); }
.us-floor--pale .us-floor__bulb { fill: color-mix(in oklab, var(--us-ink) 16%, transparent); }
.us-floor--lit .us-floor__row { stroke: color-mix(in oklab, var(--us-ink) 24%, transparent); stroke-width: 7; stroke-dasharray: 16 9; }
.us-floor--lit .us-floor__block--0 { fill: color-mix(in oklab, var(--us-cue-light) 40%, var(--us-house)); }
.us-floor--lit .us-floor__block--1 { fill: color-mix(in oklab, var(--us-cue) 30%, var(--us-house)); }
.us-floor--lit .us-floor__block--2 { fill: color-mix(in oklab, var(--us-tape) 42%, var(--us-house)); }
.us-floor--lit .us-floor__stage { fill: var(--us-white); stroke: var(--us-ink); stroke-width: 3; }
.us-floor--lit .us-floor__wing { fill: color-mix(in oklab, var(--us-night) 85%, transparent); }
.us-floor--lit .us-floor__line { stroke: var(--us-ink); stroke-width: 5; }
.us-floor--lit .us-floor__aisle { stroke: var(--us-house); stroke-width: 10; }
.us-floor--lit .us-floor__grid { stroke: color-mix(in oklab, var(--us-ink) 8%, transparent); stroke-width: 1.5; }
.us-floor--lit .us-floor__spike { stroke-width: 6; }
.us-floor--lit .us-floor__spike--tape { stroke: var(--us-tape); }
.us-floor--lit .us-floor__spike--cue { stroke: var(--us-cue); }
.us-floor--lit .us-floor__spike--white { stroke: var(--us-ink); }
.us-floor--lit .us-floor__glow { fill: color-mix(in oklab, var(--us-tape) 38%, transparent); }
.us-floor--lit .us-floor__bulb { fill: var(--us-tape); }

/* ---------- hero (static layout: the finished page with motion off) ---------- */
.us-hero { position: relative; background: var(--us-house); }
.us-hero__stage {
  --aw: clamp(76px, 7.2vw, 112px); --ah: calc(var(--aw) * 1.1667); --ay: calc(50% + clamp(84px, 12svh, 130px));
  position: relative; display: flex; flex-direction: column; align-items: center; overflow: clip;
}
.us-hero__floor { position: absolute; inset: 0 0 auto 0; height: 100svh; pointer-events: none; }
.us-hero__mist { position: absolute; inset: 0; background: linear-gradient(var(--us-house) 18%, color-mix(in oklab, var(--us-house) 55%, transparent) 46%, color-mix(in oklab, var(--us-house) 10%, transparent) 75%, var(--us-house)); }
.us-hero__copy { position: relative; z-index: 3; padding: calc(50svh - clamp(150px, 20svh, 220px)) var(--us-gut) 0; text-align: center; }
.us-hero__eyebrow { margin-bottom: 18px; }
.us-hero__t { font-size: clamp(3rem, 1.3rem + 5.4vw, 6.6rem); font-weight: 340; letter-spacing: -0.05em; line-height: 0.98; }
.us-hero__l { display: block; overflow: clip; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.us-hero__l > span { display: inline-block; }
.us-hero__slot { position: relative; z-index: 3; display: block; width: var(--aw); height: var(--ah); margin: 44px auto calc(50svh - 250px); color: var(--us-ink); }
.us-hero__mark { display: block; width: 100%; height: 100%; scale: 1.333; }
.us-hero__rings { display: none; }
.us-house { position: relative; z-index: 2; width: 100%; background: var(--us-ink); color: var(--us-house); }
.us-curtains { display: none; }
.us-house__in { display: grid; gap: 64px; padding: 18svh var(--us-gut) 14svh; text-align: center; }
.us-house__h { font-weight: 360; }
.us-house__n { display: block; font-size: clamp(4.4rem, 2rem + 9vw, 10.5rem); letter-spacing: -0.06em; line-height: 0.9; color: var(--us-cue-light); font-variant-numeric: tabular-nums; }
.us-digit { display: inline-block; overflow: clip; padding-bottom: 0.06em; }
.us-digit > span { display: inline-block; }
.us-house__say { display: block; margin-top: 18px; font-size: clamp(1.5rem, 1rem + 1.6vw, 2.6rem); letter-spacing: -0.035em; line-height: 1.1; }
.us-house__l { display: block; overflow: clip; padding-bottom: 0.08em; }
.us-house__l > span { display: inline-block; }
.us-house__rows { display: grid; gap: 22px; }
.us-house__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 34px; }
.us-house__item[data-copy] { display: none; }
.us-nudge { display: none; }

/* company wordmarks */
.us-co { display: inline-flex; align-items: center; gap: 7px; font-size: 19px; line-height: 1; white-space: nowrap; color: inherit; }
.us-co__g { width: 1em; height: 1em; flex: none; }
.us-co--bold .us-co__n { font-weight: 720; letter-spacing: -0.04em; }
.us-co--light .us-co__n { font-weight: 300; letter-spacing: -0.02em; }
.us-co--caps .us-co__n { font-weight: 640; font-size: 0.78em; letter-spacing: 0.14em; }
.us-co--mono .us-co__n { font-family: var(--us-code); font-weight: 520; font-size: 0.88em; letter-spacing: -0.02em; font-variation-settings: normal; }
.us-co--serif .us-co__n { font-family: var(--us-serif); font-style: italic; font-weight: 500; letter-spacing: -0.01em; font-variation-settings: normal; }
.us-co--round .us-co__n { font-weight: 560; letter-spacing: -0.03em; font-variation-settings: "ROND" 100; }

/* the cue dot at the end of a line */
.us-cuedot { position: relative; display: inline-block; width: 0.62em; height: 0.62em; margin-left: 0.16em; vertical-align: 0.08em; }
.us-cuedot__face { width: 100%; height: 100%; border-radius: 50%; box-shadow: 0 0 0 0.06em var(--us-house), 0 0 0 0.1em var(--us-cue); }
.us-cuedot__ring { position: absolute; inset: -0.1em; border-radius: 50%; border: 0.04em solid var(--us-cue); opacity: 0; }
.us-face__bg { fill: color-mix(in oklab, var(--us-cue-light) 55%, var(--us-white)); }
.us-face__head, .us-face__body { fill: var(--us-ink); }
.us-face--1 .us-face__bg { fill: color-mix(in oklab, var(--us-tape) 70%, var(--us-white)); }
.us-face--2 .us-face__bg { fill: color-mix(in oklab, var(--us-cue) 75%, var(--us-white)); }
.us-face--2 .us-face__head, .us-face--2 .us-face__body { fill: var(--us-white); }
.us-face--3 .us-face__bg { fill: color-mix(in oklab, var(--us-graphite) 30%, var(--us-white)); }

/* ---------- parts (dark) ---------- */
.us-parts { position: relative; background: var(--us-ink); color: var(--us-house); }
.us-parts__stage { padding: 16svh 0 12svh; }
.us-parts__head { display: grid; justify-items: center; gap: 26px; padding: 0 var(--us-gut); text-align: center; }
.us-parts__t { max-width: 15em; }
.us-parts .us-cueword { color: var(--us-cue-light); }
.us-chips { max-width: 100%; padding: 4px; border-radius: 999px; overflow-x: auto; scrollbar-width: none; background: color-mix(in oklab, var(--us-house) 8%, transparent); }
.us-chips__in { position: relative; display: flex; gap: 2px; width: max-content; }
.us-chips__pill { position: absolute; inset: 0; border-radius: 999px; background: var(--us-house); pointer-events: none;
  clip-path: inset(0 calc(100% - var(--pill-x, 0px) - var(--pill-w, 0px)) 0 var(--pill-x, 0px) round 999px); transition: clip-path var(--dur-base) var(--ease-out); }
.us-chips:not([data-measured]) .us-chip[aria-pressed="true"] { background: var(--us-house); }
.us-chips .us-chip { position: relative; color: color-mix(in oklab, var(--us-house) 66%, transparent); }
.us-chips .us-chip[aria-pressed="true"] { color: var(--us-ink); }
.us-parts__band { margin-top: 40px; }
.us-parts__track { display: flex; gap: 16px; padding: 10px var(--us-gut) 24px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.us-parts__track::after { content: ""; flex: none; width: 1px; }
/* the slot is what the ring moves; the card inside keeps its own lift and flip */
.us-part-slot { flex: none; scroll-snap-align: start; }
/* a card's size comes from its own height and ratio, so off-screen cards can skip rendering without changing the ring */
.us-part { position: relative; width: clamp(236px, 21vw, 296px); aspect-ratio: 4 / 5.3; perspective: 1200px; content-visibility: auto; transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out); }
.us-parts__controls { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 18px; padding: 0 var(--us-gut); }
.us-parts__hint { margin-left: 10px; color: color-mix(in oklab, var(--us-house) 55%, transparent); }
.us-ringbtn { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; color: var(--us-house); background: color-mix(in oklab, var(--us-house) 10%, transparent); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--us-house) 14%, transparent);
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out), color var(--dur-fast); }
.us-ringbtn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.us-ringbtn .us-ringbtn__fill { fill: currentColor; stroke: none; }
.us-ringbtn[aria-pressed="true"] { background: var(--us-house); color: var(--us-ink); }
.us-ringbtn:active { transform: scale(0.92); transition-duration: var(--dur-instant); }
.us-ringbtn:focus-visible { outline-color: var(--us-cue-light); }
.us-part__in { position: relative; height: 100%; transform-style: preserve-3d; transition: transform 900ms var(--ease-in-out); }
.us-part[data-flipped="true"] .us-part__in { transform: rotateY(180deg); }
.us-part__face { position: absolute; inset: 0; overflow: hidden; border-radius: 22px; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.us-part__front { background: var(--us-night); box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--us-house) 8%, transparent); }
.us-part__scene, .us-part__pic { position: absolute; inset: 0; }
.us-part__pic img { width: 100%; height: 100%; object-fit: cover; }
.us-part__cone { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 85% at var(--sx, 50%) -8%, color-mix(in oklab, var(--us-cue-light) 42%, transparent), color-mix(in oklab, var(--us-cue) 12%, transparent) 48%, transparent 72%); transition: opacity var(--dur-base); }
.us-part__pool { position: absolute; left: 14%; right: 14%; top: 58%; height: 14%; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in oklab, var(--us-cue-light) 34%, transparent), transparent); }
.us-part__prop { position: absolute; left: 50%; top: 40%; width: 44%; translate: -50% -50%; color: var(--us-house); transition: scale var(--dur-slow) var(--ease-out), rotate var(--dur-slow) var(--ease-out); }
.us-part__prop path { stroke-dasharray: 1; }
.us-tag { position: absolute; left: 14px; top: 14px; display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 11px 0 9px; border-radius: 999px; background: color-mix(in oklab, var(--us-house) 12%, transparent); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); font: 500 11.5px var(--us-code); letter-spacing: 0.04em; text-transform: uppercase; }
.us-tag__i { width: 14px; height: 14px; }
.us-tag--hot .us-tag__i { color: var(--us-tape); }
.us-tag--rising .us-tag__i { color: var(--us-cue-light); }
.us-tag--new .us-tag__i { color: var(--us-house); }
.us-part__meta { position: absolute; inset: auto 0 0 0; padding: 60px 18px 18px; background: linear-gradient(transparent, color-mix(in oklab, var(--us-ink) 82%, transparent) 55%); }
.us-part__meta .us-mono { color: color-mix(in oklab, var(--us-house) 70%, transparent); }
.us-part__t { margin: 6px 0 10px; font-size: 22px; font-weight: 480; letter-spacing: -0.03em; line-height: 1.1; }
.us-part__tools { display: flex; flex-wrap: wrap; gap: 5px; }
.us-part__tools li { padding: 3px 9px; border-radius: 999px; font-size: 12px; background: color-mix(in oklab, var(--us-house) 10%, transparent); }
.us-part__flip { position: absolute; inset: 0; border-radius: 22px; }
.us-part__flip:focus-visible { outline-offset: -4px; outline-color: var(--us-cue-light); }
.us-part__hint { position: absolute; right: 14px; top: 14px; display: inline-flex; align-items: center; gap: 4px; height: 28px; padding: 0 10px 0 12px; border-radius: 999px; background: var(--us-house); color: var(--us-ink); font-size: 12.5px; font-weight: 520; transition: translate var(--dur-base) var(--ease-out), opacity var(--dur-base); }
.us-part__hint svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.us-part__back { display: flex; flex-direction: column; gap: 10px; padding: 22px; background: var(--us-house); color: var(--us-ink); transform: rotateY(180deg); }
.us-part__back .us-mono { color: var(--us-graphite); }
.us-part__brief { font-size: 20px; font-weight: 420; letter-spacing: -0.025em; line-height: 1.18; }
.us-part__k { margin-top: auto; }
.us-part__ships { display: grid; gap: 6px; counter-reset: ship; font-size: 14px; }
.us-part__ships li { display: flex; gap: 8px; counter-increment: ship; }
.us-part__ships li::before { content: "0" counter(ship); font: 500 11px/1.9 var(--us-code); color: var(--us-cue); }
.us-part__acts { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; margin-top: 8px; }
.us-part__acts .us-btn { height: 44px; padding: 0 18px; font-size: 14px; }
.us-part:has(.us-part__flip:active) { transform: scale(0.98); }
@media (hover: hover) and (pointer: fine) {
  .us-part:hover { transform: translateY(-8px); }
  .us-parts__track:has(.us-part:hover) .us-part:not(:hover) { opacity: 0.55; }
  .us-part:hover .us-part__prop { scale: 1.08; rotate: -4deg; }
  .us-part:hover .us-part__hint { translate: -2px 0; }
  .us-chips .us-chip:not([aria-pressed="true"]):hover { color: var(--us-house); }
  .us-ringbtn:hover { background: color-mix(in oklab, var(--us-house) 20%, transparent); transform: translateY(-2px); }
  .us-ringbtn[aria-pressed="true"]:hover { background: var(--us-house); }
}

/* ---------- rehearsal ---------- */
.us-rehearse { position: relative; background: var(--us-house); padding-bottom: 6svh; }
.us-bowl { display: block; height: clamp(90px, 16vw, 260px); background: var(--us-ink); border-radius: 0 0 50% 50% / 0 0 100% 100%; transform-origin: top; transform: scaleY(0.45); }
.us-rehearse__cue { position: absolute; left: 0; top: clamp(90px, 16vw, 260px); width: 1px; height: 60svh; pointer-events: none; }
.us-rehearse__hold { position: sticky; top: 0; z-index: 4; padding: clamp(72px, 12svh, 120px) var(--us-gut) 6svh; text-align: center; background: linear-gradient(var(--us-house) 72%, color-mix(in oklab, var(--us-house) 0%, transparent)); }
.us-rehearse__t { font-size: clamp(2.1rem, 1.1rem + 3.4vw, 4.6rem); font-weight: 380; letter-spacing: -0.042em; line-height: 1.02; }
.us-wave__w { display: inline-block; white-space: nowrap; }
.us-wave__c { display: inline-block; }
.us-wave__w--cue .us-wave__c { color: var(--us-cue); }
.us-wave__pop { font-size: 0.86em; }

.us-thread { position: relative; max-width: var(--us-max); margin: 0 auto; padding: 0 var(--us-gut) 10svh; }
.us-thread__lead { display: block; width: 100%; height: 180px; overflow: visible; }
.us-thread__lead path { fill: none; stroke: color-mix(in oklab, var(--us-ink) 22%, transparent); stroke-width: 1.5; stroke-dasharray: 1; }
.us-thread__rail { position: absolute; left: calc(var(--us-gut) + 23px); top: 178px; bottom: 10svh; width: 1.5px; background: color-mix(in oklab, var(--us-ink) 12%, transparent); }
.us-thread__rail b { position: absolute; inset: 0; background: var(--us-cue); transform-origin: top; }
.us-scenes { display: grid; }
.us-sc { position: relative; display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(28px, 4vw, 64px); align-items: center; min-height: 86svh; padding: 8svh 0 8svh 72px; }
.us-sc__node { position: absolute; left: 17px; top: 50%; width: 14px; height: 14px; margin-top: -7px; border-radius: 50%; background: var(--us-house); box-shadow: 0 0 0 1.5px color-mix(in oklab, var(--us-ink) 25%, transparent); }
.us-sc__node i { position: absolute; inset: 3px; border-radius: 50%; background: var(--us-cue); }
.us-sc__n { color: var(--us-cue); margin-bottom: 12px; }
.us-sc__t { font-size: clamp(1.6rem, 1.1rem + 1.5vw, 2.5rem); font-weight: 400; letter-spacing: -0.032em; line-height: 1.08; }
.us-sc__p { margin-top: 16px; max-width: 26em; color: var(--us-graphite); font-size: 16.5px; }

/* windows */
.us-win { position: relative; }
.us-win__in { position: relative; overflow: hidden; border-radius: 18px; background: var(--us-white); box-shadow: 0 0 0 1px color-mix(in oklab, var(--us-ink) 7%, transparent), 0 50px 90px -50px color-mix(in oklab, var(--us-ink) 40%, transparent); transition: transform var(--dur-base) var(--ease-out); }
.us-win__in::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: 0 0 0 2px var(--us-cue); opacity: 0; transition: opacity var(--dur-base); }
.us-win__bar { display: flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border-bottom: 1px solid var(--us-line); }
.us-win__bar i { width: 10px; height: 10px; border-radius: 50%; background: color-mix(in oklab, var(--us-ink) 12%, transparent); }
.us-win__bar span { flex: 1; margin-right: 46px; text-align: center; font: 500 11px var(--us-code); color: var(--us-graphite); }
.us-win__body { position: relative; aspect-ratio: 16 / 10.4; padding: clamp(14px, 1.6vw, 22px); font-size: 13px; line-height: 1.4; content-visibility: auto; contain-intrinsic-size: auto 260px; }
@media (hover: hover) and (pointer: fine) {
  .us-win__in:hover { transform: translateY(-6px); }
  .us-win__in:hover::after { opacity: 0.35; }
}

/* the lot */
.us-lot { position: relative; height: 100%; }
.us-lot__map { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; height: 100%; padding: 10px; border-radius: 12px; background: repeating-linear-gradient(90deg, transparent 0 calc(25% - 5px), color-mix(in oklab, var(--us-ink) 5%, transparent) calc(25% - 5px) 25%), color-mix(in oklab, var(--us-ink) 3%, var(--us-house)); }
.us-lot__b { position: relative; display: grid; place-items: center; border-radius: 10px; background: var(--us-white); box-shadow: 0 1px 0 color-mix(in oklab, var(--us-ink) 10%, transparent); color: color-mix(in oklab, var(--us-ink) 62%, transparent); }
.us-lot__b .us-co { font-size: 11px; }
.us-lot__b--on { color: var(--us-ink); box-shadow: 0 0 0 2px var(--us-cue); }
.us-lot__pin { position: absolute; right: 8px; top: 8px; width: 9px; height: 9px; border-radius: 50%; background: var(--us-cue); }
.us-lot__pin::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid var(--us-cue); }
.us-lot__brief { position: absolute; right: 14px; bottom: 14px; width: min(60%, 270px); padding: 14px; border-radius: 14px; background: var(--us-white); box-shadow: 0 24px 50px -20px color-mix(in oklab, var(--us-ink) 40%, transparent), 0 0 0 1px var(--us-line); }
.us-lot__brief .us-mono { color: var(--us-cue); font-size: 10px; }
.us-lot__q { margin: 6px 0 8px; font-size: 15px; font-weight: 480; letter-spacing: -0.02em; line-height: 1.2; }
.us-lot__meta { display: flex; gap: 10px; color: var(--us-graphite); font-size: 11.5px; }
.us-lot__take { display: inline-flex; margin-top: 10px; padding: 6px 12px; border-radius: 999px; background: var(--us-ink); color: var(--us-house); font-size: 12px; font-weight: 520; }

/* the cast */
.us-chat { display: grid; grid-template-columns: 1fr 34%; gap: 14px; height: 100%; }
.us-chat__log { display: flex; flex-direction: column; justify-content: flex-end; gap: 9px; }
.us-msg { display: flex; gap: 8px; align-items: flex-start; }
.us-msg__face { width: 26px; height: 26px; flex: none; }
.us-msg__who { font-weight: 560; font-size: 12px; }
.us-msg__who span { margin-left: 4px; font-weight: 400; color: var(--us-graphite); }
.us-msg__t { padding: 7px 10px; margin-top: 3px; border-radius: 4px 12px 12px 12px; background: color-mix(in oklab, var(--us-ink) 5%, transparent); font-size: 12.5px; }
.us-msg--you .us-msg__t { background: color-mix(in oklab, var(--us-cue) 12%, var(--us-white)); }
.us-dots { display: flex; gap: 4px; padding: 10px 12px; border-radius: 4px 12px 12px 12px; background: color-mix(in oklab, var(--us-ink) 5%, transparent); color: var(--us-graphite); }
.us-dots i { width: 5px; height: 5px; }
.us-chat__side { padding: 12px; border-radius: 12px; background: color-mix(in oklab, var(--us-ink) 3%, var(--us-house)); }
.us-chat__side .us-mono { font-size: 10px; color: var(--us-graphite); margin-bottom: 8px; }
.us-chat__side ul { display: grid; gap: 7px; font-size: 12px; }
.us-chat__side li { display: flex; gap: 6px; align-items: center; }
.us-chat__side svg { width: 15px; height: 15px; flex: none; padding: 1px; border-radius: 4px; box-shadow: inset 0 0 0 1.2px color-mix(in oklab, var(--us-ink) 25%, transparent); fill: none; stroke: var(--us-white); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; }
.us-chat__side li.is-done svg { background: var(--us-cue); box-shadow: none; }
.us-chat__side li.is-done { color: var(--us-graphite); }

/* the notes */
.us-doc { position: relative; display: grid; grid-template-columns: 1fr 40%; gap: 14px; height: 100%; }
.us-doc__page { padding: 14px; border-radius: 10px; box-shadow: 0 0 0 1px var(--us-line); display: grid; align-content: start; gap: 10px; }
.us-doc__h { font-weight: 600; font-size: 14px; letter-spacing: -0.01em; }
.us-doc__p { font-size: 12.5px; color: color-mix(in oklab, var(--us-ink) 80%, transparent); }
.us-doc__bars { display: grid; gap: 6px; }
.us-doc__p mark { position: relative; background: none; color: inherit; isolation: isolate; }
.us-doc__p mark::before { content: ""; position: absolute; inset: -1px -2px; z-index: -1; border-radius: 3px; background: color-mix(in oklab, var(--us-tape) 55%, transparent); transform-origin: left; }
.us-doc__bar { display: block; height: 7px; border-radius: 4px; background: color-mix(in oklab, var(--us-ink) 7%, transparent); }
.us-doc__bar--s { width: 62%; }
.us-doc__bar--m { width: 80%; }
.us-doc__notes { display: grid; align-content: start; gap: 9px; }
.us-doc__notes li { display: flex; gap: 8px; padding: 9px 10px; border-radius: 10px; background: color-mix(in oklab, var(--us-cue) 8%, var(--us-white)); font: italic 400 13px/1.35 var(--us-serif); font-variation-settings: normal; }
.us-doc__face { width: 22px; height: 22px; flex: none; }
.us-doc__stamp { position: absolute; right: 8px; bottom: 4px; padding: 3px 10px; border: 2px solid var(--us-cue); border-radius: 6px; color: var(--us-cue); font: 600 12px var(--us-code); letter-spacing: 0.12em; text-transform: uppercase; rotate: -8deg; }

/* the reel */
.us-reel { display: grid; grid-template-rows: auto auto 1fr; gap: 14px; height: 100%; }
.us-reel__head { display: flex; align-items: center; gap: 10px; }
.us-reel__face { width: 42px; height: 42px; }
.us-reel__name { font-size: 17px; font-weight: 560; letter-spacing: -0.02em; }
.us-reel__head .us-mono { font-size: 10px; color: var(--us-graphite); }
.us-reel__ready { margin-left: auto; padding: 5px 10px; border-radius: 999px; background: color-mix(in oklab, var(--us-cue) 12%, var(--us-white)); color: var(--us-cue); font-size: 11.5px; font-weight: 560; }
.us-reel__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.us-reel__stats li { padding: 10px; border-radius: 10px; background: color-mix(in oklab, var(--us-ink) 3%, var(--us-house)); }
.us-reel__stats b { display: block; font-size: clamp(18px, 1.8vw, 26px); font-weight: 420; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.us-reel__stats span { font-size: 11px; color: var(--us-graphite); }
.us-reel__work { display: grid; align-content: start; gap: 8px; }
.us-reel__work li { display: flex; align-items: center; gap: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--us-line); }
.us-reel__work b { display: block; font-weight: 520; font-size: 12.5px; }
.us-reel__work span span { font-size: 11px; color: var(--us-graphite); }
.us-reel__thumb { width: 46px; height: 30px; flex: none; border-radius: 6px; background: linear-gradient(135deg, color-mix(in oklab, var(--us-cue) 20%, var(--us-white)), color-mix(in oklab, var(--us-tape) 30%, var(--us-white))); }

/* ---------- casting ---------- */
.us-casting { position: relative; background: var(--us-house); }
.us-casting__stage { display: grid; align-content: center; gap: 4svh; padding: 12svh var(--us-gut); }
.us-casting__head { display: grid; justify-items: center; gap: 10px; text-align: center; }
.us-cast { position: relative; width: min(1160px, 100%); margin: 0 auto; aspect-ratio: 2 / 1; }
.us-cast__net { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.us-cast__net path { fill: none; stroke: color-mix(in oklab, var(--us-cue) 50%, transparent); stroke-width: 1.5; stroke-dasharray: 1; }
.us-cast__reel { position: absolute; left: 31%; width: 38%; top: 4%; }
.us-cast__reel::before { content: ""; position: absolute; inset: -14px; border-radius: 28px; border: 1.5px solid color-mix(in oklab, var(--us-cue) 50%, transparent); background: color-mix(in oklab, var(--us-cue) 5%, transparent); opacity: 0; scale: 0.96; transition: opacity var(--dur-slow) var(--ease-out), scale var(--dur-slow) var(--ease-out); }
.us-casting[data-full] .us-cast__reel::before { opacity: 1; scale: 1; }
.us-cast__win .us-win__body { aspect-ratio: 16 / 11; padding: 14px; font-size: 12px; }
.us-cast__cos { position: absolute; inset: 0; }
.us-cast__co { position: absolute; left: var(--x); top: var(--y); translate: -50% -50%; padding: 11px 14px; border-radius: 13px; background: var(--us-white); box-shadow: 0 0 0 1px var(--us-line), 0 16px 30px -18px color-mix(in oklab, var(--us-ink) 40%, transparent); transition: opacity var(--dur-base) var(--ease-out), scale 640ms var(--ease-pop); }
.us-cast__co .us-co { font-size: 16px; }
.us-cast__count { position: absolute; left: 50%; bottom: 0; translate: -50% 0; display: flex; align-items: center; gap: 12px; }
.us-cast__count .us-mono { color: var(--us-graphite); }
.us-odo { display: inline-flex; font-size: 44px; font-weight: 380; letter-spacing: -0.04em; line-height: 1; font-variant-numeric: tabular-nums; color: var(--us-cue); }
.us-odo__col { display: inline-flex; flex-direction: column; height: 1em; overflow: clip; }
.us-odo__col span { display: block; height: 1em; transform: translateY(calc(var(--d, 0) * -100%)); transition: transform 700ms var(--ease-spring); }

/* ---------- contract ---------- */
.us-contract { position: relative; background: var(--us-house); }
.us-contract__stage { display: grid; justify-items: center; align-content: center; gap: 26px; min-height: 100svh; padding: 14svh var(--us-gut); text-align: center; }
.us-contract__t { font-size: clamp(2.5rem, 1.1rem + 4.8vw, 6rem); font-weight: 360; letter-spacing: -0.048em; line-height: 1.02; max-width: 12em; }
.us-deal { position: relative; display: inline-block; width: 0.84em; height: 1.06em; margin: 0 0.14em; vertical-align: -0.16em; }
.us-deal__back, .us-deal__sheet { position: absolute; inset: 0; border-radius: 0.07em; background: var(--us-white); box-shadow: 0 0 0 1px var(--us-line), 0 0.2em 0.4em -0.2em color-mix(in oklab, var(--us-ink) 30%, transparent); }
.us-deal__back { rotate: 7deg; translate: 0.06em 0.02em; }
.us-deal__sheet { display: flex; flex-direction: column; gap: 0.06em; padding: 0.12em 0.1em; }
.us-deal__k { font: italic 400 0.13em/1 var(--us-serif); color: var(--us-cue); letter-spacing: 0; font-variation-settings: normal; }
.us-deal__ln { display: block; height: 0.03em; border-radius: 1em; background: color-mix(in oklab, var(--us-ink) 14%, transparent); }
.us-deal__ln--s { width: 60%; }
.us-deal__sig { width: 100%; margin-top: auto; overflow: visible; }
.us-deal__sig path { fill: none; stroke: var(--us-ink); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 0; }
.us-deal__rule { display: block; height: 0.015em; background: color-mix(in oklab, var(--us-ink) 40%, transparent); }
.us-deal__seal { position: absolute; right: -0.13em; top: -0.13em; display: grid; place-items: center; width: 0.32em; height: 0.32em; border-radius: 50%; background: var(--us-cue); box-shadow: 0 0 0 0.04em var(--us-house); }
.us-deal__seal svg { width: 70%; height: 70%; fill: none; stroke: var(--us-white); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.us-contract__price { font-size: clamp(1.15rem, 1rem + 0.6vw, 1.6rem); color: var(--us-graphite); letter-spacing: -0.015em; }
.us-contract__price b { color: var(--us-ink); font-weight: 560; }
.us-contract__l { display: inline-block; }
.us-contract__acts { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px 24px; }
.us-contract__facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; width: min(720px, 100%); margin-top: 3svh; padding-top: 20px; border-top: 1px solid var(--us-line); }
.us-contract__facts li { display: grid; gap: 2px; }
.us-contract__facts b { font-size: 28px; font-weight: 380; letter-spacing: -0.04em; color: var(--us-ink); }
.us-contract__facts span { font-size: 13.5px; color: var(--us-graphite); }

/* ---------- finale ---------- */
.us-finale { position: relative; background: var(--us-house); }
.us-finale__stage { position: relative; height: 100svh; min-height: 620px; overflow: clip; }
.us-finale__floor, .us-finale__lit { position: absolute; inset: 0; }
.us-finale__mist { position: absolute; inset: 0 0 auto; height: 34%; background: linear-gradient(var(--us-house), transparent); }
.us-finale__line { position: absolute; left: 0; right: 0; top: 12%; padding: 0 var(--us-gut); text-align: center; font-size: clamp(1.8rem, 1.1rem + 2.4vw, 3.4rem); font-weight: 380; letter-spacing: -0.04em; line-height: 1.05; }
.us-finale__line span { display: inline-block; }
.us-finale__line span:last-child { color: var(--us-cue); }
.us-ring { position: absolute; left: 50%; top: 52%; width: clamp(190px, 21vw, 270px); aspect-ratio: 1; translate: -50% -50%; border-radius: 50%; display: grid; place-items: center;
  background: color-mix(in oklab, var(--us-white) 62%, transparent); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--us-white) 80%, transparent), 0 40px 80px -30px color-mix(in oklab, var(--us-ink) 45%, transparent);
  transition: scale var(--dur-base) var(--ease-spring); }
.us-ring__text { position: absolute; inset: 4%; width: 92%; height: 92%; overflow: visible; }
.us-ring__text text { font: 600 13px var(--us-code); letter-spacing: 0.18em; fill: var(--us-ink); }
.us-ring__core { display: grid; place-items: center; align-content: center; gap: 4px; width: 56%; aspect-ratio: 1; border-radius: 50%; background: var(--us-ink); color: var(--us-house); font-size: 16px; font-weight: 560; transition: background-color var(--dur-base) var(--ease-out); }
.us-ring__core svg { width: 30%; color: var(--us-cue-light); }
.us-ring:active { scale: 0.95; transition-duration: var(--dur-instant); }
.us-ring:focus-visible { outline-offset: 6px; border-radius: 50%; }
@media (hover: hover) and (pointer: fine) {
  .us-ring:hover { scale: 1.05; }
  .us-ring:hover .us-ring__core { background: var(--us-cue); }
}
.us-finale__foot { position: absolute; inset: auto 0 0 0; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px 24px; padding: 18px var(--us-gut) calc(max(16px, env(safe-area-inset-bottom)) + 74px); font-size: 13px; background: linear-gradient(transparent, color-mix(in oklab, var(--us-house) 92%, transparent) 40%); }
.us-finale__legal, .us-finale__social { display: flex; flex-wrap: wrap; gap: 6px 18px; align-items: center; }
.us-finale__legal span { color: var(--us-graphite); }
.us-finale__foot a { position: relative; padding: 4px 0; }
.us-finale__foot a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 1px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform var(--dur-base) var(--ease-out); }
@media (hover: hover) and (pointer: fine) { .us-finale__foot a:hover::after { transform: scaleX(1); } }

/* ---------- keyframes ---------- */
@keyframes us-err { from { opacity: 0; translate: 0 -6px; } }
@keyframes us-shake-a { 20% { translate: -6px 0; } 40% { translate: 5px 0; } 60% { translate: -4px 0; } 80% { translate: 2px 0; } }
@keyframes us-shake-b { 20% { translate: -6px 0; } 40% { translate: 5px 0; } 60% { translate: -4px 0; } 80% { translate: 2px 0; } }
@keyframes us-bounce { 0%, 100% { translate: 0 0; } 40% { translate: 0 -5px; } }
@keyframes us-bubble { from { opacity: 0; translate: 0 10px; scale: 0.96; } }
@keyframes us-in-mask { from { translate: 0 108%; } }
@keyframes us-in-mask-hero { from { translate: 0 45%; } }
@keyframes us-in-drop { from { opacity: 0; translate: 0 -18px; } }
@keyframes us-in-up { from { opacity: 0; translate: 0 22px; } }
@keyframes us-in-slide { from { opacity: 0; translate: -14px 0; } }
@keyframes us-in-floor { from { opacity: 0; scale: 1.06; } }
@keyframes us-in-dock { from { translate: -50% 170%; } }
@keyframes us-in-pop { from { scale: 0; } }
@keyframes us-ring { from { scale: 0.2; opacity: 0.9; } to { scale: 2.6; opacity: 0; } }
@keyframes us-pulse { 0% { scale: 1; opacity: 0.8; } 100% { scale: 1.9; opacity: 0; } }
/* literal values (no var()) so the breath stays on the compositor */
@keyframes us-breathe-l { 0%, 100% { translate: 0 0; } 50% { translate: -5px 0; } }
@keyframes us-breathe-r { 0%, 100% { translate: 0 0; } 50% { translate: 5px 0; } }
@keyframes us-halo { 0%, 70%, 100% { opacity: 0; scale: 1; } 20% { opacity: 0.9; } 60% { opacity: 0; scale: 1.18; } }
@keyframes us-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes us-tick { from { opacity: 0.35; translate: 0 -3px; } }
@keyframes us-spin { to { rotate: 360deg; } }
@keyframes us-deal { from { opacity: 0; translate: 0 40px; scale: 0.94; rotate: -2deg; } }
@keyframes us-msg { from { opacity: 0; translate: 0 12px; scale: 0.97; } }
@keyframes us-hl { from { transform: scaleX(0); } }
@keyframes us-nudge { from { opacity: 0; translate: -50% 8px; } to { opacity: 1; translate: -50% 0; } }
@keyframes us-wheel { 0% { translate: 0 0; opacity: 1; } 70% { translate: 0 6px; opacity: 0; } 100% { translate: 0 0; opacity: 0; } }

/* ---------- load choreography, ambient life and reveals (motion allowed) ---------- */
@media (prefers-reduced-motion: no-preference) {
  .us-hero__floor { animation: us-in-floor var(--dur-hero) var(--ease-out-expo) both; }
  .us-top__logo { animation: us-in-drop 700ms var(--ease-out-expo) 150ms both; }
  .us-live { animation: us-in-drop 700ms var(--ease-out-expo) 220ms both; }
  .us-hero__eyebrow { animation: us-in-slide 800ms var(--ease-out-expo) 200ms both; }
  /* the headline is the LCP: it starts part-risen in its mask, so the first paint already shows it */
  .us-hero__l > span { animation: us-in-mask-hero 1000ms var(--ease-out-expo) 120ms both; }
  .us-hero__l + .us-hero__l > span { animation-delay: 220ms; }
  .us-hero__cue { animation: us-in-pop 700ms var(--ease-pop) 1000ms both; }
  .us-hero__slot, .us-house { animation: us-in-up 900ms var(--ease-out-expo) 640ms both; }
  .us-dock { animation: us-in-dock 1000ms var(--ease-out-expo) 420ms both; }

  .us-cuedot__ring { animation: us-pulse 2.4s var(--ease-out) 1.4s infinite; }
  .us-live[data-active="true"] .us-live__dot { animation: us-blink 2.2s var(--ease-in-out) infinite; }
  .us-live__n[data-tick] { animation: us-tick 500ms var(--ease-out); }
  .us-dock__halo { animation: us-halo 4.2s var(--ease-out) 2.2s infinite; }
  .us-dock[data-sheet="start"] .us-dock__halo { animation: none; }
  .us-lot__pin[data-active="true"]::after { animation: us-pulse 1.8s var(--ease-out) infinite; }
  .us-ring[data-active="true"] .us-ring__text { animation: us-spin 24s linear infinite; }
  html[data-us-hidden] *, .us-ring:not([data-active="true"]) .us-ring__text { animation-play-state: paused !important; }

  .us-parts__track[data-dealt] .us-part { animation: us-deal 700ms var(--ease-out-expo) both; animation-delay: calc(var(--i) * 60ms); }
}

@media (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  /* reveals */
  [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), translate var(--dur-slow) var(--ease-out), scale var(--dur-slow) var(--ease-out);
    transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="rise"]:not([data-in]) { opacity: 0; translate: 0 var(--reveal-shift); }
  [data-reveal="slide"]:not([data-in]) { opacity: 0; translate: -18px 0; }
  [data-reveal="scale"]:not([data-in]) { opacity: 0; scale: 0.4; }
  [data-reveal="scale"] { transition-timing-function: var(--ease-pop); }
  [data-reveal="mask"] { transition: none; }
  [data-reveal="mask"] > .us-mask__in { transition: translate 1000ms var(--ease-out-expo); transition-delay: calc(var(--i, 0) * 90ms); }
  [data-reveal="mask"]:not([data-in]) > .us-mask__in { translate: 0 108%; }
  [data-reveal="wipe"] { transition: none; }
  [data-reveal="wipe"] > * { transition: clip-path 1100ms var(--ease-in-out), transform var(--dur-base) var(--ease-out); }
  [data-reveal="wipe"]:not([data-in]) > * { clip-path: inset(100% 0 0 0 round 18px); }
  [data-reveal="wipe"] .us-win__body { transition: scale 1300ms var(--ease-out-expo); }
  [data-reveal="wipe"]:not([data-in]) .us-win__body { scale: 1.08; }

  /* window choreography once a window is revealed */
  .us-win:not([data-in]) .us-lot__brief { opacity: 0; translate: 30px 10px; }
  .us-lot__brief { transition: opacity 600ms var(--ease-out) 700ms, translate 900ms var(--ease-out-expo) 700ms; }
  .us-win:not([data-in]) .us-lot__b { opacity: 0; scale: 0.9; }
  .us-lot__b { transition: opacity 500ms var(--ease-out), scale 600ms var(--ease-pop); transition-delay: calc(300ms + var(--i) * 50ms); }
  .us-win[data-in] .us-msg { animation: us-msg 520ms var(--ease-out) both; animation-delay: calc(600ms + var(--i) * 650ms); }
  .us-win:not([data-in]) .us-msg { opacity: 0; }
  .us-msg--typing .us-dots i { animation: us-bounce 900ms var(--ease-in-out) infinite; animation-delay: calc(var(--n, 0) * 120ms); }
  .us-chat__side li svg path { transition: stroke-dashoffset 500ms var(--ease-out); transition-delay: calc(900ms + var(--i) * 500ms); }
  .us-win:not([data-in]) .us-chat__side li svg path { stroke-dashoffset: 1; }
  .us-win[data-in] .us-doc__p mark::before { animation: us-hl 700ms var(--ease-in-out) both; animation-delay: calc(700ms + var(--i) * 500ms); }
  .us-doc__notes li { transition: opacity 500ms var(--ease-out), translate 700ms var(--ease-out-expo); transition-delay: calc(1100ms + var(--i) * 450ms); }
  .us-win:not([data-in]) .us-doc__notes li { opacity: 0; translate: 16px 0; }
  .us-doc__stamp { transition: opacity 200ms 2600ms, scale 500ms var(--ease-pop) 2600ms; }
  .us-win:not([data-in]) .us-doc__stamp { opacity: 0; scale: 1.8; }
  .us-reel__work li { transition: opacity 500ms var(--ease-out), translate 700ms var(--ease-out-expo); transition-delay: calc(700ms + var(--i) * 120ms); }
  .us-win:not([data-in]) .us-reel__work li { opacity: 0; translate: 0 12px; }
  .us-part__prop path { transition: stroke-dashoffset 1400ms var(--ease-in-out); transition-delay: calc(200ms + var(--i) * 80ms); }
  [data-reveal="props"]:not([data-in]) .us-part__prop path { stroke-dashoffset: 1; }

  /* ===== the hero: one held stage ===== */
  .us-hero { height: 340svh;
    --lift: clamp(0, var(--p, 0) / 0.2, 1);
    --push: clamp(0, (var(--p, 0) - 0.04) / 0.48, 1);
    --open: clamp(0, (var(--p, 0) - 0.08) / 0.32, 1);
    --bend: clamp(0, (var(--p, 0) - 0.56) / 0.26, 1); }
  .us-hero__stage { position: sticky; top: 0; height: 100svh; display: block; }
  .us-hero__floor { inset: 0; height: auto; transform: scale(calc(1 + var(--push) * 0.5)); transform-origin: 50% var(--ay); }
  .us-hero__copy { position: absolute; left: 0; right: 0; top: calc(var(--ay) - var(--ah) / 2 - 44px); padding: 0 var(--us-gut);
    transform: translateY(-100%) translateY(calc(var(--lift) * -12svh)); opacity: calc(1 - var(--lift) * 1.1); }
  .us-hero__slot { position: absolute; left: calc(50% - var(--aw) / 2); top: calc(var(--ay) - var(--ah) / 2); margin: 0; }
  .us-hero__mark { visibility: hidden; }
  .us-hero__rings { display: block; position: absolute; inset: 0; opacity: calc(1 - var(--lift) * 3); }
  .us-hero__rings i { position: absolute; left: 50%; bottom: 0; width: 240%; aspect-ratio: 3.2; border-radius: 50%; border: 1.5px solid color-mix(in oklab, var(--us-cue) 55%, transparent); translate: -50% 50%; scale: 0; }
  .us-hero__rings[data-active="true"] i { animation: us-ring 3.6s var(--ease-out) infinite; }
  .us-hero__rings i:nth-child(2) { animation-delay: 1.2s; }
  .us-hero__rings i:nth-child(3) { animation-delay: 2.4s; }

  .us-house { position: absolute; inset: 0;
    clip-path: inset(calc(var(--ay) - var(--ah) / 2) calc(50% - var(--aw) / 2) calc(100% - var(--ay) - var(--ah) / 2) calc(50% - var(--aw) / 2) round calc(var(--aw) / 2) calc(var(--aw) / 2) 3px 3px); }
  .us-curtains { display: block; position: absolute; inset: 0; }
  .us-curtain { position: absolute; top: 0; bottom: 0; width: 50.5%;
    background: linear-gradient(90deg, color-mix(in oklab, var(--us-ink) 30%, transparent), transparent 30%, transparent 70%, color-mix(in oklab, var(--us-ink) 40%, transparent)),
      repeating-linear-gradient(90deg, var(--us-night) 0 22px, color-mix(in oklab, var(--us-night) 55%, var(--us-ink)) 22px 34px, var(--us-night) 34px 46px);
    animation: us-breathe-l 3.8s var(--ease-in-out) 1.6s infinite; }
  .us-curtain--l { left: 0; transform: translateX(calc(var(--open) * -101%)); box-shadow: inset -1px 0 0 color-mix(in oklab, var(--us-cue-light) 30%, transparent); }
  .us-curtain--r { right: 0; transform: translateX(calc(var(--open) * 101%)); animation-name: us-breathe-r; }
  /* skip rendering held scenes until they're near; their heights are explicit, so measurements stay exact */
  .us-casting, .us-contract, .us-finale { content-visibility: auto; }
  .us-curtains__slit { position: absolute; left: calc(50% - var(--aw) * 0.13); top: calc(var(--ay) + var(--ah) * 0.13); width: calc(var(--aw) * 0.26); height: calc(var(--ah) * 0.37);
    clip-path: polygon(50% 0, 100% 100%, 0 100%); background: linear-gradient(var(--us-cue), var(--us-cue-light)); opacity: calc(1 - var(--open) * 4); }
  .us-house__in { position: absolute; inset: 0; display: block; padding: 0; }
  .us-house:not([data-open]) .us-house__in { display: none; }
  .us-house__h { position: absolute; left: 0; right: 0; top: 50%; translate: 0 -64%; padding: 0 var(--us-gut); }
  .us-digit > span { translate: 0 calc((1 - clamp(0, (var(--p, 0) - 0.48 - var(--i) * 0.03) / 0.08, 1)) * 108%); }
  .us-house__l > span { translate: 0 calc((1 - clamp(0, (var(--p, 0) - 0.64 - var(--i) * 0.04) / 0.08, 1)) * 110%); }
  .us-house__rows { position: absolute; left: 0; right: 0; bottom: max(120px, 15svh); display: grid; gap: 26px; opacity: var(--bend); }
  .us-house__row { position: relative; display: block; height: 30px; }
  .us-house__item { position: absolute; left: 50%; top: 0; width: 200px; margin-left: -100px; display: flex; justify-content: center; color: color-mix(in oklab, var(--us-house) 78%, transparent); will-change: transform; }
  .us-house__item[data-copy] { display: flex; }
  .us-nudge { position: absolute; left: 50%; bottom: max(96px, 13svh); z-index: 5; display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--us-graphite);
    animation: us-nudge 700ms var(--ease-out) 1.9s both; transition: opacity var(--dur-base); }
  .us-nudge__mouse { position: relative; width: 14px; height: 22px; border: 1.5px solid currentColor; border-radius: 8px; }
  .us-nudge__wheel { position: absolute; left: 50%; top: 4px; width: 2px; height: 5px; margin-left: -1px; border-radius: 1px; background: currentColor; animation: us-wheel 1.6s var(--ease-in-out) infinite; }
  html[data-us-scrolled] .us-nudge { opacity: 0 !important; animation-play-state: paused; }

  /* ===== parts: an endless ring (positions from useRing; this is the same layout before it runs) ===== */
  .us-parts { --card-h: clamp(290px, 41svh, 400px); --card-w: calc(var(--card-h) * 4 / 5.3); }
  .us-parts__stage { padding: max(84px, 11svh) 0 max(96px, 11svh); }
  .us-parts__band { position: relative; height: calc(var(--card-h) + 76px); margin-top: clamp(24px, 4svh, 44px); padding-inline: var(--us-gut); overflow: clip; touch-action: pan-y; cursor: grab; user-select: none; }
  .us-parts__band[data-dragging] { cursor: grabbing; }
  .us-parts__track { position: absolute; inset: 0; display: block; padding: 0; overflow: visible; scroll-snap-type: none; }
  .us-part-slot { position: absolute; left: 0; top: 14px; transform: translateX(calc(var(--i) * (var(--card-w) + 16px) + var(--us-gut))); will-change: transform; }
  .us-part { height: var(--card-h); width: var(--card-w); }
  .us-part__flip { cursor: inherit; }

  /* ===== rehearsal: the bowl, the wave, the drawn line ===== */
  .us-rehearse__hold { --wp: var(--fed, 0); }
  .us-bowl { transform: scaleY(calc(1 - clamp(0, var(--p, 0) / 0.08, 1) * 0.9)); }
  .us-wave { --w: calc(var(--wp, 1) * (var(--n) + 10) - 5); }
  .us-wave__c { --d: calc(var(--w) - var(--i)); --hot: clamp(0, 1 - max(var(--d), -1 * var(--d)) / 3.5, 1); --lit: clamp(0, var(--d) / 2.5, 1);
    color: color-mix(in oklab, var(--us-cue) calc(var(--hot) * 100%), color-mix(in oklab, var(--us-ink) calc(var(--lit) * 100%), var(--us-wave-dim)));
    translate: 0 calc(var(--hot) * -0.05em); }
  .us-wave__w--cue .us-wave__c { color: color-mix(in oklab, var(--us-cue) calc(max(var(--hot), var(--lit)) * 100%), var(--us-wave-dim)); }
  .us-wave__pop { --pop: clamp(0, (var(--w) - var(--n)) / 2.5, 1); scale: calc(var(--pop) * (1 + var(--pop) * (1 - var(--pop)) * 0.9)); }
  .us-thread__lead path { stroke-dashoffset: calc(1 - clamp(0, var(--p, 0) / 0.05, 1)); }
  .us-thread__rail b { transform: scaleY(clamp(0, (var(--p, 0) - 0.04) / 0.9, 1)); }

  /* ===== casting: held while the callbacks come in ===== */
  .us-casting { height: 280svh;
    --q: clamp(0, (var(--p, 0) - 0.12) / 0.68, 1); }
  .us-casting__stage { position: sticky; top: 0; height: 100svh; padding-top: 9svh; padding-bottom: 90px; }
  .us-cast { width: min(1160px, 100%, calc((100svh - 300px) * 2)); }
  .us-cast__net path { stroke-dashoffset: calc(1 - clamp(0, (var(--q) - var(--i) * 0.1) / 0.1, 1)); }
  .us-cast__co:not([data-on]) { opacity: 0; scale: 0.5; }

  /* ===== contract: the cue, the signature, the seal, the price ===== */
  .us-contract { height: 250svh;
    --wp: clamp(0, (var(--p, 0) - 0.05) / 0.5, 1);
    --deal: clamp(0, (var(--wp) - 0.56) / 0.12, 1);
    --sign: clamp(0, (var(--wp) - 0.86) / 0.14, 1);
    --seal: clamp(0, (var(--p, 0) - 0.57) / 0.06, 1);
    --price: clamp(0, (var(--p, 0) - 0.64) / 0.1, 1);
    --acts: clamp(0, (var(--p, 0) - 0.7) / 0.1, 1);
    --facts: clamp(0, (var(--p, 0) - 0.76) / 0.1, 1); }
  .us-contract__stage { position: sticky; top: 0; height: 100svh; padding-bottom: 96px; }
  .us-deal { opacity: var(--deal); transform: scale(calc(0.2 + var(--deal) * 0.8)) rotate(calc((1 - var(--deal)) * -28deg)); }
  .us-deal__sig path { stroke-dashoffset: calc(1 - var(--sign)); }
  .us-deal__seal { scale: calc(var(--seal) * (1 + var(--seal) * (1 - var(--seal)) * 1.4)); rotate: calc((1 - var(--seal)) * -60deg); }
  .us-contract__price .us-contract__l { opacity: var(--price); translate: 0 calc((1 - var(--price)) * 22px); }
  .us-contract__acts { opacity: var(--acts); translate: 0 calc((1 - var(--acts)) * 22px); }
  .us-contract__facts { opacity: var(--facts); translate: 0 calc((1 - var(--facts)) * 18px); }

  /* ===== finale: the house lights come up ===== */
  .us-finale { height: 200svh; --lit: clamp(0, var(--p, 0) / 0.62, 1); --ring: clamp(0, (var(--p, 0) - 0.42) / 0.3, 1); }
  .us-finale__stage { position: sticky; top: 0; }
  .us-finale__lit { clip-path: circle(calc(var(--lit) * 95%) at 50% 30%); }
  .us-finale__line span { opacity: calc(0.3 + var(--lit) * 0.7); }
  .us-ring { opacity: var(--ring); scale: calc(0.7 + var(--ring) * 0.3); }
}

/* ---------- phones ---------- */
@media (max-width: 860px) {
  .us-live .us-mono { display: none; }
  .us-dock__start { min-width: 128px; }
  .us-sc { grid-template-columns: 1fr; gap: 22px; min-height: 0; padding: 7svh 0 7svh 38px; }
  .us-sc__node { left: 1px; top: calc(7svh + 2px); margin-top: 0; }
  .us-thread__rail { left: calc(var(--us-gut) + 7px); }
  .us-thread__lead { height: 120px; }
  .us-thread__rail { top: 118px; }
  .us-win__body { aspect-ratio: auto; min-height: 260px; }
  .us-lot__map { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, 1fr); min-height: 300px; }
  .us-lot__brief { width: 72%; }
  .us-chat { grid-template-columns: 1fr; }
  .us-chat__side { display: none; }
  .us-doc { grid-template-columns: 1fr; }
  .us-doc__page { display: none; }
  .us-doc__notes { padding-bottom: 30px; }
  .us-cast { aspect-ratio: auto; display: grid; gap: 14px; }
  .us-cast__net { display: none; }
  .us-cast__reel { position: relative; left: auto; top: auto; width: min(100%, 420px); margin: 0 auto; }
  .us-cast__win .us-reel__work { display: none; }
  .us-cast__win .us-win__body { aspect-ratio: auto; }
  .us-cast__cos { position: relative; inset: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .us-cast__co { position: relative; left: auto; top: auto; translate: none; padding: 9px 10px; }
  .us-cast__co .us-co { font-size: 13.5px; }
  .us-cast__count { position: relative; left: auto; bottom: auto; translate: none; justify-content: center; }
  .us-odo { font-size: 34px; }
  .us-contract__stage { gap: 18px; }
  .us-contract__facts { gap: 8px; margin-top: 1svh; padding-top: 14px; }
  .us-contract__facts b { font-size: 22px; }
  .us-contract__facts span { font-size: 12px; line-height: 1.3; }
  .us-finale__foot { font-size: 12px; }
  .us-finale__mist { height: 44%; background: linear-gradient(var(--us-house) 50%, transparent); }
  .us-finale__line { top: 9%; }
  .us-ring { top: 54%; }
  .us-cast__co { padding: 7px 10px; }
}
@media (max-width: 860px) and (prefers-reduced-motion: no-preference) and (scripting: enabled) {
  .us-casting { height: 240svh; }
  .us-casting__stage { padding-top: 76px; gap: 2svh; }
  .us-cast { width: 100%; }
  .us-cast__reel { width: min(100%, 270px); }
  .us-cast__win .us-reel__stats b { font-size: 16px; }
  .us-parts { --card-h: clamp(290px, 42svh, 360px); }
  .us-parts__hint { display: none; }
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/ask/answer.ts">
<![CDATA[import { FALLBACK, FAQ, type Faq } from "../content/faq";

export const tokens = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9$\s-]/g, " ").split(/\s+/).filter(Boolean).map((t) => t.replace(/^\$/, ""));

/** Score each FAQ entry by keyword hits (plural-tolerant), and return the best one, or null under one hit. */
export function match(question: string, faq: Faq[] = FAQ): Faq | null {
  const words = tokens(question);
  let best: Faq | null = null;
  let bestScore = 0;
  for (const entry of faq) {
    const score = entry.keywords.reduce((sum, k) => sum + (words.some((w) => w === k || w === `${k}s` || `${w}s` === k) ? 1 : 0), 0);
    if (score > bestScore) { best = entry; bestScore = score; }
  }
  return bestScore > 0 ? best : null;
}

export const answer = (question: string, faq: Faq[] = FAQ) => match(question, faq)?.answer ?? FALLBACK;
]]>
    </file>
    <file path="src/app/(understudy)/understudy/ask/AskSheet.tsx">
<![CDATA["use client";
import { useRef, useState, type FormEvent } from "react";
import { FAQ, SUGGESTED } from "../content/faq";
import { Mark } from "../brand/Logo";
import { useSheet } from "../dock/useSheet";
import { answer } from "./answer";

type Line = { id: number; who: "you" | "us"; text: string };

/** Ask Understudy: the FAQ is a question you type. Answers come from a local keyword match, after a short typing beat. */
export function AskSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([{ id: 0, who: "us", text: "Hi. Ask me anything about rehearsing a part, your cast or getting cast." }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const next = useRef(1);
  useSheet(open, ref, onClose, inputRef);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    setLines((l) => [...l, { id: next.current++, who: "you", text: q }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setLines((l) => [...l, { id: next.current++, who: "us", text: answer(q) }]);
      requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }));
    }, 750);
    requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }));
  };

  const submit = (e: FormEvent) => { e.preventDefault(); ask(draft); };
  const asked = new Set(lines.filter((l) => l.who === "you").map((l) => l.text));

  return (
    <div ref={ref} id="us-ask-sheet" className="us-sheet us-sheet--ask" role="dialog" aria-modal="true" aria-labelledby="us-ask-t" data-open={open} inert={!open}>
      <div className="us-sheet__head us-ask__head">
        <span className="us-ask__mk"><Mark /></span>
        <p id="us-ask-t" className="us-ask__t">Ask Understudy</p>
        <button type="button" className="us-x" onClick={onClose}><span className="us-sr">Close</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
      </div>
      <div ref={logRef} className="us-ask__log" aria-live="polite" data-lenis-prevent>
        {lines.map((l) => <p key={l.id} className={`us-bubble us-bubble--${l.who}`}>{l.text}</p>)}
        {typing && <p className="us-bubble us-bubble--us us-bubble--typing"><span className="us-sr">Typing</span><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /></p>}
      </div>
      <div className="us-ask__chips">
        {SUGGESTED.map((id) => FAQ.find((f) => f.id === id)!).filter((f) => !asked.has(f.question)).map((f) => (
          <button key={f.id} type="button" className="us-chip us-chip--light" onClick={() => ask(f.question)} disabled={typing}>{f.question}</button>
        ))}
      </div>
      <form className="us-ask__form" onSubmit={submit}>
        <label htmlFor="us-ask-in" className="us-sr">Ask anything about Understudy</label>
        <input ref={inputRef} id="us-ask-in" type="text" maxLength={160} placeholder="Ask anything about Understudy" value={draft} onChange={(e) => setDraft(e.target.value)} autoComplete="off" />
        <button type="submit" className="us-ask__send" disabled={!draft.trim() || typing}>
          <span className="us-sr">Send</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
        </button>
      </form>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/brand/CompanyMark.tsx">
<![CDATA[import type { Company, Glyph } from "../content/companies";

const GLYPHS: Record<Glyph, string> = {
  dot: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z",
  square: "M5 5h14v14H5Z",
  tri: "M12 4 21 20H3Z",
  wave: "M2 14c3-5 6-5 9 0s6 5 9 0v6H2Z",
  ring: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  bars: "M4 13h4v7H4ZM10 8h4v12h-4ZM16 4h4v16h-4Z",
  leaf: "M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z",
  spark: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z",
};

/** A fictional wordmark: a small glyph and the name, set in one of six type treatments. */
export function CompanyMark({ company, className }: { company: Company; className?: string }) {
  return (
    <span className={`us-co us-co--${company.treatment} ${className ?? ""}`}>
      <svg className="us-co__g" viewBox="0 0 24 24" aria-hidden="true"><path d={GLYPHS[company.glyph]} fill="currentColor" fillRule="evenodd" /></svg>
      <span className="us-co__n">{company.name}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/brand/Logo.tsx">
<![CDATA[/**
 * The mark is a proscenium: a rounded-top arch with the curtain parted at its foot.
 * The same arch is the dark house's clip-path in the hero, so the logo is the door you scroll through.
 */
export const ARCH_PATH = "M6 46V22C6 12.06 14.06 4 24 4s18 8.06 18 18v24H28.6L24 30.5 19.4 46H6Z";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={ARCH_PATH} fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, label = "Understudy" }: { className?: string; label?: string }) {
  return (
    <span className={`us-logo ${className ?? ""}`} role="img" aria-label={label}>
      <Mark className="us-logo__mark" />
      <span className="us-logo__word" aria-hidden="true">understudy</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/brand/Props.tsx">
<![CDATA[import type { PartTag, PropGlyph } from "../content/parts";

/** The prop each part's card stands in its spotlight: one line drawing per kind of work. */
const PROPS: Record<PropGlyph, string> = {
  chart: "M14 84V40M38 84V22M62 84V52M86 84V30M6 84h88",
  braces: "M34 14c-12 0-12 8-12 18s-2 18-12 18c10 0 12 8 12 18s0 18 12 18M66 14c12 0 12 8 12 18s2 18 12 18c-10 0-12 8-12 18s0 18-12 18M44 66l12-32",
  cursor: "M24 12v64l18-17 12 27 12-5-12-27h25Z",
  nib: "M50 10 74 46 56 88H44L26 46ZM50 10v44M50 54a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z",
  megaphone: "M14 40v20h14l40 22V18L28 40ZM28 60l8 26h12l-6-24M78 38c6 4 6 20 0 24",
  gear: "M50 30a20 20 0 1 0 0 40 20 20 0 0 0 0-40ZM50 6v14M50 80v14M6 50h14M80 50h14M19 19l10 10M71 71l10 10M19 81l10-10M71 29l10-10",
  flask: "M40 10h20M44 10v28L18 82c-2 5 1 8 6 8h52c5 0 8-3 6-8L56 38V10M28 66h44",
  compass: "M50 8a42 42 0 1 1 0 84 42 42 0 0 1 0-84ZM64 36 56 56 36 64l8-20Z",
  bubble: "M14 22h72v44H44L26 82V66H14ZM30 40h40M30 52h26",
  stack: "M50 12 88 32 50 52 12 32ZM12 50l38 20 38-20M12 68l38 20 38-20",
};

export function Prop({ glyph, className }: { glyph: PropGlyph; className?: string }) {
  return (
    <svg className={`us-prop ${className ?? ""}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={PROPS[glyph]} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export function TagIcon({ tag }: { tag: PartTag }) {
  const d = tag === "hot" ? "M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-6 1-9Z"
    : tag === "rising" ? "M3 17 10 10l4 4 7-7M15 7h6v6" : "M12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10Z";
  return (
    <svg className="us-tag__i" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill={tag === "rising" ? "none" : "currentColor"} stroke={tag === "rising" ? "currentColor" : "none"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** An abstract face for the cast and the director: a head, shoulders and a tone. */
export function Face({ tone = 0, className }: { tone?: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <svg className={`us-face us-face--${tone} ${className ?? ""}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle className="us-face__bg" cx="20" cy="20" r="20" />
      <circle className="us-face__head" cx="20" cy="16" r="7" />
      <path className="us-face__body" d="M7 36c1.5-7 6.5-11 13-11s11.5 4 13 11a19.9 19.9 0 0 1-26 0Z" />
    </svg>
  );
}

/** The cue light that pops at the end of a held line: a small bulb on a stand, glowing. */
export function CueDot({ className }: { className?: string }) {
  return (
    <span className={`us-cuedot ${className ?? ""}`} aria-hidden="true">
      <Face tone={1} className="us-cuedot__face" />
      <i className="us-cuedot__ring" />
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/brand/StageFloor.tsx">
<![CDATA[/**
 * The studio seen from above: the stage, its apron, the wings, three blocks of seats
 * and the spike tape actors stand on. Drawn once, shown pale in the hero and lit in the finale.
 */
const CX = 800;
const CY = 432;
const ROWS = Array.from({ length: 11 }, (_, i) => 250 + i * 46);
const BLOCKS: [number, number][] = [[22, 63], [68, 112], [117, 158]];

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};

const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

const sector = (r0: number, r1: number, a0: number, a1: number) => {
  const [ax, ay] = polar(r1, a0);
  const [bx, by] = polar(r1, a1);
  const [cx, cy] = polar(r0, a1);
  const [dx, dy] = polar(r0, a0);
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}A${r1} ${r1} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}L${cx.toFixed(1)} ${cy.toFixed(1)}A${r0} ${r0} 0 0 0 ${dx.toFixed(1)} ${dy.toFixed(1)}Z`;
};

type Spike = { x: number; y: number; kind: "x" | "t" | "l"; tone: "tape" | "cue" | "white"; r?: number };
const SPIKES: Spike[] = [
  { x: 520, y: 210, kind: "x", tone: "tape" }, { x: 660, y: 300, kind: "t", tone: "cue", r: 12 },
  { x: 940, y: 250, kind: "x", tone: "white" }, { x: 1080, y: 330, kind: "l", tone: "tape", r: -20 },
  { x: 720, y: 180, kind: "l", tone: "cue", r: 40 }, { x: 880, y: 390, kind: "t", tone: "tape", r: -8 },
  { x: 600, y: 420, kind: "x", tone: "cue" }, { x: 1010, y: 190, kind: "t", tone: "white", r: 30 },
  { x: 450, y: 340, kind: "l", tone: "white", r: 90 }, { x: 1150, y: 230, kind: "x", tone: "cue" },
  { x: 790, y: 245, kind: "x", tone: "tape" },
];

function SpikeMark({ x, y, kind, tone, r = 0 }: Spike) {
  const d = kind === "x" ? "M-11 -11 11 11M11 -11 -11 11" : kind === "t" ? "M-13 -9H13M0 -9V12" : "M-10 -12V10H12";
  return <path className={`us-floor__spike us-floor__spike--${tone}`} d={d} transform={`translate(${x} ${y}) rotate(${r})`} />;
}

export function StageFloor({ variant, className }: { variant: "pale" | "lit"; className?: string }) {
  return (
    <svg className={`us-floor us-floor--${variant} ${className ?? ""}`} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {/* seat blocks */}
      {BLOCKS.map(([a0, a1], b) => (
        <path key={`s${b}`} className={`us-floor__block us-floor__block--${b}`} d={sector(ROWS[0] - 18, ROWS[ROWS.length - 1] + 18, a0, a1)} />
      ))}
      {BLOCKS.flatMap(([a0, a1], b) => ROWS.map((r, i) => <path key={`r${b}-${i}`} className="us-floor__row" d={arc(r, a0, a1)} />))}
      {/* the stage, its wings and apron */}
      <path className="us-floor__stage" d="M380 110H1220V470Q800 560 380 470Z" />
      <path className="us-floor__wing" d="M240 130H372V450H240ZM1228 130H1360V450H1228Z" />
      <path className="us-floor__line" d="M360 470H1240" />
      {Array.from({ length: 7 }, (_, i) => <path key={`g${i}`} className="us-floor__grid" d={`M${480 + i * 106} 120V462`} />)}
      {Array.from({ length: 3 }, (_, i) => <path key={`h${i}`} className="us-floor__grid" d={`M390 ${200 + i * 90}H1210`} />)}
      {SPIKES.map((s, i) => <SpikeMark key={i} {...s} />)}
      {/* the ghost light, left burning on an empty stage */}
      <circle className="us-floor__glow" cx="800" cy="300" r="70" />
      <circle className="us-floor__bulb" cx="800" cy="300" r="9" />
      {/* aisles */}
      {[65.5, 114.5].map((a) => { const [x0, y0] = polar(ROWS[0] - 18, a); const [x1, y1] = polar(ROWS[ROWS.length - 1] + 30, a); return <path key={a} className="us-floor__aisle" d={`M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`} />; })}
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/content/companies.ts">
<![CDATA[/** The fictional companies casting from the studio. Each wordmark is drawn from a glyph and a type treatment. */
export type Glyph = "dot" | "square" | "tri" | "wave" | "ring" | "bars" | "leaf" | "spark";
export type Treatment = "bold" | "light" | "caps" | "mono" | "serif" | "round";

export type Company = { id: string; name: string; glyph: Glyph; treatment: Treatment; sector: string };

export const COMPANIES: Company[] = [
  { id: "parcelpost", name: "Parcelpost", glyph: "square", treatment: "bold", sector: "Logistics" },
  { id: "halcyon", name: "Halcyon Bank", glyph: "ring", treatment: "serif", sector: "Fintech" },
  { id: "fernway", name: "fernway", glyph: "leaf", treatment: "round", sector: "Health" },
  { id: "lumen", name: "LUMEN GAMES", glyph: "spark", treatment: "caps", sector: "Games" },
  { id: "quillo", name: "Quillo", glyph: "dot", treatment: "light", sector: "Writing tools" },
  { id: "tidewell", name: "Tidewell", glyph: "wave", treatment: "bold", sector: "Energy" },
  { id: "arbor", name: "Arbor&Co", glyph: "tri", treatment: "serif", sector: "Retail" },
  { id: "kestrel", name: "kestrel", glyph: "bars", treatment: "mono", sector: "Analytics" },
  { id: "brightloop", name: "Brightloop", glyph: "ring", treatment: "round", sector: "Education" },
  { id: "pinecrest", name: "PINECREST", glyph: "tri", treatment: "caps", sector: "Insurance" },
  { id: "sundry", name: "sundry", glyph: "dot", treatment: "bold", sector: "Groceries" },
  { id: "ledgerly", name: "Ledgerly", glyph: "bars", treatment: "light", sector: "Accounting" },
  { id: "wavelength", name: "Wavelength", glyph: "wave", treatment: "serif", sector: "Audio" },
  { id: "otterly", name: "otterly", glyph: "leaf", treatment: "round", sector: "Pet care" },
  { id: "fieldnote", name: "Fieldnote", glyph: "square", treatment: "mono", sector: "Research" },
  { id: "copperline", name: "COPPERLINE", glyph: "spark", treatment: "caps", sector: "Telecom" },
  { id: "nimbus", name: "Nimbus Rail", glyph: "wave", treatment: "light", sector: "Transport" },
  { id: "saltbox", name: "Saltbox", glyph: "square", treatment: "bold", sector: "Hospitality" },
];

/** The ten companies that call back in the casting scene, alternating left and right of the reel. */
export const CALLBACKS = ["parcelpost", "halcyon", "lumen", "fernway", "kestrel", "tidewell", "brightloop", "ledgerly", "arbor", "wavelength"] as const;

export const companyById = (id: string): Company => {
  const company = COMPANIES.find((c) => c.id === id);
  if (!company) throw new Error(`unknown company ${id}`);
  return company;
};

/** The two drifting rows on the dark house: the list split in half, the second row reversed. */
export const HOUSE_ROWS: [Company[], Company[]] = [COMPANIES.slice(0, 9), COMPANIES.slice(9).reverse()];

/** The headline figure on the dark house. */
export const CASTING_COMPANIES = 3400;
]]>
    </file>
    <file path="src/app/(understudy)/understudy/content/faq.ts">
<![CDATA[/** Ask Understudy: the FAQ is a question you type. Each answer lists the words that call it. */
export type Faq = { id: string; question: string; answer: string; keywords: string[] };

export const FAQ: Faq[] = [
  { id: "price", question: "How much does it cost?", keywords: ["cost", "price", "pay", "money", "fee", "expensive", "month", "free", "89"],
    answer: "Opening night is free: your first part's first week costs nothing. After that it's $89 a month, and you can stop between runs." },
  { id: "experience", question: "Do I need any experience?", keywords: ["experience", "beginner", "degree", "background", "junior", "start", "new", "zero"],
    answer: "No. Every part starts at the first table read. Your director pitches the brief at your level and raises it as you go." },
  { id: "time", question: "How many hours a week?", keywords: ["hours", "time", "week", "weekly", "schedule", "evenings", "part-time", "long"],
    answer: "About 10 hours a week. Call times are set with your cast, and most runs fit around a day job." },
  { id: "real", question: "Are the companies real?", keywords: ["real", "fake", "simulated", "companies", "company", "studio", "pretend"],
    answer: "The companies inside the studio are simulated, but the work is real: real data, real briefs, a real reel at the end. The 3,400 companies casting from it are hiring for real." },
  { id: "hired", question: "Will I actually get hired?", keywords: ["hired", "job", "jobs", "guarantee", "offer", "cast", "casting", "interview", "recruiter"],
    answer: "We can't promise an offer, but your reel goes to the companies casting for your part. Last season, 62% of finished reels got a callback within six weeks." },
  { id: "team", question: "Who is in my cast?", keywords: ["team", "cast", "people", "group", "alone", "peers", "others"],
    answer: "A cast is four to six people rehearsing the same company, each in a different part, so you work the way a real team does." },
  { id: "director", question: "What does a director do?", keywords: ["director", "coach", "mentor", "manager", "notes", "feedback", "review"],
    answer: "Your director has done the job for years. They set the brief, give notes on every draft and sign off your reel." },
  { id: "reel", question: "What is a reel?", keywords: ["reel", "portfolio", "proof", "resume", "cv", "show", "work"],
    answer: "Your reel is a page of the work you shipped, with your director's notes and the numbers you moved. Recruiters can open every project." },
];

export const SUGGESTED = ["price", "experience", "hired", "time"] as const;

export const FALLBACK =
  "I don't have that one yet. Try asking about price, hours, your cast, your director or your reel, or write to hello@understudy.example.";
]]>
    </file>
    <file path="src/app/(understudy)/understudy/content/parts.ts">
<![CDATA[/** A part is a role you rehearse: a real job, played at one of the studio's simulated companies. */
export type Field = "product" | "engineering" | "data" | "design" | "growth" | "operations";
export type PartTag = "hot" | "rising" | "new";
export type PropGlyph = "chart" | "braces" | "cursor" | "nib" | "megaphone" | "gear" | "flask" | "compass" | "bubble" | "stack";

export type Part = {
  id: string;
  title: string;
  field: Field;
  tag: PartTag | null;
  /** weeks in a run, from first brief to the finished reel */
  weeks: number;
  company: string;
  brief: string;
  ships: [string, string, string];
  tools: string[];
  prop: PropGlyph;
};

export const FIELDS: { id: Field | "all"; label: string }[] = [
  { id: "all", label: "Popular" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "data", label: "Data" },
  { id: "design", label: "Design" },
  { id: "growth", label: "Growth" },
  { id: "operations", label: "Operations" },
];

export const PARTS: Part[] = [
  { id: "ai-engineer", title: "AI Engineer", field: "engineering", tag: "hot", weeks: 8, company: "quillo",
    brief: "Ship a writing assistant that cites its sources.",
    ships: ["A retrieval pipeline over 40k docs", "An eval suite with 120 cases", "A launch note for the team"], tools: ["Python", "Vector DB", "Evals"], prop: "braces" },
  { id: "product-analyst", title: "Product Analyst", field: "data", tag: "hot", weeks: 6, company: "parcelpost",
    brief: "Find why 31% of carts stall at the address step.",
    ships: ["A funnel model in SQL", "Three ranked fixes", "A readout for the director"], tools: ["SQL", "Notebooks", "Dashboards"], prop: "chart" },
  { id: "product-manager", title: "Product Manager", field: "product", tag: "rising", weeks: 8, company: "fernway",
    brief: "Cut a clinic's no-show rate with one feature.",
    ships: ["A one-page spec", "A prioritised roadmap", "A launch you run with the cast"], tools: ["Specs", "Interviews", "Roadmaps"], prop: "compass" },
  { id: "product-designer", title: "Product Designer", field: "design", tag: "hot", weeks: 7, company: "brightloop",
    brief: "Redesign onboarding so a class starts in two minutes.",
    ships: ["A tested prototype", "A small design system", "A crit you present"], tools: ["Figma", "Prototyping", "Usability tests"], prop: "cursor" },
  { id: "growth-marketer", title: "Growth Marketer", field: "growth", tag: "rising", weeks: 6, company: "sundry",
    brief: "Win back lapsed shoppers without a discount.",
    ships: ["Two live experiments", "A lifecycle email series", "A results memo"], tools: ["Experiments", "CRM", "Copy"], prop: "megaphone" },
  { id: "data-scientist", title: "Data Scientist", field: "data", tag: null, weeks: 8, company: "tidewell",
    brief: "Forecast next week's demand on a regional grid.",
    ships: ["A forecasting model", "An error budget", "A chart the board can read"], tools: ["Python", "Forecasting", "Plots"], prop: "flask" },
  { id: "frontend-engineer", title: "Frontend Engineer", field: "engineering", tag: "new", weeks: 7, company: "lumen",
    brief: "Build the store page for a game launching Friday.",
    ships: ["A fast, accessible store page", "A component library", "A code review you lead"], tools: ["TypeScript", "React", "Testing"], prop: "stack" },
  { id: "content-designer", title: "Content Designer", field: "design", tag: null, weeks: 5, company: "halcyon",
    brief: "Rewrite the overdraft flow so nobody panics.",
    ships: ["A rewritten flow", "A voice guide", "Before-and-after test results"], tools: ["UX writing", "Research", "Style guides"], prop: "nib" },
  { id: "ops-analyst", title: "Operations Analyst", field: "operations", tag: "new", weeks: 6, company: "saltbox",
    brief: "Get 14 hotels to check guests in under three minutes.",
    ships: ["A process map", "A staffing model", "A playbook the front desk uses"], tools: ["Spreadsheets", "Process maps", "SQL"], prop: "gear" },
  { id: "customer-success", title: "Customer Success Lead", field: "operations", tag: "rising", weeks: 5, company: "ledgerly",
    brief: "Save the three accounts most likely to leave this quarter.",
    ships: ["A health score", "Three rescue plans", "A renewal call you run"], tools: ["CRM", "Calls", "Playbooks"], prop: "bubble" },
];

export const partsIn = (field: Field | "all"): Part[] =>
  field === "all" ? PARTS.filter((p) => p.tag !== null).concat(PARTS.filter((p) => p.tag === null)) : PARTS.filter((p) => p.field === field);

export const partById = (id: string): Part | undefined => PARTS.find((p) => p.id === id);

export const TAG_LABEL: Record<PartTag, string> = { hot: "Hot", rising: "Rising", new: "New" };
]]>
    </file>
    <file path="src/app/(understudy)/understudy/dock/Dock.tsx">
<![CDATA["use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { goto } from "./goto";

// the sheets are split out of the first load and fetched when the browser is idle
const loadMenu = () => import("./MenuSheet");
const loadStart = () => import("../forms/AuditionSheet");
const loadAsk = () => import("../ask/AskSheet");
const MenuSheet = dynamic(() => loadMenu().then((m) => m.MenuSheet), { ssr: false });
const AuditionSheet = dynamic(() => loadStart().then((m) => m.AuditionSheet), { ssr: false });
const AskSheet = dynamic(() => loadAsk().then((m) => m.AskSheet), { ssr: false });

export type SheetName = "menu" | "start" | "ask" | null;

/**
 * The only navigation, docked at the foot of the screen in glass: Start, the menu and a
 * question mark. Any element with `data-us-start` (optionally `data-us-part`) or `data-us-ask`
 * elsewhere on the page opens the matching sheet, so the server-rendered sections stay static.
 */
export function Dock() {
  const [sheet, setSheet] = useState<SheetName>(null);
  const [part, setPart] = useState<string | undefined>(undefined);
  // sheets mount on first use, so their forms and data cost nothing at load
  const [mounted, setMounted] = useState<Record<Exclude<SheetName, null>, boolean>>({ menu: false, start: false, ask: false });
  const mountedRef = useRef(mounted);
  const close = useCallback(() => setSheet(null), []);
  const startRef = useRef<HTMLButtonElement>(null);

  /** Open a sheet; a sheet that has never been shown mounts closed first, so its opening transition still plays. */
  const show = useCallback((name: Exclude<SheetName, null>) => {
    if (mountedRef.current[name]) { setSheet(name); return; }
    mountedRef.current = { ...mountedRef.current, [name]: true };
    setMounted(mountedRef.current);
    requestAnimationFrame(() => requestAnimationFrame(() => setSheet(name)));
  }, []);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = (e.target as Element).closest<HTMLElement>("[data-us-start], [data-us-ask], [data-us-go]");
      if (!el || el.closest(".us-dock")) return;
      e.preventDefault();
      if (el.hasAttribute("data-us-go")) { setSheet(null); goto(el.dataset.usGo ?? "top"); return; }
      if (el.hasAttribute("data-us-ask")) { show("ask"); return; }
      setPart(el.dataset.usPart);
      show("start");
    };
    document.addEventListener("click", click);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const warm = idle(() => { void loadStart(); void loadMenu(); void loadAsk(); });
    return () => {
      document.removeEventListener("click", click);
      (window.cancelIdleCallback ?? window.clearTimeout)(warm);
    };
  }, [show]);

  const toggle = (name: Exclude<SheetName, null>) => () => {
    if (name === "start") setPart(undefined);
    if (sheet === name) setSheet(null); else show(name);
  };

  return (
    <>
      <div className="us-scrim" data-open={sheet !== null} onClick={close} aria-hidden="true" />
      {mounted.menu && <MenuSheet open={sheet === "menu"} onClose={close} />}
      {mounted.start && <AuditionSheet open={sheet === "start"} onClose={close} part={part} />}
      {mounted.ask && <AskSheet open={sheet === "ask"} onClose={close} />}
      <nav className="us-dock" aria-label="Understudy" data-sheet={sheet ?? "none"}>
        <i className="us-dock__progress" aria-hidden="true" />
        <button ref={startRef} type="button" className="us-dock__start" aria-expanded={sheet === "start"} aria-controls={mounted.start ? "us-start-sheet" : undefined} onClick={toggle("start")}>
          <span className="us-dock__halo" aria-hidden="true" />
          <span className="us-dock__shine" aria-hidden="true" />
          <svg className="us-dock__play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" /></svg>
          <span className="us-roll" data-text="Start"><span>Start</span></span>
        </button>
        <button type="button" className="us-dock__menu" aria-expanded={sheet === "menu"} aria-controls={mounted.menu ? "us-menu-sheet" : undefined} onClick={toggle("menu")}>
          <i aria-hidden="true" /><i aria-hidden="true" />
          <span className="us-sr">Menu</span>
        </button>
        <button type="button" className="us-dock__ask" aria-expanded={sheet === "ask"} aria-controls={mounted.ask ? "us-ask-sheet" : undefined} onClick={toggle("ask")}>
          <span aria-hidden="true">?</span>
          <span className="us-sr">Ask Understudy a question</span>
        </button>
      </nav>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/dock/goto.ts">
<![CDATA[/** Scroll to a scene once a sheet has let go of the page (Lenis ignores scrollTo while stopped). */
export const goto = (id: string) =>
  requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("us:goto", { detail: id }))));
]]>
    </file>
    <file path="src/app/(understudy)/understudy/dock/MenuSheet.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { goto } from "./goto";
import { useSheet } from "./useSheet";

export const MENU = [
  { id: "top", label: "The studio" },
  { id: "parts", label: "Parts" },
  { id: "rehearsal", label: "Rehearsal" },
  { id: "casting", label: "Casting" },
  { id: "pricing", label: "Pricing" },
] as const;

/** The menu: five scenes, a pill that slides to the scene you're in, and links that stagger in. */
export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useSheet(open, ref, onClose);

  useEffect(() => {
    if (!open) return;
    const y = scrollY + innerHeight * 0.4;
    let index = 0;
    MENU.forEach((item, i) => { const el = document.getElementById(item.id); if (el && el.getBoundingClientRect().top + scrollY <= y) index = i; });
    setActive(index);
  }, [open]);

  return (
    <div ref={ref} id="us-menu-sheet" className="us-sheet us-sheet--menu" role="dialog" aria-modal="true" aria-label="Menu" data-open={open} inert={!open}>
      <nav aria-label="Scenes">
        <ul className="us-menu" style={{ "--active": active } as CSSProperties}>
          <i className="us-menu__pill" aria-hidden="true" />
          {MENU.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a className="us-menu__link" href={`#${item.id}`} aria-current={i === active ? "location" : undefined}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                onClick={(e) => { e.preventDefault(); onClose(); goto(item.id); }}>
                <span className="us-menu__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="us-menu__foot"><span className="us-mono">Call time</span> Weekdays 09:00 · 10 hours a week</p>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/dock/useSheet.ts">
<![CDATA["use client";
import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Sheet behaviour shared by the menu, Start and Ask: focus moves in on open and back to the
 * opener on close, Tab is held inside, Escape closes, and the page is held still behind it.
 */
export function useSheet(open: boolean, sheet: RefObject<HTMLElement | null>, onClose: () => void, initial?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const el = sheet.current;
    if (!el) return;
    const opener = document.activeElement as HTMLElement | null;
    window.dispatchEvent(new CustomEvent("us:lock", { detail: true }));
    const raf = requestAnimationFrame(() => (initial?.current ?? el.querySelector<HTMLElement>(FOCUSABLE))?.focus({ preventScroll: true }));
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", key);
      window.dispatchEvent(new CustomEvent("us:lock", { detail: false }));
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, sheet, onClose, initial]);
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/forms/audition.ts">
<![CDATA[import { partById } from "../content/parts";

export type Audition = { name: string; email: string; part: string };
export type AuditionErrors = Partial<Record<keyof Audition, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateAudition(input: Audition): AuditionErrors {
  const errors: AuditionErrors = {};
  const name = input.name.trim();
  if (!name) errors.name = "Tell us what to put on your call sheet.";
  else if (name.length > 60) errors.name = "Keep it under 60 characters.";
  const email = input.email.trim();
  if (!email) errors.email = "We send your call time here.";
  else if (email.length > 254 || !EMAIL.test(email)) errors.email = "That doesn't look like an email address.";
  if (!partById(input.part)) errors.part = "Pick the part you want to rehearse.";
  return errors;
}

export const isValid = (errors: AuditionErrors) => Object.keys(errors).length === 0;

const REF = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** A stable call-sheet reference from the entry, like US-7K2Q. */
export function callSheetRef(input: Audition): string {
  let h = 2166136261;
  for (const ch of `${input.name.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.part}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += REF[h % REF.length];
    h = Math.floor(h / REF.length);
  }
  return `US-${out}`;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Your first call time: the next weekday at 09:00, never today. */
export function firstCallTime(from: Date): { day: string; date: Date } {
  const next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 9, 0, 0, 0);
  while (next.getDay() === 0 || next.getDay() === 6) next.setDate(next.getDate() + 1);
  return { day: DAYS[next.getDay()], date: next };
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/forms/AuditionSheet.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PARTS, partById } from "../content/parts";
import { companyById } from "../content/companies";
import { useSheet } from "../dock/useSheet";
import { callSheetRef, firstCallTime, isValid, validateAudition, type Audition, type AuditionErrors } from "./audition";

type Status = "idle" | "sending" | "done";

/**
 * Start: book a first call time. Validates on the client, morphs the key into a loading state,
 * then swaps the form for a call sheet that slides up and stamps. No network request is made.
 */
export function AuditionSheet({ open, onClose, part }: { open: boolean; onClose: () => void; part?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Audition>({ name: "", email: "", part: part ?? "" });
  const [errors, setErrors] = useState<AuditionErrors>({});
  const [shake, setShake] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ ref: string; day: string; part: string; company: string } | null>(null);
  useSheet(open, ref, onClose, nameRef);

  // opened from a part card: a fresh form with that part chosen, even after an earlier booking
  useEffect(() => {
    if (!open || !part) return;
    setValues((v) => ({ ...v, part }));
    setStatus((s) => (s === "done" ? "idle" : s));
    setResult((r) => (r ? null : r));
  }, [open, part]);

  const set = (key: keyof Audition) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => { const next = { ...er }; delete next[key]; return next; });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    const found = validateAudition(values);
    setErrors(found);
    if (!isValid(found)) {
      setShake((n) => n + 1);
      const first = (["name", "email", "part"] as const).find((k) => found[k]);
      ref.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const chosen = partById(values.part)!;
    window.setTimeout(() => {
      setResult({ ref: callSheetRef(values), day: firstCallTime(new Date()).day, part: chosen.title, company: companyById(chosen.company).name });
      setStatus("done");
    }, 950);
  };

  const reset = () => {
    setValues({ name: "", email: "", part: "" });
    setResult(null);
    setStatus("idle");
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const field = (key: "name" | "email", label: string, type: string, auto: string) => (
    <div className="us-field" data-invalid={Boolean(errors[key])} data-shake={errors[key] ? shake % 2 : undefined}>
      <input ref={key === "name" ? nameRef : undefined} id={`us-a-${key}`} name={key} type={type} autoComplete={auto} placeholder=" "
        value={values[key]} onChange={set(key)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `us-a-${key}-e` : undefined} />
      <label htmlFor={`us-a-${key}`}>{label}</label>
      <p className="us-field__e" id={`us-a-${key}-e`} role={errors[key] ? "alert" : undefined}>{errors[key]}</p>
    </div>
  );

  return (
    <div ref={ref} id="us-start-sheet" className="us-sheet us-sheet--start" role="dialog" aria-modal="true" aria-labelledby="us-start-t" data-open={open} data-status={status} inert={!open}>
      <div className="us-sheet__head">
        <p className="us-mono">Start · free for a week</p>
        <p id="us-start-t" className="us-sheet__t">Book your first call time.</p>
        <button type="button" className="us-x" onClick={onClose}><span className="us-sr">Close</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
      </div>
      <div className="us-swap">
        <form className="us-form" noValidate onSubmit={submit} aria-hidden={status === "done"} inert={status === "done"}>
          {field("name", "Your name", "text", "name")}
          {field("email", "Email", "email", "email")}
          <div className="us-field us-field--select" data-invalid={Boolean(errors.part)} data-shake={errors.part ? shake % 2 : undefined}>
            <select id="us-a-part" name="part" value={values.part} onChange={set("part")} aria-invalid={Boolean(errors.part)} aria-describedby={errors.part ? "us-a-part-e" : undefined}>
              <option value="">Choose a part…</option>
              {PARTS.map((p) => <option key={p.id} value={p.id}>{p.title} · {p.weeks} weeks</option>)}
            </select>
            <label htmlFor="us-a-part">The part</label>
            <p className="us-field__e" id="us-a-part-e" role={errors.part ? "alert" : undefined}>{errors.part}</p>
          </div>
          <button className="us-btn us-btn--ink us-form__go" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
            <span className="us-btn__label us-roll" data-text="Book my call time"><span>Book my call time</span></span>
            <span className="us-btn__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="us-sr" aria-live="polite">{status === "sending" ? "Booking your call time" : ""}</span>
          </button>
          <p className="us-form__fine">A template: nothing is sent anywhere.</p>
        </form>
        <div className="us-ticket" aria-hidden={status !== "done"} inert={status !== "done"}>
          {result && (
            <>
              <p className="us-mono us-ticket__k">Call sheet · {result.ref}</p>
              <p className="us-ticket__t" role="status">You&rsquo;re on the call sheet, {values.name.trim().split(" ")[0]}.</p>
              <dl className="us-ticket__dl">
                <div><dt>Part</dt><dd>{result.part}</dd></div>
                <div><dt>Company</dt><dd>{result.company}</dd></div>
                <div><dt>First call</dt><dd>{result.day}, 09:00</dd></div>
              </dl>
              <span className="us-ticket__stamp" aria-hidden="true">Cast</span>
              <button type="button" className="us-link" onClick={reset}>Book another part</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/CountUp.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";

const ease = (t: number) => 1 - (1 - t) ** 4;

/** Counts to `to` once in view, in tabular figures. The final value is always in a visually hidden span. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * ease(t)));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);
  const text = `${prefix}${to.toLocaleString("en-US")}${suffix}`;
  return (
    <span ref={ref} className="us-count">
      <span aria-hidden="true">{prefix}{value.toLocaleString("en-US")}{suffix}</span>
      <span className="us-sr">{text}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/LiveCount.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";

/** "Rehearsing now": a live readout that wanders by a few people every few seconds. Still under reduced motion and in hidden tabs. */
export function LiveCount({ base = 1284 }: { base?: number }) {
  const [n, setN] = useState(base);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setN((v) => Math.max(base - 40, Math.min(base + 60, v + Math.round(rand() * 6 - 2))));
      const el = ref.current;
      if (el) { el.removeAttribute("data-tick"); void el.offsetWidth; el.setAttribute("data-tick", ""); }
    }, 2600);
    return () => window.clearInterval(id);
  }, [base]);
  return <span ref={ref} className="us-live__n">{n.toLocaleString("en-US")}</span>;
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/Magnetic.tsx">
<![CDATA["use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, lerp } from "./math";

/** Pulls its child up to 12px towards a fine pointer, eased in one rAF loop, and springs back on leave. */
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
  return <span ref={ref} className={`us-magnetic ${className ?? ""}`}>{children}</span>;
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/math.ts">
<![CDATA[export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

/** Where `value` sits between `start` and `end`, clamped to 0..1. A zero-length range is already passed. */
export const range = (value: number, start: number, end: number) =>
  end <= start ? (value >= end ? 1 : 0) : clamp((value - start) / (end - start));

export const wrap = (value: number, period: number) => ((value % period) + period) % period;

/** Delay for the nth child, capped so long lists never wait more than `cap` ms. */
export const stagger = (index: number, step: number, cap = Infinity) => Math.min(index * step, cap);
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/Reveal.tsx">
<![CDATA[import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide";

/**
 * Marks an element for the shared reveal observer (ScrollDirector). The CSS carries the motion:
 * hidden states exist only under `prefers-reduced-motion: no-preference` with scripting on,
 * so no-JS and reduced-motion visitors get the finished page.
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

/** A display line that rises through its own mask. */
export function MaskLine({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="us-mask" data-reveal="mask" style={{ "--i": index } as CSSProperties}>
      <span className="us-mask__in">{children}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";

type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void; stop: () => void; start: () => void; destroy: () => void };

const expo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Lenis on fine pointers with motion allowed (lerp .105, the weight of a heavy curtain).
 * Also answers `us:goto` (scroll to an id) and `us:lock` (hold the page while a sheet is open),
 * falling back to native scrolling when Lenis is off.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: LenisLike | null = null;
    let disposed = false;
    const setup = async () => {
      lenis?.destroy();
      lenis = null;
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      lenis = new Lenis({ lerp: 0.105, autoRaf: true, anchors: false }) as unknown as LenisLike;
    };
    // Off-screen content renders lazily (content-visibility) and can change height while the page travels,
    // so once the scroll settles, re-aim at the target if it has moved.
    const settle = (target: HTMLElement, tries = 2) => {
      const off = target.getBoundingClientRect().top;
      if (Math.abs(off) <= 2 || tries === 0) return;
      if (lenis) lenis.scrollTo(target, { duration: 0.5, easing: expo, onComplete: () => settle(target, tries - 1) });
      else { window.scrollBy({ top: off, behavior: "instant" }); requestAnimationFrame(() => settle(target, tries - 1)); }
    };
    const goto = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (typeof target === "number") {
        if (lenis) lenis.scrollTo(0, { duration: 1.5, easing: expo });
        else window.scrollTo({ top: 0, behavior: reduced.matches ? "instant" : "smooth" });
        return;
      }
      if (lenis) { lenis.scrollTo(target, { duration: 1.5, easing: expo, onComplete: () => settle(target) }); return; }
      target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "start" });
      if (reduced.matches) requestAnimationFrame(() => settle(target));
      else window.addEventListener("scrollend", () => settle(target), { once: true });
    };
    const lock = (event: Event) => {
      const on = (event as CustomEvent<boolean>).detail;
      document.documentElement.toggleAttribute("data-us-lock", on);
      if (on) lenis?.stop(); else lenis?.start();
    };
    void setup();
    query.addEventListener("change", setup);
    window.addEventListener("us:goto", goto);
    window.addEventListener("us:lock", lock);
    return () => {
      disposed = true;
      lenis?.destroy();
      query.removeEventListener("change", setup);
      window.removeEventListener("us:goto", goto);
      window.removeEventListener("us:lock", lock);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/motion/useReducedMotion.ts">
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
    <file path="src/app/(understudy)/understudy/motion/WaveLine.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";

/**
 * A held line that a cue runs through, letter by letter: grey until the wave reaches it,
 * cue-coloured inside the wave, ink once it has passed. The CSS works it out from the
 * scene's `--p` and each letter's `--i`; no script writes per letter.
 * Words never break inside; `cue` marks words that stay in the accent once lit.
 */
export function WaveLine({ words, start = 0, total, cue = [], after }: {
  words: string[]; start?: number; total: number; cue?: number[]; after?: ReactNode;
}) {
  let i = start;
  return (
    <span className="us-wave" style={{ "--n": total } as CSSProperties} aria-hidden="true">
      {words.map((word, w) => (
        <span key={w} className={`us-wave__w${cue.includes(w) ? " us-wave__w--cue" : ""}`}>
          {[...word].map((ch) => <span key={i} className="us-wave__c" style={{ "--i": i++ } as CSSProperties}>{ch}</span>)}
          {w === words.length - 1 ? after : null}
        </span>
      )).flatMap((el, w) => (w === 0 ? [el] : [" ", el]))}
    </span>
  );
}

export const letterCount = (words: string[]) => words.reduce((n, w) => n + [...w].length, 0);
]]>
    </file>
    <file path="src/app/(understudy)/understudy/parts/carousel.ts">
<![CDATA[import { clamp, wrap } from "../motion/math";

/**
 * The parts carousel is one endless ring of cards. Each card's x comes from its index and the
 * ring's offset, wrapped into one period with a slot of lead on the left, so a card that leaves
 * on one side re-enters on the other without a seam.
 */
export const loopX = (index: number, count: number, slot: number, offset: number) =>
  wrap(index * slot + offset + slot, count * slot) - slot;

/** How many times to repeat a set of `count` cards so the ring covers the screen plus a card each side. */
export const repsFor = (count: number, slot: number, viewport: number) =>
  count <= 0 ? 1 : Math.max(1, Math.ceil((viewport + 2 * slot) / (count * slot)));

export type ArcPlace = { y: number; rotate: number; scale: number };

/**
 * The ring seen from the front: flat at the centre, the cards lifting and turning outward as
 * they come round the edges. `x` is the card centre's distance from the screen centre.
 */
export function arcPlace(x: number, half: number, lift = 34, turn = 5): ArcPlace {
  const d = clamp(x / Math.max(1, half), -1.3, 1.3);
  if (d === 0) return { y: 0, rotate: 0, scale: 1 };
  return { y: lift * d * d, rotate: turn * d, scale: 1 - 0.05 * d * d };
}

/** After a fling, the speed eases back to the drift: `keep` of the difference is left after one second. */
export const coast = (velocity: number, drift: number, dt: number, keep = 0.06) =>
  velocity === drift ? drift : drift + (velocity - drift) * keep ** dt;

export type Sample = { x: number; t: number };

/** Release speed in px/s from the pointer samples of the last 90ms, clamped to ±3000. */
export function flingVelocity(samples: Sample[], window = 90, max = 3000): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const first = samples.find((s) => last.t - s.t <= window) ?? samples[0];
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  return clamp(((last.x - first.x) / dt) * 1000, -max, max);
}

/** One frame of a glide (prev/next, bring-into-view): a fixed share of what's left, then the rest under half a pixel. */
export function glideStep(remaining: number, dt: number, rate = 0.0008): number {
  if (Math.abs(remaining) < 0.5) return remaining;
  return remaining * (1 - rate ** dt);
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/parts/PartCard.tsx">
<![CDATA["use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Picture } from "../assets";
import { Prop, TagIcon } from "../brand/Props";
import { companyById } from "../content/companies";
import { TAG_LABEL, type Part } from "../content/parts";

/**
 * A tall card: the part's prop standing in a spotlight that follows the pointer, its tag, name
 * and tools. Press it and it turns over to the brief, what you ship, and the key that starts it.
 * The outer slot is placed by the carousel; the card inside keeps its own lift and flip.
 * A `copy` repeats a card to fill the ring: clickable, but hidden from readers and the tab order.
 */
export function PartCard({ part, index, copy = false }: { part: Part; index: number; copy?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const back = useRef<HTMLButtonElement>(null);
  const front = useRef<HTMLButtonElement>(null);
  const company = companyById(part.company);
  const tab = copy ? -1 : undefined;

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty("--sy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };
  const turn = (to: boolean) => {
    setFlipped(to);
    if (!copy) requestAnimationFrame(() => (to ? back : front).current?.focus({ preventScroll: true }));
  };

  return (
    <li className="us-part-slot" style={{ "--i": index } as CSSProperties} aria-hidden={copy || undefined} data-copy={copy || undefined}>
      <div className="us-part" data-flipped={flipped} onPointerMove={move}>
        <div className="us-part__in">
          <div className="us-part__face us-part__front" inert={flipped}>
            <Picture assetKey={`part-${part.id}`} alt="" className="us-part__pic">
              <div className="us-part__scene" aria-hidden="true">
                <i className="us-part__cone" />
                <i className="us-part__pool" />
                <Prop glyph={part.prop} className="us-part__prop" />
              </div>
            </Picture>
            {part.tag && <span className={`us-tag us-tag--${part.tag}`}><TagIcon tag={part.tag} />{TAG_LABEL[part.tag]}</span>}
            <div className="us-part__meta">
              <p className="us-mono">{part.weeks}-week run · {company.name}</p>
              <h3 className="us-part__t">{part.title}</h3>
              <ul className="us-part__tools" aria-label="Tools">{part.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <button ref={front} type="button" className="us-part__flip" aria-expanded={flipped} tabIndex={tab} onClick={() => turn(true)}>
              <span className="us-sr">Read the brief for {part.title}</span>
              <span className="us-part__hint" aria-hidden="true">Brief <svg viewBox="0 0 24 24"><path d="M5 12h13m-5-6 6 6-6 6" /></svg></span>
            </button>
          </div>
          <div className="us-part__face us-part__back" inert={!flipped} aria-hidden={!flipped}>
            <p className="us-mono">The brief · {company.name}</p>
            <p className="us-part__brief">{part.brief}</p>
            <p className="us-mono us-part__k">You ship</p>
            <ol className="us-part__ships">{part.ships.map((s) => <li key={s}>{s}</li>)}</ol>
            <div className="us-part__acts">
              <a className="us-btn us-btn--cue" href="mailto:hello@understudy.example?subject=Audition" data-us-start data-us-part={part.id} tabIndex={tab}>
                <span className="us-roll" data-text="Rehearse this part"><span>Rehearse this part</span></span>
              </a>
              <button ref={back} type="button" className="us-link us-link--light" tabIndex={tab} onClick={() => turn(false)}>Back to the card</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/parts/PartsBoard.tsx">
<![CDATA["use client";
import { useCallback, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { FIELDS, partsIn, type Field } from "../content/parts";
import { MaskLine } from "../motion/Reveal";
import { useReducedMotion } from "../motion/useReducedMotion";
import { repsFor } from "./carousel";
import { PartCard } from "./PartCard";
import { useRing, type RingMeasure } from "./useRing";

/**
 * The fields as chips (a pill slides to the chosen one), then the parts on an endless ring that
 * drifts right to left. Switching field re-deals the ring: the new cards cascade in.
 */
export function PartsBoard() {
  const [field, setField] = useState<Field | "all">("all");
  const [deal, setDeal] = useState(0);
  const [paused, setPaused] = useState(false);
  const [measure, setMeasure] = useState<RingMeasure>({ slot: 312, viewport: 1440 });
  const chips = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const parts = partsIn(field);
  const active = FIELDS.findIndex((f) => f.id === field);
  // a short set is repeated so the ring always covers the screen; the repeats are hidden from readers
  const reps = reduced ? 1 : repsFor(parts.length, measure.slot, measure.viewport);
  const ring = Array.from({ length: reps }, (_, r) => parts.map((part) => ({ part, copy: r > 0 }))).flat();

  const onMeasure = useCallback((next: RingMeasure) => {
    setMeasure((prev) => (prev.slot === next.slot && prev.viewport === next.viewport ? prev : next));
  }, []);
  const { glide } = useRing(band, track, { enabled: !reduced, paused, layoutKey: `${deal}-${reps}`, onMeasure });

  // the pill is one clip-path over the whole chip row, so it glides instead of jumping between buttons
  useLayoutEffect(() => {
    const row = inner.current;
    if (!row) return;
    const place = () => {
      const button = row.querySelectorAll<HTMLButtonElement>(".us-chip")[active];
      if (!button) return;
      row.style.setProperty("--pill-x", `${button.offsetLeft}px`);
      row.style.setProperty("--pill-w", `${button.offsetWidth}px`);
      chips.current?.setAttribute("data-measured", "");
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(row);
    return () => ro.disconnect();
  }, [active]);

  const choose = (id: Field | "all") => { if (id === field) return; setField(id); setDeal((d) => d + 1); };
  const chipKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + FIELDS.length) % FIELDS.length;
    choose(FIELDS[next].id);
    inner.current?.querySelectorAll<HTMLButtonElement>(".us-chip")[next]?.focus();
  };

  // one card along: a glide on the ring, or a native scroll of the row when motion is reduced
  const step = (dir: 1 | -1) => {
    if (reduced) track.current?.scrollBy({ left: dir * measure.slot, behavior: "instant" });
    else glide(-dir * measure.slot);
  };
  const ringKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  return (
    <>
      <div className="us-parts__head">
        <h2 className="us-h2 us-parts__t" id="us-parts-t">
          <MaskLine index={0}>We cast you in the parts</MaskLine>{" "}
          <MaskLine index={1}>companies are <em className="us-cueword">hiring for.</em></MaskLine>
        </h2>
        <div ref={chips} className="us-chips" role="group" aria-label="Fields" onKeyDown={chipKeys} data-reveal="slide" data-lenis-prevent-horizontal>
          <div ref={inner} className="us-chips__in">
            <i className="us-chips__pill" aria-hidden="true" />
            {FIELDS.map((f) => (
              <button key={f.id} type="button" className="us-chip" aria-pressed={f.id === field} onClick={() => choose(f.id)}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div ref={band} className="us-parts__band" role="region" aria-roledescription="carousel" aria-label="Parts" onKeyDown={ringKeys} data-lenis-prevent-horizontal>
        <ul ref={track} className="us-parts__track" aria-label={`${parts.length} parts`} data-dealt={deal > 0 ? "" : undefined} data-reveal="props">
          {ring.map(({ part, copy }, i) => <PartCard key={`${deal}-${i}-${part.id}`} part={part} index={i} copy={copy} />)}
        </ul>
      </div>
      <div className="us-parts__controls us-js-only">
        <button type="button" className="us-ringbtn" onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6m5-6-6 6 6 6" /></svg>
          <span className="us-sr">Previous part</span>
        </button>
        {!reduced && (
          <button type="button" className="us-ringbtn" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused
              ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" className="us-ringbtn__fill" /></svg>
              : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>}
            <span className="us-sr">Pause the parts</span>
          </button>
        )}
        <button type="button" className="us-ringbtn" onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
          <span className="us-sr">Next part</span>
        </button>
        <p className="us-mono us-parts__hint">Drag it, or let it run</p>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/parts/useRing.ts">
<![CDATA["use client";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { arcPlace, coast, flingVelocity, glideStep, loopX, type Sample } from "./carousel";

const DRIFT = -36; // px/s, right to left
const GAP = 16;
const SCROLL_PULL = 0.32; // px of ring travel per px of page scroll
const NOOP = { glide: (px: number) => void px, kick: () => {} };

export type RingMeasure = { slot: number; viewport: number };

/**
 * Runs the parts ring: an endless, gently arced row that drifts on its own, follows the page
 * scroll, can be dragged and flung, and eases to a stop while it's hovered, focused, holding an
 * open card or paused. One rAF loop writes each slot's transform; it sleeps when nothing moves
 * and when the ring is off screen. Under reduced motion it does nothing and the row scrolls natively.
 */
export function useRing(band: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>, opts: {
  enabled: boolean; paused: boolean; layoutKey: string; onMeasure: (m: RingMeasure) => void;
}) {
  const { enabled, paused, layoutKey, onMeasure } = opts;
  const pausedRef = useRef(paused);
  const api = useRef(NOOP);

  useEffect(() => { pausedRef.current = paused; api.current.kick(); }, [paused]);

  useEffect(() => {
    const b = band.current, t = track.current;
    if (!b || !t || !enabled) return;
    let items: HTMLElement[] = [];
    let slot = 312, viewport = b.clientWidth, half = viewport / 2, arcHalf = Math.max(half, 560);
    let offset = 0, velocity = DRIFT, glideLeft = 0;
    let frame = 0, last = 0, visible = false, hover = false, focused = false;
    let drag: { id: number; x: number; moved: number; captured: boolean } | null = null;
    let samples: Sample[] = [];
    let lastScroll = scrollY;
    // the band's inline padding is the page gutter, resolved to px (a custom property would come back unresolved)
    const gut = () => parseFloat(getComputedStyle(b).paddingLeft) || 24;

    const measure = () => {
      items = Array.from(t.querySelectorAll<HTMLElement>(".us-part-slot"));
      const card = items[0]?.firstElementChild as HTMLElement | undefined;
      slot = (card?.offsetWidth ?? 296) + GAP;
      viewport = b.clientWidth;
      half = viewport / 2;
      // the arc's radius never drops below a desktop's, so phones get a gentle curve, not a steep one
      arcHalf = Math.max(half, 560);
      onMeasure({ slot, viewport });
    };

    const place = () => {
      const n = items.length;
      items.forEach((el, i) => {
        const x = loopX(i, n, slot, offset);
        const a = arcPlace(x + (slot - GAP) / 2 - half, arcHalf);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) rotate(${a.rotate.toFixed(2)}deg) scale(${a.scale.toFixed(3)})`;
      });
    };

    const firm = () => focused || pausedRef.current || t.querySelector('[data-flipped="true"]') !== null;
    const held = () => hover || drag !== null || firm();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      if (!drag) {
        // pause, focus or an open card brake hard; hover only glides to a stop, so a fling released
        // over the ring still coasts; letting go eases back up to the drift
        velocity = firm() ? coast(velocity, 0, dt, 0.002) : hover ? coast(velocity, 0, dt, 0.02) : coast(velocity, DRIFT, dt);
        if (held() && Math.abs(velocity) < 0.5) velocity = 0; // snap in the same tick it stops
        offset += velocity * dt;
        const step = glideStep(glideLeft, dt);
        offset += step;
        glideLeft -= step;
      }
      place();
      const idle = velocity === 0 && glideLeft === 0 && !drag;
      frame = visible && !document.hidden && !idle ? requestAnimationFrame(tick) : 0;
      if (!frame) last = 0;
    };
    const kick = () => { if (!frame && visible) frame = requestAnimationFrame(tick); };
    api.current = { glide: (px) => { glideLeft += px; kick(); }, kick };

    // pointer: drag 1:1, fling on release; a drag never turns into a click on a card
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, moved: 0, captured: false };
      samples = [{ x: e.clientX, t: e.timeStamp }];
      velocity = 0;
      kick();
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      drag.x = e.clientX;
      drag.moved += Math.abs(dx);
      offset += dx;
      samples.push({ x: e.clientX, t: e.timeStamp });
      if (samples.length > 12) samples.shift();
      if (drag.moved > 6 && !drag.captured) { b.setPointerCapture(e.pointerId); drag.captured = true; b.setAttribute("data-dragging", ""); }
      kick();
    };
    const swallow = (e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dragged = drag.moved > 6;
      if (dragged) {
        velocity = e.type === "pointercancel" ? 0 : flingVelocity(samples);
        b.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => b.removeEventListener("click", swallow, { capture: true }), 0);
      }
      b.removeAttribute("data-dragging");
      drag = null;
      kick();
    };

    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = true; kick(); } };
    const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = false; kick(); } };

    // focus holds the ring and brings the focused card fully into view
    const focusIn = (e: FocusEvent) => {
      focused = true;
      const el = (e.target as Element).closest<HTMLElement>(".us-part-slot");
      const i = el ? items.indexOf(el) : -1;
      if (i >= 0) {
        const x = loopX(i, items.length, slot, offset);
        const pad = gut();
        if (x < pad) glideLeft = pad - x;
        else if (x + slot - GAP > viewport - pad) glideLeft = viewport - pad - (x + slot - GAP);
      }
      kick();
    };
    const focusOut = (e: FocusEvent) => { if (!b.contains(e.relatedTarget as Node | null)) { focused = false; kick(); } };

    // the page scroll pulls the ring along, like the company rows in the house
    const scroll = () => {
      const dy = scrollY - lastScroll;
      lastScroll = scrollY;
      if (!visible || drag) return;
      offset -= dy * SCROLL_PULL;
      kick();
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { lastScroll = scrollY; kick(); } });
    io.observe(b);
    const ro = new ResizeObserver(() => { measure(); place(); });
    ro.observe(b);

    measure();
    offset = gut();
    place();
    t.setAttribute("data-ring", "on");
    b.addEventListener("pointerdown", down);
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerup", up);
    b.addEventListener("pointercancel", up);
    b.addEventListener("pointerenter", enter);
    b.addEventListener("pointerleave", leave);
    b.addEventListener("focusin", focusIn);
    b.addEventListener("focusout", focusOut);
    b.addEventListener("click", kick, true);
    addEventListener("scroll", scroll, { passive: true });
    const visibility = () => { last = 0; kick(); };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      b.removeEventListener("pointerdown", down);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerup", up);
      b.removeEventListener("pointercancel", up);
      b.removeEventListener("pointerenter", enter);
      b.removeEventListener("pointerleave", leave);
      b.removeEventListener("focusin", focusIn);
      b.removeEventListener("focusout", focusOut);
      b.removeEventListener("click", kick, true);
      removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      items.forEach((el) => el.style.removeProperty("transform"));
      t.removeAttribute("data-ring");
      api.current = NOOP;
    };
  }, [band, track, enabled, layoutKey, onMeasure]);

  const glide = useCallback((px: number) => api.current.glide(px), []);
  return { glide };
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/rehearsal/scenes.ts">
<![CDATA[/** The four scenes of a run, each with its window. The last word of each title is cued. */
export type SceneKind = "lot" | "cast" | "notes" | "reel";
export type RehearsalScene = { id: SceneKind; n: string; lead: string; cue: string; body: string; window: string };

export const SCENES: RehearsalScene[] = [
  { id: "lot", n: "Scene 1", lead: "Join a company that runs like a", cue: "real one.",
    body: "Eighteen simulated companies with real data, real customers and a real brief on your desk on day one.", window: "the lot · parcelpost" },
  { id: "cast", n: "Scene 2", lead: "Run lines with your", cue: "cast.",
    body: "Four to six people rehearse the same company in different parts, so you hand off work the way a team does.", window: "#checkout-squad" },
  { id: "notes", n: "Scene 3", lead: "Get notes from your", cue: "director.",
    body: "Someone who has done the job for years reads every draft and tells you what a hiring manager would.", window: "readout.doc · 3 notes" },
  { id: "reel", n: "Scene 4", lead: "Walk out with a", cue: "reel.",
    body: "A page of everything you shipped, with the numbers you moved and your director's sign-off. Recruiters open it.", window: "understudy.example/maya" },
];
]]>
    </file>
    <file path="src/app/(understudy)/understudy/rehearsal/Windows.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { Face } from "../brand/Props";
import { companyById } from "../content/companies";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import type { SceneKind } from "./scenes";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** A window in the house frame: a bar with three lights and a title, then the scene's mock. */
export function Win({ title, children, label, className }: { title: string; children: ReactNode; label: string; className?: string }) {
  return (
    <Reveal variant="wipe" className={`us-win ${className ?? ""}`}>
      <figure className="us-win__in" role="img" aria-label={label}>
        <div className="us-win__bar" aria-hidden="true"><i /><i /><i /><span>{title}</span></div>
        <div className="us-win__body" aria-hidden="true">{children}</div>
      </figure>
    </Reveal>
  );
}

const LOT = ["parcelpost", "halcyon", "fernway", "lumen", "tidewell", "brightloop", "saltbox", "kestrel"];

function Lot() {
  return (
    <div className="us-lot">
      <div className="us-lot__map">
        {LOT.map((id, n) => (
          <span key={id} className={`us-lot__b${id === "parcelpost" ? " us-lot__b--on" : ""}`} style={i(n)}>
            <CompanyMark company={companyById(id)} />
            {id === "parcelpost" && <i className="us-lot__pin" data-ambient />}
          </span>
        ))}
      </div>
      <div className="us-lot__brief">
        <p className="us-mono">Brief · Product Analyst</p>
        <p className="us-lot__q">31% of carts stall at the address step. Find out why.</p>
        <p className="us-lot__meta"><span>Due Fri</span><span>Director: Ines Duarte</span></p>
        <span className="us-lot__take">Take the part</span>
      </div>
    </div>
  );
}

const CHAT = [
  { who: "Ravi", role: "Engineer", tone: 2, text: "Address autocomplete fails on 1 in 9 postcodes. Logs are in the drive." },
  { who: "You", role: "Analyst", tone: 1, text: "That lines up: the stall is worst on mobile, right after autocomplete." },
  { who: "Lena", role: "Designer", tone: 3, text: "I can mock a manual-entry fallback by Thursday." },
  { who: "Ines", role: "Director", tone: 0, text: "Good. Size it before you build it. What's the upside?" },
] as const;

function Cast() {
  return (
    <div className="us-chat">
      <div className="us-chat__log">
        {CHAT.map((m, n) => (
          <div key={n} className={`us-msg${m.who === "You" ? " us-msg--you" : ""}`} style={i(n)}>
            <Face tone={m.tone} className="us-msg__face" />
            <div><p className="us-msg__who">{m.who} <span>{m.role}</span></p><p className="us-msg__t">{m.text}</p></div>
          </div>
        ))}
        <div className="us-msg us-msg--typing" style={i(4)}><Face tone={2} className="us-msg__face" /><p className="us-dots"><i /><i /><i /></p></div>
      </div>
      <aside className="us-chat__side">
        <p className="us-mono">Standup · Tue</p>
        <ul>{["Pull checkout logs", "Segment by device", "Size the fallback", "Draft the readout"].map((t, n) => (
          <li key={t} className={n < 3 ? "is-done" : undefined} style={i(n)}><svg viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5" pathLength={1} /></svg>{t}</li>
        ))}</ul>
      </aside>
    </div>
  );
}

function Notes() {
  return (
    <div className="us-doc">
      <div className="us-doc__page">
        <p className="us-doc__h">Readout: checkout drop-off</p>
        <p className="us-doc__p">Mobile shoppers abandon at the address step <mark style={i(0)}>31% of the time</mark>, against 12% on desktop.</p>
        <p className="us-doc__bars"><span className="us-doc__bar" /><span className="us-doc__bar us-doc__bar--s" /></p>
        <p className="us-doc__p">Autocomplete misses <mark style={i(1)}>1 in 9 postcodes</mark>; a manual fallback recovers most of them.</p>
        <p className="us-doc__bars"><span className="us-doc__bar" /><span className="us-doc__bar us-doc__bar--m" /></p>
      </div>
      <ol className="us-doc__notes">
        {["Lead with the 31%. It's the whole story.", "Cut the chart: the table already says it.", "Ship it. This is a hiring-manager readout."].map((t, n) => (
          <li key={t} style={i(n)}><Face tone={0} className="us-doc__face" /><p>{t}</p></li>
        ))}
      </ol>
      <span className="us-doc__stamp">Approved</span>
    </div>
  );
}

function Reel() {
  return (
    <div className="us-reel">
      <div className="us-reel__head">
        <Face tone={1} className="us-reel__face" />
        <div><p className="us-reel__name">Maya Ortiz</p><p className="us-mono">Product Analyst · Level 7</p></div>
        <span className="us-reel__ready">Callback-ready</span>
      </div>
      <ul className="us-reel__stats">
        <li><b><CountUp to={18} prefix="−" suffix="%" /></b><span>checkout drop-off</span></li>
        <li><b><CountUp to={4} /></b><span>fixes shipped</span></li>
        <li><b><CountUp to={9} /></b><span>director notes</span></li>
      </ul>
      <ul className="us-reel__work">
        {[["Parcelpost", "Checkout funnel model"], ["Sundry", "Win-back experiment"], ["Tidewell", "Demand forecast"]].map(([c, t], n) => (
          <li key={t} style={i(n)}><span className="us-reel__thumb" /><span><b>{t}</b><span>{c} · signed off</span></span></li>
        ))}
      </ul>
    </div>
  );
}

const LABELS: Record<SceneKind, string> = {
  lot: "A map of the studio's companies, with a brief from Parcelpost: 31% of carts stall at the address step.",
  cast: "A team chat: an engineer, the analyst, a designer and the director working the checkout brief, beside a standup checklist.",
  notes: "A readout with highlighted findings and three margin notes from the director, stamped approved.",
  reel: "Maya Ortiz's reel: Product Analyst, level 7, checkout drop-off down 18%, four fixes shipped, nine director notes.",
};

export function SceneWindow({ kind, title }: { kind: SceneKind; title: string }) {
  const body = kind === "lot" ? <Lot /> : kind === "cast" ? <Cast /> : kind === "notes" ? <Notes /> : <Reel />;
  return <Win title={title} label={LABELS[kind]} className={`us-win--${kind}`}>{body}</Win>;
}

/** The reel as it sits in the casting scene: the same page, a little smaller. */
export function ReelFigure() {
  return (
    <figure className="us-win__in us-cast__win" role="img" aria-label={LABELS.reel}>
      <div className="us-win__bar" aria-hidden="true"><i /><i /><i /><span>understudy.example/maya</span></div>
      <div className="us-win__body" aria-hidden="true"><Reel /></div>
    </figure>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Casting.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { CALLBACKS, companyById } from "../content/companies";
import { MaskLine, Reveal } from "../motion/Reveal";
import { ReelFigure } from "../rehearsal/Windows";

/** Where each callback sits on the 1200 × 600 stage, and where its line leaves the reel. */
export const SEATS = CALLBACKS.map((id, n) => {
  const left = n % 2 === 0;
  const row = Math.floor(n / 2);
  const y = 110 + row * 95;
  return { id, left, x: left ? 118 : 1082, y, from: { x: left ? 372 : 828, y: 150 + row * 70 } };
});

const curve = (s: (typeof SEATS)[number]) => {
  const ex = s.left ? s.x + 82 : s.x - 82;
  const mid = (s.from.x + ex) / 2;
  return `M${s.from.x} ${s.from.y}C${mid} ${s.from.y} ${mid} ${s.y} ${ex} ${s.y}`;
};

/**
 * One held stage. The reel rests in the middle; ten companies call back one after another,
 * each pulled in by a line drawn from the reel, while the callback counter rolls like an odometer.
 */
export function Casting() {
  return (
    <section className="us-casting" id="casting" data-scene="casting" data-tone="light" aria-labelledby="us-cast-t">
      <div className="us-casting__stage">
        <header className="us-casting__head">
          <h2 className="us-h2" id="us-cast-t"><MaskLine>You rehearse. We <em className="us-cueword">cast.</em></MaskLine></h2>
          <Reveal as="p" className="us-lead" index={1}>Your reel goes straight to the companies casting for your part.</Reveal>
        </header>
        <div className="us-cast">
          <svg className="us-cast__net" viewBox="0 0 1200 600" aria-hidden="true">
            {SEATS.map((s, n) => <path key={s.id} d={curve(s)} pathLength={1} style={{ "--i": n } as CSSProperties} />)}
          </svg>
          <div className="us-cast__reel"><ReelFigure /></div>
          <ul className="us-cast__cos" aria-label="Companies that called back">
            {SEATS.map((s, n) => (
              <li key={s.id} className="us-cast__co" data-on="" data-side={s.left ? "l" : "r"}
                style={{ "--x": `${(s.x / 1200) * 100}%`, "--y": `${(s.y / 600) * 100}%`, "--i": n } as CSSProperties}>
                <CompanyMark company={companyById(s.id)} />
              </li>
            ))}
          </ul>
          <p className="us-cast__count">
            <span className="us-mono">Callbacks</span>
            <span className="us-odo" aria-hidden="true">
              {[1, 0].map((d, n) => (
                <span key={n} className="us-odo__col" style={{ "--d": d } as CSSProperties}>
                  {Array.from({ length: 10 }, (_, k) => <span key={k}>{k}</span>)}
                </span>
              ))}
            </span>
            <span className="us-sr">10 companies called back</span>
          </p>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Contract.tsx">
<![CDATA[import { Magnetic } from "../motion/Magnetic";
import { WaveLine, letterCount } from "../motion/WaveLine";

const A = ["Built", "to", "get", "you"];
const B = ["cast."];
const TOTAL = letterCount(A) + letterCount(B);

/**
 * The end of the story, held. A cue runs through "Built to get you cast."; between "you" and
 * "cast." a contract slides out of the gap, and once the cue reaches the full stop it is signed
 * and sealed. Then the price rises under it.
 */
export function Contract() {
  return (
    <section className="us-contract" id="pricing" data-scene="contract" data-tone="light" aria-labelledby="us-contract-t">
      <div className="us-contract__stage">
        <h2 className="us-contract__t" id="us-contract-t">
          <span className="us-sr">Built to get you cast.</span>
          <WaveLine words={A} total={TOTAL} />
          <span className="us-deal" aria-hidden="true">
            <span className="us-deal__back" />
            <span className="us-deal__sheet">
              <i className="us-deal__k">Offer</i>
              <i className="us-deal__ln" /><i className="us-deal__ln us-deal__ln--s" /><i className="us-deal__ln" />
              <svg className="us-deal__sig" viewBox="0 0 64 24"><path d="M3 17c5-9 8-13 10-11s-3 12 0 12 6-12 9-12-1 10 2 10 5-7 8-7 2 6 5 6 7-4 10-5 6 1 13 0" pathLength={1} /></svg>
              <i className="us-deal__rule" />
            </span>
            <span className="us-deal__seal"><svg viewBox="0 0 24 24"><path d="M6 12.5 10 16.5 18 8" /></svg></span>
          </span>
          <WaveLine words={B} start={letterCount(A)} total={TOTAL} cue={[0]} />
        </h2>
        <p className="us-contract__price">
          <span className="us-contract__l">Opening night is free.</span>{" "}
          <span className="us-contract__l">Then <b>$89</b> a month.</span>
        </p>
        <div className="us-contract__acts">
          <Magnetic>
            <a className="us-btn us-btn--ink us-btn--big" href="mailto:hello@understudy.example?subject=Audition" data-us-start>
              <span className="us-roll" data-text="Book your first call time"><span>Book your first call time</span></span>
              <svg className="us-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
            </a>
          </Magnetic>
          <a className="us-link" href="mailto:hello@understudy.example" data-us-ask>Ask a question first</a>
        </div>
        <ul className="us-contract__facts">
          <li><b>10 h</b><span>a week, around a day job</span></li>
          <li><b>5–8</b><span>weeks to a finished reel</span></li>
          <li><b>62%</b><span>of reels got a callback last season</span></li>
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Finale.tsx">
<![CDATA[import { Mark } from "../brand/Logo";
import { StageFloor } from "../brand/StageFloor";

const RING = "START · TAKE THE STAGE · START · TAKE THE STAGE · ";

/**
 * The foot of the page: the studio floor again, pale, held for a little while you scroll.
 * The house lights come up from the ghost light outwards, and on the stage a ring turns:
 * the whole ring is the Start key.
 */
export function Finale() {
  return (
    <footer className="us-finale" id="stage" data-scene="finale" data-tone="light">
      <div className="us-finale__stage">
        <div className="us-finale__floor" aria-hidden="true">
          <StageFloor variant="pale" />
          <div className="us-finale__lit"><StageFloor variant="lit" /></div>
          <i className="us-finale__mist" />
        </div>
        <p className="us-finale__line"><span>House lights up.</span> <span>Take the stage.</span></p>
        <a className="us-ring" href="mailto:hello@understudy.example?subject=Audition" data-us-start data-ambient>
          <svg className="us-ring__text" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="us-ring-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
            <text><textPath href="#us-ring-path" textLength="488">{RING}</textPath></text>
          </svg>
          <span className="us-ring__core"><Mark /><span>Start</span></span>
          <span className="us-sr">Start with Understudy</span>
        </a>
        <div className="us-finale__foot">
          <nav className="us-finale__legal" aria-label="Legal">
            <a href="#top" data-us-go="top">Back to the top</a>
            <a href="mailto:hello@understudy.example">hello@understudy.example</a>
            <span>© 2026 Understudy · a fictional brand for a landing-page template</span>
          </nav>
          <nav className="us-finale__social" aria-label="Understudy elsewhere">
            <a href="https://example.com/understudy/letters">Letters</a>
            <a href="https://example.com/understudy/press">Press</a>
            <a href="https://example.com/understudy/jobs">Directors wanted</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Hero.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Mark } from "../brand/Logo";
import { CueDot } from "../brand/Props";
import { StageFloor } from "../brand/StageFloor";
import { CompanyMark } from "../brand/CompanyMark";
import { CASTING_COMPANIES, HOUSE_ROWS } from "../content/companies";

const FIGURE = CASTING_COMPANIES.toLocaleString("en-US") + "+";

/**
 * One held stage. At rest: the line, and under it the mark, a small proscenium with its
 * curtain breathing. Scrolling pushes in: the line lifts away, the arch opens to the whole
 * screen, the curtains part, and in the dark house the figure rises digit by digit over two
 * drifting rows of companies bent as if through a wide lens. Then the stage lets go.
 */
export function Hero() {
  return (
    <section className="us-hero" id="top" data-scene="hero" data-tone="light" data-dark-from="0.42" aria-labelledby="us-hero-t">
      <div className="us-hero__stage">
        <div className="us-hero__floor" aria-hidden="true">
          <StageFloor variant="pale" />
          <i className="us-hero__mist" />
        </div>

        <div className="us-hero__copy">
          <p className="us-eyebrow us-hero__eyebrow"><span>The rehearsal studio for first jobs</span></p>
          <h1 className="us-hero__t" id="us-hero-t">
            <span className="us-hero__l"><span>Your first job,</span></span>
            <span className="us-hero__l"><span>rehearsed.<CueDot className="us-hero__cue" /></span></span>
          </h1>
        </div>

        {/* where the arch rests; with motion off it shows the mark itself */}
        <span className="us-hero__slot" aria-hidden="true">
          <Mark className="us-hero__mark" />
          <span className="us-hero__rings" data-ambient><i /><i /><i /></span>
        </span>

        <div className="us-house" id="house">
          <div className="us-curtains" aria-hidden="true">
            <i className="us-curtain us-curtain--l" />
            <i className="us-curtain us-curtain--r" />
            <i className="us-curtains__slit" />
          </div>
          <div className="us-house__in">
            <h2 className="us-house__h">
              <span className="us-house__n" aria-hidden="true">
                {[...FIGURE].map((ch, i) => (
                  <span key={i} className="us-digit" style={{ "--i": i } as CSSProperties}><span>{ch}</span></span>
                ))}
              </span>
              <span className="us-sr">{FIGURE} </span>
              <span className="us-house__say">
                {["companies casting", "from our studio."].map((line, i) => (
                  <span key={line} className="us-house__l" style={{ "--i": i } as CSSProperties}><span>{line}</span></span>
                ))}
              </span>
            </h2>
            <div className="us-house__rows" role="group" aria-label="Companies casting from the studio">
              {HOUSE_ROWS.map((row, r) => (
                <ul key={r} className="us-house__row" data-dir={r === 0 ? "1" : "-1"}>
                  {[...row, ...row].map((company, i) => (
                    <li key={`${company.id}-${i}`} className="us-house__item" aria-hidden={i >= row.length ? true : undefined} data-copy={i >= row.length ? "" : undefined}>
                      <CompanyMark company={company} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <p className="us-nudge" aria-hidden="true">
          {/* HTML, not SVG: an animated SVG child can't be composited and would force a layout every frame */}
          <span className="us-nudge__mouse"><i className="us-nudge__wheel" /></span>
          <span>Scroll to enter</span>
        </p>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Parts.tsx">
<![CDATA[import { PartsBoard } from "../parts/PartsBoard";

/**
 * Still in the dark house: the parts, on an endless ring of tall cards that drifts right to left,
 * follows the page scroll and can be dragged. A card turns over to show its brief and its Start key.
 */
export function Parts() {
  return (
    <section className="us-parts" id="parts" data-scene="parts" data-tone="dark" aria-labelledby="us-parts-t">
      <div className="us-parts__stage">
        <PartsBoard />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/Rehearsal.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { CueDot } from "../brand/Props";
import { MaskLine, Reveal } from "../motion/Reveal";
import { WaveLine, letterCount } from "../motion/WaveLine";
import { SCENES } from "../rehearsal/scenes";
import { SceneWindow } from "../rehearsal/Windows";

const LINE = ["Learn", "the", "part", "by", "playing", "it."];

/**
 * The house lights come back up over a dark bowl that flattens as you arrive. The line is held
 * at the top while a cue runs through it, then the four scenes pass beneath it, strung on one
 * line the scroll draws: from the title, across to a rail, through a node beside each scene.
 */
export function Rehearsal() {
  return (
    <section className="us-rehearse" id="rehearsal" data-scene="rehearse" data-flow data-line="1" data-tone="light" aria-labelledby="us-rehearse-t">
      <i className="us-bowl" aria-hidden="true" />
      {/* a measuring strip: the held line can't be measured once stuck, so this feeds its cue progress */}
      <i className="us-rehearse__cue" data-scene="wave" data-flow data-line="0.8" data-feeds=".us-rehearse__hold" aria-hidden="true" />
      <div className="us-rehearse__hold">
        <h2 className="us-rehearse__t" id="us-rehearse-t">
          <span className="us-sr">Learn the part by playing it.</span>
          <WaveLine words={LINE} total={letterCount(LINE)} cue={[4, 5]} after={<CueDot className="us-wave__pop" />} />
        </h2>
      </div>

      <div className="us-thread" data-scene="thread" data-flow data-line="0.7">
        <svg className="us-thread__lead" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M600 0C600 112 24 68 24 178" pathLength={1} />
        </svg>
        <i className="us-thread__rail" aria-hidden="true"><b /></i>
        <ol className="us-scenes">
          {SCENES.map((s, n) => (
            <li key={s.id} className="us-sc" style={{ "--i": n } as CSSProperties}>
              <div className="us-sc__h">
                <Reveal variant="scale" className="us-sc__node" ><i /></Reveal>
                <Reveal variant="slide" as="p" className="us-mono us-sc__n">{s.n}</Reveal>
                <h3 className="us-sc__t"><MaskLine>{s.lead} <em className="us-cueword">{s.cue}</em></MaskLine></h3>
                <Reveal as="p" className="us-sc__p" index={1}>{s.body}</Reveal>
              </div>
              <SceneWindow kind={s.id} title={s.window} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/sections/TopBar.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { LiveCount } from "../motion/LiveCount";

/** The top of the screen: the lockup and a live readout. Its ink flips on the dark house. */
export function TopBar() {
  return (
    <header className="us-top">
      <a className="us-top__logo" href="#top" data-us-go="top"><Logo /></a>
      <p className="us-live" data-ambient>
        <i className="us-live__dot" aria-hidden="true" />
        <span className="us-mono">Rehearsing now</span>
        <LiveCount />
      </p>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/stage/arch.ts">
<![CDATA[import { lerp } from "../motion/math";

export type ArchRest = { /** width of the mark at rest */ w: number; h: number; /** vertical centre of the mark at rest, px from the top */ y: number };
export type Inset = { top: number; right: number; bottom: number; left: number; radius: number };

/**
 * The proscenium is the dark house's clip-path. At rest it is the logo mark under the
 * headline (a rounded-top arch); at `t` = 1 it is the whole screen. The insets grow on an
 * ease so the push-in starts slow and lands hard, like a dolly.
 */
export function archInset(t: number, vw: number, vh: number, rest: ArchRest): Inset {
  if (t >= 1) return { top: 0, right: 0, bottom: 0, left: 0, radius: 0 };
  const e = t * t * t; // ease-in: the camera accelerates into the opening
  const side = (vw - rest.w) / 2;
  const top = rest.y - rest.h / 2;
  const bottom = vh - (rest.y + rest.h / 2);
  return {
    top: Math.max(0, lerp(top, 0, e)),
    right: Math.max(0, lerp(side, 0, e)),
    bottom: Math.max(0, lerp(bottom, 0, e)),
    left: Math.max(0, lerp(side, 0, e)),
    radius: lerp(rest.w / 2, 0, e),
  };
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/stage/lens.ts">
<![CDATA[import { clamp, wrap } from "../motion/math";

export type LensPlace = { y: number; rotate: number; scale: number };

/**
 * The company rows on the dark house are seen through a wide lens, like the inside of a
 * cylinder: flat in the middle, climbing and turning towards the edges. `x` is the item's
 * distance from the centre in px, `half` is half the screen width, `bend` 0..1 fades it in.
 */
export function lensPlace(x: number, half: number, bend: number, depth = 46, turn = 9): LensPlace {
  if (bend <= 0) return { y: 0, rotate: 0, scale: 1 };
  const d = clamp(x / Math.max(1, half), -1.4, 1.4);
  return {
    y: -depth * d * d * bend,
    rotate: -turn * d * bend,
    scale: 1 - 0.16 * d * d * bend,
  };
}

/** Centred x positions for a looping row of `count` slots `slot` px wide, shifted by `offset`. */
export function rowLayout(count: number, slot: number, offset: number): { x: number }[] {
  const period = count * slot;
  return Array.from({ length: count }, (_, i) => ({ x: wrap(i * slot + offset, period) - period / 2 }));
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/stage/odometer.ts">
<![CDATA[import { clamp } from "../motion/math";

/** How many callbacks have come in `p` of the way through the casting slice, one per company. */
export const callbacksAt = (p: number, companies: number) => Math.floor(clamp(p) * companies + 1e-9);

/** The last `width` digits of `n`, most significant first, for the rolling digit columns. */
export const digitsOf = (n: number, width: number) =>
  Array.from({ length: width }, (_, i) => Math.floor(Math.abs(n) / 10 ** (width - 1 - i)) % 10);
]]>
    </file>
    <file path="src/app/(understudy)/understudy/stage/progress.ts">
<![CDATA[import { clamp } from "../motion/math";

export type Tone = "light" | "dark";

/** A scene measured once per resize: its top in document pixels, its height, and the chrome tone it asks for. */
export type SceneBox = { top: number; height: number; tone: Tone; /** pin progress after which a light scene turns dark */ darkFrom?: number };

/**
 * Progress through a pinned (sticky) scene: 0 when its top meets the top of the screen,
 * 1 when its bottom meets the bottom, so the stage is held for `height - vh` pixels.
 */
export function pinProgress(scrollY: number, top: number, height: number, vh: number): number {
  const hold = height - vh;
  if (hold <= 0) return scrollY >= top ? 1 : 0;
  return clamp((scrollY - top) / hold);
}

/**
 * Progress through a scene that scrolls normally: 0 when its top crosses the reading line
 * (`line` of the way down the screen), 1 when its bottom does.
 */
export function flowProgress(scrollY: number, top: number, height: number, vh: number, line = 0.6): number {
  return clamp((scrollY + vh * line - top) / Math.max(1, height));
}

/** The tone of the scene under a probe line `probe` of the way down the screen. */
export function toneAt(boxes: SceneBox[], scrollY: number, vh: number, probe: number): Tone {
  const y = scrollY + vh * probe;
  const box = boxes.find((b) => y >= b.top && y < b.top + b.height);
  if (!box) return "light";
  if (box.darkFrom !== undefined && pinProgress(scrollY, box.top, box.height, vh) >= box.darkFrom) return "dark";
  return box.tone;
}
]]>
    </file>
    <file path="src/app/(understudy)/understudy/stage/ScrollDirector.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { range } from "../motion/math";
import { archInset, type ArchRest } from "./arch";
import { lensPlace, rowLayout } from "./lens";
import { callbacksAt, digitsOf } from "./odometer";
import { flowProgress, pinProgress, toneAt, type SceneBox, type Tone } from "./progress";

type Scene = SceneBox & { el: HTMLElement; name: string; flow: boolean; line: number; p: number; feeds: HTMLElement | null };

const q = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/**
 * The page's stage manager. One scroll-driven rAF writes `--p` (0..1) on every `[data-scene]`;
 * the CSS turns that into the push-in, the waves, the drawn lines and the lit house.
 * It also runs the reveal observer, the ambient observer, the chrome tone and the lens rows.
 * Under reduced motion it writes nothing spatial and removes what it wrote.
 */
export function ScrollDirector() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let live = motion.matches;
    let scenes: Scene[] = [];
    let vh = innerHeight;
    let frame = 0;

    // hero: the proscenium
    const stage = q(".us-hero__stage");
    const slot = q(".us-hero__slot");
    const house = q(".us-house");
    let rest: ArchRest = { w: 100, h: 125, y: 0 };
    let stageW = innerWidth, stageH = innerHeight;
    let heroP = 0, heroBottom = 0;

    // the cue line's lead-in
    const thread = q(".us-thread");
    const lead = q<SVGPathElement>(".us-thread__lead path");

    // casting
    const castScene = q(".us-casting");
    let lastCallbacks = -1;

    // lens rows
    const rows = qa(".us-house__row").map((row) => ({ row, items: qa(".us-house__item", row), dir: row.dataset.dir === "-1" ? -1 : 1 }));
    let lensFrame = 0, lensOffset = 0, lensLast = 0;
    const slot0 = () => (innerWidth < 720 ? 150 : 200);

    const collect = () => {
      scenes = qa("[data-scene]").map((el) => ({
        el, name: el.dataset.scene ?? "", flow: el.hasAttribute("data-flow"), line: Number(el.dataset.line ?? 0.6),
        tone: (el.dataset.tone as Tone) ?? "light", darkFrom: el.dataset.darkFrom ? Number(el.dataset.darkFrom) : undefined,
        top: 0, height: 0, p: -1, feeds: el.dataset.feeds ? q(el.dataset.feeds) : null,
      }));
    };

    const measure = () => {
      vh = innerHeight;
      scenes.forEach((s) => {
        s.top = s.el.getBoundingClientRect().top + scrollY;
        s.height = s.el.offsetHeight;
        s.p = -1;
      });
      const hero = scenes.find((s) => s.name === "hero");
      heroBottom = hero ? hero.top + hero.height : 0;
      if (stage && slot) {
        stageW = stage.clientWidth; stageH = stage.clientHeight;
        rest = { w: slot.offsetWidth, h: slot.offsetHeight, y: slot.offsetTop + slot.offsetHeight / 2 };
      }
      if (thread && lead) {
        const w = thread.clientWidth;
        const rail = q(".us-thread__rail");
        const x = rail ? rail.offsetLeft + rail.offsetWidth / 2 : 24;
        const h = (lead.ownerSVGElement?.clientHeight ?? 200) - 2;
        lead.ownerSVGElement?.setAttribute("viewBox", `0 0 ${w} ${h + 2}`);
        lead.setAttribute("d", `M${w / 2} 0C${w / 2} ${h * 0.62} ${x} ${h * 0.38} ${x} ${h}`);
      }
      lastCallbacks = -1;
    };

    const writeHero = (p: number) => {
      heroP = p;
      if (!house) return;
      const t = range(p, 0.04, 0.52);
      const a = archInset(t, stageW, stageH, rest);
      // the interior (figure, rows, their serif font) joins layout only once the arch starts opening
      if (p > 0.2 !== house.hasAttribute("data-open")) house.toggleAttribute("data-open", p > 0.2);
      const foot = t >= 1 ? 0 : 3;
      house.style.clipPath = `inset(${a.top.toFixed(1)}px ${a.right.toFixed(1)}px ${a.bottom.toFixed(1)}px ${a.left.toFixed(1)}px round ${a.radius.toFixed(1)}px ${a.radius.toFixed(1)}px ${foot}px ${foot}px)`;
      runLens();
    };

    const writeCasting = (p: number) => {
      if (!castScene) return;
      const chips = qa(".us-cast__co", castScene);
      const n = callbacksAt(range(p, 0.12, 0.8), chips.length);
      if (n === lastCallbacks) return;
      lastCallbacks = n;
      chips.forEach((chip, i) => chip.toggleAttribute("data-on", i < n));
      castScene.toggleAttribute("data-full", n === chips.length);
      const digits = digitsOf(n, 2);
      qa(".us-odo__col", castScene).forEach((col, i) => col.style.setProperty("--d", String(digits[i])));
    };

    const update = () => {
      frame = 0;
      const y = scrollY;
      const span = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--us-page", (y / span).toFixed(4));
      root.toggleAttribute("data-us-scrolled", y > 30);
      const dock = toneAt(scenes, y, vh, 0.92);
      const top = toneAt(scenes, y, vh, 0.04);
      if (root.dataset.usDock !== dock) root.dataset.usDock = dock;
      if (root.dataset.usTop !== top) root.dataset.usTop = top;
      if (!live) return;
      for (const s of scenes) {
        const p = s.flow ? flowProgress(y, s.top, s.height, vh, s.line) : pinProgress(y, s.top, s.height, vh);
        if (Math.abs(p - s.p) < 1e-4) continue;
        s.p = p;
        s.el.style.setProperty("--p", p.toFixed(4));
        s.feeds?.style.setProperty("--fed", p.toFixed(4));
        if (s.name === "hero") writeHero(p);
        else if (s.name === "casting") writeCasting(p);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    // the lens rows drift only while the dark house is open and on screen
    const lensTick = (now: number) => {
      const dt = Math.min(0.05, (now - (lensLast || now)) / 1000);
      lensLast = now;
      lensOffset += dt * 26;
      const half = innerWidth / 2;
      const bend = range(heroP, 0.56, 0.82);
      const slotW = slot0();
      rows.forEach(({ items, dir }) => {
        const xs = rowLayout(items.length, slotW, dir * (lensOffset + scrollY * 0.18));
        items.forEach((item, i) => {
          const x = xs[i].x;
          const l = lensPlace(x, half, bend);
          item.style.transform = `translate3d(${x.toFixed(1)}px, ${l.y.toFixed(1)}px, 0) rotate(${l.rotate.toFixed(2)}deg) scale(${l.scale.toFixed(3)})`;
        });
      });
      lensFrame = shouldLens() ? requestAnimationFrame(lensTick) : 0;
      if (!lensFrame) lensLast = 0;
    };
    const shouldLens = () => live && !document.hidden && heroP > 0.45 && scrollY < heroBottom;
    function runLens() { if (!lensFrame && shouldLens()) lensFrame = requestAnimationFrame(lensTick); }

    const clear = () => {
      scenes.forEach((s) => { s.el.style.removeProperty("--p"); s.feeds?.style.removeProperty("--fed"); });
      house?.style.removeProperty("clip-path");
      house?.removeAttribute("data-open");
      rows.forEach(({ items }) => items.forEach((item) => item.style.removeProperty("transform")));
      qa(".us-cast__co").forEach((chip) => chip.setAttribute("data-on", ""));
      qa(".us-odo__col").forEach((col, i) => col.style.setProperty("--d", String(digitsOf(10, 2)[i])));
      castScene?.setAttribute("data-full", "");
    };

    const mode = () => {
      live = motion.matches;
      root.dataset.usMotion = live ? "live" : "static";
      if (!live) clear();
      measure();
      schedule();
    };

    // reveals: observe an unclipped ancestor (a fully clipped target never intersects)
    const targets = new Map<Element, Element[]>();
    qa("[data-reveal]").forEach((el) => {
      const target = el.dataset.reveal === "mask" || el.dataset.reveal === "wipe" ? el.parentElement ?? el : el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });
    const reveal = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true"));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((_, target) => reveal.observe(target));

    const ambient = new IntersectionObserver((entries) => entries.forEach((e) => e.target.setAttribute("data-active", String(e.isIntersecting))));
    qa("[data-ambient]").forEach((el) => ambient.observe(el));

    const visibility = () => { root.toggleAttribute("data-us-hidden", document.hidden); schedule(); runLens(); };
    const resize = () => { measure(); schedule(); };
    const sizes = new ResizeObserver(resize);
    sizes.observe(document.body);

    collect();
    mode();
    document.fonts?.ready.then(resize);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(lensFrame);
      reveal.disconnect(); ambient.disconnect(); sizes.disconnect();
      removeEventListener("scroll", schedule); removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", mode);
      clear();
      delete root.dataset.usMotion;
    };
  }, []);
  return null;
}
]]>
    </file>
  </files>
</template>
