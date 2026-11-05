<template slug="kinetic" name="KINETIC">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(kinetic)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { MOTION_SCRIPT } from "./kinetic/motion/mode";
import "./kinetic/kinetic.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KINETIC — Megamarket drops, packed by robots, delivered by hand",
  description:
    "An autonomous mega-marketplace combining instant consumer flash drops with a real-time 3D delivery journey. Follow Unit 104 as it rolls from the origin fulfillment gate to your doorstep in 24 minutes flat.",
  icons: {
    icon: "/templates/kinetic/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function KineticLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="kn-body">
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/kinetic";

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

/**
 * A responsive <picture>, or a soft labelled placeholder until the image is generated.
 */
export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 40vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`kn-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="kn-placeholder-mono">{assetKey}.png</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
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

export function hasAsset(key: string): boolean {
  return key in ASSETS;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/icon.svg">
<![CDATA[<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="60" height="60" rx="18" fill="#1B1522" />
  <path d="M20 18V46" stroke="#FAF7F2" stroke-width="4.5" stroke-linecap="round" />
  <path d="M42 20L26 33L44 46" stroke="#FF6B2B" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="38" cy="20" r="3.5" fill="#00D4B2" />
</svg>
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/kinetic.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-paper: #FAF7F2;
  --color-ink: #1B1522;
  --color-accent: #FF6B2B;
  --color-apricot: #FFE6D2;
  --color-mint: #00D4B2;
  --color-carbon: #2A1E30;
  --color-steel: #8E8294;

  --font-display: var(--font-bricolage), system-ui, -apple-system, sans-serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: linear(0, 0.4 9%, 0.86 22%, 1.04 33%, 1.01 46%, 0.995 62%, 1);

  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 850ms;
  --dur-hero: 1200ms;

  --reveal-shift: 28px;
  --stagger: 75ms;
}

:root {
  --canvas: #FAF7F2;
  --surface: #FAF7F2;
  --surface-alt: #FFE6D2;
  --surface-nested: color-mix(in srgb, #FAF7F2 90%, #1B1522);

  --text: #1B1522;
  --text-secondary: color-mix(in srgb, #1B1522 75%, transparent);
  --text-muted: #8E8294;
  --text-faint: color-mix(in srgb, #8E8294 65%, transparent);
  --text-on-brand: #FAF7F2;
  --text-on-deep: #FAF7F2;
  --text-on-accent: #FAF7F2;

  --border: color-mix(in srgb, #8E8294 25%, transparent);
  --border-strong: color-mix(in srgb, #8E8294 45%, transparent);
  --divider: color-mix(in srgb, #8E8294 15%, transparent);

  --brand-deep: #1B1522;
  --brand-route: #FF6B2B;
  --brand-route-hover: color-mix(in srgb, #FF6B2B 85%, #1B1522);
  --brand-route-pressed: color-mix(in srgb, #FF6B2B 70%, #1B1522);
  --brand-route-soft: #FFE6D2;
  --accent: #FF6B2B;
  --accent-hover: color-mix(in srgb, #FF6B2B 85%, #1B1522);
  --accent-pressed: color-mix(in srgb, #FF6B2B 70%, #1B1522);
  --accent-soft: #FFE6D2;
  --brand-cyan: #00D4B2;
  --brand-cyan-soft: color-mix(in srgb, #00D4B2 15%, #FAF7F2);

  --success: #00D4B2;
  --success-soft: color-mix(in srgb, #00D4B2 15%, #FAF7F2);
  --success-border: color-mix(in srgb, #00D4B2 35%, transparent);
  --warning: #FF6B2B;
  --warning-highlight: #FF6B2B;
  --warning-soft: #FFE6D2;
  --warning-border: color-mix(in srgb, #FF6B2B 35%, transparent);
  --danger: #FF6B2B;
  --danger-soft: #FFE6D2;
  --danger-border: color-mix(in srgb, #FF6B2B 35%, transparent);
  --neutral-status: #8E8294;
  --neutral-status-soft: color-mix(in srgb, #8E8294 15%, #FAF7F2);
  --neutral-status-border: color-mix(in srgb, #8E8294 30%, transparent);

  --font-roboto-mono: var(--font-jetbrains), ui-monospace, monospace;
  --font-ui: var(--font-inter), system-ui, -apple-system, sans-serif;
  --font-display: var(--font-bricolage), system-ui, -apple-system, sans-serif;

  --shadow-low: 0 1px 3px rgba(27, 21, 34, 0.06);
  --shadow-panel: 0 6px 18px -12px rgba(27, 21, 34, 0.22);
}

/* Base resets & typography */
html {
  background-color: var(--canvas);
  color: var(--text);
  font-family: var(--font-ui);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

body.kn-body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--canvas);
  color: var(--text);
  overflow-x: clip;
}

/* Halftone Warm Background Texture */
.landing-warm {
  isolation: isolate;
}

.landing-warm::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(circle at center, color-mix(in srgb, var(--accent) 34%, transparent) 1.3px, transparent 1.9px);
  background-size: 14px 14px;
  -webkit-mask-image:
    radial-gradient(ellipse 55% 700px at 100% 0%, black 0%, transparent 72%),
    radial-gradient(ellipse 45% 620px at 0% 46%, black 0%, transparent 72%),
    radial-gradient(ellipse 55% 700px at 100% 100%, black 0%, transparent 72%);
  mask-image:
    radial-gradient(ellipse 55% 700px at 100% 0%, black 0%, transparent 72%),
    radial-gradient(ellipse 45% 620px at 0% 46%, black 0%, transparent 72%),
    radial-gradient(ellipse 55% 700px at 100% 100%, black 0%, transparent 72%);
}

.kn-wrap {
  width: 100%;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(16px, 4vw, 48px);
  padding-right: clamp(16px, 4vw, 48px);
}


/* ==================================================================
   FLASHLIGHT (CURSOR TRAIL)
   ================================================================== */

/* Orange paint trail for the landing page. Above the sticky nav (z-50) and page content,
   below the cookie notice (z-1000); pointer-events: none so it never blocks a click. */
.flashlightTrail {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 60;
  pointer-events: none;
}

/* Night Route: additive light on dark surfaces. */
:where(html[data-theme="dark"]) .flashlightTrail {
  mix-blend-mode: screen;
}

/* No cursor to follow on touch, and no moving trail for reduced-motion users. */
@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .flashlightTrail {
    display: none;
  }
}


/* ==================================================================
   JOURNEY (3D BACKGROUND ENGINE STAGE)
   ================================================================== */

/*
 * Delivery journey layers.
 *
 * Stacking (inside the landing root, which is `isolation: isolate`):
 *   stage (fixed, z 0): painted fallback sky, WebGL canvas on top of it
 *   page content: positioned after the stage in DOM order, so it paints above
 *
 * No ancestor of the stage may gain a transform/filter (that would re-parent
 * the fixed layer). Content "plates" frost the scene behind reading areas.
 */

.journeyStage {
  position: fixed;
  inset: 0;
  height: 100lvh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.journeyCanvasHost {
  position: absolute;
  inset: 0;
}

.journeyCanvas {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1400ms var(--ease-out, ease-out);
}

:where([data-journey="live"]) .journeyCanvas {
  opacity: 1;
}

/* Painted dawn sky + horizon: shown before WebGL starts, without WebGL,
   and with scripting off. Tuned to the scene's opening colors so the
   crossfade into the canvas is seamless. */
.journeyFallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 38% at 78% 64%, rgba(255, 196, 140, 0.55), transparent 70%),
    linear-gradient(to bottom, #FAF7F2 0%, #FFE6D2 45%, #8E8294 61%, #2A1E30 100%);
}

:where(html[data-theme="dark"]) .journeyFallback {
  background:
    radial-gradient(ellipse 50% 30% at 78% 64%, rgba(255, 170, 90, 0.18), transparent 70%),
    linear-gradient(to bottom, #1B1522 0%, #2A1E30 40%, #1B1522 100%);
}

/* Solid footer plate, feathered only at the top. */
.journeyFooterPlate {
  position: relative;
}

.journeyFooterPlate > * {
  position: relative;
}

.journeyFooterPlate::before {
  content: "";
  position: absolute;
  inset: -60px 0 0;
  pointer-events: none;
  background: color-mix(in srgb, var(--canvas) 90%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 60px);
  mask-image: linear-gradient(to bottom, transparent 0, black 60px);
}

.arrival {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 16px;
  padding: 6px 12px 6px 9px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface-alt);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition:
    color 400ms var(--ease-out, ease-out),
    border-color 400ms var(--ease-out, ease-out),
    background-color 400ms var(--ease-out, ease-out);
}

.arrivalDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
  animation: blip 1.6s ease-in-out infinite;
}

.arrival[data-arrived="true"] {
  color: var(--success);
  border-color: var(--success-border);
  background: var(--success-soft);
}

.arrival[data-arrived="true"] .arrivalDot {
  background: var(--success);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--success) 25%, transparent);
  animation: none;
}

@keyframes blip {
  50% {
    opacity: 0.35;
  }
}

/* ------------------------------------------------------------------ */
/* Nav telemetry                                                       */
/* ------------------------------------------------------------------ */

.telemetry {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.navPill {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  display: none;
  align-items: center;
  gap: 10px;
  padding: 7px 14px 7px 11px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  opacity: 0;
  transition: opacity 600ms var(--ease-out, ease-out);
}

.telemetry[data-live="true"] .navPill {
  opacity: 1;
}

.navPillDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: blip 1.6s ease-in-out infinite;
}

.telemetry[data-arrived="true"] .navPillDot {
  background: var(--success);
  animation: none;
}

.navPillStage {
  color: var(--text);
}

@media (min-width: 1100px) {
  .navPill {
    display: inline-flex;
  }
}

.routeLine {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: transparent;
  opacity: 0;
  transition: opacity 600ms var(--ease-out, ease-out);
}

.telemetry[data-live="true"] .routeLine {
  opacity: 1;
}

.routeFill {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 40%, transparent), var(--accent));
  transform: scaleX(0);
  transform-origin: left;
}

.routeTick {
  position: absolute;
  top: -2px;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: var(--canvas);
  border: 1.5px solid var(--accent);
}

.routeTruck {
  position: absolute;
  bottom: 3px;
  left: 0;
  translate: -50% 0;
  color: var(--accent);
  line-height: 0;
}

.routeTruck svg {
  fill: currentColor;
}

/* ------------------------------------------------------------------ */
/* Responsive + motion preferences                                      */
/* ------------------------------------------------------------------ */

@media (prefers-reduced-motion: reduce) {
  .journeyCanvas {
    transition: none;
  }

  .arrivalDot,
  .navPillDot {
    animation: none;
  }
}


/* ==================================================================
   PRESENTATION (PINNED CHAPTER STAGES & INTERACTIVE DEMOS)
   ================================================================== */

/*
 * Landing presentation: five pinned scenes over the 3D journey.
 *
 * Layers: the WebGL world (fixed, behind) -> truck tag / connector (fixed,
 * z 0, painted before the page) -> the presentation stage (in flow, sticky).
 * Each stage is one composed frame; beats inside it cross-fade in place.
 *
 * Without scripting, or on very short screens, stages flow as ordinary
 * sections and every beat is shown (see the end of the file).
 */

html:has(.kn-body) {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.chapter {
  --nav-h: 72px;
  position: relative;
  height: 100svh;
  min-height: 100svh;
  max-height: 100svh;
  scroll-margin-top: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.presentationStage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--nav-h);
  box-sizing: border-box;
  overflow: hidden;
}

.frame {
  position: relative;
  height: 100%;
  width: min(1240px, calc(100% - 64px));
  margin-inline: auto;
}

/*
 * Soft legibility wash behind text that sits on the scene. One fixed layer
 * for the whole viewport (see SceneScrim): washes cross-fade between beats
 * instead of ending at a stage's edge.
 */
.sceneScrim {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 900ms var(--ease-in-out);
}

.scrim[data-on="true"] {
  opacity: 1;
}

.scrim[data-scrim="left"] {
  background: radial-gradient(
    ellipse 52% 78% at 14% 54%,
    color-mix(in srgb, var(--canvas) 82%, transparent) 0%,
    color-mix(in srgb, var(--canvas) 52%, transparent) 46%,
    transparent 74%
  );
}

.scrim[data-scrim="left-wide"] {
  background: radial-gradient(
    ellipse 64% 92% at 18% 50%,
    color-mix(in srgb, var(--canvas) 84%, transparent) 0%,
    color-mix(in srgb, var(--canvas) 58%, transparent) 50%,
    transparent 78%
  );
}

.scrim[data-scrim="column-left"] {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--canvas) 84%, transparent) 0%,
    color-mix(in srgb, var(--canvas) 62%, transparent) 30%,
    transparent 52%
  );
}

.scrim[data-scrim="right-top"] {
  background:
    radial-gradient(ellipse 46% 44% at 14% 14%, color-mix(in srgb, var(--canvas) 86%, transparent) 0%, transparent 76%),
    radial-gradient(ellipse 42% 70% at 86% 52%, color-mix(in srgb, var(--canvas) 80%, transparent) 0%, transparent 74%);
}

.scrim[data-scrim="top"] {
  background: radial-gradient(
    ellipse 70% 58% at 50% 20%,
    color-mix(in srgb, var(--canvas) 84%, transparent) 0%,
    color-mix(in srgb, var(--canvas) 50%, transparent) 52%,
    transparent 78%
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                                  */
/* ------------------------------------------------------------------ */

.label {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.labelNum {
  color: var(--accent);
  font-weight: 800;
}

.labelRule {
  width: 26px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.labelName {
  color: var(--text);
}

.labelMeta {
  color: var(--text-muted);
  font-weight: 600;
  letter-spacing: 0.08em;
}

.labelMeta::before {
  content: "·";
  margin-right: 10px;
  color: var(--text-muted);
}

.display {
  margin: 20px 0 22px;
  max-width: 11.2ch;
  font-size: clamp(48px, 6.1vw, 92px);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.052em;
  color: var(--brand-deep);
  text-wrap: balance;
}

.title {
  margin: 14px 0 14px;
  max-width: 14ch;
  font-size: clamp(34px, 3.7vw, 56px);
  font-weight: 800;
  line-height: 0.99;
  letter-spacing: -0.045em;
  color: var(--brand-deep);
  text-wrap: balance;
}

:where(html[data-theme="dark"]) .display,
:where(html[data-theme="dark"]) .title,
:where(html[data-theme="dark"]) .finaleTitle {
  color: var(--text);
}

.lead {
  margin: 0;
  max-width: 40ch;
  font-size: 18px;
  line-height: 1.55;
  color: var(--text-secondary);
}

.beatTitle {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: var(--text);
}

.beatBody {
  margin: 0 0 18px;
  max-width: 42ch;
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ------------------------------------------------------------------ */
/* Actions                                                               */
/* ------------------------------------------------------------------ */

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.actionsCenter {
  justify-content: center;
}

.primary,
.secondary {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 160ms var(--ease-out),
    box-shadow 160ms var(--ease-out),
    background-color 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.primary {
  border: 1px solid var(--accent);
  background: var(--accent);
  color: var(--text-on-accent);
  box-shadow: 0 12px 28px -12px color-mix(in srgb, var(--accent) 80%, transparent);
}

.primary:hover {
  transform: translateY(-2px);
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.primaryIcon {
  transition: transform 200ms var(--ease-out);
}

.primary:hover .primaryIcon {
  transform: translateX(3px);
}

.secondary {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  color: var(--text);
}

.secondary:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
}

.primary:focus-visible,
.secondary:focus-visible,
.tab:focus-visible,
.railLink:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ------------------------------------------------------------------ */
/* Beats                                                                 */
/* ------------------------------------------------------------------ */

.beat {
  opacity: 0;
  transform: translate3d(0, 14px, 0);
  pointer-events: none;
  transition:
    opacity 420ms var(--ease-out),
    transform 560ms var(--ease-out);
}

.beat[data-active="true"] {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

/* Scrolling back up: beats arrive from above, mirroring the way down. */
:where(html[data-story-dir="up"]) .beat:not([data-active="true"]) {
  transform: translate3d(0, -14px, 0);
}

.beatLines {
  display: grid;
}

.beatLines > * {
  grid-area: 1 / 1;
  margin: 0;
  max-width: 44ch;
  font-size: 17px;
  line-height: 1.55;
  color: var(--text-secondary);
}

/* ------------------------------------------------------------------ */
/* Scenes                                                                */
/* ------------------------------------------------------------------ */

.head {
  display: grid;
}

/* 01: one statement, left third, vertically centered. */
.departCopy {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-52%);
  max-width: 660px;
}

.cue {
  position: absolute;
  left: 50%;
  bottom: 22px;
  translate: -50% 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.cue::after {
  content: "";
  width: 1.5px;
  height: 36px;
  border-radius: 2px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  transform-origin: top;
  animation: cue 2.2s var(--ease-in-out) infinite;
}

@keyframes cue {
  0% {
    transform: scaleY(0);
    opacity: 1;
  }
  60% {
    transform: scaleY(1);
    opacity: 1;
  }
  100% {
    transform: scaleY(1);
    opacity: 0;
  }
}

/* 02: headline + the load record stacked on the left, yard on the right. */
.prepareColumn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  gap: 26px;
  width: min(500px, 44%);
}

/* 03: header pinned top-left; each record takes its own corner. */
.connectedHead {
  position: absolute;
  left: 0;
  top: 5.5%;
  max-width: 600px;
}

.connectedHead .title {
  max-width: 16ch;
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 7px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-decoration: none;
  transition:
    background-color 240ms var(--ease-out),
    color 240ms var(--ease-out),
    border-color 240ms var(--ease-out);
}

.tabNum {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  background: var(--surface-alt);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11px;
}

.tab[aria-current="step"] {
  border-color: var(--brand-deep);
  background: var(--brand-deep);
  color: #FAF7F2;
}

.tab[aria-current="step"] .tabNum {
  background: var(--accent);
  color: #FAF7F2;
}

:where(html[data-theme="dark"]) .tab[aria-current="step"] {
  border-color: var(--brand-route);
  background: var(--brand-route);
}

.connectedBeats {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.connectedBeats > .beat {
  position: absolute;
  width: min(430px, 40%);
}

.connectedBeats > .beat[data-side="left"] {
  left: 0;
  bottom: 6%;
}

.connectedBeats > .beat[data-side="right"] {
  right: 0;
  top: 30%;
}

/* 04: a large dashboard fills the left 60%, the aerial frames the truck right. */
.workspaceColumn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  gap: 20px;
  width: min(780px, 62%);
}

.workspaceColumn .title {
  max-width: 18ch;
}

/* 05: closeout on the left, then the finale centered above the docked truck. */
.arriveBeats {
  position: absolute;
  inset: 0;
}

.closeout {
  position: absolute;
  left: 0;
  top: 50%;
  display: grid;
  gap: 24px;
  width: min(500px, 44%);
  transform: translate3d(0, calc(-50% + 14px), 0);
}

.closeout[data-active="true"] {
  transform: translate3d(0, -50%, 0);
}

:where(html[data-story-dir="up"]) .closeout:not([data-active="true"]) {
  transform: translate3d(0, calc(-50% - 14px), 0);
}

.finale {
  position: absolute;
  left: 50%;
  top: 7%;
  width: min(900px, 100%);
  text-align: center;
  transform: translate3d(-50%, 14px, 0);
}

.finale[data-active="true"] {
  transform: translate3d(-50%, 0, 0);
}

:where(html[data-story-dir="up"]) .finale:not([data-active="true"]) {
  transform: translate3d(-50%, -14px, 0);
}

.finaleTitle {
  margin: 18px auto 16px;
  max-width: 19ch;
  font-size: clamp(38px, 4.6vw, 68px);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.048em;
  color: var(--brand-deep);
  text-wrap: balance;
}

.finaleLead {
  margin: 0 auto;
  max-width: 48ch;
  font-size: 18px;
  line-height: 1.55;
  color: var(--text-secondary);
}

.finale .actions {
  margin-top: 26px;
}

/* ------------------------------------------------------------------ */
/* Demonstrations                                                        */
/* ------------------------------------------------------------------ */

.card {
  margin: 0;
  padding: 20px 22px 16px;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  border-radius: 18px;
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  backdrop-filter: blur(18px) saturate(1.2);
  box-shadow:
    0 30px 70px -30px rgba(16, 38, 61, 0.42),
    0 2px 6px rgba(16, 38, 61, 0.06);
  color: var(--text);
  text-align: left;
}

:where(html[data-theme="dark"]) .card {
  box-shadow:
    0 30px 70px -30px rgba(0, 0, 0, 0.7),
    0 2px 6px rgba(0, 0, 0, 0.3);
}

.cardHead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.kicker {
  display: block;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.cardTitle {
  display: block;
  margin-top: 3px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cardFoot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 14px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--divider, var(--border));
}

.footItem {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: var(--text-secondary);
}

.illustrative {
  margin-left: auto;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text-muted);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition:
    background-color 360ms var(--ease-out),
    color 360ms var(--ease-out),
    border-color 360ms var(--ease-out);
}

.pill[data-tone="ok"] {
  border-color: var(--success-border);
  background: var(--success-soft);
  color: var(--success);
}

.pill[data-tone="warn"] {
  border-color: var(--warning-border);
  background: var(--warning-soft);
  color: var(--warning);
}

.pill[data-tone="info"] {
  border-color: color-mix(in srgb, var(--brand-route) 30%, transparent);
  background: var(--brand-route-soft);
  color: var(--brand-route);
}

.pill[data-tone="muted"] {
  border-color: var(--border);
  background: var(--surface-alt);
  color: var(--text-secondary);
}

.unit {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 6px;
  background: var(--accent);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-weight: 800;
  color: var(--text-on-accent);
}

.mono {
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
}

.via {
  margin-left: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.alignEnd {
  text-align: right;
}

/* Load record */
.lane {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 12px;
  margin: 18px 0 14px;
}

.lane strong {
  display: block;
  margin-top: 4px;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.laneLine {
  display: grid;
  width: 64px;
  height: 22px;
  place-items: center;
  color: var(--accent);
  background: linear-gradient(90deg, transparent, var(--border-strong) 20%, var(--border-strong) 80%, transparent) center / 100% 1.5px no-repeat;
}

.laneLine svg {
  padding: 2px;
  border-radius: 50%;
  background: var(--surface);
}

.assign {
  display: grid;
  gap: 4px;
  margin: 0;
}

.assign > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
}

.assign > div[data-highlight="true"] {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
  background: color-mix(in srgb, var(--accent-soft) 80%, transparent);
}

.assign dt {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.assign dd {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
}

/* Entity records */
.recordId {
  display: flex;
  align-items: center;
  gap: 12px;
}

.recordIcon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
}

.owner {
  margin: 14px 0 4px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.docList {
  margin: 0;
  padding: 0;
  list-style: none;
}

.docList li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--divider, var(--border));
}

.docName {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 14.5px;
  font-weight: 600;
}

.docName svg {
  color: var(--text-muted);
}

/* Command center */
.console {
  padding: 0;
  overflow: hidden;
}

.consoleBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--divider, var(--border));
}

.consoleTitle {
  display: block;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.roleSwitch {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-alt);
}

.roleSwitch button {
  padding: 6px 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background-color 360ms var(--ease-out),
    color 360ms var(--ease-out);
}

.roleSwitch button:hover {
  color: var(--text);
}

.roleSwitch button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.roleSwitch button[data-on="true"] {
  background: var(--brand-deep);
  color: #FAF7F2;
  cursor: default;
}

:where(html[data-theme="dark"]) .roleSwitch button[data-on="true"] {
  background: var(--brand-route);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  padding: 14px 20px;
}

.stats > div {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-alt);
}

.stats strong {
  display: flex;
  align-items: center;
  min-height: 30px;
  margin-top: 4px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 21px;
  font-weight: 800;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.table th {
  padding: 9px 12px;
  border-top: 1px solid var(--divider, var(--border));
  border-bottom: 1px solid var(--divider, var(--border));
  background: var(--surface-alt);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
  color: var(--text-muted);
}

.table td {
  padding: 11px 12px;
  border-bottom: 1px solid var(--divider, var(--border));
  white-space: nowrap;
}

.table th:first-child,
.table td:first-child {
  padding-left: 20px;
}

.table th:last-child,
.table td:last-child {
  padding-right: 20px;
}

.table tr[data-focus="true"] td {
  background: color-mix(in srgb, var(--accent-soft) 70%, transparent);
  font-weight: 700;
}

.table tr[data-focus="true"] td:first-child {
  box-shadow: inset 3px 0 0 var(--accent);
}

.num {
  text-align: right !important;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
}

.locked {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  animation: lockIn 420ms var(--ease-out);
}

@keyframes lockIn {
  from {
    opacity: 0;
  }
}

.console .cardFoot {
  margin: 0;
  padding: 11px 20px 13px;
  border-top: 0;
}

/* Closeout */
.steps {
  display: grid;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.steps li {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
  border-top: 1px solid var(--divider, var(--border));
}

.stepIcon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  background: var(--surface-alt);
  color: var(--text-secondary);
}

.stepIcon[data-tone="ok"] {
  background: var(--success-soft);
  color: var(--success);
}

.stepIcon[data-tone="info"] {
  background: var(--brand-route-soft);
  color: var(--brand-route);
}

.stepText strong {
  display: block;
  font-size: 15px;
  font-weight: 700;
}

.stepText span {
  display: block;
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-secondary);
}

/* ------------------------------------------------------------------ */
/* Truck tag, connector, chapter rail                                    */
/* ------------------------------------------------------------------ */

.truckTag {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 320ms var(--ease-out);
  will-change: transform;
}

.truckTag[data-show="true"] {
  opacity: 1;
}

.truckTagInner {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--brand-deep) 92%, transparent);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5);
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
  color: #FAF7F2;
  transform: translate(-50%, calc(-100% - 12px));
}

.truckTagInner::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  width: 1.5px;
  height: 12px;
  background: color-mix(in srgb, var(--brand-deep) 70%, transparent);
}

.truckTagUnit {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--accent);
}

.truckTagStatus {
  color: color-mix(in srgb, #FAF7F2 80%, #1B1522);
}

.connector {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: visible;
  opacity: 0;
  transition: opacity 360ms var(--ease-out);
}

.connector[data-show="true"] {
  opacity: 1;
}

.connector path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.6;
  stroke-dasharray: 4 5;
  stroke-linecap: round;
}

.rail {
  position: fixed;
  right: 22px;
  top: 50%;
  z-index: 40;
  display: none;
  translate: 0 -50%;
}

.rail ol {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.railLink {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 5px 0 5px 8px;
  border-radius: 6px;
  font-family: var(--font-roboto-mono), ui-monospace, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--text-muted);
}

.railLink::after {
  content: "";
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background: var(--border-strong);
  transition:
    width 300ms var(--ease-out),
    background-color 300ms var(--ease-out);
}

.railName {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  transition:
    max-width 300ms var(--ease-out),
    opacity 300ms var(--ease-out);
}

.railLink:hover .railName,
.railLink:focus-visible .railName {
  max-width: 220px;
  opacity: 1;
}

.railLink[aria-current="step"] {
  color: var(--accent);
}

.railLink[aria-current="step"]::after {
  width: 30px;
  background: var(--accent);
}

@media (min-width: 1100px) {
  .rail {
    display: block;
  }
}

/* ------------------------------------------------------------------ */
/* Shorter laptop screens                                                */
/* ------------------------------------------------------------------ */

@media (max-height: 820px) and (min-width: 661px) {
  .display {
    font-size: clamp(44px, 5.4vw, 78px);
  }

  .title {
    font-size: clamp(30px, 3.2vw, 46px);
  }

  .lead,
  .finaleLead {
    font-size: 16.5px;
  }

  .card {
    padding: 16px 18px 12px;
  }

  .lane {
    margin: 12px 0 10px;
  }

  .assign > div {
    padding: 7px 12px;
  }

  .docList li,
  .steps li {
    padding: 8px 0;
  }

  .stats {
    padding: 10px 20px;
  }

  .table td {
    padding: 8px 12px;
  }

  .beatTitle {
    font-size: 21px;
  }

  .beatBody {
    margin-bottom: 12px;
    font-size: 14.5px;
  }
}

/* ------------------------------------------------------------------ */
/* Tablet                                                                */
/* ------------------------------------------------------------------ */

@media (max-width: 980px) and (min-width: 661px) {
  .prepareColumn,
  .closeout {
    width: min(460px, 56%);
  }

  .workspaceColumn {
    width: 100%;
    top: 4%;
    transform: none;
  }

  .connectedBeats > .beat {
    width: min(420px, 56%);
  }

  .hideNarrow {
    display: none;
  }
}

/* ------------------------------------------------------------------ */
/* Phones: text and demo on top, the truck framed in the lower band      */
/* ------------------------------------------------------------------ */

@media (max-width: 660px) {
  .chapter {
    --nav-h: 64px;
  }

  .frame {
    width: calc(100% - 28px);
  }

  .scrim[data-scrim] {
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--canvas) 86%, transparent) 0%,
      color-mix(in srgb, var(--canvas) 70%, transparent) 50%,
      transparent 72%
    );
  }

  .display {
    margin: 14px 0 14px;
    font-size: clamp(38px, 11vw, 50px);
  }

  .title {
    margin: 10px 0 10px;
    font-size: clamp(28px, 8.2vw, 36px);
  }

  .lead,
  .finaleLead,
  .beatLines > * {
    font-size: 15px;
  }

  .departCopy,
  .prepareColumn,
  .workspaceColumn,
  .closeout {
    top: 18px;
    width: 100%;
    transform: none;
  }

  .closeout,
  .closeout[data-active="true"] {
    transform: none;
  }

  :where(html[data-story-dir="up"]) .closeout:not([data-active="true"]) {
    transform: translate3d(0, -14px, 0);
  }

  .prepareColumn,
  .workspaceColumn,
  .closeout {
    gap: 14px;
  }

  .actions {
    flex-direction: column;
    margin-top: 22px;
  }

  .cue {
    display: none;
  }

  .connectedHead {
    top: 14px;
  }

  .tabs {
    margin-top: 2px;
  }

  .connectedBeats > .beat,
  .connectedBeats > .beat[data-side="left"],
  .connectedBeats > .beat[data-side="right"] {
    top: 176px;
    bottom: auto;
    left: 0;
    right: 0;
    width: 100%;
  }

  .beatTitle {
    font-size: 19px;
  }

  .beatBody {
    margin-bottom: 12px;
    font-size: 14px;
  }

  .finale {
    top: 20px;
  }

  .finaleTitle {
    font-size: clamp(30px, 8.6vw, 38px);
  }

  .card {
    padding: 14px 15px 10px;
    border-radius: 16px;
  }

  /* The console's bar, table and footer carry their own insets. */
  .console {
    padding: 0;
  }

  .cardTitle {
    font-size: 18px;
  }

  .lane {
    margin: 12px 0 8px;
  }

  .lane strong {
    font-size: 15px;
  }

  .laneLine {
    width: 36px;
  }

  .assign > div {
    padding: 6px 10px;
  }

  .docList li,
  .steps li {
    padding: 7px 0;
  }

  .recordIcon {
    width: 36px;
    height: 36px;
  }

  .owner {
    margin-top: 8px;
  }

  /* Wrap rather than push the role switch past the card edge on narrow phones. */
  .consoleBar {
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 14px;
  }

  .consoleBar > div:first-child {
    flex: 1 1 0%;
  }

  .roleSwitch button {
    padding: 5px 9px;
    font-size: 12px;
  }

  /* The table carries the story on phones; the stat tiles would push the
     truck out of frame. */
  .stats {
    display: none;
  }

  .stats > div {
    padding: 7px 10px;
  }

  .stats strong {
    min-height: 24px;
    font-size: 17px;
  }

  .table {
    font-size: 12.5px;
  }

  .table td,
  .table th {
    padding: 7px 8px;
  }

  .table th:first-child,
  .table td:first-child {
    padding-left: 14px;
  }

  .table th:last-child,
  .table td:last-child {
    padding-right: 14px;
  }

  .hideNarrow,
  .table th:nth-child(2),
  .table td:nth-child(2) {
    display: none;
  }

  .console .cardFoot {
    padding: 8px 14px 10px;
  }

  .steps li {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 10px;
  }

  .stepIcon {
    width: 32px;
    height: 32px;
  }

  .stepText strong {
    font-size: 14px;
  }

  .stepText span {
    font-size: 12px;
  }

  .footItem {
    font-size: 11.5px;
  }
}

/* ------------------------------------------------------------------ */
/* Motion and scripting fallbacks                                        */
/* ------------------------------------------------------------------ */

@media (prefers-reduced-motion: reduce) {
  .beat,
  .beat[data-active="true"],
  .scrim,
  .truckTag,
  .connector {
    transition: none;
  }

  .beat {
    transform: none;
  }

  .closeout {
    transform: translate3d(0, -50%, 0);
  }

  .finale {
    transform: translate3d(-50%, 0, 0);
  }

  .cue::after,
  .locked {
    animation: none;
  }
}

/*
 * No scripting, reduced motion, or a screen too short to pin a composed frame:
 * every chapter flows as a normal section and every beat is visible in order,
 * so alternate beats (the arrival finale) are never left at opacity 0.
 */
@media (scripting: none), (prefers-reduced-motion: reduce), (max-height: 540px) {
  .chapter {
    height: auto;
  }

  .presentationStage {
    position: relative;
    top: auto;
    height: auto;
    min-height: calc(100svh - var(--nav-h));
    padding: 56px 0 72px;
    overflow: visible;
  }

  .frame {
    height: auto;
  }

  .departCopy,
  .prepareColumn,
  .connectedHead,
  .connectedBeats,
  .connectedBeats > .beat[data-side],
  .workspaceColumn,
  .arriveBeats,
  .closeout,
  .closeout[data-active],
  .finale,
  .finale[data-active] {
    position: relative;
    inset: auto;
    width: auto;
    max-width: 760px;
    transform: none;
  }

  .connectedBeats,
  .arriveBeats {
    display: grid;
    gap: 40px;
    margin-top: 32px;
  }

  .beat,
  :where(html[data-story-dir]) .beat:not([data-active="true"]),
  :where(html[data-story-dir]) .closeout:not([data-active="true"]),
  :where(html[data-story-dir]) .finale:not([data-active="true"]) {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }

  .beatLines {
    gap: 12px;
  }

  .beatLines > * {
    grid-area: auto;
  }

  /* Flowed, the finale sits over the docked-truck still, so give it a readable plate. */
  .finale {
    margin-inline: auto;
    padding: 28px 32px 36px;
    border: 1px solid var(--border);
    border-radius: 28px;
    background: color-mix(in srgb, var(--surface) 90%, transparent);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
  }
}

]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KINETIC. Megamarket drops, packed by robots, delivered by hand.";

const PAPER = "#FAF7F2";
const INK = "#1B1522";
const ACCENT = "#FF6B2B";
const APRICOT = "#FFE6D2";
const MINT = "#00D4B2";
const CARBON = "#2A1E30";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          color: INK,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <rect x="2" y="2" width="60" height="60" rx="18" fill={INK} />
              <path d="M20 18V46" stroke={PAPER} strokeWidth="4.5" strokeLinecap="round" />
              <path d="M42 20L26 33L44 46" stroke={ACCENT} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="38" cy="20" r="3.5" fill={MINT} />
            </svg>
            <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
              kinetic<span style={{ color: ACCENT }}>.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 9999,
              backgroundColor: APRICOT,
              color: INK,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            UNIT 104 · DISPATCHED
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              <span>From One Click</span>
              <span>to Your Hands in 24m.</span>
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 24, color: INK, opacity: 0.8 }}>
              Megamarket drops, packed by robots, delivered by hand.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              borderRadius: 24,
              backgroundColor: CARBON,
              color: PAPER,
              width: 280,
              gap: 12,
            }}
          >
            <div style={{ display: "flex", fontSize: 13, color: MINT, fontWeight: 700 }}>
              ROUTE TELEMETRY
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: ACCENT }}>
              24 MIN
            </div>
            <div style={{ display: "flex", fontSize: 12, opacity: 0.7 }}>
              Chicago DC &rarr; Dallas Dock
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/page.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { CursorFlashlight } from "./components/CursorFlashlight";
import { LandingNav } from "./presentation/LandingNav";
import { LandingFooter } from "./presentation/LandingFooter";
import { JourneyExperience } from "./journey/JourneyExperience";
import { ChapterRail } from "./presentation/ChapterRail";
import {
  ArriveChapter,
  ConnectedChapter,
  DepartChapter,
  PrepareChapter,
  WorkspaceChapter,
} from "./presentation/chapters";
import { SceneScrim } from "./presentation/SceneScrim";
import { SlideController } from "./presentation/SlideController";
import { TruckTag } from "./presentation/TruckTag";
import { ZoomLock } from "./components/ZoomLock";

export const metadata: Metadata = {
  title: "KINETIC — Autonomous Freight & Megamarket Operations",
  description:
    "KINETIC — an autonomous transportation and fulfillment operating system. Follow Unit 104 from Chicago to Dallas across a 1,400-meter live 3D road.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function KineticPage() {
  return (
    <div
      data-journey="static"
      className="landing-warm relative min-h-screen touch-pan-x touch-pan-y overflow-x-clip bg-[var(--canvas)] font-ui text-[var(--text)]"
    >
      <ZoomLock />
      <CursorFlashlight />
      <JourneyExperience />
      <LandingNav />
      <SceneScrim />
      <TruckTag />
      <ChapterRail />
      <SlideController />
      
      {/* Five pinned scenes following Unit 104 from Chicago gate to Dallas dock */}
      <main id="top" className="relative">
        <DepartChapter />
        <PrepareChapter />
        <ConnectedChapter />
        <WorkspaceChapter />
        <ArriveChapter />
      </main>
      
      <LandingFooter />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/brand/Logo.tsx">
<![CDATA[type MarkProps = { className?: string; title?: string };

/**
 * A squircle parcel folding into a forward "K" with an optical mint telemetry dot.
 */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#1B1522" />
      <path d="M20 18V46" stroke="#FAF7F2" strokeWidth="4.5" strokeLinecap="round" />
      <path
        d="M42 20L26 33L44 46"
        stroke="#FF6B2B"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="20" r="3.5" fill="#00D4B2" />
    </svg>
  );
}

type LogoProps = { className?: string };

/**
 * Lockup: squircle mark + Bricolage wordmark "kinetic." + MEGAMARKET pill badge.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Mark className="w-8 h-8 shrink-0" />
      <span className="font-display font-extrabold text-xl tracking-tight text-[#1B1522]">
        kinetic<span className="text-[#FF6B2B]">.</span>
      </span>
      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FFE6D2] text-[#1B1522]">
        MEGAMARKET
      </span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/components/CursorFlashlight.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import styles from "./flashlightStyles";

// Brand accent (#FF6B2B) as an RGB triplet; the landing page always uses the default palette.
const ACCENT = "255, 107, 43";
const BRUSH_RADIUS = 40; // px, radius of a fresh stroke
const STAMP_SPACING = 10; // px between stamps along the path, so fast strokes stay continuous
const TRAIL_LIFE = 1400; // ms until a stamp has fully faded
const STAMP_ALPHA = 0.06; // per-stamp peak; overlapping stamps build up the stroke's core
const MAX_STAMPS = 320;

type Stamp = { x: number; y: number; t: number };

// One soft orange dot, drawn once and reused for every stamp.
function createBrush(radius: number): HTMLCanvasElement {
  const size = radius * 2;
  const brush = document.createElement("canvas");
  brush.width = size;
  brush.height = size;
  const ctx = brush.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    gradient.addColorStop(0, `rgba(${ACCENT}, 1)`);
    gradient.addColorStop(0.45, `rgba(${ACCENT}, 0.4)`);
    gradient.addColorStop(1, `rgba(${ACCENT}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return brush;
}

/**
 * Orange "paint" trail that follows the mouse across the landing page. The pointer lays
 * down soft stamps along its path and each one fades and shrinks away, so the strokes
 * dissolve behind the cursor. It is a fixed, click-through canvas: the native cursor stays
 * visible and nothing underneath is intercepted. Drawing runs only while a trail is alive
 * and never touches React state. Touch input and reduced-motion users get no effect.
 */
export function CursorFlashlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const brush = createBrush(BRUSH_RADIUS);
    let stamps: Stamp[] = [];
    let last: { x: number; y: number; t: number } | null = null;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Stamps are time-ordered, so expired ones are always at the front.
      let expired = 0;
      while (expired < stamps.length && now - stamps[expired].t >= TRAIL_LIFE) expired++;
      if (expired) stamps = stamps.slice(expired);

      for (const stamp of stamps) {
        const life = 1 - (now - stamp.t) / TRAIL_LIFE;
        const radius = BRUSH_RADIUS * (0.35 + 0.65 * life);
        ctx.globalAlpha = STAMP_ALPHA * life * life;
        ctx.drawImage(brush, stamp.x - radius, stamp.y - radius, radius * 2, radius * 2);
      }
      ctx.globalAlpha = 1;

      if (stamps.length) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      const { clientX: x, clientY: y } = event;

      if (last) {
        // Fill the gap since the previous event so quick swipes paint a solid line.
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.max(1, Math.round(Math.hypot(dx, dy) / STAMP_SPACING));
        for (let i = 1; i <= steps; i++) {
          const k = i / steps;
          stamps.push({ x: last.x + dx * k, y: last.y + dy * k, t: last.t + (now - last.t) * k });
        }
      } else {
        stamps.push({ x, y, t: now });
      }
      if (stamps.length > MAX_STAMPS) stamps = stamps.slice(-MAX_STAMPS);
      last = { x, y, t: now };
      if (!frame) frame = requestAnimationFrame(draw);
    };

    // Re-entering the window must start a new stroke, not a line from where the mouse left.
    const endStroke = () => {
      last = null;
    };
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) endStroke();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", endStroke);
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", endStroke);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/components/flashlightStyles.ts">
<![CDATA[export const styles = {
  trail: "flashlightTrail",
};

export default styles;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/components/ZoomLock.tsx">
<![CDATA["use client";

import { useEffect } from "react";

const ZOOM_KEYS = new Set(["+", "=", "-", "_"]);
const ZOOM_CODES = new Set(["Equal", "Minus", "NumpadAdd", "NumpadSubtract"]);

/**
 * Keeps the landing page at a fixed 100% scale on desktop browsers.
 *
 * The route's viewport export only covers touch pinch-zoom. Desktop zoom arrives as
 * Ctrl/Cmd + wheel (which trackpad pinch also reports as ctrlKey) and Ctrl/Cmd + "+"/"-".
 * Cancelling those events on this page is best effort: the browser menu and an OS-level
 * zoom cannot be blocked from a page. Ctrl/Cmd + 0 is left alone so a zoom level set
 * elsewhere can still be reset. Mounted only on the landing page, so listeners are removed
 * as soon as the visitor navigates to the app.
 */
export function ZoomLock() {
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) event.preventDefault();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (ZOOM_KEYS.has(event.key) || ZOOM_CODES.has(event.code)) event.preventDefault();
    };
    // Safari fires proprietary gesture events for trackpad pinch.
    const onGesture = (event: Event) => event.preventDefault();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("gesturestart", onGesture);
    document.addEventListener("gesturechange", onGesture);
    document.addEventListener("gestureend", onGesture);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("gesturestart", onGesture);
      document.removeEventListener("gesturechange", onGesture);
      document.removeEventListener("gestureend", onGesture);
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/JourneyExperience.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import type { JourneyEngine } from "./engine";
import styles from "./journeyStyles";
import { shouldStartJourney } from "./runtime";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function supportsWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/**
 * Feature root for the scroll-driven delivery journey: a fixed, full-bleed
 * WebGL world behind the landing content. The page only marks its sections
 * with `data-journey-stop`; everything else (Three.js, the scene, the
 * render loop) is lazy-loaded here after hydration.
 *
 * Without WebGL (or before it starts) a painted sky stands in, so the page
 * never shows an empty backdrop. Reduced motion renders still frames that
 * cut between stops instead of animating.
 */
export function JourneyExperience() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<JourneyEngine | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    reducedRef.current = reducedMotion;
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.closest<HTMLElement>("[data-journey]");
    let cancelled = false;
    let started = false;

    const start = () => {
      if (
        started ||
        cancelled ||
        !shouldStartJourney({
          reducedMotion: reducedRef.current,
          visibilityState: document.visibilityState,
          webgl2: supportsWebGL2(),
          search: window.location.search,
        })
      ) {
        return;
      }
      started = true;

      import("./engine")
        .then(({ createJourneyEngine }) => {
          if (cancelled || !host.isConnected) return;
          try {
            engineRef.current = createJourneyEngine({
              host,
              canvasClassName: styles.canvas,
              reducedMotion: reducedRef.current,
              onReady: () => root?.setAttribute("data-journey", "live"),
            });
          } catch {
            // WebGL context creation failed: the painted fallback stays.
          }
        })
        .catch(() => {});
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibilityChange);
      engineRef.current?.dispose();
      engineRef.current = null;
      root?.setAttribute("data-journey", "static");
    };
  }, []);

  return (
    <div className={styles.stage} aria-hidden="true">
      <div className={styles.fallback} />
      <div ref={hostRef} className={styles.canvasHost} />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/journeyStyles.ts">
<![CDATA[export const styles: Record<string, string> = {
  stage: "journeyStage",
  canvasHost: "journeyCanvasHost",
  canvas: "journeyCanvas",
  fallback: "journeyFallback",
  footerPlate: "journeyFooterPlate",
  arrival: "arrival",
  arrivalDot: "arrivalDot",
  telemetry: "telemetry",
  pill: "navPill",
  pillDot: "navPillDot",
  pillStage: "navPillStage",
  routeLine: "routeLine",
  routeFill: "routeFill",
  routeTick: "routeTick",
  routeTruck: "routeTruck",
};

export default styles;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/JourneyTelemetry.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { stopDistance, tripProgress, type StopId } from "./story";
import styles from "./journeyStyles";
import { subscribeTelemetry } from "./telemetry";

/** Beats along the road between the gate and the dock. */
const TICKS: StopId[] = ["truck", "driver", "paperwork", "workspace", "roles"];

/**
 * Trip readout that lives in the sticky nav: a live status pill (wide
 * screens) and a route line along the nav's bottom edge with the truck
 * riding it. Patched straight from the engine's telemetry store, never
 * through React state. Decorative; the page content carries the story.
 */
export function JourneyTelemetry() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const truckRef = useRef<HTMLSpanElement | null>(null);

  useEffect(
    () =>
      subscribeTelemetry((t) => {
        const root = rootRef.current;
        if (!root) return;
        root.dataset.live = String(t.live);
        root.dataset.arrived = String(t.arrived);
        if (stageRef.current) stageRef.current.textContent = t.stage;
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${t.progress})`;
        if (truckRef.current) truckRef.current.style.left = `${t.progress * 100}%`;
      }),
    [],
  );

  return (
    <div ref={rootRef} className={styles.telemetry} data-live="false" data-arrived="false" aria-hidden="true">
      <div className={styles.pill}>
        <span className={styles.pillDot} />
        <span ref={stageRef} className={styles.pillStage}>
          Chicago DC · Gate 2
        </span>
      </div>
      <div className={styles.routeLine}>
        <span ref={fillRef} className={styles.routeFill} />
        {TICKS.map((id) => (
          <span key={id} className={styles.routeTick} style={{ left: `${tripProgress(stopDistance(id)) * 100}%` }} />
        ))}
        <span ref={truckRef} className={styles.routeTruck}>
          <svg viewBox="0 0 24 14" width="22" height="13" aria-hidden="true">
            <rect x="1" y="2" width="14" height="8" rx="1.2" />
            <path d="M15 4.5h4.2l3 3.2V10H15z" />
            <circle cx="5.5" cy="11.5" r="1.8" />
            <circle cx="18" cy="11.5" r="1.8" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Live status line on the closing card: in transit until the truck docks. */
export function ArrivalStatus() {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  useEffect(
    () =>
      subscribeTelemetry((t) => {
        const root = rootRef.current;
        if (!root) return;
        root.dataset.live = String(t.live);
        root.dataset.arrived = String(t.arrived);
        if (textRef.current) {
          textRef.current.textContent = t.arrived
            ? "Delivered · Dallas DC · Dock 2"
            : `In transit · ${t.milesToGo.toLocaleString("en-US")} mi to Dallas`;
        }
      }),
    [],
  );
  return (
    <span ref={rootRef} className={styles.arrival} data-live="false" data-arrived="false" aria-hidden="true">
      <span className={styles.arrivalDot} />
      <span ref={textRef}>Load 784932 · Chicago → Dallas</span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/runtime.ts">
<![CDATA[/**
 * `?journey=off` turns the 3D scene off. Lighthouse CI loads the landing page this way: its headless browser
 * has no GPU, so the scene would render in software and swamp every lab metric. Visitors keep the painted
 * fallback, exactly as in reduced-motion mode.
 */
export function isJourneyDisabledByUrl(search: string): boolean {
  return new URLSearchParams(search).get("journey") === "off";
}

export function shouldStartJourney({
  reducedMotion,
  visibilityState,
  webgl2,
  search = "",
}: {
  reducedMotion: boolean;
  visibilityState: DocumentVisibilityState;
  webgl2: boolean;
  search?: string;
}): boolean {
  return !reducedMotion && visibilityState === "visible" && webgl2 && !isJourneyDisabledByUrl(search);
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/story.ts">
<![CDATA[/**
 * The delivery journey as data: where things are on the road, which page
 * section maps to which point of the trip, how the camera frames each stop,
 * and how light/weather change along the way.
 *
 * DOM-free and Three.js-free so it can be unit tested. The engine (./engine)
 * consumes these tables; the page only exposes `data-journey-stop` anchors.
 *
 * Units: meters along the road (`s`). s = 0 is the origin DC gate area.
 */

/* ------------------------------------------------------------------ */
/* Road layout                                                         */
/* ------------------------------------------------------------------ */

/** First and last meter of paved road that gets built. */
export const ROAD_START = -120;
export const ROAD_END = 1326;

/** Landmarks, in meters along the road. */
export const LANDMARKS = {
  /** Origin yard: the truck idles here on the hero. */
  originYardEnd: 40,
  gate: 26,
  /** Mississippi River crossing. */
  bridgeFrom: 322,
  bridgeTo: 378,
  river: 350,
  cityFrom: 520,
  cityTo: 860,
  overpass: 612,
  checkpoint: 712,
  forestFrom: 840,
  tunnelFrom: 988,
  tunnelTo: 1072,
  destinationYard: 1188,
  /** Where the truck parks at the destination dock. */
  arrival: 1300,
  dockFront: 1318,
} as const;

/** Lateral offset (m) of the right-lane center. */
export const LANE_OFFSET = 1.95;

/**
 * Signed road curvature (rad/m, + turns right) as a list of arcs. Each arc
 * blends in/out over CURVE_BLEND meters so heading has no kinks.
 */
const CURVES: ReadonlyArray<readonly [from: number, to: number, k: number]> = [
  [70, 150, 1 / 260],
  [150, 212, -1 / 210],
  [400, 480, -1 / 300],
  [480, 560, 1 / 290],
  [640, 690, 1 / 420],
  [742, 830, -1 / 250],
  [830, 905, 1 / 300],
  [1080, 1165, -1 / 340],
];
const CURVE_BLEND = 12;

/** Elevation keys (s, meters). Smoothly interpolated. */
const ELEVATION: ReadonlyArray<readonly [number, number]> = [
  [ROAD_START, 0],
  [60, 0],
  [128, 3.2],
  [200, -1.2],
  [262, 1.0],
  [300, 0],
  [400, 0],
  [452, 3.6],
  [516, 1.2],
  [575, 0],
  [770, 0],
  [822, 2.6],
  [884, -0.8],
  [960, 0],
  [1090, 0],
  [1128, 1.6],
  [1170, 0],
  [ROAD_END + 200, 0],
];

export function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}

export function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return clamp(n, 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

export function smootherstep(t: number): number {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Frame-rate independent exponential smoothing factor for a rate in 1/s. */
export function damp(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * Math.max(0, dt));
}

export function curvatureAt(s: number): number {
  let k = 0;
  for (const [from, to, kk] of CURVES) {
    const w =
      smoothstep(from - CURVE_BLEND, from + CURVE_BLEND, s) -
      smoothstep(to - CURVE_BLEND, to + CURVE_BLEND, s);
    k += kk * w;
  }
  return k;
}

export function elevationAt(s: number): number {
  const keys = ELEVATION;
  if (s <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [s1, y1] = keys[i];
    if (s <= s1) {
      const [s0, y0] = keys[i - 1];
      return lerp(y0, y1, smoothstep(s0, s1, s));
    }
  }
  return keys[keys.length - 1][1];
}

/** Lateral lane position of the truck: centered in yards, right lane on the highway. */
export function laneAt(s: number): number {
  return LANE_OFFSET * (smoothstep(40, 72, s) - smoothstep(1186, 1222, s));
}

/* ------------------------------------------------------------------ */
/* Camera shots                                                         */
/* ------------------------------------------------------------------ */

/**
 * A camera placement relative to the truck's road frame.
 * f = forward (+ ahead of the truck), u = up, r = right of travel.
 * The camera looks at (lf, lu) on the truck's centerline.
 * frame = where the look point lands on screen (0..1, y from top), per
 * layout: wide (landscape) and tall (portrait phones).
 */
export type Shot = {
  f: number;
  u: number;
  r: number;
  lf: number;
  lu: number;
  fov: number;
  frame: readonly [x: number, y: number];
  frameTall: readonly [x: number, y: number];
};

/** Hero establishing shot: close-up low 3/4 view of the truck (zero bird's eye view). */
export const INTRO_SHOT: Shot = {
  f: 15,
  u: 2.6,
  r: -9,
  lf: -0.5,
  lu: 1.9,
  fov: 34,
  frame: [0.72, 0.6],
  frameTall: [0.56, 0.8],
};

/* ------------------------------------------------------------------ */
/* Stops: presentation beats <-> points on the road                     */
/* ------------------------------------------------------------------ */

export type StopId =
  | "depart"
  | "prepare"
  | "truck"
  | "driver"
  | "paperwork"
  | "workspace"
  | "roles"
  | "closeout"
  | "arrive";

export type Stop = {
  id: StopId;
  /** Road distance the truck holds at while this beat is on screen. */
  s: number;
  shot: Shot;
};

/**
 * Every beat of the presentation, in page order. Several beats may share
 * a road position (the truck pauses while the camera reframes), so the
 * camera blends by story position, not by distance.
 */
export const STOPS: readonly Stop[] = [
  // 01 Depart: low 3/4 front at the origin gate, truck right of the headline.
  { id: "depart", s: 46, shot: { f: 15, u: 2.6, r: -9, lf: -0.5, lu: 1.9, fov: 34, frame: [0.72, 0.6], frameTall: [0.56, 0.8] } },
  // 02 Prepare: wide aerial of the yard, road leading out.
  { id: "prepare", s: 52, shot: { f: -24, u: 16, r: -18, lf: 5, lu: 0, fov: 38, frame: [0.72, 0.6], frameTall: [0.5, 0.9] } },
  // 03a Truck record: roadside, low and close along the truck's flank.
  { id: "truck", s: 250, shot: { f: 1.5, u: 2.3, r: -14.5, lf: 0.4, lu: 1.8, fov: 40, frame: [0.7, 0.6], frameTall: [0.5, 0.82] } },
  // 03b Driver: over the cab on the bridge.
  { id: "driver", s: 352, shot: { f: 13, u: 5.5, r: -3, lf: 1, lu: 2, fov: 34, frame: [0.3, 0.73], frameTall: [0.5, 0.84] } },
  // 03c Load paperwork: head-on past the weigh station.
  { id: "paperwork", s: 716, shot: { f: 15, u: 3.2, r: 8, lf: -3, lu: 2.2, fov: 36, frame: [0.66, 0.62], frameTall: [0.5, 0.8] } },
  // 04a Workspace: the camera widens over the city at dusk.
  { id: "workspace", s: 790, shot: { f: -26, u: 30, r: 22, lf: 5, lu: 0, fov: 36, frame: [0.83, 0.58], frameTall: [0.5, 0.88] } },
  // 04b Roles: same aerial idea, now in the storm.
  { id: "roles", s: 900, shot: { f: -16, u: 32, r: -14, lf: 4, lu: 0, fov: 36, frame: [0.83, 0.6], frameTall: [0.5, 0.88] } },
  // 05a Closeout: docked, side-rear view toward the lit door.
  { id: "closeout", s: LANDMARKS.arrival, shot: { f: 1.5, u: 2.4, r: -14, lf: 1.5, lu: 2, fov: 34, frame: [0.7, 0.62], frameTall: [0.5, 0.84] } },
  // 05b Arrive: crane up behind the truck, CTA above it.
  { id: "arrive", s: LANDMARKS.arrival, shot: { f: -9, u: 22, r: 6, lf: 4, lu: 0, fov: 40, frame: [0.5, 0.76], frameTall: [0.5, 0.8] } },
];

export const STOP_INDEX: Record<StopId, number> = Object.fromEntries(
  STOPS.map((stop, i) => [stop.id, i]),
) as Record<StopId, number>;

export function stopDistance(id: StopId): number {
  return STOPS[STOP_INDEX[id]].s;
}

/** First and last road position of the told journey. */
export const TRIP_START = STOPS[0].s;
export const TRIP_END = STOPS[STOPS.length - 1].s;

/**
 * Scroll range a chapter owns and the beats (stops) it presents, in order.
 * For a pinned chapter, `start`..`end` is the range its stage stays stuck
 * to the viewport.
 */
export type ChapterRange = { stops: readonly StopId[]; start: number; end: number };

/** Parallel arrays: scroll position -> road distance and story index. */
export type StoryMap = { ys: number[]; ss: number[]; ps: number[] };

/** Share of each beat's slot the scene holds still before moving on. */
export const HOLD_SHARE = 0.62;

/**
 * Build the scroll -> story map. Inside a chapter every beat gets an equal
 * slot: the scene holds for the first part of it (reading time) and moves
 * toward the next beat in the rest. Between chapters (while the next stage
 * scrolls in) the truck drives on to the next chapter's first beat, so each
 * chapter opens on a settled scene.
 */
export function buildStoryMap(chapters: readonly ChapterRange[]): StoryMap {
  const ys: number[] = [];
  const ss: number[] = [];
  const ps: number[] = [];
  const push = (yIn: number, id: StopId) => {
    const i = STOP_INDEX[id];
    let y = yIn;
    if (ys.length && y <= ys[ys.length - 1]) {
      // Collapsed range: never let the map run backwards.
      if (ps[ps.length - 1] > i) return;
      y = ys[ys.length - 1] + 0.001;
    }
    ys.push(y);
    ss.push(STOPS[i].s);
    ps.push(i);
  };
  for (const chapter of chapters) {
    const k = chapter.stops.length;
    const slot = Math.max(0, chapter.end - chapter.start) / Math.max(1, k);
    chapter.stops.forEach((id, j) => {
      const from = chapter.start + slot * j;
      push(from, id);
      push(from + slot * HOLD_SHARE, id);
    });
  }
  if (ys.length === 0) {
    ys.push(0);
    ss.push(STOPS[0].s);
    ps.push(0);
  }
  return { ys, ss, ps };
}

function sampleMap(ys: number[], values: number[], y: number): number {
  if (y <= ys[0]) return values[0];
  for (let i = 1; i < ys.length; i++) {
    if (y <= ys[i]) {
      const t = (y - ys[i - 1]) / (ys[i] - ys[i - 1]);
      return lerp(values[i - 1], values[i], t);
    }
  }
  return values[values.length - 1];
}

/** Road distance the truck should reach at this scroll position. */
export function distanceForScroll(map: StoryMap, scrollY: number): number {
  return sampleMap(map.ys, map.ss, scrollY);
}

/** Story position: stop index, fractional while moving between beats. */
export function storyIndexForScroll(map: StoryMap, scrollY: number): number {
  return sampleMap(map.ys, map.ps, scrollY);
}

/** Scroll position where a beat's hold begins (for chapter and beat links). */
export function scrollForStop(map: StoryMap, id: StopId): number | null {
  const i = map.ps.indexOf(STOP_INDEX[id]);
  return i < 0 ? null : map.ys[i];
}

export type ShotBlend = { a: Shot; b: Shot; t: number };

/** Bracketing shots for a story position; eases across each transition. */
export function shotBlendAt(p: number): ShotBlend {
  const last = STOPS.length - 1;
  if (last === 0) return { a: STOPS[0].shot, b: STOPS[0].shot, t: 0 };
  const q = clamp(p, 0, last);
  const i = Math.min(last - 1, Math.floor(q));
  return { a: STOPS[i].shot, b: STOPS[i + 1].shot, t: smootherstep(q - i) };
}

/* ------------------------------------------------------------------ */
/* Truck dynamics                                                       */
/* ------------------------------------------------------------------ */

export type TruckMotion = {
  /** Road distance (m). */
  s: number;
  /** Speed along the road (m/s), negative when reversing. */
  v: number;
  /** Longitudinal acceleration (m/s^2). */
  a: number;
};

/** Normal highway cruise speed: 18 m/s (~65 km/h = 40.38 mph). Constant across all slides. */
export const CRUISE_SPEED = 18;
const ACCEL = 6.0;
const BRAKE = 12.0;
/** Ceiling capped to CRUISE_SPEED so truck never accelerates beyond 65 km/h. */
export const MAX_CATCH_UP = 18;
/** Extra braking (m/s^2) per m/s of speed. */
const BRAKE_SPEED_FACTOR = 0.5;

/**
 * Advance the truck toward `target` at a constant 65 km/h (18 m/s):
 * When moving between slides (dist > 25), smoothly glide position to the target
 * with steady 65 km/h velocity, eliminating any speed surges from 65 to 120 km/h.
 * Smoothly decelerates to 0 as it docks on the landmark stop.
 */
export function stepTruck(m: TruckMotion, target: number, dtIn: number): void {
  const dt = clamp(dtIn, 0, 0.05);
  if (dt === 0) return;
  const lag = target - m.s;
  const dist = Math.abs(lag);

  if (dist < 0.04) {
    m.s = target;
    m.v = 0;
    m.a = 0;
    return;
  }

  if (dist > 25) {
    // Transitioning between slides/landmarks: smoothly glide position toward target
    // while keeping truck speed locked to constant 65 km/h (18 m/s).
    const easeRate = 2.4;
    m.s += (target - m.s) * Math.min(1, easeRate * dt);
    m.v = Math.sign(lag) * CRUISE_SPEED;
    m.a = 0;
    return;
  }

  // Smooth brake into landmark / dock
  const vStop = Math.sqrt(2 * BRAKE * dist);
  const vDesired = Math.sign(lag) * Math.min(CRUISE_SPEED, vStop, dist * 2.0);
  const a = clamp((vDesired - m.v) * 6, -BRAKE, ACCEL);
  m.v += a * dt;
  m.s += m.v * dt;
  m.a = a;

  if (Math.abs(target - m.s) < 0.02 && Math.abs(m.v) < 0.15) {
    m.s = target;
    m.v = 0;
    m.a = 0;
  }
}

/* ------------------------------------------------------------------ */
/* Environment: time of day + weather                                   */
/* ------------------------------------------------------------------ */

export type EnvKey = {
  s: number;
  skyTop: number;
  horizon: number;
  sun: number;
  sunIntensity: number;
  /** Sun elevation / azimuth in degrees (azimuth 0 = along -Z, + toward +X). */
  sunElevation: number;
  sunAzimuth: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  fogNear: number;
  fogFar: number;
  /** 0 = daylight, 1 = full night (lamps, headlights, windows). */
  night: number;
  rain: number;
  clouds: number;
  stars: number;
  exposure: number;
};

const day = (k: Partial<EnvKey> & { s: number }): EnvKey => ({
  skyTop: 0x4f8fd0,
  horizon: 0xdcebf3,
  sun: 0xfff1dc,
  sunIntensity: 3.1,
  sunElevation: 38,
  sunAzimuth: 130,
  hemiSky: 0xcfe2f2,
  hemiGround: 0x8a7a62,
  hemiIntensity: 1.15,
  fogNear: 60,
  fogFar: 620,
  night: 0,
  rain: 0,
  clouds: 0.45,
  stars: 0,
  exposure: 1,
  ...k,
});

/** Light appearance: dawn departure, day, golden hour, storm night, sunrise arrival. */
export const ENV_LIGHT: readonly EnvKey[] = [
  day({ s: -60, skyTop: 0x6c9cd0, horizon: 0xf7d6b6, sun: 0xffbe86, sunIntensity: 2.7, sunElevation: 9, sunAzimuth: 150, hemiSky: 0xd9e4f0, hemiGround: 0x7d6a58, hemiIntensity: 1.05, fogNear: 50, fogFar: 520, night: 0.18, clouds: 0.35 }),
  day({ s: 40, skyTop: 0x6a9bd0, horizon: 0xf5d9bd, sun: 0xffc690, sunIntensity: 2.8, sunElevation: 12, sunAzimuth: 145, night: 0.1, clouds: 0.38 }),
  day({ s: 172, sunElevation: 34, sunAzimuth: 128 }),
  day({ s: 548, skyTop: 0x5a8ac2, horizon: 0xe9e4d9, sun: 0xfff0d6, sunElevation: 26, sunAzimuth: 110, clouds: 0.5 }),
  day({ s: 700, skyTop: 0x5a6c9f, horizon: 0xf4b27e, sun: 0xffa45c, sunIntensity: 2.9, sunElevation: 7, sunAzimuth: 20, hemiSky: 0xe8cdb4, hemiGround: 0x6d5846, fogFar: 560, night: 0.32, clouds: 0.55, exposure: 1.02 }),
  day({ s: 800, skyTop: 0x3f4c68, horizon: 0x9b8f93, sun: 0xd8a27e, sunIntensity: 1.3, sunElevation: 4, sunAzimuth: 10, hemiSky: 0x9aa6b8, hemiGround: 0x4a4540, hemiIntensity: 0.85, fogNear: 30, fogFar: 380, night: 0.62, rain: 0.35, clouds: 0.9 }),
  day({ s: 884, skyTop: 0x283241, horizon: 0x5f6a79, sun: 0x9fb0c6, sunIntensity: 0.55, sunElevation: 35, sunAzimuth: 60, hemiSky: 0x7f8ea2, hemiGround: 0x2e2f33, hemiIntensity: 0.5, fogNear: 18, fogFar: 260, night: 0.88, rain: 1, clouds: 1, exposure: 1 }),
  day({ s: 1032, skyTop: 0x141c28, horizon: 0x303b4b, sun: 0x8595ad, sunIntensity: 0.3, sunElevation: 40, sunAzimuth: 60, hemiSky: 0x566579, hemiGround: 0x1d1f23, hemiIntensity: 0.38, fogNear: 16, fogFar: 230, night: 1, rain: 1, clouds: 1, exposure: 1.05 }),
  day({ s: 1150, skyTop: 0x33507c, horizon: 0xc99c86, sun: 0xffa874, sunIntensity: 1.2, sunElevation: 2, sunAzimuth: 175, hemiSky: 0xa4b0c4, hemiGround: 0x4b4540, hemiIntensity: 0.8, fogNear: 30, fogFar: 420, night: 0.7, rain: 0.15, clouds: 0.55, stars: 0.2, exposure: 1.08 }),
  day({ s: LANDMARKS.arrival, skyTop: 0x6b98cc, horizon: 0xf8cfab, sun: 0xffc088, sunIntensity: 2.6, sunElevation: 8, sunAzimuth: 170, hemiSky: 0xd6e0ec, hemiGround: 0x7a6756, hemiIntensity: 1.05, fogNear: 50, fogFar: 520, night: 0.4, rain: 0, clouds: 0.3 }),
];

const night = (k: Partial<EnvKey> & { s: number }): EnvKey => ({
  skyTop: 0x050b15,
  horizon: 0x1a2a40,
  sun: 0x9db6da,
  sunIntensity: 0.85,
  sunElevation: 32,
  sunAzimuth: 140,
  hemiSky: 0x2e4260,
  hemiGround: 0x0e1116,
  hemiIntensity: 0.55,
  fogNear: 40,
  fogFar: 420,
  night: 1,
  rain: 0,
  clouds: 0.25,
  stars: 1,
  exposure: 1.2,
  ...k,
});

/** Night Route appearance: the same trip under moonlight. */
export const ENV_DARK: readonly EnvKey[] = [
  night({ s: -60 }),
  night({ s: 172, horizon: 0x192a42 }),
  night({ s: 548, horizon: 0x2a2946, hemiSky: 0x3a3f66 }),
  night({ s: 700, horizon: 0x33304c, hemiSky: 0x44416a, clouds: 0.4, stars: 0.7 }),
  night({ s: 884, skyTop: 0x03060b, horizon: 0x151d29, sunIntensity: 0.3, hemiIntensity: 0.38, fogNear: 16, fogFar: 240, rain: 1, clouds: 1, stars: 0 }),
  night({ s: 1032, skyTop: 0x03060b, horizon: 0x141b26, sunIntensity: 0.25, hemiIntensity: 0.34, fogNear: 14, fogFar: 220, rain: 1, clouds: 1, stars: 0 }),
  night({ s: 1150, horizon: 0x1c2a3e, rain: 0.1, clouds: 0.5, stars: 0.6 }),
  night({ s: LANDMARKS.arrival, horizon: 0x23334b, hemiSky: 0x33496a, stars: 0.85 }),
];

export type KeyBlend<T> = { a: T; b: T; t: number };

export function keyBlendAt<T extends { s: number }>(keys: readonly T[], s: number): KeyBlend<T> {
  if (s <= keys[0].s) return { a: keys[0], b: keys[0], t: 0 };
  for (let i = 1; i < keys.length; i++) {
    if (s <= keys[i].s) {
      const a = keys[i - 1];
      const b = keys[i];
      return { a, b, t: smoothstep(a.s, b.s, s) };
    }
  }
  const last = keys[keys.length - 1];
  return { a: last, b: last, t: 0 };
}

/* ------------------------------------------------------------------ */
/* Telemetry: what the nav HUD reports                                  */
/* ------------------------------------------------------------------ */

/** Chicago, IL -> Dallas, TX by road. */
export const TRIP_MILES = 925;

const STAGES: ReadonlyArray<readonly [untilS: number, label: string]> = [
  [56, "Chicago DC · Gate 2"],
  [322, "I-55 S · Illinois"],
  [380, "Mississippi River"],
  [560, "I-55 S · Missouri"],
  [690, "Memphis, TN"],
  [738, "Compliance checkpoint"],
  [988, "I-40 W · Arkansas"],
  [1072, "Night run · I-30 W"],
  [1188, "I-30 W · Texas"],
  [Infinity, "Dallas DC · Dock 2"],
];

export function stageFor(s: number): string {
  for (const [until, label] of STAGES) if (s < until) return label;
  return STAGES[STAGES.length - 1][1];
}

/** 0..1 trip progress between departure and arrival. */
export function tripProgress(s: number): number {
  return clamp01((s - TRIP_START) / (TRIP_END - TRIP_START));
}

export function milesToGo(s: number): number {
  return Math.round(TRIP_MILES * (1 - tripProgress(s)));
}

/** Road m/s to the mph the HUD shows (constant 40 mph = 65 km/h while moving). */
export function displayMph(v: number): number {
  if (Math.abs(v) < 0.3) return 0;
  return 40;
}

export function isArrived(m: TruckMotion): boolean {
  return m.s > LANDMARKS.arrival - 1.5 && Math.abs(m.v) < 0.6;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/storyScroll.ts">
<![CDATA["use client";

import {
  STOP_INDEX,
  buildStoryMap,
  clamp,
  scrollForStop,
  storyIndexForScroll,
  type ChapterRange,
  type StopId,
  type StoryMap,
} from "./story";

/**
 * The one scroll -> story clock for the landing presentation. It measures
 * the chapter sections (`[data-chapter]` with `data-stops="a,b"` and a
 * `[data-stage]` child), builds the story map, and tracks the current story
 * position. The WebGL engine and the DOM chapters both read it, so the
 * truck, the camera and the on-page beats can never drift apart.
 *
 * Works without WebGL: the chapters still switch beats from it.
 */

type Listener = () => void;

let map: StoryMap = buildStoryMap([]);
let position = 0;
let started = false;
let frame = 0;
const listeners = new Set<Listener>();

function measure() {
  const vh = window.innerHeight;
  const chapters: ChapterRange[] = [];
  document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => {
    const stops = (section.dataset.stops ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter((id): id is StopId => id in STOP_INDEX);
    if (stops.length === 0) return;
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    // In presentation slide mode, each chapter occupies a discrete full slide of height vh
    const start = Math.max(0, top);
    const end = start + Math.max(rect.height, vh);
    chapters.push({ stops, start, end });
  });
  map = buildStoryMap(chapters);
  update();
}

let lastY = 0;
let direction: "down" | "up" = "down";

function update() {
  const y = window.scrollY;
  const dir = y < lastY - 1 ? "up" : y > lastY + 1 ? "down" : direction;
  lastY = y;
  if (dir !== direction) {
    direction = dir;
    // Lets beats enter from above when the reader scrolls back up.
    document.documentElement.dataset.storyDir = dir;
  }
  const next = storyIndexForScroll(map, y);
  const changed = next !== position;
  position = next;
  if (changed) for (const listener of listeners) listener();
}

function schedule(fn: () => void) {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    fn();
  });
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  const remeasure = () => schedule(measure);
  window.addEventListener("scroll", () => schedule(update), { passive: true });
  window.addEventListener("resize", remeasure);
  window.addEventListener("load", remeasure);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(remeasure).observe(document.body);
  document.fonts?.ready.then(remeasure).catch(() => {});
  measure();
}

export function subscribeStory(listener: Listener): () => void {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Current story position (stop index; fractional between beats). */
export function getStoryPosition(): number {
  start();
  return position;
}

export function getStoryMap(): StoryMap {
  start();
  return map;
}

/** Re-measure now (e.g. after layout-affecting UI changes). */
export function remeasureStory(): void {
  if (started) measure();
}

/** Scroll to the start of a beat's hold, respecting reduced motion. */
export function scrollToStop(id: StopId): boolean {
  start();
  const y = scrollForStop(map, id);
  if (y === null) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // +2px lands safely inside the hold rather than on its boundary.
  window.scrollTo({ top: y + 2, behavior: reduce ? "auto" : "smooth" });
  return true;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/telemetry.ts">
<![CDATA[/**
 * Tiny external store the WebGL engine publishes trip telemetry into and
 * the nav HUD reads from. Deliberately not React state: the engine writes
 * every frame and the HUD patches the DOM directly, so scrolling never
 * re-renders the page.
 */

export type Telemetry = {
  live: boolean;
  /** 0..1 progress from the origin gate to the destination dock. */
  progress: number;
  mph: number;
  milesToGo: number;
  stage: string;
  arrived: boolean;
  /** Documents verified at the checkpoint. */
  verified: boolean;
};

type Listener = (t: Telemetry) => void;

const state: Telemetry = {
  live: false,
  progress: 0,
  mph: 0,
  milesToGo: 925,
  stage: "Chicago DC · Gate 2",
  arrived: false,
  verified: false,
};

const listeners = new Set<Listener>();

export function publishTelemetry(next: Partial<Telemetry>): void {
  let changed = false;
  for (const key of Object.keys(next) as (keyof Telemetry)[]) {
    if (state[key] !== next[key]) {
      (state as Record<keyof Telemetry, unknown>)[key] = next[key];
      changed = true;
    }
  }
  if (!changed) return;
  for (const listener of listeners) listener(state);
}

export function subscribeTelemetry(listener: Listener): () => void {
  listeners.add(listener);
  listener(state);
  return () => {
    listeners.delete(listener);
  };
}

/* ------------------------------------------------------------------ */
/* Truck screen position (for DOM callouts anchored to the 3D truck)   */
/* ------------------------------------------------------------------ */

export type TruckScreen = {
  /** Viewport CSS px of a point just above the cab. */
  x: number;
  y: number;
  visible: boolean;
};

type ScreenListener = (p: TruckScreen) => void;
const screen: TruckScreen = { x: 0, y: 0, visible: false };
const screenListeners = new Set<ScreenListener>();

/** Published every rendered frame by the engine; listeners patch the DOM. */
export function publishTruckScreen(x: number, y: number, visible: boolean): void {
  screen.x = x;
  screen.y = y;
  screen.visible = visible;
  for (const listener of screenListeners) listener(screen);
}

export function subscribeTruckScreen(listener: ScreenListener): () => void {
  screenListeners.add(listener);
  listener(screen);
  return () => {
    screenListeners.delete(listener);
  };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/usePrefersReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/motion/math.ts">
<![CDATA[/** Pure motion maths shared across Kinetic components. No DOM, no React. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Frame-rate independent exponential smoothing factor for a rate in 1/s. */
export function damp(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * Math.max(0, dt));
}

/** Where `value` sits between `start` and `end`, as 0–1. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Per-item delay for a cascade, capped so long lists never stall. */
export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

/** Pointer position inside a card (0–1 on each axis) → tilt in degrees. */
export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 };
}

/** Wrap into [0, period), for looping layers. */
export function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/motion/mode.ts">
<![CDATA[/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion.
 * Hidden pre-reveal states hang off html[data-kn-motion="live"], so no-JS and reduced-motion
 * visitors always get the finished, visible static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.knMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

/**
 * Shared IntersectionObserver that flips data-in="true" on [data-reveal] elements.
 * Runs under html[data-kn-motion="live"] only.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.knMotion !== "live") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])").forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-in='true'])")) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };

/** Tracks whether an element is currently intersecting the viewport. */
export function useInView<T extends Element>({ once = false, rootMargin = "0px", threshold = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor prefers reduced motion. Safe server fallback is true. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

/** Fine pointer with hover capability. */
export function canHoverFinely(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/Chapter.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
import type { StopId } from "../journey/story";
import styles from "./presentationStyles";

type ChapterProps = {
  id: string;
  stops: readonly StopId[];
  /** Section height in viewport heights; the stage stays pinned for the extra length. */
  length: number;
  labelledBy: string;
  className?: string;
  children: ReactNode;
};

/**
 * One scene of the presentation. The section reserves scroll length; its
 * stage sticks under the nav while the beats listed in `stops` play, so the
 * reader gets a still, composed frame to read before the journey moves on.
 * Without scripting (or on very short screens) the stage simply flows.
 */
export function Chapter({ id, stops, length, labelledBy, className = "", children }: ChapterProps) {
  return (
    <section
      id={id}
      data-chapter
      data-stops={stops.join(",")}
      aria-labelledby={labelledBy}
      className={styles.chapter}
      style={{ "--len": length } as CSSProperties}
    >
      <div data-stage className={`${styles.stage} ${className}`}>
        {children}
      </div>
    </section>
  );
}

export function ChapterLabel({ n, name, meta }: { n: number; name: string; meta?: string }) {
  return (
    <p className={styles.label}>
      <span className={styles.labelNum}>{String(n).padStart(2, "0")}</span>
      <span className={styles.labelRule} aria-hidden="true" />
      <span className={styles.labelName}>{name}</span>
      {meta ? <span className={styles.labelMeta}>{meta}</span> : null}
    </p>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/ChapterRail.tsx">
<![CDATA["use client";

import type { MouseEvent } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { scrollToStop } from "../journey/storyScroll";
import styles from "./presentationStyles";
import { useStorySelector } from "./useStory";

const CHAPTERS: ReadonlyArray<{ id: string; name: string; first: StopId }> = [
  { id: "depart", name: "Departure", first: "depart" },
  { id: "prepare", name: "Prepare the load", first: "prepare" },
  { id: "connected", name: "On the road", first: "truck" },
  { id: "workspace", name: "Connected workspace", first: "workspace" },
  { id: "arrive", name: "Arrival", first: "closeout" },
];

/**
 * Chapter navigation for the presentation (wide screens). Plain anchors
 * that also work without scripting; with it, they land on the chapter's
 * settled frame and the truck time-lapses there.
 */
export function ChapterRail() {
  const active = useStorySelector((p) => {
    let current = 0;
    CHAPTERS.forEach((c, i) => {
      if (p >= STOP_INDEX[c.first] - 0.5) current = i;
    });
    return current;
  }, 0);

  return (
    <nav className={styles.rail} aria-label="Presentation chapters">
      <ol>
        {CHAPTERS.map((chapter, i) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              className={styles.railLink}
              aria-current={active === i ? "step" : undefined}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (scrollToStop(chapter.first)) event.preventDefault();
              }}
            >
              <span className={styles.railNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.railName}>{chapter.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/chapters.tsx">
<![CDATA["use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ArrowRightIcon } from "./icons";
import type { StopId } from "../journey/story";
import { scrollToStop } from "../journey/storyScroll";
import { ArrivalStatus } from "../journey/JourneyTelemetry";
import { Chapter, ChapterLabel } from "./Chapter";
import {
  CloseoutDemo,
  CommandCenterDemo,
  DriverRecordDemo,
  type DemoRole,
  LoadPaperworkDemo,
  LoadRecordDemo,
  TruckRecordDemo,
} from "./demos";
import styles from "./presentationStyles";
import { useBeat, useStoryPast } from "./useStory";
function useHasSession() { return false; }

/** In-page link that lands on a beat's settled frame (falls back to the anchor). */
function beatLink(stop: StopId) {
  return (event: MouseEvent<HTMLElement>) => {
    if (scrollToStop(stop)) event.preventDefault();
  };
}

function PrimaryCta({ children }: { children: string }) {
  return (
    <Link href="#depart" className={styles.primary}>
      {children}
      <ArrowRightIcon size={16} className={styles.primaryIcon} />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* 01 Departure                                                         */
/* ------------------------------------------------------------------ */

export function DepartChapter() {
  return (
    <Chapter id="depart" stops={["depart"]} length={1} labelledBy="depart-title" className={styles.departStage}>
      <div className={styles.frame}>
        <div className={styles.departCopy}>
          <ChapterLabel n={1} name="Departure" meta="Load 784932 · Chicago → Dallas" />
          <h1 id="depart-title" className={styles.display}>
            Keep every load moving from one clear console.
          </h1>
          <p className={styles.lead}>
            KINETIC connects dispatch, autonomous freight, documents and driver settlements for modern
            distribution operations. Follow one load from the gate to the dock.
          </p>
          <div className={styles.actions}>
            <PrimaryCta>Create your company</PrimaryCta>
            <a href="#prepare" onClick={beatLink("prepare")} className={styles.secondary}>
              Follow the load
            </a>
          </div>
        </div>
      </div>
      <span className={styles.cue} aria-hidden="true">
        Scroll to dispatch
      </span>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 02 Prepare the load                                                  */
/* ------------------------------------------------------------------ */

export function PrepareChapter() {
  // The status flips as the reader moves on and the truck pulls away.
  const dispatched = useStoryPast("prepare", 0.08);
  return (
    <Chapter id="prepare" stops={["prepare"]} length={1} labelledBy="prepare-title" className={styles.prepareStage}>
      <div className={styles.frame}>
        <div className={styles.prepareColumn}>
          <div className={styles.head}>
            <ChapterLabel n={2} name="Prepare the load" />
            <h2 id="prepare-title" className={styles.title}>
              Book it once. Assign it with confidence.
            </h2>
            <p className={styles.lead}>
              Enter the load, attach its rate confirmation and review every field before it saves. Then assign the
              truck and trailer that will run it; the truck&rsquo;s driver comes with it.
            </p>
          </div>
          <LoadRecordDemo dispatched={dispatched} />
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 03 On the road: records by entity                                    */
/* ------------------------------------------------------------------ */

const CONNECTED: readonly StopId[] = ["truck", "driver", "paperwork"];
const CONNECTED_TABS = ["Truck", "Driver", "Load"];

export function ConnectedChapter() {
  const beatFromStory = useBeat(CONNECTED);
  const [tabIndex, setTabIndex] = useState<number | null>(null);
  const beat = tabIndex !== null ? tabIndex : beatFromStory;
  const beats = [
    {
      title: "The truck carries its own file.",
      body: "Equipment status and the truck's registration, inspection and insurance live on Unit 104, not in a shared folder.",
      demo: <TruckRecordDemo />,
      side: "left",
    },
    {
      title: "Credentials surface before they lapse.",
      body: "CDL and medical card dates sit on the driver's profile, so an expiring card shows up weeks ahead instead of at a roadside check.",
      demo: <DriverRecordDemo />,
      side: "right",
    },
    {
      title: "Freight paperwork rides with the load.",
      body: "The rate confirmation and BOL are already on Load 784932. The POD joins them at delivery, ready for the invoice.",
      demo: <LoadPaperworkDemo />,
      side: "left",
    },
  ] as const;
  return (
    <Chapter id="connected" stops={CONNECTED} length={1} labelledBy="connected-title" className={styles.connectedStage}>
      <div className={styles.frame}>
        <div className={styles.connectedHead}>
          <ChapterLabel n={3} name="On the road" />
          <h2 id="connected-title" className={styles.title}>
            Every record stays with what it describes.
          </h2>
          <ol className={styles.tabs} aria-label="Records in this chapter">
            {CONNECTED.map((stop, i) => (
              <li key={stop}>
                <a
                  href="#connected"
                  onClick={(e) => {
                    setTabIndex(i);
                    beatLink(stop)(e);
                  }}
                  className={styles.tab}
                  aria-current={beat === i ? "step" : undefined}
                >
                  <span className={styles.tabNum}>{i + 1}</span>
                  {CONNECTED_TABS[i]}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.connectedBeats}>
          {beats.map((b, i) => (
            <article key={b.title} className={styles.beat} data-active={beat === i} data-side={b.side}>
              <h3 className={styles.beatTitle}>{b.title}</h3>
              <p className={styles.beatBody}>{b.body}</p>
              {b.demo}
            </article>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 04 The connected workspace                                           */
/* ------------------------------------------------------------------ */

const WORKSPACE: readonly StopId[] = ["workspace", "roles"];

export function WorkspaceChapter() {
  const beat = useBeat(WORKSPACE);
  // The beat picks the role (the story's second beat shows the dispatcher),
  // and the reader can flip it by hand until the story moves to another beat.
  const [picked, setPicked] = useState<{ beat: number; role: DemoRole } | null>(null);
  // Forget a manual pick once the story moves on (reset during render, the
  // React pattern for state derived from a changing prop).
  if (picked && picked.beat !== beat) setPicked(null);
  const role: DemoRole = picked && picked.beat === beat ? picked.role : beat === 1 ? "dispatcher" : "admin";
  const dispatcher = role === "dispatcher";
  return (
    <Chapter id="workspace" stops={WORKSPACE} length={1} labelledBy="workspace-title" className={styles.workspaceStage}>
      <div className={styles.frame}>
        <div className={styles.workspaceColumn}>
          <div className={styles.head}>
            <ChapterLabel n={4} name="The connected workspace" />
            <h2 id="workspace-title" className={styles.title}>
              The whole operation, on one screen.
            </h2>
            <div className={styles.beatLines}>
              <p className={styles.beat} data-active={!dispatcher}>
                The load, the truck and the driver you just followed are the same records dispatch works from.
                Nothing is re-keyed between screens.
              </p>
              <p className={styles.beat} data-active={dispatcher}>
                Each company works in its own private workspace, and roles decide who sees what: dispatchers run
                loads without seeing rates or driver pay.
              </p>
            </div>
          </div>
          <CommandCenterDemo role={role} onRoleChange={(next) => setPicked({ beat, role: next })} />
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Arrival and the close                                             */
/* ------------------------------------------------------------------ */

const ARRIVE: readonly StopId[] = ["closeout", "arrive"];

export function ArriveChapter() {
  const beatFromStory = useBeat(ARRIVE);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const beat = activeBeat !== null ? activeBeat : beatFromStory;
  const hasSession = useHasSession();
  return (
    <Chapter id="arrive" stops={ARRIVE} length={1} labelledBy="arrive-title" className={styles.arriveStage}>
      <div className={styles.frame}>
        <div className={styles.arriveBeats}>
          <article className={`${styles.beat} ${styles.closeout}`} data-active={beat === 0}>
            <div className={styles.head}>
              <div className="flex items-center justify-between gap-4">
                <ChapterLabel n={5} name="Arrival" meta="Dallas, TX · Dock 2" />
                <button
                  type="button"
                  onClick={() => setActiveBeat(1)}
                  className="rounded-full bg-[#FFE6D2] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF6B2B] hover:bg-[#FF6B2B] hover:text-[#FAF7F2] transition-colors"
                >
                  View Summary →
                </button>
              </div>
              <h2 id="arrive-title" className={styles.title}>
                Delivered. Now close the loop.
              </h2>
              <p className={styles.lead}>
                The proof of delivery lands on the load, the invoice has its paperwork, and the trip is ready for
                the driver&rsquo;s paystub.
              </p>
            </div>
            <CloseoutDemo />
          </article>
          <article className={`${styles.beat} ${styles.finale}`} data-active={beat === 1}>
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={() => setActiveBeat(0)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#8E8294]/30 bg-[#FAF7F2]/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1B1522] hover:border-[#FF6B2B] hover:text-[#FF6B2B] transition-colors"
              >
                ← Back to Closeout
              </button>
            </div>
            <ArrivalStatus />
            <h2 className={styles.finaleTitle}>One console for the operational details that keep a carrier moving.</h2>
            <p className={styles.finaleLead}>
              Start a company workspace and bring your loads, trucks, drivers, compliance records and dispatch into
              one connected system.
            </p>
            <div className={`${styles.actions} ${styles.actionsCenter}`}>
              {hasSession ? (
                <Link href="#top" className={styles.primary}>
                  Go to dashboard
                  <ArrowRightIcon size={16} className={styles.primaryIcon} />
                </Link>
              ) : (
                <>
                  <PrimaryCta>Create your company</PrimaryCta>
                  <Link href="#depart" className={styles.secondary}>
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </Chapter>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/demos.tsx">
<![CDATA["use client";

import type { ReactNode } from "react";
import {
  CheckCircleIcon,
  DocsIcon,
  DownloadIcon,
  EyeOffIcon,
  FileIcon,
  PersonIcon,
  ReceiptIcon,
  RouteIcon,
  TrailerIcon,
  TruckIcon,
  WalletIcon,
} from "./icons";
import styles from "./presentationStyles";

/*
 * Focused product demonstrations for the landing presentation. Each one is
 * a small, readable slice of a real HighwayTMS screen, filled with clearly
 * illustrative data for the single load the page follows (Load 784932 on
 * Truck 104). None of it is live or interactive product state.
 */

type Tone = "ok" | "warn" | "info" | "muted";

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={styles.pill} data-tone={tone}>
      {children}
    </span>
  );
}

function Illustrative() {
  return <span className={styles.illustrative}>Illustrative data</span>;
}

/* ------------------------------------------------------------------ */
/* 02 Prepare: the load record                                          */
/* ------------------------------------------------------------------ */

export function LoadRecordDemo({ dispatched }: { dispatched: boolean }) {
  return (
    <figure className={`${styles.card} ${styles.loadCard}`} aria-label="Load record demonstration">
      <header className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>Load</span>
          <strong className={styles.cardTitle}>784932</strong>
        </div>
        <span className={styles.statusSwap} aria-live="off">
          <Pill tone={dispatched ? "info" : "muted"}>{dispatched ? "Dispatched" : "Booked"}</Pill>
        </span>
      </header>

      <div className={styles.lane}>
        <div>
          <span className={styles.kicker}>Pickup · Mon 9/8 06:00</span>
          <strong>Chicago, IL</strong>
        </div>
        <span className={styles.laneLine} aria-hidden="true">
          <RouteIcon size={16} />
        </span>
        <div className={styles.alignEnd}>
          <span className={styles.kicker}>Delivery · Tue 9/9 14:00</span>
          <strong>Dallas, TX</strong>
        </div>
      </div>

      <dl className={styles.assign}>
        <div data-highlight="true">
          <dt>
            <TruckIcon size={16} /> Truck
          </dt>
          <dd>
            <span className={styles.unit}>104</span>
          </dd>
        </div>
        <div>
          <dt>
            <TrailerIcon size={16} /> Trailer
          </dt>
          <dd>5307</dd>
        </div>
        <div>
          <dt>
            <PersonIcon size={16} /> Driver
          </dt>
          <dd>
            D. Alvarez <span className={styles.via}>via Truck 104</span>
          </dd>
        </div>
      </dl>

      <footer className={styles.cardFoot}>
        <span className={styles.footItem}>
          <FileIcon size={15} /> Rate confirmation attached · fields reviewed before saving
        </span>
        <Illustrative />
      </footer>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 03 Connected: one record per entity                                  */
/* ------------------------------------------------------------------ */

type DocRow = { name: string; state: string; tone: Tone };

function RecordCard({
  icon,
  kicker,
  title,
  status,
  rows,
  owner,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  status?: ReactNode;
  rows: DocRow[];
  owner: string;
}) {
  return (
    <figure className={`${styles.card} ${styles.recordCard}`} aria-label={`${kicker} ${title} record demonstration`}>
      <header className={styles.cardHead}>
        <div className={styles.recordId}>
          <span className={styles.recordIcon} aria-hidden="true">
            {icon}
          </span>
          <div>
            <span className={styles.kicker}>{kicker}</span>
            <strong className={styles.cardTitle}>{title}</strong>
          </div>
        </div>
        {status}
      </header>
      <p className={styles.owner}>{owner}</p>
      <ul className={styles.docList}>
        {rows.map((row) => (
          <li key={row.name}>
            <span className={styles.docName}>
              <DocsIcon size={15} /> {row.name}
            </span>
            <Pill tone={row.tone}>{row.state}</Pill>
          </li>
        ))}
      </ul>
      <footer className={styles.cardFoot}>
        <Illustrative />
      </footer>
    </figure>
  );
}

export function TruckRecordDemo() {
  return (
    <RecordCard
      icon={<TruckIcon size={20} />}
      kicker="Truck"
      title="Unit 104"
      status={<Pill tone="info">Dispatched</Pill>}
      owner="Filed on the truck"
      rows={[
        { name: "Registration", state: "On file", tone: "ok" },
        { name: "Annual inspection", state: "On file", tone: "ok" },
        { name: "Insurance", state: "On file", tone: "ok" },
      ]}
    />
  );
}

export function DriverRecordDemo() {
  return (
    <RecordCard
      icon={<PersonIcon size={20} />}
      kicker="Driver"
      title="D. Alvarez"
      status={<Pill tone="ok">Active</Pill>}
      owner="Filed on the driver"
      rows={[
        { name: "CDL", state: "Valid · 04/2028", tone: "ok" },
        { name: "Medical card", state: "Expires in 24 days", tone: "warn" },
        { name: "MVR · Drug test", state: "On file", tone: "ok" },
      ]}
    />
  );
}

export function LoadPaperworkDemo() {
  return (
    <RecordCard
      icon={<DocsIcon size={20} />}
      kicker="Load"
      title="784932"
      status={<Pill tone="info">In transit</Pill>}
      owner="Filed on the load"
      rows={[
        { name: "Rate confirmation", state: "Attached", tone: "ok" },
        { name: "Bill of lading", state: "Attached", tone: "ok" },
        { name: "Proof of delivery", state: "At delivery", tone: "muted" },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 04 Workspace: command center, admin vs. dispatcher                   */
/* ------------------------------------------------------------------ */

const ROWS = [
  { load: "784932", lane: "Chicago → Dallas", truck: "104", driver: "D. Alvarez", status: "In transit", tone: "info" as Tone, rate: "$2,450", focus: true },
  { load: "784918", lane: "Atlanta → Cincinnati", truck: "118", driver: "R. Okafor", status: "Picked up", tone: "info" as Tone, rate: "$1,850" },
  { load: "784901", lane: "Phoenix → Denver", truck: "205", driver: "M. Chen", status: "Booked", tone: "muted" as Tone, rate: "$2,100" },
  { load: "784877", lane: "Memphis → Charlotte", truck: "231", driver: "J. Brooks", status: "Delivered", tone: "ok" as Tone, rate: "$2,600" },
];

export type DemoRole = "admin" | "dispatcher";

export function CommandCenterDemo({ role, onRoleChange }: { role: DemoRole; onRoleChange: (role: DemoRole) => void }) {
  const admin = role === "admin";
  const locked = (label: string) => (
    <span className={styles.locked}>
      <EyeOffIcon size={14} /> {label}
    </span>
  );
  return (
    <figure className={`${styles.card} ${styles.console}`} data-role={role} aria-label="Command center demonstration">
      <header className={styles.consoleBar}>
        <div>
          <strong className={styles.consoleTitle}>Command Center</strong>
          <span className={styles.kicker}>Dispatch · Fleet tracking</span>
        </div>
        <div className={styles.roleSwitch} role="group" aria-label="View the command center as">
          <button type="button" data-on={admin} aria-pressed={admin} onClick={() => onRoleChange("admin")}>
            Admin
          </button>
          <button type="button" data-on={!admin} aria-pressed={!admin} onClick={() => onRoleChange("dispatcher")}>
            Dispatcher
          </button>
        </div>
      </header>

      <div className={styles.stats}>
        <div>
          <span className={styles.kicker}>Loads on file</span>
          <strong>24</strong>
        </div>
        <div>
          <span className={styles.kicker}>Trucks active</span>
          <strong>8</strong>
        </div>
        <div>
          <span className={styles.kicker}>Pickups this week</span>
          <strong>6</strong>
        </div>
        <div>
          <span className={styles.kicker}>Total booked</span>
          <strong>{admin ? "$42.8K" : locked("Hidden for this role")}</strong>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Load</th>
            <th scope="col">Lane</th>
            <th scope="col">Truck</th>
            <th scope="col" className={styles.hideNarrow}>
              Driver
            </th>
            <th scope="col">Status</th>
            <th scope="col" className={styles.num}>
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.load} data-focus={row.focus ? "true" : undefined} data-connect={row.focus ? "unit-104" : undefined}>
              <td className={styles.mono}>{row.load}</td>
              <td>{row.lane}</td>
              <td>{row.focus ? <span className={styles.unit}>{row.truck}</span> : <span className={styles.mono}>{row.truck}</span>}</td>
              <td className={styles.hideNarrow}>{row.driver}</td>
              <td>
                <Pill tone={row.tone}>{row.status}</Pill>
              </td>
              <td className={styles.num}>{admin ? row.rate : locked("Hidden")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className={styles.cardFoot}>
        <span className={styles.footItem}>
          {admin ? "Signed in as an admin: rates, pay and settlements visible." : "Signed in as a dispatcher: loads, fleet and drivers — no rates or pay."}
        </span>
        <Illustrative />
      </footer>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Arrive: close the loop                                            */
/* ------------------------------------------------------------------ */

export function CloseoutDemo() {
  const steps = [
    { icon: <CheckCircleIcon size={18} />, title: "Proof of delivery received", detail: "Attached to Load 784932", tone: "ok" as Tone, state: "Done" },
    { icon: <ReceiptIcon size={18} />, title: "Invoice ready", detail: "Rate con, BOL and POD on the same load", tone: "info" as Tone, state: "Ready" },
    { icon: <WalletIcon size={18} />, title: "Driver pay", detail: "Delivered load available for D. Alvarez's paystub", tone: "info" as Tone, state: "Ready" },
    { icon: <DownloadIcon size={18} />, title: "Records", detail: "Export loads to CSV or Excel", tone: "muted" as Tone, state: "Anytime" },
  ];
  return (
    <figure className={`${styles.card} ${styles.closeCard}`} aria-label="Load closeout demonstration">
      <header className={styles.cardHead}>
        <div>
          <span className={styles.kicker}>Load 784932 · Dallas, TX</span>
          <strong className={styles.cardTitle}>Delivered</strong>
        </div>
        <Pill tone="ok">Delivered</Pill>
      </header>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.title}>
            <span className={styles.stepIcon} data-tone={step.tone} aria-hidden="true">
              {step.icon}
            </span>
            <span className={styles.stepText}>
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </span>
            <Pill tone={step.tone}>{step.state}</Pill>
          </li>
        ))}
      </ol>
      <footer className={styles.cardFoot}>
        <Illustrative />
      </footer>
    </figure>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/icons.tsx">
<![CDATA[import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function ArrowRightIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function DocsIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l7.88-7.88" />
    </svg>
  );
}

export function DownloadIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export function EyeOffIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export function FileIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export function PersonIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function ReceiptIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-8" />
      <path d="M16 12h-8" />
      <path d="M12 16h-4" />
    </svg>
  );
}

export function RouteIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

export function TrailerIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2" y="5" width="16" height="11" rx="2" />
      <path d="M18 13h4v3h-4z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="13" cy="18" r="2" />
    </svg>
  );
}

export function TruckIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

export function WalletIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

export function MenuIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function XIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function SunIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/LandingFooter.tsx">
<![CDATA[import Link from "next/link";
import { Logo } from "../brand/Logo";
import styles from "../journey/journeyStyles";

export function LandingFooter() {
  return (
    <footer className={`${styles.footerPlate} py-10 text-[13px] text-[#8E8294] border-t border-[#8E8294]/20 bg-[#FAF7F2]`}>
      <div className="mx-auto flex w-[min(1240px,calc(100%-40px))] flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="font-mono text-xs text-[#8E8294] max-w-[40ch]">
            Autonomous 3D freight and dispatch operations connected in real time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-[#8E8294]">
          <Link href="#depart" className="hover:text-[#FF6B2B] transition-colors">
            Departure
          </Link>
          <Link href="#prepare" className="hover:text-[#FF6B2B] transition-colors">
            Prepare Load
          </Link>
          <Link href="#connected" className="hover:text-[#FF6B2B] transition-colors">
            Records
          </Link>
          <Link href="#workspace" className="hover:text-[#FF6B2B] transition-colors">
            Command Center
          </Link>
          <Link href="#arrive" className="hover:text-[#FF6B2B] transition-colors">
            Arrival
          </Link>
          <span className="text-[#8E8294]/60">© 2026 KINETIC Technologies.</span>
        </div>
      </div>
    </footer>
  );
}
export default LandingFooter;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/LandingNav.tsx">
<![CDATA["use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../brand/Logo";
import { MenuIcon, XIcon, ArrowRightIcon } from "./icons";
import { JourneyTelemetry } from "../journey/JourneyTelemetry";
import { scrollToStop } from "../journey/storyScroll";
import type { StopId } from "../journey/story";

export function LandingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navLinks: Array<{ label: string; stop: StopId; href: string }> = [
    { label: "Departure", stop: "depart", href: "#depart" },
    { label: "Prepare Load", stop: "prepare", href: "#prepare" },
    { label: "On the Road", stop: "truck", href: "#connected" },
    { label: "Workspace", stop: "workspace", href: "#workspace" },
    { label: "Arrival", stop: "closeout", href: "#arrive" },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-[#8E8294]/20 bg-[#FAF7F2]/90 backdrop-blur-md transition-colors"
    >
      <JourneyTelemetry />
      <div className="mx-auto w-[min(1240px,calc(100%-40px))] max-[660px]:w-[min(100%-28px,1240px)]">
        <div className="flex min-h-[72px] items-center justify-between gap-7 max-[660px]:min-h-[64px]">
          <Link
            href="#top"
            aria-label="KINETIC home"
            onClick={(e) => {
              if (scrollToStop("depart")) e.preventDefault();
            }}
            className="group inline-flex min-w-max items-center gap-3 transition-transform hover:scale-105"
          >
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#workspace"
              onClick={(e) => {
                if (scrollToStop("workspace")) e.preventDefault();
              }}
              className="hidden sm:inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-[#8E8294]/30 px-5 text-[13px] font-mono font-bold uppercase tracking-wider text-[#1B1522] hover:border-[#1B1522] hover:bg-[#FFE6D2]/50 transition-all"
            >
              Command Center
            </a>
            <a
              href="#arrive"
              onClick={(e) => {
                if (scrollToStop("arrive")) e.preventDefault();
              }}
              className="hidden md:inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-[#FF6B2B] px-5 text-[13px] font-mono font-bold uppercase tracking-wider text-[#FAF7F2] shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <span>Dispatch Unit 104</span>
              <ArrowRightIcon size={14} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#8E8294]/30 text-[#1B1522] lg:hidden hover:bg-[#FFE6D2]/60"
            >
              {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[#8E8294]/20 py-4 lg:hidden">
            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-[#8E8294]">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setOpen(false);
                    if (scrollToStop(item.stop)) e.preventDefault();
                  }}
                  className="py-2 hover:text-[#FF6B2B]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default LandingNav;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/presentationStyles.ts">
<![CDATA[const overrides: Record<string, string> = {
  stage: "presentationStage",
};

export const styles: Record<string, string> = new Proxy(overrides, {
  get(target, prop: string | symbol) {
    if (typeof prop !== "string") return "";
    return target[prop] ?? prop;
  },
});

export default styles;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/SceneScrim.tsx">
<![CDATA["use client";

import { STOPS, type StopId } from "../journey/story";
import styles from "./presentationStyles";
import { useStorySelector } from "./useStory";

type Wash = "left" | "left-wide" | "column-left" | "right-top" | "top";

/** Where each beat keeps its text, so the wash sits behind it. */
const WASH: Record<StopId, Wash> = {
  depart: "left",
  prepare: "left-wide",
  truck: "column-left",
  driver: "right-top",
  paperwork: "column-left",
  workspace: "left-wide",
  roles: "left-wide",
  closeout: "left",
  arrive: "top",
};
const WASHES: readonly Wash[] = ["left", "left-wide", "column-left", "right-top", "top"];

/**
 * One legibility wash for the whole viewport, between the 3D scene and the
 * page. It is fixed rather than living inside each pinned stage, so there is
 * never a hard edge where one section's stage meets the next; it simply
 * cross-fades to the composition of the beat being read.
 */
export function SceneScrim() {
  const wash = useStorySelector((p) => {
    const i = Math.max(0, Math.min(STOPS.length - 1, Math.round(p)));
    return WASH[STOPS[i].id];
  }, "left" as Wash);
  return (
    <div className={styles.sceneScrim} aria-hidden="true">
      {WASHES.map((w) => (
        <div key={w} className={styles.scrim} data-scrim={w} data-on={wash === w} />
      ))}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/SlideController.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SLIDE_IDS = ["depart", "prepare", "connected", "workspace", "arrive"] as const;
const COOLDOWN_MS = 650;

/**
 * Presentation slide controller:
 * Divides the KINETIC landing page into discrete 100svh presentation slides.
 * Provides snappy transition-like navigation via wheel notches, keyboard arrows/space,
 * touch swipes, and floating slide controls without waiting for long road traverses.
 */
export function SlideController() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(SLIDE_IDS.length - 1, index));
    const targetId = SLIDE_IDS[clamped];
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(clamped);
    }
  }, []);

  useEffect(() => {
    // Determine active slide from scroll position
    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY;
      const idx = Math.round(scrollY / vh);
      setCurrentSlide(Math.max(0, Math.min(SLIDE_IDS.length - 1, idx)));
    };

    // Wheel event debounced navigation
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 22) return;
      if (cooldownRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, COOLDOWN_MS);

      const vh = window.innerHeight || 1;
      const current = Math.round(window.scrollY / vh);
      const next = current + (e.deltaY > 0 ? 1 : -1);
      goToSlide(next);
    };

    // Keyboard slide navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDE_IDS.length - 1);
      }
    };

    // Touch swipe navigation
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) > 48) {
        const vh = window.innerHeight || 1;
        const current = Math.round(window.scrollY / vh);
        goToSlide(current + (deltaY > 0 ? 1 : -1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide, goToSlide]);

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full border border-[#8E8294]/30 bg-[#FAF7F2]/90 px-3 py-1.5 shadow-lg backdrop-blur-md font-mono text-xs text-[#1B1522]"
    >
      <span className="text-[11px] font-semibold text-[#8E8294] tracking-wider uppercase">
        Slide {String(currentSlide + 1).padStart(2, "0")} / 05
      </span>
      <div className="flex items-center gap-1 ml-1 border-l border-[#8E8294]/20 pl-2">
        <button
          type="button"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#FFE6D2] hover:text-[#FF6B2B] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10l4-4 4 4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === SLIDE_IDS.length - 1}
          aria-label="Next slide"
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#FFE6D2] hover:text-[#FF6B2B] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default SlideController;
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/TruckTag.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { getStoryPosition, subscribeStory } from "../journey/storyScroll";
import { subscribeTruckScreen } from "../journey/telemetry";
import styles from "./presentationStyles";

/** Beats where the truck gets its callout, and what it says. */
const LABELS: Partial<Record<StopId, (p: number) => string>> = {
  prepare: (p) => (p > STOP_INDEX.prepare + 0.08 ? "Dispatched" : "Booked"),
  truck: () => "Dispatched",
  workspace: () => "In transit",
  roles: () => "In transit",
};
const CONNECT: ReadonlySet<StopId> = new Set(["workspace", "roles"]);
const STOP_BY_INDEX = Object.entries(STOP_INDEX).reduce<Record<number, StopId>>((acc, [id, i]) => {
  acc[i] = id as StopId;
  return acc;
}, {});

/**
 * A restrained callout that rides on the 3D truck ("Unit 104 · Booked"),
 * matching the unit in the on-page demos, plus - in the workspace chapter -
 * a line from the highlighted dashboard row to the truck. Positioned from
 * the engine's projected truck point every rendered frame; hidden when the
 * truck is off screen, between beats, or when WebGL isn't running.
 * Decorative: the same facts are in the page content.
 */
export function TruckTag() {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const tag = tagRef.current;
    const status = statusRef.current;
    const line = lineRef.current;
    const svg = svgRef.current;
    if (!tag || !status || !line || !svg) return;
    let stop: StopId | null = null;
    let settled = false;

    const readStory = () => {
      const p = getStoryPosition();
      const i = Math.round(p);
      stop = STOP_BY_INDEX[i] ?? null;
      settled = Math.abs(p - i) < 0.3;
      const label = stop ? LABELS[stop] : undefined;
      if (label) status.textContent = label(p);
    };
    readStory();
    const offStory = subscribeStory(readStory);

    const offScreen = subscribeTruckScreen(({ x, y, visible }) => {
      const show = visible && settled && !!stop && !!LABELS[stop];
      tag.dataset.show = String(show);
      if (show) tag.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const row = show && stop && CONNECT.has(stop) ? document.querySelector<HTMLElement>('[data-connect="unit-104"]') : null;
      const wide = window.innerWidth > 980;
      if (!row || !wide) {
        svg.dataset.show = "false";
        return;
      }
      const r = row.getBoundingClientRect();
      const x0 = r.right + 8;
      const y0 = r.top + r.height / 2;
      // Stop the line just under the tag.
      const x1 = x;
      const y1 = y + 30;
      const mx = x0 + (x1 - x0) * 0.55;
      line.setAttribute("d", `M ${x0} ${y0} C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`);
      svg.dataset.show = String(x1 > x0 + 40);
    });

    return () => {
      offStory();
      offScreen();
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} className={styles.connector} data-show="false" aria-hidden="true">
        <path ref={lineRef} d="" />
      </svg>
      <div ref={tagRef} className={styles.truckTag} data-show="false" aria-hidden="true">
        <span className={styles.truckTagInner}>
          <span className={styles.truckTagUnit}>Unit 104</span>
          <span ref={statusRef} className={styles.truckTagStatus}>
            Booked
          </span>
        </span>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/presentation/useStory.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";
import { STOP_INDEX, type StopId } from "../journey/story";
import { getStoryPosition, subscribeStory } from "../journey/storyScroll";

/**
 * Subscribe to a derived value of the story position. Components re-render
 * only when the selected value changes (e.g. the active beat), never per
 * scroll frame.
 */
export function useStorySelector<T extends string | number | boolean>(select: (p: number) => T, serverValue: T): T {
  return useSyncExternalStore(
    subscribeStory,
    () => select(getStoryPosition()),
    () => serverValue,
  );
}

/** Index of the beat (within `stops`) the story is on, switching mid-transition. */
export function useBeat(stops: readonly StopId[]): number {
  const first = STOP_INDEX[stops[0]];
  return useStorySelector((p) => Math.max(0, Math.min(stops.length - 1, Math.floor(p - first + 0.5))), 0);
}

/** True once the story has moved past a beat by `margin` (0..1 of the transition). */
export function useStoryPast(stop: StopId, margin = 0.04): boolean {
  const i = STOP_INDEX[stop];
  return useStorySelector((p) => p > i + margin, false);
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/effects.ts">
<![CDATA[import type { BufferAttribute, Color, Points, ShaderMaterial, Vector3 } from "three";

type ThreeModule = typeof import("three");

/* ------------------------------------------------------------------ */
/* CPU particles: dust, road spray, exhaust, arrival sparks             */
/* ------------------------------------------------------------------ */

const particleVertex = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
uniform float pixelScale;
varying float vAlpha;
varying vec3 vColor;
#include <fog_pars_vertex>
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * pixelScale / max(0.1, -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`;

const particleFragment = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
#include <fog_pars_fragment>
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  if (a * vAlpha < 0.004) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
  #include <fog_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

type Particle = {
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  vz: number;
  drag: number;
  lift: number;
  size0: number;
  size1: number;
  alpha: number;
};

export type EmitOptions = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  size0: number;
  size1: number;
  alpha: number;
  color: Color;
  drag?: number;
  lift?: number;
};

export class ParticleSystem {
  readonly points: Points;
  private readonly particles: Particle[] = [];
  private readonly pos: Float32Array;
  private readonly size: Float32Array;
  private readonly alpha: Float32Array;
  private readonly color: Float32Array;
  private readonly material: ShaderMaterial;
  private cursor = 0;

  constructor(THREE: ThreeModule, private readonly capacity: number) {
    this.pos = new Float32Array(capacity * 3);
    this.size = new Float32Array(capacity);
    this.alpha = new Float32Array(capacity);
    this.color = new Float32Array(capacity * 3);
    for (let i = 0; i < capacity; i++) {
      this.particles.push({ life: 0, maxLife: 0, vx: 0, vy: 0, vz: 0, drag: 0, lift: 0, size0: 0, size1: 0, alpha: 0 });
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aSize", new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aColor", new THREE.BufferAttribute(this.color, 3).setUsage(THREE.DynamicDrawUsage));
    this.material = new THREE.ShaderMaterial({
      uniforms: { pixelScale: { value: 400 }, ...THREE.UniformsLib.fog },
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      fog: true,
    });
    this.points = new THREE.Points(g, this.material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
  }

  /** Point size scale: viewport height in device px / (2 tan(fov/2)). */
  setPixelScale(v: number) {
    this.material.uniforms.pixelScale.value = v;
  }

  emit(o: EmitOptions) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.capacity;
    const p = this.particles[i];
    p.life = o.life;
    p.maxLife = o.life;
    p.vx = o.vx;
    p.vy = o.vy;
    p.vz = o.vz;
    p.drag = o.drag ?? 1.5;
    p.lift = o.lift ?? 0;
    p.size0 = o.size0;
    p.size1 = o.size1;
    p.alpha = o.alpha;
    this.pos[i * 3] = o.x;
    this.pos[i * 3 + 1] = o.y;
    this.pos[i * 3 + 2] = o.z;
    this.color[i * 3] = o.color.r;
    this.color[i * 3 + 1] = o.color.g;
    this.color[i * 3 + 2] = o.color.b;
  }

  update(dt: number) {
    let alive = false;
    for (let i = 0; i < this.capacity; i++) {
      const p = this.particles[i];
      if (p.life <= 0) {
        this.alpha[i] = 0;
        continue;
      }
      alive = true;
      p.life -= dt;
      const k = Math.exp(-p.drag * dt);
      p.vx *= k;
      p.vz *= k;
      p.vy = p.vy * k + p.lift * dt;
      this.pos[i * 3] += p.vx * dt;
      this.pos[i * 3 + 1] += p.vy * dt;
      this.pos[i * 3 + 2] += p.vz * dt;
      const t = 1 - Math.max(0, p.life) / p.maxLife;
      this.size[i] = p.size0 + (p.size1 - p.size0) * t;
      // Quick fade in, long fade out.
      this.alpha[i] = p.alpha * Math.min(1, t * 8) * (1 - t) * (1 - t);
    }
    const g = this.points.geometry;
    (g.attributes.position as BufferAttribute).needsUpdate = true;
    (g.attributes.aSize as BufferAttribute).needsUpdate = true;
    (g.attributes.aAlpha as BufferAttribute).needsUpdate = true;
    (g.attributes.aColor as BufferAttribute).needsUpdate = true;
    this.points.visible = alive;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}

/* ------------------------------------------------------------------ */
/* GPU streak fields: rain and speed lines                              */
/* ------------------------------------------------------------------ */

const streakVertex = /* glsl */ `
attribute vec3 seed;
attribute float tail;
uniform vec3 camPos;
uniform vec3 box;
uniform float time;
uniform float fall;
uniform vec3 relVel;
uniform float exposure;
uniform float minLength;
varying float vAlpha;
void main() {
  vec3 p = seed * box;
  p.y -= time * fall;
  vec3 origin = camPos - box * 0.5;
  p = origin + mod(p - origin, box);
  vec3 dir = relVel;
  float len = max(length(dir) * exposure, minLength);
  vec3 streakDir = length(dir) > 0.001 ? normalize(dir) : vec3(0.0, -1.0, 0.0);
  vec3 pos = p - streakDir * len * tail;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = length(p - camPos);
  vAlpha = (1.0 - tail * 0.85) * smoothstep(box.x * 0.5, box.x * 0.18, dist) * smoothstep(0.6, 3.0, dist);
}
`;

const streakFragment = /* glsl */ `
uniform vec3 color;
uniform float opacity;
varying float vAlpha;
void main() {
  float a = vAlpha * opacity;
  gl_FragColor = vec4(color * a, a);
}
`;

export type StreakField = {
  lines: import("three").LineSegments;
  uniforms: {
    camPos: { value: Vector3 };
    box: { value: Vector3 };
    time: { value: number };
    fall: { value: number };
    relVel: { value: Vector3 };
    exposure: { value: number };
    minLength: { value: number };
    color: { value: Color };
    opacity: { value: number };
  };
};

export function createStreakField(
  THREE: ThreeModule,
  count: number,
  box: [number, number, number],
  color: number,
  seedValue: number,
): StreakField {
  const seeds = new Float32Array(count * 2 * 3);
  const tails = new Float32Array(count * 2);
  let a = seedValue >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const x = rnd();
    const y = rnd();
    const z = rnd();
    for (let k = 0; k < 2; k++) {
      seeds[(i * 2 + k) * 3] = x;
      seeds[(i * 2 + k) * 3 + 1] = y;
      seeds[(i * 2 + k) * 3 + 2] = z;
      tails[i * 2 + k] = k;
    }
  }
  const g = new THREE.BufferGeometry();
  // `position` is required by three for bounds; the shader uses `seed`.
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 2 * 3), 3));
  g.setAttribute("seed", new THREE.BufferAttribute(seeds, 3));
  g.setAttribute("tail", new THREE.BufferAttribute(tails, 1));
  const uniforms: StreakField["uniforms"] = {
    camPos: { value: new THREE.Vector3() },
    box: { value: new THREE.Vector3(...box) },
    time: { value: 0 },
    fall: { value: 0 },
    relVel: { value: new THREE.Vector3() },
    exposure: { value: 0.035 },
    minLength: { value: 0.02 },
    color: { value: new THREE.Color(color) },
    opacity: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: streakVertex,
    fragmentShader: streakFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(g, material);
  lines.frustumCulled = false;
  lines.renderOrder = 9;
  return { lines, uniforms };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/index.ts">
<![CDATA[import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  ENV_DARK,
  ENV_LIGHT,
  LANDMARKS,
  STOPS,
  TRIP_START,
  CRUISE_SPEED,
  clamp,
  clamp01,
  curvatureAt,
  damp,
  displayMph,
  distanceForScroll,
  isArrived,
  keyBlendAt,
  laneAt,
  lerp,
  milesToGo,
  shotBlendAt,
  smoothstep,
  stageFor,
  stepTruck,
  storyIndexForScroll,
  tripProgress,
  type EnvKey,
  type Shot,
  type TruckMotion,
} from "../story";
import { getStoryMap, subscribeStory } from "../storyScroll";
import { publishTelemetry, publishTruckScreen } from "../telemetry";
import { ParticleSystem, createStreakField } from "./effects";
import { valueNoise } from "./noise";
import { createPost, type Post } from "./post";
import { TIERS, lowerTier, pickTier, type Tier } from "./quality";
import { buildRoad } from "./road";
import { Route, createFrame } from "./splineRoute";
import { buildCity, buildStreetlights } from "./scenery/city";
import { buildCountryside } from "./scenery/countryside";
import { buildDestination, buildOrigin } from "./scenery/depots";
import { createMaterials, type Animated, type FrameContext, type SceneryContext } from "./scenery/kit";
import { buildStormZone, isInTunnel } from "./scenery/storm";
import { buildTraffic } from "./scenery/traffic";
import { buildSky } from "./sky";
import { buildFarGround, buildRiver, buildTerrain } from "./terrain";
import {
  asphaltTexture,
  beamTexture,
  concreteTexture,
  dockDoorTexture,
  glowTexture,
  headlightPoolTexture,
  liveryTexture,
  scannerTexture,
} from "./textures";
import { TRUCK_NOSE_X, buildTruck } from "./truck";

export type JourneyEngine = {
  dispose: () => void;
  setReducedMotion: (reduced: boolean) => void;
};

export type EngineOptions = {
  host: HTMLElement;
  canvasClassName: string;
  reducedMotion: boolean;
  /** Called once the first frame is on screen. */
  onReady: () => void;
};

const L = LANDMARKS;
/**
 * Road gaps (m) beyond which the engine cuts instead of driving there.
 * Symmetric, so scrolling back up rewinds the trip the same way scrolling
 * down plays it; only chapter jumps and flings cut.
 */
const CUT_AHEAD = 1400;
const CUT_BEHIND = 1400;
/** How far short of a forward cut target the truck reappears, still rolling. */
const CUT_RUN_IN = 70;
const UP = new THREE.Vector3(0, 1, 0);

type SpringAxis = { x: number; v: number };
const spring = (): SpringAxis => ({ x: 0, v: 0 });
function stepSpring(a: SpringAxis, target: number, dt: number, stiffness = 90, damping = 9) {
  a.v += ((target - a.x) * stiffness - a.v * damping) * dt;
  a.x += a.v * dt;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function createJourneyEngine(opts: EngineOptions): JourneyEngine {
  const { host } = opts;
  let reducedMotion = opts.reducedMotion;
  const nav = navigator as Navigator & { deviceMemory?: number };
  let tier: Tier = pickTier({
    width: window.innerWidth,
    coarsePointer: window.matchMedia("(pointer: coarse)").matches,
    cores: nav.hardwareConcurrency,
    memory: nav.deviceMemory,
  });
  const settings = { ...TIERS[tier] };

  /* Renderer ------------------------------------------------------------ */
  const renderer = new THREE.WebGLRenderer({
    antialias: !settings.post,
    powerPreference: "high-performance",
    stencil: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = settings.shadows;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.className = opts.canvasClassName;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xdcebf3, 60, 600);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.4, 2600);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.environment = envTexture;

  /* Lights ---------------------------------------------------------------- */
  const hemi = new THREE.HemisphereLight(0xcfe2f2, 0x8a7a62, 1.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = settings.shadows;
  const SHADOW_EXTENT = 26;
  sun.shadow.mapSize.set(settings.shadowMapSize, settings.shadowMapSize);
  Object.assign(sun.shadow.camera, { left: -SHADOW_EXTENT, right: SHADOW_EXTENT, top: SHADOW_EXTENT, bottom: -SHADOW_EXTENT, near: 1, far: 260 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.035;
  scene.add(sun, sun.target);
  const lampLights = [0, 1].map(() => {
    const p = new THREE.PointLight(0xffb566, 0, 34, 1.6);
    scene.add(p);
    return p;
  });
  const tunnelLight = new THREE.PointLight(0xdfeaff, 0, 26, 1.4);
  scene.add(tunnelLight);

  /* World ------------------------------------------------------------------- */
  const route = new Route();
  const glow = glowTexture(THREE);
  const textures = {
    glow,
    beam: beamTexture(THREE),
    scanner: scannerTexture(THREE),
    dockDoor: dockDoorTexture(THREE),
  };
  const mats = createMaterials(THREE);
  const world = new THREE.Group();
  scene.add(world);
  const animations: Animated[] = [];
  const glowing: Array<{ m: THREE.MeshStandardMaterial; day: number; night: number }> = [];
  const ctx: SceneryContext = {
    THREE,
    route,
    root: world,
    density: settings.density,
    anisotropy,
    mats,
    textures,
    animate: (fn) => animations.push(fn),
    nightGlow: (m, day, night) => glowing.push({ m, day, night }),
  };

  world.add(buildTerrain(THREE, route, settings.terrainStep));
  world.add(buildFarGround(THREE, route));
  world.add(buildRiver(THREE, route));
  const road = buildRoad(THREE, route, asphaltTexture(THREE, anisotropy), concreteTexture(THREE, anisotropy));
  world.add(road.highway, road.yardOrigin, road.yardDestination);
  buildOrigin(ctx);
  buildCountryside(ctx);
  buildCity(ctx);
  buildStormZone(ctx);
  buildDestination(ctx);
  const lamps = buildStreetlights(ctx, L.cityFrom, L.destinationYard, (s) =>
    (s > L.tunnelFrom - 6 && s < L.tunnelTo + 6) || (s > L.checkpoint - 8 && s < L.checkpoint + 8),
  );
  buildTraffic(ctx, settings.traffic);
  mats.lampWarm.emissiveIntensity = 1;

  const sky = buildSky(THREE, settings.cloudOctaves);
  scene.add(sky.mesh);

  const truck = buildTruck(THREE, liveryTexture(THREE, anisotropy), glow, headlightPoolTexture(THREE));
  scene.add(truck.root);
  const headSpot = new THREE.SpotLight(0xfff0d6, 0, 55, 0.4, 0.65, 1.4);
  headSpot.position.set(TRUCK_NOSE_X + 0.1, 1.2, 0);
  headSpot.target.position.set(TRUCK_NOSE_X + 15.4, -1.4, 0);
  truck.root.add(headSpot, headSpot.target);
  if (!settings.dynamicLights) headSpot.intensity = 0;

  const particles = new ParticleSystem(THREE, settings.particles);
  scene.add(particles.points);
  const rain = createStreakField(THREE, settings.rainDrops, [70, 34, 70], 0xbfcadb, 11);
  scene.add(rain.lines);
  const speedLines = createStreakField(THREE, settings.speedLines, [56, 16, 56], 0xfff3e0, 23);
  speedLines.uniforms.exposure.value = 0.05;
  speedLines.uniforms.minLength.value = 0;
  scene.add(speedLines.lines);

  let post: Post | null = settings.post
    ? createPost(THREE, renderer, scene, camera, { bloom: settings.bloom, samples: settings.msaa, blurSamples: settings.blurSamples })
    : null;

  /* State -------------------------------------------------------------------- */
  /** Smoothed story position the camera shots blend by. */
  let storyP = 0;
  const motion: TruckMotion = { s: STOPS[0].s, v: 0, a: 0 };
  const pitch = spring();
  const roll = spring();
  const bounce = spring();
  let wheelSpin = 0;
  let prevS = motion.s;
  let introT = 1;
  let ignition = 1;
  let themeMix = document.documentElement.dataset.theme === "dark" ? 1 : 0;
  let wet = 0;
  let lightning = 0;
  let nextStrike = 4;
  let strikeT = -1;
  let arrivedLatch = false;
  let verified = false;
  let time = 0;
  let last = performance.now();
  let raf = 0;
  let disposed = false;
  let visible = document.visibilityState !== "hidden";
  let ready = false;
  let dirty = true;
  let lastStillS = Number.NaN;
  let frameParity = 0;
  const perf = { acc: 0, frames: 0, slowWindows: 0, warmup: 2.5 };

  const camLocal = new THREE.Vector3();
  const lookLocal = new THREE.Vector3();
  const framing = new THREE.Vector2(0.5, 0.6);
  let fov = 38;
  let cameraPrimed = false;
  const camVel = new THREE.Vector3();
  const prevCam = new THREE.Vector3();
  const frame = createFrame();
  const truckPos = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const right = new THREE.Vector3();
  const upV = new THREE.Vector3();
  const basis = new THREE.Matrix4();
  const tmpV = new THREE.Vector3();
  const tmpV2 = new THREE.Vector3();
  const tmpV3 = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const viewDir = new THREE.Vector3();
  const colorA = new THREE.Color();
  const colorB = new THREE.Color();
  const env = { ...ENV_LIGHT[0] };
  const dustColor = new THREE.Color();
  const sprayColor = new THREE.Color();
  const smokeColor = new THREE.Color();
  const sparkColor = new THREE.Color(0xffb35c);

  const frameCtx: FrameContext = { time: 0, dt: 0, still: false, s: 0, v: 0, night: 0, rain: 0, arrived: false, verified: false };

  /* Sizing --------------------------------------------------------------------- */
  let width = 1;
  let height = 1;
  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    const pr = Math.min(window.devicePixelRatio || 1, settings.pixelRatioCap);
    renderer.setPixelRatio(pr);
    renderer.setSize(width, height, false);
    post?.setSize(width, height, pr);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    particles.setPixelScale((height * pr) / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2)));
    dirty = true;
  };
  resize();

  // The shared story clock owns scroll measurement; a change just means
  // reduced-motion stills need a fresh frame.
  const unsubscribeStory = subscribeStory(() => {
    dirty = true;
  });
  const storyTarget = () => {
    const map = getStoryMap();
    const y = window.scrollY;
    return { s: distanceForScroll(map, y), p: storyIndexForScroll(map, y) };
  };
  const hostObserver = new ResizeObserver(() => resize());
  hostObserver.observe(host);
  const themeObserver = new MutationObserver(() => {
    dirty = true;
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });


  /* Helpers ---------------------------------------------------------------------- */
  const mixEnv = (s: number) => {
    const a = keyBlendAt(ENV_LIGHT, s);
    const b = keyBlendAt(ENV_DARK, s);
    const num = (k: keyof EnvKey) => {
      const la = lerp(a.a[k] as number, a.b[k] as number, a.t);
      const lb = lerp(b.a[k] as number, b.b[k] as number, b.t);
      return lerp(la, lb, themeMix);
    };
    const col = (k: keyof EnvKey, out: THREE.Color) => {
      colorA.setHex(a.a[k] as number).lerp(colorB.setHex(a.b[k] as number), a.t);
      const light = out.copy(colorA);
      colorA.setHex(b.a[k] as number).lerp(colorB.setHex(b.b[k] as number), b.t);
      return light.lerp(colorA, themeMix);
    };
    for (const k of ["sunIntensity", "sunElevation", "sunAzimuth", "hemiIntensity", "fogNear", "fogFar", "night", "rain", "clouds", "stars", "exposure"] as const) {
      env[k] = num(k);
    }
    col("skyTop", sky.uniforms.top.value);
    col("horizon", sky.uniforms.horizon.value);
    col("sun", sky.uniforms.sunColor.value);
    col("hemiSky", hemi.color);
    col("hemiGround", hemi.groundColor);
  };

  const blendShot = (a: Shot, b: Shot, t: number, tall: boolean) => ({
    f: lerp(a.f, b.f, t),
    u: lerp(a.u, b.u, t),
    r: lerp(a.r, b.r, t),
    lf: lerp(a.lf, b.lf, t),
    lu: lerp(a.lu, b.lu, t),
    fov: lerp(a.fov, b.fov, t),
    fx: lerp(tall ? a.frameTall[0] : a.frame[0], tall ? b.frameTall[0] : b.frame[0], t),
    fy: lerp(tall ? a.frameTall[1] : a.frame[1], tall ? b.frameTall[1] : b.frame[1], t),
  });

  /** Reduced motion: the beat nearest to the reader, shown as a still. */
  const stillStop = () => Math.round(clamp(storyTarget().p, 0, STOPS.length - 1));

  const localToWorld = (f: number, u: number, r: number, out: THREE.Vector3) =>
    out.copy(truckPos).addScaledVector(fwd, f).addScaledVector(UP, u).addScaledVector(right, r);

  /* Frame ------------------------------------------------------------------------- */
  const update = (dtIn: number, still: boolean) => {
    const dt = still ? 0 : dtIn;
    time += dt;

    // Truck motion, and the story position the camera frames it by.
    const story = storyTarget();
    const target = story.s;
    if (still) {
      const i = stillStop();
      motion.s = STOPS[i].s;
      motion.v = 0;
      motion.a = 0;
      storyP = i;
    } else {
      storyP = cameraPrimed ? storyP + (story.p - storyP) * damp(2.6, dt) : story.p;
      // A jump far down the page (chapter link, fling, End key) or any big
      // jump back cuts instead of time-lapsing or reversing across the map:
      // the truck reappears just short of the beat (or on it, going back)
      // and the camera re-frames, masked by a quick dip of the canvas.
      const gap = target - motion.s;
      if (introT >= 1 && cameraPrimed && (gap > CUT_AHEAD || gap < -CUT_BEHIND)) {
        motion.s = gap > 0 ? target - CUT_RUN_IN : target;
        motion.v = gap > 0 ? CRUISE_SPEED : 0;
        motion.a = 0;
        prevS = motion.s;
        storyP = story.p;
        cameraPrimed = false;
        canvas.animate?.([{ opacity: 0.25 }, { opacity: 1 }], { duration: 480, easing: "ease-out" });
      }
      // Hold at the dock for a beat while the intro camera starts moving.
      const hold = introT < 0.18 ? motion.s : target;
      stepTruck(motion, hold, dt);
    }
    const s = motion.s;
    const v = motion.v;
    const arrived = isArrived(motion);
    if (!verified && s + 4 > L.checkpoint) verified = true;
    if (verified && s < L.checkpoint - 40) verified = false;

    // Theme blend.
    const themeTarget = document.documentElement.dataset.theme === "dark" ? 1 : 0;
    themeMix = still ? themeTarget : themeMix + (themeTarget - themeMix) * damp(2.5, dt);
    mixEnv(s);
    const tunnel = isInTunnel(s);
    wet = still ? env.rain : wet + (env.rain - wet) * damp(env.rain > wet ? 1.2 : 0.25, dt);

    // Road frame + truck pose.
    route.sample(s, frame);
    const lane = laneAt(s);
    const laneSlope = (laneAt(s + 1) - laneAt(s - 1)) / 2;
    const heading = frame.heading + Math.atan(laneSlope);
    fwd.set(Math.sin(heading), frame.grade, -Math.cos(heading)).normalize();
    right.set(Math.cos(heading), 0, Math.sin(heading));
    upV.crossVectors(right, fwd).normalize();
    truckPos.set(frame.x + frame.rx * lane, frame.y + 0.02, frame.z + frame.rz * lane);
    basis.makeBasis(fwd, upV, right);
    truck.root.position.copy(truckPos);
    truck.root.quaternion.setFromRotationMatrix(basis);
    // Horizontal basis for the camera (ignores grade so shots stay level).
    fwd.set(Math.sin(frame.heading), 0, -Math.cos(frame.heading));
    right.set(frame.rx, 0, frame.rz);

    // Wheels, steering, suspension.
    const ds = s - prevS;
    prevS = s;
    wheelSpin -= ds / truck.wheelRadiusWorld;
    for (const w of truck.wheels) w.rotation.z = wheelSpin;
    const k = curvatureAt(s);
    const steer = clamp(-(Math.atan(k * 7.1) + laneSlope * 1.4) * 2.2, -0.4, 0.4);
    for (const p of truck.steer) p.rotation.y += (steer - p.rotation.y) * damp(8, dt);
    const lateralAccel = v * v * k;
    const bump = (valueNoise(s * 0.32, 1.7) - 0.5) * 0.05 * Math.min(1, Math.abs(v) / 8);
    const idle = Math.abs(v) < 0.4 && ignition > 0.5 ? Math.sin(time * 42) * 0.004 : 0;
    if (still) {
      pitch.x = roll.x = bounce.x = 0;
    } else {
      const sub = 4;
      for (let i = 0; i < sub; i++) {
        stepSpring(pitch, clamp(motion.a * 0.0042, -0.05, 0.05), dt / sub);
        stepSpring(roll, clamp(-lateralAccel * 0.012, -0.05, 0.05), dt / sub, 70, 8);
        stepSpring(bounce, bump, dt / sub, 140, 12);
      }
    }
    truck.bodyPivot.rotation.z = pitch.x;
    truck.bodyPivot.rotation.x = roll.x;
    truck.bodyPivot.position.y = -0.45 + bounce.x + idle;

    // Truck lamps.
    const lightsOn = clamp01(env.night * 1.15 + wet * 0.7 + tunnel) * ignition;
    const drl = 0.25 * ignition;
    const head = Math.max(drl, lightsOn);
    const lights = truck.lights;
    lights.head.emissiveIntensity = 0.3 + head * 3.4;
    const beamBase = lightsOn * (0.07 + wet * 0.12 + tunnel * 0.04);
    lights.pool.opacity = lightsOn * 0.24;
    headSpot.intensity = settings.dynamicLights ? lightsOn * 70 : 0;
    // Brake lights follow deceleration in whichever direction the truck moves.
    const braking = (motion.a * Math.sign(v) < -1.5 && Math.abs(v) > 0.5) || (Math.abs(v) < 0.2 && ignition > 0.5);
    lights.tail.emissiveIntensity = (0.35 + env.night * 1.6) * Math.max(0.3, ignition) + (braking ? 3.5 : 0);
    // Reverse lamps only for a real, slow back-up; a fast rewind of the trip
    // (the reader scrolling up) shouldn't read as the truck reversing.
    lights.reverse.emissiveIntensity = v < -0.4 && v > -6 ? 3 : 0;
    const blink = Math.sin(time * Math.PI * 3) > 0 ? 1 : 0;
    const signalR = laneSlope > 0.004 && v > 0.5;
    const signalL = laneSlope < -0.004 && v > 0.5;
    lights.signalRight.emissiveIntensity = (signalR || arrived ? blink * 4 : 0) + 0.15;
    lights.signalLeft.emissiveIntensity = (signalL || arrived ? blink * 4 : 0) + 0.15;
    lights.marker.emissiveIntensity = 0.3 + env.night * 2.6;

    // Environment lighting.
    const el = THREE.MathUtils.degToRad(env.sunElevation);
    const az = THREE.MathUtils.degToRad(env.sunAzimuth);
    const sunDir = sky.uniforms.sunDir.value.set(Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az));
    sky.uniforms.stars.value = env.stars;
    sky.uniforms.clouds.value = env.clouds;
    sky.uniforms.storm.value = env.rain;
    sky.uniforms.time.value = time;

    // Lightning in heavy rain.
    if (!still && env.rain > 0.6) {
      nextStrike -= dt;
      if (nextStrike <= 0) {
        strikeT = 0;
        nextStrike = 3.5 + Math.random() * 6;
      }
    }
    if (strikeT >= 0) {
      strikeT += dt;
      lightning = Math.max(0, 1 - strikeT / 0.1) + 0.7 * Math.max(0, 1 - Math.abs(strikeT - 0.24) / 0.07);
      if (strikeT > 0.5) strikeT = -1;
    } else lightning = 0;
    lightning *= clamp01((env.rain - 0.6) / 0.3) * (1 - tunnel);
    sky.uniforms.flash.value = lightning * 0.5;

    const fog = scene.fog as THREE.Fog;
    fog.color.copy(sky.uniforms.horizon.value).lerp(colorB.setHex(0x1a1c20), tunnel * 0.85);
    fog.near = env.fogNear;
    fog.far = env.fogFar;
    hemi.intensity = env.hemiIntensity * (1 - tunnel * 0.7) + lightning * 2.2;
    sun.color.copy(sky.uniforms.sunColor.value);
    sun.intensity = env.sunIntensity * (1 - tunnel) * smoothstep(-2, 3, env.sunElevation) + lightning * 2;
    scene.environmentIntensity = lerp(0.42, 0.12, env.night) * (1 - tunnel * 0.6);
    renderer.toneMappingExposure = env.exposure;
    if (post?.bloom) post.bloom.strength = 0.28 + env.night * 0.34 - tunnel * 0.12;

    // Keep the shadow camera on the truck, snapped to texels to avoid shimmer.
    const texel = (SHADOW_EXTENT * 2) / settings.shadowMapSize;
    const lightDir = tmpV.copy(sunDir).normalize();
    const lr = tmpV2.crossVectors(UP, lightDir).normalize();
    const lu = tmpV3.crossVectors(lightDir, lr);
    const px = Math.round(truckPos.dot(lr) / texel) * texel;
    const py = Math.round(truckPos.dot(lu) / texel) * texel;
    const pz = truckPos.dot(lightDir);
    sun.target.position.copy(lr.multiplyScalar(px)).addScaledVector(lu, py).addScaledVector(lightDir, pz);
    sun.position.copy(sun.target.position).addScaledVector(lightDir, 120);

    // Materials that react to night / wetness.
    for (const g of glowing) g.m.emissiveIntensity = lerp(g.day, g.night, env.night);
    mats.lampWarm.emissiveIntensity = 0.25 + env.night * 5;
    mats.windowWarm.emissiveIntensity = 0.3 + env.night * 2.6;
    for (const m of road.wettable) {
      m.roughness = lerp(0.88, 0.32, wet);
      m.color.setScalar(lerp(1, 0.66, wet));
    }

    // Moving point lights: nearest streetlamps and the tunnel strip lights.
    if (settings.dynamicLights) {
      let i0 = 0;
      while (i0 < lamps.length - 1 && lamps[i0 + 1].s < s) i0++;
      const near = [lamps[i0], lamps[Math.min(lamps.length - 1, i0 + 1)]];
      near.forEach((lamp, i) => {
        const pl = lampLights[i];
        if (!lamp) return;
        pl.position.set(lamp.x, lamp.y - 0.4, lamp.z);
        pl.intensity = env.night * 220 * (1 - smoothstep(30, 60, Math.abs(lamp.s - s)));
      });
      tunnelLight.position.copy(truckPos).addScaledVector(UP, 6.6);
      const strobe = 0.55 + 0.45 * Math.cos((s / 5.5) * Math.PI * 2);
      tunnelLight.intensity = tunnel * 60 * strobe;
    }

    // Camera direction: starts and stays directly framed on the hero truck shot.
    const tall = width / height < 0.8;
    const sb = shotBlendAt(storyP);
    const shot = blendShot(sb.a, sb.b, sb.t, tall);

    // Portrait screens pull back so the truck fits the width.
    const aspect = width / height;
    const pull = aspect < 1 ? clamp(1 + (1 - aspect) * 1.35, 1, 1.9) : 1;
    const speedPull = 1 + Math.min(Math.abs(v), 45) * 0.0045;
    const scale = pull * speedPull;
    const desiredCam = tmpV.set(
      shot.lf + (shot.f - shot.lf) * scale,
      shot.lu + (shot.u - shot.lu) * scale,
      shot.r * scale,
    );
    const desiredLook = tmpV2.set(shot.lf, shot.lu, 0);
    const snap = still || !cameraPrimed;
    const kc = snap ? 1 : damp(introT < 1 ? 60 : 2.4, dt);
    const kl = snap ? 1 : damp(introT < 1 ? 60 : 3.2, dt);
    camLocal.lerp(desiredCam, kc);
    lookLocal.lerp(desiredLook, kl);
    fov = snap ? shot.fov : fov + (shot.fov - fov) * damp(2.4, dt);
    framing.x = snap ? shot.fx : framing.x + (shot.fx - framing.x) * damp(2.4, dt);
    framing.y = snap ? shot.fy : framing.y + (shot.fy - framing.y) * damp(2.4, dt);
    cameraPrimed = true;

    const shake = still ? 0 : 0.02 + Math.min(Math.abs(v), 40) * 0.0016;
    const hx = (valueNoise(time * 0.7, 3.1) - 0.5) * shake * 2;
    const hy = (valueNoise(time * 0.9, 7.3) - 0.5) * shake * 1.4;
    localToWorld(camLocal.x, camLocal.y + hy, camLocal.z + hx, camera.position);
    // Never dip into the terrain or road.
    camera.position.y = Math.max(camera.position.y, frame.y + 0.7);
    const look = localToWorld(lookLocal.x, lookLocal.y, lookLocal.z, lookAt);
    camera.up.copy(UP);
    camera.lookAt(look);
    camera.fov = fov + Math.min(Math.abs(v), 45) * 0.1;
    camera.setViewOffset(width, height, -(framing.x - 0.5) * width, -(framing.y - 0.5) * height, width, height);
    camera.updateProjectionMatrix();
    sky.mesh.position.copy(camera.position);

    // Where the truck sits on screen, for DOM callouts anchored to it.
    // Only while the truck has (nearly) reached the beat it belongs to.
    const anchor = tmpV3.copy(truckPos).addScaledVector(UP, 4.4).project(camera);
    publishTruckScreen(
      (anchor.x * 0.5 + 0.5) * width,
      (0.5 - anchor.y * 0.5) * height,
      anchor.z < 1 && Math.abs(anchor.x) < 1.1 && Math.abs(anchor.y) < 1.1 && Math.abs(target - s) < 30,
    );

    // Volumetric beams read from the side; looking down them just fogs the lens.
    tmpV.copy(camera.position).sub(truckPos).normalize();
    const intoBeams = Math.max(0, tmpV.dot(fwd));
    lights.beam.uniforms.intensity.value = beamBase * (1 - smoothstep(0.25, 0.75, intoBeams));

    if (dt > 0) {
      camVel.lerp(tmpV.copy(camera.position).sub(prevCam).divideScalar(dt), damp(10, dt));
    }
    prevCam.copy(camera.position);

    // Particles.
    if (!still) emitParticles(dt, s, v, tunnel);
    particles.update(dt);

    // Rain and speed lines.
    const rainAmount = env.rain * (1 - tunnel);
    rain.lines.visible = rainAmount > 0.01;
    rain.uniforms.camPos.value.copy(camera.position);
    rain.uniforms.time.value = time;
    rain.uniforms.fall.value = 24;
    rain.uniforms.relVel.value.set(2.5, -24, 1).sub(camVel);
    rain.uniforms.opacity.value = rainAmount * 0.5 * (0.6 + env.night * 0.6);
    const speedAmount = smoothstep(12, 42, Math.abs(v)) * (1 - rainAmount * 0.6);
    speedLines.lines.visible = speedAmount > 0.01;
    speedLines.uniforms.camPos.value.copy(camera.position);
    speedLines.uniforms.relVel.value.copy(camVel).multiplyScalar(-1);
    speedLines.uniforms.opacity.value = speedAmount * (0.35 + env.night * 0.25);

    // Keep view crisp and clear at constant 65 km/h cruise without disorienting warp blur.
    if (post) {
      const u = post.speed.uniforms;
      u.strength.value = 0;
      const dir = tmpV.copy(camVel);
      if (dir.lengthSq() > 0.01) {
        dir.normalize();
        const ahead = tmpV2.copy(camera.position).addScaledVector(dir, 100);
        // Moving away from where the camera looks: blur from the point behind.
        camera.getWorldDirection(viewDir);
        if (viewDir.dot(dir) < 0) ahead.copy(camera.position).addScaledVector(dir, -100);
        ahead.project(camera);
        u.center.value.set(clamp(ahead.x * 0.5 + 0.5, -2, 3), clamp(ahead.y * 0.5 + 0.5, -2, 3));
      }
      const tp = tmpV.copy(truckPos).addScaledVector(UP, 1.6).project(camera);
      u.focus.value.set(tp.x * 0.5 + 0.5, tp.y * 0.5 + 0.5);
      const dist = camera.position.distanceTo(truckPos);
      u.focusRadius.value = clamp((7.5 / (dist * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2))) * 0.8, 0.06, 0.38);
      u.aspect.value = width / height;
      u.time.value = time % 10;
      u.vignette.value = 0.22 + env.night * 0.12 + tunnel * 0.1;
    }

    // Scenery animations.
    frameCtx.time = time;
    frameCtx.dt = dt;
    frameCtx.still = still;
    frameCtx.s = s;
    frameCtx.v = v;
    frameCtx.night = env.night;
    frameCtx.rain = wet;
    frameCtx.arrived = arrived;
    frameCtx.verified = verified;
    for (const fn of animations) fn(frameCtx);

    if (arrived && !arrivedLatch && !still) celebrate();
    arrivedLatch = arrived;

    publishTelemetry({
      live: true,
      progress: tripProgress(s),
      mph: displayMph(v),
      milesToGo: milesToGo(s),
      stage: arrived ? "Delivered · Dallas DC" : stageFor(s),
      arrived,
      verified,
    });
  };

  /* Particles --------------------------------------------------------------------- */
  let dustAcc = 0;
  let sprayAcc = 0;
  let smokeAcc = 0;
  const emitterWorld = (p: readonly [number, number, number], out: THREE.Vector3) =>
    out.set(p[0], p[1], p[2]).applyMatrix4(truck.root.matrixWorld);

  function emitParticles(dt: number, s: number, v: number, tunnel: number) {
    truck.root.updateMatrixWorld();
    const speed = Math.abs(v);
    const brightness = lerp(1, 0.32, env.night) * (1 - tunnel * 0.5);
    const dusty = (s < 60 ? 1 : s < L.cityFrom ? 0.55 : s > L.destinationYard ? 0.8 : 0.15) * (1 - wet);
    const back = -Math.sign(v || 1);
    dustAcc += dt * speed * 1.1 * dusty;
    sprayAcc += dt * speed * 2.4 * wet * (1 - tunnel);
    smokeAcc += dt * (ignition > 0.5 ? 2 + Math.max(0, motion.a) * 2.5 : 0);
    dustColor.setRGB(0.62, 0.55, 0.45).multiplyScalar(brightness);
    sprayColor.setRGB(0.82, 0.86, 0.92).multiplyScalar(brightness * 1.1);
    smokeColor.setRGB(0.28, 0.28, 0.3).multiplyScalar(0.6 + brightness * 0.4);
    const wheels = truck.emitters.rearWheels;
    while (dustAcc > 1) {
      dustAcc -= 1;
      const w = wheels[Math.floor(Math.random() * wheels.length)];
      emitterWorld(w, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y, z: tmpV.z,
        vx: fwd.x * back * speed * 0.18 + (Math.random() - 0.5) * 2.2,
        vy: 0.6 + Math.random() * 1.4,
        vz: fwd.z * back * speed * 0.18 + (Math.random() - 0.5) * 2.2,
        life: 1.4 + Math.random() * 1.2, size0: 0.8, size1: 4.2, alpha: 0.32, color: dustColor, drag: 1.6, lift: 0.4,
      });
    }
    while (sprayAcc > 1) {
      sprayAcc -= 1;
      const w = wheels[Math.floor(Math.random() * wheels.length)];
      emitterWorld(w, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y + 0.2, z: tmpV.z,
        vx: fwd.x * back * speed * 0.35 + (Math.random() - 0.5) * 3,
        vy: 1 + Math.random() * 2.2,
        vz: fwd.z * back * speed * 0.35 + (Math.random() - 0.5) * 3,
        life: 0.5 + Math.random() * 0.5, size0: 0.6, size1: 3.4, alpha: 0.4, color: sprayColor, drag: 2.4, lift: -3,
      });
    }
    while (smokeAcc > 1) {
      smokeAcc -= 1;
      emitterWorld(truck.emitters.exhaust, tmpV);
      particles.emit({
        x: tmpV.x, y: tmpV.y, z: tmpV.z,
        vx: fwd.x * back * speed * 0.1 + (Math.random() - 0.5) * 0.4,
        vy: 1.4 + Math.random() * 0.8,
        vz: fwd.z * back * speed * 0.1 + (Math.random() - 0.5) * 0.4,
        life: 1.6 + Math.random(), size0: 0.3, size1: 2.2, alpha: 0.22, color: smokeColor, drag: 1.2, lift: 0.6,
      });
    }
  }

  function celebrate() {
    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 7 + Math.random() * 3;
      particles.emit({
        x: truckPos.x + Math.cos(a) * r, y: truckPos.y + 0.3, z: truckPos.z + Math.sin(a) * r,
        vx: Math.cos(a) * 1.5, vy: 3 + Math.random() * 5, vz: Math.sin(a) * 1.5,
        life: 1.4 + Math.random() * 1.2, size0: 0.35, size1: 0.1, alpha: 1, color: sparkColor, drag: 0.8, lift: -2.5,
      });
    }
  }

  /* Quality ------------------------------------------------------------------------ */
  const degrade = () => {
    const next = lowerTier(tier);
    if (!next) return;
    tier = next;
    const t = TIERS[next];
    settings.pixelRatioCap = t.pixelRatioCap;
    settings.bloom = t.bloom;
    settings.post = t.post;
    settings.dynamicLights = t.dynamicLights;
    post?.dispose();
    post = t.post
      ? createPost(THREE, renderer, scene, camera, { bloom: t.bloom, samples: t.msaa, blurSamples: t.blurSamples })
      : null;
    if (!t.shadows && renderer.shadowMap.enabled) {
      renderer.shadowMap.enabled = false;
      sun.castShadow = false;
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(m)) m.forEach((x) => (x.needsUpdate = true));
        else if (m) m.needsUpdate = true;
      });
    } else if (t.shadows && t.shadowMapSize !== settings.shadowMapSize) {
      settings.shadowMapSize = t.shadowMapSize;
      sun.shadow.mapSize.set(t.shadowMapSize, t.shadowMapSize);
      sun.shadow.map?.dispose();
      sun.shadow.map = null;
    }
    if (!t.dynamicLights) {
      headSpot.intensity = 0;
      lampLights.forEach((l) => (l.intensity = 0));
      tunnelLight.intensity = 0;
    }
    resize();
  };

  const trackPerformance = (dt: number) => {
    if (reducedMotion) return;
    if (perf.warmup > 0) {
      perf.warmup -= dt;
      return;
    }
    perf.acc += dt;
    perf.frames++;
    if (perf.acc >= 2) {
      const avg = perf.acc / perf.frames;
      perf.slowWindows = avg > 1 / 40 ? perf.slowWindows + 1 : 0;
      perf.acc = 0;
      perf.frames = 0;
      if (perf.slowWindows >= 2) {
        perf.slowWindows = 0;
        perf.warmup = 2;
        degrade();
      }
    }
  };

  const render = () => {
    if (post) post.render();
    else renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady();
    }
  };

  const loop = (now: number) => {
    if (disposed || !visible) {
      raf = 0;
      return;
    }
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (reducedMotion) {
      const stillS = stillStop();
      if (!dirty && stillS === lastStillS) return;
      lastStillS = stillS;
      dirty = false;
      update(0, true);
      render();
      return;
    }
    // Idle scenes (parked, dry, settled) render at half rate to save power.
    const idle = Math.abs(motion.v) < 0.01 && introT >= 1 && env.rain < 0.05 && Math.abs(storyTarget().s - motion.s) < 0.05;
    frameParity = (frameParity + 1) % 2;
    if (idle && frameParity === 1 && ready) return;
    const step = idle ? dt * 2 : dt;
    update(step, false);
    trackPerformance(dt);
    render();
  };

  const onVisibilityChange = () => {
    visible = document.visibilityState !== "hidden";
    if (visible && !disposed && !raf) raf = requestAnimationFrame(loop);
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  // Compile shaders off the main thread where supported, then start.
  const start = () => {
    if (disposed) return;
    const t0 = storyTarget().s;
    motion.s = t0;
    motion.v = 0;
    prevS = motion.s;
    introT = 1;
    ignition = 1;
    cameraPrimed = false;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  update(0, true);
  renderer.compileAsync(scene, camera).then(start, start);

  return {
    setReducedMotion(next: boolean) {
      reducedMotion = next;
      if (next) {
        introT = 1;
        ignition = 1;
      }
      dirty = true;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      hostObserver.disconnect();
      themeObserver.disconnect();
      unsubscribeStory();
      publishTelemetry({ live: false });
      post?.dispose();
      particles.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const m = mesh.material as THREE.Material | THREE.Material[] | undefined;
        const list = Array.isArray(m) ? m : m ? [m] : [];
        for (const mat of list) {
          for (const value of Object.values(mat)) {
            if (value instanceof THREE.Texture) value.dispose();
          }
          mat.dispose();
        }
      });
      envTexture.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/noise.ts">
<![CDATA[/** Deterministic hash/noise helpers so the world is identical on every load. */

export function hash2(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

/** Smooth value noise in [0, 1]. */
export function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal noise in [0, 1]. */
export function fbm(x: number, y: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let f = 1;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise(x * f, y * f) * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return sum / norm;
}

/** Seeded PRNG (mulberry32) for scattering props. */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/post.ts">
<![CDATA[import type { Camera, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

type ThreeModule = typeof import("three");

/**
 * Speed pass: radial motion blur toward the direction of travel, masked
 * around the truck so the hero stays crisp, plus chromatic fringing at
 * speed, a soft vignette and fine grain. Runs in linear HDR before the
 * output (tone mapping) pass.
 */
const SpeedShader = {
  uniforms: {
    tDiffuse: { value: null },
    strength: { value: 0 },
    center: { value: null as Vector2 | null },
    focus: { value: null as Vector2 | null },
    focusRadius: { value: 0.12 },
    aspect: { value: 1 },
    vignette: { value: 0.28 },
    grain: { value: 0.025 },
    time: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float strength;
    uniform vec2 center;
    uniform vec2 focus;
    uniform float focusRadius;
    uniform float aspect;
    uniform float vignette;
    uniform float grain;
    uniform float time;
    varying vec2 vUv;

    float rand(vec2 co) { return fract(sin(dot(co, vec2(12.9898, 78.233)) + time) * 43758.5453); }

    void main() {
      vec2 toC = vUv - center;
      float dist = length(toC);
      vec2 dir = dist > 0.0001 ? toC / dist * min(dist, 0.75) : vec2(0.0);
      vec2 fd = (vUv - focus) * vec2(aspect, 1.0);
      float mask = smoothstep(focusRadius, focusRadius * 2.6, length(fd));
      float amount = strength * mask;
      vec3 col;
      if (amount > 0.002) {
        vec3 acc = vec3(0.0);
        float jitter = rand(vUv) * 0.8;
        for (int i = 0; i < SAMPLES; i++) {
          float t = (float(i) + jitter) / float(SAMPLES);
          acc += texture2D(tDiffuse, vUv - dir * t * amount * 0.045).rgb;
        }
        col = acc / float(SAMPLES);
        vec2 ca = dir * amount * 0.0018;
        col.r = mix(col.r, texture2D(tDiffuse, vUv - ca).r, 0.5);
        col.b = mix(col.b, texture2D(tDiffuse, vUv + ca).b, 0.5);
      } else {
        col = texture2D(tDiffuse, vUv).rgb;
      }
      vec2 v = (vUv - 0.5) * vec2(aspect, 1.0) / max(aspect, 1.0);
      col *= 1.0 - vignette * smoothstep(0.25, 0.95, dot(v, v) * 2.2);
      col += (rand(vUv * 1.3) - 0.5) * grain * (0.35 + col);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export type Post = {
  render: () => void;
  setSize: (w: number, h: number, pixelRatio: number) => void;
  bloom: UnrealBloomPass | null;
  speed: ShaderPass;
  dispose: () => void;
};

export function createPost(
  THREE: ThreeModule,
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  opts: { bloom: boolean; samples: number; blurSamples: number },
): Post {
  const size = renderer.getSize(new THREE.Vector2());
  const target = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: opts.samples,
  });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  let bloom: UnrealBloomPass | null = null;
  if (opts.bloom) {
    // Threshold above 1 so only HDR emitters (lamps, beacons) bloom, never the sky.
    bloom = new UnrealBloomPass(new THREE.Vector2(size.x / 2, size.y / 2), 0.4, 0.22, 1.05);
    composer.addPass(bloom);
  }
  const speed = new ShaderPass({
    ...SpeedShader,
    uniforms: THREE.UniformsUtils.clone(SpeedShader.uniforms),
    defines: { SAMPLES: opts.blurSamples },
  });
  speed.uniforms.center.value = new THREE.Vector2(0.5, 0.5);
  speed.uniforms.focus.value = new THREE.Vector2(0.5, 0.5);
  composer.addPass(speed);
  composer.addPass(new OutputPass());

  return {
    render: () => composer.render(),
    setSize: (w, h, pixelRatio) => {
      // The composer scales every pass (bloom halves itself internally).
      composer.setPixelRatio(pixelRatio);
      composer.setSize(w, h);
    },
    bloom,
    speed,
    dispose: () => {
      composer.dispose();
      target.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/quality.ts">
<![CDATA[export type Tier = "high" | "medium" | "low";

export type TierSettings = {
  pixelRatioCap: number;
  shadows: boolean;
  shadowMapSize: number;
  post: boolean;
  bloom: boolean;
  msaa: number;
  blurSamples: number;
  /** Prop density multiplier. */
  density: number;
  rainDrops: number;
  speedLines: number;
  particles: number;
  terrainStep: number;
  cloudOctaves: number;
  dynamicLights: boolean;
  traffic: number;
};

export const TIERS: Record<Tier, TierSettings> = {
  high: {
    pixelRatioCap: 1.75,
    shadows: true,
    shadowMapSize: 2048,
    post: true,
    bloom: true,
    msaa: 4,
    blurSamples: 10,
    density: 1,
    rainDrops: 3200,
    speedLines: 520,
    particles: 900,
    terrainStep: 4,
    cloudOctaves: 5,
    dynamicLights: true,
    traffic: 6,
  },
  medium: {
    pixelRatioCap: 1.5,
    shadows: true,
    shadowMapSize: 1024,
    post: true,
    bloom: false,
    msaa: 2,
    blurSamples: 7,
    density: 0.72,
    rainDrops: 2000,
    speedLines: 320,
    particles: 600,
    terrainStep: 5,
    cloudOctaves: 4,
    dynamicLights: true,
    traffic: 4,
  },
  low: {
    pixelRatioCap: 1.25,
    shadows: false,
    shadowMapSize: 512,
    post: false,
    bloom: false,
    msaa: 0,
    blurSamples: 0,
    density: 0.45,
    rainDrops: 1000,
    speedLines: 160,
    particles: 360,
    terrainStep: 6,
    cloudOctaves: 3,
    dynamicLights: false,
    traffic: 3,
  },
};

/**
 * Starting tier from coarse device hints; the engine then steps down on
 * its own if the measured frame time says so.
 */
export function pickTier(env: {
  width: number;
  coarsePointer: boolean;
  cores: number | undefined;
  memory: number | undefined;
}): Tier {
  const weak = (env.cores !== undefined && env.cores <= 4) || (env.memory !== undefined && env.memory <= 4);
  if (env.coarsePointer || env.width < 660) return weak ? "low" : "medium";
  return weak ? "medium" : "high";
}

export function lowerTier(tier: Tier): Tier | null {
  return tier === "high" ? "medium" : tier === "medium" ? "low" : null;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/road.ts">
<![CDATA[import type { BufferGeometry, Material, Mesh, MeshStandardMaterial } from "three";
import { LANDMARKS, ROAD_END } from "../story";
import { createFrame, type Route } from "./splineRoute";

type ThreeModule = typeof import("three");

/**
 * A strip that follows the road between two distances. `profile` lists
 * cross-section points as [lateral, height-above-road, u]; consecutive
 * points become quads. V runs along the road as s / vScale.
 */
export function buildRibbon(
  THREE: ThreeModule,
  route: Route,
  from: number,
  to: number,
  step: number,
  profile: ReadonlyArray<readonly [lat: number, up: number, u: number]>,
  vScale: number,
): BufferGeometry {
  const frame = createFrame();
  const rows = Math.max(2, Math.ceil((to - from) / step) + 1);
  const cols = profile.length;
  const pos = new Float32Array(rows * cols * 3);
  const uv = new Float32Array(rows * cols * 2);
  for (let r = 0; r < rows; r++) {
    const s = Math.min(to, from + r * step);
    route.sample(s, frame);
    for (let k = 0; k < cols; k++) {
      const [lat, up, u] = profile[k];
      const i = r * cols + k;
      pos[i * 3] = frame.x + frame.rx * lat;
      pos[i * 3 + 1] = frame.y + up;
      pos[i * 3 + 2] = frame.z + frame.rz * lat;
      uv[i * 2] = u;
      uv[i * 2 + 1] = s / vScale;
    }
  }
  const index: number[] = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let k = 0; k < cols - 1; k++) {
      const a = r * cols + k;
      const b = a + 1;
      const c = a + cols;
      const d = c + 1;
      // Counter-clockwise seen from above (right x forward = up).
      index.push(a, b, c, b, d, c);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

export type RoadMeshes = {
  highway: Mesh;
  yardOrigin: Mesh;
  yardDestination: Mesh;
  /** Materials whose roughness/color follow the rain. */
  wettable: MeshStandardMaterial[];
};

const ROAD_PROFILE = [
  [-5.6, 0.0, 0],
  [-4.2, 0.02, 0.125],
  [4.2, 0.02, 0.875],
  [5.6, 0.0, 1],
] as const;

export function buildRoad(
  THREE: ThreeModule,
  route: Route,
  asphalt: MeshStandardMaterial["map"],
  concrete: MeshStandardMaterial["map"],
): RoadMeshes {
  const highwayMat = new THREE.MeshStandardMaterial({
    map: asphalt,
    roughness: 0.86,
    metalness: 0,
    envMapIntensity: 0.6,
  });
  const yardMat = new THREE.MeshStandardMaterial({
    map: concrete,
    roughness: 0.9,
    metalness: 0,
    envMapIntensity: 0.5,
  });

  const highway = new THREE.Mesh(
    buildRibbon(THREE, route, 36, LANDMARKS.destinationYard + 4, 2, ROAD_PROFILE, 12),
    highwayMat,
  );
  highway.receiveShadow = true;
  highway.name = "highway";

  const yardProfile = [
    [-9, 0.0, 0],
    [9, 0.0, 1],
  ] as const;
  const yardOrigin = new THREE.Mesh(
    buildRibbon(THREE, route, -120, 38, 2, yardProfile, 18),
    yardMat,
  );
  yardOrigin.position.y = 0.012;
  yardOrigin.receiveShadow = true;
  const yardDestination = new THREE.Mesh(
    buildRibbon(THREE, route, LANDMARKS.destinationYard, ROAD_END, 2, yardProfile, 18),
    yardMat,
  );
  yardDestination.position.y = 0.012;
  yardDestination.receiveShadow = true;

  return { highway, yardOrigin, yardDestination, wettable: [highwayMat, yardMat] };
}

/** Concrete jersey barriers / steel guardrails along stretches of highway. */
export function buildGuardrails(
  THREE: ThreeModule,
  route: Route,
  stretches: ReadonlyArray<readonly [from: number, to: number]>,
  material: Material,
): Mesh[] {
  const profile = (side: 1 | -1) =>
    side > 0
      ? ([
          [6.1, 0.0, 0],
          [6.15, 0.85, 0.5],
          [6.45, 0.85, 0.6],
          [6.5, 0.0, 1],
        ] as const)
      : ([
          [-6.5, 0.0, 0],
          [-6.45, 0.85, 0.4],
          [-6.15, 0.85, 0.5],
          [-6.1, 0.0, 1],
        ] as const);
  const meshes: Mesh[] = [];
  for (const [from, to] of stretches) {
    for (const side of [1, -1] as const) {
      const mesh = new THREE.Mesh(buildRibbon(THREE, route, from, to, 2, profile(side), 4), material);
      mesh.castShadow = false;
      mesh.receiveShadow = true;
      meshes.push(mesh);
    }
  }
  return meshes;
}

/** Deck slab under the road (bridge span, overpass look from the side). */
export function buildDeck(
  THREE: ThreeModule,
  route: Route,
  from: number,
  to: number,
  material: Material,
): Mesh {
  const profile = [
    [-6.6, 0.0, 0],
    [-6.6, -1.5, 0.2],
    [6.6, -1.5, 0.8],
    [6.6, 0.0, 1],
  ] as const;
  const mesh = new THREE.Mesh(buildRibbon(THREE, route, from, to, 2, profile, 8), material);
  mesh.receiveShadow = true;
  return mesh;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/sky.ts">
<![CDATA[import type { Color, Mesh, ShaderMaterial, Vector3 } from "three";

type ThreeModule = typeof import("three");

export type Sky = {
  mesh: Mesh;
  uniforms: {
    top: { value: Color };
    horizon: { value: Color };
    sunColor: { value: Color };
    sunDir: { value: Vector3 };
    stars: { value: number };
    clouds: { value: number };
    storm: { value: number };
    flash: { value: number };
    time: { value: number };
  };
};

const vertex = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`;

const fragment = /* glsl */ `
uniform vec3 top;
uniform vec3 horizon;
uniform vec3 sunColor;
uniform vec3 sunDir;
uniform float stars;
uniform float clouds;
uniform float storm;
uniform float flash;
uniform float time;
varying vec3 vDir;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < CLOUD_OCTAVES; i++) {
    s += noise(p) * a;
    p = p * 2.07 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return s;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  float up = clamp(h, 0.0, 1.0);
  vec3 col = mix(horizon, top, pow(smoothstep(0.0, 0.62, up), 0.75));

  float d = max(dot(dir, normalize(sunDir)), 0.0);
  float halo = pow(d, 6.0) * 0.28 + pow(d, 48.0) * 0.55;
  float disc = smoothstep(0.99955, 0.99975, d);
  float sunUp = smoothstep(-0.08, 0.04, sunDir.y);
  col += sunColor * (halo + disc * 6.0) * sunUp * (1.0 - storm * 0.85);

  // Stars on clear nights.
  if (stars > 0.001 && h > 0.0) {
    vec2 suv = vec2(atan(dir.x, dir.z) * 160.0, h * 260.0);
    vec2 cell = floor(suv);
    float rnd = hash(cell);
    vec2 f = fract(suv) - 0.5;
    float star = step(0.985, rnd) * smoothstep(0.35, 0.0, length(f));
    float tw = 0.65 + 0.35 * sin(time * (1.5 + rnd * 3.0) + rnd * 40.0);
    col += vec3(0.85, 0.9, 1.0) * star * tw * stars * smoothstep(0.02, 0.25, h) * 1.4;
  }

  // Clouds projected on a flat ceiling.
  if (h > 0.0) {
    vec2 uv = dir.xz / (h + 0.14) * 0.85 + vec2(time * 0.006, time * 0.002);
    float n = fbm(uv * 1.3);
    float threshold = mix(0.78, 0.28, clouds);
    float cover = smoothstep(threshold, threshold + 0.22, n);
    vec3 lit = mix(horizon * 1.08, sunColor, 0.22 + 0.5 * pow(d, 3.0) * sunUp);
    vec3 cloudCol = mix(mix(lit, top * 0.9 + horizon * 0.25, 0.25), top * 0.7 + horizon * 0.3, storm * 0.8);
    col = mix(col, cloudCol, cover * smoothstep(0.0, 0.12, h) * mix(0.75, 0.95, storm));
  }

  col += vec3(0.55, 0.6, 0.78) * flash;
  // Dither to hide gradient banding.
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export function buildSky(THREE: ThreeModule, cloudOctaves: number): Sky {
  const uniforms: Sky["uniforms"] = {
    top: { value: new THREE.Color(0x4f8fd0) },
    horizon: { value: new THREE.Color(0xdcebf3) },
    sunColor: { value: new THREE.Color(0xffffff) },
    sunDir: { value: new THREE.Vector3(0, 0.3, -1) },
    stars: { value: 0 },
    clouds: { value: 0.4 },
    storm: { value: 0 },
    flash: { value: 0 },
    time: { value: 0 },
  };
  const material: ShaderMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    defines: { CLOUD_OCTAVES: cloudOctaves },
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1500, 48, 24), material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -1;
  mesh.name = "sky";
  return { mesh, uniforms };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/splineRoute.ts">
<![CDATA[import { ROAD_END, ROAD_START, curvatureAt, elevationAt } from "../story";

/**
 * The road centerline, integrated once from the curvature program in
 * story.ts and cached as an arc-length lookup table (1 sample per meter).
 *
 * Heading 0 drives toward -Z; positive heading turns right (toward +X).
 * forward = (sin h, 0, -cos h), right = (cos h, 0, sin h).
 */

export type RouteFrame = {
  x: number;
  y: number;
  z: number;
  heading: number;
  /** Horizontal forward. */
  fx: number;
  fz: number;
  /** Horizontal right. */
  rx: number;
  rz: number;
  /** Road grade (dy/ds). */
  grade: number;
};

export function createFrame(): RouteFrame {
  return { x: 0, y: 0, z: 0, heading: 0, fx: 0, fz: -1, rx: 1, rz: 0, grade: 0 };
}

/** Samples are cached from here to well past the road end so terrain can extend. */
const LUT_START = ROAD_START - 60;
const LUT_END = ROAD_END + 260;

export class Route {
  readonly start = LUT_START;
  readonly end = LUT_END;
  private readonly xs: Float64Array;
  private readonly zs: Float64Array;
  private readonly hs: Float64Array;

  constructor() {
    const n = LUT_END - LUT_START + 1;
    this.xs = new Float64Array(n);
    this.zs = new Float64Array(n);
    this.hs = new Float64Array(n);

    // Integrate forward from s = 0 (origin at world 0,0) and backward to
    // LUT_START, in half-meter steps (midpoint rule) for accuracy.
    const i0 = -LUT_START;
    this.xs[i0] = 0;
    this.zs[i0] = 0;
    this.hs[i0] = 0;
    let x = 0;
    let z = 0;
    let h = 0;
    for (let i = i0 + 1; i < n; i++) {
      const s0 = i - 1 + LUT_START;
      for (let k = 0; k < 2; k++) {
        const sm = s0 + k * 0.5 + 0.25;
        const hm = h + curvatureAt(sm) * 0.25;
        x += Math.sin(hm) * 0.5;
        z -= Math.cos(hm) * 0.5;
        h += curvatureAt(sm) * 0.5;
      }
      this.xs[i] = x;
      this.zs[i] = z;
      this.hs[i] = h;
    }
    x = 0;
    z = 0;
    h = 0;
    for (let i = i0 - 1; i >= 0; i--) {
      const s0 = i + 1 + LUT_START;
      for (let k = 0; k < 2; k++) {
        const sm = s0 - k * 0.5 - 0.25;
        const hm = h - curvatureAt(sm) * 0.25;
        x -= Math.sin(hm) * 0.5;
        z += Math.cos(hm) * 0.5;
        h -= curvatureAt(sm) * 0.5;
      }
      this.xs[i] = x;
      this.zs[i] = z;
      this.hs[i] = h;
    }
  }

  /** Road frame at distance s (clamped to the cached range). */
  sample(sIn: number, out: RouteFrame): RouteFrame {
    const s = Math.max(LUT_START, Math.min(LUT_END - 0.0001, sIn));
    const f = s - LUT_START;
    const i = Math.floor(f);
    const t = f - i;
    const x = this.xs[i] + (this.xs[i + 1] - this.xs[i]) * t;
    const z = this.zs[i] + (this.zs[i + 1] - this.zs[i]) * t;
    const h = this.hs[i] + (this.hs[i + 1] - this.hs[i]) * t;
    // Past the cached range the road continues straight.
    const over = sIn - s;
    const sh = Math.sin(h);
    const ch = Math.cos(h);
    out.x = x + sh * over;
    out.z = z - ch * over;
    out.heading = h;
    out.fx = sh;
    out.fz = -ch;
    out.rx = ch;
    out.rz = sh;
    out.y = elevationAt(sIn);
    out.grade = (elevationAt(sIn + 1) - elevationAt(sIn - 1)) / 2;
    return out;
  }

  /** World position of a point `lat` meters right of the centerline, `up` above the road. */
  point(s: number, lat: number, up: number, frame: RouteFrame): { x: number; y: number; z: number } {
    this.sample(s, frame);
    return { x: frame.x + frame.rx * lat, y: frame.y + up, z: frame.z + frame.rz * lat };
  }
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/terrain.ts">
<![CDATA[import type { BufferGeometry, Mesh } from "three";
import { LANDMARKS, ROAD_END, elevationAt, smoothstep } from "../story";
import { fbm, hash2, valueNoise } from "./noise";
import { createFrame, type Route } from "./splineRoute";

type ThreeModule = typeof import("three");

/** Height of the flat ground plane beyond the terrain strip. */
export const FAR_GROUND_Y = -3;

const L = LANDMARKS;

function band(s: number, from: number, to: number, soft: number): number {
  return smoothstep(from - soft, from + soft, s) - smoothstep(to - soft, to + soft, s);
}

/** Hill amplitude by zone: yards and city are flat, countryside and forest roll. */
function hillAmplitude(s: number): number {
  const yards = Math.max(1 - smoothstep(30, 90, s), smoothstep(1150, 1200, s));
  const city = band(s, L.cityFrom + 30, L.cityTo - 40, 40);
  const forest = band(s, L.forestFrom, 1160, 40);
  const base = 16 + forest * 10;
  return base * (1 - yards) * (1 - city * 0.85);
}

function riverDip(s: number): number {
  return -13.5 * (1 - smoothstep(12, 44, Math.abs(s - L.river)));
}

/** Terrain height at road distance s and lateral offset lat (meters). */
export function terrainHeight(s: number, lat: number): number {
  const road = elevationAt(s);
  const a = Math.abs(lat);
  const dip = riverDip(s);

  // Road bed + shallow ditches.
  let h = road - 0.28 - 0.9 * (smoothstep(6.4, 8.2, a) - smoothstep(9.5, 13, a));
  // Hills rise away from the road.
  const far = smoothstep(12, 70, a);
  const n = fbm(s * 0.0085 + 11.3, lat * 0.0105 + (lat < 0 ? 40 : 0), 4);
  h += (n - 0.32) * hillAmplitude(s) * far;
  // Ridge line that frames the horizon on both sides.
  h += smoothstep(120, 230, a) * 18 * valueNoise(s * 0.004, lat < 0 ? 3 : 9) * (1 - smoothstep(1150, 1200, s));
  // River valley cuts under the bridge.
  h += dip * (a < 9 ? 1 : 1 - smoothstep(40, 150, a) * 0.6);
  // Tunnel hill.
  const tunnel = band(s, L.tunnelFrom + 6, L.tunnelTo - 6, 14);
  h += tunnel * 23 * smoothstep(8.5, 20, a) * (1 - smoothstep(60, 160, a) * 0.5);
  // Fade into the far ground plane.
  const edge = smoothstep(210, 300, a);
  return h * (1 - edge) + FAR_GROUND_Y * edge;
}

type RGB = [number, number, number];
const hex = (c: number): RGB => [((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255];

const GRASS = hex(0x7fa257);
const GRASS_LIGHT = hex(0x9fba68);
const WHEAT = hex(0xd2b872);
const SOIL = hex(0x8e6e4e);
const MEADOW = hex(0x6f9650);
const FOREST = hex(0x3f5c38);
const CONCRETE = hex(0xb7b0a3);
const GRAVEL = hex(0x958f84);
const SAND = hex(0xc4ae84);
const CITY = hex(0x8c9186);
const RIDGE = hex(0x6d8a5a);

const FIELDS = [GRASS, GRASS_LIGHT, WHEAT, SOIL, MEADOW, GRASS, WHEAT];

function mix(a: RGB, b: RGB, t: number, out: RGB): RGB {
  out[0] = a[0] + (b[0] - a[0]) * t;
  out[1] = a[1] + (b[1] - a[1]) * t;
  out[2] = a[2] + (b[2] - a[2]) * t;
  return out;
}

const tmpA: RGB = [0, 0, 0];

function terrainColor(s: number, lat: number, h: number, out: RGB): RGB {
  const a = Math.abs(lat);
  // Field patchwork.
  const field = FIELDS[Math.floor(hash2(Math.floor(s / 58), Math.floor((lat + 1000) / 46)) * FIELDS.length)];
  mix(field, RIDGE, smoothstep(90, 200, a), tmpA);
  // Forest zone darkens toward the storm.
  mix(tmpA, FOREST, band(s, L.forestFrom, 1170, 50), tmpA);
  // City ground.
  mix(tmpA, CITY, band(s, L.cityFrom + 20, L.cityTo - 30, 30) * 0.85, tmpA);
  // Yards.
  const yard = Math.max(1 - smoothstep(40, 75, s), smoothstep(1170, 1200, s)) * (1 - smoothstep(66, 84, a));
  mix(tmpA, CONCRETE, yard, tmpA);
  // River banks.
  const bank = smoothstep(-4, -9, h - elevationAt(s)) * (1 - smoothstep(30, 60, Math.abs(s - L.river)));
  mix(tmpA, SAND, bank, tmpA);
  // Gravel shoulder next to the pavement (and the tunnel floor).
  const tunnelFloor = band(s, L.tunnelFrom - 2, L.tunnelTo + 2, 2) * (1 - smoothstep(9, 10, a));
  mix(tmpA, GRAVEL, Math.max(1 - smoothstep(6.2, 8, a), tunnelFloor), tmpA);
  // Subtle mottling so large faces are not flat color.
  const m = 0.9 + valueNoise(s * 0.05, lat * 0.05) * 0.2;
  out[0] = tmpA[0] * m;
  out[1] = tmpA[1] * m;
  out[2] = tmpA[2] * m;
  return out;
}

const LATERALS = [0, 5.9, 7, 8.4, 10.2, 12.6, 15.5, 19, 23.5, 29, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 282, 330];

/** Terrain strip that follows the road, flat-shaded low-poly with vertex colors. */
export function buildTerrain(THREE: ThreeModule, route: Route, rowStep: number): Mesh {
  const lats: number[] = [];
  for (let i = LATERALS.length - 1; i > 0; i--) lats.push(-LATERALS[i]);
  for (const l of LATERALS) lats.push(l);
  const cols = lats.length;
  const sFrom = route.start;
  const sTo = ROAD_END + 240;
  const rows = Math.floor((sTo - sFrom) / rowStep) + 1;

  const positions = new Float32Array(rows * cols * 3);
  const colors = new Float32Array(rows * cols * 3);
  const frame = createFrame();
  const c: RGB = [0, 0, 0];
  for (let r = 0; r < rows; r++) {
    const s = sFrom + r * rowStep;
    route.sample(s, frame);
    for (let k = 0; k < cols; k++) {
      // Jitter far vertices a little so the low-poly facets don't look gridded.
      const lat = lats[k] + (Math.abs(lats[k]) > 20 ? (hash2(r, k) - 0.5) * 6 : 0);
      const h = terrainHeight(s, lat);
      const i = (r * cols + k) * 3;
      positions[i] = frame.x + frame.rx * lat;
      positions[i + 1] = h;
      positions[i + 2] = frame.z + frame.rz * lat;
      terrainColor(s, lat, h, c);
      colors[i] = c[0];
      colors[i + 1] = c[1];
      colors[i + 2] = c[2];
    }
  }

  const index: number[] = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let k = 0; k < cols - 1; k++) {
      const a = r * cols + k;
      const b = a + 1;
      const d = a + cols;
      const e = d + 1;
      // Alternate the diagonal for a less regular facet pattern.
      // Counter-clockwise seen from above.
      if ((r + k) % 2 === 0) index.push(a, b, d, b, e, d);
      else index.push(a, e, d, a, b, e);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(index);
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.96,
    metalness: 0,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  mesh.name = "terrain";
  return mesh;
}

/** Huge flat ground under everything that fades into the fog at the horizon. */
export function buildFarGround(THREE: ThreeModule, route: Route): Mesh {
  const frame = createFrame();
  route.sample(600, frame);
  const geometry: BufferGeometry = new THREE.CircleGeometry(4200, 48);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0x6f8a58, roughness: 1, metalness: 0 }),
  );
  mesh.position.set(frame.x, FAR_GROUND_Y - 0.4, frame.z);
  mesh.receiveShadow = false;
  mesh.name = "far-ground";
  return mesh;
}

/** River surface crossing under the bridge. */
export function buildRiver(THREE: ThreeModule, route: Route): Mesh {
  const frame = createFrame();
  route.sample(L.river, frame);
  const geometry = new THREE.PlaneGeometry(56, 900, 1, 1);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3f7394,
    roughness: 0.12,
    metalness: 0.2,
    envMapIntensity: 1.4,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // The plane's long axis runs across the road (along the right vector).
  mesh.rotation.y = -frame.heading + Math.PI / 2;
  mesh.position.set(frame.x, elevationAt(L.river) - 9.2, frame.z);
  mesh.receiveShadow = true;
  mesh.name = "river";
  return mesh;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/textures.ts">
<![CDATA[import type { CanvasTexture } from "three";
import { createRng } from "./noise";

type ThreeModule = typeof import("three");

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");
  return [c, ctx];
}

function toTexture(THREE: ThreeModule, c: HTMLCanvasElement, srgb = true): CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

const SIGN_FONT = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

/**
 * Highway asphalt, 11.2 m wide x 12 m long per tile: shoulders, solid edge
 * lines, a dashed center line (3 m dash / 9 m gap) and worn wheel paths.
 */
export function asphaltTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 512;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  const px = (m: number) => ((m + 5.6) / 11.2) * W;
  ctx.fillStyle = "#3a3f45";
  ctx.fillRect(0, 0, W, H);
  // Shoulders.
  ctx.fillStyle = "#555a5f";
  ctx.fillRect(0, 0, px(-4.2), H);
  ctx.fillRect(px(4.2), 0, W - px(4.2), H);
  // Worn wheel paths (slightly darker, smoother).
  ctx.fillStyle = "rgba(20,24,28,0.22)";
  for (const lane of [-1.95, 1.95]) {
    ctx.fillRect(px(lane - 1.15), 0, px(-5.6 + 0.55), H);
    ctx.fillRect(px(lane + 0.6), 0, px(-5.6 + 0.55), H);
  }
  // Aggregate speckle.
  const rng = createRng(7);
  for (let i = 0; i < 9000; i++) {
    const v = rng();
    ctx.fillStyle = v > 0.5 ? `rgba(255,255,255,${0.04 + rng() * 0.07})` : `rgba(0,0,0,${0.06 + rng() * 0.1})`;
    ctx.fillRect(rng() * W, rng() * H, 1 + rng() * 1.5, 1 + rng() * 1.5);
  }
  // Tar-sealed cracks.
  ctx.strokeStyle = "rgba(15,17,20,0.45)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 5; i++) {
    let x = px(-3.6) + rng() * (px(3.6) - px(-3.6));
    let y = rng() * H;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let k = 0; k < 6; k++) {
      x += (rng() - 0.5) * 24;
      y += 10 + rng() * 22;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // Edge lines.
  ctx.fillStyle = "rgba(242,240,232,0.92)";
  ctx.fillRect(px(-4.05), 0, px(-5.6 + 0.16), H);
  ctx.fillRect(px(3.89), 0, px(-5.6 + 0.16), H);
  // Center dash.
  ctx.fillRect(px(-0.075), 0, px(-5.6 + 0.15), (3 / 12) * H);
  const t = toTexture(THREE, c);
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  return t;
}

/** Concrete yard apron with slab joints. */
export function concreteTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 512;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  ctx.fillStyle = "#9b968c";
  ctx.fillRect(0, 0, W, H);
  const rng = createRng(11);
  for (let i = 0; i < 7000; i++) {
    ctx.fillStyle = rng() > 0.5 ? `rgba(255,255,255,${rng() * 0.08})` : `rgba(0,0,0,${rng() * 0.08})`;
    ctx.fillRect(rng() * W, rng() * H, 2, 2);
  }
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = `rgba(60,55,50,${0.04 + rng() * 0.06})`;
    ctx.beginPath();
    ctx.ellipse(rng() * W, rng() * H, 20 + rng() * 60, 10 + rng() * 30, rng() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(70,66,60,0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  // Faded yellow lane guides.
  ctx.fillStyle = "rgba(226,178,52,0.55)";
  ctx.fillRect(4, 0, 7, H);
  ctx.fillRect(W - 11, 0, 7, H);
  const t = toTexture(THREE, c);
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = anisotropy;
  return t;
}

/** Soft round glow (for lamp pools, particles, flares). White, alpha falloff. */
export function glowTexture(THREE: ThreeModule, size = 128, hardness = 0): CanvasTexture {
  const [c, ctx] = canvas(size, size);
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(Math.min(0.9, 0.2 + hardness), "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return toTexture(THREE, c, false);
}

/** Headlight throw on the road: a widening, fading trapezoid. */
export function headlightPoolTexture(THREE: ThreeModule): CanvasTexture {
  const W = 256;
  const H = 256;
  const [c, ctx] = canvas(W, H);
  const grad = ctx.createLinearGradient(0, H, 0, 0);
  grad.addColorStop(0, "rgba(255,255,255,0.0)");
  grad.addColorStop(0.08, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.45, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(W * 0.36, H);
  ctx.lineTo(W * 0.64, H);
  ctx.lineTo(W, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  // Feather the sides.
  const side = ctx.createLinearGradient(0, 0, W, 0);
  side.addColorStop(0, "rgba(0,0,0,1)");
  side.addColorStop(0.3, "rgba(0,0,0,0)");
  side.addColorStop(0.7, "rgba(0,0,0,0)");
  side.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, W, H);
  return toTexture(THREE, c, false);
}

/** Vertical light beam gradient (bright at the source, fading out). */
export function beamTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(64, 256);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 256);
  const side = ctx.createLinearGradient(0, 0, 64, 0);
  side.addColorStop(0, "rgba(0,0,0,1)");
  side.addColorStop(0.5, "rgba(0,0,0,0)");
  side.addColorStop(1, "rgba(0,0,0,1)");
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = side;
  ctx.fillRect(0, 0, 64, 256);
  return toTexture(THREE, c, false);
}

/** Scanner curtain: vertical scan lines with a bright bottom edge. */
export function scannerTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(256, 128);
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgba(255,255,255,0.75)");
  g.addColorStop(0.18, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0.05)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let x = 0; x < 256; x += 16) ctx.fillRect(x, 0, 1, 128);
  const t = toTexture(THREE, c, false);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

type SignOptions = {
  width: number;
  height: number;
  background: string;
  border?: string;
  lines: Array<{ text: string; size: number; color: string; weight?: number; y: number; font?: string; tracking?: number }>;
};

/** Generic sign panel (highway sign, facade lettering, gantry board). */
export function signTexture(THREE: ThreeModule, o: SignOptions, anisotropy: number): CanvasTexture {
  const [c, ctx] = canvas(o.width, o.height);
  ctx.fillStyle = o.background;
  ctx.fillRect(0, 0, o.width, o.height);
  if (o.border) {
    ctx.strokeStyle = o.border;
    ctx.lineWidth = Math.max(4, o.height * 0.03);
    const inset = ctx.lineWidth * 1.4;
    roundRect(ctx, inset, inset, o.width - inset * 2, o.height - inset * 2, o.height * 0.06);
    ctx.stroke();
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const line of o.lines) {
    ctx.fillStyle = line.color;
    ctx.font = `${line.weight ?? 700} ${line.size}px ${line.font ?? SIGN_FONT}`;
    let x = o.width / 2;
    if (line.tracking && "letterSpacing" in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${line.tracking}px`;
      // Tracking also trails the last glyph; shift right by half so the text stays centered.
      x += line.tracking / 2;
    }
    ctx.fillText(line.text, x, line.y);
    if ("letterSpacing" in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "0px";
    }
  }
  const t = toTexture(THREE, c);
  t.anisotropy = anisotropy;
  return t;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Cargo-box livery: the HighwayTMS brand mark and wordmark, centered.
 * The mark SVG loads asynchronously and is painted in when ready.
 */
export function liveryTexture(THREE: ThreeModule, anisotropy: number): CanvasTexture {
  const W = 1024;
  const H = 512;
  const [c, ctx] = canvas(W, H);
  const texture = toTexture(THREE, c);
  texture.anisotropy = anisotropy;

  const paint = (mark: HTMLImageElement | null) => {
    ctx.clearRect(0, 0, W, H);
    // Brand lockup (mark + wordmark + tagline), centered on the box side.
    const markSize = H * 0.36;
    const gap = mark ? 28 : 0;
    const titleFont = `800 ${Math.round(H * 0.2)}px ${SIGN_FONT}`;
    const tagFont = `600 ${Math.round(H * 0.075)}px ${SIGN_FONT}`;
    ctx.font = titleFont;
    const titleWidth = ctx.measureText("KINETIC").width;
    ctx.font = tagFont;
    const tagWidth = ctx.measureText("Megamarket drops, delivered by hand.").width + 4;
    const lockupWidth = (mark ? markSize + gap : 0) + Math.max(titleWidth, tagWidth);
    const left = (W - lockupWidth) / 2;
    const top = (H - markSize) / 2;
    const textX = mark ? left + markSize + gap : left;
    if (mark) ctx.drawImage(mark, left, top, markSize, markSize);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#10263D";
    ctx.font = titleFont;
    ctx.fillText("KINETIC", textX, top + H * 0.23);
    ctx.fillStyle = "#2F5D7C";
    ctx.font = tagFont;
    ctx.fillText("Megamarket drops, delivered by hand.", textX + 4, top + H * 0.35);
    texture.needsUpdate = true;
  };
  paint(null);
  const img = new Image();
  img.decoding = "async";
  img.onload = () => paint(img);
  img.src = "/templates/kinetic/icon.svg";
  return texture;
}

/** Roll-up dock door (corrugated slats). */
export function dockDoorTexture(THREE: ThreeModule): CanvasTexture {
  const [c, ctx] = canvas(128, 128);
  ctx.fillStyle = "#c9cdd0";
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 8) {
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(0, y, 128, 2);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(0, y + 2, 128, 1);
  }
  ctx.fillStyle = "#e0a238";
  ctx.fillRect(0, 118, 128, 10);
  return toTexture(THREE, c);
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/truck.ts">
<![CDATA[import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
  Texture,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type ThreeModule = typeof import("three");

/**
 * Procedural box truck built as a rig:
 *
 *   root      road position + heading (driven by the engine), world scale
 *   └ model   lifts the model so tires touch y = 0
 *     ├ chassis     frame, bumper, tanks — rigid with the axles
 *     ├ wheels[]    spin (rotation.z); front pair sits in steer pivots (rotation.y)
 *     └ bodyPivot   suspension: pitch (rotation.z), roll (rotation.x), bounce (y)
 *       └ body      cab, cargo box, livery, lamps
 *
 * Model space: forward +X, up +Y, right +Z. Static parts are merged per
 * material so the truck costs ~30 draw calls instead of ~120.
 */

export const TRUCK_SCALE = 1.55;
/** Tire radius in model units. */
const WHEEL_R = 0.42;
/** Model units from the old chassis origin down to the tire contact patch. */
const GROUND = 1.16;
/** Body pivot height (model units) for pitch/roll. */
const PIVOT_Y = -0.45;
/**
 * Extra cargo-box length (model units) behind the cab. Everything aft of
 * the cab (box, rails, rear tandem, rear lamps) is laid out relative to it.
 */
const EXT = 2.6;
/** Rear face of the cargo box. */
const REAR = -2.6 - EXT;
/** Shift that keeps the longer truck centered on its road position. */
const CENTER = EXT / 2;
/** Box length/center: front edge stays just behind the cab at x = 0.68. */
const BOX_LEN = 3.2 + EXT;
const BOX_X = 0.68 - BOX_LEN / 2;
/** Axles: a front pair (steer + one behind it) and a rear tandem. */
const FRONT_AXLES = [1.55, 0.55] as const;
const REAR_AXLES = [-1.05 - EXT, -2.0 - EXT] as const;
/** Model-space x of the headlights after centering (for lights parented to the root). */
export const TRUCK_NOSE_X = 2.6 + CENTER;

export type TruckLights = {
  head: MeshPhysicalMaterial;
  tail: MeshPhysicalMaterial;
  reverse: MeshPhysicalMaterial;
  signalLeft: MeshPhysicalMaterial;
  signalRight: MeshPhysicalMaterial;
  marker: MeshPhysicalMaterial;
  beam: ShaderMaterial;
  pool: MeshBasicMaterial;
};

export type TruckRig = {
  root: Group;
  bodyPivot: Group;
  wheels: Group[];
  steer: Group[];
  lights: TruckLights;
  blob: Mesh;
  /** Model-space emitters for particles. */
  emitters: {
    rearWheels: Array<[number, number, number]>;
    exhaust: [number, number, number];
  };
  /** World meters per model unit along the ground (for wheel spin). */
  wheelRadiusWorld: number;
};

class PartSet {
  private readonly byMaterial = new Map<Material, BufferGeometry[]>();
  constructor(private readonly THREE: ThreeModule) {}

  add(geometry: BufferGeometry, material: Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) {
    const THREE = this.THREE;
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    let g = geometry.index ? geometry.toNonIndexed() : geometry;
    if (g === geometry) g = geometry.clone();
    g.applyMatrix4(m);
    // Only keep the attributes every part shares so merging never fails.
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
    }
    geometry.dispose();
    const list = this.byMaterial.get(material) ?? [];
    list.push(g);
    this.byMaterial.set(material, list);
  }

  build(parent: Group, castShadow = true): Mesh[] {
    const meshes: Mesh[] = [];
    for (const [material, list] of this.byMaterial) {
      const merged = mergeGeometries(list, false);
      for (const g of list) g.dispose();
      if (!merged) continue;
      const mesh = new this.THREE.Mesh(merged, material);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = true;
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.byMaterial.clear();
    return meshes;
  }
}

const beamVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const beamFragment = /* glsl */ `
uniform vec3 color;
uniform float intensity;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float along = pow(clamp(vUv.y, 0.0, 1.0), 2.2);
  float facing = pow(abs(dot(normalize(vNormal), normalize(vView))), 1.6);
  float a = along * facing * intensity;
  gl_FragColor = vec4(color * a, a);
}
`;

export function buildTruck(
  THREE: ThreeModule,
  livery: Texture,
  glow: Texture,
  pool: Texture,
): TruckRig {
  const root = new THREE.Group();
  root.name = "truck";
  root.scale.setScalar(TRUCK_SCALE);
  const model = new THREE.Group();
  model.position.set(CENTER, GROUND, 0);
  root.add(model);
  const chassis = new THREE.Group();
  const bodyPivot = new THREE.Group();
  bodyPivot.position.y = PIVOT_Y;
  const body = new THREE.Group();
  body.position.y = -PIVOT_Y;
  bodyPivot.add(body);
  model.add(chassis, bodyPivot);

  // Materials ---------------------------------------------------------
  const paint = new THREE.MeshPhysicalMaterial({ color: 0x2b5f86, metalness: 0.45, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12 });
  const paintDark = new THREE.MeshPhysicalMaterial({ color: 0x173f5c, metalness: 0.5, roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.2 });
  const accent = new THREE.MeshPhysicalMaterial({ color: 0xf26a2e, metalness: 0.2, roughness: 0.35, clearcoat: 0.8 });
  const cargo = new THREE.MeshPhysicalMaterial({ color: 0xf1f3f4, metalness: 0.08, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x15181b, metalness: 0, roughness: 0.92 });
  const dark: MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x1c252d, metalness: 0.35, roughness: 0.55 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xd5dee5, metalness: 1, roughness: 0.14 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0f2230, metalness: 0.2, roughness: 0.05, clearcoat: 1, envMapIntensity: 1.6 });
  const lamp = (color: number, emissive: number) =>
    new THREE.MeshPhysicalMaterial({ color, emissive, emissiveIntensity: 0.4, roughness: 0.15, metalness: 0.1 });
  const lights: TruckLights = {
    head: lamp(0xf4f8ff, 0xfff4e0),
    tail: lamp(0x7a1016, 0xff1f2a),
    reverse: lamp(0xdddddd, 0xffffff),
    signalLeft: lamp(0x8a4a10, 0xff9a1a),
    signalRight: lamp(0x8a4a10, 0xff9a1a),
    marker: lamp(0x8a4a10, 0xffa630),
    beam: new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(0xfff1d6) }, intensity: { value: 0 } },
      vertexShader: beamVertex,
      fragmentShader: beamFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    pool: new THREE.MeshBasicMaterial({
      map: pool,
      color: 0xfff0d2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    }),
  };
  lights.reverse.emissiveIntensity = 0;
  lights.signalLeft.emissiveIntensity = 0;
  lights.signalRight.emissiveIntensity = 0;

  // Geometry helpers ------------------------------------------------------
  const box = (w: number, h: number, d: number, r = 0): BufferGeometry => {
    if (!r) return new THREE.BoxGeometry(w, h, d);
    const hw = w / 2;
    const hh = h / 2;
    const rr = Math.min(r, hw, hh);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + rr, -hh);
    shape.lineTo(hw - rr, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + rr);
    shape.lineTo(hw, hh - rr);
    shape.quadraticCurveTo(hw, hh, hw - rr, hh);
    shape.lineTo(-hw + rr, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - rr);
    shape.lineTo(-hw, -hh + rr);
    shape.quadraticCurveTo(-hw, -hh, -hw + rr, -hh);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: Math.min(rr * 0.22, 0.035),
      bevelThickness: Math.min(rr * 0.18, 0.03),
      curveSegments: 5,
      steps: 1,
    });
    g.center();
    return g;
  };
  const cyl = (radius: number, length: number, segments = 24, radiusTop = radius) =>
    new THREE.CylinderGeometry(radiusTop, radius, length, segments);
  const X = (g: BufferGeometry) => g.rotateZ(Math.PI / 2);
  const Z = (g: BufferGeometry) => g.rotateX(Math.PI / 2);

  // Chassis -----------------------------------------------------------------
  const c = new PartSet(THREE);
  c.add(box(5.35 + EXT, 0.18, 1.3, 0.04), dark, -EXT / 2, -0.72, 0);
  c.add(box(4.85 + EXT, 0.12, 0.12), dark, -0.05 - EXT / 2, -0.56, 0.52);
  c.add(box(4.85 + EXT, 0.12, 0.12), dark, -0.05 - EXT / 2, -0.56, -0.52);
  c.add(box(0.24, 0.22, 1.72, 0.05), chrome, 2.52, -0.66, 0);
  c.add(box(0.16, 0.12, 1.62, 0.025), chrome, REAR - 0.08, -0.74, 0);
  for (const side of [-1, 1]) {
    // Fuel tank between the front axles and the rear tandem.
    c.add(X(cyl(0.23, 0.85, 22)), chrome, -0.55, -0.55, side * 0.8);
    c.add(box(0.64, 0.1, 0.28, 0.025), chrome, 1.52, -0.66, side * 0.83);
    // Mud flaps behind each axle group.
    c.add(box(0.04, 0.42, 0.34), rubber, REAR_AXLES[1] - 0.42, -0.86, side * 0.72);
    c.add(box(0.04, 0.42, 0.34), rubber, FRONT_AXLES[1] - 0.6, -0.86, side * 0.72);
  }
  c.build(chassis);

  // Body -------------------------------------------------------------------
  const b = new PartSet(THREE);
  // Cargo box.
  b.add(box(BOX_LEN, 2.05, 1.62, 0.1), cargo, BOX_X, 0.4, 0);
  b.add(box(BOX_LEN + 0.06, 0.12, 1.68, 0.04), paintDark, BOX_X, 1.42, 0);
  b.add(box(BOX_LEN - 0.1, 0.18, 1.68, 0.03), paint, BOX_X, -0.54, 0);
  // Rear door and frame.
  b.add(box(0.055, 1.72, 1.42, 0.02), cargo, REAR + 0.06, 0.36, 0);
  b.add(box(0.075, 1.8, 0.055), chrome, REAR + 0.02, 0.36, 0.68);
  b.add(box(0.075, 1.8, 0.055), chrome, REAR + 0.02, 0.36, -0.68);
  b.add(box(0.075, 0.055, 1.4), chrome, REAR + 0.02, 1.22, 0);
  b.add(box(0.075, 0.055, 1.4), chrome, REAR + 0.02, -0.5, 0);
  for (let y = -0.35; y < 1.12; y += 0.24) b.add(box(0.018, 0.025, 1.32), dark, REAR - 0.02, y, 0);
  // Cab (cab-over).
  b.add(box(1.72, 1.72, 1.54, 0.14), paint, 1.56, 0.2, 0);
  b.add(box(1.48, 0.26, 1.5, 0.07), paintDark, 1.62, 1.12, 0);
  b.add(box(0.18, 1.44, 1.44, 0.06), paintDark, 2.39, 0.13, 0);
  // Roof fairing up to the box height.
  b.add(box(0.9, 0.3, 1.46, 0.08), paint, 1.28, 1.36, 0);
  // Orange accent sweep on the cab.
  b.add(box(1.6, 0.08, 1.57, 0.03), accent, 1.58, -0.28, 0);
  // Windshield + side windows.
  b.add(box(0.035, 0.72, 1.24, 0.035), glass, 2.495, 0.55, 0, 0, 0, -0.03);
  b.add(box(0.8, 0.62, 0.03, 0.05), glass, 1.8, 0.56, 0.785);
  b.add(box(0.8, 0.62, 0.03, 0.05), glass, 1.8, 0.56, -0.785);
  // Door seams and handles.
  for (const side of [-1, 1]) {
    b.add(box(0.018, 1.12, 0.028), dark, 1.3, 0.05, side * 0.795);
    b.add(box(0.19, 0.045, 0.035, 0.01), chrome, 1.66, 0.03, side * 0.805);
  }
  // Grille.
  b.add(box(0.055, 0.52, 0.82, 0.04), dark, 2.515, -0.16, 0);
  for (let z = -0.3; z <= 0.31; z += 0.15) b.add(box(0.025, 0.38, 0.028), chrome, 2.552, -0.16, z);
  // Mirrors.
  for (const side of [-1, 1]) {
    b.add(Z(cyl(0.025, 0.43, 10)), dark, 2.09, 0.64, side * 0.92);
    b.add(box(0.16, 0.34, 0.07, 0.035), dark, 2.1, 0.66, side * 1.12);
    b.add(box(0.12, 0.26, 0.018, 0.025), chrome, 2.1, 0.66, side * 1.16);
  }
  // Exhaust stack behind the cab.
  b.add(cyl(0.07, 1.9, 14), chrome, 0.64, 1.0, 0.7);
  b.add(cyl(0.085, 0.5, 14), dark, 0.64, 0.25, 0.7);
  // Fenders.
  for (const side of [-1, 1]) {
    // One fender over each axle pair.
    b.add(box(1.98, 0.12, 0.24, 0.04), paintDark, (FRONT_AXLES[0] + FRONT_AXLES[1]) / 2, -0.31, side * 0.76);
    b.add(box(2.16, 0.12, 0.24, 0.04), paintDark, (REAR_AXLES[0] + REAR_AXLES[1]) / 2, -0.31, side * 0.76);
  }
  // Lamps.
  b.add(box(0.06, 0.24, 0.3, 0.035), lights.head, 2.565, 0.03, 0.54);
  b.add(box(0.06, 0.24, 0.3, 0.035), lights.head, 2.565, 0.03, -0.54);
  b.add(box(0.064, 0.11, 0.22, 0.03), lights.signalRight, 2.57, -0.2, 0.65);
  b.add(box(0.064, 0.11, 0.22, 0.03), lights.signalLeft, 2.57, -0.2, -0.65);
  b.add(box(0.075, 0.2, 0.22, 0.03), lights.tail, REAR - 0.06, -0.44, 0.58);
  b.add(box(0.075, 0.2, 0.22, 0.03), lights.tail, REAR - 0.06, -0.44, -0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.reverse, REAR - 0.06, -0.24, 0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.reverse, REAR - 0.06, -0.24, -0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.signalRight, REAR - 0.06, -0.62, 0.66);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.signalLeft, REAR - 0.06, -0.62, -0.66);
  // Roof marker lamps (cab) and side markers along the box.
  for (const z of [-0.45, -0.15, 0.15, 0.45]) b.add(box(0.06, 0.05, 0.09), lights.marker, 2.04, 1.52, z);
  for (const side of [-1, 1]) {
    for (let x = REAR + 0.3; x <= 0.35; x += 0.9) b.add(box(0.1, 0.05, 0.03), lights.marker, x, -0.5, side * 0.855);
    b.add(box(0.06, 0.06, 0.03), lights.marker, REAR + 0.15, 1.36, side * 0.842);
  }
  b.build(body);

  // Livery decals on both box sides. The rounded box's bevel puts its side
  // faces at z = +-0.828, so the decals sit just outside that (inside it they
  // z-fight and flicker in and out as the camera moves).
  const liveryMat = new THREE.MeshStandardMaterial({
    map: livery,
    transparent: true,
    roughness: 0.45,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const decalGeo = new THREE.PlaneGeometry(2.98, 1.49);
  const decalR = new THREE.Mesh(decalGeo, liveryMat);
  decalR.position.set(BOX_X, 0.42, 0.834);
  const decalL = new THREE.Mesh(decalGeo, liveryMat);
  decalL.position.set(BOX_X, 0.42, -0.834);
  decalL.rotation.y = Math.PI;
  body.add(decalR, decalL);


  // Headlight beams (volumetric cones) and the pool they throw on the road.
  const beamGeo = new THREE.ConeGeometry(1.5, 9, 20, 1, true);
  beamGeo.rotateZ(Math.PI / 2);
  beamGeo.translate(4.5, 0, 0);
  for (const z of [0.54, -0.54]) {
    const beam = new THREE.Mesh(beamGeo, lights.beam);
    beam.position.set(2.6, 0.03, z);
    beam.rotation.z = -0.06;
    beam.renderOrder = 5;
    body.add(beam);
  }
  const poolMesh = new THREE.Mesh(new THREE.PlaneGeometry(9, 13), lights.pool);
  poolMesh.rotation.x = -Math.PI / 2;
  poolMesh.rotation.z = -Math.PI / 2;
  poolMesh.position.set(9.4 + CENTER, 0.04, 0);
  poolMesh.renderOrder = 4;
  root.add(poolMesh);

  // Contact shadow (always on; real shadows are added on capable devices).
  const blob = new THREE.Mesh(
    new THREE.PlaneGeometry(6.8 + EXT, 2.9),
    new THREE.MeshBasicMaterial({ color: 0x000000, map: glow, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  blob.rotation.x = -Math.PI / 2;
  blob.position.set(-0.1 - EXT / 2 + CENTER, 0.03, 0);
  blob.renderOrder = 3;
  root.add(blob);

  // Wheels -------------------------------------------------------------------
  const w = new PartSet(THREE);
  const width = 0.27;
  w.add(Z(cyl(WHEEL_R, width, 32)), rubber, 0, 0, 0);
  w.add(Z(cyl(WHEEL_R * 0.6, width * 1.04, 24)), chrome, 0, 0, 0);
  w.add(Z(cyl(WHEEL_R * 0.2, width * 1.1, 16)), dark, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    w.add(Z(cyl(WHEEL_R * 0.05, width * 1.12, 8)), dark, Math.cos(a) * WHEEL_R * 0.38, Math.sin(a) * WHEEL_R * 0.38, 0);
  }
  // Tread blocks so rotation reads.
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    w.add(box(0.012, 0.03, width * 0.9), dark, Math.cos(a) * (WHEEL_R - 0.004), Math.sin(a) * (WHEEL_R - 0.004), 0, 0, 0, a);
  }
  const template = new THREE.Group();
  w.build(template);

  const wheels: Group[] = [];
  const steer: Group[] = [];
  // Two axles up front (only the leading one steers) and two at the back:
  // the same number of wheels front and rear.
  const positions: Array<[number, number, number, boolean]> = [];
  FRONT_AXLES.forEach((x, i) => {
    for (const z of [0.84, -0.84]) positions.push([x, -0.74, z, i === 0]);
  });
  for (const x of REAR_AXLES) {
    for (const z of [0.84, -0.84]) positions.push([x, -0.74, z, false]);
  }
  for (const [x, y, z, front] of positions) {
    const wheel = template.clone();
    wheels.push(wheel);
    if (front) {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, z);
      pivot.add(wheel);
      steer.push(pivot);
      chassis.add(pivot);
    } else {
      wheel.position.set(x, y, z);
      chassis.add(wheel);
    }
  }

  return {
    root,
    bodyPivot,
    wheels,
    steer,
    lights,
    blob,
    emitters: {
      // Root-space points (the model is offset by CENTER inside the root).
      rearWheels: REAR_AXLES.flatMap((x) => [
        [x + CENTER, -0.95 + GROUND, 0.9] as [number, number, number],
        [x + CENTER, -0.95 + GROUND, -0.9] as [number, number, number],
      ]),
      exhaust: [0.64 + CENTER, 1.98 + GROUND, 0.7],
    },
    wheelRadiusWorld: WHEEL_R * TRUCK_SCALE,
  };
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/city.ts">
<![CDATA[import type { MeshBasicMaterial, MeshStandardMaterial, Texture } from "three";
import { LANDMARKS, smoothstep } from "../../story";
import { createRng } from "../noise";
import { buildGuardrails } from "../road";
import { createFrame } from "../splineRoute";
import { signTexture } from "../textures";
import { Batch, baseBox, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

/**
 * Building material with procedural windows: a grid derived from each
 * instance's own size, randomly lit, glowing at night. No textures, so
 * any building size gets correctly proportioned windows.
 */
function buildingMaterial(ctx: SceneryContext): MeshStandardMaterial {
  const { THREE } = ctx;
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.25 });
  const uniforms = {
    windowGlow: { value: 0 },
    windowColor: { value: new THREE.Color(0xffc987) },
  };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.windowGlow = uniforms.windowGlow;
    shader.uniforms.windowColor = uniforms.windowColor;
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vLocal;\nvarying vec3 vLocalNormal;\nvarying float vSeed;",
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
#ifdef USE_INSTANCING
  vec3 instScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vSeed = float(gl_InstanceID) * 7.31;
#else
  vec3 instScale = vec3(1.0);
  vSeed = 0.0;
#endif
  vLocal = position * instScale;
  vLocalNormal = normal;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform float windowGlow;
uniform vec3 windowColor;
varying vec3 vLocal;
varying vec3 vLocalNormal;
varying float vSeed;
float winHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
{
  vec3 an = abs(vLocalNormal);
  float wall = step(an.y, 0.5);
  vec2 face = an.x > 0.5 ? vec2(vLocal.z, vLocal.y) : vec2(vLocal.x, vLocal.y);
  vec2 cell = vec2(face.x / 3.1, face.y / 3.5);
  vec2 f = fract(cell);
  // Fade the grid out where a window is smaller than a couple of pixels
  // (distance, grazing angles) instead of letting it alias into noise.
  float aa = 1.0 - smoothstep(0.25, 0.6, max(fwidth(cell.x), fwidth(cell.y)));
  vec2 id = floor(cell) + vec2(vSeed, vSeed * 1.7) + (an.x > 0.5 ? 50.0 : 0.0);
  float win = step(0.16, f.x) * step(f.x, 0.84) * step(0.22, f.y) * step(f.y, 0.82) * wall * step(2.5, vLocal.y);
  win *= aa;
  float lit = step(0.58, winHash(id));
  float warm = winHash(id + 3.3);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.38 + vec3(0.05, 0.08, 0.12), win * 0.85);
  totalEmissiveRadiance += mix(windowColor, vec3(0.75, 0.85, 1.0), step(0.7, warm)) * win * lit * windowGlow * (0.6 + warm * 0.8);
  // Distant facades keep an even glow where the grid has faded out.
  totalEmissiveRadiance += windowColor * windowGlow * 0.18 * wall * (1.0 - aa);
}`,
      );
  };
  ctx.animate(({ night }) => {
    uniforms.windowGlow.value = 0.05 + night * 2.4;
  });
  return material;
}

export function buildCity(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const rng = createRng(41);
  const buildings = new Batch(THREE, baseBox(THREE), buildingMaterial(ctx));
  const rooftops = new Batch(THREE, baseBox(THREE), mats.roof);
  const beacons = new Batch(THREE, new THREE.BoxGeometry(0.6, 0.6, 0.6), mats.lampRed, { cast: false, receive: false });
  const palette = [0xc8ccd0, 0x8e9aa6, 0x5b6874, 0xd6cbb6, 0x9fb4c3, 0x6e7a73, 0xb9b1a4];
  const count = Math.round(50 * Math.max(0.55, ctx.density));
  let placed = 0;
  let guard = 0;
  while (placed < count && guard++ < count * 8) {
    const s = L.cityFrom + rng() * (L.cityTo - L.cityFrom);
    const side = rng() < 0.5 ? -1 : 1;
    const lat = side * (34 + Math.pow(rng(), 1.3) * 210);
    // Keep the overpass and checkpoint approaches open.
    if (Math.abs(s - L.overpass) < 16 && Math.abs(lat) < 60) continue;
    if (Math.abs(s - L.checkpoint) < 34 && Math.abs(lat) < 64) continue;
    const downtown = smoothstep(560, 660, s) * (1 - smoothstep(760, 850, s));
    const w = 14 + rng() * 18;
    const d = 14 + rng() * 18;
    const h = (12 + rng() * 26) * (1 + downtown * 2.6 * (1 - Math.abs(lat) / 320) * (0.4 + rng() * 0.9));
    const m = placement(THREE, route, s, lat, { y: -0.6, yaw: (rng() - 0.5) * 0.12, scale: [w, h, d] });
    buildings.add(m, palette[Math.floor(rng() * palette.length)]);
    rooftops.add(m.clone().multiply(new THREE.Matrix4().compose(new THREE.Vector3(0, 1, 0), new THREE.Quaternion(), new THREE.Vector3(0.6, 2.6 / h, 0.5))));
    if (h > 60) {
      beacons.add(placement(THREE, route, s, lat, { y: h + 2.4 }));
    }
    placed++;
  }
  buildings.build(root);
  rooftops.build(root);
  beacons.build(root);
  // Rooftop aircraft-warning beacons blink, brighter at night.
  const lampRed = mats.lampRed;
  ctx.animate(({ time, night }) => {
    lampRed.emissiveIntensity = (Math.sin(time * 3.1) > 0.55 ? 3 : 0.15) * (0.25 + night);
  });

  for (const mesh of buildGuardrails(THREE, route, [[560, 700], [724, 760]], mats.rail)) root.add(mesh);
  buildOverpass(ctx);
  buildBillboard(ctx);
  buildCheckpoint(ctx);
}

function buildOverpass(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const g = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(96, 1.6, 12), mats.concrete);
  deck.position.y = 7.6;
  deck.castShadow = true;
  deck.receiveShadow = true;
  g.add(deck);
  for (const z of [-5.8, 5.8]) {
    const barrier = new THREE.Mesh(new THREE.BoxGeometry(96, 1.1, 0.4), mats.concrete);
    barrier.position.set(0, 8.95, z);
    barrier.castShadow = true;
    g.add(barrier);
  }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(96, 0.35, 0.05), mats.orange);
  stripe.position.set(0, 7.1, 6.03);
  g.add(stripe);
  for (const x of [-10.5, 10.5, -30, 30]) {
    for (const z of [-3.6, 3.6]) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(1.3, 7, 1.3), mats.concrete);
      pier.position.set(x, 3.5, z);
      pier.castShadow = true;
      g.add(pier);
    }
  }
  // Ramps down to grade.
  for (const side of [-1, 1]) {
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(60, 1.6, 12), mats.concrete);
    ramp.position.set(side * 76, 3.6, 0);
    ramp.rotation.z = side * -0.135;
    ramp.castShadow = true;
    g.add(ramp);
  }
  placeObject(THREE, route, g, L.overpass, 0, { onRoad: true });
  root.add(g);
}

function buildBillboard(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const tex = signTexture(
    THREE,
    {
      width: 1024,
      height: 420,
      background: "#1B1522",
      lines: [
        { text: "KINETIC", size: 150, color: "#ffffff", weight: 800, y: 170 },
        { text: "EVERY LOAD. ONE CLEAR CONSOLE.", size: 46, color: "#FF6B2B", weight: 700, y: 300, tracking: 6 },
      ],
    },
    ctx.anisotropy,
  );
  const mat = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.1, roughness: 0.6 });
  ctx.nightGlow(mat, 0.08, 1.1);
  const g = new THREE.Group();
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(14, 5.74), mat);
  panel.position.y = 11;
  const back = new THREE.Mesh(new THREE.BoxGeometry(14.4, 6.1, 0.4), mats.deep);
  back.position.set(0, 11, -0.25);
  back.castShadow = true;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 8.4, 10), mats.pole);
  pole.position.set(0, 4.2, -0.5);
  pole.castShadow = true;
  g.add(panel, back, pole);
  placeObject(THREE, route, g, 578, -17, { yaw: 0.35 });
  root.add(g);
}

function buildCheckpoint(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const g = new THREE.Group();
  for (const x of [-7.8, 7.8]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 8.6, 0.8), mats.deep);
    pillar.position.set(x, 4.3, 0);
    pillar.castShadow = true;
    g.add(pillar);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(17.2, 1.3, 1.2), mats.deep);
  beam.position.y = 8.2;
  beam.castShadow = true;
  g.add(beam);

  const board = (title: string, sub: string, color: string): Texture =>
    signTexture(
      THREE,
      {
        width: 1024,
        height: 160,
        background: "#0c1a28",
        lines: [
          { text: title, size: 62, color: "#ffffff", weight: 800, y: 64, tracking: 5 },
          { text: sub, size: 34, color, weight: 700, y: 124, tracking: 6 },
        ],
      },
      ctx.anisotropy,
    );
  const pendingTex = board("WEIGH STATION", "OPEN · ALL TRUCKS", "#F26A2E");
  const verifiedTex = board("WEIGH STATION", "✓ CLEARED · PROCEED", "#45d483");
  const signMat = new THREE.MeshStandardMaterial({ map: pendingTex, emissive: 0xffffff, emissiveMap: pendingTex, emissiveIntensity: 0.6, roughness: 0.5 });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(13, 2.03), signMat);
  sign.position.set(0, 10.1, 0.62);
  const signBack = new THREE.Mesh(new THREE.BoxGeometry(13.3, 2.3, 0.3), mats.deep);
  signBack.position.set(0, 10.1, 0.4);
  g.add(sign, signBack);

  const ledMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xf26a2e, toneMapped: false });
  const led = new THREE.Mesh(new THREE.BoxGeometry(15, 0.16, 0.3), ledMat);
  led.position.set(0, 7.48, 0.4);
  g.add(led);

  const curtainMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0xf26a2e,
    map: ctx.textures.scanner,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const curtain = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 7.3), curtainMat);
  curtain.position.y = 3.72;
  curtain.renderOrder = 6;
  const sweepMat: MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xffb27a, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
  const sweep = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 0.12), sweepMat);
  sweep.renderOrder = 7;
  g.add(curtain, sweep);

  // Booth and cones.
  const booth = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3, 4.2), mats.white);
  booth.position.set(11.6, 1.5, -2);
  booth.castShadow = true;
  const boothWin = new THREE.Mesh(new THREE.BoxGeometry(3.22, 1, 3.4), mats.windowWarm);
  boothWin.position.set(11.6, 2, -2);
  const boothRoof = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 5.2), mats.orange);
  boothRoof.position.set(11.6, 3.15, -2);
  g.add(booth, boothWin, boothRoof);
  placeObject(THREE, route, g, L.checkpoint, 0, { onRoad: true });
  root.add(g);

  const cones = new Batch(THREE, new THREE.ConeGeometry(0.22, 0.75, 10).translate(0, 0.375, 0), mats.orange, { cast: false, receive: true });
  for (let s = L.checkpoint - 46; s < L.checkpoint - 2; s += 3.2) {
    cones.add(placement(THREE, route, s, 4.75, { onRoad: true }));
    cones.add(placement(THREE, route, s, -4.75, { onRoad: true }));
  }
  cones.build(root);

  const orange = new THREE.Color(0xf26a2e);
  const green = new THREE.Color(0x45d483);
  const target = new THREE.Color();
  let showingVerified = false;
  ctx.animate(({ time, dt, still, s, verified }) => {
    const near = 1 - smoothstep(120, 260, Math.abs(s - L.checkpoint));
    if (near <= 0) return;
    target.copy(verified ? green : orange);
    const k = still ? 1 : 1 - Math.exp(-5 * dt);
    curtainMat.color.lerp(target, k);
    ledMat.color.copy(curtainMat.color).multiplyScalar(2.2);
    sweepMat.color.copy(curtainMat.color).multiplyScalar(1.6);
    ctx.textures.scanner.offset.x = (time * 0.35) % 1;
    const phase = (time * (verified ? 0.35 : 0.9)) % 1;
    sweep.position.y = 0.3 + (verified ? 6.8 : Math.abs(phase * 2 - 1) * 6.8);
    curtainMat.opacity = verified ? 0.1 : 0.2 + Math.sin(time * 9) * 0.04;
    if (verified !== showingVerified) {
      showingVerified = verified;
      const map = verified ? verifiedTex : pendingTex;
      signMat.map = map;
      signMat.emissiveMap = map;
      signMat.needsUpdate = true;
    }
  });
}

/**
 * Sodium streetlights from the city to the destination, with light pools
 * on the asphalt that stretch into reflections when the road is wet.
 * Returns lamp head positions for the engine's moving point lights.
 */
export function buildStreetlights(
  ctx: SceneryContext,
  from: number,
  to: number,
  skip: (s: number) => boolean,
): Array<{ s: number; x: number; y: number; z: number }> {
  const { THREE, route, root, mats } = ctx;
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.1, 0.16, 9.2, 8).translate(0, 4.6, 0), mats.pole);
  const arms = new Batch(THREE, new THREE.BoxGeometry(2.6, 0.12, 0.12).translate(-1.3, 9.1, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.0, 0.18, 0.42).translate(-2.4, 9.0, 0), mats.lampWarm, { cast: false, receive: false });
  const poolGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  const poolMat = new THREE.MeshBasicMaterial({
    color: 0xffb566,
    map: ctx.textures.glow,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    toneMapped: false,
  });
  const lamps: Array<{ s: number; x: number; y: number; z: number }> = [];
  const poolS: number[] = [];
  const poolLat: number[] = [];
  const frame = createFrame();
  let side = 1;
  for (let s = from; s <= to; s += 34) {
    if (skip(s)) continue;
    const lat = side * 6.9;
    // Arms point toward the road: yaw 0 = arm toward -X (left); flip on the left side.
    poles.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    arms.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    heads.add(placement(THREE, route, s, lat, { onRoad: true, yaw: side > 0 ? 0 : Math.PI }));
    route.sample(s, frame);
    const headLat = lat - side * 2.4;
    lamps.push({ s, x: frame.x + frame.rx * headLat, y: frame.y + 8.9, z: frame.z + frame.rz * headLat });
    poolS.push(s);
    poolLat.push(headLat);
    side = -side;
  }
  poles.build(root);
  arms.build(root);
  heads.build(root);

  const pools = new THREE.InstancedMesh(poolGeo, poolMat, Math.max(1, poolS.length));
  pools.count = poolS.length;
  pools.renderOrder = 2;
  const writePools = (wet: number) => {
    for (let i = 0; i < poolS.length; i++) {
      pools.setMatrixAt(
        i,
        placement(THREE, route, poolS[i], poolLat[i] * 0.55, { onRoad: true, y: 0.05, scale: [7.5 + wet, 1, 7.5 + wet * 7] }),
      );
    }
    pools.instanceMatrix.needsUpdate = true;
    pools.computeBoundingSphere();
  };
  writePools(0);
  root.add(pools);
  let lastWet = 0;
  ctx.animate(({ night, rain }) => {
    poolMat.opacity = night * (0.32 + rain * 0.18);
    const wet = Math.round(rain * 10) / 10;
    if (wet !== lastWet) {
      lastWet = wet;
      writePools(wet);
    }
  });
  return lamps;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/countryside.ts">
<![CDATA[import { LANDMARKS } from "../../story";
import { buildDeck, buildGuardrails } from "../road";
import { createFrame } from "../splineRoute";
import { terrainHeight } from "../terrain";
import { signTexture } from "../textures";
import { Batch, beamBetween, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

export function buildCountryside(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;

  // Farmstead: barn, silo, farmhouse.
  const farm = new THREE.Group();
  const barn = new THREE.Mesh(new THREE.BoxGeometry(12, 7, 18), mats.barnRed);
  barn.position.y = 3.5;
  const barnRoof = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 18.6, 3, 1).rotateX(Math.PI / 2).rotateZ(Math.PI), mats.roof);
  barnRoof.scale.set(1, 0.55, 1);
  barnRoof.position.y = 7 + 1.8;
  const silo = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 16, 16), mats.steelGrey);
  silo.position.set(10, 8, -4);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(3.1, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mats.steelGrey);
  dome.position.set(10, 16, -4);
  const house = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 10), mats.white);
  house.position.set(-16, 2.5, 8);
  const houseRoof = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 10.6, 3, 1).rotateX(Math.PI / 2).rotateZ(Math.PI), mats.deep);
  houseRoof.scale.set(1, 0.5, 1);
  houseRoof.position.set(-16, 5 + 1.4, 8);
  for (const m of [barn, barnRoof, silo, dome, house, houseRoof]) {
    m.castShadow = true;
    m.receiveShadow = true;
    farm.add(m);
  }
  placeObject(THREE, route, farm, 236, -64, { yaw: 0.35 });
  root.add(farm);

  // Set well back from the road so the low roadside shots stay clear of it.
  buildPowerLine(ctx, 60, 530, -24);
  buildSigns(ctx);
  buildBridge(ctx);
}

function buildPowerLine(ctx: SceneryContext, from: number, to: number, lat: number): void {
  const { THREE, route, root, mats } = ctx;
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.14, 0.2, 11, 6).translate(0, 5.5, 0), mats.trunk);
  const bars = new Batch(THREE, new THREE.BoxGeometry(3.2, 0.18, 0.18).translate(0, 10.4, 0), mats.trunk);
  const tops: Array<Array<{ x: number; y: number; z: number }>> = [];
  const frame = createFrame();
  for (let s = from; s <= to; s += 46) {
    if (Math.abs(s - L.river) < 30) continue;
    const m = placement(THREE, route, s, lat, {});
    poles.add(m);
    bars.add(m);
    route.sample(s, frame);
    const ground = terrainHeight(s, lat);
    tops.push(
      [-1.4, 0, 1.4].map((o) => ({
        x: frame.x + frame.rx * (lat + o),
        y: ground + 10.5,
        z: frame.z + frame.rz * (lat + o),
      })),
    );
  }
  poles.build(root);
  bars.build(root);
  const verts: number[] = [];
  const SEG = 8;
  for (let i = 0; i < tops.length - 1; i++) {
    for (let w = 0; w < 3; w++) {
      const a = tops[i][w];
      const b = tops[i + 1][w];
      for (let k = 0; k < SEG; k++) {
        for (const t of [k / SEG, (k + 1) / SEG]) {
          const sag = Math.sin(t * Math.PI) * 1.4;
          verts.push(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t - sag, a.z + (b.z - a.z) * t);
        }
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  root.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x2a2e33, transparent: true, opacity: 0.7 })));
}

function roadSign(ctx: SceneryContext, s: number, lat: number, title: string, lines: string[]): void {
  const { THREE, route, root, mats } = ctx;
  const tex = signTexture(
    THREE,
    {
      width: 512,
      height: 256,
      background: "#1d6b43",
      border: "#f4f4ef",
      lines: [
        { text: title, size: 54, color: "#ffffff", weight: 800, y: 70 },
        ...lines.map((text, i) => ({ text, size: 40, color: "#ffffff", weight: 600, y: 142 + i * 56 })),
      ],
    },
    ctx.anisotropy,
  );
  const group = new THREE.Group();
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 3.6),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.05 }),
  );
  ctx.nightGlow(panel.material as never, 0.04, 0.35);
  panel.position.y = 5.6;
  const back = new THREE.Mesh(new THREE.BoxGeometry(7.3, 3.7, 0.12), mats.steelGrey);
  back.position.set(0, 5.6, -0.08);
  group.add(panel, back);
  for (const x of [-2.4, 2.4]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.6, 0.2), mats.pole);
    post.position.set(x, 2.8, -0.2);
    post.castShadow = true;
    group.add(post);
  }
  placeObject(THREE, route, group, s, lat, { onRoad: true });
  root.add(group);
}

function buildSigns(ctx: SceneryContext): void {
  roadSign(ctx, 262, 9.8, "I-55 SOUTH", ["St. Louis  18", "Memphis  302"]);
  roadSign(ctx, 590, 9.8, "I-40 WEST", ["Little Rock  137", "Dallas  452"]);
}

function buildBridge(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const from = L.bridgeFrom;
  const to = L.bridgeTo;
  root.add(buildDeck(THREE, route, from - 4, to + 4, mats.concrete));
  for (const m of buildGuardrails(THREE, route, [[from - 6, to + 6]], mats.concrete)) root.add(m);

  // Warren truss on both sides, cross beams overhead.
  const beams = new Batch(THREE, new THREE.BoxGeometry(1, 1, 1), mats.steel);
  const frame = createFrame();
  const P = (s: number, lat: number, up: number) => {
    route.sample(s, frame);
    return { x: frame.x + frame.rx * lat, y: frame.y + up, z: frame.z + frame.rz * lat };
  };
  const panels = 8;
  const len = (to - from) / panels;
  const H = 7.6;
  for (const side of [-1, 1]) {
    const lat = side * 7.1;
    beams.add(beamBetween(THREE, P(from, lat, 0.4), P(to, lat, 0.4), 0.55));
    beams.add(beamBetween(THREE, P(from + len, lat, H), P(to - len, lat, H), 0.55));
    for (let i = 0; i <= panels; i++) {
      const s = from + i * len;
      if (i > 0 && i < panels) beams.add(beamBetween(THREE, P(s, lat, 0.4), P(s, lat, H), 0.36));
      if (i < panels) {
        const s2 = s + len;
        const up = i === 0 ? [P(s, lat, 0.4), P(s2, lat, H)] : i === panels - 1 ? [P(s, lat, H), P(s2, lat, 0.4)] : i % 2 ? [P(s, lat, H), P(s2, lat, 0.4)] : [P(s, lat, 0.4), P(s2, lat, H)];
        beams.add(beamBetween(THREE, up[0], up[1], 0.34));
      }
    }
  }
  for (let i = 1; i < panels; i++) {
    const s = from + i * len;
    beams.add(beamBetween(THREE, P(s, -7.1, H), P(s, 7.1, H), 0.4));
    if (i < panels - 1) {
      beams.add(beamBetween(THREE, P(s, -7.1, H), P(s + len, 7.1, H), 0.22));
      beams.add(beamBetween(THREE, P(s, 7.1, H), P(s + len, -7.1, H), 0.22));
    }
  }
  beams.build(root);

  const piers = new Batch(THREE, new THREE.BoxGeometry(1, 1, 1).translate(0, -0.5, 0), mats.concrete);
  for (const s of [from + 12, L.river, to - 12]) {
    piers.add(placement(THREE, route, s, 0, { onRoad: true, y: -1.4, scale: [11, 16, 2.4] }));
  }
  piers.build(root);
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/depots.ts">
<![CDATA[import type { Group, MeshBasicMaterial } from "three";
import { LANDMARKS, smoothstep } from "../../story";
import { createRng } from "../noise";
import { signTexture } from "../textures";
import { Batch, baseBox, placeObject, placement, type SceneryContext } from "./kit";

type WarehouseSpec = {
  width: number;
  depth: number;
  height: number;
  doors: number;
  doorSpacing: number;
  /** Index of the door that stands open and lit (or -1). */
  openDoor: number;
  sign: { title: string; subtitle: string };
};

/**
 * Warehouse in local space: facade faces +Z, width along X, base at y = 0.
 */
function buildWarehouse(ctx: SceneryContext, spec: WarehouseSpec): Group {
  const { THREE, mats } = ctx;
  const g = new THREE.Group();
  const { width: W, depth: D, height: H } = spec;

  const main = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), mats.wall);
  main.position.y = H / 2;
  main.castShadow = true;
  main.receiveShadow = true;
  const roof = new THREE.Mesh(new THREE.BoxGeometry(W + 0.8, 0.6, D + 0.8), mats.roof);
  roof.position.y = H + 0.3;
  roof.castShadow = true;
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(W + 0.2, 1.3, D + 0.2), mats.concreteDark);
  plinth.position.y = 0.65;
  const band = new THREE.Mesh(new THREE.BoxGeometry(W, 0.7, 0.12), mats.orange);
  band.position.set(0, H - 1.4, D / 2 + 0.06);
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(W - 4, 0.25, 2.4), mats.roof);
  canopy.position.set(0, 5.4, D / 2 + 1.2);
  canopy.castShadow = true;
  g.add(main, roof, plinth, band, canopy);

  // Rooftop units for silhouette.
  const rng = createRng(W | 0);
  for (let i = 0; i < 6; i++) {
    const unit = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 1.8), mats.steelGrey);
    unit.position.set((rng() - 0.5) * (W - 10), H + 1.3, (rng() - 0.5) * (D - 10));
    unit.castShadow = true;
    g.add(unit);
  }

  const doorMat = new THREE.MeshStandardMaterial({ map: ctx.textures.dockDoor, roughness: 0.6, metalness: 0.3 });
  const openMat = new THREE.MeshStandardMaterial({ color: 0x2a2018, emissive: 0xffb866, emissiveIntensity: 1.2, roughness: 0.9 });
  ctx.nightGlow(openMat, 0.9, 2.6);
  const doorGeo = new THREE.PlaneGeometry(3.3, 3.6);
  const lampGeo = new THREE.BoxGeometry(0.9, 0.18, 0.4);
  const bumperGeo = new THREE.BoxGeometry(0.35, 0.5, 0.3);
  const x0 = -((spec.doors - 1) * spec.doorSpacing) / 2;
  for (let i = 0; i < spec.doors; i++) {
    const x = x0 + i * spec.doorSpacing;
    const door = new THREE.Mesh(doorGeo, i === spec.openDoor ? openMat : doorMat);
    door.position.set(x, 1.3 + 1.8, D / 2 + 0.03);
    const lampMesh = new THREE.Mesh(lampGeo, mats.lampWarm);
    lampMesh.position.set(x, 5.15, D / 2 + 1.9);
    for (const side of [-1, 1]) {
      const bumper = new THREE.Mesh(bumperGeo, mats.rubber);
      bumper.position.set(x + side * 1.4, 1.2, D / 2 + 0.2);
      g.add(bumper);
    }
    g.add(door, lampMesh);
  }

  const signTex = signTexture(
    THREE,
    {
      width: 1024,
      height: 160,
      background: "#1B1522",
      lines: [
        { text: spec.sign.title, size: 74, color: "#ffffff", weight: 800, y: 70, tracking: 4 },
        { text: spec.sign.subtitle, size: 30, color: "#FF6B2B", weight: 700, y: 132, tracking: 6 },
      ],
    },
    ctx.anisotropy,
  );
  const signMat = new THREE.MeshStandardMaterial({ map: signTex, emissive: 0xffffff, emissiveMap: signTex, emissiveIntensity: 0.15, roughness: 0.5 });
  ctx.nightGlow(signMat, 0.06, 0.45);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(25.6, 4), signMat);
  sign.position.set(0, H - 4.2, D / 2 + 0.07);
  g.add(sign);

  return g;
}

function trailerBatches(ctx: SceneryContext) {
  const { THREE, mats } = ctx;
  return {
    body: new Batch(THREE, new THREE.BoxGeometry(2.6, 3.6, 13).translate(0, 1.2 + 1.8, 0), mats.trailer),
    under: new Batch(THREE, new THREE.BoxGeometry(2.3, 0.9, 3.2).translate(0, 0.75, 4.2), mats.rubber),
    stripe: new Batch(THREE, new THREE.BoxGeometry(2.64, 0.35, 13.02).translate(0, 1.55, 0), mats.brandBlue, { cast: false, receive: true }),
  };
}

export function buildOrigin(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;

  // Warehouse along the right side of the yard, facade toward the road.
  const warehouse = buildWarehouse(ctx, {
    width: 96,
    depth: 36,
    height: 13,
    doors: 7,
    doorSpacing: 12,
    openDoor: 3,
    sign: { title: "KINETIC", subtitle: "ORIGIN · DOCKS 1–7" },
  });
  placeObject(THREE, route, warehouse, -34, 40, { yaw: -Math.PI / 2, onRoad: true });
  root.add(warehouse);

  // Trailers backed into the docks.
  const t = trailerBatches(ctx);
  for (const doorS of [-70, -58, -46, -22, -10]) {
    const m = placement(THREE, route, doorS, 14.8, { onRoad: true, yaw: Math.PI / 2 });
    t.body.add(m);
    t.under.add(m);
    t.stripe.add(m);
  }

  // Container stacks on the left.
  const rng = createRng(21);
  const palette = [0xf26a2e, 0x2f5d7c, 0x10263d, 0x7a8c96, 0x3b7f7a, 0xb4532a, 0xd7d2c8];
  const containers = new Batch(THREE, baseBox(THREE), mats.container);
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 9; i++) {
      const s = -76 + i * 12.8 + rng() * 1.2;
      const lat = -17 - row * 3.2;
      const height = 1 + Math.floor(rng() * 3);
      for (let h = 0; h < height; h++) {
        containers.add(
          placement(THREE, route, s, lat, { onRoad: true, y: h * 2.6, yaw: (rng() - 0.5) * 0.04, scale: [2.44, 2.59, 12.1] }),
          palette[Math.floor(rng() * palette.length)],
        );
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    containers.add(
      placement(THREE, route, -60 + rng() * 90, -34 - rng() * 22, { yaw: Math.PI / 2 + (rng() - 0.5) * 0.3, scale: [2.44, 2.59, 6.06] }),
      palette[Math.floor(rng() * palette.length)],
    );
  }

  // Yard lighting.
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.12, 0.18, 13, 8).translate(0, 6.5, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.3, 0.3, 0.7).translate(0, 13, 0), mats.lampWarm, { cast: false, receive: false });
  for (const [s, lat] of [
    [-66, -11],
    [-30, -11],
    [6, -11],
    [-48, 11.5],
    [-12, 11.5],
  ] as const) {
    const m = placement(THREE, route, s, lat, { onRoad: true });
    poles.add(m);
    heads.add(m);
  }
  [t.body, t.under, t.stripe, containers, poles, heads].forEach((b) => b.build(root));

  // Gate: booth, posts and a barrier arm that lifts for the truck.
  const booth = new THREE.Group();
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.8, 3.2), mats.white);
  cabin.position.y = 1.4;
  cabin.castShadow = true;
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.25, 4), mats.deep);
  cabinRoof.position.y = 2.95;
  const win = new THREE.Mesh(new THREE.BoxGeometry(2.62, 0.9, 2.4), mats.windowWarm);
  win.position.y = 1.9;
  booth.add(cabin, cabinRoof, win);
  placeObject(THREE, route, booth, LANDMARKS.gate - 2, 11.4, { onRoad: true });
  root.add(booth);

  const gate = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.3, 0.5), mats.deep);
  post.position.set(0, 0.65, 0);
  const arm = new THREE.Group();
  arm.position.set(0, 1.1, 0);
  const red = new THREE.MeshStandardMaterial({ color: 0xd83a2b, roughness: 0.5 });
  const segment = new THREE.BoxGeometry(17 / 8, 0.16, 0.16);
  for (let i = 0; i < 8; i++) {
    const piece = new THREE.Mesh(segment, i % 2 ? mats.white : red);
    piece.position.x = -(i + 0.5) * (17 / 8);
    piece.castShadow = true;
    arm.add(piece);
  }
  gate.add(post, arm);
  placeObject(THREE, route, gate, LANDMARKS.gate, 8.6, { onRoad: true });
  root.add(gate);
  ctx.animate(({ s, dt, still }) => {
    // Lifts as the truck rolls up, drops again once its tail has cleared.
    const open = smoothstep(2, 13, s) * (1 - smoothstep(35, 42, s));
    const target = -open * 1.45;
    arm.rotation.z += (target - arm.rotation.z) * (still ? 1 : 1 - Math.exp(-6 * dt));
  });
}

export function buildDestination(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  const warehouse = buildWarehouse(ctx, {
    width: 110,
    depth: 40,
    height: 13,
    doors: 9,
    doorSpacing: 12,
    openDoor: 4,
    sign: { title: "KINETIC", subtitle: "DESTINATION · DOCK 2" },
  });
  placeObject(THREE, route, warehouse, LANDMARKS.dockFront + 20, 0, { onRoad: true, yaw: 0 });
  root.add(warehouse);

  const t = trailerBatches(ctx);
  for (const lat of [-36, -24, -12, 12, 24, 36]) {
    const m = placement(THREE, route, LANDMARKS.dockFront - 6.6, lat, { onRoad: true, yaw: Math.PI });
    t.body.add(m);
    t.under.add(m);
    t.stripe.add(m);
  }
  const poles = new Batch(THREE, new THREE.CylinderGeometry(0.12, 0.18, 13, 8).translate(0, 6.5, 0), mats.pole);
  const heads = new Batch(THREE, new THREE.BoxGeometry(1.3, 0.3, 0.7).translate(0, 13, 0), mats.lampWarm, { cast: false, receive: false });
  for (const [s, lat] of [
    [1214, -12],
    [1244, 12],
    [1274, -12],
    [1290, 22],
    [1290, -26],
  ] as const) {
    const m = placement(THREE, route, s, lat, { onRoad: true });
    poles.add(m);
    heads.add(m);
  }
  [t.body, t.under, t.stripe, poles, heads].forEach((b) => b.build(root));

  // Guide lights that chase toward the open dock.
  const guideCount = 26;
  const guideMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const guides = new THREE.InstancedMesh(new THREE.BoxGeometry(0.34, 0.08, 0.34), guideMat, guideCount * 2);
  const guideS: number[] = [];
  for (let i = 0; i < guideCount; i++) {
    const s = 1200 + i * 3.8;
    for (const side of [-1, 1]) {
      const idx = i * 2 + (side > 0 ? 1 : 0);
      guides.setMatrixAt(idx, placement(THREE, route, s, side * 5.2, { onRoad: true, y: 0.05 }));
      guideS[idx] = s;
    }
  }
  const guideColor = new THREE.Color();
  const accent = new THREE.Color(0xf26a2e);
  const green = new THREE.Color(0x45d483);
  for (let i = 0; i < guideCount * 2; i++) guides.setColorAt(i, accent);
  root.add(guides);

  // Arrival beacon: a steady ring around the parking spot with ripples that
  // keep flowing outward, plus a light column. Each ripple fades to nothing
  // before it wraps, and three overlap, so there is never a visible restart.
  const ringTex = ringTexture(ctx);
  const ringGeo = new THREE.PlaneGeometry(1, 1);
  const ringMaterial = (): MeshBasicMaterial =>
    new THREE.MeshBasicMaterial({
      color: 0xf26a2e,
      map: ringTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
  const ringMat = ringMaterial();
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.scale.set(15, 15, 1);
  const ripples = [0, 1, 2].map(() => {
    const mesh = new THREE.Mesh(ringGeo, ringMaterial());
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.01;
    return mesh;
  });
  const ringHolder = new THREE.Group();
  ringHolder.add(ring, ...ripples);
  placeObject(THREE, route, ringHolder, LANDMARKS.arrival, 0, { onRoad: true, y: 0.06 });
  root.add(ringHolder);

  const columnMat = new THREE.MeshBasicMaterial({
    color: 0xf26a2e,
    map: ctx.textures.beam,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const column = new THREE.Mesh(new THREE.CylinderGeometry(6.2, 6.2, 16, 40, 1, true).translate(0, 8, 0), columnMat);
  // Beam texture is bright at v = 1 (top); flip so it glows from the ground up.
  column.rotation.x = Math.PI;
  column.position.y = 16;
  ringHolder.add(column);

  let clock = 0;
  let rate = 0.28;
  let glow = 0.5;
  ctx.animate(({ time, dt, still, s, arrived, night }) => {
    const near = smoothstep(1150, 1250, s);
    const k = still ? 1 : 1 - Math.exp(-3 * dt);
    // Speed and strength ease between states; the ripple clock never jumps.
    rate += ((arrived ? 0.22 : 0.34) - rate) * k;
    glow += ((arrived ? 1 : 0.62) - glow) * k;
    clock = (clock + dt * rate) % 3;
    const target = arrived ? green : accent;
    ringMat.color.lerp(target, still ? 1 : 1 - Math.exp(-4 * dt));
    columnMat.color.copy(ringMat.color);
    const light = near * glow * (0.7 + night * 0.5);
    ringMat.opacity = light * (0.62 + 0.12 * Math.sin(time * 1.6));
    ripples.forEach((ripple, i) => {
      const phase = (clock + i / 3) % 1;
      const eased = 1 - (1 - phase) * (1 - phase);
      const size = 13.5 + eased * 12;
      ripple.scale.set(size, size, 1);
      const material = ripple.material as MeshBasicMaterial;
      material.color.copy(ringMat.color);
      // sin^2 envelope: zero at both ends of each ripple's life.
      material.opacity = light * 0.55 * Math.pow(Math.sin(Math.PI * phase), 2);
    });
    columnMat.opacity = near * (0.16 + (glow - 0.62) * 0.3) * (0.6 + night * 0.6);

    // Chase: a bright band travels toward the dock; all go green on arrival.
    for (let i = 0; i < guideCount * 2; i++) {
      const phase = ((guideS[i] - time * 22) % 30 + 30) % 30;
      const k = arrived ? 0.8 : 0.25 + Math.max(0, 1 - phase / 6) * 1.6;
      guideColor.copy(arrived ? green : accent).multiplyScalar(k * (0.4 + near * 1.2));
      guides.setColorAt(i, guideColor);
    }
    if (guides.instanceColor) guides.instanceColor.needsUpdate = true;
  });
}

function ringTexture(ctx: SceneryContext) {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.72, "rgba(255,255,255,0.15)");
    grad.addColorStop(0.9, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  const t = new ctx.THREE.CanvasTexture(c);
  return t;
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/kit.ts">
<![CDATA[import type {
  BufferGeometry,
  Color,
  Group,
  InstancedMesh,
  Material,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  Texture,
} from "three";
import { createFrame, type Route, type RouteFrame } from "../splineRoute";
import { terrainHeight } from "../terrain";

export type ThreeModule = typeof import("three");

/** Things the scenery can animate each frame. */
export type Animated = (ctx: FrameContext) => void;

export type FrameContext = {
  time: number;
  dt: number;
  /** Reduced-motion still frame: jump straight to end states. */
  still: boolean;
  /** Truck road distance and speed. */
  s: number;
  v: number;
  /** 0..1 how "night" the environment is (lamps on). */
  night: number;
  rain: number;
  arrived: boolean;
  verified: boolean;
};

export type SceneryContext = {
  THREE: ThreeModule;
  route: Route;
  root: Group;
  /** 0..1 prop density for the device tier. */
  density: number;
  anisotropy: number;
  mats: Materials;
  textures: { glow: Texture; beam: Texture; scanner: Texture; dockDoor: Texture };
  /** Register a per-frame animation. */
  animate: (fn: Animated) => void;
  /** Materials whose emissive follows night (lamps, windows). */
  nightGlow: (material: MeshStandardMaterial, day: number, night: number) => void;
};

export type Materials = ReturnType<typeof createMaterials>;

export function createMaterials(THREE: ThreeModule) {
  const std = (color: number, roughness = 0.8, metalness = 0, extra: Record<string, unknown> = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const lamp = (color: number) =>
    new THREE.MeshStandardMaterial({ color: 0x222222, emissive: color, emissiveIntensity: 1, roughness: 0.4 });
  return {
    wall: std(0xc9c1b3, 0.85),
    wallDark: std(0x9aa3aa, 0.8),
    roof: std(0x565c63, 0.9),
    concrete: std(0xb0aba1, 0.92),
    concreteDark: std(0x7d7a74, 0.92),
    steel: std(0x3d6f8e, 0.5, 0.55),
    steelGrey: std(0x8a949c, 0.45, 0.7),
    pole: std(0x6f777e, 0.5, 0.6),
    rail: std(0x9aa3aa, 0.5, 0.6, { side: 2 }),
    trunk: std(0x5e4632, 0.95),
    trailer: std(0xd9dde0, 0.55, 0.1),
    rubber: std(0x16191c, 0.9),
    barnRed: std(0xa8412f, 0.85),
    white: std(0xe4e1da, 0.8),
    orange: std(0xf26a2e, 0.5, 0.1),
    brandBlue: std(0x2f5d7c, 0.5, 0.2),
    deep: std(0x10263d, 0.6, 0.2),
    container: std(0xffffff, 0.6, 0.3),
    building: std(0xffffff, 0.55, 0.25),
    sign: std(0xffffff, 0.5, 0, { emissive: 0xffffff, emissiveIntensity: 0.05 }),
    lampWarm: lamp(0xffc98a),
    lampCool: lamp(0xdfeaff),
    lampRed: lamp(0xff2a22),
    lampAmber: lamp(0xffa12a),
    windowWarm: lamp(0xffcf8f),
  };
}

const tmpFrame: RouteFrame = createFrame();

/** World transform for something standing at (s, lat) on the terrain or road. */
export function placement(
  THREE: ThreeModule,
  route: Route,
  s: number,
  lat: number,
  opts: { y?: number; onRoad?: boolean; yaw?: number; scale?: number | [number, number, number] } = {},
  out?: Matrix4,
): Matrix4 {
  route.sample(s, tmpFrame);
  const x = tmpFrame.x + tmpFrame.rx * lat;
  const z = tmpFrame.z + tmpFrame.rz * lat;
  const ground = opts.onRoad ? tmpFrame.y : terrainHeight(s, lat);
  const y = ground + (opts.y ?? 0);
  const sc = opts.scale ?? 1;
  const scale = typeof sc === "number" ? new THREE.Vector3(sc, sc, sc) : new THREE.Vector3(sc[0], sc[1], sc[2]);
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -tmpFrame.heading + (opts.yaw ?? 0));
  return (out ?? new THREE.Matrix4()).compose(new THREE.Vector3(x, y, z), q, scale);
}

/** Orient an Object3D like `placement` does. */
export function placeObject(
  THREE: ThreeModule,
  route: Route,
  obj: Object3D,
  s: number,
  lat: number,
  opts: { y?: number; onRoad?: boolean; yaw?: number } = {},
): Object3D {
  placement(THREE, route, s, lat, opts).decompose(obj.position, obj.quaternion, obj.scale);
  return obj;
}

/**
 * Collects instance transforms (and optional colors) for one geometry +
 * material, then emits a single InstancedMesh.
 */
export class Batch {
  private readonly matrices: Matrix4[] = [];
  private readonly colors: Color[] = [];
  constructor(
    private readonly THREE: ThreeModule,
    private readonly geometry: BufferGeometry,
    private readonly material: Material,
    private readonly shadows: { cast: boolean; receive: boolean } = { cast: true, receive: true },
  ) {}

  add(matrix: Matrix4, color?: number | Color): this {
    this.matrices.push(matrix.clone());
    if (color !== undefined) {
      this.colors.push(typeof color === "number" ? new this.THREE.Color(color) : color.clone());
    }
    return this;
  }

  get count(): number {
    return this.matrices.length;
  }

  build(parent: Object3D): InstancedMesh | null {
    if (this.matrices.length === 0) return null;
    const mesh = new this.THREE.InstancedMesh(this.geometry, this.material, this.matrices.length);
    this.matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    if (this.colors.length === this.matrices.length) {
      this.colors.forEach((c, i) => mesh.setColorAt(i, c));
    }
    mesh.castShadow = this.shadows.cast;
    mesh.receiveShadow = this.shadows.receive;
    mesh.computeBoundingSphere();
    parent.add(mesh);
    return mesh;
  }
}

/** Unit box with its base at y = 0 (scale it to size). */
export function baseBox(THREE: ThreeModule): BufferGeometry {
  return new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
}

/** Matrix for a beam between two world points with a square cross-section. */
export function beamBetween(
  THREE: ThreeModule,
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
  thickness: number,
): Matrix4 {
  const va = new THREE.Vector3(a.x, a.y, a.z);
  const vb = new THREE.Vector3(b.x, b.y, b.z);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  const mid = va.add(vb).multiplyScalar(0.5);
  return new THREE.Matrix4().compose(mid, q, new THREE.Vector3(thickness, len, thickness));
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/storm.ts">
<![CDATA[import { LANDMARKS } from "../../story";
import { buildGuardrails } from "../road";
import { Batch, placeObject, placement, type SceneryContext } from "./kit";

const L = LANDMARKS;

export function buildStormZone(ctx: SceneryContext): void {
  const { THREE, route, root, mats } = ctx;
  for (const mesh of buildGuardrails(THREE, route, [[850, 980], [1080, 1170]], mats.rail)) root.add(mesh);

  // Tunnel: a hill block with an arched bore, a concrete shell inside and
  // strip lights that streak past the camera.
  const length = L.tunnelTo - L.tunnelFrom;
  const mid = (L.tunnelFrom + L.tunnelTo) / 2;
  const R = 8.2;

  const hill = new THREE.Shape();
  hill.moveTo(-30, 0);
  hill.lineTo(-11, 21);
  hill.lineTo(11, 21);
  hill.lineTo(30, 0);
  hill.lineTo(R + 0.4, 0);
  hill.absarc(0, 0, R + 0.4, 0, Math.PI, false);
  hill.lineTo(-30, 0);
  const hillGeo = new THREE.ExtrudeGeometry(hill, { depth: length, bevelEnabled: false, curveSegments: 20 });
  hillGeo.translate(0, 0, -length / 2);
  const portalMat = new THREE.MeshStandardMaterial({ color: 0x8f8b84, roughness: 0.9 });
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x3f5a39, roughness: 1, flatShading: true });
  const hillMesh = new THREE.Mesh(hillGeo, [portalMat, hillMat]);
  hillMesh.receiveShadow = true;

  const shellGeo = new THREE.CylinderGeometry(R, R, length, 28, 1, true, Math.PI / 2, Math.PI);
  shellGeo.rotateX(Math.PI / 2);
  const shellMat = new THREE.MeshStandardMaterial({ color: 0x6e6c68, roughness: 0.75, side: THREE.DoubleSide });
  const shell = new THREE.Mesh(shellGeo, shellMat);

  // Portal frames.
  const frameGeo = new THREE.TorusGeometry(R + 0.5, 0.55, 8, 28, Math.PI);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xb4ada2, roughness: 0.8 });
  const tunnel = new THREE.Group();
  tunnel.add(hillMesh, shell);
  for (const z of [length / 2, -length / 2]) {
    const f = new THREE.Mesh(frameGeo, frameMat);
    f.position.z = z;
    tunnel.add(f);
  }
  placeObject(THREE, route, tunnel, mid, 0, { onRoad: true });
  root.add(tunnel);

  // Interior strip lights along both upper walls.
  const strips = new Batch(THREE, new THREE.BoxGeometry(0.22, 0.14, 2.6), mats.lampCool, { cast: false, receive: false });
  const angle = 0.95;
  for (let s = L.tunnelFrom + 3; s < L.tunnelTo - 2; s += 5.5) {
    for (const side of [-1, 1]) {
      strips.add(
        placement(THREE, route, s, side * Math.sin(angle) * (R - 0.25), {
          onRoad: true,
          y: Math.cos(angle) * (R - 0.25),
        }),
      );
    }
  }
  strips.build(root);
  // Tunnel lamps burn day and night.
  ctx.animate(({ s }) => {
    const inside = s > L.tunnelFrom - 80 && s < L.tunnelTo + 40;
    mats.lampCool.emissiveIntensity = inside ? 3.2 : 1.2;
  });
}

export function isInTunnel(s: number): number {
  const a = Math.min(1, Math.max(0, (s - (L.tunnelFrom + 2)) / 6));
  const b = Math.min(1, Math.max(0, (L.tunnelTo - 2 - s) / 6));
  return Math.min(a, b);
}
]]>
    </file>
    <file path="src/app/(kinetic)/kinetic/journey/engine/scenery/traffic.ts">
<![CDATA[import type { BufferGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { LANDMARKS, LANE_OFFSET } from "../../story";
import { createRng } from "../noise";
import { placement, type SceneryContext } from "./kit";

const CAR_COLORS = [0xe8e9ea, 0x1d2328, 0x9aa3ab, 0x7b1f24, 0x2a4f7a, 0xcfc6b4, 0x3d4a3f];
/** Oncoming speed (m/s) and the highway stretch cars may use. */
const SPEED = 24;
const MIN_S = 70;
const MAX_S = LANDMARKS.destinationYard - 10;

/** A handful of oncoming cars recycled around the truck. */
export function buildTraffic(ctx: SceneryContext, count: number): void {
  const { THREE, route, root, mats } = ctx;
  const nonIndexed = (g: BufferGeometry) => (g.index ? g.toNonIndexed() : g);
  // Car in local space: forward -Z, 4.6 m long.
  const body = mergeGeometries(
    [
      new THREE.BoxGeometry(1.86, 0.62, 4.6).translate(0, 0.62, 0),
      new THREE.BoxGeometry(1.64, 0.5, 2.3).translate(0, 1.17, 0.25),
    ].map(nonIndexed),
    false,
  ) as BufferGeometry;
  const trimParts: BufferGeometry[] = [new THREE.BoxGeometry(1.66, 0.46, 2.1).translate(0, 1.17, 0.25)];
  for (const [x, z] of [
    [0.84, -1.45],
    [-0.84, -1.45],
    [0.84, 1.45],
    [-0.84, 1.45],
  ]) {
    trimParts.push(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 14).rotateZ(Math.PI / 2).translate(x, 0.34, z));
  }
  const trim = mergeGeometries(trimParts.map(nonIndexed), false) as BufferGeometry;
  const headGeo = mergeGeometries(
    [new THREE.BoxGeometry(0.4, 0.14, 0.05).translate(0.6, 0.72, -2.31), new THREE.BoxGeometry(0.4, 0.14, 0.05).translate(-0.6, 0.72, -2.31)].map(nonIndexed),
    false,
  ) as BufferGeometry;
  const tailGeo = mergeGeometries(
    [new THREE.BoxGeometry(0.42, 0.12, 0.05).translate(0.62, 0.76, 2.31), new THREE.BoxGeometry(0.42, 0.12, 0.05).translate(-0.62, 0.76, 2.31)].map(nonIndexed),
    false,
  ) as BufferGeometry;

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.6 });
  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xff2020, toneMapped: false });
  const bodies = new THREE.InstancedMesh(body, bodyMat, count);
  const trims = new THREE.InstancedMesh(trim, mats.rubber, count);
  const heads = new THREE.InstancedMesh(headGeo, headMat, count);
  const tails = new THREE.InstancedMesh(tailGeo, tailMat, count);
  bodies.castShadow = true;
  const rng = createRng(77);
  for (let i = 0; i < count; i++) bodies.setColorAt(i, new THREE.Color(CAR_COLORS[Math.floor(rng() * CAR_COLORS.length)]));
  for (const m of [bodies, trims, heads, tails]) {
    m.frustumCulled = false;
    root.add(m);
  }

  const cars = Array.from({ length: count }, (_, i) => ({ s: MIN_S + 120 + i * 140, active: false }));
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
  const m = new THREE.Matrix4();
  const head = new THREE.Color();
  ctx.animate(({ dt, s, night, rain }) => {
    for (let i = 0; i < count; i++) {
      const car = cars[i];
      car.s -= SPEED * dt;
      if (car.s < s - 90 || car.s > s + 720 || !car.active) {
        const next = s + 240 + rng() * 320 + i * 40;
        car.active = next > MIN_S && next < MAX_S;
        car.s = next;
      }
      if (!car.active || car.s < MIN_S || car.s > MAX_S) {
        car.active = false;
        for (const mesh of [bodies, trims, heads, tails]) mesh.setMatrixAt(i, hidden);
        continue;
      }
      placement(THREE, route, car.s, -LANE_OFFSET, { onRoad: true, y: 0.02, yaw: Math.PI }, m);
      for (const mesh of [bodies, trims, heads, tails]) mesh.setMatrixAt(i, m);
    }
    for (const mesh of [bodies, trims, heads, tails]) mesh.instanceMatrix.needsUpdate = true;
    const lamps = 0.35 + Math.min(1, night + rain * 0.6) * 3.2;
    headMat.color.copy(head.setRGB(1, 0.95, 0.85)).multiplyScalar(lamps);
    tailMat.color.setRGB(1, 0.08, 0.06).multiplyScalar(0.5 + night * 2.2);
  });
}
]]>
    </file>
  </files>
</template>
