<template slug="alpine-reel" name="Alpine Reel">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(alpine-reel)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./alpine-reel/alpine-reel.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Alpine Reel — Fourteen peaks. One moving frame.",
  description: "A cinematic horizontal reel through the fourteen eight-thousanders.",
  icons: { icon: "/templates/alpine-reel/icon.svg" },
};

export default function AlpineReelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>
      <body className="arl-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/alpine-reel.css">
<![CDATA[/* Hallmark · shape: horizontal reel · genre: atmospheric · theme: Cold Cinema · hero: full-bleed stage · surface: absolute · posture: committed · signature: door-tilt peak dossier · v2.0.0 */
/* Hallmark · pre-emit critique: P4 H4 E4 S4 R4 V4 · weakest: E, remote stills are supplied by the brief until local processed media arrives */
/* Hallmark · answered F8 · the reel is the scroll story; the panel is the only modal and the only high-intensity handoff */
/* Hallmark · waive 7b · pure snow ink is the material specification · high contrast keeps facts legible on abyss */
/* Hallmark · waive 24b · half-step offsets are intentional · the supplied art direction uses film-frame rhythm */
/* Hallmark · waive 38iii · ice-blue second line is intentional · it identifies the active peak signature */
@import "tailwindcss";

:root {
  --arl-abyss: #040B16;
  --arl-navy: #08162A;
  --arl-ice: #6EA8D2;
  --arl-snow: #FFFFFF;
  --arl-ink-soft: color-mix(in srgb, var(--arl-snow) 78%, transparent);
  --arl-ink-muted: color-mix(in srgb, var(--arl-snow) 56%, transparent);
  --arl-ink-faint: color-mix(in srgb, var(--arl-snow) 24%, transparent);
  --arl-line: color-mix(in srgb, var(--arl-snow) 15%, transparent);
  --arl-pad-y: 7.5dvh;
  --arl-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --arl-ease-door: cubic-bezier(0.22, 1, 0.36, 1);
  --arl-ease-settle: cubic-bezier(0.65, 0, 0.35, 1);
  --arl-dur-fast: 180ms;
  --arl-dur-base: 420ms;
  --arl-dur-door: 700ms;
  --arl-dur-reveal: 900ms;
  --arl-scan-opacity: 0;
  --arl-initial-transform: translate3d(calc(10vw - 29 * 85vw), 0, 0);
  --font-arl-display: var(--font-playfair), Georgia, serif;
  --font-arl-body: var(--font-geist-sans), ui-sans-serif, sans-serif;
  --font-arl-mono: var(--font-geist-mono), ui-monospace, monospace;
  --font-outlier: var(--font-geist-mono), ui-monospace, monospace;
}

html,
body {
  overflow-x: clip;
}

body {
  margin: 0;
  background: var(--arl-abyss);
  color: var(--arl-snow);
  font-family: var(--font-arl-body);
  -webkit-font-smoothing: antialiased;
  font-synthesis: none;
}

body[data-arl-modal="open"] {
  overflow: clip;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--arl-ice);
  outline-offset: 4px;
}

.arl-reel {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  isolation: isolate;
  overflow: clip;
  background: var(--arl-abyss);
  color: var(--arl-snow);
  cursor: none;
  user-select: none;
  touch-action: none;
}

.arl-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: clip;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.arl-defs {
  position: absolute;
  pointer-events: none;
}

.arl-header {
  position: absolute;
  inset: 0 0 auto;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 3.2dvh 5dvh;
  color: var(--arl-ink-soft);
  pointer-events: none;
}

.arl-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--arl-snow);
  font-family: var(--font-arl-display);
  font-size: clamp(17px, 1.8vw, 24px);
  line-height: 1;
  letter-spacing: -0.03em;
}

.arl-logo__text span {
  font-style: italic;
}

.arl-mark {
  width: 36px;
  height: 36px;
  color: currentColor;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.arl-mark circle:last-child {
  fill: var(--arl-ice);
  stroke: var(--arl-ice);
}

.arl-mark--compact {
  width: 28px;
  height: 28px;
}

.arl-header__right {
  display: flex;
  align-items: center;
  gap: 24px;
  font: 500 10px/1 var(--font-arl-mono);
}

.arl-header__hint {
  color: var(--arl-ink-muted);
}

.arl-stage {
  position: absolute;
  inset: 0;
  overflow: clip;
}

.arl-reel[data-intro="true"][data-enhanced="true"] .arl-stage {
  filter: url(#arl-motion-blur);
}

.arl-track {
  position: absolute;
  inset: var(--arl-pad-y) auto var(--arl-pad-y) 0;
  display: flex;
  align-items: stretch;
  width: max-content;
  will-change: transform;
  transform: var(--arl-initial-transform);
}

.arl-slide {
  position: relative;
  flex: 0 0 80vw;
  width: 80vw;
  height: 100%;
  margin-right: 5vw;
  perspective: 2000px;
  content-visibility: auto;
  contain-intrinsic-size: auto 80vw auto 100dvh;
}

.arl-slide__inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: clip;
  border: 1px solid var(--arl-line);
  border-radius: clamp(24px, 3.3vw, 48px);
  background: var(--arl-navy);
  transform-origin: 0% 50%;
  transition: transform var(--arl-dur-door) var(--arl-ease-door), box-shadow var(--arl-dur-door) var(--arl-ease-door);
}

.arl-slide[data-open="true"] .arl-slide__inner {
  transform: rotateY(15deg);
}

.arl-slide__image {
  position: absolute;
  inset: 0;
  width: 120vw;
  height: 100%;
  margin-left: -20vw;
  transform: translate3d(var(--arl-parallax, 0px), 0, 0) scale(1.03);
}

.arl-slide[data-active="true"] .arl-slide__image {
  will-change: transform;
}

.arl-slide__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%) contrast(1.12) brightness(0.84);
  user-select: none;
  pointer-events: none;
}

.arl-slide__tint,
.arl-slide__vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.arl-slide__tint {
  background: color-mix(in srgb, var(--arl-navy) 62%, transparent);
  mix-blend-mode: color;
}

.arl-slide__vignette {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--arl-abyss) 70%, transparent) 0%, transparent 30%, color-mix(in srgb, var(--arl-abyss) 58%, transparent) 100%),
    radial-gradient(ellipse at 50% 48%, transparent 10%, color-mix(in srgb, var(--arl-abyss) 44%, transparent) 100%);
}

.arl-slide__content {
  position: absolute;
  inset: 0;
  display: block;
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0);
  transition: opacity var(--arl-dur-reveal) var(--arl-ease-out), transform var(--arl-dur-reveal) var(--arl-ease-out), filter var(--arl-dur-reveal) var(--arl-ease-out);
  pointer-events: none;
}

.arl-reel[data-enhanced="true"] .arl-slide[data-active="true"] .arl-slide__content {
  opacity: var(--arl-content-opacity, 1);
  transform: translate3d(var(--arl-content-x, 0px), 0, 0);
  filter: blur(var(--arl-content-blur, 0px));
}

.arl-reel[data-intro="true"][data-js] .arl-slide .arl-slide__content {
  opacity: 0;
}

.arl-slide__topline {
  position: absolute;
  top: 5.5dvh;
  left: 6dvh;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.arl-year {
  color: var(--arl-snow);
  font: italic 600 clamp(1.35rem, 2.3dvh, 2.5rem)/1 var(--font-arl-display);
}

.arl-eyebrow {
  display: grid;
  gap: 3px;
  max-width: 20ch;
  color: var(--arl-ink-soft);
  font: 500 10px/1.3 var(--font-arl-mono);
}

.arl-badge {
  display: grid;
  gap: 2px;
  margin-left: 5px;
  padding: 8px 10px 7px;
  border: 1px solid var(--arl-ink-faint);
  border-radius: 999px;
  color: var(--arl-snow);
  font: 500 10px/1 var(--font-arl-mono);
  text-align: center;
}

.arl-badge small {
  color: var(--arl-ink-muted);
  font-size: 8px;
}

.arl-slide__title-block {
  position: absolute;
  left: 6dvh;
  bottom: 9dvh;
  max-width: min(45vw, 620px);
}

.arl-range {
  margin: 0 0 14px;
  color: var(--arl-ink-muted);
  font: 500 10px/1 var(--font-arl-mono);
}

.arl-slide h2 {
  display: grid;
  gap: 0;
  margin: 0;
  color: var(--arl-snow);
  font: 600 clamp(3.25rem, 9.2dvh, 9rem)/0.86 var(--font-arl-display);
  letter-spacing: -0.045em;
  text-transform: uppercase;
  text-wrap: balance;
  overflow-wrap: break-word;
  min-width: 0;
}

.arl-slide h2 span:last-child {
  color: var(--arl-ice);
}

.arl-ascent-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 22px;
  color: var(--arl-ink-soft);
  font: 500 10px/1.45 var(--font-arl-mono);
}

