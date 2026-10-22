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

.bat-bob {
  transform-origin: 50% 40%;
  animation: bat-bob 7s var(--ease-in-out) infinite alternate;
}

.bat-ping {
  transform-box: fill-box;
  transform-origin: center;
  opacity: 0;
  animation: bat-ping 4.2s var(--ease-out) infinite;
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

@keyframes bat-bob {
  from { transform: translate3d(0, 0, 0) rotate(-0.6deg); }
  to   { transform: translate3d(0, -14px, 0) rotate(0.6deg); }
}

@keyframes bat-ping {
  0%   { transform: scale(0.5); opacity: 0.55; }
  100% { transform: scale(9); opacity: 0; }
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
  .bat-bob,
  .bat-ray,
  .bat-wave,
  .bat-strobe {
    animation: none !important;
  }

  .bat-strobe {
    opacity: 0.8;
  }

  .bat-ping {
    display: none;
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
            ? "color-mix(in srgb, var(--color-trench) 88%, transparent)"
            : "color-mix(in srgb, var(--color-navy) 84%, transparent)",
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
 * Hero background: a sunlit surface above, a titanium hadal submersible
 * descending through the water column with floodlight beams and a sonar ping.
 * Pure SVG + CSS, decorative only. Motion is CSS-driven and switched off by
 * the reduced-motion block in bathys.css.
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

// Equatorial flange bolts on the near face of the pressure sphere.
const BOLTS = Array.from({ length: 13 }, (_, i) => {
  const t = (i / 12) * Math.PI;
  return { x: 250 + 84 * Math.cos(t), y: 300 + 14 * Math.sin(t) };
});

const TRANSDUCERS = Array.from({ length: 9 }, (_, i) => 212 + i * 9.5);

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sunlit surface glow + drifting light shafts that die off with depth */}
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

      {/* Submersible */}
      <div className="absolute -right-[38%] top-[38%] w-[118%] opacity-25 md:-right-[18%] md:top-[22%] md:w-[78%] md:opacity-45 lg:-right-[4%] lg:top-[8%] lg:w-[42%] lg:opacity-100 xl:right-0 xl:w-[46%] xl:max-w-[640px]">
        <div className="bat-bob">
          <svg viewBox="0 0 680 780" className="h-auto w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="bat-hs-foam" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" style={{ stopColor: "var(--color-glass)" }} />
                <stop offset="0.45" style={{ stopColor: "var(--color-navy)" }} />
                <stop offset="1" style={{ stopColor: "var(--color-glass)" }} />
              </linearGradient>
              <radialGradient id="bat-hs-sphere" cx="0.36" cy="0.28" r="0.85">
                <stop offset="0" style={{ stopColor: "var(--color-titanium)", stopOpacity: 0.95 }} />
                <stop offset="0.35" style={{ stopColor: "var(--color-mist)", stopOpacity: 0.85 }} />
                <stop offset="0.8" style={{ stopColor: "var(--color-slate)" }} />
                <stop offset="1" style={{ stopColor: "var(--color-glass)" }} />
              </radialGradient>
              <radialGradient id="bat-hs-port" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" style={{ stopColor: "var(--color-cyan)", stopOpacity: 0.95 }} />
                <stop offset="0.6" style={{ stopColor: "var(--color-cyan)", stopOpacity: 0.3 }} />
                <stop offset="1" style={{ stopColor: "var(--color-navy)", stopOpacity: 0.95 }} />
              </radialGradient>
              <linearGradient id="bat-hs-beam" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--color-titanium)", stopOpacity: 0.55 }} />
                <stop offset="0.55" style={{ stopColor: "var(--color-mist)", stopOpacity: 0.12 }} />
                <stop offset="1" style={{ stopColor: "var(--color-mist)", stopOpacity: 0 }} />
              </linearGradient>
              <linearGradient id="bat-hs-fan" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--color-cyan)", stopOpacity: 0.28 }} />
                <stop offset="1" style={{ stopColor: "var(--color-cyan)", stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            {/* Sonar pings radiating from the pressure sphere */}
            {[0, 1.4, 2.8].map((d) => (
              <circle
                key={d}
                cx="250"
                cy="300"
                r="40"
                className="bat-ping stroke-cyan"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${d}s` }}
              />
            ))}

            {/* Light cones */}
            <g style={{ mixBlendMode: "screen" }}>
              <polygon points="168,408 188,408 70,760 236,760" fill="url(#bat-hs-beam)" />
              <polygon points="312,408 332,408 264,760 430,760" fill="url(#bat-hs-beam)" />
              <polygon points="240,420 260,420 340,760 160,760" fill="url(#bat-hs-fan)" />
            </g>

            {/* Antenna + strobe */}
            <line x1="250" y1="80" x2="250" y2="34" className="stroke-mist" strokeWidth="1.5" />
            <circle cx="250" cy="28" r="10" className="bat-strobe fill-amber" fillOpacity="0.25" />
            <circle cx="250" cy="28" r="4.5" className="bat-strobe fill-amber" />

            {/* Thruster pods + struts */}
            <g className="stroke-slate" strokeWidth="1.5">
              <line x1="148" y1="263" x2="172" y2="263" strokeWidth="6" />
              <line x1="328" y1="263" x2="352" y2="263" strokeWidth="6" />
              <rect x="70" y="244" width="80" height="38" rx="17" className="fill-glass" />
              <rect x="350" y="244" width="80" height="38" rx="17" className="fill-glass" />
              <line x1="88" y1="246" x2="88" y2="280" />
              <line x1="132" y1="246" x2="132" y2="280" />
              <line x1="368" y1="246" x2="368" y2="280" />
              <line x1="412" y1="246" x2="412" y2="280" />
            </g>
            <circle cx="80" cy="263" r="3" className="fill-cyan" fillOpacity="0.8" />
            <circle cx="420" cy="263" r="3" className="fill-cyan" fillOpacity="0.8" />

            {/* Syntactic foam fairing */}
            <path
              d="M150 252 L150 150 Q150 94 204 94 L296 94 Q350 94 350 150 L350 252 Z"
              fill="url(#bat-hs-foam)"
              className="stroke-slate"
              strokeWidth="1.5"
            />
            <rect x="232" y="78" width="36" height="16" rx="4" className="fill-navy stroke-mist" strokeWidth="1.5" />
            <g className="stroke-slate" strokeWidth="1" strokeOpacity="0.7">
              <line x1="150" y1="138" x2="350" y2="138" />
              <line x1="150" y1="188" x2="350" y2="188" />
              <line x1="250" y1="94" x2="250" y2="216" />
            </g>
            <text x="164" y="168" className="fill-mist" fontFamily="var(--font-share-mono, monospace)" fontSize="13" letterSpacing="2.4">
              BATHYS
            </text>
            <text x="164" y="212" className="fill-slate" fontFamily="var(--font-share-mono, monospace)" fontSize="11" letterSpacing="2">
              H-11
            </text>

            {/* Landing skids + ballast */}
            <g className="stroke-mist" strokeWidth="4" strokeLinecap="round">
              <line x1="196" y1="372" x2="158" y2="448" />
              <line x1="304" y1="372" x2="342" y2="448" />
            </g>
            <line x1="122" y1="452" x2="378" y2="452" className="stroke-slate" strokeWidth="6" strokeLinecap="round" />
            <rect x="140" y="424" width="26" height="20" rx="3" className="fill-trench stroke-slate" strokeWidth="1.5" />
            <rect x="334" y="424" width="26" height="20" rx="3" className="fill-trench stroke-slate" strokeWidth="1.5" />

            {/* Instrument tray: multibeam transducer + floodlights */}
            <rect x="186" y="384" width="128" height="34" rx="6" className="fill-navy stroke-slate" strokeWidth="1.5" />
            {TRANSDUCERS.map((x) => (
              <rect key={x} x={x} y="404" width="5" height="9" rx="1" className="fill-cyan" fillOpacity="0.75" />
            ))}
            <rect x="158" y="392" width="34" height="18" rx="4" className="fill-glass stroke-mist" strokeWidth="1.5" />
            <rect x="308" y="392" width="34" height="18" rx="4" className="fill-glass stroke-mist" strokeWidth="1.5" />
            <ellipse cx="175" cy="410" rx="9" ry="3.5" className="fill-titanium" />
            <ellipse cx="325" cy="410" rx="9" ry="3.5" className="fill-titanium" />

            {/* Manipulator arm */}
            <g className="stroke-mist" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="206,418 186,452 150,472 134,506" />
              <polyline points="134,506 124,520" strokeWidth="2.5" />
              <polyline points="134,506 146,518" strokeWidth="2.5" />
            </g>
            <circle cx="186" cy="452" r="5" className="fill-glass stroke-mist" strokeWidth="2" />
            <circle cx="150" cy="472" r="5" className="fill-glass stroke-mist" strokeWidth="2" />

            {/* Titanium pressure sphere */}
            <circle cx="250" cy="300" r="84" fill="url(#bat-hs-sphere)" className="stroke-mist" strokeWidth="1.5" />
            <ellipse cx="250" cy="300" rx="84" ry="14" className="stroke-slate" strokeWidth="1.5" />
            {BOLTS.map((b) => (
              <circle key={b.x} cx={b.x} cy={b.y} r="1.8" className="fill-trench" />
            ))}
            <circle cx="250" cy="300" r="31" className="stroke-mist" strokeWidth="3.5" fill="url(#bat-hs-port)" />
            <circle cx="250" cy="300" r="22" className="stroke-titanium" strokeOpacity="0.35" strokeWidth="1" />
            <path d="M232 288 Q244 278 260 281" className="stroke-titanium" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />

            {/* Annotation callouts (wide screens only) */}
            <g className="hidden xl:block" fontFamily="var(--font-share-mono, monospace)" fontSize="11" letterSpacing="1.4">
              <g className="stroke-mist" strokeOpacity="0.5" strokeWidth="1">
                <polyline points="338,140 372,140 392,120 456,120" />
                <polyline points="332,318 392,318 456,318" />
                <polyline points="342,401 376,401 396,440 456,440" />
                <polyline points="296,411 296,470 456,470" />
              </g>
              <g className="fill-cyan">
                <circle cx="338" cy="140" r="2.5" />
                <circle cx="332" cy="318" r="2.5" />
                <circle cx="342" cy="401" r="2.5" />
                <circle cx="296" cy="411" r="2.5" />
              </g>
              <g className="fill-mist">
                <text x="464" y="117">SYNTACTIC FOAM FAIRING</text>
                <text x="464" y="315">TI-6AL-4V PRESSURE SPHERE</text>
                <text x="464" y="437">COLD-WHITE FLOODLIGHTS</text>
                <text x="464" y="467">MULTIBEAM TRANSDUCER</text>
              </g>
              <g className="fill-slate">
                <text x="464" y="133">0.54 G/CM³</text>
                <text x="464" y="331">Ø 1,800 MM · 64 MM WALL</text>
                <text x="464" y="453">2 × FORWARD ARRAY</text>
                <text x="464" y="483">SYNTHETIC APERTURE</text>
              </g>
            </g>
          </svg>
        </div>
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
