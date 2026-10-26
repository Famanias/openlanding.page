<template slug="lucentra" name="LUCENTRA">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(lucentra)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora, Space_Mono } from "next/font/google";
import "./lucentra/lucentra.css";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-lc-sora" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-lc-jakarta" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lc-space", preload: false });

export const metadata: Metadata = {
  title: "LUCENTRA — Make light legible",
  description: "A real-time material calibration studio for designers and frontend teams.",
  openGraph: { title: "LUCENTRA — Make light legible", description: "Tune the surface before the handoff.", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F5F7FB", colorScheme: "light" };

export default function LucentraLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head><noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] *{visibility:visible!important}`}</style></noscript></head>
      <body className="lc-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/lucentra";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`lc-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={source} srcSet={`${assetSrc(assetKey, 800, "webp")} 800w, ${assetSrc(assetKey, 1600, "webp")} 1600w`} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#10141C"/><path d="M12 15 24 9 35 17 22 37 12 30 12 15Z" fill="none" stroke="#F5F7FB" stroke-width="2"/><path d="M24 9 22 37M12 15 35 17" fill="none" stroke="#2E63FF" stroke-width="1.7"/></svg>
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/lucentra.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-lc-ink: #10141C;
  --color-lc-paper: #F5F7FB;
  --color-lc-accent: #2E63FF;
  --color-lc-spectral: #C5D4FF;
  --font-lc-display: var(--font-lc-sora), ui-sans-serif, sans-serif;
  --font-lc-body: var(--font-lc-jakarta), ui-sans-serif, sans-serif;
  --font-lc-mono: var(--font-lc-space), ui-monospace, monospace;
  --ease-lc-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-lc-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-lc-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-lc-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-lc-instant: 90ms;
  --dur-lc-fast: 180ms;
  --dur-lc-base: 420ms;
  --dur-lc-slow: 800ms;
  --dur-lc-hero: 1200ms;
  --lc-shift: 28px;
  --lc-stagger: 70ms;
}

