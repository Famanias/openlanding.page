<template slug="amaoto" name="AMAOTO">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1"
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
    <file path="src/app/(amaoto)/amaoto/audio/SoundToggle.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { RainSound } from "./RainSound";
import type { DirectorState } from "../scene/director";
export function SoundToggle({
  director,
}: {
  director: RefObject<DirectorState>;
}) {
  const [enabled, setEnabled] = useState(false),
    [preferred, setPreferred] = useState(false),
    audio = useRef<RainSound | null>(null);
  useEffect(() => {
    try {
      setPreferred(localStorage.getItem("amaoto-rain-sound") === "on");
    } catch {}
    const timer = setInterval(() => {
      const state = director.current;
      audio.current?.setIntensity(state.rainIntensity);
    }, 300);
    const visibility = () => audio.current?.visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
      audio.current?.dispose();
      audio.current = null;
    };
  }, [director]);
  return (
    <button
      className="am-sound"
      type="button"
      aria-pressed={enabled}
      title={
        !enabled && preferred
          ? "Your saved preference is on. Click to start sound."
          : undefined
      }
      onClick={() => {
        const next = !enabled;
        try {
          audio.current ??= new RainSound();
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
      <span>Rain sound: {enabled ? "on" : "off"}</span>
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
        <span>Name</span>
        <input
          id="am-name"
          name="name"
          autoComplete="name"
          placeholder=" "
          maxLength={160}
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "am-name-error" : undefined}
        />
        {errors.name && <small id="am-name-error">{errors.name}</small>}
      </label>
      <label>
        <span>Email</span>
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
          aria-describedby={errors.email ? "am-email-error" : undefined}
        />
        {errors.email && <small id="am-email-error">{errors.email}</small>}
      </label>
      <label>
        <span>Occasion</span>
        <input
          id="am-occasion"
          name="occasion"
          placeholder=" "
          maxLength={160}
          value={fields.occasion}
          onChange={(e) => setFields({ ...fields, occasion: e.target.value })}
          aria-invalid={Boolean(errors.occasion)}
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".am-line > span")
          .forEach((line, i) => {
            gsap.from(line, {
              yPercent: 110,
              duration: 1.1,
              delay: (i % 2) * 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: line.parentElement,
                start: "top 95%",
                once: true,
              },
            });
          });
        gsap.utils
          .toArray<HTMLElement>(".am-chapter-copy > p, .am-kicker")
          .forEach((el) =>
            gsap.from(el, {
              filter: "blur(5px)",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 97%", once: true },
            }),
          );
        gsap.utils.toArray<HTMLElement>("[data-roll]").forEach((el) => {
          const count = { value: 0 };
          gsap.to(count, {
            value: Number(el.dataset.roll),
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 96%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(count.value));
            },
          });
        });
        gsap.from(".am-vertical", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.7,
          delay: 0.6,
          ease: "power2.inOut",
        });
      }, page);
      return () => context.revert();
    });
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
      media.revert();
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
import { ThreadLine } from "../ui/ThreadLine";
import { SectionBackdrop } from "../bg/SectionBackdrop";
import { SoundToggle } from "../audio/SoundToggle";
import { Motion } from "../motion/Motion";
import { WagasaCanvas } from "./WagasaCanvas";
import { ScrollDirector } from "./ScrollDirector";
import { initialDirector } from "./director";
import { AnatomyControls } from "./AnatomyControls";
import { anatomyReducer, createAnatomy, isPart, type PartId } from "./anatomy";
export function AmaotoShell() {
  const director = useRef(initialDirector());
  const [dyeOrigin, setDyeOrigin] = useState<[number, number]>([0.5, 0.5]);
  const [chapter, setChapter] = useState(0);
  const [anatomy, dispatchAnatomy] = useReducer(
    anatomyReducer,
    undefined,
    createAnatomy,
  );
  const [hovered, setHovered] = useState<PartId>();
  const changeChapter = useCallback((next: number) => {
    setChapter(next);
    setHovered(undefined);
    dispatchAnatomy({ type: "overview" });
  }, []);
  const [angle, setAngle] = useState(18),
    [rain, setRain] = useState(false),
    [colourway, setColourway] = useState("cream"),
    [closed, setClosed] = useState(false);
  const colour = useMemo(
    () => COLOURWAYS.find((x) => x.id === colourway) ?? COLOURWAYS[0],
    [colourway],
  );
  const select = useCallback((id: string, index?: number) => {
    if (isPart(id))
      dispatchAnatomy({ type: "select", part: id, ribIndex: index });
  }, []);
  const finishAction = useCallback(
    (id: number) => dispatchAnatomy({ type: "finish", id }),
    [],
  );
  useEffect(() => {
    const highlight = (event: Event) => {
      const id = (event as CustomEvent<unknown>).detail;
      setHovered(isPart(id) ? id : undefined);
    };
    const pull = (event: Event) => {
      const value = (event as CustomEvent<unknown>).detail;
      if (typeof value === "number" && Number.isFinite(value))
        dispatchAnatomy({ type: "open", value });
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && director.current.chapter === 1) {
        dispatchAnatomy({ type: "overview" });
        setHovered(undefined);
      }
    };
    document.addEventListener("amaoto-highlight", highlight);
    document.addEventListener("amaoto-runner", pull);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("amaoto-highlight", highlight);
      document.removeEventListener("amaoto-runner", pull);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <main
      className="am-page"
      style={{ "--am-dye": colour.color } as React.CSSProperties}
    >
      <SectionBackdrop />
      <header className="am-header">
        <Logo />
        <nav aria-label="Chapters">
          {[
            { id: "structure", label: "Structure", n: 1 },
            { id: "light", label: "Light", n: 2 },
            { id: "making", label: "Making", n: 4 },
            { id: "commission", label: "Commission", n: 5 },
          ].map((link) => (
            <a
              href={`#${link.id}`}
              key={link.id}
              aria-current={chapter === link.n ? "step" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <SoundToggle director={director} />
        <span className="am-header__counter">
          <b data-rib-count>00</b> / 40 ribs open
        </span>
      </header>
      <div className="am-stage">
        <div className="am-mobile-band" />
        <WagasaCanvas
          director={director}
          onPart={select}
          hovered={hovered}
          anatomy={anatomy}
          onActionFinish={finishAction}
          sun={angle}
          dyeOrigin={dyeOrigin}
          rain={rain}
          colour={colour.color}
          motif={colour.motif}
          closed={closed}
        />
        <AnatomyControls
          active={chapter === 1}
          state={anatomy}
          dispatch={dispatchAnatomy}
          onHighlight={setHovered}
        />
        <svg className="am-leader" aria-hidden="true">
          <path data-leader />
        </svg>
      </div>
      <ThreadLine />
      <Hero />
      <Structure state={anatomy} dispatch={dispatchAnatomy} />
      <Light angle={angle} onAngle={setAngle} rain={rain} onRain={setRain} />
      <Canopy
        value={colourway}
        onChange={(id, origin) => {
          setColourway(id);
          setDyeOrigin(origin ?? [0.5, 0.5]);
        }}
      />
      <Making />
      <Commission canopy={colour.label} onSuccess={() => setClosed(true)} />
      <footer className="am-footer">
        <Logo />
        <span>AMAOTO / Kurokawa, Nagano / 2026</span>
        <Hanko />
        <a href="#top">Back to top ↑</a>
        <span className="am-footer__drip" aria-hidden="true" />
      </footer>
      <ScrollDirector directorRef={director} onChapter={changeChapter} />
      <Motion />
      <noscript>
        <style>
          {
            "[data-reveal],.am-line>span{opacity:1!important;transform:none!important}.am-sound,.am-runner-control,.am-inspector-detail{display:none}.am-poster{display:block!important}"
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
    <file path="src/app/(amaoto)/amaoto/scene/director.ts">
<![CDATA[import type { WagasaPose } from "../model/createWagasaModel";
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
  progress: number;
  chapter: number;
  local: number;
  rect: StageRect;
  reduced: boolean;
  introStart: number;
  interrupted: boolean;
  ready: boolean;
  rainIntensity: number;
  stageOpacity: number;
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
    stageOpacity: 1,
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
export function fitsWholeUmbrella(chapter: number, inspectedPart: string | null) {
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
    <file path="src/app/(amaoto)/amaoto/scene/makingSequence.ts">
<![CDATA[import { MAKING_STEPS } from "../data/steps";
import { clamp01 } from "../model/rig";
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
    <file path="src/app/(amaoto)/amaoto/scene/ScrollDirector.tsx">
<![CDATA["use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { bandLayout, stageHandoff, stageTier } from "./staging";
import {
  canPinMaking,
  makingScrollDistance,
  makingSequence,
  MAKING_PARTS,
} from "./makingSequence";
import {
  CHAPTERS,
  FRAMES,
  sampleChapter,
  type DirectorState,
  type StageRect,
} from "./director";
export function ScrollDirector({
  directorRef,
  onChapter,
}: {
  directorRef: RefObject<DirectorState>;
  onChapter: (n: number) => void;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const sections = CHAPTERS.map((id) => document.getElementById(id)!);
    const copyBlocks = sections.flatMap((el) =>
      Array.from(
        el.querySelectorAll<HTMLElement>(".am-chapter-copy,.am-control"),
      ),
    );
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let starts: number[] = [],
      slots: StageRect[] = [],
      lastChapter = -1,
      lastY = window.scrollY,
      cancelled = false;
    const initialHash = location.hash;
    let userNavigated = false;
    const noteNavigation = () => {
      userNavigated = true;
    };
    const navigationEvents = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ] as const;
    navigationEvents.forEach((event) =>
      window.addEventListener(event, noteNavigation, { passive: true }),
    );
    let lenis: Lenis | undefined;
    const making = sections[4];
    let pinDistance = 0;
    const layoutMaking = () => {
      const pin = canPinMaking(innerWidth, innerHeight, query.matches);
      pinDistance = pin ? makingScrollDistance(innerHeight) : 0;
      making.dataset.pinned = String(pin);
      page.dataset.makingPinned = String(pin);
      making.style.setProperty("--am-making-distance", `${pinDistance}px`);
    };
    const measure = () => {
      starts = sections.map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      slots = sections.map((el, index) => {
        const anchor = el.querySelector<HTMLElement>("[data-stage-anchor]")!;
        const r = anchor.getBoundingClientRect();
        if (innerWidth <= 900) {
          const band = bandLayout(
            innerWidth,
            innerHeight,
            index,
            index === 4 && pinDistance > 0,
          );
          return {
            left: 12,
            top: band.top,
            width: innerWidth - 24,
            height: band.height,
          };
        }
        return {
          left: r.left,
          top:
            r.top -
            (
              el.querySelector<HTMLElement>("[data-chapter-frame]") ?? el
            ).getBoundingClientRect().top,
          width: r.width,
          height: r.height,
        };
      });
    };
    const update = () => {
      const y = window.scrollY;
      let chapter = 0;
      for (let i = 0; i < starts.length; i++)
        if (y >= starts[i] - 2) chapter = i;
      const end =
        starts[chapter + 1] ??
        document.documentElement.scrollHeight - window.innerHeight;
      const documentLocal = Math.max(
        0,
        Math.min(1, (y - starts[chapter]) / Math.max(1, end - starts[chapter])),
      );
      const held =
        chapter === 4 && pinDistance > 0
          ? makingSequence(y, starts[4], pinDistance, innerHeight)
          : null;
      const local = held?.progress ?? documentLocal;
      const transitionLocal = held?.transition ?? local;
      const frame = sampleChapter(chapter, transitionLocal),
        rectA = slots[chapter],
        rectB = slots[Math.min(chapter + 1, 5)];
      const t = Math.max(0, Math.min(1, (transitionLocal - 0.62) / 0.38)),
        blend = t * t * (3 - 2 * t);
      const reduced = query.matches,
        stacked = innerWidth <= 900;
      const obstacles = copyBlocks
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < innerHeight)
        .map((r) => ({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        }));
      const handoff = stageHandoff(
        rectA,
        rectB,
        blend,
        obstacles,
        reduced,
        stacked,
        chapter === 1 ? 150 : 0,
      );
      const rect = handoff.rect;
      page.dataset.stageTier = stageTier(innerWidth);
      page.style.setProperty(
        "--am-band-bottom",
        `${rect.top + rect.height + (chapter === 1 ? 154 : 30)}px`,
      );
      Object.assign(
        directorRef.current,
        reduced
          ? {
              ...FRAMES[chapter],
              open: 1,
              explode: 0,
              ...(chapter === 5 ? { camera: [2, 3, 11], scale: 0.92 } : {}),
            }
          : frame,
        {
          chapter,
          local,
          rect,
          stageOpacity: handoff.opacity,
          reduced,
          progress:
            y /
            Math.max(1, document.documentElement.scrollHeight - innerHeight),
          ready: true,
        },
      );
      if (y > 30) directorRef.current.interrupted = true;
      page.style.setProperty(
        "--scroll-progress",
        String(directorRef.current.progress),
      );
      page.style.setProperty("--am-scene-progress", String(local));
      page.dataset.chapter = String(chapter);
      page
        .querySelectorAll<HTMLElement>("[data-scene]")
        .forEach((scene, i) =>
          scene.style.setProperty(
            "--scene-opacity",
            String(
              reduced
                ? Number(i === chapter)
                : i === chapter
                  ? chapter === 5
                    ? 1
                    : 1 - blend
                  : i === chapter + 1
                    ? blend
                    : 0,
            ),
          ),
        );
      const header = page.querySelector<HTMLElement>(".am-header");
      if (header && Math.abs(y - lastY) > 2) {
        header.dataset.hidden = String(y > lastY && y > 160);
        lastY = y;
      }
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        onChapter(chapter);
      }
      const steps = page.querySelectorAll<HTMLElement>(".am-making li");
      const step =
        held?.step ??
        Math.min(steps.length - 1, Math.floor(local * steps.length));
      steps.forEach((el, i) => {
        const active = chapter === 4 && i === step;
        el.classList.toggle("is-current", active);
        if (active) el.setAttribute("aria-current", "step");
        else el.removeAttribute("aria-current");
      });
      if (chapter === 4) {
        making.dataset.step = String(step + 1);
        making.dataset.holding = String(Boolean(held && held.release === 0));
        const counter = making.querySelector("[data-making-counter]");
        const label = `${String(step + 1).padStart(2, "0")} / ${steps.length}`;
        if (counter && counter.textContent !== label)
          counter.textContent = label;
      } else making.dataset.holding = "false";
      if (chapter === 4 && !reduced) {
        directorRef.current.explode = Math.sin(local * Math.PI) * 0.9;
        directorRef.current.highlight = MAKING_PARTS[step];
      }
    };
    layoutMaking();
    measure();
    update();
    const trigger = ScrollTrigger.create({
      trigger: page,
      start: "top top",
      end: "bottom bottom",
      onUpdate: update,
      onRefresh: () => {
        measure();
        update();
      },
    });
    const frame = (time: number) => lenis?.raf(time * 1000);
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      gsap.ticker.remove(frame);
      if (!query.matches && matchMedia("(pointer:fine)").matches) {
        lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          anchors: { offset: -88 },
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(frame);
      }
      const wasHolding =
        directorRef.current.chapter === 4 && making.dataset.pinned === "true";
      layoutMaking();
      measure();
      if (wasHolding && query.matches)
        window.scrollTo({ top: starts[4], behavior: "instant" });
      ScrollTrigger.refresh();
      update();
    };
    configure();
    query.addEventListener("change", configure);
    const resize = () => {
      const chapter = directorRef.current.chapter,
        local = directorRef.current.local;
      const holding =
        chapter === 4 &&
        making.dataset.pinned === "true" &&
        making.dataset.holding === "true";
      layoutMaking();
      measure();
      lenis?.resize();
      if (holding) {
        const top = starts[4] + (pinDistance ? local * pinDistance : 0);
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo({ top, behavior: "instant" });
      }
      ScrollTrigger.refresh();
      update();
    };
    window.addEventListener("resize", resize);
    // Native scrolling also updates the still scene when motion is reduced.
    window.addEventListener("scroll", update, { passive: true });
    void document.fonts.ready.then(() => {
      if (!cancelled) {
        measure();
        directorRef.current.introStart = performance.now() + 650;
        // Pin spacing is added after server rendering. Honour an initial later-chapter
        // fragment against the final layout, without overriding a visitor's own input.
        const anchor = CHAPTERS.findIndex((id) => `#${id}` === initialHash);
        if (anchor > 4 && !userNavigated && location.hash === initialHash) {
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(starts[anchor], { immediate: true });
          } else window.scrollTo({ top: starts[anchor], behavior: "instant" });
        }
        update();
      }
    });
    return () => {
      cancelled = true;
      trigger.kill();
      lenis?.destroy();
      gsap.ticker.remove(frame);
      query.removeEventListener("change", configure);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", update);
      navigationEvents.forEach((event) =>
        window.removeEventListener(event, noteNavigation),
      );
      delete making.dataset.pinned;
      delete making.dataset.holding;
      delete page.dataset.makingPinned;
      making.style.removeProperty("--am-making-distance");
    };
  }, [directorRef, onChapter]);
  return null;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/staging.ts">
<![CDATA[import type { StageRect } from "./director";
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
/** Fade in reserved slots; never drag a canvas across a readable column. */
export function stageHandoff(
  current: StageRect,
  next: StageRect,
  progress: number,
  obstacles: StageRect[],
  reduced: boolean,
  stacked: boolean,
  extraHeight = 0,
) {
  const t = Math.max(0, Math.min(1, progress)),
    incoming = !reduced && t >= 0.5;
  const rect = incoming ? next : current;
  const same = (["left", "top", "width", "height"] as const).every(
    (key) => Math.abs(current[key] - next[key]) < 0.5,
  );
  let opacity =
    reduced || same
      ? 1
      : t < 0.5
        ? 1 - Math.min(1, t / 0.42)
        : Math.max(0, Math.min(1, (t - 0.58) / 0.42));
  if (!stacked) {
    const occupied = { ...rect, height: rect.height + extraHeight };
    for (const block of obstacles) {
      if (
        occupied.left >= block.left + block.width ||
        occupied.left + occupied.width <= block.left
      )
        continue;
      if (overlaps(occupied, block)) {
        opacity = 0;
        break;
      }
      const gap = Math.max(
        block.top - (occupied.top + occupied.height),
        occupied.top - (block.top + block.height),
      );
      if (!reduced)
        opacity = Math.min(opacity, Math.max(0, Math.min(1, gap / 64)));
    }
  }
  return { rect, opacity };
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/WagasaCanvas.tsx">
<![CDATA["use client";
import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
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
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      element.dataset.fallback = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);
    const key = new THREE.DirectionalLight("#F4ECDD", 3.3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.normalBias = 0.018;
    key.shadow.bias = -0.0001;
    const fill = new THREE.HemisphereLight("#F4ECDD", "#2B3A55", 0.8),
      rimLight = new THREE.DirectionalLight("#F2B8C6", 1);
    rimLight.position.set(-3, 3, -5);
    scene.add(key, fill, rimLight, key.target);
    const environmentScene = new THREE.Scene();
    environmentScene.background = new THREE.Color("#F4ECDD");
    const environmentGeometry = new THREE.BoxGeometry(1, 1, 1),
      environmentMaterial = new THREE.MeshBasicMaterial({ color: "#F4ECDD" });
    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(environmentGeometry, environmentMaterial);
      panel.position.set(i === 0 ? -4 : 4, 3, i === 2 ? -3 : 2);
      panel.scale.set(3, 5, 2);
      environmentScene.add(panel);
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      environment = pmrem.fromScene(environmentScene, 0.1);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.4;
    pmrem.dispose();
    environmentGeometry.dispose();
    environmentMaterial.dispose();
    const model = createWagasaModel({
      open: 0,
      canopyColor: values.current.colour,
      motif: values.current.motif,
    });
    scene.add(model);
    const rig = model.userData.sculptRuntime as WagasaRuntime;
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.ShadowMaterial({ opacity: 0.15, color: "#1A1613" }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    ground.receiveShadow = true;
    scene.add(ground);
    const rainGeometry = new THREE.CylinderGeometry(0.003, 0.003, 0.18, 3),
      rainMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
    const streaks = new THREE.InstancedMesh(rainGeometry, rainMaterial, 180);
    streaks.frustumCulled = false;
    scene.add(streaks);
    const dripGeometry = new THREE.SphereGeometry(0.014, 5, 5),
      dripMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0,
      });
    const drips = new THREE.InstancedMesh(dripGeometry, dripMaterial, 12);
    drips.frustumCulled = false;
    scene.add(drips);
    const rippleGeometry = new THREE.RingGeometry(0.97, 1, 48),
      rippleMaterial = new THREE.MeshBasicMaterial({
        color: "#F4ECDD",
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    const ripples = Array.from({ length: 8 }, () => {
      const mesh = new THREE.Mesh(rippleGeometry, rippleMaterial);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = -2.48;
      scene.add(mesh);
      return mesh;
    });
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
      wantedCamera = new THREE.Vector3();
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
    let lastTime = performance.now(),
      frame = 0,
      introOpen = 0,
      lastSignature = "",
      lastCounter = -1,
      rainLevel = 0,
      lastRect = "",
      lastViewId = -1,
      lastScene = -1,
      actionId = -1,
      actionStart = 0,
      finishedAction = -1,
      revealAmount = 0;
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
      if (event.pointerType === "touch") return;
      const hit = hitAt(event);
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
      if (event.pointerType === "touch" || event.button !== 0) return;
      downPart = hitAt(event)?.object.userData.partId as string | undefined;
      if (!downPart) return;
      dragging = true;
      dragged = false;
      startX = lastX = event.clientX;
      startY = event.clientY;
      pointerId = event.pointerId;
      introOpen = rig.open;
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
        if (renderer.domElement.hasPointerCapture(event.pointerId))
          renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };
    const click = (event: PointerEvent) => {
      if (dragged) {
        dragged = false;
        return;
      }
      const hit = hitAt(event),
        id = hit?.object.userData.partId as string | undefined;
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
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      lastSignature = "";
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      const p = values.current,
        s = p.director.current;
      if (!s.ready) {
        frame = requestAnimationFrame(tick);
        return;
      }
      element.style.opacity = String(s.stageOpacity);
      element.style.pointerEvents = s.stageOpacity > 0.5 ? "auto" : "none";
      const inspector = document.querySelector<HTMLElement>(
        "[data-inspector-overlay]",
      );
      if (inspector) {
        inspector.style.opacity = String(s.stageOpacity);
        inspector.style.visibility =
          s.stageOpacity > 0.01 ? "visible" : "hidden";
      }
      const rectKey = JSON.stringify(s.rect);
      if (rectKey !== lastRect) {
        Object.assign(element.style, {
          left: `${s.rect.left}px`,
          top: `${s.rect.top}px`,
          width: `${s.rect.width}px`,
          height: `${s.rect.height}px`,
        });
        lastRect = rectKey;
        resize();
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
      let openness = s.open;
      const intro = Math.min(1, Math.max(0, (now - s.introStart) / 2400));
      if (!s.reduced && s.chapter === 0) {
        if (s.interrupted) introOpen = Math.min(1, introOpen + dt * 4);
        else introOpen = intro * intro * (3 - 2 * intro);
        openness = introOpen;
      } else if (s.reduced) introOpen = 1;
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
      model.updateMatrixWorld(true);
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
      const angle = (p.sun * Math.PI) / 180;
      key.position.set(Math.sin(angle) * 5, 3.5, Math.cos(angle) * 5);
      key.intensity = 1.5 + Math.cos(angle) * 0.6;
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
        } else {
          wantedLook.set(0, 0.2, 0);
          wantedCamera.set(3, -1.2, 9.3);
        }
        wantedCamera.lerp(new THREE.Vector3().fromArray(s.camera), exit);
        wantedLook.lerp(new THREE.Vector3().fromArray(s.target), exit);
      }
      const fitWholeObject = fitsWholeUmbrella(
        s.chapter,
        active ? anatomy.part : null,
      );
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
        const blend = s.reduced ? 1 : 1 - Math.exp(-dt * 7);
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
      camera.updateMatrixWorld();
      const leader = document.querySelector<SVGSVGElement>(".am-leader");
      if (leader) leader.dataset.active = "false";
      if (active) {
        const r = element.getBoundingClientRect(),
          nav = document.querySelector<HTMLElement>(
            "[data-inspector-navigation]",
          );
        if (nav)
          Object.assign(nav.style, {
            left: `${r.left + 16}px`,
            top: `${r.bottom + 4}px`,
            width: `${r.width - 32}px`,
          });
        const markers = PARTS.map((part, index) => ({
          part,
          index,
          source: toScreen(rig.point(part.id, anatomy.ribIndex)),
          y: 0,
        })).sort((a, b) => a.source.y - b.source.y);
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
        for (const { part, index, source, y } of markers) {
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
            shown = !anatomy.part || anatomy.part === part.id;
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
      const intensity = s.chapter === 2 ? (p.rain ? 0.8 : 0) : s.rain;
      rainLevel = s.reduced
        ? 0
        : THREE.MathUtils.damp(rainLevel, intensity, 4, dt);
      s.rainIntensity = s.reduced ? intensity : rainLevel;
      document
        .querySelector<HTMLElement>(".am-page")
        ?.style.setProperty("--am-rain", String(rainLevel));
      element.dataset.open = openness.toFixed(3);
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
      element.dataset.cameraSettled = String(
        camera.position.distanceTo(wantedCamera) < 0.002 &&
          look.distanceTo(wantedLook) < 0.002,
      );
      element.dataset.sun = String(p.sun);
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
      if (rainLevel > 0.001) {
        for (let i = 0; i < 180; i++) {
          dummy.position.set(
            Math.sin(i * 31.7) * 4,
            4 - ((now * 0.0025 + i * 0.227) % 8),
            Math.cos(i * 19.3) * 2,
          );
          dummy.rotation.set(0, 0, -0.14);
          dummy.scale.setScalar(1);
          dummy.updateMatrix();
          streaks.setMatrixAt(i, dummy.matrix);
        }
        streaks.instanceMatrix.needsUpdate = true;
        for (let i = 0; i < 12; i++) {
          const tip = model.localToWorld(
            new THREE.Vector3().copy(ribPoint(openness, i * 3, 1, s.explode)),
          );
          const fall = (now / 1400 + i * 0.137) % 1;
          dummy.position.copy(tip);
          dummy.position.y -= fall * 4;
          dummy.scale.set(0.7, 1.8, 0.7);
          dummy.rotation.set(0, 0, 0);
          dummy.updateMatrix();
          drips.setMatrixAt(i, dummy.matrix);
        }
        drips.instanceMatrix.needsUpdate = true;
      }
      rainMaterial.opacity = rainLevel * 0.65;
      dripMaterial.opacity = rainLevel;
      ripples.forEach((mesh, i) => {
        mesh.visible = rainLevel > 0.005;
        const t = (now / 2200 + i * 0.22) % 1;
        mesh.scale.setScalar(0.04 + t * 0.7);
        mesh.position.x = Math.sin(i * 12) * 2;
        mesh.position.z = Math.cos(i * 6) * 1.2;
      });
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
      reflection.visible = s.chapter === 5;
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
      if (signature !== lastSignature || rig.animating || rainLevel > 0.001) {
        renderer.render(scene, camera);
        lastSignature = signature;
      }
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) {
        lastTime = performance.now();
        lastSignature = "";
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    camera.position.set(4, 3.1, 10);
    model.updateMatrixWorld(true);
    fitUmbrellaCamera(
      camera.position,
      new THREE.Vector3(0, 0.2, 0),
      camera.aspect,
      model.matrixWorld,
      camera.fov,
    );
    camera.lookAt(0, 0.2, 0);
    ripples.forEach((mesh) => {
      mesh.visible = false;
    });
    reflection.visible = false;
    renderer.render(scene, camera);
    element.dataset.ready = "true";
    element.dataset.open = "0.000";
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointerup", release);
      renderer.domElement.removeEventListener("pointercancel", release);
      renderer.domElement.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("click", click);
      rig.dispose();
      environment.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      rainGeometry.dispose();
      rainMaterial.dispose();
      dripGeometry.dispose();
      dripMaterial.dispose();
      rippleGeometry.dispose();
      rippleMaterial.dispose();
      reflectionMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div
      ref={host}
      className="am-canvas"
      role="img"
      aria-label="Interactive procedural wagasa model"
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
        <span className="am-kicker">03 / colourways</span>
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
      </div>
      <span className="am-stage-caption">
        Drag to turn / painted in the paper
      </span>
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
        <span className="am-kicker">05 / your umbrella</span>
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
        <span className="am-kicker">02 / translucency</span>
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
          <span className="am-kicker">04 / the making</span>
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
}: {
  state: AnatomyState;
  dispatch: (event: AnatomyEvent) => void;
}) {
  return (
    <section
      id="structure"
      className="am-section am-structure"
      data-inspecting={Boolean(state.part)}
    >
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">01 / anatomy</span>
        <h2>
          <span className="am-line">
            <span>Forty ribs,</span>
          </span>
          <em className="am-line">
            <span>one breath.</span>
          </em>
        </h2>
        <AnatomyDetails state={state} dispatch={dispatch} />
        <div className="am-inspector-spec">
          <span>40 ribs / one circumference</span>
          <span>81 quiet making steps</span>
        </div>
        <noscript>
          <dl className="am-anatomy-fallback">
            {PARTS.map((part) => (
              <div key={part.id}>
                <dt>{part.name}</dt>
                <dd>{part.description}</dd>
              </div>
            ))}
          </dl>
        </noscript>
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
  </files>
</template>