.arl-ascent-row span {
  display: grid;
  gap: 4px;
}

.arl-ascent-row b {
  color: var(--arl-ink-muted);
  font-weight: 400;
}

.arl-slide__awards {
  position: absolute;
  top: 50%;
  right: 6dvh;
  display: grid;
  gap: 15px;
  width: min(26vw, 330px);
  transform: translateY(-50%);
}

.arl-award {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px 10px;
  align-items: baseline;
  min-width: 0;
}

.arl-stars {
  display: inline-flex;
  gap: 2px;
  color: var(--arl-ink-faint);
  font-size: 10px;
}

.arl-stars span[data-filled="true"] {
  color: var(--arl-ice);
}

.arl-award__label {
  color: var(--arl-ink-soft);
  font: 500 9px/1.2 var(--font-arl-mono);
}

.arl-award__quote {
  grid-column: 2;
  color: var(--arl-ink-muted);
  font: italic 400 12px/1.25 var(--font-arl-display);
}

.arl-explore {
  position: absolute;
  right: 6dvh;
  bottom: 5dvh;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid var(--arl-ink-faint);
  border-radius: 999px;
  background: color-mix(in srgb, var(--arl-navy) 50%, transparent);
  color: var(--arl-snow);
  font: 500 10px/1 var(--font-arl-mono);
  pointer-events: auto;
  cursor: pointer;
  transition: transform var(--arl-dur-fast) var(--arl-ease-out), border-color var(--arl-dur-fast) var(--arl-ease-out), background-color var(--arl-dur-fast) var(--arl-ease-out), box-shadow var(--arl-dur-base) var(--arl-ease-out);
}

.arl-explore span:last-child {
  color: var(--arl-ice);
  font-size: 18px;
  line-height: 1;
  transition: transform var(--arl-dur-fast) var(--arl-ease-out);
}

.arl-explore:hover {
  transform: translateY(-4px);
  border-color: var(--arl-snow);
  background: color-mix(in srgb, var(--arl-snow) 12%, transparent);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--arl-abyss) 65%, transparent);
}

.arl-explore:hover span:last-child {
  transform: translate(3px, -3px);
}

.arl-explore:active {
  transform: translateY(0) scale(0.96);
}

.arl-mask {
  position: absolute;
  inset-block: 0;
  z-index: 30;
  width: 10vw;
  pointer-events: none;
}

.arl-mask--left {
  left: 0;
  background: linear-gradient(90deg, var(--arl-abyss) 0%, color-mix(in srgb, var(--arl-abyss) 0%, transparent) 100%);
}

.arl-mask--right {
  right: 0;
  background: linear-gradient(270deg, var(--arl-abyss) 0%, color-mix(in srgb, var(--arl-abyss) 0%, transparent) 100%);
}

.arl-scanlines {
  position: absolute;
  inset: 0;
  z-index: 35;
  pointer-events: none;
  opacity: var(--arl-scan-opacity);
  background: repeating-linear-gradient(90deg, color-mix(in srgb, var(--arl-snow) 6%, transparent) 0 1px, transparent 1px 3px);
  mix-blend-mode: screen;
}

.arl-cursor {
  position: fixed;
  z-index: 80;
  top: -52px;
  left: -52px;
  display: grid;
  width: 104px;
  height: 104px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--arl-snow) 45%, transparent);
  border-radius: 50%;
  color: var(--arl-snow);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--arl-dur-fast) ease, transform 90ms linear;
}

.arl-cursor[data-visible="true"] {
  opacity: 1;
}

.arl-reel:has(.arl-details[data-open="true"]) .arl-cursor,
body[data-arl-modal="open"] .arl-cursor {
  opacity: 0;
  display: none;
}

.arl-reel:has(.arl-details[data-open="true"]),
body[data-arl-modal="open"] .arl-reel {
  cursor: default;
}

.arl-cursor[data-pressed="true"] {
  transform: translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0) scale(1.12);
}

.arl-cursor__label {
  font: 500 9px/1 var(--font-arl-mono);
  transition: opacity var(--arl-dur-fast) var(--arl-ease-out);
}

.arl-cursor[data-zone="left"] .arl-cursor__label,
.arl-cursor[data-zone="right"] .arl-cursor__label {
  opacity: 0;
}

.arl-cursor__chevron {
  position: absolute;
  top: 50%;
  color: var(--arl-ice);
  font: 400 26px/1 var(--font-arl-display);
  opacity: 1;
  color: transparent;
  transform: translateY(-50%);
  transition: opacity var(--arl-dur-fast) var(--arl-ease-out), transform var(--arl-dur-fast) var(--arl-ease-out);
}

.arl-cursor__chevron--left { left: 12px; }
.arl-cursor__chevron--right { right: 12px; }
.arl-cursor[data-zone="left"] .arl-cursor__chevron--left,
.arl-cursor[data-zone="right"] .arl-cursor__chevron--right { opacity: 1; color: var(--arl-ice); }

.arl-indicator {
  position: absolute;
  left: 50%;
  bottom: 2.5dvh;
  z-index: 45;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--arl-ink-muted);
  font: italic 400 12px/1 var(--font-arl-display);
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity var(--arl-dur-base) var(--arl-ease-out);
}

.arl-indicator[data-hidden="true"] {
  opacity: 0;
}

.arl-indicator__pips {
  display: flex;
  align-items: center;
  gap: 0;
  pointer-events: auto;
}

.arl-indicator button {
  display: grid;
  width: 18px;
  height: 20px;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.arl-indicator i {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--arl-ink-faint);
  transform: scale(0.66);
  transition: transform var(--arl-dur-base) var(--arl-ease-out), background-color var(--arl-dur-base) var(--arl-ease-out);
}

.arl-indicator i[data-active="true"] {
  transform: scale(1);
  background: var(--arl-snow);
}

.arl-readout {
  position: absolute;
  right: 5dvh;
  bottom: 2.7dvh;
  z-index: 44;
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: var(--arl-ink-muted);
  font: 500 10px/1 var(--font-arl-mono);
}

.arl-readout span,
.arl-readout small {
  color: var(--arl-ice);
}

.arl-readout b {
  color: var(--arl-snow);
  font-weight: 500;
}

.arl-readout small {
  font-size: 9px;
}

.arl-backdrop {
  position: absolute;
  inset: var(--arl-pad-y) 10vw var(--arl-pad-y) 10vw;
  z-index: 60;
  width: 80vw;
  padding: 0;
  border: 0;
  border-radius: clamp(24px, 3.3vw, 48px);
  background: color-mix(in srgb, var(--arl-abyss) 48%, transparent);
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(0);
  cursor: pointer;
  transition: opacity 600ms var(--arl-ease-door), backdrop-filter 600ms var(--arl-ease-door);
}

.arl-backdrop[data-open="true"] {
  opacity: 1;
  pointer-events: auto;
  backdrop-filter: blur(14px);
}

.arl-details {
  position: absolute;
  inset: var(--arl-pad-y) var(--arl-pad-y) var(--arl-pad-y) auto;
  z-index: 70;
  width: min(640px, 52%);
  overflow: clip;
  border: 0;
  border-radius: clamp(24px, 3.3vw, 48px);
  background: linear-gradient(180deg, color-mix(in srgb, var(--arl-navy) 90%, transparent) 0%, color-mix(in srgb, var(--arl-abyss) 96%, transparent) 100%);
  box-shadow: -30px 0 80px color-mix(in srgb, var(--arl-abyss) 80%, transparent);
  transform: translate3d(calc(100% + 10vw), 0, 0);
  transition: transform var(--arl-dur-door) var(--arl-ease-door);
  pointer-events: none;
  cursor: default;
  user-select: text;
}

