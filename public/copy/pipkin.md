<template slug="pipkin" name="Pipkin">
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
    <file path="src/app/(pipkin)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Bagel_Fat_One, Nunito, Sometype_Mono } from "next/font/google";
import "./pipkin/pipkin.css";

const display = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--font-bagel" });
const body = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const mono = Sometype_Mono({ subsets: ["latin"], variable: "--font-sometype" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Pipkin — small-batch jam, cooked Tuesday, at your door Friday",
  description: "A pastel landing page for a two-person jam shop: scroll to follow one jar from order to doorstep, then build your own box.",
};

export default function PipkinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="pk-body">
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.pk-wi{transform:none!important}.pk-load{opacity:1!important;transform:none!important;animation:none!important}.pk-marquee-track{animation:none!important}.pk-marquee{overflow:visible}.pk-marquee-track{flex-wrap:wrap}.pk-marquee-track[aria-hidden="true"]{display:none}.pk-header-bar{background:var(--color-cream)!important;border-color:var(--color-plum)!important}.pk-menu-toggle{display:none}`}</style>
        </noscript>
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/pipkin";

/**
 * Pipkin ships with no photographs: every picture on the page is drawn in SVG. This helper exists so
 * optional photos (see docs/image-prompts/pipkin.md) can be dropped in later: run `npm run images -- pipkin`
 * and render <Picture assetKey="..." />. Until the file exists it renders a labelled placeholder.
 */
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`pk-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="pk-mono">{assetKey}</span>
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
    <file path="src/app/(pipkin)/pipkin/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="14" fill="#FFD6E2"/><rect x="10" y="19" width="28" height="22" rx="10" fill="#FF9DBB" stroke="#3B2A47" stroke-width="2.6"/><rect x="14" y="8" width="20" height="11" rx="5.5" fill="#FFEBA6" stroke="#3B2A47" stroke-width="2.6"/><rect x="16" y="26" width="16" height="9" rx="4.5" fill="#FFF8EC" stroke="#3B2A47" stroke-width="2"/></svg>
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pipkin: small-batch jam, cooked Tuesday and on your doorstep by Friday.";

const pill = (bg: string, w: number, h: number, left: number, top: number) => (
  <div style={{ display: "flex", position: "absolute", left, top, width: w, height: h, borderRadius: h / 2, background: bg, border: "5px solid #3B2A47" }} />
);

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#FFF8EC", color: "#3B2A47", position: "relative", flexDirection: "column", justifyContent: "center", padding: "0 72px" }}>
        {pill("#FFD6E2", 250, 112, 910, 64)}
        {pill("#CBEBDA", 200, 112, 960, 212)}
        {pill("#E3D8F6", 270, 112, 890, 360)}
        {pill("#FFEBA6", 190, 112, 970, 508)}
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", background: "#FF9DBB", padding: "8px 26px", borderRadius: 40, alignSelf: "flex-start", border: "4px solid #3B2A47" }}>Pipkin jam</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.06, marginTop: 34, width: 800 }}>Cooked Tuesday.</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.06, width: 800 }}>At your door Friday.</div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 30, width: 760 }}>Small-batch jam from one kitchen, two cooks, 36 jars at a time.</div>
      </div>
    ),
    size,
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/page.tsx">
<![CDATA[import { OrderProvider } from "./box/OrderContext";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { FlavorBand } from "./sections/FlavorBand";
import { TripStage } from "./trip/TripStage";
import { Shelf } from "./sections/Shelf";
import { BoxBuilder } from "./sections/BoxBuilder";
import { BatchDay } from "./sections/BatchDay";
import { Notes } from "./sections/Notes";
import { Faq } from "./sections/Faq";
import { ListForm } from "./forms/ListForm";
import { Footer } from "./sections/Footer";

export default function PipkinPage() {
  return (
    <OrderProvider>
      <a href="#trip" className="pk-skip">Skip to the trip</a>
      <ScrollProgress />
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <FlavorBand />
        <TripStage />
        <Shelf />
        <BoxBuilder />
        <BatchDay />
        <Notes />
        <Faq />
        <ListForm />
      </main>
      <Footer />
    </OrderProvider>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/pipkin.css">
<![CDATA[@import "tailwindcss";
@import "./trip.css";
@import "./shop.css";

/* Pipkin: tokens. Eight pastel colours, three type roles, one motion language (organic / analog: settle, wobble, unfurl). */
@theme static {
  --color-cream: #FFF8EC; /* paper, glass, inputs */
  --color-plum: #3B2A47; /* ink: text, every outline */
  --color-blush: #FFD6E2; /* pastel tint, section ground */
  --color-bubblegum: #FF9DBB; /* the one action colour */
  --color-butter: #FFEBA6; /* lids, highlights */
  --color-mint: #CBEBDA; /* leaf, success ground */
  --color-sky: #CDE5F8; /* order ground, box ground */
  --color-lilac: #E3D8F6; /* plum jam, notes ground */

  --font-display: var(--font-bagel), "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-body: var(--font-nunito), system-ui, sans-serif;
  --font-mono: var(--font-sometype), ui-monospace, monospace;

  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);

  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 800ms;
  --dur-hero: 1200ms;

  --reveal-shift: 28px;
  --stagger: 70ms;
}

:root {
  --pk-muted: color-mix(in srgb, var(--color-plum) 76%, var(--color-cream));
  --page-p: 0;
}

html { background: var(--color-cream); scroll-padding-top: 88px; overflow-x: clip; }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: clip; }

.pk-body {
  margin: 0;
  background: var(--color-cream);
  color: var(--color-plum);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}
.pk-body ::selection { background: var(--color-bubblegum); color: var(--color-plum); }
.pk-body :focus-visible { outline: 3px solid var(--color-plum); outline-offset: 3px; }
.pk-body a { color: inherit; }
.pk-body ul, .pk-body ol { list-style: none; margin: 0; padding: 0; }
.pk-body h1, .pk-body h2, .pk-body h3, .pk-body p, .pk-body figure, .pk-body blockquote, .pk-body dl, .pk-body dd { margin: 0; }
.pk-body button { font: inherit; color: inherit; }
.pk-body fieldset { border: 0; margin: 0; padding: 0; min-inline-size: 0; }

.pk-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.pk-tnum { font-variant-numeric: tabular-nums; }
.pk-block { display: block; }
.pk-skip { position: fixed; left: 12px; top: -80px; z-index: 80; padding: 10px 18px; border-radius: 999px; background: var(--color-butter); border: 3px solid var(--color-plum); font-weight: 800; transition: top var(--dur-fast) var(--ease-out); }
.pk-skip:focus { top: 12px; }

/* type */
.pk-h1, .pk-h2, .pk-h3, .pk-logo-word, .pk-price { font-family: var(--font-display); font-weight: 400; letter-spacing: 0.005em; }
.pk-h1 { font-size: clamp(2.9rem, 7.6vw, 6.4rem); line-height: 1.04; text-wrap: balance; }
.pk-h2 { font-size: clamp(2.1rem, 4.8vw, 4rem); line-height: 1.04; text-wrap: balance; }
.pk-h3 { font-size: clamp(1.35rem, 2.2vw, 1.8rem); line-height: 1.15; }
.pk-lede { font-size: clamp(1.05rem, 1.5vw, 1.28rem); line-height: 1.55; max-width: 36em; color: var(--pk-muted); font-weight: 600; }
.pk-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; border: 2.5px solid var(--color-plum); background: var(--color-cream); }
.pk-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; color: var(--pk-muted); }
.pk-w { display: inline-block; overflow: hidden; vertical-align: top; padding: 0.08em 0 0.16em; margin: -0.08em 0 -0.16em; }
.pk-wi { display: inline-block; }
.pk-hl { position: relative; z-index: 0; display: inline-block; white-space: nowrap; padding: 0 0.2em; margin: 0 -0.04em; line-height: 1; }
.pk-hl::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: 999px; background: var(--hl, var(--color-bubblegum)); transform-origin: left center; }

.pk-mono { font-family: var(--font-mono); }

/* layout */
.pk-wrap { width: min(1180px, 100% - 32px); margin-inline: auto; }
@media (min-width: 720px) { .pk-wrap { width: min(1180px, 100% - 64px); } }
.pk-wrap--narrow { width: min(820px, 100% - 32px); }
.pk-head { display: grid; gap: 18px; justify-items: start; max-width: 52rem; }
.pk-head[data-align="center"] { justify-items: center; text-align: center; margin-inline: auto; }
.pk-sec {
  position: relative;
  margin-top: -56px;
  padding: clamp(104px, 12vw, 164px) 0 clamp(88px, 10vw, 132px);
  border-radius: 56px 56px 0 0;
  background: var(--bg, var(--color-cream));
}
.pk-sec--blush { --bg: var(--color-blush); }
.pk-sec--sky { --bg: var(--color-sky); }
.pk-sec--butter { --bg: var(--color-butter); }
.pk-sec--lilac { --bg: var(--color-lilac); }
.pk-sec--mint { --bg: var(--color-mint); }
.pk-sec--cream { --bg: var(--color-cream); }

/* buttons: wipe fill from the left, arrow slides, press squashes then springs back */
.pk-btn {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  padding: 0.9em 1.45em;
  border-radius: 999px;
  border: 2.5px solid var(--color-plum);
  background: var(--color-cream);
  color: var(--color-plum);
  font-family: var(--font-body);
  font-weight: 800;
  font-size: 1rem;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.pk-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--wipe, var(--color-butter)); transform: translateX(-101%); transition: transform var(--dur-base) var(--ease-out-expo); }
.pk-btn-primary { background: var(--color-bubblegum); --wipe: var(--color-butter); }
.pk-btn-ghost { background: transparent; --wipe: var(--color-blush); }
.pk-btn-sm { padding: 0.68em 1.1em; font-size: 0.92rem; }
.pk-btn-wide { width: 100%; padding-block: 1.1em; font-size: 1.05rem; }
.pk-btn-arrow { width: 1.1em; height: 1.1em; transition: transform var(--dur-base) var(--ease-spring); }
.pk-btn:active:not(:disabled) { transform: scale(0.96); transition-duration: var(--dur-instant); }
.pk-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.pk-btn[data-loading="true"]::before { transform: translateX(0); animation: none; }
.pk-spinner { width: 1.05em; height: 1.05em; border-radius: 50%; border: 3px solid var(--color-plum); border-right-color: transparent; animation: pk-spin 700ms linear infinite; }
.pk-magnet { display: inline-block; transform: translate3d(var(--tx, 0px), var(--ty, 0px), 0); }

.pk-chipbtn {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 0.6em 1.2em;
  border-radius: 999px;
  border: 2.5px solid var(--color-plum);
  background: var(--color-cream);
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out);
}
.pk-chipbtn[aria-pressed="true"] { background: var(--color-bubblegum); }
.pk-chipbtn:active { transform: scale(0.95); transition-duration: var(--dur-instant); }

.pk-link { position: relative; display: inline-block; text-decoration: none; padding-block: 2px; }
.pk-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2.5px; border-radius: 2px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-base) var(--ease-out-expo); }

@media (hover: hover) and (pointer: fine) {
  .pk-btn:hover:not(:disabled)::before { transform: translateX(0); }
  .pk-btn:hover:not(:disabled) .pk-btn-arrow { transform: translateX(5px); }
  .pk-chipbtn:hover { background: var(--color-butter); transform: translateY(-2px); }
  .pk-chipbtn[aria-pressed="true"]:hover { background: var(--color-bubblegum); }
  .pk-link:hover::after { transform: scaleX(1); transform-origin: left; }
}

/* progress bar, header */
.pk-progress { position: fixed; inset: 0 0 auto 0; height: 5px; z-index: 70; pointer-events: none; }
.pk-progress i { display: block; height: 100%; background: var(--color-bubblegum); border-radius: 0 999px 999px 0; transform-origin: left center; transform: scaleX(var(--page-p, 0)); }
.pk-header { position: fixed; inset: 0 0 auto 0; z-index: 50; }
.pk-header-bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: min(1180px, 100% - 20px);
  margin: 12px auto 0;
  padding: 7px 8px 7px 16px;
  border-radius: 999px;
  border: 2.5px solid transparent;
  background: transparent;
  transform-origin: 50% 0;
  transition: transform var(--dur-base) var(--ease-out-expo), background-color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
html[data-pk-scrolled="true"] .pk-header-bar { background: color-mix(in srgb, var(--color-cream) 86%, transparent); border-color: var(--color-plum); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); transform: scale(0.985); }
html[data-pk-scrolled="true"][data-pk-dir="down"] .pk-header[data-menu="false"] .pk-header-bar { transform: translateY(-130%); }
.pk-header-logo { display: inline-flex; text-decoration: none; }
.pk-logo { display: inline-flex; align-items: center; gap: 10px; }
.pk-logo-word { font-size: 1.6rem; line-height: 1; padding-top: 2px; }
.pk-logo--light { color: var(--color-cream); }
.pk-nav { display: none; }
.pk-nav-list { position: relative; display: flex; gap: 2px; }
.pk-nav-ind { position: absolute; left: 0; top: 0; bottom: 0; width: 100px; border-radius: 999px; background: var(--color-blush); transform-origin: left center; transform: translateX(var(--ix, 0px)) scaleX(var(--is, 1)); opacity: 0; transition: transform var(--dur-base) var(--ease-spring), opacity var(--dur-fast) var(--ease-out); }
.pk-nav-ind[data-on="true"] { opacity: 1; }
.pk-nav-link { position: relative; z-index: 1; display: block; padding: 9px 15px; border-radius: 999px; font-weight: 800; font-size: 0.95rem; text-decoration: none; }
.pk-nav-link[data-active="true"] { color: var(--color-plum); }
.pk-header-actions { display: flex; align-items: center; gap: 8px; }
.pk-cart { display: inline-flex; align-items: center; gap: 8px; padding: 5px 5px 5px 14px; border-radius: 999px; border: 2.5px solid var(--color-plum); background: var(--color-cream); font-weight: 800; font-size: 0.9rem; text-decoration: none; transition: transform var(--dur-base) var(--ease-spring); }
.pk-cart:active { transform: scale(0.95); transition-duration: var(--dur-instant); }
.pk-cart-count { display: grid; place-items: center; min-width: 28px; height: 28px; padding: 0 6px; border-radius: 999px; background: var(--color-blush); border: 2px solid var(--color-plum); font-variant-numeric: tabular-nums; line-height: 1; }
.pk-cart-count[data-bump="true"] { background: var(--color-bubblegum); }
.pk-header-cta { display: none; }
.pk-menu-toggle { position: relative; width: 46px; height: 46px; border-radius: 50%; border: 2.5px solid var(--color-plum); background: var(--color-butter); cursor: pointer; transition: transform var(--dur-base) var(--ease-spring); }
.pk-menu-toggle:active { transform: scale(0.93); transition-duration: var(--dur-instant); }
.pk-menu-bars i { position: absolute; left: 12px; right: 12px; height: 3px; border-radius: 2px; background: var(--color-plum); transition: transform var(--dur-base) var(--ease-spring); }
.pk-menu-bars i:nth-child(1) { top: 17px; }
.pk-menu-bars i:nth-child(2) { top: 26px; }
.pk-menu-toggle[aria-expanded="true"] .pk-menu-bars i:nth-child(1) { transform: translateY(4.5px) rotate(45deg); }
.pk-menu-toggle[aria-expanded="true"] .pk-menu-bars i:nth-child(2) { transform: translateY(-4.5px) rotate(-45deg); }
.pk-menu { position: fixed; inset: 0; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; padding: 110px 24px 32px; background: var(--color-butter); clip-path: circle(0px at calc(100% - 44px) 44px); visibility: hidden; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s linear var(--dur-slow); }
.pk-menu[data-open="true"] { clip-path: circle(150% at calc(100% - 44px) 44px); visibility: visible; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s; }
.pk-menu-list { display: grid; gap: 8px; }
.pk-menu-list li { opacity: 0; transform: translateY(26px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); }
.pk-menu[data-open="true"] .pk-menu-list li { opacity: 1; transform: none; transition-delay: calc(240ms + var(--i, 0) * 70ms); }
.pk-menu-link { display: block; padding: 6px 0; font-family: var(--font-display); font-size: clamp(2.2rem, 11vw, 3.4rem); line-height: 1.1; text-decoration: none; }

@media (min-width: 960px) {
  .pk-nav { display: block; }
  .pk-header-cta { display: inline-block; }
  .pk-menu-toggle { display: none; }
  .pk-menu { display: none; }
}

