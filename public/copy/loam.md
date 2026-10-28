<template slug="loam" name="LOAM">
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
    <file path="src/app/(loam)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { EB_Garamond, Host_Grotesk, Sono } from "next/font/google";
import "./loam/loam.css";

const serif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const sans = Host_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = Sono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "LOAM — Grown, not made.",
  description: "What you see is the smallest part. High-craft interactive 3D macro experience exploring mycelium materials grown from living fungal networks.",
  openGraph: {
    title: "LOAM — Grown, not made.",
    description: "What you see is the smallest part. Grown mycelium packaging materials from living fungal networks.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080604",
  colorScheme: "dark",
};

export default function LoamLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-loam-mode="specimen" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="loam-body bg-[#080604] text-[#f0e8d8] antialiased selection:bg-[#c8e64c]/30 selection:text-[#f0e8d8]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(loam)/loam/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(loam)/loam/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/loam";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`loam-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="font-mono-label">{assetKey}</span>
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
    <file path="src/app/(loam)/loam/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#080604"/>
  <path d="M16 6 C10 6 7 13 6 16 C12 16 20 16 26 16 C25 13 22 6 16 6 Z" fill="#F0E8D8"/>
  <ellipse cx="16" cy="6.5" rx="3.5" ry="1.2" fill="#7A5C43"/>
  <path d="M14.5 16 L14.5 25 C14.5 26.5 13 27.5 12 28 L20 28 C19 27.5 17.5 26.5 17.5 25 L17.5 16 Z" fill="#F0E8D8"/>
  <circle cx="16" cy="27" r="1.5" fill="#C8E64C"/>
</svg>
]]>
    </file>
    <file path="src/app/(loam)/loam/loam.css">
<![CDATA[@import "tailwindcss";

@layer base {
  :root {
    --font-serif: var(--font-serif, 'EB Garamond', Georgia, serif);
    --font-sans: var(--font-sans, 'Host Grotesk', -apple-system, BlinkMacSystemFont, sans-serif);
    --font-mono: var(--font-mono, 'Sono', ui-monospace, SFMono-Regular, monospace);
    --color-loam: #080604;
    --color-spore: #f0e8d8;
    --color-cap: #7a5c43;
    --color-foxfire: #c8e64c;

    /* Synchronized Sunlight / Time-of-Day CSS custom properties (default 0.75) */
    --page-bg: #080604;
    --sky-ambient: rgba(247, 231, 206, 0.153);
    --text-contrast: #f6efe3;
    --sun-accent: #f7e7ce;
  }

  html,
  body,
  .loam-body {
    background-color: var(--page-bg, var(--color-loam));
    color: var(--text-contrast, var(--color-spore));
    font-family: var(--font-sans);
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    transition: background-color 120ms linear, color 120ms linear;
  }

  h1,
  h2,
  h3,
  .font-serif-display {
    font-family: var(--font-serif);
  }

  .font-sans-body {
    font-family: var(--font-sans);
  }

  .font-mono-label {
    font-family: var(--font-mono);
    font-variant-caps: all-small-caps;
    letter-spacing: 0.14em;
  }
}

/* ── Experience mode: hide static specimen fallback when WebGL is active ── */
html[data-loam-mode="experience"] #loam-specimen-root {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.scene-copy-shadow {
  text-shadow:
    0 2px 18px rgba(5, 4, 3, 0.95),
    0 1px 4px rgba(5, 4, 3, 0.9);
}

/* Custom minimal botanical styling for the Sunlight / Time-of-Day range slider */
.loam-sun-slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.loam-sun-slider::-webkit-slider-runnable-track {
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 138, 61, 0.55) 0%,
    rgba(255, 167, 81, 0.65) 35%,
    rgba(247, 231, 206, 0.75) 75%,
    rgba(244, 248, 251, 0.9) 100%
  );
}

.loam-sun-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  margin-top: -5px;
  height: 12px;
  width: 12px;
  border-radius: 9999px;
  background: var(--sun-accent, #f7e7ce);
  border: 1.5px solid #080604;
  box-shadow: 0 0 8px rgba(247, 231, 206, 0.55);
  transition: transform 150ms ease, background-color 100ms linear;
}

.loam-sun-slider:hover::-webkit-slider-thumb,
.loam-sun-slider:focus-visible::-webkit-slider-thumb {
  transform: scale(1.2);
}

.loam-sun-slider::-moz-range-track {
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 138, 61, 0.55) 0%,
    rgba(255, 167, 81, 0.65) 35%,
    rgba(247, 231, 206, 0.75) 75%,
    rgba(244, 248, 251, 0.9) 100%
  );
}

.loam-sun-slider::-moz-range-thumb {
  height: 12px;
  width: 12px;
  border-radius: 9999px;
  background: var(--sun-accent, #f7e7ce);
  border: 1.5px solid #080604;
  box-shadow: 0 0 8px rgba(247, 231, 206, 0.55);
  transition: transform 150ms ease, background-color 100ms linear;
}

@keyframes sproutPush {
  0% {
    transform: translateY(34px) scale(0.4);
    opacity: 0;
  }
  55% {
    transform: translateY(-3px) scale(1.03);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
}

@keyframes capOpen {
  0% {
    transform: scaleX(0.55) scaleY(1.2);
  }
  100% {
    transform: scaleX(1) scaleY(1);
  }
}

.animate-sprout {
  animation: sproutPush 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-cap-open {
  transform-origin: 50% 45%;
  animation: capOpen 1.2s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
}
]]>
    </file>
    <file path="src/app/(loam)/loam/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#080604",
        color: "#F0E8D8",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, letterSpacing: 3 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            background: "#C8E64C",
          }}
        />
        LOAM
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 88, lineHeight: 1, letterSpacing: -1 }}>
          Grown, not made.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#C8E64C", opacity: 0.9 }}>
          What you see is the smallest part.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: 3,
          color: "#7A5C43",
        }}
      >
        <span>LIVING MYCELIUM PACKAGING</span>
        <span>01 — 06 INTERACTIVE 3D</span>
      </div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(loam)/loam/page.tsx">
<![CDATA[import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { LoamApp } from "./experience/LoamApp";

export default function LoamPage() {
  return (
    <>
      <div id="loam-specimen-root">
        <StaticFallbackPage />
      </div>
      <LoamApp />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(loam)/loam/components/OverlayUI.tsx">
<![CDATA[import React from 'react';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  LIFECYCLE_STEPS,
  computeSunlightState,
  type ChapterProgressState,
  type InspectableObjectId,
} from '../logic/chapters';
import type { InspectUIFrameState } from '../scene/inspectController';
import { SampleKitForm } from './SampleKitForm';

interface OverlayUIProps {
  chapterState: ChapterProgressState;
  inspectUI: InspectUIFrameState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onStepChapter: (direction: 1 | -1) => void;
  onJumpToChapter: (index: number) => void;
  onTriggerKeyboardInspect: (target: InspectableObjectId) => void;
  onExitInspect: () => void;
  sunlight?: number;
  onSunlightChange?: (value: number) => void;
}

/**
 * Helper for masked line-by-line rise animation driven by chapter opacity (0 -> 1).
 */
function MaskedLine({
  opacity,
  delayFactor = 0,
  children,
  className = '',
}: {
  opacity: number;
  delayFactor?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const localT = Math.max(
    0,
    Math.min(1, (opacity - delayFactor) / Math.max(0.01, 1 - delayFactor)),
  );
  const eased = 1 - Math.pow(1 - localT, 3);
  const translateY = (1 - eased) * 105;
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      <span
        className="block will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY.toFixed(1)}%, 0)`,
          opacity: eased,
        }}
      >
        {children}
      </span>
    </span>
  );
}

function LifecycleStepIcon({
  stepId,
  isStudioLight,
}: {
  stepId: (typeof LIFECYCLE_STEPS)[number]['id'];
  isStudioLight: boolean;
}) {
  const strokeColor = isStudioLight ? '#2c251d' : '#f0e8d8';
  const accentColor = isStudioLight ? '#6e8f11' : '#c8e64c';

  if (stepId === 'grown') {
    // Branching mycelium hyphae line icon
    return (
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 17.5V9.5M10 12.5L5.5 8M10 10.5L14.8 6.2M5.5 8L3.2 4.8M5.5 8L7.8 4.5M14.8 6.2L16.8 3.5M14.8 6.2L12.2 3.6"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="3.2" cy="4.8" r="1.1" fill={accentColor} />
        <circle cx="16.8" cy="3.5" r="1.1" fill={accentColor} />
        <circle cx="10" cy="3.2" r="1.1" fill={accentColor} />
      </svg>
    );
  }

  if (stepId === 'protects') {
    // Fragile glass flacon nestled inside a protective moulded tray wall
    return (
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 11.5V15.2C2.5 16.2 3.3 17 4.3 17H15.7C16.7 17 17.5 16.2 17.5 15.2V11.5L14.8 11.5V14.2H5.2V11.5L2.5 11.5Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="7.3"
          y="6.2"
          width="5.4"
          height="6.4"
          rx="0.9"
          stroke={strokeColor}
          strokeWidth="1.15"
        />
        <path
          d="M9.1 6.2V4.5H10.9V6.2M8.4 3.4H11.6"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 'composts' — speck of rich soil + tiny two-leaf sprout hinting at Chapter 06
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 15.8C5.8 14.6 8.2 14.3 10 14.3C11.8 14.3 14.2 14.6 16.5 15.8"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6.2" cy="16.8" r="0.75" fill={strokeColor} />
      <circle cx="10.0" cy="17.2" r="0.85" fill={strokeColor} />
      <circle cx="13.8" cy="16.7" r="0.75" fill={strokeColor} />
      <path
        d="M10 14.3V7.2"
        stroke={accentColor}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M10 9.6C7.2 9.6 5.6 7.8 5.8 5.5C8.1 5.3 10 6.8 10 9.6Z"
        stroke={accentColor}
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.2C12.6 8.2 14.2 6.5 14.0 4.3C11.8 4.1 10 5.6 10 8.2Z"
        stroke={accentColor}
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const OverlayUI: React.FC<OverlayUIProps> = ({
  chapterState,
  inspectUI,
  soundEnabled,
  onToggleSound,
  onTriggerKeyboardInspect,
  onExitInspect,
  sunlight = DEFAULT_SUNLIGHT,
  onSunlightChange,
}) => {
  const {
    activeChapter,
    activeChapterIndex,
    isChapter4aClump,
    isChapter4bWide,
    chapterOpacities,
    undergroundFactor,
    studioLightness = 0,
    lifecycleStripReveal = 0,
    lifecycleStepReveals = [0, 0, 0],
  } = chapterState;
  const isInspecting = inspectUI.phase === 'inspecting';
  const isHolding = inspectUI.phase === 'holding';
  const sunState = computeSunlightState(sunlight);
  const isStudioLight = studioLightness > 0.45;
  const shadowClass = isStudioLight ? '' : 'scene-copy-shadow';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 sm:p-11"
      data-active-chapter={activeChapter.numberLabel}
      data-sub-rest={isChapter4aClump ? '4a' : isChapter4bWide ? '4b' : ''}
      data-inspect-phase={inspectUI.phase}
      data-studio-light={isStudioLight ? 'light' : 'dark'}
    >
      {/* Synchronized 2D upper-canopy sky ambient glow + dark readability scrims (fades out cleanly in the bright Ch 05 studio) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-200"
        style={{
          background:
            'radial-gradient(ellipse 72% 48% at 50% 0%, var(--sky-ambient, rgba(247, 231, 206, 0.14)) 0%, rgba(8, 6, 4, 0) 70%), radial-gradient(ellipse 52% 48% at 22% 52%, rgba(7, 5, 4, 0.56) 0%, rgba(7, 5, 4, 0.18) 58%, rgba(7, 5, 4, 0) 100%), linear-gradient(180deg, rgba(7, 5, 4, 0.38) 0%, rgba(7, 5, 4, 0) 18%, rgba(7, 5, 4, 0) 80%, rgba(7, 5, 4, 0.55) 100%)',
          opacity: (1 - undergroundFactor * 0.25) * (1 - studioLightness),
        }}
      />

      {/* Top Bar: Small "LOAM" wordmark top-left, Sunlight / Time-of-Day slider center-right, Sound toggle top-right */}
      <header className="flex items-center justify-between gap-4 sm:gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`pointer-events-auto ${shadowClass} font-serif-display text-2xl font-normal tracking-[0.22em] transition-colors duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
            isStudioLight
              ? 'text-[#1c1712]'
              : 'text-[var(--text-contrast,#f0e8d8)]'
          }`}
        >
          LOAM
        </a>

        <div className="pointer-events-auto flex items-center gap-5 sm:gap-7">
          {/* Interactive Sunlight / Time-of-Day Slider (0.0 Dusk/Night -> 0.75 Default -> 1.0 Bright Midday Sun) */}
          <div
            className={`${shadowClass} flex items-center gap-2.5 border-b pb-1 transition-colors duration-200 ${
              isStudioLight ? 'border-[#1c1712]/25' : 'border-[#f0e8d8]/25'
            }`}
            title="Adjust forest canopy sunlight & time of day"
          >
            {/* Left extremity: Dusk/Moon SVG icon */}
            <button
              type="button"
              onClick={() => onSunlightChange?.(0.0)}
              aria-label="Set lighting to dusk (0.0)"
              className={`transition-colors focus-visible:outline-1 focus-visible:outline-[#c8e64c] ${
                isStudioLight
                  ? 'text-[#8a5229] hover:text-[#5c3314]'
                  : 'text-[#ff9b54]/80 hover:text-[#ff9b54]'
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13.2 10.1A5.5 5.5 0 0 1 5.9 2.8a5.5 5.5 0 1 0 7.3 7.3z" />
              </svg>
            </button>

            <input
              id="loam-sunlight-slider"
              data-testid="sunlight-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sunlight}
              onChange={(e) => onSunlightChange?.(parseFloat(e.target.value))}
              aria-label="Sunlight and time of day"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={Number(sunlight.toFixed(2))}
              aria-valuetext={`${sunState.timeLabel} (${Math.round(sunlight * 100)}% sunlight)`}
              className="loam-sun-slider w-20 sm:w-28 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c]"
            />

            {/* Right extremity: Midday Sun SVG icon */}
            <button
              type="button"
              onClick={() => onSunlightChange?.(1.0)}
              aria-label="Set lighting to bright midday sun (1.0)"
              className={`transition-colors focus-visible:outline-1 focus-visible:outline-[#c8e64c] ${
                isStudioLight
                  ? 'text-[#2c251d]/80 hover:text-[#1c1712]'
                  : 'text-[#f4f8fb]/85 hover:text-[#ffffff]'
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
              </svg>
            </button>

            <span
              data-testid="sunlight-time-label"
              className={`hidden min-w-[5.6rem] text-right font-mono-label text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 md:inline-block ${
                isStudioLight
                  ? 'text-[#2c251d]/80'
                  : 'text-[var(--text-contrast,#f0e8d8)]/80'
              }`}
            >
              {sunState.timeLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={
              soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'
            }
            className={`${shadowClass} flex items-center gap-2 border-b pb-1 font-mono-label text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
              isStudioLight
                ? 'border-[#1c1712]/25 text-[#1c1712]/85 hover:border-[#6e8f11] hover:text-[#1c1712]'
                : 'border-[#f0e8d8]/25 text-[var(--text-contrast,#f0e8d8)]/85 hover:border-[#c8e64c] hover:text-[var(--text-contrast,#f0e8d8)]'
            }`}
          >
            {soundEnabled ? (
              <>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3.5 w-3.5 ${
                    isStudioLight ? 'text-[#6e8f11]' : 'text-[#c8e64c]'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 6.2H5l3.2-2.7v9L5 9.8H2.5z" />
                  <path d="M10.8 5.5a3.5 3.5 0 0 1 0 5" />
                  <path d="M12.8 3.6a6.2 6.2 0 0 1 0 8.8" />
                </svg>
                <span>Sound on</span>
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3.5 w-3.5 ${
                    isStudioLight ? 'text-[#1c1712]/55' : 'text-[#f0e8d8]/55'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 6.2H5l3.2-2.7v9L5 9.8H2.5z" />
                  <path d="M10.5 6l3.5 4" />
                  <path d="M14 6l-3.5 4" />
                </svg>
                <span>Sound off</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Center Stage: Unboxed Chapter Copy, 3D-Pinned Tray Labels, Sample Kit Form & Inspect Pinned Labels */}
      <main className="relative flex flex-1 items-center justify-center">
        {/* Chapter 1: THE FRUIT */}
        {chapterOpacities[0] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-lg scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[0]} delayFactor={0}>
              <p className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-[#c8e64c]/90">
                Grown, not made.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.08}
              className="mt-2"
            >
              <h1 className="font-serif-display text-6xl font-normal tracking-tight text-[#f0e8d8] sm:text-8xl">
                LOAM
              </h1>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.16}
              className="mt-3"
            >
              <p className="font-sans-body text-base font-normal leading-relaxed text-[#f0e8d8]/85 sm:text-lg">
                What you see is the smallest part.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.24}
              className="mt-2"
            >
              <p className="font-serif-display text-sm italic text-[#f0e8d8]/60">
                Macrolepiota procera &mdash; fruiting body above damp forest humus
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 2: UNDER THE CAP */}
        {chapterOpacities[1] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-xl scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[1]} delayFactor={0}>
              <p className="font-serif-display text-4xl font-normal leading-[1.12] text-[#f0e8d8] sm:text-5xl">
                A mushroom is only the fruit.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[1]}
              delayFactor={0.12}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal tracking-wide text-[#f0e8d8]/80 sm:text-base">
                The organism lives underground.
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 3: BREAKING GROUND */}
        {chapterOpacities[2] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-lg scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[2]} delayFactor={0}>
              <p className="font-serif-display text-4xl italic font-normal leading-[1.15] text-[#f0e8d8] sm:text-5xl">
                Leaf litter. Moss. Tangled roots. Dark earth.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[2]}
              delayFactor={0.14}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal tracking-wide text-[#f0e8d8]/72 sm:text-base">
                Descending through the forest floor into the living substrate.
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 4: THE NETWORK (4a close clump -> 4b wide network) */}
        {chapterOpacities[3] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 top-1/4 max-w-xl scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[3]} delayFactor={0}>
              <p className="font-serif-display text-4xl font-normal leading-[1.12] text-[#f0e8d8] sm:text-5xl">
                Miles of living thread under every step.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[3]}
              delayFactor={0.12}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal text-[#f0e8d8]/80 sm:text-base">
                {isChapter4aClump
                  ? 'Where the stem meets the soil, dense rhizomorph cords bind bark and humus.'
                  : 'Move pointer to wake threads · Click any filament to send a bioluminescent pulse.'}
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 5: THE MATERIAL — studio reveal, dark-ink typography, 3D-pinned leader lines, and 3-step lifecycle strip */}
        {chapterOpacities[4] > 0.01 && !isInspecting && (
          <div
            style={{ opacity: chapterOpacities[4] }}
            className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-150"
          >
            {/* Left-aligned Chapter 5 headline + subline */}
            <div
              className={`pointer-events-none absolute left-6 top-20 max-w-md sm:left-11 sm:top-24 ${shadowClass}`}
            >
              <MaskedLine opacity={chapterOpacities[4]} delayFactor={0}>
                <p
                  className={`font-serif-display text-4xl font-normal leading-[1.12] transition-colors duration-200 sm:text-5xl ${
                    isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
                  }`}
                >
                  Compressed into form.
                </p>
              </MaskedLine>
              <MaskedLine
                opacity={chapterOpacities[4]}
                delayFactor={0.12}
                className="mt-2.5"
              >
                <p
                  className={`font-sans-body text-sm font-normal transition-colors duration-200 sm:text-base ${
                    isStudioLight ? 'text-[#42382c]' : 'text-[#f0e8d8]/78'
                  }`}
                >
                  Living hyphae bind agricultural hemp hurd into rigid protective packaging.
                </p>
              </MaskedLine>
            </div>

            {/* SVG leader lines pinned directly to 3D coordinates on the tray */}
            <svg className="h-full w-full" aria-hidden="true">
              {inspectUI.trayCallouts.map((pin) =>
                pin.visible ? (
                  <g key={pin.id}>
                    <line
                      x1={pin.anchorX}
                      y1={pin.anchorY}
                      x2={pin.screenX}
                      y2={pin.screenY + 12}
                      stroke={isStudioLight ? '#2c251d' : '#f0e8d8'}
                      strokeWidth="0.95"
                      strokeOpacity={isStudioLight ? '0.45' : '0.52'}
                    />
                    <circle
                      cx={pin.anchorX}
                      cy={pin.anchorY}
                      r="3.0"
                      fill={isStudioLight ? '#84ab14' : '#c8e64c'}
                    />
                  </g>
                ) : null,
              )}
            </svg>

            {inspectUI.trayCallouts.map((pin) =>
              pin.visible ? (
                <div
                  key={pin.id}
                  style={{
                    transform: `translate3d(${Math.round(pin.screenX)}px, ${Math.round(pin.screenY)}px, 0) translate(-50%, -50%)`,
                  }}
                  className={`${shadowClass} absolute left-0 top-0 border-b pb-1 font-mono-label text-xs uppercase tracking-[0.14em] transition-colors duration-200 whitespace-nowrap ${
                    isStudioLight
                      ? 'border-[#1c1712]/30 text-[#1c1712]'
                      : 'border-[#c8e64c]/60 text-[#f0e8d8]'
                  }`}
                >
                  {pin.label}
                </div>
              ) : null,
            )}

            {/* Quiet typographic Lifecycle Strip near the bottom of the frame */}
            {lifecycleStripReveal > 0.01 && (
              <div
                data-testid="lifecycle-strip"
                style={{ opacity: lifecycleStripReveal }}
                className={`pointer-events-none fixed bottom-16 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-4 md:gap-6 border-t pt-2.5 ${shadowClass} ${
                  isStudioLight ? 'border-[#1c1712]/15' : 'border-[#f0e8d8]/20'
                }`}
              >
                {LIFECYCLE_STEPS.map((step, idx) => {
                  const stepReveal = lifecycleStepReveals[idx] ?? lifecycleStripReveal;
                  const translateY = (1 - stepReveal) * 8;
                  return (
                    <React.Fragment key={step.id}>
                      <div
                        data-testid={`lifecycle-step-${step.id}`}
                        style={{
                          opacity: stepReveal,
                          transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
                        }}
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        <LifecycleStepIcon
                          stepId={step.id}
                          isStudioLight={isStudioLight}
                        />
                        <span
                          className={`font-mono-label text-[11px] uppercase tracking-[0.14em] ${
                            isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {idx < LIFECYCLE_STEPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          style={{ opacity: stepReveal * 0.65 }}
                          className={`font-mono-label text-xs ${
                            isStudioLight ? 'text-[#4a4035]' : 'text-[#f0e8d8]/60'
                          }`}
                        >
                          &rarr;
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Chapter 6: RETURN + Request a sample kit form */}
        {chapterOpacities[5] > 0.05 && !isInspecting && (
          <div
            style={{ opacity: chapterOpacities[5] }}
            className="pointer-events-auto ml-auto mr-0 flex w-full max-w-md flex-col items-end justify-center transition-opacity duration-150"
          >
            <SampleKitForm />
          </div>
        )}

        {/* Hold-to-Inspect 3D Pinned Part Labels & SVG Leader Lines */}
        {isInspecting && (
          <div
            className="pointer-events-none fixed inset-0 z-20"
            aria-live="polite"
          >
            <svg className="h-full w-full" aria-hidden="true">
              {inspectUI.pins.map((pin) =>
                pin.visible ? (
                  <g key={pin.id}>
                    <line
                      x1={pin.anchorX}
                      y1={pin.anchorY}
                      x2={pin.screenX}
                      y2={pin.screenY}
                      stroke={isStudioLight ? '#2c251d' : '#c8e64c'}
                      strokeWidth="0.95"
                      strokeOpacity={isStudioLight ? '0.52' : '0.7'}
                    />
                    <circle
                      cx={pin.anchorX}
                      cy={pin.anchorY}
                      r="2.8"
                      fill={isStudioLight ? '#84ab14' : '#c8e64c'}
                    />
                  </g>
                ) : null,
              )}
            </svg>

            {inspectUI.pins.map((pin) =>
              pin.visible ? (
                <div
                  key={pin.id}
                  style={{
                    transform: `translate3d(${Math.round(pin.screenX)}px, ${Math.round(pin.screenY)}px, 0) translate(-50%, -50%)`,
                  }}
                  className={`${shadowClass} absolute left-0 top-0 border-b pb-0.5 font-serif-display text-sm italic tracking-wide whitespace-nowrap ${
                    isStudioLight
                      ? 'border-[#1c1712]/35 text-[#1c1712]'
                      : 'border-[#c8e64c]/65 text-[#f0e8d8]'
                  }`}
                >
                  {pin.label}
                </div>
              ) : null,
            )}

            {/* Active Inspect Helper Banner */}
            <div
              className={`pointer-events-auto ${shadowClass} fixed top-20 left-1/2 -translate-x-1/2 flex items-center gap-5 border-b pb-1.5 font-mono-label text-[11px] uppercase tracking-[0.14em] ${
                isStudioLight
                  ? 'border-[#1c1712]/30 text-[#1c1712]'
                  : 'border-[#c8e64c]/45 text-[#f0e8d8]'
              }`}
            >
              <span>Drag or use Arrow keys to rotate specimen</span>
              <button
                type="button"
                onClick={onExitInspect}
                className={`underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
                  isStudioLight
                    ? 'text-[#5b7809] hover:text-[#3b4f04]'
                    : 'text-[#c8e64c] hover:text-[#e4f882]'
                }`}
              >
                Release (Esc)
              </button>
            </div>
          </div>
        )}

        {/* ~350ms Pointer Hold Progress Ring */}
        {isHolding && (
          <div
            style={{
              transform: `translate3d(${inspectUI.pointerX}px, ${inspectUI.pointerY}px, 0) translate(-50%, -50%)`,
            }}
            className="pointer-events-none fixed left-0 top-0 z-30 h-14 w-14"
            aria-hidden="true"
          >
            <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={
                  isStudioLight
                    ? 'rgba(28, 23, 18, 0.18)'
                    : 'rgba(240, 232, 216, 0.2)'
                }
                strokeWidth="2"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={isStudioLight ? '#84ab14' : '#c8e64c'}
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={
                  2 * Math.PI * 22 * (1 - inspectUI.holdProgress)
                }
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </main>

      {/* Bottom Bar: Chapter Marker bottom-left + Focusable Inspect Button & Hint bottom-right */}
      <footer className="flex items-end justify-between gap-6">
        {/* Bottom-left Chapter Marker ("01 — The fruit") in Sono monospace small-caps tracking */}
        <div className={`${shadowClass} flex flex-col gap-1`}>
          <div
            aria-live="polite"
            data-testid="chapter-marker"
            className={`font-mono-label text-xs uppercase tracking-[0.2em] transition-colors duration-200 sm:text-sm whitespace-nowrap ${
              isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
            }`}
          >
            {activeChapter.markerLabel}
          </div>
          <div
            className={`font-sans-body text-xs transition-colors duration-200 ${
              isStudioLight ? 'text-[#4a4035]/80' : 'text-[#f0e8d8]/55'
            }`}
          >
            Scroll or press &darr; / Space ({activeChapterIndex + 1} of{' '}
            {CHAPTERS.length})
          </div>
        </div>

        {/* Hold-to-Inspect Hint & Accessible Keyboard Button — only shown when activeChapter.inspectableObject is non-null (Ch 1, Ch 4a only, Ch 5) */}
        {activeChapter.inspectableObject && (
          <div
            className={`pointer-events-auto ${shadowClass} flex items-center gap-4`}
          >
            {!inspectUI.hasUsedInspect && !isInspecting && (
              <span
                className={`font-serif-display text-sm italic transition-colors duration-200 ${
                  isStudioLight ? 'text-[#4a4035]' : 'text-[#f0e8d8]/75'
                }`}
              >
                Hold on specimen to inspect
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                onTriggerKeyboardInspect(activeChapter.inspectableObject!)
              }
              aria-expanded={isInspecting}
              className={`border-b pb-1 font-mono-label text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] ${
                isInspecting
                  ? isStudioLight
                    ? 'border-[#6e8f11] text-[#5b7809]'
                    : 'border-[#c8e64c] text-[#c8e64c]'
                  : isStudioLight
                    ? 'border-[#1c1712]/35 text-[#1c1712] hover:border-[#6e8f11] hover:text-[#5b7809]'
                    : 'border-[#f0e8d8]/40 text-[#f0e8d8] hover:border-[#c8e64c] hover:text-[#c8e64c]'
              }`}
            >
              {isInspecting
                ? 'Exit inspect (Esc)'
                : activeChapter.inspectButtonLabel || 'Inspect'}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

]]>
    </file>
    <file path="src/app/(loam)/loam/components/SampleKitForm.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import {
  validateSampleKitForm,
  type SampleKitFormValues,
  type SampleKitFormErrors,
  type SampleKitUseCase,
} from '../logic/formValidation';

interface SampleKitFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  idPrefix?: string;
}

export const SampleKitForm: React.FC<SampleKitFormProps> = ({
  onSuccess,
  compact = false,
  idPrefix = '',
}) => {
  const [values, setValues] = useState<SampleKitFormValues>({
    name: '',
    workEmail: '',
    company: '',
    useCase: 'packaging',
    note: '',
  });
  const [errors, setErrors] = useState<SampleKitFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSampleKitForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const handleChange = (field: keyof SampleKitFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof SampleKitFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full max-w-md border-t border-b border-[#f0e8d8]/20 bg-[#080604]/72 px-6 py-8 text-[#f0e8d8]"
      >
        <div className="flex flex-col items-start text-left">
          {/* Animated small mushroom pushing up through dark loam soil */}
          <div className="relative mb-5 flex h-28 w-36 items-end justify-center overflow-hidden">
            <svg
              viewBox="0 0 140 110"
              className="h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Underground foxfire mycelium threads */}
              <path
                d="M70 92 C58 98, 42 102, 26 105 M70 92 C82 99, 98 101, 114 106 M70 92 C68 99, 64 105, 58 109"
                stroke="#c8e64c"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              {/* Sprouting mushroom group */}
              <g className="animate-sprout">
                <path
                  d="M65 90 C62 84, 66 62, 67 42 L73 42 C74 62, 78 84, 75 90 Z"
                  fill="#d8cbb8"
                />
                <ellipse
                  cx="70"
                  cy="54"
                  rx="9"
                  ry="2.8"
                  fill="#e2d6c3"
                  stroke="#7a5b42"
                  strokeWidth="0.8"
                />
                <g className="animate-cap-open">
                  <path
                    d="M36 43 C42 28, 58 24, 64 20 C68 17, 72 17, 76 20 C82 24, 98 28, 104 43 C86 45, 54 45, 36 43 Z"
                    fill="#d2c3ae"
                  />
                  <ellipse cx="70" cy="22" rx="8" ry="4" fill="#4e3522" />
                  <circle cx="57" cy="31" r="2.2" fill="#63452d" />
                  <circle cx="70" cy="30" r="2.4" fill="#63452d" />
                  <circle cx="83" cy="31" r="2.2" fill="#63452d" />
                  <circle cx="48" cy="37" r="2" fill="#73533a" />
                  <circle cx="62" cy="37" r="2.2" fill="#73533a" />
                  <circle cx="78" cy="37" r="2.2" fill="#73533a" />
                  <circle cx="92" cy="37" r="2" fill="#73533a" />
                </g>
              </g>
              {/* Dark loam soil mound foreground */}
              <path
                d="M14 92 Q42 84, 70 88 Q98 84, 126 92 L132 104 L8 104 Z"
                fill="#18120c"
                stroke="#33261b"
                strokeWidth="1"
              />
              <ellipse cx="46" cy="90" rx="8" ry="2.2" fill="#3a4f22" />
              <ellipse cx="92" cy="91" rx="9" ry="2.2" fill="#3a4f22" />
            </svg>
          </div>

          <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-[#c8e64c]">
            Specimen culture initiated
          </p>
          <h3 className="mt-1 font-serif-display text-4xl font-normal tracking-tight text-[#f0e8d8]">
            Something&rsquo;s growing.
          </h3>
          <p className="mt-3 font-sans-body text-sm leading-relaxed text-[#f0e8d8]/75">
            We&rsquo;ve inoculated a sample kit for{' '}
            <span className="font-medium text-[#f0e8d8]">{values.company}</span>
            . Expect dispatch notes at{' '}
            <span className="font-medium text-[#f0e8d8]">
              {values.workEmail}
            </span>{' '}
            within 48 hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setValues({
                name: '',
                workEmail: '',
                company: '',
                useCase: 'packaging',
                note: '',
              });
            }}
            className="mt-6 border-b border-[#f0e8d8]/40 pb-1 font-mono-label text-xs uppercase tracking-[0.14em] text-[#f0e8d8]/85 transition-colors hover:border-[#c8e64c] hover:text-[#c8e64c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0"
          >
            Request another kit
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Request a sample kit"
      className={`w-full max-w-md border-t border-b border-[#f0e8d8]/20 bg-[#080604]/72 ${
        compact ? 'px-5 py-5' : 'px-6 py-7'
      } text-[#f0e8d8]`}
    >
      <div className="mb-6">
        <p className="font-mono-label text-[11px] uppercase tracking-[0.18em] text-[#c8e64c]/90">
          06 &mdash; Return
        </p>
        <h2 className="mt-1 font-serif-display text-3xl font-normal tracking-tight text-[#f0e8d8] sm:text-4xl">
          Request a sample kit
        </h2>
        <p className="mt-1.5 font-sans-body text-xs text-[#f0e8d8]/65">
          Evaluate grown mycelium + hemp packaging specimens in your own studio.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={`${idPrefix}loam-name`}
            className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
          >
            Name
          </label>
          <input
            id={`${idPrefix}loam-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Elena Vance"
            aria-invalid={!!errors.name}
            className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
          />
          {errors.name && (
            <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${idPrefix}loam-email`}
              className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
            >
              Work email
            </label>
            <input
              id={`${idPrefix}loam-email`}
              name="workEmail"
              type="email"
              required
              autoComplete="email"
              value={values.workEmail}
              onChange={(e) => handleChange('workEmail', e.target.value)}
              placeholder="elena@studio.co"
              aria-invalid={!!errors.workEmail}
              className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
            />
            {errors.workEmail && (
              <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
                {errors.workEmail}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}loam-company`}
              className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
            >
              Company
            </label>
            <input
              id={`${idPrefix}loam-company`}
              name="company"
              type="text"
              required
              autoComplete="organization"
              value={values.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Fieldcraft"
              aria-invalid={!!errors.company}
              className="mt-1 w-full border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-2 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
            />
            {errors.company && (
              <p role="alert" className="mt-1 font-sans-body text-xs text-[#e5886e]">
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div>
          <span className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75">
            Use
          </span>
          <div
            role="radiogroup"
            aria-label="Intended use"
            className="mt-2 grid grid-cols-3 gap-3"
          >
            {(['packaging', 'panels', 'other'] as SampleKitUseCase[]).map(
              (option) => {
                const isSelected = values.useCase === option;
                const label =
                  option === 'packaging'
                    ? 'Packaging'
                    : option === 'panels'
                      ? 'Panels'
                      : 'Other';
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleChange('useCase', option)}
                    className={`border-b py-1.5 text-left font-mono-label text-xs uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8e64c] ${
                      isSelected
                        ? 'border-[#c8e64c] text-[#c8e64c]'
                        : 'border-[#f0e8d8]/20 text-[#f0e8d8]/60 hover:border-[#f0e8d8]/45 hover:text-[#f0e8d8]'
                    }`}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}loam-note`}
            className="block font-mono-label text-[11px] uppercase tracking-[0.14em] text-[#f0e8d8]/75"
          >
            Note <span className="text-[#f0e8d8]/40">(optional)</span>
          </label>
          <textarea
            id={`${idPrefix}loam-note`}
            name="note"
            rows={2}
            value={values.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Dimensions, annual volume, or mould requirements..."
            className="mt-1 w-full resize-none border-0 border-b border-[#f0e8d8]/25 bg-transparent px-0 py-1.5 font-sans-body text-sm text-[#f0e8d8] placeholder-[#f0e8d8]/30 transition-colors focus:border-[#c8e64c] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8e64c]"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full border border-[#c8e64c] bg-[#c8e64c]/15 px-4 py-2.5 font-mono-label text-xs uppercase tracking-[0.16em] text-[#e4f882] transition-colors hover:bg-[#c8e64c] hover:text-[#080604] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0"
          >
            Request sample kit
          </button>
        </div>
      </div>
    </form>
  );
};
]]>
    </file>
    <file path="src/app/(loam)/loam/components/StaticFallbackPage.tsx">
<![CDATA[/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  MATERIAL_CALLOUT_LABELS,
  computeSunlightState,
} from '../logic/chapters';
import { OBJECT_PART_PINS } from '../logic/holdInspectLogic';
import { SampleKitForm } from './SampleKitForm';

interface StaticFallbackPageProps {
  sunlight?: number;
  }

/**
 * Static specimen sheet fallback experience rendered on the server.
 * Visible before JavaScript runs, with JavaScript disabled, when prefers-reduced-motion: reduce
 * is active, or if WebGL is unsupported/fails.
 *
 * Contains all 6 chapters' copy, product facts, the 8 reference photos as specimen plates,
 * the sunlight / time-of-day control, and the sample kit form.
 */
export const StaticFallbackPage: React.FC<StaticFallbackPageProps> = ({
  sunlight = DEFAULT_SUNLIGHT,
  }) => {
  const sunState = computeSunlightState(sunlight);

  return (
    <div
      className="min-h-screen px-6 py-10 transition-colors duration-200 sm:px-12"
      style={{
        backgroundColor: 'var(--page-bg, #080604)',
        color: 'var(--text-contrast, #f0e8d8)',
        backgroundImage:
          'radial-gradient(ellipse 75% 40% at 50% 0%, var(--sky-ambient, rgba(247, 231, 206, 0.14)) 0%, transparent 70%)',
      }}
    >
      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 border-b border-[#f0e8d8]/15 pb-6">
        <span className="font-serif-display text-2xl font-normal tracking-[0.22em]">
          LOAM
        </span>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 border-b border-[#f0e8d8]/25 pb-1">
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 text-[#ff9b54]/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13.2 10.1A5.5 5.5 0 0 1 5.9 2.8a5.5 5.5 0 1 0 7.3 7.3z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue={sunlight}
              readOnly
              aria-label="Sunlight and time of day"
              className="loam-sun-slider w-24 sm:w-28"
            />
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 text-[#f4f8fb]/85"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
            </svg>
            <span className="font-mono-label text-[10px] uppercase tracking-[0.15em] opacity-80">
              {sunState.timeLabel}
            </span>
          </div>

          <span className="font-mono-label text-xs uppercase tracking-[0.18em] opacity-65">
            Grown, not made.
          </span>
        </div>
      </header>

      <main className="mx-auto mt-12 max-w-5xl space-y-20">
        {CHAPTERS.map((ch) => (
          <section
            key={ch.numberLabel}
            data-chapter={ch.numberLabel}
            className="grid grid-cols-1 gap-8 border-b border-[#f0e8d8]/10 pb-14 md:grid-cols-12 md:items-center"
          >
            <div className="md:col-span-6 space-y-3">
              <div className="font-mono-label text-xs uppercase tracking-[0.2em] text-[#c8e64c]">
                {ch.markerLabel}
              </div>
              {ch.headline && (
                <h1 className="font-serif-display text-5xl font-normal text-[#f0e8d8]">
                  {ch.headline}
                </h1>
              )}
              <p className="font-serif-display text-3xl leading-snug opacity-90">
                {ch.copy}
              </p>

              {ch.specimenNote && (
                <p className="font-serif-display text-sm italic opacity-60">
                  {ch.specimenNote}
                </p>
              )}

              {ch.index === 4 && (
                <div className="pt-3 font-mono-label text-xs uppercase tracking-[0.14em] text-[#c8e64c]/90">
                  {MATERIAL_CALLOUT_LABELS.join(' · ')}
                </div>
              )}

              {ch.inspectableObject && (
                <div className="pt-2 font-serif-display text-sm italic opacity-70">
                  Specimen anatomy:{' '}
                  {OBJECT_PART_PINS[ch.inspectableObject]
                    .map((p) => p.label)
                    .join(' · ')}
                </div>
              )}
            </div>

            <div className="md:col-span-6">
              {ch.index === 0 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mushroom-front.webp"
                      alt="Macrolepiota procera parasol mushroom specimen (front view)"
                      width={600}
                      height={600}
                      loading="eager"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mushroom-side.webp"
                      alt="Parasol mushroom showing radial symmetry (side view)"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 01 — Fruiting body profile & radial symmetry
                  </figcaption>
                </figure>
              )}
              {ch.index === 1 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mushroom-from-below.webp"
                      alt="Underside radiating white gills of the parasol mushroom"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mushroom-from-above.webp"
                      alt="Cap scale pattern and dark central umbo from above"
                      width={600}
                      height={600}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 02 — Lamellae hymenophore and concentric cap scales
                  </figcaption>
                </figure>
              )}
              {ch.index === 2 && (
                <div className="rounded border border-[#f0e8d8]/10 bg-[#080604]/60 p-6 text-sm font-sans-body leading-relaxed opacity-85">
                  <p className="font-serif-display text-lg italic text-[#f0e8d8]">
                    Subterranean soil horizons
                  </p>
                  <p className="mt-2 text-xs opacity-75">
                    Leaf litter (0.0 to -0.42m) &rarr; Moist crumbly humus (-0.42 to -1.12m) &rarr; Mineral topsoil (-1.12 to -1.92m) &rarr; Dense clay subsoil (-1.92 to -4.40m).
                  </p>
                </div>
              )}
              {ch.index === 3 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/mycelium-clump-front.webp"
                      alt="Mycelium clump with cream rhizomorph cords and cottony hyphae"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/mycelium-clump-back.webp"
                      alt="Rear view of colonized humus and wood-chip substrate"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 03 — Vegetative mycelium cord mass and colonized substrate
                  </figcaption>
                </figure>
              )}
              {ch.index === 4 && (
                <figure className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="/templates/loam/references/material-top.webp"
                      alt="Molded mycelium packaging tray with recessed cavity"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                    <img
                      src="/templates/loam/references/material-underside-and-cut-edge.webp"
                      alt="Molded tray underside showing fibrous cut corner"
                      width={600}
                      height={335}
                      loading="lazy"
                      className="mx-auto max-h-72 w-full object-contain rounded border border-[#f0e8d8]/10 bg-[#080604]/40 p-2"
                    />
                  </div>
                  <figcaption className="text-center font-mono-label text-[10px] uppercase tracking-[0.14em] opacity-60">
                    Plate 04 — Grown packaging tray and exposed fibrous core
                  </figcaption>
                </figure>
              )}
              {ch.index === 5 && <SampleKitForm idPrefix="fallback-" />}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(loam)/loam/experience/LoamApp.tsx">
<![CDATA["use client";

import dynamic from "next/dynamic";

// The experience reads window/WebGL during its first render, so it never prerenders.
const LoamExperience = dynamic(() => import("./LoamExperience").then((m) => m.LoamExperience), { ssr: false });

export function LoamApp() {
  return <LoamExperience />;
}
]]>
    </file>
    <file path="src/app/(loam)/loam/experience/LoamExperience.tsx">
<![CDATA['use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  computeCameraPoseAtProgress,
  computeSunlightState,
  getChapterStateAtProgress,
  type ChapterProgressState,
  type InspectableObjectId,
} from '../logic/chapters';
import { generateMyceliumNetwork } from '../logic/networkGenerator';
import { createProceduralTextures } from '../scene/textures';
import { buildParasolMushroom } from '../scene/models/mushroomModel';
import { buildMyceliumClump } from '../scene/models/clumpModel';
import { buildPackagingTray } from '../scene/models/trayModel';
import { buildStudioSet } from '../scene/models/studioSet';
import { buildProductFamily } from '../scene/models/productFamily';
import { buildForestAndSoil } from '../scene/forestAndSoil';
import { buildMyceliumNetworkScene } from '../scene/myceliumNetwork';
import {
  createRendererAndPostStack,
  isWebGLAvailable,
} from '../scene/rendererAndPost';
import {
  createInspectController,
  type InspectUIFrameState,
} from '../scene/inspectController';
import {
  createScrollController,
  type ScrollController,
} from '../scene/scrollTimeline';
import {
  createSoundController,
  type SoundController,
} from '../scene/soundSynth';
import { OverlayUI } from '../components/OverlayUI';

function applyRootSunlightCssVars(sunlightValue: number) {
  if (typeof document === 'undefined') return;
  const { cssVars } = computeSunlightState(sunlightValue);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--page-bg', cssVars['--page-bg']);
  rootStyle.setProperty('--sky-ambient', cssVars['--sky-ambient']);
  rootStyle.setProperty('--text-contrast', cssVars['--text-contrast']);
  rootStyle.setProperty('--sun-accent', cssVars['--sun-accent']);
}

export function LoamExperience() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Check if reduced-motion or WebGL2 is unavailable; if so, engine never mounts.
  const [canMount] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    return !reducedMotion && isWebGLAvailable();
  });

  const [webglActive, setWebglActive] = useState(false);

  const [chapterState, setChapterState] = useState<ChapterProgressState>(() =>
    getChapterStateAtProgress(0),
  );
  const [inspectUI, setInspectUI] = useState<InspectUIFrameState>({
    phase: 'idle',
    targetObject: null,
    holdProgress: 0,
    pointerX: 0,
    pointerY: 0,
    hasUsedInspect: false,
    keyboardMode: false,
    pins: [],
    trayCallouts: [],
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sunlight, setSunlight] = useState<number>(DEFAULT_SUNLIGHT);
  const targetSunlightRef = useRef<number>(DEFAULT_SUNLIGHT);

  const scrollControllerRef = useRef<ScrollController | null>(null);
  const inspectControllerRef = useRef<ReturnType<
    typeof createInspectController
  > | null>(null);
  const soundControllerRef = useRef<SoundController | null>(null);

  const handleSunlightChange = (nextValue: number) => {
    const clamped = Math.max(0, Math.min(1, nextValue));
    targetSunlightRef.current = clamped;
    setSunlight(clamped);
    if (!webglActive) {
      applyRootSunlightCssVars(clamped);
    }
  };

  useEffect(() => {
    if (!canMount) return;
    const container = canvasMountRef.current;
    const scrollTrack = scrollTrackRef.current;
    if (!container || !scrollTrack) return;

    let stack: ReturnType<typeof createRendererAndPostStack>;
    try {
      stack = createRendererAndPostStack(container);
    } catch (err) {
      console.warn('LOAM: WebGL initialization failed; staying on static specimen sheet', err);
      return;
    }

    // Switch page mode to experience: hides the static specimen sheet
    document.documentElement.dataset.loamMode = 'experience';
    document.getElementById('loam-specimen-root')?.setAttribute('inert', '');
    setWebglActive(true);

    const { renderer, scene, camera, isSoftwareGl } = stack;

    // Handle context loss
    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      document.documentElement.dataset.loamMode = 'specimen';
      document.getElementById('loam-specimen-root')?.removeAttribute('inert');
      setWebglActive(false);
    });

    const textures = createProceduralTextures(renderer);

    // 1. Hero Mushroom (Chapter 1 & 2 & 6) mounted inside a center-pivoted inspect group at y = 1.9
    const mushroomPivot = new THREE.Group();
    mushroomPivot.position.set(0, 1.9, 0);
    scene.add(mushroomPivot);

    const heroMushroom = buildParasolMushroom(textures, 101, true, 'open');
    heroMushroom.group.position.set(0, -1.9, 0);
    heroMushroom.setBioluminescence(0);
    mushroomPivot.add(heroMushroom.group);

    // 2. Mycelium Network & Neighboring Mushrooms (Chapter 4)
    const networkData = generateMyceliumNetwork(4208);
    const forestAndSoil = buildForestAndSoil(
      textures,
      networkData.neighborMushrooms,
      2026,
    );
    scene.add(forestAndSoil.rootGroup);

    const myceliumNetwork = buildMyceliumNetworkScene(networkData);
    scene.add(myceliumNetwork.group);

    // 3. Fist-sized Mycelium Clump Specimen (Chapter 4a inspectable object at [0, -2.55, 0])
    const clumpPivot = new THREE.Group();
    clumpPivot.position.set(0, -2.55, 0);
    scene.add(clumpPivot);

    const clumpModel = buildMyceliumClump(textures, 304);
    clumpPivot.add(clumpModel.group);

    // 4. Molded Packaging Tray, Studio Sweep Set & Supporting Product Family (Chapter 5)
    const studioSet = buildStudioSet();
    scene.add(studioSet.group);

    const productFamily = buildProductFamily(textures);
    scene.add(productFamily.group);

    const trayPivot = new THREE.Group();
    trayPivot.position.set(0, -5.45, 0);
    scene.add(trayPivot);

    const trayModel = buildPackagingTray(textures, 505, isSoftwareGl);
    trayPivot.add(trayModel.group);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const soundCtrl = createSoundController();
    soundControllerRef.current = soundCtrl;

    let currentMasterProgress = 0;
    let currentChapterState = getChapterStateAtProgress(0);
    const pointerWorld = new THREE.Vector3(0, -999, 0);
    const timer = new THREE.Timer();

    // Initialize Hold-to-Inspect controller
    const inspectCtrl = createInspectController({
      canvas: renderer.domElement,
      camera,
      pivotGroups: {
        mushroom: mushroomPivot,
        clump: clumpPivot,
        tray: trayPivot,
      },
      hitProxies: {
        mushroom: heroMushroom.hitProxy,
        clump: clumpModel.hitProxy,
        tray: trayModel.hitProxy,
      },
      getActiveChapterInspectable: () =>
        currentChapterState.activeChapter.inspectableObject,
      getActiveChapterIndex: () => currentChapterState.activeChapterIndex,
      onInspectActiveChange: (locked) => {
        scrollControllerRef.current?.setScrollPaused(locked);
      },
      onNetworkClick: (worldPt) => {
        myceliumNetwork.triggerPulseAt(
          worldPt,
          timer.getElapsed(),
          (mushroomIndex) => {
            forestAndSoil.triggerMushroomGlow(mushroomIndex);
          },
        );
        soundCtrl.playPulseChime();
      },
      onNetworkHover: (worldPt) => {
        pointerWorld.copy(worldPt);
      },
      networkHitPlane: myceliumNetwork.hitPlane,
    });
    inspectControllerRef.current = inspectCtrl;

    // Initialize ScrollTimeline controller
    const scrollCtrl = createScrollController({
      scrollTrackElement: scrollTrack,
      onProgressUpdate: (prog) => {
        currentMasterProgress = prog;
      },
      isInspectLocked: () => inspectCtrl.getState().phase === 'inspecting',
    });
    scrollControllerRef.current = scrollCtrl;

    // Smoothed camera & sunlight state for exponential damping in the render loop
    const smoothedCamPos = new THREE.Vector3(0, 2.38, 6.25);
    const smoothedCamTarget = new THREE.Vector3(0, 1.92, 0);
    let smoothedFov = 36;
    let smoothedInspectStrength = 0;
    let smoothedSunlight = targetSunlightRef.current;

    let frameId = 0;
    let lastUiSyncMs = 0;

    const tick = (nowMs: number) => {
      frameId = requestAnimationFrame(tick);
      timer.update(nowMs);
      const dtSec = Math.min(0.1, timer.getDelta());
      const elapsedSec = timer.getElapsed();

      scrollCtrl.tickLenis(nowMs);

      // Exponential damping on camera pose and sunlight time-of-day slider
      const dampFactor = 1 - Math.exp(-11.0 * Math.max(0.008, dtSec));
      const sunDampFactor = 1 - Math.exp(-9.5 * Math.max(0.008, dtSec));

      smoothedSunlight +=
        (targetSunlightRef.current - smoothedSunlight) * sunDampFactor;
      applyRootSunlightCssVars(smoothedSunlight);

      currentChapterState = getChapterStateAtProgress(currentMasterProgress);
      const targetPose = computeCameraPoseAtProgress(currentMasterProgress);

      smoothedCamPos.lerp(
        _tempVecA.set(
          targetPose.position[0],
          targetPose.position[1],
          targetPose.position[2],
        ),
        dampFactor,
      );
      smoothedCamTarget.lerp(
        _tempVecB.set(
          targetPose.target[0],
          targetPose.target[1],
          targetPose.target[2],
        ),
        dampFactor,
      );
      smoothedFov += (targetPose.fov - smoothedFov) * dampFactor;

      camera.position.copy(smoothedCamPos);
      camera.lookAt(smoothedCamTarget);
      if (Math.abs(camera.fov - smoothedFov) > 0.05) {
        camera.fov = smoothedFov;
        camera.updateProjectionMatrix();
      }

      // Update Hold-to-Inspect controller
      inspectCtrl.tick(
        dtSec * 1000,
        currentChapterState.activeChapter.inspectableObject,
      );
      const inspectState = inspectCtrl.getState();
      const targetInspectStrength =
        inspectState.phase === 'inspecting' ? 1 : 0;
      smoothedInspectStrength +=
        (targetInspectStrength - smoothedInspectStrength) * dampFactor;
      stack.setInspectVisualState(smoothedInspectStrength);

      // Update scene atmosphere & models as a pure function of progress and smoothed sunlight
      stack.setAtmosphereAtProgress(
        currentChapterState.undergroundFactor,
        currentChapterState.networkGrowth,
        elapsedSec,
        currentChapterState.traySolidOpacity,
        smoothedSunlight,
        currentChapterState.studioLightness,
      );
      soundCtrl.updateProgress(currentChapterState.undergroundFactor);

      heroMushroom.setBioluminescence(0);

      forestAndSoil.updateAtProgress({
        progress: currentMasterProgress,
        undergroundFactor: currentChapterState.undergroundFactor,
        gillSporeIntensity: currentChapterState.gillSporeIntensity,
        fairyRingGrowth: currentChapterState.fairyRingGrowth,
        elapsedSec,
        sunlight: smoothedSunlight,
      });

      myceliumNetwork.updateNetwork({
        growth: currentChapterState.networkGrowth,
        convergence: currentChapterState.trayMorphProgress,
        undergroundFactor: currentChapterState.undergroundFactor,
        elapsedSec,
        pointerWorld,
      });

      clumpModel.setRevealAndGlow(
        currentChapterState.clumpReveal,
        currentChapterState.networkGrowth,
      );

      studioSet.updateStudio(
        currentChapterState.studioLightness,
        smoothedInspectStrength,
      );

      productFamily.updateFamily(
        currentChapterState.productFamilySlide,
        currentChapterState.studioLightness,
        smoothedInspectStrength,
      );

      trayModel.updateMorphAndOpacity(
        currentChapterState.trayMorphProgress,
        currentChapterState.traySolidOpacity,
        elapsedSec,
        currentChapterState.fragileObjectSettle,
        currentChapterState.foxfireGlowFade,
      );

      stack.renderFrame();

      // Sync React overlay state
      const isInteractiveOrLeaderLines =
        inspectState.phase !== 'idle' ||
        currentChapterState.chapterOpacities[4] > 0.01;
      if (nowMs - lastUiSyncMs > (isInteractiveOrLeaderLines ? 28 : 60)) {
        lastUiSyncMs = nowMs;
        setChapterState(currentChapterState);
        setInspectUI(inspectCtrl.getUIFrameState());
      }
    };

    const handleResize = () => {
      stack.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.documentElement.dataset.loamMode = 'specimen';
      document.getElementById('loam-specimen-root')?.removeAttribute('inert');
      inspectCtrl.dispose();
      scrollCtrl.dispose();
      soundCtrl.dispose();
      stack.dispose();
      timer.dispose();
    };
  }, [canMount]);

  // If reduced-motion is requested or WebGL is unsupported, the 3D engine never mounts.
  if (!canMount) {
    return null;
  }

  return (
    <div
      id="top"
      className="relative w-full"
      style={{
        backgroundColor: 'var(--page-bg, #080604)',
        color: 'var(--text-contrast, #f0e8d8)',
      }}
    >
      {/* Fixed full-viewport 3D WebGL Canvas behind the thin HTML overlay */}
      <div
        ref={canvasMountRef}
        data-testid="loam-webgl-canvas"
        className="fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      />

      {/* Thin HTML Overlay */}
      {webglActive && (
        <OverlayUI
          chapterState={chapterState}
          inspectUI={inspectUI}
          soundEnabled={soundEnabled}
          sunlight={sunlight}
          onSunlightChange={handleSunlightChange}
          onToggleSound={() => {
            if (soundControllerRef.current) {
              setSoundEnabled(soundControllerRef.current.toggle());
            }
          }}
          onStepChapter={(dir) => {
            scrollControllerRef.current?.stepChapter(dir);
          }}
          onJumpToChapter={(idx) => {
            if (CHAPTERS[idx]) {
              scrollControllerRef.current?.scrollToProgress(
                CHAPTERS[idx].restProgress,
                false,
              );
            }
          }}
          onTriggerKeyboardInspect={(target: InspectableObjectId) => {
            inspectControllerRef.current?.triggerKeyboardInspect(target);
            if (inspectControllerRef.current) {
              setInspectUI(inspectControllerRef.current.getUIFrameState());
            }
          }}
          onExitInspect={() => {
            inspectControllerRef.current?.exitInspect();
            if (inspectControllerRef.current) {
              setInspectUI(inspectControllerRef.current.getUIFrameState());
            }
          }}
        />
      )}

      {/* Invisible tall scroll track driving the master GSAP timeline from progress 0 -> 1 */}
      <div
        ref={scrollTrackRef}
        aria-hidden="true"
        className="pointer-events-none relative z-0 h-[750vh] w-full"
      />
    </div>
  );
}

const _tempVecA = new THREE.Vector3();
const _tempVecB = new THREE.Vector3();
]]>
    </file>
    <file path="src/app/(loam)/loam/logic/chapters.ts">
<![CDATA[/**
 * Pure chapter progress & camera trajectory mathematics for LOAM.
 * Zero Three.js imports so this module can be unit-tested and ported independently.
 */

export type InspectableObjectId = 'mushroom' | 'clump' | 'tray';

export interface ChapterDefinition {
  index: number;
  numberLabel: string;
  title: string;
  markerLabel: string;
  headline?: string;
  subline?: string;
  copy: string;
  specimenNote?: string;
  startProgress: number;
  restProgress: number;
  secondaryRestProgress?: number;
  endProgress: number;
  inspectableObject: InspectableObjectId | null;
  inspectButtonLabel?: string;
}

export const REST_POINT_4A = 0.52;
export const REST_POINT_4B = 0.66;

export const ALL_REST_POINTS: readonly number[] = [
  0.0,
  0.18,
  0.35,
  REST_POINT_4A,
  REST_POINT_4B,
  0.83,
  1.0,
];

export const CHAPTERS: readonly ChapterDefinition[] = [
  {
    index: 0,
    numberLabel: '01',
    title: 'The fruit',
    markerLabel: '01 — The fruit',
    headline: 'LOAM',
    subline: 'Grown, not made.',
    copy: 'What you see is the smallest part.',
    specimenNote: 'Macrolepiota procera — fruiting body above damp forest loam',
    startProgress: 0.0,
    restProgress: 0.0,
    endProgress: 0.13,
    inspectableObject: 'mushroom',
    inspectButtonLabel: 'Inspect mushroom',
  },
  {
    index: 1,
    numberLabel: '02',
    title: 'Under the cap',
    markerLabel: '02 — Under the cap',
    headline: 'A mushroom is only the fruit.',
    copy: 'The organism lives underground.',
    specimenNote: 'Radiating hymenophore lamellae releasing airborne basidiospores',
    startProgress: 0.13,
    restProgress: 0.18,
    endProgress: 0.27,
    inspectableObject: null,
  },
  {
    index: 2,
    numberLabel: '03',
    title: 'Breaking ground',
    markerLabel: '03 — Breaking ground',
    headline: 'Beneath leaf litter and moss.',
    copy: 'Tangled roots give way to dark, living earth.',
    specimenNote: 'Upper forest horizon — O, A, and rhizosphere strata',
    startProgress: 0.27,
    restProgress: 0.35,
    endProgress: 0.45,
    inspectableObject: null,
  },
  {
    index: 3,
    numberLabel: '04',
    title: 'The network',
    markerLabel: '04 — The network',
    headline: 'Miles of living thread under every step.',
    copy: 'A hidden architecture binding root, stone, and soil.',
    specimenNote: 'Bioluminescent rhizomorph cords branching into fine hyphal filaments',
    startProgress: 0.45,
    restProgress: REST_POINT_4A,
    secondaryRestProgress: REST_POINT_4B,
    endProgress: 0.74,
    inspectableObject: 'clump',
    inspectButtonLabel: 'Inspect mycelium clump',
  },
  {
    index: 4,
    numberLabel: '05',
    title: 'The material',
    markerLabel: '05 — The material',
    headline: 'Guided into form.',
    copy: 'Mycelium threads braid around agricultural hemp to grow protective packaging in seven days.',
    specimenNote: 'Unbleached mycelium skin over dense hemp hurd fibre core',
    startProgress: 0.74,
    restProgress: 0.83,
    endProgress: 0.91,
    inspectableObject: 'tray',
    inspectButtonLabel: 'Inspect packaging tray',
  },
  {
    index: 5,
    numberLabel: '06',
    title: 'Return',
    markerLabel: '06 — Return',
    headline: 'Grown, not made.',
    copy: 'When its work is done, it returns cleanly to the soil.',
    specimenNote: 'Home-compostable within 45 days in natural soil',
    startProgress: 0.91,
    restProgress: 1.0,
    endProgress: 1.0,
    inspectableObject: null,
  },
];

export const MATERIAL_CALLOUT_LABELS: readonly string[] = [
  'Grown in 7 days',
  'Home-compostable',
  'Mycelium + hemp',
  'Custom moulds, any shape',
];

export interface TrayCalloutAnchor {
  id: string;
  label: string;
  /** Local 3D coordinates on the tray group */
  localPosition: readonly [number, number, number];
  /** Screen-space leader line offset [dx, dy] in pixels */
  screenOffset: readonly [number, number];
  align: 'left' | 'right';
}

export const TRAY_CALLOUT_ANCHORS: readonly TrayCalloutAnchor[] = [
  {
    id: 'grown-7-days',
    label: 'Grown in 7 days',
    localPosition: [-0.82, 0.18, -0.42],
    screenOffset: [-124, -68],
    align: 'right',
  },
  {
    id: 'home-compostable',
    label: 'Home-compostable',
    localPosition: [0.76, 0.18, -0.44],
    screenOffset: [128, -64],
    align: 'left',
  },
  {
    id: 'mycelium-hemp',
    label: 'Mycelium + hemp',
    localPosition: [0.72, -0.02, 0.48],
    screenOffset: [126, 62],
    align: 'left',
  },
  {
    id: 'custom-moulds',
    label: 'Custom moulds, any shape',
    localPosition: [-0.76, -0.10, 0.44],
    screenOffset: [-128, 64],
    align: 'right',
  },
];

export interface LifecycleStepDefinition {
  id: 'grown' | 'protects' | 'composts';
  label: string;
  detail: string;
}

export const LIFECYCLE_STEPS: readonly LifecycleStepDefinition[] = [
  {
    id: 'grown',
    label: 'Grown in 7 days',
    detail: 'Mycelium + hemp hurd',
  },
  {
    id: 'protects',
    label: 'Protects in transit',
    detail: 'Custom-moulded cushioning',
  },
  {
    id: 'composts',
    label: 'Composts back to soil',
    detail: 'Returns to earth in 45 days',
  },
];

export interface Chapter5SubState {
  /** 0..1 convergence of glowing threads into the tray mould (0.72..0.80) */
  trayMorphProgress: number;
  /** 0..1 solidity/opacity of the resolved cream mycelium tray (0.76..0.815, exits 0.875..0.91) */
  traySolidOpacity: number;
  /** 0..1 studio lighting & seamless paper sweep reveal (lights up as tray forms, dims on exit to Ch 6) */
  studioLightness: number;
  /** 0..1 incoming foxfire thread glow that fades out completely (to 0) once studio is lit */
  foxfireGlowFade: number;
  /** 0..1 gentle settling of the fragile glass perfume bottle into the tray cavity */
  fragileObjectSettle: number;
  /** 0..1 sliding into place of the background family of grown forms (corner protector, bottle shipper, cap) */
  productFamilySlide: number;
  /** 0..1 overall visibility of the bottom Lifecycle Strip */
  lifecycleStripReveal: number;
  /** Individual 0..1 reveals for the 3 lifecycle steps */
  lifecycleStepReveals: [number, number, number];
}

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x >= edge1 ? 1 : 0;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVec3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
  ];
}

/**
 * Pure Chapter 05 ("The material", progress ~0.72 -> 0.91, rest point 0.83) sub-progress choreography:
 * - Fully scrub-able and reversible from scroll progress.
 * - Threads converge in the dark (0.72..0.80), solid tray resolves (0.76..0.815),
 *   studio paper sweep and soft key light come up (0.775..0.822), foxfire glow drops to 0 once lit,
 *   the glass perfume flacon settles into the cavity (0.78..0.825), supporting grown forms slide in
 *   behind on the sweep (0.785..0.83), and the 3-step lifecycle strip reveals near the bottom (0.805..0.832).
 * - On exit toward Chapter 06 (0.87..0.91), the studio dims cleanly as the camera ascends to the forest floor.
 */
export function computeChapter5SubState(rawProgress: number): Chapter5SubState {
  const p = clamp01(rawProgress);

  const trayMorphIn = smoothstep(0.72, 0.80, p);
  const trayExit = 1 - smoothstep(0.875, 0.91, p);
  const trayMorphProgress = clamp01(trayMorphIn);
  const traySolidOpacity = clamp01(smoothstep(0.76, 0.812, p) * trayExit);

  const studioIn = smoothstep(0.77, 0.82, p);
  const studioOut = 1 - smoothstep(0.868, 0.905, p);
  const studioLightness = clamp01(studioIn * studioOut);

  // Incoming threads glow while converging in the dark, then fade out completely (to 0) once studio is lit
  const rawThreadEnv = Math.sin(Math.min(1, trayMorphProgress) * Math.PI);
  const studioCutoff = Math.max(0, 1 - smoothstep(0.785, 0.818, p));
  const foxfireGlowFade = clamp01(rawThreadEnv * studioCutoff * trayExit);

  const fragileObjectSettle = clamp01(smoothstep(0.778, 0.824, p) * studioOut);
  const productFamilySlide = clamp01(smoothstep(0.784, 0.828, p) * studioOut);

  const lifecycleStripReveal = clamp01(smoothstep(0.802, 0.828, p) * studioOut);
  const step1 = clamp01(smoothstep(0.802, 0.818, p) * studioOut);
  const step2 = clamp01(smoothstep(0.810, 0.824, p) * studioOut);
  const step3 = clamp01(smoothstep(0.817, 0.830, p) * studioOut);

  return {
    trayMorphProgress,
    traySolidOpacity,
    studioLightness,
    foxfireGlowFade,
    fragileObjectSettle,
    productFamilySlide,
    lifecycleStripReveal,
    lifecycleStepReveals: [step1, step2, step3],
  };
}

export interface ChapterProgressState {
  progress: number;
  activeChapterIndex: number;
  activeChapter: ChapterDefinition;
  chapterOpacities: number[];
  /** True when in Chapter 4a (close on the clump, where clump is inspectable) */
  isChapter4aClump: boolean;
  /** True when in Chapter 4b (wide network view, where thread pulse-clicking is active) */
  isChapter4bWide: boolean;
  /** 0..1 visibility of underground world (strata & network) */
  undergroundFactor: number;
  /** 0..1 growth of the foxfire mycelium network */
  networkGrowth: number;
  /** 0..1 visibility of the inspectable mycelium clump in Ch 4a */
  clumpReveal: number;
  /** 0..1 convergence of glowing threads into the molded tray in Ch 5 */
  trayMorphProgress: number;
  /** 0..1 opacity/solidity of the resolved molded tray in Ch 5 */
  traySolidOpacity: number;
  /** 0..1 warm product studio illumination & sweep backdrop in Ch 5 (0 in dark soil -> 1 in studio -> 0 on exit) */
  studioLightness: number;
  /** 0..1 incoming thread glow in Ch 5 (0 once studio is lit) */
  foxfireGlowFade: number;
  /** 0..1 settling of the fragile glass perfume bottle into the tray cavity in Ch 5 */
  fragileObjectSettle: number;
  /** 0..1 sliding into place of the background family of grown forms in Ch 5 */
  productFamilySlide: number;
  /** 0..1 visibility of the bottom Lifecycle Strip in Ch 5 */
  lifecycleStripReveal: number;
  /** Individual 0..1 reveals for the 3 lifecycle steps in Ch 5 */
  lifecycleStepReveals: [number, number, number];
  /** 0..1 fruiting progress of the fairy ring of new mushrooms in Ch 6 */
  fairyRingGrowth: number;
  /** 0..1 intensity of falling gill spores in Ch 2 */
  gillSporeIntensity: number;
}

export function getChapterStateAtProgress(rawProgress: number): ChapterProgressState {
  const progress = clamp01(rawProgress);

  let activeChapterIndex = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const ch = CHAPTERS[i];
    if (progress >= ch.startProgress && (progress < ch.endProgress || i === CHAPTERS.length - 1)) {
      activeChapterIndex = i;
      break;
    }
  }

  // Chapter 4 has two rest points:
  // 4a (0.45..0.585): close on the fist-sized mycelium clump (inspectable here and only here)
  // 4b (0.585..0.74): wide subterranean network view (pulse-clicking works here)
  const isChapter4aClump = activeChapterIndex === 3 && progress < 0.585;
  const isChapter4bWide = activeChapterIndex === 3 && progress >= 0.585;

  const baseChapter = CHAPTERS[activeChapterIndex];
  const activeChapter: ChapterDefinition =
    activeChapterIndex === 3
      ? {
          ...baseChapter,
          inspectableObject: isChapter4aClump ? 'clump' : null,
          inspectButtonLabel: isChapter4aClump ? 'Inspect mycelium clump' : undefined,
        }
      : baseChapter;

  const chapterOpacities = CHAPTERS.map((ch, idx) => {
    if (idx === 0) {
      return 1 - smoothstep(0.07, 0.125, progress);
    }
    if (idx === CHAPTERS.length - 1) {
      return smoothstep(0.91, 0.96, progress);
    }
    const fadeIn = smoothstep(ch.startProgress, ch.startProgress + 0.035, progress);
    const fadeOut = 1 - smoothstep(ch.endProgress - 0.035, ch.endProgress, progress);
    return Math.min(fadeIn, fadeOut);
  });

  // Underground factor: sinks below soil in Ch 3 (0.27..0.42), stays underground in Ch 4-5, rises back through soil layers in Ch 6 (0.88..0.95)
  const sinkDown = smoothstep(0.26, 0.36, progress);
  const riseBack = smoothstep(0.88, 0.95, progress);
  const undergroundFactor = clamp01(sinkDown * (1 - riseBack));

  // Network growth: ignites faintly in late Ch 3 subsoil cracks (0.42..0.53 -> 0.14), then spreads out of the clump across 4b (0.54..0.65 -> 1.0)
  const earlyIgnition = smoothstep(0.42, 0.53, progress) * 0.14;
  const mainSpread = smoothstep(0.54, 0.65, progress) * 0.86;
  const networkGrowth = clamp01(earlyIgnition + mainSpread);

  // Clump reveal: prominent in its soil pocket as camera approaches 4a (0.42..0.58), recedes as threads spread in 4b, fades out before Ch 5
  const clumpIn = smoothstep(0.41, 0.48, progress);
  const clumpOut = 1 - smoothstep(0.68, 0.74, progress);
  const clumpReveal = clamp01(clumpIn * clumpOut);

  // Chapter 5 sub-progress choreography (morph, solid tray, studio light reveal, fragile bottle settle, product family, lifecycle strip)
  const ch5Sub = computeChapter5SubState(progress);

  // Fairy ring of new mushrooms in Ch 6: pushes up as camera breaks out onto the forest floor
  const fairyRingGrowth = smoothstep(0.90, 0.985, progress);

  // Falling gill spores peak in Ch 2
  const gillIn = smoothstep(0.12, 0.165, progress);
  const gillOut = 1 - smoothstep(0.22, 0.27, progress);
  const gillSporeIntensity = clamp01(gillIn * gillOut);

  return {
    progress,
    activeChapterIndex,
    activeChapter,
    chapterOpacities,
    isChapter4aClump,
    isChapter4bWide,
    undergroundFactor,
    networkGrowth,
    clumpReveal,
    trayMorphProgress: ch5Sub.trayMorphProgress,
    traySolidOpacity: ch5Sub.traySolidOpacity,
    studioLightness: ch5Sub.studioLightness,
    foxfireGlowFade: ch5Sub.foxfireGlowFade,
    fragileObjectSettle: ch5Sub.fragileObjectSettle,
    productFamilySlide: ch5Sub.productFamilySlide,
    lifecycleStripReveal: ch5Sub.lifecycleStripReveal,
    lifecycleStepReveals: ch5Sub.lifecycleStepReveals,
    fairyRingGrowth,
    gillSporeIntensity,
  };
}

export function getNearestChapterSnapProgress(rawProgress: number): number {
  const progress = clamp01(rawProgress);
  let bestRest = ALL_REST_POINTS[0];
  let bestDist = Math.abs(progress - bestRest);

  for (let i = 1; i < ALL_REST_POINTS.length; i++) {
    const dist = Math.abs(progress - ALL_REST_POINTS[i]);
    if (dist < bestDist) {
      bestDist = dist;
      bestRest = ALL_REST_POINTS[i];
    }
  }
  return bestRest;
}

export function getNextChapterProgress(currentProgress: number, direction: 1 | -1): number {
  const progress = clamp01(currentProgress);
  let closestIdx = 0;
  let minDiff = Infinity;
  for (let i = 0; i < ALL_REST_POINTS.length; i++) {
    const diff = Math.abs(progress - ALL_REST_POINTS[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }

  if (direction === 1 && progress > ALL_REST_POINTS[closestIdx] + 0.025) {
    const nextIdx = Math.min(ALL_REST_POINTS.length - 1, closestIdx + 1);
    return ALL_REST_POINTS[nextIdx];
  }
  if (direction === -1 && progress < ALL_REST_POINTS[closestIdx] - 0.025) {
    return ALL_REST_POINTS[closestIdx];
  }

  const targetIdx = Math.max(0, Math.min(ALL_REST_POINTS.length - 1, closestIdx + direction));
  return ALL_REST_POINTS[targetIdx];
}

export interface CameraKeyframe {
  progress: number;
  position: readonly [number, number, number];
  target: readonly [number, number, number];
  fov: number;
  focusDistance: number;
}

/**
 * Curved Catmull-Rom spline camera waypoints across 0 -> 1:
 * - 0.00 (Ch 1 rest): Macro close-up of the parasol mushroom on the damp mossy floor
 * - 0.18 (Ch 2 rest): Camera drops low and tilts up beneath the cap so radiating gills fill the frame
 * - 0.26 (Pre-descent): Camera pulls just outside the cap rim framing the mushroom bulb, moss tufts, and leaf litter
 * - 0.29 (Breaking ground): Ground surface line passes up through the frame with moss, leaves, and bulb in silhouette
 * - 0.35 (Ch 3 rest): Camera slides down beside the cut earth face through leaf litter, humus, and root hairs
 * - 0.43 (Topsoil & Subsoil): Camera passes the diagonal branching tree root, pebbles, and redder clay with rocks & foxfire cracks
 * - 0.52 (Ch 4a rest): Close on the fist-sized mycelium clump nestled inside its earthen pocket at [0, -2.55, 0]
 * - 0.66 (Ch 4b rest): Camera pulls far back underground to reveal the vast bioluminescent network
 * - 0.83 (Ch 5 rest): Three-quarter overhead product studio framing of the molded packaging tray (~44% viewport width) at [0, -5.45, 0]
 * - 0.91 (Ascent): Camera rises back up through the deep earth, humus, roots, and leaf litter without intersecting models
 * - 1.00 (Ch 6 rest): Above the forest floor framing the hero mushroom and the newly fruited fairy ring
 */
export const CAMERA_KEYFRAMES: readonly CameraKeyframe[] = [
  {
    progress: 0.0,
    position: [0.0, 2.38, 6.25],
    target: [0.0, 1.92, 0.0],
    fov: 36,
    focusDistance: 6.25,
  },
  {
    progress: 0.18,
    position: [0.0, 1.38, 1.38],
    target: [0.0, 3.06, 0.0],
    fov: 44,
    focusDistance: 1.92,
  },
  {
    progress: 0.26,
    position: [0.16, 0.36, 2.46],
    target: [0.0, 0.18, 0.0],
    fov: 39,
    focusDistance: 2.46,
  },
  {
    progress: 0.29,
    position: [0.05, 0.02, 2.32],
    target: [0.0, -0.05, 0.0],
    fov: 38,
    focusDistance: 2.32,
  },
  {
    progress: 0.35,
    position: [0.0, -0.88, 2.26],
    target: [0.0, -0.96, 0.0],
    fov: 38,
    focusDistance: 2.26,
  },
  {
    progress: 0.43,
    position: [0.0, -1.74, 2.28],
    target: [0.0, -1.82, 0.0],
    fov: 37,
    focusDistance: 2.28,
  },
  {
    progress: REST_POINT_4A,
    position: [0.0, -2.42, 2.35],
    target: [0.0, -2.55, 0.0],
    fov: 36,
    focusDistance: 2.35,
  },
  {
    progress: REST_POINT_4B,
    position: [0.0, -1.75, 12.6],
    target: [0.0, -1.35, 0.0],
    fov: 45,
    focusDistance: 11.5,
  },
  {
    progress: 0.83,
    position: [0.0, -3.72, 4.92],
    target: [-0.06, -5.42, -0.16],
    fov: 35,
    focusDistance: 5.18,
  },
  {
    progress: 0.91,
    position: [-0.45, -1.15, 4.85],
    target: [0.0, -0.65, 0.0],
    fov: 40,
    focusDistance: 4.85,
  },
  {
    progress: 1.0,
    position: [0.0, 2.85, 7.35],
    target: [0.0, 1.55, 0.0],
    fov: 38,
    focusDistance: 7.35,
  },
];

function catmullRomScalar(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function catmullRomVec3(
  p0: readonly [number, number, number],
  p1: readonly [number, number, number],
  p2: readonly [number, number, number],
  p3: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [
    catmullRomScalar(p0[0], p1[0], p2[0], p3[0], t),
    catmullRomScalar(p0[1], p1[1], p2[1], p3[1], t),
    catmullRomScalar(p0[2], p1[2], p2[2], p3[2], t),
  ];
}

export interface ComputedCameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  focusDistance: number;
}

export function computeCameraPoseAtProgress(rawProgress: number): ComputedCameraPose {
  const p = clamp01(rawProgress);
  const n = CAMERA_KEYFRAMES.length;

  for (let i = 0; i < n - 1; i++) {
    const k1 = CAMERA_KEYFRAMES[i];
    const k2 = CAMERA_KEYFRAMES[i + 1];
    if (p >= k1.progress && p <= k2.progress) {
      const k0 = CAMERA_KEYFRAMES[Math.max(0, i - 1)];
      const k3 = CAMERA_KEYFRAMES[Math.min(n - 1, i + 2)];
      // Smooth easing at rest points
      const linearT = clamp01((p - k1.progress) / Math.max(1e-6, k2.progress - k1.progress));
      const easedT = smoothstep(0, 1, linearT);

      const pos = catmullRomVec3(k0.position, k1.position, k2.position, k3.position, easedT);
      const target = catmullRomVec3(k0.target, k1.target, k2.target, k3.target, easedT);

      // Guard so above-ground segments (Ch 1 -> Ch 2) never dip below forest floor y = 0.25
      if (p < 0.25 && pos[1] < 0.25) {
        pos[1] = 0.25;
      }

      // Guard so the large pull-back at 4b (z = 12.6) never causes Catmull-Rom z-undershoot during the 0.26..0.52 soil descent
      if (p >= 0.26 && p <= REST_POINT_4A) {
        const minSegmentZ = Math.min(k1.position[2], k2.position[2]);
        const maxSegmentZ = Math.max(k1.position[2], k2.position[2]);
        pos[2] = Math.max(minSegmentZ, Math.min(maxSegmentZ, pos[2]));
      }

      return {
        position: pos,
        target,
        fov: lerp(k1.fov, k2.fov, easedT),
        focusDistance: lerp(k1.focusDistance, k2.focusDistance, easedT),
      };
    }
  }

  const last = CAMERA_KEYFRAMES[n - 1];
  return {
    position: [...last.position],
    target: [...last.target],
    fov: last.fov,
    focusDistance: last.focusDistance,
  };
}

export const DEFAULT_SUNLIGHT = 0.75;

export interface SunlightAtmosphereState {
  sunlight: number;
  timeLabel: string;
  /** Directional sun offset [dx, dy, dz] relative to the current scene target */
  sunOffset: [number, number, number];
  /** Normalized RGB [0..1, 0..1, 0..1] of the directional sun light */
  sunColorRgb: [number, number, number];
  /** Hex string of the directional sun light */
  sunColorHex: string;
  /** Multiplier on directional sun intensity (low at dusk -> full overhead at midday) */
  sunIntensityMultiplier: number;
  /** Multiplier on hemisphere/ambient fill light */
  ambientIntensityMultiplier: number;
  /** Multiplier on specimen rim light (stronger rim at dusk) */
  rimIntensityMultiplier: number;
  /** Balanced renderer toneMappingExposure across 0..1 */
  toneMappingExposure: number;
  /** Multiplier on shaft-of-light / spore mote brightness above ground */
  godRayOpacityMultiplier: number;
  /** Normalized RGB [0..1] for above-ground 3D background and fog */
  surfaceBgRgb: [number, number, number];
  /** Synchronized 2D CSS custom properties for page atmosphere harmonization */
  cssVars: {
    '--page-bg': string;
    '--sky-ambient': string;
    '--text-contrast': string;
    '--sun-accent': string;
  };
}

function rgbToHex(rgb: readonly [number, number, number]): string {
  const toByte = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v * 255)))
      .toString(16)
      .padStart(2, '0');
  return `#${toByte(rgb[0])}${toByte(rgb[1])}${toByte(rgb[2])}`;
}

/**
 * Pure calculation mapping the normalized Sunlight / Time-of-Day slider value
 * (0.0 = Dusk/Night -> 0.75 = Default Morning -> 1.0 = Bright Midday Sun)
 * to 3D directional sun arc, color temperature, exposure, and 2D CSS atmosphere variables.
 */
export function computeSunlightState(rawSunlight: number): SunlightAtmosphereState {
  const s = clamp01(rawSunlight);

  // 1. Sun arc across the sky: low grazing horizon angle at 0.0 -> overhead at 1.0
  const azimuth = lerp(-1.22, -0.28, s);
  const elevation = lerp(0.18, 1.30, s);
  const radius = 7.2;
  const sunOffset: [number, number, number] = [
    Math.sin(azimuth) * Math.cos(elevation) * radius,
    Math.sin(elevation) * radius,
    Math.cos(azimuth) * Math.cos(elevation) * radius,
  ];

  // 2. Color temperature stops:
  //    0.00: Dusk ember (#ff8a3d) -> 0.35: Golden hour (#ffa751) -> 0.75: Warm morning (#f7e7ce) -> 1.00: Crisp midday (#f4f8fb)
  const stop0: [number, number, number] = [1.0, 0.541, 0.239]; // #ff8a3d
  const stop1: [number, number, number] = [1.0, 0.655, 0.318]; // #ffa751
  const stop2: [number, number, number] = [0.969, 0.906, 0.808]; // #f7e7ce
  const stop3: [number, number, number] = [0.957, 0.973, 0.984]; // #f4f8fb

  let sunColorRgb: [number, number, number];
  if (s < 0.35) {
    sunColorRgb = lerpVec3(stop0, stop1, s / 0.35);
  } else if (s < 0.75) {
    sunColorRgb = lerpVec3(stop1, stop2, (s - 0.35) / 0.4);
  } else {
    sunColorRgb = lerpVec3(stop2, stop3, (s - 0.75) / 0.25);
  }
  const sunColorHex = rgbToHex(sunColorRgb);

  // 3. Light intensity & tone mapping exposure curves (calibrated to prevent white clipping)
  const sunIntensityMultiplier = lerp(0.36, 1.35, Math.pow(s, 0.85));
  const ambientIntensityMultiplier = lerp(0.55, 1.45, s);
  const rimIntensityMultiplier = lerp(1.38, 0.88, s);
  const toneMappingExposure = lerp(0.66, 0.83, s);
  const godRayOpacityMultiplier = lerp(0.28, 1.48, s);

  // 4. Above-ground forest canopy background & 2D CSS variables
  const bgDusk: [number, number, number] = [0.024, 0.020, 0.029]; // #060507
  const bgGolden: [number, number, number] = [0.047, 0.031, 0.020]; // #0c0805
  const bgMorning: [number, number, number] = [0.031, 0.024, 0.016]; // #080604
  const bgMidday: [number, number, number] = [0.086, 0.106, 0.078]; // #161b14

  let surfaceBgRgb: [number, number, number];
  if (s < 0.35) {
    surfaceBgRgb = lerpVec3(bgDusk, bgGolden, s / 0.35);
  } else if (s < 0.75) {
    surfaceBgRgb = lerpVec3(bgGolden, bgMorning, (s - 0.35) / 0.4);
  } else {
    surfaceBgRgb = lerpVec3(bgMorning, bgMidday, (s - 0.75) / 0.25);
  }

  const pageBgHex = rgbToHex(surfaceBgRgb);
  const textRgb = lerpVec3([0.91, 0.875, 0.816], [0.98, 0.965, 0.933], s);
  const textHex = rgbToHex(textRgb);

  const skyR = Math.round(sunColorRgb[0] * 255);
  const skyG = Math.round(sunColorRgb[1] * 255);
  const skyB = Math.round(sunColorRgb[2] * 255);
  const skyAlpha = (0.07 + s * 0.11).toFixed(3);

  const timeLabel =
    s < 0.22
      ? 'Dusk'
      : s < 0.55
        ? 'Golden hour'
        : s < 0.85
          ? 'Morning'
          : 'Midday';

  return {
    sunlight: s,
    timeLabel,
    sunOffset,
    sunColorRgb,
    sunColorHex,
    sunIntensityMultiplier,
    ambientIntensityMultiplier,
    rimIntensityMultiplier,
    toneMappingExposure,
    godRayOpacityMultiplier,
    surfaceBgRgb,
    cssVars: {
      '--page-bg': pageBgHex,
      '--sky-ambient': `rgba(${skyR}, ${skyG}, ${skyB}, ${skyAlpha})`,
      '--text-contrast': textHex,
      '--sun-accent': sunColorHex,
    },
  };
}

]]>
    </file>
    <file path="src/app/(loam)/loam/logic/formValidation.ts">
<![CDATA[/**
 * Pure client-side validation logic for the Chapter 6 "Request a sample kit" form.
 * Zero UI/DOM dependencies so validation rules can be unit-tested.
 */

export type SampleKitUseCase = 'packaging' | 'panels' | 'other';

export interface SampleKitFormValues {
  name: string;
  workEmail: string;
  company: string;
  useCase: SampleKitUseCase;
  note: string;
}

export interface SampleKitFormErrors {
  name?: string;
  workEmail?: string;
  company?: string;
  useCase?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateSampleKitForm(values: SampleKitFormValues): {
  isValid: boolean;
  errors: SampleKitFormErrors;
} {
  const errors: SampleKitFormErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  const trimmedEmail = values.workEmail ? values.workEmail.trim() : '';
  if (!trimmedEmail) {
    errors.workEmail = 'Please enter your work email.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.workEmail = 'Please enter a valid work email address.';
  }

  if (!values.company || values.company.trim().length < 2) {
    errors.company = 'Please enter your company or studio name.';
  }

  if (!['packaging', 'panels', 'other'].includes(values.useCase)) {
    errors.useCase = 'Please select an intended application.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/logic/holdInspectLogic.ts">
<![CDATA[/**
 * Pure Hold-to-Inspect state machine & quaternion trackball rotation logic.
 * Zero Three.js imports so all state transitions, long-press detection,
 * gimbal-lock-free quaternion math, and backface pin culling are unit-testable.
 */

import type { InspectableObjectId } from './chapters';

export type Quat = [number, number, number, number]; // [x, y, z, w]
export type Vec3 = [number, number, number];

export const HOLD_DURATION_MS = 350;
export const MOVE_CANCEL_THRESHOLD_PX = 10;

export type InspectPhase = 'idle' | 'holding' | 'inspecting' | 'returning';

export interface HoldInspectState {
  phase: InspectPhase;
  targetObject: InspectableObjectId | null;
  holdElapsedMs: number;
  /** 0..1 progress of the ~350ms hold ring */
  holdProgress: number;
  pointerStart: { x: number; y: number };
  pointerCurrent: { x: number; y: number };
  /** Quaternion [x, y, z, w] representing the object's inspection rotation */
  quaternion: Quat;
  /** Angular velocity (rad/sec) around screen X and Y axes for weighted inertia */
  angularVelocity: { vx: number; vy: number };
  /** True once the user has successfully entered inspect mode at least once */
  hasUsedInspect: boolean;
  /** True if inspect mode was opened via the keyboard Inspect button */
  keyboardMode: boolean;
}

export interface PartPinDefinition {
  id: string;
  label: string;
  /** Local 3D position on the inspectable object group */
  localPosition: Vec3;
  /** Local outward surface normal for backface hiding when rotated away */
  localNormal: Vec3;
}

export const OBJECT_PART_PINS: Record<InspectableObjectId, readonly PartPinDefinition[]> = {
  mushroom: [
    { id: 'umbo', label: 'Umbo', localPosition: [0.0, 1.78, 0.05], localNormal: [0.0, 0.96, 0.28] },
    { id: 'cap-scales', label: 'Cap scales', localPosition: [0.85, 1.48, 0.55], localNormal: [0.52, 0.72, 0.45] },
    { id: 'gills', label: 'Gills', localPosition: [-0.72, 1.05, 0.45], localNormal: [-0.35, -0.82, 0.45] },
    { id: 'ring', label: 'Ring', localPosition: [0.28, 0.42, 0.22], localNormal: [0.75, 0.15, 0.64] },
    { id: 'stem', label: 'Stem', localPosition: [-0.18, -0.45, 0.18], localNormal: [-0.71, 0.0, 0.71] },
    { id: 'bulb', label: 'Bulb', localPosition: [0.36, -1.52, 0.32], localNormal: [0.72, 0.15, 0.68] },
  ],
  clump: [
    { id: 'rhizomorphs', label: 'Rhizomorphs', localPosition: [0.58, 0.25, 0.62], localNormal: [0.62, 0.28, 0.73] },
    { id: 'hyphae', label: 'Hyphae', localPosition: [-0.62, 0.35, 0.48], localNormal: [-0.68, 0.38, 0.62] },
    { id: 'substrate', label: 'Substrate', localPosition: [0.42, -0.32, -0.55], localNormal: [0.52, -0.38, -0.76] },
  ],
  tray: [
    { id: 'grown-surface', label: 'Grown surface', localPosition: [-0.54, 0.15, -0.29], localNormal: [-0.25, 0.92, -0.3] },
    { id: 'fibre-core', label: 'Fibre core', localPosition: [0.88, 0.06, 0.56], localNormal: [0.68, 0.22, 0.7] },
    { id: 'lip', label: 'Lip', localPosition: [-1.04, 0.26, 0.38], localNormal: [-0.75, 0.52, 0.4] },
  ],
};

export function createInitialInspectState(): HoldInspectState {
  return {
    phase: 'idle',
    targetObject: null,
    holdElapsedMs: 0,
    holdProgress: 0,
    pointerStart: { x: 0, y: 0 },
    pointerCurrent: { x: 0, y: 0 },
    quaternion: [0, 0, 0, 1],
    angularVelocity: { vx: 0, vy: 0 },
    hasUsedInspect: false,
    keyboardMode: false,
  };
}

export function quatNormalize(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (len < 1e-8) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

export function quatFromAxisAngle(axis: Vec3, angleRad: number): Quat {
  const len = Math.hypot(axis[0], axis[1], axis[2]);
  if (len < 1e-8 || Math.abs(angleRad) < 1e-8) return [0, 0, 0, 1];
  const half = angleRad * 0.5;
  const s = Math.sin(half) / len;
  return quatNormalize([axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(half)]);
}

export function quatMultiply(a: Quat, b: Quat): Quat {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return quatNormalize([
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ]);
}

export function quatSlerp(a: Quat, b: Quat, t: number): Quat {
  const clampedT = Math.max(0, Math.min(1, t));
  let [bx, by, bz, bw] = b;
  let cosHalfTheta = a[0] * bx + a[1] * by + a[2] * bz + a[3] * bw;

  if (cosHalfTheta < 0) {
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
    cosHalfTheta = -cosHalfTheta;
  }

  if (cosHalfTheta >= 0.9995) {
    return quatNormalize([
      a[0] + (bx - a[0]) * clampedT,
      a[1] + (by - a[1]) * clampedT,
      a[2] + (bz - a[2]) * clampedT,
      a[3] + (bw - a[3]) * clampedT,
    ]);
  }

  const halfTheta = Math.acos(cosHalfTheta);
  const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
  const ratioA = Math.sin((1 - clampedT) * halfTheta) / sinHalfTheta;
  const ratioB = Math.sin(clampedT * halfTheta) / sinHalfTheta;

  return quatNormalize([
    a[0] * ratioA + bx * ratioB,
    a[1] * ratioA + by * ratioB,
    a[2] * ratioA + bz * ratioB,
    a[3] * ratioA + bw * ratioB,
  ]);
}

export function rotateVec3ByQuat(v: Vec3, q: Quat): Vec3 {
  const [qx, qy, qz, qw] = q;
  const [vx, vy, vz] = v;
  // t = 2 * cross(q.xyz, v)
  const tx = 2 * (qy * vz - qz * vy);
  const ty = 2 * (qz * vx - qx * vz);
  const tz = 2 * (qx * vy - qy * vx);
  // v' = v + qw * t + cross(q.xyz, t)
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ];
}

/**
 * Applies screen-space drag deltas (dx, dy) to a quaternion using camera-relative
 * right [1,0,0] and up [0,1,0] axes so the user can freely rotate the object
 * 360 degrees in any direction (straight down at top, straight up at underside)
 * with zero gimbal lock.
 */
export function applyDragDeltaToQuaternion(
  currentQuat: Quat,
  dxPx: number,
  dyPx: number,
  sensitivity = 0.0075,
): Quat {
  const qYaw = quatFromAxisAngle([0, 1, 0], dxPx * sensitivity);
  const qPitch = quatFromAxisAngle([1, 0, 0], dyPx * sensitivity);
  const deltaQuat = quatMultiply(qPitch, qYaw);
  return quatMultiply(deltaQuat, currentQuat);
}

/**
 * Determines whether a part pin is facing toward the camera.
 * Hides the label when the surface normal points away from the viewer.
 */
export function isPinFacingCamera(
  localNormal: Vec3,
  objectQuat: Quat,
  cameraViewDir: Vec3 = [0, 0, 1],
): boolean {
  const worldNormal = rotateVec3ByQuat(localNormal, objectQuat);
  const dot =
    worldNormal[0] * cameraViewDir[0] +
    worldNormal[1] * cameraViewDir[1] +
    worldNormal[2] * cameraViewDir[2];
  return dot > -0.05;
}

export function onInspectPointerDown(
  state: HoldInspectState,
  targetObject: InspectableObjectId,
  x: number,
  y: number,
): HoldInspectState {
  if (state.phase === 'inspecting' && state.keyboardMode) {
    // Allow pointer drag when already inspecting via keyboard
    return {
      ...state,
      pointerStart: { x, y },
      pointerCurrent: { x, y },
    };
  }
  return {
    ...state,
    phase: 'holding',
    targetObject,
    holdElapsedMs: 0,
    holdProgress: 0,
    pointerStart: { x, y },
    pointerCurrent: { x, y },
    angularVelocity: { vx: 0, vy: 0 },
    keyboardMode: false,
  };
}

export function onInspectPointerMove(
  state: HoldInspectState,
  x: number,
  y: number,
  dtSec = 1 / 60,
): HoldInspectState {
  if (state.phase === 'holding') {
    const dist = Math.hypot(x - state.pointerStart.x, y - state.pointerStart.y);
    if (dist > MOVE_CANCEL_THRESHOLD_PX) {
      // Ordinary swipe or scroll — cancel hold immediately
      return {
        ...state,
        phase: 'idle',
        targetObject: null,
        holdElapsedMs: 0,
        holdProgress: 0,
      };
    }
    return {
      ...state,
      pointerCurrent: { x, y },
    };
  }

  if (state.phase === 'inspecting') {
    const dx = x - state.pointerCurrent.x;
    const dy = y - state.pointerCurrent.y;
    const nextQuat = applyDragDeltaToQuaternion(state.quaternion, dx, dy);
    const safeDt = Math.max(0.004, dtSec);
    return {
      ...state,
      pointerCurrent: { x, y },
      quaternion: nextQuat,
      angularVelocity: {
        vx: (dx * 0.0075) / safeDt,
        vy: (dy * 0.0075) / safeDt,
      },
    };
  }

  return state;
}

export function onInspectPointerUp(state: HoldInspectState): HoldInspectState {
  if (state.phase === 'holding') {
    // Quick tap (< 350ms) must NOT trigger inspect
    return {
      ...state,
      phase: 'idle',
      targetObject: null,
      holdElapsedMs: 0,
      holdProgress: 0,
    };
  }

  if (state.phase === 'inspecting' && !state.keyboardMode) {
    return {
      ...state,
      phase: 'returning',
      angularVelocity: { vx: 0, vy: 0 },
    };
  }

  return state;
}

export function toggleKeyboardInspect(
  state: HoldInspectState,
  targetObject: InspectableObjectId,
): HoldInspectState {
  if (state.phase === 'inspecting' && state.targetObject === targetObject) {
    return {
      ...state,
      phase: 'returning',
      keyboardMode: false,
      angularVelocity: { vx: 0, vy: 0 },
    };
  }
  return {
    ...state,
    phase: 'inspecting',
    targetObject,
    holdElapsedMs: HOLD_DURATION_MS,
    holdProgress: 1,
    hasUsedInspect: true,
    keyboardMode: true,
    angularVelocity: { vx: 0, vy: 0 },
  };
}

export function exitInspectMode(state: HoldInspectState): HoldInspectState {
  if (state.phase === 'inspecting' || state.phase === 'holding') {
    return {
      ...state,
      phase: 'returning',
      holdElapsedMs: 0,
      holdProgress: 0,
      keyboardMode: false,
      angularVelocity: { vx: 0, vy: 0 },
    };
  }
  return state;
}

export function applyKeyboardRotationStep(
  state: HoldInspectState,
  key: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown',
): HoldInspectState {
  if (state.phase !== 'inspecting') return state;
  const stepPx = 34;
  const dx = key === 'ArrowRight' ? stepPx : key === 'ArrowLeft' ? -stepPx : 0;
  const dy = key === 'ArrowDown' ? stepPx : key === 'ArrowUp' ? -stepPx : 0;
  return {
    ...state,
    quaternion: applyDragDeltaToQuaternion(state.quaternion, dx, dy),
  };
}

export function tickInspectState(state: HoldInspectState, dtMs: number): HoldInspectState {
  const dtSec = Math.min(0.1, Math.max(0, dtMs / 1000));

  if (state.phase === 'holding') {
    const nextElapsed = state.holdElapsedMs + dtMs;
    const progress = Math.min(1, nextElapsed / HOLD_DURATION_MS);
    if (nextElapsed >= HOLD_DURATION_MS) {
      return {
        ...state,
        phase: 'inspecting',
        holdElapsedMs: HOLD_DURATION_MS,
        holdProgress: 1,
        hasUsedInspect: true,
      };
    }
    return {
      ...state,
      holdElapsedMs: nextElapsed,
      holdProgress: progress,
    };
  }

  if (state.phase === 'inspecting') {
    // Apply slight rotational inertia decay when not actively dragging
    const { vx, vy } = state.angularVelocity;
    if (Math.hypot(vx, vy) > 0.001) {
      const damping = Math.exp(-8.5 * dtSec);
      const qYaw = quatFromAxisAngle([0, 1, 0], vx * dtSec * 0.25);
      const qPitch = quatFromAxisAngle([1, 0, 0], vy * dtSec * 0.25);
      const nextQuat = quatMultiply(quatMultiply(qPitch, qYaw), state.quaternion);
      return {
        ...state,
        quaternion: nextQuat,
        angularVelocity: {
          vx: vx * damping,
          vy: vy * damping,
        },
      };
    }
    return state;
  }

  if (state.phase === 'returning') {
    const alpha = 1 - Math.exp(-9.0 * dtSec);
    const nextQuat = quatSlerp(state.quaternion, [0, 0, 0, 1], alpha);
    const angleRemaining = 2 * Math.acos(Math.min(1, Math.abs(nextQuat[3])));
    if (angleRemaining < 0.01) {
      return {
        ...state,
        phase: 'idle',
        targetObject: null,
        holdElapsedMs: 0,
        holdProgress: 0,
        quaternion: [0, 0, 0, 1],
        angularVelocity: { vx: 0, vy: 0 },
        keyboardMode: false,
      };
    }
    return {
      ...state,
      quaternion: nextQuat,
    };
  }

  return state;
}
]]>
    </file>
    <file path="src/app/(loam)/loam/logic/networkGenerator.ts">
<![CDATA[/**
 * Pure seeded procedural mycelium network generator & pulse propagation math.
 * Zero Three.js imports so network topology and pulse physics are unit-testable.
 */

export type Point3D = [number, number, number];

export interface NetworkBranch {
  id: number;
  parentId: number | null;
  points: Point3D[];
  /** Normalized radial distance 0..1 where this branch starts growing */
  startGrowth: number;
  /** Normalized radial distance 0..1 where this branch finishes growing */
  endGrowth: number;
  /** Tube/filament thickness radius */
  radius: number;
  /** Hierarchy tier: 0 = thicker rhizomorph cord, 1 = thin secondary thread, 2 = hair-fine hypha */
  tier: 0 | 1 | 2;
  /** Index into neighborMushrooms if this branch links to another mushroom, else -1 */
  targetMushroomIndex: number;
}

export interface NeighborMushroomTarget {
  index: number;
  position: Point3D;
  scale: number;
  /** Normalized growth distance 0..1 from origin mushroom base */
  normalizedDistance: number;
}

export interface GeneratedMyceliumNetwork {
  branches: NetworkBranch[];
  neighborMushrooms: NeighborMushroomTarget[];
  maxRadius: number;
}

/** Deterministic Mulberry32 PRNG */
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function nextRandom(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a hierarchical 3D underground mycelium network of ~1,200 organic, wavy
 * filaments radiating from the clump ([0, -2.55, 0]) and primary mushroom base ([0, -0.35, 0]),
 * branching outward through the soil in three biological tiers:
 * - Tier 0: Thicker arterial rhizomorph cords linking the clump, origin mushroom, and 5 neighboring mushrooms
 * - Tier 1: Hundreds of thin secondary threads branching outward with organic waviness
 * - Tier 2: Over a thousand hair-fine hyphae forming a delicate, feathery subterranean web
 */
export function generateMyceliumNetwork(seed = 4208): GeneratedMyceliumNetwork {
  const rand = createSeededRandom(seed);
  const maxRadius = 11.8;

  // 5 neighboring mushrooms arranged in a wide natural forest arc around the origin
  const rawMushroomCoords: Array<{ pos: Point3D; scale: number }> = [
    { pos: [-5.8, 0.0, -3.2], scale: 0.72 },
    { pos: [6.2, 0.0, -2.8], scale: 0.82 },
    { pos: [-7.4, 0.0, 2.5], scale: 0.65 },
    { pos: [7.1, 0.0, 3.1], scale: 0.76 },
    { pos: [1.4, 0.0, -7.8], scale: 0.68 },
  ];

  const neighborMushrooms: NeighborMushroomTarget[] = rawMushroomCoords.map((item, index) => {
    const dist = Math.hypot(item.pos[0], item.pos[2]);
    return {
      index,
      position: item.pos,
      scale: item.scale,
      normalizedDistance: Math.min(1, dist / maxRadius),
    };
  });

  const branches: NetworkBranch[] = [];
  let branchIdCounter = 0;

  // Helper to spawn a secondary thread and a fan of hair-fine tertiary hyphae
  const spawnSecondaryAndHyphae = (
    parentId: number,
    rootPt: Point3D,
    baseAngle: number,
    parentGrowth: number,
    hyphaePerThread: number,
  ) => {
    const subSegments = 7;
    const subPts: Point3D[] = [[...rootPt]];
    const subLen = 1.6 + rand() * 2.6;
    const verticalSlope = (rand() - 0.52) * 1.3;
    const waveFreq = 2.2 + rand() * 2.5;
    const wavePhase = rand() * Math.PI * 2;
    let curAng = baseAngle;

    for (let k = 1; k <= subSegments; k++) {
      const kt = k / subSegments;
      const prev = subPts[k - 1];
      const step = subLen / subSegments;
      curAng += Math.sin(kt * waveFreq * Math.PI + wavePhase) * 0.22 + (rand() - 0.5) * 0.28;
      subPts.push([
        prev[0] + Math.cos(curAng) * step,
        Math.min(-0.18, prev[1] + verticalSlope / subSegments + (rand() - 0.5) * 0.12),
        prev[2] + Math.sin(curAng) * step,
      ]);
    }

    const subEndGrowth = Math.min(1, parentGrowth + (subLen / maxRadius) * 0.75);
    const subId = branchIdCounter++;
    branches.push({
      id: subId,
      parentId,
      points: subPts,
      startGrowth: parentGrowth,
      endGrowth: Math.max(parentGrowth + 0.04, subEndGrowth),
      radius: 0.0085,
      tier: 1,
      targetMushroomIndex: -1,
    });

    // Spawn hair-fine hyphae along this secondary thread
    for (let f = 0; f < hyphaePerThread; f++) {
      const fSplitIdx = 1 + Math.floor(rand() * (subSegments - 1));
      const fRoot = subPts[fSplitIdx];
      const fStartGrowth =
        parentGrowth + (subEndGrowth - parentGrowth) * (fSplitIdx / subSegments);
      const fPts: Point3D[] = [[...fRoot]];
      let fAngle = curAng + (f % 2 === 0 ? 1 : -1) * (0.35 + rand() * 0.85);
      const fLen = 0.55 + rand() * 1.35;
      const fSegs = 4;

      for (let m = 1; m <= fSegs; m++) {
        const prev = fPts[m - 1];
        const step = fLen / fSegs;
        fAngle += (rand() - 0.5) * 0.48;
        fPts.push([
          prev[0] + Math.cos(fAngle) * step,
          Math.min(-0.15, prev[1] + (rand() - 0.52) * 0.18),
          prev[2] + Math.sin(fAngle) * step,
        ]);
      }

      const hyphaId = branchIdCounter++;
      const hyphaEndGrowth = Math.min(1, fStartGrowth + 0.08 + rand() * 0.09);
      branches.push({
        id: hyphaId,
        parentId: subId,
        points: fPts,
        startGrowth: fStartGrowth,
        endGrowth: hyphaEndGrowth,
        radius: 0.0032,
        tier: 2,
        targetMushroomIndex: -1,
      });

      // Forking terminal micro-hypha tip
      if (rand() > 0.35) {
        const tipRoot = fPts[fPts.length - 2];
        const tipAng = fAngle + (rand() > 0.5 ? 0.55 : -0.55);
        const tipLen = 0.32 + rand() * 0.55;
        branches.push({
          id: branchIdCounter++,
          parentId: hyphaId,
          points: [
            [...tipRoot],
            [
              tipRoot[0] + Math.cos(tipAng) * tipLen * 0.5,
              Math.min(-0.15, tipRoot[1] + (rand() - 0.5) * 0.12),
              tipRoot[2] + Math.sin(tipAng) * tipLen * 0.5,
            ],
            [
              tipRoot[0] + Math.cos(tipAng + (rand() - 0.5) * 0.35) * tipLen,
              Math.min(-0.15, tipRoot[1] + (rand() - 0.5) * 0.18),
              tipRoot[2] + Math.sin(tipAng + (rand() - 0.5) * 0.35) * tipLen,
            ],
          ],
          startGrowth: fStartGrowth + 0.03,
          endGrowth: Math.min(1, hyphaEndGrowth + 0.05),
          radius: 0.0022,
          tier: 2,
          targetMushroomIndex: -1,
        });
      }
    }
  };

  // 1. Primary arterial rhizomorph cords emerging from the clump [0, -2.55, 0] and mushroom base [0, -0.35, 0]
  // to each of the 5 neighboring mushrooms
  for (let mIdx = 0; mIdx < neighborMushrooms.length; mIdx++) {
    const target = neighborMushrooms[mIdx];
    const segments = 16;
    const pts: Point3D[] = [];
    const startPt: Point3D = [0, -2.45 + (mIdx % 2) * 0.35, 0];
    const endPt: Point3D = [target.position[0], -0.25, target.position[2]];

    const lateralAngle = Math.atan2(endPt[2], endPt[0]) + Math.PI * 0.5;
    const lateralSway = (rand() - 0.5) * 1.65;
    const waveFreq = 2.0 + rand() * 1.5;

    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const arc = Math.sin(t * Math.PI);
      const wave = Math.sin(t * Math.PI * waveFreq) * 0.35 * arc;
      const x =
        startPt[0] +
        (endPt[0] - startPt[0]) * t +
        Math.cos(lateralAngle) * (lateralSway * arc + wave);
      const y =
        startPt[1] * Math.pow(1 - t, 0.72) +
        endPt[1] * (1 - Math.pow(1 - t, 0.72)) -
        Math.sin(t * Math.PI) * (0.65 + rand() * 0.35);
      const z =
        startPt[2] +
        (endPt[2] - startPt[2]) * t +
        Math.sin(lateralAngle) * (lateralSway * arc + wave);
      pts.push([x, y, z]);
    }

    const trunkId = branchIdCounter++;
    branches.push({
      id: trunkId,
      parentId: null,
      points: pts,
      startGrowth: 0.0,
      endGrowth: target.normalizedDistance,
      radius: 0.022,
      tier: 0,
      targetMushroomIndex: mIdx,
    });

    // Vertical feeder cord connecting hero mushroom base [0, -0.35, 0] down into the clump at [0, -2.55, 0]
    if (mIdx < 3) {
      const vPts: Point3D[] = [];
      const vSegs = 8;
      const vAng = (mIdx / 3) * Math.PI * 2;
      for (let s = 0; s <= vSegs; s++) {
        const vt = s / vSegs;
        const rad = Math.sin(vt * Math.PI) * 0.32;
        vPts.push([
          Math.cos(vAng + vt * 2.2) * rad,
          -2.55 + vt * 2.2,
          Math.sin(vAng + vt * 2.2) * rad,
        ]);
      }
      branches.push({
        id: branchIdCounter++,
        parentId: trunkId,
        points: vPts,
        startGrowth: 0.0,
        endGrowth: 0.25,
        radius: 0.018,
        tier: 0,
        targetMushroomIndex: -1,
      });
    }

    // Spawn 14 secondary threads along each primary trunk, each with 5 fine hyphae
    for (let b = 0; b < 14; b++) {
      const splitIdx = 1 + Math.floor((b / 14) * (segments - 2));
      const rootPt = pts[splitIdx];
      const splitRatio = splitIdx / segments;
      const parentGrowthAtSplit = splitRatio * target.normalizedDistance;
      const trunkDir = Math.atan2(endPt[2] - startPt[2], endPt[0] - startPt[0]);
      const branchSign = b % 2 === 0 ? 1 : -1;
      const baseAngle = trunkDir + branchSign * (0.35 + rand() * 0.75);

      spawnSecondaryAndHyphae(trunkId, rootPt, baseAngle, parentGrowthAtSplit, 5);
    }
  }

  // 2. Radial exploratory cords & fine hyphal fans filling the 360-degree subterranean field
  const exploratoryCount = 34;
  for (let i = 0; i < exploratoryCount; i++) {
    const angle = (i / exploratoryCount) * Math.PI * 2 + (rand() - 0.5) * 0.18;
    const length = 3.2 + rand() * 7.8;
    const segs = 10;
    const startY = -2.55 + (rand() - 0.5) * 0.8;
    const pts: Point3D[] = [[0, startY, 0]];
    let curAngle = angle;
    const targetDepth = -0.8 - rand() * 3.1;

    for (let s = 1; s <= segs; s++) {
      const st = s / segs;
      const prev = pts[s - 1];
      curAngle += Math.sin(st * Math.PI * 2.5 + i) * 0.18 + (rand() - 0.5) * 0.25;
      const step = length / segs;
      pts.push([
        prev[0] + Math.cos(curAngle) * step,
        startY * (1 - st) + targetDepth * st + Math.sin(st * Math.PI) * 0.22,
        prev[2] + Math.sin(curAngle) * step,
      ]);
    }

    const endGrowth = Math.min(1, length / maxRadius);
    const expId = branchIdCounter++;
    branches.push({
      id: expId,
      parentId: null,
      points: pts,
      startGrowth: 0.02 + rand() * 0.08,
      endGrowth,
      radius: i % 4 === 0 ? 0.016 : 0.009,
      tier: i % 4 === 0 ? 0 : 1,
      targetMushroomIndex: -1,
    });

    // Spawn 4 secondary offshoots & hyphae fans per exploratory cord
    for (let sub = 0; sub < 4; sub++) {
      const idx = 2 + Math.floor(rand() * (segs - 3));
      const rootPt = pts[idx];
      const gAtSplit = (idx / segs) * endGrowth;
      const subAng = curAngle + (sub % 2 === 0 ? 1 : -1) * (0.4 + rand() * 0.65);
      spawnSecondaryAndHyphae(expId, rootPt, subAng, gAtSplit, 4);
    }
  }

  return {
    branches,
    neighborMushrooms,
    maxRadius,
  };
}

/**
 * Computes the travelling wave intensity (0..1) of an interactive light pulse
 * at a given 3D point relative to the pulse origin.
 */
export function computePulseWaveIntensity(
  point: Point3D,
  pulseOrigin: Point3D,
  pulseElapsedSec: number,
  pulseSpeed = 6.5,
  ringWidth = 1.6,
): number {
  if (pulseElapsedSec < 0 || pulseElapsedSec > 3.5) return 0;
  const dist = Math.hypot(
    point[0] - pulseOrigin[0],
    point[1] - pulseOrigin[1],
    point[2] - pulseOrigin[2],
  );
  const waveRadius = pulseElapsedSec * pulseSpeed;
  const delta = Math.abs(dist - waveRadius);
  if (delta > ringWidth) return 0;
  const envelope = Math.max(0, 1 - pulseElapsedSec / 3.2);
  const wave = Math.cos((delta / ringWidth) * Math.PI * 0.5);
  return wave * wave * envelope;
}

/**
 * Generates deterministic start (underground network) and end (molded packaging tray)
 * 3D coordinates for the scrub-able Chapter 5 thread/particle convergence morph.
 */
export interface TrayMorphData {
  sourcePositions: Float32Array;
  targetPositions: Float32Array;
  randomSeeds: Float32Array;
}

export function generateTrayMorphCoordinates(count = 1400, seed = 9001): TrayMorphData {
  const rand = createSeededRandom(seed);
  const sourcePositions = new Float32Array(count * 3);
  const targetPositions = new Float32Array(count * 3);
  const randomSeeds = new Float32Array(count);

  // Tray center in world space is at [0, -5.45, 0], dimensions ~ 2.7w x 0.62h x 1.75d
  const trayCenterY = -5.45;
  const halfW = 1.32;
  const halfD = 0.86;
  const height = 0.56;

  for (let i = 0; i < count; i++) {
    randomSeeds[i] = rand();

    // Source: spread across the underground mycelium network above and around the tray
    const angle = rand() * Math.PI * 2;
    const radius = 1.8 + rand() * 6.5;
    sourcePositions[i * 3 + 0] = Math.cos(angle) * radius;
    sourcePositions[i * 3 + 1] = -2.2 - rand() * 3.8;
    sourcePositions[i * 3 + 2] = Math.sin(angle) * radius;

    // Target: distributed on the rounded rectangular molded tray silhouette
    let tx = (rand() * 2 - 1) * halfW;
    let tz = (rand() * 2 - 1) * halfD;

    // Respect the broken/cut front-right corner (x > 0.65 && z > 0.25)
    if (tx > 0.68 && tz > 0.26 && tx + tz * 1.2 > 1.25) {
      tx -= 0.45;
      tz -= 0.35;
    }

    // Recessed inner cavity vs raised perimeter wall & lip
    const normX = Math.abs(tx) / halfW;
    const normZ = Math.abs(tz) / halfD;
    const edgeFactor = Math.max(normX, normZ);
    let ty = trayCenterY - height * 0.42;
    if (edgeFactor > 0.72) {
      const wallT = Math.min(1, (edgeFactor - 0.72) / 0.28);
      ty = trayCenterY - height * 0.42 + wallT * height;
    }
    ty += (rand() - 0.5) * 0.06;

    targetPositions[i * 3 + 0] = tx;
    targetPositions[i * 3 + 1] = ty;
    targetPositions[i * 3 + 2] = tz;
  }

  return {
    sourcePositions,
    targetPositions,
    randomSeeds,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/forestAndSoil.ts">
<![CDATA[import * as THREE from 'three';
import type { ProceduralTextureSet } from './textures';
import { createSeededRandom, type NeighborMushroomTarget } from '../logic/networkGenerator';
import {
  buildParasolMushroom,
  type BuiltMushroomModel,
  type MushroomGrowthStage,
} from './models/mushroomModel';
import { computeSunlightState, smoothstep } from '../logic/chapters';
import { buildSoilDescentCrossSection } from './soilDescent';

export interface BuiltForestAndSoil {
  rootGroup: THREE.Group;
  neighborMushrooms: BuiltMushroomModel[];
  fairyRingMushrooms: BuiltMushroomModel[];
  updateAtProgress: (params: {
    progress: number;
    undergroundFactor: number;
    gillSporeIntensity: number;
    fairyRingGrowth: number;
    elapsedSec: number;
    sunlight?: number;
  }) => void;
  triggerMushroomGlow: (mushroomIndex: number) => void;
}

/**
 * Builds the macro forest floor and subterranean ant-farm soil cross-section:
 * 1. Damp dark loam soil ground with procedural normal/roughness relief & Ch 6 foxfire surface shimmer
 * 2. Low clumps of moss built from 2,600 dense short moss fibres clustered in natural colonies
 * 3. Sculpted, curled, veined brown/ochre fallen leaves, branched twigs, and pine needles
 * 4. Chapter 2->4 Ant-Farm Soil Cross-Section Descent (leaf litter with white underside hyphae,
 *    moist crumbly humus with pale root hairs & woodlouse tunnel, brown topsoil with pebbles &
 *    thick diagonal branching tree root, redder clay subsoil with rounded rocks, foxfire cracks,
 *    earthen clump pocket, and foreground parallax crumbs)
 * 5. Chapter 4 neighboring mushrooms & Chapter 6 varied-age fairy ring (drumstick, half-open, open)
 */
export function buildForestAndSoil(
  textures: ProceduralTextureSet,
  neighborTargets: NeighborMushroomTarget[],
  seed = 2026,
): BuiltForestAndSoil {
  const rand = createSeededRandom(seed);
  const rootGroup = new THREE.Group();
  rootGroup.name = 'ForestFloorAndSoilStrata';

  const getGroundHeightAt = (x: number, z: number): number => {
    const dist = Math.hypot(x, z);
    if (dist < 0.68) return 0;
    const blend = Math.min(1, (dist - 0.68) / 1.8);
    return (
      (Math.sin(x * 0.65) * Math.cos(z * 0.65) * 0.12 +
        Math.sin(x * 1.8 + z * 1.4) * 0.04 +
        Math.cos(x * 3.4 - z * 2.9) * 0.015) *
      blend
    );
  };

  // Remap helper so surface props in front of the cut line (z > 0.34, |x| < 1.9) sit right along
  // the cut edge for a crisp silhouette at Breaking Ground without floating over the camera trench
  const constrainToCutLip = (x: number, z: number): [number, number] => {
    if (Math.abs(x) < 1.95 && z > 0.34 && z < 3.4) {
      const lipZ = 0.08 + (z - 0.34) * 0.095 + Math.sin(x * 3.2) * 0.05;
      return [x, lipZ];
    }
    return [x, z];
  };

  // 1. Damp dark forest soil surface (y = 0)
  const floorGeo = new THREE.PlaneGeometry(36, 36, 64, 64);
  floorGeo.rotateX(-Math.PI / 2);
  const fPos = floorGeo.attributes.position;
  for (let i = 0; i < fPos.count; i++) {
    const fx = fPos.getX(i);
    const fz = fPos.getZ(i);
    fPos.setY(i, getGroundHeightAt(fx, fz));
  }
  floorGeo.computeVertexNormals();

  const floorCutUniform = { value: 0.0 };
  const floorMat = new THREE.MeshStandardMaterial({
    map: textures.soilColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.09,
    color: new THREE.Color('#221912'),
    roughness: 0.88,
    metalness: 0.02,
    transparent: true,
    opacity: 1,
  });
  floorMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTrenchCut = floorCutUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vFloorWorldPos;',
      )
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvFloorWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nuniform float uTrenchCut;\nvarying vec3 vFloorWorldPos;',
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        if (uTrenchCut > 0.01) {
          float cutZ = 0.24 + 0.07 * sin(vFloorWorldPos.x * 2.8);
          if (abs(vFloorWorldPos.x) < 3.6 && vFloorWorldPos.z > cutZ) {
            discard;
          }
        }`,
      );
  };
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.receiveShadow = true;
  rootGroup.add(floorMesh);

  // Soft radial contact shadow directly beneath the hero mushroom bulb
  const contactGeo = new THREE.CircleGeometry(1.35, 32);
  contactGeo.rotateX(-Math.PI / 2);
  const contactMat = new THREE.MeshBasicMaterial({
    color: 0x030201,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });
  const contactDisc = new THREE.Mesh(contactGeo, contactMat);
  contactDisc.position.y = 0.012;
  rootGroup.add(contactDisc);

  // Subtle Foxfire shimmer ring on the soil in Chapter 6 where the underground network surfaces
  const shimmerGeo = new THREE.RingGeometry(1.15, 2.55, 64, 4);
  shimmerGeo.rotateX(-Math.PI / 2);
  const shimmerMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uStrength: { value: 0 },
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uStrength;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        float r = length(vPos.xz);
        float ring = exp(-pow((r - 1.85) / 0.38, 2.0));
        float angle = atan(vPos.z, vPos.x);
        float veins = 0.5 + 0.5 * sin(angle * 14.0 + r * 6.0 - uTime * 1.4) * cos(angle * 9.0 - r * 8.0);
        vec3 foxfire = vec3(0.68, 0.84, 0.24);
        float alpha = ring * veins * uStrength * 0.22;
        gl_FragColor = vec4(foxfire, alpha);
      }
    `,
  });
  const shimmerMesh = new THREE.Mesh(shimmerGeo, shimmerMat);
  shimmerMesh.position.y = 0.02;
  shimmerMesh.visible = false;
  rootGroup.add(shimmerMesh);

  const surfaceDetailsGroup = new THREE.Group();
  rootGroup.add(surfaceDetailsGroup);

  const dummy = new THREE.Object3D();
  const itemColor = new THREE.Color();

  // 2. Low clumps of moss built as 2,600 dense short moss fibres clustered in natural colonies
  const mossClusterCenters: Array<{ x: number; z: number; spread: number }> = [];
  for (let c = 0; c < 42; c++) {
    const ang = (c / 42) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const rad = 0.48 + Math.pow(rand(), 0.72) * 6.2;
    mossClusterCenters.push({
      x: Math.cos(ang) * rad,
      z: Math.sin(ang) * rad,
      spread: 0.22 + rand() * 0.38,
    });
  }

  const mossFibreCount = 2600;
  // Tapered curved moss stalk blade
  const mossStalkGeo = new THREE.ConeGeometry(0.014, 0.095, 3);
  mossStalkGeo.translate(0, 0.045, 0);
  const msPos = mossStalkGeo.attributes.position;
  for (let i = 0; i < msPos.count; i++) {
    const my = msPos.getY(i);
    msPos.setX(i, msPos.getX(i) + my * my * 0.18);
  }
  mossStalkGeo.computeVertexNormals();

  const mossMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.92,
    metalness: 0.0,
  });
  const mossInst = new THREE.InstancedMesh(mossStalkGeo, mossMat, mossFibreCount);
  mossInst.receiveShadow = true;

  for (let i = 0; i < mossFibreCount; i++) {
    const cluster = mossClusterCenters[i % mossClusterCenters.length];
    const localR = Math.pow(rand(), 0.65) * cluster.spread;
    const localAng = rand() * Math.PI * 2;
    const rawX = cluster.x + Math.cos(localAng) * localR;
    const rawZ = cluster.z + Math.sin(localAng) * localR;
    const [mx, mz] = constrainToCutLip(rawX, rawZ);
    const my = getGroundHeightAt(mx, mz) - 0.008;

    dummy.position.set(mx, my, mz);
    dummy.rotation.set(
      (rand() - 0.5) * 0.55,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.55,
    );
    const hScale = (0.65 + rand() * 0.85) * (1 - (localR / cluster.spread) * 0.45);
    dummy.scale.set(0.8 + rand() * 0.6, Math.max(0.35, hScale), 0.8 + rand() * 0.6);
    dummy.updateMatrix();
    mossInst.setMatrixAt(i, dummy.matrix);

    // Muted forest moss olive & deep bryophyte green
    itemColor.setHSL(0.24 + (rand() - 0.5) * 0.04, 0.44, 0.11 + rand() * 0.08);
    mossInst.setColorAt(i, itemColor);
  }
  mossInst.instanceMatrix.needsUpdate = true;
  if (mossInst.instanceColor) mossInst.instanceColor.needsUpdate = true;
  mossInst.computeBoundingSphere();
  surfaceDetailsGroup.add(mossInst);

  // 3. Curled, veined brown & ochre leaf litter (sculpted ovate leaf blade with petiole & curled edges)
  const leafCount = 190;
  const leafGeo = new THREE.PlaneGeometry(0.34, 0.20, 6, 4);
  leafGeo.rotateX(-Math.PI / 2);
  const lPos = leafGeo.attributes.position;
  for (let i = 0; i < lPos.count; i++) {
    const lx = lPos.getX(i); // -0.17 to +0.17 along midrib
    const lz = lPos.getZ(i); // -0.10 to +0.10 across blade width
    const u = Math.max(0, Math.min(1, (lx + 0.17) / 0.34)); // 0 at base, 1 at tip
    // Ovate leaf silhouette tapering to a point at u=1 and pinched petiole at u=0
    const widthProfile = Math.sin(Math.pow(u, 0.85) * Math.PI) * (1 + 0.12 * Math.sin(u * Math.PI * 5));
    const shapedZ = lz * Math.max(0.06, widthProfile);
    // Natural upward dry-leaf curl at margins and longitudinal arch
    const marginCurl = Math.pow(shapedZ / 0.10, 2) * 0.032;
    const midribArch = Math.sin(u * Math.PI) * 0.018 - Math.pow(u - 0.5, 2) * 0.025;
    lPos.setXYZ(i, lx, marginCurl + midribArch, shapedZ);
  }
  leafGeo.computeVertexNormals();

  const leafMat = new THREE.MeshStandardMaterial({
    map: textures.leafColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.015,
    color: new THREE.Color('#ffffff'),
    roughness: 0.82,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });
  const leafInst = new THREE.InstancedMesh(leafGeo, leafMat, leafCount);
  leafInst.receiveShadow = true;

  for (let i = 0; i < leafCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.52 + Math.pow(rand(), 0.72) * 7.8;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [lx, lz] = constrainToCutLip(rawX, rawZ);
    const ly = getGroundHeightAt(lx, lz) + 0.008 + rand() * 0.018;

    dummy.position.set(lx, ly, lz);
    dummy.rotation.set(
      (rand() - 0.5) * 0.28,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.28,
    );
    const s = 0.7 + rand() * 1.1;
    dummy.scale.set(s, s, s * (0.85 + rand() * 0.3));
    dummy.updateMatrix();
    leafInst.setMatrixAt(i, dummy.matrix);

    // Varied autumn/forest floor umber, russet, and muted ochre
    itemColor.setHSL(0.065 + rand() * 0.035, 0.42 + rand() * 0.18, 0.18 + rand() * 0.14);
    leafInst.setColorAt(i, itemColor);
  }
  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();
  surfaceDetailsGroup.add(leafInst);

  // 4. Fallen twigs & pine needles on the forest floor
  const twigCount = 65;
  const twigGeo = new THREE.CylinderGeometry(0.008, 0.014, 0.48, 5, 4);
  twigGeo.rotateZ(Math.PI * 0.5);
  const twPos = twigGeo.attributes.position;
  for (let i = 0; i < twPos.count; i++) {
    const tx = twPos.getX(i);
    twPos.setY(i, twPos.getY(i) + Math.sin(tx * 9) * 0.014);
  }
  twigGeo.computeVertexNormals();

  const twigMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    roughness: 0.92,
    metalness: 0.0,
  });
  const twigInst = new THREE.InstancedMesh(twigGeo, twigMat, twigCount);
  for (let i = 0; i < twigCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.58 + Math.pow(rand(), 0.75) * 7.2;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [tx, tz] = constrainToCutLip(rawX, rawZ);
    dummy.position.set(tx, getGroundHeightAt(tx, tz) + 0.01, tz);
    dummy.rotation.set((rand() - 0.5) * 0.15, rand() * Math.PI * 2, (rand() - 0.5) * 0.15);
    dummy.scale.set(0.6 + rand() * 1.1, 0.7 + rand() * 0.6, 0.7 + rand() * 0.6);
    dummy.updateMatrix();
    twigInst.setMatrixAt(i, dummy.matrix);
  }
  twigInst.instanceMatrix.needsUpdate = true;
  twigInst.computeBoundingSphere();
  surfaceDetailsGroup.add(twigInst);

  // Pine needles (LineSegments)
  const needleCount = 900;
  const needlePositions = new Float32Array(needleCount * 6);
  for (let i = 0; i < needleCount; i++) {
    const angle = rand() * Math.PI * 2;
    const radius = 0.42 + Math.pow(rand(), 0.7) * 6.8;
    const rawX = Math.cos(angle) * radius;
    const rawZ = Math.sin(angle) * radius;
    const [nx, nz] = constrainToCutLip(rawX, rawZ);
    const ny = getGroundHeightAt(nx, nz) + 0.006;
    const dir = rand() * Math.PI * 2;
    const len = 0.11 + rand() * 0.08;
    needlePositions[i * 6 + 0] = nx;
    needlePositions[i * 6 + 1] = ny;
    needlePositions[i * 6 + 2] = nz;
    needlePositions[i * 6 + 3] = nx + Math.cos(dir) * len;
    needlePositions[i * 6 + 4] = ny + 0.004;
    needlePositions[i * 6 + 5] = nz + Math.sin(dir) * len;
  }
  const needleGeo = new THREE.BufferGeometry();
  needleGeo.setAttribute('position', new THREE.BufferAttribute(needlePositions, 3));
  const needleMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#3b2818'),
    transparent: true,
    opacity: 0.65,
  });
  const needleLines = new THREE.LineSegments(needleGeo, needleMat);
  surfaceDetailsGroup.add(needleLines);

  // 5. Subtle warm shaft of forest light from upper-left (angle & color synchronized with Sunlight slider)
  const shaftGeo = new THREE.CylinderGeometry(1.0, 2.5, 8.5, 24, 1, true);
  shaftGeo.translate(0, 4.1, 0);
  const shaftMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uOpacity: { value: 0.055 },
      uColor: { value: new THREE.Color('#e0bc84') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vViewPos = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vViewPos;
      void main() {
        vec3 viewDir = normalize(vViewPos);
        float edgeFade = pow(abs(dot(vNormal, viewDir)), 1.7);
        float verticalFade = smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.65, 1.0, vUv.y));
        gl_FragColor = vec4(uColor, edgeFade * verticalFade * uOpacity);
      }
    `,
  });
  const lightShaft = new THREE.Mesh(shaftGeo, shaftMat);
  lightShaft.rotation.z = 0.22;
  lightShaft.rotation.x = 0.08;
  rootGroup.add(lightShaft);

  // 6. Chapter 02 -> 04 "Ant-Farm Glass" Soil Cross-Section Descent & Clump Pocket
  const soilDescent = buildSoilDescentCrossSection(textures, seed + 101);
  rootGroup.add(soilDescent.group);

  // 7. Drifting Spore Motes above ground + Falling Gill Spores in Ch 2 + Underground Soil Dust in Ch 3-4
  const moteCount = 380;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount);

  for (let i = 0; i < moteCount; i++) {
    moteSeeds[i] = rand();
    const angle = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.65) * 4.2;
    motePositions[i * 3 + 0] = Math.cos(angle) * r;
    // Half above ground (0.1..4.2), half subterranean soil dust (-3.4..0.0)
    motePositions[i * 3 + 1] = i < moteCount * 0.55 ? 0.15 + rand() * 4.2 : -0.1 - rand() * 3.3;
    motePositions[i * 3 + 2] = Math.sin(angle) * r;
  }

  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  moteGeo.setAttribute('aSeed', new THREE.BufferAttribute(moteSeeds, 1));

  const moteMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uGillFall: { value: 0 },
      uUnderground: { value: 0 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute float aSeed;
      uniform float uTime;
      uniform float uGillFall;
      uniform float uUnderground;
      varying float vAlpha;
      varying float vIsSubterranean;

      void main() {
        vec3 pos = position;
        vIsSubterranean = pos.y < 0.0 ? 1.0 : 0.0;

        if (pos.y >= 0.0) {
          float fallSpeed = mix(0.06, 0.52, uGillFall);
          pos.y = mod(pos.y - uTime * fallSpeed + aSeed * 4.2, 4.2);
          pos.x += sin(uTime * 0.65 + aSeed * 12.0) * 0.12;
          pos.z += cos(uTime * 0.55 + aSeed * 9.0) * 0.12;
          pos.xz *= mix(1.0, 0.46, uGillFall);
        } else {
          // Slow drifting underground soil dust
          pos.x += sin(uTime * 0.35 + aSeed * 15.0) * 0.08;
          pos.y += cos(uTime * 0.28 + aSeed * 11.0) * 0.05;
          pos.z += sin(uTime * 0.32 + aSeed * 19.0) * 0.08;
        }

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (10.0 + aSeed * 12.0) * (1.0 / max(0.5, -mvPosition.z));
        float pulse = 0.35 + 0.65 * sin(uTime * 1.4 + aSeed * 6.28);
        vAlpha = pulse * (vIsSubterranean > 0.5 ? uUnderground * 0.55 : (1.0 - uUnderground * 0.7));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uSprite;
      varying float vAlpha;
      varying float vIsSubterranean;

      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.05) discard;
        vec3 warmMote = vec3(0.84, 0.76, 0.62);
        vec3 soilDust = vec3(0.58, 0.52, 0.40);
        vec3 col = mix(warmMote, soilDust, vIsSubterranean);
        gl_FragColor = vec4(col, tex.a * vAlpha * 0.75);
      }
    `,
  });

  const sporeMotes = new THREE.Points(moteGeo, moteMat);
  rootGroup.add(sporeMotes);

  // 8. Chapter 4 Neighboring Mushrooms linked by the underground mycelium network
  const neighborMushrooms: BuiltMushroomModel[] = [];
  const mushroomGlowTimers = new Float32Array(neighborTargets.length);

  for (let i = 0; i < neighborTargets.length; i++) {
    const target = neighborTargets[i];
    const stage: MushroomGrowthStage = i % 3 === 1 ? 'half' : 'open';
    const m = buildParasolMushroom(textures, 800 + i * 31, false, stage);
    m.group.position.set(target.position[0], target.position[1], target.position[2]);
    m.group.scale.setScalar(target.scale);
    m.group.rotation.y = rand() * Math.PI * 2;
    neighborMushrooms.push(m);
    rootGroup.add(m.group);
  }

  // 9. Chapter 6 Fairy Ring of new mushrooms fruiting around the original
  //    Varied in size, age (closed drumstick-shaped young caps, half-open ones, fully open parasols),
  //    tilt, and rotation. Zero glow on them.
  const fairyRingMushrooms: BuiltMushroomModel[] = [];
  const fairyRingBaseScales: number[] = [];
  const fairyStages: MushroomGrowthStage[] = [
    'drumstick',
    'open',
    'half',
    'drumstick',
    'half',
    'open',
    'drumstick',
    'half',
  ];
  const fairyCount = fairyStages.length;

  for (let i = 0; i < fairyCount; i++) {
    const stage = fairyStages[i];
    const angle = (i / fairyCount) * Math.PI * 2 + 0.28 + (rand() - 0.5) * 0.22;
    const radius = 1.65 + (rand() - 0.5) * 0.65;
    const m = buildParasolMushroom(textures, 1200 + i * 19, false, stage);
    const targetScale =
      stage === 'drumstick'
        ? 0.28 + rand() * 0.14
        : stage === 'half'
        ? 0.42 + rand() * 0.16
        : 0.52 + rand() * 0.18;
    fairyRingBaseScales.push(targetScale);

    const gx = Math.cos(angle) * radius;
    const gz = Math.sin(angle) * radius;
    m.group.position.set(gx, getGroundHeightAt(gx, gz), gz);
    m.group.rotation.set(
      (rand() - 0.5) * 0.22,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 0.22,
    );
    m.group.scale.setScalar(0.001);
    m.group.visible = false;
    // Never glow in Chapter 6
    m.setBioluminescence(0);
    fairyRingMushrooms.push(m);
    rootGroup.add(m.group);
  }

  let lastElapsed = 0;

  const updateAtProgress = (params: {
    progress: number;
    undergroundFactor: number;
    gillSporeIntensity: number;
    fairyRingGrowth: number;
    elapsedSec: number;
    sunlight?: number;
  }) => {
    const dt = Math.max(0, Math.min(0.1, params.elapsedSec - lastElapsed));
    lastElapsed = params.elapsedSec;
    const sunState = computeSunlightState(params.sunlight ?? 0.75);

    moteMat.uniforms.uTime.value = params.elapsedSec;
    moteMat.uniforms.uGillFall.value = params.gillSporeIntensity;
    moteMat.uniforms.uUnderground.value = params.undergroundFactor;
    sporeMotes.visible = params.progress < 0.77 || params.progress > 0.895;

    const inDescentTrench =
      smoothstep(0.21, 0.245, params.progress) *
      (1 - smoothstep(0.58, 0.63, params.progress));
    floorCutUniform.value = inDescentTrench;

    floorMat.opacity = 1 - params.undergroundFactor * 0.25;
    floorMesh.visible = params.progress < 0.35 || params.progress > 0.86;
    contactDisc.visible = params.progress < 0.265 || params.progress > 0.88;
    surfaceDetailsGroup.visible = params.progress < 0.35 || params.progress > 0.86;

    soilDescent.updateDescent({
      progress: params.progress,
      undergroundFactor: params.undergroundFactor,
      networkGrowth: 0,
      elapsedSec: params.elapsedSec,
      sunColorRgb: sunState.sunColorRgb,
      sunlight: sunState.sunlight,
    });

    shaftMat.uniforms.uOpacity.value =
      0.055 * (1 - params.undergroundFactor * 0.75) * sunState.godRayOpacityMultiplier;
    shaftMat.uniforms.uColor.value.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    lightShaft.rotation.z = 0.42 - sunState.sunlight * 0.32;
    lightShaft.visible = params.undergroundFactor < 0.95;

    // Chapter 6 faint foxfire shimmer on the soil where the network surfaces
    shimmerMesh.visible = params.fairyRingGrowth > 0.05;
    shimmerMat.uniforms.uStrength.value = params.fairyRingGrowth;
    shimmerMat.uniforms.uTime.value = params.elapsedSec;

    // Neighboring mushrooms are only revealed during Chapter 4b (wide underground network view)
    const showNeighbors = params.progress >= 0.54 && params.progress < 0.74;
    for (let i = 0; i < neighborMushrooms.length; i++) {
      neighborMushrooms[i].group.visible = showNeighbors;
      if (mushroomGlowTimers[i] > 0) {
        mushroomGlowTimers[i] = Math.max(0, mushroomGlowTimers[i] - dt * 1.1);
      }
      // Only glow briefly when a click pulse reaches them
      const pulseBoost = Math.sin(mushroomGlowTimers[i] * Math.PI) * 0.85;
      neighborMushrooms[i].setBioluminescence(pulseBoost);
    }

    // Update Chapter 6 fairy ring fruiting growth (no glow, natural light)
    for (let i = 0; i < fairyRingMushrooms.length; i++) {
      const m = fairyRingMushrooms[i];
      const stagger = i * 0.07;
      const localG = Math.max(
        0,
        Math.min(1, (params.fairyRingGrowth - stagger) / (1 - stagger * 0.65)),
      );
      m.group.visible = localG > 0.01;
      if (localG > 0.01) {
        const ease = 1 - Math.pow(1 - localG, 3);
        const s = fairyRingBaseScales[i] * ease;
        m.group.scale.set(s * (0.88 + (i % 3) * 0.08), s * (0.72 + 0.28 * ease), s);
        const baseGroundY = getGroundHeightAt(m.group.position.x, m.group.position.z);
        m.group.position.y = baseGroundY + (1 - ease) * -0.55;
        m.setBioluminescence(0);
      }
    }
  };

  const triggerMushroomGlow = (mushroomIndex: number) => {
    if (mushroomIndex >= 0 && mushroomIndex < mushroomGlowTimers.length) {
      mushroomGlowTimers[mushroomIndex] = 1.0;
    }
  };

  return {
    rootGroup,
    neighborMushrooms,
    fairyRingMushrooms,
    updateAtProgress,
    triggerMushroomGlow,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/inspectController.ts">
<![CDATA[import * as THREE from 'three';
import {
  TRAY_CALLOUT_ANCHORS,
  type InspectableObjectId,
} from '../logic/chapters';
import {
  OBJECT_PART_PINS,
  createInitialInspectState,
  onInspectPointerDown,
  onInspectPointerMove,
  onInspectPointerUp,
  tickInspectState,
  toggleKeyboardInspect,
  applyKeyboardRotationStep,
  exitInspectMode,
  isPinFacingCamera,
  type HoldInspectState,
} from '../logic/holdInspectLogic';

export interface ProjectedPartPin {
  id: string;
  label: string;
  screenX: number;
  screenY: number;
  anchorX: number;
  anchorY: number;
  visible: boolean;
}

export interface InspectUIFrameState {
  phase: HoldInspectState['phase'];
  targetObject: InspectableObjectId | null;
  holdProgress: number;
  pointerX: number;
  pointerY: number;
  hasUsedInspect: boolean;
  keyboardMode: boolean;
  pins: ProjectedPartPin[];
  trayCallouts: ProjectedPartPin[];
}

export interface InspectController {
  getState: () => HoldInspectState;
  getUIFrameState: () => InspectUIFrameState;
  tick: (dtMs: number, activeChapterObject: InspectableObjectId | null) => void;
  triggerKeyboardInspect: (targetObject: InspectableObjectId) => void;
  exitInspect: () => void;
  dispose: () => void;
}

// Pre-allocated scratch math objects (zero GC in render loop)
const _worldPos = new THREE.Vector3();
const _ndcPos = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _quat = new THREE.Quaternion();

/**
 * Manages the Hold-to-Inspect interaction for the Mushroom (Ch 1),
 * Mycelium Clump (Ch 4a), and Molded Packaging Tray (Ch 5),
 * as well as projecting 3D callout anchors for Chapter 5 tray property labels.
 */
export function createInspectController(params: {
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  pivotGroups: Record<InspectableObjectId, THREE.Group>;
  hitProxies: Record<InspectableObjectId, THREE.Object3D>;
  getActiveChapterInspectable: () => InspectableObjectId | null;
  getActiveChapterIndex?: () => number;
  onInspectActiveChange: (isInspectingOrHolding: boolean) => void;
  onNetworkClick?: (worldPoint: THREE.Vector3) => void;
  onNetworkHover?: (worldPoint: THREE.Vector3) => void;
  networkHitPlane: THREE.Object3D;
}): InspectController {
  let state: HoldInspectState = createInitialInspectState();
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let lastMoveTime = performance.now();

  const updatePointerNdc = (clientX: number, clientY: number) => {
    const rect = params.canvas.getBoundingClientRect();
    pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  };

  const notifyScrollLock = (
    prevPhase: HoldInspectState['phase'],
    nextPhase: HoldInspectState['phase'],
  ) => {
    const wasLocked = prevPhase === 'inspecting';
    const isLocked = nextPhase === 'inspecting';
    if (wasLocked !== isLocked) {
      params.onInspectActiveChange(isLocked);
    }
  };

  const isChapter4Active = () => {
    if (params.getActiveChapterIndex) {
      return params.getActiveChapterIndex() === 3;
    }
    return params.getActiveChapterInspectable() === 'clump';
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const activeTarget = params.getActiveChapterInspectable();
    updatePointerNdc(e.clientX, e.clientY);
    raycaster.setFromCamera(pointerNdc, params.camera);

    // Check if the user pressed on the active chapter's inspectable specimen
    if (activeTarget) {
      const proxy = params.hitProxies[activeTarget];
      const hits = raycaster.intersectObject(proxy, true);
      if (hits.length > 0) {
        const prevPhase = state.phase;
        state = onInspectPointerDown(state, activeTarget, e.clientX, e.clientY);
        notifyScrollLock(prevPhase, state.phase);
        lastMoveTime = performance.now();
        return;
      }
    }

    // In Chapter 4 (both 4a and 4b), clicking on the mycelium network triggers a Foxfire pulse
    if (isChapter4Active() && state.phase === 'idle') {
      const netHits = raycaster.intersectObject(params.networkHitPlane, false);
      if (netHits.length > 0 && params.onNetworkClick) {
        params.onNetworkClick(netHits[0].point);
      }
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    const now = performance.now();
    const dtSec = Math.max(0.004, (now - lastMoveTime) / 1000);
    lastMoveTime = now;

    if (state.phase === 'holding' || state.phase === 'inspecting') {
      const prevPhase = state.phase;
      state = onInspectPointerMove(state, e.clientX, e.clientY, dtSec);
      notifyScrollLock(prevPhase, state.phase);
      if (state.phase === 'inspecting') {
        e.preventDefault();
      }
      return;
    }

    // When in Chapter 4, update pointer world coordinates so nearby mycelium threads brighten
    if (isChapter4Active() && params.onNetworkHover) {
      updatePointerNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, params.camera);
      const netHits = raycaster.intersectObject(params.networkHitPlane, false);
      if (netHits.length > 0) {
        params.onNetworkHover(netHits[0].point);
      }
    }
  };

  const handlePointerUpOrCancel = () => {
    if (state.phase === 'holding' || state.phase === 'inspecting') {
      const prevPhase = state.phase;
      state = onInspectPointerUp(state);
      notifyScrollLock(prevPhase, state.phase);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (state.phase !== 'inspecting') return;

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      const prevPhase = state.phase;
      state = exitInspectMode(state);
      notifyScrollLock(prevPhase, state.phase);
      return;
    }

    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      e.preventDefault();
      e.stopPropagation();
      state = applyKeyboardRotationStep(state, e.key);
    }
  };

  params.canvas.addEventListener('pointerdown', handlePointerDown);
  window.addEventListener('pointermove', handlePointerMove, { passive: false });
  window.addEventListener('pointerup', handlePointerUpOrCancel);
  window.addEventListener('pointercancel', handlePointerUpOrCancel);
  window.addEventListener('keydown', handleKeyDown, { capture: true });

  const triggerKeyboardInspect = (targetObject: InspectableObjectId) => {
    const prevPhase = state.phase;
    state = toggleKeyboardInspect(state, targetObject);
    notifyScrollLock(prevPhase, state.phase);
  };

  const exitInspect = () => {
    const prevPhase = state.phase;
    state = exitInspectMode(state);
    notifyScrollLock(prevPhase, state.phase);
  };

  const tick = (dtMs: number, activeChapterObject: InspectableObjectId | null) => {
    // If chapter or sub-rest-point changed away from the inspected object, exit inspect cleanly
    if (
      state.targetObject &&
      activeChapterObject !== state.targetObject &&
      (state.phase === 'holding' || state.phase === 'inspecting')
    ) {
      const prevPhase = state.phase;
      state = exitInspectMode(state);
      notifyScrollLock(prevPhase, state.phase);
    }

    const prevPhase = state.phase;
    state = tickInspectState(state, dtMs);
    notifyScrollLock(prevPhase, state.phase);

    // Apply current quaternion to the target pivot group (and reset non-active ones to identity)
    const allIds: InspectableObjectId[] = ['mushroom', 'clump', 'tray'];
    for (const id of allIds) {
      const pivot = params.pivotGroups[id];
      if (state.targetObject === id && state.phase !== 'idle') {
        _quat.set(
          state.quaternion[0],
          state.quaternion[1],
          state.quaternion[2],
          state.quaternion[3],
        );
        pivot.quaternion.copy(_quat);
      } else {
        pivot.quaternion.identity();
      }
    }
  };

  const getUIFrameState = (): InspectUIFrameState => {
    const pins: ProjectedPartPin[] = [];
    const trayCallouts: ProjectedPartPin[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (
      state.targetObject &&
      (state.phase === 'inspecting' || state.phase === 'returning')
    ) {
      const targetId = state.targetObject;
      const pivot = params.pivotGroups[targetId];
      const defs = OBJECT_PART_PINS[targetId];

      pivot.updateWorldMatrix(true, false);
      pivot.getWorldPosition(_worldPos);
      _camDir.subVectors(params.camera.position, _worldPos).normalize();

      for (const def of defs) {
        const facing = isPinFacingCamera(def.localNormal, state.quaternion, [
          _camDir.x,
          _camDir.y,
          _camDir.z,
        ]);

        _worldPos.set(def.localPosition[0], def.localPosition[1], def.localPosition[2]);
        _worldPos.applyMatrix4(pivot.matrixWorld);
        _ndcPos.copy(_worldPos).project(params.camera);

        const anchorX = (_ndcPos.x * 0.5 + 0.5) * width;
        const anchorY = (-_ndcPos.y * 0.5 + 0.5) * height;

        const dirX = anchorX - width * 0.5;
        const dirY = anchorY - height * 0.5;
        const len = Math.hypot(dirX, dirY) || 1;
        const offsetDist = 64;
        const screenX = Math.max(96, Math.min(width - 96, anchorX + (dirX / len) * offsetDist));
        const screenY = Math.max(56, Math.min(height - 56, anchorY + (dirY / len) * offsetDist));

        pins.push({
          id: def.id,
          label: def.label,
          screenX,
          screenY,
          anchorX,
          anchorY,
          visible: facing && state.phase === 'inspecting' && _ndcPos.z < 1,
        });
      }
    }

    // Project Chapter 5 tray property callouts so leader lines stay pinned to the 3D tray
    const trayPivot = params.pivotGroups.tray;
    if (trayPivot) {
      trayPivot.updateWorldMatrix(true, false);
      for (const anchor of TRAY_CALLOUT_ANCHORS) {
        _worldPos.set(
          anchor.localPosition[0],
          anchor.localPosition[1],
          anchor.localPosition[2],
        );
        _worldPos.applyMatrix4(trayPivot.matrixWorld);
        _ndcPos.copy(_worldPos).project(params.camera);

        const anchorX = (_ndcPos.x * 0.5 + 0.5) * width;
        const anchorY = (-_ndcPos.y * 0.5 + 0.5) * height;
        const screenX = Math.max(
          110,
          Math.min(width - 110, anchorX + anchor.screenOffset[0]),
        );
        const screenY = Math.max(
          72,
          Math.min(height - 72, anchorY + anchor.screenOffset[1]),
        );

        trayCallouts.push({
          id: anchor.id,
          label: anchor.label,
          screenX,
          screenY,
          anchorX,
          anchorY,
          visible: _ndcPos.z > -1 && _ndcPos.z < 1,
        });
      }
    }

    return {
      phase: state.phase,
      targetObject: state.targetObject,
      holdProgress: state.holdProgress,
      pointerX: state.pointerCurrent.x,
      pointerY: state.pointerCurrent.y,
      hasUsedInspect: state.hasUsedInspect,
      keyboardMode: state.keyboardMode,
      pins,
      trayCallouts,
    };
  };

  const dispose = () => {
    params.canvas.removeEventListener('pointerdown', handlePointerDown);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUpOrCancel);
    window.removeEventListener('pointercancel', handlePointerUpOrCancel);
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
  };

  return {
    getState: () => state,
    getUIFrameState,
    tick,
    triggerKeyboardInspect,
    exitInspect,
    dispose,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/myceliumNetwork.ts">
<![CDATA[import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { GeneratedMyceliumNetwork } from '../logic/networkGenerator';

export interface BuiltMyceliumNetwork {
  group: THREE.Group;
  networkMesh: THREE.Mesh;
  hitPlane: THREE.Mesh;
  updateNetwork: (params: {
    growth: number;
    convergence: number;
    undergroundFactor: number;
    elapsedSec: number;
    pointerWorld: THREE.Vector3;
  }) => void;
  triggerPulseAt: (
    worldPoint: THREE.Vector3,
    elapsedSec: number,
    onReachMushroom: (mushroomIndex: number) => void,
  ) => void;
}

/**
 * Builds the procedural 3D Mycelium Network (Chapter 4 signature moment):
 * - Renders a 3-tier hierarchy of over 1,200 filaments (~16,000 segments):
 *   - Tier 0: Thicker arterial rhizomorph cords (thin TubeGeometry)
 *   - Tier 1 & Tier 2: Hundreds of branching secondary threads and over a thousand hair-fine
 *     feathery hyphae (high-density LineSegments)
 * - Soft Foxfire green-gold bioluminescent shader (`#b8dc3c`):
 *   - Visible growing edge that brightens softly as it advances (`uGrowth`)
 *   - Brightens near the pointer (`uPointerWorld`) and along travelling click pulses (`uPulseOrigin`)
 *   - Fades out cleanly in Chapter 5 as the solid packaging tray resolves
 */
export function buildMyceliumNetworkScene(
  networkData: GeneratedMyceliumNetwork,
): BuiltMyceliumNetwork {
  const group = new THREE.Group();
  group.name = 'BioluminescentMyceliumNetwork';

  // 1. Tier 0 arterial cords as slender TubeGeometries
  const tubeGeometries: THREE.BufferGeometry[] = [];
  // 2. Tier 1 & Tier 2 fine branching threads & hair-fine hyphae as LineSegments
  const linePositions: number[] = [];
  const lineGrowths: number[] = [];
  const lineTiers: number[] = [];

  for (const branch of networkData.branches) {
    if (branch.tier === 0) {
      const curvePts = branch.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(curvePts);
      const tubularSegments = Math.max(12, branch.points.length * 2);
      const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, branch.radius * 0.72, 5, false);

      const vertCount = tubeGeo.attributes.position.count;
      const growthAttr = new Float32Array(vertCount);
      const tierAttr = new Float32Array(vertCount);
      const uvs = tubeGeo.attributes.uv;

      for (let i = 0; i < vertCount; i++) {
        const along = uvs.getX(i);
        growthAttr[i] = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * along;
        tierAttr[i] = 0.0;
      }

      tubeGeo.setAttribute('aGrowth', new THREE.BufferAttribute(growthAttr, 1));
      tubeGeo.setAttribute('aTier', new THREE.BufferAttribute(tierAttr, 1));
      tubeGeometries.push(tubeGeo);
    }

    // Also include smooth subdivided line segments for all branches so the fine filament web is seamless
    const curvePts = branch.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(curvePts);
    const subDivs = branch.tier === 0 ? 18 : branch.tier === 1 ? 12 : 6;
    const sampled = curve.getPoints(subDivs);
    const tierVal = branch.tier === 0 ? 0.0 : branch.tier === 1 ? 1.0 : 2.0;

    for (let s = 0; s < sampled.length - 1; s++) {
      const p0 = sampled[s];
      const p1 = sampled[s + 1];
      const a0 = s / sampled.length;
      const a1 = (s + 1) / sampled.length;
      const g0 = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * a0;
      const g1 = branch.startGrowth + (branch.endGrowth - branch.startGrowth) * a1;

      linePositions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      lineGrowths.push(g0, g1);
      lineTiers.push(tierVal, tierVal);
    }
  }

  const mergedTubeGeo = mergeGeometries(tubeGeometries, false);
  for (const g of tubeGeometries) g.dispose();

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  lineGeo.setAttribute('aGrowth', new THREE.Float32BufferAttribute(lineGrowths, 1));
  lineGeo.setAttribute('aTier', new THREE.Float32BufferAttribute(lineTiers, 1));

  const sharedUniforms = {
    uGrowth: { value: 0.0 },
    uConvergence: { value: 0.0 },
    uVisibility: { value: 0.0 },
    uTime: { value: 0.0 },
    uPointerWorld: { value: new THREE.Vector3(0, -999, 0) },
    uPulseOrigin: { value: new THREE.Vector3(0, -1, 0) },
    uPulseStartTime: { value: -100.0 },
  };

  const vertexShader = `
    attribute float aGrowth;
    attribute float aTier;

    uniform float uGrowth;
    uniform float uConvergence;
    uniform float uTime;

    varying float vGrowth;
    varying float vTier;
    varying vec3 vWorldPos;

    void main() {
      vGrowth = aGrowth;
      vTier = aTier;

      vec3 pos = position;

      // In Chapter 5 (uConvergence 0 -> 1), threads pull inward & downward toward the tray mould at [0, -5.42, 0]
      vec3 trayTarget = vec3(pos.x * 0.14, -5.42 + (pos.y + 2.5) * 0.08, pos.z * 0.12);
      pos = mix(pos, trayTarget, uConvergence * 0.9);

      // Subtle organic wavy respiration along filaments
      pos.y += sin(pos.x * 2.1 + pos.z * 2.1 + uTime * 1.4) * 0.018;
      pos.x += cos(pos.z * 2.4 + uTime * 1.1) * 0.012;

      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPos = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const fragmentShader = `
    uniform float uGrowth;
    uniform float uVisibility;
    uniform float uTime;
    uniform vec3 uPointerWorld;
    uniform vec3 uPulseOrigin;
    uniform float uPulseStartTime;

    varying float vGrowth;
    varying float vTier;
    varying vec3 vWorldPos;

    void main() {
      if (vGrowth > uGrowth) discard;

      // Soft taper at the very tip and a bright advancing growth frontier
      float tipFade = smoothstep(uGrowth, max(0.001, uGrowth - 0.035), vGrowth);
      float growingEdge = exp(-pow((uGrowth - vGrowth) / 0.045, 2.0));

      // Calibrated Foxfire green-gold palette (soft green-gold base, bright only at growing edge & pulses)
      vec3 dimLoamThread = vec3(0.32, 0.44, 0.10);
      vec3 foxfireGold = vec3(0.68, 0.84, 0.24);
      vec3 brightPulseTip = vec3(1.12, 1.28, 0.52);

      float flow = 0.5 + 0.5 * sin(vGrowth * 32.0 - uTime * 2.2);
      vec3 color = mix(dimLoamThread, foxfireGold, 0.35 + 0.45 * flow);

      // Brighten the advancing growing edge
      color = mix(color, brightPulseTip, growingEdge * 0.78);

      // Pointer proximity brightening
      float ptrDist = distance(vWorldPos, uPointerWorld);
      float ptrBoost = exp(-ptrDist * ptrDist * 0.35);
      color += brightPulseTip * ptrBoost * 0.65;

      // Interactive click pulse wave travelling outward along the branches
      float pulseAge = uTime - uPulseStartTime;
      float pulseBoost = 0.0;
      if (pulseAge >= 0.0 && pulseAge < 3.6) {
        float distFromClick = distance(vWorldPos, uPulseOrigin);
        float waveRadius = pulseAge * 6.8;
        float ringDelta = abs(distFromClick - waveRadius);
        if (ringDelta < 1.4) {
          float env = 1.0 - (pulseAge / 3.6);
          float w = cos((ringDelta / 1.4) * 1.570796);
          pulseBoost = w * w * env * 1.45;
          color = mix(color, brightPulseTip, min(1.0, pulseBoost));
        }
      }

      // Hierarchy opacity: thicker cords (tier 0) strongest, secondary threads (tier 1) medium, hair-fine hyphae (tier 2) delicate
      float tierBaseAlpha = vTier < 0.5 ? 0.58 : (vTier < 1.5 ? 0.34 : 0.19);
      float alpha = tipFade * uVisibility * (tierBaseAlpha + growingEdge * 0.38 + ptrBoost * 0.32 + pulseBoost * 0.55);
      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.92));
    }
  `;

  const shaderMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: sharedUniforms,
    vertexShader,
    fragmentShader,
  });

  const networkMesh = new THREE.Mesh(mergedTubeGeo, shaderMat);
  networkMesh.frustumCulled = false;
  group.add(networkMesh);

  const fineFilamentsLines = new THREE.LineSegments(lineGeo, shaderMat);
  fineFilamentsLines.frustumCulled = false;
  group.add(fineFilamentsLines);

  // Invisible horizontal raycast plane at the average network depth (y = -1.5)
  const hitPlaneGeo = new THREE.PlaneGeometry(28, 28);
  hitPlaneGeo.rotateX(-Math.PI / 2);
  const hitPlaneMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitPlane = new THREE.Mesh(hitPlaneGeo, hitPlaneMat);
  hitPlane.position.y = -1.5;
  group.add(hitPlane);

  const scheduledTimeouts: number[] = [];

  const updateNetwork = (params: {
    growth: number;
    convergence: number;
    undergroundFactor: number;
    elapsedSec: number;
    pointerWorld: THREE.Vector3;
  }) => {
    // Fade the network out completely as the solid tray and studio resolve in Chapter 5
    const vis = params.undergroundFactor * Math.pow(Math.max(0, 1 - params.convergence), 1.6);
    group.visible = vis > 0.008 && params.growth > 0.005;
    sharedUniforms.uGrowth.value = params.growth;
    sharedUniforms.uConvergence.value = params.convergence;
    sharedUniforms.uVisibility.value = vis;
    sharedUniforms.uTime.value = params.elapsedSec;
    sharedUniforms.uPointerWorld.value.copy(params.pointerWorld);
  };

  const triggerPulseAt = (
    worldPoint: THREE.Vector3,
    elapsedSec: number,
    onReachMushroom: (mushroomIndex: number) => void,
  ) => {
    sharedUniforms.uPulseOrigin.value.copy(worldPoint);
    sharedUniforms.uPulseStartTime.value = elapsedSec;

    for (const m of networkData.neighborMushrooms) {
      const dist = Math.hypot(
        m.position[0] - worldPoint.x,
        m.position[1] - worldPoint.y,
        m.position[2] - worldPoint.z,
      );
      const delayMs = Math.max(60, (dist / 6.8) * 1000);
      const tid = window.setTimeout(() => {
        onReachMushroom(m.index);
      }, delayMs);
      scheduledTimeouts.push(tid);
    }
  };

  return {
    group,
    networkMesh,
    hitPlane,
    updateNetwork,
    triggerPulseAt,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/rendererAndPost.ts">
<![CDATA[import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { computeSunlightState } from '../logic/chapters';

export interface RendererStack {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  composer: EffectComposer | null;
  bloomPass: UnrealBloomPass | null;
  cinematicPass: ShaderPass | null;
  isSoftwareGl: boolean;
  lights: {
    keyLight: THREE.DirectionalLight;
    hemiLight: THREE.HemisphereLight;
    rimLight: THREE.DirectionalLight;
    foxfirePointLight: THREE.PointLight;
  };
  setInspectVisualState: (inspectStrength: number) => void;
  setAtmosphereAtProgress: (
    undergroundFactor: number,
    networkGrowth: number,
    elapsedSec: number,
    trayReveal?: number,
    sunlight?: number,
    studioLightness?: number,
  ) => void;
  resize: (width: number, height: number) => void;
  renderFrame: () => void;
  dispose: () => void;
}

/**
 * Checks whether WebGL2 is supported in window without creating a test canvas.
 */
export function isWebGLAvailable(): boolean {
  return typeof window !== 'undefined' && 'WebGL2RenderingContext' in window;
}

/**
 * Initializes the Three.js WebGLRenderer, subtle studio PBR environment,
 * calibrated low-key natural-history specimen lighting rig, exponential fog,
 * and high-threshold post-processing stack (so only subterranean foxfire threads bloom,
 * and above-ground specimens never clip to white).
 */
export function createRendererAndPostStack(container: HTMLElement): RendererStack {
  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance',
  });

  const gl = renderer.getContext();
  const isSoftwareGl = (() => {
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  })();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // Low-key natural-history specimen exposure: prevents any cream surface from blowing out to white
  renderer.toneMappingExposure = 0.78;
  renderer.setPixelRatio(isSoftwareGl ? 0.85 : Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const baseBgColor = new THREE.Color('#080604');
  scene.background = baseBgColor.clone();
  scene.fog = new THREE.FogExp2('#080604', 0.082);

  // Subtle PBR environment reflection map (kept low at 0.14 above ground, boosted in Ch 5 product studio)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.14;
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
  camera.position.set(0, 1.92, 5.45);
  camera.lookAt(0, 1.85, 0);

  // 1. Soft warm key light from upper-left (natural forest shaft above ground, product studio key in Ch 5)
  const keyLight = new THREE.DirectionalLight('#f2cfa6', 1.25);
  keyLight.position.set(-3.8, 6.2, 3.8);
  keyLight.target.position.set(0, 1.6, 0);
  scene.add(keyLight.target);
  keyLight.castShadow = !isSoftwareGl;
  keyLight.shadow.mapSize.set(1024, 1024);
  const d = 4.5;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 20;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  // 2. Gentle cool-olive / dark-loam fill light (transitions to warm studio bounce in Ch 5)
  const hemiLight = new THREE.HemisphereLight('#697364', '#120d09', 0.28);
  scene.add(hemiLight);

  // 3. Subtle warm rim light for specimen edge separation
  const rimLight = new THREE.DirectionalLight('#e6cfb2', 0.28);
  rimLight.position.set(3.2, 3.8, -4.2);
  rimLight.target.position.set(0, 1.5, 0);
  scene.add(rimLight.target);
  scene.add(rimLight);

  // 4. Subterranean Foxfire PointLight (active only underground in Ch 3-4, fades completely to 0 in Ch 5 studio)
  const foxfirePointLight = new THREE.PointLight('#b8dc3c', 0, 14, 1.9);
  foxfirePointLight.position.set(0, -2.5, 0.8);
  scene.add(foxfirePointLight);

  // Post-processing stack on hardware GPUs
  let composer: EffectComposer | null = null;
  let bloomPass: UnrealBloomPass | null = null;
  let cinematicPass: ShaderPass | null = null;

  if (!isSoftwareGl) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // High threshold (0.92) so ONLY bioluminescent threads/pulses (> 1.0) bloom, never cream specimens
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width / 2, height / 2),
      0.0, // strength (0 above ground, ramps up only underground, 0 in Ch 5 studio)
      0.35, // radius
      0.92, // threshold
    );
    composer.addPass(bloomPass);

    const CinematicShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uInspectStrength: { value: 0 },
        uStudioLightness: { value: 0 },
        uVignetteDarkness: { value: 0.46 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uInspectStrength;
        uniform float uStudioLightness;
        uniform float uVignetteDarkness;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 centerOffset = vUv - vec2(0.5);
          float dist = length(centerOffset);

          // Shallow peripheral lens blur (intensifies slightly when Hold-to-Inspect is active or on peripheral studio sweep)
          float blurRadius = (smoothstep(0.22, 0.68, dist) * (0.0022 + uInspectStrength * 0.0032));
          vec4 col = texture2D(tDiffuse, vUv);
          if (blurRadius > 0.0002) {
            col += texture2D(tDiffuse, vUv + vec2(blurRadius, 0.0));
            col += texture2D(tDiffuse, vUv - vec2(blurRadius, 0.0));
            col += texture2D(tDiffuse, vUv + vec2(0.0, blurRadius));
            col += texture2D(tDiffuse, vUv - vec2(0.0, blurRadius));
            col *= 0.2;
          }

          // Dim peripheral background during Hold-to-Inspect in dark scenes, but keep the Ch 5 studio sweep light & airy
          float dimAmount = mix(0.52, 0.08, uStudioLightness);
          float inspectDim = 1.0 - smoothstep(0.20, 0.65, dist) * uInspectStrength * dimAmount;
          col.rgb *= inspectDim;

          // Subtle natural vignette (much lighter in the Ch 5 product studio so corners stay warm cream/sand)
          float effectiveVig = uVignetteDarkness * (1.0 - uStudioLightness * 0.78);
          float vig = smoothstep(0.84, 0.22, dist * (0.85 + effectiveVig * 0.35));
          col.rgb *= mix(1.0 - effectiveVig, 1.0, vig);

          // Fine organic film grain
          float grain = (hash(vUv * 420.0 + fract(uTime * 3.7)) - 0.5) * 0.018;
          col.rgb += grain;

          // Soft highlight roll-off so no pixel ever clips to harsh 1.0 pure white
          col.rgb = min(col.rgb, vec3(0.95));

          gl_FragColor = vec4(max(vec3(0.0), col.rgb), col.a);
        }
      `,
    };

    cinematicPass = new ShaderPass(CinematicShader);
    composer.addPass(cinematicPass);
  }

  const surfaceColor = new THREE.Color('#080604');
  const soilDescentBgColor = new THREE.Color('#17100a');
  const subterraneanColor = new THREE.Color('#050403');
  const studioSweepBgColor = new THREE.Color('#e6dccb');
  const studioLightColor = new THREE.Color('#fff7ea');
  const sunLightColor = new THREE.Color('#f7e7ce');
  const forestHemiSky = new THREE.Color('#697364');
  const forestHemiGround = new THREE.Color('#120d09');
  const studioHemiSky = new THREE.Color('#fffdf7');
  const studioHemiGround = new THREE.Color('#e2d6c3');
  const workColor = new THREE.Color();

  const setAtmosphereAtProgress = (
    undergroundFactor: number,
    networkGrowth: number,
    elapsedSec: number,
    trayReveal = 0,
    sunlight = 0.75,
    studioLightness?: number,
  ) => {
    const sunState = computeSunlightState(sunlight);
    const studioLit = studioLightness !== undefined ? studioLightness : trayReveal;
    const wideNetworkDim = Math.max(0, Math.min(1, (networkGrowth - 0.22) / 0.55));
    const isSoilDescentOrPocket =
      undergroundFactor * (1 - wideNetworkDim) * (1 - Math.max(trayReveal, studioLit));

    surfaceColor.setRGB(
      sunState.surfaceBgRgb[0],
      sunState.surfaceBgRgb[1],
      sunState.surfaceBgRgb[2],
    );
    workColor
      .copy(surfaceColor)
      .lerp(subterraneanColor, undergroundFactor)
      .lerp(soilDescentBgColor, isSoilDescentOrPocket * 0.85)
      .lerp(studioSweepBgColor, studioLit);

    (scene.background as THREE.Color).copy(workColor);
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(workColor);
      // Keep fog light during the close-up soil cross-section descent and very light in the Ch 5 studio
      const baseFog =
        0.072 -
        undergroundFactor * 0.036 -
        isSoilDescentOrPocket * 0.018;
      scene.fog.density = baseFog * (1 - studioLit) + 0.012 * studioLit;
    }

    // Dynamically balance toneMappingExposure:
    // - Above ground responds to sunlight slider
    // - Subterranean stays low-key
    // - Chapter 5 product studio lifts to 1.06 with boosted environment reflection so the cream tray & glass flacon look luminous without clipping
    const subterraneanExposure =
      0.82 * isSoilDescentOrPocket + 0.78 * (1 - isSoilDescentOrPocket);
    const baseExposure =
      sunState.toneMappingExposure * (1 - undergroundFactor) +
      subterraneanExposure * undergroundFactor;
    renderer.toneMappingExposure = baseExposure * (1 - studioLit) + 1.06 * studioLit;
    scene.environmentIntensity = 0.14 * (1 - studioLit) + 0.58 * studioLit;

    // Above ground (Ch 1, 2, 6): sun intensity and color temperature respond to the Sunlight / Time-of-Day slider.
    // Underground Ch 3 & Ch 4a: warm filtering daylight + specimen key light (1.32).
    // Underground Ch 4b wide network: key light dims so Foxfire glow is the primary light.
    // Chapter 5 (studioLit -> 1): soft large studio key light (2.05) from upper-left aimed at the tray at [0, -5.45, 0].
    const surfaceKey = 1.28 * sunState.sunIntensityMultiplier * (1 - undergroundFactor);
    const subterraneanSpecimenKey =
      undergroundFactor *
      (1 - wideNetworkDim * 0.84) *
      (1 - Math.max(trayReveal, studioLit)) *
      1.32;
    const trayStudioKey = Math.max(trayReveal * 1.15, studioLit * 2.05);
    keyLight.intensity = surfaceKey + subterraneanSpecimenKey + trayStudioKey;

    sunLightColor.setRGB(
      sunState.sunColorRgb[0],
      sunState.sunColorRgb[1],
      sunState.sunColorRgb[2],
    );
    keyLight.color
      .copy(sunLightColor)
      .lerp(studioLightColor, Math.max(undergroundFactor * 0.65, studioLit));

    const inTrayZone = Math.max(trayReveal, studioLit);
    const targetY =
      1.6 * (1 - undergroundFactor) +
      (-1.95 * (1 - inTrayZone) + -5.42 * inTrayZone) * undergroundFactor;

    // Arc the directional sun across the sky above ground; position soft upper-left studio key in Ch 5
    const sunX =
      sunState.sunOffset[0] * (1 - undergroundFactor) +
      (-2.8 * (1 - studioLit) + -3.6 * studioLit) * undergroundFactor;
    const sunY =
      (targetY + sunState.sunOffset[1]) * (1 - undergroundFactor) +
      (targetY + 4.4) * undergroundFactor;
    const sunZ =
      sunState.sunOffset[2] * (1 - undergroundFactor) +
      (4.8 * (1 - studioLit) + 4.2 * studioLit) * undergroundFactor;

    keyLight.position.set(sunX, sunY, sunZ);
    keyLight.target.position.set(0, targetY, 0);
    keyLight.target.updateMatrixWorld();

    const surfaceRimMult =
      sunState.rimIntensityMultiplier * (1 - undergroundFactor) +
      undergroundFactor;
    rimLight.intensity =
      0.36 * surfaceRimMult * (1 - undergroundFactor * 0.25) * (1 - studioLit) +
      0.78 * studioLit;
    rimLight.color.copy(sunLightColor).lerp(studioLightColor, 0.5 + undergroundFactor * 0.5);
    rimLight.position.set(3.2, targetY + 2.4, -3.2);
    rimLight.target.position.set(0, targetY, 0);
    rimLight.target.updateMatrixWorld();

    hemiLight.color.copy(forestHemiSky).lerp(studioHemiSky, studioLit);
    hemiLight.groundColor.copy(forestHemiGround).lerp(studioHemiGround, studioLit);
    const surfaceAmbientMult =
      sunState.ambientIntensityMultiplier * (1 - undergroundFactor) +
      undergroundFactor;
    const baseHemi =
      0.34 *
      surfaceAmbientMult *
      (1 + isSoilDescentOrPocket * 0.55 - undergroundFactor * 0.2);
    hemiLight.intensity = baseHemi * (1 - studioLit) + 1.15 * studioLit;

    // Foxfire point light activates in late Ch 3 / Ch 4, and fades out completely (to 0) once the Ch 5 studio is lit
    foxfirePointLight.position.set(0, -2.15, 2.2);
    const earlyPocketFoxfire = Math.min(1, networkGrowth / 0.14) * 0.38;
    const studioFoxfireCutoff = Math.max(0, 1 - Math.max(trayReveal, studioLit) * 1.25);
    foxfirePointLight.intensity =
      undergroundFactor *
      Math.max(earlyPocketFoxfire, wideNetworkDim * 0.48) *
      studioFoxfireCutoff;

    if (bloomPass) {
      // Bloom is OFF above ground and OFF in the lit Ch 5 studio; active only underground for threads/pulses
      bloomPass.strength = undergroundFactor * 0.42 * studioFoxfireCutoff;
    }
    if (cinematicPass) {
      cinematicPass.uniforms.uTime.value = elapsedSec;
      cinematicPass.uniforms.uStudioLightness.value = studioLit;
    }
  };

  const setInspectVisualState = (inspectStrength: number) => {
    if (cinematicPass) {
      cinematicPass.uniforms.uInspectStrength.value = inspectStrength;
    }
  };

  const resize = (w: number, h: number) => {
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (composer) {
      composer.setSize(w, h);
    }
  };

  const renderFrame = () => {
    if (isSoftwareGl || !composer) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }
  };

  const dispose = () => {
    renderer.dispose();
  };

  return {
    renderer,
    scene,
    camera,
    composer,
    bloomPass,
    cinematicPass,
    isSoftwareGl,
    lights: {
      keyLight,
      hemiLight,
      rimLight,
      foxfirePointLight,
    },
    setInspectVisualState,
    setAtmosphereAtProgress,
    resize,
    renderFrame,
    dispose,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/scrollTimeline.ts">
<![CDATA[import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  CHAPTERS,
  clamp01,
  getNearestChapterSnapProgress,
  getNextChapterProgress,
} from '../logic/chapters';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollController {
  getProgress: () => number;
  scrollToProgress: (targetProgress: number, immediate?: boolean) => void;
  stepChapter: (direction: 1 | -1) => void;
  setScrollPaused: (paused: boolean) => void;
  tickLenis: (timeMs: number) => void;
  dispose: () => void;
}

/**
 * Sets up the single master GSAP ScrollTrigger timeline driven by an invisible
 * tall scroll track from progress 0 -> 1, paired with Lenis smooth scroll,
 * automatic chapter rest-point snapping when scrolling stops, and keyboard
 * stepping (ArrowUp/Down/Left/Right, Space, Shift+Space).
 */
export function createScrollController(params: {
  scrollTrackElement: HTMLElement;
  onProgressUpdate: (progress: number) => void;
  isInspectLocked: () => boolean;
}): ScrollController {
  let masterProgress = 0;
  let isPaused = false;
  let snapTimeoutId: number | null = null;
  let isProgrammaticScroll = false;

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Master GSAP timeline scrubbed 0 -> 1 by the invisible scroll track
  const proxyState = { progress: 0 };
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: params.scrollTrackElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        masterProgress = clamp01(self.progress);
        params.onProgressUpdate(masterProgress);

        // Schedule smooth snap to nearest chapter rest point when user stops scrolling
        if (!isProgrammaticScroll && !isPaused && !params.isInspectLocked()) {
          if (snapTimeoutId !== null) {
            window.clearTimeout(snapTimeoutId);
          }
          snapTimeoutId = window.setTimeout(() => {
            if (isPaused || params.isInspectLocked()) return;
            const snapTarget = getNearestChapterSnapProgress(masterProgress);
            if (Math.abs(snapTarget - masterProgress) > 0.008) {
              scrollToProgress(snapTarget, false);
            }
          }, 900);
        }
      },
    },
  });

  masterTimeline.to(proxyState, {
    progress: 1,
    duration: 1,
    ease: 'none',
  });

  const getMaxScrollPx = (): number => {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  const scrollToProgress = (targetProgress: number, immediate = false) => {
    const clamped = clamp01(targetProgress);
    const targetY = clamped * getMaxScrollPx();
    isProgrammaticScroll = true;
    if (snapTimeoutId !== null) {
      window.clearTimeout(snapTimeoutId);
      snapTimeoutId = null;
    }

    lenis.scrollTo(targetY, {
      immediate,
      duration: immediate ? 0 : 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      onComplete: () => {
        isProgrammaticScroll = false;
      },
    });

    // Also update window scroll for deterministic headless/fallback environments
    if (immediate) {
      window.scrollTo(0, targetY);
      ScrollTrigger.update();
      masterProgress = clamped;
      params.onProgressUpdate(masterProgress);
      window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 150);
    }
  };

  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__loamScrollTo = (
      p: number,
    ) => scrollToProgress(p, true);
  }

  const stepChapter = (direction: 1 | -1) => {
    if (isPaused || params.isInspectLocked()) return;
    const nextProgress = getNextChapterProgress(masterProgress, direction);
    scrollToProgress(nextProgress, false);
  };

  const setScrollPaused = (paused: boolean) => {
    isPaused = paused;
    if (paused) {
      lenis.stop();
      if (snapTimeoutId !== null) {
        window.clearTimeout(snapTimeoutId);
        snapTimeoutId = null;
      }
    } else {
      lenis.start();
    }
  };

  // Keyboard navigation: Arrow keys / Space / Shift+Space step between chapters
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isPaused || params.isInspectLocked()) return;

    // Do not hijack keys when user is interacting with form fields or buttons
    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      stepChapter(1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      stepChapter(-1);
    } else if (e.key === ' ' || e.code === 'Space') {
      // Allow Enter/Space on focused buttons to trigger their click handler naturally
      if (activeEl && activeEl.tagName === 'BUTTON') return;
      e.preventDefault();
      stepChapter(e.shiftKey ? -1 : 1);
    } else if (e.key >= '1' && e.key <= '6') {
      const idx = Number(e.key) - 1;
      if (CHAPTERS[idx]) {
        e.preventDefault();
        scrollToProgress(CHAPTERS[idx].restProgress, false);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  const tickLenis = (timeMs: number) => {
    if (!isPaused) {
      lenis.raf(timeMs);
    }
  };

  const dispose = () => {
    if (snapTimeoutId !== null) {
      window.clearTimeout(snapTimeoutId);
    }
    window.removeEventListener('keydown', handleKeyDown);
    masterTimeline.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    lenis.destroy();
  };

  return {
    getProgress: () => masterProgress,
    scrollToProgress,
    stepChapter,
    setScrollPaused,
    tickLenis,
    dispose,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/soilDescent.ts">
<![CDATA[import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { ProceduralTextureSet } from './textures';
import { createSeededRandom } from '../logic/networkGenerator';
import { clamp01, smoothstep } from '../logic/chapters';

export interface BuiltSoilDescent {
  group: THREE.Group;
  updateDescent: (params: {
    progress: number;
    undergroundFactor: number;
    networkGrowth: number;
    elapsedSec: number;
    sunColorRgb: readonly [number, number, number];
    sunlight: number;
  }) => void;
}

/**
 * Builds the Chapter 02 -> 04 "Ant-Farm Glass" Soil Cross-Section Descent (progress ~0.26 -> 0.54):
 * 1. Breaking Ground (0.27–0.31): Overhanging mossy turf lip, overlapping leaf edges, and the mushroom's
 *    soil-clotted bulbous base in silhouette against warm above-ground light at y = 0, with the cut
 *    earth face immediately below it (never fading to black).
 * 2. Continuous Sculpted Soil Cross-Section Wall (y = 0.00 down to y = -4.40) with a custom procedural GLSL
 *    shader featuring irregular noise-blended soil horizons, crumbly 3D normal relief, moist organic specular,
 *    filtering daylight from above, and bioluminescent foxfire cracks near the bottom:
 *    - Leaf litter (y = 0.00..-0.42): Flat/curled overlapping decayed leaves in browns & ochres with broken
 *      edges, visible veins, and fine creamy-white mycelium threads clinging to their undersides.
 *    - Humus (y = -0.42..-1.12): Dark, crumbly, moist organic soil packed with hundreds of hair-fine pale
 *      roots and root hairs, plus a small humus burrow where a tiny articulated woodlouse crawls.
 *    - Topsoil (y = -1.12..-1.92): Rich brown soil studded with embedded pebbles and small stones, crossed
 *      diagonally by a thick, tapering, branching tree root.
 *    - Subsoil (y = -1.92..-4.40): Redder, denser clay with larger rounded rocks partly embedded in the face
 *      and faint foxfire green-gold threads igniting in cracks between stones and along roots (0.41–0.49).
 * 3. Earthen Clump Pocket at Chapter 04a ([0, -2.55, 0]): Sculpted concave soil and stone cradle behind and
 *    beneath the mycelium clump so it rests naturally in earth lit by its own faint glow and filtering daylight.
 * 4. Foreground Parallax Depth: Fine soil grains, small crumbs, hanging root tips, out-of-focus bokeh particles,
 *    and fine dust drifting through the narrow earthen gap faster than the wall behind them.
 */
export function buildSoilDescentCrossSection(
  textures: ProceduralTextureSet,
  seed = 3091,
): BuiltSoilDescent {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'AntFarmSoilCrossSection';

  const dummy = new THREE.Object3D();
  const itemColor = new THREE.Color();

  // Helper: deterministic 3D spatial relief for the cut soil wall at (x, y)
  const getWallZAt = (x: number, y: number): number => {
    // Base plane sits at z = -0.16, curving gently forward at lateral edges like a narrow trench
    const lateralCurve = Math.min(0.82, Math.pow(Math.abs(x) * 0.27, 2.0) * 0.45);

    // Recess slightly right behind the hero mushroom bulb at (0, 0, 0) so the bulb sits cleanly on the cut rim
    const dxBulb = x / 0.52;
    const dyBulb = y / 0.28;
    const bulbNotch =
      dxBulb * dxBulb + dyBulb * dyBulb < 1.2
        ? -0.12 * Math.exp(-(dxBulb * dxBulb + dyBulb * dyBulb) * 1.6)
        : 0;

    // Concave earthen pocket carved around the Chapter 4a mycelium clump at (0, -2.55, 0)
    // Clump radius is ~0.48, so the back of the pocket recesses to z = -0.54 and cradles underneath at y = -2.96
    const dxClump = x / 0.92;
    const dyClump = (y - -2.55) / 0.58;
    const distClumpSq = dxClump * dxClump + dyClump * dyClump;
    const pocketRecess = distClumpSq < 1.4 ? -0.40 * Math.exp(-distClumpSq * 1.6) : 0;

    // Lower earthen shelf beneath the clump at y = -2.98.. -3.35 juts forward to z = +0.22 so the clump sits on soil
    const dxLip = x / 0.95;
    const dyLip = (y - -3.02) / 0.28;
    const lipSupport =
      dxLip * dxLip + dyLip * dyLip < 1.3
        ? 0.32 * Math.exp(-(dxLip * dxLip + dyLip * dyLip) * 1.6)
        : 0;

    // Small humus burrow / tunnel at (x = +0.38, y = -0.78) for the tiny woodlouse
    const dxTunnel = (x - 0.38) / 0.28;
    const dyTunnel = (y - -0.78) / 0.12;
    const tunnelRecess =
      dxTunnel * dxTunnel + dyTunnel * dyTunnel < 1.2
        ? -0.22 * Math.exp(-(dxTunnel * dxTunnel + dyTunnel * dyTunnel) * 2.0)
        : 0;

    // Multi-octave organic soil crags & ledges
    const crag1 = Math.sin(x * 1.9 + y * 2.3) * Math.cos(x * 1.3 - y * 3.1) * 0.08;
    const crag2 = Math.sin(x * 4.7 - y * 5.2 + 1.4) * 0.035;
    const crag3 = Math.cos(x * 9.5 + y * 8.8) * 0.015;

    return (
      -0.16 +
      lateralCurve +
      bulbNotch +
      pocketRecess +
      lipSupport +
      tunnelRecess +
      crag1 +
      crag2 +
      crag3
    );
  };

  // ============================================================================
  // 1. CONTINUOUS SCULPTED 3D SOIL CROSS-SECTION WALL (y = 0.00 down to -4.40)
  // ============================================================================
  const wallWidth = 8.6;
  const wallHeight = 4.40;
  const wallGeo = new THREE.PlaneGeometry(wallWidth, wallHeight, 120, 112);
  // Top edge is right at the forest floor surface line y = 0.00, bottom is at y = -4.40
  wallGeo.translate(0, -wallHeight * 0.5, 0);

  const wPos = wallGeo.attributes.position;
  for (let i = 0; i < wPos.count; i++) {
    const vx = wPos.getX(i);
    const vy = wPos.getY(i);
    wPos.setZ(i, getWallZAt(vx, vy));
  }
  wallGeo.computeVertexNormals();

  const wallUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uOpacity: { value: 1 },
    uFoxfireGlow: { value: 0 },
    uSunColor: { value: new THREE.Color('#f7e7ce') },
    uSunIntensity: { value: 1.0 },
  };

  const wallMat = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: wallUniforms,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewPos;

      void main() {
        vUv = uv;
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vec4 mvPos = viewMatrix * worldPosition;
        vViewPos = -mvPos.xyz;
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uProgress;
      uniform float uOpacity;
      uniform float uFoxfireGlow;
      uniform vec3 uSunColor;
      uniform float uSunIntensity;

      varying vec2 vUv;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vViewPos;

      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; i++) {
          v += a * noise2(p);
          p = rot * p * 2.07 + vec2(13.1, 7.7);
          a *= 0.5;
        }
        return v;
      }

      // Ridged noise for narrow stone cracks & root fissures
      float ridgedCracks(vec2 p) {
        float n1 = abs(noise2(p * 3.6) - 0.5) * 2.0;
        float n2 = abs(noise2(p * 7.8 + vec2(4.2, -3.1)) - 0.5) * 2.0;
        float crack = 1.0 - smoothstep(0.0, 0.095, n1 * 0.65 + n2 * 0.35);
        return crack;
      }

      void main() {
        vec2 p = vWorldPos.xy;

        // Multi-scale soil crumb texture & normal perturbation
        float macroFbm = fbm(p * 1.65);
        float medCrumb = fbm(p * 6.5 + vec2(macroFbm * 1.4));
        float fineGrain = noise2(p * 28.0) * 0.55 + noise2(p * 64.0) * 0.45;
        float crumbHeight = macroFbm * 0.45 + medCrumb * 0.38 + fineGrain * 0.17;

        vec3 dPdx = dFdx(vWorldPos);
        vec3 dPdy = dFdy(vWorldPos);
        float dHdx = dFdx(crumbHeight);
        float dHdy = dFdy(crumbHeight);
        vec3 perturbedNormal = normalize(
          vWorldNormal - (dPdx * dHdx + dPdy * dHdy) * 4.8
        );

        // Irregular, noise-warped horizon depth coordinate (no straight bands)
        float horizonWarp = (macroFbm - 0.5) * 0.25 + (medCrumb - 0.5) * 0.09;
        float wy = vWorldPos.y + horizonWarp;

        // Layer 1: Leaf Litter & O-Horizon (y = 0.00 .. -0.42)
        float leafStriation = noise2(vec2(p.x * 5.0, p.y * 32.0 + macroFbm * 4.0));
        vec3 litterDark = vec3(0.24, 0.15, 0.08);
        vec3 litterOchre = vec3(0.55, 0.35, 0.15);
        vec3 litterColor = mix(litterDark, litterOchre, leafStriation * 0.75 + fineGrain * 0.25);
        float whiteHyphae = smoothstep(0.74, 0.91, fbm(vec2(p.x * 9.0, p.y * 14.0))) * smoothstep(-0.46, -0.04, wy);
        litterColor = mix(litterColor, vec3(0.88, 0.84, 0.75), whiteHyphae * 0.58);

        // Layer 2: Humus (y = -0.42 .. -1.12)
        // Dark, crumbly, moist organic soil
        vec3 humusDark = vec3(0.15, 0.10, 0.068);
        vec3 humusRich = vec3(0.27, 0.185, 0.12);
        vec3 humusPaleFlecks = vec3(0.45, 0.35, 0.24);
        vec3 humusColor = mix(humusDark, humusRich, medCrumb);
        humusColor = mix(humusColor, humusPaleFlecks, smoothstep(0.74, 0.90, fineGrain) * 0.32);

        // Layer 3: Topsoil (y = -1.12 .. -1.92)
        // Brown soil with mineral sand/pebble mottling
        vec3 topsoilBase = vec3(0.32, 0.21, 0.13);
        vec3 topsoilWarm = vec3(0.45, 0.31, 0.19);
        vec3 topsoilPebble = vec3(0.54, 0.43, 0.33);
        vec3 topsoilColor = mix(topsoilBase, topsoilWarm, macroFbm * 0.6 + medCrumb * 0.4);
        topsoilColor = mix(topsoilColor, topsoilPebble, smoothstep(0.72, 0.88, fineGrain) * 0.38);

        // Layer 4: Subsoil (y = -1.92 .. -4.40)
        // Redder, denser iron-rich terracotta clay
        vec3 clayDeep = vec3(0.38, 0.18, 0.11);
        vec3 clayRed = vec3(0.56, 0.27, 0.16);
        vec3 clayOchre = vec3(0.64, 0.36, 0.22);
        vec3 subsoilColor = mix(clayDeep, clayRed, medCrumb * 0.7 + macroFbm * 0.3);
        subsoilColor = mix(subsoilColor, clayOchre, smoothstep(0.66, 0.86, fineGrain) * 0.35);

        // Irregular blended transitions between the 4 layers
        float tHumus = smoothstep(-0.30, -0.52, wy);
        float tTopsoil = smoothstep(-0.98, -1.26, wy);
        float tSubsoil = smoothstep(-1.76, -2.08, wy);

        vec3 soilAlbedo = mix(litterColor, humusColor, tHumus);
        soilAlbedo = mix(soilAlbedo, topsoilColor, tTopsoil);
        soilAlbedo = mix(soilAlbedo, subsoilColor, tSubsoil);

        // Darken recessed crevices / woodlouse tunnel & clod ambient occlusion
        float cavityAo = smoothstep(-0.44, 0.05, vWorldPos.z);
        float crumbAo = 0.68 + 0.32 * smoothstep(0.22, 0.75, crumbHeight);
        soilAlbedo *= (0.72 + 0.28 * cavityAo) * crumbAo;

        // ======================================================================
        // LIGHTING: Warm daylight filtering from above -> cooler dim light at depth
        //           + Foxfire green-gold cracks & pocket glow near bottom (0.41..0.52)
        // ======================================================================
        vec3 viewDir = normalize(vViewPos);
        vec3 topLightDir = normalize(vec3(-0.28, 0.76, 0.58));
        float ndotl = max(0.0, dot(perturbedNormal, topLightDir));

        // Depth attenuation from y = 0 down to y = -3.6 (dims & shifts cooler with depth, never goes to black)
        float depthMeters = max(0.0, -vWorldPos.y);
        float daylightAtten = exp(-depthMeters * 0.38);
        vec3 warmDaylight = mix(vec3(0.96, 0.84, 0.66), uSunColor, 0.65) * uSunIntensity;
        vec3 coolFilteredLight = vec3(0.48, 0.52, 0.50);
        vec3 depthLightColor = mix(coolFilteredLight, warmDaylight, daylightAtten);

        float diffuseStrength = (0.40 + 0.66 * ndotl) * (0.46 + 0.64 * daylightAtten);
        vec3 litColor = soilAlbedo * mix(vec3(1.0), depthLightColor * 1.32, 0.75) * diffuseStrength * 1.42;

        // Moist specular micro-highlights on damp humus & clay clods
        float moistureMask = mix(0.65, 1.0, tHumus * (1.0 - tTopsoil * 0.4));
        vec3 halfVec = normalize(topLightDir + viewDir);
        float spec = pow(max(0.0, dot(perturbedNormal, halfVec)), 26.0) * smoothstep(0.55, 0.88, fineGrain);
        litColor += depthLightColor * spec * moistureMask * 0.24;

        // Warm surface rim glow right at the Breaking Ground horizon (y = -0.14..0.00)
        float surfaceRim = smoothstep(-0.15, 0.0, vWorldPos.y);
        litColor += warmDaylight * surfaceRim * 0.32;

        // Foxfire green-gold cracks between subsoil stones & around the clump pocket (y = -1.50..-3.35)
        float subsoilZone = smoothstep(-1.42, -1.90, wy) * (1.0 - smoothstep(-3.15, -3.65, wy));
        float crackPattern = ridgedCracks(p * 1.35 + vec2(0.0, macroFbm * 0.4));
        float pulseWave = 0.65 + 0.35 * sin(uTime * 2.2 - vWorldPos.y * 3.5 + p.x * 2.0);
        vec3 foxfireColor = vec3(0.72, 0.88, 0.24);
        float crackGlow = crackPattern * subsoilZone * uFoxfireGlow * pulseWave;
        litColor += foxfireColor * crackGlow * 0.88;

        // Soft Foxfire + warm daylight bounce inside the Chapter 4a clump pocket at (0, -2.55, 0)
        float distToPocket = length((vWorldPos.xy - vec2(0.0, -2.55)) * vec2(0.82, 1.05));
        float pocketBounce = exp(-distToPocket * distToPocket * 1.3);
        vec3 pocketLight = mix(vec3(0.60, 0.52, 0.40), foxfireColor, 0.52) * (0.35 + 0.55 * uFoxfireGlow);
        litColor += soilAlbedo * pocketLight * pocketBounce * 1.65;

        // Lateral & deep bottom fade (well below the 4a camera frustum at y = -3.85..-4.38)
        float lateralFade = 1.0 - smoothstep(3.2, 4.25, abs(vWorldPos.x));
        float bottomFade = 1.0 - smoothstep(-3.85, -4.38, vWorldPos.y);

        // Enforce anti-black floor and anti-white ceiling during descent
        vec3 safeFloor = soilAlbedo * 0.32;
        litColor = clamp(max(litColor, safeFloor), vec3(0.045, 0.032, 0.022), vec3(0.88));

        gl_FragColor = vec4(litColor, uOpacity * lateralFade * bottomFade);
      }
    `,
  });

  const wallMesh = new THREE.Mesh(wallGeo, wallMat);
  wallMesh.receiveShadow = true;
  group.add(wallMesh);

  // ============================================================================
  // 2. BREAKING GROUND SURFACE SILHOUETTE BACKLIGHT & OVERHANGING TURF LIP (y = 0)
  // ============================================================================
  // Warm above-ground horizon glow plane behind the mushroom base so at 0.27-0.31 the ground
  // surface line, moss tufts, leaf edges, and mushroom bulb read in crisp silhouette
  const horizonGlowGeo = new THREE.PlaneGeometry(8.2, 1.65);
  horizonGlowGeo.translate(0, 0.62, -0.78);
  const horizonGlowMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uOpacity: { value: 0.0 },
      uSunColor: { value: new THREE.Color('#f5d6a7') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uSunColor;
      varying vec2 vUv;
      void main() {
        float horiz = exp(-pow((vUv.x - 0.5) * 2.1, 2.0));
        float vert = smoothstep(0.0, 0.14, vUv.y) * exp(-vUv.y * 2.2);
        vec3 warmMist = mix(vec3(0.88, 0.68, 0.42), uSunColor, 0.65);
        gl_FragColor = vec4(warmMist, horiz * vert * uOpacity * 0.68);
      }
    `,
  });
  const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
  group.add(horizonGlowMesh);

  // Dense silhouette moss tufts right along the cut surface edge (y = 0.0, z = -0.05..+0.25)
  const rimMossCount = 460;
  const rimMossGeo = new THREE.ConeGeometry(0.016, 0.13, 4);
  rimMossGeo.translate(0, 0.06, 0);
  const rimMossMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.9,
    metalness: 0.0,
  });
  const rimMossInst = new THREE.InstancedMesh(rimMossGeo, rimMossMat, rimMossCount);
  for (let i = 0; i < rimMossCount; i++) {
    const mx = (rand() - 0.5) * 4.4;
    const mz = getWallZAt(mx, 0) + 0.02 + rand() * 0.26;
    const my = -0.015 + rand() * 0.03;
    dummy.position.set(mx, my, mz);
    dummy.rotation.set((rand() - 0.5) * 0.45, rand() * Math.PI * 2, (rand() - 0.5) * 0.45);
    const s = 0.8 + rand() * 1.05;
    dummy.scale.set(s, s * (0.85 + rand() * 0.65), s);
    dummy.updateMatrix();
    rimMossInst.setMatrixAt(i, dummy.matrix);
    itemColor.setHSL(0.24 + (rand() - 0.5) * 0.04, 0.48, 0.14 + rand() * 0.10);
    rimMossInst.setColorAt(i, itemColor);
  }
  rimMossInst.instanceMatrix.needsUpdate = true;
  if (rimMossInst.instanceColor) rimMossInst.instanceColor.needsUpdate = true;
  rimMossInst.computeBoundingSphere();
  group.add(rimMossInst);

  // ============================================================================
  // 3. LAYER 1: LEAF LITTER (y = +0.02 .. -0.44) + WHITE MYCELIUM ON UNDERSIDES
  // ============================================================================
  const decayedLeafGeo = new THREE.PlaneGeometry(0.38, 0.24, 7, 5);
  decayedLeafGeo.rotateX(-Math.PI / 2);
  const dlPos = decayedLeafGeo.attributes.position;
  for (let i = 0; i < dlPos.count; i++) {
    const lx = dlPos.getX(i);
    const lz = dlPos.getZ(i);
    const u = clamp01((lx + 0.19) / 0.38);
    // Irregular broken/notched leaf margin
    const notch = 1.0 - 0.18 * Math.pow(Math.sin(u * Math.PI * 6.0), 4.0);
    const widthEnv = Math.sin(Math.pow(u, 0.82) * Math.PI) * notch;
    const shapedZ = lz * Math.max(0.08, widthEnv);
    const curlY =
      Math.pow(shapedZ / 0.12, 2.0) * 0.036 + Math.sin(u * Math.PI * 2.0) * 0.016;
    dlPos.setXYZ(i, lx, curlY, shapedZ);
  }
  decayedLeafGeo.computeVertexNormals();

  const litterLeafCount = 115;
  const litterLeafMat = new THREE.MeshStandardMaterial({
    map: textures.leafColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.022,
    color: new THREE.Color('#ffffff'),
    roughness: 0.78,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const litterLeafInst = new THREE.InstancedMesh(
    decayedLeafGeo,
    litterLeafMat,
    litterLeafCount,
  );

  const leafHyphaePositions: number[] = [];

  for (let i = 0; i < litterLeafCount; i++) {
    const lx = (rand() - 0.5) * 4.2;
    const ly = 0.01 - Math.pow(rand(), 0.85) * 0.42;
    const wallZ = getWallZAt(lx, ly);
    const lz = wallZ + 0.03 + rand() * 0.34;

    const rotX = (rand() - 0.5) * 0.55 + 0.22; // Tilted slightly so undersides & broken edges read clearly
    const rotY = rand() * Math.PI * 2;
    const rotZ = (rand() - 0.5) * 0.48;
    dummy.position.set(lx, ly, lz);
    dummy.rotation.set(rotX, rotY, rotZ);
    const scale = 0.72 + rand() * 0.95;
    dummy.scale.set(scale, scale, scale * (0.82 + rand() * 0.35));
    dummy.updateMatrix();
    litterLeafInst.setMatrixAt(i, dummy.matrix);

    // Rich browns, russets, and warm golden ochres
    itemColor.setHSL(
      0.068 + rand() * 0.045,
      0.52 + rand() * 0.22,
      0.32 + rand() * 0.22,
    );
    litterLeafInst.setColorAt(i, itemColor);

    // 3-5 branching white mycelium threads clinging to the underside of each leaf
    const threadBranches = 3 + Math.floor(rand() * 3);
    for (let b = 0; b < threadBranches; b++) {
      let hx = lx + (rand() - 0.5) * 0.14 * scale;
      let hy = ly - 0.008 - rand() * 0.016;
      let hz = lz + (rand() - 0.5) * 0.10 * scale;
      const segs = 4;
      for (let s = 0; s < segs; s++) {
        const nx = hx + (rand() - 0.5) * 0.075 * scale;
        const ny = hy - rand() * 0.024;
        const nz = hz + (rand() - 0.5) * 0.065 * scale;
        leafHyphaePositions.push(hx, hy, hz, nx, ny, nz);
        hx = nx;
        hy = ny;
        hz = nz;
      }
    }
  }
  litterLeafInst.instanceMatrix.needsUpdate = true;
  if (litterLeafInst.instanceColor) litterLeafInst.instanceColor.needsUpdate = true;
  litterLeafInst.computeBoundingSphere();
  group.add(litterLeafInst);

  const leafHyphaeGeo = new THREE.BufferGeometry();
  leafHyphaeGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(leafHyphaePositions, 3),
  );
  const leafHyphaeMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#eee6d5'),
    transparent: true,
    opacity: 0.78,
  });
  const leafHyphaeLines = new THREE.LineSegments(leafHyphaeGeo, leafHyphaeMat);
  group.add(leafHyphaeLines);

  // ============================================================================
  // 4. LAYER 2: HUMUS (y = -0.40 .. -1.12) — PALE ROOTLETS, ROOT HAIRS & WOODLOUSE
  // ============================================================================
  const fineRootPositions: number[] = [];
  const rootHairPositions: number[] = [];
  const humusRootTubeGeos: THREE.BufferGeometry[] = [];

  for (let r = 0; r < 38; r++) {
    const startX = (rand() - 0.5) * 3.8;
    const startY = -0.22 - rand() * 0.52;
    const startZ = getWallZAt(startX, startY) + 0.04 + rand() * 0.20;
    const pts: THREE.Vector3[] = [];
    let cx = startX;
    let cy = startY;
    let cz = startZ;
    const steps = 6;
    for (let s = 0; s <= steps; s++) {
      pts.push(new THREE.Vector3(cx, cy, cz));
      cx += (rand() - 0.5) * 0.14;
      cy -= 0.08 + rand() * 0.07;
      cz = getWallZAt(cx, cy) + 0.03 + rand() * 0.16;
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.006 + rand() * 0.0045, 5, false);
    humusRootTubeGeos.push(tubeGeo);
  }

  const mergedHumusRootsGeo = mergeGeometries(humusRootTubeGeos, false);
  for (const g of humusRootTubeGeos) g.dispose();
  const paleRootMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c4b08f'),
    roughness: 0.84,
    metalness: 0.02,
  });
  const humusRootsMesh = new THREE.Mesh(mergedHumusRootsGeo, paleRootMat);
  group.add(humusRootsMesh);

  for (let i = 0; i < 360; i++) {
    let rx = (rand() - 0.5) * 4.0;
    let ry = -0.25 - rand() * 0.92;
    let rz = getWallZAt(rx, ry) + 0.02 + rand() * 0.24;
    const segs = 5;
    for (let s = 0; s < segs; s++) {
      const nx = rx + (rand() - 0.5) * 0.09;
      const ny = ry - (0.04 + rand() * 0.055);
      const nz = rz + (rand() - 0.5) * 0.06;
      fineRootPositions.push(rx, ry, rz, nx, ny, nz);

      if (rand() > 0.25) {
        const hx = nx + (rand() - 0.5) * 0.055;
        const hy = ny - (rand() - 0.5) * 0.03;
        const hz = nz + (rand() - 0.5) * 0.045;
        rootHairPositions.push(nx, ny, nz, hx, hy, hz);
      }
      rx = nx;
      ry = ny;
      rz = nz;
    }
  }

  const fineRootGeo = new THREE.BufferGeometry();
  fineRootGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(fineRootPositions, 3),
  );
  const fineRootMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#ccb898'),
    transparent: true,
    opacity: 0.70,
  });
  const fineRootLines = new THREE.LineSegments(fineRootGeo, fineRootMat);
  group.add(fineRootLines);

  const rootHairGeo = new THREE.BufferGeometry();
  rootHairGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(rootHairPositions, 3),
  );
  const rootHairMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#dfd3bd'),
    transparent: true,
    opacity: 0.48,
  });
  const rootHairLines = new THREE.LineSegments(rootHairGeo, rootHairMat);
  group.add(rootHairLines);

  // Tiny naturalistic articulated woodlouse (Oniscus asellus) crossing the humus burrow at y = -0.78
  const woodlouseGroup = new THREE.Group();
  woodlouseGroup.name = 'HumusWoodlouse';
  const carapaceMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5c5046'),
    roughness: 0.48,
    metalness: 0.08,
  });
  const segmentGeos: THREE.BufferGeometry[] = [];
  for (let seg = 0; seg < 7; seg++) {
    const u = (seg - 3) / 3.5;
    const segW = 0.024 * Math.sqrt(Math.max(0.15, 1 - u * u * 0.65));
    const segGeo = new THREE.SphereGeometry(segW, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.58);
    segGeo.scale(0.55, 0.42, 1.0);
    segGeo.translate(seg * 0.009 - 0.027, 0, 0);
    segmentGeos.push(segGeo);
  }
  const antGeo1 = new THREE.CylinderGeometry(0.0009, 0.0014, 0.020, 4);
  antGeo1.rotateZ(-Math.PI * 0.35);
  antGeo1.translate(0.038, 0.003, 0.007);
  const antGeo2 = new THREE.CylinderGeometry(0.0009, 0.0014, 0.020, 4);
  antGeo2.rotateZ(-Math.PI * 0.35);
  antGeo2.translate(0.038, 0.003, -0.007);
  segmentGeos.push(antGeo1, antGeo2);

  const mergedWoodlouseGeo = mergeGeometries(segmentGeos, false);
  for (const g of segmentGeos) g.dispose();
  const woodlouseMesh = new THREE.Mesh(mergedWoodlouseGeo, carapaceMat);
  woodlouseGroup.add(woodlouseMesh);
  woodlouseGroup.position.set(0.38, -0.80, getWallZAt(0.38, -0.80) + 0.04);
  group.add(woodlouseGroup);

  // ============================================================================
  // 5. LAYER 3: TOPSOIL (y = -1.08 .. -1.92) — THICK DIAGONAL BRANCHING TREE ROOT & PEBBLES
  // ============================================================================
  const diagonalRootGeos: THREE.BufferGeometry[] = [];

  const buildTaperedRootCurve = (
    waypoints: THREE.Vector3[],
    rStart: number,
    rEnd: number,
    tubularSegs: number,
    radialSegs: number,
  ) => {
    const curve = new THREE.CatmullRomCurve3(waypoints);
    const tube = new THREE.TubeGeometry(curve, tubularSegs, 1.0, radialSegs, false);
    const posAttr = tube.attributes.position;
    const uvAttr = tube.attributes.uv;
    const centerPt = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      const t = clamp01(uvAttr.getX(i));
      const angle = uvAttr.getY(i) * Math.PI * 2;
      curve.getPointAt(t, centerPt);
      const radius = rStart * Math.pow(1 - t, 0.78) + rEnd * t;
      const ridge =
        1.0 +
        0.14 * Math.sin(angle * 5.0 + t * 18.0) +
        0.07 * Math.cos(angle * 3.0 - t * 9.0);
      const offsetX = (posAttr.getX(i) - centerPt.x) * radius * ridge;
      const offsetY = (posAttr.getY(i) - centerPt.y) * radius * ridge;
      const offsetZ = (posAttr.getZ(i) - centerPt.z) * radius * ridge;
      posAttr.setXYZ(
        i,
        centerPt.x + offsetX,
        centerPt.y + offsetY,
        centerPt.z + offsetZ,
      );
    }
    tube.computeVertexNormals();
    diagonalRootGeos.push(tube);
  };

  // Main diagonal trunk root crossing the topsoil frame (upper-left [-2.15, -1.02] -> center [0.0, -1.42] -> lower-right [2.15, -1.88])
  buildTaperedRootCurve(
    [
      new THREE.Vector3(-2.15, -0.98, 0.14),
      new THREE.Vector3(-1.18, -1.20, 0.20),
      new THREE.Vector3(-0.25, -1.38, 0.19),
      new THREE.Vector3(0.55, -1.56, 0.16),
      new THREE.Vector3(1.38, -1.74, 0.12),
      new THREE.Vector3(2.20, -1.94, 0.04),
    ],
    0.13,
    0.026,
    48,
    12,
  );

  // Secondary branching forks off the main diagonal tree root
  buildTaperedRootCurve(
    [
      new THREE.Vector3(-0.92, -1.24, 0.18),
      new THREE.Vector3(-0.58, -1.52, 0.20),
      new THREE.Vector3(-0.36, -1.82, 0.14),
      new THREE.Vector3(-0.20, -2.10, 0.05),
    ],
    0.065,
    0.008,
    24,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(-0.10, -1.40, 0.18),
      new THREE.Vector3(0.32, -1.26, 0.14),
      new THREE.Vector3(0.82, -1.18, 0.08),
      new THREE.Vector3(1.28, -1.24, 0.03),
    ],
    0.050,
    0.007,
    22,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(0.45, -1.53, 0.15),
      new THREE.Vector3(0.68, -1.78, 0.17),
      new THREE.Vector3(0.54, -2.08, 0.12),
      new THREE.Vector3(0.32, -2.32, 0.05),
    ],
    0.052,
    0.006,
    24,
    8,
  );

  buildTaperedRootCurve(
    [
      new THREE.Vector3(-1.55, -1.62, 0.12),
      new THREE.Vector3(-1.02, -1.82, 0.15),
      new THREE.Vector3(-0.58, -2.04, 0.12),
      new THREE.Vector3(-0.34, -2.30, 0.06),
    ],
    0.054,
    0.008,
    22,
    8,
  );

  const mergedDiagonalRootGeo = mergeGeometries(diagonalRootGeos, false);
  for (const g of diagonalRootGeos) g.dispose();

  // Keep material.color at #ffffff so textures.barkColor is not darkened
  const diagonalRootMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.055,
    color: new THREE.Color('#ffffff'),
    roughness: 0.82,
    metalness: 0.02,
  });
  const diagonalRootMesh = new THREE.Mesh(mergedDiagonalRootGeo, diagonalRootMat);
  diagonalRootMesh.castShadow = true;
  diagonalRootMesh.receiveShadow = true;
  group.add(diagonalRootMesh);

  // Topsoil pebbles and small stones (y = -1.02 .. -1.96), smooth & earth-toned
  const pebbleCount = 175;
  const pebbleGeo = new THREE.IcosahedronGeometry(0.036, 2);
  const pPos = pebbleGeo.attributes.position;
  for (let i = 0; i < pPos.count; i++) {
    const px = pPos.getX(i);
    const py = pPos.getY(i);
    const pz = pPos.getZ(i);
    const s = 1.0 + 0.16 * Math.sin(px * 35.0 + py * 28.0) * Math.cos(pz * 32.0);
    pPos.setXYZ(i, px * s * 1.12, py * s * 0.72, pz * s * 0.85);
  }
  pebbleGeo.computeVertexNormals();

  const pebbleMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.025,
    color: new THREE.Color('#ffffff'),
    roughness: 0.86,
    metalness: 0.03,
  });
  const pebbleInst = new THREE.InstancedMesh(pebbleGeo, pebbleMat, pebbleCount);

  for (let i = 0; i < pebbleCount; i++) {
    const px = (rand() - 0.5) * 4.4;
    const py = -1.00 - rand() * 1.02;
    const pz = getWallZAt(px, py) + 0.005 + rand() * 0.05;
    dummy.position.set(px, py, pz);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    const scale = 0.55 + Math.pow(rand(), 0.75) * 1.25;
    dummy.scale.set(
      scale * (0.85 + rand() * 0.35),
      scale * (0.65 + rand() * 0.35),
      scale * 0.75,
    );
    dummy.updateMatrix();
    pebbleInst.setMatrixAt(i, dummy.matrix);

    // Earth-stained river pebble tones (never bright white/beige)
    itemColor.setHSL(
      0.068 + (rand() - 0.5) * 0.035,
      0.26 + rand() * 0.16,
      0.20 + rand() * 0.13,
    );
    pebbleInst.setColorAt(i, itemColor);
  }
  pebbleInst.instanceMatrix.needsUpdate = true;
  if (pebbleInst.instanceColor) pebbleInst.instanceColor.needsUpdate = true;
  pebbleInst.computeBoundingSphere();
  group.add(pebbleInst);

  // ============================================================================
  // 6. LAYER 4: SUBSOIL CLAY & EARTHEN POCKET ROCKS (y = -1.85 .. -3.35)
  // ============================================================================
  const boulderGeo = new THREE.IcosahedronGeometry(0.18, 2);
  const bPos = boulderGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const bx = bPos.getX(i);
    const by = bPos.getY(i);
    const bz = bPos.getZ(i);
    const warp =
      1.0 +
      0.16 * Math.sin(bx * 11.0 + by * 9.0) +
      0.08 * Math.cos(by * 17.0 - bz * 14.0);
    bPos.setXYZ(i, bx * warp * 1.15, by * warp * 0.82, bz * warp * 0.88);
  }
  boulderGeo.computeVertexNormals();

  const pocketRockPlacements: Array<{
    pos: [number, number, number];
    scale: [number, number, number];
    rot: [number, number, number];
    hsl: [number, number, number];
  }> = [
    // Framing the Chapter 4a clump pocket at [0, -2.55, 0]
    { pos: [-0.70, -2.38, -0.05], scale: [1.28, 1.05, 0.92], rot: [0.3, 0.8, 0.2], hsl: [0.055, 0.34, 0.23] },
    { pos: [0.74, -2.42, -0.03], scale: [1.35, 0.98, 0.90], rot: [-0.2, 1.4, -0.3], hsl: [0.048, 0.38, 0.22] },
    { pos: [-0.54, -2.88, 0.08], scale: [1.18, 0.80, 0.88], rot: [0.4, 2.1, 0.1], hsl: [0.065, 0.30, 0.24] },
    { pos: [0.56, -2.90, 0.06], scale: [1.22, 0.82, 0.90], rot: [0.1, -0.9, 0.4], hsl: [0.058, 0.36, 0.23] },
    { pos: [0.02, -3.02, 0.12], scale: [1.48, 0.72, 0.95], rot: [0.2, 0.3, -0.1], hsl: [0.050, 0.32, 0.21] },
    { pos: [-0.40, -2.10, -0.14], scale: [1.05, 0.88, 0.82], rot: [-0.4, 0.5, 0.3], hsl: [0.058, 0.35, 0.24] },
    { pos: [0.44, -2.06, -0.12], scale: [1.12, 0.92, 0.85], rot: [0.5, -0.6, 0.2], hsl: [0.045, 0.38, 0.22] },
  ];

  const totalSubsoilRocks = 48;
  const boulderMat = new THREE.MeshStandardMaterial({
    bumpMap: textures.soilBump,
    bumpScale: 0.045,
    color: new THREE.Color('#ffffff'),
    roughness: 0.86,
    metalness: 0.03,
  });
  const boulderInst = new THREE.InstancedMesh(boulderGeo, boulderMat, totalSubsoilRocks);

  for (let i = 0; i < totalSubsoilRocks; i++) {
    if (i < pocketRockPlacements.length) {
      const p = pocketRockPlacements[i];
      dummy.position.set(p.pos[0], p.pos[1], p.pos[2]);
      dummy.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      dummy.scale.set(p.scale[0], p.scale[1], p.scale[2]);
      dummy.updateMatrix();
      boulderInst.setMatrixAt(i, dummy.matrix);
      itemColor.setHSL(p.hsl[0], p.hsl[1], p.hsl[2]);
      boulderInst.setColorAt(i, itemColor);
    } else {
      let rx = (rand() - 0.5) * 4.5;
      const ry = -1.80 - rand() * 1.55;
      if (Math.abs(rx) < 0.58 && ry < -2.15 && ry > -2.88) {
        rx += rx >= 0 ? 0.68 : -0.68;
      }
      const rz = getWallZAt(rx, ry) - 0.03 + rand() * 0.07;
      dummy.position.set(rx, ry, rz);
      dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
      const s = 0.65 + rand() * 1.15;
      dummy.scale.set(s * (0.9 + rand() * 0.35), s * (0.7 + rand() * 0.3), s * 0.82);
      dummy.updateMatrix();
      boulderInst.setMatrixAt(i, dummy.matrix);

      // Warm terracotta-stone, ironstone, and weathered ochre-slate
      itemColor.setHSL(
        0.045 + rand() * 0.035,
        0.28 + rand() * 0.16,
        0.18 + rand() * 0.12,
      );
      boulderInst.setColorAt(i, itemColor);
    }
  }
  boulderInst.instanceMatrix.needsUpdate = true;
  if (boulderInst.instanceColor) boulderInst.instanceColor.needsUpdate = true;
  boulderInst.computeBoundingSphere();
  group.add(boulderInst);

  // ============================================================================
  // 7. EARLY FOXFIRE THREADS IN SUBSOIL CRACKS & ALONG ROOTS (0.41 -> 0.52)
  // ============================================================================
  const crackThreadGeos: THREE.BufferGeometry[] = [];
  const crackLinePositions: number[] = [];

  const crackPaths: THREE.Vector3[][] = [
    // Along lower diagonal root branch into clump pocket
    [
      new THREE.Vector3(0.58, -1.62, 0.18),
      new THREE.Vector3(0.62, -1.86, 0.16),
      new THREE.Vector3(0.46, -2.10, 0.13),
      new THREE.Vector3(0.24, -2.32, 0.09),
      new THREE.Vector3(0.06, -2.50, 0.05),
    ],
    // Left root & stone crevice into clump pocket
    [
      new THREE.Vector3(-0.78, -1.66, 0.16),
      new THREE.Vector3(-0.56, -1.92, 0.14),
      new THREE.Vector3(-0.42, -2.18, 0.11),
      new THREE.Vector3(-0.22, -2.38, 0.08),
      new THREE.Vector3(-0.05, -2.52, 0.05),
    ],
    // Crevice between right subsoil boulders
    [
      new THREE.Vector3(1.18, -1.90, 0.10),
      new THREE.Vector3(0.86, -2.14, 0.09),
      new THREE.Vector3(0.58, -2.32, 0.08),
      new THREE.Vector3(0.28, -2.48, 0.06),
    ],
    // Crevice between left subsoil boulders
    [
      new THREE.Vector3(-1.15, -1.98, 0.10),
      new THREE.Vector3(-0.82, -2.22, 0.09),
      new THREE.Vector3(-0.52, -2.42, 0.07),
      new THREE.Vector3(-0.18, -2.54, 0.05),
    ],
    // Deep pocket floor veins beneath the clump
    [
      new THREE.Vector3(-0.64, -2.90, 0.14),
      new THREE.Vector3(-0.32, -2.78, 0.12),
      new THREE.Vector3(0.0, -2.70, 0.10),
      new THREE.Vector3(0.36, -2.80, 0.12),
      new THREE.Vector3(0.68, -2.92, 0.13),
    ],
  ];

  for (let c = 0; c < 28; c++) {
    const angle = (c / 28) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const rOuter = 0.75 + rand() * 0.95;
    const rInner = 0.18 + rand() * 0.22;
    const pts: THREE.Vector3[] = [];
    const steps = 5;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const r = rOuter * (1 - t) + rInner * t;
      const vx = Math.cos(angle + (rand() - 0.5) * 0.22) * r * 1.25;
      const vy = -2.44 + Math.sin(angle) * r * 0.72 + (1 - t) * 0.25;
      const vz = getWallZAt(vx, vy) + 0.045;
      pts.push(new THREE.Vector3(vx, vy, vz));
    }
    crackPaths.push(pts);
  }

  for (let i = 0; i < crackPaths.length; i++) {
    const curve = new THREE.CatmullRomCurve3(crackPaths[i]);
    const radius = i < 5 ? 0.008 : 0.004;
    crackThreadGeos.push(new THREE.TubeGeometry(curve, 16, radius, 5, false));

    const sampled = curve.getPoints(14);
    for (let s = 0; s < sampled.length - 1; s++) {
      crackLinePositions.push(
        sampled[s].x,
        sampled[s].y,
        sampled[s].z,
        sampled[s + 1].x,
        sampled[s + 1].y,
        sampled[s + 1].z,
      );
    }
  }

  const mergedCrackTubes = mergeGeometries(crackThreadGeos, false);
  for (const g of crackThreadGeos) g.dispose();

  const foxfireCrackMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uGlow: { value: 0.0 },
      uTime: { value: 0.0 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uGlow;
      uniform float uTime;
      varying vec3 vWorldPos;
      void main() {
        if (uGlow < 0.01) discard;
        float wave = 0.55 + 0.45 * sin(uTime * 2.6 - vWorldPos.y * 4.5 + vWorldPos.x * 3.2);
        vec3 core = mix(vec3(0.62, 0.82, 0.20), vec3(0.96, 1.14, 0.44), wave);
        gl_FragColor = vec4(core, uGlow * (0.55 + 0.35 * wave));
      }
    `,
  });

  const crackThreadsMesh = new THREE.Mesh(mergedCrackTubes, foxfireCrackMat);
  group.add(crackThreadsMesh);

  const crackLineGeo = new THREE.BufferGeometry();
  crackLineGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(crackLinePositions, 3),
  );
  const crackLines = new THREE.LineSegments(crackLineGeo, foxfireCrackMat);
  group.add(crackLines);

  // ============================================================================
  // 8. FOREGROUND PARALLAX DEPTH (z = 0.72 .. 1.48)
  // ============================================================================
  // Fine soil crumbs, small dark pebbles, hanging root tips, and out-of-focus bokeh soil grains
  // that pass close to the camera and move faster than the background soil face.
  const foregroundParallaxGroup = new THREE.Group();
  foregroundParallaxGroup.name = 'ForegroundParallaxDirt';
  group.add(foregroundParallaxGroup);

  const fgCrumbCount = 190;
  const fgCrumbGeo = new THREE.IcosahedronGeometry(0.011, 1);
  const fgCrumbMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.94,
    metalness: 0.01,
  });
  const fgCrumbInst = new THREE.InstancedMesh(fgCrumbGeo, fgCrumbMat, fgCrumbCount);

  for (let i = 0; i < fgCrumbCount; i++) {
    const sideSign = i % 2 === 0 ? -1 : 1;
    const isEdge = i % 4 !== 0;
    const fx = isEdge
      ? sideSign * (0.55 + rand() * 1.10)
      : (rand() - 0.5) * 1.40;
    const fy = 0.10 - rand() * 3.60;
    const fz = 0.72 + rand() * 0.76;

    dummy.position.set(fx, fy, fz);
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    const s = 0.55 + rand() * 1.35;
    dummy.scale.set(s, s * (0.7 + rand() * 0.5), s);
    dummy.updateMatrix();
    fgCrumbInst.setMatrixAt(i, dummy.matrix);

    // Rich dark soil crumb tones so foreground particles create depth without bright polygon distractions
    const depthT = clamp01(-fy / 3.0);
    itemColor.setHSL(
      0.065 - depthT * 0.015,
      0.36 + rand() * 0.14,
      0.11 + rand() * 0.09,
    );
    fgCrumbInst.setColorAt(i, itemColor);
  }
  fgCrumbInst.instanceMatrix.needsUpdate = true;
  if (fgCrumbInst.instanceColor) fgCrumbInst.instanceColor.needsUpdate = true;
  fgCrumbInst.computeBoundingSphere();
  foregroundParallaxGroup.add(fgCrumbInst);

  // Foreground hanging root tips & organic fibres in the narrow gap
  const fgRootPositions: number[] = [];
  for (let i = 0; i < 72; i++) {
    const sideSign = i % 2 === 0 ? -1 : 1;
    let rx = sideSign * (0.62 + rand() * 0.92);
    let ry = 0.05 - rand() * 3.10;
    let rz = 0.78 + rand() * 0.65;
    const segs = 4;
    for (let s = 0; s < segs; s++) {
      const nx = rx - sideSign * (0.02 + rand() * 0.045);
      const ny = ry - (0.045 + rand() * 0.06);
      const nz = rz + (rand() - 0.5) * 0.04;
      fgRootPositions.push(rx, ry, rz, nx, ny, nz);
      rx = nx;
      ry = ny;
      rz = nz;
    }
  }
  const fgRootGeo = new THREE.BufferGeometry();
  fgRootGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(fgRootPositions, 3),
  );
  const fgRootMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#786046'),
    transparent: true,
    opacity: 0.58,
  });
  const fgRootLines = new THREE.LineSegments(fgRootGeo, fgRootMat);
  foregroundParallaxGroup.add(fgRootLines);

  // Soft out-of-focus foreground bokeh soil grains & fine dust drifting in the filtering light
  const bokehCount = 260;
  const bokehPositions = new Float32Array(bokehCount * 3);
  const bokehSeeds = new Float32Array(bokehCount);
  for (let i = 0; i < bokehCount; i++) {
    bokehSeeds[i] = rand();
    bokehPositions[i * 3 + 0] = (rand() - 0.5) * 2.8;
    bokehPositions[i * 3 + 1] = 0.15 - rand() * 3.55;
    bokehPositions[i * 3 + 2] = 0.55 + rand() * 1.10;
  }
  const bokehGeo = new THREE.BufferGeometry();
  bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
  bokehGeo.setAttribute('aSeed', new THREE.BufferAttribute(bokehSeeds, 1));

  const bokehMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute float aSeed;
      uniform float uTime;
      varying float vAlpha;
      varying float vDepthNorm;
      void main() {
        vec3 pos = position;
        pos.x += sin(uTime * 0.42 + aSeed * 14.0) * 0.05;
        pos.y += cos(uTime * 0.36 + aSeed * 11.0) * 0.04;
        vDepthNorm = clamp(-pos.y / 3.0, 0.0, 1.0);
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        float isBokehCrumb = step(0.68, aSeed);
        float baseSize = mix(10.0, 26.0, isBokehCrumb) * (0.7 + 0.6 * aSeed);
        gl_PointSize = baseSize * (1.0 / max(0.35, -mvPos.z));
        vAlpha = mix(0.42, 0.24, isBokehCrumb) * (0.65 + 0.35 * sin(uTime * 1.3 + aSeed * 6.28));
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uSprite;
      uniform float uOpacity;
      varying float vAlpha;
      varying float vDepthNorm;
      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.04) discard;
        vec3 topDust = vec3(0.68, 0.54, 0.38);
        vec3 deepDust = vec3(0.48, 0.36, 0.26);
        vec3 col = mix(topDust, deepDust, vDepthNorm);
        gl_FragColor = vec4(col, tex.a * vAlpha * uOpacity);
      }
    `,
  });
  const bokehPoints = new THREE.Points(bokehGeo, bokehMat);
  foregroundParallaxGroup.add(bokehPoints);

  // ============================================================================
  // 9. DEDICATED SUBTERRANEAN DESCENT & POCKET LIGHTS
  // ============================================================================
  // Positioned at z = 0.85 so it illuminates the cut soil wall, diagonal root, and stones directly
  // without over-lighting foreground parallax crumbs at z = 1.1..1.5
  const descentDaylight = new THREE.PointLight('#f5dec0', 1.65, 6.5, 1.35);
  descentDaylight.position.set(0.12, -0.5, 0.85);
  group.add(descentDaylight);

  // Foxfire Pocket & Subsoil Crack Light at [0, -2.45, 0.82] so the clump pocket glows warmly
  const pocketFoxfireLight = new THREE.PointLight('#b8dc3c', 0.0, 5.2, 1.5);
  pocketFoxfireLight.position.set(0.0, -2.45, 0.82);
  group.add(pocketFoxfireLight);

  // ============================================================================
  // UPDATE AT PROGRESS
  // ============================================================================
  const updateDescent = (params: {
    progress: number;
    undergroundFactor: number;
    networkGrowth: number;
    elapsedSec: number;
    sunColorRgb: readonly [number, number, number];
    sunlight: number;
  }) => {
    const p = params.progress;

    const enterDescent = smoothstep(0.21, 0.26, p);
    const exitForWideNetwork = 1 - smoothstep(0.545, 0.625, p);
    const ascentReturn = smoothstep(0.875, 0.905, p) * (1 - smoothstep(0.935, 0.965, p));
    const descentVisibility = clamp01(enterDescent * exitForWideNetwork + ascentReturn);

    group.visible = descentVisibility > 0.005;
    if (!group.visible) return;

    const foxfireCrackStrength =
      smoothstep(0.39, 0.49, p) * (1 - smoothstep(0.60, 0.68, p));

    wallUniforms.uTime.value = params.elapsedSec;
    wallUniforms.uProgress.value = p;
    wallUniforms.uOpacity.value = descentVisibility;
    wallUniforms.uFoxfireGlow.value = foxfireCrackStrength;
    wallUniforms.uSunColor.value.setRGB(
      params.sunColorRgb[0],
      params.sunColorRgb[1],
      params.sunColorRgb[2],
    );
    wallUniforms.uSunIntensity.value = 0.78 + params.sunlight * 0.45;

    // Breaking ground warm silhouette horizon glow (peaks around 0.25..0.33)
    const breakingGroundGlow =
      smoothstep(0.23, 0.275, p) * (1 - smoothstep(0.32, 0.37, p));
    horizonGlowMat.uniforms.uOpacity.value = breakingGroundGlow;
    horizonGlowMat.uniforms.uSunColor.value.setRGB(
      params.sunColorRgb[0],
      params.sunColorRgb[1],
      params.sunColorRgb[2],
    );
    horizonGlowMesh.visible = breakingGroundGlow > 0.01;

    // Update woodlouse crawl along the humus tunnel (y ≈ -0.80)
    const crawlPhase = ((params.elapsedSec * 0.14) % 1.0) - 0.5;
    const wx = 0.38 + Math.sin(params.elapsedSec * 0.45) * 0.11;
    const wy = -0.80 + Math.cos(params.elapsedSec * 0.9) * 0.006;
    woodlouseGroup.position.set(wx, wy, getWallZAt(wx, wy) + 0.035);
    woodlouseGroup.rotation.y = Math.cos(params.elapsedSec * 0.45) >= 0 ? 0.15 : Math.PI - 0.15;
    woodlouseGroup.rotation.z = Math.sin(crawlPhase * Math.PI * 8) * 0.05;

    // Foreground parallax: moves upward faster than the wall as camera descends (0.26 -> 0.52)
    const normalizedDescent = clamp01((p - 0.26) / 0.26);
    foregroundParallaxGroup.position.y = (normalizedDescent - 0.45) * 0.92;
    bokehMat.uniforms.uTime.value = params.elapsedSec;
    bokehMat.uniforms.uOpacity.value = descentVisibility;

    // Foxfire crack tubes & lines
    foxfireCrackMat.uniforms.uGlow.value = foxfireCrackStrength * descentVisibility;
    foxfireCrackMat.uniforms.uTime.value = params.elapsedSec;

    // Filtering daylight lamp tracks camera depth and shifts from warm daylight to cooler dim earth light
    const camDepthY = 0.05 - normalizedDescent * 2.55;
    descentDaylight.position.set(0.12, camDepthY + 0.18, 0.85);
    const depthCoolMix = clamp01(normalizedDescent * 0.72);
    descentDaylight.color
      .setRGB(
        params.sunColorRgb[0],
        params.sunColorRgb[1],
        params.sunColorRgb[2],
      )
      .lerp(new THREE.Color('#8a968e'), depthCoolMix * 0.55);
    descentDaylight.intensity =
      descentVisibility * (1.85 - normalizedDescent * 0.68);

    // Pocket Foxfire + warm fill light illuminates the clump and surrounding stones at 0.41..0.56
    pocketFoxfireLight.intensity =
      descentVisibility * foxfireCrackStrength * 1.48;
  };

  return {
    group,
    updateDescent,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/soundSynth.ts">
<![CDATA[/**
 * Zero-dependency procedural Web Audio synthesizer for LOAM's sound toggle.
 * Produces a gentle damp forest air tone above ground that shifts into a warm
 * subterranean harmonic drone underground, plus a subtle resonant chime when
 * clicking a mycelium thread pulse.
 */

export interface SoundController {
  isEnabled: () => boolean;
  toggle: () => boolean;
  updateProgress: (undergroundFactor: number) => void;
  playPulseChime: () => void;
  dispose: () => void;
}

export function createSoundController(): SoundController {
  let enabled = false;
  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let droneOsc1: OscillatorNode | null = null;
  let droneOsc2: OscillatorNode | null = null;
  let filterNode: BiquadFilterNode | null = null;

  const initAudio = () => {
    if (ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.value = 260;
    filterNode.connect(masterGain);

    droneOsc1 = ctx.createOscillator();
    droneOsc1.type = 'sine';
    droneOsc1.frequency.value = 110; // A2 warm root
    droneOsc1.connect(filterNode);
    droneOsc1.start();

    droneOsc2 = ctx.createOscillator();
    droneOsc2.type = 'triangle';
    droneOsc2.frequency.value = 164.81; // E3 fifth
    const subGain = ctx.createGain();
    subGain.gain.value = 0.25;
    droneOsc2.connect(subGain);
    subGain.connect(filterNode);
    droneOsc2.start();
  };

  const toggle = (): boolean => {
    enabled = !enabled;
    if (enabled) {
      initAudio();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (masterGain && ctx) {
        masterGain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.4);
      }
    } else if (masterGain && ctx) {
      masterGain.gain.setTargetAtTime(0.0, ctx.currentTime, 0.25);
    }
    return enabled;
  };

  const updateProgress = (undergroundFactor: number) => {
    if (!enabled || !ctx || !filterNode || !droneOsc1) return;
    filterNode.frequency.setTargetAtTime(220 + undergroundFactor * 190, ctx.currentTime, 0.2);
    droneOsc1.frequency.setTargetAtTime(110 - undergroundFactor * 12, ctx.currentTime, 0.2);
  };

  const playPulseChime = () => {
    if (!enabled || !ctx || !masterGain) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(396, ctx.currentTime + 0.9);

    g.gain.setValueAtTime(0.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.95);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  };

  const dispose = () => {
    if (ctx) {
      ctx.close().catch(() => {});
      ctx = null;
    }
  };

  return {
    isEnabled: () => enabled,
    toggle,
    updateProgress,
    playPulseChime,
    dispose,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/textures.ts">
<![CDATA[import * as THREE from 'three';
import { createSeededRandom } from '../logic/networkGenerator';

export interface ProceduralTextureSet {
  stemColor: THREE.CanvasTexture;
  stemBump: THREE.CanvasTexture;
  capColor: THREE.CanvasTexture;
  capBump: THREE.CanvasTexture;
  bulbColor: THREE.CanvasTexture;
  bulbBump: THREE.CanvasTexture;
  traySkinColor: THREE.CanvasTexture;
  traySkinBump: THREE.CanvasTexture;
  trayCoreColor: THREE.CanvasTexture;
  trayCoreBump: THREE.CanvasTexture;
  clumpFuzzColor: THREE.CanvasTexture;
  clumpFuzzBump: THREE.CanvasTexture;
  barkColor: THREE.CanvasTexture;
  soilColor: THREE.CanvasTexture;
  soilBump: THREE.CanvasTexture;
  leafColor: THREE.CanvasTexture;
  sporeSprite: THREE.CanvasTexture;
}

function configureTexture(
  tex: THREE.CanvasTexture,
  isColor: boolean,
  maxAnisotropy: number,
  repeatX = 1,
  repeatY = 1,
): THREE.CanvasTexture {
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Generates high-detail procedural CanvasTextures calibrated for low-key natural specimen lighting,
 * and projects `mushroom-from-above_90ef6842.png` onto the cap top albedo when loaded.
 */
export function createProceduralTextures(renderer: THREE.WebGLRenderer): ProceduralTextureSet {
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1);
  const rand = createSeededRandom(7319);

  // 1. Stem snakeskin banding texture (Macrolepiota procera characteristic broken horizontal chevron bands on warm cream)
  const stemColorCanvas = document.createElement('canvas');
  stemColorCanvas.width = 512;
  stemColorCanvas.height = 1024;
  const sCtx = stemColorCanvas.getContext('2d')!;

  const stemBumpCanvas = document.createElement('canvas');
  stemBumpCanvas.width = 512;
  stemBumpCanvas.height = 1024;
  const sbCtx = stemBumpCanvas.getContext('2d')!;

  sCtx.fillStyle = '#cfc2ad';
  sCtx.fillRect(0, 0, 512, 1024);
  sbCtx.fillStyle = '#505050';
  sbCtx.fillRect(0, 0, 512, 1024);

  // Fine vertical silky stem fibrils
  for (let i = 0; i < 800; i++) {
    const x = rand() * 512;
    sCtx.fillStyle = rand() > 0.5 ? 'rgba(182, 166, 145, 0.35)' : 'rgba(222, 211, 194, 0.35)';
    sCtx.fillRect(x, 0, 1.2, 1024);
  }

  // Horizontal broken snakeskin bands (continuous wrapping zig-zag rings cracked apart as the stem elongates)
  const bandRows = 58;
  for (let row = 0; row < bandRows; row++) {
    const normY = row / bandRows;
    const baseY = normY * 1024;
    const bandHeight = 7 + (1 - normY * 0.45) * 9 + rand() * 4;
    const cracks = 11 + Math.floor(rand() * 6);

    for (let seg = 0; seg < cracks; seg++) {
      const startX = (seg / cracks) * 512 + (rand() - 0.5) * 6;
      const segW = (512 / cracks) * (0.68 + rand() * 0.22);
      const chevronOffset = Math.sin((seg / cracks) * Math.PI * 6 + row * 0.7) * 5;
      const y0 = baseY + chevronOffset;

      const r = 88 + Math.floor(rand() * 28);
      const g = 62 + Math.floor(rand() * 22);
      const b = 40 + Math.floor(rand() * 16);
      sCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      sbCtx.fillStyle = '#d4d4d4';

      sCtx.beginPath();
      sbCtx.beginPath();
      const steps = 6;
      for (let p = 0; p <= steps; p++) {
        const px = startX + (p / steps) * segW;
        const py = y0 + Math.sin(p * 1.3) * 2.5;
        if (p === 0) {
          sCtx.moveTo(px, py);
          sbCtx.moveTo(px, py);
        } else {
          sCtx.lineTo(px, py);
          sbCtx.lineTo(px, py);
        }
      }
      for (let p = steps; p >= 0; p--) {
        const px = startX + (p / steps) * segW;
        const py = y0 + bandHeight + Math.cos(p * 1.3) * 2.5;
        sCtx.lineTo(px, py);
        sbCtx.lineTo(px, py);
      }
      sCtx.closePath();
      sbCtx.closePath();
      sCtx.fill();
      sbCtx.fill();
    }
  }

  // 2. Cap radial fibrous cream surface + dark umbo center (matches mushroom-from-above_90ef6842.png)
  const capColorCanvas = document.createElement('canvas');
  capColorCanvas.width = 512;
  capColorCanvas.height = 512;
  const cCtx = capColorCanvas.getContext('2d')!;

  const capBumpCanvas = document.createElement('canvas');
  capBumpCanvas.width = 512;
  capBumpCanvas.height = 512;
  const cbCtx = capBumpCanvas.getContext('2d')!;

  const capGrad = cCtx.createRadialGradient(256, 256, 6, 256, 256, 256);
  capGrad.addColorStop(0.0, '#382416');
  capGrad.addColorStop(0.14, '#4a311f');
  capGrad.addColorStop(0.22, '#6e4e35');
  capGrad.addColorStop(0.30, '#c2b29b');
  capGrad.addColorStop(0.78, '#cbbca6');
  capGrad.addColorStop(1.0, '#b8a68e');
  cCtx.fillStyle = capGrad;
  cCtx.fillRect(0, 0, 512, 512);

  cbCtx.fillStyle = '#585858';
  cbCtx.fillRect(0, 0, 512, 512);

  // Radial silk fibrils across the cap
  for (let i = 0; i < 1200; i++) {
    const angle = (i / 1200) * Math.PI * 2 + (rand() - 0.5) * 0.015;
    const r0 = 32 + rand() * 25;
    const r1 = 190 + rand() * 64;
    cCtx.strokeStyle = rand() > 0.45 ? 'rgba(218, 205, 186, 0.4)' : 'rgba(105, 76, 52, 0.32)';
    cCtx.lineWidth = 0.8 + rand() * 1.4;
    cCtx.beginPath();
    cCtx.moveTo(256 + Math.cos(angle) * r0, 256 + Math.sin(angle) * r0);
    cCtx.lineTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
    cCtx.stroke();

    cbCtx.strokeStyle = 'rgba(185, 185, 185, 0.4)';
    cbCtx.lineWidth = 1.1;
    cbCtx.beginPath();
    cbCtx.moveTo(256 + Math.cos(angle) * r0, 256 + Math.sin(angle) * r0);
    cbCtx.lineTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
    cbCtx.stroke();
  }

  // Concentric scale base markings on the cap canvas
  const capRingRadii = [52, 72, 94, 118, 144, 172, 200, 226];
  for (let rIdx = 0; rIdx < capRingRadii.length; rIdx++) {
    const rad = capRingRadii[rIdx];
    const patches = 18 + rIdx * 3;
    for (let k = 0; k < patches; k++) {
      const ang = (k / patches) * Math.PI * 2 + (rIdx % 2) * (Math.PI / patches) + (rand() - 0.5) * 0.05;
      const px = 256 + Math.cos(ang) * rad;
      const py = 256 + Math.sin(ang) * rad;
      cCtx.save();
      cCtx.translate(px, py);
      cCtx.rotate(ang);
      cCtx.fillStyle = rIdx < 3 ? 'rgba(72, 48, 30, 0.75)' : 'rgba(96, 68, 45, 0.65)';
      cCtx.beginPath();
      cCtx.ellipse(0, 0, 5 + rand() * 4, 7 + rand() * 5, 0, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.restore();
    }
  }

  const capColorTex = configureTexture(new THREE.CanvasTexture(capColorCanvas), true, maxAniso);
  capColorTex.wrapS = THREE.ClampToEdgeWrapping;
  capColorTex.wrapT = THREE.ClampToEdgeWrapping;

  // Project `/templates/loam/references/mushroom-from-above.webp` onto the cap top albedo when available
  if (typeof Image !== 'undefined') {
    const capImg = new Image();
    capImg.crossOrigin = 'anonymous';
    capImg.onload = () => {
      cCtx.save();
      cCtx.beginPath();
      cCtx.arc(256, 256, 246, 0, Math.PI * 2);
      cCtx.clip();
      cCtx.drawImage(capImg, 0, 0, 512, 512);
      // Apply a subtle darkening multiply pass so the photo albedo matches our low-key specimen exposure
      cCtx.fillStyle = 'rgba(28, 22, 16, 0.16)';
      cCtx.fillRect(0, 0, 512, 512);
      cCtx.restore();
      capColorTex.needsUpdate = true;
    };
    capImg.src = '/templates/loam/references/mushroom-from-above.webp';
  }

  // 3. Bulbous base texture (smooth transition from cream stem base into dark clotted soil & moss)
  const bulbColorCanvas = document.createElement('canvas');
  bulbColorCanvas.width = 512;
  bulbColorCanvas.height = 512;
  const bCtx = bulbColorCanvas.getContext('2d')!;

  const bulbBumpCanvas = document.createElement('canvas');
  bulbBumpCanvas.width = 512;
  bulbBumpCanvas.height = 512;
  const bbCtx = bulbBumpCanvas.getContext('2d')!;

  const bulbGrad = bCtx.createLinearGradient(0, 0, 0, 512);
  bulbGrad.addColorStop(0.0, '#cfc2ad');
  bulbGrad.addColorStop(0.28, '#bfb09a');
  bulbGrad.addColorStop(0.65, '#3b2b1e');
  bulbGrad.addColorStop(1.0, '#16100b');
  bCtx.fillStyle = bulbGrad;
  bCtx.fillRect(0, 0, 512, 512);

  bbCtx.fillStyle = '#505050';
  bbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 650; i++) {
    const x = rand() * 512;
    const y = 90 + Math.pow(rand(), 0.75) * 422;
    const r = 4 + rand() * 20;
    const isMoss = rand() > 0.72 && y > 130 && y < 370;
    if (isMoss) {
      bCtx.fillStyle = `rgba(${46 + Math.floor(rand() * 22)}, ${68 + Math.floor(rand() * 28)}, ${26 + Math.floor(rand() * 14)}, 0.85)`;
    } else {
      const d = 18 + Math.floor(rand() * 22);
      bCtx.fillStyle = `rgba(${d + 8}, ${d + 2}, ${d - 3}, 0.92)`;
    }
    bCtx.beginPath();
    bCtx.arc(x, y, r, 0, Math.PI * 2);
    bCtx.fill();

    bbCtx.fillStyle = isMoss ? '#b8b8b8' : '#e0e0e0';
    bbCtx.beginPath();
    bbCtx.arc(x, y, r * 0.85, 0, Math.PI * 2);
    bbCtx.fill();
  }

  // 4. Molded packaging tray outer mycelium skin (matte off-white to warm cream #f2eadb with scattered small brown hemp fibre speckles)
  const traySkinCanvas = document.createElement('canvas');
  traySkinCanvas.width = 512;
  traySkinCanvas.height = 512;
  const tsCtx = traySkinCanvas.getContext('2d')!;

  const traySkinBumpCanvas = document.createElement('canvas');
  traySkinBumpCanvas.width = 512;
  traySkinBumpCanvas.height = 512;
  const tsbCtx = traySkinBumpCanvas.getContext('2d')!;

  tsCtx.fillStyle = '#f2eadb';
  tsCtx.fillRect(0, 0, 512, 512);
  tsbCtx.fillStyle = '#808080';
  tsbCtx.fillRect(0, 0, 512, 512);

  // Soft cloudy velvety off-white/cream mycelium patches
  for (let i = 0; i < 340; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const rad = 14 + rand() * 46;
    const g = tsCtx.createRadialGradient(x, y, 2, x, y, rad);
    const tint =
      rand() > 0.36
        ? 'rgba(251, 247, 239, 0.56)'
        : 'rgba(232, 222, 204, 0.42)';
    g.addColorStop(0, tint);
    g.addColorStop(1, 'rgba(242, 234, 219, 0)');
    tsCtx.fillStyle = g;
    tsCtx.beginPath();
    tsCtx.arc(x, y, rad, 0, Math.PI * 2);
    tsCtx.fill();

    // Fine velvety micro-fuzz relief on bump map
    tsbCtx.fillStyle = rand() > 0.5 ? 'rgba(162, 162, 162, 0.22)' : 'rgba(96, 96, 96, 0.22)';
    tsbCtx.beginPath();
    tsbCtx.arc(x, y, rad * 0.42, 0, Math.PI * 2);
    tsbCtx.fill();
  }

  // Scattered small golden-brown & warm umber hemp hurd fibre speckles matching material-top_9cdf4064.png
  for (let i = 0; i < 640; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const isSliver = rand() > 0.30;
    const len = isSliver ? 2.4 + rand() * 8.2 : 0.9 + rand() * 1.8;
    const ang = rand() * Math.PI * 2;
    const w = isSliver ? 0.9 + rand() * 1.65 : 1.1 + rand() * 1.5;
    const r = 98 + Math.floor(rand() * 52);
    const gr = 68 + Math.floor(rand() * 38);
    const b = 38 + Math.floor(rand() * 26);
    tsCtx.strokeStyle = `rgba(${r}, ${gr}, ${b}, ${0.56 + rand() * 0.38})`;
    tsCtx.lineWidth = w;
    tsCtx.lineCap = 'round';
    tsCtx.beginPath();
    tsCtx.moveTo(x, y);
    tsCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tsCtx.stroke();

    tsbCtx.strokeStyle = 'rgba(38, 38, 38, 0.65)';
    tsbCtx.lineWidth = w;
    tsbCtx.beginPath();
    tsbCtx.moveTo(x, y);
    tsbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tsbCtx.stroke();
  }

  // 5. Exposed fibrous core texture for the tray's broken corner (matches material-underside-and-cut-edge_69208517.png)
  const trayCoreCanvas = document.createElement('canvas');
  trayCoreCanvas.width = 512;
  trayCoreCanvas.height = 512;
  const tcCtx = trayCoreCanvas.getContext('2d')!;

  const trayCoreBumpCanvas = document.createElement('canvas');
  trayCoreBumpCanvas.width = 512;
  trayCoreBumpCanvas.height = 512;
  const tcbCtx = trayCoreBumpCanvas.getContext('2d')!;

  tcCtx.fillStyle = '#c4ae8e';
  tcCtx.fillRect(0, 0, 512, 512);
  tcbCtx.fillStyle = '#303030';
  tcbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 2400; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const len = 6 + rand() * 20;
    const ang = rand() * Math.PI * 2;
    const isMyceliumStrand = rand() > 0.46;
    tcCtx.strokeStyle = isMyceliumStrand
      ? `rgba(245, 239, 226, ${0.76 + rand() * 0.22})`
      : `rgb(${152 + Math.floor(rand() * 44)}, ${122 + Math.floor(rand() * 36)}, ${86 + Math.floor(rand() * 28)})`;
    tcCtx.lineWidth = isMyceliumStrand ? 1.2 + rand() * 1.6 : 2.0 + rand() * 3.4;
    tcCtx.beginPath();
    tcCtx.moveTo(x, y);
    tcCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tcCtx.stroke();

    tcbCtx.strokeStyle = isMyceliumStrand ? '#f2f2f2' : '#b0b0b0';
    tcbCtx.lineWidth = 2.4;
    tcbCtx.beginPath();
    tcbCtx.moveTo(x, y);
    tcbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    tcbCtx.stroke();
  }

  // 6. Clump cottony hyphae texture & bark texture
  const clumpCanvas = document.createElement('canvas');
  clumpCanvas.width = 512;
  clumpCanvas.height = 512;
  const clCtx = clumpCanvas.getContext('2d')!;

  const clumpBumpCanvas = document.createElement('canvas');
  clumpBumpCanvas.width = 512;
  clumpBumpCanvas.height = 512;
  const clbCtx = clumpBumpCanvas.getContext('2d')!;

  clCtx.fillStyle = '#ebe3d5';
  clCtx.fillRect(0, 0, 512, 512);
  clbCtx.fillStyle = '#555555';
  clbCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 1800; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const len = 10 + rand() * 28;
    const ang = rand() * Math.PI * 2;
    clCtx.strokeStyle = rand() > 0.14 ? 'rgba(248, 243, 234, 0.72)' : 'rgba(42, 30, 20, 0.65)';
    clCtx.lineWidth = 0.9 + rand() * 2.0;
    clCtx.beginPath();
    clCtx.moveTo(x, y);
    clCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    clCtx.stroke();

    clbCtx.strokeStyle = '#d0d0d0';
    clbCtx.lineWidth = 1.8;
    clbCtx.beginPath();
    clbCtx.moveTo(x, y);
    clbCtx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    clbCtx.stroke();
  }

  const barkCanvas = document.createElement('canvas');
  barkCanvas.width = 256;
  barkCanvas.height = 256;
  const bkCtx = barkCanvas.getContext('2d')!;
  bkCtx.fillStyle = '#4a331f';
  bkCtx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 360; i++) {
    bkCtx.fillStyle = rand() > 0.5 ? '#2e1e10' : '#66492e';
    bkCtx.fillRect(rand() * 256, 0, 1.5 + rand() * 3.5, 256);
  }

  // 7. Damp dark forest soil normal/bump & albedo texture
  const soilColorCanvas = document.createElement('canvas');
  soilColorCanvas.width = 512;
  soilColorCanvas.height = 512;
  const scCtx = soilColorCanvas.getContext('2d')!;

  const soilBumpCanvas = document.createElement('canvas');
  soilBumpCanvas.width = 512;
  soilBumpCanvas.height = 512;
  const sbumpCtx = soilBumpCanvas.getContext('2d')!;

  scCtx.fillStyle = '#140f0b';
  scCtx.fillRect(0, 0, 512, 512);
  sbumpCtx.fillStyle = '#505050';
  sbumpCtx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 2400; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const r = 1.5 + rand() * 8;
    const tone = 14 + Math.floor(rand() * 22);
    scCtx.fillStyle = `rgb(${tone + 6}, ${tone + 2}, ${tone - 2})`;
    scCtx.beginPath();
    scCtx.arc(x, y, r, 0, Math.PI * 2);
    scCtx.fill();

    const bVal = 60 + Math.floor(rand() * 170);
    sbumpCtx.fillStyle = `rgb(${bVal}, ${bVal}, ${bVal})`;
    sbumpCtx.beginPath();
    sbumpCtx.arc(x, y, r, 0, Math.PI * 2);
    sbumpCtx.fill();
  }

  // 8. Veined dead leaf texture
  const leafCanvas = document.createElement('canvas');
  leafCanvas.width = 256;
  leafCanvas.height = 256;
  const lfCtx = leafCanvas.getContext('2d')!;
  lfCtx.fillStyle = '#593b22';
  lfCtx.fillRect(0, 0, 256, 256);
  // Central midrib & lateral veins
  lfCtx.strokeStyle = '#332010';
  lfCtx.lineWidth = 3;
  lfCtx.beginPath();
  lfCtx.moveTo(0, 128);
  lfCtx.lineTo(256, 128);
  lfCtx.stroke();
  lfCtx.lineWidth = 1.5;
  for (let v = 24; v < 240; v += 28) {
    lfCtx.beginPath();
    lfCtx.moveTo(v, 128);
    lfCtx.lineTo(v + 26, 20);
    lfCtx.moveTo(v, 128);
    lfCtx.lineTo(v + 26, 236);
    lfCtx.stroke();
  }

  // 9. Soft circular spore particle sprite
  const sporeCanvas = document.createElement('canvas');
  sporeCanvas.width = 64;
  sporeCanvas.height = 64;
  const spCtx = sporeCanvas.getContext('2d')!;
  const spGrad = spCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
  spGrad.addColorStop(0, 'rgba(235, 224, 204, 0.95)');
  spGrad.addColorStop(0.45, 'rgba(210, 196, 174, 0.5)');
  spGrad.addColorStop(1, 'rgba(210, 196, 174, 0.0)');
  spCtx.fillStyle = spGrad;
  spCtx.fillRect(0, 0, 64, 64);

  return {
    stemColor: configureTexture(new THREE.CanvasTexture(stemColorCanvas), true, maxAniso),
    stemBump: configureTexture(new THREE.CanvasTexture(stemBumpCanvas), false, maxAniso),
    capColor: capColorTex,
    capBump: configureTexture(new THREE.CanvasTexture(capBumpCanvas), false, maxAniso),
    bulbColor: configureTexture(new THREE.CanvasTexture(bulbColorCanvas), true, maxAniso),
    bulbBump: configureTexture(new THREE.CanvasTexture(bulbBumpCanvas), false, maxAniso),
    traySkinColor: configureTexture(new THREE.CanvasTexture(traySkinCanvas), true, maxAniso, 2, 2),
    traySkinBump: configureTexture(new THREE.CanvasTexture(traySkinBumpCanvas), false, maxAniso, 2, 2),
    trayCoreColor: configureTexture(new THREE.CanvasTexture(trayCoreCanvas), true, maxAniso, 2, 2),
    trayCoreBump: configureTexture(new THREE.CanvasTexture(trayCoreBumpCanvas), false, maxAniso, 2, 2),
    clumpFuzzColor: configureTexture(new THREE.CanvasTexture(clumpCanvas), true, maxAniso, 2, 2),
    clumpFuzzBump: configureTexture(new THREE.CanvasTexture(clumpBumpCanvas), false, maxAniso, 2, 2),
    barkColor: configureTexture(new THREE.CanvasTexture(barkCanvas), true, maxAniso),
    soilColor: configureTexture(new THREE.CanvasTexture(soilColorCanvas), true, maxAniso, 6, 6),
    soilBump: configureTexture(new THREE.CanvasTexture(soilBumpCanvas), false, maxAniso, 6, 6),
    leafColor: configureTexture(new THREE.CanvasTexture(leafCanvas), true, maxAniso),
    sporeSprite: configureTexture(new THREE.CanvasTexture(sporeCanvas), true, 1),
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/models/clumpModel.ts">
<![CDATA[import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom } from '../../logic/networkGenerator';

export interface BuiltClumpModel {
  group: THREE.Group;
  hitProxy: THREE.Mesh;
  setRevealAndGlow: (reveal: number, glowIntensity: number) => void;
}

/**
 * Builds the Chapter 4a fist-sized mycelium clump specimen matching
 * `mycelium-clump-front_9ac04e63.png` and `mycelium-clump-back_489a37a5.png`:
 * - Dark crumbly colonized loam soil core
 * - Dense cotton-like fuzzy cream/white hyphal lobes + fine protruding hyphal whiskers
 * - 64 thick cream rope-like rhizomorph cords wrapping and branching across the mass,
 *   including loose trailing strands hanging off the sides and bottom
 * - Weathered wood/bark chips caught inside the cords
 */
export function buildMyceliumClump(
  textures: ProceduralTextureSet,
  seed = 304,
): BuiltClumpModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'MyceliumClumpSpecimen';

  const materialsToFade: THREE.Material[] = [];

  // 1. Dark crumbly soil & humus substrate core with exposed pockets
  const coreGeo = new THREE.SphereGeometry(0.6, 32, 24);
  const cPos = coreGeo.attributes.position;
  for (let i = 0; i < cPos.count; i++) {
    const vx = cPos.getX(i);
    const vy = cPos.getY(i);
    const vz = cPos.getZ(i);
    const noise =
      1 +
      Math.sin(vx * 5.2 + vy * 4.1) * 0.11 +
      Math.cos(vz * 6.3 - vx * 3.7) * 0.09;
    cPos.setXYZ(i, vx * 1.22 * noise, vy * 0.88 * noise, vz * 0.96 * noise);
  }
  coreGeo.computeVertexNormals();

  const coreMat = new THREE.MeshStandardMaterial({
    map: textures.soilColor,
    bumpMap: textures.soilBump,
    bumpScale: 0.055,
    color: new THREE.Color('#201710'),
    roughness: 0.96,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(coreMat);
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  group.add(coreMesh);

  // 2. Smooth, high-subdivision cotton-like fuzzy cream-white hyphal cushions enveloping the core
  const hyphaeMat = new THREE.MeshStandardMaterial({
    map: textures.clumpFuzzColor,
    bumpMap: textures.clumpFuzzBump,
    bumpScale: 0.055,
    color: new THREE.Color('#f0e8da'),
    roughness: 0.95,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(hyphaeMat);

  const puffCount = 28;
  const puffGeo = new THREE.SphereGeometry(0.27, 22, 16);
  const pPos = puffGeo.attributes.position;
  for (let i = 0; i < pPos.count; i++) {
    const px = pPos.getX(i);
    const py = pPos.getY(i);
    const pz = pPos.getZ(i);
    const n =
      1 +
      Math.sin(px * 11 + py * 9) * 0.09 +
      Math.cos(pz * 13 - px * 7) * 0.08;
    pPos.setXYZ(i, px * n, py * n, pz * n);
  }
  puffGeo.computeVertexNormals();

  const puffInst = new THREE.InstancedMesh(puffGeo, hyphaeMat, puffCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < puffCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / puffCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const rad = 0.45 + (rand() - 0.5) * 0.08;

    dummy.position.set(
      Math.sin(phi) * Math.cos(theta) * rad * 1.2,
      Math.cos(phi) * rad * 0.86,
      Math.sin(phi) * Math.sin(theta) * rad * 0.96,
    );
    dummy.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
    dummy.scale.set(
      0.8 + rand() * 0.45,
      0.72 + rand() * 0.38,
      0.8 + rand() * 0.45,
    );
    dummy.updateMatrix();
    puffInst.setMatrixAt(i, dummy.matrix);
  }
  puffInst.instanceMatrix.needsUpdate = true;
  puffInst.computeBoundingSphere();
  group.add(puffInst);

  // Fine cottony hyphal fuzz & tangential cobweb-like filaments wrapping the cottony lobes
  const whiskerCount = 820;
  const whiskerPositions = new Float32Array(whiskerCount * 6);
  for (let i = 0; i < whiskerCount; i++) {
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(2 * rand() - 1);
    const r0 = 0.56 + (rand() - 0.5) * 0.11;
    const x0 = Math.sin(ph) * Math.cos(th) * r0 * 1.18;
    const y0 = Math.cos(ph) * r0 * 0.86;
    const z0 = Math.sin(ph) * Math.sin(th) * r0 * 0.95;
    const isTangential = i % 3 !== 0;
    const len = isTangential ? 0.09 + rand() * 0.14 : 0.045 + rand() * 0.075;
    const dTh = th + (isTangential ? 1.2 + (rand() - 0.5) * 0.8 : 0);
    const dPh = ph + (isTangential ? (rand() - 0.5) * 0.8 : 0);
    whiskerPositions[i * 6 + 0] = x0;
    whiskerPositions[i * 6 + 1] = y0;
    whiskerPositions[i * 6 + 2] = z0;
    whiskerPositions[i * 6 + 3] =
      x0 + Math.sin(dPh) * Math.cos(dTh) * len + (rand() - 0.5) * 0.03;
    whiskerPositions[i * 6 + 4] =
      y0 + Math.cos(dPh) * len + (rand() - 0.5) * 0.03;
    whiskerPositions[i * 6 + 5] =
      z0 + Math.sin(dPh) * Math.sin(dTh) * len + (rand() - 0.5) * 0.03;
  }
  const whiskerGeo = new THREE.BufferGeometry();
  whiskerGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(whiskerPositions, 3),
  );
  const whiskerMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#f2eadb'),
    transparent: true,
    opacity: 0.65,
  });
  materialsToFade.push(whiskerMat);
  const whiskerLines = new THREE.LineSegments(whiskerGeo, whiskerMat);
  group.add(whiskerLines);

  // 3. Thick cream rope-like rhizomorph cords wrapping and branching across the clump surface
  //    plus loose trailing strands hanging off the sides and bottom
  const cordMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ebe0cc'),
    bumpMap: textures.clumpFuzzBump,
    bumpScale: 0.03,
    roughness: 0.78,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(cordMat);

  const cordCount = 64;
  for (let c = 0; c < cordCount; c++) {
    const pts: THREE.Vector3[] = [];
    const startTheta = rand() * Math.PI * 2;
    const startPhi = 0.18 + rand() * (Math.PI - 0.36);
    const arcSteps = 14;
    // Main artery bundle sweeps diagonally from bottom-left to upper-right like reference photo
    const isMainBundle = c < 18;
    const dTheta = isMainBundle
      ? 1.45 + (rand() - 0.5) * 0.55
      : (rand() - 0.5) * 2.8;
    const dPhi = isMainBundle
      ? -0.92 + (rand() - 0.5) * 0.42
      : (rand() - 0.5) * 1.8;
    const isTrailingStrand = c >= 46;

    for (let s = 0; s <= arcSteps; s++) {
      const st = s / arcSteps;
      const th =
        startTheta + dTheta * st + Math.sin(st * Math.PI * 2.8 + c) * 0.2;
      const ph = Math.max(
        0.12,
        Math.min(Math.PI - 0.12, startPhi + dPhi * st),
      );
      let r = 0.64 + (rand() - 0.5) * 0.03;

      let x = Math.sin(ph) * Math.cos(th) * r * 1.2;
      let y = Math.cos(ph) * r * 0.86;
      let z = Math.sin(ph) * Math.sin(th) * r * 0.96;

      // Loose trailing strands peel away and drape downward/outward at their ends
      if (isTrailingStrand && s > arcSteps - 6) {
        const trailT = (s - (arcSteps - 6)) / 6;
        r += trailT * 0.32;
        x =
          Math.sin(ph) * Math.cos(th) * r * 1.22 +
          Math.sin(trailT * 4 + c) * 0.07;
        y = Math.cos(ph) * r * 0.86 - trailT * 0.3;
        z = Math.sin(ph) * Math.sin(th) * r * 0.96;
      }

      pts.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    const radius = isMainBundle
      ? 0.02 + rand() * 0.015
      : isTrailingStrand
        ? 0.0055 + rand() * 0.0055
        : 0.0095 + rand() * 0.01;
    const tubeGeo = new THREE.TubeGeometry(curve, 32, radius, 8, false);
    const tubeMesh = new THREE.Mesh(tubeGeo, cordMat);
    tubeMesh.castShadow = true;
    tubeMesh.receiveShadow = true;
    group.add(tubeMesh);
  }

  // 4. Embedded weathered bark chips & dark soil granules caught inside the cords
  const barkMat = new THREE.MeshStandardMaterial({
    map: textures.barkColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.045,
    color: new THREE.Color('#7a5838'),
    roughness: 0.92,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  materialsToFade.push(barkMat);

  const barkGeo = new THREE.BoxGeometry(0.24, 0.045, 0.095, 3, 1, 2);
  const bPos = barkGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const bx = bPos.getX(i);
    const by = bPos.getY(i);
    const bz = bPos.getZ(i);
    bPos.setXYZ(
      i,
      bx,
      by + Math.sin(bx * 18) * 0.008,
      bz * (1 - Math.abs(bx) * 1.2),
    );
  }
  barkGeo.computeVertexNormals();

  const barkCount = 24;
  const barkInst = new THREE.InstancedMesh(barkGeo, barkMat, barkCount);

  for (let i = 0; i < barkCount; i++) {
    const th = rand() * Math.PI * 2;
    const ph = 0.22 + rand() * (Math.PI - 0.44);
    const r = 0.62;
    dummy.position.set(
      Math.sin(ph) * Math.cos(th) * r * 1.18,
      Math.cos(ph) * r * 0.85,
      Math.sin(ph) * Math.sin(th) * r * 0.95,
    );
    dummy.lookAt(0, 0, 0);
    dummy.rotateZ(rand() * Math.PI);
    dummy.scale.set(
      0.65 + rand() * 0.95,
      0.7 + rand() * 0.85,
      0.65 + rand() * 0.95,
    );
    dummy.updateMatrix();
    barkInst.setMatrixAt(i, dummy.matrix);
  }
  barkInst.instanceMatrix.needsUpdate = true;
  barkInst.computeBoundingSphere();
  group.add(barkInst);

  // Invisible raycast proxy sphere for Hold-to-Inspect
  const hitProxyGeo = new THREE.SphereGeometry(0.95, 16, 16);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'clump';
  group.add(hitProxy);

  const setRevealAndGlow = (reveal: number, glowIntensity: number) => {
    group.visible = reveal > 0.01;
    const scale = (0.35 + 0.65 * reveal) * 0.72;
    group.scale.setScalar(scale);
    for (const mat of materialsToFade) {
      if (mat instanceof THREE.LineBasicMaterial) {
        mat.opacity = reveal * 0.65;
      } else {
        mat.opacity = reveal;
      }
    }
    // Keep emissive near zero at 4a so the clump reads with natural cream cords and white cottony hyphae
    const wideGlow = Math.max(0, (glowIntensity - 0.25) / 0.75);
    cordMat.emissiveIntensity = wideGlow * 0.05;
    hyphaeMat.emissiveIntensity = wideGlow * 0.02;
  };

  return {
    group,
    hitProxy,
    setRevealAndGlow,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/models/mushroomModel.ts">
<![CDATA[import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom } from '../../logic/networkGenerator';

export type MushroomGrowthStage = 'open' | 'half' | 'drumstick';

export interface BuiltMushroomModel {
  group: THREE.Group;
  hitProxy: THREE.Mesh;
  emissiveMaterials: THREE.MeshStandardMaterial[];
  setBioluminescence: (intensity: number) => void;
}

/**
 * Builds a high-craft procedural Macrolepiota procera (Parasol Mushroom)
 * matching the 4 reference specimen photographs:
 * 1. Smooth bulbous base clotted with dark loam soil & short fibrous moss tufts (never a faceted ball)
 * 2. Tall slender cream stem with concentric broken snakeskin brown bands
 * 3. Thick, double-edged, frilled ring (annulus) partway up the stem
 * 4. Cap with dark brown central umbo and concentric rings of raised, curled, pointed 3D brown scale tufts
 * 5. Underneath, 260 very thin, densely packed cream-white radiating gills with deep dark crevices between them
 * Supports `stage: 'open' | 'half' | 'drumstick'` so Chapter 6's fairy ring has varied ages.
 */
export function buildParasolMushroom(
  textures: ProceduralTextureSet,
  seed = 101,
  isHero = true,
  stage: MushroomGrowthStage = 'open',
): BuiltMushroomModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = isHero ? 'HeroParasolMushroom' : `ParasolMushroom_${stage}`;

  const emissiveMaterials: THREE.MeshStandardMaterial[] = [];

  // 1. Smooth bulbous base + tall slender stem (LatheGeometry profile from y=0.0 to y=3.32)
  const stemPoints: THREE.Vector2[] = [];
  const stemSteps = 52;
  for (let i = 0; i <= stemSteps; i++) {
    const t = i / stemSteps;
    const y = t * 3.32;
    let r = 0.105;
    if (t < 0.21) {
      // Smooth organic bulbous base peaking around t = 0.085
      const u = t / 0.21;
      const bulbCurve = Math.sin(u * Math.PI);
      const bottomRound = Math.sqrt(Math.max(0.02, Math.sin(Math.min(1, u * 2.2) * (Math.PI * 0.5))));
      r = (0.12 + 0.31 * Math.pow(bulbCurve, 0.82)) * bottomRound;
    } else {
      // Slender tapering stem from 0.142 above bulb to 0.092 inside collarium
      const shaftT = (t - 0.21) / 0.79;
      r = 0.142 * (1 - shaftT * 0.35);
    }
    stemPoints.push(new THREE.Vector2(r, y));
  }

  const stemGeo = new THREE.LatheGeometry(stemPoints, isHero ? 48 : 28);
  // Subtle smooth organic asymmetry on the bulb without sharp facets
  const posAttr = stemGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    if (vy < 0.72) {
      const ang = Math.atan2(vz, vx);
      const swell = 1 + Math.sin(ang * 3 + vy * 5) * 0.045 + Math.cos(ang * 5 - vy * 7) * 0.03;
      posAttr.setXYZ(i, vx * swell, vy, vz * swell);
    }
  }
  stemGeo.computeVertexNormals();

  const stemMat = new THREE.MeshStandardMaterial({
    map: textures.stemColor,
    bumpMap: textures.stemBump,
    bumpScale: 0.028,
    roughness: 0.84,
    metalness: 0.0,
    emissive: new THREE.Color('#a8cc34'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(stemMat);

  const stemMesh = new THREE.Mesh(stemGeo, stemMat);
  stemMesh.castShadow = true;
  stemMesh.receiveShadow = true;
  group.add(stemMesh);

  // Smooth soil & moss coating shell on the lower bulb (y = 0..0.72)
  const bulbPoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 24; i++) {
    const u = i / 24;
    const y = u * 0.72;
    const bulbCurve = Math.sin(u * Math.PI);
    const bottomRound = Math.sqrt(Math.max(0.02, Math.sin(Math.min(1, u * 2.2) * (Math.PI * 0.5))));
    const r = (0.124 + 0.315 * Math.pow(bulbCurve, 0.82)) * bottomRound;
    bulbPoints.push(new THREE.Vector2(r, y));
  }
  const bulbGeo = new THREE.LatheGeometry(bulbPoints, isHero ? 44 : 24);
  const bPos = bulbGeo.attributes.position;
  for (let i = 0; i < bPos.count; i++) {
    const vx = bPos.getX(i);
    const vy = bPos.getY(i);
    const vz = bPos.getZ(i);
    const ang = Math.atan2(vz, vx);
    const lump = 1 + Math.sin(ang * 4 + vy * 6) * 0.05 + Math.cos(ang * 7 - vy * 9) * 0.035;
    bPos.setXYZ(i, vx * lump, vy, vz * lump);
  }
  bulbGeo.computeVertexNormals();

  const bulbMat = new THREE.MeshStandardMaterial({
    map: textures.bulbColor,
    bumpMap: textures.bulbBump,
    bumpScale: 0.055,
    roughness: 0.94,
    metalness: 0.0,
  });
  const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
  bulbMesh.castShadow = true;
  bulbMesh.receiveShadow = true;
  group.add(bulbMesh);

  // Fine fibrous green moss tufts & organic dark soil crumbs clinging to the bulb
  if (isHero) {
    const tuftCount = 140;
    // Short tapered curved moss filament blade
    const tuftGeo = new THREE.ConeGeometry(0.012, 0.085, 4);
    tuftGeo.translate(0, 0.04, 0);
    const tuftMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
    });
    const tuftInst = new THREE.InstancedMesh(tuftGeo, tuftMat, tuftCount);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < tuftCount; i++) {
      const clusterAngle = (i % 9) * 0.7 + (rand() - 0.5) * 0.38;
      const h = 0.14 + (i % 7) * 0.065 + (rand() - 0.5) * 0.05;
      const u = Math.max(0.05, Math.min(0.95, h / 0.72));
      const rad = (0.12 + 0.31 * Math.pow(Math.sin(u * Math.PI), 0.82)) * 0.98;
      dummy.position.set(Math.cos(clusterAngle) * rad, h, Math.sin(clusterAngle) * rad);
      dummy.lookAt(Math.cos(clusterAngle) * 2, h + 0.4 + rand() * 0.5, Math.sin(clusterAngle) * 2);
      dummy.rotateZ((rand() - 0.5) * 0.6);
      dummy.scale.set(0.8 + rand() * 0.7, 0.6 + rand() * 0.9, 0.8 + rand() * 0.7);
      dummy.updateMatrix();
      tuftInst.setMatrixAt(i, dummy.matrix);

      color.setHSL(0.25 + (rand() - 0.5) * 0.04, 0.46, 0.16 + rand() * 0.09);
      tuftInst.setColorAt(i, color);
    }
    tuftInst.instanceMatrix.needsUpdate = true;
    if (tuftInst.instanceColor) tuftInst.instanceColor.needsUpdate = true;
    tuftInst.computeBoundingSphere();
    group.add(tuftInst);
  }

  // 2. Thick double-edged movable ring (annulus) partway up the stem (y = 2.28)
  const ringGroup = new THREE.Group();
  ringGroup.position.set(0, 2.28, 0);

  const ringPoints: THREE.Vector2[] = [
    new THREE.Vector2(0.112, -0.11),
    new THREE.Vector2(0.26, -0.095),
    new THREE.Vector2(0.33, -0.045),
    new THREE.Vector2(0.26, 0.0),
    new THREE.Vector2(0.32, 0.048),
    new THREE.Vector2(0.24, 0.095),
    new THREE.Vector2(0.112, 0.085),
  ];
  const ringGeo = new THREE.LatheGeometry(ringPoints, isHero ? 56 : 24);
  const rPos = ringGeo.attributes.position;
  const rColors = new Float32Array(rPos.count * 3);
  for (let i = 0; i < rPos.count; i++) {
    const vx = rPos.getX(i);
    const vy = rPos.getY(i);
    const vz = rPos.getZ(i);
    const radial = Math.hypot(vx, vz);
    const ang = Math.atan2(vz, vx);
    if (radial > 0.18) {
      const frill = 1 + Math.sin(ang * 22) * 0.075 + Math.cos(ang * 13) * 0.05 + Math.sin(ang * 37) * 0.025;
      const droop = Math.sin(ang * 17) * 0.016 - (radial - 0.18) * 0.08;
      rPos.setXYZ(i, vx * frill, vy + droop, vz * frill);
    }
    // Warm cream cuff with brown scale rim on the lower double-edge
    const isLowerRim = vy < -0.025 && radial > 0.23 && Math.sin(ang * 14) > 0.1;
    if (isLowerRim) {
      rColors[i * 3 + 0] = 0.44;
      rColors[i * 3 + 1] = 0.31;
      rColors[i * 3 + 2] = 0.21;
    } else {
      const shade = 0.78 + (vy + 0.11) * 0.35;
      rColors[i * 3 + 0] = shade;
      rColors[i * 3 + 1] = shade * 0.94;
      rColors[i * 3 + 2] = shade * 0.85;
    }
  }
  ringGeo.setAttribute('color', new THREE.BufferAttribute(rColors, 3));
  ringGeo.computeVertexNormals();

  const ringMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    vertexColors: true,
    bumpMap: textures.capBump,
    bumpScale: 0.025,
    roughness: 0.88,
    metalness: 0.0,
    emissive: new THREE.Color('#a8cc34'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(ringMat);
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.castShadow = true;
  ringMesh.receiveShadow = true;
  ringGroup.add(ringMesh);
  group.add(ringGroup);

  // 3. Cap profile & radius based on growth stage ('open' parasol, 'half' bell, or 'drumstick' young closed cap)
  const capRadius = stage === 'open' ? 1.48 : stage === 'half' ? 0.96 : 0.48;
  const getCapSurfaceY = (r: number): number => {
    const t = Math.min(1, Math.max(0, r / capRadius));
    if (stage === 'drumstick') {
      return 2.65 + 0.82 * Math.cos(t * Math.PI * 0.52);
    }
    if (stage === 'half') {
      const umbo = 0.14 * Math.exp(-Math.pow(t / 0.22, 2) * 2.0);
      return 2.88 + 0.62 * Math.cos(t * Math.PI * 0.49) + umbo;
    }
    const umboBump = 0.17 * Math.exp(-Math.pow(t / 0.16, 2) * 2.2);
    const mainDome = 0.44 * Math.cos(t * Math.PI * 0.48);
    const rimTuck = t > 0.88 ? -Math.pow((t - 0.88) / 0.12, 2) * 0.065 : 0;
    return 3.08 + mainDome + umboBump + rimTuck;
  };

  const capPoints: THREE.Vector2[] = [];
  const capProfileSteps = 36;
  for (let i = 0; i <= capProfileSteps; i++) {
    const t = i / capProfileSteps;
    const r = t * capRadius;
    const y = getCapSurfaceY(r);
    capPoints.push(new THREE.Vector2(r, y));
  }
  const marginY = getCapSurfaceY(capRadius);
  capPoints.push(new THREE.Vector2(capRadius * 0.97, marginY - 0.02));
  capPoints.push(new THREE.Vector2(0.17, 3.24));
  capPoints.push(new THREE.Vector2(0.10, 3.22));

  const capGeo = new THREE.LatheGeometry(capPoints, isHero ? 64 : 32);
  const capPos = capGeo.attributes.position;
  const capUvs = capGeo.attributes.uv;
  for (let i = 0; i < capPos.count; i++) {
    const vx = capPos.getX(i);
    const vy = capPos.getY(i);
    const vz = capPos.getZ(i);
    const radial = Math.hypot(vx, vz);
    if (radial > capRadius * 0.82) {
      const ang = Math.atan2(vz, vx);
      const fringe =
        1 +
        Math.sin(ang * 31) * 0.018 +
        Math.cos(ang * 19) * 0.014 +
        Math.sin(ang * 53) * 0.008;
      capPos.setXYZ(i, vx * fringe, vy, vz * fringe);
    }
    const u = 0.5 + vx / (capRadius * 2.04);
    const v = 0.5 + vz / (capRadius * 2.04);
    capUvs.setXY(i, u, v);
  }
  capGeo.computeVertexNormals();

  const capMat = new THREE.MeshStandardMaterial({
    map: textures.capColor,
    bumpMap: textures.capBump,
    bumpScale: 0.032,
    roughness: 0.86,
    metalness: 0.0,
    emissive: new THREE.Color('#b8dc3c'),
    emissiveIntensity: 0,
  });
  emissiveMaterials.push(capMat);

  const capMesh = new THREE.Mesh(capGeo, capMat);
  capMesh.castShadow = true;
  capMesh.receiveShadow = true;
  group.add(capMesh);

  // Dark inner cap recess ceiling so looking up in Chapter 2 shows deep dark crevices between the gills
  if (stage !== 'drumstick') {
    const recessGeo = new THREE.ConeGeometry(capRadius * 0.96, 0.18, 48, 1, true);
    const recessMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#1a120b'),
      side: THREE.BackSide,
    });
    const recessMesh = new THREE.Mesh(recessGeo, recessMat);
    recessMesh.position.set(0, 3.16, 0);
    group.add(recessMesh);
  }

  // 4. Real 3D Cap Scales: raised, curled, pointed tufts arranged in concentric rings,
  // densest and darkest near the umbo, sparser toward the shaggy margin
  const ringRadii = isHero
    ? [0.22, 0.30, 0.39, 0.49, 0.60, 0.72, 0.85, 0.99, 1.13, 1.27, 1.39]
    : [0.24, 0.42, 0.64, 0.88, 1.14, 1.34].map((r) => r * (capRadius / 1.48));
  const ringCounts = isHero
    ? [28, 32, 36, 38, 38, 36, 34, 30, 26, 22, 18]
    : [14, 16, 18, 16, 14, 12];

  const totalScales = ringCounts.reduce((acc, n) => acc + n, 0);

  // Build a custom sculpted 3D curled, pointed tuft geometry
  // Root sits flush on the cap at z = -0.045; body arches and tapers to a curled pointed tip at z = +0.055
  const scaleGeo = new THREE.BoxGeometry(0.088, 0.022, 0.095, 4, 2, 5);
  const sPos = scaleGeo.attributes.position;
  for (let i = 0; i < sPos.count; i++) {
    const sx = sPos.getX(i);
    const sy = sPos.getY(i);
    const sz = sPos.getZ(i); // -0.0475 (inner root) to +0.0475 (outer tip)
    const u = (sz + 0.0475) / 0.095; // 0 at root, 1 at pointed outer tip
    // Taper width to a pointed tuft tip at u = 1, with subtle ragged fibril serration
    const taperX = (1 - Math.pow(u, 1.35) * 0.82) * (1 + Math.sin(u * 9) * 0.08);
    // Curl upward strongly toward the tip so each scale reads as a raised 3D curled squamule tuft
    const curlY = Math.pow(u, 2.1) * 0.038;
    // Thin the vertical thickness toward the pointed tip
    const thicknessScale = 1 - u * 0.55;
    // Slight dorsal ridge along the center line (sx = 0)
    const ridgeY = (1 - Math.pow(sx / 0.044, 2)) * 0.008;
    sPos.setXYZ(i, sx * taperX, sy * thicknessScale + curlY + ridgeY, sz);
  }
  scaleGeo.computeVertexNormals();

  const scaleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    bumpMap: textures.capBump,
    bumpScale: 0.035,
    roughness: 0.9,
    metalness: 0.0,
  });

  const scalesInst = new THREE.InstancedMesh(scaleGeo, scaleMat, totalScales);
  scalesInst.castShadow = true;
  scalesInst.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const scaleColor = new THREE.Color();
  let scaleIdx = 0;

  for (let rIdx = 0; rIdx < ringRadii.length; rIdx++) {
    const baseR = ringRadii[rIdx];
    const count = ringCounts[rIdx];
    const ringNorm = rIdx / Math.max(1, ringRadii.length - 1);

    for (let k = 0; k < count; k++) {
      const angle =
        (k / count) * Math.PI * 2 +
        (rIdx % 2) * (Math.PI / count) +
        (rand() - 0.5) * 0.07;
      const r = Math.min(capRadius * 0.96, baseR + (rand() - 0.5) * 0.032);
      const y0 = getCapSurfaceY(r);
      const y1 = getCapSurfaceY(Math.min(capRadius, r + 0.03));
      const slopeAngle = Math.atan2(y0 - y1, 0.03);

      dummy.position.set(Math.cos(angle) * r, y0 + 0.005, Math.sin(angle) * r);
      dummy.rotation.set(0, 0, 0);
      dummy.lookAt(
        Math.cos(angle) * (r + 1),
        y0 + 0.005 - Math.tan(slopeAngle),
        Math.sin(angle) * (r + 1),
      );
      // Pitch the curled pointed tuft slightly upward on mid and outer rings
      dummy.rotateX(-0.08 - ringNorm * 0.12 - rand() * 0.08);

      const wScale = (0.72 + Math.sin(ringNorm * Math.PI) * 0.65) * (0.82 + rand() * 0.36);
      const hScale = (0.95 + (1 - ringNorm * 0.3) * 0.45) * (0.85 + rand() * 0.35);
      const lScale = (0.68 + ringNorm * 0.68) * (0.85 + rand() * 0.32);
      dummy.scale.set(wScale, hScale, lScale);
      dummy.updateMatrix();
      scalesInst.setMatrixAt(scaleIdx, dummy.matrix);

      // Densest and darkest umber near the umbo, warm medium brown outward
      const lightness = 0.14 + ringNorm * 0.11 + (rand() - 0.5) * 0.035;
      scaleColor.setHSL(0.072, 0.42, lightness);
      scalesInst.setColorAt(scaleIdx, scaleColor);
      scaleIdx++;
    }
  }
  scalesInst.instanceMatrix.needsUpdate = true;
  if (scalesInst.instanceColor) scalesInst.instanceColor.needsUpdate = true;
  scalesInst.computeBoundingSphere();
  group.add(scalesInst);

  // 5. Very thin, densely packed cream-white radiating gills (lamellae) with visible dark depth between them
  if (stage !== 'drumstick') {
    const gillCount = isHero ? 260 : 84;
    // Thin 3D blade geometry (x in [0..1] radial length, y height, z thin blade thickness)
    const gillGeo = new THREE.BoxGeometry(1.0, 0.11, 0.0042, 8, 3, 1);
    const gPos = gillGeo.attributes.position;
    const gColors = new Float32Array(gPos.count * 3);
    for (let i = 0; i < gPos.count; i++) {
      const gx = gPos.getX(i) + 0.5; // 0 (inner collarium) to 1 (outer cap margin)
      const gy = gPos.getY(i); // -0.055 (lower exposed edge) to +0.055 (upper root inside cap)
      const gz = gPos.getZ(i);

      const archCurve = Math.sin(gx * Math.PI) * 0.036;
      const endTaper = Math.sin(gx * Math.PI);
      // Slight natural organic waviness along the thin gill blade
      const waveZ = Math.sin(gx * Math.PI * 3) * 0.0018;
      gPos.setXYZ(i, gx, gy * (0.32 + 0.68 * endTaper) + archCurve, gz + waveZ);

      // Deep ambient-occlusion shadow gradient from top root (0.14 dark umber) to lower edge (0.76 warm cream)
      // Ensures visible depth between gills and prevents Chapter 2 from blowing out to white
      const heightNorm = (gy + 0.055) / 0.11; // 0 at bottom blade edge, 1 at top root in cap ceiling
      const radialFade = 1 - Math.pow(gx - 0.45, 2) * 0.35;
      const shade = (0.76 * (1 - Math.pow(heightNorm, 0.75) * 0.78)) * radialFade;
      gColors[i * 3 + 0] = shade;
      gColors[i * 3 + 1] = shade * 0.93;
      gColors[i * 3 + 2] = shade * 0.82;
    }
    gillGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));
    gillGeo.computeVertexNormals();

    const gillMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      vertexColors: true,
      roughness: 0.86,
      metalness: 0.0,
      emissive: new THREE.Color('#b8dc3c'),
      emissiveIntensity: 0,
    });
    emissiveMaterials.push(gillMat);

    const gillsInst = new THREE.InstancedMesh(gillGeo, gillMat, gillCount);
    const gillColor = new THREE.Color();

    for (let i = 0; i < gillCount; i++) {
      const angle = (i / gillCount) * Math.PI * 2;
      // 3 tiers of lamellae: primary full-length from free collarium ring, secondary, and short marginal lamellulae
      const tier = i % 4;
      const innerR = (tier === 0 ? 0.185 : tier === 2 ? 0.38 : 0.66) * (capRadius / 1.48);
      const outerR = capRadius * 0.96;
      const bladeLen = Math.max(0.1, outerR - innerR);

      const innerY = 3.16 - ((innerR - 0.185) / capRadius) * 0.06;
      const outerY = marginY;
      const tilt = Math.atan2(outerY - innerY, bladeLen);

      dummy.position.set(Math.cos(angle) * innerR, innerY, Math.sin(angle) * innerR);
      dummy.rotation.set(0, -angle, tilt);
      dummy.scale.set(bladeLen, 0.88 + (i % 3) * 0.09, 1);
      dummy.updateMatrix();
      gillsInst.setMatrixAt(i, dummy.matrix);

      // Alternating micro-contrast between adjacent gill blades so all 260 gills resolve crisply
      const tone = i % 2 === 0 ? 0.96 : 0.78;
      gillColor.setRGB(tone, tone * 0.96, tone * 0.9);
      gillsInst.setColorAt(i, gillColor);
    }
    gillsInst.instanceMatrix.needsUpdate = true;
    if (gillsInst.instanceColor) gillsInst.instanceColor.needsUpdate = true;
    gillsInst.computeBoundingSphere();
    group.add(gillsInst);
  }

  // Invisible raycast proxy cylinder for Hold-to-Inspect pointer picking
  const hitProxyGeo = new THREE.CylinderGeometry(1.5, 0.9, 3.8, 16);
  hitProxyGeo.translate(0, 1.9, 0);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'mushroom';
  group.add(hitProxy);

  const setBioluminescence = (intensity: number) => {
    for (const mat of emissiveMaterials) {
      mat.emissiveIntensity = intensity;
    }
  };

  return {
    group,
    hitProxy,
    emissiveMaterials,
    setBioluminescence,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/models/productFamily.ts">
<![CDATA[import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';

export interface BuiltProductFamily {
  group: THREE.Group;
  updateFamily: (slideProgress: number, studioLightness: number, inspectStrength: number) => void;
}

/**
 * Builds the Chapter 05 "Any Shape" supporting cast of grown mycelium packaging forms:
 * 1. L-shaped Corner Protector (back-left on the studio sweep)
 * 2. Cylindrical Bottle Shipper with moulded cradle (back-right on the studio sweep)
 * 3. Ribbed Transit Cushion Cap (further back-center-right on the sweep)
 *
 * Uses the same matte warm cream speckled mycelium material as the hero tray, positioned further back
 * on the sweep so they read as supporting cast ("one material in many moulds") and slide smoothly
 * into place with scroll (`productFamilySlide`).
 */
export function buildProductFamily(textures: ProceduralTextureSet): BuiltProductFamily {
  const group = new THREE.Group();
  group.name = 'Chapter5ProductFamily';
  group.position.set(0, -5.45, 0);

  // Shared matte cream speckled mycelium material for the supporting family
  const familyMat = new THREE.MeshPhysicalMaterial({
    map: textures.traySkinColor,
    bumpMap: textures.traySkinBump,
    bumpScale: 0.014,
    color: new THREE.Color('#f4eee2'),
    roughness: 0.91,
    metalness: 0.0,
    sheen: 0.52,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#fffcf5'),
    transparent: true,
    opacity: 0,
  });

  // Soft radial contact shadow texture for each supporting piece
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(64, 64, 8, 64, 64, 60);
  grad.addColorStop(0.0, 'rgba(38, 28, 18, 0.42)');
  grad.addColorStop(0.55, 'rgba(46, 35, 24, 0.18)');
  grad.addColorStop(1.0, 'rgba(46, 35, 24, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;

  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 1: L-Shaped Corner Protector (Back-left on the studio sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const cornerGroup = new THREE.Group();
  const lShape = new THREE.Shape();
  lShape.moveTo(0, 0);
  lShape.lineTo(0.68, 0);
  lShape.lineTo(0.68, 0.22);
  lShape.lineTo(0.22, 0.22);
  lShape.lineTo(0.22, 0.68);
  lShape.lineTo(0, 0.68);
  lShape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.56,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.04,
    bevelSegments: 5,
  };
  const cornerLGeo = new THREE.ExtrudeGeometry(lShape, extrudeSettings);
  cornerLGeo.center();
  const cornerLMesh = new THREE.Mesh(cornerLGeo, familyMat);
  cornerLMesh.castShadow = true;
  cornerLMesh.receiveShadow = true;
  cornerGroup.add(cornerLMesh);

  // Inner corner gusset pad (3-axis corner block detail)
  const gussetGeo = new THREE.BoxGeometry(0.24, 0.24, 0.20);
  const gussetMesh = new THREE.Mesh(gussetGeo, familyMat);
  gussetMesh.position.set(-0.10, -0.10, 0.14);
  cornerGroup.add(gussetMesh);

  // Cushioning rib indentations on the outer leg
  const ribGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.48, 12);
  const rib1 = new THREE.Mesh(ribGeo, familyMat);
  rib1.position.set(0.12, -0.22, 0);
  rib1.rotation.x = Math.PI / 2;
  cornerGroup.add(rib1);

  const cornerShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.15), shadowMat);
  cornerShadow.rotation.x = -Math.PI / 2;
  cornerShadow.position.set(-1.95, -0.508, -1.28);
  group.add(cornerShadow);

  cornerGroup.scale.setScalar(0.76);
  cornerGroup.rotation.set(0.08, 0.52, -0.04);
  group.add(cornerGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 2: Bottle Shipper Block with Cylindrical Cradle (Back-right on sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const shipperGroup = new THREE.Group();
  // Cross-section profile of a rectangular block with a deep semi-cylindrical bottle cradle on top
  const shipperShape = new THREE.Shape();
  const sw = 0.48;
  const sh = 0.28;
  const cradleR = 0.24;
  shipperShape.moveTo(-sw, -sh);
  shipperShape.lineTo(sw, -sh);
  shipperShape.lineTo(sw, sh);
  shipperShape.lineTo(cradleR, sh);
  // Semi-circular bottle cradle arc
  shipperShape.absarc(0, sh, cradleR, 0, Math.PI, true);
  shipperShape.lineTo(-sw, sh);
  shipperShape.closePath();

  const shipperGeo = new THREE.ExtrudeGeometry(shipperShape, {
    steps: 1,
    depth: 0.92,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.038,
    bevelSegments: 5,
  });
  shipperGeo.center();
  const shipperMesh = new THREE.Mesh(shipperGeo, familyMat);
  shipperMesh.castShadow = true;
  shipperMesh.receiveShadow = true;
  shipperGroup.add(shipperMesh);

  // Neck support collar bridge near the front end of the bottle shipper
  const collarBridgeGeo = new THREE.TorusGeometry(0.19, 0.048, 12, 24, Math.PI);
  collarBridgeGeo.rotateX(Math.PI);
  const collarBridge = new THREE.Mesh(collarBridgeGeo, familyMat);
  collarBridge.position.set(0, 0.12, 0.34);
  shipperGroup.add(collarBridge);

  const shipperShadow = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.35), shadowMat);
  shipperShadow.rotation.x = -Math.PI / 2;
  shipperShadow.position.set(1.92, -0.508, -1.22);
  group.add(shipperShadow);

  shipperGroup.scale.setScalar(0.78);
  shipperGroup.rotation.set(0.05, -0.58, 0.02);
  group.add(shipperGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // Piece 3: Moulded Circular Jar Cushion Cap (Back-center-right on sweep)
  // ─────────────────────────────────────────────────────────────────────────
  const capPodGroup = new THREE.Group();
  const lathePts: THREE.Vector2[] = [
    new THREE.Vector2(0.0, -0.10),
    new THREE.Vector2(0.32, -0.10),
    new THREE.Vector2(0.38, -0.04),
    new THREE.Vector2(0.38, 0.12),
    new THREE.Vector2(0.30, 0.16),
    new THREE.Vector2(0.24, 0.02),
    new THREE.Vector2(0.0, 0.02),
  ];
  const capPodGeo = new THREE.LatheGeometry(lathePts, 36);
  const capPodMesh = new THREE.Mesh(capPodGeo, familyMat);
  capPodMesh.castShadow = true;
  capPodMesh.receiveShadow = true;
  capPodGroup.add(capPodMesh);

  const capPodShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.95), shadowMat);
  capPodShadow.rotation.x = -Math.PI / 2;
  capPodShadow.position.set(0.92, -0.508, -1.78);
  group.add(capPodShadow);

  capPodGroup.scale.setScalar(0.75);
  capPodGroup.rotation.set(0.18, 0.3, -0.12);
  group.add(capPodGroup);

  const updateFamily = (
    slideProgress: number,
    studioLightness: number,
    inspectStrength: number,
  ) => {
    const vis = slideProgress * studioLightness * (1 - inspectStrength * 0.72);
    group.visible = vis > 0.01;
    if (!group.visible) return;

    const ease = 1 - Math.pow(1 - slideProgress, 3);
    familyMat.opacity = Math.min(1, vis * 1.05);
    shadowMat.opacity = vis * 0.65;

    // Slide smoothly into place from slightly further out & back on the studio sweep
    cornerGroup.position.set(
      -1.95 - (1 - ease) * 0.55,
      -0.21 + (1 - ease) * 0.14,
      -1.28 - (1 - ease) * 0.45,
    );
    cornerShadow.position.x = cornerGroup.position.x;
    cornerShadow.position.z = cornerGroup.position.z;

    shipperGroup.position.set(
      1.92 + (1 - ease) * 0.55,
      -0.25 + (1 - ease) * 0.14,
      -1.22 - (1 - ease) * 0.45,
    );
    shipperShadow.position.x = shipperGroup.position.x;
    shipperShadow.position.z = shipperGroup.position.z;

    capPodGroup.position.set(
      0.92 + (1 - ease) * 0.35,
      -0.38 + (1 - ease) * 0.16,
      -1.78 - (1 - ease) * 0.5,
    );
    capPodShadow.position.x = capPodGroup.position.x;
    capPodShadow.position.z = capPodGroup.position.z;
  };

  return {
    group,
    updateFamily,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/models/studioSet.ts">
<![CDATA[import * as THREE from 'three';

export interface BuiltStudioSet {
  group: THREE.Group;
  sweepMesh: THREE.Mesh;
  plinthMesh: THREE.Mesh;
  contactShadowMesh: THREE.Mesh;
  updateStudio: (studioLightness: number, inspectStrength: number) => void;
}

/**
 * Builds the Chapter 05 Product Photography Studio Set at y ≈ -5.45:
 * - A seamless cream/sand paper sweep (floor curving smoothly up into a tall backdrop with zero visible horizon line)
 * - A low, matte, slightly warmer sand-stone plinth beneath the hero tray
 * - A soft multi-zone contact shadow directly beneath the tray and plinth
 * - Scrubbed smoothly from 0 -> 1 by `studioLightness` so the darkness lifts as the solid tray resolves,
 *   and dims cleanly on exit toward Chapter 06.
 */
export function buildStudioSet(): BuiltStudioSet {
  const group = new THREE.Group();
  group.name = 'Chapter5ProductStudioSet';
  group.position.set(0, -5.45, 0);

  // 1. Seamless Cyclorama Paper Sweep Geometry
  //    Floor at local y = -0.52 from z = +4.5 back to z = -1.1,
  //    curving smoothly up with radius R = 2.45 into a vertical backdrop at z = -3.55 rising to y = +6.5.
  const widthSegments = 48;
  const lengthSegments = 64;
  const sweepWidth = 22.0;

  const sweepPositions: number[] = [];
  const sweepUvs: number[] = [];
  const sweepIndices: number[] = [];

  const floorZStart = 4.6;
  const curveZStart = -0.95;
  const curveRadius = 2.55;
  const topYEnd = 6.8;

  const floorLen = floorZStart - curveZStart; // 5.55
  const arcLen = (Math.PI * 0.5) * curveRadius; // ~4.00
  const wallLen = topYEnd - (-0.52 + curveRadius); // ~4.77
  const totalLen = floorLen + arcLen + wallLen;

  for (let iy = 0; iy <= lengthSegments; iy++) {
    const v = iy / lengthSegments;
    const s = v * totalLen;

    let py = -0.52;
    let pz = floorZStart;

    if (s <= floorLen) {
      py = -0.52;
      pz = floorZStart - s;
    } else if (s <= floorLen + arcLen) {
      const arcS = s - floorLen;
      const theta = (arcS / arcLen) * (Math.PI * 0.5);
      py = -0.52 + curveRadius * (1 - Math.cos(theta));
      pz = curveZStart - curveRadius * Math.sin(theta);
    } else {
      const wallS = s - floorLen - arcLen;
      py = -0.52 + curveRadius + wallS;
      pz = curveZStart - curveRadius;
    }

    for (let ix = 0; ix <= widthSegments; ix++) {
      const u = ix / widthSegments;
      const px = (u - 0.5) * sweepWidth;
      sweepPositions.push(px, py, pz);
      sweepUvs.push(u, v);
    }
  }

  for (let iy = 0; iy < lengthSegments; iy++) {
    for (let ix = 0; ix < widthSegments; ix++) {
      const a = iy * (widthSegments + 1) + ix;
      const b = a + 1;
      const c = (iy + 1) * (widthSegments + 1) + ix;
      const d = c + 1;
      sweepIndices.push(a, b, c, b, d, c);
    }
  }

  const sweepGeo = new THREE.BufferGeometry();
  sweepGeo.setAttribute('position', new THREE.Float32BufferAttribute(sweepPositions, 3));
  sweepGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sweepUvs, 2));
  sweepGeo.setIndex(sweepIndices);
  sweepGeo.computeVertexNormals();

  // Custom shader for the seamless paper sweep so it transitions smoothly from subterranean dark
  // to a warm, soft-lit cream/sand studio paper sweep with upper-left key light gradient and zero horizon line.
  const sweepMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    uniforms: {
      uStudioLightness: { value: 0 },
      uInspectStrength: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vLocalPos;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vLocalPos = position;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uStudioLightness;
      uniform float uInspectStrength;
      varying vec2 vUv;
      varying vec3 vLocalPos;
      varying vec3 vNormal;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        // Warm cream/sand studio paper palette (never clips to pure white)
        vec3 keyPaper = vec3(0.925, 0.894, 0.835);   // #ece4d5 soft warm cream in upper-left key light
        vec3 midPaper = vec3(0.878, 0.839, 0.768);   // #e0d6c4 warm sand neutral
        vec3 shadePaper = vec3(0.804, 0.757, 0.678); // #cdc1ad gentle studio falloff

        // Soft large key light pool from upper-left (-x, +y)
        vec2 keyCenter = vec2(0.36, 0.42);
        float keyDist = length((vUv - keyCenter) * vec2(1.15, 0.95));
        float keyPool = 1.0 - smoothstep(0.05, 0.78, keyDist);

        // Seamless vertical cove gradient
        float coveShade = smoothstep(0.18, 0.55, vUv.y) * (1.0 - smoothstep(0.55, 0.92, vUv.y)) * 0.14;

        vec3 studioCol = mix(shadePaper, midPaper, smoothstep(0.95, 0.25, keyDist));
        studioCol = mix(studioCol, keyPaper, keyPool * 0.68);
        studioCol -= vec3(coveShade * 0.28);

        // Soft ambient contact darkening under the hero tray center (x ≈ 0, z ≈ 0)
        float trayFloorDist = length(vLocalPos.xz * vec2(0.56, 0.82));
        float floorMask = 1.0 - smoothstep(-0.48, -0.35, vLocalPos.y);
        float trayBounceShadow = (1.0 - smoothstep(0.2, 1.85, trayFloorDist)) * floorMask * 0.12;
        studioCol *= (1.0 - trayBounceShadow);

        // Subtle fine matte paper fibre grain
        float grain = (hash(vLocalPos.xz * 42.0 + vLocalPos.xy * 31.0) - 0.5) * 0.012;
        studioCol += grain;

        // Scrub between subterranean dark (#070504) and the warm lit studio paper sweep
        vec3 darkSubterranean = vec3(0.028, 0.022, 0.018);
        vec3 finalCol = mix(darkSubterranean, studioCol, uStudioLightness);

        gl_FragColor = vec4(finalCol, smoothstep(0.01, 0.18, uStudioLightness));
      }
    `,
  });

  const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
  sweepMesh.receiveShadow = true;
  group.add(sweepMesh);

  // 2. Low, matte, slightly darker warm travertine/sand plinth beneath the hero tray
  const plinthGeo = new THREE.CylinderGeometry(1.56, 1.62, 0.065, 64);
  plinthGeo.scale(1.18, 1.0, 0.82);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c5b7a1'),
    roughness: 0.96,
    metalness: 0.0,
    transparent: true,
    opacity: 0,
  });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.position.set(0.0, -0.485, 0.02);
  plinthMesh.receiveShadow = true;
  group.add(plinthMesh);

  // 3. Soft radial contact shadow under the hero tray (on top of the plinth & sweep floor)
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d')!;
  const grad = sCtx.createRadialGradient(128, 128, 14, 128, 128, 122);
  grad.addColorStop(0.0, 'rgba(28, 20, 12, 0.65)');
  grad.addColorStop(0.42, 'rgba(38, 28, 18, 0.38)');
  grad.addColorStop(0.75, 'rgba(48, 36, 24, 0.12)');
  grad.addColorStop(1.0, 'rgba(48, 36, 24, 0.0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  shadowTex.colorSpace = THREE.SRGBColorSpace;

  const contactShadowGeo = new THREE.PlaneGeometry(3.25, 2.25);
  contactShadowGeo.rotateX(-Math.PI / 2);
  const contactShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
  contactShadowMesh.position.set(0.05, -0.448, 0.04);
  contactShadowMesh.rotation.y = -0.46;
  group.add(contactShadowMesh);

  const updateStudio = (studioLightness: number, inspectStrength: number) => {
    const visible = studioLightness > 0.01;
    group.visible = visible;
    if (!visible) return;

    sweepMat.uniforms.uStudioLightness.value = studioLightness;
    sweepMat.uniforms.uInspectStrength.value = inspectStrength;

    // Fade the low plinth and contact shadow smoothly with studioLightness;
    // slightly soften plinth during 360-degree Hold-to-Inspect rotation so the tray never intersects it
    const inspectFade = 1 - inspectStrength * 0.85;
    plinthMat.opacity = studioLightness * 0.94 * inspectFade;
    plinthMesh.position.y = -0.485 - inspectStrength * 0.18;

    contactShadowMat.opacity = studioLightness * 0.86 * (1 - inspectStrength * 0.55);
    contactShadowMesh.position.y = -0.448 - inspectStrength * 0.18;
  };

  return {
    group,
    sweepMesh,
    plinthMesh,
    contactShadowMesh,
    updateStudio,
  };
}
]]>
    </file>
    <file path="src/app/(loam)/loam/scene/models/trayModel.ts">
<![CDATA[import * as THREE from 'three';
import type { ProceduralTextureSet } from '../textures';
import { createSeededRandom, generateTrayMorphCoordinates } from '../../logic/networkGenerator';

export interface BuiltTrayModel {
  group: THREE.Group;
  solidTrayGroup: THREE.Group;
  morphPoints: THREE.Points;
  hitProxy: THREE.Mesh;
  updateMorphAndOpacity: (
    morphProgress: number,
    solidOpacity: number,
    elapsedSec: number,
    fragileSettle?: number,
    foxfireGlowFade?: number,
  ) => void;
}

/**
 * Evaluates the molded packaging tray height and thickness at local (x, z)
 * matching `material-top_9cdf4064.png` and `material-underside-and-cut-edge_69208517.png`:
 * - Rounded rectangular outer perimeter with a soft rolled flange lip
 * - Smooth drafted walls descending into a recessed inner cavity with a subtle bottom stacking ridge
 * - One irregular broken front-right corner exposing the coarse fibrous hemp + mycelium core
 */
function sampleTrayCrossSection(x: number, z: number): {
  topY: number;
  bottomY: number;
  insideOuter: boolean;
  inBrokenCut: boolean;
} {
  const halfW = 1.32;
  const halfD = 0.86;
  const cornerR = 0.30;

  const qx = Math.abs(x) - (halfW - cornerR);
  const qz = Math.abs(z) - (halfD - cornerR);
  const outDist =
    Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) +
    Math.min(Math.max(qx, qz), 0) -
    cornerR;

  if (outDist > 0) {
    return { topY: 0, bottomY: 0, insideOuter: false, inBrokenCut: false };
  }

  // Organic bite-like broken corner across the front-right corner (x > 0.38, z > 0.18)
  const jag =
    Math.sin(x * 17 - z * 14) * 0.028 + Math.cos(x * 33 + z * 27) * 0.015;
  const cutDist = Math.hypot((x - 1.16) * 0.88, (z - 0.74) * 1.05) + jag;
  const inBrokenCut = cutDist < 0.62;

  const wallThickness = 0.15;
  let topY = -0.22;
  let bottomY = topY - wallThickness;

  if (outDist > -0.14) {
    // Softly rolled perimeter lip
    const u = (outDist + 0.14) / 0.14; // 0 at inner lip edge, 1 at outer rim
    const lipArch = Math.sin(u * Math.PI) * 0.036;
    const outerRoll = u > 0.65 ? -Math.pow((u - 0.65) / 0.35, 2) * 0.045 : 0;
    topY = 0.23 + lipArch + outerRoll;
    bottomY = 0.09 + lipArch * 0.5 + outerRoll;
  } else if (outDist > -0.38) {
    // Smooth drafted wall transition
    const wt = (outDist + 0.38) / 0.24; // 0 at cavity floor, 1 at lip inner edge
    const smoothW = wt * wt * (3 - 2 * wt);
    topY = -0.22 + smoothW * 0.45;
    bottomY = topY - wallThickness;
  } else {
    // Recessed cavity floor with subtle molded stacking ridge
    const ridgeBand = outDist < -0.45 && outDist > -0.52 ? 0.016 : 0;
    const innerPad = outDist <= -0.52 ? 0.012 : 0;
    topY = -0.22 + ridgeBand + innerPad;
    bottomY = -0.37 + ridgeBand + innerPad;
  }

  return { topY, bottomY, insideOuter: true, inBrokenCut };
}

/**
 * Builds the Chapter 5 Molded Mycelium Packaging Tray, nestled fragile glass perfume flacon,
 * and scrub-able thread convergence morph:
 * - Rounded rectangle with soft edges, recessed cavity, and rolled lip
 * - Matte off-white to warm cream mycelium skin with faint velvety fuzz (sheen at grazing angles)
 *   and scattered small brown fibre speckles
 * - One broken front-right corner revealing the dense fibrous hemp + mycelium core
 * - A precious, fragile glass perfume bottle with stopper nestled inside the cavity that settles with scroll
 * - Glowing incoming threads that converge into the tray and fade out completely once the studio is lit
 */
export function buildPackagingTray(
  textures: ProceduralTextureSet,
  seed = 505,
  isSoftwareGl = false,
): BuiltTrayModel {
  const rand = createSeededRandom(seed);
  const group = new THREE.Group();
  group.name = 'PackagingTraySpecimen';

  const solidTrayGroup = new THREE.Group();
  group.add(solidTrayGroup);

  const gridX = 96;
  const gridZ = 68;
  const minX = -1.34;
  const maxX = 1.34;
  const minZ = -0.88;
  const maxZ = 0.88;

  const positions: number[] = [];
  const uvs: number[] = [];
  const skinIndices: number[] = [];
  const coreIndices: number[] = [];

  const topVertexGrid: number[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(-1),
  );
  const botVertexGrid: number[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(-1),
  );
  const validCellGrid: boolean[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(false),
  );
  const cutCellGrid: boolean[][] = Array.from({ length: gridZ + 1 }, () =>
    new Array(gridX + 1).fill(false),
  );

  let vertCount = 0;

  for (let iz = 0; iz <= gridZ; iz++) {
    const z = minZ + (iz / gridZ) * (maxZ - minZ);
    for (let ix = 0; ix <= gridX; ix++) {
      const x = minX + (ix / gridX) * (maxX - minX);
      const sample = sampleTrayCrossSection(x, z);
      if (sample.insideOuter && !sample.inBrokenCut) {
        validCellGrid[iz][ix] = true;
        const u = (x - minX) / (maxX - minX);
        const v = (z - minZ) / (maxZ - minZ);

        topVertexGrid[iz][ix] = vertCount++;
        positions.push(x, sample.topY, z);
        uvs.push(u, v);

        botVertexGrid[iz][ix] = vertCount++;
        positions.push(x, sample.bottomY, z);
        // Offset bottom UVs by wall height so vertical cut faces never stretch a single texel into stripes
        uvs.push(u + 0.14, v + 0.16);
      } else if (sample.insideOuter && sample.inBrokenCut) {
        cutCellGrid[iz][ix] = true;
      }
    }
  }

  // Record all boundary coordinates along the broken cut face so 3D hemp hurd fibres pack across the entire cut
  const cutEdgeSamples: Array<{ x: number; z: number; topY: number; bottomY: number }> = [];

  for (let iz = 0; iz < gridZ; iz++) {
    for (let ix = 0; ix < gridX; ix++) {
      const v00 = validCellGrid[iz][ix];
      const v10 = validCellGrid[iz][ix + 1];
      const v01 = validCellGrid[iz + 1][ix];
      const v11 = validCellGrid[iz + 1][ix + 1];

      if (v00 && v10 && v01 && v11) {
        const t00 = topVertexGrid[iz][ix];
        const t10 = topVertexGrid[iz][ix + 1];
        const t01 = topVertexGrid[iz + 1][ix];
        const t11 = topVertexGrid[iz + 1][ix + 1];
        skinIndices.push(t00, t01, t10, t10, t01, t11);

        const b00 = botVertexGrid[iz][ix];
        const b10 = botVertexGrid[iz][ix + 1];
        const b01 = botVertexGrid[iz + 1][ix];
        const b11 = botVertexGrid[iz + 1][ix + 1];
        skinIndices.push(b00, b10, b01, b10, b11, b01);
      }

      const recordCutVertex = (vIdx: number, bIdx: number) => {
        cutEdgeSamples.push({
          x: positions[vIdx * 3],
          topY: positions[vIdx * 3 + 1],
          bottomY: positions[bIdx * 3 + 1],
          z: positions[vIdx * 3 + 2],
        });
      };

      if (v00 && v10 && !v01) {
        const isCutFace = cutCellGrid[iz + 1][ix] || cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix], botVertexGrid[iz][ix]);
        targetArr.push(
          topVertexGrid[iz][ix],
          botVertexGrid[iz][ix],
          topVertexGrid[iz][ix + 1],
          topVertexGrid[iz][ix + 1],
          botVertexGrid[iz][ix],
          botVertexGrid[iz][ix + 1],
        );
      }
      if (!v00 && v01 && v11) {
        const isCutFace = cutCellGrid[iz][ix] || cutCellGrid[iz][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz + 1][ix], botVertexGrid[iz + 1][ix]);
        targetArr.push(
          topVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz + 1][ix + 1],
          topVertexGrid[iz + 1][ix],
          topVertexGrid[iz + 1][ix],
          botVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz + 1][ix],
        );
      }
      if (v00 && v01 && !v10) {
        const isCutFace = cutCellGrid[iz][ix + 1] || cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix], botVertexGrid[iz][ix]);
        targetArr.push(
          topVertexGrid[iz + 1][ix],
          botVertexGrid[iz + 1][ix],
          topVertexGrid[iz][ix],
          topVertexGrid[iz][ix],
          botVertexGrid[iz + 1][ix],
          botVertexGrid[iz][ix],
        );
      }
      if (!v00 && v10 && v11) {
        const isCutFace = cutCellGrid[iz][ix] || cutCellGrid[iz + 1][ix];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(topVertexGrid[iz][ix + 1], botVertexGrid[iz][ix + 1]);
        targetArr.push(
          topVertexGrid[iz][ix + 1],
          botVertexGrid[iz][ix + 1],
          topVertexGrid[iz + 1][ix + 1],
          topVertexGrid[iz + 1][ix + 1],
          botVertexGrid[iz][ix + 1],
          botVertexGrid[iz + 1][ix + 1],
        );
      }

      if (v00 && v10 && v01 && !v11) {
        const t10 = topVertexGrid[iz][ix + 1];
        const t01 = topVertexGrid[iz + 1][ix];
        const t00 = topVertexGrid[iz][ix];
        skinIndices.push(t00, t01, t10);

        const b10 = botVertexGrid[iz][ix + 1];
        const b01 = botVertexGrid[iz + 1][ix];
        const b00 = botVertexGrid[iz][ix];
        skinIndices.push(b00, b10, b01);

        const isCutFace = cutCellGrid[iz + 1][ix + 1];
        const targetArr = isCutFace ? coreIndices : skinIndices;
        if (isCutFace) recordCutVertex(t10, b10);
        targetArr.push(t01, b01, t10, t10, b01, b10);
      }
    }
  }

  const trayGeo = new THREE.BufferGeometry();
  trayGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  trayGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  const combinedIndices = [...skinIndices, ...coreIndices];
  trayGeo.setIndex(combinedIndices);
  trayGeo.addGroup(0, skinIndices.length, 0);
  trayGeo.addGroup(skinIndices.length, coreIndices.length, 1);
  trayGeo.computeVertexNormals();

  // Matte off-white to warm cream mycelium skin with faint velvety fuzz (grazing-angle sheen)
  // and scattered brown fibre speckles (matches material-top_9cdf4064.png)
  const skinMat = new THREE.MeshPhysicalMaterial({
    map: textures.traySkinColor,
    bumpMap: textures.traySkinBump,
    bumpScale: 0.032,
    color: new THREE.Color('#f4ecde'),
    roughness: 0.87,
    metalness: 0.0,
    sheen: 0.65,
    sheenRoughness: 0.78,
    sheenColor: new THREE.Color('#fffdf9'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  // Coarse fibrous hemp + mycelium cut face (matches material-underside-and-cut-edge_69208517.png)
  const coreMat = new THREE.MeshStandardMaterial({
    map: textures.trayCoreColor,
    bumpMap: textures.trayCoreBump,
    bumpScale: 0.072,
    color: new THREE.Color('#dfd0b8'),
    roughness: 0.96,
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  const trayMesh = new THREE.Mesh(trayGeo, [skinMat, coreMat]);
  trayMesh.castShadow = true;
  trayMesh.receiveShadow = true;
  solidTrayGroup.add(trayMesh);

  // 2. Dense 3D shredded hemp hurd & mycelium slivers packed across the ENTIRE broken corner cross-section
  //    matching `material-underside-and-cut-edge_69208517.png`
  const fibreCount = 680;
  const fibreGeo = new THREE.BoxGeometry(0.056, 0.015, 0.022);
  const fibreMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.95,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
  });
  const fibreInst = new THREE.InstancedMesh(fibreGeo, fibreMat, fibreCount);
  const dummy = new THREE.Object3D();
  const fibreColor = new THREE.Color();

  for (let i = 0; i < fibreCount; i++) {
    const anchor =
      cutEdgeSamples.length > 0
        ? cutEdgeSamples[Math.floor(rand() * cutEdgeSamples.length)]
        : { x: 0.82, z: 0.45, topY: 0.18, bottomY: -0.14 };

    const fx = anchor.x + (rand() - 0.35) * 0.055;
    const fz = anchor.z + (rand() - 0.35) * 0.055;
    const spanY = Math.max(0.06, anchor.topY - anchor.bottomY);
    const fy = anchor.bottomY + 0.012 + rand() * (spanY - 0.022);

    dummy.position.set(fx, fy, fz);
    dummy.rotation.set(
      (rand() - 0.5) * 1.15,
      rand() * Math.PI * 2,
      (rand() - 0.5) * 1.15,
    );
    dummy.scale.set(
      0.55 + rand() * 1.15,
      0.55 + rand() * 0.95,
      0.55 + rand() * 1.05,
    );
    dummy.updateMatrix();
    fibreInst.setMatrixAt(i, dummy.matrix);

    const toneRoll = rand();
    if (toneRoll > 0.58) {
      // Unbleached cream mycelium binder strand
      fibreColor.setRGB(0.94, 0.90, 0.82);
    } else if (toneRoll > 0.22) {
      // Warm straw/tan hemp hurd splinter
      fibreColor.setRGB(0.80, 0.68, 0.52);
    } else {
      // Darker woody core fleck
      fibreColor.setRGB(0.60, 0.46, 0.31);
    }
    fibreInst.setColorAt(i, fibreColor);
  }
  fibreInst.count = fibreCount;
  fibreInst.instanceMatrix.needsUpdate = true;
  if (fibreInst.instanceColor) fibreInst.instanceColor.needsUpdate = true;
  fibreInst.computeBoundingSphere();
  solidTrayGroup.add(fibreInst);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. "SHOW IT DOING ITS JOB": Fragile Glass Perfume Bottle with Stopper
  //    Nestled inside the tray's cavity, settling gently with scroll and staying
  //    inside the tray during Hold-to-Inspect rotation.
  // ─────────────────────────────────────────────────────────────────────────
  const perfumeBottleGroup = new THREE.Group();
  perfumeBottleGroup.name = 'NestledGlassPerfumeBottle';

  // Soft moulded cradle shadow directly beneath the bottle on the cavity floor
  const cradleShadowCanvas = document.createElement('canvas');
  cradleShadowCanvas.width = 128;
  cradleShadowCanvas.height = 128;
  const csCtx = cradleShadowCanvas.getContext('2d')!;
  const csGrad = csCtx.createRadialGradient(64, 64, 8, 64, 64, 60);
  csGrad.addColorStop(0.0, 'rgba(46, 35, 22, 0.52)');
  csGrad.addColorStop(0.55, 'rgba(62, 48, 32, 0.24)');
  csGrad.addColorStop(1.0, 'rgba(62, 48, 32, 0.0)');
  csCtx.fillStyle = csGrad;
  csCtx.fillRect(0, 0, 128, 128);
  const cradleShadowTex = new THREE.CanvasTexture(cradleShadowCanvas);
  cradleShadowTex.colorSpace = THREE.SRGBColorSpace;

  const cradleShadowMat = new THREE.MeshBasicMaterial({
    map: cradleShadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const cradleShadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 0.78),
    cradleShadowMat,
  );
  cradleShadowMesh.rotation.x = -Math.PI / 2;
  cradleShadowMesh.position.set(-0.08, -0.188, -0.02);
  solidTrayGroup.add(cradleShadowMesh);

  // Moulded mycelium side-cradle ribs that hug the perfume bottle in the cavity
  const cradleRibGeo = new THREE.BoxGeometry(0.14, 0.08, 0.72);
  const leftCradleRib = new THREE.Mesh(cradleRibGeo, skinMat);
  leftCradleRib.position.set(-0.46, -0.15, -0.02);
  solidTrayGroup.add(leftCradleRib);

  const rightCradleRib = new THREE.Mesh(cradleRibGeo, skinMat);
  rightCradleRib.position.set(0.16, -0.15, -0.02);
  solidTrayGroup.add(rightCradleRib);

  // Refractive optical glass material (with clean translucent fallback on software WebGL)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e6ede8'),
    metalness: 0.05,
    roughness: 0.07,
    transmission: isSoftwareGl ? 0 : 0.78,
    transparent: true,
    opacity: isSoftwareGl ? 0.62 : 0.96,
    ior: 1.52,
    thickness: 0.55,
    attenuationColor: new THREE.Color('#dfe8dc'),
    attenuationDistance: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 0.95,
  });

  // Warm cognac-amber botanical parfum liquid inside the flacon
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#c97f22'),
    metalness: 0.02,
    roughness: 0.14,
    transparent: true,
    opacity: 0.90,
    clearcoat: 0.6,
  });

  // Brushed warm brass atomizer collar
  const brassMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#be984e'),
    metalness: 0.84,
    roughness: 0.24,
    transparent: true,
    opacity: 1,
  });

  // Apothecary paper label with fine dark typography lines
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 160;
  const lbCtx = labelCanvas.getContext('2d')!;
  lbCtx.fillStyle = '#f6f1e6';
  lbCtx.fillRect(0, 0, 256, 160);
  lbCtx.strokeStyle = '#1e1914';
  lbCtx.lineWidth = 4;
  lbCtx.strokeRect(8, 8, 240, 144);
  lbCtx.fillStyle = '#181410';
  lbCtx.font = 'bold 28px serif';
  lbCtx.textAlign = 'center';
  lbCtx.fillText('L O A M', 128, 66);
  lbCtx.font = '13px monospace';
  lbCtx.fillStyle = '#3a3128';
  lbCtx.fillText('BOTANICAL EXTRACTS · 50 ML', 128, 100);
  lbCtx.beginPath();
  lbCtx.moveTo(44, 120);
  lbCtx.lineTo(212, 120);
  lbCtx.lineWidth = 1.6;
  lbCtx.stroke();
  const labelTex = new THREE.CanvasTexture(labelCanvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;

  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.85,
    metalness: 0.0,
    transparent: true,
    opacity: 1,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  // Assemble the bottle along local X axis (lying nestled in the tray cavity)
  // 1) Heavy bevelled glass flacon body
  const flaconShape = new THREE.Shape();
  const fw = 0.28;
  const fh = 0.14;
  const bevel = 0.045;
  flaconShape.moveTo(-fw + bevel, -fh);
  flaconShape.lineTo(fw - bevel, -fh);
  flaconShape.lineTo(fw, -fh + bevel);
  flaconShape.lineTo(fw, fh - bevel);
  flaconShape.lineTo(fw - bevel, fh);
  flaconShape.lineTo(-fw + bevel, fh);
  flaconShape.lineTo(-fw, fh - bevel);
  flaconShape.lineTo(-fw, -fh + bevel);
  flaconShape.closePath();

  const flaconGeo = new THREE.ExtrudeGeometry(flaconShape, {
    steps: 1,
    depth: 0.74,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.022,
    bevelSegments: 4,
  });
  flaconGeo.center();
  // Rotate so depth (0.74) runs along X, width (2*fw = 0.56) along Z, thickness (2*fh = 0.28) along Y
  flaconGeo.rotateY(Math.PI / 2);
  const flaconMesh = new THREE.Mesh(flaconGeo, glassMat);
  flaconMesh.position.set(-0.15, 0, 0);
  flaconMesh.renderOrder = 2;
  perfumeBottleGroup.add(flaconMesh);

  // Smoked-crystal glass edge highlight wireframe for unmistakable glass silhouette read against cream cavity
  const flaconEdgesGeo = new THREE.EdgesGeometry(flaconGeo, 28);
  const flaconEdgesMat = new THREE.LineBasicMaterial({
    color: new THREE.Color('#6b5842'),
    transparent: true,
    opacity: 0.45,
  });
  const flaconEdges = new THREE.LineSegments(flaconEdgesGeo, flaconEdgesMat);
  flaconEdges.position.copy(flaconMesh.position);
  perfumeBottleGroup.add(flaconEdges);

  // 2) Inner amber parfum liquid chamber
  const liquidGeo = new THREE.BoxGeometry(0.58, 0.19, 0.44);
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.set(-0.17, -0.01, 0);
  liquidMesh.renderOrder = 1;
  perfumeBottleGroup.add(liquidMesh);

  // 3) Internal glass capillary dip tube running from neck into amber liquid
  const dipTubeCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 0.0, 0.0),
    new THREE.Vector3(-0.08, -0.01, 0.03),
    new THREE.Vector3(-0.40, -0.04, 0.14),
  ]);
  const dipTubeGeo = new THREE.TubeGeometry(dipTubeCurve, 12, 0.009, 6, false);
  const dipTubeMesh = new THREE.Mesh(dipTubeGeo, brassMat);
  perfumeBottleGroup.add(dipTubeMesh);

  // 4) Apothecary cream paper label on the top face of the glass flacon
  const labelGeo = new THREE.PlaneGeometry(0.42, 0.28);
  labelGeo.rotateX(-Math.PI / 2);
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.set(-0.15, 0.163, 0);
  labelMesh.renderOrder = 3;
  perfumeBottleGroup.add(labelMesh);

  // 5) Glass neck + Brushed Brass Crimp Collar (at +X end of the flacon)
  const neckGeo = new THREE.CylinderGeometry(0.072, 0.082, 0.12, 24);
  neckGeo.rotateZ(-Math.PI / 2);
  const neckMesh = new THREE.Mesh(neckGeo, brassMat);
  neckMesh.position.set(0.28, 0, 0);
  perfumeBottleGroup.add(neckMesh);

  const collarRingGeo = new THREE.TorusGeometry(0.082, 0.016, 12, 24);
  collarRingGeo.rotateY(Math.PI / 2);
  const collarRing = new THREE.Mesh(collarRingGeo, brassMat);
  collarRing.position.set(0.23, 0, 0);
  perfumeBottleGroup.add(collarRing);

  // 6) Faceted Crystal / Glass Stopper (octagonal-chamfered disc stopper)
  const stopperGeo = new THREE.CylinderGeometry(0.135, 0.115, 0.16, 12);
  stopperGeo.rotateZ(-Math.PI / 2);
  const stopperMesh = new THREE.Mesh(stopperGeo, glassMat);
  stopperMesh.position.set(0.43, 0, 0);
  stopperMesh.renderOrder = 2;
  perfumeBottleGroup.add(stopperMesh);

  const stopperCoreGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.18, 12);
  stopperCoreGeo.rotateZ(-Math.PI / 2);
  const stopperCore = new THREE.Mesh(stopperCoreGeo, brassMat);
  stopperCore.position.set(0.38, 0, 0);
  perfumeBottleGroup.add(stopperCore);

  perfumeBottleGroup.position.set(-0.04, -0.03, -0.02);
  perfumeBottleGroup.rotation.set(0.0, 0.06, 0.0);
  solidTrayGroup.add(perfumeBottleGroup);

  // Scale & orient the hero tray so it occupies ~44% of viewport width at rest in a three-quarter
  // view from above (showing cavity, nestled bottle, and broken fibrous corner), and fits inside
  // the viewport with generous margin during 360-degree Hold-to-Inspect rotation.
  const TRAY_SCALE = 0.84;
  solidTrayGroup.scale.setScalar(TRAY_SCALE);
  solidTrayGroup.rotation.set(0.25, -0.44, 0.03);

  // 4. Scrub-able particle/thread morph cloud that converges and braids into the tray
  //    Only the incoming threads glow, and their glow fades out completely once the studio is lit
  const morphData = generateTrayMorphCoordinates(1600, 9001);
  const morphGeo = new THREE.BufferGeometry();
  morphGeo.setAttribute('position', new THREE.BufferAttribute(morphData.targetPositions, 3));
  morphGeo.setAttribute('aSource', new THREE.BufferAttribute(morphData.sourcePositions, 3));
  morphGeo.setAttribute('aSeed', new THREE.BufferAttribute(morphData.randomSeeds, 1));

  const morphMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uMorph: { value: 0 },
      uFade: { value: 0 },
      uTime: { value: 0 },
      uSprite: { value: textures.sporeSprite },
    },
    vertexShader: `
      attribute vec3 aSource;
      attribute float aSeed;
      uniform float uMorph;
      uniform float uTime;
      varying float vSeed;
      varying float vMorph;

      void main() {
        vSeed = aSeed;
        vMorph = uMorph;

        float localT = clamp((uMorph - aSeed * 0.22) / 0.78, 0.0, 1.0);
        float smoothT = localT * localT * (3.0 - 2.0 * localT);

        vec3 srcLocal = aSource - vec3(0.0, -5.45, 0.0);
        vec3 pos = mix(srcLocal, position, smoothT);

        float braidEnv = sin(smoothT * 3.14159265);
        float angle = aSeed * 6.28318 + uTime * 1.6 + smoothT * 4.0;
        pos.x += cos(angle) * 0.26 * braidEnv;
        pos.y += sin(angle * 1.3) * 0.20 * braidEnv;
        pos.z += sin(angle) * 0.26 * braidEnv;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (13.0 + aSeed * 11.0) * (1.0 / max(0.6, -mvPosition.z));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uFade;
      uniform sampler2D uSprite;
      varying float vSeed;
      varying float vMorph;

      void main() {
        vec4 tex = texture2D(uSprite, gl_PointCoord);
        if (tex.a < 0.05) discard;
        vec3 foxfire = vec3(0.72, 0.86, 0.26);
        vec3 warmSpore = vec3(0.88, 0.83, 0.74);
        vec3 col = mix(foxfire, warmSpore, smoothstep(0.55, 0.92, vMorph));
        gl_FragColor = vec4(col, tex.a * uFade);
      }
    `,
  });

  const morphPoints = new THREE.Points(morphGeo, morphMat);
  morphPoints.scale.setScalar(TRAY_SCALE);
  morphPoints.rotation.copy(solidTrayGroup.rotation);
  group.add(morphPoints);

  // Invisible raycast proxy box for Hold-to-Inspect
  const hitProxyGeo = new THREE.BoxGeometry(2.4, 0.85, 1.65);
  const hitProxyMat = new THREE.MeshBasicMaterial({ visible: false });
  const hitProxy = new THREE.Mesh(hitProxyGeo, hitProxyMat);
  hitProxy.userData.inspectId = 'tray';
  group.add(hitProxy);

  const updateMorphAndOpacity = (
    morphProgress: number,
    solidOpacity: number,
    elapsedSec: number,
    fragileSettle = 1,
    foxfireGlowFade?: number,
  ) => {
    const active = morphProgress > 0.01 || solidOpacity > 0.01;
    group.visible = active;
    if (!active) return;

    solidTrayGroup.visible = solidOpacity > 0.01;
    skinMat.opacity = solidOpacity;
    coreMat.opacity = solidOpacity;
    fibreMat.opacity = solidOpacity;

    // Gentle scroll-scrubbed settling of the fragile glass perfume bottle into the tray cavity
    const bottleVis = Math.min(solidOpacity, Math.max(0, fragileSettle));
    perfumeBottleGroup.visible = bottleVis > 0.01;
    cradleShadowMesh.visible = bottleVis > 0.01;
    if (perfumeBottleGroup.visible) {
      const easeSettle = 1 - Math.pow(1 - Math.min(1, fragileSettle), 3);
      perfumeBottleGroup.position.y = -0.03 + (1 - easeSettle) * 0.42;
      perfumeBottleGroup.rotation.z = (1 - easeSettle) * 0.08;

      glassMat.opacity = (isSoftwareGl ? 0.56 : 1.0) * bottleVis;
      flaconEdgesMat.opacity = 0.42 * bottleVis;
      liquidMat.opacity = 0.84 * bottleVis;
      brassMat.opacity = bottleVis;
      labelMat.opacity = bottleVis;
      cradleShadowMat.opacity = easeSettle * bottleVis * 0.85;
    }

    // Incoming threads glow while converging and fade out completely (to 0) once studio is lit
    const computedGlowFade =
      foxfireGlowFade !== undefined
        ? foxfireGlowFade
        : Math.sin(Math.min(1, morphProgress) * Math.PI) *
          Math.pow(Math.max(0, 1 - solidOpacity), 1.6);
    morphPoints.visible = computedGlowFade > 0.005;
    morphMat.uniforms.uMorph.value = morphProgress;
    morphMat.uniforms.uFade.value = Math.min(0.78, computedGlowFade);
    morphMat.uniforms.uTime.value = elapsedSec;
  };

  return {
    group,
    solidTrayGroup,
    morphPoints,
    hitProxy,
    updateMorphAndOpacity,
  };
}

]]>
    </file>
  </files>
</template>