.arl-details[data-open="true"] {
  transform: translate3d(0, 0, 0);
  pointer-events: auto;
}

.arl-details__scroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  cursor: default;
}

.arl-details__scroll:focus {
  outline: none;
}

.arl-details__scroll:focus-visible {
  outline: 1px solid var(--arl-line);
  outline-offset: -1px;
}

.arl-details,
.arl-details *,
.arl-details__scroll,
.arl-details__scroll * {
  cursor: default;
}

.arl-details button,
.arl-details button *,
.arl-details a,
.arl-details a *,
.arl-details__close,
.arl-details__close * {
  cursor: pointer;
}

.arl-details__image {
  position: relative;
  height: 35dvh;
  flex: none;
}

.arl-details__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.12) brightness(0.9);
}

.arl-details__image div {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 20%, var(--arl-abyss) 100%);
}

.arl-details__body {
  padding: 1dvh 3.5dvh 4dvh;
}

.arl-details__eyebrow {
  margin: 0;
  color: var(--arl-ink-muted);
  font: 500 10px/1.35 var(--font-arl-mono);
}

.arl-details h2 {
  display: grid;
  margin: 12px 0 0;
  color: var(--arl-snow);
  font: 600 clamp(2.5rem, 5.8dvh, 4rem)/0.88 var(--font-arl-display);
  letter-spacing: -0.045em;
  text-transform: uppercase;
  text-wrap: balance;
}

.arl-details h2 span:last-child {
}

.arl-details__meta {
  margin: 16px 0 0;
  color: var(--arl-ink-soft);
  font: 500 10px/1.4 var(--font-arl-mono);
}

.arl-details hr {
  height: 1px;
  margin: 24px 0;
  border: 0;
  background: var(--arl-line);
}

.arl-details__description {
  margin: 0;
  color: var(--arl-ink-soft);
  font: italic 400 16px/1.65 var(--font-arl-display);
}

.arl-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px 18px;
}

.arl-stat {
  display: grid;
  gap: 7px;
  min-width: 0;
}

.arl-stat span {
  color: var(--arl-ink-muted);
  font: 500 9px/1.2 var(--font-arl-mono);
}

.arl-stat strong {
  color: var(--arl-snow);
  font: 500 18px/1 var(--font-arl-display);
  overflow-wrap: anywhere;
}

.arl-stat--country {
  margin-top: 20px;
}

.arl-stat--country strong {
  font-family: var(--font-arl-mono);
  font-size: 11px;
}

.arl-awards-list {
  display: grid;
  gap: 13px;
}

.arl-awards-list .arl-award__quote {
  color: var(--arl-ink-soft);
}

.arl-details__close {
  position: absolute;
  top: 3dvh;
  right: 3dvh;
  z-index: 2;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  padding: 0;
  border: 1px solid var(--arl-ink-faint);
  border-radius: 50%;
  background: color-mix(in srgb, var(--arl-abyss) 65%, transparent);
  cursor: pointer;
  transition: transform var(--arl-dur-fast) var(--arl-ease-out), background-color var(--arl-dur-fast) var(--arl-ease-out);
}

.arl-details__close:hover {
  transform: rotate(90deg);
  background: color-mix(in srgb, var(--arl-ice) 22%, transparent);
}

.arl-details__close span {
  position: absolute;
  width: 14px;
  height: 1px;
  background: var(--arl-snow);
  transform: rotate(45deg);
}

.arl-details__close span:last-child {
  transform: rotate(-45deg);
}

@media (max-width: 800px) {
  :root { --arl-pad-y: 2dvh; --arl-initial-transform: translate3d(calc(7vw - 29 * 90vw), 0, 0); }
  .arl-header { padding: 2.4dvh 3dvh; }
  .arl-header__hint { display: none; }
  .arl-slide { flex-basis: 86vw; width: 86vw; margin-right: 4vw; }
  .arl-slide__topline { top: 3dvh; left: 3dvh; gap: 10px; }
  .arl-slide__title-block { left: 3dvh; bottom: 9dvh; max-width: 76vw; }
  .arl-slide h2 { font-size: clamp(2rem, 6.4dvh, 3.7rem); }
  .arl-range { margin-bottom: 10px; font-size: 8px; }
  .arl-eyebrow { font-size: 8px; }
  .arl-badge { display: none; }
  .arl-slide__awards { display: none; }
  .arl-explore { right: 3dvh; bottom: 3dvh; min-height: 44px; padding-inline: 17px; font-size: 9px; }
  .arl-readout { right: 3dvh; bottom: 2.8dvh; display: none; }
  .arl-indicator { bottom: 2.2dvh; gap: 8px; }
  .arl-indicator__pips button { width: 24px; height: 24px; }
  .arl-header__right,
  .arl-eyebrow,
  .arl-range,
  .arl-ascent-row,
  .arl-award__label,
  .arl-explore,
  .arl-cursor__label,
  .arl-readout,
  .arl-details__eyebrow,
  .arl-details__meta,
  .arl-stat span,
  .arl-stat--country strong { font-size: 12px; }
  .arl-cursor { display: none; }
  .arl-details { inset: var(--arl-pad-y) 3dvh var(--arl-pad-y) auto; width: 80vw; }
  .arl-details__body { padding-inline: 3dvh; }
  .arl-details__description { font-size: 15px; }
  .arl-stats-grid { gap: 16px 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .arl-reel { cursor: auto; touch-action: auto; }
  .arl-track { transform: var(--arl-initial-transform); }
  .arl-reel[data-reduced="true"] .arl-slide__content,
  .arl-reel[data-enhanced="true"] .arl-slide[data-active="true"] .arl-slide__content { opacity: 1; transform: none; filter: none; }
  .arl-cursor { display: none; }
  .arl-slide[data-open="true"] .arl-slide__inner { transform: none; }
  .arl-slide__inner,
  .arl-slide__content,
  .arl-details,
  .arl-backdrop,
  .arl-explore,
  .arl-indicator,
  .arl-indicator i { transition-duration: 1ms; }
  .arl-scanlines { display: none; }
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts — do not edit by hand.
export const ASSETS: Record<string, { w: number; h: number }> = {
  "annapurna-i": { "w": 1376, "h": 768 },
  "broad-peak": { "w": 1376, "h": 768 },
  "cho-oyu": { "w": 1376, "h": 768 },
  "dhaulagiri-i": { "w": 1376, "h": 768 },
  "gasherbrum-i": { "w": 1376, "h": 768 },
  "gasherbrum-ii": { "w": 1376, "h": 768 },
  "k2-godwin-austen": { "w": 1376, "h": 768 },
  "kangchenjunga": { "w": 1376, "h": 768 },
  "lhotse": { "w": 1376, "h": 768 },
  "makalu": { "w": 1376, "h": 768 },
  "manaslu": { "w": 1376, "h": 768 },
  "mount-everest": { "w": 1376, "h": 768 },
  "nanga-parbat": { "w": 1376, "h": 768 },
  "shishapangma": { "w": 1376, "h": 768 },
};
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/alpine-reel";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`arl-placeholder ${className}`} role="img" aria-label={alt} data-asset={assetKey}><span>{assetKey}</span></div>;
  const asset = ASSETS[assetKey];
  return <img className={className} src={source} srcSet={`${source} 800w, ${assetSrc(assetKey, 1600)} 1600w`} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} />;
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#040B16"/>
  <circle cx="32" cy="32" r="22" fill="none" stroke="#FFFFFF" stroke-width="2"/>
  <path d="M11 43 24 26 32 36 42 21 54 43" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 51h20" stroke="#6EA8D2" stroke-width="3" stroke-linecap="round"/>
  <circle cx="49" cy="17" r="4" fill="#6EA8D2"/>
</svg>
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const alt = "Alpine Reel — Fourteen peaks. One moving frame.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
const ABYSS = "#040B16";
const NAVY = "#08162A";
const ICE = "#6EA8D2";
const SNOW = "#FFFFFF";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: ABYSS, color: SNOW, position: "relative", overflow: "hidden" }}>
      <svg aria-hidden="true" width="1200" height="520" viewBox="0 0 1200 520" style={{ position: "absolute", left: 0, bottom: 0 }}>
        <path d="M0 520V370l145-112 90 68 120-185 96 88 110-150 72 92 102-54 90 142 104-76 170 96 101-77v338Z" fill={NAVY} />
        <path d="m328 141 27-40 34 45-21-11-18 23Z M738 142l16-28 27 36-20-11-12 16Z" fill={SNOW} opacity=".8" />
        <path d="M0 458 180 366l105 46 135-128 126 94 120-102 155 90 180-88 119 82v160H0Z" fill={ICE} opacity=".34" />
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>ALPINE REEL</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 0.9, letterSpacing: -3 }}>Fourteen peaks.</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 0.9, letterSpacing: -3, color: ICE }}>One moving frame.</div>
        <div style={{ display: "flex", marginTop: 18, fontSize: 19, letterSpacing: 3, opacity: .7 }}>THE EIGHT-THOUSANDERS · 01 / 14</div>
      </div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/page.tsx">
