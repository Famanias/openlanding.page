<template slug="aftercart" name="AFTERCART">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(aftercart)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Manrope } from "next/font/google";
import "./aftercart/aftercart.css";

const display = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-aftercart-display",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-aftercart-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-aftercart-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "AFTERCART — Shopify care after launch",
  description: "A living care console for small Shopify shops that want a store ready for the next customer.",
  icons: { icon: "/templates/aftercart/icon.svg" },
};

export default function AftercartLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} overflow-x-clip`}>
      <body className="aftercart-body overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript>
          <style>{`[data-ac-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/aftercart.css">
<![CDATA[/* Hallmark · v2.0.0 · built: the project · redesign: full · scope: page · genre: editorial · theme: Aftercart system (locked DESIGN.md) · shape: editorial workbench · hero: Stage (/aftercart) · nav: edge-aligned · footer: colophon · signature: store health console */
/* critique: the previous page used one repeated stack; this pass makes the console the lead instrument, uses hairline rows for the evidence, and reserves cards for the care tracks. */
/* Hallmark · waive 24b · clamp-based spacing is the responsive rhythm · the 12-column workbench keeps its proportions across viewport widths */
/* Hallmark · waive 39b · multi-line care track rows need their reading measure · each row keeps a full 44px hit target while preserving the detail copy */
/* Hallmark · waive 44c · the stage uses a tall console and a short copy column · the console is centered against the full copy block rather than the headline baseline */
@import "tailwindcss";

@theme {
  --color-ac-ink: #4C4668;
  --color-ac-paper: #FFF7F3;
  --color-ac-lilac: #DCCFF4;
  --color-ac-mint: #BFE7D3;
  --color-ac-peach: #FFCCB8;
  --color-ac-butter: #F5E8A7;
  --color-ac-sky: #BFD8F0;
  --font-ac-display: var(--font-aftercart-display), ui-sans-serif, system-ui, sans-serif;
  --font-ac-body: var(--font-aftercart-body), ui-sans-serif, system-ui, sans-serif;
  --font-ac-mono: var(--font-aftercart-mono), ui-monospace, SFMono-Regular, monospace;
  --ease-ac-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-ac-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-ac-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-ac-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-ac-instant: 90ms;
  --dur-ac-fast: 180ms;
  --dur-ac-base: 420ms;
  --dur-ac-slow: 800ms;
  --dur-ac-hero: 1200ms;
}

:root {
  --ac-container: 1320px;
  --ac-gutter: clamp(20px, 4vw, 64px);
  --ac-radius-sm: 8px;
  --ac-radius-md: 14px;
  --ac-radius-lg: 20px;
  --ac-progress: 0;
  --ac-scroll-y: 0px;
  --ac-reveal-shift: 28px;
  --ac-stagger: 70ms;
  --ac-column-gap: clamp(32px, 5vw, 72px);
  --ac-rule: color-mix(in srgb, var(--color-ac-ink) 22%, transparent);
  --ac-muted: color-mix(in srgb, var(--color-ac-ink) 68%, transparent);
  --ac-focus: var(--color-ac-ink);
}

* { box-sizing: border-box; }
html {
  min-width: 320px;
  overflow-x: clip;
  scroll-behavior: smooth;
  scroll-padding-top: 76px;
  scrollbar-color: var(--color-ac-ink) var(--color-ac-paper);
}
body.aftercart-body {
  min-width: 320px;
  margin: 0;
  overflow-x: clip;
  background: var(--color-ac-paper);
  color: var(--color-ac-ink);
  font-family: var(--font-ac-body);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
button, input, select { font: inherit; }
button { cursor: pointer; }
a { color: inherit; }
input { caret-color: var(--color-ac-ink); }
::selection { background: var(--color-ac-ink); color: var(--color-ac-paper); }
[hidden] { display: none !important; }

.ac-shell {
  position: relative;
  overflow: clip;
  background-color: var(--color-ac-paper);
}
.ac-shell::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: "";
  pointer-events: none;
  background-image: radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-ac-ink) 13%, transparent) 1px, transparent 1.2px);
  background-size: 22px 22px;
  opacity: .48;
}
.ac-shell > * { position: relative; z-index: 1; }
.ac-container {
  width: min(var(--ac-container), calc(100% - (var(--ac-gutter) * 2)));
  margin-inline: auto;
}
.ac-skip {
  position: fixed;
  top: -80px;
  left: var(--ac-gutter);
  z-index: 50;
  padding: 10px 14px;
  border-radius: var(--ac-radius-sm);
  background: var(--color-ac-ink);
  color: var(--color-ac-paper);
  font-size: 13px;
  text-decoration: none;
}
.ac-skip:focus-visible { top: 14px; outline: 3px solid var(--ac-focus); outline-offset: 3px; }
.ac-progress {
  position: fixed;
  inset: 0 auto auto 0;
  z-index: 60;
  width: 100%;
  height: 3px;
  background: var(--color-ac-mint);
  transform: scaleX(var(--ac-progress));
  transform-origin: left;
  pointer-events: none;
}

.ac-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid var(--ac-rule);
  background: color-mix(in srgb, var(--color-ac-paper) 91%, transparent);
  backdrop-filter: blur(14px);
}
.ac-header-inner {
  min-height: 74px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: var(--ac-column-gap);
}
.ac-header-logo { display: inline-flex; align-items: center; text-decoration: none; }
.ac-logo { display: inline-flex; align-items: center; gap: 10px; color: var(--color-ac-ink); }
.ac-logo-mark { display: block; flex: 0 0 auto; }
.ac-logo-word { font: 800 17px/1 var(--font-ac-display); letter-spacing: -.06em; }
.ac-logo-word span { color: var(--color-ac-mint); }
.ac-header-nav { display: flex; align-items: center; justify-content: center; gap: clamp(18px, 2.5vw, 38px); font-size: 14px; }
.ac-header-nav a {
  position: relative;
  padding: 8px 0;
  text-decoration: none;
}
.ac-header-nav a::after {
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  height: 2px;
  content: "";
  background: var(--color-ac-ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-ac-base) var(--ease-ac-out);
}
.ac-header-nav a:hover::after, .ac-header-nav a:focus-visible::after { transform: scaleX(1); }
.ac-header-note { color: var(--ac-muted); font-size: 13px; text-align: right; }
.ac-mobile-menu {
  display: none;
  min-height: 44px;
  padding: 0 13px;
  border: 1px solid var(--ac-rule);
  border-radius: var(--ac-radius-sm);
  background: transparent;
  color: var(--color-ac-ink);
  font-size: 13px;
}
.ac-mobile-panel { display: none; }
.ac-header-logo:focus-visible,
.ac-header-nav a:focus-visible,
.ac-mobile-menu:focus-visible,
.ac-mobile-panel a:focus-visible,
.ac-button:focus-visible,
.ac-console-track:focus-visible,
.ac-faq summary:focus-visible,
.ac-input:focus-visible,
.ac-focus-option input:focus-visible + label {
  outline: 3px solid var(--ac-focus);
  outline-offset: 3px;
}

