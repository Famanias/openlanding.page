<template slug="amaoto" name="AMAOTO">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "gsap": "^3.15.0",
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(amaoto)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import {
  DM_Mono,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./amaoto/amaoto.css";

const display = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});
const body = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  variable: "--font-zen",
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});
const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  preload: false,
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "AMAOTO — The sound of rain, kept dry.",
  description:
    "A wagasa atelier where paper, bamboo and rain become one quiet instrument.",
  icons: { icon: "/templates/amaoto/icon.svg" },
};

export default function AmaotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="am-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/amaoto.css">
<![CDATA[@import "tailwindcss";
@theme {
  --color-sumi: #1a1613;
  --color-paper: #f4ecdd;
  --color-sakura: #f2b8c6;
  --color-deep-sakura: #d9748f;
  --color-vermilion: #c8412b;
  --color-gold: #b8923a;
  --color-indigo: #2b3a55;
  --font-display: var(--font-shippori), serif;
  --font-body: var(--font-zen), sans-serif;
  --font-mono: var(--font-dm-mono), monospace;
}
* {
  box-sizing: border-box;
}
body.am-body {
  margin: 0;
  background: var(--am-paper);
  color: var(--am-ink);
  font-family: var(--font-body);
}
a {
  color: inherit;
  text-decoration: none;
}
button,
input {
  font: inherit;
}
.am-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  font-size: 1.05rem;
}
.am-hanko {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--am-red);
  color: var(--am-red);
  font: 500 0.62rem var(--font-mono);
  letter-spacing: -0.12em;
}
.am-header nav {
  display: flex;
  gap: 24px;
  margin-left: auto;
  font: 500 0.65rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.am-header nav a {
  position: relative;
  padding-bottom: 3px;
}
.am-header nav a::after {
  content: "";
  position: absolute;
  height: 1px;
  left: 0;
  right: 100%;
  bottom: 0;
  background: var(--am-red);
  transition: right 0.3s ease;
}
.am-header nav a:hover::after,
.am-header nav a:focus-visible::after {
  right: 0;
}
/* Keep chapter surfaces below the fixed model and chapter content above it. */
.am-kicker,
.am-mono {
  font: 500 0.66rem var(--font-mono);
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.am-kicker {
  color: var(--am-red);
  display: inline-flex;
  gap: 12px;
  align-items: center;
}
.am-kicker::before {
  content: "";
  width: 28px;
  height: 1px;
  background: var(--am-gold);
}
h1,
h2,
h3,
p {
  margin: 0;
}
h1 em,
h2 em {
  display: block;
  font-style: normal;
  color: var(--am-red);
}
h2 em {
  color: var(--am-indigo);
}
.am-threadline span {
  display: block;
  width: var(--thread-progress);
  height: 100%;
  background: var(--am-indigo);
  transform-origin: left;
}
.am-structure {
  --am-section-background: color-mix(
    in srgb,
    var(--am-paper) 84%,
    var(--am-sakura)
  );
}
.am-light h2 em {
  color: var(--am-sakura);
}
.am-control {
  padding: 28px;
  border-left: 1px solid color-mix(in srgb, var(--am-paper) 35%, transparent);
  display: grid;
  gap: 18px;
  max-width: 420px;
}
.am-control label {
  font: 500 0.7rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.am-control output {
  float: right;
  color: var(--am-sakura);
}
.am-control input[type="range"] {
  width: 100%;
  accent-color: var(--am-sakura);
}
.am-parts button.is-active span {
  color: var(--am-red);
}
.am-parts button:focus-visible,
.am-swatches button:focus-visible,
.am-form input:focus-visible,
.am-button:focus-visible {
  outline: 2px solid var(--am-red);
  outline-offset: 4px;
}
.am-rule {
  height: 1px;
  background: var(--am-gold);
  margin: 20px 0;
}
.am-swatches button.is-active {
  border-color: var(--am-red);
  transform: translateX(10px);
}
.am-making li span {
  font: 500 0.63rem var(--font-mono);
  color: var(--am-red);
}
.am-making li strong {
  font: 500 1.25rem var(--font-display);
}
.am-commission h2 em {
  color: var(--am-sakura);
}
.am-commission dt,
.am-commission dd {
  margin: 0;
}
.am-commission dt {
  font: 500 0.58rem var(--font-mono);
  text-transform: uppercase;
  color: var(--am-sakura);
}
.am-commission dd {
  margin-top: 6px;
  font-size: 0.88rem;
}
/* The stage owns the composition; each chapter reserves its canvas rectangle. */
:root {
  --am-paper: #f4ecdd;
  --am-ink: #1a1613;
  --am-red: #c8412b;
  --am-indigo: #2b3a55;
  --am-gold: #b8923a;
  --am-sakura: #f2b8c6;
  --am-gutter: clamp(22px, 5vw, 82px);
  --am-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --am-ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --am-dur-1: 180ms;
  --am-dur-2: 360ms;
  --am-dur-3: 800ms;
  --am-dur-4: 1400ms;
}
html {
  background: var(--am-paper);
  scroll-behavior: auto;
  scrollbar-color: var(--am-gold) var(--am-paper);
}
::selection {
  background: var(--am-sakura);
  color: var(--am-ink);
}
input {
  caret-color: var(--am-sakura);
}
:focus-visible {
  outline: 2px solid var(--am-red);
  outline-offset: 5px;
}
h1,
h2,
h3 {
  font-family: var(--font-display);
  font-weight: 500;
  text-wrap: balance;
  letter-spacing: -0.04em;
}
p {
  max-width: 40ch;
  line-height: 1.65;
  font-size: clamp(1rem, 1.35vw, 1.2rem);
  text-wrap: pretty;
}
.am-page {
  position: relative;
  isolation: isolate;
  overflow: clip;
  background: transparent;
}
.am-world {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background: var(--am-paper);
}
.am-washi {
  position: absolute;
  inset: 0;
  z-index: 2;
  mix-blend-mode: multiply;
}
.am-world__scene {
  position: absolute;
  inset: 0;
  opacity: var(--scene-opacity, 0);
}
.am-world__scene svg {
  width: 100%;
  height: 100%;
}
.am-world__scene[data-scene="0"] {
  --scene-opacity: 1;
}
.am-night,
.am-dusk {
  background: var(--am-indigo);
}
.am-blossoms {
  background: color-mix(in srgb, var(--am-sakura) 22%, var(--am-paper));
}
.am-drafting {
  background: color-mix(in srgb, var(--am-sakura) 10%, var(--am-paper));
}
.am-grove {
  background: var(--am-paper);
}
.am-ridge {
  transform: translateY(calc(var(--am-scene-progress, 0) * -24px));
}
.am-ridge--near {
  transform: translateY(calc(var(--am-scene-progress, 0) * -52px));
}
.am-mist {
  animation: am-mist 18s var(--am-ease-in-out) infinite alternate;
}
.am-petal {
  position: absolute;
  width: 16px !important;
  height: 22px !important;
  animation: am-petal 12s linear infinite;
}
.am-dye-blot {
  position: absolute;
  width: 50vw;
  height: 70vh;
  right: 0;
  top: 5vh;
  background: radial-gradient(ellipse, var(--am-dye) 0, transparent 65%);
  opacity: 0.1;
  transition: background var(--am-dur-3);
}
.am-rain-veil {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: var(--am-rain, 0);
}
.am-rain-veil i {
  position: absolute;
  top: -20%;
  width: 1px;
  height: 10%;
  background: color-mix(in srgb, var(--am-paper) 18%, transparent);
  animation: am-rain 1.2s linear infinite;
}
.am-puddle {
  transform-origin: 350px 850px;
  animation: am-puddle 3.2s var(--am-ease-out) infinite;
}
.am-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: clamp(18px, 4vw, 64px);
  padding: 18px var(--am-gutter);
  background: color-mix(in srgb, var(--am-paper) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid color-mix(in srgb, var(--am-gold) 45%, transparent);
  transition: transform var(--am-dur-2) var(--am-ease-out);
  padding-block: 16px;
}
.am-header[data-hidden="true"] {
  transform: translateY(-110%);
}
.am-header:focus-within {
  transform: none;
}
.am-header nav a[aria-current]::after {
  right: 0;
}
.am-header__counter {
  font: 400 0.62rem var(--font-mono);
  letter-spacing: 0.06em;
  color: var(--am-red);
  white-space: nowrap;
  overflow: hidden;
  font-variant-numeric: tabular-nums;
}
.am-header__counter b {
  display: inline-block;
  font-weight: 400;
  min-width: 2ch;
}
.am-sound {
  display: flex;
  gap: 8px;
  align-items: center;
  flex: none;
  padding: 8px 0;
  color: var(--am-indigo);
  background: none;
  border: 0;
  font: 400 0.6rem var(--font-mono);
  cursor: pointer;
}
.am-sound svg {
  width: 18px;
  height: 18px;
}
.am-sound[aria-pressed="true"] svg {
  color: var(--am-red);
}
.am-stage {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.am-canvas {
  position: absolute;
  inset: auto;
  left: 52vw;
  top: 12vh;
  width: 46vw;
  height: 80vh;
  opacity: 1;
  transform: none;
  pointer-events: auto;
  touch-action: pan-y;
}
.am-canvas canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.am-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.am-canvas[data-ready="true"] .am-poster {
  display: none;
}
.am-section {
  gap: clamp(32px, 8vw, 150px);
  position: relative;
  z-index: 2;
  min-height: 115svh;
  padding: clamp(120px, 18vh, 190px) var(--am-gutter);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 8vw;
  align-items: center;
  pointer-events: none;
}
.am-section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--am-section-background, transparent);
  display: none;
}
.am-section > * {
  position: relative;
  z-index: 2;
  pointer-events: auto;
}
.am-section > .am-stage-anchor {
  position: absolute;
  top: 12svh;
  left: 51%;
  width: 48%;
  height: 80svh;
  pointer-events: none;
  z-index: -1;
}
.am-stage-anchor {
  visibility: hidden;
}
.am-chapter-copy {
  grid-column: 1;
  min-width: 0;
  max-width: 580px;
}
.am-structure .am-chapter-copy,
.am-making .am-chapter-copy,
.am-commission .am-chapter-copy {
  grid-column: 2;
}
.am-structure > .am-stage-anchor,
.am-making > .am-stage-anchor,
.am-commission > .am-stage-anchor {
  left: 0;
}
.am-hero {
  min-height: 100svh;
  padding-top: 160px;
}
.am-hero__copy {
  max-width: 500px;
}
h1 {
  letter-spacing: -0.06em;
  font-size: clamp(5rem, 10vw, 10rem);
  line-height: 0.95;
  margin: 28px 0;
}
h1 em {
  font: 400 clamp(1.1rem, 2.1vw, 2rem) var(--font-body);
  letter-spacing: -0.02em;
  font-size: clamp(1.35rem, 2vw, 2rem);
  line-height: 1.3;
  margin-top: 24px;
}
h2 {
  letter-spacing: -0.07em;
  font-size: clamp(3rem, 5.4vw, 5.5rem);
  line-height: 1.06;
  margin: 22px 0 26px;
}
.am-line {
  display: block;
  overflow: clip;
  padding-bottom: 0.12em;
  margin-bottom: -0.12em;
}
.am-line > span {
  display: block;
  will-change: transform;
}
.am-vertical {
  writing-mode: vertical-rl;
  position: absolute;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2vw, 2rem);
  letter-spacing: 0.2em;
  color: var(--am-indigo);
  top: 23vh;
  right: 30px;
  pointer-events: none;
}
.am-hero > .am-hanko {
  position: absolute;
  width: 52px;
  height: 52px;
  font-size: 0.72rem;
  bottom: 9vh;
  right: 7vw;
}
.am-stage-caption {
  position: absolute;
  right: var(--am-gutter);
  bottom: 7vh;
  font: 400 0.58rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--am-indigo);
}
.am-canopy .am-stage-caption {
  position: static;
  display: block;
  margin-top: 30px;
}
.am-light {
  --am-section-background: var(--am-indigo);
  color: var(--am-paper);
  min-height: 135svh;
  padding-top: 78svh;
  padding-bottom: 90px;
  align-items: start;
}
.am-light > .am-stage-anchor {
  top: 9svh;
  left: 14%;
  width: 72%;
  height: 59svh;
}
.am-light h2 {
  font-size: clamp(2.7rem, 4vw, 4rem);
}
.am-light .am-control {
  grid-column: 2;
  margin-top: 35px;
  width: 100%;
  justify-self: end;
}
.am-light .am-kicker {
  color: var(--am-sakura);
}
.am-runner-control {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 28px;
  font: 400 0.65rem var(--font-mono);
  text-transform: uppercase;
}
.am-runner-control input {
  width: 45%;
  accent-color: var(--am-red);
}
.am-spec {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  border: 0;
  border-top: 1px solid var(--am-gold);
  padding: 24px 0 0;
  margin-top: 32px;
  max-width: none;
  background: none;
  justify-self: auto;
}
.am-spec strong {
  font: 500 clamp(4rem, 8vw, 7rem) var(--font-display);
  line-height: 0.8;
  color: var(--am-red);
  font-size: 2.5rem;
}
.am-spec span {
  font-size: 0.75rem;
}
.am-parts {
  display: grid;
  gap: 0;
  margin-top: 30px;
  max-width: none;
}
.am-parts button {
  text-align: left;
  display: grid;
  border: 0;
  border-top: 1px solid color-mix(in srgb, var(--am-gold) 50%, transparent);
  background: none;
  color: inherit;
  cursor: pointer;
  position: relative;
  grid-template-columns: 1fr;
  overflow: hidden;
  padding: 16px 0;
  gap: 10px;
}
.am-parts button::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background: var(--am-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-parts button:hover::before,
.am-parts button:focus-visible::before,
.am-parts button.is-active::before {
  transform: scaleX(1);
}
.am-parts button span {
  font: 500 0.74rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-parts button:hover span,
.am-parts button.is-active span {
  transform: translateX(10px);
}
.am-parts button i {
  font-style: normal;
  font-size: 0.8rem;
  text-align: left;
  min-height: 1.2em;
  color: var(--am-ink);
  opacity: 0.7;
  max-width: 42ch;
}
.am-parts button.is-active i {
  animation: am-detail var(--am-dur-2) var(--am-ease-out);
}
.am-leader {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
.am-leader path {
  fill: none;
  stroke: var(--am-gold);
  stroke-width: 1;
  stroke-dasharray: 900;
  stroke-dashoffset: 900;
  opacity: 0;
  transition:
    stroke-dashoffset var(--am-dur-3) var(--am-ease-out),
    opacity var(--am-dur-2);
}
.am-leader[data-active="true"] path {
  stroke-dashoffset: 0;
  opacity: 0.6;
}
.am-canopy {
  --am-section-background: color-mix(
    in srgb,
    var(--am-sakura) 24%,
    var(--am-paper)
  );
  min-height: 110svh;
}
.am-swatches {
  display: grid;
  margin-top: 36px;
  max-width: 380px;
  gap: 0;
  border-top: 1px solid var(--am-gold);
}
.am-swatches button {
  display: flex;
  align-items: center;
  gap: 14px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  position: relative;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--am-gold) 40%, transparent);
  padding: 16px 5px;
  min-height: 64px;
  transform: none;
}
.am-swatches button span {
  border-radius: 50%;
  background: var(--swatch);
  border: 1px solid color-mix(in srgb, var(--am-ink) 25%, transparent);
  position: relative;
  flex: none;
  width: 30px;
  height: 30px;
}
.am-swatches button span::after {
  content: "";
  position: absolute;
  inset: -6px;
  border: 1px solid var(--am-red);
  border-radius: 50%;
  transform: rotate(-90deg) scale(0.8);
  opacity: 0;
  transition:
    transform var(--am-dur-2) var(--am-ease-out),
    opacity var(--am-dur-2);
}
.am-swatches button:hover span::after,
.am-swatches button.is-active span::after {
  transform: rotate(0) scale(1);
  opacity: 1;
}
.am-swatches button b {
  font: 400 0.8rem var(--font-body);
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-swatches button.is-active b {
  transform: translateX(6px);
}
.am-swatches button i {
  margin-left: auto;
  font-style: normal;
  opacity: 0;
}
.am-swatches button.is-active i {
  opacity: 1;
}
.am-making {
  --am-section-background: var(--am-paper);
  min-height: 155svh;
}
.am-making ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0 24px;
  border-top: 1px solid var(--am-gold);
  margin-top: 36px;
  grid-template-columns: 1fr;
}
.am-making li {
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 16px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--am-gold) 45%, transparent);
  position: relative;
  transition:
    color var(--am-dur-2),
    transform var(--am-dur-2);
}
.am-making li::before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 100%;
  background: var(--am-red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--am-dur-3) var(--am-ease-out);
}
.am-making li.is-current {
  color: var(--am-red);
  transform: translateX(5px);
}
.am-making li.is-current::before {
  transform: scaleX(1);
}
.am-commission {
  --am-section-background: var(--am-indigo);
  color: var(--am-paper);
  min-height: 145svh;
}
.am-commission .am-kicker {
  color: var(--am-sakura);
}
.am-commission h2 {
  font-size: clamp(2.6rem, 4.5vw, 4.8rem);
}
.am-commission dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  border-top: 1px solid color-mix(in srgb, var(--am-paper) 24%, transparent);
  padding-top: 18px;
  margin-top: 25px;
  margin-bottom: 30px;
}
.am-form {
  display: grid;
  padding: 0;
  border: 0;
  background: none;
  gap: 20px;
}
.am-form label {
  font: 500 0.65rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: 14px;
}
.am-form label span {
  position: absolute;
  top: 30px;
  left: 0;
  pointer-events: none;
  transition:
    transform var(--am-dur-2) var(--am-ease-out),
    color var(--am-dur-2);
}
.am-form label:focus-within span,
.am-form label:has(input:not(:placeholder-shown)) span {
  transform: translateY(-23px) scale(0.85);
  transform-origin: left;
  color: var(--am-sakura);
}
.am-form label::after {
  content: "";
  position: absolute;
  left: 0;
  top: 54px;
  width: 100%;
  height: 1px;
  background: var(--am-sakura);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-form label:focus-within::after {
  transform: scaleX(1);
}
.am-form input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--am-paper) 40%, transparent);
  padding: 10px 0;
  background: transparent;
  color: var(--am-paper);
  outline: none;
  min-height: 42px;
  border-radius: 0;
}
.am-form input[aria-invalid="true"] {
  border-color: var(--am-sakura);
}
.am-form small {
  color: var(--am-sakura);
  margin-top: 8px;
  animation: am-nudge var(--am-dur-2);
}
.am-success {
  padding: 32px 0;
}
.am-success > .am-hanko {
  width: 64px;
  height: 64px;
  animation: am-stamp 0.6s var(--am-ease-out);
}
.am-success h3 {
  margin: 20px 0;
  font-size: 2.5rem;
}
.am-button {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 210px;
  margin-top: 32px;
  padding: 14px 16px;
  border: 1px solid var(--am-ink);
  font: 500 0.68rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: transparent;
  cursor: pointer;
  transform: none;
  transition: color var(--am-dur-2);
}
.am-button::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background: var(--am-red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-button--red {
  border-color: var(--am-red);
  color: var(--am-paper);
  background: var(--am-red);
}
.am-button--red::before {
  background: var(--am-ink);
}
.am-button:hover::before {
  transform: scaleX(1);
}
.am-button:hover {
  transform: none;
  color: var(--am-paper);
}
.am-button:active {
  transform: scale(0.97);
  scale: 0.98;
}
.am-button > span {
  transform: translate(var(--magnet-x, 0px), var(--magnet-y, 0px));
  transition: transform var(--am-dur-2) var(--am-ease-out);
}
.am-button:hover > span {
  animation: am-arrow var(--am-dur-2) var(--am-ease-out);
}
.am-press-ripple {
  position: absolute;
  width: 8px;
  height: 8px;
  margin: -4px;
  border: 1px solid var(--am-paper);
  border-radius: 50%;
  pointer-events: none;
  animation: am-click 0.65s var(--am-ease-out) forwards;
}
input[type="range"] {
  min-height: 32px;
  cursor: ew-resize;
  accent-color: var(--am-sakura);
}
input[type="range"]::-webkit-slider-thumb {
  transition: transform var(--am-dur-1);
}
input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.3);
}
.am-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  cursor: pointer;
  text-transform: none !important;
}
.am-switch input {
  accent-color: var(--am-red);
  position: absolute;
  width: 42px;
  height: 28px;
  opacity: 0;
  cursor: pointer;
}
.am-switch__pour {
  pointer-events: none;
  position: relative;
  width: 42px;
  height: 24px;
  border: 1px solid var(--am-sakura);
  border-radius: 20px;
  flex: none;
}
.am-switch__pour::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--am-sakura);
  transition:
    transform var(--am-dur-2) var(--am-ease-out),
    border-radius var(--am-dur-2);
}
.am-switch:has(input:checked) .am-switch__pour::after {
  transform: translateX(18px) rotate(45deg);
  border-radius: 50% 50% 50% 0;
}
.am-switch:has(input:focus-visible) .am-switch__pour {
  pointer-events: none;
  outline: 2px solid var(--am-sakura);
  outline-offset: 4px;
}
.am-threadline {
  position: fixed;
  height: 1px;
  top: auto;
  bottom: 24px;
  left: var(--am-gutter);
  right: var(--am-gutter);
  z-index: 10;
  background: repeating-linear-gradient(
    90deg,
    color-mix(in srgb, var(--am-gold) 35%, transparent) 0 5px,
    transparent 5px 10px
  );
  pointer-events: none;
}
.am-threadline > span {
  width: 100%;
  background: var(--am-gold);
  transform: scaleX(var(--scroll-progress, 0));
}
.am-threadline > i {
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  border: 1px solid var(--am-gold);
  border-radius: 50%;
}
.am-threadline > b {
  position: absolute;
  left: calc(var(--scroll-progress, 0) * 100%);
  top: -3px;
  height: 7px;
  width: 1px;
  background: var(--am-red);
  transform: rotate(35deg);
}
.am-cursor {
  display: none;
}
.am-footer {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 28px var(--am-gutter);
  background: var(--am-ink);
  color: var(--am-paper);
  font: 500 0.62rem var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  min-height: 160px;
  padding-block: 55px;
}
.am-footer > .am-hanko {
  width: 40px;
  height: 40px;
}
.am-footer__drip {
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 8px;
  height: 8px;
  border: 1px solid var(--am-gold);
  border-radius: 50%;
  animation: am-puddle 3s var(--am-ease-out) infinite;
}
@keyframes am-mist {
  to {
    transform: translateX(5%);
  }
}
@keyframes am-petal {
  to {
    transform: translate(70px, 90px) rotate(220deg);
  }
}
@keyframes am-rain {
  to {
    transform: translate(-60px, 130vh);
  }
}
@keyframes am-puddle {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  30% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
@keyframes am-detail {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}
@keyframes am-nudge {
  25% {
    transform: translateX(5px);
  }
  70% {
    transform: translateX(-2px);
  }
}
@keyframes am-stamp {
  from {
    opacity: 0;
    transform: translateY(-25px) rotate(-14deg) scale(1.4);
  }
}
@keyframes am-arrow {
  45% {
    transform: translate(16px, -16px);
    opacity: 0;
  }
  46% {
    transform: translate(-16px, 16px);
  }
}
@keyframes am-click {
  to {
    transform: scale(30);
    opacity: 0;
  }
}
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .am-cursor {
    display: block;
    position: fixed;
    z-index: 50;
    width: 12px;
    height: 12px;
    margin: -6px;
    border: 1px solid var(--am-gold);
    border-radius: 50%;
    pointer-events: none;
    transition:
      scale var(--am-dur-2),
      opacity var(--am-dur-2);
    opacity: 0.55;
  }
  .am-cursor[data-active="true"] {
    scale: 2.5;
    opacity: 0.8;
  }
}
@media (max-width: 1100px) {
  .am-header {
    gap: 18px;
  }
  .am-header nav {
    gap: 14px;
  }
  .am-header__counter {
    font-size: 0.55rem;
  }
}
@media (max-width: 900px) {
  .am-header {
    padding: 12px 22px;
    gap: 12px;
  }
  .am-header nav {
    display: none;
  }
  .am-header__counter {
    margin-left: auto;
    font-size: 0.5rem;
  }
  .am-sound {
    margin-left: auto;
    font-size: 0.5rem;
    gap: 4px;
  }
  .am-sound svg {
    width: 14px;
  }
  .am-logo {
    font-size: 0.85rem;
    gap: 7px;
  }
  .am-stage {
    z-index: 4;
  }
  .am-mobile-band {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(40svh + 86px);
    background: var(--am-paper);
    mask-image: linear-gradient(to bottom, #1a1613 90%, transparent);
  }
  .am-page[data-chapter="2"] .am-mobile-band,
  .am-page[data-chapter="5"] .am-mobile-band {
    background: var(--am-indigo);
  }
  .am-page[data-chapter="3"] .am-mobile-band {
    background: color-mix(in srgb, var(--am-sakura) 22%, var(--am-paper));
  }
  .am-canvas {
    top: 70px;
    left: 12px;
    width: calc(100vw - 24px);
    height: 36svh;
    opacity: 1;
    transform: none;
  }
  .am-section {
    min-height: 125svh;
    padding: calc(40svh + 105px) 22px 90px;
    display: block;
  }
  .am-section > .am-stage-anchor {
    top: 70px;
    left: 12px;
    width: calc(100vw - 24px);
    height: 36svh;
  }
  .am-chapter-copy {
    max-width: 560px;
    margin-inline: auto;
  }
  .am-hero {
    min-height: 115svh;
  }
  .am-hero__copy {
    max-width: 560px;
  }
  h1 {
    font-size: 5rem;
    margin: 20px 0;
  }
  h1 em {
    font-size: 1.4rem;
    margin-top: 18px;
  }
  h2,
  .am-light h2,
  .am-commission h2 {
    font-size: clamp(2.6rem, 10vw, 4.5rem);
  }
  p {
    font-size: 1rem;
  }
  .am-vertical {
    top: auto;
    bottom: 50px;
    right: 22px;
    font-size: 1rem;
  }
  .am-hero > .am-hanko {
    display: none;
  }
  .am-stage-caption {
    position: static;
    display: block;
    margin-top: 30px;
    font-size: 0.5rem;
  }
  .am-light {
    min-height: 125svh;
  }
  .am-light .am-control {
    margin-top: 30px;
    padding: 20px 0;
    border-left: 0;
    border-top: 1px solid color-mix(in srgb, var(--am-paper) 30%, transparent);
    max-width: none;
  }
  .am-spec {
    margin-top: 30px;
  }
  .am-making ol {
    grid-template-columns: 1fr;
  }
  .am-commission dl {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .am-commission dd {
    font-size: 0.76rem;
  }
  .am-footer {
    flex-wrap: wrap;
    padding: 35px 22px;
  }
  .am-leader {
    display: none;
  }
  .am-threadline {
    bottom: 12px;
    left: 22px;
    right: 22px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
  .am-line > span {
    transform: none !important;
  }
  .am-ridge {
    transform: none;
  }
  .am-cursor,
  .am-rain-veil {
    display: none;
  }
  .am-canvas {
    opacity: 1;
  }
}

/* Anatomy is one persistent inspection stage, with a stable detail column. */
.am-structure {
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 0.9fr);
  column-gap: 4vw;
  min-height: 115svh;
  align-items: start;
  padding-top: 120px;
}
.am-structure > .am-stage-anchor {
  left: 0;
  top: 11svh;
  width: 60%;
  height: 64svh;
}
.am-structure h2 {
  font-size: clamp(2.6rem, 4vw, 4rem);
  margin: 18px 0 28px;
}
.am-anatomy-ui[hidden],
.am-hotspot[hidden] {
  display: none !important;
}
.am-anatomy-ui {
  position: fixed;
  inset: 0;
  pointer-events: none;
}
.am-inspector-navigation {
  position: fixed;
  pointer-events: auto;
}
.am-inspector-parts.am-parts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  max-width: none;
  border-top: 1px solid var(--am-gold);
  background: color-mix(in srgb, var(--am-paper) 94%, transparent);
}
.am-inspector-parts.am-parts button {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 12px;
  min-height: 46px;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--am-gold) 35%, transparent);
  overflow: visible;
}
.am-inspector-parts.am-parts button::before {
  display: none;
}
.am-inspector-parts.am-parts button small {
  font: 400 0.58rem var(--font-mono);
  color: var(--am-red);
}
.am-inspector-parts.am-parts button span {
  font: 500 0.72rem var(--font-mono);
  letter-spacing: 0.02em;
  transform: none;
}
.am-inspector-parts.am-parts button:hover,
.am-inspector-parts.am-parts button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--am-gold) 12%, transparent);
}
.am-inspector-parts.am-parts button[aria-pressed="true"] {
  box-shadow: inset 0 -2px var(--am-red);
}
.am-inspector-navigation__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 7px 0;
  font: 400 0.57rem var(--font-mono);
  color: var(--am-indigo);
  background: var(--am-paper);
}
.am-inspector-navigation__foot button {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 44px;
  border: 0;
  padding: 6px 0 6px 12px;
  background: none;
  color: var(--am-red);
  cursor: pointer;
  font: inherit;
}
.am-inspector-navigation__foot button:disabled {
  opacity: 0.45;
  cursor: default;
}
.am-inspector-navigation__foot button span {
  font-size: 1.2rem;
}
.am-hotspot {
  position: fixed;
  pointer-events: auto;
  width: 44px;
  height: 44px;
  margin: -22px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: color-mix(in srgb, var(--am-paper) 90%, transparent);
  color: var(--am-ink);
  cursor: pointer;
  font: 400 0.62rem var(--font-mono);
}
.am-hotspot > span {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 1px solid var(--am-gold);
  border-radius: 50%;
  transition:
    background var(--am-dur-2),
    color var(--am-dur-2);
}
.am-hotspot:hover > span,
.am-hotspot:focus-visible > span,
.am-hotspot[data-selected="true"] > span {
  color: var(--am-paper);
  background: var(--am-red);
  border-color: var(--am-red);
}
.am-hotspot b {
  position: absolute;
  left: 42px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  padding: 7px 10px;
  background: var(--am-paper);
  font: 400 0.62rem var(--font-mono);
  transform: translateX(-6px);
  transition:
    opacity var(--am-dur-2),
    transform var(--am-dur-2);
}
.am-hotspot:hover b,
.am-hotspot:focus-visible b {
  opacity: 1;
  transform: none;
}
.am-hotspot-lines {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.am-hotspot-lines path {
  fill: none;
  stroke: var(--am-gold);
  stroke-width: 1;
  opacity: 0;
}
.am-hotspot-lines path[data-active="true"] {
  opacity: 0.6;
}
.am-inspector-detail {
  border-top: 1px solid var(--am-gold);
  padding-top: 22px;
}
.am-inspector-detail__body {
  min-height: 200px;
}
.am-inspector-material {
  display: block;
  font: 400 0.6rem var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--am-indigo);
}
.am-inspector-detail h3 {
  font-size: clamp(1.7rem, 2.5vw, 2.5rem);
  margin: 12px 0 14px;
  letter-spacing: -0.035em;
}
.am-inspector-detail p {
  font-size: 0.95rem;
  line-height: 1.6;
}
.am-inspector-detail .am-inspector-instruction {
  font-size: 0.82rem;
  margin-top: 12px;
  color: var(--am-indigo);
}
.am-inspector-actions {
  min-height: 54px;
  display: flex;
  align-items: start;
}
.am-inspector-actions > div {
  display: flex;
  gap: 8px;
}
.am-inspector-actions button {
  min-height: 44px;
  padding: 8px 16px;
  font: 500 0.63rem var(--font-mono);
  color: var(--am-ink);
  border: 1px solid var(--am-gold);
  background: transparent;
  cursor: pointer;
  transition: background var(--am-dur-2);
}
.am-inspector-actions button:hover,
.am-inspector-actions button[aria-pressed="true"] {
  background: color-mix(in srgb, var(--am-gold) 15%, transparent);
}
.am-inspector-actions button:disabled {
  opacity: 0.65;
  cursor: progress;
}
.am-inspector-runner {
  display: grid;
  gap: 10px;
  margin-top: 16px;
  font: 400 0.62rem var(--font-mono);
  text-transform: uppercase;
}
.am-inspector-runner > span:first-child {
  display: flex;
  justify-content: space-between;
}
.am-inspector-runner output {
  color: var(--am-red);
  font-variant-numeric: tabular-nums;
}
.am-inspector-runner input {
  width: 100%;
  accent-color: var(--am-red);
}
.am-inspector-range-ends {
  display: flex;
  justify-content: space-between;
  font-size: 0.52rem;
  color: var(--am-indigo);
}
.am-inspector-range-ends i {
  font-style: normal;
}
.am-inspector-reveal {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  min-height: 44px;
  margin-top: 10px;
  border: 0;
  background: none;
  color: var(--am-indigo);
  font: 400 0.65rem var(--font-mono);
  cursor: pointer;
}
.am-inspector-reveal > span {
  color: var(--am-red);
  font-size: 1rem;
}
.am-inspector-spec {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  padding-top: 16px;
  margin-top: 12px;
  border-top: 1px solid color-mix(in srgb, var(--am-gold) 45%, transparent);
  font: 400 0.55rem var(--font-mono);
  color: var(--am-indigo);
}
.am-anatomy-fallback > div {
  margin-block: 20px;
}
.am-anatomy-fallback dt {
  font-family: var(--font-display);
  font-size: 1.4rem;
}
.am-anatomy-fallback dd {
  margin: 8px 0;
  line-height: 1.6;
}
@media (max-width: 1100px) and (min-width: 901px) {
  .am-inspector-parts.am-parts button {
    gap: 5px;
    padding-inline: 5px;
  }
  .am-inspector-parts.am-parts button span {
    font-size: 0.55rem;
  }
  .am-inspector-detail__body {
    min-height: 230px;
  }
}
@media (max-width: 900px) {
  .am-structure {
    display: block;
    padding-top: calc(30svh + 235px);
    padding-bottom: 80px;
    min-height: 125svh;
  }
  .am-structure > .am-stage-anchor {
    top: 70px;
    left: 12px;
    width: calc(100vw - 24px);
    height: 30svh;
  }
  .am-page[data-chapter="1"] .am-mobile-band {
    height: calc(30svh + 224px);
  }
  .am-structure h2 {
    font-size: 2.2rem;
    margin: 12px 0 22px;
  }
  .am-inspector-parts.am-parts button {
    min-height: 44px;
    padding: 8px 5px;
    gap: 5px;
  }
  .am-inspector-parts.am-parts button span {
    font-size: 0.7rem;
    letter-spacing: 0;
    text-transform: none;
  }
  .am-inspector-parts.am-parts button small {
    font-size: 0.48rem;
  }
  .am-inspector-navigation__foot {
    padding-block: 0;
    font-size: 0.62rem;
    gap: 8px;
  }
  .am-inspector-navigation__foot button {
    gap: 8px;
  }
  .am-hotspot:not([data-selected="true"]) {
    display: none;
  }
  .am-hotspot-lines {
    display: none;
  }
  .am-inspector-detail__body {
    min-height: 185px;
  }
  .am-inspector-detail h3 {
    font-size: 1.85rem;
  }
}