<![CDATA[import CinemaReel from "./sections/CinemaReel";

export default function AlpineReelPage() {
  return <CinemaReel />;
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox={compact ? "0 0 80 80" : "0 0 360 80"} role="img" aria-label="Alpine Reel" aria-hidden={compact ? "true" : undefined} className={compact ? "arl-brand-mark" : "arl-brand-lockup"}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="40" r="27" />
        <path d="M13 52 28 32 40 45 53 24 67 52" />
        <path d="M26 63h28" />
      </g>
      <circle cx="61" cy="20" r="4" fill="var(--arl-ice)" />
      {!compact && <text x="92" y="52" fill="currentColor" fontFamily="var(--font-arl-display)" fontSize="42" letterSpacing="-1.6">ALPINE REEL</text>}
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/mechanic/deck.ts">
<![CDATA[export const LOOP_COPIES = 5;
export const SLIDE_WIDTH_VW = 80;
export const SLIDE_GAP_VW = 5;
export const PITCH_VW = SLIDE_WIDTH_VW + SLIDE_GAP_VW;
export const AUTO_START_INDEX = 1;
export const AUTO_END_INDEX = 0;
export const DRAG_THRESHOLD = 0.14;

export function wrapIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function targetX(leftPadPx: number, pitchPx: number, index: number): number {
  return leftPadPx - index * pitchPx;
}

export function springStep(current: number, target: number, factor = 0.11): number {
  return current + (target - current) * factor;
}

export function parallaxOffset(deltaX: number, ratio = 1.2): number {
  if (ratio <= 0) return 0;
  return -deltaX / ratio;
}

export function smoothstep(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

export function indexForDrag(deltaX: number, viewportWidth: number, current: number, total: number, threshold = DRAG_THRESHOLD): number {
  if (viewportWidth <= 0 || Math.abs(deltaX) < viewportWidth * threshold) return current;
  return wrapIndex(current + (deltaX < 0 ? 1 : -1), total);
}

export function indexForWheel(current: number, delta: number, pitchPx: number, total: number): number {
  if (pitchPx <= 0 || delta === 0) return current;
  return wrapIndex(current + (delta > 0 ? 1 : -1), total);
}

export function contentProgress(deltaX: number, slideWidthPx: number): number {
  if (slideWidthPx <= 0) return 0;
  return smoothstep(1 - Math.abs(deltaX) / (slideWidthPx * 0.55));
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/motion/math.ts">
<![CDATA[export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}

export function stagger(index: number, base = 0.28, step = 0.07): number {
  return base + index * step;
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/motion/Reveal.tsx">
<![CDATA["use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} className={className} data-reveal data-in={inView ? "true" : "false"}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/sections/CinemaReel.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ASSETS } from "../assets.generated";
import { PEAKS, type Award, type Peak } from "../slides/data";
import {
  AUTO_START_INDEX,
  DRAG_THRESHOLD,
  LOOP_COPIES,
  PITCH_VW,
  SLIDE_WIDTH_VW,
  contentProgress,
  indexForDrag,
  parallaxOffset,
  springStep,
  targetX,
  wrapIndex,
} from "../mechanic/deck";
import { clamp } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";

const IMAGE_DIR = "/templates/alpine-reel";
const COPY_OFFSET = PEAKS.length * 2;
const INITIAL_SLOT = COPY_OFFSET + AUTO_START_INDEX;
const SWEEP_END_SLOT = COPY_OFFSET + PEAKS.length;
// Slides this close to the middle copy are rendered in full too, so a step past either end of it shows a real
// frame; the slot then snaps back to the identical frame in the middle copy.
const EDGE_SLIDES = 3;

function renderedInFull(copy: number, index: number): boolean {
  if (copy === 2) return true;
  if (copy === 1) return index >= PEAKS.length - EDGE_SLIDES;
  return copy === 3 && index < EDGE_SLIDES;
}

function imageUrl(id: string): string {
  return `${IMAGE_DIR}/${id}-1600.webp`;
}

// The processed 1600 variant is capped at the source width, so advertise its real width.
function slideImage(id: string): { src: string; srcSet: string; width: number; height: number } {
  const { w, h } = ASSETS[id] ?? { w: 1600, h: 900 };
  return {
    src: imageUrl(id),
    srcSet: `${IMAGE_DIR}/${id}-800.webp 800w, ${imageUrl(id)} ${Math.min(w, 1600)}w`,
    width: w,
    height: h,
  };
}

function splitEyebrow(text: string): [string, string] {
  const parts = text.split(" / ");
  if (parts.length > 1) return [parts[0], parts.slice(1).join(" / ")];
  const pivot = Math.ceil(text.length / 2);
  return [text.slice(0, pivot), text.slice(pivot)];
}

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={compact ? "arl-mark arl-mark--compact" : "arl-mark"} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="28" fill="none" />
      <path d="M12 51 28 31 40 44 53 24 68 51" fill="none" />
      <path d="M26 62h28" />
      <circle cx="61" cy="20" r="4" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="arl-logo" aria-label="Alpine Reel">
      <Mark compact />
      <span className="arl-logo__text"><span>Alpine</span> Reel</span>
    </span>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="arl-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" data-filled={index < count ? "true" : "false"}>✦</span>
      ))}
    </span>
  );
}

function AwardRow({ item }: { item: Award }) {
  return (
    <div className="arl-award">
      <Stars count={item.stars} />
      <span className="arl-award__label">{item.label}</span>
      <span className="arl-award__quote">“{item.quote}”</span>
    </div>
  );
}

function PeakContent({ peak, onExplore }: { peak: Peak; onExplore: () => void }) {
  const [eyebrowA, eyebrowB] = splitEyebrow(peak.eyebrow);
  return (
    <div className="arl-slide__content">
      <div className="arl-slide__topline">
        <div className="arl-year">{peak.year}</div>
        <div className="arl-eyebrow"><span>{eyebrowA}</span><span>{eyebrowB}</span></div>
        <div className="arl-badge"><span>8,000</span><small>metres</small></div>
      </div>

      <div className="arl-slide__title-block">
        <p className="arl-range">{peak.range} · {peak.rank}</p>
        <h2>
          <span>{peak.titleLines[0]}</span>
          <span>{peak.titleLines[1]}</span>
        </h2>
        <div className="arl-ascent-row">
          <span><b>First ascent</b>{peak.firstAscent}</span>
          <span><b>Elevation</b>{peak.stats.elevation}</span>
        </div>
      </div>

      <div className="arl-slide__awards" aria-label={`${peak.name} accolades`}>
        {peak.awards.map((item) => <AwardRow key={item.label} item={item} />)}
      </div>

      <button type="button" className="arl-explore" onClick={onExplore}>
        <span>Explore</span><span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

function SlideFrame({
  peak,
  copy,
  index,
  activeIndex,
  opened,
  onExplore,
}: {
  peak: Peak;
  copy: number;
  index: number;
  activeIndex: number;
  opened: boolean;
  onExplore: (peak: Peak) => void;
}) {
  const active = index === activeIndex;
  const full = renderedInFull(copy, index);
  // K2 is on screen at first paint; Everest is next. The rest of the sweep path is warmed up after the page loads.
  const imagePriority = copy === 2 && index <= 1 ? (index === 1 ? "high" : "auto") : "low";
  return (
    <article
      className="arl-slide"
      data-index={index}
      data-copy={copy}
      data-active={active ? "true" : "false"}
      data-open={opened ? "true" : "false"}
      aria-hidden={copy !== 2 ? "true" : undefined}
      inert={copy !== 2}
      aria-label={`${peak.name}, ${peak.stats.elevation}`}
    >
      <div className="arl-slide__inner">
        <div className="arl-slide__image" aria-hidden="true">
          {full && <img
              {...slideImage(peak.id)}
              sizes="(max-width: 800px) 90vw, 80vw"
              alt=""
              draggable={false}
              loading={copy === 2 && index <= 1 ? "eager" : "lazy"}
              fetchPriority={imagePriority}
            />}
          <div className="arl-slide__tint" />
          <div className="arl-slide__vignette" />
        </div>
        {full && <PeakContent peak={peak} onExplore={() => onExplore(peak)} />}
      </div>
    </article>
  );
}

function Indicator({ activeIndex, onSelect, hidden }: { activeIndex: number; onSelect: (index: number) => void; hidden: boolean }) {
  return (
    <div className="arl-indicator" data-hidden={hidden ? "true" : "false"} aria-hidden={hidden}>
      <span>{String(activeIndex + 1).padStart(2, "0")}</span>
      <div className="arl-indicator__pips">
        {PEAKS.map((peak, index) => (
          <button key={peak.id} type="button" aria-label={`Go to ${peak.name}`} aria-pressed={index === activeIndex} onClick={() => onSelect(index)}>
            <i data-active={index === activeIndex ? "true" : "false"} />
          </button>
        ))}
      </div>
      <span>{String(PEAKS.length).padStart(2, "0")}</span>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div className="arl-stat">
      <span>{label}</span>
      <strong>{value}{suffix}</strong>
    </div>
  );
}

function DetailsPanel({ peak, open, onClose }: { peak: Peak | null; open: boolean; onClose: () => void }) {
  return (
    <>
      <button className="arl-backdrop" data-open={open ? "true" : "false"} style={{ cursor: "pointer" }} type="button" aria-label="Close peak details" onClick={onClose} />
      <aside className="arl-details" data-open={open ? "true" : "false"} style={{ cursor: "default" }} aria-hidden={!open} aria-label={peak ? `${peak.name} details` : "Peak details"}>
        {peak && (
          <div className="arl-details__scroll" tabIndex={0} style={{ cursor: "default" }}>
            <div className="arl-details__image">
              <img src={imageUrl(peak.id)} alt="" />
              <div />
            </div>
            <div className="arl-details__body" style={{ cursor: "default" }}>
              <p className="arl-details__eyebrow">{peak.eyebrow}</p>
              <h2><span>{peak.titleLines[0]}</span><span>{peak.titleLines[1]}</span></h2>
              <p className="arl-details__meta">{peak.firstAscent} · {peak.year} · {peak.range}</p>
              <hr />
              <p className="arl-details__description">{peak.description}</p>
              <hr />
              <div className="arl-stats-grid">
                <Stat label="Success" value={peak.stats.success} suffix="%" />
                <Stat label="Survival" value={peak.stats.survival} suffix="%" />
                <Stat label="Elevation" value={peak.stats.elevation} />
                <Stat label="Prominence" value={peak.stats.prominence} />
                <Stat label="Coordinates" value={peak.stats.coordinates} />
                <Stat label="Season" value={peak.stats.season} />
              </div>
              <div className="arl-stat arl-stat--country"><span>Country</span><strong>{peak.stats.country}</strong></div>
              <hr />
              <div className="arl-awards-list">
                {peak.awards.map((item) => <AwardRow item={item} key={item.label} />)}
              </div>
            </div>
          </div>
        )}
        <button type="button" className="arl-details__close" style={{ cursor: "pointer" }} onClick={onClose} aria-label="Close peak details"><span /><span /></button>
      </aside>
    </>
  );
}

export default function CinemaReel() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const introRef = useRef<number | null>(null);
  const normalizeTimerRef = useRef<number | null>(null);
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const slotRef = useRef(INITIAL_SLOT);
  const draggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragOriginRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const hoverZoneRef = useRef<"left" | "right" | "center">("center");
  const activeIndexRef = useRef(AUTO_START_INDEX);
  const introStateRef = useRef(true);
  const lastFrameRef = useRef({ x: Number.NaN, index: -1, intro: true });
  const tickRef = useRef<() => void>(() => undefined);
  const [activeIndex, setActiveIndex] = useState(AUTO_START_INDEX);
  const [intro, setIntro] = useState(true);
  const [openPeak, setOpenPeak] = useState<Peak | null>(null);
  const openPeakRef = useRef<Peak | null>(null);
  openPeakRef.current = openPeak;
  const [cursor, setCursor] = useState({ x: -100, y: -100, visible: false, pressed: false, zone: "center" as "left" | "right" | "center" });
  const slides = useMemo(() => Array.from({ length: LOOP_COPIES }, (_, copy) => PEAKS.map((peak, index) => ({ peak, index, copy }))).flat(), []);

  const measure = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width <= 800;
    const leftPad = width * (mobile ? 0.07 : 0.1);
    const pitch = width * ((mobile ? 90 : PITCH_VW) / 100);
    return { leftPad, pitch };
  }, []);

  const syncTarget = useCallback(() => {
    const { leftPad, pitch } = measure();
    targetXRef.current = targetX(leftPad, pitch, slotRef.current);
  }, [measure]);

  const writeTrack = useCallback((value: number) => {
    currentXRef.current = value;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${value}px, 0, 0)`;
  }, []);

  const updateContent = useCallback(() => {
    const { pitch } = measure();
    const slideWidth = window.innerWidth * (SLIDE_WIDTH_VW / 100);
    const activeSlot = slotRef.current;
    const currentX = currentXRef.current;
    const { leftPad } = measure();
    const activeDelta = currentX - targetX(leftPad, pitch, activeSlot);
    const progress = contentProgress(activeDelta, slideWidth);
    const activeNodes = trackRef.current?.querySelectorAll<HTMLElement>(`[data-index="${activeIndexRef.current}"]`);
    activeNodes?.forEach((node) => {
      const content = node.querySelector<HTMLElement>(".arl-slide__content");
      const image = node.querySelector<HTMLElement>(".arl-slide__image");
      if (content) {
        content.style.setProperty("--arl-content-opacity", String(introStateRef.current ? 0 : progress));
        content.style.setProperty("--arl-content-x", `${(1 - progress) * 56}px`);
        content.style.setProperty("--arl-content-blur", `${(1 - progress) * 12}px`);
      }
      if (image) image.style.setProperty("--arl-parallax", `${parallaxOffset(activeDelta)}px`);
    });
  }, [measure]);

  const tick = useCallback(() => {
    const delta = targetXRef.current - currentXRef.current;
    if (!introStateRef.current && !draggingRef.current && Math.abs(delta) > 0.1) writeTrack(springStep(currentXRef.current, targetXRef.current));
    const last = lastFrameRef.current;
    if (last.x !== currentXRef.current || last.index !== activeIndexRef.current || last.intro !== introStateRef.current) {
      last.x = currentXRef.current;
      last.index = activeIndexRef.current;
      last.intro = introStateRef.current;
      updateContent();
    }
    rafRef.current = window.requestAnimationFrame(() => tickRef.current());
  }, [updateContent, writeTrack]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const normalizeSlot = useCallback(() => {
    if (slotRef.current >= COPY_OFFSET + PEAKS.length) slotRef.current -= PEAKS.length;
    if (slotRef.current < COPY_OFFSET) slotRef.current += PEAKS.length;
    syncTarget();
    writeTrack(targetXRef.current);
  }, [syncTarget, writeTrack]);

  const selectIndex = useCallback((index: number) => {
    const next = wrapIndex(index, PEAKS.length);
    slotRef.current = COPY_OFFSET + next;
    activeIndexRef.current = next;
    setActiveIndex(next);
    introStateRef.current = false;
    setIntro(false);
    syncTarget();
    if (Math.abs(targetXRef.current - currentXRef.current) > window.innerWidth * 1.4) writeTrack(targetXRef.current);
  }, [syncTarget, writeTrack]);

  const navigate = useCallback((direction: 1 | -1) => {
    // A long run of steps (a trackpad swipe) must not walk off the slides rendered in full: wrap the whole track a loop early.
    const wanted = slotRef.current + direction;
    const wrapBy = wanted < COPY_OFFSET - EDGE_SLIDES ? PEAKS.length : wanted >= COPY_OFFSET + PEAKS.length + EDGE_SLIDES ? -PEAKS.length : 0;
    if (wrapBy) {
      writeTrack(currentXRef.current - wrapBy * measure().pitch);
      slotRef.current += wrapBy;
    }
    const nextSlot = slotRef.current + direction;
    const nextIndex = wrapIndex(nextSlot, PEAKS.length);
    setIntro(false);
    introStateRef.current = false;
    slotRef.current = nextSlot;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    syncTarget();
    // One timer, restarted on every step, so a quick run of presses snaps back once, after the last one settles.
    if (normalizeTimerRef.current) window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(normalizeSlot, 760);
  }, [measure, normalizeSlot, syncTarget, writeTrack]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    root.dataset.enhanced = "true";
    root.dataset.js = "true";
    const { leftPad, pitch } = measure();
    const startX = targetX(leftPad, pitch, INITIAL_SLOT);
    const sweepEndX = targetX(leftPad, pitch, SWEEP_END_SLOT);
    writeTrack(reducedMotion ? targetX(leftPad, pitch, COPY_OFFSET) : startX);
    slotRef.current = reducedMotion ? COPY_OFFSET : INITIAL_SLOT;
    syncTarget();
    if (reducedMotion) {
      introStateRef.current = false;
      setIntro(false);
      activeIndexRef.current = 0;
      setActiveIndex(0);
    } else {
      // Strict Mode re-runs this effect after cleanup cancelled the first intro, so start from a clean intro state.
      introStateRef.current = true;
      activeIndexRef.current = AUTO_START_INDEX;
      const scanlines = root.querySelector<HTMLElement>(".arl-scanlines");
      const blur = root.querySelector<SVGFEGaussianBlurElement>("#arl-motion-blur feGaussianBlur");
      const startedAt = performance.now();
      const introTick = (now: number) => {
        const t = clamp((now - startedAt) / 3000, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        // Velocity of the power3.out sweep, normalised to its peak: drives the streak and the horizontal blur.
        const speed = Math.pow(1 - t, 2);
        writeTrack(startX + (sweepEndX - startX) * eased);
        blur?.setAttribute("stdDeviation", `${(speed * 18).toFixed(2)} 0`);
        scanlines?.style.setProperty("--arl-scan-opacity", speed.toFixed(3));
        if (t < 1) introRef.current = window.requestAnimationFrame(introTick);
        else {
          // The sweep ends on the middle copy's Everest twin one loop on; fold back to the identical frame at the middle copy.
          slotRef.current = COPY_OFFSET;
          activeIndexRef.current = 0;
          setActiveIndex(0);
          introStateRef.current = false;
          setIntro(false);
          blur?.setAttribute("stdDeviation", "0 0");
          scanlines?.style.setProperty("--arl-scan-opacity", "0");
          syncTarget();
          writeTrack(targetXRef.current);
        }
      };
      introRef.current = window.requestAnimationFrame(introTick);
    }
    rafRef.current = window.requestAnimationFrame(tick);
    const onResize = () => {
      syncTarget();
      if (!draggingRef.current) writeTrack(targetXRef.current);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPeak(null);
        return;
      }
      if (openPeakRef.current) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); navigate(1); }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); navigate(-1); }
    };
    const onWheel = (event: WheelEvent) => {
      if ((event.target as HTMLElement | null)?.closest?.(".arl-details")) return;
      if (openPeakRef.current) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (Math.abs(event.deltaX) < 1 && Math.abs(event.deltaY) < 1) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      navigate(delta > 0 ? 1 : -1);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (openPeakRef.current || (event.target as HTMLElement | null)?.closest?.(".arl-details")) return;
      if ((event.target as HTMLElement).closest("button")) return;
      draggingRef.current = true;
      dragStartRef.current = event.clientX;
      dragOriginRef.current = currentXRef.current;
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      root.setPointerCapture?.(event.pointerId);
      setCursor((value) => ({ ...value, pressed: true }));
    };
    const onPointerMove = (event: PointerEvent) => {
      lastPointerRef.current = { x: event.clientX, y: event.clientY };
      const isInsideDetails = Boolean((event.target as HTMLElement | null)?.closest?.(".arl-details"));
      const zone = (openPeakRef.current || isInsideDetails)
        ? "center"
        : (event.clientX < window.innerWidth * 0.1 ? "left" : event.clientX > window.innerWidth * 0.9 ? "right" : "center");
      hoverZoneRef.current = zone;
      setCursor((value) => ({ ...value, x: event.clientX, y: event.clientY, visible: true, zone }));
      if (draggingRef.current) writeTrack(dragOriginRef.current + (event.clientX - dragStartRef.current));
    };
    const onPointerUp = (event: PointerEvent) => {
      if (openPeakRef.current || (event.target as HTMLElement | null)?.closest?.(".arl-details")) {
        draggingRef.current = false;
        try { root.releasePointerCapture?.(event.pointerId); } catch {}
        setCursor((value) => ({ ...value, pressed: false }));
        return;
      }
      if (!draggingRef.current) {
        if (hoverZoneRef.current === "left") navigate(-1);
        if (hoverZoneRef.current === "right") navigate(1);
        setCursor((value) => ({ ...value, pressed: false }));
        return;
      }
      draggingRef.current = false;
      root.releasePointerCapture?.(event.pointerId);
      const delta = event.clientX - dragStartRef.current;
      const next = indexForDrag(delta, window.innerWidth, activeIndexRef.current, PEAKS.length, DRAG_THRESHOLD);
      // A drag moves one slide in the direction dragged, so it wraps through the loop copies like the arrow keys do.
      if (next !== activeIndexRef.current) navigate(delta < 0 ? 1 : -1);
      else { syncTarget(); }
      setCursor((value) => ({ ...value, pressed: false }));
    };
    const onPointerEnter = (event: PointerEvent) => setCursor((value) => ({ ...value, x: event.clientX, y: event.clientY, visible: true }));
    const onPointerLeave = () => setCursor((value) => ({ ...value, visible: false, pressed: false }));
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    // Only K2 and Everest compete for the first paint; the rest of the sweep path is fetched once the page has loaded.
    const warmSweepPath = () => root.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { img.loading = "eager"; });
    if (document.readyState === "complete") warmSweepPath();
    else window.addEventListener("load", warmSweepPath, { once: true });
    return () => {
      window.removeEventListener("load", warmSweepPath);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (introRef.current) window.cancelAnimationFrame(introRef.current);
      if (normalizeTimerRef.current) window.clearTimeout(normalizeTimerRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [measure, navigate, reducedMotion, selectIndex, syncTarget, tick, writeTrack]);

  useEffect(() => {
    if (openPeak) document.body.dataset.arlModal = "open";
    else delete document.body.dataset.arlModal;
    return () => { delete document.body.dataset.arlModal; };
  }, [openPeak]);

  return (
    <main
      ref={rootRef}
      className="arl-reel"
      aria-label="Alpine Reel: the fourteen eight-thousanders"
      data-intro={intro ? "true" : "false"}
      data-reduced={reducedMotion ? "true" : "false"}
      style={openPeak ? { cursor: "default" } : undefined}
    >
      <h1 className="arl-visually-hidden">Alpine Reel: the fourteen eight-thousanders</h1>
      <svg className="arl-defs" aria-hidden="true" width="0" height="0">
        <defs><filter id="arl-motion-blur" x="-25%" y="-5%" width="150%" height="110%"><feGaussianBlur stdDeviation="0 0" /></filter></defs>
      </svg>
      <div className="arl-scanlines" aria-hidden="true" />
      <header className="arl-header">
        <Logo />
        <div className="arl-header__right"><span>14 peaks / 8,000m+</span><span className="arl-header__hint">Drag or scroll to move</span></div>
      </header>
      <div className="arl-stage">
        <div className="arl-track" ref={trackRef}>
          {slides.map(({ peak, copy, index }) => (
            <SlideFrame key={`${copy}-${peak.id}`} peak={peak} copy={copy} index={index} activeIndex={activeIndex} opened={copy === 2 && openPeak?.id === peak.id} onExplore={setOpenPeak} />
          ))}
        </div>
      </div>
      <div className="arl-mask arl-mask--left" aria-hidden="true" />
      <div className="arl-mask arl-mask--right" aria-hidden="true" />
      <div
        className="arl-cursor"
        data-visible={cursor.visible ? "true" : "false"}
        data-pressed={cursor.pressed ? "true" : "false"}
        data-zone={cursor.zone}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          ...(openPeak ? { display: "none", opacity: 0, pointerEvents: "none" } : {}),
        }}
        aria-hidden="true"
      >
        <span className="arl-cursor__label">{cursor.zone === "center" ? "Scroll" : ""}</span>
        <span className="arl-cursor__chevron arl-cursor__chevron--left">‹</span><span className="arl-cursor__chevron arl-cursor__chevron--right">›</span>
      </div>
      <Indicator activeIndex={activeIndex} onSelect={selectIndex} hidden={Boolean(openPeak)} />
      <div className="arl-readout" aria-live="polite"><span>{String(activeIndex + 1).padStart(2, "0")}</span><b>{PEAKS[activeIndex]?.name}</b><small>{PEAKS[activeIndex]?.stats.elevation}</small></div>
      <DetailsPanel peak={openPeak} open={Boolean(openPeak)} onClose={() => setOpenPeak(null)} />
      <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}"}</style></noscript>
    </main>
  );
}
]]>
    </file>
    <file path="src/app/(alpine-reel)/alpine-reel/slides/data.ts">
<![CDATA[export interface Award {
  stars: number;
  label: string;
  quote: string;
}

export interface PeakStats {
  success: number;
  survival: number;
  elevation: string;
  prominence: string;
  country: string;
  season: string;
  coordinates: string;
}

export interface Peak {
  id: string;
  name: string;
  titleLines: [string, string];
  eyebrow: string;
  range: string;
  rank: string;
  year: string;
  firstAscent: string;
  imageId: string;
  description: string;
  stats: PeakStats;
  awards: [Award, Award, Award];
}

const award = (stars: number, label: string, quote: string): Award => ({ stars, label, quote });

export const PEAKS: Peak[] = [
  {
    id: "mount-everest",
    name: "Mount Everest",
    titleLines: ["Mount", "Everest"],
    eyebrow: "Sagarmatha / Chomolungma 8,849m",
    range: "Mahalangur Himal",
    rank: "rank 01",
    year: "1953",
    firstAscent: "Hillary & Norgay",
    imageId: "1544735716-392fe2489ffa",
    description: "Rising above the Death Zone into the jet stream, Earth’s highest massif commands an empire of cobalt ice and blinding snow. Plumes of frozen crystal trail from its pyramid summit as winds scour its black limestone strata.",
    stats: { success: 62, survival: 96, elevation: "8,849m", prominence: "8,849m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "27°59'N 86°55'E" },
    awards: [award(5, "Roof of the world", "Where earth meets stratosphere"), award(5, "Khumbu icefall", "A labyrinth of shifting blue ice"), award(4, "South Col route", "The ultimate alpinist crucible")],
  },
  {
    id: "k2-godwin-austen",
    name: "K2",
    titleLines: ["Savage", "Peak K2"],
    eyebrow: "Karakoram / Chhogori 8,611m",
    range: "Baltoro Muztagh",
    rank: "rank 02",
    year: "1954",
    firstAscent: "Lacedelli & Compagnoni",
    imageId: "1464822759023-fed622ff2c3b",
    description: "Isolated deep within the Baltoro Muztagh, K2 presents three thousand vertical metres of unbroken blue ice and sheer rock on every face. With no easy ridge and violent storms that materialize without warning, it remains the mountaineer’s mountain.",
    stats: { success: 28, survival: 77, elevation: "8,611m", prominence: "4,020m", country: "Pakistan / China", season: "Summer / Winter", coordinates: "35°52'N 76°30'E" },
    awards: [award(5, "The savage mountain", "A perfect pyramid of granite and ice"), award(5, "Abruzzi Spur", "Relentless steepness from base to peak"), award(5, "The Bottleneck", "Beneath the overhanging serac")],
  },
  {
    id: "kangchenjunga",
    name: "Kangchenjunga",
    titleLines: ["Kangchen", "Junga"],
    eyebrow: "Five treasures / Himalaya 8,586m",
    range: "Kangchenjunga Himal",
    rank: "rank 03",
    year: "1955",
    firstAscent: "Brown & Band",
    imageId: "1519681393784-d120267933ba",
    description: "The easternmost of the eight-thousanders catches the full fury of the monsoon, burying its five colossal summits in deep, unstable powder. In deference to Sikkimese tradition, climbers halt below the virgin apex of snow.",
    stats: { success: 44, survival: 85, elevation: "8,586m", prominence: "3,922m", country: "Nepal / India", season: "Spring", coordinates: "27°42'N 88°08'E" },
    awards: [award(5, "Sacred summit", "Five peaks of eternal snow"), award(5, "Eastern bastion", "Guarded by avalanche and monsoon"), award(4, "Yalung face", "An immense wall of glacial frost")],
  },
  {
    id: "lhotse",
    name: "Lhotse",
    titleLines: ["Lhotse", "Massif"],
    eyebrow: "South peak / Mahalangur 8,516m",
    range: "Mahalangur Himal",
    rank: "rank 04",
    year: "1956",
    firstAscent: "Luchsinger & Reiss",
    imageId: "1454496522488-7a8e488e8606",
    description: "Linked to Everest via the windswept South Col, Lhotse boasts the most intimidating southern wall in the world, rising 3.2 kilometres in just 2.25 kilometres of horizontal distance.",
    stats: { success: 51, survival: 94, elevation: "8,516m", prominence: "610m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "27°57'N 86°56'E" },
    awards: [award(5, "Lhotse face", "Twelve hundred metres of blue ice"), award(5, "South wall", "Three kilometres of vertical shadow"), award(4, "Reiss couloir", "A razor cut through frozen rock")],
  },
  {
    id: "makalu",
    name: "Makalu",
    titleLines: ["Makalu", "Pyramid"],
    eyebrow: "The great black / Himal 8,485m",
    range: "Mahalangur Himal",
    rank: "rank 05",
    year: "1955",
    firstAscent: "Terray & Couzy",
    imageId: "1486870591958-9b9d0d1dda99",
    description: "Fourteen miles southeast of Everest, Makalu stands isolated as an astonishing four-sided pyramid of dark granite and sculpted snow ridges. Its knife-edge summit arête requires technical rock and ice climbing above eight thousand metres.",
    stats: { success: 48, survival: 89, elevation: "8,485m", prominence: "2,378m", country: "Nepal / Tibet", season: "Spring", coordinates: "27°53'N 87°05'E" },
    awards: [award(5, "Four-sided pyramid", "Symmetry carved by arctic winds"), award(5, "French pillar", "Sustained technical altitude"), award(4, "West pillar", "Granite prow in the clouds")],
  },
  {
    id: "cho-oyu",
    name: "Cho Oyu",
    titleLines: ["Cho Oyu", "Goddess"],
    eyebrow: "Turquoise goddess / Himal 8,188m",
    range: "Mahalangur Himal",
    rank: "rank 06",
    year: "1954",
    firstAscent: "Tichy, Jochler & Dawa",
    imageId: "1506744038136-46273834b3fb",
    description: "Named the Turquoise Goddess for the icy azure hue its snowfields cast at twilight, Cho Oyu anchors the western end of the Khumbu sub-range. Its vast summit plateau feels like another planet.",
    stats: { success: 71, survival: 98, elevation: "8,188m", prominence: "2,340m", country: "Nepal / Tibet", season: "Spring / Autumn", coordinates: "28°05'N 86°39'E" },
    awards: [award(5, "Turquoise shadow", "Glowing blue in high-altitude dusk"), award(4, "Nangpa La pass", "An ancient glacial trade corridor"), award(5, "West flank", "Endless slopes of wind-packed snow")],
  },
  {
    id: "dhaulagiri-i",
    name: "Dhaulagiri I",
    titleLines: ["Dhaula", "Giri I"],
    eyebrow: "White mountain / Himalaya 8,167m",
    range: "Dhaulagiri Himal",
    rank: "rank 07",
    year: "1960",
    firstAscent: "Diemberger & expedition",
    imageId: "1483728642387-6c3bdd6c93e5",
    description: "From the floor of the Kali Gandaki Gorge, Dhaulagiri I rockets nearly seven thousand vertical metres without interruption, the greatest abrupt relief on Earth.",
    stats: { success: 39, survival: 84, elevation: "8,167m", prominence: "3,357m", country: "Nepal", season: "Spring / Autumn", coordinates: "28°41'N 83°29'E" },
    awards: [award(5, "Dazzling white", "Seven kilometres above Kali Gandaki"), award(5, "Eiger parete", "Sweeping arcs of fluted ice"), award(4, "Northeast col", "Cradle of ferocious gales")],
  },
  {
    id: "manaslu",
    name: "Manaslu",
    titleLines: ["Manaslu", "Spirit"],
    eyebrow: "Mountain of the spirit / 8,163m",
    range: "Manasiri Himal",
    rank: "rank 08",
    year: "1956",
    firstAscent: "Imanishi & Norbu",
    imageId: "1516655855035-d5215bcb5604",
    description: "Derived from the Sanskrit word Manasa, meaning intellect or soul, Manaslu dominates the Gorkha district with long, sweeping ridges and hanging valley glaciers.",
    stats: { success: 58, survival: 91, elevation: "8,163m", prominence: "3,092m", country: "Nepal", season: "Autumn / Spring", coordinates: "28°33'N 84°33'E" },
    awards: [award(5, "Twin horns", "Soaring ridges of crystalline snow"), award(4, "Larkya glacier", "Cracking blue chasms below"), award(5, "True apex", "A cornice edge above the abyss")],
  },
  {
    id: "nanga-parbat",
    name: "Nanga Parbat",
    titleLines: ["Nanga", "Parbat"],
    eyebrow: "Diamir / king of mountains 8,125m",
    range: "Western Himalaya",
    rank: "rank 09",
    year: "1953",
    firstAscent: "Hermann Buhl (solo)",
    imageId: "1542224566-6e85f2e6772f",
    description: "Anchoring the westernmost bend of the Himalayas above the Indus River, Nanga Parbat’s Rupal Face rises 4,600 metres from base camp, the tallest mountain face on Earth.",
    stats: { success: 31, survival: 79, elevation: "8,125m", prominence: "4,608m", country: "Pakistan", season: "Summer", coordinates: "35°14'N 74°35'E" },
    awards: [award(5, "Rupal face", "Earth’s highest vertical wall"), award(5, "Buhl’s solo", "Forty-one hours without oxygen"), award(5, "Mazeno ridge", "Ten kilometres above the clouds")],
  },
  {
    id: "annapurna-i",
    name: "Annapurna I",
    titleLines: ["Anna", "Purna I"],
    eyebrow: "First 8000er climbed / 8,091m",
    range: "Annapurna Himal",
    rank: "rank 10",
    year: "1950",
    firstAscent: "Herzog & Lachenal",
    imageId: "1534447677768-be436bb09401",
    description: "In 1950, Maurice Herzog and Louis Lachenal made Annapurna I the first eight-thousand-metre peak climbed by humankind. It remains the most statistically perilous massif in the Himalayas.",
    stats: { success: 27, survival: 72, elevation: "8,091m", prominence: "2,984m", country: "Nepal", season: "Spring", coordinates: "28°35'N 83°49'E" },
    awards: [award(5, "Pioneer summit", "The first 8000m peak ever scaled"), award(5, "South sanctuary", "An amphitheatre of hanging seracs"), award(5, "North face ice", "Unforgiving avalanche corridors")],
  },
  {
    id: "gasherbrum-i",
    name: "Gasherbrum I",
    titleLines: ["Gasher", "Brum I"],
    eyebrow: "Hidden peak / Karakoram 8,080m",
    range: "Baltoro Muztagh",
    rank: "rank 11",
    year: "1958",
    firstAscent: "Schoening & Kauffman",
    imageId: "1491555103944-7c647fd857e6",
    description: "Often called Hidden Peak due to its remoteness at the head of the Baltoro Glacier, Gasherbrum I means Beautiful Mountain in Balti.",
    stats: { success: 42, survival: 91, elevation: "8,080m", prominence: "2,155m", country: "Pakistan / China", season: "Summer", coordinates: "35°43'N 76°41'E" },
    awards: [award(5, "Shining wall", "Baltoro’s most remote sanctuary"), award(4, "Japanese couloir", "Sheer ice through dark dolomite"), award(5, "Alpine style", "Clean ascent in pure solitude")],
  },
  {
    id: "broad-peak",
    name: "Broad Peak",
    titleLines: ["Broad", "Peak"],
    eyebrow: "Falchan Kangri / Karakoram 8,051m",
    range: "Baltoro Muztagh",
    rank: "rank 12",
    year: "1957",
    firstAscent: "Buhl, Diemberger, Schmuck & Wintersteller",
    imageId: "1522163182402-834f871fd851",
    description: "Named for its undulating summit ridge, Broad Peak stands across the Godwin-Austen Glacier from K2. Its first ascent was achieved without supplemental oxygen.",
    stats: { success: 53, survival: 94, elevation: "8,051m", prominence: "1,701m", country: "Pakistan / China", season: "Summer", coordinates: "35°48'N 76°34'E" },
    awards: [award(5, "Summit crest", "Over one kilometre of skyline ridge"), award(5, "Oxygenless pact", "Pioneered without bottled air"), award(4, "Godwin-Austen", "Face to face with mighty K2")],
  },
  {
    id: "gasherbrum-ii",
    name: "Gasherbrum II",
    titleLines: ["Gasher", "Brum II"],
    eyebrow: "Shining wall K4 / Karakoram 8,035m",
    range: "Baltoro Muztagh",
    rank: "rank 13",
    year: "1956",
    firstAscent: "Moravec, Larch & Willenpart",
    imageId: "1551632811-561732d1e306",
    description: "Rising above the upper Baltoro like a crystalline shark fin, Gasherbrum II is the third-highest peak in the Karakoram, a delicate arête above the clouds.",
    stats: { success: 66, survival: 97, elevation: "8,035m", prominence: "1,524m", country: "Pakistan / China", season: "Summer", coordinates: "35°45'N 76°39'E" },
    awards: [award(5, "Ice pyramid", "Chiseled geometry in deep blue"), award(5, "Banana ridge", "Curving spine of frozen snow"), award(5, "Winter triumph", "Conquered at minus forty")],
  },
  {
    id: "shishapangma",
    name: "Shishapangma",
    titleLines: ["Shisha", "Pangma"],
    eyebrow: "Crest above grassy plains / 8,027m",
    range: "Langtang Himal",
    rank: "rank 14",
    year: "1964",
    firstAscent: "Hsu Ching & expedition",
    imageId: "1508739773434-c26b3d09e071",
    description: "The only eight-thousander standing entirely within Tibet, Shishapangma was the final summit climbed due to decades of border isolation. Its southwest face is fluted snow and blue granite.",
    stats: { success: 61, survival: 92, elevation: "8,027m", prominence: "2,897m", country: "Tibet / China", season: "Spring / Autumn", coordinates: "28°21'N 85°46'E" },
    awards: [award(5, "Final 8000er", "The last crown of the fourteen"), award(5, "Tibetan plateau", "Solitary fortress of wind and ice"), award(4, "Southwest face", "Two kilometres of glacial white")],
  },
];
]]>
    </file>
  </files>
</template>