/* hero */
.pk-hero {
  position: relative;
  overflow: clip;
  display: grid;
  gap: 24px;
  align-items: center;
  padding: 128px max(16px, calc((100% - 1180px) / 2)) 140px;
  min-height: min(100svh, 920px);
}
.pk-hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.pk-blob { position: absolute; border-radius: 999px; }
.pk-blob-1 { width: min(560px, 70vw); height: 230px; right: -140px; top: 96px; background: var(--color-sky); rotate: -14deg; }
.pk-blob-2 { width: 280px; height: 280px; left: -110px; bottom: 30px; background: var(--color-blush); }
.pk-blob-3 { width: 360px; height: 150px; right: 6%; bottom: -34px; background: var(--color-mint); rotate: 9deg; }
.pk-blob-4 { width: 120px; height: 120px; left: 46%; top: 110px; background: var(--color-butter); }
.pk-hero-copy, .pk-hero-art { position: relative; z-index: 1; }
.pk-hero-copy { display: grid; gap: 22px; justify-items: start; }
.pk-order-pill { display: inline-flex; align-items: center; gap: 10px; padding: 8px 18px 8px 12px; border-radius: 999px; border: 2.5px solid var(--color-plum); background: var(--color-cream); font-family: var(--font-mono); font-size: 13px; font-weight: 500; }
.pk-order-dot { position: relative; width: 12px; height: 12px; border-radius: 50%; background: var(--color-bubblegum); border: 2px solid var(--color-plum); }
.pk-hero .pk-hl { --hl: var(--color-bubblegum); }
.pk-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
.pk-hero-facts { display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 0.95rem; color: var(--pk-muted); }
.pk-hero-facts b { color: var(--color-plum); font-family: var(--font-display); font-weight: 400; font-size: 1.15em; }
.pk-hero-art { display: grid; place-items: center; }
.pk-hero-stack { position: relative; width: min(100%, 520px); aspect-ratio: 1 / 1.02; }
.pk-hero-stack::before { content: ""; position: absolute; inset: 7% 5% 9%; border-radius: 50%; background: var(--color-sky); border: 3px solid var(--color-plum); }
.pk-hero-jar { position: absolute; transform-origin: 50% 100%; }
.pk-hero-jar .pk-jar { width: 100%; height: auto; display: block; }
.pk-hero-jar-1 { width: 33%; left: 6%; bottom: 14%; rotate: -9deg; }
.pk-hero-jar-2 { width: 46%; left: 27%; bottom: 20%; z-index: 2; }
.pk-hero-jar-3 { width: 33%; right: 5%; bottom: 14%; rotate: 8deg; }
.pk-chip { position: absolute; display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; background: var(--color-cream); border: 2.5px solid var(--color-plum); font-weight: 800; font-size: 0.85rem; white-space: nowrap; z-index: 3; }
.pk-chip-ic { width: 20px; height: 20px; }
.pk-chip-1 { left: 0; top: 14%; rotate: -6deg; }
.pk-chip-2 { right: -2%; top: 30%; rotate: 5deg; }
.pk-chip-3 { left: 8%; bottom: 3%; rotate: 3deg; }
.pk-spark { position: absolute; width: 38px; height: 38px; z-index: 3; }
.pk-spark-1 { right: 12%; top: 6%; }
.pk-spark-2 { left: 40%; top: 2%; width: 26px; height: 26px; }
.pk-spark-3 { right: 4%; bottom: 20%; width: 30px; height: 30px; }
.pk-jar { overflow: visible; }
.pk-jar-fill { transform: translateY(calc((1 - var(--jar-lvl, 1)) * 112px)); transition: transform var(--dur-base) var(--ease-out); }
.pk-jar-label { font-family: var(--font-mono); font-size: 12px; font-weight: 600; fill: var(--color-plum); }
.pk-svg-text { font-family: var(--font-mono); font-size: 13px; font-weight: 500; fill: var(--color-plum); }
.pk-svg-strong { font-weight: 700; }
.pk-svg-big { font-size: 20px; }
.pk-svg-small { font-size: 12px; }

@media (min-width: 960px) {
  .pk-hero { grid-template-columns: 1.08fr 0.92fr; gap: 40px; padding-top: 140px; }
}
@media (max-width: 959px) {
  .pk-hero-art { margin-top: 12px; }
  .pk-hero-stack { width: min(100%, 440px); }
}

/* band between hero and trip */
.pk-band { position: relative; z-index: 3; margin: -28px -2vw 28px; padding: 18px 0; background: var(--color-bubblegum); border-block: 3px solid var(--color-plum); rotate: -1.4deg; overflow: hidden; }
.pk-band-pill { display: inline-flex; align-items: center; gap: 12px; padding: 8px 20px; border-radius: 999px; background: var(--tone); border: 2.5px solid var(--color-plum); font-family: var(--font-display); font-size: 1.2rem; line-height: 1.2; white-space: nowrap; }
.pk-band-spark { width: 18px; height: 18px; }

/* marquee */
.pk-marquee { display: flex; overflow: hidden; }
.pk-marquee-track { display: flex; flex-shrink: 0; align-items: center; gap: 16px; min-width: 100%; padding-right: 16px; }
.pk-marquee > .pk-marquee-track { justify-content: space-around; }

/* reveals: hidden states only under no-preference, so reduced motion and no-JS see everything */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo), clip-path var(--dur-slow) var(--ease-in-out);
    transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger));
  }
  [data-reveal="rise"]:not([data-in="true"]) { opacity: 0; transform: translateY(var(--reveal-shift)); }
  [data-reveal="scale"]:not([data-in="true"]) { opacity: 0; transform: scale(0.92) rotate(-1.5deg); }
  [data-reveal="wipe"]:not([data-in="true"]) { clip-path: inset(0 0 100% 0); }
  [data-reveal="draw"]:not([data-in="true"]) { transform: scaleX(0); transform-origin: left center; }
  [data-reveal="draw"] { transform-origin: left center; transition-duration: 1.4s; }
  [data-reveal="slide-left"]:not([data-in="true"]) { opacity: 0; transform: translateX(-32px); }
  [data-reveal="slide-right"]:not([data-in="true"]) { opacity: 0; transform: translateX(32px); }
  [data-reveal="pop"] { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-spring); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger)); }
  [data-reveal="pop"]:not([data-in="true"]) { opacity: 0; transform: translateY(34px) scale(0.9) rotate(-2.5deg); }
  [data-reveal="mask"] .pk-wi { transition: transform var(--dur-slow) var(--ease-out-expo); transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * 45ms); }
  [data-reveal="mask"]:not([data-in="true"]) .pk-wi { transform: translateY(112%); }
  [data-reveal="mask"] .pk-hl::before { transition: transform var(--dur-slow) var(--ease-out-expo) 320ms; }
  [data-reveal="mask"]:not([data-in="true"]) .pk-hl::before { transform: scaleX(0); }

  /* load choreography: bg settles, logo + nav drop, headline masks, copy, CTAs, jars, then ambient life */
  .pk-hero-bg { animation: pk-settle 1400ms var(--ease-out-expo) both; }
  .pk-header-bar { animation: pk-drop 900ms var(--ease-out-expo) 150ms both; }
  .pk-nav-list li { animation: pk-drop 800ms var(--ease-out-expo) both; animation-delay: calc(260ms + var(--n, 0) * 50ms); }
  .pk-nav-list li:nth-child(2) { --n: 1; } .pk-nav-list li:nth-child(3) { --n: 2; } .pk-nav-list li:nth-child(4) { --n: 3; } .pk-nav-list li:nth-child(5) { --n: 4; } .pk-nav-list li:nth-child(6) { --n: 5; }
  .pk-load { animation: pk-rise var(--dur-hero) var(--ease-out-expo) both; animation-delay: var(--delay, 0ms); }
  .pk-hero .pk-wi { animation: pk-mask-rise 1000ms var(--ease-out-expo) both; animation-delay: calc(300ms + var(--i, 0) * 70ms); }
  .pk-hero .pk-hl::before { animation: pk-wipe 900ms var(--ease-out-expo) 950ms both; }
  .pk-hero-jar { animation: pk-jar-drop 1300ms var(--ease-spring) both; animation-delay: calc(650ms + var(--n, 0) * 130ms); }
  .pk-hero-jar-1 { --n: 0; } .pk-hero-jar-2 { --n: 1; } .pk-hero-jar-3 { --n: 2; }
  .pk-hero-stack::before { animation: pk-bloom 1100ms var(--ease-out-expo) 500ms both; }
  .pk-chip { animation: pk-pop 800ms var(--ease-spring) both; animation-delay: calc(1100ms + var(--n, 0) * 140ms); }
  .pk-chip-2 { --n: 1; } .pk-chip-3 { --n: 2; }
  .pk-spark { animation: pk-pop 700ms var(--ease-spring) 1400ms both; }

  /* ambient: blobs drift, jars breathe, order dot pings. Three loops, desynchronised. */
  .pk-blob { animation: pk-drift-blob 16s ease-in-out 1.4s infinite alternate; }
  .pk-blob-2 { animation-duration: 21s; animation-delay: 2s; } .pk-blob-3 { animation-duration: 18s; animation-delay: 0.6s; } .pk-blob-4 { animation-duration: 13s; }
  .pk-hero-stack .pk-hero-jar > .pk-jar { animation: pk-breathe 6s ease-in-out 2s infinite alternate; transform-origin: 50% 100%; }
  .pk-hero-jar-1 > .pk-jar { animation-duration: 7.4s; animation-delay: 2.4s; } .pk-hero-jar-3 > .pk-jar { animation-duration: 8.2s; animation-delay: 3s; }
  .pk-order-dot::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid var(--color-bubblegum); animation: pk-ping 2.2s ease-out 1.6s infinite; }
  .pk-hero[data-off="true"] * { animation-play-state: paused !important; }

  /* exit handoff: hero copy and art drift up while the band and trip slide over */
  @supports (animation-timeline: view()) {
    .pk-hero-art { animation: pk-par-art linear both; animation-timeline: view(); animation-range: exit 0% exit 100%; }
    .pk-hero-copy { animation: pk-par-copy linear both; animation-timeline: view(); animation-range: exit 10% exit 100%; }
    .pk-hero-bg { animation: pk-settle 1400ms var(--ease-out-expo) both, pk-par-bg linear both; animation-timeline: auto, view(); animation-range: normal, exit 0% exit 100%; }
    .pk-sec > .pk-wrap { animation: pk-handoff linear both; animation-timeline: view(); animation-range: exit 25% exit 100%; }
  }

  @keyframes pk-settle { from { opacity: 0; transform: scale(1.06); } }
  @keyframes pk-drop { from { opacity: 0; transform: translateY(-22px); } }
  @keyframes pk-rise { from { opacity: 0; transform: translateY(24px); } }
  @keyframes pk-mask-rise { from { transform: translateY(112%); } }
  @keyframes pk-wipe { from { transform: scaleX(0); } }
  @keyframes pk-jar-drop { 0% { opacity: 0; transform: translateY(-120px) scale(0.9, 1.1); } 100% { opacity: 1; transform: none; } }
  @keyframes pk-bloom { from { opacity: 0; transform: scale(0.7); } }
  @keyframes pk-pop { from { opacity: 0; transform: scale(0.4) rotate(-12deg); } }
  @keyframes pk-drift-blob { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(28px, -22px, 0); } }
  @keyframes pk-breathe { from { transform: rotate(-1.6deg) scale(1); } to { transform: rotate(1.6deg) scale(1.025, 0.985); } }
  @keyframes pk-ping { from { opacity: 0.9; transform: scale(0.6); } to { opacity: 0; transform: scale(1.7); } }
  @keyframes pk-par-art { to { transform: translateY(-80px); } }
  @keyframes pk-par-copy { to { transform: translateY(-36px); opacity: 0.35; } }
  @keyframes pk-par-bg { to { transform: translateY(60px); } }
  @keyframes pk-handoff { to { transform: scale(0.96) translateY(-26px); opacity: 0.5; } }
  @keyframes pk-spin { to { transform: rotate(360deg); } }
  @keyframes pk-text-in { from { opacity: 0; transform: translateY(14px); } }
  @keyframes pk-marq { to { transform: translateX(-100%); } }
  @keyframes pk-pop-in { from { opacity: 0; transform: translateY(30px) scale(0.94); } }
  @keyframes pk-bump { 0% { transform: scale(0.6); } 55% { transform: scale(1.25); } 100% { transform: scale(1); } }
  @keyframes pk-shake-a { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(3px); } }
  @keyframes pk-shake-b { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(3px); } }
  @keyframes pk-drop-in { 0% { opacity: 0; transform: translateY(-40px) scale(0.8, 1.15); } 60% { opacity: 1; transform: translateY(4px) scale(1.06, 0.94); } 100% { transform: none; } }
  @keyframes pk-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
  @keyframes pk-slide-down { from { opacity: 0; transform: translateY(-8px); } }
  @keyframes pk-spin-slow { to { transform: rotate(360deg); } }

  .pk-marquee-track { animation: pk-marq var(--speed, 40s) linear infinite; animation-play-state: paused; }
  .pk-marquee[data-reverse="true"] .pk-marquee-track { animation-direction: reverse; }
  .pk-marquee[data-live="true"] .pk-marquee-track { animation-play-state: running; }
  .pk-marquee:hover .pk-marquee-track, .pk-marquee:focus-within .pk-marquee-track { animation-play-state: paused; }
  .pk-cart-count[data-bump="true"] { animation: pk-bump 520ms var(--ease-spring); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; transition-delay: 0ms !important; }
  .pk-marquee { overflow-x: auto; }
  .pk-marquee-track[aria-hidden="true"] { display: none; }
  .pk-band { overflow-x: auto; }
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/shop.css">
<![CDATA[/* Shelf, box builder, batch day, notes, questions, the Friday list, footer. */

/* shelf */
.pk-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
.pk-shelf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 22px; margin-top: 36px; }
.pk-card-li { min-width: 0; }
.pk-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 18px 18px 20px;
  border-radius: 40px;
  border: 3px solid var(--color-plum);
  background: var(--color-cream);
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px));
  transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out);
}
.pk-card > * { position: relative; z-index: 1; }
.pk-card-glow { position: absolute; inset: 0; z-index: 0 !important; border-radius: 37px; background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 20%), color-mix(in srgb, var(--tone) 90%, transparent), transparent 70%); opacity: 0; transition: opacity var(--dur-base) var(--ease-out); pointer-events: none; }
.pk-card-lidno { position: absolute !important; z-index: 2 !important; top: 28px; left: 28px; padding: 3px 12px; border-radius: 999px; background: var(--color-cream); border: 2px solid var(--color-plum); font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; }
.pk-card-art { display: grid; place-items: center; height: 188px; border-radius: 28px; background: var(--tone); border: 2.5px solid var(--color-plum); overflow: hidden; }
.pk-card-art .pk-jar { width: 112px; height: auto; transition: transform var(--dur-base) var(--ease-spring); }
.pk-card-name { font-family: var(--font-display); font-size: 1.45rem; line-height: 1.12; margin-top: 6px; }
.pk-card-line { color: var(--pk-muted); font-size: 0.97rem; line-height: 1.5; flex: 1; }
.pk-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.pk-tag { padding: 2px 11px; border-radius: 999px; background: color-mix(in srgb, var(--tone) 70%, var(--color-cream)); border: 2px solid var(--color-plum); font-family: var(--font-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.pk-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
.pk-price { font-size: 1.7rem; line-height: 1; }
.pk-price small { font-family: var(--font-body); font-size: 0.8rem; font-weight: 700; color: var(--pk-muted); }
.pk-add-count { display: inline-grid; place-items: center; min-width: 26px; height: 22px; padding: 0 6px; border-radius: 999px; background: var(--color-butter); border: 2px solid var(--color-plum); font-size: 0.78rem; }
.pk-add:focus-visible { outline-offset: 4px; }
@media (prefers-reduced-motion: no-preference) {
  .pk-card-li { animation: pk-pop-in 700ms var(--ease-spring) both; animation-delay: calc(var(--i, 0) * 70ms); }
  .pk-add-count { animation: pk-bump 520ms var(--ease-spring); }
}
@media (hover: hover) and (pointer: fine) {
  .pk-card:hover { --lift: -8px; }
  .pk-card:hover .pk-card-glow { opacity: 1; }
  .pk-card:hover .pk-card-art .pk-jar { transform: scale(1.1) rotate(-4deg); }
  .pk-shelf-grid:has(.pk-card:hover) .pk-card-li:not(:hover) .pk-card { opacity: 0.62; }
}
.pk-card:active { --lift: -2px; }

/* box builder */
.pk-bb { position: relative; display: grid; gap: 28px; margin-top: 44px; align-items: start; }
@media (min-width: 960px) { .pk-bb { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; } }
.pk-box { position: relative; padding: 38px 24px 24px; border-radius: 48px; border: 3px solid var(--color-plum); background: var(--color-butter); }
.pk-box-lid { position: absolute; left: 50%; top: -20px; transform: translateX(-50%); padding: 6px 20px; border-radius: 999px; border: 3px solid var(--color-plum); background: var(--color-blush); font-family: var(--font-mono); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; }
.pk-slots { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 12px; }
.pk-slot { display: grid; place-items: center; aspect-ratio: 1 / 1.12; border-radius: 30px; border: 2.5px dashed color-mix(in srgb, var(--color-plum) 55%, transparent); background: color-mix(in srgb, var(--color-cream) 45%, transparent); }
.pk-slot[data-filled="true"] { border: 2.5px solid var(--color-plum); background: var(--color-cream); }
.pk-slot-jar { width: 68%; height: auto; }
.pk-slot-empty { font-family: var(--font-body); font-weight: 800; font-size: 1.8rem; color: color-mix(in srgb, var(--color-plum) 50%, transparent); }
.pk-box-count { margin-top: 16px; text-align: center; font-family: var(--font-mono); font-size: 13px; min-height: 2.6em; }
.pk-box-count b { font-family: var(--font-body); font-weight: 800; font-size: 1.35em; font-variant-numeric: tabular-nums; }
.pk-box-notice { color: var(--pk-muted); }
@media (prefers-reduced-motion: no-preference) {
  .pk-slot[data-filled="true"] { animation: pk-drop-in 700ms var(--ease-spring) both; }
  .pk-box-notice { animation: pk-slide-down 400ms var(--ease-out-expo) both; }
  .pk-step-n { animation: pk-bump 380ms var(--ease-spring); }
  .pk-sum-total dd { animation: pk-bump 420ms var(--ease-spring); transform-origin: right center; }
}

.pk-bb-panel { position: relative; }
.pk-panel-inner { display: grid; gap: 18px; padding: 24px; border-radius: 44px; border: 3px solid var(--color-plum); background: var(--color-cream); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); }
.pk-bb[data-status="placed"] .pk-panel-inner { opacity: 0; transform: translateY(-14px) scale(0.98); pointer-events: none; }
.pk-seg { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 4px; border-radius: 999px; border: 3px solid var(--color-plum); background: var(--color-butter); }
.pk-seg-thumb { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 3); border-radius: 999px; background: var(--color-bubblegum); border: 2.5px solid var(--color-plum); transform: translateX(calc(var(--k, 0) * 100%)); transition: transform var(--dur-base) var(--ease-spring); }
.pk-seg-opt { position: relative; z-index: 1; display: grid; place-items: center; padding: 10px 6px; border-radius: 999px; font-weight: 800; cursor: pointer; }
.pk-seg-opt input { position: absolute; inset: 0; opacity: 0; cursor: pointer; margin: 0; }
.pk-seg-opt:has(input:focus-visible) { outline: 3px solid var(--color-plum); outline-offset: 2px; }
.pk-rows { display: grid; gap: 6px; }
.pk-row { display: flex; align-items: center; gap: 12px; padding: 7px 8px 7px 12px; border-radius: 999px; border: 2.5px solid transparent; transition: background-color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out); }
.pk-row[data-has="true"] { background: color-mix(in srgb, var(--tone) 55%, var(--color-cream)); border-color: var(--color-plum); }
.pk-row-dot { flex: none; width: 20px; height: 20px; border-radius: 50%; background: var(--tone); border: 2px solid var(--color-plum); }
.pk-row-name { flex: 1; min-width: 0; font-weight: 800; font-size: 0.97rem; line-height: 1.25; }
.pk-stepper { display: inline-flex; align-items: center; gap: 6px; }
.pk-step { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; border: 2.5px solid var(--color-plum); background: var(--color-cream); font-size: 1.2rem; font-weight: 800; line-height: 1; cursor: pointer; transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out); }
.pk-step:active:not(:disabled) { transform: scale(0.86); transition-duration: var(--dur-instant); }
.pk-step:disabled { opacity: 0.35; cursor: not-allowed; }
.pk-step-n { min-width: 1.6ch; text-align: center; font-family: var(--font-mono); font-weight: 600; font-variant-numeric: tabular-nums; }
@media (hover: hover) and (pointer: fine) { .pk-step:hover:not(:disabled) { background: var(--color-butter); } .pk-row:hover:not([data-has="true"]) { background: color-mix(in srgb, var(--tone) 28%, var(--color-cream)); } }
.pk-sum { display: grid; gap: 6px; padding-top: 14px; border-top: 3px dotted var(--color-plum); font-weight: 700; }
.pk-sum > div { display: flex; justify-content: space-between; gap: 12px; transition: opacity var(--dur-fast) var(--ease-out); }
.pk-sum > div[data-dim="true"] { color: var(--pk-muted); font-weight: 600; }
.pk-sum dd { font-variant-numeric: tabular-nums; }
.pk-sum-total { align-items: baseline; font-family: var(--font-display); font-size: 1.7rem; font-weight: 400; }