/* Native scroll holds the complete Making scene while its ten beats advance. */
.am-making-sequence {
  position: relative;
  z-index: 2;
  pointer-events: none;
}
.am-making-guide {
  display: none;
}
.am-making-sequence[data-pinned="true"] {
  height: calc(var(--am-making-distance) + 100svh);
}
.am-making-sequence[data-pinned="true"] > .am-making-frame {
  position: sticky;
  top: 0;
  min-height: 100svh;
  height: 100svh;
  padding: clamp(72px, 9svh, 110px) var(--am-gutter) 36px;
  align-items: stretch;
}
.am-making-sequence[data-pinned="true"] .am-chapter-copy {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}
.am-making-sequence[data-pinned="true"] h2 {
  flex-shrink: 0;
  font-size: clamp(2rem, 4.8svh, 3.5rem);
  line-height: 1.02;
  margin: 14px 0;
}
.am-making-sequence[data-pinned="true"] .am-chapter-copy > p {
  flex-shrink: 0;
  font-size: clamp(0.85rem, 1.8svh, 1.05rem);
  line-height: 1.5;
}
.am-making-sequence[data-pinned="true"] ol {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(10, minmax(0, 1fr));
  grid-template-columns: 1fr;
  margin: 18px 0 0;
}
.am-making-sequence[data-pinned="true"] li {
  min-height: 0;
  padding: 0;
  align-items: center;
}
.am-making-sequence[data-pinned="true"] li strong {
  font-size: clamp(0.9rem, 2.3svh, 1.2rem);
  line-height: 1.15;
}
.am-making-sequence[data-pinned="true"] .am-making-guide {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 24px;
  margin-top: 10px;
  font: 400 0.58rem var(--font-mono);
  color: var(--am-indigo);
}
.am-making-guide output {
  color: var(--am-red);
  font-variant-numeric: tabular-nums;
}
@media (max-width: 900px) {
  .am-making-sequence[data-pinned="true"] > .am-making-frame {
    padding: calc(23svh + 88px) 22px 24px;
  }
  .am-making-sequence[data-pinned="true"] .am-stage-anchor {
    top: 64px;
    left: 12px;
    width: calc(100vw - 24px);
    height: 23svh;
  }
  .am-page[data-making-pinned="true"][data-chapter="4"] .am-mobile-band {
    height: calc(23svh + 82px);
  }
  .am-making-sequence[data-pinned="true"] h2 {
    font-size: clamp(1.5rem, 3.4svh, 1.9rem);
    margin: 10px 0;
  }
  .am-making-sequence[data-pinned="true"] .am-kicker {
    font-size: 0.55rem;
  }
  .am-making-sequence[data-pinned="true"] .am-chapter-copy > p {
    font-size: 0.8125rem;
    line-height: 1.35;
  }
  .am-making-sequence[data-pinned="true"] ol {
    margin-top: 12px;
  }
  .am-making-sequence[data-pinned="true"] li {
    gap: 12px;
  }
  .am-making-sequence[data-pinned="true"] li strong {
    font-size: clamp(0.85rem, 1.95svh, 1rem);
  }
  .am-making-sequence[data-pinned="true"] li > span {
    font-size: 0.53rem;
  }
  .am-making-sequence[data-pinned="true"] .am-making-guide {
    margin-top: 7px;
    min-height: 20px;
    font-size: 0.5rem;
  }
}

/* Stacked stages reserve a real reading boundary; portrait tablets use their own scale. */
@media (max-width: 900px) {
  .am-mobile-band {
    height: var(--am-band-bottom, calc(36svh + 100px)) !important;
    mask-image: linear-gradient(
      to bottom,
      #1a1613 calc(100% - 18px),
      transparent
    );
  }
  .am-section {
    scroll-margin-top: 0;
  }
  .am-line {
    scroll-margin-top: calc(var(--am-band-bottom, 40svh) + 24px);
  }
}
@media (min-width: 601px) and (max-width: 900px) {
  .am-section {
    padding: calc(50svh + 118px) 44px 100px;
    min-height: 135svh;
  }
  .am-section > .am-stage-anchor {
    top: 70px;
    height: 50svh;
  }
  .am-chapter-copy,
  .am-hero__copy {
    max-width: 720px;
    width: 100%;
    margin-inline: auto;
  }
  h1 {
    font-size: 6.5rem;
  }
  h1 em {
    font-size: 1.9rem;
  }
  h2,
  .am-light h2,
  .am-commission h2 {
    font-size: clamp(3rem, 5.8vw, 4rem);
  }
  .am-chapter-copy > p {
    max-width: 60ch;
    font-size: 1.1rem;
  }
  .am-structure {
    padding-top: calc(42svh + 245px);
  }
  .am-structure > .am-stage-anchor {
    height: 42svh;
  }
  .am-structure h2 {
    font-size: 3rem;
  }
  .am-inspector-detail {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 14px 28px;
  }
  .am-inspector-detail__body {
    grid-row: 1 / span 3;
    min-height: 220px;
  }
  .am-inspector-actions,
  .am-inspector-runner,
  .am-inspector-reveal {
    grid-column: 2;
    margin-top: 0;
  }
  .am-inspector-parts.am-parts button span {
    font-size: 0.8rem;
  }
  .am-inspector-navigation__foot {
    font-size: 0.7rem;
  }
  .am-light .am-control {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    column-gap: 40px;
  }
  .am-light .am-control > label:first-child {
    grid-column: 1;
  }
  .am-light .am-control > input {
    grid-column: 1;
  }
  .am-light .am-switch {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }
  .am-swatches {
    max-width: none;
    grid-template-columns: 1fr 1fr;
    column-gap: 28px;
  }
  .am-commission .am-chapter-copy {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 32px;
  }
  .am-commission .am-kicker,
  .am-commission h2 {
    grid-column: 1/-1;
  }
  .am-commission .am-chapter-copy > p,
  .am-commission dl {
    grid-column: 1;
  }
  .am-commission dl {
    grid-template-columns: 1fr;
  }
  .am-commission .am-form,
  .am-commission .am-success {
    grid-column: 2;
    grid-row: 3 / span 2;
    align-self: start;
  }
  .am-making-sequence[data-pinned="true"] > .am-making-frame {
    padding-top: calc(34svh + 88px);
    padding-inline: 44px;
  }
  .am-making-sequence[data-pinned="true"] .am-stage-anchor {
    height: 34svh;
  }
  .am-making-sequence[data-pinned="true"] h2 {
    font-size: 2rem;
  }
  .am-making-sequence[data-pinned="true"] li strong {
    font-size: 1.1rem;
  }
}
@media (min-width: 901px) and (max-width: 1180px) {
  .am-page {
    --am-gutter: clamp(28px, 4vw, 48px);
  }
  .am-section {
    column-gap: 4vw;
  }
  h2 {
    font-size: clamp(2.8rem, 4.6vw, 3.6rem);
  }
  .am-chapter-copy > p {
    max-width: 44ch;
    font-size: 1rem;
  }
  .am-header {
    gap: 18px;
  }
  .am-header nav {
    gap: 14px;
  }
}

@media (min-width: 901px) {
  .am-light {
    padding-top: clamp(120px, 18vh, 190px);
    padding-bottom: 100px;
    align-content: start;
    align-items: start;
    row-gap: 30px;
  }
  .am-light > .am-stage-anchor {
    left: 0;
    top: 12svh;
    width: 48%;
    height: 80svh;
  }
  .am-light .am-chapter-copy {
    grid-column: 2;
    grid-row: 1;
  }
  .am-light .am-control {
    grid-column: 2;
    grid-row: 2;
    margin-top: 0;
    justify-self: start;
    max-width: none;
  }
}
@media (min-width: 601px) and (max-width: 900px) {
  .am-making-sequence[data-pinned="true"] .am-chapter-copy > p {
    font-size: 1rem;
    line-height: 1.45;
  }
}

