<template slug="openhouse" name="OPENHOUSE">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(openhouse)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./openhouse/openhouse.css";

const openhouseSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-openhouse-sans",
});

const openhouseMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-openhouse-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "OPENHOUSE — Make the next step easy",
  description: "A focused conversion page for small businesses that want more good conversations.",
  icons: { icon: "/templates/openhouse/icon.svg" },
};

export default function OpenhouseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openhouseSans.variable} ${openhouseMono.variable} overflow-x-clip`}>
      <body className="openhouse-body overflow-x-clip">
        <noscript>
          <style>{`[data-oh-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/base.css">
<![CDATA[*, *::before, *::after { box-sizing: border-box; }
html, body { overflow-x: clip; }
html { scrollbar-color: var(--color-muted) var(--color-paper); scroll-padding-top: var(--space-3xl); }
body { margin: 0; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-body); font-size: var(--text-md); line-height: 1.55; -webkit-font-smoothing: antialiased; caret-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); color: var(--color-ink); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 0.16em; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); font-weight: var(--display-weight, 700); font-synthesis: none; letter-spacing: var(--tracking-display); line-height: 1.05; overflow-wrap: break-word; min-width: 0; text-wrap: pretty; }
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
/* photographs: muted sepia=8 */
[data-slot] > img { filter: saturate(0.65) contrast(0.97) sepia(0.08); }
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#F7F2E9"/>
  <path d="M16 52V18c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v34" fill="none" stroke="#171414" stroke-width="4"/>
  <path d="M24 52V26h16v26M32 26v26" fill="none" stroke="#D86B4A" stroke-width="4"/>
</svg>
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#171414";
const paper = "#F7F2E9";
const cotton = "#FFF9F0";
const accent = "#D86B4A";
const board = "#344A3E";