.ac-button {
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 20px;
  overflow: clip;
  isolation: isolate;
  border: 1px solid var(--color-ac-ink);
  border-radius: var(--ac-radius-sm);
  background: var(--color-ac-ink);
  color: var(--color-ac-paper);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: transform var(--dur-ac-instant) var(--ease-ac-spring), color var(--dur-ac-fast) var(--ease-ac-out);
}
.ac-button::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background: var(--color-ac-mint);
  transform: translateX(-101%);
  transition: transform var(--dur-ac-base) var(--ease-ac-out);
}
.ac-button:hover::before, .ac-button:focus-visible::before { transform: translateX(0); }
.ac-button:hover, .ac-button:focus-visible { color: var(--color-ac-ink); }
.ac-button:active { transform: scale(.97); }
.ac-button:disabled { cursor: not-allowed; opacity: .54; transform: none; }
.ac-button--quiet { border-color: var(--ac-rule); background: transparent; color: var(--color-ac-ink); }
.ac-button--quiet::before { display: none; }

.ac-hero {
  min-height: min(840px, calc(100svh - 74px));
  display: grid;
  align-items: center;
  padding: clamp(72px, 8vw, 126px) 0 clamp(80px, 9vw, 136px);
  border-bottom: 1px solid var(--ac-rule);
}
.ac-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  align-items: center;
  gap: var(--ac-column-gap);
  transform: translateY(10px);
}
.ac-hero-copy { position: relative; max-width: 600px; padding-left: clamp(0px, 1.8vw, 28px); }
.ac-hero-copy::before {
  position: absolute;
  top: 3px;
  bottom: 0;
  left: 0;
  width: 1px;
  content: "";
  background: var(--color-ac-ink);
  opacity: .22;
}
.ac-section-note {
  margin: 0;
  color: var(--ac-muted);
  font-size: 14px;
  line-height: 1.35;
}
.ac-hero h1 {
  max-width: 10ch;
  margin: 24px 0 0;
  overflow-wrap: break-word;
  min-width: 0;
  font: 800 clamp(4rem, 7vw, 7rem)/.87 var(--font-ac-display);
  letter-spacing: -.075em;
}
.ac-hero h1,
.ac-console-readout h2,
.ac-section-head h2,
.ac-care-card h3,
.ac-log-title,
.ac-rhythm-step h3,
.ac-booking h2,
.ac-success h3,
.ac-faq h2 { text-wrap: balance; }
.ac-hero h1 em { font-style: normal; }
.ac-hero-lead {
  max-width: 39ch;
  margin: 30px 0 0;
  color: var(--ac-muted);
  font-size: clamp(17px, 1.55vw, 21px);
  line-height: 1.45;
}
.ac-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 34px; }
.ac-hero-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin-top: 46px;
  border-top: 1px solid var(--ac-rule);
  color: var(--ac-muted);
  font-size: 13px;
}
.ac-hero-meta span { min-height: 46px; display: flex; align-items: center; padding: 10px 12px 0 0; border-right: 1px solid var(--ac-rule); }
.ac-hero-meta span + span { padding-left: 12px; }
.ac-hero-meta span:last-child { border-right: 0; }
.ac-hero-console { position: relative; min-width: 0; transform: translateY(calc(var(--ac-scroll-y) * -.012)); }
.ac-hero-console::before {
  position: absolute;
  inset: -24px -24px 24px 24px;
  content: "";
  border: 1px solid color-mix(in srgb, var(--color-ac-ink) 18%, transparent);
  border-radius: var(--ac-radius-lg);
  background: var(--color-ac-lilac);
  transform: rotate(1.3deg);
}
.ac-console {
  position: relative;
  padding: clamp(22px, 3vw, 32px);
  border: 1px solid color-mix(in srgb, var(--color-ac-ink) 30%, transparent);
  border-radius: var(--ac-radius-lg);
  background: color-mix(in srgb, var(--color-ac-paper) 88%, var(--color-ac-lilac));
  box-shadow: 18px 20px 0 color-mix(in srgb, var(--color-ac-lilac) 76%, transparent);
}
.ac-console-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; padding-bottom: 18px; border-bottom: 1px solid var(--ac-rule); }
.ac-console-top strong { display: block; font: 700 18px var(--font-ac-display); }
.ac-console-top small { display: block; margin-top: 5px; color: var(--ac-muted); font-size: 12px; }
.ac-console-case { color: var(--ac-muted); font-size: 12px; text-align: right; }
.ac-console-main { display: grid; grid-template-columns: minmax(160px, 195px) minmax(0, 1fr); gap: clamp(22px, 4vw, 42px); align-items: center; padding: 38px 0 32px; }
.ac-ring {
  --ac-score: 78;
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 190px);
  aspect-ratio: 1;
  margin-inline: auto;
  border-radius: 50%;
  background: conic-gradient(var(--color-ac-mint) calc(var(--ac-score) * 1%), color-mix(in srgb, var(--color-ac-ink) 12%, transparent) 0);
  transform: rotate(-28deg);
}
.ac-ring::before { position: absolute; inset: 13px; content: ""; border-radius: inherit; background: var(--color-ac-paper); }
.ac-ring-copy { position: relative; z-index: 1; display: grid; gap: 4px; text-align: center; transform: rotate(28deg); }
.ac-ring-copy strong { font: 800 clamp(3rem, 5vw, 4.3rem)/.9 var(--font-ac-display); letter-spacing: -.07em; }
.ac-ring-copy span { color: var(--ac-muted); font-size: 12px; }
.ac-console-readout { min-width: 0; }
.ac-readout-label { color: var(--ac-muted); font-size: 13px; }
.ac-console-readout h2 { max-width: 12ch; margin: 10px 0 0; overflow-wrap: break-word; min-width: 0; font: 700 clamp(2rem, 3.5vw, 3.8rem)/.93 var(--font-ac-display); letter-spacing: -.065em; }
.ac-console-readout p { margin: 14px 0 0; color: var(--ac-muted); font-size: 15px; line-height: 1.45; }
.ac-console-foot { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 22px; align-items: end; padding-top: 20px; border-top: 1px solid var(--ac-rule); }
.ac-signal-row { display: grid; gap: 10px; }
.ac-signal { display: grid; grid-template-columns: 84px minmax(0, 1fr) 28px; gap: 10px; align-items: center; color: var(--ac-muted); font-size: 12px; }
.ac-signal i { display: block; height: 8px; overflow: clip; border-radius: 99px; background: color-mix(in srgb, var(--color-ac-ink) 12%, transparent); }
.ac-signal i::after { display: block; width: 100%; height: 100%; content: ""; border-radius: inherit; background: var(--color-ac-peach); transform: scaleX(var(--ac-level)); transform-origin: left; transition: transform var(--dur-ac-slow) var(--ease-ac-out); }
.ac-signal:nth-child(2) i::after { background: var(--color-ac-lilac); }
.ac-signal:nth-child(3) i::after { background: var(--color-ac-sky); }
.ac-signal:nth-child(4) i::after { background: var(--color-ac-butter); }
.ac-signal b { color: var(--color-ac-ink); font-weight: 700; font-variant-numeric: tabular-nums; text-align: right; }
.ac-console-timestamp { align-self: end; margin: 0; color: var(--ac-muted); font-size: 12px; text-align: right; }
.ac-console-timestamp strong { display: block; margin-top: 4px; color: var(--color-ac-ink); font-weight: 700; }