/* success ticket replaces the panel by unfurling downward */
.pk-ticket { position: absolute; inset: 0; display: grid; place-items: center; padding: 24px; border-radius: 44px; border: 3px solid var(--color-plum); background: var(--color-blush); clip-path: inset(0 0 100% 0 round 44px); visibility: hidden; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s linear var(--dur-slow); }
.pk-bb[data-status="placed"] .pk-ticket { clip-path: inset(0 0 0 0 round 44px); visibility: visible; transition: clip-path var(--dur-slow) var(--ease-in-out), visibility 0s; }
.pk-ticket-inner, .pk-done-inner { display: grid; gap: 12px; justify-items: center; text-align: center; max-width: 30rem; }
.pk-ticket-check { display: grid; place-items: center; width: 68px; height: 68px; border-radius: 50%; background: var(--color-mint); border: 3px solid var(--color-plum); }
.pk-ticket-check svg { width: 34px; height: 34px; }
.pk-check-path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.pk-ticket-lines { display: grid; gap: 4px; width: 100%; padding: 12px 16px; border-radius: 24px; background: var(--color-cream); border: 2.5px solid var(--color-plum); text-align: left; }
.pk-ticket-lines li { display: flex; justify-content: space-between; gap: 12px; font-weight: 700; }
.pk-ticket-total { color: var(--pk-muted); font-size: 0.95rem; }
.pk-ticket-actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
@media (prefers-reduced-motion: no-preference) {
  .pk-bb[data-status="placed"] .pk-ticket-inner > * { animation: pk-text-in 700ms var(--ease-out-expo) both; animation-delay: calc(500ms + var(--n, 0) * 80ms); }
  .pk-ticket-inner > :nth-child(2) { --n: 1; } .pk-ticket-inner > :nth-child(3) { --n: 2; } .pk-ticket-inner > :nth-child(4) { --n: 3; } .pk-ticket-inner > :nth-child(5) { --n: 4; } .pk-ticket-inner > :nth-child(6) { --n: 5; }
  .pk-bb[data-status="placed"] .pk-ticket-check .pk-check-path, .pk-list[data-status="done"] .pk-ticket-check .pk-check-path { animation: pk-draw 700ms var(--ease-out) 800ms both; }
  .pk-bb[data-status="placed"] .pk-ticket-check, .pk-list[data-status="done"] .pk-ticket-check { animation: pk-pop 800ms var(--ease-spring) 500ms both; }
}

/* batch day */
.pk-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 44px; }
@media (min-width: 860px) { .pk-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; } }
.pk-stat { display: grid; gap: 4px; padding: 22px 22px 20px; border-radius: 36px; border: 3px solid var(--color-plum); background: var(--color-cream); }
.pk-stat:nth-child(2) { background: var(--color-blush); } .pk-stat:nth-child(3) { background: var(--color-mint); } .pk-stat:nth-child(4) { background: var(--color-sky); }
.pk-stat-n { font-family: var(--font-display); font-size: clamp(2.5rem, 5.4vw, 4rem); line-height: 1; }
.pk-stat-l { color: var(--pk-muted); font-weight: 700; font-size: 0.95rem; line-height: 1.35; }
.pk-week { position: relative; margin-top: 56px; }
.pk-week-line { position: absolute; left: 10%; right: 10%; top: 30px; height: 6px; }
.pk-week-line span { display: block; height: 100%; border-radius: 3px; background: repeating-linear-gradient(90deg, var(--color-plum) 0 14px, transparent 14px 24px); }
.pk-week-list { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.pk-day { display: grid; justify-items: center; gap: 10px; text-align: center; }
.pk-day-pill { display: grid; place-items: center; width: clamp(48px, 9vw, 68px); height: clamp(48px, 9vw, 68px); border-radius: 50%; background: var(--tone); border: 3px solid var(--color-plum); font-family: var(--font-display); font-size: clamp(0.95rem, 2vw, 1.3rem); transition: transform var(--dur-base) var(--ease-spring); }
.pk-day-pill[data-key="true"] { transform: scale(1.14); outline: 3px solid var(--color-plum); outline-offset: 4px; }
.pk-day-job { font-weight: 800; font-size: clamp(0.78rem, 1.5vw, 0.98rem); line-height: 1.3; max-width: 9em; }
@media (hover: hover) and (pointer: fine) { .pk-day:hover .pk-day-pill { transform: translateY(-6px) rotate(-6deg) scale(1.08); } }

/* notes */
.pk-notes { display: grid; gap: 18px; margin-top: 52px; }
.pk-note { flex: 0 0 min(340px, 78vw); display: grid; gap: 14px; padding: 22px 24px; border-radius: 36px; border: 3px solid var(--color-plum); background: var(--tone); transition: transform var(--dur-base) var(--ease-spring); }
.pk-note blockquote { font-size: 1.02rem; line-height: 1.5; font-weight: 700; }
.pk-note figcaption { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; font-weight: 500; }
.pk-note-heart { width: 18px; height: 16px; flex: none; }
@media (hover: hover) and (pointer: fine) { .pk-note:hover { transform: translateY(-6px) rotate(-1.2deg); } }

/* questions */
.pk-faq { display: grid; gap: 12px; margin-top: 40px; }
.pk-faq-item { border-radius: 32px; border: 3px solid var(--color-plum); background: var(--color-cream); }
.pk-faq-item:has(.pk-faq-a[data-open="true"]) { background: var(--color-butter); }
.pk-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; padding: 18px 20px 18px 24px; border: 0; border-radius: 29px; background: transparent; text-align: left; font-family: var(--font-display); font-size: clamp(1.05rem, 2vw, 1.3rem); line-height: 1.25; cursor: pointer; }
.pk-faq-plus { position: relative; flex: none; width: 34px; height: 34px; border-radius: 50%; border: 2.5px solid var(--color-plum); background: var(--color-blush); transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out); }
.pk-faq-plus i { position: absolute; left: 8px; right: 8px; top: 50%; height: 3px; margin-top: -1.5px; border-radius: 2px; background: var(--color-plum); transition: transform var(--dur-base) var(--ease-spring); }
.pk-faq-plus i:nth-child(2) { transform: rotate(90deg); }
.pk-faq-q[aria-expanded="true"] .pk-faq-plus { transform: rotate(180deg); background: var(--color-bubblegum); }
.pk-faq-q[aria-expanded="true"] .pk-faq-plus i:nth-child(2) { transform: rotate(0deg); }
.pk-faq-q:active .pk-faq-plus { transform: scale(0.88); }
.pk-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-base) var(--ease-out-expo); }
.pk-faq-a[data-open="true"] { grid-template-rows: 1fr; }
.pk-faq-a > div { overflow: hidden; }
.pk-faq-a p { padding: 0 24px 22px; color: var(--pk-muted); max-width: 42em; opacity: 0; transform: translateY(-6px); transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out-expo); }
.pk-faq-a[data-open="true"] p { opacity: 1; transform: none; }
@media (hover: hover) and (pointer: fine) { .pk-faq-q:hover .pk-faq-plus { background: var(--color-butter); } }

/* the Friday list */
.pk-list { display: grid; gap: 32px; align-items: center; }
@media (min-width: 900px) { .pk-list { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 56px; } }
.pk-list-copy { display: grid; gap: 18px; justify-items: start; }
.pk-list .pk-hl { --hl: var(--color-bubblegum); }
.pk-list-card { position: relative; overflow: hidden; padding: 26px; border-radius: 44px; border: 3px solid var(--color-plum); background: var(--color-cream); }
.pk-form { display: grid; gap: 16px; transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-slow) var(--ease-out-expo); }
.pk-list[data-status="done"] .pk-form { opacity: 0; transform: translateY(-14px) scale(0.98); }
.pk-field { position: relative; }
.pk-field input { width: 100%; padding: 26px 20px 10px; border: 3px solid var(--color-plum); border-radius: 999px; background: var(--color-cream); font: 700 1.02rem var(--font-body); color: var(--color-plum); transition: background-color var(--dur-fast) var(--ease-out); }
.pk-field input:focus { outline: 3px solid var(--color-bubblegum); outline-offset: 3px; background: color-mix(in srgb, var(--color-butter) 45%, var(--color-cream)); }
.pk-field label { position: absolute; left: 22px; top: 50%; transform: translateY(-50%); transform-origin: left center; pointer-events: none; color: var(--pk-muted); font-weight: 700; transition: transform var(--dur-fast) var(--ease-out); }
.pk-field input:focus + label, .pk-field input:not(:placeholder-shown) + label { transform: translateY(-168%) scale(0.76); }
.pk-field[data-error="true"] input { border-style: dashed; background: color-mix(in srgb, var(--color-blush) 55%, var(--color-cream)); }
.pk-err { margin-top: 6px; font-size: 0.86rem; font-weight: 800; }
.pk-err:empty { display: none; }
.pk-err:not(:empty) { display: inline-block; padding: 3px 12px; border-radius: 999px; background: var(--color-blush); border: 2px solid var(--color-plum); }
.pk-lean { display: grid; gap: 10px; }
.pk-lean-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.pk-lean-opt { position: relative; display: grid; place-items: center; padding: 10px 6px; border-radius: 999px; border: 2.5px solid var(--color-plum); background: color-mix(in srgb, var(--tone) 40%, var(--color-cream)); font-weight: 800; font-size: 0.92rem; cursor: pointer; transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out); }
.pk-lean-opt input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.pk-lean-opt:has(input:checked) { background: var(--tone); transform: scale(1.05); outline: 3px solid var(--color-plum); outline-offset: 2px; }
.pk-lean-opt:has(input:focus-visible) { outline: 3px solid var(--color-plum); outline-offset: 3px; }
.pk-lean-opt:active { transform: scale(0.94); transition-duration: var(--dur-instant); }
.pk-lean[data-error="true"] .pk-lean-opt { border-style: dashed; }
.pk-done { position: absolute; inset: 0; display: grid; place-items: center; padding: 26px; background: var(--color-blush); clip-path: circle(0% at 50% 100%); visibility: hidden; transition: clip-path 900ms var(--ease-in-out), visibility 0s linear 900ms; }
.pk-list[data-status="done"] .pk-done { clip-path: circle(150% at 50% 100%); visibility: visible; transition: clip-path 900ms var(--ease-in-out), visibility 0s; }
.pk-done-inner { max-width: 26rem; }
@media (prefers-reduced-motion: no-preference) {
  .pk-form[data-shake="0"] .pk-field[data-error="true"], .pk-form[data-shake="0"] .pk-lean[data-error="true"] { animation: pk-shake-a 300ms var(--ease-out); }
  .pk-form[data-shake="1"] .pk-field[data-error="true"], .pk-form[data-shake="1"] .pk-lean[data-error="true"] { animation: pk-shake-b 300ms var(--ease-out); }
  .pk-err:not(:empty) { animation: pk-slide-down 380ms var(--ease-out-expo) both; }
  .pk-list[data-status="done"] .pk-done-inner > * { animation: pk-text-in 700ms var(--ease-out-expo) both; animation-delay: calc(500ms + var(--n, 0) * 80ms); }
  .pk-done-inner > :nth-child(2) { --n: 1; } .pk-done-inner > :nth-child(3) { --n: 2; } .pk-done-inner > :nth-child(4) { --n: 3; } .pk-done-inner > :nth-child(5) { --n: 4; }
}
@media (hover: hover) and (pointer: fine) { .pk-lean-opt:hover:not(:has(input:checked)) { transform: translateY(-3px); } }

