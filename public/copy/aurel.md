<template slug="aurel" name="AUREL">
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
    <file path="src/app/(aurel)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./aurel/aurel.css";

const cormorant_Garamond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "AUREL — Independent Luxury Horology",
  description: "An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.",
  openGraph: {
    title: "AUREL — Independent Luxury Horology",
    description: "An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0D",
};

export default function AurelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cormorant_Garamond.variable} ${manrope.variable} scroll-smooth`}>
      <body className="bg-[#0A0B0D] text-[#F0ECE5] antialiased selection:bg-[#9DB8C9]/25 selection:text-[#F0ECE5] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/aurel";

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
        className={`aurel-placeholder ${className ?? ""}`}
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
    <file path="src/app/(aurel)/aurel/aurel.css">
<![CDATA[@import "tailwindcss";

:root {
  --bg: #0A0B0D;
  --bg-soft: #111317;
  --metal-dark: #23272B;
  --ivory: #F0ECE5;
  --silver: #C7CDD2;
  --muted: #89919A;
  --ice: #9DB8C9;
  --rule: #374047;
  --button-light: #F1EEE9;
  --gutter: clamp(20px, 4.6vw, 84px);
  --max-content: 1600px;

  --font-display: var(--font-cormorant-garamond), 'Cormorant Garamond', Georgia, serif;
  --font-sans: var(--font-manrope), 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}

@layer base {
  html {
    background-color: var(--bg);
    color: var(--ivory);
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg);
    color: var(--ivory);
    overflow-x: hidden;
    margin: 0;
  }
}

.font-display {
  font-family: var(--font-display);
}

.font-sans-ui {
  font-family: var(--font-sans);
}

.font-mono-tech {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.aurel-container {
  width: 100%;
  max-width: var(--max-content);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
}

/* Subtle radial studio vignette matching the approved hero reference */
.hero-radial-stage {
  background:
    radial-gradient(circle at 50% 54%, rgba(36, 44, 54, 0.34) 0%, rgba(17, 19, 23, 0.18) 34%, rgba(10, 11, 13, 0.96) 72%, #0A0B0D 100%);
}

/* Restrained idle drift when motion is permitted */
@keyframes aurelWatchFloat {
  0%, 100% {
    transform: translate3d(0, 0px, 0);
  }
  50% {
    transform: translate3d(0, -6px, 0);
  }
}

@keyframes aurelSlowRing {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-watch-float {
  animation: aurelWatchFloat 7.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.animate-ring-crawl {
  animation: aurelSlowRing 240s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .animate-watch-float,
  .animate-ring-crawl {
    animation: none !important;
    transform: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/AurelApp.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import { MotionProvider } from './components/MotionProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionIntroduction } from './components/CollectionIntroduction';
import { AnatomySection } from './components/AnatomySection';
import { GallerySection } from './components/GallerySection';
import { AtelierSection } from './components/AtelierSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PrivateViewing } from './components/PrivateViewing';
import { Footer } from './components/Footer';

export default function AurelApp() {
  const [isPrivateViewingOpen, setIsPrivateViewingOpen] = useState(false);

  const handleBackToTop = () => {
    setIsPrivateViewingOpen(false);
    const topEl = document.getElementById('top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MotionProvider>
      <div className="min-h-screen bg-[#0A0B0D] text-[#F0ECE5] flex flex-col selection:bg-[#9DB8C9]/25 selection:text-[#F0ECE5]">
        <Header onOpenPrivateViewing={() => setIsPrivateViewingOpen(true)} />

        <main className="flex-1">
          <Hero />
          <CollectionIntroduction />
          <AnatomySection />
          <GallerySection />
          <AtelierSection />
          <ManifestoSection />
          <PrivateViewing
            isModalOpen={isPrivateViewingOpen}
            onOpenModal={() => setIsPrivateViewingOpen(true)}
            onCloseModal={() => setIsPrivateViewingOpen(false)}
          />
        </main>

        <Footer onBackToTop={handleBackToTop} />
      </div>
    </MotionProvider>
  );
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0A0B0D" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="#23272B" text-anchor="middle">A</text>
</svg>
]]>
    </file>
    <file path="src/app/(aurel)/aurel/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AUREL — Independent Luxury Horology";

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
          backgroundColor: "#0A0B0D",
          color: "#23272B",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>AUREL</span>
          <span style={{ color: "#F0ECE5" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            AUREL — Independent Luxury Horology
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            An exploration of precision, permanence, and the art of making time. Discover AUREL Collection 01 — The Origin.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "#F0ECE5" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/page.tsx">
<![CDATA["use client";

import AurelApp from "./AurelApp";

export default function AurelPage() {
  return <AurelApp />;
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/AnatomySection.tsx">
<![CDATA['use client';

import React, { useState } from 'react';
import {
  ANATOMY_HOTSPOTS,
  getHotspotById,
  getAdjacentHotspotId,
} from '../data/collection';

export const AnatomySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ANATOMY_HOTSPOTS[0].id);
  const [imgError, setImgError] = useState(false);
  const activeHotspot = getHotspotById(activeId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveId((prev) => getAdjacentHotspotId(prev, 'next'));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveId((prev) => getAdjacentHotspotId(prev, 'prev'));
    }
  };

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative py-24 md:py-36 bg-[#111317] border-t border-[#374047]/45 overflow-hidden"
    >
      <div className="aurel-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#374047]/55">
          <div>
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              02 / INSIDE THE CALIBRE
            </p>
            <h2
              id="anatomy-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.95]"
              style={{
                fontSize: 'clamp(2.8rem, 5.8vw, 6.2rem)',
                textWrap: 'balance',
              }}
            >
              PRECISION, EXPOSED.
            </h2>
          </div>

          <p className="font-sans-ui text-sm md:text-base text-[#C7CDD2] font-light max-w-md md:text-right">
            An arrangement of components, each with a reason to exist. Select an
            architectural index to inspect the inner construction of Calibre AU-01.
          </p>
        </div>

        {/* Interactive Exploded Movement Stage */}
        <div
          onKeyDown={handleKeyDown}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* Central Exploded Calibre Exhibit (8 columns on desktop) */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[16/9] w-full bg-[#0A0B0D] border border-[#374047]/60 overflow-hidden">
              {!imgError ? (
                <img
                  src="/templates/aurel/aurel-movement-exploded.webp"
                  alt="Exploded technical view of the AUREL Calibre AU-01 watch crystal, skeleton dial, mechanical movement, and titanium case"
                  width={2752}
                  height={1536}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                    CALIBRE AU-01 EXPLODED TECHNICAL DIAGRAM
                  </span>
                </div>
              )}

              {/* Subtle Vignette for Hotspot Contrast */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/70 via-transparent to-[#0A0B0D]/40"
                aria-hidden="true"
              />

              {/* SVG Metrology Connector Lines & Target Reticles */}
              <svg
                viewBox="0 0 1000 562.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {/* Subtle Reference Calibration Arc inside the exhibit */}
                <circle
                  cx="520"
                  cy="280"
                  r="225"
                  stroke="#374047"
                  strokeWidth="0.8"
                  strokeOpacity="0.45"
                  strokeDasharray="4 8"
                />

                {ANATOMY_HOTSPOTS.map((spot) => {
                  const isSelected = spot.id === activeId;
                  const mx = spot.markerX * 10;
                  const my = spot.markerY * 5.625;
                  const cx = spot.calloutX * 10;
                  const cy = spot.calloutY * 5.625;
                  const elbowX = spot.align === 'left' ? cx + 95 : cx - 95;

                  return (
                    <g key={spot.id}>
                      <polyline
                        points={`${mx},${my} ${elbowX},${cy} ${cx},${cy}`}
                        stroke={isSelected ? '#9DB8C9' : '#89919A'}
                        strokeWidth={isSelected ? '1.35' : '0.75'}
                        strokeOpacity={isSelected ? '0.95' : '0.35'}
                      />
                      {isSelected && (
                        <circle
                          cx={mx}
                          cy={my}
                          r="18"
                          stroke="#9DB8C9"
                          strokeWidth="0.9"
                          strokeOpacity="0.65"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Interactive Hotspot Pins on the Image */}
              {ANATOMY_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    onMouseEnter={() => setActiveId(spot.id)}
                    onFocus={() => setActiveId(spot.id)}
                    aria-pressed={isSelected}
                    aria-label={`${spot.label}: ${spot.subtitle}`}
                    style={{
                      left: `${spot.markerX}%`,
                      top: `${spot.markerY}%`,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0ECE5] ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-tech text-[10px] tracking-wider border transition-colors ${
                        isSelected
                          ? 'bg-[#9DB8C9] text-[#0A0B0D] border-[#F0ECE5] font-medium shadow-[0_0_20px_rgba(157,184,201,0.55)]'
                          : 'bg-[#0A0B0D]/85 text-[#F0ECE5] border-[#89919A]/70 group-hover:border-[#9DB8C9]'
                      }`}
                    >
                      {spot.index}
                    </span>
                  </button>
                );
              })}

              {/* Bottom Left Diagram Coordinate Readout */}
              <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.2em] text-[#C7CDD2]/80 uppercase">
                <span>CALIBRE AU-01 — AXIAL EXPLODED PROJECTION</span>
                <span className="hidden sm:inline text-[#9DB8C9]">
                  ACTIVE STATION: {activeHotspot.label}
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Selector Rail & Detail Readout (4 columns on desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {/* Accessible Hotspot Selection List */}
            <div
              role="tablist"
              aria-label="Calibre AU-01 Anatomy Hotspots"
              className="border-t border-[#374047]/60 divide-y divide-[#374047]/50"
            >
              {ANATOMY_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    role="tab"
                    id={`anatomy-tab-${spot.id}`}
                    aria-selected={isSelected}
                    aria-controls={`anatomy-panel-${spot.id}`}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    className={`w-full py-4 px-3 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9] ${
                      isSelected
                        ? 'bg-[#23272B]/70 text-[#F0ECE5]'
                        : 'text-[#89919A] hover:text-[#C7CDD2] hover:bg-[#23272B]/25'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-mono-tech text-xs tracking-[0.2em] uppercase ${
                          isSelected ? 'text-[#9DB8C9]' : 'text-[#C7CDD2]'
                        }`}
                      >
                        {spot.label}
                      </span>
                      <span className="font-display text-lg text-[#F0ECE5] mt-0.5">
                        {spot.subtitle}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`font-mono-tech text-xs ${
                        isSelected ? 'text-[#9DB8C9]' : 'text-[#374047]'
                      }`}
                    >
                      {isSelected ? '●' : '○'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Station Detail Panel */}
            <div
              id={`anatomy-panel-${activeHotspot.id}`}
              role="tabpanel"
              aria-labelledby={`anatomy-tab-${activeHotspot.id}`}
              className="p-6 bg-[#0A0B0D] border border-[#374047]/70 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#374047]/50 pb-3">
                <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9DB8C9] uppercase whitespace-nowrap">
                  {activeHotspot.label}
                </span>
                <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#89919A] uppercase whitespace-nowrap">
                  {activeHotspot.frequencyOrMetric}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl text-[#F0ECE5] font-normal tracking-[0.02em]">
                  {activeHotspot.shortTitle} —{' '}
                  <span className="italic text-[#C7CDD2]">
                    {activeHotspot.subtitle}
                  </span>
                </h3>
                <p className="font-sans-ui text-sm text-[#C7CDD2] font-light leading-relaxed mt-3">
                  {activeHotspot.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#374047]/45 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.18em] text-[#89919A] uppercase">
                <span>{activeHotspot.specNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/AtelierSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const AtelierSection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Restrained parallax <= 8% image movement as specified in master prompt
      gsap.fromTo(
        imageRef.current,
        { yPercent: -3.5, scale: 1.06 },
        {
          yPercent: 3.5,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="savoir-faire"
      ref={sectionRef}
      aria-labelledby="atelier-heading"
      className="relative bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden"
    >
      {/* Anchor alias for ATELIER nav item */}
      <div id="atelier" className="absolute -top-20" aria-hidden="true" />

      <div className="relative min-h-[72svh] md:min-h-[86svh] w-full flex items-end md:items-center overflow-hidden">
        {/* Full-bleed Atelier Photograph */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#111317]">
          {!imgError ? (
            <img
              ref={imageRef}
              src="/templates/aurel/aurel-atelier.webp"
              alt="Watchmaker hands adjusting a mechanical movement with precision tweezers at an horological workbench"
              width={2752}
              height={1536}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-[72%_center] md:object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                03 / SAVOIR-FAIRE — HOROLOGICAL ATELIER
              </span>
            </div>
          )}

          {/* Measured directional scrim on the left negative space to guarantee 4.5:1 legibility while leaving the craftsperson's hands and calibre clear */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A0B0D]/95 via-[#0A0B0D]/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Negative-Space Editorial Content */}
        <div className="relative z-10 aurel-container py-16 md:py-28">
          <div className="max-w-xl space-y-6">
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase">
              03 / SAVOIR-FAIRE
            </p>

            <h2
              id="atelier-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94]"
              style={{
                fontSize: 'clamp(3rem, 6vw, 6.4rem)',
                textWrap: 'balance',
              }}
            >
              MADE WITH INTENTION.
            </h2>

            <p className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light leading-relaxed max-w-md">
              Form is shaped by decisions too small to notice and too important to
              ignore. Every bevel, jewel setting, and brushed surface is finished
              for permanence rather than display.
            </p>

            <div className="pt-3">
              <a
                href="#manifesto"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white font-sans-ui text-xs font-medium tracking-[0.18em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
              >
                <span>OUR PHILOSOPHY</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/CalibrationField.tsx">
<![CDATA['use client';

import React from 'react';

interface CalibrationFieldProps {
  variant?: 'hero' | 'origin' | 'manifesto' | 'cta';
  className?: string;
}

export const CalibrationField: React.FC<CalibrationFieldProps> = ({
  variant = 'hero',
  className = '',
}) => {
  if (variant === 'hero') {
    // Generate 180 precision radial ticks around the main calibration ring (r = 398)
    const ticks = Array.from({ length: 180 }, (_, i) => {
      const angleDeg = i * 2;
      const isMajor = i % 5 === 0;
      const isCardinal = i % 45 === 0;
      const rInner = isCardinal ? 383 : isMajor ? 387 : 390;
      const rOuter = isCardinal ? 403 : 398;
      const rad = (angleDeg * Math.PI) / 180;
      const cx = 720;
      const cy = 480;
      const x1 = cx + rInner * Math.cos(rad);
      const y1 = cy + rInner * Math.sin(rad);
      const x2 = cx + rOuter * Math.cos(rad);
      const y2 = cy + rOuter * Math.sin(rad);
      return {
        key: i,
        x1: x1.toFixed(2),
        y1: y1.toFixed(2),
        x2: x2.toFixed(2),
        y2: y2.toFixed(2),
        opacity: isCardinal ? 0.65 : isMajor ? 0.42 : 0.24,
        strokeWidth: isCardinal ? 1.2 : 0.75,
      };
    });

    // Horizontal ruler graduations across y = 480
    const hGraduations = Array.from({ length: 41 }, (_, i) => {
      const x = 440 + i * 14;
      const isMajor = i % 5 === 0;
      const halfH = isMajor ? 6 : 2.5;
      return { x, halfH, isMajor };
    });

    // Vertical ruler graduations across x = 720
    const vGraduations = Array.from({ length: 33 }, (_, i) => {
      const y = 256 + i * 14;
      const isMajor = i % 4 === 0;
      const halfW = isMajor ? 6 : 2.5;
      return { y, halfW, isMajor };
    });

    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Outermost structural rings matching reference screenshot */}
          <circle
            cx="720"
            cy="480"
            r="650"
            stroke="#374047"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />
          <circle
            cx="720"
            cy="480"
            r="532"
            stroke="#9DB8C9"
            strokeWidth="0.9"
            strokeOpacity="0.34"
          />
          <circle
            cx="720"
            cy="480"
            r="514"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.22"
          />

          {/* Tangential geometric construction lines on left and right arcs */}
          <line
            x1="286"
            y1="195"
            x2="210"
            y2="375"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />
          <line
            x1="192"
            y1="432"
            x2="262"
            y2="564"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="1154"
            y1="195"
            x2="1230"
            y2="375"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />
          <line
            x1="1248"
            y1="432"
            x2="1178"
            y2="564"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />

          {/* Outer calibration tick ring enclosure */}
          <circle
            cx="720"
            cy="480"
            r="410"
            stroke="#374047"
            strokeWidth="0.85"
            strokeOpacity="0.55"
          />
          <circle
            cx="720"
            cy="480"
            r="376"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />

          {/* Rotating subtle tick track */}
          <g className=" origin-[720px_480px] animate-ring-crawl">
            {ticks.map((t) => (
              <line
                key={t.key}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="#C7CDD2"
                strokeWidth={t.strokeWidth}
                strokeOpacity={t.opacity}
              />
            ))}
          </g>

          {/* Secondary offset metrology circle on the left (as seen in hero screenshot) */}
          <circle
            cx="492"
            cy="480"
            r="68"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.28"
          />
          {/* Inner technical ring framing the watch head */}
          <circle
            cx="720"
            cy="480"
            r="236"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.26"
          />
          <circle
            cx="720"
            cy="480"
            r="192"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.35"
          />

          {/* Diagonal axis hairlines through center */}
          <line
            x1="530"
            y1="290"
            x2="910"
            y2="670"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.32"
          />
          <line
            x1="530"
            y1="670"
            x2="910"
            y2="290"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.32"
          />

          {/* Horizontal cardinal axis and fine scale graduations */}
          <line
            x1="108"
            y1="480"
            x2="306"
            y2="480"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="1134"
            y1="480"
            x2="1332"
            y2="480"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="406"
            y1="480"
            x2="1034"
            y2="480"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.24"
          />
          {hGraduations.map((g, idx) => (
            <line
              key={`hg-${idx}`}
              x1={g.x}
              y1={480 - g.halfH}
              x2={g.x}
              y2={480 + g.halfH}
              stroke="#9DB8C9"
              strokeWidth={g.isMajor ? '0.8' : '0.6'}
              strokeOpacity={g.isMajor ? '0.32' : '0.18'}
            />
          ))}

          {/* Vertical axis and fine scale graduations */}
          <line
            x1="720"
            y1="215"
            x2="720"
            y2="765"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.24"
          />
          {vGraduations.map((g, idx) => (
            <line
              key={`vg-${idx}`}
              x1={720 - g.halfW}
              y1={g.y}
              x2={720 + g.halfW}
              y2={g.y}
              stroke="#9DB8C9"
              strokeWidth={g.isMajor ? '0.8' : '0.6'}
              strokeOpacity={g.isMajor ? '0.32' : '0.18'}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'origin') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="600"
            cy="400"
            r="360"
            stroke="#374047"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <circle
            cx="600"
            cy="400"
            r="295"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            strokeDasharray="6 10"
          />
          <line
            x1="120"
            y1="400"
            x2="1080"
            y2="400"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.3"
          />
          <line
            x1="600"
            y1="40"
            x2="600"
            y2="760"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'manifesto') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="500"
            cy="500"
            r="430"
            stroke="#374047"
            strokeWidth="0.9"
            strokeOpacity="0.55"
          />
          <circle
            cx="500"
            cy="500"
            r="392"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.28"
          />
          <path
            d="M 500 50 A 450 450 0 0 1 950 500"
            stroke="#9DB8C9"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <path
            d="M 500 950 A 450 450 0 0 1 50 500"
            stroke="#9DB8C9"
            strokeWidth="1"
            strokeOpacity="0.32"
          />
          {/* Cardinal ticks */}
          <line x1="500" y1="45" x2="500" y2="95" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="500" y1="905" x2="500" y2="955" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="45" y1="500" x2="95" y2="500" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="905" y1="500" x2="955" y2="500" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  // 'cta' incomplete calibration ring
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 190 740 A 410 410 0 1 1 845 710"
          stroke="#9DB8C9"
          strokeWidth="1"
          strokeOpacity="0.38"
        />
        <circle
          cx="500"
          cy="500"
          r="355"
          stroke="#374047"
          strokeWidth="0.75"
          strokeOpacity="0.45"
        />
        <line x1="500" y1="65" x2="500" y2="120" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.55" />
        <line x1="90" y1="500" x2="145" y2="500" stroke="#374047" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="855" y1="500" x2="910" y2="500" stroke="#374047" strokeWidth="0.8" strokeOpacity="0.5" />
      </svg>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/CollectionIntroduction.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { ORIGIN_SPECS } from '../data/collection';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const CollectionIntroduction: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'circle(42% at 50% 50%)', scale: 0.96, opacity: 0.75 },
        {
          clipPath: 'circle(75% at 50% 50%)',
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        textBlockRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      aria-labelledby="origin-heading"
      className="relative py-24 md:py-36 lg:py-44 bg-[#0A0B0D] border-t border-[#374047]/40 overflow-hidden"
    >
      {/* Coordinated Calibration Motif */}
      <CalibrationField
        variant="origin"
        className="absolute inset-0 opacity-65"
      />

      <div className="relative z-10 aurel-container">
        {/* Top Micro Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-8 border-b border-[#374047]/50">
          <span className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase">
            01 / THE COLLECTION
          </span>
          <span className="font-mono-tech text-xs tracking-[0.22em] text-[#89919A] uppercase">
            AU-01 / BRUSHED TITANIUM / BLACK LEATHER
          </span>
        </div>

        {/* Asymmetric Editorial Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-12 md:pt-16">
          {/* Left Editorial Statement overlapping negative space on desktop */}
          <div
            ref={textBlockRef}
            className="lg:col-span-5 z-20 space-y-6 lg:pr-4"
          >
            <h2
              id="origin-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94]"
              style={{
                fontSize: 'clamp(3.4rem, 6.8vw, 7.2rem)',
                textWrap: 'balance',
              }}
            >
              THE ORIGIN.
            </h2>

            <p className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light leading-relaxed max-w-md">
              A mechanical study in considered form. Nothing added without purpose.
              Nothing left unfinished.
            </p>

            <div className="pt-2">
              <a
                href="#anatomy"
                className="group inline-flex items-center gap-3 py-3 px-6 rounded-full border border-[#374047] hover:border-[#9DB8C9] bg-[#111317]/90 text-[#F0ECE5] font-sans-ui text-xs tracking-[0.2em] uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                <span>EXPLORE THE DETAILS</span>
                <span
                  aria-hidden="true"
                  className="text-[#9DB8C9] group-hover:translate-y-0.5 transition-transform"
                >
                  ↓
                </span>
              </a>
            </div>

            {/* Concept Specification Rail */}
            <dl className="pt-8 border-t border-[#374047]/55 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {ORIGIN_SPECS.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <dt className="font-mono-tech text-[10px] tracking-[0.22em] text-[#89919A] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-sans-ui text-xs md:text-sm text-[#F0ECE5] font-normal">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Oversized Sculptural Still-Life Stage */}
          <div className="lg:col-span-7 relative">
            <div
              ref={imageWrapRef}
              className="relative aspect-[16/10] w-full overflow-hidden bg-[#111317] border border-[#374047]/45"
            >
              {!imgError ? (
                <img
                  src="/templates/aurel/aurel-still-life.webp"
                  alt="AUREL Origin watch resting on a dark brushed monolith in three-quarter studio lighting"
                  width={2752}
                  height={1536}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                    AUREL ORIGIN COLLECTION — ARCHITECTURAL STUDY
                  </span>
                </div>
              )}

              {/* Subtle edge falloff scrim */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0B0D]/60 via-transparent to-[#0A0B0D]/30"
                aria-hidden="true"
              />

              {/* Corner coordinate reticle */}
              <div
                className="pointer-events-none absolute bottom-4 right-5 font-mono-tech text-[10px] tracking-[0.22em] text-[#C7CDD2]/80 uppercase"
                aria-hidden="true"
              >
                FIG. 00 / SCULPTURAL STILL LIFE · REF. AU-01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/Footer.tsx">
<![CDATA['use client';

import React from 'react';
import { NAV_ITEMS } from '../data/collection';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#0A0B0D] border-t border-[#374047]/65 pt-16 md:pt-24 pb-12"
    >
      <div className="aurel-container">
        {/* Top Row: Large AUREL Live Wordmark & Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-[#374047]/50">
          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              INDEPENDENT HOROLOGY CONCEPT / COLLECTION 01
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onBackToTop();
              }}
              className="font-display font-normal text-[#F0ECE5] tracking-[0.28em] uppercase leading-none block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6.8rem)' }}
            >
              AUREL
            </a>
          </div>

          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#374047] hover:border-[#9DB8C9] text-xs font-mono-tech tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        {/* Middle Row: Real Page Anchor Navigation & Collection Note */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#374047]/40">
          <nav
            aria-label="Footer Section Navigation"
            className="md:col-span-7 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#anatomy"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              CALIBRE AU-01
            </a>
            <a
              href="#gallery"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              GALLERY
            </a>
            <a
              href="#private-viewing"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              PRIVATE ENQUIRIES
            </a>
          </nav>

          <div className="md:col-span-5 md:text-right">
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#89919A] uppercase">
              THE ORIGIN COLLECTION — CALIBRE AU-01 · 42MM TITANIUM
            </p>
          </div>
        </div>

        {/* Bottom Row: Concept Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-sans-ui text-[#89919A]">
          <p>
            AUREL is a fictional independent horology brand and design-concept
            website template. Specifications (Calibre AU-01, 42mm Brushed Titanium,
            Edition No. 01–50) are conceptual editorial details, not commercial
            manufacturing claims.
          </p>
          <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase whitespace-nowrap shrink-0">
            COLLECTION 01 · CONCEPT ARCHIVE
          </span>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/GallerySection.tsx">
<![CDATA['use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  GALLERY_SLIDES,
  getAdjacentGalleryIndex,
  formatGalleryProgress,
} from '../data/collection';
import { useMotionSetting } from './MotionProvider';

export const GallerySection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const currentSlide = GALLERY_SLIDES[activeIndex];

  const selectSlide = (nextIdx: number, dir?: 'next' | 'prev') => {
    if (nextIdx === activeIndex) return;
    const resolvedDir = dir ?? (nextIdx > activeIndex ? 'next' : 'prev');
    setDirection(resolvedDir);
    setActiveIndex(nextIdx);
  };

  const handleStep = (dir: 'next' | 'prev') => {
    setDirection(dir);
    setActiveIndex((prev) => getAdjacentGalleryIndex(prev, dir));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleStep('next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleStep('prev');
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    if (Math.abs(deltaX) > 42) {
      handleStep(deltaX < 0 ? 'next' : 'prev');
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="gallery"
      onKeyDown={handleKeyDown}
      aria-labelledby="gallery-heading"
      className="relative py-24 md:py-36 bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden"
    >
      <div className="aurel-container">
        {/* Top Bar: Eyebrow, Title & Interactive Tab Rail */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#374047]/55">
          <div>
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              OBJECT / MATERIAL / MOVEMENT
            </p>
            <h2
              id="gallery-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.95]"
              style={{
                fontSize: 'clamp(2.6rem, 5.2vw, 5.6rem)',
                textWrap: 'balance',
              }}
            >
              STUDIES IN MATTER.
            </h2>
          </div>

          {/* 3 Real Interactive Tabs */}
          <div
            role="tablist"
            aria-label="Product Detail Gallery Studies"
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {GALLERY_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  role="tab"
                  id={`gallery-tab-${slide.id}`}
                  aria-selected={isSelected}
                  aria-controls={`gallery-panel-${slide.id}`}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className={`px-5 py-3 border font-mono-tech text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9] ${
                    isSelected
                      ? 'bg-[#F1EEE9] text-[#0A0B0D] border-[#F1EEE9] font-medium'
                      : 'bg-[#111317] text-[#C7CDD2] border-[#374047]/80 hover:border-[#9DB8C9] hover:text-[#F0ECE5]'
                  }`}
                >
                  {slide.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Gallery Stage: Large Image Region + Deliberate Typographic Rail */}
        <div
          id={`gallery-panel-${currentSlide.id}`}
          role="tabpanel"
          aria-labelledby={`gallery-tab-${currentSlide.id}`}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch"
        >
          {/* Large Image Viewport (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative aspect-[4/3] w-full bg-[#111317] border border-[#374047]/60 overflow-hidden select-none"
            >
              {GALLERY_SLIDES.map((slide, idx) => {
                const isCurrent = idx === activeIndex;
                const translateClass = reducedMotion
                  ? ''
                  : isCurrent
                  ? 'translate-x-0 scale-100'
                  : direction === 'next'
                  ? '-translate-x-[3%] scale-[1.02]'
                  : 'translate-x-[3%] scale-[1.02]';

                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isCurrent}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isCurrent
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none'
                    } ${translateClass}`}
                  >
                    {!imgErrors[slide.id] ? (
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={2400}
                        height={1792}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [slide.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 text-center">
                        <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                          {slide.caption}
                        </span>
                      </div>
                    )}

                    {/* Subtle technical frame overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/65 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                );
              })}

              {/* Corner Metrology Overlay */}
              <div className="pointer-events-none absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.2em] text-[#C7CDD2] uppercase">
                <span>{currentSlide.caption}</span>
                <span>{formatGalleryProgress(activeIndex)}</span>
              </div>
            </div>

            {/* Gallery Controls & Progress Bar */}
            <div className="mt-5 flex items-center justify-between gap-6 pt-2">
              <div className="flex items-center gap-4">
                <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9]">
                  {formatGalleryProgress(activeIndex)}
                </span>
                <div className="w-32 sm:w-48 h-[1px] bg-[#374047] relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#9DB8C9] transition-all duration-500"
                    style={{
                      width: `${((activeIndex + 1) / GALLERY_SLIDES.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStep('prev')}
                  aria-label="Previous gallery study"
                  className="w-11 h-11 border border-[#374047] hover:border-[#9DB8C9] bg-[#111317] text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep('next')}
                  aria-label="Next gallery study"
                  className="w-11 h-11 border border-[#374047] hover:border-[#9DB8C9] bg-[#111317] text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Deliberate Typographic Rail (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#374047]/55 pt-8 lg:pt-0 lg:pl-10">
            <div className="space-y-5">
              <p className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9] uppercase">
                {currentSlide.subtitle}
              </p>

              <h3 className="font-display text-3xl md:text-4xl text-[#F0ECE5] font-normal leading-[1.08]">
                {currentSlide.heading}
              </h3>

              <p className="font-sans-ui text-sm md:text-base text-[#C7CDD2] font-light leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            <dl className="mt-10 pt-6 border-t border-[#374047]/55 space-y-5">
              {currentSlide.specs.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <dt className="font-mono-tech text-[10px] tracking-[0.22em] text-[#89919A] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="font-sans-ui text-sm text-[#F0ECE5]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/Header.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../data/collection';

interface HeaderProps {
  onOpenPrivateViewing: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrivateViewing }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#0A0B0D]/85 backdrop-blur-md border-b border-[#374047]/65'
            : 'bg-transparent border-b border-[#374047]/45'
        }`}
      >
        <div className="aurel-container h-[72px] md:h-[82px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-[1.35rem] md:text-[1.6rem] font-normal tracking-[0.26em] text-[#F0ECE5] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            AUREL
          </a>

          {/* Zone 2: Centered Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-10 xl:gap-12"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans-ui text-[11px] font-normal tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors py-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Menu Trigger matching approved screenshot */}
          <div className="flex items-center shrink-0">
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="aurel-index-drawer"
              aria-label="Open navigation menu"
              className="group inline-flex items-center gap-2.5 py-2.5 pl-3 pr-1 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
            >
              <span className="w-6 h-6 rounded-full border border-[#89919A]/60 group-hover:border-[#F0ECE5] flex flex-col items-center justify-center gap-[3px] transition-colors">
                <span className="w-2.5 h-[1px] bg-current" />
                <span className="w-2.5 h-[1px] bg-current" />
              </span>
              <span className="font-sans-ui text-[11px] tracking-[0.22em] uppercase">
                MENU
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Accessible Navigation Drawer */}
      {menuOpen && (
        <div
          id="aurel-index-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="AUREL Chapter Navigation"
          className="fixed inset-0 z-50 bg-[#0A0B0D]/95 backdrop-blur-lg flex flex-col justify-between"
        >
          <div className="aurel-container h-[72px] md:h-[82px] flex items-center justify-between border-b border-[#374047]/55">
            <a
              href="#top"
              onClick={handleNavClick}
              className="font-display text-[1.35rem] md:text-[1.6rem] tracking-[0.26em] text-[#F0ECE5] whitespace-nowrap shrink-0"
            >
              AUREL
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuTriggerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center gap-2.5 py-2.5 px-3 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
            >
              <span className="w-6 h-6 rounded-full border border-[#89919A]/60 flex items-center justify-center">
                <X className="w-3.5 h-3.5" />
              </span>
              <span className="font-sans-ui text-[11px] tracking-[0.22em] uppercase">
                CLOSE
              </span>
            </button>
          </div>

          <div className="aurel-container flex-1 flex flex-col justify-center py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7 space-y-5">
                <p className="font-mono-tech text-[11px] tracking-[0.26em] text-[#9DB8C9] uppercase">
                  INDEX / COLLECTION 01 — THE ORIGIN
                </p>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    { num: '01', title: 'THE ORIGIN COLLECTION', href: '#collections' },
                    { num: '02', title: 'INSIDE THE CALIBRE (ANATOMY)', href: '#anatomy' },
                    { num: '03', title: 'OBJECT, MATERIAL & MOVEMENT', href: '#gallery' },
                    { num: '04', title: 'SAVOIR-FAIRE & ATELIER', href: '#savoir-faire' },
                    { num: '05', title: 'THE MANIFESTO', href: '#manifesto' },
                    { num: '06', title: 'PRIVATE VIEWING ENQUIRIES', href: '#private-viewing' },
                  ].map((item) => (
                    <li key={item.num} className="border-b border-[#374047]/40 pb-3">
                      <a
                        href={item.href}
                        onClick={handleNavClick}
                        className="group flex items-baseline justify-between gap-4 text-[#F0ECE5] hover:text-[#9DB8C9] transition-colors"
                      >
                        <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.04em]">
                          {item.title}
                        </span>
                        <span className="font-mono-tech text-xs tracking-[0.22em] text-[#89919A] group-hover:text-[#9DB8C9]">
                          {item.num} ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#374047]/55 pt-8 lg:pt-0 lg:pl-12 space-y-6">
                <div className="space-y-2">
                  <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#89919A] uppercase">
                    SPECIFICATION SUMMARY
                  </p>
                  <p className="font-sans-ui text-sm text-[#C7CDD2] leading-relaxed">
                    Calibre AU-01 Concept · 42mm Grade 5 Brushed Titanium · 50-Hour Autonomous Power Reserve · Edition Concept No. 01–50.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenPrivateViewing();
                    }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#F1EEE9] text-[#0A0B0D] font-sans-ui text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>REQUEST A PRIVATE VIEWING</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="aurel-container py-5 border-t border-[#374047]/45 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono-tech tracking-[0.2em] text-[#89919A]">
            <span>AUREL INDEPENDENT HOROLOGY CONCEPT</span>
            <span>COLLECTION 01 — THE ORIGIN</span>
          </div>
        </div>
      )}
    </>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/Hero.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { WatchStage } from './WatchStage';
import { HERO_METADATA } from '../data/collection';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const headlineGroupRef = useRef<HTMLDivElement>(null);
  const watchWrapRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Measured Hero Entry Choreography
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        ringsRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.35 },
        0
      )
        .fromTo(
          watchWrapRef.current,
          { opacity: 0, scale: 0.94, y: 18 },
          { opacity: 1, scale: 1, y: 0, duration: 1.25 },
          0.18
        )
        .fromTo(
          '.hero-line-reveal',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.95, stagger: 0.12 },
          0.32
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.65
        );

      // 2. Reversible Scroll Handoff toward Section 02
      gsap.to(headlineGroupRef.current, {
        yPercent: -24,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(watchWrapRef.current, {
        scale: 1.07,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(ringsRef.current, {
        scale: 1.09,
        opacity: 0.45,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="AUREL Origin Collection Hero"
      className="relative min-h-[100svh] w-full hero-radial-stage flex flex-col justify-between overflow-hidden pt-[88px] md:pt-[102px] pb-5 md:pb-7"
    >
      {/* Precision SVG Calibration Rings & Metrology Axes */}
      <div ref={ringsRef} className="absolute inset-0 z-0">
        <CalibrationField variant="hero" className="w-full h-full" />
      </div>

      {/* Top-Center Editorial Statement */}
      <div
        ref={headlineGroupRef}
        className="relative z-20 aurel-container flex flex-col items-center text-center mt-1 md:mt-2"
      >
        <p className="hero-line-reveal font-sans-ui text-[11px] sm:text-xs md:text-[13px] tracking-[0.26em] text-[#9DB8C9] uppercase mb-2">
          {HERO_METADATA.eyebrow}
        </p>

        <h1
          className="hero-line-reveal font-display font-normal text-[#F0ECE5] tracking-[0.02em] leading-[0.94] uppercase"
          style={{
            fontSize: 'clamp(2.5rem, 6.2vw, 6.1rem)',
            textWrap: 'balance',
          }}
        >
          {HERO_METADATA.heading}
        </h1>

        <p
          className="hero-line-reveal font-display text-base sm:text-lg md:text-[1.35rem] text-[#C7CDD2] font-normal tracking-[0.01em] mt-2 md:mt-2.5 max-w-2xl"
          style={{ textWrap: 'balance' }}
        >
          {HERO_METADATA.subtitle}
        </p>
      </div>

      {/* Central Watch Stage — Visual Center of the Hero with clear breathing room below subtitle */}
      <div
        ref={watchWrapRef}
        className="relative z-10 w-full flex-1 flex items-center justify-center mt-4 md:mt-6 mb-1 px-4"
      >
        <WatchStage className="w-[280px] sm:w-[390px] md:w-[490px] lg:w-[560px] xl:w-[610px] max-h-[41svh] md:max-h-[46svh] lg:max-h-[48svh]" />
      </div>

      {/* Lower-Center CTA & Technical Metadata Rail */}
      <div ref={ctaGroupRef} className="relative z-20 w-full mt-auto">
        <div className="aurel-container flex flex-col items-center">
          <span className="font-sans-ui text-[10px] md:text-[11px] tracking-[0.24em] text-[#89919A] uppercase mb-2.5">
            {HERO_METADATA.nearWatchLabel}
          </span>

          {/* Horizontal hairline passing behind the centered CTA button, exactly as in the reference screenshot */}
          <div className="relative w-full flex items-center justify-center">
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#374047]/65"
              aria-hidden="true"
            />
            <a
              href="#collections"
              className="relative z-10 inline-flex items-center justify-center gap-2.5 px-7 md:px-8 py-3 md:py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] font-sans-ui text-[11px] md:text-xs font-medium tracking-[0.18em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
            >
              <span>{HERO_METADATA.ctaLabel}</span>
              <span aria-hidden="true" className="text-xs leading-none">
                ↗
              </span>
            </a>
          </div>

          {/* Lower Left & Lower Right Technical Captions */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 pt-3 text-[10px] md:text-[11px] font-mono-tech tracking-[0.13em] sm:tracking-[0.18em] text-[#89919A] uppercase">
            <div className="text-center sm:text-left">
              <span className="whitespace-nowrap">CALIBRE AU-01</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">42MM BRUSHED TITANIUM</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">50-HOUR RESERVE</span>
            </div>
            <div className="text-center sm:text-right">
              <span className="whitespace-nowrap">LIMITED EDITION</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">COLLECTION 01</span>
              <span className="mx-1.5 text-[#374047]">/</span>
              <span className="whitespace-nowrap">NO. 01–50</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/ManifestoSection.tsx">
<![CDATA['use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalibrationField } from './CalibrationField';
import { useMotionSetting } from './MotionProvider';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_WORDS = ['NOT', 'MORE', 'TIME.', 'BETTER', 'TIME.'];

export const ManifestoSection: React.FC = () => {
  const { reducedMotion } = useMotionSetting();
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto-word',
        { opacity: 0.18, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            end: 'center center',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ringRef.current,
        { rotate: -14, scale: 0.95 },
        {
          rotate: 14,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-heading"
      className="relative py-32 md:py-48 lg:py-56 bg-[#0A0B0D] border-t border-[#374047]/45 overflow-hidden flex items-center justify-center"
    >
      {/* Off-center vertical index rule establishing deliberate tension */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-[22%] lg:left-[28%] w-[1px] bg-[#374047]/35"
        aria-hidden="true"
      />

      {/* Giant fine-line outlined circular instrument behind the statement */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute w-[540px] h-[540px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px] flex items-center justify-center"
      >
        <CalibrationField variant="manifesto" className="w-full h-full" />
      </div>

      <div className="relative z-10 aurel-container flex flex-col items-center text-center">
        <p className="font-mono-tech text-xs tracking-[0.26em] text-[#9DB8C9] uppercase mb-6">
          04 / THE MANIFESTO
        </p>

        <h2
          id="manifesto-heading"
          className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94] max-w-5xl flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2"
          style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 8.4rem)',
          }}
        >
          {MANIFESTO_WORDS.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className={`manifesto-word inline-block ${
                word === 'BETTER' ? 'italic text-[#9DB8C9]' : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h2>

        <p
          className="font-sans-ui text-base sm:text-lg md:text-xl text-[#C7CDD2] font-light leading-relaxed max-w-2xl mt-8 md:mt-10"
          style={{ textWrap: 'balance' }}
        >
          We believe true luxury lies in attention—in the things we choose to make
          and the moments we choose to keep.
        </p>

        <div className="mt-10 flex items-center gap-4 text-[11px] font-mono-tech tracking-[0.22em] text-[#89919A] uppercase">
          <span>HOROLOGICAL CONCEPT 01</span>
          <span aria-hidden="true">·</span>
          <span>MEASURED PERMANENCE</span>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/MotionProvider.tsx">
<![CDATA['use client';

import React, { createContext, useContext, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface MotionContextValue {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({ reducedMotion: false });

export function useMotionSetting(): MotionContextValue {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/PrivateViewing.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CalibrationField } from './CalibrationField';
import {
  InquiryFormInput,
  validatePrivateViewingInquiry,
} from '../data/collection';

interface PrivateViewingProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const PrivateViewing: React.FC<PrivateViewingProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
}) => {
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<InquiryFormInput>({
    name: '',
    email: '',
    city: 'Geneva Salon Concept',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});
  const [demoValidatedRecord, setDemoValidatedRecord] =
    useState<InquiryFormInput | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseModal();
        triggerBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, onCloseModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validatePrivateViewingInquiry(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setDemoValidatedRecord(null);
      return;
    }
    setErrors({});
    setDemoValidatedRecord({
      name: formState.name.trim(),
      email: formState.email.trim(),
      city: formState.city.trim(),
      message: formState.message.trim(),
    });
  };

  const handleResetDemoForm = () => {
    setDemoValidatedRecord(null);
    setErrors({});
    setFormState({
      name: '',
      email: '',
      city: 'Geneva Salon Concept',
      message: '',
    });
  };

  const handleReturnToOrigin = () => {
    onCloseModal();
    const el = document.getElementById('top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="private-viewing"
      aria-labelledby="private-viewing-heading"
      className="relative py-28 md:py-40 bg-[#111317] border-t border-[#374047]/45 overflow-hidden"
    >
      {/* Dramatic Incomplete Calibration Ring Enclosing the Composition */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <CalibrationField
          variant="cta"
          className="w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] md:w-[820px] md:h-[820px]"
        />
      </div>

      <div className="relative z-10 aurel-container flex flex-col items-center text-center">
        <p className="font-mono-tech text-xs tracking-[0.26em] text-[#9DB8C9] uppercase mb-4">
          05 / PRIVATE ENQUIRIES
        </p>

        <h2
          id="private-viewing-heading"
          className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.94] max-w-4xl"
          style={{
            fontSize: 'clamp(3rem, 6.2vw, 6.8rem)',
            textWrap: 'balance',
          }}
        >
          SOME THINGS DESERVE TIME.
        </h2>

        <p
          className="font-sans-ui text-base md:text-lg text-[#C7CDD2] font-light max-w-xl mt-4"
          style={{ textWrap: 'balance' }}
        >
          A closer look at the Origin Collection begins with a conversation.
        </p>

        {/* Centered Editorial Watch Close-Up */}
        <div className="relative my-10 md:my-12 w-[250px] sm:w-[310px] md:w-[370px] aspect-square flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-6 rounded-full bg-radial from-[#9DB8C9]/12 via-transparent to-transparent blur-2xl"
            aria-hidden="true"
          />
          {!imgError ? (
            <img
              src="/templates/aurel/aurel-hero-watch.png"
              alt="AUREL Origin Collection 01 watch in brushed titanium"
              width={1140}
              height={1046}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-[0_24px_44px_rgba(0,0,0,0.9)]"
            />
          ) : (
            <div className="w-48 h-48 rounded-full border border-[#374047] flex items-center justify-center">
              <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                ORIGIN 01
              </span>
            </div>
          )}
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            ref={triggerBtnRef}
            type="button"
            onClick={onOpenModal}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white transition-colors font-sans-ui text-xs font-medium tracking-[0.18em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9DB8C9]"
          >
            <span>REQUEST A PRIVATE VIEWING</span>
            <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            onClick={handleReturnToOrigin}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-[#374047] hover:border-[#9DB8C9] bg-[#0A0B0D]/80 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors font-sans-ui text-xs tracking-[0.18em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            <span>RETURN TO THE ORIGIN</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        <p className="mt-6 font-mono-tech text-[10px] tracking-[0.2em] text-[#89919A] uppercase">
          DEMO TEMPLATE DISCLOSURE · FICTIONAL HOROLOGY CONCEPT · NO COMMERCIAL TRANSACTIONS
        </p>
      </div>

      {/* Accessible Private Viewing Inquiry Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          aria-describedby="inquiry-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0B0D]/85 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onCloseModal();
              triggerBtnRef.current?.focus();
            }
          }}
        >
          <div className="relative w-full max-w-xl bg-[#111317] border border-[#374047] p-6 sm:p-9 shadow-[0_32px_80px_rgba(0,0,0,0.9)] max-h-[92svh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#374047]/60">
              <div>
                <p className="font-mono-tech text-[10px] tracking-[0.24em] text-[#9DB8C9] uppercase">
                  05 / PRIVATE VIEWING ENQUIRY (DEMO)
                </p>
                <h3
                  id="inquiry-modal-title"
                  className="font-display text-2xl sm:text-3xl text-[#F0ECE5] font-normal mt-1"
                >
                  THE ORIGIN COLLECTION — CALIBRE AU-01
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  onCloseModal();
                  triggerBtnRef.current?.focus();
                }}
                aria-label="Close private viewing inquiry modal"
                className="w-10 h-10 border border-[#374047] hover:border-[#9DB8C9] text-[#C7CDD2] hover:text-[#F0ECE5] flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p
              id="inquiry-modal-desc"
              className="mt-4 font-sans-ui text-xs sm:text-sm text-[#C7CDD2] font-light leading-relaxed"
            >
              This interactive form is a <strong className="text-[#F0ECE5] font-medium">design-concept template demonstration</strong>. Inputs are validated locally in your browser; no message is transmitted to a live manufacturer or concierge service.
            </p>

            {demoValidatedRecord ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 p-6 bg-[#0A0B0D] border border-[#9DB8C9]/55 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#374047]/60 pb-3">
                  <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9] uppercase">
                    LOCAL DEMO VALIDATION COMPLETE
                  </span>
                  <span className="font-mono-tech text-[10px] tracking-[0.18em] text-[#89919A] uppercase">
                    NO NETWORK TRANSMISSION
                  </span>
                </div>

                <p className="font-sans-ui text-sm text-[#F0ECE5] leading-relaxed">
                  Thank you, <span className="text-[#9DB8C9]">{demoValidatedRecord.name}</span>. Your inquiry details have been validated locally for this fictional horology template preview. Because AUREL is a design concept rather than an active commercial manufacture, no email or booking request has been sent.
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono-tech text-[#C7CDD2]">
                  <div>
                    <dt className="text-[10px] text-[#89919A] uppercase">CORRESPONDENCE</dt>
                    <dd className="mt-0.5 truncate">{demoValidatedRecord.email}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-[#89919A] uppercase">CONCEPT LOCATION</dt>
                    <dd className="mt-0.5">{demoValidatedRecord.city}</dd>
                  </div>
                </dl>

                <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetDemoForm}
                    className="px-5 py-2.5 border border-[#374047] hover:border-[#9DB8C9] text-xs font-mono-tech tracking-[0.18em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors cursor-pointer"
                  >
                    EDIT DEMO INPUTS
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseModal();
                      triggerBtnRef.current?.focus();
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] text-xs font-sans-ui font-medium tracking-[0.18em] uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    CLOSE PREVIEW
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                  >
                    FULL NAME *
                  </label>
                  <input
                    ref={firstInputRef}
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g. Henri Meylan"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                    className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                  />
                  {errors.name && (
                    <p
                      id="inquiry-name-error"
                      role="alert"
                      className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@domain.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? 'inquiry-email-error' : undefined
                      }
                      className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="inquiry-email-error"
                        role="alert"
                        className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-city"
                      className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                    >
                      PREFERRED SETTING (CONCEPT)
                    </label>
                    <select
                      id="inquiry-city"
                      name="city"
                      value={formState.city}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] focus:outline-none"
                    >
                      <option value="Geneva Salon Concept">Geneva Salon Concept</option>
                      <option value="Zurich Private Study">Zurich Private Study</option>
                      <option value="Paris Place Vendôme Concept">Paris Concept Suite</option>
                      <option value="Tokyo Aoyama Study">Tokyo Aoyama Study</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block font-mono-tech text-[11px] tracking-[0.2em] text-[#C7CDD2] uppercase mb-2"
                  >
                    ENQUIRY NOTE *
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Share your interest in inspecting the Origin Collection 01 concept..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'inquiry-message-error' : undefined
                    }
                    className="w-full px-4 py-3 bg-[#0A0B0D] border border-[#374047] focus:border-[#9DB8C9] text-sm text-[#F0ECE5] placeholder-[#89919A]/55 focus:outline-none"
                  />
                  {errors.message && (
                    <p
                      id="inquiry-message-error"
                      role="alert"
                      className="mt-1.5 font-mono-tech text-[11px] text-[#9DB8C9]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#374047]/60">
                  <span className="font-mono-tech text-[10px] tracking-[0.18em] text-[#89919A] uppercase">
                    DEMO ONLY — VALIDATES LOCALLY WITHOUT SENDING
                  </span>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-[#F1EEE9] text-[#0A0B0D] hover:bg-white font-sans-ui text-xs font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    VALIDATE DEMO ENQUIRY ↗
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/components/WatchStage.tsx">
<![CDATA['use client';

import React, { useRef, useState } from 'react';
import { useMotionSetting } from './MotionProvider';

interface WatchStageProps {
  className?: string;
}

export const WatchStage: React.FC<WatchStageProps> = ({ className = '' }) => {
  const { reducedMotion } = useMotionSetting();
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [imgError, setImgError] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    // Constrain angular response to maximum ~2.5 degrees as specified in brief
    setTilt({
      rx: Number((-ny * 2.4).toFixed(2)),
      ry: Number((nx * 2.6).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        <div className={`w-full h-full flex items-center justify-center ${reducedMotion ? '' : 'animate-watch-float'}`}>
          {!imgError ? (
            <img
              src="/templates/aurel/aurel-hero-watch.png"
              alt="AUREL Origin Collection 01 — 42mm brushed titanium skeleton-dial mechanical watch with black leather strap"
              width={1140}
              height={1046}
              fetchPriority="high"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.85)]"
            />
          ) : (
            <div className="w-72 h-72 rounded-full border border-[#374047] bg-[#111317] flex flex-col items-center justify-center text-center p-6">
              <span className="font-mono-tech text-xs tracking-[0.22em] text-[#9DB8C9]">
                CALIBRE AU-01
              </span>
              <span className="font-display text-2xl text-[#F0ECE5] mt-2">
                THE ORIGIN COLLECTION
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(aurel)/aurel/data/collection.ts">
<![CDATA[export interface AnatomyHotspot {
  id: string;
  index: string;
  label: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  specNote: string;
  frequencyOrMetric: string;
  /** Percentage coordinates (0-100) on the 16:9 exploded movement canvas */
  markerX: number;
  markerY: number;
  /** Percentage coordinates for the outer annotation callout anchor */
  calloutX: number;
  calloutY: number;
  align: 'left' | 'right';
}

export interface GallerySlide {
  id: 'dial' | 'case' | 'movement';
  index: string;
  tabLabel: string;
  subtitle: string;
  heading: string;
  caption: string;
  description: string;
  image: string;
  imageAlt: string;
  aspectRatio: string;
  specs: Array<{ label: string; value: string }>;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  city: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export const NAV_ITEMS = [
  { label: 'COLLECTIONS', href: '#collections', sectionId: 'collections' },
  { label: 'SAVOIR-FAIRE', href: '#savoir-faire', sectionId: 'savoir-faire' },
  { label: 'MANIFESTO', href: '#manifesto', sectionId: 'manifesto' },
  { label: 'ATELIER', href: '#atelier', sectionId: 'atelier' },
] as const;

export const HERO_METADATA = {
  eyebrow: 'INDEPENDENT HOROLOGY / COLLECTION 01',
  heading: 'TIME, REIMAGINED.',
  subtitle: 'An exploration of precision, permanence, and the art of making time.',
  nearWatchLabel: 'THE ORIGIN COLLECTION',
  ctaLabel: 'EXPLORE THE COLLECTION',
  leftCaption: 'CALIBRE AU-01 / 42MM BRUSHED TITANIUM / 50-HOUR RESERVE',
  rightCaption: 'LIMITED EDITION / COLLECTION 01 / NO. 01–50',
} as const;

export const ORIGIN_SPECS = [
  { label: 'CALIBRE', value: 'AU-01 Manual Architecture' },
  { label: 'CASE MATERIAL', value: 'Grade 5 Brushed Titanium' },
  { label: 'DIMENSIONS', value: '42.0 mm Diameter · 9.8 mm Profile' },
  { label: 'POWER RESERVE', value: '50 Hours Autonomous Tension' },
  { label: 'STRAP', value: 'Hand-Stitched Matte Black Calfskin' },
  { label: 'EDITION CONCEPT', value: 'Collection 01 · Numbered 01–50' },
] as const;

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'escapement',
    index: '01',
    label: '01 / THE ESCAPEMENT',
    shortTitle: 'THE ESCAPEMENT',
    subtitle: 'Regulating motion.',
    description:
      'Positioned within the lower openworked plane, the escapement meters stored mainspring torque into exact, audible impulses without ornamental excess.',
    specNote: 'OPENWORKED IMPULSE STAGE · LOW-MASS GEOMETRY',
    frequencyOrMetric: '21,600 VPH / 3.0 HZ CONCEPT',
    markerX: 46,
    markerY: 53,
    calloutX: 16,
    calloutY: 30,
    align: 'left',
  },
  {
    id: 'balance',
    index: '02',
    label: '02 / THE BALANCE',
    shortTitle: 'THE BALANCE',
    subtitle: 'A study in rhythm.',
    description:
      'Suspended beneath a twin-arm titanium bridge at six o’clock, the free-sprung balance wheel oscillates with steady isochronous poise.',
    specNote: 'FREE-SPRUNG OSCILLATOR · TWIN-POINT SUSPENSION',
    frequencyOrMetric: 'ISOCHRONOUS ARC ±1.5°',
    markerX: 52,
    markerY: 59,
    calloutX: 16,
    calloutY: 74,
    align: 'left',
  },
  {
    id: 'gear-train',
    index: '03',
    label: '03 / THE GEAR TRAIN',
    shortTitle: 'THE GEAR TRAIN',
    subtitle: 'Movement transmitted through form.',
    description:
      'Circular-grained wheels and chamfered pinions align along a deliberate central axis, turning mechanical necessity into visible depth.',
    specNote: 'COAXIAL TORQUE TRANSMISSION · CIRCULAR GRAINING',
    frequencyOrMetric: '50-HOUR BARREL COUPLE',
    markerX: 57,
    markerY: 32,
    calloutX: 84,
    calloutY: 26,
    align: 'right',
  },
  {
    id: 'bridges',
    index: '04',
    label: '04 / THE BRIDGES',
    shortTitle: 'THE BRIDGES',
    subtitle: 'Structure, symmetry, and stability.',
    description:
      'Matte anthracite mainplates and hand-beveled architectural bridges anchor the calibre while admitting light across every recessed bevel.',
    specNote: 'BEVELED ANTHRACITE BRIDGES · HEAT-BLUED SCREWS',
    frequencyOrMetric: '4-PLANE RIGID CHASSIS',
    markerX: 63,
    markerY: 46,
    calloutX: 84,
    calloutY: 72,
    align: 'right',
  },
];

export const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'dial',
    index: '01',
    tabLabel: '01 / DIAL',
    subtitle: 'OBJECT / ARCHITECTURAL APERTURE',
    heading: 'Skeletonized depth with ice-blue indices.',
    caption: 'FIG. 01 — OPENWORKED DIAL & APPLIED LUMINOUS BATONS',
    description:
      'The dial dispenses with a traditional opaque surface. Brushed anthracite bridges frame the barrel, gear train, and balance wheel, while faceted baton markers and syringe hands in cool steel-blue provide instantaneous legibility.',
    image: '/templates/aurel/aurel-dial-macro.webp',
    imageAlt: 'Macro study of the AUREL Origin skeleton dial, faceted ice-blue hour indices, and exposed mechanical calibre',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'DIAL ARCHITECTURE', value: 'Multi-level openworked anthracite' },
      { label: 'INDICES & HANDS', value: 'Diamond-cut steel with ice-blue tone' },
      { label: 'CRYSTAL', value: 'Box-domed sapphire, dual anti-reflective' },
    ],
  },
  {
    id: 'case',
    index: '02',
    tabLabel: '02 / CASE',
    subtitle: 'MATERIAL / GRADE 5 TITANIUM',
    heading: 'Linear satin brushing against polished bevels.',
    caption: 'FIG. 02 — 42MM TITANIUM CASE PROFILE & KNURLED CROWN',
    description:
      'Sculpted from solid Grade 5 titanium, the 42mm case balances Featherweight ergonomics with architectural presence. Continuous longitudinal brushing meets a single mirror-polished chamfer running from lug tip to lug tip.',
    image: '/templates/aurel/aurel-case-side.webp',
    imageAlt: 'Three-quarter profile of the AUREL brushed titanium watch case, polished lug chamfer, and fluted crown',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'CASE ALLOY', value: 'Grade 5 Titanium (Ti-6Al-4V concept)' },
      { label: 'SURFACE FINISH', value: 'Longitudinal satin brush & hand-beveled edge' },
      { label: 'CROWN', value: 'Fluted titanium with etched radial emblem' },
    ],
  },
  {
    id: 'movement',
    index: '03',
    tabLabel: '03 / MOVEMENT',
    subtitle: 'MOVEMENT / CALIBRE AU-01 CASEBACK',
    heading: 'Every component finished on both sides.',
    caption: 'FIG. 03 — EXHIBITION SAPPHIRE CASEBACK & BARREL RATCHET',
    description:
      'Seen through the exhibition sapphire caseback, Calibre AU-01 reveals sunray-brushed winding wheels, thermally blued screws, ruby jewel sinks, and bead-blasted bridges engineered for visual quietude.',
    image: '/templates/aurel/aurel-caseback.webp',
    imageAlt: 'Exhibition caseback of the AUREL Origin watch showing the mechanical movement, blued screws, and balance assembly',
    aspectRatio: '2400 / 1792',
    specs: [
      { label: 'CALIBRE DESIGNATION', value: 'AU-01 Concept Mechanical' },
      { label: 'FASTENERS & JEWELS', value: 'Blued steel screws · Rubies in polished sinks' },
      { label: 'ENGRAVING', value: 'ORIGIN 01 · TITANIUM · INDIVIDUAL NUMBERING' },
    ],
  },
];

export function getHotspotById(id: string): AnatomyHotspot {
  return ANATOMY_HOTSPOTS.find((item) => item.id === id) ?? ANATOMY_HOTSPOTS[0];
}

export function getAdjacentHotspotId(currentId: string, direction: 'next' | 'prev'): string {
  const idx = ANATOMY_HOTSPOTS.findIndex((item) => item.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const delta = direction === 'next' ? 1 : -1;
  const nextIdx = (safeIdx + delta + ANATOMY_HOTSPOTS.length) % ANATOMY_HOTSPOTS.length;
  return ANATOMY_HOTSPOTS[nextIdx].id;
}

export function getAdjacentGalleryIndex(currentIndex: number, direction: 'next' | 'prev', total = GALLERY_SLIDES.length): number {
  if (total <= 0) return 0;
  const normalized = ((currentIndex % total) + total) % total;
  const delta = direction === 'next' ? 1 : -1;
  return (normalized + delta + total) % total;
}

export function formatGalleryProgress(index: number, total = GALLERY_SLIDES.length): string {
  const safeIndex = Math.max(0, Math.min(total - 1, index)) + 1;
  return `${String(safeIndex).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

export function validatePrivateViewingInquiry(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide an email address for correspondence.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please include a brief note regarding your viewing interest.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Please provide at least 10 characters in your inquiry note.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
]]>
    </file>
    <file path="src/app/(aurel)/aurel/hooks/useReducedMotion.ts">
<![CDATA[import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
]]>
    </file>
  </files>
</template>