.ac-section { padding: clamp(112px, 12vw, 176px) 0; }
.ac-section--ink { position: relative; background: var(--color-ac-ink); color: var(--color-ac-paper); }
.ac-section--ink::before { position: absolute; inset: 0; content: ""; background-image: linear-gradient(90deg, color-mix(in srgb, var(--color-ac-paper) 7%, transparent) 1px, transparent 1px); background-size: calc((100% - (var(--ac-gutter) * 2)) / 12) 100%; opacity: .22; pointer-events: none; }
.ac-section-head { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: var(--ac-column-gap); align-items: start; padding-bottom: 32px; border-bottom: 1px solid var(--ac-rule); }
.ac-section-head > div { min-width: 0; }
.ac-section-head h2 { max-width: 11ch; margin: 0; overflow-wrap: break-word; min-width: 0; font: 800 clamp(3.1rem, 5.8vw, 6.2rem)/.9 var(--font-ac-display); letter-spacing: -.08em; }
.ac-section-head > div > p { max-width: 43ch; margin: 18px 0 0; color: var(--ac-muted); font-size: 18px; line-height: 1.45; }
.ac-section--ink .ac-section-note { color: color-mix(in srgb, var(--color-ac-paper) 72%, transparent); }
.ac-section--ink .ac-section-head { border-color: color-mix(in srgb, var(--color-ac-paper) 25%, transparent); }
.ac-section--ink .ac-section-head > div > p { color: color-mix(in srgb, var(--color-ac-paper) 70%, transparent); }

.ac-health-section { padding-top: clamp(96px, 10vw, 144px); }
.ac-health-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: var(--ac-column-gap); align-items: stretch; margin-top: 56px; }
.ac-track-list { display: grid; align-content: start; border-top: 1px solid var(--ac-rule); }
.ac-console-track { position: relative; display: grid; grid-template-columns: 48px minmax(0, 1fr) 44px; gap: 16px; align-items: center; min-height: 102px; padding: 17px 0; border: 0; border-bottom: 1px solid var(--ac-rule); background: transparent; color: var(--color-ac-ink); text-align: left; transition: transform var(--dur-ac-base) var(--ease-ac-out), opacity var(--dur-ac-base) var(--ease-ac-out); }
.ac-console-track::before { position: absolute; top: 18px; bottom: 18px; left: -1px; width: 4px; content: ""; background: var(--color-ac-mint); transform: scaleY(0); transform-origin: center; transition: transform var(--dur-ac-base) var(--ease-ac-out); }
.ac-console-track:hover { transform: translateX(8px); }
.ac-console-track[data-active="true"] { transform: translateX(8px); }
.ac-console-track[data-active="true"]::before { transform: scaleY(1); }
.ac-console-track:nth-of-type(2)::before { background: var(--color-ac-lilac); }
.ac-console-track:nth-of-type(3)::before { background: var(--color-ac-sky); }
.ac-console-track:nth-of-type(4)::before { background: var(--color-ac-butter); }
.ac-track-index { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--ac-rule); border-radius: var(--ac-radius-sm); background: var(--color-ac-paper); font-size: 12px; font-variant-numeric: tabular-nums; }
.ac-console-track[data-active="true"] .ac-track-index { border-color: var(--color-ac-ink); background: var(--color-ac-ink); color: var(--color-ac-paper); }
.ac-track-copy { min-width: 0; }
.ac-track-copy strong { display: block; font: 700 20px var(--font-ac-display); }
.ac-track-copy span { display: block; max-width: 48ch; margin-top: 5px; color: var(--ac-muted); font-size: 13px; line-height: 1.35; }
.ac-track-score { color: var(--ac-muted); font-size: 13px; font-variant-numeric: tabular-nums; text-align: right; }
.ac-health-note { margin: 18px 0 0; color: var(--ac-muted); font-size: 14px; }
.ac-health-console { min-height: 500px; padding: clamp(26px, 3.2vw, 38px); border-radius: var(--ac-radius-lg); background: var(--color-ac-ink); color: var(--color-ac-paper); box-shadow: 18px 18px 0 color-mix(in srgb, var(--color-ac-mint) 76%, transparent); }
.ac-health-console .ac-console-top { border-color: color-mix(in srgb, var(--color-ac-paper) 26%, transparent); }
.ac-health-console .ac-console-top small, .ac-health-console .ac-console-case, .ac-health-console .ac-readout-label { color: color-mix(in srgb, var(--color-ac-paper) 68%, transparent); }
.ac-health-console .ac-console-main { padding-top: 38px; }
.ac-health-console .ac-ring::before { background: var(--color-ac-ink); }
.ac-health-console .ac-ring-copy strong { color: var(--color-ac-paper); }
.ac-health-console .ac-ring-copy span, .ac-health-console .ac-console-readout p { color: color-mix(in srgb, var(--color-ac-paper) 70%, transparent); }
.ac-health-console .ac-console-foot { border-color: color-mix(in srgb, var(--color-ac-paper) 26%, transparent); }
.ac-health-console .ac-signal { color: color-mix(in srgb, var(--color-ac-paper) 74%, transparent); }
.ac-health-console .ac-signal b { color: var(--color-ac-paper); }
.ac-health-console .ac-signal i { background: color-mix(in srgb, var(--color-ac-paper) 16%, transparent); }
.ac-health-console .ac-console-timestamp { color: color-mix(in srgb, var(--color-ac-paper) 58%, transparent); }
.ac-health-console .ac-console-timestamp strong { color: var(--color-ac-paper); }
.ac-console-ticket { margin: 26px 0 0; padding-top: 18px; border-top: 1px solid color-mix(in srgb, var(--color-ac-paper) 26%, transparent); color: color-mix(in srgb, var(--color-ac-paper) 84%, transparent); font-size: 16px; line-height: 1.4; }
.ac-console-ticket span { display: block; margin-bottom: 8px; color: var(--color-ac-mint); font-size: 12px; }

.ac-care-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 12px; margin-top: 54px; }
.ac-care-card { position: relative; min-height: 268px; display: flex; flex-direction: column; justify-content: space-between; padding: 26px; border: 1px solid var(--ac-rule); border-radius: var(--ac-radius-md); background: var(--color-ac-paper); transition: transform var(--dur-ac-base) var(--ease-ac-out), box-shadow var(--dur-ac-base) var(--ease-ac-out); }
.ac-care-card:nth-child(1), .ac-care-card:nth-child(4) { grid-column: span 5; }
.ac-care-card:nth-child(2), .ac-care-card:nth-child(3) { grid-column: span 7; }
.ac-care-card--peach { background: color-mix(in srgb, var(--color-ac-peach) 64%, var(--color-ac-paper)); }
.ac-care-card--lilac { background: color-mix(in srgb, var(--color-ac-lilac) 70%, var(--color-ac-paper)); }
.ac-care-card--sky { background: color-mix(in srgb, var(--color-ac-sky) 66%, var(--color-ac-paper)); }
.ac-care-card--butter { background: color-mix(in srgb, var(--color-ac-butter) 70%, var(--color-ac-paper)); }
.ac-care-card:hover { transform: translateY(-8px); box-shadow: 10px 12px 0 color-mix(in srgb, var(--color-ac-ink) 16%, transparent); }
.ac-care-card-top { display: flex; justify-content: space-between; color: var(--ac-muted); font-size: 13px; }
.ac-care-card h3 { max-width: 8ch; margin: 48px 0 0; overflow-wrap: break-word; font: 700 clamp(2rem, 3.2vw, 3.4rem)/.92 var(--font-ac-display); letter-spacing: -.07em; }
.ac-care-card p { max-width: 48ch; margin: 14px 0 0; color: var(--ac-muted); font-size: 15px; line-height: 1.4; }
.ac-care-card-arrow { display: none; }

