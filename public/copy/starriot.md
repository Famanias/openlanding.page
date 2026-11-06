<template slug="starriot" name="STAR RIOT">
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
    <file path="src/app/(starriot)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Anton, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./starriot/starriot.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "STAR RIOT — Neon Disco & After-Dark Club",
  description:
    "Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.",
  icons: { icon: "/templates/starriot/icon.svg" },
  openGraph: {
    title: "STAR RIOT — Neon Disco & After-Dark Club",
    description:
      "Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12041B",
  colorScheme: "dark",
};

export default function StarRiotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="sr-body bg-[#12041B] text-[#FFFDF8] antialiased selection:bg-[#30F0CC] selection:text-[#12041B] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/assets.generated.ts">
<![CDATA[// Generated asset inventory for STAR RIOT
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(starriot)/starriot/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/starriot";

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
      <div
        className={`sr-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
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
]]>
    </file>
    <file path="src/app/(starriot)/starriot/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <defs>
    <linearGradient id="iconStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCF03C"/>
      <stop offset="50%" stop-color="#30F0CC"/>
      <stop offset="100%" stop-color="#FC3CCC"/>
    </linearGradient>
  </defs>
  <rect width="48" height="48" rx="10" fill="#12041B"/>
  <polygon points="24,4 29,17 43,18 32,27 36,41 24,33 12,41 16,27 5,18 19,17" fill="url(#iconStarGrad)" stroke="#FC3CCC" stroke-width="1.5"/>
  <circle cx="24" cy="24" r="3" fill="#FFFDF8"/>
</svg>
]]>
    </file>
    <file path="src/app/(starriot)/starriot/opengraph-image.tsx">
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
        background: "#12041B",
        color: "#FFFDF8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 32,
          letterSpacing: 4,
          color: "#30F0CC",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FC3CCC",
            color: "#12041B",
            fontWeight: "bold",
            fontSize: 22,
            borderRadius: 6,
          }}
        >
          ✦
        </div>
        STAR RIOT
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: 1,
            color: "#FFFDF8",
          }}
        >
          TONIGHT, WE GO SUPERNOVA.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#CAB9D4",
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the whole universe.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(252,60,204,0.25)",
          paddingTop: 24,
          fontSize: 18,
          color: "#CAB9D4",
          letterSpacing: 2,
        }}
      >
        <span>DISCO • HOUSE • ELECTRIC JOY • LATE HOURS</span>
        <span style={{ color: "#30F0CC" }}>STARRIOT.CLUB</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/page.tsx">
<![CDATA[import StarRiotApp from "./StarRiotApp";

export default function StarRiotPage() {
  return <StarRiotApp />;
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/starriot.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-sr-night-0: #12041B;
  --color-sr-night-1: #1E092B;
  --color-sr-night-2: #2C103B;
  --color-sr-mint: #30F0CC;
  --color-sr-pink: #FC3CCC;
  --color-sr-lime: #FCF03C;
  --color-sr-purple: #9451FF;
  --color-sr-coral: #FF9BB0;
  --color-sr-white: #FFFDF8;
  --color-sr-lilac: #CAB9D4;

  --font-sr-display: var(--font-anton), Impact, 'Haettenschweiler', 'Anton', 'Franklin Gothic Heavy', sans-serif;
  --font-sr-sans: var(--font-public-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-sr-mono: var(--font-jetbrains-mono), monospace;
}


      /* ==========================================================================
         01. DESIGN TOKENS & COLOR PALETTE (HIGH PRIORITY AUTHORITY)
         ========================================================================== */
      :root {
        --night-0: #12041B;
        --night-1: #1E092B;
        --night-2: #2C103B;
        --electric-mint: #30F0CC;
        --hot-pink: #FC3CCC;
        --acid-lime: #FCF03C;
        --electric-purple: #9451FF;
        --warm-coral: #FF9BB0;
        --paper-white: #FFFDF8;
        --muted-lilac: #CAB9D4;

        --font-display: 'Impact', 'Haettenschweiler', 'Anton', 'Franklin Gothic Heavy', 'Arial Narrow', 'Arial Black', sans-serif;
        --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        --font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

        --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
        --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        --container-max: 1440px;
        --bpm-duration: 0.5s;
      }

      /* ==========================================================================
         02. RESET & CONTINUOUS NIGHT CANVAS
         ========================================================================== */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        background-color: var(--night-0);
        color: var(--paper-white);
        font-family: var(--font-sans);
        scroll-behavior: smooth;
        overflow-x: clip;
        color-scheme: dark;
      }

      .sr-body {
        background-color: var(--night-0);
        background-image:
          radial-gradient(circle at 72% 22%, rgba(252, 60, 204, 0.14) 0%, rgba(148, 81, 255, 0.08) 28%, transparent 56%),
          radial-gradient(circle at 62% 48%, rgba(48, 240, 204, 0.11) 0%, transparent 45%),
          radial-gradient(circle at 20% 75%, rgba(148, 81, 255, 0.10) 0%, transparent 50%),
          linear-gradient(180deg, var(--night-0) 0%, var(--night-1) 38%, var(--night-0) 74%, #0d0214 100%);
        color: var(--paper-white);
        line-height: 1.5;
        overflow-x: clip;
        position: relative;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
      }

      /* Radial spotlight page-load reveal mask */
      .sr-body::before {
        content: '';
        position: fixed;
        inset: 0;
        background: radial-gradient(circle at 65% 38%, transparent 0%, var(--night-0) 0%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: sr-spotlightIgnite 1.15s var(--ease-out-expo) forwards;
      }

      .sr-body.sr-autostart::before,
      .sr-body.autostart::before {
        display: none;
      }

      @keyframes sr-spotlightIgnite {
        0% {
          opacity: 1;
          background: radial-gradient(circle at 65% 38%, transparent 2%, var(--night-0) 8%);
        }
        70% {
          opacity: 1;
          background: radial-gradient(circle at 65% 38%, transparent 65%, var(--night-0) 110%);
        }
        100% {
          opacity: 0;
          visibility: hidden;
        }
      }

      /* Accessible focus states */
      :focus-visible {
        outline: 3px solid var(--acid-lime);
        outline-offset: 4px;
        border-radius: 4px;
      }

      .sr-body a {
        color: inherit;
        text-decoration: none;
      }

      .sr-body button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        background: none;
        color: inherit;
      }

      .sr-body ul {
        list-style: none;
      }

      img,
      .sr-body svg {
        display: block;
        max-width: 100%;
      }

      .sr-only,
      .sr-sr-only {
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

      .sr-container {
        width: 100%;
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 clamp(1.25rem, 4vw, 3.5rem);
      }

      .sr-body section {
        scroll-margin-top: 90px;
        position: relative;
      }

      /* ==========================================================================
         03. DISPLAY TYPOGRAPHY SYSTEM
         ========================================================================== */
      .sr-display-type {
        font-family: var(--font-display);
        font-weight: 900;
        text-transform: uppercase;
        font-style: italic;
        line-height: 0.88;
        letter-spacing: 0.01em;
        color: var(--paper-white);
        transform: skewX(-4deg);
        transform-origin: left bottom;
      }

      .sr-kicker-label {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: var(--electric-mint);
        margin-bottom: 1rem;
      }

      .sr-kicker-label .sr-spark {
        color: var(--acid-lime);
        display: inline-block;
        animation: sr-pulseSpark 2.4s infinite ease-in-out;
      }

      @keyframes sr-pulseSpark {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.25) rotate(18deg); color: var(--hot-pink); }
      }

      /* ==========================================================================
         04. TOP NAVIGATION BAR (3-ZONE CONTRACT)
         ========================================================================== */
      .sr-site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(18, 4, 27, 0.82);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(202, 185, 212, 0.12);
        transition: background 0.25s ease, border-color 0.25s ease;
      }

      .sr-header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        height: 76px;
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 clamp(1.25rem, 4vw, 3.5rem);
      }

      .sr-brand-lockup {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        white-space: nowrap;
        flex-shrink: 0;
        group: brand;
      }

      .sr-brand-star-svg {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        transition: transform 0.35s var(--ease-spring);
        animation: sr-wordmarkSnapLeft 0.75s var(--ease-spring) both;
      }

      .sr-brand-wordmark {
        font-family: var(--font-display);
        font-size: 1.55rem;
        font-weight: 900;
        font-style: italic;
        line-height: 0.86;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--paper-white);
        display: flex;
        flex-direction: column;
        animation: sr-wordmarkSnapRight 0.75s var(--ease-spring) 0.08s both;
      }

      .sr-brand-lockup:hover .sr-brand-star-svg {
        transform: rotate(-16deg) scale(1.12);
      }

      @keyframes sr-wordmarkSnapLeft {
        0% { opacity: 0; transform: translateX(-22px) rotate(-35deg) scale(0.6); }
        100% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
      }

      @keyframes sr-wordmarkSnapRight {
        0% { opacity: 0; transform: translateX(22px) skewX(-18deg); }
        100% { opacity: 1; transform: translateX(0) skewX(0deg); }
      }

      .sr-primary-nav {
        display: flex;
        align-items: center;
        gap: 2.25rem;
      }

      .sr-nav-link {
        position: relative;
        font-size: 0.92rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--paper-white);
        padding: 0.35rem 0;
        white-space: nowrap;
        flex-shrink: 0;
        transition: color 0.18s ease;
      }

      .sr-nav-link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, var(--electric-mint), var(--acid-lime), var(--hot-pink));
        transform: scaleX(0) skewX(-20deg);
        transform-origin: right center;
        transition: transform 0.24s var(--ease-out-expo);
        border-radius: 2px;
      }

      .sr-nav-link:hover,
      .sr-nav-link:focus-visible {
        color: var(--electric-mint);
      }

      .sr-nav-link:hover::after,
      .sr-nav-link:focus-visible::after {
        transform: scaleX(1) skewX(-20deg);
        transform-origin: left center;
      }

      .sr-header-actions {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        flex-shrink: 0;
      }

      /* ==========================================================================
         05. BUTTON HOVER / CLICK SYSTEMS
         ========================================================================== */
      .sr-btn-neon-pill {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.55rem;
        padding: 0.85rem 1.75rem;
        border-radius: 999px;
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 900;
        font-style: italic;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--night-0);
        background: linear-gradient(95deg, var(--electric-mint) 0%, #68f7b8 38%, var(--hot-pink) 100%);
        box-shadow:
          0 0 24px rgba(48, 240, 204, 0.38),
          0 0 36px rgba(252, 60, 204, 0.28);
        overflow: hidden;
        white-space: nowrap;
        flex-shrink: 0;
        transition: transform 0.18s var(--ease-spring), box-shadow 0.18s ease;
        z-index: 1;
      }

      .sr-btn-neon-pill.sr-btn-header {
        padding: 0.65rem 1.4rem;
        font-size: 0.92rem;
        font-family: var(--font-sans);
        font-style: normal;
        font-weight: 800;
      }

      /* Moving gradient light band across primary button */
      .sr-btn-neon-pill::before {
        content: '';
        position: absolute;
        top: 0;
        left: -120%;
        width: 75%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 253, 248, 0.68),
          var(--acid-lime),
          transparent
        );
        transform: skewX(-25deg);
        transition: left 0.45s var(--ease-out-expo);
        z-index: -1;
      }

      .sr-btn-neon-pill:hover::before,
      .sr-btn-neon-pill:focus-visible::before {
        left: 140%;
      }

      .sr-btn-neon-pill:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow:
          0 0 30px rgba(48, 240, 204, 0.6),
          0 0 48px rgba(252, 60, 204, 0.45);
      }

      .sr-btn-neon-pill:active {
        transform: translateY(1px) scale(0.97);
      }

      .sr-btn-arrow {
        display: inline-block;
        transition: transform 0.22s var(--ease-spring);
      }

      .sr-btn-neon-pill:hover .sr-btn-arrow,
      .sr-btn-outline-trace:hover .sr-btn-arrow {
        transform: translate(4px, -4px) scale(1.15);
      }

      /* Secondary Outline Button with animated border trace */
      .sr-btn-outline-trace {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.55rem;
        padding: 0.85rem 1.75rem;
        border-radius: 999px;
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-weight: 900;
        font-style: italic;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--paper-white);
        background: rgba(30, 9, 43, 0.65);
        border: 2px solid rgba(255, 253, 248, 0.72);
        overflow: hidden;
        white-space: nowrap;
        flex-shrink: 0;
        transition:
          transform 0.18s var(--ease-spring),
          border-color 0.18s ease,
          color 0.18s ease,
          box-shadow 0.18s ease;
      }

      .sr-btn-outline-trace::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(48, 240, 204, 0.18), rgba(252, 60, 204, 0.22));
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.28s var(--ease-out-expo);
        z-index: 0;
      }

      .sr-btn-outline-trace > * {
        position: relative;
        z-index: 1;
      }

      .sr-btn-outline-trace:hover,
      .sr-btn-outline-trace:focus-visible {
        border-color: var(--electric-mint);
        color: var(--acid-lime);
        transform: translateY(-2px);
        box-shadow: 0 0 22px rgba(48, 240, 204, 0.28);
      }

      .sr-btn-outline-trace:hover::before,
      .sr-btn-outline-trace:focus-visible::before {
        transform: scaleX(1);
      }

      .sr-btn-outline-trace:active {
        transform: scale(0.97);
      }

      /* Mobile Hamburger Toggle */
      .sr-mobile-menu-btn {
        display: none;
        width: 44px;
        height: 44px;
        border-radius: 10px;
        border: 1.5px solid rgba(48, 240, 204, 0.5);
        background: rgba(44, 16, 59, 0.8);
        align-items: center;
        justify-content: center;
        color: var(--electric-mint);
      }

      .sr-mobile-nav-drawer {
        display: none;
        background: rgba(18, 4, 27, 0.97);
        border-bottom: 2px solid var(--electric-mint);
        padding: 1.25rem clamp(1.25rem, 4vw, 3.5rem) 1.75rem;
      }

      .sr-mobile-nav-drawer.sr-open {
        display: block;
      }

      .sr-mobile-nav-list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        margin-bottom: 1.25rem;
      }

      .sr-mobile-nav-list .sr-body a {
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-style: italic;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--paper-white);
        padding: 0.35rem 0;
        border-bottom: 1px solid rgba(202, 185, 212, 0.14);
      }

      /* ==========================================================================
         06. SECTION 1 — THE IGNITION (HERO)
         ========================================================================== */
      .sr-hero-section {
        position: relative;
        padding: clamp(1.5rem, 3.5vw, 3rem) 0 clamp(3rem, 5vw, 4.5rem);
        overflow: hidden;
      }

      .sr-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 5.2fr) minmax(0, 6.8fr);
        align-items: center;
        gap: clamp(1.5rem, 2.5vw, 2.5rem);
        position: relative;
        z-index: 2;
      }

      .sr-hero-copy-col {
        position: relative;
        z-index: 5;
        padding-right: 0.5rem;
      }

      .sr-hero-headline {
        font-size: clamp(2.85rem, 5.1vw, 5.15rem);
        line-height: 0.89;
        margin-bottom: 1.35rem;
        letter-spacing: 0.01em;
      }

      .sr-hero-line {
        display: block;
        padding-right: 0.22em;
      }

      .sr-hero-line-1 {
        animation: sr-heroWipe1 0.65s var(--ease-out-expo) 0.12s both;
      }
      .sr-hero-line-2 {
        animation: sr-heroWipe2 0.65s var(--ease-out-expo) 0.22s both;
      }
      .sr-hero-line-3 {
        animation: sr-heroWipe3 0.72s var(--ease-spring) 0.32s both;
      }

      /* Highlighted cutout/neon treatment on SUPERNOVA. */
      .sr-supernova-word {
        display: inline-block;
        padding-right: 0.18em;
        background: linear-gradient(92deg, var(--paper-white) 0%, var(--acid-lime) 38%, var(--electric-mint) 78%, var(--hot-pink) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        filter: drop-shadow(4px 4px 0px var(--hot-pink)) drop-shadow(0 0 18px rgba(48, 240, 204, 0.35));
      }

      @keyframes sr-heroWipe1 {
        0% { opacity: 0; transform: translateY(28px) skewX(-12deg) scaleY(1.15); }
        100% { opacity: 1; transform: translateY(0) skewX(0deg) scaleY(1); }
      }
      @keyframes sr-heroWipe2 {
        0% { opacity: 0; transform: translateX(-32px) skewX(10deg); }
        100% { opacity: 1; transform: translateX(0) skewX(0deg); }
      }
      @keyframes sr-heroWipe3 {
        0% { opacity: 0; transform: translateY(34px) scale(0.88); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .sr-hero-subcopy {
        font-size: clamp(1rem, 1.25vw, 1.18rem);
        color: var(--muted-lilac);
        max-width: 44ch;
        margin-bottom: 1.85rem;
        font-weight: 500;
        line-height: 1.55;
      }

      .sr-hero-cta-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.65rem;
      }

      .sr-hero-micro-bar {
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.55rem;
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--muted-lilac);
        border-top: 1px solid rgba(202, 185, 212, 0.18);
        padding-top: 0.95rem;
      }

      .sr-hero-micro-bar .sr-dot-sep {
        color: var(--hot-pink);
      }

      /* ==========================================================================
         07. HERO RIGHT COLUMN — LAYERED INTERACTIVE ILLUSTRATION STAGE
         ========================================================================== */
      .sr-hero-stage {
        position: relative;
        width: 100%;
        min-height: 610px;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1100px;
        user-select: none;
      }

      /* Main composite illustration SVG canvas (Dancers, 3D Star, Disco Ball, Lightning, Clouds) */
      .sr-hero-art-svg {
        width: 108%;
        max-width: 820px;
        height: auto;
        overflow: visible;
        position: relative;
        z-index: 2;
        filter: drop-shadow(0 16px 40px rgba(18, 4, 27, 0.7));
      }

      /* Animated SVG sub-groups */
      .sr-svg-star-portal {
        transform-origin: 495px 315px;
        animation: sr-starUnfold 1.1s var(--ease-spring) 0.15s both, sr-starFloat 6s ease-in-out 1.3s infinite alternate;
      }

      @keyframes sr-starUnfold {
        0% { transform: scale(0.25) rotate(-42deg); opacity: 0; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }

      @keyframes sr-starFloat {
        0% { transform: translate3d(0, 0, 0) rotate(0deg); }
        100% { transform: translate3d(0, -10px, 0) rotate(3.5deg); }
      }

      .sr-svg-disco-ball {
        transform-origin: 575px 110px;
        animation: sr-discoSwing 4.5s ease-in-out infinite alternate;
      }

      @keyframes sr-discoSwing {
        0% { transform: rotate(-3deg); }
        100% { transform: rotate(3.5deg); }
      }

      .sr-svg-dancer-left {
        transform-origin: 185px 560px;
        animation: sr-dancerLeftEnter 0.85s var(--ease-spring) 0.28s both, sr-dancerGrooveA 1.8s ease-in-out 1.2s infinite alternate;
      }

      .sr-svg-dancer-right {
        transform-origin: 615px 560px;
        animation: sr-dancerRightEnter 0.85s var(--ease-spring) 0.36s both, sr-dancerGrooveB 1.6s ease-in-out 1.2s infinite alternate;
      }

      @keyframes sr-dancerLeftEnter {
        0% { opacity: 0; transform: translate(-35px, 40px) rotate(-10deg); }
        100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
      }

      @keyframes sr-dancerRightEnter {
        0% { opacity: 0; transform: translate(35px, 40px) rotate(10deg); }
        100% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
      }

      @keyframes sr-dancerGrooveA {
        0% { transform: rotate(-1.2deg) translateY(0); }
        100% { transform: rotate(1.6deg) translateY(-6px); }
      }

      @keyframes sr-dancerGrooveB {
        0% { transform: rotate(1.4deg) translateY(0); }
        100% { transform: rotate(-1.4deg) translateY(-7px); }
      }

      /* Floating Retro-OS Nightlife UI Panels (Real HTML/CSS/SVG) */
      .sr-club-ui-panel {
        position: absolute;
        background: rgba(18, 4, 27, 0.92);
        border: 2px solid var(--electric-mint);
        border-radius: 14px;
        box-shadow:
          0 16px 34px rgba(0, 0, 0, 0.65),
          0 0 20px rgba(48, 240, 204, 0.22);
        overflow: hidden;
        z-index: 6;
        backdrop-filter: blur(10px);
        transition: transform 0.28s var(--ease-spring), box-shadow 0.25s ease, border-color 0.25s ease;
      }

      .sr-club-ui-panel:hover,
      .sr-club-ui-panel:focus-within {
        border-color: var(--acid-lime);
        box-shadow:
          0 20px 40px rgba(0, 0, 0, 0.78),
          0 0 28px rgba(252, 240, 60, 0.35);
        z-index: 10;
      }

      .sr-ui-window-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.38rem 0.65rem;
        background: linear-gradient(90deg, var(--electric-mint) 0%, #7bfce4 65%, var(--acid-lime) 100%);
        border-bottom: 2px solid var(--night-0);
      }

      .sr-ui-dots {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .sr-ui-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        border: 1.5px solid var(--night-0);
      }
      .sr-ui-dot.sr-pink { background: var(--hot-pink); }
      .sr-ui-dot.sr-lime { background: var(--acid-lime); }
      .sr-ui-dot.sr-mint { background: var(--electric-mint); }

      .sr-ui-window-tag {
        font-size: 0.64rem;
        font-weight: 900;
        letter-spacing: 0.1em;
        color: var(--night-0);
        text-transform: uppercase;
      }

      /* Panel 1: LINEUP Deck (Top Left of Stage) */
      .sr-panel-lineup {
        top: 3%;
        left: 12%;
        width: 212px;
        transform: rotate(-4deg) skewX(-2deg);
      }
      .sr-panel-lineup:hover,
      .sr-panel-lineup:focus-within {
        transform: rotate(-1deg) scale(1.04);
      }

      .sr-panel-header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem 0.35rem;
        border-bottom: 1px solid rgba(202, 185, 212, 0.16);
      }

      .sr-panel-title {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-family: var(--font-display);
        font-size: 1.05rem;
        font-style: italic;
        letter-spacing: 0.04em;
        color: var(--paper-white);
      }

      .sr-dj-list {
        padding: 0.35rem 0.55rem 0.55rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }

      .sr-dj-row-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.35rem 0.45rem;
        border-radius: 8px;
        background: rgba(44, 16, 59, 0.55);
        border: 1px solid transparent;
        transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
        text-align: left;
      }

      .sr-dj-row-btn:hover,
      .sr-dj-row-btn.sr-active {
        background: rgba(48, 240, 204, 0.15);
        border-color: var(--electric-mint);
      }

      .sr-dj-avatar-wrap {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .sr-dj-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.68rem;
        font-weight: 900;
        color: var(--night-0);
        flex-shrink: 0;
      }

      .sr-dj-name {
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        color: var(--paper-white);
      }

      .sr-dj-play-badge {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--electric-mint);
        color: var(--night-0);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 0.62rem;
        font-weight: 900;
        flex-shrink: 0;
        transition: transform 0.18s ease, background 0.18s ease;
      }

      .sr-dj-row-btn.sr-active .sr-dj-play-badge {
        background: var(--acid-lime);
        transform: scale(1.12);
      }

      /* Panel 2: EVENTS TONIGHT (Center-Bottom between Dancers) */
      .sr-panel-tonight {
        bottom: 20%;
        left: 26%;
        width: 214px;
        transform: rotate(2.5deg) skewX(-2deg);
        border-color: rgba(202, 185, 212, 0.65);
      }
      .sr-panel-tonight:hover,
      .sr-panel-tonight:focus-within {
        transform: rotate(0deg) scale(1.04);
      }

      .sr-tonight-slots {
        padding: 0.45rem 0.55rem 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }

      .sr-slot-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.38rem 0.6rem;
        border-radius: 6px;
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        color: var(--paper-white);
        background: rgba(44, 16, 59, 0.5);
        transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
      }

      .sr-slot-btn.sr-active,
      .sr-slot-btn:hover {
        background: var(--acid-lime);
        color: var(--night-0);
        box-shadow: 0 0 14px rgba(252, 240, 60, 0.45);
      }

      .sr-slot-time {
        font-variant-numeric: tabular-nums;
        opacity: 0.9;
      }

      /* Panel 3: EQUALIZER / VISUALIZER (Top-Right of Stage above Dancer B) */
      .sr-panel-eq {
        top: 11%;
        right: 0%;
        width: 202px;
        transform: rotate(3.5deg) skewX(-3deg);
      }
      .sr-panel-eq:hover,
      .sr-panel-eq:focus-within {
        transform: rotate(1deg) scale(1.04);
      }

      .sr-eq-body {
        padding: 0.65rem 0.75rem 0.6rem;
      }

      .sr-eq-bars-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        align-items: end;
        gap: 5px;
        height: 76px;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid rgba(202, 185, 212, 0.2);
      }

      .sr-eq-col {
        display: flex;
        flex-direction: column-reverse;
        gap: 3px;
        height: 100%;
        justify-content: flex-start;
      }

      .sr-eq-seg {
        width: 100%;
        height: 7px;
        border-radius: 2px;
        transition: opacity 0.15s ease, transform 0.15s ease;
      }

      .sr-eq-col:nth-child(1) .sr-eq-seg { background: var(--electric-mint); }
      .sr-eq-col:nth-child(2) .sr-eq-seg { background: #38b6ff; }
      .sr-eq-col:nth-child(3) .sr-eq-seg { background: var(--electric-purple); }
      .sr-eq-col:nth-child(4) .sr-eq-seg { background: var(--hot-pink); }
      .sr-eq-col:nth-child(5) .sr-eq-seg { background: #ff6b6b; }
      .sr-eq-col:nth-child(6) .sr-eq-seg { background: var(--acid-lime); }
      .sr-eq-col:nth-child(7) .sr-eq-seg { background: var(--electric-mint); }

      @keyframes sr-eqBounce {
        0%, 100% { transform: scaleY(0.35); opacity: 0.55; }
        50% { transform: scaleY(1); opacity: 1; }
      }

      .sr-eq-playing .sr-eq-col:nth-child(1) { animation: sr-eqBounce calc(var(--bpm-duration) * 1.1) infinite ease-in-out; }
      .sr-eq-playing .sr-eq-col:nth-child(2) { animation: sr-eqBounce calc(var(--bpm-duration) * 0.85) infinite ease-in-out 0.1s; }
      .sr-eq-playing .sr-eq-col:nth-child(3) { animation: sr-eqBounce calc(var(--bpm-duration) * 1.25) infinite ease-in-out 0.2s; }
      .sr-eq-playing .sr-eq-col:nth-child(4) { animation: sr-eqBounce calc(var(--bpm-duration) * 0.75) infinite ease-in-out 0.05s; }
      .sr-eq-playing .sr-eq-col:nth-child(5) { animation: sr-eqBounce calc(var(--bpm-duration) * 0.95) infinite ease-in-out 0.18s; }
      .sr-eq-playing .sr-eq-col:nth-child(6) { animation: sr-eqBounce calc(var(--bpm-duration) * 0.8) infinite ease-in-out 0.12s; }
      .sr-eq-playing .sr-eq-col:nth-child(7) { animation: sr-eqBounce calc(var(--bpm-duration) * 1.15) infinite ease-in-out 0.25s; }

      .sr-eq-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 0.45rem;
      }

      .sr-eq-ctrl-btn {
        font-size: 0.75rem;
        color: var(--paper-white);
        padding: 0.2rem 0.35rem;
        border-radius: 4px;
      }

      .sr-eq-ctrl-btn.sr-play-toggle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--paper-white);
        color: var(--night-0);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        box-shadow: 0 0 12px var(--hot-pink);
      }

      .sr-eq-scrubber {
        margin-top: 0.4rem;
        height: 4px;
        background: rgba(255, 253, 248, 0.2);
        border-radius: 99px;
        position: relative;
      }

      .sr-eq-scrubber-fill {
        width: 68%;
        height: 100%;
        background: linear-gradient(90deg, var(--electric-mint), var(--acid-lime));
        border-radius: 99px;
        position: relative;
      }

      .sr-eq-scrubber-fill::after {
        content: '';
        position: absolute;
        right: -5px;
        top: -3px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--paper-white);
        box-shadow: 0 0 8px var(--acid-lime);
      }

      /* Perforated CLUB PASS Ticket Stub (Bottom Right of Stage) */
      .sr-club-pass-stub {
        position: absolute;
        bottom: 12%;
        right: 1%;
        width: 156px;
        background: linear-gradient(155deg, #240b36 0%, #150421 62%, var(--acid-lime) 140%);
        border: 2px solid var(--acid-lime);
        border-radius: 12px;
        padding: 0.65rem 0.75rem;
        transform: rotate(-8deg) skewX(-4deg);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.65), 0 0 18px rgba(252, 240, 60, 0.28);
        z-index: 6;
        text-align: center;
        transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease;
      }

      .sr-club-pass-stub:hover,
      .sr-club-pass-stub:focus-visible {
        transform: rotate(-2deg) scale(1.07);
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.8), 0 0 26px rgba(252, 60, 204, 0.5);
      }

      .sr-pass-label {
        display: block;
        background: var(--acid-lime);
        color: var(--night-0);
        font-family: var(--font-display);
        font-size: 0.86rem;
        font-style: italic;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        margin: 0.35rem 0;
        letter-spacing: 0.06em;
      }

      .sr-pass-barcode {
        height: 22px;
        width: 100%;
        background: repeating-linear-gradient(
          90deg,
          var(--night-0) 0px,
          var(--night-0) 3px,
          transparent 3px,
          transparent 5px,
          var(--night-0) 5px,
          var(--night-0) 6px,
          transparent 6px,
          transparent 9px
        );
        background-color: var(--acid-lime);
        border-radius: 3px;
      }

      /* Scroll Teaser Badge at Bottom of Hero */
      .sr-scroll-teaser-wrap {
        display: flex;
        justify-content: center;
        margin-top: 1.25rem;
        position: relative;
        z-index: 5;
      }

      .sr-scroll-teaser-link {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.55rem 1.25rem;
        border-radius: 999px;
        background: rgba(44, 16, 59, 0.75);
        border: 1px solid rgba(48, 240, 204, 0.4);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--electric-mint);
        transition: transform 0.2s var(--ease-spring), border-color 0.2s ease, background 0.2s ease;
      }

      .sr-scroll-teaser-link:hover {
        transform: translateY(3px);
        border-color: var(--acid-lime);
        color: var(--acid-lime);
        background: rgba(44, 16, 59, 0.95);
      }

      /* ==========================================================================
         08. SECTION 2 — WELCOME TO THE RIOT (MANIFESTO + TICKER)
         ========================================================================== */
      .sr-manifesto-section {
        padding: clamp(3.5rem, 7vw, 6.5rem) 0 clamp(2.5rem, 5vw, 4.5rem);
        position: relative;
      }

      .sr-manifesto-card {
        position: relative;
        background: linear-gradient(135deg, rgba(44, 16, 59, 0.72) 0%, rgba(30, 9, 43, 0.9) 100%);
        border: 2px solid rgba(48, 240, 204, 0.32);
        border-radius: 28px;
        padding: clamp(2rem, 4.5vw, 4rem);
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: 2.5rem;
        align-items: center;
        overflow: hidden;
      }

      .sr-manifesto-headline {
        font-size: clamp(2.5rem, 5vw, 4.6rem);
        margin-bottom: 1.25rem;
      }

      .sr-manifesto-headline .sr-stroke-accent {
        color: var(--acid-lime);
        text-shadow: 3px 3px 0px var(--hot-pink);
      }

      .sr-manifesto-prose {
        font-size: clamp(1.05rem, 1.3vw, 1.22rem);
        color: var(--muted-lilac);
        max-width: 58ch;
        margin-bottom: 1.75rem;
        line-height: 1.65;
      }

      .sr-manifesto-pillars {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--paper-white);
      }

      .sr-manifesto-vinyl-art {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .sr-spin-vinyl {
        animation: sr-slowSpin 14s linear infinite;
        max-width: 270px;
      }

      @keyframes sr-slowSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* Marching Kinetic Ticker */
      .sr-riot-ticker {
        margin-top: 3rem;
        background: var(--acid-lime);
        color: var(--night-0);
        padding: 0.8rem 0;
        transform: rotate(-1.4deg) scale(1.02);
        border-top: 3px solid var(--night-0);
        border-bottom: 3px solid var(--night-0);
        box-shadow: 0 10px 30px rgba(252, 240, 60, 0.2);
        overflow: hidden;
        display: flex;
      }

      .sr-ticker-track {
        display: flex;
        align-items: center;
        gap: 2.2rem;
        white-space: nowrap;
        font-family: var(--font-display);
        font-size: clamp(1.3rem, 2.2vw, 1.75rem);
        font-style: italic;
        font-weight: 900;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        animation: sr-tickerMarch 22s linear infinite;
        padding-right: 2.2rem;
      }

      .sr-riot-ticker:hover .sr-ticker-track {
        animation-play-state: paused;
      }

      @keyframes sr-tickerMarch {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      /* ==========================================================================
         09. SECTION 3 — PICK YOUR FREQUENCY (UPCOMING NIGHTS + MODAL)
         ========================================================================== */
      .sr-nights-section {
        padding: clamp(4rem, 7vw, 6.5rem) 0;
      }

      .sr-section-header-split {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1.5rem;
        margin-bottom: 2.75rem;
      }

      .sr-section-title {
        font-size: clamp(2.6rem, 4.8vw, 4.4rem);
      }

      .sr-frequency-filter-bar {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        padding: 0.35rem;
        background: rgba(44, 16, 59, 0.85);
        border: 1.5px solid rgba(202, 185, 212, 0.24);
        border-radius: 12px;
      }

      .sr-freq-tab-btn {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted-lilac);
        white-space: nowrap;
        transition: background 0.18s ease, color 0.18s ease;
      }

      .sr-freq-tab-btn.sr-active,
      .sr-freq-tab-btn:hover {
        background: var(--electric-mint);
        color: var(--night-0);
      }

      .sr-nights-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.85rem;
      }

      .sr-night-poster-card {
        --card-accent: var(--electric-mint);
        --tilt-x: 0deg;
        --tilt-y: 0deg;
        position: relative;
        background: linear-gradient(170deg, var(--night-2) 0%, var(--night-0) 100%);
        border: 2.5px solid var(--card-accent);
        border-radius: 24px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transform: perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
        transition: transform 0.22s var(--ease-out-expo), box-shadow 0.25s ease;
      }

      .sr-night-poster-card[data-theme="pink"] {
        --card-accent: var(--hot-pink);
      }
      .sr-night-poster-card[data-theme="lime"] {
        --card-accent: var(--acid-lime);
      }

      .sr-night-poster-card.sr-hidden-card {
        display: none;
      }

      .sr-night-poster-card:hover,
      .sr-night-poster-card:focus-within {
        box-shadow: 0 20px 44px rgba(0, 0, 0, 0.75), 0 0 32px color-mix(in srgb, var(--card-accent) 42%, transparent);
      }

      .sr-poster-art-frame {
        position: relative;
        height: 250px;
        background: radial-gradient(circle at 50% 45%, rgba(148, 81, 255, 0.26), var(--night-0) 85%);
        border-bottom: 2px solid var(--card-accent);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sr-poster-svg-scene {
        width: 100%;
        height: 100%;
        transition: transform 0.45s var(--ease-spring);
      }

      .sr-night-poster-card:hover .sr-poster-svg-scene {
        transform: scale(1.09) rotate(-2deg);
      }

      /* Hover peel sticker badge on poster */
      .sr-poster-peel-tag {
        position: absolute;
        top: 14px;
        right: 14px;
        background: var(--card-accent);
        color: var(--night-0);
        font-family: var(--font-display);
        font-size: 0.82rem;
        font-style: italic;
        padding: 0.28rem 0.65rem;
        border-radius: 6px;
        letter-spacing: 0.06em;
        transform: rotate(5deg);
        transition: transform 0.25s var(--ease-spring);
      }

      .sr-night-poster-card:hover .sr-poster-peel-tag {
        transform: rotate(-6deg) scale(1.1);
      }

      .sr-poster-content {
        padding: 1.6rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
      }

      .sr-poster-schedule {
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--card-accent);
        margin-bottom: 0.45rem;
      }

      .sr-poster-title {
        font-size: clamp(1.85rem, 2.4vw, 2.35rem);
        margin-bottom: 0.6rem;
      }

      .sr-poster-desc {
        font-size: 0.95rem;
        color: var(--muted-lilac);
        margin-bottom: 1.25rem;
      }

      .sr-poster-lineup-meta {
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--paper-white);
        padding-top: 0.85rem;
        border-top: 1px solid rgba(202, 185, 212, 0.16);
        margin-bottom: 1.35rem;
      }

      .sr-poster-cta-btn {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 1.15rem;
        border-radius: 12px;
        background: rgba(255, 253, 248, 0.07);
        border: 1.5px solid var(--card-accent);
        font-family: var(--font-display);
        font-size: 1rem;
        font-style: italic;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--paper-white);
        transition: background 0.2s ease, color 0.2s ease;
      }

      .sr-poster-cta-btn:hover,
      .sr-poster-cta-btn:focus-visible {
        background: var(--card-accent);
        color: var(--night-0);
      }

      /* ==========================================================================
         10. ACCESSIBLE EVENT DETAIL DIALOG MODAL
         ========================================================================== */
      dialog.sr-club-modal {
        margin: auto;
        width: min(92vw, 620px);
        background: var(--night-1);
        color: var(--paper-white);
        border: 2.5px solid var(--electric-mint);
        border-radius: 24px;
        padding: 0;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.9), 0 0 45px rgba(48, 240, 204, 0.32);
        overflow: hidden;
      }

      dialog.sr-club-modal::backdrop {
        background: rgba(12, 2, 19, 0.82);
        backdrop-filter: blur(8px);
      }

      .sr-modal-top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1.35rem;
        background: linear-gradient(90deg, var(--electric-mint), var(--acid-lime));
        color: var(--night-0);
      }

      .sr-modal-top-title {
        font-family: var(--font-display);
        font-size: 1.1rem;
        font-style: italic;
        letter-spacing: 0.06em;
      }

      .sr-modal-close-btn {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: var(--night-0);
        color: var(--paper-white);
        font-weight: 900;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .sr-modal-body {
        padding: 1.75rem;
      }

      .sr-modal-schedule-kicker {
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.14em;
        color: var(--hot-pink);
        text-transform: uppercase;
        margin-bottom: 0.35rem;
      }

      .sr-modal-event-heading {
        font-size: clamp(2rem, 3.5vw, 2.75rem);
        margin-bottom: 0.75rem;
      }

      .sr-modal-event-summary {
        color: var(--muted-lilac);
        margin-bottom: 1.35rem;
      }

      .sr-modal-lineup-box {
        background: rgba(18, 4, 27, 0.75);
        border: 1px solid rgba(48, 240, 204, 0.28);
        border-radius: 14px;
        padding: 1.1rem;
        margin-bottom: 1.5rem;
      }

      .sr-modal-lineup-row {
        display: flex;
        justify-content: space-between;
        padding: 0.45rem 0;
        border-bottom: 1px solid rgba(202, 185, 212, 0.12);
        font-size: 0.9rem;
      }
      .sr-modal-lineup-row:last-child {
        border-bottom: none;
      }

      /* ==========================================================================
         11. SECTION 4 — THE SOUND TAKES OVER (SCROLL-CONTROLLED 3-STAGE SCENE)
         ========================================================================== */
      .sr-sound-scroll-track {
        position: relative;
        min-height: auto;
        padding: clamp(3rem, 5.5vw, 4.5rem) 0;
      }

      .sr-sound-sticky-stage {
        position: relative;
        top: 0;
        min-height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .sr-sound-stage-frame {
        width: 100%;
        background: radial-gradient(circle at 50% 50%, rgba(44, 16, 59, 0.9) 0%, rgba(18, 4, 27, 0.96) 100%);
        border: 2px solid rgba(48, 240, 204, 0.35);
        border-radius: 32px;
        padding: clamp(1.5rem, 3.5vw, 3rem);
        display: grid;
        grid-template-columns: 1fr 1.1fr;
        gap: 2rem;
        align-items: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
      }

      .sr-stage-phase-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-bottom: 1.35rem;
      }

      .sr-stage-pill-btn {
        padding: 0.45rem 0.95rem;
        border-radius: 8px;
        font-family: var(--font-display);
        font-size: 0.92rem;
        font-style: italic;
        letter-spacing: 0.06em;
        background: rgba(18, 4, 27, 0.8);
        border: 1.5px solid rgba(202, 185, 212, 0.3);
        color: var(--muted-lilac);
        transition: all 0.2s ease;
      }

      .sr-stage-pill-btn.sr-active {
        background: var(--acid-lime);
        color: var(--night-0);
        border-color: var(--acid-lime);
        box-shadow: 0 0 18px rgba(252, 240, 60, 0.45);
      }

      .sr-sound-stage-headline {
        font-size: clamp(2.3rem, 4.4vw, 4rem);
        margin-bottom: 1rem;
        min-height: 2.7em;
      }

      .sr-sound-stage-subcopy {
        color: var(--muted-lilac);
        font-size: 1.05rem;
        max-width: 46ch;
        margin-bottom: 1.5rem;
        min-height: 3.2em;
      }

      .sr-sound-telemetry-bar {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--electric-mint);
        font-variant-numeric: tabular-nums;
      }

      .sr-sound-visual-canvas {
        position: relative;
        height: 380px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sr-sound-stage-svg {
        width: 100%;
        max-width: 460px;
        height: auto;
        overflow: visible;
      }

      .sr-stage-ring-group,
      .sr-stage-supernova-group,
      .sr-stage-dancers-group {
        transition: transform 0.25s ease-out, opacity 0.25s ease-out;
        transform-origin: 220px 200px;
      }

      /* ==========================================================================
         12. SECTION 5 — THE SPACE (ASYMMETRIC VISUAL COLLAGE)
         ========================================================================== */
      .sr-space-section {
        padding: clamp(4rem, 7vw, 6.5rem) 0;
      }

      .sr-space-bento-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 1.5rem;
      }

      .sr-space-card {
        position: relative;
        background: linear-gradient(150deg, rgba(44, 16, 59, 0.82), rgba(18, 4, 27, 0.94));
        border: 2px solid rgba(202, 185, 212, 0.22);
        border-radius: 26px;
        padding: clamp(1.5rem, 3vw, 2.4rem);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: border-color 0.25s ease, transform 0.25s var(--ease-out-expo);
      }

      .sr-space-card:hover {
        border-color: var(--electric-mint);
        transform: translateY(-4px);
      }

      .sr-space-card-floor { grid-column: span 7; }
      .sr-space-card-lights { grid-column: span 5; }
      .sr-space-card-booth { grid-column: span 5; }
      .sr-space-card-crew { grid-column: span 7; }

      .sr-space-sticker-tag {
        display: inline-block;
        align-self: flex-start;
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-style: italic;
        padding: 0.25rem 0.75rem;
        border-radius: 6px;
        background: var(--hot-pink);
        color: var(--night-0);
        letter-spacing: 0.06em;
        transform: rotate(-2deg);
        margin-bottom: 1rem;
      }

      .sr-space-card-lights .sr-space-sticker-tag { background: var(--electric-mint); transform: rotate(2deg); }
      .sr-space-card-booth .sr-space-sticker-tag { background: var(--acid-lime); transform: rotate(-1.5deg); }
      .sr-space-card-crew .sr-space-sticker-tag { background: var(--warm-coral); transform: rotate(1.5deg); }

      .sr-space-card-title {
        font-size: clamp(1.75rem, 2.6vw, 2.4rem);
        margin-bottom: 0.65rem;
      }

      .sr-space-card-copy {
        color: var(--muted-lilac);
        font-size: 0.98rem;
        max-width: 50ch;
        margin-bottom: 1.25rem;
      }

      /* Interactive Floor Matrix mini-controller inside THE FLOOR card */
      .sr-floor-matrix-bar {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-wrap: wrap;
        margin-top: 0.75rem;
      }

      .sr-matrix-swatch-btn {
        padding: 0.38rem 0.8rem;
        border-radius: 8px;
        font-size: 0.74rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        border: 1.5px solid rgba(255, 253, 248, 0.35);
        background: rgba(18, 4, 27, 0.7);
        color: var(--paper-white);
      }

      .sr-matrix-swatch-btn.sr-active {
        border-color: var(--acid-lime);
        background: var(--acid-lime);
        color: var(--night-0);
      }

      /* ==========================================================================
         13. SECTION 6 — MEET THE MOVEMENT (COMMUNITY GALLERY + FAQ)
         ========================================================================== */
      .sr-movement-section {
        padding: clamp(4rem, 7vw, 6.5rem) 0;
      }

      .sr-carousel-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .sr-carousel-arrow-btn {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 2px solid var(--electric-mint);
        background: rgba(44, 16, 59, 0.7);
        color: var(--paper-white);
        font-size: 1.1rem;
        font-weight: 900;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
      }

      .sr-carousel-arrow-btn:hover {
        background: var(--electric-mint);
        color: var(--night-0);
        transform: scale(1.08);
      }

      .sr-sticker-wall-track {
        display: grid;
        grid-template-columns: repeat(4, minmax(260px, 1fr));
        gap: 1.5rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 1rem 0.25rem 1.5rem;
        scrollbar-width: thin;
        scrollbar-color: var(--electric-mint) var(--night-1);
      }

      .sr-sticker-card {
        scroll-snap-align: start;
        background: var(--night-2);
        border: 2px solid rgba(255, 253, 248, 0.24);
        border-radius: 20px;
        padding: 1.25rem;
        position: relative;
        transition: transform 0.28s var(--ease-spring), border-color 0.22s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .sr-sticker-card:nth-child(odd) { transform: rotate(-1.5deg); }
      .sr-sticker-card:nth-child(even) { transform: rotate(1.5deg); }

      .sr-sticker-card:hover,
      .sr-sticker-card:focus-within {
        transform: rotate(0deg) translateY(-6px) scale(1.02);
        border-color: var(--hot-pink);
      }

      .sr-sticker-flip-btn {
        margin-top: 0.85rem;
        align-self: flex-start;
        font-size: 0.74rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--acid-lime);
        text-decoration: underline;
      }

      .sr-sticker-back-note {
        display: none;
        margin-top: 0.75rem;
        padding: 0.75rem;
        border-radius: 10px;
        background: rgba(18, 4, 27, 0.88);
        border: 1px dashed var(--acid-lime);
        font-size: 0.84rem;
        color: var(--paper-white);
      }

      .sr-sticker-card.sr-flipped .sr-sticker-back-note {
        display: block;
      }

      /* FAQ Accordion */
      .sr-faq-wrap {
        margin-top: clamp(3.5rem, 6vw, 5.5rem);
        max-width: 920px;
        margin-left: auto;
        margin-right: auto;
      }

      .sr-faq-list {
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
        margin-top: 2rem;
      }

      .sr-faq-item {
        background: rgba(44, 16, 59, 0.55);
        border: 1.5px solid rgba(202, 185, 212, 0.22);
        border-radius: 16px;
        overflow: hidden;
        transition: border-color 0.2s ease;
      }

      .sr-faq-item.sr-open {
        border-color: var(--electric-mint);
      }

      .sr-faq-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1.15rem 1.4rem;
        text-align: left;
        font-family: var(--font-display);
        font-size: 1.25rem;
        font-style: italic;
        letter-spacing: 0.03em;
        color: var(--paper-white);
      }

      .sr-faq-icon {
        color: var(--acid-lime);
        font-style: normal;
        transition: transform 0.25s var(--ease-spring);
      }

      .sr-faq-item.sr-open .sr-faq-icon {
        transform: rotate(45deg);
        color: var(--hot-pink);
      }

      .sr-faq-answer {
        display: none;
        padding: 0 1.4rem 1.25rem;
        color: var(--muted-lilac);
        font-size: 0.96rem;
        line-height: 1.6;
      }

      .sr-faq-item.sr-open .sr-faq-answer {
        display: block;
      }

      /* ==========================================================================
         14. SECTION 7 — CONVERSION FINALE (GUESTLIST SIGN-UP)
         ========================================================================== */
      .sr-conversion-section {
        padding: clamp(4rem, 7vw, 6.5rem) 0;
      }

      .sr-conversion-shell {
        background:
          radial-gradient(circle at 88% 18%, rgba(252, 60, 204, 0.22), transparent 45%),
          radial-gradient(circle at 12% 85%, rgba(48, 240, 204, 0.18), transparent 48%),
          linear-gradient(145deg, var(--night-2) 0%, var(--night-0) 100%);
        border: 2.5px solid var(--electric-mint);
        border-radius: 32px;
        padding: clamp(2rem, 4.5vw, 4rem);
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 2.5rem;
        align-items: center;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.78);
      }

      .sr-guestlist-form {
        background: rgba(18, 4, 27, 0.85);
        border: 1.5px solid rgba(202, 185, 212, 0.24);
        border-radius: 22px;
        padding: 1.85rem;
      }

      .sr-form-group {
        margin-bottom: 1.15rem;
      }

      .sr-form-label {
        display: block;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--paper-white);
        margin-bottom: 0.45rem;
      }

      .sr-form-input,
      .sr-form-select {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        border: 1.5px solid rgba(202, 185, 212, 0.32);
        background: rgba(44, 16, 59, 0.65);
        color: var(--paper-white);
        font-family: var(--font-sans);
        font-size: 0.96rem;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
      }

      .sr-form-input:focus,
      .sr-form-select:focus {
        outline: none;
        border-color: var(--electric-mint);
        box-shadow: 0 0 0 3px rgba(48, 240, 204, 0.25);
      }

      .sr-form-error {
        display: none;
        margin-top: 0.35rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--warm-coral);
      }

      .sr-form-error.sr-visible {
        display: block;
      }

      .sr-demo-pass-confirmation {
        display: none;
        background: rgba(18, 4, 27, 0.92);
        border: 2px solid var(--acid-lime);
        border-radius: 22px;
        padding: 1.85rem;
        text-align: left;
      }

      .sr-demo-pass-confirmation.sr-visible {
        display: block;
      }

      .sr-demo-disclaimer-banner {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 10px;
        background: rgba(252, 60, 204, 0.14);
        border: 1px solid var(--hot-pink);
        font-size: 0.8rem;
        color: var(--paper-white);
      }

      /* ==========================================================================
         15. SECTION 8 — FOOTER
         ========================================================================== */
      .sr-site-footer {
        border-top: 1px solid rgba(202, 185, 212, 0.16);
        padding: 3rem 0 3.5rem;
        background: rgba(12, 2, 19, 0.9);
      }

      .sr-footer-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
      }

      .sr-footer-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        font-size: 0.85rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--muted-lilac);
      }

      .sr-footer-links a:hover {
        color: var(--electric-mint);
      }

      /* ==========================================================================
         16. RESPONSIVE BREAKPOINTS & REDUCED MOTION
         ========================================================================== */
      @media (max-width: 1120px) {
        .sr-hero-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .sr-hero-copy-col {
          max-width: 680px;
        }
        .sr-hero-stage {
          min-height: 540px;
        }
        .sr-manifesto-card,
        .sr-sound-stage-frame,
        .sr-conversion-shell {
          grid-template-columns: 1fr;
        }
        .sr-nights-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .sr-space-card-floor,
        .sr-space-card-lights,
        .sr-space-card-booth,
        .sr-space-card-crew {
          grid-column: span 6;
        }
      }

      @media (max-width: 780px) {
        .sr-primary-nav,
        .sr-header-actions .sr-btn-header {
          display: none;
        }
        .sr-mobile-menu-btn {
          display: inline-flex;
        }
        .sr-hero-stage {
          min-height: 440px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .sr-club-ui-panel {
          position: relative;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          bottom: auto !important;
          width: 100% !important;
          transform: none !important;
        }
        .sr-club-pass-stub {
          position: relative;
          bottom: auto;
          right: auto;
          width: 100%;
          transform: none;
        }
        .sr-nights-grid {
          grid-template-columns: 1fr;
        }
        .sr-space-card-floor,
        .sr-space-card-lights,
        .sr-space-card-booth,
        .sr-space-card-crew {
          grid-column: span 12;
        }
        .sr-sound-scroll-track {
          min-height: auto;
        }
        .sr-sound-sticky-stage {
          position: relative;
          top: 0;
          min-height: auto;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        .sr-sound-scroll-track {
          min-height: auto;
        }
        .sr-sound-sticky-stage {
          position: relative;
          top: 0;
        }
      }
    ]]>
    </file>
    <file path="src/app/(starriot)/starriot/StarRiotApp.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ManifestoSection } from "./components/ManifestoSection";
import { NightsSection } from "./components/NightsSection";
import { SoundStageSection } from "./components/SoundStageSection";
import { SpaceSection } from "./components/SpaceSection";
import { MovementSection } from "./components/MovementSection";
import { GuestlistSection } from "./components/GuestlistSection";
import { SiteFooter } from "./components/SiteFooter";
import { EventModal } from "./components/EventModal";

export default function StarRiotApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEventId, setModalEventId] = useState("friday-frequency");
  const [selectedNight, setSelectedNight] = useState<string>("friday-frequency");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.indexOf("autostart=1") !== -1) {
      document.body.classList.add("sr-autostart", "autostart");
    }
  }, []);

  const handleOpenModal = (eventId: string) => {
    setModalEventId(eventId);
    setModalOpen(true);
  };

  const handleRsvp = (eventId: string) => {
    setSelectedNight(eventId);
    const guestSection = document.getElementById("guestlist");
    if (guestSection) {
      guestSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="sr-root">
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <NightsSection onOpenModal={handleOpenModal} />
        <SoundStageSection />
        <SpaceSection />
        <MovementSection />
        <GuestlistSection nightPreference={selectedNight} />
      </main>
      <SiteFooter />
      <EventModal
        isOpen={modalOpen}
        eventId={modalEventId}
        onClose={() => setModalOpen(false)}
        onRsvp={handleRsvp}
      />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/EventModal.tsx">
<![CDATA["use client";

import React, { useEffect, useRef } from "react";

interface EventModalProps {
  isOpen: boolean;
  eventId: string;
  onClose: () => void;
  onRsvp: (eventId: string) => void;
}

const EVENT_CATALOG: Record<
  string,
  {
    schedule: string;
    title: string;
    desc: string;
    slots: [string, string][];
  }
> = {
  "friday-frequency": {
    schedule: "EVERY FRIDAY • 10 PM – 4 AM",
    title: "FRIDAY FREQUENCY",
    desc: "High-voltage house, laser-cut disco edits, and loud neon colors to detonate the workweek.",
    slots: [
      ["10:00 PM – 12:00 AM", "SYNTHIA (Warm Analog Edits)"],
      ["12:00 AM – 02:30 AM", "DJ ORBIT (Peak Supernova Set)"],
      ["02:30 AM – 04:00 AM", "KIKI NOVA (Late Hours Acid Disco)"],
    ],
  },
  "saturday-starburst": {
    schedule: "EVERY SATURDAY • 10 PM – 5 AM",
    title: "SATURDAY STARBURST",
    desc: "70s & 80s disco classics recharged with live brass horns, confetti drops, and cosmic synth bass.",
    slots: [
      ["10:00 PM – 12:00 AM", "MILES ELECTRIC (Crate-Dug Funk)"],
      ["12:00 AM – 03:00 AM", "LUNA VEX + THE RIOT HORNS (Live Brass Disco)"],
      ["03:00 AM – 05:00 AM", "STARBURST B2B CLOSING SET"],
    ],
  },
  "sunday-slowburn": {
    schedule: "SELECT SUNDAYS • 8 PM – 2 AM",
    title: "SUNDAY SLOWBURN",
    desc: "Deep crate-dug boogie, analog soul, warm coral lights, and the friendliest late-weekend afterglow.",
    slots: [
      ["08:00 PM – 10:00 PM", "SOLARIS (Sunset Vinyl Boogie)"],
      ["10:00 PM – 12:30 AM", "RIO SONIC (Cosmic Soul & Electro-Funk)"],
      ["12:30 AM – 02:00 AM", "VELVET ECHO (Afterglow Classics)"],
    ],
  },
};

export function EventModal({ isOpen, eventId, onClose, onRsvp }: EventModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const data = EVENT_CATALOG[eventId] || EVENT_CATALOG["friday-frequency"];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.setAttribute("open", "open");
      }
    } else {
      if (typeof dialog.close === "function") {
        if (dialog.open) {
          dialog.close();
        }
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="event-modal"
      className="sr-club-modal"
      aria-labelledby="modal-event-title"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="sr-modal-top-bar">
        <span className="sr-modal-top-title">✦ STAR RIOT NIGHT BRIEFING</span>
        <button
          type="button"
          className="sr-modal-close-btn"
          id="close-modal-btn"
          aria-label="Close event details"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="sr-modal-body">
        <div className="sr-modal-schedule-kicker" id="modal-event-schedule">
          {data.schedule}
        </div>
        <h2 id="modal-event-title" className="sr-display-type sr-modal-event-heading">
          {data.title}
        </h2>
        <p className="sr-modal-event-summary" id="modal-event-desc">
          {data.desc}
        </p>

        <div className="sr-modal-lineup-box" id="modal-lineup-list">
          {data.slots.map(([time, artist]) => (
            <div key={time} className="sr-modal-lineup-row">
              <strong>{time}</strong>
              <span>{artist}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="sr-btn-neon-pill"
          id="modal-rsvp-btn"
          style={{ width: "100%" }}
          onClick={() => {
            onRsvp(eventId);
            onClose();
          }}
        >
          <span>GET ON THE LIST FOR THIS NIGHT</span>
          <span className="sr-btn-arrow" aria-hidden="true">↗</span>
        </button>
      </div>
    </dialog>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/GuestlistSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { validateGuestlistSubmission } from "../utils/clubLogic";

interface GuestlistSectionProps {
  nightPreference?: string;
}

export function GuestlistSection({ nightPreference }: GuestlistSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [night, setNight] = useState(nightPreference || "friday-frequency");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [passCode, setPassCode] = useState("SR-NOVA-412");
  const [counter, setCounter] = useState(418);

  // Sync prop changes if nightPreference changes
  React.useEffect(() => {
    if (nightPreference) {
      setNight(nightPreference);
    }
  }, [nightPreference]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateGuestlistSubmission({
      name,
      email,
      nightPreference: night,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    if (result.passCode) {
      setPassCode(result.passCode);
    }
    setCounter((prev) => prev + 1);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setErrors({});
    setSubmitted(false);
  };

  const nightLabels: Record<string, string> = {
    "friday-frequency": "Friday Frequency — House & Disco Edits",
    "saturday-starburst": "Saturday Starburst — Disco Classics Recharged",
    "sunday-slowburn": "Sunday Slowburn — Groove, Boogie & Soul",
    "all-nights": "All Weekend Supernova Pass",
  };

  return (
    <section id="guestlist" className="sr-conversion-section" aria-labelledby="conversion-heading">
      <div className="sr-container">
        <div className="sr-conversion-shell">
          <div>
            <div className="sr-kicker-label">
              <span>PRIORITY FLOOR ACCESS</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="conversion-heading" className="sr-display-type sr-section-title" style={{ marginBottom: "1rem" }}>
              SAVE YOUR SPOT ON THE FLOOR.
            </h2>
            <p style={{ color: "var(--muted-lilac)", fontSize: "1.05rem", marginBottom: "1.5rem", maxWidth: "46ch" }}>
              Join the after-dark frequency for secret vinyl sets, early lineup drops, and instant guestlist pass
              generation for your crew.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "1.25rem" }}>
              <svg
                width="74"
                height="74"
                viewBox="0 0 100 100"
                className="sr-spin-vinyl"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <circle cx="50" cy="50" r="46" fill="#12041B" stroke="#30F0CC" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="none"
                  stroke="#FC3CCC"
                  strokeWidth="2"
                  strokeDasharray="10 6"
                />
                <circle cx="50" cy="50" r="18" fill="#FCF03C" stroke="#12041B" strokeWidth="3" />
                <circle cx="50" cy="50" r="5" fill="#12041B" />
              </svg>
              <div style={{ fontSize: "0.84rem", fontWeight: 800, color: "var(--acid-lime)", letterSpacing: "0.1em" }}>
                ✦ <span id="guest-counter-num">{counter}</span> DANCERS ON THIS WEEKEND&apos;S DEMO LIST
              </div>
            </div>
          </div>

          <div>
            {/* Validated Guestlist Form */}
            {!submitted ? (
              <form id="guestlist-form" className="sr-guestlist-form" onSubmit={handleSubmit} noValidate>
                <div className="sr-form-group">
                  <label htmlFor="guest-name" className="sr-form-label">
                    Your Name or Floor Alias *
                  </label>
                  <input
                    type="text"
                    id="guest-name"
                    name="name"
                    className="sr-form-input"
                    placeholder="e.g. Nova Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div
                    id="error-name"
                    className={`sr-form-error ${errors.name ? "sr-visible" : ""}`}
                    role="alert"
                  >
                    {errors.name || "Please enter your name or dance-floor alias (at least 2 characters)."}
                  </div>
                </div>

                <div className="sr-form-group">
                  <label htmlFor="guest-email" className="sr-form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="guest-email"
                    name="email"
                    className="sr-form-input"
                    placeholder="you@afterglow.club"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div
                    id="error-email"
                    className={`sr-form-error ${errors.email ? "sr-visible" : ""}`}
                    role="alert"
                  >
                    {errors.email || "Please enter a valid email address (e.g. you@domain.com)."}
                  </div>
                </div>

                <div className="sr-form-group">
                  <label htmlFor="guest-night" className="sr-form-label">
                    Pick Your Night Frequency
                  </label>
                  <select
                    id="guest-night"
                    name="nightPreference"
                    className="sr-form-select"
                    value={night}
                    onChange={(e) => setNight(e.target.value)}
                  >
                    <option value="friday-frequency">Friday Frequency — House &amp; Disco Edits</option>
                    <option value="saturday-starburst">Saturday Starburst — Disco Classics Recharged</option>
                    <option value="sunday-slowburn">Sunday Slowburn — Groove, Boogie &amp; Soul</option>
                    <option value="all-nights">All Weekend Supernova Pass</option>
                  </select>
                </div>

                <button type="submit" className="sr-btn-neon-pill" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <span>GENERATE DEMO CLUB PASS</span>
                  <span className="sr-btn-arrow" aria-hidden="true">↗</span>
                </button>

                <p style={{ fontSize: "0.74rem", color: "var(--muted-lilac)", marginTop: "0.85rem", textAlign: "center" }}>
                  DEMO PROTOTYPE — No backend or real mailing-list subscription is triggered.
                </p>
              </form>
            ) : (
              /* Demo Pass Confirmation Card */
              <div
                id="demo-pass-confirmation"
                className="sr-demo-pass-confirmation sr-visible"
                aria-live="polite"
              >
                <div className="sr-kicker-label" style={{ marginBottom: "0.4rem" }}>
                  <span>YOU&apos;RE ON THE DEMO LIST</span>
                  <span className="sr-spark" aria-hidden="true">✦</span>
                </div>
                <h3 className="sr-display-type" style={{ fontSize: "2rem", marginBottom: "0.5rem" }} id="pass-holder-heading">
                  WELCOME TO THE FLOOR, {name.toUpperCase()}!
                </h3>
                <p style={{ color: "var(--muted-lilac)", fontSize: "0.92rem", marginBottom: "1rem" }} id="pass-night-summary">
                  Selected Frequency: {nightLabels[night] || night}
                </p>
                <div
                  style={{
                    background: "var(--night-2)",
                    border: "1.5px solid var(--electric-mint)",
                    borderRadius: "12px",
                    padding: "0.85rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--muted-lilac)" }}>PASS CODE</span>
                  <span
                    id="pass-code-value"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1rem",
                      fontWeight: 900,
                      color: "var(--acid-lime)",
                    }}
                  >
                    {passCode}
                  </span>
                </div>

                <div className="sr-demo-disclaimer-banner">
                  <strong>DEMO — connect your mailing-list service to enable subscriptions.</strong> This static
                  prototype generated a local preview pass only; no real ticket was issued or email sent.
                </div>

                <button
                  type="button"
                  id="reset-guestlist-btn"
                  className="sr-btn-outline-trace"
                  style={{ width: "100%", marginTop: "1.15rem" }}
                  onClick={handleReset}
                >
                  <span>ADD ANOTHER FRIEND TO THE LIST</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/Header.tsx">
<![CDATA["use client";

import React, { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sr-site-header">
      <div className="sr-header-inner">
        {/* Zone 1: Brand Lockup (Split Neon Star + Wordmark) */}
        <a href="#top" className="sr-brand-lockup" aria-label="STAR RIOT Home">
          <svg className="sr-brand-star-svg" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <linearGradient id="logoMint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#30F0CC" />
                <stop offset="100%" stopColor="#FCF03C" />
              </linearGradient>
              <linearGradient id="logoPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FC3CCC" />
                <stop offset="100%" stopColor="#9451FF" />
              </linearGradient>
            </defs>
            {/* Left half Mint Star */}
            <path
              d="M32 4 L23 23 L4 26 L19 39 L14 59 L32 48 Z"
              fill="url(#logoMint)"
              stroke="#12041B"
              strokeWidth="2"
            />
            {/* Right half Hot Pink Star */}
            <path
              d="M32 4 L41 23 L60 26 L45 39 L50 59 L32 48 Z"
              fill="url(#logoPink)"
              stroke="#12041B"
              strokeWidth="2"
            />
            {/* Center White Sparkle */}
            <path
              d="M32 16 L34.5 28.5 L47 31 L34.5 33.5 L32 46 L29.5 33.5 L17 31 L29.5 28.5 Z"
              fill="#FFFDF8"
            />
          </svg>
          <span className="sr-brand-wordmark">
            <span>STAR</span>
            <span>RIOT</span>
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="sr-primary-nav" aria-label="Primary Navigation">
          <a href="#nights" className="sr-nav-link">Nights</a>
          <a href="#the-space" className="sr-nav-link">The Space</a>
          <a href="#the-sound" className="sr-nav-link">The Sound</a>
          <a href="#faq" className="sr-nav-link">FAQ</a>
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Button */}
        <div className="sr-header-actions">
          <a href="#guestlist" className="sr-btn-neon-pill sr-btn-header">
            <span>Join The List</span>
            <span className="sr-btn-arrow" aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="sr-mobile-menu-btn"
            id="mobile-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <nav
        id="mobile-nav-drawer"
        className={`sr-mobile-nav-drawer ${mobileOpen ? "sr-open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <ul className="sr-mobile-nav-list">
          <li>
            <a href="#nights" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              Nights
            </a>
          </li>
          <li>
            <a href="#the-space" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              The Space
            </a>
          </li>
          <li>
            <a href="#the-sound" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              The Sound
            </a>
          </li>
          <li>
            <a href="#faq" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              FAQ
            </a>
          </li>
        </ul>
        <a
          href="#guestlist"
          className="sr-btn-neon-pill sr-mobile-nav-item"
          style={{ width: "100%" }}
          onClick={() => setMobileOpen(false)}
        >
          <span>Get On The List</span>
          <span className="sr-btn-arrow" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/HeroSection.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from "react";

const DJS = [
  { name: "DJ ORBIT", bpm: 120, speed: "0.5s", bg: "var(--hot-pink)", initials: "DO" },
  { name: "LUNA VEX", bpm: 124, speed: "0.4s", bg: "var(--acid-lime)", initials: "LV" },
  { name: "RIO SONIC", bpm: 128, speed: "0.32s", bg: "var(--electric-mint)", initials: "RS" },
];

const SLOTS = [
  { time: "10:00 PM", label: "WARM UP" },
  { time: "11:30 PM", label: "MAIN SET" },
  { time: "01:30 AM", label: "AFTERGLOW" },
];

const SCRUBBER_WIDTHS = ["68%", "84%", "52%"];

export function HeroSection() {
  const [activeDjIndex, setActiveDjIndex] = useState(0);
  const [activeSlotIndex, setActiveSlotIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [statusOverride, setStatusOverride] = useState<string | null>(null);

  const activeDj = DJS[activeDjIndex];

  useEffect(() => {
    document.documentElement.style.setProperty("--bpm-duration", activeDj.speed);
  }, [activeDj]);

  const selectDj = (index: number) => {
    const nextIdx = (index + DJS.length) % DJS.length;
    setActiveDjIndex(nextIdx);
    setStatusOverride(null);
  };

  const selectSlot = (index: number) => {
    setActiveSlotIndex(index);
    setStatusOverride(`TONIGHT: ${SLOTS[index].label} (${SLOTS[index].time})`);
  };

  const currentStatus =
    statusOverride || (isPlaying ? `DECK: ${activeDj.name} (${activeDj.bpm} BPM)` : `PAUSED - ${activeDj.name}`);

  return (
    <section className="sr-hero-section" aria-labelledby="hero-title">
      <div className="sr-container">
        <div className="sr-hero-grid">
          {/* Left Column: Typography & Conversion Actions */}
          <div className="sr-hero-copy-col">
            <div className="sr-kicker-label">
              <span>THE CITY'S NEW AFTER-DARK OBSESSION</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>

            <h1 id="hero-title" className="sr-display-type sr-hero-headline">
              <span className="sr-hero-line sr-hero-line-1">TONIGHT,</span>
              <span className="sr-hero-line sr-hero-line-2">WE GO</span>
              <span className="sr-hero-line sr-hero-line-3">
                <span className="sr-supernova-word">SUPERNOVA.</span>
              </span>
            </h1>

            <p className="sr-hero-subcopy">
              Disco fever. Future sounds. Zero ordinary nights. Step into the place where the dance floor becomes the
              whole universe.
            </p>

            <div className="sr-hero-cta-row">
              <a href="#guestlist" className="sr-btn-neon-pill">
                <span>GET ON THE LIST</span>
                <span className="sr-btn-arrow" aria-hidden="true">↗</span>
              </a>
              <a href="#nights" className="sr-btn-outline-trace">
                <span>EXPLORE THE NIGHTS</span>
              </a>
            </div>

            <div className="sr-hero-micro-bar">
              <span>DISCO</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>HOUSE</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>ELECTRIC JOY</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span>LATE HOURS</span>
              <span className="sr-dot-sep" aria-hidden="true">•</span>
              <span id="live-deck-status" style={{ color: "var(--electric-mint)" }}>
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Layered Illustration & Club UI Stage */}
          <div className="sr-hero-stage" id="hero-stage">
            {/* Floating UI Panel 1: LINEUP Deck */}
            <div className="sr-club-ui-panel sr-panel-lineup" role="region" aria-label="Interactive DJ Lineup Deck">
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag">LIVE DECK</span>
              </div>
              <div className="sr-panel-header-row">
                <span className="sr-panel-title">
                  <span aria-hidden="true">🎧</span>
                  <span>LINEUP</span>
                </span>
                <span
                  id="deck-bpm-readout"
                  style={{ fontSize: "0.7rem", fontWeight: "800", color: "var(--electric-mint)" }}
                >
                  {activeDj.bpm} BPM
                </span>
              </div>
              <div className="sr-dj-list">
                {DJS.map((dj, idx) => (
                  <button
                    key={dj.name}
                    type="button"
                    className={`sr-dj-row-btn ${idx === activeDjIndex ? "sr-active" : ""}`}
                    data-dj={dj.name}
                    data-bpm={dj.bpm}
                    data-speed={dj.speed}
                    onClick={() => selectDj(idx)}
                  >
                    <span className="sr-dj-avatar-wrap">
                      <span className="sr-dj-avatar" style={{ background: dj.bg }}>
                        {dj.initials}
                      </span>
                      <span className="sr-dj-name">{dj.name}</span>
                    </span>
                    <span className="sr-dj-play-badge" aria-hidden="true">
                      {idx === activeDjIndex ? "▶" : "•"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating UI Panel 2: EVENTS TONIGHT */}
            <div className="sr-club-ui-panel sr-panel-tonight" role="region" aria-label="Tonight Set Schedule">
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag">SET TIMES</span>
              </div>
              <div className="sr-panel-header-row">
                <span className="sr-panel-title">
                  <span aria-hidden="true">📅</span>
                  <span>EVENTS TONIGHT</span>
                </span>
              </div>
              <div className="sr-tonight-slots">
                {SLOTS.map((slot, idx) => (
                  <button
                    key={slot.time}
                    type="button"
                    className={`sr-slot-btn ${idx === activeSlotIndex ? "sr-active" : ""}`}
                    data-slot={`${slot.label} (${slot.time})`}
                    onClick={() => selectSlot(idx)}
                  >
                    <span className="sr-slot-time">{slot.time}</span>
                    <span>{slot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating UI Panel 3: EQUALIZER / VISUALIZER */}
            <div
              className={`sr-club-ui-panel sr-panel-eq ${isPlaying ? "sr-eq-playing" : ""}`}
              id="hero-eq-panel"
              role="region"
              aria-label="Club Equalizer"
            >
              <div className="sr-ui-window-bar">
                <div className="sr-ui-dots" aria-hidden="true">
                  <span className="sr-ui-dot sr-pink"></span>
                  <span className="sr-ui-dot sr-lime"></span>
                  <span className="sr-ui-dot sr-mint"></span>
                </div>
                <span className="sr-ui-window-tag" id="eq-state-tag">
                  {isPlaying ? "PULSE ON" : "PAUSED"}
                </span>
              </div>
              <div className="sr-eq-body">
                <div className="sr-eq-bars-grid" aria-hidden="true">
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                  <div className="sr-eq-col">
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                    <span className="sr-eq-seg"></span>
                  </div>
                </div>
                <div className="sr-eq-controls">
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn"
                    id="eq-prev-btn"
                    aria-label="Previous DJ Track"
                    onClick={() => selectDj(activeDjIndex - 1)}
                  >
                    ⏮
                  </button>
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn sr-play-toggle"
                    id="eq-toggle-btn"
                    aria-label="Toggle Visualizer Pulse"
                    aria-pressed={isPlaying}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button
                    type="button"
                    className="sr-eq-ctrl-btn"
                    id="eq-next-btn"
                    aria-label="Next DJ Track"
                    onClick={() => selectDj(activeDjIndex + 1)}
                  >
                    ⏭
                  </button>
                </div>
                <div className="sr-eq-scrubber" aria-hidden="true">
                  <div
                    className="sr-eq-scrubber-fill"
                    id="eq-scrubber-fill"
                    style={{ width: SCRUBBER_WIDTHS[activeDjIndex % 3] }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Perforated CLUB PASS Ticket Stub */}
            <a href="#guestlist" className="sr-club-pass-stub" aria-label="Claim Your Star Riot Club Pass">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "var(--paper-white)",
                }}
              >
                ✦ STAR RIOT
              </div>
              <span className="sr-pass-label">CLUB PASS</span>
              <div className="sr-pass-barcode" aria-hidden="true"></div>
            </a>

            <svg
                className="sr-hero-art-svg"
                viewBox="0 0 820 620"
                role="img"
                aria-label="Colossal neon five-point star portal, hanging disco mirror ball, and two expressive retro-pop dancers grooving in electric mint, hot pink, and acid lime"
              >
                <defs>
                  {/*  Signature Star Face Gradient: Electric Mint -> Acid Lime  */}
                  <linearGradient id="starFaceGrad" x1="0%" y1="15%" x2="95%" y2="85%">
                    <stop offset="0%" stopColor="#30F0CC" />
                    <stop offset="52%" stopColor="#90F878" />
                    <stop offset="100%" stopColor="#FCF03C" />
                  </linearGradient>
                  {/*  Signature 3D Star Extrusion Gradient: Hot Pink -> Electric Purple  */}
                  <linearGradient id="starExtrudeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FC3CCC" />
                    <stop offset="65%" stopColor="#9451FF" />
                    <stop offset="100%" stopColor="#4A157A" />
                  </linearGradient>
                  {/*  Lightning Bolt Gradient  */}
                  <linearGradient id="boltGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#30F0CC" />
                    <stop offset="65%" stopColor="#8AF882" />
                    <stop offset="100%" stopColor="#FCF03C" />
                  </linearGradient>
                  {/*  Pink Cloud Wave Gradient  */}
                  <linearGradient id="cloudPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FC3CCC" />
                    <stop offset="100%" stopColor="#6B1B9A" />
                  </linearGradient>
                  {/*  Pants Hot Pink Gradient  */}
                  <linearGradient id="pantsPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5AD9" />
                    <stop offset="100%" stopColor="#C8149C" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/*  Background Ribbons, Sparkles & Starbursts  */}
                <g aria-hidden="true">
                  {/*  Multi-point Starburst Left  */}
                  <polygon
                    points="96,178 109,154 134,148 118,170 138,188 111,189 102,214 91,189 65,194 84,173 68,152 92,160"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Bottom Left Starburst behind Dancer A  */}
                  <polygon
                    points="156,515 174,475 212,482 188,510 218,538 179,542 165,578 148,544 108,548 136,518 114,485 150,498"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Swooping Hot-Pink Ribbon Curves  */}
                  <path
                    d="M 190 285 C 145 255, 160 190, 235 210 C 190 215, 185 255, 225 270 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  <path
                    d="M 435 190 C 455 135, 515 135, 525 188 C 500 162, 468 168, 455 202 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  <path
                    d="M 695 280 C 765 275, 795 210, 745 168 C 762 212, 740 250, 685 255 Z"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Acid-Lime Crescent Moon  */}
                  <path
                    d="M 488 415 A 22 22 0 1 0 518 442 A 16 16 0 1 1 488 415 Z"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3"
                  />
                  {/*  Four-Point Neon Sparkles  */}
                  <path d="M235 90 L240 105 L255 110 L240 115 L235 130 L230 115 L215 110 L230 105 Z" fill="#FC3CCC" />
                  <path d="M350 288 L355 304 L371 309 L355 314 L350 330 L345 314 L329 309 L345 304 Z" fill="#FCF03C" />
                  <path d="M510 102 L514 115 L527 119 L514 123 L510 136 L506 123 L493 119 L506 115 Z" fill="#FFFDF8" />
                  <path d="M645 118 L649 131 L662 135 L649 139 L645 152 L641 139 L628 135 L641 131 Z" fill="#FCF03C" />
                  <path d="M405 478 L410 492 L424 497 L410 502 L405 516 L400 502 L386 497 L400 492 Z" fill="#30F0CC" />
                </g>

                {/*  1. COLOSSAL 3D EXTRUDED FIVE-POINT NEON STAR PORTAL  */}
                <g className="sr-svg-star-portal">
                  {/*  3D Extruded Depth Side Planes (Hot Pink & Electric Purple)  */}
                  <polygon
                    points="495,135 538,242 652,222 572,318 612,438 498,378 386,435 426,320 348,255 452,248"
                    transform="translate(22, 24)"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                  />
                  {/*  Extrusion Connector Facets  */}
                  <polygon
                    points="652,222 674,246 594,342 572,318"
                    fill="#FC3CCC"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="572,318 594,342 634,462 612,438"
                    fill="#B738E8"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="498,378 520,402 408,459 386,435"
                    fill="#FF42D2"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  {/*  Main Star Front Face (Mint to Acid Lime)  */}
                  <polygon
                    points="495,135 538,242 652,222 572,318 612,438 498,378 386,435 426,320 348,255 452,248"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  {/*  Crisp White Inner Comic Highlight Strokes  */}
                  <polyline
                    points="495,152 458,254 366,260"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <polyline
                    points="544,250 632,234"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </g>

                {/*  2. JAGGED MINT-TO-LIME LIGHTNING BOLT ARROW  */}
                <g aria-hidden="true">
                  <polygon
                    points="355,595 432,475 462,502 522,428 522,428 548,448 568,402 518,418 536,434 468,478 438,448 332,595"
                    fill="#12041B"
                    transform="translate(6, 8)"
                  />
                  <polygon
                    points="350,595 435,472 466,502 528,430 512,418 568,395 550,452 536,438 468,528 436,498 375,595"
                    fill="url(#boltGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </g>

                {/*  3. HANGING FACETED DISCO MIRROR BALL  */}
                <g className="sr-svg-disco-ball">
                  {/*  Hanging Cord  */}
                  <line x1="575" y1="0" x2="575" y2="58" stroke="#FC3CCC" strokeWidth="4" />
                  {/*  Top Cap Ring  */}
                  <rect x="563" y="54" width="24" height="10" rx="4" fill="#CAB9D4" stroke="#12041B" strokeWidth="3" />
                  {/*  Outer Glow Halo  */}
                  <circle cx="575" cy="118" r="58" fill="rgba(48, 240, 204, 0.18)" />
                  {/*  Main Sphere Base  */}
                  <circle cx="575" cy="118" r="52" fill="#1E092B" stroke="#12041B" strokeWidth="4" />
                  {/*  Mirror Tile Facets  */}
                  <g stroke="#12041B" strokeWidth="2">
                    <rect x="545" y="74" width="18" height="14" rx="2" fill="#30F0CC" />
                    <rect x="565" y="74" width="20" height="14" rx="2" fill="#FFFDF8" />
                    <rect x="587" y="74" width="18" height="14" rx="2" fill="#9451FF" />

                    <rect x="532" y="90" width="18" height="16" rx="2" fill="#FCF03C" />
                    <rect x="552" y="90" width="21" height="16" rx="2" fill="#30F0CC" />
                    <rect x="575" y="90" width="21" height="16" rx="2" fill="#FC3CCC" />
                    <rect x="598" y="90" width="18" height="16" rx="2" fill="#30F0CC" />

                    <rect x="528" y="108" width="19" height="18" rx="2" fill="#30F0CC" />
                    <rect x="549" y="108" width="23" height="18" rx="2" fill="#9451FF" />
                    <rect x="574" y="108" width="23" height="18" rx="2" fill="#FFFDF8" />
                    <rect x="599" y="108" width="19" height="18" rx="2" fill="#FC3CCC" />

                    <rect x="533" y="128" width="18" height="16" rx="2" fill="#FC3CCC" />
                    <rect x="553" y="128" width="21" height="16" rx="2" fill="#30F0CC" />
                    <rect x="576" y="128" width="21" height="16" rx="2" fill="#9451FF" />
                    <rect x="599" y="128" width="17" height="16" rx="2" fill="#FCF03C" />

                    <rect x="546" y="146" width="18" height="13" rx="2" fill="#30F0CC" />
                    <rect x="566" y="146" width="20" height="13" rx="2" fill="#FC3CCC" />
                    <rect x="588" y="146" width="16" height="13" rx="2" fill="#30F0CC" />
                  </g>
                  {/*  Sparkle Glints on Mirror Ball  */}
                  <path d="M532 76 L535 85 L544 88 L535 91 L532 100 L529 91 L520 88 L529 85 Z" fill="#FFFDF8" />
                  <path d="M614 128 L617 137 L626 140 L617 143 L614 152 L611 143 L602 140 L611 137 Z" fill="#FFFDF8" />
                </g>

                {/*  Bottom Neon Bass Cloud Waves  */}
                <g aria-hidden="true">
                  <circle cx="88" cy="595" r="46" fill="url(#starExtrudeGrad)" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="152" cy="605" r="38" fill="#30F0CC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="515" cy="592" r="48" fill="url(#cloudPinkGrad)" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="575" cy="568" r="42" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="715" cy="575" r="65" fill="url(#starExtrudeGrad)" stroke="#12041B" strokeWidth="3.5" />
                </g>

                {/*  4. DANCER A (LEFT FOREGROUND — Pointing Skyward, Pink Bubble Braid, Mint Jacket, Pink Bell-Bottoms)  */}
                <g className="sr-svg-dancer-left">
                  <g transform="translate(-48, 6)">
                  {/*  Flowing Pink Bubble Ponytail Braid  */}
                  <circle cx="135" cy="396" r="14" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="148" cy="374" r="17" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="168" cy="355" r="19" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  <circle cx="192" cy="345" r="16" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />

                  {/*  Raised Right Arm Pointing to the Star  */}
                  <path
                    d="M 248 360 L 282 298 L 296 305 L 266 372 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Pointing Hand  */}
                  <path
                    d="M 280 298 L 294 276 L 300 280 L 292 296 L 298 302 L 284 306 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3"
                  />

                  {/*  Left Arm Extended Downward  */}
                  <path
                    d="M 185 408 L 152 442 L 164 450 L 198 418 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />

                  {/*  Cropped Electric-Mint Puff Sleeve Jacket & Acid-Lime Crop Top  */}
                  <path
                    d="M 205 368 C 182 372, 168 395, 176 420 L 208 424 L 218 378 Z"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Acid-Lime Top & Midriff  */}
                  <polygon
                    points="212,374 252,372 246,414 210,414"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="212,414 245,414 243,432 210,432"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Right Mint Jacket Wing  */}
                  <path
                    d="M 244 368 L 278 320 L 296 332 L 262 396 L 245 398 Z"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />

                  {/*  Head, Gold Hoop Earring & Neon Visor Shades  */}
                  <circle cx="228" cy="346" r="18" fill="#FF9BB0" stroke="#12041B" strokeWidth="3.8" />
                  <path d="M 210 342 C 212 324, 238 322, 244 338 Z" fill="#FC3CCC" stroke="#12041B" strokeWidth="3.5" />
                  {/*  Gold Hoop Earring  */}
                  <circle cx="212" cy="356" r="7" fill="none" stroke="#FCF03C" strokeWidth="3" />
                  {/*  Mint & Pink Futuristic Visor  */}
                  <rect
                    x="222"
                    y="335"
                    width="24"
                    height="10"
                    rx="4"
                    transform="rotate(-10 234 340)"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="3"
                  />

                  {/*  High-Waisted Hot-Pink Wide Bell-Bottom Trousers  */}
                  <polygon
                    points="206,432 246,432 292,554 242,562 224,484 186,564 138,542"
                    fill="url(#pantsPinkGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  {/*  White Side Racing Stripes on Bell-Bottoms  */}
                  <path
                    d="M 238 438 L 276 552"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 212 442 L 156 544"
                    fill="none"
                    stroke="#FFFDF8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/*  Chunky Acid-Lime Platform Boots  */}
                  <polygon
                    points="146,546 178,560 172,592 126,592 132,572 144,570"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="252,558 284,554 306,588 248,592"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                    strokeLinejoin="round"
                  />
                  </g>
                </g>

                {/*  5. DANCER B (RIGHT FOREGROUND — Curly Purple Hair, Patterned Shirt, Mint Wide-Leg Pants)  */}
                <g className="sr-svg-dancer-right">
                  <g transform="translate(8, 22)">
                  {/*  Energy Rays above Dancer B  */}
                  <line x1="560" y1="305" x2="542" y2="282" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="576" y1="296" x2="568" y2="268" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="592" y1="298" x2="596" y2="270" stroke="#FCF03C" strokeWidth="3.5" strokeLinecap="round" />

                  {/*  Raised Left & Right Arms  */}
                  <path
                    d="M 552 405 L 542 355 L 558 352 L 570 395 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M 652 365 L 682 325 L 652 296 L 642 308 L 662 328 L 636 355 Z"
                    fill="#FF9BB0"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />

                  {/*  White Inner Tee & Open Purple/Gold Retro Disco Shirt  */}
                  <polygon
                    points="584,368 638,365 626,435 582,435"
                    fill="#FFFDF8"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Open Patterned Shirt Flaps  */}
                  <polygon
                    points="552,386 592,366 586,445 552,448"
                    fill="#4A157A"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="632,362 672,352 658,442 624,436"
                    fill="#4A157A"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  {/*  Gold Squiggle Motifs on Shirt  */}
                  <circle cx="572" cy="402" r="5" fill="#FCF03C" />
                  <circle cx="568" cy="428" r="4" fill="#FC3CCC" />
                  <circle cx="646" cy="388" r="6" fill="#FCF03C" />
                  <circle cx="642" cy="418" r="4.5" fill="#30F0CC" />

                  {/*  Head, Curly Purple Hair & Mint Shades  */}
                  <circle cx="612" cy="342" r="17" fill="#FF9BB0" stroke="#12041B" strokeWidth="3.8" />
                  {/*  Curly Purple Hair Cloud  */}
                  <path
                    d="M 592 336 C 586 318, 604 308, 616 314 C 628 308, 644 320, 636 336 C 642 344, 632 352, 626 344 Z"
                    fill="#9451FF"
                    stroke="#12041B"
                    strokeWidth="3.5"
                  />
                  {/*  Mint Sunglasses  */}
                  <rect x="596" y="334" width="24" height="9" rx="3" fill="#30F0CC" stroke="#12041B" strokeWidth="2.8" />

                  {/*  Electric-Mint Wide-Leg Trousers  */}
                  <polygon
                    points="580,435 628,435 656,492 618,548 592,538 616,488 588,476 544,568 510,562"
                    fill="#30F0CC"
                    stroke="#12041B"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/*  Platform Sneakers  */}
                  <polygon
                    points="508,562 540,568 544,592 496,592"
                    fill="#FFFDF8"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  <polygon
                    points="588,540 622,548 632,572 580,578"
                    fill="#FCF03C"
                    stroke="#12041B"
                    strokeWidth="3.8"
                  />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/*  Distinct Scroll Teaser  */}
          <div className="sr-scroll-teaser-wrap">
            <a href="#manifesto" className="sr-scroll-teaser-link">
              <span aria-hidden="true">✦</span>
              <span>DROP INTO THE FLOOR</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/ManifestoSection.tsx">
<![CDATA[import React from "react";

export function ManifestoSection() {
  return (
    <section id="manifesto" className="sr-manifesto-section" aria-labelledby="manifesto-title">
      <div className="sr-container">
        <div className="sr-manifesto-card">
          <div>
            <div className="sr-kicker-label">
              <span>CLUB MANIFESTO</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="manifesto-title" className="sr-display-type sr-manifesto-headline">
              ORDINARY NIGHTS? <span className="sr-stroke-accent">NOT HERE.</span>
            </h2>
            <p className="sr-manifesto-prose">
              We tore out the velvet ropes, killed the bottle-service ego, and poured everything into a custom
              four-corner analog sound system and a light rig built like a UFO landing. At STAR RIOT, every body on
              the floor is the headliner—whether you came in platform boots or sneakers worn through from last
              weekend.
            </p>
            <div className="sr-manifesto-pillars">
              <span>✦ 360° CUSTOM BASS ARRAY</span>
              <span>✦ ZERO VIP ROPES</span>
              <span>✦ VINYL &amp; FUTURE SYNTH</span>
            </div>
          </div>

          {/* Spinning Cosmic Vinyl Illustration */}
          <div className="sr-manifesto-vinyl-art" aria-hidden="true">
            <svg className="sr-spin-vinyl" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="122" fill="#12041B" stroke="#30F0CC" strokeWidth="4" />
              <circle
                cx="130"
                cy="130"
                r="102"
                fill="none"
                stroke="rgba(202, 185, 212, 0.25)"
                strokeWidth="2"
                strokeDasharray="18 10"
              />
              <circle
                cx="130"
                cy="130"
                r="82"
                fill="none"
                stroke="rgba(252, 60, 204, 0.45)"
                strokeWidth="2.5"
                strokeDasharray="28 14"
              />
              <circle cx="130" cy="130" r="62" fill="none" stroke="rgba(252, 240, 60, 0.45)" strokeWidth="2" />
              <polygon
                points="130,68 144,108 186,108 152,134 165,175 130,150 95,175 108,134 74,108 116,108"
                fill="url(#starFaceGrad)"
                stroke="#12041B"
                strokeWidth="3"
              />
              <circle cx="130" cy="130" r="14" fill="#12041B" stroke="#FFFDF8" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Horizontally Marching Ticker */}
      <div className="sr-riot-ticker" aria-label="Dance, Sweat, Shine, Repeat">
        <div className="sr-ticker-track">
          <span>DANCE / SWEAT / SHINE / REPEAT ✦</span>
          <span>DISCO FEVER / FUTURE SOUNDS / ZERO ORDINARY NIGHTS ✦</span>
          <span>TONIGHT WE GO SUPERNOVA ✦</span>
          <span aria-hidden="true">DANCE / SWEAT / SHINE / REPEAT ✦</span>
          <span aria-hidden="true">DISCO FEVER / FUTURE SOUNDS / ZERO ORDINARY NIGHTS ✦</span>
          <span aria-hidden="true">TONIGHT WE GO SUPERNOVA ✦</span>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/MovementSection.tsx">
<![CDATA["use client";

import React, { useState, useRef } from "react";

export function MovementSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const scrollGallery = (direction: "left" | "right") => {
    if (trackRef.current) {
      trackRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="sr-movement-section" aria-labelledby="movement-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>VOICES FROM THE 3 AM FLOOR</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="movement-heading" className="sr-display-type sr-section-title">
              COME FOR ONE SONG. STAY FOR THE WHOLE NIGHT.
            </h2>
          </div>

          <div className="sr-carousel-controls">
            <button
              type="button"
              className="sr-carousel-arrow-btn"
              id="gallery-prev"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery("left")}
            >
              ←
            </button>
            <button
              type="button"
              className="sr-carousel-arrow-btn"
              id="gallery-next"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery("right")}
            >
              →
            </button>
          </div>
        </div>

        <div className="sr-sticker-wall-track" id="sticker-wall-track" ref={trackRef}>
          {/* Sticker 1 */}
          <article className={`sr-sticker-card ${flippedCards[1] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--electric-mint)", marginBottom: "0.5rem" }}>
                STAMP #014 · FRIDAY FREQUENCY
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;NOBODY STARING AT PHONES—JUST 500 PEOPLE GROOVING.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — MARA K., REGULAR SINCE OPENING NIGHT
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(1)}>
                {flippedCards[1] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>2:15 AM Memory:</strong> When DJ Orbit dropped a 1979 brass edit and the whole room sang the
                bassline together.
              </div>
            </div>
          </article>

          {/* Sticker 2 */}
          <article className={`sr-sticker-card ${flippedCards[2] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--hot-pink)", marginBottom: "0.5rem" }}>
                STAMP #029 · SATURDAY STARBURST
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;THE SOUND SYSTEM FEELS LIKE A WARM NEON HUG.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — DEVON &amp; JULES, EAST SIDE CREW
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(2)}>
                {flippedCards[2] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Crystal Clear Highs:</strong> You can actually talk to your friends by the bar and still feel
                the sub-bass in your shoes.
              </div>
            </div>
          </article>

          {/* Sticker 3 */}
          <article className={`sr-sticker-card ${flippedCards[3] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--acid-lime)", marginBottom: "0.5rem" }}>
                STAMP #042 · SUNDAY SLOWBURN
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;CAME SOLO AT 10 PM, LEFT WITH A WHOLE NEW DANCE CREW.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — TARIQ S., VINYL COLLECTOR
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(3)}>
                {flippedCards[3] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Floor Host Tip:</strong> Ask the booth crew for the handwritten tracklist zine at closing time!
              </div>
            </div>
          </article>

          {/* Sticker 4 */}
          <article className={`sr-sticker-card ${flippedCards[4] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--warm-coral)", marginBottom: "0.5rem" }}>
                STAMP #058 · LATE HOURS
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;GLITTER, PLATFORM BOOTS, AND ZERO PRETENSION.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — SASHA V., DESIGNER &amp; DANCER
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(4)}>
                {flippedCards[4] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Dress Vibe:</strong> Wear whatever makes you move—sequins, vintage track jackets, or neon
                shades.
              </div>
            </div>
          </article>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="sr-faq-wrap">
          <div className="sr-kicker-label">
            <span>KNOW BEFORE YOU GO</span>
            <span className="sr-spark" aria-hidden="true">✦</span>
          </div>
          <h2 className="sr-display-type sr-section-title">FREQUENTLY ASKED QUESTIONS.</h2>

          <div className="sr-faq-list">
            <div className={`sr-faq-item ${openFaqs[0] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[0])}
                onClick={() => toggleFaq(0)}
              >
                <span>HOW DOES THE GUESTLIST WORK?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                Drop your name and preferred night in the form below to generate a demo STAR RIOT Club Pass. (Note:
                STAR RIOT is a fictional nightlife concept built as an interactive design showcase—no real personal
                data is transmitted or stored externally.)
              </div>
            </div>

            <div className={`sr-faq-item ${openFaqs[1] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[1])}
                onClick={() => toggleFaq(1)}
              >
                <span>IS THERE A DRESS CODE?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                Expressive, comfortable, and ready to sweat. Platform boots, vintage tracksuits, holographic jackets,
                and sneakers are all welcome. We only ask that you leave corporate suits and bad attitudes at home.
              </div>
            </div>

            <div className={`sr-faq-item ${openFaqs[2] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[2])}
                onClick={() => toggleFaq(2)}
              >
                <span>WHY NO FLASH PHOTOS ON THE DANCE FLOOR?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                The dance floor works best when everyone is inside the moment rather than on someone else&apos;s feed. Keep
                phones tucked away on the main floor; our illustrated photobooth in the lounge is open all night.
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
    <file path="src/app/(starriot)/starriot/components/NightsSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";

interface NightsSectionProps {
  onOpenModal: (eventId: string) => void;
}

export function NightsSection({ onOpenModal }: NightsSectionProps) {
  const [filter, setFilter] = useState<"all" | "house" | "disco" | "soul">("all");

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", (-y * 7).toFixed(2) + "deg");
    card.style.setProperty("--tilt-y", (x * 7).toFixed(2) + "deg");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  const isCardVisible = (category: string) => filter === "all" || filter === category;

  return (
    <section id="nights" className="sr-nights-section" aria-labelledby="nights-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>WEEKEND LINEUP &amp; RESIDENCIES</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="nights-heading" className="sr-display-type sr-section-title">
              PICK YOUR FREQUENCY.
            </h2>
          </div>

          {/* Interactive Genre Filter Controls */}
          <div className="sr-frequency-filter-bar" role="group" aria-label="Filter club nights by vibe">
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "all" ? "sr-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Nights
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "house" ? "sr-active" : ""}`}
              onClick={() => setFilter("house")}
            >
              House &amp; Edits
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "disco" ? "sr-active" : ""}`}
              onClick={() => setFilter("disco")}
            >
              Classic Disco
            </button>
            <button
              type="button"
              className={`sr-freq-tab-btn ${filter === "soul" ? "sr-active" : ""}`}
              onClick={() => setFilter("soul")}
            >
              Soul &amp; Boogie
            </button>
          </div>
        </div>

        <div className="sr-nights-grid" id="nights-grid">
          {/* Card 1: FRIDAY FREQUENCY (Mint Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("house") ? "sr-hidden-card" : ""}`}
            data-theme="mint"
            data-category="house"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">122 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#180624" />
                  <circle
                    cx="180"
                    cy="120"
                    r="85"
                    fill="none"
                    stroke="#30F0CC"
                    strokeWidth="3"
                    strokeDasharray="10 6"
                  />
                  <polygon
                    points="180,32 258,188 102,188"
                    fill="url(#starFaceGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                  />
                  <path d="M20 185 Q 95 110, 180 185 T 340 185" fill="none" stroke="#FC3CCC" strokeWidth="6" />
                  <circle cx="180" cy="135" r="24" fill="#12041B" stroke="#FCF03C" strokeWidth="4" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">EVERY FRIDAY • 10 PM – 4 AM</div>
                  <h3 className="sr-display-type sr-poster-title">FRIDAY FREQUENCY</h3>
                  <p className="sr-poster-desc">
                    High-voltage house, laser-cut disco edits, and loud neon colors to detonate the workweek.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: DJ ORBIT · KIKI NOVA · SYNTHIA</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("friday-frequency")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: SATURDAY STARBURST (Hot Pink Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("disco") ? "sr-hidden-card" : ""}`}
            data-theme="pink"
            data-category="disco"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">126 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#1F072E" />
                  <polygon
                    points="180,18 206,86 280,78 228,132 252,204 180,168 108,204 132,132 80,78 154,86"
                    fill="url(#starExtrudeGrad)"
                    stroke="#12041B"
                    strokeWidth="4"
                  />
                  <circle cx="180" cy="122" r="42" fill="#FCF03C" stroke="#12041B" strokeWidth="4" />
                  <path d="M150 122 L210 122 M180 92 L180 152" stroke="#12041B" strokeWidth="5" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">EVERY SATURDAY • 10 PM – 5 AM</div>
                  <h3 className="sr-display-type sr-poster-title">SATURDAY STARBURST</h3>
                  <p className="sr-poster-desc">
                    70s &amp; 80s disco classics recharged with live brass horns, confetti drops, and cosmic synth bass.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: LUNA VEX · MILES ELECTRIC · RIOT HORNS</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("saturday-starburst")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Card 3: SUNDAY SLOWBURN (Acid Lime Dominant) */}
          <article
            className={`sr-night-poster-card ${!isCardVisible("soul") ? "sr-hidden-card" : ""}`}
            data-theme="lime"
            data-category="soul"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <div className="sr-poster-art-frame">
                <span className="sr-poster-peel-tag">114 BPM</span>
                <svg className="sr-poster-svg-scene" viewBox="0 0 360 240" aria-hidden="true">
                  <rect width="360" height="240" fill="#160521" />
                  <circle cx="180" cy="135" r="72" fill="#FCF03C" stroke="#12041B" strokeWidth="4" />
                  <path
                    d="M40 165 Q 180 125, 320 165 L 320 240 L 40 240 Z"
                    fill="#2C103B"
                    stroke="#30F0CC"
                    strokeWidth="3"
                  />
                  <circle cx="180" cy="135" r="22" fill="#FC3CCC" stroke="#12041B" strokeWidth="3" />
                </svg>
              </div>
              <div className="sr-poster-content">
                <div>
                  <div className="sr-poster-schedule">SELECT SUNDAYS • 8 PM – 2 AM</div>
                  <h3 className="sr-display-type sr-poster-title">SUNDAY SLOWBURN</h3>
                  <p className="sr-poster-desc">
                    Deep crate-dug boogie, analog soul, warm coral lights, and the friendliest late-weekend afterglow.
                  </p>
                </div>
                <div>
                  <div className="sr-poster-lineup-meta">LINEUP: RIO SONIC · VELVET ECHO · SOLARIS</div>
                  <button
                    type="button"
                    className="sr-poster-cta-btn sr-open-event-modal"
                    onClick={() => onOpenModal("sunday-slowburn")}
                  >
                    <span>SEE DETAILS</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/SiteFooter.tsx">
<![CDATA[import React from "react";

export function SiteFooter() {
  return (
    <footer className="sr-site-footer">
      <div className="sr-container sr-footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="sr-display-type" style={{ fontSize: "1.4rem", color: "var(--electric-mint)" }}>
            ✦ STAR RIOT
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--muted-lilac)" }}>
            © 2026 STAR RIOT FICTIONAL NIGHTLIFE CONCEPT. ZERO ORDINARY NIGHTS.
          </span>
        </div>

        <div className="sr-footer-links">
          <a href="#nights">Nights</a>
          <a href="#the-space">The Space</a>
          <a href="#the-sound">The Sound</a>
          <a href="#faq">FAQ</a>
          <a href="#top">Back To Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/SoundStageSection.tsx">
<![CDATA["use client";

import React, { useState, useEffect, useRef } from "react";
import { computeScrollStage } from "../utils/clubLogic";

export function SoundStageSection() {
  const [progress, setProgress] = useState(0.15);
  const sectionRef = useRef<HTMLElement>(null);
  const manualLockUntilRef = useRef<number>(0);

  const stage = computeScrollStage(progress);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Date.now() >= manualLockUntilRef.current && sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const startY = window.innerHeight * 0.75;
            const travel = Math.max(1, window.innerHeight * 0.65);
            const rawProgress = (startY - rect.top) / travel;
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              setProgress(rawProgress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleStagePillClick = (idx: number) => {
    const targetProgress = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.9;
    manualLockUntilRef.current = Date.now() + 1200;
    setProgress(targetProgress);
  };

  const ringOpacity = 0.25 + stage.progress * 0.75;
  const ringScale = (0.68 + stage.progress * 0.45).toFixed(3);

  const starOpacity = stage.progress < 0.34 ? 0.12 : stage.progress < 0.67 ? 0.48 : 1;
  const starScale = (0.5 + stage.progress * 0.65).toFixed(3);
  const starRot = (-25 + stage.progress * 50).toFixed(1);

  const dancersOpacity = 0.35 + stage.progress * 0.65;
  const dancersOffset = ((1 - stage.progress) * 26).toFixed(1);

  return (
    <section
      id="the-sound"
      ref={sectionRef}
      className="sr-sound-scroll-track"
      aria-labelledby="sound-stage-title"
    >
      <div className="sr-sound-sticky-stage">
        <div className="sr-container">
          <div className="sr-sound-stage-frame" id="sound-stage-frame" data-phase={stage.phaseId}>
            {/* Left Narrative & Interactive Stage Controls */}
            <div>
              <div className="sr-kicker-label">
                <span>SCROLL-DRIVEN SONIC PROGRESSION</span>
                <span className="sr-spark" aria-hidden="true">✦</span>
              </div>

              <div className="sr-stage-phase-controls" role="group" aria-label="Select sonic stage">
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 0 ? "sr-active" : ""}`}
                  data-stage-btn="0"
                  onClick={() => handleStagePillClick(0)}
                >
                  01. WARM UP
                </button>
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 1 ? "sr-active" : ""}`}
                  data-stage-btn="1"
                  onClick={() => handleStagePillClick(1)}
                >
                  02. TURN UP
                </button>
                <button
                  type="button"
                  className={`sr-stage-pill-btn ${stage.phaseIndex === 2 ? "sr-active" : ""}`}
                  data-stage-btn="2"
                  onClick={() => handleStagePillClick(2)}
                >
                  03. ALL OUT
                </button>
              </div>

              <h2 id="sound-stage-title" className="sr-display-type sr-sound-stage-headline">
                {stage.headline}
              </h2>

              <p className="sr-sound-stage-subcopy" id="sound-stage-subcopy">
                {stage.subcopy}
              </p>

              <div className="sr-sound-telemetry-bar">
                <span id="stage-phase-readout">PHASE: {stage.phaseLabel}</span>
                <span>·</span>
                <span id="stage-bpm-readout">{stage.bpm} BPM</span>
                <span>·</span>
                <span id="stage-pct-readout">PROGRESS: {Math.round(stage.progress * 100)}%</span>
              </div>
            </div>

            {/* Right Dynamic Scroll-Animated SVG Scene */}
            <div className="sr-sound-visual-canvas">
              <svg
                className="sr-sound-stage-svg"
                viewBox="0 0 440 400"
                role="img"
                aria-label="Dynamic club sound visualization transforming from Warm Up vinyl sphere to Turn Up bass rings to All Out supernova"
              >
                {/* Phase 2 Expanding Concentric Bass Rings */}
                <g
                  className="sr-stage-ring-group"
                  id="stage-ring-group"
                  style={{
                    opacity: ringOpacity,
                    transform: `scale(${ringScale})`,
                  }}
                >
                  <circle
                    cx="220"
                    cy="200"
                    r="165"
                    fill="none"
                    stroke="#30F0CC"
                    strokeWidth="2.5"
                    strokeDasharray="14 8"
                  />
                  <circle cx="220" cy="200" r="130" fill="none" stroke="#FC3CCC" strokeWidth="3" />
                  <circle
                    cx="220"
                    cy="200"
                    r="98"
                    fill="none"
                    stroke="#FCF03C"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                </g>

                {/* Phase 3 Erupting Neon Supernova Star */}
                <g
                  className="sr-stage-supernova-group"
                  id="stage-supernova-group"
                  style={{
                    opacity: starOpacity,
                    transform: `scale(${starScale}) rotate(${starRot}deg)`,
                  }}
                >
                  <polygon
                    points="220,25 256,132 368,118 286,196 322,308 220,250 118,308 154,196 72,118 184,132"
                    fill="url(#starFaceGrad)"
                    stroke="#FC3CCC"
                    strokeWidth="4"
                  />
                </g>

                {/* Phase 1 Core Cosmic Vinyl & Mirror Sphere */}
                <g id="stage-core-sphere">
                  <circle cx="220" cy="200" r="68" fill="#1E092B" stroke="#30F0CC" strokeWidth="4" />
                  <circle cx="220" cy="200" r="48" fill="#2C103B" stroke="#FC3CCC" strokeWidth="3" />
                  <circle cx="220" cy="200" r="22" fill="#FCF03C" stroke="#12041B" strokeWidth="3" />
                  <circle cx="220" cy="200" r="6" fill="#12041B" />
                </g>

                {/* Phase 2 & 3 Sliding Dancer Silhouettes & Equalizer Bars */}
                <g
                  className="sr-stage-dancers-group"
                  id="stage-dancers-group"
                  style={{
                    opacity: dancersOpacity,
                    transform: `translateY(${dancersOffset}px)`,
                  }}
                >
                  <rect x="75" y="330" width="14" height="42" rx="4" fill="#30F0CC" />
                  <rect x="98" y="310" width="14" height="62" rx="4" fill="#30F0CC" />
                  <rect x="121" y="322" width="14" height="50" rx="4" fill="#9451FF" />
                  <rect x="144" y="294" width="14" height="78" rx="4" fill="#FC3CCC" />
                  <rect x="167" y="315" width="14" height="57" rx="4" fill="#FC3CCC" />
                  <rect x="259" y="312" width="14" height="60" rx="4" fill="#FCF03C" />
                  <rect x="282" y="296" width="14" height="76" rx="4" fill="#FCF03C" />
                  <rect x="305" y="318" width="14" height="54" rx="4" fill="#30F0CC" />
                  <rect x="328" y="332" width="14" height="40" rx="4" fill="#30F0CC" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/components/SpaceSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";

export function SpaceSection() {
  const [floorColor, setFloorColor] = useState("#30F0CC");

  return (
    <section id="the-space" className="sr-space-section" aria-labelledby="space-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>ARCHITECTURE OF AFTER-DARK JOY</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="space-heading" className="sr-display-type sr-section-title">
              INSIDE THE RIOT.
            </h2>
          </div>
        </div>

        <div className="sr-space-bento-grid">
          {/* Zone 1: THE FLOOR */}
          <article
            className="sr-space-card sr-space-card-floor"
            id="floor-card"
            style={{
              borderColor: floorColor,
              boxShadow: `0 0 28px ${floorColor}44`,
            }}
          >
            <div>
              <span className="sr-space-sticker-tag">01 · THE FLOOR</span>
              <h3 className="sr-display-type sr-space-card-title">SUNKEN SPRUNG NEON FLOOR</h3>
              <p className="sr-space-card-copy">
                Built on cushioned maple and illuminated under-glass panels for 600 dancers. Zero VIP tables blocking
                sightlines—just one electric sea of motion. Test the under-floor light matrix below:
              </p>
            </div>
            <div>
              <div className="sr-floor-matrix-bar" role="group" aria-label="Preview under-floor lighting color">
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#30F0CC" ? "sr-active" : ""}`}
                  data-floor-color="#30F0CC"
                  onClick={() => setFloorColor("#30F0CC")}
                >
                  Electric Mint
                </button>
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#FC3CCC" ? "sr-active" : ""}`}
                  data-floor-color="#FC3CCC"
                  onClick={() => setFloorColor("#FC3CCC")}
                >
                  Hot Pink
                </button>
                <button
                  type="button"
                  className={`sr-matrix-swatch-btn ${floorColor === "#FCF03C" ? "sr-active" : ""}`}
                  data-floor-color="#FCF03C"
                  onClick={() => setFloorColor("#FCF03C")}
                >
                  Acid Lime
                </button>
              </div>
            </div>
          </article>

          {/* Zone 2: THE LIGHTS */}
          <article className="sr-space-card sr-space-card-lights">
            <div>
              <span className="sr-space-sticker-tag">02 · THE LIGHTS</span>
              <h3 className="sr-display-type sr-space-card-title">TRIPLE MIRROR-BALL ORBIT</h3>
              <p className="sr-space-card-copy">
                Three custom-faceted cosmic mirror spheres suspended above the room scatter thousands of mint,
                magenta, and lime starlets across the walls in real time.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--electric-mint)", letterSpacing: "0.1em" }}>
              ✦ 48 ANALOG PRISM BEAMS · ZERO HARSH STROBES
            </div>
          </article>

          {/* Zone 3: THE BOOTH */}
          <article className="sr-space-card sr-space-card-booth">
            <div>
              <span className="sr-space-sticker-tag">03 · THE BOOTH</span>
              <h3 className="sr-display-type sr-space-card-title">360° FLOOR-LEVEL DECK</h3>
              <p className="sr-space-card-copy">
                No distant stage altar. Our custom rotary mixer and twin turntables sit right in the pocket of the
                dance floor so DJ and crowd lock into the same sweat and energy.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--acid-lime)", letterSpacing: "0.1em" }}>
              ✦ CUSTOM ROTARY MIXER · DUAL VINYL &amp; DIGITAL
            </div>
          </article>

          {/* Zone 4: THE CREW */}
          <article className="sr-space-card sr-space-card-crew">
            <div>
              <span className="sr-space-sticker-tag">04 · THE CREW</span>
              <h3 className="sr-display-type sr-space-card-title">RADICAL INCLUSIVITY &amp; CARE</h3>
              <p className="sr-space-card-copy">
                Dedicated floor hosts, free cold water stations at both ends of the room, a cozy chill-out lounge
                with plush booths, and a camera-free dance floor policy so you can dance without performing.
              </p>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--warm-coral)", letterSpacing: "0.1em" }}>
              ✦ NO FLASH PHOTOGRAPHY · FREE EARPLUGS AT COAT CHECK
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(starriot)/starriot/utils/clubLogic.ts">
<![CDATA[export interface ScrollStageState {
  progress: number;
  phaseIndex: 0 | 1 | 2;
  phaseId: 'warmup' | 'turnup' | 'allout';
  phaseLabel: 'WARM UP' | 'TURN UP' | 'ALL OUT';
  headline: string;
  subcopy: string;
  bpm: number;
  ringScale: number;
  starRotation: number;
  dancerOffset: number;
}

export function clamp01(val: number): number {
  if (Number.isNaN(val)) return 0;
  return Math.max(0, Math.min(1, val));
}

export function computeScrollStage(rawProgress: number): ScrollStageState {
  const progress = clamp01(rawProgress);

  let phaseIndex: 0 | 1 | 2 = 0;
  let phaseId: 'warmup' | 'turnup' | 'allout' = 'warmup';
  let phaseLabel: 'WARM UP' | 'TURN UP' | 'ALL OUT' = 'WARM UP';
  let headline = 'FEEL THE BASSLINE WAKE THE ROOM.';
  let subcopy = '10:00 PM — Warm analog synth washes, slow-spinning mirror facets, first drinks at the neon bar.';
  let bpm = 116;

  if (progress >= 0.67) {
    phaseIndex = 2;
    phaseId = 'allout';
    phaseLabel = 'ALL OUT';
    headline = 'LOSE YOURSELF. FIND YOUR PEOPLE.';
    subcopy = '01:30 AM — Full supernova eruption. Confetti storms, peak-hour disco edits, zero strangers left on the floor.';
    bpm = 128;
  } else if (progress >= 0.34) {
    phaseIndex = 1;
    phaseId = 'turnup';
    phaseLabel = 'TURN UP';
    headline = 'THE FLOOR LOCKS INTO ORBIT.';
    subcopy = '11:30 PM — Concentric sub-bass waves expand across the room as the main deck drops electric house & nu-disco.';
    bpm = 122;
  }

  const ringScale = Number((0.65 + progress * 0.85).toFixed(3));
  const starRotation = Number((progress * 72 - 18).toFixed(2));
  const dancerOffset = Number(((1 - progress) * 48).toFixed(2));

  return {
    progress,
    phaseIndex,
    phaseId,
    phaseLabel,
    headline,
    subcopy,
    bpm,
    ringScale,
    starRotation,
    dancerOffset,
  };
}

export interface GuestlistInput {
  name: string;
  email: string;
  nightPreference: string;
}

export interface GuestlistValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    nightPreference?: string;
  };
  passCode?: string;
}

const VALID_NIGHTS = ['friday-frequency', 'saturday-starburst', 'sunday-slowburn', 'all-nights'];

export function validateGuestlistSubmission(input: GuestlistInput): GuestlistValidationResult {
  const errors: GuestlistValidationResult['errors'] = {};
  const trimmedName = (input.name || '').trim();
  const trimmedEmail = (input.email || '').trim();
  const pref = (input.nightPreference || '').trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name or dance-floor alias (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter an email address for your demo club pass.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g. you@domain.com).';
  }

  if (pref && !VALID_NIGHTS.includes(pref)) {
    errors.nightPreference = 'Please choose a valid club night.';
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    return { valid: false, errors };
  }

  // Deterministic pass code based on name + email
  const cleanUpper = trimmedName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4).padEnd(4, 'X');
  let hash = 0;
  for (let i = 0; i < trimmedEmail.length; i++) {
    hash = (hash * 31 + trimmedEmail.charCodeAt(i)) % 900 + 100;
  }
  const passCode = `SR-${cleanUpper}-${hash}`;

  return {
    valid: true,
    errors: {},
    passCode,
  };
}
]]>
    </file>
  </files>
</template>