:root { --lc-gutter: clamp(18px, 5vw, 76px); --lc-max: 1320px; --lc-progress: 0; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--color-lc-paper); }
body { margin: 0; background: var(--color-lc-paper); color: var(--color-lc-ink); font-family: var(--font-lc-body); -webkit-font-smoothing: antialiased; }
button, input, select, textarea { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 2px solid var(--color-lc-accent); outline-offset: 4px; }
::selection { background: color-mix(in oklab, var(--color-lc-accent) 25%, transparent); }
h1, h2, h3, p { margin: 0; }
h1, h2, h3 { font-family: var(--font-lc-display); font-weight: 600; letter-spacing: -0.055em; line-height: .98; text-wrap: balance; }
.lc-body { overflow-x: clip; }
.lc-shell { min-height: 100vh; background: var(--color-lc-paper); }
.lc-skip { position: fixed; left: 16px; top: 12px; transform: translateY(-160%); z-index: 40; background: var(--color-lc-ink); color: var(--color-lc-paper); padding: 10px 14px; font-family: var(--font-lc-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; transition: transform var(--dur-lc-fast) var(--ease-lc-out); }
.lc-skip:focus { transform: none; }
.lc-container { width: min(var(--lc-max), calc(100% - (var(--lc-gutter) * 2))); margin-inline: auto; }
.lc-mono { font-family: var(--font-lc-mono); font-size: 11px; letter-spacing: .12em; line-height: 1.3; text-transform: uppercase; }
.lc-muted { color: color-mix(in srgb, var(--color-lc-ink) 58%, transparent); }
.lc-rule { height: 1px; background: color-mix(in srgb, var(--color-lc-ink) 17%, transparent); transform-origin: left; }
.lc-progress { position: fixed; inset: 0 0 auto; height: 2px; z-index: 30; background: var(--color-lc-accent); transform: scaleX(var(--lc-progress)); transform-origin: left; }

.lc-header { position: fixed; inset: 18px var(--lc-gutter) auto; z-index: 20; display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border: 1px solid color-mix(in srgb, var(--color-lc-ink) 13%, transparent); background: color-mix(in srgb, var(--color-lc-paper) 88%, transparent); backdrop-filter: blur(14px); transition: transform var(--dur-lc-base) var(--ease-lc-out), background var(--dur-lc-fast) var(--ease-lc-out); }
.lc-header[data-scrolled="true"] { background: color-mix(in srgb, var(--color-lc-paper) 96%, transparent); }
.lc-logo { display: inline-flex; gap: 10px; align-items: center; color: var(--color-lc-ink); }
.lc-logo__mark { width: 30px; height: 30px; flex: 0 0 auto; }
.lc-logo__mark rect { fill: var(--color-lc-ink); }
.lc-logo__mark path { fill: none; stroke: var(--color-lc-paper); stroke-width: 2; }
.lc-logo__mark .lc-logo__signal { stroke: var(--color-lc-accent); stroke-width: 1.7; }
.lc-logo__word { font-family: var(--font-lc-display); font-size: 15px; font-weight: 700; letter-spacing: .08em; }
.lc-nav { display: flex; align-items: center; gap: clamp(14px, 2.5vw, 34px); }
.lc-nav a { position: relative; color: color-mix(in srgb, var(--color-lc-ink) 68%, transparent); font-family: var(--font-lc-mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.lc-nav a::after { content: ""; position: absolute; left: 0; right: 100%; bottom: -6px; height: 1px; background: var(--color-lc-accent); transition: right var(--dur-lc-fast) var(--ease-lc-out); }
.lc-nav a:hover, .lc-nav a[data-active="true"] { color: var(--color-lc-ink); }
.lc-nav a:hover::after, .lc-nav a[data-active="true"]::after { right: 0; }
.lc-menu { display: none; border: 0; background: transparent; color: var(--color-lc-ink); }

.lc-hero { min-height: 100svh; padding: 156px 0 86px; display: grid; align-items: center; position: relative; overflow: hidden; }
.lc-hero__grid { display: grid; grid-template-columns: 1.04fr .96fr; gap: clamp(28px, 7vw, 110px); align-items: center; }
.lc-kicker { display: inline-flex; align-items: center; gap: 10px; color: var(--color-lc-accent); }
.lc-kicker::before { content: ""; width: 22px; height: 1px; background: currentColor; }
.lc-hero h1 { max-width: 8ch; margin-top: 22px; font-size: clamp(4.2rem, 10.5vw, 10.5rem); }
.lc-hero__lede { max-width: 38ch; margin-top: 28px; color: color-mix(in srgb, var(--color-lc-ink) 69%, transparent); font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.65; }
.lc-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
.lc-btn { position: relative; isolation: isolate; overflow: hidden; display: inline-flex; justify-content: center; align-items: center; min-height: 44px; padding: 0 18px; border: 1px solid var(--color-lc-ink); background: transparent; color: var(--color-lc-ink); font-weight: 600; cursor: pointer; transition: transform var(--dur-lc-instant) var(--ease-lc-spring), color var(--dur-lc-fast) var(--ease-lc-out); }
.lc-btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--color-lc-ink); transform: translateX(-102%); transition: transform var(--dur-lc-base) var(--ease-lc-out); }
.lc-btn:hover { color: var(--color-lc-paper); }
.lc-btn:hover::before { transform: none; }
.lc-btn:active { transform: scale(.97); }
.lc-btn--solid { border-color: var(--color-lc-accent); background: var(--color-lc-accent); color: var(--color-lc-paper); }
.lc-btn--solid::before { background: var(--color-lc-ink); }
.lc-btn--ghost { border-color: color-mix(in srgb, var(--color-lc-ink) 23%, transparent); }
.lc-hero__meta { display: flex; gap: 24px; margin-top: 48px; color: color-mix(in srgb, var(--color-lc-ink) 52%, transparent); }
.lc-hero__meta strong { display: block; margin-top: 5px; color: var(--color-lc-ink); font-family: var(--font-lc-mono); font-size: 13px; font-weight: 400; }

.lc-specimen-frame { position: relative; min-height: clamp(360px, 50vw, 620px); border: 1px solid color-mix(in srgb, var(--color-lc-ink) 18%, transparent); background: var(--color-lc-paper); overflow: hidden; }
.lc-specimen-frame::before, .lc-specimen-frame::after { content: ""; position: absolute; pointer-events: none; }
.lc-specimen-frame::before { inset: 15%; border: 1px solid color-mix(in srgb, var(--color-lc-accent) 35%, transparent); transform: rotate(8deg); }
.lc-specimen-frame::after { inset: 24% 10%; border-top: 1px solid color-mix(in srgb, var(--color-lc-ink) 24%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--color-lc-ink) 24%, transparent); transform: rotate(-13deg); }
.lc-specimen { position: absolute; inset: 11% 16%; display: grid; place-items: center; transform: perspective(900px) rotateX(var(--lc-rx, 2deg)) rotateY(var(--lc-ry, -8deg)); transition: transform var(--dur-lc-slow) var(--ease-lc-out); }
.lc-specimen svg { width: 100%; max-width: 370px; overflow: visible; }
.lc-specimen__glass { fill: color-mix(in srgb, var(--color-lc-spectral) 42%, transparent); stroke: var(--color-lc-ink); stroke-width: 2; }
.lc-specimen__edge { fill: none; stroke: var(--color-lc-accent); stroke-width: 2; }
.lc-specimen__ray { fill: none; stroke: color-mix(in srgb, var(--color-lc-accent) 75%, transparent); stroke-width: 1.4; stroke-dasharray: 5 8; }
.lc-specimen__caption { position: absolute; left: 16px; bottom: 14px; }
.lc-specimen__readout { position: absolute; right: 16px; top: 14px; text-align: right; }
.lc-specimen__readout strong { display: block; margin-top: 3px; font-family: var(--font-lc-mono); font-size: 14px; font-weight: 400; }

.lc-section { padding: clamp(88px, 12vw, 170px) 0; position: relative; }
.lc-section--dark { background: var(--color-lc-ink); color: var(--color-lc-paper); }
.lc-section--dark .lc-muted { color: color-mix(in srgb, var(--color-lc-paper) 60%, transparent); }
.lc-section__intro { display: grid; grid-template-columns: minmax(0, .78fr) minmax(0, .6fr); gap: clamp(32px, 8vw, 140px); align-items: end; }
.lc-section h2 { max-width: 9ch; font-size: clamp(2.8rem, 6vw, 6rem); }
.lc-section__copy { max-width: 42ch; color: color-mix(in srgb, currentColor 66%, transparent); line-height: 1.7; }
.lc-tagline { min-height: 70vh; display: grid; place-items: center; text-align: center; }
.lc-tagline p { max-width: 13ch; font-family: var(--font-lc-display); font-size: clamp(3rem, 8vw, 8rem); font-weight: 600; letter-spacing: -.07em; line-height: .92; }
.lc-tagline p span { color: color-mix(in srgb, var(--color-lc-ink) 28%, transparent); transition: color var(--dur-lc-slow) var(--ease-lc-out); }
.lc-tagline p span[data-active="true"] { color: var(--color-lc-ink); }