.ac-log-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: var(--ac-column-gap); align-items: start; }
.ac-log-intro { min-width: 0; }
.ac-log-title { max-width: 9ch; margin: 20px 0 0; overflow-wrap: break-word; font: 800 clamp(3.3rem, 6vw, 6.4rem)/.89 var(--font-ac-display); letter-spacing: -.08em; }
.ac-log-intro > p:last-child { max-width: 46ch; margin: 24px 0 0; color: var(--ac-muted); font-size: 17px; line-height: 1.45; }
.ac-log-list { border-top: 1px solid var(--ac-rule); }
.ac-log-row { display: grid; grid-template-columns: 100px minmax(0, 1fr) auto; gap: 20px; align-items: center; min-height: 96px; padding: 18px 0; border-bottom: 1px solid var(--ac-rule); }
.ac-log-row time { color: var(--ac-muted); font-size: 13px; }
.ac-log-row strong { min-width: 0; font: 700 20px var(--font-ac-display); }
.ac-log-row small { justify-self: end; padding: 7px 10px; border-radius: var(--ac-radius-sm); background: var(--color-ac-mint); color: var(--color-ac-ink); font-size: 12px; }
.ac-log-row:nth-child(2) small { background: var(--color-ac-lilac); }
.ac-log-row:nth-child(3) small { background: var(--color-ac-peach); }

.ac-rhythm { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 54px; border-top: 1px solid color-mix(in srgb, var(--color-ac-paper) 28%, transparent); }
.ac-rhythm-step { min-height: 280px; padding: 28px 28px 24px 0; border-right: 1px solid color-mix(in srgb, var(--color-ac-paper) 28%, transparent); }
.ac-rhythm-step + .ac-rhythm-step { padding-left: 28px; }
.ac-rhythm-step:last-child { border-right: 0; }
.ac-rhythm-step small { color: color-mix(in srgb, var(--color-ac-paper) 68%, transparent); font-size: 13px; }
.ac-rhythm-step h3 { margin: 58px 0 0; font: 700 clamp(2rem, 3.2vw, 3.6rem)/.92 var(--font-ac-display); letter-spacing: -.07em; }
.ac-rhythm-step p { max-width: 46ch; margin: 16px 0 0; color: color-mix(in srgb, var(--color-ac-paper) 72%, transparent); font-size: 15px; line-height: 1.45; }

.ac-booking { padding: clamp(112px, 12vw, 176px) 0 136px; border-top: 1px solid var(--color-ac-ink); border-bottom: 1px solid var(--color-ac-ink); background: var(--color-ac-peach); }
.ac-booking-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(360px, 7fr); gap: var(--ac-column-gap); align-items: start; }
.ac-booking h2 { max-width: 9ch; margin: 22px 0 0; overflow-wrap: break-word; font: 800 clamp(3.8rem, 7.8vw, 8rem)/.87 var(--font-ac-display); letter-spacing: -.09em; }
.ac-booking-copy > p:not(.ac-section-note) { max-width: 38ch; margin: 30px 0 0; color: color-mix(in srgb, var(--color-ac-ink) 76%, transparent); font-size: 18px; line-height: 1.45; }
.ac-booking-notes { display: grid; gap: 8px; margin-top: 46px; color: color-mix(in srgb, var(--color-ac-ink) 68%, transparent); font-size: 13px; }
.ac-form-card { padding: clamp(24px, 3.5vw, 38px); border: 1px solid var(--color-ac-ink); border-radius: var(--ac-radius-md); background: var(--color-ac-paper); box-shadow: 16px 16px 0 color-mix(in srgb, var(--color-ac-ink) 18%, transparent); }
.ac-form { display: grid; gap: 20px; }
.ac-form fieldset { display: grid; gap: 10px; margin: 0; padding: 0; border: 0; }
.ac-form legend { margin-bottom: 2px; font-size: 15px; font-weight: 700; }
.ac-focus-list { display: grid; gap: 8px; }
.ac-focus-option { position: relative; }
.ac-focus-option input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.ac-focus-option label { display: block; min-height: 46px; padding: 12px 14px; border: 1px solid var(--ac-rule); border-radius: var(--ac-radius-sm); color: var(--ac-muted); font-size: 14px; cursor: pointer; transition: transform var(--dur-ac-fast) var(--ease-ac-out); }
.ac-focus-option label:hover, .ac-focus-option input:checked + label { border-color: var(--color-ac-ink); background: var(--color-ac-lilac); color: var(--color-ac-ink); transform: translateX(5px); }
.ac-focus-option label:active { transform: translateX(5px) scale(.985); }
.ac-fields { display: grid; gap: 14px; }
.ac-field { display: grid; gap: 6px; }
.ac-field label { font-size: 14px; font-weight: 700; }
.ac-input { min-height: 50px; padding: 0 13px; border: 1px solid var(--color-ac-ink); border-radius: var(--ac-radius-sm); background: var(--color-ac-paper); color: var(--color-ac-ink); outline: 2px solid transparent; transition: transform var(--dur-ac-fast) var(--ease-ac-out), box-shadow var(--dur-ac-fast) var(--ease-ac-out); }
.ac-input:focus { border-color: var(--color-ac-ink); transform: translateX(5px); box-shadow: 5px 0 0 var(--color-ac-mint); }
.ac-input[aria-invalid="true"] { border-color: var(--color-ac-ink); box-shadow: 5px 0 0 var(--color-ac-peach); }
.ac-error { min-height: 1lh; color: color-mix(in srgb, var(--color-ac-ink) 78%, var(--color-ac-peach)); font-size: 12px; }
.ac-form-status { min-height: 1lh; margin: 0; color: var(--ac-muted); font-size: 13px; }
.ac-success { display: grid; gap: 14px; text-align: center; }
.ac-success-mark { display: grid; place-items: center; width: 58px; height: 58px; margin: 0 auto 8px; border-radius: 50%; background: var(--color-ac-mint); font-size: 28px; }
.ac-success h3 { margin: 0; font: 700 32px/.98 var(--font-ac-display); letter-spacing: -.06em; }
.ac-success p { margin: 0; color: var(--ac-muted); font-size: 15px; }
.ac-form[data-status="error"] { animation: ac-nudge 360ms var(--ease-ac-out); }

.ac-faq { padding: clamp(104px, 10vw, 144px) 0 96px; }
.ac-faq-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: var(--ac-column-gap); align-items: start; }
.ac-faq h2 { max-width: 9ch; margin: 20px 0 0; overflow-wrap: break-word; font: 800 clamp(3.2rem, 5.6vw, 6rem)/.9 var(--font-ac-display); letter-spacing: -.08em; }
.ac-faq-list { border-top: 1px solid var(--ac-rule); }
.ac-faq details { border-bottom: 1px solid var(--ac-rule); }
.ac-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; cursor: pointer; list-style: none; font: 700 20px var(--font-ac-display); }
.ac-faq summary::-webkit-details-marker { display: none; }
.ac-faq summary::after { content: "+"; font: 24px var(--font-ac-body); transition: transform var(--dur-ac-base) var(--ease-ac-spring); }
.ac-faq details[open] summary::after { transform: rotate(45deg); }
.ac-faq details p { max-width: 64ch; margin: -2px 42px 22px 0; color: var(--ac-muted); font-size: 15px; line-height: 1.5; }
.ac-footer { padding: 44px 0 34px; border-top: 1px solid var(--ac-rule); }
.ac-footer-inner { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: end; gap: var(--ac-column-gap); }
.ac-footer p { max-width: 42ch; margin: 0; color: var(--ac-muted); font-size: 13px; }
.ac-footer-meta { color: var(--ac-muted); font-size: 12px; text-align: right; }
.ac-placeholder { min-height: 180px; display: grid; place-items: center; border: 1px dashed var(--ac-rule); border-radius: var(--ac-radius-sm); color: var(--ac-muted); font-size: 13px; }