export default function OpenhouseOpenGraph() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: paper, color: ink, padding: "64px 72px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700 }}>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${ink}`, color: accent }}>⌂</div>
        openhouse
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
          <div style={{ color: accent, fontSize: 22, marginBottom: 24 }}>A focused page for owner-led businesses</div>
          <div style={{ fontSize: 70, lineHeight: 1.02, fontWeight: 700, letterSpacing: -3 }}>Turn more first clicks into good conversations.</div>
        </div>
        <div style={{ width: 300, height: 270, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28, border: `1px solid ${board}`, background: cotton }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: board }}>The front desk <span style={{ color: accent }}>●</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Open the right invitation.</div>
            <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: ink, color: paper, fontSize: 16 }}>Book my 20-minute call ↗</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${board}`, paddingTop: 16, color: board, fontSize: 18 }}>
        <span>One action</span><span>Short form</span><span>Clear handoff</span>
      </div>
    </div>,
    { ...size },
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/openhouse.css">
<![CDATA[/* Hallmark · shape: Workbench · genre: modern-minimal · theme: Coral (deal 1/3, seed ac6d2332) · job: book · draw: ac6d2332
 * hero: Banner with a threshold form · nav: wordmark and trust line · footer: colophon block · imagery: built stationery, no photographs · signature: the door sign settles open
 * axes: light/grotesk-sans/warm · posture: restrained · contrast: pass · fold: pass · v2.0.0 */
/* Hallmark · pre-emit critique: P4 H4 E5 S4 R5 V5 · weakest: S, the form is the visual anchor and stays compact so the hero can hold one action without turning into a dashboard */
/* Hallmark · answered F3 · display heads use pretty wrapping so the seven-word hero stays stable on narrow screens */
@import "tailwindcss";
@import "./tokens.css";
@import "./base.css";

html, body { overflow-x: clip; }

html:has(.openhouse-body) {
  scroll-behavior: smooth;
  scroll-padding-top: 72px;
}

.openhouse-body {
  min-width: 320px;
  background: var(--color-paper);
  color: var(--color-ink);
}

.oh-site {
  overflow: clip;
}

.oh-container {
  width: min(var(--container), calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
}

.oh-skip {
  position: fixed;
  top: -80px;
  left: var(--space-md);
  z-index: var(--z-toast);
  padding: var(--space-xs) var(--space-md);
  background: var(--color-ink);
  color: var(--color-paper);
  text-decoration: none;
}

.oh-skip:focus-visible {
  top: var(--space-md);
}

.oh-progress {
  position: fixed;
  inset: 0 auto auto 0;
  z-index: var(--z-toast);
  width: 100%;
  height: 3px;
  border-top: 3px solid var(--color-accent-2);
  background: transparent;
  transform: scaleX(var(--oh-progress, 0));
  transform-origin: left;
  pointer-events: none;
}

.oh-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky-nav);
  border-bottom: var(--rule-hair) solid color-mix(in oklab, var(--color-rule) 76%, transparent);
  background: color-mix(in oklab, var(--color-paper) 92%, transparent);
  backdrop-filter: blur(14px);
}

.oh-header-inner {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

.oh-header-logo {
  color: var(--color-ink);
  text-decoration: none;
}

.oh-header-note {
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.oh-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-ink);
}

.oh-logo-mark {
  width: 30px;
  height: 30px;
  flex: none;
}

.oh-logo-word {
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.oh-logo--compact .oh-logo-mark {
  width: 24px;
  height: 24px;
}

.oh-logo--compact .oh-logo-word {
  font-size: var(--text-sm);
}

.oh-hero {
  position: relative;
  min-height: calc(100svh - 72px);
  display: grid;
  align-content: center;
  padding: var(--section-gap-s) 0 var(--space-2xl);
  background-color: var(--color-desk);
  background-image: radial-gradient(88% 100% at 0% 28%, var(--color-cotton), transparent 64%);
}

.oh-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.78fr);
  gap: clamp(48px, 8vw, 132px);
  align-items: center;
}

.oh-hero-copy {
  max-width: 680px;
}

.oh-context,
.oh-section-label,
.oh-threshold-label,
.oh-door-status,
.oh-outcome-number,
.oh-fit-marker,
.oh-process-number {
  color: var(--color-accent-2);
  font-size: var(--text-sm);
  line-height: 1.2;
}

.oh-context {
  margin-bottom: var(--space-lg);
}

.oh-hero h1 {
  max-width: 10ch;
  font-size: clamp(3.5rem, 7vw, 7.75rem);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.oh-lead {
  max-width: 36ch;
  margin-top: var(--space-lg);
  font-size: var(--text-lead);
  line-height: 1.4;
}

.oh-hero-note {
  max-width: 34ch;
  margin-top: var(--space-xl);
  padding-top: var(--space-md);
  border-top: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.oh-threshold {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: var(--space-lg);
  border: var(--rule-hair) solid var(--color-rule-2);
  border-radius: var(--radius-card);
  background: var(--color-cotton);
  box-shadow: var(--shadow-stock);
}

.oh-threshold-light {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: -1;
  width: 2px;
  border-left: 0;
  background: transparent;
  box-shadow: inset 2px 0 0 var(--color-accent);
  transform: scaleY(0.12);
  transform-origin: bottom;
  transition: transform var(--dur-long) var(--ease-out-expo);
}

.oh-threshold:focus-within .oh-threshold-light,
.oh-threshold:has(input:checked) .oh-threshold-light {
  transform: scaleY(1);
}

.oh-threshold-head,
.oh-sticky-inner,
.oh-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.oh-threshold-label {
  color: var(--color-ink-2);
}

.oh-door-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  color: var(--color-muted);
  font-size: var(--text-xs);
}

.oh-door-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-rule-2);
}

.oh-threshold:focus-within .oh-door-status i,
.oh-threshold:has(input:checked) .oh-door-status i {
  background: var(--color-accent);
}

.oh-threshold-copy {
  margin: var(--space-xl) 0 var(--space-lg);
}

.oh-threshold-copy h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  letter-spacing: -0.05em;
}

.oh-threshold-copy p {
  max-width: 45ch;
  margin-top: var(--space-sm);
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.oh-booking-form {
  display: grid;
  gap: var(--space-md);
}

.oh-goal-fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.oh-goal-fieldset legend {
  margin-bottom: var(--space-sm);
  color: var(--color-ink-2);
  font-size: var(--text-sm);
  font-weight: 600;
}

.oh-goals {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-2xs);
  padding: var(--space-2xs);
  border-radius: var(--radius-input);
  background: var(--color-paper-2);
  box-shadow: var(--press-groove);
}

.oh-goal {
  position: relative;
  min-width: 0;
}

.oh-goal input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.oh-goal label {
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xs);
  border: var(--rule-hair) solid transparent;
  border-radius: var(--radius-input);
  color: var(--color-muted);
  font-size: 0.78rem;
  line-height: 1.15;
  text-align: center;
  cursor: pointer;
}

.oh-goal label:hover {
  color: var(--color-ink);
}

.oh-goal input:checked + label {
  border-color: var(--color-rule-2);
  background: var(--color-cotton);
  color: var(--color-ink);
  box-shadow: var(--shadow-card);
}

.oh-goal input:focus-visible + label {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.oh-helper,
.oh-field small,
.oh-form-status {
  display: block;
  min-height: 1lh;
  color: var(--color-muted);
  font-size: 0.75rem;
  line-height: 1.35;
}

.oh-helper {
  margin-top: var(--space-2xs);
}

.oh-field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-sm);
}

.oh-field {
  display: grid;
  min-width: 0;
  gap: var(--space-2xs);
}

.oh-field > span {
  color: var(--color-ink-2);
  font-size: var(--text-sm);
  font-weight: 600;
}

.oh-field b {
  color: var(--color-muted);
  font-size: 0.72rem;
  font-weight: 400;
}

.oh-field input {
  width: 100%;
  min-height: 48px;
  padding: 0 var(--space-sm);
  border: var(--rule-hair) solid var(--color-muted);
  border-radius: var(--radius-input);
  outline: 2px solid transparent;
  outline-offset: -3px;
  background: var(--color-cotton);
  color: var(--color-ink);
}

.oh-field input:hover {
  background: var(--color-paper-2);
}

.oh-field input:focus-visible {
  border-color: var(--color-ink-2);
  outline-color: var(--color-focus);
}

.oh-field input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.oh-field input:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.oh-field small:not(:empty),
.oh-form-status--error {
  color: var(--color-error);
}

.oh-form-status--success {
  color: var(--color-success);
}

.oh-button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: 0 var(--space-lg);
  border: var(--rule-hair) solid var(--color-ink);
  border-radius: var(--radius-stock);
  color: var(--color-ink);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), transform var(--dur-micro) var(--ease-spring);
}

.oh-button--primary {
  background: var(--color-ink);
  color: var(--color-paper);
  box-shadow: var(--shadow-stock);
}

.oh-button--primary:hover {
  background: var(--color-ink-2);
  box-shadow: var(--shadow-stock-lift);
  transform: translateY(-1px);
}

.oh-button:active {
  transform: translateY(1px);
}

.oh-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.oh-button:disabled,
.oh-button[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
}

.oh-hero-foot {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  margin-top: var(--space-2xl);
  padding-top: var(--space-md);
  border-top: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.oh-section {
  padding: var(--section-gap-l) 0;
}

.oh-section--paper {
  background: var(--color-paper);
}

.oh-section--desk {
  background: var(--color-desk);
}

.oh-section--board {
  background: var(--color-board);
  color: var(--color-board-type);
}

.oh-section-grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(48px, 10vw, 160px);
  align-items: start;
}

.oh-section-label {
  margin-bottom: var(--space-lg);
}

.oh-section h2,
.oh-close h2 {
  max-width: 12ch;
  font-size: var(--text-section);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.oh-section-lead {
  max-width: 34ch;
  margin-top: var(--space-lg);
  color: var(--color-muted);
  font-size: var(--text-md);
}

.oh-outcome-list {
  border-top: var(--rule-hair) solid var(--color-rule-2);
}

.oh-outcome {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 24px;
  gap: var(--space-md);
  align-items: start;
  padding: var(--space-lg) 0;
  border-bottom: var(--rule-hair) solid var(--color-rule-2);
}

.oh-outcome h3,
.oh-fit-item h3,
.oh-process-item h3 {
  margin-bottom: var(--space-xs);
  font-size: var(--text-title);
  line-height: 1.1;
  letter-spacing: -0.04em;
}

.oh-outcome p,
.oh-fit-item p,
.oh-process-item p {
  max-width: 45ch;
  color: var(--color-muted);
}

.oh-outcome-arrow {
  color: var(--color-accent-2);
  font-size: var(--text-lg);
  transition: transform var(--dur-base) var(--ease-out);
}

.oh-outcome:hover .oh-outcome-arrow {
  transform: translate(3px, -3px);
}

.oh-fit-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: var(--space-2xl) clamp(48px, 10vw, 160px);
}

.oh-section--board .oh-section-label,
.oh-section--board .oh-fit-marker {
  color: var(--color-accent);
}

.oh-fit-grid h2 {
  max-width: 10ch;
}

.oh-fit-side {
  align-self: end;
  max-width: 34ch;
  color: color-mix(in oklab, var(--color-board-type) 72%, transparent);
}

.oh-fit-rule {
  margin-top: var(--space-xl);
  padding-top: var(--space-md);
  border-top: var(--rule-hair) solid color-mix(in oklab, var(--color-board-type) 38%, transparent);
}

.oh-fit-list {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--rule-hair);
  background: color-mix(in oklab, var(--color-board-type) 30%, transparent);
}

.oh-fit-item {
  min-height: 220px;
  display: grid;
  align-content: space-between;
  gap: var(--space-xl);
  padding: var(--space-lg);
  background: var(--color-board);
}

.oh-fit-item p {
  color: color-mix(in oklab, var(--color-board-type) 72%, transparent);
}

.oh-process-head {
  max-width: 760px;
  margin-bottom: var(--space-2xl);
}

.oh-process-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap-columns);
  border-top: var(--rule-hair) solid var(--color-rule-2);
}

.oh-process-item {
  min-height: 280px;
  display: grid;
  align-content: space-between;
  gap: var(--space-lg);
  padding: var(--space-lg) 0;
  border-bottom: var(--rule-hair) solid var(--color-rule-2);
}

.oh-process-item + .oh-process-item {
  padding-left: var(--space-lg);
  border-left: var(--rule-hair) solid var(--color-rule-2);
}

.oh-close {
  padding: var(--section-gap-l) 0 var(--space-2xl);
  background: var(--color-ink);
  color: var(--color-paper);
}

.oh-close-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.74fr);
  gap: clamp(48px, 10vw, 160px);
  align-items: start;
}

.oh-close .oh-section-label {
  color: var(--color-accent);
}

.oh-close-copy > p:last-child {
  max-width: 45ch;
  margin-top: var(--space-lg);
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
}

.oh-close-card {
  padding: var(--space-lg);
  border: var(--rule-hair) solid color-mix(in oklab, var(--color-paper) 40%, transparent);
  border-radius: var(--radius-card);
  background: var(--color-board);
  color: var(--color-paper);
  box-shadow: var(--shadow-stock);
}

.oh-close-card .oh-field > span,
.oh-close-card .oh-goal-fieldset legend {
  color: var(--color-paper);
}

.oh-close-card .oh-goals {
  background: color-mix(in oklab, var(--color-ink) 30%, var(--color-board));
}

.oh-close-card .oh-goal label {
  color: color-mix(in oklab, var(--color-paper) 74%, transparent);
}

.oh-close-card .oh-goal input:checked + label {
  border-color: color-mix(in oklab, var(--color-paper) 56%, transparent);
  background: var(--color-ink);
  color: var(--color-paper);
}

.oh-close-card .oh-field input {
  border-color: color-mix(in oklab, var(--color-paper) 58%, transparent);
  background: var(--color-paper);
}

.oh-close-card .oh-helper,
.oh-close-card .oh-field small,
.oh-close-card .oh-form-status {
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
}

.oh-close-card .oh-form-status--error,
.oh-close-card .oh-field small:not(:empty) {
  color: var(--color-accent);
}

.oh-close-card .oh-form-status--success {
  color: var(--color-paper);
}

.oh-close-card .oh-button--primary {
  background: var(--color-paper);
  color: var(--color-ink);
}

.oh-close-card .oh-button--primary:hover {
  background: var(--color-cotton);
}

.oh-sticky-cta {
  position: sticky;
  bottom: 0;
  z-index: var(--z-sticky);
  margin-top: var(--section-gap);
  padding: var(--space-md) 0;
  border-top: var(--rule-hair) solid color-mix(in oklab, var(--color-paper) 28%, transparent);
  background: color-mix(in oklab, var(--color-ink) 94%, transparent);
}

.oh-sticky-inner {
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
  font-size: var(--text-sm);
}

.oh-footer {
  padding: var(--space-xl) 0;
  background: var(--color-ink);
  color: color-mix(in oklab, var(--color-paper) 72%, transparent);
}

.oh-footer-inner p {
  max-width: 48ch;
  font-size: var(--text-sm);
  text-align: right;
}

@media (prefers-reduced-motion: no-preference) {
  html.has-js [data-oh-reveal]:not([data-oh-in="true"]) {
    opacity: 0;
  }

  html.has-js [data-oh-reveal="rise"]:not([data-oh-in="true"]) {
    transform: translateY(var(--reveal-shift));
  }

  html.has-js [data-oh-reveal="mask"]:not([data-oh-in="true"]) {
    clip-path: inset(0 0 100% 0);
    transform: translateY(12px);
  }

  html.has-js [data-oh-reveal="settle"]:not([data-oh-in="true"]) {
    transform: translateY(24px) scale(0.97);
  }

  html.has-js [data-oh-reveal="draw"]:not([data-oh-in="true"]) {
    transform: translateY(18px);
  }

  [data-oh-reveal] {
    transition: opacity var(--dur-long) var(--ease-out-expo), transform var(--dur-long) var(--ease-out-expo), clip-path var(--dur-long) var(--ease-in-out);
    transition-delay: calc(var(--oh-index, 0) * var(--stagger));
  }

  [data-oh-reveal][data-oh-in="true"] {
    opacity: 1;
    clip-path: inset(0);
    transform: none;
  }

  [data-oh-hero="context"] { animation: oh-hero-rise var(--dur-hero) var(--ease-out-expo) both; }
  [data-oh-hero="headline"] { animation: oh-hero-rise var(--dur-hero) var(--ease-out-expo) 90ms both; }
  [data-oh-hero="lead"] { animation: oh-hero-rise var(--dur-hero) var(--ease-out-expo) 180ms both; }
  [data-oh-hero="note"] { animation: oh-hero-rise var(--dur-hero) var(--ease-out-expo) 260ms both; }
  [data-oh-hero="form"] { animation: oh-hero-settle var(--dur-hero) var(--ease-out-expo) 180ms both; }

  @keyframes oh-hero-rise {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes oh-hero-settle {
    from { opacity: 0; transform: translateY(30px) rotate(1deg); }
    to { opacity: 1; transform: none; }
  }
}

@media (max-width: 60rem) {
  :root {
    --gutter: 24px;
    --section-gap-s: 80px;
    --section-gap: 96px;
    --section-gap-l: 120px;
  }

  .oh-hero-grid,
  .oh-close-grid {
    grid-template-columns: 1fr;
  }

  .oh-hero {
    min-height: auto;
  }

  .oh-section-grid,
  .oh-fit-grid {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }

  .oh-fit-list {
    grid-column: auto;
  }
}

@media (max-width: 40rem) {
  :root {
    --gutter: 16px;
    --section-gap-s: 56px;
    --section-gap: 72px;
    --section-gap-l: 96px;
    --gap-columns: 16px;
  }

  html:has(.openhouse-body) {
    scroll-padding-top: 64px;
  }

  .oh-header-inner {
    min-height: 64px;
  }

  .oh-header-note {
    max-width: 16ch;
    font-size: 0.75rem;
    line-height: 1.25;
    text-align: right;
  }

  .oh-hero h1 {
    max-width: 9ch;
    font-size: clamp(3.25rem, 15vw, 5.5rem);
  }

  .oh-goals,
  .oh-field-grid,
  .oh-fit-list,
  .oh-process-list {
    grid-template-columns: 1fr;
  }

  .oh-process-item + .oh-process-item {
    padding-left: 0;
    border-left: 0;
  }

  .oh-hero-foot {
    display: grid;
    gap: var(--space-xs);
  }

  .oh-sticky-inner {
    align-items: stretch;
    flex-direction: column;
  }

  .oh-sticky-inner .oh-button {
    width: 100%;
  }

  .oh-footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }

  .oh-footer-inner p {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  html:has(.openhouse-body) {
    scroll-behavior: auto;
  }

  .oh-progress {
    transform: none;
  }

  [data-oh-reveal],
  [data-oh-hero] {
    opacity: 1;
    clip-path: none;
    transform: none;
    animation: none;
    transition: none;
  }

  .oh-threshold-light {
    transition: none;
  }
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/page.tsx">
<![CDATA[import { BookingClose } from "./sections/BookingClose";
import { Fit } from "./sections/Fit";
import { Hero } from "./sections/Hero";
import { Outcomes } from "./sections/Outcomes";
import { Process } from "./sections/Process";
import { Logo } from "./brand/Logo";
import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";

export default function OpenhousePage() {
  return (
    <div className="oh-site">
      <a className="oh-skip" href="#main">Skip to content</a>
      <div className="oh-progress" aria-hidden="true" />
      <header className="oh-header">
        <div className="oh-container oh-header-inner">
          <a className="oh-header-logo" href="#top" aria-label="Openhouse home">
            <Logo />
          </a>
          <span className="oh-header-note">Conversion pages for small teams</span>
        </div>
      </header>
      <main id="main">
        <Hero />
        <Outcomes />
        <Fit />
        <Process />
        <BookingClose />
      </main>
      <footer className="oh-footer">
        <div className="oh-container oh-footer-inner">
          <Logo compact />
          <p>Openhouse is a page template. The form is ready for your endpoint; nothing is sent yet.</p>
        </div>
      </footer>
      <Reveals />
      <ScrollVars />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/tokens.css">
<![CDATA[:root {
  color-scheme: light;
  --space-3xs: 2px;
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  --space-4xl: 144px;
  --text-xs: 0.8125rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5625rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-display-s: clamp(2.25rem, 4vw + 0.5rem, 3.75rem);
  --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
  --text-section: clamp(2rem, 2.5vw + 1rem, 3.5rem);
  --text-title: clamp(1.25rem, 0.75vw + 0.875rem, 1.625rem);
  --text-lead: clamp(1.125rem, 0.35vw + 1rem, 1.375rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);
  --dur-micro: 90ms;
  --dur-short: 220ms;
  --dur-base: 420ms;
  --dur-long: 800ms;
  --dur-hero: 1200ms;
  --reveal-shift: 28px;
  --stagger: 70ms;
  --container: 1440px;
  --gutter: 64px;
  --gap-columns: 32px;
  --section-gap-s: 120px;
  --section-gap: 144px;
  --section-gap-l: 176px;
  --z-base: 1;
  --z-raised: 10;
  --z-sticky: 200;
  --z-sticky-nav: 300;
  --z-toast: 500;

  /* Hallmark palette: paper, ink, one warm signal, and the desk material. */
  --color-paper: #f7f2e9;
  --color-paper-2: #eee6d9;
  --color-paper-3: #e6dacb;
  --color-ink: #171414;
  --color-ink-2: #2a2521;
  --color-muted: #6b6359;
  --color-rule: #d7cdbf;
  --color-rule-2: #c7b9a8;
  --color-accent: #d86b4a;
  --color-accent-ink: #171414;
  --color-accent-2: #a9472e;
  --color-focus: #a9472e;
  --color-cotton: #fff9f0;
  --color-desk: #ede5da;
  --color-print: #1d1917;
  --color-board: #344a3e;
  --color-board-type: #f7f2e9;
  --color-error: #a9472e;
  --color-success: #3e7658;
  --radius-card: 8px;
  --radius-input: 6px;
  --radius-pill: 999px;
  --radius-stock: 8px;
  --rule-hair: 1px;
  --shadow-card: 0 1px 2px rgb(23 20 20 / 5%);
  --shadow-stock: 6px 5px 10px -6px rgb(23 20 20 / 30%);
  --shadow-stock-lift: 12px 10px 18px -8px rgb(23 20 20 / 30%);
  --press-groove: inset 1px 1.5px 2px rgb(23 20 20 / 16%), inset -1px -1px 0 rgb(255 249 240 / 90%), 0 0 0 0.5px rgb(23 20 20 / 20%);
  --tracking-display: -0.03em;
  --display-weight: 600;
  --font-display: var(--font-openhouse-sans), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-openhouse-sans), ui-sans-serif, system-ui, sans-serif;
  --font-outlier: var(--font-openhouse-mono), ui-monospace, monospace;
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/brand/Logo.tsx">
<![CDATA[type LogoProps = { compact?: boolean };

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`oh-logo${compact ? " oh-logo--compact" : ""}`}>
      <svg className="oh-logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 27V8.5C6 6.6 7.6 5 9.5 5h13C24.4 5 26 6.6 26 8.5V27" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 27V13h12v14" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 13v14" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>
      <span className="oh-logo-word">openhouse</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/forms/booking.ts">
<![CDATA[export type BookingValues = { name: string; email: string; goal: string };

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};
  if (!values.name.trim()) errors.name = "Add your name so the invitation has a person on it.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Use an email address we can reply to.";
  if (!values.goal) errors.goal = "Choose the work you want the page to do.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/forms/BookingForm.tsx">
<![CDATA["use client";

import { FormEvent, useState } from "react";
import { validateBooking, type BookingValues } from "./booking";

const goals = [
  ["calendar", "Fill my calendar"],
  ["enquiries", "Capture enquiries"],
  ["service", "Sell one service"],
] as const;

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<BookingValues>({ name: "", email: "", goal: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const update = (key: keyof BookingValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBooking(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <form className={`oh-booking-form${compact ? " oh-booking-form--compact" : ""}`} onSubmit={submit} noValidate>
      <fieldset className="oh-goal-fieldset" aria-describedby={errors.goal ? "oh-goal-error" : undefined}>
        <legend>What should the page help you do?</legend>
        <div className="oh-goals">
          {goals.map(([value, label]) => (
            <span className="oh-goal" key={value}>
              <input
                id={`oh-goal-${value}${compact ? "-compact" : ""}`}
                name="goal"
                type="radio"
                value={value}
                checked={values.goal === value}
                onChange={(event) => update("goal", event.target.value)}
              />
              <label htmlFor={`oh-goal-${value}${compact ? "-compact" : ""}`}>{label}</label>
            </span>
          ))}
        </div>
        <span className="oh-helper" id="oh-goal-error">{errors.goal ?? "Pick the one result that matters first."}</span>
      </fieldset>

      <div className="oh-field-grid">
        <label className="oh-field">
          <span>Your name <b>(required)</b></span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="oh-name-help"
          />
          <small id="oh-name-help">{errors.name ?? ""}</small>
        </label>
        <label className="oh-field">
          <span>Work email <b>(required)</b></span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="oh-email-help"
          />
          <small id="oh-email-help">{errors.email ?? ""}</small>
        </label>
      </div>

      <button className="oh-button oh-button--primary" type="submit" disabled={status === "success"} aria-busy={status === "error"}>
        {status === "success" ? "Door is open" : "Book my 20-minute call"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className={`oh-form-status oh-form-status--${status}`} aria-live="polite">
        {status === "success" ? "Ready to connect. Nothing was sent; this template is not connected yet." : status === "error" ? "One detail still needs your attention." : "No pitch. Just a clear next step."}
      </p>
    </form>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-js");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-oh-reveal]"));
    const reveal = (node: HTMLElement) => node.dataset.ohIn = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return () => root.classList.remove("has-js");
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          instance.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    const revealNearViewport = () => {
      const cutoff = window.innerHeight * 1.25;
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top < cutoff) reveal(node);
      });
    };
    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", revealNearViewport, { passive: true });
    revealNearViewport();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealNearViewport);
      root.classList.remove("has-js");
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/motion/ScrollVars.tsx">
<![CDATA["use client";

import { useEffect } from "react";

export function ScrollVars() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--oh-progress", String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/sections/BookingClose.tsx">
<![CDATA[import { BookingForm } from "../forms/BookingForm";

export function BookingClose() {
  return (
    <section className="oh-close" id="close">
      <div className="oh-container oh-close-grid">
        <div className="oh-close-copy" data-oh-reveal="mask">
          <h2>Bring the work. We will bring the questions.</h2>
          <p>One short call, then a page your visitors can understand and your team can answer.</p>
        </div>
        <div className="oh-close-card" data-oh-reveal="settle">
          <BookingForm compact />
        </div>
      </div>
      <div className="oh-sticky-cta">
        <div className="oh-container oh-sticky-inner">
          <span>One clear action starts here.</span>
          <a className="oh-button oh-button--primary" href="#booking">Book my 20-minute call <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/sections/Fit.tsx">
<![CDATA[import type { CSSProperties } from "react";

const fits = [
  ["Service business", "For work that starts with a conversation."],
  ["Local shop", "For a place people should choose today."],
  ["Specialist practice", "For expertise that needs a calm first step."],
] as const;

export function Fit() {
  return (
    <section className="oh-section oh-section--board" id="fit">
      <div className="oh-container oh-fit-grid">
        <div data-oh-reveal="mask">
          <h2>Warm enough to welcome. Clear enough to act.</h2>
        </div>
        <div className="oh-fit-side" data-oh-reveal="rise">
          <p>OPENHOUSE is for teams with a real offer and a real person on the other side of the form.</p>
          <p className="oh-fit-rule">If a stranger can understand the value in one sentence, this is a good place to begin.</p>
        </div>
        <div className="oh-fit-list">
          {fits.map(([title, copy], index) => (
            <article className="oh-fit-item" data-oh-reveal="settle" style={{ "--oh-index": index } as CSSProperties} key={title}>
              <span className="oh-fit-marker">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/sections/Hero.tsx">
<![CDATA[import { BookingForm } from "../forms/BookingForm";

export function Hero() {
  return (
    <section className="oh-hero" id="top">
      <div className="oh-container oh-hero-grid">
        <div className="oh-hero-copy">
          <p className="oh-context" data-oh-hero="context">A focused page for owner-led businesses</p>
          <h1 data-oh-hero="headline">Turn more first clicks into good conversations.</h1>
          <p className="oh-lead" data-oh-hero="lead">A clear offer and one next step that feels easy.</p>
          <p className="oh-hero-note" data-oh-hero="note">Book a 20-minute call. Leave with page direction.</p>
        </div>
        <div className="oh-threshold" data-oh-hero="form" id="booking">
          <div className="oh-threshold-light" aria-hidden="true" />
          <div className="oh-threshold-head">
            <span className="oh-threshold-label">The front desk</span>
            <span className="oh-door-status"><i aria-hidden="true" /> Ready when you are</span>
          </div>
          <div className="oh-threshold-copy">
            <h2>Open the right invitation.</h2>
            <p>Tell us what the next page needs to do. We will bring the useful questions.</p>
          </div>
          <BookingForm />
        </div>
      </div>
      <div className="oh-hero-foot oh-container" aria-hidden="true">
        <span>One action</span><span>Short form</span><span>Clear handoff</span>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/sections/Outcomes.tsx">
<![CDATA[import type { CSSProperties } from "react";

const outcomes = [
  ["01", "One offer", "The sentence a new visitor should understand before they scroll."],
  ["02", "One path", "The few fields and choices that help the right person keep moving."],
  ["03", "One handoff", "The next step your team can actually answer when the page is live."],
] as const;

export function Outcomes() {
  return (
    <section className="oh-section oh-section--paper" id="outcomes">
      <div className="oh-container oh-section-grid">
        <div className="oh-section-intro" data-oh-reveal="rise">
          <h2>Make the next step feel obvious.</h2>
          <p className="oh-section-lead">Small businesses do not need more noise. They need a page that helps the right visitor decide.</p>
        </div>
        <div className="oh-outcome-list">
          {outcomes.map(([number, title, copy], index) => (
            <article className="oh-outcome" data-oh-reveal="draw" style={{ "--oh-index": index } as CSSProperties} key={number}>
              <span className="oh-outcome-number">{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <span className="oh-outcome-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(openhouse)/openhouse/sections/Process.tsx">
<![CDATA[import type { CSSProperties } from "react";

const process = [
  ["Welcome", "We read the brief and find the sentence worth leading with."],
  ["Listen", "We pressure-test the offer against the questions a good lead asks."],
  ["Invite", "We turn the answer into one page and one action your team can own."],
] as const;

export function Process() {
  return (
    <section className="oh-section oh-section--desk" id="process">
      <div className="oh-container">
        <div className="oh-process-head" data-oh-reveal="rise">
          <h2>The welcome, the question, the next step.</h2>
        </div>
        <div className="oh-process-list">
          {process.map(([title, copy], index) => (
            <article className="oh-process-item" data-oh-reveal="draw" style={{ "--oh-index": index } as CSSProperties} key={title}>
              <span className="oh-process-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
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
