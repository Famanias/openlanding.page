<template slug="bathys" name="BATHYS">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(bathys)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Sora, Share_Tech_Mono } from "next/font/google";
import "./bathys/bathys.css";

const display = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const body = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sora",
  display: "swap",
});

const mono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-share-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BATHYS — Autonomous Hadal Exploration Vehicles",
  description:
    "Autonomous hadopelagic exploration vehicles engineered to endure 1,100 bar hydrostatic pressure in the Challenger Deep without umbilical tether.",
  openGraph: {
    title: "BATHYS — Autonomous Hadal Exploration Vehicles",
    description: "Calibrated for the crushing dark. 11,000 metres depth certified.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03070D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function BathysLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>
            {`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}
              .bat-mask-line > span{transform:none!important}`}
          </style>
        </noscript>
      </head>
      <body className="bat-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {
  "hero-submersible-descent": { "w": 1600, "h": 900 },
};
]]>
    </file>
    <file path="src/app/(bathys)/bathys/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/bathys";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`bat-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="bat-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/bathys.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-trench: #03070D;
  --color-navy: #0A1526;
  --color-titanium: #EDF5FA;
  --color-cyan: #00E5FF;
  --color-amber: #FF9E1B;
  --color-glass: #122338;
  --color-slate: #546E8A;
  --color-mist: #8DA8C2;

  --font-display: var(--font-chakra), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: var(--font-sora), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: var(--font-share-mono), ui-monospace, Menlo, monospace;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-spring: linear(0, 0.35 8%, 0.82 20%, 1.06 30%, 1.02 42%, 0.99 58%, 1);

  --dur-instant: 90ms;
  --dur-fast: 160ms;
  --dur-base: 380ms;
  --dur-slow: 750ms;
  --dur-hero: 1200ms;

  --reveal-shift: 24px;
  --stagger: 65ms;
}

/* Root body layout */
.bat-body {
  margin: 0;
  background-color: var(--color-trench);
  color: var(--color-titanium);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: clip;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Base interactive elements */
::selection {
  background-color: var(--color-cyan);
  color: var(--color-trench);
}

:focus-visible {
  outline: 2px solid var(--color-cyan);
  outline-offset: 2px;
}

/* Container wraps */
.bat-wrap {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(18px, 4.5vw, 64px);
  padding-right: clamp(18px, 4.5vw, 64px);
}

/* Button & Interactive styles */
.bat-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  transition: transform var(--dur-instant) var(--ease-out),
              background-color var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out);
}

.bat-btn:active {
  transform: scale(0.97);
  transition-timing-function: var(--ease-spring);
}

.bat-btn-primary {
  background-color: var(--color-cyan);
  color: var(--color-trench);
  border: 1px solid var(--color-cyan);
}

@media (hover: hover) and (pointer: fine) {
  .bat-btn-primary:hover {
    background-color: color-mix(in srgb, var(--color-cyan) 85%, #EDF5FA);
    border-color: color-mix(in srgb, var(--color-cyan) 85%, #EDF5FA);
  }
}

.bat-btn-outline {
  background-color: transparent;
  color: var(--color-titanium);
  border: 1px solid var(--color-slate);
}

@media (hover: hover) and (pointer: fine) {
  .bat-btn-outline:hover {
    border-color: var(--color-cyan);
    color: var(--color-cyan);
  }
}

/* Card primitives */
.bat-card {
  position: relative;
  background-color: var(--color-navy);
  border: 1px solid var(--color-glass);
  border-radius: 8px;
  padding: 24px;
  transition: border-color var(--dur-fast) var(--ease-out),
              transform var(--dur-base) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .bat-card:hover {
    border-color: color-mix(in srgb, var(--color-cyan) 40%, var(--color-glass));
    transform: translateY(-4px);
  }
}

/* Grid & Telemetry metadata */
.bat-mono {
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
}

.bat-display {
  font-family: var(--font-display);
}

/* Headline line wrappers stack in every motion mode */
.bat-mask-line {
  display: block;
}

/* Revealed animation engine */
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] {
    transition: opacity var(--dur-slow) var(--ease-out),
                transform var(--dur-slow) var(--ease-out),
                clip-path var(--dur-slow) var(--ease-in-out);
    transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger));
  }

  [data-reveal="rise"]:not([data-in="true"]) {
    opacity: 0;
    transform: translateY(var(--reveal-shift));
  }

  [data-reveal="wipe"]:not([data-in="true"]) {
    clip-path: inset(0 0 100% 0);
  }

  [data-reveal="scale"]:not([data-in="true"]) {
    opacity: 0;
    transform: scale(0.95);
  }

  [data-reveal="draw"]:not([data-in="true"]) {
    transform: scaleX(0);
    transform-origin: left;
  }

  /* SplitText line mask */
  .bat-mask-line {
    display: block;
    overflow: clip;
  }

  .bat-mask-line > span {
    display: block;
    transform: translateY(115%);
    transition: transform var(--dur-slow) var(--ease-out);
    transition-delay: calc(var(--delay, 0ms) + var(--i, 0) * var(--stagger));
  }

  [data-in="true"] .bat-mask-line > span {
    transform: translateY(0);
  }
}

/* Reduced motion overrides */
@media (prefers-reduced-motion: reduce) {
  [data-reveal],
  .bat-mask-line > span {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    transition: none !important;
  }
}

/* ------------------------------------------------------------------
   Ocean scene: page-wide water column (OceanAmbient) + hero (HeroScene)
   Hallmark · genre: atmospheric · theme: Bathys (locked palette) · enrichment: Tier A/B (CSS + hand-built SVG, canvas snow)
   ------------------------------------------------------------------ */

.bat-ocean {
  --dive: 0;
}

/* Sunlit upper water: cyan-tinted navy that is gone by ~50% of the dive */
.bat-ocean-shallow {
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--color-cyan) 14%, var(--color-navy)) 0%,
    var(--color-navy) 55%,
    transparent 100%
  );
  opacity: max(0, calc(1 - var(--dive) * 2));
}

/* Bioluminescent motes that only appear once the light is gone */
.bat-ocean-motes {
  background:
    radial-gradient(ellipse 38% 26% at 18% 72%, color-mix(in srgb, var(--color-cyan) 12%, transparent), transparent 70%),
    radial-gradient(ellipse 30% 22% at 84% 38%, color-mix(in srgb, var(--color-cyan) 9%, transparent), transparent 70%),
    radial-gradient(ellipse 26% 18% at 60% 88%, color-mix(in srgb, var(--color-amber) 4%, transparent), transparent 70%);
  opacity: min(1, max(0, calc((var(--dive) - 0.2) * 2.2)));
}

/* Depth ruler ticks: minor every 16px, major every 80px (matches TICK_PERIOD) */
.bat-ruler {
  background-image:
    linear-gradient(to bottom, var(--color-mist) 0 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-slate) 0 1px, transparent 1px);
  background-size: 18px 80px, 8px 16px;
  background-repeat: repeat-y;
  will-change: transform;
}

.bat-seafloor {
  transform: translate3d(0, calc((1 - clamp(0, (var(--dive) - 0.8) * 5, 1)) * 100%), 0);
}

/* Hero: surface glow, light shafts, scrim, handoff */
.bat-hero-glow {
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--color-cyan) 16%, transparent),
    transparent
  );
}

.bat-hero-rays {
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

.bat-ray {
  position: absolute;
  top: -8%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--color-cyan) 22%, transparent),
    transparent 90%
  );
  -webkit-mask-image: linear-gradient(to right, transparent, black 50%, transparent);
  mask-image: linear-gradient(to right, transparent, black 50%, transparent);
  transform: skewX(-16deg);
  animation: bat-ray 12s var(--ease-in-out) infinite alternate;
}

.bat-hero-scrim {
  background: linear-gradient(
    to right,
    color-mix(in srgb, var(--color-trench) 78%, transparent) 0%,
    color-mix(in srgb, var(--color-trench) 48%, transparent) 38%,
    transparent 66%
  );
}

.bat-hero-fade {
  background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-navy) 70%, transparent));
}

/* Hero callouts, positioned each frame by scene/SubmersibleScene */
.bat-callout {
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
}

.bat-callout-dot {
  position: absolute;
  left: -3px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-cyan);
}

.bat-callout-line {
  position: absolute;
  left: 0;
  top: 0;
  height: 1px;
  transform-origin: 0 50%;
  background: color-mix(in srgb, var(--color-mist) 55%, transparent);
}

.bat-callout-text {
  position: absolute;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  line-height: 1.4;
  color: var(--color-mist);
}

.bat-callout-text small {
  display: block;
  font-size: 10px;
  color: color-mix(in srgb, var(--color-mist) 65%, transparent);
}

.bat-wave {
  animation: bat-wave 46s linear infinite;
}

.bat-wave-fast {
  animation-duration: 28s;
}

.bat-strobe {
  animation: bat-strobe 2.6s ease-in-out infinite;
}

@keyframes bat-ray {
  from { transform: skewX(-16deg) translate3d(-18px, 0, 0); opacity: 0.5; }
  to   { transform: skewX(-16deg) translate3d(24px, 0, 0); opacity: 1; }
}

@keyframes bat-wave {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}

@keyframes bat-strobe {
  0%, 62%, 100% { opacity: 0.25; }
  68%, 74%      { opacity: 1; }
  71%           { opacity: 0.35; }
}

@media (prefers-reduced-motion: reduce) {
  .bat-ray,
  .bat-wave,
  .bat-strobe {
    animation: none !important;
  }

  .bat-strobe {
    opacity: 0.8;
  }
}

/* Labelled placeholder styling */
.bat-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-navy);
  border: 1px dashed var(--color-slate);
  border-radius: 6px;
  min-height: 200px;
  color: var(--color-mist);
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 16px;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/icon.svg">
<![CDATA[<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="80" height="80" rx="16" fill="#03070D" />
  <circle cx="40" cy="40" r="32" stroke="#EDF5FA" stroke-width="4" />
  <circle cx="40" cy="40" r="24" stroke="#546E8A" stroke-width="1.5" stroke-dasharray="3 3" />
  <circle cx="40" cy="40" r="16" stroke="#00E5FF" stroke-width="2.5" />
  <circle cx="40" cy="40" r="5" fill="#00E5FF" />
  <path d="M48 32 L60 20 M50 40 L66 40 M48 48 L60 60" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round" />
</svg>
]]>
    </file>
    <file path="src/app/(bathys)/bathys/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BATHYS — Autonomous Hadal Exploration Vehicles";

const TRENCH = "#03070D";
const NAVY = "#0A1526";
const TITANIUM = "#EDF5FA";
const CYAN = "#00E5FF";
const AMBER = "#FF9E1B";
const GLASS = "#122338";
const SLATE = "#546E8A";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: TRENCH,
          color: TITANIUM,
          fontFamily: "sans-serif",
          position: "relative",
          padding: "64px 72px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680, zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke={TITANIUM} strokeWidth="4" />
              <circle cx="40" cy="40" r="28" stroke={SLATE} strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="40" cy="40" r="18" stroke={CYAN} strokeWidth="3" />
              <circle cx="40" cy="40" r="6" fill={CYAN} />
              <path d="M50 30 L63 17 M53 40 L71 40 M50 50 L63 63" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 4, color: TITANIUM }}>BATHYS</div>
            <div style={{ fontSize: 13, letterSpacing: 2.5, color: SLATE, marginLeft: 10 }}>BREST &amp; MONTEREY</div>
          </div>

          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1, color: TITANIUM }}>
            Engineered for the 11,000-metre breach.
          </div>

          <div style={{ fontSize: 20, color: SLATE, marginTop: 20, lineHeight: 1.4 }}>
            Autonomous titanium submersibles engineered to endure 1,100 bar hydrostatic pressure in the Challenger Deep without umbilical tether.
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: CYAN }}>
              DEPTH: 10,928 M
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: AMBER }}>
              PRESSURE: 1,114 BAR
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: GLASS, border: `1px solid ${SLATE}`, borderRadius: 4, fontSize: 13, color: TITANIUM }}>
              Ti-6Al-4V GRADE 5
            </div>
          </div>
        </div>

        {/* Right side radar / hull diagram */}
        <div style={{ display: "flex", position: "relative", width: 380, height: 380, alignItems: "center", justifyContent: "center" }}>
          <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
            <circle cx="180" cy="180" r="160" stroke={NAVY} strokeWidth="2" fill={GLASS} />
            <circle cx="180" cy="180" r="120" stroke={SLATE} strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="180" cy="180" r="75" stroke={CYAN} strokeWidth="2.5" />
            <line x1="180" y1="20" x2="180" y2="340" stroke={SLATE} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="180" x2="340" y2="180" stroke={SLATE} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="180" cy="180" r="8" fill={CYAN} />
            <circle cx="230" cy="130" r="5" fill={AMBER} />
            <line x1="180" y1="180" x2="270" y2="90" stroke={CYAN} strokeWidth="2" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/page.tsx">
<![CDATA[import React from "react";
import { HeaderHUD } from "./sections/HeaderHUD";
import { Hero } from "./sections/Hero";
import { OceanAmbient } from "./sections/OceanAmbient";
import { SubmersibleScene } from "./scene/SubmersibleScene";
import { DeepLife } from "./life/DeepLife";
import { DescentSection } from "./descent/DescentSection";
import { ArchitectureSection } from "./sections/ArchitectureSection";
import { SensorSuiteSection } from "./sections/SensorSuiteSection";
import { TrenchDossiersSection } from "./sections/TrenchDossiersSection";
import { CharterFormSection } from "./forms/CharterFormSection";
import { Footer } from "./sections/Footer";

export default function BathysPage() {
  return (
    <main className="min-h-screen bg-trench text-titanium flex flex-col relative isolate">
      <OceanAmbient />
      <DeepLife />
      <SubmersibleScene />
      <HeaderHUD />
      <Hero />
      <DescentSection />
      <ArchitectureSection />
      <SensorSuiteSection />
      <TrenchDossiersSection />
      <CharterFormSection />
      <Footer />
    </main>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/brand/Logo.tsx">
<![CDATA[import React from "react";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function LogoMark({ className = "w-10 h-10", variant = "dark" }: LogoProps) {
  const strokeColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const ruleColor = "#546E8A";
  const accentColor = "#00E5FF";

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BATHYS Hadal Mark"
    >
      <circle cx="40" cy="40" r="36" stroke={strokeColor} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="28" stroke={ruleColor} strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="40" cy="40" r="18" stroke={accentColor} strokeWidth="2" />
      <line x1="40" y1="1" x2="40" y2="9" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="40" y1="71" x2="40" y2="79" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="1" y1="40" x2="9" y2="40" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="71" y1="40" x2="79" y2="40" stroke={strokeColor} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="5" fill={accentColor} />
      <path
        d="M50 30 L63 17 M53 40 L71 40 M50 50 L63 63"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoLockup({ className = "w-auto h-10", variant = "dark" }: LogoProps) {
  const textColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const subTextColor = variant === "dark" ? "#00E5FF" : "#546E8A";
  const strokeColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const accentColor = "#00E5FF";

  return (
    <svg
      viewBox="0 0 380 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BATHYS Hadal Dynamics"
    >
      <g transform="translate(10, 10)">
        <circle cx="35" cy="35" r="32" stroke={strokeColor} strokeWidth="3" />
        <circle cx="35" cy="35" r="26" stroke="#546E8A" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="35" cy="35" r="16" stroke={accentColor} strokeWidth="1.8" />
        <line x1="35" y1="0" x2="35" y2="7" stroke={strokeColor} strokeWidth="3" />
        <line x1="35" y1="63" x2="35" y2="70" stroke={strokeColor} strokeWidth="3" />
        <line x1="0" y1="35" x2="7" y2="35" stroke={strokeColor} strokeWidth="3" />
        <line x1="63" y1="35" x2="70" y2="35" stroke={strokeColor} strokeWidth="3" />
        <circle cx="35" cy="35" r="4.5" fill={accentColor} />
        <path
          d="M44 26 L56 14 M47 35 L64 35 M44 44 L56 56"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="96"
        y="47"
        fontFamily="var(--font-chakra, sans-serif)"
        fontWeight="700"
        fontSize="34"
        letterSpacing="4"
        fill={textColor}
      >
        BATHYS
      </text>
      <text
        x="98"
        y="65"
        fontFamily="var(--font-share-mono, monospace)"
        fontSize="10.5"
        letterSpacing="2.2"
        fill={subTextColor}
      >
        HADAL ROBOTICS · 11,000 M DEPTH CERTIFIED
      </text>
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/descent/DepthRail.tsx">
<![CDATA["use client";

import React, { useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import { MAX_DEPTH, OCEAN_ZONES, depthToProgress } from "./physics";

export function DepthRail({ className = "" }: { className?: string }) {
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const prog = depthToProgress(depth);

  return (
    <div
      className={`hidden lg:flex flex-col items-center justify-between py-6 px-3 bg-navy/80 border-l border-glass backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      <div className="bat-mono text-[10px] text-slate uppercase tracking-widest rotate-180 [writing-mode:vertical-rl]">
        0 M · SURFACE
      </div>

      {/* Vertical Track */}
      <div className="relative w-1 flex-1 my-4 bg-glass rounded-full overflow-hidden">
        {/* Fill line */}
        <div
          className="absolute top-0 left-0 w-full bg-cyan transition-[height] duration-75"
          style={{ height: `${(prog * 100).toFixed(2)}%` }}
        />

        {/* Zone markers */}
        {OCEAN_ZONES.map((zone) => {
          const zoneProg = depthToProgress(zone.startDepth);
          return (
            <div
              key={zone.name}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-[1px] bg-slate/60"
              style={{ top: `${(zoneProg * 100).toFixed(2)}%` }}
              title={`${zone.name}: ${zone.depthRange}`}
            />
          );
        })}
      </div>

      <div className="bat-mono text-[10px] text-amber uppercase tracking-widest rotate-180 [writing-mode:vertical-rl]">
        10,928 M · HADAL
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/descent/DescentSection.tsx">
<![CDATA["use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import {
  MAX_DEPTH,
  OCEAN_ZONES,
  getOceanZone,
  calculatePressure,
  calculateLightAbsorption,
} from "./physics";
import { GaugeHUD } from "./GaugeHUD";
import { DepthRail } from "./DepthRail";
import { SonarRadar } from "../sonar/SonarRadar";
import { useReducedMotion } from "../motion/useReducedMotion";

export function DescentSection() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const reduced = useReducedMotion();

  const currentZone = getOceanZone(depth);
  const absorption = calculateLightAbsorption(depth);
  const isHadal = depth >= 6000;

  // Scroll sync: calculate depth from scroll offset within outerRef
  useEffect(() => {
    if (reduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = outerRef.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollable = rect.height - viewportHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          // Progress 0 when top of section reaches top of viewport, 1 at bottom
          const scrollProgress = Math.max(0, Math.min(-rect.top / totalScrollable, 1));
          store.setDepth(Math.round(scrollProgress * MAX_DEPTH));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [store, reduced]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    store.setDepth(val);
  };

  const jumpToDepth = (targetDepth: number) => {
    store.setDepth(targetDepth);
  };

  return (
    <section
      id="descent"
      ref={outerRef}
      className="relative w-full"
      style={{ minHeight: reduced ? "auto" : "320vh" }}
      aria-label="The Hadal Descent Stage"
    >
      {/* Sticky Stage Container */}
      <div
        className="sticky top-[64px] w-full min-h-[calc(100vh-64px)] flex flex-col justify-between py-6 overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isHadal
            ? "color-mix(in srgb, var(--color-trench) 66%, transparent)"
            : "color-mix(in srgb, var(--color-navy) 58%, transparent)",
          backgroundImage: `radial-gradient(circle at 50% 10%, color-mix(in srgb, var(--color-cyan) ${(15 * absorption).toFixed(1)}%, transparent) 0%, transparent 70%)`,
        }}
      >
        <div className="bat-wrap flex-1 flex flex-col justify-between z-10">
          {/* Header row inside stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-glass pb-4 mb-4">
            <div>
              <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold">
                02 // The Hadal Dive
              </span>
              <h2 className="bat-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-titanium mt-1">
                Vertical Sounding: {currentZone.name} Zone
              </h2>
            </div>

            {/* Presets Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bat-mono text-[10px] text-slate uppercase mr-1">Presets:</span>
              {[
                { label: "0m", depth: 0 },
                { label: "1,000m", depth: 1000 },
                { label: "4,000m", depth: 4000 },
                { label: "6,000m", depth: 6000 },
                { label: "10,928m", depth: 10928 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => jumpToDepth(p.depth)}
                  className={`bat-btn text-[11px] py-1 px-3.5 border rounded ${
                    Math.abs(depth - p.depth) < 200
                      ? "bg-cyan text-trench border-cyan font-bold"
                      : "bg-navy/60 text-mist border-glass hover:border-slate"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Column Layout: HUD & Sonar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
            {/* Left 7 cols: Telemetry Readouts & Zone Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <GaugeHUD />

              <div className="bg-navy/80 border border-glass rounded-lg p-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-glass pb-2 mb-3">
                  <span className="bat-mono text-xs text-amber font-bold uppercase tracking-wider">
                    Zone Analysis: {currentZone.depthRange}
                  </span>
                  <span className="bat-mono text-[11px] text-mist">
                    {currentZone.pressureRange}
                  </span>
                </div>
                <h3 className="bat-display text-lg font-bold text-titanium uppercase mb-2">
                  {currentZone.tagline}
                </h3>
                <p className="text-sm text-mist leading-relaxed font-body">
                  {depth < 200 &&
                    "Surface layer with primary GPS telemetry acquisition, hull sensor calibration, and negative buoyancy trim confirmation."}
                  {depth >= 200 && depth < 1000 &&
                    "The thermocline boundary. Rapid thermal collapse from 26°C to 4°C accompanied by 99% solar irradiance extinction."}
                  {depth >= 1000 && depth < 4000 &&
                    "The midnight void. Sunlight is completely absent. Synthetic aperture multibeam acoustics engage for benthic topography resolution."}
                  {depth >= 4000 && depth < 6000 &&
                    "The abyssal plain. Pelagic clay substrate extends across thousands of kilometers under 500+ bar hydrostatic pressure."}
                  {depth >= 6000 &&
                    "The Hadal Breach. Entering the tectonic Challenger Deep trench. Ambient pressure exceeds 1,100 bar on the Grade-5 titanium pressure hull."}
                </p>
              </div>

              {/* Range Scrubber Control */}
              <div className="bg-navy/80 border border-glass rounded-lg p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs bat-mono text-slate">
                  <span>MANUAL DEPTH SCRUBBER</span>
                  <span className="text-cyan font-bold tabular-nums">{depth.toLocaleString()} M</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_DEPTH}
                  step="10"
                  value={depth}
                  onChange={handleSliderChange}
                  className="w-full accent-cyan cursor-pointer bg-glass h-2 rounded-lg"
                  aria-label="Dive Depth Scrubber"
                />
                <div className="flex justify-between bat-mono text-[10px] text-slate">
                  <span>0 M (SURFACE)</span>
                  <span>10,928 M (CHALLENGER DEEP)</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Acoustic Radar */}
            <div className="lg:col-span-5 flex justify-center">
              <SonarRadar className="w-full max-w-[400px]" />
            </div>
          </div>

          {/* Subsea Coordinates footer strip */}
          <div className="flex items-center justify-between border-t border-glass pt-3 mt-4 text-xs bat-mono text-slate">
            <span>CHALLENGER DEEP SOUNDING // 11°22.4&apos; N · 142°35.5&apos; E</span>
            <span className={isHadal ? "text-amber font-bold animate-pulse" : "text-cyan"}>
              {isHadal ? "HADAL LOCK ACTIVE" : "OCEANIC DESCENT NOMINAL"}
            </span>
          </div>
        </div>

        {/* Right Depth Rail indicator */}
        <DepthRail className="absolute right-0 top-0 bottom-0 z-20" />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/descent/GaugeHUD.tsx">