@media (prefers-reduced-motion: no-preference) {
  .js [data-ac-reveal] { opacity: 0; transition: opacity var(--dur-ac-slow) var(--ease-ac-out), transform var(--dur-ac-slow) var(--ease-ac-out), clip-path var(--dur-ac-slow) var(--ease-ac-in-out); transition-delay: calc(var(--ac-index, 0) * var(--ac-stagger)); }
  .js [data-ac-reveal="rise"] { transform: translateY(var(--ac-reveal-shift)); }
  .js [data-ac-reveal="mask"] { clip-path: inset(0 0 100% 0); transform: translateY(18px); }
  .js [data-ac-reveal="scale"] { transform: scale(.94); }
  .js [data-ac-reveal="draw"] { transform: scaleX(0); transform-origin: left; }
  .js [data-ac-reveal][data-ac-in="true"] { opacity: 1; clip-path: inset(0); transform: none; }
  [data-ac-hero="label"] { animation: ac-hero-in var(--dur-ac-slow) var(--ease-ac-out) both; }
  [data-ac-hero="headline"] { animation: ac-hero-mask var(--dur-ac-hero) var(--ease-ac-expo) 120ms both; }
  [data-ac-hero="lead"] { animation: ac-hero-in var(--dur-ac-slow) var(--ease-ac-out) 300ms both; }
  [data-ac-hero="actions"] { animation: ac-hero-in var(--dur-ac-slow) var(--ease-ac-out) 420ms both; }
  [data-ac-hero="console"] { animation: ac-console-in var(--dur-ac-hero) var(--ease-ac-expo) 220ms both; }
  .ac-ring { animation: ac-ring-in var(--dur-ac-hero) var(--ease-ac-expo) 700ms both; }
  @keyframes ac-hero-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  @keyframes ac-hero-mask { from { opacity: 0; clip-path: inset(0 0 100% 0); transform: translateY(34px); } to { opacity: 1; clip-path: inset(0); transform: none; } }
  @keyframes ac-console-in { from { opacity: 0; transform: translateY(32px) scale(.94) rotate(1deg); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); } }
  @keyframes ac-ring-in { from { opacity: 0; transform: rotate(-28deg) scale(.75); } to { opacity: 1; transform: rotate(-28deg) scale(1); } }
  @keyframes ac-nudge { 0%, 100% { transform: translateX(0); } 30% { transform: translateX(-6px); } 70% { transform: translateX(6px); } }
}

@media (max-width: 1120px) {
  .ac-header-note { display: none; }
  .ac-header-inner { grid-template-columns: auto minmax(0, 1fr) auto; }
}

@media (max-width: 960px) {
  .ac-hero { min-height: auto; }
  .ac-hero-grid { transform: none; }
  .ac-hero-grid, .ac-health-grid, .ac-booking-grid { grid-template-columns: 1fr; }
  .ac-hero-copy { max-width: 700px; }
  .ac-hero-console { max-width: 760px; width: 100%; justify-self: end; }
  .ac-health-console { min-height: 0; }
  .ac-care-card:nth-child(n) { grid-column: span 6; }
  .ac-log-grid, .ac-faq-grid { grid-template-columns: 1fr; }
  .ac-log-intro > p:last-child { max-width: 46ch; }
  .ac-booking-grid { gap: 56px; }
}

