<template slug="serraform" name="SERRAFORM">
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
    <file path="src/app/(serraform)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import "./serraform/serraform.css";

export const metadata: Metadata = {
  title: "SERRAFORM — Fold 16",
  description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
  openGraph: {
    title: "SERRAFORM — Fold 16",
    description: "Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3E8E4",
};

export default function SerraformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anybody:wght@500;600&family=Commissioner:wght@400;500;600&family=Victor+Mono:wght@400;500&display=swap" rel="stylesheet" precedence="default" />
      </head>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/serraform";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={`serraform-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#F3E8E4" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#9A463D" text-anchor="middle">S</text>
</svg>
]]>
    </file>
    <file path="src/app/(serraform)/serraform/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SERRAFORM — Fold 16";

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
          padding: "64px",
          backgroundColor: "#F3E8E4",
          color: "#9A463D",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>SERRAFORM</span>
          <span style={{ color: "#735B60" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            SERRAFORM — Fold 16
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Design Fold 16 in your browser: shape sixteen connected felt panels, mix custom colors with an interactive wheel, choose original prints or local artwork, and prepare a room brief.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#735B60" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/page.tsx">
<![CDATA["use client";

import SerraformApp from "./SerraformApp";

export default function SerraformPage() {
  return <SerraformApp />;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/serraform.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-srf-rose: #F3E8E4;
  --color-srf-oxblood: #4B202A;
  --color-srf-clay: #9A463D;
  --color-srf-mauve: #735B60;
  --color-srf-flax: #D8C4A7;
  --color-srf-sage: #A6B3A0;
  --color-srf-porcelain: #FFFCF8;

  --font-display: "Anybody", system-ui, -apple-system, sans-serif;
  --font-body: "Commissioner", system-ui, -apple-system, sans-serif;
  --font-mono: "Victor Mono", ui-monospace, SFMono-Regular, monospace;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 700ms;
  --dur-hero: 1000ms;
  --stagger: 60ms;
  --reveal-shift: 24px;
}

:root {
  --srf-rose: #F3E8E4;
  --srf-oxblood: #4B202A;
  --srf-clay: #9A463D;
  --srf-mauve: #735B60;
  --srf-flax: #D8C4A7;
  --srf-sage: #A6B3A0;
  --srf-porcelain: #FFFCF8;
  --srf-hairline: color-mix(in srgb, #4B202A 18%, #F3E8E4);
  --srf-hairline-strong: color-mix(in srgb, #4B202A 32%, #F3E8E4);
  --srf-hairline-dark: color-mix(in srgb, #FFFCF8 22%, #4B202A);
  --srf-surface-soft: color-mix(in srgb, #FFFCF8 58%, #F3E8E4);
  --srf-shadow: color-mix(in srgb, #4B202A 12%, transparent);
}

html {
  background-color: var(--srf-rose);
  color: var(--srf-oxblood);
  font-family: var(--font-body);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  margin: 0;
  background-color: var(--srf-rose);
  color: var(--srf-oxblood);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 24px;
  overflow-x: clip;
}

@media (min-width: 900px) {
  body {
    font-size: 18px;
    line-height: 28px;
  }
}

/* Global accessible focus */
:focus-visible {
  outline: 2px solid var(--srf-oxblood);
  outline-offset: 4px;
}

.srf-dark-surface :focus-visible {
  outline-color: var(--srf-porcelain);
}

/* Skip link */
.srf-skip-link {
  position: absolute;
  left: -9999px;
  top: 12px;
  z-index: 100;
  background: var(--srf-oxblood);
  color: var(--srf-porcelain);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.srf-skip-link:focus {
  left: 16px;
}

/* Editorial container */
.srf-container {
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: 20px;
}

@media (min-width: 640px) {
  .srf-container {
    padding-inline: 32px;
  }
}

@media (min-width: 1024px) {
  .srf-container {
    padding-inline: 48px;
  }
}

/* Typography roles */
.srf-h1 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(44px, 5.6vw, 80px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--srf-oxblood);
}

.srf-h1-studio {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(38px, 4.4vw, 66px);
  line-height: 1.03;
  letter-spacing: -0.035em;
  color: var(--srf-oxblood);
}

/* Mobile sticky studio stage below 64px header (disabled on short landscape), static on tablet, sticky 60% stage on desktop */
.srf-studio-stage-wrap {
  position: sticky;
  top: 64px;
  z-index: 25;
  height: 218px;
  background-color: var(--srf-rose);
  padding-top: 4px;
  padding-bottom: 10px;
}

@media (max-width: 639px) {
  .srf-studio-stage-wrap > div {
    box-shadow: 0 8px 18px -10px color-mix(in srgb, #4B202A 22%, transparent);
  }
}

@media (max-height: 580px) {
  .srf-studio-stage-wrap {
    position: static;
    height: 236px;
    padding-bottom: 0;
  }
}

@media (min-width: 640px) {
  .srf-studio-stage-wrap {
    position: static;
    height: 380px;
    padding-bottom: 0;
  }
}

@media (min-width: 1024px) {
  .srf-studio-stage-wrap {
    position: sticky;
    top: 96px;
    z-index: 10;
    height: min(680px, calc(100svh - 120px));
    min-height: 460px;
    padding-bottom: 0;
  }
}

.srf-h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(32px, 4vw, 60px);
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.srf-h3 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(22px, 2.2vw, 30px);
  line-height: 1.18;
  letter-spacing: -0.02em;
}

.srf-mono-caption {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
}

.srf-mono-dim {
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

/* Primary & secondary buttons */
.srf-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: var(--srf-clay);
  color: var(--srf-porcelain);
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    transform var(--dur-instant) var(--ease-out);
}

.srf-btn-primary:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--srf-clay) 86%, var(--srf-oxblood));
}

.srf-btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}

.srf-btn-primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.srf-btn-primary .srf-btn-arrow {
  transition: transform var(--dur-fast) var(--ease-out);
}

.srf-btn-primary:hover:not(:disabled) .srf-btn-arrow {
  transform: translateX(4px);
}

.srf-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid var(--srf-hairline-strong);
  background-color: transparent;
  color: var(--srf-oxblood);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    transform var(--dur-instant) var(--ease-out);
}

.srf-btn-secondary:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--srf-oxblood) 6%, transparent);
  border-color: var(--srf-oxblood);
}

.srf-btn-secondary:active:not(:disabled) {
  transform: scale(0.98);
}

.srf-btn-secondary[aria-pressed="true"],
.srf-btn-secondary[aria-pressed="true"]:hover:not(:disabled) {
  background-color: var(--srf-oxblood);
  color: var(--srf-porcelain);
  border-color: var(--srf-oxblood);
}

.srf-text-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 16px;
  font-weight: 500;
  color: var(--srf-oxblood);
  text-decoration: none;
  white-space: nowrap;
}

.srf-text-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0.45);
  transform-origin: left;
  transition: transform var(--dur-fast) var(--ease-out);
}

.srf-text-link:hover::after,
.srf-text-link:focus-visible::after {
  transform: scaleX(1);
}

/* Native range input styled cleanly for Rose/Oxblood/Clay */
.srf-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 44px;
  background: transparent;
  cursor: pointer;
}

.srf-range::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: var(--srf-hairline-strong);
}

.srf-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  margin-top: -10px;
  border-radius: 9999px;
  background: var(--srf-clay);
  border: 2px solid var(--srf-porcelain);
  box-shadow: 0 2px 6px var(--srf-shadow);
  transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}

.srf-range:hover::-webkit-slider-thumb {
  transform: scale(1.08);
}

.srf-range::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: var(--srf-hairline-strong);
}

.srf-range::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  background: var(--srf-clay);
  border: 2px solid var(--srf-porcelain);
  box-shadow: 0 2px 6px var(--srf-shadow);
}

/* Folded corner receipt motif */
.srf-receipt-card {
  position: relative;
  background-color: var(--srf-porcelain);
  border: 1px solid var(--srf-hairline-strong);
  border-radius: 8px;
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);
}

.srf-receipt-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background-color: color-mix(in srgb, var(--srf-sage) 42%, var(--srf-rose));
  clip-path: polygon(0 0, 0 100%, 100% 100%);
  pointer-events: none;
}

/* Native details FAQ styling */
.srf-faq-item {
  border-top: 1px solid var(--srf-hairline);
}

.srf-faq-item:last-child {
  border-bottom: 1px solid var(--srf-hairline);
}

.srf-faq-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding-block: 18px;
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 26px;
  font-weight: 500;
  color: var(--srf-oxblood);
  cursor: pointer;
  list-style: none;
}

.srf-faq-summary::-webkit-details-marker {
  display: none;
}

.srf-faq-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  transition: transform var(--dur-fast) var(--ease-out);
}

details[open] .srf-faq-icon {
  transform: rotate(45deg);
}

.srf-faq-answer {
  padding-bottom: 22px;
  max-width: 60ch;
  color: var(--srf-mauve);
  font-size: 16px;
  line-height: 26px;
}

@media (prefers-reduced-motion: no-preference) {
  details[open] .srf-faq-answer {
    animation: srf-answer-rise var(--dur-fast) var(--ease-out) both;
  }

  @keyframes srf-answer-rise {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Studio lighting backdrop & Hero entrance sequence (compositor only, honors reduced motion) */
.srf-studio-glow {
  background: radial-gradient(
    ellipse 68% 72% at 64% 44%,
    color-mix(in srgb, #FFFCF8 38%, transparent) 0%,
    color-mix(in srgb, #FFFCF8 12%, transparent) 46%,
    transparent 76%
  );
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes srf-studio-veil {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes srf-rise-in {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes srf-mask-line {
    from {
      opacity: 0;
      transform: translateY(104%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes srf-dock-unfurl {
    from {
      opacity: 0;
      transform: translateY(18px);
      clip-path: inset(100% 0 0 0 round 10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      clip-path: inset(0 0 0 0 round 10px);
    }
  }

  @keyframes srf-draw-arc {
    from {
      stroke-dashoffset: 68;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .srf-studio-glow {
    animation: srf-studio-veil 420ms var(--ease-out) 0ms both;
  }

  .srf-hero-line-1 {
    animation: srf-mask-line var(--dur-slow) var(--ease-out-expo) 420ms both;
  }

  .srf-hero-line-2 {
    animation: srf-mask-line var(--dur-slow) var(--ease-out-expo) 540ms both;
  }

  .srf-hero-lead {
    animation: srf-rise-in var(--dur-base) var(--ease-out) 700ms both;
  }

  .srf-hero-actions {
    animation: srf-rise-in var(--dur-base) cubic-bezier(0.22, 1.18, 0.36, 1) 820ms both;
  }

  .srf-hero-dock {
    animation: srf-dock-unfurl 560ms var(--ease-out-expo) 1050ms both;
  }

  .srf-drag-arc path {
    stroke-dasharray: 68;
    animation: srf-draw-arc 780ms var(--ease-out-expo) 1300ms both;
  }
}

/* Reveal classes (only prepared when observer active) */
.srf-reveal-ready [data-reveal="rise"] {
  opacity: 0;
  transform: translateY(var(--reveal-shift));
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.srf-reveal-ready [data-reveal="rise"][data-revealed="true"] {
  opacity: 1;
  transform: translateY(0);
}

.srf-reveal-ready [data-reveal="clip"] {
  clip-path: inset(0 0 12% 0 round 8px);
  opacity: 0.01;
  transform: scale(1.03);
  transition:
    clip-path var(--dur-slow) var(--ease-out-expo),
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-slow) var(--ease-out-expo);
}

.srf-reveal-ready [data-reveal="clip"][data-revealed="true"] {
  clip-path: inset(0 0 0 0 round 8px);
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .srf-reveal-ready [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    transition: none !important;
  }
}

/* ============================================================================
   SERRAFORM — The Living Room Atelier (Coded 2.5D Architectural Backdrop)
   ============================================================================ */

.srf-hero-section {
  --room-wall-base: #F4EAE4;
  --room-wall-highlight: #FAF4F0;
  --room-wall-shadow: #E4CFC7;
  --room-floor-base: #DEC6BC;
  --room-floor-far: #EBD8D0;
  --room-floor-detail: #C5A89D;
  --room-rug: #FAF3EE;
  --room-rug-trim: #7B4A4D;
  --room-textile-primary: #ECE0DA;
  --room-textile-secondary: #E3D3CC;
  --room-furniture: #D8C4A7;
  --room-furniture-leg: #7C5B53;
  --room-decor-primary: #7B4A4D;
  --room-decor-accent: #9A463D;
  --room-trim: #9A463D;
  --room-foliage: #7F8E77;
  --room-light-tint: #FFF8F0;
  --room-ambient-tint: #EBD8D0;
  --room-shadow-tint: #4B202A;
  --room-quiet-bg: #F8F0EC;
  --room-ui-accent: #9A463D;
  --room-ui-accent-hover: #7D362E;
  --room-ui-accent-text: #FFFCF8;
  --room-ui-outline: #4B202A;
  --room-text-primary: #4B202A;
  --room-text-secondary: #6A5156;
  --room-wall: #F4EAE4;
  --room-wall-upper: #FAF4F0;
  --room-wall-alcove: #E4CFC7;
  --room-floor: #DEC6BC;
  --room-decor-secondary: #D8C4A7;
  --room-light-warm: #FFF8F0;
  --room-shadow: #4B202A;
  background-color: var(--room-wall-base);
}

.srf-hero-section .srf-btn-primary {
  background-color: var(--room-ui-accent);
  color: var(--room-ui-accent-text);
}

.srf-hero-section .srf-btn-primary:hover:not(:disabled) {
  background-color: var(--room-ui-accent-hover);
}

.srf-hero-section .srf-range::-webkit-slider-thumb {
  background: var(--room-ui-accent);
}

.srf-hero-section .srf-range::-moz-range-thumb {
  background: var(--room-ui-accent);
}

.srf-hero-section .srf-hero-active-view {
  background-color: var(--room-ui-accent);
  border-color: var(--room-ui-accent);
  color: var(--room-ui-accent-text);
}

.srf-hero-section .srf-hero-active-outline {
  border-color: var(--room-ui-outline);
  box-shadow: 0 0 0 2px var(--room-ui-outline);
}

.srf-hero-section .srf-hero-link {
  color: var(--room-text-primary);
}

.srf-hero-section .srf-hero-link:hover {
  color: var(--room-ui-accent);
}

.srf-room-stage {
  --room-spread: 0.5;
  --room-bias-x: 0.45;
  --room-pointer-x: 0;
  --room-horizon-lift: 0px;
  --room-motif: 1;
  background-color: var(--room-wall-base, var(--room-wall));
}

/* Subtle mineral plaster texture via crisp compositor-friendly SVG pattern (no GPU blur) */
.srf-room-plaster-grain {
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

/* Shared architectural horizon anchor matching divider feet across viewports */
.srf-room-horizon-floor {
  top: calc(58% + var(--room-horizon-lift, 0px));
  transition: top 260ms var(--ease-out), background-color 360ms var(--ease-out);
}

.srf-room-horizon-props {
  top: 0;
  bottom: calc(42% - var(--room-horizon-lift, 0px));
  transition: bottom 260ms var(--ease-out);
}

@media (min-width: 1024px) {
  .srf-room-horizon-floor {
    top: calc(64% + var(--room-horizon-lift, 0px));
  }
  .srf-room-horizon-props {
    bottom: calc(36% - var(--room-horizon-lift, 0px));
  }
}

/* 2.5D Depth Bands coupled to view yaw parallax + subtle pointer drift */
.srf-room-depth-far {
  transform: translate3d(
    calc(var(--room-bias-x, 0) * -6px + var(--room-pointer-x, 0) * -4px),
    0,
    0
  );
  transition: transform 280ms var(--ease-out);
}

.srf-room-depth-mid {
  transform: translate3d(
    calc(var(--room-bias-x, 0) * -12px + var(--room-pointer-x, 0) * -8px),
    0,
    0
  );
  transition: transform 260ms var(--ease-out);
}

.srf-room-depth-near {
  transform: translate3d(
    calc(var(--room-bias-x, 0) * -19px + var(--room-pointer-x, 0) * -12px),
    0,
    0
  );
  transition: transform 240ms var(--ease-out);
}

/* Spatial spread response: rug and floor anchor expand cleanly when divider opens wider */
.srf-room-rug-spread {
  transform-origin: 50% 50%;
  transform: scaleX(calc(0.91 + 0.18 * var(--room-spread, 0.5)));
  transition:
    transform 320ms var(--ease-out),
    background-color 360ms var(--ease-out),
    border-color 360ms var(--ease-out);
}

/* Scenic Panorama multi-layer depth parallax inside framed window */
.srf-room-pano-layer-1 {
  transform: translateX(calc(var(--room-bias-x, 0) * -5px));
  transition: transform 280ms var(--ease-out);
}
.srf-room-pano-layer-2 {
  transform: translateX(calc(var(--room-bias-x, 0) * -10px));
  transition: transform 280ms var(--ease-out);
}
.srf-room-pano-layer-3 {
  transform: translateX(calc(var(--room-bias-x, 0) * -15px));
  transition: transform 280ms var(--ease-out);
}
.srf-room-pano-layer-4 {
  transform: translateX(calc(var(--room-bias-x, 0) * -21px));
  transition: transform 280ms var(--ease-out);
}

/* Structural Room-Family Switch & Entrance Choreography (Compositor-only) */
@media (prefers-reduced-motion: no-preference) {
  @keyframes srf-room-initial-clip {
    0% {
      opacity: 0.01;
      clip-path: inset(0 0 10% 0);
      transform: scale(1.015);
    }
    100% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
      transform: scale(1);
    }
  }

  @keyframes srf-room-architectural-in {
    0% {
      opacity: 0;
      clip-path: inset(0 0 0 12%);
      transform: translate3d(24px, 0, 0);
    }
    100% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes srf-room-architectural-out {
    0% {
      opacity: 1;
      clip-path: inset(0 0 0 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      clip-path: inset(0 10% 0 0);
      transform: translate3d(-26px, 0, 0);
    }
  }

  @keyframes srf-room-branch-stroke {
    0% {
      stroke-dashoffset: 240;
      opacity: 0.2;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }

  @keyframes srf-room-leaf-bloom {
    0% {
      opacity: 0;
      transform: scale(0.86);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes srf-room-rib-unfurl {
    0% {
      opacity: 0;
      transform: scaleY(0.72) translateY(14px);
    }
    100% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }

  @keyframes srf-room-blade-in {
    0% {
      opacity: 0;
      transform: translate3d(44px, -24px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes srf-room-prop-settle {
    0% {
      opacity: 0;
      transform: translate3d(20px, 10px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes srf-room-drift-sun {
    0%, 100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(8px, -4px, 0);
    }
  }

  .srf-room-initial-enter {
    animation: srf-room-initial-clip 680ms var(--ease-out-expo) 0ms both;
  }

  .srf-room-entering {
    animation: srf-room-architectural-in 540ms var(--ease-out-expo) both;
  }

  .srf-room-exiting {
    animation: srf-room-architectural-out 440ms var(--ease-out) both;
  }

  .srf-room-branch-path {
    stroke-dasharray: 240;
    animation: srf-room-branch-stroke 760ms var(--ease-out-expo) 120ms both;
  }

  .srf-room-branch-delay {
    animation-delay: 190ms;
  }

  .srf-room-branch-delay-2 {
    animation-delay: 260ms;
  }

  .srf-room-foliage-cluster {
    transform-origin: center;
    animation: srf-room-leaf-bloom 460ms var(--ease-out) 320ms both;
  }

  .srf-room-rib-fin {
    transform-origin: bottom center;
    animation: srf-room-rib-unfurl 480ms var(--ease-out-expo) both;
  }

  .srf-room-light-blade {
    animation: srf-room-blade-in 620ms var(--ease-out-expo) 80ms both;
  }

  .srf-room-prop-right,
  .srf-room-ikebana {
    animation: srf-room-prop-settle 540ms var(--ease-out-expo) 140ms both;
  }

  .srf-room-drift-slow {
    animation: srf-room-drift-sun 16s ease-in-out infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .srf-room-depth-far,
  .srf-room-depth-mid,
  .srf-room-depth-near,
  .srf-room-rug-spread,
  .srf-room-horizon-floor,
  .srf-room-horizon-props,
  .srf-room-pano-layer-1,
  .srf-room-pano-layer-2,
  .srf-room-pano-layer-3,
  .srf-room-pano-layer-4 {
    transition: none !important;
  }

  .srf-room-initial-enter,
  .srf-room-entering,
  .srf-room-exiting,
  .srf-room-branch-path,
  .srf-room-foliage-cluster,
  .srf-room-rib-fin,
  .srf-room-light-blade,
  .srf-room-prop-right,
  .srf-room-ikebana,
  .srf-room-drift-slow {
    animation: none !important;
  }
}

]]>
    </file>
    <file path="src/app/(serraform)/serraform/SerraformApp.tsx">
<![CDATA['use client';

import { useEffect, useState } from 'react';
import { FoldProvider } from './fold/FoldProvider';
import { BriefSection } from './sections/BriefSection';
import { Construction } from './sections/Construction';
import { FoldingExperience } from './sections/FoldingExperience';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Questions } from './sections/Questions';
import { RoomStudies } from './sections/RoomStudies';

export default function SerraformApp() {
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver !== 'undefined' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealReady(true);
    }
  }, []);

  return (
    <FoldProvider>
      <div className={revealReady ? 'srf-reveal-ready' : undefined}>
        <a href="#main-content" className="srf-skip-link">
          Skip to content
        </a>

        <Header />

        <main id="main-content">
          <Hero />
          <FoldingExperience />
          <RoomStudies />
          <Construction />
          <Questions />
          <BriefSection />
        </main>

        <Footer />
      </div>
    </FoldProvider>
  );
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/brand/Logo.tsx">
<![CDATA['use client';

import React from 'react';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export const FoldMark: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M3 25L9 7L15 25L21 7L29 25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({ tone = 'dark', className = '' }) => {
  const textColor = tone === 'light' ? 'text-[var(--srf-porcelain)]' : 'text-[var(--srf-oxblood)]';
  return (
    <span
      className={`inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 ${textColor} ${className}`}
      aria-label="SERRAFORM"
    >
      <FoldMark className="w-6 h-6 shrink-0" />
      <span
        className="font-[family-name:var(--font-display)] font-medium text-[20px] leading-none tracking-[-0.025em]"
        aria-hidden="true"
      >
        SERRAFORM
      </span>
    </span>
  );
};

export const CreaseMarker: React.FC<{ index: string; className?: string }> = ({
  index,
  className = '',
}) => (
  <span className={`inline-flex items-center gap-2 srf-mono-caption ${className}`}>
    <svg viewBox="0 0 22 10" fill="none" aria-hidden="true" className="w-5 h-2.5 shrink-0">
      <path
        d="M1 9L6 1L11 9L16 1L21 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>{index}</span>
  </span>
);
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/AdvancedStudioDrawer.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, RotateCw, X } from 'lucide-react';
import { ColorWheel } from './ColorWheel';
import {
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_ORDER,
  VIEW_PRESETS,
} from './config';
import { formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import type { AdvancedDrawerSection } from './HeroStudioDock';
import { PrintGallery } from './PrintGallery';
import { normalizeYawDeg, usesActivePrintColor, viewPresetFromAngles } from './state';

interface AdvancedStudioDrawerProps {
  open: boolean;
  initialSection: AdvancedDrawerSection;
  onClose: () => void;
}

export const AdvancedStudioDrawer: React.FC<AdvancedStudioDrawerProps> = ({
  open,
  initialSection,
  onClose,
}) => {
  const {
    design,
    view,
    effectiveOpening,
    effectivePose,
    env,
    uploadedArt,
    setOpening,
    setViewPreset,
    rotateViewStep,
    resetView,
    resetShape,
    resetDesign,
  } = useFold();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const colorSectionRef = useRef<HTMLElement>(null);
  const designSectionRef = useRef<HTMLElement>(null);
  const viewSectionRef = useRef<HTMLElement>(null);
  const [announcement, setAnnouncement] = useState('');

  // Handle Escape key, body scroll lock, and initial section scroll/focus
  useEffect(() => {
    if (!open) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const scrollTarget =
      initialSection === 'color' || initialSection === 'printColor'
        ? colorSectionRef.current
        : initialSection === 'design'
          ? designSectionRef.current
          : initialSection === 'view'
            ? viewSectionRef.current
            : null;

    if (scrollTarget) {
      requestAnimationFrame(() => {
        scrollTarget.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    }

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (prevFocused && typeof prevFocused.focus === 'function') {
        prevFocused.focus();
      }
    };
  }, [open, initialSection, onClose]);

  if (!open) return null;

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);
  const printSpec = PRINT_SPECS[design.print];
  const matchedPreset = viewPresetFromAngles(view);
  const roundedYaw = Math.round(normalizeYawDeg(view.yawDeg));

  const handleUseInBrief = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      const target = document.getElementById('brief-heading');
      if (target) {
        target.scrollIntoView({
          behavior: env.reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        if (target instanceof HTMLElement) {
          target.focus({ preventScroll: true });
        }
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#4B202A]/28"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="srf-adv-drawer-title"
        data-testid="hero-advanced-drawer"
        className="w-full max-w-[520px] h-full bg-[#FAF2EE] border-l border-[var(--srf-hairline-strong)] shadow-[0_20px_60px_rgba(75,32,42,0.22)] flex flex-col"
      >
        {/* Drawer Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-[var(--srf-hairline)] bg-[var(--srf-rose)]">
          <div>
            <div className="srf-mono-caption text-[var(--srf-mauve)]">
              SERRAFORM / FOLD {FOLD_CONSTANTS.panels}
            </div>
            <h2
              id="srf-adv-drawer-title"
              className="text-lg font-medium text-[var(--srf-oxblood)]"
            >
              Advanced studio
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close advanced studio"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)]/75 text-[var(--srf-oxblood)] hover:border-[var(--srf-oxblood)]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Full Customization Rail */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* 1. Shape */}
          <section className="space-y-2.5" aria-labelledby="srf-adv-shape">
            <div className="flex items-baseline justify-between gap-4">
              <h3 id="srf-adv-shape" className="text-base font-medium text-[var(--srf-oxblood)]">
                1. Shape
              </h3>
              <span className="srf-mono-dim text-[var(--srf-oxblood)]">
                {roundedOpening}% · {formattedSpan}
              </span>
            </div>

            <div>
              <label htmlFor="srf-adv-opening-range" className="sr-only">
                Opening percentage
              </label>
              <input
                id="srf-adv-opening-range"
                type="range"
                min={0}
                max={100}
                step={1}
                value={roundedOpening}
                onChange={(e) => setOpening(Number(e.target.value))}
                aria-valuetext={`${roundedOpening} percent, outer span ${formattedSpan}`}
                className="srf-range"
              />
              <div className="flex items-center justify-between srf-mono-caption text-[var(--srf-mauve)]">
                <span>Gathered</span>
                <button
                  type="button"
                  onClick={() => {
                    resetShape();
                    setAnnouncement('Shape reset to 50 percent opening.');
                  }}
                  className="text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[32px] px-1"
                >
                  Reset shape
                </button>
                <span>Open</span>
              </div>
            </div>
          </section>

          {/* 2. Color (ColorWheel with Base + Print color, Hex, H/S/B, 10 swatches) */}
          <section
            ref={colorSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-color"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-color" className="text-base font-medium text-[var(--srf-oxblood)]">
                2. Base &amp; Print Color
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                {design.baseHex}
                {usesActivePrintColor(design) ? ` · ${design.designHex}` : ''}
              </span>
            </div>

            <ColorWheel
              idPrefix="srf-hero"
              initialTarget={initialSection === 'printColor' ? 'design' : 'base'}
            />
          </section>

          {/* 3. Design (exact existing PrintGallery with Bloom/Stripes/Landscape/Waves/Solid, Upload, Motif size) */}
          <section
            ref={designSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-design"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-design" className="text-base font-medium text-[var(--srf-oxblood)]">
                3. Design
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                {printSpec.name}
                {printSpec.usesScale ? ` · ${design.motifScale}%` : ''}
              </span>
            </div>

            <PrintGallery idPrefix="srf-hero" onAnnounce={setAnnouncement} />
          </section>

          {/* 4. View */}
          <section
            ref={viewSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-view"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-view" className="text-base font-medium text-[var(--srf-oxblood)]">
                4. View
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                View: {roundedYaw}°
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-label="Rotate divider left"
                onClick={() => {
                  rotateViewStep(-FOLD_CONSTANTS.rotateStepDeg);
                  setAnnouncement('Rotated divider left 15 degrees.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Rotate left</span>
              </button>

              <button
                type="button"
                aria-label="Rotate divider right"
                onClick={() => {
                  rotateViewStep(FOLD_CONSTANTS.rotateStepDeg);
                  setAnnouncement('Rotated divider right 15 degrees.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
                <span>Rotate right</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  resetView();
                  setAnnouncement('Camera reset to default three-quarter angle.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                Reset view
              </button>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Camera view presets">
              {VIEW_ORDER.map((viewId) => {
                const preset = VIEW_PRESETS[viewId];
                const active = matchedPreset === viewId;
                return (
                  <button
                    key={viewId}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setViewPreset(viewId);
                      setAnnouncement(`Camera view changed to ${preset.label}.`);
                    }}
                    className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3 text-sm"
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Live Specification Summary + Actions */}
          <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-medium text-[var(--srf-oxblood)]">
                Design summary
              </h3>
              <button
                type="button"
                onClick={() => {
                  resetDesign();
                  setAnnouncement('Design reset to Flax #D8C4A7, Oxblood #4B202A, Bloom at 100 percent.');
                }}
                className="srf-btn-secondary !min-h-[38px] !py-1 !px-3 text-xs"
              >
                Reset design
              </button>
            </div>

            <dl
              data-testid="hero-drawer-summary"
              className="p-3.5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm"
            >
              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Base color</dt>
                <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                    style={{ backgroundColor: design.baseHex }}
                    aria-hidden="true"
                  />
                  <span>{design.baseHex}</span>
                </dd>
              </div>

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {printSpec.name}
                </dd>
              </div>

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print color</dt>
                <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                    style={{ backgroundColor: design.designHex }}
                    aria-hidden="true"
                  />
                  <span className={!usesActivePrintColor(design) ? 'text-[var(--srf-mauve)]' : undefined}>
                    {usesActivePrintColor(design)
                      ? design.designHex
                      : `${design.designHex} (${design.print === 'solid' ? 'saved' : 'original upload'})`}
                  </span>
                </dd>
              </div>

              {printSpec.usesScale && (
                <div>
                  <dt className="srf-mono-caption text-[var(--srf-mauve)]">
                    {printSpec.scaleLabel}
                  </dt>
                  <dd className="font-medium text-[var(--srf-oxblood)]">
                    {design.motifScale}%
                  </dd>
                </div>
              )}

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Opening</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {roundedOpening}%
                </dd>
              </div>

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Outer span</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {formattedSpan}
                </dd>
              </div>

              {design.print === 'upload' && uploadedArt && (
                <div className="col-span-2">
                  <dt className="srf-mono-caption text-[var(--srf-mauve)]">Your image</dt>
                  <dd className="font-medium text-[var(--srf-oxblood)] truncate">
                    {uploadedArt.filename} (local session only)
                  </dd>
                </div>
              )}
            </dl>

            <a
              href="#brief"
              onClick={handleUseInBrief}
              className="srf-btn-primary w-full"
            >
              <span>Use this design in my brief</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </a>
          </section>
        </div>

        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/artwork.ts">
<![CDATA[import {
  colorDistanceOklab,
  hexToOklch,
  hexToRgb,
  hexWithAlpha,
  mixHex,
  oklchToHex,
  relativeLuminance,
} from './color';
import type { DesignState } from './state';

const bitmapIds = new WeakMap<ImageBitmap, number>();
let nextBitmapId = 1;

export function getBitmapKey(bitmap: ImageBitmap | null | undefined): string {
  if (!bitmap) return '';
  let id = bitmapIds.get(bitmap);
  if (!id) {
    id = nextBitmapId++;
    bitmapIds.set(bitmap, id);
  }
  return `${id}:${bitmap.width}x${bitmap.height}`;
}

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

// Cached deterministic wool-felt micro-grain tile so redraws on dial/slider drag stay ultra-fast
let grainTileCanvas: HTMLCanvasElement | null = null;
function getGrainPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (typeof document === 'undefined') return null;
  if (!grainTileCanvas) {
    const tile = document.createElement('canvas');
    tile.width = 192;
    tile.height = 192;
    const tCtx = tile.getContext('2d');
    if (tCtx) {
      const rand = seededRand(160288);
      for (let i = 0; i < 1400; i += 1) {
        const x = rand() * 192;
        const y = rand() * 192;
        const len = 1.4 + rand() * 3.2;
        const angle = rand() * Math.PI * 2;
        const light = rand() > 0.48;
        tCtx.strokeStyle = light
          ? 'rgba(255, 252, 248, 0.048)'
          : 'rgba(32, 16, 20, 0.048)';
        tCtx.lineWidth = 0.8;
        tCtx.beginPath();
        tCtx.moveTo(x, y);
        tCtx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
        tCtx.stroke();
      }
    }
    grainTileCanvas = tile;
  }
  return ctx.createPattern(grainTileCanvas, 'repeat');
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(length * 0.45, -width, length, 0);
  ctx.quadraticCurveTo(length * 0.45, width, 0, 0);
  ctx.fill();
  ctx.restore();
}

function drawBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  petals: number,
  rotation: number,
  petalFill: string,
  accentFill: string,
  centerFill: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Outer open petals
  ctx.fillStyle = petalFill;
  for (let i = 0; i < petals; i += 1) {
    const a = (i * Math.PI * 2) / petals;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      radius * 0.38,
      -radius * 0.42,
      radius * 1.04,
      -radius * 0.34,
      radius,
      0,
    );
    ctx.bezierCurveTo(
      radius * 1.04,
      radius * 0.34,
      radius * 0.38,
      radius * 0.42,
      0,
      0,
    );
    ctx.fill();
    ctx.restore();
  }

  // Soft interior petal shading
  ctx.fillStyle = accentFill;
  for (let i = 0; i < petals; i += 1) {
    const a = ((i + 0.5) * Math.PI * 2) / petals;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.ellipse(radius * 0.36, 0, radius * 0.24, radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Botanical center disc + stamens
  ctx.fillStyle = centerFill;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.19, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = petalFill;
  for (let i = 0; i < 6; i += 1) {
    const a = (i * Math.PI * 2) / 6;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * radius * 0.26, Math.sin(a) * radius * 0.26, radius * 0.045, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export interface PrintTones {
  primary: string;
  secondary: string;
  soft: string;
  centerContrast: string;
  skyWash: string;
  distantRidge: string;
  midRidge: string;
  foreRidge: string;
  foregroundInk: string;
}

/**
 * Derives secondary tonal shades directly from the selected Print Color in OKLCH space
 * so every print retains rich illustration depth without collapsing into the base felt.
 */
export function derivePrintTones(baseHex: string, printHex: string): PrintTones {
  const p = hexToOklch(printHex);
  const b = hexToOklch(baseHex);
  const hue = p.c < 0.015 ? 65 : p.h;
  const isLightPrint = p.l > 0.64;

  // Pick a tonal direction for secondary motifs that separates from both primary ink and base felt.
  const pickSeparatedTone = (deltaLight: number, chromaScale: number): string => {
    const dir = isLightPrint ? -1 : 1;
    const candidateL = Math.max(0.14, Math.min(0.94, p.l + dir * deltaLight));
    const candidate = oklchToHex(candidateL, Math.max(0.004, p.c * chromaScale), hue);
    if (colorDistanceOklab(candidate, baseHex) >= 0.12) {
      return candidate;
    }
    const altDir = p.l >= b.l ? 1 : -1;
    const altL = Math.max(0.12, Math.min(0.96, p.l + altDir * (deltaLight + 0.06)));
    return oklchToHex(altL, Math.max(0.004, p.c * chromaScale), hue);
  };

  const secondary = pickSeparatedTone(0.14, 0.88);
  const soft = pickSeparatedTone(0.24, 0.72);
  const centerContrast =
    relativeLuminance(printHex) < 0.24
      ? oklchToHex(Math.min(0.95, p.l + 0.44), Math.max(0.008, p.c * 0.45), hue)
      : oklchToHex(Math.max(0.18, p.l - 0.42), Math.min(0.11, p.c * 1.1), hue);

  // Landscape keeps stepped separation between atmospheric hills and foreground trees/ground band.
  const skyWash = mixHex(baseHex, soft, 0.22);
  const distantRidge = mixHex(baseHex, soft, 0.34);
  const midRidge = mixHex(baseHex, secondary, 0.56);
  const foreRidge = mixHex(baseHex, secondary, 0.72);
  const foregroundInk = printHex;

  return {
    primary: printHex,
    secondary,
    soft,
    centerContrast,
    skyWash,
    distantRidge,
    midRidge,
    foreRidge,
    foregroundInk,
  };
}

function drawBloomPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  // Unit tile width spans multiple panels (~1.8 panels * scale) so branches cross folds organically
  const unitW = h * 0.86 * s;
  const tileH = h * s;
  const repeatsX = Math.ceil(w / unitW) + 2;
  const repeatsY = Math.ceil(h / tileH) + 1;

  const tones = derivePrintTones(baseHex, designHex);
  const primaryInk = tones.primary;
  const softInk = tones.secondary;
  const stamenContrast = tones.centerContrast;

  const drawSingleTile = (ox: number, oy: number, tw: number, th: number) => {
    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(tw / 440, th / 510);

    // Sweeping botanical stems that cross left & right edges into neighboring tiles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Secondary soft background stem
    ctx.strokeStyle = softInk;
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.moveTo(-18, 430);
    ctx.bezierCurveTo(95, 360, 145, 220, 268, 175);
    ctx.bezierCurveTo(345, 148, 395, 92, 460, 118);
    ctx.stroke();

    // Primary expressive S-curve stem crossing seam cleanly
    ctx.strokeStyle = primaryInk;
    ctx.lineWidth = 5.4;
    ctx.beginPath();
    ctx.moveTo(42, 515);
    ctx.bezierCurveTo(68, 375, 178, 345, 198, 224);
    ctx.bezierCurveTo(214, 130, 326, 116, 422, 54);
    ctx.stroke();

    // Delicate offshoot branch to lower right blossom
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.moveTo(156, 302);
    ctx.quadraticCurveTo(246, 322, 338, 376);
    ctx.stroke();

    // Soft foliage leaves
    ctx.fillStyle = softInk;
    drawLeaf(ctx, 112, 342, -0.82, 58, 18);
    drawLeaf(ctx, 250, 182, 0.42, 62, 17);
    drawLeaf(ctx, 314, 128, -0.58, 52, 15);
    drawLeaf(ctx, 224, 324, 0.65, 56, 16);

    // Sharp foreground leaves
    ctx.fillStyle = primaryInk;
    drawLeaf(ctx, 84, 412, -1.05, 64, 19);
    drawLeaf(ctx, 172, 260, -0.35, 60, 17);
    drawLeaf(ctx, 276, 346, -0.45, 50, 15);
    drawLeaf(ctx, 355, 88, 0.36, 48, 14);

    // Focal open 5-petal blossom
    drawBlossom(
      ctx,
      198,
      202,
      62,
      5,
      -0.25,
      primaryInk,
      softInk,
      stamenContrast,
    );

    // Secondary open 6-petal blossom straddling upper right quadrant
    drawBlossom(
      ctx,
      368,
      86,
      46,
      6,
      0.38,
      softInk,
      primaryInk,
      stamenContrast,
    );

    // Lower airy bloom
    drawBlossom(
      ctx,
      344,
      382,
      44,
      5,
      0.72,
      primaryInk,
      softInk,
      stamenContrast,
    );

    // Delicate unopened buds
    ctx.fillStyle = primaryInk;
    drawLeaf(ctx, 108, 176, -1.2, 26, 11);
    ctx.fillStyle = softInk;
    drawLeaf(ctx, 294, 246, -0.78, 22, 9);

    ctx.restore();
  };

  const yOffset = (h - tileH) * 0.5;
  for (let iy = -1; iy <= repeatsY; iy += 1) {
    const oy = yOffset + iy * tileH;
    // Slight brick half-drop offset for natural textile rhythm
    const staggerX = iy % 2 === 0 ? 0 : -unitW * 0.36;
    for (let ix = -1; ix < repeatsX; ix += 1) {
      drawSingleTile(ix * unitW + staggerX, oy, unitW, tileH);
    }
  }
}

function drawStripesPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const period = (w / 5.5) * (motifScale / 100);
  const tones = derivePrintTones(baseHex, designHex);
  const softTone = tones.soft;
  const midTone = tones.secondary;
  const count = Math.ceil(w / period) + 2;

  for (let i = -1; i < count; i += 1) {
    const x = i * period;
    // Wide solid band
    ctx.fillStyle = tones.primary;
    ctx.fillRect(x, 0, period * 0.22, h);

    // Soft woven companion bar
    ctx.fillStyle = softTone;
    ctx.fillRect(x + period * 0.28, 0, period * 0.14, h);

    // Fine paired pinstripes
    ctx.fillStyle = tones.primary;
    ctx.fillRect(x + period * 0.5, 0, Math.max(1.5, period * 0.045), h);
    ctx.fillRect(x + period * 0.58, 0, Math.max(1.5, period * 0.045), h);

    // Medium rhythmic accent
    ctx.fillStyle = midTone;
    ctx.fillRect(x + period * 0.72, 0, period * 0.11, h);

    // Subtle hairline thread
    ctx.fillStyle = hexWithAlpha(tones.primary, 0.55);
    ctx.fillRect(x + period * 0.9, 0, Math.max(1, period * 0.02), h);
  }
}

function drawLandscapeArtwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  ctx.save();
  // Uniform centered scale (Artwork zoom) never stretches aspect ratio
  ctx.translate(w * 0.5, h * 0.5);
  ctx.scale(s, s);
  ctx.translate(-w * 0.5, -h * 0.5);

  const tones = derivePrintTones(baseHex, designHex);
  const distantHill = tones.distantRidge;
  const midHill = tones.midRidge;
  const foreRidge = tones.foreRidge;
  const darkInk = tones.foregroundInk;

  // Transparent sky wash so base felt luminescence shows through cleanly
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  skyGrad.addColorStop(0, hexWithAlpha(tones.soft, 0.24));
  skyGrad.addColorStop(1, hexWithAlpha(tones.soft, 0));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Quiet rising sun with delicate outer ring halo
  const sunX = w * 0.26;
  const sunY = h * 0.29;
  const sunR = Math.min(w, h) * 0.11;

  ctx.strokeStyle = hexWithAlpha(darkInk, 0.28);
  ctx.lineWidth = Math.max(1.5, w * 0.002);
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 1.38, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = tones.secondary;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  // Back sweeping ridge across full 16 panels
  ctx.fillStyle = distantHill;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.56);
  ctx.bezierCurveTo(w * 0.18, h * 0.42, w * 0.36, h * 0.58, w * 0.54, h * 0.46);
  ctx.bezierCurveTo(w * 0.72, h * 0.34, w * 0.88, h * 0.52, w, h * 0.42);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Middle rolling range
  ctx.fillStyle = midHill;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.64);
  ctx.bezierCurveTo(w * 0.22, h * 0.54, w * 0.38, h * 0.71, w * 0.61, h * 0.58);
  ctx.bezierCurveTo(w * 0.79, h * 0.49, w * 0.91, h * 0.66, w, h * 0.58);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Subtle horizon line crease
  ctx.strokeStyle = hexWithAlpha(darkInk, 0.2);
  ctx.lineWidth = Math.max(1, h * 0.003);
  ctx.beginPath();
  ctx.moveTo(w * 0.04, h * 0.73);
  ctx.quadraticCurveTo(w * 0.5, h * 0.69, w * 0.96, h * 0.74);
  ctx.stroke();

  // Foreground slope
  ctx.fillStyle = foreRidge;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.78);
  ctx.bezierCurveTo(w * 0.24, h * 0.71, w * 0.46, h * 0.83, w * 0.68, h * 0.75);
  ctx.bezierCurveTo(w * 0.83, h * 0.7, w * 0.93, h * 0.77, w, h * 0.73);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Rhythmic foreground grove of slender stylized trees & reeds
  ctx.fillStyle = darkInk;
  ctx.strokeStyle = darkInk;
  ctx.lineCap = 'round';

  const trees = [
    { x: 0.11, y: 0.76, h: 0.17, r: 0.017 },
    { x: 0.15, y: 0.75, h: 0.22, r: 0.022 },
    { x: 0.185, y: 0.77, h: 0.14, r: 0.014 },
    { x: 0.48, y: 0.80, h: 0.16, r: 0.016 },
    { x: 0.52, y: 0.79, h: 0.19, r: 0.018 },
    { x: 0.79, y: 0.74, h: 0.23, r: 0.024 },
    { x: 0.835, y: 0.75, h: 0.18, r: 0.018 },
    { x: 0.87, y: 0.76, h: 0.14, r: 0.013 },
  ];

  for (const t of trees) {
    const tx = w * t.x;
    const baseY = h * t.y + h * 0.04;
    const topY = baseY - h * t.h;
    ctx.lineWidth = Math.max(1.5, w * 0.0025);
    ctx.beginPath();
    ctx.moveTo(tx, baseY + h * 0.08);
    ctx.lineTo(tx, topY + h * 0.04);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(
      tx,
      topY + h * t.h * 0.34,
      w * t.r,
      h * t.h * 0.42,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Ground anchor band
  ctx.fillStyle = darkInk;
  ctx.fillRect(0, h * 0.89, w, h * 0.11);

  ctx.restore();
}

function drawWavesPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  const rows = 9;
  const freq = Math.max(1, Math.round(3 / Math.max(0.5, s)));
  const tones = derivePrintTones(baseHex, designHex);
  const softTone = tones.soft;
  const midTone = tones.secondary;

  ctx.lineCap = 'round';
  for (let row = 0; row < rows; row += 1) {
    const baseY = ((row + 0.65) / rows) * h;
    const amp = h * (0.042 + (row % 3) * 0.016) * Math.min(1.4, Math.max(0.65, s));
    const phase = row * 0.85;
    const lineW =
      h * (row % 3 === 0 ? 0.032 : row % 2 === 0 ? 0.018 : 0.01) * Math.max(0.6, Math.min(1.5, s));

    ctx.strokeStyle = row % 3 === 0 ? tones.primary : row % 2 === 0 ? midTone : softTone;
    ctx.lineWidth = Math.max(2, lineW);
    ctx.beginPath();

    const steps = 96;
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const x = u * w;
      const y =
        baseY +
        Math.sin(u * Math.PI * 2 * freq + phase) * amp +
        Math.cos(u * Math.PI * 4 * freq - phase * 0.6) * (amp * 0.28);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawUploadedImage(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bitmap: ImageBitmap | null,
  motifScale: number,
  tintHex?: string,
) {
  if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;

  // Aspect-ratio-preserving centered 'cover' at 100%, scaled uniformly by motifScale/100
  const coverScale = Math.max(w / bitmap.width, h / bitmap.height) * (motifScale / 100);
  const drawW = bitmap.width * coverScale;
  const drawH = bitmap.height * coverScale;
  const dx = (w - drawW) * 0.5;
  const dy = (h - drawH) * 0.5;

  if (!tintHex || typeof document === 'undefined') {
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, dx, dy, drawW, drawH);
    ctx.restore();
    return;
  }

  // Opt-in screen-print tinting preserves original transparency/alpha while mapping luminance to Print Color.
  const buffer = document.createElement('canvas');
  buffer.width = w;
  buffer.height = h;
  const bCtx = buffer.getContext('2d');
  if (!bCtx) return;

  bCtx.imageSmoothingEnabled = true;
  bCtx.imageSmoothingQuality = 'high';
  bCtx.drawImage(bitmap, dx, dy, drawW, drawH);

  const img = bCtx.getImageData(0, 0, w, h);
  const data = img.data;
  const { r: tr, g: tg, b: tb } = hexToRgb(tintHex);
  const { r: dr, g: dg, b: db } = hexToRgb(mixHex(tintHex, '#181113', 0.42));
  const { r: lr, g: lg, b: lb } = hexToRgb(mixHex(tintHex, '#FFFCF8', 0.45));

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    if (lum < 0.5) {
      const k = lum * 2;
      data[i] = Math.round(dr + (tr - dr) * k);
      data[i + 1] = Math.round(dg + (tg - dg) * k);
      data[i + 2] = Math.round(db + (tb - db) * k);
    } else {
      const k = (lum - 0.5) * 2;
      data[i] = Math.round(tr + (lr - tr) * k);
      data[i + 1] = Math.round(tg + (lg - tg) * k);
      data[i + 2] = Math.round(tb + (lb - tb) * k);
    }
  }
  bCtx.putImageData(img, 0, 0);

  ctx.save();
  ctx.drawImage(buffer, 0, 0);
  ctx.restore();
}

/**
 * Renders only the printed artwork layer over transparency (separate from base felt).
 */
export function renderPrintArtworkLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale' | 'tintUpload'>,
  uploadedBitmap: ImageBitmap | null = null,
): void {
  switch (design.print) {
    case 'bloom':
      drawBloomPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'stripes':
      drawStripesPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'landscape':
      drawLandscapeArtwork(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'waves':
      drawWavesPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'upload':
      if (uploadedBitmap) {
        drawUploadedImage(
          ctx,
          w,
          h,
          uploadedBitmap,
          design.motifScale,
          design.tintUpload ? design.designHex : undefined,
        );
      }
      break;
    case 'solid':
    default:
      break;
  }
}

/**
 * Renders any Fold 16 fabric design into a target 2D canvas.
 * Shared across Three.js CanvasTexture, Canvas 2D still fallback, room study, and swatch gallery.
 */
export function renderTextileToCanvas(
  canvas: HTMLCanvasElement,
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale' | 'tintUpload'>,
  uploadedBitmap: ImageBitmap | null = null,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Solid base felt color
  ctx.fillStyle = design.baseHex;
  ctx.fillRect(0, 0, w, h);

  // 2. Selected artwork layer over base felt
  renderPrintArtworkLayer(ctx, w, h, design, uploadedBitmap);

  // 3. Subtle felt wool micro-grain overlay so print integrates into textured felt even near white/black
  const lum = relativeLuminance(design.baseHex);
  const grain = getGrainPattern(ctx);
  if (grain) {
    ctx.save();
    ctx.globalAlpha = design.print === 'upload' ? 0.55 : lum > 0.85 || lum < 0.08 ? 0.75 : 1;
    ctx.fillStyle = grain;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/color.ts">
<![CDATA[export interface HsvColor {
  h: number; // 0..359
  s: number; // 0..100
  v: number; // 0..100
}

export interface RgbColor {
  r: number; // 0..255
  g: number; // 0..255
  b: number; // 0..255
}

const HEX_RE = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Normalizes #RGB, RGB, #RRGGBB, or RRGGBB into uppercase #RRGGBB.
 * Returns null for incomplete or invalid color strings.
 */
export function normalizeHex(input: string): string | null {
  const trimmed = input.trim();
  if (!HEX_RE.test(trimmed)) return null;
  const raw = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;
  if (raw.length === 3) {
    const expanded = raw
      .split('')
      .map((ch) => ch + ch)
      .join('');
    return `#${expanded.toUpperCase()}`;
  }
  return `#${raw.toUpperCase()}`;
}

export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex) ?? '#000000';
  const n = parseInt(norm.slice(1), 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clampByte = (n: number) =>
    Math.max(0, Math.min(255, Math.round(Number.isFinite(n) ? n : 0)));
  const toPair = (n: number) => clampByte(n).toString(16).padStart(2, '0').toUpperCase();
  return `#${toPair(r)}${toPair(g)}${toPair(b)}`;
}

/**
 * Converts sRGB hex to HSV (h in [0, 359], s in [0, 100], v in [0, 100]).
 * Preserves fallbackHue when saturation is zero so gray/black/white edits remain predictable.
 */
export function hexToHsv(hex: string, fallbackHue = 0): HsvColor {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;

  let h = Number.isFinite(fallbackHue) ? ((fallbackHue % 360) + 360) % 360 : 0;
  if (d > 1e-6) {
    if (max === rn) {
      h = 60 * (((gn - bn) / d) % 6);
    } else if (max === gn) {
      h = 60 * ((bn - rn) / d + 2);
    } else {
      h = 60 * ((rn - gn) / d + 4);
    }
    if (h < 0) h += 360;
  }

  const s = max <= 1e-6 ? 0 : (d / max) * 100;
  const v = max * 100;

  return {
    h: Math.round(h) % 360,
    s: Math.round(s),
    v: Math.round(v),
  };
}

export function hsvToRgb(h: number, s: number, v: number): RgbColor {
  const hue = Number.isFinite(h) ? ((h % 360) + 360) % 360 : 0;
  const sat = Math.max(0, Math.min(100, Number.isFinite(s) ? s : 0)) / 100;
  const val = Math.max(0, Math.min(100, Number.isFinite(v) ? v : 0)) / 100;

  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;

  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (hue < 60) {
    rp = c; gp = x; bp = 0;
  } else if (hue < 120) {
    rp = x; gp = c; bp = 0;
  } else if (hue < 180) {
    rp = 0; gp = c; bp = x;
  } else if (hue < 240) {
    rp = 0; gp = x; bp = c;
  } else if (hue < 300) {
    rp = x; gp = 0; bp = c;
  } else {
    rp = c; gp = 0; bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

/**
 * Linearly mixes two sRGB hex colors (t = 0 returns a, t = 1 returns b).
 */
export function mixHex(hexA: string, hexB: string, t: number): string {
  const k = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  return rgbToHex(
    a.r + (b.r - a.r) * k,
    a.g + (b.g - a.g) * k,
    a.b + (b.b - a.b) * k,
  );
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export interface Oklab {
  L: number;
  a: number;
  b: number;
}

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export interface PrintContrastAssessment {
  contrastRatio: number;
  deltaE: number;
  deltaL: number;
  isLowContrast: boolean;
  direction: 'lighter' | 'darker';
}

function srgbChannelToLinear(channel255: number): number {
  const v = channel255 / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function linearToSrgb255(linear: number): number {
  const clamped = Math.max(0, Math.min(1, linear));
  const encoded =
    clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, encoded)) * 255);
}

export function hexToOklab(hex: string): Oklab {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbChannelToLinear(r);
  const G = srgbChannelToLinear(g);
  const B = srgbChannelToLinear(b);

  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function hexToOklch(hex: string): Oklch {
  const { L, a, b } = hexToOklab(hex);
  const c = Math.hypot(a, b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: L, c, h };
}

function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;

  return [
    +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];
}

function isInSrgbGamut(rLin: number, gLin: number, bLin: number): boolean {
  const eps = 1e-4;
  return (
    rLin >= -eps &&
    rLin <= 1 + eps &&
    gLin >= -eps &&
    gLin <= 1 + eps &&
    bLin >= -eps &&
    bLin <= 1 + eps
  );
}

/**
 * Converts OKLCH to the nearest in-gamut sRGB hex by binary-searching chroma
 * at the target lightness and hue.
 */
export function oklchToHex(l: number, c: number, h: number): string {
  const L = Math.max(0, Math.min(1, l));
  const C = Math.max(0, c);
  const rad = (h * Math.PI) / 180;
  const cosH = Math.cos(rad);
  const sinH = Math.sin(rad);

  const [r0, g0, b0] = oklabToLinearSrgb(L, C * cosH, C * sinH);
  if (isInSrgbGamut(r0, g0, b0)) {
    return rgbToHex(linearToSrgb255(r0), linearToSrgb255(g0), linearToSrgb255(b0));
  }

  let lo = 0;
  let hi = C;
  for (let i = 0; i < 14; i += 1) {
    const mid = (lo + hi) * 0.5;
    const [r, g, b] = oklabToLinearSrgb(L, mid * cosH, mid * sinH);
    if (isInSrgbGamut(r, g, b)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const [r, g, b] = oklabToLinearSrgb(L, lo * cosH, lo * sinH);
  return rgbToHex(linearToSrgb255(r), linearToSrgb255(g), linearToSrgb255(b));
}

export function colorDistanceOklab(hexA: string, hexB: string): number {
  const a = hexToOklab(hexA);
  const b = hexToOklab(hexB);
  return Math.hypot(a.L - b.L, a.a - b.a, a.b - b.b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluates print legibility on felt panels using both WCAG relative-luminance
 * contrast ratio and OKLab perceptual color difference.
 */
export function evaluatePrintContrast(
  baseHex: string,
  printHex: string,
): PrintContrastAssessment {
  const ratio = contrastRatio(baseHex, printHex);
  const labBase = hexToOklab(baseHex);
  const labPrint = hexToOklab(printHex);
  const deltaL = Math.abs(labBase.L - labPrint.L);
  const deltaE = Math.hypot(deltaL, labBase.a - labPrint.a, labBase.b - labPrint.b);
  const isLowContrast = ratio < 1.8 || (ratio < 2.35 && deltaE < 0.22);
  const direction: 'lighter' | 'darker' = labBase.L < 0.58 ? 'lighter' : 'darker';

  return {
    contrastRatio: ratio,
    deltaE,
    deltaL,
    isLowContrast,
    direction,
  };
}

const CONTRAST_SUGGESTION_POOL = [
  '#FFFCF8', // Porcelain ivory
  '#4B202A', // Deep oxblood plum
  '#2B2426', // Charcoal umber
  '#F3E8E4', // Blush ivory
  '#E4C578', // Pale warm gold
  '#2E5240', // Pine green
  '#D8C4A7', // Flax oat
  '#9A463D', // Clay terracotta
] as const;

/**
 * Suggests a legible, editorial contrasting print pigment for the given base felt.
 */
export function suggestContrastingPrintColor(
  baseHex: string,
  currentPrintHex?: string,
): string {
  const baseNorm = normalizeHex(baseHex) ?? '#D8C4A7';
  const currentNorm = (currentPrintHex ? normalizeHex(currentPrintHex) : null) ?? '';
  const baseLab = hexToOklab(baseNorm);
  const preferLight = baseLab.L < 0.58;

  let bestHex: string = preferLight ? '#FFFCF8' : '#2B2426';
  let bestScore = -Infinity;

  for (const candidate of CONTRAST_SUGGESTION_POOL) {
    if (candidate === baseNorm) continue;
    const assessment = evaluatePrintContrast(baseNorm, candidate);
    if (assessment.isLowContrast) continue;

    const candLab = hexToOklab(candidate);
    const sameDirection = preferLight ? candLab.L > baseLab.L : candLab.L < baseLab.L;
    let score = assessment.contrastRatio + assessment.deltaE * 6;
    if (sameDirection) score += 8;
    if (candidate === '#FFFCF8' && preferLight) score += 1.5;
    if (candidate === '#4B202A' && !preferLight) score += 1.2;
    if (candidate === currentNorm) score -= 20;

    if (score > bestScore) {
      bestScore = score;
      bestHex = candidate;
    }
  }

  return bestHex;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/ColorWheel.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import {
  evaluatePrintContrast,
  hexToHsv,
  hsvToHex,
  normalizeHex,
  suggestContrastingPrintColor,
} from './color';
import { COLOR_PRESETS } from './config';
import { useFold } from './FoldProvider';
import { NativeColorInput } from './NativeColorInput';
import { usesActivePrintColor } from './state';

export type ColorTarget = 'base' | 'design';

const WHEEL_SIZE = 204;
const WHEEL_CENTER = WHEEL_SIZE / 2;
const OUTER_RADIUS = 96;
const INNER_RADIUS = 72;
const SV_HALF = Math.floor((INNER_RADIUS - 7) / Math.SQRT2);
const SV_LEFT = Math.round(WHEEL_CENTER - SV_HALF);
const SV_SIZE = SV_HALF * 2;

export const ColorWheel: React.FC<{
  idPrefix?: string;
  initialTarget?: ColorTarget;
}> = ({ idPrefix = 'srf', initialTarget }) => {
  const { design, setBaseHex, setDesignHex } = useFold();
  const designDisabled = !usesActivePrintColor(design);
  const contrast = evaluatePrintContrast(design.baseHex, design.designHex);

  const [target, setTarget] = useState<ColorTarget>(initialTarget ?? 'base');
  const activeHex = target === 'base' ? design.baseHex : design.designHex;
  const activeDisabled = target === 'design' && designDisabled;

  useEffect(() => {
    if (initialTarget) {
      setTarget(initialTarget);
    }
  }, [initialTarget]);

  // Preserve hue independently across zero-saturation edits (black/white/gray)
  const hueMemoryRef = useRef<{ base: number; design: number }>({
    base: hexToHsv(design.baseHex, 34).h,
    design: hexToHsv(design.designHex, 346).h,
  });

  const activeHsv = hexToHsv(activeHex, hueMemoryRef.current[target]);

  const [draftHex, setDraftHex] = useState<string>(activeHex);
  const [hexError, setHexError] = useState<string | null>(null);
  const isEditingHexRef = useRef(false);

  // Sync draft field when switching target or dragging wheel/sliders/chips
  useEffect(() => {
    if (!isEditingHexRef.current) {
      setDraftHex(activeHex);
      setHexError(null);
    }
    const parsed = hexToHsv(activeHex, hueMemoryRef.current[target]);
    if (parsed.s > 0) {
      hueMemoryRef.current[target] = parsed.h;
    }
  }, [activeHex, target]);

  const commitHexForTarget = useCallback(
    (nextHex: string, explicitTarget: ColorTarget = target) => {
      if (explicitTarget === 'base') {
        setBaseHex(nextHex);
      } else if (!designDisabled) {
        setDesignHex(nextHex);
      }
    },
    [target, designDisabled, setBaseHex, setDesignHex],
  );

  const commitHsv = useCallback(
    (h: number, s: number, v: number) => {
      const normH = ((Math.round(h) % 360) + 360) % 360;
      const clampS = Math.max(0, Math.min(100, Math.round(s)));
      const clampV = Math.max(0, Math.min(100, Math.round(v)));
      hueMemoryRef.current[target] = normH;
      const nextHex = hsvToHex(normH, clampS, clampV);
      commitHexForTarget(nextHex);
    },
    [target, commitHexForTarget],
  );

  // Draw the HSV wheel canvas (hue ring + current hue SV square + crisp crosshairs)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringTileRef = useRef<HTMLCanvasElement | null>(null);

  const renderWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pxSize = WHEEL_SIZE * dpr;
    if (canvas.width !== pxSize || canvas.height !== pxSize) {
      canvas.width = pxSize;
      canvas.height = pxSize;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cache static hue ring once at 1x resolution and draw smoothly
    if (!ringTileRef.current) {
      const tile = document.createElement('canvas');
      tile.width = pxSize;
      tile.height = pxSize;
      const tCtx = tile.getContext('2d');
      if (tCtx) {
        tCtx.scale(dpr, dpr);
        for (let deg = 0; deg < 360; deg += 1) {
          const a0 = ((deg - 0.6 - 90) * Math.PI) / 180;
          const a1 = ((deg + 0.9 - 90) * Math.PI) / 180;
          tCtx.beginPath();
          tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, OUTER_RADIUS, a0, a1);
          tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, INNER_RADIUS, a1, a0, true);
          tCtx.closePath();
          tCtx.fillStyle = hsvToHex(deg, 100, 100);
          tCtx.fill();
        }
        // Subtle hairline framing for crisp separation on warm rose background
        tCtx.strokeStyle = 'rgba(75, 32, 42, 0.22)';
        tCtx.lineWidth = 1;
        tCtx.beginPath();
        tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, OUTER_RADIUS, 0, Math.PI * 2);
        tCtx.stroke();
        tCtx.beginPath();
        tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, INNER_RADIUS, 0, Math.PI * 2);
        tCtx.stroke();
      }
      ringTileRef.current = tile;
    }

    ctx.save();
    ctx.clearRect(0, 0, pxSize, pxSize);
    ctx.drawImage(ringTileRef.current, 0, 0);
    ctx.scale(dpr, dpr);

    // Inner S/V square: pure white -> hue horizontal gradient overlaid with transparent -> black vertical gradient
    const huePure = hsvToHex(activeHsv.h, 100, 100);
    const gradX = ctx.createLinearGradient(SV_LEFT, 0, SV_LEFT + SV_SIZE, 0);
    gradX.addColorStop(0, '#FFFFFF');
    gradX.addColorStop(1, huePure);
    ctx.fillStyle = gradX;
    ctx.fillRect(SV_LEFT, SV_LEFT, SV_SIZE, SV_SIZE);

    const gradY = ctx.createLinearGradient(0, SV_LEFT, 0, SV_LEFT + SV_SIZE);
    gradY.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradY.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = gradY;
    ctx.fillRect(SV_LEFT, SV_LEFT, SV_SIZE, SV_SIZE);

    ctx.strokeStyle = 'rgba(75, 32, 42, 0.28)';
    ctx.lineWidth = 1;
    ctx.strokeRect(SV_LEFT + 0.5, SV_LEFT + 0.5, SV_SIZE - 1, SV_SIZE - 1);

    // Hue ring marker (0° red at top, increasing clockwise)
    const hueRad = ((activeHsv.h - 90) * Math.PI) / 180;
    const midR = (OUTER_RADIUS + INNER_RADIUS) * 0.5;
    const hx = WHEEL_CENTER + Math.cos(hueRad) * midR;
    const hy = WHEEL_CENTER + Math.sin(hueRad) * midR;

    ctx.beginPath();
    ctx.arc(hx, hy, 7, 0, Math.PI * 2);
    ctx.fillStyle = huePure;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFCF8';
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4B202A';
    ctx.stroke();

    // Inner SV reticle
    const sx = SV_LEFT + (activeHsv.s / 100) * SV_SIZE;
    const sy = SV_LEFT + (1 - activeHsv.v / 100) * SV_SIZE;
    ctx.beginPath();
    ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = activeHex;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFCF8';
    ctx.stroke();
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = '#2B2426';
    ctx.stroke();

    ctx.restore();
  }, [activeHex, activeHsv.h, activeHsv.s, activeHsv.v]);

  useEffect(() => {
    renderWheel();
  }, [renderWheel]);

  // Wheel pointer interaction with capture & rAF throttling
  const dragRef = useRef<{
    pointerId: number | null;
    zone: 'hue' | 'sv' | null;
    rafId: number;
    pendingHsv: { h: number; s: number; v: number } | null;
  }>({
    pointerId: null,
    zone: null,
    rafId: 0,
    pendingHsv: null,
  });

  const pointToHsv = (clientX: number, clientY: number, zone: 'hue' | 'sv') => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * WHEEL_SIZE;
    const y = ((clientY - rect.top) / rect.height) * WHEEL_SIZE;

    if (zone === 'hue') {
      const dx = x - WHEEL_CENTER;
      const dy = y - WHEEL_CENTER;
      // 0° top (negative Y), increasing clockwise
      let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      deg = ((deg % 360) + 360) % 360;
      return {
        h: Math.round(deg) % 360,
        s: activeHsv.s,
        v: activeHsv.v,
      };
    }

    const s = Math.max(0, Math.min(100, ((x - SV_LEFT) / SV_SIZE) * 100));
    const v = Math.max(0, Math.min(100, (1 - (y - SV_LEFT) / SV_SIZE) * 100));
    return {
      h: hueMemoryRef.current[target],
      s: Math.round(s),
      v: Math.round(v),
    };
  };

  const endWheelDrag = useCallback(
    (commit: boolean) => {
      const d = dragRef.current;
      if (d.rafId) {
        cancelAnimationFrame(d.rafId);
        d.rafId = 0;
      }
      if (commit && d.pendingHsv) {
        commitHsv(d.pendingHsv.h, d.pendingHsv.s, d.pendingHsv.v);
      }
      if (d.pointerId !== null && canvasRef.current) {
        try {
          if (canvasRef.current.hasPointerCapture(d.pointerId)) {
            canvasRef.current.releasePointerCapture(d.pointerId);
          }
        } catch {
          // ignore
        }
      }
      d.pointerId = null;
      d.zone = null;
      d.pendingHsv = null;
    },
    [commitHsv],
  );

  useEffect(() => {
    return () => endWheelDrag(false);
  }, [endWheelDrag]);

  const handleWheelPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeDisabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WHEEL_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * WHEEL_SIZE;
    const dist = Math.hypot(x - WHEEL_CENTER, y - WHEEL_CENTER);

    let zone: 'hue' | 'sv' | null = null;
    if (dist >= INNER_RADIUS - 4 && dist <= OUTER_RADIUS + 8) {
      zone = 'hue';
    } else if (
      x >= SV_LEFT - 4 &&
      x <= SV_LEFT + SV_SIZE + 4 &&
      y >= SV_LEFT - 4 &&
      y <= SV_LEFT + SV_SIZE + 4
    ) {
      zone = 'sv';
    }
    if (!zone) return;

    const d = dragRef.current;
    d.pointerId = e.pointerId;
    d.zone = zone;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const next = pointToHsv(e.clientX, e.clientY, zone);
    if (next) {
      d.pendingHsv = next;
      commitHsv(next.h, next.s, next.v);
    }
  };

  const handleWheelPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (d.pointerId !== e.pointerId || !d.zone) return;
    const next = pointToHsv(e.clientX, e.clientY, d.zone);
    if (!next) return;
    d.pendingHsv = next;

    if (d.rafId === 0) {
      d.rafId = requestAnimationFrame(() => {
        d.rafId = 0;
        if (d.pendingHsv) {
          commitHsv(d.pendingHsv.h, d.pendingHsv.s, d.pendingHsv.v);
        }
      });
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDraftHex(val);
    const normalized = normalizeHex(val);
    if (normalized) {
      setHexError(null);
      commitHexForTarget(normalized);
    }
  };

  const handleHexCommit = () => {
    isEditingHexRef.current = false;
    const normalized = normalizeHex(draftHex);
    if (normalized) {
      setDraftHex(normalized);
      setHexError(null);
      commitHexForTarget(normalized);
    } else {
      setHexError('Enter a hex color such as #9A463D.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Base vs Print color target selector */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          data-testid={`${idPrefix}-target-base-btn`}
          aria-pressed={target === 'base'}
          onClick={() => setTarget('base')}
          className={`flex items-center gap-2.5 p-2.5 rounded-[8px] border text-left transition-colors min-h-[52px] ${
            target === 'base'
              ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
              : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)]'
          }`}
        >
          <span
            className="w-7 h-7 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
            style={{ backgroundColor: design.baseHex }}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-[var(--srf-oxblood)]">
              Base color
            </span>
            <span className="block srf-mono-caption text-[var(--srf-mauve)] truncate">
              {design.baseHex}
            </span>
          </span>
          {target === 'base' && (
            <Check className="w-4 h-4 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          data-testid={`${idPrefix}-target-print-btn`}
          aria-disabled={designDisabled}
          aria-pressed={!designDisabled && target === 'design'}
          onClick={() => setTarget('design')}
          className={`flex items-center gap-2.5 p-2.5 rounded-[8px] border text-left transition-colors min-h-[52px] ${
            designDisabled
              ? target === 'design'
                ? 'border-[var(--srf-oxblood)]/60 opacity-65 bg-[var(--srf-rose)] ring-1 ring-[var(--srf-oxblood)]/20'
                : 'border-[var(--srf-hairline)] opacity-55 bg-[var(--srf-rose)] hover:opacity-75'
              : target === 'design'
                ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
                : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)]'
          }`}
        >
          <span
            className="w-7 h-7 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
            style={{ backgroundColor: design.designHex }}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-[var(--srf-oxblood)]">
              Print color
            </span>
            <span className="block srf-mono-caption text-[var(--srf-mauve)] truncate">
              {design.designHex}
            </span>
          </span>
          {!designDisabled && target === 'design' && (
            <Check className="w-4 h-4 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
          )}
        </button>
      </div>

      {designDisabled && (
        <p className="srf-mono-caption text-[var(--srf-mauve)]" data-testid={`${idPrefix}-print-color-saved-note`}>
          {design.print === 'solid'
            ? `Print color (${design.designHex}) is inactive on Solid felt and returns when you choose a pattern.`
            : `Print color (${design.designHex}) stays saved; enable image tint in Print options to recolor uploads.`}
        </p>
      )}

      {!designDisabled && contrast.isLowContrast && (
        <div
          role="status"
          data-testid={`${idPrefix}-contrast-warning`}
          className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-[6px] border border-[var(--srf-clay)]/40 bg-[var(--srf-porcelain)] text-xs text-[var(--srf-oxblood)]"
        >
          <span>Low print contrast — try a lighter or darker color.</span>
          <button
            type="button"
            data-testid={`${idPrefix}-suggest-contrast-btn`}
            onClick={() => {
              const suggested = suggestContrastingPrintColor(design.baseHex, design.designHex);
              setHexError(null);
              if (target === 'design') {
                setDraftHex(suggested);
              }
              setDesignHex(suggested);
            }}
            className="px-2.5 py-1 rounded-[4px] border border-[var(--srf-oxblood)] bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] font-medium hover:bg-[var(--srf-clay)] hover:border-[var(--srf-clay)] transition-colors shrink-0"
          >
            Suggest contrast
          </button>
        </div>
      )}

      {/* Wheel + Accessible HSV Sliders + Hex */}
      <div className="p-4 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="shrink-0 flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              data-testid="srf-color-wheel-canvas"
              onPointerDown={handleWheelPointerDown}
              onPointerMove={handleWheelPointerMove}
              onPointerUp={(e) => {
                if (dragRef.current.pointerId === e.pointerId) endWheelDrag(true);
              }}
              onPointerCancel={(e) => {
                if (dragRef.current.pointerId === e.pointerId) endWheelDrag(false);
              }}
              onLostPointerCapture={() => endWheelDrag(false)}
              style={{
                width: 'min(204px, 100%)',
                height: 'auto',
                aspectRatio: '1 / 1',
                touchAction: 'none',
              }}
              className={activeDisabled ? 'opacity-50 pointer-events-none' : 'cursor-crosshair'}
              aria-hidden="true"
            />
          </div>

          <div className="w-full min-w-0 flex-1 space-y-3">
            {/* Hex text field & native picker */}
            <div>
              <label
                htmlFor={`${idPrefix}-hex-input`}
                className="block srf-mono-caption text-[var(--srf-oxblood)] mb-1"
              >
                Hex color ({target === 'base' ? 'Base color' : 'Print color'})
              </label>
              <div className="flex items-center gap-2">
                <NativeColorInput
                  id={`${idPrefix}-color-picker`}
                  testId={`${idPrefix}-color-picker`}
                  value={activeHex}
                  disabled={activeDisabled}
                  onHexChange={(normalized) => {
                    setHexError(null);
                    setDraftHex(normalized);
                    commitHexForTarget(normalized);
                  }}
                  ariaLabel={`Color picker for ${target === 'base' ? 'Base color' : 'Print color'}`}
                  className="w-10 h-10 p-0.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <input
                  id={`${idPrefix}-hex-input`}
                  data-testid={`${idPrefix}-hex-input`}
                  type="text"
                  value={draftHex}
                  disabled={activeDisabled}
                  onFocus={() => {
                    isEditingHexRef.current = true;
                  }}
                  onChange={handleHexInputChange}
                  onBlur={handleHexCommit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleHexCommit();
                    }
                  }}
                  aria-invalid={hexError ? 'true' : undefined}
                  aria-describedby={hexError ? `${idPrefix}-hex-error` : undefined}
                  placeholder="#9A463D"
                  className="w-full min-h-[40px] px-3 py-1.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-sm font-[family-name:var(--font-mono)] uppercase text-[var(--srf-oxblood)] disabled:opacity-55 disabled:cursor-not-allowed"
                />
              </div>
              {hexError && (
                <p
                  id={`${idPrefix}-hex-error`}
                  className="mt-1 text-xs font-medium text-[var(--srf-clay)]"
                >
                  {hexError}
                </p>
              )}
            </div>

            {/* Labeled keyboard-accessible HSV sliders */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-hue-slider`}>Hue</label>
                  <span>{activeHsv.h}°</span>
                </div>
                <input
                  id={`${idPrefix}-hue-slider`}
                  type="range"
                  min={0}
                  max={359}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.h}
                  onChange={(e) =>
                    commitHsv(Number(e.target.value), activeHsv.s, activeHsv.v)
                  }
                  className="srf-range !h-8"
                />
              </div>

              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-sat-slider`}>Saturation</label>
                  <span>{activeHsv.s}%</span>
                </div>
                <input
                  id={`${idPrefix}-sat-slider`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.s}
                  onChange={(e) =>
                    commitHsv(hueMemoryRef.current[target], Number(e.target.value), activeHsv.v)
                  }
                  className="srf-range !h-8"
                />
              </div>

              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-val-slider`}>Brightness</label>
                  <span>{activeHsv.v}%</span>
                </div>
                <input
                  id={`${idPrefix}-val-slider`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.v}
                  onChange={(e) =>
                    commitHsv(hueMemoryRef.current[target], activeHsv.s, Number(e.target.value))
                  }
                  className="srf-range !h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 10 Curated felt swatch shortcuts (always including Clay, Flax, Sage) */}
        <div>
          <div className="srf-mono-caption text-[var(--srf-mauve)] mb-2">
            Felt shortcuts for {target === 'base' ? 'base color' : 'print color'}
          </div>
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((preset) => {
              const matched = activeHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={activeDisabled}
                  aria-label={`${target === 'base' ? 'Base' : 'Print'} preset ${preset.name} (${preset.hex})`}
                  aria-pressed={matched}
                  title={`${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setHexError(null);
                    setDraftHex(preset.hex);
                    commitHexForTarget(preset.hex);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-[6px] border text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    matched
                      ? 'border-[var(--srf-oxblood)] bg-[var(--srf-porcelain)] ring-1 ring-[var(--srf-oxblood)] text-[var(--srf-oxblood)] font-medium'
                      : 'border-[var(--srf-hairline)] bg-[var(--srf-porcelain)]/70 hover:border-[var(--srf-oxblood)] text-[var(--srf-oxblood)]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
                    style={{ backgroundColor: preset.hex }}
                    aria-hidden="true"
                  />
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/config.ts">
<![CDATA[import type { DesignState } from './state';

export type PrintId = 'solid' | 'bloom' | 'stripes' | 'landscape' | 'waves' | 'upload';
export type ViewId = 'front' | 'quarter' | 'side' | 'back';

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface PrintSpec {
  id: PrintId;
  name: string;
  subtitle: string;
  scaleLabel: string;
  usesDesignColor: boolean;
  usesScale: boolean;
}

export interface ViewState {
  yawDeg: number;
  elevationDeg: number;
}

export interface ViewSpec {
  id: ViewId;
  label: string;
  yawDeg: number;
  elevationDeg: number;
}

export const PALETTE = {
  rose: '#F3E8E4',
  oxblood: '#4B202A',
  clay: '#9A463D',
  mauve: '#735B60',
  flax: '#D8C4A7',
  sage: '#A6B3A0',
  porcelain: '#FFFCF8',
} as const;

export const FOLD_CONSTANTS = {
  panels: 16,
  panelPitch: 0.18,
  height: 1.6,
  thickness: 0.012,
  developedLength: 16 * 0.18,
  closedAngleDeg: 76,
  openAngleDeg: 18,
  defaultOpening: 50,
  footWidth: 0.1,
  footDepth: 0.38,
  footHeight: 0.012,
  cameraFovDeg: 31,
  cameraNear: 0.08,
  cameraFar: 140,
  cameraFitPadding: 1.04,
  minElevationDeg: 5,
  maxElevationDeg: 30,
  rotateStepDeg: 15,
} as const;

/**
 * Curated architectural textile felt swatches (8-12 chips, always including Clay, Flax, Sage).
 */
export const COLOR_PRESETS: readonly ColorPreset[] = [
  { id: 'clay', name: 'Clay', hex: '#9A463D', description: 'Warm iron-earth wool felt' },
  { id: 'flax', name: 'Flax', hex: '#D8C4A7', description: 'Unbleached natural oat felt' },
  { id: 'sage', name: 'Sage', hex: '#A6B3A0', description: 'Muted mineral green felt' },
  { id: 'oxblood', name: 'Oxblood', hex: '#4B202A', description: 'Deep plum-oxblood ink' },
  { id: 'porcelain', name: 'Porcelain', hex: '#FFFCF8', description: 'Warm chalk ivory felt' },
  { id: 'rose', name: 'Rose', hex: '#F3E8E4', description: 'Blush plaster felt' },
  { id: 'ochre', name: 'Ochre', hex: '#C68D47', description: 'Raw sienna wool felt' },
  { id: 'slate', name: 'Slate', hex: '#4D657A', description: 'Soft indigo mineral felt' },
  { id: 'pine', name: 'Pine', hex: '#2E5240', description: 'Deep botanical green felt' },
  { id: 'charcoal', name: 'Charcoal', hex: '#2B2426', description: 'Warm smoked umber felt' },
] as const;

export const PRINT_SPECS: Record<PrintId, PrintSpec> = {
  bloom: {
    id: 'bloom',
    name: 'Bloom',
    subtitle: 'Botanical stems across pleats',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  stripes: {
    id: 'stripes',
    name: 'Stripes',
    subtitle: 'Alternating woven lines',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  landscape: {
    id: 'landscape',
    name: 'Landscape',
    subtitle: 'Full-width hills & horizon sun',
    scaleLabel: 'Artwork zoom',
    usesDesignColor: true,
    usesScale: true,
  },
  waves: {
    id: 'waves',
    name: 'Waves',
    subtitle: 'Flowing contour ribbons',
    scaleLabel: 'Motif size',
    usesDesignColor: true,
    usesScale: true,
  },
  solid: {
    id: 'solid',
    name: 'Solid',
    subtitle: 'Pure textured wool felt',
    scaleLabel: 'Motif size',
    usesDesignColor: false,
    usesScale: false,
  },
  upload: {
    id: 'upload',
    name: 'Your image',
    subtitle: 'Browser-only artwork',
    scaleLabel: 'Artwork zoom',
    usesDesignColor: false,
    usesScale: true,
  },
};

export const BUILTIN_PRINT_ORDER: PrintId[] = [
  'bloom',
  'stripes',
  'landscape',
  'waves',
  'solid',
];

export const DEFAULT_DESIGN: DesignState = {
  opening: FOLD_CONSTANTS.defaultOpening,
  baseHex: '#D8C4A7',
  designHex: '#4B202A',
  print: 'bloom',
  motifScale: 100,
  tintUpload: false,
};

export const DEFAULT_VIEW: ViewState = {
  yawDeg: 34,
  elevationDeg: 20,
};

export const VIEW_PRESETS: Record<ViewId, ViewSpec> = {
  front: {
    id: 'front',
    label: 'Front',
    yawDeg: 0,
    elevationDeg: 6,
  },
  quarter: {
    id: 'quarter',
    label: 'Three quarter',
    yawDeg: 34,
    elevationDeg: 20,
  },
  side: {
    id: 'side',
    label: 'Side',
    yawDeg: 84,
    elevationDeg: 9,
  },
  back: {
    id: 'back',
    label: 'Back',
    yawDeg: 180,
    elevationDeg: 14,
  },
};

export const VIEW_ORDER: ViewId[] = ['front', 'quarter', 'side', 'back'];

export const NAV_ITEMS = [
  { href: '#fold', label: 'The fold' },
  { href: '#configure', label: 'Studio' },
  { href: '#rooms', label: 'In a room' },
  { href: '#questions', label: 'Questions' },
] as const;

export const STORY_CHAPTERS = [
  {
    index: '01',
    title: 'Gather it close.',
    body: 'Keep a compact boundary beside a desk or chair. The pleats stay connected as the footprint changes.',
    sampleOpening: 0,
  },
  {
    index: '02',
    title: 'Give it room.',
    body: 'Open the same sixteen panels into a wider screen. Its span changes; its material length stays the same.',
    sampleOpening: 100,
  },
  {
    index: '03',
    title: 'Make it yours.',
    body: 'Choose your base felt color, layer a printed pattern or artwork, and orbit around the result.',
    sampleOpening: 50,
  },
] as const;

export const ROOM_STUDIES = [
  {
    id: 'reading',
    title: 'Your design in a corner',
    copy: 'A soft edge shaped with your current colors and artwork.',
    opening: 35,
    live: true,
    fixedDesign: null,
  },
  {
    id: 'studio',
    title: 'Shared studio',
    copy: 'A little separation where two working days overlap.',
    opening: 75,
    live: false,
    fixedDesign: {
      opening: 75,
      baseHex: '#9A463D',
      designHex: '#FFFCF8',
      print: 'stripes' as PrintId,
      motifScale: 100,
    },
    caption: 'Example study · Clay #9A463D · Stripes at 75%',
  },
  {
    id: 'morning',
    title: 'Slow morning',
    copy: 'A boundary you can change when the day changes.',
    opening: 60,
    live: false,
    fixedDesign: {
      opening: 60,
      baseHex: '#A6B3A0',
      designHex: '#4B202A',
      print: 'waves' as PrintId,
      motifScale: 100,
    },
    caption: 'Example study · Sage #A6B3A0 · Waves at 60%',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'How wide is Fold 16?',
    answer:
      'In this concept model, the outer span runs from approximately 0.71 m to 2.74 m. The opening control shows the current span.',
  },
  {
    question: 'Does opening it stretch the panels?',
    answer:
      'No. Each of the sixteen panels keeps the same length. Custom prints and artwork map across the continuous developed surface and travel cleanly with the folds.',
  },
  {
    question: 'Can I choose my own colors and print?',
    answer:
      'Yes. Pick any base felt and print hex color using the hue wheel, sliders, hex field, native picker, or curated swatches, then choose from Bloom, Stripes, Landscape, Waves, Solid, or your own browser-session image.',
  },
  {
    question: 'Is this an acoustic performance claim?',
    answer:
      'No. This is a design concept for a felt divider. No acoustic rating or laboratory result is represented.',
  },
  {
    question: 'Do I need a powerful device to explore it?',
    answer:
      'No. Both the interactive 3D view and the still canvas view render your exact colors, print, opening, and rotation angle.',
  },
  {
    question: 'What happens when I build a brief?',
    answer:
      'A configuration summary — including opening, span, colors, print, and any local session image filename — is prepared in this browser for download as a text file. Nothing is sent and no order is placed.',
  },
] as const;

export function findColorPresetName(hex: string): string | null {
  const upper = hex.toUpperCase();
  const match = COLOR_PRESETS.find((c) => c.hex.toUpperCase() === upper);
  return match ? match.name : null;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/Configurator.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, RotateCw } from 'lucide-react';
import { ColorWheel } from './ColorWheel';
import {
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_ORDER,
  VIEW_PRESETS,
} from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import { PrintGallery } from './PrintGallery';
import { normalizeYawDeg, usesActivePrintColor, viewPresetFromAngles } from './state';

export const Configurator: React.FC = () => {
  const {
    mode,
    design,
    view,
    effectiveOpening,
    effectivePose,
    env,
    uploadedArt,
    setOpening,
    setViewPreset,
    rotateViewStep,
    resetView,
    resetShape,
    resetDesign,
    followStory,
    subscribeStoryFrame,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const rangeRef = useRef<HTMLInputElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const summarySpanRef = useRef<HTMLSpanElement>(null);

  const [announcement, setAnnouncement] = useState('');

  // Keep shape slider and readouts synced cleanly during manual edits, story scrub, and chain choreography
  useEffect(() => {
    const syncDom = (val: number, spanMeters?: number) => {
      const rounded = Math.round(val);
      const formattedSpan = formatMeters(
        typeof spanMeters === 'number' ? spanMeters : deriveFold(val).metrics.outerSpan,
      );
      if (rangeRef.current) {
        rangeRef.current.value = String(rounded);
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${rounded}%`;
      }
      if (spanRef.current) {
        spanRef.current.textContent = formattedSpan;
      }
      if (summarySpanRef.current) {
        summarySpanRef.current.textContent = formattedSpan;
      }
    };

    const liveChain = getLiveChainFrame();
    if (liveChain) {
      syncDom(liveChain.averageOpening, deriveFoldChain(liveChain.panelOpenings).metrics.outerSpan);
    } else {
      syncDom(effectiveOpening);
    }

    const unsubChain = subscribeChainFrame((frame) => {
      if (frame) {
        syncDom(frame.averageOpening, deriveFoldChain(frame.panelOpenings).metrics.outerSpan);
      } else {
        syncDom(effectiveOpening);
      }
    });

    const unsubStory =
      mode === 'story'
        ? subscribeStoryFrame((nextOpening) => {
            if (!getLiveChainFrame()) {
              syncDom(nextOpening);
            }
          })
        : undefined;

    return () => {
      unsubChain();
      unsubStory?.();
    };
  }, [mode, effectiveOpening, subscribeStoryFrame, subscribeChainFrame, getLiveChainFrame]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpening(Number(e.target.value));
  };

  const handleRangeCommit = () => {
    const pose = deriveFold(effectiveOpening);
    setAnnouncement(
      `Opening ${Math.round(effectiveOpening)} percent, span ${formatMeters(pose.metrics.outerSpan)}.`,
    );
  };

  const handleUseInBrief = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('brief-heading');
    if (target) {
      target.scrollIntoView({
        behavior: env.reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      if (target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }
    }
  };

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);
  const printSpec = PRINT_SPECS[design.print];
  const matchedPreset = viewPresetFromAngles(view);
  const roundedYaw = Math.round(normalizeYawDeg(view.yawDeg));

  return (
    <div className="space-y-7">
      <div>
        <div className="mb-2 srf-mono-caption text-[var(--srf-mauve)]">
          Divider design studio
        </div>
        <h2 className="srf-h3 text-[var(--srf-oxblood)] text-balance mb-2">
          Tailor the fold, palette, and textile.
        </h2>
        <p className="text-sm text-[var(--srf-mauve)] max-w-[46ch]">
          Every change updates Fold {FOLD_CONSTANTS.panels} continuously across all sixteen panels and flows straight into your room brief.
        </p>
      </div>

      {/* 1. Shape */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-shape">
        <div className="flex items-baseline justify-between gap-4">
          <h3 id="srf-step-shape" className="text-base font-medium text-[var(--srf-oxblood)]">
            1. Shape
          </h3>
          <div className="srf-mono-dim text-[var(--srf-oxblood)]">
            <span ref={percentRef}>{roundedOpening}%</span>
            <span className="mx-1.5 text-[var(--srf-mauve)]" aria-hidden="true">
              ·
            </span>
            <span ref={spanRef}>{formattedSpan}</span>
          </div>
        </div>

        <div>
          <label htmlFor="srf-opening-range" className="sr-only">
            Opening percentage
          </label>
          <input
            ref={rangeRef}
            id="srf-opening-range"
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={roundedOpening}
            onChange={handleRangeChange}
            onPointerUp={handleRangeCommit}
            onKeyUp={handleRangeCommit}
            aria-valuetext={`${roundedOpening} percent, outer span ${formattedSpan}`}
            className="srf-range"
          />
          <div className="flex items-center justify-between srf-mono-caption text-[var(--srf-mauve)]">
            <span>Gathered</span>
            <button
              type="button"
              onClick={() => {
                resetShape();
                setAnnouncement('Shape reset to 50 percent opening.');
              }}
              className="text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[32px] px-1"
            >
              Reset shape
            </button>
            <span>Open</span>
          </div>
        </div>
      </section>

      {/* 2. Base & Print Color */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-color">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-color" className="text-base font-medium text-[var(--srf-oxblood)]">
            2. Base &amp; Print Color
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]">
            {design.baseHex}
            {usesActivePrintColor(design) ? ` · ${design.designHex}` : ''}
          </span>
        </div>

        <ColorWheel />
      </section>

      {/* 3. Design */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-design">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-design" className="text-base font-medium text-[var(--srf-oxblood)]">
            3. Design
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]">
            {printSpec.name}
            {printSpec.usesScale ? ` · ${design.motifScale}%` : ''}
          </span>
        </div>

        <PrintGallery onAnnounce={setAnnouncement} />
      </section>

      {/* 4. View */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-view">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-view" className="text-base font-medium text-[var(--srf-oxblood)]">
            4. View
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]" data-testid="srf-view-readout">
            View: {roundedYaw}°
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label="Rotate divider left"
            onClick={() => {
              rotateViewStep(-FOLD_CONSTANTS.rotateStepDeg);
              setAnnouncement(`Rotated divider left 15 degrees.`);
            }}
            className="srf-btn-secondary !px-3.5 text-sm"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Rotate left</span>
          </button>

          <button
            type="button"
            aria-label="Rotate divider right"
            onClick={() => {
              rotateViewStep(FOLD_CONSTANTS.rotateStepDeg);
              setAnnouncement(`Rotated divider right 15 degrees.`);
            }}
            className="srf-btn-secondary !px-3.5 text-sm"
          >
            <RotateCw className="w-4 h-4" aria-hidden="true" />
            <span>Rotate right</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetView();
              setAnnouncement('Camera reset to default three-quarter angle.');
            }}
            className="srf-btn-secondary !px-3.5 text-sm"
          >
            Reset view
          </button>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Camera presets">
          {VIEW_ORDER.map((viewId) => {
            const preset = VIEW_PRESETS[viewId];
            const active = matchedPreset === viewId;
            return (
              <button
                key={viewId}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setViewPreset(viewId);
                  setAnnouncement(`Camera view changed to ${preset.label}.`);
                }}
                className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3 text-sm"
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Reset design & live configuration summary */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              resetDesign();
              setAnnouncement('Design reset to Flax #D8C4A7, Oxblood #4B202A, Bloom at 100 percent.');
            }}
            className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3.5 text-sm"
          >
            Reset design
          </button>

          {env.enhancedDesktop && mode === 'manual' && (
            <button
              type="button"
              onClick={() => {
                followStory();
                setAnnouncement('Following story opening.');
              }}
              className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3.5 text-sm"
            >
              Follow the story
            </button>
          )}
        </div>

        <dl
          data-testid="srf-studio-summary"
          className="p-4 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm"
        >
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Base color</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                style={{ backgroundColor: design.baseHex }}
                aria-hidden="true"
              />
              <span>{design.baseHex}</span>
            </dd>
          </div>

          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {printSpec.name}
            </dd>
          </div>

          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print color</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                style={{ backgroundColor: design.designHex }}
                aria-hidden="true"
              />
              <span className={!usesActivePrintColor(design) ? 'text-[var(--srf-mauve)]' : undefined}>
                {usesActivePrintColor(design)
                  ? design.designHex
                  : `${design.designHex} (${design.print === 'solid' ? 'saved' : 'original upload'})`}
              </span>
            </dd>
          </div>

          {printSpec.usesScale && (
            <div>
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">
                {printSpec.scaleLabel}
              </dt>
              <dd className="font-medium text-[var(--srf-oxblood)]">
                {design.motifScale}%
              </dd>
            </div>
          )}

          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Opening</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {roundedOpening}%
            </dd>
          </div>

          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Outer span</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              <span ref={summarySpanRef}>{formattedSpan}</span>
            </dd>
          </div>

          {design.print === 'upload' && uploadedArt && (
            <div className="col-span-2">
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Your image</dt>
              <dd className="font-medium text-[var(--srf-oxblood)] truncate">
                {uploadedArt.filename} (local session only)
              </dd>
            </div>
          )}
        </dl>

        <div>
          <a
            href="#brief"
            onClick={handleUseInBrief}
            className="srf-btn-primary w-full"
          >
            <span>Use this design in my brief</span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/FoldPoster.tsx">
<![CDATA['use client';

import React, { useId, useMemo } from 'react';
import { mixHex } from './color';
import { DEFAULT_DESIGN, PALETTE, ViewId, ViewState } from './config';
import { deriveFold, formatMeters } from './geometry';
import { projectFold } from './projection';

interface FoldPosterProps {
  opening: number;
  baseHex?: string;
  view?: ViewState | ViewId;
  width?: number;
  height?: number;
  showBracket?: boolean;
  className?: string;
  ariaHidden?: boolean;
}

function shadeHex(
  baseHex: string,
  shade: number,
  kind: 'felt' | 'top' | 'cap' | 'foot',
): { fill: string; stroke: string } {
  if (kind === 'foot') {
    const f = 0.72 + shade * 0.34;
    return {
      fill: `rgb(${Math.min(255, Math.round(75 * f))}, ${Math.min(255, Math.round(32 * f))}, ${Math.min(255, Math.round(42 * f))})`,
      stroke: PALETTE.oxblood,
    };
  }

  const shadowHex = mixHex(baseHex, '#201014', 0.28);
  const highlightHex = mixHex(baseHex, '#FFFCF8', 0.22);

  if (kind === 'top') {
    return { fill: highlightHex, stroke: shadowHex };
  }

  const t = Math.max(0, Math.min(1, (shade - 0.56) / 0.44));
  const fill =
    t < 0.55
      ? mixHex(shadowHex, baseHex, t / 0.55)
      : mixHex(baseHex, highlightHex, (t - 0.55) / 0.45);

  return { fill, stroke: shadowHex };
}

export const FoldPoster: React.FC<FoldPosterProps> = ({
  opening,
  baseHex = DEFAULT_DESIGN.baseHex,
  view = 'quarter',
  width = 900,
  height = 640,
  showBracket = true,
  className = '',
  ariaHidden = true,
}) => {
  const uid = useId().replace(/:/g, '');
  const shadowGradId = `srf-shadow-${uid}`;
  const aspect = width / height;

  const { pose, projected } = useMemo(() => {
    const p = deriveFold(opening);
    const proj = projectFold(p, view, aspect, width, height);
    return { pose: p, projected: proj };
  }, [opening, view, aspect, width, height]);

  const spanText = formatMeters(pose.metrics.outerSpan);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`block w-full h-full select-none ${className}`}
      role={ariaHidden ? undefined : 'img'}
      aria-hidden={ariaHidden || undefined}
      aria-label={
        ariaHidden
          ? undefined
          : `Fold 16 freestanding felt divider at ${Math.round(pose.opening)}% opening, outer span ${spanText}`
      }
    >
      <defs>
        <radialGradient id={shadowGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={PALETTE.oxblood} stopOpacity="0.24" />
          <stop offset="62%" stopColor={PALETTE.oxblood} stopOpacity="0.09" />
          <stop offset="100%" stopColor={PALETTE.oxblood} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={PALETTE.rose} />

      <ellipse
        cx={projected.shadowEllipse.cx}
        cy={projected.shadowEllipse.cy}
        rx={projected.shadowEllipse.rx}
        ry={projected.shadowEllipse.ry}
        fill={`url(#${shadowGradId})`}
      />

      <g strokeLinejoin="round">
        {projected.faces.map((face, idx) => {
          const pts = face.points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
          const { fill, stroke } = shadeHex(baseHex, face.shade, face.kind);
          return (
            <polygon
              key={idx}
              points={pts}
              fill={fill}
              stroke={stroke}
              strokeWidth={face.kind === 'top' ? 0.6 : 0.75}
              strokeOpacity={face.kind === 'foot' ? 0.65 : 0.28}
            />
          );
        })}
      </g>

      {showBracket && projected.spanBracket.visible && (
        <g stroke={PALETTE.oxblood} strokeWidth="1.2" fill="none" opacity="0.72">
          <line
            x1={projected.spanBracket.leftX}
            y1={projected.spanBracket.y}
            x2={projected.spanBracket.rightX}
            y2={projected.spanBracket.y}
          />
          <line
            x1={projected.spanBracket.leftX}
            y1={projected.spanBracket.y - 6}
            x2={projected.spanBracket.leftX}
            y2={projected.spanBracket.y + 6}
          />
          <line
            x1={projected.spanBracket.rightX}
            y1={projected.spanBracket.y - 6}
            x2={projected.spanBracket.rightX}
            y2={projected.spanBracket.y + 6}
          />
        </g>
      )}
    </svg>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/FoldProvider.tsx">
<![CDATA['use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { DEFAULT_DESIGN, FOLD_CONSTANTS, ViewId, ViewState } from './config';
import { deriveFold, FoldPose } from './geometry';
import {
  createInitialFoldState,
  DesignState,
  foldReducer,
  getEffectiveOpening,
  OwnershipMode,
} from './state';
import {
  computeDemoFoldChoreography,
  computeEntranceChoreography,
  UnfoldChoreographyFrame,
} from './unfold';
import { loadValidatedImageFile, UploadedArtworkResource } from './upload';
import { useReducedMotion } from '../motion/useReducedMotion';

export interface EnvironmentFlags {
  enhancedDesktop: boolean;
  isCoarsePointer: boolean;
  saveData: boolean;
  reducedMotion: boolean;
}

export type StageHostId = 'hero' | 'studio';
export type ChoreographyMode = 'idle' | 'entrance' | 'demo';

type StoryFrameListener = (opening: number, chapter: 0 | 1 | 2) => void;
type ChainFrameListener = (frame: UnfoldChoreographyFrame | null) => void;

export interface FoldContextValue {
  mode: OwnershipMode;
  design: DesignState;
  view: ViewState;
  effectiveOpening: number;
  effectivePose: FoldPose;
  chapter: 0 | 1 | 2;
  env: EnvironmentFlags;
  isCustomized: boolean;
  choreographyMode: ChoreographyMode;
  demoActive: boolean;
  entranceSettled: boolean;
  uploadedArt: UploadedArtworkResource | null;
  uploadError: string | null;
  isUploading: boolean;
  activeWebglHost: StageHostId | null;
  acquireWebglHost: (hostId: StageHostId, disposePrevious: () => void) => void;
  releaseWebglHost: (hostId: StageHostId) => void;
  setOpening: (opening: number) => void;
  setBaseHex: (hex: string) => void;
  setDesignHex: (hex: string) => void;
  setPrint: (print: DesignState['print']) => void;
  setMotifScale: (scale: number) => void;
  setTintUpload: (tintUpload: boolean) => void;
  setViewPreset: (viewId: ViewId) => void;
  setViewAngles: (yawDeg: number, elevationDeg: number) => void;
  rotateViewStep: (deltaYawDeg: number) => void;
  resetView: () => void;
  resetShape: () => void;
  resetDesign: () => void;
  followStory: () => void;
  replayFoldSequence: () => void;
  cancelChoreography: () => void;
  uploadFile: (file: File) => Promise<void>;
  clearUpload: () => void;
  clearUploadError: () => void;
  pushStoryFrame: (opening: number, chapter: 0 | 1 | 2) => void;
  getLiveOpening: () => number;
  getLiveChainFrame: () => UnfoldChoreographyFrame | null;
  subscribeStoryFrame: (listener: StoryFrameListener) => () => void;
  subscribeChainFrame: (listener: ChainFrameListener) => () => void;
}

const FoldContext = createContext<FoldContextValue | null>(null);

const DEFAULT_ENV: EnvironmentFlags = {
  enhancedDesktop: true,
  isCoarsePointer: false,
  saveData: false,
  reducedMotion: false,
};

function readEnvFlags(reducedMotion: boolean): EnvironmentFlags {
  if (typeof window === 'undefined') {
    return {
      ...DEFAULT_ENV,
      reducedMotion,
    };
  }
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const wideEnough = window.innerWidth >= 900 && window.innerHeight >= 640;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const saveData = Boolean(conn?.saveData);

  return {
    enhancedDesktop: !coarse && wideEnough && !reducedMotion,
    isCoarsePointer: coarse,
    saveData,
    reducedMotion,
  };
}

export const FoldProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const [env, setEnv] = useState<EnvironmentFlags>(DEFAULT_ENV);

  const [state, dispatch] = useReducer(
    foldReducer,
    DEFAULT_ENV.enhancedDesktop,
    (enhanced) => createInitialFoldState(enhanced),
  );

  const storyOpeningRef = useRef<number>(FOLD_CONSTANTS.defaultOpening);
  const [chapter, setChapter] = useState<0 | 1 | 2>(0);
  const chapterRef = useRef<0 | 1 | 2>(0);
  const listenersRef = useRef<Set<StoryFrameListener>>(new Set());

  // Mechanical hinge-chain choreography state (entrance & "See how it folds")
  const [choreographyMode, setChoreographyMode] = useState<ChoreographyMode>(() =>
    reducedMotion ? 'idle' : 'entrance',
  );
  const [entranceSettled, setEntranceSettled] = useState<boolean>(reducedMotion);
  const choreographyRef = useRef<ChoreographyMode>(reducedMotion ? 'idle' : 'entrance');
  const chainFrameRef = useRef<UnfoldChoreographyFrame | null>(
    reducedMotion
      ? null
      : computeEntranceChoreography(0, FOLD_CONSTANTS.defaultOpening, false),
  );
  const chainListenersRef = useRef<Set<ChainFrameListener>>(new Set());
  const choreographyRafRef = useRef<number>(0);

  // Transient local upload resource (session-only, never serialized into brief/JSON)
  const [uploadedArt, setUploadedArt] = useState<UploadedArtworkResource | null>(null);
  const uploadedArtRef = useRef<UploadedArtworkResource | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadGenRef = useRef(0);
  const unmountedRef = useRef(false);

  // Singleton WebGL ownership coordinator across Hero & Studio stages (<= 1 renderer active)
  const [activeWebglHost, setActiveWebglHost] = useState<StageHostId | null>(null);
  const activeHostRef = useRef<StageHostId | null>(null);
  const activeDisposeRef = useRef<(() => void) | null>(null);

  const emitChainFrame = useCallback((frame: UnfoldChoreographyFrame | null) => {
    chainFrameRef.current = frame;
    chainListenersRef.current.forEach((fn) => fn(frame));
  }, []);

  const stopChoreographyLoop = useCallback(() => {
    if (choreographyRafRef.current) {
      cancelAnimationFrame(choreographyRafRef.current);
      choreographyRafRef.current = 0;
    }
  }, []);

  const cancelChoreography = useCallback(() => {
    if (choreographyRef.current === 'idle') return;
    stopChoreographyLoop();
    choreographyRef.current = 'idle';
    setChoreographyMode('idle');
    setEntranceSettled(true);
    emitChainFrame(null);
  }, [emitChainFrame, stopChoreographyLoop]);

  const startTimedChoreography = useCallback(
    (kind: 'entrance' | 'demo', targetOpening: number) => {
      stopChoreographyLoop();
      if (reducedMotion) {
        choreographyRef.current = 'idle';
        setChoreographyMode('idle');
        setEntranceSettled(true);
        emitChainFrame(null);
        return;
      }

      choreographyRef.current = kind;
      setChoreographyMode(kind);
      const startMs = performance.now();

      const firstFrame =
        kind === 'entrance'
          ? computeEntranceChoreography(0, targetOpening, false)
          : computeDemoFoldChoreography(0, targetOpening, false);
      emitChainFrame(firstFrame);

      const tick = (now: number) => {
        if (unmountedRef.current || choreographyRef.current !== kind) return;
        const elapsedSec = (now - startMs) / 1000;
        const frame =
          kind === 'entrance'
            ? computeEntranceChoreography(elapsedSec, targetOpening, false)
            : computeDemoFoldChoreography(elapsedSec, targetOpening, false);

        emitChainFrame(frame);

        if (frame.done) {
          choreographyRef.current = 'idle';
          setChoreographyMode('idle');
          setEntranceSettled(true);
          emitChainFrame(null);
          return;
        }

        choreographyRafRef.current = requestAnimationFrame(tick);
      };

      choreographyRafRef.current = requestAnimationFrame(tick);
    },
    [emitChainFrame, reducedMotion, stopChoreographyLoop],
  );

  // Run signature unfolding entrance sequence once on mount unless reduced motion
  useEffect(() => {
    unmountedRef.current = false;
    if (!reducedMotion) {
      startTimedChoreography('entrance', FOLD_CONSTANTS.defaultOpening);
    } else {
      choreographyRef.current = 'idle';
      setChoreographyMode('idle');
      setEntranceSettled(true);
      emitChainFrame(null);
    }

    return () => {
      unmountedRef.current = true;
      stopChoreographyLoop();
      uploadGenRef.current += 1;
      uploadedArtRef.current?.dispose();
      uploadedArtRef.current = null;
      activeDisposeRef.current?.();
      activeDisposeRef.current = null;
      activeHostRef.current = null;
    };
    // Intentionally mounted once; dynamic reducedMotion handled in effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cancel active choreography immediately if reduced motion turns on
  useEffect(() => {
    if (reducedMotion) {
      cancelChoreography();
    }
  }, [reducedMotion, cancelChoreography]);

  // Synchronize viewport & reduced-motion layout eligibility
  useEffect(() => {
    const sync = () => {
      const next = readEnvFlags(reducedMotion);
      setEnv(next);
      dispatch({
        type: 'SYNC_LAYOUT',
        enhanced: next.enhancedDesktop,
        currentOpening: storyOpeningRef.current,
      });
    };

    sync();
    const mql = window.matchMedia?.('(min-width: 900px) and (min-height: 640px)');
    window.addEventListener('resize', sync, { passive: true });
    mql?.addEventListener?.('change', sync);
    return () => {
      window.removeEventListener('resize', sync);
      mql?.removeEventListener?.('change', sync);
    };
  }, [reducedMotion]);

  const acquireWebglHost = useCallback(
    (hostId: StageHostId, disposePrevious: () => void) => {
      if (activeHostRef.current && activeHostRef.current !== hostId) {
        const prevDispose = activeDisposeRef.current;
        activeDisposeRef.current = null;
        prevDispose?.();
      }
      activeHostRef.current = hostId;
      activeDisposeRef.current = disposePrevious;
      setActiveWebglHost(hostId);
    },
    [],
  );

  const releaseWebglHost = useCallback((hostId: StageHostId) => {
    if (activeHostRef.current === hostId) {
      activeHostRef.current = null;
      activeDisposeRef.current = null;
      setActiveWebglHost(null);
    }
  }, []);

  const pushStoryFrame = useCallback(
    (opening: number, nextChapter: 0 | 1 | 2) => {
      storyOpeningRef.current = opening;
      if (chapterRef.current !== nextChapter) {
        chapterRef.current = nextChapter;
        setChapter(nextChapter);
      }
      if (choreographyRef.current === 'idle') {
        listenersRef.current.forEach((fn) => fn(opening, nextChapter));
      }
    },
    [],
  );

  const subscribeStoryFrame = useCallback((listener: StoryFrameListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const subscribeChainFrame = useCallback((listener: ChainFrameListener) => {
    chainListenersRef.current.add(listener);
    return () => {
      chainListenersRef.current.delete(listener);
    };
  }, []);

  const getLiveOpening = useCallback(() => {
    if (choreographyRef.current !== 'idle' && chainFrameRef.current) {
      return chainFrameRef.current.averageOpening;
    }
    return getEffectiveOpening(state, storyOpeningRef.current);
  }, [state]);

  const getLiveChainFrame = useCallback(() => {
    return chainFrameRef.current;
  }, []);

  const setOpening = useCallback(
    (opening: number) => {
      cancelChoreography();
      dispatch({ type: 'SET_OPENING', opening });
    },
    [cancelChoreography],
  );

  const captureCurrentOpening = useCallback(() => {
    if (choreographyRef.current !== 'idle' && chainFrameRef.current) {
      return chainFrameRef.current.averageOpening;
    }
    return storyOpeningRef.current;
  }, []);

  const setBaseHex = useCallback(
    (hex: string) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_BASE_HEX',
        hex,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setDesignHex = useCallback(
    (hex: string) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_DESIGN_HEX',
        hex,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setPrint = useCallback(
    (print: DesignState['print']) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_PRINT',
        print,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setMotifScale = useCallback(
    (motifScale: number) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_MOTIF_SCALE',
        motifScale,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setTintUpload = useCallback(
    (tintUpload: boolean) => {
      const currentOpening = captureCurrentOpening();
      cancelChoreography();
      dispatch({
        type: 'SET_TINT_UPLOAD',
        tintUpload,
        currentOpening,
      });
    },
    [cancelChoreography, captureCurrentOpening],
  );

  const setViewPreset = useCallback(
    (viewId: ViewId) => {
      cancelChoreography();
      dispatch({
        type: 'SET_VIEW_PRESET',
        viewId,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const setViewAngles = useCallback(
    (yawDeg: number, elevationDeg: number) => {
      cancelChoreography();
      dispatch({
        type: 'SET_VIEW_ANGLES',
        yawDeg,
        elevationDeg,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const rotateViewStep = useCallback(
    (deltaYawDeg: number) => {
      cancelChoreography();
      dispatch({
        type: 'ROTATE_VIEW_STEP',
        deltaYawDeg,
        currentOpening: storyOpeningRef.current,
      });
    },
    [cancelChoreography],
  );

  const resetView = useCallback(() => {
    cancelChoreography();
    dispatch({
      type: 'RESET_VIEW',
      currentOpening: storyOpeningRef.current,
    });
  }, [cancelChoreography]);

  const resetShape = useCallback(() => {
    cancelChoreography();
    dispatch({ type: 'RESET_SHAPE' });
  }, [cancelChoreography]);

  const resetDesign = useCallback(() => {
    cancelChoreography();
    uploadGenRef.current += 1;
    if (uploadedArtRef.current) {
      uploadedArtRef.current.dispose();
      uploadedArtRef.current = null;
    }
    setUploadedArt(null);
    setUploadError(null);
    setIsUploading(false);
    dispatch({
      type: 'RESET_DESIGN',
      currentOpening: storyOpeningRef.current,
    });
  }, [cancelChoreography]);

  const followStory = useCallback(() => {
    cancelChoreography();
    dispatch({ type: 'FOLLOW_STORY' });
  }, [cancelChoreography]);

  const replayFoldSequence = useCallback(() => {
    const anchor = getEffectiveOpening(state, storyOpeningRef.current);
    startTimedChoreography('demo', anchor);
  }, [startTimedChoreography, state]);

  const uploadFile = useCallback(
    async (file: File) => {
      cancelChoreography();
      const token = ++uploadGenRef.current;
      setIsUploading(true);
      setUploadError(null);

      const result = await loadValidatedImageFile(
        file,
        token,
        (t) => !unmountedRef.current && t === uploadGenRef.current,
      );

      if (unmountedRef.current || token !== uploadGenRef.current) {
        if (result.ok) {
          result.resource.dispose();
        }
        return;
      }

      setIsUploading(false);

      if (!result.ok) {
        if (result.error) {
          setUploadError(result.error);
        }
        return;
      }

      const previous = uploadedArtRef.current;
      uploadedArtRef.current = result.resource;
      setUploadedArt(result.resource);
      setUploadError(null);
      dispatch({
        type: 'SET_PRINT',
        print: 'upload',
        currentOpening: storyOpeningRef.current,
      });

      if (previous) {
        previous.dispose();
      }
    },
    [cancelChoreography],
  );

  const clearUpload = useCallback(() => {
    uploadGenRef.current += 1;
    setIsUploading(false);
    setUploadError(null);
    if (uploadedArtRef.current) {
      uploadedArtRef.current.dispose();
      uploadedArtRef.current = null;
    }
    setUploadedArt(null);
    if (state.design.print === 'upload') {
      dispatch({
        type: 'SET_PRINT',
        print: 'solid',
        currentOpening: storyOpeningRef.current,
      });
    }
  }, [state.design.print]);

  const clearUploadError = useCallback(() => {
    setUploadError(null);
  }, []);

  const effectiveOpening = getEffectiveOpening(state, storyOpeningRef.current);
  const effectivePose = useMemo(
    () => deriveFold(effectiveOpening),
    [effectiveOpening],
  );

  const isCustomized =
    state.design.opening !== DEFAULT_DESIGN.opening ||
    state.design.baseHex !== DEFAULT_DESIGN.baseHex ||
    state.design.designHex !== DEFAULT_DESIGN.designHex ||
    state.design.print !== DEFAULT_DESIGN.print ||
    state.design.motifScale !== DEFAULT_DESIGN.motifScale ||
    Boolean(state.design.tintUpload) !== Boolean(DEFAULT_DESIGN.tintUpload) ||
    uploadedArt !== null;

  const demoActive = choreographyMode === 'demo';

  const value = useMemo<FoldContextValue>(
    () => ({
      mode: state.mode,
      design: state.design,
      view: state.view,
      effectiveOpening,
      effectivePose,
      chapter,
      env,
      isCustomized,
      choreographyMode,
      demoActive,
      entranceSettled,
      uploadedArt,
      uploadError,
      isUploading,
      activeWebglHost,
      acquireWebglHost,
      releaseWebglHost,
      setOpening,
      setBaseHex,
      setDesignHex,
      setPrint,
      setMotifScale,
      setTintUpload,
      setViewPreset,
      setViewAngles,
      rotateViewStep,
      resetView,
      resetShape,
      resetDesign,
      followStory,
      replayFoldSequence,
      cancelChoreography,
      uploadFile,
      clearUpload,
      clearUploadError,
      pushStoryFrame,
      getLiveOpening,
      getLiveChainFrame,
      subscribeStoryFrame,
      subscribeChainFrame,
    }),
    [
      state.mode,
      state.design,
      state.view,
      effectiveOpening,
      effectivePose,
      chapter,
      env,
      isCustomized,
      choreographyMode,
      demoActive,
      entranceSettled,
      uploadedArt,
      uploadError,
      isUploading,
      activeWebglHost,
      acquireWebglHost,
      releaseWebglHost,
      setOpening,
      setBaseHex,
      setDesignHex,
      setPrint,
      setMotifScale,
      setTintUpload,
      setViewPreset,
      setViewAngles,
      rotateViewStep,
      resetView,
      resetShape,
      resetDesign,
      followStory,
      replayFoldSequence,
      cancelChoreography,
      uploadFile,
      clearUpload,
      clearUploadError,
      pushStoryFrame,
      getLiveOpening,
      getLiveChainFrame,
      subscribeStoryFrame,
      subscribeChainFrame,
    ],
  );

  return <FoldContext.Provider value={value}>{children}</FoldContext.Provider>;
};

export function useFold(): FoldContextValue {
  const ctx = useContext(FoldContext);
  if (!ctx) {
    throw new Error('useFold must be used within FoldProvider');
  }
  return ctx;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/FoldScene.ts">
<![CDATA[import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { FOLD_CONSTANTS, PALETTE, ViewState } from './config';
import {
  computePanelUVSpan,
  deriveFoldChain,
  FoldPose,
  normalizeOpening,
} from './geometry';
import { createSceneMaterials, SceneMaterials } from './materials';
import { getBitmapKey } from './artwork';
import {
  computeAtelierCameraDistance,
  computeCameraDistance,
  computeFullBleedViewOffset,
  computeShadowCameraFrustum,
  StageSlotRect,
} from './projection';
import {
  DesignState,
  normalizeElevationDeg,
  normalizeYawDeg,
  viewDirectionFromAngles,
} from './state';
import { mixHex } from './color';
import { damp } from '../motion/math';

export interface RoomLightingState {
  lightTint: string;
  ambientTint: string;
  shadowTint: string;
  floorBase: string;
  isDarkEnvelope: boolean;
}

export interface FoldSceneController {
  setPose: (opening: number, immediate?: boolean) => void;
  setChainPose: (panelOpenings: readonly number[], glintProgress?: number) => void;
  setDesign: (
    design: DesignState,
    uploadedBitmap: ImageBitmap | null,
    immediate?: boolean,
  ) => void;
  setViewAngles: (view: ViewState, immediate?: boolean) => void;
  setPointerParallax: (nx: number, ny: number) => void;
  setHovered: (hovered: boolean) => void;
  setRoomLighting: (lighting: RoomLightingState, immediate?: boolean) => void;
  resize: (width: number, height: number, slotRect?: StageSlotRect | null) => void;
  setActive: (active: boolean) => void;
  renderOnce: () => void;
  getStats: () => { triangles: number; calls: number };
  dispose: () => void;
}

export interface CreateFoldSceneOptions {
  container: HTMLElement;
  initialDesign: DesignState;
  initialPanelOpenings?: readonly number[];
  initialUpload: ImageBitmap | null;
  initialView: ViewState;
  initialRoomLighting?: RoomLightingState;
  isCoarsePointer: boolean;
  fitPadding?: number;
  atelierFraming?: boolean;
  initialSlotRect?: StageSlotRect | null;
  onFirstFrame?: () => void;
  onContextLost?: () => void;
}

const _targetVec = new THREE.Vector3(0, FOLD_CONSTANTS.height * 0.5, 0);
const _camDir = new THREE.Vector3();
const _hingeMat = new THREE.Matrix4();
const _hingePos = new THREE.Vector3();
const _hingeQuat = new THREE.Quaternion();
const _hingeScale = new THREE.Vector3(1, 1, 1);

const HINGE_HEIGHTS = [0.024, 1.576] as const;

function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

/**
 * Builds the fixed-topology BufferGeometry for Fold 16 with 2 material groups:
 * - Group 0 (32 quads: 16 front + 16 back faces): printed textile artwork texture
 * - Group 1 (34 quads: 16 top + 16 bottom + 2 end caps): solid base felt color
 *
 * Uses continuous developed-sheet UVs:
 * - Front side reads left-to-right [j/16 .. (j+1)/16]
 * - Back side reverses horizontally [uBack = 1 - uFront] so landscapes & prints read left-to-right from both sides
 */
function createRibbonGeometry(): THREE.BufferGeometry {
  const N = FOLD_CONSTANTS.panels;
  const faceQuadCount = N * 2;
  const edgeQuadCount = N * 2 + 2;
  const quadCount = faceQuadCount + edgeQuadCount;
  const vertexCount = quadCount * 6;

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  geo.clearGroups();
  geo.addGroup(0, faceQuadCount * 6, 0);
  geo.addGroup(faceQuadCount * 6, edgeQuadCount * 6, 1);
  return geo;
}

function writeQuad(
  pos: Float32Array,
  norm: Float32Array,
  uv: Float32Array,
  quadIndex: number,
  ax: number, ay: number, az: number, au: number, av: number,
  bx: number, by: number, bz: number, bu: number, bv: number,
  cx: number, cy: number, cz: number, cu: number, cv: number,
  dx: number, dy: number, dz: number, du: number, dv: number,
): void {
  const e1x = bx - ax;
  const e1y = by - ay;
  const e1z = bz - az;
  const e2x = cx - ax;
  const e2y = cy - ay;
  const e2z = cz - az;
  let nx = e1y * e2z - e1z * e2y;
  let ny = e1z * e2x - e1x * e2z;
  let nz = e1x * e2y - e1y * e2x;
  const len = Math.hypot(nx, ny, nz) || 1;
  nx /= len;
  ny /= len;
  nz /= len;

  const pBase = quadIndex * 18;
  const uBase = quadIndex * 12;

  pos[pBase + 0] = ax; pos[pBase + 1] = ay; pos[pBase + 2] = az;
  pos[pBase + 3] = bx; pos[pBase + 4] = by; pos[pBase + 5] = bz;
  pos[pBase + 6] = cx; pos[pBase + 7] = cy; pos[pBase + 8] = cz;

  pos[pBase + 9] = ax; pos[pBase + 10] = ay; pos[pBase + 11] = az;
  pos[pBase + 12] = cx; pos[pBase + 13] = cy; pos[pBase + 14] = cz;
  pos[pBase + 15] = dx; pos[pBase + 16] = dy; pos[pBase + 17] = dz;

  for (let v = 0; v < 6; v += 1) {
    const ni = pBase + v * 3;
    norm[ni] = nx;
    norm[ni + 1] = ny;
    norm[ni + 2] = nz;
  }

  uv[uBase + 0] = au; uv[uBase + 1] = av;
  uv[uBase + 2] = bu; uv[uBase + 3] = bv;
  uv[uBase + 4] = cu; uv[uBase + 5] = cv;
  uv[uBase + 6] = au; uv[uBase + 7] = av;
  uv[uBase + 8] = cu; uv[uBase + 9] = cv;
  uv[uBase + 10] = du; uv[uBase + 11] = dv;
}

function updateRibbonGeometry(geo: THREE.BufferGeometry, pose: FoldPose): void {
  const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
  const normAttr = geo.getAttribute('normal') as THREE.BufferAttribute;
  const uvAttr = geo.getAttribute('uv') as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;
  const norm = normAttr.array as Float32Array;
  const uv = uvAttr.array as Float32Array;

  const N = FOLD_CONSTANTS.panels;
  const H = FOLD_CONSTANTS.height;
  let q = 0;

  // Group 0: Printed Front & Back Faces (continuous developed UVs)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];

    const frontUV = computePanelUVSpan(j, 'front', N);
    const backUV = computePanelUVSpan(j, 'back', N);

    // Front face (+Z), left-to-right
    writeQuad(
      pos, norm, uv, q++,
      f0.x, 0, f0.z, frontUV.uStart, 0,
      f1.x, 0, f1.z, frontUV.uEnd, 0,
      f1.x, H, f1.z, frontUV.uEnd, 1,
      f0.x, H, f0.z, frontUV.uStart, 1,
    );

    // Back face (-Z), reversed U so prints & landscapes read left-to-right from back side too
    writeQuad(
      pos, norm, uv, q++,
      b1.x, 0, b1.z, backUV.uStart, 0,
      b0.x, 0, b0.z, backUV.uEnd, 0,
      b0.x, H, b0.z, backUV.uEnd, 1,
      b1.x, H, b1.z, backUV.uStart, 1,
    );
  }

  // Group 1: Narrow Top, Bottom & End Felt Edges (solid base color)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];
    const u0 = j / N;
    const u1 = (j + 1) / N;

    // Top cap (+Y)
    writeQuad(
      pos, norm, uv, q++,
      f0.x, H, f0.z, u0, 0,
      f1.x, H, f1.z, u1, 0,
      b1.x, H, b1.z, u1, 0.04,
      b0.x, H, b0.z, u0, 0.04,
    );

    // Bottom cap (-Y)
    writeQuad(
      pos, norm, uv, q++,
      b0.x, 0, b0.z, u0, 0,
      b1.x, 0, b1.z, u1, 0,
      f1.x, 0, f1.z, u1, 0.04,
      f0.x, 0, f0.z, u0, 0.04,
    );
  }

  // Left end cap (-X)
  writeQuad(
    pos, norm, uv, q++,
    pose.back[0].x, 0, pose.back[0].z, 0, 0,
    pose.front[0].x, 0, pose.front[0].z, 0.02, 0,
    pose.front[0].x, H, pose.front[0].z, 0.02, 1,
    pose.back[0].x, H, pose.back[0].z, 0, 1,
  );

  // Right end cap (+X)
  writeQuad(
    pos, norm, uv, q++,
    pose.front[N].x, 0, pose.front[N].z, 0.98, 0,
    pose.back[N].x, 0, pose.back[N].z, 1, 0,
    pose.back[N].x, H, pose.back[N].z, 1, 1,
    pose.front[N].x, H, pose.front[N].z, 0.98, 1,
  );

  posAttr.needsUpdate = true;
  normAttr.needsUpdate = true;
  uvAttr.needsUpdate = true;
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
}

function createCreaseLineGeometry(): THREE.BufferGeometry {
  const N = FOLD_CONSTANTS.panels;
  const segCount = (N + 1) * 2 + N * 2;
  const positions = new Float32Array(segCount * 2 * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

function updateCreaseLineGeometry(geo: THREE.BufferGeometry, pose: FoldPose): void {
  const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;
  const N = FOLD_CONSTANTS.panels;
  const H = FOLD_CONSTANTS.height + 0.001;
  let idx = 0;

  const pushSeg = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) => {
    pos[idx++] = x0; pos[idx++] = y0; pos[idx++] = z0;
    pos[idx++] = x1; pos[idx++] = y1; pos[idx++] = z1;
  };

  for (let j = 0; j <= N; j += 1) {
    const f = pose.front[j];
    const b = pose.back[j];
    pushSeg(f.x, 0.002, f.z, f.x, H, f.z);
    pushSeg(b.x, 0.002, b.z, b.x, H, b.z);
  }

  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];
    pushSeg(f0.x, H, f0.z, f1.x, H, f1.z);
    pushSeg(b0.x, H, b0.z, b1.x, H, b1.z);
  }

  posAttr.needsUpdate = true;
}

function updateHingeInstances(mesh: THREE.InstancedMesh, pose: FoldPose): void {
  const N = FOLD_CONSTANTS.panels;
  let idx = 0;
  for (let j = 1; j < N; j += 1) {
    const p = pose.hinges[j];
    for (let k = 0; k < HINGE_HEIGHTS.length; k += 1) {
      _hingePos.set(p.x, HINGE_HEIGHTS[k], p.z);
      _hingeMat.compose(_hingePos, _hingeQuat, _hingeScale);
      mesh.setMatrixAt(idx++, _hingeMat);
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
}

function createBeveledFootGeometry(): THREE.BufferGeometry {
  const w = FOLD_CONSTANTS.footWidth;
  const d = FOLD_CONSTANTS.footDepth;
  const h = FOLD_CONSTANTS.footHeight;
  const r = 0.012;

  const shape = new THREE.Shape();
  const hw = w * 0.5 - r;
  const hd = d * 0.5 - r;

  shape.moveTo(-hw, -hd - r);
  shape.lineTo(hw, -hd - r);
  shape.quadraticCurveTo(hw + r, -hd - r, hw + r, -hd);
  shape.lineTo(hw + r, hd);
  shape.quadraticCurveTo(hw + r, hd + r, hw, hd + r);
  shape.lineTo(-hw, hd + r);
  shape.quadraticCurveTo(-hw - r, hd + r, -hw - r, hd);
  shape.lineTo(-hw - r, -hd);
  shape.quadraticCurveTo(-hw - r, -hd - r, -hw, -hd - r);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h - 0.004,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2,
    curveSegments: 8,
  });

  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -h + 0.002, 0);
  geo.computeVertexNormals();
  return geo;
}

function stepAngleShortestArc(currentDeg: number, targetDeg: number, t: number): number {
  const diff = (((targetDeg - currentDeg) % 360) + 540) % 360 - 180;
  return normalizeYawDeg(currentDeg + diff * t);
}

export function createFoldScene(options: CreateFoldSceneOptions): FoldSceneController {
  const {
    container,
    initialDesign,
    initialPanelOpenings,
    initialUpload,
    initialView,
    initialRoomLighting,
    isCoarsePointer,
    fitPadding = FOLD_CONSTANTS.cameraFitPadding,
    atelierFraming = false,
    initialSlotRect = null,
    onFirstFrame,
    onContextLost,
  } = options;

  const isSoftwareGl = detectSoftwareGl();

  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    powerPreference: 'high-performance',
    alpha: atelierFraming,
    preserveDrawingBuffer: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const maxDpr = isSoftwareGl ? 0.75 : isCoarsePointer ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

  const rect = container.getBoundingClientRect();
  const initW = Math.max(1, Math.round(rect.width || 800));
  const initH = Math.max(1, Math.round(rect.height || 560));
  renderer.setSize(initW, initH, false);
  let lastRenderW = initW;
  let lastRenderH = initH;

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.tabIndex = -1;
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  if (atelierFraming) {
    renderer.setClearColor(0x000000, 0);
    scene.background = null;
    scene.fog = null;
  } else {
    scene.background = new THREE.Color(PALETTE.rose);
    scene.fog = new THREE.Fog(PALETTE.rose, 10, 24);
  }

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmremGenerator.dispose();

  const aspect = initW / initH;
  const camera = new THREE.PerspectiveCamera(
    FOLD_CONSTANTS.cameraFovDeg,
    aspect,
    FOLD_CONSTANTS.cameraNear,
    FOLD_CONSTANTS.cameraFar,
  );

  // Architectural atelier lighting: warm upper-left key, cool neutral fill, subtle back rim + glint sweep
  const hemiLight = new THREE.HemisphereLight('#FFFBF7', '#C8AFB2', 0.56);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight('#FFF8F1', 1.04);
  keyLight.position.set(-3.1, 4.9, 3.2);
  keyLight.target.position.set(0.35, 0.25, -0.3);
  scene.add(keyLight);
  scene.add(keyLight.target);
  keyLight.target.updateMatrixWorld();
  if (!isSoftwareGl) {
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    const frustum = computeShadowCameraFrustum(
      {
        x: keyLight.position.x,
        y: keyLight.position.y,
        z: keyLight.position.z,
      },
      {
        x: keyLight.target.position.x,
        y: keyLight.target.position.y,
        z: keyLight.target.position.z,
      },
    );
    keyLight.shadow.camera.left = frustum.left;
    keyLight.shadow.camera.right = frustum.right;
    keyLight.shadow.camera.bottom = frustum.bottom;
    keyLight.shadow.camera.top = frustum.top;
    keyLight.shadow.camera.near = frustum.near;
    keyLight.shadow.camera.far = frustum.far;
    keyLight.shadow.camera.updateProjectionMatrix();
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.018;
  }

  const backFillLight = new THREE.DirectionalLight('#F4F5F8', 0.48);
  backFillLight.position.set(3.4, 3.3, -3.2);
  scene.add(backFillLight);

  const rimLight = new THREE.DirectionalLight('#FFFCF8', 0.28);
  rimLight.position.set(2.0, 2.8, -4.4);
  scene.add(rimLight);

  // Subtle traveling glint point light during initial gather & hinge reveal
  const glintLight = new THREE.PointLight('#FFF5EB', 0, 2.4, 1.5);
  glintLight.position.set(-0.6, 1.0, 0.65);
  scene.add(glintLight);

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const materials: SceneMaterials = createSceneMaterials(
    initialDesign,
    initialUpload,
    maxAniso,
    isCoarsePointer || isSoftwareGl,
  );

  // Room-synchronized target lighting colors
  const targetHemiSkyColor = new THREE.Color('#FFFBF7');
  const targetHemiGroundColor = new THREE.Color('#C8AFB2');
  const targetKeyColor = new THREE.Color('#FFF8F1');
  const targetFillColor = new THREE.Color('#F4F5F8');
  const targetRimColor = new THREE.Color('#FFFCF8');
  const targetShadowColor = new THREE.Color(PALETTE.oxblood);
  let targetFloorShadowOpacity = 0.12;
  let targetContactShadowOpacity = 0.88;
  let lightingColorDirty = false;

  const applyRoomLightingTargets = (lighting: RoomLightingState, immediate: boolean) => {
    targetHemiSkyColor.set(mixHex(lighting.lightTint, '#FFFFFF', 0.35));
    targetHemiGroundColor.set(mixHex(lighting.floorBase, lighting.ambientTint, 0.45));
    targetKeyColor.set(lighting.lightTint);
    targetFillColor.set(mixHex(lighting.ambientTint, '#F4F5F8', 0.42));
    targetRimColor.set(mixHex(lighting.lightTint, '#FFFCF8', 0.28));
    targetShadowColor.set(lighting.shadowTint);
    targetFloorShadowOpacity = lighting.isDarkEnvelope ? 0.18 : 0.13;
    targetContactShadowOpacity = lighting.isDarkEnvelope ? 0.94 : 0.88;

    if (immediate) {
      hemiLight.color.copy(targetHemiSkyColor);
      hemiLight.groundColor.copy(targetHemiGroundColor);
      keyLight.color.copy(targetKeyColor);
      backFillLight.color.copy(targetFillColor);
      rimLight.color.copy(targetRimColor);
      materials.floor.color.copy(targetShadowColor);
      materials.contactShadow.color.copy(targetShadowColor);
      materials.floor.opacity = targetFloorShadowOpacity;
      materials.contactShadow.opacity = targetContactShadowOpacity;
      lightingColorDirty = false;
    } else {
      lightingColorDirty = true;
    }
  };

  if (initialRoomLighting) {
    applyRoomLightingTargets(initialRoomLighting, true);
  }

  const floorGeo = new THREE.PlaneGeometry(180, 180);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMesh = new THREE.Mesh(floorGeo, materials.floor);
  floorMesh.position.y = -FOLD_CONSTANTS.footHeight;
  floorMesh.receiveShadow = !isSoftwareGl;
  scene.add(floorMesh);

  const floorGlowGeo = new THREE.PlaneGeometry(5.2, 3.4);
  floorGlowGeo.rotateX(-Math.PI / 2);
  const floorGlowMesh = new THREE.Mesh(floorGlowGeo, materials.floorGlow);
  floorGlowMesh.position.y = -FOLD_CONSTANTS.footHeight + 0.0006;
  floorGlowMesh.visible = !atelierFraming;
  scene.add(floorGlowMesh);

  const dividerGroup = new THREE.Group();
  scene.add(dividerGroup);

  const ribbonGeo = createRibbonGeometry();
  const ribbonMesh = new THREE.Mesh(ribbonGeo, [materials.feltFace, materials.feltEdge]);
  ribbonMesh.castShadow = !isSoftwareGl;
  ribbonMesh.receiveShadow = !isSoftwareGl;
  dividerGroup.add(ribbonMesh);

  const creaseGeo = createCreaseLineGeometry();
  const creaseLines = new THREE.LineSegments(creaseGeo, materials.edgeCrease);
  dividerGroup.add(creaseLines);

  // 30 muted brushed-oxblood hinge pins at top & bottom seams across folds 1..15 (1 draw call)
  const hingeCount = (FOLD_CONSTANTS.panels - 1) * HINGE_HEIGHTS.length;
  const hingeGeo = new THREE.CylinderGeometry(0.0046, 0.0046, 0.036, 10);
  const hingeInstanced = new THREE.InstancedMesh(hingeGeo, materials.hingeMetal, hingeCount);
  hingeInstanced.castShadow = !isSoftwareGl;
  dividerGroup.add(hingeInstanced);

  const footGeo = createBeveledFootGeometry();
  const leftFoot = new THREE.Mesh(footGeo, materials.foot);
  leftFoot.castShadow = !isSoftwareGl;
  leftFoot.receiveShadow = !isSoftwareGl;
  dividerGroup.add(leftFoot);

  const rightFoot = new THREE.Mesh(footGeo, materials.foot);
  rightFoot.castShadow = !isSoftwareGl;
  rightFoot.receiveShadow = !isSoftwareGl;
  dividerGroup.add(rightFoot);

  const glideGeo = new THREE.BoxGeometry(
    FOLD_CONSTANTS.footWidth * 0.72,
    0.0025,
    FOLD_CONSTANTS.footDepth * 0.85,
  );
  const leftGlide = new THREE.Mesh(glideGeo, materials.glide);
  const rightGlide = new THREE.Mesh(glideGeo, materials.glide);
  dividerGroup.add(leftGlide);
  dividerGroup.add(rightGlide);

  const shadowGeo = new THREE.PlaneGeometry(1, 1);
  shadowGeo.rotateX(-Math.PI / 2);
  const contactShadowMesh = new THREE.Mesh(shadowGeo, materials.contactShadow);
  contactShadowMesh.position.y = -FOLD_CONSTANTS.footHeight + 0.0015;
  dividerGroup.add(contactShadowMesh);

  const N = FOLD_CONSTANTS.panels;
  const currentPanelOpenings = new Float32Array(N);
  const targetPanelOpenings = new Float32Array(N);
  for (let i = 0; i < N; i += 1) {
    const val = normalizeOpening(
      initialPanelOpenings && i < initialPanelOpenings.length
        ? initialPanelOpenings[i]
        : initialDesign.opening,
    );
    currentPanelOpenings[i] = val;
    targetPanelOpenings[i] = val;
  }

  let currentYawDeg = normalizeYawDeg(initialView.yawDeg);
  let targetYawDeg = currentYawDeg;
  let currentElevDeg = normalizeElevationDeg(initialView.elevationDeg);
  let targetElevDeg = currentElevDeg;

  let targetParallaxNx = 0;
  let targetParallaxNy = 0;
  let currentParallaxNx = 0;
  let currentParallaxNy = 0;
  let targetHovered = false;
  let targetGlintIntensity = 0;

  let currentSlotRect: StageSlotRect | null = initialSlotRect;
  const getEffectiveSlotAspect = (): number =>
    atelierFraming && currentSlotRect && currentSlotRect.width >= 4 && currentSlotRect.height >= 4
      ? currentSlotRect.width / currentSlotRect.height
      : lastRenderW / lastRenderH;

  let currentAspect = getEffectiveSlotAspect();
  const applyCameraProjection = () => {
    camera.aspect = lastRenderW / lastRenderH;
    if (
      atelierFraming &&
      currentSlotRect &&
      currentSlotRect.width >= 4 &&
      currentSlotRect.height >= 4
    ) {
      const vo = computeFullBleedViewOffset(lastRenderW, lastRenderH, currentSlotRect);
      camera.setViewOffset(
        vo.fullWidth,
        vo.fullHeight,
        vo.offsetX,
        vo.offsetY,
        vo.width,
        vo.height,
      );
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  };

  const getMeanOpening = (arr: ArrayLike<number>): number => {
    let sum = 0;
    for (let i = 0; i < N; i += 1) sum += arr[i];
    return sum / N;
  };
  const computeTargetCamDist = (): number =>
    atelierFraming
      ? computeAtelierCameraDistance(getMeanOpening(currentPanelOpenings), currentAspect)
      : computeCameraDistance(
          { yawDeg: currentYawDeg, elevationDeg: currentElevDeg },
          currentAspect,
          fitPadding,
        );

  let targetCamDist = computeTargetCamDist();
  let currentCamDist = targetCamDist;

  let lastTextureKey = `${initialDesign.baseHex}|${initialDesign.designHex}|${initialDesign.print}|${initialDesign.motifScale}|${Boolean(initialDesign.tintUpload)}|${getBitmapKey(initialUpload)}`;
  let lastOpeningTarget = normalizeOpening(initialDesign.opening);

  let disposed = false;
  let active = true;
  let firstFrameReported = false;
  let renderBusy = false;
  let renderDirty = false;
  let rafId = 0;
  let pollTimeoutId = 0;
  let lastTime = performance.now();

  const applyChainPose = (openings: ArrayLike<number>) => {
    const pose = deriveFoldChain(openings as number[]);
    updateRibbonGeometry(ribbonGeo, pose);
    updateCreaseLineGeometry(creaseGeo, pose);
    updateHingeInstances(hingeInstanced, pose);

    const [f0, f1] = pose.feetCenters;
    leftFoot.position.set(f0.x, 0, f0.z);
    rightFoot.position.set(f1.x, 0, f1.z);

    leftGlide.position.set(f0.x, -FOLD_CONSTANTS.footHeight - 0.0008, f0.z);
    rightGlide.position.set(f1.x, -FOLD_CONSTANTS.footHeight - 0.0008, f1.z);

    contactShadowMesh.scale.set(
      pose.metrics.outerSpan + 0.56,
      1,
      Math.max(0.72, pose.metrics.outerDepth + 0.48),
    );

    targetCamDist = computeTargetCamDist();
  };

  const applyCamera = () => {
    const yawWithParallax = currentYawDeg + currentParallaxNx * 2.2;
    const elevWithParallax = clampElevation(currentElevDeg + currentParallaxNy * 1.1);
    const dir = viewDirectionFromAngles({
      yawDeg: yawWithParallax,
      elevationDeg: elevWithParallax,
    });
    _camDir.set(dir[0], dir[1], dir[2]).normalize();
    camera.position.copy(_camDir).multiplyScalar(currentCamDist).add(_targetVec);
    camera.lookAt(_targetVec);
  };

  function clampElevation(e: number): number {
    return Math.max(FOLD_CONSTANTS.minElevationDeg, Math.min(FOLD_CONSTANTS.maxElevationDeg, e));
  }

  applyCameraProjection();
  applyChainPose(currentPanelOpenings);
  targetCamDist = computeTargetCamDist();
  currentCamDist = targetCamDist;
  applyCamera();

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  function afterDraw(cb: () => void) {
    try {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          pollTimeoutId = window.setTimeout(poll, 4);
        } else {
          if (sync) gl.deleteSync(sync);
          cb();
        }
      };
      pollTimeoutId = window.setTimeout(poll, 0);
    } catch {
      pollTimeoutId = window.setTimeout(cb, 0);
    }
  }

  function stepAnimation(dt: number): boolean {
    let needsMore = false;

    // 1. Coupled panel chain damping (allows smooth blending if user interrupts an unfold wave)
    let poseDirty = false;
    for (let i = 0; i < N; i += 1) {
      const diff = Math.abs(currentPanelOpenings[i] - targetPanelOpenings[i]);
      if (diff > 0.02) {
        if (isSoftwareGl) {
          currentPanelOpenings[i] = targetPanelOpenings[i];
        } else {
          const next = damp(currentPanelOpenings[i], targetPanelOpenings[i], 13, dt);
          if (Math.abs(next - targetPanelOpenings[i]) <= 0.02) {
            currentPanelOpenings[i] = targetPanelOpenings[i];
          } else {
            currentPanelOpenings[i] = next;
            needsMore = true;
          }
        }
        poseDirty = true;
      }
    }
    if (poseDirty) {
      applyChainPose(currentPanelOpenings);
    }

    // 2. Camera orbit & subtle pointer parallax damping
    const yawDiff = Math.abs((((targetYawDeg - currentYawDeg) % 360) + 540) % 360 - 180);
    const elevDiff = Math.abs(targetElevDeg - currentElevDeg);
    const pxDiff = Math.abs(targetParallaxNx - currentParallaxNx);
    const pyDiff = Math.abs(targetParallaxNy - currentParallaxNy);
    let camDirty = false;

    if (yawDiff > 0.05 || elevDiff > 0.05) {
      if (isSoftwareGl) {
        currentYawDeg = targetYawDeg;
        currentElevDeg = targetElevDeg;
      } else {
        const t = 1 - Math.exp(-10 * dt);
        currentYawDeg = stepAngleShortestArc(currentYawDeg, targetYawDeg, t);
        currentElevDeg = damp(currentElevDeg, targetElevDeg, 10, dt);
        if (
          Math.abs((((targetYawDeg - currentYawDeg) % 360) + 540) % 360 - 180) <= 0.05 &&
          Math.abs(targetElevDeg - currentElevDeg) <= 0.05
        ) {
          currentYawDeg = targetYawDeg;
          currentElevDeg = targetElevDeg;
        } else {
          needsMore = true;
        }
      }
      camDirty = true;
    }

    if (!isSoftwareGl && (pxDiff > 0.005 || pyDiff > 0.005)) {
      currentParallaxNx = damp(currentParallaxNx, targetParallaxNx, 6, dt);
      currentParallaxNy = damp(currentParallaxNy, targetParallaxNy, 6, dt);
      if (
        Math.abs(targetParallaxNx - currentParallaxNx) <= 0.005 &&
        Math.abs(targetParallaxNy - currentParallaxNy) <= 0.005
      ) {
        currentParallaxNx = targetParallaxNx;
        currentParallaxNy = targetParallaxNy;
      } else {
        needsMore = true;
      }
      camDirty = true;
    }

    if (Math.abs(targetCamDist - currentCamDist) > 0.004) {
      if (isSoftwareGl) {
        currentCamDist = targetCamDist;
      } else {
        currentCamDist = damp(currentCamDist, targetCamDist, 9, dt);
        if (Math.abs(targetCamDist - currentCamDist) <= 0.004) {
          currentCamDist = targetCamDist;
        } else {
          needsMore = true;
        }
      }
      camDirty = true;
    }

    if (camDirty) {
      applyCamera();
    }

    // 3. Smooth material color/print cross-wash & hover sheen
    if (materials.stepTransition(dt)) {
      needsMore = true;
    }
    if (!isSoftwareGl && materials.setHoverHighlight(targetHovered, dt)) {
      needsMore = true;
    }

    const rimTarget = targetHovered ? 0.42 : 0.28;
    if (!isSoftwareGl && Math.abs(rimLight.intensity - rimTarget) > 0.01) {
      rimLight.intensity = damp(rimLight.intensity, rimTarget, 8, dt);
      needsMore = true;
    } else {
      rimLight.intensity = rimTarget;
    }

    if (Math.abs(glintLight.intensity - targetGlintIntensity) > 0.01) {
      glintLight.intensity = isSoftwareGl
        ? targetGlintIntensity
        : damp(glintLight.intensity, targetGlintIntensity, 8, dt);
      if (Math.abs(glintLight.intensity - targetGlintIntensity) <= 0.01) {
        glintLight.intensity = targetGlintIntensity;
      } else {
        needsMore = true;
      }
    }

    // 4. Smoothly harmonize Three.js lighting and shadow tint with the 2.5D architectural room
    if (lightingColorDirty) {
      if (isSoftwareGl) {
        hemiLight.color.copy(targetHemiSkyColor);
        hemiLight.groundColor.copy(targetHemiGroundColor);
        keyLight.color.copy(targetKeyColor);
        backFillLight.color.copy(targetFillColor);
        rimLight.color.copy(targetRimColor);
        materials.floor.color.copy(targetShadowColor);
        materials.contactShadow.color.copy(targetShadowColor);
        materials.floor.opacity = targetFloorShadowOpacity;
        materials.contactShadow.opacity = targetContactShadowOpacity;
        lightingColorDirty = false;
      } else {
        const k = 1 - Math.exp(-5.4 * dt);
        hemiLight.color.lerp(targetHemiSkyColor, k);
        hemiLight.groundColor.lerp(targetHemiGroundColor, k);
        keyLight.color.lerp(targetKeyColor, k);
        backFillLight.color.lerp(targetFillColor, k);
        rimLight.color.lerp(targetRimColor, k);
        materials.floor.color.lerp(targetShadowColor, k);
        materials.contactShadow.color.lerp(targetShadowColor, k);
        materials.floor.opacity = damp(materials.floor.opacity, targetFloorShadowOpacity, 5.4, dt);
        materials.contactShadow.opacity = damp(materials.contactShadow.opacity, targetContactShadowOpacity, 5.4, dt);

        const residual =
          Math.abs(keyLight.color.r - targetKeyColor.r) +
          Math.abs(keyLight.color.g - targetKeyColor.g) +
          Math.abs(keyLight.color.b - targetKeyColor.b) +
          Math.abs(hemiLight.groundColor.r - targetHemiGroundColor.r) +
          Math.abs(materials.contactShadow.color.r - targetShadowColor.r);

        if (residual < 0.004) {
          hemiLight.color.copy(targetHemiSkyColor);
          hemiLight.groundColor.copy(targetHemiGroundColor);
          keyLight.color.copy(targetKeyColor);
          backFillLight.color.copy(targetFillColor);
          rimLight.color.copy(targetRimColor);
          materials.floor.color.copy(targetShadowColor);
          materials.contactShadow.color.copy(targetShadowColor);
          materials.floor.opacity = targetFloorShadowOpacity;
          materials.contactShadow.opacity = targetContactShadowOpacity;
          lightingColorDirty = false;
        } else {
          needsMore = true;
        }
      }
    }

    return needsMore;
  }

  function drawFrame() {
    if (disposed) return;
    renderer.render(scene, camera);
    if (!firstFrameReported) {
      firstFrameReported = true;
      onFirstFrame?.();
    }
  }

  function requestRender() {
    if (disposed || !active) return;
    if (renderBusy) {
      renderDirty = true;
      return;
    }
    renderBusy = true;
    rafId = requestAnimationFrame((now) => {
      if (disposed) {
        renderBusy = false;
        return;
      }
      renderDirty = false;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const more = stepAnimation(dt);
      drawFrame();

      const done = () => {
        renderBusy = false;
        if (!disposed && active && (more || renderDirty)) {
          requestRender();
        }
      };

      if (isSoftwareGl) {
        afterDraw(done);
      } else {
        done();
      }
    });
  }

  const handleContextLost = (e: Event) => {
    e.preventDefault();
    if (!disposed) {
      onContextLost?.();
    }
  };
  canvas.addEventListener('webglcontextlost', handleContextLost);

  requestRender();

  return {
    setPose(opening: number, immediate = false) {
      const clamped = normalizeOpening(opening);
      for (let i = 0; i < N; i += 1) {
        targetPanelOpenings[i] = clamped;
        if (immediate) {
          currentPanelOpenings[i] = clamped;
        }
      }
      targetGlintIntensity = 0;
      if (immediate) {
        applyChainPose(currentPanelOpenings);
      }
      requestRender();
    },

    setChainPose(panelOpenings: readonly number[], glintProgress = 1) {
      for (let i = 0; i < N; i += 1) {
        const val = normalizeOpening(
          i < panelOpenings.length ? panelOpenings[i] : FOLD_CONSTANTS.defaultOpening,
        );
        currentPanelOpenings[i] = val;
        targetPanelOpenings[i] = val;
      }
      if (glintProgress > 0 && glintProgress < 0.99) {
        glintLight.position.x = -0.55 + glintProgress * 1.1;
        glintLight.position.z = 0.55;
        targetGlintIntensity = Math.sin(glintProgress * Math.PI) * 0.72;
        glintLight.intensity = targetGlintIntensity;
      } else {
        targetGlintIntensity = 0;
        glintLight.intensity = 0;
      }
      applyChainPose(currentPanelOpenings);
      requestRender();
    },

    setDesign(
      design: DesignState,
      uploadedBitmap: ImageBitmap | null,
      immediate = false,
    ) {
      const nextTexKey = `${design.baseHex}|${design.designHex}|${design.print}|${design.motifScale}|${Boolean(design.tintUpload)}|${getBitmapKey(uploadedBitmap)}`;
      if (nextTexKey !== lastTextureKey) {
        lastTextureKey = nextTexKey;
        materials.updateDesign(design, uploadedBitmap, !immediate && !isSoftwareGl);
      }
      const clamped = normalizeOpening(design.opening);
      if (immediate || Math.abs(clamped - lastOpeningTarget) > 0.001) {
        lastOpeningTarget = clamped;
        for (let i = 0; i < N; i += 1) {
          targetPanelOpenings[i] = clamped;
          if (immediate) {
            currentPanelOpenings[i] = clamped;
          }
        }
        if (immediate) {
          applyChainPose(currentPanelOpenings);
        }
      }
      requestRender();
    },

    setViewAngles(view: ViewState, immediate = false) {
      targetYawDeg = normalizeYawDeg(view.yawDeg);
      targetElevDeg = normalizeElevationDeg(view.elevationDeg);
      if (immediate) {
        currentYawDeg = targetYawDeg;
        currentElevDeg = targetElevDeg;
        applyCamera();
      }
      requestRender();
    },

    setPointerParallax(nx: number, ny: number) {
      if (isSoftwareGl || isCoarsePointer) return;
      targetParallaxNx = Math.max(-1, Math.min(1, nx));
      targetParallaxNy = Math.max(-1, Math.min(1, ny));
      requestRender();
    },

    setHovered(hovered: boolean) {
      if (targetHovered === hovered) return;
      targetHovered = hovered;
      requestRender();
    },

    setRoomLighting(lighting: RoomLightingState, immediate = false) {
      applyRoomLightingTargets(lighting, immediate || isSoftwareGl);
      requestRender();
    },

    resize(width: number, height: number, slotRect?: StageSlotRect | null) {
      if (disposed || width < 4 || height < 4) return;
      const rw = Math.round(width);
      const rh = Math.round(height);
      const nextSlot =
        slotRect && slotRect.width >= 4 && slotRect.height >= 4 ? slotRect : null;
      const slotChanged =
        (nextSlot === null) !== (currentSlotRect === null) ||
        (nextSlot !== null &&
          currentSlotRect !== null &&
          (Math.abs(nextSlot.x - currentSlotRect.x) >= 0.5 ||
            Math.abs(nextSlot.y - currentSlotRect.y) >= 0.5 ||
            Math.abs(nextSlot.width - currentSlotRect.width) >= 0.5 ||
            Math.abs(nextSlot.height - currentSlotRect.height) >= 0.5));
      if (rw === lastRenderW && rh === lastRenderH && !slotChanged) return;
      lastRenderW = rw;
      lastRenderH = rh;
      currentSlotRect = nextSlot;
      currentAspect = getEffectiveSlotAspect();
      applyCameraProjection();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      renderer.setSize(rw, rh, false);
      targetCamDist = computeTargetCamDist();
      currentCamDist = targetCamDist;
      applyCamera();
      drawFrame();
      requestRender();
    },

    setActive(nextActive: boolean) {
      active = nextActive;
      if (active && !disposed) {
        lastTime = performance.now();
        requestRender();
      }
    },

    renderOnce() {
      if (disposed) return;
      applyChainPose(currentPanelOpenings);
      currentYawDeg = targetYawDeg;
      currentElevDeg = targetElevDeg;
      targetCamDist = computeTargetCamDist();
      currentCamDist = targetCamDist;
      applyCamera();
      drawFrame();
    },

    getStats() {
      return {
        triangles: renderer.info.render.triangles,
        calls: renderer.info.render.calls,
      };
    },

    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(pollTimeoutId);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      ribbonGeo.dispose();
      creaseGeo.dispose();
      hingeGeo.dispose();
      footGeo.dispose();
      glideGeo.dispose();
      floorGeo.dispose();
      floorGlowGeo.dispose();
      shadowGeo.dispose();
      envTex.dispose();
      materials.dispose();
      renderer.dispose();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    },
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/FoldStage.tsx">
<![CDATA['use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FOLD_CONSTANTS, PRINT_SPECS, STORY_CHAPTERS } from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { StageHostId, useFold } from './FoldProvider';
import type { FoldSceneController, RoomLightingState } from './FoldScene';
import { FoldStillCanvas } from './FoldStillCanvas';
import type { StageSlotRect } from './projection';
import { normalizeElevationDeg, normalizeYawDeg, usesActivePrintColor } from './state';
import type { UnfoldChoreographyFrame } from './unfold';

type GraphicsState = 'idle' | 'initializing' | 'live' | 'still' | 'error';

interface FoldStageProps {
  hostId: StageHostId;
  variant?: 'framed' | 'atelier';
  darkSurface?: boolean;
  roomLighting?: RoomLightingState;
  compact?: boolean;
  showStoryBadge?: boolean;
  showSpanBracket?: boolean;
  canvasPortalEl?: HTMLElement | null;
  useFullBleedPortal?: boolean;
  className?: string;
}

const CircularDragHintSvg: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="srf-drag-arc shrink-0 text-current"
  >
    <path
      d="M20 12a8 8 0 1 1-2.34-5.66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 4v4.5h-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FoldStage: React.FC<FoldStageProps> = ({
  hostId,
  variant = 'framed',
  darkSurface = false,
  roomLighting,
  compact = false,
  showStoryBadge = false,
  showSpanBracket = true,
  canvasPortalEl = null,
  useFullBleedPortal = false,
  className = '',
}) => {
  const {
    mode,
    design,
    view,
    effectiveOpening,
    chapter,
    env,
    choreographyMode,
    uploadedArt,
    activeWebglHost,
    acquireWebglHost,
    releaseWebglHost,
    setViewAngles,
    cancelChoreography,
    getLiveOpening,
    getLiveChainFrame,
    subscribeStoryFrame,
    subscribeChainFrame,
  } = useFold();

  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<FoldSceneController | null>(null);
  const spanTextRef = useRef<HTMLSpanElement>(null);
  const atelierReadoutSpanRef = useRef<HTMLSpanElement>(null);

  const [stillOpening, setStillOpening] = useState<number>(effectiveOpening);
  const [stillPanelOpenings, setStillPanelOpenings] = useState<readonly number[] | null>(
    () => getLiveChainFrame()?.panelOpenings ?? null,
  );
  const [graphicsState, setGraphicsState] = useState<GraphicsState>('idle');
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [userStillRequested, setUserStillRequested] = useState(false);
  const [activationNonce, setActivationNonce] = useState(0);
  const [inViewport, setInViewport] = useState(hostId === 'hero');
  const [isDragging, setIsDragging] = useState(false);

  const [portalSlotRect, setPortalSlotRect] = useState<StageSlotRect | null>(null);
  const portalSlotRectRef = useRef<StageSlotRect | null>(null);

  const generationRef = useRef(0);
  const isVisibleRef = useRef(hostId === 'hero');

  const measurePortalLayout = useCallback((): {
    hostW: number;
    hostH: number;
    slotRect: StageSlotRect | null;
  } => {
    const vpEl = viewportRef.current;
    const hostEl = canvasHostRef.current;
    if (useFullBleedPortal && canvasPortalEl && vpEl) {
      const portalRect = canvasPortalEl.getBoundingClientRect();
      const vpRect = vpEl.getBoundingClientRect();
      const hostW = Math.round(portalRect.width);
      const hostH = Math.round(portalRect.height);
      const slotRect: StageSlotRect | null =
        vpRect.width >= 4 && vpRect.height >= 4
          ? {
              x: vpRect.left - portalRect.left,
              y: vpRect.top - portalRect.top,
              width: vpRect.width,
              height: vpRect.height,
            }
          : null;
      return { hostW, hostH, slotRect };
    }

    return {
      hostW: Math.round(hostEl?.clientWidth || vpEl?.clientWidth || 800),
      hostH: Math.round(hostEl?.clientHeight || vpEl?.clientHeight || 560),
      slotRect: null,
    };
  }, [useFullBleedPortal, canvasPortalEl]);

  // Keep latest reactive values accessible to async init/context-loss handlers without stale closures
  const latestDesignRef = useRef(design);
  latestDesignRef.current = design;
  const latestUploadRef = useRef(uploadedArt);
  latestUploadRef.current = uploadedArt;
  const latestViewRef = useRef(view);
  latestViewRef.current = view;
  const latestRoomLightingRef = useRef(roomLighting);
  latestRoomLightingRef.current = roomLighting;

  const isAtelier = variant === 'atelier';
  const fitPadding = isAtelier ? 1.01 : FOLD_CONSTANTS.cameraFitPadding;

  const updateDomSpan = useCallback((formatted: string) => {
    if (spanTextRef.current) {
      spanTextRef.current.textContent = formatted;
    }
    if (atelierReadoutSpanRef.current) {
      atelierReadoutSpanRef.current.textContent = formatted;
    }
  }, []);

  // Cleanup active WebGL instance cleanly and release singleton ownership
  const disposeController = useCallback(() => {
    generationRef.current += 1;
    if (controllerRef.current) {
      controllerRef.current.dispose();
      controllerRef.current = null;
    }
    setFirstFrameReady(false);
    setStillOpening(getLiveOpening());
    setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
    setGraphicsState((prev) => (prev === 'error' ? 'error' : 'still'));
    releaseWebglHost(hostId);
  }, [getLiveChainFrame, getLiveOpening, hostId, releaseWebglHost]);

  // Synchronize live opening during manual adjustments and story scroll
  useEffect(() => {
    const applyOpening = (openingValue: number) => {
      const pose = deriveFold(openingValue);
      updateDomSpan(formatMeters(pose.metrics.outerSpan));
      if (controllerRef.current) {
        controllerRef.current.setPose(openingValue);
      } else {
        setStillPanelOpenings(null);
        setStillOpening(openingValue);
      }
    };

    const activeChain = getLiveChainFrame();
    if (!activeChain) {
      applyOpening(getLiveOpening());
    }

    if (mode !== 'story') return;
    return subscribeStoryFrame((nextOpening) => {
      if (!getLiveChainFrame()) {
        applyOpening(nextOpening);
      }
    });
  }, [mode, effectiveOpening, getLiveOpening, getLiveChainFrame, subscribeStoryFrame, updateDomSpan]);

  // Synchronize mechanical hinge-chain unfolding choreography (entrance & "See how it folds")
  useEffect(() => {
    const applyChain = (frame: UnfoldChoreographyFrame | null) => {
      if (!frame) {
        const opening = getLiveOpening();
        const pose = deriveFold(opening);
        updateDomSpan(formatMeters(pose.metrics.outerSpan));
        if (controllerRef.current) {
          controllerRef.current.setPose(opening);
        } else {
          setStillPanelOpenings(null);
          setStillOpening(opening);
        }
        return;
      }

      const pose = deriveFoldChain(frame.panelOpenings);
      updateDomSpan(formatMeters(pose.metrics.outerSpan));
      if (controllerRef.current) {
        controllerRef.current.setChainPose(frame.panelOpenings, frame.glintProgress);
      } else {
        setStillPanelOpenings(frame.panelOpenings);
        setStillOpening(frame.averageOpening);
      }
    };

    const currentFrame = getLiveChainFrame();
    if (currentFrame) {
      applyChain(currentFrame);
    }

    return subscribeChainFrame(applyChain);
  }, [getLiveChainFrame, getLiveOpening, subscribeChainFrame, updateDomSpan]);

  // Sync design (colors, print, scale, opening, uploaded bitmap) to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current) return;
    controllerRef.current.setDesign(
      { ...design, opening: getLiveOpening() },
      uploadedArt?.bitmap ?? null,
      env.reducedMotion,
    );
  }, [
    design.baseHex,
    design.designHex,
    design.print,
    design.motifScale,
    design.tintUpload,
    design.opening,
    uploadedArt,
    env.reducedMotion,
    getLiveOpening,
  ]);

  // Sync camera angles to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current) return;
    controllerRef.current.setViewAngles(view, env.reducedMotion || isDragging);
  }, [view.yawDeg, view.elevationDeg, env.reducedMotion, isDragging]);

  // Sync room-derived light/shadow tint to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current || !roomLighting) return;
    controllerRef.current.setRoomLighting(roomLighting, env.reducedMotion);
  }, [
    roomLighting?.lightTint,
    roomLighting?.ambientTint,
    roomLighting?.shadowTint,
    roomLighting?.floorBase,
    roomLighting?.isDarkEnvelope,
    env.reducedMotion,
  ]);

  // Dispose immediately if reduced motion becomes active
  useEffect(() => {
    if (!env.reducedMotion) return;
    disposeController();
  }, [env.reducedMotion, disposeController]);

  // Track viewport visibility for pausing offscreen + automatic Hero <-> Studio handoff
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateVisibility = () => {
      const visible = isVisibleRef.current && document.visibilityState === 'visible';
      controllerRef.current?.setActive(visible);
    };

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const intersecting = entries.some(
                (e) => e.isIntersecting && e.intersectionRatio >= 0.08,
              );
              isVisibleRef.current = intersecting;
              setInViewport(intersecting);
              updateVisibility();
            },
            { threshold: [0, 0.08, 0.25] },
          )
        : null;

    io?.observe(el);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Manage singleton 3D WebGL lifecycle across Hero and Studio
  const canAutoStart =
    env.enhancedDesktop && !env.saveData && !env.isCoarsePointer;
  const explicitlyRequested = activationNonce > 0;
  const shouldHostAutoStart =
    inViewport &&
    canAutoStart &&
    !userStillRequested &&
    (hostId === 'studio' || activeWebglHost !== 'studio');
  const wantsWebgl =
    !env.reducedMotion &&
    !userStillRequested &&
    (explicitlyRequested || shouldHostAutoStart);

  // Keep full-bleed slot rect and stage resize synchronized across WebGL and 2D still view
  useEffect(() => {
    if (!useFullBleedPortal || !canvasPortalEl) return;

    const syncLayout = () => {
      const { hostW, hostH, slotRect } = measurePortalLayout();
      if (hostW < 4 || hostH < 4) return;
      const prev = portalSlotRectRef.current;
      const changed =
        (slotRect === null) !== (prev === null) ||
        (slotRect !== null &&
          prev !== null &&
          (Math.abs(slotRect.x - prev.x) >= 0.5 ||
            Math.abs(slotRect.y - prev.y) >= 0.5 ||
            Math.abs(slotRect.width - prev.width) >= 0.5 ||
            Math.abs(slotRect.height - prev.height) >= 0.5));
      if (changed) {
        portalSlotRectRef.current = slotRect;
        setPortalSlotRect(slotRect);
      }
      controllerRef.current?.resize(hostW, hostH, slotRect);
    };

    syncLayout();

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncLayout) : null;
    ro?.observe(canvasPortalEl);
    if (viewportRef.current) ro?.observe(viewportRef.current);
    window.addEventListener('resize', syncLayout, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', syncLayout);
    };
  }, [useFullBleedPortal, canvasPortalEl, measurePortalLayout]);

  useEffect(() => {
    const stageEl = stageRef.current;
    const hostEl = canvasHostRef.current;
    if (!stageEl || !hostEl) return;
    if (useFullBleedPortal && !canvasPortalEl) return;

    if (!wantsWebgl) {
      if (controllerRef.current) {
        disposeController();
      } else {
        setFirstFrameReady(false);
        setStillOpening(getLiveOpening());
        setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
        setGraphicsState((prev) =>
          prev === 'error'
            ? 'error'
            : userStillRequested || env.reducedMotion
              ? 'still'
              : 'idle',
        );
      }
      return;
    }

    if (controllerRef.current) return;

    const gen = ++generationRef.current;
    let cancelled = false;
    let idleHandle = 0;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | 0 = 0;
    let resizeObserver: ResizeObserver | null = null;

    const handleForeignTakeover = () => {
      cancelled = true;
      generationRef.current += 1;
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      resizeObserver?.disconnect();
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setFirstFrameReady(false);
      setStillOpening(getLiveOpening());
      setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
      setActivationNonce(0);
      setGraphicsState('still');
    };

    const startEngine = async () => {
      if (cancelled || gen !== generationRef.current) return;
      setGraphicsState('initializing');

      acquireWebglHost(hostId, handleForeignTakeover);

      try {
        const mod = await import('./FoldScene');
        if (cancelled || gen !== generationRef.current) {
          releaseWebglHost(hostId);
          return;
        }

        const chainFrame = getLiveChainFrame();
        const initialLayout = measurePortalLayout();
        if (initialLayout.slotRect) {
          portalSlotRectRef.current = initialLayout.slotRect;
        }
        const ctrl = mod.createFoldScene({
          container: hostEl,
          initialDesign: {
            ...latestDesignRef.current,
            opening: getLiveOpening(),
          },
          initialPanelOpenings: chainFrame?.panelOpenings,
          initialUpload: latestUploadRef.current?.bitmap ?? null,
          initialView: latestViewRef.current,
          initialRoomLighting: latestRoomLightingRef.current,
          isCoarsePointer: env.isCoarsePointer,
          fitPadding,
          atelierFraming: isAtelier,
          initialSlotRect: useFullBleedPortal ? initialLayout.slotRect : null,
          onFirstFrame: () => {
            if (cancelled || gen !== generationRef.current) return;
            setFirstFrameReady(true);
            setGraphicsState('live');
          },
          onContextLost: () => {
            if (cancelled || gen !== generationRef.current) return;
            generationRef.current += 1;
            ctrl.dispose();
            if (controllerRef.current === ctrl) {
              controllerRef.current = null;
            }
            setFirstFrameReady(false);
            setActivationNonce(0);
            setStillOpening(getLiveOpening());
            setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
            setGraphicsState('error');
            releaseWebglHost(hostId);
          },
        });

        if (cancelled || gen !== generationRef.current) {
          ctrl.dispose();
          releaseWebglHost(hostId);
          return;
        }

        controllerRef.current = ctrl;
        ctrl.setDesign(
          { ...latestDesignRef.current, opening: getLiveOpening() },
          latestUploadRef.current?.bitmap ?? null,
          env.reducedMotion,
        );
        ctrl.setViewAngles(latestViewRef.current, true);
        if (latestRoomLightingRef.current) {
          ctrl.setRoomLighting(latestRoomLightingRef.current, true);
        }
        ctrl.setActive(
          isVisibleRef.current && document.visibilityState === 'visible',
        );

        if (!useFullBleedPortal) {
          let lastObsW = Math.round(hostEl.clientWidth);
          let lastObsH = Math.round(hostEl.clientHeight);
          resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              const width = Math.round(entry.contentRect.width);
              const height = Math.round(entry.contentRect.height);
              if (width >= 4 && height >= 4 && (width !== lastObsW || height !== lastObsH)) {
                lastObsW = width;
                lastObsH = height;
                ctrl.resize(width, height);
              }
            }
          });
          resizeObserver.observe(hostEl);
        } else {
          const synced = measurePortalLayout();
          if (synced.hostW >= 4 && synced.hostH >= 4) {
            ctrl.resize(synced.hostW, synced.hostH, synced.slotRect);
          }
        }
      } catch {
        if (!cancelled && gen === generationRef.current) {
          setFirstFrameReady(false);
          setActivationNonce(0);
          setStillOpening(getLiveOpening());
          setGraphicsState('error');
          releaseWebglHost(hostId);
        }
      }
    };

    if (explicitlyRequested) {
      void startEngine();
    } else if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(() => void startEngine(), {
        timeout: 220,
      });
    } else {
      timeoutHandle = globalThis.setTimeout(() => void startEngine(), 32);
    }

    return () => {
      cancelled = true;
      generationRef.current += 1;
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      resizeObserver?.disconnect();
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setFirstFrameReady(false);
      releaseWebglHost(hostId);
    };
    // Intentionally governed by eligibility, viewport ownership, and explicit user toggles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    wantsWebgl,
    explicitlyRequested,
    env.isCoarsePointer,
    env.reducedMotion,
    userStillRequested,
    hostId,
    fitPadding,
    useFullBleedPortal,
    canvasPortalEl,
  ]);

  // Direct pointer drag orbit controller + idle hover parallax (works across both 3D & 2D fallback)
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    startYaw: number;
    startElev: number;
    crossedThreshold: boolean;
    pointerType: string;
    latestYaw: number;
    latestElev: number;
    rafId: number;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startYaw: view.yawDeg,
    startElev: view.elevationDeg,
    crossedThreshold: false,
    pointerType: 'mouse',
    latestYaw: view.yawDeg,
    latestElev: view.elevationDeg,
    rafId: 0,
  });

  const endDrag = useCallback(
    (commitFinal: boolean) => {
      const ds = dragStateRef.current;
      if (ds.rafId) {
        cancelAnimationFrame(ds.rafId);
        ds.rafId = 0;
      }
      if (ds.pointerId !== null) {
        const el = viewportRef.current;
        if (el) {
          try {
            if (el.hasPointerCapture(ds.pointerId)) {
              el.releasePointerCapture(ds.pointerId);
            }
          } catch {
            // ignore already released
          }
        }
        if (commitFinal && ds.crossedThreshold) {
          setViewAngles(ds.latestYaw, ds.latestElev);
        }
      }
      ds.pointerId = null;
      ds.crossedThreshold = false;
      setIsDragging(false);
    },
    [setViewAngles],
  );

  useEffect(() => {
    return () => endDrag(false);
  }, [endDrag, env.reducedMotion, graphicsState]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== null) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const ds = dragStateRef.current;
    ds.pointerId = e.pointerId;
    ds.startX = e.clientX;
    ds.startY = e.clientY;
    ds.startYaw = view.yawDeg;
    ds.startElev = view.elevationDeg;
    ds.latestYaw = view.yawDeg;
    ds.latestElev = view.elevationDeg;
    ds.crossedThreshold = false;
    ds.pointerType = e.pointerType;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if capture unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragStateRef.current;

    if (ds.pointerId !== e.pointerId) {
      // Gentle pointer-responsive camera parallax (1–2.2°) while hovering atelier scene
      if (
        isAtelier &&
        ds.pointerId === null &&
        e.pointerType === 'mouse' &&
        viewportRef.current &&
        controllerRef.current
      ) {
        const rect = viewportRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          controllerRef.current.setPointerParallax(nx, ny);
        }
      }
      return;
    }

    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.crossedThreshold) {
      if (Math.hypot(dx, dy) < 4) return;
      ds.crossedThreshold = true;
      setIsDragging(true);
      // Safe interruption if user drags model during entrance or fold demo
      if (choreographyMode !== 'idle') {
        cancelChoreography();
      }
    }

    const width = viewportRef.current?.clientWidth || 640;
    const yawSens = 360 / Math.max(300, width * 0.72);
    const nextYaw = normalizeYawDeg(ds.startYaw - dx * yawSens);
    const nextElev =
      ds.pointerType === 'touch'
        ? ds.startElev
        : normalizeElevationDeg(ds.startElev + dy * 0.16);

    ds.latestYaw = nextYaw;
    ds.latestElev = nextElev;

    if (controllerRef.current) {
      controllerRef.current.setViewAngles(
        { yawDeg: nextYaw, elevationDeg: nextElev },
        true,
      );
    }

    if (ds.rafId === 0) {
      ds.rafId = requestAnimationFrame(() => {
        ds.rafId = 0;
        setViewAngles(ds.latestYaw, ds.latestElev);
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== e.pointerId) return;
    endDrag(true);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== e.pointerId) return;
    endDrag(false);
  };

  const handlePointerEnter = () => {
    if (isAtelier) {
      controllerRef.current?.setHovered(true);
    }
  };

  const handlePointerLeave = () => {
    if (isAtelier) {
      controllerRef.current?.setHovered(false);
      controllerRef.current?.setPointerParallax(0, 0);
    }
  };

  const handleUseStill = () => {
    setUserStillRequested(true);
    setActivationNonce(0);
    disposeController();
  };

  const handleExplore3D = () => {
    if (env.reducedMotion) return;
    setUserStillRequested(false);
    setActivationNonce((n) => n + 1);
  };

  const effectiveNowOpening = controllerRef.current ? getLiveOpening() : stillOpening;
  const currentPose =
    stillPanelOpenings && stillPanelOpenings.length === 16
      ? deriveFoldChain(stillPanelOpenings)
      : deriveFold(effectiveNowOpening);
  const printSpec = PRINT_SPECS[design.print];
  const chapterCode = STORY_CHAPTERS[chapter]?.index ?? '01';
  const showWebglCanvas =
    graphicsState === 'live' && firstFrameReady && activeWebglHost === hostId;

  useEffect(() => {
    if (showWebglCanvas && controllerRef.current) {
      controllerRef.current.renderOnce();
    }
  }, [showWebglCanvas]);

  const accessibleDescription = [
    `Fold ${FOLD_CONSTANTS.panels} divider`,
    `${Math.round(effectiveNowOpening)} percent open`,
    `outer span ${formatMeters(currentPose.metrics.outerSpan)}`,
    `${printSpec.name} print`,
    `base ${design.baseHex}`,
    printSpec.usesDesignColor ? `design ${design.designHex}` : null,
    printSpec.usesScale ? `${printSpec.scaleLabel.toLowerCase()} ${design.motifScale}%` : null,
    design.print === 'upload' && uploadedArt
      ? `uploaded image ${uploadedArt.filename}`
      : null,
    `view ${Math.round(view.yawDeg)} degrees`,
  ]
    .filter(Boolean)
    .join(', ');

  const stageVisualLayer = (
    <>
      <div
        className={`absolute inset-0 ${
          showWebglCanvas
            ? 'opacity-0 pointer-events-none transition-opacity duration-200'
            : 'opacity-100'
        }`}
        aria-hidden={showWebglCanvas || undefined}
      >
        <FoldStillCanvas
          opening={effectiveNowOpening}
          panelOpenings={stillPanelOpenings}
          design={design}
          view={view}
          uploadedBitmap={uploadedArt?.bitmap ?? null}
          showBracket={showSpanBracket && !compact}
          atelierFraming={isAtelier}
          darkSurface={isAtelier && darkSurface}
          slotRect={useFullBleedPortal ? portalSlotRect : null}
          background={isAtelier ? null : undefined}
        />
      </div>

      <div
        ref={canvasHostRef}
        data-testid={`fold-canvas-host-${hostId}`}
        className={`absolute inset-0 ${
          showWebglCanvas
            ? 'opacity-100 transition-opacity duration-200'
            : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );

  return (
    <div
      ref={stageRef}
      data-testid={`fold-stage-${hostId}`}
      data-variant={variant}
      data-graphics-state={showWebglCanvas ? 'live' : graphicsState}
      data-opening={Math.round(effectiveNowOpening)}
      className={
        isAtelier
          ? `relative w-full h-full bg-transparent overflow-visible flex flex-col justify-between pointer-events-none ${className}`
          : `relative w-full h-full rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-rose)] overflow-hidden flex flex-col justify-between ${className}`
      }
    >
      {/* Single accurate accessible description next to the visual representation */}
      <p className="sr-only" data-testid={`fold-stage-sr-${hostId}`}>
        {accessibleDescription}
      </p>

      {/* Top instrumentation & mode control (hidden in hero/atelier) */}
      {!isAtelier && (
        <div
          className={`relative z-10 flex items-center justify-between gap-3 shrink-0 pointer-events-none ${
            compact
              ? 'px-3 pt-2'
              : 'px-3 pt-2 sm:px-5 sm:pt-4'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 srf-mono-caption text-[var(--srf-mauve)] pointer-events-none select-none">
            <CircularDragHintSvg />
            <span>Drag to rotate</span>
            {showStoryBadge && mode === 'story' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--srf-oxblood)]">{chapterCode} / 03</span>
              </>
            )}
          </div>

          <div className="pointer-events-auto flex items-center gap-2 shrink-0">
            {!env.reducedMotion && (
              <>
                {showWebglCanvas ? (
                  <button
                    type="button"
                    onClick={handleUseStill}
                    className={`srf-btn-secondary bg-[var(--srf-rose)]/92 ${
                      compact
                        ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                        : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                    }`}
                  >
                    Use still view
                  </button>
                ) : graphicsState === 'error' ? (
                  <button
                    type="button"
                    onClick={handleExplore3D}
                    className={`srf-btn-secondary bg-[var(--srf-rose)]/92 ${
                      compact
                        ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                        : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                    }`}
                  >
                    Try 3D again
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleExplore3D}
                    disabled={graphicsState === 'initializing'}
                    className={`srf-btn-secondary bg-[var(--srf-rose)]/92 ${
                      compact
                        ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                        : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                    }`}
                  >
                    {graphicsState === 'initializing' ? 'Opening 3D…' : 'Explore in 3D'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {isAtelier && (
        <span
          ref={atelierReadoutSpanRef}
          data-testid="hero-atelier-readout"
          className="sr-only"
        >
          Fold {FOLD_CONSTANTS.panels} · {printSpec.name} · {design.baseHex}
          {usesActivePrintColor(design) ? ` / ${design.designHex}` : ''} ·{' '}
          {formatMeters(currentPose.metrics.outerSpan)} span
        </span>
      )}

      {/* Direct drag viewport containing synced 2D still renderer & active WebGL host (or portal to full-bleed Hero layer) */}
      <div
        ref={viewportRef}
        data-testid={`fold-viewport-${hostId}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onLostPointerCapture={() => endDrag(false)}
        style={{ touchAction: 'pan-y pinch-zoom' }}
        className={`relative flex-1 min-h-0 w-full select-none pointer-events-auto ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {!useFullBleedPortal && stageVisualLayer}
      </div>

      {useFullBleedPortal &&
        canvasPortalEl &&
        createPortal(stageVisualLayer, canvasPortalEl)}

      {/* Framed studio caption bar (omitted on borderless atelier hero, where instrumentation lives cleanly above) */}
      {!isAtelier && (
        <div
          className={`relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--srf-hairline)]/60 bg-[var(--srf-rose)] ${
            compact ? 'px-3 py-1.5' : 'px-3 py-1.5 sm:px-5 sm:py-3'
          }`}
        >
          <p className="srf-mono-caption text-[var(--srf-oxblood)] truncate">
            Fold {FOLD_CONSTANTS.panels} · {printSpec.name} · {design.baseHex} ·{' '}
            <span ref={spanTextRef} className="font-medium">
              {formatMeters(currentPose.metrics.outerSpan)}
            </span>{' '}
            span
          </p>

          {!compact && (
            <p className="hidden sm:block srf-mono-caption text-[var(--srf-mauve)] shrink-0">
              {env.reducedMotion
                ? 'Still view (reduced motion)'
                : graphicsState === 'error'
                  ? 'Still view (3D unavailable)'
                  : `${Math.round(view.yawDeg)}°`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/FoldStillCanvas.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { getBitmapKey, renderTextileToCanvas } from './artwork';
import { mixHex } from './color';
import { PALETTE, ViewId, ViewState } from './config';
import { deriveFold, deriveFoldChain } from './geometry';
import { projectFold, StageSlotRect } from './projection';
import type { DesignState } from './state';

interface FoldStillCanvasProps {
  opening: number;
  panelOpenings?: readonly number[] | null;
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale' | 'tintUpload'>;
  view: ViewState | ViewId;
  uploadedBitmap?: ImageBitmap | null;
  showBracket?: boolean;
  atelierFraming?: boolean;
  darkSurface?: boolean;
  slotRect?: StageSlotRect | null;
  background?: string | null; // CSS hex color, or null for transparent (used in RoomStudies & atelier hero)
  className?: string;
}

interface Pt {
  x: number;
  y: number;
}

interface Uv {
  u: number;
  v: number;
}

/**
 * Draws one projected textured triangle cleanly into the 2D canvas using a slightly
 * centroid-expanded clip triangle so adjacent triangle seams remain hairline-free.
 */
function drawTexturedTriangle(
  ctx: CanvasRenderingContext2D,
  texCanvas: HTMLCanvasElement,
  p0: Pt,
  p1: Pt,
  p2: Pt,
  uv0: Uv,
  uv1: Uv,
  uv2: Uv,
) {
  const tw = texCanvas.width;
  const th = texCanvas.height;

  const u0 = uv0.u * tw;
  const v0 = uv0.v * th;
  const u1 = uv1.u * tw;
  const v1 = uv1.v * th;
  const u2 = uv2.u * tw;
  const v2 = uv2.v * th;

  const du1 = u1 - u0;
  const dv1 = v1 - v0;
  const du2 = u2 - u0;
  const dv2 = v2 - v0;
  const det = du1 * dv2 - du2 * dv1;
  if (Math.abs(det) < 1e-4) return;

  const dx1 = p1.x - p0.x;
  const dy1 = p1.y - p0.y;
  const dx2 = p2.x - p0.x;
  const dy2 = p2.y - p0.y;

  const invDet = 1 / det;
  const a = (dx1 * dv2 - dx2 * dv1) * invDet;
  const b = (dy1 * dv2 - dy2 * dv1) * invDet;
  const c = (du1 * dx2 - du2 * dx1) * invDet;
  const d = (du1 * dy2 - du2 * dy1) * invDet;
  const e = p0.x - a * u0 - c * v0;
  const f = p0.y - b * u0 - d * v0;

  // Subtly expand clip triangle by 0.4px from centroid to avoid subpixel seams between diagonal triangles
  const cx = (p0.x + p1.x + p2.x) / 3;
  const cy = (p0.y + p1.y + p2.y) / 3;
  const expand = (p: Pt): Pt => {
    const vx = p.x - cx;
    const vy = p.y - cy;
    const len = Math.hypot(vx, vy) || 1;
    return { x: p.x + (vx / len) * 0.45, y: p.y + (vy / len) * 0.45 };
  };
  const cp0 = expand(p0);
  const cp1 = expand(p1);
  const cp2 = expand(p2);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cp0.x, cp0.y);
  ctx.lineTo(cp1.x, cp1.y);
  ctx.lineTo(cp2.x, cp2.y);
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(texCanvas, 0, 0);
  ctx.restore();
}

export const FoldStillCanvas: React.FC<FoldStillCanvasProps> = ({
  opening,
  panelOpenings = null,
  design,
  view,
  uploadedBitmap = null,
  showBracket = true,
  atelierFraming = false,
  darkSurface = false,
  slotRect = null,
  background = PALETTE.rose,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastTexKeyRef = useRef<string>('');
  const sizeRef = useRef<{ w: number; h: number }>({ w: 640, h: 460 });
  const paintRef = useRef<() => void>(() => {});

  // Draw function kept cleanly reusable for both state changes and resize events
  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const liveRect = canvas.getBoundingClientRect();
    if (liveRect.width >= 4 && liveRect.height >= 4) {
      sizeRef.current = { w: liveRect.width, h: liveRect.height };
    }

    const cssW = Math.max(8, sizeRef.current.w);
    const cssH = Math.max(8, sizeRef.current.h);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelW = Math.round(cssW * dpr);
    const pixelH = Math.round(cssH * dpr);

    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }

    if (!textureCanvasRef.current) {
      textureCanvasRef.current = document.createElement('canvas');
      textureCanvasRef.current.width = 1024;
      textureCanvasRef.current.height = 569;
    }

    const texKey = `${design.baseHex}|${design.designHex}|${design.print}|${design.motifScale}|${Boolean(design.tintUpload)}|${getBitmapKey(uploadedBitmap)}`;
    if (texKey !== lastTexKeyRef.current) {
      lastTexKeyRef.current = texKey;
      renderTextileToCanvas(textureCanvasRef.current, design, uploadedBitmap);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, cssW, cssH);
    } else {
      ctx.clearRect(0, 0, cssW, cssH);
    }

    const pose =
      panelOpenings && panelOpenings.length === 16
        ? deriveFoldChain(panelOpenings)
        : deriveFold(opening);
    const projected = projectFold(
      pose,
      view,
      cssW / cssH,
      cssW,
      cssH,
      atelierFraming ? opening : undefined,
      slotRect ?? undefined,
    );

    // 1. Soft floor contact shadow
    const sh = projected.shadowEllipse;
    ctx.save();
    ctx.translate(sh.cx, sh.cy);
    ctx.scale(sh.rx, sh.ry);
    const grad = ctx.createRadialGradient(0, 0, 0.05, 0, 0, 1);
    grad.addColorStop(0, 'rgba(75, 32, 42, 0.25)');
    grad.addColorStop(0.62, 'rgba(75, 32, 42, 0.09)');
    grad.addColorStop(1, 'rgba(75, 32, 42, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Depth-sorted projected faces
    const texCanvas = textureCanvasRef.current;
    const edgeDark = mixHex(design.baseHex, '#201014', 0.28);
    const edgeLight = mixHex(design.baseHex, '#FFFCF8', 0.22);

    ctx.lineJoin = 'round';
    for (const face of projected.faces) {
      const pts = face.points;
      if (pts.length < 3) continue;

      if (face.kind === 'felt' && face.uvs && face.uvs.length >= 4 && pts.length >= 4) {
        drawTexturedTriangle(ctx, texCanvas, pts[0], pts[1], pts[2], face.uvs[0], face.uvs[1], face.uvs[2]);
        drawTexturedTriangle(ctx, texCanvas, pts[0], pts[2], pts[3], face.uvs[0], face.uvs[2], face.uvs[3]);

        // Directional studio pleat shading glaze
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.closePath();

        if (face.shade < 0.86) {
          const shadowAlpha = Math.min(0.26, (0.86 - face.shade) * 0.85);
          ctx.fillStyle = `rgba(34, 16, 20, ${shadowAlpha.toFixed(3)})`;
          ctx.fill();
        } else if (face.shade > 0.91) {
          const hiAlpha = Math.min(0.1, (face.shade - 0.91) * 0.9);
          ctx.fillStyle = `rgba(255, 252, 248, ${hiAlpha.toFixed(3)})`;
          ctx.fill();
        }

        // Subtle pleat crease stroke
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.globalAlpha = 1;
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();

      if (face.kind === 'foot') {
        const f = Math.min(1.08, 0.72 + face.shade * 0.34);
        ctx.fillStyle = `rgb(${Math.min(255, Math.round(75 * f))}, ${Math.min(255, Math.round(32 * f))}, ${Math.min(255, Math.round(42 * f))})`;
        ctx.fill();
        ctx.strokeStyle = PALETTE.oxblood;
        ctx.globalAlpha = 0.65;
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (face.kind === 'top') {
        ctx.fillStyle = edgeLight;
        ctx.fill();
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 0.65;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        // End cap remains clean base felt color
        const t = Math.max(0, Math.min(1, (face.shade - 0.56) / 0.44));
        ctx.fillStyle =
          t < 0.55
            ? mixHex(edgeDark, design.baseHex, t / 0.55)
            : mixHex(design.baseHex, edgeLight, (t - 0.55) / 0.45);
        ctx.fill();
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // 3. Dimension bracket below feet (omitted on compact mobile sticky heights)
    if (showBracket && cssH >= 170 && projected.spanBracket.visible) {
      const br = projected.spanBracket;
      const by = Math.min(cssH - 10, br.y);
      ctx.strokeStyle = darkSurface ? '#F8F2EE' : PALETTE.oxblood;
      ctx.globalAlpha = darkSurface ? 0.72 : 0.68;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(br.leftX, by);
      ctx.lineTo(br.rightX, by);
      ctx.moveTo(br.leftX, by - 5);
      ctx.lineTo(br.leftX, by + 5);
      ctx.moveTo(br.rightX, by - 5);
      ctx.lineTo(br.rightX, by + 5);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  };

  paintRef.current = paint;

  // Track container dimensions cleanly with ResizeObserver using latest paintRef
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width >= 4 && rect.height >= 4) {
        sizeRef.current = { w: rect.width, h: rect.height };
        paintRef.current();
      }
    };
    measure();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measure())
        : null;
    ro?.observe(canvas);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    paintRef.current();
  }, [opening, panelOpenings, design.baseHex, design.designHex, design.print, design.motifScale, design.tintUpload, view, uploadedBitmap, showBracket, atelierFraming, darkSurface, slotRect, background]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`block w-full h-full select-none ${className}`}
    />
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/geometry.ts">
<![CDATA[import { FOLD_CONSTANTS } from './config';
import { clamp } from '../motion/math';

export interface FoldMetrics {
  centerlineSpan: number;
  outerSpan: number;
  outerDepth: number;
  angleRadians: number;
}

export interface PointXZ {
  x: number;
  z: number;
}

export interface FoldPose {
  opening: number;
  hinges: PointXZ[];
  front: PointXZ[];
  back: PointXZ[];
  feetCenters: [PointXZ, PointXZ];
  metrics: FoldMetrics;
}

const DEG_TO_RAD = Math.PI / 180;
const COS_CLOSED = Math.cos(FOLD_CONSTANTS.closedAngleDeg * DEG_TO_RAD);
const COS_OPEN = Math.cos(FOLD_CONSTANTS.openAngleDeg * DEG_TO_RAD);

export function normalizeOpening(value: number): number {
  if (!Number.isFinite(value)) return FOLD_CONSTANTS.defaultOpening;
  return clamp(value, 0, 100);
}

export function deriveFold(openingInput: number): FoldPose {
  const opening = normalizeOpening(openingInput);
  const u = opening / 100;

  const N = FOLD_CONSTANTS.panels;
  const b = FOLD_CONSTANTS.panelPitch;
  const t = FOLD_CONSTANTS.thickness;
  const L = FOLD_CONSTANTS.developedLength;

  const c = COS_CLOSED + (COS_OPEN - COS_CLOSED) * u;
  const angleRadians = Math.acos(clamp(c, -1, 1));
  const s = Math.sin(angleRadians);

  const hinges: PointXZ[] = [];
  for (let j = 0; j <= N; j += 1) {
    hinges.push({
      x: (j - N / 2) * b * c,
      z: ((j % 2) - 0.5) * b * s,
    });
  }

  const front: PointXZ[] = [];
  const back: PointXZ[] = [];

  for (let j = 0; j <= N; j += 1) {
    const p = hinges[j];
    let ox = 0;
    let oz = 0;

    if (j === 0) {
      // Adjacent segment 0 has direction (c, +s) and normal (-s, c)
      ox = -(t / 2) * s;
      oz = (t / 2) * c;
    } else if (j === N) {
      // Adjacent segment N-1 (15, odd) has direction (c, -s) and normal (+s, c)
      ox = (t / 2) * s;
      oz = (t / 2) * c;
    } else {
      // Interior mitered hinge offset: ±(0, t/(2*c))
      ox = 0;
      oz = t / (2 * c);
    }

    front.push({ x: p.x + ox, z: p.z + oz });
    back.push({ x: p.x - ox, z: p.z - oz });
  }

  const firstMid: PointXZ = {
    x: (hinges[0].x + hinges[1].x) * 0.5,
    z: (hinges[0].z + hinges[1].z) * 0.5,
  };
  const lastMid: PointXZ = {
    x: (hinges[N - 1].x + hinges[N].x) * 0.5,
    z: (hinges[N - 1].z + hinges[N].z) * 0.5,
  };

  const centerlineSpan = L * c;
  const centerlineDepth = b * s;
  const outerSpan = centerlineSpan + t * s;
  const outerDepth = centerlineDepth + t / c;

  return {
    opening,
    hinges,
    front,
    back,
    feetCenters: [firstMid, lastMid],
    metrics: {
      centerlineSpan,
      outerSpan,
      outerDepth,
      angleRadians,
    },
  };
}

/**
 * Solves a physically coupled 16-panel hinge chain from per-panel opening
 * percentages [0..100]. Adjacent panels share exact hinge endpoints, alternate
 * fold directions cleanly, preserve panel pitch (0.18 m), and miter thickness
 * offsets across hinges so prints & seams never detach during progressive unfolds.
 */
export function deriveFoldChain(panelOpenings: readonly number[]): FoldPose {
  const N = FOLD_CONSTANTS.panels;
  const b = FOLD_CONSTANTS.panelPitch;
  const t = FOLD_CONSTANTS.thickness;

  const raw: PointXZ[] = new Array(N + 1);
  const normals: PointXZ[] = new Array(N);
  raw[0] = { x: 0, z: 0 };

  let minRawZ = 0;
  let maxRawZ = 0;
  let openingSum = 0;
  let angleSum = 0;

  for (let i = 0; i < N; i += 1) {
    const o = normalizeOpening(
      i < panelOpenings.length ? panelOpenings[i] : FOLD_CONSTANTS.defaultOpening,
    );
    openingSum += o;
    const u = o / 100;
    const c = COS_CLOSED + (COS_OPEN - COS_CLOSED) * u;
    const theta = Math.acos(clamp(c, -1, 1));
    const s = Math.sin(theta);
    angleSum += theta;

    const sign = i % 2 === 0 ? 1 : -1;
    // Outward front (+Z) normal perpendicular to segment (c, sign * s)
    normals[i] = { x: -sign * s, z: c };

    const nx = raw[i].x + b * c;
    const nz = raw[i].z + sign * b * s;
    raw[i + 1] = { x: nx, z: nz };

    if (nz < minRawZ) minRawZ = nz;
    if (nz > maxRawZ) maxRawZ = nz;
  }

  const midX = (raw[0].x + raw[N].x) * 0.5;
  const midZ = (minRawZ + maxRawZ) * 0.5;

  const hinges: PointXZ[] = new Array(N + 1);
  for (let j = 0; j <= N; j += 1) {
    hinges[j] = {
      x: raw[j].x - midX,
      z: raw[j].z - midZ,
    };
  }

  const front: PointXZ[] = new Array(N + 1);
  const back: PointXZ[] = new Array(N + 1);

  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  for (let j = 0; j <= N; j += 1) {
    const p = hinges[j];
    let ox = 0;
    let oz = 0;

    if (j === 0) {
      ox = (t * 0.5) * normals[0].x;
      oz = (t * 0.5) * normals[0].z;
    } else if (j === N) {
      ox = (t * 0.5) * normals[N - 1].x;
      oz = (t * 0.5) * normals[N - 1].z;
    } else {
      const nPrev = normals[j - 1];
      const nNext = normals[j];
      const dotN = nPrev.x * nNext.x + nPrev.z * nNext.z;
      const denom = Math.max(0.1, 1 + dotN);
      const scale = (t * 0.5) / denom;
      ox = scale * (nPrev.x + nNext.x);
      oz = scale * (nPrev.z + nNext.z);
    }

    const fx = p.x + ox;
    const fz = p.z + oz;
    const bx = p.x - ox;
    const bz = p.z - oz;
    front[j] = { x: fx, z: fz };
    back[j] = { x: bx, z: bz };

    if (fx < minX) minX = fx;
    if (bx < minX) minX = bx;
    if (fx > maxX) maxX = fx;
    if (bx > maxX) maxX = bx;
    if (fz < minZ) minZ = fz;
    if (bz < minZ) minZ = bz;
    if (fz > maxZ) maxZ = fz;
    if (bz > maxZ) maxZ = bz;
  }

  const firstMid: PointXZ = {
    x: (hinges[0].x + hinges[1].x) * 0.5,
    z: (hinges[0].z + hinges[1].z) * 0.5,
  };
  const lastMid: PointXZ = {
    x: (hinges[N - 1].x + hinges[N].x) * 0.5,
    z: (hinges[N - 1].z + hinges[N].z) * 0.5,
  };

  return {
    opening: openingSum / N,
    hinges,
    front,
    back,
    feetCenters: [firstMid, lastMid],
    metrics: {
      centerlineSpan: hinges[N].x - hinges[0].x,
      outerSpan: maxX - minX,
      outerDepth: maxZ - minZ,
      angleRadians: angleSum / N,
    },
  };
}

export function formatMeters(meters: number): string {
  return `${meters.toFixed(2)} m`;
}

/**
 * Pure 2D segment intersection check used by unit tests to ensure the mitered
 * cross-section polygon remains simple and non-self-intersecting.
 */
export function segmentsIntersect(a1: PointXZ, a2: PointXZ, b1: PointXZ, b2: PointXZ): boolean {
  const ccw = (p1: PointXZ, p2: PointXZ, p3: PointXZ) =>
    (p3.z - p1.z) * (p2.x - p1.x) - (p2.z - p1.z) * (p3.x - p1.x);

  const d1 = ccw(a1, a2, b1);
  const d2 = ccw(a1, a2, b2);
  const d3 = ccw(b1, b2, a1);
  const d4 = ccw(b1, b2, a2);

  return ((d1 > 1e-9 && d2 < -1e-9) || (d1 < -1e-9 && d2 > 1e-9)) &&
    ((d3 > 1e-9 && d4 < -1e-9) || (d3 < -1e-9 && d4 > 1e-9));
}

/**
 * Returns horizontal UV coordinates [uLeft, uRight] in developed sheet space [0..1]
 * for panel j of N:
 * - front face: u0 = j/N -> u1 = (j+1)/N (reads left-to-right from +Z view)
 * - back face: uBack(j) = 1 - j/N, ordered from hinge j+1 to j so looking from -Z reads left-to-right
 */
export function computePanelUVSpan(
  panelIndex: number,
  side: 'front' | 'back',
  totalPanels: number = FOLD_CONSTANTS.panels,
): { uStart: number; uEnd: number } {
  const uFront0 = panelIndex / totalPanels;
  const uFront1 = (panelIndex + 1) / totalPanels;
  if (side === 'front') {
    return { uStart: uFront0, uEnd: uFront1 };
  }
  return {
    uStart: 1 - uFront1,
    uEnd: 1 - uFront0,
  };
}

]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/HeroStudioDock.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, SlidersHorizontal, Upload } from 'lucide-react';
import { renderTextileToCanvas } from './artwork';
import {
  evaluatePrintContrast,
  suggestContrastingPrintColor,
} from './color';
import {
  BUILTIN_PRINT_ORDER,
  COLOR_PRESETS,
  PRINT_SPECS,
  PrintId,
} from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import { NativeColorInput } from './NativeColorInput';
import { usesActivePrintColor } from './state';

export type AdvancedDrawerSection = 'all' | 'color' | 'printColor' | 'design' | 'view';

interface HeroStudioDockProps {
  onOpenAdvanced: (section: AdvancedDrawerSection) => void;
  shapeInputRef?: React.RefObject<HTMLInputElement | null>;
}

const CURATED_DOCK_SWATCH_IDS = [
  'flax',
  'clay',
  'sage',
  'oxblood',
  'porcelain',
  'charcoal',
] as const;

const CURATED_PRINT_SWATCH_IDS = [
  'oxblood',
  'porcelain',
  'clay',
  'flax',
  'charcoal',
] as const;

const MiniPrintThumb: React.FC<{
  printId: PrintId;
  baseHex: string;
  designHex: string;
  tintUpload?: boolean;
  uploadedBitmap?: ImageBitmap | null;
}> = ({ printId, baseHex, designHex, tintUpload, uploadedBitmap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderTextileToCanvas(
        canvas,
        {
          baseHex,
          designHex,
          print: printId,
          motifScale: 100,
          tintUpload,
        },
        uploadedBitmap ?? null,
      );
    });
    return () => cancelAnimationFrame(id);
  }, [printId, baseHex, designHex, tintUpload, uploadedBitmap]);

  return (
    <canvas
      ref={canvasRef}
      width={68}
      height={38}
      aria-hidden="true"
      className="w-[34px] h-[20px] rounded-[3px] border border-[var(--srf-oxblood)]/20 block shrink-0"
    />
  );
};

export const HeroStudioDock: React.FC<HeroStudioDockProps> = ({
  onOpenAdvanced,
  shapeInputRef,
}) => {
  const {
    mode,
    design,
    view,
    effectiveOpening,
    effectivePose,
    isCustomized,
    uploadedArt,
    setOpening,
    setBaseHex,
    setDesignHex,
    setPrint,
    resetDesign,
    resetShape,
    subscribeStoryFrame,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const localRangeRef = useRef<HTMLInputElement>(null);
  const rangeRef = shapeInputRef ?? localRangeRef;
  const percentRef = useRef<HTMLSpanElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [announcement, setAnnouncement] = useState('');

  // Keep dock shape slider and outer-span readout synchronized across manual edits,
  // scroll story, and coupled hinge choreography without 60Hz React re-renders.
  useEffect(() => {
    const applyDisplay = (pct: number, spanMeters: number) => {
      const rounded = Math.round(pct);
      const formattedSpan = formatMeters(spanMeters);
      if (rangeRef.current) {
        rangeRef.current.value = String(rounded);
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${rounded}%`;
      }
      if (spanRef.current) {
        spanRef.current.textContent = formattedSpan;
      }
    };

    const activeChain = getLiveChainFrame();
    if (activeChain) {
      const chainPose = deriveFoldChain(activeChain.panelOpenings);
      applyDisplay(activeChain.averageOpening, chainPose.metrics.outerSpan);
    } else {
      const pose = deriveFold(effectiveOpening);
      applyDisplay(effectiveOpening, pose.metrics.outerSpan);
    }

    const unsubChain = subscribeChainFrame((frame) => {
      if (frame) {
        const pose = deriveFoldChain(frame.panelOpenings);
        applyDisplay(frame.averageOpening, pose.metrics.outerSpan);
      } else {
        const pose = deriveFold(effectiveOpening);
        applyDisplay(effectiveOpening, pose.metrics.outerSpan);
      }
    });

    const unsubStory =
      mode === 'story'
        ? subscribeStoryFrame((nextOpening) => {
            if (!getLiveChainFrame()) {
              const pose = deriveFold(nextOpening);
              applyDisplay(nextOpening, pose.metrics.outerSpan);
            }
          })
        : undefined;

    return () => {
      unsubChain();
      unsubStory?.();
    };
  }, [
    effectiveOpening,
    mode,
    rangeRef,
    subscribeChainFrame,
    subscribeStoryFrame,
    getLiveChainFrame,
  ]);

  const curatedSwatches = CURATED_DOCK_SWATCH_IDS.map((id) =>
    COLOR_PRESETS.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const curatedPrintSwatches = CURATED_PRINT_SWATCH_IDS.map((id) =>
    COLOR_PRESETS.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const printColorActive = usesActivePrintColor(design);
  const contrast = evaluatePrintContrast(design.baseHex, design.designHex);

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);

  return (
    <div
      data-testid="hero-studio-dock"
      className="srf-hero-dock rounded-[10px] border border-[var(--srf-hairline-strong)] bg-[#FAF2EE]/95 shadow-[0_14px_38px_-16px_rgba(75,32,42,0.16)] px-3.5 py-3 sm:px-5 sm:py-3.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(150px,0.92fr)_minmax(195px,1.15fr)_minmax(240px,1.45fr)_minmax(205px,1.22fr)_minmax(160px,0.92fr)] gap-y-3 gap-x-3.5 items-center">
        {/* 1. Shape */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-0.5">
            <label
              htmlFor="srf-hero-shape-range"
              className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium"
            >
              Shape
            </label>
            <div className="srf-mono-caption text-[var(--srf-oxblood)]">
              <span ref={percentRef}>{roundedOpening}%</span>
              <span className="mx-1 text-[var(--srf-mauve)]" aria-hidden="true">
                ·
              </span>
              <span ref={spanRef} className="font-medium">
                {formattedSpan}
              </span>
            </div>
          </div>

          <input
            ref={rangeRef}
            id="srf-hero-shape-range"
            data-testid="hero-shape-range"
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={roundedOpening}
            onChange={(e) => setOpening(Number(e.target.value))}
            aria-valuetext={`${roundedOpening} percent open, outer span ${formattedSpan}`}
            className="srf-range !h-8"
          />

          <div className="flex items-center justify-between text-[11px] leading-4 text-[var(--srf-mauve)] -mt-1">
            <span>Gathered</span>
            <span>Open</span>
          </div>
        </div>

        {/* 2. Base color */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Base color
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('color')}
              className="srf-mono-caption text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              Hex / wheel
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Base felt color presets">
            {curatedSwatches.map((preset) => {
              const active = design.baseHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={`Base color ${preset.name} (${preset.hex})`}
                  aria-pressed={active}
                  title={`Base ${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setBaseHex(preset.hex);
                    setAnnouncement(`Base color set to ${preset.name}.`);
                  }}
                  className={`relative w-6 h-6 shrink-0 rounded-full border transition-transform hover:scale-105 flex items-center justify-center ${
                    active
                      ? 'srf-hero-active-outline'
                      : 'border-[var(--srf-oxblood)]/30 hover:border-[var(--room-ui-outline)]'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  <span className="sr-only">{preset.name}</span>
                </button>
              );
            })}

            <label
              title={`Custom base color · ${design.baseHex}`}
              className="relative w-6 h-6 shrink-0 rounded-full border border-dashed border-[var(--srf-oxblood)]/55 p-[2px] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
            >
              <span
                className="w-full h-full rounded-full block border border-[var(--srf-oxblood)]/20"
                style={{
                  background:
                    'conic-gradient(from 0deg, #9A463D, #C68D47, #A6B3A0, #4D657A, #4B202A, #9A463D)',
                }}
                aria-hidden="true"
              />
              <NativeColorInput
                testId="hero-base-color-picker"
                ariaLabel="Custom base hex color picker"
                value={design.baseHex}
                onHexChange={(hex) => {
                  setBaseHex(hex);
                  setAnnouncement(`Base color set to ${hex}.`);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* 3. Print */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Print
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('design')}
              className="srf-mono-caption inline-flex items-center gap-1 text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              <Upload className="w-3 h-3" aria-hidden="true" />
              <span>More / Upload</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Textile print presets">
            {BUILTIN_PRINT_ORDER.map((id) => {
              const spec = PRINT_SPECS[id];
              const active = design.print === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Print ${spec.name}`}
                  title={spec.name}
                  onClick={() => {
                    setPrint(id);
                    setAnnouncement(`Print changed to ${spec.name}.`);
                  }}
                  className={`inline-flex flex-col items-center gap-0.5 p-1 rounded-[6px] border transition-colors ${
                    active
                      ? 'srf-hero-active-outline bg-[var(--srf-porcelain)]'
                      : 'border-[var(--srf-hairline)] bg-[var(--srf-rose)]/70 hover:border-[var(--room-ui-outline)]/60'
                  }`}
                >
                  <MiniPrintThumb
                    printId={id}
                    baseHex={design.baseHex}
                    designHex={design.designHex}
                  />
                  <span className="text-[10px] leading-[12px] font-medium text-[var(--srf-oxblood)]">
                    {spec.name}
                  </span>
                </button>
              );
            })}

            {uploadedArt && (
              <button
                type="button"
                aria-pressed={design.print === 'upload'}
                aria-label={`Print Your image (${uploadedArt.filename})`}
                onClick={() => {
                  setPrint('upload');
                  setAnnouncement('Print changed to Your image.');
                }}
                className={`inline-flex flex-col items-center gap-0.5 p-1 rounded-[6px] border transition-colors ${
                  design.print === 'upload'
                    ? 'srf-hero-active-outline bg-[var(--srf-porcelain)]'
                    : 'border-[var(--srf-hairline)] bg-[var(--srf-rose)]/70 hover:border-[var(--room-ui-outline)]/60'
                }`}
              >
                {design.tintUpload ? (
                  <MiniPrintThumb
                    printId="upload"
                    baseHex={design.baseHex}
                    designHex={design.designHex}
                    tintUpload
                    uploadedBitmap={uploadedArt.bitmap}
                  />
                ) : (
                  <img
                    src={uploadedArt.previewUrl}
                    alt=""
                    className="w-[34px] h-[20px] object-cover rounded-[3px] border border-[var(--srf-oxblood)]/20 block"
                  />
                )}
                <span className="text-[10px] leading-[12px] font-medium text-[var(--srf-oxblood)]">
                  Yours
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 4. Print color */}
        <div
          className={`min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5 transition-opacity ${
            printColorActive ? '' : 'opacity-55'
          }`}
          data-testid="hero-print-color-section"
        >
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Print color
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('printColor')}
              className="srf-mono-caption text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              Hex / wheel
            </button>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Print pigment color presets"
          >
            <button
              type="button"
              data-testid="hero-design-color-btn"
              aria-label={`Active print color ${design.designHex}${printColorActive ? '' : ' (saved for patterns)'}`}
              title={`Active print color · ${design.designHex}`}
              onClick={() => onOpenAdvanced('printColor')}
              className="inline-flex items-center gap-1.5 px-1.5 py-0.5 h-6 rounded-full border border-[var(--srf-oxblood)]/35 bg-[var(--srf-porcelain)] text-[10px] font-[family-name:var(--font-mono)] text-[var(--srf-oxblood)] hover:border-[var(--srf-oxblood)] shrink-0"
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 block shrink-0"
                style={{ backgroundColor: design.designHex }}
                aria-hidden="true"
              />
              <span>{design.designHex}</span>
            </button>

            {curatedPrintSwatches.map((preset) => {
              const active = design.designHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={!printColorActive}
                  aria-label={`Print color ${preset.name} (${preset.hex})`}
                  aria-pressed={printColorActive && active}
                  title={`Print ${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setDesignHex(preset.hex);
                    setAnnouncement(`Print color set to ${preset.name}.`);
                  }}
                  className={`relative w-6 h-6 shrink-0 rounded-full border transition-transform hover:scale-105 flex items-center justify-center disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    printColorActive && active
                      ? 'srf-hero-active-outline'
                      : 'border-[var(--srf-oxblood)]/30 hover:border-[var(--room-ui-outline)]'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  <span className="sr-only">{preset.name}</span>
                </button>
              );
            })}

            <label
              title={`Custom print color · ${design.designHex}`}
              className={`relative w-6 h-6 shrink-0 rounded-full border border-dashed border-[var(--srf-oxblood)]/55 p-[2px] flex items-center justify-center ${
                printColorActive ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed'
              }`}
            >
              <span
                className="w-full h-full rounded-full block border border-[var(--srf-oxblood)]/20"
                style={{
                  background:
                    'conic-gradient(from 0deg, #9A463D, #C68D47, #A6B3A0, #4D657A, #4B202A, #9A463D)',
                }}
                aria-hidden="true"
              />
              <NativeColorInput
                testId="hero-print-color-picker"
                disabled={!printColorActive}
                ariaLabel="Custom print hex color picker"
                value={design.designHex}
                onHexChange={(hex) => {
                  setDesignHex(hex);
                  setAnnouncement(`Print color set to ${hex}.`);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* 5. Advanced Studio trigger */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5 flex flex-col justify-center gap-1.5">
          {isCustomized && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  resetDesign();
                  resetShape();
                  setAnnouncement('Divider design and shape reset to defaults.');
                }}
                aria-label="Reset design and shape defaults"
                className="srf-mono-caption inline-flex items-center gap-1 text-[var(--srf-clay)] hover:text-[var(--srf-oxblood)] underline underline-offset-4 min-h-[24px]"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          )}

          <button
            type="button"
            data-testid="hero-more-options-btn"
            onClick={() => onOpenAdvanced('all')}
            className="inline-flex items-center justify-between gap-1.5 w-full px-2.5 py-1.5 min-h-[36px] rounded-[6px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)]/75 hover:border-[var(--srf-oxblood)] text-xs font-medium text-[var(--srf-oxblood)] transition-colors"
          >
            <span>More options</span>
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {printColorActive && contrast.isLowContrast && (
        <div
          role="status"
          data-testid="hero-contrast-warning"
          className="mt-2.5 pt-2 border-t border-[var(--srf-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--srf-oxblood)]"
        >
          <span>Low print contrast — try a lighter or darker color.</span>
          <button
            type="button"
            data-testid="hero-suggest-contrast-btn"
            onClick={() => {
              const suggested = suggestContrastingPrintColor(design.baseHex, design.designHex);
              setDesignHex(suggested);
              setAnnouncement(`Suggested contrasting print color ${suggested}.`);
            }}
            className="px-2.5 py-1 rounded-[4px] border border-[var(--srf-oxblood)] bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] font-medium hover:bg-[var(--srf-clay)] hover:border-[var(--srf-clay)] transition-colors shrink-0"
          >
            Suggest contrast
          </button>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/materials.ts">
<![CDATA[import * as THREE from 'three';
import { renderTextileToCanvas } from './artwork';
import { mixHex } from './color';
import { PALETTE } from './config';
import type { DesignState } from './state';

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/**
 * Generates a tileable grayscale wool-felt / washi bump map (linear data texture)
 * so tactile micro-relief catches raking studio light across every fold.
 */
export function createFeltBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  bCtx.fillStyle = 'rgb(128, 128, 128)';
  bCtx.fillRect(0, 0, size, size);

  const rand = seededRand(160288);
  for (let i = 0; i < 4800; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 1.4 + rand() * 3.8;
    const angle = rand() * Math.PI * 2;
    const delta = Math.round((rand() - 0.5) * 22);
    const bumpLum = 128 + delta * 2;

    bCtx.strokeStyle = `rgba(${bumpLum}, ${bumpLum}, ${bumpLum}, 0.58)`;
    bCtx.lineWidth = 0.85;
    bCtx.beginPath();
    bCtx.moveTo(x, y);
    bCtx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    bCtx.stroke();
  }

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(16, 4);
  bumpMap.generateMipmaps = true;
  bumpMap.anisotropy = Math.min(8, maxAnisotropy);
  bumpMap.needsUpdate = true;
  return bumpMap;
}

export function createSoftShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.06,
    size * 0.5,
    size * 0.5,
    size * 0.49,
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.36)');
  grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.14)');
  grad.addColorStop(0.78, 'rgba(255, 255, 255, 0.04)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createStudioFloorGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.04,
    size * 0.5,
    size * 0.5,
    size * 0.48,
  );
  grad.addColorStop(0, 'rgba(255, 252, 248, 0.45)');
  grad.addColorStop(0.58, 'rgba(255, 252, 248, 0.16)');
  grad.addColorStop(1, 'rgba(243, 232, 228, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export interface SceneMaterials {
  feltFace: THREE.MeshPhysicalMaterial;
  feltEdge: THREE.MeshPhysicalMaterial;
  edgeCrease: THREE.LineBasicMaterial;
  hingeMetal: THREE.MeshStandardMaterial;
  foot: THREE.MeshStandardMaterial;
  glide: THREE.MeshStandardMaterial;
  floor: THREE.ShadowMaterial;
  floorGlow: THREE.MeshBasicMaterial;
  contactShadow: THREE.MeshBasicMaterial;
  updateDesign: (
    design: DesignState,
    uploadedBitmap: ImageBitmap | null,
    animate?: boolean,
  ) => void;
  stepTransition: (dt: number) => boolean;
  setHoverHighlight: (hovered: boolean, dt: number) => boolean;
  dispose: () => void;
}

export function createSceneMaterials(
  initialDesign: DesignState,
  initialUpload: ImageBitmap | null,
  maxAnisotropy: number,
  isCompactTexture: boolean,
): SceneMaterials {
  const bumpMap = createFeltBumpTexture(maxAnisotropy);
  const shadowTex = createSoftShadowTexture();
  const floorGlowTex = createStudioFloorGlowTexture();

  // Fixed aspect ratio ~ 2.88 : 1.60 (1536x853 desktop, 1024x569 mobile)
  const texW = isCompactTexture ? 1024 : 1536;
  const texH = isCompactTexture ? 569 : 853;

  // Ping-pong persistent CanvasTextures allow smooth GPU shader crossfading with zero per-frame 2D uploads.
  const canvasA = document.createElement('canvas');
  canvasA.width = texW;
  canvasA.height = texH;

  const canvasB = document.createElement('canvas');
  canvasB.width = texW;
  canvasB.height = texH;

  renderTextileToCanvas(canvasA, initialDesign, initialUpload);
  renderTextileToCanvas(canvasB, initialDesign, initialUpload);

  const createConfiguredMap = (sourceCanvas: HTMLCanvasElement): THREE.CanvasTexture => {
    const map = new THREE.CanvasTexture(sourceCanvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = THREE.ClampToEdgeWrapping;
    map.wrapT = THREE.ClampToEdgeWrapping;
    map.generateMipmaps = true;
    map.anisotropy = Math.min(8, maxAnisotropy);
    map.needsUpdate = true;
    return map;
  };

  const mapA = createConfiguredMap(canvasA);
  const mapB = createConfiguredMap(canvasB);
  let activeSlot: 0 | 1 = 0;

  const getSlotCanvas = (slot: 0 | 1) => (slot === 0 ? canvasA : canvasB);
  const getSlotMap = (slot: 0 | 1) => (slot === 0 ? mapA : mapB);

  const crossfadeUniforms = {
    uPrevMap: { value: mapB as THREE.Texture },
    uCrossfade: { value: 1 },
  };

  // Tactile wool felt / washi material with restrained low sheen (never plastic/emissive)
  const feltFace = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    map: mapA,
    bumpMap,
    bumpScale: 0.0028,
    roughness: 0.92,
    metalness: 0,
    sheen: 0.16,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#FFF8F3'),
    envMapIntensity: 0.14,
  });

  feltFace.customProgramCacheKey = () => 'serraform-felt-crossfade-v1';
  feltFace.onBeforeCompile = (shader) => {
    shader.uniforms.uPrevMap = crossfadeUniforms.uPrevMap;
    shader.uniforms.uCrossfade = crossfadeUniforms.uCrossfade;
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <map_pars_fragment>',
        `#include <map_pars_fragment>
        uniform sampler2D uPrevMap;
        uniform float uCrossfade;`,
      )
      .replace(
        '#include <map_fragment>',
        `#ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          vec4 prevSampledDiffuseColor = texture2D( uPrevMap, vMapUv );
          #ifdef DECODE_VIDEO_TEXTURE
            sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
            prevSampledDiffuseColor = sRGBTransferEOTF( prevSampledDiffuseColor );
          #endif
          diffuseColor *= mix( prevSampledDiffuseColor, sampledDiffuseColor, uCrossfade );
        #endif`,
      );
  };

  // Narrow top/bottom/end felt edges stay clean base felt color
  const feltEdge = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(initialDesign.baseHex),
    bumpMap,
    bumpScale: 0.0028,
    roughness: 0.92,
    metalness: 0,
    sheen: 0.14,
    sheenRoughness: 0.82,
    sheenColor: new THREE.Color('#FFF8F3'),
    envMapIntensity: 0.14,
  });

  const edgeCrease = new THREE.LineBasicMaterial({
    color: new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34)),
    transparent: true,
    opacity: 0.26,
  });

  // Brushed oxblood/burnished hardware knuckles along the 15 interior folds
  const hingeMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5A2732'),
    roughness: 0.34,
    metalness: 0.74,
    envMapIntensity: 1.0,
  });

  const foot = new THREE.MeshStandardMaterial({
    color: new THREE.Color(PALETTE.oxblood),
    roughness: 0.38,
    metalness: 0.68,
    envMapIntensity: 0.92,
  });

  const glide = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2E1218'),
    roughness: 0.85,
    metalness: 0.05,
  });

  const floor = new THREE.ShadowMaterial({
    color: new THREE.Color(PALETTE.oxblood),
    opacity: 0.12,
  });

  const floorGlow = new THREE.MeshBasicMaterial({
    map: floorGlowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });

  const contactShadow = new THREE.MeshBasicMaterial({
    map: shadowTex,
    color: new THREE.Color(PALETTE.oxblood),
    transparent: true,
    depthWrite: false,
    opacity: 0.88,
  });

  let transitionProgress = 1;
  const TRANSITION_DUR = 0.24;
  const targetEdgeColor = new THREE.Color(initialDesign.baseHex);
  const startEdgeColor = new THREE.Color(initialDesign.baseHex);
  const targetCreaseColor = new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34));
  const startCreaseColor = new THREE.Color(mixHex(initialDesign.baseHex, '#201014', 0.34));

  return {
    feltFace,
    feltEdge,
    edgeCrease,
    hingeMetal,
    foot,
    glide,
    floor,
    floorGlow,
    contactShadow,

    updateDesign(design: DesignState, uploadedBitmap: ImageBitmap | null, animate = false) {
      if (!animate) {
        const currCanvas = getSlotCanvas(activeSlot);
        const currMap = getSlotMap(activeSlot);
        renderTextileToCanvas(currCanvas, design, uploadedBitmap);
        currMap.needsUpdate = true;
        feltFace.map = currMap;
        crossfadeUniforms.uPrevMap.value = currMap;
        crossfadeUniforms.uCrossfade.value = 1;
        feltEdge.color.set(design.baseHex);
        edgeCrease.color.set(mixHex(design.baseHex, '#201014', 0.34));
        transitionProgress = 1;
        return;
      }

      const prevSlot: 0 | 1 = activeSlot === 0 ? 1 : 0;

      // If interrupting an in-flight crossfade (e.g. live wheel drag), freeze the blended frame into prevSlot once.
      if (transitionProgress < 1) {
        const currCanvas = getSlotCanvas(activeSlot);
        const prevCanvas = getSlotCanvas(prevSlot);
        const prevCtx = prevCanvas.getContext('2d');
        const prevMap = getSlotMap(prevSlot);
        if (prevCtx) {
          const u = 1 - Math.pow(1 - transitionProgress, 3);
          prevCtx.save();
          prevCtx.globalAlpha = u;
          prevCtx.drawImage(currCanvas, 0, 0);
          prevCtx.restore();
          prevMap.needsUpdate = true;
        }
        renderTextileToCanvas(currCanvas, design, uploadedBitmap);
        getSlotMap(activeSlot).needsUpdate = true;
        feltFace.map = getSlotMap(activeSlot);
        crossfadeUniforms.uPrevMap.value = prevMap;
      } else {
        const oldSlot = activeSlot;
        activeSlot = prevSlot;
        const nextCanvas = getSlotCanvas(activeSlot);
        const nextMap = getSlotMap(activeSlot);
        renderTextileToCanvas(nextCanvas, design, uploadedBitmap);
        nextMap.needsUpdate = true;
        feltFace.map = nextMap;
        crossfadeUniforms.uPrevMap.value = getSlotMap(oldSlot);
      }

      crossfadeUniforms.uCrossfade.value = 0;
      startEdgeColor.copy(feltEdge.color);
      targetEdgeColor.set(design.baseHex);
      startCreaseColor.copy(edgeCrease.color);
      targetCreaseColor.set(mixHex(design.baseHex, '#201014', 0.34));
      transitionProgress = 0;
    },

    stepTransition(dt: number): boolean {
      if (transitionProgress >= 1) return false;
      transitionProgress = Math.min(1, transitionProgress + dt / TRANSITION_DUR);

      const u = transitionProgress >= 1 ? 1 : 1 - Math.pow(1 - transitionProgress, 3);
      crossfadeUniforms.uCrossfade.value = u;

      if (transitionProgress >= 1) {
        feltEdge.color.copy(targetEdgeColor);
        edgeCrease.color.copy(targetCreaseColor);
        return false;
      }

      feltEdge.color.copy(startEdgeColor).lerp(targetEdgeColor, u);
      edgeCrease.color.copy(startCreaseColor).lerp(targetCreaseColor, u);
      return true;
    },

    setHoverHighlight(hovered: boolean, dt: number): boolean {
      const targetSheen = hovered ? 0.28 : 0.16;
      const diff = targetSheen - feltFace.sheen;
      if (Math.abs(diff) < 0.004) {
        feltFace.sheen = targetSheen;
        return false;
      }
      const k = 1 - Math.exp(-8 * dt);
      feltFace.sheen += diff * k;
      return true;
    },

    dispose: () => {
      mapA.dispose();
      mapB.dispose();
      bumpMap.dispose();
      shadowTex.dispose();
      floorGlowTex.dispose();
      feltFace.dispose();
      feltEdge.dispose();
      edgeCrease.dispose();
      hingeMetal.dispose();
      foot.dispose();
      glide.dispose();
      floor.dispose();
      floorGlow.dispose();
      contactShadow.dispose();
    },
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/NativeColorInput.tsx">
<![CDATA['use client';

import { useEffect, useRef, type ChangeEvent } from 'react';
import { normalizeHex } from './color';

export interface NativeColorInputProps {
  id?: string;
  testId?: string;
  value: string;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
  onHexChange: (hex: string) => void;
}

/**
 * Uncontrolled wrapper around `<input type="color">` to prevent React 19 / Chromium
 * feedback loops caused by uppercase `#RRGGBB` props vs. lowercase `#rrggbb` DOM values
 * and synchronous native picker drag events.
 */
export function NativeColorInput({
  id,
  testId,
  value,
  disabled = false,
  ariaLabel,
  className,
  onHexChange,
}: NativeColorInputProps) {
  const normalizedUpper = normalizeHex(value) ?? '#000000';
  const normalizedLower = normalizedUpper.toLowerCase();

  const inputRef = useRef<HTMLInputElement>(null);
  const lastEmittedRef = useRef<string>(normalizedUpper);
  const pendingHexRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const onHexChangeRef = useRef(onHexChange);
  const propLowerRef = useRef(normalizedLower);
  const propUpperRef = useRef(normalizedUpper);

  onHexChangeRef.current = onHexChange;
  propLowerRef.current = normalizedLower;
  propUpperRef.current = normalizedUpper;

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    // Never write `.value` while the native picker owns focus; Chromium can re-fire `input`.
    if (document.activeElement === el) return;
    if (el.value.toLowerCase() !== normalizedLower) {
      el.value = normalizedLower;
    }
    if (pendingHexRef.current === null) {
      lastEmittedRef.current = normalizedUpper;
    }
  }, [normalizedLower, normalizedUpper]);

  useEffect(() => {
    if (disabled && rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pendingHexRef.current = null;
    }
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = normalizeHex(e.target.value);
    if (!next || next === lastEmittedRef.current) return;
    lastEmittedRef.current = next;
    pendingHexRef.current = next;

    if (typeof requestAnimationFrame === 'function') {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const pending = pendingHexRef.current;
          pendingHexRef.current = null;
          if (pending) {
            onHexChangeRef.current(pending);
          }
        });
      }
    } else {
      pendingHexRef.current = null;
      onHexChangeRef.current(next);
    }
  };

  const handleBlur = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      const pending = pendingHexRef.current;
      pendingHexRef.current = null;
      if (pending && !disabled) {
        onHexChangeRef.current(pending);
        return;
      }
    }

    const el = inputRef.current;
    if (el && el.value.toLowerCase() !== propLowerRef.current) {
      el.value = propLowerRef.current;
      lastEmittedRef.current = propUpperRef.current;
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      data-testid={testId}
      type="color"
      defaultValue={normalizedLower}
      disabled={disabled}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/PrintGallery.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { Check, ImagePlus, RefreshCw, Trash2 } from 'lucide-react';
import { renderTextileToCanvas } from './artwork';
import { BUILTIN_PRINT_ORDER, PRINT_SPECS, PrintId } from './config';
import { useFold } from './FoldProvider';

const SwatchPreviewCanvas: React.FC<{
  printId: PrintId;
  baseHex: string;
  designHex: string;
  motifScale: number;
  tintUpload?: boolean;
  uploadedBitmap?: ImageBitmap | null;
}> = ({ printId, baseHex, designHex, motifScale, tintUpload, uploadedBitmap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderTextileToCanvas(
        canvas,
        {
          baseHex,
          designHex,
          print: printId,
          motifScale,
          tintUpload,
        },
        uploadedBitmap ?? null,
      );
    });
    return () => cancelAnimationFrame(id);
  }, [printId, baseHex, designHex, motifScale, tintUpload, uploadedBitmap]);

  return (
    <canvas
      ref={canvasRef}
      width={192}
      height={108}
      aria-hidden="true"
      className="w-full h-14 object-cover rounded-[4px] border border-[var(--srf-oxblood)]/15 block"
    />
  );
};

export const PrintGallery: React.FC<{
  idPrefix?: string;
  onAnnounce?: (msg: string) => void;
}> = ({ idPrefix = 'srf', onAnnounce }) => {
  const {
    design,
    uploadedArt,
    uploadError,
    isUploading,
    setPrint,
    setMotifScale,
    setTintUpload,
    uploadFile,
    clearUpload,
    clearUploadError,
  } = useFold();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const printSpec = PRINT_SPECS[design.print];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value so re-choosing the same file works cleanly
    e.target.value = '';
    if (!file) return;
    await uploadFile(file);
    onAnnounce?.(`Processed image selection.`);
  };

  const triggerFilePicker = () => {
    clearUploadError();
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Textile print library">
        {BUILTIN_PRINT_ORDER.map((id) => {
          const spec = PRINT_SPECS[id];
          const active = design.print === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setPrint(id);
                onAnnounce?.(`Print set to ${spec.name}.`);
              }}
              className={`group flex flex-col gap-2 p-2 rounded-[8px] border text-left transition-colors ${
                active
                  ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
                  : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)] bg-[var(--srf-rose)]'
              }`}
            >
              <SwatchPreviewCanvas
                printId={id}
                baseHex={design.baseHex}
                designHex={design.designHex}
                motifScale={id === design.print ? design.motifScale : 100}
              />
              <div className="flex items-center justify-between gap-1 px-0.5">
                <span className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
                  {spec.name}
                </span>
                {active && (
                  <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
                )}
              </div>
            </button>
          );
        })}

        {/* Your image tile */}
        <button
          type="button"
          aria-pressed={design.print === 'upload' && Boolean(uploadedArt)}
          onClick={() => {
            if (uploadedArt) {
              setPrint('upload');
              onAnnounce?.(`Print set to Your image.`);
            } else {
              triggerFilePicker();
            }
          }}
          className={`flex flex-col gap-2 p-2 rounded-[8px] border text-left transition-colors ${
            design.print === 'upload' && uploadedArt
              ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
              : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)] bg-[var(--srf-rose)]'
          }`}
        >
          {uploadedArt ? (
            design.tintUpload ? (
              <SwatchPreviewCanvas
                printId="upload"
                baseHex={design.baseHex}
                designHex={design.designHex}
                motifScale={design.motifScale}
                tintUpload
                uploadedBitmap={uploadedArt.bitmap}
              />
            ) : (
              <img
                src={uploadedArt.previewUrl}
                alt=""
                className="w-full h-14 object-cover rounded-[4px] border border-[var(--srf-oxblood)]/15 block"
              />
            )
          ) : (
            <div className="w-full h-14 rounded-[4px] border border-dashed border-[var(--srf-hairline-strong)] bg-[var(--srf-surface-soft)] flex flex-col items-center justify-center gap-1 text-[var(--srf-mauve)]">
              <ImagePlus className="w-4 h-4 text-[var(--srf-oxblood)]" aria-hidden="true" />
              <span className="srf-mono-caption text-[11px]">
                {isUploading ? 'Opening…' : 'PNG / JPEG / WebP'}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-1 px-0.5">
            <span className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
              Your image
            </span>
            {design.print === 'upload' && uploadedArt && (
              <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
            )}
          </div>
        </button>
      </div>

      {/* Hidden native file input strictly filtered to PNG/JPEG/WebP */}
      <input
        ref={fileInputRef}
        type="file"
        data-testid={`${idPrefix}-upload-input`}
        accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload custom artwork image (PNG, JPEG, or WebP)"
      />

      {/* Uploaded artwork active session details + opt-in tint + Replace/Remove controls */}
      {uploadedArt && (
        <div className="p-3.5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-medium text-[var(--srf-oxblood)] truncate">
                {uploadedArt.filename}
              </div>
              <div className="srf-mono-caption text-[var(--srf-mauve)]">
                Your image stays in this browser session.
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2.5 pt-0.5 cursor-pointer select-none">
            <input
              id={`${idPrefix}-tint-upload-toggle`}
              data-testid={`${idPrefix}-tint-upload-toggle`}
              type="checkbox"
              checked={Boolean(design.tintUpload)}
              onChange={(e) => {
                setTintUpload(e.target.checked);
                onAnnounce?.(
                  e.target.checked
                    ? 'Applied Print Color tint to uploaded artwork.'
                    : 'Restored original colors on uploaded artwork.',
                );
              }}
              className="mt-0.5 h-4 w-4 accent-[var(--srf-oxblood)] rounded shrink-0"
            />
            <span className="text-xs text-[var(--srf-oxblood)] leading-snug">
              <span className="font-medium block">Tint uploaded image with Print color</span>
              <span className="srf-mono-caption text-[var(--srf-mauve)] block">
                Off by default — preserves original colors unless enabled.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={triggerFilePicker}
              className="srf-btn-secondary !min-h-[38px] !py-1.5 !px-3 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replace image</span>
            </button>
            <button
              type="button"
              onClick={() => {
                clearUpload();
                onAnnounce?.('Removed uploaded image and returned to Solid.');
              }}
              className="srf-btn-secondary !min-h-[38px] !py-1.5 !px-3 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Remove image</span>
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p
          role="alert"
          data-testid={`${idPrefix}-upload-error`}
          className="text-xs font-medium text-[var(--srf-clay)] bg-[var(--srf-porcelain)] border border-[var(--srf-clay)]/35 rounded-[6px] px-3 py-2"
        >
          {uploadError}
        </p>
      )}

      {/* Scale range: Motif size or Artwork zoom (50–200%, step 5%) */}
      <div className="pt-1">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <label
            htmlFor={`${idPrefix}-scale-range`}
            className="text-sm font-medium text-[var(--srf-oxblood)]"
          >
            {printSpec.scaleLabel}
          </label>
          <span className="srf-mono-dim text-[var(--srf-oxblood)]">
            {design.motifScale}%
          </span>
        </div>

        <input
          id={`${idPrefix}-scale-range`}
          type="range"
          min={50}
          max={200}
          step={5}
          disabled={!printSpec.usesScale}
          value={design.motifScale}
          onChange={(e) => setMotifScale(Number(e.target.value))}
          className={`srf-range !h-9 ${!printSpec.usesScale ? 'opacity-45 cursor-not-allowed' : ''}`}
        />

        <p className="srf-mono-caption text-[var(--srf-mauve)]">
          {!printSpec.usesScale
            ? 'Motif size is unavailable on Solid felt.'
            : design.print === 'landscape' || design.print === 'upload'
              ? '100% fits across all 16 panels; higher zooms in evenly.'
              : 'Adjust pattern repeat scale across the continuous sheet.'}
        </p>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/projection.ts">
<![CDATA[import { FOLD_CONSTANTS, VIEW_PRESETS, ViewId, ViewState } from './config';
import { computePanelUVSpan, deriveFold, FoldPose } from './geometry';
import { viewDirectionFromAngles } from './state';

export interface ProjectedPoint {
  x: number;
  y: number;
  zCam: number;
}

export interface ProjectedFace {
  points: { x: number; y: number }[];
  uvs?: { u: number; v: number }[];
  depth: number;
  shade: number; // 0..1 relative luminance factor for front/back/top/cap shading
  kind: 'felt' | 'top' | 'cap' | 'foot';
}

export interface ProjectedFoldResult {
  faces: ProjectedFace[];
  spanBracket: {
    visible: boolean;
    leftX: number;
    rightX: number;
    y: number;
  };
  shadowEllipse: {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
  };
}

export interface StageSlotRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FullBleedViewOffset {
  fullWidth: number;
  fullHeight: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

export interface ShadowCameraFrustum {
  left: number;
  right: number;
  bottom: number;
  top: number;
  near: number;
  far: number;
  maxProjectedNdc: number;
}

export interface Vec3Point {
  x: number;
  y: number;
  z: number;
}

type Vec3 = Vec3Point;

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export interface CameraBasis {
  position: Vec3;
  target: Vec3;
  right: Vec3;
  up: Vec3;
  forward: Vec3;
  tanHalfFovY: number;
  aspect: number;
}

const TARGET: Vec3 = { x: 0, y: FOLD_CONSTANTS.height * 0.5, z: 0 };

function resolveViewState(view: ViewState | ViewId): ViewState {
  if (typeof view === 'string') {
    const preset = VIEW_PRESETS[view];
    return { yawDeg: preset.yawDeg, elevationDeg: preset.elevationDeg };
  }
  return view;
}

/**
 * Computes a constant camera distance for a given stage aspect ratio that encloses the
 * maximum-open (100%) and maximum-closed (0% depth + steel feet) divider across ALL 360° yaw
 * angles and elevation bounds [5°..30°] so rotating or opening never triggers zoom jumps or clipping.
 */
export function computeCameraDistance(
  _view: ViewState | ViewId,
  aspect: number,
  fitPadding: number = FOLD_CONSTANTS.cameraFitPadding,
): number {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);
  const tanHalfFovX = tanHalfFovY * safeAspect;

  const openPose = deriveFold(100);
  const closedPose = deriveFold(0);

  const halfX = Math.max(openPose.metrics.outerSpan, closedPose.metrics.outerSpan) * 0.5;
  const halfZ = Math.max(
    openPose.metrics.outerDepth * 0.5,
    closedPose.metrics.outerDepth * 0.5,
    FOLD_CONSTANTS.footDepth * 0.5 + 0.06,
  );
  const minY = -FOLD_CONSTANTS.footHeight;
  const maxY = FOLD_CONSTANTS.height;
  const maxHalfY = Math.max(Math.abs(maxY - TARGET.y), Math.abs(minY - TARGET.y));

  // Sample worst-case yaw & elevation bounds over full 360° rotation so distance stays invariant during orbit
  const corners: Vec3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [minY, maxY]) {
      for (const sz of [-1, 1]) {
        corners.push({ x: sx * halfX, y: sy, z: sz * halfZ });
      }
    }
  }

  let requiredDist = 2.55;
  const padding = fitPadding;

  for (let yaw = 0; yaw < 360; yaw += 30) {
    for (const elev of [FOLD_CONSTANTS.minElevationDeg, 18, FOLD_CONSTANTS.maxElevationDeg]) {
      const dirArr = viewDirectionFromAngles({ yawDeg: yaw, elevationDeg: elev });
      const dir = normalize({ x: dirArr[0], y: dirArr[1], z: dirArr[2] });
      const worldUp: Vec3 = { x: 0, y: 1, z: 0 };
      const right = normalize(cross(worldUp, dir));
      const camUp = cross(dir, right);

      for (const corner of corners) {
        const rel = sub(corner, TARGET);
        const rx = Math.abs(dot(rel, right));
        const ry = Math.abs(dot(rel, camUp));
        const rz = dot(rel, dir);

        const distForX = (rx * padding) / tanHalfFovX + rz;
        const distForY = (ry * padding) / tanHalfFovY + rz;
        requiredDist = Math.max(requiredDist, distForX, distForY);
      }
    }
  }

  // Ensure vertical presence meets ~72-78% target when container aspect allows it
  const minVerticalDist = (maxHalfY * padding) / tanHalfFovY;
  return Math.max(requiredDist, minVerticalDist);
}

/**
 * Hero atelier camera framing: keeps the divider dramatically tall (~74-82% of stage height)
 * across gathered..default openings while smoothly easing distance outward only at wide (>65%)
 * openings so full 360° orbit and 100% extension never clip horizontally.
 */
export function computeAtelierCameraDistance(openingInput: number, aspect: number): number {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);
  const tanHalfFovX = tanHalfFovY * safeAspect;

  const pose = deriveFold(Math.max(50, openingInput));
  const halfX = pose.metrics.outerSpan * 0.5;
  const halfZ = Math.max(pose.metrics.outerDepth * 0.5, FOLD_CONSTANTS.footDepth * 0.5 + 0.06);

  // Target ~72-86% apparent projected height across Front..Three-quarter elevations without clipping slot bottom
  const verticalHeight = FOLD_CONSTANTS.height + FOLD_CONSTANTS.footHeight;
  const targetVerticalDist = (verticalHeight * 0.5) / (0.72 * tanHalfFovY);

  // Ensure horizontal width fits cleanly across 360° yaw with generous margin
  const maxProjRadius = Math.hypot(halfX, halfZ);
  const horizontalDist = (maxProjRadius * 1.06) / tanHalfFovX + halfZ * 0.35;

  return Math.max(targetVerticalDist, horizontalDist);
}

export function buildCameraBasis(
  view: ViewState | ViewId,
  aspect: number,
  atelierOpening?: number,
): CameraBasis {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.1 ? aspect : 1.4;
  const fovRad = (FOLD_CONSTANTS.cameraFovDeg * Math.PI) / 180;
  const tanHalfFovY = Math.tan(fovRad * 0.5);

  const resolved = resolveViewState(view);
  const dirArr = viewDirectionFromAngles(resolved);
  const forwardToCamera = normalize({ x: dirArr[0], y: dirArr[1], z: dirArr[2] });
  const dist =
    atelierOpening !== undefined
      ? computeAtelierCameraDistance(atelierOpening, safeAspect)
      : computeCameraDistance(resolved, safeAspect);
  const position: Vec3 = {
    x: TARGET.x + forwardToCamera.x * dist,
    y: TARGET.y + forwardToCamera.y * dist,
    z: TARGET.z + forwardToCamera.z * dist,
  };

  const forward = normalize(sub(TARGET, position));
  const right = normalize(cross(forward, { x: 0, y: 1, z: 0 }));
  const up = cross(right, forward);

  return {
    position,
    target: TARGET,
    right,
    up,
    forward,
    tanHalfFovY,
    aspect: safeAspect,
  };
}

/**
 * Computes Three.js `PerspectiveCamera.setViewOffset` parameters so a full-bleed
 * `(fullWidth, fullHeight)` canvas renders an unclipped scene while framing the
 * divider centered inside `slot` with exact pixel scale matching `slot.height`.
 */
export function computeFullBleedViewOffset(
  fullWidth: number,
  fullHeight: number,
  slot: StageSlotRect,
): FullBleedViewOffset {
  const safeFullW = Math.max(1, fullWidth);
  const safeFullH = Math.max(1, fullHeight);
  const safeSlotW = Math.max(1, slot.width);
  const safeSlotH = Math.max(1, slot.height);
  const scale = safeFullH / safeSlotH;
  const slotCenterX = slot.x + safeSlotW * 0.5;
  const slotCenterY = slot.y + safeSlotH * 0.5;

  return {
    fullWidth: safeFullW,
    fullHeight: safeFullH,
    offsetX: safeFullW * 0.5 - slotCenterX * scale,
    offsetY: safeFullH * 0.5 - slotCenterY * scale,
    width: safeFullW * scale,
    height: safeFullH * scale,
  };
}

/**
 * Computes light-space orthographic bounds enclosing the divider's full range
 * (0%..100% openings) AND every corner's projected floor shadow along the key
 * directional light ray so shadows never clip inside the shadow map frustum.
 */
export function computeShadowCameraFrustum(
  lightPos: Vec3Point,
  targetPos: Vec3Point,
  margin = 0.65,
): ShadowCameraFrustum {
  const openPose = deriveFold(100);
  const closedPose = deriveFold(0);

  const halfX = Math.max(openPose.metrics.outerSpan, closedPose.metrics.outerSpan) * 0.5 + 0.04;
  const halfZ =
    Math.max(
      openPose.metrics.outerDepth * 0.5,
      closedPose.metrics.outerDepth * 0.5,
      FOLD_CONSTANTS.footDepth * 0.5,
    ) + 0.04;
  const floorY = -FOLD_CONSTANTS.footHeight;
  const maxY = FOLD_CONSTANTS.height + 0.02;

  const rayDir = normalize(sub(targetPos, lightPos));
  const downFactor = Math.max(0.05, -rayDir.y);

  // Match Three.js Matrix4.lookAt(lightPos, targetPos, +Y) camera basis
  const zAxis = normalize(sub(lightPos, targetPos));
  const xAxis = normalize(cross({ x: 0, y: 1, z: 0 }, zAxis));
  const yAxis = cross(zAxis, xAxis);

  const points: Vec3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [floorY, maxY]) {
      for (const sz of [-1, 1]) {
        const px = sx * halfX;
        const py = sy;
        const pz = sz * halfZ;
        points.push({ x: px, y: py, z: pz });

        // Floor shadow landing point for this divider bounding corner
        const t = Math.max(0, (py - floorY) / downFactor);
        points.push({
          x: px + rayDir.x * t,
          y: floorY,
          z: pz + rayDir.z * t,
        });
      }
    }
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxYCam = -Infinity;
  let minDist = Infinity;
  let maxDist = -Infinity;

  for (const p of points) {
    const rel = sub(p, lightPos);
    const lx = dot(rel, xAxis);
    const ly = dot(rel, yAxis);
    const dist = -dot(rel, zAxis); // positive distance forward from lightPos
    minX = Math.min(minX, lx);
    maxX = Math.max(maxX, lx);
    minY = Math.min(minY, ly);
    maxYCam = Math.max(maxYCam, ly);
    minDist = Math.min(minDist, dist);
    maxDist = Math.max(maxDist, dist);
  }

  const left = minX - margin;
  const right = maxX + margin;
  const bottom = minY - margin;
  const top = maxYCam + margin;
  const near = Math.max(0.5, minDist - 0.8);
  const far = maxDist + 1.4;

  const halfW = (right - left) * 0.5;
  const halfH = (top - bottom) * 0.5;
  const centerX = (left + right) * 0.5;
  const centerY = (bottom + top) * 0.5;
  const halfD = (far - near) * 0.5;
  const centerD = (near + far) * 0.5;

  let maxProjectedNdc = 0;
  for (const p of points) {
    const rel = sub(p, lightPos);
    const lx = dot(rel, xAxis);
    const ly = dot(rel, yAxis);
    const dist = -dot(rel, zAxis);
    const nx = Math.abs((lx - centerX) / halfW);
    const ny = Math.abs((ly - centerY) / halfH);
    const nz = Math.abs((dist - centerD) / halfD);
    maxProjectedNdc = Math.max(maxProjectedNdc, nx, ny, nz);
  }

  return {
    left,
    right,
    bottom,
    top,
    near,
    far,
    maxProjectedNdc,
  };
}

function projectPoint(
  p: Vec3,
  cam: CameraBasis,
  viewportW: number,
  viewportH: number,
  slotRect?: StageSlotRect,
): ProjectedPoint {
  const rel = sub(p, cam.position);
  const xCam = dot(rel, cam.right);
  const yCam = dot(rel, cam.up);
  const zCam = dot(rel, cam.forward);
  const safeZ = Math.max(0.05, zCam);

  const ndcY = yCam / (safeZ * cam.tanHalfFovY);
  const ndcX = xCam / (safeZ * cam.tanHalfFovY * cam.aspect);

  if (slotRect && slotRect.width >= 4 && slotRect.height >= 4) {
    return {
      x: slotRect.x + (ndcX * 0.5 + 0.5) * slotRect.width,
      y: slotRect.y + (0.5 - ndcY * 0.5) * slotRect.height,
      zCam,
    };
  }

  return {
    x: (ndcX * 0.5 + 0.5) * viewportW,
    y: (0.5 - ndcY * 0.5) * viewportH,
    zCam,
  };
}

const KEY_LIGHT = normalize({ x: -0.52, y: 0.72, z: 0.45 });

function computeFaceShade(p0: Vec3, p1: Vec3, p2: Vec3): number {
  const e1 = sub(p1, p0);
  const e2 = sub(p2, p0);
  const n = normalize(cross(e1, e2));
  // Soft two-sided studio fill so both sides of Fold 16 read with dimensional pleats
  const key = Math.max(0, dot(n, KEY_LIGHT));
  const backFill = Math.max(0, dot(n, { x: 0.48, y: 0.45, z: -0.75 })) * 0.65;
  return Math.min(1, 0.58 + 0.42 * Math.max(key, backFill));
}

export function projectFold(
  pose: FoldPose,
  view: ViewState | ViewId,
  aspect: number,
  viewportW = 900,
  viewportH = 640,
  atelierOpening?: number,
  slotRect?: StageSlotRect,
): ProjectedFoldResult {
  const resolved = resolveViewState(view);
  const effectiveAspect =
    slotRect && slotRect.width >= 4 && slotRect.height >= 4
      ? slotRect.width / slotRect.height
      : aspect;
  const cam = buildCameraBasis(resolved, effectiveAspect, atelierOpening);
  const H = FOLD_CONSTANTS.height;
  const N = FOLD_CONSTANTS.panels;

  const faces: ProjectedFace[] = [];

  const pushQuad = (
    a: Vec3,
    b: Vec3,
    c: Vec3,
    d: Vec3,
    kind: ProjectedFace['kind'],
    fixedShade?: number,
    uvs?: { u: number; v: number }[],
  ) => {
    const e1 = sub(b, a);
    const e2 = sub(c, a);
    const normal = cross(e1, e2);
    const center: Vec3 = {
      x: (a.x + b.x + c.x + d.x) * 0.25,
      y: (a.y + b.y + c.y + d.y) * 0.25,
      z: (a.z + b.z + c.z + d.z) * 0.25,
    };
    const toCam = sub(cam.position, center);
    if (dot(normal, toCam) <= 0) return;

    const pa = projectPoint(a, cam, viewportW, viewportH, slotRect);
    const pb = projectPoint(b, cam, viewportW, viewportH, slotRect);
    const pc = projectPoint(c, cam, viewportW, viewportH, slotRect);
    const pd = projectPoint(d, cam, viewportW, viewportH, slotRect);

    faces.push({
      points: [
        { x: pa.x, y: pa.y },
        { x: pb.x, y: pb.y },
        { x: pc.x, y: pc.y },
        { x: pd.x, y: pd.y },
      ],
      uvs,
      depth: (pa.zCam + pb.zCam + pc.zCam + pd.zCam) * 0.25,
      shade: fixedShade ?? computeFaceShade(a, b, c),
      kind,
    });
  };

  // Two oxblood steel feet beneath first and last panel midpoints
  const fw = FOLD_CONSTANTS.footWidth * 0.5;
  const fd = FOLD_CONSTANTS.footDepth * 0.5;
  const fh = FOLD_CONSTANTS.footHeight;

  for (const center of pose.feetCenters) {
    const x0 = center.x - fw;
    const x1 = center.x + fw;
    const z0 = center.z - fd;
    const z1 = center.z + fd;
    const y0 = -fh;
    const y1 = 0;

    pushQuad(
      { x: x0, y: y1, z: z1 },
      { x: x1, y: y1, z: z1 },
      { x: x1, y: y1, z: z0 },
      { x: x0, y: y1, z: z0 },
      'foot',
      0.85,
    );
    pushQuad(
      { x: x0, y: y0, z: z1 },
      { x: x1, y: y0, z: z1 },
      { x: x1, y: y1, z: z1 },
      { x: x0, y: y1, z: z1 },
      'foot',
      0.7,
    );
    pushQuad(
      { x: x1, y: y0, z: z0 },
      { x: x0, y: y0, z: z0 },
      { x: x0, y: y1, z: z0 },
      { x: x1, y: y1, z: z0 },
      'foot',
      0.55,
    );
    pushQuad(
      { x: x0, y: y0, z: z0 },
      { x: x0, y: y0, z: z1 },
      { x: x0, y: y1, z: z1 },
      { x: x0, y: y1, z: z0 },
      'foot',
      0.62,
    );
    pushQuad(
      { x: x1, y: y0, z: z1 },
      { x: x1, y: y0, z: z0 },
      { x: x1, y: y1, z: z0 },
      { x: x1, y: y1, z: z1 },
      'foot',
      0.78,
    );
  }

  // Ribbon panels with continuous developed UVs (v = 0 at top edge, v = 1 at floor in Canvas 2D Y-down)
  for (let j = 0; j < N; j += 1) {
    const f0 = pose.front[j];
    const f1 = pose.front[j + 1];
    const b0 = pose.back[j];
    const b1 = pose.back[j + 1];

    const frontUV = computePanelUVSpan(j, 'front', N);
    const backUV = computePanelUVSpan(j, 'back', N);

    // Front face (+Z)
    pushQuad(
      { x: f0.x, y: 0, z: f0.z },
      { x: f1.x, y: 0, z: f1.z },
      { x: f1.x, y: H, z: f1.z },
      { x: f0.x, y: H, z: f0.z },
      'felt',
      undefined,
      [
        { u: frontUV.uStart, v: 1 },
        { u: frontUV.uEnd, v: 1 },
        { u: frontUV.uEnd, v: 0 },
        { u: frontUV.uStart, v: 0 },
      ],
    );

    // Back face (-Z), ordered left-to-right from back viewpoint (uBack = 1 - uFront)
    pushQuad(
      { x: b1.x, y: 0, z: b1.z },
      { x: b0.x, y: 0, z: b0.z },
      { x: b0.x, y: H, z: b0.z },
      { x: b1.x, y: H, z: b1.z },
      'felt',
      undefined,
      [
        { u: backUV.uStart, v: 1 },
        { u: backUV.uEnd, v: 1 },
        { u: backUV.uEnd, v: 0 },
        { u: backUV.uStart, v: 0 },
      ],
    );

    // Top thickness cap
    pushQuad(
      { x: f0.x, y: H, z: f0.z },
      { x: f1.x, y: H, z: f1.z },
      { x: b1.x, y: H, z: b1.z },
      { x: b0.x, y: H, z: b0.z },
      'top',
      0.96,
    );
  }

  // Left and right end caps (stay solid base felt color)
  pushQuad(
    { x: pose.back[0].x, y: 0, z: pose.back[0].z },
    { x: pose.front[0].x, y: 0, z: pose.front[0].z },
    { x: pose.front[0].x, y: H, z: pose.front[0].z },
    { x: pose.back[0].x, y: H, z: pose.back[0].z },
    'cap',
    0.72,
  );
  pushQuad(
    { x: pose.front[N].x, y: 0, z: pose.front[N].z },
    { x: pose.back[N].x, y: 0, z: pose.back[N].z },
    { x: pose.back[N].x, y: H, z: pose.back[N].z },
    { x: pose.front[N].x, y: H, z: pose.front[N].z },
    'cap',
    0.8,
  );

  // Painter's algorithm back-to-front
  faces.sort((a, b) => b.depth - a.depth);

  // Span bracket projection
  const leftEnd = projectPoint(
    { x: -pose.metrics.outerSpan * 0.5, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );
  const rightEnd = projectPoint(
    { x: pose.metrics.outerSpan * 0.5, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );
  const centerFloor = projectPoint(
    { x: 0, y: -fh, z: 0 },
    cam,
    viewportW,
    viewportH,
    slotRect,
  );

  const rx = Math.max(26, Math.abs(rightEnd.x - leftEnd.x) * 0.54);
  const nearSide = Math.abs(Math.sin((resolved.yawDeg * Math.PI) / 180)) > 0.85;
  const ry = Math.max(8, nearSide ? 24 : 16);

  return {
    faces,
    spanBracket: {
      visible: !nearSide && Math.abs(rightEnd.x - leftEnd.x) > 36,
      leftX: Math.min(leftEnd.x, rightEnd.x),
      rightX: Math.max(leftEnd.x, rightEnd.x),
      y: Math.max(leftEnd.y, rightEnd.y) + 18,
    },
    shadowEllipse: {
      cx: centerFloor.x,
      cy: centerFloor.y + 4,
      rx,
      ry,
    },
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/state.ts">
<![CDATA[import { normalizeHex } from './color';
import {
  DEFAULT_DESIGN,
  DEFAULT_VIEW,
  FOLD_CONSTANTS,
  PrintId,
  VIEW_ORDER,
  VIEW_PRESETS,
  ViewId,
  ViewState,
} from './config';
import { normalizeOpening } from './geometry';

export type OwnershipMode = 'story' | 'manual';

export interface DesignState {
  opening: number; // 0..100
  baseHex: string; // normalized #RRGGBB
  designHex: string; // normalized #RRGGBB
  print: PrintId;
  motifScale: number; // 50..200, default 100
  tintUpload?: boolean; // opt-in print-color tinting for uploaded images
}

export interface FoldStudioState {
  mode: OwnershipMode;
  design: DesignState;
  view: ViewState;
}

export type FoldAction =
  | { type: 'SET_OPENING'; opening: number }
  | { type: 'SET_BASE_HEX'; hex: string; currentOpening?: number }
  | { type: 'SET_DESIGN_HEX'; hex: string; currentOpening?: number }
  | { type: 'SET_PRINT'; print: PrintId; currentOpening?: number }
  | { type: 'SET_MOTIF_SCALE'; motifScale: number; currentOpening?: number }
  | { type: 'SET_TINT_UPLOAD'; tintUpload: boolean; currentOpening?: number }
  | { type: 'SET_VIEW_PRESET'; viewId: ViewId; currentOpening?: number }
  | {
      type: 'SET_VIEW_ANGLES';
      yawDeg: number;
      elevationDeg: number;
      currentOpening?: number;
    }
  | { type: 'ROTATE_VIEW_STEP'; deltaYawDeg: number; currentOpening?: number }
  | { type: 'RESET_VIEW'; currentOpening?: number }
  | { type: 'RESET_SHAPE' }
  | { type: 'RESET_DESIGN'; currentOpening?: number }
  | { type: 'FOLLOW_STORY' }
  | { type: 'SYNC_LAYOUT'; enhanced: boolean; currentOpening?: number };

export function normalizeYawDeg(yawDeg: number): number {
  if (!Number.isFinite(yawDeg)) return DEFAULT_VIEW.yawDeg;
  const mod = ((yawDeg % 360) + 360) % 360;
  return mod;
}

export function normalizeElevationDeg(elevationDeg: number): number {
  if (!Number.isFinite(elevationDeg)) return DEFAULT_VIEW.elevationDeg;
  return Math.max(
    FOLD_CONSTANTS.minElevationDeg,
    Math.min(FOLD_CONSTANTS.maxElevationDeg, elevationDeg),
  );
}

export function normalizeMotifScale(scale: number): number {
  if (!Number.isFinite(scale)) return DEFAULT_DESIGN.motifScale;
  return Math.max(50, Math.min(200, Math.round(scale)));
}

export function shortestAngleDiffDeg(a: number, b: number): number {
  const diff = (((a - b) % 360) + 540) % 360 - 180;
  return Math.abs(diff);
}

export function viewPresetFromAngles(view: ViewState): ViewId | null {
  for (const id of VIEW_ORDER) {
    const preset = VIEW_PRESETS[id];
    if (
      shortestAngleDiffDeg(view.yawDeg, preset.yawDeg) <= 0.75 &&
      Math.abs(view.elevationDeg - preset.elevationDeg) <= 0.75
    ) {
      return id;
    }
  }
  return null;
}

export function viewDirectionFromAngles(view: ViewState): [number, number, number] {
  const yawRad = (normalizeYawDeg(view.yawDeg) * Math.PI) / 180;
  const elevRad = (normalizeElevationDeg(view.elevationDeg) * Math.PI) / 180;
  const cosElev = Math.cos(elevRad);
  return [
    Math.sin(yawRad) * cosElev,
    Math.sin(elevRad),
    Math.cos(yawRad) * cosElev,
  ];
}

export function usesActivePrintColor(
  design: Pick<DesignState, 'print' | 'tintUpload'>,
): boolean {
  if (design.print === 'solid') return false;
  if (design.print === 'upload') return Boolean(design.tintUpload);
  return true;
}

export function createInitialFoldState(enhanced = true): FoldStudioState {
  return {
    mode: enhanced ? 'story' : 'manual',
    design: { ...DEFAULT_DESIGN },
    view: { ...DEFAULT_VIEW },
  };
}

function resolveOpeningEnteringManual(
  state: FoldStudioState,
  currentOpening?: number,
): number {
  if (state.mode === 'story' && typeof currentOpening === 'number') {
    return normalizeOpening(currentOpening);
  }
  return state.design.opening;
}

export function foldReducer(
  state: FoldStudioState,
  action: FoldAction,
): FoldStudioState {
  switch (action.type) {
    case 'SET_OPENING': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: normalizeOpening(action.opening),
        },
      };
    }
    case 'SET_BASE_HEX': {
      const hex = normalizeHex(action.hex);
      if (!hex) return state;
      if (state.mode === 'manual' && state.design.baseHex === hex) {
        return state;
      }
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          baseHex: hex,
        },
      };
    }
    case 'SET_DESIGN_HEX': {
      const hex = normalizeHex(action.hex);
      if (!hex) return state;
      if (state.mode === 'manual' && state.design.designHex === hex) {
        return state;
      }
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          designHex: hex,
        },
      };
    }
    case 'SET_PRINT': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          print: action.print,
        },
      };
    }
    case 'SET_MOTIF_SCALE': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          motifScale: normalizeMotifScale(action.motifScale),
        },
      };
    }
    case 'SET_TINT_UPLOAD': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          tintUpload: Boolean(action.tintUpload),
        },
      };
    }
    case 'SET_VIEW_PRESET': {
      const preset = VIEW_PRESETS[action.viewId];
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          yawDeg: preset.yawDeg,
          elevationDeg: preset.elevationDeg,
        },
      };
    }
    case 'SET_VIEW_ANGLES': {
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          yawDeg: normalizeYawDeg(action.yawDeg),
          elevationDeg: normalizeElevationDeg(action.elevationDeg),
        },
      };
    }
    case 'ROTATE_VIEW_STEP': {
      return {
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: {
          ...state.view,
          yawDeg: normalizeYawDeg(state.view.yawDeg + action.deltaYawDeg),
        },
      };
    }
    case 'RESET_VIEW': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
        },
        view: { ...DEFAULT_VIEW },
      };
    }
    case 'RESET_SHAPE': {
      return {
        ...state,
        mode: 'manual',
        design: {
          ...state.design,
          opening: FOLD_CONSTANTS.defaultOpening,
        },
      };
    }
    case 'RESET_DESIGN': {
      return {
        ...state,
        mode: 'manual',
        design: {
          opening: resolveOpeningEnteringManual(state, action.currentOpening),
          baseHex: DEFAULT_DESIGN.baseHex,
          designHex: DEFAULT_DESIGN.designHex,
          print: DEFAULT_DESIGN.print,
          motifScale: DEFAULT_DESIGN.motifScale,
          tintUpload: Boolean(DEFAULT_DESIGN.tintUpload),
        },
      };
    }
    case 'FOLLOW_STORY': {
      return {
        ...state,
        mode: 'story',
      };
    }
    case 'SYNC_LAYOUT': {
      if (!action.enhanced && state.mode === 'story') {
        return {
          ...state,
          mode: 'manual',
          design: {
            ...state.design,
            opening:
              typeof action.currentOpening === 'number'
                ? normalizeOpening(action.currentOpening)
                : state.design.opening,
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
}

export function getEffectiveOpening(
  state: FoldStudioState,
  storyDerivedOpening: number,
): number {
  return state.mode === 'story'
    ? normalizeOpening(storyDerivedOpening)
    : state.design.opening;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/story.ts">
<![CDATA[import { boundedProgress, smoothstep } from '../motion/math';

export function storyProgress(scrollY: number, start: number, end: number): number {
  return boundedProgress(scrollY, start, end);
}

/**
 * Timeline:
 * - p = 0..0.12: hold opening 0
 * - p = 0.12..0.62: interpolate 0 -> 100 with smoothstep
 * - p = 0.62..0.82: hold opening 100
 * - p = 0.82..1.00: interpolate 100 -> 50 with smoothstep
 */
export function storyOpening(progress: number): number {
  if (!Number.isFinite(progress)) return 0;
  const p = Math.min(1, Math.max(0, progress));

  if (p <= 0.12) return 0;
  if (p <= 0.62) return 100 * smoothstep(0.12, 0.62, p);
  if (p <= 0.82) return 100;
  return 100 - 50 * smoothstep(0.82, 1.0, p);
}

/**
 * Chapters:
 * - [0, 0.34) -> 0
 * - [0.34, 0.72) -> 1
 * - [0.72, 1] -> 2
 */
export function storyChapter(progress: number): 0 | 1 | 2 {
  if (!Number.isFinite(progress)) return 0;
  const p = Math.min(1, Math.max(0, progress));
  if (p < 0.34) return 0;
  if (p < 0.72) return 1;
  return 2;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/unfold.ts">
<![CDATA[import { FOLD_CONSTANTS } from './config';
import { clamp } from '../motion/math';
import { normalizeOpening } from './geometry';

function easeOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3);
}

function easeInOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export interface UnfoldChoreographyFrame {
  panelOpenings: number[];
  averageOpening: number;
  glintProgress: number; // 0..1 across interior hinges 1..15 during gather highlight
  done: boolean;
}

export const ENTRANCE_DURATION_SEC = 2.65;
export const DEMO_FOLD_DURATION_SEC = 3.25;

/**
 * Gently underdamped mechanical spring curve with <= 2.5% settle follow-through,
 * mapping local t in [0, 1] -> [0, ~1.025 -> 1.0].
 */
function accordionSettleCurve(t: number): number {
  const c = clamp(t, 0, 1);
  if (c >= 1) return 1;
  if (c <= 0) return 0;
  // Smooth cubic rise into soft damped settle
  const base = 1 - Math.pow(1 - c, 3);
  const overshoot =
    c > 0.45
      ? Math.sin(((c - 0.45) / 0.55) * Math.PI) * 0.032 * (1 - c)
      : 0;
  return base + overshoot;
}

/**
 * Signature entrance unfolding sequence:
 * - 0.00–0.32s: compact gathered sculptural silhouette (~4%) while light sweeps hinges
 * - 0.32–2.45s: sequential coupled progression propagating from leading panels (0)
 *               through middle pleats to trailing panels (15) with subtle inertial settle
 * - >= 2.65s: cleanly settled uniform targetOpening across all 16 panels
 */
export function computeEntranceChoreography(
  elapsedSec: number,
  targetOpeningInput: number,
  reducedMotion = false,
): UnfoldChoreographyFrame {
  const target = normalizeOpening(targetOpeningInput);
  const N = FOLD_CONSTANTS.panels;

  if (reducedMotion || elapsedSec >= ENTRANCE_DURATION_SEC) {
    const panelOpenings = new Array<number>(N).fill(target);
    return {
      panelOpenings,
      averageOpening: target,
      glintProgress: 1,
      done: true,
    };
  }

  const t = Math.max(0, elapsedSec);
  const gatherFloor = Math.min(target, 4);
  const glintProgress = clamp((t - 0.12) / 0.85, 0, 1);

  const startDelay = 0.28;
  const panelDuration = 1.48;
  const waveLag = 0.045; // 15 * 0.045 = 0.675s total stagger across the ribbon

  const panelOpenings = new Array<number>(N);
  let sum = 0;

  for (let i = 0; i < N; i += 1) {
    const pStart = startDelay + i * waveLag;
    const localT = clamp((t - pStart) / panelDuration, 0, 1);
    const k = accordionSettleCurve(localT);
    const val = normalizeOpening(gatherFloor + (target - gatherFloor) * k);
    panelOpenings[i] = val;
    sum += val;
  }

  return {
    panelOpenings,
    averageOpening: sum / N,
    glintProgress,
    done: false,
  };
}

/**
 * Interactive "See how it folds" cycle:
 * - 0.00–0.65s: smoothly gathers from current opening down to 4% compact pleats (outside-in feel)
 * - 0.65–0.85s: poised compact hold showing gathered depth
 * - 0.85–2.30s: progressive accordion wave unfolds from 4% -> 88% extended span
 * - 2.30–3.25s: settles smoothly back into anchorOpening
 */
export function computeDemoFoldChoreography(
  elapsedSec: number,
  anchorOpeningInput: number,
  reducedMotion = false,
): UnfoldChoreographyFrame {
  const anchor = normalizeOpening(anchorOpeningInput);
  const N = FOLD_CONSTANTS.panels;

  if (reducedMotion || elapsedSec >= DEMO_FOLD_DURATION_SEC) {
    const panelOpenings = new Array<number>(N).fill(anchor);
    return {
      panelOpenings,
      averageOpening: anchor,
      glintProgress: 1,
      done: true,
    };
  }

  const t = Math.max(0, elapsedSec);
  const gatherVal = 4;
  const showcasePeak = Math.max(86, anchor);
  const panelOpenings = new Array<number>(N);
  let sum = 0;

  for (let i = 0; i < N; i += 1) {
    let val: number;

    if (t < 0.65) {
      // Phase 1: outside panels lead gather slightly inward
      const edgeDist = Math.abs(i - (N - 1) * 0.5) / ((N - 1) * 0.5);
      const stagger = (1 - edgeDist) * 0.14;
      const u = clamp((t - stagger) / (0.65 - 0.14), 0, 1);
      val = anchor + (gatherVal - anchor) * easeInOutCubic(u);
    } else if (t < 0.85) {
      // Phase 2: brief poised hold
      val = gatherVal;
    } else if (t < 2.30) {
      // Phase 3: coupled accordion unfold wave leading panel 0 -> 15
      const pStart = 0.85 + i * 0.032;
      const pDur = 0.92;
      const u = clamp((t - pStart) / pDur, 0, 1);
      val = gatherVal + (showcasePeak - gatherVal) * accordionSettleCurve(u);
    } else {
      // Phase 4: smooth settle back to anchor opening
      const pStart = 2.30 + (N - 1 - i) * 0.015;
      const pDur = 0.72;
      const u = clamp((t - pStart) / pDur, 0, 1);
      val = showcasePeak + (anchor - showcasePeak) * easeOutCubic(u);
    }

    const clamped = normalizeOpening(val);
    panelOpenings[i] = clamped;
    sum += clamped;
  }

  return {
    panelOpenings,
    averageOpening: sum / N,
    glintProgress: clamp((t - 0.6) / 0.5, 0, 1),
    done: false,
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/upload.ts">
<![CDATA[export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MiB
export const MAX_UPLOAD_AXIS = 4096;
export const MAX_UPLOAD_PIXELS = 16_000_000;

export const UPLOAD_ERRORS = {
  type: 'Choose a PNG, JPEG or WebP image.',
  size: 'Choose an image of 8 MiB or less.',
  dimensions: 'Choose an image at most 4096 pixels on each side and 16 megapixels in total.',
  corrupt: 'This image could not be opened.',
} as const;

export type AllowedImageFormat = 'png' | 'jpeg' | 'webp';

export interface ParsedImageHeader {
  format: AllowedImageFormat;
  width: number;
  height: number;
}

export interface UploadedArtworkResource {
  id: string;
  filename: string;
  width: number;
  height: number;
  bitmap: ImageBitmap;
  previewUrl: string;
  dispose: () => void;
}

function readUint16BE(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] << 8) | bytes[offset + 1];
}

function readUint16LE(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint24LE(bytes: Uint8Array, offset: number): number {
  return bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
}

function readUint32BE(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] << 24) >>> 0) +
    (bytes[offset + 1] << 16) +
    (bytes[offset + 2] << 8) +
    bytes[offset + 3]
  );
}

function matchAscii(bytes: Uint8Array, offset: number, str: string): boolean {
  if (offset + str.length > bytes.length) return false;
  for (let i = 0; i < str.length; i += 1) {
    if (bytes[offset + i] !== str.charCodeAt(i)) return false;
  }
  return true;
}

/**
 * Inspects binary signatures and extracts image dimensions from PNG, JPEG, or WebP headers
 * without allocating a decoded GPU/bitmap buffer first.
 * Explicitly rejects SVG, GIF, HTML, or unrecognized magic bytes.
 */
export function parseSupportedImageHeader(
  bytes: Uint8Array,
): { ok: true; header: ParsedImageHeader } | { ok: false; reason: 'type' | 'corrupt' } {
  if (bytes.length < 12) {
    return { ok: false, reason: 'type' };
  }

  // Explicitly detect text-based markup / SVG / GIF signatures
  const prefix = String.fromCharCode(...bytes.subarray(0, Math.min(32, bytes.length))).trimStart().toLowerCase();
  if (prefix.startsWith('<svg') || prefix.startsWith('<?xml') || prefix.startsWith('<!doctype') || prefix.startsWith('<html')) {
    return { ok: false, reason: 'type' };
  }
  if (matchAscii(bytes, 0, 'GIF87a') || matchAscii(bytes, 0, 'GIF89a')) {
    return { ok: false, reason: 'type' };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A + IHDR
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    if (bytes.length < 24 || !matchAscii(bytes, 12, 'IHDR')) {
      return { ok: false, reason: 'corrupt' };
    }
    const width = readUint32BE(bytes, 16);
    const height = readUint32BE(bytes, 20);
    if (width <= 0 || height <= 0) {
      return { ok: false, reason: 'corrupt' };
    }
    return { ok: true, header: { format: 'png', width, height } };
  }

  // JPEG: FF D8
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      // Seek next 0xFF marker
      if (bytes[offset] !== 0xff) {
        return { ok: false, reason: 'corrupt' };
      }
      while (offset < bytes.length && bytes[offset] === 0xff) {
        offset += 1;
      }
      if (offset >= bytes.length) break;
      const marker = bytes[offset];
      offset += 1;

      // Standalone markers (TEM, RST0..7, SOI, EOI)
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        if (marker === 0xd9) break;
        continue;
      }
      // Start of Scan reaches image entropy stream; stop scanning
      if (marker === 0xda) break;

      if (offset + 2 > bytes.length) break;
      const segLen = readUint16BE(bytes, offset);
      if (segLen < 2 || offset + segLen > bytes.length) {
        return { ok: false, reason: 'corrupt' };
      }

      // SOF markers containing dimensions (except DHT=C4, JPG=C8, DAC=CC)
      const isSof =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;

      if (isSof) {
        if (segLen < 7) {
          return { ok: false, reason: 'corrupt' };
        }
        const height = readUint16BE(bytes, offset + 3);
        const width = readUint16BE(bytes, offset + 5);
        if (width <= 0 || height <= 0) {
          return { ok: false, reason: 'corrupt' };
        }
        return { ok: true, header: { format: 'jpeg', width, height } };
      }

      offset += segLen;
    }
    return { ok: false, reason: 'corrupt' };
  }

  // WebP: RIFF....WEBP
  if (matchAscii(bytes, 0, 'RIFF') && matchAscii(bytes, 8, 'WEBP')) {
    if (bytes.length < 25) {
      return { ok: false, reason: 'corrupt' };
    }
    if (matchAscii(bytes, 12, 'VP8X')) {
      if (bytes.length < 30) return { ok: false, reason: 'corrupt' };
      const width = readUint24LE(bytes, 24) + 1;
      const height = readUint24LE(bytes, 27) + 1;
      return width > 0 && height > 0
        ? { ok: true, header: { format: 'webp', width, height } }
        : { ok: false, reason: 'corrupt' };
    }
    if (matchAscii(bytes, 12, 'VP8L')) {
      if (bytes[20] !== 0x2f) {
        return { ok: false, reason: 'corrupt' };
      }
      const b1 = bytes[21];
      const b2 = bytes[22];
      const b3 = bytes[23];
      const b4 = bytes[24];
      const bits = b1 | (b2 << 8) | (b3 << 16) | (b4 << 24);
      const width = (bits & 0x3fff) + 1;
      const height = ((bits >>> 14) & 0x3fff) + 1;
      return { ok: true, header: { format: 'webp', width, height } };
    }
    if (matchAscii(bytes, 12, 'VP8 ')) {
      if (bytes.length < 30 || bytes[23] !== 0x9d || bytes[24] !== 0x01 || bytes[25] !== 0x2a) {
        return { ok: false, reason: 'corrupt' };
      }
      const width = readUint16LE(bytes, 26) & 0x3fff;
      const height = readUint16LE(bytes, 28) & 0x3fff;
      return width > 0 && height > 0
        ? { ok: true, header: { format: 'webp', width, height } }
        : { ok: false, reason: 'corrupt' };
    }
    return { ok: false, reason: 'corrupt' };
  }

  return { ok: false, reason: 'type' };
}

export function validateUploadMetadata(
  mimeType: string,
  byteLength: number,
  bytes: Uint8Array,
): { ok: true; header: ParsedImageHeader } | { ok: false; error: string } {
  const cleanMime = mimeType.toLowerCase().trim();
  const allowedMimes = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp']);
  if (cleanMime && !allowedMimes.has(cleanMime)) {
    return { ok: false, error: UPLOAD_ERRORS.type };
  }

  if (!Number.isFinite(byteLength) || byteLength <= 0 || byteLength > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: byteLength > MAX_UPLOAD_BYTES ? UPLOAD_ERRORS.size : UPLOAD_ERRORS.corrupt,
    };
  }

  const parsed = parseSupportedImageHeader(bytes);
  if (!parsed.ok) {
    return {
      ok: false,
      error: parsed.reason === 'type' ? UPLOAD_ERRORS.type : UPLOAD_ERRORS.corrupt,
    };
  }

  const { width, height } = parsed.header;
  if (
    width > MAX_UPLOAD_AXIS ||
    height > MAX_UPLOAD_AXIS ||
    width * height > MAX_UPLOAD_PIXELS
  ) {
    return { ok: false, error: UPLOAD_ERRORS.dimensions };
  }

  return { ok: true, header: parsed.header };
}

export function sanitizeFilename(rawName: string): string {
  const base = rawName.split(/[/\\]/).pop() ?? 'uploaded-image';
  const clean = base.replace(/[^\w.\- ()]/g, '').trim();
  return clean.length > 0 ? clean.slice(0, 64) : 'uploaded-image';
}

/**
 * Decodes and downsamples a validated local image File into a browser-session resource.
 * Never persists bytes externally or leaks object URLs / ImageBitmaps.
 */
export async function loadValidatedImageFile(
  file: File,
  token: number,
  isCurrentToken: (t: number) => boolean,
): Promise<{ ok: true; resource: UploadedArtworkResource } | { ok: false; error: string }> {
  // 1. Pre-check MIME & size before touching bytes
  if (
    file.type &&
    !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
      file.type.toLowerCase().trim(),
    )
  ) {
    return { ok: false, error: UPLOAD_ERRORS.type };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: UPLOAD_ERRORS.size };
  }

  // 2. Read header slice (first 128 KiB covers PNG IHDR, WebP chunks, and JPEG EXIF+SOF)
  let headerBytes: Uint8Array;
  try {
    const slice = file.slice(0, 131072);
    headerBytes = new Uint8Array(await slice.arrayBuffer());
  } catch {
    return { ok: false, error: UPLOAD_ERRORS.corrupt };
  }

  if (!isCurrentToken(token)) {
    return { ok: false, error: '' };
  }

  const check = validateUploadMetadata(file.type, file.size, headerBytes);
  if (!check.ok) {
    return { ok: false, error: check.error };
  }

  // 3. Safe bitmap decode with downsampling cap for texture performance
  let rawBitmap: ImageBitmap | null = null;
  let workingBitmap: ImageBitmap | null = null;
  let previewUrl = '';

  try {
    rawBitmap = await createImageBitmap(file);

    if (!isCurrentToken(token)) {
      rawBitmap.close();
      return { ok: false, error: '' };
    }

    if (
      rawBitmap.width <= 0 ||
      rawBitmap.height <= 0 ||
      rawBitmap.width > MAX_UPLOAD_AXIS ||
      rawBitmap.height > MAX_UPLOAD_AXIS ||
      rawBitmap.width * rawBitmap.height > MAX_UPLOAD_PIXELS
    ) {
      rawBitmap.close();
      return { ok: false, error: UPLOAD_ERRORS.dimensions };
    }

    // Downsample working bitmap if larger than 1536px on longest edge
    const maxWorkingEdge = 1536;
    if (Math.max(rawBitmap.width, rawBitmap.height) > maxWorkingEdge) {
      const scale = maxWorkingEdge / Math.max(rawBitmap.width, rawBitmap.height);
      const dw = Math.max(1, Math.round(rawBitmap.width * scale));
      const dh = Math.max(1, Math.round(rawBitmap.height * scale));
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = dw;
      tempCanvas.height = dh;
      const tCtx = tempCanvas.getContext('2d');
      if (tCtx) {
        tCtx.imageSmoothingEnabled = true;
        tCtx.imageSmoothingQuality = 'high';
        tCtx.drawImage(rawBitmap, 0, 0, dw, dh);
        workingBitmap = await createImageBitmap(tempCanvas);
        rawBitmap.close();
        rawBitmap = null;
      } else {
        workingBitmap = rawBitmap;
        rawBitmap = null;
      }
    } else {
      workingBitmap = rawBitmap;
      rawBitmap = null;
    }

    if (!isCurrentToken(token)) {
      workingBitmap.close();
      return { ok: false, error: '' };
    }

    // Small thumbnail data URL for the upload control card (no lingering object URL leaks)
    const thumbCanvas = document.createElement('canvas');
    const thumbScale = Math.min(1, 160 / Math.max(workingBitmap.width, workingBitmap.height));
    thumbCanvas.width = Math.max(1, Math.round(workingBitmap.width * thumbScale));
    thumbCanvas.height = Math.max(1, Math.round(workingBitmap.height * thumbScale));
    const thCtx = thumbCanvas.getContext('2d');
    if (thCtx) {
      thCtx.drawImage(workingBitmap, 0, 0, thumbCanvas.width, thumbCanvas.height);
      previewUrl = thumbCanvas.toDataURL('image/png');
    }

    const finalBitmap = workingBitmap;
    const cleanFilename = sanitizeFilename(file.name);
    let released = false;

    return {
      ok: true,
      resource: {
        id: `upload-${token}-${Date.now()}`,
        filename: cleanFilename,
        width: check.header.width,
        height: check.header.height,
        bitmap: finalBitmap,
        previewUrl,
        dispose: () => {
          if (released) return;
          released = true;
          try {
            finalBitmap.close();
          } catch {
            // ignore already closed
          }
        },
      },
    };
  } catch {
    try {
      rawBitmap?.close();
    } catch {
      // ignore
    }
    try {
      workingBitmap?.close();
    } catch {
      // ignore
    }
    return { ok: false, error: UPLOAD_ERRORS.corrupt };
  }
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/forms/brief.ts">
<![CDATA[import {
  findColorPresetName,
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_PRESETS,
  ViewState,
} from '../fold/config';
import { FoldMetrics, formatMeters } from '../fold/geometry';
import {
  DesignState,
  normalizeYawDeg,
  usesActivePrintColor,
  viewPresetFromAngles,
} from '../fold/state';

export const ROOM_OPTIONS = [
  'Living space',
  'Workspace',
  'Hospitality',
  'Other',
] as const;

export type RoomType = (typeof ROOM_OPTIONS)[number];

export interface BriefFields {
  projectName: string;
  room: string;
  notes: string;
}

export type BriefErrors = Partial<Record<keyof BriefFields, string>>;

export interface BriefDesignSnapshot {
  design: DesignState;
  view: ViewState;
  uploadedImageName?: string | null;
}

export function validateBrief(fields: BriefFields): BriefErrors {
  const errors: BriefErrors = {};
  const trimmedName = fields.projectName.trim();

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    errors.projectName = 'Enter a project name with 2 to 80 characters.';
  }

  if (!ROOM_OPTIONS.includes(fields.room as RoomType)) {
    errors.room = 'Choose a room type.';
  }

  if (fields.notes.length > 500) {
    errors.notes = 'Keep notes to 500 characters.';
  }

  return errors;
}

export function formatColorWithPreset(hex: string): string {
  const upper = hex.toUpperCase();
  const preset = findColorPresetName(upper);
  return preset ? `${upper} (${preset})` : upper;
}

export function formatViewSummary(view: ViewState): string {
  const presetId = viewPresetFromAngles(view);
  const yaw = Math.round(normalizeYawDeg(view.yawDeg));
  const elev = Math.round(view.elevationDeg);
  return presetId
    ? `${VIEW_PRESETS[presetId].label} (${yaw}° · ${elev}° tilt)`
    : `Custom angle (${yaw}° · ${elev}° tilt)`;
}

export function buildBriefText(
  fields: BriefFields,
  snapshot: BriefDesignSnapshot,
  metrics: FoldMetrics,
): string {
  const cleanName = fields.projectName.trim();
  const cleanRoom = ROOM_OPTIONS.includes(fields.room as RoomType)
    ? fields.room
    : 'Other';
  const cleanNotes = fields.notes.trim();

  const { design, view, uploadedImageName } = snapshot;
  const printSpec = PRINT_SPECS[design.print];

  const lines = [
    'SERRAFORM — Room Brief',
    '======================',
    '',
    `Project name: ${cleanName}`,
    `Room: ${cleanRoom}`,
    '',
    'Design & Shape',
    '--------------',
    `Product: Fold ${FOLD_CONSTANTS.panels} (${FOLD_CONSTANTS.panels} connected felt panels)`,
    `Base color: ${formatColorWithPreset(design.baseHex)}`,
    `Print: ${printSpec.name}`,
  ];

  if (usesActivePrintColor(design)) {
    lines.push(`Print color: ${formatColorWithPreset(design.designHex)}`);
  }
  if (printSpec.usesScale) {
    lines.push(`${printSpec.scaleLabel}: ${Math.round(design.motifScale)}%`);
  }
  if (design.print === 'upload' && uploadedImageName) {
    lines.push(`Your image: ${uploadedImageName} (local session only)`);
  }

  lines.push(
    `Opening: ${Math.round(design.opening)}%`,
    `Outer span: ${formatMeters(metrics.outerSpan)}`,
    `Outer depth: ${formatMeters(metrics.outerDepth)}`,
    `Height: ${formatMeters(FOLD_CONSTANTS.height)}`,
    `Support depth: ${formatMeters(FOLD_CONSTANTS.footDepth)}`,
    `Preview view: ${formatViewSummary(view)}`,
    '',
    'Notes',
    '-----',
    cleanNotes.length > 0 ? cleanNotes : '(None)',
    '',
    'Notice',
    '------',
    'SERRAFORM is a fictional design concept. Dimensions describe this concept model and are not a manufacturing or acoustic specification. Prepared locally in your browser; nothing was sent.',
    '',
  );

  return lines.join('\n');
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/forms/BriefForm.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Download, Pencil } from 'lucide-react';
import { FOLD_CONSTANTS, PRINT_SPECS } from '../fold/config';
import { deriveFold, FoldMetrics, formatMeters } from '../fold/geometry';
import { useFold } from '../fold/FoldProvider';
import { usesActivePrintColor } from '../fold/state';
import {
  BriefDesignSnapshot,
  BriefErrors,
  BriefFields,
  buildBriefText,
  formatColorWithPreset,
  formatViewSummary,
  ROOM_OPTIONS,
  validateBrief,
} from './brief';

interface SubmittedSnapshot {
  fields: BriefFields;
  snapshot: BriefDesignSnapshot;
  metrics: FoldMetrics;
  receiptText: string;
}

export const BriefForm: React.FC = () => {
  const {
    design,
    view,
    effectiveOpening,
    effectivePose,
    env,
    uploadedArt,
    getLiveOpening,
  } = useFold();

  const [fields, setFields] = useState<BriefFields>({
    projectName: '',
    room: '',
    notes: '',
  });
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<'editing' | 'preparing' | 'ready'>(
    'editing',
  );
  const [submitted, setSubmitted] = useState<SubmittedSnapshot | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const roomSelectRef = useRef<HTMLSelectElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prepareTimerRef = useRef<number>(0);
  const activeUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (prepareTimerRef.current) clearTimeout(prepareTimerRef.current);
      if (activeUrlRef.current) URL.revokeObjectURL(activeUrlRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'preparing') return;

    const validationErrors = validateBrief(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.projectName) {
        nameInputRef.current?.focus();
      } else if (validationErrors.room) {
        roomSelectRef.current?.focus();
      } else if (validationErrors.notes) {
        notesInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const liveOpening = getLiveOpening();
    const capturedSnapshot: BriefDesignSnapshot = {
      design: {
        ...design,
        opening: liveOpening,
      },
      view: { ...view },
      uploadedImageName:
        design.print === 'upload' && uploadedArt ? uploadedArt.filename : null,
    };
    const capturedPose = deriveFold(liveOpening);
    const cleanFields: BriefFields = {
      projectName: fields.projectName.trim(),
      room: fields.room,
      notes: fields.notes.trim(),
    };
    const receiptText = buildBriefText(
      cleanFields,
      capturedSnapshot,
      capturedPose.metrics,
    );

    const finalize = () => {
      setSubmitted({
        fields: cleanFields,
        snapshot: capturedSnapshot,
        metrics: capturedPose.metrics,
        receiptText,
      });
      setStatus('ready');
      setAnnouncement('Your room brief is ready.');
      requestAnimationFrame(() => {
        successHeadingRef.current?.focus();
      });
    };

    if (env.reducedMotion) {
      finalize();
    } else {
      setStatus('preparing');
      prepareTimerRef.current = window.setTimeout(finalize, 220);
    }
  };

  const handleDownload = () => {
    if (!submitted) return;
    if (activeUrlRef.current) {
      URL.revokeObjectURL(activeUrlRef.current);
    }
    const blob = new Blob([submitted.receiptText], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    activeUrlRef.current = url;

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'serraform-room-brief.txt';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.setTimeout(() => {
      if (activeUrlRef.current === url) {
        URL.revokeObjectURL(url);
        activeUrlRef.current = null;
      }
    }, 1000);
  };

  const handleEdit = () => {
    setStatus('editing');
    requestAnimationFrame(() => {
      nameInputRef.current?.focus();
    });
  };

  if (status === 'ready' && submitted) {
    const snapDesign = submitted.snapshot.design;
    const snapPrintSpec = PRINT_SPECS[snapDesign.print];
    return (
      <div className="srf-receipt-card p-6 sm:p-8" data-testid="brief-receipt">
        <div className="srf-receipt-corner" aria-hidden="true" />

        <div className="inline-flex items-center gap-2 text-[var(--srf-oxblood)] srf-mono-caption mb-3">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--srf-sage)]/45">
            <Check className="w-3.5 h-3.5 text-[var(--srf-oxblood)]" aria-hidden="true" />
          </span>
          <span>Prepared locally · Nothing was sent</span>
        </div>

        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="srf-h3 text-[var(--srf-oxblood)] mb-2 focus:outline-none"
        >
          Your room brief is ready.
        </h3>
        <p className="text-[var(--srf-mauve)] text-base mb-6">
          Your design, shape, and notes are gathered below. Download a copy to keep them.
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-5 border-y border-[var(--srf-hairline)] text-sm">
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Project name</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] break-words">
              {submitted.fields.projectName}
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Room</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {submitted.fields.room}
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Base color</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                style={{ backgroundColor: snapDesign.baseHex }}
                aria-hidden="true"
              />
              <span>{formatColorWithPreset(snapDesign.baseHex)}</span>
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {snapPrintSpec.name}
            </dd>
          </div>
          {usesActivePrintColor(snapDesign) && (
            <div>
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print color</dt>
              <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                  style={{ backgroundColor: snapDesign.designHex }}
                  aria-hidden="true"
                />
                <span>{formatColorWithPreset(snapDesign.designHex)}</span>
              </dd>
            </div>
          )}
          {snapPrintSpec.usesScale && (
            <div>
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">
                {snapPrintSpec.scaleLabel}
              </dt>
              <dd className="font-medium text-[var(--srf-oxblood)]">
                {Math.round(snapDesign.motifScale)}%
              </dd>
            </div>
          )}
          {submitted.snapshot.uploadedImageName && (
            <div className="sm:col-span-2">
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Your image</dt>
              <dd className="font-medium text-[var(--srf-oxblood)] break-words">
                {submitted.snapshot.uploadedImageName} (local session only)
              </dd>
            </div>
          )}
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Opening</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {Math.round(snapDesign.opening)}%
            </dd>
          </div>
          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Outer span / depth</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {formatMeters(submitted.metrics.outerSpan)} ×{' '}
              {formatMeters(submitted.metrics.outerDepth)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Preview angle</dt>
            <dd className="font-medium text-[var(--srf-oxblood)]">
              {formatViewSummary(submitted.snapshot.view)}
            </dd>
          </div>
          {submitted.fields.notes.length > 0 && (
            <div className="sm:col-span-2">
              <dt className="srf-mono-caption text-[var(--srf-mauve)]">Notes</dt>
              <dd className="font-normal text-[var(--srf-oxblood)] whitespace-pre-wrap break-words mt-1">
                {submitted.fields.notes}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="srf-btn-primary"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download brief</span>
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="srf-btn-secondary"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span>Edit brief</span>
          </button>
        </div>

        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    );
  }

  const printSpec = PRINT_SPECS[design.print];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      <div className="lg:col-span-7 space-y-6">
        <div>
          <label
            htmlFor="srf-project-name"
            className="block text-base font-medium text-[var(--srf-oxblood)] mb-2"
          >
            Project name
          </label>
          <input
            ref={nameInputRef}
            id="srf-project-name"
            name="projectName"
            type="text"
            required
            maxLength={80}
            value={fields.projectName}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, projectName: val }));
              if (errors.projectName) {
                setErrors((prev) => ({ ...prev, projectName: undefined }));
              }
            }}
            aria-invalid={errors.projectName ? 'true' : undefined}
            aria-describedby={
              errors.projectName ? 'srf-project-name-error' : undefined
            }
            placeholder="e.g. Studio North Reading Room"
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)] placeholder:text-[var(--srf-mauve)]/65"
          />
          {errors.projectName && (
            <p
              id="srf-project-name-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.projectName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="srf-room-type"
            className="block text-base font-medium text-[var(--srf-oxblood)] mb-2"
          >
            Room
          </label>
          <select
            ref={roomSelectRef}
            id="srf-room-type"
            name="room"
            required
            value={fields.room}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, room: val }));
              if (errors.room) {
                setErrors((prev) => ({ ...prev, room: undefined }));
              }
            }}
            aria-invalid={errors.room ? 'true' : undefined}
            aria-describedby={errors.room ? 'srf-room-error' : undefined}
            className="w-full min-h-[48px] px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)]"
          >
            <option value="">Select a room type</option>
            {ROOM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.room && (
            <p
              id="srf-room-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.room}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label
              htmlFor="srf-notes"
              className="block text-base font-medium text-[var(--srf-oxblood)]"
            >
              Notes
            </label>
            <span className="srf-mono-caption text-[var(--srf-mauve)]">
              {fields.notes.length}/500
            </span>
          </div>
          <textarea
            ref={notesInputRef}
            id="srf-notes"
            name="notes"
            rows={4}
            value={fields.notes}
            onChange={(e) => {
              const val = e.target.value;
              setFields((prev) => ({ ...prev, notes: val }));
              if (errors.notes) {
                setErrors((prev) => ({ ...prev, notes: undefined }));
              }
            }}
            aria-invalid={errors.notes ? 'true' : undefined}
            aria-describedby={errors.notes ? 'srf-notes-error' : undefined}
            placeholder="Optional placement notes, daylight direction, or furniture clearance."
            className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-[var(--srf-oxblood)] placeholder:text-[var(--srf-mauve)]/65"
          />
          {errors.notes && (
            <p
              id="srf-notes-error"
              className="mt-1.5 text-sm font-medium text-[var(--srf-clay)]"
            >
              {errors.notes}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'preparing'}
            className="srf-btn-primary"
          >
            <span>
              {status === 'preparing' ? 'Preparing…' : 'Build your room brief'}
            </span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </button>

          <p className="srf-mono-caption text-[var(--srf-mauve)]">
            Prepared locally. Nothing is sent.
          </p>
        </div>
      </div>

      {/* Live studio configuration summary alongside form */}
      <aside
        aria-label="Current Fold 16 design configuration"
        data-testid="brief-live-summary"
        className="lg:col-span-5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] p-6"
      >
        <div className="srf-mono-caption text-[var(--srf-mauve)] mb-3">
          Included design
        </div>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="w-6 h-6 rounded-full border border-[var(--srf-oxblood)]/20 shrink-0"
            style={{ backgroundColor: design.baseHex }}
            aria-hidden="true"
          />
          <div className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--srf-oxblood)]">
            Fold {FOLD_CONSTANTS.panels} · {printSpec.name}
          </div>
        </div>

        <dl className="space-y-3 border-t border-[var(--srf-hairline)] pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Base color</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatColorWithPreset(design.baseHex)}
            </dd>
          </div>
          {usesActivePrintColor(design) && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">Print color</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
                {formatColorWithPreset(design.designHex)}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Print</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {printSpec.name}
            </dd>
          </div>
          {printSpec.usesScale && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">{printSpec.scaleLabel}</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
                {design.motifScale}%
              </dd>
            </div>
          )}
          {design.print === 'upload' && uploadedArt && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--srf-mauve)]">Your image</dt>
              <dd className="srf-mono-dim text-[var(--srf-oxblood)] truncate max-w-[200px]">
                {uploadedArt.filename}
              </dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Opening</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {Math.round(effectiveOpening)}%
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Outer span</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatMeters(effectivePose.metrics.outerSpan)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--srf-mauve)]">Outer depth</dt>
            <dd className="srf-mono-dim text-[var(--srf-oxblood)]">
              {formatMeters(effectivePose.metrics.outerDepth)}
            </dd>
          </div>
        </dl>
      </aside>
    </form>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/motion/math.ts">
<![CDATA[export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(edge0) || !Number.isFinite(edge1)) {
    return 0;
  }
  if (edge1 === edge0) return x >= edge1 ? 1 : 0;
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function damp(current: number, target: number, lambda: number, dt: number): number {
  if (!Number.isFinite(current)) return target;
  if (!Number.isFinite(target)) return current;
  if (!Number.isFinite(dt) || dt <= 0) return current;
  const factor = 1 - Math.exp(-lambda * dt);
  return current + (target - current) * factor;
}

export function boundedProgress(value: number, start: number, end: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(start) || !Number.isFinite(end)) {
    return 0;
  }
  if (end <= start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/motion/Reveal.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  role?: 'rise' | 'clip';
  delayMs?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  role = 'rise',
  delayMs = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={role}
      data-revealed={revealed ? 'true' : 'false'}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/motion/useReducedMotion.ts">
<![CDATA[import { useEffect, useState } from 'react';

export function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/BriefSection.tsx">
<![CDATA['use client';

import React from 'react';
import { BriefForm } from '../forms/BriefForm';

export const BriefSection: React.FC = () => {
  return (
    <section
      id="brief"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="max-w-[660px] mb-10">
          <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
            Room brief
          </div>
          <h2
            id="brief-heading"
            tabIndex={-1}
            className="srf-h2 text-[var(--srf-oxblood)] text-balance mb-4 focus:outline-none"
          >
            Start with the room you have.
          </h2>
          <p className="text-[var(--srf-mauve)] max-w-[50ch]">
            Keep your chosen shape, custom palette, print, and placement notes together in a local room brief.
          </p>
        </div>

        <BriefForm />
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/Construction.tsx">
<![CDATA['use client';

import React, { useId } from 'react';
import { CreaseMarker } from '../brand/Logo';
import { PALETTE } from '../fold/config';
import { deriveFold } from '../fold/geometry';
import { Reveal } from '../motion/Reveal';

const TopDownDiagram: React.FC = () => {
  const pose = deriveFold(50);
  const w = 520;
  const h = 220;
  const scale = 230;
  const cx = w * 0.5;
  const cy = h * 0.5;

  const toPt = (p: { x: number; z: number }) =>
    `${(cx + p.x * scale).toFixed(1)},${(cy + p.z * scale).toFixed(1)}`;

  const polygonPoints = [
    ...pose.front.map(toPt),
    ...[...pose.back].reverse().map(toPt),
  ].join(' ');

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Top-down zigzag plan diagram of sixteen connected panels"
    >
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <line
        x1="40"
        y1={cy}
        x2={w - 40}
        y2={cy}
        stroke={PALETTE.porcelain}
        strokeOpacity="0.16"
        strokeDasharray="4 4"
      />
      <polygon
        points={polygonPoints}
        fill={PALETTE.clay}
        stroke={PALETTE.porcelain}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {pose.hinges.map((pt, i) => (
        <circle
          key={i}
          cx={cx + pt.x * scale}
          cy={cy + pt.z * scale}
          r="2.4"
          fill={PALETTE.porcelain}
        />
      ))}
      <text
        x="24"
        y={h - 18}
        fill={PALETTE.porcelain}
        fillOpacity="0.72"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Plan view · 16 panels · 180 mm pitch
      </text>
    </svg>
  );
};

const MacroPleatDetail: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const weaveId = `srf-felt-weave-${uid}`;
  const w = 520;
  const h = 220;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Close material study of three matte felt pleats showing 12 mm edge thickness"
    >
      <defs>
        <pattern id={weaveId} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="transparent" />
          <circle cx="3" cy="4" r="0.6" fill={PALETTE.porcelain} fillOpacity="0.12" />
          <circle cx="9" cy="8" r="0.6" fill={PALETTE.oxblood} fillOpacity="0.18" />
          <circle cx="6" cy="2" r="0.5" fill={PALETTE.porcelain} fillOpacity="0.08" />
        </pattern>
      </defs>
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <polygon points="70,40 200,28 200,220 70,220" fill="#7D362F" />
      <polygon points="200,28 330,68 330,220 200,220" fill={PALETTE.clay} />
      <polygon points="330,68 450,34 450,220 330,220" fill="#AF594F" />
      <polygon
        points="70,40 200,28 330,68 450,34 450,24 330,58 200,18 70,30"
        fill="#C97368"
      />
      <rect width={w} height={h} fill={`url(#${weaveId})`} />
      <line x1="200" y1="28" x2="200" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="330" y1="68" x2="330" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.35" strokeWidth="1.5" />
      <text
        x="24"
        y={h - 18}
        fill={PALETTE.porcelain}
        fillOpacity="0.72"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Surface study · Matte wool felt · 12 mm edge
      </text>
    </svg>
  );
};

const SupportSectionDiagram: React.FC = () => {
  const w = 520;
  const h = 220;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Section drawing of the slim steel floor support seated beneath the end fold"
    >
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <line
        x1="36"
        y1="168"
        x2={w - 36}
        y2="168"
        stroke={PALETTE.porcelain}
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <rect
        x="244"
        y="24"
        width="32"
        height="130"
        fill={PALETTE.clay}
        stroke={PALETTE.porcelain}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <rect
        x="110"
        y="154"
        width="300"
        height="14"
        rx="5"
        fill={PALETTE.porcelain}
        fillOpacity="0.16"
        stroke={PALETTE.porcelain}
        strokeWidth="1.4"
      />
      <line x1="110" y1="184" x2="410" y2="184" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line x1="110" y1="178" x2="110" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line x1="410" y1="178" x2="410" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <text
        x="260"
        y="202"
        textAnchor="middle"
        fill={PALETTE.porcelain}
        fillOpacity="0.82"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Support depth 380 mm · Height 12 mm
      </text>
    </svg>
  );
};

const CONSTRUCTION_ROWS = [
  {
    index: '01',
    title: 'A continuous profile.',
    body: 'Sixteen connected panels make one continuous silhouette where patterns travel across every fold.',
    Diagram: TopDownDiagram,
  },
  {
    index: '02',
    title: 'A tactile surface.',
    body: 'A matte felt grain keeps custom colors and printed illustrations soft and sculptural.',
    Diagram: MacroPleatDetail,
  },
  {
    index: '03',
    title: 'A grounded stance.',
    body: 'Slim floor supports sit beneath the first and last folds.',
    Diagram: SupportSectionDiagram,
  },
] as const;

const SPEC_ITEMS = [
  { label: 'Height', value: '1,600 mm' },
  { label: 'Panel pitch', value: '180 mm' },
  { label: 'Developed length', value: '2,880 mm' },
  { label: 'Model thickness', value: '12 mm' },
] as const;

export const Construction: React.FC = () => {
  return (
    <section
      id="construction"
      className="srf-dark-surface relative bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] pt-20 pb-24 lg:pt-28 lg:pb-32 scroll-mt-20"
    >
      <div className="srf-container">
        <div className="mb-14 max-w-[680px]">
          <div className="mb-3 srf-mono-caption text-[var(--srf-rose)]/75">
            Construction
          </div>
          <h2 className="srf-h2 text-[var(--srf-porcelain)] text-balance">
            The detail is in the fold.
          </h2>
        </div>

        <div className="divide-y divide-[var(--srf-hairline-dark)] border-t border-b border-[var(--srf-hairline-dark)]">
          {CONSTRUCTION_ROWS.map((row, idx) => {
            const Diagram = row.Diagram;
            return (
              <Reveal
                key={row.index}
                role="rise"
                delayMs={idx * 60}
                className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <CreaseMarker
                    index={row.index}
                    className="text-[var(--srf-flax)] mb-3"
                  />
                  <h3 className="srf-h3 text-[var(--srf-porcelain)] mb-3">
                    {row.title}
                  </h3>
                  <p className="text-[var(--srf-rose)]/85 max-w-[42ch]">
                    {row.body}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="aspect-[21/9] rounded-[8px] border border-[var(--srf-hairline-dark)] overflow-hidden">
                    <Diagram />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[var(--srf-hairline-dark)]">
          {SPEC_ITEMS.map((spec) => (
            <div key={spec.label}>
              <div className="srf-mono-caption text-[var(--srf-rose)]/75 mb-1">
                {spec.label}
              </div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--srf-porcelain)] tabular-nums">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 srf-mono-caption text-[var(--srf-rose)]/75 max-w-[64ch]">
          Outer span is calculated directly from opening across the constant 2,880 mm developed length. These are concept parameters.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--srf-rose)]"
        style={{
          clipPath: 'polygon(0 100%, 48px 0, 100% 0, 100% 100%)',
        }}
      />
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/FoldingExperience.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import { CreaseMarker } from '../brand/Logo';
import { Configurator } from '../fold/Configurator';
import { FOLD_CONSTANTS, PRINT_SPECS, STORY_CHAPTERS } from '../fold/config';
import { useFold } from '../fold/FoldProvider';
import { FoldStage } from '../fold/FoldStage';
import { FoldStillCanvas } from '../fold/FoldStillCanvas';
import { storyChapter, storyOpening, storyProgress } from '../fold/story';

export const FoldingExperience: React.FC = () => {
  const { design, view, uploadedArt, env, pushStoryFrame } = useFold();
  const foldSectionRef = useRef<HTMLElement>(null);

  // Subtle non-blocking scroll story across #fold (keeps initial Hero at 50% opening until visitor enters #fold)
  useEffect(() => {
    if (!env.enhancedDesktop) return;
    const sectionEl = foldSectionRef.current;
    if (!sectionEl) return;

    let rafId = 0;
    const syncFromScroll = () => {
      rafId = 0;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const start = window.scrollY + rect.top - vh * 0.55;
      if (window.scrollY <= Math.max(40, start)) {
        pushStoryFrame(FOLD_CONSTANTS.defaultOpening, 0);
        return;
      }
      const end = start + Math.max(320, rect.height);
      const p = storyProgress(window.scrollY, start, end);
      pushStoryFrame(storyOpening(p), storyChapter(p));
    };

    const onScroll = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(syncFromScroll);
    };

    syncFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [env.enhancedDesktop, pushStoryFrame]);

  const printName = PRINT_SPECS[design.print].name;

  return (
    <>
      {/* Concise editorial story strip (#fold) without oversized scroll spacers */}
      <section
        id="fold"
        ref={foldSectionRef}
        className="py-12 lg:py-16 border-b border-[var(--srf-hairline)] scroll-mt-20"
      >
        <div className="srf-container">
          <div className="mb-8 max-w-[660px]">
            <div className="mb-2 srf-mono-caption text-[var(--srf-mauve)]">
              The fold
            </div>
            <h2 className="srf-h2 text-[var(--srf-oxblood)] text-balance">
              One continuous surface. Sixteen pleats.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORY_CHAPTERS.map((item) => (
              <article
                key={item.index}
                className="flex flex-col border-t border-[var(--srf-hairline)] pt-4"
              >
                <div className="aspect-[16/10] w-full rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden mb-3.5 bg-[var(--srf-rose)]">
                  <FoldStillCanvas
                    opening={item.sampleOpening}
                    design={design}
                    view={view}
                    uploadedBitmap={uploadedArt?.bitmap ?? null}
                    showBracket={false}
                  />
                </div>
                <CreaseMarker
                  index={item.index}
                  className="text-[var(--srf-mauve)] mb-1.5"
                />
                <h3 className="text-lg font-medium text-[var(--srf-oxblood)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[var(--srf-mauve)]">
                  {item.body}
                </p>
                <span className="mt-2 srf-mono-caption text-[var(--srf-mauve)]">
                  {item.sampleOpening}% open · {printName}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Divider Design Studio workspace (#configure) */}
      <section
        id="configure"
        className="py-10 lg:py-16 border-b border-[var(--srf-hairline)] scroll-mt-20"
      >
        <div className="srf-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Stage: 60% desktop sticky left, tablet normal stacked, mobile 216px sticky below 64px header (disabled <=580px tall) */}
            <div className="lg:col-span-7 srf-studio-stage-wrap">
              <div className="h-full w-full">
                <FoldStage
                  hostId="studio"
                  showStoryBadge={true}
                  showSpanBracket={true}
                />
              </div>
            </div>

            {/* Compact interactive control rail */}
            <div className="lg:col-span-5">
              <Configurator />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/Footer.tsx">
<![CDATA['use client';

import React from 'react';
import { Logo } from '../brand/Logo';
import { NAV_ITEMS } from '../fold/config';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 lg:py-16 bg-[var(--srf-rose)] text-[var(--srf-oxblood)]">
      <div className="srf-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--srf-hairline)]">
          <div>
            <Logo tone="dark" />
            <p className="mt-2 text-sm text-[var(--srf-mauve)]">
              A little fold. A different room.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="srf-text-link text-sm"
              >
                {item.label}
              </a>
            ))}
            <a href="#disclosure" className="srf-text-link text-sm">
              About this demo
            </a>
            <a href="#top" className="srf-text-link text-sm">
              Back to top
            </a>
          </nav>
        </div>

        <div id="disclosure" className="pt-6 scroll-mt-20">
          <p className="srf-mono-caption text-[var(--srf-mauve)] max-w-[70ch]">
            SERRAFORM is a fictional design concept. Uploaded images and room briefs stay in your browser session; nothing is collected or sent.
          </p>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/Header.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { NAV_ITEMS } from '../fold/config';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        menuBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[var(--srf-rose)] transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[var(--srf-hairline)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="srf-container h-16 md:h-20 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="inline-flex items-center min-h-[44px] focus-visible:rounded-[4px]"
        >
          <Logo tone="dark" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden min-[900px]:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="srf-text-link text-[15px] whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-[900px]:flex items-center shrink-0">
          <a href="#configure" className="srf-btn-primary">
            <span>Design your divider</span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={menuBtnRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="srf-mobile-drawer"
          className="min-[900px]:hidden inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[var(--srf-hairline-strong)] text-[var(--srf-oxblood)]"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div
          id="srf-mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-[var(--srf-rose)] flex flex-col justify-between p-6 min-[900px]:hidden"
        >
          <div className="flex items-center justify-between h-12">
            <Logo tone="dark" />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuBtnRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[var(--srf-hairline-strong)] text-[var(--srf-oxblood)]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col gap-3 my-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="py-3 border-b border-[var(--srf-hairline)] font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--srf-oxblood)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pb-4">
            <a
              href="#configure"
              onClick={handleNavClick}
              className="srf-btn-primary w-full"
            >
              <span>Design your divider</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/Hero.tsx">
<![CDATA['use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { AdvancedStudioDrawer } from '../fold/AdvancedStudioDrawer';
import { useFold } from '../fold/FoldProvider';
import { FoldStage } from '../fold/FoldStage';
import { AdvancedDrawerSection, HeroStudioDock } from '../fold/HeroStudioDock';
import { RoomScene2D5 } from '../fold/room/RoomScene2D5';
import { deriveRoomScene } from '../fold/room/deriveRoomScene';
import { useHarmonizedRoomVars } from '../fold/room/paletteCssVars';
import type { RoomLightingState } from '../fold/FoldScene';

export const Hero: React.FC = () => {
  const { demoActive, design, view, effectiveOpening, uploadedArt, env, replayFoldSequence } =
    useFold();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<AdvancedDrawerSection>('all');
  const [heroAnnouncement, setHeroAnnouncement] = useState('');
  const [fullBleedHostEl, setFullBleedHostEl] = useState<HTMLDivElement | null>(null);
  const shapeInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const roomRecipe = useMemo(
    () =>
      deriveRoomScene({
        design: {
          ...design,
          opening: effectiveOpening,
        },
        view,
        hasUpload: Boolean(uploadedArt),
      }),
    [design, effectiveOpening, view, uploadedArt],
  );

  const isDarkRoom = roomRecipe.palette.isDarkEnvelope;

  useHarmonizedRoomVars(sectionRef, roomRecipe.palette, env.reducedMotion);

  const roomLighting = useMemo<RoomLightingState>(
    () => ({
      lightTint: roomRecipe.palette.lightTint,
      ambientTint: roomRecipe.palette.ambientTint,
      shadowTint: roomRecipe.palette.shadowTint,
      floorBase: roomRecipe.palette.floorBase,
      isDarkEnvelope: roomRecipe.palette.isDarkEnvelope,
    }),
    [
      roomRecipe.palette.lightTint,
      roomRecipe.palette.ambientTint,
      roomRecipe.palette.shadowTint,
      roomRecipe.palette.floorBase,
      roomRecipe.palette.isDarkEnvelope,
    ],
  );

  const openDrawer = useCallback((section: AdvancedDrawerSection = 'all') => {
    setDrawerSection(section);
    setDrawerOpen(true);
  }, []);

  const handleDesignInHero = () => {
    openDrawer('all');
  };

  const handleSeeHowItFolds = () => {
    if (env.reducedMotion) {
      const target = document.getElementById('fold');
      target?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setHeroAnnouncement('Jumped to The fold section.');
      return;
    }
    replayFoldSequence();
    setHeroAnnouncement(
      'Demonstrating mechanical folding across all sixteen connected panels.',
    );
  };

  const handleSectionPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (env.reducedMotion || env.isCoarsePointer || e.pointerType !== 'mouse') return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    el.style.setProperty('--room-pointer-x', nx.toFixed(3));
  };

  const handleSectionPointerLeave = () => {
    sectionRef.current?.style.setProperty('--room-pointer-x', '0');
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      data-testid="hero-section"
      data-dark-envelope={isDarkRoom ? 'true' : 'false'}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="srf-hero-section relative pt-3 pb-6 lg:pt-4 lg:pb-6 border-b border-[var(--srf-hairline)] overflow-x-clip"
    >
      {/* Dynamic coded 2.5D architectural living-room studio driven by the divider */}
      <RoomScene2D5 />

      {/* Full-bleed WebGL & 2D Still layer spanning 100% of the Hero independently of editorial containers */}
      <div
        ref={setFullBleedHostEl}
        data-testid="hero-fullbleed-scene-layer"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      />

      <div className="srf-container relative z-10 pointer-events-none">
        {/* Main Atelier Composition: Editorial Column (~33%) + Large Frameless 3D Centerpiece (~67%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Top/Left: Editorial Headline, Copy, Primary & Secondary CTAs */}
          <div className="lg:col-span-4 min-w-0 flex flex-col justify-center pointer-events-auto">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-2">
              <p
                className="srf-mono-caption tracking-[0.06em]"
                style={{ color: 'var(--room-text-secondary)' }}
              >
                SERRAFORM / FOLD 16
              </p>
              <span
                aria-hidden="true"
                className="srf-mono-caption opacity-50"
                style={{ color: 'var(--room-text-secondary)' }}
              >
                ·
              </span>
              <p
                data-testid="hero-room-mood"
                className="srf-mono-caption uppercase tracking-[0.05em] font-medium"
                style={{ color: 'var(--room-text-primary)' }}
              >
                {roomRecipe.code} / {roomRecipe.name}
              </p>
            </div>

            <h1
              className="srf-h1-studio mb-3.5 text-balance"
              style={{ color: 'var(--room-text-primary)' }}
            >
              <span className="block overflow-hidden">
                <span className="block srf-hero-line-1">Make room</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block srf-hero-line-2">for your imagination.</span>
              </span>
            </h1>

            <p
              className="srf-hero-lead text-[15px] leading-6 sm:text-[17px] sm:leading-[26px] max-w-[40ch] mb-4"
              style={{ color: 'var(--room-text-secondary)' }}
            >
              Shape the fold, choose your colors, and make a divider that feels
              at home in your space.
            </p>


            {/* Primary CTA + Secondary mechanical fold demo CTA */}
            <div className="srf-hero-actions hidden lg:flex flex-wrap items-center gap-3 mb-4">
              <button
                type="button"
                onClick={handleDesignInHero}
                className="srf-btn-primary"
              >
                <span>Design your divider</span>
                <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-pressed={demoActive}
                onClick={handleSeeHowItFolds}
                className={`srf-btn-secondary !min-h-[48px] ${
                  isDarkRoom
                    ? '!text-[#F8F2EE] !border-[#F8F2EE]/35 hover:!border-[#F8F2EE] hover:!bg-white/10'
                    : ''
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                <span>{demoActive ? 'Unfolding divider…' : 'See how it folds'}</span>
              </button>
            </div>

          </div>

          {/* Center-Right: Large, Unboxed 3D Fold 16 Centerpiece integrated in living room */}
          <div className="lg:col-span-8 min-w-0">
            <div className="h-[340px] sm:h-[440px] lg:h-[min(610px,calc(100svh-236px))] lg:min-h-[480px] w-full">
              <FoldStage
                hostId="hero"
                variant="atelier"
                darkSurface={isDarkRoom}
                roomLighting={roomLighting}
                showStoryBadge={false}
                showSpanBracket={true}
                canvasPortalEl={fullBleedHostEl}
                useFullBleedPortal={true}
              />
            </div>
          </div>

          {/* Mobile/Tablet CTA row placed directly beneath the dedicated model stage */}
          <div className="lg:hidden flex flex-wrap items-center gap-2.5 pt-1 pointer-events-auto">
            <button
              type="button"
              onClick={handleDesignInHero}
              className="srf-btn-primary flex-1 sm:flex-initial"
            >
              <span>Design your divider</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-pressed={demoActive}
              onClick={handleSeeHowItFolds}
              className={`srf-btn-secondary !min-h-[48px] ${
                isDarkRoom
                  ? '!text-[#F8F2EE] !border-[#F8F2EE]/35 hover:!border-[#F8F2EE] hover:!bg-white/10'
                  : ''
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
              <span>{demoActive ? 'Unfolding…' : 'See how it folds'}</span>
            </button>
          </div>
        </div>

        {/* Floating Atelier Studio Control Dock (Shape, Base Color, Print, View + Advanced Drawer trigger) */}
        <div className="mt-3.5 lg:mt-3 pointer-events-auto">
          <HeroStudioDock
            onOpenAdvanced={openDrawer}
            shapeInputRef={shapeInputRef}
          />
        </div>
      </div>

      {/* Expandable Advanced Studio Drawer sharing live FoldProvider state */}
      <AdvancedStudioDrawer
        open={drawerOpen}
        initialSection={drawerSection}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="sr-only" aria-live="polite">
        {heroAnnouncement}
      </div>
    </section>
  );
};

]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/Questions.tsx">
<![CDATA['use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../fold/config';

export const Questions: React.FC = () => {
  return (
    <section
      id="questions"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
          <div className="lg:col-span-4">
            <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
              Questions
            </div>
            <h2 className="srf-h2 text-[var(--srf-oxblood)] text-balance">
              Practical notes.
            </h2>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="srf-faq-item group">
                  <summary className="srf-faq-summary">
                    <span>{item.question}</span>
                    <Plus
                      className="srf-faq-icon text-[var(--srf-oxblood)]"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="srf-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/sections/RoomStudies.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { PALETTE, PRINT_SPECS, ROOM_STUDIES } from '../fold/config';
import { useFold } from '../fold/FoldProvider';
import { FoldStillCanvas } from '../fold/FoldStillCanvas';
import type { DesignState } from '../fold/state';
import { Reveal } from '../motion/Reveal';

const RoomSceneFrame: React.FC<{
  studyId: (typeof ROOM_STUDIES)[number]['id'];
  opening: number;
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale'>;
  uploadedBitmap?: ImageBitmap | null;
  ariaLabel: string;
}> = ({ studyId, opening, design, uploadedBitmap = null, ariaLabel }) => {
  const width = 960;
  const height = 720;

  return (
    <div
      className="relative w-full h-full bg-[#EFE2DD] overflow-hidden"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Architectural room backdrop layer */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block pointer-events-none"
      >
        <rect width={width} height={height} fill="#EFE2DD" />
        <rect
          x="0"
          y={height * 0.56}
          width={width}
          height={height * 0.44}
          fill={PALETTE.rose}
        />
        <line
          x1="0"
          y1={height * 0.56}
          x2={width}
          y2={height * 0.56}
          stroke={PALETTE.oxblood}
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        {studyId === 'morning' && (
          <polygon
            points={`${width * 0.14},${height * 0.08} ${width * 0.52},${height * 0.08} ${width * 0.76},${height * 0.88} ${width * 0.24},${height * 0.88}`}
            fill={PALETTE.porcelain}
            fillOpacity="0.46"
          />
        )}

        {studyId === 'reading' && (
          <g>
            <rect
              x={width * 0.07}
              y={height * 0.67}
              width={width * 0.13}
              height={height * 0.075}
              rx="4"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.22"
            />
            <rect
              x={width * 0.10}
              y={height * 0.63}
              width={width * 0.07}
              height={height * 0.04}
              rx="2"
              fill={PALETTE.clay}
              fillOpacity="0.65"
            />
            <rect
              x={width * 0.76}
              y={height * 0.48}
              width={width * 0.17}
              height={height * 0.21}
              rx="24"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.24"
            />
            <rect
              x={width * 0.74}
              y={height * 0.58}
              width={width * 0.20}
              height={height * 0.12}
              rx="14"
              fill="#E7D8D3"
              stroke={PALETTE.oxblood}
              strokeOpacity="0.24"
            />
            <line
              x1={width * 0.78}
              y1={height * 0.70}
              x2={width * 0.78}
              y2={height * 0.77}
              stroke={PALETTE.oxblood}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={width * 0.90}
              y1={height * 0.70}
              x2={width * 0.90}
              y2={height * 0.77}
              stroke={PALETTE.oxblood}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {studyId === 'studio' && (
          <g>
            <rect
              x={width * 0.05}
              y={height * 0.56}
              width={width * 0.24}
              height={9}
              rx="2"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.28"
            />
            <line
              x1={width * 0.08}
              y1={height * 0.56 + 9}
              x2={width * 0.08}
              y2={height * 0.69}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <line
              x1={width * 0.26}
              y1={height * 0.56 + 9}
              x2={width * 0.26}
              y2={height * 0.69}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <rect
              x={width * 0.70}
              y={height * 0.68}
              width={width * 0.24}
              height={10}
              rx="2"
              fill={PALETTE.porcelain}
              stroke={PALETTE.oxblood}
              strokeOpacity="0.28"
            />
            <line
              x1={width * 0.73}
              y1={height * 0.68 + 10}
              x2={width * 0.73}
              y2={height * 0.82}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
            <line
              x1={width * 0.91}
              y1={height * 0.68 + 10}
              x2={width * 0.91}
              y2={height * 0.82}
              stroke={PALETTE.oxblood}
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>

      {/* Live / example textured Fold 16 composite */}
      <div className="absolute inset-x-[6%] top-[6%] bottom-[8%] pointer-events-none">
        <FoldStillCanvas
          opening={opening}
          design={design}
          view="quarter"
          uploadedBitmap={uploadedBitmap}
          showBracket={false}
          background={null}
        />
      </div>
    </div>
  );
};

export const RoomStudies: React.FC = () => {
  const { design, uploadedArt } = useFold();
  const statementRef = useRef<HTMLDivElement>(null);
  const [emphasisProgress, setEmphasisProgress] = useState(0);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setEmphasisProgress(1);
      return;
    }

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / (vh * 0.4)));
      setEmphasisProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [reading, studio, morning] = ROOM_STUDIES;
  const livePrintSpec = PRINT_SPECS[design.print];
  const livePrintHexNote =
    design.print === 'solid' || (design.print === 'upload' && !design.tintUpload)
      ? ''
      : ` / ${design.designHex}`;
  const liveCaption = `Live study · ${livePrintSpec.name} · ${design.baseHex}${livePrintHexNote} at ${reading.opening}%`;

  return (
    <section
      id="rooms"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
          In a room · Concept room studies
        </div>

        <div ref={statementRef} className="relative mb-12 lg:mb-16 max-w-[900px]">
          <h2 className="srf-h2 text-[var(--srf-oxblood)]">
            <span className="block">Keep the room open.</span>
            <span className="block">Give each moment a place.</span>
          </h2>
          <p
            aria-hidden="true"
            className="srf-h2 text-[var(--srf-clay)] absolute inset-0 pointer-events-none select-none transition-opacity duration-300"
            style={{
              clipPath: `inset(0 ${Math.round((1 - emphasisProgress) * 100)}% 0 0)`,
            }}
          >
            <span className="block">Keep the room open.</span>
            <span className="block">Give each moment a place.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* 1. Live custom user design study */}
          <Reveal role="clip" className="lg:col-span-8">
            <figure data-testid="room-study-live">
              <div className="aspect-[4/3] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden">
                <RoomSceneFrame
                  studyId={reading.id}
                  opening={reading.opening}
                  design={design}
                  uploadedBitmap={uploadedArt?.bitmap ?? null}
                  ariaLabel={`Concept room study: ${reading.title}, showing your live Fold 16 design (${livePrintSpec.name}, base ${design.baseHex}) at ${reading.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                    {reading.title}
                  </h3>
                  <p className="text-[var(--srf-mauve)] text-base">
                    {reading.copy}
                  </p>
                </div>
                <span className="srf-mono-caption text-[var(--srf-oxblood)] shrink-0">
                  {liveCaption}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* 2. Fixed architectural example study (Stripes) */}
          <Reveal role="clip" delayMs={80} className="lg:col-span-4">
            <figure className="h-full flex flex-col">
              <div className="aspect-[3/4] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden flex-1">
                <RoomSceneFrame
                  studyId={studio.id}
                  opening={studio.opening}
                  design={studio.fixedDesign}
                  ariaLabel={`Concept room example: ${studio.title}, Fold 16 in Stripes at ${studio.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4">
                <div className="srf-mono-caption text-[var(--srf-mauve)] mb-1">
                  {studio.caption}
                </div>
                <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                  {studio.title}
                </h3>
                <p className="text-[var(--srf-mauve)] text-base">
                  {studio.copy}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          {/* 3. Fixed architectural example study (Waves) */}
          <Reveal role="clip" delayMs={120} className="lg:col-span-12 pt-4">
            <figure>
              <div className="aspect-[16/9] lg:aspect-[21/9] rounded-[8px] border border-[var(--srf-hairline)] overflow-hidden">
                <RoomSceneFrame
                  studyId={morning.id}
                  opening={morning.opening}
                  design={morning.fixedDesign}
                  ariaLabel={`Concept room example: ${morning.title}, Fold 16 in Waves at ${morning.opening}% opening`}
                />
              </div>
              <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-medium text-[var(--srf-oxblood)]">
                    {morning.title}
                  </h3>
                  <p className="text-[var(--srf-mauve)] text-base">
                    {morning.copy}
                  </p>
                </div>
                <span className="srf-mono-caption text-[var(--srf-mauve)] shrink-0">
                  {morning.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/deriveRoomScene.ts">
<![CDATA[import { DEFAULT_DESIGN, DEFAULT_VIEW, PrintId, ViewState } from '../config';
import { normalizeOpening } from '../geometry';
import { DesignState, normalizeElevationDeg, normalizeMotifScale, normalizeYawDeg } from '../state';
import { harmonizeRoomPalette, HarmonizedRoomPalette, RoomFamilyId } from './paletteHarmonizer';
import { PRINT_TO_ROOM_FAMILY, ROOM_FAMILIES } from './sceneFamilies';

export interface RoomSpatialMetrics {
  spread: number; // 0..1 normalized fold openness driving floor rug & prop spacing
  stageDepth: number; // 0.9..1.25 subtle depth emphasis from camera elevation & openness
  cameraBiasX: number; // -1..1 parallax bias derived from view yawDeg (without fighting orbit drag)
  horizonLiftPx: number; // subtle vertical floor shift in px derived from camera elevationDeg
  motifRatio: number; // 0.5..2.0 normalized motif scale affecting architectural rhythm
}

export interface RoomSceneRecipe {
  family: RoomFamilyId;
  code: string;
  name: string;
  subtitle: string;
  palette: HarmonizedRoomPalette;
  spatial: RoomSpatialMetrics;
  decorVariant: string;
  lightingMode: string;
  transitionSignature: string;
}

export interface DeriveRoomSceneInput {
  design: Pick<DesignState, 'opening' | 'baseHex' | 'designHex' | 'print' | 'motifScale'>;
  view?: ViewState;
  hasUpload?: boolean;
}

/**
 * Pure deterministic function deriving the complete 2.5D room environment from the
 * single authoritative divider configuration. Zero randomness, zero DOM reads.
 */
export function deriveRoomScene(input: DeriveRoomSceneInput): RoomSceneRecipe {
  const printId: PrintId =
    input.design.print in PRINT_TO_ROOM_FAMILY
      ? input.design.print
      : DEFAULT_DESIGN.print;

  // If print === 'upload' or custom image active, always route cleanly to CuratedStudio
  const family: RoomFamilyId =
    printId === 'upload'
      ? 'curatedStudio'
      : PRINT_TO_ROOM_FAMILY[printId];

  const meta = ROOM_FAMILIES[family];
  const opening = normalizeOpening(input.design.opening);
  const spread = opening / 100;

  const motifScale = normalizeMotifScale(input.design.motifScale);
  const motifRatio = motifScale / 100;

  const view = input.view ?? DEFAULT_VIEW;
  const yawDeg = normalizeYawDeg(view.yawDeg);
  const elevDeg = normalizeElevationDeg(view.elevationDeg);

  // Bounded sin-based horizontal parallax hint across 360° yaw (gentle ±1.0 range)
  const yawRad = (yawDeg * Math.PI) / 180;
  const cameraBiasX = Math.sin(yawRad);

  // Slight elevation-linked horizon lift so divider feet and floor perspective remain anchored
  const elevNorm = (elevDeg - 18) / 12; // approx -1.08 .. +1.0
  const horizonLiftPx = Math.round(elevNorm * 14);
  const stageDepth = Number((0.94 + spread * 0.16 + Math.abs(elevNorm) * 0.06).toFixed(3));

  const palette = harmonizeRoomPalette(
    family,
    input.design.baseHex,
    input.design.designHex,
  );

  return {
    family,
    code: meta.code,
    name: meta.name,
    subtitle: meta.subtitle,
    palette,
    spatial: {
      spread,
      stageDepth,
      cameraBiasX,
      horizonLiftPx,
      motifRatio,
    },
    decorVariant: meta.decorVariant,
    lightingMode: meta.lightingMode,
    transitionSignature: meta.transitionSignature,
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/paletteCssVars.ts">
<![CDATA[import { useLayoutEffect, useRef } from 'react';
import {
  interpolateRoomPaletteLabs,
  paletteToOklabMap,
  type RoomPalette,
} from './paletteHarmonizer';

/**
 * Writes every semantic and legacy `--room-*` CSS custom property from a
 * harmonized RoomPalette onto a DOM host element in one batched update.
 */
export function applyRoomPaletteCssVars(el: HTMLElement, palette: RoomPalette): void {
  const s = el.style;
  s.setProperty('--room-wall-base', palette.wallBase);
  s.setProperty('--room-wall-highlight', palette.wallHighlight);
  s.setProperty('--room-wall-shadow', palette.wallShadow);
  s.setProperty('--room-floor-base', palette.floorBase);
  s.setProperty('--room-floor-far', palette.floorFar);
  s.setProperty('--room-floor-detail', palette.floorDetail);

  s.setProperty('--room-rug', palette.rug);
  s.setProperty('--room-rug-trim', palette.rugTrim);
  s.setProperty('--room-textile-primary', palette.textilePrimary);
  s.setProperty('--room-textile-secondary', palette.textileSecondary);
  s.setProperty('--room-furniture', palette.furniture);
  s.setProperty('--room-furniture-leg', palette.furnitureLeg);
  s.setProperty('--room-decor-primary', palette.decorPrimary);
  s.setProperty('--room-decor-accent', palette.decorAccent);
  s.setProperty('--room-trim', palette.architecturalTrim);
  s.setProperty('--room-foliage', palette.foliage);

  s.setProperty('--room-light-tint', palette.lightTint);
  s.setProperty('--room-ambient-tint', palette.ambientTint);
  s.setProperty('--room-shadow-tint', palette.shadowTint);
  s.setProperty('--room-quiet-bg', palette.quietZoneBg);

  s.setProperty('--room-ui-accent', palette.uiAccent);
  s.setProperty('--room-ui-accent-hover', palette.uiAccentHover);
  s.setProperty('--room-ui-accent-text', palette.uiAccentText);
  s.setProperty('--room-ui-outline', palette.uiOutline);
  s.setProperty('--room-text-primary', palette.textPrimary);
  s.setProperty('--room-text-secondary', palette.textSecondary);

  // Legacy aliases consumed by existing CSS rules
  s.setProperty('--room-wall', palette.wall);
  s.setProperty('--room-wall-upper', palette.wallUpper);
  s.setProperty('--room-wall-alcove', palette.wallAlcove);
  s.setProperty('--room-floor', palette.floor);
  s.setProperty('--room-decor-secondary', palette.decorSecondary);
  s.setProperty('--room-light-warm', palette.lightWarm);
  s.setProperty('--room-shadow', palette.shadow);
}

const PALETTE_TRANSITION_MS = 740;

/**
 * Drives smooth, interruptible OKLab color interpolation across all CSS custom
 * properties directly on `targetRef.current` with zero React re-renders and zero
 * first-paint color flash.
 */
export function useHarmonizedRoomVars(
  targetRef: React.RefObject<HTMLElement | null>,
  targetPalette: RoomPalette,
  reducedMotion: boolean,
): void {
  const currentPaletteRef = useRef<RoomPalette>(targetPalette);
  const hasMountedRef = useRef(false);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    if (!hasMountedRef.current || reducedMotion) {
      hasMountedRef.current = true;
      currentPaletteRef.current = targetPalette;
      applyRoomPaletteCssVars(el, targetPalette);
      return;
    }

    const fromLabs = paletteToOklabMap(currentPaletteRef.current);
    const toLabs = paletteToOklabMap(targetPalette);
    const startMs = performance.now();

    const step = (now: number) => {
      const node = targetRef.current;
      if (!node) {
        rafRef.current = 0;
        return;
      }

      const rawT = Math.min(1, Math.max(0, (now - startMs) / PALETTE_TRANSITION_MS));
      const eased = 1 - Math.pow(1 - rawT, 3);
      const snapshot = interpolateRoomPaletteLabs(fromLabs, toLabs, eased, {
        isDarkEnvelope: rawT >= 0.45 ? targetPalette.isDarkEnvelope : currentPaletteRef.current.isDarkEnvelope,
      });
      currentPaletteRef.current = snapshot;
      applyRoomPaletteCssVars(node, snapshot);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        currentPaletteRef.current = targetPalette;
        applyRoomPaletteCssVars(node, targetPalette);
        rafRef.current = 0;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };
  }, [targetRef, targetPalette, reducedMotion]);
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/paletteHarmonizer.ts">
<![CDATA[import { hexToRgb, mixHex, normalizeHex, relativeLuminance, rgbToHex } from '../color';

export interface OklchColor {
  l: number; // 0..1
  c: number; // 0..0.37
  h: number; // 0..360 deg
}

export interface OklabColor {
  l: number;
  a: number;
  b: number;
}

export type RoomFamilyId =
  | 'botanicalAtelier'
  | 'editorialLoft'
  | 'panoramaSalon'
  | 'sculptedCoastalRoom'
  | 'architecturalShowroom'
  | 'curatedStudio';

export type DividerPrintName =
  | 'Bloom'
  | 'Stripes'
  | 'Landscape'
  | 'Waves'
  | 'Solid'
  | 'Custom';

export interface DividerConfig {
  baseColor: string;
  designColor: string;
  print: DividerPrintName | 'bloom' | 'stripes' | 'landscape' | 'waves' | 'solid' | 'upload';
  openness: number;
  view: string;
  motifScale?: number;
  customImageUrl?: string;
}

export interface RoomPalette {
  // Architectural walls & surfaces
  wallBase: string;
  wallHighlight: string;
  wallShadow: string;
  floorBase: string;
  floorFar: string;
  floorDetail: string;

  // Textiles, furniture & architectural trim
  rug: string;
  rugTrim: string;
  textilePrimary: string;
  textileSecondary: string;
  furniture: string;
  furnitureLeg: string;
  decorPrimary: string;
  decorAccent: string;
  architecturalTrim: string;
  foliage: string;

  // Atmospheric lighting & shadows (shared between 2.5D CSS/SVG & Three.js lights)
  lightTint: string;
  ambientTint: string;
  shadowTint: string;
  quietZoneBg: string;

  // Scoped Hero UI chrome & WCAG AA typography
  uiAccent: string;
  uiAccentHover: string;
  uiAccentText: string;
  uiOutline: string;
  textPrimary: string;
  textSecondary: string;
  isDarkEnvelope: boolean;

  // Legacy aliases kept in sync for downstream consumers
  wall: string;
  wallUpper: string;
  wallAlcove: string;
  floor: string;
  trim: string;
  decorSecondary: string;
  lightWarm: string;
  shadow: string;
}

export type HarmonizedRoomPalette = RoomPalette;

function srgbToLinear(c255: number): number {
  const c = c255 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(lin: number): number {
  const clamped = Math.max(0, Math.min(1, lin));
  const v =
    clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(v * 255);
}

function oklchToLinearRgb(l: number, c: number, hDeg: number): [number, number, number] {
  const hRad = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const lr = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  return [lr, lg, lb];
}

function inSrgbGamut(lr: number, lg: number, lb: number): boolean {
  const eps = 1e-4;
  return (
    lr >= -eps && lr <= 1 + eps &&
    lg >= -eps && lg <= 1 + eps &&
    lb >= -eps && lb <= 1 + eps
  );
}

export function hexToOklab(hexInput: string): OklabColor {
  const norm = normalizeHex(hexInput) ?? '#D8C4A7';
  const { r, g, b } = hexToRgb(norm);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const lCone = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const mCone = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const sCone = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    l: 0.2104542553 * lCone + 0.793617785 * mCone - 0.0040720468 * sCone,
    a: 1.9779984951 * lCone - 2.428592205 * mCone + 0.4505937099 * sCone,
    b: 0.0259040371 * lCone + 0.7827717662 * mCone - 0.808675766 * sCone,
  };
}

export function oklabToHex(lab: OklabColor): string {
  const C = Math.hypot(lab.a, lab.b);
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return oklchToHex({ l: lab.l, c: C, h: H });
}

export function hexToOklch(hexInput: string): OklchColor {
  const lab = hexToOklab(hexInput);
  const C = Math.hypot(lab.a, lab.b);
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    l: Math.max(0, Math.min(1, lab.l)),
    c: Math.max(0, C),
    h: C < 1e-4 ? 42 : H,
  };
}

/**
 * Converts OKLCH to sRGB hex while preserving perceptual hue and lightness via
 * binary-search chroma reduction when out-of-gamut.
 */
export function oklchToHex(color: OklchColor): string {
  const L = Math.max(0, Math.min(1, Number.isFinite(color.l) ? color.l : 0.85));
  const targetC = Math.max(0, Math.min(0.37, Number.isFinite(color.c) ? color.c : 0));
  const H = Number.isFinite(color.h) ? ((color.h % 360) + 360) % 360 : 0;

  if (L <= 0.001) return '#000000';
  if (L >= 0.999) return '#FFFFFF';

  const [lr0, lg0, lb0] = oklchToLinearRgb(L, targetC, H);
  if (inSrgbGamut(lr0, lg0, lb0)) {
    return rgbToHex(linearToSrgb(lr0), linearToSrgb(lg0), linearToSrgb(lb0));
  }

  // Binary search maximum in-gamut chroma at exact L & H so hue never drifts
  let lo = 0;
  let hi = targetC;
  for (let i = 0; i < 14; i += 1) {
    const mid = (lo + hi) * 0.5;
    const [lr, lg, lb] = oklchToLinearRgb(L, mid, H);
    if (inSrgbGamut(lr, lg, lb)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const [lr, lg, lb] = oklchToLinearRgb(L, lo, H);
  return rgbToHex(linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb));
}

function clampOklch(l: number, c: number, h: number): string {
  return oklchToHex({
    l: Math.max(0.05, Math.min(0.988, l)),
    c: Math.max(0, Math.min(0.22, c)),
    h,
  });
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function shortestHueDelta(fromDeg: number, toDeg: number): number {
  return (((toDeg - fromDeg) % 360) + 540) % 360 - 180;
}

function blendHue(fromDeg: number, toDeg: number, t: number): number {
  return wrapHue(fromDeg + shortestHueDelta(fromDeg, toDeg) * t);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function pickBestReadableText(bgHex: string, tintHue: number): { primary: string; secondary: string; darkBg: boolean } {
  const bg = hexToOklch(bgHex);
  const darkBg = relativeLuminance(bgHex) < 0.24 || bg.l < 0.54;
  if (darkBg) {
    const primary = clampOklch(0.962, Math.min(0.012, bg.c * 0.25), tintHue);
    const secondary = clampOklch(0.82, Math.min(0.018, bg.c * 0.35), tintHue);
    return {
      primary: contrastRatio(primary, bgHex) >= 4.5 ? primary : '#FAF6F3',
      secondary: contrastRatio(secondary, bgHex) >= 4.5 ? secondary : '#DDD6D2',
      darkBg: true,
    };
  }
  // Light room: deep rich charcoal/espresso/plum tinted subtly to harmonize with baseHue while guaranteeing >= 7:1
  const deepTinted = clampOklch(0.24, Math.min(0.045, bg.c * 0.55 + 0.015), tintHue);
  const secondaryTinted = clampOklch(0.41, Math.min(0.036, bg.c * 0.45 + 0.012), tintHue);
  return {
    primary: contrastRatio(deepTinted, bgHex) >= 5.2 ? deepTinted : '#24181C',
    secondary: contrastRatio(secondaryTinted, bgHex) >= 4.5 ? secondaryTinted : '#4E4145',
    darkBg: false,
  };
}

function resolveFamilyFromPrint(print: DividerConfig['print']): RoomFamilyId {
  switch (print) {
    case 'Bloom':
    case 'bloom':
      return 'botanicalAtelier';
    case 'Stripes':
    case 'stripes':
      return 'editorialLoft';
    case 'Landscape':
    case 'landscape':
      return 'panoramaSalon';
    case 'Waves':
    case 'waves':
      return 'sculptedCoastalRoom';
    case 'Solid':
    case 'solid':
      return 'architecturalShowroom';
    case 'Custom':
    case 'upload':
    default:
      return 'curatedStudio';
  }
}

interface FamilyStylingBias {
  wallLightDelta: number;
  wallChromaFactor: number;
  floorLightDelta: number;
  floorChromaFactor: number;
  alcoveContrast: number;
  darkThreshold: number;
  neutralLightness: number;
}

const FAMILY_BIASES: Record<RoomFamilyId, FamilyStylingBias> = {
  botanicalAtelier: {
    wallLightDelta: 0.01,
    wallChromaFactor: 1.02,
    floorLightDelta: -0.01,
    floorChromaFactor: 1.0,
    alcoveContrast: 0.065,
    darkThreshold: 0.24,
    neutralLightness: 0.915,
  },
  editorialLoft: {
    wallLightDelta: -0.015,
    wallChromaFactor: 0.88,
    floorLightDelta: -0.025,
    floorChromaFactor: 0.85,
    alcoveContrast: 0.075,
    darkThreshold: 0.34,
    neutralLightness: 0.895,
  },
  panoramaSalon: {
    wallLightDelta: 0.0,
    wallChromaFactor: 0.94,
    floorLightDelta: -0.018,
    floorChromaFactor: 0.95,
    alcoveContrast: 0.072,
    darkThreshold: 0.24,
    neutralLightness: 0.905,
  },
  sculptedCoastalRoom: {
    wallLightDelta: 0.015,
    wallChromaFactor: 1.0,
    floorLightDelta: 0.0,
    floorChromaFactor: 0.92,
    alcoveContrast: 0.068,
    darkThreshold: 0.24,
    neutralLightness: 0.918,
  },
  architecturalShowroom: {
    wallLightDelta: 0.01,
    wallChromaFactor: 0.92,
    floorLightDelta: -0.015,
    floorChromaFactor: 0.9,
    alcoveContrast: 0.064,
    darkThreshold: 0.24,
    neutralLightness: 0.915,
  },
  curatedStudio: {
    wallLightDelta: 0.005,
    wallChromaFactor: 0.9,
    floorLightDelta: -0.012,
    floorChromaFactor: 0.88,
    alcoveContrast: 0.06,
    darkThreshold: 0.24,
    neutralLightness: 0.91,
  },
};

/**
 * Single authoritative perceptual palette engine: derives the entire surrounding
 * 2.5D architectural room, floor, rugs, textiles, furniture, decor, lighting,
 * shadows, and scoped Hero UI chrome from the divider's exact baseColor & designColor.
 *
 * Prints select the architectural room family (geometry & staging), never lock colors.
 */
export function deriveRoomPalette(config: DividerConfig): RoomPalette {
  const family = resolveFamilyFromPrint(config.print);
  return harmonizeRoomPalette(family, config.baseColor, config.designColor);
}

export function harmonizeRoomPalette(
  family: RoomFamilyId,
  baseHexInput: string,
  designHexInput: string,
): RoomPalette {
  const baseHex = normalizeHex(baseHexInput) ?? '#D8C4A7';
  const designHex = normalizeHex(designHexInput) ?? '#4B202A';

  const base = hexToOklch(baseHex);
  const accent = hexToOklch(designHex);
  const bias = FAMILY_BIASES[family];

  const isAchromaticBase = base.c < 0.014;
  const isAchromaticAccent = accent.c < 0.014;

  // Preserve actual base hue without pulling toward beige; achromatic bases softly echo design hue or warm mineral limestone
  const baseHue = isAchromaticBase
    ? (isAchromaticAccent ? 46 : accent.h)
    : base.h;
  const accentHue = isAchromaticAccent
    ? blendHue(baseHue, 18, 0.25)
    : accent.h;

  // Deep obsidian/charcoal loft or ultra-dark showroom/salon triggers an intentional dark architectural envelope
  const isDarkEnvelope = base.l < bias.darkThreshold;

  // Subtle natural-material balancing hue (never locks room to beige; bends slightly toward natural wood/stone only at 15-22%)
  const stoneHue = blendHue(baseHue, 52, isAchromaticBase ? 0.35 : 0.16);
  const baseChromaNorm = isAchromaticBase ? 0.005 : base.c;

  let wallBase: string;
  let wallHighlight: string;
  let wallShadow: string;
  let floorBase: string;
  let floorFar: string;
  let floorDetail: string;
  let rug: string;
  let rugTrim: string;
  let textilePrimary: string;
  let textileSecondary: string;
  let furniture: string;
  let furnitureLeg: string;
  let decorPrimary: string;
  let decorAccent: string;
  let architecturalTrim: string;
  let foliage: string;
  let lightTint: string;
  let ambientTint: string;
  let shadowTint: string;

  if (isDarkEnvelope) {
    // Rich moody architectural envelope tuned so a dark/black divider still separates crisply via backlights & floor tonal separation
    const envChroma = isAchromaticBase
      ? 0.006
      : Math.min(0.036, base.c * 0.38 + 0.008);
    const baseWallL = Math.max(0.22, Math.min(0.32, 0.23 + base.l * 0.22));
    wallBase = clampOklch(baseWallL, envChroma, baseHue);
    wallHighlight = clampOklch(baseWallL + 0.055, envChroma * 0.9, baseHue);
    wallShadow = clampOklch(baseWallL + 0.09, envChroma * 1.15, baseHue);

    floorBase = clampOklch(Math.max(0.16, baseWallL - 0.065), envChroma * 0.85, stoneHue);
    floorFar = clampOklch(Math.max(0.19, baseWallL - 0.03), envChroma * 0.9, stoneHue);
    floorDetail = clampOklch(baseWallL + 0.14, envChroma * 0.7, stoneHue);

    // Contrasting warm/tinted woven rug & drapery keep silhouette of dark divider unmistakable
    rug = clampOklch(0.42, Math.min(0.032, envChroma * 1.1 + 0.008), stoneHue);
    rugTrim = clampOklch(
      isAchromaticAccent && accent.l > 0.78
        ? Math.min(0.88, accent.l * 0.85)
        : Math.max(0.56, Math.min(0.82, accent.l * 0.7 + 0.16)),
      isAchromaticAccent ? 0.014 : Math.min(0.09, accent.c * 0.7 + 0.016),
      isAchromaticAccent ? 68 : accentHue,
    );
    textilePrimary = clampOklch(0.37, Math.min(0.038, envChroma * 1.15 + 0.006), baseHue);
    textileSecondary = clampOklch(
      isAchromaticAccent && accent.l > 0.78 ? 0.64 : 0.5,
      Math.min(0.036, envChroma + 0.01),
      blendHue(stoneHue, baseHue, 0.28),
    );

    furniture = clampOklch(0.44, Math.min(0.038, envChroma + 0.012), stoneHue);
    furnitureLeg = clampOklch(0.62, Math.min(0.042, accent.c * 0.38 + 0.014), blendHue(stoneHue, accentHue, 0.35));

    const darkEnvDecorL =
      isAchromaticAccent && accent.l > 0.78
        ? Math.min(0.9, accent.l * 0.88)
        : Math.max(0.52, Math.min(0.8, accent.l * 0.74 + 0.2));
    const darkEnvDecorC = isAchromaticAccent
      ? 0.014
      : Math.min(0.105, accent.c * 0.74 + 0.022);
    const darkEnvDecorHue = isAchromaticAccent ? 68 : accentHue;

    decorPrimary = clampOklch(darkEnvDecorL, darkEnvDecorC, darkEnvDecorHue);
    decorAccent = clampOklch(
      Math.min(0.95, Math.max(0.62, darkEnvDecorL + 0.08)),
      isAchromaticAccent ? 0.012 : Math.min(0.115, darkEnvDecorC * 1.1),
      darkEnvDecorHue,
    );

    architecturalTrim = clampOklch(0.56, Math.min(0.055, accent.c * 0.5 + 0.016), blendHue(baseHue, accentHue, 0.45));
    const leafHue = blendHue(138, accentHue, 0.28);
    foliage = clampOklch(0.62, Math.min(0.05, accent.c * 0.4 + 0.024), leafHue);

    lightTint = clampOklch(0.95, Math.min(0.024, envChroma * 0.7 + 0.008), blendHue(baseHue, 58, 0.4));
    ambientTint = clampOklch(0.36, Math.min(0.035, envChroma * 1.1 + 0.008), baseHue);
    shadowTint = clampOklch(0.1, Math.min(0.02, envChroma * 0.6), baseHue);
  } else {
    // Daylight harmonized atelier: ~60% dominant baseHue wall/floor, ~30% ivory/stone neutral anchor, ~10% designColor accent
    // Notice wall lightness tracks base lightness gently so white (#FFF) stays crisp alabaster (~0.955),
    // deep saturated picks sit around ~0.83..0.86, and vivid picks keep tasteful interior-plaster chroma (0.032..0.062)
    // so divider ALWAYS pops cleanly while the whole room visibly shares its chromatic DNA!
    const isNearWhite = isAchromaticBase && base.l > 0.92;
    const baseWallL = isNearWhite
      ? 0.958
      : Math.max(0.81, Math.min(0.935, 0.825 + base.l * 0.095 + bias.wallLightDelta));

    const wallChroma = isAchromaticBase
      ? (isAchromaticAccent ? 0.004 : Math.min(0.012, accent.c * 0.14))
      : Math.min(0.062, (baseChromaNorm * 0.28 + 0.016) * bias.wallChromaFactor);

    wallBase = clampOklch(baseWallL, wallChroma, baseHue);
    wallHighlight = clampOklch(Math.min(0.985, baseWallL + 0.036), wallChroma * 0.68, baseHue);
    wallShadow = clampOklch(
      Math.max(0.71, baseWallL - bias.alcoveContrast),
      Math.min(0.078, wallChroma * 1.28 + (isAchromaticBase ? 0.004 : 0.008)),
      baseHue,
    );

    // Floor: grounded mid-light mineral/terrazzo/wood harmonized directly with baseHue (never disconnected beige)
    const floorL = isNearWhite
      ? 0.855
      : Math.max(0.69, Math.min(0.835, baseWallL - 0.115 + bias.floorLightDelta));
    const floorChroma = isAchromaticBase
      ? wallChroma * 1.1
      : Math.min(0.056, (baseChromaNorm * 0.24 + 0.014) * bias.floorChromaFactor);

    floorBase = clampOklch(floorL, floorChroma, blendHue(baseHue, stoneHue, 0.22));
    floorFar = clampOklch(Math.min(0.92, floorL + 0.052), floorChroma * 0.84, blendHue(baseHue, stoneHue, 0.18));
    floorDetail = clampOklch(Math.max(0.5, floorL - 0.13), Math.min(0.05, floorChroma * 1.15), baseHue);

    // Woven rug & drapery textiles: airy ivory/stone anchor with visible hue echo + designColor border
    const rugL = isNearWhite ? 0.97 : Math.max(0.87, Math.min(0.95, baseWallL + 0.028));
    rug = clampOklch(rugL, Math.min(0.032, wallChroma * 0.56), baseHue);
    rugTrim = isAchromaticAccent
      ? clampOklch(
          accent.l > 0.8 ? Math.min(0.93, accent.l * 0.91) : 0.42,
          Math.min(0.024, wallChroma * 0.8),
          accent.l > 0.8 ? 68 : baseHue,
        )
      : clampOklch(Math.max(0.46, Math.min(0.76, accent.l * 0.68 + 0.16)), Math.min(0.08, accent.c * 0.6 + 0.014), accentHue);

    textilePrimary = clampOklch(
      Math.max(0.79, baseWallL - 0.035),
      Math.min(0.052, wallChroma * 0.95 + (isAchromaticBase ? 0.003 : 0.006)),
      baseHue,
    );
    textileSecondary = clampOklch(
      Math.max(0.75, Math.min(0.89, baseWallL - 0.05)),
      Math.min(0.044, wallChroma * 0.82),
      blendHue(baseHue, accentHue, 0.25),
    );

    // Furniture / timber ledges / plinths: believable natural stone or toned wood blended into the base room hue
    furniture = clampOklch(
      isNearWhite ? 0.84 : Math.max(0.68, Math.min(0.83, baseWallL - 0.1)),
      Math.min(0.04, wallChroma * 0.72 + 0.006),
      stoneHue,
    );
    furnitureLeg = clampOklch(
      0.46,
      Math.min(0.048, wallChroma * 0.8 + 0.012),
      blendHue(stoneHue, accentHue, 0.3),
    );

    // Design-color-driven intentional 10% decorative accents (vases, art bars, cushions, swatch chips)
    const accentTargetL = accent.l < 0.24
      ? 0.32
      : accent.l > 0.84
        ? Math.min(0.94, accent.l * 0.92)
        : Math.max(0.36, Math.min(0.78, accent.l * 0.74 + 0.14));
    const accentTargetC = isAchromaticAccent
      ? (accent.l > 0.8 ? 0.01 : Math.min(0.032, baseChromaNorm * 0.3 + 0.008))
      : Math.min(0.12, accent.c * 0.7 + 0.02);
    const daylightAccentHue = isAchromaticAccent ? 68 : accentHue;

    decorPrimary = clampOklch(accentTargetL, accentTargetC, daylightAccentHue);
    decorAccent = clampOklch(
      Math.max(0.38, Math.min(0.96, accentTargetL > 0.8 ? accentTargetL - 0.06 : accentTargetL + 0.09)),
      isAchromaticAccent ? accentTargetC : Math.min(0.13, accentTargetC * 1.15),
      daylightAccentHue,
    );

    // Trim & baseboard: mid-tone architectural bridge between wall hue and accent hue
    architecturalTrim = clampOklch(
      0.56,
      Math.min(0.058, Math.max(wallChroma, accentTargetC * 0.55) + 0.01),
      blendHue(baseHue, accentHue, isAchromaticAccent ? 0.1 : 0.42),
    );

    // Botanical foliage: adapts gently so pink/blue/green/amber rooms feel styled together
    const rawLeafHue = isAchromaticBase
      ? 138
      : blendHue(138, baseHue, 0.32);
    foliage = clampOklch(
      0.57,
      Math.min(0.056, baseChromaNorm * 0.35 + 0.026),
      rawLeafHue,
    );

    // Directional sun & bounce lighting tinted gently by baseHue
    lightTint = clampOklch(
      0.975,
      isAchromaticBase ? 0.004 : Math.min(0.024, wallChroma * 0.42 + 0.004),
      blendHue(baseHue, 58, 0.35),
    );
    ambientTint = clampOklch(
      Math.max(0.74, baseWallL - 0.08),
      Math.min(0.045, wallChroma * 0.88),
      baseHue,
    );
    shadowTint = clampOklch(
      0.27,
      Math.min(0.048, wallChroma * 0.8 + 0.01),
      blendHue(baseHue, accentHue, 0.32),
    );
  }

  // Quiet left-side veil behind headline + WCAG AA accessible text
  const quietZoneBg = isDarkEnvelope
    ? mixHex(wallBase, '#161315', 0.34)
    : mixHex(wallBase, wallHighlight, 0.48);

  const { primary: textPrimary, secondary: textSecondary } = pickBestReadableText(
    quietZoneBg,
    isAchromaticBase ? accentHue : baseHue,
  );

  // Scoped hero UI accent & outline with guaranteed >= 4.5:1 button contrast
  let uiAccent: string;
  let uiAccentHover: string;
  let uiAccentText: string;
  let uiOutline: string;

  if (isDarkEnvelope) {
    // Rich luminous accent button against dark charcoal/obsidian room
    const lightBtnBase = clampOklch(
      0.86,
      Math.min(0.045, accent.c * 0.45 + 0.014),
      isAchromaticAccent ? 44 : accentHue,
    );
    uiAccent = lightBtnBase;
    uiAccentHover = clampOklch(0.92, Math.min(0.04, accent.c * 0.4 + 0.01), isAchromaticAccent ? 44 : accentHue);
    uiAccentText = clampOklch(0.2, 0.028, baseHue);
    uiOutline = clampOklch(0.32, Math.min(0.06, accent.c * 0.55 + 0.016), isAchromaticAccent ? baseHue : accentHue);
  } else {
    // Deep saturated architectural pill/CTA matching divider palette against light walls & #FAF2EE dock
    const uiHue = !isAchromaticBase ? baseHue : !isAchromaticAccent ? accentHue : 20;
    const uiChroma = isAchromaticBase && isAchromaticAccent
      ? 0.018
      : Math.min(0.115, Math.max(base.c, accent.c) * 0.62 + 0.036);
    let candidate = clampOklch(0.42, uiChroma, uiHue);
    // Guarantee >= 4.5:1 for #FFFCF8 CTA label
    for (let step = 0; step < 6 && contrastRatio('#FFFCF8', candidate) < 4.7; step += 1) {
      const c = hexToOklch(candidate);
      candidate = clampOklch(Math.max(0.24, c.l - 0.045), c.c * 0.9, c.h);
    }
    uiAccent = candidate;
    const cBtn = hexToOklch(candidate);
    uiAccentHover = clampOklch(Math.max(0.2, cBtn.l - 0.065), cBtn.c, cBtn.h);
    uiAccentText = '#FFFCF8';

    // Dock selection outline must contrast sharply against #FAF2EE dock background
    let outlineCand = clampOklch(0.28, Math.min(0.075, uiChroma * 0.72), uiHue);
    if (contrastRatio(outlineCand, '#FAF2EE') < 6.0) {
      outlineCand = '#2A1D21';
    }
    uiOutline = outlineCand;
  }

  return {
    wallBase,
    wallHighlight,
    wallShadow,
    floorBase,
    floorFar,
    floorDetail,
    rug,
    rugTrim,
    textilePrimary,
    textileSecondary,
    furniture,
    furnitureLeg,
    decorPrimary,
    decorAccent,
    architecturalTrim,
    foliage,
    lightTint,
    ambientTint,
    shadowTint,
    quietZoneBg,
    uiAccent,
    uiAccentHover,
    uiAccentText,
    uiOutline,
    textPrimary,
    textSecondary,
    isDarkEnvelope,
    // Legacy aliases
    wall: wallBase,
    wallUpper: wallHighlight,
    wallAlcove: wallShadow,
    floor: floorBase,
    trim: architecturalTrim,
    decorSecondary: furniture,
    lightWarm: lightTint,
    shadow: shadowTint,
  };
}

const INTERPOLATED_KEYS = [
  'wallBase',
  'wallHighlight',
  'wallShadow',
  'floorBase',
  'floorFar',
  'floorDetail',
  'rug',
  'rugTrim',
  'textilePrimary',
  'textileSecondary',
  'furniture',
  'furnitureLeg',
  'decorPrimary',
  'decorAccent',
  'architecturalTrim',
  'foliage',
  'lightTint',
  'ambientTint',
  'shadowTint',
  'quietZoneBg',
  'uiAccent',
  'uiAccentHover',
  'uiAccentText',
  'uiOutline',
  'textPrimary',
  'textSecondary',
] as const;

export type InterpolatedPaletteKey = (typeof INTERPOLATED_KEYS)[number];
export type RoomPaletteLabs = Record<InterpolatedPaletteKey, OklabColor>;

export function paletteToOklabMap(palette: RoomPalette): RoomPaletteLabs {
  const map = {} as RoomPaletteLabs;
  for (const key of INTERPOLATED_KEYS) {
    map[key] = hexToOklab(palette[key]);
  }
  return map;
}

/**
 * Smoothly interpolates between two OKLab palette snapshots at progress u in [0, 1]
 * and materializes a synchronized RoomPalette without muddying intermediate hues.
 */
export function interpolateRoomPaletteLabs(
  fromLabs: RoomPaletteLabs,
  toLabs: RoomPaletteLabs,
  u: number,
  targetMeta: Pick<RoomPalette, 'isDarkEnvelope'>,
): RoomPalette {
  const k = Math.max(0, Math.min(1, u));
  const out = {} as Record<InterpolatedPaletteKey, string>;
  for (const key of INTERPOLATED_KEYS) {
    const a = fromLabs[key];
    const b = toLabs[key];
    out[key] = oklabToHex({
      l: a.l + (b.l - a.l) * k,
      a: a.a + (b.a - a.a) * k,
      b: a.b + (b.b - a.b) * k,
    });
  }

  return {
    ...out,
    isDarkEnvelope: targetMeta.isDarkEnvelope,
    wall: out.wallBase,
    wallUpper: out.wallHighlight,
    wallAlcove: out.wallShadow,
    floor: out.floorBase,
    trim: out.architecturalTrim,
    decorSecondary: out.furniture,
    lightWarm: out.lightTint,
    shadow: out.shadowTint,
  };
}
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/RoomScene2D5.tsx">
<![CDATA['use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFold } from '../FoldProvider';
import { deriveRoomScene } from './deriveRoomScene';
import type { RoomFamilyId } from './paletteHarmonizer';
import { ArchitecturalShowroom } from './layers/ArchitecturalShowroom';
import { BotanicalAtelier } from './layers/BotanicalAtelier';
import { CuratedStudio } from './layers/CuratedStudio';
import { EditorialLoft } from './layers/EditorialLoft';
import { PanoramaSalon } from './layers/PanoramaSalon';
import { SculptedCoastalRoom } from './layers/SculptedCoastalRoom';

interface RoomSlot {
  family: RoomFamilyId;
  key: number;
}

interface RoomScene2D5Props {
  pointerOffset?: { x: number; y: number };
}

function renderFamilyLayer(family: RoomFamilyId, motifRatio: number): React.ReactNode {
  switch (family) {
    case 'botanicalAtelier':
      return <BotanicalAtelier />;
    case 'editorialLoft':
      return <EditorialLoft motifRatio={motifRatio} />;
    case 'panoramaSalon':
      return <PanoramaSalon />;
    case 'sculptedCoastalRoom':
      return <SculptedCoastalRoom />;
    case 'architecturalShowroom':
      return <ArchitecturalShowroom />;
    case 'curatedStudio':
    default:
      return <CuratedStudio />;
  }
}

export const RoomScene2D5: React.FC<RoomScene2D5Props> = ({
  pointerOffset = { x: 0, y: 0 },
}) => {
  const {
    design,
    view,
    env,
    effectiveOpening,
    uploadedArt,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const recipe = useMemo(
    () =>
      deriveRoomScene({
        design: {
          ...design,
          opening: effectiveOpening,
        },
        view,
        hasUpload: Boolean(uploadedArt),
      }),
    [design, effectiveOpening, view, uploadedArt],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keySeqRef = useRef(1);

  const [activeSlot, setActiveSlot] = useState<RoomSlot>({
    family: recipe.family,
    key: 1,
  });
  const [exitingSlot, setExitingSlot] = useState<RoomSlot | null>(null);

  // Interruptible latest-input-wins architectural room family transitions
  useEffect(() => {
    if (recipe.family === activeSlot.family) return;

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    const nextKey = ++keySeqRef.current;

    if (env.reducedMotion) {
      setExitingSlot(null);
      setActiveSlot({ family: recipe.family, key: nextKey });
      return;
    }

    setExitingSlot(activeSlot);
    setActiveSlot({ family: recipe.family, key: nextKey });

    exitTimerRef.current = setTimeout(() => {
      setExitingSlot(null);
      exitTimerRef.current = null;
    }, 620);
  }, [recipe.family, activeSlot, env.reducedMotion]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  // Synchronize live 60Hz accordion chain opening to spatial --room-spread without re-rendering React
  useEffect(() => {
    const syncSpread = (openingPct: number) => {
      if (!rootRef.current) return;
      const spreadVal = Math.max(0, Math.min(1, openingPct / 100));
      rootRef.current.style.setProperty('--room-spread', spreadVal.toFixed(4));
    };

    const current = getLiveChainFrame();
    syncSpread(current ? current.averageOpening : effectiveOpening);

    return subscribeChainFrame((frame) => {
      syncSpread(frame ? frame.averageOpening : effectiveOpening);
    });
  }, [effectiveOpening, getLiveChainFrame, subscribeChainFrame]);

  const combinedBiasX = env.reducedMotion
    ? 0
    : Math.max(-1.25, Math.min(1.25, recipe.spatial.cameraBiasX + pointerOffset.x * 0.35));

  const cssVars = {
    '--room-spread': recipe.spatial.spread.toFixed(4),
    '--room-bias-x': combinedBiasX.toFixed(4),
    '--room-horizon-lift': env.reducedMotion ? '0px' : `${recipe.spatial.horizonLiftPx}px`,
    '--room-motif': recipe.spatial.motifRatio.toFixed(3),
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-testid="room-scene-2d5"
      data-room-family={recipe.family}
      data-room-code={recipe.code}
      data-dark-envelope={recipe.palette.isDarkEnvelope ? 'true' : 'false'}
      style={cssVars}
      className="srf-room-stage pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle architectural plaster grain texture across the room */}
      <div className="srf-room-plaster-grain absolute inset-0 z-20 pointer-events-none" />

      {/* At most ONE exiting architectural layer during rapid switches (zero ghost stacking) */}
      {exitingSlot && (
        <div
          key={`exit-${exitingSlot.family}-${exitingSlot.key}`}
          className="srf-room-slot srf-room-exiting absolute inset-0 z-10"
        >
          {renderFamilyLayer(exitingSlot.family, recipe.spatial.motifRatio)}
        </div>
      )}

      {/* Active architectural layer */}
      <div
        key={`active-${activeSlot.family}-${activeSlot.key}`}
        className={`srf-room-slot ${
          activeSlot.key === 1 ? 'srf-room-initial-enter' : 'srf-room-entering'
        } absolute inset-0 z-10`}
      >
        {renderFamilyLayer(activeSlot.family, recipe.spatial.motifRatio)}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/sceneFamilies.ts">
<![CDATA[import type { PrintId } from '../config';
import type { RoomFamilyId } from './paletteHarmonizer';

export interface RoomFamilyMeta {
  id: RoomFamilyId;
  code: string;
  name: string;
  subtitle: string;
  decorVariant: string;
  lightingMode: string;
  transitionSignature: string;
}

export const PRINT_TO_ROOM_FAMILY: Record<PrintId, RoomFamilyId> = {
  bloom: 'botanicalAtelier',
  stripes: 'editorialLoft',
  landscape: 'panoramaSalon',
  waves: 'sculptedCoastalRoom',
  solid: 'architecturalShowroom',
  upload: 'curatedStudio',
};

export const ROOM_FAMILIES: Record<RoomFamilyId, RoomFamilyMeta> = {
  botanicalAtelier: {
    id: 'botanicalAtelier',
    code: 'ROOM 01',
    name: 'Botanical Atelier',
    subtitle: 'Soft plaster arch, sheer pleated scrim & ikebana vessel',
    decorVariant: 'arch-alcove-ikebana',
    lightingMode: 'Filtered afternoon sun through botanical leaves',
    transitionSignature: 'branch-path-draw-drape-unfurl',
  },
  editorialLoft: {
    id: 'editorialLoft',
    code: 'ROOM 02',
    name: 'Editorial Loft',
    subtitle: 'Linear architectural ribs, side-light blade & low gallery bench',
    decorVariant: 'vertical-ribs-blade-light',
    lightingMode: 'Crisp diagonal architectural side-light blade',
    transitionSignature: 'rib-fan-blade-sweep',
  },
  panoramaSalon: {
    id: 'panoramaSalon',
    code: 'ROOM 03',
    name: 'Panorama Salon',
    subtitle: 'Inset scenic paper niche, layered hill planes & oak ledge',
    decorVariant: 'framed-horizon-hills-ledge',
    lightingMode: 'Soft horizon glow over warm travertine stone',
    transitionSignature: 'panorama-parallax-mask-open',
  },
  sculptedCoastalRoom: {
    id: 'sculptedCoastalRoom',
    code: 'ROOM 04',
    name: 'Sculpted Coastal Room',
    subtitle: 'Undulating plaster relief, narrow arch & rounded plinth',
    decorVariant: 'scalloped-relief-rounded-plinth',
    lightingMode: 'Calm undulating coastal daylight wash',
    transitionSignature: 'spline-wave-relief-settle',
  },
  architecturalShowroom: {
    id: 'architecturalShowroom',
    code: 'ROOM 05',
    name: 'Architectural Showroom',
    subtitle: 'Honed monolith portal, stone plinth & tactile swatch sample',
    decorVariant: 'monolith-plinth-material-board',
    lightingMode: 'Focused gallery overhead wash & crisp floor shadow',
    transitionSignature: 'monolith-plane-slide',
  },
  curatedStudio: {
    id: 'curatedStudio',
    code: 'ROOM 06',
    name: 'Curated Studio',
    subtitle: 'Neutral tailored alcove harmonized to your artwork palette',
    decorVariant: 'tailored-alcove-plinth',
    lightingMode: 'Balanced neutral studio daylight',
    transitionSignature: 'tailored-alcove-reveal',
  },
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/ArchitecturalShowroom.tsx">
<![CDATA['use client';

import React from 'react';

export const ArchitecturalShowroom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="architecturalShowroom">
      {/* Layer 1: Honed plaster architectural showroom — sculptural color-harmonized monolith */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(176deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.78,
          }}
        />

        {/* Asymmetric gallery monolith plane offsetting divider cleanly */}
        <div
          className="srf-room-monolith-plane absolute left-[8%] right-[8%] top-[28%] lg:left-[42%] lg:right-[16%] lg:top-[7%] bottom-0 border-t border-l border-r lg:border-r-0"
          style={{
            background:
              'linear-gradient(160deg, color-mix(in srgb, var(--room-wall-highlight) 58%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow:
              '-24px 0 42px -28px color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Focused overhead gallery spotlight wash & tactile swatch pin-up board */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <div
          className="absolute left-[44%] right-[14%] top-0 bottom-0 opacity-62"
          style={{
            background:
              'radial-gradient(ellipse 68% 72% at 50% 18%, var(--room-light-tint) 0%, transparent 74%)',
          }}
        />

        {/* Tactile material swatch pin-up sample board on far right */}
        <div
          className="srf-room-prop-right hidden xl:flex flex-col gap-2 absolute right-[3.8%] top-[18%] p-3 rounded-[4px] border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 72%, var(--room-wall-highlight))',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow: '0 14px 28px -18px color-mix(in srgb, var(--room-shadow-tint) 28%, transparent)',
          }}
        >
          <div className="flex gap-1.5">
            <span
              className="w-7 h-9 rounded-[2px] border"
              style={{
                backgroundColor: 'var(--room-decor-primary)',
                borderColor: 'color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
              }}
            />
            <span
              className="w-7 h-9 rounded-[2px] border"
              style={{
                backgroundColor: 'var(--room-furniture)',
                borderColor: 'color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
              }}
            />
          </div>
          <span
            className="w-full h-3 rounded-[2px]"
            style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.78 }}
          />
        </div>
      </div>

      {/* Layer 3 & 4: Clean honed terrazzo gallery floor + architectural woven mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-32"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[43%] lg:right-[9%] top-[12%] h-[50%] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 76%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 38%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Sharp low stone gallery plinth + sculptural object */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 220 140"
          className="srf-room-prop-right absolute right-[2.5%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <polygon points="48,128 192,128 206,136 62,136" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="68" y="84" width="108" height="44" fill="var(--room-furniture)" />
          <polygon points="68,84 82,74 190,74 176,84" fill="var(--room-wall-highlight)" opacity="0.65" />
          <polygon points="176,84 190,74 190,118 176,128" fill="var(--room-furniture-leg)" opacity="0.62" />
          {/* Minimalist matte gallery sculpture resting on monolith plinth */}
          <rect x="106" y="48" width="26" height="32" rx="13" fill="var(--room-decor-primary)" />
          <circle cx="136" cy="70" r="8" fill="var(--room-decor-accent)" opacity="0.88" />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/BotanicalAtelier.tsx">
<![CDATA['use client';

import React from 'react';

export const BotanicalAtelier: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="botanicalAtelier">
      {/* Layer 1: Mineral plaster wall + soft center-right recessed plaster arch */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(165deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 62%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 90% at 24% 46%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.72,
          }}
        />

        {/* Recessed architectural half-arch niche framing center-right divider */}
        <div
          className="srf-room-arch-niche absolute left-[6%] right-[6%] top-[24%] lg:left-[37%] lg:right-[13%] lg:top-[6%] bottom-0 rounded-t-[180px] lg:rounded-t-[999px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, var(--room-wall-shadow) 0%, color-mix(in srgb, var(--room-wall-shadow) 68%, var(--room-wall-base)) 76%, color-mix(in srgb, var(--room-ambient-tint) 82%, var(--room-shadow-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 32%, transparent)',
            boxShadow:
              'inset 14px 16px 36px -22px color-mix(in srgb, var(--room-shadow-tint) 24%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Pleated textile curtain drape on right edge + afternoon dappled leaf shadows */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="xMidYMid slice"
          className="srf-room-dapple srf-room-drift-slow absolute inset-0 w-full h-full opacity-[0.26]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="srf-botanical-beam" x1="0%" y1="0%" x2="100%" y2="85%">
              <stop offset="0%" stopColor="var(--room-light-tint)" stopOpacity="0.88" />
              <stop offset="55%" stopColor="var(--room-ambient-tint)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--room-light-tint)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="560,0 1080,0 1280,620 420,620" fill="url(#srf-botanical-beam)" />
          <g fill="var(--room-shadow-tint)" opacity="0.24">
            <ellipse cx="940" cy="145" rx="46" ry="18" transform="rotate(-24 940 145)" />
            <ellipse cx="1010" cy="188" rx="54" ry="20" transform="rotate(-14 1010 188)" />
            <ellipse cx="892" cy="210" rx="38" ry="14" transform="rotate(-36 892 210)" />
            <ellipse cx="965" cy="252" rx="44" ry="16" transform="rotate(-18 965 252)" />
          </g>
        </svg>

        {/* Translucent pleated textile drape on right edge */}
        <div
          className="srf-room-drape hidden sm:block absolute top-0 bottom-0 right-0 w-[13%] lg:w-[11%] opacity-90"
          style={{
            background:
              'repeating-linear-gradient(90deg, color-mix(in srgb, var(--room-textile-primary) 86%, transparent) 0px, color-mix(in srgb, var(--room-light-tint) 52%, var(--room-textile-primary)) 12px, color-mix(in srgb, var(--room-textile-secondary) 72%, var(--room-wall-shadow)) 22px)',
            borderLeft: '1px solid color-mix(in srgb, var(--room-trim) 34%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 22%, black 100%)',
          }}
        />
      </div>

      {/* Layer 3 & 4: Unified horizon baseboard, mineral floor plane & spread-responsive boucle rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 44%, color-mix(in srgb, var(--room-floor-detail) 55%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-40"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Woven boucle elliptical rug centered beneath the 16-panel divider */}
        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[40%] lg:right-[6%] top-[10%] h-[58%] rounded-[999px] border-2"
          style={{
            background:
              'radial-gradient(ellipse 92% 86% at 50% 45%, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 72%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 36%, transparent)',
            boxShadow:
              '0 18px 34px -22px color-mix(in srgb, var(--room-shadow-tint) 38%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded ceramic ikebana vessel + foliage + upholstered studio bench */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 260 150"
          className="srf-room-prop-right hidden xl:block absolute right-[2.5%] bottom-[-14px] w-[150px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="145" cy="136" rx="88" ry="11" fill="var(--room-shadow-tint)" opacity="0.18" />
          <rect x="86" y="102" width="12" height="32" rx="4" fill="var(--room-furniture-leg)" opacity="0.92" />
          <rect x="192" y="102" width="12" height="32" rx="4" fill="var(--room-furniture-leg)" opacity="0.92" />
          <rect
            x="68"
            y="84"
            width="154"
            height="24"
            rx="12"
            fill="var(--room-furniture)"
            stroke="var(--room-trim)"
            strokeOpacity="0.34"
          />
          {/* Accent throw bolster cushion */}
          <rect x="78" y="76" width="44" height="14" rx="7" fill="var(--room-decor-accent)" opacity="0.88" />
        </svg>

        <svg
          viewBox="0 0 220 340"
          className="srf-room-ikebana absolute right-[1.5%] lg:right-[3.5%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="122" cy="322" rx="52" ry="9" fill="var(--room-shadow-tint)" opacity="0.22" />

          <path
            d="M118 228 C114 174, 96 132, 62 72"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="srf-room-branch-path"
          />
          <path
            d="M122 228 C128 164, 146 112, 168 48"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="2.1"
            strokeLinecap="round"
            className="srf-room-branch-path srf-room-branch-delay"
          />
          <path
            d="M120 162 C136 146, 164 134, 186 122"
            fill="none"
            stroke="var(--room-trim)"
            strokeWidth="1.7"
            strokeLinecap="round"
            className="srf-room-branch-path srf-room-branch-delay-2"
          />

          <g className="srf-room-foliage-cluster" fill="var(--room-foliage)">
            <ellipse cx="62" cy="70" rx="16" ry="7" transform="rotate(-38 62 70)" opacity="0.92" />
            <ellipse cx="83" cy="108" rx="15" ry="6.5" transform="rotate(-55 83 108)" opacity="0.82" />
            <ellipse cx="168" cy="46" rx="17" ry="7" transform="rotate(28 168 46)" opacity="0.9" />
            <ellipse cx="148" cy="92" rx="14" ry="6" transform="rotate(42 148 92)" opacity="0.82" />
            <ellipse cx="186" cy="122" rx="15" ry="6.5" transform="rotate(-14 186 122)" opacity="0.88" />
          </g>

          <path
            d="M98 222 C98 232, 82 246, 82 276 C82 306, 98 322, 122 322 C146 322, 162 306, 162 276 C162 246, 146 232, 146 222 Z"
            fill="var(--room-decor-primary)"
          />
          <path
            d="M84 282 Q122 292 160 282 L157 294 Q122 304 87 294 Z"
            fill="var(--room-decor-accent)"
            opacity="0.72"
          />
          <ellipse cx="122" cy="222" rx="24" ry="5" fill="var(--room-shadow-tint)" opacity="0.35" />
          <path
            d="M96 250 C92 268, 92 288, 102 308"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/CuratedStudio.tsx">
<![CDATA['use client';

import React from 'react';

export const CuratedStudio: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="curatedStudio">
      {/* Layer 1: Tailored harmonized atelier backdrop framing uploaded user artwork cleanly */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(172deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.78,
          }}
        />

        {/* Soft vertical textile studio alcove behind divider */}
        <div
          className="srf-room-alcove-panel absolute left-[8%] right-[8%] top-[28%] lg:left-[38%] lg:right-[11%] lg:top-[8%] bottom-0 rounded-t-[24px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-textile-primary) 46%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 28%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Balanced studio daylight */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] pointer-events-none opacity-55"
        style={{
          background:
            'radial-gradient(ellipse 64% 68% at 64% 42%, var(--room-light-tint) 0%, transparent 74%)',
        }}
      />

      {/* Layer 3 & 4: Mineral studio floor & woven studio mat */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 50%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[12%] h-[54%] rounded-[8px] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 78%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Restrained studio plinth & matte vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 210 190"
          className="srf-room-prop-right absolute right-[2.5%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[136px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="110" cy="176" rx="64" ry="8" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="66" y="118" width="88" height="58" rx="4" fill="var(--room-furniture)" />
          <rect x="66" y="170" width="88" height="6" rx="2" fill="var(--room-furniture-leg)" opacity="0.68" />
          <path
            d="M95 72 C92 86, 86 96, 86 108 C86 114, 96 118, 110 118 C124 118, 134 114, 134 108 C134 96, 128 86, 125 72 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="110" cy="98" rx="18" ry="3.5" fill="var(--room-decor-accent)" opacity="0.65" />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/EditorialLoft.tsx">
<![CDATA['use client';

import React from 'react';

interface EditorialLoftProps {
  motifRatio: number;
}

const FIN_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export const EditorialLoft: React.FC<EditorialLoftProps> = ({ motifRatio }) => {
  const finGapFactor = Math.max(0.84, Math.min(1.18, 0.92 + (motifRatio - 1) * 0.24));

  return (
    <div className="srf-room-layer-root" data-room-family="editorialLoft">
      {/* Layer 1: Architectural concrete / limewash back wall (supports dark loft mood) */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(178deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left soft wash behind headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.78,
          }}
        />

        {/* Repeating vertical architectural wall fins / timber ribs in center-right bay */}
        <div
          className="srf-room-ribs-bay absolute left-[6%] right-[6%] top-[22%] lg:left-[38%] lg:right-[6%] lg:top-[4%] bottom-0 flex justify-between items-stretch px-3 pointer-events-none"
          style={{ gap: `${Math.round(14 * finGapFactor)}px` }}
          aria-hidden="true"
        >
          {FIN_INDICES.map((idx) => (
            <div
              key={idx}
              className="srf-room-rib-fin flex-1 max-w-[16px] border-r"
              style={{
                animationDelay: `${idx * 28}ms`,
                background:
                  'linear-gradient(90deg, color-mix(in srgb, var(--room-wall-shadow) 88%, transparent) 0%, color-mix(in srgb, var(--room-wall-base) 42%, transparent) 100%)',
                borderColor: 'color-mix(in srgb, var(--room-trim) 26%, transparent)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 2: Crisp diagonal architectural daylight blade sweeping across loft wall */}
      <div className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="xMidYMid slice"
          className="srf-room-light-blade absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="srf-loft-blade" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="var(--room-light-tint)" stopOpacity="0.36" />
              <stop offset="52%" stopColor="var(--room-ambient-tint)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--room-light-tint)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="730,0 990,0 1380,620 960,620" fill="url(#srf-loft-blade)" />
          <polygon
            points="1030,0 1135,0 1430,620 1310,620"
            fill="var(--room-light-tint)"
            opacity="0.14"
          />
        </svg>

        {/* Minimal rectilinear gallery relief frame tucked right of rib bay */}
        <div
          className="hidden xl:block absolute right-[4.5%] top-[16%] w-[112px] h-[146px] border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-textile-primary) 58%, var(--room-wall-shadow))',
            borderColor: 'color-mix(in srgb, var(--room-trim) 48%, transparent)',
            boxShadow: '12px 16px 26px -18px color-mix(in srgb, var(--room-shadow-tint) 46%, transparent)',
          }}
        >
          <div
            className="absolute inset-3 border"
            style={{ borderColor: 'color-mix(in srgb, var(--room-decor-primary) 48%, transparent)' }}
          >
            <div
              className="absolute inset-y-4 left-[36%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-primary)', opacity: 0.72 }}
            />
            <div
              className="absolute inset-y-4 left-[58%] w-[2px]"
              style={{ backgroundColor: 'var(--room-decor-accent)', opacity: 0.56 }}
            />
          </div>
        </div>
      </div>

      {/* Layer 3 & 4: Scored architectural floor slab + runner rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[3px] opacity-42"
          style={{ backgroundColor: 'var(--room-shadow-tint)' }}
        />

        {/* Perspective architectural slab seams */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-24 pointer-events-none"
          aria-hidden="true"
        >
          <line x1="0" y1="92" x2="1440" y2="92" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="205" x2="1440" y2="205" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="560" y1="0" x2="360" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="920" y1="0" x2="1120" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="1180" y1="0" x2="1430" y2="320" stroke="var(--room-floor-detail)" strokeWidth="1" />
        </svg>

        {/* Linear studio woven runner beneath divider */}
        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[41%] lg:right-[8%] top-[11%] h-[54%] border-t-2 border-b-2"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--room-rug) 78%, transparent)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 42%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded minimal bench + cylindrical vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 240 190"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[124px] lg:w-[152px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="122" cy="176" rx="82" ry="9" fill="var(--room-shadow-tint)" opacity="0.24" />
          <rect x="44" y="138" width="156" height="14" fill="var(--room-furniture)" />
          <rect x="56" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          <rect x="176" y="152" width="12" height="24" fill="var(--room-furniture-leg)" />
          {/* Textile throw */}
          <rect x="58" y="128" width="48" height="10" rx="2" fill="var(--room-textile-secondary)" opacity="0.92" />
          {/* Cylindrical matte vessel on right edge of bench */}
          <rect x="136" y="76" width="38" height="62" rx="3" fill="var(--room-decor-primary)" />
          <rect x="136" y="96" width="38" height="8" fill="var(--room-decor-accent)" opacity="0.82" />
          <rect x="140" y="78" width="8" height="58" fill="var(--room-light-tint)" opacity="0.22" />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/PanoramaSalon.tsx">
<![CDATA['use client';

import React from 'react';

export const PanoramaSalon: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="panoramaSalon">
      {/* Layer 1: Plaster wall + architectural dado rail */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(172deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.74,
          }}
        />

        <div
          className="absolute inset-x-0 top-[76%] h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        {/* Wide inset panoramic scenic window niche framed cleanly behind divider */}
        <div
          className="srf-room-panorama-frame absolute left-[6%] right-[6%] top-[34%] bottom-[8%] lg:left-[37.5%] lg:right-[4.5%] lg:top-[8%] lg:bottom-[12%] rounded-[4px] overflow-hidden border"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 68%, var(--room-ambient-tint)) 0%, color-mix(in srgb, var(--room-wall-shadow) 72%, var(--room-light-tint)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              'inset 0 18px 42px -24px color-mix(in srgb, var(--room-shadow-tint) 22%, transparent)',
          }}
        >
          <svg
            viewBox="0 0 920 380"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            aria-hidden="true"
          >
            <circle
              cx="660"
              cy="128"
              r="52"
              fill="var(--room-light-tint)"
              opacity="0.78"
              className="srf-room-pano-layer-1"
            />
            <path
              d="M-40 250 Q160 155, 360 210 T740 175 T960 218 L960 390 L-40 390 Z"
              fill="var(--room-wall-shadow)"
              opacity="0.62"
              className="srf-room-pano-layer-1"
            />
            <path
              d="M-40 278 Q190 210, 410 256 T780 218 T960 258 L960 390 L-40 390 Z"
              fill="var(--room-furniture)"
              opacity="0.74"
              className="srf-room-pano-layer-2"
            />
            <path
              d="M-40 315 Q220 264, 490 296 T960 276 L960 390 L-40 390 Z"
              fill="var(--room-decor-primary)"
              opacity="0.52"
              className="srf-room-pano-layer-3"
            />
            <path
              d="M-40 348 Q280 312, 560 342 T960 326 L960 390 L-40 390 Z"
              fill="var(--room-decor-accent)"
              opacity="0.34"
              className="srf-room-pano-layer-4"
            />
          </svg>
        </div>
      </div>

      {/* Layer 2: Soft horizontal horizon glow wash */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-[26%] bottom-[34%] pointer-events-none opacity-42"
        style={{
          background:
            'radial-gradient(ellipse 68% 55% at 68% 60%, var(--room-light-tint) 0%, transparent 74%)',
        }}
      />

      {/* Layer 3 & 4: Wide-plank floor + woven salon rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-22 pointer-events-none"
          aria-hidden="true"
        >
          <line x1="0" y1="68" x2="1440" y2="68" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="158" x2="1440" y2="158" stroke="var(--room-floor-detail)" strokeWidth="1" />
          <line x1="0" y1="248" x2="1440" y2="248" stroke="var(--room-floor-detail)" strokeWidth="1" />
        </svg>

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[42%] lg:right-[7%] top-[12%] h-[52%] rounded-[4px] border-2"
          style={{
            background:
              'linear-gradient(180deg, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 74%, var(--room-textile-secondary)) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Grounded low bench ledge + ceramic vessel */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 260 170"
          className="srf-room-prop-right absolute right-[2%] lg:right-[3.5%] bottom-[-12px] w-[140px] lg:w-[168px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="145" cy="158" rx="92" ry="9" fill="var(--room-shadow-tint)" opacity="0.2" />
          <rect x="28" y="130" width="210" height="12" rx="2" fill="var(--room-furniture)" opacity="0.95" />
          <rect x="46" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="206" y="142" width="14" height="18" fill="var(--room-furniture-leg)" opacity="0.88" />
          <rect x="52" y="122" width="58" height="8" rx="4" fill="var(--room-textile-primary)" opacity="0.9" />
          <path
            d="M168 78 C164 84, 150 96, 150 114 C150 124, 158 130, 178 130 C198 130, 206 124, 206 114 C206 96, 192 84, 188 78 Z"
            fill="var(--room-decor-primary)"
          />
          <ellipse cx="178" cy="108" rx="22" ry="4" fill="var(--room-decor-accent)" opacity="0.58" />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(serraform)/serraform/fold/room/layers/SculptedCoastalRoom.tsx">
<![CDATA['use client';

import React from 'react';

export const SculptedCoastalRoom: React.FC = () => {
  return (
    <div className="srf-room-layer-root" data-room-family="sculptedCoastalRoom">
      {/* Layer 1: Limewash coastal wall + tall narrow right doorway arch */}
      <div className="srf-room-depth-far absolute inset-x-0 top-0 bottom-[34%] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(170deg, var(--room-wall-highlight) 0%, var(--room-wall-base) 64%, var(--room-ambient-tint) 100%)',
          }}
        />

        {/* Quiet-zone left ambient illumination behind editorial headline */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-[44%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 84% 88% at 24% 48%, var(--room-quiet-bg) 0%, transparent 78%)',
            opacity: 0.76,
          }}
        />

        {/* Narrow tall coastal doorway arch tucked on center-right edge */}
        <div
          className="srf-room-coastal-arch hidden sm:block absolute right-[10%] top-[10%] w-[150px] lg:w-[190px] bottom-0 rounded-t-[999px] border-t border-x"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--room-light-tint) 42%, var(--room-wall-shadow)) 0%, var(--room-wall-shadow) 100%)',
            borderColor: 'color-mix(in srgb, var(--room-trim) 34%, transparent)',
            boxShadow:
              'inset 16px 12px 32px -18px color-mix(in srgb, var(--room-shadow-tint) 28%, transparent)',
          }}
        />
      </div>

      {/* Layer 2: Sculpted undulating spline plaster relief band */}
      <div
        className="srf-room-depth-mid absolute inset-x-0 top-0 bottom-[34%] overflow-hidden pointer-events-none"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 16%, rgba(0,0,0,0.45) 33%, black 50%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 16%, rgba(0,0,0,0.45) 33%, black 50%)',
        }}
      >
        <svg
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          className="srf-room-coastal-waves absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="srf-coastal-wave-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--room-wall-shadow)" stopOpacity="0.54" />
              <stop offset="100%" stopColor="var(--room-wall-base)" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path
            d="M0 280 C220 240, 460 285, 680 248 C900 210, 1110 295, 1260 245 L1440 260 L1440 620 L0 620 Z"
            fill="url(#srf-coastal-wave-grad)"
          />
          <path
            d="M0 370 C260 335, 520 385, 880 345 C1030 292, 1180 385, 1440 338 L1440 620 L0 620 Z"
            fill="var(--room-textile-primary)"
            opacity="0.34"
          />
          <path
            d="M0 280 C220 240, 460 285, 680 248 C900 210, 1110 295, 1260 245 L1440 260"
            fill="none"
            stroke="var(--room-light-tint)"
            strokeWidth="2.5"
            opacity="0.58"
          />
        </svg>
      </div>

      {/* Layer 3 & 4: Mineral stone floor + organic flowing contoured rug */}
      <div
        className="srf-room-horizon-floor absolute inset-x-0 bottom-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--room-floor-far) 0%, var(--room-floor-base) 52%, color-mix(in srgb, var(--room-floor-detail) 52%, var(--room-floor-base)) 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-28"
          style={{ backgroundColor: 'var(--room-trim)' }}
        />

        <div
          className="srf-room-rug-spread absolute left-[10%] right-[10%] lg:left-[40%] lg:right-[6%] top-[8%] h-[62%]"
          style={{
            borderRadius: '44% 56% 48% 52% / 58% 46% 54% 42%',
            background:
              'radial-gradient(ellipse 88% 82% at 50% 48%, var(--room-rug) 0%, color-mix(in srgb, var(--room-rug) 74%, var(--room-textile-secondary)) 100%)',
            border: '2px solid color-mix(in srgb, var(--room-rug-trim) 34%, transparent)',
          }}
        />
      </div>

      {/* Layer 5: Rounded organic plinth & coastal shell table lamp */}
      <div className="srf-room-depth-near srf-room-horizon-props hidden md:block absolute inset-x-0 pointer-events-none">
        <svg
          viewBox="0 0 210 220"
          className="srf-room-prop-right absolute right-[2%] lg:right-[4%] bottom-[-12px] w-[112px] lg:w-[138px] h-auto"
          aria-hidden="true"
        >
          <ellipse cx="110" cy="206" rx="64" ry="9" fill="var(--room-shadow-tint)" opacity="0.22" />
          <rect x="64" y="138" width="92" height="68" rx="18" fill="var(--room-furniture)" />
          <rect x="64" y="196" width="92" height="10" rx="5" fill="var(--room-furniture-leg)" opacity="0.72" />
          <ellipse cx="110" cy="140" rx="44" ry="7" fill="var(--room-light-tint)" opacity="0.34" />
          <path
            d="M84 138 C78 118, 86 98, 110 92 C134 98, 142 118, 136 138 Z"
            fill="var(--room-decor-primary)"
          />
          <circle cx="110" cy="108" r="14" fill="var(--room-decor-accent)" opacity="0.65" />
          <circle cx="110" cy="108" r="8" fill="var(--room-light-tint)" opacity="0.45" />
        </svg>
      </div>
    </div>
  );
};
]]>
    </file>
  </files>
</template>
