<template slug="riff" name="Riff">
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
    <file path="src/app/(riff)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Bodoni_Moda, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./riff/riff.css";

const editorial = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
});

const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Riff — Music-First Dating",
  description:
    "Fall for the sound before the selfie. A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.",
  openGraph: {
    title: "Riff — Music-First Dating",
    description:
      "Fall for the sound before the selfie. A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.",
    type: "website",
  },
  icons: { icon: "/templates/riff/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${condensed.variable} ${sans.variable} ${mono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0B0B0B] text-[#F4F0E8] antialiased selection:bg-[#C92533] selection:text-[#F4F0E8]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/App.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ManifestoAndHowItWorks } from './components/ManifestoAndHowItWorks';
import { TasteMatcherSection } from './components/TasteMatcherSection';
import { ChemistryAndSceneSections } from './components/ChemistryAndSceneSections';
import { StoriesAndFooter } from './components/StoriesAndFooter';
import { HandStar, WaveformLogo } from './components/ZineMotifs';
import { validatePreviewPass } from './utils/matching';

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Honest Preview / Early-Access Modal State
  const [previewModalSource, setPreviewModalSource] = useState<string | null>(null);
  const [passHandle, setPassHandle] = useState<string>('');
  const [passRecord, setPassRecord] = useState<string>('');
  const [passError, setPassError] = useState<string | null>(null);
  const [stampedPass, setStampedPass] = useState<{
    handle: string;
    record: string;
    serial: string;
  } | null>(null);

  const handleOpenPreview = (source: string) => {
    setPreviewModalSource(source);
    setPassError(null);
  };

  const handleClosePreview = () => {
    setPreviewModalSource(null);
    setPassError(null);
  };

  const handleStampLocalPass = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePreviewPass(passHandle, passRecord);
    if (!check.valid) {
      setPassError(check.error || 'Please fill in both fields.');
      return;
    }
    setPassError(null);
    setStampedPass({
      handle: check.normalizedHandle || passHandle.trim(),
      record: passRecord.trim(),
      serial: `RF-${Math.floor(100000 + (passHandle.length * 7919) % 899999)}`,
    });
  };

  return (
    <div
      className={`min-h-screen bg-[#0B0B0B] text-[#F4F0E8] relative selection:bg-[#C92533] selection:text-[#F4F0E8] ${
        !motionEnabled ? 'motion-paused' : ''
      }`}
    >
      {/* Fixed Subtle Analog Grain Overlay (pointer-events-none) */}
      <div aria-hidden="true" className="riff-grain-overlay fixed inset-0 z-40" />

      {/* ====================================================================
          TOP NAVIGATION BAR (3-Zone Contract matching riff-reference.png)
         ==================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0B0B]/92 backdrop-blur-md border-b border-[#F4F0E8]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Drawn Waveform */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[#F4F0E8] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <WaveformLogo className="w-9 h-8" />
            <span className="font-editorial font-black text-[1.95rem] tracking-[-0.03em] leading-none">
              Riff
            </span>
          </a>

          {/* Zone 2: Spaced Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 lg:gap-11 text-[0.95rem] font-normal text-[#F4F0E8]/90"
          >
            <a
              href="#how-it-works"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Matches
            </a>
            <a
              href="#playlists"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Playlists
            </a>
            <a
              href="#stories"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Stories
            </a>
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Sign In Preview')}
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          </nav>

          {/* Zone 3: Rectangular Red Primary Action ("Join Riff") */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Join Riff')}
              className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-[0.95rem] px-5 py-2.5 rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Riff
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 text-[#F4F0E8] border border-[#F4F0E8]/25 rounded-[3px]"
            >
              <span className="font-mono-code text-xs uppercase">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden bg-[#141414] border-b border-[#F4F0E8]/20 px-5 py-4 flex flex-col gap-3 text-sm"
          >
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Matches (Interactive Demo)
            </a>
            <a
              href="#playlists"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Playlists
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Stories
            </a>
            <div className="pt-2 border-t border-[#F4F0E8]/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPreview('Mobile Nav — Sign In Preview');
                }}
                className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8]"
              >
                Sign In (Preview)
              </button>
              <button
                type="button"
                onClick={() => setMotionEnabled((m) => !m)}
                className="text-xs font-mono-code uppercase text-[#C92533]"
              >
                {motionEnabled ? 'Pause Motion' : 'Resume Motion'}
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ====================================================================
          MAIN EIGHT-SCENE ZINE NARRATIVE
         ==================================================================== */}
      <main>
        {/* Section A: Hero — Two phones, one chemistry */}
        <HeroSection
          motionEnabled={motionEnabled}
          onOpenPreviewModal={handleOpenPreview}
        />

        {/* Section B: Manifesto & Section C: How It Works */}
        <ManifestoAndHowItWorks />

        {/* Section D: Interactive Taste Matcher */}
        <TasteMatcherSection />

        {/* Section E: Music Chemistry & Section F: The Scene / Playlist Wall */}
        <ChemistryAndSceneSections />

        {/* Section G: Stories & Values + Section H: Final CTA & Footer */}
        <StoriesAndFooter
          motionEnabled={motionEnabled}
          onToggleMotion={() => setMotionEnabled((m) => !m)}
          onOpenPreviewModal={handleOpenPreview}
        />
      </main>

      {/* ====================================================================
          HONEST PREVIEW / EARLY ACCESS STATUS DIALOG
         ==================================================================== */}
      {previewModalSource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-[#141414] border-2 border-[#C92533] rounded-[4px] p-6 sm:p-8 text-[#F4F0E8] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F0E8]/15">
              <span className="text-xs font-mono-code uppercase text-[#C92533] font-bold">
                CONCEPT PREVIEW STATUS · {previewModalSource}
              </span>
              <button
                type="button"
                onClick={handleClosePreview}
                aria-label="Close preview dialog"
                className="px-2 py-0.5 text-sm font-mono-code text-[#AAA8A6] hover:text-[#F4F0E8] border border-transparent hover:border-[#F4F0E8]/30 rounded-[2px] cursor-pointer"
              >
                ESC / &times;
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <HandStar className="w-8 h-8 text-[#C92533] shrink-0" variant={1} />
              <h2
                id="preview-modal-title"
                className="font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]"
              >
                Riff is in interactive concept preview.
              </h2>
            </div>

            <p className="mt-3 text-sm text-[#AAA8A6] leading-relaxed">
              This experience is a live front-end product showcase for <strong className="text-[#F4F0E8]">Riff (18+)</strong>. Native iOS/Android app downloads and live server accounts are not connected yet — we never fake a download or silently send your personal details to a server.
            </p>

            {/* Local-only Backstage Pass Stamper */}
            <form onSubmit={handleStampLocalPass} className="mt-5 space-y-3">
              <div className="text-xs font-mono-code uppercase text-[#F4F0E8]">
                Stamp a local-only backstage pass (stays 100% in your browser):
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="preview-pass-handle"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    First Name or Zine Alias
                  </label>
                  <input
                    id="preview-pass-handle"
                    type="text"
                    value={passHandle}
                    onChange={(e) => setPassHandle(e.target.value)}
                    placeholder="e.g. Mila"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preview-pass-record"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    Zero-Skip Album or Track
                  </label>
                  <input
                    id="preview-pass-record"
                    type="text"
                    value={passRecord}
                    onChange={(e) => setPassRecord(e.target.value)}
                    placeholder="e.g. Punisher / Souvlaki"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>
              </div>

              {passError && (
                <p role="alert" className="text-xs font-mono-code text-[#C92533]">
                  {passError}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] text-xs font-mono-code uppercase px-5 py-2.5 rounded-[3px] cursor-pointer"
                >
                  Stamp Local Preview Ticket
                </button>

                <a
                  href="#taste-matcher"
                  onClick={handleClosePreview}
                  className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8] underline"
                >
                  Or jump to the Taste Matcher &rarr;
                </a>
              </div>
            </form>

            {stampedPass && (
              <div
                role="status"
                className="mt-5 ticket-perforated bg-[#EAE3D5] text-[#0B0B0B] p-4 shadow-xl"
              >
                <div className="border border-[#0B0B0B] p-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                      LOCAL DEMO PASS STAMPED &bull; #{stampedPass.serial}
                    </div>
                    <div className="font-condensed font-extrabold text-xl uppercase mt-0.5">
                      HOLDER: {stampedPass.handle} (18+)
                    </div>
                    <div className="text-xs font-mono-code mt-0.5">
                      ANCHOR RECORD: &ldquo;{stampedPass.record}&rdquo;
                    </div>
                  </div>
                  <div className="text-right font-mono-code text-[9px] uppercase opacity-75">
                    LOCAL MEMORY ONLY
                    <br />
                    MUSIC &gt; LOOKS
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/assets.generated.ts">
<![CDATA[// Generated asset inventory for RIFF
export const ASSETS = {};
]]>
    </file>
    <file path="src/app/(riff)/riff/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/riff";

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
        className={`riff-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="riff-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey as keyof typeof ASSETS] as { w: number; h: number };
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
    <file path="src/app/(riff)/riff/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#0B0B0B"/>
  <rect x="6" y="6" width="52" height="52" rx="6" fill="#C92533"/>
  <rect x="14" y="24" width="6" height="16" rx="2" fill="#F4F0E8"/>
  <rect x="23" y="16" width="6" height="32" rx="2" fill="#F4F0E8"/>
  <rect x="32" y="20" width="6" height="24" rx="2" fill="#F4F0E8"/>
  <rect x="41" y="12" width="6" height="40" rx="2" fill="#F4F0E8"/>
  <circle cx="51" cy="16" r="2.5" fill="#0B0B0B"/>
</svg>
]]>
    </file>
    <file path="src/app/(riff)/riff/opengraph-image.tsx">
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
        background: "#0B0B0B",
        color: "#F4F0E8",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 32,
          letterSpacing: 2,
          color: "#C92533",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#C92533",
            color: "#F4F0E8",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          //
        </div>
        RIFF
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            color: "#F4F0E8",
          }}
        >
          Fall for the sound before the selfie.
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#AAA8A6",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          A music-first 18+ dating app that matches people through playlists, genres, favorite artists, and listening chemistry.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(244, 240, 232, 0.2)",
          paddingTop: 24,
          fontSize: 18,
          color: "#AAA8A6",
          letterSpacing: 2,
        }}
      >
        <span>MUSIC-FIRST 18+ DATING</span>
        <span style={{ color: "#C92533" }}>TASTE &gt; LOOKS</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/page.tsx">
<![CDATA['use client';

import RiffApp from './RiffApp';

export default function RiffPage() {
  return <RiffApp />;
}
]]>
    </file>
    <file path="src/app/(riff)/riff/riff.css">
<![CDATA[@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --riff-black: #0B0B0B;
  --riff-ink: #141414;
  --riff-paper: #F4F0E8;
  --riff-crimson: #C92533;
  --riff-deep-red: #741B24;
  --riff-grey: #AAA8A6;
  --riff-dim: #777575;
  --riff-rule: rgba(244, 240, 232, 0.22);
}

@layer base {
  html {
    background-color: var(--riff-black);
    color: var(--riff-paper);
    font-family: var(--font-plus-jakarta), "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--riff-black);
    color: var(--riff-paper);
    overflow-x: hidden;
  }

  /* High-visibility accessible focus rings on dark print canvas */
  *:focus-visible {
    outline: 2px solid var(--riff-crimson);
    outline-offset: 3px;
  }
}

.font-editorial {
  font-family: var(--font-bodoni-moda), "Bodoni Moda", Georgia, serif;
}

.font-condensed {
  font-family: var(--font-barlow-condensed), "Barlow Condensed", Impact, sans-serif;
}

.font-sans-ui {
  font-family: var(--font-plus-jakarta), "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
}

.font-mono-code {
  font-family: var(--font-jetbrains-mono), "JetBrains Mono", monospace;
}

/* Analog photographic grain overlay */
.riff-grain-overlay {
  background-image: url("/templates/riff/noise-tile.png");
  background-repeat: repeat;
  background-size: 160px 160px;
  opacity: 0.24;
  pointer-events: none;
}

/* Concentrated halftone dot patches matching reference corners and collage backings */
.halftone-patch {
  background-image: radial-gradient(rgba(244, 240, 232, 0.16) 1.25px, transparent 1.35px);
  background-size: 7px 7px;
}

.halftone-patch-crimson {
  background-image: radial-gradient(rgba(201, 37, 51, 0.28) 1.5px, transparent 1.6px);
  background-size: 8px 8px;
}

.halftone-patch-fine {
  background-image: radial-gradient(rgba(244, 240, 232, 0.11) 1px, transparent 1.1px);
  background-size: 5px 5px;
}

/* Torn zine edge clip paths */
.torn-paper-top {
  clip-path: polygon(
    0% 6%, 4% 2%, 9% 7%, 15% 1%, 22% 5%, 28% 0%, 35% 6%, 42% 2%,
    49% 7%, 56% 1%, 63% 5%, 71% 0%, 78% 6%, 85% 2%, 92% 7%, 97% 1%,
    100% 5%, 100% 100%, 0% 100%
  );
}

.torn-paper-strip {
  clip-path: polygon(
    0% 4%, 5% 0%, 12% 5%, 19% 1%, 27% 4%, 36% 0%, 44% 5%, 53% 1%,
    61% 4%, 70% 0%, 79% 5%, 88% 1%, 95% 4%, 100% 1%,
    99% 96%, 93% 100%, 85% 95%, 76% 99%, 67% 95%, 58% 100%,
    49% 95%, 40% 99%, 31% 95%, 22% 100%, 14% 96%, 6% 99%, 0% 95%
  );
}

/* Perforated concert ticket edge */
.ticket-perforated {
  clip-path: polygon(
    0% 6%, 3% 0%, 97% 0%, 100% 6%,
    100% 22%, 97% 26%, 100% 30%,
    100% 48%, 97% 52%, 100% 56%,
    100% 74%, 97% 78%, 100% 82%,
    100% 94%, 97% 100%, 3% 100%, 0% 94%,
    0% 82%, 3% 78%, 0% 74%,
    0% 56%, 3% 52%, 0% 48%,
    0% 30%, 3% 26%, 0% 22%
  );
}

/* Screen-print misregistration button hover */
.btn-screenprint {
  position: relative;
  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-screenprint:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0px rgba(244, 240, 232, 0.28);
}

.btn-screenprint:active {
  transform: translate(0px, 0px);
  box-shadow: 1px 1px 0px rgba(244, 240, 232, 0.2);
}

/* Slow ambient vinyl rotation */
@keyframes riff-spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-vinyl-slow {
  animation: riff-spin-slow 24s linear infinite;
}

.animate-vinyl-fast {
  animation: riff-spin-slow 3.2s linear infinite;
}

/* On-load paper-slit shutter reveal */
@keyframes paper-slit-reveal {
  0% {
    clip-path: inset(0 100% 0 0);
    transform: translateY(8px);
    opacity: 0.2;
  }
  100% {
    clip-path: inset(0 0% 0 0);
    transform: translateY(0);
    opacity: 1;
  }
}

.reveal-paper-slit-1 {
  animation: paper-slit-reveal 550ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.reveal-paper-slit-2 {
  animation: paper-slit-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both;
}

.reveal-paper-slit-3 {
  animation: paper-slit-reveal 820ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both;
}

/* Pause animations when user toggles motion off or prefers reduced motion */
.motion-paused .animate-vinyl-slow,
.motion-paused .animate-vinyl-fast {
  animation-play-state: paused !important;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-vinyl-slow,
  .animate-vinyl-fast,
  .reveal-paper-slit-1,
  .reveal-paper-slit-2,
  .reveal-paper-slit-3 {
    animation: none !important;
    clip-path: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
]]>
    </file>
    <file path="src/app/(riff)/riff/RiffApp.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ManifestoAndHowItWorks } from './components/ManifestoAndHowItWorks';
import { TasteMatcherSection } from './components/TasteMatcherSection';
import { ChemistryAndSceneSections } from './components/ChemistryAndSceneSections';
import { StoriesAndFooter } from './components/StoriesAndFooter';
import { HandStar, WaveformLogo } from './components/ZineMotifs';
import { validatePreviewPass } from './utils/matching';

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Honest Preview / Early-Access Modal State
  const [previewModalSource, setPreviewModalSource] = useState<string | null>(null);
  const [passHandle, setPassHandle] = useState<string>('');
  const [passRecord, setPassRecord] = useState<string>('');
  const [passError, setPassError] = useState<string | null>(null);
  const [stampedPass, setStampedPass] = useState<{
    handle: string;
    record: string;
    serial: string;
  } | null>(null);

  const handleOpenPreview = (source: string) => {
    setPreviewModalSource(source);
    setPassError(null);
  };

  const handleClosePreview = () => {
    setPreviewModalSource(null);
    setPassError(null);
  };

  const handleStampLocalPass = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePreviewPass(passHandle, passRecord);
    if (!check.valid) {
      setPassError(check.error || 'Please fill in both fields.');
      return;
    }
    setPassError(null);
    setStampedPass({
      handle: check.normalizedHandle || passHandle.trim(),
      record: passRecord.trim(),
      serial: `RF-${Math.floor(100000 + (passHandle.length * 7919) % 899999)}`,
    });
  };

  return (
    <div
      className={`min-h-screen bg-[#0B0B0B] text-[#F4F0E8] relative selection:bg-[#C92533] selection:text-[#F4F0E8] ${
        !motionEnabled ? 'motion-paused' : ''
      }`}
    >
      {/* Fixed Subtle Analog Grain Overlay (pointer-events-none) */}
      <div aria-hidden="true" className="riff-grain-overlay fixed inset-0 z-40" />

      {/* ====================================================================
          TOP NAVIGATION BAR (3-Zone Contract matching riff-reference.png)
         ==================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0B0B]/92 backdrop-blur-md border-b border-[#F4F0E8]/12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Drawn Waveform */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[#F4F0E8] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <WaveformLogo className="w-9 h-8" />
            <span className="font-editorial font-black text-[1.95rem] tracking-[-0.03em] leading-none">
              Riff
            </span>
          </a>

          {/* Zone 2: Spaced Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 lg:gap-11 text-[0.95rem] font-normal text-[#F4F0E8]/90"
          >
            <a
              href="#how-it-works"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Matches
            </a>
            <a
              href="#playlists"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Playlists
            </a>
            <a
              href="#stories"
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0"
            >
              Stories
            </a>
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Sign In Preview')}
              className="hover:text-[#C92533] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sign In
            </button>
          </nav>

          {/* Zone 3: Rectangular Red Primary Action ("Join Riff") */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleOpenPreview('Top Nav — Join Riff')}
              className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-[0.95rem] px-5 py-2.5 rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Riff
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 text-[#F4F0E8] border border-[#F4F0E8]/25 rounded-[3px]"
            >
              <span className="font-mono-code text-xs uppercase">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="md:hidden bg-[#141414] border-b border-[#F4F0E8]/20 px-5 py-4 flex flex-col gap-3 text-sm"
          >
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              How It Works
            </a>
            <a
              href="#taste-matcher"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Matches (Interactive Demo)
            </a>
            <a
              href="#playlists"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Playlists
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#F4F0E8] hover:text-[#C92533]"
            >
              Stories
            </a>
            <div className="pt-2 border-t border-[#F4F0E8]/15 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenPreview('Mobile Nav — Sign In Preview');
                }}
                className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8]"
              >
                Sign In (Preview)
              </button>
              <button
                type="button"
                onClick={() => setMotionEnabled((m) => !m)}
                className="text-xs font-mono-code uppercase text-[#C92533]"
              >
                {motionEnabled ? 'Pause Motion' : 'Resume Motion'}
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* ====================================================================
          MAIN EIGHT-SCENE ZINE NARRATIVE
         ==================================================================== */}
      <main>
        {/* Section A: Hero — Two phones, one chemistry */}
        <HeroSection
          motionEnabled={motionEnabled}
          onOpenPreviewModal={handleOpenPreview}
        />

        {/* Section B: Manifesto & Section C: How It Works */}
        <ManifestoAndHowItWorks />

        {/* Section D: Interactive Taste Matcher */}
        <TasteMatcherSection />

        {/* Section E: Music Chemistry & Section F: The Scene / Playlist Wall */}
        <ChemistryAndSceneSections />

        {/* Section G: Stories & Values + Section H: Final CTA & Footer */}
        <StoriesAndFooter
          motionEnabled={motionEnabled}
          onToggleMotion={() => setMotionEnabled((m) => !m)}
          onOpenPreviewModal={handleOpenPreview}
        />
      </main>

      {/* ====================================================================
          HONEST PREVIEW / EARLY ACCESS STATUS DIALOG
         ==================================================================== */}
      {previewModalSource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-[#141414] border-2 border-[#C92533] rounded-[4px] p-6 sm:p-8 text-[#F4F0E8] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F0E8]/15">
              <span className="text-xs font-mono-code uppercase text-[#C92533] font-bold">
                CONCEPT PREVIEW STATUS · {previewModalSource}
              </span>
              <button
                type="button"
                onClick={handleClosePreview}
                aria-label="Close preview dialog"
                className="px-2 py-0.5 text-sm font-mono-code text-[#AAA8A6] hover:text-[#F4F0E8] border border-transparent hover:border-[#F4F0E8]/30 rounded-[2px] cursor-pointer"
              >
                ESC / &times;
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <HandStar className="w-8 h-8 text-[#C92533] shrink-0" variant={1} />
              <h2
                id="preview-modal-title"
                className="font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]"
              >
                Riff is in interactive concept preview.
              </h2>
            </div>

            <p className="mt-3 text-sm text-[#AAA8A6] leading-relaxed">
              This experience is a live front-end product showcase for <strong className="text-[#F4F0E8]">Riff (18+)</strong>. Native iOS/Android app downloads and live server accounts are not connected yet — we never fake a download or silently send your personal details to a server.
            </p>

            {/* Local-only Backstage Pass Stamper */}
            <form onSubmit={handleStampLocalPass} className="mt-5 space-y-3">
              <div className="text-xs font-mono-code uppercase text-[#F4F0E8]">
                Stamp a local-only backstage pass (stays 100% in your browser):
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="preview-pass-handle"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    First Name or Zine Alias
                  </label>
                  <input
                    id="preview-pass-handle"
                    type="text"
                    value={passHandle}
                    onChange={(e) => setPassHandle(e.target.value)}
                    placeholder="e.g. Mila"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preview-pass-record"
                    className="block text-[11px] font-mono-code uppercase text-[#AAA8A6] mb-1"
                  >
                    Zero-Skip Album or Track
                  </label>
                  <input
                    id="preview-pass-record"
                    type="text"
                    value={passRecord}
                    onChange={(e) => setPassRecord(e.target.value)}
                    placeholder="e.g. Punisher / Souvlaki"
                    className="w-full px-3 py-2 bg-[#0B0B0B] border border-[#F4F0E8]/30 rounded-[3px] text-sm text-[#F4F0E8] placeholder:text-[#777575]"
                  />
                </div>
              </div>

              {passError && (
                <p role="alert" className="text-xs font-mono-code text-[#C92533]">
                  {passError}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] text-xs font-mono-code uppercase px-5 py-2.5 rounded-[3px] cursor-pointer"
                >
                  Stamp Local Preview Ticket
                </button>

                <a
                  href="#taste-matcher"
                  onClick={handleClosePreview}
                  className="text-xs font-mono-code uppercase text-[#AAA8A6] hover:text-[#F4F0E8] underline"
                >
                  Or jump to the Taste Matcher &rarr;
                </a>
              </div>
            </form>

            {stampedPass && (
              <div
                role="status"
                className="mt-5 ticket-perforated bg-[#EAE3D5] text-[#0B0B0B] p-4 shadow-xl"
              >
                <div className="border border-[#0B0B0B] p-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                      LOCAL DEMO PASS STAMPED &bull; #{stampedPass.serial}
                    </div>
                    <div className="font-condensed font-extrabold text-xl uppercase mt-0.5">
                      HOLDER: {stampedPass.handle} (18+)
                    </div>
                    <div className="text-xs font-mono-code mt-0.5">
                      ANCHOR RECORD: &ldquo;{stampedPass.record}&rdquo;
                    </div>
                  </div>
                  <div className="text-right font-mono-code text-[9px] uppercase opacity-75">
                    LOCAL MEMORY ONLY
                    <br />
                    MUSIC &gt; LOOKS
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/components/ChemistryAndSceneSections.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  PlaylistItem,
  SCENE_PLAYLISTS,
  filterPlaylists,
} from '../utils/matching';
import { AlbumArtGraphic, HandStar } from './ZineMotifs';

type ChemistryMode = 'records' | 'concert' | 'latenight';

interface ChemistryCase {
  id: ChemistryMode;
  label: string;
  paperBridgeTitle: string;
  paperBridgeDetail: string;
  sharedPrompt: string;
  milaScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    artVariant: PlaylistItem['artVariant'];
    bullets: string[];
    badge: string;
  };
  julianScreen: {
    header: string;
    primaryTitle: string;
    primaryMeta: string;
    artVariant: PlaylistItem['artVariant'];
    bullets: string[];
    badge: string;
  };
}

const CHEMISTRY_MODES: ChemistryCase[] = [
  {
    id: 'records',
    label: 'Favorite records',
    paperBridgeTitle: 'SHARED LP DNA // 1990s SHOEGAZE & ANALOG REVERB',
    paperBridgeDetail:
      'Both pinned heavy glide-guitar pressings in their top 3 records and prefer full-side vinyl listens.',
    sharedPrompt: '"If we only had 40 minutes before the record shop closed, which crate are you heading to first?"',
    milaScreen: {
      header: 'MILA, 24 · FAVORITE RECORDS',
      primaryTitle: 'Glass Platform (Mono LP)',
      primaryMeta: 'Velvet Escalator · Pressed on 180g crimson wax',
      artVariant: 'crimson-horizon',
      bullets: [
        'Side A: "Sodium Vapor" (zero-skip opener)',
        'Side B: "Last Overground North" (rainy walk anthem)',
        'Sleeves kept in poly outer jackets, sorted by mood',
      ],
      badge: 'CRATE ANCHOR #01',
    },
    julianScreen: {
      header: 'JULIAN, 26 · FAVORITE RECORDS',
      primaryTitle: 'Reverse Cathedral (12" EP)',
      primaryMeta: 'Pale Filament · Rough Trade white-label pressing',
      artVariant: 'tape-reel',
      bullets: [
        'Side A: "Velvet Capo" (Fender Jaguar + reverse delay)',
        'Side B: "Runout Groove Loop" (infinite locked groove)',
        'Repaired a 1984 belt-drive turntable just for this EP',
      ],
      badge: 'CRATE ANCHOR #01',
    },
  },
  {
    id: 'concert',
    label: 'Concert energy',
    paperBridgeTitle: 'MATCHED GIG RITUAL // 200-CAP ROOMS & SOUNDBOARD SPOT',
    paperBridgeDetail:
      'Neither talks during the acoustic support set; both stand ten feet in front of the mixing desk.',
    sharedPrompt: '"We both arrive for the 8:15 PM opening band — want to split a £10 basement show next Thursday?"',
    milaScreen: {
      header: 'MILA, 24 · CONCERT ENERGY',
      primaryTitle: 'Front-Left Speaker Stack',
      primaryMeta: '200-capacity basements & mid-week residencies',
      artVariant: 'basement-flyer',
      bullets: [
        'Always catches the first local support band at 8:00 PM',
        'Earplugs in coat pocket, setlist folded into phone case',
        'Will stay outside for 20 minutes talking about the drum tone',
      ],
      badge: 'GIG CADENCE: 2x / MONTH',
    },
    julianScreen: {
      header: 'JULIAN, 26 · CONCERT ENERGY',
      primaryTitle: 'Right by the Soundboard',
      primaryMeta: 'Small warehouse stages & DIY tape-release nights',
      artVariant: 'static-guitar',
      bullets: [
        'Watches the pedalboard changes between every song',
        'Buys the 7-inch or cassette directly from the merch table',
        'Never films the whole set on a bright phone screen',
      ],
      badge: 'GIG CADENCE: 3x / MONTH',
    },
  },
  {
    id: 'latenight',
    label: 'Late-night playlist',
    paperBridgeTitle: 'SYNCHRONIZED HOURS // 11:30 PM — 01:45 AM ROTATION',
    paperBridgeDetail:
      'Both switch from angular post-punk to sparse four-track indie and darkwave after midnight.',
    sharedPrompt: '"Trade me your favorite song for staring out the night-bus window at 1 A.M."',
    milaScreen: {
      header: 'MILA, 24 · AFTER MIDNIGHT MIX',
      primaryTitle: 'Songs for the N29 Night Bus',
      primaryMeta: '11 fictional demo tracks · 47 minutes · No shuffle',
      artVariant: 'rain-window',
      bullets: [
        '01. Clara Vance — "Radiator Hum in B-Flat"',
        '02. Siren & the Static — "Tremolo Letter"',
        '03. Pine & Mercury — "Voicemail from October"',
      ],
      badge: 'PEAK HOUR: 00:30 AM',
    },
    julianScreen: {
      header: 'JULIAN, 26 · AFTER MIDNIGHT MIX',
      primaryTitle: 'Sodium Streetlight Tape #09',
      primaryMeta: '10 fictional demo tracks · 51 minutes · Analog warmth',
      artVariant: 'tube-amp',
      bullets: [
        '01. Mirror Bahnhof — "Fluorescent Exit"',
        '02. Starling Engine — "Fuzz Pedal Lullaby"',
        '03. Half-Lit Windows — "Corner Bodega Tulips"',
      ],
      badge: 'PEAK HOUR: 00:45 AM',
    },
  },
];

export function ChemistryAndSceneSections() {
  const [chemistryMode, setChemistryMode] = useState<ChemistryMode>('records');
  const [moodFilter, setMoodFilter] = useState<'all' | PlaylistItem['mood']>('all');
  const [activePlaylistId, setActivePlaylistId] = useState<string>('midnight-static');
  const [questionCopiedId, setQuestionCopiedId] = useState<string | null>(null);

  const activeChemistry =
    CHEMISTRY_MODES.find((m) => m.id === chemistryMode) || CHEMISTRY_MODES[0];

  const visiblePlaylists = filterPlaylists(SCENE_PLAYLISTS, moodFilter);
  const selectedPlaylist =
    SCENE_PLAYLISTS.find((p) => p.id === activePlaylistId) ||
    visiblePlaylists[0] ||
    SCENE_PLAYLISTS[0];

  const handleCopyQuestion = (id: string, question: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(question).catch(() => {});
    }
    setQuestionCopiedId(id);
    setTimeout(() => setQuestionCopiedId(null), 2000);
  };

  return (
    <>
      {/* ====================================================================
          SECTION E: MUSIC CHEMISTRY / PHONES IN MOTION
         ==================================================================== */}
      <section
        id="music-chemistry"
        aria-label="Music chemistry dual-phone case study"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header + Mode Switcher Control Panel */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                03. MUSIC CHEMISTRY · PHONES IN MOTION CASE STUDY
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Two crates. One conversation.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-2xl">
                Switch the lens below to see how Mila (24) and Julian (26) connect across original demo records, concert habits, and late-night playlists.
              </p>
            </div>

            {/* Segmented Mode Control */}
            <div
              role="tablist"
              aria-label="Chemistry comparison dimension"
              className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 border border-[#F4F0E8]/25 rounded-[4px] self-start lg:self-end"
            >
              {CHEMISTRY_MODES.map((m) => {
                const active = m.id === chemistryMode;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setChemistryMode(m.id)}
                    className={`px-4 py-2 text-xs font-mono-code uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C92533] text-[#F4F0E8] font-bold shadow'
                        : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual Phones + Unfurling Paper Connector Strip */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Phone A: Mila, 24 */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[38px] bg-[#161619] p-3 border-2 border-[#323236] shadow-2xl transform lg:-rotate-2 transition-transform duration-300">
                <div className="rounded-[28px] bg-[#0C0C0E] p-4 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#AAA8A6] pb-2 border-b border-white/10">
                    <span>{activeChemistry.milaScreen.header}</span>
                    <span className="text-[#C92533]">DEMO DATA</span>
                  </div>

                  <div className="mt-3 h-36 rounded-xl overflow-hidden border border-white/15">
                    <AlbumArtGraphic variant={activeChemistry.milaScreen.artVariant} />
                  </div>

                  <div className="mt-3">
                    <span className="inline-block text-[10px] font-mono-code uppercase text-[#C92533]">
                      {activeChemistry.milaScreen.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#F4F0E8] mt-0.5">
                      {activeChemistry.milaScreen.primaryTitle}
                    </h3>
                    <p className="text-xs text-[#AAA8A6]">
                      {activeChemistry.milaScreen.primaryMeta}
                    </p>
                  </div>

                  <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#F4F0E8]/90">
                    {activeChemistry.milaScreen.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C92533] font-mono-code">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Center Unfurling Paper Strip Bridge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4">
              {/* SVG Ink Connector Line */}
              <svg
                viewBox="0 0 300 44"
                className="hidden lg:block w-full h-11 text-[#C92533] mb-2"
                aria-hidden="true"
              >
                <path
                  d="M4 22 C85 4, 215 40, 296 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeDasharray="6 4"
                />
                <circle cx="8" cy="22" r="4" fill="#C92533" />
                <circle cx="292" cy="22" r="4" fill="#C92533" />
              </svg>

              <div className="torn-paper-strip w-full bg-[#EFECE4] text-[#0B0B0B] p-5 sm:p-6 shadow-2xl transform -rotate-1">
                <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-2 text-[10px] font-mono-code uppercase">
                  <span className="font-bold text-[#C92533]">OVERLAP CONNECTOR</span>
                  <span>MODE: {activeChemistry.label.toUpperCase()}</span>
                </div>

                <div className="mt-2.5 font-condensed font-extrabold text-xl uppercase leading-tight">
                  {activeChemistry.paperBridgeTitle}
                </div>

                <p className="mt-2 text-xs sm:text-sm text-[#141414]/85 leading-relaxed">
                  {activeChemistry.paperBridgeDetail}
                </p>

                <div className="mt-4 p-3 bg-[#0B0B0B] text-[#F4F0E8] rounded-[2px]">
                  <div className="text-[9px] font-mono-code uppercase text-[#C92533]">
                    Instant Conversation Starter
                  </div>
                  <p className="mt-1 text-xs italic font-editorial">
                    {activeChemistry.sharedPrompt}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone B: Julian, 26 */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[330px] rounded-[38px] bg-[#161619] p-3 border-2 border-[#323236] shadow-2xl transform lg:rotate-2 transition-transform duration-300">
                <div className="rounded-[28px] bg-[#0C0C0E] p-4 border border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-[#AAA8A6] pb-2 border-b border-white/10">
                    <span>{activeChemistry.julianScreen.header}</span>
                    <span className="text-[#C92533]">DEMO DATA</span>
                  </div>

                  <div className="mt-3 h-36 rounded-xl overflow-hidden border border-white/15">
                    <AlbumArtGraphic variant={activeChemistry.julianScreen.artVariant} />
                  </div>

                  <div className="mt-3">
                    <span className="inline-block text-[10px] font-mono-code uppercase text-[#C92533]">
                      {activeChemistry.julianScreen.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#F4F0E8] mt-0.5">
                      {activeChemistry.julianScreen.primaryTitle}
                    </h3>
                    <p className="text-xs text-[#AAA8A6]">
                      {activeChemistry.julianScreen.primaryMeta}
                    </p>
                  </div>

                  <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#F4F0E8]/90">
                    {activeChemistry.julianScreen.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#C92533] font-mono-code">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION F: THE SCENE / PLAYLIST CULTURE (#playlists)
         ==================================================================== */}
      <section
        id="playlists"
        aria-label="The Scene and Playlist Culture Wall"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-fine absolute top-16 left-0 w-72 h-72 opacity-35 pointer-events-none"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header & Mood Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                04. THE SCENE · PLAYLIST &amp; FLYER CULTURE
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Playlists are the new love letters.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-xl">
                Filter the collage wall by listening mood and click any record sleeve to open its gatefold liner notes and conversation starter inline.
              </p>
            </div>

            {/* Interactive Mood Filter Buttons */}
            <div
              role="group"
              aria-label="Filter playlists by mood"
              className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 border border-[#F4F0E8]/20 rounded-[4px] self-start lg:self-end"
            >
              {(
                [
                  { id: 'all', label: 'All Scenes (6)' },
                  { id: 'shoegaze', label: 'Shoegaze' },
                  { id: 'post-punk', label: 'Post-Punk' },
                  { id: 'late-night', label: 'Late-Night' },
                  { id: 'live-basement', label: 'Live Basement' },
                ] as const
              ).map((tab) => {
                const active = moodFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMoodFilter(tab.id)}
                    aria-pressed={active}
                    className={`px-3.5 py-1.5 text-xs font-mono-code uppercase rounded-[3px] transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                        : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inline Expanding Gatefold Record Sleeve Drawer */}
          {selectedPlaylist && (
            <div className="mt-10 bg-[#141414] border-2 border-[#C92533]/75 rounded-[4px] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Sleeve Artwork */}
                <div className="lg:col-span-4">
                  <div className="aspect-square max-w-[280px] mx-auto rounded-[4px] overflow-hidden border border-[#F4F0E8]/25 shadow-2xl relative">
                    <AlbumArtGraphic variant={selectedPlaylist.artVariant} />
                  </div>
                </div>

                {/* Sleeve Liner Notes + Tracklist + Prompt */}
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#AAA8A6]">
                    <span className="text-[#C92533] font-bold uppercase">
                      OPEN GATEFOLD SLEEVE &bull; {selectedPlaylist.moodLabel}
                    </span>
                    <span>
                      {selectedPlaylist.trackCount} TRACKS &bull; {selectedPlaylist.duration}
                    </span>
                  </div>

                  <h3 className="mt-2 font-editorial font-bold text-3xl sm:text-4xl text-[#F4F0E8]">
                    {selectedPlaylist.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono-code text-[#AAA8A6]">
                    {selectedPlaylist.curator}
                  </p>

                  <p className="mt-3 text-sm sm:text-base text-[#F4F0E8]/90 leading-relaxed">
                    {selectedPlaylist.context}
                  </p>

                  {/* Fictional Tracklist */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedPlaylist.tracks.map((tr) => (
                      <div
                        key={tr.number}
                        className="p-2.5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px] flex items-center justify-between text-xs"
                      >
                        <div className="truncate pr-2">
                          <span className="font-mono-code text-[#C92533] mr-2">
                            {tr.number}.
                          </span>
                          <span className="font-semibold text-[#F4F0E8]">
                            {tr.title}
                          </span>
                          <span className="text-[#AAA8A6]"> — {tr.artist}</span>
                        </div>
                        <span className="font-mono-code text-[#777575] tabular-nums shrink-0">
                          {tr.length}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Conversation Starter Question inside Sleeve */}
                  <div className="mt-5 p-4 bg-[#0B0B0B] border border-[#F4F0E8]/20 rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono-code uppercase text-[#C92533]">
                        Attached Conversation Starter
                      </div>
                      <p className="mt-0.5 text-sm font-editorial italic text-[#F4F0E8]">
                        &ldquo;{selectedPlaylist.conversationQuestion}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyQuestion(
                          selectedPlaylist.id,
                          selectedPlaylist.conversationQuestion
                        )
                      }
                      className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {questionCopiedId === selectedPlaylist.id
                        ? 'Copied Question!'
                        : 'Copy Icebreaker'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collage Grid of Playlist Sleeves */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePlaylists.map((item) => {
              const isSelected = selectedPlaylist?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePlaylistId(item.id)}
                  aria-pressed={isSelected}
                  style={{ transform: `rotate(${item.rotationDeg * 0.45}deg)` }}
                  className={`group text-left bg-[#141414] p-5 rounded-[4px] border transition-all duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C92533] ring-1 ring-[#C92533] shadow-2xl'
                      : 'border-[#F4F0E8]/20 hover:border-[#F4F0E8]/55'
                  }`}
                >
                  <div>
                    <div className="h-48 w-full rounded-[3px] overflow-hidden border border-white/10 relative">
                      <AlbumArtGraphic variant={item.artVariant} />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono-code text-[#AAA8A6]">
                      <span>{item.moodLabel}</span>
                      <span className="tabular-nums">
                        {item.trackCount} tracks &bull; {item.duration}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-editorial font-bold text-2xl text-[#F4F0E8] group-hover:text-[#C92533] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-[#AAA8A6] leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F4F0E8]/15 flex items-center justify-between text-xs font-mono-code uppercase">
                    <span className={isSelected ? 'text-[#C92533] font-bold' : 'text-[#F4F0E8]'}>
                      {isSelected ? 'Sleeve Open Above' : 'Inspect Sleeve & Tracks'}
                    </span>
                    <HandStar className="w-5 h-5" variant={2} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/components/HeroSection.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  HandStar,
  MusicGreaterLooksScrawl,
  VinylDisc,
} from './ZineMotifs';

interface HeroSectionProps {
  motionEnabled: boolean;
  onOpenPreviewModal: (source: string) => void;
}

interface SharedTrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  thumb: string;
  icebreaker: string;
  sharedStat: string;
}

const HERO_SHARED_TRACKS: SharedTrackItem[] = [
  {
    id: 'kyoto',
    title: 'Kyoto',
    artist: 'Phoebe Bridgers',
    album: 'Punisher',
    thumb: '/templates/riff/album-kyoto.jpg',
    icebreaker: 'Ask them about "Punisher"',
    sharedStat: 'Both played after midnight 4x this week',
  },
  {
    id: 'starburster',
    title: 'Starburster',
    artist: 'Fontaines D.C.',
    album: 'Romance',
    thumb: '/templates/riff/shared-track-2.jpg',
    icebreaker: 'Ask which Fontaines D.C. opener hit hardest live',
    sharedStat: 'Top 2% overlap on Dublin post-punk',
  },
  {
    id: 'chaise',
    title: 'Chaise Longue',
    artist: 'Wet Leg',
    album: 'Wet Leg',
    thumb: '/templates/riff/shared-track-3.jpg',
    icebreaker: 'Ask about their loudest basement gig memory',
    sharedStat: 'Saved on both "Walk to the Train" playlists',
  },
];

export function HeroSection({
  motionEnabled,
  onOpenPreviewModal,
}: HeroSectionProps) {
  // Interactive state inside the two Hero phones
  const [phone1Tab, setPhone1Tab] = useState<'profile' | 'dna'>('profile');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([
    'Fontaines D.C.',
    'Wet Leg',
    'Phoebe Bridgers',
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'SHOEGAZE',
    'POST-PUNK',
    'LATE-NIGHT INDIE',
  ]);
  const [activeTrackId, setActiveTrackId] = useState<string>('kyoto');
  const [kyotoExpanded, setKyotoExpanded] = useState<boolean>(false);
  const [waveformActive, setWaveformActive] = useState<boolean>(false);
  const [vinylSide, setVinylSide] = useState<'A' | 'B'>('A');
  const [activeTicketNote, setActiveTicketNote] = useState<string | null>(null);
  const [mobilePhoneFocus, setMobilePhoneFocus] = useState<'both' | 'phone1' | 'phone2'>('both');

  // Subtle pointer counter-parallax state
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.length > 1
          ? prev.filter((a) => a !== artist)
          : prev
        : [...prev, artist]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.length > 1
          ? prev.filter((g) => g !== genre)
          : prev
        : [...prev, genre]
    );
  };

  // Deterministic demo scores derived from active selections (defaults to 94% on Phone 1 and 91% on Phone 2)
  const totalSelected = selectedArtists.length + selectedGenres.length;
  const phone1Score = 82 + totalSelected * 2; // 6 items -> 94%
  const phone2Score = 79 + totalSelected * 2; // 6 items -> 91%

  const activeSharedTrack =
    HERO_SHARED_TRACKS.find((t) => t.id === activeTrackId) || HERO_SHARED_TRACKS[0];

  const waveformHeights = [
    18, 28, 14, 34, 48, 22, 64, 38, 86, 52, 30, 74, 95, 44, 62, 82, 36, 58, 90, 42, 68, 32, 46, 24, 16,
  ];

  return (
    <section
      id="home"
      aria-label="Riff hero introduction"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative min-h-[calc(100vh-76px)] w-full overflow-hidden pt-6 pb-16 lg:py-12 border-b border-[#F4F0E8]/15"
    >
      {/* Concentrated halftone dot patches in lower-left and upper-right corners */}
      <div
        aria-hidden="true"
        className="halftone-patch absolute -bottom-12 -left-10 w-80 h-64 opacity-55 pointer-events-none rotate-6"
      />
      <div
        aria-hidden="true"
        className="halftone-patch-fine absolute top-10 right-0 w-96 h-80 opacity-45 pointer-events-none -rotate-3"
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* LEFT EDITORIAL COLUMN (~48% on desktop -> 6 cols) */}
          <div className="lg:col-span-6 z-20 flex flex-col items-start text-left pr-0 lg:pr-2">
            <h1 className="font-editorial font-black tracking-[-0.03em] leading-[0.98] text-[#F4F0E8] select-none sm:select-text">
              <span className="block text-[3.1rem] sm:text-[4.35rem] lg:text-[4.55rem] xl:text-[5.15rem] reveal-paper-slit-1">
                &ldquo;Fall for
              </span>
              <span className="block italic font-extrabold text-[#C92533] text-[3.35rem] sm:text-[4.65rem] lg:text-[4.85rem] xl:text-[5.5rem] tracking-[-0.02em] my-0.5 transform -skew-x-3 reveal-paper-slit-2">
                the sound
              </span>
              <span className="block text-[2.45rem] sm:text-[3.85rem] lg:text-[3.95rem] xl:text-[4.55rem] sm:whitespace-nowrap reveal-paper-slit-3">
                before the selfie.&rdquo;
              </span>
            </h1>

            <p className="mt-7 sm:mt-8 max-w-[34rem] text-[1.08rem] sm:text-[1.35rem] leading-[1.48] text-[#AAA8A6] font-normal">
              A music-first dating app that matches people through playlists,
              genres, favorite artists, and listening chemistry.
            </p>

            {/* Primary & Secondary Rectangular CTAs */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenPreviewModal('Hero — Download the App')}
                className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-base sm:text-[1.08rem] px-7 py-4 rounded-[4px] border border-[#C92533] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Download the App
              </button>

              <a
                href="#how-it-works"
                className="btn-screenprint bg-transparent hover:bg-[#F4F0E8]/8 text-[#F4F0E8] font-medium text-base sm:text-[1.08rem] px-7 py-4 rounded-[4px] border border-[#F4F0E8]/75 whitespace-nowrap shrink-0"
              >
                See How Matching Works
              </a>
            </div>

            {/* Feature rail matching screenshot bottom-left */}
            <div className="mt-10 sm:mt-12 pt-2 w-full">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.78rem] sm:text-[0.86rem] font-condensed tracking-[0.09em] uppercase text-[#AAA8A6]">
                <span>PLAYLIST MATCHING</span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span className="relative text-[#F4F0E8]/90">
                  TASTE COMPATIBILITY
                  <svg
                    viewBox="0 0 140 6"
                    className="absolute -bottom-1.5 left-0 w-full h-1.5 text-[#F4F0E8]/40 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 3 Q70 1 138 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span>SHARED ARTISTS</span>
                <span aria-hidden="true" className="text-[#F4F0E8]/50">
                  &bull;
                </span>
                <span>CONVERSATION STARTERS</span>
              </div>

              {/* Subtle interactive hint for screen readers & curious users */}
              <p
                className="mt-3 text-xs font-mono-code text-[#777575]"
                aria-live="polite"
              >
                Interactive demo phones: click artists, genres, or shared tracks on the devices to recalculate taste overlap ({phone1Score}% / {phone2Score}%).
              </p>
            </div>
          </div>

          {/* RIGHT COLLAGE COLUMN (~52% on desktop -> 6 cols) */}
          <div className="lg:col-span-6 relative z-10">
            {/* Mobile compact switcher so small viewports can inspect either phone cleanly */}
            <div className="flex sm:hidden items-center justify-between gap-2 mb-4 p-1.5 bg-[#141414] border border-[#F4F0E8]/20 rounded-[4px]">
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('both')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'both'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Collage View
              </button>
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('phone1')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'phone1'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Mila (94%)
              </button>
              <button
                type="button"
                onClick={() => setMobilePhoneFocus('phone2')}
                className={`flex-1 py-1.5 text-xs font-mono-code uppercase rounded-[2px] whitespace-nowrap ${
                  mobilePhoneFocus === 'phone2'
                    ? 'bg-[#C92533] text-[#F4F0E8]'
                    : 'text-[#AAA8A6]'
                }`}
              >
                Match (91%)
              </button>
            </div>

            {/* Collage Stage */}
            <div className="relative w-full min-h-[600px] sm:min-h-[690px] flex items-center justify-center">
              {/* 1. Top-Right / Center Background Vinyl peeking behind Phone 1 & 2 */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-6 left-[34%] z-0 opacity-85"
                style={{
                  transform: `translate(${pointerOffset.x * -6}px, ${pointerOffset.y * -6}px)`,
                }}
              >
                <VinylDisc className="w-44 h-44" labelSide={vinylSide} />
              </div>

              {/* 2. Left Vinyl Record with Crimson Center Label peeking behind Phone 1 */}
              <div
                className="absolute top-[41%] -left-8 sm:-left-4 z-0"
                style={{
                  transform: `translate(${pointerOffset.x * -8}px, ${pointerOffset.y * 5}px)`,
                }}
              >
                <VinylDisc
                  className="w-44 h-44 sm:w-52 sm:h-52"
                  labelSide={vinylSide}
                  interactive
                  onFlip={() => setVinylSide((s) => (s === 'A' ? 'B' : 'A'))}
                />
              </div>

              {/* 3. Hand-drawn stars matching reference positions */}
              <div className="absolute top-[3%] left-[2%] sm:left-[2%] z-20">
                <HandStar
                  className="w-9 h-9 sm:w-11 sm:h-11"
                  variant={1}
                  interactive
                  label="Pin top star sticker"
                />
              </div>
              <div className="absolute top-[11%] left-[-1%] sm:left-[-1%] z-20">
                <HandStar className="w-8 h-8 sm:w-9 sm:h-9 -rotate-12" variant={2} />
              </div>
              <div className="absolute bottom-[25%] left-[-2%] sm:left-[-1%] z-20">
                <HandStar
                  className="w-9 h-9 sm:w-10 sm:h-10 rotate-6"
                  variant={3}
                  interactive
                  label="Pin lower star sticker"
                />
              </div>

              {/* 4. Perforated Ticket Stubs (Upper Left: Red 569614 + Cream 795965757) */}
              <button
                type="button"
                onClick={() =>
                  setActiveTicketNote(
                    activeTicketNote === 'lexington'
                      ? null
                      : 'Stub #569614: Late-night shoegaze showcase @ The Lexington · Doors 9 PM'
                  )
                }
                aria-label="Inspect red concert ticket stub 569614"
                className="ticket-perforated absolute top-[20%] left-[-1%] sm:left-[0%] z-10 w-28 sm:w-32 bg-[#B8323C] text-[#141414] p-2.5 shadow-lg transform -rotate-[19deg] hover:-translate-y-1 hover:bg-[#C92533] transition-transform cursor-pointer text-left"
              >
                <div className="border border-[#141414]/40 p-1.5 flex items-center justify-between">
                  <span className="font-mono-code text-[9px] font-bold tracking-tighter [writing-mode:vertical-rl] rotate-180">
                    569614
                  </span>
                  <div className="text-right">
                    <div className="font-mono-code text-[7px] uppercase tracking-wider opacity-75">
                      ADMIT ONE
                    </div>
                    <div className="font-condensed font-extrabold text-lg leading-none tracking-wider">
                      TIC
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTicketNote(
                    activeTicketNote === 'windmill'
                      ? null
                      : 'Stub #795965757: Brixton Windmill Post-Punk All-Nighter · £8 Entry'
                  )
                }
                aria-label="Inspect cream concert ticket stub 795965757"
                className="ticket-perforated absolute top-[28%] left-[-1%] sm:left-[0%] z-10 w-28 sm:w-32 bg-[#D8C9AE] text-[#141414] p-2.5 shadow-lg transform -rotate-[14deg] hover:-translate-y-1 transition-transform cursor-pointer text-left"
              >
                <div className="border border-[#141414]/40 p-1.5 flex items-center justify-between">
                  <span className="font-mono-code text-[9px] font-bold tracking-tighter [writing-mode:vertical-rl] rotate-180">
                    795965757
                  </span>
                  <div className="text-right">
                    <div className="font-condensed font-bold text-sm leading-none">
                      TICK
                    </div>
                    <div className="font-condensed font-extrabold text-base leading-none">
                      TICKET
                    </div>
                  </div>
                </div>
              </button>

              {/* Top-center barcode ticket stub ("KICET 6000") */}
              <div
                aria-hidden="true"
                className="hidden sm:block ticket-perforated absolute top-[6%] left-[44%] z-10 w-28 bg-[#D8D3C8] text-[#141414] p-2 shadow-md transform -rotate-[18deg] select-none"
              >
                <div className="border border-[#141414]/35 p-1 flex items-center justify-between">
                  <div>
                    <div className="font-condensed font-extrabold text-sm leading-none">
                      KICET
                    </div>
                    <div className="font-mono-code text-[10px] font-bold">6000</div>
                  </div>
                  <div className="w-3 h-8 bg-[repeating-linear-gradient(0deg,#141414,#141414_1px,transparent_1px,transparent_2px)]" />
                </div>
              </div>

              {/* Lower-left pale ticket stub ("TIC T") */}
              <div
                aria-hidden="true"
                className="hidden sm:block ticket-perforated absolute bottom-[16%] left-[1%] z-10 w-24 bg-[#CFCBC2] text-[#141414] p-2 shadow-md transform -rotate-[16deg] select-none"
              >
                <div className="border border-[#141414]/35 p-1.5 text-right">
                  <div className="font-condensed font-bold text-sm leading-none">TIC</div>
                  <div className="font-condensed font-extrabold text-base leading-none">T</div>
                </div>
              </div>

              {/* Optional ticket stub note toast */}
              {activeTicketNote && (
                <div
                  role="status"
                  className="absolute top-2 left-4 z-50 bg-[#141414] border border-[#C92533] text-[#F4F0E8] px-3 py-2 text-xs font-mono-code rounded-[3px] shadow-xl max-w-xs flex items-center justify-between gap-2"
                >
                  <span>{activeTicketNote}</span>
                  <button
                    type="button"
                    onClick={() => setActiveTicketNote(null)}
                    aria-label="Close ticket note"
                    className="text-[#AAA8A6] hover:text-[#F4F0E8] px-1"
                  >
                    &times;
                  </button>
                </div>
              )}

              {/* 5. Upper-Right Handwritten "MUSIC > LOOKS" Scrawl */}
              <div className="hidden sm:block absolute top-[7%] right-[-2%] xl:right-0 z-20 w-52 transform rotate-[7deg]">
                <MusicGreaterLooksScrawl />
              </div>

              {/* 6. Right-Edge Monochrome Zine Clippings & Bottom-Right "CONCERT FLYER" */}
              <div
                aria-hidden="true"
                className="hidden xl:block absolute top-[24%] -right-8 z-0 w-36 bg-[#EAE5DC] text-[#141414] p-2 shadow-xl transform rotate-[9deg]"
              >
                <div className="h-10 flex items-center justify-center border-b border-black/20">
                  <svg viewBox="0 0 120 32" className="w-full h-7 text-[#141414]">
                    <path
                      d="M2 16 L8 12 L13 22 L18 6 L23 26 L28 10 L33 21 L39 4 L44 28 L49 11 L55 20 L61 8 L66 24 L72 13 L78 19 L84 9 L90 23 L96 14 L103 18 L118 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
                <img
                  src="/templates/riff/zine-strip-photo.jpg"
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-24 object-cover grayscale contrast-125 mt-1"
                />
              </div>

              {/* Bottom-Right CONCERT FLYER Card matching reference */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -bottom-6 -right-4 xl:-right-8 z-10 w-44 sm:w-48 bg-[#EFECE4] text-[#0B0B0B] p-2.5 shadow-2xl transform rotate-[8deg] border border-black/20 select-none"
              >
                <div className="font-condensed font-extrabold text-xl leading-none tracking-tight border-b-2 border-[#0B0B0B] pb-1">
                  MUSIC &gt; LOOKS
                </div>
                <div className="my-1.5 bg-[#0B0B0B] overflow-hidden">
                  <img
                    src="/templates/riff/zine-band-photo.jpg"
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-28 object-cover grayscale contrast-125"
                  />
                </div>
                <div className="text-center font-condensed font-extrabold text-sm leading-tight uppercase">
                  CONCERT FLYER
                </div>
                <div className="text-center font-condensed font-bold text-[11px] leading-tight uppercase border-b border-black/30 pb-1">
                  CONCERT = PODCHART
                </div>
                <div className="mt-1 text-[7px] font-mono-code leading-tight text-center uppercase opacity-75">
                  SUBTERRANEAN STAGE &bull; DOORS 21:00 &bull; NO HEADLINER EGO
                </div>
              </div>

              {/* ============================================================
                  PHONE 1 (LEFT): MILA, 24 — LIVE INTERACTIVE PROFILE UI
                 ============================================================ */}
              <div
                className={`relative z-30 w-[285px] sm:w-[295px] rounded-[42px] bg-[#161618] p-[10px] shadow-[0_28px_70px_rgba(0,0,0,0.95)] border-[2.5px] border-[#343438] transition-transform duration-300 ${
                  mobilePhoneFocus === 'phone2' ? 'hidden sm:block' : 'block'
                } ${
                  mobilePhoneFocus === 'both'
                    ? 'sm:absolute sm:top-[4%] sm:left-[6%] -rotate-[4.5deg]'
                    : 'mx-auto rotate-0'
                }`}
                style={
                  mobilePhoneFocus === 'both' && motionEnabled
                    ? {
                        transform: `rotate(-4.5deg) translate(${pointerOffset.x * 7}px, ${
                          pointerOffset.y * 5
                        }px)`,
                      }
                    : undefined
                }
              >
                {/* Inner Phone Screen */}
                <div className="w-full rounded-[33px] bg-[#0D0D0F] text-[#F4F0E8] px-4 pt-3 pb-5 overflow-hidden border border-white/5">
                  {/* iOS Status Bar + Dynamic Island */}
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-1 mb-2.5">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full border border-white/10" />
                    <div className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block w-3 h-2.5 border-b-2 border-r-2 border-white/80" />
                      <span className="inline-block w-4 h-2.5 rounded-[2px] bg-white/90" />
                    </div>
                  </div>

                  {/* Interactive Phone Mode Switcher */}
                  <div
                    role="tablist"
                    aria-label="Mila phone screen mode"
                    className="flex items-center gap-1 mb-2.5 bg-[#17171A] p-1 rounded-md border border-white/10"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={phone1Tab === 'profile'}
                      onClick={() => setPhone1Tab('profile')}
                      className={`flex-1 py-1 text-[10px] font-mono-code uppercase rounded transition-colors cursor-pointer whitespace-nowrap ${
                        phone1Tab === 'profile'
                          ? 'bg-[#C92533] text-[#F4F0E8] font-semibold'
                          : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                      }`}
                    >
                      Music Profile
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={phone1Tab === 'dna'}
                      onClick={() => setPhone1Tab('dna')}
                      className={`flex-1 py-1 text-[10px] font-mono-code uppercase rounded transition-colors cursor-pointer whitespace-nowrap ${
                        phone1Tab === 'dna'
                          ? 'bg-[#C92533] text-[#F4F0E8] font-semibold'
                          : 'text-[#AAA8A6] hover:text-[#F4F0E8]'
                      }`}
                    >
                      Listening Rituals
                    </button>
                  </div>

                  {phone1Tab === 'profile' ? (
                    <>
                      {/* Portrait Card with Grainy Monochrome Photo */}
                      <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-[#1A1A1A] border border-white/10">
                        <img
                          src="/templates/riff/mila-portrait.jpg"
                          alt="Mila, 24 monochrome analog portrait"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 font-condensed font-extrabold text-2xl tracking-wide text-[#F4F0E8]">
                          MILA, 24
                        </div>
                      </div>

                      {/* 94% MATCH Ring + Interactive Waveform */}
                      <div className="mt-3.5 flex items-center justify-between gap-3">
                        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                          <svg viewBox="0 0 68 68" className="w-full h-full -rotate-90">
                            <circle
                              cx="34"
                              cy="34"
                              r="29"
                              fill="none"
                              stroke="rgba(244,240,232,0.18)"
                              strokeWidth="3.5"
                            />
                            <circle
                              cx="34"
                              cy="34"
                              r="29"
                              fill="none"
                              stroke="#F4F0E8"
                              strokeWidth="3.5"
                              strokeDasharray={`${(phone1Score / 100) * 182} 182`}
                              strokeLinecap="round"
                            />
                            <circle
                              cx="34"
                              cy="34"
                              r="25"
                              fill="none"
                              stroke="#C92533"
                              strokeWidth="1.5"
                              opacity="0.85"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                            <span className="text-sm font-bold tabular-nums text-[#F4F0E8]">
                              {phone1Score}%
                            </span>
                            <span className="text-[8px] font-mono-code uppercase tracking-wider text-[#AAA8A6] mt-0.5">
                              MATCH
                            </span>
                          </div>
                        </div>

                        {/* Interactive SVG Waveform */}
                        <button
                          type="button"
                          onClick={() => setWaveformActive((w) => !w)}
                          aria-pressed={waveformActive}
                          aria-label="Toggle visual waveform animation preview"
                          title="Visual equalizer only (no audio autoplay)"
                          className="flex-1 h-14 px-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10 flex items-center justify-between gap-[2px] cursor-pointer transition-colors"
                        >
                          {waveformHeights.map((h, i) => {
                            const dynamicH = waveformActive
                              ? ((h * ((i % 3) + 1.2)) % 85) + 15
                              : h;
                            return (
                              <span
                                key={i}
                                style={{ height: `${dynamicH}%` }}
                                className={`w-[2px] rounded-full transition-all duration-300 ${
                                  waveformActive && i % 4 === 0
                                    ? 'bg-[#C92533]'
                                    : 'bg-[#F4F0E8]/70'
                                }`}
                              />
                            );
                          })}
                        </button>
                      </div>

                      {/* Top Artists (Interactive selection) */}
                      <div className="mt-3">
                        <div className="text-xs font-bold text-[#F4F0E8] tracking-tight">
                          Top Artists:
                        </div>
                        <div className="mt-1 flex flex-col gap-0.5">
                          {['Fontaines D.C.', 'Wet Leg', 'Phoebe Bridgers'].map((artist) => {
                            const isSelected = selectedArtists.includes(artist);
                            return (
                              <button
                                key={artist}
                                type="button"
                                onClick={() => toggleArtist(artist)}
                                aria-pressed={isSelected}
                                className={`text-left text-[13.5px] leading-snug py-0.5 px-1.5 -mx-1.5 rounded flex items-center justify-between transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'text-[#F4F0E8] font-medium hover:bg-white/5'
                                    : 'text-[#777575] line-through hover:bg-white/5'
                                }`}
                              >
                                <span>{artist}</span>
                                <span
                                  className={`text-[9px] font-mono-code uppercase ${
                                    isSelected ? 'text-[#C92533]' : 'text-[#777575]'
                                  }`}
                                >
                                  {isSelected ? 'Shared' : 'Muted'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recently Played: Kyoto */}
                      <div className="mt-3">
                        <div className="text-xs font-bold text-[#F4F0E8] tracking-tight mb-1.5">
                          Recently Played:
                        </div>
                        <button
                          type="button"
                          onClick={() => setKyotoExpanded((prev) => !prev)}
                          aria-expanded={kyotoExpanded}
                          className="w-full text-left p-2 rounded-xl bg-[#16171B] hover:bg-[#1E1F24] border border-white/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src="/templates/riff/album-kyoto.jpg"
                              alt="Kyoto single cover art"
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-md object-cover shrink-0 border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#F4F0E8] truncate">
                                  Kyoto
                                </span>
                                <span className="text-[#AAA8A6] text-xs leading-none">
                                  &bull;&bull;&bull;
                                </span>
                              </div>
                              <div className="mt-2 w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                                <div className="w-[68%] h-full bg-[#F4F0E8] rounded-full" />
                              </div>
                            </div>
                          </div>
                          {kyotoExpanded && (
                            <p className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono-code text-[#AAA8A6]">
                              Phoebe Bridgers &bull; &ldquo;Punisher&rdquo; &bull; Played 4x on late-night overground rides.
                            </p>
                          )}
                        </button>
                      </div>

                      {/* Interactive Genre Chips at Bottom of Phone 1 */}
                      <div className="mt-3 flex items-center gap-1.5 justify-between">
                        {(['SHOEGAZE', 'POST-PUNK', 'LATE-NIGHT INDIE'] as const).map(
                          (genre) => {
                            const active = selectedGenres.includes(genre);
                            return (
                              <button
                                key={genre}
                                type="button"
                                onClick={() => toggleGenre(genre)}
                                aria-pressed={active}
                                className={`px-2 py-1 rounded-full text-[8.5px] font-mono-code tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                                  active
                                    ? 'bg-[#222328] text-[#F4F0E8] border border-white/20'
                                    : 'bg-[#121215] text-[#777575] border border-white/5'
                                }`}
                              >
                                {genre}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </>
                  ) : (
                    /* Alternate tab inside Phone 1: Listening Rituals / Audio DNA */
                    <div className="py-2 space-y-3">
                      <div className="p-3 rounded-xl bg-[#151519] border border-[#C92533]/40">
                        <div className="text-[10px] font-mono-code uppercase text-[#C92533]">
                          Listening Ritual #01
                        </div>
                        <div className="text-sm font-semibold text-[#F4F0E8] mt-0.5">
                          Full-Album Midnight Walks
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-1">
                          Never shuffles an album on the first listen. Always checks who produced the drum sound.
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#151519] border border-white/10">
                        <div className="text-[10px] font-mono-code uppercase text-[#AAA8A6]">
                          Last 3 Small Gigs
                        </div>
                        <ul className="mt-1.5 space-y-1 text-xs text-[#F4F0E8]">
                          <li>1. The Windmill, Brixton (Front left)</li>
                          <li>2. Moth Club, Hackney (Sold out)</li>
                          <li>3. Rough Trade East In-Store</li>
                        </ul>
                      </div>
                      <div className="p-3 rounded-xl bg-[#151519] border border-white/10">
                        <div className="text-[10px] font-mono-code uppercase text-[#AAA8A6]">
                          Record Crate Prompt
                        </div>
                        <p className="text-xs italic text-[#F4F0E8] mt-1">
                          &ldquo;Tell me the one B-side you defend with your life.&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ============================================================
                  PHONE 2 (RIGHT): YOU MATCHED THROUGH MUSIC TASTE (91%)
                 ============================================================ */}
              <div
                className={`relative z-20 w-[290px] sm:w-[305px] rounded-[42px] bg-[#161618] p-[10px] shadow-[0_32px_80px_rgba(0,0,0,0.95)] border-[2.5px] border-[#343438] transition-transform duration-300 ${
                  mobilePhoneFocus === 'phone1' ? 'hidden sm:block' : 'block'
                } ${
                  mobilePhoneFocus === 'both'
                    ? 'mt-6 sm:mt-0 sm:absolute sm:top-[16%] sm:right-[3%] rotate-[6.5deg]'
                    : 'mx-auto rotate-0'
                }`}
                style={
                  mobilePhoneFocus === 'both' && motionEnabled
                    ? {
                        transform: `rotate(6.5deg) translate(${pointerOffset.x * -8}px, ${
                          pointerOffset.y * -5
                        }px)`,
                      }
                    : undefined
                }
              >
                <div className="w-full rounded-[33px] bg-[#0D0D0F] text-[#F4F0E8] px-4 pt-3 pb-5 overflow-hidden border border-white/5">
                  {/* iOS Status Bar + Dynamic Island */}
                  <div className="flex items-center justify-between text-[11px] font-semibold tracking-tight px-1 mb-3">
                    <span>9:41</span>
                    <div className="w-20 h-4 bg-black rounded-full border border-white/10" />
                    <div className="flex items-center gap-1" aria-hidden="true">
                      <span className="inline-block w-3 h-2.5 border-b-2 border-r-2 border-white/80" />
                      <span className="inline-block w-4 h-2.5 rounded-[2px] bg-white/90" />
                    </div>
                  </div>

                  {/* Header: YOU MATCHED THROUGH MUSIC TASTE */}
                  <div className="text-center mt-1">
                    <div className="font-condensed font-extrabold text-[1.45rem] leading-[1.03] tracking-wide uppercase text-[#F4F0E8]">
                      YOU MATCHED
                      <br />
                      THROUGH MUSIC
                      <br />
                      TASTE
                    </div>

                    {/* Big 91% Compatibility readout */}
                    <div className="mt-3 font-sans-ui font-extrabold text-[3.35rem] leading-none tracking-tight text-[#F4F0E8] tabular-nums">
                      {phone2Score}%
                    </div>
                    <div className="mt-1 text-sm text-[#AAA8A6] font-normal">
                      Compatibility
                    </div>
                  </div>

                  {/* Three Overlapping Circular Artwork Bubbles + Red Vertical Stem Accents */}
                  <div className="relative h-32 mt-3 flex items-center justify-center">
                    {/* Vertical sound-stem bars rising behind circles matching screenshot */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-6 left-6 w-[2px] h-16 bg-gradient-to-b from-transparent to-[#F4F0E8]/35"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -top-8 right-5 w-[2.5px] h-20 bg-gradient-to-b from-transparent to-[#C92533]"
                    />

                    {/* Left Circle */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F4F0E8]/40 shadow-lg -mr-5 z-10 bg-[#18181B]">
                      <img
                        src="/templates/riff/match-art-1.jpg"
                        alt="Shared artist sleeve left"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Center Circle (Crimson Border Ring) */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#C92533] shadow-2xl z-20 bg-[#121215]">
                      <img
                        src="/templates/riff/match-art-2.jpg"
                        alt="Shared artist sleeve center"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Right Circle (Vinyl Texture) */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-white/25 shadow-lg -ml-5 z-10 bg-[#0B0B0B] flex items-center justify-center">
                      <VinylDisc className="w-20 h-20" />
                    </div>
                  </div>

                  {/* Your Shared Tracks (Interactive selector) */}
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-[#F4F0E8] mb-2">
                      Your Shared Tracks
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {HERO_SHARED_TRACKS.map((track) => {
                        const isCurrent = track.id === activeSharedTrack.id;
                        return (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => setActiveTrackId(track.id)}
                            aria-pressed={isCurrent}
                            className={`group relative rounded-lg overflow-hidden h-14 border transition-all cursor-pointer ${
                              isCurrent
                                ? 'border-[#C92533] ring-1 ring-[#C92533] scale-[1.03]'
                                : 'border-white/10 opacity-75 hover:opacity-100'
                            }`}
                            title={`${track.title} — ${track.artist}`}
                          >
                            <img
                              src={track.thumb}
                              alt={`${track.title} by ${track.artist}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <span className="absolute bottom-1 left-1 right-1 text-[8px] font-mono-code text-[#F4F0E8] truncate">
                              {track.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Break the ice prompt box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#17181C] border border-white/10 text-center">
                    <div className="text-[11px] font-bold text-[#F4F0E8]">
                      Break the ice:
                    </div>
                    <div className="text-xs text-[#AAA8A6] mt-0.5">
                      {activeSharedTrack.icebreaker}
                    </div>
                    <div className="text-[9px] font-mono-code text-[#C92533] mt-1">
                      {activeSharedTrack.sharedStat}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Collage Scribble: "MUSIC > ||||||||" below Phone 1 */}
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute bottom-2 left-[14%] z-20 items-center gap-3 opacity-85 pointer-events-none select-none"
              >
                <span className="font-condensed font-light text-2xl tracking-widest text-[#F4F0E8]/85 italic">
                  MUSIC &gt;
                </span>
                <svg viewBox="0 0 110 36" className="w-28 h-9 text-[#F4F0E8]/80">
                  <path
                    d="M2 18 L8 15 L12 24 L16 8 L20 29 L24 6 L28 31 L33 11 L37 26 L42 4 L46 33 L51 12 L55 25 L60 9 L65 28 L70 13 L75 23 L80 10 L85 26 L90 15 L96 21 L108 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
    <file path="src/app/(riff)/riff/components/ManifestoAndHowItWorks.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { HandStar, MusicGreaterLooksScrawl } from './ZineMotifs';

interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  shortLine: string;
  expandedDetail: string;
  zineNote: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'taste-first',
    number: '01.',
    title: 'Taste first',
    shortLine: 'Profiles open with your rotation, last three gigs, and desert-island records — never a full-screen selfie carousel.',
    expandedDetail:
      'Photos stay softly tucked inside a secondary sleeve until you have actually read what someone listens to at 1 A.M. You never swipe on a face in isolation.',
    zineNote: 'NO EGO SWIPING · CRATE BEFORE CAMERA',
  },
  {
    id: 'connection-second',
    number: '02.',
    title: 'Connection second',
    shortLine: 'Every match comes with a real reason you overlapped and a specific track or album memory to break the ice.',
    expandedDetail:
      'Instead of "hey, how was your weekend?", Riff highlights the exact post-punk B-side, shoegaze pedal tone, or late-night playlist habit you share.',
    zineNote: 'ZERO DEAD OPENERS · SONG-LED PROMPTS',
  },
  {
    id: 'meet-when-ready',
    number: '03.',
    title: 'Meet when ready',
    shortLine: 'Trade a three-song mini-mix, talk about a record sleeve, and suggest catching a local support band when the vibe clicks.',
    expandedDetail:
      'Designed for 18+ music lovers who prefer low-pressure coffee near a record shop or a £10 basement gig over high-stakes dinner interviews.',
    zineNote: '18+ COMMUNITY · RESPECTFUL PACE',
  },
];

interface TrackStep {
  index: number;
  trackCode: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  ticketStamp: string;
  ticketSerial: string;
  previewChips: string[];
  sampleOutput: string;
}

const HOW_IT_WORKS_STEPS: TrackStep[] = [
  {
    index: 0,
    trackCode: 'TRACK 01 / SIDE A',
    duration: '0:00 — 1:18',
    title: 'Drop your favorites',
    subtitle: 'Choose genres, artists, and listening moods.',
    description:
      'Build your sonic liner notes in two minutes: pick your core scenes (from shoegaze and post-punk to alt folk and darkwave), pin three records you never skip, and tag how you actually listen.',
    ticketStamp: 'STATION 01 · PRESSING PLANT',
    ticketSerial: 'RF-010184',
    previewChips: ['Shoegaze', 'Post-Punk', 'Fontaines D.C.', 'Night Drives', 'Vinyl Crate'],
    sampleOutput: 'Crate logged: 4 core scenes · 3 anchor artists · 2 nocturnal rituals',
  },
  {
    index: 1,
    trackCode: 'TRACK 02 / SIDE A',
    duration: '1:19 — 2:44',
    title: 'Find your overlap',
    subtitle: 'See shared interests and why a pairing might click.',
    description:
      'Riff maps where your crates intersect — not with a mysterious black-box romance score, but by surfacing shared artists, mutual sub-genres, and compatible concert energy.',
    ticketStamp: 'STATION 02 · SOUNDCHECK OVERLAP',
    ticketSerial: 'RF-020910',
    previewChips: ['91% Taste Overlap', 'Shared: Phoebe Bridgers', 'Both love 200-cap gigs'],
    sampleOutput: 'Overlap found: 3 shared artists + mutual late-night album listening habit',
  },
  {
    index: 2,
    trackCode: 'TRACK 03 / SIDE B',
    duration: '2:45 — 4:02',
    title: 'Start a conversation',
    subtitle: 'Use real prompts about a song or memory.',
    description:
      'Skip the small talk. Tap any shared track or album sleeve to send a specific music question — like asking which song on "Punisher" they play on rainy train rides home.',
    ticketStamp: 'STATION 03 · FRONT BARRIER HELLO',
    ticketSerial: 'RF-030442',
    previewChips: ['Ask about "Punisher"', 'Trade a 3-song mix', 'Compare first gigs'],
    sampleOutput: 'Icebreaker queued: "Which track on Souvlaki do you play loudest?"',
  },
];

export function ManifestoAndHowItWorks() {
  const [expandedPrinciples, setExpandedPrinciples] = useState<string[]>(['taste-first']);
  const [revealSongQuote, setRevealSongQuote] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const togglePrinciple = (id: string) => {
    setExpandedPrinciples((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentTrack = HOW_IT_WORKS_STEPS[activeStepIndex];
  const progressPercent = ((activeStepIndex + 1) / HOW_IT_WORKS_STEPS.length) * 100;

  return (
    <>
      {/* ====================================================================
          SECTION B: MANIFESTO — MUSIC BEFORE LOOKS
         ==================================================================== */}
      <section
        id="manifesto"
        aria-label="Riff Manifesto: Music before looks"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-crimson absolute top-12 left-6 w-64 h-48 opacity-40 pointer-events-none -rotate-6"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Zine Issue Header Line */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F4F0E8]/20">
            <div className="flex items-center gap-3 text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
              <span>ISSUE 01 · EDITORIAL MANIFESTO</span>
              <span aria-hidden="true">&bull;</span>
              <span className="text-[#C92533]">SOUND OVER SELFIE</span>
            </div>
            <div className="w-40">
              <MusicGreaterLooksScrawl showUnderline={false} />
            </div>
          </div>

          {/* Wheat-Pasted Torn Poster Statement */}
          <div className="mt-12 lg:mt-16 relative">
            <div className="space-y-3 sm:space-y-4">
              {/* Strip 1 */}
              <div className="inline-block torn-paper-strip bg-[#F4F0E8] text-[#0B0B0B] px-5 sm:px-8 py-2.5 sm:py-3 transform -rotate-[1.1deg] shadow-xl">
                <span className="font-condensed font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase">
                  THERE&rsquo;S MORE TO A PERSON
                </span>
              </div>

              <br />

              {/* Strip 2 */}
              <div className="inline-block torn-paper-strip bg-[#C92533] text-[#F4F0E8] px-5 sm:px-8 py-2.5 sm:py-4 transform rotate-[0.9deg] shadow-xl sm:ml-10">
                <span className="font-editorial italic font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
                  THAN A PHOTO.
                </span>
              </div>
            </div>

            {/* Pull-apart interactive reveal banner: "A shared song is a better hello." */}
            <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-[#141414] border border-[#F4F0E8]/20 rounded-[4px] relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <HandStar className="w-10 h-10 shrink-0 text-[#C92533]" variant={2} />
                  <div>
                    <div className="text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
                      The Riff Premise
                    </div>
                    <p className="mt-1 font-editorial italic text-2xl sm:text-4xl text-[#F4F0E8]">
                      &ldquo;A shared song is a better hello.&rdquo;
                    </p>
                    {revealSongQuote && (
                      <p className="mt-2 text-sm sm:text-base text-[#AAA8A6] max-w-2xl">
                        Swiping through silent headshots tells you who has good lighting. Seeing someone&rsquo;s 2 A.M. shoegaze playlist, favorite small venue, and desert-island LP tells you what it actually feels like to sit next to them on the night train.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRevealSongQuote((prev) => !prev)}
                  aria-expanded={revealSongQuote}
                  className="self-start md:self-center px-4 py-2 text-xs font-mono-code uppercase tracking-wider border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#C92533] hover:text-[#C92533] rounded-[3px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {revealSongQuote ? 'Fold Liner Notes' : 'Read Liner Notes'}
                </button>
              </div>
            </div>
          </div>

          {/* 3 Product Principles with Expand-in-Place Reveals */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((item) => {
              const isExpanded = expandedPrinciples.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-7 rounded-[4px] flex flex-col justify-between transition-colors hover:border-[#F4F0E8]/45"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code text-[#AAA8A6]">
                      <span className="text-[#C92533] font-semibold">{item.number}</span>
                      <span>{item.zineNote}</span>
                    </div>

                    <h2 className="mt-3 font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base text-[#AAA8A6] leading-relaxed">
                      {item.shortLine}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#F4F0E8]/15 text-sm text-[#F4F0E8]/90 leading-relaxed">
                        {item.expandedDetail}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => togglePrinciple(item.id)}
                    aria-expanded={isExpanded}
                    className="mt-6 pt-3 border-t border-[#F4F0E8]/10 flex items-center justify-between w-full text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8] hover:text-[#C92533] transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse Principle' : 'Expand Principle'}</span>
                    <span aria-hidden="true" className="text-base leading-none">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION C: HOW IT WORKS — THE FIRST THREE TRACKS
         ==================================================================== */}
      <section
        id="how-it-works"
        aria-label="How Riff matching works in three tracks"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
                01. HOW MATCHING WORKS · THE FIRST THREE TRACKS
              </div>
              <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
                Less swipe. More soundtrack.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#AAA8A6] max-w-md">
              Click any track station below or scrub the groove rail to pass the ticket stub from crate curation to your first conversation.
            </p>
          </div>

          {/* Music-Player Progress Rail & Animated Groove */}
          <div className="mt-10 bg-[#141414] border border-[#F4F0E8]/20 p-5 sm:p-7 rounded-[4px]">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-[#AAA8A6] mb-3">
              <span>PLAYHEAD: {currentTrack.trackCode}</span>
              <span className="tabular-nums">{currentTrack.duration}</span>
            </div>

            {/* Interactive SVG Groove Waveform Progress Bar */}
            <div className="relative h-12 flex items-center">
              <div className="w-full h-1.5 bg-[#0B0B0B] border border-[#F4F0E8]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C92533] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Station Nodes on the Rail */}
              <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-8 pointer-events-none">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const reached = step.index <= activeStepIndex;
                  const isCurrent = step.index === activeStepIndex;
                  return (
                    <button
                      key={step.trackCode}
                      type="button"
                      onClick={() => setActiveStepIndex(step.index)}
                      aria-label={`Jump to ${step.title}`}
                      className={`pointer-events-auto px-3 py-1.5 rounded-[3px] text-xs font-mono-code uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap ${
                        isCurrent
                          ? 'bg-[#C92533] text-[#F4F0E8] border-[#F4F0E8] scale-105 shadow-lg'
                          : reached
                          ? 'bg-[#1D1D20] text-[#F4F0E8] border-[#C92533]/60'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border-[#F4F0E8]/25 hover:border-[#F4F0E8]/60'
                      }`}
                    >
                      0{step.index + 1}. {step.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Traveling Paper Ticket Pass + Active Station Breakdown */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 5 Cols: Travelling Perforated Paper Ticket */}
              <div className="lg:col-span-5 flex items-center justify-center bg-[#0B0B0B] border border-[#F4F0E8]/15 p-6 rounded-[4px] relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="halftone-patch absolute inset-0 opacity-25 pointer-events-none"
                />

                <div
                  className="ticket-perforated relative z-10 w-full max-w-sm bg-[#EAE3D5] text-[#0B0B0B] p-5 shadow-2xl transition-transform duration-300"
                  style={{
                    transform: `rotate(${
                      activeStepIndex === 0 ? '-2deg' : activeStepIndex === 1 ? '1.5deg' : '-1deg'
                    })`,
                  }}
                >
                  <div className="border-2 border-[#0B0B0B] p-4">
                    <div className="flex items-center justify-between border-b border-[#0B0B0B]/40 pb-2 text-[10px] font-mono-code uppercase">
                      <span className="font-bold">{currentTrack.ticketStamp}</span>
                      <span>#{currentTrack.ticketSerial}</span>
                    </div>

                    <div className="mt-3 font-condensed font-extrabold text-3xl uppercase leading-none tracking-tight">
                      0{currentTrack.index + 1}. {currentTrack.title}
                    </div>

                    <p className="mt-1.5 text-xs font-medium text-[#141414]/80">
                      {currentTrack.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {currentTrack.previewChips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-0.5 bg-[#0B0B0B] text-[#F4F0E8] text-[10px] font-mono-code uppercase"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-2 border-t border-dashed border-[#0B0B0B]/50 flex items-center justify-between text-[10px] font-mono-code">
                      <span className="text-[#C92533] font-bold">ADMIT TWO · 18+</span>
                      <span>MUSIC &gt; LOOKS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Station Details & Step Controls */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#0B0B0B] border border-[#F4F0E8]/15 p-6 sm:p-8 rounded-[4px]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono-code uppercase text-[#C92533]">
                      {currentTrack.trackCode}
                    </span>
                    <span className="text-xs font-mono-code text-[#AAA8A6] tabular-nums">
                      STEP {currentTrack.index + 1} OF 3
                    </span>
                  </div>

                  <h3 className="mt-2 font-editorial font-bold text-2xl sm:text-4xl text-[#F4F0E8]">
                    {currentTrack.title}
                  </h3>

                  <p className="mt-3 text-base text-[#AAA8A6] leading-relaxed">
                    {currentTrack.description}
                  </p>

                  <div className="mt-6 p-4 bg-[#141414] border border-[#F4F0E8]/15 rounded-[3px]">
                    <div className="text-[11px] font-mono-code uppercase text-[#AAA8A6]">
                      Live Station Output
                    </div>
                    <div className="mt-1 text-sm font-mono-code text-[#F4F0E8]">
                      {currentTrack.sampleOutput}
                    </div>
                  </div>
                </div>

                {/* Previous / Next Track Controls */}
                <div className="mt-8 pt-4 border-t border-[#F4F0E8]/15 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((i) => (i > 0 ? i - 1 : HOW_IT_WORKS_STEPS.length - 1))}
                    className="px-4 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/30 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    &larr; Previous Track
                  </button>

                  <div className="flex items-center gap-2">
                    {HOW_IT_WORKS_STEPS.map((s) => (
                      <button
                        key={s.index}
                        type="button"
                        onClick={() => setActiveStepIndex(s.index)}
                        aria-label={`Select Track 0${s.index + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                          s.index === activeStepIndex ? 'bg-[#C92533]' : 'bg-[#F4F0E8]/25'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((i) => (i + 1) % HOW_IT_WORKS_STEPS.length)}
                    className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Next Track &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/components/StoriesAndFooter.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  HandStar,
  MusicGreaterLooksScrawl,
  VinylDisc,
  WaveformLogo,
} from './ZineMotifs';

interface StoriesAndFooterProps {
  motionEnabled: boolean;
  onToggleMotion: () => void;
  onOpenPreviewModal: (source: string) => void;
}

interface ZineVignette {
  id: string;
  issueTag: string;
  headline: string;
  names: string;
  sharedAnchor: string;
  storyBody: string;
  quote: string;
  footnote: string;
}

const FICTIONAL_VIGNETTES: ZineVignette[] = [
  {
    id: 'vignette-1',
    issueTag: 'ILLUSTRATIVE VIGNETTE #01 · FICTIONAL SCENARIO',
    headline: 'Two copies of the same Japanese pressing in a Dalston basement.',
    names: 'Mila (24) & Julian (26) · East London',
    sharedAnchor: 'Matched via: Slowdive — Souvlaki (1993) + 200-cap venue habit',
    storyBody:
      'Instead of spending three weeks texting "how was your Tuesday?", they realized they had both queued the same four-track shoegaze B-side after midnight. Their first meet-up was a £9 support-band showcase where they stood ten feet in front of the soundboard and traded cassette recs between sets.',
    quote:
      '"When you already know someone can sit through a seven-minute instrumental outro without checking their phone, the first coffee is effortless."',
    footnote: 'Editorial scenario illustrating Riff’s song-first prompt flow.',
  },
  {
    id: 'vignette-2',
    issueTag: 'ILLUSTRATIVE VIGNETTE #02 · FICTIONAL SCENARIO',
    headline: 'A shared playlist for the 11:40 PM train home.',
    names: 'Sora (23) & Elena (25) · Chicago',
    sharedAnchor: 'Matched via: Wednesday — Rat Saw God + Late-Night Headphones',
    storyBody:
      'Neither wanted a high-pressure bar date. They used Riff’s three-song trade prompt to build a 14-minute mini-mix for their respective late-night train commutes, then met on a Sunday afternoon to dig through the $3 7-inch bins at Reckless Records.',
    quote:
      '"Seeing someone’s honest listening habits felt ten times more personal than five curated vacation photos."',
    footnote: 'Editorial scenario illustrating Riff’s crate-before-selfie design.',
  },
  {
    id: 'vignette-3',
    issueTag: 'ILLUSTRATIVE VIGNETTE #03 · FICTIONAL SCENARIO',
    headline: 'Standing on the same side of the amp stack.',
    names: 'Deon (28) & Ren (27) · Berlin',
    sharedAnchor: 'Matched via: Boy Harsher + Darkwave / Vinyl Crate Digging',
    storyBody:
      'They overlapped at 93% on nocturnal synth-punk and post-punk basslines. The icebreaker prompt asked which record stays permanently on their turntable — turning what is usually an awkward first message into a two-hour conversation about drum machines.',
    quote:
      '"A shared song is a better hello. We skipped the small talk entirely."',
    footnote: 'Editorial scenario illustrating Riff’s icebreaker engine.',
  },
];

export function StoriesAndFooter({
  motionEnabled,
  onToggleMotion,
  onOpenPreviewModal,
}: StoriesAndFooterProps) {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [footerVinylSide, setFooterVinylSide] = useState<'A' | 'B'>('A');

  const activeStory = FICTIONAL_VIGNETTES[slideIndex];

  const handlePrevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? FICTIONAL_VIGNETTES.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % FICTIONAL_VIGNETTES.length);
  };

  return (
    <>
      {/* ====================================================================
          SECTION G: STORIES & VALUES (#stories)
         ==================================================================== */}
      <section
        id="stories"
        aria-label="Zine Stories and 18+ Community Values"
        className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Faux-Negative Film Strip Header */}
          <div className="mb-10 bg-[#141414] border-y-2 border-dashed border-[#F4F0E8]/25 py-2.5 px-4 flex items-center justify-between text-[11px] font-mono-code uppercase tracking-widest text-[#AAA8A6] overflow-x-auto whitespace-nowrap gap-8">
            <span>35MM CONTACT SHEET &bull; FRAME 24A</span>
            <span className="text-[#C92533]">ILLUSTRATIVE STORIES (FICTIONAL DEMO SCENARIOS)</span>
            <span>NO FABRICATED ENDORSEMENTS</span>
            <span>18+ ADULT MUSIC COMMUNITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Interactive Zine Article Vignette Carousel */}
            <div className="lg:col-span-7 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-9 rounded-[4px] relative">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F4F0E8]/15">
                <span className="text-xs font-mono-code uppercase text-[#C92533]">
                  {activeStory.issueTag}
                </span>
                <span
                  className="text-xs font-mono-code text-[#AAA8A6] tabular-nums"
                  aria-live="polite"
                >
                  SLIDE {slideIndex + 1} OF {FICTIONAL_VIGNETTES.length}
                </span>
              </div>

              <h2 className="mt-5 font-editorial font-bold text-2xl sm:text-4xl text-[#F4F0E8] leading-tight">
                {activeStory.headline}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#AAA8A6]">
                <span className="text-[#F4F0E8] font-semibold">{activeStory.names}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{activeStory.sharedAnchor}</span>
              </div>

              <p className="mt-5 text-base text-[#AAA8A6] leading-relaxed">
                {activeStory.storyBody}
              </p>

              <blockquote className="mt-6 p-5 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px] font-editorial italic text-lg sm:text-xl text-[#F4F0E8]">
                {activeStory.quote}
              </blockquote>

              <p className="mt-3 text-[11px] font-mono-code text-[#777575]">
                * {activeStory.footnote}
              </p>

              {/* Carousel Controls */}
              <div className="mt-7 pt-5 border-t border-[#F4F0E8]/15 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous story vignette"
                  className="px-4 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  &larr; Prev Story
                </button>

                <div className="flex items-center gap-2" role="tablist" aria-label="Story slides">
                  {FICTIONAL_VIGNETTES.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      role="tab"
                      aria-selected={i === slideIndex}
                      aria-label={`View story ${i + 1}`}
                      onClick={() => setSlideIndex(i)}
                      className={`px-2.5 py-1 text-xs font-mono-code rounded-[2px] cursor-pointer ${
                        i === slideIndex
                          ? 'bg-[#C92533] text-[#F4F0E8] font-bold'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border border-[#F4F0E8]/20'
                      }`}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next story vignette"
                  className="px-4 py-2 text-xs font-mono-code uppercase bg-[#C92533] text-[#F4F0E8] hover:bg-[#b51f2c] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Next Story &rarr;
                </button>
              </div>
            </div>

            {/* Right 5 Cols: 18+ Safety, Consent & Proposed Architecture */}
            <div className="lg:col-span-5 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C92533]">
                  COMMUNITY STANDARDS &amp; SAFETY
                </span>
                <span className="px-2 py-0.5 bg-[#0B0B0B] border border-[#F4F0E8]/30 text-[11px] font-mono-code text-[#F4F0E8]">
                  STRICTLY 18+
                </span>
              </div>

              <h3 className="mt-3 font-editorial font-bold text-2xl sm:text-3xl text-[#F4F0E8]">
                Built for music heads, not gatekeepers.
              </h3>

              <p className="mt-2.5 text-sm text-[#AAA8A6] leading-relaxed">
                Whether you know every shoegaze pedal setting or just found your first post-punk playlist last week, Riff is a welcoming 18+ space built on consent, curiosity, and zero snobbery.
              </p>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#F4F0E8] font-semibold">
                    1. Taste Before Portrait Privacy (Proposed App Feature)
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    In the proposed native Riff product, portraits remain secondary until both people choose to connect over shared artists or prompts.
                  </p>
                </div>

                <div className="p-4 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#F4F0E8] font-semibold">
                    2. One-Tap Block, Report &amp; Venue Safety (Proposed App Feature)
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    Proposed product controls include instant unmatch/block, human-reviewed harassment reporting, and never exposing live GPS venue check-ins.
                  </p>
                </div>

                <div className="p-4 bg-[#0B0B0B] border border-[#C92533]/45 rounded-[3px]">
                  <div className="text-xs font-mono-code uppercase text-[#C92533] font-semibold">
                    3. Honest Web Demo Privacy
                  </div>
                  <p className="mt-1 text-xs text-[#AAA8A6] leading-relaxed">
                    This marketing site is a standalone front-end product preview. We never collect personal data, never require a real login, and keep your Taste Matcher selections in local memory only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION H: FINAL CTA + RECORD SLEEVE FOOTER
         ==================================================================== */}
      <section
        aria-label="Join the Riff final call to action"
        className="relative py-24 lg:py-32 border-b border-[#F4F0E8]/20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="halftone-patch-crimson absolute -bottom-10 right-10 w-96 h-72 opacity-40 pointer-events-none"
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono-code uppercase tracking-widest text-[#AAA8A6]">
                <HandStar className="w-7 h-7 text-[#C92533]" variant={3} />
                <span>SIDE B · RUNOUT GROOVE</span>
              </div>

              <h2 className="mt-4 font-editorial font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-[#F4F0E8] text-balance">
                YOUR NEXT FAVORITE PERSON MIGHT HAVE{' '}
                <span className="italic text-[#C92533]">
                  YOUR NEXT FAVORITE SONG.
                </span>
              </h2>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenPreviewModal('Final CTA — Join the Riff')}
                  className="btn-screenprint bg-[#C92533] hover:bg-[#b51f2c] text-[#F4F0E8] font-medium text-base sm:text-lg px-8 py-4 rounded-[4px] border border-[#C92533] cursor-pointer whitespace-nowrap"
                >
                  Join the Riff
                </button>

                <a
                  href="#taste-matcher"
                  className="btn-screenprint bg-transparent hover:bg-[#F4F0E8]/8 text-[#F4F0E8] font-medium text-base sm:text-lg px-7 py-4 rounded-[4px] border border-[#F4F0E8]/75 whitespace-nowrap"
                >
                  Explore the Match Demo
                </a>
              </div>
            </div>

            {/* Large Slow-Turning Red-Label Vinyl Punctuation */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <VinylDisc
                className="w-64 h-64 sm:w-72 sm:h-72"
                labelSide={footerVinylSide}
                interactive
                onFlip={() =>
                  setFooterVinylSide((s) => (s === 'A' ? 'B' : 'A'))
                }
              />
              <span className="mt-3 text-xs font-mono-code text-[#AAA8A6] uppercase">
                Click vinyl to flip label (Side {footerVinylSide})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Record Sleeve Footer */}
      <footer className="bg-[#0B0B0B] py-12 text-xs font-mono-code text-[#AAA8A6]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#F4F0E8]/15">
            {/* Brand Lockup */}
            <div className="flex items-center gap-4">
              <a
                href="#home"
                className="flex items-center gap-2.5 text-[#F4F0E8] hover:opacity-90"
              >
                <WaveformLogo className="w-8 h-7" />
                <span className="font-editorial font-black text-2xl tracking-tight">
                  Riff
                </span>
              </a>
              <span className="text-[#777575]">|</span>
              <div className="w-32">
                <MusicGreaterLooksScrawl showUnderline={false} />
              </div>
            </div>

            {/* Working Anchor Links + Motion Control */}
            <div className="flex flex-wrap items-center gap-6">
              <a href="#how-it-works" className="hover:text-[#F4F0E8] transition-colors">
                How It Works
              </a>
              <a href="#taste-matcher" className="hover:text-[#F4F0E8] transition-colors">
                Matches
              </a>
              <a href="#playlists" className="hover:text-[#F4F0E8] transition-colors">
                Playlists
              </a>
              <a href="#stories" className="hover:text-[#F4F0E8] transition-colors">
                Stories
              </a>
              <button
                type="button"
                onClick={onToggleMotion}
                aria-pressed={!motionEnabled}
                className="px-3 py-1.5 border border-[#F4F0E8]/25 rounded-[3px] text-[#F4F0E8] hover:border-[#C92533] transition-colors cursor-pointer whitespace-nowrap"
              >
                {motionEnabled ? 'Pause Ambient Motion' : 'Resume Ambient Motion'}
              </button>
              <a
                href="#home"
                className="px-3 py-1.5 bg-[#141414] border border-[#F4F0E8]/25 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] whitespace-nowrap"
              >
                BACK TO THE TOP &#8599;
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#777575]">
            <p>
              &copy; {new Date().getFullYear()} RIFF PRESSING CO. · 18+ MUSIC-FIRST DATING CONCEPT DEMO · ALL ARTISTS &amp; SCENARIOS ILLUSTRATIVE.
            </p>
            <p className="text-[#AAA8A6]">
              FALL FOR THE SOUND BEFORE THE SELFIE.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/components/TasteMatcherSection.tsx">
<![CDATA['use client';

import React, { useEffect, useState } from 'react';
import {
  ALL_GENRES,
  ALL_HABITS,
  GenreId,
  HabitId,
  SAMPLE_PROFILES,
  calculateTasteOverlap,
} from '../utils/matching';
import { HandStar, VinylDisc } from './ZineMotifs';

const DEFAULT_GENRES: GenreId[] = ['shoegaze', 'post-punk', 'indie rock'];
const DEFAULT_HABITS: HabitId[] = ['night drives', 'live gigs', 'late-night headphones'];

export function TasteMatcherSection() {
  const [selectedGenres, setSelectedGenres] = useState<GenreId[]>(DEFAULT_GENRES);
  const [selectedHabits, setSelectedHabits] = useState<HabitId[]>(DEFAULT_HABITS);
  const [partnerId, setPartnerId] = useState<string>('mila');
  const [historyStack, setHistoryStack] = useState<{ genres: GenreId[]; habits: HabitId[] }[]>([]);
  const [spinningBoost, setSpinningBoost] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const partner =
    SAMPLE_PROFILES.find((p) => p.id === partnerId) || SAMPLE_PROFILES[0];

  const overlap = calculateTasteOverlap(selectedGenres, selectedHabits, partner);

  // Trigger brief vinyl spin acceleration whenever selections change
  useEffect(() => {
    setSpinningBoost(true);
    const timer = setTimeout(() => setSpinningBoost(false), 950);
    return () => clearTimeout(timer);
  }, [selectedGenres, selectedHabits, partnerId]);

  const pushHistory = () => {
    setHistoryStack((prev) => [
      ...prev.slice(-8),
      { genres: [...selectedGenres], habits: [...selectedHabits] },
    ]);
  };

  const handleToggleGenre = (id: GenreId) => {
    pushHistory();
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSavedNotice(null);
  };

  const handleToggleHabit = (id: HabitId) => {
    pushHistory();
    setSelectedHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSavedNotice(null);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const last = historyStack[historyStack.length - 1];
    setSelectedGenres(last.genres);
    setSelectedHabits(last.habits);
    setHistoryStack((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    pushHistory();
    setSelectedGenres(DEFAULT_GENRES);
    setSelectedHabits(DEFAULT_HABITS);
    setSavedNotice('Reset to default post-punk / shoegaze demo crate.');
  };

  const handleClear = () => {
    pushHistory();
    setSelectedGenres([]);
    setSelectedHabits([]);
    setSavedNotice('Cleared all selections.');
  };

  const handleSaveLocally = () => {
    try {
      localStorage.setItem(
        'riff_demo_crate',
        JSON.stringify({ genres: selectedGenres, habits: selectedHabits, partnerId })
      );
      setSavedNotice('Saved your demo crate to browser localStorage (local only).');
    } catch {
      setSavedNotice('Kept in session memory.');
    }
  };

  const handleCopyPrompt = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(overlap.introPrompt).catch(() => {});
    }
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Red ink ring circumference math
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (overlap.percentage / 100) * circumference;

  return (
    <section
      id="taste-matcher"
      aria-label="Interactive Taste Matcher Demo"
      className="relative py-20 lg:py-28 border-b border-[#F4F0E8]/15 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="halftone-patch absolute bottom-8 right-8 w-80 h-64 opacity-40 pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-[#C92533]">
              <span>02. INTERACTIVE TASTE MATCHER · LIVE FRONT-END DEMO</span>
            </div>
            <h2 className="mt-2 font-editorial font-bold text-3xl sm:text-5xl text-[#F4F0E8] tracking-tight">
              Find your frequency.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#AAA8A6] max-w-xl">
            Toggle your favorite scenes and listening rituals below. Overlap is calculated deterministically in your browser from shared genres and habits — an honest taste-overlap illustration, not verified romance science.
          </p>
        </div>

        {/* Two-Panel Matcher Workspace */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL (7 Cols): User Genre & Ritual Selector */}
          <div className="lg:col-span-7 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px]">
            {/* Physical Tape Strip showing currently snapped genres & habits */}
            <div className="p-4 bg-[#EAE3D5] text-[#0B0B0B] rounded-[2px] shadow-md transform -rotate-[0.4deg]">
              <div className="flex items-center justify-between border-b border-[#0B0B0B]/25 pb-1.5 text-[11px] font-mono-code uppercase">
                <span className="font-bold">YOUR ACTIVE TAPE STRIP ({selectedGenres.length} GENRES · {selectedHabits.length} RITUALS)</span>
                <span className="text-[#C92533] font-bold">SIDE A</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5 min-h-[28px] items-center">
                {selectedGenres.length === 0 && selectedHabits.length === 0 ? (
                  <span className="text-xs font-mono-code italic text-[#0B0B0B]/65">
                    Tape strip is blank — click genre or ritual chips below to snap them onto your reel.
                  </span>
                ) : (
                  <>
                    {selectedGenres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 bg-[#0B0B0B] text-[#F4F0E8] text-xs font-mono-code uppercase tracking-wider"
                      >
                        {g}
                      </span>
                    ))}
                    {selectedHabits.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-0.5 bg-[#C92533] text-[#F4F0E8] text-xs font-mono-code uppercase tracking-wider"
                      >
                        {h}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Step 1: Genre Chips */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                  1. Pick your core genres
                </h3>
                <span className="text-xs font-mono-code text-[#AAA8A6]">
                  {selectedGenres.length} of {ALL_GENRES.length} selected
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_GENRES.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id);
                  const isSharedWithPartner =
                    isSelected && partner.genres.includes(genre.id);
                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => handleToggleGenre(genre.id)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-[3px] border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#1D1D22] border-[#C92533] text-[#F4F0E8] shadow-[3px_3px_0px_rgba(201,37,51,0.45)]'
                          : 'bg-[#0B0B0B] border-[#F4F0E8]/20 text-[#AAA8A6] hover:border-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{genre.label}</span>
                          {isSharedWithPartner && (
                            <span className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                              &bull; Shared with {partner.name}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-0.5">{genre.subnote}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded-[2px] border flex items-center justify-center text-xs font-mono-code shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#C92533] border-[#C92533] text-[#F4F0E8]'
                            : 'border-[#F4F0E8]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Listening Habits / Rituals */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                  2. Toggle listening rituals
                </h3>
                <span className="text-xs font-mono-code text-[#AAA8A6]">
                  {selectedHabits.length} of {ALL_HABITS.length} active
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ALL_HABITS.map((habit) => {
                  const isSelected = selectedHabits.includes(habit.id);
                  const isSharedWithPartner =
                    isSelected && partner.habits.includes(habit.id);
                  return (
                    <button
                      key={habit.id}
                      type="button"
                      onClick={() => handleToggleHabit(habit.id)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-[3px] border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#1D1D22] border-[#F4F0E8]/80 text-[#F4F0E8]'
                          : 'bg-[#0B0B0B] border-[#F4F0E8]/20 text-[#AAA8A6] hover:border-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{habit.label}</span>
                          {isSharedWithPartner && (
                            <span className="text-[10px] font-mono-code uppercase text-[#C92533] font-bold">
                              &bull; Match
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#AAA8A6] mt-0.5">{habit.detail}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`w-5 h-5 rounded-[2px] border flex items-center justify-center text-xs font-mono-code shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#F4F0E8] border-[#F4F0E8] text-[#0B0B0B]'
                            : 'border-[#F4F0E8]/30 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar: Reset, Undo, Clear, Optional Local Save */}
            <div className="mt-7 pt-5 border-t border-[#F4F0E8]/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/35 text-[#F4F0E8] hover:border-[#F4F0E8] rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyStack.length === 0}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/25 text-[#AAA8A6] hover:text-[#F4F0E8] disabled:opacity-40 rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Undo
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3.5 py-2 text-xs font-mono-code uppercase border border-[#F4F0E8]/25 text-[#AAA8A6] hover:text-[#C92533] hover:border-[#C92533] rounded-[3px] cursor-pointer whitespace-nowrap"
                >
                  Clear All
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveLocally}
                className="px-3.5 py-2 text-xs font-mono-code uppercase bg-[#0B0B0B] border border-[#C92533]/70 text-[#F4F0E8] hover:bg-[#C92533] rounded-[3px] transition-colors cursor-pointer whitespace-nowrap"
              >
                Save Demo Choices Locally
              </button>
            </div>

            {savedNotice && (
              <p role="status" className="mt-3 text-xs font-mono-code text-[#C92533]">
                {savedNotice}
              </p>
            )}
          </div>

          {/* RIGHT PANEL (5 Cols): Sample Profile Switcher + Live Overlap Result */}
          <div className="lg:col-span-5 bg-[#141414] border border-[#F4F0E8]/20 p-6 sm:p-8 rounded-[4px] relative">
            {/* Partner Profile Selector Tabs */}
            <div>
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#AAA8A6]">
                Compare your crate against sample 18+ profile:
              </div>
              <div
                role="tablist"
                aria-label="Sample profiles"
                className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {SAMPLE_PROFILES.map((p) => {
                  const active = p.id === partner.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPartnerId(p.id)}
                      className={`py-2 px-3 rounded-[3px] text-xs font-mono-code uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#C92533] text-[#F4F0E8] border-[#C92533] font-bold'
                          : 'bg-[#0B0B0B] text-[#AAA8A6] border-[#F4F0E8]/20 hover:text-[#F4F0E8]'
                      }`}
                    >
                      {p.name}, {p.age}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Partner Bio Header */}
            <div className="mt-5 p-4 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-condensed font-extrabold text-2xl uppercase text-[#F4F0E8]">
                    {partner.name}, {partner.age}
                  </span>
                  <span className="ml-2 text-xs font-mono-code text-[#AAA8A6]">
                    ({partner.pronouns}) &bull; {partner.city}
                  </span>
                </div>
                <HandStar className="w-7 h-7 text-[#C92533]" variant={1} />
              </div>
              <p className="mt-1.5 text-xs text-[#AAA8A6]">{partner.tagline}</p>
              <div className="mt-2 text-[11px] font-mono-code text-[#F4F0E8]/85">
                Top artists: {partner.topArtists.join(' · ')}
              </div>
            </div>

            {/* Red Ink Overlap Ring + Accelerating Vinyl Readout */}
            <div
              className="mt-6 flex items-center justify-around gap-4 py-4 px-3 bg-[#0B0B0B] border border-[#F4F0E8]/15 rounded-[3px]"
              aria-live="polite"
            >
              {/* Red Ink Ring */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="rgba(244,240,232,0.14)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#C92533"
                    strokeWidth="6.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius - 9}
                    fill="none"
                    stroke="rgba(244,240,232,0.35)"
                    strokeWidth="1.2"
                    strokeDasharray="5 3"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    data-testid="taste-overlap-score"
                    className="font-sans-ui font-extrabold text-4xl text-[#F4F0E8] tabular-nums leading-none"
                  >
                    {overlap.percentage}%
                  </span>
                  <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#AAA8A6] mt-1">
                    Demo Overlap
                  </span>
                </div>
              </div>

              {/* Spinning Vinyl that accelerates on state changes */}
              <div className="flex flex-col items-center">
                <VinylDisc
                  className="w-28 h-28"
                  fast={spinningBoost}
                  labelSide="A"
                />
                <span className="mt-2 text-[10px] font-mono-code text-[#AAA8A6] uppercase">
                  {spinningBoost ? 'Recalculating crate...' : 'Turntable locked'}
                </span>
              </div>
            </div>

            {/* Plainly Explained Formula Note */}
            <p className="mt-3 text-[11px] font-mono-code text-[#AAA8A6] leading-relaxed">
              {overlap.formulaSummary}
            </p>

            {/* Shared Scenes */}
            <div className="mt-5">
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                Shared scenes &amp; rituals ({overlap.sharedScenes.length})
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {overlap.sharedScenes.length > 0 ? (
                  overlap.sharedScenes.map((scene) => (
                    <span
                      key={scene}
                      className="px-2.5 py-1 bg-[#1D1D22] border border-[#C92533]/60 text-[#F4F0E8] text-xs font-mono-code"
                    >
                      {scene}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#AAA8A6]">
                    No direct overlap yet — opposite crates make great mixtape trades.
                  </span>
                )}
              </div>
            </div>

            {/* Could Talk About */}
            <div className="mt-5">
              <div className="text-xs font-mono-code uppercase tracking-wider text-[#F4F0E8]">
                Could talk about:
              </div>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-[#AAA8A6]">
                {overlap.couldTalkAbout.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C92533] font-mono-code">&rarr;</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intro Prompt Box */}
            <div className="mt-5 p-4 bg-[#0B0B0B] border border-[#C92533]/60 rounded-[3px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code uppercase text-[#C92533] font-semibold">
                  Suggested Intro Prompt
                </span>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="text-[11px] font-mono-code uppercase text-[#F4F0E8] hover:text-[#C92533] underline cursor-pointer"
                >
                  {copiedPrompt ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
              <p className="mt-1.5 text-sm font-editorial italic text-[#F4F0E8]">
                {overlap.introPrompt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(riff)/riff/components/ZineMotifs.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { PlaylistItem } from '../utils/matching';

/**
 * Hand-drawn asymmetrical 5-point star matching the double-stroke sketchy stars in riff-reference.png
 */
export function HandStar({
  className = 'w-10 h-10',
  variant = 1,
  interactive = false,
  label,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
  interactive?: boolean;
  label?: string;
}) {
  const [pinned, setPinned] = useState(false);

  const paths = {
    1: 'M24 3 L29.5 17.8 L45 17.2 L32.2 26.8 L37.4 42.5 L24 32.8 L10.8 42.2 L15.6 26.5 L3.2 17.4 L18.5 17.6 Z M24.4 5.2 L28.8 18.4 L42.8 18.1 L31.1 26.4 L35.8 40.4 L23.8 31.8 L12.2 40.1 L16.5 26.2 L5.1 18.2 L19.2 18.4 Z',
    2: 'M23 2.5 L28.2 16.9 L44.2 15.8 L31.4 25.9 L36.9 41.8 L23.2 31.9 L9.4 41.2 L14.8 25.4 L2.5 16.5 L17.9 16.8 Z',
    3: 'M25 4 L30 18.2 L45.5 18.8 L32.8 27.5 L38 43 L24.2 33.4 L11.2 42.5 L16.2 27.1 L4 18.2 L19.1 18.1 Z',
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        aria-pressed={pinned}
        aria-label={label || 'Pin hand-drawn star sticker'}
        className={`group relative inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:rotate-12 ${
          pinned ? 'text-[#C92533] rotate-12 scale-110' : 'text-[#F4F0E8]/85'
        } ${className}`}
        title={pinned ? 'Star pinned to zine margin' : 'Click to ink-stamp this star'}
      >
        <svg viewBox="0 0 48 46" fill="none" className="w-full h-full overflow-visible">
          <path
            d={paths[variant]}
            stroke="currentColor"
            strokeWidth={pinned ? '2.1' : '1.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <svg
      viewBox="0 0 48 46"
      fill="none"
      aria-hidden="true"
      className={`text-[#F4F0E8]/80 pointer-events-none select-none ${className}`}
    >
      <path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Riff waveform icon from upper-left brand lockup in reference image
 */
export function WaveformLogo({ className = 'w-9 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <line x1="1" y1="18" x2="5" y2="18" stroke="#F4F0E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="13" x2="7.5" y2="23" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11" y1="9" x2="11" y2="27" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14.5" y1="12" x2="14.5" y2="24" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="2" x2="18" y2="34" stroke="#F4F0E8" strokeWidth="2.1" strokeLinecap="round" />
      <line x1="21.5" y1="7" x2="21.5" y2="29" stroke="#F4F0E8" strokeWidth="1.9" strokeLinecap="round" />
      <line x1="25" y1="11" x2="25" y2="25" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28.5" y1="14" x2="28.5" y2="22" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="32" y1="9" x2="32" y2="27" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="35.5" y1="14" x2="35.5" y2="22" stroke="#F4F0E8" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="38.5" y1="18" x2="43" y2="18" stroke="#F4F0E8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Hand-lettered "MUSIC > LOOKS" scrawl matching upper-right of hero reference
 */
export function MusicGreaterLooksScrawl({
  className = '',
  showUnderline = true,
}: {
  className?: string;
  showUnderline?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 250 56"
      fill="none"
      aria-hidden="true"
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Hand-inked capital letters MUSIC > LOOKS */}
      <g stroke="#F4F0E8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.86">
        {/* M */}
        <path d="M8 36 L11 10 L20 26 L29 9 L31 36" />
        {/* U */}
        <path d="M38 11 L38 29 C38 35 48 36 49 29 L50 11" />
        {/* S */}
        <path d="M67 13 C61 10 56 14 57 19 C58 24 67 25 67 31 C67 36 58 37 55 33" />
        {/* I */}
        <path d="M75 12 L74 35" />
        {/* C */}
        <path d="M95 14 C86 11 81 18 82 26 C83 34 89 36 96 34" />

        {/* > */}
        <path d="M111 17 L124 25 L110 32" strokeWidth="2.5" />

        {/* L */}
        <path d="M140 12 L137 36 L151 36" />
        {/* O */}
        <ellipse cx="164" cy="25" rx="8.5" ry="11" transform="rotate(-5 164 25)" />
        {/* O */}
        <ellipse cx="186" cy="25" rx="8.5" ry="11" transform="rotate(4 186 25)" />
        {/* K */}
        <path d="M202 12 L199 37 M214 13 L201 25 L214 37" />
        {/* S */}
        <path d="M235 15 C228 12 222 16 223 21 C224 26 235 28 234 34 C233 39 224 39 220 35" />
      </g>
      {showUnderline && (
        <>
          <path
            d="M135 43 Q188 46 242 49"
            stroke="#F4F0E8"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.78"
          />
          <path
            d="M148 48 Q195 51 236 53"
            stroke="#F4F0E8"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.65"
          />
        </>
      )}
    </svg>
  );
}

/**
 * Realistic 12-inch vinyl disc with concentric grooves, specular light sheen, and crimson label
 */
export function VinylDisc({
  className = 'w-56 h-56',
  fast = false,
  labelSide = 'A',
  onFlip,
  interactive = false,
}: {
  className?: string;
  fast?: boolean;
  labelSide?: 'A' | 'B';
  onFlip?: () => void;
  interactive?: boolean;
}) {
  const content = (
    <div
      className={`relative rounded-full bg-[#090909] shadow-[0_20px_50px_rgba(0,0,0,0.92)] border border-white/10 overflow-hidden select-none ${
        fast ? 'animate-vinyl-fast' : 'animate-vinyl-slow'
      } ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Specular vinyl light reflection cones */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 35deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.22) 22deg, transparent 48deg, transparent 180deg, rgba(255,255,255,0.18) 205deg, transparent 235deg)',
        }}
      />
      {/* Concentric micro-grooves SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="49" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="100" cy="100" r="43" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />

        {/* Deep crimson center label */}
        <circle cx="100" cy="100" r="34" fill="#C92533" stroke="#741B24" strokeWidth="2" />
        <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(244,240,232,0.35)" strokeWidth="0.7" strokeDasharray="4 2" />
        <text
          x="100"
          y="84"
          textAnchor="middle"
          fill="#F4F0E8"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1.5"
          className="font-mono-code"
        >
          RIFF 45 RPM
        </text>
        <text
          x="100"
          y="119"
          textAnchor="middle"
          fill="#F4F0E8"
          fontSize="6.5"
          opacity="0.85"
          letterSpacing="1"
          className="font-mono-code"
        >
          SIDE {labelSide} · STEREO
        </text>
        {/* Center spindle hole */}
        <circle cx="100" cy="100" r="5.5" fill="#0B0B0B" stroke="rgba(244,240,232,0.3)" strokeWidth="1" />
      </svg>
    </div>
  );

  if (interactive && onFlip) {
    return (
      <button
        type="button"
        onClick={onFlip}
        aria-label={`Flip vinyl record to side ${labelSide === 'A' ? 'B' : 'A'}`}
        className="inline-block rounded-full focus-visible:ring-2 focus-visible:ring-[#C92533]"
        title="Click to flip vinyl side A/B"
      >
        {content}
      </button>
    );
  }

  return content;
}

/**
 * Original SVG artwork generator for playlist & album sleeves (no external hotlinks, 100% crisp)
 */
export function AlbumArtGraphic({
  variant,
  className = 'w-full h-full',
}: {
  variant: PlaylistItem['artVariant'];
  className?: string;
}) {
  switch (variant) {
    case 'crimson-horizon':
      return (
        <div className={`relative bg-[#0D0D10] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/album-kyoto.jpg"
            alt="Midnight Static shoegaze cover artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40" />
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-code text-[#F4F0E8]/75">
            <span>RIFF-014</span>
            <span className="text-[#C92533] font-bold">MONO / REVERB</span>
          </div>
        </div>
      );

    case 'static-guitar':
      return (
        <div className={`relative bg-[#121212] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/match-art-1.jpg"
            alt="Post-punk guitar silhouette cover art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-125 opacity-85"
          />
          <div className="absolute inset-0 bg-[#C92533]/20 mix-blend-multiply" />
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="0" y1="95" x2="120" y2="25" stroke="#C92533" strokeWidth="10" opacity="0.75" />
            <line x1="0" y1="103" x2="120" y2="33" stroke="#F4F0E8" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <div className="absolute top-2 left-2.5 text-[10px] font-mono-code tracking-widest text-[#F4F0E8]/85 uppercase">
            ENCORE // 39:00
          </div>
        </div>
      );

    case 'rain-window':
      return (
        <div className={`relative bg-[#111317] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/shared-track-2.jpg"
            alt="Songs to Walk Home To misty silhouette cover art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2.5 text-[10px] font-mono-code text-[#F4F0E8]/80">
            SIDE B · 4-TRACK TAPE
          </div>
        </div>
      );

    case 'basement-flyer':
      return (
        <div className={`relative bg-[#151412] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/zine-band-photo.jpg"
            alt="Basement Show Memories underground band photograph"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover contrast-125 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#C92533]/25" />
          <div className="absolute top-2 right-2 bg-[#C92533] text-[#F4F0E8] px-1.5 py-0.5 text-[9px] font-mono-code uppercase">
            ALL AGES 18+
          </div>
        </div>
      );

    case 'tube-amp':
      return (
        <div className={`relative bg-[#160B0D] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/shared-track-3.jpg"
            alt="Cathode Ray Lullabies darkwave red glow artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-2 right-2.5 text-[10px] font-mono-code text-[#C92533]">
            118 BPM // SYNTH
          </div>
        </div>
      );

    case 'tape-reel':
    default:
      return (
        <div className={`relative bg-[#101216] overflow-hidden ${className}`}>
          <img
            src="/templates/riff/match-art-2.jpg"
            alt="Rain on the Amp Case atmospheric album sleeve"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-2 left-2.5 text-[10px] font-mono-code text-[#F4F0E8]/80">
            12&quot; EP · 45 RPM
          </div>
        </div>
      );
  }
}
]]>
    </file>
    <file path="src/app/(riff)/riff/utils/matching.ts">
<![CDATA[export type GenreId =
  | 'shoegaze'
  | 'post-punk'
  | 'indie rock'
  | 'dream pop'
  | 'darkwave'
  | 'emo'
  | 'alt folk';

export type HabitId =
  | 'night drives'
  | 'live gigs'
  | 'vinyl'
  | 'late-night headphones';

export interface TasteProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  pronouns: string;
  tagline: string;
  genres: GenreId[];
  habits: HabitId[];
  topArtists: string[];
  recentTrack: {
    title: string;
    artist: string;
    album: string;
    year: string;
    note: string;
  };
  sharedTrackOptions: {
    id: string;
    title: string;
    artist: string;
    prompt: string;
    context: string;
  }[];
}

export interface OverlapResult {
  percentage: number;
  sharedGenres: GenreId[];
  sharedHabits: HabitId[];
  jaccardGenres: number;
  jaccardHabits: number;
  formulaSummary: string;
  sharedScenes: string[];
  couldTalkAbout: string[];
  introPrompt: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  mood: 'shoegaze' | 'post-punk' | 'late-night' | 'live-basement';
  moodLabel: string;
  curator: string;
  duration: string;
  trackCount: number;
  rotationDeg: number;
  artVariant: 'crimson-horizon' | 'static-guitar' | 'tube-amp' | 'basement-flyer' | 'tape-reel' | 'rain-window';
  context: string;
  conversationQuestion: string;
  tracks: { number: string; title: string; artist: string; length: string }[];
}

export const ALL_GENRES: { id: GenreId; label: string; subnote: string }[] = [
  { id: 'shoegaze', label: 'Shoegaze', subnote: 'Wall-of-sound fuzz & reverb pedals' },
  { id: 'post-punk', label: 'Post-Punk', subnote: 'Driving basslines & angular guitars' },
  { id: 'indie rock', label: 'Indie Rock', subnote: 'Basement amps & ragged hooks' },
  { id: 'dream pop', label: 'Dream Pop', subnote: 'Shimmering keys & nocturnal haze' },
  { id: 'darkwave', label: 'Darkwave', subnote: 'Cold synths & cathedral echo' },
  { id: 'emo', label: 'Midwest / 90s Emo', subnote: 'Open tunings & cathartic bridges' },
  { id: 'alt folk', label: 'Alt Folk', subnote: 'Tape hiss, fingerpicking & lyricism' },
];

export const ALL_HABITS: { id: HabitId; label: string; detail: string }[] = [
  { id: 'night drives', label: 'Night drives', detail: 'Windows cracked on empty highways after 11 PM' },
  { id: 'live gigs', label: 'Live gigs', detail: '200-cap rooms, ear plugs in pocket, near the soundboard' },
  { id: 'vinyl', label: 'Vinyl crate digging', detail: 'Flipping through dusty 7-inch bins on Sunday afternoons' },
  { id: 'late-night headphones', label: 'Late-night headphones', detail: 'Full-album listens in the dark with no skips' },
];

export const SAMPLE_PROFILES: TasteProfile[] = [
  {
    id: 'mila',
    name: 'Mila',
    age: 24,
    city: 'East London',
    pronouns: 'she/her',
    tagline: 'Always by the left speaker stack. Will judge a café by its afternoon playlist.',
    genres: ['shoegaze', 'post-punk', 'indie rock', 'alt folk'],
    habits: ['night drives', 'live gigs', 'late-night headphones'],
    topArtists: ['Fontaines D.C.', 'Wet Leg', 'Phoebe Bridgers'],
    recentTrack: {
      title: 'Kyoto',
      artist: 'Phoebe Bridgers',
      album: 'Punisher',
      year: '2020',
      note: 'Played 4 times walking back from the Lexington in the rain.',
    },
    sharedTrackOptions: [
      {
        id: 'punisher',
        title: 'Kyoto / Punisher',
        artist: 'Phoebe Bridgers',
        prompt: 'Ask them about "Punisher"',
        context: 'You both queued side B after midnight three times this week.',
      },
      {
        id: 'starburster',
        title: 'Starburster',
        artist: 'Fontaines D.C.',
        prompt: 'Ask where they first heard Fontaines D.C. live',
        context: 'Top 1% overlap on Dublin & South London post-punk releases.',
      },
      {
        id: 'chaise',
        title: 'Chaise Longue',
        artist: 'Wet Leg',
        prompt: 'Ask which festival encore nearly blew their eardrums',
        context: 'Both saved to "loud walk to the train" playlists.',
      },
    ],
  },
  {
    id: 'julian',
    name: 'Julian',
    age: 26,
    city: 'Glasgow',
    pronouns: 'he/him',
    tagline: 'Repairs vintage cassette decks and never misses an opening band.',
    genres: ['shoegaze', 'dream pop', 'darkwave', 'post-punk'],
    habits: ['vinyl', 'live gigs', 'late-night headphones'],
    topArtists: ['Slowdive', 'The Cure', 'DIIV'],
    recentTrack: {
      title: 'When the Sun Hits',
      artist: 'Slowdive',
      album: 'Souvlaki',
      year: '1993',
      note: 'First record I ever bought on 180g vinyl.',
    },
    sharedTrackOptions: [
      {
        id: 'souvlaki',
        title: 'Souvlaki Space Station',
        artist: 'Slowdive',
        prompt: 'Ask about their favorite delay pedal setting',
        context: 'Both listen to heavy reverb records between 11 PM and 2 AM.',
      },
    ],
  },
  {
    id: 'sora',
    name: 'Sora',
    age: 23,
    city: 'Chicago',
    pronouns: 'they/them',
    tagline: 'Collects risograph show flyers and cries to horn arrangements in midwest emo.',
    genres: ['emo', 'indie rock', 'alt folk', 'shoegaze'],
    habits: ['night drives', 'live gigs', 'vinyl'],
    topArtists: ['American Football', 'Wednesday', 'Alvvays'],
    recentTrack: {
      title: 'Bull Believer',
      artist: 'Wednesday',
      album: 'Rat Saw God',
      year: '2023',
      note: 'Nothing beats pedal steel through a cranked tube amp.',
    },
    sharedTrackOptions: [
      {
        id: 'ratsaw',
        title: 'Chosen to Deserve',
        artist: 'Wednesday',
        prompt: 'Ask which local venue has the best floor acoustics',
        context: 'Shared affinity for fuzz-pedal storytelling and DIY basements.',
      },
    ],
  },
  {
    id: 'deon',
    name: 'Deon',
    age: 28,
    city: 'Berlin / Detroit',
    pronouns: 'he/they',
    tagline: 'Synth basslines, cold drizzle, and B-sides that run over seven minutes.',
    genres: ['darkwave', 'post-punk', 'dream pop'],
    habits: ['night drives', 'vinyl', 'late-night headphones'],
    topArtists: ['Boy Harsher', 'Molchat Doma', 'Cocteau Twins'],
    recentTrack: {
      title: 'Pain',
      artist: 'Boy Harsher',
      album: 'Lesser Man EP',
      year: '2014',
      note: 'Strictly for 2 A.M. autobahn stretches.',
    },
    sharedTrackOptions: [
      {
        id: 'lesserman',
        title: 'Pain (Extended Cut)',
        artist: 'Boy Harsher',
        prompt: 'Ask what record stays permanently on their turntable',
        context: 'Overlapping nocturnal synth and chorus-bass rotation.',
      },
    ],
  },
];

export const SCENE_PLAYLISTS: PlaylistItem[] = [
  {
    id: 'midnight-static',
    title: 'Midnight Static',
    subtitle: 'Fuzz pedals, sodium streetlights, and 3 A.M. train platforms.',
    mood: 'shoegaze',
    moodLabel: 'Shoegaze / Reverb',
    curator: 'Curated by Mila & 14 East London night owls',
    duration: '48 min',
    trackCount: 11,
    rotationDeg: -1.8,
    artVariant: 'crimson-horizon',
    context:
      'Built for walking home after your ears are still ringing from the encore. Heavy glide guitar and buried vocals.',
    conversationQuestion: 'Which song on here sounds most like your walk home after a gig?',
    tracks: [
      { number: '01', title: 'Glass Platform (Demo)', artist: 'Velvet Escalator', length: '4:12' },
      { number: '02', title: 'Sodium Vapor', artist: 'Pavement Choir', length: '3:54' },
      { number: '03', title: 'Tremolo Letter', artist: 'Siren & the Static', length: '5:08' },
      { number: '04', title: 'Last Overground North', artist: 'Deptford Dept.', length: '4:31' },
    ],
  },
  {
    id: 'after-the-encore',
    title: 'After the Encore',
    subtitle: 'Wire-taut post-punk basslines for sticky floors and cold night air.',
    mood: 'post-punk',
    moodLabel: 'Post-Punk / Angular',
    curator: 'Curated by Julian & Glasgow Sub-Basement',
    duration: '39 min',
    trackCount: 10,
    rotationDeg: 1.5,
    artVariant: 'static-guitar',
    context:
      'When the house lights come up too fast and nobody wants to leave the pavement outside the venue.',
    conversationQuestion: 'What is the smallest room you have ever seen a life-changing set in?',
    tracks: [
      { number: '01', title: 'Check the Stamp', artist: 'Concrete Turnstile', length: '3:18' },
      { number: '02', title: 'No Coat Check', artist: 'Brutalista', length: '2:57' },
      { number: '03', title: 'Feedback at the Bar', artist: 'Kerosene Club', length: '4:05' },
      { number: '04', title: 'Taxicab Monochrome', artist: 'The Paper Wristbands', length: '3:44' },
    ],
  },
  {
    id: 'songs-to-walk-home-to',
    title: 'Songs to Walk Home To',
    subtitle: 'Tape-hiss confessions, open tunings, and headphones under a hood.',
    mood: 'late-night',
    moodLabel: 'Late-Night Indie / Folk',
    curator: 'Curated by Riff Editorial Zine #04',
    duration: '52 min',
    trackCount: 13,
    rotationDeg: -1.2,
    artVariant: 'rain-window',
    context:
      'Intimate four-track recordings and sparse piano endings where you can hear the room tone and creaking floorboards.',
    conversationQuestion: 'Do you listen to lyrics first, or the chord changes underneath?',
    tracks: [
      { number: '01', title: 'Radiator Hum in B-Flat', artist: 'Clara Vance', length: '3:49' },
      { number: '02', title: 'Corner Bodega Tulips', artist: 'Half-Lit Windows', length: '4:15' },
      { number: '03', title: 'Voicemail from October', artist: 'Pine & Mercury', length: '3:22' },
      { number: '04', title: 'Spare Key under the Mat', artist: 'Orchard Static', length: '4:50' },
    ],
  },
  {
    id: 'basement-show-memories',
    title: 'Basement Show Memories',
    subtitle: 'Photocopied flyers, blown fuses, and shouting the bridge together.',
    mood: 'live-basement',
    moodLabel: 'Live Basement / Emo',
    curator: 'Curated by Sora & Midwest DIY Tape Exchange',
    duration: '44 min',
    trackCount: 12,
    rotationDeg: 2.1,
    artVariant: 'basement-flyer',
    context:
      'Sweaty brick walls, a drum kit held together with gaffer tape, and thirty people who know every word.',
    conversationQuestion: 'Have you ever kept a paper ticket stub or gig flyer in your wallet for years?',
    tracks: [
      { number: '01', title: 'Gaffer Tape Snare', artist: 'Cinderblock Porch', length: '2:48' },
      { number: '02', title: 'Five Dollars at the Door', artist: 'Lake Effect Snow', length: '3:36' },
      { number: '03', title: 'Borrowed Jazzmaster', artist: 'Torn Setlist', length: '4:19' },
      { number: '04', title: 'Everyone Load Out', artist: 'The Late Van', length: '3:58' },
    ],
  },
  {
    id: 'cathode-ray-lullabies',
    title: 'Cathode Ray Lullabies',
    subtitle: 'Analog drum machines, chorus-drenched bass, and midnight highways.',
    mood: 'late-night',
    moodLabel: 'Darkwave / Nocturnal',
    curator: 'Curated by Deon & Night Shift Radio',
    duration: '56 min',
    trackCount: 11,
    rotationDeg: -2.0,
    artVariant: 'tube-amp',
    context:
      'Hypnotic 118 BPM pulse for empty ring roads, rain streaks on windshields, and 24-hour diners.',
    conversationQuestion: 'What is your ultimate 1 A.M. driving album from start to finish?',
    tracks: [
      { number: '01', title: 'Fluorescent Exit', artist: 'Mirror Bahnhof', length: '5:14' },
      { number: '02', title: 'Cold Solder Joint', artist: 'Tape Oxide', length: '4:42' },
      { number: '03', title: 'Red Dash Light', artist: 'Autobahn Ghosts', length: '4:29' },
      { number: '04', title: 'Last Ferry Radar', artist: 'Subzero Chorus', length: '5:33' },
    ],
  },
  {
    id: 'rain-on-the-amp-case',
    title: 'Rain on the Amp Case',
    subtitle: 'twelve-string jangle meeting Marshall stack distortion.',
    mood: 'shoegaze',
    moodLabel: 'Shoegaze / Dream Pop',
    curator: 'Curated by Riff Pressing Plant Club',
    duration: '46 min',
    trackCount: 10,
    rotationDeg: 1.4,
    artVariant: 'tape-reel',
    context:
      'Where sweet vocal harmonies dissolve into a warm ocean of reverse reverb and fuzz.',
    conversationQuestion: 'Which band would you travel to another city just to catch on a Tuesday night?',
    tracks: [
      { number: '01', title: 'Reverse Cathedral', artist: 'Pale Filament', length: '4:20' },
      { number: '02', title: 'Velvet Capo', artist: 'Sundown Tremolo', length: '3:55' },
      { number: '03', title: 'Fuzz Pedal Lullaby', artist: 'Starling Engine', length: '5:02' },
      { number: '04', title: 'Runout Groove Loop', artist: 'Mono Pressing', length: '4:47' },
    ],
  },
];

/**
 * Deterministic Jaccard + ritual overlap calculation for the Riff Taste Matcher demo.
 * Explicitly documented as an illustrative front-end overlap formula, not romance science.
 */
export function calculateTasteOverlap(
  userGenres: GenreId[],
  userHabits: HabitId[],
  partner: TasteProfile
): OverlapResult {
  const uniqueUserGenres = Array.from(new Set(userGenres));
  const uniqueUserHabits = Array.from(new Set(userHabits));

  if (uniqueUserGenres.length === 0 && uniqueUserHabits.length === 0) {
    return {
      percentage: 0,
      sharedGenres: [],
      sharedHabits: [],
      jaccardGenres: 0,
      jaccardHabits: 0,
      formulaSummary: 'Select at least one genre or listening ritual to compute demo taste overlap.',
      sharedScenes: [],
      couldTalkAbout: ['Pick a few genres or listening rituals on the left to see where your crates overlap.'],
      introPrompt: 'Pick a genre chip to generate a song-first conversation starter.',
    };
  }

  const sharedGenres = uniqueUserGenres.filter((g) => partner.genres.includes(g));
  const unionGenres = new Set([...uniqueUserGenres, ...partner.genres]);
  const jaccardGenres = unionGenres.size > 0 ? sharedGenres.length / unionGenres.size : 0;

  const sharedHabits = uniqueUserHabits.filter((h) => partner.habits.includes(h));
  const unionHabits = new Set([...uniqueUserHabits, ...partner.habits]);
  const jaccardHabits = unionHabits.size > 0 ? sharedHabits.length / unionHabits.size : 0;

  // Weighted demo score: 22% baseline + up to 48% from shared genres + up to 28% from shared habits
  const genreDirectRatio =
    partner.genres.length > 0 ? sharedGenres.length / partner.genres.length : 0;
  const habitDirectRatio =
    partner.habits.length > 0 ? sharedHabits.length / partner.habits.length : 0;

  const rawScore =
    sharedGenres.length === 0 && sharedHabits.length === 0
      ? 18
      : Math.round(
          24 +
            (jaccardGenres * 0.45 + genreDirectRatio * 0.55) * 46 +
            (jaccardHabits * 0.45 + habitDirectRatio * 0.55) * 27
        );

  const percentage = Math.max(12, Math.min(98, rawScore));

  const sharedScenes: string[] = [
    ...sharedGenres.map((g) => {
      const found = ALL_GENRES.find((item) => item.id === g);
      return found ? found.label : g;
    }),
    ...sharedHabits.map((h) => {
      const found = ALL_HABITS.find((item) => item.id === h);
      return found ? found.label : h;
    }),
  ];

  const couldTalkAbout: string[] = [];
  if (sharedGenres.includes('shoegaze') || sharedGenres.includes('dream pop')) {
    couldTalkAbout.push(`Pedalboards, reverse reverb, and ${partner.topArtists[0]}'s guitar tone`);
  }
  if (sharedGenres.includes('post-punk') || sharedGenres.includes('indie rock')) {
    couldTalkAbout.push(`200-cap basement venues and ${partner.topArtists[0]} live bootlegs`);
  }
  if (sharedGenres.includes('alt folk') || sharedGenres.includes('emo')) {
    couldTalkAbout.push(`Track-by-track lyricism on "${partner.recentTrack.album}" (${partner.recentTrack.year})`);
  }
  if (sharedGenres.includes('darkwave')) {
    couldTalkAbout.push(`Analog synth basslines and 2 A.M. post-gig night buses`);
  }
  if (sharedHabits.includes('vinyl')) {
    couldTalkAbout.push('Sunday afternoon 7-inch crate digging and B-side pressings');
  }
  if (sharedHabits.includes('live gigs')) {
    couldTalkAbout.push('Standing near the soundboard vs. the front barrier at loud shows');
  }
  if (sharedHabits.includes('night drives') || sharedHabits.includes('late-night headphones')) {
    couldTalkAbout.push(`Uninterrupted late-night listens to "${partner.recentTrack.title}"`);
  }

  if (couldTalkAbout.length === 0) {
    couldTalkAbout.push(
      `Trading gateway records: your ${uniqueUserGenres[0] || 'favorites'} crate vs. ${partner.name}'s ${partner.genres[0]} rotation`
    );
  }

  let introPrompt = `Ask ${partner.name} what record they put on when walking home after midnight.`;
  if (sharedGenres.length > 0 && sharedHabits.length > 0) {
    introPrompt = `"We both live on ${sharedGenres[0]} and ${sharedHabits[0]} — what is your zero-skip album right now?"`;
  } else if (sharedGenres.length > 0) {
    introPrompt = `"Saw we both overlap on ${sharedGenres.join(' + ')} — have you caught ${partner.topArtists[0]} live yet?"`;
  } else if (sharedHabits.length > 0) {
    introPrompt = `"Our genres are different, but we both swear by ${sharedHabits[0]} — trade me one track for tonight?"`;
  }

  const formulaSummary = `Demo Jaccard + ritual overlap: ${sharedGenres.length}/${unionGenres.size} genres (${Math.round(
    jaccardGenres * 100
  )}%) & ${sharedHabits.length}/${unionHabits.size} habits (${Math.round(
    jaccardHabits * 100
  )}%) with ${partner.name}. Illustrative taste math only.`;

  return {
    percentage,
    sharedGenres,
    sharedHabits,
    jaccardGenres,
    jaccardHabits,
    formulaSummary,
    sharedScenes,
    couldTalkAbout: couldTalkAbout.slice(0, 3),
    introPrompt,
  };
}

export function filterPlaylists(
  playlists: PlaylistItem[],
  moodFilter: 'all' | PlaylistItem['mood']
): PlaylistItem[] {
  if (moodFilter === 'all') {
    return playlists;
  }
  return playlists.filter((item) => item.mood === moodFilter);
}

export interface PreviewFormValidation {
  valid: boolean;
  error?: string;
  normalizedHandle?: string;
}

export function validatePreviewPass(
  handleOrName: string,
  favoriteRecord: string
): PreviewFormValidation {
  const cleanHandle = handleOrName.trim();
  const cleanRecord = favoriteRecord.trim();

  if (cleanHandle.length < 2) {
    return {
      valid: false,
      error: 'Please enter a first name or zine alias (at least 2 characters).',
    };
  }
  if (cleanRecord.length < 2) {
    return {
      valid: false,
      error: 'Name one favorite album or song to stamp your local preview pass.',
    };
  }
  return {
    valid: true,
    normalizedHandle: cleanHandle,
  };
}
]]>
    </file>
  </files>
</template>