/* footer */
.pk-footer { position: relative; margin-top: -56px; padding: 132px 0 36px; border-radius: 56px 56px 0 0; background: var(--color-plum); color: var(--color-cream); overflow: clip; }
.pk-footer-grid { display: grid; gap: 36px; }
@media (min-width: 760px) { .pk-footer-grid { grid-template-columns: 1.6fr 1fr 1fr; } }
.pk-footer-line { margin-top: 16px; max-width: 22em; color: color-mix(in srgb, var(--color-cream) 80%, var(--color-plum)); }
.pk-footer-h { margin-bottom: 10px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-bubblegum); }
.pk-footer ul { display: grid; gap: 6px; font-weight: 800; }
.pk-footer-mark { overflow: hidden; margin-top: 48px; line-height: 0.9; padding-bottom: 0.04em; }
.pk-footer-mark span { display: block; padding-bottom: 0.14em; font-family: var(--font-display); font-size: clamp(5.5rem, 27vw, 22rem); color: var(--color-bubblegum); text-align: center; }
.pk-footer-small { margin-top: 28px; text-align: center; font-size: 0.85rem; color: color-mix(in srgb, var(--color-cream) 70%, var(--color-plum)); }
@media (prefers-reduced-motion: no-preference) {
  .pk-footer-mark[data-reveal="mask"] span { transition: transform 1.2s var(--ease-out-expo); }
  .pk-footer-mark[data-reveal="mask"]:not([data-in="true"]) span { transform: translateY(104%); }
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/trip.css">
<![CDATA[/* The Trip: a sticky stage that slides five scenes sideways while one jar rides the route.
   Scroll writes --s (0..4, lingering on each stop) and --p (0..1) on .pk-stage; everything else is CSS. */

.pk-trip { position: relative; margin-top: -56px; border-radius: 56px 56px 0 0; background: var(--color-cream); padding: 120px 0 80px; }
.pk-trip-pin { width: min(1232px, 100%); margin-inline: auto; padding-inline: 16px; display: grid; gap: 20px; }
.pk-trip-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 14px 24px; }
.pk-trip-head .pk-h2 { font-size: clamp(1.7rem, 3.4vw, 2.7rem); margin-top: 10px; }

.pk-trip[data-mode="scrub"] { height: 520vh; padding: 0; }
.pk-trip[data-mode="scrub"] .pk-trip-pin { position: sticky; top: 0; height: 100svh; padding-top: 84px; padding-bottom: 16px; grid-template-rows: auto minmax(0, 1fr) auto; gap: 12px; overflow: hidden; }
.pk-trip[data-mode="flow"] .pk-rail-wrap { display: none; }

/* rail */
.pk-rail { display: flex; flex-wrap: wrap; gap: 6px; }
.pk-rail-btn { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 5px; border-radius: 999px; border: 2.5px solid var(--color-plum); background: var(--color-cream); font-weight: 800; font-size: 0.82rem; cursor: pointer; transition: transform var(--dur-base) var(--ease-spring), background-color var(--dur-fast) var(--ease-out); }
.pk-rail-btn:active { transform: scale(0.94); transition-duration: var(--dur-instant); }
.pk-rail-btn[data-active="true"] { background: var(--color-bubblegum); }
.pk-rail-n { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: var(--color-butter); border: 2px solid var(--color-plum); font-family: var(--font-mono); font-size: 12px; line-height: 1; }
@media (max-width: 719px) {
  .pk-rail-btn { padding-right: 5px; }
  .pk-rail-l { display: none; }
  .pk-rail-btn[data-active="true"] { padding-right: 14px; }
  .pk-rail-btn[data-active="true"] .pk-rail-l { display: inline; }
  .pk-trip-head .pk-eyebrow { display: none; }
}
@media (hover: hover) and (pointer: fine) {
  .pk-rail-btn:hover { background: var(--color-butter); transform: translateY(-2px); }
  .pk-rail-btn[data-active="true"]:hover { background: var(--color-bubblegum); }
}

/* stage */
.pk-stage { position: relative; width: 100%; max-width: 1200px; margin-inline: auto; min-height: 0; overflow: hidden; border-radius: 48px; border: 3px solid var(--color-plum); background: var(--color-sky); --s: 0; --p: 0; isolation: isolate; contain: paint; }
.pk-stage[data-mode="scrub"] { height: 100%; min-height: 240px; }
.pk-strip { display: flex; width: 500%; height: 100%; transform: translate3d(calc(var(--s, 0) * -20%), 0, 0); will-change: transform; }
.pk-scene { position: relative; flex: 0 0 20%; height: 100%; --d: calc(var(--s, 0) - var(--i, 0)); --f: max(0, min(calc(1 + var(--d)), calc(1 - var(--d)))); }
.pk-scene:nth-child(1) { --tone: var(--color-sky); }
.pk-scene:nth-child(2) { --tone: var(--color-butter); }
.pk-scene:nth-child(3) { --tone: var(--color-mint); }
.pk-scene:nth-child(4) { --tone: var(--color-lilac); }
.pk-scene:nth-child(5) { --tone: var(--color-blush); }
.pk-scene-frame { position: absolute; inset: 0; }
.pk-scene-art, .pk-tv-layer { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.pk-tv-layer { pointer-events: none; }
.pk-scene-copy { display: none; }
.pk-bg { fill: var(--tone); }
.pk-floor { fill: color-mix(in srgb, var(--color-cream) 55%, var(--tone)); }

/* scroll-linked depth: near props travel against the strip, far props lag behind it */
.pk-px1 { transform: translate3d(calc(var(--d) * -90px), 0, 0); }
.pk-px2 { transform: translate3d(calc(var(--d) * -36px), 0, 0); }
.pk-px3 { transform: translate3d(calc(var(--d) * 64px), 0, 0); }
.pk-notif { opacity: calc(var(--f) * 1.8); transform: translateY(calc((1 - var(--f)) * -70px)); }
.pk-ladle { transform-box: fill-box; transform-origin: 85% 15%; transform: rotate(calc((1 - var(--f)) * 26deg)); }
.pk-stream { transform-box: fill-box; transform-origin: 50% 0%; transform: scaleY(clamp(0, calc((var(--f) - 0.45) * 2.4), 1)); }
.pk-steam path { opacity: calc(var(--f) * 0.9); }
.pk-road { transform: translate3d(calc(var(--d) * -640px), 0, 0); }
.pk-wheel { transform: rotate(calc(var(--d) * -720deg)); }
.pk-confetti { opacity: clamp(0, calc((var(--f) - 0.5) * 3), 1); transform: translateY(calc((1 - var(--f)) * 40px)); }
.pk-banner { transform-box: fill-box; transform-origin: 50% 50%; opacity: clamp(0, calc((var(--f) - 0.55) * 3), 1); transform: scale(clamp(0.6, calc(0.6 + (var(--f) - 0.5) * 1.2), 1)); }
.pk-stage[data-mode="flow"] .pk-scene { --s: var(--i); }

/* the traveller: jar and box. Which pieces show is a plain CSS state machine on data-stop. */
.pk-tv-layer { --lvl: clamp(0, calc((var(--p, 0) - 0.17) / 0.16), 1); --jar-lvl: var(--lvl); } /* fills while the cooking scene is centred (p = .25 is stop 2) */
.pk-tv-shadow { opacity: 0.18; transition: opacity var(--dur-base) var(--ease-out); }
.pk-tv-layer[data-stop="3"] .pk-tv-shadow { opacity: 0; }
.pk-tv-lift { transition: transform var(--dur-slow) var(--ease-spring); }
.pk-tv-layer[data-stop="3"] .pk-tv-lift { transform: translateY(-48px); }
.pk-tv-squash { transform-box: fill-box; transform-origin: 50% 100%; }
.pk-tv-ghost { opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.pk-tv-layer[data-stop="0"] .pk-tv-ghost { opacity: 1; }
.pk-tv-jar { transition: opacity var(--dur-fast) var(--ease-out); }
.pk-tv-layer[data-stop="0"] .pk-tv-jar { opacity: 0; }
.pk-tv-layer[data-stop="3"] .pk-tv-jar { opacity: 0; transition-delay: 320ms; }
.pk-tv-jar .pk-jar-lid { transform: translateY(-84px); opacity: 0; transition: transform var(--dur-slow) var(--ease-spring), opacity var(--dur-fast) var(--ease-out); }
.pk-tv-layer[data-stop="2"] .pk-jar-lid, .pk-tv-layer[data-stop="3"] .pk-jar-lid, .pk-tv-layer[data-stop="4"] .pk-jar-lid { transform: none; opacity: 1; }
.pk-tv-jarlift { transition: transform var(--dur-slow) var(--ease-spring) 120ms; }
.pk-tv-layer[data-stop="4"] .pk-tv-jarlift { transform: translateY(-122px); }
.pk-tv-box { opacity: 0; transform: translateY(70px); transition: transform var(--dur-slow) var(--ease-spring), opacity var(--dur-base) var(--ease-out); }
.pk-tv-layer[data-stop="2"] .pk-tv-box, .pk-tv-layer[data-stop="3"] .pk-tv-box, .pk-tv-layer[data-stop="4"] .pk-tv-box { opacity: 1; transform: none; }
.pk-tv-lid { transform-box: fill-box; transform-origin: 50% 50%; transform: translate(268px, 114px) rotate(8deg); transition: transform var(--dur-slow) var(--ease-spring); }
.pk-tv-layer[data-stop="3"] .pk-tv-lid { transform: none; }
.pk-tv-layer[data-stop="4"] .pk-tv-lid { transform: translate(-268px, 114px) rotate(-8deg); }
.pk-tv-pop { opacity: 0; transition: opacity var(--dur-base) var(--ease-out); }
.pk-tv-layer[data-stop="4"] .pk-tv-pop { opacity: 1; transition-delay: 280ms; }
.pk-twinkle, .pk-float, .pk-drift, .pk-ring, .pk-wobble, .pk-sway, .pk-bubble, .pk-write { transform-box: fill-box; transform-origin: 50% 50%; }
.pk-stir { transform-box: view-box; }
.pk-sway { transform-origin: 50% 0%; }
.pk-ring { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .pk-tv-layer[data-stop="0"] .pk-tv-squash, .pk-tv-layer[data-stop="2"] .pk-tv-squash, .pk-tv-layer[data-stop="4"] .pk-tv-squash { animation: pk-settle-a 900ms var(--ease-out) both; }
  .pk-tv-layer[data-stop="1"] .pk-tv-squash, .pk-tv-layer[data-stop="3"] .pk-tv-squash { animation: pk-settle-b 900ms var(--ease-out) both; }
  @keyframes pk-settle-a { 0% { transform: scale(1.07, 0.9); } 38% { transform: scale(0.97, 1.05); } 70% { transform: scale(1.01, 0.99); } 100% { transform: none; } }
  @keyframes pk-settle-b { 0% { transform: scale(1.07, 0.9); } 38% { transform: scale(0.97, 1.05); } 70% { transform: scale(1.01, 0.99); } 100% { transform: none; } }

  /* ambient life: only the active scene loops, only while the trip is on screen */
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-twinkle, .pk-trip[data-live="true"] .pk-tv-layer[data-stop="4"] .pk-twinkle { animation: pk-twinkle 2.6s ease-in-out infinite; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-float { animation: pk-float 4.4s ease-in-out infinite alternate; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-drift { animation: pk-drift 9s ease-in-out infinite alternate; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-ring { animation: pk-ring 2.4s ease-out infinite; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-ring-2 { animation-delay: 1.2s; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-wobble { animation: pk-wobble 1.8s ease-in-out infinite; transform-origin: 50% 0%; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-sway { animation: pk-sway 5.5s ease-in-out infinite alternate; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-sway-slow { animation-duration: 7s; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-bubble { animation: pk-bubble 1.9s ease-in-out infinite; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-bubble-2 { animation-delay: 0.5s; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-bubble-3 { animation-delay: 1.1s; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-stir { animation: pk-stir 2.8s ease-in-out infinite alternate; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-steam path { animation: pk-steam 3.2s ease-in-out infinite; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-write { animation: pk-write 1.4s ease-in-out infinite alternate; }
  .pk-trip[data-mode="scrub"][data-live="true"] .pk-tv-bob { animation: pk-bob 4.4s ease-in-out infinite; }
  .pk-trip[data-live="true"] .pk-scene[data-active="true"] .pk-van { animation: pk-bob 3.6s ease-in-out infinite; }
  .pk-trip[data-live="true"] .pk-tracker-dot::after { animation: pk-ping 2.2s ease-out infinite; }

  @keyframes pk-twinkle { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.22) rotate(14deg); } }
  @keyframes pk-float { from { transform: translateY(0) rotate(-6deg); } to { transform: translateY(-14px) rotate(6deg); } }
  @keyframes pk-drift { from { transform: translateX(-18px); } to { transform: translateX(22px); } }
  @keyframes pk-ring { 0% { opacity: 0.8; transform: scale(0.8); } 100% { opacity: 0; transform: scale(2.1); } }
  @keyframes pk-wobble { 0%, 55%, 100% { transform: rotate(0); } 10% { transform: rotate(-14deg); } 22% { transform: rotate(12deg); } 34% { transform: rotate(-8deg); } 44% { transform: rotate(5deg); } }
  @keyframes pk-sway { from { transform: rotate(-2.4deg); } to { transform: rotate(2.4deg); } }
  @keyframes pk-bubble { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.18, 1.05); } }
  @keyframes pk-stir { from { transform: rotate(-13deg); } to { transform: rotate(13deg); } }
  @keyframes pk-steam { 0% { transform: translateY(10px); opacity: 0; } 40% { opacity: 0.9; } 100% { transform: translateY(-34px); opacity: 0; } }
  @keyframes pk-write { from { transform: translate(-6px, 4px); } to { transform: translate(8px, -3px); } }
  @keyframes pk-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
}

/* tracker + route */
.pk-tracker { position: absolute; z-index: 3; top: 14px; left: 14px; display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px 8px 12px; border-radius: 999px; background: var(--color-cream); border: 2.5px solid var(--color-plum); font-family: var(--font-mono); font-size: 12.5px; font-weight: 500; }
.pk-tracker-dot { position: relative; width: 12px; height: 12px; border-radius: 50%; background: var(--color-bubblegum); border: 2px solid var(--color-plum); }
.pk-tracker-dot::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid var(--color-bubblegum); opacity: 0; }
@media (prefers-reduced-motion: no-preference) { .pk-tracker-text { animation: pk-text-in 520ms var(--ease-out-expo) both; } }
.pk-route { position: absolute; z-index: 3; left: 28px; right: 28px; bottom: 16px; height: 14px; border-radius: 999px; background: var(--color-cream); border: 2.5px solid var(--color-plum); }
.pk-route-fill { position: absolute; inset: 0; border-radius: inherit; background: var(--color-bubblegum); transform-origin: left center; transform: scaleX(var(--p, 0)); }
.pk-route-dot { position: absolute; top: 50%; width: 20px; height: 20px; margin: -10px 0 0 -10px; border-radius: 50%; background: var(--color-cream); border: 2.5px solid var(--color-plum); transition: background-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring); }
.pk-route-dot[data-done="true"] { background: var(--color-butter); transform: scale(1.12); }
.pk-route-rider { position: absolute; left: 0; top: -30px; width: 100%; height: 0; transform: translateX(calc(var(--p, 0) * 100%)); pointer-events: none; }
.pk-route-rider svg { position: absolute; left: 0; top: 0; transform: translateX(-50%); }

/* caption */
.pk-caption { width: 100%; max-width: 1200px; margin-inline: auto; min-height: 7.4rem; display: grid; gap: 4px 36px; align-content: start; padding-inline: 8px; }
.pk-stepline { display: flex; gap: 14px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--pk-muted); }
.pk-caption-body { color: var(--pk-muted); max-width: 40em; }
@media (prefers-reduced-motion: no-preference) { .pk-caption > * { animation: pk-text-in 560ms var(--ease-out-expo) both; } .pk-caption-body { animation-delay: 80ms; } }
@media (min-width: 900px) {
  .pk-caption { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); grid-template-rows: auto auto; }
  .pk-caption .pk-stepline { grid-column: 1; grid-row: 1; }
  .pk-caption .pk-h3 { grid-column: 1; grid-row: 2; }
  .pk-caption-body { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-size: 1.05rem; }
}
@media (max-width: 899px) {
  .pk-caption { min-height: 11.5rem; }
  .pk-caption .pk-h3 { font-size: 1.3rem; }
  .pk-caption-body { font-size: 0.94rem; line-height: 1.5; }
  .pk-trip[data-mode="scrub"] .pk-trip-pin { padding-top: 76px; }
}
@media (max-height: 700px) and (min-width: 900px) {
  .pk-trip[data-mode="scrub"] .pk-trip-pin { padding-top: 76px; gap: 8px; }
  .pk-caption { min-height: 5.6rem; }
}

/* flow mode: reduced motion and no JavaScript. Five stacked cards, everything visible. */
.pk-stage[data-mode="flow"] { height: auto; overflow: visible; border: 0; border-radius: 0; background: none; contain: none; }
.pk-stage[data-mode="flow"] .pk-strip { display: grid; width: auto; height: auto; transform: none; gap: 24px; will-change: auto; }
.pk-stage[data-mode="flow"] .pk-scene { height: auto; border-radius: 40px; border: 3px solid var(--color-plum); background: var(--color-cream); overflow: hidden; }
.pk-stage[data-mode="flow"] .pk-scene-frame { position: relative; inset: auto; aspect-ratio: 12 / 7; }
.pk-stage[data-mode="flow"] .pk-scene-copy { display: grid; gap: 6px; padding: 18px 24px 26px; }
.pk-stage[data-mode="flow"] .pk-tv-layer { --lvl: 1; }
.pk-stage[data-mode="flow"] .pk-scene:first-child .pk-tv-layer { --lvl: 0; }
@media (min-width: 900px) {
  .pk-stage[data-mode="flow"] .pk-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pk-stage[data-mode="flow"] .pk-scene:last-child { grid-column: 1 / -1; }
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/box/logic.ts">
<![CDATA[import { FLAVORS, FREE_SHIPPING_AT, SHIPPING_FLAT } from "../data/shop";

export type BoxSize = 3 | 6 | 12;
export const BOX_SIZES: BoxSize[] = [3, 6, 12];

export type BoxNotice = null | "full" | "grew" | "shrank";

export type BoxState = {
  size: BoxSize;
  /** jars per flavour id */
  jars: Record<string, number>;
  notice: BoxNotice;
};

export type BoxAction =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "size"; size: BoxSize }
  | { type: "clear" };

export const initialBox: BoxState = { size: 6, jars: {}, notice: null };

export const jarCount = (jars: Record<string, number>) => Object.values(jars).reduce((a, b) => a + b, 0);

/** Flavour ids in the order jars sit in the box: one entry per jar, flavours in shelf order. */
export function slots(jars: Record<string, number>): string[] {
  return FLAVORS.flatMap((f) => Array.from({ length: jars[f.id] ?? 0 }, () => f.id));
}

/** Drops jars from the end of the shelf order until `jars` fits `size`. */
function trim(jars: Record<string, number>, size: number): Record<string, number> {
  const out = { ...jars };
  let over = jarCount(out) - size;
  for (const f of [...FLAVORS].reverse()) {
    if (over <= 0) break;
    const have = out[f.id] ?? 0;
    const cut = Math.min(have, over);
    if (cut) out[f.id] = have - cut;
    over -= cut;
  }
  return out;
}

export function boxReducer(state: BoxState, action: BoxAction): BoxState {
  switch (action.type) {
    case "add": {
      if (!FLAVORS.some((f) => f.id === action.id)) return state;
      let size = state.size;
      let notice: BoxNotice = null;
      if (jarCount(state.jars) >= size) {
        const next = BOX_SIZES.find((s) => s > size);
        if (!next) return { ...state, notice: "full" };
        size = next;
        notice = "grew";
      }
      return { size, jars: { ...state.jars, [action.id]: (state.jars[action.id] ?? 0) + 1 }, notice };
    }
    case "remove": {
      const have = state.jars[action.id] ?? 0;
      if (have <= 0) return state;
      return { ...state, jars: { ...state.jars, [action.id]: have - 1 }, notice: null };
    }
    case "size": {
      if (action.size === state.size) return state;
      const jars = trim(state.jars, action.size);
      const shrank = jarCount(jars) < jarCount(state.jars);
      return { size: action.size, jars, notice: shrank ? "shrank" : null };
    }
    case "clear":
      return { ...state, jars: {}, notice: null };
  }
}

export type Totals = { count: number; subtotal: number; discount: number; shipping: number; total: number; freeShipping: boolean };

/** $9 a jar, $1 off from 3 jars, $4 off from 6, $12 off at 12, shipping free from 6 jars. */
export function totals(jars: Record<string, number>): Totals {
  const count = jarCount(jars);
  const subtotal = FLAVORS.reduce((sum, f) => sum + (jars[f.id] ?? 0) * f.price, 0);
  const discount = count >= 12 ? 12 : count >= 6 ? 4 : count >= 3 ? 1 : 0;
  const freeShipping = count >= FREE_SHIPPING_AT;
  const shipping = count === 0 || freeShipping ? 0 : SHIPPING_FLAT;
  return { count, subtotal, discount, shipping, total: subtotal - discount + shipping, freeShipping };
}

export const money = (n: number) => `$${n.toFixed(0)}`;

/** Next order number shown on the success ticket. */
export const nextOrderNumber = (base = 412, placed = 0) => `#${String(base + 1 + placed).padStart(4, "0")}`;
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/box/OrderContext.tsx">
<![CDATA["use client";
import { createContext, useContext, useMemo, useReducer, useState, type Dispatch, type ReactNode } from "react";
import { boxReducer, initialBox, jarCount, type BoxAction, type BoxState } from "./logic";

type OrderValue = {
  box: BoxState;
  count: number;
  dispatch: Dispatch<BoxAction>;
  /** how many orders this visitor placed in this session; drives the ticket number */
  placed: number;
  placeOrder: () => void;
};

const OrderContext = createContext<OrderValue | null>(null);

/** Holds the box so the shelf, the header counter and the box builder all see the same jars. */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [box, dispatch] = useReducer(boxReducer, initialBox);
  const [placed, setPlaced] = useState(0);
  const value = useMemo<OrderValue>(
    () => ({ box, count: jarCount(box.jars), dispatch, placed, placeOrder: () => setPlaced((n) => n + 1) }),
    [box, placed],
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/brand/Jar.tsx">
<![CDATA[import { useId, type CSSProperties } from "react";
import type { FlavorTone } from "../data/shop";

const TONE_VAR: Record<FlavorTone, string> = {
  bubblegum: "var(--color-bubblegum)",
  butter: "var(--color-butter)",
  mint: "var(--color-mint)",
  sky: "var(--color-sky)",
  lilac: "var(--color-lilac)",
  blush: "var(--color-blush)",
};

export const toneVar = (tone: FlavorTone) => TONE_VAR[tone];

type ArtProps = {
  tone: FlavorTone;
  lid?: boolean;
  label?: string;
  /** Outline-only jar for the order that has not been cooked yet. */
  ghost?: boolean;
};

/**
 * The jar drawn in a 120x150 box, as an SVG group so it can sit inside another SVG.
 * The jam level comes from the CSS custom property --jar-lvl (0..1) on any ancestor.
 */
export function JarArt({ tone, lid = true, label, ghost = false }: ArtProps) {
  const uid = `pk${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-body`}>
          <rect x="16" y="36" width="88" height="106" rx="32" />
        </clipPath>
      </defs>
      {ghost ? null : <rect x="16" y="36" width="88" height="106" rx="32" fill="var(--color-cream)" />}
      {ghost ? null : (
        <g clipPath={`url(#${uid}-body)`}>
          <rect className="pk-jar-fill" x="10" y="36" width="100" height="112" fill={TONE_VAR[tone]} />
          <rect className="pk-jar-skin" x="16" y="36" width="88" height="10" rx="5" fill="var(--color-cream)" opacity=".55" />
        </g>
      )}
      <rect x="16" y="36" width="88" height="106" rx="32" fill="none" stroke="var(--color-plum)" strokeWidth="3.2" strokeDasharray={ghost ? "8 8" : undefined} strokeLinecap="round" />
      {ghost ? null : <rect x="27" y="52" width="9" height="36" rx="4.5" fill="var(--color-cream)" opacity=".75" />}
      {label && !ghost ? (
        <g>
          <rect x="32" y="84" width="56" height="34" rx="17" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <text x="60" y="105" textAnchor="middle" className="pk-jar-label">{label}</text>
        </g>
      ) : null}
      {lid && !ghost ? (
        <g className="pk-jar-lid">
          <rect x="24" y="12" width="72" height="30" rx="15" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <rect x="34" y="20" width="22" height="5" rx="2.5" fill="var(--color-cream)" opacity=".85" />
        </g>
      ) : null}
    </g>
  );
}

type JarProps = ArtProps & {
  /** 0..1 how full of jam. */
  level?: number;
  className?: string;
  title?: string;
};

/** A standalone jar illustration. */
export function Jar({ level = 1, className, title, ...art }: JarProps) {
  const style = { "--jar-lvl": level } as CSSProperties;
  return (
    <svg className={`pk-jar ${className ?? ""}`} viewBox="0 0 120 150" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" style={style}>
      <JarArt {...art} />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/brand/Logo.tsx">
<![CDATA[/** The Pipkin mark: a squat jar with a butter lid and a cream label, drawn with a plum line. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Pipkin jar mark" focusable="false">
      <rect x="8" y="17" width="32" height="26" rx="12" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.6" />
      <rect x="12" y="6" width="24" height="12" rx="6" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.6" />
      <rect x="15" y="25" width="18" height="10" rx="5" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2" />
      <circle cx="24" cy="30" r="1.9" fill="var(--color-plum)" />
      <rect x="12" y="21" width="5" height="3" rx="1.5" fill="var(--color-cream)" opacity=".8" />
    </svg>
  );
}

/** Mark plus the wordmark, set in the display face. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span className={`pk-logo ${className ?? ""}`}>
      <LogoMark size={size} />
      <span className="pk-logo-word">Pipkin</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/brand/Marks.tsx">
<![CDATA[type MarkProps = { className?: string; color?: string };

/** Four-point sparkle. */
export function Sparkle({ className, color = "var(--color-butter)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Heart({ className, color = "var(--color-bubblegum)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 36" aria-hidden="true" focusable="false">
      <path d="M20 33 C6 24 3 16 3 11 C3 6 7 3 11 3 C15 3 18 5 20 9 C22 5 25 3 29 3 C33 3 37 6 37 11 C37 16 34 24 20 33 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Leaf({ className, color = "var(--color-mint)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 44 36" aria-hidden="true" focusable="false">
      <path d="M4 30 C4 12 16 4 40 4 C40 24 28 32 4 30 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M8 27 C18 20 26 14 34 9" fill="none" stroke="var(--color-plum)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Berry({ className, color = "var(--color-bubblegum)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 44" aria-hidden="true" focusable="false">
      <path d="M20 40 C8 36 4 24 6 16 C8 10 14 9 20 12 C26 9 32 10 34 16 C36 24 32 36 20 40 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 12 C18 6 14 4 10 5 C13 8 16 9 20 12 Z M20 12 C22 6 26 4 30 5 C27 8 24 9 20 12 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="15" cy="22" r="1.6" fill="var(--color-plum)" />
      <circle cx="24" cy="26" r="1.6" fill="var(--color-plum)" />
      <circle cx="19" cy="31" r="1.6" fill="var(--color-plum)" />
    </svg>
  );
}

/** A flat, rounded cloud used in the courier scene. */
export function Cloud({ className, color = "var(--color-cream)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 120 56" aria-hidden="true" focusable="false">
      <path d="M22 50 C8 50 4 36 14 31 C12 18 28 12 36 22 C40 8 66 6 72 22 C84 14 102 22 98 36 C112 36 114 50 100 50 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="pk-check-path" d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/data/shop.ts">
<![CDATA[export type FlavorTag = "fruity" | "floral" | "tangy";
export type FlavorTone = "bubblegum" | "butter" | "mint" | "sky" | "lilac" | "blush";

export type Flavor = {
  id: string;
  name: string;
  line: string;
  tags: FlavorTag[];
  tone: FlavorTone;
  price: number;
  /** The one-line note the cook pencils on the lid. */
  lid: string;
};

export const FLAVORS: Flavor[] = [
  { id: "strawberry-basil", name: "Strawberry & Basil", line: "Tuesday's strawberries and a fistful of basil from the windowsill.", tags: ["fruity"], tone: "bubblegum", price: 9, lid: "No. 01" },
  { id: "meyer-lemon", name: "Meyer Lemon Marmalade", line: "Thin-cut peel, slow-cooked until it glows. Bright, a little bossy.", tags: ["tangy"], tone: "butter", price: 9, lid: "No. 02" },
  { id: "pear-vanilla", name: "Pear & Vanilla Bean", line: "Soft pears, real vanilla seeds, a whisper of lemon. Toast's best friend.", tags: ["fruity"], tone: "mint", price: 9, lid: "No. 03" },
  { id: "blueberry-thyme", name: "Blueberry & Thyme", line: "Wild blueberries with a thyme sprig. Tangy, deep, very good on yoghurt.", tags: ["fruity", "tangy"], tone: "sky", price: 9, lid: "No. 04" },
  { id: "plum-lavender", name: "Plum & Lavender", line: "Dark plums, culinary lavender, a pinch of sea salt. Our most-written-about jar.", tags: ["floral"], tone: "lilac", price: 9, lid: "No. 05" },
  { id: "peach-chamomile", name: "Peach & Chamomile", line: "Ripe peaches steeped with chamomile flowers. Tastes like a nap in a hammock.", tags: ["floral", "fruity"], tone: "blush", price: 9, lid: "No. 06" },
];

export const FILTERS: { id: "all" | FlavorTag; label: string }[] = [
  { id: "all", label: "All six" },
  { id: "fruity", label: "Fruity" },
  { id: "floral", label: "Floral" },
  { id: "tangy", label: "Tangy" },
];

export function filterFlavors(filter: "all" | FlavorTag): Flavor[] {
  return filter === "all" ? FLAVORS : FLAVORS.filter((f) => f.tags.includes(filter));
}

export type Stop = { id: string; label: string; title: string; when: string; body: string };

export const STOPS: Stop[] = [
  { id: "ordered", label: "Order placed", title: "Ding. Your order is on the kitchen phone.", when: "Mon 9:41", body: "Orders close Monday at 6. Yours is the 412th this season, and it gets a ticket with your name spelled right." },
  { id: "cooked", label: "Cooking", title: "Tuesday, the big pot goes on.", when: "Tue 7:30", body: "Thirty-six jars per batch, one slow stir, no pectin shortcuts. Your jar is filled while it is still too hot to touch." },
  { id: "packed", label: "Packed", title: "Lidded, labelled, tucked in tissue.", when: "Wed 2:10", body: "Every lid is pencilled by hand. Jars ride in a recycled-paper box with room to wiggle and a note from whoever packed it." },
  { id: "road", label: "Out for delivery", title: "The courier picks up at four.", when: "Thu 4:00", body: "One pickup a week keeps the kitchen calm and the shipping honest. You get a tracking link the minute the van doors close." },
  { id: "door", label: "Delivered", title: "Knock, knock. Lid off.", when: "Fri 11:20", body: "Your box lands on the doorstep, the lid lifts and the first spoonful is yours. Seventy-two hours, stove to door." },
];

export const STATS = [
  { value: 36, suffix: "", label: "jars in every batch" },
  { value: 2, suffix: "", label: "cooks, one kitchen" },
  { value: 72, suffix: " h", label: "from stove to doorstep" },
  { value: 1208, suffix: "", label: "doorstep notes so far" },
];

export const WEEK = [
  { day: "Mon", job: "Orders close at 6", tone: "sky" },
  { day: "Tue", job: "Cook day", tone: "bubblegum" },
  { day: "Wed", job: "Label and pack", tone: "butter" },
  { day: "Thu", job: "Courier pickup", tone: "lilac" },
  { day: "Fri", job: "On your doorstep", tone: "mint" },
] as const;

export type Note = { id: string; who: string; where: string; text: string; tone: FlavorTone };

export const NOTES: Note[] = [
  { id: "n1", who: "Ines R.", where: "Lisbon, PT", text: "Opened the box and the whole hallway smelled like July. The plum jar was gone by Sunday.", tone: "lilac" },
  { id: "n2", who: "Dev P.", where: "Leeds, UK", text: "The little pencilled lid note made me tear up a bit. Ordering a six-box for my mum.", tone: "blush" },
  { id: "n3", who: "Maya O.", where: "Austin, TX", text: "Tracking said Friday, doorstep said 11:20. Not a minute off. Strawberry basil on eggs is unreal.", tone: "bubblegum" },
  { id: "n4", who: "Tomás A.", where: "Valencia, ES", text: "My kid asked who Pipkin was and I said two people with a very big pot.", tone: "butter" },
  { id: "n5", who: "Hana K.", where: "Osaka, JP", text: "Travelled in perfect shape. The tissue paper is now a gift bag decoration.", tone: "mint" },
  { id: "n6", who: "Grace L.", where: "Toronto, CA", text: "Blueberry thyme on a cheese board. People asked for the recipe. I sent them your link.", tone: "sky" },
  { id: "n7", who: "Omar S.", where: "Berlin, DE", text: "Subscribed for the Friday list just to see which flavour is next. Never miss it now.", tone: "lilac" },
  { id: "n8", who: "Priya N.", where: "Melbourne, AU", text: "Peach chamomile is my new personality. Thank you for the extra spoon sticker.", tone: "blush" },
];

export const FAQS = [
  { q: "When does my order actually ship?", a: "Orders close Monday at 6 pm. We cook Tuesday, pack Wednesday and the courier collects on Thursday afternoon. Most boxes arrive Friday; far-away ones, Monday." },
  { q: "How long does a jar keep?", a: "Unopened, a year in a cool cupboard. Once opened, three weeks in the fridge, which has never once been a challenge." },
  { q: "Do you ship outside the country?", a: "We ship to 31 countries. The checkout shows your doorstep date before you pay, so there are no surprises." },
  { q: "What if a jar arrives broken?", a: "Send us a photo and we remake and ship it at no cost on the next Thursday. We have packed 4,300 jars and lost nine." },
  { q: "Is there anything in it besides fruit and sugar?", a: "Fruit, cane sugar, lemon juice and the herbs on the label. No pectin, no preservatives and no mystery syrup." },
];

export const SHIPPING_FLAT = 6;
export const FREE_SHIPPING_AT = 6;
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/forms/ListForm.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { FLAVORS } from "../data/shop";
import { toneVar } from "../brand/Jar";
import { Arrow, Check } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { isValid, validateList, type ListErrors, type ListValues } from "./validation";

/** The Friday list. Floating labels, shake-on-invalid, a loading button, and a success ticket that replaces the form. No network. */
export function ListForm() {
  const [values, setValues] = useState<ListValues>({ name: "", email: "", leaning: "" });
  const [errors, setErrors] = useState<ListErrors>({});
  const [shake, setShake] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const set = (k: keyof ListValues, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    const next = validateList(values);
    setErrors(next);
    if (!isValid(next)) {
      setShake((n) => n + 1);
      const first = (["name", "email", "leaning"] as const).find((k) => next[k]);
      document.getElementById(`pk-list-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("done"), 1000);
  };

  const pick = FLAVORS.find((f) => f.id === values.leaning);

  return (
    <section id="list" className="pk-sec pk-sec--mint" aria-labelledby="list-title">
      <div className="pk-wrap pk-list" data-status={status}>
        <div className="pk-list-copy">
          <p className="pk-eyebrow">The Friday list</p>
          <h2 id="list-title" className="pk-h2">One email, <span className="pk-hl">every Friday.</span></h2>
          <p className="pk-lede">The next flavour, the next cook day and one tiny recipe. No discount popups, no daily nudges, unsubscribe in one tap.</p>
        </div>

        <div className="pk-list-card">
          <form className="pk-form" noValidate onSubmit={submit} data-shake={shake % 2} aria-hidden={status === "done"} inert={status === "done"}>
            <div className="pk-field" data-error={errors.name ? "true" : "false"}>
              <input id="pk-list-name" name="name" type="text" autoComplete="given-name" placeholder=" " value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "pk-list-name-err" : undefined} />
              <label htmlFor="pk-list-name">First name</label>
              <p className="pk-err" id="pk-list-name-err" role={errors.name ? "alert" : undefined}>{errors.name}</p>
            </div>
            <div className="pk-field" data-error={errors.email ? "true" : "false"}>
              <input id="pk-list-email" name="email" type="email" autoComplete="email" placeholder=" " value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "pk-list-email-err" : undefined} />
              <label htmlFor="pk-list-email">Email</label>
              <p className="pk-err" id="pk-list-email-err" role={errors.email ? "alert" : undefined}>{errors.email}</p>
            </div>
            <fieldset className="pk-lean" data-error={errors.leaning ? "true" : "false"}>
              <legend className="pk-label">Which jar do you lean towards?</legend>
              <div className="pk-lean-grid">
                {FLAVORS.map((f, i) => (
                  <label key={f.id} className="pk-lean-opt" style={{ "--tone": toneVar(f.tone) } as CSSProperties}>
                    <input id={i === 0 ? "pk-list-leaning" : undefined} type="radio" name="leaning" value={f.id} checked={values.leaning === f.id} onChange={() => set("leaning", f.id)} />
                    <span>{f.name.split(" ")[0]}</span>
                  </label>
                ))}
              </div>
              <p className="pk-err" role={errors.leaning ? "alert" : undefined}>{errors.leaning}</p>
            </fieldset>
            <Magnetic className="pk-block">
              <button type="submit" className="pk-btn pk-btn-primary pk-btn-wide" data-loading={status === "loading" ? "true" : "false"} disabled={status === "loading"}>
                <span className="pk-btn-label">{status === "loading" ? "Adding you" : "Join the list"}</span>
                {status === "loading" ? <span className="pk-spinner" aria-hidden="true" /> : <Arrow className="pk-btn-arrow" />}
              </button>
            </Magnetic>
          </form>

          <div className="pk-done" role="status" aria-hidden={status !== "done"}>
            {status === "done" ? (
              <div className="pk-done-inner">
                <span className="pk-ticket-check"><Check /></span>
                <p className="pk-eyebrow">You&rsquo;re on the list</p>
                <h3 className="pk-h3">Thanks, {values.name.trim()}.</h3>
                <p>Friday&rsquo;s email will lead with {pick ? pick.name : "something fruity"}. Check {values.email.trim()} for a welcome note, and look for the jar on the shelf.</p>
                <a href="#shelf" className="pk-btn pk-btn-ghost pk-btn-sm"><span className="pk-btn-label">Back to the shelf</span></a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/forms/validation.ts">
<![CDATA[export type ListValues = { name: string; email: string; leaning: string };
export type ListErrors = Partial<Record<keyof ListValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateList(values: ListValues): ListErrors {
  const errors: ListErrors = {};
  if (values.name.trim().length < 2) errors.name = "Tell us what to call you (2+ letters).";
  if (!EMAIL.test(values.email.trim())) errors.email = "That email looks a little off. Try name@place.com.";
  if (!values.leaning) errors.leaning = "Pick the jar you lean towards.";
  return errors;
}

export const isValid = (errors: ListErrors) => Object.keys(errors).length === 0;
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/CountUp.tsx">
<![CDATA["use client";
import { useEffect, useState } from "react";
import { easeOutExpo } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

/** Counts up once in view. The final value is always in the DOM (visually hidden) and is the server-rendered text. */
export function CountUp({ to, suffix = "", decimals = 0, duration = 1400 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced = useReducedMotion();
  const fmt = (v: number) => `${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  const final = fmt(to);
  const [shown, setShown] = useState(final);
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / duration;
      setShown(fmt(to * easeOutExpo(Math.min(t, 1))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, to, suffix, decimals, duration]);
  return (
    <span ref={ref} className="pk-count">
      <span className="pk-sr">{final}</span>
      <span aria-hidden="true" className="pk-tnum">{shown}</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/Magnetic.tsx">
<![CDATA["use client";
import { useEffect, useRef, type ReactNode } from "react";
import { lerp } from "./math";
import { finePointer } from "./useReducedMotion";

/** Pulls its child a few pixels toward the pointer. Fine pointers only; written to CSS variables from one rAF loop. */
export function Magnetic({ children, strength = 14, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, active = false;
    const loop = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      el.style.setProperty("--tx", `${x.toFixed(2)}px`);
      el.style.setProperty("--ty", `${y.toFixed(2)}px`);
      if (active || Math.abs(x - tx) > 0.05 || Math.abs(y - ty) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) * 0.9;
      active = Math.hypot(dx, dy) < reach;
      tx = active ? (dx / reach) * strength : 0;
      ty = active ? (dy / reach) * strength : 0;
      kick();
    };
    const leave = () => { active = false; tx = 0; ty = 0; kick(); };
    window.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return <span ref={ref} className={`pk-magnet ${className ?? ""}`}>{children}</span>;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/Marquee.tsx">
<![CDATA["use client";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

/** A looping band. The duplicate track is aria-hidden; it pauses on hover and focus, and while off-screen. */
export function Marquee({ children, reverse = false, speed = 38, className, label }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string; label?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  return (
    <div ref={ref} className={`pk-marquee ${className ?? ""}`} data-live={inView ? "true" : "false"} data-reverse={reverse ? "true" : "false"} style={{ "--speed": `${speed}s` } as CSSProperties} role="group" aria-label={label}>
      <div className="pk-marquee-track">{children}</div>
      <div className="pk-marquee-track" aria-hidden="true">{children}</div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/math.ts">
<![CDATA[export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0 at `from`, 1 at `to`, clamped. Works in either direction. */
export const progress = (v: number, from: number, to: number) => (from === to ? 0 : clamp((v - from) / (to - from)));

export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** Index of a child inside a staggered group, capped so long lists never wait more than `cap` steps. */
export const staggerIndex = (i: number, cap = 8) => Math.min(Math.max(0, Math.floor(i)), cap);

/** Delay in ms for child `i` of a stagger, never exceeding `maxTotal`. */
export const staggerDelay = (i: number, step = 70, maxTotal = 600) => Math.min(staggerIndex(i, 99) * step, maxTotal);

/** Eased tween value for count-ups: easeOutExpo-like. */
export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * clamp(t)));

/** Tilt in degrees for a pointer at (px, py) in 0..1 across a card, centred on 0.5, limited to ±max. */
export const tiltAngles = (px: number, py: number, max = 6) => ({
  rx: lerp(max, -max, clamp(py)),
  ry: lerp(-max, max, clamp(px)),
});

/**
 * How far the viewport has travelled through a tall pinned section: 0 when its top reaches the top of the
 * viewport, 1 when its bottom reaches the bottom. `top` and `height` are the section's page offset and size.
 */
export const sectionProgress = (scrollY: number, top: number, height: number, viewportH: number) =>
  progress(scrollY, top, top + Math.max(0, height - viewportH));

/**
 * Maps linear scroll progress to a stop-space value 0..(stops-1) that lingers on every stop: each segment
 * between stops is eased, so the page seems to arrive, settle and then leave.
 */
export const dwell = (p: number, stops: number) => {
  if (stops < 2) return 0;
  const raw = clamp(p) * (stops - 1);
  const base = Math.min(Math.floor(raw), stops - 2);
  return base + smoothstep(smoothstep(raw - base));
};

/** The stop nearest to a stop-space value. */
export const nearestStop = (s: number, stops: number) => clamp(Math.round(s), 0, Math.max(0, stops - 1));
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/PauseOffscreen.tsx">
<![CDATA["use client";
import { useEffect, useRef } from "react";

/**
 * Marks its parent with data-off="true" while the parent is out of view, so CSS can pause
 * ambient loops (see `.pk-hero[data-off="true"] *`). Renders nothing visible.
 */
export function PauseOffscreen() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const io = new IntersectionObserver(([e]) => { parent.dataset.off = e.isIntersecting ? "false" : "true"; }, { threshold: 0 });
    io.observe(parent);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/Reveal.tsx">
<![CDATA["use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide-left" | "slide-right" | "pop";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: ReactNode;
};

/** Toggles `data-in` once the element scrolls into view; the CSS in pipkin.css does the visuals. */
export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true });
  return (
    <Tag ref={ref} className={className} data-reveal={variant} data-in={inView ? "true" : "false"} style={{ "--delay": `${delay}ms`, "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/ScrollProgress.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { clamp } from "./math";

/**
 * One rAF-throttled scroll listener for the whole page. Writes --page-p on <html> and two data attributes
 * the header reads (scrolled past 80px, scroll direction). Renders the hairline progress bar.
 */
export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let last = window.scrollY;
    let dir = "up";
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty("--page-p", clamp(y / max).toFixed(4));
      root.dataset.pkScrolled = y > 80 ? "true" : "false";
      if (Math.abs(y - last) > 6) {
        dir = y > last ? "down" : "up";
        last = y;
      }
      root.dataset.pkDir = y < 160 ? "up" : dir;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="pk-progress" aria-hidden="true"><i /></div>;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";

const HEADER_OFFSET = 84;

/**
 * Lenis smooth scroll for fine pointers without reduced motion; native momentum everywhere else.
 * Also owns in-page anchor clicks so every "#section" link eases to its target under the sticky header.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let dead = false;

    if (!reduced && fine) {
      import("lenis").then(({ default: Lenis }) => {
        if (dead) return;
        lenis = new Lenis({ lerp: 0.1, anchors: false });
        const loop = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.3, easing: (t: number) => 1 - (1 - t) ** 4 });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    // components ask for a scroll position with this event (e.g. the trip rail jumping to a stop)
    const onScrollTo = (e: Event) => {
      const top = (e as CustomEvent<{ top: number }>).detail?.top;
      if (typeof top !== "number") return;
      if (lenis) lenis.scrollTo(top, { duration: 1.4, easing: (t: number) => 1 - (1 - t) ** 4 });
      else window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    window.addEventListener("pk:scrollto", onScrollTo);
    return () => {
      dead = true;
      document.removeEventListener("click", onClick);
      window.removeEventListener("pk:scrollto", onScrollTo);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/SplitText.tsx">
<![CDATA[import { Fragment, type CSSProperties, type ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Extra stagger offset in word steps (the hero headline starts later than a section title). */
  start?: number;
};

type Group = { hl: boolean; words: string[] };

function groups(text: string): Group[] {
  return text
    .split(/(\[\[.*?\]\])/g)
    .filter((p) => p.trim().length > 0)
    .map((p) => {
      const hl = p.startsWith("[[");
      return { hl, words: p.replace(/\[\[|\]\]/g, "").split(" ").filter(Boolean) };
    });
}

/**
 * Splits a heading into word masks. Words wrapped in [[double brackets]] get the pill highlight.
 * Each word stays real text (no aria-label tricks), so screen readers read the heading normally.
 */
export function SplitText({ text, as: Tag = "span", className, id, start = 0 }: SplitTextProps) {
  let n = start;
  const word = (w: string, key: string) => (
    <span className="pk-w" key={key}>
      <span className="pk-wi" style={{ "--i": n++ } as CSSProperties}>{w}</span>
    </span>
  );
  const spaced = (words: string[], gi: number) =>
    words.map((w, wi) => (
      <Fragment key={`${gi}-${wi}`}>
        {wi > 0 ? " " : null}
        {word(w, `${gi}-${wi}-w`)}
      </Fragment>
    ));
  return (
    <Tag id={id} className={className}>
      {groups(text).map((g, gi) => (
        <Fragment key={gi}>
          {gi > 0 ? " " : null}
          {g.hl ? <span className="pk-hl">{spaced(g.words, gi)}</span> : spaced(g.words, gi)}
        </Fragment>
      ))}
    </Tag>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/TiltCard.tsx">
<![CDATA["use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { tiltAngles } from "./math";
import { finePointer } from "./useReducedMotion";

/** Tilt plus a spotlight that follows the pointer. Values go to CSS variables from rAF; touch and reduced motion get nothing. */
export function TiltCard({ children, className, max = 6, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ev: PointerEvent | null = null;
    const paint = () => {
      raf = 0;
      if (!ev) return;
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const { rx, ry } = tiltAngles(px, py, max);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => { ev = e; if (!raf) raf = requestAnimationFrame(paint); };
    const leave = () => {
      ev = null;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return <div ref={ref} className={className} style={style} data-tilt>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/useInView.ts">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";

type Entry = { once: boolean; set: (v: boolean) => void };
const listeners = new Map<Element, Entry>();
let observer: IntersectionObserver | null = null;

function shared() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const l = listeners.get(e.target);
        if (!l) continue;
        l.set(e.isIntersecting);
        if (e.isIntersecting && l.once) {
          observer?.unobserve(e.target);
          listeners.delete(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
  );
  return observer;
}

/** One shared IntersectionObserver for the whole template. `once` reveals stay revealed; otherwise `inView` follows the element. */
export function useInView<T extends Element = HTMLElement>({ once = true }: { once?: boolean } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = shared();
    listeners.set(el, { once, set: setInView });
    io.observe(el);
    return () => {
      io.unobserve(el);
      listeners.delete(el);
    };
  }, [once]);
  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/motion/useReducedMotion.ts">
<![CDATA["use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor asked for less motion. The server snapshot is `true` so heavy engines never mount before the client has checked. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true);
}

/** Fine pointer with hover: the only place magnetic, tilt and spotlight effects run. */
export function finePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/BatchDay.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { STATS, WEEK } from "../data/shop";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { toneVar } from "../brand/Jar";
import { SectionHead } from "./SectionHead";

/** Batch day: four count-up facts and the week as five pills joined by a drawn line. */
export function BatchDay() {
  return (
    <section id="batch" className="pk-sec pk-sec--butter" aria-labelledby="batch-title">
      <div className="pk-wrap">
        <SectionHead id="batch-title" eyebrow="Batch day" title="Small enough to [[know your name.]]" lede="No warehouse, no night shift. Just a Tuesday, a very big pot and a calendar we keep honest." />

        <ul className="pk-stats">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} variant="pop" index={i} className="pk-stat">
              <span className="pk-stat-n"><CountUp to={s.value} suffix={s.suffix} /></span>
              <span className="pk-stat-l">{s.label}</span>
            </Reveal>
          ))}
        </ul>

        <div className="pk-week">
          <Reveal variant="draw" className="pk-week-line"><span aria-hidden="true" /></Reveal>
          <ol className="pk-week-list">
            {WEEK.map((w, i) => (
              <Reveal as="li" key={w.day} variant="pop" index={i} delay={200} className="pk-day" >
                <span className="pk-day-pill" style={{ "--tone": toneVar(w.tone) } as CSSProperties} data-key={w.day === "Tue" ? "true" : "false"}>{w.day}</span>
                <span className="pk-day-job">{w.job}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/BoxBuilder.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FLAVORS } from "../data/shop";
import { Jar, toneVar } from "../brand/Jar";
import { Check, Arrow } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { useOrder } from "../box/OrderContext";
import { BOX_SIZES, jarCount, money, nextOrderNumber, slots, totals } from "../box/logic";
import { SectionHead } from "./SectionHead";

type Ticket = { number: string; lines: { name: string; n: number }[]; total: number; free: boolean };

const NOTICE: Record<string, string> = {
  grew: "That jar didn't fit, so the box grew to the next size.",
  full: "Twelve is the biggest box we pack. Swap a jar instead.",
  shrank: "Trimmed from the end of the shelf to fit the smaller box.",
};

/** Build a box: pick a size, add jars, watch them pack in, see the total, place the order. No network; success is a ticket. */
export function BoxBuilder() {
  const { box, dispatch, placed, placeOrder } = useOrder();
  const [status, setStatus] = useState<"idle" | "loading" | "placed">("idle");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const t = totals(box.jars);
  const filled = slots(box.jars);
  const cols = box.size === 12 ? 4 : 3;
  const sizeIndex = BOX_SIZES.indexOf(box.size);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const place = () => {
    if (t.count === 0 || status !== "idle") return;
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setTicket({
        number: nextOrderNumber(412, placed),
        lines: FLAVORS.filter((f) => (box.jars[f.id] ?? 0) > 0).map((f) => ({ name: f.name, n: box.jars[f.id] })),
        total: t.total,
        free: t.freeShipping,
      });
      placeOrder();
      setStatus("placed");
    }, 900);
  };
  const reset = () => {
    setStatus("idle");
    setTicket(null);
    dispatch({ type: "clear" });
  };

  return (
    <section id="box" className="pk-sec pk-sec--sky" aria-labelledby="box-title">
      <div className="pk-wrap">
        <SectionHead id="box-title" eyebrow="Build a box" title="Pack your own, [[we'll cook it.]]" lede="Pick a size, tuck in your jars and we'll price it as you go. Six jars or more ships free." />

        <div className="pk-bb" data-status={status}>
          <Reveal variant="scale" className="pk-bb-box-wrap">
            <div className="pk-box" data-size={box.size} aria-label={`Your box: ${jarCount(box.jars)} of ${box.size} jars`} role="group">
              <div className="pk-box-lid" aria-hidden="true"><span>PIPKIN · small batch</span></div>
              <ul className="pk-slots" style={{ "--cols": cols } as CSSProperties}>
                {Array.from({ length: box.size }, (_, i) => {
                  const id = filled[i];
                  const f = id ? FLAVORS.find((x) => x.id === id) : null;
                  return (
                    <li key={`${i}-${id ?? "empty"}`} className="pk-slot" data-filled={f ? "true" : "false"}>
                      {f ? <Jar tone={f.tone} label={f.lid.replace("No. ", "")} className="pk-slot-jar" /> : <span className="pk-slot-empty" aria-hidden="true">+</span>}
                    </li>
                  );
                })}
              </ul>
              <p className="pk-box-count" aria-live="polite">
                <b>{jarCount(box.jars)}</b> / {box.size} jars{box.notice ? <span className="pk-box-notice" key={box.notice + t.count}> · {NOTICE[box.notice]}</span> : null}
              </p>
            </div>
          </Reveal>

          <div className="pk-bb-panel">
            <div className="pk-panel-inner">
              <fieldset className="pk-seg" style={{ "--k": sizeIndex } as CSSProperties}>
                <legend className="pk-sr">Box size</legend>
                <span className="pk-seg-thumb" aria-hidden="true" />
                {BOX_SIZES.map((s) => (
                  <label key={s} className="pk-seg-opt">
                    <input type="radio" name="pk-size" value={s} checked={box.size === s} onChange={() => dispatch({ type: "size", size: s })} />
                    <span>{s} jars</span>
                  </label>
                ))}
              </fieldset>

              <ul className="pk-rows">
                {FLAVORS.map((f) => {
                  const n = box.jars[f.id] ?? 0;
                  return (
                    <li key={f.id} className="pk-row" data-has={n > 0 ? "true" : "false"} style={{ "--tone": toneVar(f.tone) } as CSSProperties}>
                      <span className="pk-row-dot" aria-hidden="true" />
                      <span className="pk-row-name">{f.name}</span>
                      <span className="pk-stepper" role="group" aria-label={`${f.name} quantity`}>
                        <button type="button" className="pk-step" disabled={n === 0} onClick={() => dispatch({ type: "remove", id: f.id })} aria-label={`Remove one ${f.name}`}>−</button>
                        <output key={n} className="pk-step-n" aria-live="polite">{n}</output>
                        <button type="button" className="pk-step" disabled={t.count >= 12} onClick={() => dispatch({ type: "add", id: f.id })} aria-label={`Add one ${f.name}`}>+</button>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <dl className="pk-sum">
                <div><dt>{t.count} {t.count === 1 ? "jar" : "jars"}</dt><dd>{money(t.subtotal)}</dd></div>
                <div data-dim={t.discount ? "false" : "true"}><dt>Box discount</dt><dd>−{money(t.discount)}</dd></div>
                <div><dt>Shipping</dt><dd>{t.count === 0 ? "—" : t.freeShipping ? "Free" : money(t.shipping)}</dd></div>
                <div className="pk-sum-total"><dt>Total</dt><dd key={t.total} className="pk-tnum">{money(t.total)}</dd></div>
              </dl>

              <Magnetic className="pk-block">
                <button type="button" className="pk-btn pk-btn-primary pk-btn-wide" data-loading={status === "loading" ? "true" : "false"} disabled={t.count === 0 || status === "loading"} onClick={place}>
                  <span className="pk-btn-label">{status === "loading" ? "Placing your order" : t.count === 0 ? "Add a jar to start" : `Place order · ${money(t.total)}`}</span>
                  {status === "loading" ? <span className="pk-spinner" aria-hidden="true" /> : <Arrow className="pk-btn-arrow" />}
                </button>
              </Magnetic>
            </div>

            <div className="pk-ticket" aria-hidden={status !== "placed"} inert={status !== "placed"} role="status">
              {ticket ? (
                <div className="pk-ticket-inner">
                  <span className="pk-ticket-check"><Check /></span>
                  <p className="pk-eyebrow">Order {ticket.number} placed</p>
                  <h3 className="pk-h3">It&rsquo;s in the kitchen queue.</h3>
                  <ul className="pk-ticket-lines">
                    {ticket.lines.map((l) => <li key={l.name}><span>{l.name}</span><b>×{l.n}</b></li>)}
                  </ul>
                  <p className="pk-ticket-total">Paid {money(ticket.total)}{ticket.free ? " · shipping on us" : ""}. Cook day is Tuesday, doorstep day is Friday.</p>
                  <div className="pk-ticket-actions">
                    <a href="#trip" className="pk-btn pk-btn-primary pk-btn-sm"><span className="pk-btn-label">Follow it</span><Arrow className="pk-btn-arrow" /></a>
                    <button type="button" className="pk-btn pk-btn-ghost pk-btn-sm" onClick={reset}><span className="pk-btn-label">Start another</span></button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Faq.tsx">
<![CDATA["use client";
import { useId, useState } from "react";
import { FAQS } from "../data/shop";
import { Reveal } from "../motion/Reveal";
import { SectionHead } from "./SectionHead";

/** Shipping Q&A. Panels open through grid-template-rows (no height animation), one at a time. */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  const uid = useId();
  return (
    <section id="faq" className="pk-sec pk-sec--cream" aria-labelledby="faq-title">
      <div className="pk-wrap pk-wrap--narrow">
        <SectionHead id="faq-title" eyebrow="Questions" title="Things people [[ask us.]]" />
        <ul className="pk-faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} variant="rise" index={i} className="pk-faq-item">
                <h3 className="pk-faq-h">
                  <button type="button" className="pk-faq-q" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} id={`${uid}-q${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="pk-faq-plus" aria-hidden="true"><i /><i /></span>
                  </button>
                </h3>
                <div id={`${uid}-${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="pk-faq-a" data-open={isOpen ? "true" : "false"} inert={!isOpen}>
                  <div><p>{f.a}</p></div>
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
    <file path="src/app/(pipkin)/pipkin/sections/FlavorBand.tsx">
<![CDATA[import { FLAVORS } from "../data/shop";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { toneVar } from "../brand/Jar";
import { Sparkle } from "../brand/Marks";

/** A drifting band of flavour pills between the hero and the trip. Pauses on hover and focus. */
export function FlavorBand() {
  return (
    <div className="pk-band" aria-label="This season's flavours">
      <Reveal variant="slide-right"><Marquee label="Flavours on the shelf" speed={46}>
        {FLAVORS.map((f) => (
          <span key={f.id} className="pk-band-pill" style={{ "--tone": toneVar(f.tone) } as React.CSSProperties}>
            {f.name}
            <Sparkle className="pk-band-spark" color="var(--color-cream)" />
          </span>
        ))}
      </Marquee></Reveal>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";

const COLS = [
  { title: "Shop", links: [["The shelf", "#shelf"], ["Build a box", "#box"], ["Friday list", "#list"]] },
  { title: "Kitchen", links: [["The trip", "#trip"], ["Batch day", "#batch"], ["Questions", "#faq"]] },
];

export function Footer() {
  return (
    <footer className="pk-footer">
      <div className="pk-wrap">
        <div className="pk-footer-grid">
          <div>
            <Logo size={44} className="pk-logo--light" />
            <p className="pk-footer-line">Small-batch jam. Two cooks, one pot, a very reliable Friday.</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="pk-footer-h">{c.title}</p>
              <ul>
                {c.links.map(([label, href]) => <li key={href}><a className="pk-link" href={href}>{label}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <Reveal variant="mask" className="pk-footer-mark"><span aria-hidden="true">pipkin</span></Reveal>
        <p className="pk-footer-small">© Pipkin Preserves. A fictional shop, cooked up as a landing page template.</p>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Header.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Marks";
import { useOrder } from "../box/OrderContext";
import { Magnetic } from "../motion/Magnetic";

const LINKS = [
  { id: "trip", label: "The trip" },
  { id: "shelf", label: "Shelf" },
  { id: "box", label: "Build a box" },
  { id: "notes", label: "Notes" },
  { id: "faq", label: "Questions" },
];

/** Sticky header: compresses after 80px and hides on scroll-down (both read from <html> data attributes), sliding nav indicator, full-screen pill menu on small screens. */
export function Header() {
  const { count } = useOrder();
  const [active, setActive] = useState<string>("");
  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0, on: false });

  // which section is on screen
  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = "";
        let bestRatio = 0;
        for (const [id, r] of seen) if (r > bestRatio) { best = id; bestRatio = r; }
        setActive(best);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.1, 0.4, 0.8] },
    );
    for (const l of LINKS) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const place = useCallback(() => {
    const id = hover ?? active;
    const el = id ? navRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`) : null;
    if (!el) return setInd((p) => ({ ...p, on: false }));
    setInd({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  }, [hover, active]);
  useLayoutEffect(place, [place]);
  useEffect(() => {
    window.addEventListener("resize", place, { passive: true });
    return () => window.removeEventListener("resize", place);
  }, [place]);

  // menu: lock scroll, trap focus, Escape closes and returns focus to the toggle
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const nodes = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a,button") ?? [])].filter(Boolean) as HTMLElement[];
      const i = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if (!e.shiftKey && i === nodes.length - 1) { e.preventDefault(); nodes[0].focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <header className="pk-header" data-menu={open ? "true" : "false"}>
      <div className="pk-header-bar">
        <a href="#top" className="pk-header-logo" aria-label="Pipkin, back to top"><Logo size={36} /></a>
        <nav aria-label="Primary" className="pk-nav">
          <ul ref={navRef} className="pk-nav-list" onPointerLeave={() => setHover(null)}>
            <li className="pk-nav-ind" aria-hidden="true" data-on={ind.on ? "true" : "false"} style={{ "--ix": `${ind.x}px`, "--is": (ind.w / 100).toFixed(3) } as CSSProperties} />
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} data-id={l.id} data-active={active === l.id ? "true" : "false"} className="pk-nav-link" onPointerEnter={() => setHover(l.id)} onFocus={() => setHover(l.id)} onBlur={() => setHover(null)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pk-header-actions">
          <a href="#box" className="pk-cart">
            <span className="pk-cart-label">Box</span>
            <span key={count} className="pk-cart-count" data-bump={count > 0 ? "true" : "false"}>{count}</span>
            <span className="pk-sr">{count === 1 ? "jar" : "jars"} in your box</span>
          </a>
          <span className="pk-header-cta"><Magnetic strength={10}><a href="#box" className="pk-btn pk-btn-primary pk-btn-sm"><span className="pk-btn-label">Order</span><Arrow className="pk-btn-arrow" /></a></Magnetic></span>
          <button ref={toggleRef} type="button" className="pk-menu-toggle" aria-expanded={open} aria-controls="pk-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <span className="pk-menu-bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>
      <div id="pk-menu" ref={panelRef} className="pk-menu" data-open={open ? "true" : "false"} aria-hidden={!open} inert={!open}>
        <ul className="pk-menu-list">
          {LINKS.map((l, i) => (
            <li key={l.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="pk-menu-link">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#list" onClick={() => setOpen(false)} className="pk-btn pk-btn-primary pk-menu-cta"><span className="pk-btn-label">Join the Friday list</span></a>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Hero.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { Jar } from "../brand/Jar";
import { Berry, Heart, Leaf, Sparkle, Arrow } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
import { PauseOffscreen } from "../motion/PauseOffscreen";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Hero. Everything above the fold animates from CSS keyframes (pipkin.css, .pk-load / .pk-hero .pk-wi)
 * so the sequence plays before hydration: background settles, logo + nav, headline masks, copy, CTAs, jars.
 */
export function Hero() {
  return (
    <section id="top" className="pk-hero" aria-labelledby="hero-title">
      <PauseOffscreen />
      <div className="pk-hero-bg" aria-hidden="true">
        <span className="pk-blob pk-blob-1" />
        <span className="pk-blob pk-blob-2" />
        <span className="pk-blob pk-blob-3" />
        <span className="pk-blob pk-blob-4" />
      </div>

      <div className="pk-hero-copy">
        <p className="pk-order-pill pk-load" style={d(500)}>
          <span className="pk-order-dot" aria-hidden="true" />
          <span>Order <b>&#35;0412</b> placed · Mon 9:41</span>
        </p>
        <h1 id="hero-title" className="pk-h1">
          <SplitText text="Cooked [[Tuesday.]] At your door Friday." start={3} />
        </h1>
        <p className="pk-lede pk-load" style={d(900)}>
          Pipkin is two cooks, one big pot and 36 jars at a time. Every order is stirred, labelled and packed by hand, then followed all the way to your doorstep.
        </p>
        <div className="pk-cta-row pk-load" style={d(1050)}>
          <Magnetic>
            <a href="#box" className="pk-btn pk-btn-primary">
              <span className="pk-btn-label">Build a box</span>
              <Arrow className="pk-btn-arrow" />
            </a>
          </Magnetic>
          <a href="#trip" className="pk-btn pk-btn-ghost">
            <span className="pk-btn-label">Follow a jar</span>
          </a>
        </div>
        <ul className="pk-hero-facts pk-load" style={d(1200)}>
          <li><b>36</b> jars a batch</li>
          <li><b>31</b> countries</li>
          <li><b>$0</b> shipping from 6 jars</li>
        </ul>
      </div>

      <div className="pk-hero-art" aria-hidden="true">
        <div className="pk-hero-stack">
          <div className="pk-hero-jar pk-hero-jar-1"><Jar tone="lilac" label="No. 05" /></div>
          <div className="pk-hero-jar pk-hero-jar-2"><Jar tone="bubblegum" label="No. 01" /></div>
          <div className="pk-hero-jar pk-hero-jar-3"><Jar tone="butter" label="No. 02" /></div>
          <span className="pk-chip pk-chip-1"><Heart className="pk-chip-ic" /> Made Tuesday</span>
          <span className="pk-chip pk-chip-2"><Leaf className="pk-chip-ic" /> Real fruit, no pectin</span>
          <span className="pk-chip pk-chip-3"><Berry className="pk-chip-ic" /> Batch No. 17</span>
          <Sparkle className="pk-spark pk-spark-1" />
          <Sparkle className="pk-spark pk-spark-2" color="var(--color-bubblegum)" />
          <Sparkle className="pk-spark pk-spark-3" color="var(--color-mint)" />
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Notes.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { NOTES } from "../data/shop";
import { Marquee } from "../motion/Marquee";
import { toneVar } from "../brand/Jar";
import { Heart } from "../brand/Marks";
import { SectionHead } from "./SectionHead";

const A = NOTES.slice(0, 4);
const B = NOTES.slice(4);

function NoteCard({ n }: { n: (typeof NOTES)[number] }) {
  return (
    <figure className="pk-note" style={{ "--tone": toneVar(n.tone) } as CSSProperties}>
      <blockquote>{n.text}</blockquote>
      <figcaption><Heart className="pk-note-heart" /> <b>{n.who}</b> · {n.where}</figcaption>
    </figure>
  );
}

/** Doorstep notes: customer notes on two drifting rows that move against each other and pause on hover. */
export function Notes() {
  return (
    <section id="notes" className="pk-sec pk-sec--lilac" aria-labelledby="notes-title">
      <div className="pk-wrap">
        <SectionHead id="notes-title" eyebrow="Doorstep notes" title="Little letters, [[big smiles.]]" lede="Every box carries a postcard. Some come back. These are our favourites." />
      </div>
      <div className="pk-notes">
        <Marquee label="Notes from customers, first row" speed={60}>{A.map((n) => <NoteCard key={n.id} n={n} />)}</Marquee>
        <Marquee label="Notes from customers, second row" speed={72} reverse>{B.map((n) => <NoteCard key={n.id} n={n} />)}</Marquee>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/SectionHead.tsx">
<![CDATA[import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

type Props = { id: string; eyebrow: string; title: string; lede?: string; align?: "left" | "center" };

/** Eyebrow slides in, the title rises through word masks, the lede rises: three roles, three reveals. */
export function SectionHead({ id, eyebrow, title, lede, align = "left" }: Props) {
  return (
    <div className="pk-head" data-align={align}>
      <Reveal variant="slide-left"><p className="pk-eyebrow">{eyebrow}</p></Reveal>
      <Reveal variant="mask"><SplitText as="h2" id={id} className="pk-h2" text={title} /></Reveal>
      {lede ? <Reveal variant="rise" delay={180}><p className="pk-lede">{lede}</p></Reveal> : null}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/sections/Shelf.tsx">
<![CDATA["use client";
import { useState, type CSSProperties } from "react";
import { FILTERS, filterFlavors, type FlavorTag } from "../data/shop";
import { Jar, toneVar } from "../brand/Jar";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { useOrder } from "../box/OrderContext";
import { money } from "../box/logic";
import { SectionHead } from "./SectionHead";

/** The shelf: six flavour cards. Filter chips swap the set; cards tilt and glow with the pointer; "Add" drops a jar into the shared box. */
export function Shelf() {
  const [filter, setFilter] = useState<"all" | FlavorTag>("all");
  const { box, dispatch } = useOrder();
  const items = filterFlavors(filter);

  return (
    <section id="shelf" className="pk-sec pk-sec--blush" aria-labelledby="shelf-title">
      <div className="pk-wrap">
        <SectionHead id="shelf-title" eyebrow="The shelf" title="Six jars, [[six moods.]]" lede="One batch of each, always. When a flavour is gone it is gone until its fruit comes round again." />
        <Reveal variant="rise" delay={240}>
          <div className="pk-filters" role="group" aria-label="Filter flavours">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className="pk-chipbtn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                <span className="pk-btn-label">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="pk-shelf-grid" data-filter={filter}>
          {items.map((f, i) => {
            const n = box.jars[f.id] ?? 0;
            return (
              <li key={`${filter}-${f.id}`} className="pk-card-li" style={{ "--i": i, "--tone": toneVar(f.tone) } as CSSProperties}>
                <TiltCard className="pk-card">
                  <span className="pk-card-glow" aria-hidden="true" />
                  <span className="pk-card-lidno">{f.lid}</span>
                  <div className="pk-card-art">
                    <Jar tone={f.tone} label={f.lid.replace("No. ", "")} />
                  </div>
                  <h3 className="pk-card-name">{f.name}</h3>
                  <p className="pk-card-line">{f.line}</p>
                  <ul className="pk-tags" aria-label="Tags">
                    {f.tags.map((t) => <li key={t} className="pk-tag">{t}</li>)}
                  </ul>
                  <div className="pk-card-foot">
                    <span className="pk-price">{money(f.price)}<small> / jar</small></span>
                    <button type="button" className="pk-btn pk-btn-primary pk-btn-sm pk-add" onClick={() => dispatch({ type: "add", id: f.id })}>
                      <span className="pk-btn-label">{n ? "Add another" : "Add to box"}</span>
                      {n ? <span key={n} className="pk-add-count">×{n}</span> : null}
                      <span className="pk-sr">: {f.name}</span>
                    </button>
                  </div>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/trip/progress.ts">
<![CDATA[import { dwell, nearestStop, sectionProgress } from "../motion/math";

export const STOP_COUNT = 5;

export type TripPose = {
  /** 0..1 through the pinned section */
  p: number;
  /** 0..4, lingering on every stop */
  s: number;
  /** the stop the stage is "at" right now */
  stop: number;
};

/** Everything the stage needs from one scroll reading. Pure so it can be tested without a DOM. */
export function tripPose(scrollY: number, top: number, height: number, viewportH: number, stops = STOP_COUNT): TripPose {
  const p = sectionProgress(scrollY, top, height, viewportH);
  const s = dwell(p, stops);
  return { p, s, stop: nearestStop(s, stops) };
}

/** Scroll offset (page px) at which a stop is centred, for deep links like #trip-3. */
export function scrollForStop(stop: number, top: number, height: number, viewportH: number, stops = STOP_COUNT): number {
  const travel = Math.max(0, height - viewportH);
  const clamped = Math.min(Math.max(stop, 0), stops - 1);
  return top + (clamped / (stops - 1)) * travel;
}

/** A stop's local progress: 0 when two stops away, 1 when centred, back to 0 two stops past. */
export function stopFocus(s: number, stop: number): number {
  return Math.max(0, 1 - Math.abs(s - stop));
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/trip/scenes.tsx">
<![CDATA[import type { ReactNode } from "react";
import { JarArt } from "../brand/Jar";

/**
 * The five stops of the trip, each drawn in a 1200x700 box with the ground line at y=548 and the
 * travelling jar at x=600. Props sit around that focal point so the same art works when the stage crops
 * to a phone. Parallax layers (pk-px1..3), --f (focus) and ambient loops are driven from pipkin.css.
 */

const SPARKLE = "M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z";
const HEART = "M20 33 C6 24 3 16 3 11 C3 6 7 3 11 3 C15 3 18 5 20 9 C22 5 25 3 29 3 C33 3 37 6 37 11 C37 16 34 24 20 33 Z";

function Spark({ x, y, k = 1, fill = "var(--color-butter)", delay = 0 }: { x: number; y: number; k?: number; fill?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-twinkle" style={{ animationDelay: `${delay}s` }} d={SPARKLE} fill={fill} stroke="var(--color-plum)" strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  );
}

function Love({ x, y, k = 1, fill = "var(--color-bubblegum)", delay = 0 }: { x: number; y: number; k?: number; fill?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-float" style={{ animationDelay: `${delay}s` }} d={HEART} fill={fill} stroke="var(--color-plum)" strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  );
}

function Cloudlet({ x, y, k = 1, delay = 0 }: { x: number; y: number; k?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-drift" style={{ animationDelay: `${delay}s` }} d="M22 50 C8 50 4 36 14 31 C12 18 28 12 36 22 C40 8 66 6 72 22 C84 14 102 22 98 36 C112 36 114 50 100 50 Z" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  );
}

function Backdrop({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg className="pk-scene-art" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} focusable="false">
      <rect className="pk-bg" width="1200" height="700" />
      <rect className="pk-floor" y="548" width="1200" height="152" />
      <line x1="0" x2="1200" y1="548" y2="548" stroke="var(--color-plum)" strokeWidth="3.5" />
      {children}
    </svg>
  );
}

/* 1 · the order pings the kitchen phone */
export function SceneOrder() {
  return (
    <Backdrop label="A phone on the kitchen counter shows a new order notification, with a receipt beside it.">
      <g className="pk-px3">
        <Spark x={120} y={130} k={1.5} delay={0.2} />
        <Love x={1010} y={150} k={1.3} delay={0.8} />
        <Spark x={1070} y={330} k={0.9} fill="var(--color-blush)" delay={1.1} />
        <Cloudlet x={170} y={300} k={1.1} />
        <Cloudlet x={900} y={90} k={0.9} delay={2} />
      </g>
      <g className="pk-px1">
        <g transform="translate(250 252)">
          <rect width="196" height="296" rx="48" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="14" y="46" width="168" height="222" rx="30" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.5" />
          <rect x="76" y="16" width="44" height="10" rx="5" fill="var(--color-plum)" />
          <g className="pk-notif">
            <rect x="22" y="62" width="152" height="66" rx="22" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
            <circle cx="48" cy="95" r="13" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.4" />
            <path d="M48 87 v9 M48 101 v.5" stroke="var(--color-plum)" strokeWidth="3" strokeLinecap="round" />
            <text x="70" y="90" className="pk-svg-text pk-svg-strong">New order!</text>
            <text x="68" y="108" className="pk-svg-text pk-svg-small">&#35;0412 · 3 jars</text>
          </g>
          <rect x="22" y="142" width="152" height="44" rx="22" fill="var(--color-cream)" opacity=".75" stroke="var(--color-plum)" strokeWidth="2" />
          <rect x="22" y="198" width="152" height="44" rx="22" fill="var(--color-cream)" opacity=".5" stroke="var(--color-plum)" strokeWidth="2" />
        </g>
        <g transform="translate(348 214)">
          <circle className="pk-ring" r="30" fill="none" stroke="var(--color-plum)" strokeWidth="3" />
          <circle className="pk-ring pk-ring-2" r="30" fill="none" stroke="var(--color-plum)" strokeWidth="3" />
          <g className="pk-wobble">
            <path d="M-24 22 C-24 -4 -16 -28 0 -28 C16 -28 24 -4 24 22 Z" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" strokeLinejoin="round" />
            <rect x="-30" y="20" width="60" height="9" rx="4.5" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3" />
            <circle cx="0" cy="38" r="6" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.6" />
          </g>
        </g>
      </g>
      <g className="pk-px2">
        <g transform="translate(790 232)"><g className="pk-sway">
          <rect width="196" height="316" rx="38" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="62" y="-14" width="72" height="26" rx="13" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <text x="98" y="52" textAnchor="middle" className="pk-svg-text pk-svg-strong">TICKET &#35;0412</text>
          <rect x="28" y="76" width="140" height="12" rx="6" fill="var(--color-blush)" />
          <rect x="28" y="102" width="104" height="12" rx="6" fill="var(--color-blush)" />
          <rect x="28" y="128" width="124" height="12" rx="6" fill="var(--color-blush)" />
          <line x1="28" x2="168" y1="168" y2="168" stroke="var(--color-plum)" strokeWidth="2.4" strokeDasharray="2 9" strokeLinecap="round" />
          <text x="28" y="204" className="pk-svg-text">3 jars · box of 3</text>
          <text x="28" y="228" className="pk-svg-text">Cook day: Tuesday</text>
          <g transform="translate(70 246) scale(1.3)"><path d={HEART} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2" strokeLinejoin="round" /></g>
        </g></g>
      </g>
    </Backdrop>
  );
}

/* 2 · the big pot goes on and the jar is filled */
export function SceneCook() {
  return (
    <Backdrop label="A pastel stockpot of bubbling jam, a ladle pouring into a jar, and a shelf of finished jars.">
      <g className="pk-px3">
        <rect x="770" y="236" width="300" height="20" rx="10" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
        <g transform="translate(790 156) scale(.62)"><JarArt tone="bubblegum" label="01" /></g>
        <g transform="translate(870 156) scale(.62)"><JarArt tone="lilac" label="05" /></g>
        <g transform="translate(950 156) scale(.62)"><JarArt tone="mint" label="03" /></g>
        <Spark x={160} y={140} k={1.3} fill="var(--color-cream)" delay={0.4} />
        <Spark x={1090} y={400} k={0.8} fill="var(--color-blush)" delay={1} />
      </g>
      <g className="pk-px1">
        <g className="pk-steam">
          <path d="M290 300 C270 270 310 250 290 214 C280 196 296 180 296 180" fill="none" stroke="var(--color-cream)" strokeWidth="12" strokeLinecap="round" />
          <path d="M350 296 C330 262 372 244 352 206" fill="none" stroke="var(--color-cream)" strokeWidth="10" strokeLinecap="round" style={{ animationDelay: "0.9s" }} />
          <path d="M410 300 C396 270 428 252 414 224" fill="none" stroke="var(--color-cream)" strokeWidth="9" strokeLinecap="round" style={{ animationDelay: "1.6s" }} />
        </g>
        <g transform="translate(200 312)">
          <rect x="-26" y="52" width="40" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="262" y="52" width="40" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="0" y="18" width="276" height="218" rx="58" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="-12" y="0" width="300" height="42" rx="21" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="18" y="8" width="240" height="22" rx="11" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
          <circle className="pk-bubble" cx="70" cy="14" r="9" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <circle className="pk-bubble pk-bubble-2" cx="150" cy="12" r="12" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <circle className="pk-bubble pk-bubble-3" cx="214" cy="16" r="8" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <rect x="48" y="104" width="180" height="58" rx="29" fill="var(--color-cream)" opacity=".7" />
          <text x="138" y="141" textAnchor="middle" className="pk-svg-text pk-svg-strong">BATCH 17</text>
          <g className="pk-stir" style={{ transformOrigin: "138px 20px" }}>
            <rect x="124" y="-92" width="22" height="124" rx="11" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
            <ellipse cx="135" cy="-100" rx="22" ry="30" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
          </g>
        </g>
      </g>
      <g className="pk-px2">
        <rect className="pk-stream" x="606" y="372" width="12" height="52" rx="6" fill="var(--color-bubblegum)" />
        <g className="pk-ladle">
          <line x1="656" y1="326" x2="800" y2="196" stroke="var(--color-plum)" strokeWidth="26" strokeLinecap="round" />
          <line x1="656" y1="326" x2="800" y2="196" stroke="var(--color-butter)" strokeWidth="17" strokeLinecap="round" />
          <path d="M556 318 C556 352 580 376 612 376 C644 376 668 352 668 318 Z" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.6" strokeLinejoin="round" />
          <ellipse cx="612" cy="318" rx="56" ry="9" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
    </Backdrop>
  );
}

/* 3 · lids on, labels written, tissue in */
export function ScenePack() {
  return (
    <Backdrop label="A packing table with tape, tissue paper, stickers, a pencil and flat boxes waiting to be built.">
      <g className="pk-px3">
        <Spark x={96} y={300} k={1.2} delay={0.3} />
        <Love x={1040} y={210} k={1.1} fill="var(--color-blush)" delay={1.2} />
        <g transform="translate(240 76)"><g className="pk-sway">
          <line x1="0" y1="0" x2="0" y2="88" stroke="var(--color-plum)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          <rect x="-82" y="88" width="164" height="54" rx="27" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.6" />
          <text x="0" y="122" textAnchor="middle" className="pk-svg-text pk-svg-strong">Handle with jam</text>
        </g></g>
      </g>
      <g className="pk-px1">
        <g transform="translate(250 466)">
          <rect x="0" y="0" width="150" height="34" rx="17" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="14" y="-26" width="138" height="34" rx="17" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="-4" y="-52" width="132" height="34" rx="17" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.4" />
        </g>
        <g transform="translate(380 528)">
          <circle r="42" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.8" transform="translate(0 -22)" />
          <circle r="17" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3.2" transform="translate(0 -22)" />
          <rect x="-12" y="-4" width="94" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
      <g className="pk-px2">
        <g transform="translate(820 410)">
          <rect x="0" y="62" width="196" height="76" rx="30" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <rect x="-8" y="0" width="212" height="70" rx="30" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.8" />
        </g>
        <g transform="translate(920 330)"><g className="pk-write">
          <rect x="-8" y="-80" width="22" height="130" rx="11" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.4" transform="rotate(34 3 -15)" />
        </g></g>
        <g transform="translate(1000 262)">
          <rect width="120" height="54" rx="27" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
          <g transform="translate(24 10) scale(.72)"><path d={HEART} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" /></g>
          <g transform="translate(66 10) scale(.72)"><path d={SPARKLE} fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" /></g>
        </g>
      </g>
    </Backdrop>
  );
}

/* 4 · the courier picks up and the road scrolls by */
export function SceneRoad() {
  return (
    <Backdrop label="A cheerful delivery truck with a flat bed drives along a pastel road past little houses and trees.">
      <g className="pk-px3">
        <Cloudlet x={140} y={110} k={1.3} />
        <Cloudlet x={820} y={70} k={1} delay={3} />
        <Cloudlet x={1040} y={210} k={0.8} delay={5} />
      </g>
      <g className="pk-px2">
        {[
          { x: 90, c: "var(--color-sky)", h: 120 },
          { x: 250, c: "var(--color-butter)", h: 150 },
          { x: 930, c: "var(--color-blush)", h: 130 },
          { x: 1080, c: "var(--color-mint)", h: 160 },
        ].map((b) => (
          <g key={b.x} transform={`translate(${b.x} ${548 - b.h})`}>
            <rect width="120" height={b.h} rx="40" fill={b.c} stroke="var(--color-plum)" strokeWidth="3.4" />
            <rect x="40" y={b.h - 74} width="40" height="74" rx="20" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.8" />
          </g>
        ))}
        <g transform="translate(160 390)"><rect x="-6" y="40" width="12" height="118" rx="6" fill="var(--color-plum)" /><circle r="46" cy="30" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3.4" /></g>
      </g>
      <g className="pk-road">
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x={i * 160 - 1100} y="628" width="84" height="12" rx="6" fill="var(--color-cream)" />
        ))}
      </g>
      <g className="pk-px1">
        <g className="pk-van">
          <rect x="460" y="500" width="320" height="30" rx="15" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="4" />
          <path d="M770 530 L770 408 C770 380 788 366 812 366 L856 366 C886 366 908 392 920 428 L940 480 C946 498 950 506 950 520 L950 536 C950 546 944 552 934 552 L780 552 C774 552 770 546 770 538 Z" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="4" strokeLinejoin="round" />
          <path d="M796 388 L850 388 C868 388 880 402 890 428 L796 428 Z" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="454" y="496" width="12" height="40" rx="6" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
          <g className="pk-wheel" style={{ transformOrigin: "540px 548px" }}>
            <circle cx="540" cy="548" r="46" fill="var(--color-plum)" />
            <circle cx="540" cy="548" r="20" fill="var(--color-butter)" stroke="var(--color-cream)" strokeWidth="3" />
            <path d="M540 528 v40 M520 548 h40" stroke="var(--color-plum)" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="pk-wheel" style={{ transformOrigin: "850px 548px" }}>
            <circle cx="850" cy="548" r="46" fill="var(--color-plum)" />
            <circle cx="850" cy="548" r="20" fill="var(--color-butter)" stroke="var(--color-cream)" strokeWidth="3" />
            <path d="M850 528 v40 M830 548 h40" stroke="var(--color-plum)" strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="618" y="526" textAnchor="middle" className="pk-svg-text pk-svg-strong">PIPKIN</text>
        </g>
      </g>
    </Backdrop>
  );
}

/* 5 · the doorstep */
export function SceneDoor() {
  return (
    <Backdrop label="A front door with a welcome mat, a potted plant and a window, and confetti where the box has just arrived.">
      <g className="pk-px3">
        <rect x="150" y="70" width="900" height="478" rx="80" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
      </g>
      <g className="pk-px2">
        <g transform="translate(414 150)">
          <rect width="372" height="398" rx="186" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="4.4" />
          <rect x="44" y="60" width="284" height="338" rx="142" fill="none" stroke="var(--color-plum)" strokeWidth="3" opacity=".6" />
          <circle cx="302" cy="250" r="16" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
        </g>
        <g transform="translate(822 150)">
          <rect width="86" height="40" rx="20" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <text x="43" y="26" textAnchor="middle" className="pk-svg-text pk-svg-strong">No. 12</text>
        </g>
        <g transform="translate(206 220)">
          <rect width="150" height="170" rx="75" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <path d="M75 12 v146 M12 85 h126" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
        <g transform="translate(844 220)">
          <rect width="150" height="170" rx="75" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <path d="M75 12 v146 M12 85 h126" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
      <g className="pk-px1">
        <rect x="462" y="534" width="276" height="28" rx="14" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.6" />
        <g transform="translate(900 470)">
          <g className="pk-sway pk-sway-slow" style={{ transformOrigin: "40px 40px" }}>
            <path d="M40 40 C20 20 14 -6 30 -26 C46 -8 52 18 40 40 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M40 40 C60 22 80 14 96 24 C86 46 62 52 40 40 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3" strokeLinejoin="round" />
          </g>
          <path d="M-4 40 H84 L72 80 H8 Z" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.8" strokeLinejoin="round" />
        </g>
        <g className="pk-confetti">
          <Spark x={330} y={160} k={1.3} delay={0.1} />
          <Spark x={840} y={130} k={1.6} fill="var(--color-bubblegum)" delay={0.4} />
          <Love x={290} y={420} k={1.1} fill="var(--color-lilac)" delay={0.7} />
          <Love x={880} y={330} k={0.9} delay={0.3} />
          <Spark x={640} y={96} k={0.9} fill="var(--color-mint)" delay={0.9} />
        </g>
        <g transform="translate(600 150) rotate(-3)"><g className="pk-banner">
          <rect x="-132" y="-26" width="264" height="52" rx="26" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.6" />
          <text x="0" y="6" textAnchor="middle" className="pk-svg-text pk-svg-strong pk-svg-big">Delivered · 11:20</text>
        </g></g>
      </g>
    </Backdrop>
  );
}

export const SCENES = [SceneOrder, SceneCook, ScenePack, SceneRoad, SceneDoor];
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/trip/Traveler.tsx">
<![CDATA[import { JarArt } from "../brand/Jar";

const SPARKLE = "M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z";

/**
 * The order's jar and shipping box, drawn on a 1200x700 layer that lines up with the scene art
 * (same viewBox, same crop). Which pieces show is decided in pipkin.css from `data-stop`, so every
 * change between stops is a plain CSS transition that can reverse mid-flight.
 */
export function Traveler({ stop, className = "" }: { stop: number; className?: string }) {
  return (
    <svg className={`pk-tv-layer ${className}`} data-stop={stop} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g transform="translate(600 548)">
        <ellipse className="pk-tv-shadow" cx="0" cy="8" rx="128" ry="15" fill="var(--color-plum)" />
        <g className="pk-tv-lift">
          <g className="pk-tv-squash">
            <g className="pk-tv-bob">
              <g className="pk-tv-ghost" transform="translate(-72 -172) scale(1.2)">
                <JarArt tone="bubblegum" ghost />
              </g>
              <g className="pk-tv-jar">
                <g className="pk-tv-jarlift">
                  <g transform="translate(-72 -172) scale(1.2)">
                    <JarArt tone="bubblegum" label="No. 01" />
                  </g>
                </g>
              </g>
              <g className="pk-tv-box">
                <rect x="-125" y="-124" width="250" height="124" rx="36" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="4.4" />
                <rect x="-70" y="-100" width="140" height="56" rx="28" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
                <text x="0" y="-65" textAnchor="middle" className="pk-svg-text pk-svg-strong pk-svg-big">PIPKIN</text>
                <g className="pk-tv-lid">
                  <rect x="-140" y="-158" width="280" height="50" rx="25" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="4.4" />
                  <rect x="-24" y="-158" width="48" height="50" rx="14" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.4" />
                </g>
              </g>
              <g className="pk-tv-pop">
                <g transform="translate(-190 -250) scale(1.4)"><path className="pk-twinkle" d={SPARKLE} fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
                <g transform="translate(150 -290) scale(1.1)"><path className="pk-twinkle" style={{ animationDelay: "0.5s" }} d={SPARKLE} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
                <g transform="translate(170 -190) scale(.8)"><path className="pk-twinkle" style={{ animationDelay: "1s" }} d={SPARKLE} fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" /></g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(pipkin)/pipkin/trip/TripStage.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { STOPS } from "../data/shop";
import { LogoMark } from "../brand/Logo";
import { SCENES } from "./scenes";
import { Traveler } from "./Traveler";
import { STOP_COUNT, scrollForStop, tripPose } from "./progress";
import { useInView } from "../motion/useInView";
import { useReducedMotion } from "../motion/useReducedMotion";

type Metrics = { top: number; height: number; vh: number };

/**
 * "The Trip": one order followed from checkout to doorstep. In scrub mode a sticky stage slides a strip of
 * five illustrated scenes sideways while one jar rides the route; scroll progress goes to CSS variables from
 * a single rAF loop. With reduced motion (or no JS) it falls back to five stacked cards, all visible.
 */
export function TripStage() {
  const reduced = useReducedMotion();
  const mode = reduced ? "flow" : "scrub";
  const [stop, setStop] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const metrics = useRef<Metrics>({ top: 0, height: 1, vh: 1 });
  const { ref: liveRef, inView } = useInView<HTMLDivElement>({ once: false });

  useEffect(() => {
    if (mode !== "scrub") return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    let raf = 0;
    let current = -1;

    const measure = () => {
      const r = section.getBoundingClientRect();
      metrics.current = { top: r.top + window.scrollY, height: r.height, vh: window.innerHeight };
    };
    const paint = () => {
      raf = 0;
      const { top, height, vh } = metrics.current;
      const pose = tripPose(window.scrollY, top, height, vh);
      stage.style.setProperty("--s", pose.s.toFixed(4));
      stage.style.setProperty("--p", pose.p.toFixed(4));
      if (pose.stop !== current) {
        current = pose.stop;
        setStop(pose.stop);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const remeasure = () => { measure(); onScroll(); };

    measure();
    paint();
    const ro = new ResizeObserver(remeasure);
    ro.observe(section);
    ro.observe(document.body);
    document.fonts?.ready.then(remeasure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    window.addEventListener("load", remeasure);

    // #trip-3 deep-links to the third stop
    const m = /^#trip-([1-5])$/.exec(window.location.hash);
    if (m) window.scrollTo(0, scrollForStop(Number(m[1]) - 1, metrics.current.top, metrics.current.height, metrics.current.vh));

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  const jump = useCallback((i: number) => {
    const { top, height, vh } = metrics.current;
    window.dispatchEvent(new CustomEvent("pk:scrollto", { detail: { top: scrollForStop(i, top, height, vh) } }));
    history.replaceState(null, "", `#trip-${i + 1}`);
  }, []);

  const info = STOPS[stop];
  return (
    <section id="trip" ref={sectionRef} className="pk-trip" data-mode={mode} data-live={inView ? "true" : "false"} aria-labelledby="trip-title">
      <div className="pk-trip-pin" ref={liveRef}>
        <div className="pk-trip-head">
          <div>
            <p className="pk-eyebrow">The trip · 72 hours</p>
            <h2 id="trip-title" className="pk-h2">Follow one jar, door to door.</h2>
          </div>
          <nav aria-label="Trip stops" className="pk-rail-wrap">
            <ol className="pk-rail">
              {STOPS.map((s, i) => (
                <li key={s.id}>
                  <button type="button" className="pk-rail-btn" data-active={stop === i ? "true" : "false"} aria-current={stop === i ? "step" : undefined} onClick={() => jump(i)}>
                    <span className="pk-rail-n">{i + 1}</span>
                    <span className="pk-rail-l">{s.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="pk-stage" ref={stageRef} data-mode={mode} data-stop={stop}>
          <div className="pk-strip">
            {SCENES.map((Scene, i) => (
              <article key={STOPS[i].id} className="pk-scene" data-active={stop === i ? "true" : "false"} style={{ "--i": i } as CSSProperties} aria-label={`Step ${i + 1} of ${STOP_COUNT}: ${STOPS[i].label}`}>
                <div className="pk-scene-frame">
                  <Scene />
                  {mode === "flow" ? <Traveler stop={i} /> : null}
                </div>
                <div className="pk-scene-copy">
                  <p className="pk-stepline"><span>Step {i + 1} of {STOP_COUNT}</span><span>{STOPS[i].when}</span></p>
                  <h3 className="pk-h3">{STOPS[i].title}</h3>
                  <p>{STOPS[i].body}</p>
                </div>
              </article>
            ))}
          </div>
          {mode === "scrub" ? <Traveler stop={stop} /> : null}
          {mode === "scrub" ? (
            <>
              <div className="pk-tracker" aria-hidden="true">
                <span className="pk-tracker-dot" />
                <span key={stop} className="pk-tracker-text">Your jar · {info.label}</span>
              </div>
              <div className="pk-route" aria-hidden="true">
                <i className="pk-route-fill" />
                {STOPS.map((s, i) => <b key={s.id} className="pk-route-dot" data-done={stop >= i ? "true" : "false"} style={{ left: `${(i / (STOP_COUNT - 1)) * 100}%` }} />)}
                <span className="pk-route-rider"><LogoMark size={30} /></span>
              </div>
            </>
          ) : null}
        </div>

        {mode === "scrub" ? (
          <div className="pk-caption" aria-live="polite" aria-atomic="true">
            <p key={`m${stop}`} className="pk-stepline"><span>Step {stop + 1} of {STOP_COUNT}</span><span>{info.when}</span></p>
            <h3 key={`t${stop}`} className="pk-h3">{info.title}</h3>
            <p key={`b${stop}`} className="pk-caption-body">{info.body}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
]]>
    </file>
  </files>
</template>
