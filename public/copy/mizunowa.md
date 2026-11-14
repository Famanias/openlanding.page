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
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import "./mizunowa/mizunowa.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-mnw-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-mnw-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mnw-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`scroll-smooth ${newsreader.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
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
  --mnw-font-serif: var(--font-mnw-serif, 'Newsreader', Georgia, "Yu Mincho", "Hiragino Mincho ProN", serif);
  --mnw-font-sans: var(--font-mnw-sans, 'Manrope', -apple-system, BlinkMacSystemFont, "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif);
  --mnw-font-mono: var(--font-mnw-mono, 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace);

  /* Layout */
  --mnw-max-width: 1600px;
  --mnw-gutter: 24px;
  --mnw-margin: 48px;
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
  font-size: clamp(38px, 4.5vw, 66px);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.02em;
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
  min-height: max(680px, 100svh);
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
  max-width: 720px;
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
  padding-right: 6px;
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
    min-height: max(610px, 100svh);
  }

  .mnw-hero-foreground {
    display: flex;
    padding-top: 84px;
    padding-bottom: 18px;
  }

  .mnw-hero-copy {
    max-width: 580px;
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

/* ==========================================================================
   Below the hero: shared pieces
   ========================================================================== */
:root {
  --mnw-shore-h: clamp(48px, 6.6vw, 96px);
}

section[id] {
  scroll-margin-top: 84px;
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

.mnw-surface-dark .mnw-chapter-label {
  color: var(--mnw-sakura);
}

.mnw-lead {
  margin: 0;
  max-width: 46ch;
  color: color-mix(in srgb, currentColor 86%, transparent);
}

.mnw-section-head {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  margin-bottom: 56px;
}

.mnw-section-head-left {
  grid-column: 1 / span 7;
}

.mnw-section-head-right {
  grid-column: 9 / span 4;
  align-self: end;
}

@media (max-width: 1024px) {
  .mnw-section-head {
    margin-bottom: 40px;
  }

  .mnw-section-head-left,
  .mnw-section-head-right {
    grid-column: 1 / -1;
  }
}

/* Content that only makes sense with or without scripting, decided before first paint */
.mnw-nojs-only {
  display: none;
}

@media (scripting: none) {
  .mnw-nojs-only {
    display: block;
  }

  .mnw-scripted {
    display: none !important;
  }
}

/* Headings split into masked words (SplitWords inside Reveal variant="words") */
.mnw-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0.08em 0 0.16em;
  margin: -0.08em 0 -0.16em;
}

.mnw-word > span {
  display: inline-block;
}

.mnw-word-accent {
  color: var(--mnw-sakura);
}

html.mnw-js .mnw-reveal[data-reveal="words"] .mnw-word > span {
  transition: transform 1000ms var(--mnw-ease-out);
  transition-delay: calc(var(--mnw-delay, 0ms) + var(--i, 0) * 60ms);
}

html.mnw-js .mnw-reveal[data-reveal="words"]:not(.is-visible) .mnw-word > span {
  transform: translateY(112%);
}

@keyframes mnw-ping {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }

  80%,
  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}

@keyframes mnw-ring {
  0% {
    transform: scale(0.15);
    opacity: 0;
  }

  15% {
    opacity: 0.8;
  }

  100% {
    transform: scale(1.7);
    opacity: 0;
  }
}

/* Shoreline: the curved water's edge between two grounds */
.mnw-shore {
  --shore-from: var(--mnw-pond);
  --shore-to: var(--mnw-paper);
  position: relative;
  z-index: 2;
  height: var(--mnw-shore-h);
  margin-bottom: -1px;
  background-color: var(--shore-from);
  pointer-events: none;
}

/* Laid over the end of the section before it, so that section's scene runs right up to the shore */
.mnw-shore.is-overlap {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(1px - var(--mnw-shore-h));
  margin: 0;
  background-color: transparent;
}

.mnw-shore svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.mnw-shore.is-flipped svg {
  transform: scaleX(-1);
}

.mnw-shore-fill {
  fill: var(--shore-to);
}

.mnw-shore-line {
  fill: none;
  stroke: var(--shore-to);
  stroke-opacity: 0.5;
  stroke-width: 1.2;
  vector-effect: non-scaling-stroke;
}

.mnw-shore-line-far {
  stroke-opacity: 0.22;
}

.mnw-shore-from-paper {
  --shore-from: var(--mnw-paper);
}

.mnw-shore-from-moss {
  --shore-from: var(--mnw-moss);
}

.mnw-shore-to-pond {
  --shore-to: var(--mnw-pond);
}

.mnw-shore-to-moss {
  --shore-to: var(--mnw-moss);
}

/* ==========================================================================
   01 Koi: a pond of field notes
   ========================================================================== */
.mnw-koi {
  position: relative;
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  padding-top: 150px;
  /* The seam rings grow wider than a phone; clip them sideways but let them rise over the hero */
  overflow-x: clip;
}

/* Fades the lower edge of the hero scene into the pond ground, beneath the hero copy */
.mnw-koi::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -150px;
  height: 150px;
  z-index: 2;
  background: linear-gradient(to bottom, transparent, var(--mnw-pond));
  pointer-events: none;
}

.mnw-seam {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
  width: min(900px, 92vw);
  transform: translate(-50%, -50%) scale(calc(0.3 + var(--seam, 1) * 0.85));
  opacity: calc(var(--seam, 1) * 0.9);
  pointer-events: none;
}

.mnw-seam svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.mnw-seam ellipse {
  stroke: var(--mnw-stone);
  stroke-width: 1.2;
  stroke-opacity: 0.16;
  vector-effect: non-scaling-stroke;
}

.mnw-seam ellipse:nth-child(2) {
  stroke-opacity: 0.26;
}

.mnw-seam ellipse:nth-child(3) {
  stroke-opacity: 0.4;
}

.mnw-seam ellipse:nth-child(4) {
  stroke-opacity: 0.6;
}

.mnw-koi-head {
  position: relative;
  z-index: 3;
}

/* The water starts behind the heading, so the title reads as sitting on the pond */
.mnw-koi-stage {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(640px, 86vh, 860px);
  margin-top: -130px;
}

.mnw-koi-water {
  position: absolute;
  inset: 0;
}

/* Sunlit patch in the open water */
.mnw-koi-water::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 58% 60% at 36% 52%,
    color-mix(in srgb, var(--mnw-leaf) 36%, transparent),
    transparent 72%
  );
  pointer-events: none;
}

.mnw-koi-canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 18%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 18%);
}

.mnw-koi-hint {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(var(--mnw-shore-h) + 22px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 20px;
  pointer-events: none;
}

.mnw-koi-hint p {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  color: color-mix(in srgb, var(--mnw-stone) 90%, transparent);
  text-transform: uppercase;
}

.mnw-koi-hint-ring {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--mnw-sakura);
  animation: mnw-ping 2.4s var(--mnw-ease-out) infinite;
}

.mnw-chip {
  min-height: 44px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--mnw-stone) 40%, transparent);
  background-color: color-mix(in srgb, var(--mnw-pond) 82%, transparent);
  color: var(--mnw-paper);
  font-family: var(--mnw-font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  transition:
    border-color var(--mnw-fast) var(--mnw-ease-out),
    background-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-chip:hover {
  border-color: var(--mnw-sakura);
  background-color: var(--mnw-moss);
}

.mnw-chip:active {
  transform: scale(0.97);
}

.mnw-koi-notes-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  padding-top: 32px;
  padding-bottom: calc(var(--mnw-shore-h) + 40px);
  pointer-events: none;
}

.mnw-koi-notes-wrap > div {
  width: min(100%, 400px);
}

.mnw-koi-notes {
  list-style: none;
  margin: 0;
  padding: 6px 24px;
  border: 1px solid color-mix(in srgb, var(--mnw-stone) 22%, transparent);
  border-radius: 8px;
  background-color: color-mix(in srgb, var(--mnw-pond) 92%, transparent);
  pointer-events: auto;
}

.mnw-koi-notes li + li {
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 16%, transparent);
}

.mnw-koi-note {
  display: block;
  width: 100%;
  padding: 18px 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.mnw-koi-note-top {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 10px;
}

.mnw-koi-note-num {
  color: var(--mnw-sakura);
}

.mnw-koi-note-name {
  font-family: var(--mnw-font-serif);
  font-size: 26px;
  line-height: 1.15;
  transition: transform var(--mnw-base) var(--mnw-ease-out);
}

.mnw-koi-note:hover .mnw-koi-note-name,
.mnw-koi-note.is-selected .mnw-koi-note-name {
  transform: translateX(6px);
}

.mnw-koi-note-line {
  align-self: center;
}

.mnw-koi-note-more {
  display: grid;
  grid-template-rows: 1fr;
}

.mnw-koi-note-more-inner {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 0;
  overflow: hidden;
  padding-left: 38px;
}

.mnw-koi-note-figure {
  margin-top: 10px;
}

.mnw-koi-note-figure svg {
  display: block;
  width: 150px;
  height: auto;
  margin-left: -8px;
}

.mnw-koi-note-pattern {
  font-size: 14px;
  line-height: 20px;
  color: var(--mnw-sakura);
}

.mnw-koi-note-caption {
  font-size: 15px;
  line-height: 23px;
  color: color-mix(in srgb, var(--mnw-paper) 88%, transparent);
}

.mnw-koi-note-linecopy {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed color-mix(in srgb, var(--mnw-stone) 26%, transparent);
  font-size: 14px;
  line-height: 21px;
  color: color-mix(in srgb, var(--mnw-stone) 94%, transparent);
}

.mnw-koi-note-linecopy .mnw-mono {
  flex-shrink: 0;
  color: var(--mnw-sakura);
  text-transform: uppercase;
}

/* With scripting, a note stays folded until its koi is picked */
@media (scripting: enabled) {
  .mnw-koi-note-more {
    grid-template-rows: 0fr;
    transition: grid-template-rows 520ms var(--mnw-ease-out);
  }

  .mnw-koi-note-more-inner {
    opacity: 0;
    transition: opacity 320ms var(--mnw-ease-out);
  }

  .mnw-koi-note.is-selected .mnw-koi-note-more {
    grid-template-rows: 1fr;
  }

  .mnw-koi-note.is-selected .mnw-koi-note-more-inner {
    opacity: 1;
    transition-delay: 120ms;
  }
}

@media (scripting: none) {
  .mnw-koi-water {
    display: none;
  }

  .mnw-koi-stage {
    min-height: 0;
    margin-top: 0;
  }

  .mnw-koi-notes-wrap > div {
    width: 100%;
  }
}

@media (max-width: 899px) {
  .mnw-koi {
    padding-top: 110px;
  }

  .mnw-koi-stage {
    display: block;
    min-height: 0;
    margin-top: -40px;
  }

  .mnw-koi-water {
    position: relative;
    inset: auto;
    height: 460px;
  }

  .mnw-koi-hint {
    bottom: 16px;
  }

  .mnw-koi-notes-wrap {
    display: block;
    padding-top: 8px;
    padding-bottom: calc(var(--mnw-shore-h) + 48px);
  }

  .mnw-koi-notes-wrap > div {
    width: 100%;
  }

  .mnw-koi-note-name {
    font-size: 23px;
  }
}

/* ==========================================================================
   02 The walk: a map that is walked by scrolling
   ========================================================================== */
.mnw-walk {
  position: relative;
  padding-bottom: 120px;
}

.mnw-walk > .mnw-container {
  padding-top: 64px;
}

.mnw-walk-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
}

.mnw-walk-map-col {
  grid-column: 1 / span 7;
  position: sticky;
  top: 108px;
}

.mnw-walk-map-frame {
  position: relative;
  width: min(100%, calc((100vh - 156px) * 4 / 3));
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--mnw-stone);
  border-radius: 8px;
  background-color: var(--mnw-paper);
}

.mnw-walk-camera {
  position: absolute;
  inset: 0;
  transform-origin: 50% 50%;
}

.mnw-walk-map-art {
  display: block;
  width: 100%;
  height: 100%;
}

.mnw-walk-route-drawn {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

/* A ring opening on the pond */
.mnw-walk-pulse {
  position: absolute;
  left: 49.2%;
  top: 55%;
  width: 9%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.mnw-walk-pulse::before,
.mnw-walk-pulse::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--mnw-paper) 72%, transparent);
  animation: mnw-ring 4.8s linear infinite;
}

.mnw-walk-pulse::after {
  animation-delay: -2.4s;
}

.mnw-walk-walker {
  display: none;
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

[data-live] .mnw-walk-walker {
  display: block;
}

.mnw-walk-walker span,
.mnw-walk-walker::after {
  content: "";
  position: absolute;
  left: -9px;
  top: -9px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.mnw-walk-walker span {
  border: 4px solid var(--mnw-vermilion);
  background-color: var(--mnw-porcelain);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--mnw-pond) 34%, transparent);
}

.mnw-walk-walker::after {
  border: 1px solid var(--mnw-vermilion);
  animation: mnw-ping 2s var(--mnw-ease-out) infinite;
}

.mnw-walk-marker {
  position: absolute;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}

.mnw-walk-marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--mnw-vermilion);
  background-color: var(--mnw-paper);
  transition:
    transform var(--mnw-base) var(--mnw-ease-out),
    background-color var(--mnw-base) var(--mnw-ease-out),
    box-shadow var(--mnw-base) var(--mnw-ease-out);
}

.mnw-walk-marker.is-reached .mnw-walk-marker-dot {
  background-color: var(--mnw-vermilion);
}

[data-live] .mnw-walk-marker.is-active .mnw-walk-marker-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--mnw-vermilion) 22%, transparent);
}

.mnw-walk-marker:hover .mnw-walk-marker-dot {
  transform: scale(1.4);
}

.mnw-walk-marker-label {
  position: absolute;
  padding: 3px 8px;
  border: 1px solid var(--mnw-stone);
  border-radius: 4px;
  background-color: var(--mnw-paper);
  color: var(--mnw-pond);
  white-space: nowrap;
  transition: opacity var(--mnw-base) var(--mnw-ease-out);
}

.mnw-walk-marker-east .mnw-walk-marker-label {
  left: 40px;
}

.mnw-walk-marker-north .mnw-walk-marker-label {
  bottom: 40px;
}

.mnw-walk-marker-south .mnw-walk-marker-label {
  top: 40px;
}

[data-live] .mnw-walk-marker:not(.is-reached) .mnw-walk-marker-label {
  opacity: 0;
}

.mnw-walk-count {
  position: absolute;
  left: 14px;
  top: 14px;
  display: none;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid var(--mnw-stone);
  border-radius: 4px;
  background-color: var(--mnw-paper);
  color: var(--mnw-pond);
  text-transform: uppercase;
}

[data-live] .mnw-walk-count {
  display: inline-flex;
}

.mnw-walk-count-window {
  display: inline-block;
  height: 18px;
  overflow: hidden;
}

.mnw-walk-count-reel {
  display: flex;
  flex-direction: column;
  color: var(--mnw-vermilion);
  transform: translateY(calc(var(--active, 0) * -18px));
  transition: transform 520ms var(--mnw-ease-out);
}

.mnw-walk-count-reel span {
  height: 18px;
}

.mnw-walk-stops-col {
  grid-column: 9 / span 4;
  position: relative;
  padding-left: 36px;
}

.mnw-walk-rail {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--mnw-stone);
}

.mnw-walk-rail-fill {
  position: absolute;
  left: -0.5px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--mnw-vermilion);
  transform-origin: top;
}

.mnw-walk-stops {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mnw-walk-stop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 62vh;
  transition: opacity 520ms var(--mnw-ease-out);
}

[data-live] .mnw-walk-stop:not(.is-active) {
  opacity: 0.4;
}

.mnw-walk-stop-meta {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 14px;
  color: var(--mnw-leaf);
  text-transform: uppercase;
}

.mnw-walk-stop-num {
  color: var(--mnw-vermilion);
}

.mnw-walk-stop-meta .mnw-ja {
  font-size: 16px;
  letter-spacing: 0;
  color: var(--mnw-pond);
}

.mnw-walk-stop-title {
  margin: 0 0 16px;
  font-family: var(--mnw-font-serif);
  font-size: clamp(34px, 3.4vw, 50px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.015em;
}

.mnw-walk-stop-desc {
  margin: 0 0 22px;
  max-width: 34ch;
  color: color-mix(in srgb, var(--mnw-ink) 86%, transparent);
}

.mnw-walk-stop-notice {
  display: flex;
  align-items: baseline;
  gap: 12px;
  max-width: 38ch;
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid var(--mnw-stone);
  font-size: 15px;
  line-height: 23px;
  color: var(--mnw-leaf);
}

.mnw-walk-stop-notice .mnw-mono {
  flex-shrink: 0;
  color: var(--mnw-vermilion);
  text-transform: uppercase;
}

@media (max-width: 899px) {
  .mnw-walk {
    padding-bottom: 72px;
  }

  .mnw-walk > .mnw-container {
    padding-top: 40px;
  }

  .mnw-walk-map-col {
    grid-column: 1 / -1;
    top: 64px;
    z-index: 2;
    margin: 0 calc(var(--mnw-margin) * -1);
    padding: 10px var(--mnw-margin) 12px;
    border-bottom: 1px solid var(--mnw-stone);
    background-color: var(--mnw-paper);
  }

  .mnw-walk-map-frame {
    width: min(100%, calc(40svh * 4 / 3));
    margin-inline: auto;
  }

  /* The map is small here and each stop is named directly beneath it */
  .mnw-walk-marker-label {
    display: none;
  }

  .mnw-walk-stops-col {
    grid-column: 1 / -1;
    padding-left: 24px;
  }

  .mnw-walk-stop {
    min-height: 46svh;
  }
}

/* ==========================================================================
   03 The seasons: one view of the garden, four kinds of light
   ========================================================================== */
.mnw-seasons {
  position: relative;
}

.mnw-seasons-head {
  padding-top: 64px;
  padding-bottom: 72px;
}

.mnw-statement {
  margin: 0;
  font-family: var(--mnw-font-serif);
  font-size: clamp(36px, 5.6vw, 84px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--mnw-paper);
}

.mnw-statement-line {
  display: block;
}

/* Each word lights as --p (scroll progress) passes its place in the sentence; unset, every word is lit */
.mnw-statement-word {
  opacity: clamp(0.26, calc(0.26 + (var(--p, 1) * (var(--n) + 1) - var(--i)) * 0.74), 1);
}

.mnw-statement-word.is-accent {
  color: var(--mnw-sakura);
}

.mnw-season-band {
  --px: 0;
  --py: 0;
  position: relative;
  display: flex;
  min-height: clamp(620px, 90vh, 900px);
  overflow: hidden;
}

.mnw-season-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background-color: var(--mnw-pond);
}

.mnw-scene,
.mnw-season-wipe {
  position: absolute;
  inset: 0;
}

.mnw-scene-layer {
  position: absolute;
  left: -4%;
  top: -4%;
  display: block;
  width: 108%;
  height: 108%;
  transform: translate3d(calc(var(--px) * var(--d) * -1px), calc(var(--py) * var(--d) * -0.5px), 0);
}

.mnw-season-wave {
  background-color: color-mix(in srgb, var(--mnw-paper) 18%, transparent);
}

.mnw-season-ring {
  background-color: color-mix(in srgb, var(--mnw-paper) 76%, transparent);
}

.mnw-season-air {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Keeps the note legible on the left and eases the scene in from the moss ground above */
.mnw-season-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, var(--mnw-moss) 0, transparent 13%),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--mnw-pond) 94%, transparent) 0%,
      color-mix(in srgb, var(--mnw-pond) 80%, transparent) 24%,
      color-mix(in srgb, var(--mnw-pond) 34%, transparent) 44%,
      transparent 60%
    );
  pointer-events: none;
}

.mnw-season-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  padding-top: 110px;
  padding-bottom: calc(var(--mnw-shore-h) + 56px);
  pointer-events: none;
}

.mnw-season-content > * {
  max-width: 460px;
  pointer-events: auto;
}

/* Holds the picker still while notes of different lengths swap */
.mnw-season-note {
  min-height: 340px;
}

.mnw-season-kicker {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 0 0 10px;
  color: var(--mnw-sakura);
  text-transform: uppercase;
}

.mnw-season-kicker .mnw-ja {
  font-size: 20px;
  letter-spacing: 0;
}

.mnw-season-name {
  margin: 0 0 18px;
  font-family: var(--mnw-font-serif);
  font-size: clamp(64px, 8vw, 120px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--mnw-porcelain);
}

.mnw-season-summary {
  margin: 0 0 12px;
  font-family: var(--mnw-font-serif);
  font-size: 24px;
  line-height: 1.25;
  color: var(--mnw-paper);
}

.mnw-season-detail {
  margin: 0 0 18px;
  font-size: 16px;
  line-height: 26px;
  color: color-mix(in srgb, var(--mnw-paper) 88%, transparent);
}

.mnw-season-light {
  display: flex;
  gap: 12px;
  margin: 0;
  padding-top: 14px;
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 28%, transparent);
  color: var(--mnw-stone);
  text-transform: uppercase;
}

.mnw-season-light span {
  color: var(--mnw-sakura);
}

.mnw-season-picker {
  display: flex;
  gap: 20px;
}

.mnw-season-pick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: 0;
  background: none;
  color: color-mix(in srgb, var(--mnw-paper) 82%, transparent);
  font-family: var(--mnw-font-sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-season-seal {
  position: relative;
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--mnw-paper) 46%, transparent);
  background-color: color-mix(in srgb, var(--mnw-pond) 62%, transparent);
  color: var(--mnw-paper);
  font-size: 26px;
  letter-spacing: 0;
  transition:
    background-color var(--mnw-base) var(--mnw-ease-out),
    color var(--mnw-base) var(--mnw-ease-out),
    border-color var(--mnw-fast) var(--mnw-ease-out),
    transform var(--mnw-fast) var(--mnw-ease-out);
}

/* The chosen season wears a ring of water */
.mnw-season-seal::after {
  content: "";
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  border: 1px solid var(--mnw-sakura);
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity var(--mnw-base) var(--mnw-ease-out),
    transform var(--mnw-base) var(--mnw-ease-out);
}

.mnw-season-pick:hover .mnw-season-seal {
  border-color: var(--mnw-paper);
  transform: translateY(-2px);
}

.mnw-season-pick.is-checked {
  color: var(--mnw-porcelain);
}

.mnw-season-pick.is-checked .mnw-season-seal {
  border-color: var(--mnw-paper);
  background-color: var(--mnw-paper);
  color: var(--mnw-pond);
}

.mnw-season-pick.is-checked .mnw-season-seal::after {
  opacity: 1;
  transform: scale(1);
}

.mnw-season-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin: 0;
  padding: 40px 0 calc(var(--mnw-shore-h) + 40px);
}

.mnw-season-list dt {
  font-family: var(--mnw-font-serif);
  font-size: 26px;
  line-height: 1.2;
}

.mnw-season-list dd {
  margin: 8px 0 0;
  font-size: 16px;
  line-height: 26px;
  color: color-mix(in srgb, var(--mnw-paper) 88%, transparent);
}

/* Below this width the tree would sit under the note, so the scene stacks above it instead */
@media (max-width: 1099px) {
  .mnw-seasons-head {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .mnw-season-band {
    display: block;
    min-height: 0;
    overflow: visible;
    background-color: var(--mnw-moss);
  }

  .mnw-season-stage {
    position: relative;
    inset: auto;
    aspect-ratio: 4 / 3;
  }

  .mnw-season-scrim {
    background: linear-gradient(to bottom, var(--mnw-moss) 0, transparent 14%, transparent 82%, var(--mnw-moss) 100%);
  }

  .mnw-season-content {
    gap: 28px;
    padding-top: 20px;
    padding-bottom: calc(var(--mnw-shore-h) + 56px);
  }

  .mnw-season-note {
    min-height: 300px;
  }

  .mnw-season-picker {
    gap: 14px;
  }

  .mnw-season-seal {
    width: 56px;
    height: 56px;
    font-size: 23px;
  }

  .mnw-season-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 700px) and (max-width: 1099px) {
  .mnw-season-stage {
    aspect-ratio: 16 / 9;
  }
}

/* ==========================================================================
   Questions
   ========================================================================== */
.mnw-questions {
  position: relative;
  padding-bottom: 120px;
}

.mnw-faq-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--mnw-gutter);
  align-items: start;
  padding-top: 64px;
}

.mnw-faq-head {
  grid-column: 1 / span 4;
  position: sticky;
  top: 120px;
}

.mnw-faq-lead {
  margin-top: 22px;
  max-width: 30ch;
}

.mnw-faq-list {
  grid-column: 6 / span 7;
  border-top: 1px solid var(--mnw-stone);
}

.mnw-faq-item {
  border-bottom: 1px solid var(--mnw-stone);
  interpolate-size: allow-keywords;
}

/* Where the browser can animate to an intrinsic height, the answer eases open */
.mnw-faq-item::details-content {
  block-size: 0;
  overflow: clip;
  transition:
    block-size 480ms var(--mnw-ease-out),
    content-visibility 480ms allow-discrete;
}

.mnw-faq-item[open]::details-content {
  block-size: auto;
}

.mnw-faq-summary {
  list-style: none;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 60px;
  padding: 24px 4px;
  color: var(--mnw-ink);
  cursor: pointer;
}

.mnw-faq-summary::-webkit-details-marker {
  display: none;
}

.mnw-faq-num {
  color: var(--mnw-leaf);
  transition: color var(--mnw-fast) var(--mnw-ease-out);
}

.mnw-faq-question {
  font-family: var(--mnw-font-serif);
  font-size: clamp(21px, 1.9vw, 27px);
  line-height: 1.25;
  transition: transform var(--mnw-base) var(--mnw-ease-out);
}

.mnw-faq-summary:hover .mnw-faq-question {
  transform: translateX(8px);
}

.mnw-faq-summary:hover .mnw-faq-num,
.mnw-faq-item[open] .mnw-faq-num {
  color: var(--mnw-vermilion);
}

/* A ring that fills when its answer is open; the plus settles into a minus */
.mnw-faq-ring {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--mnw-vermilion);
  transition: background-color var(--mnw-base) var(--mnw-ease-out);
}

.mnw-faq-ring::before,
.mnw-faq-ring::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 1.5px;
  margin: -0.75px 0 0 -5px;
  background-color: var(--mnw-vermilion);
  transition:
    transform var(--mnw-base) var(--mnw-ease-out),
    background-color var(--mnw-base) var(--mnw-ease-out);
}

.mnw-faq-ring::after {
  transform: rotate(90deg);
}

.mnw-faq-item[open] .mnw-faq-ring {
  background-color: var(--mnw-vermilion);
}