.lc-principles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 60px; background: color-mix(in srgb, var(--color-lc-ink) 18%, transparent); }
.lc-principle { min-height: 240px; padding: 24px; background: var(--color-lc-paper); border: 1px solid transparent; transition: transform var(--dur-lc-base) var(--ease-lc-out), background var(--dur-lc-fast) var(--ease-lc-out); }
.lc-principle:hover { transform: translateY(-6px); background: color-mix(in srgb, var(--color-lc-spectral) 22%, var(--color-lc-paper)); }
.lc-principle__value { margin-top: 42px; font-family: var(--font-lc-display); font-size: clamp(2rem, 4vw, 3.8rem); letter-spacing: -.06em; }
.lc-principle p { margin-top: 12px; max-width: 23ch; color: color-mix(in srgb, var(--color-lc-ink) 63%, transparent); line-height: 1.55; }

.lc-bench { padding-bottom: 0; }
.lc-bench__stage { min-height: 280vh; margin-top: 72px; }
.lc-bench__sticky { position: sticky; top: 0; min-height: 100svh; display: grid; align-items: center; }
.lc-bench__grid { display: grid; grid-template-columns: minmax(0, .72fr) minmax(0, 1.28fr); gap: clamp(24px, 6vw, 92px); align-items: center; }
.lc-bench__steps { display: grid; gap: 18px; }
.lc-bench__step { display: grid; grid-template-columns: 38px 1fr; gap: 12px; align-items: start; padding: 14px 0; border-top: 1px solid color-mix(in srgb, var(--color-lc-ink) 14%, transparent); opacity: .42; transition: opacity var(--dur-lc-base) var(--ease-lc-out), transform var(--dur-lc-base) var(--ease-lc-out); }
.lc-bench__step[data-active="true"] { opacity: 1; transform: translateX(8px); }
.lc-bench__step b { color: var(--color-lc-accent); font-family: var(--font-lc-mono); font-size: 12px; font-weight: 400; }
.lc-bench__step strong { display: block; font-family: var(--font-lc-display); font-size: 20px; }
.lc-bench__step span { display: block; margin-top: 5px; color: color-mix(in srgb, var(--color-lc-ink) 59%, transparent); font-size: 13px; line-height: 1.45; }
.lc-bench__panel { position: relative; min-height: clamp(420px, 52vw, 650px); padding: clamp(18px, 3vw, 36px); border: 1px solid color-mix(in srgb, var(--color-lc-ink) 20%, transparent); background: color-mix(in srgb, var(--color-lc-spectral) 19%, var(--color-lc-paper)); }
.lc-bench__panel[data-phase="spectral"] { background: color-mix(in srgb, var(--color-lc-accent) 11%, var(--color-lc-paper)); }
.lc-bench__panel .lc-specimen { inset: 12% 20%; }
.lc-bench__hud { position: absolute; left: clamp(18px, 3vw, 36px); right: clamp(18px, 3vw, 36px); bottom: clamp(18px, 3vw, 36px); display: flex; justify-content: space-between; align-items: end; gap: 24px; }
.lc-bench__hud strong { display: block; margin-top: 6px; font-family: var(--font-lc-mono); font-size: clamp(1.2rem, 2vw, 1.8rem); font-weight: 400; }
.lc-bench__range { width: min(240px, 40vw); accent-color: var(--color-lc-accent); }
.lc-bench__phone { display: none; }

.lc-presets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 60px; }
.lc-preset { min-height: 220px; padding: 18px; border: 1px solid color-mix(in srgb, var(--color-lc-paper) 30%, transparent); background: transparent; color: inherit; text-align: left; cursor: pointer; transition: transform var(--dur-lc-base) var(--ease-lc-out), background var(--dur-lc-fast) var(--ease-lc-out); }
.lc-preset:hover, .lc-preset[data-active="true"] { transform: translateY(-6px); background: color-mix(in srgb, var(--color-lc-paper) 10%, transparent); }
.lc-preset__shape { display: grid; place-items: center; height: 110px; margin-bottom: 22px; }
.lc-preset__shape svg { width: 90px; height: 90px; }
.lc-preset__shape path { fill: color-mix(in srgb, var(--color-lc-spectral) 35%, transparent); stroke: var(--color-lc-paper); stroke-width: 1.5; }
.lc-preset p { margin-top: 8px; color: color-mix(in srgb, var(--color-lc-paper) 65%, transparent); font-size: 13px; line-height: 1.4; }

.lc-workflow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 62px; background: color-mix(in srgb, var(--color-lc-ink) 18%, transparent); }
.lc-workflow__item { min-height: 260px; padding: 24px; background: var(--color-lc-paper); }
.lc-workflow__number { color: var(--color-lc-accent); font-family: var(--font-lc-mono); }
.lc-workflow h3 { margin-top: 64px; font-size: clamp(1.8rem, 3vw, 3rem); }
.lc-workflow p { margin-top: 12px; max-width: 28ch; color: color-mix(in srgb, var(--color-lc-ink) 63%, transparent); line-height: 1.55; }

