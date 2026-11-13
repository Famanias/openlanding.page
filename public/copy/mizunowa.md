<template slug="mizunowa" name="MIZUNOWA">
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
    <file path="src/app/(mizunowa)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import "./mizunowa/mizunowa.css";

export const metadata: Metadata = {
  title: "MIZUNOWA — An imagined garden in motion",
  description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
  openGraph: {
    title: "MIZUNOWA — An imagined garden in motion",
    description: "Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#112C2A",
};

export default function MizunowaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth`}>
      <body className="bg-[#0b0b0b] text-[#f4f0e8] antialiased">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/mizunowa";

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
        className={`mizunowa-placeholder ${className ?? ""}`}
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
    <file path="src/app/(mizunowa)/mizunowa/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#112C2A" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#203D33" text-anchor="middle">M</text>
</svg>
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/mizunowa.css">
<![CDATA[@import "tailwindcss";

:root {
  /* Ten canonical MIZUNOWA palette tokens */
  --mnw-pond: #112C2A;
  --mnw-paper: #F4EFE2;
  --mnw-moss: #203D33;
  --mnw-vermilion: #9E3F32;
  --mnw-sakura: #C7A6A2;
  --mnw-stone: #D6C7A9;
  --mnw-leaf: #526E58;
  --mnw-ink: #1E2320;
  --mnw-porcelain: #FDFBF5;
  --mnw-gold: #CB9462;

  /* Timing & easing tokens */
  --mnw-ease-out: cubic-bezier(.22, 1, .36, 1);
  --mnw-ease-tide: cubic-bezier(.45, 0, .2, 1);
  --mnw-fast: 180ms;
  --mnw-base: 420ms;
  --mnw-slow: 800ms;
  --mnw-hero: 1100ms;
  --mnw-stagger: 70ms;

  /* Typography (wired to next/font variables loaded on <html>) */
  --mnw-font-serif: var(--font-mnw-serif), 'Newsreader', Georgia, "Yu Mincho", "Hiragino Mincho ProN", serif;
  --mnw-font-sans: var(--font-mnw-sans), 'Manrope', -apple-system, BlinkMacSystemFont, "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif;
  --mnw-font-mono: var(--font-mnw-mono), 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Layout */
  --mnw-max-width: 1320px;
  --mnw-gutter: 24px;
  --mnw-margin: 64px;
}

@media (max-width: 1024px) {
  :root {
    --mnw-margin: 32px;
  }
}

@media (max-width: 640px) {
  :root {
    --mnw-margin: 20px;
    --mnw-gutter: 16px;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background-color: var(--mnw-pond);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

.mnw-body {
  margin: 0;
  background-color: var(--mnw-paper);
  color: var(--mnw-ink);
  font-family: var(--mnw-font-sans);
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

@media (max-width: 640px) {
  .mnw-body {
    font-size: 16px;
    line-height: 25px;
  }
}

.mnw-sr-only {
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

.mnw-skip-link {
  position: absolute;
  top: -64px;
  left: 20px;
  z-index: 200;
  background: var(--mnw-porcelain);
  color: var(--mnw-pond);
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: top var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-skip-link:focus {
  top: 16px;
  outline: 2px solid var(--mnw-pond);
  outline-offset: 3px;
}

/* Focus rings */
.mnw-surface-dark :is(a, button, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--mnw-paper);
  outline-offset: 3px;
}

.mnw-surface-light :is(a, button, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--mnw-pond);
  outline-offset: 3px;
}

.mnw-container {
  width: 100%;
  max-width: calc(var(--mnw-max-width) + var(--mnw-margin) * 2);
  margin: 0 auto;
  padding-left: var(--mnw-margin);
  padding-right: var(--mnw-margin);
}

/* Typography helpers */
.mnw-eyebrow {
  font-family: var(--mnw-font-mono);
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0;
}

.mnw-mono {
  font-family: var(--mnw-font-mono);
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
}

.mnw-h1 {
  font-family: var(--mnw-font-serif);
  font-size: clamp(36px, 3.25vw, 50px);
  line-height: 1.06;
  font-weight: 400;
  letter-spacing: -0.02em;
  text-wrap: balance;
  margin: 0;
}

.mnw-h2 {
  font-family: var(--mnw-font-serif);
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.015em;
  text-wrap: balance;
  margin: 0;
}

.mnw-ja {
  font-family: "Yu Mincho", "Hiragino Mincho ProN", var(--mnw-font-serif);
}

/* Primary pill button (reserved exclusively for primary CTA) */
.mnw-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 12px 26px;
  border-radius: 999px;
  background-color: var(--mnw-vermilion);
  color: var(--mnw-porcelain);
  font-family: var(--mnw-font-sans);
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--mnw-vermilion) 85%, var(--mnw-porcelain) 15%);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out),
    box-shadow var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-btn-primary:hover {
  background-color: color-mix(in srgb, var(--mnw-vermilion) 88%, var(--mnw-ink) 12%);
  transform: translateY(-1px);
  box-shadow: 0 10px 24px -12px rgba(10, 22, 20, 0.72);
}

.mnw-btn-primary:active {
  transform: translateY(0) scale(0.975);
  box-shadow: none;
}

.mnw-btn-primary svg {
  transition: transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-btn-primary:hover svg {
  transform: translateX(3px);
}

/* Text link with drawing underline */
.mnw-link-underline {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  gap: 6px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.mnw-link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0.32);
  transform-origin: left center;
  opacity: 0.65;
  transition:
    transform var(--mnw-base) var(--mnw-ease-out),
    opacity var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-link-underline:hover::after,
.mnw-link-underline:focus-visible::after {
  transform: scaleX(1);
  opacity: 1;
}

/* Header */
.mnw-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 76px;
  display: flex;
  align-items: center;
  color: var(--mnw-paper);
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background-color var(--mnw-base) var(--mnw-ease-out),
    border-color var(--mnw-base) var(--mnw-ease-out);
}

.mnw-header.is-scrolled {
  background-color: color-mix(in srgb, var(--mnw-pond) 96%, var(--mnw-ink) 4%);
  border-bottom-color: color-mix(in srgb, var(--mnw-stone) 18%, transparent);
}

.mnw-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.mnw-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--mnw-paper);
  text-decoration: none;
  min-height: 44px;
  flex-shrink: 0;
}

.mnw-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.08;
}

.mnw-brand-en {
  font-family: var(--mnw-font-sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.16em;
  white-space: nowrap;
}

.mnw-brand-text-editorial {
  align-items: center;
}

.mnw-brand-en-serif {
  font-family: var(--mnw-font-serif);
  font-size: 23px;
  font-weight: 400;
  letter-spacing: 0.06em;
  line-height: 1;
  color: #f6f1e6;
  white-space: nowrap;
}

.mnw-brand-ja {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: color-mix(in srgb, var(--mnw-stone) 88%, transparent);
  margin-top: 3px;
}

.mnw-header-right {
  display: flex;
  align-items: center;
  gap: 28px;
}

.mnw-nav-desktop {
  display: flex;
  align-items: center;
  gap: 24px;
}

.mnw-nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: color-mix(in srgb, var(--mnw-paper) 92%, transparent);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-nav-link-editorial {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-shadow: 0 1px 10px rgba(10, 18, 12, 0.55);
}

.mnw-nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  height: 1px;
  background-color: var(--mnw-sakura);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-nav-link:hover,
.mnw-nav-link:focus-visible {
  color: var(--mnw-porcelain);
}

.mnw-nav-link:hover::after,
.mnw-nav-link:focus-visible::after {
  transform: scaleX(1);
}

.mnw-header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mnw-sound-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 38px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: color-mix(in srgb, var(--mnw-paper) 92%, transparent);
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-shadow: 0 1px 10px rgba(10, 18, 12, 0.55);
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--mnw-fast) var(--mnw-ease-out),
    background-color var(--mnw-fast) var(--mnw-ease-out),
    border-color var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-sound-toggle:hover,
.mnw-sound-toggle.is-active {
  color: var(--mnw-porcelain);
  border-color: rgba(244, 239, 226, 0.34);
  background-color: rgba(16, 28, 22, 0.45);
}

.mnw-header-enter-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(244, 239, 226, 0.62);
  background-color: rgba(16, 28, 22, 0.34);
  color: var(--mnw-porcelain);
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--mnw-fast) var(--mnw-ease-out),
    border-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-header-enter-pill:hover {
  background-color: rgba(244, 239, 226, 0.16);
  border-color: var(--mnw-porcelain);
  transform: translateY(-1px);
}

.mnw-mobile-header-actions {
  display: none;
  align-items: center;
  gap: 8px;
}

.mnw-sound-toggle-compact {
  min-height: 44px;
  padding: 0 10px;
  border-color: rgba(244, 239, 226, 0.28);
  background-color: rgba(16, 28, 22, 0.56);
}

.mnw-menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 44px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--mnw-stone) 32%, transparent);
  background: color-mix(in srgb, var(--mnw-moss) 65%, transparent);
  color: var(--mnw-paper);
  font-family: var(--mnw-font-sans);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

/* No-JS mobile navigation fallback row */
.mnw-nojs-nav {
  display: none;
}

.mnw-mobile-drawer {
  position: fixed;
  inset: 0;
  z-index: 150;
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px var(--mnw-margin) 36px;
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  pointer-events: none;
  transition:
    clip-path var(--mnw-base) var(--mnw-ease-out),
    opacity var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-mobile-drawer.is-open {
  clip-path: inset(0 0 0 0);
  opacity: 1;
  pointer-events: auto;
}

.mnw-mobile-drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.mnw-mobile-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 24px 0;
}

.mnw-mobile-drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--mnw-stone) 18%, transparent);
  color: var(--mnw-paper);
  font-family: var(--mnw-font-serif);
  font-size: 28px;
  line-height: 1.2;
  text-decoration: none;
}

@media (max-width: 1023px) {
  .mnw-header-right {
    gap: 16px;
  }

  .mnw-nav-desktop {
    gap: 16px;
  }
}

@media (max-width: 899px) {
  .mnw-header {
    height: 64px;
  }

  .mnw-header-right {
    display: none;
  }

  .mnw-mobile-header-actions {
    display: flex;
  }

  .mnw-menu-toggle {
    display: inline-flex;
  }

  html:not(.mnw-js) .mnw-menu-toggle,
  html:not(.mnw-js) .mnw-mobile-header-actions {
    display: none;
  }

  html:not(.mnw-js) .mnw-nojs-nav {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 4px 0;
    scrollbar-width: none;
  }
}

/* Hero Section — Full-scale immersive garden world */
.mnw-hero {
  position: relative;
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  padding: 0;
  overflow: hidden;
}

.mnw-stage-wrap {
  position: relative;
  min-height: clamp(680px, 92vh, 880px);
  display: flex;
  flex-direction: column;
}

.mnw-stage-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--mnw-pond);
  z-index: 1;
}

.mnw-stage-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 64% center;
  display: block;
  transition: opacity 320ms var(--mnw-ease-out);
}

.mnw-stage-poster.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.mnw-stage-canvas-host {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 520ms var(--mnw-ease-tide);
}

.mnw-stage-canvas-host.is-live {
  opacity: 1;
}

.mnw-stage-canvas-host.is-interactive {
  cursor: crosshair;
}

.mnw-stage-static-ripple {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Soft left-only directional contrast veil keeping left editorial typography legible without dimming the daylight garden */
.mnw-stage-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background:
    linear-gradient(
      90deg,
      rgba(14, 22, 14, 0.72) 0%,
      rgba(14, 22, 14, 0.46) 24%,
      rgba(14, 22, 14, 0.14) 40%,
      rgba(14, 22, 14, 0) 54%
    ),
    linear-gradient(
      180deg,
      rgba(14, 22, 14, 0.36) 0%,
      rgba(14, 22, 14, 0) 14%,
      rgba(14, 22, 14, 0) 88%,
      rgba(14, 22, 14, 0.48) 100%
    );
}

.mnw-hero-foreground {
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 112px;
  padding-bottom: 24px;
  pointer-events: none;
}

.mnw-hero-copy {
  position: relative;
  max-width: 560px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 24px 0 32px;
  pointer-events: auto;
}

.mnw-hero-mask {
  display: block;
  overflow: hidden;
}

.mnw-hero-eyebrow {
  font-family: var(--mnw-font-serif);
  font-size: clamp(17px, 1.45vw, 22px);
  line-height: 1.3;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: #e9e2d2;
  margin: 0 0 14px;
  text-shadow: 0 2px 14px rgba(10, 18, 12, 0.52);
}

.mnw-hero-h1 {
  font-family: var(--mnw-font-serif);
  font-size: clamp(40px, 4.75vw, 72px);
  line-height: 1.01;
  font-weight: 400;
  letter-spacing: -0.012em;
  text-transform: uppercase;
  color: #f6f2e8;
  text-shadow: 0 4px 28px rgba(8, 16, 10, 0.56);
  margin: 0;
}

.mnw-hero-h1-wrap {
  margin-bottom: 20px;
}

.mnw-hero-line {
  display: block;
}

@media (min-width: 900px) {
  .mnw-hero-line {
    white-space: nowrap;
  }
}

.mnw-hero-lead {
  margin: 0 0 28px;
  font-size: 16px;
  line-height: 25px;
  color: rgba(244, 239, 226, 0.92);
  max-width: 44ch;
  text-shadow: 0 1px 12px rgba(8, 16, 10, 0.54);
}

.mnw-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 14px;
  margin-bottom: 10px;
}

/* Primary cream pill CTA matching approved reference */
.mnw-btn-cream {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 26px;
  border-radius: 999px;
  background-color: #f0eae0;
  color: #16221a;
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  text-decoration: none;
  border: 1px solid #f6f1e6;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition:
    background-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out),
    box-shadow var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-btn-cream:hover {
  background-color: #fbf7ef;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px -12px rgba(8, 16, 10, 0.72);
}

.mnw-btn-cream:active {
  transform: translateY(0) scale(0.975);
}

.mnw-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1px solid rgba(244, 239, 226, 0.58);
  background-color: rgba(16, 28, 22, 0.34);
  color: #f4efe2;
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    background-color var(--mnw-fast) var(--mnw-ease-out),
    border-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-btn-outline:hover,
.mnw-btn-outline.is-active {
  background-color: rgba(244, 239, 226, 0.18);
  border-color: #fbf7ef;
  transform: translateY(-1px);
}

.mnw-stage-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 16px;
  padding-top: 10px;
  pointer-events: none;
}

.mnw-scroll-cue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  color: rgba(244, 239, 226, 0.86);
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  text-shadow: 0 1px 10px rgba(8, 16, 10, 0.6);
  pointer-events: auto;
  transition: color var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-scroll-cue:hover {
  color: var(--mnw-porcelain);
}

.mnw-stage-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  pointer-events: auto;
}

.mnw-stage-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(244, 239, 226, 0.34);
  background-color: rgba(16, 28, 22, 0.78);
  color: var(--mnw-paper);
  font-family: var(--mnw-font-sans);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--mnw-fast) var(--mnw-ease-out),
    border-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-stage-btn:hover,
.mnw-stage-btn[aria-pressed='true'] {
  background-color: rgba(34, 58, 44, 0.92);
  border-color: rgba(244, 239, 226, 0.68);
  transform: translateY(-1px);
}

.mnw-stage-btn:active {
  transform: translateY(0) scale(0.975);
}

.mnw-stage-btn-accent {
  border-color: color-mix(in srgb, var(--mnw-sakura) 62%, transparent);
}

.mnw-stage-status {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(244, 239, 226, 0.28);
  background-color: rgba(16, 28, 22, 0.78);
  color: rgba(244, 239, 226, 0.88);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

html:not(.mnw-js) .mnw-js-only {
  display: none;
}

@media (max-width: 899px) {
  .mnw-stage-wrap {
    min-height: clamp(610px, 88svh, 780px);
  }

  .mnw-hero-foreground {
    display: flex;
    padding-top: 84px;
    padding-bottom: 18px;
  }

  .mnw-hero-copy {
    max-width: 520px;
    margin-top: 0;
    margin-bottom: auto;
    padding: 8px 0 18px;
  }

  .mnw-hero-h1 {
    font-size: clamp(32px, 8.6vw, 48px);
  }

  .mnw-stage-frame {
    position: absolute;
    inset: 0;
    height: 100%;
  }

  .mnw-stage-poster {
    object-position: 62% center;
  }

  .mnw-stage-scrim {
    background:
      linear-gradient(
        180deg,
        rgba(14, 22, 14, 0.78) 0%,
        rgba(14, 22, 14, 0.48) 38%,
        rgba(14, 22, 14, 0.08) 68%,
        rgba(14, 22, 14, 0.68) 100%
      ),
      linear-gradient(
        90deg,
        rgba(14, 22, 14, 0.56) 0%,
        rgba(14, 22, 14, 0.24) 55%,
        rgba(14, 22, 14, 0) 90%
      );
  }

  .mnw-stage-bar {
    gap: 10px 12px;
    padding-top: 12px;
  }

  .mnw-stage-controls {
    gap: 6px;
  }

  .mnw-stage-btn {
    min-height: 38px;
    padding: 0 12px;
    font-size: 12px;
  }

  .mnw-hero-h1-wrap {
    margin-bottom: 12px;
  }

  .mnw-hero-lead {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 18px;
  }

  .mnw-hero-actions {
    gap: 10px;
    margin-bottom: 10px;
  }

  .mnw-btn-cream,
  .mnw-btn-outline {
    min-height: 40px;
    padding: 0 18px;
    font-size: 11px;
  }
}

/* Ripple-to-rule handoff transition */
.mnw-handoff {
  position: relative;
  background-color: var(--mnw-paper);
  padding-top: 44px;
}

.mnw-handoff-rule-wrap {
  position: relative;
  display: flex;
  align-items: center;
  height: 56px;
}

.mnw-handoff-line {
  width: 100%;
  height: 1px;
  background-color: color-mix(in srgb, var(--mnw-stone) 75%, var(--mnw-leaf) 25%);
}

.mnw-handoff-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background-color: var(--mnw-paper);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Section base spacing */
section[id] {
  scroll-margin-top: 84px;
}

.mnw-section {
  padding: 96px 0;
}

@media (max-width: 640px) {
  .mnw-section {
    padding: 60px 0;
  }
}

.mnw-section-paper {
  background-color: var(--mnw-paper);
  color: var(--mnw-ink);
}

.mnw-section-moss {
  background-color: var(--mnw-moss);
  color: var(--mnw-paper);
}

.mnw-chapter-label {
  color: var(--mnw-leaf);
  margin-bottom: 18px;
}

.mnw-section-moss .mnw-chapter-label {
  color: var(--mnw-sakura);
}

/* Section 01: Garden Intro */
.mnw-intro-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
}

.mnw-intro-index {
  grid-column: 1 / span 4;
}

.mnw-intro-body {
  grid-column: 5 / span 8;
}

.mnw-intro-copy {
  margin: 24px 0 36px;
  max-width: 52ch;
  color: color-mix(in srgb, var(--mnw-ink) 88%, transparent);
}

.mnw-inline-notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid var(--mnw-stone);
  border-bottom: 1px solid var(--mnw-stone);
  margin-bottom: 36px;
}

.mnw-inline-note-term {
  display: block;
  color: var(--mnw-vermilion);
  margin-bottom: 4px;
}

.mnw-inline-note-meaning {
  display: block;
  font-family: var(--mnw-font-serif);
  font-size: 20px;
  line-height: 28px;
  color: var(--mnw-ink);
}

.mnw-route-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 8px;
}

.mnw-route-svg {
  width: min(460px, 100%);
  height: auto;
  display: block;
}

@media (max-width: 899px) {
  .mnw-intro-index,
  .mnw-intro-body {
    grid-column: 1 / -1;
  }

  .mnw-inline-notes {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .mnw-route-preview {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Section 02: Koi Field Notes */
.mnw-section-head {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  margin-bottom: 48px;
}

.mnw-section-head-left {
  grid-column: 1 / span 6;
}

.mnw-section-head-right {
  grid-column: 8 / span 5;
  align-self: end;
}

.mnw-koi-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--mnw-stone);
  border-bottom: 1px solid var(--mnw-stone);
}

.mnw-koi-cell {
  padding: 28px 22px 30px;
  border-right: 1px solid var(--mnw-stone);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.mnw-koi-cell:last-child {
  border-right: none;
}

.mnw-koi-figure {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}

.mnw-koi-name {
  font-family: var(--mnw-font-serif);
  font-size: 24px;
  line-height: 1.2;
  margin: 0;
  color: var(--mnw-ink);
}

.mnw-koi-pattern {
  font-size: 14px;
  line-height: 20px;
  color: var(--mnw-leaf);
  margin: 0;
}

.mnw-koi-caption {
  font-size: 15px;
  line-height: 23px;
  color: color-mix(in srgb, var(--mnw-ink) 86%, transparent);
  margin: 0;
}

@media (max-width: 1024px) {
  .mnw-section-head-left,
  .mnw-section-head-right {
    grid-column: 1 / -1;
  }

  .mnw-koi-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mnw-koi-cell:nth-child(2n) {
    border-right: none;
  }

  .mnw-koi-cell:nth-child(1),
  .mnw-koi-cell:nth-child(2) {
    border-bottom: 1px solid var(--mnw-stone);
  }
}

@media (max-width: 520px) {
  .mnw-koi-cell {
    padding: 20px 14px 22px;
  }

  .mnw-koi-name {
    font-size: 20px;
  }
}

/* Section 03: The Garden Walk */
.mnw-walk-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
}

.mnw-walk-map-col {
  grid-column: 1 / span 7;
}

.mnw-walk-map-frame {
  position: relative;
  border: 1px solid var(--mnw-stone);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--mnw-paper);
}

.mnw-walk-map-img {
  width: 100%;
  height: auto;
  display: block;
}

.mnw-walk-map-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  padding: 14px 18px;
  border-top: 1px solid var(--mnw-stone);
  background-color: color-mix(in srgb, var(--mnw-paper) 92%, var(--mnw-stone) 8%);
}

.mnw-walk-rows-col {
  grid-column: 8 / span 5;
  display: flex;
  flex-direction: column;
}

.mnw-walk-row {
  padding: 26px 0;
  border-top: 1px solid var(--mnw-stone);
}

.mnw-walk-row:last-child {
  border-bottom: 1px solid var(--mnw-stone);
}

.mnw-walk-row-title {
  font-family: var(--mnw-font-serif);
  font-size: 28px;
  line-height: 1.2;
  margin: 8px 0 10px;
  color: var(--mnw-ink);
}

.mnw-walk-row-desc {
  margin: 0;
  color: color-mix(in srgb, var(--mnw-ink) 86%, transparent);
}

.mnw-walk-segment-line {
  width: 100%;
  height: 2px;
  margin-top: 16px;
  background-color: color-mix(in srgb, var(--mnw-stone) 55%, transparent);
  position: relative;
  overflow: hidden;
}

.mnw-walk-segment-fill {
  position: absolute;
  inset: 0;
  background-color: var(--mnw-vermilion);
  transform-origin: left;
  transform: scaleX(1);
  transition: transform 900ms var(--mnw-ease-out);
}

html.mnw-js .mnw-walk-row:not(.is-visible) .mnw-walk-segment-fill {
  transform: scaleX(0);
}

@media (max-width: 899px) {
  .mnw-walk-map-col,
  .mnw-walk-rows-col {
    grid-column: 1 / -1;
  }
}

/* Section 04: Seasonal Notes */
.mnw-statement-wrap {
  margin-bottom: 56px;
}

.mnw-statement {
  position: relative;
  font-family: var(--mnw-font-serif);
  font-size: clamp(32px, 4.2vw, 56px);
  line-height: 1.12;
  letter-spacing: -0.015em;
  margin: 0;
  color: var(--mnw-paper);
  max-width: 24ch;
}

.mnw-statement-word {
  display: inline-block;
  transition: color 500ms var(--mnw-ease-out);
}

.mnw-statement-word.is-lit {
  color: var(--mnw-sakura);
}

.mnw-seasons-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
}

.mnw-seasons-art-col {
  grid-column: 1 / span 6;
}

.mnw-seasons-art-frame {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--mnw-stone) 24%, transparent);
  background-color: var(--mnw-pond);
}

.mnw-seasons-list-col {
  grid-column: 7 / span 6;
}

.mnw-season-details {
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 26%, transparent);
}

.mnw-season-details:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--mnw-stone) 26%, transparent);
}

.mnw-season-summary {
  list-style: none;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 4px;
  min-height: 60px;
  cursor: pointer;
  color: var(--mnw-paper);
}

.mnw-season-summary::-webkit-details-marker {
  display: none;
}

.mnw-season-title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mnw-season-name {
  font-family: var(--mnw-font-serif);
  font-size: 28px;
  line-height: 1.15;
}

.mnw-season-summary-copy {
  font-size: 15px;
  line-height: 22px;
  color: color-mix(in srgb, var(--mnw-stone) 90%, transparent);
}

.mnw-season-body {
  padding: 0 4px 22px;
  color: color-mix(in srgb, var(--mnw-paper) 88%, transparent);
  font-size: 16px;
  line-height: 26px;
}

.mnw-season-indicator {
  font-family: var(--mnw-font-mono);
  font-size: 12px;
  color: var(--mnw-sakura);
  white-space: nowrap;
  flex-shrink: 0;
}

@media (max-width: 899px) {
  .mnw-seasons-art-col,
  .mnw-seasons-list-col {
    grid-column: 1 / -1;
  }
}

/* Section 05: A simple route (#plan) */
.mnw-plan-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
}

.mnw-plan-left {
  grid-column: 1 / span 6;
}

.mnw-plan-right {
  grid-column: 8 / span 5;
}

.mnw-plan-steps {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
}

.mnw-plan-step {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--mnw-stone);
}

.mnw-plan-step:last-child {
  border-bottom: 1px solid var(--mnw-stone);
}

.mnw-plan-step-num {
  color: var(--mnw-vermilion);
  flex-shrink: 0;
}

.mnw-plan-step-label {
  font-family: var(--mnw-font-serif);
  font-size: 26px;
  line-height: 1.25;
  color: var(--mnw-ink);
}

.mnw-plan-disclosure {
  margin-top: 20px;
  color: var(--mnw-leaf);
  font-size: 14px;
  line-height: 22px;
}

@media (max-width: 899px) {
  .mnw-plan-left,
  .mnw-plan-right {
    grid-column: 1 / -1;
  }
}

/* Section 06: Questions (#questions) */
.mnw-faq-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
}

.mnw-faq-head {
  grid-column: 1 / span 4;
}

.mnw-faq-list {
  grid-column: 5 / span 8;
}

.mnw-faq-item {
  border-top: 1px solid var(--mnw-stone);
}

.mnw-faq-item:last-child {
  border-bottom: 1px solid var(--mnw-stone);
}

.mnw-faq-summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 4px;
  min-height: 60px;
  cursor: pointer;
  font-family: var(--mnw-font-serif);
  font-size: 24px;
  line-height: 1.3;
  color: var(--mnw-ink);
}

.mnw-faq-summary::-webkit-details-marker {
  display: none;
}

.mnw-faq-answer {
  padding: 0 4px 22px;
  margin: 0;
  color: color-mix(in srgb, var(--mnw-ink) 86%, transparent);
  max-width: 60ch;
}

.mnw-faq-plus {
  font-family: var(--mnw-font-mono);
  font-size: 18px;
  color: var(--mnw-vermilion);
  transition: transform var(--mnw-fast) var(--mnw-ease-out);
  flex-shrink: 0;
}

.mnw-faq-item[open] .mnw-faq-plus {
  transform: rotate(45deg);
}

@media (max-width: 899px) {
  .mnw-faq-head,
  .mnw-faq-list {
    grid-column: 1 / -1;
  }
}

/* Footer */
.mnw-footer {
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  padding: 72px 0 56px;
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 18%, transparent);
}

.mnw-footer-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px 48px;
  padding-bottom: 40px;
  border-bottom: 1px solid color-mix(in srgb, var(--mnw-stone) 20%, transparent);
}

.mnw-footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;
}

.mnw-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 28px;
  color: color-mix(in srgb, var(--mnw-stone) 84%, transparent);
  font-size: 14px;
}

/* Reveal system: always visible by default; enhanced only when html.mnw-js is active */
.mnw-reveal {
  opacity: 1;
  transform: none;
  clip-path: none;
}

html.mnw-js .mnw-reveal {
  transition:
    opacity var(--mnw-slow) var(--mnw-ease-out),
    transform var(--mnw-slow) var(--mnw-ease-out),
    clip-path var(--mnw-hero) var(--mnw-ease-out);
  transition-delay: var(--mnw-delay, 0ms);
}

html.mnw-js .mnw-reveal[data-reveal="rise"]:not(.is-visible) {
  opacity: 0;
  transform: translateY(14px);
}

html.mnw-js .mnw-reveal[data-reveal="mask"]:not(.is-visible) {
  opacity: 0;
  transform: translateY(18px);
  clip-path: inset(0 0 100% 0);
}

html.mnw-js .mnw-reveal[data-reveal="wipe"]:not(.is-visible) {
  opacity: 0;
  clip-path: inset(0 100% 0 0);
}

html.mnw-js .mnw-reveal[data-reveal="line"]:not(.is-visible) {
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
}

@media (prefers-reduced-motion: reduce) {
  html.mnw-js .mnw-reveal,
  html.mnw-js .mnw-reveal[data-reveal]:not(.is-visible) {
    opacity: 1;
    transform: none;
    clip-path: none;
    transition: none;
  }

  .mnw-stage-poster,
  .mnw-stage-canvas-host,
  .mnw-walk-segment-fill,
  .mnw-statement-word,
  .mnw-mobile-drawer {
    transition: none;
  }
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/MizunowaApp.tsx">
<![CDATA['use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GardenIntro from './components/GardenIntro';
import KoiGallery from './components/KoiGallery';
import GardenWalk from './components/GardenWalk';
import Seasons from './components/Seasons';
import PlanYourWalk from './components/PlanYourWalk';
import Questions from './components/Questions';
import Footer from './components/Footer';

export default function MizunowaApp() {
  useEffect(() => {
    document.documentElement.classList.add('mnw-js');
  }, []);

  return (
    <div id="mnw-root">
      <a href="#main" className="mnw-skip-link">
        Skip to garden guide
      </a>
      <Header />
      <main id="main">
        <Hero />
        <GardenIntro />
        <KoiGallery />
        <GardenWalk />
        <Seasons />
        <PlanYourWalk />
        <Questions />
      </main>
      <Footer />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MIZUNOWA — An imagined garden in motion";

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
          backgroundColor: "#112C2A",
          color: "#203D33",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>MIZUNOWA</span>
          <span style={{ color: "#9E3F32" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            MIZUNOWA — An imagined garden in motion
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            Explore an imagined Japanese garden through a living koi pond, a sakura grove, and a quiet shrine courtyard.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#9E3F32" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/page.tsx">
<![CDATA["use client";

import MizunowaApp from "./MizunowaApp";

export default function MizunowaPage() {
  return <MizunowaApp />;
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/BrandMark.tsx">
<![CDATA['use client';

interface BrandMarkProps {
  size?: number;
}

export default function BrandMark({ size = 32 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer incomplete concentric ring with upper-right leaf-shaped gap */}
      <path
        d="M25.6 11.8A11 11 0 1 1 19.6 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Inner incomplete concentric ring echoing the gap */}
      <path
        d="M21.4 13.6A6.4 6.4 0 1 1 18.2 10.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Small leaf-shaped accent sitting in the upper-right opening */}
      <path
        d="M22.2 6.2C24.2 6.0 25.8 7.6 25.6 9.6C23.6 9.8 22.0 8.2 22.2 6.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Footer.tsx">
<![CDATA['use client';

import { NAV_LINKS } from '../data/garden';
import BrandMark from './BrandMark';

export default function Footer() {
  return (
    <footer className="mnw-footer mnw-surface-dark">
      <div className="mnw-container">
        <div className="mnw-footer-grid">
          <div>
            <a href="#top" className="mnw-brand" style={{ marginBottom: 12 }}>
              <BrandMark size={30} />
              <span className="mnw-brand-text">
                <span className="mnw-brand-en">MIZUNOWA</span>
                <span className="mnw-brand-ja mnw-ja" lang="ja">
                  水の輪
                </span>
              </span>
            </a>
            <p
              style={{
                margin: '10px 0 0',
                color: 'color-mix(in srgb, var(--mnw-paper) 84%, transparent)',
                fontSize: 16,
              }}
            >
              An imagined garden in motion.
            </p>
          </div>

          <nav className="mnw-footer-links" aria-label="Footer navigation">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="mnw-nav-link">
                {item.label}
              </a>
            ))}
            <a href="#top" className="mnw-nav-link">
              Back to top
            </a>
          </nav>
        </div>

        <div className="mnw-footer-bottom">
          <span>MIZUNOWA is a fictional Japanese garden created for this template.</span>
          <span className="mnw-mono">01 — 03 / FIELD GUIDE</span>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/GardenIntro.tsx">
<![CDATA['use client';

import { ArrowRight } from 'lucide-react';
import { GARDEN_INLINE_NOTES } from '../data/garden';
import Reveal from './Reveal';

export default function GardenIntro() {
  return (
    <section id="garden" className="mnw-section-paper mnw-surface-light">
      {/* Ripple-to-rule graphic handoff */}
      <div className="mnw-handoff">
        <div className="mnw-container">
          <div className="mnw-handoff-rule-wrap" aria-hidden="true">
            <div className="mnw-handoff-line" />
            <div className="mnw-handoff-ring">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="#D6C7A9" strokeWidth="1.2" />
                <circle cx="22" cy="22" r="10.5" stroke="#9E3F32" strokeWidth="1.2" strokeOpacity="0.65" />
                <circle cx="22" cy="22" r="2.5" fill="#9E3F32" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mnw-section">
        <div className="mnw-container mnw-intro-grid">
          <div className="mnw-intro-index">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">01 / THE GARDEN</p>
            </Reveal>
          </div>

          <div className="mnw-intro-body">
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Take the long way around.</h2>
            </Reveal>

            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-intro-copy">
                The pond is the beginning of this imagined walk. A path follows the water, passes
                beneath the blossoms, and arrives at a quiet shrine courtyard.
              </p>
            </Reveal>

            <Reveal variant="rise" delayMs={210}>
              <div className="mnw-inline-notes">
                {GARDEN_INLINE_NOTES.map((note) => (
                  <div key={note.term}>
                    <span className="mnw-mono mnw-inline-note-term">{note.term}</span>
                    <span className="mnw-inline-note-meaning">{note.meaning}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="wipe" delayMs={260}>
              <div className="mnw-route-preview">
                <svg
                  className="mnw-route-svg"
                  viewBox="0 0 460 150"
                  fill="none"
                  aria-label="Line diagram showing the route from the koi pond past the sakura tree and torii to the shrine hall"
                >
                  {/* Pond outline */}
                  <ellipse cx="185" cy="92" rx="112" ry="44" stroke="#526E58" strokeWidth="1.5" />
                  <circle cx="205" cy="90" r="14" stroke="#D6C7A9" strokeWidth="1.2" />
                  <circle cx="205" cy="90" r="26" stroke="#D6C7A9" strokeWidth="1" strokeOpacity="0.6" />
                  {/* Sakura grove */}
                  <circle cx="76" cy="48" r="24" stroke="#C7A6A2" strokeWidth="1.6" strokeDasharray="3 3" />
                  <circle cx="64" cy="54" r="14" stroke="#C7A6A2" strokeWidth="1.2" />
                  {/* Connecting top-down route */}
                  <path
                    d="M110 124 C56 108, 44 64, 88 40 C142 12, 244 16, 336 42 L392 26"
                    stroke="#9E3F32"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                  {/* Torii mark */}
                  <line x1="330" y1="30" x2="344" y2="52" stroke="#9E3F32" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Shrine hall plan */}
                  <rect
                    x="378"
                    y="12"
                    width="44"
                    height="28"
                    rx="2"
                    transform="rotate(-14 378 12)"
                    stroke="#1E2320"
                    strokeWidth="1.6"
                    fill="#F4EFE2"
                  />
                </svg>

                <a href="#walk" className="mnw-link-underline" style={{ color: 'var(--mnw-pond)' }}>
                  <span>Follow the route</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/GardenWalk.tsx">
<![CDATA['use client';

import { useRef } from 'react';
import { GARDEN_STOPS } from '../data/garden';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';

function WalkRow({
  number,
  title,
  description,
  delayMs,
}: {
  number: string;
  title: string;
  description: string;
  delayMs: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { threshold: 0.05, once: true });

  return (
    <div
      ref={rowRef}
      className={`mnw-walk-row ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <span className="mnw-mono" style={{ color: 'var(--mnw-vermilion)' }}>
        {number}
      </span>
      <h3 className="mnw-walk-row-title">{title}</h3>
      <p className="mnw-walk-row-desc">{description}</p>
      <div className="mnw-walk-segment-line" aria-hidden="true">
        <div className="mnw-walk-segment-fill" />
      </div>
    </div>
  );
}

export default function GardenWalk() {
  return (
    <section id="walk" className="mnw-section mnw-section-paper mnw-surface-light">
      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">03 / THE WALK</p>
            </Reveal>
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Three places, one slow path.</h2>
            </Reveal>
          </div>
        </div>

        <div className="mnw-walk-grid">
          <div className="mnw-walk-map-col">
            <Reveal variant="wipe">
              <figure className="mnw-walk-map-frame" style={{ margin: 0 }}>
                <img
                  src="/templates/mizunowa/garden-map.svg"
                  alt="Editorial route map showing the pond edge, the sakura grove on the upper left, and the stepping stone path through the torii to the shrine courtyard on the upper right."
                  width={1200}
                  height={900}
                  className="mnw-walk-map-img"
                  referrerPolicy="no-referrer"
                />
                <figcaption className="mnw-walk-map-labels">
                  {GARDEN_STOPS.map((stop) => (
                    <span
                      key={stop.number}
                      className="mnw-mono"
                      style={{ color: 'var(--mnw-pond)' }}
                    >
                      {stop.mapLabel}
                    </span>
                  ))}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mnw-walk-rows-col">
            {GARDEN_STOPS.map((stop, idx) => (
              <WalkRow
                key={stop.number}
                number={stop.number}
                title={stop.title}
                description={stop.description}
                delayMs={idx * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Header.tsx">
<![CDATA['use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { NAV_LINKS } from '../data/garden';
import { PondGardenAudio } from '../pond/audio';
import BrandMark from './BrandMark';

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<PondGardenAudio | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 20);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const closeMenuAndRestore = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  const toggleSound = async () => {
    if (!audioRef.current) {
      audioRef.current = new PondGardenAudio();
    }
    const next = !soundEnabled;
    const active = await audioRef.current.setEnabled(next);
    setSoundEnabled(active);
  };

  return (
    <>
      <header className={`mnw-header mnw-surface-dark ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="mnw-container mnw-header-inner">
          <motion.a
            href="#top"
            className="mnw-brand"
            aria-label="MIZUNOWA, back to top"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              delay: reducedMotion ? 0 : 0.14,
              ease: EASE_OUT_EXPO,
            }}
          >
            <BrandMark size={28} />
            <span className="mnw-brand-text mnw-brand-text-editorial">
              <span className="mnw-brand-en-serif">MIZUNOWA</span>
              <span className="mnw-brand-ja mnw-ja" lang="ja">
                水の輪
              </span>
            </span>
          </motion.a>

          <div className="mnw-header-right">
            <nav className="mnw-nav-desktop" aria-label="Primary navigation">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mnw-nav-link mnw-nav-link-editorial"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    delay: reducedMotion ? 0 : 0.22 + idx * 0.055,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mnw-header-actions mnw-js-only"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.6,
                delay: reducedMotion ? 0 : 0.44,
                ease: EASE_OUT_EXPO,
              }}
            >
              <button
                type="button"
                className={`mnw-sound-toggle ${soundEnabled ? 'is-active' : ''}`}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Turn garden sound off' : 'Turn garden sound on'}
                onClick={() => void toggleSound()}
              >
                {soundEnabled ? (
                  <Volume2 size={14} aria-hidden="true" />
                ) : (
                  <VolumeX size={14} aria-hidden="true" />
                )}
                <span>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>

              <a href="#garden" className="mnw-header-enter-pill">
                ENTER
              </a>
            </motion.div>
          </div>

          {/* No-JS mobile inline fallback navigation */}
          <nav className="mnw-nojs-nav" aria-label="Section links">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="mnw-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mnw-mobile-header-actions">
            <button
              type="button"
              className={`mnw-sound-toggle mnw-sound-toggle-compact mnw-js-only ${
                soundEnabled ? 'is-active' : ''
              }`}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Turn garden sound off' : 'Turn garden sound on'}
              onClick={() => void toggleSound()}
            >
              {soundEnabled ? (
                <Volume2 size={15} aria-hidden="true" />
              ) : (
                <VolumeX size={15} aria-hidden="true" />
              )}
              <span>{soundEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              ref={triggerRef}
              type="button"
              className="mnw-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mnw-mobile-menu"
              aria-label="Open navigation menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} aria-hidden="true" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mnw-mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Garden navigation"
        aria-hidden={!menuOpen}
        className={`mnw-mobile-drawer mnw-surface-dark ${menuOpen ? 'is-open' : ''}`}
      >
        <div>
          <div className="mnw-mobile-drawer-top">
            <a
              href="#top"
              className="mnw-brand"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <BrandMark size={28} />
              <span className="mnw-brand-text mnw-brand-text-editorial">
                <span className="mnw-brand-en-serif">MIZUNOWA</span>
                <span className="mnw-brand-ja mnw-ja" lang="ja">
                  水の輪
                </span>
              </span>
            </a>
            <button
              ref={closeRef}
              type="button"
              className="mnw-menu-toggle"
              aria-label="Close navigation menu"
              onClick={closeMenuAndRestore}
              tabIndex={menuOpen ? 0 : -1}
            >
              <X size={18} aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <nav className="mnw-mobile-drawer-links" aria-label="Mobile navigation">
            {NAV_LINKS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className="mnw-mobile-drawer-link"
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span>{item.label}</span>
                <span className="mnw-mono" style={{ color: 'var(--mnw-sakura)' }}>
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div>
          <a
            href="#garden"
            className="mnw-btn-cream"
            style={{ width: '100%' }}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>EXPLORE THE GARDEN</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Hero.tsx">
<![CDATA['use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import PondStage, { PondSceneLoader, StageMode } from './PondStage';

interface HeroProps {
  sceneLoader?: PondSceneLoader;
}

const EASE_HERO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero({ sceneLoader }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const [stageMode, setStageMode] = useState<StageMode>('poster');
  const [journeyActive, setJourneyActive] = useState(false);
  const [startSignal, setStartSignal] = useState(0);

  const handleToggleJourney = () => {
    if (stageMode === 'live') {
      setJourneyActive((prev) => !prev);
      return;
    }
    if (stageMode === 'opt-in') {
      setJourneyActive(true);
      setStartSignal((n) => n + 1);
      return;
    }
    document.getElementById('walk')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="top" className="mnw-hero mnw-surface-dark">
      <PondStage
        sceneLoader={sceneLoader}
        journeyActive={journeyActive}
        startSignal={startSignal}
        onStageModeChange={setStageMode}
      >
        <div className="mnw-hero-copy">
          <div className="mnw-hero-mask">
            <motion.p
              className="mnw-hero-eyebrow"
              initial={{ opacity: 0, y: 18, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: reducedMotion ? 0 : 0.8,
                delay: reducedMotion ? 0 : 0.55,
                ease: EASE_HERO,
              }}
            >
              The Interactive Japanese Garden
            </motion.p>
          </div>

          <h1 className="mnw-hero-h1 mnw-hero-h1-wrap">
            <span className="mnw-hero-mask">
              <motion.span
                className="mnw-hero-line"
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  delay: reducedMotion ? 0 : 0.78,
                  ease: EASE_HERO,
                }}
              >
                RECONNECT
              </motion.span>
            </span>
            <span className="mnw-hero-mask">
              <motion.span
                className="mnw-hero-line"
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  delay: reducedMotion ? 0 : 0.98,
                  ease: EASE_HERO,
                }}
              >
                WITH THE FLOW
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mnw-hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.88,
              delay: reducedMotion ? 0 : 1.28,
              ease: EASE_HERO,
            }}
          >
            Immerse yourself in a living, meditative digital landscape. Experience the gentle
            ripples, watch the koi, and explore the shifting seasons of Mizunowa in real-time.
          </motion.p>

          <motion.div
            className="mnw-hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.82,
              delay: reducedMotion ? 0 : 1.52,
              ease: EASE_HERO,
            }}
          >
            <a href="#garden" className="mnw-btn-cream">
              EXPLORE THE GARDEN
            </a>
            <button
              type="button"
              className={`mnw-btn-outline ${journeyActive ? 'is-active' : ''}`}
              aria-pressed={journeyActive}
              onClick={handleToggleJourney}
            >
              {journeyActive ? 'OVERVIEW CAMERA' : 'JOURNEY IN 3D'}
            </button>
          </motion.div>
        </div>
      </PondStage>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/KoiGallery.tsx">
<![CDATA['use client';

import { KOI_SPECIMENS, KoiSpecimen } from '../data/garden';
import Reveal from './Reveal';

function KoiSilhouette({ specimen }: { specimen: KoiSpecimen }) {
  const { id, primaryColor, secondaryColor, accentColor } = specimen;
  const finColor = id === 'yamabuki' ? '#DFB07D' : '#EFE9DA';

  return (
    <svg viewBox="0 0 260 110" width="240" height="102" fill="none" aria-hidden="true">
      {/* Pectoral fins */}
      <path d="M148 41 C160 18, 134 12, 120 35 Z" fill={finColor} fillOpacity="0.9" stroke="#D6C7A9" strokeWidth="0.9" />
      <path d="M148 69 C160 92, 134 98, 120 75 Z" fill={finColor} fillOpacity="0.9" stroke="#D6C7A9" strokeWidth="0.9" />

      {/* Forked caudal tail fin */}
      <path
        d="M54 55 C32 34, 14 32, 10 43 C24 51, 24 59, 10 67 C14 78, 32 76, 54 55 Z"
        fill={finColor}
        stroke="#D6C7A9"
        strokeWidth="0.9"
      />

      {/* Body outline derived from R * sin(pi*u)^0.7 * (0.72 + 0.28u) */}
      <path
        d="M236 55 C234 36, 200 28, 152 31 C106 34, 72 44, 52 55 C72 66, 106 76, 152 79 C200 82, 234 74, 236 55 Z"
        fill={primaryColor}
        stroke="#D6C7A9"
        strokeWidth="1.2"
      />

      {/* Pattern islands matching the 3D TSL shader */}
      {id === 'kohaku' && (
        <>
          <path
            d="M222 51 C214 36, 186 33, 174 43 C168 51, 182 65, 204 65 C216 65, 224 58, 222 51 Z"
            fill={secondaryColor}
          />
          <path
            d="M150 35 C132 34, 110 42, 108 55 C112 67, 136 69, 154 60 C162 54, 160 38, 150 35 Z"
            fill={secondaryColor}
          />
        </>
      )}

      {id === 'yamabuki' && (
        <path
          d="M226 57 C208 68, 168 72, 128 70 C98 68, 76 62, 62 56 C84 69, 128 77, 172 76 C206 75, 224 67, 226 57 Z"
          fill={secondaryColor}
          fillOpacity="0.88"
        />
      )}

      {id === 'shiro' && (
        <>
          <path
            d="M206 36 C188 33, 168 42, 172 56 C178 68, 202 68, 212 56 C217 48, 214 39, 206 36 Z"
            fill={secondaryColor}
          />
          <path
            d="M138 38 C116 38, 98 48, 102 60 C108 69, 130 69, 142 59 C148 52, 146 41, 138 38 Z"
            fill={secondaryColor}
          />
        </>
      )}

      {id === 'sanke' && (
        <>
          <path
            d="M220 48 C210 35, 184 35, 176 47 C172 58, 190 66, 208 63 C218 61, 223 54, 220 48 Z"
            fill={secondaryColor}
          />
          <path
            d="M164 38 C148 35, 134 45, 138 58 C143 68, 160 68, 168 58 C172 50, 170 40, 164 38 Z"
            fill={accentColor}
          />
          <path
            d="M118 44 C104 42, 92 49, 95 59 C99 66, 114 66, 122 59 C126 53, 124 46, 118 44 Z"
            fill={secondaryColor}
          />
          <ellipse cx="136" cy="64" rx="10" ry="6" fill={accentColor} />
        </>
      )}

      {/* Dorsal fin ridge */}
      <path d="M166 55 C144 51, 116 52, 96 55 C116 58, 144 59, 166 55 Z" fill="#D6C7A9" fillOpacity="0.65" />

      {/* Eyes */}
      <circle cx="222" cy="43" r="3" fill="#1E2320" />
      <circle cx="222" cy="67" r="3" fill="#1E2320" />
    </svg>
  );
}

export default function KoiGallery() {
  return (
    <section
      id="koi"
      className="mnw-section mnw-section-paper mnw-surface-light"
      style={{ paddingTop: 24 }}
    >
      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">
                02 / <span className="mnw-ja" lang="ja">錦鯉</span> / NISHIKIGOI
              </p>
            </Reveal>
            <Reveal variant="mask" delayMs={70}>
              <h2 className="mnw-h2">Each one leaves a different line.</h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p style={{ margin: 0, color: 'color-mix(in srgb, var(--mnw-ink) 86%, transparent)' }}>
                Look closely and each fish has its own pattern. Their paths cross the same water
                at their own pace.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mnw-koi-strip">
          {KOI_SPECIMENS.map((specimen, idx) => (
            <Reveal key={specimen.id} variant="rise" delayMs={idx * 70}>
              <article className="mnw-koi-cell">
                <span className="mnw-mono" style={{ color: 'var(--mnw-vermilion)' }}>
                  {specimen.number}
                </span>
                <div className="mnw-koi-figure">
                  <KoiSilhouette specimen={specimen} />
                </div>
                <div>
                  <h3 className="mnw-koi-name">{specimen.label}</h3>
                  <p className="mnw-koi-pattern">{specimen.visiblePattern}</p>
                </div>
                <p className="mnw-koi-caption">{specimen.caption}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/PlanYourWalk.tsx">
<![CDATA['use client';

import { ArrowRight } from 'lucide-react';
import { PLAN_STEPS } from '../data/garden';
import Reveal from './Reveal';

export default function PlanYourWalk() {
  return (
    <section id="plan" className="mnw-section mnw-section-paper mnw-surface-light">
      <div className="mnw-container mnw-plan-grid">
        <div className="mnw-plan-left">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">A SIMPLE ROUTE</p>
          </Reveal>
          <Reveal variant="mask" delayMs={70}>
            <h2 className="mnw-h2">Make a little room for the journey.</h2>
          </Reveal>
          <Reveal variant="rise" delayMs={140}>
            <p
              style={{
                marginTop: 22,
                marginBottom: 0,
                maxWidth: '46ch',
                color: 'color-mix(in srgb, var(--mnw-ink) 86%, transparent)',
              }}
            >
              Start at the pond, walk beneath the sakura, and finish at the shrine courtyard. This
              is an imagined route, ready to explore on this page.
            </p>
          </Reveal>
        </div>

        <div className="mnw-plan-right">
          <Reveal variant="rise" delayMs={100}>
            <ol className="mnw-plan-steps">
              {PLAN_STEPS.map((step) => (
                <li key={step.number} className="mnw-plan-step">
                  <span className="mnw-mono mnw-plan-step-num">{step.number}</span>
                  <span className="mnw-plan-step-label">{step.label}</span>
                </li>
              ))}
            </ol>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 24px' }}>
              <a href="#garden" className="mnw-btn-primary">
                <span>Explore the garden</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#top"
                className="mnw-link-underline"
                style={{ color: 'var(--mnw-pond)' }}
              >
                Back to the pond
              </a>
            </div>

            <p className="mnw-plan-disclosure">
              MIZUNOWA is a fictional garden created for this template.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/PondStage.tsx">
<![CDATA['use client';

import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play, RotateCcw, Sparkles, Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../hooks/useMotionPreference';
import { useInView } from '../hooks/useInView';
import type { PondSceneController, PondSceneOptions } from '../pond/scene';

export type StageMode = 'poster' | 'opt-in' | 'loading' | 'live' | 'reduced' | 'error';

export type PondSceneLoader = (
  container: HTMLElement,
  options: PondSceneOptions,
) => Promise<PondSceneController | null>;

export interface PondStageProps {
  sceneLoader?: PondSceneLoader;
  journeyActive?: boolean;
  startSignal?: number;
  onStageModeChange?: (mode: StageMode) => void;
  children?: ReactNode;
}

interface StaticRing {
  cx: number;
  cy: number;
  id: number;
}

const STAGE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PondStage({
  sceneLoader,
  journeyActive = false,
  startSignal = 0,
  onStageModeChange,
  children,
}: PondStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PondSceneController | null>(null);
  const generationRef = useRef(0);

  const caps = useMotionPreference();
  const inView = useInView(stageRef, { threshold: 0.05 });

  const [mode, setMode] = useState<StageMode>('poster');
  const [liveReady, setLiveReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [staticRing, setStaticRing] = useState<StaticRing | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const announceSeqRef = useRef(0);

  const announce = useCallback((message: string) => {
    announceSeqRef.current += 1;
    setAnnouncement(announceSeqRef.current % 2 === 0 ? `${message}\u200B` : message);
  }, []);

  const announceRipple = useCallback(() => {
    announce('Ripple added');
  }, [announce]);

  const announcePellet = useCallback(() => {
    announce('Koi food dropped');
  }, [announce]);

  const teardownScene = useCallback(() => {
    generationRef.current += 1;
    if (controllerRef.current) {
      controllerRef.current.destroy();
      controllerRef.current = null;
    }
    setLiveReady(false);
    setPaused(false);
  }, []);

  const startScene = useCallback(async () => {
    const host = canvasHostRef.current;
    if (!host) return;

    teardownScene();
    const myGen = generationRef.current;
    setMode('loading');

    try {
      // Allow testing renderer initialization failure via query param
      if (typeof window !== 'undefined' && window.location.search.includes('pondError=1')) {
        throw new Error('Simulated renderer failure');
      }

      const loadFn: PondSceneLoader =
        sceneLoader ??
        (async (el, opts) => {
          const mod = await import('../pond/scene');
          return mod.createPondScene(el, opts);
        });

      if (myGen !== generationRef.current) return;

      const controller = await loadFn(host, {
        isMobile: caps.isNarrowViewport || caps.isCoarsePointer,
        isDisposed: () => myGen !== generationRef.current,
        onFirstFrame: () => {
          if (myGen === generationRef.current) {
            setLiveReady(true);
            setMode('live');
          }
        },
        onDeviceLostOrError: () => {
          if (myGen === generationRef.current) {
            controllerRef.current = null;
            setLiveReady(false);
            setMode('error');
          }
        },
        onRippleAdded: () => {
          if (myGen === generationRef.current) {
            announceRipple();
          }
        },
        onPelletAdded: () => {
          if (myGen === generationRef.current) {
            announcePellet();
          }
        },
      });

      if (myGen !== generationRef.current) {
        controller?.destroy();
        return;
      }

      if (!controller) {
        setLiveReady(false);
        setMode('error');
        return;
      }

      controllerRef.current = controller;
      controller.setViewportActive(inView);
    } catch {
      if (myGen === generationRef.current) {
        setLiveReady(false);
        setMode('error');
      }
    }
  }, [
    announcePellet,
    announceRipple,
    caps.isCoarsePointer,
    caps.isNarrowViewport,
    inView,
    sceneLoader,
    teardownScene,
  ]);

  // Synchronize environment capabilities cleanly without auto-starting when reduced motion or touch/mobile
  useEffect(() => {
    if (!caps.ready) return;

    if (caps.prefersReducedMotion) {
      const cleanupTimer = window.setTimeout(() => {
        teardownScene();
        setMode('reduced');
      }, 0);
      return () => window.clearTimeout(cleanupTimer);
    }

    if (caps.shouldAutoStart3D) {
      if (!controllerRef.current && mode === 'poster') {
        const start = () => {
          if (inView) {
            void startScene();
          }
        };
        if (typeof window.requestIdleCallback === 'function') {
          const idleId = window.requestIdleCallback(start, { timeout: 600 });
          return () => window.cancelIdleCallback(idleId);
        }
        const timerId = window.setTimeout(start, 40);
        return () => window.clearTimeout(timerId);
      }
    } else if (!controllerRef.current && mode !== 'error' && mode !== 'loading' && mode !== 'opt-in') {
      const optTimer = window.setTimeout(() => setMode('opt-in'), 0);
      return () => window.clearTimeout(optTimer);
    }
  }, [caps.ready, caps.prefersReducedMotion, caps.shouldAutoStart3D, inView, mode, startScene, teardownScene]);

  // Trigger opt-in start externally (e.g., from Hero "Journey in 3D")
  useEffect(() => {
    if (startSignal > 0 && !caps.prefersReducedMotion && !controllerRef.current) {
      const t = window.setTimeout(() => {
        void startScene();
      }, 0);
      return () => window.clearTimeout(t);
    }
  }, [startSignal, caps.prefersReducedMotion, startScene]);

  // Pause render loop when scrolled out of viewport without modifying explicit user pause
  useEffect(() => {
    controllerRef.current?.setViewportActive(inView);
  }, [inView]);

  const prevJourneyRef = useRef(journeyActive);
  // Synchronize journey camera mode with Three.js controller
  useEffect(() => {
    if (!liveReady) return;
    controllerRef.current?.setJourneyActive(journeyActive);
    if (prevJourneyRef.current !== journeyActive) {
      prevJourneyRef.current = journeyActive;
      announce(journeyActive ? '3D pond walk view active' : 'Returned to garden overview');
    }
  }, [announce, journeyActive, liveReady]);

  const displayMode: StageMode = caps.prefersReducedMotion ? 'reduced' : mode;
  const isRunning3D = displayMode === 'live' && liveReady;

  useEffect(() => {
    onStageModeChange?.(displayMode);
  }, [displayMode, onStageModeChange]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      teardownScene();
    };
  }, [teardownScene]);

  const handleStillPondClick = (e: MouseEvent<HTMLDivElement>) => {
    if (mode === 'live') return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const svgX = ((e.clientX - rect.left) / rect.width) * 1600;
    const svgY = ((e.clientY - rect.top) / rect.height) * 1200;
    // Match pond ellipse in pond-poster.svg (cx=800, cy=668, rx=486, ry=274)
    const nx = (svgX - 800) / 486;
    const ny = (svgY - 668) / 274;
    if (nx * nx + ny * ny <= 1) {
      setStaticRing({ cx: svgX, cy: svgY, id: Date.now() });
      announceRipple();
    }
  };

  const togglePaused = () => {
    const ctrl = controllerRef.current;
    if (!ctrl) return;
    const next = !paused;
    setPaused(next);
    ctrl.setPaused(next);
    announce(next ? 'Pond paused' : 'Pond resumed');
  };

  const handleFeedKoi = () => {
    controllerRef.current?.feedKoi();
  };

  const handleMakeRipple = () => {
    controllerRef.current?.triggerRipple();
  };

  return (
    <div ref={stageRef} className="mnw-stage-wrap" data-pond-mode={displayMode}>
      {/* Full-hero 3D stage & static fallback backdrop */}
      <div
        className="mnw-stage-frame"
        onClick={handleStillPondClick}
        data-testid="pond-stage-frame"
      >
        {/* Always-present static SVG poster at first paint and as fallback */}
        <img
          src="/templates/mizunowa/pond-poster.svg"
          alt="Four patterned koi swim through an imagined pond beneath a sakura tree, near a shrine courtyard."
          width={1600}
          height={1200}
          className={`mnw-stage-poster ${isRunning3D ? 'is-hidden' : ''}`}
          referrerPolicy="no-referrer"
        />

        {/* Non-animated static ripple overlay for still/reduced-motion/opt-in modes */}
        {!isRunning3D && staticRing && (
          <svg
            viewBox="0 0 1600 1200"
            className="mnw-stage-static-ripple"
            aria-hidden="true"
            data-testid="pond-static-ripple"
          >
            <ellipse
              cx={staticRing.cx}
              cy={staticRing.cy}
              rx="34"
              ry="19"
              fill="none"
              stroke="#F4EFE2"
              strokeOpacity="0.68"
              strokeWidth="2.2"
            />
            <ellipse
              cx={staticRing.cx}
              cy={staticRing.cy}
              rx="68"
              ry="38"
              fill="none"
              stroke="#F4EFE2"
              strokeOpacity="0.36"
              strokeWidth="1.6"
            />
          </svg>
        )}

        {/* Dedicated empty mount container for WebGPURenderer canvas */}
        <div
          ref={canvasHostRef}
          data-testid="pond-canvas-host"
          className={`mnw-stage-canvas-host ${isRunning3D ? 'is-live' : ''} ${
            isRunning3D ? 'is-interactive' : ''
          }`}
        />

        {/* Directional atmospheric scrim preserving crisp text readability without dimming the garden */}
        <div className="mnw-stage-scrim" aria-hidden="true" />
      </div>

      {/* Semantic foreground UI layered over the expansive garden environment */}
      <div className="mnw-container mnw-hero-foreground">
        {children}

        <p className="mnw-sr-only">
          Four patterned koi swim through an imagined pond beneath a sakura tree, near a shrine
          courtyard.
        </p>

        <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <motion.div
          className="mnw-stage-bar"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: caps.prefersReducedMotion ? 0 : 0.8,
            delay: caps.prefersReducedMotion ? 0 : 1.72,
            ease: STAGE_EASE,
          }}
        >
          <a href="#garden" className="mnw-scroll-cue">
            <span>SCROLL TO ENTER</span>
            <ArrowDown size={13} aria-hidden="true" />
          </a>

          {(isRunning3D || displayMode === 'opt-in' || displayMode === 'reduced' || displayMode === 'error') && (
            <div className="mnw-stage-controls mnw-js-only">
              {isRunning3D && (
                <>
                  <button
                    type="button"
                    className="mnw-stage-btn"
                    aria-pressed={paused}
                    onClick={togglePaused}
                  >
                    {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
                    <span>{paused ? 'Resume pond' : 'Pause pond'}</span>
                  </button>

                  <button
                    type="button"
                    className="mnw-stage-btn"
                    onClick={handleFeedKoi}
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Feed koi</span>
                  </button>

                  <button
                    type="button"
                    className="mnw-stage-btn"
                    onClick={handleMakeRipple}
                  >
                    <Waves size={14} aria-hidden="true" />
                    <span>Make a ripple</span>
                  </button>
                </>
              )}

              {displayMode === 'opt-in' && (
                <button
                  type="button"
                  className="mnw-stage-btn mnw-stage-btn-accent"
                  onClick={() => void startScene()}
                >
                  <Play size={14} aria-hidden="true" />
                  <span>Explore the 3D pond</span>
                </button>
              )}

              {displayMode === 'reduced' && (
                <span className="mnw-stage-status" data-testid="pond-reduced-status">
                  Still pond view
                </span>
              )}

              {displayMode === 'error' && (
                <button
                  type="button"
                  className="mnw-stage-btn mnw-stage-btn-accent"
                  onClick={() => void startScene()}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Try 3D again</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Questions.tsx">
<![CDATA['use client';

import { FAQ_ITEMS } from '../data/garden';
import Reveal from './Reveal';

export default function Questions() {
  return (
    <section
      id="questions"
      className="mnw-section mnw-section-paper mnw-surface-light"
      style={{ borderTop: '1px solid var(--mnw-stone)' }}
    >
      <div className="mnw-container mnw-faq-grid">
        <div className="mnw-faq-head">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">QUESTIONS</p>
          </Reveal>
          <Reveal variant="mask" delayMs={70}>
            <h2 className="mnw-h2">Notes before you begin.</h2>
          </Reveal>
        </div>

        <div className="mnw-faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.question} variant="rise" delayMs={idx * 45}>
              <details className="mnw-faq-item">
                <summary className="mnw-faq-summary">
                  <span>{item.question}</span>
                  <span className="mnw-faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mnw-faq-answer">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Reveal.tsx">
<![CDATA['use client';

import { CSSProperties, ReactNode, useEffect, useRef } from 'react';

interface RevealProps {
  children: ReactNode;
  variant?: 'rise' | 'mask' | 'wipe' | 'line';
  delayMs?: number;
  className?: string;
}

export default function Reveal({
  children,
  variant = 'rise',
  delayMs = 0,
  className = '',
}: RevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      inner.classList.add('is-visible');
      return;
    }

    const isNearViewport = () => {
      const rect = outer.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
    };

    if (isNearViewport()) {
      inner.classList.add('is-visible');
      return;
    }

    inner.classList.remove('is-visible');

    const reveal = () => {
      inner.classList.add('is-visible');
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    const onScroll = () => {
      if (isNearViewport()) {
        reveal();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting || isNearViewport()) {
          reveal();
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px 60px 0px' },
    );

    observer.observe(outer);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const style = delayMs > 0 ? ({ '--mnw-delay': `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div ref={outerRef}>
      <div
        ref={innerRef}
        data-reveal={variant}
        style={style}
        className={`mnw-reveal is-visible ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Seasons.tsx">
<![CDATA['use client';

import { useEffect, useRef, useState } from 'react';
import { SEASON_NOTES, SeasonId } from '../data/garden';
import { useInView } from '../hooks/useInView';

const STATEMENT_LINES = [
  ['The', 'garden', 'keeps', 'its', 'shape.'],
  ['The', 'light', 'keeps', 'changing.'],
];

const SEASON_PALETTES: Record<
  SeasonId,
  {
    sky: string;
    bank: string;
    water: string;
    foliagePrimary: string;
    foliageSecondary: string;
    pathAccent: string;
    showCanopy: boolean;
    showPetals: boolean;
    showBareBranches: boolean;
  }
> = {
  spring: {
    sky: '#112C2A',
    bank: '#203D33',
    water: '#173A36',
    foliagePrimary: '#C7A6A2',
    foliageSecondary: '#526E58',
    pathAccent: '#D6C7A9',
    showCanopy: true,
    showPetals: true,
    showBareBranches: false,
  },
  summer: {
    sky: '#112C2A',
    bank: '#1E3A30',
    water: '#133532',
    foliagePrimary: '#526E58',
    foliageSecondary: '#2F523C',
    pathAccent: '#D6C7A9',
    showCanopy: true,
    showPetals: false,
    showBareBranches: false,
  },
  autumn: {
    sky: '#162B28',
    bank: '#2C3D31',
    water: '#15322F',
    foliagePrimary: '#CB9462',
    foliageSecondary: '#D6C7A9',
    pathAccent: '#CB9462',
    showCanopy: true,
    showPetals: true,
    showBareBranches: false,
  },
  winter: {
    sky: '#112C2A',
    bank: '#1C332D',
    water: '#102826',
    foliagePrimary: '#F4EFE2',
    foliageSecondary: '#D6C7A9',
    pathAccent: '#F4EFE2',
    showCanopy: false,
    showPetals: false,
    showBareBranches: true,
  },
};

function SeasonalPaperCut({ season }: { season: SeasonId }) {
  const pal = SEASON_PALETTES[season];

  return (
    <svg
      viewBox="0 0 680 480"
      width={680}
      height={480}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`Paper-cut garden diagram in ${season}`}
    >
      <rect width="680" height="480" fill={pal.sky} />
      {/* Layered paper-cut hills & mossy bank */}
      <path
        d="M0 240 C160 190, 340 205, 680 185 L680 480 L0 480 Z"
        fill={pal.bank}
      />
      <path
        d="M0 325 C170 295, 420 295, 680 320 L680 480 L0 480 Z"
        fill={pal.foliageSecondary}
        fillOpacity="0.32"
      />

      {/* Pond cutout */}
      <ellipse cx="330" cy="348" rx="220" ry="96" fill={pal.water} stroke={pal.pathAccent} strokeWidth="1.5" strokeOpacity="0.4" />
      <ellipse cx="350" cy="342" rx="46" ry="20" fill="none" stroke="#F4EFE2" strokeOpacity="0.32" strokeWidth="1.2" />

      {/* Stepping stone path & shrine courtyard on right */}
      <g fill={pal.pathAccent}>
        <ellipse cx="445" cy="252" rx="14" ry="7" transform="rotate(-18 445 252)" />
        <ellipse cx="478" cy="232" rx="15" ry="7" transform="rotate(-22 478 232)" />
        <ellipse cx="512" cy="212" rx="15" ry="7" transform="rotate(-20 512 212)" />
        <ellipse cx="546" cy="192" rx="16" ry="7" transform="rotate(-16 546 192)" />
      </g>

      {/* Torii on approach */}
      <g transform="translate(520 192)">
        <rect x="-24" y="-44" width="6" height="46" fill="#9E3F32" />
        <rect x="18" y="-44" width="6" height="46" fill="#9E3F32" />
        <rect x="-30" y="-32" width="60" height="5" fill="#9E3F32" />
        <rect x="-36" y="-48" width="72" height="7" rx="1.5" fill="#9E3F32" />
        <rect x="-38" y="-51" width="76" height="3.5" fill="#1E2320" />
      </g>

      {/* Timber hall behind torii */}
      <g transform="translate(592 152)">
        <rect x="-46" y="4" width="92" height="28" fill="#F4EFE2" fillOpacity="0.92" />
        <rect x="-46" y="4" width="6" height="28" fill="#1E2320" />
        <rect x="40" y="4" width="6" height="28" fill="#1E2320" />
        <rect x="-10" y="10" width="20" height="22" fill="#1E2320" />
        <polygon points="-58,6 0,-26 58,6" fill="#1E2320" />
        <rect x="-48" y="32" width="96" height="7" fill={pal.pathAccent} />
      </g>

      {/* Sakura tree silhouette on left */}
      <g transform="translate(135 258)">
        <path
          d="M-8 10 C-6 -24, 4 -54, 16 -84 C26 -108, 48 -126, 76 -140 M6 -52 C-24 -78, -56 -96, -86 -106 M18 -92 C-8 -124, -26 -148, -32 -174 M36 -112 C68 -124, 102 -122, 132 -110"
          stroke="#1E2320"
          strokeWidth={pal.showBareBranches ? '8' : '11'}
          strokeLinecap="round"
          fill="none"
        />
        {pal.showBareBranches && (
          <path
            d="M-54 -95 C-72 -112, -90 -122, -108 -124 M48 -126 C72 -148, 96 -160, 118 -164 M-22 -142 C-38 -162, -48 -182, -48 -198"
            stroke="#F4EFE2"
            strokeOpacity="0.55"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {pal.showCanopy && (
          <g>
            <circle cx="-82" cy="-112" r="38" fill={pal.foliagePrimary} fillOpacity="0.9" />
            <circle cx="-26" cy="-168" r="44" fill={pal.foliagePrimary} fillOpacity="0.92" />
            <circle cx="42" cy="-152" r="40" fill={pal.foliagePrimary} fillOpacity="0.88" />
            <circle cx="114" cy="-116" r="36" fill={pal.foliagePrimary} fillOpacity="0.9" />
            <circle cx="24" cy="-108" r="30" fill={pal.foliageSecondary} fillOpacity="0.55" />
          </g>
        )}
      </g>

      {/* Fallen petals / autumn leaves on water */}
      {pal.showPetals && (
        <g fill={pal.foliagePrimary} fillOpacity="0.85">
          <ellipse cx="215" cy="336" rx="6" ry="3" transform="rotate(20 215 336)" />
          <ellipse cx="245" cy="358" rx="5" ry="2.6" transform="rotate(-14 245 358)" />
          <ellipse cx="282" cy="322" rx="5.5" ry="2.8" transform="rotate(30 282 322)" />
        </g>
      )}
    </svg>
  );
}

export default function Seasons() {
  const [activeSeason, setActiveSeason] = useState<SeasonId>('spring');
  const statementRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statementRef, { threshold: 0.35, once: true });
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const doneTimer = window.setTimeout(() => setLitCount(99), 0);
      return () => window.clearTimeout(doneTimer);
    }

    let count = 0;
    const totalWords = 9;
    const timer = window.setInterval(() => {
      count += 1;
      setLitCount(count);
      if (count >= totalWords) {
        window.clearInterval(timer);
      }
    }, 110);

    return () => window.clearInterval(timer);
  }, [inView]);

  const handleToggle = (seasonId: SeasonId, e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const detailsEl = e.currentTarget;
    if (detailsEl.open) {
      setActiveSeason(seasonId);
    } else {
      // Check if any sibling details remain open; if none, restore spring
      const parent = detailsEl.parentElement;
      if (!parent) return;
      const openEls = Array.from(parent.querySelectorAll<HTMLDetailsElement>('details[open]'));
      if (openEls.length === 0) {
        setActiveSeason('spring');
      } else {
        const lastOpen = openEls[openEls.length - 1];
        const fallbackId = (lastOpen.dataset.season as SeasonId | undefined) ?? 'spring';
        setActiveSeason(fallbackId);
      }
    }
  };

  return (
    <section id="seasons" className="mnw-section mnw-section-moss mnw-surface-dark">
      <div className="mnw-container">
        <div ref={statementRef} className="mnw-statement-wrap">
          <p className="mnw-eyebrow mnw-chapter-label">SEASONAL NOTES</p>
          <h2 className="mnw-statement">
            {STATEMENT_LINES.map((words, lineIdx) => (
              <span key={lineIdx} style={{ display: 'block' }}>
                {words.map((word, wordIdx) => {
                  const flatIndex = (lineIdx === 0 ? 0 : STATEMENT_LINES[0].length) + wordIdx + 1;
                  const isLit =
                    flatIndex <= litCount &&
                    (word === 'shape.' || word === 'light' || word === 'changing.');
                  return (
                    <span
                      key={`${lineIdx}-${word}`}
                      className={`mnw-statement-word ${isLit ? 'is-lit' : ''}`}
                      style={{ marginRight: '0.28em' }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
        </div>

        <div className="mnw-seasons-grid">
          <div className="mnw-seasons-art-col">
            <div className="mnw-seasons-art-frame">
              <SeasonalPaperCut season={activeSeason} />
            </div>
          </div>

          <div className="mnw-seasons-list-col">
            {SEASON_NOTES.map((note) => (
              <details
                key={note.id}
                data-season={note.id}
                open={note.id === 'spring'}
                className="mnw-season-details"
                onToggle={(e) => handleToggle(note.id, e)}
              >
                <summary className="mnw-season-summary">
                  <span className="mnw-season-title-group">
                    <span className="mnw-season-name">{note.season}</span>
                    <span className="mnw-season-summary-copy">{note.summary}</span>
                  </span>
                  <span className="mnw-season-indicator mnw-ja" lang="ja">
                    {note.japanese}
                  </span>
                </summary>
                <div className="mnw-season-body">{note.detail}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/data/garden.ts">
<![CDATA[export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

export interface NavItem {
  label: string;
  href: string;
}

export interface KoiSpecimen {
  id: 'kohaku' | 'yamabuki' | 'shiro' | 'sanke';
  number: string;
  label: string;
  visiblePattern: string;
  caption: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface GardenStop {
  number: string;
  title: string;
  description: string;
  mapLabel: string;
}

export interface SeasonNote {
  id: SeasonId;
  season: string;
  japanese: string;
  summary: string;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { label: 'THE EXPERIENCE', href: '#garden' },
  { label: 'PHILOSOPHY', href: '#koi' },
  { label: 'VIRTUAL TOUR', href: '#walk' },
  { label: 'ABOUT', href: '#seasons' },
];

export const GARDEN_INLINE_NOTES = [
  { term: 'WATER', meaning: 'the koi pond' },
  { term: 'BLOSSOM', meaning: 'the sakura grove' },
  { term: 'THRESHOLD', meaning: 'the shrine approach' },
] as const;

export const KOI_SPECIMENS: readonly KoiSpecimen[] = [
  {
    id: 'kohaku',
    number: '01',
    label: 'Red and white',
    visiblePattern: 'Porcelain body, vermilion islands',
    caption: 'Warm patches on a pale body.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#9E3F32',
  },
  {
    id: 'yamabuki',
    number: '02',
    label: 'Gold',
    visiblePattern: 'Gold body with a porcelain underside',
    caption: 'A warm glint beneath the water.',
    primaryColor: '#CB9462',
    secondaryColor: '#FDFBF5',
    accentColor: '#CB9462',
  },
  {
    id: 'shiro',
    number: '03',
    label: 'Ink and white',
    visiblePattern: 'Porcelain with irregular charcoal patches',
    caption: 'Dark markings, softly defined.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#1E2320',
    accentColor: '#1E2320',
  },
  {
    id: 'sanke',
    number: '04',
    label: 'Three colours',
    visiblePattern: 'Porcelain, vermilion and charcoal',
    caption: 'A pattern made of light and shadow.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#1E2320',
  },
];

export const GARDEN_STOPS: readonly GardenStop[] = [
  {
    number: '01',
    title: 'Pond edge',
    description: 'Begin where the koi move through the clear green water.',
    mapLabel: '01 · Pond edge',
  },
  {
    number: '02',
    title: 'Sakura grove',
    description: 'Follow the path beneath a canopy of pale spring blossoms.',
    mapLabel: '02 · Sakura grove',
  },
  {
    number: '03',
    title: 'Shrine courtyard',
    description: 'Pass the torii and arrive at a small timber hall set back among the trees.',
    mapLabel: '03 · Shrine courtyard',
  },
];

export const SEASON_NOTES: readonly SeasonNote[] = [
  {
    id: 'spring',
    season: 'Spring',
    japanese: '春 / Haru',
    summary: 'Soft blossoms gather over the water.',
    detail:
      'Pale pink sakura clusters frame the upper-right bank while stray petals drift quietly over the jade surface.',
  },
  {
    id: 'summer',
    season: 'Summer',
    japanese: '夏 / Natsu',
    summary: 'Deep green leaves make a little shade.',
    detail:
      'Blossoms give way to full leaf canopies and dense moss along the stepping stones, cooling the edges of the pond.',
  },
  {
    id: 'autumn',
    season: 'Autumn',
    japanese: '秋 / Aki',
    summary: 'The path takes on warmer colors.',
    detail:
      'Ochre foliage and warm stone tones settle along the shrine approach, echoing the gold koi moving underneath.',
  },
  {
    id: 'winter',
    season: 'Winter',
    japanese: '冬 / Fuyu',
    summary: 'Bare branches let the shape of the garden show.',
    detail:
      'With leaves cleared away, the dark timber uprights, gabled roof, and curving stone bank read in crisp silhouette.',
  },
];

export const PLAN_STEPS = [
  { number: '01', label: 'Watch the water' },
  { number: '02', label: 'Follow the blossoms' },
  { number: '03', label: 'Find the courtyard' },
] as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'Is MIZUNOWA a real place?',
    answer: 'No. This is an imagined garden created as a digital landing-page template.',
  },
  {
    question: 'Can I interact with the pond?',
    answer:
      'Yes. Click or touch the pond water directly, or use Feed koi and Make a ripple in the lower controls to drop food and send ripples across the surface.',
  },
  {
    question: 'What if my device cannot run the 3D scene?',
    answer:
      'A composed still view remains visible, and you can continue through the full garden guide.',
  },
  {
    question: 'Can I pause the movement?',
    answer:
      'Yes. Use Pause pond in the bottom-right controls at any time, or rely on your device’s reduced-motion setting for a composed still view automatically.',
  },
  {
    question: 'Are the koi real fish?',
    answer:
      'No. They are original computer-generated characters with four distinct color patterns.',
  },
  {
    question: 'Can I book a visit?',
    answer:
      'No. The garden is fictional, and this template does not make bookings or collect personal information.',
  },
];
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/hooks/useInView.ts">
<![CDATA['use client';

import { RefObject, useEffect, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {},
): boolean {
  const { threshold = 0.12, rootMargin = '0px', once = false } = options;
  const [inView, setInView] = useState<boolean>(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    let revealed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          revealed = true;
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once && !revealed) {
          setInView(false);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/hooks/useMotionPreference.ts">
<![CDATA['use client';

import { useEffect, useState } from 'react';

export interface EnvironmentCapabilities {
  ready: boolean;
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
  isNarrowViewport: boolean;
  saveData: boolean;
  shouldAutoStart3D: boolean;
}

const DEFAULT_CAPABILITIES: EnvironmentCapabilities = {
  ready: false,
  prefersReducedMotion: false,
  isCoarsePointer: false,
  isNarrowViewport: false,
  saveData: false,
  shouldAutoStart3D: false,
};

export function useMotionPreference(): EnvironmentCapabilities {
  const [caps, setCaps] = useState<EnvironmentCapabilities>(DEFAULT_CAPABILITIES);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const narrowQuery = window.matchMedia('(max-width: 899px)');

    const readCaps = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const saveData = Boolean(conn?.saveData);
      const prefersReducedMotion = reducedQuery.matches;
      const isCoarsePointer = coarseQuery.matches;
      const isNarrowViewport = narrowQuery.matches;
      const shouldAutoStart3D = !prefersReducedMotion && !saveData;

      setCaps({
        ready: true,
        prefersReducedMotion,
        isCoarsePointer,
        isNarrowViewport,
        saveData,
        shouldAutoStart3D,
      });
    };

    readCaps();

    reducedQuery.addEventListener('change', readCaps);
    coarseQuery.addEventListener('change', readCaps);
    narrowQuery.addEventListener('change', readCaps);

    return () => {
      reducedQuery.removeEventListener('change', readCaps);
      coarseQuery.removeEventListener('change', readCaps);
      narrowQuery.removeEventListener('change', readCaps);
    };
  }, []);

  return caps;
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/audio.ts">
<![CDATA[/**
 * Pure Web Audio API procedural Japanese garden ambience synthesizer.
 * Generates soft bamboo-spout water trickle + gentle morning breeze without external audio files.
 * Stays inert until explicitly enabled via user interaction.
 */

export class PondGardenAudio {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private trickleTimer = 0;
  private lfoOsc: OscillatorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private enabled = false;
  private disposed = false;

  public isEnabled(): boolean {
    return this.enabled;
  }

  public async setEnabled(next: boolean): Promise<boolean> {
    if (this.disposed) return false;
    this.enabled = next;

    if (!next) {
      this.stopTimer();
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.0001, now, 0.14);
      }
      return false;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        this.enabled = false;
        return false;
      }

      if (!this.ctx) {
        this.ctx = new AudioCtx();
        this.buildGraph(this.ctx);
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      if (this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setTargetAtTime(0.11, now, 0.35);
      }

      this.startTrickleLoop();
      return true;
    } catch {
      this.enabled = false;
      return false;
    }
  }

  private buildGraph(ctx: AudioContext): void {
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    this.masterGain = master;

    // 3-second seamless pink/brown noise buffer for soft water & canopy air
    const sampleRate = ctx.sampleRate;
    const len = sampleRate * 3;
    const buffer = ctx.createBuffer(2, len, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let seed = ch === 0 ? 1337 : 7331;
      for (let i = 0; i < len; i++) {
        seed = (seed * 16807) % 2147483647;
        const white = (seed / 2147483647) * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.95 * b2 + white * 0.048;
        data[i] = (b0 + b1 + b2) * 0.24;
      }
      // Smooth loop seam crossfade at ends
      const fadeSamples = Math.min(2048, Math.floor(len * 0.05));
      for (let i = 0; i < fadeSamples; i++) {
        const t = i / fadeSamples;
        const tailIdx = len - fadeSamples + i;
        const headVal = data[i];
        data[i] = headVal * t + data[tailIdx] * (1 - t);
      }
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const waterBand = ctx.createBiquadFilter();
    waterBand.type = 'bandpass';
    waterBand.frequency.value = 620;
    waterBand.Q.value = 0.72;

    const streamGain = ctx.createGain();
    streamGain.gain.value = 0.34;

    // Gentle slow breathing modulation on the ambient air/stream
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.14;
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 140;
    lfo.connect(lfoDepth);
    lfoDepth.connect(waterBand.frequency);

    noise.connect(waterBand);
    waterBand.connect(streamGain);
    streamGain.connect(master);

    noise.start();
    lfo.start();
    this.noiseSource = noise;
    this.lfoOsc = lfo;
  }

  private startTrickleLoop(): void {
    this.stopTimer();
    if (!this.enabled || this.disposed) return;

    const scheduleNext = () => {
      if (!this.enabled || this.disposed) return;
      this.triggerDroplet();
      const nextDelay = 280 + Math.random() * 520;
      this.trickleTimer = window.setTimeout(scheduleNext, nextDelay);
    };
    this.trickleTimer = window.setTimeout(scheduleNext, 180);
  }

  private triggerDroplet(): void {
    if (!this.ctx || !this.masterGain || !this.enabled || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 780 + Math.random() * 680;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.48, now + 0.055);

    const amp = 0.025 + Math.random() * 0.03;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(amp, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private stopTimer(): void {
    if (this.trickleTimer) {
      window.clearTimeout(this.trickleTimer);
      this.trickleTimer = 0;
    }
  }

  public dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.enabled = false;
    this.stopTimer();
    try {
      this.noiseSource?.stop();
      this.lfoOsc?.stop();
      void this.ctx?.close();
    } catch {
      // Ignore audio teardown exceptions
    }
    this.noiseSource = null;
    this.lfoOsc = null;
    this.masterGain = null;
    this.ctx = null;
  }
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/fish.ts">
<![CDATA[import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  FloatUniform,
  KoiVariant,
  PALETTE,
  createKoiBodyMaterial,
} from './materials';
import type { PondTextureSuite } from './textures';

export interface KoiActor {
  variant: KoiVariant;
  phase: number;
  group: THREE.Group;
  updateAnimation: (elapsed: number, speed: number, localBedClearance?: number) => void;
  dispose: () => void;
}

function createKoiBodyGeometry(): THREE.BufferGeometry {
  const lengthSegments = 40;
  const radialSegments = 18;
  const bodyLength = 0.72;
  const maxR = 0.135;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= lengthSegments; i++) {
    const u = i / lengthSegments;
    const x = -bodyLength * 0.5 + u * bodyLength;

    // Carp silhouette: slender caudal peduncle (u=0) -> full shoulder (u=0.66) -> tapered rounded snout (u=1)
    let rHoriz = 0;
    let rVert = 0;
    if (u > 0 && u < 1) {
      const shoulderProfile = Math.pow(Math.sin(Math.PI * Math.pow(u, 0.78)), 0.72);
      const peduncleTaper = 0.22 + 0.78 * Math.pow(u, 0.35);
      // Subtle gill plate indent around u = 0.76
      const gillDip = 1 - 0.045 * Math.exp(-Math.pow((u - 0.76) / 0.032, 2));
      rHoriz = maxR * shoulderProfile * peduncleTaper * gillDip;
      // Deeper vertical profile near shoulders, slightly flattened belly
      const verticalRatio = 0.68 + 0.14 * Math.sin(Math.PI * u);
      rVert = rHoriz * verticalRatio;
    }

    for (let j = 0; j <= radialSegments; j++) {
      const v = j / radialSegments;
      const angle = v * Math.PI * 2 - Math.PI;
      let y = Math.cos(angle) * rVert;
      // Flatten underside subtly, raise dorsal spine gracefully
      if (y < 0) y *= 0.84;
      const z = Math.sin(angle) * rHoriz;

      positions.push(x, y, z);
      uvs.push(u, v);
    }
  }

  const stride = radialSegments + 1;
  for (let i = 0; i < lengthSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * stride + j;
      const b = (i + 1) * stride + j;
      const c = (i + 1) * stride + (j + 1);
      const d = i * stride + (j + 1);

      indices.push(a, d, b);
      indices.push(b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createCaudalFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.016);
  shape.quadraticCurveTo(-0.07, 0.095, -0.155, 0.105);
  shape.quadraticCurveTo(-0.11, 0.028, -0.09, 0);
  shape.quadraticCurveTo(-0.11, -0.028, -0.155, -0.105);
  shape.quadraticCurveTo(-0.07, -0.095, 0, -0.016);
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape, 10);
  geo.rotateX(Math.PI * 0.36);
  return geo;
}

function createPectoralFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.05, 0.09, -0.035, 0.13);
  shape.quadraticCurveTo(-0.105, 0.11, -0.088, 0.025);
  shape.closePath();

  const geo = new THREE.ShapeGeometry(shape, 8);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createPelvicFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(0.02, 0.048, -0.03, 0.068);
  shape.quadraticCurveTo(-0.068, 0.055, -0.058, 0.01);
  shape.closePath();
  const geo = new THREE.ShapeGeometry(shape, 6);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function createDorsalFinGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.13, 0);
  shape.quadraticCurveTo(0.03, 0.072, -0.14, 0.054);
  shape.quadraticCurveTo(-0.17, 0.022, -0.165, 0);
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 8);
}

export function createKoiActor(
  variant: KoiVariant,
  phase: number,
  elapsedUniform: FloatUniform,
  textures: PondTextureSuite,
  sizeScale = 1,
): KoiActor {
  const group = new THREE.Group();
  group.scale.setScalar(sizeScale);

  const speedUniform = uniform(0.66) as FloatUniform;
  const bodyGeo = createKoiBodyGeometry();
  const bodyMat = createKoiBodyMaterial(variant, textures, elapsedUniform, speedUniform, phase);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  bodyMesh.renderOrder = 1;
  group.add(bodyMesh);

  const finHex =
    variant === 'yamabuki'
      ? 0xf0cf8d
      : variant === 'shiro'
        ? 0xeae5da
        : PALETTE.porcelain;
  const finMat = new THREE.MeshStandardNodeMaterial({
    color: finHex,
    alphaMap: textures.finAlpha,
    roughness: 0.34,
    metalness: 0.02,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // Flowing caudal tail fin
  const tailPivot = new THREE.Group();
  tailPivot.position.set(-0.34, 0, 0);
  const tailGeo = createCaudalFinGeometry();
  const tailMesh = new THREE.Mesh(tailGeo, finMat);
  tailMesh.renderOrder = 1;
  tailPivot.add(tailMesh);
  group.add(tailPivot);

  // Dorsal crest fin
  const dorsalGeo = createDorsalFinGeometry();
  const dorsalMesh = new THREE.Mesh(dorsalGeo, finMat);
  dorsalMesh.position.set(-0.03, 0.074, 0);
  dorsalMesh.renderOrder = 1;
  group.add(dorsalMesh);

  // Paired wing-like pectoral fins
  const pecGeo = createPectoralFinGeometry();
  const rightPec = new THREE.Mesh(pecGeo, finMat);
  rightPec.position.set(0.115, -0.022, 0.078);
  rightPec.rotation.y = 0.24;
  rightPec.renderOrder = 1;
  group.add(rightPec);

  const leftPec = new THREE.Mesh(pecGeo, finMat);
  leftPec.scale.set(1, 1, -1);
  leftPec.position.set(0.115, -0.022, -0.078);
  leftPec.rotation.y = -0.24;
  leftPec.renderOrder = 1;
  group.add(leftPec);

  // Paired smaller pelvic fins farther aft
  const pelvGeo = createPelvicFinGeometry();
  const rightPelv = new THREE.Mesh(pelvGeo, finMat);
  rightPelv.position.set(-0.07, -0.036, 0.044);
  rightPelv.rotation.y = 0.2;
  rightPelv.renderOrder = 1;
  group.add(rightPelv);

  const leftPelv = new THREE.Mesh(pelvGeo, finMat);
  leftPelv.scale.set(1, 1, -1);
  leftPelv.position.set(-0.07, -0.036, -0.044);
  leftPelv.rotation.y = -0.2;
  leftPelv.renderOrder = 1;
  group.add(leftPelv);

  // Glossy dark eyes with warm golden iris collar
  const eyeGeo = new THREE.SphereGeometry(0.015, 10, 10);
  const irisGeo = new THREE.SphereGeometry(0.0185, 10, 10);
  const eyeMat = new THREE.MeshStandardNodeMaterial({
    color: 0x0d100f,
    roughness: 0.08,
    metalness: 0.15,
  });
  const irisMat = new THREE.MeshStandardNodeMaterial({
    color: PALETTE.gold,
    roughness: 0.25,
    metalness: 0.25,
  });

  const irisL = new THREE.Mesh(irisGeo, irisMat);
  irisL.position.set(0.255, 0.028, -0.05);
  const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
  eyeLeft.position.set(0.258, 0.03, -0.053);

  const irisR = new THREE.Mesh(irisGeo, irisMat);
  irisR.position.set(0.255, 0.028, 0.05);
  const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
  eyeRight.position.set(0.258, 0.03, 0.053);
  group.add(irisL, eyeLeft, irisR, eyeRight);

  // Subtle paired whisker barbels near snout
  const barbelGeo = new THREE.ConeGeometry(0.004, 0.034, 5);
  barbelGeo.rotateZ(-Math.PI * 0.65);
  const barbelMat = new THREE.MeshStandardNodeMaterial({
    color: variant === 'shiro' ? PALETTE.ink : 0xd8c3a5,
    roughness: 0.45,
  });
  const barbelL = new THREE.Mesh(barbelGeo, barbelMat);
  barbelL.position.set(0.345, -0.008, -0.024);
  barbelL.rotation.y = 0.42;
  const barbelR = new THREE.Mesh(barbelGeo, barbelMat);
  barbelR.position.set(0.345, -0.008, 0.024);
  barbelR.rotation.y = -0.42;
  group.add(barbelL, barbelR);

  // Soft projected pond-floor contact shadow underneath koi
  const shadowGeo = new THREE.PlaneGeometry(0.84, 0.38);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicNodeMaterial({
    map: textures.contactShadow,
    transparent: true,
    depthWrite: false,
    opacity: 0.4,
  });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.set(-0.04, -0.18, 0);
  group.add(shadowMesh);

  const updateAnimation = (elapsed: number, speed: number, localBedClearance = 0.18) => {
    speedUniform.value = speed;
    const speedScale = Math.max(0.75, Math.min(1.45, speed / 0.66));
    const tailOffset = 0.042 * Math.sin(8.6 - 3.6 * elapsed * speedScale + phase);
    tailPivot.position.z = tailOffset;
    tailPivot.rotation.y = 0.34 * Math.sin(3.6 * elapsed * speedScale - phase);

    const pecWave = 0.12 * Math.sin(2.6 * elapsed * speedScale + phase);
    rightPec.rotation.y = 0.24 + pecWave;
    leftPec.rotation.y = -0.24 - pecWave;
    dorsalMesh.rotation.z = 0.06 * Math.sin(3.6 * elapsed * speedScale - phase + 0.8);

    shadowMesh.position.y = -Math.max(0.08, Math.min(0.45, localBedClearance));
    shadowMat.opacity = Math.max(0.18, 0.42 - localBedClearance * 0.45);
  };

  const dispose = () => {
    bodyGeo.dispose();
    bodyMat.dispose();
    tailGeo.dispose();
    dorsalGeo.dispose();
    pecGeo.dispose();
    pelvGeo.dispose();
    eyeGeo.dispose();
    irisGeo.dispose();
    barbelGeo.dispose();
    finMat.dispose();
    eyeMat.dispose();
    irisMat.dispose();
    barbelMat.dispose();
    shadowGeo.dispose();
    shadowMat.dispose();
  };

  return { variant, phase, group, updateAnimation, dispose };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/garden.ts">
<![CDATA[import * as THREE from 'three/webgpu';
import {
  float,
  positionLocal,
  positionWorld,
  sin,
  smoothstep,
  uniform,
  vec3,
} from 'three/tsl';
import {
  SAKURA_CENTER,
  SHRINE_CENTER,
  WATERFALL_IMPACT_POINT,
  WATERFALL_SOURCE_POINT,
  getGroundMaterialWeights,
  isInsideNaturalPond,
  naturalPondNormalizedRadius,
  pondBedElevation,
  pondBoundaryPoint,
  sampleTerrain,
  shrinePathCenterX,
  signedDistanceToPond,
  terrainElevation,
  terrainNormalAt,
  type PointXZ,
} from './model';
import {
  PlacementRegistry,
  computeCollisionFreeStreamTrajectory,
  type FootprintKind,
} from './placement';
import {
  FloatUniform,
  createGroundTerraceMaterial,
  createMatteNodeMaterial,
  createMistSheetMaterial,
  createShoreStoneMaterial,
  createSunbeamMaterial,
  createTrickleStreamMaterial,
} from './materials';
import { sculptBoulderGeometry } from './water';
import type { PondQuality, PondTextureSuite } from './textures';

export interface GardenEnvironment {
  group: THREE.Group;
  update: (
    elapsed: number,
    dt: number,
    atmosphereFactor: number,
    onPetalTouchdown?: (x: number, z: number) => void,
    onWaterfallRipple?: (x: number, z: number) => void,
  ) => void;
  dispose: () => void;
}

interface DriftingPetal {
  mesh: THREE.Mesh;
  originX: number;
  originZ: number;
  x: number;
  y: number;
  z: number;
  fallSpeed: number;
  swayPhase: number;
  swayAmp: number;
  landedTimer: number;
  spawnedRipple: boolean;
}

interface DustMote {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  speed: number;
}

interface TerrainHit {
  y: number;
  normal: THREE.Vector3;
  hit: boolean;
}

interface GroundedPlacement {
  y: number;
  minY: number;
  avgY: number;
  maxY: number;
  slope: number;
  normal: THREE.Vector3;
  tiltQuat: THREE.Quaternion;
}

interface TerrainGrounder {
  raycastSurface: (x: number, z: number) => TerrainHit;
  groundPropFootprint: (
    x: number,
    z: number,
    radius: number,
    maxTiltRad: number,
    embed: number,
  ) => GroundedPlacement;
  dispose: () => void;
}

function createTerrainGrounder(terrainMesh: THREE.Mesh): TerrainGrounder {
  terrainMesh.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const origin = new THREE.Vector3();
  const down = new THREE.Vector3(0, -1, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(terrainMesh.matrixWorld);

  // Partition terrain triangles into an 8x8 spatial grid over [-24, 24] so THREE.Raycaster
  // tests only ~200 local triangles per query instead of all 14,336 triangles.
  const GRID_N = 8;
  const MIN_C = -24;
  const MAX_C = 24;
  const CELL_SPAN = (MAX_C - MIN_C) / GRID_N;
  const buckets: number[][] = Array.from({ length: GRID_N * GRID_N }, () => []);
  const posAttr = terrainMesh.geometry.getAttribute('position');
  const indexAttr = terrainMesh.geometry.getIndex();

  if (posAttr && indexAttr) {
    const triCount = Math.floor(indexAttr.count / 3);
    for (let t = 0; t < triCount; t++) {
      const ia = indexAttr.getX(t * 3);
      const ib = indexAttr.getX(t * 3 + 1);
      const ic = indexAttr.getX(t * 3 + 2);
      const ax = posAttr.getX(ia);
      const az = posAttr.getZ(ia);
      const bx = posAttr.getX(ib);
      const bz = posAttr.getZ(ib);
      const cx = posAttr.getX(ic);
      const cz = posAttr.getZ(ic);

      const minX = Math.min(ax, bx, cx);
      const maxX = Math.max(ax, bx, cx);
      const minZ = Math.min(az, bz, cz);
      const maxZ = Math.max(az, bz, cz);

      if (maxX < MIN_C || minX > MAX_C || maxZ < MIN_C || minZ > MAX_C) continue;

      const gx0 = Math.max(0, Math.min(GRID_N - 1, Math.floor((minX - MIN_C) / CELL_SPAN)));
      const gx1 = Math.max(0, Math.min(GRID_N - 1, Math.floor((maxX - MIN_C) / CELL_SPAN)));
      const gz0 = Math.max(0, Math.min(GRID_N - 1, Math.floor((minZ - MIN_C) / CELL_SPAN)));
      const gz1 = Math.max(0, Math.min(GRID_N - 1, Math.floor((maxZ - MIN_C) / CELL_SPAN)));

      for (let gz = gz0; gz <= gz1; gz++) {
        for (let gx = gx0; gx <= gx1; gx++) {
          buckets[gz * GRID_N + gx].push(ia, ib, ic);
        }
      }
    }
  }

  const chunkGeos: THREE.BufferGeometry[] = [];
  const cellMeshes: Array<THREE.Mesh | null> = buckets.map((triIndices) => {
    if (triIndices.length === 0 || !posAttr) return null;
    const chunkGeo = new THREE.BufferGeometry();
    chunkGeo.setAttribute('position', posAttr);
    chunkGeo.setIndex(triIndices);
    chunkGeo.computeBoundingBox();
    chunkGeo.computeBoundingSphere();
    chunkGeos.push(chunkGeo);
    const chunkMesh = new THREE.Mesh(chunkGeo);
    chunkMesh.matrixWorld.copy(terrainMesh.matrixWorld);
    chunkMesh.matrixAutoUpdate = false;
    return chunkMesh;
  });

  const raycastSurface = (x: number, z: number): TerrainHit => {
    const gx = Math.floor((x - MIN_C) / CELL_SPAN);
    const gz = Math.floor((z - MIN_C) / CELL_SPAN);
    if (gx >= 0 && gx < GRID_N && gz >= 0 && gz < GRID_N) {
      const targetMesh = cellMeshes[gz * GRID_N + gx];
      if (targetMesh) {
        origin.set(x, 30, z);
        raycaster.set(origin, down);
        const hits = raycaster.intersectObject(targetMesh, false);
        if (hits.length > 0) {
          const h = hits[0];
          const n = h.face
            ? h.face.normal.clone().applyMatrix3(normalMatrix).normalize()
            : new THREE.Vector3(0, 1, 0);
          if (n.y < 0) n.negate();
          return { y: h.point.y, normal: n, hit: true };
        }
      }
    }
    const fallbackN = terrainNormalAt(x, z);
    return {
      y: terrainElevation(x, z),
      normal: new THREE.Vector3(fallbackN.x, fallbackN.y, fallbackN.z).normalize(),
      hit: false,
    };
  };

  const groundPropFootprint = (
    x: number,
    z: number,
    radius: number,
    maxTiltRad: number,
    embed: number,
  ): GroundedPlacement => {
    const r = Math.max(0.08, radius);
    const c = raycastSurface(x, z);
    const hL = raycastSurface(x - r, z);
    const hR = raycastSurface(x + r, z);
    const hD = raycastSurface(x, z - r);
    const hU = raycastSurface(x, z + r);

    const heights = [c.y, hL.y, hR.y, hD.y, hU.y];
    const minY = Math.min(...heights);
    const maxY = Math.max(...heights);
    const avgY = heights.reduce((acc, v) => acc + v, 0) / heights.length;

    const planeNormal = new THREE.Vector3(hL.y - hR.y, 2 * r, hD.y - hU.y).normalize();
    const rawAngle = up.angleTo(planeNormal);
    const clampedAngle = Math.min(Math.max(0, maxTiltRad), rawAngle);
    const tiltQuat = new THREE.Quaternion();
    if (rawAngle > 1e-4 && clampedAngle > 1e-4) {
      const axis = new THREE.Vector3().crossVectors(up, planeNormal).normalize();
      tiltQuat.setFromAxisAngle(axis, clampedAngle);
    }

    const slope = Math.max(0, (maxY - minY) / (2 * r));
    // Anchor between min rim & average height minus embed so downhill rims never float
    const anchorY = minY * 0.52 + avgY * 0.48 - embed;

    return {
      y: anchorY,
      minY,
      avgY,
      maxY,
      slope,
      normal: planeNormal,
      tiltQuat,
    };
  };

  return {
    raycastSurface,
    groundPropFootprint,
    dispose: () => {
      chunkGeos.forEach((g) => g.dispose());
    },
  };
}

function createFlaredTubeGeometry(
  curve: THREE.CatmullRomCurve3,
  segs: number,
  baseRadius: number,
  taperRatio: number,
  flareStrength: number,
  radialSegs = 9,
): THREE.BufferGeometry {
  const geo = new THREE.TubeGeometry(curve, segs, baseRadius, radialSegs, false);
  const pos = geo.attributes.position;
  const uvAttr = geo.attributes.uv;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    const ringIdx = Math.floor(i / (radialSegs + 1));
    const t = Math.min(1, ringIdx / segs);
    const center = curve.getPointAt(t);
    const taper = 1 - t * taperRatio;
    const flareZone = 0.34;
    const flare =
      t < flareZone && flareStrength > 0
        ? 1 + flareStrength * Math.pow(1 - t / flareZone, 1.75)
        : 1;
    v.fromBufferAttribute(pos, i)
      .sub(center)
      .multiplyScalar(taper * flare)
      .add(center);
    pos.setXYZ(i, v.x, v.y, v.z);
    uvAttr.setXY(i, uvAttr.getX(i) * 2.0, uvAttr.getY(i) * 4.0);
  }
  geo.computeVertexNormals();
  return geo;
}

function createNaturalBankStones(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const shoreMat = createShoreStoneMaterial(textures);
  disposables.push(shoreMat);

  const boulderPrototypes = [0, 1, 2, 3, 4].map((seed) => {
    const geo = sculptBoulderGeometry(0.46, 2, seed * 2.37 + 0.8);
    disposables.push(geo);
    return geo;
  });

  // Art-directed shoreline rock clusters:
  // - Richer layered foreground outcrops (bottom & lower-right)
  // - Calmer, slightly lower left bank under editorial headline
  // - Clean unobstructed inlet channel in front of Tsukubai stream (z in [-0.25 .. 1.15])
  const rockClusters: Array<{ angle: number; stones: Array<[number, number, number, number, number]> }> = [
    // Foreground left layered cove boulders stepping into shallow water
    {
      angle: Math.PI * 0.67,
      stones: [
        [0, 1.01, 1.44, 0.54, 1.12],
        [0.12, 1.06, 1.08, 0.4, 0.9],
        [-0.14, 0.98, 0.9, 0.32, 0.76],
        [0.24, 1.03, 0.7, 0.26, 0.62],
      ],
    },
    // Mid-left shoreline boulders bordering the stepping-stone path (restrained height)
    {
      angle: Math.PI * 0.92,
      stones: [
        [0, 1.02, 1.28, 0.44, 1.02],
        [0.14, 1.06, 0.9, 0.34, 0.8],
        [-0.17, 1.0, 0.72, 0.28, 0.64],
      ],
    },
    // Upper-left pond cove rocks
    {
      angle: -Math.PI * 0.78,
      stones: [
        [0, 1.03, 1.26, 0.46, 0.94],
        [0.16, 1.05, 0.84, 0.32, 0.72],
        [-0.18, 0.99, 0.66, 0.26, 0.6],
      ],
    },
    // North-west shoulder stones softening back pond transition
    {
      angle: -Math.PI * 0.58,
      stones: [
        [0, 1.04, 1.24, 0.42, 0.92],
        [0.14, 1.07, 0.88, 0.32, 0.74],
      ],
    },
    // Far north cove rocks beneath bamboo ridge
    {
      angle: -Math.PI * 0.44,
      stones: [
        [0, 1.03, 1.38, 0.46, 0.98],
        [0.16, 1.06, 0.9, 0.34, 0.76],
        [-0.17, 1.01, 0.72, 0.28, 0.62],
      ],
    },
    // North-east shoulder stones bridging to sakura cove
    {
      angle: -Math.PI * 0.32,
      stones: [
        [0, 1.04, 1.26, 0.44, 0.94],
        [-0.13, 1.07, 0.84, 0.32, 0.72],
      ],
    },
    // Upper-right mossy bank under sakura overhang (safely north of Tsukubai cove)
    {
      angle: -Math.PI * 0.21,
      stones: [
        [0, 1.04, 1.3, 0.5, 0.98],
        [-0.14, 1.02, 0.86, 0.36, 0.76],
        [0.1, 1.07, 0.74, 0.3, 0.64],
      ],
    },
    // Mid-right shoreline outcrop clearly south of Tsukubai water stream channel
    {
      angle: Math.PI * 0.19,
      stones: [
        [0.02, 1.03, 1.2, 0.5, 0.96],
        [-0.08, 1.04, 0.82, 0.35, 0.72],
        [0.14, 1.02, 0.72, 0.3, 0.64],
      ],
    },
    // Lower-right / center foreground framing boulders beside pebble beach
    {
      angle: Math.PI * 0.43,
      stones: [
        [0, 1.01, 1.42, 0.38, 1.04],
        [0.14, 1.04, 0.86, 0.29, 0.72],
        [-0.16, 0.98, 0.66, 0.23, 0.56],
      ],
    },
  ];

  const dummyAxis = new THREE.Vector3();
  const baseQuat = new THREE.Quaternion();
  const baseEuler = new THREE.Euler();

  let stoneIndex = 0;
  rockClusters.forEach((cluster) => {
    cluster.stones.forEach(([dAngle, radScale, sx, sy, sz]) => {
      const idx = stoneIndex++;
      const angle = cluster.angle + dAngle;
      const pt = pondBoundaryPoint(angle, radScale);
      const footprintRadius = 0.44 * Math.max(sx, sz);
      const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;

      const mesh = new THREE.Mesh(boulderPrototypes[idx % boulderPrototypes.length], shoreMat);
      const yaw = -angle + 0.45 * Math.cos(idx * 2.3);

      if (isWaterSide) {
        const bedY = pondBedElevation(pt.x, pt.z);
        mesh.position.set(pt.x, Math.max(-0.14, bedY + sy * 0.12) - sy * 0.06, pt.z);
        mesh.rotation.set(0.06 * Math.sin(idx * 1.9), yaw, 0.05 * Math.cos(idx * 2.1));
      } else {
        const grounded = grounder.groundPropFootprint(
          pt.x,
          pt.z,
          footprintRadius * 0.65,
          0.22,
          0.46 * sy * 0.26,
        );
        mesh.position.set(pt.x, grounded.y, pt.z);
        baseEuler.set(0.06 * Math.sin(idx * 1.9), yaw, 0.05 * Math.cos(idx * 2.1));
        baseQuat.setFromEuler(baseEuler);
        mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
      }

      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      registry.register({
        id: `shore-boulder-${idx}`,
        kind: 'rock',
        x: pt.x,
        z: pt.z,
        rx: 0.46 * sx,
        rz: 0.46 * sz,
        yaw,
        margin: 0.1,
        baseY: mesh.position.y - 0.42 * sy,
        topY: mesh.position.y + 0.42 * sy,
      });
    });
  });

  // Low wet shoreline cobbles softening bank-to-water transitions (keeping stream channel clear)
  const cobbleCount = 36;
  for (let i = 0; i < cobbleCount; i++) {
    const angle = (i / cobbleCount) * Math.PI * 2 + 0.09 * Math.sin(i * 4.3);
    const pt = pondBoundaryPoint(angle, 0.965 + (i % 3) * 0.032);

    // Keep the waterfall inlet opening unobstructed
    const dStream = Math.hypot(
      pt.x - (WATERFALL_SOURCE_POINT.x + WATERFALL_IMPACT_POINT.x) * 0.5,
      pt.z - (WATERFALL_SOURCE_POINT.z + WATERFALL_IMPACT_POINT.z) * 0.5,
    );
    if (dStream < 0.78) continue;

    const mesh = new THREE.Mesh(boulderPrototypes[(i + 2) % boulderPrototypes.length], shoreMat);
    const s = 0.24 + (i % 4) * 0.075;
    const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;
    const yaw = i * 1.35;

    if (isWaterSide) {
      const bedY = pondBedElevation(pt.x, pt.z);
      mesh.position.set(pt.x, Math.max(-0.08, bedY + s * 0.04), pt.z);
      mesh.rotation.set(0.08 * Math.sin(i), yaw, 0.06 * Math.cos(i));
    } else {
      const grounded = grounder.groundPropFootprint(pt.x, pt.z, s * 0.42, 0.24, s * 0.16);
      mesh.position.set(pt.x, grounded.y, pt.z);
      baseEuler.set(0.06 * Math.sin(i), yaw, 0.05 * Math.cos(i));
      baseQuat.setFromEuler(baseEuler);
      mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    }

    mesh.scale.set(s * 1.25, s * 0.42, s * 0.94);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    registry.register({
      id: `shore-cobble-${i}`,
      kind: 'cobble',
      x: pt.x,
      z: pt.z,
      rx: 0.46 * s * 1.25,
      rz: 0.46 * s * 0.94,
      yaw,
      margin: 0.06,
      topY: mesh.position.y + 0.42 * s * 0.42,
    });
  }

  void dummyAxis;
  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createSakuraTree(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const treeScale = 1.18;
  const treeYaw = -0.08;
  const baseHit = grounder.raycastSurface(SAKURA_CENTER.x, SAKURA_CENTER.z);
  group.position.set(SAKURA_CENTER.x, baseHit.y, SAKURA_CENTER.z);
  group.scale.setScalar(treeScale);
  group.rotation.y = treeYaw;
  group.updateMatrixWorld(true);

  // Measure lowest downhill rim around the trunk footprint so base penetrates well below grade
  let minAroundY = baseHit.y;
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    const h = grounder.raycastSurface(
      SAKURA_CENTER.x + Math.cos(a) * 0.55,
      SAKURA_CENTER.z + Math.sin(a) * 0.55,
    ).y;
    if (h < minAroundY) minAroundY = h;
  }
  const minLocalY = (minAroundY - baseHit.y) / treeScale;
  const trunkBottomLocalY = Math.min(-0.62, minLocalY - 0.34);

  const barkMat = new THREE.MeshStandardNodeMaterial({
    map: textures.barkAlbedo,
    normalMap: textures.barkNormal,
    normalScale: new THREE.Vector2(1.25, 1.25),
    roughness: 0.9,
    metalness: 0.02,
  });
  disposables.push(barkMat);

  // Main trunk deeply embedded past lowest bank rim + organic flared collar, plus sweeping sakura boughs
  const branchSpecs: Array<{
    pts: [number, number, number][];
    r: number;
    segs: number;
    taper: number;
    flare: number;
  }> = [
    {
      pts: [
        [0.08, trunkBottomLocalY, 0.06],
        [0.11, -0.04, 0.08],
        [0.05, 0.35, 0.07],
        [-0.08, 0.98, 0.02],
        [-0.38, 1.85, -0.08],
        [-0.86, 2.75, 0.06],
      ],
      r: 0.23,
      segs: 26,
      taper: 0.58,
      flare: 0.72,
    },
    {
      pts: [
        [-0.36, 1.78, -0.06],
        [-1.12, 2.52, 0.18],
        [-1.95, 3.05, 0.34],
        [-2.58, 3.25, 0.22],
      ],
      r: 0.125,
      segs: 16,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.65, 2.38, 0.02],
        [-1.08, 3.28, -0.18],
        [-1.56, 3.92, -0.08],
        [-1.98, 4.18, 0.12],
      ],
      r: 0.095,
      segs: 14,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.22, 1.48, -0.02],
        [0.42, 2.28, 0.36],
        [0.95, 2.86, 0.56],
        [1.26, 3.12, 0.42],
      ],
      r: 0.105,
      segs: 14,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.95, 2.36, 0.14],
        [-1.52, 2.48, 0.62],
        [-2.04, 2.36, 0.88],
      ],
      r: 0.062,
      segs: 12,
      taper: 0.68,
      flare: 0,
    },
    {
      pts: [
        [-0.48, 2.08, -0.05],
        [-0.12, 2.95, -0.62],
        [0.34, 3.56, -0.92],
      ],
      r: 0.084,
      segs: 12,
      taper: 0.66,
      flare: 0,
    },
    {
      pts: [
        [-1.58, 2.82, 0.26],
        [-1.92, 3.45, 0.02],
        [-2.28, 3.68, -0.22],
      ],
      r: 0.048,
      segs: 10,
      taper: 0.7,
      flare: 0,
    },
  ];

  branchSpecs.forEach((spec) => {
    const curve = new THREE.CatmullRomCurve3(
      spec.pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    );
    const tubeGeo = createFlaredTubeGeometry(curve, spec.segs, spec.r, spec.taper, spec.flare, 9);
    const mesh = new THREE.Mesh(tubeGeo, barkMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    disposables.push(tubeGeo);
  });

  // 5 terrain-raycasted buttress roots emerging right at the soil collar and gripping downward with zero air gap
  const rootOriginLocal = new THREE.Vector3(0.11, 0.04, 0.08);
  const rootOriginWorld = rootOriginLocal.clone().applyMatrix4(group.matrixWorld);
  const rootAngles = [0.22, 1.48, 2.74, 4.05, 5.28];
  const worldVec = new THREE.Vector3();

  rootAngles.forEach((ang, rIdx) => {
    const midDist = 0.36 + (rIdx % 2) * 0.06;
    const tipDist = 0.72 + (rIdx % 3) * 0.1;

    const midLocal = new THREE.Vector3(
      rootOriginLocal.x + Math.cos(ang) * midDist,
      0,
      rootOriginLocal.z + Math.sin(ang) * midDist,
    );
    const midWorld = midLocal.clone().applyMatrix4(group.matrixWorld);
    const midGroundY = grounder.raycastSurface(midWorld.x, midWorld.z).y;
    worldVec.set(midWorld.x, midGroundY + 0.015, midWorld.z);
    group.worldToLocal(worldVec);
    midLocal.y = worldVec.y;

    const tipLocal = new THREE.Vector3(
      rootOriginLocal.x + Math.cos(ang + 0.14 * Math.sin(rIdx)) * tipDist,
      0,
      rootOriginLocal.z + Math.sin(ang + 0.14 * Math.sin(rIdx)) * tipDist,
    );
    const tipWorld = tipLocal.clone().applyMatrix4(group.matrixWorld);
    const tipGroundY = grounder.raycastSurface(tipWorld.x, tipWorld.z).y;
    worldVec.set(tipWorld.x, tipGroundY - 0.18, tipWorld.z);
    group.worldToLocal(worldVec);
    tipLocal.y = worldVec.y;

    const rootCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(
        rootOriginLocal.x + Math.cos(ang) * 0.08,
        0.04,
        rootOriginLocal.z + Math.sin(ang) * 0.08,
      ),
      midLocal,
      tipLocal,
    ]);
    const rootGeo = createFlaredTubeGeometry(rootCurve, 10, 0.125, 0.8, 0.25, 7);
    const rootMesh = new THREE.Mesh(rootGeo, barkMat);
    rootMesh.castShadow = true;
    rootMesh.receiveShadow = true;
    group.add(rootMesh);
    disposables.push(rootGeo);

    registry.registerCapsule(
      'tree',
      rootOriginWorld.x,
      rootOriginWorld.z,
      tipWorld.x,
      tipWorld.z,
      0.16,
      0.08,
      undefined,
      `sakura-root-${rIdx}`,
    );
  });

  // Register sakura main trunk footprint
  registry.register({
    id: 'sakura-trunk',
    kind: 'tree',
    x: rootOriginWorld.x,
    z: rootOriginWorld.z,
    rx: 0.62,
    rz: 0.62,
    margin: 0.18,
  });

  // Soft rounded blossom cores + delicate cherry blossom spray cards
  const puffGeo = new THREE.SphereGeometry(0.11, 8, 6);
  const puffPos = puffGeo.attributes.position;
  const pv = new THREE.Vector3();
  for (let i = 0; i < puffPos.count; i++) {
    pv.fromBufferAttribute(puffPos, i);
    pv.y *= 0.72;
    puffPos.setXYZ(i, pv.x, pv.y, pv.z);
  }
  puffGeo.computeVertexNormals();

  const blossomMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.74,
    metalness: 0.0,
    transparent: true,
    opacity: 0.88,
  });
  const windSway = sin(
    elapsedUniform.mul(1.02).add(positionWorld.x.mul(1.2)).add(positionWorld.z.mul(0.9)),
  )
    .mul(0.026)
    .mul(smoothstep(1.2, 3.8, positionWorld.y));
  blossomMat.positionNode = positionLocal.add(vec3(windSway, windSway.mul(0.35), windSway.mul(0.5)));
  blossomMat.emissive.setHex(0x633b42);
  blossomMat.emissiveIntensity = 0.32;

  const petalSprigGeo = new THREE.PlaneGeometry(0.56, 0.56);
  const petalSprigMat = new THREE.MeshStandardNodeMaterial({
    map: textures.blossomMap,
    alphaTest: 0.28,
    roughness: 0.66,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  petalSprigMat.positionNode = positionLocal.add(
    vec3(windSway, windSway.mul(0.35), windSway.mul(0.5)),
  );
  petalSprigMat.emissive.setHex(0x633b42);
  petalSprigMat.emissiveIntensity = 0.28;

  disposables.push(puffGeo, blossomMat, petalSprigGeo, petalSprigMat);

  const boughAnchors: Array<[number, number, number, number]> = [
    [-2.52, 3.24, 0.2, 1.1],
    [-2.12, 3.08, 0.32, 1.15],
    [-1.78, 2.94, 0.24, 1.08],
    [-1.36, 2.66, 0.22, 1.12],
    [-1.98, 2.38, 0.84, 0.96],
    [-1.48, 2.5, 0.6, 1.02],
    [-1.94, 4.12, 0.12, 1.08],
    [-1.54, 3.88, -0.06, 1.14],
    [-1.12, 3.36, -0.14, 1.12],
    [-2.24, 3.64, -0.2, 1.0],
    [-0.78, 2.86, 0.08, 1.08],
    [-0.42, 3.18, -0.18, 1.04],
    [0.06, 3.48, -0.58, 1.06],
    [0.34, 3.52, -0.88, 0.98],
    [0.44, 2.38, 0.34, 1.02],
    [0.9, 2.84, 0.54, 1.08],
    [1.22, 3.1, 0.4, 1.02],
    [-0.95, 2.58, -0.35, 0.94],
    [-0.18, 2.55, 0.28, 0.98],
    [0.64, 3.05, 0.04, 1.04],
    [-1.72, 3.38, 0.46, 0.96],
    [-2.35, 2.82, 0.58, 0.92],
  ];

  const subOffsets: Array<[number, number, number, number]> =
    quality === 'desktop'
      ? [
          [0, 0, 0, 0.96],
          [0.16, 0.09, -0.09, 0.78],
          [-0.14, -0.05, 0.11, 0.74],
        ]
      : [
          [0, 0, 0, 0.95],
          [0.14, 0.08, -0.08, 0.76],
        ];

  const puffInst = new THREE.InstancedMesh(
    puffGeo,
    blossomMat,
    boughAnchors.length * subOffsets.length,
  );
  puffInst.castShadow = true;

  const sprigsPerAnchor = quality === 'desktop' ? 6 : 4;
  const sprigInst = new THREE.InstancedMesh(
    petalSprigGeo,
    petalSprigMat,
    boughAnchors.length * sprigsPerAnchor,
  );

  const dummy = new THREE.Object3D();
  const cTint = new THREE.Color();
  const paletteShades = [0xf8dce3, 0xf1cbd5, 0xfff0f4, 0xeab9c6];

  let pIdx = 0;
  let sIdx = 0;
  boughAnchors.forEach(([ax, ay, az, ascale], bIdx) => {
    subOffsets.forEach(([ox, oy, oz, os], k) => {
      dummy.position.set(ax + ox * ascale, ay + oy * ascale, az + oz * ascale);
      dummy.rotation.set(pIdx * 0.7, pIdx * 1.1, pIdx * 0.4);
      const sc = ascale * os;
      dummy.scale.set(sc * 1.12, sc * 0.82, sc * 1.04);
      dummy.updateMatrix();
      puffInst.setMatrixAt(pIdx, dummy.matrix);
      cTint.setHex(paletteShades[(bIdx + k) % paletteShades.length]);
      puffInst.setColorAt(pIdx, cTint);
      pIdx++;
    });

    for (let m = 0; m < sprigsPerAnchor; m++) {
      const ang = (m / sprigsPerAnchor) * Math.PI * 2 + bIdx * 0.65;
      const rad = (0.08 + (m % 3) * 0.12) * ascale;
      dummy.position.set(
        ax + Math.cos(ang) * rad,
        ay + ((m % 3) - 1) * 0.09 * ascale,
        az + Math.sin(ang) * rad,
      );
      dummy.rotation.set(
        0.52 * Math.sin(bIdx + m * 1.3),
        bIdx * 1.15 + m * 1.05,
        0.42 * Math.cos(bIdx + m),
      );
      dummy.scale.setScalar(ascale * (1.05 + (m % 3) * 0.16));
      dummy.updateMatrix();
      sprigInst.setMatrixAt(sIdx, dummy.matrix);
      cTint.setHex(paletteShades[(bIdx + m) % paletteShades.length]);
      sprigInst.setColorAt(sIdx, cTint);
      sIdx++;
    }
  });

  puffInst.instanceMatrix.needsUpdate = true;
  if (puffInst.instanceColor) puffInst.instanceColor.needsUpdate = true;
  puffInst.computeBoundingSphere();
  sprigInst.instanceMatrix.needsUpdate = true;
  if (sprigInst.instanceColor) sprigInst.instanceColor.needsUpdate = true;
  sprigInst.computeBoundingSphere();
  group.add(puffInst, sprigInst);

  // Individually terrain-raycasted root-collar accent stones cradling the flared cherry roots
  const collarMat = createShoreStoneMaterial(textures);
  const collarGeo = sculptBoulderGeometry(0.24, 1, 7.7);
  const collarSpecs: Array<[number, number, number, number, number]> = [
    [-0.44, 0.36, 1.05, 0.56, 0.88],
    [0.52, 0.28, 0.92, 0.48, 0.82],
    [-0.1, -0.54, 0.96, 0.52, 0.92],
  ];
  collarSpecs.forEach(([cx, cz, sx, sy, sz], idx) => {
    const worldPt = new THREE.Vector3(cx, 0, cz).applyMatrix4(group.matrixWorld);
    const grounded = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.22 * sx, 0.18, 0.24 * sy * 0.32);
    const localAnchor = new THREE.Vector3(worldPt.x, grounded.y, worldPt.z);
    group.worldToLocal(localAnchor);

    const stone = new THREE.Mesh(collarGeo, collarMat);
    stone.position.set(cx, localAnchor.y, cz);
    stone.rotation.set(0.06 * Math.sin(idx), idx * 1.4, 0.06 * Math.cos(idx));
    stone.scale.set(sx, sy, sz);
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);

    registry.register({
      id: `sakura-collar-${idx}`,
      kind: 'rock',
      x: worldPt.x,
      z: worldPt.z,
      rx: 0.24 * sx * treeScale,
      rz: 0.24 * sz * treeScale,
      yaw: idx * 1.4 + treeYaw,
      margin: 0.08,
      topY: grounded.y + 0.22 * sy * treeScale,
    });
  });
  disposables.push(collarGeo, collarMat);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createShrineHall(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const shrineYaw = 0.22;
  const grounded = grounder.groundPropFootprint(SHRINE_CENTER.x, SHRINE_CENTER.z, 1.35, 0.02, 0.04);
  group.position.set(SHRINE_CENTER.x, grounded.y, SHRINE_CENTER.z);
  group.rotation.y = shrineYaw;
  group.updateMatrixWorld(true);

  const plinthMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    roughness: 0.88,
    metalness: 0.02,
    color: 0xa49c88,
  });
  const agedTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.78,
    metalness: 0.03,
    color: 0x766450,
  });
  const darkTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.82,
    metalness: 0.03,
    color: 0x524538,
  });
  const shojiMat = new THREE.MeshStandardNodeMaterial({
    color: 0xc9b492,
    emissive: 0xd9a15b,
    emissiveIntensity: 0.24,
    roughness: 0.75,
  });
  const roofMat = new THREE.MeshStandardNodeMaterial({
    map: textures.roofAlbedo,
    normalMap: textures.roofNormal,
    normalScale: new THREE.Vector2(1.2, 1.2),
    roughness: 0.64,
    metalness: 0.06,
    color: 0x6f675a,
  });
  disposables.push(plinthMat, agedTimberMat, darkTimberMat, shojiMat, roofMat);

  // Stone foundation masonry retaining wall extended downward (-0.42m) so sloped edges stay sealed
  const plinthGeo = new THREE.BoxGeometry(2.68, 0.74, 2.08);
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.set(0, -0.06, 0);
  plinth.receiveShadow = true;
  plinth.castShadow = true;

  const stepLowerGeo = new THREE.BoxGeometry(1.18, 0.3, 0.44);
  const stepLower = new THREE.Mesh(stepLowerGeo, plinthMat);
  stepLower.position.set(0, -0.02, 1.24);
  stepLower.receiveShadow = true;
  stepLower.castShadow = true;

  const stepUpperGeo = new THREE.BoxGeometry(1.04, 0.16, 0.34);
  const stepUpper = new THREE.Mesh(stepUpperGeo, plinthMat);
  stepUpper.position.set(0, 0.18, 1.05);
  stepUpper.receiveShadow = true;
  stepUpper.castShadow = true;

  // Granite skirting stones grounded cleanly along approach stairs
  const skirtGeo = sculptBoulderGeometry(0.24, 1, 5.4);
  [
    [-0.92, 1.18, 0],
    [0.92, 1.18, 1.3],
  ].forEach(([lx, lz, rotY]) => {
    const worldPt = new THREE.Vector3(lx, 0, lz).applyMatrix4(group.matrixWorld);
    const sg = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.26, 0.14, 0.08);
    const localPos = new THREE.Vector3(worldPt.x, sg.y, worldPt.z);
    group.worldToLocal(localPos);

    const skirt = new THREE.Mesh(skirtGeo, plinthMat);
    skirt.position.set(lx, localPos.y, lz);
    skirt.rotation.y = rotY;
    skirt.scale.set(1.25, 0.55, 0.95);
    skirt.receiveShadow = true;
    skirt.castShadow = true;
    group.add(skirt);
  });
  disposables.push(skirtGeo);

  const verandaGeo = new THREE.BoxGeometry(2.42, 0.12, 1.84);
  const veranda = new THREE.Mesh(verandaGeo, agedTimberMat);
  veranda.position.set(0, 0.37, 0);
  veranda.receiveShadow = true;
  veranda.castShadow = true;

  const railGeo = new THREE.BoxGeometry(0.055, 0.055, 1.72);
  const railL = new THREE.Mesh(railGeo, darkTimberMat);
  railL.position.set(-1.14, 0.64, 0);
  const railR = new THREE.Mesh(railGeo, darkTimberMat);
  railR.position.set(1.14, 0.64, 0);

  const bodyGeo = new THREE.BoxGeometry(1.86, 1.12, 1.28);
  const body = new THREE.Mesh(bodyGeo, darkTimberMat);
  body.position.set(0, 0.98, -0.06);
  body.castShadow = true;
  body.receiveShadow = true;

  const doorGeo = new THREE.BoxGeometry(0.72, 0.86, 0.05);
  const shojiDoor = new THREE.Mesh(doorGeo, shojiMat);
  shojiDoor.position.set(0, 0.86, 0.565);

  const mullionGeo = new THREE.BoxGeometry(0.028, 0.86, 0.068);
  [-0.22, 0, 0.22].forEach((mx) => {
    const mullion = new THREE.Mesh(mullionGeo, darkTimberMat);
    mullion.position.set(mx, 0.86, 0.575);
    group.add(mullion);
  });

  const postGeo = new THREE.BoxGeometry(0.105, 1.24, 0.105);
  const postCoords: Array<[number, number]> = [
    [-0.94, 0.62],
    [-0.44, 0.62],
    [0.44, 0.62],
    [0.94, 0.62],
    [-0.94, -0.72],
    [0.94, -0.72],
    [-1.12, 0.84],
    [1.12, 0.84],
  ];
  postCoords.forEach(([px, pz]) => {
    const post = new THREE.Mesh(postGeo, agedTimberMat);
    post.position.set(px, 0.98, pz);
    post.castShadow = true;
    post.receiveShadow = true;
    group.add(post);
  });

  const beamGeo = new THREE.BoxGeometry(2.38, 0.11, 1.66);
  const beam = new THREE.Mesh(beamGeo, darkTimberMat);
  beam.position.set(0, 1.56, 0.04);
  beam.castShadow = true;

  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.38, 0);
  roofShape.quadraticCurveTo(-0.66, 0.34, 0, 0.88);
  roofShape.quadraticCurveTo(0.66, 0.34, 1.38, 0);
  roofShape.lineTo(1.28, -0.09);
  roofShape.quadraticCurveTo(0.58, 0.24, 0, 0.74);
  roofShape.quadraticCurveTo(-0.58, 0.24, -1.28, -0.09);
  roofShape.closePath();

  const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
    depth: 3.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  roofGeo.center();
  roofGeo.rotateY(Math.PI / 2);

  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 1.96, -0.04);
  roof.castShadow = true;
  roof.receiveShadow = true;

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-0.74, 0);
  gableShape.quadraticCurveTo(-0.34, 0.16, 0, 0.44);
  gableShape.quadraticCurveTo(0.34, 0.16, 0.74, 0);
  gableShape.lineTo(0.66, -0.06);
  gableShape.quadraticCurveTo(0.28, 0.11, 0, 0.34);
  gableShape.quadraticCurveTo(-0.28, 0.11, -0.66, -0.06);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.92,
    bevelEnabled: false,
  });
  gableGeo.center();
  const frontGable = new THREE.Mesh(gableGeo, roofMat);
  frontGable.position.set(0, 1.72, 0.74);
  frontGable.castShadow = true;

  const ridgeGeo = new THREE.BoxGeometry(3.26, 0.11, 0.15);
  const ridge = new THREE.Mesh(ridgeGeo, darkTimberMat);
  ridge.position.set(0, 2.41, -0.04);
  ridge.castShadow = true;

  const finialGeo = new THREE.BoxGeometry(0.16, 0.14, 0.18);
  const capL = new THREE.Mesh(finialGeo, agedTimberMat);
  capL.position.set(-1.62, 2.44, -0.04);
  const capR = new THREE.Mesh(finialGeo, agedTimberMat);
  capR.position.set(1.62, 2.44, -0.04);

  group.add(
    plinth,
    stepLower,
    stepUpper,
    veranda,
    railL,
    railR,
    body,
    shojiDoor,
    beam,
    roof,
    frontGable,
    ridge,
    capL,
    capR,
  );
  disposables.push(
    plinthGeo,
    stepLowerGeo,
    stepUpperGeo,
    verandaGeo,
    railGeo,
    bodyGeo,
    doorGeo,
    mullionGeo,
    postGeo,
    beamGeo,
    roofGeo,
    gableGeo,
    ridgeGeo,
    finialGeo,
  );

  // Register full shrine plinth + stair apron exclusion zone
  registry.register({
    id: 'shrine-hall',
    kind: 'shrine',
    x: SHRINE_CENTER.x,
    z: SHRINE_CENTER.z,
    rx: 1.56,
    rz: 1.52,
    yaw: shrineYaw,
    margin: 0.22,
  });

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createSculptedGardenTerrain(textures: PondTextureSuite): {
  mesh: THREE.Mesh;
  dispose: () => void;
} {
  const angularSegs = 128;
  const radialRings = 56;
  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialRings; r++) {
    let radScale = 0.94;
    if (r === 1) {
      radScale = 0.985;
    } else if (r >= 2) {
      const u = (r - 1) / (radialRings - 1);
      radScale = 0.985 + 0.36 * u + 18.0 * Math.pow(u, 2.75);
    }

    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const pt = pondBoundaryPoint(theta, radScale);
      let y = 0;
      if (r === 0) {
        y = pondBedElevation(pt.x, pt.z) - 0.06;
      } else if (r === 1) {
        y = pondBedElevation(pt.x, pt.z) - 0.015;
      } else {
        y = terrainElevation(pt.x, pt.z);
      }

      positions.push(pt.x, y, pt.z);
      uvs.push(pt.x * 0.45, pt.z * 0.45);

      const weights = getGroundMaterialWeights(pt);
      const shoreDist = signedDistanceToPond(pt);
      const rim =
        shoreDist < 0.48
          ? Math.max(weights.wetStone * 1.35, 1 - Math.max(0, shoreDist) / 0.48)
          : weights.wetStone * 1.25;
      colors.push(
        Math.min(1, weights.gravel * 1.55),
        Math.min(1, weights.forestLitter * 1.4),
        Math.min(1, rim),
      );
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialRings; r++) {
    for (let a = 0; a < angularSegs; a++) {
      const i0 = r * stride + a;
      const i1 = r * stride + (a + 1);
      const i2 = (r + 1) * stride + a;
      const i3 = (r + 1) * stride + (a + 1);
      // Upward-facing (+Y) CCW winding from above: (p1 - p0) x (p2 - p0) = (+Z) x (+X) = +Y
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();

  const mat = createGroundTerraceMaterial(textures);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;

  return {
    mesh,
    dispose: () => {
      geo.dispose();
      mat.dispose();
    },
  };
}

function createWaterfallBasin(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  impactPoint: PointXZ;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const stoneMat = createShoreStoneMaterial(textures);
  const ceramicMat = new THREE.MeshPhysicalNodeMaterial({
    map: textures.clayAlbedo,
    normalMap: textures.clayNormal,
    normalScale: new THREE.Vector2(0.45, 0.45),
    roughness: 0.42,
    metalness: 0.04,
    clearcoat: 0.45,
    clearcoatRoughness: 0.28,
  });
  const bambooMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooAlbedo,
    normalMap: textures.bambooNormal,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughness: 0.58,
    metalness: 0.02,
    color: 0xb7aa86,
  });
  const twineMat = createMatteNodeMaterial(0x28231d, 0.92, 0.01);
  const basinWaterMat = new THREE.MeshPhysicalNodeMaterial({
    color: 0x26594f,
    normalMap: textures.waterNormalA,
    normalScale: new THREE.Vector2(0.55, 0.55),
    roughness: 0.08,
    metalness: 0.04,
    clearcoat: 0.85,
  });
  const streamMat = createTrickleStreamMaterial(textures, elapsedUniform);

  disposables.push(stoneMat, ceramicMat, bambooMat, twineMat, basinWaterMat, streamMat);

  // Orient local +Z from right-bank ceramic jar straight west toward pond impact point
  const dx = WATERFALL_IMPACT_POINT.x - WATERFALL_SOURCE_POINT.x;
  const dz = WATERFALL_IMPACT_POINT.z - WATERFALL_SOURCE_POINT.z;
  const dirAngle = Math.atan2(dx, dz);

  // Ground pedestal base on the leveled Tsukubai terrace with deep foundation skirt
  const baseSample = grounder.groundPropFootprint(
    WATERFALL_SOURCE_POINT.x,
    WATERFALL_SOURCE_POINT.z,
    0.55,
    0.04,
    0.0,
  );
  const anchorY = baseSample.avgY;
  group.position.set(WATERFALL_SOURCE_POINT.x, anchorY, WATERFALL_SOURCE_POINT.z);
  group.rotation.y = dirAngle;
  group.updateMatrixWorld(true);

  // 1. Flat-topped river-stone pedestal seated deeply so rim never floats and top stays cleanly above grade
  const pedestalTopLocalY = 0.065;
  const pedestalBotLocalY = baseSample.minY - anchorY - 0.16;
  const pedestalHeight = Math.max(0.24, pedestalTopLocalY - pedestalBotLocalY);
  const pedestalGeo = new THREE.CylinderGeometry(0.42, 0.5, pedestalHeight, 20, 3);
  const pPos = pedestalGeo.attributes.position;
  const pv = new THREE.Vector3();
  for (let i = 0; i < pPos.count; i++) {
    pv.fromBufferAttribute(pPos, i);
    const yNorm = (pv.y + pedestalHeight * 0.5) / pedestalHeight;
    // Keep top seating surface flat (yNorm > 0.88) while chiseling natural irregular river-stone flanks
    if (yNorm < 0.88) {
      const ang = Math.atan2(pv.z, pv.x);
      const chis = 1 + 0.08 * Math.sin(ang * 3 + 0.5) + 0.05 * Math.cos(ang * 5 - 0.4);
      pv.x *= chis;
      pv.z *= chis;
    }
    pPos.setXYZ(i, pv.x, pv.y, pv.z);
  }
  pedestalGeo.computeVertexNormals();
  const pedestal = new THREE.Mesh(pedestalGeo, stoneMat);
  pedestal.position.set(0, pedestalBotLocalY + pedestalHeight * 0.5, -0.02);
  pedestal.castShadow = true;
  pedestal.receiveShadow = true;
  group.add(pedestal);
  disposables.push(pedestalGeo);

  // Side & rear framing rocks grounded individually in world space, leaving front pouring channel completely clear
  const sideRockGeo = sculptBoulderGeometry(0.24, 2, 9.7);
  const framingRocks: Array<{ lx: number; lz: number; sx: number; sy: number; sz: number; ry: number }> = [
    { lx: -0.56, lz: 0.06, sx: 0.92, sy: 0.62, sz: 1.04, ry: 0.3 },
    { lx: 0.56, lz: 0.08, sx: 0.88, sy: 0.58, sz: 0.98, ry: 1.2 },
    { lx: -0.38, lz: 0.24, sx: 0.64, sy: 0.42, sz: 0.68, ry: 0.85 },
    { lx: 0.38, lz: 0.22, sx: 0.62, sy: 0.42, sz: 0.66, ry: 2.3 },
    { lx: -0.34, lz: -0.44, sx: 0.76, sy: 0.52, sz: 0.82, ry: 2.1 },
    { lx: 0.34, lz: -0.44, sx: 0.74, sy: 0.5, sz: 0.8, ry: 0.9 },
  ];
  framingRocks.forEach((rk, rIdx) => {
    const worldPt = new THREE.Vector3(rk.lx, 0, rk.lz).applyMatrix4(group.matrixWorld);
    const rg = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.24 * rk.sx, 0.18, 0.24 * rk.sy * 0.32);
    const localAnchor = new THREE.Vector3(worldPt.x, rg.y, worldPt.z);
    group.worldToLocal(localAnchor);

    const rockMesh = new THREE.Mesh(sideRockGeo, stoneMat);
    rockMesh.position.set(rk.lx, localAnchor.y, rk.lz);
    rockMesh.scale.set(rk.sx, rk.sy, rk.sz);
    rockMesh.rotation.y = rk.ry;
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    group.add(rockMesh);

    registry.register({
      id: `tsukubai-collar-${rIdx}`,
      kind: 'rock',
      x: worldPt.x,
      z: worldPt.z,
      rx: 0.24 * rk.sx,
      rz: 0.24 * rk.sz,
      yaw: dirAngle + rk.ry,
      margin: 0.08,
      topY: rg.y + 0.22 * rk.sy,
    });
  });
  disposables.push(sideRockGeo);

  // 2. Hand-thrown Shigaraki-style ceramic jar seated cleanly ON TOP of the pedestal (base y = 0)
  const lathePts = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.22, 0.0),
    new THREE.Vector2(0.32, 0.11),
    new THREE.Vector2(0.36, 0.25),
    new THREE.Vector2(0.32, 0.37),
    new THREE.Vector2(0.265, 0.37),
    new THREE.Vector2(0.245, 0.22),
    new THREE.Vector2(0.0, 0.19),
  ];
  const vesselGeo = new THREE.LatheGeometry(lathePts, 32);
  const vessel = new THREE.Mesh(vesselGeo, ceramicMat);
  const vesselBaseLocalY = pedestalTopLocalY - 0.012;
  const vesselTiltX = 0.09;
  vessel.position.set(0, vesselBaseLocalY, 0.02);
  vessel.rotation.x = vesselTiltX;
  vessel.castShadow = true;
  vessel.receiveShadow = true;
  group.add(vessel);
  disposables.push(vesselGeo);

  // Small ceramic overflow lip extending subtly from front rim so stream exit is anatomically crisp
  const lipGeo = new THREE.CylinderGeometry(0.032, 0.044, 0.1, 10, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
  lipGeo.rotateZ(Math.PI / 2);
  lipGeo.rotateY(Math.PI / 2);
  const lip = new THREE.Mesh(lipGeo, ceramicMat);
  lip.position.set(0, vesselBaseLocalY + 0.345, 0.335);
  lip.rotation.x = 0.22;
  group.add(lip);
  disposables.push(lipGeo);

  const diskGeo = new THREE.CircleGeometry(0.255, 24);
  diskGeo.rotateX(-Math.PI / 2);
  const basinWater = new THREE.Mesh(diskGeo, basinWaterMat);
  basinWater.position.set(0, vesselBaseLocalY + 0.325, 0.045);
  basinWater.rotation.x = vesselTiltX;
  group.add(basinWater);
  disposables.push(diskGeo);

  // 3. Aged bamboo supply post & spout (kakei) grounded cleanly into rear collar
  const postWorld = new THREE.Vector3(0, 0, -0.42).applyMatrix4(group.matrixWorld);
  const postGroundY = grounder.raycastSurface(postWorld.x, postWorld.z).y;
  const postBotLocalY = postGroundY - anchorY - 0.14;
  const postTopLocalY = vesselBaseLocalY + 0.68;
  const postHeight = Math.max(0.75, postTopLocalY - postBotLocalY);

  const postGeo = new THREE.CylinderGeometry(0.048, 0.058, postHeight, 14);
  const post = new THREE.Mesh(postGeo, bambooMat);
  post.position.set(0, postBotLocalY + postHeight * 0.5, -0.42);
  post.castShadow = true;
  post.receiveShadow = true;

  const nodeGeo = new THREE.TorusGeometry(0.054, 0.0085, 8, 16);
  nodeGeo.rotateX(Math.PI / 2);
  const node1 = new THREE.Mesh(nodeGeo, bambooMat);
  node1.position.set(0, vesselBaseLocalY + 0.2, -0.42);
  const node2 = new THREE.Mesh(nodeGeo, bambooMat);
  node2.position.set(0, vesselBaseLocalY + 0.48, -0.42);

  const spoutGeo = new THREE.CylinderGeometry(0.03, 0.034, 0.54, 12);
  spoutGeo.rotateX(Math.PI / 2 - 0.2);
  const spout = new THREE.Mesh(spoutGeo, bambooMat);
  spout.position.set(0, vesselBaseLocalY + 0.55, -0.18);
  spout.castShadow = true;

  const twineGeo = new THREE.TorusGeometry(0.058, 0.012, 8, 16);
  const twine = new THREE.Mesh(twineGeo, twineMat);
  twine.position.set(0, vesselBaseLocalY + 0.59, -0.4);
  twine.rotation.y = Math.PI / 2;

  group.add(post, node1, node2, spout, twine);
  disposables.push(postGeo, nodeGeo, spoutGeo, twineGeo);

  // Register primary Tsukubai water feature footprint
  registry.register({
    id: 'tsukubai-pedestal-pot',
    kind: 'waterFeature',
    x: WATERFALL_SOURCE_POINT.x,
    z: WATERFALL_SOURCE_POINT.z,
    rx: 0.62,
    rz: 0.62,
    yaw: dirAngle,
    margin: 0.14,
    topY: anchorY + vesselBaseLocalY + 0.39,
  });

  // 4. Arched translucent water streams (bamboo spout -> jar, jar lip -> verified open-water impact point)
  const upperCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, vesselBaseLocalY + 0.5, 0.06),
    new THREE.Vector3(0, vesselBaseLocalY + 0.43, 0.095),
    new THREE.Vector3(0, vesselBaseLocalY + 0.35, 0.105),
    new THREE.Vector3(0, vesselBaseLocalY + 0.31, 0.105),
  ]);
  const upperStreamGeo = new THREE.TubeGeometry(upperCurve, 12, 0.016, 8, false);
  const upperStream = new THREE.Mesh(upperStreamGeo, streamMat);
  upperStream.renderOrder = 3;

  const lipWorld = new THREE.Vector3(0, vesselBaseLocalY + 0.328, 0.345).applyMatrix4(group.matrixWorld);
  const streamTraj = computeCollisionFreeStreamTrajectory({
    source: { x: lipWorld.x, y: lipWorld.y, z: lipWorld.z },
    target: { x: WATERFALL_IMPACT_POINT.x, y: 0.004, z: WATERFALL_IMPACT_POINT.z },
    obstacles: registry.getFootprints(),
    terrainHeightFn: (x, z) => grounder.raycastSurface(x, z).y,
    isInsideWaterFn: isInsideNaturalPond,
    streamRadius: 0.02,
    samples: 24,
  });

  const localCurvePts = streamTraj.controlPoints.map((pt) => {
    const v = new THREE.Vector3(pt.x, pt.y, pt.z);
    group.worldToLocal(v);
    return v;
  });
  const lowerBezier = new THREE.CubicBezierCurve3(
    localCurvePts[0],
    localCurvePts[1],
    localCurvePts[2],
    localCurvePts[3],
  );
  const lowerStreamGeo = new THREE.TubeGeometry(lowerBezier, 22, 0.012, 8, false);
  const lowerStream = new THREE.Mesh(lowerStreamGeo, streamMat);
  lowerStream.renderOrder = 3;

  // Delicate animated splash foam ring at open-water landing point
  const landingLocal = new THREE.Vector3(
    streamTraj.landing.x,
    0.009,
    streamTraj.landing.z,
  );
  group.worldToLocal(landingLocal);
  const splashGeo = new THREE.RingGeometry(0.02, 0.095, 24);
  splashGeo.rotateX(-Math.PI / 2);
  const splashMat = new THREE.MeshBasicNodeMaterial({
    color: 0xdff0e8,
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
  });
  const splashRing = new THREE.Mesh(splashGeo, splashMat);
  splashRing.position.copy(landingLocal);
  splashRing.renderOrder = 3;

  group.add(upperStream, lowerStream, splashRing);
  disposables.push(upperStreamGeo, lowerStreamGeo, splashGeo, splashMat);

  // Exclude vegetation along the stream splash corridor
  registry.registerCapsule(
    'stream',
    lipWorld.x,
    lipWorld.z,
    streamTraj.landing.x,
    streamTraj.landing.z,
    0.26,
    0.08,
    undefined,
    'tsukubai-stream-corridor',
  );

  return {
    group,
    impactPoint: { x: streamTraj.landing.x, z: streamTraj.landing.z },
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createArchingFernGeometry(length: number, width: number): THREE.BufferGeometry {
  const segs = 4;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const z = t * length;
    const y = Math.sin(t * Math.PI * 0.72) * length * 0.42 - t * t * length * 0.14;
    const hw = width * 0.5;
    positions.push(-hw, y, z);
    uvs.push(0, t);
    positions.push(hw, y, z);
    uvs.push(1, t);
  }

  for (let i = 0; i < segs; i++) {
    const i0 = i * 2;
    const i1 = i0 + 1;
    const i2 = i0 + 2;
    const i3 = i0 + 3;
    indices.push(i0, i2, i1);
    indices.push(i1, i2, i3);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createGrassTuftGeometry(
  bladeCount: number,
  height: number,
  spread: number,
  baseWidth = 0.028,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const segs = 3;

  for (let b = 0; b < bladeCount; b++) {
    const yaw = (b / bladeCount) * Math.PI * 2 + (b % 2) * 0.34;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const bladeH = height * (0.76 + (b % 3) * 0.19);
    const lean = spread * (0.7 + (b % 2) * 0.38);
    const halfWBase = baseWidth;
    const baseVert = positions.length / 3;

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const y = bladeH * t - 0.01;
      const radial = lean * t * t;
      const hw = halfWBase * (1 - t * 0.9);
      const px = -sinY * hw;
      const pz = cosY * hw;
      const cx = cosY * radial;
      const cz = sinY * radial;

      positions.push(cx - px, y, cz - pz);
      uvs.push(0, t);
      positions.push(cx + px, y, cz + pz);
      uvs.push(1, t);
    }

    for (let s = 0; s < segs; s++) {
      const i0 = baseVert + s * 2;
      const i1 = i0 + 1;
      const i2 = i0 + 2;
      const i3 = i0 + 3;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createCrossedClumpGeometry(width: number, height: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const planes = 3;

  for (let p = 0; p < planes; p++) {
    const angle = (p / planes) * Math.PI + (p === 1 ? 0.14 : p === 2 ? -0.14 : 0);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const hw = width * 0.5;
    const tilt = 0.08 * (p === 0 ? 1 : -0.7);
    const baseVert = positions.length / 3;

    const rows = [
      { v: 0, y: -0.02, bend: 0 },
      { v: 0.5, y: height * 0.5, bend: tilt * 0.35 },
      { v: 1, y: height, bend: tilt },
    ];
    for (const r of rows) {
      const lx = -hw;
      const rx = hw;
      const bz = r.bend;
      positions.push(lx * cosA - bz * sinA, r.y, lx * sinA + bz * cosA);
      uvs.push(0, r.v);
      positions.push(rx * cosA - bz * sinA, r.y, rx * sinA + bz * cosA);
      uvs.push(1, r.v);
    }

    for (let s = 0; s < 2; s++) {
      const i0 = baseVert + s * 2;
      const i1 = i0 + 1;
      const i2 = i0 + 2;
      const i3 = i0 + 3;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function addGroundedButtressRoots(
  parent: THREE.Group,
  barkMat: THREE.Material,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
  originX: number,
  originZ: number,
  rootRadius: number,
  rootSpread: number,
  rootCount: number,
  angleOffset: number,
  idPrefix: string,
  disposables: Array<{ dispose: () => void }>,
): void {
  const baseY = grounder.raycastSurface(originX, originZ).y;
  for (let r = 0; r < rootCount; r++) {
    const ang = angleOffset + (r / rootCount) * Math.PI * 2 + 0.16 * Math.sin(r * 2.1);
    const midDist = rootSpread * 0.55;
    const tipDist = rootSpread * (0.92 + (r % 2) * 0.18);

    const mx = originX + Math.cos(ang) * midDist;
    const mz = originZ + Math.sin(ang) * midDist;
    const midY = grounder.raycastSurface(mx, mz).y + 0.02;

    const tx = originX + Math.cos(ang + 0.12 * Math.cos(r)) * tipDist;
    const tz = originZ + Math.sin(ang + 0.12 * Math.cos(r)) * tipDist;
    const tipY = grounder.raycastSurface(tx, tz).y - 0.14;

    const rootCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(
        originX + Math.cos(ang) * rootRadius * 0.4,
        baseY + 0.06,
        originZ + Math.sin(ang) * rootRadius * 0.4,
      ),
      new THREE.Vector3(mx, midY, mz),
      new THREE.Vector3(tx, tipY, tz),
    ]);
    const rootGeo = createFlaredTubeGeometry(rootCurve, 9, rootRadius * 1.15, 0.78, 0.24, 7);
    const rootMesh = new THREE.Mesh(rootGeo, barkMat);
    rootMesh.castShadow = true;
    rootMesh.receiveShadow = true;
    parent.add(rootMesh);
    disposables.push(rootGeo);

    registry.registerCapsule(
      'tree',
      originX,
      originZ,
      tx,
      tz,
      rootRadius * 1.4,
      0.08,
      undefined,
      `${idPrefix}-root-${r}`,
    );
  }
}

function createWoodlandTrees(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const barkMat = new THREE.MeshStandardNodeMaterial({
    map: textures.barkAlbedo,
    normalMap: textures.barkNormal,
    normalScale: new THREE.Vector2(1.3, 1.3),
    roughness: 0.9,
    metalness: 0.02,
    color: 0x5c5144,
  });

  const leafCardMat = new THREE.MeshStandardNodeMaterial({
    map: textures.broadLeafMap,
    alphaTest: 0.3,
    roughness: 0.76,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const leafSway = sin(
    elapsedUniform.mul(0.88).add(positionWorld.x.mul(0.75)).add(positionWorld.z.mul(0.65)),
  )
    .mul(0.032)
    .mul(smoothstep(1.2, 4.5, positionWorld.y));
  leafCardMat.positionNode = positionLocal.add(vec3(leafSway, leafSway.mul(0.25), leafSway.mul(0.4)));

  const leafGeo = new THREE.PlaneGeometry(1.15, 1.15);
  disposables.push(barkMat, leafCardMat, leafGeo);

  const canopyCenters: Array<{ x: number; y: number; z: number; r: number; palette: 'dark' | 'maple' | 'sunlit' }> = [];

  // 1. Organic shadowed left woodland trunks with flared root collars & grounded buttress roots
  const darkTrunks: Array<{ x: number; z: number; h: number; r: number; leanX: number }> = [
    { x: -6.15, z: 2.35, h: 6.4, r: 0.28, leanX: 0.28 },
    { x: -5.85, z: -0.95, h: 6.2, r: 0.23, leanX: 0.36 },
    { x: -6.75, z: 0.65, h: 6.8, r: 0.32, leanX: 0.18 },
    { x: -5.45, z: 3.75, h: 5.8, r: 0.2, leanX: -0.12 },
  ];
  darkTrunks.forEach((tr, tIdx) => {
    const gy = grounder.raycastSurface(tr.x, tr.z).y;
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(tr.x, gy - 0.48, tr.z),
      new THREE.Vector3(tr.x + tr.leanX * 0.04, gy + 0.02, tr.z + 0.01),
      new THREE.Vector3(tr.x + tr.leanX * 0.14, gy + 0.55, tr.z + 0.02),
      new THREE.Vector3(tr.x + tr.leanX * 0.42, gy + tr.h * 0.38, tr.z + 0.06),
      new THREE.Vector3(tr.x + tr.leanX * 0.85, gy + tr.h * 0.72, tr.z - 0.04),
      new THREE.Vector3(tr.x + tr.leanX, gy + tr.h, tr.z),
    ]);
    const trunkGeo = createFlaredTubeGeometry(trunkCurve, 18, tr.r, 0.35, 0.54, 9);
    const trunk = new THREE.Mesh(trunkGeo, barkMat);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);
    disposables.push(trunkGeo);

    addGroundedButtressRoots(
      group,
      barkMat,
      grounder,
      registry,
      tr.x,
      tr.z,
      tr.r * 0.36,
      tr.r * 2.4,
      4,
      tIdx * 0.7,
      `woodland-${tIdx}`,
      disposables,
    );

    registry.register({
      id: `woodland-trunk-${tIdx}`,
      kind: 'tree',
      x: tr.x,
      z: tr.z,
      rx: tr.r * 1.85,
      rz: tr.r * 1.85,
      margin: 0.16,
    });

    canopyCenters.push({ x: tr.x + 1.0, y: gy + 3.95, z: tr.z, r: 1.75, palette: 'dark' });
  });

  // 2. Sculpted Japanese Maple left-rear of stepping path with flared trunk base & grounded buttresses
  const mapleOrigin = { x: -4.25, y: grounder.raycastSurface(-4.25, -3.95).y, z: -3.95 };
  const mapleBranches: Array<{ pts: [number, number, number][]; r: number; flare: number }> = [
    {
      pts: [
        [0, -0.42, 0],
        [0.02, 0.0, 0.01],
        [0.08, 0.42, 0.04],
        [0.24, 1.15, 0.1],
        [0.52, 2.15, 0.22],
        [0.95, 2.85, 0.38],
      ],
      r: 0.15,
      flare: 0.56,
    },
    {
      pts: [
        [0.32, 1.48, 0.12],
        [1.08, 2.18, 0.25],
        [1.76, 2.64, 0.18],
      ],
      r: 0.075,
      flare: 0,
    },
    {
      pts: [
        [0.22, 1.38, 0.06],
        [-0.45, 2.15, -0.2],
        [-1.08, 2.75, -0.35],
      ],
      r: 0.075,
      flare: 0,
    },
  ];
  mapleBranches.forEach((b) => {
    const curve = new THREE.CatmullRomCurve3(
      b.pts.map(([x, y, z]) => new THREE.Vector3(mapleOrigin.x + x, mapleOrigin.y + y, mapleOrigin.z + z)),
    );
    const geo = createFlaredTubeGeometry(curve, 14, b.r, 0.55, b.flare, 8);
    const mesh = new THREE.Mesh(geo, barkMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    disposables.push(geo);
  });
  addGroundedButtressRoots(
    group,
    barkMat,
    grounder,
    registry,
    mapleOrigin.x,
    mapleOrigin.z,
    0.068,
    0.58,
    4,
    0.45,
    'maple',
    disposables,
  );
  registry.register({
    id: 'maple-trunk',
    kind: 'tree',
    x: mapleOrigin.x,
    z: mapleOrigin.z,
    rx: 0.42,
    rz: 0.42,
    margin: 0.14,
  });

  canopyCenters.push(
    { x: mapleOrigin.x + 1.25, y: mapleOrigin.y + 2.75, z: mapleOrigin.z + 0.24, r: 1.25, palette: 'maple' },
    { x: mapleOrigin.x + 0.45, y: mapleOrigin.y + 3.15, z: mapleOrigin.z + 0.05, r: 1.35, palette: 'maple' },
    { x: mapleOrigin.x - 0.65, y: mapleOrigin.y + 2.85, z: mapleOrigin.z - 0.2, r: 1.2, palette: 'maple' },
  );

  // 3. Sunlit mid-ground garden tree right of shrine with root flare & grounded roots
  const midTreePos = { x: 0.42, y: grounder.raycastSurface(0.42, -6.75).y, z: -6.75 };
  const midCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(midTreePos.x, midTreePos.y - 0.4, midTreePos.z),
    new THREE.Vector3(midTreePos.x + 0.01, midTreePos.y + 0.02, midTreePos.z + 0.01),
    new THREE.Vector3(midTreePos.x + 0.04, midTreePos.y + 0.42, midTreePos.z + 0.02),
    new THREE.Vector3(midTreePos.x + 0.12, midTreePos.y + 1.2, midTreePos.z + 0.05),
    new THREE.Vector3(midTreePos.x + 0.34, midTreePos.y + 2.35, midTreePos.z + 0.18),
  ]);
  const midTrunkGeo = createFlaredTubeGeometry(midCurve, 14, 0.125, 0.5, 0.48, 8);
  const midTrunk = new THREE.Mesh(midTrunkGeo, barkMat);
  midTrunk.castShadow = true;
  midTrunk.receiveShadow = true;
  group.add(midTrunk);
  disposables.push(midTrunkGeo);

  addGroundedButtressRoots(
    group,
    barkMat,
    grounder,
    registry,
    midTreePos.x,
    midTreePos.z,
    0.055,
    0.45,
    4,
    0.25,
    'mid-tree',
    disposables,
  );
  registry.register({
    id: 'mid-tree-trunk',
    kind: 'tree',
    x: midTreePos.x,
    z: midTreePos.z,
    rx: 0.38,
    rz: 0.38,
    margin: 0.14,
  });

  canopyCenters.push(
    { x: midTreePos.x + 0.35, y: midTreePos.y + 2.55, z: midTreePos.z + 0.2, r: 1.2, palette: 'sunlit' },
    { x: midTreePos.x - 0.38, y: midTreePos.y + 2.35, z: midTreePos.z + 0.1, r: 1.05, palette: 'sunlit' },
  );

  // Expand canopy centers into varied organic foliage card clusters
  const cardsPerCluster = quality === 'desktop' ? 14 : 9;
  const totalCards = canopyCenters.length * cardsPerCluster;
  const leafInst = new THREE.InstancedMesh(leafGeo, leafCardMat, totalCards);
  leafInst.castShadow = true;

  let seed = 3341;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const dummy = new THREE.Object3D();
  const cColor = new THREE.Color();
  const palettes = {
    dark: [0x829c6e, 0x96b080, 0x6f895d, 0xa2ba8c],
    maple: [0xc6daa0, 0xd9e8b4, 0xe8cfa2, 0xb2c88e],
    sunlit: [0xdcf0b0, 0xeef8c6, 0xc4de94, 0xf4facd],
  };

  let idx = 0;
  canopyCenters.forEach((c) => {
    const pal = palettes[c.palette];
    for (let k = 0; k < cardsPerCluster; k++) {
      const a = rand() * Math.PI * 2;
      const dist = Math.pow(rand(), 0.7) * c.r;
      const hOff = (rand() - 0.35) * c.r * 0.72;
      dummy.position.set(c.x + Math.cos(a) * dist, c.y + hOff, c.z + Math.sin(a) * dist);
      dummy.rotation.set(
        (rand() - 0.5) * 0.9,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.7,
      );
      dummy.scale.setScalar(0.85 + rand() * 0.7);
      dummy.updateMatrix();
      leafInst.setMatrixAt(idx, dummy.matrix);
      cColor.setHex(pal[idx % pal.length]);
      leafInst.setColorAt(idx, cColor);
      idx++;
    }
  });

  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();
  group.add(leafInst);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createBambooForest(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const culmGeo = new THREE.CylinderGeometry(0.052, 0.088, 1, 8, 1);
  culmGeo.translate(0, 0.5, 0);

  const culmMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooAlbedo,
    normalMap: textures.bambooNormal,
    normalScale: new THREE.Vector2(0.8, 0.8),
    roughness: 0.58,
    metalness: 0.02,
    color: 0xffffff,
  });
  const bambooSway = sin(
    elapsedUniform.mul(0.82).add(positionWorld.x.mul(0.7)).add(positionWorld.z.mul(0.55)),
  )
    .mul(0.045)
    .mul(smoothstep(1.5, 9.5, positionWorld.y));
  culmMat.positionNode = positionLocal.add(vec3(bambooSway, float(0.0), bambooSway.mul(0.4)));

  const leafSprayGeo = new THREE.PlaneGeometry(1.45, 1.45);
  const leafSprayMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooLeafMap,
    alphaTest: 0.3,
    roughness: 0.72,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  leafSprayMat.positionNode = positionLocal.add(vec3(bambooSway, float(0.0), bambooSway.mul(0.4)));

  const distTrunkGeo = new THREE.CylinderGeometry(0.18, 0.32, 1, 7);
  distTrunkGeo.translate(0, 0.5, 0);
  const distTrunkMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.94,
    metalness: 0.01,
  });

  disposables.push(culmGeo, culmMat, leafSprayGeo, leafSprayMat, distTrunkGeo, distTrunkMat);

  let seed = 6029;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const culmSpecs: Array<{ x: number; z: number; h: number; rScale: number; leanX: number; leanZ: number }> = [];
  const targetCulms = quality === 'desktop' ? 185 : 96;
  let tries = 0;
  while (culmSpecs.length < targetCulms && tries < 3200) {
    tries++;
    const x = -17.5 + rand() * 39.0;
    const z = -5.4 - rand() * 14.5;
    if (z > -8.6 && Math.abs(x - SHRINE_CENTER.x) < 2.25) continue;
    if (z > -4.6 && Math.hypot(x - SAKURA_CENTER.x, z - SAKURA_CENTER.z) < 2.1) continue;
    if (naturalPondNormalizedRadius({ x, z }) < 1.15) continue;
    if (registry.isExcluded(x, z, 0.2)) continue;

    culmSpecs.push({
      x,
      z,
      h: 6.8 + rand() * 5.2,
      rScale: 0.78 + rand() * 0.52,
      leanX: (rand() - 0.5) * 0.09,
      leanZ: (rand() - 0.5) * 0.08,
    });
  }

  const culmInst = new THREE.InstancedMesh(culmGeo, culmMat, culmSpecs.length);
  culmInst.castShadow = quality === 'desktop';
  culmInst.receiveShadow = true;

  const spraysPerCulm = 2;
  const leafInst = new THREE.InstancedMesh(
    leafSprayGeo,
    leafSprayMat,
    culmSpecs.length * spraysPerCulm,
  );

  const dummy = new THREE.Object3D();
  const tint = new THREE.Color();
  const culmShades = [0x6e8549, 0x5c723d, 0x7e9453, 0x4f6333];
  const crownShades = [0x829f54, 0x97b364, 0x6c8844, 0xa8c272];

  culmSpecs.forEach((c, i) => {
    const gy = grounder.raycastSurface(c.x, c.z).y;
    dummy.position.set(c.x, gy - 0.18, c.z);
    dummy.rotation.set(c.leanZ, rand() * Math.PI * 2, c.leanX);
    dummy.scale.set(c.rScale, c.h, c.rScale);
    dummy.updateMatrix();
    culmInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(culmShades[i % culmShades.length]);
    culmInst.setColorAt(i, tint);

    registry.register({
      id: `bamboo-culm-${i}`,
      kind: 'tree',
      x: c.x,
      z: c.z,
      rx: 0.1 * c.rScale,
      rz: 0.1 * c.rScale,
      margin: 0.06,
    });

    for (let s = 0; s < spraysPerCulm; s++) {
      const ly = gy + c.h * (0.44 + s * 0.26);
      dummy.position.set(
        c.x + (rand() - 0.5) * 0.85,
        ly,
        c.z + (rand() - 0.5) * 0.85,
      );
      dummy.rotation.set(
        (rand() - 0.5) * 0.55,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.55,
      );
      dummy.scale.setScalar(0.92 + rand() * 0.68);
      dummy.updateMatrix();
      const lIdx = i * spraysPerCulm + s;
      leafInst.setMatrixAt(lIdx, dummy.matrix);
      tint.setHex(crownShades[lIdx % crownShades.length]);
      leafInst.setColorAt(lIdx, tint);
    }
  });

  culmInst.instanceMatrix.needsUpdate = true;
  if (culmInst.instanceColor) culmInst.instanceColor.needsUpdate = true;
  culmInst.computeBoundingSphere();

  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();

  // Grounded 3D crossed broadleaf understory clumps filtered against all trunks, rocks, and path exclusions
  const shrubGeo = createCrossedClumpGeometry(0.86, 0.58);
  const shrubMat = new THREE.MeshStandardNodeMaterial({
    map: textures.understoryLeafMap,
    alphaTest: 0.3,
    roughness: 0.8,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shrubSway = sin(
    elapsedUniform.mul(1.05).add(positionWorld.x.mul(0.85)).add(positionWorld.z.mul(0.75)),
  )
    .mul(0.022)
    .mul(smoothstep(0.05, 0.55, positionLocal.y));
  shrubMat.positionNode = positionLocal.add(vec3(shrubSway, float(0.0), shrubSway.mul(0.45)));

  const shrubSpecs: Array<{ x: number; z: number; sc: number; rot: number; shade: number }> = [];
  const targetShrubs = quality === 'desktop' ? 112 : 52;
  const shrubTints = [0x9eb678, 0xb0c888, 0x8ea668, 0xbad094, 0x829c5e];
  let shrubTries = 0;
  while (shrubSpecs.length < targetShrubs && shrubTries < 2600) {
    shrubTries++;
    const sx = -16.5 + rand() * 36.0;
    const sz = -4.2 - rand() * 12.8;
    const sample = sampleTerrain({ x: sx, z: sz });
    if (sz > -8.2 && Math.abs(sx - SHRINE_CENTER.x) < 1.95) continue;
    if (Math.abs(sx - shrinePathCenterX(sz)) < 0.92 && sz > -6.4) continue;
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.24,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.35,
        maxSlope: 0.42,
      })
    ) {
      continue;
    }

    shrubSpecs.push({
      x: sx,
      z: sz,
      sc: 0.72 + rand() * 0.74,
      rot: rand() * Math.PI * 2,
      shade: shrubTints[shrubSpecs.length % shrubTints.length],
    });
  }

  // Root-margin understory shrubs set safely outside tree trunk/root footprints
  const collarShrubSpots: Array<[number, number, number]> = [
    [-5.35, 2.35, 0.84],
    [-5.05, -0.55, 0.8],
    [-4.85, -3.35, 0.82],
    [-3.45, -4.45, 0.78],
    [1.15, -6.25, 0.86],
    [2.65, -5.05, 0.92],
  ];
  collarShrubSpots.forEach(([sx, sz, sc], k) => {
    const sample = sampleTerrain({ x: sx, z: sz });
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.14,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.3,
        maxSlope: 0.45,
      })
    ) {
      return;
    }
    shrubSpecs.push({
      x: sx,
      z: sz,
      sc,
      rot: k * 1.15,
      shade: sx < -3.8 ? 0x9eb47e : shrubTints[k % shrubTints.length],
    });
  });

  const shrubInst = new THREE.InstancedMesh(shrubGeo, shrubMat, shrubSpecs.length);
  shrubInst.castShadow = quality === 'desktop';
  shrubInst.receiveShadow = true;
  shrubSpecs.forEach((sp, i) => {
    const gy = grounder.raycastSurface(sp.x, sp.z).y;
    dummy.position.set(sp.x, gy - 0.04, sp.z);
    dummy.rotation.set(0.06 * Math.sin(i), sp.rot, 0.06 * Math.cos(i));
    dummy.scale.set(sp.sc, sp.sc * (0.88 + (i % 3) * 0.1), sp.sc);
    dummy.updateMatrix();
    shrubInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(sp.shade);
    shrubInst.setColorAt(i, tint);
  });
  shrubInst.instanceMatrix.needsUpdate = true;
  if (shrubInst.instanceColor) shrubInst.instanceColor.needsUpdate = true;
  shrubInst.computeBoundingSphere();
  disposables.push(shrubGeo, shrubMat);

  // Distant forest tree trunks rising behind the bamboo grove into mist
  const distCount = quality === 'desktop' ? 38 : 20;
  const distInst = new THREE.InstancedMesh(distTrunkGeo, distTrunkMat, distCount);
  for (let i = 0; i < distCount; i++) {
    const dx = -19 + (i / (distCount - 1)) * 41 + (rand() - 0.5) * 1.4;
    const dz = -14.5 - rand() * 10.5;
    const gy = grounder.raycastSurface(dx, dz).y;
    dummy.position.set(dx, gy - 0.2, dz);
    dummy.rotation.set(0, rand() * Math.PI, (rand() - 0.5) * 0.07);
    dummy.scale.set(0.85 + rand() * 0.75, 9 + rand() * 6, 0.85 + rand() * 0.75);
    dummy.updateMatrix();
    distInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(i % 2 === 0 ? 0x2a3b27 : 0x354731);
    distInst.setColorAt(i, tint);
  }
  distInst.instanceMatrix.needsUpdate = true;
  if (distInst.instanceColor) distInst.instanceColor.needsUpdate = true;
  distInst.computeBoundingSphere();

  group.add(culmInst, leafInst, shrubInst, distInst);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createGardenEnvironment(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
): GardenEnvironment {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const registry = new PlacementRegistry(1.25);

  // 1. Continuous 55m+ sculpted perspective garden terrain + raycast grounder
  const terrain = createSculptedGardenTerrain(textures);
  group.add(terrain.mesh);
  disposables.push(terrain);
  const grounder = createTerrainGrounder(terrain.mesh);

  // 2. Stepping stones curving cleanly from foreground-left onto the shrine lower step
  const stepStoneGeo = sculptBoulderGeometry(0.36, 2, 11.4);
  const stepStoneMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    normalScale: new THREE.Vector2(1.0, 1.0),
    roughness: 0.8,
    metalness: 0.02,
    color: 0xbcb5a2,
  });
  const stepZValues = [
    4.25, 3.6, 2.92, 2.24, 1.54, 0.84, 0.14, -0.56, -1.26, -1.96, -2.66, -3.36, -4.06, -4.72, -5.28, -5.75,
  ];
  const stepInst = new THREE.InstancedMesh(stepStoneGeo, stepStoneMat, stepZValues.length);
  stepInst.receiveShadow = true;
  stepInst.castShadow = true;

  const dummy = new THREE.Object3D();
  const baseEuler = new THREE.Euler();
  const baseQuat = new THREE.Quaternion();
  let prevStepX = shrinePathCenterX(stepZValues[0]);
  let prevStepZ = stepZValues[0];

  stepZValues.forEach((z, idx) => {
    const jitterX = (idx % 2 === 0 ? -0.06 : 0.07) * Math.sin(idx * 1.7);
    const x = shrinePathCenterX(z) + jitterX;
    const sx = 1.08 + (idx % 3) * 0.16;
    const sz = 0.82 + ((idx + 1) % 3) * 0.12;
    const yaw = idx * 0.72;
    const grounded = grounder.groundPropFootprint(x, z, 0.32, 0.14, -0.012);

    dummy.position.set(x, grounded.y, z);
    baseEuler.set(0, yaw, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx, 0.28, sz);
    dummy.updateMatrix();
    stepInst.setMatrixAt(idx, dummy.matrix);

    registry.register({
      id: `step-stone-${idx}`,
      kind: 'stepStone',
      x,
      z,
      rx: 0.36 * sx,
      rz: 0.36 * sz,
      yaw,
      margin: 0.08,
    });
    if (idx > 0) {
      registry.registerCapsule(
        'stepStone',
        prevStepX,
        prevStepZ,
        x,
        z,
        0.34,
        0.04,
        undefined,
        `path-corridor-${idx}`,
      );
    }
    prevStepX = x;
    prevStepZ = z;
  });
  stepInst.instanceMatrix.needsUpdate = true;
  stepInst.computeBoundingSphere();
  group.add(stepInst);
  disposables.push(stepStoneGeo, stepStoneMat);

  // Register foreground pebble beach pocket so vegetation respects the gravel shore transition
  registry.register({
    id: 'fg-pebble-beach',
    kind: 'pebbleBeach',
    x: -0.95,
    z: 3.42,
    rx: 0.85,
    rz: 0.68,
    margin: 0.06,
  });

  // 3. Sculpted shoreline rocks & wet cobbles (grounded & registered into exclusion registry)
  const bankStones = createNaturalBankStones(textures, grounder, registry);
  group.add(bankStones.group);
  disposables.push(bankStones);

  // 4. Traditional aged timber shrine in upper-middle-left background
  const shrine = createShrineHall(textures, grounder, registry);
  group.add(shrine.group);
  disposables.push(shrine);

  // 5. Right-bank stoneware ceramic water vessel (Tsukubai) pouring collision-free into open water
  const waterfall = createWaterfallBasin(textures, elapsedUniform, grounder, registry);
  group.add(waterfall.group);
  disposables.push(waterfall);

  // 6. Substantial right-side sakura tree with terrain-raycasted buttress roots
  const sakura = createSakuraTree(textures, elapsedUniform, quality, grounder, registry);
  group.add(sakura.group);
  disposables.push(sakura);

  // 7. Left shadowed woodland trees, mid-left Japanese maple, and sunlit mid-ground tree
  const woodland = createWoodlandTrees(textures, elapsedUniform, quality, grounder, registry);
  group.add(woodland.group);
  disposables.push(woodland);

  // 8. Multi-depth layered bamboo forest, understory shrubs, & distant silhouetted trees
  const bambooForest = createBambooForest(textures, elapsedUniform, quality, grounder, registry);
  group.add(bambooForest.group);
  disposables.push(bambooForest);

  // 9. Low organic multi-lobed moss hummocks blended into open soil (never overlapping rocks/path/pot)
  const mossGeo = new THREE.SphereGeometry(0.48, 16, 12);
  const mPos = mossGeo.attributes.position;
  const mv = new THREE.Vector3();
  for (let i = 0; i < mPos.count; i++) {
    mv.fromBufferAttribute(mPos, i);
    const angle = Math.atan2(mv.z, mv.x);
    const lobe = 1 + 0.14 * Math.sin(angle * 3.0 + 0.6) + 0.08 * Math.cos(angle * 5.0 - 0.4);
    const micro = 1 + 0.1 * Math.sin(mv.x * 5.8 + mv.z * 4.9) * Math.cos(mv.y * 4.2);
    mv.x *= lobe * micro;
    mv.z *= lobe * micro;
    mv.y *= 0.68 * micro;
    mPos.setXYZ(i, mv.x, mv.y, mv.z);
  }
  mossGeo.computeVertexNormals();
  const mossMat = new THREE.MeshStandardNodeMaterial({
    map: textures.mossAlbedo,
    normalMap: textures.mossNormal,
    normalScale: new THREE.Vector2(1.0, 1.0),
    roughness: 0.98,
    metalness: 0.0,
    color: 0xffffff,
  });

  const mossPositions: Array<[number, number, number, number, number]> = [
    [-4.35, 3.65, 1.38, 0.22, 1.24],
    [-4.15, 2.25, 1.28, 0.2, 1.16],
    [-2.52, 2.65, 1.12, 0.18, 1.04],
    [-3.75, -0.95, 1.26, 0.2, 1.12],
    [-4.4, -2.35, 1.36, 0.22, 1.22],
    [-3.6, -4.15, 1.2, 0.2, 1.08],
    [-1.15, -4.45, 1.28, 0.2, 1.16],
    [1.45, 4.15, 1.36, 0.22, 1.24],
    [2.75, 3.65, 1.44, 0.24, 1.28],
    [3.92, 2.48, 1.32, 0.22, 1.18],
    [4.48, 0.95, 1.26, 0.2, 1.14],
    [3.25, -2.45, 1.56, 0.26, 1.38],
    [2.45, -4.25, 1.58, 0.26, 1.4],
    [4.18, -3.55, 1.48, 0.24, 1.34],
    [0.95, -4.75, 1.38, 0.22, 1.24],
    [-0.55, -5.75, 1.28, 0.2, 1.16],
    [-3.85, -6.35, 1.36, 0.22, 1.22],
    [-0.15, -7.25, 1.44, 0.24, 1.28],
    [2.15, -6.45, 1.52, 0.24, 1.36],
    [4.45, -5.85, 1.54, 0.26, 1.36],
    [-4.75, -4.95, 1.32, 0.22, 1.2],
    [1.98, -2.95, 1.22, 0.18, 1.1],
    [0.25, 4.45, 1.28, 0.2, 1.12],
  ];

  const validMoss = mossPositions.filter(([x, z]) => {
    const sample = sampleTerrain({ x, z });
    return (
      sample.shoreDistance >= 0.34 &&
      !registry.isExcluded(x, z, 0.16, new Set<FootprintKind>(['moss']))
    );
  });

  const mossInst = new THREE.InstancedMesh(mossGeo, mossMat, validMoss.length);
  mossInst.receiveShadow = true;
  mossInst.castShadow = false;
  const mColor = new THREE.Color();
  const mossTones = [0x657b3d, 0x586f36, 0x708647, 0x526632, 0x62783c];
  validMoss.forEach(([x, z, sx, sy, sz], idx) => {
    const grounded = grounder.groundPropFootprint(x, z, 0.42 * sx, 0.28, sy * 0.36);
    dummy.position.set(x, grounded.y, z);
    baseEuler.set(0, idx * 0.85, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx, sy * 0.86, sz);
    dummy.updateMatrix();
    mossInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(x < -3.0 ? 0x45582b : mossTones[idx % mossTones.length]);
    mossInst.setColorAt(idx, mColor);

    // Keep dense grass from poking straight out of the smooth crown peak of moss domes
    registry.register({
      id: `moss-dome-${idx}`,
      kind: 'moss',
      x,
      z,
      rx: sx * 0.24,
      rz: sz * 0.24,
      yaw: idx * 0.85,
      margin: 0.02,
    });
  });
  mossInst.instanceMatrix.needsUpdate = true;
  if (mossInst.instanceColor) mossInst.instanceColor.needsUpdate = true;
  mossInst.computeBoundingSphere();
  group.add(mossInst);
  disposables.push(mossGeo, mossMat);

  // 10. Foreground river pebble beach pocket + path-margin stone gravel scatters
  const pebbleGeo = sculptBoulderGeometry(0.11, 1, 3.1);
  const pebbleMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    roughness: 0.76,
    metalness: 0.02,
    color: 0xffffff,
  });
  let gSeed = 9137;
  const gRand = () => {
    gSeed = (gSeed * 16807) % 2147483647;
    return (gSeed - 1) / 2147483646;
  };

  const fgPebbleCoords: Array<[number, number, number]> = [];
  const fgCount = quality === 'desktop' ? 128 : 64;
  const ignoreForPebbles = new Set<FootprintKind>(['pebbleBeach', 'stepStone', 'moss', 'negativeSpace']);
  for (let i = 0; i < fgCount * 2 && fgPebbleCoords.length < fgCount; i++) {
    let px = 0;
    let pz = 0;
    let ps = 0.6;
    if (fgPebbleCoords.length < fgCount * 0.5) {
      px = -1.64 + gRand() * 1.4;
      pz = 2.75 + gRand() * 1.4;
      ps = 0.55 + gRand() * 0.85;
    } else if (fgPebbleCoords.length < fgCount * 0.76) {
      pz = -5.4 + gRand() * 9.0;
      px = shrinePathCenterX(pz) + (gRand() > 0.5 ? 1 : -1) * (0.44 + gRand() * 0.34);
      ps = 0.42 + gRand() * 0.56;
    } else if (fgPebbleCoords.length < fgCount * 0.88) {
      // Gravel collar behind & around Tsukubai base (outside pedestal and front stream channel)
      const ang = (gRand() - 0.5) * Math.PI * 1.2 + Math.PI * 0.25;
      const rad = 0.56 + gRand() * 0.36;
      px = WATERFALL_SOURCE_POINT.x + Math.cos(ang) * rad;
      pz = WATERFALL_SOURCE_POINT.z + Math.sin(ang) * rad;
      ps = 0.42 + gRand() * 0.52;
    } else {
      const angle = gRand() * Math.PI * 2;
      const pt = pondBoundaryPoint(angle, 0.98 + gRand() * 0.14);
      px = pt.x;
      pz = pt.z;
      ps = 0.48 + gRand() * 0.68;
    }

    if (registry.isExcluded(px, pz, 0.04, ignoreForPebbles)) continue;
    fgPebbleCoords.push([px, pz, ps]);
  }
  const pebbleInst = new THREE.InstancedMesh(pebbleGeo, pebbleMat, fgPebbleCoords.length);
  pebbleInst.receiveShadow = true;
  const pCol = new THREE.Color();
  const pebblePalette = [0xa69d8a, 0x7e7a6d, 0xbfc0b4, 0x625f57];
  fgPebbleCoords.forEach(([x, z, s], i) => {
    const py =
      naturalPondNormalizedRadius({ x, z }) < 1.0 ? -0.025 : grounder.raycastSurface(x, z).y;
    dummy.position.set(x, py - 0.004, z);
    dummy.rotation.set(0.08 * gRand(), gRand() * Math.PI * 2, 0.08 * gRand());
    dummy.scale.set(s * 1.25, s * 0.38, s * 0.96);
    dummy.updateMatrix();
    pebbleInst.setMatrixAt(i, dummy.matrix);
    pCol.setHex(pebblePalette[i % pebblePalette.length]);
    pebbleInst.setColorAt(i, pCol);
  });
  pebbleInst.instanceMatrix.needsUpdate = true;
  if (pebbleInst.instanceColor) pebbleInst.instanceColor.needsUpdate = true;
  pebbleInst.computeBoundingSphere();
  group.add(pebbleInst);
  disposables.push(pebbleGeo, pebbleMat);

  // 11. Arching pinnate ferns + upright pond-edge cattails/reeds (strictly filtered through exclusion registry)
  const fernFrondGeo = createArchingFernGeometry(0.68, 0.28);
  const fernMat = new THREE.MeshStandardNodeMaterial({
    map: textures.fernLeafMap,
    alphaTest: 0.3,
    roughness: 0.72,
    metalness: 0.01,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const grassSway = sin(
    elapsedUniform.mul(1.35).add(positionWorld.x.mul(1.1)).add(positionWorld.z.mul(0.95)),
  )
    .mul(0.028)
    .mul(smoothstep(0.06, 0.5, positionLocal.y));
  fernMat.positionNode = positionLocal.add(vec3(grassSway, float(0.0), grassSway.mul(0.5)));

  const ignoreMossForFerns = new Set<FootprintKind>(['moss']);
  const fernCandidates: Array<[number, number, number]> = [
    [-2.48, 2.48, 1.02],
    [-3.95, 3.05, 1.15],
    [-4.5, 1.55, 1.2],
    [-3.68, -1.15, 1.02],
    [-3.45, -3.55, 0.96],
    [2.78, 2.86, 1.22],
    [3.92, 1.48, 1.04], // beside Tsukubai bank without intersecting pot or framing rocks
    [3.15, -1.78, 1.02],
    [-1.42, -5.68, 0.95],
    [0.58, -4.18, 0.96],
  ];
  const fernSpots = fernCandidates.filter(([fx, fz]) => {
    const sample = sampleTerrain({ x: fx, z: fz });
    return registry.isVegetationValid({
      x: fx,
      z: fz,
      clearance: 0.14,
      shoreDistance: sample.shoreDistance,
      slope: sample.slope,
      minShoreDistance: 0.16,
      maxSlope: 0.42,
      ignoreKinds: ignoreMossForFerns,
    });
  });
  const frondsPerRosette = quality === 'desktop' ? 7 : 5;
  const fernInst = new THREE.InstancedMesh(
    fernFrondGeo,
    fernMat,
    Math.max(1, fernSpots.length * frondsPerRosette),
  );
  fernInst.castShadow = false;
  fernInst.receiveShadow = true;

  let fIdx = 0;
  fernSpots.forEach(([fx, fz, sc], sIdx) => {
    const gy = grounder.raycastSurface(fx, fz).y;
    for (let k = 0; k < frondsPerRosette; k++) {
      const ang = (k / frondsPerRosette) * Math.PI * 2 + sIdx * 0.45 + (gRand() - 0.5) * 0.25;
      dummy.position.set(fx, gy + 0.02, fz);
      dummy.rotation.set(-0.18 - gRand() * 0.28, ang, 0);
      const fScale = sc * (0.78 + gRand() * 0.42);
      dummy.scale.setScalar(fScale);
      dummy.updateMatrix();
      fernInst.setMatrixAt(fIdx, dummy.matrix);
      mColor.setHex(fx < -3.0 ? 0x8ea672 : k % 2 === 0 ? 0xffffff : 0xe4f0c4);
      fernInst.setColorAt(fIdx, mColor);
      fIdx++;
    }
    registry.register({
      id: `fern-rosette-${sIdx}`,
      kind: 'moss',
      x: fx,
      z: fz,
      rx: 0.26 * sc,
      rz: 0.26 * sc,
      margin: 0.04,
    });
  });
  fernInst.count = fIdx;
  fernInst.instanceMatrix.needsUpdate = true;
  if (fernInst.instanceColor) fernInst.instanceColor.needsUpdate = true;
  fernInst.computeBoundingSphere();
  group.add(fernInst);
  disposables.push(fernFrondGeo, fernMat);

  // Upright pond-edge reeds / water iris clusters placed strictly in clear shoreline earth pockets
  const reedGeo = createGrassTuftGeometry(8, 0.88, 0.24, 0.028);
  const reedMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.68,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const reedSway = sin(
    elapsedUniform.mul(1.25).add(positionWorld.x.mul(1.0)).add(positionWorld.z.mul(0.85)),
  )
    .mul(0.05)
    .mul(smoothstep(0.08, 0.85, positionLocal.y));
  reedMat.positionNode = positionLocal.add(vec3(reedSway, float(0.0), reedSway.mul(0.6)));

  const reedCandidates: Array<[number, number, number]> = [
    [-2.06, 2.52, 1.12],
    [-2.32, 2.18, 1.0],
    [2.16, 2.48, 1.05], // foreground-right shore pocket clear of camera sightline to ceramic Tsukubai pot
    [2.4, 2.22, 0.94],
    [1.76, -3.55, 0.96],
    [2.05, -3.18, 0.88],
    [-2.05, -3.35, 0.92],
  ];
  const reedSpots = reedCandidates.filter(([rx, rz]) => {
    const sample = sampleTerrain({ x: rx, z: rz });
    return registry.isVegetationValid({
      x: rx,
      z: rz,
      clearance: 0.12,
      shoreDistance: sample.shoreDistance,
      slope: sample.slope,
      minShoreDistance: 0.06,
      maxSlope: 0.44,
      ignoreKinds: ignoreMossForFerns,
    });
  });

  const reedInst = new THREE.InstancedMesh(reedGeo, reedMat, Math.max(1, reedSpots.length));
  reedInst.castShadow = true;
  reedInst.receiveShadow = true;
  reedSpots.forEach(([x, z, sc], idx) => {
    const gy = grounder.raycastSurface(x, z).y;
    dummy.position.set(x, gy - 0.02, z);
    dummy.rotation.set(0, idx * 1.1, 0);
    dummy.scale.setScalar(sc);
    dummy.updateMatrix();
    reedInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(idx % 2 === 0 ? 0x6f9450 : 0x84a85e);
    reedInst.setColorAt(idx, mColor);
  });
  reedInst.count = reedSpots.length;
  reedInst.instanceMatrix.needsUpdate = true;
  if (reedInst.instanceColor) reedInst.instanceColor.needsUpdate = true;
  reedInst.computeBoundingSphere();
  group.add(reedInst);
  disposables.push(reedGeo, reedMat);

  // Subtle brown cattail spikes nestled inside the validated reed clumps
  const spikeStemGeo = new THREE.CylinderGeometry(0.008, 0.011, 0.92, 5);
  spikeStemGeo.translate(0, 0.46, 0);
  const spikeHeadGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 7);
  spikeHeadGeo.translate(0, 0.84, 0);
  const spikeStemMat = createMatteNodeMaterial(0x5d8040, 0.78, 0.01);
  const spikeHeadMat = createMatteNodeMaterial(0x523624, 0.92, 0.01);
  const spikeCandidates: Array<[number, number, number]> = [
    [-2.1, 2.48, 0.98],
    [-2.02, 2.58, 1.06],
    [-2.28, 2.24, 0.9],
    [2.18, 2.44, 0.96],
    [2.38, 2.24, 0.88],
  ];
  spikeCandidates.forEach(([x, z, s], idx) => {
    const sample = sampleTerrain({ x, z });
    if (
      !registry.isVegetationValid({
        x,
        z,
        clearance: 0.1,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.06,
        maxSlope: 0.44,
        ignoreKinds: ignoreMossForFerns,
      })
    ) {
      return;
    }
    const gy = grounder.raycastSurface(x, z).y;
    const st = new THREE.Mesh(spikeStemGeo, spikeStemMat);
    const hd = new THREE.Mesh(spikeHeadGeo, spikeHeadMat);
    st.position.set(x, gy - 0.02, z);
    hd.position.set(x, gy - 0.02, z);
    st.rotation.set(0.06 * Math.sin(idx), idx, 0.05 * Math.cos(idx));
    hd.rotation.copy(st.rotation);
    st.scale.setScalar(s);
    hd.scale.setScalar(s);
    group.add(st, hd);
  });
  disposables.push(spikeStemGeo, spikeHeadGeo, spikeStemMat, spikeHeadMat);

  // 12. Continuous organic grass & sedge drifts across open garden zones (clustered pockets, zero clipping)
  const grassGeo = createCrossedClumpGeometry(0.32, 0.22);
  const grassMat = new THREE.MeshStandardNodeMaterial({
    map: textures.grassBladeMap,
    alphaTest: 0.32,
    roughness: 0.82,
    metalness: 0.01,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const clumpWindSway = sin(
    elapsedUniform.mul(1.35).add(positionWorld.x.mul(1.1)).add(positionWorld.z.mul(0.95)),
  )
    .mul(0.022)
    .mul(smoothstep(0.02, 0.22, positionLocal.y));
  grassMat.positionNode = positionLocal.add(vec3(clumpWindSway, float(0.0), clumpWindSway.mul(0.5)));

  // Broad organic garden zones (overlapping ranges produce natural continuous ground-cover drifts)
  const grassZones: Array<{ minX: number; maxX: number; minZ: number; maxZ: number; weight: number }> = [
    // Right foreground & sunny right bank around pond & sakura fringe
    { minX: 1.2, maxX: 5.8, minZ: 1.1, maxZ: 5.0, weight: 3 },
    // Right-mid ridge behind sakura & north bank
    { minX: 1.4, maxX: 6.2, minZ: -5.4, maxZ: -1.4, weight: 3 },
    // Mid-back terrace between shrine & right bamboo ridge
    { minX: -1.6, maxX: 4.6, minZ: -6.8, maxZ: -3.6, weight: 3 },
    // Left mossy woodland flanks (outside stepping path & behind foreground hero space)
    { minX: -5.6, maxX: -2.2, minZ: -5.4, maxZ: 4.5, weight: 2 },
    // Foreground center-left border beside pebble beach
    { minX: -0.4, maxX: 2.8, minZ: 3.1, maxZ: 5.2, weight: 2 },
  ];
  const zoneBag: typeof grassZones = [];
  grassZones.forEach((zone) => {
    for (let w = 0; w < zone.weight; w++) zoneBag.push(zone);
  });

  const grassCoords: Array<[number, number, number, number, number, number]> = [];
  const targetGrass = quality === 'desktop' ? 680 : 280;
  let attempts = 0;
  while (grassCoords.length < targetGrass && attempts < 7500) {
    attempts++;
    const zone = zoneBag[attempts % zoneBag.length];
    const cx = zone.minX + gRand() * (zone.maxX - zone.minX);
    const cz = zone.minZ + gRand() * (zone.maxZ - zone.minZ);
    // Keep natural moss carpet breaks so ground doesn't look uniformly blanketed
    const patchWave = Math.sin(cx * 0.95 + 0.4) * Math.cos(cz * 0.85 - 0.3);
    if (patchWave < -0.48 && gRand() < 0.72) continue;

    const clusterSize = 1 + (attempts % 3);
    for (let m = 0; m < clusterSize && grassCoords.length < targetGrass; m++) {
      const ang = gRand() * Math.PI * 2;
      const rad = m === 0 ? 0 : 0.09 + gRand() * 0.22;
      const x = cx + Math.cos(ang) * rad;
      const z = cz + Math.sin(ang) * rad;
      const sample = sampleTerrain({ x, z });

      if (
        !registry.isVegetationValid({
          x,
          z,
          clearance: 0.14,
          shoreDistance: sample.shoreDistance,
          slope: sample.slope,
          minShoreDistance: 0.22,
          maxSlope: 0.36,
        })
      ) {
        continue;
      }

      const gy = grounder.raycastSurface(x, z).y;
      const leftShorten = x < -2.6 ? 0.76 : 1.0;
      const scale = (0.68 + gRand() * 0.56) * leftShorten;
      grassCoords.push([x, gy, z, scale, gRand() * Math.PI * 2, sample.normal.x]);
    }
  }
  const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, Math.max(1, grassCoords.length));
  grassInst.receiveShadow = true;
  const gPalette = [0x9eb476, 0xb2c684, 0x8ea466, 0xc0d292];
  grassCoords.forEach(([x, gy, z, sc, rot, nx], idx) => {
    dummy.position.set(x, gy - 0.025, z);
    dummy.rotation.set(0, rot, -nx * 0.35);
    dummy.scale.set(sc, sc * (0.85 + (idx % 3) * 0.12), sc);
    dummy.updateMatrix();
    grassInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(x < -3.0 ? 0x768a58 : gPalette[idx % gPalette.length]);
    grassInst.setColorAt(idx, mColor);
  });
  grassInst.count = grassCoords.length;
  grassInst.instanceMatrix.needsUpdate = true;
  if (grassInst.instanceColor) grassInst.instanceColor.needsUpdate = true;
  grassInst.computeBoundingSphere();
  group.add(grassInst);
  disposables.push(grassGeo, grassMat);

  // 13. Falling & floating sakura petals from right-side cherry canopy onto the jade pond
  const petalPlaneGeo = new THREE.PlaneGeometry(0.11, 0.11);
  const restingPetalGeo = new THREE.PlaneGeometry(0.088, 0.088);
  restingPetalGeo.rotateX(-Math.PI / 2);
  const petalMat = new THREE.MeshStandardNodeMaterial({
    map: textures.petalMap,
    alphaTest: 0.2,
    roughness: 0.65,
    metalness: 0.01,
    side: THREE.DoubleSide,
  });
  disposables.push(petalPlaneGeo, restingPetalGeo, petalMat);

  const restingCoords: Array<[number, number, number]> = [
    [1.15, -0.42, 0.4],
    [1.65, 0.55, -0.5],
    [0.85, 0.92, 0.8],
    [1.38, -1.12, -0.2],
    [0.42, 0.15, 0.3],
    [-0.35, 1.48, 1.1],
    [-0.95, 2.05, -0.7],
    [1.82, -0.18, 0.65],
    [2.45, 0.68, -0.4],
    [2.78, -0.72, 1.2],
    [3.12, -1.45, -0.8],
  ];
  const restingPetals = new THREE.InstancedMesh(restingPetalGeo, petalMat, restingCoords.length);
  restingCoords.forEach(([x, z, rot], idx) => {
    const py = isInsideNaturalPond({ x, z }) ? 0.008 : grounder.raycastSurface(x, z).y + 0.014;
    dummy.position.set(x, py, z);
    dummy.rotation.set(0, rot, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    restingPetals.setMatrixAt(idx, dummy.matrix);
  });
  restingPetals.instanceMatrix.needsUpdate = true;
  restingPetals.computeBoundingSphere();
  group.add(restingPetals);

  const driftingCount = quality === 'desktop' ? 18 : 10;
  const driftingPetals: DriftingPetal[] = [];
  for (let i = 0; i < driftingCount; i++) {
    const ox = 0.6 + ((i * 0.43) % 2.1);
    const oz = -1.6 + ((i * 0.67) % 2.8);
    const mesh = new THREE.Mesh(petalPlaneGeo, petalMat);
    const initialY = 0.45 + ((i * 0.41) % 2.6);
    mesh.position.set(ox, initialY, oz);
    mesh.renderOrder = 4;
    group.add(mesh);
    driftingPetals.push({
      mesh,
      originX: ox,
      originZ: oz,
      x: ox,
      y: initialY,
      z: oz,
      fallSpeed: 0.19 + (i % 4) * 0.035,
      swayPhase: i * 1.17,
      swayAmp: 0.24 + (i % 3) * 0.08,
      landedTimer: 0,
      spawnedRipple: false,
    });
  }

  // 14. Seamless misty forest sky gradient high behind distant bamboo + upper-right diagonal sunbeams
  const skyBackdropGeo = new THREE.PlaneGeometry(110, 38);
  const skyBackdropMat = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
  });
  const skyV = positionLocal.y.add(19.0).div(38.0);
  const skyGrad = smoothstep(0.32, 0.85, skyV);
  const rightGlow = smoothstep(-10.0, 22.0, positionLocal.x).mul(0.36);
  skyBackdropMat.colorNode = vec3(0.14, 0.2, 0.14)
    .mul(float(1.0).sub(skyGrad))
    .add(vec3(0.56, 0.64, 0.54).add(vec3(0.22, 0.2, 0.12).mul(rightGlow)).mul(skyGrad));
  skyBackdropMat.opacityNode = smoothstep(0.24, 0.52, skyV).mul(0.84);
  const skyBackdrop = new THREE.Mesh(skyBackdropGeo, skyBackdropMat);
  skyBackdrop.position.set(2.5, 13.0, -36.0);
  group.add(skyBackdrop);
  disposables.push(skyBackdropGeo, skyBackdropMat);

  const sunbeamOpacityUniform = uniform(1.0) as FloatUniform;
  const sunbeamMat = createSunbeamMaterial(elapsedUniform, sunbeamOpacityUniform);
  const sunbeamGeo = new THREE.PlaneGeometry(3.2, 10.5);
  const sunbeamSpecs: Array<[number, number, number, number, number]> = [
    [2.4, 5.2, -5.8, 0.18, -0.56],
    [0.6, 5.4, -7.2, 0.16, -0.58],
    [4.1, 5.0, -4.8, 0.2, -0.54],
    [-1.0, 5.6, -8.8, 0.15, -0.58],
  ];
  sunbeamSpecs.forEach(([x, y, z, rx, rz]) => {
    const beam = new THREE.Mesh(sunbeamGeo, sunbeamMat);
    beam.position.set(x, y, z);
    beam.rotation.set(rx, -0.22, rz);
    beam.renderOrder = 5;
    group.add(beam);
  });
  disposables.push(sunbeamGeo, sunbeamMat);

  const mistGeo = new THREE.PlaneGeometry(40, 7.5);
  const mistSpecs: Array<[number, number, number, number]> = [
    [-1.5, 4.7, -13.8, 0.14],
    [2.6, 5.2, -16.5, 0.18],
    [-4.2, 4.6, -19.5, 0.14],
  ];
  mistSpecs.forEach(([x, y, z, op], idx) => {
    const mistMat = createMistSheetMaterial(elapsedUniform, idx * 2.1, op);
    const mistMesh = new THREE.Mesh(mistGeo, mistMat);
    mistMesh.position.set(x, y, z);
    mistMesh.renderOrder = 4;
    group.add(mistMesh);
    disposables.push(mistMat);
  });
  disposables.push(mistGeo);

  // Subtle floating sunlit pollen / morning dust motes
  const moteGeo = new THREE.SphereGeometry(0.015, 5, 5);
  const moteMat = new THREE.MeshBasicNodeMaterial({
    color: 0xfff2cc,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const moteCount = quality === 'desktop' ? 24 : 12;
  const dustMotes: DustMote[] = [];
  for (let i = 0; i < moteCount; i++) {
    const bx = -1.8 + gRand() * 5.2;
    const by = 0.55 + gRand() * 2.8;
    const bz = -4.2 + gRand() * 6.8;
    const mesh = new THREE.Mesh(moteGeo, moteMat);
    mesh.position.set(bx, by, bz);
    mesh.renderOrder = 5;
    group.add(mesh);
    dustMotes.push({
      mesh,
      baseX: bx,
      baseY: by,
      baseZ: bz,
      phase: gRand() * Math.PI * 2,
      speed: 0.35 + gRand() * 0.45,
    });
  }
  disposables.push(moteGeo, moteMat);
  grounder.dispose();

  let waterfallCooldown = 0.24;
  const waterfallImpact = waterfall.impactPoint;

  const update = (
    elapsed: number,
    dt: number,
    atmosphereFactor: number,
    onPetalTouchdown?: (x: number, z: number) => void,
    onWaterfallRipple?: (x: number, z: number) => void,
  ) => {
    sunbeamOpacityUniform.value = Math.max(0.18, Math.min(1.1, atmosphereFactor));

    const safeDt = Math.min(Math.max(dt, 0), 0.08);
    if (safeDt <= 0) return;

    waterfallCooldown -= safeDt;
    if (waterfallCooldown <= 0) {
      waterfallCooldown = 0.85;
      onWaterfallRipple?.(waterfallImpact.x, waterfallImpact.z);
    }

    for (const p of driftingPetals) {
      const floorY = isInsideNaturalPond({ x: p.x, z: p.z })
        ? 0.008
        : terrainElevation(p.x, p.z) + 0.014;
      if (p.y > floorY) {
        p.y -= p.fallSpeed * safeDt;
        p.x += Math.sin(elapsed * 1.45 + p.swayPhase) * p.swayAmp * safeDt - 0.045 * safeDt;
        p.z += Math.cos(elapsed * 1.18 + p.swayPhase * 1.3) * (p.swayAmp * 0.72) * safeDt;
        p.mesh.position.set(p.x, Math.max(floorY, p.y), p.z);
        p.mesh.rotation.set(
          Math.sin(elapsed * 2.1 + p.swayPhase) * 0.65,
          elapsed * 0.9 + p.swayPhase,
          Math.cos(elapsed * 1.7 + p.swayPhase) * 0.55,
        );
      } else {
        if (!p.spawnedRipple) {
          p.spawnedRipple = true;
          if (isInsideNaturalPond({ x: p.x, z: p.z }, 0.3)) {
            onPetalTouchdown?.(p.x, p.z);
          }
        }
        p.landedTimer += safeDt;
        p.mesh.rotation.set(-Math.PI / 2, p.swayPhase, 0);
        p.mesh.position.set(p.x, floorY, p.z);
        if (p.landedTimer > 1.8) {
          p.x = p.originX;
          p.z = p.originZ;
          p.y = 2.6 + (p.swayPhase % 0.8);
          p.landedTimer = 0;
          p.spawnedRipple = false;
        }
      }
    }

    for (const m of dustMotes) {
      m.mesh.position.set(
        m.baseX + Math.sin(elapsed * m.speed + m.phase) * 0.24,
        m.baseY + Math.cos(elapsed * m.speed * 0.75 + m.phase) * 0.16,
        m.baseZ + Math.sin(elapsed * m.speed * 0.6 + m.phase * 1.4) * 0.2,
      );
    }
  };

  return {
    group,
    update,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

export { createGardenEnvironment };
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/materials.ts">
<![CDATA[import * as THREE from 'three/webgpu';
import {
  abs,
  cameraPosition,
  clamp,
  color,
  cos,
  dot,
  equirectUV,
  exp,
  float,
  length,
  max,
  mix,
  normalLocal,
  normalWorld,
  positionLocal,
  positionWorld,
  pow,
  reflect,
  reflector,
  screenUV,
  sin,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
  vertexColor,
  viewportSharedTexture,
} from 'three/tsl';
import { MAX_SHADER_RIPPLES, NATURAL_POND_RX, NATURAL_POND_RZ } from './model';
import type { PondTextureSuite } from './textures';

export type FloatUniform = ReturnType<typeof uniform<'float'>>;
export type Vec4Uniform = ReturnType<typeof uniform<'vec4'>>;

export const PALETTE = {
  pond: 0x112c2a,
  paper: 0xf4efe2,
  moss: 0x203d33,
  vermilion: 0x9e3f32,
  sakura: 0xc7a6a2,
  stone: 0xd6c7a9,
  leaf: 0x526e58,
  ink: 0x1e2320,
  porcelain: 0xfdfbf5,
  gold: 0xcb9462,
} as const;

export type KoiVariant = 'kohaku' | 'yamabuki' | 'shiro' | 'sanke';

/**
 * Analytic sunlit caustic filaments projected in world XZ space.
 */
function computeWaterCaustics(
  worldXZ: typeof positionWorld.xz,
  elapsed: FloatUniform,
) {
  const p1 = worldXZ.mul(2.15).add(vec2(elapsed.mul(0.24), elapsed.mul(-0.19)));
  const p2 = worldXZ.mul(2.85).add(vec2(elapsed.mul(-0.18), elapsed.mul(0.26)));

  const w1 = sin(p1.x.add(sin(p1.y.mul(1.35).add(elapsed.mul(0.48))))).mul(
    cos(p1.y.add(cos(p1.x.mul(1.15).sub(elapsed.mul(0.35))))),
  );
  const w2 = sin(p2.x.sub(cos(p2.y.mul(1.4).sub(elapsed.mul(0.42))))).mul(
    cos(p2.y.add(sin(p2.x.mul(1.2).add(elapsed.mul(0.38))))),
  );

  const ridge1 = float(1.0).sub(abs(w1));
  const ridge2 = float(1.0).sub(abs(w2));
  return pow(clamp(ridge1.mul(ridge2).mul(1.18), 0.0, 1.0), 4.4);
}

export function createPondBedMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  const bedUv = positionWorld.xz.mul(0.58);
  const baseTex = texture(textures.bedAlbedo, bedUv).rgb.mul(0.82);

  // Depth-based organic silt darkening in center basin + sunlit warmth in shallows
  const depthFactor = clamp(positionWorld.y.negate().div(0.72), 0.0, 1.0);
  const deepSiltTint = mix(baseTex, baseTex.mul(vec3(0.34, 0.48, 0.44)), depthFactor.mul(0.76));

  // Dappled morning caustics (softened under deep shadows near sakura left cove)
  const caustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const sunSpread = smoothstep(-4.4, 3.6, positionWorld.x.add(positionWorld.z.mul(0.35)));
  const causticBoost = caustic.mul(sunSpread).mul(mix(0.36, 0.18, depthFactor));
  const sunlitColor = deepSiltTint.add(vec3(0.95, 0.91, 0.76).mul(causticBoost));

  mat.colorNode = sunlitColor;
  mat.normalMap = textures.bedNormal;
  mat.normalScale = new THREE.Vector2(0.75, 0.75);
  mat.roughnessNode = float(0.94);
  mat.metalnessNode = float(0.02);
  return mat;
}

export function createSubmergedStoneMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  const stoneUv = uv().mul(2.2);
  const albedo = texture(textures.stoneAlbedo, stoneUv).rgb.mul(vec3(0.54, 0.62, 0.58));
  const caustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const upFacing = smoothstep(0.15, 0.75, normalWorld.y);

  mat.colorNode = albedo.add(vec3(0.92, 0.88, 0.74).mul(caustic.mul(upFacing).mul(0.38)));
  mat.normalMap = textures.stoneNormal;
  mat.normalScale = new THREE.Vector2(0.9, 0.9);
  mat.roughnessNode = float(0.58);
  mat.metalnessNode = float(0.03);
  return mat;
}

export function createShoreStoneMaterial(textures: PondTextureSuite): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  // Higher-frequency world-space triplanar projection gives crisp granite mineral grain
  const uvTop = positionWorld.xz.mul(1.35);
  const uvSide = positionWorld.xy.add(vec2(positionWorld.z.mul(0.6), 0.0)).mul(1.35);
  const sideBlend = smoothstep(0.35, 0.75, abs(normalWorld.y));
  const rockTop = texture(textures.stoneAlbedo, uvTop).rgb;
  const rockSide = texture(textures.stoneAlbedo, uvSide).rgb;
  const rockRgb = mix(rockSide, rockTop, sideBlend).mul(vec3(0.76, 0.77, 0.75));
  const rockRough = mix(
    texture(textures.stoneRoughness, uvSide).r,
    texture(textures.stoneRoughness, uvTop).r,
    sideBlend,
  );

  // Wet shoreline zone darkens granite and lowers roughness realistically
  const wetness = float(1.0).sub(smoothstep(-0.04, 0.13, positionWorld.y));
  const wetRock = rockRgb.mul(vec3(0.36, 0.4, 0.39));
  const dryOrWet = mix(rockRgb, wetRock, wetness.mul(0.9));

  // Restrained moss flecks only in sheltered crevices
  const mossNoise = sin(positionWorld.x.mul(2.1).add(positionWorld.z.mul(2.6)))
    .mul(0.5)
    .add(0.5);
  const mossMask = smoothstep(0.76, 0.95, normalWorld.y)
    .mul(smoothstep(0.16, 0.32, positionWorld.y))
    .mul(smoothstep(0.62, 0.9, mossNoise))
    .mul(0.42);
  const mossColor = color(PALETTE.leaf).mul(0.72);

  mat.colorNode = mix(dryOrWet, mossColor, mossMask);
  mat.normalMap = textures.stoneNormal;
  mat.normalScale = new THREE.Vector2(1.1, 1.1);
  mat.roughnessNode = mix(rockRough, float(0.16), wetness.mul(0.9));
  mat.metalnessNode = float(0.02);
  return mat;
}

export function createGroundTerraceMaterial(
  textures: PondTextureSuite,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial();
  // World-space multi-scale UV sampling eliminates visible tiling across slopes and distances
  const macroUv = positionWorld.xz.mul(0.21);
  const medUv = positionWorld.xz.mul(0.78);
  const microUv = positionWorld.xz.mul(1.65);

  const soilMacro = texture(textures.groundAlbedo, macroUv).rgb;
  const soilMicro = texture(textures.groundAlbedo, medUv).rgb;
  const soilFine = texture(textures.groundAlbedo, microUv).rgb;
  const mossMed = texture(textures.mossAlbedo, medUv.mul(1.35)).rgb;
  const mossMacro = texture(textures.mossAlbedo, macroUv.mul(1.6)).rgb;
  const litterTex = texture(textures.litterAlbedo, medUv.mul(1.15)).rgb;
  const stoneGrit = texture(textures.stoneAlbedo, microUv.mul(0.95)).rgb;

  // Vertex biome weights computed from unified terrain sampler:
  // r = gravel/path approach, g = woodland/bamboo forest litter, b = damp shoreline rim
  const biomeWeights = vertexColor();
  const pathWeight = clamp(biomeWeights.r, 0.0, 1.0);
  const forestWeight = clamp(biomeWeights.g, 0.0, 1.0);
  const rimWeight = clamp(biomeWeights.b, 0.0, 1.0);

  // 1. Rich damp garden loam & dark mineral slope earth (calibrated for linear-space ACES rendering)
  const soilMix = mix(mix(soilMacro, soilMicro, 0.55), soilFine, 0.32);
  const baseSoil = mix(soilMix, stoneGrit, 0.16).mul(vec3(0.96, 0.85, 0.68));
  const slopeMask = smoothstep(0.92, 0.72, normalWorld.y);

  // 2. Multi-scale velvety moss carpets (rich emerald-olive depth with warm moss shoulders)
  const mossNoiseA = sin(positionWorld.x.mul(1.12).add(0.45)).mul(
    cos(positionWorld.z.mul(0.92).sub(0.35)),
  );
  const mossNoiseB = sin(positionWorld.x.mul(2.45).sub(positionWorld.z.mul(2.1)));
  const mossNoiseC = cos(positionWorld.x.mul(4.3).add(positionWorld.z.mul(3.9)));
  const organicMossMask = clamp(
    mossNoiseA.mul(0.3).add(mossNoiseB.mul(0.18)).add(mossNoiseC.mul(0.08)).add(0.52),
    0.0,
    1.0,
  );
  const heightMossBias = smoothstep(0.04, 0.28, positionWorld.y);
  const mossWeight = clamp(
    organicMossMask
      .mul(mix(0.42, 0.96, heightMossBias))
      .mul(float(1.0).sub(pathWeight.mul(0.9)))
      .mul(float(1.0).sub(slopeMask.mul(0.42)))
      .mul(float(1.0).sub(forestWeight.mul(0.38))),
    0.1,
    0.92,
  );

  const layeredMoss = mix(mossMacro, mossMed, 0.64).mul(vec3(0.76, 0.96, 0.48));
  const soilAndMoss = mix(baseSoil, layeredMoss, mossWeight);

  // 3. Woodland / bamboo forest floor (deep mossy humus, fallen leaves, rich shaded loam)
  const forestFloor = mix(
    soilAndMoss.mul(vec3(0.64, 0.74, 0.52)),
    litterTex.mul(vec3(0.68, 0.64, 0.46)),
    0.42,
  );
  const withForest = mix(soilAndMoss, forestFloor, forestWeight.mul(0.72));

  // 4. Compacted dark soil & weathered granite grit along winding shrine approach path
  const pathBed = mix(
    litterTex.mul(vec3(0.92, 0.86, 0.72)),
    stoneGrit.mul(vec3(0.84, 0.82, 0.74)),
    0.42,
  );
  const withPath = mix(withForest, pathBed, pathWeight.mul(0.82));

  // 5. Damp dark pond shoreline collar (organic edge moisture broken up by noise)
  const shoreNoise = sin(positionWorld.x.mul(2.9).add(positionWorld.z.mul(2.5)))
    .mul(0.5)
    .add(0.5);
  const wetShore = float(1.0).sub(smoothstep(-0.04, 0.14, positionWorld.y));
  const wetness = clamp(
    max(wetShore.mul(0.78), rimWeight.mul(mix(0.42, 0.82, shoreNoise))),
    0.0,
    1.0,
  );
  const wetMineral = mix(
    stoneGrit.mul(vec3(0.36, 0.4, 0.36)),
    withPath.mul(vec3(0.42, 0.46, 0.38)),
    0.45,
  );
  const dampGround = mix(withPath, wetMineral, wetness.mul(0.82));

  // 6. Physically restrained morning sun warmth + quiet dark left woodland beneath typography
  const dappleA = sin(positionWorld.x.mul(0.82).add(positionWorld.z.mul(0.44)).add(0.5));
  const dappleB = cos(positionWorld.x.mul(1.6).sub(positionWorld.z.mul(1.18)));
  const dappleMask = smoothstep(
    0.16,
    0.84,
    dappleA.mul(0.55).add(dappleB.mul(0.45)).mul(0.5).add(0.5),
  );
  const rightSunCorridor = smoothstep(-3.6, 2.8, positionWorld.x.sub(positionWorld.z.mul(0.15)));
  const sunWarmth = dappleMask.mul(rightSunCorridor);
  const sunlitGround = dampGround.mul(
    mix(vec3(0.76, 0.82, 0.72), vec3(1.06, 1.04, 0.84), sunWarmth),
  );

  const leftWoodShade = smoothstep(-2.4, -6.2, positionWorld.x).mul(0.42);
  mat.colorNode = mix(sunlitGround, sunlitGround.mul(vec3(0.52, 0.56, 0.48)), leftWoodShade);

  mat.normalMap = textures.groundNormal;
  mat.normalScale = new THREE.Vector2(1.6, 1.6);
  mat.roughnessNode = mix(
    mix(float(0.95), float(0.88), pathWeight),
    float(0.32),
    wetness,
  );
  mat.metalnessNode = float(0.01);
  return mat;
}

export function createTrickleStreamMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
): THREE.MeshPhysicalNodeMaterial {
  const mat = new THREE.MeshPhysicalNodeMaterial();
  const uvCoord = uv();
  // Flow runs along U (spout/lip -> basin/pond)
  const flowUvA = vec2(uvCoord.x.mul(1.8).sub(elapsedUniform.mul(2.1)), uvCoord.y.mul(2.4));
  const flowUvB = vec2(uvCoord.x.mul(3.1).sub(elapsedUniform.mul(3.2)), uvCoord.y.mul(1.5).add(0.35));

  const streakA = sin(flowUvA.x.mul(9.0).add(texture(textures.waterNormalA, flowUvA).r.mul(3.2)))
    .mul(0.5)
    .add(0.5);
  const streakB = sin(flowUvB.x.mul(14.0).add(texture(textures.waterNormalB, flowUvB).g.mul(2.6)))
    .mul(0.5)
    .add(0.5);

  const foamStreak = pow(clamp(streakA.mul(0.62).add(streakB.mul(0.48)), 0.0, 1.0), 2.4);
  const waterTint = mix(vec3(0.36, 0.58, 0.54), vec3(0.86, 0.93, 0.9), foamStreak.mul(0.55));

  mat.colorNode = waterTint;
  mat.emissiveNode = vec3(0.12, 0.19, 0.17).mul(foamStreak.mul(0.24));
  mat.roughnessNode = float(0.06);
  mat.metalnessNode = float(0.04);
  mat.opacityNode = float(0.22).add(foamStreak.mul(0.44));
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createKoiBodyMaterial(
  variant: KoiVariant,
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  speedUniform: FloatUniform,
  phase: number,
): THREE.MeshPhysicalNodeMaterial {
  const mat = new THREE.MeshPhysicalNodeMaterial();

  // Body runs local x in [-0.36, +0.36]; u = 0 at tail root, 1 at snout
  const uCoord = clamp(positionLocal.x.add(0.36).div(0.72), 0.0, 1.0);
  const tailWeight = pow(float(1.0).sub(uCoord), 1.55);
  const headCounterSway = sin(float(3.4).mul(elapsedUniform).add(phase)).mul(0.005).mul(uCoord);
  const speedScale = clamp(speedUniform.div(0.66), 0.75, 1.45);
  const swimWave = sin(
    float(8.6)
      .mul(float(1.0).sub(uCoord))
      .sub(float(3.6).mul(elapsedUniform).mul(speedScale))
      .add(phase),
  );
  const lateralOffset = float(0.042).mul(tailWeight).mul(swimWave).add(headCounterSway);
  mat.positionNode = positionLocal.add(vec3(0, 0, lateralOffset));

  const uvCoord = uv();
  const dorsalMask = smoothstep(-0.16, 0.1, normalLocal.y);
  const ventralHighlight = smoothstep(0.1, -0.35, normalLocal.y);

  const porcelain = color(PALETTE.porcelain);
  const vermilion = color(PALETTE.vermilion).mul(1.12);
  const gold = color(PALETTE.gold).mul(1.06);
  const ink = color(PALETTE.ink);

  let baseColor;
  if (variant === 'kohaku') {
    const p1 = length(
      vec2(
        uvCoord.x.sub(0.74).mul(2.15),
        uvCoord.y.sub(0.5).add(sin(uvCoord.x.mul(9.0)).mul(0.055)).mul(1.7),
      ),
    );
    const p2 = length(
      vec2(
        uvCoord.x.sub(0.38).mul(2.05),
        uvCoord.y.sub(0.47).sub(sin(uvCoord.x.mul(7.5)).mul(0.05)).mul(1.75),
      ),
    );
    const p3 = length(vec2(uvCoord.x.sub(0.9).mul(3.5), uvCoord.y.sub(0.51).mul(2.4)));
    const m1 = float(1.0).sub(smoothstep(0.41, 0.54, p1));
    const m2 = float(1.0).sub(smoothstep(0.37, 0.5, p2));
    const m3 = float(1.0).sub(smoothstep(0.34, 0.48, p3));
    const redMask = clamp(m1.add(m2).add(m3), 0.0, 1.0).mul(dorsalMask);
    baseColor = mix(porcelain, vermilion, redMask);
  } else if (variant === 'yamabuki') {
    const crownGold = mix(color(0xf1d292), gold, smoothstep(-0.15, 0.45, normalLocal.y));
    baseColor = mix(crownGold, color(0xf9efe0), ventralHighlight.mul(0.55));
  } else if (variant === 'shiro') {
    const s1 = length(
      vec2(uvCoord.x.sub(0.71).mul(2.15), uvCoord.y.sub(0.52).add(sin(uvCoord.x.mul(7.0)).mul(0.04)).mul(1.8)),
    );
    const s2 = length(vec2(uvCoord.x.sub(0.36).mul(2.1), uvCoord.y.sub(0.45).mul(1.85)));
    const s3 = length(vec2(uvCoord.x.sub(0.56).mul(3.1), uvCoord.y.sub(0.6).mul(2.5)));
    const m1 = float(1.0).sub(smoothstep(0.37, 0.5, s1));
    const m2 = float(1.0).sub(smoothstep(0.35, 0.48, s2));
    const m3 = float(1.0).sub(smoothstep(0.28, 0.4, s3));
    const inkMask = clamp(m1.add(m2).add(m3), 0.0, 1.0).mul(dorsalMask);
    baseColor = mix(porcelain, ink, inkMask);
  } else {
    const r1 = length(vec2(uvCoord.x.sub(0.77).mul(2.3), uvCoord.y.sub(0.51).mul(1.85)));
    const r2 = length(vec2(uvCoord.x.sub(0.29).mul(2.4), uvCoord.y.sub(0.49).mul(1.95)));
    const k1 = length(vec2(uvCoord.x.sub(0.54).mul(2.7), uvCoord.y.sub(0.46).mul(2.15)));
    const k2 = length(vec2(uvCoord.x.sub(0.41).mul(3.2), uvCoord.y.sub(0.58).mul(2.45)));

    const redMask = clamp(
      float(1.0).sub(smoothstep(0.38, 0.52, r1)).add(float(1.0).sub(smoothstep(0.33, 0.47, r2))),
      0.0,
      1.0,
    ).mul(dorsalMask);
    const inkMask = clamp(
      float(1.0).sub(smoothstep(0.31, 0.45, k1)).add(float(1.0).sub(smoothstep(0.25, 0.39, k2))),
      0.0,
      1.0,
    ).mul(dorsalMask);

    const withRed = mix(porcelain, vermilion, redMask);
    baseColor = mix(withRed, ink, inkMask);
  }

  // Subtle animated caustics shimmering across the koi's back underwater
  const fishCaustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const dorsalCaustic = fishCaustic.mul(smoothstep(0.05, 0.72, normalWorld.y)).mul(0.26);
  mat.colorNode = baseColor.add(vec3(0.95, 0.91, 0.76).mul(dorsalCaustic));

  // Scale micro-relief fades cleanly toward smooth snout (u > 0.76)
  const scaleZone = float(1.0).sub(smoothstep(0.7, 0.84, uCoord));
  mat.normalMap = textures.scaleNormal;
  mat.normalScale = new THREE.Vector2(0.45, 0.45);
  mat.roughnessNode = mix(float(0.16), float(0.26), scaleZone);
  mat.metalnessNode = float(0.04);
  mat.clearcoat = 0.72;
  mat.clearcoatRoughness = 0.14;
  return mat;
}

export interface WaterSurfaceMaterialHandle {
  material: THREE.MeshBasicNodeMaterial;
  reflectorTarget: THREE.Object3D | null;
}

export function createWaterSurfaceMaterial(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  rippleUniforms: Vec4Uniform[],
  sunDirection: THREE.Vector3,
  usePlanarReflector: boolean,
  reflectionScale: number,
): WaterSurfaceMaterialHandle {
  const mat = new THREE.MeshBasicNodeMaterial();
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;

  const sunDir = vec3(sunDirection.x, sunDirection.y, sunDirection.z).normalize();

  // 1. Two scrolling + cross-drifting procedural normal map layers + fine capillary shimmer
  const uvA = positionWorld.xz
    .mul(0.26)
    .add(vec2(elapsedUniform.mul(0.024), elapsedUniform.mul(0.017)));
  const uvB = positionWorld.xz
    .mul(0.47)
    .add(vec2(elapsedUniform.mul(-0.021), elapsedUniform.mul(0.028)));
  const uvC = positionWorld.xz
    .mul(0.92)
    .add(vec2(elapsedUniform.mul(0.016), elapsedUniform.mul(-0.024)));

  const nA = texture(textures.waterNormalA, uvA).xy.mul(2.0).sub(1.0);
  const nB = texture(textures.waterNormalB, uvB).xy.mul(2.0).sub(1.0);
  const nC = texture(textures.waterNormalB, uvC).xy.mul(2.0).sub(1.0);

  let nx = nA.x.mul(0.055).add(nB.x.mul(0.045)).add(nC.x.mul(0.022));
  let nz = nA.y.mul(0.055).add(nB.y.mul(0.045)).add(nC.y.mul(0.022));

  // 2. Accumulate localized physical ring ripples (clicks, fish wakes, sakura petals, food pellets)
  let rippleCrest = float(0.0).mul(1.0);
  for (let i = 0; i < MAX_SHADER_RIPPLES; i++) {
    const rData = rippleUniforms[i];
    const age = elapsedUniform.sub(rData.z);
    const active = smoothstep(-0.001, 0.02, age).mul(float(1.0).sub(smoothstep(2.0, 2.55, age)));
    const strength = rData.w.mul(active);

    const delta = positionWorld.xz.sub(rData.xy);
    const dist = length(delta).add(0.0001);
    const dir = delta.div(dist);

    const front = age.mul(0.95);
    const ringDist = dist.sub(front);
    // Double concentric crest per ripple for lifelike surface tension feel
    const band1 = exp(ringDist.mul(ringDist).mul(-52.0));
    const band2 = exp(ringDist.add(0.14).mul(ringDist.add(0.14)).mul(-68.0)).mul(0.55);
    const wave = sin(ringDist.mul(36.0));
    const radialEnvelope = band1.add(band2).mul(exp(age.mul(-1.25))).mul(strength);

    const slope = wave.mul(radialEnvelope).mul(0.26);
    nx = nx.add(dir.x.mul(slope));
    nz = nz.add(dir.y.mul(slope));
    rippleCrest = rippleCrest.add(max(float(0.0), wave).mul(radialEnvelope));
  }

  const surfaceNormal = vec3(nx, float(1.0), nz).normalize();
  const worldToEye = cameraPosition.sub(positionWorld);
  const eyeDir = worldToEye.normalize();

  // 3. Real-time optical refraction sampling behind-water framebuffer (koi + pebbles + caustics)
  const refractDistort = vec2(surfaceNormal.x, surfaceNormal.z.negate()).mul(0.032);
  const refrUV = clamp(screenUV.add(refractDistort), 0.002, 0.998);
  const refractedBg = viewportSharedTexture(refrUV).rgb;

  // 4. Depth-dependent Beer-Lambert absorption: luminous shallow mint (#7FB5A3) -> deeper jade (#3D8576)
  const normPos = vec2(
    positionWorld.x.div(NATURAL_POND_RX),
    positionWorld.z.div(NATURAL_POND_RZ),
  );
  const rho = clamp(length(normPos), 0.0, 1.0);
  const waterDepth = float(0.05).add(float(0.64).mul(float(1.0).sub(rho.mul(rho))));
  const absorption = exp(waterDepth.negate().mul(vec3(1.65, 0.38, 0.68)));
  const deepScatter = vec3(0.13, 0.39, 0.31).mul(float(1.0).sub(absorption)).mul(0.94);
  const submergedColor = refractedBg.mul(absorption).add(deepScatter);

  // 5. Planar real-time reflections + procedural morning canopy/sky environment fallback
  const reflVec = reflect(eyeDir.negate(), surfaceNormal);
  const envReflect = texture(textures.envEquirect, equirectUV(reflVec)).rgb;

  let reflectorTarget: THREE.Object3D | null = null;
  let reflectedSceneColor;

  if (usePlanarReflector) {
    const mirrorSampler = reflector({ resolutionScale: reflectionScale, bounces: false });
    if (mirrorSampler.uvNode) {
      mirrorSampler.uvNode = mirrorSampler.uvNode.add(surfaceNormal.xz.mul(0.055));
    }
    reflectorTarget = mirrorSampler.target;
    // Blend planar reflected sakura/bamboo/shrine over morning sky env wherever sky is open
    reflectedSceneColor = mix(envReflect, mirrorSampler.rgb, clamp(mirrorSampler.a, 0.0, 1.0));
  } else {
    reflectedSceneColor = envReflect;
  }

  // 6. Physical Schlick Fresnel: clear view down onto koi & bed stones, misty canopy reflection at glancing angles
  const ndotv = max(dot(surfaceNormal, eyeDir), 0.001);
  const rawFresnel = float(0.025).add(float(0.975).mul(pow(float(1.0).sub(ndotv), 4.6)));
  const fresnel = clamp(rawFresnel.mul(0.76), 0.03, 0.46);

  // 7. Morning sun specular glints + crisp concentric ripple catchlights
  const sunReflect = reflect(sunDir.negate(), surfaceNormal).normalize();
  const sunSpec = pow(max(dot(sunReflect, eyeDir), 0.0), 180.0)
    .mul(vec3(1.0, 0.96, 0.86))
    .mul(1.2);
  const crestHighlight = clamp(rippleCrest, 0.0, 1.0).mul(vec3(0.96, 0.95, 0.88)).mul(0.32);

  const combined = mix(submergedColor, reflectedSceneColor, fresnel).add(sunSpec).add(crestHighlight);
  mat.colorNode = combined;
  mat.opacityNode = float(0.985);

  return { material: mat, reflectorTarget };
}

export function createSunbeamMaterial(
  elapsedUniform: FloatUniform,
  opacityScale: FloatUniform,
): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  const uvCoord = uv();
  // Soft across shaft width (u: 0..1) and fading out cleanly well above the midground floor
  const across = sin(uvCoord.x.mul(Math.PI));
  const edgeFade = pow(clamp(across, 0.0, 1.0), 2.3);
  const alongFade = smoothstep(0.26, 0.62, uvCoord.y).mul(smoothstep(1.0, 0.74, uvCoord.y));
  const shimmer = float(0.85).add(
    sin(uvCoord.x.mul(8.0).add(elapsedUniform.mul(0.45))).mul(0.15),
  );

  mat.colorNode = vec3(1.0, 0.94, 0.78);
  mat.opacityNode = edgeFade.mul(alongFade).mul(shimmer).mul(opacityScale).mul(0.34);
  mat.transparent = true;
  mat.depthWrite = false;
  mat.blending = THREE.NormalBlending;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createMistSheetMaterial(
  elapsedUniform: FloatUniform,
  phaseOffset: number,
  baseOpacity = 0.18,
): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  const uvCoord = uv();
  const horiz = pow(clamp(sin(uvCoord.x.mul(Math.PI)), 0.0, 1.0), 1.5);
  // Keep lower edge above forest floor so mist drifts through distant bamboo trunks without washing out terrain
  const vert = smoothstep(0.16, 0.56, uvCoord.y).mul(smoothstep(1.0, 0.35, uvCoord.y));
  const drift = sin(
    uvCoord.x.mul(5.2).sub(elapsedUniform.mul(0.16)).add(phaseOffset),
  )
    .mul(0.22)
    .add(0.78);

  mat.colorNode = vec3(0.62, 0.69, 0.58);
  mat.opacityNode = horiz.mul(vert).mul(drift).mul(baseOpacity);
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createRippleRingMaterial(opacityUniform: FloatUniform): THREE.MeshBasicNodeMaterial {
  const mat = new THREE.MeshBasicNodeMaterial();
  mat.colorNode = color(PALETTE.paper);
  mat.opacityNode = opacityUniform;
  mat.transparent = true;
  mat.depthWrite = false;
  mat.side = THREE.DoubleSide;
  return mat;
}

export function createMatteNodeMaterial(
  hex: number,
  roughness = 0.85,
  metalness = 0.04,
  bumpTex?: THREE.Texture,
): THREE.MeshStandardNodeMaterial {
  const mat = new THREE.MeshStandardNodeMaterial({
    color: hex,
    roughness,
    metalness,
  });
  if (bumpTex) {
    mat.bumpMap = bumpTex;
    mat.bumpScale = 0.025;
  }
  return mat;
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/model.ts">
<![CDATA[export type PointXZ = { x: number; z: number };
export type FishPath = { a: number; b: number; speed: number; phase: number };
export type FishPose = PointXZ & { yaw: number };

export const POND_RX = 4.2;
export const POND_RZ = 3.0;
export const NATURAL_POND_RX = 2.92;
export const NATURAL_POND_RZ = 4.32;
export const POND_RIPPLE_DEFAULT_POINT: PointXZ = { x: 0.25, z: 0.55 };
export const RIPPLE_DURATION = 1.9;
export const RIPPLE_MIN_RADIUS = 0.04;
export const MAX_ACTIVE_RIPPLES = 4;
export const MAX_SHADER_RIPPLES = 12;

export const FISH_PATHS: readonly FishPath[] = [
  { a: 3.05, b: 2.0, speed: 0.18, phase: 0 },
  { a: 3.05, b: 2.0, speed: 0.18, phase: Math.PI },
  { a: 1.7, b: 1.0, speed: -0.24, phase: Math.PI / 2 },
  { a: 1.7, b: 1.0, speed: -0.24, phase: (3 * Math.PI) / 2 },
];

export function fishPose(path: FishPath, elapsed: number): FishPose {
  const safeElapsed = Number.isFinite(elapsed) ? elapsed : 0;
  const safeA = Number.isFinite(path.a) ? path.a : 0;
  const safeB = Number.isFinite(path.b) ? path.b : 0;
  const safeSpeed = Number.isFinite(path.speed) ? path.speed : 0;
  const safePhase = Number.isFinite(path.phase) ? path.phase : 0;

  const theta = safeSpeed * safeElapsed + safePhase;
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const x = safeA * cosTheta;
  const z = safeB * sinTheta;
  const vx = -safeA * safeSpeed * sinTheta;
  const vz = safeB * safeSpeed * cosTheta;

  const yaw = Math.atan2(-vz, vx);
  return { x, z, yaw };
}

export function isInsidePond(point: PointXZ, rx: number, rz: number): boolean {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.z) ||
    !Number.isFinite(rx) ||
    !Number.isFinite(rz) ||
    rx <= 0 ||
    rz <= 0
  ) {
    return false;
  }

  const nx = point.x / rx;
  const nz = point.z / rz;
  return nx * nx + nz * nz <= 1;
}

export function maxRippleRadius(point: PointXZ, rx: number, rz: number): number {
  if (!isInsidePond(point, rx, rz)) {
    return 0;
  }

  const nx = point.x / rx;
  const nz = point.z / rz;
  const rho = Math.sqrt(nx * nx + nz * nz);
  const allowed = 0.9 * Math.min(rx, rz) * (1 - rho);
  return Math.max(0, Math.min(0.8, allowed));
}

export function fishPolygonalExtents(
  pose: FishPose,
  halfLengthForward = 0.36,
  halfLengthBack = 0.44,
  halfWidth = 0.16,
): PointXZ[] {
  const cosY = Math.cos(-pose.yaw);
  const sinY = Math.sin(-pose.yaw);

  const localCorners: PointXZ[] = [
    { x: halfLengthForward, z: 0 },
    { x: halfLengthForward * 0.5, z: halfWidth },
    { x: halfLengthForward * 0.5, z: -halfWidth },
    { x: -halfLengthBack * 0.4, z: halfWidth * 0.85 },
    { x: -halfLengthBack * 0.4, z: -halfWidth * 0.85 },
    { x: -halfLengthBack, z: halfWidth * 0.55 },
    { x: -halfLengthBack, z: -halfWidth * 0.55 },
  ];

  return localCorners.map((pt) => ({
    x: pose.x + pt.x * cosY - pt.z * sinY,
    z: pose.z + pt.x * sinY + pt.z * cosY,
  }));
}

/**
 * Multi-harmonic asymmetrical stream-fed basin contour:
 * gently narrows toward the distant rear cove and widens smoothly into the lower-right foreground.
 */
export function pondContourScale(angle: number): number {
  const a = Number.isFinite(angle) ? angle : 0;
  return (
    1 +
    0.095 * Math.sin(a - 0.35) +
    0.072 * Math.sin(2 * a + 0.6) +
    0.045 * Math.cos(3 * a - 0.55) +
    0.025 * Math.sin(5 * a + 1.0)
  );
}

export function pondBoundaryPoint(angle: number, scaleOffset = 1): PointXZ {
  const s = pondContourScale(angle) * scaleOffset;
  return {
    x: Math.cos(angle) * NATURAL_POND_RX * s,
    z: Math.sin(angle) * NATURAL_POND_RZ * s,
  };
}

export function naturalPondNormalizedRadius(point: PointXZ): number {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) {
    return Number.POSITIVE_INFINITY;
  }
  const nx = point.x / NATURAL_POND_RX;
  const nz = point.z / NATURAL_POND_RZ;
  const angle = Math.atan2(nz, nx);
  const s = pondContourScale(angle);
  return Math.hypot(nx, nz) / s;
}

export function isInsideNaturalPond(point: PointXZ, margin = 0): boolean {
  const rho = naturalPondNormalizedRadius(point);
  if (!Number.isFinite(rho)) return false;
  const safeMargin = Number.isFinite(margin) ? margin : 0;
  const maxRho = Math.max(0.05, 1 - safeMargin / Math.min(NATURAL_POND_RX, NATURAL_POND_RZ));
  return rho <= maxRho;
}

export function pondBedElevation(x: number, z: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return -0.3;
  const rho = naturalPondNormalizedRadius({ x, z });
  if (rho >= 1.05) return 0.02;
  const clamped = Math.max(0, Math.min(1, rho));
  const shelf = 1 - clamped * clamped;
  // Clear shallow shelf near banks transitioning to a rich jade depth center
  const basinDepth = -0.09 - 0.58 * Math.pow(shelf, 1.32);
  const microContour = 0.024 * Math.sin(x * 1.2 + 0.5) * Math.cos(z * 1.15 - 0.4);
  return Math.min(-0.04, basinDepth + microContour);
}

// Right-shoreline ceramic tsukubai vessel on leveled bank terrace pouring westward into open pond water
export const WATERFALL_SOURCE_POINT: PointXZ = { x: 3.46, z: 0.54 };
export const WATERFALL_IMPACT_POINT: PointXZ = { x: 2.34, z: 0.48 };

export const SHRINE_CENTER: PointXZ = { x: -2.15, z: -7.15 };
export const SAKURA_CENTER: PointXZ = { x: 3.74, z: -1.16 };

/**
 * Stepping-stone winding path spine X(z) curving along the left mossy bank from foreground up to the shrine stairs.
 */
export function shrinePathCenterX(z: number): number {
  if (z >= 1.2) return -3.48 - (z - 1.2) * 0.13;
  if (z >= -2.5) return -3.12 - 0.36 * ((z + 2.5) / 3.7);
  const u = Math.max(0, Math.min(1, (-2.5 - z) / 3.45));
  const s = u * u * (3 - 2 * u);
  return -3.12 + 0.97 * s;
}

/**
 * Signed distance in approximate meters from the natural pond shoreline:
 * negative inside the pond, 0 at the shoreline contour, positive on surrounding garden land.
 */
export function signedDistanceToPond(point: PointXZ): number {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) return 0;
  const rho = naturalPondNormalizedRadius(point);
  const angle = Math.atan2(point.z / NATURAL_POND_RZ, point.x / NATURAL_POND_RX);
  const s = pondContourScale(angle);
  const radialScale = Math.hypot(
    Math.cos(angle) * NATURAL_POND_RX * s,
    Math.sin(angle) * NATURAL_POND_RZ * s,
  );
  return (rho - 1) * radialScale;
}

/**
 * Continuous world-scale garden terrain heightfield extending 55m+ in every direction.
 * Creates an irregular sunken pond basin, damp shoreline coves, raised moss banks,
 * shadowed left woodland rise, level stepping-stone trail, elevated mid-back shrine terrace,
 * leveled Tsukubai stone-vessel shelf, and subtle root-collar soil mounds under hero trees.
 */
export function terrainElevation(x: number, z: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return 0;
  const rho = naturalPondNormalizedRadius({ x, z });
  if (rho < 0.985) {
    return pondBedElevation(x, z);
  }

  // Gentle organic shoreline transition across rho in [0.985 .. 1.245] (~0.78m natural slope)
  const shoreT = Math.max(0, Math.min(1, (rho - 0.985) / 0.26));
  const bankBlend = shoreT * shoreT * (3 - 2 * shoreT);

  // Level corridor along the curving stepping-stone path from foreground up to shrine steps
  const pathX = shrinePathCenterX(z);
  const distToPath = Math.abs(x - pathX);
  const onPathZ = z <= 5.8 && z >= -7.4;
  const pathClearance = onPathZ ? Math.max(0, Math.min(1, (distToPath - 0.52) / 1.05)) : 1;

  // Raised level shrine terrace in upper-mid-left background
  const shrineDist = Math.hypot(x - SHRINE_CENTER.x, z - SHRINE_CENTER.z);
  const shrinePlateauBlend = Math.max(0, 1 - Math.max(0, (shrineDist - 1.65) / 2.9));
  const shrineRise = Math.max(0, Math.min(1, (-z - 2.3) / 4.3)) * 0.92;

  // Leveled right-bank shelf under the Tsukubai ceramic water pot blending softly toward sakura shoulder
  const tsukubaiDist = Math.hypot(x - WATERFALL_SOURCE_POINT.x, z - WATERFALL_SOURCE_POINT.z);
  const tsukubaiRaw = Math.max(0, 1 - Math.max(0, (tsukubaiDist - 0.65) / 1.45));
  const tsukubaiPlateauBlend = tsukubaiRaw * tsukubaiRaw * (3 - 2 * tsukubaiRaw);

  // Left woodland mossy rise (natural dark backdrop behind left editorial typography)
  const leftWoodlandRise =
    Math.exp(-((x + 5.7) * (x + 5.7) * 0.042 + (z + 0.4) * (z + 0.4) * 0.032)) * 1.12;

  // Sunlit mossy ridge behind right-center bank & sakura roots
  const rightMidRidge =
    Math.exp(-((x - 3.75) * (x - 3.75) * 0.068 + (z + 3.95) * (z + 3.95) * 0.055)) * 0.78;

  // Gentle right shoreline mossy knoll supporting ceramic water vessel & sakura trunk
  const rightBankRise =
    Math.exp(-((x - 3.72) * (x - 3.72) * 0.1 + (z + 0.85) * (z + 0.85) * 0.085)) * 0.28;

  // Gentle broad organic soil root-mounds under hero Sakura & Japanese Maple trunks
  const sakuraRootMound =
    Math.exp(-((x - SAKURA_CENTER.x) * (x - SAKURA_CENTER.x) * 0.65 + (z - SAKURA_CENTER.z) * (z - SAKURA_CENTER.z) * 0.65)) * 0.16;
  const mapleRootMound =
    Math.exp(-((x + 4.25) * (x + 4.25) * 0.95 + (z + 3.95) * (z + 3.95) * 0.95)) * 0.12;

  // Gentle organic garden mounds framing midground & far forest floor without sharp ridges
  const farBackdropRise =
    Math.max(0, Math.min(1, (-z - 6.8) / 9.5)) * 1.75 +
    Math.max(0, Math.min(1, (Math.hypot(x, z) - 9.5) / 16.0)) * 0.82;

  const fgLeftMound =
    Math.exp(-((x + 4.45) * (x + 4.45) * 0.14 + (z - 3.85) * (z - 3.85) * 0.14)) * 0.4;
  const fgRightMound =
    Math.exp(-((x - 2.85) * (x - 2.85) * 0.18 + (z - 3.65) * (z - 3.65) * 0.2)) * 0.3;
  const backLeftMound =
    Math.exp(-((x + 6.8) * (x + 6.8) * 0.06 + (z + 6.4) * (z + 6.4) * 0.06)) * 0.84;

  const microUndulation =
    (0.056 * Math.sin(x * 0.62 + 0.4) * Math.cos(z * 0.56 - 0.3) +
      0.028 * Math.sin(x * 1.25 - z * 0.95) +
      0.015 * Math.cos(x * 2.1 + z * 1.85)) *
    pathClearance *
    (1 - tsukubaiPlateauBlend * 0.85);

  const rawHeight =
    shrineRise +
    leftWoodlandRise * pathClearance +
    rightMidRidge +
    rightBankRise +
    sakuraRootMound +
    mapleRootMound +
    farBackdropRise * (1 - shrinePlateauBlend * 0.35) +
    fgLeftMound * pathClearance +
    fgRightMound +
    backLeftMound +
    microUndulation;

  // Blend smoothly to flat terrace level directly under the shrine pad and Tsukubai shelf
  const shrinePadHeight = 0.94;
  const tsukubaiPadHeight = 0.32;
  let blended =
    rawHeight * (1 - shrinePlateauBlend * 0.8) + shrinePadHeight * (shrinePlateauBlend * 0.8);
  blended =
    blended * (1 - tsukubaiPlateauBlend * 0.8) + tsukubaiPadHeight * (tsukubaiPlateauBlend * 0.8);

  const rimHeight = -0.02;
  const landHeight = Math.max(0.095, blended);
  return rimHeight * (1 - bankBlend) + landHeight * bankBlend;
}

export type TerrainBiome = 'shore' | 'moss' | 'forest' | 'path' | 'planted';

export interface GroundMaterialWeights {
  wetStone: number;
  moss: number;
  soil: number;
  gravel: number;
  forestLitter: number;
}

export interface TerrainSample {
  height: number;
  normal: { x: number; y: number; z: number };
  slope: number;
  shoreDistance: number;
  pathDistance: number;
  wetness: number;
  biome: TerrainBiome;
  weights: GroundMaterialWeights;
}

export function terrainNormalAt(x: number, z: number): { x: number; y: number; z: number } {
  const eps = 0.08;
  const hL = terrainElevation(x - eps, z);
  const hR = terrainElevation(x + eps, z);
  const hD = terrainElevation(x, z - eps);
  const hU = terrainElevation(x, z + eps);
  const nx = hL - hR;
  const ny = 2 * eps;
  const nz = hD - hU;
  const len = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / len, y: ny / len, z: nz / len };
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function getGroundMaterialWeights(point: PointXZ): GroundMaterialWeights {
  const shoreDist = signedDistanceToPond(point);
  const height = terrainElevation(point.x, point.z);
  const norm = terrainNormalAt(point.x, point.z);
  const slope = 1 - norm.y;

  const pathX = shrinePathCenterX(point.z);
  const distToPath = Math.abs(point.x - pathX);
  const onPathZ = point.z <= 5.2 && point.z >= -6.35;
  const pathMask = onPathZ ? clamp01(1 - (distToPath - 0.34) / 0.56) : 0;

  const shrineApron = clamp01(1 - (Math.hypot(point.x - SHRINE_CENTER.x, point.z - SHRINE_CENTER.z) - 1.35) / 1.15);
  const gravel = clamp01(Math.max(pathMask * 0.85, shrineApron * 0.72));

  const wetStone = clamp01(1 - (shoreDist + 0.08) / 0.55);

  const farWoodland = clamp01((-point.z - 5.2) / 6.5);
  const leftWoodland = clamp01((-point.x - 3.6) / 3.2);
  const forestLitter = clamp01(Math.max(farWoodland * 0.85, leftWoodland * 0.78)) * (1 - gravel * 0.75);

  const mossNoise =
    0.5 + 0.5 * (Math.sin(point.x * 1.15 + 0.4) * Math.cos(point.z * 0.95 - 0.3));
  const rawMoss =
    clamp01((height - 0.05) / 0.35) * (0.45 + mossNoise * 0.45) * (1 - gravel * 0.82) * (1 - wetStone * 0.7);
  const moss = clamp01(rawMoss * (1 - forestLitter * 0.48));
  const soil = clamp01(0.28 + slope * 1.8 + pathMask * 0.45 - moss * 0.32 - wetStone * 0.25);

  const sum = wetStone + moss + soil + gravel + forestLitter || 1;
  return {
    wetStone: wetStone / sum,
    moss: moss / sum,
    soil: soil / sum,
    gravel: gravel / sum,
    forestLitter: forestLitter / sum,
  };
}

export function sampleTerrain(point: PointXZ): TerrainSample {
  const height = terrainElevation(point.x, point.z);
  const normal = terrainNormalAt(point.x, point.z);
  const slope = Math.max(0, 1 - normal.y);
  const shoreDistance = signedDistanceToPond(point);
  const pathDistance =
    point.z <= 5.6 && point.z >= -6.6
      ? Math.abs(point.x - shrinePathCenterX(point.z))
      : Math.hypot(point.x - shrinePathCenterX(-6.0), point.z + 6.0);

  const wetness = clamp01(1 - shoreDistance / 0.65);
  const weights = getGroundMaterialWeights(point);

  let biome: TerrainBiome = 'moss';
  if (shoreDistance < 0.24) {
    biome = 'shore';
  } else if (pathDistance < 0.72 && point.z <= 5.2 && point.z >= -6.4) {
    biome = 'path';
  } else if (shoreDistance < 0.42) {
    biome = 'shore';
  } else if (point.z < -5.8 || point.x < -4.2) {
    biome = 'forest';
  } else if (weights.moss >= 0.34) {
    biome = 'moss';
  } else {
    biome = 'planted';
  }

  return {
    height,
    normal,
    slope,
    shoreDistance,
    pathDistance,
    wetness,
    biome,
    weights,
  };
}

export const HERO_INTRO_DURATION = 4.4;

export function introAtmosphereFactor(introElapsed: number): number {
  if (!Number.isFinite(introElapsed) || introElapsed <= 0) return 0.46;
  const t = Math.max(0, Math.min(1, introElapsed / HERO_INTRO_DURATION));
  const eased = 1 - Math.pow(1 - t, 2.2);
  return 0.46 + 0.54 * eased;
}

export interface IntroCameraState {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov: number;
  progress: number;
}

/**
 * Cinematic perspective garden camera with 4.4-second first-visit arrival choreography:
 * begins slightly tucked back & higher behind shadowed foreground moss/branches,
 * then smoothly dollies and tilts forward into the human-vantage composition looking
 * across the pond toward the mid-back shrine, right sakura canopy, and bamboo forest.
 */
export function introCameraState(introElapsed: number, aspect: number): IntroCameraState {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.3 ? aspect : 1.6;
  const t = Number.isFinite(introElapsed)
    ? Math.max(0, Math.min(1, introElapsed / HERO_INTRO_DURATION))
    : 1;
  // Quintic-inspired smooth arrival without snapping
  const eased = 1 - Math.pow(1 - t, 3.0);

  // Smooth responsiveness across desktop (1440+), tablet (768), and mobile (390/320)
  const wideWeight = Math.max(0, Math.min(1, (safeAspect - 0.82) / 0.58));
  const narrowPullback = safeAspect < 1.05 ? Math.min(1.85, (1.05 - safeAspect) * 2.4) : 0;

  // Desktop shifts aim gently left so pond occupies center & lower-right while left stays dark forest
  const endLookX = -0.88 * wideWeight + 0.12 * (1 - wideWeight);
  const endLookY = 0.76 - 0.14 * (1 - wideWeight);
  const endLookZ = -2.15 + 0.35 * (1 - wideWeight);

  const endPosX = -1.98 * wideWeight - 0.35 * (1 - wideWeight);
  const endPosY = 2.58 + narrowPullback * 0.42;
  const endPosZ = 7.12 + narrowPullback * 0.95;

  const endFov = safeAspect < 0.9 ? 47 : 44;

  // Start slightly farther back, subtly higher, and angled slightly more into the forest canopy
  const startOffsetX = -0.45 * wideWeight;
  const startOffsetY = 0.82;
  const startOffsetZ = 1.65;

  const inv = 1 - eased;
  return {
    position: {
      x: endPosX + startOffsetX * inv,
      y: endPosY + startOffsetY * inv,
      z: endPosZ + startOffsetZ * inv,
    },
    lookAt: {
      x: endLookX - 0.32 * wideWeight * inv,
      y: endLookY + 0.42 * inv,
      z: endLookZ - 0.85 * inv,
    },
    fov: endFov + 2.5 * inv,
    progress: eased,
  };
}

export interface SubmergedObstacle {
  x: number;
  z: number;
  r: number;
}

export interface FoodPellet {
  id: number;
  x: number;
  z: number;
  createdAt: number;
  eaten: boolean;
}

export interface WaterDisturbance {
  x: number;
  z: number;
  createdAt: number;
  strength: number;
}

export interface KoiAgent {
  id: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  roll: number;
  speed: number;
  baseSpeed: number;
  preferredDepth: number;
  orbitAngle: number;
  orbitRadiusScale: number;
  orbitSpeed: number;
  wakeCooldown: number;
  shyTimer: number;
  shyDirX: number;
  shyDirZ: number;
}

export interface KoiStepResult {
  consumedPelletIds: number[];
  wakeRipples: Array<{ x: number; z: number; strength: number }>;
  feedingRipples: Array<{ x: number; z: number; strength: number }>;
}

function wrapAngle(rad: number): number {
  let a = rad;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

export function createKoiAgents(): KoiAgent[] {
  const specs: Array<{
    id: number;
    angle: number;
    radiusScale: number;
    orbitSpeed: number;
    baseSpeed: number;
    depth: number;
  }> = [
    { id: 0, angle: 0.35, radiusScale: 0.62, orbitSpeed: 0.19, baseSpeed: 0.72, depth: -0.105 },
    { id: 1, angle: Math.PI + 0.35, radiusScale: 0.6, orbitSpeed: 0.175, baseSpeed: 0.66, depth: -0.165 },
    { id: 2, angle: Math.PI * 0.65, radiusScale: 0.4, orbitSpeed: -0.24, baseSpeed: 0.61, depth: -0.22 },
    { id: 3, angle: Math.PI * 1.55, radiusScale: 0.44, orbitSpeed: -0.22, baseSpeed: 0.58, depth: -0.135 },
  ];

  return specs.map((spec) => {
    const pt = pondBoundaryPoint(spec.angle, spec.radiusScale);
    const nextPt = pondBoundaryPoint(spec.angle + spec.orbitSpeed * 0.1, spec.radiusScale);
    const yaw = Math.atan2(-(nextPt.z - pt.z), nextPt.x - pt.x);
    return {
      id: spec.id,
      x: pt.x,
      y: spec.depth,
      z: pt.z,
      yaw,
      pitch: 0,
      roll: 0,
      speed: spec.baseSpeed,
      baseSpeed: spec.baseSpeed,
      preferredDepth: spec.depth,
      orbitAngle: spec.angle,
      orbitRadiusScale: spec.radiusScale,
      orbitSpeed: spec.orbitSpeed,
      wakeCooldown: 0.4 + spec.id * 0.55,
      shyTimer: 0,
      shyDirX: 0,
      shyDirZ: 0,
    };
  });
}

export function stepKoiAgents(
  agents: KoiAgent[],
  dt: number,
  elapsed: number,
  pellets: readonly FoodPellet[],
  disturbances: readonly WaterDisturbance[],
  obstacles: readonly SubmergedObstacle[],
): KoiStepResult {
  const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, 0.08) : 0;
  const result: KoiStepResult = {
    consumedPelletIds: [],
    wakeRipples: [],
    feedingRipples: [],
  };
  if (safeDt <= 0) return result;

  for (const dist of disturbances) {
    if (elapsed - dist.createdAt <= 0.12) {
      for (const agent of agents) {
        const dx = agent.x - dist.x;
        const dz = agent.z - dist.z;
        const d = Math.hypot(dx, dz);
        if (d < 2.2 && d > 1e-4) {
          agent.shyTimer = 1.35 * Math.min(1, dist.strength);
          agent.shyDirX = dx / d;
          agent.shyDirZ = dz / d;
        }
      }
    }
  }

  const activePellets = pellets.filter((p) => !p.eaten && isInsideNaturalPond(p, 0.25));

  for (let i = 0; i < agents.length; i++) {
    const koi = agents[i];
    koi.orbitAngle += koi.orbitSpeed * safeDt;
    koi.wakeCooldown = Math.max(0, koi.wakeCooldown - safeDt);
    koi.shyTimer = Math.max(0, koi.shyTimer - safeDt);

    const wanderMod = 0.07 * Math.sin(elapsed * 0.42 + koi.id * 1.9);
    const lookAheadAngle = koi.orbitAngle + (koi.orbitSpeed >= 0 ? 0.34 : -0.34);
    const patrolTarget = pondBoundaryPoint(
      lookAheadAngle,
      Math.max(0.26, Math.min(0.76, koi.orbitRadiusScale + wanderMod)),
    );

    let targetX = patrolTarget.x;
    let targetZ = patrolTarget.z;
    let desiredDepth = koi.preferredDepth + 0.036 * Math.sin(elapsed * 0.55 + koi.id * 2.1);
    let desiredSpeed = koi.baseSpeed * (0.94 + 0.12 * Math.sin(elapsed * 0.7 + koi.id));

    let seekingPellet: FoodPellet | null = null;
    let bestPelletDist = 5.6;
    for (const pellet of activePellets) {
      const d = Math.hypot(pellet.x - koi.x, pellet.z - koi.z);
      const biased = d + ((koi.id + pellet.id) % 2) * 0.32;
      if (biased < bestPelletDist) {
        bestPelletDist = biased;
        seekingPellet = pellet;
      }
    }

    if (seekingPellet) {
      const actualDist = Math.hypot(seekingPellet.x - koi.x, seekingPellet.z - koi.z);
      if (actualDist < 0.24) {
        if (!result.consumedPelletIds.includes(seekingPellet.id)) {
          result.consumedPelletIds.push(seekingPellet.id);
          result.feedingRipples.push({
            x: seekingPellet.x,
            z: seekingPellet.z,
            strength: 0.72,
          });
        }
      } else {
        targetX = seekingPellet.x;
        targetZ = seekingPellet.z;
        desiredDepth = -0.076;
        desiredSpeed = koi.baseSpeed * 1.42;
      }
    }

    let dirX = targetX - koi.x;
    let dirZ = targetZ - koi.z;
    const targetLen = Math.hypot(dirX, dirZ) || 1;
    dirX /= targetLen;
    dirZ /= targetLen;

    if (koi.shyTimer > 0) {
      const shyWeight = Math.min(0.65, koi.shyTimer * 0.48);
      dirX = dirX * (1 - shyWeight) + koi.shyDirX * shyWeight;
      dirZ = dirZ * (1 - shyWeight) + koi.shyDirZ * shyWeight;
      desiredDepth = Math.min(desiredDepth, -0.22);
      desiredSpeed *= 1.24;
    }

    for (let j = 0; j < agents.length; j++) {
      if (i === j) continue;
      const other = agents[j];
      const sepX = koi.x - other.x;
      const sepZ = koi.z - other.z;
      const dist = Math.hypot(sepX, sepZ);
      const minSep = 0.88;
      if (dist < minSep && dist > 1e-4) {
        const push = ((minSep - dist) / minSep) * 1.65;
        dirX += (sepX / dist) * push;
        dirZ += (sepZ / dist) * push;
        desiredDepth += koi.id < other.id ? 0.03 : -0.03;
      }
    }

    for (const obs of obstacles) {
      const ox = koi.x - obs.x;
      const oz = koi.z - obs.z;
      const od = Math.hypot(ox, oz);
      const safeR = obs.r + 0.36;
      if (od < safeR && od > 1e-4) {
        const push = ((safeR - od) / safeR) * 2.1;
        dirX += (ox / od) * push;
        dirZ += (oz / od) * push;
      }
    }

    const rho = naturalPondNormalizedRadius({ x: koi.x, z: koi.z });
    if (rho > 0.72) {
      const inwardLen = Math.hypot(koi.x, koi.z) || 1;
      const wallWeight = Math.min(3.5, (rho - 0.72) * 11.5);
      dirX += (-koi.x / inwardLen) * wallWeight;
      dirZ += (-koi.z / inwardLen) * wallWeight;
    }

    const desiredYaw = Math.atan2(-dirZ, dirX);
    const yawDiff = wrapAngle(desiredYaw - koi.yaw);
    const maxTurn = (seekingPellet ? 2.15 : 1.55) * safeDt;
    const appliedTurn = Math.max(-maxTurn, Math.min(maxTurn, yawDiff));
    koi.yaw = wrapAngle(koi.yaw + appliedTurn);

    const speedBlend = 1 - Math.exp(-3.2 * safeDt);
    koi.speed += (desiredSpeed - koi.speed) * speedBlend;
    const turnRate = appliedTurn / safeDt;
    const targetRoll = Math.max(-0.22, Math.min(0.22, turnRate * 0.14));
    koi.roll += (targetRoll - koi.roll) * (1 - Math.exp(-6.0 * safeDt));

    const headingX = Math.cos(-koi.yaw);
    const headingZ = Math.sin(-koi.yaw);
    let nextX = koi.x + headingX * koi.speed * safeDt;
    let nextZ = koi.z + headingZ * koi.speed * safeDt;

    const nextRho = naturalPondNormalizedRadius({ x: nextX, z: nextZ });
    if (nextRho > 0.84) {
      const pull = 0.84 / nextRho;
      nextX *= pull;
      nextZ *= pull;
    }
    koi.x = nextX;
    koi.z = nextZ;

    const bedY = pondBedElevation(koi.x, koi.z);
    const minY = Math.min(-0.1, bedY + 0.11);
    const maxY = -0.068;
    const clampedTargetY = Math.max(minY, Math.min(maxY, desiredDepth));
    const prevY = koi.y;
    koi.y += (clampedTargetY - koi.y) * (1 - Math.exp(-2.8 * safeDt));
    koi.y = Math.max(minY, Math.min(maxY, koi.y));

    const vy = (koi.y - prevY) / safeDt;
    const targetPitch = Math.max(-0.24, Math.min(0.24, vy * 0.7));
    koi.pitch += (targetPitch - koi.pitch) * (1 - Math.exp(-5.0 * safeDt));

    if (koi.y > -0.12 && koi.wakeCooldown <= 0) {
      result.wakeRipples.push({
        x: koi.x + headingX * 0.18,
        z: koi.z + headingZ * 0.18,
        strength: 0.28,
      });
      koi.wakeCooldown = 1.35 + (koi.id % 3) * 0.35;
    }
  }

  return result;
}

export function dampCameraParallax(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
  dt: number,
): { x: number; y: number } {
  const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, 0.1) : 0;
  const clampedTargetX = Math.max(-1, Math.min(1, Number.isFinite(targetX) ? targetX : 0));
  const clampedTargetY = Math.max(-1, Math.min(1, Number.isFinite(targetY) ? targetY : 0));
  const blend = 1 - Math.exp(-5.0 * safeDt);
  return {
    x: currentX + (clampedTargetX - currentX) * blend,
    y: currentY + (clampedTargetY - currentY) * blend,
  };
}

export class PondClock {
  private _elapsed = 0;
  private _userPaused = false;
  private _visibilityPaused = false;

  get elapsed(): number {
    return this._elapsed;
  }

  get userPaused(): boolean {
    return this._userPaused;
  }

  get visibilityPaused(): boolean {
    return this._visibilityPaused;
  }

  get isAdvancing(): boolean {
    return !this._userPaused && !this._visibilityPaused;
  }

  pause(): void {
    this._userPaused = true;
  }

  resume(): void {
    this._userPaused = false;
  }

  setVisibilityPaused(hidden: boolean): void {
    this._visibilityPaused = Boolean(hidden);
  }

  step(deltaSeconds: number): number {
    if (!this.isAdvancing) {
      return this._elapsed;
    }
    const safeDelta = Number.isFinite(deltaSeconds) && deltaSeconds > 0 ? Math.min(deltaSeconds, 0.25) : 0;
    this._elapsed += safeDelta;
    return this._elapsed;
  }

  reset(): void {
    this._elapsed = 0;
    this._userPaused = false;
    this._visibilityPaused = false;
  }
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/placement.ts">
<![CDATA[export type FootprintKind =
  | 'rock'
  | 'cobble'
  | 'tree'
  | 'waterFeature'
  | 'shrine'
  | 'stepStone'
  | 'stream'
  | 'pebbleBeach'
  | 'moss'
  | 'negativeSpace';

export interface ExclusionFootprint {
  id?: string;
  kind: FootprintKind;
  x: number;
  z: number;
  rx: number;
  rz: number;
  yaw?: number;
  margin?: number;
  baseY?: number;
  topY?: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface VegetationValidationInput {
  x: number;
  z: number;
  clearance?: number;
  shoreDistance: number;
  slope: number;
  minShoreDistance?: number;
  maxShoreDistance?: number;
  maxSlope?: number;
  ignoreKinds?: ReadonlySet<FootprintKind>;
}

export function pointInRotatedEllipse(
  px: number,
  pz: number,
  fp: Pick<ExclusionFootprint, 'x' | 'z' | 'rx' | 'rz' | 'yaw' | 'margin'>,
  extraClearance = 0,
): boolean {
  if (!Number.isFinite(px) || !Number.isFinite(pz)) return true;
  const dx = px - fp.x;
  const dz = pz - fp.z;
  const yaw = fp.yaw ?? 0;
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);

  // Transform world offset into footprint local space (inverse of Three.js Y rotation)
  const lx = dx * cosY - dz * sinY;
  const lz = dx * sinY + dz * cosY;

  const pad = (fp.margin ?? 0) + extraClearance;
  const ex = Math.max(0.01, fp.rx + pad);
  const ez = Math.max(0.01, fp.rz + pad);

  const nx = lx / ex;
  const nz = lz / ez;
  return nx * nx + nz * nz <= 1;
}

export function rotatedEllipseAabb(
  fp: Pick<ExclusionFootprint, 'x' | 'z' | 'rx' | 'rz' | 'yaw' | 'margin'>,
): { minX: number; maxX: number; minZ: number; maxZ: number } {
  const pad = fp.margin ?? 0;
  const ex = Math.max(0.01, fp.rx + pad);
  const ez = Math.max(0.01, fp.rz + pad);
  const yaw = fp.yaw ?? 0;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const halfX = Math.hypot(ex * c, ez * s);
  const halfZ = Math.hypot(ex * s, ez * c);
  return {
    minX: fp.x - halfX,
    maxX: fp.x + halfX,
    minZ: fp.z - halfZ,
    maxZ: fp.z + halfZ,
  };
}

export class PlacementRegistry {
  private readonly cellSize: number;
  private readonly footprints: ExclusionFootprint[] = [];
  private readonly grid = new Map<string, number[]>();
  private maxHalfExtent = 0;

  constructor(cellSize = 1.25) {
    this.cellSize = Math.max(0.25, cellSize);
  }

  get count(): number {
    return this.footprints.length;
  }

  private cellCoord(v: number): number {
    return Math.floor(v / this.cellSize);
  }

  private cellKey(cx: number, cz: number): string {
    return `${cx},${cz}`;
  }

  register(fp: ExclusionFootprint): number {
    if (
      !Number.isFinite(fp.x) ||
      !Number.isFinite(fp.z) ||
      !Number.isFinite(fp.rx) ||
      !Number.isFinite(fp.rz)
    ) {
      return -1;
    }
    const idx = this.footprints.length;
    this.footprints.push(fp);

    const aabb = rotatedEllipseAabb(fp);
    const halfX = (aabb.maxX - aabb.minX) * 0.5;
    const halfZ = (aabb.maxZ - aabb.minZ) * 0.5;
    this.maxHalfExtent = Math.max(this.maxHalfExtent, halfX, halfZ);

    const minCx = this.cellCoord(aabb.minX);
    const maxCx = this.cellCoord(aabb.maxX);
    const minCz = this.cellCoord(aabb.minZ);
    const maxCz = this.cellCoord(aabb.maxZ);

    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cz = minCz; cz <= maxCz; cz++) {
        const key = this.cellKey(cx, cz);
        let bucket = this.grid.get(key);
        if (!bucket) {
          bucket = [];
          this.grid.set(key, bucket);
        }
        bucket.push(idx);
      }
    }
    return idx;
  }

  registerCapsule(
    kind: FootprintKind,
    ax: number,
    az: number,
    bx: number,
    bz: number,
    radius: number,
    margin = 0,
    topY?: number,
    id?: string,
  ): number {
    const cx = (ax + bx) * 0.5;
    const cz = (az + bz) * 0.5;
    const dx = bx - ax;
    const dz = bz - az;
    const halfLen = Math.hypot(dx, dz) * 0.5;
    const yaw = -Math.atan2(dz, dx);
    return this.register({
      id,
      kind,
      x: cx,
      z: cz,
      rx: halfLen + radius,
      rz: radius,
      yaw,
      margin,
      topY,
    });
  }

  getFootprints(kinds?: ReadonlySet<FootprintKind>): ExclusionFootprint[] {
    if (!kinds) return [...this.footprints];
    return this.footprints.filter((fp) => kinds.has(fp.kind));
  }

  isExcluded(
    x: number,
    z: number,
    clearance = 0,
    ignoreKinds?: ReadonlySet<FootprintKind>,
  ): boolean {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return true;
    const safeClearance = Math.max(0, Number.isFinite(clearance) ? clearance : 0);
    const minCx = this.cellCoord(x - safeClearance);
    const maxCx = this.cellCoord(x + safeClearance);
    const minCz = this.cellCoord(z - safeClearance);
    const maxCz = this.cellCoord(z + safeClearance);

    const seen = new Set<number>();
    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cz = minCz; cz <= maxCz; cz++) {
        const bucket = this.grid.get(this.cellKey(cx, cz));
        if (!bucket) continue;
        for (let k = 0; k < bucket.length; k++) {
          const idx = bucket[k];
          if (seen.has(idx)) continue;
          seen.add(idx);
          const fp = this.footprints[idx];
          if (ignoreKinds && ignoreKinds.has(fp.kind)) continue;
          if (pointInRotatedEllipse(x, z, fp, safeClearance)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isVegetationValid(input: VegetationValidationInput): boolean {
    if (!Number.isFinite(input.x) || !Number.isFinite(input.z)) return false;
    if (!Number.isFinite(input.shoreDistance) || !Number.isFinite(input.slope)) return false;

    const minShore = input.minShoreDistance ?? 0.14;
    if (input.shoreDistance < minShore) return false;
    if (input.maxShoreDistance !== undefined && input.shoreDistance > input.maxShoreDistance) {
      return false;
    }

    const maxSlope = input.maxSlope ?? 0.34;
    if (input.slope > maxSlope) return false;

    return !this.isExcluded(input.x, input.z, input.clearance ?? 0.08, input.ignoreKinds);
  }
}

export interface StreamTrajectoryParams {
  source: Point3D;
  target: Point3D;
  obstacles: readonly ExclusionFootprint[];
  terrainHeightFn: (x: number, z: number) => number;
  isInsideWaterFn: (pt: { x: number; z: number }, margin?: number) => boolean;
  streamRadius?: number;
  samples?: number;
}

export interface StreamTrajectoryResult {
  controlPoints: [Point3D, Point3D, Point3D, Point3D];
  landing: Point3D;
  sampledPoints: Point3D[];
  clearedAll: boolean;
  minTerrainClearance: number;
  minObstacleClearance: number;
}

function evalCubicBezier(
  p0: Point3D,
  p1: Point3D,
  p2: Point3D,
  p3: Point3D,
  t: number,
): Point3D {
  const u = 1 - t;
  const uu = u * u;
  const tt = t * t;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    z: uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z,
  };
}

export function computeCollisionFreeStreamTrajectory(
  params: StreamTrajectoryParams,
): StreamTrajectoryResult {
  const streamRadius = params.streamRadius ?? 0.025;
  const samples = Math.max(16, params.samples ?? 24);
  const { source, target, obstacles, terrainHeightFn, isInsideWaterFn } = params;

  // Ignore obstacles very close to source (pot pedestal & flanking rocks behind exit lip)
  const forwardDx = target.x - source.x;
  const forwardDz = target.z - source.z;
  const forwardLen = Math.hypot(forwardDx, forwardDz) || 1;
  const dirX = forwardDx / forwardLen;
  const dirZ = forwardDz / forwardLen;

  const relevantObstacles = obstacles.filter((obs) => {
    if (obs.kind !== 'rock' && obs.kind !== 'cobble' && obs.kind !== 'waterFeature') {
      return false;
    }
    const along = (obs.x - source.x) * dirX + (obs.z - source.z) * dirZ;
    // Ignore features behind or directly supporting the pot's rear collar
    return along > 0.24;
  });

  // Ensure landing sits cleanly in open water clear of submerged/shore rocks
  const landing: Point3D = { ...target };
  const landingBlocked = (lx: number, lz: number) => {
    if (!isInsideWaterFn({ x: lx, z: lz }, 0.22)) return true;
    for (const obs of relevantObstacles) {
      if (pointInRotatedEllipse(lx, lz, obs, streamRadius + 0.16)) {
        return true;
      }
    }
    return false;
  };

  if (landingBlocked(landing.x, landing.z)) {
    const candidateShifts = [0.18, 0.36, 0.54, 0.72];
    const lateralShifts = [0, 0.22, -0.22, 0.42, -0.42];
    const perpX = -dirZ;
    const perpZ = dirX;
    let found = false;
    for (const fwd of candidateShifts) {
      for (const lat of lateralShifts) {
        const cx = target.x + dirX * fwd + perpX * lat;
        const cz = target.z + dirZ * fwd + perpZ * lat;
        if (!landingBlocked(cx, cz)) {
          landing.x = cx;
          landing.z = cz;
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }

  const evaluateProfile = (archBoost: number, reachBias: number): StreamTrajectoryResult => {
    const p0: Point3D = { ...source };
    const p3: Point3D = { ...landing };
    const spanX = p3.x - p0.x;
    const spanZ = p3.z - p0.z;

    const p1: Point3D = {
      x: p0.x + spanX * (0.36 + reachBias),
      y: p0.y - 0.03 + archBoost,
      z: p0.z + spanZ * (0.36 + reachBias),
    };
    const p2: Point3D = {
      x: p0.x + spanX * (0.78 + reachBias * 0.4),
      y: p3.y + (p0.y - p3.y) * 0.38 + archBoost * 0.75,
      z: p0.z + spanZ * (0.78 + reachBias * 0.4),
    };

    const sampledPoints: Point3D[] = [];
    let minTerrainClearance = Number.POSITIVE_INFINITY;
    let minObstacleClearance = Number.POSITIVE_INFINITY;
    let clearedAll = true;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const pt = evalCubicBezier(p0, p1, p2, p3, t);
      sampledPoints.push(pt);

      // Skip source lip exit and final water entry immersion window
      if (t >= 0.1 && t <= 0.94) {
        const groundY = terrainHeightFn(pt.x, pt.z);
        const terrainGap = pt.y - streamRadius - groundY;
        minTerrainClearance = Math.min(minTerrainClearance, terrainGap);
        if (terrainGap < 0.045) {
          clearedAll = false;
        }

        for (const obs of relevantObstacles) {
          if (pointInRotatedEllipse(pt.x, pt.z, obs, streamRadius + 0.04)) {
            const obsTop = obs.topY ?? groundY + 0.18;
            const obsGap = pt.y - streamRadius - obsTop;
            minObstacleClearance = Math.min(minObstacleClearance, obsGap);
            if (obsGap < 0.035) {
              clearedAll = false;
            }
          }
        }
      }
    }

    if (!Number.isFinite(minTerrainClearance)) minTerrainClearance = 0.25;
    if (!Number.isFinite(minObstacleClearance)) minObstacleClearance = 0.5;

    return {
      controlPoints: [p0, p1, p2, p3],
      landing,
      sampledPoints,
      clearedAll,
      minTerrainClearance,
      minObstacleClearance,
    };
  };

  const profiles: Array<[number, number]> = [
    [0.02, 0.0],
    [0.08, 0.04],
    [0.14, 0.08],
    [0.22, 0.12],
    [0.32, 0.14],
  ];

  let best = evaluateProfile(profiles[0][0], profiles[0][1]);
  if (best.clearedAll) return best;

  for (let i = 1; i < profiles.length; i++) {
    const candidate = evaluateProfile(profiles[i][0], profiles[i][1]);
    if (candidate.clearedAll) return candidate;
    if (
      Math.min(candidate.minTerrainClearance, candidate.minObstacleClearance) >
      Math.min(best.minTerrainClearance, best.minObstacleClearance)
    ) {
      best = candidate;
    }
  }
  return best;
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/scene.ts">
<![CDATA[import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  HERO_INTRO_DURATION,
  POND_RIPPLE_DEFAULT_POINT,
  PondClock,
  WATERFALL_IMPACT_POINT,
  createKoiAgents,
  dampCameraParallax,
  introAtmosphereFactor,
  introCameraState,
  isInsideNaturalPond,
  pondBedElevation,
  stepKoiAgents,
  type FoodPellet,
  type WaterDisturbance,
} from './model';
import { KoiVariant } from './materials';
import { KoiActor, createKoiActor } from './fish';
import { SUBMERGED_OBSTACLES, createPondWaterRig } from './water';
import { createGardenEnvironment } from './garden';
import { PondQuality, createPondTextureSuite } from './textures';

export interface PondRendererLike {
  domElement: HTMLCanvasElement;
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
  shadowMap: { enabled: boolean; type: THREE.ShadowMapType };
  onDeviceLost: (info: { api: string; message: string; reason: string | null; originalEvent: unknown }) => void;
  backend?: { gl?: WebGL2RenderingContext };
  init: () => Promise<unknown>;
  getMaxAnisotropy?: () => number;
  setPixelRatio: (ratio: number) => void;
  setSize: (w: number, h: number, updateStyle?: boolean) => void;
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
  setAnimationLoop: (cb: (() => void) | null) => void;
  dispose: () => Promise<void> | void;
}

export interface PondSceneOptions {
  isMobile: boolean;
  isDisposed: () => boolean;
  onFirstFrame: () => void;
  onDeviceLostOrError: (reason: string) => void;
  onRippleAdded?: () => void;
  onPelletAdded?: () => void;
  createRenderer?: (forceWebGL: boolean, antialias: boolean) => PondRendererLike;
}

export interface PondSceneController {
  setPaused: (paused: boolean) => void;
  setViewportActive: (active: boolean) => void;
  feedKoi: () => void;
  triggerRipple: () => void;
  setJourneyActive: (active: boolean) => void;
  destroy: () => void;
}

function detectSoftwareGl(): boolean {
  try {
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2') || probe.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

function retireFailedRenderer(renderer: PondRendererLike | null): void {
  if (!renderer) return;
  try {
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    const gl = renderer.backend?.gl;
    if (gl && typeof gl.getExtension === 'function') {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch {
    // Best-effort cleanup on an uninitialized renderer
  }
}

export async function createPondScene(
  container: HTMLElement,
  options: PondSceneOptions,
): Promise<PondSceneController | null> {
  if (options.isDisposed()) return null;

  const isSoftwareGl = detectSoftwareGl();
  const quality: PondQuality = options.isMobile || isSoftwareGl ? 'mobile' : 'desktop';

  const makeRenderer =
    options.createRenderer ??
    ((forceWebGL: boolean, antialias: boolean) =>
      new THREE.WebGPURenderer({
        antialias,
        forceWebGL,
        alpha: true,
      }) as unknown as PondRendererLike);

  let renderer: PondRendererLike | null = null;
  let initialized = false;

  const tryInit = async (forceWebGL: boolean): Promise<PondRendererLike | null> => {
    const candidate = makeRenderer(forceWebGL, !isSoftwareGl);
    try {
      await candidate.init();
      return candidate;
    } catch {
      retireFailedRenderer(candidate);
      return null;
    }
  };

  renderer = await tryInit(false);
  if (options.isDisposed()) {
    if (renderer) {
      try {
        await renderer.dispose();
      } catch {
        retireFailedRenderer(renderer);
      }
    }
    return null;
  }

  if (!renderer) {
    renderer = await tryInit(true);
    if (options.isDisposed()) {
      if (renderer) {
        try {
          await renderer.dispose();
        } catch {
          retireFailedRenderer(renderer);
        }
      }
      return null;
    }
  }

  if (!renderer) {
    options.onDeviceLostOrError('Graphics initialization failed');
    return null;
  }

  initialized = true;
  let destroyed = false;
  let frameId = 0;
  let timeoutId = 0;
  let firstFrameDone = false;
  let viewportActive = true;

  const clock = new PondClock();
  const elapsedUniform = uniform(0);

  // Configure renderer with restrained ACES Filmic exposure
  const maxDpr = isSoftwareGl ? 1 : options.isMobile ? 1.25 : 1.75;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const width = Math.max(container.clientWidth || 640, 280);
  const height = Math.max(container.clientHeight || 480, 240);
  renderer.setSize(width, height, false);

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.tabIndex = -1;

  // Device loss forwarding
  const origOnDeviceLost = renderer.onDeviceLost;
  renderer.onDeviceLost = (info) => {
    if (typeof origOnDeviceLost === 'function') {
      origOnDeviceLost.call(renderer, info);
    }
    if (!destroyed) {
      cleanupGraphics();
      options.onDeviceLostOrError(info?.message || 'Graphics device lost');
    }
  };

  // Scene deep woodland sage background matching horizon fog seamlessly
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x243424);
  scene.fog = new THREE.FogExp2(0x283a28, 0.022);

  const maxAniso =
    typeof renderer.getMaxAnisotropy === 'function' ? renderer.getMaxAnisotropy() : 4;
  const textures = createPondTextureSuite(quality, maxAniso);

  // Authentic misty morning bamboo & sakura canopy environment lighting
  let envTex: THREE.Texture | null = null;
  try {
    const pmrem = new THREE.PMREMGenerator(renderer as unknown as THREE.WebGPURenderer);
    envTex = pmrem.fromEquirectangular(textures.envEquirect).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.58;
    pmrem.dispose();
  } catch {
    // Fallback cleanly if PMREM is unavailable on a constrained driver
  }

  // Human-vantage Perspective camera looking into continuous woodland garden
  const camera = new THREE.PerspectiveCamera(44, width / Math.max(height, 1), 0.15, 180);

  let viewportAspect = Math.max(width / Math.max(height, 1), 0.5);
  let parallaxTargetX = 0;
  let parallaxTargetY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  let journeyActive = false;
  let journeyBlend = 0;
  let journeyYawOffset = 0;
  let journeyPitchOffset = 0;

  // Early-morning sunlight rig: warm sun diagonal from upper-right + forest sky/moss fill
  const sunPos = new THREE.Vector3(11.5, 11.0, -5.5);
  const sunDirection = sunPos.clone().normalize();
  const keyLight = new THREE.DirectionalLight(0xffecc9, 2.2);
  keyLight.position.copy(sunPos);
  keyLight.castShadow = !isSoftwareGl;
  const shadowSize = quality === 'desktop' ? 2048 : 1024;
  keyLight.shadow.mapSize.set(shadowSize, shadowSize);
  keyLight.shadow.camera.left = -12.0;
  keyLight.shadow.camera.right = 12.0;
  keyLight.shadow.camera.top = 12.0;
  keyLight.shadow.camera.bottom = -12.0;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 38;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.025;
  scene.add(keyLight);

  const hemiLight = new THREE.HemisphereLight(0xd9e6d0, 0x1e2e1d, 0.88);
  scene.add(hemiLight);

  const rimLight = new THREE.DirectionalLight(0xffe7c7, 0.36);
  rimLight.position.set(-7.5, 6.2, 6.5);
  scene.add(rimLight);

  const applyCameraAndAtmosphere = (elapsed: number) => {
    const camState = introCameraState(elapsed, viewportAspect);
    if (Math.abs(camera.fov - camState.fov) > 0.02) {
      camera.fov = camState.fov;
      camera.updateProjectionMatrix();
    }

    const parScale = camState.progress;
    const jx = journeyBlend * (1.55 + journeyYawOffset * 1.45);
    const jy = journeyBlend * (-0.38 + journeyPitchOffset * 0.55);
    const jz = journeyBlend * -1.45;

    camera.position.set(
      camState.position.x + parallaxX * 0.36 * parScale + jx,
      camState.position.y - parallaxY * 0.16 * parScale + jy,
      camState.position.z + parallaxY * 0.22 * parScale + jz,
    );
    camera.lookAt(
      camState.lookAt.x + parallaxX * 0.14 * parScale + journeyBlend * (0.95 + journeyYawOffset * 0.8),
      camState.lookAt.y - journeyBlend * 0.14,
      camState.lookAt.z + parallaxY * 0.1 * parScale + journeyBlend * 1.45,
    );

    const atmos = introAtmosphereFactor(elapsed);
    renderer!.toneMappingExposure = 0.8 + 0.24 * atmos;
    keyLight.intensity = 1.1 + 1.12 * atmos;
    hemiLight.intensity = 0.56 + 0.32 * atmos;
    rimLight.intensity = 0.18 + 0.18 * atmos;
    scene.environmentIntensity = 0.38 + 0.24 * atmos;
  };

  const updateCameraFraming = (w: number, h: number) => {
    viewportAspect = Math.max(w / Math.max(h, 1), 0.5);
    camera.aspect = viewportAspect;
    camera.updateProjectionMatrix();
    applyCameraAndAtmosphere(clock.elapsed);
  };
  updateCameraFraming(width, height);

  // Garden environment, optical water rig, and 4 realistic steering koi
  const gardenEnv = createGardenEnvironment(textures, elapsedUniform, quality);
  scene.add(gardenEnv.group);

  const waterRig = createPondWaterRig(
    elapsedUniform,
    textures,
    sunDirection,
    quality,
    isSoftwareGl,
  );
  scene.add(waterRig.group);

  const koiVariants: KoiVariant[] = ['kohaku', 'yamabuki', 'shiro', 'sanke'];
  const koiScales = [1.06, 0.98, 0.92, 1.0];
  const koiAgents = createKoiAgents();
  const koiActors: KoiActor[] = koiVariants.map((variant, idx) => {
    const actor = createKoiActor(
      variant,
      idx * (Math.PI * 0.5),
      elapsedUniform,
      textures,
      koiScales[idx],
    );
    scene.add(actor.group);
    return actor;
  });

  // Simulation state for food pellets & disturbances
  const activePellets: FoodPellet[] = [];
  const activeDisturbances: WaterDisturbance[] = [];
  let nextPelletId = 1;

  const spawnPelletsAt = (x: number, z: number): boolean => {
    if (!isInsideNaturalPond({ x, z }, 0.25)) return false;

    const offsets: Array<[number, number]> = [
      [0, 0],
      [0.2, -0.14],
      [-0.18, 0.16],
    ];
    let spawnedAny = false;
    for (const [ox, oz] of offsets) {
      const px = x + ox;
      const pz = z + oz;
      if (isInsideNaturalPond({ x: px, z: pz }, 0.2)) {
        if (activePellets.length >= 8) {
          activePellets.shift();
        }
        activePellets.push({
          id: nextPelletId++,
          x: px,
          z: pz,
          createdAt: clock.elapsed,
          eaten: false,
        });
        spawnedAny = true;
      }
    }

    if (spawnedAny) {
      waterRig.spawnRipple(x, z, clock.elapsed, !clock.isAdvancing, 0.92, true);
      waterRig.syncPellets(activePellets, clock.elapsed);
      options.onPelletAdded?.();
      if (!clock.isAdvancing) {
        renderFrame();
      }
    }
    return spawnedAny;
  };

  const spawnDisturbanceRipple = (x: number, z: number, strength = 1.0): boolean => {
    if (!isInsideNaturalPond({ x, z })) return false;
    const added = waterRig.spawnRipple(x, z, clock.elapsed, !clock.isAdvancing, strength, true);
    if (added) {
      activeDisturbances.push({ x, z, createdAt: clock.elapsed, strength });
      if (activeDisturbances.length > 8) activeDisturbances.shift();
      options.onRippleAdded?.();
      if (!clock.isAdvancing) {
        renderFrame();
      }
    }
    return added;
  };

  container.appendChild(canvas);

  // Pointer parallax + raycasting clicks against water plane (passive so page scroll never blocks)
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  let downX = 0;
  let downY = 0;
  let isDragging = false;
  let lastDragX = 0;
  let lastDragY = 0;

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    parallaxTargetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    parallaxTargetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (isDragging && journeyActive) {
      const dx = (e.clientX - lastDragX) / rect.width;
      const dy = (e.clientY - lastDragY) / rect.height;
      journeyYawOffset = Math.max(-1, Math.min(1, journeyYawOffset - dx * 2.2));
      journeyPitchOffset = Math.max(-0.7, Math.min(0.7, journeyPitchOffset + dy * 1.6));
      lastDragX = e.clientX;
      lastDragY = e.clientY;
    }
  };

  const onPointerLeave = () => {
    parallaxTargetX = 0;
    parallaxTargetY = 0;
    isDragging = false;
  };

  const onPointerDown = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
    lastDragX = e.clientX;
    lastDragY = e.clientY;
    isDragging = true;
  };

  const onPointerUp = (e: PointerEvent) => {
    isDragging = false;
    const moveDist = Math.hypot(e.clientX - downX, e.clientY - downY);
    if (moveDist > 8) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObject(waterRig.hitMesh, false);
    if (hits.length === 0) return;

    const pt = hits[0].point;
    const fed = spawnPelletsAt(pt.x, pt.z);
    if (!fed) {
      spawnDisturbanceRipple(pt.x, pt.z, 0.92);
    }
  };

  canvas.addEventListener('pointermove', onPointerMove, { passive: true });
  canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
  canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
  canvas.addEventListener('pointerup', onPointerUp, { passive: true });

  const resizeObserver = new ResizeObserver((entries) => {
    if (destroyed || !renderer) return;
    const entry = entries[0];
    if (!entry) return;
    const w = Math.max(Math.round(entry.contentRect.width), 280);
    const h = Math.max(Math.round(entry.contentRect.height), 240);
    renderer.setSize(w, h, false);
    updateCameraFraming(w, h);
    renderFrame(0);
  });
  resizeObserver.observe(container);

  const onVisibilityChange = () => {
    clock.setVisibilityPaused(document.hidden);
    lastTimestamp = performance.now();
    if (clock.isAdvancing && viewportActive && !destroyed) {
      scheduleLoop();
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  const syncKoiTransforms = (elapsed: number) => {
    for (let i = 0; i < koiActors.length; i++) {
      const k = koiAgents[i];
      const actor = koiActors[i];
      actor.group.position.set(k.x, k.y, k.z);
      actor.group.rotation.order = 'YXZ';
      actor.group.rotation.y = k.yaw;
      actor.group.rotation.z = k.pitch;
      actor.group.rotation.x = k.roll;
      const bedY = pondBedElevation(k.x, k.z);
      actor.updateAnimation(elapsed, k.speed, Math.max(0.08, k.y - bedY));
    }
  };

  const stepSimulation = (elapsed: number, simDt: number) => {
    elapsedUniform.value = elapsed;
    const atmos = introAtmosphereFactor(elapsed);

    if (simDt > 0) {
      // Smooth camera parallax + bounded 3D journey exploration + first-visit intro glide
      const nextPar = dampCameraParallax(parallaxX, parallaxY, parallaxTargetX, parallaxTargetY, simDt);
      parallaxX = nextPar.x;
      parallaxY = nextPar.y;
      const targetJourney = journeyActive ? 1 : 0;
      journeyBlend += (targetJourney - journeyBlend) * (1 - Math.exp(-3.6 * simDt));
      if (!journeyActive) {
        journeyYawOffset *= Math.exp(-4.0 * simDt);
        journeyPitchOffset *= Math.exp(-4.0 * simDt);
      }
      applyCameraAndAtmosphere(elapsed);

      // Clean expired disturbances
      for (let i = activeDisturbances.length - 1; i >= 0; i--) {
        if (elapsed - activeDisturbances[i].createdAt > 1.8) {
          activeDisturbances.splice(i, 1);
        }
      }

      // Autonomous koi steering, surface wake ripples, and pellet consumption
      const stepRes = stepKoiAgents(
        koiAgents,
        simDt,
        elapsed,
        activePellets,
        activeDisturbances,
        SUBMERGED_OBSTACLES,
      );

      for (const pid of stepRes.consumedPelletIds) {
        const idx = activePellets.findIndex((p) => p.id === pid);
        if (idx !== -1) activePellets.splice(idx, 1);
      }
      for (const wr of stepRes.wakeRipples) {
        waterRig.spawnRipple(wr.x, wr.z, elapsed, false, wr.strength, false);
      }
      for (const fr of stepRes.feedingRipples) {
        waterRig.spawnRipple(fr.x, fr.z, elapsed, false, fr.strength, true);
      }

      // Falling sakura petals + right-bank ceramic water vessel emit pond ripples
      gardenEnv.update(
        elapsed,
        simDt,
        atmos,
        (px, pz) => {
          waterRig.spawnRipple(px, pz, elapsed, false, 0.28, false);
        },
        (wx, wz) => {
          waterRig.spawnRipple(wx, wz, elapsed, false, 0.4, false);
        },
      );
    } else {
      gardenEnv.update(elapsed, 0, atmos);
      if (elapsed <= HERO_INTRO_DURATION + 0.05) {
        applyCameraAndAtmosphere(elapsed);
      }
    }

    syncKoiTransforms(elapsed);
    waterRig.syncPellets(activePellets, elapsed);
    waterRig.update(elapsed);
  };

  const renderFrame = (simDt = 0) => {
    if (destroyed || !renderer || options.isDisposed()) return;
    stepSimulation(clock.elapsed, simDt);
    renderer.render(scene, camera);
    if (!firstFrameDone) {
      firstFrameDone = true;
      options.onFirstFrame();
    }
  };

  // Seed calm initial ripples (pond center + waterfall impact pocket) before first frame
  waterRig.spawnRipple(POND_RIPPLE_DEFAULT_POINT.x, POND_RIPPLE_DEFAULT_POINT.z, 0, false, 0.85, true);
  waterRig.spawnRipple(WATERFALL_IMPACT_POINT.x, WATERFALL_IMPACT_POINT.z, 0, false, 0.42, false);

  let lastTimestamp = performance.now();
  let loopActive = false;

  const afterDrawSoftware = (cb: () => void) => {
    const gl = renderer?.backend?.gl;
    if (gl && typeof gl.fenceSync === 'function') {
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (destroyed) return;
        const state = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
        if (state === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    } else {
      timeoutId = window.setTimeout(cb, 80);
    }
  };

  const tick = (now: number) => {
    if (destroyed || !renderer || options.isDisposed()) return;
    const rawDt = Math.max(0, (now - lastTimestamp) / 1000);
    lastTimestamp = now;

    if (!clock.isAdvancing || !viewportActive) {
      loopActive = false;
      return;
    }

    const prevElapsed = clock.elapsed;
    const newElapsed = clock.step(rawDt);
    const simDt = newElapsed - prevElapsed;
    renderFrame(simDt);

    if (isSoftwareGl) {
      afterDrawSoftware(() => {
        if (!destroyed && clock.isAdvancing && viewportActive) {
          frameId = requestAnimationFrame(tick);
        } else {
          loopActive = false;
        }
      });
    } else {
      frameId = requestAnimationFrame(tick);
    }
  };

  const scheduleLoop = () => {
    if (destroyed || loopActive || !clock.isAdvancing || !viewportActive) return;
    loopActive = true;
    lastTimestamp = performance.now();
    frameId = requestAnimationFrame(tick);
  };

  function cleanupGraphics() {
    if (destroyed) return;
    destroyed = true;
    loopActive = false;
    if (frameId) cancelAnimationFrame(frameId);
    if (timeoutId) clearTimeout(timeoutId);

    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerleave', onPointerLeave);
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointerup', onPointerUp);
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);

    koiActors.forEach((a) => a.dispose());
    waterRig.dispose();
    gardenEnv.dispose();
    textures.dispose();
    if (envTex) envTex.dispose();

    if (renderer && initialized) {
      try {
        renderer.setAnimationLoop(null);
      } catch {
        // Ignore if backend already tore down
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      void Promise.resolve(renderer.dispose()).catch(() => undefined);
    }
    renderer = null;
  }

  // Draw first frame immediately before entering loop
  renderFrame(0);
  if (clock.isAdvancing && viewportActive) {
    scheduleLoop();
  }

  return {
    setPaused: (paused: boolean) => {
      if (destroyed) return;
      if (paused) {
        clock.pause();
        loopActive = false;
        if (frameId) cancelAnimationFrame(frameId);
        if (timeoutId) clearTimeout(timeoutId);
        renderFrame(0);
      } else {
        clock.resume();
        lastTimestamp = performance.now();
        if (viewportActive) {
          scheduleLoop();
        }
      }
    },
    setViewportActive: (active: boolean) => {
      if (destroyed) return;
      viewportActive = active;
      if (active && clock.isAdvancing) {
        scheduleLoop();
      } else if (!active) {
        loopActive = false;
        if (frameId) cancelAnimationFrame(frameId);
        if (timeoutId) clearTimeout(timeoutId);
      }
    },
    feedKoi: () => {
      if (destroyed) return;
      spawnPelletsAt(0.35, 0.45);
    },
    triggerRipple: () => {
      if (destroyed) return;
      spawnDisturbanceRipple(POND_RIPPLE_DEFAULT_POINT.x, POND_RIPPLE_DEFAULT_POINT.z, 0.96);
    },
    setJourneyActive: (active: boolean) => {
      if (destroyed) return;
      journeyActive = active;
      if (!active) {
        journeyYawOffset = 0;
        journeyPitchOffset = 0;
      }
      if (!clock.isAdvancing) {
        journeyBlend = active ? 1 : 0;
        applyCameraAndAtmosphere(clock.elapsed);
        renderFrame(0);
      }
    },
    destroy: () => {
      cleanupGraphics();
    },
  };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/textures.ts">
<![CDATA[import * as THREE from 'three/webgpu';

export type PondQuality = 'desktop' | 'mobile';

export interface PondTextureSuite {
  waterNormalA: THREE.DataTexture;
  waterNormalB: THREE.DataTexture;
  stoneAlbedo: THREE.CanvasTexture;
  stoneNormal: THREE.DataTexture;
  stoneRoughness: THREE.DataTexture;
  bedAlbedo: THREE.CanvasTexture;
  bedNormal: THREE.DataTexture;
  scaleNormal: THREE.DataTexture;
  finAlpha: THREE.CanvasTexture;
  barkAlbedo: THREE.CanvasTexture;
  barkNormal: THREE.DataTexture;
  blossomMap: THREE.CanvasTexture;
  petalMap: THREE.CanvasTexture;
  woodAlbedo: THREE.CanvasTexture;
  woodNormal: THREE.DataTexture;
  roofAlbedo: THREE.CanvasTexture;
  roofNormal: THREE.DataTexture;
  envEquirect: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  groundAlbedo: THREE.CanvasTexture;
  groundNormal: THREE.DataTexture;
  mossAlbedo: THREE.CanvasTexture;
  mossNormal: THREE.DataTexture;
  litterAlbedo: THREE.CanvasTexture;
  litterNormal: THREE.DataTexture;
  bambooAlbedo: THREE.CanvasTexture;
  bambooNormal: THREE.DataTexture;
  fernLeafMap: THREE.CanvasTexture;
  bambooLeafMap: THREE.CanvasTexture;
  broadLeafMap: THREE.CanvasTexture;
  grassBladeMap: THREE.CanvasTexture;
  understoryLeafMap: THREE.CanvasTexture;
  clayAlbedo: THREE.CanvasTexture;
  clayNormal: THREE.DataTexture;
  dispose: () => void;
}

function hash2D(ix: number, iy: number, seed: number): number {
  let n = (ix * 374761393 + iy * 668265263 + seed * 1442695041) | 0;
  n = (n ^ (n >>> 13)) * 1274126177;
  n = n ^ (n >>> 16);
  return (n >>> 0) / 4294967295;
}

function periodicNoise(u: number, v: number, period: number, seed: number): number {
  const x = u * period;
  const y = v * period;
  const ix0 = Math.floor(x);
  const iy0 = Math.floor(y);
  const fx = x - ix0;
  const fy = y - iy0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const px0 = ((ix0 % period) + period) % period;
  const py0 = ((iy0 % period) + period) % period;
  const px1 = (px0 + 1) % period;
  const py1 = (py0 + 1) % period;

  const n00 = hash2D(px0, py0, seed);
  const n10 = hash2D(px1, py0, seed);
  const n01 = hash2D(px0, py1, seed);
  const n11 = hash2D(px1, py1, seed);

  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

function periodicFbm(
  u: number,
  v: number,
  basePeriod: number,
  octaves: number,
  seed: number,
): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let period = basePeriod;
  for (let o = 0; o < octaves; o++) {
    sum += periodicNoise(u, v, period, seed + o * 97) * amp;
    norm += amp;
    amp *= 0.5;
    period *= 2;
  }
  return sum / norm;
}

function buildNormalTexture(
  size: number,
  heightField: Float32Array,
  strength: number,
  anisotropy: number,
): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size;
    const yp = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size;
      const xp = (x + 1) % size;

      const hL = heightField[y * size + xm];
      const hR = heightField[y * size + xp];
      const hD = heightField[ym * size + x];
      const hU = heightField[yp * size + x];

      const dx = (hL - hR) * strength;
      const dy = (hD - hU) * strength;
      const invLen = 1 / Math.hypot(dx, dy, 1);

      const idx = (y * size + x) * 4;
      data[idx] = Math.round((dx * invLen * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.round((dy * invLen * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.round((invLen * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = anisotropy;
  tex.needsUpdate = true;
  return tex;
}

function buildWaterNormal(
  size: number,
  seed: number,
  freqA: number,
  freqB: number,
  anisotropy: number,
): THREE.DataTexture {
  const heights = new Float32Array(size * size);
  const tau = Math.PI * 2;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Seamless directional swells + fine capillary wave interference
      const w1 = Math.sin(tau * (u * freqA + v * freqB) + 0.4 * Math.cos(tau * v * 2));
      const w2 = Math.sin(tau * (u * -freqB + v * (freqA + 1)) + 0.35 * Math.sin(tau * u * 3));
      const w3 = Math.cos(tau * (u * (freqA * 2 + 1) - v * (freqB * 2 - 1)));
      const micro = periodicFbm(u, v, 8, 4, seed);
      heights[y * size + x] = w1 * 0.34 + w2 * 0.28 + w3 * 0.16 + (micro - 0.5) * 0.65;
    }
  }
  return buildNormalTexture(size, heights, 3.2, anisotropy);
}

function buildStoneMaps(
  size: number,
  anisotropy: number,
): {
  albedo: THREE.CanvasTexture;
  normal: THREE.DataTexture;
  roughness: THREE.DataTexture;
} {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);
  const roughData = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const macro = periodicFbm(u, v, 4, 4, 101);
      const grain = periodicFbm(u, v, 18, 3, 202);
      const ridge = Math.abs(periodicFbm(u + macro * 0.12, v, 6, 3, 303) - 0.5) * 2;
      const crack = Math.max(0, 1 - ridge * 7.5);
      const mossPatch = Math.max(0, (periodicFbm(u, v, 3, 3, 404) - 0.56) * 2.4);

      const h = macro * 0.55 + grain * 0.35 - crack * 0.35;
      heights[y * size + x] = h;

      // Warm Kyoto granite base blended with mineral speckle & subtle olive moss
      let r = 136 + (macro - 0.5) * 58 + (grain - 0.5) * 42 - crack * 44;
      let g = 130 + (macro - 0.5) * 52 + (grain - 0.5) * 38 - crack * 40;
      let b = 114 + (macro - 0.5) * 44 + (grain - 0.5) * 34 - crack * 36;

      if (mossPatch > 0) {
        const m = Math.min(0.65, mossPatch);
        r = r * (1 - m) + 64 * m;
        g = g * (1 - m) + 92 * m;
        b = b * (1 - m) + 64 * m;
      }

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;

      const roughVal = Math.max(
        130,
        Math.min(248, Math.round((0.76 + (1 - grain) * 0.16 + crack * 0.1) * 255)),
      );
      roughData[idx] = roughVal;
      roughData[idx + 1] = roughVal;
      roughData[idx + 2] = roughVal;
      roughData[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  const roughness = new THREE.DataTexture(roughData, size, size, THREE.RGBAFormat);
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.RepeatWrapping;
  roughness.minFilter = THREE.LinearMipmapLinearFilter;
  roughness.generateMipmaps = true;
  roughness.colorSpace = THREE.NoColorSpace;
  roughness.anisotropy = anisotropy;
  roughness.needsUpdate = true;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.2, anisotropy),
    roughness,
  };
}

function buildPondBedMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base deep silty jade sand
  ctx.fillStyle = '#243c35';
  ctx.fillRect(0, 0, size, size);

  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const sand = periodicFbm(u, v, 14, 3, 701);
      const silt = periodicFbm(u, v, 4, 3, 709);
      heights[y * size + x] = sand * 0.25 + silt * 0.25;
    }
  }

  // Draw deterministic tiled river pebbles
  let seed = 88123;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const pebbleCount = Math.round((size * size) / 220);
  for (let i = 0; i < pebbleCount; i++) {
    const px = rand() * size;
    const py = rand() * size;
    const rx = (2.2 + rand() * 5.8) * (size / 256);
    const ry = rx * (0.62 + rand() * 0.34);
    const rot = rand() * Math.PI;
    const tone = rand();

    let r = 82;
    let g = 92;
    let b = 78;
    if (tone < 0.28) {
      r = 122;
      g = 118;
      b = 102;
    } else if (tone < 0.56) {
      r = 66;
      g = 80;
      b = 71;
    } else if (tone < 0.8) {
      r = 96;
      g = 101;
      b = 85;
    } else {
      r = 52;
      g = 72;
      b = 58;
    }

    // Wraparound draw for seamless tiling
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const cx = px + ox * size;
        const cy = py + oy * size;
        if (cx < -rx * 2 || cx > size + rx * 2 || cy < -rx * 2 || cy > size + rx * 2) continue;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Also stamp height dome for pebble normal relief
    const x0 = Math.floor(px - rx - 1);
    const x1 = Math.ceil(px + rx + 1);
    const y0 = Math.floor(py - rx - 1);
    const y1 = Math.ceil(py + rx + 1);
    const cosR = Math.cos(-rot);
    const sinR = Math.sin(-rot);
    for (let pyIdx = y0; pyIdx <= y1; pyIdx++) {
      const wy = ((pyIdx % size) + size) % size;
      const dy = pyIdx - py;
      for (let pxIdx = x0; pxIdx <= x1; pxIdx++) {
        const wx = ((pxIdx % size) + size) % size;
        const dx = pxIdx - px;
        const lx = (dx * cosR - dy * sinR) / rx;
        const ly = (dx * sinR + dy * cosR) / ry;
        const d2 = lx * lx + ly * ly;
        if (d2 < 1) {
          const dome = Math.sqrt(1 - d2) * 0.55;
          heights[wy * size + wx] = Math.max(heights[wy * size + wx], 0.35 + dome);
        }
      }
    }
  }

  // Soft olive algae veil pass
  const img = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const algae = Math.max(0, (periodicFbm(u, v, 5, 3, 919) - 0.45) * 1.4);
      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(img.data[idx] * (1 - algae * 0.35) + 34 * algae * 0.35);
      img.data[idx + 1] = Math.round(img.data[idx + 1] * (1 - algae * 0.28) + 64 * algae * 0.28);
      img.data[idx + 2] = Math.round(img.data[idx + 2] * (1 - algae * 0.35) + 52 * algae * 0.35);
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.5, anisotropy),
  };
}

function buildKoiScaleNormal(size: number, anisotropy: number): THREE.DataTexture {
  const heights = new Float32Array(size * size);
  const cols = 22;
  const rows = 16;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const gx = u * cols;
      const gy = v * rows;
      const rowIdx = Math.floor(gy);
      const staggerX = gx + (rowIdx % 2 === 0 ? 0 : 0.5);
      const fx = staggerX - Math.floor(staggerX) - 0.5;
      const fy = gy - rowIdx - 0.5;
      const dist = Math.hypot(fx * 1.1, fy * 1.2);
      const scaleDome = Math.max(0, 1 - dist * 1.35);
      // Slight trailing edge rim
      heights[y * size + x] = Math.pow(scaleDome, 0.72) * 0.85;
    }
  }
  return buildNormalTexture(size, heights, 2.2, anisotropy);
}

function buildFinAlphaTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Fin ray lines running along U with soft scalloped membrane translucency
      const rays = 0.5 + 0.5 * Math.sin(v * Math.PI * 26);
      const taper = 1 - Math.pow(Math.max(0, Math.abs(v - 0.5) * 1.9), 2.2);
      const edgeFade = 1 - Math.pow(u, 2.5) * 0.45;
      const alpha = Math.max(0.18, Math.min(0.95, (0.52 + rays * 0.34) * taper * edgeFade));
      const shade = Math.round(225 + rays * 30);
      const idx = (y * size + x) * 4;
      img.data[idx] = shade;
      img.data[idx + 1] = shade;
      img.data[idx + 2] = Math.min(255, shade + 2);
      img.data[idx + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBarkMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const verticalFurrow = periodicFbm(u * 2.2, v * 0.35, 8, 4, 511);
      // Sakura cherry bark signature horizontal lenticel bands
      const lenticel = Math.pow(
        Math.max(0, Math.sin(v * Math.PI * 22 + periodicNoise(u, v, 4, 521) * 2.4)),
        6,
      );
      const fine = periodicFbm(u, v, 24, 2, 533);
      const h = verticalFurrow * 0.65 + fine * 0.25 - lenticel * 0.25;
      heights[y * size + x] = h;

      const base = 42 + verticalFurrow * 26 + fine * 12;
      const r = base * 1.15 + lenticel * 24;
      const g = base * 0.92 + lenticel * 16;
      const b = base * 0.86 + lenticel * 12;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.min(255, Math.round(r));
      img.data[idx + 1] = Math.min(255, Math.round(g));
      img.data[idx + 2] = Math.min(255, Math.round(b));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.8, anisotropy),
  };
}

function drawSingleSakuraBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number,
  pinkTint: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);

  for (let p = 0; p < 5; p++) {
    ctx.save();
    ctx.rotate((p / 5) * Math.PI * 2);
    const grad = ctx.createRadialGradient(0, -radius * 0.15, 0, 0, -radius * 0.45, radius);
    const blush = Math.round(pinkTint * 20);
    grad.addColorStop(0, `rgba(${238 - blush}, ${188 - blush}, ${186 - blush}, 0.96)`);
    grad.addColorStop(0.45, `rgba(${248 - blush / 2}, ${220 - blush / 2}, ${218 - blush / 2}, 0.94)`);
    grad.addColorStop(1, 'rgba(253, 245, 242, 0.88)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.44, -radius * 0.28, -radius * 0.42, -radius * 0.86, -radius * 0.1, -radius * 0.96);
    // Authentic sakura petal apical notch
    ctx.lineTo(0, -radius * 0.82);
    ctx.lineTo(radius * 0.1, -radius * 0.96);
    ctx.bezierCurveTo(radius * 0.42, -radius * 0.86, radius * 0.44, -radius * 0.28, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Crimson-gold stamen heart
  ctx.fillStyle = '#9E3F32';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.13, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(203, 148, 98, 0.85)';
  ctx.lineWidth = Math.max(0.8, radius * 0.045);
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * radius * 0.28, Math.sin(a) * radius * 0.28);
    ctx.stroke();
  }
  ctx.restore();
}

function buildBlossomClusterTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 4242;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Faint twig stems in center
  ctx.strokeStyle = 'rgba(65, 48, 42, 0.55)';
  ctx.lineWidth = size * 0.018;
  ctx.beginPath();
  ctx.moveTo(size * 0.25, size * 0.72);
  ctx.quadraticCurveTo(size * 0.5, size * 0.52, size * 0.75, size * 0.34);
  ctx.stroke();

  // Layered bouquet of 14 varied sakura blossoms leaving natural negative space
  for (let i = 0; i < 15; i++) {
    const angle = (i / 15) * Math.PI * 2 + rand() * 0.5;
    const dist = (0.06 + rand() * 0.27) * size;
    const cx = size * 0.5 + Math.cos(angle) * dist;
    const cy = size * 0.5 + Math.sin(angle) * dist;
    const r = (0.1 + rand() * 0.075) * size;
    drawSingleSakuraBlossom(ctx, cx, cy, r, rand() * Math.PI * 2, rand());
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildSinglePetalTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const cx = size * 0.5;
  const cy = size * 0.85;
  const r = size * 0.74;
  const grad = ctx.createRadialGradient(cx, cy - r * 0.12, 0, cx, cy - r * 0.45, r);
  grad.addColorStop(0, '#D9A7A4');
  grad.addColorStop(0.45, '#F0D5D1');
  grad.addColorStop(1, '#FDF7F5');
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.bezierCurveTo(cx - r * 0.44, cy - r * 0.3, cx - r * 0.42, cy - r * 0.86, cx - r * 0.1, cy - r * 0.96);
  ctx.lineTo(cx, cy - r * 0.82);
  ctx.lineTo(cx + r * 0.1, cy - r * 0.96);
  ctx.bezierCurveTo(cx + r * 0.42, cy - r * 0.86, cx + r * 0.44, cy - r * 0.3, cx, cy);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildWoodMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const warp = periodicFbm(u, v, 3, 3, 611) * 0.35;
      const rings = Math.sin((u * 16 + warp * 8) * Math.PI * 2) * 0.5 + 0.5;
      const fiber = periodicFbm(u * 6, v * 0.4, 8, 3, 619);
      const h = rings * 0.5 + fiber * 0.5;
      heights[y * size + x] = h;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(138 + rings * 36 + (fiber - 0.5) * 20);
      img.data[idx + 1] = Math.round(104 + rings * 28 + (fiber - 0.5) * 16);
      img.data[idx + 2] = Math.round(72 + rings * 18 + (fiber - 0.5) * 12);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 2.6, anisotropy),
  };
}

function buildRoofTileMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  const cols = 12;
  const rows = 10;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Fluted curved Kawara tile ribs + overlapping horizontal courses
      const colPhase = (u * cols) % 1;
      const rib = Math.cos((colPhase - 0.5) * Math.PI * 2) * 0.5 + 0.5;
      const rowPhase = (v * rows) % 1;
      const overlap = 1 - rowPhase * 0.72;
      const weather = periodicFbm(u, v, 6, 3, 733);
      const h = rib * 0.55 + overlap * 0.35 + (weather - 0.5) * 0.14;
      heights[y * size + x] = h;

      const shade = 38 + rib * 16 + overlap * 10 + (weather - 0.5) * 14;
      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(shade * 0.96);
      img.data[idx + 1] = Math.round(shade * 1.03);
      img.data[idx + 2] = Math.round(shade * 1.02);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.4, anisotropy),
  };
}

function buildMorningGardenEquirect(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Misty early-morning sky zenith-to-forest horizon gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0.0, '#6B897E');
  skyGrad.addColorStop(0.24, '#9DB3A4');
  skyGrad.addColorStop(0.45, '#DCE2D1');
  skyGrad.addColorStop(0.51, '#263E2C');
  skyGrad.addColorStop(1.0, '#0F1C14');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Warm upper-right morning sun glow matching diagonal forest sunbeams
  const sunX = w * 0.72;
  const sunY = h * 0.24;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 155);
  sunGrad.addColorStop(0, 'rgba(255, 249, 226, 0.96)');
  sunGrad.addColorStop(0.28, 'rgba(247, 232, 194, 0.54)');
  sunGrad.addColorStop(1, 'rgba(247, 232, 194, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft misty bamboo horizon band
  const mistGrad = ctx.createLinearGradient(0, h * 0.36, 0, h * 0.56);
  mistGrad.addColorStop(0, 'rgba(220, 228, 212, 0)');
  mistGrad.addColorStop(0.55, 'rgba(216, 224, 206, 0.42)');
  mistGrad.addColorStop(1, 'rgba(38, 62, 44, 0.72)');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(0, h * 0.36, w, h * 0.22);

  // Right-side sakura blossom canopy silhouette reflected softly on pond surface
  ctx.fillStyle = 'rgba(232, 190, 200, 0.38)';
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    ctx.ellipse(
      w * 0.58 + (i % 5) * 28,
      h * 0.33 + Math.floor(i / 5) * 14,
      26,
      13,
      -0.18,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Soft forest foliage & shrine reflection silhouettes toward upper-left-back
  ctx.fillStyle = 'rgba(30, 46, 30, 0.55)';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.ellipse(w * 0.14 + i * 28, h * 0.45 + (i % 3) * 8, 30, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildContactShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.04,
    size / 2,
    size / 2,
    size * 0.5,
  );
  grad.addColorStop(0, 'rgba(8, 20, 18, 0.78)');
  grad.addColorStop(0.55, 'rgba(8, 20, 18, 0.32)');
  grad.addColorStop(1, 'rgba(8, 20, 18, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildGardenGroundMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const macro = periodicFbm(u, v, 3, 4, 1201);
      const grain = periodicFbm(u, v, 14, 3, 1307);
      const pebbles = Math.max(0, (periodicFbm(u + 0.31, v - 0.19, 22, 2, 1409) - 0.62) * 2.6);
      const needleLitter = Math.max(
        0,
        (periodicFbm(u * 2.1, v * 0.8, 12, 3, 1511) - 0.56) * 2.2,
      );

      const h = macro * 0.38 + grain * 0.36 + pebbles * 0.32 - needleLitter * 0.1;
      heights[y * size + x] = h;

      // Rich damp forest umber loam with warm earth flecks & tiny mineral grit
      let r = 58 + macro * 28 + (grain - 0.5) * 24;
      let g = 51 + macro * 22 + (grain - 0.5) * 18;
      let b = 38 + macro * 15 + (grain - 0.5) * 14;

      if (needleLitter > 0) {
        const w = Math.min(0.62, needleLitter);
        r = r * (1 - w) + 92 * w;
        g = g * (1 - w) + 74 * w;
        b = b * (1 - w) + 50 * w;
      }

      if (pebbles > 0) {
        const pw = Math.min(0.55, pebbles);
        r = r * (1 - pw) + 118 * pw;
        g = g * (1 - pw) + 114 * pw;
        b = b * (1 - pw) + 102 * pw;
      }

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.4, anisotropy),
  };
}

function buildLitterGravelMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const bed = periodicFbm(u, v, 4, 3, 2701);
      const grit = periodicFbm(u, v, 24, 3, 2803);
      const chip = Math.max(0, (periodicFbm(u + 0.14, v + 0.27, 30, 2, 2909) - 0.55) * 2.4);
      const h = bed * 0.28 + grit * 0.42 + chip * 0.38;
      heights[y * size + x] = h;

      // Compacted warm Kyoto Shirakawa decomposed granite gravel & fallen dry litter tones
      let r = 104 + (bed - 0.5) * 28 + (grit - 0.5) * 34 + chip * 32;
      let g = 97 + (bed - 0.5) * 25 + (grit - 0.5) * 30 + chip * 28;
      let b = 81 + (bed - 0.5) * 22 + (grit - 0.5) * 26 + chip * 22;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Scatter subtle fallen dry bamboo/sakura leaf wisps onto litter map
  let seed = 5519;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const leafCount = Math.round((size * size) / 480);
  for (let i = 0; i < leafCount; i++) {
    const cx = rand() * size;
    const cy = rand() * size;
    const len = (3.5 + rand() * 7.5) * (size / 256);
    const wid = len * (0.18 + rand() * 0.12);
    const rot = rand() * Math.PI * 2;
    const tone = rand();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.fillStyle =
      tone > 0.65
        ? 'rgba(132, 102, 64, 0.58)'
        : tone > 0.3
          ? 'rgba(98, 86, 54, 0.52)'
          : 'rgba(154, 134, 96, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 0, len, wid, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.8, anisotropy),
  };
}

function buildBambooMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const fiber = periodicFbm(u * 6, v * 0.4, 8, 3, 1709);
      const patina = periodicFbm(u, v, 4, 3, 1811);
      // Horizontal culm node rings
      const nodeDist = Math.abs(((v * 3) % 1) - 0.5);
      const nodeRing = Math.exp(-nodeDist * nodeDist * 380);
      heights[y * size + x] = fiber * 0.35 + nodeRing * 0.55;

      const warmOlive = 1 - nodeRing * 0.42;
      const r = (92 + fiber * 36 + (patina - 0.5) * 28) * warmOlive;
      const g = (108 + fiber * 34 + (patina - 0.5) * 24) * warmOlive;
      const b = (66 + fiber * 22 + (patina - 0.5) * 18) * warmOlive;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 2.8, anisotropy),
  };
}

function buildMossCushionMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const clump = periodicFbm(u, v, 4, 3, 2101);
      const cushion = periodicFbm(u, v, 11, 3, 2203);
      const tuft = periodicFbm(u, v, 28, 2, 2309);
      const crevice = Math.max(0, 1 - clump * 2.1);

      const h = clump * 0.45 + cushion * 0.35 + tuft * 0.25 - crevice * 0.28;
      heights[y * size + x] = h;

      // Rich layered Kyoto moss: deep emerald crevices -> olive cushions -> warm chartreuse tips
      const warmth = Math.max(0, (cushion - 0.38) * 1.45) + (tuft - 0.45) * 0.48;
      const r = 74 + warmth * 82 + clump * 34 - crevice * 28;
      const g = 112 + warmth * 86 + clump * 42 - crevice * 34;
      const b = 52 + warmth * 28 + clump * 20 - crevice * 16;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 5.2, anisotropy),
  };
}

function buildFernLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  ctx.strokeStyle = '#7E984C';
  ctx.lineWidth = Math.max(2, size * 0.022);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.96);
  ctx.quadraticCurveTo(size * 0.51, size * 0.48, size * 0.5, size * 0.05);
  ctx.stroke();

  const pairCount = 15;
  for (let i = 0; i < pairCount; i++) {
    const t = i / (pairCount - 1);
    const y = size * (0.9 - t * 0.82);
    const widthFactor = Math.sin(Math.pow(1 - t, 0.72) * Math.PI * 0.88 + 0.12);
    const span = size * (0.1 + 0.34 * widthFactor) * (1 - t * 0.25);
    const bladeH = size * (0.044 * (1 - t * 0.45));

    for (const dir of [-1, 1]) {
      ctx.save();
      ctx.translate(size * 0.5, y + (dir === 1 ? 0 : -size * 0.014));
      ctx.rotate(dir * (-0.28 + t * 0.14));

      const grad = ctx.createLinearGradient(0, 0, dir * span, -bladeH);
      grad.addColorStop(0, '#5E7F3B');
      grad.addColorStop(0.55, '#86A852');
      grad.addColorStop(1, '#ABC76E');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(dir * span * 0.48, -bladeH * 1.15, dir * span, -bladeH * 0.22);
      ctx.quadraticCurveTo(dir * span * 0.48, bladeH * 0.72, 0, bladeH * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBambooLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 7319;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  ctx.strokeStyle = 'rgba(84, 102, 58, 0.9)';
  ctx.lineWidth = Math.max(1.5, size * 0.014);
  ctx.beginPath();
  ctx.moveTo(size * 0.14, size * 0.88);
  ctx.quadraticCurveTo(size * 0.48, size * 0.56, size * 0.82, size * 0.24);
  ctx.stroke();

  const anchors: Array<[number, number, number]> = [
    [0.28, 0.72, 5],
    [0.45, 0.56, 6],
    [0.62, 0.42, 6],
    [0.74, 0.28, 5],
    [0.52, 0.36, 4],
  ];

  for (const [ax, ay, leaves] of anchors) {
    for (let i = 0; i < leaves; i++) {
      const ang = -Math.PI * 0.88 + (i / Math.max(1, leaves - 1)) * Math.PI * 0.95 + (rand() - 0.5) * 0.24;
      const len = size * (0.2 + rand() * 0.14);
      const wid = size * (0.03 + rand() * 0.014);

      ctx.save();
      ctx.translate(ax * size, ay * size);
      ctx.rotate(ang);
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      grad.addColorStop(0, '#6B8646');
      grad.addColorStop(0.6, '#8CA85C');
      grad.addColorStop(1, '#B3C97C');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(len * 0.38, -wid, len, 0);
      ctx.quadraticCurveTo(len * 0.38, wid, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBroadLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 9187;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  ctx.strokeStyle = 'rgba(66, 54, 40, 0.78)';
  ctx.lineWidth = Math.max(1.5, size * 0.015);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.94);
  ctx.quadraticCurveTo(size * 0.46, size * 0.52, size * 0.52, size * 0.18);
  ctx.stroke();

  for (let i = 0; i < 20; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = (0.05 + Math.pow(rand(), 0.75) * 0.31) * size;
    const cx = size * 0.5 + Math.cos(angle) * dist;
    const cy = size * 0.48 + Math.sin(angle) * dist * 0.86;
    const r = (0.078 + rand() * 0.062) * size;
    const warmTip = rand();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rand() * Math.PI * 2);
    const fillHex =
      warmTip > 0.72 ? '#B88450' : warmTip > 0.38 ? '#7CA14F' : '#5B7C3B';
    ctx.fillStyle = fillHex;
    ctx.beginPath();
    for (let l = 0; l < 5; l++) {
      const la = (l / 5) * Math.PI * 2 - Math.PI / 2;
      const tipX = Math.cos(la) * r;
      const tipY = Math.sin(la) * r;
      const midA = la + Math.PI / 5;
      const valleyX = Math.cos(midA) * r * 0.36;
      const valleyY = Math.sin(midA) * r * 0.36;
      if (l === 0) ctx.moveTo(tipX, tipY);
      else ctx.lineTo(tipX, tipY);
      ctx.lineTo(valleyX, valleyY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildGrassBladeTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 4817;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Dense multi-blade fine sedge / mondo-grass fan with tapered tips and natural color gradients
  const bladeCount = 26;
  for (let i = 0; i < bladeCount; i++) {
    const t = i / (bladeCount - 1);
    const bx = size * (0.28 + t * 0.44 + (rand() - 0.5) * 0.05);
    const by = size * 0.98;
    const tipX = size * (0.06 + t * 0.88 + (rand() - 0.5) * 0.14);
    const tipY = size * (0.08 + Math.abs(t - 0.5) * 0.34 + rand() * 0.18);
    const ctrlX = (bx + tipX) * 0.5 + (tipX - size * 0.5) * 0.18;
    const ctrlY = (by + tipY) * 0.46;
    const baseW = size * (0.016 + rand() * 0.012);

    const grad = ctx.createLinearGradient(bx, by, tipX, tipY);
    grad.addColorStop(0, '#435E2B');
    grad.addColorStop(0.45, rand() > 0.4 ? '#6E8F43' : '#5B7C38');
    grad.addColorStop(1, rand() > 0.5 ? '#9EBA68' : '#8AA856');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(bx - baseW, by);
    ctx.quadraticCurveTo(ctrlX - baseW * 0.45, ctrlY, tipX, tipY);
    ctx.quadraticCurveTo(ctrlX + baseW * 0.45, ctrlY, bx + baseW, by);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildUnderstoryClumpTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 6421;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Shaded Japanese forest-floor broadleaf / wild-ginger / dwarf bamboo cluster
  const leaves = 18;
  for (let i = 0; i < leaves; i++) {
    const a = -Math.PI * 0.92 + (i / (leaves - 1)) * Math.PI * 0.84 + (rand() - 0.5) * 0.2;
    const len = size * (0.28 + rand() * 0.34);
    const wid = len * (0.24 + rand() * 0.12);
    const ox = size * (0.36 + rand() * 0.28);
    const oy = size * (0.86 + rand() * 0.08);

    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(a + Math.PI * 0.5);
    const grad = ctx.createLinearGradient(0, 0, 0, -len);
    grad.addColorStop(0, '#445E2D');
    grad.addColorStop(0.55, rand() > 0.4 ? '#688A3F' : '#587735');
    grad.addColorStop(1, '#8FAE58');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-wid, -len * 0.45, 0, -len);
    ctx.quadraticCurveTo(wid, -len * 0.45, 0, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(176, 204, 118, 0.42)';
    ctx.lineWidth = Math.max(1, size * 0.008);
    ctx.beginPath();
    ctx.moveTo(0, -len * 0.08);
    ctx.lineTo(0, -len * 0.85);
    ctx.stroke();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildClayMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const wheel = Math.sin(v * Math.PI * 28) * 0.5 + 0.5;
      const speckle = periodicFbm(u, v, 14, 3, 2503);
      const glazeFlow = Math.max(0, 1 - v * 1.45);
      const h = wheel * 0.25 + speckle * 0.45;
      heights[y * size + x] = h;

      // Warm glazed Kyoto Shigaraki stoneware terracotta
      const baseR = 138 + (speckle - 0.5) * 44 + wheel * 12 - glazeFlow * 26;
      const baseG = 112 + (speckle - 0.5) * 36 + wheel * 10 - glazeFlow * 18;
      const baseB = 86 + (speckle - 0.5) * 28 + wheel * 8 - glazeFlow * 14;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(baseR)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(baseG)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(baseB)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 3.0, anisotropy),
  };
}

export function createPondTextureSuite(
  quality: PondQuality,
  maxAnisotropy = 4,
): PondTextureSuite {
  const aniso = Math.max(1, Math.min(maxAnisotropy, quality === 'desktop' ? 8 : 2));
  const waterSize = quality === 'desktop' ? 512 : 256;
  const stoneSize = quality === 'desktop' ? 512 : 256;
  const bedSize = quality === 'desktop' ? 512 : 256;
  const detailSize = quality === 'desktop' ? 256 : 128;

  const waterNormalA = buildWaterNormal(waterSize, 17, 2, 3, aniso);
  const waterNormalB = buildWaterNormal(waterSize, 83, 4, -3, aniso);
  const stone = buildStoneMaps(stoneSize, aniso);
  const bed = buildPondBedMaps(bedSize, aniso);
  const scaleNormal = buildKoiScaleNormal(detailSize, aniso);
  const finAlpha = buildFinAlphaTexture(128);
  const bark = buildBarkMaps(detailSize, aniso);
  const blossomMap = buildBlossomClusterTexture(detailSize);
  const petalMap = buildSinglePetalTexture(128);
  const wood = buildWoodMaps(detailSize, aniso);
  const roof = buildRoofTileMaps(detailSize, aniso);
  const envEquirect = buildMorningGardenEquirect();
  const contactShadow = buildContactShadowTexture();
  const ground = buildGardenGroundMaps(stoneSize, aniso);
  const moss = buildMossCushionMaps(detailSize, aniso);
  const litter = buildLitterGravelMaps(detailSize, aniso);
  const bamboo = buildBambooMaps(detailSize, aniso);
  const fernLeafMap = buildFernLeafTexture(detailSize);
  const bambooLeafMap = buildBambooLeafTexture(detailSize);
  const broadLeafMap = buildBroadLeafTexture(detailSize);
  const grassBladeMap = buildGrassBladeTexture(detailSize);
  const understoryLeafMap = buildUnderstoryClumpTexture(detailSize);
  const clay = buildClayMaps(detailSize, aniso);

  const all = [
    waterNormalA,
    waterNormalB,
    stone.albedo,
    stone.normal,
    stone.roughness,
    bed.albedo,
    bed.normal,
    scaleNormal,
    finAlpha,
    bark.albedo,
    bark.normal,
    blossomMap,
    petalMap,
    wood.albedo,
    wood.normal,
    roof.albedo,
    roof.normal,
    envEquirect,
    contactShadow,
    ground.albedo,
    ground.normal,
    moss.albedo,
    moss.normal,
    litter.albedo,
    litter.normal,
    bamboo.albedo,
    bamboo.normal,
    fernLeafMap,
    bambooLeafMap,
    broadLeafMap,
    grassBladeMap,
    understoryLeafMap,
    clay.albedo,
    clay.normal,
  ];

  return {
    waterNormalA,
    waterNormalB,
    stoneAlbedo: stone.albedo,
    stoneNormal: stone.normal,
    stoneRoughness: stone.roughness,
    bedAlbedo: bed.albedo,
    bedNormal: bed.normal,
    scaleNormal,
    finAlpha,
    barkAlbedo: bark.albedo,
    barkNormal: bark.normal,
    blossomMap,
    petalMap,
    woodAlbedo: wood.albedo,
    woodNormal: wood.normal,
    roofAlbedo: roof.albedo,
    roofNormal: roof.normal,
    envEquirect,
    contactShadow,
    groundAlbedo: ground.albedo,
    groundNormal: ground.normal,
    mossAlbedo: moss.albedo,
    mossNormal: moss.normal,
    litterAlbedo: litter.albedo,
    litterNormal: litter.normal,
    bambooAlbedo: bamboo.albedo,
    bambooNormal: bamboo.normal,
    fernLeafMap,
    bambooLeafMap,
    broadLeafMap,
    grassBladeMap,
    understoryLeafMap,
    clayAlbedo: clay.albedo,
    clayNormal: clay.normal,
    dispose: () => {
      for (const tex of all) {
        tex.dispose();
      }
    },
  };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/pond/water.ts">
<![CDATA[import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  MAX_ACTIVE_RIPPLES,
  MAX_SHADER_RIPPLES,
  NATURAL_POND_RX,
  NATURAL_POND_RZ,
  RIPPLE_DURATION,
  RIPPLE_MIN_RADIUS,
  SubmergedObstacle,
  isInsideNaturalPond,
  naturalPondNormalizedRadius,
  pondBedElevation,
  pondContourScale,
  type FoodPellet,
} from './model';
import {
  FloatUniform,
  Vec4Uniform,
  createPondBedMaterial,
  createRippleRingMaterial,
  createSubmergedStoneMaterial,
  createWaterSurfaceMaterial,
} from './materials';
import type { PondQuality, PondTextureSuite } from './textures';

interface RippleSlot {
  active: boolean;
  startElapsed: number;
  x: number;
  z: number;
  maxR: number;
  frozenProgress: number | null;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicNodeMaterial;
  opacityUniform: FloatUniform;
}

export const SUBMERGED_OBSTACLES: readonly SubmergedObstacle[] = [
  { x: -1.42, z: 1.05, r: 0.42 },
  { x: 1.32, z: -0.88, r: 0.4 },
  { x: 0.46, z: 1.92, r: 0.36 },
  { x: -1.18, z: -1.42, r: 0.38 },
  { x: 1.48, z: 1.15, r: 0.38 },
  { x: -0.28, z: -2.42, r: 0.34 },
];

export interface PondWaterRig {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  waterMesh: THREE.Mesh;
  spawnRipple: (
    x: number,
    z: number,
    elapsed: number,
    isPaused: boolean,
    strength?: number,
    showSubtleRing?: boolean,
  ) => boolean;
  syncPellets: (pellets: readonly FoodPellet[], elapsed: number) => void;
  update: (elapsed: number) => void;
  dispose: () => void;
}

function createNaturalBasinGeometry(
  rx: number,
  rz: number,
  angularSegs: number,
  radialSegs: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialSegs; r++) {
    const t = r / radialSegs;
    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const scale = pondContourScale(theta);
      const x = Math.cos(theta) * rx * scale * t;
      const z = Math.sin(theta) * rz * scale * t;
      const y = pondBedElevation(x, z);
      positions.push(x, y, z);
      uvs.push(x * 0.2 + 0.5, z * 0.2 + 0.5);
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialSegs; r++) {
    for (let a = 0; a < angularSegs; a++) {
      const i0 = r * stride + a;
      const i1 = r * stride + (a + 1);
      const i2 = (r + 1) * stride + a;
      const i3 = (r + 1) * stride + (a + 1);
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Water disk in local XY plane (z=0), intended for rotation.x = -Math.PI / 2
 * so local +Z points to world +Y (required by TSL reflector()).
 */
function createNaturalWaterDiskGeometry(
  rx: number,
  rz: number,
  angularSegs: number,
  radialSegs: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialSegs; r++) {
    const t = r / radialSegs;
    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const scale = pondContourScale(theta);
      const wx = Math.cos(theta) * rx * scale * t;
      const wz = Math.sin(theta) * rz * scale * t;
      // Since rotation.x = -PI/2 maps (x, y, 0) -> (x, 0, -y), set local y = -wz
      positions.push(wx, -wz, 0);
      uvs.push(wx / (rx * 2) + 0.5, wz / (rz * 2) + 0.5);
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialSegs; r++) {
    for (let a = 0; a < angularSegs; a++) {
      const i0 = r * stride + a;
      const i1 = r * stride + (a + 1);
      const i2 = (r + 1) * stride + a;
      const i3 = (r + 1) * stride + (a + 1);
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function sculptBoulderGeometry(radius: number, detail: number, seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n1 = Math.sin(v.x * 2.8 + seed) * Math.cos(v.z * 2.4 - seed * 0.6);
    const n2 = Math.cos(v.y * 3.7 + v.x * 2.1 + seed * 1.3);
    const strata = Math.sin(v.y * 6.5 + v.x * 1.4 + seed) * 0.055;
    const disp = 1 + n1 * 0.22 + n2 * 0.13 + strata;
    v.multiplyScalar(disp);
    // Natural flat cleavage plane on upper face & grounded underside
    if (v.y > radius * 0.48) {
      v.y = radius * 0.48 + (v.y - radius * 0.48) * 0.32;
    }
    if (v.y < 0) v.y *= 0.52;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function createPondWaterRig(
  elapsedUniform: FloatUniform,
  textures: PondTextureSuite,
  sunDirection: THREE.Vector3,
  quality: PondQuality,
  isSoftwareGl: boolean,
): PondWaterRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Sculpted concave natural pond bed with river gravel + caustics (tucked inside shore collar)
  const bedGeo = createNaturalBasinGeometry(
    NATURAL_POND_RX * 1.015,
    NATURAL_POND_RZ * 1.015,
    quality === 'desktop' ? 84 : 56,
    quality === 'desktop' ? 18 : 12,
  );
  const bedMat = createPondBedMaterial(textures, elapsedUniform);
  const bedMesh = new THREE.Mesh(bedGeo, bedMat);
  bedMesh.receiveShadow = true;
  group.add(bedMesh);
  disposables.push(bedGeo, bedMat);

  // 2. Varied submerged weathered river stones + pebble clusters (with caustics)
  const subStoneMat = createSubmergedStoneMaterial(textures, elapsedUniform);
  disposables.push(subStoneMat);

  const subStoneSpecs: Array<{
    x: number;
    z: number;
    sx: number;
    sy: number;
    sz: number;
    seed: number;
    rot: number;
  }> = [
    { x: -1.42, z: 1.05, sx: 0.42, sy: 0.22, sz: 0.36, seed: 1.4, rot: 0.4 },
    { x: 1.32, z: -0.88, sx: 0.38, sy: 0.2, sz: 0.32, seed: 2.8, rot: 1.7 },
    { x: 0.46, z: 1.92, sx: 0.35, sy: 0.18, sz: 0.29, seed: 4.1, rot: 2.3 },
    { x: -1.18, z: -1.42, sx: 0.36, sy: 0.19, sz: 0.3, seed: 5.5, rot: 0.9 },
    { x: 1.48, z: 1.15, sx: 0.38, sy: 0.2, sz: 0.3, seed: 6.7, rot: 2.9 },
    { x: -0.28, z: -2.42, sx: 0.32, sy: 0.18, sz: 0.28, seed: 8.2, rot: 1.1 },
    // Shallow left-edge submerged stepping ledges bridging bank boulders into clear turquoise water
    { x: -1.96, z: 1.88, sx: 0.44, sy: 0.17, sz: 0.36, seed: 9.4, rot: 0.3 },
    { x: -1.78, z: 2.65, sx: 0.38, sy: 0.15, sz: 0.32, seed: 10.7, rot: 2.1 },
    { x: -1.92, z: 0.12, sx: 0.4, sy: 0.18, sz: 0.34, seed: 11.9, rot: 1.5 },
    { x: 2.38, z: 0.48, sx: 0.32, sy: 0.16, sz: 0.28, seed: 13.1, rot: 2.6 },
    { x: 2.12, z: 0.92, sx: 0.28, sy: 0.14, sz: 0.24, seed: 16.2, rot: 0.9 },
    { x: 0.88, z: -2.85, sx: 0.3, sy: 0.15, sz: 0.26, seed: 14.3, rot: 0.7 },
    { x: -0.85, z: 2.85, sx: 0.32, sy: 0.15, sz: 0.26, seed: 15.6, rot: 1.9 },
  ];

  subStoneSpecs.forEach((spec) => {
    const geo = sculptBoulderGeometry(1, 2, spec.seed);
    const mesh = new THREE.Mesh(geo, subStoneMat);
    const baseBedY = pondBedElevation(spec.x, spec.z);
    mesh.position.set(spec.x, baseBedY + spec.sy * 0.35, spec.z);
    mesh.scale.set(spec.sx, spec.sy, spec.sz);
    mesh.rotation.set(0.05, spec.rot, -0.04);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
    disposables.push(geo);
  });

  // 3. TSL Shader ripple ring buffer uniforms
  const rippleUniforms: Vec4Uniform[] = [];
  for (let i = 0; i < MAX_SHADER_RIPPLES; i++) {
    rippleUniforms.push(uniform(new THREE.Vector4(0, 0, -999, 0)));
  }
  let nextShaderRippleIdx = 0;

  // 4. Real-time physical water surface mesh (refraction + depth absorption + dual normals + planar reflection)
  const waterGeo = createNaturalWaterDiskGeometry(
    NATURAL_POND_RX * 1.02,
    NATURAL_POND_RZ * 1.02,
    quality === 'desktop' ? 84 : 56,
    quality === 'desktop' ? 22 : 14,
  );
  const usePlanarReflector = true;
  const reflectionScale = isSoftwareGl ? 0.38 : quality === 'desktop' ? 0.62 : 0.45;
  const waterMatHandle = createWaterSurfaceMaterial(
    textures,
    elapsedUniform,
    rippleUniforms,
    sunDirection,
    usePlanarReflector,
    reflectionScale,
  );

  const waterMesh = new THREE.Mesh(waterGeo, waterMatHandle.material);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = 0;
  waterMesh.renderOrder = 2;
  if (waterMatHandle.reflectorTarget) {
    waterMesh.add(waterMatHandle.reflectorTarget);
  }
  group.add(waterMesh);
  disposables.push(waterGeo, waterMatHandle.material);

  // 5. Raycast hit plane (invisible)
  const hitGeo = new THREE.PlaneGeometry(NATURAL_POND_RX * 2.4, NATURAL_POND_RZ * 2.4);
  hitGeo.rotateX(-Math.PI / 2);
  const hitMat = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
    colorWrite: false,
  });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.y = 0;
  hitMesh.visible = true;
  group.add(hitMesh);
  disposables.push(hitGeo, hitMat);

  // 6. Subtle paper sheen rings for user click emphasis (soft, never cartoony)
  const ringGeo = new THREE.RingGeometry(0.92, 1.0, 48);
  ringGeo.rotateX(-Math.PI / 2);
  disposables.push(ringGeo);

  const slots: RippleSlot[] = [];
  let nextSlotIndex = 0;

  for (let i = 0; i < MAX_ACTIVE_RIPPLES; i++) {
    const opacityUniform = uniform(0);
    const ringMat = createRippleRingMaterial(opacityUniform);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.012 + i * 0.001;
    ringMesh.visible = false;
    ringMesh.renderOrder = 3;
    group.add(ringMesh);
    disposables.push(ringMat);

    slots.push({
      active: false,
      startElapsed: 0,
      x: 0,
      z: 0,
      maxR: 0.5,
      frozenProgress: null,
      mesh: ringMesh,
      material: ringMat,
      opacityUniform,
    });
  }

  // 7. Reusable floating koi food pellet meshes
  const pelletGeo = new THREE.SphereGeometry(0.036, 10, 8);
  const pelletMat = new THREE.MeshStandardNodeMaterial({
    color: 0xc28a4f,
    roughness: 0.72,
    metalness: 0.02,
  });
  const maxPelletMeshes = 8;
  const pelletMeshes: THREE.Mesh[] = [];
  for (let i = 0; i < maxPelletMeshes; i++) {
    const pm = new THREE.Mesh(pelletGeo, pelletMat);
    pm.visible = false;
    pm.renderOrder = 3;
    group.add(pm);
    pelletMeshes.push(pm);
  }
  disposables.push(pelletGeo, pelletMat);

  const updateSlot = (slot: RippleSlot, elapsed: number) => {
    if (!slot.active) {
      slot.mesh.visible = false;
      return;
    }

    const progress =
      slot.frozenProgress !== null
        ? slot.frozenProgress
        : (elapsed - slot.startElapsed) / RIPPLE_DURATION;

    if (progress < 0 || progress >= 1) {
      slot.active = false;
      slot.frozenProgress = null;
      slot.mesh.visible = false;
      slot.opacityUniform.value = 0;
      return;
    }

    const eased = 1 - Math.pow(1 - progress, 2.2);
    const radius = RIPPLE_MIN_RADIUS + (slot.maxR - RIPPLE_MIN_RADIUS) * eased;
    slot.mesh.scale.set(radius, 1, radius);
    slot.opacityUniform.value = Math.pow(1 - progress, 1.55) * 0.22;
    slot.mesh.visible = true;
  };

  const spawnRipple = (
    x: number,
    z: number,
    elapsed: number,
    isPaused: boolean,
    strength = 1.0,
    showSubtleRing = true,
  ): boolean => {
    if (!isInsideNaturalPond({ x, z })) {
      return false;
    }

    // Feed directly into physical normal-perturbing shader ripple buffer
    const slotUniform = rippleUniforms[nextShaderRippleIdx];
    nextShaderRippleIdx = (nextShaderRippleIdx + 1) % MAX_SHADER_RIPPLES;
    const effectiveStart = isPaused ? elapsed - 0.35 : elapsed;
    slotUniform.value.set(x, z, effectiveStart, Math.max(0.15, Math.min(1.4, strength)));

    if (!showSubtleRing) return true;

    const rho = naturalPondNormalizedRadius({ x, z });
    const allowedMax = Math.max(0, Math.min(0.85, 0.9 * Math.min(NATURAL_POND_RX, NATURAL_POND_RZ) * (1 - rho)));
    if (allowedMax <= RIPPLE_MIN_RADIUS) {
      return true;
    }

    const slot = slots[nextSlotIndex];
    nextSlotIndex = (nextSlotIndex + 1) % MAX_ACTIVE_RIPPLES;

    slot.active = true;
    slot.x = x;
    slot.z = z;
    slot.maxR = allowedMax * Math.min(1, 0.55 + strength * 0.45);

    if (isPaused) {
      slot.frozenProgress = 0.28;
      slot.startElapsed = elapsed - slot.frozenProgress * RIPPLE_DURATION;
    } else {
      slot.frozenProgress = null;
      slot.startElapsed = elapsed;
    }

    slot.mesh.position.set(x, 0.012, z);
    slot.mesh.visible = true;
    updateSlot(slot, elapsed);
    return true;
  };

  const syncPellets = (pellets: readonly FoodPellet[], elapsed: number) => {
    const active = pellets.filter((p) => !p.eaten);
    for (let i = 0; i < maxPelletMeshes; i++) {
      const pm = pelletMeshes[i];
      const p = active[i];
      if (!p) {
        pm.visible = false;
      } else {
        pm.visible = true;
        const bob = Math.sin(elapsed * 3.8 + p.id * 1.3) * 0.004;
        pm.position.set(p.x, 0.008 + bob, p.z);
        pm.scale.set(1, 0.72, 1);
      }
    }
  };

  const update = (elapsed: number) => {
    for (const slot of slots) {
      if (slot.active) {
        if (
          slot.frozenProgress !== null &&
          elapsed > slot.startElapsed + slot.frozenProgress * RIPPLE_DURATION + 1e-4
        ) {
          slot.startElapsed = elapsed - slot.frozenProgress * RIPPLE_DURATION;
          slot.frozenProgress = null;
        }
        updateSlot(slot, elapsed);
      }
    }
  };

  const dispose = () => {
    for (const d of disposables) {
      d.dispose();
    }
  };

  return { group, hitMesh, waterMesh, spawnRipple, syncPellets, update, dispose };
}
]]>
    </file>
  </files>
</template>
