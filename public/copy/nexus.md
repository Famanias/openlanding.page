<template slug="nexus" name="nexus">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(nexus)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./nexus/nexus.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nexus-serif",
});

export const metadata: Metadata = {
  title: "nexus — Marketing That Feels Human",
  description:
    "High-contrast organic and highly creative marketing agency website with tactile clay sculptures, hand-drawn botanical illustrations, and editorial serif typography.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F1E8",
  colorScheme: "light",
};

export default function NexusLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body className="nx-body">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.nx-mobile-panel{display:none!important}.nx-modal-backdrop{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(nexus)/nexus/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

export function Picture({
  assetKey,
  alt,
  className = "",
}: {
  assetKey: string;
  alt: string;
  className?: string;
}) {
  const asset = ASSETS[assetKey];
  if (!asset) {
    return <div className={className} role="img" aria-label={alt} />;
  }
  return (
    <img
      src={`/templates/nexus/${assetKey}-1600.webp`}
      alt={alt}
      className={className}
      width={asset.w}
      height={asset.h}
    />
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <rect width="40" height="40" rx="10" fill="#F5F1E8"/>
  <circle cx="20" cy="20" r="16" fill="#F9DEC7"/>
  <path d="M12 28C14 20 20 12 28 12M12 28C20 26 26 20 28 12" fill="none" stroke="#A45337" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="28" cy="12" r="3.5" fill="#777B45"/>
  <circle cx="12" cy="28" r="2.5" fill="#CE916E"/>
</svg>
]]>
    </file>
    <file path="src/app/(nexus)/nexus/nexus.css">
<![CDATA[/* ==========================================================================
       01. EXACT COLOR TOKENS & SERIF-ONLY TYPOGRAPHY SYSTEM
       ========================================================================== */
    :root {
      --paper: #F5F1E8;          /* main page background; dominant */
      --paper-light: #FAF8F2;    /* card or inset surfaces */
      --ink: #362E26;            /* rich espresso / almost black text */
      --ink-deep: #221B15;       /* deepest charcoal-espresso for display type */
      --ink-muted: #5C5044;      /* warm secondary body copy */
      --terracotta: #A45337;     /* principal accent and CTAs */
      --terracotta-deep: #82422D;
      --peach: #F9DEC7;          /* large organic backdrop shapes */
      --peach-dark: #F6D3B4;
      --clay: #CE916E;           /* sculpture earth tone */
      --olive: #777B45;          /* wordmark / secondary botanical detail */
      --sage: #4C7262;           /* plant leaves / character clothing */
      --sage-tint: #C8D3B8;      /* soft botanical seal fill */
      --mustard: #EFB15C;        /* tiny badge or flower accent */
      --stroke: #DCCEBB;         /* delicate outlines and dividers */
      --serif: var(--font-nexus-serif), "Iowan Old Style", "Baskerville", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif;
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.34, 1.45, 0.64, 1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      font-family: var(--serif) !important;
    }

    html {
      background-color: var(--paper);
      color: var(--ink);
      font-family: var(--serif);
      font-size: 16px;
      line-height: 1.6;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    body, .nx-body {
      margin: 0;
      padding: 0;
      background-color: var(--paper);
      color: var(--ink);
      font-family: var(--serif);
      overflow-x: hidden;
      position: relative;
      /* Subtle tactile paper weave using pure CSS gradients */
      background-image:
        radial-gradient(rgba(164, 83, 55, 0.03) 1px, transparent 0),
        radial-gradient(rgba(54, 46, 38, 0.025) 1px, transparent 0);
      background-size: 28px 28px;
      background-position: 0 0, 14px 14px;
    }

    img, svg {
      max-width: 100%;
      display: block;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button, input, textarea, select {
      font: inherit;
      color: inherit;
      background: none;
      border: none;
    }

    button {
      cursor: pointer;
    }

    :focus-visible {
      outline: 2px solid var(--terracotta);
      outline-offset: 4px;
      border-radius: 4px;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ==========================================================================
       02. LAYOUT CONTAINERS & REUSABLE EDITORIAL COMPONENTS
       ========================================================================== */
    .nx-container {
      width: 100%;
      max-width: 1360px;
      margin: 0 auto;
      padding: 0 clamp(1.25rem, 4vw, 3.5rem);
      position: relative;
      z-index: 2;
    }

    /* Tactile Primary Button */
    .nx-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.65rem;
      background-color: var(--terracotta);
      color: var(--paper-light);
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 0.95rem 2.1rem;
      border-radius: 999px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 18px -4px rgba(130, 66, 45, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.18);
      transition: transform 0.25s var(--ease-out-expo), background-color 0.25s ease, box-shadow 0.25s ease;
      white-space: nowrap;
      user-select: none;
    }

    .nx-btn::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: var(--terracotta-deep);
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.35s var(--ease-out-expo);
      z-index: 0;
      border-radius: inherit;
    }

    .nx-btn:hover::before,
    .nx-btn:focus-visible::before {
      transform: scaleX(1);
    }

    .nx-btn > * {
      position: relative;
      z-index: 1;
    }

    .nx-btn:hover {
      box-shadow: 0 10px 24px -4px rgba(130, 66, 45, 0.42);
    }

    .nx-btn:active,
    .nx-btn.is-pressed {
      transform: scale(0.96) translateY(2px) !important;
      box-shadow: 0 3px 10px -2px rgba(130, 66, 45, 0.3);
    }

    .nx-btn-arrow {
      width: 18px;
      height: 14px;
      transition: transform 0.3s var(--ease-spring);
      flex-shrink: 0;
    }

    .nx-btn:hover .nx-btn-arrow {
      transform: translateX(6px);
    }

    /* Drawn Editorial Link */
    .nx-drawn-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 1.05rem;
      font-style: italic;
      color: var(--ink);
      position: relative;
      padding-bottom: 4px;
      white-space: nowrap;
    }

    .nx-drawn-link::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: var(--terracotta);
      border-radius: 2px;
      transform: scaleX(0.28);
      transform-origin: left center;
      transition: transform 0.32s var(--ease-out-expo);
    }

    .nx-drawn-link:hover::after,
    .nx-drawn-link:focus-visible::after {
      transform: scaleX(1);
    }

    /* Section Header Pattern */
    .nx-kicker {
      display: inline-block;
      font-size: 0.85rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--terracotta);
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .nx-section-title {
      font-size: clamp(2.4rem, 4.8vw, 4.4rem);
      line-height: 1.06;
      letter-spacing: -0.025em;
      color: var(--ink-deep);
      margin: 0 0 1.25rem 0;
      font-weight: 700;
      text-wrap: balance;
    }

    /* ==========================================================================
       03. TOP NAVIGATION BAR (3-Zone Contract + Bespoke Paper Mobile Menu)
       ========================================================================== */
    .nx-header {
      position: relative;
      z-index: 40;
      padding: 1.65rem 0 0.75rem;
    }

    .nx-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .nx-wordmark {
      font-size: clamp(2.1rem, 3vw, 2.65rem);
      font-weight: 700;
      color: var(--olive);
      letter-spacing: -0.03em;
      line-height: 1;
      display: inline-block;
      transform-origin: left center;
      transition: transform 0.3s var(--ease-spring), color 0.25s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .nx-wordmark:hover {
      transform: rotate(-2deg) translateY(-1px);
      color: var(--terracotta);
    }

    .nx-nav-links {
      display: flex;
      align-items: center;
      gap: clamp(1.6rem, 3.2vw, 3.1rem);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nx-nav-link {
      font-size: 1.08rem;
      color: var(--ink-deep);
      padding: 0.35rem 0;
      position: relative;
      display: inline-block;
      white-space: nowrap;
      transition: color 0.2s ease, transform 0.2s var(--ease-out-expo);
    }

    .nx-nav-link::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 2.5px;
      background-color: var(--terracotta);
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.28s var(--ease-out-expo);
    }

    .nx-nav-link:hover,
    .nx-nav-link.is-active {
      color: var(--terracotta);
    }

    .nx-nav-link:hover {
      transform: translateY(-1px);
    }

    .nx-nav-link:hover::after,
    .nx-nav-link.is-active::after {
      transform: scaleX(1);
    }

    .nx-nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .nx-nav-cta {
      padding: 0.68rem 1.65rem;
      font-size: 0.98rem;
      letter-spacing: 0.01em;
      background-color: #93452B;
    }

    .nx-mobile-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      min-width: 46px;
      min-height: 46px;
      padding: 0.5rem 0.95rem;
      border-radius: 999px;
      border: 1.5px solid var(--ink);
      background-color: var(--paper-light);
      color: var(--ink-deep);
      font-size: 0.92rem;
      font-weight: 600;
    }

    /* Bespoke Warm Paper Mobile Menu Panel */
    .nx-mobile-panel {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 100;
      background-color: rgba(54, 46, 38, 0.35);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.32s var(--ease-out-expo);
    }

    .nx-mobile-panel.is-open {
      opacity: 1;
      pointer-events: auto;
    }

    .nx-mobile-sheet {
      position: absolute;
      top: 0.85rem;
      right: 0.85rem;
      left: 0.85rem;
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 28px;
      padding: 1.5rem 1.75rem 2.25rem;
      box-shadow: 0 24px 48px rgba(34, 27, 21, 0.18);
      transform: translateY(-18px) rotate(-1deg) scale(0.97);
      transition: transform 0.38s var(--ease-spring);
      overflow: hidden;
    }

    .nx-mobile-panel.is-open .nx-mobile-sheet {
      transform: translateY(0) rotate(0deg) scale(1);
    }

    .nx-mobile-sheet-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--stroke);
    }

    .nx-mobile-close {
      min-width: 44px;
      min-height: 44px;
      padding: 0.4rem 0.95rem;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background-color: var(--paper);
      font-size: 0.92rem;
      font-weight: 600;
    }

    .nx-mobile-list {
      list-style: none;
      margin: 0 0 1.75rem 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .nx-mobile-list a {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--ink-deep);
      padding: 0.4rem 0;
      border-bottom: 1px dashed var(--stroke);
      transform: translateY(12px);
      opacity: 0;
      transition: transform 0.36s var(--ease-out-expo), opacity 0.36s ease, color 0.2s ease;
    }

    .nx-mobile-panel.is-open .nx-mobile-list li:nth-child(1) a { transition-delay: 0.05s; transform: translateY(0); opacity: 1; }
    .nx-mobile-panel.is-open .nx-mobile-list li:nth-child(2) a { transition-delay: 0.10s; transform: translateY(0); opacity: 1; }
    .nx-mobile-panel.is-open .nx-mobile-list li:nth-child(3) a { transition-delay: 0.15s; transform: translateY(0); opacity: 1; }
    .nx-mobile-panel.is-open .nx-mobile-list li:nth-child(4) a { transition-delay: 0.20s; transform: translateY(0); opacity: 1; }
    .nx-mobile-panel.is-open .nx-mobile-list li:nth-child(5) a { transition-delay: 0.25s; transform: translateY(0); opacity: 1; }

    .nx-mobile-list a span.nx-mobile-idx {
      font-size: 0.9rem;
      font-style: italic;
      color: var(--terracotta);
      font-weight: 400;
    }

    /* ==========================================================================
       04. HERO SECTION — REFERENCE DNA & LAYERED ARTWORK
       ========================================================================== */
    .nx-hero {
      position: relative;
      padding: 0.75rem 0 2.5rem;
      overflow: visible;
    }

    /* Sweeping Organic Peach Backdrop */
    .nx-hero-peach-bg {
      position: absolute;
      top: -115px;
      right: -2%;
      width: 82%;
      height: 840px;
      pointer-events: none;
      z-index: 0;
      transform-origin: 78% 22%;
    }

    .nx-hero-peach-bg svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    /* Corner Olive Botanical Sprigs */
    .nx-corner-sprig {
      position: absolute;
      pointer-events: none;
      z-index: 3;
    }

    .nx-corner-sprig--left {
      bottom: 85px;
      left: -8px;
      width: clamp(68px, 7.5vw, 112px);
      transform-origin: bottom left;
      animation: nxSwayLeft 7s ease-in-out infinite alternate;
    }

    .nx-corner-sprig--right {
      bottom: 135px;
      right: -6px;
      width: clamp(68px, 7.2vw, 106px);
      transform-origin: bottom right;
      animation: nxSwayRight 6.5s ease-in-out infinite alternate;
    }

    @keyframes nxSwayLeft {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(4.5deg); }
    }

    @keyframes nxSwayRight {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(-4.5deg); }
    }

    /* Main Hero Stage Grid */
    .nx-hero-stage {
      position: relative;
      display: grid;
      grid-template-columns: minmax(440px, 620px) 1fr;
      align-items: start;
      min-height: 545px;
      padding-top: 1.15rem;
      z-index: 2;
    }

    .nx-hero-copy {
      position: relative;
      z-index: 5;
      padding-top: 0.75rem;
    }

    .nx-hero-title {
      font-size: clamp(3.25rem, 5.75vw, 5.65rem);
      line-height: 1.01;
      letter-spacing: -0.032em;
      font-weight: 700;
      color: var(--ink-deep);
      margin: 0 0 1.35rem 0;
    }
    .nx-line-inner--1 {
      white-space: nowrap;
    }

    .nx-line-mask {
      display: block;
      overflow: hidden;
      padding-bottom: 0.08em;
      margin-bottom: -0.06em;
    }

    .nx-line-inner {
      display: inline-block;
      transform-origin: left bottom;
      will-change: transform;
    }

    .nx-human-word {
      color: var(--terracotta);
      position: relative;
      display: inline-block;
      padding-right: 0.04em;
    }

    .nx-human-underline {
      position: absolute;
      left: 2%;
      bottom: -0.07em;
      width: 96%;
      height: 0.22em;
      overflow: visible;
      pointer-events: none;
    }

    .nx-human-underline path {
      stroke-dasharray: 320;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.9s var(--ease-out-expo);
    }

    .nx-hero-sub {
      font-size: clamp(1.08rem, 1.45vw, 1.32rem);
      line-height: 1.48;
      color: var(--ink);
      max-width: 390px;
      margin: 0 0 2.15rem 0;
      font-weight: 400;
    }

    .nx-hero-cta-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.35rem;
    }

    .nx-hero-cta {
      background-color: #9E472A;
      padding: 1.02rem 2.35rem;
      font-size: 0.98rem;
      letter-spacing: 0.045em;
    }

    /* Hero Visual Collage (Clay Cluster + Doodles + Character) */
    .nx-hero-visuals {
      position: relative;
      min-height: 530px;
      width: 100%;
      z-index: 3;
    }

    /* 3D Clay Botanical Cluster */
    .nx-clay-cluster-wrap {
      position: absolute;
      left: -21%;
      bottom: 12px;
      width: clamp(310px, 37vw, 495px);
      z-index: 3;
      pointer-events: none;
      animation: nxFloatClay 6.2s ease-in-out infinite alternate;
    }

    .nx-clay-cluster-img {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 18px 26px rgba(84, 46, 28, 0.12));
    }

    /* Right-side Botanical Fan & Mustard Sun Dot behind Clay Cluster */
    .nx-clay-doodle-right {
      position: absolute;
      right: -7%;
      bottom: 18%;
      width: 22%;
      height: auto;
      z-index: 2;
      overflow: visible;
    }

    @keyframes nxFloatClay {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-7px) rotate(0.6deg); }
    }

    /* Illustrated Character Holding Sprout */
    .nx-character-wrap {
      position: absolute;
      right: 2%;
      top: -32px;
      width: clamp(255px, 27.5vw, 382px);
      z-index: 4;
      transform-origin: bottom center;
    }

    .nx-character-img {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 14px 22px rgba(54, 46, 38, 0.09));
    }

    /* Shoulder Motion Lines SVG */
    .nx-shoulder-lines {
      position: absolute;
      top: 10%;
      right: 5%;
      width: 18%;
      height: auto;
      overflow: visible;
      pointer-events: none;
    }

    /* Interactive Sprout Pulse Halo */
    .nx-sprout-spark {
      position: absolute;
      top: 2%;
      left: 6%;
      width: 34%;
      height: 22%;
      pointer-events: none;
      animation: nxSproutNod 4.2s ease-in-out infinite alternate;
      transform-origin: bottom center;
    }

    @keyframes nxSproutNod {
      0% { transform: rotate(-1.5deg) scale(1); }
      100% { transform: rotate(2.5deg) scale(1.03); }
    }

    /* Stroke-draw animation utility for SVG ink doodles */
    .nx-draw-path {
      stroke-dasharray: 600;
      stroke-dashoffset: 0;
    }

    .js-anim-ready .nx-draw-path.is-drawing {
      animation: nxDrawStroke 1.35s var(--ease-out-expo) forwards;
    }

    @keyframes nxDrawStroke {
      from { stroke-dashoffset: 600; }
      to { stroke-dashoffset: 0; }
    }

    /* Lower Hero Edge / Manifesto Teaser Strip (Directly from Reference) */
    .nx-hero-lower {
      position: relative;
      z-index: 5;
      margin-top: 0.5rem;
      padding-top: 1rem;
      display: grid;
      grid-template-columns: minmax(260px, 1.05fr) minmax(240px, 0.95fr) minmax(300px, 1.15fr);
      align-items: center;
      gap: 2rem;
    }

    .nx-lower-headline {
      font-size: clamp(1.85rem, 2.8vw, 2.65rem);
      line-height: 1.08;
      letter-spacing: -0.025em;
      font-weight: 700;
      color: var(--ink-deep);
      margin: 0;
      padding-left: 2.5rem;
    }

    .nx-lower-copy {
      font-size: clamp(0.98rem, 1.12vw, 1.1rem);
      line-height: 1.52;
      color: var(--ink);
      margin: 0;
      padding-left: 1.75rem;
      padding-right: 1.25rem;
      border-left: 2px solid var(--peach-dark);
    }

    .nx-lower-badges-cluster {
      position: relative;
      min-height: 175px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    /* Peach Mound Behind Clay Flower */
    .nx-flower-mound {
      position: absolute;
      left: -8%;
      bottom: -42px;
      width: 118%;
      height: 195px;
      z-index: 0;
      pointer-events: none;
    }

    /* Terracotta 12-Point Checkmark Starburst */
    .nx-starburst-stamp {
      position: relative;
      z-index: 3;
      width: 68px;
      height: 68px;
      margin-left: 14px;
      margin-right: -6px;
      margin-top: -36px;
      flex-shrink: 0;
      transition: transform 0.35s var(--ease-spring);
      cursor: pointer;
    }

    .nx-starburst-stamp:hover {
      transform: rotate(14deg) scale(1.08);
    }

    /* Clay Flower Stem Cutout */
    .nx-clay-flower-wrap {
      position: relative;
      z-index: 2;
      width: clamp(165px, 17vw, 235px);
      margin-bottom: -28px;
      flex-shrink: 0;
      transform-origin: bottom center;
      animation: nxFlowerSway 5.8s ease-in-out infinite alternate;
    }

    @keyframes nxFlowerSway {
      0% { transform: rotate(-1deg); }
      100% { transform: rotate(1.5deg); }
    }

    /* Circular Botanical Stamps (CASUAL BADGES & CLAY-MADE CULTURE) */
    .nx-seal-pair {
      position: relative;
      z-index: 4;
      display: flex;
      align-items: center;
      margin-left: -18px;
    }

    .nx-seal-badge {
      width: clamp(96px, 9.5vw, 124px);
      height: clamp(96px, 9.5vw, 124px);
      border-radius: 50%;
      padding: 0;
      background: none;
      transition: transform 0.4s var(--ease-spring);
      flex-shrink: 0;
    }

    .nx-seal-badge--sage {
      transform: rotate(-12deg) translateY(-14px);
    }

    .nx-seal-badge--mustard {
      width: clamp(104px, 10.2vw, 134px);
      height: clamp(104px, 10.2vw, 134px);
      margin-left: -14px;
      transform: rotate(11deg) translateY(12px);
    }

    .nx-seal-badge:hover,
    .nx-seal-badge:focus-visible {
      transform: rotate(0deg) scale(1.08);
    }

    /* ==========================================================================
       05. SECTION 02 — MANIFESTO ("Good ideas grow on people.")
       ========================================================================== */
    .nx-manifesto {
      position: relative;
      padding: clamp(5rem, 9vw, 8.5rem) 0 clamp(4.5rem, 8vw, 7.5rem);
      overflow: hidden;
    }

    .nx-manifesto-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    .nx-manifesto-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: clamp(2.5rem, 5vw, 5rem);
      align-items: center;
      position: relative;
      z-index: 2;
    }

    .nx-manifesto-statement {
      font-size: clamp(2.75rem, 5.4vw, 5.1rem);
      line-height: 1.04;
      letter-spacing: -0.03em;
      color: var(--ink-deep);
      margin: 0 0 1.75rem 0;
      font-weight: 700;
      text-wrap: balance;
    }

    .nx-manifesto-statement em {
      color: var(--terracotta);
      font-style: italic;
      font-weight: 700;
    }

    .nx-manifesto-lead {
      font-size: clamp(1.15rem, 1.45vw, 1.38rem);
      line-height: 1.62;
      color: var(--ink);
      margin: 0 0 1.5rem 0;
      max-width: 58ch;
    }

    .nx-manifesto-proof {
      margin-top: 2.25rem;
      padding-top: 1.35rem;
      border-top: 1px solid var(--stroke);
      font-size: 0.98rem;
      color: var(--ink-muted);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.65rem 1rem;
      font-variant-numeric: tabular-nums;
    }

    .nx-manifesto-proof strong {
      color: var(--terracotta-deep);
      font-weight: 700;
    }

    .nx-manifesto-card {
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 32px 18px 36px 22px;
      padding: clamp(2rem, 3.5vw, 3rem);
      position: relative;
      box-shadow: 0 18px 40px -16px rgba(54, 46, 38, 0.1);
    }

    .nx-manifesto-seals {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .nx-stamp-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.55rem 1rem;
      border-radius: 999px;
      border: 1.5px dashed var(--terracotta);
      background-color: var(--paper);
      color: var(--terracotta-deep);
      font-size: 0.84rem;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      transition: transform 0.25s var(--ease-spring), background-color 0.2s ease;
    }

    .nx-stamp-btn.is-active,
    .nx-stamp-btn:hover {
      background-color: var(--peach);
      transform: rotate(-2deg) scale(1.03);
    }

    .nx-manifesto-note {
      font-size: 1.12rem;
      line-height: 1.6;
      color: var(--ink);
      font-style: italic;
      margin: 0 0 1.5rem 0;
      min-height: 4.8em;
    }

    .nx-manifesto-art-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px dashed var(--stroke);
    }

    /* ==========================================================================
       06. SECTION 03 — SERVICES ("What we make bloom.")
       ========================================================================== */
    .nx-services {
      position: relative;
      padding: clamp(4.5rem, 8vw, 7.5rem) 0;
    }

    .nx-services-header {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 3.25rem;
    }

    .nx-services-intro {
      max-width: 440px;
      font-size: 1.12rem;
      color: var(--ink-muted);
      margin: 0;
    }

    .nx-services-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.75rem;
    }

    .nx-service-card {
      grid-column: span 6;
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      padding: clamp(1.85rem, 3vw, 2.65rem);
      position: relative;
      transition: transform 0.35s var(--ease-out-expo), box-shadow 0.35s var(--ease-out-expo), border-color 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Irregular handmade art-paper corner radii */
    .nx-service-card:nth-child(1) { border-radius: 28px 14px 30px 18px; }
    .nx-service-card:nth-child(2) { border-radius: 16px 32px 18px 28px; }
    .nx-service-card:nth-child(3) { border-radius: 30px 18px 14px 32px; }
    .nx-service-card:nth-child(4) { border-radius: 18px 28px 32px 16px; }

    /* Folded paper corner detail */
    .nx-service-card::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 34px;
      height: 34px;
      background: linear-gradient(225deg, var(--paper) 46%, var(--peach-dark) 50%, var(--stroke) 56%);
      border-bottom-left-radius: 10px;
      pointer-events: none;
    }

    .nx-service-card:hover {
      transform: translateY(-5px) rotate(-0.4deg);
      box-shadow: 0 20px 38px -16px rgba(54, 46, 38, 0.14);
      border-color: var(--clay);
    }

    .nx-service-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .nx-service-num {
      font-size: 1.05rem;
      font-style: italic;
      font-weight: 700;
      color: var(--terracotta);
      font-variant-numeric: tabular-nums;
    }

    .nx-service-motif {
      width: 56px;
      height: 56px;
      flex-shrink: 0;
      transition: transform 0.4s var(--ease-spring);
    }

    .nx-service-card:hover .nx-service-motif {
      transform: scale(1.1) rotate(6deg);
    }

    .nx-service-title {
      font-size: clamp(1.55rem, 2.2vw, 2rem);
      line-height: 1.15;
      color: var(--ink-deep);
      margin: 0 0 0.85rem 0;
      font-weight: 700;
    }

    .nx-service-desc {
      font-size: 1.05rem;
      line-height: 1.58;
      color: var(--ink-muted);
      margin: 0 0 1.5rem 0;
    }

    .nx-service-meta {
      font-size: 0.92rem;
      color: var(--olive);
      font-weight: 600;
      margin-bottom: 1.1rem;
    }

    .nx-service-toggle {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--terracotta);
      padding: 0.4rem 0;
      border-bottom: 1.5px solid var(--terracotta);
    }

    .nx-service-drawer {
      display: none;
      margin-top: 1.1rem;
      padding-top: 1.1rem;
      border-top: 1px dashed var(--stroke);
      font-size: 0.98rem;
      color: var(--ink);
    }

    .nx-service-card.is-expanded .nx-service-drawer {
      display: block;
    }

    /* ==========================================================================
       07. SECTION 04 — PROCESS ("From first seed to full bloom.")
       ========================================================================== */
    .nx-process {
      position: relative;
      padding: clamp(5rem, 9vw, 8rem) 0;
      background: linear-gradient(180deg, var(--paper) 0%, rgba(249, 222, 199, 0.38) 50%, var(--paper) 100%);
    }

    .nx-process-layout {
      display: grid;
      grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1.3fr);
      gap: clamp(2rem, 5vw, 4.5rem);
      align-items: start;
    }

    .nx-process-sticky {
      position: sticky;
      top: 2.5rem;
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 28px;
      padding: clamp(1.75rem, 3vw, 2.5rem);
      box-shadow: 0 16px 34px -16px rgba(54, 46, 38, 0.09);
    }

    .nx-process-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      margin-top: 1.5rem;
    }

    .nx-process-pill {
      padding: 0.5rem 1rem;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background-color: var(--paper);
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--ink-muted);
      transition: all 0.25s ease;
      font-variant-numeric: tabular-nums;
    }

    .nx-process-pill.is-active,
    .nx-process-pill:hover {
      background-color: var(--terracotta);
      color: var(--paper-light);
      border-color: var(--terracotta);
    }

    .nx-process-timeline {
      position: relative;
      padding-left: 3.5rem;
    }

    /* Continuous Growing Botanical Vine SVG Spine */
    .nx-vine-spine {
      position: absolute;
      left: 0;
      top: 12px;
      bottom: 12px;
      width: 44px;
      pointer-events: none;
    }

    .nx-vine-spine svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .nx-chapter-card {
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 24px;
      padding: clamp(1.6rem, 2.6vw, 2.25rem);
      margin-bottom: 2rem;
      position: relative;
      transition: transform 0.35s var(--ease-out-expo), border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .nx-chapter-card:last-child {
      margin-bottom: 0;
    }

    .nx-chapter-card.is-reached {
      border-color: var(--terracotta);
      box-shadow: 0 14px 30px -14px rgba(164, 83, 55, 0.16);
    }

    .nx-chapter-marker {
      position: absolute;
      left: -3.15rem;
      top: 1.85rem;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: var(--paper);
      border: 2px solid var(--olive);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--olive);
      transition: transform 0.35s var(--ease-spring), background-color 0.3s ease, border-color 0.3s ease;
    }

    .nx-chapter-card.is-reached .nx-chapter-marker {
      background-color: var(--terracotta);
      border-color: var(--terracotta);
      color: var(--paper-light);
      transform: scale(1.18);
    }

    .nx-chapter-step {
      font-size: 0.88rem;
      font-style: italic;
      color: var(--terracotta);
      font-weight: 700;
      margin-bottom: 0.35rem;
      display: block;
    }

    .nx-chapter-title {
      font-size: clamp(1.5rem, 2.2vw, 1.95rem);
      margin: 0 0 0.65rem 0;
      color: var(--ink-deep);
    }

    .nx-chapter-body, .nx-body {
      font-size: 1.05rem;
      color: var(--ink-muted);
      margin: 0 0 1rem 0;
    }

    .nx-chapter-artifact {
      font-size: 0.92rem;
      color: var(--sage);
      font-weight: 600;
    }

    /* ==========================================================================
       08. SECTION 05 — SELECTED WORK (Filterable Editorial Case Studies)
       ========================================================================== */
    .nx-work {
      position: relative;
      padding: clamp(5rem, 9vw, 8rem) 0;
    }

    .nx-work-top {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      justify-content: space-between;
      gap: 1.5rem;
      margin-bottom: 2.75rem;
    }

    .nx-filter-bar {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      background-color: var(--paper-light);
      padding: 0.4rem;
      border-radius: 999px;
      border: 1.5px solid var(--stroke);
    }

    .nx-filter-btn {
      padding: 0.55rem 1.25rem;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--ink-muted);
      transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
      white-space: nowrap;
    }

    .nx-filter-btn.is-active {
      background-color: var(--ink-deep);
      color: var(--paper-light);
    }

    .nx-work-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .nx-work-card {
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 26px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.38s var(--ease-out-expo), box-shadow 0.38s var(--ease-out-expo);
    }

    .nx-work-card:hover {
      transform: translateY(-6px) rotate(0.4deg);
      box-shadow: 0 22px 42px -16px rgba(54, 46, 38, 0.15);
    }

    .nx-work-art {
      position: relative;
      height: 250px;
      overflow: hidden;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--stroke);
    }

    .nx-work-art--solstice { background-color: var(--peach); }
    .nx-work-art--loom { background-color: #E7E8D5; }
    .nx-work-art--kith { background-color: #F3D5B8; }

    .nx-work-art svg,
    .nx-work-art img {
      transition: transform 0.45s var(--ease-out-expo);
    }

    .nx-work-card:hover .nx-work-art .nx-art-layer-back {
      transform: translateY(-6px) scale(1.04) rotate(-2deg);
    }

    .nx-work-card:hover .nx-work-art .nx-art-layer-front {
      transform: translateY(-10px) scale(1.06) rotate(2deg);
    }

    .nx-work-body, .nx-body {
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .nx-work-meta {
      font-size: 0.88rem;
      color: var(--ink-muted);
      margin-bottom: 0.55rem;
      font-variant-numeric: tabular-nums;
    }

    .nx-work-title {
      font-size: 1.55rem;
      line-height: 1.18;
      color: var(--ink-deep);
      margin: 0 0 0.65rem 0;
      font-weight: 700;
    }

    .nx-work-summary {
      font-size: 1rem;
      color: var(--ink-muted);
      margin: 0 0 1.25rem 0;
      flex: 1;
    }

    .nx-work-metric {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--terracotta-deep);
      padding: 0.75rem 0;
      border-top: 1px dashed var(--stroke);
      border-bottom: 1px dashed var(--stroke);
      margin-bottom: 1.25rem;
      font-variant-numeric: tabular-nums;
    }

    .nx-work-open-btn {
      align-self: flex-start;
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--ink-deep);
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0;
      border-bottom: 1.5px solid var(--terracotta);
    }

    /* Case Study Modal Dialog */
    .nx-modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 120;
      background-color: rgba(34, 27, 21, 0.48);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
    }

    .nx-modal-backdrop.is-open {
      display: flex;
    }

    .nx-modal-card {
      background-color: var(--paper-light);
      border: 2px solid var(--stroke);
      border-radius: 28px;
      max-width: 680px;
      width: 100%;
      padding: clamp(1.75rem, 3.5vw, 2.75rem);
      box-shadow: 0 28px 60px rgba(34, 27, 21, 0.25);
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }

    .nx-modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      min-width: 44px;
      min-height: 44px;
      padding: 0.4rem 0.95rem;
      border-radius: 999px;
      border: 1.5px solid var(--stroke);
      background-color: var(--paper);
      font-weight: 700;
    }

    /* ==========================================================================
       09. SECTION 06 — CLIENT LOVE / TESTIMONIALS (Tactile Paper Note)
       ========================================================================== */
    .nx-testimonials {
      position: relative;
      padding: clamp(4.5rem, 8vw, 7.5rem) 0;
    }

    .nx-quote-stage {
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 36px 20px 32px 24px;
      padding: clamp(2.25rem, 5vw, 4.25rem);
      position: relative;
      box-shadow: 0 22px 46px -18px rgba(54, 46, 38, 0.12);
      max-width: 1060px;
      margin: 0 auto;
    }

    .nx-quote-text {
      font-size: clamp(1.45rem, 2.5vw, 2.25rem);
      line-height: 1.38;
      color: var(--ink-deep);
      font-style: italic;
      margin: 1rem 0 2rem 0;
      transition: transform 0.35s var(--ease-out-expo), opacity 0.35s ease;
    }

    .nx-quote-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--stroke);
    }

    .nx-quote-author strong {
      display: block;
      font-size: 1.2rem;
      color: var(--ink-deep);
    }

    .nx-quote-author span {
      font-size: 0.98rem;
      color: var(--ink-muted);
    }

    .nx-quote-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .nx-IconBtn {
      min-width: 48px;
      min-height: 48px;
      padding: 0 1.15rem;
      border-radius: 999px;
      border: 1.5px solid var(--ink);
      background-color: var(--paper);
      color: var(--ink-deep);
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .nx-IconBtn:hover {
      background-color: var(--terracotta);
      border-color: var(--terracotta);
      color: var(--paper-light);
      transform: translateY(-2px);
    }

    /* ==========================================================================
       10. SECTION 07 — CLOSING CTA, INTERACTIVE SEED BRIEF & ORGANIC FOOTER
       ========================================================================== */
    .nx-closing {
      position: relative;
      padding: clamp(5rem, 9vw, 8rem) 0 0;
      overflow: hidden;
    }

    .nx-closing-grid {
      display: grid;
      grid-template-columns: 1.05fr 0.95fr;
      gap: clamp(2.5rem, 5vw, 4.5rem);
      align-items: start;
      padding-bottom: clamp(4rem, 7vw, 6.5rem);
    }

    .nx-closing-title {
      font-size: clamp(2.85rem, 5.6vw, 5.25rem);
      line-height: 1.02;
      letter-spacing: -0.03em;
      color: var(--ink-deep);
      margin: 0 0 1.25rem 0;
      font-weight: 700;
      text-wrap: balance;
    }

    .nx-closing-title span {
      color: var(--terracotta);
      font-style: italic;
    }

    .nx-brief-card {
      background-color: var(--paper-light);
      border: 1.5px solid var(--stroke);
      border-radius: 28px;
      padding: clamp(1.75rem, 3.2vw, 2.75rem);
      box-shadow: 0 20px 44px -18px rgba(54, 46, 38, 0.12);
    }

    .nx-scope-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      margin: 0.65rem 0 1.35rem;
    }

    .nx-scope-chip {
      padding: 0.5rem 1rem;
      border-radius: 999px;
      border: 1.5px solid var(--stroke);
      background-color: var(--paper);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--ink);
      transition: all 0.2s ease;
    }

    .nx-scope-chip[aria-pressed="true"] {
      background-color: var(--sage);
      border-color: var(--sage);
      color: var(--paper-light);
    }

    .nx-field {
      margin-bottom: 1.15rem;
    }

    .nx-field label {
      display: block;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ink-deep);
      margin-bottom: 0.35rem;
    }

    .nx-input,
    .nx-textarea {
      width: 100%;
      padding: 0.85rem 1.1rem;
      border-radius: 14px;
      border: 1.5px solid var(--stroke);
      background-color: var(--paper);
      color: var(--ink-deep);
      font-size: 1rem;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .nx-input:focus,
    .nx-textarea:focus {
      border-color: var(--terracotta);
      background-color: var(--paper-light);
      outline: none;
    }

    .nx-field-error {
      display: none;
      font-size: 0.88rem;
      color: var(--terracotta-deep);
      font-style: italic;
      margin-top: 0.3rem;
    }

    .nx-field-error.is-visible {
      display: block;
    }

    .nx-brief-result {
      display: none;
      margin-top: 1.35rem;
      padding: 1.25rem;
      border-radius: 18px;
      background-color: var(--peach);
      border: 1.5px solid var(--clay);
    }

    .nx-brief-result.is-visible {
      display: block;
    }

    /* Organic Footer */
    .nx-footer {
      position: relative;
      background-color: var(--peach);
      padding: 3.5rem 0 3rem;
      border-top: 1.5px solid var(--peach-dark);
    }

    .nx-footer-grid {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .nx-footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* ==========================================================================
       11. INTRO & SCROLL REVEAL CHOREOGRAPHY (Tactile Transform + Clip + Spring)
       ========================================================================== */
    .js-anim-ready [data-reveal] {
      opacity: 0;
      transform: translateY(28px) rotate(0.8deg) scale(0.98);
      transition: transform 0.78s var(--ease-out-expo), opacity 0.65s ease;
    }

    .js-anim-ready [data-reveal].is-inview {
      opacity: 1;
      transform: translateY(0) rotate(0deg) scale(1);
    }

    /* Hero Intro Sequence */
    .js-anim-ready .nx-wordmark {
      animation: nxIntroWordmark 0.85s var(--ease-spring) both;
    }

    .js-anim-ready .nx-nav-links li {
      animation: nxIntroNav 0.7s var(--ease-out-expo) both;
    }
    .js-anim-ready .nx-nav-links li:nth-child(1) { animation-delay: 0.08s; }
    .js-anim-ready .nx-nav-links li:nth-child(2) { animation-delay: 0.14s; }
    .js-anim-ready .nx-nav-links li:nth-child(3) { animation-delay: 0.20s; }
    .js-anim-ready .nx-nav-links li:nth-child(4) { animation-delay: 0.26s; }
    .js-anim-ready .nx-nav-links li:nth-child(5) { animation-delay: 0.32s; }

    .js-anim-ready .nx-line-inner--1 {
      animation: nxLineRise 0.85s var(--ease-out-expo) 0.12s both;
    }
    .js-anim-ready .nx-line-inner--2 {
      animation: nxLineRise 0.9s var(--ease-out-expo) 0.26s both;
    }
    .js-anim-ready .nx-human-word {
      animation: nxHumanPop 0.85s var(--ease-spring) 0.42s both;
    }
    .js-anim-ready .nx-hero-peach-bg {
      animation: nxPeachUnfurl 1.25s var(--ease-out-expo) 0.05s both;
    }
    .js-anim-ready .nx-character-wrap {
      animation: nxCharStepIn 1.1s var(--ease-out-expo) 0.28s both;
    }
    .js-anim-ready .nx-clay-cluster-wrap {
      animation: nxClaySettle 1.15s var(--ease-spring) 0.36s both;
    }
    .js-anim-ready .nx-hero-cta-row {
      animation: nxCtaElastic 0.9s var(--ease-spring) 0.52s both;
    }

    @keyframes nxIntroWordmark {
      from { transform: translateY(10px) rotate(-4deg); opacity: 0; }
      to { transform: translateY(0) rotate(0deg); opacity: 1; }
    }
    @keyframes nxIntroNav {
      from { transform: translateX(-12px) translateY(4px); opacity: 0; }
      to { transform: translateX(0) translateY(0); opacity: 1; }
    }
    @keyframes nxLineRise {
      from { transform: translateY(108%) rotate(2.5deg); }
      to { transform: translateY(0%) rotate(0deg); }
    }
    @keyframes nxHumanPop {
      from { transform: translateY(24px) scale(0.92) rotate(-2deg); opacity: 0; }
      to { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes nxPeachUnfurl {
      from { transform: scale(0.84) rotate(3deg); opacity: 0; }
      to { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes nxCharStepIn {
      from { transform: translate(34px, 26px) rotate(3.5deg); opacity: 0; }
      to { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    }
    @keyframes nxClaySettle {
      from { transform: translateY(36px) scale(0.92); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
    @keyframes nxCtaElastic {
      from { transform: translateY(18px) scale(0.9); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    /* ==========================================================================
       12. RESPONSIVE BREAKPOINTS (1440, 1024, 768, 390, 320 px)
       ========================================================================== */
    @media (max-width: 1120px) {
      .nx-hero-stage {
        grid-template-columns: 1fr 1fr;
        min-height: 490px;
      }
      .nx-clay-cluster-wrap {
        left: -14%;
        width: clamp(280px, 36vw, 410px);
      }
      .nx-hero-lower {
        grid-template-columns: 1fr 1fr;
      }
      .nx-lower-badges-cluster {
        grid-column: span 2;
        justify-content: center;
        margin-top: 1rem;
      }
      .nx-work-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 860px) {
      .nx-nav-links,
      .nx-nav-cta {
        display: none;
      }
      .nx-mobile-toggle,
      .nx-mobile-panel {
        display: flex;
      }
      .nx-hero-stage {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .nx-hero-copy {
        max-width: 600px;
      }
      .nx-hero-visuals {
        min-height: 430px;
        margin-top: 0.5rem;
      }
      .nx-clay-cluster-wrap {
        left: 0%;
        bottom: 0;
        width: min(56vw, 340px);
      }
      .nx-character-wrap {
        right: 2%;
        top: 0;
        width: min(46vw, 285px);
      }
      .nx-hero-lower {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
      .nx-lower-headline {
        padding-left: 0;
      }
      .nx-lower-badges-cluster {
        grid-column: span 1;
        justify-content: flex-start;
      }
      .nx-manifesto-grid,
      .nx-process-layout,
      .nx-closing-grid {
        grid-template-columns: 1fr;
      }
      .nx-process-sticky {
        position: relative;
        top: 0;
      }
      .nx-service-card {
        grid-column: span 12;
      }
      .nx-work-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 520px) {
      .nx-hero-title {
        font-size: clamp(2.55rem, 10.8vw, 3.35rem);
      }
      .nx-line-inner--1 {
        white-space: normal;
      }
      .nx-hero-visuals {
        min-height: 390px;
      }
      .nx-clay-cluster-wrap {
        left: -2%;
        bottom: 0;
        width: 62%;
      }
      .nx-character-wrap {
        right: -2%;
        top: 6px;
        width: 52%;
      }
      .nx-corner-sprig--left,
      .nx-corner-sprig--right {
        width: 54px;
      }
      .nx-lower-badges-cluster {
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }
      .nx-clay-flower-wrap {
        width: 145px;
      }
    }

    /* ==========================================================================
       13. PREFERS-REDUCED-MOTION COMPLIANCE
       ========================================================================== */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      .js-anim-ready [data-reveal] {
        opacity: 1 !important;
        transform: none !important;
      }
    }
]]>
    </file>
    <file path="src/app/(nexus)/nexus/NexusApp.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { Testimonials } from "./components/Testimonials";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";

export function NexusApp() {
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      document.documentElement.classList.add("js-anim-ready");
    }

    // Flourish stroke drawing
    const flourish = document.getElementById("human-flourish-path");
    if (flourish && !prefersReducedMotion) {
      flourish.style.strokeDashoffset = "320";
      const timer = setTimeout(() => {
        flourish.style.strokeDashoffset = "0";
      }, 520);
      return () => clearTimeout(timer);
    }

    // IntersectionObserver for [data-reveal]
    const revealNodes = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      revealNodes.forEach((node) => node.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#F5F1E8",
          color: "#221B15",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 38,
              fontWeight: 700,
              color: "#777B45",
              letterSpacing: "-0.02em",
            }}
          >
            nexus
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#A45337",
              background: "#F9DEC7",
              padding: "8px 20px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Human-First Creative Marketing
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 1.08,
              fontWeight: 800,
              color: "#221B15",
              letterSpacing: "-0.03em",
            }}
          >
            <span>Marketing that feels</span>
            <span style={{ color: "#A45337", fontStyle: "italic", marginLeft: 16 }}>human.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#5C5044",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Tactile clay sculptures, hand-drawn botanical illustrations, and high-contrast editorial craft for brands with something to say.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 20,
            color: "#5C5044",
            borderTop: "1px solid #DCCEBB",
            paddingTop: 24,
          }}
        >
          <span>Portland · Kyoto</span>
          <span>·</span>
          <span>Brand Worldbuilding</span>
          <span>·</span>
          <span>Tactile Campaigns</span>
          <span>·</span>
          <span>Experiential Web</span>
        </div>
      </div>
    ),
    size
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/page.tsx">
<![CDATA[import { NexusApp } from "./NexusApp";

export default function NexusPage() {
  return <NexusApp />;
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Closing.tsx">
<![CDATA["use client";

import { useState } from "react";
import {
  buildMailtoUrl,
  formatBriefSummary,
  validateBriefInput,
  type BriefInput,
} from "../model/agencyLogic";

const AVAILABLE_SCOPES = [
  "Brand Strategy",
  "Campaign Creative",
  "Social & Editorial",
  "Web & Experiences",
];

export function Closing() {
  const [scopes, setScopes] = useState<string[]>(["Brand Strategy"]);
  const [formData, setFormData] = useState<BriefInput>({
    name: "",
    email: "",
    company: "",
    scopes: ["Brand Strategy"],
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string>("#");
  const [copied, setCopied] = useState(false);

  const toggleScope = (scope: string) => {
    setScopes((prev) => {
      const next = prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope];
      setFormData((f) => ({ ...f, scopes: next }));
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBriefInput({ ...formData, scopes });
    setErrors(result.errors);

    if (result.valid) {
      const summary = formatBriefSummary({ ...formData, scopes });
      setSubmittedSummary(summary);
      setMailtoUrl(buildMailtoUrl({ ...formData, scopes }));
    } else {
      setSubmittedSummary(null);
    }
  };

  const handleCopy = () => {
    if (!submittedSummary) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(submittedSummary).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="nx-closing" id="contact" aria-labelledby="closing-heading">
      <div className="nx-container">
        <div className="nx-closing-grid">
          <div data-reveal>
            <span className="nx-kicker">06 · Start a Conversation</span>
            <h2 className="nx-closing-title" id="closing-heading">
              Let’s make something people <span>feel.</span>
            </h2>
            <p
              style={{
                fontSize: "1.18rem",
                color: "var(--ink-muted)",
                maxWidth: "46ch",
                margin: "0 0 2rem 0",
              }}
            >
              Whether you are planting a brand from scratch or helping an established story bloom
              again, our table is open.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "0.92rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--olive)",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                }}
              >
                Direct Studio Post
              </div>
              <a
                href="mailto:hello@nexus-studio.example"
                className="nx-drawn-link"
                style={{ fontSize: "1.45rem", fontWeight: 700, fontStyle: "normal" }}
              >
                hello@nexus-studio.example
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <img
                src="/templates/nexus/clay-flower.webp"
                alt=""
                aria-hidden="true"
                width={148}
                height={124}
                style={{ width: "148px", height: "auto", flexShrink: 0 }}
              />
              <p
                style={{
                  fontSize: "0.98rem",
                  fontStyle: "italic",
                  color: "var(--ink-muted)",
                  margin: 0,
                  maxWidth: "28ch",
                }}
              >
                Every inquiry is read by our founding partners—never routed to a chatbot.
              </p>
            </div>
          </div>

          {/* Interactive Project Seed Form */}
          <div className="nx-brief-card" data-reveal>
            <h3 style={{ fontSize: "1.65rem", margin: "0 0 0.4rem 0", color: "var(--ink-deep)" }}>
              Plant a project seed
            </h3>
            <p style={{ fontSize: "0.98rem", color: "var(--ink-muted)", margin: "0 0 1.1rem 0" }}>
              Select what we are cultivating together and prepare a bespoke studio note:
            </p>

            <form id="seed-brief-form" noValidate onSubmit={handleSubmit}>
              <div>
                <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--ink-deep)" }}>
                  Focus Areas (optional)
                </span>
                <div className="nx-scope-chips" role="group" aria-label="Project focus areas">
                  {AVAILABLE_SCOPES.map((scope) => {
                    const isPressed = scopes.includes(scope);
                    return (
                      <button
                        key={scope}
                        type="button"
                        className="nx-scope-chip"
                        aria-pressed={isPressed}
                        data-scope={scope}
                        onClick={() => toggleScope(scope)}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-name">Your Name</label>
                <input
                  type="text"
                  id="brief-name"
                  className="nx-input"
                  placeholder="e.g. Clara Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.name ? "is-visible" : ""}`}
                  id="error-name"
                  role="alert"
                >
                  {errors.name}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-email">Email Address</label>
                <input
                  type="email"
                  id="brief-email"
                  className="nx-input"
                  placeholder="clara@solstice-apothecary.example"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.email ? "is-visible" : ""}`}
                  id="error-email"
                  role="alert"
                >
                  {errors.email}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-company">Brand or Organization (optional)</label>
                <input
                  type="text"
                  id="brief-company"
                  className="nx-input"
                  placeholder="Solstice Apothecary"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="nx-field">
                <label htmlFor="brief-message">What are you hoping to grow?</label>
                <textarea
                  id="brief-message"
                  className="nx-textarea"
                  rows={3}
                  placeholder="Tell us about your brand, timeline, or the story you want people to feel..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.message ? "is-visible" : ""}`}
                  id="error-message"
                  role="alert"
                >
                  {errors.message}
                </div>
              </div>

              <button type="submit" className="nx-btn" style={{ width: "100%" }}>
                <span>PREPARE STUDIO NOTE</span>
                <svg className="nx-btn-arrow" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 7H17.5M17.5 7L12 1.5M17.5 7L12 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Generated Mailto Draft & Copy Confirmation */}
            <div
              className={`nx-brief-result ${submittedSummary ? "is-visible" : ""}`}
              id="brief-result"
              aria-live="polite"
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "1.08rem",
                  color: "var(--ink-deep)",
                  marginBottom: "0.35rem",
                }}
              >
                Your project seed note is ready!
              </strong>
              <p
                id="brief-preview-text"
                style={{
                  fontSize: "0.94rem",
                  color: "var(--ink)",
                  margin: "0 0 0.9rem 0",
                  fontStyle: "italic",
                }}
              >
                {submittedSummary
                  ? `“${formData.name}${formData.company ? ` (${formData.company})` : ""} — ${scopes.length ? scopes.join(", ") : "General Partnership"}: ${formData.message}”`
                  : ""}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                <a
                  href={mailtoUrl}
                  id="brief-mailto-link"
                  className="nx-btn"
                  style={{ padding: "0.65rem 1.35rem", fontSize: "0.9rem" }}
                >
                  <span>Open in Email Client</span>
                </a>
                <button
                  type="button"
                  id="brief-copy-btn"
                  className="nx-IconBtn"
                  style={{ minHeight: "40px", fontSize: "0.88rem" }}
                  onClick={handleCopy}
                >
                  {copied ? "Copied to Clipboard ✓" : "Copy Note Text"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Footer.tsx">
<![CDATA[export function Footer() {
  return (
    <footer className="nx-footer">
      <div className="nx-container">
        <div className="nx-footer-grid">
          <div>
            <a href="#top" className="nx-wordmark">
              nexus
            </a>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.95rem", color: "var(--ink-muted)" }}>
              © 2026 nexus creative studio. Hand-crafted with care &amp; serif type.
            </p>
          </div>

          <ul className="nx-footer-links">
            <li>
              <a href="#top" className="nx-drawn-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nx-drawn-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="nx-drawn-link">
                Services
              </a>
            </li>
            <li>
              <a href="#work" className="nx-drawn-link">
                Work
              </a>
            </li>
            <li>
              <a href="#contact" className="nx-drawn-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Header.tsx">
<![CDATA["use client";

import { useState } from "react";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className="nx-header" id="top">
      <div className="nx-container">
        <div className="nx-nav-bar">
          {/* Zone 1: Lowercase Serif Brand Wordmark */}
          <a href="#top" className="nx-wordmark" aria-label="nexus home">
            nexus
          </a>

          {/* Zone 2: Minimal Serif Navigation */}
          <nav aria-label="Primary navigation">
            <ul className="nx-nav-links">
              <li>
                <a href="#top" className="nx-nav-link is-active">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="nx-nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="nx-nav-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#work" className="nx-nav-link">
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" className="nx-nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="nx-nav-actions">
            <a href="#contact" className="nx-btn nx-nav-cta">
              <span>Let’s talk</span>
            </a>
            <button
              type="button"
              className="nx-mobile-toggle"
              id="mobile-menu-open"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu-panel"
              aria-label="Open navigation menu"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <span>Menu</span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M1 2H15M3 6H15M1 10H13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <div
        className={`nx-mobile-panel ${isMobileOpen ? "is-open" : ""}`}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobile();
        }}
      >
        <div className="nx-mobile-sheet">
          <div className="nx-mobile-sheet-top">
            <span className="nx-wordmark">nexus</span>
            <button
              type="button"
              className="nx-mobile-close"
              id="mobile-menu-close"
              aria-label="Close navigation menu"
              onClick={closeMobile}
            >
              Close
            </button>
          </div>
          <ul className="nx-mobile-list">
            <li>
              <a href="#top" className="nx-mobile-link" onClick={closeMobile}>
                <span>Home</span>
                <span className="nx-mobile-idx">01</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nx-mobile-link" onClick={closeMobile}>
                <span>About</span>
                <span className="nx-mobile-idx">02</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nx-mobile-link" onClick={closeMobile}>
                <span>Services</span>
                <span className="nx-mobile-idx">03</span>
              </a>
            </li>
            <li>
              <a href="#work" className="nx-mobile-link" onClick={closeMobile}>
                <span>Work</span>
                <span className="nx-mobile-idx">04</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nx-mobile-link" onClick={closeMobile}>
                <span>Contact</span>
                <span className="nx-mobile-idx">05</span>
              </a>
            </li>
          </ul>
          <a
            href="#contact"
            className="nx-btn nx-mobile-link"
            style={{ width: "100%" }}
            onClick={closeMobile}
          >
            <span>LET’S PARTNER UP</span>
          </a>
        </div>
      </div>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Hero.tsx">
<![CDATA["use client";

import { useState } from "react";

export function Hero() {
  const [spinSeal1, setSpinSeal1] = useState(false);
  const [spinSeal2, setSpinSeal2] = useState(false);

  const handleSpin1 = () => {
    setSpinSeal1(true);
    setTimeout(() => setSpinSeal1(false), 500);
  };

  const handleSpin2 = () => {
    setSpinSeal2(true);
    setTimeout(() => setSpinSeal2(false), 500);
  };

  return (
    <section className="nx-hero" aria-labelledby="hero-heading">
      {/* Sweeping Pale-Peach Organic Field SVG */}
      <div className="nx-hero-peach-bg" aria-hidden="true" data-parallax="-0.08">
        <svg viewBox="0 0 1200 820" fill="none" preserveAspectRatio="none">
          <path
            d="M845 0 C745 85, 685 215, 525 275 C365 335, 315 440, 215 520 C125 592, 22 615, 18 640 C14 668, 165 655, 330 662 C495 668, 565 695, 735 660 C905 625, 1085 525, 1200 415 L1200 185 C1110 210, 995 215, 965 135 C935 55, 985 15, 1035 0 Z"
            fill="var(--peach)"
          />
          <path
            d="M920 555 C985 455, 1095 365, 1200 392 L1200 465 C1095 525, 995 605, 885 635 Z"
            fill="#F1BE98"
            opacity="0.78"
          />
        </svg>
      </div>

      {/* Botanical Corner Sprigs */}
      <div className="nx-corner-sprig nx-corner-sprig--left" aria-hidden="true">
        <svg viewBox="0 0 110 150" fill="none">
          <path
            d="M4 146 C22 112, 46 78, 76 38"
            stroke="#777B45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M36 92 C24 72, 24 44, 42 32 C54 50, 50 76, 36 92 Z" fill="#777B45" />
          <path d="M58 64 C52 42, 60 18, 78 12 C84 30, 74 52, 58 64 Z" fill="#777B45" />
          <path d="M44 86 C64 78, 88 82, 98 96 C80 106, 58 100, 44 86 Z" fill="#777B45" />
          <path d="M18 118 C38 110, 62 114, 72 126 C54 136, 32 130, 18 118 Z" fill="#777B45" />
        </svg>
      </div>

      <div className="nx-corner-sprig nx-corner-sprig--right" aria-hidden="true">
        <svg viewBox="0 0 110 130" fill="none">
          <path
            d="M106 116 C86 86, 62 56, 32 24"
            stroke="#777B45"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M68 68 C82 50, 86 24, 70 12 C56 28, 56 52, 68 68 Z" fill="#777B45" />
          <path d="M58 64 C38 54, 14 58, 6 72 C24 84, 44 78, 58 64 Z" fill="#777B45" />
          <path d="M84 92 C64 84, 40 88, 30 102 C48 112, 70 106, 84 92 Z" fill="#777B45" />
        </svg>
      </div>

      <div className="nx-container">
        <div className="nx-hero-stage">
          {/* Left Column: Headline, Copy, Primary CTA */}
          <div className="nx-hero-copy">
            <h1 className="nx-hero-title" id="hero-heading">
              <span className="nx-line-mask">
                <span className="nx-line-inner nx-line-inner--1">Marketing that</span>
              </span>
              <span className="nx-line-mask">
                <span className="nx-line-inner nx-line-inner--2">
                  feels{" "}
                  <span className="nx-human-word">
                    human.
                    <svg
                      className="nx-human-underline"
                      viewBox="0 0 280 28"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        id="human-flourish-path"
                        d="M6 18 C74 8, 178 7, 272 16 C214 21, 112 22, 34 24"
                        stroke="var(--terracotta)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            <p className="nx-hero-sub">
              High-contrast organic and highly creative work for brands with something to say.
            </p>

            <div className="nx-hero-cta-row">
              <a href="#contact" className="nx-btn nx-hero-cta">
                <span>LET’S PARTNER UP</span>
                <svg className="nx-btn-arrow" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 7H17.5M17.5 7L12 1.5M17.5 7L12 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#work" className="nx-drawn-link">
                <span>Explore selected work</span>
              </a>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="nx-hero-visuals">
            {/* 3D Clay Botanical Cluster Cutout */}
            <div className="nx-clay-cluster-wrap" data-parallax="0.06">
              <img
                src="/templates/nexus/clay-cluster.webp"
                alt="Tactile 3D terracotta and cream clay botanical sculptures surrounded by hand-drawn black ink stems"
                className="nx-clay-cluster-img"
                width={412}
                height={315}
              />
              <svg
                className="nx-clay-doodle-right"
                viewBox="0 0 120 120"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="48" cy="64" r="32" fill="#F6C88F" opacity="0.9" />
                <path
                  className="nx-draw-path is-drawing"
                  d="M36 66 C52 44, 78 34, 86 44 C78 58, 54 64, 36 66 Z"
                  stroke="#221B15"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M40 78 C64 66, 90 66, 94 78 C82 88, 60 86, 40 78 Z"
                  stroke="#221B15"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M38 88 C58 88, 80 94, 80 104 C68 108, 50 100, 38 88 Z"
                  stroke="#221B15"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <circle cx="96" cy="22" r="3.8" fill="#221B15" />
              </svg>
            </div>

            {/* Hand-Illustrated Character Holding Sprout Cutout */}
            <div className="nx-character-wrap" data-parallax="-0.05">
              <svg className="nx-sprout-spark" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                <path
                  className="nx-draw-path is-drawing"
                  d="M22 24 C14 14, 16 6, 26 4"
                  stroke="#777B45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M92 18 C102 10, 108 14, 104 24"
                  stroke="#777B45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="nx-shoulder-lines"
                viewBox="0 0 80 80"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className="nx-draw-path is-drawing"
                  d="M12 52 C22 34, 34 18, 46 8"
                  stroke="#221B15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  className="nx-draw-path is-drawing"
                  d="M26 62 C40 48, 54 36, 68 28"
                  stroke="#221B15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <img
                src="/templates/nexus/marketer.webp"
                alt="Friendly illustrated creative marketer holding a sprouting green plant in a clump of rich earth"
                className="nx-character-img"
                width={302}
                height={417}
              />
            </div>
          </div>
        </div>

        {/* Lower Hero Edge */}
        <div className="nx-hero-lower" data-reveal>
          <h2 className="nx-lower-headline">
            Friendly-organic
            <br />
            and purpose-driven.
          </h2>

          <p className="nx-lower-copy">
            A marketing partner that puts people, ideas, and real connection at the center of
            growth.
          </p>

          <div className="nx-lower-badges-cluster">
            {/* Soft Peach Mound SVG */}
            <svg
              className="nx-flower-mound"
              viewBox="0 0 500 190"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M10 190 C95 140, 165 25, 275 28 C385 32, 435 145, 495 190 Z"
                fill="var(--peach)"
                opacity="0.88"
              />
            </svg>

            {/* 12-Point Terracotta Starburst Stamp */}
            <button
              type="button"
              className="nx-starburst-stamp"
              aria-label="Verified human-crafted agency seal"
              title="100% Human-Crafted"
            >
              <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <path
                  d="M40 2 L47 13 L60 7 L61 21 L74 22 L69 35 L79 43 L68 52 L73 65 L60 66 L58 78 L46 72 L38 80 L30 69 L17 73 L18 60 L5 58 L12 46 L2 36 L14 29 L10 16 L23 16 L26 4 L38 11 Z"
                  fill="var(--terracotta)"
                />
                <path
                  d="M27 41 L36 50 L54 30"
                  stroke="var(--paper-light)"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 3D Clay Flower Stem Cutout */}
            <div className="nx-clay-flower-wrap">
              <img
                src="/templates/nexus/clay-flower.webp"
                alt="Sculpted 3D terracotta and olive clay flower stem"
                width={240}
                height={200}
              />
            </div>

            {/* Two Circular Botanical Seals */}
            <div className="nx-seal-pair">
              <button
                type="button"
                className="nx-seal-badge nx-seal-badge--sage"
                aria-label="Casual Badges botanical seal"
                onClick={handleSpin1}
                style={{
                  transform: spinSeal1 ? "rotate(360deg) scale(1.08)" : undefined,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <svg viewBox="0 0 140 140" fill="none" aria-hidden="true">
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    fill="#C4CFAF"
                    stroke="#9AA884"
                    strokeWidth="2"
                  />
                  <circle cx="70" cy="70" r="54" stroke="#362E26" strokeWidth="1.4" />
                  <defs>
                    <path id="seal-top-1" d="M 24,70 A 46,46 0 1,1 116,70" />
                    <path id="seal-bot-1" d="M 20,70 A 50,50 0 0,0 120,70" />
                  </defs>
                  <text fill="#221B15" fontSize="12.5" fontWeight="700" letterSpacing="2.2">
                    <textPath href="#seal-top-1" startOffset="50%" textAnchor="middle">
                      · CASUAL ·
                    </textPath>
                  </text>
                  <text fill="#221B15" fontSize="12.5" fontWeight="700" letterSpacing="2.2">
                    <textPath href="#seal-bot-1" startOffset="50%" textAnchor="middle">
                      BADGES
                    </textPath>
                  </text>
                  <path
                    d="M68 84 C68 68, 52 56, 48 56 C48 68, 58 80, 68 84 Z"
                    fill="#4C7262"
                    stroke="#221B15"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M68 84 C70 64, 86 50, 92 50 C92 66, 80 80, 68 84 Z"
                    fill="#4C7262"
                    stroke="#221B15"
                    strokeWidth="1.8"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="nx-seal-badge nx-seal-badge--mustard"
                aria-label="Clay-Made Culture botanical seal"
                onClick={handleSpin2}
                style={{
                  transform: spinSeal2 ? "rotate(360deg) scale(1.08)" : undefined,
                  transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <svg viewBox="0 0 140 140" fill="none" aria-hidden="true">
                  <circle
                    cx="70"
                    cy="70"
                    r="65"
                    fill="var(--mustard)"
                    stroke="#D9963D"
                    strokeWidth="2"
                  />
                  <circle cx="70" cy="70" r="54" stroke="#82422D" strokeWidth="1.4" />
                  <defs>
                    <path id="seal-top-2" d="M 23,70 A 47,47 0 1,1 117,70" />
                    <path id="seal-bot-2" d="M 19,70 A 51,51 0 0,0 121,70" />
                  </defs>
                  <text fill="#5E2B18" fontSize="12" fontWeight="700" letterSpacing="1.8">
                    <textPath href="#seal-top-2" startOffset="50%" textAnchor="middle">
                      · CLAY-MADE ·
                    </textPath>
                  </text>
                  <text fill="#5E2B18" fontSize="12" fontWeight="700" letterSpacing="2">
                    <textPath href="#seal-bot-2" startOffset="50%" textAnchor="middle">
                      CULTURE
                    </textPath>
                  </text>
                  <ellipse cx="70" cy="88" rx="14" ry="4.5" fill="#A45337" />
                  <path
                    d="M70 86 V54"
                    stroke="#82422D"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="70"
                    cy="50"
                    r="5"
                    fill="#A45337"
                    stroke="#5E2B18"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M70 72 C58 64, 52 68, 56 76 C62 78, 66 76, 70 72 Z"
                    fill="#D9824B"
                    stroke="#5E2B18"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M70 72 C82 64, 88 68, 84 76 C78 78, 74 76, 70 72 Z"
                    fill="#D9824B"
                    stroke="#5E2B18"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Manifesto.tsx">
<![CDATA["use client";

import { useState } from "react";

const PRINCIPLE_NOTES = {
  care: "“We never ship a campaign that feels like homework. Every headline, illustration, and launch ritual is tended like a living garden—rooted in research and pruned for clarity.”",
  feeling:
    "“People remember how a brand made them feel long after they forget a feature list. We sculpt tactile worlds in paper, clay, and ink so your story lingers.”",
};

export function Manifesto() {
  const [activePrinciple, setActivePrinciple] = useState<"care" | "feeling">("care");

  return (
    <section className="nx-manifesto" id="about" aria-labelledby="manifesto-heading">
      <div className="nx-container">
        <div className="nx-manifesto-grid">
          <div data-reveal>
            <span className="nx-kicker">01 · Our Philosophy</span>
            <h2 className="nx-manifesto-statement" id="manifesto-heading">
              Good ideas <em>grow</em> on people.
            </h2>
            <p className="nx-manifesto-lead">
              Most modern marketing shouts from a template. It measures clicks while forgetting pulse,
              trading warmth for sterile funnels that everyone scrolls right past.
            </p>
            <p className="nx-manifesto-lead" style={{ color: "var(--ink-muted)", fontSize: "1.12rem" }}>
              At <strong>nexus</strong>, we shape brands by hand—combining sharp editorial strategy,
              tactile storytelling, and unmistakable visual worlds that earn genuine affection.
            </p>

            {/* Unboxed Editorial Proof Metadata */}
            <div className="nx-manifesto-proof" aria-label="Agency impact metrics">
              <span>
                <strong>+148%</strong> Average Brand Recall Lift in 12 Months
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong>94%</strong> Multi-Year Client Partnerships
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong>100%</strong> Hand-Crafted Studio Work
              </span>
            </div>
          </div>

          {/* Interactive Botanical Seal & Studio Note Card */}
          <div className="nx-manifesto-card" data-reveal>
            <div className="nx-manifesto-seals" role="tablist" aria-label="Studio principles">
              <button
                type="button"
                className={`nx-stamp-btn ${activePrinciple === "care" ? "is-active" : ""}`}
                role="tab"
                aria-selected={activePrinciple === "care"}
                onClick={() => setActivePrinciple("care")}
              >
                <span>✽ GROW WITH CARE</span>
              </button>
              <button
                type="button"
                className={`nx-stamp-btn ${activePrinciple === "feeling" ? "is-active" : ""}`}
                role="tab"
                aria-selected={activePrinciple === "feeling"}
                onClick={() => setActivePrinciple("feeling")}
              >
                <span>✿ MADE WITH FEELING</span>
              </button>
            </div>

            <blockquote className="nx-manifesto-note" id="manifesto-note-text">
              {PRINCIPLE_NOTES[activePrinciple]}
            </blockquote>

            <div className="nx-manifesto-art-footer">
              <div>
                <div style={{ fontWeight: 700, color: "var(--ink-deep)" }}>
                  Studio Almanac · Issue No. 04
                </div>
                <div style={{ fontSize: "0.92rem", color: "var(--ink-muted)" }}>
                  Portland · Kyoto · Independent Since 2019
                </div>
              </div>
              <img
                src="/templates/nexus/clay-flower.webp"
                alt=""
                aria-hidden="true"
                width={104}
                height={86}
                style={{ width: "104px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Process.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import { computeProcessMilestoneState } from "../model/agencyLogic";

interface Chapter {
  index: number;
  label: string;
  pillText: string;
  title: string;
  body: string;
  artifact: string;
}

const CHAPTERS: Chapter[] = [
  {
    index: 0,
    label: "Chapter 01 · Weeks 1–2",
    pillText: "01. Listen",
    title: "Listen — Soil & Roots",
    body: "We talk with your founders, your longest-tenured customers, and your skeptics. We walk the shop floor, read support tickets, and gather the raw human truths that spreadsheets miss.",
    artifact: "Deliverable: The Rootbook (Field Research & Positioning Thesis)",
  },
  {
    index: 1,
    label: "Chapter 02 · Weeks 3–5",
    pillText: "02. Imagine",
    title: "Imagine — Sketch & Clay",
    body: "Before touching a screen, our art directors and writers work on paper and unglazed clay—exploring metaphors, character sketches, editorial headlines, and tactile territory boards.",
    artifact: "Deliverable: Three Distinct Creative Worlds & Editorial Manifesto",
  },
  {
    index: 2,
    label: "Chapter 03 · Weeks 6–10",
    pillText: "03. Make",
    title: "Make — Hand & Craft",
    body: "We illustrate, sculpt, write, and code every asset in-house. From bespoke typography systems and packaging dielines to choreographed interactive web experiences.",
    artifact: "Deliverable: Complete Campaign Assets, Brand System & Flagship Site",
  },
  {
    index: 3,
    label: "Chapter 04 · Ongoing",
    pillText: "04. Grow",
    title: "Grow — Tend & Harvest",
    body: "A launch is only the first season. We measure real human resonance—repeat orders, organic story shares, and qualified inbound demand—iterating alongside your team.",
    artifact: "Deliverable: Seasonal Growth Experiments & Creative Stewardship",
  },
];

export function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [reachedChapters, setReachedChapters] = useState<boolean[]>([true, false, false, false]);
  const [dashOffset, setDashOffset] = useState(600);

  const timelineRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const rawProgress = (vh * 0.68 - rect.top) / Math.max(1, rect.height);

      const state = computeProcessMilestoneState(rawProgress, 4);
      setActiveIdx(state.activeChapterIndex);
      setReachedChapters(state.reachedChapters);
      setDashOffset(Math.round(800 * (1 - state.clampedProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpToChapter = (idx: number) => {
    setActiveIdx(idx);
    const updated = CHAPTERS.map((_, i) => i <= idx);
    setReachedChapters(updated);
    const manualProgress = [0.2, 0.48, 0.75, 1.0][idx] ?? 0.5;
    setDashOffset(Math.round(800 * (1 - manualProgress)));

    const targetEl = chapterRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="nx-process" id="process" aria-labelledby="process-heading">
      <div className="nx-container">
        <div className="nx-process-layout">
          {/* Left Sticky Story Intro */}
          <div className="nx-process-sticky" data-reveal>
            <span className="nx-kicker">03 · How We Work</span>
            <h2
              className="nx-section-title"
              id="process-heading"
              style={{ fontSize: "clamp(2.1rem, 3.8vw, 3.4rem)" }}
            >
              From first seed to full bloom.
            </h2>
            <p style={{ fontSize: "1.06rem", color: "var(--ink-muted)", margin: "0 0 1.25rem 0" }}>
              Great work cannot be forced on an assembly line, but it thrives with rhythm. Follow
              our four-chapter cultivation cycle—or jump directly to any stage below.
            </p>
            <div className="nx-process-nav" role="group" aria-label="Jump to process chapter">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.pillText}
                  type="button"
                  className={`nx-process-pill ${activeIdx === i ? "is-active" : ""}`}
                  data-chapter-target={i}
                  onClick={() => jumpToChapter(i)}
                >
                  {c.pillText}
                </button>
              ))}
            </div>
          </div>

          {/* Right Scroll-Driven Botanical Vine & 4 Chapters */}
          <div className="nx-process-timeline" id="process-timeline" ref={timelineRef}>
            <div className="nx-vine-spine" aria-hidden="true">
              <svg viewBox="0 0 44 760" fill="none" preserveAspectRatio="none">
                <path
                  d="M22 8 C34 140, 10 260, 22 380 C34 500, 10 620, 22 752"
                  stroke="var(--stroke)"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
                <path
                  id="growing-vine-path"
                  d="M22 8 C34 140, 10 260, 22 380 C34 500, 10 620, 22 752"
                  stroke="var(--sage)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 800,
                    strokeDashoffset: dashOffset,
                    transition: "stroke-dashoffset 0.15s linear",
                  }}
                />
              </svg>
            </div>

            {CHAPTERS.map((c, i) => {
              const reached = reachedChapters[i];
              return (
                <article
                  key={c.label}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  className={`nx-chapter-card ${reached ? "is-reached" : ""}`}
                  data-chapter-index={i}
                  data-reveal
                >
                  <div className="nx-chapter-marker" aria-hidden="true">
                    {i + 1}
                  </div>
                  <span className="nx-chapter-step">{c.label}</span>
                  <h3 className="nx-chapter-title">{c.title}</h3>
                  <p className="nx-chapter-body">{c.body}</p>
                  <div className="nx-chapter-artifact">{c.artifact}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/ProjectModal.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import type { WorkProject } from "../model/agencyLogic";

interface ProjectModalProps {
  project: (WorkProject & { modalKicker: string }) | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="nx-modal-backdrop is-open"
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="nx-modal-card">
        <button
          type="button"
          className="nx-modal-close"
          id="modal-close-btn"
          aria-label="Close case study"
          onClick={onClose}
        >
          Close
        </button>
        <span className="nx-kicker" id="modal-project-kicker">
          {project.modalKicker}
        </span>
        <h3
          className="nx-section-title"
          id="modal-project-title"
          style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}
        >
          {project.title}
        </h3>
        <div
          id="modal-project-metric"
          style={{ fontWeight: 700, color: "var(--terracotta)", marginBottom: "1.25rem" }}
        >
          {project.metric}
        </div>
        <p
          id="modal-project-challenge"
          style={{ fontSize: "1.05rem", color: "var(--ink)", marginBottom: "1rem" }}
        >
          {project.challenge}
        </p>
        <p
          id="modal-project-outcome"
          style={{ fontSize: "1.05rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}
        >
          {project.outcome}
        </p>
        <div style={{ borderTop: "1px dashed var(--stroke)", paddingTop: "1rem" }}>
          <strong style={{ display: "block", marginBottom: "0.4rem" }}>
            Crafted Deliverables:
          </strong>
          <div
            id="modal-project-deliverables"
            style={{ color: "var(--olive)", fontWeight: 600 }}
          >
            {project.deliverables.join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Services.tsx">
<![CDATA["use client";

import { useState } from "react";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  meta: string;
  drawer: string;
  motif: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    num: "01. Foundation",
    title: "Brand Strategy & Positioning",
    desc: "We unearth the human truth inside your company—defining category positioning, editorial voice, and visual architecture that competitors cannot copy-paste.",
    meta: "Audience Research · Verbal Identity · Brand World Systems",
    drawer:
      "Includes qualitative customer interviews, category whitespace mapping, a 60-page tactile Brand Field Guide, and messaging playbooks for founders and creative teams.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="var(--peach)" />
        <path d="M32 50 V22" stroke="#362E26" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M32 34 C20 32, 16 20, 26 16 C32 18, 34 26, 32 34 Z"
          fill="var(--sage)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <path
          d="M32 28 C44 26, 48 14, 38 10 C32 12, 30 20, 32 28 Z"
          fill="var(--olive)"
          stroke="#362E26"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    num: "02. Expression",
    title: "Campaign Creative & Storytelling",
    desc: "Integrated launch campaigns across film, out-of-home, print almanacs, and digital episodes that turn passive observers into vocal advocates.",
    meta: "Art Direction · Original Illustration · Film & Print",
    drawer:
      "From stop-motion clay sculptures and bespoke editorial illustrations to full production scripts and media rollout calendars built for sustained cultural momentum.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#F3D5B8" />
        <path
          d="M22 44 C22 28, 42 28, 42 44"
          stroke="var(--terracotta)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="18" r="7" fill="var(--mustard)" stroke="#362E26" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "03. Conversation",
    title: "Social & Editorial Content",
    desc: "Serialized stories, tactile visual essays, and community rituals designed for people who actually read—not algorithmic engagement bait.",
    meta: "Editorial Series · Illustrated Essays · Community Rituals",
    drawer:
      "Monthly editorial calendars, custom hand-drawn sticker packs, serialized short-form video direction, and newsletter publications with industry-leading open rates.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="#E4E8D5" />
        <path
          d="M20 38 C26 22, 38 22, 44 38 Z"
          fill="var(--terracotta)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <circle cx="24" cy="22" r="4" fill="var(--olive)" />
        <circle cx="40" cy="20" r="3" fill="var(--sage)" />
      </svg>
    ),
  },
  {
    num: "04. Environment",
    title: "Experiences & Websites",
    desc: "Bespoke interactive flagships, tactile packaging systems, and physical pop-ups where every hover, scroll, and unboxing feels unmistakably yours.",
    meta: "Interactive Flagships · Motion Design · Tactile Packaging",
    drawer:
      "Custom front-end choreography, accessible semantic engineering, interactive product storytellers, and physical-to-digital unboxing experiences.",
    motif: (
      <svg className="nx-service-motif" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="var(--peach)" />
        <rect
          x="18"
          y="20"
          width="28"
          height="24"
          rx="5"
          fill="var(--paper-light)"
          stroke="#362E26"
          strokeWidth="2"
        />
        <path
          d="M24 32 H40 M32 26 V38"
          stroke="var(--terracotta)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Services() {
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="nx-services" id="services" aria-labelledby="services-heading">
      <div className="nx-container">
        <div className="nx-services-header" data-reveal>
          <div>
            <span className="nx-kicker">02 · Capabilities</span>
            <h2 className="nx-section-title" id="services-heading">
              What we make bloom.
            </h2>
          </div>
          <p className="nx-services-intro">
            Four focused disciplines, crafted under one roof so your strategy and your visual soul never
            get lost in translation.
          </p>
        </div>

        <div className="nx-services-grid">
          {SERVICES.map((s, idx) => {
            const isExpanded = !!expandedMap[idx];
            return (
              <article
                key={s.num}
                className={`nx-service-card ${isExpanded ? "is-expanded" : ""}`}
                data-reveal
                data-tilt
              >
                <div>
                  <div className="nx-service-top">
                    <span className="nx-service-num">{s.num}</span>
                    {s.motif}
                  </div>
                  <h3 className="nx-service-title">{s.title}</h3>
                  <p className="nx-service-desc">{s.desc}</p>
                </div>
                <div>
                  <div className="nx-service-meta">{s.meta}</div>
                  <button
                    type="button"
                    className="nx-service-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => toggleExpanded(idx)}
                  >
                    <span>{isExpanded ? "Hide craft notes" : "Inspect craft notes"}</span>
                    <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                  </button>
                  <div className="nx-service-drawer">{s.drawer}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Testimonials.tsx">
<![CDATA["use client";

import { useState } from "react";
import { nextTestimonialIndex } from "../model/agencyLogic";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "“Before nexus, our brand sounded like every other botanical label on the shelf. They spent a week in our workshop, sculpted our new vessels in clay, and wrote a campaign that doubled our repeat customers without a single discount code.”",
    author: "Clara Vance",
    role: "Founder & Head Herbalist, Solstice Apothecary",
  },
  {
    quote:
      "“Working with nexus felt like collaborating with an indie publishing house and a master ceramicist at once. Our customers literally frame the print almanacs they designed for our autumn wool collection.”",
    author: "Julian Mercer",
    role: "Creative Director, Loom & Meadow",
  },
  {
    quote:
      "“They rebuilt our entire subscription experience around human warmth rather than dark-pattern upsells. Retention jumped 138% in six months because subscribers finally felt part of a real table.”",
    author: "Maeve O’Sullivan",
    role: "Co-Founder, Kith & Kin Roasters",
  },
];

export function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const current = TESTIMONIALS[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => nextTestimonialIndex(prev, "prev", TESTIMONIALS.length));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => nextTestimonialIndex(prev, "next", TESTIMONIALS.length));
  };

  return (
    <section className="nx-testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="nx-container">
        <div className="nx-quote-stage" data-reveal>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span className="nx-kicker" id="testimonials-heading">
              05 · Client Love
            </span>
            <span
              id="quote-counter"
              style={{
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "var(--ink-muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Note 0{currentIdx + 1} of 0{TESTIMONIALS.length}
            </span>
          </div>

          <blockquote className="nx-quote-text" id="testimonial-quote">
            {current.quote}
          </blockquote>

          <div className="nx-quote-footer">
            <div className="nx-quote-author">
              <strong id="testimonial-author">{current.author}</strong>
              <span id="testimonial-role">{current.role}</span>
            </div>

            <div className="nx-quote-controls">
              <button
                type="button"
                className="nx-IconBtn"
                id="testimonial-prev"
                aria-label="Previous client testimonial"
                onClick={handlePrev}
              >
                <span>← Prev</span>
              </button>
              <button
                type="button"
                className="nx-IconBtn"
                id="testimonial-next"
                aria-label="Next client testimonial"
                onClick={handleNext}
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/components/Work.tsx">
<![CDATA["use client";

import { useState } from "react";
import { filterWorkProjects, type WorkProject } from "../model/agencyLogic";
import { ProjectModal } from "./ProjectModal";

export const PROJECTS: (WorkProject & {
  modalKicker: string;
  artClass: string;
  svgArt: React.ReactNode;
})[] = [
  {
    id: "solstice",
    title: "Field Notes for Slow Mornings",
    client: "Solstice Apothecary",
    category: "brand",
    categoryLabel: "Brand World",
    year: "2026",
    metric: "+164% Direct Repeat Orders in 5 Months",
    summary:
      "Replaced sterile clinical skincare clichés with an heirloom botanical almanac, unglazed ceramic refill vessels, and hand-inked seasonal field notes.",
    challenge:
      "Solstice Apothecary crafted small-batch botanical balms in Oregon, but their original minimalist packaging blended into a sea of clinical white dropper bottles.",
    outcome:
      "We sculpted custom unglazed terracotta refill jars, illustrated a 32-page seasonal botanical almanac shipped with every order, and rewrote their digital flagship like an apothecary field journal.",
    deliverables: [
      "Brand Strategy",
      "Tactile Packaging System",
      "Botanical Illustrations",
      "Interactive Web Flagship",
    ],
    modalKicker: "Solstice Apothecary · Brand World · 2026",
    artClass: "nx-work-art--solstice",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <circle cx="120" cy="92" r="64" fill="var(--paper-light)" stroke="#362E26" strokeWidth="2" />
          <path
            d="M52 138 C76 112, 164 112, 188 138"
            stroke="var(--clay)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <g className="nx-art-layer-front">
          <rect
            x="92"
            y="54"
            width="56"
            height="78"
            rx="14"
            fill="var(--terracotta)"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <rect
            x="104"
            y="38"
            width="32"
            height="16"
            rx="4"
            fill="var(--olive)"
            stroke="#221B15"
            strokeWidth="2"
          />
          <rect x="100" y="72" width="40" height="42" rx="4" fill="var(--paper-light)" />
          <path
            d="M120 104 V82 M120 90 C112 84, 110 78, 116 76 M120 94 C128 88, 130 82, 124 80"
            stroke="var(--sage)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "loom",
    title: "The Living Thread Almanac",
    client: "Loom & Meadow",
    category: "campaigns",
    categoryLabel: "Campaigns",
    year: "2025",
    metric: "+210% Organic Story Shares Across 8 Weeks",
    summary:
      "Turned regenerative wool supply-chain data into a tactile print newspaper and stop-motion clay campaign celebrating the shepherds behind every garment.",
    challenge:
      "Loom & Meadow needed to communicate regenerative pasture-to-garment wool sourcing without sounding like a dry corporate sustainability PDF.",
    outcome:
      "We created stop-motion clay pasture dioramas, a broadsheet print almanac distributed in independent bookshops, and a four-part short film series profiling their partner shepherds.",
    deliverables: [
      "Campaign Art Direction",
      "Stop-Motion Clay Film",
      "Broadsheet Print Almanac",
      "Social Storytelling",
    ],
    modalKicker: "Loom & Meadow · Campaigns · 2025",
    artClass: "nx-work-art--loom",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <path
            d="M36 142 C68 62, 172 62, 204 142 Z"
            fill="var(--paper-light)"
            stroke="#221B15"
            strokeWidth="2"
          />
        </g>
        <g className="nx-art-layer-front">
          <circle cx="96" cy="96" r="32" fill="var(--mustard)" stroke="#221B15" strokeWidth="2.2" />
          <path
            d="M118 118 C118 76, 168 76, 168 118"
            stroke="var(--terracotta)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M74 96 C88 82, 104 82, 118 96"
            stroke="#221B15"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    id: "kith",
    title: "Table for Everyone",
    client: "Kith & Kin Roasters",
    category: "experiences",
    categoryLabel: "Experiences",
    year: "2026",
    metric: "+138% Subscription Retention Over 6 Months",
    summary:
      "Reimagined digital coffee subscriptions as an interactive flavor wheel, paired with letterpress tasting postcards tucked into every shipment.",
    challenge:
      "Online coffee subscriptions often feel transactional and algorithmic, losing the warmth of chatting with a neighborhood roaster across a wooden counter.",
    outcome:
      "We built an interactive tactile flavor wheel that pairs roast notes with morning rituals, accompanied by collectible letterpress tasting cards tucked into every shipment.",
    deliverables: [
      "Interactive Tasting Wheel",
      "Subscription Web Experience",
      "Letterpress Mailers",
      "Packaging",
    ],
    modalKicker: "Kith & Kin Roasters · Experiences · 2026",
    artClass: "nx-work-art--kith",
    svgArt: (
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none" aria-hidden="true">
        <g className="nx-art-layer-back">
          <rect
            x="48"
            y="34"
            width="144"
            height="112"
            rx="18"
            fill="var(--paper-light)"
            stroke="#221B15"
            strokeWidth="2"
          />
        </g>
        <g className="nx-art-layer-front">
          <path
            d="M84 78 H144 V106 C144 122, 84 122, 84 106 Z"
            fill="var(--terracotta)"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <path
            d="M144 84 H156 C164 84, 164 100, 156 100 H144"
            stroke="#221B15"
            strokeWidth="2.2"
          />
          <path
            d="M104 66 C104 54, 114 52, 114 42 M124 66 C124 54, 134 52, 134 42"
            stroke="var(--olive)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
];

export function Work() {
  const [filter, setFilter] = useState("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const displayedProjects = filterWorkProjects(PROJECTS, filter);
  const activeModalProject = PROJECTS.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <section className="nx-work" id="work" aria-labelledby="work-heading">
      <div className="nx-container">
        <div className="nx-work-top" data-reveal>
          <div>
            <span className="nx-kicker">04 · Selected Work</span>
            <h2 className="nx-section-title" id="work-heading">
              Cultivated with care.
            </h2>
          </div>

          <div className="nx-filter-bar" role="group" aria-label="Filter projects by discipline">
            <button
              type="button"
              className={`nx-filter-btn ${filter === "all" ? "is-active" : ""}`}
              data-filter="all"
              onClick={() => setFilter("all")}
            >
              All Work (3)
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "brand" ? "is-active" : ""}`}
              data-filter="brand"
              onClick={() => setFilter("brand")}
            >
              Brand World
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "campaigns" ? "is-active" : ""}`}
              data-filter="campaigns"
              onClick={() => setFilter("campaigns")}
            >
              Campaigns
            </button>
            <button
              type="button"
              className={`nx-filter-btn ${filter === "experiences" ? "is-active" : ""}`}
              data-filter="experiences"
              onClick={() => setFilter("experiences")}
            >
              Experiences
            </button>
          </div>
        </div>

        <div className="nx-work-grid" id="work-grid">
          {displayedProjects.map((p) => (
            <article
              key={p.id}
              className="nx-work-card"
              data-category={p.category}
              data-project-id={p.id}
              data-reveal
              data-tilt
            >
              <div className={`nx-work-art ${p.artClass}`}>{p.svgArt}</div>
              <div className="nx-work-body">
                <div className="nx-work-meta">
                  {p.client} · {p.categoryLabel} · {p.year}
                </div>
                <h3 className="nx-work-title">{p.title}</h3>
                <p className="nx-work-summary">{p.summary}</p>
                <div className="nx-work-metric">{p.metric}</div>
                <button
                  type="button"
                  className="nx-work-open-btn"
                  data-open-project={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                >
                  <span>Read Case Study</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(nexus)/nexus/model/agencyLogic.ts">
<![CDATA[export interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: "brand" | "campaigns" | "experiences";
  categoryLabel: string;
  year: string;
  metric: string;
  summary: string;
  challenge: string;
  outcome: string;
  deliverables: string[];
}

export interface BriefInput {
  name: string;
  email: string;
  company: string;
  scopes: string[];
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function filterWorkProjects<T extends WorkProject>(
  projects: T[],
  activeCategory: string
): T[] {
  if (!activeCategory || activeCategory === "all") {
    return projects;
  }
  return projects.filter((project) => project.category === activeCategory);
}

export function nextTestimonialIndex(
  currentIndex: number,
  direction: "next" | "prev",
  total: number
): number {
  if (total <= 0) return 0;
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function computeProcessMilestoneState(
  scrollProgress: number,
  totalChapters: number = 4
): {
  clampedProgress: number;
  activeChapterIndex: number;
  reachedChapters: boolean[];
} {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const thresholds = [0.08, 0.36, 0.64, 0.88].slice(0, totalChapters);
  const reachedChapters = thresholds.map((t) => clamped >= t);
  let activeChapterIndex = 0;
  for (let i = 0; i < reachedChapters.length; i++) {
    if (reachedChapters[i]) {
      activeChapterIndex = i;
    }
  }
  return {
    clampedProgress: clamped,
    activeChapterIndex,
    reachedChapters,
  };
}

export function validateBriefInput(input: BriefInput): ValidationResult {
  const errors: ValidationResult["errors"] = {};
  const trimmedName = (input.name || "").trim();
  const trimmedEmail = (input.email || "").trim();
  const trimmedMessage = (input.message || "").trim();

  if (trimmedName.length < 2) {
    errors.name = "Please share your name so we know how to address you.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }
  if (trimmedMessage.length < 10) {
    errors.message =
      "Please add a short note (at least 10 characters) about what you are growing.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatBriefSummary(input: BriefInput): string {
  const scopeText =
    input.scopes && input.scopes.length > 0
      ? input.scopes.join(", ")
      : "General Partnership";
  return [
    `Hello nexus team,`,
    ``,
    `We would love to partner up on a new project.`,
    `Name: ${input.name.trim()}`,
    `Organization: ${input.company && input.company.trim() ? input.company.trim() : "Independent"}`,
    `Email: ${input.email.trim()}`,
    `Focus Areas: ${scopeText}`,
    ``,
    `Project Note:`,
    input.message.trim(),
  ].join("\n");
}

export function buildMailtoHref(
  input: BriefInput,
  recipient = "hello@nexus-studio.example"
): string {
  const scopeText =
    input.scopes && input.scopes.length > 0
      ? input.scopes.join(", ")
      : "General Partnership";
  const companyPart =
    input.company && input.company.trim() ? ` (${input.company.trim()})` : "";
  const subject = `Project Seed from ${input.name.trim()}${companyPart} — ${scopeText}`;
  const body = formatBriefSummary(input);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const buildMailtoUrl = buildMailtoHref;
]]>
    </file>
  </files>
</template>