@media (max-width: 680px) {
  :root { --ac-gutter: 16px; }
  html { scroll-padding-top: 64px; }
  .ac-header-inner { min-height: 64px; grid-template-columns: auto auto; justify-content: space-between; }
  .ac-header-nav, .ac-header-note, .ac-header-cta { display: none; }
  .ac-mobile-menu { display: inline-flex; align-items: center; justify-content: center; }
  .ac-mobile-panel { position: absolute; top: 100%; right: 0; left: 0; display: block; border-bottom: 1px solid var(--ac-rule); background: var(--color-ac-paper); }
  .js .ac-mobile-panel { visibility: hidden; opacity: 0; pointer-events: none; transform: translateY(-8px); transition: opacity var(--dur-ac-fast) var(--ease-ac-out), transform var(--dur-ac-fast) var(--ease-ac-out), visibility 0s linear var(--dur-ac-fast); }
  .js .ac-mobile-panel--open { visibility: visible; opacity: 1; pointer-events: auto; transform: none; transition-delay: 0s; }
  .ac-mobile-panel .ac-container { display: grid; gap: 3px; padding: 14px 0 18px; }
  .ac-mobile-panel a { padding: 10px 0; font-size: 16px; text-decoration: none; }
  .ac-mobile-panel a:last-child { font-weight: 700; }
  .ac-hero { padding-top: 66px; }
  .ac-hero-copy { padding-left: 0; }
  .ac-hero-copy::before { display: none; }
  .ac-hero h1 { max-width: 8ch; font-size: clamp(3.65rem, 17vw, 6.6rem); }
  .ac-hero-actions { display: grid; grid-template-columns: 1fr; }
  .ac-button { width: 100%; }
  .ac-hero-meta { grid-template-columns: 1fr; margin-top: 38px; }
  .ac-hero-meta span, .ac-hero-meta span + span { min-height: 0; padding: 10px 0; border-right: 0; border-bottom: 1px solid var(--ac-rule); }
  .ac-hero-meta span:last-child { border-bottom: 0; }
  .ac-hero-console::before { inset: -12px -10px 14px 10px; }
  .ac-console { padding: 20px; border-radius: var(--ac-radius-md); box-shadow: 10px 12px 0 color-mix(in srgb, var(--color-ac-lilac) 76%, transparent); }
  .ac-console-main { grid-template-columns: 1fr; gap: 24px; padding: 28px 0 24px; }
  .ac-console-readout { text-align: left; }
  .ac-console-readout h2 { max-width: 11ch; }
  .ac-console-foot { grid-template-columns: 1fr; gap: 18px; }
  .ac-console-timestamp { text-align: left; }
  .ac-section { padding: 92px 0; }
  .ac-section-head { grid-template-columns: 1fr; gap: 20px; padding-bottom: 26px; }
  .ac-section-head h2 { max-width: 10ch; font-size: clamp(3.1rem, 14vw, 5.4rem); }
  .ac-section-head > div > p { font-size: 17px; }
  .ac-health-grid { margin-top: 42px; }
  .ac-console-track { grid-template-columns: 42px minmax(0, 1fr) 32px; gap: 12px; min-height: 94px; }
  .ac-track-copy strong { font-size: 18px; }
  .ac-track-copy span { font-size: 13px; }
  .ac-health-console { padding: 22px 20px; }
  .ac-care-grid { grid-template-columns: 1fr; margin-top: 40px; }
  .ac-care-card:nth-child(n) { grid-column: span 1; min-height: 226px; }
  .ac-care-card h3 { margin-top: 34px; }
  .ac-log-row { grid-template-columns: 76px minmax(0, 1fr); gap: 12px; }
  .ac-log-row small { grid-column: 2; justify-self: start; }
  .ac-rhythm { grid-template-columns: 1fr; margin-top: 40px; border-top: 0; }
  .ac-rhythm-step, .ac-rhythm-step + .ac-rhythm-step { min-height: 0; padding: 30px 0 30px 24px; border-right: 0; border-top: 1px solid color-mix(in srgb, var(--color-ac-paper) 28%, transparent); }
  .ac-rhythm-step h3 { margin-top: 24px; }
  .ac-booking { padding: 92px 0; }
  .ac-booking h2 { font-size: clamp(3.6rem, 16vw, 6.4rem); }
  .ac-form-card { padding: 22px 20px; }
  .ac-footer-inner { grid-template-columns: 1fr; align-items: start; gap: 18px; }
  .ac-footer-meta { text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 1ms !important; }
  [data-ac-reveal], .ac-hero-console, .ac-console, .ac-ring { opacity: 1 !important; transform: none !important; clip-path: none !important; }
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/aftercart";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return (
      <div className={`ac-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={src} width={w} height={h} alt={alt} loading="eager" decoding="async" />;
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title">
  <title>AFTERCART mark</title>
  <rect width="64" height="64" rx="14" fill="#4C4668"/>
  <path d="M18 21h28M18 32h20M18 43h28" fill="none" stroke="#FFF7F3" stroke-width="5" stroke-linecap="round"/>
  <circle cx="44" cy="32" r="6" fill="#BFE7D3"/>
</svg>
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OG_TOKENS = {
  paper: "#FFF7F3",
  ink: "#4C4668",
  mint: "#BFE7D3",
  lilac: "#DCCFF4",
  peach: "#FFCCB8",
  face: "Arial",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: OG_TOKENS.paper,
        color: OG_TOKENS.ink,
        fontFamily: OG_TOKENS.face,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: "0.08em" }}>
        <span>Aftercart</span>
        <span style={{ color: OG_TOKENS.mint }}>Store health / 04</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.02 }}>Keep your shop ready.</div>
        <div style={{ fontSize: 30, color: OG_TOKENS.ink }}>Shopify care after launch.</div>
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 22 }}>
        <span style={{ padding: "14px 18px", background: OG_TOKENS.lilac, borderRadius: 12 }}>Conversion 78</span>
        <span style={{ padding: "14px 18px", background: OG_TOKENS.peach, borderRadius: 12 }}>Next check / today</span>
      </div>
    </div>,
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/page.tsx">
<![CDATA[import { Logo } from "./brand/Logo";
import { HealthConsole } from "./console/HealthConsole";
import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { Booking } from "./sections/Booking";
import { CareTracks } from "./sections/CareTracks";
import { FAQ } from "./sections/FAQ";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Rhythm } from "./sections/Rhythm";
import { WorkLog } from "./sections/WorkLog";

export default function AftercartPage() {
  return (
    <div className="ac-shell">
      <a className="ac-skip" href="#main">Skip to content</a>
      <div className="ac-progress" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <section id="health" className="ac-section ac-health-section" aria-labelledby="health-title">
          <div className="ac-container">
            <div className="ac-section-head" data-ac-reveal="rise">
              <p className="ac-section-note">Store health / 04 signals</p>
              <div><h2 id="health-title">Look at the shop like a customer.</h2><p>Pick the part that feels a little out of tune. The console shows what a care window would look at next.</p></div>
            </div>
            <HealthConsole />
          </div>
        </section>
        <CareTracks />
        <WorkLog />
        <Rhythm />
        <Booking />
        <FAQ />
      </main>
      <footer className="ac-footer">
        <div className="ac-container ac-footer-inner"><Logo compact /><p>AFTERCART is a fictional Shopify care partner template. The form is local-only.</p><span className="ac-footer-meta">© 2026 / Store health, kept human</span></div>
      </footer>
      <Reveals />
      <ScrollVars />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`ac-logo${compact ? " ac-logo--compact" : ""}`} aria-label="AFTERCART">
      <svg className="ac-logo-mark" width={compact ? 34 : 30} height="30" viewBox="0 0 30 30" aria-hidden="true">
        <rect x="1" y="1" width="28" height="28" rx="8" fill="var(--color-ac-ink)" />
        <path d="M8 9h14M8 15h10M8 21h14" stroke="var(--color-ac-paper)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="21" cy="15" r="3" fill="var(--color-ac-mint)" />
      </svg>
      {!compact && <span className="ac-logo-word">AFTERCART<span aria-hidden="true">.</span></span>}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/console/health.ts">
<![CDATA[export const TRACKS = [
  {
    id: "conversion",
    label: "Conversion",
    shortLabel: "Convert",
    score: 78,
    status: "Needs a closer look",
    detail: "Remove the quiet friction between a good product page and a confident checkout.",
    ticket: "Make the next add-to-cart feel obvious.",
    signal: "Journey",
  },
  {
    id: "merchandising",
    label: "Merchandising",
    shortLabel: "Merch",
    score: 72,
    status: "Room to arrange",
    detail: "Bring the right products forward with collections, bundles, and a cleaner shop rhythm.",
    ticket: "Give best sellers a better place to land.",
    signal: "Shelf",
  },
  {
    id: "speed",
    label: "Speed",
    shortLabel: "Speed",
    score: 86,
    status: "Ready to tune",
    detail: "Trim the path from first tap to paid order without losing the character of the shop.",
    ticket: "Trim the path from first tap to paid order.",
    signal: "Load",
  },
  {
    id: "retention",
    label: "Retention",
    shortLabel: "Return",
    score: 64,
    status: "Waiting for a rhythm",
    detail: "Turn the first order into a reason to come back with useful post-purchase moments.",
    ticket: "Make the second order easier to imagine.",
    signal: "Return",
  },
] as const;

export type TrackId = (typeof TRACKS)[number]["id"];

export type HealthState = {
  active: TrackId;
};

export const INITIAL_HEALTH: HealthState = { active: "conversion" };

export function selectTrack(state: HealthState, id: TrackId): HealthState {
  if (!TRACKS.some((track) => track.id === id)) return state;
  return state.active === id ? state : { active: id };
}

export function getTrack(id: TrackId) {
  return TRACKS.find((track) => track.id === id) ?? TRACKS[0];
}

export function getHealthSnapshot(state: HealthState) {
  const track = getTrack(state.active);
  return {
    score: track.score,
    label: track.status,
    progress: track.score / 100,
    ticket: track.ticket,
    detail: track.detail,
    signal: track.signal,
    active: track.id,
  };
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/console/HealthConsole.tsx">
<![CDATA["use client";

import { useMemo, useState } from "react";
import { getHealthSnapshot, INITIAL_HEALTH, selectTrack, TRACKS, type TrackId } from "./health";

const signalNames = ["Journey", "Shelf", "Load", "Return"];

export function HealthConsole() {
  const [state, setState] = useState(INITIAL_HEALTH);
  const snapshot = getHealthSnapshot(state);
  const signalValues = useMemo(
    () => TRACKS.map((track, index) => Math.min(98, track.score + (track.id === state.active ? 7 : index === 2 ? 3 : 0))),
    [state.active],
  );

  return (
    <div className="ac-health-grid">
      <div className="ac-track-list" aria-label="Care tracks">
        {TRACKS.map((track, index) => (
          <button
            className="ac-console-track"
            key={track.id}
            type="button"
            data-active={track.id === state.active}
            aria-pressed={track.id === state.active}
            onClick={() => setState((current) => selectTrack(current, track.id as TrackId))}
            style={{ "--ac-index": index } as React.CSSProperties}
          >
            <span className="ac-track-index">0{index + 1}</span>
            <span className="ac-track-copy"><strong>{track.label}</strong><span>{track.detail}</span></span>
            <span className="ac-track-score">{track.score}</span>
          </button>
        ))}
        <p className="ac-health-note">Select a care track to rebalance the readout.</p>
      </div>
      <div className="ac-health-console" aria-live="polite">
        <div className="ac-console-top">
          <div><strong>Store health</strong><small>Signal check / {snapshot.signal}</small></div>
          <span className="ac-console-case">Active / {snapshot.active}</span>
        </div>
        <div className="ac-console-main">
          <div className="ac-ring" style={{ "--ac-score": snapshot.score } as React.CSSProperties}>
            <div className="ac-ring-copy"><strong>{snapshot.score}</strong><span>care score</span></div>
          </div>
          <div className="ac-console-readout">
            <h2>{snapshot.label}.</h2>
            <p>{snapshot.detail}</p>
          </div>
        </div>
        <div className="ac-console-foot">
          <div className="ac-signal-row" aria-label="Live signal levels">
            {signalValues.map((value, index) => (
              <span className="ac-signal" key={signalNames[index]}>
                <span>{signalNames[index]}</span><i style={{ "--ac-level": `${value / 100}` } as React.CSSProperties} /><b>{value}</b>
              </span>
            ))}
          </div>
          <p className="ac-console-timestamp">Next check<strong>Today / 14:20</strong></p>
        </div>
        <p className="ac-console-ticket"><span>Work log / 026</span>{snapshot.ticket}</p>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/forms/booking.ts">
<![CDATA[export const BOOKING_FOCUS = ["conversion", "merchandising", "speed", "retention"] as const;

export type BookingFocus = (typeof BOOKING_FOCUS)[number];

export type BookingValues = {
  name: string;
  email: string;
  shop: string;
  focus: string;
};

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};

  if (!values.name.trim()) errors.name = "Add your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a work email.";
  if (!values.shop.trim()) errors.shop = "Add your shop name.";
  if (!BOOKING_FOCUS.includes(values.focus as BookingFocus)) {
    errors.focus = "Choose the area that needs care.";
  }

  return errors;
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/forms/BookingForm.tsx">
<![CDATA["use client";

import { useRef, useState } from "react";
import { BOOKING_FOCUS, validateBooking, type BookingValues } from "./booking";

const focusLabels = {
  conversion: "Conversion / product paths",
  merchandising: "Merchandising / collections",
  speed: "Speed / storefront weight",
  retention: "Retention / return visits",
} as const;

const initialValues: BookingValues = { name: "", email: "", shop: "", focus: "" };

export function BookingForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>>({});
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const shopRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof BookingValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateBooking(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("error");
      requestAnimationFrame(() => {
        if (next.name) nameRef.current?.focus();
        else if (next.email) emailRef.current?.focus();
        else if (next.shop) shopRef.current?.focus();
        else focusRef.current?.focus();
      });
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 260);
  };

  if (status === "success") {
    return (
      <div className="ac-success" data-status="success" aria-live="polite">
        <span className="ac-success-mark" aria-hidden="true">✓</span>
        <h3>Good. We have a starting point.</h3>
        <p>This is a local template demo, so nothing was sent. In a real build, this brief would open the care conversation.</p>
        <button type="button" className="ac-button ac-button--quiet" onClick={() => { setValues(initialValues); setStatus("idle"); }}>Start another brief</button>
      </div>
    );
  }

  return (
    <form className="ac-form" data-status={status} onSubmit={submit} noValidate>
      <fieldset>
        <legend>Where should we start?</legend>
        <div className="ac-focus-list">
          {BOOKING_FOCUS.map((focus, index) => (
            <span className="ac-focus-option" key={focus}>
              <input ref={index === 0 ? focusRef : undefined} id={`ac-focus-${focus}`} type="radio" name="focus" value={focus} checked={values.focus === focus} onChange={(event) => update("focus", event.target.value)} />
              <label htmlFor={`ac-focus-${focus}`}>{focusLabels[focus]}</label>
            </span>
          ))}
        </div>
        <small className="ac-error">{errors.focus ?? "Choose one care track for the first conversation."}</small>
      </fieldset>
      <div className="ac-fields">
        <div className="ac-field"><label htmlFor="ac-name">Your name</label><input ref={nameRef} className="ac-input" id="ac-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} /> <small className="ac-error">{errors.name ?? ""}</small></div>
        <div className="ac-field"><label htmlFor="ac-email">Work email</label><input ref={emailRef} className="ac-input" id="ac-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} /> <small className="ac-error">{errors.email ?? ""}</small></div>
        <div className="ac-field"><label htmlFor="ac-shop">Shop name</label><input ref={shopRef} className="ac-input" id="ac-shop" name="shop" autoComplete="organization" value={values.shop} onChange={(event) => update("shop", event.target.value)} aria-invalid={Boolean(errors.shop)} /> <small className="ac-error">{errors.shop ?? ""}</small></div>
      </div>
      <button className="ac-button" type="submit" disabled={status === "loading"}>{status === "loading" ? "Opening the care note…" : "Book a care call ↗"}</button>
      <p className="ac-form-status" aria-live="polite">{status === "error" ? "One detail still needs your attention." : "20 minutes / clear next step / no commitment"}</p>
    </form>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/motion/math.ts">
<![CDATA[export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

export function progressFromOffsets(scrollTop: number, sectionTop: number, sectionHeight: number, viewportHeight: number): number {
  const travel = Math.max(sectionHeight - viewportHeight, 1);
  return clamp((scrollTop - sectionTop) / travel, 0, 1);
}

export function staggerDelay(index: number, stagger: number, cap: number): number {
  return Math.min(Math.max(index, 0) * stagger, cap);
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ac-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.setAttribute("data-ac-in", "true"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-ac-in", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/motion/ScrollVars.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { clamp } from "./math";

export function ScrollVars() {
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;
    const write = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--ac-progress", String(clamp(max > 0 ? window.scrollY / max : 0, 0, 1)));
      root.style.setProperty("--ac-scroll-y", `${Math.min(window.scrollY, 520)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(write);
    };
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/Booking.tsx">
<![CDATA[import { BookingForm } from "../forms/BookingForm";

export function Booking() {
  return (
    <section id="call" className="ac-booking" aria-labelledby="booking-title">
      <div className="ac-container ac-booking-grid">
        <div className="ac-booking-copy" data-ac-reveal="rise">
          <p className="ac-section-note">A better next check</p>
          <h2 id="booking-title">Keep the good parts moving.</h2>
          <p>Tell us what feels a little wobbly. We’ll use the first call to name the next useful pass, not sell you a rebuild.</p>
          <div className="ac-booking-notes"><span>01 / 20 minute call</span><span>02 / one clear care track</span><span>03 / a note you can keep</span></div>
        </div>
        <div className="ac-form-card" data-ac-reveal="scale"><BookingForm /></div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/CareTracks.tsx">
<![CDATA[const cards = [
  { index: "01", title: "Conversion", copy: "Sharper paths from product detail to paid order.", tone: "peach" },
  { index: "02", title: "Merchandising", copy: "Collections that make the right things easier to find.", tone: "lilac" },
  { index: "03", title: "Speed", copy: "A faster shop that still feels like your shop.", tone: "sky" },
  { index: "04", title: "Retention", copy: "Small post-purchase moments that earn a return.", tone: "butter" },
];

export function CareTracks() {
  return (
    <section id="care" className="ac-section" aria-labelledby="care-title">
      <div className="ac-container">
        <div className="ac-section-head" data-ac-reveal="rise">
          <p className="ac-section-note">What we keep an eye on</p>
          <div><h2 id="care-title">Care that keeps the shelf moving.</h2><p>One steady partner for the details that drift after launch: the things customers feel, even when they never name them.</p></div>
        </div>
        <div className="ac-care-grid">
          {cards.map((card, index) => (
            <article className={`ac-care-card ac-care-card--${card.tone}`} key={card.index} data-ac-reveal="scale" style={{ "--ac-index": index } as React.CSSProperties}>
              <div className="ac-care-card-top"><span>{card.index}</span><span>Care track</span></div>
              <div><h3>{card.title}</h3><p>{card.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/FAQ.tsx">
<![CDATA[const faqs = [
  ["Is this a rebuild service?", "No. AFTERCART is for the work that keeps a live shop healthy after the big launch work is done. We can spot a larger rebuild when it is genuinely the right next move, but the first step is a focused care window."],
  ["Do you need access to my Shopify admin?", "A real engagement would use the least access needed for the agreed care track. This template is a fictional demo and does not connect to Shopify or any outside system."],
  ["What happens after the call?", "You leave with one named next pass, the reason it matters, and a simple way to decide whether ongoing care fits your shop."],
  ["Can I use this template for my own service?", "Yes. Swap the name, copy, palette, and form endpoint. Keep the console mechanic only if it helps visitors understand the service you actually provide."],
] as const;

export function FAQ() {
  return (
    <section className="ac-faq" aria-labelledby="faq-title">
      <div className="ac-container ac-faq-grid">
        <div data-ac-reveal="rise"><p className="ac-section-note">Small questions</p><h2 id="faq-title">A clear read before you call.</h2></div>
        <div className="ac-faq-list" data-ac-reveal="draw">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/Header.tsx">
<![CDATA["use client";

import { useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="ac-header">
      <div className="ac-container ac-header-inner">
        <a className="ac-header-logo" href="#top" aria-label="AFTERCART home" onClick={close}>
          <Logo />
        </a>
        <nav className={`ac-header-nav${open ? " ac-header-nav--open" : ""}`} aria-label="Primary navigation">
          <a href="#health" onClick={close}>Store health</a>
          <a href="#care" onClick={close}>Care tracks</a>
          <a href="#rhythm" onClick={close}>How it works</a>
        </nav>
        <span className="ac-header-note">After launch / ongoing care</span>
        <a className="ac-button ac-header-cta" href="#call">Book a care call</a>
        <button className="ac-mobile-menu" type="button" aria-expanded={open} aria-controls="aftercart-nav" onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div id="aftercart-nav" className={`ac-mobile-panel${open ? " ac-mobile-panel--open" : ""}`}>
        <div className="ac-container">
          <a href="#health" onClick={close}>Store health</a>
          <a href="#care" onClick={close}>Care tracks</a>
          <a href="#rhythm" onClick={close}>How it works</a>
          <a href="#call" onClick={close}>Book a care call</a>
        </div>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/Hero.tsx">
<![CDATA[export function Hero() {
  return (
    <section id="top" className="ac-hero" aria-labelledby="hero-title">
      <div className="ac-container ac-hero-grid">
        <div className="ac-hero-copy">
          <p className="ac-section-note" data-ac-hero="label">Shopify care / after launch</p>
          <h1 id="hero-title" data-ac-hero="headline">Keep your shop ready.</h1>
          <p className="ac-hero-lead" data-ac-hero="lead">For small shops, steady care keeps storefronts quick, clear, and ready.</p>
          <div className="ac-hero-actions" data-ac-hero="actions">
            <a className="ac-button" href="#call">Book a care call</a>
            <a className="ac-button ac-button--quiet" href="#health">See the console</a>
          </div>
          <div className="ac-hero-meta" data-ac-hero="lead">
            <span>Owner-led shops</span>
            <span>One calm partner</span>
            <span>Local demo / no endpoint</span>
          </div>
        </div>
        <div className="ac-hero-console" data-ac-hero="console" aria-label="Preview of the AFTERCART store health console">
          <div className="ac-console">
            <div className="ac-console-top">
              <div><strong>Store health</strong><small>Live care console</small></div>
              <span className="ac-console-case">Case 026 / Today</span>
            </div>
            <div className="ac-console-main">
              <div className="ac-ring" style={{ "--ac-score": 78 } as React.CSSProperties}>
                <div className="ac-ring-copy"><strong>78</strong><span>good shape</span></div>
              </div>
              <div className="ac-console-readout">
                <h2>Needs a closer look.</h2>
                <p>Conversion is asking for a little more attention before the next campaign.</p>
              </div>
            </div>
            <div className="ac-console-foot">
              <div className="ac-signal-row" aria-label="Store signal levels">
                <span className="ac-signal"><span>Journey</span><i style={{ "--ac-level": "0.78" } as React.CSSProperties} /><b>78</b></span>
                <span className="ac-signal"><span>Shelf</span><i style={{ "--ac-level": "0.72" } as React.CSSProperties} /><b>72</b></span>
                <span className="ac-signal"><span>Load</span><i style={{ "--ac-level": "0.86" } as React.CSSProperties} /><b>86</b></span>
                <span className="ac-signal"><span>Return</span><i style={{ "--ac-level": "0.64" } as React.CSSProperties} /><b>64</b></span>
              </div>
              <p className="ac-console-timestamp">Next check<strong>Today / 14:20</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/Rhythm.tsx">
<![CDATA[const steps = [
  ["01 / Listen", "We start with the shop as it is: the pressure points, the good parts, and the next customer you want to keep."],
  ["02 / Tune", "A focused care window makes one useful change at a time, with a short note you can actually act on."],
  ["03 / Keep", "The work becomes a rhythm, not a rebuild: a partner who knows what changed and what deserves a look next."],
] as const;

export function Rhythm() {
  return (
    <section id="rhythm" className="ac-section ac-section--ink" aria-labelledby="rhythm-title">
      <div className="ac-container">
        <div className="ac-section-head" data-ac-reveal="rise">
          <p className="ac-section-note">The care rhythm</p>
          <div><h2 id="rhythm-title">A shop gets better in passes.</h2><p>Not a giant handoff. A clear cadence that leaves the owner in the loop.</p></div>
        </div>
        <div className="ac-rhythm">
          {steps.map(([label, copy], index) => (
            <article className="ac-rhythm-step" key={label} data-ac-reveal="rise" style={{ "--ac-index": index } as React.CSSProperties}>
              <small>{label}</small><h3>{index === 0 ? "Listen." : index === 1 ? "Tune." : "Keep."}</h3><p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(aftercart)/aftercart/sections/WorkLog.tsx">
<![CDATA[const entries = [
  ["Today", "Collection hierarchy / 03", "In care"],
  ["Tue", "Product page clarity / 11", "Ready"],
  ["Mon", "Image weight pass / 08", "Shipped"],
] as const;

export function WorkLog() {
  return (
    <section className="ac-section" aria-labelledby="log-title">
      <div className="ac-container ac-log-grid">
        <div className="ac-log-intro" data-ac-reveal="rise">
          <p className="ac-section-note">A small, useful paper trail</p>
          <h2 id="log-title" className="ac-log-title">The work stays visible.</h2>
          <p>Every care window ends with a clear note: what moved, why it mattered, and what we would check next.</p>
        </div>
        <div className="ac-log-list" data-ac-reveal="draw">
          {entries.map(([date, title, status], index) => (
            <article className="ac-log-row" key={title} style={{ "--ac-index": index } as React.CSSProperties}>
              <time>{date}</time><strong>{title}</strong><small>{status}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
  </files>
</template>