<![CDATA["use client";

import React, { useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import {
  calculatePressure,
  calculateLightAbsorption,
  calculateWaterTemp,
  getOceanZone,
} from "./physics";

export function GaugeHUD({ className = "" }: { className?: string }) {
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);

  const pressure = calculatePressure(depth);
  const absorption = calculateLightAbsorption(depth);
  const temp = calculateWaterTemp(depth);
  const zone = getOceanZone(depth);

  const isHadal = depth >= 6000;

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-3 bg-navy/90 border border-glass rounded-lg p-4 md:p-6 backdrop-blur-md ${className}`}
      role="region"
      aria-label="Hydrostatic Telemetry Gauge"
    >
      {/* Metric 1: Depth */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Depth Sounding</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {depth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">M</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          Zone: <span className={isHadal ? "text-amber font-semibold" : "text-cyan"}>{zone.name}</span>
        </span>
      </div>

      {/* Metric 2: Pressure */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Hydrostatic Load</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {pressure.bar.toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">BAR</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          {(pressure.mpa).toFixed(1)} MPa · {isHadal ? "EXTREME LOAD" : "NOMINAL"}
        </span>
      </div>

      {/* Metric 3: Water Temperature */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">In-Situ Temp</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {temp.toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">°C</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          Salinity: 34.8 PSU
        </span>
      </div>

      {/* Metric 4: Solar Transmission */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Solar Transmission</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {(absorption * 100).toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">%</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          {absorption === 0 ? "100% Extinct (Void)" : "Attenuating"}
        </span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/descent/physics.ts">
<![CDATA[export const MAX_DEPTH = 10928;

export type OceanZoneName =
  | "Epipelagic"
  | "Mesopelagic"
  | "Bathypelagic"
  | "Abyssopelagic"
  | "Hadopelagic";

export type OceanZone = {
  name: OceanZoneName;
  tagline: string;
  depthRange: string;
  startDepth: number;
  endDepth: number;
  lightStatus: string;
  pressureRange: string;
};

export const OCEAN_ZONES: OceanZone[] = [
  {
    name: "Epipelagic",
    tagline: "Sunlight & Surface Calibration",
    depthRange: "0–200 M",
    startDepth: 0,
    endDepth: 200,
    lightStatus: "100% – 10% Solar Transmission",
    pressureRange: "1.0 – 21.0 BAR",
  },
  {
    name: "Mesopelagic",
    tagline: "The Twilight & Thermocline Barrier",
    depthRange: "200–1,000 M",
    startDepth: 200,
    endDepth: 1000,
    lightStatus: "10% – 0.1% Fading Radiance",
    pressureRange: "21.0 – 102.5 BAR",
  },
  {
    name: "Bathypelagic",
    tagline: "Midnight Oceanic Extinction",
    depthRange: "1,000–4,000 M",
    startDepth: 1000,
    endDepth: 4000,
    lightStatus: "Absolute Solar Extinction (Bioluminescence Only)",
    pressureRange: "102.5 – 408.0 BAR",
  },
  {
    name: "Abyssopelagic",
    tagline: "The Abyssal Plains",
    depthRange: "4,000–6,000 M",
    startDepth: 4000,
    endDepth: 6000,
    lightStatus: "Pitch Black Pelagic Basins",
    pressureRange: "408.0 – 612.0 BAR",
  },
  {
    name: "Hadopelagic",
    tagline: "The Challenger Deep Trench Breach",
    depthRange: "6,000–10,928 M",
    startDepth: 6000,
    endDepth: 10928,
    lightStatus: "Total Hadal Void · High-Frequency Active Sonar",
    pressureRange: "612.0 – 1,114.2 BAR",
  },
];

export function calculatePressure(depthMeters: number): { bar: number; mpa: number } {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  // Compressibility-corrected hydrostatic equation
  const hydrostaticBar = (1026 * 9.80665 * d * (1 + 1.25e-6 * d)) / 100000;
  const bar = 1.01325 + hydrostaticBar;
  const mpa = bar / 10;
  return { bar, mpa };
}

export function calculateLightAbsorption(depthMeters: number): number {
  const d = Math.max(0, depthMeters);
  if (d >= 4000) return 0;
  const val = Math.exp(-0.0045 * d);
  return val < 0.001 ? 0 : val;
}

export function calculateWaterTemp(depthMeters: number): number {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  if (d <= 1000) {
    // Surface warm layer into thermocline
    return 26.0 - 22.0 * Math.pow(d / 1000, 0.6);
  }
  // Deep ocean gradual cooling from 4.0C to 1.8C
  const fraction = (d - 1000) / (MAX_DEPTH - 1000);
  return 4.0 - 2.2 * fraction;
}

export function getOceanZone(depthMeters: number): OceanZone {
  const d = Math.max(0, Math.min(depthMeters, MAX_DEPTH));
  for (const zone of OCEAN_ZONES) {
    if (d <= zone.endDepth) {
      return zone;
    }
  }
  return OCEAN_ZONES[OCEAN_ZONES.length - 1];
}

export function depthToProgress(depthMeters: number): number {
  return Math.max(0, Math.min(depthMeters / MAX_DEPTH, 1));
}

export function progressToDepth(prog: number): number {
  return Math.max(0, Math.min(prog, 1)) * MAX_DEPTH;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/descent/store.ts">
<![CDATA[import { MAX_DEPTH } from "./physics";

export type DescentStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => number;
  setDepth: (depth: number) => void;
};

export function createDescentStore(initialDepth = 0): DescentStore {
  let currentDepth = Math.max(0, Math.min(initialDepth, MAX_DEPTH));
  const listeners = new Set<() => void>();

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return currentDepth;
    },
    setDepth(depth: number) {
      const next = Math.max(0, Math.min(depth, MAX_DEPTH));
      if (next !== currentDepth) {
        currentDepth = next;
        listeners.forEach((fn) => fn());
      }
    },
  };
}

// Global default singleton store for client pages
let defaultStore: DescentStore | null = null;

export function getDefaultDescentStore(): DescentStore {
  if (!defaultStore) {
    defaultStore = createDescentStore(0);
  }
  return defaultStore;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/forms/CharterFormSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { validateCharterForm, type CharterFormValues, type CharterFormErrors } from "./validate";
import { Reveal } from "../motion/Reveal";

const INITIAL_VALUES: CharterFormValues = {
  name: "",
  email: "",
  organization: "",
  trenchZone: "mariana",
  payloadMassKg: 50,
  missionWindow: "2026-Q4",
  requirements: "",
};

export function CharterFormSection() {
  const [values, setValues] = useState<CharterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CharterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    // Clear error on edit
    if (errors[name as keyof CharterFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCharterForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulated short client-side verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setIsSuccess(false);
  };

  return (
    <section id="charter" className="py-24 border-b border-glass bg-navy/40 relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            06 // Expedition Commission
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Charter &amp; Scientific Payload Intake
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Reserve autonomous dive missions or integrate bespoke academic sensor payloads onto the Bathys H-11 vehicle platform.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto bg-navy border border-glass rounded-xl p-6 sm:p-10 relative">
          {isSuccess ? (
            <div
              role="status"
              aria-live="polite"
              className="text-center py-10 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center mb-6">
                <span className="text-cyan font-bold text-2xl">✓</span>
              </div>
              <h3 className="bat-display text-2xl sm:text-3xl font-bold uppercase text-titanium mb-3">
                Mission Dossier Lodged
              </h3>
              <p className="text-mist font-body max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
                Thank you, <strong className="text-titanium">{values.name}</strong>. Your charter request for the{" "}
                <span className="text-cyan font-mono font-semibold uppercase">{values.trenchZone} Trench</span> ({values.payloadMassKg} kg payload) has been logged in the Brest flight ledger.
              </p>
              <div className="bat-mono text-xs text-slate bg-glass/60 border border-glass px-4 py-2 rounded mb-8">
                FLIGHT CONFIRMATION // HADAL-2026-X8
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="bat-btn bat-btn-outline text-xs"
              >
                Submit Additional Mission Intake
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Principal Investigator Name */}
                <div>
                  <label htmlFor="name" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Principal Investigator *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Marianne Moreau"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.name && (
                    <span id="name-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Institutional Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="e.g. m.moreau@ifremer.fr"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.email && (
                    <span id="email-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Research Organization */}
              <div>
                <label htmlFor="organization" className="block bat-mono text-xs text-slate uppercase mb-2">
                  Institution or Agency *
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  value={values.organization}
                  onChange={handleChange}
                  placeholder="e.g. Woods Hole Oceanographic Institution / IFREMER"
                  aria-describedby={errors.organization ? "organization-error" : undefined}
                  aria-invalid={!!errors.organization}
                  className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                />
                {errors.organization && (
                  <span id="organization-error" className="bat-mono text-xs text-amber mt-1 block">
                    {errors.organization}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Target Trench Zone */}
                <div>
                  <label htmlFor="trenchZone" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Target Trench *
                  </label>
                  <select
                    id="trenchZone"
                    name="trenchZone"
                    value={values.trenchZone}
                    onChange={handleChange}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  >
                    <option value="mariana">Mariana Trench (10,928m)</option>
                    <option value="kermadec">Kermadec Trench (10,047m)</option>
                    <option value="puertorico">Puerto Rico Trench (8,376m)</option>
                    <option value="philippine">Philippine Trench (10,540m)</option>
                  </select>
                </div>

                {/* Payload Mass */}
                <div>
                  <label htmlFor="payloadMassKg" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Payload Mass (kg) *
                  </label>
                  <input
                    id="payloadMassKg"
                    name="payloadMassKg"
                    type="number"
                    min="1"
                    max="500"
                    required
                    value={values.payloadMassKg}
                    onChange={handleChange}
                    aria-describedby={errors.payloadMassKg ? "payload-error" : undefined}
                    aria-invalid={!!errors.payloadMassKg}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  />
                  {errors.payloadMassKg && (
                    <span id="payload-error" className="bat-mono text-xs text-amber mt-1 block">
                      {errors.payloadMassKg}
                    </span>
                  )}
                </div>

                {/* Mission Window */}
                <div>
                  <label htmlFor="missionWindow" className="block bat-mono text-xs text-slate uppercase mb-2">
                    Launch Window
                  </label>
                  <select
                    id="missionWindow"
                    name="missionWindow"
                    value={values.missionWindow}
                    onChange={handleChange}
                    className="w-full bg-glass border border-glass rounded-md px-4 py-2.5 text-titanium text-sm focus:border-cyan outline-none transition-colors"
                  >
                    <option value="2026-Q4">2026 Q4 (Winter Window)</option>
                    <option value="2027-Q1">2027 Q1 (Spring Window)</option>
                    <option value="2027-Q2">2027 Q2 (Summer Window)</option>
                    <option value="2027-Q3">2027 Q3 (Autumn Window)</option>
                  </select>
                </div>
              </div>

              {/* Scientific Requirements */}
              <div>
                <label htmlFor="requirements" className="block bat-mono text-xs text-slate uppercase mb-2">
                  Mission Parameters &amp; Sensor Specifications *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  required
                  value={values.requirements}
                  onChange={handleChange}
                  placeholder="Outline desired benthic sampling targets, optical survey tracks, or custom electronics integration requirements..."
                  aria-describedby={errors.requirements ? "requirements-error" : undefined}
                  aria-invalid={!!errors.requirements}
                  className="w-full bg-glass border border-glass rounded-md p-4 text-titanium text-sm focus:border-cyan outline-none transition-colors resize-y"
                />
                {errors.requirements && (
                  <span id="requirements-error" className="bat-mono text-xs text-amber mt-1 block">
                    {errors.requirements}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bat-btn bat-btn-primary w-full py-3.5 text-sm font-bold"
              >
                {isSubmitting ? "Verifying Telemetry Parameters..." : "Submit Mission Charter Dossier"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/forms/validate.ts">
<![CDATA[export type CharterFormValues = {
  name: string;
  email: string;
  organization: string;
  trenchZone: string;
  payloadMassKg: number;
  missionWindow: string;
  requirements: string;
};

export type CharterFormErrors = Partial<Record<keyof CharterFormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCharterForm(values: CharterFormValues): CharterFormErrors {
  const errors: CharterFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Enter principal investigator name";
  }

  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid institutional email address";
  }

  if (!values.organization || values.organization.trim().length < 2) {
    errors.organization = "Enter institution or research agency";
  }

  if (!values.trenchZone || values.trenchZone.trim() === "") {
    errors.trenchZone = "Select hadal target zone";
  }

  if (
    typeof values.payloadMassKg !== "number" ||
    isNaN(values.payloadMassKg) ||
    values.payloadMassKg < 1 ||
    values.payloadMassKg > 500
  ) {
    errors.payloadMassKg = "Payload mass must be between 1 and 500 kg";
  }

  if (!values.requirements || values.requirements.trim().length < 10) {
    errors.requirements = "Describe mission parameters (min 10 characters)";
  }

  return errors;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/anglerfish.ts">
<![CDATA[import { TAU, additive, glow, rgba, seeded, type Creature, type Pt } from "./draw";

/**
 * Humpback anglerfish (Melanocetus): a near-black globular predator lit only
 * by its own lure. The brow, the fangs and a thin rim of skin catch the
 * esca's light; the rest of the animal falls away into the water.
 * Bathypelagic midnight zone.
 */

// 1 unit = 1px at scale 1; +x is forward (snout). ~270px nose to tail.
function bodyPath(ctx: CanvasRenderingContext2D, tb: number, gape: number) {
  ctx.beginPath();
  ctx.moveTo(98, 4);
  ctx.bezierCurveTo(94, -20, 74, -46, 42, -56);
  ctx.bezierCurveTo(6, -70, -38, -60, -68, -32);
  ctx.bezierCurveTo(-86, -18, -98, -10 + tb * 0.4, -112, -7 + tb);
  ctx.lineTo(-112, 7 + tb);
  ctx.bezierCurveTo(-98, 14 + tb * 0.4, -92, 36, -62, 50);
  ctx.bezierCurveTo(-30, 64, 18, 68, 54, 58 + gape * 0.4);
  ctx.bezierCurveTo(78, 52, 92, 42 + gape, 103, 30 + gape);
  // lower jaw inner edge, mouth gape, upper jaw inner edge
  ctx.quadraticCurveTo(88, 24 + gape, 58, 20 + gape * 0.7);
  ctx.quadraticCurveTo(38, 17 + gape * 0.4, 26, 8);
  ctx.quadraticCurveTo(52, 3, 82, 4);
  ctx.closePath();
}

// [x, y, length] along the upper jaw (hang down) and the lower jaw (rise up)
const UPPER_TEETH: [number, number, number][] = [
  [88, 4.4, 9], [80, 4, 14], [72, 3.8, 11], [64, 3.6, 16], [56, 3.4, 12], [48, 3.2, 14], [40, 3, 9], [33, 2.8, 8],
];
const LOWER_TEETH: [number, number, number][] = [
  [98, 29, -12], [92, 26, -19], [85, 24, -15], [78, 23, -22], [70, 22, -17], [62, 21, -20], [54, 20, -15], [46, 19, -17], [38, 17, -11],
];

export function createAnglerfish(): Creature {
  const rand = seeded(7);
  const speckles = Array.from({ length: 90 }, () => ({
    x: -100 + rand() * 200,
    y: -60 + rand() * 124,
    r: 0.5 + rand() * 1.1,
  }));
  const esca: Pt = { x: 118, y: -70 };
  let lag = 0;
  let wake = 0;

  return {
    id: "anglerfish",
    center: 0.42,
    parallax: 0.66,
    from: 0.1,
    to: 0.62,
    draw(ctx, s, c) {
      const sc = s.scale;
      const swim = Math.sin(s.t * 1.9);
      const tb = swim * 12;
      const gape = 4 + 3 * Math.sin(s.t * 0.8);

      // the lure trails the swimmer, then springs back
      const localVx = (s.vx * s.facing) / Math.max(sc, 0.1);
      lag += (Math.max(-26, Math.min(26, -localVx * 0.07)) - lag) * Math.min(1, s.dt * 4);
      esca.x = 118 + lag + Math.sin(s.t * 1.2) * 4;
      esca.y = -70 + Math.sin(s.t * 1.6 + 1) * 4 - Math.abs(lag) * 0.3;
      // slow pulse, with an occasional hard flicker like a real esca
      if (Math.sin(s.t * 0.9 + 2) > 0.985) wake = 1;
      wake = Math.max(0, wake - s.dt * 2.5);
      const pulse = 0.72 + 0.2 * Math.sin(s.t * 2.1) + wake * 0.35;

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.translate(s.x, s.y);
      ctx.rotate(Math.sin(s.t * 0.8) * 0.04 - 0.03);
      ctx.scale(s.facing * sc, sc);

      // caudal fin, barely there
      ctx.beginPath();
      ctx.moveTo(-108, -6 + tb);
      ctx.bezierCurveTo(-130, -26 + tb * 1.4, -152, -36 + tb * 1.6, -160, -18 + tb * 1.6);
      ctx.bezierCurveTo(-152, -6 + tb * 1.6, -152, 6 + tb * 1.6, -160, 18 + tb * 1.6);
      ctx.bezierCurveTo(-152, 36 + tb * 1.6, -130, 26 + tb * 1.4, -108, 6 + tb);
      ctx.closePath();
      ctx.fillStyle = rgba(c.glass, 0.35);
      ctx.fill();
      ctx.strokeStyle = rgba(c.slate, 0.18);
      ctx.lineWidth = 0.7;
      for (let i = -4; i <= 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-108, i * 1.6 + tb);
        ctx.lineTo(-156, i * 7.5 + tb * 1.6);
        ctx.stroke();
      }

      // body: almost the colour of the water
      bodyPath(ctx, tb, gape);
      const skin = ctx.createLinearGradient(0, -66, 0, 68);
      skin.addColorStop(0, rgba(c.navy, 0.9));
      skin.addColorStop(0.5, rgba(c.trench, 0.96));
      skin.addColorStop(1, rgba(c.trench, 0.96));
      ctx.fillStyle = skin;
      ctx.fill();

      ctx.save();
      bodyPath(ctx, tb, gape);
      ctx.clip();
      ctx.fillStyle = rgba(c.mist, 0.05);
      for (const p of speckles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.fill();
      }
      // the lure lights the face and brow, and little else
      additive(ctx, () => {
        glow(ctx, esca.x - 8, esca.y + 22, 120, c.cyan, 0.34 * pulse);
        glow(ctx, esca.x - 4, esca.y + 14, 54, c.titanium, 0.16 * pulse);
      });
      ctx.restore();

      // skin rim picks up light near the lure only
      bodyPath(ctx, tb, gape);
      ctx.lineWidth = 1;
      const rim = ctx.createRadialGradient(esca.x - 10, esca.y + 20, 10, esca.x - 10, esca.y + 20, 190);
      rim.addColorStop(0, rgba(c.titanium, 0.5 * pulse));
      rim.addColorStop(0.45, rgba(c.mist, 0.18 * pulse));
      rim.addColorStop(1, rgba(c.mist, 0.02));
      ctx.strokeStyle = rim;
      ctx.stroke();

      // mouth cavity
      ctx.beginPath();
      ctx.moveTo(26, 8);
      ctx.quadraticCurveTo(52, 3, 84, 4);
      ctx.lineTo(100, 28 + gape);
      ctx.quadraticCurveTo(60, 20 + gape * 0.7, 26, 8);
      ctx.fillStyle = rgba(c.trench, 1);
      ctx.fill();

      // fangs: translucent, brightest nearest the lure
      const fang = (x: number, y: number, len: number, curl: number) => {
        const near = 1 - Math.min(Math.hypot(x - esca.x, y - esca.y) / 150, 1);
        const lit = 0.18 + 0.75 * near * near * pulse;
        const dy = y > 12 ? gape : 0;
        ctx.beginPath();
        ctx.moveTo(x - 1.5, y + dy);
        ctx.quadraticCurveTo(x + curl * 0.2, y + dy + len * 0.5, x + curl, y + dy + len);
        ctx.quadraticCurveTo(x + 0.4, y + dy + len * 0.5, x + 1.5, y + dy);
        ctx.closePath();
        ctx.fillStyle = rgba(c.titanium, lit);
        ctx.fill();
      };
      for (const [x, y, l] of UPPER_TEETH) fang(x, y, l, -2);
      for (const [x, y, l] of LOWER_TEETH) fang(x, y, l, 2.5);

      // tiny eye: a dark pit with a glint
      ctx.beginPath();
      ctx.arc(54, -18, 4.2, 0, TAU);
      ctx.fillStyle = rgba(c.trench, 1);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.2 * pulse + 0.05);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(55.2, -19.2, 0.9, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.5 * pulse);
      ctx.fill();

      // pectoral fin
      const flap = Math.sin(s.t * 3.2) * 0.35;
      ctx.save();
      ctx.translate(4, 30);
      ctx.rotate(0.5 + flap);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, 8, -26, 22, -38, 17);
      ctx.bezierCurveTo(-32, 8, -16, 0, 0, 0);
      ctx.fillStyle = rgba(c.slate, 0.16);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.1);
      ctx.stroke();
      ctx.restore();

      // illicium: a long rod arching over the snout so the lure hangs before the jaws
      const base = { x: 50, y: -52 };
      ctx.beginPath();
      ctx.moveTo(base.x, base.y);
      ctx.bezierCurveTo(base.x + 8, base.y - 66, esca.x - 40, esca.y - 52, esca.x, esca.y - 8);
      ctx.strokeStyle = rgba(c.mist, 0.34);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // the esca: a lobed bulb on a short filament, with trailing lobes
      ctx.beginPath();
      ctx.moveTo(esca.x, esca.y - 8);
      ctx.lineTo(esca.x + 1, esca.y - 2);
      ctx.strokeStyle = rgba(c.titanium, 0.5);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.strokeStyle = rgba(c.titanium, 0.4);
      ctx.lineWidth = 0.7;
      for (let k = 0; k < 5; k++) {
        const a = Math.PI * (0.25 + (k / 4) * 0.5);
        const wob = Math.sin(s.t * 2.4 + k) * 1.5;
        ctx.beginPath();
        ctx.moveTo(esca.x, esca.y + 3);
        ctx.quadraticCurveTo(esca.x + Math.cos(a) * 7 + wob, esca.y + 8, esca.x + Math.cos(a) * 11 + wob, esca.y + 8 + Math.sin(a) * 9);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(esca.x, esca.y, 5.5, 7, 0, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.55 + 0.4 * pulse);
      ctx.fill();
      additive(ctx, () => {
        glow(ctx, esca.x, esca.y, 120, c.cyan, 0.26 * pulse);
        glow(ctx, esca.x, esca.y, 52, c.cyan, 0.55 * pulse);
        glow(ctx, esca.x, esca.y, 26, c.amber, 0.22 * pulse);
        glow(ctx, esca.x, esca.y, 10, c.titanium, 0.95 * pulse);
      });

      ctx.restore();
    },
  };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/DeepLife.tsx">
<![CDATA["use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { clamp, lerp } from "../motion/math";
import { additive, glow, toRgb, type Creature, type DrawState, type Rgb } from "./draw";
import { placeCreature, travelX } from "./placement";
import { createSiphonophore } from "./siphonophore";
import { createAnglerfish } from "./anglerfish";
import { createDumbo } from "./dumbo";
import { createSnailfish } from "./snailfish";

/**
 * Deep-sea fauna, drawn in 2D on a canvas over the page with screen blending.
 * Each animal is anchored to a depth in the dive: it rises into view as you
 * scroll toward that depth, drifts slowly across, and sinks away again, always
 * lagging the page so it reads as part of the water. Screen blending can only
 * add light, never darken, so a creature can't hide text, cards or controls,
 * and its near-black parts (an anglerfish's body) simply disappear. The layer
 * ignores the pointer.
 */

const KEYS = ["trench", "navy", "titanium", "cyan", "amber", "glass", "slate", "mist"] as const;

type Spark = { x: number; y: number; r: number; age: number; life: number };

type Track = { x: number; y: number; vx: number; vy: number; seen: boolean };

export function DeepLife() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const rgb = Object.fromEntries(KEYS.map((k) => [k, toRgb(style.getPropertyValue(`--color-${k}`))])) as Rgb;

    const creatures: Creature[] = [createSiphonophore(), createAnglerfish(), createDumbo(), createSnailfish()];
    const tracks = new Map<string, Track>();
    const sparks: Spark[] = [];
    let vw = 0;
    let vh = 0;
    let raf = 0;
    let last = performance.now();
    let sparkClock = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      const scrollY = window.scrollY;
      const docMax = Math.max(document.documentElement.scrollHeight - vh, 1);
      const dive = clamp(scrollY / docMax, 0, 1);
      // keep animals a sensible size on small and ultra-wide screens
      const base = clamp(Math.min(vw, vh * 1.6) / 1440, 0.5, 1.15) * 1.3;

      ctx.clearRect(0, 0, vw, vh);

      for (const cr of creatures) {
        const place = placeCreature({ scrollY, docMax, vh, center: cr.center, parallax: cr.parallax });
        if (place.visibility <= 0.003) {
          tracks.delete(cr.id);
          continue;
        }
        const tx = travelX(place.progress, cr.from, cr.to, vw);
        let tr = tracks.get(cr.id);
        if (!tr) {
          tr = { x: tx, y: place.y, vx: 0, vy: 0, seen: true };
          tracks.set(cr.id, tr);
        }
        // ease toward the scroll-driven target so jumps become glides
        const k = 1 - Math.exp(-dt * 2.6);
        const nx = lerp(tr.x, tx, k);
        const ny = lerp(tr.y, place.y, k);
        const ivx = (nx - tr.x) / Math.max(dt, 0.001);
        const ivy = (ny - tr.y) / Math.max(dt, 0.001);
        tr.vx = lerp(tr.vx, ivx, 1 - Math.exp(-dt * 4));
        tr.vy = lerp(tr.vy, ivy, 1 - Math.exp(-dt * 4));
        tr.x = nx;
        tr.y = ny;

        const state: DrawState = {
          t,
          dt,
          x: tr.x,
          y: tr.y,
          scale: base,
          facing: cr.to >= cr.from ? 1 : -1,
          alpha: place.visibility * 0.8,
          vx: tr.vx,
          vy: tr.vy,
        };
        cr.draw(ctx, state, rgb);
      }

      // rare flashes of plankton, more of them the deeper you are
      sparkClock -= dt;
      if (sparkClock <= 0) {
        sparkClock = lerp(1.1, 0.4, dive) * (0.5 + Math.random());
        const cx = Math.random() * vw;
        const cy = Math.random() * vh;
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          sparks.push({
            x: cx + (Math.random() - 0.5) * 70,
            y: cy + (Math.random() - 0.5) * 70,
            r: 3 + Math.random() * 5,
            age: -i * 0.14,
            life: 0.7 + Math.random() * 0.8,
          });
        }
      }
      additive(ctx, () => {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const sp = sparks[i];
          sp.age += dt;
          if (sp.age >= sp.life) {
            sparks.splice(i, 1);
            continue;
          }
          if (sp.age < 0) continue;
          const u = sp.age / sp.life;
          const env = Math.sin(Math.PI * Math.min(u * 1.6, 1)) ** 2 * (1 - u * 0.6);
          glow(ctx, sp.x, sp.y, sp.r * 4, rgb.cyan, 0.5 * env);
          glow(ctx, sp.x, sp.y, sp.r, rgb.titanium, 0.5 * env);
        }
      });
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="bat-life pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/draw.ts">
<![CDATA[/** Shared 2D drawing helpers for the deep-sea creatures. */

export type Pt = { x: number; y: number };

export type Rgb = Record<
  "trench" | "navy" | "titanium" | "cyan" | "amber" | "glass" | "slate" | "mist",
  string
>;

export const TAU = Math.PI * 2;

/** "#8DA8C2" -> "141, 168, 194" */
export function toRgb(hex: string, fallback = "141, 168, 194"): string {
  const v = hex.trim().replace("#", "");
  if (v.length !== 3 && v.length !== 6) return fallback;
  const full = v.length === 3 ? [...v].map((c) => c + c).join("") : v;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return fallback;
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export const rgba = (rgb: string, a: number) => `rgba(${rgb}, ${Math.max(0, a).toFixed(3)})`;

/** Soft additive light: bioluminescence, lure halos, rim glints. */
export function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rgb: string, a: number) {
  if (a <= 0.002 || r <= 0.5) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(rgb, a));
  g.addColorStop(0.35, rgba(rgb, a * 0.38));
  g.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

/** Run `fn` with additive blending, then restore. */
export function additive(ctx: CanvasRenderingContext2D, fn: () => void) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  fn();
  ctx.restore();
}

/** Follow-the-leader chain: each link keeps `spacing` from the one before it, with a constant pull. */
export function followChain(pts: Pt[], head: Pt, spacing: number, pull: Pt = { x: 0, y: 0 }) {
  pts[0].x = head.x;
  pts[0].y = head.y;
  for (let i = 1; i < pts.length; i++) {
    let dx = pts[i].x - pts[i - 1].x + pull.x;
    let dy = pts[i].y - pts[i - 1].y + pull.y;
    const m = Math.hypot(dx, dy) || 1;
    dx = (dx / m) * spacing;
    dy = (dy / m) * spacing;
    pts[i].x = pts[i - 1].x + dx;
    pts[i].y = pts[i - 1].y + dy;
  }
}

function smoothThrough(ctx: CanvasRenderingContext2D, pts: Pt[], first: "move" | "line") {
  if (first === "move") ctx.moveTo(pts[0].x, pts[0].y);
  else ctx.lineTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

/** Smooth open curve through points. */
export function curvePath(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  ctx.beginPath();
  smoothThrough(ctx, pts, "move");
}

/** Closed tapered ribbon along a spine: bodies, tentacles, fins. Caller fills / strokes. */
export function ribbonPath(ctx: CanvasRenderingContext2D, pts: Pt[], width: (u: number) => number) {
  const n = pts.length;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, n - 1)];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const m = Math.hypot(tx, ty) || 1;
    tx /= m;
    ty /= m;
    const w = width(i / (n - 1)) / 2;
    left.push({ x: pts[i].x - ty * w, y: pts[i].y + tx * w });
    right.push({ x: pts[i].x + ty * w, y: pts[i].y - tx * w });
  }
  ctx.beginPath();
  smoothThrough(ctx, left, "move");
  smoothThrough(ctx, right.reverse(), "line");
  ctx.closePath();
}

/** Deterministic pseudo-random so speckles don't shimmer between frames. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type DrawState = {
  t: number;
  dt: number;
  /** Centre of the creature in viewport pixels. */
  x: number;
  y: number;
  /** 1 = nominal size. */
  scale: number;
  /** +1 swims toward screen right, -1 toward screen left. */
  facing: 1 | -1;
  /** Overall opacity from depth visibility. */
  alpha: number;
  /** Smoothed horizontal speed in px/s (signed), for trailing parts. */
  vx: number;
  /** Smoothed vertical speed in px/s (signed). */
  vy: number;
};

export type Creature = {
  id: string;
  /** Dive fraction at which it is centred. */
  center: number;
  parallax: number;
  /** Travel across the viewport, as fractions of width, over the visible window. */
  from: number;
  to: number;
  draw(ctx: CanvasRenderingContext2D, s: DrawState, c: Rgb): void;
};
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/dumbo.ts">
<![CDATA[import { TAU, additive, followChain, glow, ribbonPath, rgba, type Creature, type DrawState, type Pt } from "./draw";

/**
 * Dumbo octopus (Grimpoteuthis): a translucent bell of mantle and web,
 * steered by two small ear-like fins, with eight arms that trail on the
 * water and a skirt of web between them. Abyssopelagic.
 */

const ARMS = 8;
const LINKS = 10;

export function createDumbo(): Creature {
  const arms: Pt[][] = Array.from({ length: ARMS }, () =>
    Array.from({ length: LINKS }, () => ({ x: 0, y: 0 })),
  );
  let ready = false;

  // mantle space (+y down, rotated by `lean`) -> viewport
  const world = (s: DrawState, lean: number, lx: number, ly: number): Pt => {
    const cos = Math.cos(lean);
    const sin = Math.sin(lean);
    return { x: s.x + (lx * cos - ly * sin) * s.scale, y: s.y + (lx * sin + ly * cos) * s.scale };
  };

  return {
    id: "dumbo",
    center: 0.62,
    parallax: 0.6,
    from: 0.14,
    to: 0.72,
    draw(ctx, s, c) {
      const sc = s.scale;
      const beat = Math.sin(s.t * 2.2);
      const breathe = 1 + 0.045 * Math.sin(s.t * 2.2 - 0.7);
      const ox = s.x;
      const oy = s.y + Math.sin(s.t * 0.9) * 9 * sc;
      const at = { ...s, x: ox, y: oy };
      // tips forward into its heading and rocks with each beat
      const lean = 0.3 * s.facing + Math.sin(s.t * 0.6) * 0.07 + beat * 0.025;

      // arm roots on the lower rim of the mantle
      const bases: Pt[] = Array.from({ length: ARMS }, (_, k) => {
        const f = k / (ARMS - 1);
        return world(at, lean, -44 + f * 88, 22 - Math.sin(f * Math.PI) * 6);
      });
      if (!ready) {
        arms.forEach((chain, k) => {
          chain.forEach((p, i) => {
            p.x = bases[k].x + (k - 3.5) * i * 1.4 * sc;
            p.y = bases[k].y + i * 8 * sc;
          });
        });
        ready = true;
      }
      const spacing = 8.6 * sc;
      arms.forEach((chain, k) => {
        const fan = (k - 3.5) * 0.12 * spacing;
        followChain(chain, bases[k], spacing, { x: fan - s.vx * 0.0016 * spacing, y: spacing * 0.8 });
      });
      const swayed: Pt[][] = arms.map((chain, k) =>
        chain.map((p, i) => ({
          x: p.x + Math.sin(s.t * 1.5 + k * 0.9 - i * 0.5) * i * 0.9 * sc,
          y: p.y + Math.cos(s.t * 1.2 + k - i * 0.4) * i * 0.35 * sc,
        })),
      );

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // web skirt between the arms
      const webAt = 6;
      ctx.beginPath();
      ctx.moveTo(bases[0].x, bases[0].y);
      ctx.lineTo(swayed[0][webAt].x, swayed[0][webAt].y);
      for (let k = 0; k < ARMS - 1; k++) {
        const a = swayed[k][webAt];
        const b = swayed[k + 1][webAt];
        ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 11 * sc * (0.75 + 0.25 * beat), b.x, b.y);
      }
      ctx.lineTo(bases[ARMS - 1].x, bases[ARMS - 1].y);
      ctx.closePath();
      const web = ctx.createLinearGradient(0, oy + 20 * sc, 0, oy + 82 * sc);
      web.addColorStop(0, rgba(c.titanium, 0.22));
      web.addColorStop(1, rgba(c.mist, 0.03));
      ctx.fillStyle = web;
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.17);
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // arms
      swayed.forEach((chain) => {
        ribbonPath(ctx, chain, (u) => (6.4 - 5.4 * u) * sc);
        ctx.fillStyle = rgba(c.mist, 0.16);
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.2);
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      // mantle space
      ctx.translate(ox, oy);
      ctx.rotate(lean);
      ctx.scale(sc, sc);

      // ear fins: small, rounded, flapping together
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.translate(side * 45, -30);
        ctx.scale(side, 1);
        ctx.rotate(-0.1 + beat * 0.45);
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(12, -14, 38, -22, 50, -8);
        ctx.bezierCurveTo(56, 6, 30, 14, 0, 12);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, 0, 52, -6);
        g.addColorStop(0, rgba(c.titanium, 0.28));
        g.addColorStop(1, rgba(c.mist, 0.05));
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.3);
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.strokeStyle = rgba(c.titanium, 0.12);
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(3, 6);
          ctx.quadraticCurveTo(18 + i * 6, -10 + i * 4, 46 - i * 2, -6 + i * 4);
          ctx.stroke();
        }
        ctx.restore();
      }

      // mantle: a soft dome, brighter at the crown
      ctx.save();
      ctx.scale(1, breathe);
      ctx.beginPath();
      ctx.moveTo(-54, 22);
      ctx.bezierCurveTo(-64, -26, -36, -64, 0, -64);
      ctx.bezierCurveTo(36, -64, 64, -26, 54, 22);
      ctx.quadraticCurveTo(0, 36, -54, 22);
      ctx.closePath();
      const m = ctx.createRadialGradient(0, -34, 6, 0, -10, 84);
      m.addColorStop(0, rgba(c.titanium, 0.34));
      m.addColorStop(0.55, rgba(c.mist, 0.2));
      m.addColorStop(1, rgba(c.slate, 0.26));
      ctx.fillStyle = m;
      ctx.fill();
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = rgba(c.titanium, 0.36);
      ctx.stroke();

      // organs showing through the flesh
      ctx.beginPath();
      ctx.ellipse(0, -22, 26, 30, 0, 0, TAU);
      ctx.fillStyle = rgba(c.slate, 0.12);
      ctx.fill();

      // eyes: small and dark
      for (const ex of [-38, 38]) {
        ctx.beginPath();
        ctx.ellipse(ex, 4, 3.4, 4.4, 0, 0, TAU);
        ctx.fillStyle = rgba(c.trench, 0.6);
        ctx.fill();
        ctx.strokeStyle = rgba(c.titanium, 0.18);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();

      additive(ctx, () => {
        glow(ctx, 0, -24, 90, c.mist, 0.1);
        glow(ctx, 0, -40, 40, c.titanium, 0.07);
      });

      ctx.restore();
    },
  };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/placement.ts">
<![CDATA[import { clamp, lerp } from "../motion/math";

/**
 * Where a creature sits in the viewport for a given scroll position.
 * Creatures are anchored to a depth in the page (a dive fraction) and move at
 * `parallax` x the scroll speed, so they read as part of the water behind the
 * content rather than something travelling across it.
 */
export type Placement = {
  /** Vertical position in viewport pixels. */
  y: number;
  /** 0 when off screen, 1 when comfortably in view. */
  visibility: number;
  /** 0 as the creature enters at the bottom, 1 as it leaves at the top. */
  progress: number;
};

export type PlacementInput = {
  scrollY: number;
  docMax: number;
  vh: number;
  /** Dive fraction (0 surface, 1 floor) at which the creature is centred. */
  center: number;
  /** < 1 so it lags the page; the further from 1, the deeper it feels. */
  parallax: number;
};

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

export function placeCreature({ scrollY, docMax, vh, center, parallax }: PlacementInput): Placement {
  const dy = (center * Math.max(docMax, 1) - scrollY) * parallax;
  const edge = Math.abs(dy);
  const visibility = smooth(clamp(1 - (edge - vh * 0.3) / (vh * 0.42), 0, 1));
  const progress = clamp(0.5 - dy / (vh * 1.5), 0, 1);
  return { y: vh * 0.5 + dy, visibility, progress };
}

/** Horizontal travel between two viewport fractions, eased so it lingers mid-screen. */
export function travelX(progress: number, from: number, to: number, vw: number): number {
  const eased = progress < 0.5 ? 2 * progress * progress : 1 - 2 * (1 - progress) * (1 - progress);
  return lerp(from, to, lerp(progress, eased, 0.5)) * vw;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/siphonophore.ts">
<![CDATA[import { TAU, additive, curvePath, followChain, glow, ribbonPath, rgba, type Creature, type Pt, type Rgb } from "./draw";

/**
 * Colonial siphonophore (Apolemia / Praya style): a long translucent stem of
 * zooids trailing behind a cluster of swimming bells, with a wave of cold
 * bioluminescence running down it. Mesopelagic twilight.
 */

const LINKS = 40;
const BELLS = 9;
const TENTACLE_FROM = 11;

function bell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  r: number,
  squeeze: number,
  c: Rgb,
  a: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(1, squeeze);
  ctx.beginPath();
  ctx.moveTo(-r * 0.85, -r * 0.62);
  ctx.bezierCurveTo(-r * 0.1, -r * 1.0, r * 0.95, -r * 0.62, r * 1.0, 0);
  ctx.bezierCurveTo(r * 0.95, r * 0.62, -r * 0.1, r * 1.0, -r * 0.85, r * 0.62);
  ctx.quadraticCurveTo(-r * 0.45, 0, -r * 0.85, -r * 0.62);
  ctx.closePath();
  const g = ctx.createRadialGradient(r * 0.15, 0, r * 0.05, r * 0.1, 0, r * 1.05);
  g.addColorStop(0, rgba(c.titanium, 0.05 * a));
  g.addColorStop(0.65, rgba(c.cyan, 0.1 * a));
  g.addColorStop(1, rgba(c.titanium, 0.36 * a));
  ctx.fillStyle = g;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = rgba(c.titanium, 0.45 * a);
  ctx.stroke();

  // radial canals + velum
  ctx.strokeStyle = rgba(c.mist, 0.24 * a);
  ctx.lineWidth = 0.8;
  for (const k of [-0.45, 0, 0.45]) {
    ctx.beginPath();
    ctx.moveTo(r * 0.9, 0);
    ctx.quadraticCurveTo(r * 0.3, k * r * 0.95, -r * 0.7, k * r * 0.62);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(-r * 0.72, 0, r * 0.12, r * 0.55, 0, 0, TAU);
  ctx.strokeStyle = rgba(c.titanium, 0.22 * a);
  ctx.stroke();

  // specular glint on the dome
  ctx.beginPath();
  ctx.ellipse(r * 0.35, -r * 0.45, r * 0.3, r * 0.08, -0.5, 0, TAU);
  ctx.fillStyle = rgba(c.titanium, 0.28 * a);
  ctx.fill();
  ctx.restore();
}

export function createSiphonophore(): Creature {
  const pts: Pt[] = Array.from({ length: LINKS }, () => ({ x: 0, y: 0 }));
  let ready = false;

  return {
    id: "siphonophore",
    center: 0.2,
    parallax: 0.72,
    from: 0.96,
    to: 0.5,
    draw(ctx, s, c) {
      const sc = s.scale;
      const spacing = 12.5 * sc;
      const head = { x: s.x, y: s.y + Math.sin(s.t * 0.45) * 26 * sc };
      if (!ready) {
        for (let i = 0; i < LINKS; i++) {
          pts[i].x = head.x - s.facing * i * spacing;
          pts[i].y = head.y + i * spacing * 0.15;
        }
        ready = true;
      }
      // trails behind the heading and sags under its own weight
      followChain(pts, head, spacing, {
        x: -s.facing * spacing * 0.36,
        y: spacing * (0.38 + 0.3 * Math.sin(s.t * 0.5)),
      });

      // draw-only wave so it never stiffens, even when parked
      const shown: Pt[] = pts.map((p, i) => {
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, LINKS - 1)];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const off = Math.sin(s.t * 1.4 - i * 0.3) * (1.2 + i * 0.28) * sc;
        return { x: p.x - ty * off, y: p.y + tx * off };
      });
      const tangent = (i: number) => {
        const a = shown[Math.max(i - 1, 0)];
        const b = shown[Math.min(i + 1, LINKS - 1)];
        return Math.atan2(b.y - a.y, b.x - a.x);
      };

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // tentacles first, behind everything
      for (let i = TENTACLE_FROM; i < LINKS; i += 2) {
        const p = shown[i];
        const len = (48 + ((i * 7) % 37)) * sc;
        const sway = Math.sin(s.t * 1.1 + i) * 5 * sc - s.vx * 0.012;
        const tip = { x: p.x + sway, y: p.y + len };
        const mid = { x: p.x + sway * 0.4 + Math.sin(s.t * 0.9 + i * 1.7) * 3 * sc, y: p.y + len * 0.5 };
        curvePath(ctx, [p, mid, tip]);
        ctx.strokeStyle = rgba(c.mist, 0.26);
        ctx.lineWidth = 0.9 * sc;
        ctx.stroke();
        additive(ctx, () => {
          for (let k = 1; k <= 4; k++) {
            const f = k / 4;
            const bx = p.x + (mid.x - p.x) * Math.min(f * 2, 1) + (tip.x - mid.x) * Math.max(f * 2 - 1, 0);
            const by = p.y + len * f;
            ctx.fillStyle = rgba(c.cyan, 0.32);
            ctx.beginPath();
            ctx.arc(bx, by, 1.1 * sc, 0, TAU);
            ctx.fill();
          }
        });
      }

      // stem
      ribbonPath(ctx, shown, (u) => (5 - 2.6 * u) * sc);
      ctx.fillStyle = rgba(c.titanium, 0.3);
      ctx.fill();
      ctx.strokeStyle = rgba(c.mist, 0.3);
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // bracts and gastrozooids along the stem
      for (let i = TENTACLE_FROM - 1; i < LINKS; i++) {
        const p = shown[i];
        const ang = tangent(i);
        const nx = -Math.sin(ang);
        const ny = Math.cos(ang);
        const side = i % 2 === 0 ? 1 : -1;
        if (i % 2 === 0) {
          // gastrozooid: pale pouch with a lit core
          const bx = p.x + nx * side * 5 * sc;
          const by = p.y + ny * side * 5 * sc;
          const rx = (4.6 + (i % 4) * 0.7) * sc;
          const ry = 9.2 * sc;
          const g = ctx.createRadialGradient(bx, by, 0, bx, by, ry);
          g.addColorStop(0, rgba(c.titanium, 0.5));
          g.addColorStop(1, rgba(c.cyan, 0.12));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(bx, by, rx, ry, ang + Math.PI / 2, 0, TAU);
          ctx.fill();
          ctx.strokeStyle = rgba(c.titanium, 0.3);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        } else {
          // bract: thin translucent leaf
          const lx = p.x + nx * side * 5.5 * sc;
          const ly = p.y + ny * side * 5.5 * sc;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.quadraticCurveTo(lx + Math.cos(ang) * 4 * sc, ly + Math.sin(ang) * 4 * sc, lx - Math.cos(ang) * 6 * sc, ly - Math.sin(ang) * 6 * sc);
          ctx.quadraticCurveTo(p.x + nx * side * sc, p.y + ny * side * sc, p.x, p.y);
          ctx.fillStyle = rgba(c.titanium, 0.12);
          ctx.fill();
        }
      }

      // bioluminescent pulse travelling down the colony
      additive(ctx, () => {
        for (let i = TENTACLE_FROM - 2; i < LINKS; i++) {
          const wave = Math.max(0, Math.sin(s.t * 1.9 - i * 0.42));
          const lit = Math.pow(wave, 7);
          if (lit < 0.03) continue;
          glow(ctx, shown[i].x, shown[i].y, 22 * sc, c.cyan, 0.55 * lit);
        }
      });

      // swimming bells (nectophores) clustered behind the float
      for (let k = BELLS - 1; k >= 0; k--) {
        const idx = Math.min(1 + k, LINKS - 1);
        const p = shown[idx];
        const fwd = Math.atan2(shown[idx - 1 > 0 ? idx - 1 : 0].y - p.y, shown[idx - 1 > 0 ? idx - 1 : 0].x - p.x);
        const side = k % 2 === 0 ? 1 : -1;
        const spread = (9 + k * 1.5) * sc;
        const bx = p.x - Math.sin(fwd) * side * spread;
        const by = p.y + Math.cos(fwd) * side * spread;
        const pulse = 1 - 0.07 * Math.max(0, Math.sin(s.t * 2.1 - k * 0.7));
        bell(ctx, bx, by, fwd + side * 0.14, (17 - k * 0.6) * sc, pulse, c, 1);
      }

      // gas float with a hint of amber
      const fp = shown[0];
      ctx.fillStyle = rgba(c.titanium, 0.3);
      ctx.beginPath();
      ctx.ellipse(fp.x + s.facing * 6 * sc, fp.y - 1 * sc, 8 * sc, 5 * sc, 0, 0, TAU);
      ctx.fill();
      additive(ctx, () => glow(ctx, fp.x + s.facing * 4 * sc, fp.y, 14 * sc, c.amber, 0.2));

      ctx.restore();
    },
  };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/life/snailfish.ts">
<![CDATA[import { TAU, additive, followChain, glow, ribbonPath, rgba, type Creature, type Pt } from "./draw";

/**
 * Hadal snailfish (Pseudoliparis): a pale, gelatinous tadpole with a heavy
 * blunt head, a single veil of fin running down its back and belly, and a
 * swim wave that grows toward the tail. Hadopelagic.
 */

const LINKS = 26;

export function createSnailfish(): Creature {
  const pts: Pt[] = Array.from({ length: LINKS }, () => ({ x: 0, y: 0 }));
  let ready = false;

  return {
    id: "snailfish",
    center: 0.84,
    parallax: 0.62,
    from: 0.88,
    to: 0.32,
    draw(ctx, s, c) {
      const sc = s.scale;
      const spacing = 13 * sc;
      const head = { x: s.x, y: s.y + Math.sin(s.t * 0.7) * 10 * sc };
      if (!ready) {
        for (let i = 0; i < LINKS; i++) {
          pts[i].x = head.x - s.facing * i * spacing;
          pts[i].y = head.y;
        }
        ready = true;
      }
      followChain(pts, head, spacing, { x: -s.facing * spacing * 0.5, y: spacing * 0.06 });

      // swim wave: gentle at the head, sweeping at the tail
      const shown: Pt[] = pts.map((p, i) => {
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, LINKS - 1)];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const off = Math.sin(s.t * 2.5 - i * 0.38) * (0.6 + i * 0.62) * sc;
        return { x: p.x - ty * off, y: p.y + tx * off };
      });

      // big blunt head, long taper
      const width = (u: number) => {
        const k = Math.min(u / 0.1, 1);
        const nose = Math.sqrt(1 - (1 - k) * (1 - k)); // round, blunt snout
        return (58 * Math.pow(1 - u, 2.7) + 3.4) * nose * sc;
      };
      const finStart = Math.floor(LINKS * 0.28);
      const veil = (u: number) => (24 * Math.sin(Math.PI * Math.min(Math.max(u, 0), 1)) + 2) * sc;

      ctx.save();
      ctx.globalAlpha = s.alpha;

      // dorsal + anal fin: one continuous veil behind the head
      const fin = shown.slice(finStart);
      const finU = (u: number) => finStart / (LINKS - 1) + u * (1 - finStart / (LINKS - 1));
      ribbonPath(ctx, fin, (u) => width(finU(u)) + veil(u));
      ctx.fillStyle = rgba(c.titanium, 0.07);
      ctx.fill();
      ctx.lineWidth = 0.6;
      for (let i = finStart + 1; i < LINKS - 1; i += 2) {
        const p = shown[i];
        const a = shown[i - 1];
        const b = shown[i + 1];
        let tx = b.x - a.x;
        let ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        tx /= m;
        ty /= m;
        const u = (i - finStart) / (LINKS - 1 - finStart);
        const half = width(i / (LINKS - 1)) / 2;
        const reach = half + veil(u) / 2;
        ctx.beginPath();
        ctx.moveTo(p.x - ty * half, p.y + tx * half);
        ctx.lineTo(p.x - ty * reach, p.y + tx * reach);
        ctx.moveTo(p.x + ty * half, p.y - tx * half);
        ctx.lineTo(p.x + ty * reach, p.y - tx * reach);
        ctx.strokeStyle = rgba(c.titanium, 0.07);
        ctx.stroke();
      }

      // body
      ribbonPath(ctx, shown, width);
      const g = ctx.createRadialGradient(head.x - s.facing * 16 * sc, head.y - 6 * sc, 3, head.x - s.facing * 16 * sc, head.y, 120 * sc);
      g.addColorStop(0, rgba(c.titanium, 0.46));
      g.addColorStop(0.5, rgba(c.mist, 0.26));
      g.addColorStop(1, rgba(c.slate, 0.18));
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.38);
      ctx.lineWidth = 1;
      ctx.stroke();

      // gut and spine seen through the flesh
      ctx.beginPath();
      ctx.moveTo(shown[3].x, shown[3].y);
      for (let i = 4; i < LINKS - 3; i++) ctx.lineTo(shown[i].x, shown[i].y);
      ctx.strokeStyle = rgba(c.slate, 0.3);
      ctx.lineWidth = 1.6 * sc;
      ctx.lineJoin = "round";
      ctx.stroke();

      // head details
      const h0 = shown[0];
      const h1 = shown[3];
      const ang = Math.atan2(h0.y - h1.y, h0.x - h1.x);
      const fx = Math.cos(ang);
      const fy = Math.sin(ang);
      const nx = -fy;
      const ny = fx;
      const ex = h0.x - fx * 24 * sc - nx * 11 * sc;
      const ey = h0.y - fy * 24 * sc - ny * 11 * sc;
      ctx.beginPath();
      ctx.ellipse(ex, ey, 6.4 * sc, 5.8 * sc, ang, 0, TAU);
      ctx.fillStyle = rgba(c.trench, 0.9);
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.4);
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ex - fx * 1.4 - nx * 1.4, ey - fy * 1.4 - ny * 1.4, 1.1, 0, TAU);
      ctx.fillStyle = rgba(c.titanium, 0.7);
      ctx.fill();
      // blunt mouth under the snout
      ctx.beginPath();
      ctx.moveTo(h0.x - fx * 3 * sc + nx * 7 * sc, h0.y - fy * 3 * sc + ny * 7 * sc);
      ctx.quadraticCurveTo(h0.x - fx * 14 * sc + nx * 10 * sc, h0.y - fy * 14 * sc + ny * 10 * sc, h0.x - fx * 24 * sc + nx * 6 * sc, h0.y - fy * 24 * sc + ny * 6 * sc);
      ctx.strokeStyle = rgba(c.slate, 0.5);
      ctx.lineWidth = 1;
      ctx.stroke();

      // pectoral disc, fluttering like a small sail
      const pp = shown[5];
      const flutter = Math.sin(s.t * 4.6) * 0.32;
      ctx.save();
      ctx.translate(pp.x, pp.y + 9 * sc);
      ctx.rotate(ang + Math.PI - 0.5 * s.facing + flutter);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 38 * sc, -0.55, 0.55);
      ctx.closePath();
      ctx.fillStyle = rgba(c.titanium, 0.13);
      ctx.fill();
      ctx.strokeStyle = rgba(c.titanium, 0.24);
      ctx.lineWidth = 0.7;
      ctx.stroke();
      for (let r = -0.5; r <= 0.51; r += 0.125) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(r) * 38 * sc, Math.sin(r) * 38 * sc);
        ctx.strokeStyle = rgba(c.titanium, 0.12);
        ctx.stroke();
      }
      ctx.restore();

      additive(ctx, () => glow(ctx, head.x - s.facing * 18 * sc, head.y, 80 * sc, c.mist, 0.1));

      ctx.restore();
    },
  };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/motion/math.ts">
<![CDATA[export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function progress(value: number, start: number, end: number): number {
  if (start === end) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

export function staggerDelay(index: number, baseDelay: number, stagger: number): number {
  return baseDelay + index * stagger;
}

export function normalizeAngle(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/motion/Reveal.tsx">
<![CDATA["use client";

import React from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "wipe" | "scale" | "draw";

export type RevealProps = {
  as?: React.ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({
  as: Component = "div",
  variant = "rise",
  delay = 0,
  index = 0,
  className = "",
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({
    once: true,
    rootMargin: "0px 0px -12% 0px",
  });

  const style: React.CSSProperties = {
    "--delay": `${delay}ms`,
    "--i": index,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      data-reveal={variant}
      data-in={inView ? "true" : undefined}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/motion/TiltCard.tsx">
<![CDATA["use client";

import React, { useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  maxTilt?: number;
};

export function TiltCard({
  className = "",
  children,
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty("--ry", `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty("--lift", "-4px");
  };

  const handlePointerLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
    card.style.removeProperty("--lift");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`bat-card ${className}`}
      style={
        {
          transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px))",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.1,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/scene/buildSubmersible.ts">
<![CDATA[import type * as THREE from "three";
import type { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Procedural BATHYS H-11: titanium pressure sphere, syntactic-foam fairing,
 * rim-driven thruster pods, forward floodlights with volumetric cones,
 * multibeam head, manipulator arm and skids. +z is the nose, +y is up; the
 * pressure sphere (radius 1) sits at the origin. Everything is built from
 * primitives so the page ships no model files.
 */

export type Palette = Record<
  "trench" | "navy" | "titanium" | "cyan" | "amber" | "glass" | "slate" | "mist",
  string
>;

export type Kit = {
  THREE: typeof THREE;
  RoundedBox: typeof RoundedBoxGeometry;
  palette: Palette;
  /** Font family for the fairing livery, already resolved from CSS. */
  fontFamily: string;
  /** Lower segment counts on small screens. */
  detail: "high" | "low";
};

/** Full tip-to-tip width of the model in world units (thruster pods included). */
export const MODEL_WIDTH = 4.1;

export type Submersible = {
  root: THREE.Group;
  /** Callout anchors, top to bottom: fairing, sphere, floodlight, transducer. */
  anchors: THREE.Object3D[];
  floods: THREE.SpotLight[];
  setLight(level: number): void;
  update(time: number, glow: number): void;
  dispose(): void;
};

const BEAM_VERTEX = /* glsl */ `
  varying float vDepth;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  uniform float uLength;
  void main() {
    vDepth = clamp(-position.y / uLength, 0.0, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const BEAM_FRAGMENT = /* glsl */ `
  varying float vDepth;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main() {
    float edge = pow(abs(dot(normalize(vNormalV), normalize(vViewV))), 1.6);
    float fade = pow(1.0 - vDepth, 1.7);
    gl_FragColor = vec4(uColor, uIntensity * fade * edge);
  }
`;

export function buildSubmersible(kit: Kit): Submersible {
  const { THREE: T, RoundedBox, palette, detail } = kit;
  const seg = detail === "high" ? 1 : 0.6;
  const col = (hex: string) => new T.Color(hex);

  const root = new T.Group();
  const disposables: { dispose(): void }[] = [];
  const own = <A extends { dispose(): void }>(x: A): A => {
    disposables.push(x);
    return x;
  };

  const hull = own(new T.MeshStandardMaterial({ color: col(palette.titanium), metalness: 0.92, roughness: 0.26 }));
  const metal = own(new T.MeshStandardMaterial({ color: col(palette.mist), metalness: 0.85, roughness: 0.4 }));
  const darkMetal = own(new T.MeshStandardMaterial({ color: col(palette.slate), metalness: 0.8, roughness: 0.5 }));
  // Foam is a lifted glass/slate blend so it separates from the trench-black water.
  const foam = own(
    new T.MeshStandardMaterial({
      color: col(palette.glass).lerp(col(palette.slate), 0.42),
      metalness: 0.12,
      roughness: 0.62,
    }),
  );
  const seam = own(new T.MeshStandardMaterial({ color: col(palette.trench), metalness: 0.2, roughness: 0.9 }));
  const tray = own(new T.MeshStandardMaterial({ color: col(palette.navy), metalness: 0.7, roughness: 0.45 }));
  const glowMat = own(
    new T.MeshStandardMaterial({
      color: col(palette.cyan),
      emissive: col(palette.cyan),
      emissiveIntensity: 1.4,
      roughness: 0.4,
    }),
  );
  const lensMat = own(new T.MeshBasicMaterial({ color: col(palette.titanium) }));
  const portMat = own(
    new T.MeshPhysicalMaterial({
      color: col(palette.navy),
      emissive: col(palette.cyan),
      emissiveIntensity: 0.55,
      roughness: 0.05,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
  );
  const beaconMat = own(new T.MeshBasicMaterial({ color: col(palette.amber), transparent: true }));

  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = new T.Mesh(own(geo), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const rbox = (w: number, h: number, d: number, r: number) => new RoundedBox(w, h, d, 4, r);

  /** Cylinder between two points (struts, skid legs). */
  const link = (parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
    const dir = new T.Vector3().subVectors(b, a);
    const m = new T.Mesh(own(new T.CylinderGeometry(r, r, dir.length(), 10)), mat);
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), dir.normalize());
    parent.add(m);
    return m;
  };

  // Pressure sphere, equatorial flange and bolts
  add(root, new T.SphereGeometry(1, Math.round(64 * seg), Math.round(48 * seg)), hull);
  const flange = add(root, new T.TorusGeometry(1.005, 0.045, 12, Math.round(96 * seg)), darkMetal);
  flange.rotation.x = Math.PI / 2;
  const boltCount = 28;
  const bolts = new T.InstancedMesh(own(new T.CylinderGeometry(0.026, 0.026, 0.07, 8)), seam, boltCount);
  const m4 = new T.Matrix4();
  for (let i = 0; i < boltCount; i++) {
    const a = (i / boltCount) * Math.PI * 2;
    m4.compose(
      new T.Vector3(Math.cos(a) * 1.05, 0, Math.sin(a) * 1.05),
      new T.Quaternion().setFromAxisAngle(new T.Vector3(0, 1, 0), 0),
      new T.Vector3(1, 1, 1),
    );
    bolts.setMatrixAt(i, m4);
  }
  root.add(bolts);

  // Sapphire viewport
  const port = new T.Group();
  port.position.set(0, 0, 0.96);
  root.add(port);
  const disc = add(port, new T.CylinderGeometry(0.34, 0.34, 0.1, 48), portMat);
  disc.rotation.x = Math.PI / 2;
  add(port, new T.TorusGeometry(0.36, 0.055, 14, 56), metal, 0, 0, 0.03);

  // Syntactic foam fairing, seams and livery
  const fairing = new T.Group();
  fairing.position.set(0, 1.25, 0);
  root.add(fairing);
  add(fairing, rbox(2.5, 1.5, 2.0, 0.44), foam);
  add(fairing, new T.BoxGeometry(2.52, 0.014, 2.02), seam, 0, 0.26, 0);
  add(fairing, new T.BoxGeometry(2.52, 0.014, 2.02), seam, 0, -0.26, 0);

  const livery = document.createElement("canvas");
  livery.width = 512;
  livery.height = 160;
  const drawLivery = () => {
    const g = livery.getContext("2d");
    if (!g) return;
    g.clearRect(0, 0, 512, 160);
    g.fillStyle = palette.mist;
    g.font = `600 58px ${kit.fontFamily}`;
    g.textBaseline = "middle";
    if ("letterSpacing" in g) (g as unknown as { letterSpacing: string }).letterSpacing = "8px";
    g.fillText("BATHYS", 24, 56);
    g.fillStyle = palette.slate;
    g.font = `400 40px ${kit.fontFamily}`;
    g.fillText("H-11", 24, 122);
  };
  drawLivery();
  const liveryTex = own(new T.CanvasTexture(livery));
  liveryTex.colorSpace = T.SRGBColorSpace;
  liveryTex.anisotropy = 4;
  const liveryMat = own(new T.MeshBasicMaterial({ map: liveryTex, transparent: true, depthWrite: false }));
  add(fairing, new T.PlaneGeometry(1.6, 0.5), liveryMat, -0.38, 0.06, 1.008);
  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => {
      drawLivery();
      liveryTex.needsUpdate = true;
    });
  }

  // Lifting eye, antenna and amber strobe
  const eye = add(fairing, new T.TorusGeometry(0.14, 0.03, 10, 28), metal, 0, 0.8, 0);
  eye.rotation.y = Math.PI / 2;
  add(fairing, new T.CylinderGeometry(0.014, 0.014, 0.95, 8), metal, 0.7, 1.225, -0.4);
  const beacon = add(fairing, new T.SphereGeometry(0.055, 16, 12), beaconMat, 0.7, 1.72, -0.4);

  // Thruster pods and struts
  for (const side of [-1, 1]) {
    const pod = new T.Group();
    pod.position.set(side * 1.78, 0.9, 0);
    root.add(pod);
    const body = add(pod, new T.CapsuleGeometry(0.26, 0.9, 8, Math.round(24 * seg)), metal);
    body.rotation.x = Math.PI / 2;
    for (const z of [-0.5, 0.5]) {
      add(pod, new T.TorusGeometry(0.275, 0.032, 10, 40), metal, 0, 0, z);
    }
    const wash = add(pod, new T.CircleGeometry(0.19, 28), glowMat, 0, 0, -0.74);
    wash.rotation.y = Math.PI;
    add(root, new T.BoxGeometry(0.4, 0.1, 0.18), darkMetal, side * 1.4, 0.9, 0);
  }

  // Instrument tray: multibeam transducer + floodlights
  add(root, rbox(1.7, 0.3, 1.1, 0.08), tray, 0, -1.18, 0);
  const transducers = new T.Group();
  transducers.position.set(0, -1.3, 0.56);
  root.add(transducers);
  for (let i = 0; i < 9; i++) {
    add(transducers, new T.BoxGeometry(0.1, 0.08, 0.05), glowMat, (i - 4) * 0.15, 0, 0);
  }

  const floods: THREE.SpotLight[] = [];
  const beamUniforms: { uIntensity: { value: number } }[] = [];
  const floodMount: THREE.Vector3[] = [];
  for (const side of [-1, 1]) {
    const at = new T.Vector3(side * 0.78, -1.08, 0.6);
    floodMount.push(at);
    add(root, rbox(0.36, 0.26, 0.32, 0.05), darkMetal, at.x, at.y, at.z);
    const lens = add(root, new T.CircleGeometry(0.1, 20), lensMat, at.x, at.y - 0.131, at.z + 0.02);
    lens.rotation.x = Math.PI / 2;

    const spot = new T.SpotLight(col(palette.titanium), 0, 16, 0.42, 0.85, 1.4);
    spot.position.set(at.x, at.y - 0.1, at.z + 0.1);
    spot.target.position.set(at.x + side * 0.6, -6, at.z + 1.1);
    root.add(spot, spot.target);
    floods.push(spot);

    const cone = makeBeam(T, own, 6, 1.45, palette.titanium, 0.5);
    cone.position.set(at.x, at.y - 0.13, at.z + 0.05);
    cone.rotation.set(-0.18, 0, side * 0.1);
    root.add(cone);
    beamUniforms.push((cone.material as THREE.ShaderMaterial).uniforms as { uIntensity: { value: number } });
  }
  const fan = makeBeam(T, own, 5, 1.1, palette.cyan, 0.3);
  fan.position.set(0, -1.34, 0.5);
  fan.rotation.x = 0.16;
  root.add(fan);
  const fanUniforms = (fan.material as THREE.ShaderMaterial).uniforms as { uIntensity: { value: number } };

  // Skids, legs and ballast
  for (const side of [-1, 1]) {
    const rail = add(root, new T.CylinderGeometry(0.055, 0.055, 2.3, 10), darkMetal, side * 1.12, -2.0, 0);
    rail.rotation.x = Math.PI / 2;
    for (const z of [-0.5, 0.5]) {
      link(root, new T.Vector3(side * 0.82, -1.3, z), new T.Vector3(side * 1.12, -2.0, z), 0.04, metal);
    }
    add(root, rbox(0.3, 0.22, 0.55, 0.05), seam, side * 1.12, -1.78, -0.2);
  }

  // Manipulator arm (animated)
  const shoulder = new T.Group();
  shoulder.position.set(-0.55, -1.3, 0.55);
  root.add(shoulder);
  add(shoulder, new T.SphereGeometry(0.07, 14, 10), metal);
  add(shoulder, new T.CylinderGeometry(0.035, 0.035, 0.7, 10), metal, 0, -0.35, 0);
  const elbow = new T.Group();
  elbow.position.set(0, -0.7, 0);
  shoulder.add(elbow);
  add(elbow, new T.SphereGeometry(0.06, 14, 10), metal);
  add(elbow, new T.CylinderGeometry(0.03, 0.03, 0.6, 10), metal, 0, -0.3, 0);
  const claws: THREE.Mesh[] = [-1, 1].map((s) => {
    const claw = add(elbow, new T.BoxGeometry(0.03, 0.2, 0.03), metal, s * 0.04, -0.7, 0);
    return claw;
  });

  // Callout anchors
  const anchorAt = (x: number, y: number, z: number) => {
    const o = new T.Object3D();
    o.position.set(x, y, z);
    root.add(o);
    return o;
  };
  const anchors = [
    anchorAt(1.25, 1.95, 0.5),
    anchorAt(0.98, 0.1, 0.3),
    anchorAt(floodMount[1].x + 0.18, floodMount[1].y, floodMount[1].z),
    anchorAt(0.85, -1.32, 0.58),
  ];

  const setLight = (level: number) => {
    const l = Math.min(Math.max(level, 0), 1);
    for (const s of floods) s.intensity = 6 + l * 70;
    for (const u of beamUniforms) u.uIntensity.value = 0.22 + l * 0.34;
    fanUniforms.uIntensity.value = 0.12 + l * 0.2;
  };
  setLight(0);

  const update = (time: number, glow: number) => {
    shoulder.rotation.x = 0.55 + Math.sin(time * 0.55) * 0.13;
    elbow.rotation.x = -0.95 + Math.sin(time * 0.75 + 1.0) * 0.16;
    const open = 0.05 + (Math.sin(time * 1.1) * 0.5 + 0.5) * 0.04;
    claws[0].position.x = -open;
    claws[1].position.x = open;
    glowMat.emissiveIntensity = 1.2 + glow * 2.6;
    portMat.emissiveIntensity = 0.45 + Math.sin(time * 1.6) * 0.1;
    const phase = (time % 2.6) / 2.6;
    beaconMat.opacity = phase > 0.62 && phase < 0.76 ? 1 : 0.22;
    beacon.scale.setScalar(beaconMat.opacity > 0.9 ? 1.5 : 1);
  };

  return {
    root,
    anchors,
    floods,
    setLight,
    update,
    dispose() {
      disposables.forEach((d) => d.dispose());
    },
  };
}

function makeBeam(
  T: typeof THREE,
  own: <A extends { dispose(): void }>(x: A) => A,
  length: number,
  radius: number,
  color: string,
  intensity: number,
): THREE.Mesh {
  const geo = own(new T.ConeGeometry(radius, length, 36, 1, true));
  geo.translate(0, -length / 2, 0);
  const mat = own(
    new T.ShaderMaterial({
      uniforms: {
        uColor: { value: new T.Color(color) },
        uIntensity: { value: intensity },
        uLength: { value: length },
      },
      vertexShader: BEAM_VERTEX,
      fragmentShader: BEAM_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      side: T.DoubleSide,
    }),
  );
  return new T.Mesh(geo, mat);
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/scene/pose.ts">
<![CDATA[import { clamp, lerp, progress } from "../motion/math";

/** Where the 3D submersible sits on screen for a given scroll position. Pixels, viewport-relative. */
export type Pose = {
  cx: number;
  cy: number;
  /** Width of the whole vehicle (pod tip to pod tip) in screen pixels. */
  width: number;
  yaw: number;
  pitch: number;
  opacity: number;
  /** 1 = hero callouts fully visible, 0 = hidden. */
  callouts: number;
};

export type PoseInput = {
  scrollY: number;
  heroHeight: number;
  docMax: number;
  vw: number;
  vh: number;
};

const HERO_YAW = -0.55;
const CONTENT_MAX = 1280;
const CONTENT_PAD = 64;

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function heroPose(vw: number, vh: number): Pick<Pose, "cx" | "cy" | "width" | "opacity" | "callouts"> {
  if (vw >= 1280) {
    const width = Math.min(vw * 0.33, 520);
    return { width, cx: vw - width * 0.5 - vw * 0.085, cy: vh * 0.5, opacity: 1, callouts: 1 };
  }
  if (vw >= 1024) {
    const width = vw * 0.36;
    return { width, cx: vw - width * 0.5 - vw * 0.03, cy: vh * 0.48, opacity: 1, callouts: 0 };
  }
  if (vw >= 768) {
    const width = vw * 0.5;
    return { width, cx: vw - width * 0.45, cy: vh * 0.55, opacity: 0.4, callouts: 0 };
  }
  return { width: vw * 0.78, cx: vw * 0.64, cy: vh * 0.74, opacity: 0.3, callouts: 0 };
}

function companionPose(vw: number, vh: number, p: number): Pick<Pose, "cx" | "cy" | "width" | "opacity"> {
  const cy = vh * (0.5 + 0.32 * Math.sin(p * 8 + 0.6));
  if (vw >= 1280) {
    const free = (Math.max(vw, CONTENT_MAX) - CONTENT_MAX) / 2 + CONTENT_PAD;
    // Keep clear of the depth rail that hugs the right edge of the descent stage.
    const width = clamp(free * 0.7, 84, 170);
    return { width, cx: vw - 48 - width / 2, cy, opacity: 1 };
  }
  if (vw >= 768) return { width: 84, cx: vw - 44, cy, opacity: 0.35 };
  return { width: 64, cx: vw - 36, cy, opacity: 0.4 };
}

export function computePose({ scrollY, heroHeight, docMax, vw, vh }: PoseInput): Pose {
  const t = smooth(progress(scrollY, 0, Math.max(heroHeight * 0.85, 1)));
  const p = docMax > 0 ? clamp(scrollY / docMax, 0, 1) : 0;
  const a = heroPose(vw, vh);
  const b = companionPose(vw, vh, p);

  return {
    cx: lerp(a.cx, b.cx, t),
    cy: lerp(a.cy, b.cy, t),
    width: lerp(a.width, b.width, t),
    opacity: lerp(a.opacity, b.opacity, t),
    callouts: a.callouts * (1 - clamp(t * 3, 0, 1)),
    yaw: HERO_YAW + p * Math.PI * 5,
    pitch: 0.1 + 0.06 * Math.sin(p * 12),
  };
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/scene/SubmersibleScene.tsx">
<![CDATA["use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { clamp, lerp } from "../motion/math";
import { computePose, type Pose } from "./pose";
import { MODEL_WIDTH, buildSubmersible, type Palette } from "./buildSubmersible";

/**
 * Fixed WebGL layer that carries the BATHYS H-11 through the whole page:
 * large and three-quarter-on beside the hero copy, then a slowly turning
 * companion in the right gutter as you scroll. Floodlights brighten and the
 * key light dims as the dive deepens. Under reduced motion (or without WebGL)
 * the layer never mounts and the hero simply shows the water column.
 */

const CALLOUTS = [
  { label: "SYNTACTIC FOAM FAIRING", sub: "0.54 G/CM³", dx: 34, dy: -12 },
  { label: "TI-6AL-4V PRESSURE SPHERE", sub: "Ø 1,800 MM · 64 MM WALL", dx: 34, dy: 0 },
  { label: "COLD-WHITE FLOODLIGHTS", sub: "2 × FORWARD ARRAY", dx: 40, dy: -14 },
  { label: "MULTIBEAM TRANSDUCER", sub: "SYNTHETIC APERTURE", dx: 84, dy: 34 },
];

const FOV = 32;
const CAMERA_Z = 12;
const PALETTE_KEYS: (keyof Palette)[] = ["trench", "navy", "titanium", "cyan", "amber", "glass", "slate", "mist"];

export function SubmersibleScene() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const calloutsRef = useRef<HTMLDivElement | null>(null);
  const calloutEls = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const calloutHost = calloutsRef.current;
    if (!canvas || !calloutHost) return;

    let disposed = false;
    let teardown: () => void = () => {};

    (async () => {
      const [T, rbModule, envModule] = await Promise.all([
        import("three"),
        import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try {
        renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the SVG submersible in HeroScene stays
      }

      const style = getComputedStyle(document.documentElement);
      const palette = Object.fromEntries(
        PALETTE_KEYS.map((k) => [k, style.getPropertyValue(`--color-${k}`).trim()]),
      ) as Palette;
      const fontFamily = getComputedStyle(document.body).getPropertyValue("--font-mono").trim() || "monospace";

      let vw = window.innerWidth;
      let vh = window.innerHeight;
      const small = vw < 700;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
      renderer.setSize(vw, vh, false);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(FOV, vw / vh, 0.1, 60);
      camera.position.set(0, 0, CAMERA_Z);

      const pmrem = new T.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new envModule.RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const hemi = new T.HemisphereLight(new T.Color(palette.mist), new T.Color(palette.trench), 0.6);
      const key = new T.DirectionalLight(new T.Color(palette.titanium), 2.6);
      key.position.set(-2.5, 6, 5);
      const rim = new T.DirectionalLight(new T.Color(palette.cyan), 1.1);
      rim.position.set(4, 2, -4);
      scene.add(hemi, key, rim);

      const sub = buildSubmersible({
        THREE: T,
        RoundedBox: rbModule.RoundedBoxGeometry,
        palette,
        fontFamily,
        detail: small ? "low" : "high",
      });
      const stage = new T.Group();
      stage.add(sub.root);
      scene.add(stage);

      // Sonar pings: camera-facing rings that expand from the pressure sphere.
      const pingGroup = new T.Group();
      scene.add(pingGroup);
      const pings = [0, 1, 2].map((i) => {
        const mat = new T.MeshBasicMaterial({
          color: new T.Color(palette.cyan),
          transparent: true,
          depthWrite: false,
          blending: T.AdditiveBlending,
        });
        const mesh = new T.Mesh(new T.RingGeometry(0.985, 1, 96), mat);
        pingGroup.add(mesh);
        return { mesh, mat, offset: i / 3 };
      });

      const heroEl = () => document.getElementById("hero");
      const readTarget = (): Pose => {
        const docMax = document.documentElement.scrollHeight - vh;
        return computePose({
          scrollY: window.scrollY,
          heroHeight: heroEl()?.offsetHeight ?? vh,
          docMax,
          vw,
          vh,
        });
      };

      const cur = readTarget();
      cur.opacity = 0; // fade in
      let lastScroll = window.scrollY;
      let velocity = 0;
      let last = performance.now();
      let raf = 0;
      const v3 = new T.Vector3();

      const onResize = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        renderer.setSize(vw, vh, false);
        camera.aspect = vw / vh;
        camera.updateProjectionMatrix();
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const time = now / 1000;

        const target = readTarget();
        const k = 1 - Math.exp(-dt * 6);
        cur.cx = lerp(cur.cx, target.cx, k);
        cur.cy = lerp(cur.cy, target.cy, k);
        cur.width = lerp(cur.width, target.width, k);
        cur.yaw = lerp(cur.yaw, target.yaw, k);
        cur.pitch = lerp(cur.pitch, target.pitch, k);
        cur.opacity = lerp(cur.opacity, target.opacity, 1 - Math.exp(-dt * 2.5));
        cur.callouts = lerp(cur.callouts, target.callouts, 1 - Math.exp(-dt * 8));

        const y = window.scrollY;
        const dive = clamp(y / Math.max(document.documentElement.scrollHeight - vh, 1), 0, 1);
        velocity = lerp(velocity, Math.abs(y - lastScroll) / Math.max(dt, 0.001), 1 - Math.exp(-dt * 5));
        lastScroll = y;

        // Screen pixels -> world units at the camera's focal plane
        const pxPerUnit = vh / (2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z);
        const s = cur.width / (MODEL_WIDTH * pxPerUnit);
        stage.position.set((cur.cx - vw / 2) / pxPerUnit, -(cur.cy - vh / 2) / pxPerUnit, 0);
        stage.scale.setScalar(s);
        sub.root.rotation.set(cur.pitch, cur.yaw + Math.sin(time * 0.3) * 0.06, Math.sin(time * 0.6) * 0.015);
        sub.root.position.y = Math.sin(time * 0.9) * 0.08;

        // Deeper = less surface light, stronger floodlights
        const deep = clamp(dive * 2.2, 0, 1);
        key.intensity = lerp(2.6, 0.55, deep);
        hemi.intensity = lerp(0.6, 0.18, deep);
        scene.environmentIntensity = lerp(0.4, 0.14, deep);
        sub.setLight(lerp(0.15, 1, deep));
        sub.update(time, clamp(velocity / 1800, 0, 1));

        pingGroup.position.copy(stage.position);
        for (const p of pings) {
          const phase = (time / 4.2 + p.offset) % 1;
          p.mesh.scale.setScalar(s * (1.3 + phase * 5.5));
          p.mat.opacity = (1 - phase) * (1 - phase) * 0.45 * (0.25 + cur.callouts * 0.75);
        }

        canvas.style.opacity = cur.opacity.toFixed(3);

        stage.updateMatrixWorld(true);
        const showCallouts = cur.callouts > 0.01;
        calloutHost.style.opacity = showCallouts ? cur.callouts.toFixed(3) : "0";
        if (showCallouts) {
          sub.anchors.forEach((a, i) => {
            const el = calloutEls.current[i];
            if (!el) return;
            a.getWorldPosition(v3).project(camera);
            const sx = (v3.x * 0.5 + 0.5) * vw;
            const sy = (-v3.y * 0.5 + 0.5) * vh;
            el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;
          });
        }

        renderer.render(scene, camera);
      };

      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (document.hidden) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };
      const onContextLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(raf);
      };

      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.addEventListener("webglcontextlost", onContextLost);
      onVisibility();

      teardown = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        sub.dispose();
        for (const p of pings) {
          p.mesh.geometry.dispose();
          p.mat.dispose();
        }
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} aria-hidden="true" className="bat-sub pointer-events-none fixed inset-0 z-[5]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" />
      <div ref={calloutsRef} className="absolute inset-0 hidden opacity-0 xl:block">
        {CALLOUTS.map((c, i) => {
          const length = Math.hypot(c.dx, c.dy);
          const angle = (Math.atan2(c.dy, c.dx) * 180) / Math.PI;
          return (
            <div
              key={c.label}
              ref={(el) => {
                calloutEls.current[i] = el;
              }}
              className="bat-callout"
            >
              <span className="bat-callout-dot" />
              <span className="bat-callout-line" style={{ width: length, transform: `rotate(${angle}deg)` }} />
              <span className="bat-callout-text" style={{ left: c.dx + 8, top: c.dy - 7 }}>
                {c.label}
                <small>{c.sub}</small>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/ArchitectureSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

type SubAssembly = {
  id: string;
  name: string;
  code: string;
  headline: string;
  specs: { label: string; value: string }[];
  description: string;
};

const SUB_ASSEMBLIES: SubAssembly[] = [
  {
    id: "hull",
    name: "Titanium Pressure Sphere",
    code: "HULL-TI-64",
    headline: "Grade 5 Titanium Dual-Hemisphere Shell",
    specs: [
      { label: "Material", value: "Ti-6Al-4V Grade 5" },
      { label: "Wall Thickness", value: "64 mm" },
      { label: "Internal Diameter", value: "1,800 mm" },
      { label: "Collapse Pressure", value: "1,650 bar" },
    ],
    description:
      "Precision-machined from two solid forged titanium billets in Brest, diffusion-bonded along the equatorial seam. Houses all core flight compute, inertial guidance, and scientific telemetry payloads in an unpressurized 1-atmosphere internal environment.",
  },
  {
    id: "buoyancy",
    name: "Syntactic Foam Core",
    code: "BUOY-SF-54",
    headline: "Hadal Syntactic Glass Micro-Sphere Matrix",
    specs: [
      { label: "Density", value: "0.54 g/cm³" },
      { label: "Matrix", value: "Epoxy + Borosilicate Bubbles" },
      { label: "Service Depth", value: "12,000 metres" },
      { label: "Water Absorption", value: "<0.08% after 72h" },
    ],
    description:
      "Solid micro-cellular matrix providing positive buoyancy without hollow void spaces. Engineered to eliminate hydrostatic volume compaction under 1,100 bar, guaranteeing stable ascent buoyancy upon magnetic ballast drop.",
  },
  {
    id: "propulsion",
    name: "Magnetic Thruster Pods",
    code: "PROP-MAG-04",
    headline: "Rim-Driven Brushless Magnetic Induction",
    specs: [
      { label: "Configuration", value: "6-Axis Vector Array" },
      { label: "Thrust Output", value: "480 N per pod" },
      { label: "Shaft Seals", value: "None (Magnetic Coupling)" },
      { label: "Cooling", value: "Direct Hadal Ambient 1.8°C" },
    ],
    description:
      "Shaftless rim-driven propulsors eliminating traditional rotary dynamic shaft seals. The propeller blades are integrated directly into a magnetic rotor driven by stator coils isolated within the pressure-compensated shroud.",
  },
  {
    id: "power",
    name: "Pressure-Compensated Battery",
    code: "PWR-LIS-140",
    headline: "Dielectric Fluid-Bathed Lithium-Sulfur Core",
    specs: [
      { label: "Capacity", value: "140 kWh" },
      { label: "Chemistry", value: "Lithium-Sulfur (Li-S)" },
      { label: "Housing", value: "Silicone Oil Ambient Compensated" },
      { label: "Continuous Life", value: "72 hours at 1,100 bar" },
    ],
    description:
      "Subsea battery cells immersed in low-viscosity dielectric silicone oil with a flexible diaphragm reservoir that equalizes internal cell pressure with external hydrostatic load, eliminating heavy battery pressure vessels.",
  },
];

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<string>("hull");
  const activeSub = SUB_ASSEMBLIES.find((s) => s.id === activeTab) ?? SUB_ASSEMBLIES[0];

  return (
    <section id="architecture" className="py-24 border-b border-glass relative overflow-hidden">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            03 // Structural Engineering
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Vehicle Architecture &amp; Pressure Hull
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Engineered from Grade 5 titanium, borosilicate syntactic foam, and magnetic-induction propulsion to withstand 1,114 bar crushing pressure without mechanical failure.
          </p>
        </Reveal>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-glass pb-4" role="tablist">
          {SUB_ASSEMBLIES.map((sub) => (
            <button
              key={sub.id}
              role="tab"
              aria-selected={activeTab === sub.id}
              onClick={() => setActiveTab(sub.id)}
              className={`bat-btn text-xs py-2 px-4 rounded ${
                activeTab === sub.id
                  ? "bg-cyan text-trench font-bold"
                  : "bg-navy/70 text-mist border border-glass hover:border-slate"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Interactive Exploded View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vector Hull Blueprint Graphic */}
          <div className="lg:col-span-7 bg-navy/80 border border-glass rounded-xl p-6 sm:p-8 relative flex items-center justify-center">
            <svg
              viewBox="0 0 500 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-[460px]"
              aria-label="Exploded Subsea Vehicle Schematic"
            >
              {/* Reference Grid */}
              <rect x="10" y="10" width="480" height="340" rx="8" stroke="#122338" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="250" y1="20" x2="250" y2="340" stroke="#122338" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="180" x2="480" y2="180" stroke="#122338" strokeWidth="1" strokeDasharray="3 3" />

              {/* Syntactic Foam Upper Shell */}
              <path
                d="M120 120 C120 70, 380 70, 380 120 L360 150 L140 150 Z"
                fill={activeTab === "buoyancy" ? "rgba(0, 229, 255, 0.25)" : "rgba(18, 35, 56, 0.4)"}
                stroke={activeTab === "buoyancy" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "buoyancy" ? "2.5" : "1.5"}
              />
              <text x="250" y="115" fill={activeTab === "buoyancy" ? "#00E5FF" : "#8DA8C2"} fontFamily="var(--font-share-mono, monospace)" fontSize="10" textAnchor="middle">
                SYNTACTIC FOAM FAIRING
              </text>

              {/* Central Titanium Pressure Sphere */}
              <circle
                cx="250"
                cy="190"
                r="70"
                fill={activeTab === "hull" ? "rgba(0, 229, 255, 0.2)" : "rgba(10, 21, 38, 0.9)"}
                stroke={activeTab === "hull" ? "#00E5FF" : "#EDF5FA"}
                strokeWidth={activeTab === "hull" ? "3" : "2"}
              />
              <circle cx="250" cy="190" r="54" stroke="#546E8A" strokeWidth="1.2" strokeDasharray="3 3" />
              <line x1="180" y1="190" x2="320" y2="190" stroke="#546E8A" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="250" cy="190" r="8" fill="#00E5FF" />
              <text x="250" y="194" fill="#EDF5FA" fontFamily="var(--font-share-mono, monospace)" fontSize="9" textAnchor="middle" dy="16">
                TI-6AL-4V SPHERE
              </text>

              {/* Left / Right Magnetic Thruster Pods */}
              <g
                stroke={activeTab === "propulsion" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "propulsion" ? "2" : "1.2"}
                fill={activeTab === "propulsion" ? "rgba(0, 229, 255, 0.2)" : "rgba(18, 35, 56, 0.5)"}
              >
                {/* Left Thruster */}
                <rect x="70" y="170" width="40" height="40" rx="4" />
                <line x1="60" y1="190" x2="70" y2="190" />
                {/* Right Thruster */}
                <rect x="390" y="170" width="40" height="40" rx="4" />
                <line x1="430" y1="190" x2="440" y2="190" />
              </g>

              {/* Lower Battery Tray */}
              <rect
                x="150"
                y="275"
                width="200"
                height="35"
                rx="6"
                fill={activeTab === "power" ? "rgba(0, 229, 255, 0.2)" : "rgba(18, 35, 56, 0.5)"}
                stroke={activeTab === "power" ? "#00E5FF" : "#546E8A"}
                strokeWidth={activeTab === "power" ? "2.5" : "1.5"}
              />
              <text x="250" y="297" fill={activeTab === "power" ? "#00E5FF" : "#8DA8C2"} fontFamily="var(--font-share-mono, monospace)" fontSize="9" textAnchor="middle">
                LITHIUM-SULFUR BATTERY TRAY
              </text>
            </svg>
          </div>

          {/* Right Column: Active Sub-Assembly Specification */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <TiltCard className="p-6">
              <div className="flex items-center justify-between border-b border-glass pb-3 mb-4">
                <span className="bat-mono text-xs text-cyan font-bold">{activeSub.code}</span>
                <span className="bat-mono text-[11px] text-slate">SPECIFICATION DOSSIER</span>
              </div>

              <h3 className="bat-display text-2xl font-bold uppercase text-titanium mb-2">
                {activeSub.headline}
              </h3>

              <p className="text-sm text-mist leading-relaxed font-body mb-6">
                {activeSub.description}
              </p>

              <div className="grid grid-cols-2 gap-3 border-t border-glass pt-4">
                {activeSub.specs.map((s) => (
                  <div key={s.label} className="bg-glass/50 p-3 rounded">
                    <span className="bat-mono text-[10px] text-slate uppercase block">
                      {s.label}
                    </span>
                    <span className="bat-mono text-sm font-bold text-titanium block mt-0.5">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/Footer.tsx">
<![CDATA["use client";

import React from "react";
import { LogoLockup } from "../brand/Logo";

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 border-t border-glass relative">
      <div className="bat-wrap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-glass">
          {/* Brand info (left 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <LogoLockup className="w-auto h-9" />
            <p className="text-sm text-mist max-w-sm font-body leading-relaxed mt-2">
              Autonomous hadopelagic exploration vehicles engineered to endure 1,100 bar hydrostatic pressure without umbilical tether.
            </p>
            <div className="bat-mono text-xs text-slate mt-2">
              FOUNDRY FACILITIES: BREST &amp; MONTEREY
            </div>
          </div>

          {/* Quick links (mid 3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="bat-mono text-xs text-slate uppercase tracking-wider">
              Navigation
            </span>
            <a href="#hero" className="text-sm text-mist hover:text-cyan transition-colors">
              Surface &amp; Mission Overview
            </a>
            <a href="#descent" className="text-sm text-mist hover:text-cyan transition-colors">
              The Hadal Dive (10,928m)
            </a>
            <a href="#architecture" className="text-sm text-mist hover:text-cyan transition-colors">
              Vehicle Architecture
            </a>
            <a href="#sensors" className="text-sm text-mist hover:text-cyan transition-colors">
              Sensor Instrumentation
            </a>
            <a href="#dossiers" className="text-sm text-mist hover:text-cyan transition-colors">
              Field Operations Dossiers
            </a>
            <a href="#charter" className="text-sm text-mist hover:text-cyan transition-colors">
              Payload Integration Charter
            </a>
          </div>

          {/* Facilities & Registry (right 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="bat-mono text-xs text-slate uppercase tracking-wider">
              Hydrographic Registry
            </span>
            <div className="bat-mono text-xs text-mist leading-relaxed">
              <p className="mb-2">
                <strong className="text-titanium">Brest Marine Robotics Yard:</strong><br />
                Quai de la Douane, 29200 Brest, France
              </p>
              <p>
                <strong className="text-titanium">Monterey Subsea Basin:</strong><br />
                Cannery Row Pier 7, Monterey, CA 93940, USA
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="bat-btn bat-btn-outline text-xs py-2 px-4"
              >
                ▲ Return to Surface
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 bat-mono text-xs text-slate">
          <div>
            &copy; 2026 BATHYS Robotics S.A. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>IMO SUBSEA CAT. H-11</span>
            <span>·</span>
            <span>PRESSURE CERTIFIED 11,000 M</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/HeaderHUD.tsx">
<![CDATA["use client";

import React, { useState, useSyncExternalStore } from "react";
import { LogoMark } from "../brand/Logo";
import { getDefaultDescentStore } from "../descent/store";
import { calculatePressure } from "../descent/physics";

export function HeaderHUD() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const pressure = calculatePressure(depth);

  const links = [
    { label: "Descent", href: "#descent" },
    { label: "Architecture", href: "#architecture" },
    { label: "Sensors", href: "#sensors" },
    { label: "Dossiers", href: "#dossiers" },
    { label: "Charter", href: "#charter" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] bg-trench/90 border-b border-glass backdrop-blur-md z-50 transition-all duration-300">
      <div className="bat-wrap h-full flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#hero" className="flex items-center gap-3 text-decoration-none group">
          <LogoMark className="w-8 h-8 transition-transform group-hover:scale-105 duration-200" />
          <div className="flex flex-col">
            <span className="bat-display font-bold text-lg tracking-[0.15em] text-titanium leading-none">
              BATHYS
            </span>
            <span className="bat-mono text-[9px] text-cyan tracking-[0.2em] uppercase leading-tight mt-0.5">
              11,000 M CERTIFIED
            </span>
          </div>
        </a>

        {/* Live Depth & Pressure Telemetry Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-4 bg-navy/80 border border-glass px-4 py-1.5 rounded-full">
          <div className="flex items-center gap-1.5 bat-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-slate">DEPTH:</span>
            <span className="text-titanium font-bold tabular-nums">{depth.toLocaleString()} M</span>
          </div>
          <span className="text-glass">|</span>
          <div className="flex items-center gap-1.5 bat-mono text-xs">
            <span className="text-slate">PRESSURE:</span>
            <span className="text-cyan font-bold tabular-nums">{pressure.bar.toFixed(1)} BAR</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="bat-mono text-xs text-mist hover:text-cyan transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center">
          <a href="#charter" className="bat-btn bat-btn-primary text-xs py-2 px-4">
            Commission Payload
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-9 h-9 border border-glass rounded bg-navy text-titanium hover:border-cyan"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-4 h-0.5 bg-titanium transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-titanium transition-opacity duration-200 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-titanium transition-transform duration-200 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[64px] left-0 right-0 bg-trench/95 border-b border-glass p-6 backdrop-blur-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-glass bat-mono text-xs">
            <span className="text-slate">TELEMETRY LINK:</span>
            <span className="text-cyan font-bold">{depth} M · {pressure.bar.toFixed(0)} BAR</span>
          </div>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="bat-display text-lg text-titanium hover:text-cyan uppercase font-bold tracking-wider py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#charter"
            onClick={() => setMobileMenuOpen(false)}
            className="bat-btn bat-btn-primary w-full text-center mt-2"
          >
            Commission Payload
          </a>
        </div>
      )}
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/Hero.tsx">
<![CDATA["use client";

import React, { useEffect, useState } from "react";
import { HeroScene } from "./HeroScene";

export function Hero() {
  // The headline's mask-rise keys off an ancestor's data-in; flip it once after mount.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-[90px] pb-16 overflow-hidden border-b border-glass"
    >
      {/* Water surface, light shafts and the descending submersible */}
      <HeroScene />

      <div className="bat-wrap relative z-10">
        <div className="max-w-4xl">
          {/* Top Eyebrow Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold">
              AUTONOMOUS HADAL VEHICLES // BREST &amp; MONTEREY
            </span>
            <span className="text-slate text-xs">·</span>
            <span className="bat-mono text-xs text-mist uppercase">
              11°22.4&apos; N · 142°35.5&apos; E
            </span>
          </div>

          {/* Mask-Rise Headline */}
          <h1
            data-in={ready ? "true" : undefined}
            className="bat-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-titanium uppercase leading-[0.98] mb-6"
          >
            <span className="bat-mask-line">
              <span style={{ "--delay": "280ms" } as React.CSSProperties}>Engineered for the</span>
            </span>
            <span className="bat-mask-line">
              <span className="text-cyan" style={{ "--delay": "280ms", "--i": 1 } as React.CSSProperties}>
                11,000-metre breach.
              </span>
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl text-mist font-body max-w-2xl leading-relaxed mb-8">
            Autonomous titanium-ceramic submersibles engineered to endure 1,100 bar hydrostatic pressure in the Mariana, Puerto Rico, and Kermadec trenches without umbilical tether.
          </p>

          {/* Action CTAs & Telemetry */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#descent" className="bat-btn bat-btn-primary">
              Begin Dive Telemetry
            </a>
            <a href="#charter" className="bat-btn bat-btn-outline">
              Commission Payload
            </a>
          </div>

          {/* Key Verification Specs strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-glass">
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                MAX CERTIFIED DEPTH
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                11,000 <span className="text-xs text-cyan">M</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                HYDROSTATIC LOAD
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                1,114 <span className="text-xs text-cyan">BAR</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                PRESSURE SPHERE
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                Ti-6Al-4V <span className="text-xs text-cyan">GR.5</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                MISSION ENDURANCE
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                72 <span className="text-xs text-cyan">HRS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/HeroScene.tsx">
<![CDATA[import React from "react";

/**
 * Hero backdrop: a sunlit surface above with light shafts that die off with
 * depth. The submersible itself is the 3D layer in scene/SubmersibleScene.
 * Pure CSS + SVG, decorative only; motion is switched off by the
 * reduced-motion block in bathys.css.
 */

const RAYS = [
  { left: "6%", width: 150, delay: "0s", dur: "11s" },
  { left: "22%", width: 90, delay: "-4s", dur: "14s" },
  { left: "38%", width: 190, delay: "-7s", dur: "12s" },
  { left: "57%", width: 110, delay: "-2s", dur: "16s" },
  { left: "73%", width: 170, delay: "-9s", dur: "13s" },
  { left: "90%", width: 100, delay: "-5s", dur: "15s" },
];

function wavePath(cycles: number, cycle: number, amp: number, mid: number): string {
  let d = `M0 ${mid}`;
  for (let i = 0; i < cycles; i++) {
    const x = i * cycle;
    d += ` Q${x + cycle / 4} ${mid - amp * 2} ${x + cycle / 2} ${mid}`;
    d += ` Q${x + (cycle * 3) / 4} ${mid + amp * 2} ${x + cycle} ${mid}`;
  }
  return d;
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sunlit surface glow + drifting light shafts */}
      <div className="bat-hero-glow absolute inset-x-0 top-0 h-[75%]" />
      <div className="bat-hero-rays absolute inset-x-0 top-0 h-[88%] overflow-hidden">
        {RAYS.map((r) => (
          <span
            key={r.left}
            className="bat-ray"
            style={{ left: r.left, width: r.width, animationDelay: r.delay, animationDuration: r.dur }}
          />
        ))}
      </div>

      {/* Water surface seen from below */}
      <div className="absolute inset-x-0 top-[62px] h-7 overflow-hidden">
        <svg className="bat-wave absolute left-0 top-0 h-full w-[200%]" viewBox="0 0 3200 28" preserveAspectRatio="none" fill="none">
          <path d={wavePath(16, 200, 3, 10)} className="stroke-mist" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg
          className="bat-wave bat-wave-fast absolute left-0 top-0 h-full w-[200%]"
          viewBox="0 0 3200 28"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d={wavePath(20, 160, 4, 14)} className="stroke-cyan" strokeOpacity="0.4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Legibility scrim for the copy column, and a soft handoff into the descent stage */}
      <div className="bat-hero-scrim absolute inset-0" />
      <div className="bat-hero-fade absolute inset-x-0 bottom-0 h-40" />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/OceanAmbient.tsx">
<![CDATA["use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";

/**
 * Page-wide water column, fixed behind every section. Scroll progress is
 * written to --dive (0 at the surface, 1 at the seafloor); the CSS in
 * bathys.css uses it to fade the sunlit layer out, bring bioluminescent motes
 * in and raise the trench floor into view at the bottom of the page.
 * Marine snow drifts upward and speeds up with scroll, so scrolling reads as
 * descending rather than as a page moving.
 */

type Flake = { x: number; y: number; r: number; z: number; vy: number; vx: number; a: number; ph: number };

const TICK_PERIOD = 80;
const FALLBACK_RGB = "141, 168, 194";

function tokenToRgb(value: string): string {
  const v = value.trim().replace("#", "");
  if (v.length !== 3 && v.length !== 6) return FALLBACK_RGB;
  const full = v.length === 3 ? [...v].map((c) => c + c).join("") : v;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return FALLBACK_RGB;
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function OceanAmbient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ruler = rulerRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = tokenToRgb(getComputedStyle(root).getPropertyValue("--color-mist"));

    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let scrollQueued = false;
    let lastScroll = window.scrollY;
    let last = performance.now();

    const seed = () => {
      const count = w < 700 ? 36 : 84;
      flakes = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + z * 1.5,
          z,
          vy: 5 + z * 13,
          vx: (Math.random() - 0.5) * 5,
          a: 0.1 + z * 0.4,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now());
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.0011 + f.ph);
        ctx.fillStyle = `rgba(${rgb}, ${(f.a * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const wrap = (f: Flake) => {
      if (f.y < -6) f.y += h + 12;
      else if (f.y > h + 6) f.y -= h + 12;
      if (f.x < -6) f.x += w + 12;
      else if (f.x > w + 6) f.x -= w + 12;
    };

    const syncScroll = () => {
      scrollQueued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--dive", p.toFixed(3));
      if (!reduced) {
        if (ruler) ruler.style.transform = `translate3d(0, ${-((y * 0.3) % TICK_PERIOD)}px, 0)`;
        const dy = y - lastScroll;
        lastScroll = y;
        for (const f of flakes) {
          f.y -= dy * f.z * 0.45;
          wrap(f);
        }
      }
    };

    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(syncScroll);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const f of flakes) {
        f.y -= f.vy * dt;
        f.x += (f.vx + Math.sin(now * 0.0004 + f.ph) * 4) * dt;
        wrap(f);
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.hidden || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    syncScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="bat-ocean pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bat-ocean-shallow absolute inset-0" />
      <div className="bat-ocean-motes absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Sounding-line ruler: ticks slide upward as you descend */}
      <div className="absolute bottom-0 left-0 top-16 hidden w-6 overflow-hidden opacity-60 md:block">
        <div
          ref={rulerRef}
          className="bat-ruler absolute left-0 top-0 w-full"
          style={{ height: `calc(100% + ${TICK_PERIOD}px)` }}
        />
      </div>

      {/* Trench floor rises into view as the dive completes */}
      <div className="bat-seafloor absolute inset-x-0 bottom-0 h-[22vh]">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="h-full w-full" fill="none">
          <path
            d="M0 96 L90 78 L170 100 L260 64 L350 92 L450 58 L540 88 L640 70 L730 102 L830 62 L930 94 L1030 72 L1120 90 L1200 76 L1200 220 L0 220 Z"
            className="fill-navy"
            fillOpacity="0.55"
          />
          <path
            d="M0 140 L70 124 L160 146 L250 116 L340 142 L440 112 L540 140 L640 122 L740 148 L840 118 L940 144 L1040 124 L1130 140 L1200 126 L1200 220 L0 220 Z"
            className="fill-trench"
          />
          <path
            d="M0 140 L70 124 L160 146 L250 116 L340 142 L440 112 L540 140 L640 122 L740 148 L840 118 L940 144 L1040 124 L1130 140 L1200 126"
            className="stroke-slate"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 168 L100 154 L210 172 L330 148 L450 170 L570 152 L690 174 L810 150 L930 170 L1060 154 L1200 166"
            className="stroke-slate"
            strokeOpacity="0.14"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 196 L140 186 L280 200 L430 184 L580 198 L730 186 L880 200 L1040 188 L1200 196"
            className="stroke-slate"
            strokeOpacity="0.1"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="250" cy="116" r="3" className="bat-strobe fill-cyan" />
          <circle cx="840" cy="118" r="3" className="bat-strobe fill-cyan" style={{ animationDelay: "-1.3s" }} />
          <circle cx="540" cy="140" r="2.5" className="bat-strobe fill-amber" style={{ animationDelay: "-0.7s" }} />
        </svg>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/SensorSuiteSection.tsx">
<![CDATA["use client";

import React from "react";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

const SENSORS = [
  {
    code: "SNS-SAS-120",
    name: "Synthetic Aperture Sonar",
    metric: "0.05 M Resolution",
    band: "120 kHz High-Frequency Chirp",
    description:
      "Wide-swath bathymetric interferometer generating real-time centimeter-accurate 3D point clouds of the hadal seafloor, sub-bottom strata, and trench scarp formations.",
  },
  {
    code: "SNS-CTD-04",
    name: "Ultra-Deep CTD Probe",
    metric: "±0.001 °C Accuracy",
    band: "Titanium Bulkhead Penetrator",
    description:
      "Calibrated oceanographic sensor measuring Conductivity, Temperature, and Depth. Captures in-situ salinity gradients and physical sound velocity profiles down to 10,928 metres.",
  },
  {
    code: "SNS-RAMAN-532",
    name: "Laser Raman Spectrometer",
    metric: "532 nm Nd:YAG Laser",
    band: "Non-Destructive In-Situ Assay",
    description:
      "Deep-sea optical spectrometer focusing a green laser beam through a sapphire window to identify mineral crystal lattices, dissolved gas phases, and hadal hydrothermal chemistry.",
  },
  {
    code: "SNS-CORE-HYP",
    name: "Isobaric Benthic Sampler",
    metric: "4 × 500 mm Sediment Core",
    band: "Hydraulic Seal Lock",
    description:
      "Articulated hydraulic rotary corer engineered to recover trench-floor sediment and benthic microorganisms while retaining ambient hydrostatic pressure during ascent to surface.",
  },
];

export function SensorSuiteSection() {
  return (
    <section id="sensors" className="py-24 border-b border-glass bg-navy/30 relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            04 // Oceanographic Instrumentation
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Hadal Bathymetric Sensor Suite
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Equipped with multi-sensor payloads calibrated for extreme hydrostatic pressures, delivering sub-decimeter topographical mapping and in-situ chemical spectroscopy.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SENSORS.map((sensor, idx) => (
            <Reveal key={sensor.code} variant="rise" index={idx} delay={idx * 60}>
              <TiltCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-glass pb-3 mb-4">
                    <span className="bat-mono text-xs text-cyan font-bold">{sensor.code}</span>
                    <span className="bat-mono text-[11px] text-amber font-semibold">{sensor.metric}</span>
                  </div>
                  <h3 className="bat-display text-xl font-bold uppercase text-titanium mb-2">
                    {sensor.name}
                  </h3>
                  <p className="text-sm text-mist leading-relaxed font-body mb-4">
                    {sensor.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-glass flex items-center justify-between bat-mono text-[11px] text-slate">
                  <span>SPECIFICATION</span>
                  <span className="text-titanium">{sensor.band}</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sections/TrenchDossiersSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { Reveal } from "../motion/Reveal";

const DOSSIERS = [
  {
    id: "mariana",
    title: "Challenger Deep Sounding",
    trench: "Mariana Trench, Western Pacific",
    depth: "10,928 M",
    pressure: "1,114.2 BAR",
    coordinates: "11°22.4' N · 142°35.5' E",
    hours: "72.4 HRS SUBMERGED",
    achievements: [
      "Continuous 0.05m multibeam bathymetric map across 42 km of trench axis",
      "In-situ Raman spectroscopy detection of mantle serpentinization",
      "Full autonomous acoustic homing and recovery without beacon tether",
    ],
  },
  {
    id: "puerto-rico",
    title: "Milwaukee Deep Fault Survey",
    trench: "Puerto Rico Trench, Atlantic Ocean",
    depth: "8,376 M",
    pressure: "852.0 BAR",
    coordinates: "19°35.0' N · 66°30.0' W",
    hours: "48.0 HRS SUBMERGED",
    achievements: [
      "Subduction zone micro-seismic fracture lineation mapping",
      "Recovery of 12 undisturbed hadal sediment cores under pressure lock",
      "Doppler velocity navigation in 0.8 knot deep benthic current",
    ],
  },
  {
    id: "kermadec",
    title: "Scholl Deep Hydrothermal Sweep",
    trench: "Kermadec Trench, South Pacific",
    depth: "10,047 M",
    pressure: "1,024.5 BAR",
    coordinates: "32°30.0' S · 178°15.0' W",
    hours: "64.2 HRS SUBMERGED",
    achievements: [
      "Detection of deep hydrothermal venting at tectonic trench junction",
      "Magnetometer anomaly characterization along subducting Pacific plate",
      "Bioluminescent optical sensor capture of hadal amphipod colonies",
    ],
  },
];

export function TrenchDossiersSection() {
  const [activeDossier, setActiveDossier] = useState(0);
  const current = DOSSIERS[activeDossier];

  return (
    <section id="dossiers" className="py-24 border-b border-glass relative">
      <div className="bat-wrap">
        <Reveal variant="rise" className="mb-12">
          <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold block mb-2">
            05 // Field Operations
          </span>
          <h2 className="bat-display text-3xl sm:text-5xl font-bold uppercase text-titanium">
            Hadal Trench Mission Dossiers
          </h2>
          <p className="text-mist max-w-2xl mt-4 font-body text-base">
            Verified field records of uncrewed autonomous dives executed in the deepest hadopelagic trenches on Earth.
          </p>
        </Reveal>

        {/* Dossier Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 border-b border-glass pb-4">
          {DOSSIERS.map((d, index) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDossier(index)}
              className={`bat-btn text-xs py-2 px-4 rounded ${
                activeDossier === index
                  ? "bg-cyan text-trench font-bold"
                  : "bg-navy/70 text-mist border border-glass hover:border-slate"
              }`}
            >
              {d.trench.split(",")[0]}
            </button>
          ))}
        </div>

        {/* Active Mission Dossier Card */}
        <div className="bg-navy border border-glass rounded-xl p-6 sm:p-10 relative overflow-hidden">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass pb-6 mb-8">
            <div>
              <span className="bat-mono text-xs text-cyan uppercase tracking-wider font-bold">
                {current.trench}
              </span>
              <h3 className="bat-display text-2xl sm:text-4xl font-bold uppercase text-titanium mt-1">
                {current.title}
              </h3>
            </div>
            <div className="text-left sm:text-right bat-mono">
              <span className="text-slate text-xs uppercase block">Coordinates</span>
              <span className="text-amber font-bold text-sm">{current.coordinates}</span>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Max Depth Logged</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-titanium mt-1 block">
                {current.depth}
              </span>
            </div>
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Hydrostatic Peak Load</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-cyan mt-1 block">
                {current.pressure}
              </span>
            </div>
            <div className="bg-glass/40 p-4 rounded-lg border border-glass">
              <span className="bat-mono text-xs text-slate uppercase block">Mission Duration</span>
              <span className="bat-mono text-2xl sm:text-3xl font-bold text-titanium mt-1 block">
                {current.hours}
              </span>
            </div>
          </div>

          {/* Mission Achievements */}
          <div>
            <h4 className="bat-mono text-xs uppercase tracking-wider text-slate mb-3">
              Operational Deliverables &amp; Scientific Outcomes
            </h4>
            <ul className="space-y-2.5">
              {current.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-mist font-body">
                  <span className="text-cyan font-bold mt-0.5">▶</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(bathys)/bathys/sonar/SonarRadar.tsx">
<![CDATA["use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "../descent/store";
import { useReducedMotion } from "../motion/useReducedMotion";

export function SonarRadar({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [pingPulse, setPingPulse] = useState(0);

  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const reduced = useReducedMotion();

  // Track visibility to pause rAF when out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Canvas radar animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Adjust sweep speed based on depth
      const speed = depth >= 6000 ? 1.8 : 1.2;
      angle = (angle + speed * dt) % (Math.PI * 2);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) - 10;

      // Clear with slight trail retention
      ctx.fillStyle = "rgba(3, 7, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Outer bounding ring
      ctx.strokeStyle = "#122338";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Range rings (25%, 50%, 75%)
      ctx.strokeStyle = "#122338";
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach((factor) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs
      ctx.strokeStyle = "rgba(84, 110, 138, 0.3)";
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sweep gradient sector (trailing 40 degrees)
      const trailAngle = 0.6;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - trailAngle, angle);
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 229, 255, 0.4)");
      grad.addColorStop(0.7, "rgba(0, 229, 255, 0.15)");
      grad.addColorStop(1, "rgba(0, 229, 255, 0.0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Leading beam line
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
      ctx.restore();

      // Center emitter dot
      ctx.fillStyle = "#00E5FF";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // If depth >= 6000m, draw benthic trench echo targets
      if (depth >= 6000) {
        ctx.fillStyle = "#FF9E1B";
        // Fixed mock targets reflecting off trench wall
        const targets = [
          { r: 0.65, theta: 1.2 },
          { r: 0.82, theta: 3.4 },
          { r: 0.45, theta: 5.1 },
        ];
        targets.forEach((t) => {
          const tx = cx + Math.cos(t.theta) * (radius * t.r);
          const ty = cy + Math.sin(t.theta) * (radius * t.r);
          // Highlight when sweep beam is near
          const diff = Math.abs((angle % (Math.PI * 2)) - t.theta);
          const isHit = diff < 0.25 || diff > Math.PI * 2 - 0.25;

          ctx.beginPath();
          ctx.arc(tx, ty, isHit ? 5 : 3, 0, Math.PI * 2);
          ctx.fill();

          if (isHit) {
            ctx.strokeStyle = "rgba(255, 158, 27, 0.5)";
            ctx.strokeRect(tx - 8, ty - 8, 16, 16);
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [inView, reduced, depth]);

  const handlePing = () => {
    setPingPulse((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center bg-navy/90 border border-glass rounded-lg p-5 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="bat-mono text-xs text-titanium uppercase tracking-wider font-bold">
            Multibeam Acoustic Radar
          </span>
        </div>
        <span className="bat-mono text-[11px] text-mist">
          {depth >= 6000 ? "120 kHz HADAL CHIRP" : "12 kHz WIDE BEAM"}
        </span>
      </div>

      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden bg-trench border border-glass flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full"
          aria-label="Acoustic Sonar Radar Canvas"
        />

        {/* Pulse effect overlay */}
        {pingPulse > 0 && (
          <div
            key={pingPulse}
            className="absolute inset-0 rounded-full border-2 border-cyan animate-ping pointer-events-none"
            style={{ animationDuration: "1s" }}
          />
        )}
      </div>

      <div className="flex items-center justify-between w-full mt-4 gap-3">
        <button
          type="button"
          onClick={handlePing}
          className="bat-btn bat-btn-outline text-xs py-2 px-4 flex-1"
        >
          Transmit Ping
        </button>
        <div className="text-right bat-mono text-[11px] text-slate">
          <span>Range: {depth >= 6000 ? "5,000 M" : "12,000 M"}</span>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
  </files>
</template>