.mnw-faq-item[open] .mnw-faq-ring::before,
.mnw-faq-item[open] .mnw-faq-ring::after {
  background-color: var(--mnw-porcelain);
}

.mnw-faq-item[open] .mnw-faq-ring::after {
  transform: rotate(0deg);
}

.mnw-faq-answer {
  max-width: 62ch;
  margin: 0;
  padding: 0 4px 26px 52px;
  color: color-mix(in srgb, var(--mnw-ink) 86%, transparent);
}

@media (max-width: 899px) {
  .mnw-questions {
    padding-bottom: 72px;
  }

  .mnw-faq-grid {
    padding-top: 40px;
  }

  .mnw-faq-head,
  .mnw-faq-list {
    grid-column: 1 / -1;
  }

  .mnw-faq-head {
    position: static;
    margin-bottom: 20px;
  }

  .mnw-faq-summary {
    grid-template-columns: 28px minmax(0, 1fr) auto;
    gap: 10px;
    padding: 20px 0;
  }

  .mnw-faq-answer {
    padding: 0 0 22px 38px;
  }
}

/* ==========================================================================
   Finale: a simple route
   ========================================================================== */
.mnw-finale {
  position: relative;
  overflow: hidden;
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  text-align: center;
}

.mnw-finale-rings {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mnw-finale-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 96px;
  padding-bottom: 150px;
}

.mnw-finale-title {
  max-width: 13ch;
  font-size: clamp(44px, 6.4vw, 96px);
  line-height: 1;
  letter-spacing: -0.025em;
}

.mnw-finale-lead {
  max-width: 46ch;
  margin: 28px auto 0;
}

.mnw-finale-steps {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 56px 0 52px;
  padding: 0;
}

.mnw-finale-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 0 46px;
}

/* Dashed path between one step and the next */
.mnw-finale-step + .mnw-finale-step::before {
  content: "";
  position: absolute;
  left: -34px;
  top: 28px;
  width: 68px;
  border-top: 1px dashed color-mix(in srgb, var(--mnw-stone) 52%, transparent);
}

.mnw-finale-step-ring {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--mnw-stone) 60%, transparent);
  background-color: color-mix(in srgb, var(--mnw-pond) 84%, transparent);
  color: var(--mnw-sakura);
  transition:
    transform var(--mnw-base) var(--mnw-ease-out),
    border-color var(--mnw-base) var(--mnw-ease-out),
    background-color var(--mnw-base) var(--mnw-ease-out);
}

.mnw-finale-step:hover .mnw-finale-step-ring {
  transform: scale(1.1);
  border-color: var(--mnw-sakura);
  background-color: var(--mnw-moss);
}

.mnw-finale-step-label {
  font-family: var(--mnw-font-serif);
  font-size: 24px;
  line-height: 1.2;
  white-space: nowrap;
}

.mnw-finale-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px 28px;
}

.mnw-finale-actions .mnw-link-underline {
  color: var(--mnw-paper);
}

/* Padding widens the area in which the button leans toward the pointer */
.mnw-magnetic {
  display: inline-block;
  padding: 14px;
  margin: -14px;
}

.mnw-finale-disclosure {
  margin: 26px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: color-mix(in srgb, var(--mnw-stone) 86%, transparent);
}

@media (max-width: 899px) {
  .mnw-finale-inner {
    padding-top: 64px;
    padding-bottom: 96px;
  }

  .mnw-finale-steps {
    flex-direction: column;
    gap: 34px;
    margin: 44px 0;
  }

  .mnw-finale-step + .mnw-finale-step::before {
    left: 50%;
    top: -26px;
    width: 0;
    height: 18px;
    border-top: 0;
    border-left: 1px dashed color-mix(in srgb, var(--mnw-stone) 52%, transparent);
  }
}

/* ==========================================================================
   Footer
   ========================================================================== */
.mnw-footer {
  background-color: var(--mnw-pond);
  color: var(--mnw-paper);
  padding: 0 0 48px;
}

.mnw-footer-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px 48px;
  padding-top: 40px;
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 20%, transparent);
}

.mnw-footer-tagline {
  margin: 10px 0 0;
  font-size: 16px;
  color: color-mix(in srgb, var(--mnw-paper) 84%, transparent);
}

.mnw-footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;
}

/* Half-submerged wordmark: an outline above the waterline, filled below it */
.mnw-footer-mark {
  position: relative;
  margin: 48px 0 12px;
}

.mnw-footer-mark svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  font-family: var(--mnw-font-serif);
  font-size: 270px;
}

.mnw-footer-mark-outline {
  fill: none;
  stroke: color-mix(in srgb, var(--mnw-stone) 48%, transparent);
  stroke-width: 1.4;
}

.mnw-footer-mark-fill {
  position: absolute;
  inset: 0;
  fill: color-mix(in srgb, var(--mnw-leaf) 62%, var(--mnw-pond));
  clip-path: inset(54% 0 0 0);
  transition: clip-path 2200ms var(--mnw-ease-tide);
}

.mnw-footer-mark-waterline {
  position: absolute;
  left: 0;
  right: 0;
  top: 54%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--mnw-stone) 62%, transparent) 14%,
    color-mix(in srgb, var(--mnw-stone) 62%, transparent) 86%,
    transparent
  );
  transition: transform 1600ms var(--mnw-ease-out);
}

html.mnw-js .mnw-reveal[data-reveal="water"]:not(.is-visible) .mnw-footer-mark-fill {
  clip-path: inset(100% 0 0 0);
}

html.mnw-js .mnw-reveal[data-reveal="water"]:not(.is-visible) .mnw-footer-mark-waterline {
  transform: scaleX(0);
}

.mnw-footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid color-mix(in srgb, var(--mnw-stone) 20%, transparent);
  color: color-mix(in srgb, var(--mnw-stone) 84%, transparent);
  font-size: 14px;
}

@media (max-width: 640px) {
  .mnw-footer-mark {
    margin: 36px 0 8px;
  }
}

/* ==========================================================================
   Reveal system: always visible by default; enhanced only when html.mnw-js is active
   ========================================================================== */
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

  html.mnw-js .mnw-reveal[data-reveal="words"] .mnw-word > span,
  html.mnw-js .mnw-reveal[data-reveal="words"]:not(.is-visible) .mnw-word > span {
    transform: none;
    transition: none;
  }

  html.mnw-js .mnw-reveal[data-reveal="water"]:not(.is-visible) .mnw-footer-mark-fill {
    clip-path: inset(54% 0 0 0);
  }

  html.mnw-js .mnw-reveal[data-reveal="water"]:not(.is-visible) .mnw-footer-mark-waterline {
    transform: none;
  }

  .mnw-stage-poster,
  .mnw-stage-canvas-host,
  .mnw-mobile-drawer,
  .mnw-koi-note-name,
  .mnw-koi-note-more,
  .mnw-koi-note-more-inner,
  .mnw-walk-stop,
  .mnw-walk-marker-dot,
  .mnw-walk-marker-label,
  .mnw-walk-count-reel,
  .mnw-season-seal,
  .mnw-season-seal::after,
  .mnw-faq-item::details-content,
  .mnw-faq-question,
  .mnw-faq-ring,
  .mnw-faq-ring::before,
  .mnw-faq-ring::after,
  .mnw-finale-step-ring,
  .mnw-footer-mark-fill,
  .mnw-footer-mark-waterline {
    transition: none;
  }

  .mnw-koi-hint-ring,
  .mnw-walk-walker::after,
  .mnw-walk-pulse::before,
  .mnw-walk-pulse::after {
    animation: none;
  }

  .mnw-walk-pulse::before {
    transform: scale(0.9);
    opacity: 0.6;
  }

  .mnw-walk-pulse::after {
    opacity: 0;
  }
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/MizunowaApp.tsx">
<![CDATA['use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
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
        <KoiGallery />
        <GardenWalk />
        <Seasons />
        <Questions />
        <PlanYourWalk />
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
import Reveal from './Reveal';

/** The wordmark, drawn as SVG text so one string can be stacked as outline and waterline fill. */
function Wordmark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 1600 300" focusable="false">
      <text x="800" y="248" textAnchor="middle" textLength="1540" lengthAdjust="spacingAndGlyphs">
        MIZUNOWA
      </text>
    </svg>
  );
}

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
            <p className="mnw-footer-tagline">An imagined garden in motion.</p>
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

        {/* Half-submerged wordmark: the fill rises to the waterline when the footer arrives */}
        <Reveal variant="water">
          <div className="mnw-footer-mark" aria-hidden="true">
            <Wordmark className="mnw-footer-mark-outline" />
            <Wordmark className="mnw-footer-mark-fill" />
            <span className="mnw-footer-mark-waterline" />
          </div>
        </Reveal>

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
    <file path="src/app/(mizunowa)/mizunowa/components/GardenWalk.tsx">
<![CDATA['use client';

import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { GARDEN_STOPS } from '../data/garden';
import { clamp, prefersReducedMotion } from '../field/mount';
import Reveal from './Reveal';
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

/** Scroll progress at which the page start, each stop, and the page end sit in view. */
const SCROLL_KEYS = [0, 1 / 6, 1 / 2, 5 / 6, 1];
/** Where each marker's label sits, so it stays clear of the map edge and the route. */
const LABEL_SIDES = ['east', 'north', 'south'] as const;

interface RouteGeometry {
  length: number;
  /** Route fractions matching SCROLL_KEYS: start, the three stops, end. */
  keys: number[];
}

function WalkMapArt({
  routeRef,
  drawnRef,
}: {
  routeRef: RefObject<SVGPathElement | null>;
  drawnRef: RefObject<SVGPathElement | null>;
}) {
  const route =
    'M292 678 C178 620, 128 450, 210 315 C284 195, 480 158, 690 198 C808 220, 882 252, 956 205';

  return (
    <svg
      viewBox="0 0 1200 900"
      className="mnw-walk-map-art"
      fill="none"
      role="img"
      aria-label="Route map of the garden: the walk begins at the pond edge, climbs to the sakura grove on the upper left, then follows stepping stones through the torii to the shrine courtyard on the upper right."
    >
      {/* Subtle topographic / paper contours */}
      <ellipse cx="560" cy="510" rx="455" ry="270" stroke="#D6C7A9" strokeWidth="1.2" strokeDasharray="4 6" />
      <ellipse cx="560" cy="510" rx="520" ry="325" stroke="#D6C7A9" strokeWidth="1" opacity="0.65" />

      {/* Pond water */}
      <path
        d="M180 510 C180 355, 340 285, 560 285 C775 285, 935 360, 935 510 C935 660, 775 735, 560 735 C340 735, 180 665, 180 510 Z"
        fill="#112C2A"
      />
      <ellipse cx="558" cy="510" rx="340" ry="198" stroke="#526E58" strokeOpacity="0.35" strokeWidth="2" />

      {/* Koi path traces inside pond */}
      <ellipse cx="558" cy="510" rx="260" ry="150" stroke="#D6C7A9" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="6 8" />
      <ellipse cx="558" cy="510" rx="145" ry="76" stroke="#D6C7A9" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="5 7" />

      {/* Bank stones along perimeter */}
      <g fill="#D6C7A9" stroke="#526E58" strokeWidth="1.2">
        <ellipse cx="195" cy="442" rx="30" ry="18" transform="rotate(-28 195 442)" />
        <ellipse cx="268" cy="356" rx="28" ry="16" transform="rotate(-18 268 356)" />
        <ellipse cx="395" cy="296" rx="32" ry="15" transform="rotate(-6 395 296)" />
        <ellipse cx="560" cy="274" rx="36" ry="15" />
        <ellipse cx="732" cy="298" rx="32" ry="15" transform="rotate(10 732 298)" />
        <ellipse cx="868" cy="368" rx="30" ry="17" transform="rotate(28 868 368)" />
        <ellipse cx="928" cy="505" rx="30" ry="18" transform="rotate(86 928 505)" />
        <ellipse cx="852" cy="656" rx="34" ry="17" transform="rotate(-24 852 656)" />
        <ellipse cx="695" cy="726" rx="38" ry="16" transform="rotate(-8 695 726)" />
        <ellipse cx="520" cy="744" rx="40" ry="16" />
        <ellipse cx="342" cy="718" rx="34" ry="16" transform="rotate(12 342 718)" />
        <ellipse cx="218" cy="638" rx="32" ry="17" transform="rotate(28 218 638)" />
      </g>

      {/* Sakura grove (upper left) */}
      <g transform="translate(226 248)">
        <circle cx="0" cy="0" r="88" fill="#C7A6A2" fillOpacity="0.42" />
        <circle cx="-46" cy="24" r="52" fill="#C7A6A2" fillOpacity="0.58" />
        <circle cx="48" cy="-24" r="56" fill="#C7A6A2" fillOpacity="0.55" />
        <circle cx="14" cy="36" r="44" fill="#C7A6A2" fillOpacity="0.5" />
        <path
          d="M-6 40 C-2 10, 6 -12, 24 -32 M0 8 C-26 -8, -42 -12, -62 -10"
          stroke="#1E2320"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* Garden walk path: the faint route still to come, and the stretch already walked */}
      <path
        ref={routeRef}
        d={route}
        stroke="#526E58"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />
      <path
        ref={drawnRef}
        className="mnw-walk-route-drawn"
        d={route}
        pathLength={1}
        stroke="#9E3F32"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Stepping stones along the path */}
      <g fill="#D6C7A9" stroke="#526E58" strokeWidth="1">
        <ellipse cx="272" cy="666" rx="14" ry="9" transform="rotate(34 272 666)" />
        <ellipse cx="204" cy="596" rx="13" ry="9" transform="rotate(65 204 596)" />
        <ellipse cx="164" cy="495" rx="13" ry="9" transform="rotate(86 164 495)" />
        <ellipse cx="176" cy="390" rx="14" ry="9" transform="rotate(-64 176 390)" />
        <ellipse cx="268" cy="258" rx="14" ry="9" transform="rotate(-36 268 258)" />
        <ellipse cx="388" cy="192" rx="15" ry="9" transform="rotate(-14 388 192)" />
        <ellipse cx="524" cy="174" rx="15" ry="9" />
        <ellipse cx="662" cy="192" rx="15" ry="9" transform="rotate(10 662 192)" />
        <ellipse cx="792" cy="222" rx="15" ry="9" transform="rotate(-8 792 222)" />
        <ellipse cx="892" cy="224" rx="15" ry="9" transform="rotate(-22 892 224)" />
      </g>

      {/* Land-based vermilion torii in plan view */}
      <g transform="translate(888 214) rotate(-26)">
        <rect x="-26" y="-8" width="52" height="10" rx="2" fill="#9E3F32" />
        <rect x="-18" y="-3" width="6" height="18" fill="#1E2320" />
        <rect x="12" y="-3" width="6" height="18" fill="#1E2320" />
      </g>

      {/* Shrine hall footprint and roof ridge (upper right) */}
      <g transform="translate(998 168) rotate(-22)">
        <rect x="-78" y="-48" width="156" height="96" rx="3" fill="#203D33" stroke="#1E2320" strokeWidth="2" />
        <line x1="-82" y1="0" x2="82" y2="0" stroke="#CB9462" strokeWidth="4" strokeLinecap="round" />
        <rect x="-24" y="42" width="48" height="14" fill="#D6C7A9" stroke="#1E2320" strokeWidth="1.5" />
      </g>

      {/* Moss clusters */}
      <g fill="#526E58" fillOpacity="0.32">
        <ellipse cx="835" cy="145" rx="64" ry="38" />
        <ellipse cx="1095" cy="282" rx="52" ry="34" />
        <ellipse cx="118" cy="692" rx="58" ry="32" />
        <ellipse cx="975" cy="675" rx="68" ry="40" />
      </g>
    </svg>
  );
}