.lc-access { display: grid; grid-template-columns: .7fr 1.3fr; gap: clamp(28px, 8vw, 140px); align-items: start; }
.lc-access__card { padding: clamp(22px, 4vw, 42px); border: 1px solid color-mix(in srgb, var(--color-lc-ink) 18%, transparent); background: var(--color-lc-paper); }
.lc-field { display: grid; gap: 8px; margin-top: 18px; }
.lc-field label { font-family: var(--font-lc-mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
.lc-field input, .lc-field select { width: 100%; min-height: 46px; border: 1px solid color-mix(in srgb, var(--color-lc-ink) 25%, transparent); background: transparent; padding: 0 12px; color: var(--color-lc-ink); }
.lc-field input:focus, .lc-field select:focus { border-color: var(--color-lc-accent); outline: 0; box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-lc-accent) 17%, transparent); }
.lc-field small { color: color-mix(in srgb, var(--color-lc-ink) 74%, var(--color-lc-accent)); }
.lc-form-actions { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 24px; }
.lc-form-status { color: color-mix(in srgb, var(--color-lc-ink) 65%, transparent); font-size: 13px; }
.lc-success { display: grid; gap: 18px; min-height: 300px; align-content: center; }
.lc-success__stamp { display: inline-flex; width: fit-content; padding: 8px 10px; border: 1px solid var(--color-lc-accent); color: var(--color-lc-accent); font-family: var(--font-lc-mono); font-size: 10px; letter-spacing: .1em; }

.lc-notes { display: grid; grid-template-columns: 1.2fr .8fr; gap: clamp(28px, 8vw, 140px); }
.lc-notes__list { display: grid; gap: 0; }
.lc-note { padding: 20px 0; border-top: 1px solid color-mix(in srgb, var(--color-lc-paper) 22%, transparent); }
.lc-note summary { display: flex; justify-content: space-between; gap: 16px; cursor: pointer; list-style: none; font-family: var(--font-lc-display); font-size: clamp(1.2rem, 2.5vw, 2rem); }
.lc-note summary::-webkit-details-marker { display: none; }
.lc-note summary::after { content: "+"; color: var(--color-lc-accent); font-family: var(--font-lc-mono); font-size: 16px; }
.lc-note[open] summary::after { content: "−"; }
.lc-note p { max-width: 60ch; padding-top: 14px; color: color-mix(in srgb, var(--color-lc-paper) 64%, transparent); line-height: 1.65; }