/* Cinematic enhancement. The server-rendered story remains the static fallback. */
.am-page {
  background: var(--page-bg, var(--am-paper));
}
.am-time {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
  max-width: 420px;
  flex: 1;
  margin: 0 auto;
}
.am-time label {
  flex: 1;
  font: 400 0.58rem var(--font-mono);
}
.am-time label > span {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.am-time input {
  width: 100%;
  accent-color: var(--am-gold);
  height: 12px;
}
.am-time button {
  font: 400 0.58rem var(--font-mono);
  padding: 8px 0;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
}
.am-static-poster {
  width: 42%;
  position: absolute;
  right: 3%;
  top: 18svh;
  height: 65svh;
  max-height: 65svh;
}
.am-page[data-world-mode="static"] .am-stage {
  position: absolute;
  bottom: auto;
  height: 100svh;
  z-index: 3;
}
.am-static-poster svg {
  width: 100%;
  height: 100%;
}
.am-page[data-world-mode="static"] .am-inspector-detail {
  display: none;
}
.am-page[data-world-mode="static"] .am-anatomy-fallback {
  display: grid;
}
.am-page[data-world-mode="static"] .am-section::before {
  display: block;
}
.am-page[data-world-mode="static"] .am-line > span {
  transform: none !important;
  opacity: 1 !important;
}
.am-loading {
  position: fixed;
  inset: auto 0 8svh;
  text-align: center;
  z-index: 70;
  pointer-events: none;
  font: 400 0.7rem var(--font-mono);
  color: var(--am-ink);
}
.am-loading span {
  display: block;
  font: 400 2rem var(--font-display);
  margin-top: 10px;
}
.am-page[data-world-mode="loading"] .am-canvas {
  visibility: hidden;
}
.am-page[data-world-mode="cinematic"] {
  color: var(--am-world-text);
  background: transparent;
}
.am-world-track {
  height: 900svh;
  pointer-events: none;
}
.am-page[data-world-mode="cinematic"] .am-world,
.am-page[data-world-mode="cinematic"] > .am-footer {
  display: none;
}
.am-page[data-world-mode="cinematic"] > .am-section,
.am-page[data-world-mode="cinematic"] > #making {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100svh;
  min-height: 0;
  z-index: 4;
  opacity: var(--chapter-opacity, 0);
  pointer-events: none;
  overflow: hidden;
  padding: clamp(100px, 15svh, 160px) var(--am-gutter) 120px;
  color: inherit;
  background: none;
}
.am-page[data-world-mode="cinematic"] > #making {
  padding: 0;
}
.am-page[data-world-mode="cinematic"] .am-making-frame {
  height: 100svh;
  min-height: 0;
  position: static;
  padding: clamp(100px, 15svh, 160px) var(--am-gutter) 200px;
}
.am-page[data-world-mode="cinematic"] .am-section::before {
  display: none;
}
.am-page[data-world-mode="cinematic"] .am-chapter-copy {
  --am-world-text: var(--am-paper);
  color: var(--am-paper);
  background: linear-gradient(
    90deg,
    rgba(26, 22, 19, 0.78),
    rgba(26, 22, 19, 0.66)
  );
  max-height: calc(100svh - 240px);
  overflow-y: auto;
  scrollbar-width: thin;
  pointer-events: auto;
  align-self: center;
  overscroll-behavior: contain;
  padding: 24px;
}
.am-page[data-world-mode="cinematic"] .am-chapter-copy > p {
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  max-width: 44ch;
}
.am-page[data-world-mode="cinematic"] .am-line > span {
  transform: translateY(var(--chapter-rise, 0%)) !important;
  opacity: 1 !important;
}
.am-page[data-world-mode="cinematic"] .am-light {
  display: block;
}
.am-page[data-world-mode="cinematic"] .am-light .am-chapter-copy {
  position: absolute;
  bottom: 110px;
  left: var(--am-gutter);
  width: min(36vw, 490px);
}
.am-page[data-world-mode="cinematic"] .am-light .am-control,
.am-page[data-world-mode="cinematic"] .am-making ol,
.am-page[data-world-mode="cinematic"] .am-making-guide,
.am-page[data-world-mode="cinematic"] .am-stage-caption,
.am-page[data-world-mode="cinematic"] .am-vertical,
.am-page[data-world-mode="cinematic"] .am-hero > .am-hanko {
  display: none;
}
.am-page[data-world-mode="cinematic"] .am-header {
  background: color-mix(in srgb, var(--page-bg) 90%, transparent);
  color: var(--am-world-text);
  gap: 24px;
}
.am-page[data-world-mode="cinematic"] .am-kicker {
  color: var(--am-world-text);
  opacity: 0.85;
}
.am-page[data-world-mode="cinematic"] .am-chapter-copy h1 em {
  color: var(--am-sakura);
}
.am-page[data-world-mode="cinematic"] .am-chapter-copy .am-swatches button {
  color: inherit;
}
.am-page[data-world-mode="cinematic"] h2,
.am-page[data-world-mode="cinematic"] h2 em {
  color: inherit;
}
.am-journey-nav {
  position: fixed;
  bottom: 20px;
  left: var(--am-gutter);
  right: var(--am-gutter);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  padding-top: 12px;
  pointer-events: auto;
}
.am-journey-nav > button {
  background: none;
  border: 0;
  color: inherit;
  font-size: 1.4rem;
  padding: 8px 12px;
  cursor: pointer;
}
.am-journey-nav button:disabled {
  opacity: 0.25;
  cursor: default;
}
.am-chapter-marker {
  flex: 1;
  font: 400 0.7rem var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.am-chapter-marker small {
  display: block;
  font-size: 0.53rem;
  opacity: 0.65;
  margin-top: 6px;
  letter-spacing: 0.04em;
}
.am-jump-list {
  display: flex;
  gap: 8px;
}
.am-jump-list button {
  border: 0;
  border-bottom: 1px solid transparent;
  background: none;
  color: inherit;
  padding: 10px;
  font: 400 0.6rem var(--font-mono);
  cursor: pointer;
  opacity: 0.5;
}
.am-jump-list button[aria-current] {
  opacity: 1;
  border-color: currentColor;
}
.am-enter-tool {
  position: fixed;
  right: var(--am-gutter);
  bottom: 125px;
  z-index: 15;
  border: 1px solid currentColor;
  background: color-mix(in srgb, var(--page-bg) 92%, transparent);
  color: inherit;
  padding: 16px 22px;
  font: 400 0.67rem var(--font-mono);
  cursor: pointer;
}
.am-enter-tool span {
  margin-left: 24px;
}
.am-page[data-active-chapter="3"] .am-enter-tool {
  left: var(--am-gutter);
  right: auto;
}
.am-making-strip {
  position: fixed;
  left: var(--am-gutter);
  right: var(--am-gutter);
  bottom: 86px;
  display: flex;
  z-index: 15;
  overflow-x: auto;
  gap: 0;
  border-top: 1px solid currentColor;
  padding-top: 12px;
  scrollbar-width: thin;
}
.am-making-strip button {
  flex: 1;
  min-width: 95px;
  padding: 10px 8px;
  background: none;
  border: 0;
  color: inherit;
  font: 400 0.58rem var(--font-mono);
  text-align: left;
  opacity: 0.45;
  cursor: pointer;
}
.am-making-strip button span {
  display: block;
  margin-bottom: 6px;
}
.am-making-strip button[aria-current] {
  color: var(--am-red);
  opacity: 1;
}
.am-page[data-active-chapter="4"] .am-enter-tool {
  bottom: 180px;
}
.am-tool-sheet {
  position: fixed;
  right: var(--am-gutter);
  top: 110px;
  bottom: 110px;
  width: min(38vw, 500px);
  z-index: 40;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--am-paper);
  color: var(--am-ink);
  padding: 24px;
  border-top: 1px solid var(--am-gold);
  box-shadow: 0 18px 50px rgba(26, 22, 19, 0.12);
}
.am-tool-sheet > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font: 400 0.55rem var(--font-mono);
  padding-bottom: 20px;
  border-bottom: 1px solid var(--am-gold);
}
.am-tool-sheet h3 {
  font: 400 1.7rem var(--font-display);
  margin: 24px 0 14px;
}
.am-tool-sheet p {
  font-size: 0.9rem;
  line-height: 1.7;
}
.am-tool-sheet button {
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
}
.am-tool-sheet label {
  display: block;
  margin-top: 24px;
  font: 400 0.7rem var(--font-mono);
}
.am-tool-sheet input[type="range"] {
  display: block;
  width: 100%;
  margin-top: 18px;
  accent-color: var(--am-red);
}
.am-tool-sheet .am-inspector-detail {
  display: block;
  border: 0;
  padding: 20px 0 0;
}
.am-tool-sheet .am-inspector-actions {
  margin: 20px 0;
}
.am-tool-close {
  font: 400 0.6rem var(--font-mono);
  padding: 8px 0;
}
.am-tool-close span {
  font-size: 1.3rem;
  margin-left: 12px;
}
.am-focus-stage {
  font: 400 0.6rem var(--font-mono);
  margin: 20px 0;
}
.am-sheet-parts {
  display: none;
}
.am-page[data-tool="anatomy"] > .am-structure .am-chapter-copy {
  visibility: hidden;
}
.am-page[data-tool="light"] > .am-canopy .am-chapter-copy,
.am-page[data-tool="making"] .am-making .am-chapter-copy {
  visibility: hidden;
}
.am-canvas:focus-visible {
  outline: 2px solid var(--am-gold);
  outline-offset: -4px;
}
.am-page[data-world-mode="cinematic"] .am-mobile-band {
  display: none;
}
@media (max-width: 900px) {
  .am-header {
    gap: 14px !important;
    padding: 14px 20px !important;
  }
  .am-header__counter {
    display: none;
  }
  .am-time {
    min-width: 140px;
    gap: 8px;
    margin: 0;
  }
  .am-time label {
    font-size: 0.48rem;
  }
  .am-time button {
    font-size: 0.5rem;
  }
  .am-time output {
    display: none;
  }
  .am-sound span {
    font-size: 0.5rem;
  }
  .am-sound svg {
    width: 16px;
  }
  .am-static-poster {
    width: 80%;
    right: 10%;
    top: 70px;
    height: 32svh;
  }
  .am-page[data-world-mode="cinematic"] > .am-section,
  .am-page[data-world-mode="cinematic"] .am-making-frame {
    padding: calc(50svh + 78px) 24px 120px;
    display: block;
  }
  .am-page[data-world-mode="cinematic"] .am-chapter-copy {
    max-height: calc(50svh - 185px);
    width: 100%;
    overflow: auto;
    padding: 12px;
  }
  .am-page[data-world-mode="cinematic"] h1 {
    font-size: clamp(3.5rem, 12vw, 6rem);
    margin: 12px 0;
  }
  .am-page[data-world-mode="cinematic"] h1 em {
    font-size: 1.3rem;
    margin-top: 12px;
  }
  .am-page[data-world-mode="cinematic"] h2 {
    font-size: clamp(2rem, 7vw, 3.2rem);
    margin: 14px 0;
  }
  .am-page[data-world-mode="cinematic"] .am-kicker {
    font-size: 0.52rem;
  }
  .am-page[data-world-mode="cinematic"] .am-light .am-chapter-copy {
    position: static;
    width: 100%;
  }
  .am-page[data-world-mode="cinematic"] .am-swatches {
    margin-top: 16px;
  }
  .am-page[data-world-mode="cinematic"] .am-swatches button {
    min-height: 42px;
  }
  .am-journey-nav {
    left: 18px;
    right: 18px;
    bottom: 12px;
    gap: 8px;
  }
  .am-chapter-marker {
    font-size: 0.58rem;
  }
  .am-chapter-marker small {
    font-size: 0.45rem;
  }
  .am-jump-list {
    gap: 0;
  }
  .am-jump-list button {
    padding: 10px 6px;
    font-size: 0.5rem;
  }
  .am-journey-nav > button {
    padding: 8px 4px;
    font-size: 1.1rem;
  }
  .am-enter-tool {
    left: 24px;
    right: auto;
    bottom: 92px;
    padding: 12px 16px;
    font-size: 0.6rem;
  }
  .am-making-strip {
    left: 18px;
    right: 18px;
    bottom: 80px;
  }
  .am-making-strip button {
    min-width: 110px;
  }
  .am-page[data-active-chapter="4"] .am-enter-tool {
    bottom: 160px;
  }
  .am-tool-sheet {
    left: 12px;
    right: 12px;
    bottom: 76px;
    top: auto;
    max-height: 48svh;
    width: auto;
    padding: 18px;
  }
  .am-tool-sheet > header {
    padding-bottom: 12px;
  }
  .am-sheet-parts {
    display: block;
    margin-top: 14px;
  }
  .am-sheet-parts .am-part-callout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .am-page[data-world-mode="cinematic"] .am-hotspot,
  .am-page[data-world-mode="cinematic"] .am-hotspot-lines,
  .am-page[data-world-mode="cinematic"] .am-inspector-navigation {
    display: none;
  }
  .am-page[data-active-chapter="5"] .am-commission {
    padding-top: calc(38svh + 76px);
  }
  .am-page[data-active-chapter="5"] .am-commission .am-chapter-copy {
    max-height: calc(62svh - 170px);
  }
  .am-tool-sheet .am-inspector-detail__body p {
    font-size: 0.85rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .am-page .am-line > span {
    transform: none !important;
    opacity: 1 !important;
  }
  .am-page .am-petal,
  .am-page .am-mist,
  .am-page .am-rain-veil {
    animation: none !important;
  }
}
.am-page[data-world-mode="cinematic"][data-paper-lit="false"] .am-header {
  background: rgba(26, 22, 19, 0.82);
}
.am-page[data-world-mode="cinematic"][data-paper-lit="false"] .am-enter-tool {
  background: rgba(26, 22, 19, 0.75);
}
.am-page[data-world-mode="cinematic"] .am-inspector-navigation {
  color: var(--am-ink);
}
.am-page[data-world-mode="cinematic"] .am-making-strip {
  background: rgba(244, 236, 221, 0.94);
  color: var(--am-ink);
  padding: 10px 12px;
}
.am-page[data-world-mode="cinematic"] .am-making-strip button {
  opacity: 0.7;
}
.am-page[data-world-mode="cinematic"] .am-making-strip button[aria-current] {
  opacity: 1;
}
.am-page[data-world-mode="cinematic"][data-paper-lit="true"] .am-journey-nav {
  background: rgba(244, 236, 221, 0.9);
  padding: 10px 14px;
}
.am-page[data-world-mode="cinematic"][data-paper-lit="false"] .am-journey-nav {
  background: rgba(26, 22, 19, 0.72);
  padding: 10px 14px;
}
.am-page[data-world-mode="cinematic"] .am-commission .am-chapter-copy {
  max-height: calc(100svh - 190px);
}
.am-page[data-world-mode="cinematic"] .am-commission h2 {
  font-size: clamp(2.6rem, 4.3vw, 4rem);
}
.am-page[data-world-mode="static"] {
  color: var(--text-contrast);
}
.am-page[data-world-mode="static"] .am-header {
  background: var(--page-bg);
  color: var(--text-contrast);
}
.am-page[data-world-mode="static"] .am-section {
  --am-section-background: var(--page-bg);
  color: var(--text-contrast);
}
.am-page[data-world-mode="static"] h1 em,
.am-page[data-world-mode="static"] h2 em,
.am-page[data-world-mode="static"] .am-kicker,
.am-page[data-world-mode="static"] .am-sound,
.am-page[data-world-mode="static"] .am-header__counter,
.am-page[data-world-mode="static"] .am-inspector-spec,
.am-page[data-world-mode="static"] .am-stage-caption,
.am-page[data-world-mode="static"] .am-making li span,
.am-page[data-world-mode="static"] .am-control output,
.am-page[data-world-mode="static"] .am-commission dt,
.am-page[data-world-mode="static"] .am-form input,
.am-page[data-world-mode="static"] .am-form small,
.am-page[data-world-mode="static"] .am-form label:focus-within span,
.am-page[data-world-mode="static"]
  .am-form
  label:has(input:not(:placeholder-shown))
  span {
  color: inherit;
}
.am-page[data-world-mode="static"] .am-form input {
  border-color: currentColor;
}
@media (max-width: 900px) {
  .am-page[data-world-mode="cinematic"] .am-commission .am-chapter-copy {
    max-height: calc(62svh - 170px);
  }
  .am-page[data-world-mode="cinematic"] .am-commission h2 {
    font-size: 2.3rem;
  }
  .am-page[data-world-mode="cinematic"] .am-journey-nav {
    padding: 8px !important;
  }
}
@media (max-width: 600px) {
  .am-logo > span {
    display: none;
  }
  .am-page[data-world-mode="cinematic"] > .am-section,
  .am-page[data-world-mode="cinematic"] .am-making-frame {
    padding-top: calc(36svh + 100px);
  }
  .am-page[data-world-mode="cinematic"] .am-chapter-copy {
    max-height: calc(64svh - 255px);
  }
  .am-page[data-world-mode="cinematic"] .am-canopy .am-swatches {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 14px;
  }
  .am-page[data-world-mode="cinematic"] .am-canopy h2 .am-line {
    display: inline;
  }
  .am-page[data-world-mode="cinematic"] .am-canopy h2 {
    font-size: 2rem;
  }
  .am-page[data-world-mode="cinematic"] .am-making .am-chapter-copy {
    max-height: calc(64svh - 310px);
  }
}
.am-page[data-tool="making"] .am-tool-sheet {
  bottom: 190px;
}
.am-sheet-parts .am-parts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.am-page:not([data-world-mode="cinematic"]) .am-inspector-detail {
  display: none;
}
.am-header .am-time,
.am-header .am-time label,
.am-header .am-time label > span,
.am-header .am-time output {
  color: inherit;
}
@media (max-width: 900px) {
  .am-page[data-tool="making"] .am-tool-sheet {
    bottom: 170px;
  }
}
.am-page[data-world-mode="cinematic"] {
  --am-world-text: var(--am-paper);
}
.am-page[data-world-mode="cinematic"][data-paper-lit="true"] {
  --am-world-text: var(--am-ink);
}
.am-page[data-world-mode="cinematic"] .am-sound,
.am-page[data-world-mode="cinematic"] .am-inspector-spec {
  color: inherit;
}
.am-page[data-world-mode="cinematic"][data-paper-lit="false"]
  .am-header__counter {
  color: var(--am-sakura);
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#C8412B"/><circle cx="32" cy="32" r="18" fill="none" stroke="#F4ECDD" stroke-width="2"/><path d="M20 27h24M22 36h20" stroke="#F4ECDD" stroke-width="2"/><text x="32" y="43" text-anchor="middle" fill="#F4ECDD" font-size="16" font-family="serif">雨</text></svg>
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F4ECDD", color: "#1A1613", fontFamily: "serif" }}><div style={{ display: "flex", color: "#C8412B", fontSize: 22, letterSpacing: 8 }}>AMAOTO / 雨音</div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02 }}><span>The sound of rain,</span><span style={{ color: "#2B3A55" }}>kept dry.</span></div><div style={{ display: "flex", fontFamily: "monospace", fontSize: 18, letterSpacing: 4 }}>WAGASA ATELIER · KUROKAWA, NAGANO</div></div>, size); }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/page.tsx">
<![CDATA[import { AmaotoShell } from "./scene/AmaotoShell";
export default function AmaotoPage() { return <AmaotoShell />; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/audio/RainSound.ts">
<![CDATA[/** Created only inside a click handler. No assets, autoplay, or remote requests. */
export class RainSound {
  private context: AudioContext;
  private gain: GainNode;
  private source: AudioBufferSourceNode;
  private timer: ReturnType<typeof setInterval>;
  private enabled = false;
  private intensity = 0.15;
  private disposed = false;
  private drops = new Set<OscillatorNode>();
  constructor() {
    const context = (this.context = new AudioContext());
    const buffer = context.createBuffer(
        1,
        context.sampleRate * 3,
        context.sampleRate,
      ),
      channel = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < channel.length; i++) {
      brown = (brown + (Math.random() * 2 - 1) * 0.03) / 1.02;
      channel[i] = brown * 3.5;
    }
    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1900;
    this.gain = context.createGain();
    this.gain.gain.value = 0;
    this.source.connect(filter).connect(this.gain).connect(context.destination);
    this.source.start();
    this.timer = setInterval(() => {
      if (
        !this.enabled ||
        context.state !== "running" ||
        Math.random() > 0.25 * this.intensity
      )
        return;
      const oscillator = context.createOscillator(),
        drop = context.createGain();
      this.drops.add(oscillator);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        700 + Math.random() * 500,
        context.currentTime,
      );
      oscillator.frequency.exponentialRampToValueAtTime(
        180,
        context.currentTime + 0.09,
      );
      drop.gain.setValueAtTime(0.001, context.currentTime);
      drop.gain.linearRampToValueAtTime(
        0.014 * this.intensity,
        context.currentTime + 0.005,
      );
      drop.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.12,
      );
      oscillator.connect(drop).connect(this.gain);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.14);
      oscillator.onended = () => {
        oscillator.disconnect();
        drop.disconnect();
        this.drops.delete(oscillator);
      };
    }, 240);
  }
  async setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled && !document.hidden) await this.context.resume();
    this.ramp();
  }
  setIntensity(n: number) {
    if (Math.abs(n - this.intensity) < 0.02) return;
    this.intensity = Math.max(0.08, Math.min(1, n));
    this.ramp();
  }
  private ramp() {
    if (this.disposed) return;
    const now = this.context.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setTargetAtTime(
      this.enabled ? 0.045 * this.intensity : 0,
      now,
      0.2,
    );
  }
  visibility() {
    if (this.disposed) return;
    if (document.hidden) void this.context.suspend();
    else if (this.enabled) void this.context.resume();
  }
  dispose() {
    this.disposed = true;
    clearInterval(this.timer);
    this.drops.forEach((node) => {
      node.stop();
      node.disconnect();
    });
    this.drops.clear();
    this.source.stop();
    this.source.disconnect();
    this.gain.disconnect();
    void this.context.close();
  }
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/audio/soundscape.ts">
<![CDATA[import type { ChapterProgressState } from "../logic/chapters";
import { createSeededRandom } from "../logic/rng";
/** All sources are synthesized after an explicit sound-button gesture. */
export class Soundscape {
  private context = new AudioContext();
  private master = this.context.createGain();
  private nodes: AudioNode[] = [];
  private sources: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private voices = new Set<OscillatorNode>();
  private timer: ReturnType<typeof setInterval>;
  private enabled = false;
  private disposed = false;
  private workshopWeight = 0;
  private random = createSeededRandom(481);
  private room = this.context.createGain();
  private workshop = this.context.createGain();
  private paper = this.context.createGain();
  private rain = this.context.createGain();
  private paperFilter = this.context.createBiquadFilter();
  private rainFilter = this.context.createBiquadFilter();
  constructor() {
    const c = this.context;
    this.master.gain.value = 0;
    this.master.connect(c.destination);
    for (const g of [this.room, this.workshop, this.paper, this.rain]) {
      g.gain.value = 0;
      g.connect(this.master);
      this.nodes.push(g);
    }
    this.room.gain.value = 0.12;
    for (const [frequency, type] of [
      [110, "sine"],
      [165, "triangle"],
    ] as const) {
      const o = c.createOscillator(),
        g = c.createGain(),
        f = c.createBiquadFilter();
      o.frequency.value = frequency;
      o.type = type;
      f.type = "lowpass";
      f.frequency.value = 460;
      g.gain.value = 0.18;
      o.connect(f).connect(g).connect(this.room);
      o.start();
      this.sources.push(o);
      this.nodes.push(f, g);
    }
    const buffer = c.createBuffer(1, c.sampleRate * 3, c.sampleRate),
      data = buffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i++) {
      brown = (brown + (this.random() * 2 - 1) * 0.03) / 1.02;
      data[i] = brown * 3.5;
    }
    const noise = (
      filter: BiquadFilterNode,
      gain: GainNode,
      frequency: number,
      type: BiquadFilterType,
    ) => {
      const s = c.createBufferSource();
      s.buffer = buffer;
      s.loop = true;
      filter.type = type;
      filter.frequency.value = frequency;
      s.connect(filter).connect(gain);
      s.start();
      this.sources.push(s);
      this.nodes.push(filter);
    };
    const air = c.createBiquadFilter();
    noise(air, this.workshop, 850, "bandpass");
    noise(this.paperFilter, this.paper, 450, "lowpass");
    noise(this.rainFilter, this.rain, 1200, "bandpass");
    this.timer = setInterval(() => {
      if (!this.enabled || c.state !== "running") return;
      if (this.random() < this.workshopWeight * 0.22)
        this.ping(260 + this.random() * 180, 0.055, 0.16, "triangle");
      else if (this.random() < 0.13)
        this.ping(650 + this.random() * 400, 0.04, 0.12, "sine");
    }, 280);
  }
  private target(param: AudioParam, value: number, time = 0.12) {
    if (this.disposed) return;
    param.setTargetAtTime(value, this.context.currentTime, time);
  }
  private ping(
    frequency: number,
    gain: number,
    duration: number,
    type: OscillatorType,
    ratio = 0.55,
  ) {
    const c = this.context,
      o = c.createOscillator(),
      g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(frequency, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(
      frequency * ratio,
      c.currentTime + duration,
    );
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
    o.connect(g).connect(this.master);
    o.start();
    o.stop(c.currentTime + duration + 0.02);
    this.voices.add(o);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
      this.voices.delete(o);
    };
  }
  async setEnabled(value: boolean) {
    if (this.disposed) return;
    this.enabled = value;
    if (value && !document.hidden) await this.context.resume();
    this.target(this.master.gain, value ? 0.06 : 0, 0.06);
  }
  updateProgress(state: ChapterProgressState, rain: number, timeOfDay: number) {
    if (this.disposed) return;
    this.workshopWeight = state.worldVisibility.workshop;
    this.target(this.workshop.gain, this.workshopWeight * 0.22);
    this.target(this.paper.gain, state.worldVisibility.paper * 0.18);
    this.target(this.rain.gain, rain * 0.7);
    this.target(this.paperFilter.frequency, 1600 - state.paperDive * 1250);
    this.target(this.rainFilter.frequency, 600 + timeOfDay * 1000);
  }
  gust() {
    if (!this.enabled || this.context.state !== "running") return;
    this.ping(660, 0.12, 0.9, "sine", 0.75);
    this.ping(990, 0.055, 0.9, "sine", 0.75);
  }
  visibility() {
    if (this.disposed) return;
    if (document.hidden) void this.context.suspend();
    else if (this.enabled) void this.context.resume();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    clearInterval(this.timer);
    this.voices.forEach((o) => {
      o.stop();
      o.disconnect();
    });
    this.voices.clear();
    this.sources.forEach((s) => {
      s.stop();
      s.disconnect();
    });
    this.nodes.forEach((n) => n.disconnect());
    this.master.disconnect();
    void this.context.close();
  }
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/audio/SoundToggle.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Soundscape } from "./soundscape";
import type { DirectorState } from "../scene/director";
export function SoundToggle({
  director,
}: {
  director: RefObject<DirectorState>;
}) {
  const [enabled, setEnabled] = useState(false),
    [preferred, setPreferred] = useState(false),
    audio = useRef<Soundscape | null>(null);
  useEffect(() => {
    try {
      setPreferred(localStorage.getItem("amaoto-rain-sound") === "on");
    } catch {}
    const timer = setInterval(() => {
      const state = director.current;
      audio.current?.updateProgress(
        state.world,
        state.rainIntensity,
        state.timeOfDay,
      );
    }, 120);
    const visibility = () => audio.current?.visibility();
    document.addEventListener("visibilitychange", visibility);
    const gust = () => audio.current?.gust();
    document.addEventListener("amaoto-gust", gust);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("amaoto-gust", gust);
      audio.current?.dispose();
      audio.current = null;
    };
  }, [director]);
  return (
    <button
      className="am-sound"
      type="button"
      aria-pressed={enabled}
      aria-label={`Atelier sound: ${enabled ? "on" : "off"}`}
      title={
        !enabled && preferred
          ? "Your saved preference is on. Click to start sound."
          : undefined
      }
      onClick={() => {
        const next = !enabled;
        try {
          audio.current ??= new Soundscape();
          void audio.current
            .setEnabled(next)
            .then(() => setEnabled(next))
            .catch(() => setEnabled(false));
        } catch {
          setEnabled(false);
        }
        try {
          localStorage.setItem("amaoto-rain-sound", next ? "on" : "off");
        } catch {}
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 10V14M8 6V18M12 3V21M16 7V17M20 10V14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <span>Sound: {enabled ? "on" : "off"}</span>
    </button>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/bg/SectionBackdrop.tsx">
<![CDATA[export function SectionBackdrop() {
  return (
    <div className="am-world" aria-hidden="true">
      <svg className="am-washi" width="100%" height="100%">
        <filter id="am-fibres">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".64 .09"
            numOctaves="3"
            seed="48"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#am-fibres)"
          opacity=".035"
        />
      </svg>
      <div className="am-world__scene am-ridges" data-scene="0">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <circle cx="1080" cy="290" r="150" fill="#B8923A" opacity=".16" />
          <g className="am-ridge am-ridge--far" fill="#2B3A55" opacity=".07">
            <path d="M-100 760Q90 500 230 610L440 390 680 650 840 530 1120 710 1470 480V1100H-100Z" />
          </g>
          <g className="am-ridge am-ridge--near" fill="#1A1613" opacity=".07">
            <path d="M-100 900Q170 700 310 810Q520 580 710 780L960 660 1230 850 1500 750V1100H-100Z" />
          </g>
          <path
            className="am-mist"
            d="M-100 820Q250 720 600 810T1540 780"
            stroke="#F4ECDD"
            strokeWidth="75"
            fill="none"
            opacity=".7"
          />
        </svg>
      </div>
      <div className="am-world__scene am-drafting" data-scene="1">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern
              id="am-asanoha"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0L120 104M120 0L0 104M60 0V104M0 52H120M0 0L120 0 60 104Z"
                fill="none"
                stroke="#B8923A"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect
            width="1440"
            height="1000"
            fill="url(#am-asanoha)"
            opacity=".12"
          />
          <g
            transform="translate(400 470)"
            fill="none"
            stroke="#B8923A"
            opacity=".35"
          >
            <circle r="290" strokeDasharray="1 43" strokeWidth="10" />
            <circle r="310" strokeWidth=".5" />
            <path d="M-340 0H340M0-340V340" strokeWidth=".5" />
          </g>
        </svg>
      </div>
      <div className="am-world__scene am-night" data-scene="2">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <circle cx="1110" cy="220" r="95" fill="#F4ECDD" opacity=".1" />
          <g fill="#1A1613" opacity=".17">
            <path
              className="am-mist"
              d="M-100 280Q150 190 450 285T1200 240V310H-100Z"
            />
            <path d="M650 520Q900 400 1540 500V550H650Z" />
          </g>
        </svg>
        <div className="am-rain-veil">
          {Array.from({ length: 28 }, (_, i) => (
            <i
              key={i}
              style={{ left: `${i * 3.8}%`, animationDelay: `${-i * 0.17}s` }}
            />
          ))}
        </div>
      </div>
      <div className="am-world__scene am-blossoms" data-scene="3">
        <div className="am-dye-blot" />
        {Array.from({ length: 13 }, (_, i) => (
          <svg
            className="am-petal"
            key={i}
            viewBox="0 0 24 32"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 90}%`,
              animationDelay: `${-i * 0.9}s`,
            }}
          >
            <path
              d="M12 30C-5 15 2 2 9 2L12 7 15 2C26 5 25 20 12 30Z"
              fill="#D9748F"
              opacity=".26"
            />
          </svg>
        ))}
      </div>
      <div className="am-world__scene am-grove" data-scene="4">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="#2B3A55" opacity=".035">
            {Array.from({ length: 8 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${i * 183 - 30} 0) rotate(${i % 2 ? 4 : -3})`}
              >
                <path
                  d="M0 1100Q50 500 20-100"
                  strokeWidth={10 + (i % 3) * 4}
                />
                {Array.from({ length: 5 }, (_, j) => (
                  <g key={j}>
                    <path
                      d={`M-2 ${j * 220}L40 ${j * 220 - 3}`}
                      strokeWidth="4"
                    />
                    <path
                      d={`M25 ${j * 220}Q100 ${j * 220 - 100} 140 ${j * 220 - 65}Q90 ${j * 220 - 40} 25 ${j * 220}M25 ${j * 220}Q-65 ${j * 220 - 130}-95 ${j * 220 - 120}Q-80 ${j * 220 - 45} 25 ${j * 220}`}
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="am-world__scene am-dusk" data-scene="5">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <path
            d="M0 760Q500 680 1440 780V1000H0Z"
            fill="#1A1613"
            opacity=".3"
          />
          <g className="am-puddle" fill="none" stroke="#F4ECDD" opacity=".16">
            <ellipse cx="350" cy="850" rx="200" ry="16" />
            <ellipse cx="350" cy="850" rx="120" ry="9" />
          </g>
        </svg>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/bg/StageAnchor.tsx">
<![CDATA[export function StageAnchor() {
  return (
    <div className="am-stage-anchor" data-stage-anchor aria-hidden="true" />
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/brand/Hanko.tsx">
<![CDATA[export function Hanko() { return <span className="am-hanko" aria-label="Amaoto seal">雨音</span>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/brand/Logo.tsx">
<![CDATA[import { Hanko } from "./Hanko";
export function Logo() { return <a className="am-logo" href="#top" aria-label="AMAOTO home"><Hanko /><span>AMAOTO</span></a>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/colourways.ts">
<![CDATA[﻿export const COLOURWAYS = [
  { id: "cream", label: "Washi cream", color: "#F4ECDD", motif: "sakura" as const },
  { id: "indigo", label: "Dusk indigo", color: "#2B3A55", motif: "wave" as const },
  { id: "vermilion", label: "Vermilion", color: "#C8412B", motif: "plain" as const },
  { id: "undyed", label: "Undyed", color: "#B8923A", motif: "plain" as const },
] as const;

]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/copy.ts">
<![CDATA[export const COPY = {
  town: "Kurokawa, Nagano",
  steps: 81,
  leadTime: "14 weeks",
  ribs: 40,
  hero: "The sound of rain, kept dry.",
} as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/parts.ts">
<![CDATA[export const PARTS = [
  { id: "ribs", name: "Bamboo ribs", description: "Forty bowed bamboo ribs hold the canopy in one breath." },
  { id: "stretchers", name: "Stretchers", description: "Hinged links carry the runner's motion into the ribs." },
  { id: "runner", name: "Runner ring", description: "A turned wood hub slides along the shaft to open the umbrella." },
  { id: "thread", name: "Thread lacing", description: "Dark knots tie paper, rib and rim into a single skin." },
  { id: "canopy", name: "Washi paper", description: "Thin paper catches light from behind and keeps the rain out." },
  { id: "handle", name: "Turned handle", description: "Node rings and grip beads finish the shaft by hand." },
] as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/steps.ts">
<![CDATA[export const MAKING_STEPS = [
  "Split the bamboo", "Steam the ribs", "Turn the shaft", "Set the cap", "Hinge the stretchers", "Tie the runner", "Stretch the washi", "Paint the ring", "Bind the rim", "Listen for rain",
] as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/forms/CommissionForm.tsx">
<![CDATA["use client";
import { useEffect, useState } from "react";
import { Hanko } from "../brand/Hanko";
import { validateCommission } from "./validation";

export function CommissionForm({
  canopy,
  onSuccess,
}: {
  canopy: string;
  onSuccess: () => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [fields, setFields] = useState({ name: "", email: "", occasion: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="am-success" role="status">
        <Hanko />
        <span className="am-kicker">雨音 / received</span>
        <h3>Your umbrella is on the bench.</h3>
        <p>
          We saved your {canopy} canopy request. Amaoto will write within one
          working day.
        </p>
      </div>
    );
  return (
    <form
      className="am-form"
      onSubmit={(event) => {
        event.preventDefault();
        const next = validateCommission(fields);
        setErrors(next);
        if (!Object.keys(next).length) {
          setSent(true);
          onSuccess();
        }
      }}
      noValidate
    >
      <label>
        <span id="am-name-label">Name</span>
        <input
          id="am-name"
          name="name"
          autoComplete="name"
          placeholder=" "
          maxLength={160}
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-labelledby="am-name-label"
          aria-describedby={errors.name ? "am-name-error" : undefined}
        />
        {errors.name && <small id="am-name-error">{errors.name}</small>}
      </label>
      <label>
        <span id="am-email-label">Email</span>
        <input
          id="am-email"
          name="email"
          autoComplete="email"
          placeholder=" "
          maxLength={254}
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
          aria-labelledby="am-email-label"
          aria-describedby={errors.email ? "am-email-error" : undefined}
        />
        {errors.email && <small id="am-email-error">{errors.email}</small>}
      </label>
      <label>
        <span id="am-occasion-label">Occasion</span>
        <input
          id="am-occasion"
          name="occasion"
          placeholder=" "
          maxLength={160}
          value={fields.occasion}
          onChange={(e) => setFields({ ...fields, occasion: e.target.value })}
          aria-invalid={Boolean(errors.occasion)}
          aria-labelledby="am-occasion-label"
          aria-describedby={errors.occasion ? "am-occasion-error" : undefined}
        />
        {errors.occasion && (
          <small id="am-occasion-error">{errors.occasion}</small>
        )}
      </label>
      <noscript>
        <p>Enable JavaScript to preview your commission request.</p>
      </noscript>
      <button
        type="submit"
        disabled={!ready}
        className="am-button am-button--red"
      >
        Reserve a commission <span>↗</span>
      </button>
    </form>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/forms/validation.ts">
<![CDATA[export type CommissionFields = { name: string; email: string; occasion: string };
export function validateCommission(fields: CommissionFields) {
  const errors: Partial<Record<keyof CommissionFields, string>> = {};
  if (!fields.name.trim()) errors.name = "Add your name";
  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = "Enter a work email";
  if (!fields.occasion.trim()) errors.occasion = "Add your occasion";
  return errors;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/atmosphere.ts">
<![CDATA[import { WORLD_NAMES, type ChapterProgressState } from "./chapters";
import type { TimeOfDay } from "./timeOfDay";
import {
  addVec3,
  clamp01,
  lerp,
  lerpVec3,
  PALETTE,
  scaleRgb,
  smoothstep,
  type RGB,
  type Vec3,
} from "./rng";
const backgrounds: RGB[] = [
  lerpVec3(PALETTE.paper, PALETTE.indigo, 0.06),
  lerpVec3(PALETTE.ink, PALETTE.gold, 0.24),
  PALETTE.paper,
  lerpVec3(PALETTE.indigo, PALETTE.ink, 0.2),
  lerpVec3(PALETTE.paper, PALETTE.gold, 0.16),
  lerpVec3(PALETTE.ink, PALETTE.gold, 0.16),
];
const fog = [0.012, 0.03, 0.08, 0.055, 0.018, 0.025],
  exposures = [1.08, 0.94, 1.02, 0.86, 1, 0.88],
  env = [0.45, 0.25, 0.2, 0.16, 0.32, 0.18],
  keys = [3, 2.8, 3.2, 0.55, 2.5, 0.8],
  accents = [0, 1.8, 0.2, 3, 2, 1.5],
  blooms = [0, 0.12, 0.08, 0.55, 0.08, 0];
export const paperLitAt=(state:ChapterProgressState,day:TimeOfDay)=>Math.max(state.paperLitMode,state.worldVisibility.street*smoothstep(.76,.86,day.value));
export function atmosphereAtProgress(
  state: ChapterProgressState,
  day: TimeOfDay,
  rain: number,
) {
  const weights = WORLD_NAMES.map((n) => state.worldVisibility[n]);
  const blend = (values: number[]) =>
    values.reduce((sum, v, i) => sum + v * weights[i], 0);
  const background = [0, 1, 2].map((k) =>
    backgrounds.reduce((sum, c, i) => sum + c[k] * weights[i], 0),
  ) as RGB;
  const daylight =
    state.worldVisibility.street *
    Math.max(0, (day.value - 0.75) / 0.25) *
    0.75;
  const color = lerpVec3(background, PALETTE.paper, daylight),
    density = blend(fog) + state.paperDive * 0.035 + clamp01(rain) * 0.008;
  return {
    paperLitMode:paperLitAt(state,day),
    background: color,
    fogColor: color,
    fogDensity: density,
    exposure: blend(exposures) * day.toneMappingExposure,
    envIntensity: blend(env) * day.ambientIntensityMultiplier,
    key: {
      color: day.sunColorRgb,
      intensity: blend(keys) * day.sunIntensityMultiplier,
      position: addVec3(state.anchor, day.sunOffset),
      target: addVec3(state.anchor, [0, 0.5, 0]),
    },
    rim: {
      color: lerpVec3(PALETTE.sakura, PALETTE.paper, day.value),
      intensity: lerp(0.4, 1.2, day.value),
      position: addVec3(state.anchor, [-3, 3, -5]),
    },
    hemi: {
      sky: lerpVec3(PALETTE.indigo, PALETTE.paper, day.value),
      ground: scaleRgb(PALETTE.gold, 0.3),
      intensity: 0.8 * day.ambientIntensityMultiplier,
    },
    accent: {
      color: lerpVec3(
        PALETTE.gold,
        PALETTE.paper,
        state.worldVisibility.bench * 0.5,
      ),
      intensity: blend(accents) * day.lanternIntensityMultiplier,
      position: addVec3(state.anchor, [
        lerp(-2, 2, state.benchAssembly),
        3,
        -2,
      ]) as Vec3,
    },
    bloomStrength: blend(blooms) * day.lanternIntensityMultiplier,
    vignette: lerp(0.3, 0.08, paperLitAt(state,day)),
    grain: 0.018,
    lensBlur: lerp(0.0022, 0.004, state.paperDive),
  };
}
export type Atmosphere = ReturnType<typeof atmosphereAtProgress>;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/chapters.ts">
<![CDATA[import { paperPoint } from "../model/rig";
import { addVec3, clamp01, lerp, lerpVec3, smoothstep, type Vec3 } from "./rng";
export type Tool = "anatomy" | "light" | "making" | null;
export type Chapter = {
  index: number;
  id: string;
  numberLabel: string;
  title: string;
  markerLabel: string;
  headline: string;
  subline?: string;
  copy: string;
  specimenNote: string;
  startProgress: number;
  restProgress: number;
  secondaryRestProgress?: number;
  endProgress: number;
  tool: Tool;
  toolButtonLabel?: string;
};
export const WORLD_CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "top",
    numberLabel: "01",
    title: "Threshold",
    markerLabel: "Paper-lit threshold",
    headline: "雨音",
    subline: "The sound of rain, kept dry.",
    copy: "Commission a hand-built oil-paper umbrella, tuned to the weather you will carry it through.",
    specimenNote: "40 ribs / one quiet mechanism",
    startProgress: 0,
    restProgress: 0,
    endProgress: 0.14,
    tool: null,
  },
  {
    index: 1,
    id: "structure",
    numberLabel: "02",
    title: "Structure",
    markerLabel: "Bamboo workshop",
    headline: "Forty ribs, one breath.",
    copy: "Choose a part on the umbrella or in the index. Look closer, move it, and follow how it belongs to the whole.",
    specimenNote: "Bamboo / paper / thread",
    startProgress: 0.14,
    restProgress: 0.18,
    endProgress: 0.33,
    tool: "anatomy",
    toolButtonLabel: "Inspect the structure",
  },
  {
    index: 2,
    id: "light",
    numberLabel: "03",
    title: "Paper",
    markerLabel: "Into the paper",
    headline: "Paper that listens to light.",
    copy: "Thin washi is not a surface. It is a membrane. Put the sun behind it and the fibres answer.",
    specimenNote: "Washi / painted paper gores",
    startProgress: 0.33,
    restProgress: 0.45,
    endProgress: 0.58,
    tool: null,
  },
  {
    index: 3,
    id: "canopy",
    numberLabel: "04",
    title: "Weather",
    markerLabel: "Dusk street",
    headline: "Choose your canopy.",
    copy: "One structure, four moods. The motif is painted into the paper before the last binding.",
    specimenNote: "Drag to turn / painted in the paper",
    startProgress: 0.58,
    restProgress: 0.66,
    secondaryRestProgress: 0.72,
    endProgress: 0.78,
    tool: null,
  },
  {
    index: 4,
    id: "making",
    numberLabel: "05",
    title: "Craft",
    markerLabel: "At the workbench",
    headline: "Eighty-one quiet steps.",
    copy: "From split bamboo to the last knot, every gesture stays visible in the object.",
    specimenNote: "81 quiet making steps",
    startProgress: 0.78,
    restProgress: 0.86,
    endProgress: 0.93,
    tool: "making",
    toolButtonLabel: "Follow the making",
  },
  {
    index: 5,
    id: "commission",
    numberLabel: "06",
    title: "Commission",
    markerLabel: "Genkan return",
    headline: "Made for the weather ahead.",
    copy: "Tell us where you will carry it. We will answer with a paper, bamboo and palette that belongs there.",
    specimenNote: "Kurokawa / 1963",
    startProgress: 0.93,
    restProgress: 1,
    endProgress: 1,
    tool: null,
  },
];
export const REST_POINTS = [0, 0.18, 0.45, 0.66, 0.72, 0.86, 1] as const;
export const WORLD_NAMES = [
  "threshold",
  "workshop",
  "paper",
  "street",
  "bench",
  "genkan",
] as const;
export type WorldName = (typeof WORLD_NAMES)[number];
export const WORLD_ANCHORS: Vec3[] = [
  [0, 0, 0],
  [14, 0, -10],
  [14, 0, -10],
  [30, 0, -22],
  [44, 0, -30],
  [58, 0, -40],
];
export function getUmbrellaAnchor(p: number): Vec3 {
  p = clamp01(p);
  let anchor: Vec3 = [...WORLD_ANCHORS[0]];
  // Travel in the seams; hold each place through its primary and secondary rests.
  for (let i = 1; i < WORLD_CHAPTERS.length; i++) {
    const b = WORLD_CHAPTERS[i].startProgress;
    anchor = lerpVec3(
      anchor,
      WORLD_ANCHORS[i],
      smoothstep(b - 0.035, i === 4 ? 0.8 : b + 0.035, p),
    );
  }
  return anchor;
}
export function getChapterStateAtProgress(value: number) {
  const progress = clamp01(value);
  const activeChapterIndex = Math.max(
    0,
    WORLD_CHAPTERS.findLastIndex((c) => progress >= c.startProgress),
  );
  const activeChapter = WORLD_CHAPTERS[activeChapterIndex];
  // Adjacent worlds overlap for .05 around each boundary; these weights partition unity.
  const transitions = WORLD_CHAPTERS.slice(1).map((c) =>
    smoothstep(c.startProgress - 0.025, c.startProgress + 0.025, progress),
  );
  const weights = WORLD_CHAPTERS.map(
    (_, i) => (i ? transitions[i - 1] : 1) * (i === 5 ? 1 : 1 - transitions[i]),
  );
  const worldVisibility = Object.fromEntries(
    WORLD_NAMES.map((name, i) => [name, weights[i]]),
  ) as Record<WorldName, number>;
  const chapterOpacities = WORLD_CHAPTERS.map((c, i) =>
    Math.min(
      i ? smoothstep(c.startProgress, c.startProgress + 0.035, progress) : 1,
      i === 5
        ? 1
        : 1 - smoothstep(c.endProgress - 0.035, c.endProgress, progress),
    ),
  );
  // .31–.405 enters the material; .52–.60 returns to the complete canopy.
  const paperDive =
    smoothstep(0.31, 0.405, progress) * (1 - smoothstep(0.52, 0.6, progress));
  return {
    progress,
    activeChapterIndex,
    activeChapter,
    chapterOpacities,
    worldVisibility,
    subRest:
      activeChapterIndex === 3
        ? progress < 0.69
          ? ("calm" as const)
          : ("street" as const)
        : null,
    paperDive,
    oilSoak: smoothstep(0.405, 0.515, progress),
    rainIntensity:
      smoothstep(0.59, 0.72, progress) * (1 - smoothstep(0.77, 0.82, progress)),
    lanternGlow: Math.max(weights[3], weights[5] * 0.7),
    benchAssembly: smoothstep(0.8, 0.91, progress),
    genkanSettle: smoothstep(0.93, 1, progress),
    paperLitMode: clamp01(weights[0] + weights[2] + weights[4] * 0.72),
    open: smoothstep(0, 0.1, progress) * (1 - smoothstep(0.94, 1, progress)),
    anchor: getUmbrellaAnchor(progress),
  };
}
export type ChapterProgressState = ReturnType<typeof getChapterStateAtProgress>;
export function getNearestChapterSnapProgress(p: number) {
  p = clamp01(p);
  return REST_POINTS.reduce<number>(
    (best, n) => (Math.abs(n - p) < Math.abs(best - p) ? n : best),
    0,
  );
}
export function getNextChapterProgress(p: number, direction: 1 | -1) {
  p = clamp01(p);
  const nearest = getNearestChapterSnapProgress(p);
  if (Math.abs(p - nearest) > 0.025 && Math.sign(nearest - p) === direction)
    return nearest;
  const index = REST_POINTS.indexOf(nearest as (typeof REST_POINTS)[number]);
  return REST_POINTS[
    Math.max(0, Math.min(REST_POINTS.length - 1, index + direction))
  ];
}
export type CameraKeyframe = {
  progress: number;
  position: Vec3;
  target: Vec3;
  fov: number;
  focusDistance: number;
};
const patch = paperPoint(1, 4, 0.68, 0.5);
export const PAPER_PATCH: Vec3 = [patch.x, patch.y, patch.z];
export const PAPER_NORMAL: Vec3 = [0.197, 0.966, 0.168];
const patchOffset = (n: number, tangent = 0): Vec3 =>
  PAPER_PATCH.map(
    (v, i) => v + PAPER_NORMAL[i] * n + (i === 0 ? tangent : 0),
  ) as Vec3;
const key = (
  p: number,
  position: Vec3,
  target: Vec3,
  fov: number,
  focusDistance: number,
): CameraKeyframe => ({
  progress: p,
  position: addVec3(getUmbrellaAnchor(p), position),
  target: addVec3(getUmbrellaAnchor(p), target),
  fov,
  focusDistance,
});
export const CAMERA_KEYFRAMES = [
  key(0, [4, 2.2, 10], [0, 0.25, 0], 34, 11),
  key(0.1, [3.5, 3, 9.5], [0, 0.3, 0], 34, 10.5),
  key(0.18, [4, 1.8, 8.5], [0, 0.4, 0], 38, 9.5),
  key(0.31, [2.8, 2.2, 8], [0, 1, 0], 38, 8.5),
  key(0.36, patchOffset(0.65), patchOffset(-0.85), 42, 1.5),
  key(0.4, patchOffset(-0.2), patchOffset(-0.85), 46, 0.65),
  key(0.45, patchOffset(-0.5, 0.2), patchOffset(-1.1), 46, 0.65),
  key(0.54, patchOffset(-0.2), patchOffset(-0.85), 46, 0.65),
  key(0.57, patchOffset(0.65), patchOffset(-0.85), 40, 1.5),
  key(0.61, [3, 1, 9], [0, 0.3, 0], 40, 10),
  key(0.66, [4, 0.1, 10.5], [0, 0.2, 0], 40, 11.2),
  key(0.72, [6, 0.4, 13], [0, 0.2, 0], 44, 14.3),
  key(0.8, [-2, 7, 8], [-2, -0.5, -1], 36, 11),
  key(0.86, [4.5, 7, 7], [0, -0.3, 0], 36, 11),
  key(0.91, [6, 7, 8], [2, -0.5, -1], 36, 11),
  key(1, [4, 2, 10], [0, -0.3, 0], 34, 11),
];
function spline(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number): Vec3 {
  return b.map((v, i) => {
    const n =
      0.5 *
      (2 * v +
        (-a[i] + c[i]) * t +
        (2 * a[i] - 5 * v + 4 * c[i] - d[i]) * t * t +
        (-a[i] + 3 * v - 3 * c[i] + d[i]) * t * t * t);
    return Math.max(Math.min(v, c[i]), Math.min(Math.max(v, c[i]), n));
  }) as Vec3;
}
export function computeCameraPoseAtProgress(value: number) {
  const p = clamp01(value);
  let i = 0;
  const exact = CAMERA_KEYFRAMES.find((k) => k.progress === p);
  if (exact)
    return {
      position: [...exact.position] as Vec3,
      target: [...exact.target] as Vec3,
      fov: exact.fov,
      focusDistance: exact.focusDistance,
    };
  while (
    i < CAMERA_KEYFRAMES.length - 2 &&
    p > CAMERA_KEYFRAMES[i + 1].progress
  )
    i++;
  const b = CAMERA_KEYFRAMES[i],
    c = CAMERA_KEYFRAMES[i + 1],
    a = CAMERA_KEYFRAMES[Math.max(0, i - 1)],
    d = CAMERA_KEYFRAMES[Math.min(CAMERA_KEYFRAMES.length - 1, i + 2)];
  const t = smoothstep(b.progress, c.progress, p),
    position = spline(a.position, b.position, c.position, d.position, t);
  position[1] = Math.max(-2.25, position[1]);
  return {
    position,
    target: spline(a.target, b.target, c.target, d.target, t),
    fov: lerp(b.fov, c.fov, t),
    focusDistance: lerp(b.focusDistance, c.focusDistance, t),
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/generators.ts">
<![CDATA[import { clamp01, createSeededRandom, type Vec3 } from "./rng";
export type Fibre = {
  position: Vec3;
  layer: number;
  length: number;
  thickness: number;
  curl: number;
  phase: number;
  oilArrival: number;
  angle: number;
};
export function generateFibres(seed = 481, count = 1500): Fibre[] {
  const r = createSeededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const layer = Math.floor((i * 6) / count);
    return {
      position: [(r() - 0.5) * 2.8, (r() - 0.5) * 2.8, -layer * 0.11] as Vec3,
      layer,
      length: 0.18 + r() * 0.6,
      thickness: 0.0015 + r() * 0.004,
      curl: (r() - 0.5) * 0.18,
      phase: r() * Math.PI * 2,
      oilArrival: (layer + r() * 0.85) / 6,
      angle: r() * Math.PI * 2,
    };
  });
}
export function generateRain(seed = 2026, count = 6000) {
  const r = createSeededRandom(seed),
    data = new Float32Array(count * 5);
  for (let i = 0; i < count; i++)
    data.set(
      [(r() - 0.5) * 26, (r() - 0.5) * 26, 3 + r() * 6, r(), 0.08 + r() * 0.24],
      i * 5,
    );
  return data;
}
export function generateMotes(seed = 91, count = 180) {
  const r = createSeededRandom(seed),
    data = new Float32Array(count * 7);
  for (let i = 0; i < count; i++)
    data.set(
      [
        (r() - 0.5) * 15,
        r() * 8 - 2.2,
        (r() - 0.5) * 15,
        (r() - 0.5) * 0.2,
        0.03 + r() * 0.08,
        (r() - 0.5) * 0.2,
        r() * 6.28,
      ],
      i * 7,
    );
  return data;
}
export function gustField(age: number, distance = 0) {
  const t = clamp01(age / 3.6),
    radius = Math.max(0, Math.min(3.6, age)) * 6.5;
  const amplitude =
    age >= 0 && age < 3.6
      ? Math.sin(Math.PI * t) * Math.exp(-Math.pow((distance - radius) / 2, 2))
      : 0;
  return { radius, amplitude, alive: age >= 0 && age < 3.6 };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/inspect.ts">
<![CDATA[import type { Vec3 } from "./rng";
export type Quaternion = [number, number, number, number];
export const IDENTITY: Quaternion = [0, 0, 0, 1];
export function normalize(q: Quaternion): Quaternion {
  const n = Math.hypot(...q);
  return n > 1e-10 && Number.isFinite(n)
    ? (q.map((v) => v / n) as Quaternion)
    : [...IDENTITY];
}
export function fromAxisAngle(axis: Vec3, angle: number): Quaternion {
  const n = Math.hypot(...axis) || 1,
    s = Math.sin(angle / 2) / n;
  return normalize([
    axis[0] * s,
    axis[1] * s,
    axis[2] * s,
    Math.cos(angle / 2),
  ]);
}
export function multiply(a: Quaternion, b: Quaternion): Quaternion {
  const [x, y, z, w] = a,
    [u, v, t, s] = b;
  return normalize([
    w * u + x * s + y * t - z * v,
    w * v - x * t + y * s + z * u,
    w * t + x * v - y * u + z * s,
    w * s - x * u - y * v - z * t,
  ]);
}
export function slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
  let dot = a.reduce((n, v, i) => n + v * b[i], 0);
  if (dot < 0) {
    b = b.map((v) => -v) as Quaternion;
    dot = -dot;
  }
  dot = Math.min(1, dot);
  if (dot > 0.9995)
    return normalize(a.map((v, i) => v + (b[i] - v) * t) as Quaternion);
  const theta = Math.acos(dot),
    s = Math.sin(theta);
  return normalize(
    a.map(
      (v, i) =>
        (v * Math.sin((1 - t) * theta) + b[i] * Math.sin(t * theta)) / s,
    ) as Quaternion,
  );
}
export function rotateVec3(q: Quaternion, v: Vec3): Vec3 {
  const [x, y, z, w] = normalize(q),
    [a, b, c] = v,
    tx = 2 * (y * c - z * b),
    ty = 2 * (z * a - x * c),
    tz = 2 * (x * b - y * a);
  return [
    a + w * tx + y * tz - z * ty,
    b + w * ty + z * tx - x * tz,
    c + w * tz + x * ty - y * tx,
  ];
}
export type InspectState = {
  phase: "idle" | "engaged" | "returning";
  rotation: Quaternion;
  velocity: Vec3;
  pointer: [number, number] | null;
  chapterKey: string;
};
export const createInspect = (): InspectState => ({
  phase: "idle",
  rotation: [...IDENTITY],
  velocity: [0, 0, 0],
  pointer: null,
  chapterKey: "",
});
export function toggleKeyboardEngage(s: InspectState, key = "1"): InspectState {
  return s.phase === "engaged"
    ? exit(s)
    : { ...s, phase: "engaged", chapterKey: key };
}
export function onPointerDown(
  s: InspectState,
  x: number,
  y: number,
): InspectState {
  return { ...s, phase: "engaged", pointer: [x, y], velocity: [0, 0, 0] };
}
export function onPointerMove(
  s: InspectState,
  x: number,
  y: number,
  camera: Quaternion = IDENTITY,
): InspectState {
  if (!s.pointer) return s;
  const dx = (x - s.pointer[0]) * 0.0075,
    dy = (y - s.pointer[1]) * 0.0075;
  const rotation = multiply(
    fromAxisAngle(rotateVec3(camera, [0, 1, 0]), dx),
    multiply(fromAxisAngle(rotateVec3(camera, [1, 0, 0]), dy), s.rotation),
  );
  return {
    ...s,
    rotation,
    pointer: [x, y],
    velocity: rotateVec3(camera, [dy * 60, dx * 60, 0]),
  };
}
export const onPointerUp = (s: InspectState): InspectState => ({
  ...s,
  pointer: null,
});
export const exit = (s: InspectState): InspectState => ({
  ...s,
  phase: "returning",
  pointer: null,
  velocity: [0, 0, 0],
});
export function applyKeyboardStep(
  s: InspectState,
  x: number,
  y: number,
  camera: Quaternion = IDENTITY,
) {
  return {
    ...onPointerUp(
      onPointerMove(onPointerDown(s, 0, 0), x * 34, y * 34, camera),
    ),
    velocity: [0, 0, 0] as Vec3,
  };
}
export function tick(s: InspectState, dtMs: number): InspectState {
  const dt = Math.max(0, Math.min(0.1, dtMs / 1000));
  if (s.phase === "returning") {
    const rotation = slerp(s.rotation, IDENTITY, 1 - Math.exp(-9 * dt));
    return 2 * Math.acos(Math.min(1, Math.abs(rotation[3]))) < 0.01
      ? createInspect()
      : { ...s, rotation };
  }
  if (s.phase !== "engaged" || s.pointer) return s;
  return {
    ...s,
    rotation: multiply(
      fromAxisAngle(s.velocity, Math.hypot(...s.velocity) * dt),
      s.rotation,
    ),
    velocity: s.velocity.map((v) => v * Math.exp(-8.5 * dt)) as Vec3,
  };
}
export const exitOnChapterChange = (s: InspectState, key: string) =>
  s.phase === "engaged" && s.chapterKey !== key ? exit(s) : s;
export function isPinFacingCamera(
  normal: Vec3,
  toCamera: Vec3,
  projected: Vec3,
) {
  const n = Math.hypot(...normal) * Math.hypot(...toCamera);
  return (
    n > 0 &&
    normal.reduce((v, x, i) => v + x * toCamera[i], 0) / n > -0.05 &&
    projected.every((v) => v >= -1 && v <= 1)
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/rng.ts">
<![CDATA[export type Vec3 = [number, number, number];
export type RGB = Vec3;
export const clamp01 = (n: number) =>
  Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : 0;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpVec3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];
export function smoothstep(a: number, b: number, x: number) {
  if (a === b) return Number.isFinite(x) && x >= b ? 1 : 0;
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
export function createSeededRandom(seed: number) {
  let n = seed >>> 0;
  return () => {
    n += 0x6d2b79f5;
    let t = Math.imul(n ^ (n >>> 15), 1 | n);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rgb = (hex: string): RGB =>
  [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as RGB;
export const PALETTE = {
  paper: rgb("#F4ECDD"),
  ink: rgb("#1A1613"),
  gold: rgb("#B8923A"),
  sakura: rgb("#F2B8C6"),
  indigo: rgb("#2B3A55"),
  red: rgb("#C8412B"),
};
export const scaleRgb = (c: RGB, n: number): RGB =>
  c.map((x) => clamp01(x * n)) as RGB;
export const cssRgb = (c: RGB) =>
  `rgb(${c
    .map((x) => {
      x = clamp01(x);
      return Math.round(
        (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055) *
          255,
      );
    })
    .join(" ")})`;
export const addVec3 = (a: Vec3, b: Vec3): Vec3 => [
  a[0] + b[0],
  a[1] + b[1],
  a[2] + b[2],
];
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/logic/timeOfDay.ts">
<![CDATA[import {
  clamp01,
  cssRgb,
  lerp,
  lerpVec3,
  PALETTE,
  scaleRgb,
  type RGB,
  type Vec3,
} from "./rng";
export function computeTimeOfDay(value: number) {
  const t = clamp01(value),
    stops: RGB[] = [
      lerpVec3(PALETTE.red, PALETTE.gold, 0.45),
      PALETTE.gold,
      PALETTE.paper,
      lerpVec3(PALETTE.paper, PALETTE.indigo, 0.08),
    ];
  const q = t * 3,
    i = Math.min(2, Math.floor(q));
  const sunColorRgb = lerpVec3(stops[i], stops[i + 1], q - i),
    azimuth = lerp(-1.2, -0.3, t),
    elevation = lerp(0.15, 1.3, t);
  const surfaceBgRgb = lerpVec3(
    scaleRgb(PALETTE.indigo, 0.65),
    PALETTE.paper,
    t,
  );
  return {
    value: t,
    sunOffset: [
      Math.sin(azimuth) * Math.cos(elevation) * 7,
      Math.sin(elevation) * 7,
      Math.cos(azimuth) * Math.cos(elevation) * 7,
    ] as Vec3,
    sunColorRgb,
    sunIntensityMultiplier: lerp(0.2, 1.35, t),
    ambientIntensityMultiplier: lerp(0.28, 1.2, t),
    rimIntensityMultiplier: lerp(0.55, 1, t),
    toneMappingExposure: lerp(0.82, 1.08, t),
    lanternIntensityMultiplier: lerp(1.6, 0.16, t),
    paperTransmission: lerp(0.95, 0.35, t),
    surfaceBgRgb,
    timeLabel:
      t < 0.2
        ? "Dusk"
        : t < 0.5
          ? "Golden hour"
          : t < 0.85
            ? "Morning"
            : "Midday",
    cssVars: {
      "--page-bg": cssRgb(surfaceBgRgb),
      "--sky-ambient": cssRgb(lerpVec3(PALETTE.indigo, PALETTE.paper, t * 0.7)),
      "--text-contrast": cssRgb(t > 0.55 ? PALETTE.ink : PALETTE.paper),
      "--sun-accent": cssRgb(sunColorRgb),
    },
  };
}
export type TimeOfDay = ReturnType<typeof computeTimeOfDay>;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/createWagasaModel.ts">
<![CDATA[import * as THREE from "three";
import {
  ATTACH,
  HUB_Y,
  RIB_COUNT,
  RIB_LENGTH,
  clamp01,
  paperPoint,
  ribPoint,
  rimPoint,
  runnerHeight,
  type Point,
} from "./rig";
import { turnedGeometry } from "./lathe";
import { bambooMaterial, paperMaterial, type Motif } from "./materials";
export type WagasaPose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};
export type WagasaRuntime = {
  setOpen: (n: number) => void;
  setExplode: (n: number) => void;
  setSpread: (n: number) => void;
  setCanopy: (
    colour: string,
    motif: Motif,
    origin?: THREE.Vector2,
    instant?: boolean,
  ) => void;
  setPose: (pose: WagasaPose) => void;
  setHighlight: (part: string | null) => void;
  setSun: (angle: number) => void;
  update: () => void;
  tick: (dt: number) => void;
  point: (part: string, ribIndex?: number) => THREE.Vector3;
  runnerPoint: (open: number) => THREE.Vector3;
  setInspection: (state: {
    reveal: number;
    rib: number | null;
    index: number;
    trace: number;
  }) => void;
  paperVisible: (u: number) => boolean;
  dispose: () => void;
  readonly open: number;
  readonly animating: boolean;
};
export function createWagasaModel(
  options: {
    open?: number;
    explode?: number;
    canopyColor?: string;
    motif?: Motif;
  } = {},
) {
  const root = new THREE.Group();
  root.name = "AMAOTO articulated wagasa";
  const bamboo = bambooMaterial();
  const wood = new THREE.MeshStandardMaterial({
    color: "#B8923A",
    roughness: 0.3,
    map: bamboo.map,
  });
  const thread = new THREE.MeshStandardMaterial({
    color: "#1A1613",
    roughness: 0.95,
  });
  const paper = paperMaterial(
    options.canopyColor ?? "#F4ECDD",
    options.motif ?? "sakura",
  );
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 6);
  const dummy = new THREE.Object3D(),
    up = new THREE.Vector3(0, 1, 0),
    a = new THREE.Vector3(),
    b = new THREE.Vector3();
  function instances(
    count: number,
    material: THREE.MeshStandardMaterial,
    partId: string,
  ) {
    const mesh = new THREE.InstancedMesh(cylinder, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.userData.partId = partId;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    // Raycasting must not retain the narrow first-frame bounds after unfolding.
    mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);
    root.add(mesh);
    return mesh;
  }
  const ribs = instances(40 * 8, bamboo, "ribs"),
    stretchers = instances(40, bamboo.clone(), "stretchers");
  const bands = instances(40 * 3, wood.clone(), "ribs"),
    knots = instances(40 * 2, thread, "thread"),
    lattice = instances(40 * 8, thread.clone(), "thread");
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.068, 3.65, 20),
    bamboo.clone(),
  );
  shaft.position.y = -0.075;
  shaft.userData.partId = "handle";
  root.add(shaft);
  const cap = new THREE.Mesh(turnedGeometry("cap"), wood.clone());
  cap.position.y = HUB_Y - 0.025;
  cap.userData.partId = "handle";
  root.add(cap);
  const runner = new THREE.Mesh(turnedGeometry("runner"), wood.clone());
  runner.userData.partId = "runner";
  root.add(runner);
  const grip = new THREE.Mesh(turnedGeometry("handle"), wood.clone());
  grip.position.y = -1.72;
  grip.userData.partId = "handle";
  root.add(grip);
  const collar = instances(80, thread.clone(), "thread");
  const shaftNodes = instances(6, wood.clone(), "handle");
  for (let i = 0; i < 6; i++) {
    dummy.position.set(0, -1.45 + i * 0.52, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.071, 0.026, 0.071);
    dummy.updateMatrix();
    shaftNodes.setMatrixAt(i, dummy.matrix);
  }
  const rings = 16,
    across = 4,
    vertices = RIB_COUNT * (rings + 1) * (across + 1);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(vertices * 3),
    uv = new Float32Array(vertices * 2),
    indices: number[] = [];
  let v = 0;
  for (let g = 0; g < 40; g++)
    for (let j = 0; j <= rings; j++)
      for (let k = 0; k <= across; k++) {
        uv[v * 2] = (g + k / across) / 40;
        uv[v * 2 + 1] = j / rings;
        if (j < rings && k < across) {
          const n = v;
          indices.push(
            n,
            n + 1,
            n + across + 1,
            n + 1,
            n + across + 2,
            n + across + 1,
          );
        }
        v++;
      }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);
  const skin = new THREE.Mesh(geometry, paper.material);
  skin.userData.partId = "canopy";
  skin.receiveShadow = true;
  skin.castShadow = true;
  skin.frustumCulled = false;
  root.add(skin);
  const rimPositions = new Float32Array(40 * across * 2 * 3);
  const rimGeometry = new THREE.BufferGeometry();
  rimGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(rimPositions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  const rim = new THREE.LineSegments(
    rimGeometry,
    new THREE.LineBasicMaterial({ color: "#B8923A" }),
  );
  rim.frustumCulled = false;
  rim.userData.partId = "thread";
  root.add(rim);
  let open = clamp01(options.open ?? 0),
    explode = clamp01(options.explode ?? 0),
    spread = 0,
    dirty = true;
  function segment(
    mesh: THREE.InstancedMesh,
    index: number,
    start: Point,
    end: Point,
    radius: number,
  ) {
    a.set(start.x, start.y, start.z);
    b.set(end.x, end.y, end.z);
    dummy.position.copy(a).add(b).multiplyScalar(0.5);
    b.sub(a);
    dummy.quaternion.setFromUnitVectors(up, b.clone().normalize());
    dummy.scale.set(radius, b.length(), radius);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }
  function update() {
    if (!dirty) return;
    dirty = false;
    const runnerY = runnerHeight(open);
    runner.position.y = runnerY - explode * 0.24;
    grip.position.y = -1.72 - explode * 0.32;
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 8; j++)
        segment(
          ribs,
          i * 8 + j,
          ribPoint(open, i, j / 8, explode, spread),
          ribPoint(open, i, (j + 1) / 8, explode, spread),
          0.011 - j * 0.00055,
        );
      segment(
        stretchers,
        i,
        { x: 0, y: runner.position.y, z: 0 },
        ribPoint(open, i, ATTACH / RIB_LENGTH, explode, spread),
        0.012,
      );
      for (let j = 0; j < 3; j++) {
        const t = 0.27 + j * 0.3;
        segment(
          bands,
          i * 3 + j,
          ribPoint(open, i, t - 0.006, explode, spread),
          ribPoint(open, i, t + 0.006, explode, spread),
          0.014,
        );
      }
      const tip = ribPoint(open, i, 1, explode, spread),
        near = ribPoint(open, i, 0.978, explode, spread);
      segment(knots, i * 2, near, tip, 0.016);
      segment(
        knots,
        i * 2 + 1,
        { x: tip.x - 0.018, y: tip.y + 0.012, z: tip.z },
        { x: tip.x + 0.018, y: tip.y + 0.012, z: tip.z },
        0.009,
      );
      for (let j = 0; j < 4; j++)
        for (let family = 0; family < 2; family++) {
          const start = ribPoint(open, i, 0.13 + j * 0.075, explode, spread),
            end = ribPoint(
              open,
              (i + (family ? 39 : 1)) % 40,
              0.13 + (j + 1) * 0.075,
              explode,
              spread,
            );
          start.y -= 0.018;
          end.y -= 0.018;
          segment(lattice, i * 8 + j * 2 + family, start, end, 0.0025);
        }
      const angle = (i / 40) * Math.PI * 2;
      for (let family = 0; family < 2; family++) {
        const next = angle + ((family ? 1 : -1) * Math.PI * 2) / 40;
        segment(
          collar,
          i * 2 + family,
          {
            x: Math.cos(angle) * 0.105,
            y: runner.position.y + 0.08,
            z: Math.sin(angle) * 0.105,
          },
          {
            x: Math.cos(next) * 0.105,
            y: runner.position.y + 0.18,
            z: Math.sin(next) * 0.105,
          },
          0.003,
        );
      }
    }
    let vertex = 0;
    for (let g = 0; g < 40; g++)
      for (let j = 0; j <= rings; j++)
        for (let k = 0; k <= across; k++) {
          const point = paperPoint(
            open,
            g,
            j / rings,
            k / across,
            explode,
            spread,
          );
          positions.set([point.x, point.y, point.z], vertex * 3);
          vertex++;
        }
    let r = 0;
    for (let g = 0; g < 40; g++)
      for (let k = 0; k < across; k++)
        for (const t of [k / across, (k + 1) / across]) {
          const p = rimPoint(open, g, t, explode, spread);
          rimPositions.set([p.x, p.y, p.z], r);
          r += 3;
        }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    rimGeometry.attributes.position.needsUpdate = true;
    for (const mesh of [ribs, stretchers, bands, knots, lattice, collar])
      mesh.instanceMatrix.needsUpdate = true;
  }
  let reveal = 0,
    revealCenter = 0.1,
    inspectionKey = "";
  const baseTint = new THREE.Color(1, 1, 1),
    quietTint = new THREE.Color("#F4ECDD").multiplyScalar(0.32),
    selectedTint = new THREE.Color("#C8412B").multiplyScalar(2);
  const runtime: WagasaRuntime = {
    setInspection(state) {
      reveal = state.reveal;
      revealCenter = state.index / 40;
      paper.setReveal(reveal, revealCenter);
      const steps =
        state.trace < 0 ? 0 : Math.max(1, Math.ceil(state.trace * 4));
      const key = `${state.rib}:${state.index}:${steps}`;
      if (key === inspectionKey) return;
      inspectionKey = key;
      for (const mesh of [ribs, bands]) {
        const perRib = mesh === ribs ? 8 : 3;
        for (let i = 0; i < mesh.count; i++)
          mesh.setColorAt(
            i,
            state.rib === null
              ? baseTint
              : Math.floor(i / perRib) === state.rib
                ? selectedTint
                : quietTint,
          );
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      }
      for (let i = 0; i < lattice.count; i++) {
        let lit = false;
        for (let j = 0; j < steps; j++)
          if (i === ((state.index + j) % 40) * 8 + j * 2) lit = true;
        lattice.setColorAt(
          i,
          steps ? (lit ? selectedTint : quietTint) : baseTint,
        );
      }
      if (lattice.instanceColor) lattice.instanceColor.needsUpdate = true;
    },
    paperVisible(u) {
      const distance = Math.abs(u - revealCenter);
      return (
        reveal < 0.001 || Math.min(distance, 1 - distance) >= 0.12 * reveal
      );
    },
    runnerPoint(value) {
      return root.localToWorld(new THREE.Vector3(0, runnerHeight(value), 0));
    },
    setOpen(n) {
      n = clamp01(n);
      if (Math.abs(n - open) > 0.0001) {
        open = n;
        dirty = true;
      }
    },
    setExplode(n) {
      n = clamp01(n);
      if (Math.abs(n - explode) > 0.0001) {
        explode = n;
        dirty = true;
      }
    },
    setSpread(n) {
      if (n !== spread) {
        spread = n;
        dirty = true;
      }
    },
    setCanopy: paper.setCanopy,
    setSun: paper.setSun,
    setPose(pose) {
      root.position.fromArray(pose.position);
      root.rotation.fromArray([...pose.rotation, "XYZ"]);
      root.scale.setScalar(pose.scale);
    },
    setHighlight(part) {
      root.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.emissive) {
            mat.emissive.set(
              child.userData.partId === part ? "#B8923A" : "#1A1613",
            );
            mat.emissiveIntensity = child.userData.partId === part ? 0.32 : 0;
          }
        }
      });
    },
    point(part, index = 4) {
      let local: THREE.Vector3;
      if (part === "runner") local = new THREE.Vector3(0, runner.position.y, 0);
      else if (part === "handle")
        local = new THREE.Vector3(0, grip.position.y - 0.05, 0);
      else if (part === "canopy")
        local = new THREE.Vector3().copy(
          paperPoint(open, index, 0.7, 0.5, explode, spread),
        );
      else if (part === "stretchers") {
        const attach = ribPoint(
          open,
          index,
          ATTACH / RIB_LENGTH,
          explode,
          spread,
        );
        local = new THREE.Vector3(
          attach.x * 0.5,
          (runner.position.y + attach.y) * 0.5,
          attach.z * 0.5,
        );
      } else {
        local = new THREE.Vector3().copy(
          ribPoint(
            open,
            index,
            part === "thread" ? 0.28 : 0.7,
            explode,
            spread,
          ),
        );
        if (part === "thread") local.y -= 0.018;
      }
      return root.localToWorld(local);
    },
    update,
    tick(dt) {
      update();
      paper.tick(dt);
    },
    get open() {
      return open;
    },
    get animating() {
      return paper.animating;
    },
    dispose() {
      paper.dispose();
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>();
      root.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material)
          for (const mat of Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]) {
            materials.add(mat);
            for (const value of Object.values(mat))
              if (value instanceof THREE.Texture) textures.add(value);
          }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  root.userData.sculptRuntime = runtime;
  update();
  return root;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/lathe.ts">
<![CDATA[import { LatheGeometry, Vector2 } from "three";
export function turnedGeometry(kind: "cap" | "runner" | "handle") {
  const profiles = {
    cap: [
      [0, 0],
      [0.09, 0],
      [0.11, 0.035],
      [0.11, 0.14],
      [0.075, 0.17],
      [0.075, 0.22],
      [0.105, 0.24],
      [0.105, 0.29],
      [0.08, 0.32],
      [0, 0.32],
    ],
    runner: [
      [0.06, -0.1],
      [0.14, -0.1],
      [0.17, -0.065],
      [0.17, 0.065],
      [0.14, 0.1],
      [0.1, 0.1],
      [0.1, 0.19],
      [0.06, 0.19],
    ],
    handle: [
      [0, -0.55],
      [0.065, -0.55],
      [0.1, -0.52],
      [0.11, -0.47],
      [0.095, -0.43],
      [0.12, -0.4],
      [0.12, -0.36],
      [0.095, -0.32],
      [0.12, -0.29],
      [0.12, -0.25],
      [0.09, -0.21],
      [0.078, -0.03],
      [0.1, 0.12],
      [0.12, 0.15],
      [0.12, 0.19],
      [0.085, 0.22],
      [0.12, 0.25],
      [0.12, 0.29],
      [0.085, 0.32],
      [0, 0.32],
    ],
  };
  return new LatheGeometry(
    profiles[kind].map(([r, y]) => new Vector2(r, y)),
    32,
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/materials.ts">
<![CDATA[import * as THREE from "three";
export type Motif = "sakura" | "wave" | "plain";
function texture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is unavailable");
  draw(ctx);
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;
  return map;
}
let seed = 481;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function paint(colour: string, motif: Motif) {
  seed = 481;
  return texture(2048, 1024, (ctx) => {
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 2048, 1024);
    // A separate hand-painted branch in every gore, with repeatable variation.
    for (let gore = 0; gore < 40; gore++) {
      const x = gore * 51.2;
      ctx.strokeStyle = "#B8923A";
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
      if (motif === "sakura") {
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "#B8923A";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, 190);
        ctx.bezierCurveTo(x + 22, 220, x + 30, 140, x + 51.2, 185);
        ctx.stroke();
        for (let flower = 0; flower < 5; flower++) {
          const bx = x + 5 + random() * 42,
            by = 145 + random() * 95,
            radius = 4 + random() * 4;
          ctx.strokeStyle = "#B8923A";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(bx, 190);
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.fillStyle = flower % 2 ? "#F2B8C6" : "#D9748F";
          for (let petal = 0; petal < 5; petal++) {
            const a = (petal * Math.PI * 2) / 5;
            ctx.beginPath();
            ctx.ellipse(
              bx + Math.cos(a) * radius,
              by + Math.sin(a) * radius,
              radius * 0.65,
              radius,
              a,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.fillStyle = "#F4ECDD";
          ctx.beginPath();
          ctx.arc(bx, by, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (motif === "wave") {
        ctx.strokeStyle = "#F4ECDD";
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.3;
        for (let row = 0; row < 3; row++)
          for (let ring = 1; ring <= 3; ring++) {
            ctx.beginPath();
            ctx.arc(x + 25, 120 + row * 44, ring * 8, 0, Math.PI);
            ctx.stroke();
          }
      }
    }
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#B8923A";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(2048, 10);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}
export function paperMaterial(colour: string, motif: Motif) {
  const fibre = texture(256, 256, (ctx) => {
    seed = 91;
    ctx.fillStyle = "rgb(185,185,185)";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 6500; i++) {
      const grey = Math.floor(130 + random() * 120);
      ctx.strokeStyle = `rgb(${grey},${grey},${grey})`;
      ctx.lineWidth = 0.3;
      const x = random() * 256,
        y = random() * 256;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + random() * 2, y + 3 + random() * 13);
      ctx.stroke();
    }
  });
  fibre.colorSpace = THREE.NoColorSpace;
  const roughness = fibre.clone();
  roughness.needsUpdate = true;
  let current = paint(colour, motif),
    previous = current;
  const uniforms = {
    uOld: { value: current },
    uNext: { value: current },
    uDye: { value: 1 },
    uOrigin: { value: new THREE.Vector2(0.5, 0.5) },
    uBacklight: { value: 0.45 },
    uReveal: { value: 0 },
    uRevealCenter: { value: 0.1 },
  };
  const material = new THREE.MeshStandardMaterial({
    map: current,
    roughnessMap: roughness,
    bumpMap: fibre,
    bumpScale: 0.016,
    roughness: 0.83,
    side: THREE.DoubleSide,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader =
      `uniform sampler2D uOld; uniform sampler2D uNext; uniform float uDye; uniform vec2 uOrigin; uniform float uBacklight; uniform float uReveal; uniform float uRevealCenter;\n` +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <map_fragment>",
        `
      float gap = abs(vMapUv.x-uRevealCenter);
      gap = min(gap,1.0-gap);
      if (uReveal>.001 && gap < .12*uReveal) discard;
      float dist = length(vec2(min(abs(vMapUv.x-uOrigin.x),1.0-abs(vMapUv.x-uOrigin.x))*1.6,vMapUv.y-uOrigin.y));
      float bleed = 1.0-smoothstep(uDye*2.0-.08,uDye*2.0+.08,dist);
      diffuseColor *= mix(texture2D(uOld,vMapUv),texture2D(uNext,vMapUv),bleed);
    `,
      )
      .replace(
        "#include <opaque_fragment>",
        `outgoingLight += diffuseColor.rgb * uBacklight * (gl_FrontFacing ? .10 : .52);\n#include <opaque_fragment>`,
      );
  };
  return {
    material,
    setReveal(value: number, center: number) {
      uniforms.uReveal.value = value;
      uniforms.uRevealCenter.value = center;
    },
    setSun(angle: number) {
      uniforms.uBacklight.value =
        0.2 + 0.85 * Math.cos((angle * Math.PI) / 180);
    },
    setCanopy(
      nextColour: string,
      nextMotif: Motif,
      origin = new THREE.Vector2(0.5, 0.5),
      instant = false,
    ) {
      if (previous !== current) previous.dispose();
      previous = current;
      current = paint(nextColour, nextMotif);
      uniforms.uOld.value = previous;
      uniforms.uNext.value = current;
      uniforms.uOrigin.value.copy(origin);
      uniforms.uDye.value = instant ? 1 : 0;
    },
    tick(dt: number) {
      uniforms.uDye.value = Math.min(1, uniforms.uDye.value + dt / 0.9);
      if (uniforms.uDye.value === 1 && previous !== current) {
        previous.dispose();
        previous = current;
        uniforms.uOld.value = current;
      }
    },
    get animating() {
      return uniforms.uDye.value < 1;
    },
    dispose() {
      current.dispose();
      if (previous !== current) previous.dispose();
      fibre.dispose();
      roughness.dispose();
      material.dispose();
    },
  };
}
export function bambooMaterial() {
  const map = texture(128, 512, (ctx) => {
    seed = 80;
    ctx.fillStyle = "#B8923A";
    ctx.fillRect(0, 0, 128, 512);
    ctx.strokeStyle = "#1A1613";
    for (let i = 0; i < 150; i++) {
      ctx.globalAlpha = 0.02 + random() * 0.1;
      const x = random() * 128;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + random() * 3, 512);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.24;
    ctx.fillRect(0, 245, 128, 4);
    ctx.globalAlpha = 1;
  });
  return new THREE.MeshStandardMaterial({
    map,
    color: "#F4ECDD",
    roughness: 0.45,
    bumpMap: map,
    bumpScale: 0.006,
  });
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/rig.ts">
<![CDATA[/** Local metres. Solve the rigid linkage before applying visual separation. */
export const HUB_Y = 1.7;
export const RIB_COUNT = 40;
export const RIB_LENGTH = 2.25;
export const ATTACH = 1.02;
export const LINK_LENGTH = 1.12;
export const SKIN_OFFSET = 0.019;
export type Point = { x: number; y: number; z: number };
export const clamp01 = (n: number) =>
  Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));
export const ribAngle = (open: number) =>
  0.035 + clamp01(open) * ((Math.PI * 75) / 180 - 0.035);
export function runnerHeight(open: number) {
  const theta = ribAngle(open);
  const radius = 0.065 + ATTACH * Math.sin(theta);
  return (
    HUB_Y - ATTACH * Math.cos(theta) - Math.sqrt(LINK_LENGTH ** 2 - radius ** 2)
  );
}
export function waveOpen(open: number, index: number, spread = 0) {
  const s = clamp01(spread) * 0.28;
  return clamp01((open - (index / (RIB_COUNT - 1)) * s) / (1 - s));
}
export function ribPoint(
  open: number,
  index: number,
  t: number,
  explode = 0,
  spread = 0,
): Point {
  const theta = ribAngle(open);
  const wave = ribAngle(waveOpen(open, index, spread));
  // Only the flexible outer length waves: the shared collar and fixed links stay connected.
  const outer = Math.max(0, (t * RIB_LENGTH - ATTACH) / (RIB_LENGTH - ATTACH));
  const bend = (wave - theta) * outer * outer;
  const distance = RIB_LENGTH * t;
  const a = (index / RIB_COUNT) * Math.PI * 2;
  const bow = Math.sin(Math.PI * outer) * 0.085 * clamp01(open);
  const r = 0.065 + distance * Math.sin(theta + bend) + bow;
  return {
    x: Math.cos(a) * r,
    y:
      HUB_Y -
      distance * Math.cos(theta + bend) +
      bow * 0.85 +
      clamp01(explode) * (0.3 + 0.28 * t),
    z: Math.sin(a) * r,
  };
}
export function paperPoint(
  open: number,
  gore: number,
  t: number,
  across: number,
  explode = 0,
  spread = 0,
): Point {
  const a = ribPoint(open, gore, t, explode, spread);
  const b = ribPoint(open, (gore + 1) % RIB_COUNT, t, explode, spread);
  const fold = Math.sin(Math.PI * across);
  const pinch = 1 - fold * (0.018 * open + 0.24 * (1 - open)) * t;
  const normal = skinNormal(open, gore, across);
  return {
    x: (a.x + (b.x - a.x) * across) * pinch + normal.x * SKIN_OFFSET,
    y:
      a.y +
      (b.y - a.y) * across +
      normal.y * SKIN_OFFSET -
      fold * 0.018 * open * t,
    z: (a.z + (b.z - a.z) * across) * pinch + normal.z * SKIN_OFFSET,
  };
}
function skinNormal(open: number, gore: number, across: number): Point {
  const angle = ((gore + across) / RIB_COUNT) * Math.PI * 2;
  const theta = ribAngle(open);
  return {
    x: Math.cos(angle) * Math.cos(theta),
    y: Math.sin(theta),
    z: Math.sin(angle) * Math.cos(theta),
  };
}
export function rimPoint(
  open: number,
  gore: number,
  across: number,
  explode = 0,
  spread = 0,
): Point {
  const point = paperPoint(open, gore, 1, across, explode, spread);
  const normal = skinNormal(open, gore, across);
  point.x -= normal.x * SKIN_OFFSET;
  point.y -= normal.y * SKIN_OFFSET;
  point.z -= normal.z * SKIN_OFFSET;
  return point;
}
export function solveRig(open: number, explode = 0, spread = 0) {
  return {
    open: clamp01(open),
    runner: { x: 0, y: runnerHeight(open), z: 0 },
    ribs: Array.from({ length: RIB_COUNT }, (_, i) => ({
      hinge: ribPoint(open, i, 0, explode, spread),
      attach: ribPoint(open, i, ATTACH / RIB_LENGTH),
      tip: ribPoint(open, i, 1, explode, spread),
      rim: rimPoint(open, i, 0, explode, spread),
    })),
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/runtime.ts">
<![CDATA[import { ribPoint, runnerHeight } from "./rig";
export { clamp01 } from "./rig";
export const runnerPosition = runnerHeight;
export const canopyRadius = (open: number) =>
  Math.hypot(ribPoint(open, 0, 1).x, ribPoint(open, 0, 1).z);
export const explodeOffset = (
  explode: number,
  axis: "canopy" | "runner" | "handle",
) => {
  const t = Math.max(0, Math.min(1, explode));
  return axis === "canopy" ? t * 0.5 : axis === "runner" ? t * 0.24 : -t * 0.32;
};
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/motion/Motion.tsx">
<![CDATA["use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const cursor = document.querySelector<HTMLElement>(".am-cursor");
    const move = (event: PointerEvent) => {
      if (
        !matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
          .matches
      )
        return;
      if (cursor) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.dataset.active = String(
          Boolean((event.target as Element).closest("button,a,input")),
        );
      }
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (button) {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${(event.clientX - rect.left - rect.width / 2) * 0.09}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${(event.clientY - rect.top - rect.height / 2) * 0.13}px`,
        );
        button.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
      }
    };
    const leave = (event: PointerEvent) => {
      const button = (event.target as Element).closest?.<HTMLElement>(
        ".am-button",
      );
      if (button) {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      }
    };
    const press = (event: PointerEvent) => {
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (!button || matchMedia("(prefers-reduced-motion:reduce)").matches)
        return;
      const ripple = document.createElement("i"),
        r = button.getBoundingClientRect();
      ripple.className = "am-press-ripple";
      ripple.style.left = `${event.clientX - r.left}px`;
      ripple.style.top = `${event.clientY - r.top}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    };
    page.addEventListener("pointermove", move);
    page.addEventListener("pointerout", leave);
    page.addEventListener("pointerdown", press);
    return () => {
      page.removeEventListener("pointermove", move);
      page.removeEventListener("pointerout", leave);
      page.removeEventListener("pointerdown", press);
    };
  }, []);
  return <div className="am-cursor" aria-hidden="true" />;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/AmaotoShell.tsx">
<![CDATA["use client";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { Logo } from "../brand/Logo";
import { Hanko } from "../brand/Hanko";
import { COLOURWAYS } from "../data/colourways";
import { Canopy } from "../sections/Canopy";
import { Commission } from "../sections/Commission";
import { Hero } from "../sections/Hero";
import { Light } from "../sections/Light";
import { Making } from "../sections/Making";
import { Structure } from "../sections/Structure";
import { SectionBackdrop } from "../bg/SectionBackdrop";
import { SoundToggle } from "../audio/SoundToggle";
import { Motion } from "../motion/Motion";
import { WagasaCanvas } from "./WagasaCanvas";
import { ScrollDirector } from "./ScrollDirector";
import { initialDirector } from "./director";
import { AnatomyControls, AnatomyDetails } from "./AnatomyControls";
import {
  anatomyReducer,
  createAnatomy,
  isPart,
  type AnatomyEvent,
  type PartId,
} from "./anatomy";
import {
  WORLD_CHAPTERS,
  getChapterStateAtProgress,
  type Tool,
  type ChapterProgressState,
} from "../logic/chapters";
import { computeTimeOfDay } from "../logic/timeOfDay";
import {
  createInspect,
  exit,
  toggleKeyboardEngage,
  exitOnChapterChange,
} from "../logic/inspect";
import { paperLitAt } from "../logic/atmosphere";
import type { ScrollController } from "./scroll";
import { MAKING_STEPS } from "../data/steps";
import { progressForAssembly } from "./makingSequence";
import { PartCallout } from "../ui/PartCallout";
export function AmaotoShell() {
  const director = useRef(initialDirector()),
    controls = useRef<ScrollController | null>(null),
    inspection = useRef(createInspect()),
    owner = useRef(""),
    previousFocus = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"static" | "loading" | "cinematic">(
      "static",
    ),
    [reason, setReason] = useState(""),
    [story, setStory] = useState(getChapterStateAtProgress(0)),
    [chapter, setChapter] = useState(0),
    [tool, setTool] = useState<Tool>(null);
  const [anatomy, rawDispatch] = useReducer(
      anatomyReducer,
      undefined,
      createAnatomy,
    ),
    [hovered, setHovered] = useState<PartId>(),
    [time, setTime] = useState(0.75),
    [rain, setRain] = useState(true),
    [colourway, setColourway] = useState("cream"),
    [closed, setClosed] = useState(false),
    [dyeOrigin, setDyeOrigin] = useState<[number, number]>([0.5, 0.5]);
  useEffect(() => {
    director.current.timeOfDay = time;
  }, [time]);
  const day = useMemo(() => computeTimeOfDay(time), [time]),
    colour = COLOURWAYS.find((c) => c.id === colourway) ?? COLOURWAYS[0];
  const close = useCallback(() => {
    owner.current = "";
    setTool(null);
    inspection.current = exit(inspection.current);
    controls.current?.setScrollPaused(false);
    rawDispatch({ type: "overview" });
    previousFocus.current?.focus({ preventScroll: true });
  }, []);
  const changeChapter = useCallback((n: number) => {
    owner.current = "";
    setChapter(n);
    setHovered(undefined);
    setTool(null);
    inspection.current = exit(inspection.current);
    controls.current?.setScrollPaused(false);
    rawDispatch({ type: "overview" });
  }, []);
  const onState = useCallback(
    (s: ChapterProgressState) => {
      setStory(s);
      inspection.current = exitOnChapterChange(
        inspection.current,
        `${s.activeChapterIndex}:${s.subRest ?? ""}`,
      );
      if (
        owner.current &&
        owner.current !== `${s.activeChapterIndex}:${s.subRest ?? ""}`
      )
        close();
    },
    [close],
  );
  const engage = useCallback((value: Tool, focusStage = false) => {
    if (!value) return;
    const first = !owner.current;
    if (first) previousFocus.current = document.activeElement as HTMLElement;
    owner.current = `${director.current.world.activeChapterIndex}:${director.current.world.subRest ?? ""}`;
    setTool(value);
    controls.current?.setScrollPaused(true);
    if (value === "anatomy" && inspection.current.phase !== "engaged")
      inspection.current = toggleKeyboardEngage(
        inspection.current,
        owner.current,
      );
    if (first || focusStage)
      setTimeout(
        () =>
          document
            .querySelector<HTMLElement>(
              focusStage ? ".am-canvas" : ".am-tool-close",
            )
            ?.focus({ preventScroll: true }),
        0,
      );
  }, []);
  const dispatch = useCallback(
    (event: AnatomyEvent) => {
      if (
        event.type !== "overview" &&
        event.type !== "finish" &&
        director.current.chapter === 1
      )
        engage("anatomy");
      rawDispatch(event);
    },
    [engage],
  );
  const select = useCallback(
    (id: string, index?: number) => {
      if (isPart(id) && director.current.chapter === 1) {
        engage("anatomy");
        rawDispatch({ type: "select", part: id, ribIndex: index });
      }
    },
    [engage],
  );
  const ready = useCallback(() => setMode("cinematic"), []),
    fallback = useCallback(() => {
      close();
      inspection.current = createInspect();
      setMode("static");
      setReason("fallback");
    }, [close]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion:reduce)");
    const update = () => {
      setMode(media.matches ? "static" : "loading");
      setReason(media.matches ? "reduced-motion" : "");
      setTool(null);
      inspection.current = createInspect();
      owner.current = "";
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tool) {
        e.preventDefault();
        close();
      }
    };
    const highlight = (e: Event) => {
      const id = (e as CustomEvent<unknown>).detail;
      setHovered(isPart(id) ? id : undefined);
    };
    const runner = (e: Event) => {
      const v = (e as CustomEvent<unknown>).detail;
      if (typeof v === "number" && Number.isFinite(v))
        rawDispatch({ type: "open", value: v });
    };
    document.addEventListener("keydown", key);
    document.addEventListener("amaoto-highlight", highlight);
    document.addEventListener("amaoto-runner", runner);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("amaoto-highlight", highlight);
      document.removeEventListener("amaoto-runner", runner);
    };
  }, [tool, close]);
  const cinematic = mode === "cinematic";
  const anatomyVisible = cinematic && chapter === 1;
  const panelTool = tool ?? (anatomyVisible ? "anatomy" : null);
  const style = {
    ...day.cssVars,
    "--am-dye": colour.color,
  } as React.CSSProperties;
  return (
    <main
      className="am-page"
      style={style}
      data-world-mode={mode}
      data-fallback={reason}
      data-active-chapter={chapter}
      data-sub-rest={story.subRest ?? "none"}
      data-inspect-phase={tool === "anatomy" ? "engaged" : "idle"}
      data-paper-lit={paperLitAt(story, day) > 0.45}
      data-tool={tool ?? "none"}
      onClick={(e) => {
        const a = (e.target as Element).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        if (!a || !cinematic) return;
        const c = WORLD_CHAPTERS.find(
          (c) => `#${c.id}` === a.getAttribute("href"),
        );
        if (c) {
          e.preventDefault();
          close();
          controls.current?.scrollToProgress(c.restProgress);
          history.replaceState(null, "", `#${c.id}`);
        }
      }}
    >
      <SectionBackdrop />
      <header className="am-header">
        <Logo />
        <div className="am-time">
          <button
            type="button"
            aria-label="Set light to dusk"
            onClick={() => setTime(0)}
          >
            Dusk
          </button>
          <label>
            <span>
              Time of day <output>{day.timeLabel}</output>
            </span>
            <input
              aria-label="Time of day"
              type="range"
              min="0"
              max="1"
              step=".01"
              value={time}
              aria-valuetext={`${day.timeLabel} (${Math.round(time * 100)}%)`}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </label>
          <button
            type="button"
            aria-label="Set light to day"
            onClick={() => setTime(1)}
          >
            Day
          </button>
        </div>
        <SoundToggle director={director} />
        <span className="am-header__counter">
          <b data-rib-count>00</b> / 40 ribs open
        </span>
      </header>
      <div className="am-stage">
        {mode !== "static" && (
          <WagasaCanvas
            director={director}
            onPart={select}
            hovered={hovered}
            anatomy={anatomy}
            onActionFinish={(id) => rawDispatch({ type: "finish", id })}
            sun={time * 180 - 90}
            timeOfDay={time}
            dyeOrigin={dyeOrigin}
            rain={rain}
            colour={colour.color}
            motif={colour.motif}
            closed={closed}
            controls={controls}
            inspection={inspection}
            tool={tool}
            onReady={ready}
            onFallback={fallback}
          />
        )}
        {mode === "static" && (
          <div className="am-static-poster" aria-hidden="true">
            <svg className="am-poster" viewBox="0 0 500 400">
              <path
                d="M250 35Q100 70 30 210Q250 300 470 210Q400 70 250 35Z"
                fill="#F4ECDD"
                stroke="#B8923A"
              />
              {Array.from({ length: 21 }, (_, i) => (
                <path
                  key={i}
                  d={`M250 35L${30 + i * 22} ${210 + Math.sin((i / 20) * Math.PI) * 45}`}
                  stroke="#B8923A"
                  fill="none"
                />
              ))}
              <path d="M250 45V380" stroke="#B8923A" strokeWidth="7" />
            </svg>
          </div>
        )}
        <AnatomyControls
          active={cinematic && chapter === 1}
          state={anatomy}
          dispatch={dispatch}
          onHighlight={setHovered}
        />
        <svg className="am-leader" aria-hidden="true">
          <path data-leader />
        </svg>
      </div>
      {mode === "loading" && (
        <div className="am-loading" role="status">
          Preparing paper and light<span>雨音</span>
        </div>
      )}
      {cinematic && <div className="am-world-track" aria-hidden="true" />}
      <Hero />
      <Structure state={anatomy} dispatch={dispatch} enhanced={cinematic} />
      <Light
        angle={time * 180 - 90}
        onAngle={(n) => setTime((n + 90) / 180)}
        rain={rain}
        onRain={setRain}
      />
      <Canopy
        value={colourway}
        onChange={(id, origin) => {
          setColourway(id);
          setDyeOrigin(origin ?? [0.5, 0.5]);
        }}
      />
      <Making />
      <Commission canopy={colour.label} onSuccess={() => setClosed(true)} />
      {cinematic && (
        <>
          <nav className="am-journey-nav" aria-label="Chapter navigation">
            <button
              type="button"
              aria-label="Previous chapter rest"
              disabled={story.progress === 0}
              onClick={() => {
                close();
                controls.current?.stepChapter(-1);
              }}
            >
              ←
            </button>
            <div className="am-chapter-marker" aria-live="polite">
              <span>
                {story.activeChapter.numberLabel} / {story.activeChapter.title}
              </span>
              <small>
                {story.activeChapter.markerLabel}
                {story.subRest === "street" ? " / touch the rain" : ""}
              </small>
            </div>
            <div className="am-jump-list">
              {WORLD_CHAPTERS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Jump to ${c.title}`}
                  aria-current={chapter === c.index ? "step" : undefined}
                  onClick={() => {
                    close();
                    controls.current?.scrollToProgress(c.restProgress);
                  }}
                >
                  {c.numberLabel}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next chapter rest"
              disabled={story.progress === 1}
              onClick={() => {
                close();
                controls.current?.stepChapter(1);
              }}
            >
              →
            </button>
          </nav>
          {story.activeChapter.tool && !tool && !anatomyVisible && (
            <button
              type="button"
              className="am-enter-tool"
              onClick={() => engage(story.activeChapter.tool)}
            >
              {story.activeChapter.toolButtonLabel}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          )}
          {chapter === 4 && (
            <div
              className="am-making-strip"
              role="group"
              aria-label="Making steps"
            >
              {MAKING_STEPS.map((step, i) => (
                <button
                  key={step}
                  type="button"
                  aria-current={
                    Math.min(9, Math.floor(story.benchAssembly * 10)) === i
                      ? "step"
                      : undefined
                  }
                  onClick={() => {
                    engage("making");
                    controls.current?.scrollToProgress(
                      progressForAssembly(i / 9),
                      true,
                    );
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </button>
              ))}
            </div>
          )}
          {panelTool && (
            <aside
              className="am-tool-sheet"
              role={tool ? "dialog" : "region"}
              aria-modal={tool ? false : undefined}
              aria-label={
                panelTool === "anatomy"
                  ? "Inspect the structure"
                  : panelTool === "light"
                    ? "Explore light"
                    : "Follow the making"
              }
            >
              <header>
                <span>
                  {panelTool === "anatomy"
                    ? "Bamboo / paper / thread"
                    : panelTool === "light"
                      ? "Light / weather"
                      : "The making"}
                </span>
                <button
                  className="am-tool-close"
                  type="button"
                  onClick={() => {
                    close();
                    if (!tool)
                      controls.current?.scrollToProgress(
                        WORLD_CHAPTERS[2].restProgress,
                      );
                  }}
                >
                  {tool ? "Return to story" : "Continue to Paper"}{" "}
                  <span aria-hidden="true">{tool ? "×" : "→"}</span>
                </button>
              </header>
              {panelTool === "anatomy" && (
                <>
                  <div className="am-sheet-parts">
                    <PartCallout
                      selected={anatomy.part}
                      onSelect={(part) => dispatch({ type: "select", part })}
                      onHighlight={setHovered}
                    />
                  </div>
                  <AnatomyDetails state={anatomy} dispatch={dispatch} />
                  <button
                    type="button"
                    className="am-focus-stage"
                    onClick={() => engage("anatomy", true)}
                  >
                    Focus umbrella · arrow keys turn the view
                  </button>
                </>
              )}
              {panelTool === "light" && (
                <>
                  <h3>Paper that listens to light.</h3>
                  <p>Move from dusk to day. The fibres answer.</p>
                  <label>
                    Light level
                    <input
                      aria-label="Light level"
                      type="range"
                      min="0"
                      max="1"
                      step=".01"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                    />
                  </label>
                  <label className="am-switch">
                    <input
                      type="checkbox"
                      checked={rain}
                      onChange={(e) => setRain(e.target.checked)}
                    />
                    Rain on the roof
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      controls.current?.scrollToProgress(0.72);
                    }}
                  >
                    Step into the rain ↗
                  </button>
                </>
              )}
              {panelTool === "making" && (
                <>
                  <h3>
                    {
                      MAKING_STEPS[
                        Math.min(9, Math.floor(story.benchAssembly * 10))
                      ]
                    }
                  </h3>
                  <label>
                    Follow the making
                    <input
                      aria-label="Making progress"
                      type="range"
                      min="0"
                      max="1"
                      step=".001"
                      value={story.benchAssembly}
                      onInput={(e) =>
                        controls.current?.scrollToProgress(
                          progressForAssembly(Number(e.currentTarget.value)),
                          true,
                        )
                      }
                    />
                  </label>
                  <p>
                    {Math.min(10, Math.floor(story.benchAssembly * 10) + 1)} /
                    10 — move forward or back
                  </p>
                </>
              )}
            </aside>
          )}
        </>
      )}
      <footer className="am-footer">
        <Logo />
        <span>AMAOTO / Kurokawa, Nagano / 2026</span>
        <Hanko />
        <a href="#top">Back to top ↑</a>
      </footer>
      <ScrollDirector
        directorRef={director}
        onChapter={changeChapter}
        enabled={cinematic}
        controlsRef={controls}
        onState={onState}
      />
      <Motion />
      <noscript>
        <style>
          {
            ".am-line>span{opacity:1!important;transform:none!important}.am-anatomy-fallback{display:block!important}.am-inspector-detail,.am-sound{display:none!important}"
          }
        </style>
      </noscript>
    </main>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/anatomy.ts">
<![CDATA[import { PARTS } from "../data/parts";
import { clamp01 } from "../model/rig";
export type PartId = (typeof PARTS)[number]["id"];
export const isPart = (id: unknown): id is PartId =>
  PARTS.some((part) => part.id === id);
export type Demonstration = "linkage" | "trace" | "turn";
export type AnatomyState = {
  part: PartId | null;
  open: number;
  reveal: boolean;
  oneRib: boolean;
  ribIndex: number;
  underneath: boolean;
  turn: number;
  staticTie: boolean;
  viewId: number;
  sequence: number;
  action: { kind: Demonstration; id: number } | null;
};
export const createAnatomy = (): AnatomyState => ({
  part: null,
  open: 1,
  reveal: false,
  oneRib: false,
  ribIndex: 4,
  underneath: false,
  turn: 0,
  staticTie: false,
  viewId: 0,
  sequence: 0,
  action: null,
});
export type AnatomyEvent =
  | { type: "select"; part: PartId; ribIndex?: number }
  | { type: "overview" }
  | { type: "open"; value: number }
  | { type: "reveal" }
  | { type: "ribs" }
  | { type: "side" }
  | { type: "play"; kind: Demonstration; reduced: boolean }
  | { type: "finish"; id: number };
export const INSPECTION: Record<
  PartId,
  {
    material: string;
    instruction: string;
    eye: [number, number, number];
    radius: number;
    minimum: number;
    reveal: boolean;
  }
> = {
  ribs: {
    material: "Bamboo / repeated 40 times",
    instruction:
      "Follow one bowed rib, then see the whole circumference move together.",
    eye: [2.8, -1.4, 4],
    radius: 0.95,
    minimum: 0.6,
    reveal: true,
  },
  stretchers: {
    material: "Bamboo / hinged links",
    instruction:
      "The runner rises. The links spread. The ribs lift the paper into a roof.",
    eye: [2, -2.6, 4],
    radius: 1.05,
    minimum: 0.55,
    reveal: true,
  },
  runner: {
    material: "Turned wood / sliding collar",
    instruction:
      "Move the collar along the shaft. Every link answers the same movement.",
    eye: [2, 0.25, 4],
    radius: 0.63,
    minimum: 0,
    reveal: false,
  },
  thread: {
    material: "Thread / diamond lacing",
    instruction:
      "A crossing tie joins neighbouring ribs. Trace its path under the paper.",
    eye: [1.5, -3, 3.6],
    radius: 0.54,
    minimum: 0.85,
    reveal: false,
  },
  canopy: {
    material: "Washi / painted paper gores",
    instruction:
      "Look across the painted paper, then turn underneath to see what holds it.",
    eye: [2, 4, 3],
    radius: 1.1,
    minimum: 1,
    reveal: false,
  },
  handle: {
    material: "Turned bamboo / beaded grip",
    instruction:
      "Turn the view to follow the beads, rounded end and the joint to the shaft.",
    eye: [2, 0.25, 4],
    radius: 0.68,
    minimum: 0,
    reveal: false,
  },
};
export function anatomyReducer(
  state: AnatomyState,
  event: AnatomyEvent,
): AnatomyState {
  switch (event.type) {
    case "overview":
      return {
        ...createAnatomy(),
        viewId: state.sequence + 1,
        sequence: state.sequence + 1,
      };
    case "select":
      return {
        ...state,
        part: event.part,
        open: Math.max(state.open, INSPECTION[event.part].minimum),
        reveal: INSPECTION[event.part].reveal,
        oneRib: false,
        underneath: false,
        turn: 0,
        staticTie: false,
        ribIndex:
          event.ribIndex === undefined
            ? 4
            : Math.max(0, Math.min(39, Math.floor(event.ribIndex))),
        action: null,
        viewId: state.sequence + 1,
        sequence: state.sequence + 1,
      };
    case "open":
      return {
        ...state,
        open: clamp01(event.value),
        action: null,
        sequence: state.sequence + 1,
      };
    case "reveal":
      return { ...state, reveal: !state.reveal };
    case "ribs":
      return { ...state, oneRib: !state.oneRib };
    case "side":
      return {
        ...state,
        underneath: !state.underneath,
        action: null,
        sequence: state.sequence + 1,
      };
    case "play": {
      if (event.reduced)
        return {
          ...state,
          action: null,
          sequence: state.sequence + 1,
          ...(event.kind === "turn"
            ? { turn: state.turn + Math.PI / 2 }
            : event.kind === "trace"
              ? { staticTie: !state.staticTie }
              : { open: state.open > 0.5 ? 0.25 : 1 }),
        };
      return {
        ...state,
        staticTie: false,
        sequence: state.sequence + 1,
        action: { kind: event.kind, id: state.sequence + 1 },
      };
    }
    case "finish":
      return state.action?.id === event.id ? { ...state, action: null } : state;
  }
}
const ease = (t: number) => {
  const n = clamp01(t);
  return n * n * (3 - 2 * n);
};
export function sampleDemonstration(
  kind: Demonstration | null,
  elapsed: number,
  open: number,
) {
  const duration = kind === "linkage" ? 3.2 : kind === "trace" ? 2.4 : 3;
  const t = clamp01(elapsed / duration),
    running = Boolean(kind) && elapsed < duration;
  let value = open;
  if (kind === "linkage") {
    const stops = [open, 0.25, 1, open],
      section = Math.min(2, Math.floor(t * 3)),
      f = ease(t * 3 - section);
    value = stops[section] + (stops[section + 1] - stops[section]) * f;
  }
  return {
    open: value,
    trace: kind === "trace" && running ? t : -1,
    turn: kind === "turn" ? Math.PI * 2 * ease(t) : 0,
    running,
    highlight:
      kind === "linkage" && running
        ? ((t < 0.32 ? "runner" : t < 0.65 ? "stretchers" : "ribs") as PartId)
        : null,
  };
}
/** Project a pointer onto a screen-space shaft, not the screen's arbitrary vertical axis. */
export function projectedRunnerOpen(
  pointer: { x: number; y: number },
  closed: { x: number; y: number },
  opened: { x: number; y: number },
) {
  const x = opened.x - closed.x,
    y = opened.y - closed.y,
    length = x * x + y * y;
  return length < 1
    ? 0
    : clamp01(
        ((pointer.x - closed.x) * x + (pointer.y - closed.y) * y) / length,
      );
}
export function inspectionDistance(radius: number, aspect: number, fov = 34) {
  return (
    (radius /
      Math.sin(
        Math.atan(
          Math.tan((fov * Math.PI) / 360) * Math.min(1, Math.max(0.2, aspect)),
        ),
      )) *
    1.12
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/AnatomyControls.tsx">
<![CDATA[import { PARTS } from "../data/parts";
import { PartCallout } from "../ui/PartCallout";
import {
  INSPECTION,
  type AnatomyState,
  type AnatomyEvent,
  type PartId,
} from "./anatomy";
type Controls = {
  state: AnatomyState;
  dispatch: (event: AnatomyEvent) => void;
};
export function AnatomyControls({
  active,
  state,
  dispatch,
  onHighlight,
}: { active: boolean; onHighlight: (id?: PartId) => void } & Controls) {
  return (
    <div className="am-anatomy-ui" hidden={!active} data-inspector-overlay>
      <svg className="am-hotspot-lines" aria-hidden="true">
        {PARTS.map((part) => (
          <path key={part.id} data-marker-line={part.id} />
        ))}
      </svg>
      {PARTS.map((part, index) => (
        <button
          className="am-hotspot"
          key={part.id}
          type="button"
          data-hotspot={part.id}
          data-selected={state.part === part.id}
          aria-label={`Inspect ${part.name}`}
          aria-pressed={state.part === part.id}
          onClick={() => dispatch({ type: "select", part: part.id })}
          onMouseEnter={() => onHighlight(part.id)}
          onMouseLeave={() => onHighlight(undefined)}
          onFocus={() => onHighlight(part.id)}
          onBlur={() => onHighlight(undefined)}
        >
          <span>0{index + 1}</span>
          <b>{part.name}</b>
        </button>
      ))}
      <div className="am-inspector-navigation" data-inspector-navigation>
        <PartCallout
          selected={state.part}
          onSelect={(part) => dispatch({ type: "select", part })}
          onHighlight={onHighlight}
        />
        <div className="am-inspector-navigation__foot">
          <span>
            {state.part
              ? "Look closer. Every part has a job."
              : "Choose any part to look closer."}
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: "overview" })}
            disabled={!state.part && !state.reveal && state.open === 1}
          >
            Back to overview <span aria-hidden="true">↶</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export function AnatomyDetails({ state, dispatch }: Controls) {
  const part = PARTS.find((part) => part.id === state.part),
    info = state.part ? INSPECTION[state.part] : null;
  const play = (kind: "linkage" | "trace" | "turn") =>
    dispatch({
      type: "play",
      kind,
      reduced: matchMedia("(prefers-reduced-motion:reduce)").matches,
    });
  return (
    <div
      className="am-inspector-detail"
      id="am-inspector-detail"
      data-selected-part={state.part ?? "overview"}
    >
      <div className="am-inspector-detail__body">
        <span className="am-inspector-material">
          {info?.material ?? "Bamboo / paper / thread"}
        </span>
        <h3 aria-live="polite" aria-atomic="true">
          {part?.name ?? "A roof, in six parts."}
        </h3>
        <p>
          {part?.description ??
            "Choose a part on the umbrella or in the index. Look closer, move it, and follow how it belongs to the whole."}
        </p>
        {info && <p className="am-inspector-instruction">{info.instruction}</p>}
      </div>
      <div className="am-inspector-actions">
        {state.part === "ribs" && (
          <button
            type="button"
            aria-pressed={state.oneRib}
            onClick={() => dispatch({ type: "ribs" })}
          >
            {state.oneRib ? "Show all 40 ribs" : "Emphasise one rib"}
          </button>
        )}
        {state.part === "stretchers" && (
          <button
            type="button"
            disabled={state.action?.kind === "linkage"}
            onClick={() => play("linkage")}
          >
            {state.action?.kind === "linkage"
              ? "Following the linkage…"
              : "Move the linkage"}
          </button>
        )}
        {state.part === "thread" && (
          <button
            type="button"
            disabled={state.action?.kind === "trace"}
            aria-pressed={state.staticTie}
            onClick={() => play("trace")}
          >
            {state.action?.kind === "trace"
              ? "Tracing the tie…"
              : "Trace a tie"}
          </button>
        )}
        {state.part === "canopy" && (
          <div role="group" aria-label="Paper inspection side">
            <button
              type="button"
              aria-pressed={!state.underneath}
              onClick={() => {
                if (state.underneath) dispatch({ type: "side" });
              }}
            >
              Outside
            </button>
            <button
              type="button"
              aria-pressed={state.underneath}
              onClick={() => {
                if (!state.underneath) dispatch({ type: "side" });
              }}
            >
              Underneath
            </button>
          </div>
        )}
        {state.part === "handle" && (
          <button
            type="button"
            disabled={state.action?.kind === "turn"}
            onClick={() => play("turn")}
          >
            {state.action?.kind === "turn"
              ? "Turning the view…"
              : "Turn the view"}
          </button>
        )}
      </div>
      <label className="am-inspector-runner" htmlFor="am-runner">
        <span>
          Pull the runner{" "}
          <output data-anatomy-open htmlFor="am-runner">
            {Math.round(state.open * 100)}%
          </output>
        </span>
        <input
          id="am-runner"
          aria-label="Pull the runner"
          type="range"
          min="0"
          max="1"
          step=".01"
          value={state.open}
          onChange={(event) =>
            dispatch({ type: "open", value: Number(event.target.value) })
          }
        />
        <span className="am-inspector-range-ends">
          <i>Closed</i>
          <i>Open</i>
        </span>
      </label>
      <button
        className="am-inspector-reveal"
        type="button"
        aria-pressed={state.reveal}
        onClick={() => dispatch({ type: "reveal" })}
      >
        <span aria-hidden="true">{state.reveal ? "−" : "+"}</span>
        {state.reveal ? "Restore the paper" : "Reveal structure"}
      </button>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/canopyEffects.ts">
<![CDATA[import * as THREE from "three";
import type { WorldTextures } from "./textures";
import type { WorldFrame } from "./worlds/shared";
import { gustField } from "../logic/generators";
/** Adds world optics around the existing dye/cutaway hook without replacing its painter. */
export function installCanopyEffects(
  model: THREE.Group,
  textures: WorldTextures,
) {
  const skin = model.children.find(
    (o) => o.userData.partId === "canopy",
  ) as THREE.Mesh;
  const material = skin.material as THREE.MeshStandardMaterial,
    original = material.onBeforeCompile;
  const uniforms = {
    uWorldDive: { value: 0 },
    uWorldOil: { value: 0 },
    uWorldTransmission: { value: 0.5 },
    uWorldLantern: { value: 0 },
    uWorldRain: { value: 0 },
    uWorldGust: { value: 0 },
    uWorldTime: { value: 0 },
    uWorldSun: { value: new THREE.Vector3(0, 1, 0) },
    uThickness: { value: textures.maps.washiTransmission },
  };
  material.transparent = true;
  material.onBeforeCompile = (shader, renderer) => {
    original.call(material, shader, renderer);
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader =
      "uniform float uWorldGust,uWorldTime;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\ntransformed+=normal*uWorldGust*.025*sin(position.x*5.+position.z*4.+uWorldTime*4.);",
    );
    shader.fragmentShader =
      "uniform float uWorldDive,uWorldOil,uWorldTransmission,uWorldLantern,uWorldRain,uWorldGust,uWorldTime;uniform vec3 uWorldSun;uniform sampler2D uThickness;\nfloat beadHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\n" +
      shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <alphatest_fragment>",
      "#include <alphatest_fragment>\ndiffuseColor.a*=1.-smoothstep(.12,.8,uWorldDive);if(diffuseColor.a<.025)discard;",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      "#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,.34,uWorldOil*.65);",
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <opaque_fragment>",
      `vec3 paperLight=normalize(mat3(viewMatrix)*uWorldSun);float thickness=texture2D(uThickness,vMapUv).r;
   float transmitted=pow(abs(dot(normal,paperLight)),.7)*(1.-thickness*.65)*uWorldTransmission;
   float ribShade=1.-smoothstep(.025,.095,abs(fract(vMapUv.x*40.+.5)-.5));
   outgoingLight+=diffuseColor.rgb*transmitted*(gl_FrontFacing?.38:1.3)*(1.+uWorldOil*.35)*(1.-ribShade*.65);
   outgoingLight+=diffuseColor.rgb*vec3(.48,.29,.045)*uWorldLantern*(1.-thickness*.55)*(gl_FrontFacing?.65:1.3)*(1.-ribShade*.75);
   vec2 beadUv=vMapUv*vec2(180.,100.),cell=floor(beadUv);vec2 spot=vec2(beadHash(cell),beadHash(cell+13.));float bead=(1.-smoothstep(.035,.12,length(fract(beadUv)-spot)))*step(.8,beadHash(cell+47.));
   float spec=pow(max(0.,dot(reflect(-paperLight,normal),normalize(vViewPosition))),18.);outgoingLight+=vec3(.90,.84,.72)*bead*spec*uWorldRain*3.*(1.-uWorldGust*.8);
   #include <opaque_fragment>`,
    );
  };
  material.needsUpdate = true;
  const point = new THREE.Vector3();
  return {
    update(f: WorldFrame) {
      uniforms.uWorldDive.value = f.state.paperDive;
      uniforms.uWorldOil.value = f.state.oilSoak;
      uniforms.uWorldTransmission.value = f.day.paperTransmission;
      uniforms.uWorldLantern.value =
        (f.state.worldVisibility.street +
          f.state.worldVisibility.genkan * 0.7) *
        f.day.lanternIntensityMultiplier;
      uniforms.uWorldRain.value = f.rain;
      uniforms.uWorldTime.value = f.elapsedSec;
      uniforms.uWorldSun.value.fromArray(f.day.sunOffset).normalize();
      point.fromArray(f.state.anchor);
      const g = gustField(f.gustAge, point.distanceTo(f.gustOrigin));
      uniforms.uWorldGust.value = g.amplitude;
      material.depthWrite = f.state.paperDive < 0.1;
    },
    dispose() {
      material.onBeforeCompile = original;
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/director.ts">
<![CDATA[import type { WagasaPose } from "../model/createWagasaModel";
import {
  getChapterStateAtProgress,
  type ChapterProgressState,
} from "../logic/chapters";
export const CHAPTERS = [
  "top",
  "structure",
  "light",
  "canopy",
  "making",
  "commission",
] as const;
export type StageRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};
export type ChapterFrame = WagasaPose & {
  open: number;
  explode: number;
  camera: [number, number, number];
  target: [number, number, number];
  rain: number;
  highlight: string | null;
};
export type DirectorState = ChapterFrame & {
  world: ChapterProgressState;
  timeOfDay: number;
  fov: number;
  focusDistance: number;
  progress: number;
  chapter: number;
  local: number;
  rect: StageRect;
  reduced: boolean;
  introStart: number;
  interrupted: boolean;
  ready: boolean;
  rainIntensity: number;
};
export const FRAMES: ChapterFrame[] = [
  {
    position: [0, 0, 0],
    rotation: [0.12, 0, -0.16],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [4, 3.1, 10],
    target: [0, 0.2, 0],
    rain: 0.15,
    highlight: null,
  },
  {
    position: [0, -0.1, 0],
    rotation: [-0.18, 0.5, 0.19],
    scale: 0.92,
    open: 1,
    explode: 0,
    camera: [3, -0.7, 9.6],
    target: [0, 0.4, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, -0.4, 0],
    rotation: [-0.2, 0.9, 0.1],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [0.3, -4.8, 8.8],
    target: [0, 0.7, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, 0, 0],
    rotation: [0.45, 1.6, -0.15],
    scale: 1,
    open: 1,
    explode: 0,
    camera: [3.5, 4.6, 9.5],
    target: [0, 0.2, 0],
    rain: 0,
    highlight: null,
  },
  {
    position: [0, 0, 0],
    rotation: [-0.15, 2.3, 0.2],
    scale: 0.95,
    open: 0.94,
    explode: 0.7,
    camera: [2, 1.2, 9.6],
    target: [0, 0.2, 0],
    rain: 0,
    highlight: "ribs",
  },
  {
    position: [0, 0, 0],
    rotation: [0.08, 2.8, -0.32],
    scale: 1,
    open: 0,
    explode: 0,
    camera: [1, 1, 9],
    target: [0, 0, 0],
    rain: 0.12,
    highlight: null,
  },
];
export function initialDirector(): DirectorState {
  return {
    ...FRAMES[0],
    world: getChapterStateAtProgress(0),
    timeOfDay: 0.75,
    fov: 34,
    focusDistance: 11,
    open: 0,
    progress: 0,
    chapter: 0,
    local: 0,
    rect: { left: 0, top: 0, width: 1, height: 1 },
    reduced: false,
    introStart: Infinity,
    interrupted: false,
    ready: false,
    rainIntensity: 0,
  };
}
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export function sampleChapter(index: number, t: number): ChapterFrame {
  const a = FRAMES[index],
    b = FRAMES[Math.min(index + 1, FRAMES.length - 1)];
  const f = Math.max(0, Math.min(1, (t - 0.62) / 0.38)),
    s = f * f * (3 - 2 * f);
  const vector = (x: [number, number, number], y: [number, number, number]) =>
    x.map((n, i) => mix(n, y[i], s)) as [number, number, number];
  return {
    position: vector(a.position, b.position),
    rotation: vector(a.rotation, b.rotation),
    scale: mix(a.scale, b.scale, s),
    open: mix(a.open, b.open, s),
    explode: mix(a.explode, b.explode, s),
    camera: vector(a.camera, b.camera),
    target: vector(a.target, b.target),
    rain: mix(a.rain, b.rain, s),
    highlight: a.highlight,
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/framing.ts">
<![CDATA[import * as THREE from "three";
import { HUB_Y, paperPoint } from "../model/rig";

// Full-rig envelopes keep framing steady through opening and separation.
// Sample actual paper geometry and include turned cap/grip and lashing clearance.
function makeEnvelope(explode: number) {
  const points: THREE.Vector3[] = [];
  for (const open of [0, 0.25, 0.6, 1])
    for (let rib = 0; rib < 40; rib++)
      for (const t of [0.45, 0.72, 1])
        points.push(
          new THREE.Vector3().copy(paperPoint(open, rib, t, 0, explode)),
        );
  for (const y of [
    -2.3 - explode * 0.32,
    -1.4 - explode * 0.32,
    HUB_Y - 0.03,
    HUB_Y + 0.34,
  ])
    for (const x of [-0.14, 0.14])
      for (const z of [-0.14, 0.14]) points.push(new THREE.Vector3(x, y, z));
  return points;
}
const envelope = makeEnvelope(0);
const separatedEnvelope = [...envelope, ...makeEnvelope(1)];
const back = new THREE.Vector3(),
  right = new THREE.Vector3(),
  up = new THREE.Vector3(),
  point = new THREE.Vector3();
const worldUp = new THREE.Vector3(0, 1, 0);
/** Every chapter keeps the whole umbrella in its canvas; only a selected anatomy part may crop in close. */
export function fitsWholeUmbrella(
  chapter: number,
  inspectedPart: string | null,
) {
  return !(chapter === 1 && inspectedPart);
}
/** Fit the complete umbrella to the canvas frustum while preserving the authored camera bearing. */
export function fitUmbrellaCamera(
  position: THREE.Vector3,
  target: THREE.Vector3,
  aspect: number,
  modelMatrix: THREE.Matrix4,
  fov = 34,
  includeExplodedPose = false,
) {
  back.copy(position).sub(target);
  let distance = back.length();
  if (distance < 0.001) {
    back.set(0, 0, 1);
    distance = 0.001;
  } else back.divideScalar(distance);
  right.crossVectors(worldUp, back).normalize();
  up.crossVectors(back, right).normalize();
  const originalDistance = distance;
  const vertical = Math.tan((fov * Math.PI) / 360) * 0.92,
    horizontal = vertical * Math.max(0.05, aspect);
  for (const local of includeExplodedPose ? separatedEnvelope : envelope) {
    point.copy(local).applyMatrix4(modelMatrix).sub(target);
    const depth = point.dot(back);
    distance = Math.max(
      distance,
      depth + (Math.abs(point.dot(right)) + 0.045) / horizontal,
      depth + (Math.abs(point.dot(up)) + 0.045) / vertical,
    );
  }
  if (distance === originalDistance) return position;
  return position.copy(target).addScaledVector(back, distance);
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/inspectController.ts">
<![CDATA[import * as THREE from "three";
import type { RefObject } from "react";
import {
  onPointerDown,
  onPointerMove,
  onPointerUp,
  applyKeyboardStep,
  tick,
  isPinFacingCamera,
  type InspectState,
  type Quaternion,
} from "../logic/inspect";
import type { Vec3 } from "../logic/rng";
export function createInspectController(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  state: RefObject<InspectState>,
  camera: THREE.PerspectiveCamera,
) {
  const cameraRotation: Quaternion = [0, 0, 0, 1],
    n: Vec3 = [0, 0, 1],
    v: Vec3 = [0, 0, 1],
    p: Vec3 = [0, 0, 0],
    normal = new THREE.Vector3(),
    toEye = new THREE.Vector3(),
    projected = new THREE.Vector3();
  const rotation = () => {
    camera.quaternion.toArray(cameraRotation);
    return cameraRotation;
  };
  const key = (event: KeyboardEvent) => {
    if (state.current.phase !== "engaged" || !event.key.startsWith("Arrow"))
      return;
    event.preventDefault();
    event.stopPropagation();
    state.current = applyKeyboardStep(
      state.current,
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0,
      event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0,
      rotation(),
    );
  };
  host.addEventListener("keydown", key);
  return {
    down(x: number, y: number) {
      state.current = onPointerDown(state.current, x, y);
    },
    move(x: number, y: number) {
      state.current = onPointerMove(state.current, x, y, rotation());
    },
    up() {
      state.current = onPointerUp(state.current);
    },
    tick(dt: number) {
      state.current = tick(state.current, dt * 1000);
      canvas.style.touchAction =
        state.current.phase === "engaged" ? "none" : "pan-y";
    },
    pinVisible(localNormal: Vec3, point: THREE.Vector3, model: THREE.Object3D) {
      normal
        .fromArray(localNormal)
        .transformDirection(model.matrixWorld)
        .toArray(n);
      toEye.copy(camera.position).sub(point).toArray(v);
      projected.copy(point).project(camera).toArray(p);
      return isPinFacingCamera(n, v, p);
    },
    dispose() {
      host.removeEventListener("keydown", key);
      canvas.style.removeProperty("touch-action");
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/makingSequence.ts">
<![CDATA[import { MAKING_STEPS } from "../data/steps";
import { clamp01 } from "../model/rig";
export function progressForAssembly(amount: number) {
  let low = 0,
    high = 1;
  const target = clamp01(amount);
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    if (mid * mid * (3 - 2 * mid) < target) low = mid;
    else high = mid;
  }
  return 0.8 + ((low + high) / 2) * 0.11;
}
export const MAKING_PARTS = [
  "ribs",
  "ribs",
  "handle",
  "handle",
  "stretchers",
  "runner",
  "canopy",
  "canopy",
  "thread",
  "thread",
] as const;
export function canPinMaking(width: number, height: number, reduced: boolean) {
  return !reduced && height >= 640 && (width > 900 || height >= 740);
}
export function makingScrollDistance(height: number) {
  return MAKING_STEPS.length * Math.max(180, height * 0.3);
}
/** Native document scroll advances the held scene, followed by one viewport of release. */
export function makingSequence(
  scroll: number,
  start: number,
  distance: number,
  viewport: number,
) {
  const progress = clamp01((scroll - start) / Math.max(1, distance));
  const release = clamp01((scroll - start - distance) / Math.max(1, viewport));
  return {
    progress,
    release,
    step: Math.min(
      MAKING_STEPS.length - 1,
      Math.floor(progress * MAKING_STEPS.length),
    ),
    transition: release === 0 ? 0 : 0.62 + 0.38 * release,
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/rain.ts">
<![CDATA[import * as THREE from "three";
import { generateRain } from "../logic/generators";
import { createSeededRandom } from "../logic/rng";
import type { WorldBase, WorldFrame } from "./worlds/shared";
export function createRain(b: WorldBase, software: boolean) {
  const count = software ? 1200 : 6000,
    data = generateRain(2026, count),
    spawn = new Float32Array(count * 4),
    length = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    spawn.set(data.subarray(i * 5, i * 5 + 4), i * 4);
    length[i] = data[i * 5 + 4];
  }
  const geometry = new THREE.PlaneGeometry(0.012, 1);
  geometry.setAttribute("aSpawn", new THREE.InstancedBufferAttribute(spawn, 4));
  geometry.setAttribute(
    "aLength",
    new THREE.InstancedBufferAttribute(length, 1),
  );
  const uniforms = {
    uRain: { value: 0 },
    uGustAge: { value: 100 },
    uGustOrigin: { value: new THREE.Vector3() },
    uPointerWorld: { value: new THREE.Vector3(1000, 0, 1000) },
    uTint: { value: new THREE.Color("#F4ECDD") },
  };
  const declarations =
    "attribute vec4 aSpawn;attribute float aLength;uniform float uRain,uGustAge;uniform vec3 uGustOrigin,uPointerWorld,uTint;";
  const rain = b.shader(
    declarations,
    `float fall=mod(uTime*aSpawn.z+aSpawn.w*13.,13.);transformed=vec3(aSpawn.x+position.x,7.-fall+position.y*aLength,aSpawn.y);
 float distanceToGust=length(transformed.xz-uGustOrigin.xz);float wave=exp(-pow((distanceToGust-uGustAge*6.5)/2.,2.))*sin(clamp(uGustAge/3.6,0.,1.)*3.14159)*step(0.,uGustAge)*(1.-step(3.6,uGustAge));transformed.x+=wave*1.6+position.y*aLength*(.18+wave);`,
    `if(vWorld.y< -2.42)discard;float pointerGlow=exp(-length(vWorld.xz-uPointerWorld.xz)*.5);color=uTint*(.7+pointerGlow*.7);alpha=uRain*(.18+vUv.y*.32);`,
    uniforms,
  );
  const streaks = new THREE.InstancedMesh(geometry, rain, count),
    identity = new THREE.Matrix4();
  for (let i = 0; i < count; i++) streaks.setMatrixAt(i, identity);
  streaks.frustumCulled = false;
  b.group.add(streaks);
  const rippleCount = software ? 12 : 48,
    rng = createSeededRandom(98),
    rippleGeo = new THREE.PlaneGeometry(0.7, 0.7),
    phases = new Float32Array(rippleCount),
    dummy = new THREE.Object3D();
  for (let i = 0; i < rippleCount; i++) phases[i] = rng();
  rippleGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(phases, 1),
  );
  const ripple = b.shader(
    "attribute float aPhase;varying float vPhase;uniform float uRain;uniform vec3 uTint;",
    "vPhase=aPhase;",
    `float age=fract(uTime*.38+vPhase),r=length(vUv-.5)*2.;float ring=(1.-smoothstep(.018,.035,abs(r-age)));alpha=ring*(1.-age)*uRain*.48;color=uTint;`,
    { uRain: uniforms.uRain, uTint: uniforms.uTint },
  );
  const rings = new THREE.InstancedMesh(rippleGeo, ripple, rippleCount);
  for (let i = 0; i < rippleCount; i++) {
    dummy.position.set((rng() - 0.5) * 19, -2.405, (rng() - 0.5) * 20);
    dummy.rotation.set(-Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    rings.setMatrixAt(i, dummy.matrix);
  }
  b.group.add(rings);
  const dripCount = software ? 12 : 40,
    tips = new Float32Array(dripCount * 3),
    dripGeo = new THREE.SphereGeometry(0.014, 4, 4),
    tipAttribute = new THREE.InstancedBufferAttribute(tips, 3);
  dripGeo.setAttribute("aTip", tipAttribute);
  const dripPhase = new Float32Array(dripCount);
  for (let i = 0; i < dripCount; i++) dripPhase[i] = i / dripCount;
  dripGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(dripPhase, 1),
  );
  const drip = b.shader(
    "attribute vec3 aTip;attribute float aPhase;uniform float uRain;uniform vec3 uTint;",
    "float age=fract(uTime*.72+aPhase);transformed+=aTip;transformed.y-=age*age*4.5;",
    "if(vWorld.y< -2.42)discard;color=uTint;alpha=uRain*.7;",
    { uRain: uniforms.uRain, uTint: uniforms.uTint },
  );
  const drips = new THREE.InstancedMesh(dripGeo, drip, dripCount);
  for (let i = 0; i < dripCount; i++) drips.setMatrixAt(i, identity);
  drips.frustumCulled = false;
  b.group.add(drips);
  Object.assign(b.counts, {
    rain: count,
    ripples: rippleCount,
    drips: dripCount,
  });
  const warm = new THREE.Color("#B8923A");
  return {
    setTips(source: Float32Array) {
      for (let i = 0; i < dripCount; i++) {
        const index = Math.floor((i * 40) / dripCount) * 3;
        tips[i * 3] = source[index] - b.group.position.x;
        tips[i * 3 + 1] = source[index + 1];
        tips[i * 3 + 2] = source[index + 2] - b.group.position.z;
      }
      tipAttribute.needsUpdate = true;
    },
    update(f: WorldFrame) {
      uniforms.uRain.value = f.rain;
      uniforms.uGustAge.value = f.gustAge;
      uniforms.uGustOrigin.value.copy(f.gustOrigin).sub(b.group.position);
      uniforms.uPointerWorld.value.copy(f.pointer);
      uniforms.uTint.value.set("#F4ECDD").lerp(warm, (1 - f.day.value) * 0.4);
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/renderer.ts">
<![CDATA[import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import type { Atmosphere } from "../logic/atmosphere";
import type { StageRect } from "./director";
export const isSoftwareGL = (name: string) =>
  /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(name);
export function createWorldRenderer(host: HTMLElement, onLost: () => void) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  const gl = renderer.getContext(),
    ext = gl.getExtension("WEBGL_debug_renderer_info");
  const gpu = ext
    ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
    : "Software";
  const software = isSoftwareGL(gpu);
  renderer.setPixelRatio(software ? 0.85 : Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = !software;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.info.autoReset = false;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#F4ECDD");
  scene.fog = new THREE.FogExp2("#F4ECDD", 0.012);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.025, 180);
  const key = new THREE.DirectionalLight("#F4ECDD", 3);
  key.castShadow = !software;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {
    left: -4.5,
    right: 4.5,
    top: 4.5,
    bottom: -4.5,
    near: 0.1,
    far: 28,
  });
  key.shadow.normalBias = 0.018;
  key.shadow.bias = -0.0001;
  const hemi = new THREE.HemisphereLight("#F4ECDD", "#B8923A", 0.8),
    rim = new THREE.DirectionalLight("#F2B8C6", 1),
    accent = new THREE.PointLight("#B8923A", 2, 15, 2);
  scene.add(key, key.target, hemi, rim, accent);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color("#2B3A55");
  const envGeo = new THREE.BoxGeometry(1, 1, 1),
    envMat = new THREE.MeshBasicMaterial({ color: "#F4ECDD" });
  for (let i = 0; i < 3; i++) {
    const panel = new THREE.Mesh(envGeo, envMat);
    panel.position.set(i ? 4 : -4, 3, i === 2 ? -4 : 1);
    panel.scale.set(3, 5, 2);
    envScene.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer),
    environment = pmrem.fromScene(envScene, 0.1);
  scene.environment = environment.texture;
  pmrem.dispose();
  envGeo.dispose();
  envMat.dispose();
  let composer: EffectComposer | null = null,
    bloom: UnrealBloomPass | null = null,
    cinematic: ShaderPass | null = null;
  if (!software) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.4, 0.92);
    composer.addPass(bloom);
    cinematic = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uInspectStrength: { value: 0 },
        uPaperLit: { value: 1 },
        uVignette: { value: 0.1 },
        uGrain: { value: 0.018 },
        uLensBlur: { value: 0.0022 },
        uFocus: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader:
        "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
      fragmentShader: `uniform sampler2D tDiffuse;uniform float uTime,uInspectStrength,uPaperLit,uVignette,uGrain,uLensBlur;uniform vec2 uFocus;varying vec2 vUv;
   void main(){float dist=length(vUv-uFocus);float r=smoothstep(.22,.68,dist)*(uLensBlur+uInspectStrength*.0032);vec3 c=texture2D(tDiffuse,vUv).rgb*.4;
   c+=(texture2D(tDiffuse,vUv+vec2(r,0.)).rgb+texture2D(tDiffuse,vUv-vec2(r,0.)).rgb+texture2D(tDiffuse,vUv+vec2(0.,r)).rgb+texture2D(tDiffuse,vUv-vec2(0.,r)).rgb)*.15;
   c*=1.-smoothstep(.20,.65,dist)*uInspectStrength*mix(.52,.08,uPaperLit);c*=1.-smoothstep(.25,.8,dist)*uVignette;
   float n=fract(sin(dot(vUv+uTime*.001,vec2(12.9898,78.233)))*43758.5453)-.5;c+=n*uGrain;c=c/(1.+max(c-vec3(1.2),vec3(0.))*.12);gl_FragColor=vec4(max(c,vec3(0.)),1.);}`,
    });
    composer.addPass(cinematic);
    composer.addPass(new OutputPass());
  }
  const lost = (e: Event) => {
    e.preventDefault();
    onLost();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  let width = 1,
    height = 1;
  return {
    renderer,
    scene,
    camera,
    software,
    gpu,
    key,
    hemi,
    rim,
    resize(w: number, h: number) {
      width = w;
      height = h;
      renderer.setSize(w, h, false);
      composer?.setSize(w, h);
    },
    projectSlot(rect: StageRect) {
      camera.setViewOffset(
        rect.width,
        rect.height,
        -rect.left,
        -rect.top,
        width,
        height,
      );
      cinematic?.uniforms.uFocus.value.set(
        (rect.left + rect.width / 2) / width,
        1 - (rect.top + rect.height / 2) / height,
      );
    },
    apply(a: Atmosphere, elapsed: number, inspect: number, paperLit: number) {
      (scene.background as THREE.Color).fromArray(a.background);
      const fog = scene.fog as THREE.FogExp2;
      fog.color.fromArray(a.fogColor);
      fog.density = a.fogDensity;
      renderer.toneMappingExposure = a.exposure;
      scene.environmentIntensity = a.envIntensity;
      key.color.fromArray(a.key.color);
      key.intensity = a.key.intensity;
      key.position.fromArray(a.key.position);
      key.target.position.fromArray(a.key.target);
      hemi.color.fromArray(a.hemi.sky);
      hemi.groundColor.fromArray(a.hemi.ground);
      hemi.intensity = a.hemi.intensity;
      rim.color.fromArray(a.rim.color);
      rim.intensity = a.rim.intensity;
      rim.position.fromArray(a.rim.position);
      accent.color.fromArray(a.accent.color);
      accent.intensity = a.accent.intensity;
      accent.position.fromArray(a.accent.position);
      if (bloom) bloom.strength = a.bloomStrength;
      if (cinematic) {
        const u = cinematic.uniforms;
        u.uTime.value = elapsed;
        u.uInspectStrength.value = inspect;
        u.uPaperLit.value = paperLit;
        u.uVignette.value = a.vignette;
        u.uGrain.value = a.grain;
        u.uLensBlur.value = a.lensBlur;
      }
    },
    render() {
      renderer.info.reset();
      if (composer) composer.render();
      else renderer.render(scene, camera);
    },
    warm() {
      if (!software) renderer.compile(scene, camera);
    },
    dispose() {
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      composer?.passes.forEach((p) => p.dispose());
      composer?.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/scroll.ts">
<![CDATA[import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  WORLD_CHAPTERS,
  getNearestChapterSnapProgress,
  getNextChapterProgress,
} from "../logic/chapters";
import { clamp01 } from "../logic/rng";
export type ScrollController = {
  raf: (now: number) => void;
  scrollToProgress: (p: number, immediate?: boolean) => void;
  stepChapter: (direction: 1 | -1) => void;
  setScrollPaused: (paused: boolean) => void;
  dispose: () => void;
};
declare global {
  interface Window {
    __amaotoScrollTo?: (p: number) => void;
  }
}
export function createScrollController(
  track: HTMLElement,
  onProgress: (p: number) => void,
): ScrollController {
  gsap.registerPlugin(ScrollTrigger);
  let disposed = false,
    paused = false,
    programmatic = false,
    touching = false,
    progress = 0,
    idle: ReturnType<typeof setTimeout> | undefined,
    release: ReturnType<typeof setTimeout> | undefined;
  const savedOverflow = document.documentElement.style.overflow;
  const lenis = matchMedia("(pointer:fine)").matches
    ? new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })
    : null;
  const proxy = { progress: 0 };
  const timeline = gsap.timeline({ paused: true }).to(proxy, {
    progress: 1,
    duration: 1,
    ease: "none",
    onUpdate: () => {
      progress = clamp01(proxy.progress);
      onProgress(progress);
    },
  });
  const trigger = ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (s) => {
      if (!paused) timeline.progress(s.progress);
    },
  });
  const max = () => Math.max(1, track.offsetHeight - innerHeight);
  const set = (p: number, immediate = false) => {
    p = clamp01(p);
    programmatic = true;
    clearTimeout(release);
    clearTimeout(idle);
    const y = p * max();
    if (immediate) {
      progress = p;
      lenis?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo({ top: y, behavior: "instant" });
      timeline.progress(p);
      onProgress(p);
      ScrollTrigger.update();
      programmatic = false;
    } else {
      if (lenis)
        lenis.scrollTo(y, {
          duration: 1.05,
          force: true,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      else window.scrollTo({ top: y, behavior: "smooth" });
      release = setTimeout(() => {
        programmatic = false;
      }, 1200);
    }
  };
  const busy = () =>
    Boolean(
      document.activeElement?.matches(
        "input,textarea,select,button,[contenteditable=true]",
      ),
    );
  const schedule = () => {
    clearTimeout(idle);
    idle = setTimeout(() => {
      if (disposed || paused || programmatic || touching || busy()) return;
      const nearest = getNearestChapterSnapProgress(progress);
      if (Math.abs(nearest - progress) > 0.008) set(nearest);
    }, 900);
  };
  const scroll = () => {
    if (disposed || paused) return;
    ScrollTrigger.update();
    const p = clamp01(window.scrollY / max());
    timeline.progress(p);
    if (!paused) schedule();
  };
  const down = () => {
    touching = true;
    clearTimeout(idle);
  };
  const up = () => {
    touching = false;
    schedule();
  };
  const key = (e: KeyboardEvent) => {
    if (
      e.defaultPrevented ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      paused ||
      (e.target instanceof Element &&
        e.target.closest("input,textarea,select,button,[contenteditable=true]"))
    )
      return;
    if (/^[1-6]$/.test(e.key)) {
      e.preventDefault();
      set(WORLD_CHAPTERS[Number(e.key) - 1].restProgress);
    } else if (
      ["ArrowDown", "ArrowRight", " ", "ArrowUp", "ArrowLeft"].includes(e.key)
    ) {
      e.preventDefault();
      set(
        getNextChapterProgress(
          progress,
          e.key === "ArrowUp" || e.key === "ArrowLeft" || e.shiftKey ? -1 : 1,
        ),
      );
    }
  };
  const resize = () => {
    // Refresh emits progress for the new viewport; retain the authored step first.
    const heldProgress = progress;
    lenis?.resize();
    ScrollTrigger.refresh();
    set(heldProgress, true);
  };
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("keydown", key);
  window.addEventListener("touchstart", down, { passive: true });
  window.addEventListener("touchend", up, { passive: true });
  window.addEventListener("touchcancel", up, { passive: true });
  window.addEventListener("resize", resize);
  const hook = (p: number) => set(p, true);
  window.__amaotoScrollTo = hook;
  const hash = WORLD_CHAPTERS.find((c) => `#${c.id}` === location.hash);
  set(hash?.restProgress ?? 0, true);
  return {
    raf: (now) => lenis?.raf(now),
    scrollToProgress: set,
    stepChapter: (direction) =>
      set(getNextChapterProgress(progress, direction)),
    setScrollPaused(value) {
      const wasPaused = paused;
      paused = value;
      clearTimeout(idle);
      document.documentElement.style.overflow = value
        ? "hidden"
        : savedOverflow;
      if (value) lenis?.stop();
      else {
        lenis?.start();
        if (wasPaused) set(progress, true);
      }
    },
    dispose() {
      disposed = true;
      clearTimeout(idle);
      clearTimeout(release);
      trigger.kill();
      timeline.kill();
      lenis?.destroy();
      document.documentElement.style.overflow = savedOverflow;
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", down);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
      window.removeEventListener("resize", resize);
      if (window.__amaotoScrollTo === hook) delete window.__amaotoScrollTo;
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/ScrollDirector.tsx">
<![CDATA["use client";
import { paperLitAt } from "../logic/atmosphere";
import { computeTimeOfDay } from "../logic/timeOfDay";
import { useEffect, type RefObject } from "react";
import {
  getChapterStateAtProgress,
  computeCameraPoseAtProgress,
  type ChapterProgressState,
} from "../logic/chapters";
import { smoothstep } from "../logic/rng";
import { worldStageRect, stageTier } from "./staging";
import type { DirectorState } from "./director";
import { createScrollController, type ScrollController } from "./scroll";
import { MAKING_PARTS } from "./makingSequence";
export function ScrollDirector({
  directorRef,
  onChapter,
  enabled = false,
  controlsRef,
  onState,
}: {
  directorRef: RefObject<DirectorState>;
  onChapter: (n: number) => void;
  enabled?: boolean;
  controlsRef?: RefObject<ScrollController | null>;
  onState?: (s: ChapterProgressState) => void;
}) {
  useEffect(() => {
    if (!enabled) return;
    const page = document.querySelector<HTMLElement>(".am-page"),
      track = document.querySelector<HTMLElement>(".am-world-track");
    if (!page || !track) return;
    const panels = [...page.querySelectorAll<HTMLElement>(":scope > section")];
    let last = -1,
      lastSync = 0,
      trailingSync: ReturnType<typeof setTimeout> | undefined;
    const controller = createScrollController(track, (p) => {
      const world = getChapterStateAtProgress(p),
        camera = computeCameraPoseAtProgress(p),
        index = world.activeChapterIndex,
        rect = worldStageRect(p, innerWidth, innerHeight),
        step = Math.min(9, Math.floor(world.benchAssembly * 10));
      Object.assign(directorRef.current, {
        world,
        fov: camera.fov,
        focusDistance: camera.focusDistance,
        progress: p,
        chapter: index,
        local:
          (p - world.activeChapter.startProgress) /
          Math.max(
            0.001,
            world.activeChapter.endProgress - world.activeChapter.startProgress,
          ),
        rect,
        camera: camera.position,
        target: camera.target,
        position: world.anchor,
        rotation: [0, 0, world.genkanSettle * -0.28],
        scale: 1,
        open: world.open,
        explode: world.worldVisibility.bench * (1 - world.benchAssembly) * 0.9,
        rain: world.rainIntensity,
        highlight: index === 4 ? MAKING_PARTS[step] : null,
        reduced: false,
        ready: true,
        interrupted: p > 0,
      });
      page.dataset.chapter = page.dataset.activeChapter = String(index);
      page.dataset.subRest = world.subRest ?? "none";
      page.dataset.paperLit = String(
        paperLitAt(world, computeTimeOfDay(directorRef.current.timeOfDay)) >
          0.45,
      );
      page.dataset.stageTier = stageTier(innerWidth);
      page.style.setProperty("--scroll-progress", String(p));
      panels.forEach((el, i) => {
        const opacity = smoothstep(0.5, 1, world.chapterOpacities[i] ?? 0);
        el.style.setProperty("--chapter-opacity", String(opacity));
        el.style.setProperty("--chapter-rise", `${(1 - opacity) * 105}%`);
        el.inert = opacity < 0.2;
        el.setAttribute("aria-hidden", String(opacity < 0.2));
      });
      if (index !== last) {
        clearTimeout(trailingSync);
        last = index;
        onChapter(index);
        onState?.(world);
        lastSync = performance.now();
      } else if (performance.now() - lastSync > 60) {
        clearTimeout(trailingSync);
        onState?.(world);
        lastSync = performance.now();
      } else {
        // A final scrub/resize value must reach React even after input stops.
        clearTimeout(trailingSync);
        trailingSync = setTimeout(
          () => {
            onState?.(world);
            lastSync = performance.now();
          },
          Math.max(0, 60 - (performance.now() - lastSync)),
        );
      }
    });
    if (controlsRef) controlsRef.current = controller;
    return () => {
      clearTimeout(trailingSync);
      controller.dispose();
      if (controlsRef) controlsRef.current = null;
      panels.forEach((el) => {
        el.inert = false;
        el.removeAttribute("aria-hidden");
        el.style.removeProperty("--chapter-opacity");
        el.style.removeProperty("--chapter-rise");
      });
    };
  }, [enabled, directorRef, onChapter, controlsRef, onState]);
  return null;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/staging.ts">
<![CDATA[import type { StageRect } from "./director";
import { WORLD_CHAPTERS } from "../logic/chapters";
/** Full-viewport worlds use these as virtual object windows, never canvas crops. */
export function worldStageRect(
  progress: number,
  width: number,
  height: number,
): StageRect {
  const slot = (index: number): StageRect => {
    if (width <= 900) {
      const b = bandLayout(width, height, index, false);
      return {
        left: 12,
        top: b.top,
        width: width - 24,
        height:
          index === 2 ? height * 0.48 : index === 5 ? height * 0.3 : b.height,
      };
    }
    if (index === 2) return { left: 0, top: 0, width, height };
    return {
      left: index === 0 || index === 3 ? width * 0.51 : 0,
      top: height * 0.11,
      width: width * (index === 1 ? 0.56 : 0.48),
      height: height * (index === 1 ? 0.65 : 0.8),
    };
  };
  let index = 0;
  for (let i = 1; i < WORLD_CHAPTERS.length; i++)
    if (progress >= WORLD_CHAPTERS[i].startProgress) index = i;
  for (let i = 1; i < WORLD_CHAPTERS.length; i++) {
    const boundary = WORLD_CHAPTERS[i].startProgress;
    if (progress >= boundary - 0.015 && progress <= boundary + 0.015) {
      const t = ease((progress - boundary + 0.015) / 0.03);
      return mixRect(slot(i - 1), slot(i), t);
    }
  }
  return slot(index);
}
export type StageTier = "phone" | "tablet" | "compact" | "desktop";
export function stageTier(width: number): StageTier {
  return width <= 600
    ? "phone"
    : width <= 900
      ? "tablet"
      : width <= 1180
        ? "compact"
        : "desktop";
}
export function bandLayout(
  width: number,
  height: number,
  chapter: number,
  pinned = false,
) {
  const tablet = stageTier(width) === "tablet";
  const fraction =
    chapter === 1
      ? tablet
        ? 0.42
        : 0.3
      : chapter === 4 && pinned
        ? tablet
          ? 0.34
          : 0.23
        : tablet
          ? 0.5
          : 0.36;
  const top = chapter === 4 && pinned ? 64 : 70;
  return {
    top,
    height: height * fraction,
    bottom: top + height * fraction + (chapter === 1 ? 154 : 30),
  };
}
export function overlaps(a: StageRect, b: StageRect) {
  return (
    a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.top + a.height > b.top
  );
}
const clamp = (value: number, low = 0, high = 1) =>
  Math.max(low, Math.min(high, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRect = (a: StageRect, b: StageRect, t: number): StageRect => ({
  left: mix(a.left, b.left, t),
  top: mix(a.top, b.top, t),
  width: mix(a.width, b.width, t),
  height: mix(a.height, b.height, t),
});
export type StageJourney = {
  start: number;
  end: number;
  outgoingBottom: number;
  incomingTop: number;
  crosses: boolean;
};
/** Document-space copy bounds define the open corridor between chapters. */
export function planStageJourney(
  current: StageRect,
  next: StageRect,
  outgoing: StageRect[],
  incoming: StageRect[],
  start: number,
  end: number,
  viewportHeight: number,
): StageJourney {
  const outgoingBottom = Math.max(
    start,
    ...outgoing.map((r) => r.top + r.height),
  );
  const incomingTop = Math.min(
    end + viewportHeight,
    ...incoming.map((r) => r.top),
  );
  const first = incomingTop - current.top - current.height - 24;
  const last = outgoingBottom - next.top + 24;
  return {
    start: clamp(first - viewportHeight * 0.2, start, end - 1),
    end: clamp(last + viewportHeight * 0.2, start + 1, end),
    outgoingBottom,
    incomingTop,
    crosses:
      Math.abs(current.left + current.width / 2 - next.left - next.width / 2) >
      Math.min(current.width, next.width) * 0.7,
  };
}
/** Resize a same-side slot before approaching copy reaches its vertical span. */
function fitAlongside(
  rect: StageRect,
  obstacles: StageRect[],
  extraHeight: number,
) {
  let left = rect.left,
    right = rect.left + rect.width;
  const center = (left + right) / 2;
  for (const block of obstacles) {
    const gap = Math.max(
      block.top - rect.top - rect.height - extraHeight,
      rect.top - block.top - block.height,
    );
    const influence = 1 - ease(gap / 96);
    if (block.left >= center) {
      right = Math.min(
        right,
        mix(
          rect.left + rect.width,
          Math.max(rect.left + 1, block.left - 24),
          influence,
        ),
      );
    } else if (block.left + block.width <= center) {
      left = Math.max(
        left,
        mix(
          rect.left,
          Math.min(right - 1, block.left + block.width + 24),
          influence,
        ),
      );
    }
  }
  return { ...rect, left, width: Math.max(1, right - left) };
}
/** Reduced motion chooses a clear reserved slot immediately, without a travel path. */
function stillSlot(
  current: StageRect,
  next: StageRect,
  obstacles: StageRect[],
  extraHeight: number,
) {
  const clear = (rect: StageRect) =>
    !obstacles.some((block) =>
      overlaps({ ...rect, height: rect.height + extraHeight }, block),
    );
  if (clear(current)) return current;
  if (clear(next)) return next;
  let gaps = [{ top: current.top, bottom: current.top + current.height }];
  for (const block of obstacles) {
    if (
      block.left >= current.left + current.width ||
      block.left + block.width <= current.left
    )
      continue;
    gaps = gaps
      .flatMap((gap) => [
        {
          top: gap.top,
          bottom: Math.min(gap.bottom, block.top - 24 - extraHeight),
        },
        {
          top: Math.max(gap.top, block.top + block.height + 24),
          bottom: gap.bottom,
        },
      ])
      .filter((gap) => gap.bottom > gap.top);
  }
  const gap = gaps.sort((a, b) => b.bottom - b.top - (a.bottom - a.top))[0];
  return gap
    ? { ...current, top: gap.top, height: gap.bottom - gap.top }
    : current;
}
/** One opaque object glides through the empty space between readable columns. */
export function stageHandoff(
  current: StageRect,
  next: StageRect,
  progress: number,
  obstacles: StageRect[],
  reduced: boolean,
  stacked: boolean,
  extraHeight = 0,
  journey?: StageJourney,
  scroll = 0,
  viewportHeight = 900,
) {
  if (reduced)
    return {
      rect: stacked
        ? current
        : stillSlot(current, next, obstacles, extraHeight),
    };
  if (stacked) return { rect: mixRect(current, next, clamp(progress)) };
  if (!journey?.crosses) {
    return {
      rect: fitAlongside(
        mixRect(current, next, clamp(progress)),
        obstacles,
        extraHeight,
      ),
    };
  }
  const t = clamp(
    (scroll - journey.start) / Math.max(1, journey.end - journey.start),
  );
  if (t === 0) return { rect: current };
  if (t === 1) return { rect: next };
  const ceiling = Math.min(
    viewportHeight - 24,
    journey.incomingTop - scroll - 24,
  );
  const floor = Math.max(56, journey.outgoingBottom - scroll + 24);
  const height = Math.max(
    1,
    Math.min(
      ceiling - floor,
      current.height * 0.55,
      next.height * 0.55,
      viewportHeight * 0.36,
    ),
  );
  const across = ease((t - 0.32) / 0.36);
  const width = Math.min(
    current.width,
    next.width,
    height *
      mix(current.width / current.height, next.width / next.height, across),
  );
  const center = mix(
    current.left + current.width / 2,
    next.left + next.width / 2,
    across,
  );
  const small = {
    left: center - width / 2,
    top: clamp(
      (journey.outgoingBottom + journey.incomingTop) / 2 - scroll - height / 2,
      floor,
      Math.max(floor, ceiling - height),
    ),
    width,
    height,
  };
  if (t < 0.32) {
    const rect = mixRect(current, small, ease(t / 0.32));
    // The outgoing column remains beside us; the incoming column approaches below.
    const bottom = Math.min(
      rect.top + rect.height,
      journey.incomingTop - scroll - 24,
    );
    return { rect: { ...rect, height: Math.max(1, bottom - rect.top) } };
  }
  if (t > 0.68) {
    const rect = mixRect(small, next, ease((t - 0.68) / 0.32));
    const top = Math.max(rect.top, journey.outgoingBottom - scroll + 24);
    return {
      rect: { ...rect, top, height: Math.max(1, rect.top + rect.height - top) },
    };
  }
  return { rect: small };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/textures.ts">
<![CDATA[import * as THREE from "three";
import { createSeededRandom } from "../logic/rng";
export function createWorldTextures() {
  const maps: Record<string, THREE.CanvasTexture> = {};
  const make = (
    name: string,
    w: number,
    h: number,
    color: boolean,
    draw: (c: CanvasRenderingContext2D, r: () => number) => void,
  ) => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const c = canvas.getContext("2d");
    if (!c) throw Error("Canvas texture generation is unavailable");
    draw(c, createSeededRandom(481 + name.length * 71));
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    maps[name] = t;
    return t;
  };
  const washi = (
    c: CanvasRenderingContext2D,
    r: () => number,
    w: number,
    h: number,
    data = false,
  ) => {
    c.fillStyle = data ? "rgb(190,190,190)" : "#F4ECDD";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 2200; i++) {
      const x = r() * w,
        y = r() * h;
      c.strokeStyle = data
        ? `rgb(${100 + r() * 150},${100 + r() * 150},${100 + r() * 150})`
        : "#B8923A";
      c.globalAlpha = 0.025 + r() * 0.09;
      c.lineWidth = 0.3 + r();
      c.beginPath();
      c.moveTo(x, y);
      c.bezierCurveTo(
        x + 20,
        y - 10,
        x + 45,
        y + 15,
        x + 60 + r() * 100,
        y + r() * 12,
      );
      c.stroke();
    }
    c.globalAlpha = 0.06;
    for (let y = 0; y < h; y += 8) c.fillRect(0, y, w, 0.5);
    c.globalAlpha = 1;
  };
  make("washiColor", 1024, 1024, true, (c, r) => washi(c, r, 1024, 1024));
  make("washiBump", 1024, 1024, false, (c, r) => washi(c, r, 1024, 1024, true));
  make("washiTransmission", 512, 512, false, (c, r) =>
    washi(c, r, 512, 512, true),
  );
  for (const data of [false, true])
    make(data ? "bambooBump" : "bambooColor", 512, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(150,150,150)" : "#B8923A";
      c.fillRect(0, 0, 512, 1024);
      for (let i = 0; i < 1300; i++) {
        c.globalAlpha = 0.03 + r() * 0.15;
        c.strokeStyle = data ? "rgb(55,55,55)" : "#1A1613";
        const x = r() * 512;
        c.beginPath();
        c.moveTo(x, 0);
        c.bezierCurveTo(x + 8, 300, x - 6, 700, x + 4, 1024);
        c.stroke();
      }
      c.globalAlpha = 0.3;
      for (let y = 190; y < 1024; y += 250) {
        c.fillRect(0, y, 512, 5);
        c.globalAlpha = 0.1;
        c.fillRect(0, y + 6, 512, 16);
        c.globalAlpha = 0.3;
      }
      c.globalAlpha = 1;
    });
  for (const data of [false, true])
    make(data ? "woodBump" : "woodFloorColor", 1024, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(145,145,145)" : "#B8923A";
      c.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 4000; i++) {
        c.globalAlpha = 0.03 + r() * 0.08;
        c.strokeStyle = data ? "rgb(40,40,40)" : "#1A1613";
        const y = r() * 1024;
        c.beginPath();
        c.moveTo(0, y);
        c.bezierCurveTo(350, y + r() * 20, 650, y - r() * 10, 1024, y);
        c.stroke();
      }
      c.globalAlpha = 0.4;
      for (let y = 0; y < 1024; y += 128) c.fillRect(0, y, 1024, 3);
      for (let y = 0; y < 1024; y += 128)
        c.fillRect((Math.floor(y / 128) % 3) * 340, y, 3, 128);
      c.globalAlpha = 1;
    });
  for (const data of [false, true])
    make(data ? "tatamiBump" : "tatamiColor", 512, 512, !data, (c) => {
      c.fillStyle = data ? "rgb(160,160,160)" : "#B8923A";
      c.fillRect(0, 0, 512, 512);
      c.fillStyle = data ? "rgb(90,90,90)" : "#F4ECDD";
      c.globalAlpha = 0.24;
      for (let y = 0; y < 512; y += 4)
        for (let x = 0; x < 512; x += 8) c.fillRect(x + (y % 8), y, 6, 2);
      c.globalAlpha = 1;
      c.fillStyle = data ? "rgb(70,70,70)" : "#2B3A55";
      c.fillRect(0, 0, 26, 512);
    });
  make("silkThread", 256, 256, true, (c) => {
    c.fillStyle = "#1A1613";
    c.fillRect(0, 0, 256, 256);
    c.strokeStyle = "#B8923A";
    c.globalAlpha = 0.3;
    for (let x = -256; x < 512; x += 9) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x + 256, 256);
      c.stroke();
    }
  });
  make("lacquerRoughness", 256, 256, false, (c, r) => {
    for (let i = 0; i < 4096; i++) {
      const n = 90 + r() * 80;
      c.fillStyle = `rgb(${n},${n},${n})`;
      c.fillRect((i % 64) * 4, Math.floor(i / 64) * 4, 4, 4);
    }
  });
  make("moteSprite", 64, 64, true, (c) => {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "#F4ECDD");
    g.addColorStop(1, "rgba(244,236,221,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  });
  make("rainStreak", 1, 32, true, (c) => {
    const g = c.createLinearGradient(0, 0, 0, 32);
    g.addColorStop(0, "rgba(244,236,221,0)");
    g.addColorStop(0.65, "#F4ECDD");
    g.addColorStop(1, "rgba(244,236,221,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, 1, 32);
  });
  for (const data of [false, true])
    make(data ? "cobbleBump" : "cobbleColor", 1024, 1024, !data, (c, r) => {
      c.fillStyle = data ? "rgb(45,45,45)" : "#1A1613";
      c.fillRect(0, 0, 1024, 1024);
      for (let row = 0; row < 24; row++)
        for (let col = -1; col < 16; col++) {
          const n = 0.28 + r() * 0.4;
          c.globalAlpha = data ? 1 : n;
          c.fillStyle = data
            ? `rgb(${110 + n * 100},${110 + n * 100},${110 + n * 100})`
            : "#2B3A55";
          c.beginPath();
          c.roundRect(
            col * 70 + (row % 2) * 35 + 3,
            row * 44 + 3,
            64,
            38,
            5 + r() * 4,
          );
          c.fill();
        }
      c.globalAlpha = 1;
    });
  return {
    maps,
    dispose() {
      Object.values(maps).forEach((t) => t.dispose());
    },
  };
}
export type WorldTextures = ReturnType<typeof createWorldTextures>;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/WagasaCanvas.tsx">
<![CDATA["use client";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { createWorldRenderer } from "./renderer";
import { computeTimeOfDay } from "../logic/timeOfDay";
import { atmosphereAtProgress } from "../logic/atmosphere";
import { type Tool } from "../logic/chapters";
import { worldStageRect } from "./staging";
import type { ScrollController } from "./scroll";
import { type InspectState } from "../logic/inspect";
import { createInspectController } from "./inspectController";
import { createWorldTextures } from "./textures";
import { createWorlds } from "./worlds";
import type { WorldFrame } from "./worlds/shared";
import { installCanopyEffects } from "./canopyEffects";
import {
  createWagasaModel,
  type WagasaRuntime,
} from "../model/createWagasaModel";
import { type Motif } from "../model/materials";
import { ribPoint } from "../model/rig";
import type { DirectorState } from "./director";
import { PARTS } from "../data/parts";
import { fitUmbrellaCamera, fitsWholeUmbrella } from "./framing";
import {
  INSPECTION,
  inspectionDistance,
  projectedRunnerOpen,
  sampleDemonstration,
  type AnatomyState,
  type PartId,
} from "./anatomy";
type Props = {
  director: RefObject<DirectorState>;
  onPart: (id: string, index?: number) => void;
  hovered?: PartId;
  anatomy: AnatomyState;
  onActionFinish: (id: number) => void;
  sun: number;
  dyeOrigin: [number, number];
  rain: boolean;
  colour: string;
  motif: Motif;
  closed: boolean;
  timeOfDay: number;
  controls: RefObject<ScrollController | null>;
  inspection: RefObject<InspectState>;
  tool: Tool;
  onReady: () => void;
  onFallback: () => void;
};
export function WagasaCanvas(props: Props) {
  const host = useRef<HTMLDivElement>(null),
    values = useRef(props);
  useEffect(() => {
    values.current = props;
  });
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    element.style.opacity = "1";
    element.style.pointerEvents = "auto";
    const inspector = document.querySelector<HTMLElement>(
      "[data-inspector-overlay]",
    );
    if (inspector) {
      inspector.style.removeProperty("opacity");
      inspector.style.removeProperty("visibility");
    }
    let cinematic: ReturnType<typeof createWorldRenderer>;
    try {
      cinematic = createWorldRenderer(element, () => {
        element.dataset.fallback = "true";
        values.current.onFallback();
      });
    } catch {
      element.dataset.fallback = "true";
      values.current.onFallback();
      return;
    }
    const { renderer, scene, camera } = cinematic;
    const inspectorController = createInspectController(
      element,
      renderer.domElement,
      values.current.inspection,
      camera,
    );
    const textures = createWorldTextures(),
      worlds = createWorlds(textures, cinematic.software);
    worlds.forEach((w) => scene.add(w.group));
    element.dataset.worldCounts = JSON.stringify(
      worlds.map((w) => ({ world: w.name, ...w.counts })),
    );
    const timer = new THREE.Timer();
    timer.connect(document);
    const worldFrame: WorldFrame = {
      state: values.current.director.current.world,
      day: computeTimeOfDay(0.75),
      elapsedSec: 0,
      visibility: 0,
      rain: 0,
      gustAge: 100,
      gustOrigin: new THREE.Vector3(),
      pointer: new THREE.Vector3(1000, 0, 1000),
      colour: new THREE.Color(values.current.colour),
    };
    const tipData = new Float32Array(120),
      tipPoint = new THREE.Vector3(),
      groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.42),
      groundPoint = new THREE.Vector3();
    let gustStart = -100,
      gustCount = 0,
      lastRender = performance.now(),
      lastTipPose = "";
    let dayCache = computeTimeOfDay(0.75),
      atmosphereCache = atmosphereAtProgress(worldFrame.state, dayCache, 0),
      lastAtmoProgress = -1,
      lastAtmoTime = -1,
      lastAtmoRain = false;
    const tipWorld = worlds.find((w) => w.setTips);
    if (!values.current.director.current.ready)
      values.current.director.current.rect = worldStageRect(
        0,
        innerWidth,
        innerHeight,
      );
    Object.assign(element.style, {
      left: "0px",
      top: "0px",
      width: "100vw",
      height: "100svh",
    });
    element.dataset.quality = cinematic.software ? "software" : "hardware";
    const model = createWagasaModel({
      open: 0,
      canopyColor: values.current.colour,
      motif: values.current.motif,
    });
    scene.add(model);
    const canopyEffects = installCanopyEffects(model, textures);
    const rig = model.userData.sculptRuntime as WagasaRuntime;
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.ShadowMaterial({ opacity: 0.15, color: "#1A1613" }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    ground.receiveShadow = true;
    scene.add(ground);
    const reflection = model.clone(true);
    const reflectionMaterials: THREE.Material[] = [];
    reflection.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = (child.material as THREE.Material).clone();
        mat.onBeforeCompile = (
          child.material as THREE.Material
        ).onBeforeCompile;
        mat.transparent = true;
        mat.opacity = 0.07;
        mat.depthWrite = false;
        child.material = mat;
        child.castShadow = false;
        reflectionMaterials.push(mat);
      }
    });
    scene.add(reflection);
    const dummy = new THREE.Object3D(),
      raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      look = new THREE.Vector3(0, 0.2, 0),
      wantedLook = new THREE.Vector3(),
      wantedCamera = new THREE.Vector3(),
      storyCamera = new THREE.Vector3(),
      storyLook = new THREE.Vector3();
    let lastCanopy = `${values.current.colour}:${values.current.motif}`,
      lastHighlight: string | null = null,
      spin = 0,
      velocity = 0,
      dragging = false,
      dragged = false,
      startX = 0,
      startY = 0,
      pointerId: number | null = null,
      lastX = 0,
      parallaxX = 0,
      parallaxY = 0,
      targetParallaxX = 0,
      targetParallaxY = 0,
      downPart: string | undefined;
    let frame = 0,
      lastSignature = "",
      lastCounter = -1,
      rainLevel = 0,
      lastRect = "",
      lastViewId = -1,
      lastScene = -1,
      actionId = -1,
      actionStart = 0,
      finishedAction = -1,
      revealAmount = 0,
      inspectStrength = 0;
    let dragTrack: {
      closed: { x: number; y: number };
      opened: { x: number; y: number };
    } | null = null;
    const toScreen = (point: THREE.Vector3) => {
      const projected = point.project(camera),
        r = element.getBoundingClientRect();
      return {
        x: r.left + (projected.x * 0.5 + 0.5) * r.width,
        y: r.top + (-projected.y * 0.5 + 0.5) * r.height,
        z: projected.z,
      };
    };
    const hitAt = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      return raycaster
        .intersectObjects(model.children, true)
        .find(
          (hit) =>
            hit.object.userData.partId &&
            (hit.object.userData.partId !== "canopy" ||
              !hit.uv ||
              rig.paperVisible(hit.uv.x)),
        );
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" && values.current.tool !== "anatomy")
        return;
      const hit = hitAt(event);
      if (raycaster.ray.intersectPlane(groundPlane, groundPoint))
        worldFrame.pointer.copy(groundPoint);
      const id = hit?.object.userData.partId as string | undefined;
      element.style.cursor =
        id === "runner" ? "ns-resize" : id ? "grab" : "default";
      if (dragging) {
        if (Math.hypot(event.clientX - startX, event.clientY - startY) > 4)
          dragged = true;
        if (
          downPart === "runner" &&
          values.current.director.current.chapter === 1 &&
          dragTrack
        ) {
          const value = projectedRunnerOpen(
            { x: event.clientX, y: event.clientY },
            dragTrack.closed,
            dragTrack.opened,
          );
          element.dispatchEvent(
            new CustomEvent("amaoto-runner", { bubbles: true, detail: value }),
          );
        } else if (values.current.tool === "anatomy") {
          inspectorController.move(event.clientX, event.clientY);
        } else {
          const dx = event.clientX - lastX;
          velocity = dx * 0.007 * 60;
          spin += dx * 0.007;
        }
        lastX = event.clientX;
      } else {
        targetParallaxX = pointer.x * 0.055;
        targetParallaxY = pointer.y * 0.035;
        if (id !== element.dataset.hover) {
          element.dataset.hover = id ?? "";
          element.dispatchEvent(
            new CustomEvent("amaoto-highlight", { bubbles: true, detail: id }),
          );
        }
      }
    };
    const down = (event: PointerEvent) => {
      if (
        (event.pointerType === "touch" && values.current.tool !== "anatomy") ||
        event.button !== 0
      )
        return;
      downPart = hitAt(event)?.object.userData.partId as string | undefined;
      if (!downPart) return;
      if (values.current.tool === "anatomy" && downPart !== "runner")
        inspectorController.down(event.clientX, event.clientY);
      dragging = true;
      dragged = false;
      startX = lastX = event.clientX;
      startY = event.clientY;
      pointerId = event.pointerId;
      velocity = 0;
      dragTrack =
        downPart === "runner"
          ? {
              closed: toScreen(rig.runnerPoint(0)),
              opened: toScreen(rig.runnerPoint(1)),
            }
          : null;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const release = (event: PointerEvent) => {
      if (dragging) {
        dragging = false;
        dragTrack = null;
        pointerId = null;
        inspectorController.up();
        if (renderer.domElement.hasPointerCapture(event.pointerId))
          renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };
    const click = (event: PointerEvent) => {
      if (dragged) {
        dragged = false;
        return;
      }
      const hit = hitAt(event);
      if (values.current.director.current.world.subRest === "street") {
        if (raycaster.ray.intersectPlane(groundPlane, groundPoint)) {
          worldFrame.gustOrigin.copy(groundPoint);
          gustStart = timer.getElapsed();
          element.dataset.gust = String(++gustCount);
          element.dispatchEvent(
            new CustomEvent("amaoto-gust", { bubbles: true }),
          );
        }
        return;
      }
      const id = hit?.object.userData.partId as string | undefined;
      const index =
        id === "ribs" && hit?.instanceId !== undefined
          ? Math.floor(
              hit.instanceId /
                (hit.object instanceof THREE.InstancedMesh &&
                hit.object.count === 120
                  ? 3
                  : 8),
            )
          : undefined;
      if (id) values.current.onPart(id, index);
    };
    const leave = () => {
      worldFrame.pointer.set(1000, 0, 1000);
      if (!dragging) {
        targetParallaxX = targetParallaxY = 0;
        element.dispatchEvent(
          new CustomEvent("amaoto-highlight", {
            bubbles: true,
            detail: undefined,
          }),
        );
      }
    };
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointerup", release);
    renderer.domElement.addEventListener("pointercancel", release);
    renderer.domElement.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("click", click);
    const resize = () => {
      const w = Math.max(1, element.clientWidth),
        h = Math.max(1, element.clientHeight);
      cinematic.resize(w, h);
      const r = values.current.director.current.rect;
      if (r.width > 1) cinematic.projectSlot(r);
      lastSignature = "";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const tick = (now: number) => {
      values.current.controls.current?.raf(now);
      timer.update(now);
      const elapsed = timer.getElapsed();
      const p = values.current,
        s = p.director.current;
      if (!s.ready) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (cinematic.software && now - lastRender < 110) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(0.1, (now - lastRender) / 1000);
      lastRender = now;
      const rectKey = JSON.stringify(s.rect);
      if (rectKey !== lastRect) {
        cinematic.projectSlot(s.rect);
        element.dataset.stageRect = rectKey;
        lastRect = rectKey;
      }
      const active = s.chapter === 1,
        anatomy = p.anatomy;
      if (
        lastScene !== s.chapter ||
        (active && lastViewId !== anatomy.viewId)
      ) {
        if (
          pointerId !== null &&
          renderer.domElement.hasPointerCapture(pointerId)
        )
          renderer.domElement.releasePointerCapture(pointerId);
        pointerId = null;
        dragging = false;
        dragTrack = null;
        velocity = 0;
        spin = 0;
        lastScene = s.chapter;
        lastViewId = anatomy.viewId;
      }
      if (anatomy.action?.id !== actionId) {
        actionId = anatomy.action?.id ?? -1;
        actionStart = now;
      }
      const demo = sampleDemonstration(
        active ? (anatomy.action?.kind ?? null) : null,
        (now - actionStart) / 1000,
        anatomy.open,
      );
      if (
        active &&
        anatomy.action &&
        !demo.running &&
        finishedAction !== anatomy.action.id
      ) {
        finishedAction = anatomy.action.id;
        p.onActionFinish(anatomy.action.id);
      }
      const exit =
        active && !dragging ? THREE.MathUtils.smoothstep(s.local, 0.82, 1) : 0;
      let openness = s.world.open;
      if (active) openness = THREE.MathUtils.lerp(demo.open, s.open, exit);
      if (p.closed && !s.reduced) openness = 0;
      rig.setSpread(!s.reduced && s.chapter === 0 ? 1 : 0);
      rig.setOpen(openness);
      rig.setExplode(active ? 0 : s.explode);
      rig.update();
      if (!s.reduced) {
        if (!dragging) {
          spin += velocity * dt;
          velocity *= Math.exp(-dt * 5);
          if (s.chapter === 3) spin += dt * 0.09;
        }
      } else {
        velocity = 0;
        spin = 0;
        targetParallaxX = targetParallaxY = 0;
      }
      parallaxX = s.reduced
        ? 0
        : THREE.MathUtils.damp(parallaxX, targetParallaxX, 7, dt);
      parallaxY = s.reduced
        ? 0
        : THREE.MathUtils.damp(parallaxY, targetParallaxY, 7, dt);
      rig.setPose({
        position: s.position,
        rotation: [
          (active ? -0.1 : s.rotation[0]) + (s.reduced ? 0 : parallaxY),
          (active ? 0.15 : s.rotation[1]) +
            spin +
            (active ? anatomy.turn + demo.turn : 0),
          (active ? 0.05 : s.rotation[2]) + (s.reduced ? 0 : parallaxX),
        ],
        scale: s.scale,
      });
      inspectorController.tick(dt);
      if (p.inspection.current.phase !== "idle")
        model.quaternion.premultiply(
          dummy.quaternion.fromArray(p.inspection.current.rotation),
        );
      model.updateMatrixWorld(true);
      ground.position.x = model.position.x;
      ground.position.z = model.position.z;
      const tipPose = `${s.progress}:${openness}:${s.explode}:${spin}:${anatomy.sequence}`;
      if (tipWorld && tipPose !== lastTipPose) {
        for (let i = 0; i < 40; i++) {
          tipPoint
            .copy(ribPoint(openness, i, 1, s.explode))
            .applyMatrix4(model.matrixWorld);
          tipPoint.toArray(tipData, i * 3);
        }
        tipWorld.setTips?.(tipData);
        lastTipPose = tipPose;
      }
      revealAmount = active
        ? s.reduced
          ? Number(anatomy.reveal)
          : THREE.MathUtils.damp(revealAmount, Number(anatomy.reveal), 8, dt)
        : 0;
      const trace = active ? (anatomy.staticTie ? 1 : demo.trace) : -1;
      rig.setInspection({
        reveal: revealAmount * (1 - exit),
        rib:
          active && anatomy.part === "ribs" && anatomy.oneRib
            ? anatomy.ribIndex
            : null,
        index: anatomy.ribIndex,
        trace,
      });
      const highlight = active
        ? (p.hovered ?? demo.highlight ?? anatomy.part)
        : s.highlight;
      if (highlight !== lastHighlight) {
        rig.setHighlight(highlight);
        lastHighlight = highlight;
      }
      const canopyKey = `${p.colour}:${p.motif}`;
      if (canopyKey !== lastCanopy) {
        rig.setCanopy(
          p.colour,
          p.motif,
          new THREE.Vector2(...p.dyeOrigin),
          s.reduced,
        );
        lastCanopy = canopyKey;
      }
      rig.setSun(p.sun);
      const world = s.world;
      if (
        lastAtmoProgress !== s.progress ||
        lastAtmoTime !== p.timeOfDay ||
        lastAtmoRain !== p.rain
      ) {
        dayCache = computeTimeOfDay(p.timeOfDay);
        atmosphereCache = atmosphereAtProgress(
          world,
          dayCache,
          p.rain ? world.rainIntensity : 0,
        );
        lastAtmoProgress = s.progress;
        lastAtmoTime = p.timeOfDay;
        lastAtmoRain = p.rain;
      }
      const day = dayCache,
        atmosphere = atmosphereCache;
      inspectStrength = THREE.MathUtils.damp(
        inspectStrength,
        p.tool === "anatomy" ? 1 : 0,
        9,
        dt,
      );
      cinematic.apply(atmosphere, elapsed, inspectStrength, world.paperLitMode);
      camera.fov = THREE.MathUtils.lerp(
        camera.fov,
        s.fov,
        cinematic.software ? 1 : 1 - Math.exp(-11 * dt),
      );
      camera.updateProjectionMatrix();
      wantedCamera.fromArray(s.camera);
      wantedLook.fromArray(s.target);
      if (active) {
        if (anatomy.part) {
          const view = INSPECTION[anatomy.part];
          wantedLook.copy(rig.point(anatomy.part, anatomy.ribIndex));
          if (anatomy.part === "runner")
            wantedLook
              .copy(rig.runnerPoint(0))
              .add(rig.runnerPoint(1))
              .multiplyScalar(0.5);
          const eye =
            anatomy.part === "canopy" && anatomy.underneath
              ? [1, -4, 3.6]
              : view.eye;
          wantedCamera
            .fromArray(eye)
            .normalize()
            .multiplyScalar(
              inspectionDistance(
                anatomy.part === "runner" ? 1 : view.radius,
                camera.aspect,
              ) * s.scale,
            )
            .add(wantedLook);
        }
        wantedCamera.lerp(storyCamera.fromArray(s.camera), exit);
        wantedLook.lerp(storyLook.fromArray(s.target), exit);
      }
      const fitWholeObject =
        world.paperDive < 0.02 &&
        s.chapter !== 2 &&
        fitsWholeUmbrella(s.chapter, active ? anatomy.part : null);
      if (fitWholeObject)
        fitUmbrellaCamera(
          wantedCamera,
          wantedLook,
          camera.aspect,
          model.matrixWorld,
          camera.fov,
          s.chapter === 4 && !s.reduced,
        );
      if (!(dragging && downPart === "runner")) {
        const blend =
          cinematic.software || s.reduced ? 1 : 1 - Math.exp(-dt * 11);
        camera.position.lerp(wantedCamera, blend);
        look.lerp(wantedLook, blend);
        if (camera.position.distanceTo(wantedCamera) < 0.0001)
          camera.position.copy(wantedCamera);
        if (look.distanceTo(wantedLook) < 0.0001) look.copy(wantedLook);
      }
      if (fitWholeObject)
        fitUmbrellaCamera(
          camera.position,
          look,
          camera.aspect,
          model.matrixWorld,
          camera.fov,
          s.chapter === 4 && !s.reduced,
        );
      camera.lookAt(look);
      element.dataset.fitsWhole = String(fitWholeObject);
      camera.updateMatrixWorld();
      worldFrame.state = world;
      worldFrame.day = day;
      worldFrame.elapsedSec = elapsed;
      worldFrame.rain = p.rain ? world.rainIntensity : 0;
      worldFrame.colour.set(p.colour);
      worldFrame.gustAge = elapsed - gustStart;
      for (const built of worlds) {
        worldFrame.visibility = world.worldVisibility[built.name];
        built.update(worldFrame);
      }
      canopyEffects.update(worldFrame);
      element.dataset.paperDive = world.paperDive.toFixed(3);
      element.dataset.oilSoak = world.oilSoak.toFixed(3);
      element.dataset.transmission = day.paperTransmission.toFixed(3);
      const leader = document.querySelector<SVGSVGElement>(".am-leader");
      if (leader) leader.dataset.active = "false";
      if (active) {
        const r = {
            ...s.rect,
            right: s.rect.left + s.rect.width,
            bottom: s.rect.top + s.rect.height,
          },
          nav = document.querySelector<HTMLElement>(
            "[data-inspector-navigation]",
          );
        if (nav)
          Object.assign(nav.style, {
            left: `${r.left + 16}px`,
            top: `${r.bottom + 4}px`,
            width: `${r.width - 32}px`,
          });
        const markers = PARTS.map((part, index) => {
          const point = rig.point(part.id, anatomy.ribIndex),
            a = (anatomy.ribIndex / 40) * Math.PI * 2;
          const normal: [number, number, number] =
            part.id === "canopy"
              ? [0.197, 0.966, 0.168]
              : part.id === "handle" || part.id === "runner"
                ? [0, 0, 1]
                : [Math.cos(a), 0.1, Math.sin(a)];
          if (part.id === "canopy" && anatomy.underneath)
            normal.forEach((v, i) => (normal[i] = -v));
          const facing = inspectorController.pinVisible(normal, point, model);
          return { part, index, source: toScreen(point), y: 0, facing };
        }).sort((a, b) => a.source.y - b.source.y);
        markers.forEach(
          (marker, i) =>
            (marker.y =
              Math.max(r.top + 28, Math.min(r.bottom - 28, marker.source.y)) +
              (i ? 0 : 0)),
        );
        for (let i = 1; i < markers.length; i++)
          markers[i].y = Math.max(markers[i].y, markers[i - 1].y + 44);
        const overflow = Math.max(
          0,
          markers[markers.length - 1].y - (r.bottom - 28),
        );
        markers.forEach((marker) => (marker.y -= overflow));
        for (const { part, index, source, y, facing } of markers) {
          const marker = document.querySelector<HTMLButtonElement>(
              `[data-hotspot="${part.id}"]`,
            ),
            path = document.querySelector<SVGPathElement>(
              `[data-marker-line="${part.id}"]`,
            );
          const x = THREE.MathUtils.clamp(
              source.x + (index % 2 ? 38 : -38),
              r.left + 28,
              r.right - 28,
            ),
            shown = facing && (!anatomy.part || anatomy.part === part.id);
          if (marker) {
            marker.hidden = !shown || source.z < -1 || source.z > 1;
            Object.assign(marker.style, {
              left: `${x}px`,
              top: `${anatomy.part ? THREE.MathUtils.clamp(source.y, r.top + 24, r.bottom - 24) : y}px`,
            });
          }
          if (path) {
            path.setAttribute(
              "d",
              `M${source.x} ${source.y}L${x} ${anatomy.part ? THREE.MathUtils.clamp(source.y, r.top + 24, r.bottom - 24) : y}`,
            );
            path.dataset.active = String(shown);
          }
        }
        const output = document.querySelector("[data-anatomy-open]");
        if (output) output.textContent = `${Math.round(openness * 100)}%`;
      }
      const intensity = p.rain ? world.rainIntensity : 0;
      rainLevel = s.reduced
        ? 0
        : THREE.MathUtils.damp(rainLevel, intensity, 4, dt);
      s.rainIntensity = s.reduced ? intensity : rainLevel;
      document
        .querySelector<HTMLElement>(".am-page")
        ?.style.setProperty("--am-rain", String(rainLevel));
      element.dataset.open = openness.toFixed(3);
      element.dataset.progress = s.progress.toFixed(5);
      element.dataset.explode = (active ? 0 : s.explode).toFixed(3);
      element.dataset.inspection = active
        ? (anatomy.part ?? "overview")
        : "inactive";
      element.dataset.reveal = active ? String(anatomy.reveal) : "false";
      element.dataset.rib =
        active && anatomy.oneRib ? String(anatomy.ribIndex) : "all";
      element.dataset.side =
        active && anatomy.underneath ? "underneath" : "outside";
      element.dataset.action = active
        ? (anatomy.action?.kind ?? "none")
        : "none";
      element.dataset.orbit = spin.toFixed(3);
      element.dataset.inspectRotation = p.inspection.current.rotation
        .map((n) => n.toFixed(3))
        .join(",");
      element.dataset.cameraSettled = String(
        camera.position.distanceTo(wantedCamera) < 0.002 &&
          look.distanceTo(wantedLook) < 0.002,
      );
      element.dataset.sun = String(p.sun);
      element.dataset.timeOfDay = String(p.timeOfDay);
      element.dataset.world = world.activeChapter.markerLabel;
      const root = document.querySelector<HTMLElement>(".am-page");
      if (root) root.dataset.inspectPhase = p.inspection.current.phase;
      element.dataset.colour = p.colour;
      element.dataset.highlight = highlight ?? "";
      element.dataset.rain = rainLevel.toFixed(2);
      const counter = Math.round(openness * 40);
      if (counter !== lastCounter) {
        const number = document.querySelector("[data-rib-count]");
        if (number) {
          number.textContent = String(counter).padStart(2, "0");
          number.animate(
            [
              { transform: "translateY(35%)", opacity: 0.3 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: s.reduced ? 0 : 180 },
          );
        }
        lastCounter = counter;
      }
      reflection.children.forEach((child, i) => {
        const original = model.children[i];
        if (
          child instanceof THREE.InstancedMesh &&
          original instanceof THREE.InstancedMesh
        )
          child.instanceMatrix = original.instanceMatrix;
        else {
          child.position.copy(original.position);
          child.quaternion.copy(original.quaternion);
        }
      });
      const reflectionWeight =
        world.worldVisibility.threshold + world.worldVisibility.genkan;
      reflection.visible = reflectionWeight > 0.008;
      for (const material of reflectionMaterials)
        material.opacity = 0.07 * reflectionWeight;
      reflection.position.copy(model.position);
      reflection.position.y = -5 - model.position.y;
      reflection.rotation.copy(model.rotation);
      reflection.scale.set(s.scale, -s.scale, s.scale);
      rig.tick(dt);
      const signature = [
        s.progress,
        s.reduced,
        openness,
        s.explode,
        spin,
        parallaxX,
        parallaxY,
        p.sun,
        p.colour,
        p.hovered,
        anatomy.sequence,
        anatomy.oneRib,
        anatomy.reveal,
        anatomy.underneath,
        trace,
        revealAmount,
        ...camera.position.toArray(),
        ...look.toArray(),
        p.closed,
        s.rect.width,
        s.rect.height,
      ].join(":");
      if (
        signature !== lastSignature ||
        rig.animating ||
        rainLevel > 0.001 ||
        (!cinematic.software && worlds.some((w) => w.group.visible)) ||
        p.inspection.current.phase !== "idle"
      ) {
        cinematic.render();
        element.dataset.drawCalls = String(renderer.info.render.calls);
        element.dataset.triangles = String(renderer.info.render.triangles);
        lastSignature = signature;
      }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        lastSignature = "";
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    camera.position.set(4, 2.2, 10);
    model.updateMatrixWorld(true);
    fitUmbrellaCamera(
      camera.position,
      new THREE.Vector3(0, 0.2, 0),
      camera.aspect,
      model.matrixWorld,
      camera.fov,
    );
    camera.lookAt(0, 0.2, 0);
    reflection.visible = false;
    worlds.forEach((w) => {
      w.group.visible = true;
    });
    cinematic.warm();
    worlds.forEach((w) => {
      w.group.visible =
        values.current.director.current.world.worldVisibility[w.name] > 0.008;
    });
    cinematic.render();
    element.dataset.ready = "true";
    element.dataset.open = "0.000";
    values.current.onReady();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      inspectorController.dispose();
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointerup", release);
      renderer.domElement.removeEventListener("pointercancel", release);
      renderer.domElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("click", click);
      rig.dispose();
      canopyEffects.dispose();
      worlds.forEach((w) => w.dispose());
      textures.dispose();
      timer.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      reflectionMaterials.forEach((m) => m.dispose());
      cinematic.dispose();
    };
  }, []);
  return (
    <div
      ref={host}
      className="am-canvas"
      role="img"
      aria-label="Interactive procedural wagasa model"
      tabIndex={0}
    >
      <svg className="am-poster" viewBox="0 0 500 500" aria-hidden="true">
        <path
          d="M250 90Q120 100 45 245Q250 325 455 245Q380 100 250 90Z"
          fill="#F4ECDD"
          stroke="#B8923A"
        />
        {Array.from({ length: 21 }, (_, i) => (
          <path
            key={i}
            d={`M250 90L${45 + i * 20.5} ${245 + Math.sin((i / 20) * Math.PI) * 45}`}
            fill="none"
            stroke="#B8923A"
          />
        ))}
        <path d="M250 95V440" stroke="#B8923A" strokeWidth="8" />
      </svg>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Canopy.tsx">
<![CDATA[import { COLOURWAYS } from "../data/colourways";
import { StageAnchor } from "../bg/StageAnchor";
export function Canopy({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string, origin?: [number, number]) => void;
}) {
  return (
    <section id="canopy" className="am-section am-canopy">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">04 / weather</span>
        <h2>
          <span className="am-line">
            <span>Choose your</span>
          </span>
          <em className="am-line">
            <span>canopy.</span>
          </em>
        </h2>
        <p>
          One structure, four moods. The motif is painted into the paper before
          the last binding.
        </p>
        <div
          className="am-swatches"
          role="radiogroup"
          aria-label="Canopy colourway"
        >
          {COLOURWAYS.map((item) => (
            <button
              key={item.id}
              className={value === item.id ? "is-active" : ""}
              style={{ "--swatch": item.color } as React.CSSProperties}
              onClick={(event) => {
                const r = event.currentTarget.getBoundingClientRect();
                onChange(
                  item.id,
                  event.detail
                    ? [
                        (event.clientX - r.left) / r.width,
                        (event.clientY - r.top) / r.height,
                      ]
                    : [0.5, 0.5],
                );
              }}
              onKeyDown={(event) => {
                const index = COLOURWAYS.findIndex((x) => x.id === item.id);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 3
                      : ["ArrowRight", "ArrowDown"].includes(event.key)
                        ? (index + 1) % 4
                        : ["ArrowLeft", "ArrowUp"].includes(event.key)
                          ? (index + 3) % 4
                          : -1;
                if (next < 0) return;
                event.preventDefault();
                onChange(COLOURWAYS[next].id);
                (
                  event.currentTarget.parentElement?.children[
                    next
                  ] as HTMLButtonElement
                )?.focus();
              }}
              role="radio"
              aria-checked={value === item.id}
            >
              <span />
              <b>{item.label}</b>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
        <span className="am-stage-caption">
          Drag to turn / painted in the paper
        </span>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Commission.tsx">
<![CDATA[import { CommissionForm } from "../forms/CommissionForm";
import { StageAnchor } from "../bg/StageAnchor";
export function Commission({
  canopy,
  onSuccess,
}: {
  canopy: string;
  onSuccess: () => void;
}) {
  return (
    <section id="commission" className="am-section am-commission">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">06 / commission</span>
        <h2>
          <span className="am-line">
            <span>Made for the</span>
          </span>
          <em className="am-line">
            <span>weather ahead.</span>
          </em>
        </h2>
        <p>
          Tell us where you will carry it. We will answer with a paper, bamboo
          and palette that belongs there.
        </p>
        <dl>
          <div>
            <dt>Lead time</dt>
            <dd>14 weeks</dd>
          </div>
          <div>
            <dt>Atelier</dt>
            <dd>Kurokawa / 1963</dd>
          </div>
          <div>
            <dt>Commission</dt>
            <dd>From ¥84,000</dd>
          </div>
        </dl>
        <CommissionForm canopy={canopy} onSuccess={onSuccess} />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Hero.tsx">
<![CDATA[import { Hanko } from "../brand/Hanko";
import { StageAnchor } from "../bg/StageAnchor";
export function Hero() {
  return (
    <section id="top" className="am-section am-hero">
      <StageAnchor />
      <div className="am-hero__copy am-chapter-copy">
        <span className="am-kicker">Wagasa atelier / Kurokawa, Nagano</span>
        <h1>
          <span className="am-line">
            <span>雨音</span>
          </span>
          <em>
            <span className="am-line">
              <span>The sound of rain,</span>
            </span>
            <span className="am-line">
              <span>kept dry.</span>
            </span>
          </em>
        </h1>
        <p>
          Commission a hand-built oil-paper umbrella, tuned to the weather you
          will carry it through.
        </p>
        <a className="am-button am-button--red" href="#commission">
          Reserve a commission <span>↗</span>
        </a>
      </div>
      <div className="am-vertical">雨の音を、紙に。</div>
      <Hanko />
      <span className="am-stage-caption">40 ribs / one quiet mechanism</span>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Light.tsx">
<![CDATA[import { StageAnchor } from "../bg/StageAnchor";
export function Light({
  angle,
  onAngle,
  rain,
  onRain,
}: {
  angle: number;
  onAngle: (v: number) => void;
  rain: boolean;
  onRain: (v: boolean) => void;
}) {
  return (
    <section id="light" className="am-section am-light">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">03 / paper</span>
        <h2>
          <span className="am-line">
            <span>Paper that</span>
          </span>
          <em className="am-line">
            <span>listens to light.</span>
          </em>
        </h2>
        <p>
          Thin washi is not a surface. It is a membrane. Put the sun behind it
          and the fibres answer.
        </p>
      </div>
      <div className="am-control">
        <label htmlFor="sun">
          Sun angle <output htmlFor="sun">{angle}°</output>
        </label>
        <input
          id="sun"
          type="range"
          min="-90"
          max="90"
          value={angle}
          onChange={(e) => onAngle(Number(e.target.value))}
        />
        <label className="am-switch">
          <input
            type="checkbox"
            checked={rain}
            onChange={(e) => onRain(e.target.checked)}
          />
          <span className="am-switch__pour" aria-hidden="true" />
          <span>Rain on the roof</span>
        </label>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Making.tsx">
<![CDATA[import { MAKING_STEPS } from "../data/steps";
import { StageAnchor } from "../bg/StageAnchor";
export function Making() {
  return (
    <section id="making" className="am-making-sequence">
      <div className="am-section am-making am-making-frame" data-chapter-frame>
        <StageAnchor />
        <div className="am-chapter-copy">
          <span className="am-kicker">05 / craft</span>
          <h2>
            <span className="am-line">
              <span>Eighty-one</span>
            </span>
            <em className="am-line">
              <span>quiet steps.</span>
            </em>
          </h2>
          <p>
            From split bamboo to the last knot, every gesture stays visible in
            the object.
          </p>
          <ol>
            {MAKING_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
          <div className="am-making-guide">
            <span>Scroll to follow the making</span>
            <output aria-label="Current making step" data-making-counter>
              01 / 10
            </output>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Structure.tsx">
<![CDATA[import { StageAnchor } from "../bg/StageAnchor";
import { PARTS } from "../data/parts";
import { AnatomyDetails } from "../scene/AnatomyControls";
import type { AnatomyState, AnatomyEvent } from "../scene/anatomy";
export function Structure({
  state,
  dispatch,
  enhanced = false,
}: {
  state: AnatomyState;
  dispatch: (event: AnatomyEvent) => void;
  enhanced?: boolean;
}) {
  return (
    <section
      id="structure"
      className="am-section am-structure"
      data-inspecting={Boolean(state.part)}
    >
      <StageAnchor />
      <div className="am-chapter-copy" hidden={enhanced}>
        <span className="am-kicker">02 / structure</span>
        <h2>
          <span className="am-line">
            <span>Forty ribs,</span>
          </span>
          <em className="am-line">
            <span>one breath.</span>
          </em>
        </h2>
        {!enhanced && <AnatomyDetails state={state} dispatch={dispatch} />}
        <div className="am-inspector-spec">
          <span>40 ribs / one circumference</span>
          <span>81 quiet making steps</span>
        </div>
        {!enhanced && (
          <div>
            <dl className="am-anatomy-fallback">
              {PARTS.map((part) => (
                <div key={part.id}>
                  <dt>{part.name}</dt>
                  <dd>{part.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/ui/PartCallout.tsx">
<![CDATA[import { PARTS } from "../data/parts";
import type { PartId } from "../scene/anatomy";
export function PartCallout({
  selected,
  onSelect,
  onHighlight,
}: {
  selected: PartId | null;
  onSelect: (id: PartId) => void;
  onHighlight: (id?: PartId) => void;
}) {
  return (
    <div
      className="am-parts am-inspector-parts"
      role="group"
      aria-label="Explore the six umbrella parts"
    >
      {PARTS.map((part, index) => (
        <button
          key={part.id}
          type="button"
          data-part={part.id}
          aria-controls="am-inspector-detail"
          aria-pressed={selected === part.id}
          className={selected === part.id ? "is-active" : ""}
          onClick={() => onSelect(part.id)}
          onMouseEnter={() => onHighlight(part.id)}
          onMouseLeave={() => onHighlight(undefined)}
          onFocus={() => onHighlight(part.id)}
          onBlur={() => onHighlight(undefined)}
        >
          <small aria-hidden="true">0{index + 1}</small>
          <span>{part.name}</span>
        </button>
      ))}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/ui/ThreadLine.tsx">
<![CDATA[export function ThreadLine() {
  return (
    <div className="am-threadline" aria-hidden="true">
      <span />
      {Array.from({ length: 6 }, (_, i) => (
        <i key={i} style={{ left: `${i * 20}%` }} />
      ))}
      <b />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/duskStreet.ts">
<![CDATA[import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import type { WorldTextures } from "../textures";
import { createRain } from "../rain";
import {
  worldBase,
  randomInstances,
  addMotes,
  contactShadow,
  type BuiltWorld,
} from "./shared";
export function createDuskStreet(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("street", WORLD_ANCHORS[3]),
    ink = b.standard("#2B3A55", { roughness: 0.9 }),
    wood = b.standard("#1A1613", { map: t.maps.woodFloorColor });
  t.maps.cobbleColor.repeat.set(4, 4);
  t.maps.cobbleBump.repeat.set(4, 4);
  contactShadow(b);
  b.box(
    [28, 0.14, 32],
    [0, -2.5, -2],
    b.standard("#F4ECDD", {
      map: t.maps.cobbleColor,
      bumpMap: t.maps.cobbleBump,
      bumpScale: 0.06,
      roughnessMap: t.maps.lacquerRoughness,
      roughness: 0.19,
      metalness: 0.18,
    }),
  );
  for (const side of [-1, 1])
    for (let i = 0; i < 7; i++) {
      b.box(
        [4, 5 + (i % 3), 3],
        [side * 10, 0.2 + (i % 3) * 0.4, 2 - i * 4],
        ink,
      );
      const eave = b.box(
        [5, 0.22, 4],
        [side * 10, 3 + (i % 3) * 0.4, 2 - i * 4],
        wood,
      );
      eave.rotation.z = side * 0.06;
    }
  const posts = randomInstances(
    b,
    new THREE.CylinderGeometry(0.065, 0.1, 4.4, 7),
    wood,
    12,
    7,
    (d, _, i) => {
      d.position.set(i % 2 ? 3.8 : -3.8, -0.25, 3 - Math.floor(i / 2) * 3.2);
    },
  );
  posts.castShadow = true;
  const lanternGeo = new THREE.SphereGeometry(0.38, 16, 12),
    phases = new Float32Array(12);
  for (let i = 0; i < 12; i++) phases[i] = i * 0.63;
  lanternGeo.setAttribute(
    "aPhase",
    new THREE.InstancedBufferAttribute(phases, 1),
  );
  const uniforms = {
    uGlow: { value: 1 },
    uTint: { value: new THREE.Color("#B8923A") },
    uGustAge: { value: 100 },
    uGustOrigin: { value: new THREE.Vector3() },
    uPointerWorld: { value: new THREE.Vector3(1000, 0, 1000) },
  };
  const lantern = b.shader(
    "attribute float aPhase;uniform float uGlow,uGustAge;uniform vec3 uTint,uGustOrigin,uPointerWorld;",
    `float distanceToGust=length(transformed.xz-uGustOrigin.xz);float gust=sin(clamp(uGustAge/3.6,0.,1.)*3.14159)*(1.-step(3.6,uGustAge))*exp(-pow((distanceToGust-uGustAge*6.5)/2.,2.));transformed.x+=sin(uTime*.6+aPhase)*.035+sin(uTime*4.+aPhase)*gust*.18;`,
    `float ribs=.82+.18*pow(abs(sin(vUv.x*3.14159*24.)),10.);float shade=.45+.55*sin(vUv.y*3.14159);float nearPointer=exp(-length(vWorld.xz-uPointerWorld.xz)*.5);color=mix(vec3(.95,.87,.67),uTint,.35)*uGlow*ribs*shade*(1.+nearPointer*.3);alpha=1.;`,
    uniforms,
    false,
  );
  randomInstances(b, lanternGeo, lantern, 12, 8, (d, _, i) => {
    d.position.set(i % 2 ? 3.8 : -3.8, 1.5, 3 - Math.floor(i / 2) * 3.2);
    d.scale.set(1, 1.35, 1);
  });
  randomInstances(
    b,
    new THREE.TorusGeometry(0.25, 0.035, 5, 16),
    wood,
    24,
    9,
    (d, _, i) => {
      d.position.set(
        Math.floor(i / 2) % 2 ? 3.8 : -3.8,
        i % 2 ? 1.96 : 1.04,
        3 - Math.floor(i / 4) * 3.2,
      );
      d.rotation.x = Math.PI / 2;
    },
  );
  const glow = b.glow("#B8923A");
  glow.blending = THREE.AdditiveBlending;
  for (let i = 0; i < 12; i++) {
    const x = i % 2 ? 3.8 : -3.8,
      z = 3 - Math.floor(i / 2) * 3.2;
    const reflection = b.mesh(new THREE.PlaneGeometry(0.9, 2.8), glow, [
      x,
      -2.405,
      z + 0.8,
    ]);
    reflection.rotation.x = -Math.PI / 2;
    b.mesh(new THREE.PlaneGeometry(0.9, 0.9), glow, [x, 1.5, z], [1.4, 1.4, 1]);
  }
  for (let i = 0; i < 8; i++)
    b.mesh(new THREE.PlaneGeometry(0.3, 0.3), glow, [
      i % 2 ? 3.5 : -3.5,
      1.6,
      -18 - i * 2,
    ]);
  const rain = createRain(b, software);
  addMotes(b, software ? 24 : 120, 150);
  b.counts.lanterns = 12;
  return {
    ...b,
    setTips: rain.setTips,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      rain.update(f);
      uniforms.uGlow.value =
        f.day.lanternIntensityMultiplier *
        (2.8 + 0.1 * Math.sin(f.elapsedSec * 0.8));
      uniforms.uTint.value.set("#B8923A").lerp(f.colour, 0.12);
      uniforms.uGustAge.value = f.gustAge;
      uniforms.uGustOrigin.value.copy(f.gustOrigin).sub(b.group.position);
      uniforms.uPointerWorld.value.copy(f.pointer);
      glow.uniforms.uColor.value
        .copy(uniforms.uTint.value)
        .multiplyScalar(f.day.lanternIntensityMultiplier);
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/genkan.ts">
<![CDATA[import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import type { WorldTextures } from "../textures";
import { worldBase, addMotes, contactShadow, type BuiltWorld } from "./shared";
export function createGenkan(t: WorldTextures, software: boolean): BuiltWorld {
  const b = worldBase("genkan", WORLD_ANCHORS[5]),
    wood = b.standard("#B8923A", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.015,
    }),
    ink = b.standard("#1A1613"),
    paper = b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      emissive: "#B8923A",
      emissiveIntensity: 0.25,
    });
  b.box(
    [26, 0.15, 24],
    [0, -2.5, 0],
    b.standard("#2B3A55", {
      map: t.maps.cobbleColor,
      bumpMap: t.maps.cobbleBump,
      bumpScale: 0.025,
      roughness: 0.36,
    }),
  );
  contactShadow(b);
  b.box([14, 0.4, 9], [0, -2.25, -6], wood);
  b.box(
    [13.7, 0.08, 8.7],
    [0, -2.01, -6],
    b.standard("#F4ECDD", {
      map: t.maps.tatamiColor,
      bumpMap: t.maps.tatamiBump,
      bumpScale: 0.008,
    }),
  );
  b.box([11, 6.5, 0.25], [0, 1, -7], ink);
  for (let panel = 0; panel < 3; panel++) {
    const x = (panel - 1) * 3.2;
    b.box([3.1, 5.7, 0.07], [x, 0.8, -6.8], paper);
    for (let i = 0; i < 4; i++)
      b.box([0.045, 5.8, 0.12], [x - 1.56 + i * 1.04, 0.8, -6.7], wood);
    for (let i = 0; i < 6; i++)
      b.box([3.15, 0.045, 0.12], [x, -2 + i * 1.1, -6.7], wood);
  }
  for (const x of [-5, 5]) b.box([0.25, 7, 0.35], [x, 1, -6.5], wood);
  b.box([10, 0.3, 0.35], [0, 4.3, -6.5], wood);
  b.mesh(
    new THREE.CylinderGeometry(0.44, 0.34, 0.65, 20, 1, true),
    b.standard("#B8923A", {
      map: t.maps.bambooColor,
      side: THREE.DoubleSide,
      roughness: 0.35,
    }),
    [-0.65, -2.1, 0],
  );
  const rim = b.mesh(
    new THREE.TorusGeometry(0.44, 0.025, 6, 24),
    wood,
    [-0.65, -1.775, 0],
  );
  rim.rotation.x = Math.PI / 2;
  const bottom = b.mesh(
    new THREE.CircleGeometry(0.34, 20),
    ink,
    [-0.65, -2.405, 0],
  );
  bottom.rotation.x = -Math.PI / 2;
  const glow = b.shader(
    "uniform float uGlow;",
    "",
    `float ribs=.8+.2*pow(abs(sin(vUv.x*3.14159*22.)),10.);color=vec3(.90,.72,.38)*uGlow*ribs;alpha=1.;`,
    { uGlow: { value: 1 } },
    false,
  );
  b.mesh(
    new THREE.SphereGeometry(0.38, 16, 10),
    glow,
    [-2.2, 2.2, -2.6],
    [1, 1.35, 1],
  );
  b.mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 2.1, 5),
    ink,
    [-2.2, 3.7, -2.6],
  );
  const halo = b.glow("#B8923A");
  halo.blending = THREE.AdditiveBlending;
  b.mesh(new THREE.PlaneGeometry(1.8, 1.8), halo, [-2.2, 2.2, -2.7]);
  addMotes(b, software ? 20 : 150, 68);
  b.counts.lanterns = 1;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      glow.uniforms.uGlow.value = f.day.lanternIntensityMultiplier * 2.3;
      paper.emissiveIntensity = 0.12 + f.day.value * 0.2;
      halo.uniforms.uColor.value
        .set("#B8923A")
        .multiplyScalar(f.day.lanternIntensityMultiplier);
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/index.ts">
<![CDATA[import { createWorkshop } from "./workshop";
import { createDuskStreet } from "./duskStreet";
import { createPaperDive } from "./paperDive";
import { createWorkbench } from "./workbench";
import { createThreshold } from "./threshold";
import { createGenkan } from "./genkan";
import type { WorldTextures } from "../textures";
export const createWorlds = (t: WorldTextures, software: boolean) => [
  createWorkshop(t, software),
  createDuskStreet(t, software),
  createPaperDive(t, software),
  createWorkbench(t, software),
  createThreshold(t, software),
  createGenkan(t, software),
];
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/paperDive.ts">
<![CDATA[import * as THREE from "three";
import { PAPER_PATCH, PAPER_NORMAL } from "../../logic/chapters";
import { generateFibres } from "../../logic/generators";
import type { WorldTextures } from "../textures";
import { worldBase, randomInstances, type BuiltWorld } from "./shared";
export function createPaperDive(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("paper", [0, 0, 0]),
    fibres = generateFibres(481, software ? 300 : 1500).reverse(),
    segments = 8,
    positions: number[] = [],
    uv: number[] = [],
    arrivals: number[] = [],
    layers: number[] = [],
    phases: number[] = [],
    indices: number[] = [];
  for (const f of fibres) {
    const offset = positions.length / 3,
      // Keep the lighter field dense around the macro camera's narrow viewing cone.
      fieldScale = software ? 0.65 : 1,
      c = Math.cos(f.angle),
      s = Math.sin(f.angle);
    for (let j = 0; j <= segments; j++)
      for (const side of [-1, 1]) {
        const q = j / segments - 0.5,
          curve = Math.sin(q * Math.PI * 2) * f.curl,
          width = f.thickness * side;
        positions.push(
          f.position[0] * fieldScale + c * f.length * q - s * (curve + width),
          f.position[1] * fieldScale + s * f.length * q + c * (curve + width),
          f.position[2] * 1.8 + Math.sin(q * Math.PI) * 0.01,
        );
        uv.push(j / segments, (side + 1) / 2);
        arrivals.push(f.oilArrival);
        layers.push(f.layer / 5);
        phases.push(f.phase);
      }
    for (let j = 0; j < segments; j++) {
      const k = offset + j * 2;
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setAttribute(
    "aOilArrival",
    new THREE.Float32BufferAttribute(arrivals, 1),
  );
  geometry.setAttribute("aLayer", new THREE.Float32BufferAttribute(layers, 1));
  geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
  geometry.setIndex(indices);
  const uniforms = {
    uDive: { value: 0 },
    uOilSoak: { value: 0 },
    uTransmission: { value: 0.5 },
    uLightDir: { value: new THREE.Vector3(0, 1, 0) },
  };
  const fibre = b.shader(
    "attribute float aOilArrival,aLayer,aPhase;varying float vArrival,vLayer;uniform float uDive,uOilSoak,uTransmission;uniform vec3 uLightDir;",
    "vArrival=aOilArrival;vLayer=aLayer;transformed.y+=sin(uTime*.35+aPhase+position.x*4.)*.002*uDive;",
    `float wet=smoothstep(vArrival-.04,vArrival+.04,uOilSoak);float front=exp(-pow((uOilSoak-vArrival)/.05,2.));float edge=.6+.4*sin(vUv.y*3.14159);float transmission=pow(abs(dot(normalize(cameraPosition-vWorld),normalize(uLightDir))),2.);
  vec3 dry=vec3(.90,.84,.72),amber=vec3(.48,.29,.045);color=mix(dry,amber,wet*.7)*edge*(.8+transmission*uTransmission)+vec3(.48,.29,.045)*front*2.;alpha=mix(.94,.34,wet)*uDive*(1.-vLayer*.15);`,
    uniforms,
  );
  b.mesh(geometry, fibre);
  b.counts.fibres = fibres.length;
  const noise = `float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}float fbm(vec2 p){float n=0.,a=.5;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<4;i++){n+=a*noise(p);p=r*p*2.03+3.7;a*=.5;}return n;}`;
  const background = b.shader(
    `uniform float uDive,uOilSoak;uniform sampler2D uThickness;${noise}`,
    "",
    `float n=fbm(vUv*9.),thickness=texture2D(uThickness,vUv*2.).r;float wet=smoothstep(.05,.85,uOilSoak+(.5-n)*.25);color=mix(vec3(.90,.84,.72),vec3(.63,.43,.12),wet*.6)*(.7+n*.22+thickness*.1);alpha=uDive;`,
    {
      uDive: uniforms.uDive,
      uOilSoak: uniforms.uOilSoak,
      uThickness: { value: t.maps.washiTransmission },
    },
  );
  b.mesh(new THREE.PlaneGeometry(4.2, 4.2), background, [0, 0, -1.4]);
  const bokehGeo = new THREE.PlaneGeometry(0.13, 0.13),
    phase = new Float32Array(software ? 12 : 36);
  for (let i = 0; i < phase.length; i++) phase[i] = i * 0.37;
  bokehGeo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
  const bokeh = b.shader(
    "attribute float aPhase;uniform float uDive;",
    "transformed.x+=sin(uTime*.15+aPhase)*.08;transformed.y+=cos(uTime*.12+aPhase)*.04;",
    "float r=length(vUv-.5)*2.;alpha=pow(max(0.,1.-r),3.)*.16*uDive;color=vec3(.95,.78,.4);",
    { uDive: uniforms.uDive },
  );
  randomInstances(b, bokehGeo, bokeh, phase.length, 481, (d, r) => {
    d.position.set((r() - 0.5) * 2, (r() - 0.5) * 2, -0.3 - r() * 0.5);
    d.scale.setScalar(0.5 + r() * 2);
  });
  b.counts.bokeh = phase.length;
  const patch = new THREE.Vector3().fromArray(PAPER_PATCH);
  b.group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3().fromArray(PAPER_NORMAL).normalize(),
  );
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      b.group.position.fromArray(f.state.anchor).add(patch);
      uniforms.uDive.value = f.state.paperDive;
      uniforms.uOilSoak.value = f.state.oilSoak;
      uniforms.uTransmission.value = f.day.paperTransmission;
      uniforms.uLightDir.value.fromArray(f.day.sunOffset).normalize();
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/shared.ts">
<![CDATA[import * as THREE from "three";
import type { ChapterProgressState, WorldName } from "../../logic/chapters";
import type { TimeOfDay } from "../../logic/timeOfDay";
import { createSeededRandom, type Vec3 } from "../../logic/rng";
import { generateMotes } from "../../logic/generators";
import type { WorldTextures } from "../textures";
export type WorldFrame = {
  state: ChapterProgressState;
  day: TimeOfDay;
  elapsedSec: number;
  visibility: number;
  rain: number;
  gustAge: number;
  gustOrigin: THREE.Vector3;
  pointer: THREE.Vector3;
  colour: THREE.Color;
};
export type BuiltWorld = {
  name: WorldName;
  group: THREE.Group;
  update: (frame: WorldFrame) => void;
  dispose: () => void;
  counts: Record<string, number>;
  setTips?: (source: Float32Array) => void;
};
export function worldBase(name: WorldName, anchor: Vec3) {
  const group = new THREE.Group();
  group.name = `Amaoto ${name}`;
  group.position.fromArray(anchor);
  const animated: THREE.ShaderMaterial[] = [];
  const fades: THREE.MeshStandardMaterial[] = [];
  const standard = (
    color: string,
    options: THREE.MeshStandardMaterialParameters = {},
  ) => {
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      transparent: true,
      ...options,
    });
    fades.push(m);
    return m;
  };
  const mesh = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: Vec3 = [0, 0, 0],
    scale: Vec3 = [1, 1, 1],
  ) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.fromArray(position);
    m.scale.fromArray(scale);
    m.castShadow = m.receiveShadow = true;
    group.add(m);
    return m;
  };
  const box = (size: Vec3, position: Vec3, material: THREE.Material) =>
    mesh(new THREE.BoxGeometry(...size), material, position);
  const shader = (
    declarations: string,
    vertex: string,
    fragment: string,
    uniforms: Record<string, THREE.IUniform> = {},
    transparent = true,
  ) => {
    const m = new THREE.ShaderMaterial({
      fog: true,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: !transparent,
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
        uTime: { value: 0 },
        uVisibility: { value: 1 },
        ...uniforms,
      },
      vertexShader: `varying vec2 vUv;varying vec3 vWorld;uniform float uTime,uVisibility;${declarations}\n#include <fog_pars_vertex>\nvoid main(){vUv=uv;vec3 transformed=position;\n#ifdef USE_INSTANCING\ntransformed=(instanceMatrix*vec4(transformed,1.)).xyz;\n#endif\n${vertex}\nvec4 world=modelMatrix*vec4(transformed,1.);vWorld=world.xyz;vec4 mvPosition=viewMatrix*world;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}`,
      fragmentShader: `varying vec2 vUv;varying vec3 vWorld;uniform float uTime,uVisibility;${declarations.replace(/attribute\s+[^;]+;/g, "")}\n#include <fog_pars_fragment>\nvoid main(){vec3 color=vec3(1.);float alpha=1.;${fragment}\ngl_FragColor=vec4(color,alpha*uVisibility);\n#include <fog_fragment>\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`,
    });
    animated.push(m);
    return m;
  };
  const glow = (color: string) =>
    shader(
      "uniform vec3 uColor;",
      "",
      "float r=length(vUv-.5)*2.;alpha=pow(max(0.,1.-r),2.);color=uColor*2.4;",
      { uColor: { value: new THREE.Color(color) } },
    );
  const counts: Record<string, number> = {};
  return {
    name,
    group,
    standard,
    mesh,
    box,
    shader,
    glow,
    counts,
    update(f: WorldFrame) {
      group.visible = f.visibility > 0.008;
      if (!group.visible) return;
      for (const m of fades) {
        m.opacity = f.visibility;
        m.depthWrite = f.visibility > 0.995;
      }
      for (const m of animated) {
        m.uniforms.uTime.value = f.elapsedSec;
        m.uniforms.uVisibility.value = f.visibility;
      }
    },
    dispose() {
      const gs = new Set<THREE.BufferGeometry>(),
        ms = new Set<THREE.Material>();
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          gs.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            ms.add(m),
          );
        }
      });
      gs.forEach((g) => g.dispose());
      ms.forEach((m) => m.dispose());
      group.removeFromParent();
    },
  };
}
export type WorldBase = ReturnType<typeof worldBase>;
export function addMotes(
  b: WorldBase,
  count: number,
  seed: number,
  shavings = false,
) {
  const data = generateMotes(seed, count),
    g = shavings
      ? new THREE.TorusGeometry(0.028, 0.003, 3, 7, Math.PI * 1.6)
      : new THREE.PlaneGeometry(0.025, 0.025);
  const phase = new Float32Array(count);
  for (let i = 0; i < count; i++) phase[i] = data[i * 7 + 6];
  g.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
  const m = b.shader(
    "attribute float aPhase;",
    "transformed.x+=sin(uTime*.18+aPhase)*.3;transformed.y-=mod(uTime*.045+aPhase,3.);",
    shavings
      ? "color=vec3(.25,.16,.04);alpha=.24;"
      : "float r=length(vUv-.5)*2.;alpha=max(0.,1.-r)*.22;color=vec3(.96,.92,.85);",
  );
  const inst = new THREE.InstancedMesh(g, m, count),
    d = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    d.position.fromArray(data, i * 7);
    d.rotation.set(shavings ? phase[i] : 0, 0, phase[i]);
    d.updateMatrix();
    inst.setMatrixAt(i, d.matrix);
  }
  inst.frustumCulled = false;
  b.group.add(inst);
  b.counts[shavings ? "shavings" : "motes"] = count;
}
export function contactShadow(b: WorldBase) {
  const m = b.shader(
    "",
    "",
    "float r=length((vUv-.5)*vec2(1.,1.4))*2.;color=vec3(.009,.007,.005);alpha=pow(max(0.,1.-r),2.)*.22;",
  );
  const plane = b.mesh(new THREE.PlaneGeometry(4, 3), m, [0, -2.405, 0]);
  plane.rotation.x = -Math.PI / 2;
  plane.castShadow = false;
}
export function floor(
  b: WorldBase,
  t: WorldTextures,
  kind = "woodFloorColor",
  width = 26,
  depth = 24,
  y = -2.5,
) {
  contactShadow(b);
  return b.box(
    [width, 0.15, depth],
    [0, y, 0],
    b.standard("#B8923A", {
      map: t.maps[kind],
      bumpMap: t.maps[kind === "tatamiColor" ? "tatamiBump" : "woodBump"],
      bumpScale: 0.025,
      roughnessMap: t.maps.lacquerRoughness,
      roughness: 0.42,
    }),
  );
}
export function randomInstances(
  b: WorldBase,
  g: THREE.BufferGeometry,
  m: THREE.Material,
  count: number,
  seed: number,
  place: (d: THREE.Object3D, r: () => number, i: number) => void,
) {
  const instance = new THREE.InstancedMesh(g, m, count),
    d = new THREE.Object3D(),
    r = createSeededRandom(seed);
  for (let i = 0; i < count; i++) {
    place(d, r, i);
    d.updateMatrix();
    instance.setMatrixAt(i, d.matrix);
  }
  b.group.add(instance);
  return instance;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/threshold.ts">
<![CDATA[import type { WorldTextures } from "../textures";
import { worldBase, addMotes, contactShadow, type BuiltWorld } from "./shared";
export function createThreshold(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("threshold", [0, 0, 0]),
    frame = b.standard("#B8923A", { map: t.maps.bambooColor, roughness: 0.6 }),
    paper = b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      bumpMap: t.maps.washiBump,
      bumpScale: 0.008,
      emissive: "#F4ECDD",
      emissiveIntensity: 0.45,
    });
  b.box(
    [32, 0.15, 30],
    [0, -2.5, 0],
    b.standard("#F4ECDD", {
      map: t.maps.washiColor,
      bumpMap: t.maps.washiBump,
      bumpScale: 0.006,
      roughness: 0.5,
    }),
  );
  contactShadow(b);
  for (let panel = 0; panel < 5; panel++) {
    const x = (panel - 2) * 4.5,
      z = -5.5 - Math.abs(panel - 2) * 0.25;
    b.box([4.35, 7, 0.06], [x, 1, z], paper);
    for (let i = 0; i < 5; i++)
      b.box([0.045, 7.1, 0.09], [x - 2.2 + i * 1.1, 1, z + 0.05], frame);
    for (let i = 0; i < 7; i++)
      b.box([4.4, 0.045, 0.09], [x, -2.5 + i * 1.16, z + 0.05], frame);
  }
  const side = b.box([0.12, 7, 14], [-10, 1, -1], paper);
  side.castShadow = false;
  const side2 = b.box([0.12, 7, 14], [10, 1, -1], paper);
  side2.castShadow = false;
  addMotes(b, software ? 36 : 180, 80);
  b.counts.shojiPanels = 5;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      paper.emissiveIntensity = 0.25 + f.day.value * 0.4;
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/workbench.ts">
<![CDATA[import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import { turnedGeometry } from "../../model/lathe";
import type { WorldTextures } from "../textures";
import { worldBase, floor, addMotes, type BuiltWorld } from "./shared";
export function createWorkbench(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("bench", WORLD_ANCHORS[4]),
    wood = b.standard("#F4ECDD", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.02,
    }),
    ink = b.standard("#1A1613");
  floor(b, t);
  b.box([11, 0.25, 3], [0, -1.1, -2.4], wood);
  for (const x of [-4.7, 4.7])
    for (const z of [-3.6, -1.1]) b.box([0.25, 1.3, 0.25], [x, -1.8, z], wood);
  b.box([0.15, 4, 0.15], [-4, 0.7, -2.5], ink);
  b.box([4, 0.12, 0.12], [-2, 2.6, -2.5], ink);
  const shade = b.mesh(
    new THREE.ConeGeometry(0.65, 0.5, 16, 1, true),
    ink,
    [-0.1, 2.45, -2.5],
  );
  shade.rotation.x = Math.PI;
  const lamp = b.mesh(
    new THREE.CircleGeometry(0.35, 20),
    b.standard("#F4ECDD", { emissive: "#F4ECDD", emissiveIntensity: 1.5 }),
    [-0.1, 2.21, -2.5],
  );
  lamp.rotation.x = -Math.PI / 2;
  const assembly = { value: 0 };
  const parts: THREE.Mesh[] = [];
  const add = (
    geometry: THREE.BufferGeometry,
    x: number,
    z: number,
    step: number,
    color = "#B8923A",
  ) => {
    z -= 2.3;
    const material = b.standard(color, {
      ...(color === "#B8923A" ? { map: t.maps.bambooColor } : {}),
      roughness: 0.55,
    });
    const start = step / 10,
      end = (step + 1) / 10,
      offset = new THREE.Vector3(-x, 1.4, -z);
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uAssembly = assembly;
      shader.uniforms.uPartOffset = { value: offset };
      shader.vertexShader =
        `uniform float uAssembly;uniform vec3 uPartOffset;varying float vPresence;\n` +
        shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\nfloat part=smoothstep(${start.toFixed(3)},${end.toFixed(3)},uAssembly);transformed+=uPartOffset*part;transformed.y+=sin(part*3.14159)*.5;vPresence=1.-smoothstep(.8,1.,part);`,
      );
      shader.fragmentShader =
        "varying float vPresence;\n" + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <alphatest_fragment>",
        "#include <alphatest_fragment>\ndiffuseColor.a*=vPresence;if(vPresence<.02)discard;",
      );
    };
    const mesh = b.mesh(geometry, material, [x, -0.8, z]);
    mesh.castShadow = false;
    parts.push(mesh);
    return mesh;
  };
  const shaft = add(
    new THREE.CylinderGeometry(0.04, 0.05, 2.6, 10),
    -3.6,
    -0.4,
    2,
  );
  shaft.rotation.z = Math.PI / 2;
  const ribs = add(
    new THREE.CylinderGeometry(0.018, 0.025, 2, 6),
    -3.2,
    0.4,
    0,
  );
  ribs.rotation.z = Math.PI / 2;
  for (let i = 1; i < 7; i++) {
    const r = add(
      new THREE.CylinderGeometry(0.012, 0.02, 2, 5),
      -3.2 + i * 0.09,
      0.4 + i * 0.04,
      1,
    );
    r.rotation.z = Math.PI / 2;
  }
  add(turnedGeometry("cap"), -1.2, -0.6, 3);
  add(turnedGeometry("runner"), -0.5, 0.4, 5);
  const links = add(
    new THREE.CylinderGeometry(0.015, 0.02, 1.1, 6),
    -1.5,
    0.8,
    4,
  );
  links.rotation.z = 1.3;
  const paper = add(
    new THREE.CylinderGeometry(0.18, 0.18, 1.8, 20),
    1.1,
    0.5,
    6,
    "#F4ECDD",
  );
  paper.rotation.z = Math.PI / 2;
  const brush = add(
    new THREE.CylinderGeometry(0.035, 0.045, 1.15, 10),
    2.8,
    0.2,
    7,
  );
  brush.rotation.z = 1.1;
  add(
    new THREE.ConeGeometry(0.08, 0.3, 10),
    3.28,
    0.2,
    7,
    "#1A1613",
  ).rotation.z = 1.1;
  const coil = add(
    new THREE.TorusGeometry(0.2, 0.018, 5, 36),
    0.2,
    -0.9,
    8,
    "#1A1613",
  );
  coil.rotation.x = Math.PI / 2;
  b.mesh(
    new THREE.CylinderGeometry(0.25, 0.2, 0.35, 20),
    b.standard("#1A1613", { roughness: 0.3 }),
    [3.7, -0.8, -3.2],
  );
  const oil = b.shader(
    "",
    "",
    `float ripple=sin(vUv.x*80.+uTime*.8)*sin(vUv.y*70.-uTime*.7);float sheen=pow(max(0.,sin(vUv.x*8.+vUv.y*6.+ripple*.12)),12.);color=vec3(.035,.025,.008)+vec3(.48,.29,.045)*sheen*.6;alpha=1.;`,
    {},
    false,
  );
  const surface = b.mesh(
    new THREE.CircleGeometry(0.23, 32),
    oil,
    [3.7, -0.62, -3.2],
  );
  surface.rotation.x = -Math.PI / 2;
  const thread = b.mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.2, -0.1, 0.1),
        new THREE.Vector3(0.35, -0.3, 0.2),
        new THREE.Vector3(0.3, -0.7, 0.23),
      ]),
      20,
      0.006,
      4,
      false,
    ),
    b.shader(
      "",
      "transformed.x+=sin(uTime*.8+position.y*4.)*.025;",
      "color=vec3(.03,.02,.01);alpha=1.;",
      {},
      false,
    ),
    [0.3, -0.9, -0.9],
  );
  thread.castShadow = false;
  addMotes(b, software ? 36 : 180, 180);
  b.counts.looseParts = parts.length;
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      assembly.value = f.state.benchAssembly;
      (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.2 + f.day.value * 0.5;
    },
  };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/worlds/workshop.ts">
<![CDATA[import * as THREE from "three";
import { WORLD_ANCHORS } from "../../logic/chapters";
import { turnedGeometry } from "../../model/lathe";
import type { WorldTextures } from "../textures";
import {
  worldBase,
  floor,
  randomInstances,
  addMotes,
  type BuiltWorld,
} from "./shared";
export function createWorkshop(
  t: WorldTextures,
  software: boolean,
): BuiltWorld {
  const b = worldBase("workshop", WORLD_ANCHORS[1]),
    wood = b.standard("#B8923A", {
      map: t.maps.woodFloorColor,
      bumpMap: t.maps.woodBump,
      bumpScale: 0.025,
    }),
    dark = b.standard("#1A1613");
  floor(b, t);
  b.box([20, 9, 0.2], [0, 1, -7], dark);
  const bamboo = b.standard("#B8923A", {
    map: t.maps.bambooColor,
    bumpMap: t.maps.bambooBump,
    bumpScale: 0.018,
  });
  randomInstances(
    b,
    new THREE.CylinderGeometry(0.05, 0.085, 5.5, 7),
    bamboo,
    software ? 16 : 64,
    91,
    (d, r) => {
      d.position.set(-7 + r() * 5, 0.3, -4 - r() * 2);
      d.rotation.set((r() - 0.5) * 0.18, 0, (r() - 0.5) * 0.28);
      d.scale.setScalar(0.75 + r() * 0.5);
    },
  );
  b.counts.bamboo = software ? 16 : 64;
  b.box([6, 0.22, 2.2], [-3, -0.9, -3], wood);
  for (const x of [-5.5, -0.5])
    for (const z of [-3.8, -2.2]) b.box([0.16, 1.5, 0.16], [x, -1.7, z], wood);
  b.box([0.35, 0.5, 0.4], [-4, -0.45, -2.6], dark);
  b.box([2.5, 0.15, 0.35], [-2.4, -0.45, -2.6], dark);
  const lathe = b.mesh(
    turnedGeometry("handle"),
    wood,
    [-2.5, -0.12, -2.6],
    [1.5, 2.5, 1.5],
  );
  lathe.rotation.z = Math.PI / 2;
  for (let i = 0; i < 8; i++) {
    b.box([0.06, 0.7 + (i % 3) * 0.12, 0.04], [1 + i * 0.45, 1.4, -6.6], dark);
    b.box([0.16, 0.24, 0.08], [1 + i * 0.45, 1, -6.6], wood);
  }
  const windowPaper = b.standard("#F4ECDD", {
    map: t.maps.washiColor,
    emissive: "#F4ECDD",
    emissiveIntensity: 0.45,
    roughness: 1,
  });
  b.box([4.5, 4, 0.08], [3, 2, -6.7], windowPaper);
  for (let i = 0; i < 5; i++)
    b.box([0.06, 4.1, 0.15], [0.8 + i * 1.1, 2, -6.5], wood);
  for (let i = 0; i < 4; i++)
    b.box([4.6, 0.06, 0.15], [3, 0.1 + i * 1.25, -6.5], wood);
  const shafts = b.shader(
    "uniform float uSun;",
    "",
    `float edge=pow(max(0.,1.-abs(vUv.x-.5)*2.),2.);float noise=.75+.25*sin(vWorld.x*5.+vWorld.y*3.+uTime*.3);alpha=edge*(1.-vUv.y)*.13*uSun*noise;color=vec3(.9,.69,.32)*1.7;`,
    { uSun: { value: 1 } },
  );
  shafts.blending = THREE.AdditiveBlending;
  for (let i = 0; i < 4; i++) {
    const shaft = b.mesh(new THREE.PlaneGeometry(1.5, 8), shafts, [
      2 + i * 0.8,
      0.2,
      -3.5 + i * 0.45,
    ]);
    shaft.rotation.z = -0.45;
  }
  b.counts.shafts = 4;
  addMotes(b, software ? 64 : 320, 33, true);
  addMotes(b, software ? 36 : 180, 98);
  return {
    ...b,
    update(f) {
      b.update(f);
      if (!b.group.visible) return;
      shafts.uniforms.uSun.value = f.day.sunIntensityMultiplier;
      windowPaper.emissiveIntensity = 0.25 + f.day.value * 0.6;
    },
  };
}
]]>
    </file>
  </files>
</template>