export default function GardenWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const stopsRef = useRef<HTMLDivElement>(null);
  const stopEls = useRef<(HTMLLIElement | null)[]>([]);
  const routeRef = useRef<SVGPathElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const geometryRef = useRef<RouteGeometry | null>(null);

  const [active, setActive] = useState(0);
  // Everything counts as reached until the scroll-driven walk takes over.
  const [reached, setReached] = useState(GARDEN_STOPS.length);

  const { scrollYProgress } = useScroll({ target: stopsRef, offset: ['start 0.62', 'end 0.62'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  const apply = useCallback((raw: number) => {
    const geometry = geometryRef.current;
    const route = routeRef.current;
    if (!geometry || !route) return;

    const q = clamp(raw, 0, 1);
    let segment = 0;
    while (segment < SCROLL_KEYS.length - 2 && q > SCROLL_KEYS[segment + 1]) segment += 1;
    const local = (q - SCROLL_KEYS[segment]) / (SCROLL_KEYS[segment + 1] - SCROLL_KEYS[segment]);
    const walked = geometry.keys[segment] + (geometry.keys[segment + 1] - geometry.keys[segment]) * local;

    drawnRef.current?.style.setProperty('stroke-dashoffset', String(1 - walked));

    const point = route.getPointAtLength(walked * geometry.length);
    const walker = walkerRef.current;
    if (walker) {
      walker.style.left = `${point.x / 12}%`;
      walker.style.top = `${point.y / 9}%`;
    }

    // The map leans in toward the walker mid-route and settles back to the whole garden at each end.
    const scale = 1 + 0.36 * Math.pow(Math.sin(Math.PI * q), 0.7);
    const slack = (scale - 1) / 2;
    const shiftX = clamp(-(point.x / 1200 - 0.5) * scale, -slack, slack);
    const shiftY = clamp(-(point.y / 900 - 0.5) * scale, -slack, slack);
    if (cameraRef.current) {
      cameraRef.current.style.transform = `translate(${(shiftX * 100).toFixed(3)}%, ${(shiftY * 100).toFixed(3)}%) scale(${scale.toFixed(4)})`;
    }
    if (railRef.current) {
      railRef.current.style.transform = `scaleY(${q.toFixed(4)})`;
    }

    setActive(q < 1 / 3 ? 0 : q < 2 / 3 ? 1 : 2);
    setReached(geometry.keys.slice(1, -1).filter((key) => walked >= key - 0.015).length);
  }, []);

  useMotionValueEvent(progress, 'change', apply);

  useEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    if (!section || !route || prefersReducedMotion()) return;

    const length = route.getTotalLength();
    const stopKeys = GARDEN_STOPS.map((stop) => {
      let best = 0;
      let bestDistance = Infinity;
      for (let i = 0; i <= 240; i++) {
        const point = route.getPointAtLength((length * i) / 240);
        const distance = Math.hypot(point.x - stop.x, point.y - stop.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i / 240;
        }
      }
      return best;
    }).sort((a, b) => a - b);

    geometryRef.current = { length, keys: [0, ...stopKeys, 1] };
    section.dataset.live = 'true';
    apply(progress.get());

    return () => {
      geometryRef.current = null;
      delete section.dataset.live;
    };
  }, [apply, progress]);

  return (
    <section id="walk" ref={sectionRef} className="mnw-walk mnw-section-paper mnw-surface-light">
      <Shoreline from="pond" to="paper" overlap />

      <div className="mnw-container">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">02 / THE WALK</p>
            </Reveal>
            <Reveal variant="words" delayMs={70}>
              <h2 className="mnw-h2">
                <SplitWords text="Three places, one slow path." />
              </h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-lead mnw-scripted">
                Scroll to walk the route, or pick a marker on the map to step ahead.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mnw-walk-grid">
          <div className="mnw-walk-map-col">
            <figure className="mnw-walk-map-frame">
              <div ref={cameraRef} className="mnw-walk-camera">
                <WalkMapArt routeRef={routeRef} drawnRef={drawnRef} />
                <div className="mnw-walk-pulse" aria-hidden="true" />
                <div ref={walkerRef} className="mnw-walk-walker" aria-hidden="true">
                  <span />
                </div>
                {GARDEN_STOPS.map((stop, index) => (
                  <button
                    key={stop.number}
                    type="button"
                    className={`mnw-walk-marker mnw-walk-marker-${LABEL_SIDES[index]} ${
                      index < reached ? 'is-reached' : ''
                    } ${index === active ? 'is-active' : ''}`}
                    style={{ left: `${stop.x / 12}%`, top: `${stop.y / 9}%` }}
                    aria-label={`Go to stop ${stop.number}, ${stop.title}`}
                    onClick={() => stopEls.current[index]?.scrollIntoView({ block: 'center' })}
                  >
                    <span className="mnw-walk-marker-dot" aria-hidden="true" />
                    <span className="mnw-mono mnw-walk-marker-label" aria-hidden="true">
                      {stop.mapLabel}
                    </span>
                  </button>
                ))}
              </div>
              <figcaption className="mnw-mono mnw-walk-count" aria-hidden="true">
                <span>Stop</span>
                <span className="mnw-walk-count-window">
                  <span className="mnw-walk-count-reel" style={{ '--active': active } as CSSProperties}>
                    {GARDEN_STOPS.map((stop) => (
                      <span key={stop.number}>{stop.number}</span>
                    ))}
                  </span>
                </span>
                <span>/ 03</span>
              </figcaption>
            </figure>
          </div>

          <div ref={stopsRef} className="mnw-walk-stops-col">
            <div className="mnw-walk-rail" aria-hidden="true">
              <div ref={railRef} className="mnw-walk-rail-fill" />
            </div>
            <ol className="mnw-walk-stops">
              {GARDEN_STOPS.map((stop, index) => (
                <li
                  key={stop.number}
                  ref={(el) => {
                    stopEls.current[index] = el;
                  }}
                  className={`mnw-walk-stop ${index === active ? 'is-active' : ''}`}
                >
                  <p className="mnw-mono mnw-walk-stop-meta">
                    <span className="mnw-walk-stop-num">{stop.number}</span>
                    <span className="mnw-ja" lang="ja">
                      {stop.japanese}
                    </span>
                    <span>/ {stop.reading}</span>
                  </p>
                  <h3 className="mnw-walk-stop-title">{stop.title}</h3>
                  <p className="mnw-walk-stop-desc">{stop.description}</p>
                  <p className="mnw-walk-stop-notice">
                    <span className="mnw-mono">Notice</span>
                    {stop.notice}
                  </p>
                </li>
              ))}
            </ol>
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

              <a href="#koi" className="mnw-header-enter-pill">
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
            href="#koi"
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
              initial={{ opacity: 0, y: 18, clipPath: 'inset(0 -20px 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 -20px 0% 0)' }}
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
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 -20px 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 -20px 0% 0)' }}
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
                initial={{ opacity: 0, y: '105%', clipPath: 'inset(0 -20px 100% 0)' }}
                animate={{ opacity: 1, y: '0%', clipPath: 'inset(0 -20px 0% 0)' }}
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
            <a href="#koi" className="mnw-btn-cream">
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

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { KOI_SPECIMENS, KoiId, KoiSpecimen } from '../data/garden';
import { createKoiField, KoiFieldController } from '../field/koiField';
import { mountField, prefersReducedMotion } from '../field/mount';
import Reveal from './Reveal';
import SplitWords from './SplitWords';

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

/** The wake each koi draws on the water, shown as a short sample beside its name. */
function LineSample({ specimen }: { specimen: KoiSpecimen }) {
  return (
    <svg className="mnw-koi-note-line" viewBox="0 0 56 12" width="56" height="12" fill="none" aria-hidden="true">
      <path
        d="M2 7 C 12 1, 20 11, 30 6 S 46 2, 54 6"
        stroke={specimen.trailColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray={specimen.trailDash.map((dash) => dash * 0.45).join(' ') || undefined}
      />
    </svg>
  );
}

export default function KoiGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<KoiFieldController | null>(null);

  const [selected, setSelected] = useState<KoiId | null>(null);
  const [feedCount, setFeedCount] = useState(0);

  // The rings on the seam open as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 0.3'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    seamRef.current?.style.setProperty('--seam', value.toFixed(3));
  });

  useEffect(() => {
    const water = waterRef.current;
    const canvas = canvasRef.current;
    if (!water || !canvas) return;

    const reducedMotion = prefersReducedMotion();
    if (!reducedMotion) {
      seamRef.current?.style.setProperty('--seam', scrollYProgress.get().toFixed(3));
    }

    const field = createKoiField(canvas, water, {
      specimens: KOI_SPECIMENS,
      reducedMotion,
      labelFont: hintRef.current ? getComputedStyle(hintRef.current).fontFamily : 'monospace',
      onPick: (id) => setSelected((current) => (current === id ? null : id)),
      onFeed: () => setFeedCount((count) => count + 1),
    });
    fieldRef.current = field;
    const unmount = mountField(water, field);

    return () => {
      fieldRef.current = null;
      unmount();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    fieldRef.current?.setSelected(selected);
  }, [selected]);

  const selectedSpecimen = KOI_SPECIMENS.find((specimen) => specimen.id === selected);

  return (
    <section id="koi" ref={sectionRef} className="mnw-koi mnw-surface-dark">
      <div id="garden" className="sr-only" aria-hidden="true" />

      {/* Ripple handoff: rings spread from the bottom edge of the pond into the first chapter */}
      <div ref={seamRef} className="mnw-seam" aria-hidden="true">
        <svg viewBox="0 0 900 260" fill="none" focusable="false">
          <ellipse cx="450" cy="130" rx="446" ry="127" />
          <ellipse cx="450" cy="130" rx="330" ry="94" />
          <ellipse cx="450" cy="130" rx="214" ry="61" />
          <ellipse cx="450" cy="130" rx="98" ry="28" />
        </svg>
      </div>

      <div className="mnw-container mnw-koi-head">
        <div className="mnw-section-head">
          <div className="mnw-section-head-left">
            <Reveal variant="rise">
              <p className="mnw-eyebrow mnw-chapter-label">
                01 / <span className="mnw-ja" lang="ja">錦鯉</span> / NISHIKIGOI
              </p>
            </Reveal>
            <Reveal variant="words" delayMs={70}>
              <h2 className="mnw-h2">
                <SplitWords text="Each one leaves a different line." />
              </h2>
            </Reveal>
          </div>
          <div className="mnw-section-head-right">
            <Reveal variant="rise" delayMs={140}>
              <p className="mnw-lead">
                Look closely and each fish has its own pattern. Their paths cross the same water
                at their own pace.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mnw-koi-stage">
        <div ref={waterRef} className="mnw-koi-water">
          <canvas ref={canvasRef} className="mnw-koi-canvas" aria-hidden="true" />
          <div className="mnw-container mnw-koi-hint">
            <p ref={hintRef} className="mnw-mono">
              <span className="mnw-koi-hint-ring" aria-hidden="true" />
              Click the water to feed · pick a koi to follow its line
            </p>
            <button type="button" className="mnw-chip" onClick={() => fieldRef.current?.feed()}>
              Feed the koi
            </button>
          </div>
        </div>

        <div className="mnw-container mnw-koi-notes-wrap">
          <Reveal variant="rise" delayMs={120}>
            <ul className="mnw-koi-notes" aria-label="Koi field notes">
              {KOI_SPECIMENS.map((specimen) => {
                const isSelected = specimen.id === selected;
                return (
                  <li key={specimen.id}>
                    <button
                      type="button"
                      className={`mnw-koi-note ${isSelected ? 'is-selected' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(isSelected ? null : specimen.id)}
                      onPointerEnter={() => fieldRef.current?.setHighlighted(specimen.id)}
                      onPointerLeave={() => fieldRef.current?.setHighlighted(null)}
                      onFocus={() => fieldRef.current?.setHighlighted(specimen.id)}
                      onBlur={() => fieldRef.current?.setHighlighted(null)}
                    >
                      <span className="mnw-koi-note-top">
                        <span className="mnw-mono mnw-koi-note-num">{specimen.number}</span>
                        <span className="mnw-koi-note-name">{specimen.label}</span>
                        <LineSample specimen={specimen} />
                      </span>
                      <span className="mnw-koi-note-more">
                        <span className="mnw-koi-note-more-inner">
                          <span className="mnw-koi-note-figure">
                            <KoiSilhouette specimen={specimen} />
                          </span>
                          <span className="mnw-koi-note-pattern">{specimen.visiblePattern}</span>
                          <span className="mnw-koi-note-caption">{specimen.caption}</span>
                          <span className="mnw-koi-note-linecopy">
                            <span className="mnw-mono">Its line</span>
                            {specimen.line}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
        {selectedSpecimen ? `Following ${selectedSpecimen.label}` : ''}
      </div>
      <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
        {feedCount === 0 ? '' : feedCount % 2 === 0 ? 'Koi food dropped​' : 'Koi food dropped'}
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/PlanYourWalk.tsx">
<![CDATA['use client';

import { PointerEvent, ReactNode, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { PLAN_STEPS } from '../data/garden';
import { mountField, prefersReducedMotion } from '../field/mount';
import { createRippleField, RippleFieldController } from '../field/rippleField';
import Reveal from './Reveal';
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

/** Lets its child lean a little toward a nearby mouse pointer. */
function Magnetic({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pullX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const pullY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.26);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.34);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className="mnw-magnetic"
      style={{ x: pullX, y: pullY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}

export default function PlanYourWalk() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<RippleFieldController | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const field = createRippleField(canvas, section, {
      reducedMotion: prefersReducedMotion(),
      rgb: '214, 199, 169',
      origin: [0.5, 0.44],
    });
    fieldRef.current = field;
    const unmount = mountField(section, field);

    return () => {
      fieldRef.current = null;
      unmount();
    };
  }, []);

  return (
    <section id="plan" ref={sectionRef} className="mnw-finale mnw-surface-dark">
      <Shoreline from="paper" to="pond" flip />
      <canvas ref={canvasRef} className="mnw-finale-rings" aria-hidden="true" />

      <div className="mnw-container mnw-finale-inner">
        <Reveal variant="rise">
          <p className="mnw-eyebrow mnw-chapter-label">A SIMPLE ROUTE</p>
        </Reveal>
        <Reveal variant="words" delayMs={70}>
          <h2 className="mnw-h2 mnw-finale-title">
            <SplitWords text="Make a little room for the journey." />
          </h2>
        </Reveal>
        <Reveal variant="rise" delayMs={180}>
          <p className="mnw-lead mnw-finale-lead">
            Start at the pond, walk beneath the sakura, and finish at the shrine courtyard. This is
            an imagined route, ready to explore on this page.
          </p>
        </Reveal>

        <Reveal variant="rise" delayMs={240}>
          <ol className="mnw-finale-steps">
            {PLAN_STEPS.map((step) => (
              <li
                key={step.number}
                className="mnw-finale-step"
                onPointerEnter={(event) => fieldRef.current?.emitAt(event.clientX, event.clientY)}
              >
                <span className="mnw-mono mnw-finale-step-ring">{step.number}</span>
                <span className="mnw-finale-step-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal variant="rise" delayMs={300}>
          <div className="mnw-finale-actions">
            <Magnetic>
              <a href="#koi" className="mnw-btn-primary">
                <span>Explore the garden</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#top" className="mnw-link-underline">
              Back to the pond
            </a>
          </div>
          <p className="mnw-finale-disclosure">
            MIZUNOWA is a fictional garden created for this template.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/PondStage.tsx">
<![CDATA['use client';

import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, RotateCcw } from 'lucide-react';
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
          <a href="#koi" className="mnw-scroll-cue">
            <span>SCROLL TO ENTER</span>
            <ArrowDown size={13} aria-hidden="true" />
          </a>

          {(displayMode === 'opt-in' || displayMode === 'reduced' || displayMode === 'error') && (
            <div className="mnw-stage-controls mnw-js-only">
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
import Shoreline from './Shoreline';
import SplitWords from './SplitWords';

export default function Questions() {
  return (
    <section id="questions" className="mnw-questions mnw-section-paper mnw-surface-light">
      <Shoreline from="moss" to="paper" overlap />

      <div className="mnw-container mnw-faq-grid">
        <div className="mnw-faq-head">
          <Reveal variant="rise">
            <p className="mnw-eyebrow mnw-chapter-label">QUESTIONS</p>
          </Reveal>
          <Reveal variant="words" delayMs={70}>
            <h2 className="mnw-h2">
              <SplitWords text="Notes before you begin." />
            </h2>
          </Reveal>
          <Reveal variant="rise" delayMs={160}>
            <p className="mnw-lead mnw-faq-lead">
              Six short answers about the garden, the pond and the koi.
            </p>
          </Reveal>
        </div>

        <div className="mnw-faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <Reveal key={item.question} variant="rise" delayMs={idx * 45}>
              {/* Sharing a name makes the six disclosures open one at a time, natively */}
              <details className="mnw-faq-item" name="mnw-faq">
                <summary className="mnw-faq-summary">
                  <span className="mnw-mono mnw-faq-num">0{idx + 1}</span>
                  <span className="mnw-faq-question">{item.question}</span>
                  <span className="mnw-faq-ring" aria-hidden="true" />
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
  /**
   * `words` leaves the block in place and lifts each `SplitWords` word from behind its own mask.
   * `water` leaves the block in place and raises the footer wordmark's fill to its waterline.
   */
  variant?: 'rise' | 'mask' | 'wipe' | 'line' | 'words' | 'water';
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

import { CSSProperties, KeyboardEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { SEASON_NOTES, SeasonId } from '../data/garden';
import { mountField, prefersReducedMotion } from '../field/mount';
import { createSeasonParticles, SeasonParticlesController } from '../field/seasonParticles';
import SeasonScene from './SeasonScene';
import Shoreline from './Shoreline';

const STATEMENT_LINES = [
  ['The', 'garden', 'keeps', 'its', 'shape.'],
  ['The', 'light', 'keeps', 'changing.'],
];
const STATEMENT_ACCENTS = ['shape.', 'light', 'changing.'];
const STATEMENT_WORDS = STATEMENT_LINES.flat().length;

/** The new season spreads from the pond, like a ring on the water. */
const WIPE_FROM = 'circle(0% at 70% 86%)';
/** Just past the far corner, so the ring is still crossing the scene for the whole duration. */
const WIPE_REACH = 112;
const WIPE_EASE: [number, number, number, number] = [0.5, 0, 0.3, 1];
const NOTE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function wipeTo(radius: number): string {
  return `circle(${radius}% at 70% 86%)`;
}

export default function Seasons() {
  const [season, setSeason] = useState<SeasonId>('spring');
  // The scene underneath while the next season spreads over it.
  const [base, setBase] = useState<SeasonId>('spring');
  const [wipe, setWipe] = useState(0);

  const statementRef = useRef<HTMLHeadingElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SeasonParticlesController | null>(null);
  const pickRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const reducedMotion = useReducedMotion();
  const note = SEASON_NOTES.find((item) => item.id === season) ?? SEASON_NOTES[0];

  // The statement is read in as it scrolls up the page.
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ['start 0.9', 'end 0.5'] });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    statementRef.current?.style.setProperty('--p', value.toFixed(3));
  });

  // Pointer parallax across the paper-cut layers.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 60, damping: 18 });
  const driftY = useSpring(pointerY, { stiffness: 60, damping: 18 });
  useMotionValueEvent(driftX, 'change', (value) => {
    bandRef.current?.style.setProperty('--px', value.toFixed(4));
  });
  useMotionValueEvent(driftY, 'change', (value) => {
    bandRef.current?.style.setProperty('--py', value.toFixed(4));
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const still = prefersReducedMotion();
    if (!still) {
      statementRef.current?.style.setProperty('--p', scrollYProgress.get().toFixed(3));
    }

    const particles = createSeasonParticles(canvas, stage, still, 'spring');
    particlesRef.current = particles;
    const unmount = mountField(stage, particles);

    return () => {
      particlesRef.current = null;
      unmount();
    };
  }, [scrollYProgress]);

  const choose = (next: SeasonId) => {
    if (next === season) return;
    setBase(season);
    setSeason(next);
    setWipe((count) => count + 1);
    particlesRef.current?.setSeason(next);
  };

  const handlePickerKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = SEASON_NOTES.findIndex((item) => item.id === season);
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % SEASON_NOTES.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (current + SEASON_NOTES.length - 1) % SEASON_NOTES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SEASON_NOTES.length - 1;
    else return;

    event.preventDefault();
    choose(SEASON_NOTES[next].id);
    pickRefs.current[next]?.focus();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const wipeDuration = reducedMotion ? 0 : 1.9;

  return (
    <section id="seasons" className="mnw-seasons mnw-section-moss mnw-surface-dark">
      <Shoreline from="paper" to="moss" flip />

      <div className="mnw-container mnw-seasons-head">
        <p className="mnw-eyebrow mnw-chapter-label">
          03 / <span className="mnw-ja" lang="ja">四季</span> / THE SEASONS
        </p>
        <h2
          ref={statementRef}
          className="mnw-statement"
          style={{ '--n': STATEMENT_WORDS } as CSSProperties}
        >
          {STATEMENT_LINES.map((words, lineIndex) => (
            <span key={lineIndex} className="mnw-statement-line">
              {words.map((word, wordIndex) => {
                const flatIndex = (lineIndex === 0 ? 0 : STATEMENT_LINES[0].length) + wordIndex;
                return (
                  <span
                    key={`${lineIndex}-${word}`}
                    className={`mnw-statement-word ${STATEMENT_ACCENTS.includes(word) ? 'is-accent' : ''}`}
                    style={{ '--i': flatIndex } as CSSProperties}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>
      </div>

      <div
        ref={bandRef}
        className="mnw-season-band"
        data-season={season}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={stageRef}
          className="mnw-season-stage"
          role="img"
          aria-label={`Paper-cut view of the garden in ${note.season.toLowerCase()}: the sakura tree, the pond, and the torii before the timber hall.`}
        >
          <SeasonScene season={base} />
          {wipe > 0 && (
            <>
              {/* A soft wave front and a crisp ring lead the incoming season */}
              <motion.div
                key={`wave-${wipe}`}
                className="mnw-season-wipe mnw-season-wave"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH + 3) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
              />
              <motion.div
                key={`ring-${wipe}`}
                className="mnw-season-wipe mnw-season-ring"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH + 0.3) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
              />
              <motion.div
                key={`scene-${wipe}`}
                className="mnw-season-wipe"
                initial={{ clipPath: WIPE_FROM }}
                animate={{ clipPath: wipeTo(WIPE_REACH) }}
                transition={{ duration: wipeDuration, ease: WIPE_EASE }}
                onAnimationComplete={() => setBase(season)}
              >
                <SeasonScene season={season} />
              </motion.div>
            </>
          )}
          <canvas ref={canvasRef} className="mnw-season-air" aria-hidden="true" />
          <div className="mnw-season-scrim" aria-hidden="true" />
        </div>

        <div className="mnw-container mnw-season-content">
          <div className="mnw-season-note" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={season}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: reducedMotion ? 0 : 0.42, ease: NOTE_EASE }}
              >
                <p className="mnw-mono mnw-season-kicker">
                  <span className="mnw-ja" lang="ja">
                    {note.kanji}
                  </span>
                  <span>/ {note.reading}</span>
                </p>
                <h3 className="mnw-season-name">{note.season}</h3>
                <p className="mnw-season-summary">{note.summary}</p>
                <p className="mnw-season-detail">{note.detail}</p>
                <p className="mnw-mono mnw-season-light">
                  <span>Light</span>
                  {note.light}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="mnw-season-picker mnw-scripted"
            role="radiogroup"
            aria-label="Choose a season"
            onKeyDown={handlePickerKey}
          >
            {SEASON_NOTES.map((item, index) => {
              const checked = item.id === season;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    pickRefs.current[index] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  className={`mnw-season-pick ${checked ? 'is-checked' : ''}`}
                  onClick={() => choose(item.id)}
                >
                  <span className="mnw-season-seal mnw-ja" lang="ja" aria-hidden="true">
                    {item.kanji}
                  </span>
                  <span className="mnw-season-pick-name">{item.season}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Without JavaScript the picker cannot run, so the other three notes are simply listed */}
      <div className="mnw-container mnw-nojs-only">
        <dl className="mnw-season-list">
          {SEASON_NOTES.filter((item) => item.id !== 'spring').map((item) => (
            <div key={item.id}>
              <dt>
                {item.season} <span className="mnw-ja" lang="ja">{item.kanji}</span>
              </dt>
              <dd>
                {item.summary} {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/SeasonScene.tsx">
<![CDATA['use client';

import { CSSProperties } from 'react';
import { SeasonId } from '../data/garden';

interface SeasonLook {
  skyTop: string;
  skyBottom: string;
  haze: string;
  /** The sun, or the pale winter moon: its place in the sky is what changes the light. */
  disc: { x: number; y: number; r: number; color: string };
  far: string;
  ridge: string;
  cedar: string;
  bank: string;
  bankEdge: string;
  water: string;
  waterLight: string;
  /** Three tones for the tree canopy; empty when the branches are bare. */
  canopy: readonly string[];
  overhang: string | null;
  floating: string | null;
  snow: boolean;
}

const LOOKS: Record<SeasonId, SeasonLook> = {
  spring: {
    skyTop: '#0F2927',
    skyBottom: '#3D5650',
    haze: '#C7A6A2',
    disc: { x: 1010, y: 262, r: 62, color: '#F4E3D7' },
    far: '#1D3D37',
    ridge: '#21423A',
    cedar: '#17332E',
    bank: '#2A4A3B',
    bankEdge: '#3D6149',
    water: '#163B37',
    waterLight: '#2A5A52',
    canopy: ['#C7A6A2', '#DDC2BD', '#B38C89'],
    overhang: '#B08B88',
    floating: '#D9BDB8',
    snow: false,
  },
  summer: {
    skyTop: '#0C2A25',
    skyBottom: '#2C5C47',
    haze: '#6E9070',
    disc: { x: 1130, y: 150, r: 50, color: '#F7F1DC' },
    far: '#1A4236',
    ridge: '#1E4836',
    cedar: '#12352B',
    bank: '#28563A',
    bankEdge: '#3E7449',
    water: '#11393B',
    waterLight: '#1F5A54',
    canopy: ['#526E58', '#3D6247', '#6F8F66'],
    overhang: '#35593F',
    floating: null,
    snow: false,
  },
  autumn: {
    skyTop: '#1B2B26',
    skyBottom: '#6A5238',
    haze: '#CB9462',
    disc: { x: 900, y: 340, r: 80, color: '#EBB57D' },
    far: '#2C3A2E',
    ridge: '#35402E',
    cedar: '#25322A',
    bank: '#3E4730',
    bankEdge: '#6A5B33',
    water: '#1B3531',
    waterLight: '#4A5340',
    canopy: ['#CB9462', '#9E3F32', '#DDB07A'],
    overhang: '#9E3F32',
    floating: '#CB9462',
    snow: false,
  },
  winter: {
    skyTop: '#132D2D',
    skyBottom: '#5B706A',
    haze: '#F4EFE2',
    disc: { x: 1190, y: 214, r: 44, color: '#FDFBF5' },
    far: '#2D4945',
    ridge: '#35544E',
    cedar: '#21403B',
    bank: '#3F5E58',
    bankEdge: '#DDE2D6',
    water: '#152F2E',
    waterLight: '#6C8782',
    canopy: [],
    overhang: null,
    floating: null,
    snow: true,
  },
};

const SNOW = '#F4EFE2';
const INK = '#141D1A';
const VERMILION = '#9E3F32';
/** A koi seen from the bank: nose at the origin, forked tail trailing along +x. */
const KOI_SHAPE = 'M0 0 C 10 -9, 34 -10, 48 -2 L 64 -10 L 59 0 L 64 10 L 48 2 C 34 10, 10 9, 0 0 Z';

/** Canopy clusters: centre, radius, tone index. */
const CANOPY: readonly [number, number, number, number][] = [
  [546, 440, 70, 0],
  [490, 400, 48, 1],
  [580, 370, 56, 2],
  [650, 300, 78, 0],
  [700, 236, 62, 1],
  [776, 262, 58, 2],
  [790, 330, 54, 0],
  [860, 300, 62, 1],
  [910, 236, 60, 0],
  [960, 318, 56, 2],
  [1032, 330, 58, 0],
  [1070, 290, 40, 1],
  [750, 400, 46, 1],
  [640, 430, 44, 1],
];

/** Conifers along the far ridge: x, base y, height, width. */
const CEDARS: readonly [number, number, number, number][] = [
  [70, 548, 190, 62],
  [150, 540, 150, 54],
  [236, 532, 214, 66],
  [330, 528, 160, 52],
  [416, 532, 126, 46],
  [1512, 512, 196, 62],
  [1584, 516, 150, 52],
];

const BRANCHES: readonly { d: string; width: number }[] = [
  { d: 'M708 706 C 700 628, 712 560, 750 492 C 776 446, 820 408, 878 380', width: 28 },
  { d: 'M724 560 C 672 512, 616 472, 546 448', width: 15 },
  { d: 'M754 486 C 736 420, 708 356, 676 286', width: 14 },
  { d: 'M810 418 C 866 366, 940 344, 1028 350', width: 12 },
  { d: 'M878 380 C 906 330, 912 290, 906 244', width: 10 },
  { d: 'M616 472 C 596 440, 580 418, 560 380', width: 6 },
  { d: 'M708 356 C 750 320, 780 290, 790 250', width: 6 },
  { d: 'M940 344 C 970 316, 990 300, 1020 270', width: 5 },
];

const LAYER_PROPS = {
  viewBox: '0 0 1600 900',
  preserveAspectRatio: 'xMidYMid slice',
  focusable: 'false' as const,
  'aria-hidden': true,
};

function depth(value: number): CSSProperties {
  return { '--d': value } as CSSProperties;
}

/** A point on a circle, rounded so server and client markup agree to the digit. */
function orbit(centre: number, radius: number, angle: number, axis: 'x' | 'y'): number {
  const offset = (axis === 'x' ? Math.cos(angle) : Math.sin(angle)) * radius;
  return Math.round((centre + offset) * 10) / 10;
}

/** A layered paper-cut view of the garden. Each layer is its own SVG so pointer parallax stays on the compositor. */
export default function SeasonScene({ season }: { season: SeasonId }) {
  const look = LOOKS[season];
  const id = `mnw-season-${season}`;

  return (
    <div className="mnw-scene" data-season={season}>
      {/* Sky, light and the far hills */}
      <svg className="mnw-scene-layer" style={depth(4)} {...LAYER_PROPS}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={look.skyTop} />
            <stop offset="0.66" stopColor={look.skyBottom} />
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={look.disc.color} stopOpacity="0.5" />
            <stop offset="1" stopColor={look.disc.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-80" y="-60" width="1760" height="1020" fill={`url(#${id}-sky)`} />
        <circle cx={look.disc.x} cy={look.disc.y} r={look.disc.r * 3.6} fill={`url(#${id}-glow)`} />
        <circle cx={look.disc.x} cy={look.disc.y} r={look.disc.r} fill={look.disc.color} opacity="0.94" />
        <path
          d="M-80 520 C 120 430, 260 400, 420 450 C 560 380, 700 360, 860 430 C 1000 390, 1180 330, 1320 400 C 1440 370, 1560 400, 1680 440 L1680 960 L-80 960 Z"
          fill={look.far}
        />
        <ellipse cx="800" cy="548" rx="1000" ry="64" fill={look.haze} opacity="0.16" />
      </svg>

      {/* Ridge, conifers, torii and the timber hall */}
      <svg className="mnw-scene-layer" style={depth(10)} {...LAYER_PROPS}>
        {CEDARS.map(([x, base, tall, wide]) => (
          <g key={x}>
            <path d={`M${x} ${base - tall} L${x + wide / 2} ${base + 20} L${x - wide / 2} ${base + 20} Z`} fill={look.cedar} />
            {look.snow && (
              <path
                d={`M${x} ${base - tall} L${x + wide * 0.17} ${base - tall * 0.62} L${x - wide * 0.17} ${base - tall * 0.62} Z`}
                fill={SNOW}
                opacity="0.85"
              />
            )}
          </g>
        ))}
        <path
          d="M-80 560 C 200 500, 420 520, 640 540 C 860 500, 1040 470, 1240 500 C 1400 480, 1560 500, 1680 520 L1680 960 L-80 960 Z"
          fill={look.ridge}
        />

        {/* Timber hall, set back from the gate */}
        <g>
          <rect x="1246" y="504" width="248" height="14" fill="#D6C7A9" />
          <rect x="1268" y="440" width="204" height="64" fill="#EFE8D8" />
          <rect x="1268" y="440" width="9" height="64" fill={INK} />
          <rect x="1463" y="440" width="9" height="64" fill={INK} />
          <rect x="1330" y="440" width="6" height="64" fill={INK} />
          <rect x="1404" y="440" width="6" height="64" fill={INK} />
          <rect x="1346" y="452" width="48" height="52" fill={INK} />
          <rect x="1350" y="456" width="40" height="44" fill="#CB9462" opacity="0.5" />
          <path d="M1216 450 Q 1296 420 1370 364 Q 1444 420 1524 450 L 1516 460 L 1224 460 Z" fill={INK} />
          <rect x="1354" y="360" width="32" height="7" rx="2" fill="#CB9462" />
          {look.snow && (
            <path
              d="M1234 446 Q 1302 418 1370 370 Q 1438 418 1506 446 Q 1438 430 1370 386 Q 1302 430 1234 446 Z"
              fill={SNOW}
            />
          )}
        </g>

        {/* Torii on the approach, in line with the hall */}
        <g>
          <rect x="1136" y="470" width="13" height="96" fill={VERMILION} />
          <rect x="1211" y="470" width="13" height="96" fill={VERMILION} />
          <rect x="1124" y="496" width="112" height="9" fill={VERMILION} />
          <path d="M1106 472 Q 1180 458 1254 472 L 1252 485 Q 1180 473 1108 485 Z" fill={VERMILION} />
          <path d="M1100 463 Q 1180 447 1260 463 L 1258 472 Q 1180 458 1102 472 Z" fill={look.snow ? SNOW : INK} />
        </g>
      </svg>

      {/* Bank, pond and the sakura tree */}
      <svg className="mnw-scene-layer" style={depth(18)} {...LAYER_PROPS}>
        <path
          d="M-80 650 C 180 600, 420 610, 700 640 C 900 600, 1150 590, 1400 610 C 1500 615, 1600 625, 1680 640 L1680 960 L-80 960 Z"
          fill={look.bank}
        />
        <path
          d="M-80 650 C 180 600, 420 610, 700 640 C 900 600, 1150 590, 1400 610 C 1500 615, 1600 625, 1680 640"
          fill="none"
          stroke={look.bankEdge}
          strokeWidth={look.snow ? 10 : 5}
          strokeLinecap="round"
          opacity={look.snow ? 0.9 : 0.7}
        />

        {/* Stepping stones from the gate down to the water */}
        <g fill={look.snow ? SNOW : '#D6C7A9'}>
          <ellipse cx="1176" cy="598" rx="20" ry="7" />
          <ellipse cx="1160" cy="622" rx="22" ry="8" />
          <ellipse cx="1140" cy="648" rx="24" ry="9" />
          <ellipse cx="1118" cy="676" rx="26" ry="10" />
        </g>

        {/* Pond: it runs off the bottom of the scene, where the next section's shoreline becomes its near bank */}
        <ellipse cx="1160" cy="824" rx="528" ry="130" fill={INK} opacity="0.35" />
        <ellipse cx="1160" cy="818" rx="520" ry="126" fill={look.water} />
        <ellipse cx="1210" cy="800" rx="360" ry="70" fill={look.waterLight} opacity="0.42" />
        <g fill="none" stroke="#F4EFE2" strokeWidth="1.6">
          <ellipse cx="1090" cy="792" rx="54" ry="13" opacity="0.5" />
          <ellipse cx="1090" cy="792" rx="108" ry="26" opacity="0.3" />
          <ellipse cx="1090" cy="792" rx="170" ry="41" opacity="0.16" />
        </g>
        {!look.snow && (
          <g>
            <g transform="translate(1262 770) rotate(-8)">
              <path d={KOI_SHAPE} fill="#FDFBF5" />
              <ellipse cx="20" cy="0" rx="9" ry="5" fill={VERMILION} />
            </g>
            <g transform="translate(960 800) rotate(172)">
              <path d={KOI_SHAPE} fill="#CB9462" />
            </g>
          </g>
        )}
        {look.floating && (
          <g fill={look.floating} opacity="0.9">
            <ellipse cx="900" cy="760" rx="8" ry="3.4" transform="rotate(18 900 760)" />
            <ellipse cx="974" cy="750" rx="7" ry="3" transform="rotate(-14 974 750)" />
            <ellipse cx="1040" cy="738" rx="7.5" ry="3.2" transform="rotate(28 1040 738)" />
            <ellipse cx="1190" cy="752" rx="7" ry="3" transform="rotate(-22 1190 752)" />
            <ellipse cx="1340" cy="776" rx="8" ry="3.2" transform="rotate(12 1340 776)" />
          </g>
        )}
        <g fill={look.snow ? '#C9D0C4' : '#8D947F'}>
          <ellipse cx="770" cy="760" rx="34" ry="13" />
          <ellipse cx="1470" cy="736" rx="32" ry="12" />
          <ellipse cx="1420" cy="760" rx="22" ry="9" />
        </g>

        {/* Stone lantern at the water's edge */}
        <g transform="translate(-140 8)">
          <rect x="826" y="690" width="36" height="9" fill="#8D947F" />
          <rect x="838" y="654" width="12" height="36" fill="#8D947F" />
          <rect x="828" y="628" width="32" height="26" fill="#A3A894" />
          <rect x="836" y="634" width="16" height="15" fill="#E8C27E" />
          <path d="M818 630 L844 606 L870 630 Z" fill={look.snow ? SNOW : '#6F7566'} />
        </g>

        {/* Sakura tree, drawn about its own base then set to the right of the note */}
        <g transform="translate(216.2 105.9) scale(0.85)">
          <path d="M680 712 C 696 690, 700 670, 702 650 L 732 650 C 732 676, 744 698, 766 712 Z" fill={INK} />
          <g fill="none" stroke={INK} strokeLinecap="round">
            {BRANCHES.map((branch) => (
              <path key={branch.d} d={branch.d} strokeWidth={branch.width} />
            ))}
          </g>
          {look.snow && (
            <g fill="none" stroke={SNOW} strokeLinecap="round" opacity="0.9">
              <path d="M720 548 C 668 500, 612 462, 548 440" strokeWidth="4" />
              <path d="M812 406 C 866 356, 940 334, 1026 340" strokeWidth="4" />
              <path d="M762 474 C 778 440, 816 404, 872 372" strokeWidth="5" />
              <path
                d="M574 380 C 566 350, 552 330, 536 312 M 790 250 C 800 226, 802 210, 800 190 M 1020 270 C 1040 252, 1052 240, 1066 220 M 906 244 C 906 220, 900 200, 890 182"
                strokeWidth="2.5"
                stroke={INK}
                opacity="0.8"
              />
            </g>
          )}
          {look.canopy.length > 0 && (
            <g>
              {CANOPY.map(([cx, cy, r]) => (
                <circle key={`shade-${cx}-${cy}`} cx={cx + 7} cy={cy + 10} r={r} fill={INK} opacity="0.16" />
              ))}
              {CANOPY.map(([cx, cy, r, tone], index) => (
                <g key={`leaf-${cx}-${cy}`} fill={look.canopy[tone]}>
                  <circle cx={cx} cy={cy} r={r} opacity="0.94" />
                  <circle cx={orbit(cx, r * 0.7, index * 2.4, 'x')} cy={orbit(cy, r * 0.7, index * 2.4, 'y')} r={r * 0.5} opacity="0.94" />
                  <circle cx={orbit(cx, r * 0.72, index * 2.4 + 2.2, 'x')} cy={orbit(cy, r * 0.72, index * 2.4 + 2.2, 'y')} r={r * 0.44} opacity="0.94" />
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>

      {/* Foreground foliage, closest to the viewer */}
      <svg className="mnw-scene-layer" style={depth(34)} {...LAYER_PROPS}>
        <g fill="#0B1F1D">
          <path d="M-100 960 L-100 800 C 60 770, 160 800, 260 850 C 300 870, 340 890, 380 960 Z" />
          <path d="M1700 960 L1700 770 C 1560 760, 1470 800, 1400 850 C 1370 872, 1350 890, 1320 960 Z" />
          <path d="M1420 960 C 1430 860, 1450 810, 1486 772 C 1466 816, 1456 866, 1452 960 Z" />
          <path d="M1470 960 C 1486 880, 1520 820, 1568 786 C 1534 832, 1512 890, 1506 960 Z" />
          <path d="M1380 960 C 1376 890, 1362 850, 1334 818 C 1366 846, 1396 892, 1412 960 Z" />
        </g>
        <g fill="none" stroke="#0B1F1D" strokeLinecap="round">
          <path d="M1700 44 C 1590 80, 1490 92, 1384 150" strokeWidth="13" />
          <path d="M1560 82 C 1520 120, 1500 150, 1486 196" strokeWidth="6" />
          <path d="M1470 104 C 1430 100, 1400 84, 1370 60" strokeWidth="5" />
        </g>
        {look.overhang && (
          <g fill={look.overhang}>
            <circle cx="1384" cy="152" r="46" />
            <circle cx="1440" cy="118" r="38" />
            <circle cx="1486" cy="200" r="42" />
            <circle cx="1366" cy="64" r="34" />
            <circle cx="1530" cy="126" r="40" />
            <circle cx="1600" cy="86" r="44" />
            <circle cx="1432" cy="196" r="30" />
          </g>
        )}
        {look.snow && (
          <g fill="none" stroke={SNOW} strokeLinecap="round" opacity="0.9">
            <path d="M1700 36 C 1590 72, 1490 84, 1390 138" strokeWidth="4" />
          </g>
        )}
      </svg>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/Shoreline.tsx">
<![CDATA['use client';

type Ground = 'pond' | 'paper' | 'moss';

interface ShorelineProps {
  from: Ground;
  to: Ground;
  /** Mirror the curve so consecutive shorelines do not repeat. */
  flip?: boolean;
  /** Lay the shore over the end of the previous section instead of on a band of its ground colour. */
  overlap?: boolean;
}

/** A curved water's-edge between two section grounds, with ripple lines lapping against it. */
export default function Shoreline({ from, to, flip = false, overlap = false }: ShorelineProps) {
  return (
    <div
      className={`mnw-shore mnw-shore-from-${from} mnw-shore-to-${to} ${flip ? 'is-flipped' : ''} ${
        overlap ? 'is-overlap' : ''
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path
          className="mnw-shore-line"
          d="M0 40 C 220 4, 470 66, 720 34 C 960 4, 1210 58, 1440 22"
        />
        <path
          className="mnw-shore-line mnw-shore-line-far"
          d="M0 24 C 220 -10, 470 50, 720 18 C 960 -10, 1210 42, 1440 8"
        />
        <path
          className="mnw-shore-fill"
          d="M0 58 C 220 22, 470 84, 720 52 C 960 22, 1210 76, 1440 40 L1440 97 L0 97 Z"
        />
      </svg>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/components/SplitWords.tsx">
<![CDATA['use client';

import { CSSProperties, Fragment } from 'react';

interface SplitWordsProps {
  text: string;
  /** Words to set in the accent colour, matched without trailing punctuation. */
  accent?: readonly string[];
}

/** Splits a heading into masked words. Animate it by wrapping the heading in `<Reveal variant="words">`. */
export default function SplitWords({ text, accent = [] }: SplitWordsProps) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, index) => {
        const isAccent = accent.includes(word.replace(/[.,]$/, ''));
        return (
          <Fragment key={`${index}-${word}`}>
            <span className="mnw-word">
              <span
                className={isAccent ? 'mnw-word-accent' : undefined}
                style={{ '--i': index } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </>
  );
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/data/garden.ts">
<![CDATA[export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
export type KoiId = 'kohaku' | 'yamabuki' | 'shiro' | 'sanke';

export interface NavItem {
  label: string;
  href: string;
}

export interface KoiSpecimen {
  id: KoiId;
  number: string;
  label: string;
  visiblePattern: string;
  caption: string;
  /** How this fish moves through the note pond, and so the line it leaves. */
  line: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  /** Colour and dash pattern of the wake drawn behind the fish. */
  trailColor: string;
  trailDash: readonly number[];
}

export interface GardenStop {
  number: string;
  title: string;
  description: string;
  mapLabel: string;
  japanese: string;
  reading: string;
  notice: string;
  /** Marker position in the 1200 x 900 map viewBox. */
  x: number;
  y: number;
}

export interface SeasonNote {
  id: SeasonId;
  season: string;
  kanji: string;
  reading: string;
  japanese: string;
  summary: string;
  detail: string;
  light: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const NAV_LINKS: readonly NavItem[] = [
  { label: 'PHILOSOPHY', href: '#koi' },
  { label: 'VIRTUAL TOUR', href: '#walk' },
  { label: 'ABOUT', href: '#seasons' },
];

export const KOI_SPECIMENS: readonly KoiSpecimen[] = [
  {
    id: 'kohaku',
    number: '01',
    label: 'Red and white',
    visiblePattern: 'Porcelain body, vermilion islands',
    caption: 'Warm patches on a pale body.',
    line: 'Wide, slow circuits of the whole pond.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#9E3F32',
    trailColor: '#C7A6A2',
    trailDash: [],
  },
  {
    id: 'yamabuki',
    number: '02',
    label: 'Gold',
    visiblePattern: 'Gold body with a porcelain underside',
    caption: 'A warm glint beneath the water.',
    line: 'A figure of eight, crossing its own wake.',
    primaryColor: '#CB9462',
    secondaryColor: '#FDFBF5',
    accentColor: '#CB9462',
    trailColor: '#CB9462',
    trailDash: [14, 9],
  },
  {
    id: 'shiro',
    number: '03',
    label: 'Ink and white',
    visiblePattern: 'Porcelain with irregular charcoal patches',
    caption: 'Dark markings, softly defined.',
    line: 'Tight turns, close to the near bank.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#1E2320',
    accentColor: '#1E2320',
    trailColor: '#D6C7A9',
    trailDash: [2, 8],
  },
  {
    id: 'sanke',
    number: '04',
    label: 'Three colours',
    visiblePattern: 'Porcelain, vermilion and charcoal',
    caption: 'A pattern made of light and shadow.',
    line: 'A long wander that never quite repeats.',
    primaryColor: '#FDFBF5',
    secondaryColor: '#9E3F32',
    accentColor: '#1E2320',
    trailColor: '#F4EFE2',
    trailDash: [26, 7, 3, 7],
  },
];

export const GARDEN_STOPS: readonly GardenStop[] = [
  {
    number: '01',
    title: 'Pond edge',
    description: 'Begin where the koi move through the clear green water.',
    mapLabel: '01 · Pond edge',
    japanese: '池',
    reading: 'Ike',
    notice: 'Four koi, each keeping to its own line.',
    x: 312,
    y: 688,
  },
  {
    number: '02',
    title: 'Sakura grove',
    description: 'Follow the path beneath a canopy of pale spring blossoms.',
    mapLabel: '02 · Sakura grove',
    japanese: '桜',
    reading: 'Sakura',
    notice: 'Petals resting on the water below the branches.',
    x: 240,
    y: 296,
  },
  {
    number: '03',
    title: 'Shrine courtyard',
    description: 'Pass the torii and arrive at a small timber hall set back among the trees.',
    mapLabel: '03 · Shrine courtyard',
    japanese: '参道',
    reading: 'Sandō',
    notice: 'The path, the gate and the hall, set in one line.',
    x: 910,
    y: 218,
  },
];

export const SEASON_NOTES: readonly SeasonNote[] = [
  {
    id: 'spring',
    season: 'Spring',
    kanji: '春',
    reading: 'Haru',
    japanese: '春 / Haru',
    summary: 'Soft blossoms gather over the water.',
    detail:
      'Pale pink sakura clusters frame the bank while stray petals drift quietly over the jade surface.',
    light: 'Low and rose-tinted',
  },
  {
    id: 'summer',
    season: 'Summer',
    kanji: '夏',
    reading: 'Natsu',
    japanese: '夏 / Natsu',
    summary: 'Deep green leaves make a little shade.',
    detail:
      'Blossoms give way to full leaf canopies and dense moss along the stepping stones, cooling the edges of the pond.',
    light: 'High and green-gold',
  },
  {
    id: 'autumn',
    season: 'Autumn',
    kanji: '秋',
    reading: 'Aki',
    japanese: '秋 / Aki',
    summary: 'The path takes on warmer colors.',
    detail:
      'Ochre foliage and warm stone tones settle along the shrine approach, echoing the gold koi moving underneath.',
    light: 'Long and amber',
  },
  {
    id: 'winter',
    season: 'Winter',
    kanji: '冬',
    reading: 'Fuyu',
    japanese: '冬 / Fuyu',
    summary: 'Bare branches let the shape of the garden show.',
    detail:
      'With leaves cleared away, the dark timber uprights, gabled roof, and curving stone bank read in crisp silhouette.',
    light: 'Pale and clear',
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
      'Yes. Click or touch the pond water directly to drop food and send ripples across the surface.',
  },
  {
    question: 'What if my device cannot run the 3D scene?',
    answer:
      'A composed still view remains visible, and you can continue through the full garden guide.',
  },
  {
    question: 'Can I pause the movement?',
    answer:
      'Yes. Rely on your device’s reduced-motion setting for a composed still view automatically.',
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
    <file path="src/app/(mizunowa)/mizunowa/field/koiField.ts">
<![CDATA[import type { KoiId, KoiSpecimen } from '../data/garden';
import { clamp, NOOP_FIELD, seededRandom, type FieldController } from './mount';

export interface KoiFieldOptions {
  specimens: readonly KoiSpecimen[];
  reducedMotion: boolean;
  /** Resolved font-family for the label that follows the chosen koi. */
  labelFont: string;
  onPick: (id: KoiId) => void;
  onFeed: () => void;
}

export interface KoiFieldController extends FieldController {
  setSelected(id: KoiId | null): void;
  setHighlighted(id: KoiId | null): void;
  /** Keyboard equivalent of clicking the water. */
  feed(): void;
}

const TAU = Math.PI * 2;
const JOINTS = 12;
/** Half body width at each joint, nose to tail root, as a fraction of body length. */
const HALF_W = [0.036, 0.074, 0.094, 0.104, 0.104, 0.097, 0.084, 0.067, 0.05, 0.035, 0.023, 0.014];
const TRAIL_SAMPLES = 250;
const TRAIL_INTERVAL = 0.07;
const TRAIL_CHUNKS = 10;
const MAX_PELLETS = 5;

/** Each koi's unhurried route, as a point in the unit square over time. */
const ROUTES: Record<KoiId, (t: number) => [number, number]> = {
  kohaku: (t) => {
    const a = (TAU * t) / 44;
    return [0.5 + 0.44 * Math.cos(a), 0.5 + 0.38 * Math.sin(a)];
  },
  yamabuki: (t) => {
    const a = (TAU * t) / 34 + 1.2;
    return [0.52 + 0.36 * Math.sin(a), 0.48 + 0.34 * Math.sin(2 * a)];
  },
  shiro: (t) => {
    const a = -(TAU * t) / 25 + 0.6;
    return [0.3 + 0.2 * Math.cos(a), 0.62 + 0.28 * Math.sin(a)];
  },
  sanke: (t) => {
    const a = (TAU * t) / 96;
    return [0.56 + 0.4 * Math.sin(3 * a + 0.5), 0.48 + 0.36 * Math.sin(2 * a + 2.1)];
  },
};

type BlobTone = 'secondary' | 'accent';
interface PatternBlob {
  /** Position along the spine, 0 nose to 1 tail root. */
  t: number;
  /** Sideways offset in half-widths. */
  lat: number;
  rx: number;
  ry: number;
  tone: BlobTone;
}

const PATTERNS: Record<KoiId, readonly PatternBlob[]> = {
  kohaku: [
    { t: 0.1, lat: 0.1, rx: 0.07, ry: 0.066, tone: 'secondary' },
    { t: 0.4, lat: -0.25, rx: 0.115, ry: 0.082, tone: 'secondary' },
    { t: 0.52, lat: 0.6, rx: 0.06, ry: 0.045, tone: 'secondary' },
    { t: 0.76, lat: 0.15, rx: 0.058, ry: 0.04, tone: 'secondary' },
  ],
  yamabuki: [],
  shiro: [
    { t: 0.16, lat: -0.45, rx: 0.06, ry: 0.05, tone: 'secondary' },
    { t: 0.36, lat: 0.4, rx: 0.075, ry: 0.058, tone: 'secondary' },
    { t: 0.58, lat: -0.3, rx: 0.085, ry: 0.06, tone: 'secondary' },
    { t: 0.8, lat: 0.3, rx: 0.05, ry: 0.034, tone: 'secondary' },
  ],
  sanke: [
    { t: 0.11, lat: 0, rx: 0.066, ry: 0.07, tone: 'secondary' },
    { t: 0.44, lat: 0.2, rx: 0.105, ry: 0.08, tone: 'secondary' },
    { t: 0.3, lat: -0.55, rx: 0.045, ry: 0.036, tone: 'accent' },
    { t: 0.56, lat: 0.6, rx: 0.04, ry: 0.032, tone: 'accent' },
    { t: 0.7, lat: -0.35, rx: 0.052, ry: 0.036, tone: 'accent' },
    { t: 0.84, lat: 0.1, rx: 0.036, ry: 0.026, tone: 'secondary' },
  ],
};

/** Lily pads resting on the surface: unit-square position, radius in body lengths. */
const PADS = [
  { u: 0.045, v: 0.2, r: 0.4, rot: 0.6 },
  { u: 0.105, v: 0.31, r: 0.27, rot: 2.4 },
  { u: 0.4, v: 0.9, r: 0.36, rot: 4.1 },
  { u: 0.47, v: 0.955, r: 0.22, rot: 1.2 },
  { u: 0.6, v: 0.085, r: 0.3, rot: 5.2 },
] as const;

interface Koi {
  spec: KoiSpecimen;
  route: (t: number) => [number, number];
  jx: Float64Array;
  jy: Float64Array;
  heading: number;
  speed: number;
  phase: number;
  trailX: number[];
  trailY: number[];
  /** Length already dropped off the old end, so dashes stay fixed on the water. */
  trailDropped: number;
  trailClock: number;
}

interface Ripple {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
  alpha: number;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
}

function wrapAngle(angle: number): number {
  let a = angle;
  while (a > Math.PI) a -= TAU;
  while (a < -Math.PI) a += TAU;
  return a;
}

export function createKoiField(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  options: KoiFieldOptions,
): KoiFieldController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) {
    return { ...NOOP_FIELD, setSelected: () => {}, setHighlighted: () => {}, feed: () => {} };
  }
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const { reducedMotion } = options;

  let width = 0;
  let height = 0;
  let dpr = 1;
  /** Koi body length in CSS pixels. */
  let bodyLength = 150;
  let baseSpeed = 60;
  const zone = { x0: 0, y0: 0, x1: 1, y1: 1 };
  let bed: HTMLCanvasElement | null = null;

  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let time = 0;
  let nextSurfacing = 4;
  let feedTurn = 0;

  let selected: KoiId | null = null;
  let highlighted: KoiId | null = null;
  let hovered: KoiId | null = null;

  const pointer = { x: 0, y: 0, inside: false, wakeX: 0, wakeY: 0 };
  const pellets: { x: number; y: number }[] = [];
  const ripples: Ripple[] = [];
  const petals: Petal[] = [];

  const koi: Koi[] = options.specimens.map((spec) => ({
    spec,
    route: ROUTES[spec.id],
    jx: new Float64Array(JOINTS),
    jy: new Float64Array(JOINTS),
    heading: 0,
    speed: 0,
    phase: 0,
    trailX: [],
    trailY: [],
    trailDropped: 0,
    trailClock: 0,
  }));

  // Scratch buffers reused every frame.
  const spX = new Float64Array(JOINTS);
  const spY = new Float64Array(JOINTS);
  const dirX = new Float64Array(JOINTS);
  const dirY = new Float64Array(JOINTS);
  const norX = new Float64Array(JOINTS);
  const norY = new Float64Array(JOINTS);
  const outline = new Float64Array((JOINTS * 2 + 2) * 2);
  const trailLen = new Float64Array(TRAIL_SAMPLES + 1);

  function routePoint(k: Koi, t: number): [number, number] {
    const [u, v] = k.route(t);
    return [zone.x0 + u * (zone.x1 - zone.x0), zone.y0 + v * (zone.y1 - zone.y0)];
  }

  function placeKoi() {
    const segment = bodyLength / (JOINTS - 1);
    koi.forEach((k, index) => {
      const [x, y] = routePoint(k, time);
      const [ax, ay] = routePoint(k, time + 0.6);
      k.heading = Math.atan2(ay - y, ax - x);
      k.speed = baseSpeed * 0.7;
      k.phase = index * 1.7;
      for (let i = 0; i < JOINTS; i++) {
        k.jx[i] = x - Math.cos(k.heading) * segment * i;
        k.jy[i] = y - Math.sin(k.heading) * segment * i;
      }
      k.trailX.length = 0;
      k.trailY.length = 0;
      k.trailDropped = 0;
      k.trailClock = 0;
    });
  }

  function paintBed() {
    const sheet = document.createElement('canvas');
    sheet.width = Math.max(1, Math.round(width * dpr));
    sheet.height = Math.max(1, Math.round(height * dpr));
    const b = sheet.getContext('2d');
    if (!b) return;
    b.scale(dpr, dpr);
    const random = seededRandom(11);

    const stones = Math.round((width * height) / 30000);
    for (let i = 0; i < stones; i++) {
      const x = random() * width;
      const y = random() * height;
      const rx = 16 + random() * 46;
      const ry = rx * (0.55 + random() * 0.3);
      const rot = random() * Math.PI;
      b.fillStyle = 'rgba(6, 20, 19, 0.38)';
      b.beginPath();
      b.ellipse(x + 4, y + 7, rx, ry, rot, 0, TAU);
      b.fill();
      b.fillStyle = `rgba(82, 110, 88, ${(0.15 + random() * 0.15).toFixed(3)})`;
      b.beginPath();
      b.ellipse(x, y, rx, ry, rot, 0, TAU);
      b.fill();
      b.strokeStyle = 'rgba(214, 199, 169, 0.06)';
      b.lineWidth = 1;
      b.beginPath();
      b.ellipse(x - 1, y - 2, rx * 0.86, ry * 0.8, rot, Math.PI * 1.05, Math.PI * 1.75);
      b.stroke();
    }

    for (let i = 0; i < stones * 4; i++) {
      b.fillStyle = `rgba(214, 199, 169, ${(0.04 + random() * 0.07).toFixed(3)})`;
      b.beginPath();
      b.arc(random() * width, random() * height, 1.2 + random() * 3.2, 0, TAU);
      b.fill();
    }
    bed = sheet;
  }

  function seedPetals() {
    const random = seededRandom(5);
    petals.length = 0;
    const count = width < 700 ? 5 : 9;
    for (let i = 0; i < count; i++) {
      petals.push({
        x: random() * width,
        y: random() * height,
        vx: 3 + random() * 5,
        vy: 1 + random() * 2.5,
        rot: random() * TAU,
        spin: (random() - 0.5) * 0.3,
      });
    }
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    if (nextWidth === width && nextHeight === height) return;

    const scaleX = width > 0 ? nextWidth / width : 0;
    const scaleY = height > 0 ? nextHeight / height : 0;
    width = nextWidth;
    height = nextHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    bodyLength = clamp(width * 0.105, 84, 168);
    baseSpeed = bodyLength * 0.4;
    // On wide layouts the field notes sit over the right-hand third, so keep the routes clear of it.
    const wide = width >= 900;
    zone.x0 = bodyLength * 0.7;
    zone.x1 = wide ? width * 0.69 : width - bodyLength * 0.6;
    zone.y0 = height * 0.17;
    zone.y1 = height * 0.85;

    paintBed();
    seedPetals();
    ripples.length = 0;
    pellets.length = 0;

    if (reducedMotion || scaleX === 0) {
      placeKoi();
      settle();
    } else {
      // A live pond keeps swimming through a resize: carry the koi and their lines across.
      for (const k of koi) {
        for (let i = 0; i < JOINTS; i++) {
          k.jx[i] *= scaleX;
          k.jy[i] *= scaleY;
        }
        for (let i = 0; i < k.trailX.length; i++) {
          k.trailX[i] *= scaleX;
          k.trailY[i] *= scaleY;
        }
      }
    }
    draw();
  }

  /** Advance the pond unseen, so it is first shown with koi mid-route and their lines already drawn. */
  function settle() {
    for (let i = 0; i < 520; i++) step(1 / 30);
    ripples.length = 0;
  }

  function addRipple(x: number, y: number, radius: number, life: number, alpha: number) {
    if (ripples.length > 14) ripples.shift();
    // A still ripple is held part-way open instead of travelling.
    ripples.push({ x, y, age: reducedMotion ? life * 0.5 : 0, life, radius, alpha });
  }

  function dropFood(x: number, y: number) {
    const px = clamp(x, bodyLength * 0.4, width - bodyLength * 0.4);
    const py = clamp(y, height * 0.1, height * 0.9);
    addRipple(px, py, bodyLength * 0.55, 1.9, 0.6);
    if (reducedMotion) {
      if (ripples.length > 3) ripples.shift();
      draw();
    } else {
      if (pellets.length >= MAX_PELLETS) pellets.shift();
      pellets.push({ x: px, y: py });
    }
    options.onFeed();
  }

  function step(dt: number) {
    time += dt;
    const segment = bodyLength / (JOINTS - 1);
    const feeding = pellets.length > 0;

    for (let index = 0; index < koi.length; index++) {
      const k = koi[index];
      const hx = k.jx[0];
      const hy = k.jy[0];
      let [tx, ty] = routePoint(k, time);
      let boost = 1;

      if (feeding) {
        let best = Infinity;
        for (const pellet of pellets) {
          const d = Math.hypot(pellet.x - hx, pellet.y - hy);
          if (d < best) {
            best = d;
            tx = pellet.x;
            ty = pellet.y;
          }
        }
        boost = 1.8;
      }

      let dx = tx - hx;
      let dy = ty - hy;
      const dist = Math.hypot(dx, dy) || 1;
      dx /= dist;
      dy /= dist;

      // Koi give the pointer a little room unless there is food on the water.
      if (pointer.inside && !feeding) {
        const shy = bodyLength * 0.95;
        const pd = Math.hypot(hx - pointer.x, hy - pointer.y) || 1;
        if (pd < shy) {
          const force = 1 - pd / shy;
          dx += ((hx - pointer.x) / pd) * force * 1.9;
          dy += ((hy - pointer.y) / pd) * force * 1.9;
          boost += force * 0.9;
        }
      }

      // And keep a little room from each other.
      for (let other = 0; other < koi.length; other++) {
        if (other === index) continue;
        const ox = hx - koi[other].jx[0];
        const oy = hy - koi[other].jy[0];
        const od = Math.hypot(ox, oy) || 1;
        const personal = bodyLength * 0.5;
        if (od < personal) {
          const force = (1 - od / personal) * 0.8;
          dx += (ox / od) * force;
          dy += (oy / od) * force;
        }
      }

      const desired = Math.atan2(dy, dx);
      const maxTurn = (feeding ? 2.7 : 1.7) * dt;
      k.heading += clamp(wrapAngle(desired - k.heading), -maxTurn, maxTurn);

      const targetSpeed = baseSpeed * clamp(dist / (bodyLength * 0.9), 0.5, 1.9) * boost;
      k.speed += (targetSpeed - k.speed) * Math.min(1, dt * 2.2);

      k.jx[0] = hx + Math.cos(k.heading) * k.speed * dt;
      k.jy[0] = hy + Math.sin(k.heading) * k.speed * dt;
      for (let i = 1; i < JOINTS; i++) {
        let sx = k.jx[i] - k.jx[i - 1];
        let sy = k.jy[i] - k.jy[i - 1];
        const sd = Math.hypot(sx, sy) || 1;
        sx /= sd;
        sy /= sd;
        k.jx[i] = k.jx[i - 1] + sx * segment;
        k.jy[i] = k.jy[i - 1] + sy * segment;
      }
      k.phase += dt * (3.6 + 4.8 * (k.speed / baseSpeed));

      k.trailClock += dt;
      if (k.trailClock >= TRAIL_INTERVAL) {
        k.trailClock = 0;
        k.trailX.push(k.jx[JOINTS - 1]);
        k.trailY.push(k.jy[JOINTS - 1]);
        if (k.trailX.length > TRAIL_SAMPLES) {
          k.trailDropped += Math.hypot(k.trailX[1] - k.trailX[0], k.trailY[1] - k.trailY[0]);
          k.trailX.shift();
          k.trailY.shift();
        }
      }

      if (feeding) {
        for (let p = pellets.length - 1; p >= 0; p--) {
          if (Math.hypot(pellets[p].x - k.jx[0], pellets[p].y - k.jy[0]) < bodyLength * 0.14) {
            addRipple(pellets[p].x, pellets[p].y, bodyLength * 0.3, 1.1, 0.5);
            pellets.splice(p, 1);
          }
        }
      }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].age += dt;
      if (ripples[i].age >= ripples[i].life) ripples.splice(i, 1);
    }

    for (const petal of petals) {
      petal.x += petal.vx * dt;
      petal.y += petal.vy * dt;
      petal.rot += petal.spin * dt;
      if (petal.x > width + 12) petal.x = -12;
      if (petal.y > height + 12) petal.y = -12;
    }

    // Now and then a koi breaks the surface.
    if (time > nextSurfacing) {
      const k = koi[Math.floor(time * 7.3) % koi.length];
      addRipple(k.jx[0], k.jy[0], bodyLength * 0.34, 1.6, 0.34);
      nextSurfacing = time + 4.5 + ((time * 13.7) % 4);
    }

    if (pointer.inside) {
      const moved = Math.hypot(pointer.x - pointer.wakeX, pointer.y - pointer.wakeY);
      if (moved > 54) {
        pointer.wakeX = pointer.x;
        pointer.wakeY = pointer.y;
        addRipple(pointer.x, pointer.y, 22, 1.1, 0.22);
      }
    }
  }

  function computeSpine(k: Koi) {
    const amplitude = bodyLength * 0.036 * (0.55 + 0.6 * Math.min(1.6, k.speed / baseSpeed));
    for (let i = 0; i < JOINTS; i++) {
      const a = i === 0 ? 0 : i - 1;
      const b = i === JOINTS - 1 ? i : i + 1;
      let dx = k.jx[a] - k.jx[b];
      let dy = k.jy[a] - k.jy[b];
      const d = Math.hypot(dx, dy) || 1;
      dx /= d;
      dy /= d;
      const sway = Math.sin(k.phase - i * 0.62) * amplitude * Math.pow(i / (JOINTS - 1), 1.5);
      dirX[i] = dx;
      dirY[i] = dy;
      norX[i] = -dy;
      norY[i] = dx;
      spX[i] = k.jx[i] - dy * sway;
      spY[i] = k.jy[i] + dx * sway;
    }
  }

  /** Smooth closed body outline from the current spine, optionally offset (for the shadow). */
  function bodyPath(ox: number, oy: number) {
    let n = 0;
    outline[n++] = spX[0] + dirX[0] * bodyLength * 0.035;
    outline[n++] = spY[0] + dirY[0] * bodyLength * 0.035;
    for (let i = 0; i < JOINTS; i++) {
      outline[n++] = spX[i] + norX[i] * HALF_W[i] * bodyLength;
      outline[n++] = spY[i] + norY[i] * HALF_W[i] * bodyLength;
    }
    outline[n++] = spX[JOINTS - 1] - dirX[JOINTS - 1] * bodyLength * 0.012;
    outline[n++] = spY[JOINTS - 1] - dirY[JOINTS - 1] * bodyLength * 0.012;
    for (let i = JOINTS - 1; i >= 0; i--) {
      outline[n++] = spX[i] - norX[i] * HALF_W[i] * bodyLength;
      outline[n++] = spY[i] - norY[i] * HALF_W[i] * bodyLength;
    }

    const count = n / 2;
    ctx.beginPath();
    ctx.moveTo(
      (outline[(count - 1) * 2] + outline[0]) / 2 + ox,
      (outline[(count - 1) * 2 + 1] + outline[1]) / 2 + oy,
    );
    for (let i = 0; i < count; i++) {
      const x = outline[i * 2];
      const y = outline[i * 2 + 1];
      const next = ((i + 1) % count) * 2;
      ctx.quadraticCurveTo(x + ox, y + oy, (x + outline[next]) / 2 + ox, (y + outline[next + 1]) / 2 + oy);
    }
    ctx.closePath();
  }

  function fin(rootX: number, rootY: number, angle: number, length: number, spread: number) {
    const cx = Math.cos(angle);
    const cy = Math.sin(angle);
    const midX = rootX + cx * length * 0.5;
    const midY = rootY + cy * length * 0.5;
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.quadraticCurveTo(midX - cy * spread, midY + cx * spread, rootX + cx * length, rootY + cy * length);
    ctx.quadraticCurveTo(midX + cy * spread * 0.3, midY - cx * spread * 0.3, rootX, rootY);
    ctx.fill();
  }

  function drawKoi(k: Koi, alpha: number) {
    computeSpine(k);
    const L = bodyLength;
    const gold = k.spec.id === 'yamabuki';
    const tailIndex = JOINTS - 1;

    // Shadow on the pond bed.
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = '#04100F';
    bodyPath(L * 0.07, L * 0.11);
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.fillStyle = gold ? 'rgba(226, 180, 128, 0.82)' : 'rgba(244, 239, 226, 0.74)';

    // Forked tail, swaying with the last of the body wave.
    const tailBack =
      Math.atan2(-dirY[tailIndex], -dirX[tailIndex]) + Math.sin(k.phase - JOINTS * 0.62) * 0.42;
    fin(spX[tailIndex], spY[tailIndex], tailBack - 0.36, L * 0.3, L * 0.075);
    fin(spX[tailIndex], spY[tailIndex], tailBack + 0.36, L * 0.3, -L * 0.075);

    // Paired pectoral and pelvic fins.
    for (const side of [1, -1]) {
      const flap = Math.sin(k.phase * 0.5 + side) * 0.16;
      const pectoralBack = Math.atan2(-dirY[3], -dirX[3]);
      fin(
        spX[3] + norX[3] * side * HALF_W[3] * L * 0.8,
        spY[3] + norY[3] * side * HALF_W[3] * L * 0.8,
        pectoralBack - side * (0.92 + flap),
        L * 0.21,
        side * L * 0.075,
      );
      const pelvicBack = Math.atan2(-dirY[7], -dirX[7]);
      fin(
        spX[7] + norX[7] * side * HALF_W[7] * L * 0.8,
        spY[7] + norY[7] * side * HALF_W[7] * L * 0.8,
        pelvicBack - side * 0.7,
        L * 0.11,
        side * L * 0.04,
      );
    }

    ctx.fillStyle = k.spec.primaryColor;
    bodyPath(0, 0);
    ctx.fill();

    ctx.save();
    ctx.clip();
    for (const blob of PATTERNS[k.spec.id]) {
      const at = blob.t * (JOINTS - 1);
      const i0 = Math.min(JOINTS - 2, Math.floor(at));
      const f = at - i0;
      const halfWidth = (HALF_W[i0] + (HALF_W[i0 + 1] - HALF_W[i0]) * f) * L;
      const cx = spX[i0] + (spX[i0 + 1] - spX[i0]) * f + norX[i0] * blob.lat * halfWidth;
      const cy = spY[i0] + (spY[i0 + 1] - spY[i0]) * f + norY[i0] * blob.lat * halfWidth;
      ctx.fillStyle = blob.tone === 'accent' ? k.spec.accentColor : k.spec.secondaryColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, blob.rx * L, blob.ry * L, Math.atan2(dirY[i0], dirX[i0]), 0, TAU);
      ctx.fill();
    }
    // Soft rim so the body reads as rounded under the water.
    bodyPath(0, 0);
    ctx.strokeStyle = 'rgba(17, 44, 42, 0.26)';
    ctx.lineWidth = L * 0.04;
    ctx.stroke();
    ctx.restore();

    // Dorsal ridge.
    ctx.strokeStyle = gold ? 'rgba(253, 251, 245, 0.5)' : 'rgba(214, 199, 169, 0.75)';
    ctx.lineWidth = L * 0.022;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(spX[3], spY[3]);
    for (let i = 4; i <= 7; i++) ctx.lineTo(spX[i], spY[i]);
    ctx.stroke();

    // Eyes.
    ctx.fillStyle = '#1E2320';
    for (const side of [1, -1]) {
      ctx.beginPath();
      ctx.arc(
        spX[1] + dirX[1] * L * 0.03 + norX[1] * side * HALF_W[1] * L * 0.78,
        spY[1] + dirY[1] * L * 0.03 + norY[1] * side * HALF_W[1] * L * 0.78,
        L * 0.013,
        0,
        TAU,
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawTrail(k: Koi, alpha: number, emphasised: boolean) {
    const n = k.trailX.length;
    if (n < 2) return;

    trailLen[0] = 0;
    for (let i = 1; i < n; i++) {
      trailLen[i] =
        trailLen[i - 1] + Math.hypot(k.trailX[i] - k.trailX[i - 1], k.trailY[i] - k.trailY[i - 1]);
    }

    ctx.strokeStyle = k.spec.trailColor;
    ctx.lineWidth = emphasised ? 2.2 : 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash(k.spec.trailDash as number[]);

    const per = Math.ceil(n / TRAIL_CHUNKS);
    for (let chunk = 0; chunk < TRAIL_CHUNKS; chunk++) {
      const start = chunk * per;
      if (start >= n - 1) break;
      const end = Math.min(n - 1, start + per);
      ctx.globalAlpha = alpha * Math.pow((chunk + 1) / TRAIL_CHUNKS, 1.5);
      ctx.lineDashOffset = -(k.trailDropped + trailLen[start]);
      ctx.beginPath();
      ctx.moveTo(k.trailX[start], k.trailY[start]);
      for (let i = start + 1; i <= end; i++) ctx.lineTo(k.trailX[i], k.trailY[i]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.globalAlpha = 1;
  }

  function drawPad(index: number, shadow: boolean) {
    const pad = PADS[index];
    const radius = pad.r * bodyLength;
    const x = pad.u * width + Math.sin(time * 0.31 + index * 2.1) * 2.5;
    const y = pad.v * height + Math.cos(time * 0.27 + index * 1.3) * 2;
    const rot = pad.rot + Math.sin(time * 0.16 + index) * 0.07;

    ctx.save();
    ctx.translate(x + (shadow ? radius * 0.12 : 0), y + (shadow ? radius * 0.2 : 0));
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0.17, TAU - 0.17);
    ctx.closePath();
    if (shadow) {
      ctx.fillStyle = 'rgba(4, 16, 15, 0.3)';
      ctx.fill();
    } else {
      ctx.fillStyle = '#3F6049';
      ctx.fill();
      ctx.strokeStyle = 'rgba(244, 239, 226, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(17, 44, 42, 0.3)';
      ctx.beginPath();
      for (let vein = 1; vein <= 5; vein++) {
        const angle = 0.17 + ((TAU - 0.34) * vein) / 6;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius * 0.86, Math.sin(angle) * radius * 0.86);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFocus(k: Koi) {
    const cx = k.jx[5];
    const cy = k.jy[5];
    const radius = bodyLength * 0.66;

    ctx.strokeStyle = 'rgba(199, 166, 162, 0.85)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 7]);
    ctx.lineDashOffset = -time * 9;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, TAU);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;

    const label = `${k.spec.number} · ${k.spec.label.toUpperCase()}`;
    ctx.font = `500 11px ${options.labelFont}`;
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '1.2px';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    // Keep the tag on the canvas when the koi swims along the top edge.
    const above = cy - radius - 12 > 16;
    const labelY = above ? cy - radius - 12 : cy + radius + 22;
    ctx.fillStyle = 'rgba(244, 239, 226, 0.95)';
    ctx.fillText(label, clamp(cx, 90, width - 90), labelY);
  }

  function draw() {
    if (width === 0) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    if (bed) ctx.drawImage(bed, 0, 0, width, height);

    for (let i = 0; i < PADS.length; i++) drawPad(i, true);

    const focusId = selected ?? highlighted ?? hovered;
    for (const k of koi) {
      const isFocus = k.spec.id === focusId;
      drawTrail(k, focusId ? (isFocus ? 1 : 0.16) : 0.78, isFocus);
    }
    for (const k of koi) {
      if (k.spec.id !== focusId) drawKoi(k, focusId ? 0.4 : 1);
    }
    const focus = focusId ? koi.find((k) => k.spec.id === focusId) : undefined;
    if (focus) drawKoi(focus, 1);

    ctx.fillStyle = '#CB9462';
    for (const pellet of pellets) {
      ctx.beginPath();
      ctx.arc(pellet.x, pellet.y, 3, 0, TAU);
      ctx.fill();
    }

    ctx.lineWidth = 1.2;
    for (const ripple of ripples) {
      const progress = ripple.age / ripple.life;
      const eased = 1 - Math.pow(1 - progress, 3);
      for (let ring = 0; ring < 2; ring++) {
        const radius = ripple.radius * eased * (ring === 0 ? 1 : 0.58);
        if (radius < 1) continue;
        ctx.strokeStyle = `rgba(244, 239, 226, ${(ripple.alpha * (1 - progress) * (ring === 0 ? 1 : 0.6)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, TAU);
        ctx.stroke();
      }
    }

    for (let i = 0; i < PADS.length; i++) drawPad(i, false);

    ctx.fillStyle = 'rgba(199, 166, 162, 0.85)';
    for (const petal of petals) {
      ctx.beginPath();
      ctx.ellipse(petal.x, petal.y, bodyLength * 0.04, bodyLength * 0.022, petal.rot, 0, TAU);
      ctx.fill();
    }

    if (focus) drawFocus(focus);
  }

  function koiAt(x: number, y: number): KoiId | null {
    for (let index = koi.length - 1; index >= 0; index--) {
      const k = koi[index];
      for (let i = 0; i < JOINTS; i++) {
        if (Math.hypot(k.jx[i] - x, k.jy[i] - y) < HALF_W[i] * bodyLength + 12) return k.spec.id;
      }
    }
    return null;
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;
    step(dt);

    const nextHovered = pointer.inside ? koiAt(pointer.x, pointer.y) : null;
    if (nextHovered !== hovered) {
      hovered = nextHovered;
      canvas.style.cursor = hovered ? 'pointer' : '';
    }

    draw();
    raf = requestAnimationFrame(frame);
  }

  function localPoint(event: PointerEvent | MouseEvent): [number, number] {
    const rect = canvas.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  }

  const onPointerMove = (event: PointerEvent) => {
    const [x, y] = localPoint(event);
    if (!pointer.inside) {
      pointer.wakeX = x;
      pointer.wakeY = y;
    }
    pointer.x = x;
    pointer.y = y;
    // A resting finger should not keep pushing the koi away.
    pointer.inside = event.pointerType !== 'touch';
  };

  const onPointerLeave = () => {
    pointer.inside = false;
  };

  const onClick = (event: MouseEvent) => {
    const [x, y] = localPoint(event);
    const picked = koiAt(x, y);
    if (picked) {
      options.onPick(picked);
    } else {
      dropFood(x, y);
    }
  };

  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('click', onClick);

  resize();

  return {
    setActive(next) {
      if (reducedMotion || next === active) return;
      active = next;
      cancelAnimationFrame(raf);
      if (active) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    resize,
    destroy() {
      destroyed = true;
      active = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
    },
    setSelected(id) {
      selected = id;
      if (reducedMotion) draw();
    },
    setHighlighted(id) {
      highlighted = id;
      if (reducedMotion) draw();
    },
    feed() {
      // Cycle through a few spots so repeated presses do not stack on one point.
      const spots: [number, number][] = [
        [0.5, 0.5],
        [0.3, 0.38],
        [0.66, 0.62],
      ];
      const [u, v] = spots[feedTurn % spots.length];
      feedTurn += 1;
      dropFood(zone.x0 + u * (zone.x1 - zone.x0), zone.y0 + v * (zone.y1 - zone.y0));
    },
  };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/field/mount.ts">
<![CDATA[export interface FieldController {
  /** Runs the animation loop only while the host is on screen. */
  setActive(active: boolean): void;
  resize(): void;
  destroy(): void;
}

export const NOOP_FIELD: FieldController = {
  setActive: () => {},
  resize: () => {},
  destroy: () => {},
};

/** Wires a canvas field to its host: pause off screen, re-fit on resize, tear down on cleanup. */
export function mountField(host: HTMLElement, controller: FieldController): () => void {
  const visibility = new IntersectionObserver(
    (entries) => {
      const entry = entries[entries.length - 1];
      if (entry) controller.setActive(entry.isIntersecting);
    },
    { rootMargin: '120px 0px' },
  );
  const size = new ResizeObserver(() => controller.resize());

  visibility.observe(host);
  size.observe(host);

  return () => {
    visibility.disconnect();
    size.disconnect();
    controller.destroy();
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/** Small deterministic generator so drawn scenery is identical on every visit. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/field/rippleField.ts">
<![CDATA[import { NOOP_FIELD, type FieldController } from './mount';

export interface RippleFieldOptions {
  reducedMotion: boolean;
  /** RGB triplet for the ring stroke, e.g. "214, 199, 169". */
  rgb: string;
  /** Where the slow ambient rings start, in the unit square. */
  origin: [number, number];
}

export interface RippleFieldController extends FieldController {
  /** Start a ring at a viewport position (client coordinates). */
  emitAt(clientX: number, clientY: number): void;
}

interface Ring {
  x: number;
  y: number;
  age: number;
  life: number;
  radius: number;
  alpha: number;
}

const TAU = Math.PI * 2;
const AMBIENT_EVERY = 2.4;
const MAX_RINGS = 40;

/** Rings of water that spread from a fixed origin and from wherever the pointer travels. */
export function createRippleField(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  options: RippleFieldOptions,
): RippleFieldController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return { ...NOOP_FIELD, emitAt: () => {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;
  const { reducedMotion, rgb, origin } = options;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let ambientClock = AMBIENT_EVERY;
  let lastX = 0;
  let lastY = 0;
  let pointerSeen = false;
  const rings: Ring[] = [];

  function reach(): number {
    return Math.hypot(width, height) * 0.62;
  }

  function push(ring: Ring) {
    if (rings.length >= MAX_RINGS) rings.shift();
    rings.push(ring);
  }

  function drawStill() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    const span = reach();
    for (let i = 1; i <= 7; i++) {
      ctx.strokeStyle = `rgba(${rgb}, ${(0.2 * (1 - i / 8)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(origin[0] * width, origin[1] * height, (span * i) / 7, 0, TAU);
      ctx.stroke();
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (const ring of rings) {
      const progress = ring.age / ring.life;
      // Rings queued with a negative age have not started yet.
      if (progress <= 0) continue;
      const eased = 1 - Math.pow(1 - progress, 2.2);
      // Fade in quickly, then out over the rest of the ring's life.
      const fade = Math.min(1, progress * 8) * (1 - progress);
      ctx.strokeStyle = `rgba(${rgb}, ${(ring.alpha * fade).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, Math.max(0.5, ring.radius * eased), 0, TAU);
      ctx.stroke();
    }
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;

    ambientClock += dt;
    if (ambientClock >= AMBIENT_EVERY) {
      ambientClock = 0;
      push({ x: origin[0] * width, y: origin[1] * height, age: 0, life: 11, radius: reach(), alpha: 0.34 });
    }
    for (let i = rings.length - 1; i >= 0; i--) {
      rings[i].age += dt;
      if (rings[i].age >= rings[i].life) rings.splice(i, 1);
    }

    draw();
    raf = requestAnimationFrame(frame);
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    if (reducedMotion) drawStill();
    else draw();
  }

  function local(clientX: number, clientY: number): [number, number] {
    const rect = canvas.getBoundingClientRect();
    return [clientX - rect.left, clientY - rect.top];
  }

  const onPointerMove = (event: PointerEvent) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const [x, y] = local(event.clientX, event.clientY);
    if (!pointerSeen) {
      pointerSeen = true;
      lastX = x;
      lastY = y;
      return;
    }
    if (Math.hypot(x - lastX, y - lastY) > 72) {
      lastX = x;
      lastY = y;
      push({ x, y, age: 0, life: 2.6, radius: 120, alpha: 0.38 });
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    if (reducedMotion) return;
    const [x, y] = local(event.clientX, event.clientY);
    for (let i = 0; i < 3; i++) {
      push({ x, y, age: -i * 0.22, life: 3.4, radius: 180 + i * 90, alpha: 0.5 });
    }
  };

  // Listen on the host so rings follow the pointer across the copy laid over the canvas.
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerdown', onPointerDown);

  resize();

  return {
    setActive(next) {
      if (reducedMotion || next === active) return;
      active = next;
      cancelAnimationFrame(raf);
      if (active) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    resize,
    destroy() {
      destroyed = true;
      active = false;
      cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
    },
    emitAt(clientX, clientY) {
      if (reducedMotion) return;
      const [x, y] = local(clientX, clientY);
      push({ x, y, age: 0, life: 2.8, radius: 150, alpha: 0.45 });
    },
  };
}
]]>
    </file>
    <file path="src/app/(mizunowa)/mizunowa/field/seasonParticles.ts">
<![CDATA[import type { SeasonId } from '../data/garden';
import { NOOP_FIELD, seededRandom, type FieldController } from './mount';

export interface SeasonParticlesController extends FieldController {
  setSeason(season: SeasonId): void;
}

interface Particle {
  season: SeasonId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  phase: number;
  color: string;
  /** 0 to 1 presence, so one season's air can hand over to the next. */
  fade: number;
  leaving: boolean;
}

const TAU = Math.PI * 2;

/** Particles per million square pixels of scene. */
const DENSITY: Record<SeasonId, number> = { spring: 46, summer: 26, autumn: 32, winter: 90 };

const COLORS: Record<SeasonId, readonly string[]> = {
  spring: ['#C7A6A2', '#DCC3BE', '#F4EFE2'],
  summer: ['#E8C27E', '#F4EFE2'],
  autumn: ['#CB9462', '#9E3F32', '#DDB07A'],
  winter: ['#FDFBF5', '#F4EFE2'],
};

/** What is in the air each season: petals, fireflies, leaves, snow. */
export function createSeasonParticles(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  reducedMotion: boolean,
  initial: SeasonId,
): SeasonParticlesController {
  const maybeCtx = canvas.getContext('2d');
  if (!maybeCtx) return { ...NOOP_FIELD, setSeason: () => {} };
  const ctx: CanvasRenderingContext2D = maybeCtx;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let active = false;
  let destroyed = false;
  let lastFrame = 0;
  let time = 0;
  let season = initial;
  let random = seededRandom(3);
  const particles: Particle[] = [];

  function spawn(kind: SeasonId, scatter: boolean): Particle {
    const palette = COLORS[kind];
    const firefly = kind === 'summer';
    return {
      season: kind,
      x: random() * width,
      // Fireflies keep to the lower garden; everything else falls from above.
      y: firefly ? height * (0.34 + random() * 0.62) : scatter ? random() * height : -12,
      vx: firefly ? (random() - 0.5) * 14 : kind === 'winter' ? -4 - random() * 8 : -8 - random() * 22,
      vy: firefly
        ? (random() - 0.5) * 10
        : kind === 'winter'
          ? 14 + random() * 22
          : kind === 'autumn'
            ? 26 + random() * 34
            : 16 + random() * 24,
      size: firefly
        ? 1.3 + random() * 1.3
        : kind === 'winter'
          ? 1 + random() * 1.8
          : kind === 'autumn'
            ? 5 + random() * 4
            : 3.4 + random() * 3,
      rot: random() * TAU,
      spin: (random() - 0.5) * (kind === 'autumn' ? 2.4 : 1.4),
      phase: random() * TAU,
      color: palette[Math.floor(random() * palette.length)],
      fade: 0,
      leaving: false,
    };
  }

  function populate(kind: SeasonId) {
    const count = Math.round(((width * height) / 1_000_000) * DENSITY[kind]);
    for (let i = 0; i < count; i++) particles.push(spawn(kind, true));
  }

  function step(dt: number) {
    time += dt;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.fade += (p.leaving ? -dt : dt) / 0.9;
      if (p.fade > 1) p.fade = 1;
      if (p.fade <= 0 && p.leaving) {
        particles.splice(i, 1);
        continue;
      }

      if (p.season === 'summer') {
        // Fireflies wander and turn back before leaving the scene.
        p.vx += Math.sin(time * 0.7 + p.phase) * 6 * dt;
        p.vy += Math.cos(time * 0.9 + p.phase * 1.3) * 5 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < height * 0.3 || p.y > height) p.vy *= -1;
        continue;
      }

      const sway = p.season === 'winter' ? 8 : p.season === 'autumn' ? 30 : 20;
      p.x += (p.vx + Math.sin(time * 1.1 + p.phase) * sway) * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;
      if (p.y > height + 14 || p.x < -20) {
        if (p.leaving) {
          particles.splice(i, 1);
        } else {
          const fresh = spawn(p.season, false);
          fresh.fade = 1;
          // Re-enter along the top and the right edge, since everything drifts left.
          if (random() < 0.3) {
            fresh.x = width + 10;
            fresh.y = random() * height * 0.7;
          }
          particles[i] = fresh;
        }
      }
    }
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      if (p.fade <= 0) continue;
      ctx.fillStyle = p.color;

      if (p.season === 'summer') {
        const glow = 0.35 + 0.65 * Math.max(0, Math.sin(time * 1.6 + p.phase));
        ctx.globalAlpha = p.fade * glow * 0.16;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4.5, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = p.fade * glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        continue;
      }

      if (p.season === 'winter') {
        ctx.globalAlpha = p.fade * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        continue;
      }

      ctx.globalAlpha = p.fade * 0.9;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      // Tumbling: the petal or leaf narrows as it turns edge-on.
      ctx.scale(1, 0.45 + 0.4 * Math.abs(Math.sin(time * 1.3 + p.phase)));
      ctx.beginPath();
      if (p.season === 'autumn') {
        ctx.moveTo(-p.size, 0);
        ctx.quadraticCurveTo(0, -p.size * 0.8, p.size, 0);
        ctx.quadraticCurveTo(0, p.size * 0.8, -p.size, 0);
      } else {
        ctx.ellipse(0, 0, p.size, p.size * 0.62, 0, 0, TAU);
      }
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  function frame(now: number) {
    if (!active || destroyed) return;
    const dt = Math.min(0.05, (now - lastFrame) / 1000 || 0.016);
    lastFrame = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  /** Reduced motion: one composed scatter per season, nothing falling. */
  function drawStill() {
    random = seededRandom(3);
    particles.length = 0;
    populate(season);
    for (const p of particles) p.fade = 1;
    time = 1.2;
    draw();
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const nextWidth = Math.round(rect.width);
    const nextHeight = Math.round(rect.height);
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    if (reducedMotion) {
      drawStill();
      return;
    }
    particles.length = 0;
    populate(season);
    draw();
  }

  resize();

  return {
    setActive(next) {
      if (reducedMotion || next === active) return;
      active = next;
      cancelAnimationFrame(raf);
      if (active) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(frame);
      }
    },
    resize,
    destroy() {
      destroyed = true;
      active = false;
      cancelAnimationFrame(raf);
    },
    setSeason(next) {
      if (next === season) return;
      season = next;
      if (reducedMotion) {
        drawStill();
        return;
      }
      for (const p of particles) p.leaving = true;
      populate(next);
    },
  };
}
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
import { getSubmergedStoneFootprints, sculptBoulderGeometry } from './water';
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

function smoothstepScalar(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0 || 1)));
  return t * t * (3 - 2 * t);
}

interface BoulderExtents {
  maxRx: number;
  maxRz: number;
  minY: number;
  maxY: number;
}

function measureGeometryExtents(geo: THREE.BufferGeometry): BoulderExtents {
  const pos = geo.attributes.position;
  let maxRx = 0;
  let maxRz = 0;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < pos.count; i++) {
    const x = Math.abs(pos.getX(i));
    const y = pos.getY(i);
    const z = Math.abs(pos.getZ(i));
    if (x > maxRx) maxRx = x;
    if (z > maxRz) maxRz = z;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return {
    maxRx,
    maxRz,
    minY: Number.isFinite(minY) ? minY : -0.25,
    maxY: Number.isFinite(maxY) ? maxY : 0.25,
  };
}

function createFlaredTubeGeometry(
  curve: THREE.CatmullRomCurve3,
  segs: number,
  baseRadius: number,
  taperRatio: number,
  flareStrength: number,
  radialSegs = 9,
  flareHeightMeters = 0.72,
): THREE.BufferGeometry {
  const geo = new THREE.TubeGeometry(curve, segs, baseRadius, radialSegs, false);
  const pos = geo.attributes.position;
  const uvAttr = geo.attributes.uv;
  const totalLen = Math.max(0.5, curve.getLength());
  const flareZone = Math.min(0.45, Math.max(0.1, flareHeightMeters / totalLen));
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    const ringIdx = Math.floor(i / (radialSegs + 1));
    const t = Math.min(1, ringIdx / segs);
    const center = curve.getPointAt(t);
    const taper = 1 - t * taperRatio;
    const flare =
      t < flareZone && flareStrength > 0
        ? 1 + flareStrength * Math.pow(1 - t / flareZone, 1.8)
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

/**
 * Generates a unified terrain-conforming root buttress flare collar in tree-local space
 * so every root rib swells directly out of the trunk and dives seamlessly beneath sloped soil.
 */
function createTerrainRootFlareGeometry(
  grounder: TerrainGrounder,
  worldOriginX: number,
  worldOriginY: number,
  worldOriginZ: number,
  yaw: number,
  worldScale: number,
  trunkRadius: number,
  flareScale: number,
  flareHeight: number,
  lobeCount: number,
  seed: number,
): THREE.BufferGeometry {
  const rings = 10;
  const radSegs = 28;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);

  for (let r = 0; r <= rings; r++) {
    const s = r / rings; // 0 = trunk collar top, 1 = soil-buried outer root apron
    const sCurve = Math.pow(s, 1.48);
    for (let a = 0; a <= radSegs; a++) {
      const theta = (a / radSegs) * Math.PI * 2;
      const rootWave = Math.pow(
        0.5 +
          0.5 * Math.cos(lobeCount * theta + seed + Math.sin(theta * 2 + seed) * 0.42),
        2.3,
      );
      const radialRadius =
        trunkRadius * (0.94 + sCurve * (flareScale * (0.04 + rootWave * 1.15)));

      const lx = Math.cos(theta) * radialRadius;
      const lz = Math.sin(theta) * radialRadius;
      // Mirror Three.js Group transform (scale -> rotY -> translate)
      const wx = worldOriginX + (lx * cosY + lz * sinY) * worldScale;
      const wz = worldOriginZ + (-lx * sinY + lz * cosY) * worldScale;
      const groundWorldY = grounder.raycastSurface(wx, wz).y;
      const localGroundY = (groundWorldY - worldOriginY) / worldScale;

      const buttressCrown = rootWave * Math.sin(s * Math.PI) * flareHeight * 0.42;
      const soilEmbedDip = smoothstepScalar(0.68, 1.0, s) * 0.14;
      const baseSlopeY = flareHeight * (1 - s) + localGroundY * s;
      const ly = Math.max(
        localGroundY - 0.16,
        baseSlopeY + buttressCrown - soilEmbedDip,
      );

      positions.push(lx, ly, lz);
      uvs.push(s * 0.9, (a / radSegs) * 2.5);
    }
  }

  const stride = radSegs + 1;
  for (let r = 0; r < rings; r++) {
    for (let a = 0; a < radSegs; a++) {
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
 * Builds a tapered organic water tube along a CubicBezierCurve3 with slight elliptical
 * cross-section flattening and accelerating stream taper.
 */
function createTaperedStreamGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  segs: number,
  radiusStart: number,
  radiusEnd: number,
  radialSegs = 10,
): THREE.BufferGeometry {
  const geo = new THREE.TubeGeometry(curve, segs, 1, radialSegs, false);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    const ringIdx = Math.floor(i / (radialSegs + 1));
    const t = Math.min(1, ringIdx / segs);
    const center = curve.getPointAt(t);
    // Gentle pinch just past lip, slight ribbon spread mid-flight, cohesive plunge
    const r = radiusStart * (1 - t) + radiusEnd * t + Math.sin(t * Math.PI) * 0.002;
    v.fromBufferAttribute(pos, i).sub(center);
    v.x *= r * 1.18;
    v.y *= r * 0.88;
    v.z *= r * 1.18;
    v.add(center);
    pos.setXYZ(i, v.x, v.y, v.z);
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
    return { geo, extents: measureGeometryExtents(geo) };
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
      const proto = boulderPrototypes[idx % boulderPrototypes.length];
      const footprintRadius = 0.56 * Math.max(sx, sz);
      const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;

      const mesh = new THREE.Mesh(proto.geo, shoreMat);
      const yaw = -angle + 0.45 * Math.cos(idx * 2.3);
      const grounded = grounder.groundPropFootprint(
        pt.x,
        pt.z,
        footprintRadius * 0.65,
        0.2,
        0.04,
      );
      const supportY = isWaterSide
        ? Math.min(grounded.minY, pondBedElevation(pt.x, pt.z))
        : grounded.minY;
      // Guarantee lowest displaced underside sits strictly beneath downhill rim
      const safeAnchorY = Math.min(
        grounded.y,
        supportY - proto.extents.minY * sy - 0.032,
      );

      mesh.position.set(pt.x, safeAnchorY, pt.z);
      baseEuler.set(0.05 * Math.sin(idx * 1.9), yaw, 0.04 * Math.cos(idx * 2.1));
      baseQuat.setFromEuler(baseEuler);
      mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);

      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      registry.register({
        id: `shore-boulder-${idx}`,
        kind: 'rock',
        x: pt.x,
        z: pt.z,
        rx: proto.extents.maxRx * sx,
        rz: proto.extents.maxRz * sz,
        yaw,
        margin: 0.1,
        baseY: mesh.position.y + proto.extents.minY * sy,
        topY: mesh.position.y + proto.extents.maxY * sy,
      });
    });
  });

  // Low wet shoreline cobbles softening bank-to-water transitions (keeping stream channel clear)
  const cobbleCount = 36;
  for (let i = 0; i < cobbleCount; i++) {
    const angle = (i / cobbleCount) * Math.PI * 2 + 0.09 * Math.sin(i * 4.3);
    const pt = pondBoundaryPoint(angle, 0.97 + (i % 3) * 0.03);

    // Keep the waterfall inlet opening unobstructed
    const dStream = Math.hypot(
      pt.x - (WATERFALL_SOURCE_POINT.x + WATERFALL_IMPACT_POINT.x) * 0.5,
      pt.z - (WATERFALL_SOURCE_POINT.z + WATERFALL_IMPACT_POINT.z) * 0.5,
    );
    if (dStream < 0.85) continue;

    const proto = boulderPrototypes[(i + 2) % boulderPrototypes.length];
    const mesh = new THREE.Mesh(proto.geo, shoreMat);
    const s = 0.24 + (i % 4) * 0.07;
    const csx = s * 1.25;
    const csy = s * 0.42;
    const csz = s * 0.94;
    const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;
    const yaw = i * 1.35;
    const grounded = grounder.groundPropFootprint(pt.x, pt.z, s * 0.45, 0.22, s * 0.12);
    const supportY = isWaterSide
      ? Math.min(grounded.minY, pondBedElevation(pt.x, pt.z))
      : grounded.minY;
    const safeY = Math.min(grounded.y, supportY - proto.extents.minY * csy - 0.015);

    mesh.position.set(pt.x, safeY, pt.z);
    baseEuler.set(0.05 * Math.sin(i), yaw, 0.04 * Math.cos(i));
    baseQuat.setFromEuler(baseEuler);
    mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);

    mesh.scale.set(csx, csy, csz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    registry.register({
      id: `shore-cobble-${i}`,
      kind: 'cobble',
      x: pt.x,
      z: pt.z,
      rx: proto.extents.maxRx * csx,
      rz: proto.extents.maxRz * csz,
      yaw,
      margin: 0.06,
      baseY: mesh.position.y + proto.extents.minY * csy,
      topY: mesh.position.y + proto.extents.maxY * csy,
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
      flare: 0.24,
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
    const tubeGeo = createFlaredTubeGeometry(
      curve,
      spec.segs,
      spec.r,
      spec.taper,
      spec.flare,
      9,
      spec.flare > 0 ? 0.42 : 0.72,
    );
    const mesh = new THREE.Mesh(tubeGeo, barkMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    disposables.push(tubeGeo);
  });

  // Unified terrain-conforming root buttress collar directly integrated into the main trunk bark
  const rootOriginLocal = new THREE.Vector3(0.09, 0.0, 0.07);
  const rootOriginWorld = rootOriginLocal.clone().applyMatrix4(group.matrixWorld);
  const flareCollarGeo = createTerrainRootFlareGeometry(
    grounder,
    rootOriginWorld.x,
    baseHit.y,
    rootOriginWorld.z,
    treeYaw,
    treeScale,
    0.225,
    0.68,
    0.42,
    5,
    1.15,
  );
  const flareCollarMesh = new THREE.Mesh(flareCollarGeo, barkMat);
  flareCollarMesh.position.set(rootOriginLocal.x, 0, rootOriginLocal.z);
  flareCollarMesh.castShadow = true;
  flareCollarMesh.receiveShadow = true;
  group.add(flareCollarMesh);
  disposables.push(flareCollarGeo);

  // Asymmetric irregular velvet moss creeping into root valleys at soil contact
  const rootMossMat = new THREE.MeshStandardNodeMaterial({
    map: textures.mossAlbedo,
    normalMap: textures.mossNormal,
    roughness: 0.96,
    metalness: 0.0,
    color: 0x44582a,
  });
  const rootMossGeo = new THREE.SphereGeometry(0.18, 12, 8);
  const rmPos = rootMossGeo.attributes.position;
  for (let i = 0; i < rmPos.count; i++) {
    const vx = rmPos.getX(i);
    const vy = rmPos.getY(i);
    const vz = rmPos.getZ(i);
    const ang = Math.atan2(vz, vx);
    const lobe = 1 + 0.24 * Math.sin(ang * 3 + 0.5) + 0.14 * Math.cos(ang * 2 - 0.8);
    rmPos.setXYZ(i, vx * lobe * 1.15, vy * 0.22, vz * lobe * 0.78);
  }
  rootMossGeo.computeVertexNormals();
  disposables.push(rootMossMat, rootMossGeo);
  for (let m = 0; m < 4; m++) {
    const ang = m * 1.55 + 0.92;
    const dist = 0.29 + (m % 2) * 0.06;
    const wx = rootOriginWorld.x + Math.cos(ang) * dist;
    const wz = rootOriginWorld.z + Math.sin(ang) * dist;
    const gm = grounder.groundPropFootprint(wx, wz, 0.18, 0.34, 0.03);
    const localM = new THREE.Vector3(wx, Math.min(gm.y, gm.minY - 0.025), wz);
    group.worldToLocal(localM);
    const pillow = new THREE.Mesh(rootMossGeo, rootMossMat);
    pillow.position.copy(localM);
    pillow.rotation.y = ang + 0.4;
    pillow.scale.setScalar(0.76 + (m % 2) * 0.22);
    pillow.receiveShadow = true;
    group.add(pillow);
  }

  // Register full sakura trunk & root flare footprint so grass clears cleanly around roots
  registry.register({
    id: 'sakura-trunk',
    kind: 'tree',
    x: rootOriginWorld.x,
    z: rootOriginWorld.z,
    rx: 0.78,
    rz: 0.78,
    margin: 0.16,
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
  const collarExtents = measureGeometryExtents(collarGeo);
  const collarSpecs: Array<[number, number, number, number, number]> = [
    [-0.44, 0.36, 1.05, 0.56, 0.88],
    [0.52, 0.28, 0.92, 0.48, 0.82],
    [-0.1, -0.54, 0.96, 0.52, 0.92],
  ];
  collarSpecs.forEach(([cx, cz, sx, sy, sz], idx) => {
    const worldPt = new THREE.Vector3(cx, 0, cz).applyMatrix4(group.matrixWorld);
    const grounded = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.25 * sx, 0.18, 0.03);
    const safeWorldY = Math.min(grounded.y, grounded.minY - collarExtents.minY * sy * treeScale - 0.02);
    const localAnchor = new THREE.Vector3(worldPt.x, safeWorldY, worldPt.z);
    group.worldToLocal(localAnchor);

    const stone = new THREE.Mesh(collarGeo, collarMat);
    stone.position.set(cx, localAnchor.y, cz);
    stone.rotation.set(0.05 * Math.sin(idx), idx * 1.4, 0.05 * Math.cos(idx));
    stone.scale.set(sx, sy, sz);
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);

    registry.register({
      id: `sakura-collar-${idx}`,
      kind: 'rock',
      x: worldPt.x,
      z: worldPt.z,
      rx: collarExtents.maxRx * sx * treeScale,
      rz: collarExtents.maxRz * sz * treeScale,
      yaw: idx * 1.4 + treeYaw,
      margin: 0.08,
      baseY: safeWorldY + collarExtents.minY * sy * treeScale,
      topY: safeWorldY + collarExtents.maxY * sy * treeScale,
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
    roughness: 0.86,
    metalness: 0.02,
    color: 0xb5ad98,
  });
  const agedTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.76,
    metalness: 0.03,
    color: 0x8b755d,
  });
  const darkTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.8,
    metalness: 0.03,
    color: 0x625242,
  });
  const shojiMat = new THREE.MeshStandardNodeMaterial({
    color: 0xd6c09d,
    emissive: 0xe3a85f,
    emissiveIntensity: 0.34,
    roughness: 0.72,
  });
  const roofMat = new THREE.MeshStandardNodeMaterial({
    map: textures.roofAlbedo,
    normalMap: textures.roofNormal,
    normalScale: new THREE.Vector2(1.2, 1.2),
    roughness: 0.62,
    metalness: 0.06,
    color: 0x7a7162,
  });
  disposables.push(plinthMat, agedTimberMat, darkTimberMat, shojiMat, roofMat);

  // Stone foundation masonry retaining wall extended downward (-0.64m) so sloped outer edges stay sealed
  const plinthGeo = new THREE.BoxGeometry(2.68, 0.96, 2.08);
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.set(0, -0.17, 0);
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

  // Register full shrine plinth + extended front stair apron exclusion zone
  const stairForwardX = Math.sin(shrineYaw) * 0.24;
  const stairForwardZ = Math.cos(shrineYaw) * 0.24;
  registry.register({
    id: 'shrine-hall',
    kind: 'shrine',
    x: SHRINE_CENTER.x + stairForwardX,
    z: SHRINE_CENTER.z + stairForwardZ,
    rx: 1.62,
    rz: 1.72,
    yaw: shrineYaw,
    margin: 0.24,
  });

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/**
 * Grounded carved Yukimi-doro (snow-viewing granite stone lantern) overlooking the rear cove & shrine stairs.
 */
function createStoneLantern(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const graniteMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    normalScale: new THREE.Vector2(0.95, 0.95),
    roughness: 0.88,
    metalness: 0.02,
    color: 0xa4a092,
  });
  const fireboxGlowMat = new THREE.MeshStandardNodeMaterial({
    color: 0xe8c488,
    emissive: 0xf2a64c,
    emissiveIntensity: 0.72,
    roughness: 0.6,
  });
  disposables.push(graniteMat, fireboxGlowMat);

  const lanternX = -0.82;
  const lanternZ = -4.28;
  const lanternYaw = 0.32;
  const grounded = grounder.groundPropFootprint(lanternX, lanternZ, 0.3, 0.06, 0.02);
  group.position.set(lanternX, grounded.y, lanternZ);
  group.rotation.y = lanternYaw;

  // Grounded stone foundation plinth extending below downhill edge
  const plinthBot = grounded.minY - grounded.y - 0.14;
  const plinthTop = 0.04;
  const plinthH = Math.max(0.16, plinthTop - plinthBot);
  const plinthGeo = new THREE.CylinderGeometry(0.27, 0.31, plinthH, 12);
  const plinth = new THREE.Mesh(plinthGeo, graniteMat);
  plinth.position.y = plinthBot + plinthH * 0.5;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);
  disposables.push(plinthGeo);

  // Carved curving stone pedestal legs (3 splayed Yukimi feet meeting basal ring)
  const legGeo = new THREE.BoxGeometry(0.065, 0.22, 0.08);
  for (let l = 0; l < 3; l++) {
    const a = (l / 3) * Math.PI * 2 + 0.3;
    const leg = new THREE.Mesh(legGeo, graniteMat);
    leg.position.set(Math.cos(a) * 0.12, 0.12, Math.sin(a) * 0.12);
    leg.rotation.set(Math.sin(a) * 0.28, -a, -Math.cos(a) * 0.28);
    leg.castShadow = true;
    group.add(leg);
  }
  disposables.push(legGeo);

  const chudaiGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.08, 6);
  const chudai = new THREE.Mesh(chudaiGeo, graniteMat);
  chudai.position.y = 0.24;
  chudai.castShadow = true;
  group.add(chudai);
  disposables.push(chudaiGeo);

  const glowGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.16, 6);
  const glow = new THREE.Mesh(glowGeo, fireboxGlowMat);
  glow.position.y = 0.35;
  group.add(glow);
  disposables.push(glowGeo);

  const pillarGeo = new THREE.BoxGeometry(0.042, 0.17, 0.042);
  for (let p = 0; p < 6; p++) {
    const a = (p / 6) * Math.PI * 2 + 0.5;
    const bar = new THREE.Mesh(pillarGeo, graniteMat);
    bar.position.set(Math.cos(a) * 0.125, 0.355, Math.sin(a) * 0.125);
    bar.castShadow = true;
    group.add(bar);
  }
  disposables.push(pillarGeo);

  // Broad curved hexagonal Yukimi parasol stone roof + lotus finial (hoju)
  const kasaGeo = new THREE.ConeGeometry(0.36, 0.18, 6);
  const kasa = new THREE.Mesh(kasaGeo, graniteMat);
  kasa.position.y = 0.52;
  kasa.castShadow = true;
  group.add(kasa);
  disposables.push(kasaGeo);

  const hojuGeo = new THREE.SphereGeometry(0.052, 8, 6);
  const hoju = new THREE.Mesh(hojuGeo, graniteMat);
  hoju.scale.set(1, 1.32, 1);
  hoju.position.y = 0.63;
  group.add(hoju);
  disposables.push(hojuGeo);

  registry.register({
    id: 'garden-stone-lantern',
    kind: 'lantern',
    x: lanternX,
    z: lanternZ,
    rx: 0.38,
    rz: 0.38,
    yaw: lanternYaw,
    margin: 0.14,
    baseY: grounded.y + plinthBot,
    topY: grounded.y + 0.69,
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
  const radialRings = 64;
  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialRings; r++) {
    const u = r / radialRings;
    const radScale =
      r === 0
        ? 0.915
        : 0.94 +
          0.34 * u +
          1.4 * Math.pow(u, 2.2) +
          17.5 * Math.pow(Math.max(0, u - 0.16), 3.1);

    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const pt = pondBoundaryPoint(theta, radScale);
      const y = r === 0 ? terrainElevation(pt.x, pt.z) - 0.014 : terrainElevation(pt.x, pt.z);

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

  // Ground hearth terrace base using footprint raycast so the entire feature sits firmly on land
  const baseSample = grounder.groundPropFootprint(
    WATERFALL_SOURCE_POINT.x,
    WATERFALL_SOURCE_POINT.z,
    0.58,
    0.05,
    0.0,
  );
  const hearthAnchorY = baseSample.minY * 0.55 + baseSample.avgY * 0.45;
  group.position.set(WATERFALL_SOURCE_POINT.x, hearthAnchorY, WATERFALL_SOURCE_POINT.z);
  group.rotation.y = dirAngle;
  group.updateMatrixWorld(true);

  // 1. Hand-split natural flat-cleaved granite hearth slab (replacing geometric cake-drum cylinders)
  const hearthGeo = sculptBoulderGeometry(0.46, 2, 13.7);
  const hPos = hearthGeo.attributes.position;
  const hv = new THREE.Vector3();
  for (let i = 0; i < hPos.count; i++) {
    hv.fromBufferAttribute(hPos, i);
    // Broad flat granite shelf table top for pot stability while preserving rugged stone flanks & deep anchor skirt
    if (hv.y > 0.1) {
      hv.y = 0.1 + (hv.y - 0.1) * 0.1;
    } else if (hv.y < -0.1) {
      hv.y *= 1.45;
    }
    hPos.setXYZ(i, hv.x * 1.12, hv.y, hv.z * 1.06);
  }
  hearthGeo.computeVertexNormals();
  const hearthExtents = measureGeometryExtents(hearthGeo);
  const hearthTopLocalY = 0.044;
  const hearthScaleY = 0.38;
  const hearthMesh = new THREE.Mesh(hearthGeo, stoneMat);
  hearthMesh.position.set(0, hearthTopLocalY - hearthExtents.maxY * hearthScaleY, -0.02);
  hearthMesh.scale.set(1.22, hearthScaleY, 1.18);
  hearthMesh.castShadow = true;
  hearthMesh.receiveShadow = true;
  group.add(hearthMesh);
  disposables.push(hearthGeo);

  // Curated framing granite stones hugging the Tsukubai hearth flanks, leaving front pouring sightline clear
  const sideRockGeo = sculptBoulderGeometry(0.24, 2, 9.7);
  const sideRockExtents = measureGeometryExtents(sideRockGeo);
  const framingRocks: Array<{ lx: number; lz: number; sx: number; sy: number; sz: number; ry: number }> = [
    { lx: -0.58, lz: 0.08, sx: 1.06, sy: 0.72, sz: 1.12, ry: 0.32 },
    { lx: 0.58, lz: 0.1, sx: 1.02, sy: 0.68, sz: 1.06, ry: 1.24 },
    { lx: -0.44, lz: 0.34, sx: 0.72, sy: 0.48, sz: 0.76, ry: 0.85 },
    { lx: 0.44, lz: 0.32, sx: 0.7, sy: 0.46, sz: 0.74, ry: 2.3 },
    { lx: -0.36, lz: -0.46, sx: 0.86, sy: 0.62, sz: 0.9, ry: 2.1 },
    { lx: 0.36, lz: -0.46, sx: 0.84, sy: 0.58, sz: 0.88, ry: 0.9 },
  ];
  framingRocks.forEach((rk, rIdx) => {
    const worldPt = new THREE.Vector3(rk.lx, 0, rk.lz).applyMatrix4(group.matrixWorld);
    const rg = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.28 * rk.sx, 0.18, 0.03);
    const safeWorldY = Math.min(rg.y, rg.minY - sideRockExtents.minY * rk.sy - 0.028);
    const localAnchor = new THREE.Vector3(worldPt.x, safeWorldY, worldPt.z);
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
      rx: sideRockExtents.maxRx * rk.sx,
      rz: sideRockExtents.maxRz * rk.sz,
      yaw: dirAngle + rk.ry,
      margin: 0.08,
      baseY: safeWorldY + sideRockExtents.minY * rk.sy,
      topY: safeWorldY + sideRockExtents.maxY * rk.sy,
    });
  });
  disposables.push(sideRockGeo);

  // 2. Hand-thrown Shigaraki-style ceramic jar resting visibly atop the flat granite hearth stone
  const lathePts = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.19, 0.0),
    new THREE.Vector2(0.31, 0.11),
    new THREE.Vector2(0.35, 0.24),
    new THREE.Vector2(0.31, 0.36),
    new THREE.Vector2(0.255, 0.36),
    new THREE.Vector2(0.235, 0.22),
    new THREE.Vector2(0.0, 0.19),
  ];
  const vesselGeo = new THREE.LatheGeometry(lathePts, 32);
  const vessel = new THREE.Mesh(vesselGeo, ceramicMat);
  const vesselBaseLocalY = hearthTopLocalY - 0.01;
  const vesselTiltX = 0.085;
  vessel.position.set(0, vesselBaseLocalY, 0.02);
  vessel.rotation.x = vesselTiltX;
  vessel.castShadow = true;
  vessel.receiveShadow = true;
  group.add(vessel);
  disposables.push(vesselGeo);

  // Ceramic pouring spout lip resting cleanly across front vessel rim
  const lipGeo = new THREE.CylinderGeometry(0.032, 0.044, 0.1, 10, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
  lipGeo.rotateZ(Math.PI / 2);
  lipGeo.rotateY(Math.PI / 2);
  const lip = new THREE.Mesh(lipGeo, ceramicMat);
  lip.position.set(0, vesselBaseLocalY + 0.338, 0.325);
  lip.rotation.x = 0.22;
  group.add(lip);
  disposables.push(lipGeo);

  const diskGeo = new THREE.CircleGeometry(0.245, 24);
  diskGeo.rotateX(-Math.PI / 2);
  const basinWater = new THREE.Mesh(diskGeo, basinWaterMat);
  basinWater.position.set(0, vesselBaseLocalY + 0.316, 0.042);
  basinWater.rotation.x = vesselTiltX;
  group.add(basinWater);
  disposables.push(diskGeo);

  // 3. Aged hollow bamboo supply standpipe & kakei spout bound with black palm twine
  const postWorld = new THREE.Vector3(0, 0, -0.4).applyMatrix4(group.matrixWorld);
  const postGroundY = grounder.raycastSurface(postWorld.x, postWorld.z).y;
  const postBotLocalY = postGroundY - hearthAnchorY - 0.16;
  const postTopLocalY = vesselBaseLocalY + 0.67;
  const postHeight = Math.max(0.75, postTopLocalY - postBotLocalY);

  const postGeo = new THREE.CylinderGeometry(0.046, 0.056, postHeight, 14);
  const post = new THREE.Mesh(postGeo, bambooMat);
  post.position.set(0, postBotLocalY + postHeight * 0.5, -0.4);
  post.castShadow = true;
  post.receiveShadow = true;

  const nodeGeo = new THREE.TorusGeometry(0.052, 0.008, 8, 16);
  nodeGeo.rotateX(Math.PI / 2);
  const node1 = new THREE.Mesh(nodeGeo, bambooMat);
  node1.position.set(0, vesselBaseLocalY + 0.2, -0.4);
  const node2 = new THREE.Mesh(nodeGeo, bambooMat);
  node2.position.set(0, vesselBaseLocalY + 0.48, -0.4);

  // Hollow open-ended bamboo delivery tube + dark inner bore + slanted water-cut lip
  const spoutOuterGeo = new THREE.CylinderGeometry(0.028, 0.032, 0.52, 14, 1, true);
  spoutOuterGeo.rotateX(Math.PI / 2 - 0.22);
  const spout = new THREE.Mesh(spoutOuterGeo, bambooMat);
  spout.position.set(0, vesselBaseLocalY + 0.54, -0.17);
  spout.castShadow = true;

  const boreMat = new THREE.MeshStandardNodeMaterial({
    color: 0x1f2618,
    roughness: 0.9,
    metalness: 0.02,
    side: THREE.BackSide,
  });
  const spoutBoreGeo = new THREE.CylinderGeometry(0.021, 0.024, 0.515, 12, 1, true);
  spoutBoreGeo.rotateX(Math.PI / 2 - 0.22);
  const spoutBore = new THREE.Mesh(spoutBoreGeo, boreMat);
  spoutBore.position.copy(spout.position);

  const spoutRimGeo = new THREE.RingGeometry(0.02, 0.028, 14);
  const spoutRim = new THREE.Mesh(spoutRimGeo, bambooMat);
  spoutRim.position.set(0, vesselBaseLocalY + 0.484, 0.084);
  spoutRim.rotation.x = -0.22;

  const twineGeo = new THREE.TorusGeometry(0.056, 0.011, 8, 16);
  const twine = new THREE.Mesh(twineGeo, twineMat);
  twine.position.set(0, vesselBaseLocalY + 0.585, -0.385);
  twine.rotation.y = Math.PI / 2;

  group.add(post, node1, node2, spout, spoutBore, spoutRim, twine);
  disposables.push(postGeo, nodeGeo, spoutOuterGeo, spoutBoreGeo, boreMat, spoutRimGeo, twineGeo);

  // Register primary Tsukubai stone hearth & pot footprint
  registry.register({
    id: 'tsukubai-pedestal-pot',
    kind: 'waterFeature',
    x: WATERFALL_SOURCE_POINT.x,
    z: WATERFALL_SOURCE_POINT.z,
    rx: 0.66,
    rz: 0.66,
    yaw: dirAngle,
    margin: 0.14,
    baseY: hearthAnchorY - 0.12,
    topY: hearthAnchorY + vesselBaseLocalY + 0.38,
  });

  // 4. Tapered translucent water streams (hollow bamboo spout -> pot bowl -> collision-free open water)
  const upperCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, vesselBaseLocalY + 0.485, 0.075),
    new THREE.Vector3(0, vesselBaseLocalY + 0.42, 0.105),
    new THREE.Vector3(0, vesselBaseLocalY + 0.35, 0.115),
    new THREE.Vector3(0, vesselBaseLocalY + 0.312, 0.115),
  ]);
  const upperStreamGeo = createTaperedStreamGeometry(upperCurve, 12, 0.014, 0.009, 8);
  const upperStream = new THREE.Mesh(upperStreamGeo, streamMat);
  upperStream.renderOrder = 3;

  const lipWorld = new THREE.Vector3(0, vesselBaseLocalY + 0.322, 0.335).applyMatrix4(group.matrixWorld);
  const streamTraj = computeCollisionFreeStreamTrajectory({
    source: { x: lipWorld.x, y: lipWorld.y, z: lipWorld.z },
    target: { x: WATERFALL_IMPACT_POINT.x, y: 0.004, z: WATERFALL_IMPACT_POINT.z },
    obstacles: registry.getFootprints(),
    terrainHeightFn: (x, z) => grounder.raycastSurface(x, z).y,
    isInsideWaterFn: isInsideNaturalPond,
    streamRadius: 0.022,
    samples: 28,
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
  const lowerStreamGeo = createTaperedStreamGeometry(lowerBezier, 26, 0.017, 0.009, 10);
  const lowerStream = new THREE.Mesh(lowerStreamGeo, streamMat);
  lowerStream.renderOrder = 3;

  // Delicate aerated plunge foam & fine droplet collar at open-water landing point
  const landingLocal = new THREE.Vector3(
    streamTraj.landing.x,
    0.009,
    streamTraj.landing.z,
  );
  group.worldToLocal(landingLocal);
  const splashGeo = new THREE.RingGeometry(0.016, 0.11, 24);
  splashGeo.rotateX(-Math.PI / 2);
  const splashMat = new THREE.MeshBasicNodeMaterial({
    color: 0xe6f4ed,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  });
  const splashRing = new THREE.Mesh(splashGeo, splashMat);
  splashRing.position.copy(landingLocal);
  splashRing.renderOrder = 3;

  const bubbleGeo = new THREE.SphereGeometry(0.016, 6, 5);
  const bubbleMat = new THREE.MeshBasicNodeMaterial({
    color: 0xf4faf7,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
  });
  for (let b = 0; b < 5; b++) {
    const ang = (b / 5) * Math.PI * 2 + 0.4;
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    const rad = 0.024 + (b % 2) * 0.028;
    bubble.position.set(
      landingLocal.x + Math.cos(ang) * rad,
      landingLocal.y + 0.006 + (b % 2) * 0.008,
      landingLocal.z + Math.sin(ang) * rad,
    );
    bubble.scale.setScalar(0.65 + (b % 3) * 0.25);
    bubble.renderOrder = 3;
    group.add(bubble);
  }

  group.add(upperStream, lowerStream, splashRing);
  disposables.push(upperStreamGeo, lowerStreamGeo, splashGeo, splashMat, bubbleGeo, bubbleMat);

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

/**
 * Finalizes instanced botanical card geometry with upward-blended normals so grass,
 * ferns, and groundcover catch sky/sun illumination cleanly without harsh dark self-creases.
 */
function finalizeFoliageCardGeometry(
  positions: number[],
  uvs: number[],
  indices: number[],
  upWeight = 0.78,
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const nAttr = geo.attributes.normal;
  const nVec = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < nAttr.count; i++) {
    nVec.fromBufferAttribute(nAttr, i).lerp(up, upWeight).normalize();
    nAttr.setXYZ(i, nVec.x, nVec.y, nVec.z);
  }
  return geo;
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

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.72);
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

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.76);
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

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.84);
}

/**
 * Builds a rounded, softly arched botanical foliage mound (curved frond cards at gentle
 * dome pitches instead of harsh flat intersecting crosses).
 */
function createUnderstoryMoundGeometry(width: number, height: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const fronds = 6;
  const segs = 3;

  for (let p = 0; p < fronds; p++) {
    const yaw = (p / fronds) * Math.PI * 2 + (p % 2) * 0.22;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const fLen = width * (0.48 + (p % 2) * 0.09);
    const fWid = width * 0.36;
    const archH = height * (0.76 + (p % 3) * 0.14);
    const baseVert = positions.length / 3;

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const radial = t * fLen;
      const cup = Math.sin(t * Math.PI) * archH * 0.85 + (1 - t) * archH * 0.42 - 0.04;
      const hw = fWid * Math.sin(0.28 + t * 0.72 * Math.PI * 0.85);
      // Local (+Z radial outward, +X lateral width)
      const lxL = -hw;
      const lxR = hw;
      positions.push(lxL * cosY - radial * sinY, cup, lxL * sinY + radial * cosY);
      uvs.push(0, t);
      positions.push(lxR * cosY - radial * sinY, cup, lxR * sinY + radial * cosY);
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

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.8);
}

/**
 * Attaches a seamless terrain-conforming root-flare collar + registers exclusion footprint
 * so tree bases plant naturally into slopes without dangling tubular leg cutoffs.
 */
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
  const collarGeo = createTerrainRootFlareGeometry(
    grounder,
    originX,
    baseY,
    originZ,
    angleOffset,
    1.0,
    Math.max(0.11, rootRadius * 2.05),
    0.52,
    0.26,
    Math.max(4, rootCount),
    angleOffset + 0.5,
  );
  const collarMesh = new THREE.Mesh(collarGeo, barkMat);
  collarMesh.position.set(originX, baseY, originZ);
  collarMesh.rotation.y = angleOffset;
  collarMesh.castShadow = true;
  collarMesh.receiveShadow = true;
  parent.add(collarMesh);
  disposables.push(collarGeo);

  const footRadius = Math.max(rootSpread * 0.85, rootRadius * 2.2);
  registry.register({
    id: `${idPrefix}-root-collar`,
    kind: 'tree',
    x: originX,
    z: originZ,
    rx: footRadius,
    rz: footRadius,
    margin: 0.14,
  });
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
    const trunkGeo = createFlaredTubeGeometry(trunkCurve, 18, tr.r, 0.35, 0.24, 9, 0.46);
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
      flare: 0.22,
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
    const geo = createFlaredTubeGeometry(
      curve,
      14,
      b.r,
      0.55,
      b.flare,
      8,
      b.flare > 0 ? 0.44 : 0.72,
    );
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
  const midTrunkGeo = createFlaredTubeGeometry(midCurve, 14, 0.125, 0.5, 0.22, 8, 0.46);
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

  const culmGeo = new THREE.CylinderGeometry(0.052, 0.088, 1, 8, 9);
  const culmPos = culmGeo.attributes.position;
  for (let i = 0; i < culmPos.count; i++) {
    const cx = culmPos.getX(i);
    const cy = culmPos.getY(i);
    const cz = culmPos.getZ(i);
    const yNorm = cy + 0.5;
    // Swell subtly at regular bamboo internode rings so close/mid culms look jointed
    const nodePhase = Math.abs(((yNorm * 7) % 1) - 0.5) * 2;
    const nodeBulge = nodePhase > 0.84 ? 1.1 : 1.0;
    culmPos.setXYZ(i, cx * nodeBulge, yNorm, cz * nodeBulge);
  }
  culmGeo.computeVertexNormals();

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

  // Grounded low woodland fern/hosta groundcover cushions filtered against trunks, rocks, and open lawns
  const shrubGeo = createUnderstoryMoundGeometry(1.02, 0.26);
  const shrubMat = new THREE.MeshStandardNodeMaterial({
    map: textures.understoryLeafMap,
    alphaTest: 0.3,
    roughness: 0.82,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shrubSway = sin(
    elapsedUniform.mul(1.05).add(positionWorld.x.mul(0.85)).add(positionWorld.z.mul(0.75)),
  )
    .mul(0.016)
    .mul(smoothstep(0.04, 0.28, positionLocal.y));
  shrubMat.positionNode = positionLocal.add(vec3(shrubSway, float(0.0), shrubSway.mul(0.45)));

  const shrubSpecs: Array<{ x: number; z: number; sc: number; rot: number; shade: number }> = [];
  const targetShrubs = quality === 'desktop' ? 128 : 62;
  const shrubTints = [0xc4dc96, 0xd0e4a4, 0xb6ce88, 0xdcebb2];
  let shrubTries = 0;
  while (shrubSpecs.length < targetShrubs && shrubTries < 3200) {
    shrubTries++;
    const sx = -16.5 + rand() * 36.0;
    const sz = -3.8 - rand() * 14.5;
    if (sz > -5.8 && sx > -3.2) continue;
    const sample = sampleTerrain({ x: sx, z: sz });
    if (sz > -8.4 && Math.abs(sx - SHRINE_CENTER.x) < 2.05) continue;
    if (Math.abs(sx - shrinePathCenterX(sz)) < 0.96 && sz > -6.4) continue;
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.28,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.38,
        maxSlope: 0.44,
      })
    ) {
      continue;
    }

    const sc = 0.72 + rand() * 0.72;
    const rot = rand() * Math.PI * 2;
    shrubSpecs.push({
      x: sx,
      z: sz,
      sc,
      rot,
      shade: shrubTints[shrubSpecs.length % shrubTints.length],
    });
    registry.register({
      id: `understory-shrub-${shrubSpecs.length}`,
      kind: 'shrub',
      x: sx,
      z: sz,
      rx: 0.34 * sc,
      rz: 0.34 * sc,
      yaw: rot,
      margin: 0.08,
    });
  }

  // Root-margin understory shrubs set safely outside tree trunk/root footprints
  const collarShrubSpots: Array<[number, number, number]> = [
    [-5.35, 2.35, 0.84],
    [-5.05, -0.55, 0.8],
    [-4.85, -3.35, 0.82],
    [-3.45, -4.45, 0.78],
    [1.15, -6.25, 0.86],
    [2.85, -5.85, 0.88],
  ];
  collarShrubSpots.forEach(([sx, sz, sc], k) => {
    const sample = sampleTerrain({ x: sx, z: sz });
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.18,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.32,
        maxSlope: 0.46,
      })
    ) {
      return;
    }
    const rot = k * 1.15;
    shrubSpecs.push({
      x: sx,
      z: sz,
      sc,
      rot,
      shade: sx < -3.8 ? 0xa2bc78 : shrubTints[k % shrubTints.length],
    });
    registry.register({
      id: `collar-shrub-${k}`,
      kind: 'shrub',
      x: sx,
      z: sz,
      rx: 0.34 * sc,
      rz: 0.34 * sc,
      yaw: rot,
      margin: 0.08,
    });
  });

  const shrubInst = new THREE.InstancedMesh(shrubGeo, shrubMat, shrubSpecs.length);
  shrubInst.castShadow = false;
  shrubInst.receiveShadow = true;
  shrubSpecs.forEach((sp, i) => {
    const gy = grounder.raycastSurface(sp.x, sp.z).y;
    dummy.position.set(sp.x, gy - 0.02, sp.z);
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

  // Register submerged pond river stones first so Tsukubai trajectory & bank placement clear them
  getSubmergedStoneFootprints().forEach((fp) => {
    registry.register(fp);
  });

  // 1. Continuous 55m+ sculpted perspective garden terrain + raycast grounder
  const terrain = createSculptedGardenTerrain(textures);
  group.add(terrain.mesh);
  disposables.push(terrain);
  const grounder = createTerrainGrounder(terrain.mesh);

  // 2. Stepping stones curving cleanly from foreground-left onto the shrine lower step
  const stepStoneGeo = sculptBoulderGeometry(0.36, 2, 11.4);
  const stepExtents = measureGeometryExtents(stepStoneGeo);
  const stepStoneMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    normalScale: new THREE.Vector2(1.0, 1.0),
    roughness: 0.8,
    metalness: 0.02,
    color: 0xbcb5a2,
  });
  // Stops cleanly at z = -5.42 right ahead of shrine front stepLower south edge (-5.72)
  const stepZValues = [
    4.25, 3.6, 2.94, 2.28, 1.62, 0.96, 0.3, -0.36, -1.02, -1.68, -2.34, -3.0, -3.66, -4.32, -4.88, -5.42,
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
    const jitterX = (idx % 2 === 0 ? -0.05 : 0.06) * Math.sin(idx * 1.7);
    const x = shrinePathCenterX(z) + jitterX;
    const sx = 1.08 + (idx % 3) * 0.15;
    const sy = 0.34;
    const sz = 0.84 + ((idx + 1) % 3) * 0.12;
    const yaw = idx * 0.72;
    // Positive embed seats stepping stone base cleanly into compacted earth so rims never float
    const grounded = grounder.groundPropFootprint(x, z, 0.34, 0.14, 0.028);
    const safeY = Math.min(grounded.y, grounded.minY - stepExtents.minY * sy - 0.022);

    dummy.position.set(x, safeY, z);
    baseEuler.set(0, yaw, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    stepInst.setMatrixAt(idx, dummy.matrix);

    registry.register({
      id: `step-stone-${idx}`,
      kind: 'stepStone',
      x,
      z,
      rx: stepExtents.maxRx * sx,
      rz: stepExtents.maxRz * sz,
      yaw,
      margin: 0.08,
      baseY: safeY + stepExtents.minY * sy,
      topY: safeY + stepExtents.maxY * sy,
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

  // Register foreground pebble beach pocket right on the genuine foreground shoreline edge
  const beachCenter = pondBoundaryPoint(Math.PI * 0.56, 1.05);
  registry.register({
    id: 'fg-pebble-beach',
    kind: 'pebbleBeach',
    x: beachCenter.x,
    z: beachCenter.z,
    rx: 0.82,
    rz: 0.54,
    yaw: -0.25,
    margin: 0.06,
  });

  // 3. Sculpted shoreline rocks & wet cobbles (grounded & registered into exclusion registry)
  const bankStones = createNaturalBankStones(textures, grounder, registry);
  group.add(bankStones.group);
  disposables.push(bankStones);

  // 4. Traditional aged timber shrine + carved Yukimi granite lantern in upper-mid-left background
  const shrine = createShrineHall(textures, grounder, registry);
  group.add(shrine.group);
  disposables.push(shrine);

  const lantern = createStoneLantern(textures, grounder, registry);
  group.add(lantern.group);
  disposables.push(lantern);

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
      sample.slope <= 0.22 &&
      !registry.isExcluded(x, z, 0.16, new Set<FootprintKind>(['moss']))
    );
  });

  const mossInst = new THREE.InstancedMesh(mossGeo, mossMat, validMoss.length);
  mossInst.receiveShadow = true;
  mossInst.castShadow = false;
  const mColor = new THREE.Color();
  const mossTones = [0x657b3d, 0x586f36, 0x708647, 0x526632, 0x62783c];
  validMoss.forEach(([x, z, sx, sy, sz], idx) => {
    const grounded = grounder.groundPropFootprint(x, z, 0.42 * sx, 0.38, sy * 0.28);
    dummy.position.set(x, Math.min(grounded.y, grounded.minY - 0.02), z);
    baseEuler.set(0, idx * 0.85, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx * 0.88, sy * 0.92, sz * 0.88);
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
  const fgCount = quality === 'desktop' ? 140 : 72;
  const ignoreForPebbles = new Set<FootprintKind>(['pebbleBeach', 'stepStone', 'moss', 'negativeSpace']);
  for (let i = 0; i < fgCount * 3 && fgPebbleCoords.length < fgCount; i++) {
    let px = 0;
    let pz = 0;
    let ps = 0.6;
    if (fgPebbleCoords.length < fgCount * 0.52) {
      // Shoreline pocket hugging damp foreground shingle contour (angle ~ 0.50*PI .. 0.63*PI)
      const angle = Math.PI * (0.49 + gRand() * 0.14);
      const rad = 0.995 + gRand() * 0.11;
      const pt = pondBoundaryPoint(angle, rad);
      px = pt.x + (gRand() - 0.5) * 0.18;
      pz = pt.z + (gRand() - 0.5) * 0.16;
      ps = 0.55 + gRand() * 0.82;
    } else if (fgPebbleCoords.length < fgCount * 0.76) {
      pz = -5.2 + gRand() * 8.8;
      px = shrinePathCenterX(pz) + (gRand() > 0.5 ? 1 : -1) * (0.44 + gRand() * 0.34);
      ps = 0.42 + gRand() * 0.56;
    } else if (fgPebbleCoords.length < fgCount * 0.88) {
      // Gravel collar behind & around Tsukubai hearth (strictly outside boulders & front channel)
      const ang = (gRand() - 0.5) * Math.PI * 1.15 + Math.PI * 0.25;
      const rad = 0.66 + gRand() * 0.38;
      px = WATERFALL_SOURCE_POINT.x + Math.cos(ang) * rad;
      pz = WATERFALL_SOURCE_POINT.z + Math.sin(ang) * rad;
      ps = 0.42 + gRand() * 0.52;
    } else {
      const angle = gRand() * Math.PI * 2;
      const pt = pondBoundaryPoint(angle, 0.995 + gRand() * 0.12);
      px = pt.x;
      pz = pt.z;
      ps = 0.48 + gRand() * 0.68;
    }

    if (signedDistanceToPond({ x: px, z: pz }) < -0.06) continue;
    if (registry.isExcluded(px, pz, 0.05, ignoreForPebbles)) continue;
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
  // Art-directed fern pockets around woodland banks, shrine flanks, and Tsukubai backdrop (validated via registry)
  const fernSeeds: Array<[number, number, number]> = [
    [-2.52, 2.52, 0.96],
    [-4.12, 2.85, 1.05],
    [-4.65, 1.35, 1.12],
    [-3.75, -1.25, 1.02],
    [-3.52, -3.55, 0.98],
    [2.78, 2.95, 1.16],
    [3.88, 1.68, 1.04],
    [4.38, 1.18, 0.96],
    [3.28, -2.18, 1.04],
    [-1.45, -5.65, 0.92],
    [0.58, -4.18, 0.98],
    [-0.18, -4.75, 0.92],
    [1.62, -5.25, 1.06],
    [2.95, -4.45, 1.08],
    [4.45, -3.25, 1.12],
    [-2.85, -4.85, 0.94],
    [-4.95, -2.15, 1.08],
    [1.42, 4.18, 1.04],
  ];
  // Fill additional validated fern pockets in woodland margins & right bank shadows
  for (let fTry = 0; fTry < 140 && fernSeeds.length < 30; fTry++) {
    const fx = -5.4 + gRand() * 11.2;
    const fz = -7.2 + gRand() * 11.2;
    if (xInLeftHeroQuietZone(fx, fz)) continue;
    fernSeeds.push([fx, fz, 0.84 + gRand() * 0.34]);
  }
  function xInLeftHeroQuietZone(x: number, z: number): boolean {
    return x < -2.35 && z > 1.25;
  }

  const fernSpots: Array<[number, number, number]> = [];
  for (const [fx, fz, sc] of fernSeeds) {
    if (fernSpots.length >= (quality === 'desktop' ? 24 : 16)) break;
    const sample = sampleTerrain({ x: fx, z: fz });
    if (
      registry.isVegetationValid({
        x: fx,
        z: fz,
        clearance: 0.18,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.22,
        maxSlope: 0.44,
        ignoreKinds: ignoreMossForFerns,
      })
    ) {
      let tooClose = false;
      for (const [ox, oz] of fernSpots) {
        if (Math.hypot(fx - ox, fz - oz) < 0.72) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) fernSpots.push([fx, fz, sc]);
    }
  }
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
  const reedGeo = createGrassTuftGeometry(10, 1.04, 0.26, 0.032);
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

  // Art-directed shoreline reed pockets around foreground, lantern cove, and north-east sakura shoreline
  const reedAngleBands: Array<[number, number]> = [
    [Math.PI * 0.14, Math.PI * 0.26], // lower-right foreground shore cove below Tsukubai
    [Math.PI * 0.65, Math.PI * 0.77], // lower-left foreground cove (calm botanical accent)
    [-Math.PI * 0.66, -Math.PI * 0.54], // back-left reed cove near lantern
    [-Math.PI * 0.36, -Math.PI * 0.24], // back-right shoreline cove under sakura
    [-Math.PI * 0.5, -Math.PI * 0.39], // far-back serene reed pocket
  ];
  const reedSpots: Array<[number, number, number]> = [];
  for (let bIdx = 0; bIdx < reedAngleBands.length; bIdx++) {
    const [a0, a1] = reedAngleBands[bIdx];
    let placedInBand = 0;
    for (let step = 0; step < 44 && placedInBand < 4; step++) {
      const ang = a0 + ((step + 0.5) / 44) * (a1 - a0);
      const rad = 1.03 + ((step * 7) % 5) * 0.024;
      const pt = pondBoundaryPoint(ang, rad);
      const sample = sampleTerrain(pt);
      if (
        !registry.isVegetationValid({
          x: pt.x,
          z: pt.z,
          clearance: 0.14,
          shoreDistance: sample.shoreDistance,
          slope: sample.slope,
          minShoreDistance: 0.04,
          maxSlope: 0.48,
          ignoreKinds: ignoreMossForFerns,
        })
      ) {
        continue;
      }
      let spaced = true;
      for (const [rx, rz] of reedSpots) {
        if (Math.hypot(pt.x - rx, pt.z - rz) < 0.28) {
          spaced = false;
          break;
        }
      }
      if (!spaced) continue;
      const sc = 0.88 + (placedInBand % 2) * 0.16;
      reedSpots.push([pt.x, pt.z, sc]);
      registry.register({
        id: `shore-reed-${reedSpots.length}`,
        kind: 'moss',
        x: pt.x,
        z: pt.z,
        rx: 0.14 * sc,
        rz: 0.14 * sc,
        margin: 0.03,
      });
      placedInBand++;
    }
  }

  const reedInst = new THREE.InstancedMesh(reedGeo, reedMat, Math.max(1, reedSpots.length));
  reedInst.castShadow = true;
  reedInst.receiveShadow = true;
  reedSpots.forEach(([x, z, sc], idx) => {
    const gy = grounder.raycastSurface(x, z).y;
    dummy.position.set(x, gy - 0.025, z);
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

  // Subtle brown cattail spikes anchored directly within validated reed clumps (never floating orphans)
  const spikeStemGeo = new THREE.CylinderGeometry(0.008, 0.011, 1.02, 5);
  spikeStemGeo.translate(0, 0.51, 0);
  const spikeHeadGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 7);
  spikeHeadGeo.translate(0, 0.93, 0);
  const spikeStemMat = createMatteNodeMaterial(0x5d8040, 0.78, 0.01);
  const spikeHeadMat = createMatteNodeMaterial(0x523624, 0.92, 0.01);
  reedSpots.slice(0, 8).forEach(([rx, rz, sc], idx) => {
    for (let s = 0; s < 2; s++) {
      const ang = idx * 1.3 + s * 2.1;
      const x = rx + Math.cos(ang) * 0.045;
      const z = rz + Math.sin(ang) * 0.045;
      const gy = grounder.raycastSurface(x, z).y;
      const st = new THREE.Mesh(spikeStemGeo, spikeStemMat);
      const hd = new THREE.Mesh(spikeHeadGeo, spikeHeadMat);
      st.position.set(x, gy - 0.025, z);
      hd.position.set(x, gy - 0.025, z);
      st.rotation.set(0.05 * Math.sin(idx + s), idx + s, 0.05 * Math.cos(idx + s));
      hd.rotation.copy(st.rotation);
      const sScale = sc * (0.9 + s * 0.12);
      st.scale.setScalar(sScale);
      hd.scale.setScalar(sScale);
      group.add(st, hd);
    }
  });
  disposables.push(spikeStemGeo, spikeHeadGeo, spikeStemMat, spikeHeadMat);

  // 12. Continuous organic grass & sedge drifts across foreground, midground & forest backdrop
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

  // Continuous world-spanning groundcover zones from foreground pond border back into bamboo hills
  const grassZones: Array<{ minX: number; maxX: number; minZ: number; maxZ: number; weight: number }> = [
    // Right foreground & sunny right bank around pond & sakura fringe
    { minX: 1.2, maxX: 6.2, minZ: 1.0, maxZ: 5.1, weight: 3 },
    // Right-mid ridge behind sakura & north bank
    { minX: 1.4, maxX: 6.8, minZ: -5.6, maxZ: -1.4, weight: 3 },
    // Mid-back terrace between shrine & right bamboo ridge
    { minX: -2.2, maxX: 5.4, minZ: -8.6, maxZ: -3.6, weight: 3 },
    // Continuous background forest floor drifts beneath bamboo grove
    { minX: -11.5, maxX: 11.5, minZ: -14.2, maxZ: -6.8, weight: 3 },
    // Left mossy woodland flanks (quiet calm texture behind left hero typography)
    { minX: -6.2, maxX: -2.4, minZ: -6.5, maxZ: 3.4, weight: 2 },
    // Foreground center-right apron beside pebble beach
    { minX: 0.1, maxX: 2.8, minZ: 3.2, maxZ: 5.2, weight: 2 },
  ];
  const zoneBag: typeof grassZones = [];
  grassZones.forEach((zone) => {
    for (let w = 0; w < zone.weight; w++) zoneBag.push(zone);
  });

  const grassCoords: Array<[number, number, number, number, number, number]> = [];
  const targetGrass = quality === 'desktop' ? 880 : 380;
  let attempts = 0;
  while (grassCoords.length < targetGrass && attempts < 11000) {
    attempts++;
    const zone = zoneBag[attempts % zoneBag.length];
    const cx = zone.minX + gRand() * (zone.maxX - zone.minX);
    const cz = zone.minZ + gRand() * (zone.maxZ - zone.minZ);
    // Keep calm negative space behind bottom-left hero CTA/copy
    if (cx < -2.2 && cz > 1.8 && gRand() < 0.85) continue;
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
          clearance: 0.15,
          shoreDistance: sample.shoreDistance,
          slope: sample.slope,
          minShoreDistance: 0.24,
          maxSlope: 0.38,
        })
      ) {
        continue;
      }

      const gy = grounder.raycastSurface(x, z).y;
      const leftShorten = x < -2.6 ? 0.72 : 1.0;
      const bgShorten = z < -7.5 ? 0.86 : 1.0;
      const scale = (0.68 + gRand() * 0.56) * leftShorten * bgShorten;
      grassCoords.push([x, gy, z, scale, gRand() * Math.PI * 2, sample.normal.x]);
    }
  }
  const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, Math.max(1, grassCoords.length));
  grassInst.receiveShadow = true;
  const gPalette = [0xcce09c, 0xd8eaab, 0xbfd490, 0xe2f0b8];
  grassCoords.forEach(([x, gy, z, sc, rot, nx], idx) => {
    dummy.position.set(x, gy - 0.025, z);
    dummy.rotation.set(0, rot, -nx * 0.35);
    dummy.scale.set(sc, sc * (0.85 + (idx % 3) * 0.12), sc);
    dummy.updateMatrix();
    grassInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(x < -3.0 ? 0x9ab078 : gPalette[idx % gPalette.length]);
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
  const albedo = texture(textures.stoneAlbedo, stoneUv).rgb.mul(vec3(0.4, 0.49, 0.45));
  const caustic = computeWaterCaustics(positionWorld.xz, elapsedUniform);
  const upFacing = smoothstep(0.15, 0.75, normalWorld.y);

  mat.colorNode = albedo.add(vec3(0.88, 0.85, 0.72).mul(caustic.mul(upFacing).mul(0.24)));
  mat.normalMap = textures.stoneNormal;
  mat.normalScale = new THREE.Vector2(0.9, 0.9);
  mat.roughnessNode = float(0.62);
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
  const baseSoil = mix(soilMix, stoneGrit, 0.18).mul(vec3(0.78, 0.69, 0.54));
  const slopeMask = smoothstep(0.92, 0.7, normalWorld.y);

  // 2. Multi-scale velvety moss carpets (deep Kyoto cedar-moss emerald with warm sunlit variations)
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
  const heightMossBias = smoothstep(0.03, 0.24, positionWorld.y);
  const mossWeight = clamp(
    organicMossMask
      .mul(mix(0.38, 0.94, heightMossBias))
      .mul(float(1.0).sub(pathWeight.mul(0.92)))
      .mul(float(1.0).sub(slopeMask.mul(0.58)))
      .mul(float(1.0).sub(forestWeight.mul(0.45))),
    0.08,
    0.9,
  );

  const layeredMoss = mix(mossMacro, mossMed, 0.64).mul(vec3(0.58, 0.78, 0.38));
  const soilAndMoss = mix(baseSoil, layeredMoss, mossWeight);

  // 3. Woodland / bamboo forest floor (deep shaded humus, fallen bamboo leaves, damp earth)
  const forestFloor = mix(
    soilAndMoss.mul(vec3(0.52, 0.6, 0.42)),
    litterTex.mul(vec3(0.58, 0.54, 0.38)),
    0.54,
  );
  const withForest = mix(soilAndMoss, forestFloor, forestWeight.mul(0.78));

  // 4. Compacted warm sand-earth & weathered granite grit along winding shrine approach path
  const pathBed = mix(
    litterTex.mul(vec3(0.84, 0.78, 0.65)),
    stoneGrit.mul(vec3(0.78, 0.76, 0.68)),
    0.46,
  );
  const withPath = mix(withForest, pathBed, pathWeight.mul(0.84));

  // 5. Damp dark pond shoreline collar (organic edge moisture & wet earth)
  const shoreNoise = sin(positionWorld.x.mul(2.9).add(positionWorld.z.mul(2.5)))
    .mul(0.5)
    .add(0.5);
  const wetShore = float(1.0).sub(smoothstep(-0.04, 0.14, positionWorld.y));
  const wetness = clamp(
    max(wetShore.mul(0.82), rimWeight.mul(mix(0.45, 0.86, shoreNoise))),
    0.0,
    1.0,
  );
  const wetMineral = mix(
    stoneGrit.mul(vec3(0.32, 0.36, 0.32)),
    withPath.mul(vec3(0.36, 0.39, 0.31)),
    0.42,
  );
  const dampGround = mix(withPath, wetMineral, wetness.mul(0.85));

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
  // Seamless periodic flow along U (spout/lip -> basin/pond) accelerating toward plunge
  const uSpeed = uvCoord.x.mul(1.85).sub(elapsedUniform.mul(2.55));
  const vWrap = sin(uvCoord.y.mul(Math.PI * 2)).mul(0.25);
  const flowUvA = vec2(uSpeed, vWrap.add(0.5));
  const flowUvB = vec2(uvCoord.x.mul(3.4).sub(elapsedUniform.mul(3.75)), vWrap.negate().add(0.35));

  const streakA = sin(flowUvA.x.mul(10.0).add(texture(textures.waterNormalA, flowUvA).r.mul(3.0)))
    .mul(0.5)
    .add(0.5);
  const streakB = sin(flowUvB.x.mul(15.0).add(texture(textures.waterNormalB, flowUvB).g.mul(2.6)))
    .mul(0.5)
    .add(0.5);

  const eyeDir = cameraPosition.sub(positionWorld).normalize();
  const edgeFresnel = pow(float(1.0).sub(abs(dot(normalWorld, eyeDir))), 1.6);

  const foamStreak = pow(clamp(streakA.mul(0.58).add(streakB.mul(0.52)), 0.0, 1.0), 2.1);
  const splashTipFoam = smoothstep(0.75, 1.0, uvCoord.x).mul(0.28);
  const foamMix = clamp(foamStreak.mul(0.68).add(edgeFresnel.mul(0.55)).add(splashTipFoam), 0.0, 1.0);
  const waterTint = mix(vec3(0.48, 0.72, 0.67), vec3(0.95, 0.98, 0.96), foamMix);

  mat.colorNode = waterTint;
  mat.emissiveNode = vec3(0.24, 0.34, 0.32).mul(foamMix.mul(0.36));
  mat.roughnessNode = float(0.05);
  mat.metalnessNode = float(0.02);
  mat.opacityNode = clamp(float(0.18).add(foamStreak.mul(0.36)).add(edgeFresnel.mul(0.38)), 0.14, 0.82);
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

function smoothstep01(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function continuousBasinDepth(x: number, z: number, rho: number): number {
  const clamped = Math.max(0, Math.min(1, rho));
  const shelf = 1 - clamped * clamped;
  // Clear shallow shelf near banks transitioning to a rich jade depth center
  const basinDepth = -0.068 - 0.6 * Math.pow(shelf, 1.35);
  const microContour = 0.022 * Math.sin(x * 1.2 + 0.5) * Math.cos(z * 1.15 - 0.4);
  return basinDepth + microContour;
}

export function pondBedElevation(x: number, z: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return -0.3;
  const rho = naturalPondNormalizedRadius({ x, z });
  const base = continuousBasinDepth(x, z, rho);
  if (rho <= 0.92) {
    return Math.min(-0.04, base);
  }
  // Smoothly shoal up to water surface near rho = 1.02 for a seam-free basin bowl
  const rimT = smoothstep01((rho - 0.92) / 0.14);
  return base * (1 - rimT) + 0.025 * rimT;
}

// Right-shoreline ceramic tsukubai vessel on leveled bank terrace pouring westward into open pond water
export const WATERFALL_SOURCE_POINT: PointXZ = { x: 3.38, z: 0.52 };
export const WATERFALL_IMPACT_POINT: PointXZ = { x: 2.24, z: 0.46 };

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
  // Aligns cleanly with the rotated shrine front stairs (~x = -1.92 at z = -5.85)
  return -3.12 + 1.2 * s;
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
  const bedY = pondBedElevation(x, z);
  if (rho <= 0.92) {
    return bedY;
  }

  // Broad, C1-continuous bank collar (rho 0.94..1.48) preventing sudden rim cliffs
  const bankBlend = smoothstep01((rho - 0.94) / 0.54);
  // Attenuates steep mounds close to the waterline so shoreline stones seat on gentle banks
  const shoreCollarEase = smoothstep01((rho - 1.02) / 0.48);

  // Level corridor along the curving stepping-stone path from foreground up to shrine steps
  const pathX = shrinePathCenterX(z);
  const distToPath = Math.abs(x - pathX);
  const onPathZ = z <= 5.8 && z >= -7.4;
  const pathClearance = onPathZ ? Math.max(0, Math.min(1, (distToPath - 0.56) / 1.15)) : 1;

  // Raised level shrine terrace in upper-mid-left background with smooth broad apron
  const shrineDist = Math.hypot(x - SHRINE_CENTER.x, z - SHRINE_CENTER.z);
  const shrineRaw = 1 - Math.max(0, (shrineDist - 1.95) / 3.45);
  const shrinePlateauBlend = smoothstep01(shrineRaw);
  const shrineRise = smoothstep01((-z - 3.1) / 5.2) * 0.9;

  // Gentle low right-bank shelf under the Tsukubai hearth stone, keeping water pour at natural low relief
  const tsukubaiDist = Math.hypot(x - WATERFALL_SOURCE_POINT.x, z - WATERFALL_SOURCE_POINT.z);
  const tsukubaiPlateauBlend = smoothstep01(1 - Math.max(0, (tsukubaiDist - 0.72) / 1.75));

  // Left woodland mossy rise (natural dark backdrop behind left editorial typography)
  const leftWoodlandRise =
    Math.exp(-((x + 5.75) * (x + 5.75) * 0.042 + (z + 0.4) * (z + 0.4) * 0.032)) * 1.12;

  // Sunlit mossy ridge set further back behind north bank & shrine spur so shoreline slopes gently
  const rightMidRidge =
    Math.exp(-((x - 4.05) * (x - 4.05) * 0.055 + (z + 5.55) * (z + 5.55) * 0.048)) * 0.82;

  // Gentle right shoreline shoulder supporting sakura & tsukubai garden cluster
  const rightBankRise =
    Math.exp(-((x - 3.95) * (x - 3.95) * 0.085 + (z + 1.05) * (z + 1.05) * 0.075)) * 0.16;

  // Broad, low root-collar soil swells so tree trunks flare cleanly without unnatural volcano cones
  const sakuraRootMound =
    Math.exp(
      -((x - SAKURA_CENTER.x) * (x - SAKURA_CENTER.x) * 0.24 + (z - SAKURA_CENTER.z) * (z - SAKURA_CENTER.z) * 0.24),
    ) * 0.065;
  const mapleRootMound =
    Math.exp(-((x + 4.25) * (x + 4.25) * 0.3 + (z + 3.95) * (z + 3.95) * 0.3)) * 0.055;

  // Flowing multi-hill woodland topography extending across foreground, midground, and 55m backdrop
  const farBackdropRise =
    smoothstep01((-z - 6.6) / 10.5) * 1.85 +
    smoothstep01((Math.hypot(x, z) - 9.5) / 16.5) * 0.92;
  const woodlandHills =
    (0.28 * Math.sin(x * 0.28 + 0.7) * Math.cos(z * 0.24 - 0.5) +
      0.16 * Math.sin(x * 0.52 - z * 0.38)) *
    smoothstep01((-z - 4.5) / 6.0);

  const fgLeftMound =
    Math.exp(-((x + 4.5) * (x + 4.5) * 0.12 + (z - 3.95) * (z - 3.95) * 0.12)) * 0.34;
  const fgRightMound =
    Math.exp(-((x - 2.95) * (x - 2.95) * 0.14 + (z - 3.85) * (z - 3.85) * 0.15)) * 0.22;
  const backLeftMound =
    Math.exp(-((x + 6.9) * (x + 6.9) * 0.055 + (z + 6.6) * (z + 6.6) * 0.055)) * 0.86;

  const microUndulation =
    (0.048 * Math.sin(x * 0.62 + 0.4) * Math.cos(z * 0.56 - 0.3) +
      0.022 * Math.sin(x * 1.25 - z * 0.95) +
      0.012 * Math.cos(x * 2.1 + z * 1.85)) *
    pathClearance *
    (1 - tsukubaiPlateauBlend * 0.88) *
    (1 - shrinePlateauBlend * 0.72);

  const northBankEase = smoothstep01((rho - 1.06) / 0.62);
  const rawHeight =
    0.085 +
    shrineRise * northBankEase +
    (leftWoodlandRise * pathClearance +
      rightMidRidge * northBankEase +
      rightBankRise +
      fgLeftMound * pathClearance +
      fgRightMound) *
      (0.28 + 0.72 * shoreCollarEase) +
    sakuraRootMound +
    mapleRootMound +
    farBackdropRise * (1 - shrinePlateauBlend * 0.3) +
    woodlandHills +
    backLeftMound +
    microUndulation;

  // Blend smoothly onto leveled shrine apron and low right-bank Tsukubai garden terrace
  const shrinePadHeight = 0.88;
  const tsukubaiPadHeight = 0.15;
  let blended =
    rawHeight * (1 - shrinePlateauBlend * 0.84) + shrinePadHeight * (shrinePlateauBlend * 0.84);
  blended =
    blended * (1 - tsukubaiPlateauBlend * 0.82) + tsukubaiPadHeight * (tsukubaiPlateauBlend * 0.82);

  // Subtle shoulder lift around rho in [0.99..1.06] so waterline at y=0 seats right at rho ≈ 1.00
  const shoreLipLift = smoothstep01((rho - 0.97) / 0.16) * 0.032;
  const landHeight = Math.max(0.065, blended);
  return bedY * (1 - bankBlend) + landHeight * bankBlend + shoreLipLift * (1 - bankBlend);
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
  | 'submergedRock'
  | 'cobble'
  | 'tree'
  | 'waterFeature'
  | 'shrine'
  | 'lantern'
  | 'shrub'
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
    if (
      obs.kind !== 'rock' &&
      obs.kind !== 'submergedRock' &&
      obs.kind !== 'cobble' &&
      obs.kind !== 'waterFeature'
    ) {
      return false;
    }
    const along = (obs.x - source.x) * dirX + (obs.z - source.z) * dirZ;
    // Ignore features behind or directly supporting the pot's rear hearth
    return along > 0.26;
  });

  // Ensure landing sits cleanly in open water well clear of shoreline rocks and submerged pond stones
  const landing: Point3D = { ...target };
  const landingBlocked = (lx: number, lz: number) => {
    if (!isInsideWaterFn({ x: lx, z: lz }, 0.28)) return true;
    for (const obs of relevantObstacles) {
      const clearance = obs.kind === 'submergedRock' ? streamRadius + 0.24 : streamRadius + 0.18;
      if (pointInRotatedEllipse(lx, lz, obs, clearance)) {
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
      if (t >= 0.08 && t <= 0.94) {
        const groundY = terrainHeightFn(pt.x, pt.z);
        const terrainGap = pt.y - streamRadius - groundY;
        minTerrainClearance = Math.min(minTerrainClearance, terrainGap);
        if (terrainGap < 0.05) {
          clearedAll = false;
        }

        for (const obs of relevantObstacles) {
          const lateralMargin = obs.kind === 'submergedRock' ? streamRadius + 0.12 : streamRadius + 0.05;
          if (pointInRotatedEllipse(pt.x, pt.z, obs, lateralMargin)) {
            const obsTop = obs.topY ?? (obs.kind === 'submergedRock' ? -0.05 : groundY + 0.18);
            const obsGap = pt.y - streamRadius - obsTop;
            minObstacleClearance = Math.min(minObstacleClearance, obsGap);
            if (obsGap < 0.045) {
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

    if (activePellets.length >= 8) {
      activePellets.shift();
    }
    activePellets.push({
      id: nextPelletId++,
      x,
      z,
      createdAt: clock.elapsed,
      eaten: false,
    });

    waterRig.spawnRipple(x, z, clock.elapsed, !clock.isAdvancing, 0.92, true);
    waterRig.syncPellets(activePellets, clock.elapsed);
    options.onPelletAdded?.();
    if (!clock.isAdvancing) {
      renderFrame();
    }
    return true;
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
      const r = 104 + (bed - 0.5) * 28 + (grit - 0.5) * 34 + chip * 32;
      const g = 97 + (bed - 0.5) * 25 + (grit - 0.5) * 30 + chip * 28;
      const b = 81 + (bed - 0.5) * 22 + (grit - 0.5) * 26 + chip * 22;

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

  // Forked slender twigs so spray feels botanically anchored
  ctx.strokeStyle = 'rgba(72, 56, 40, 0.78)';
  ctx.lineWidth = Math.max(1.5, size * 0.014);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.94);
  ctx.quadraticCurveTo(size * 0.46, size * 0.54, size * 0.52, size * 0.18);
  ctx.moveTo(size * 0.48, size * 0.62);
  ctx.quadraticCurveTo(size * 0.3, size * 0.48, size * 0.22, size * 0.34);
  ctx.moveTo(size * 0.5, size * 0.54);
  ctx.quadraticCurveTo(size * 0.7, size * 0.42, size * 0.8, size * 0.28);
  ctx.stroke();

  // Soft curved palmate Japanese maple leaf clusters instead of rigid polygon stars
  for (let i = 0; i < 24; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = (0.04 + Math.pow(rand(), 0.72) * 0.32) * size;
    const cx = size * 0.5 + Math.cos(angle) * dist;
    const cy = size * 0.47 + Math.sin(angle) * dist * 0.84;
    const r = (0.068 + rand() * 0.056) * size;
    const warmTip = rand();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rand() * Math.PI * 2);
    const fillHex =
      warmTip > 0.78 ? '#B27A48' : warmTip > 0.4 ? '#6F9346' : '#4E7034';
    ctx.fillStyle = fillHex;
    const lobes = 5;
    for (let l = 0; l < lobes; l++) {
      const la = (l / lobes - 0.5) * 1.9 - Math.PI * 0.5;
      const lobeLen = r * (0.72 + (l === 2 ? 0.34 : (l === 1 || l === 3) ? 0.18 : 0));
      const lobeWid = lobeLen * 0.28;
      ctx.save();
      ctx.rotate(la + Math.PI * 0.5);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-lobeWid, -lobeLen * 0.48, 0, -lobeLen);
      ctx.quadraticCurveTo(lobeWid, -lobeLen * 0.48, 0, 0);
      ctx.fill();
      ctx.restore();
    }
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
      // Subtle irregular wheel-throwing ribbing + mineral stoneware iron flecks + natural ash shoulder glaze
      const wheelWave = Math.sin(v * Math.PI * 16 + Math.sin(u * Math.PI * 4) * 0.45) * 0.5 + 0.5;
      const speckle = periodicFbm(u, v, 14, 3, 2503);
      const ironFleck = periodicFbm(u, v, 32, 2, 7109);
      const darkFleck = ironFleck > 0.74 ? (ironFleck - 0.74) * 3.4 : 0;
      const shoulderAsh = Math.max(0, 1 - v * 1.65) * 0.65;
      const h = wheelWave * 0.08 + speckle * 0.48 - darkFleck * 0.14;
      heights[y * size + x] = h;

      // Earthy Kyoto Shigaraki stoneware clay fading softly into moss-grey wood-ash glaze near rim
      const clayR = 132 + (speckle - 0.5) * 36 + wheelWave * 4 - darkFleck * 46;
      const clayG = 104 + (speckle - 0.5) * 30 + wheelWave * 3 - darkFleck * 38;
      const clayB = 78 + (speckle - 0.5) * 24 + wheelWave * 2 - darkFleck * 28;
      const baseR = clayR * (1 - shoulderAsh * 0.32) + 86 * shoulderAsh * 0.32;
      const baseG = clayG * (1 - shoulderAsh * 0.25) + 94 * shoulderAsh * 0.25;
      const baseB = clayB * (1 - shoulderAsh * 0.2) + 74 * shoulderAsh * 0.2;

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
import type { ExclusionFootprint } from './placement';
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

export interface SubmergedStoneSpec {
  x: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  seed: number;
  rot: number;
}

/**
 * Single source of truth for submerged river stones inside the pond basin.
 * Positioned strictly clear of the right-bank waterfall landing channel around (2.24, 0.46)
 * and seated deep enough that stone crowns remain submerged beneath y = 0.
 */
export const SUBMERGED_STONE_SPECS: readonly SubmergedStoneSpec[] = [
  { x: -1.42, z: 1.05, sx: 0.42, sy: 0.2, sz: 0.36, seed: 1.4, rot: 0.4 },
  { x: 1.32, z: -0.88, sx: 0.38, sy: 0.19, sz: 0.32, seed: 2.8, rot: 1.7 },
  { x: 0.46, z: 1.92, sx: 0.35, sy: 0.17, sz: 0.29, seed: 4.1, rot: 2.3 },
  { x: -1.18, z: -1.42, sx: 0.36, sy: 0.18, sz: 0.3, seed: 5.5, rot: 0.9 },
  { x: 1.42, z: 1.18, sx: 0.36, sy: 0.18, sz: 0.29, seed: 6.7, rot: 2.9 },
  { x: -0.28, z: -2.42, sx: 0.32, sy: 0.17, sz: 0.28, seed: 8.2, rot: 1.1 },
  // Shallow submerged river stones pulled inward into deep basin zones so none breach water surface
  { x: -1.68, z: 1.72, sx: 0.4, sy: 0.15, sz: 0.34, seed: 9.4, rot: 0.3 },
  { x: -1.52, z: 2.38, sx: 0.36, sy: 0.14, sz: 0.3, seed: 10.7, rot: 2.1 },
  { x: -1.72, z: 0.14, sx: 0.38, sy: 0.15, sz: 0.32, seed: 11.9, rot: 1.5 },
  { x: 1.88, z: -0.34, sx: 0.3, sy: 0.14, sz: 0.26, seed: 13.1, rot: 2.6 },
  { x: 1.84, z: 1.44, sx: 0.28, sy: 0.14, sz: 0.24, seed: 16.2, rot: 0.9 },
  { x: 0.78, z: -2.62, sx: 0.3, sy: 0.14, sz: 0.25, seed: 14.3, rot: 0.7 },
  { x: -0.78, z: 2.58, sx: 0.32, sy: 0.14, sz: 0.26, seed: 15.6, rot: 1.9 },
];

export function computeSubmergedStonePlacement(spec: SubmergedStoneSpec): {
  centerY: number;
  topY: number;
  baseY: number;
} {
  const baseBedY = pondBedElevation(spec.x, spec.z);
  const maxCrownOffset = spec.sy * 0.76;
  const maxAllowedCenterY = -0.065 - maxCrownOffset;
  const centerY = Math.min(baseBedY + spec.sy * 0.2, maxAllowedCenterY);
  return {
    centerY,
    topY: centerY + maxCrownOffset,
    baseY: centerY - spec.sy * 0.6,
  };
}

export function getSubmergedStoneFootprints(): ExclusionFootprint[] {
  return SUBMERGED_STONE_SPECS.map((spec, idx) => {
    const { topY, baseY } = computeSubmergedStonePlacement(spec);
    return {
      id: `submerged-stone-${idx}`,
      kind: 'submergedRock',
      x: spec.x,
      z: spec.z,
      rx: spec.sx * 1.32,
      rz: spec.sz * 1.32,
      yaw: spec.rot,
      margin: 0.06,
      baseY,
      topY,
    };
  });
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

  SUBMERGED_STONE_SPECS.forEach((spec) => {
    const geo = sculptBoulderGeometry(1, 2, spec.seed);
    const mesh = new THREE.Mesh(geo, subStoneMat);
    const { centerY } = computeSubmergedStonePlacement(spec);
    mesh.position.set(spec.x, centerY, spec.z);
    mesh.scale.set(spec.sx, spec.sy, spec.sz);
    mesh.rotation.set(0.04, spec.rot, -0.03);
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