.lc-footer { padding: 72px 0 28px; }
.lc-footer__top { display: flex; justify-content: space-between; gap: 24px; align-items: end; }
.lc-footer__links { display: flex; flex-wrap: wrap; gap: 18px; font-family: var(--font-lc-mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.lc-footer__links a:hover { color: var(--color-lc-accent); }
.lc-footer__bottom { display: flex; justify-content: space-between; gap: 16px; margin-top: 62px; padding-top: 14px; border-top: 1px solid color-mix(in srgb, var(--color-lc-ink) 17%, transparent); color: color-mix(in srgb, var(--color-lc-ink) 53%, transparent); }

[data-reveal] { opacity: 1; transform: none; }
@media (prefers-reduced-motion: no-preference) {
  [data-reveal="mask"] { opacity: 0; transform: translateY(var(--lc-shift)); transition: opacity var(--dur-lc-slow) var(--ease-lc-out), transform var(--dur-lc-slow) var(--ease-lc-out); }
  [data-reveal="mask"][data-in="true"] { opacity: 1; transform: none; }
  .lc-hero__field { animation: lc-field-in var(--dur-lc-hero) var(--ease-lc-expo) both; }
  .lc-hero__copy > * { animation: lc-hero-in var(--dur-lc-hero) var(--ease-lc-expo) both; }
  .lc-hero__copy > *:nth-child(1) { animation-delay: 120ms; } .lc-hero__copy > *:nth-child(2) { animation-delay: 260ms; } .lc-hero__copy > *:nth-child(3) { animation-delay: 420ms; } .lc-hero__copy > *:nth-child(4) { animation-delay: 560ms; } .lc-hero__copy > *:nth-child(5) { animation-delay: 720ms; }
  .lc-hero__visual { animation: lc-hero-in var(--dur-lc-hero) var(--ease-lc-expo) 420ms both; }
  .lc-specimen { animation: lc-specimen-breathe 5.5s ease-in-out 1.4s infinite alternate; }
  @keyframes lc-field-in { from { transform: scale(1.04); opacity: .35; } to { transform: none; opacity: 1; } }
  @keyframes lc-hero-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  @keyframes lc-specimen-breathe { from { translate: 0 0; } to { translate: 0 -8px; } }
}
@media (hover: hover) and (pointer: fine) { .lc-preset:hover { --lc-lift: -6px; } }
@media (max-width: 900px) {
  :root { --lc-gutter: 24px; }
  .lc-nav { display: none; }
  .lc-menu { display: inline-flex; padding: 8px; }
  .lc-header[data-menu="open"] .lc-nav { position: fixed; inset: 70px 18px auto; display: grid; gap: 20px; padding: 24px; border: 1px solid color-mix(in srgb, var(--color-lc-ink) 18%, transparent); background: var(--color-lc-paper); }
  .lc-hero__grid, .lc-section__intro, .lc-access, .lc-notes { grid-template-columns: 1fr; }
  .lc-hero__visual { order: -1; }
  .lc-hero { padding-top: 124px; }
  .lc-hero h1 { font-size: clamp(4rem, 16vw, 7rem); }
  .lc-principles, .lc-presets { grid-template-columns: repeat(2, 1fr); }
  .lc-bench__stage { min-height: 210vh; }
  .lc-bench__grid { grid-template-columns: 1fr; }
  .lc-bench__panel { min-height: 540px; }
  .lc-workflow { grid-template-columns: 1fr; }
}
@media (max-width: 580px) {
  :root { --lc-gutter: 16px; }
  .lc-header { inset: 10px 16px auto; }
  .lc-hero { padding-top: 100px; }
  .lc-hero__meta { gap: 14px; flex-wrap: wrap; }
  .lc-principles, .lc-presets { grid-template-columns: 1fr; }
  .lc-bench__stage { min-height: auto; }
  .lc-bench__sticky { position: relative; min-height: auto; }
  .lc-bench__grid { display: flex; flex-direction: column; }
  .lc-bench__steps { order: 2; width: 100%; }
  .lc-bench__panel { min-height: 420px; width: 100%; }
  .lc-bench__phone { display: block; margin-top: 24px; }
  .lc-bench__range { width: 100%; }
  .lc-bench__hud { position: relative; left: auto; right: auto; bottom: auto; display: grid; margin-top: 18px; }
  .lc-footer__top, .lc-footer__bottom, .lc-form-actions { align-items: flex-start; flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .lc-specimen { animation: none; }
  .lc-tagline p span { transition: none; }
  [data-reveal] { opacity: 1 !important; transform: none !important; clip-path: none !important; }
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F5F7FB", color: "#10141C", padding: 76, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
        <div style={{ width: 52, height: 52, display: "flex", background: "#10141C", color: "#F5F7FB", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>✦</div>
        LUCENTRA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1, fontWeight: 700, letterSpacing: -4 }}>Make light legible.</div>
        <div style={{ display: "flex", fontSize: 28, color: "#2E63FF" }}>A real-time material calibration studio.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 2, color: "#10141C" }}><span>BENCH / 04</span><span>IOR 1.52 · ROUGHNESS 0.18</span></div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/page.tsx">
<![CDATA[import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Tagline } from "./sections/Tagline";
import { Principles } from "./sections/Principles";
import { CalibrationBench } from "./bench/CalibrationBench";
import { Workflow } from "./sections/Workflow";
import { Access } from "./sections/Access";
import { FieldNotes } from "./sections/FieldNotes";
import { Footer } from "./sections/Footer";
import { ScrollProgress } from "./motion/ScrollProgress";
import { SmoothScroll } from "./motion/SmoothScroll";

export default function LucentraPage() {
  return <div className="lc-shell"><a className="lc-skip" href="#main">Skip to content</a><ScrollProgress /><SmoothScroll /><Header /><main id="main"><Hero /><Tagline /><Principles /><CalibrationBench /><Workflow /><Access /><FieldNotes /></main><Footer /></div>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/bench/CalibrationBench.tsx">
<![CDATA["use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BENCH_STOPS, benchReducer, benchSnapshot, PRESETS, type BenchState, type PresetId } from "./state";
import { sectionProgress } from "../motion/math";
import { Specimen } from "./Specimen";

const initial: BenchState = { progress: 0, preset: "quartz", active: 0 };

export function CalibrationBench() {
  const stage = useRef<HTMLElement>(null);
  const [state, setState] = useState(initial);
  const snapshot = useMemo(() => benchSnapshot(state.progress, state.preset), [state.progress, state.preset]);

  useEffect(() => {
    const node = stage.current;
    if (!node || window.matchMedia("(max-width: 580px), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const progress = sectionProgress(window.scrollY, window.scrollY + rect.top, node.offsetHeight, window.innerHeight);
      setState((current) => {
        const next = benchReducer(current, { type: "progress", value: progress });
        return next.active === current.active && Math.abs(next.progress - current.progress) < 0.006 ? current : next;
      });
      node.style.setProperty("--lc-bench-progress", String(progress));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="lc-section lc-bench" id="bench" ref={stage} aria-labelledby="bench-title">
      <div className="lc-container">
        <div className="lc-section__intro"><div><p className="lc-mono lc-kicker">03 / Calibration bench</p><h2 id="bench-title">One specimen. Four decisions.</h2></div><p className="lc-section__copy">Scroll the bench to move the same material from a clean sample to a ready brief. The readout stays attached to the object, so a visual choice always has a measurable reason.</p></div>
        <div className="lc-bench__stage">
          <div className="lc-bench__sticky">
            <div className="lc-bench__grid">
              <div className="lc-bench__steps" aria-live="polite">
                {BENCH_STOPS.map((stop, index) => <div className="lc-bench__step" data-active={state.active === index} key={stop.label}><b>0{index + 1}</b><div><strong>{stop.title}</strong><span>{stop.description}</span></div></div>)}
                <label className="lc-bench__phone lc-mono" htmlFor="bench-range">Scrub the sample<input id="bench-range" className="lc-bench__range" type="range" min="0" max="1" step="0.01" value={state.progress} onChange={(event) => setState((current) => benchReducer(current, { type: "progress", value: Number(event.target.value) }))} /></label>
              </div>
              <div className="lc-bench__panel" data-phase={snapshot.label}>
                <div className="lc-mono">LIVE / {snapshot.label}</div>
                <Specimen snapshot={snapshot} />
                <div className="lc-bench__hud"><div><span className="lc-mono">Material state</span><strong>{snapshot.label}</strong></div><div><span className="lc-mono">IOR · roughness · dispersion</span><strong>{snapshot.ior.toFixed(2)} · {snapshot.roughness.toFixed(2)} · {snapshot.dispersion.toFixed(2)}</strong></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="lc-rule" aria-hidden="true" />
        <div className="lc-mono" style={{ marginTop: 14 }}>bench progress {Math.round(state.progress * 100)}% · transmission {(snapshot.transmission * 100).toFixed(0)}%</div>
      </div>
      <div className="lc-container" style={{ marginTop: 84 }}><p className="lc-mono">Choose a starting surface</p><div className="lc-presets lc-presets--light">{Object.entries(PRESETS).map(([id, preset]) => <button type="button" className="lc-preset" data-active={state.preset === id} key={id} onClick={() => setState((current) => benchReducer(current, { type: "preset", id }))}><span className="lc-mono">{preset.name}</span><div className="lc-preset__shape"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M20 28 56 14 82 34 65 78 30 70 12 48Z" /></svg></div><p>{preset.note}</p></button>)}</div></div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/bench/Specimen.tsx">
<![CDATA[import type { BenchStop } from "./state";

export function Specimen({ snapshot, compact = false }: { snapshot: BenchStop; compact?: boolean }) {
  const spectral = snapshot.label === "spectral" || snapshot.label === "ready";
  return (
    <div className={`lc-specimen ${compact ? "lc-specimen--compact" : ""}`} data-label={snapshot.label}>
      <svg viewBox="0 0 360 360" aria-label={`Lucentra specimen: ${snapshot.label}`} role="img">
        <path className="lc-specimen__ray" d="M32 280 120 186M64 312 162 190M306 64 218 158M336 98 238 172" />
        {spectral && <><path className="lc-specimen__ray" stroke="#2E63FF" d="M34 252 146 154" /><path className="lc-specimen__ray" stroke="#C5D4FF" d="M44 278 156 180" /></>}
        <path className="lc-specimen__glass" d="M92 92 214 48 286 112 224 286 106 250 72 166Z" />
        <path className="lc-specimen__edge" d="M92 92 194 142 286 112M194 142 224 286M194 142 106 250M72 166 194 142" />
        <path className="lc-specimen__edge" opacity={snapshot.roughness < 0.25 ? 1 : .45} d="M118 104 178 82 240 124 202 230 132 212Z" />
        {spectral && <g className="lc-specimen__spectrum"><path d="M108 116 122 104 224 142 214 156Z" fill="#2E63FF" opacity=".8"/><path d="M116 132 130 120 232 158 222 172Z" fill="#C5D4FF" opacity=".9"/><path d="M124 148 138 136 240 174 230 188Z" fill="#10141C" opacity=".3"/></g>}
      </svg>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/bench/state.ts">
<![CDATA[export type PresetId = "quartz" | "milk" | "blue-hour" | "edge";

export type BenchStop = {
  progress: number;
  label: "clear" | "tuned" | "spectral" | "ready";
  title: string;
  description: string;
  ior: number;
  roughness: number;
  dispersion: number;
  transmission: number;
};

export const BENCH_STOPS: BenchStop[] = [
  { progress: 0, label: "clear", title: "Start with the sample", description: "A clean slab with no assumptions baked in.", ior: 1.33, roughness: 0.42, dispersion: 0.08, transmission: 0.62 },
  { progress: 0.33, label: "tuned", title: "Tune the edge", description: "Hold the highlight long enough to read the silhouette.", ior: 1.46, roughness: 0.24, dispersion: 0.19, transmission: 0.74 },
  { progress: 0.66, label: "spectral", title: "Split the light", description: "A measured band appears at the cut, then settles.", ior: 1.52, roughness: 0.18, dispersion: 0.42, transmission: 0.81 },
  { progress: 1, label: "ready", title: "Leave a clear brief", description: "The material can travel from the bench to the build.", ior: 1.52, roughness: 0.18, dispersion: 0.42, transmission: 0.81 },
];

export const PRESETS: Record<PresetId, { name: string; note: string; bias: number }> = {
  quartz: { name: "Quartz 01", note: "neutral edge and measured dispersion", bias: 0 },
  milk: { name: "Studio Milk", note: "soft transmission for panels", bias: -0.06 },
  "blue-hour": { name: "Blue Hour", note: "cool tint with a longer highlight", bias: 0.08 },
  edge: { name: "Edge Study", note: "tight roughness, crisp silhouette", bias: 0.14 },
};

export type BenchState = { progress: number; preset: PresetId; active: number };
export type BenchAction = { type: "progress"; value: number } | { type: "preset"; id: string };

export function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }

export function sampleAt(progress: number): BenchStop {
  const p = clamp01(progress);
  if (p <= BENCH_STOPS[0].progress) return { ...BENCH_STOPS[0], progress: p };
  for (let i = 1; i < BENCH_STOPS.length; i += 1) {
    const next = BENCH_STOPS[i];
    const previous = BENCH_STOPS[i - 1];
    if (p <= next.progress) {
      const t = (p - previous.progress) / (next.progress - previous.progress);
      const mix = (a: number, b: number) => a + (b - a) * t;
      return { ...next, progress: p, ior: mix(previous.ior, next.ior), roughness: mix(previous.roughness, next.roughness), dispersion: mix(previous.dispersion, next.dispersion), transmission: mix(previous.transmission, next.transmission) };
    }
  }
  return { ...BENCH_STOPS[BENCH_STOPS.length - 1] };
}

export function benchSnapshot(progress: number, preset: PresetId): BenchStop {
  const base = sampleAt(progress);
  const bias = PRESETS[preset]?.bias ?? 0;
  return { ...base, ior: Number((base.ior + bias * 0.08).toFixed(2)), roughness: Number(clamp01(base.roughness - bias * 0.3).toFixed(2)), dispersion: Number(clamp01(base.dispersion + bias * 0.35).toFixed(2)) };
}

export function benchReducer(state: BenchState, action: BenchAction): BenchState {
  if (action.type === "progress") {
    const progress = clamp01(action.value);
    return { ...state, progress, active: Math.min(BENCH_STOPS.length - 1, Math.round(progress * (BENCH_STOPS.length - 1))) };
  }
  if (!(action.id in PRESETS)) return state;
  return { ...state, preset: action.id as PresetId };
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`lc-logo ${className}`} aria-label="Lucentra">
      <svg className="lc-logo__mark" viewBox="0 0 48 48" aria-hidden="true"><rect x="2" y="2" width="44" height="44" rx="7" /><path d="M12 15 24 9 35 17 22 37 12 30 12 15Z" /><path className="lc-logo__signal" d="M24 9 22 37M12 15 35 17" /></svg>
      {!compact && <span className="lc-logo__word">LUCENTRA</span>}
    </span>
  );
}

export function LogoLockup() {
  return <Logo />;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/forms/BriefForm.tsx">
<![CDATA["use client";

import { FormEvent, useState } from "react";
import { validateBrief, type BriefInput, type BriefErrors } from "./validate";

const initial: BriefInput = { name: "", email: "", surface: "quartz" };

export function BriefForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const update = (key: keyof BriefInput, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateBrief(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    setState("loading");
    window.setTimeout(() => setState("success"), 520);
  };

  if (state === "success") return <div className="lc-success" aria-live="polite"><span className="lc-success__stamp">BRIEF RECEIVED / 04</span><h3>Your bench is held.</h3><p className="lc-muted">We saved a local preview for {values.name}. The next step is a measured material conversation.</p><button type="button" className="lc-btn lc-btn--ghost" onClick={() => { setState("idle"); setValues(initial); }}>Start another brief</button></div>;

  return <form onSubmit={submit} noValidate>
    <div className="lc-field"><label htmlFor="lc-name">Name</label><input id="lc-name" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lc-name-error" : undefined} />{errors.name && <small id="lc-name-error">{errors.name}</small>}</div>
    <div className="lc-field"><label htmlFor="lc-email">Work email</label><input id="lc-email" name="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "lc-email-error" : undefined} />{errors.email && <small id="lc-email-error">{errors.email}</small>}</div>
    <div className="lc-field"><label htmlFor="lc-surface">Starting surface</label><select id="lc-surface" name="surface" value={values.surface} onChange={(event) => update("surface", event.target.value)} aria-invalid={Boolean(errors.surface)}><option value="quartz">Quartz 01</option><option value="milk">Studio Milk</option><option value="blue-hour">Blue Hour</option><option value="edge">Edge Study</option></select>{errors.surface && <small>{errors.surface}</small>}</div>
    <div className="lc-form-actions"><span className="lc-form-status">Local demo · no request is sent</span><button className="lc-btn lc-btn--solid" type="submit" disabled={state === "loading"}>{state === "loading" ? "Holding…" : "Hold a bench"}</button></div>
  </form>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/forms/validate.ts">
<![CDATA[export type BriefInput = { name: string; email: string; surface: string };
export type BriefErrors = Partial<Record<keyof BriefInput, string>>;
const surfaces = new Set(["quartz", "milk", "blue-hour", "edge"]);

export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};
  if (!input.name.trim()) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Use a work email format.";
  if (!surfaces.has(input.surface)) errors.surface = "Choose a starting surface.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/motion/math.ts">
<![CDATA[export function clamp01(value: number): number { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); }
export function lerp(a: number, b: number, t: number): number { return a + (b - a) * clamp01(t); }
export function sectionProgress(scrollY: number, top: number, height: number, viewport: number): number {
  const span = Math.max(1, height - viewport);
  return clamp01((scrollY - top) / span);
}
export function stagger(index: number, step: number, max = 600): number { return Math.min(max, Math.max(0, index) * step); }
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/motion/Reveal.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", kind = "mask" }: { children: React.ReactNode; className?: string; kind?: "mask" | "line" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.in = "true"; observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className} data-reveal={kind}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/motion/ScrollProgress.tsx">
<![CDATA["use client";

import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--lc-progress", String(Math.min(1, window.scrollY / max)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return <div className="lc-progress" aria-hidden="true" />;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/motion/SmoothScroll.tsx">
<![CDATA["use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduce || touch) return;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Access.tsx">
<![CDATA[import { BriefForm } from "../forms/BriefForm";

export function Access() {
  return <section className="lc-section lc-section--dark" id="access" aria-labelledby="access-title"><div className="lc-container lc-access"><div><p className="lc-mono lc-kicker">06 / Access</p><h2 id="access-title">Hold a bench for your next surface.</h2><p className="lc-section__copy" style={{ marginTop: 24 }}>A local demo brief is enough to begin. Choose a starting surface and Lucentra will keep the first readout close.</p><div className="lc-mono" style={{ marginTop: 38 }}>ACCESS / STUDIO PLAN · 18 USD / MONTH · LOCAL DEMO</div></div><div className="lc-access__card"><BriefForm /></div></div></section>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/FieldNotes.tsx">
<![CDATA[const notes = [{ term: "Iridescence", copy: "A thin film changes the reflected wavelength as the viewing angle moves. In the bench, it is the first hint that a clear surface can carry color without becoming loud." }, { term: "Index of refraction", copy: "The ratio between light in a vacuum and light in the medium. Lucentra uses it to keep the bevel and the readout tied together." }, { term: "Dispersion", copy: "Wavelength-dependent refraction separates a white ray into spectral bands across the cut." }, { term: "Transmission", copy: "Diffuse and specular transmission share the work: one carries light through, one keeps the object legible." }, { term: "Roughness", copy: "Microfacet variance decides where a highlight holds, breaks, or disappears." }];

export function FieldNotes() {
  return <section className="lc-section lc-section--dark" id="notes" aria-labelledby="notes-title"><div className="lc-container lc-notes"><div><p className="lc-mono lc-kicker">07 / Field notes</p><h2 id="notes-title">Real-time glass, in five terms.</h2></div><div className="lc-notes__list">{notes.map((note) => <details className="lc-note" key={note.term}><summary>{note.term}</summary><p>{note.copy}</p></details>)}</div></div></section>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="lc-footer"><div className="lc-container"><div className="lc-footer__top"><Logo /><nav className="lc-footer__links" aria-label="Footer"><a href="#bench">Bench</a><a href="#materials">Materials</a><a href="#notes">Notes</a><a href="#access">Access</a><a href="#notes">Privacy</a><a href="#notes">Terms</a></nav></div><div className="lc-footer__bottom"><span className="lc-mono">© 2026 Lucentra Lab</span><span className="lc-mono">Make light legible.</span><a className="lc-mono" href="#top">Back to top ↑</a></div></div></footer>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Header.tsx">
<![CDATA["use client";

import { useEffect, useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 36); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const links = [["Bench", "#bench"], ["Materials", "#materials"], ["Notes", "#notes"], ["Access", "#access"]];
  return <header className="lc-header" data-menu={open ? "open" : "closed"} data-scrolled={scrolled}>
    <a href="#top" aria-label="Lucentra home"><Logo /></a>
    <nav className="lc-nav" aria-label="Primary">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <button className="lc-menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span className="lc-mono">{open ? "Close" : "Menu"}</span></button>
  </header>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Hero.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { Specimen } from "../bench/Specimen";
import { benchSnapshot } from "../bench/state";

export function Hero() {
  return <section className="lc-hero" id="top" aria-labelledby="hero-title">
    <div className="lc-hero__field" aria-hidden="true" />
    <div className="lc-container lc-hero__grid">
      <div className="lc-hero__copy"><p className="lc-mono lc-kicker">Real-time material studio</p><h1 id="hero-title">Tune the surface.</h1><p className="lc-hero__lede">A browser bench for teams who need transmission, dispersion, and refraction to behave before the handoff.</p><div className="lc-actions"><a className="lc-btn lc-btn--solid" href="#bench">Open the bench</a><a className="lc-btn lc-btn--ghost" href="#notes">Read the field notes <span aria-hidden="true">↗</span></a></div><div className="lc-hero__meta"><div><span className="lc-mono">BENCH</span><strong>04 / QUARTZ</strong></div><div><span className="lc-mono">READY IN</span><strong>12 MINUTES</strong></div><div><span className="lc-mono">FORMAT</span><strong>LIVE + SPEC</strong></div></div></div>
      <div className="lc-hero__visual lc-specimen-frame"><div className="lc-specimen-frame__top lc-mono">LUCENTRA / MATERIAL CALIBRATION</div><Specimen snapshot={benchSnapshot(0, "quartz")} /><div className="lc-specimen__readout lc-mono">IOR<strong>1.33</strong></div><div className="lc-specimen__caption lc-mono">CLEAR / SAMPLE 01</div></div>
    </div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Principles.tsx">
<![CDATA[const items = [{ value: "1.52", label: "Index of refraction", copy: "The ratio that bends a ray through a surface." }, { value: "0.18", label: "Roughness", copy: "Microfacet variance that decides how a highlight settles." }, { value: "0.42", label: "Dispersion", copy: "The amount of separation the cut can hold." }, { value: "81%", label: "Transmission", copy: "The readable light that survives the slab." }];

export function Principles() {
  return <section className="lc-section" id="materials" aria-labelledby="principles-title"><div className="lc-container"><div className="lc-section__intro"><div><p className="lc-mono lc-kicker">02 / Material language</p><h2 id="principles-title">A surface is a set of decisions.</h2></div><p className="lc-section__copy">Lucentra gives each optical property a place in the conversation. The numbers stay small, the effect stays visible, and the material brief stays clear enough to hand off.</p></div><div className="lc-principles">{items.map((item, index) => <article className="lc-principle" data-reveal="mask" key={item.label} style={{ "--i": index } as React.CSSProperties}><span className="lc-mono">0{index + 1}</span><div className="lc-principle__value">{item.value}</div><h3>{item.label}</h3><p>{item.copy}</p></article>)}</div></div></section>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Tagline.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";

export function Tagline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { node?.querySelectorAll("span").forEach((span) => { span.dataset.active = "true"; }); return; } const spans = [...node.querySelectorAll("span")]; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; spans.forEach((span, index) => window.setTimeout(() => { span.dataset.active = "true"; }, index * 90)); observer.disconnect(); }, { threshold: .6 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <section className="lc-section lc-tagline" ref={ref} aria-label="Lucentra motto"><p>{"Make light legible. Before the handoff.".split(" ").map((word, index) => <span key={`${word}-${index}`}>{word} </span>)}</p></section>;
}
]]>
    </file>
    <file path="src/app/(lucentra)/lucentra/sections/Workflow.tsx">
<![CDATA[const steps = [{ n: "01", title: "Sample", copy: "Bring a reference surface, a rough sketch, or the one edge that still feels wrong." }, { n: "02", title: "Tune", copy: "Move the controls together and watch the same specimen keep its identity." }, { n: "03", title: "Brief", copy: "Leave with values, a named state, and language the build team can use." }];

export function Workflow() {
  return <section className="lc-section" id="workflow" aria-labelledby="workflow-title"><div className="lc-container"><div className="lc-section__intro"><div><p className="lc-mono lc-kicker">05 / Studio rhythm</p><h2 id="workflow-title">A short path to a clear surface.</h2></div><p className="lc-section__copy">The bench is designed for the moment before implementation, when a team needs to agree on what “right” looks like.</p></div><div className="lc-workflow">{steps.map((step) => <article className="lc-workflow__item" key={step.n}><span className="lc-workflow__number lc-mono">{step.n}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></div></section>;
}
]]>
    </file>
  </files>
</template>
